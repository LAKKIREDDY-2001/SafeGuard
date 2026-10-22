"""AI Threat Assessment Engine combining Amazon Bedrock (Claude 3 Haiku) and Rekognition."""

from datetime import datetime, timezone
from typing import Any, Dict, Optional
from models.event_models import RingEvent
from models.threat_models import ThreatAssessment, ThreatCategory, ThreatLevel
from services.bedrock_service import BedrockService
from services.dynamodb_service import DynamoDBService
from services.rekognition_service import RekognitionService


class ThreatEngine:
    def __init__(
        self,
        bedrock_service: Optional[BedrockService] = None,
        rekognition_service: Optional[RekognitionService] = None,
        dynamodb_service: Optional[DynamoDBService] = None
    ):
        self.bedrock = bedrock_service or BedrockService()
        self.rekognition = rekognition_service or RekognitionService()
        self.dynamodb = dynamodb_service or DynamoDBService()

    def _extract_hour(self, timestamp: str) -> int:
        """Extract hour integer from ISO timestamp."""
        try:
            if "T" in timestamp:
                return int(timestamp.split("T")[1].split(":")[0])
            elif ":" in timestamp:
                return int(timestamp.split(":")[0])
            return 12
        except Exception:
            return 12

    def evaluate_event(
        self,
        event: Any,
        image_bytes: Optional[bytes] = None,
        language: str = "en"
    ) -> ThreatAssessment:
        """
        Processes a Ring event through the dual AI engine:
        1. Amazon Rekognition: Face matching & Object detection
        2. DynamoDB: Historical visitor frequency & behavioral context
        3. Amazon Bedrock: Contextual synthesis & threat classification
        """
        # Convert event to dict representation
        if isinstance(event, dict):
            event_data = event
        elif hasattr(event, "model_dump"):
            event_data = event.model_dump()
        elif hasattr(event, "dict"):
            event_data = event.dict()
        else:
            event_data = vars(event)

        event_id = event_data.get("event_id", f"evt_{datetime.now(timezone.utc).timestamp()}")
        event_type = event_data.get("event_type", "motion")
        timestamp = event_data.get("timestamp", datetime.now(timezone.utc).isoformat())
        metadata = event_data.get("metadata", {}) or {}

        face_hint = metadata.get("face_hint")
        label_hint = metadata.get("label_hint")
        hour = self._extract_hour(timestamp)
        is_night = hour >= 22 or hour < 5

        # 1. Amazon Rekognition Visual Analysis
        family_match = None
        face_result = self.rekognition.match_face(image_bytes=image_bytes, face_hint=face_hint)
        if face_result and face_result.get("matched"):
            family_match = face_result

        # Label detection
        detected_labels = self.rekognition.detect_labels(image_bytes=image_bytes, label_hint=label_hint, face_hint=face_hint)
        detected_objects = [item["name"] for item in detected_labels]
        if metadata.get("courier") or event_type == "package_detected":
            if "Package" not in detected_objects:
                detected_objects.append("Package")

        # 2. Check Visitor History & Repeat Detection
        visitor_id = metadata.get("visitor_id", "vis_unknown" if not family_match else None)
        visitor_history = None
        if visitor_id:
            visitor_history = self.dynamodb.get_visitor_pattern(visitor_id)
            if not visitor_history:
                # If metadata specifies repeat count or visit count
                visit_count = metadata.get("visit_count", 1)
                visitor_history = {
                    "visitor_id": visitor_id,
                    "visit_count": visit_count,
                    "is_repeat_visitor": visit_count >= 3
                }

        # Check for forced entry signals
        is_forced_entry = (
            event_type == "forced_entry"
            or "Crowbar" in detected_objects
            or metadata.get("tamper_detected") is True
            or label_hint == "forced_entry"
        )

        # 3. Contextual Bedrock Assessment
        bedrock_result = self.bedrock.assess_threat_context(
            event_data=event_data,
            visitor_history=visitor_history,
            family_match=family_match,
            detected_objects=detected_objects,
            language=language
        )

        # Map to ThreatLevel and ThreatCategory
        raw_level = bedrock_result.get("threat_level", "low").lower()
        if raw_level in ["critical", "emergency", "high"]:
            # For 3-tier classification: high at night maps to high/critical
            if raw_level == "critical" or is_forced_entry or (visitor_history and visitor_history.get("visit_count", 1) >= 3 and is_night):
                threat_level = ThreatLevel.CRITICAL
            else:
                threat_level = ThreatLevel.CRITICAL if (is_night and not family_match) else ThreatLevel.MEDIUM
        elif raw_level == "medium":
            threat_level = ThreatLevel.MEDIUM
        else:
            threat_level = ThreatLevel.LOW

        # Category mapping
        raw_category = bedrock_result.get("category", "visitor").lower()
        if is_forced_entry or raw_category == "forced_entry":
            category = ThreatCategory.FORCED_ENTRY
            threat_level = ThreatLevel.CRITICAL
        elif family_match and family_match.get("matched"):
            category = ThreatCategory.KNOWN_FAMILY
            threat_level = ThreatLevel.LOW
        elif "Package" in detected_objects or raw_category == "delivery" or event_type == "package_detected":
            category = ThreatCategory.DELIVERY
            threat_level = ThreatLevel.LOW
        elif raw_category == "suspicious_activity" or (visitor_history and visitor_history.get("visit_count", 1) >= 3):
            category = ThreatCategory.SUSPICIOUS_ACTIVITY
        elif not family_match and ("person" in detected_objects or event_type == "person_detected"):
            category = ThreatCategory.UNKNOWN_PERSON
        else:
            category = ThreatCategory.VISITOR

        threat_score = float(bedrock_result.get("threat_score", 0.1))

        # Build Assessment Schema
        assessment = ThreatAssessment(
            threat_id=f"threat_{event_id}_{int(datetime.now(timezone.utc).timestamp())}",
            event_id=event_id,
            threat_level=threat_level,
            threat_score=threat_score,
            category=category,
            summary=bedrock_result.get("summary", "Activity analyzed by SafeGuard AI."),
            recommended_action=bedrock_result.get("recommended_action", "No action needed."),
            confidence=0.95,
            timestamp=timestamp,
            language=language,
            matched_face=family_match.get("face_id") if family_match else None,
            detected_objects=detected_objects,
            context_factors={
                "is_night": is_night,
                "hour": hour,
                "visit_count": visitor_history.get("visit_count", 1) if visitor_history else 1,
                "device_type": event_data.get("device_type", "camera")
            }
        )

        return assessment
