"""Data models for SafeGuard AI Threat Assessment."""

from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field


class ThreatLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    CRITICAL = "critical"


class ThreatCategory(str, Enum):
    DELIVERY = "delivery"
    KNOWN_FAMILY = "known_family"
    VISITOR = "visitor"
    UNKNOWN_PERSON = "unknown_person"
    SUSPICIOUS_ACTIVITY = "suspicious_activity"
    FORCED_ENTRY = "forced_entry"
    ANIMAL_WEATHER = "animal_weather"


class ThreatAssessment(BaseModel):
    model_config = ConfigDict(use_enum_values=True)

    threat_id: str
    event_id: str
    threat_level: ThreatLevel
    threat_score: float = Field(..., ge=0.0, le=1.0, description="Normalized threat rating from 0.0 to 1.0")
    category: ThreatCategory
    summary: str
    recommended_action: str
    confidence: float = 0.95
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    language: str = "en"
    matched_face: Optional[str] = None
    detected_objects: List[str] = Field(default_factory=list)
    context_factors: Dict[str, Any] = Field(default_factory=dict)
    is_suppressed: bool = False
