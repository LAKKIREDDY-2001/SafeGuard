"""Data models for Family Safety Intelligence."""

from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field


class FamilyRole(str, Enum):
    PARENT = "parent"
    CHILD = "child"
    ELDER = "elder"
    CAREGIVER = "caregiver"
    GUEST = "guest"


class AlertType(str, Enum):
    KID_ARRIVAL = "kid_arrival"
    ELDER_CHECK = "elder_check"
    CURFEW_VIOLATION = "curfew_violation"
    BABYSITTER_VERIFIED = "babysitter_verified"
    EMERGENCY_SOS = "emergency_sos"


class FamilyMember(BaseModel):
    model_config = ConfigDict(use_enum_values=True)

    member_id: str
    name: str
    age: int
    role: FamilyRole
    photo_url: Optional[str] = None
    face_id: Optional[str] = None
    curfew_time: Optional[str] = "21:00"  # e.g., 21:00 (9 PM)
    safe_zones: List[str] = Field(default_factory=lambda: ["Home", "School", "Grandma's House"])
    last_seen: Optional[str] = None
    wellness_status: str = "Active"
    is_safe: bool = True
    assigned_camera_id: Optional[str] = None


class FamilySafetyAlert(BaseModel):
    model_config = ConfigDict(use_enum_values=True)

    alert_id: str
    member_id: Optional[str] = None
    member_name: str
    alert_type: AlertType
    message: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    status: str = "open"  # open, acknowledged, resolved
    metadata: Dict[str, Any] = Field(default_factory=dict)
