"""Data models for Behavioral Pattern Analysis."""

from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field


class VisitorPattern(BaseModel):
    model_config = ConfigDict(use_enum_values=True)

    pattern_id: str
    visitor_id: str  # Known face_id or visitor hash
    visitor_name: Optional[str] = "Unknown Visitor"
    visit_count: int = 1
    first_seen: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    last_seen: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    timestamps: List[str] = Field(default_factory=list)
    common_hours: List[int] = Field(default_factory=list)
    is_repeat_visitor: bool = False
    is_suspicious: bool = False
    threat_tier: str = "low"
    notes: Optional[str] = None


class FrequencyTrend(BaseModel):
    model_config = ConfigDict(use_enum_values=True)

    period: str  # "weekly", "monthly"
    total_events: int
    unusual_events: int
    noise_filtered_percentage: float = 95.0
    busiest_hour: int
    average_daily_events: float
    trend_direction: str = "stable"  # "increasing", "decreasing", "stable"


class PatternAnalysisResult(BaseModel):
    model_config = ConfigDict(use_enum_values=True)

    has_anomaly: bool = False
    is_repeat_visitor: bool = False
    repeat_visitor_count: int = 0
    anomaly_score: float = 0.0
    detected_patterns: List[str] = Field(default_factory=list)
    predictive_alert: Optional[str] = None
    frequency_trend: Optional[FrequencyTrend] = None
    summary: str = ""
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
