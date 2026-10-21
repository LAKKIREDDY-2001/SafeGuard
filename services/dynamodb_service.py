"""DynamoDB service for SafeGuard event store, patterns, and family profiles."""

import os
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
import boto3
from botocore.exceptions import ClientError


class DynamoDBService:
    def __init__(self, region_name: str = "us-east-1", offline_mock: bool = True):
        self.region_name = os.environ.get("AWS_REGION", region_name)
        self.offline_mock = os.environ.get("SAFEGUARD_OFFLINE_MOCK_MODE", "true").lower() == "true" or offline_mock
        
        # Partition-optimized table names (Friction Log #7)
        self.events_table_name = os.environ.get("DYNAMODB_EVENTS_TABLE", "safeguard-events")
        self.patterns_table_name = os.environ.get("DYNAMODB_PATTERNS_TABLE", "safeguard-patterns")
        self.family_table_name = os.environ.get("DYNAMODB_FAMILY_TABLE", "safeguard-family-profiles")
        self.settings_table_name = os.environ.get("DYNAMODB_SETTINGS_TABLE", "safeguard-user-preferences")

        # In-memory store for unit tests, offline development, and mock fallback
        self._mock_events: List[Dict[str, Any]] = []
        self._mock_patterns: Dict[str, Dict[str, Any]] = {}
        self._mock_family: Dict[str, Dict[str, Any]] = {}
        self._mock_alerts: List[Dict[str, Any]] = []
        self._mock_settings: Dict[str, Any] = {
            "language": "en",
            "quiet_hours_start": "23:00",
            "quiet_hours_end": "07:00",
            "night_mode": True,
            "zero_false_positive_mode": True,
            "emergency_contacts": [
                {"name": "Priya Reddy", "phone": "+1-555-0199", "relation": "Primary"},
                {"name": "Local Police Non-Emergency", "phone": "911", "relation": "Emergency"}
            ]
        }

        # Seed initial family members
        self._seed_default_family()

        if not self.offline_mock:
            try:
                self.dynamodb = boto3.resource("dynamodb", region_name=self.region_name)
                self.events_table = self.dynamodb.Table(self.events_table_name)
                self.patterns_table = self.dynamodb.Table(self.patterns_table_name)
                self.family_table = self.dynamodb.Table(self.family_table_name)
            except Exception:
                self.offline_mock = True

    def _seed_default_family(self):
        """Seed default family profiles as per specification."""
        self._mock_family = {
            "fam_aarav": {
                "member_id": "fam_aarav",
                "name": "Aarav Reddy",
                "age": 10,
                "role": "child",
                "photo_url": "/assets/aarav.jpg",
                "face_id": "face_aarav_reddy",
                "curfew_time": "20:00",
                "safe_zones": ["Home", "Oakridge Elementary", "Grandma's House"],
                "last_seen": "Today at 3:15 PM",
                "wellness_status": "Safe at Home",
                "is_safe": True,
                "assigned_camera_id": "cam_front_door"
            },
            "fam_meera": {
                "member_id": "fam_meera",
                "name": "Grandma Meera",
                "age": 75,
                "role": "elder",
                "photo_url": "/assets/grandma_meera.jpg",
                "face_id": "face_grandma_meera",
                "curfew_time": "21:30",
                "safe_zones": ["Grandma's House"],
                "last_seen": "8 hours ago",
                "wellness_status": "Wellness Check Pending",
                "is_safe": True,
                "assigned_camera_id": "cam_grandma_living"
            },
            "fam_priya": {
                "member_id": "fam_priya",
                "name": "Priya Reddy",
                "age": 38,
                "role": "parent",
                "photo_url": "/assets/priya.jpg",
                "face_id": "face_priya_reddy",
                "curfew_time": None,
                "safe_zones": ["Home", "Tech Center Office"],
                "last_seen": "10 minutes ago",
                "wellness_status": "Active (Working Remotely)",
                "is_safe": True,
                "assigned_camera_id": "cam_front_door"
            },
            "fam_anita": {
                "member_id": "fam_anita",
                "name": "Anita Sharma (Babysitter)",
                "age": 24,
                "role": "caregiver",
                "photo_url": "/assets/anita.jpg",
                "face_id": "face_anita_caretaker",
                "curfew_time": None,
                "safe_zones": ["Home"],
                "last_seen": "Yesterday at 6:00 PM",
                "wellness_status": "Verified Caregiver",
                "is_safe": True,
                "assigned_camera_id": "cam_front_door"
            }
        }

    def save_event(self, event_data: Dict[str, Any]) -> bool:
        """Save raw/enriched event using composite partition key (camera_id#date)."""
        camera_id = event_data.get("device_id", "cam_default")
        timestamp = event_data.get("timestamp", datetime.now(timezone.utc).isoformat())
        date_str = timestamp.split("T")[0]
        partition_key = f"{camera_id}#{date_str}"
        event_id = event_data.get("event_id", f"evt_{len(self._mock_events)+1}")

        item = {
            "pk": partition_key,
            "sk": f"{timestamp}#{event_id}",
            **event_data
        }

        self._mock_events.append(item)

        if not self.offline_mock:
            try:
                self.events_table.put_item(Item=item)
            except (ClientError, Exception):
                pass
        return True

    def get_recent_events(self, limit: int = 50) -> List[Dict[str, Any]]:
        """Get recent events ordered by timestamp descending."""
        events = sorted(self._mock_events, key=lambda x: x.get("timestamp", ""), reverse=True)
        return events[:limit]

    def save_visitor_pattern(self, pattern_data: Dict[str, Any]) -> bool:
        """Store or update behavioral pattern for a visitor."""
        visitor_id = pattern_data.get("visitor_id")
        if not visitor_id:
            return False
        self._mock_patterns[visitor_id] = pattern_data

        if not self.offline_mock:
            try:
                self.patterns_table.put_item(Item={"visitor_id": visitor_id, **pattern_data})
            except (ClientError, Exception):
                pass
        return True

    def get_visitor_pattern(self, visitor_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve pattern record for a visitor."""
        return self._mock_patterns.get(visitor_id)

    def get_all_visitor_patterns(self) -> List[Dict[str, Any]]:
        """Retrieve all tracked visitor patterns."""
        return list(self._mock_patterns.values())

    def get_family_members(self) -> List[Dict[str, Any]]:
        """Retrieve all configured family profiles."""
        return list(self._mock_family.values())

    def get_family_member_by_face(self, face_id: str) -> Optional[Dict[str, Any]]:
        """Lookup family member by Rekognition face_id."""
        for member in self._mock_family.values():
            if member.get("face_id") == face_id:
                return member
        return None

    def update_family_member(self, member_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update a family profile."""
        if member_id in self._mock_family:
            self._mock_family[member_id].update(updates)
            return self._mock_family[member_id]
        return None

    def save_alert(self, alert_data: Dict[str, Any]) -> bool:
        """Save a safety or threat alert."""
        self._mock_alerts.append(alert_data)
        return True

    def get_recent_alerts(self, limit: int = 20) -> List[Dict[str, Any]]:
        """Get alerts sorted latest first."""
        alerts = sorted(self._mock_alerts, key=lambda x: x.get("timestamp", ""), reverse=True)
        return alerts[:limit]

    def get_settings(self) -> Dict[str, Any]:
        """Get user preferences and system settings."""
        return self._mock_settings

    def update_settings(self, new_settings: Dict[str, Any]) -> Dict[str, Any]:
        """Update preferences."""
        self._mock_settings.update(new_settings)
        return self._mock_settings
