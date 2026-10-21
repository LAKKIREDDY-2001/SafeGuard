"""Multi-channel Smart Alert Router with Escalation Chain and Quiet Hours."""

from datetime import datetime
from typing import Any, Dict, Optional
from models.threat_models import ThreatAssessment, ThreatLevel
from services.dynamodb_service import DynamoDBService
from services.sns_service import SNSService


class AlertRouter:
    def __init__(
        self,
        sns_service: Optional[SNSService] = None,
        dynamodb_service: Optional[DynamoDBService] = None
    ):
        self.sns = sns_service or SNSService()
        self.dynamodb = dynamodb_service or DynamoDBService()

    def is_in_quiet_hours(self, timestamp: str, quiet_start: str = "23:00", quiet_end: str = "07:00") -> bool:
        """Determines if the given time falls within configured quiet hours."""
        try:
            if "T" in timestamp:
                hour = int(timestamp.split("T")[1].split(":")[0])
            elif ":" in timestamp:
                hour = int(timestamp.split(":")[0])
            else:
                hour = 12
        except Exception:
            hour = 12

        start_h = int(quiet_start.split(":")[0])
        end_h = int(quiet_end.split(":")[0])

        if start_h > end_h:
            # Over midnight: e.g. 23:00 to 07:00
            return hour >= start_h or hour < end_h
        else:
            return start_h <= hour < end_h

    def route_alert(
        self,
        assessment: ThreatAssessment,
        user_preferences: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Routes alerts intelligently based on threat level, quiet hours, and user settings:
        - Critical: Immediate broadcast to All Channels (Mobile Push + Alexa Voice + SMS)
        - Medium: Mobile Push only (suppressed during quiet hours if enabled)
        - Low: Batched to Daily Digest to eliminate alert fatigue
        """
        prefs = user_preferences or self.dynamodb.get_settings()
        quiet_start = prefs.get("quiet_hours_start", "23:00")
        quiet_end = prefs.get("quiet_hours_end", "07:00")
        in_quiet = self.is_in_quiet_hours(assessment.timestamp, quiet_start, quiet_end)

        level = assessment.threat_level
        # Handle both enum and string
        level_str = level.value if hasattr(level, "value") else str(level).lower()

        if hasattr(assessment, "model_dump"):
            data_dict = assessment.model_dump()
        elif hasattr(assessment, "dict"):
            data_dict = assessment.dict()
        else:
            data_dict = vars(assessment)

        # 1. Critical Threats: ALWAYS deliver to ALL channels immediately (ignores quiet hours)
        if level_str in ["critical", "emergency", "high"]:
            result = self.sns.publish_critical_alert(data_dict)
            result["escalation_chain_armed"] = True
            result["escalation_delay_seconds"] = 300  # 5 minutes
            result["secondary_contact"] = "Local Emergency Non-Emergency Dispatch"
            return result

        # 2. Medium Threats: Deliver to Mobile Push
        elif level_str == "medium":
            if in_quiet:
                # Suppress or batch during quiet hours
                result = self.sns.batch_to_daily_digest(data_dict)
                result["quiet_hours_suppressed"] = True
                return result
            else:
                return self.sns.publish_medium_alert(data_dict)

        # 3. Low Threats: Batched to Daily Digest
        else:
            result = self.sns.batch_to_daily_digest(data_dict)
            return result
