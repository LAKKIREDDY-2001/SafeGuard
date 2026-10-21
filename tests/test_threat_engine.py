"""Unit tests for SafeGuard AI Threat Assessment Engine."""

import pytest
from event_processor.threat_engine import ThreatEngine
from models.event_models import DeviceType, EventType, RingEvent
from models.threat_models import ThreatCategory, ThreatLevel
from services.bedrock_service import BedrockService
from services.dynamodb_service import DynamoDBService
from services.rekognition_service import RekognitionService


@pytest.fixture
def threat_engine():
    db = DynamoDBService(offline_mock=True)
    bedrock = BedrockService(offline_mock=True)
    rekognition = RekognitionService(offline_mock=True)
    return ThreatEngine(bedrock_service=bedrock, rekognition_service=rekognition, dynamodb_service=db)


def test_known_family_member_returns_low_threat(threat_engine):
    """Test 1: Known family member (e.g. Priya) returns LOW threat level."""
    event = RingEvent(
        event_id="evt_test_family_01",
        device_id="doorbell_front",
        device_name="Front Doorbell Pro 2",
        device_type=DeviceType.DOORBELL,
        event_type=EventType.PERSON_DETECTED,
        timestamp="2026-10-21T14:30:00Z",
        metadata={"face_hint": "priya"}
    )
    assessment = threat_engine.evaluate_event(event)

    assert assessment.threat_level == ThreatLevel.LOW
    assert assessment.threat_score <= 0.20
    assert assessment.category == ThreatCategory.KNOWN_FAMILY
    assert "safe" in assessment.summary.lower() or "family" in assessment.summary.lower()


def test_unknown_person_at_night_returns_high_threat(threat_engine):
    """Test 2: Unknown person detected at night (11:47 PM) returns HIGH / CRITICAL threat level."""
    event = RingEvent(
        event_id="evt_test_night_02",
        device_id="cam_backyard",
        device_name="Backyard Floodlight Cam Wired",
        device_type=DeviceType.FLOODLIGHT,
        event_type=EventType.PERSON_DETECTED,
        timestamp="2026-10-21T23:47:00Z",
        metadata={"face_hint": "unknown", "visitor_id": "vis_stranger_1", "visit_count": 1}
    )
    assessment = threat_engine.evaluate_event(event)

    assert assessment.threat_level in [ThreatLevel.CRITICAL, ThreatLevel.MEDIUM]
    assert assessment.threat_score >= 0.70
    assert assessment.category in [ThreatCategory.UNKNOWN_PERSON, ThreatCategory.SUSPICIOUS_ACTIVITY]
    assert assessment.context_factors["is_night"] is True


def test_repeated_unknown_visitor_escalates_to_critical(threat_engine):
    """Test 3: Repeated unknown visitor (3rd visit this week at night) escalates to CRITICAL."""
    # Pre-record visits to build visitor pattern
    visitor_id = "vis_repeat_prowler_99"
    threat_engine.dynamodb.save_visitor_pattern({
        "visitor_id": visitor_id,
        "visit_count": 3,
        "is_repeat_visitor": True
    })

    event = RingEvent(
        event_id="evt_test_repeat_03",
        device_id="doorbell_front",
        device_name="Front Doorbell Pro 2",
        device_type=DeviceType.DOORBELL,
        event_type=EventType.PERSON_DETECTED,
        timestamp="2026-10-21T23:47:00Z",
        metadata={"face_hint": "unknown", "visitor_id": visitor_id, "visit_count": 3}
    )
    assessment = threat_engine.evaluate_event(event)

    assert assessment.threat_level == ThreatLevel.CRITICAL
    assert assessment.threat_score >= 0.85
    assert assessment.category == ThreatCategory.SUSPICIOUS_ACTIVITY
    assert "repeat" in assessment.summary.lower() or "critical" in assessment.summary.lower()


def test_package_delivery_classified_correctly(threat_engine):
    """Test 4: Package delivery event is classified as DELIVERY with LOW threat."""
    event = RingEvent(
        event_id="evt_test_pkg_04",
        device_id="doorbell_front",
        device_name="Front Doorbell Pro 2",
        device_type=DeviceType.DOORBELL,
        event_type=EventType.PACKAGE_DETECTED,
        timestamp="2026-10-21T13:15:00Z",
        metadata={"label_hint": "package", "courier": "UPS"}
    )
    assessment = threat_engine.evaluate_event(event)

    assert assessment.threat_level == ThreatLevel.LOW
    assert assessment.category == ThreatCategory.DELIVERY
    assert assessment.threat_score <= 0.25
    assert "delivery" in assessment.summary.lower() or "package" in assessment.summary.lower()


def test_forced_entry_attempt_triggers_emergency(threat_engine):
    """Test 5: Forced entry attempt (e.g. crowbar/tampering) triggers CRITICAL emergency threat."""
    event = RingEvent(
        event_id="evt_test_emergency_05",
        device_id="doorbell_front",
        device_name="Front Doorbell Pro 2",
        device_type=DeviceType.DOORBELL,
        event_type=EventType.FORCED_ENTRY,
        timestamp="2026-10-21T02:30:00Z",
        metadata={"label_hint": "forced_entry", "tamper_detected": True}
    )
    assessment = threat_engine.evaluate_event(event)

    assert assessment.threat_level == ThreatLevel.CRITICAL
    assert assessment.category == ThreatCategory.FORCED_ENTRY
    assert assessment.threat_score >= 0.95
    assert "emergency" in assessment.summary.lower() or "forced entry" in assessment.summary.lower()
