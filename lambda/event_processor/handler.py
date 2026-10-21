"""Main AWS Lambda Handler for Ring Event Ingestion and Security Intelligence Processing."""

import json
from datetime import datetime, timezone
from typing import Any, Dict, Optional
import os
import sys

# Ensure lambda and root directories are accessible
curr_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(curr_dir)
root_dir = os.path.dirname(parent_dir)
for p in [curr_dir, parent_dir, root_dir]:
    if p not in sys.path:
        sys.path.insert(0, p)

from event_processor.alert_router import AlertRouter
from event_processor.family_safety import FamilySafetyEngine
from event_processor.pattern_analyzer import PatternAnalyzer
from event_processor.recommender import SecurityRecommender
from event_processor.threat_engine import ThreatEngine
from models.event_models import DeviceType, EventType, RingEvent
from services.bedrock_service import BedrockService
from services.dynamodb_service import DynamoDBService
from services.rekognition_service import RekognitionService
from services.ring_api_service import RingAPIService
from services.sns_service import SNSService


class SafeGuardEventProcessor:
    def __init__(self):
        self.dynamodb = DynamoDBService()
        self.bedrock = BedrockService()
        self.rekognition = RekognitionService()
        self.sns = SNSService()
        self.ring_api = RingAPIService()

        self.threat_engine = ThreatEngine(self.bedrock, self.rekognition, self.dynamodb)
        self.pattern_analyzer = PatternAnalyzer(self.dynamodb)
        self.family_safety = FamilySafetyEngine(self.dynamodb, self.rekognition)
        self.recommender = SecurityRecommender()
        self.alert_router = AlertRouter(self.sns, self.dynamodb)

    def process_event(self, raw_event: Dict[str, Any], image_bytes: Optional[bytes] = None) -> Dict[str, Any]:
        """
        End-to-end processing pipeline:
        1. Deduplicate & normalize
        2. Family safety evaluation (kid arrival, elder wellness, babysitter)
        3. AI Threat assessment (Bedrock + Rekognition)
        4. Behavioral pattern analysis
        5. Proactive security recommendations
        6. Notification dispatch via SNS
        7. Persistence to DynamoDB event store
        """
        # 1. Deduplicate
        clean_event = self.ring_api.deduplicate_and_sequence(raw_event)
        if clean_event is None:
            return {"status": "dropped_duplicate", "event_id": raw_event.get("event_id")}

        # 2. Check Family Safety triggers first
        kid_alert = self.family_safety.check_kid_arrival(clean_event)
        babysitter_alert = self.family_safety.verify_babysitter(clean_event)

        # 3. Threat Assessment
        assessment = self.threat_engine.evaluate_event(clean_event, image_bytes=image_bytes)

        # 4. Pattern Analysis
        pattern_result = self.pattern_analyzer.analyze_event(clean_event)

        # 5. Proactive recommendations
        ts = clean_event.get("timestamp", datetime.now(timezone.utc).isoformat())
        recommendations = self.recommender.evaluate_context(current_time=ts)

        # 6. Smart Alert Routing
        routing_result = self.alert_router.route_alert(assessment)

        # 7. Persist to DynamoDB
        assessment_dict = assessment.model_dump() if hasattr(assessment, "model_dump") else assessment.dict()
        pattern_dict = pattern_result.model_dump() if hasattr(pattern_result, "model_dump") else pattern_result.dict()
        family_dict = None
        if kid_alert:
            family_dict = kid_alert.model_dump() if hasattr(kid_alert, "model_dump") else kid_alert.dict()
        elif babysitter_alert:
            family_dict = babysitter_alert.model_dump() if hasattr(babysitter_alert, "model_dump") else babysitter_alert.dict()

        enriched_record = {
            "event_id": clean_event.get("event_id"),
            "device_id": clean_event.get("device_id"),
            "device_name": clean_event.get("device_name"),
            "timestamp": ts,
            "threat_assessment": assessment_dict,
            "pattern_analysis": pattern_dict,
            "family_alert": family_dict,
            "recommendations": recommendations,
            "routing_result": routing_result
        }
        self.dynamodb.save_event(enriched_record)

        return {
            "status": "processed",
            "event_id": clean_event.get("event_id"),
            "threat_level": assessment.threat_level.value if hasattr(assessment.threat_level, "value") else assessment.threat_level,
            "threat_score": assessment.threat_score,
            "summary": assessment.summary,
            "routing": routing_result,
            "family_alert": enriched_record["family_alert"],
            "recommendations": recommendations
        }


# Global processor instance for Lambda warm container optimization
processor = SafeGuardEventProcessor()


def lambda_handler(event: Dict[str, Any], context: Any = None) -> Dict[str, Any]:
    """AWS Lambda entry point for Ring webhooks or API Gateway."""
    try:
        # Extract body if incoming from API Gateway
        if "body" in event:
            body = json.loads(event["body"]) if isinstance(event["body"], str) else event["body"]
        else:
            body = event

        result = processor.process_event(body)

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            "body": json.dumps(result)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": str(e)})
        }
