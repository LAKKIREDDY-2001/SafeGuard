"""Data models for Ring devices and raw ingested events."""

from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, Optional
from pydantic import BaseModel, ConfigDict, Field


class DeviceType(str, Enum):
    DOORBELL = "doorbell"
    CAMERA = "camera"
    FLOODLIGHT = "floodlight"


class EventType(str, Enum):
    MOTION = "motion"
    DOORBELL_RING = "doorbell_ring"
    PERSON_DETECTED = "person_detected"
    PACKAGE_DETECTED = "package_detected"
    FORCED_ENTRY = "forced_entry"
    SOUND_ALARM = "sound_alarm"


class RingEvent(BaseModel):
    model_config = ConfigDict(use_enum_values=True)

    event_id: str
    device_id: str
    device_name: str
    device_type: DeviceType
    event_type: EventType
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)
    raw_payload: Optional[Dict[str, Any]] = None


class DeviceStatus(BaseModel):
    device_id: str
    device_name: str
    device_type: DeviceType
    battery_level: Optional[int] = 100
    is_online: bool = True
    last_motion_time: Optional[str] = None
    firmware_version: str = "v3.11.2026"
    location: str = "Home"
