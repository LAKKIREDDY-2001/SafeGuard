"""End-to-End Integration Test for SafeGuard Platform."""

import pytest
from event_processor.handler import SafeGuardEventProcessor
from models.event_models import DeviceType, EventType, RingEvent
from models.threat_models import ThreatLevel


@pytest.fixture
def processor():
    return SafeGuardEventProcessor()


def test_end_to_end_ring_event_to_notification(processor):
    """
    Test End-to-End:
    Ring Motion Event -> Lambda Processor -> Rekognition + Bedrock AI
    -> Behavioral Pattern Analysis -> Family Safety -> Smart Routing -> Notification.
    """
    # 1. Simulate an unknown late-night visitor at the front door
    incoming_event = {
        "event_id": "evt_integration_e2e_999",
        "device_id": "doorbell_front",
        "device_name": "Front Doorbell Pro 2",
        "device_type": DeviceType.DOORBELL.value,
        "event_type": EventType.PERSON_DETECTED.value,
        "timestamp": "2026-10-21T23:47:00Z",
        "metadata": {
            "face_hint": "unknown",
            "visitor_id": "vis_e2e_prowler",
            "visit_count": 3  # 3rd visit this week
        }
    }

    # 2. Process through the entire pipeline
    result = processor.process_event(incoming_event)

    # 3. Verify the end-to-end outcome
    assert result["status"] == "processed"
    assert result["event_id"] == "evt_integration_e2e_999"

    # Threat assessment should escalate to CRITICAL
    assert result["threat_level"] == ThreatLevel.CRITICAL.value
    assert result["threat_score"] >= 0.85
    assert "critical" in result["summary"].lower() or "repeat" in result["summary"].lower()

    # Routing should deliver to ALL channels immediately (mobile push + alexa + sms)
    routing = result["routing"]
    assert routing["status"] == "delivered_immediate"
    assert "mobile_push" in routing["channels_delivered"]
    assert "alexa_voice" in routing["channels_delivered"]
    assert "sms_emergency" in routing["channels_delivered"]

    # Recommendations should be context-aware
    recs = result["recommendations"]
    assert len(recs) > 0
    assert any("lock" in r["title"].lower() or "door" in r["message"].lower() for r in recs)

    # Verify persistent store in DynamoDB
    recent_events = processor.dynamodb.get_recent_events(limit=5)
    matched_db_event = next((e for e in recent_events if e.get("event_id") == "evt_integration_e2e_999"), None)
    assert matched_db_event is not None
    assert matched_db_event["threat_assessment"]["threat_level"] == ThreatLevel.CRITICAL.value
