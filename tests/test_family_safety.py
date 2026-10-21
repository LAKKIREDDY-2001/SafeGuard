"""Unit tests for SafeGuard Family Safety Intelligence."""

import pytest
from event_processor.family_safety import FamilySafetyEngine
from models.family_models import AlertType
from services.dynamodb_service import DynamoDBService
from services.rekognition_service import RekognitionService


@pytest.fixture
def family_safety_engine():
    db = DynamoDBService(offline_mock=True)
    rekognition = RekognitionService(offline_mock=True)
    return FamilySafetyEngine(dynamodb_service=db, rekognition_service=rekognition)


def test_kid_arrival_detected_and_notified(family_safety_engine):
    """Test 1: Aarav's arrival home from school is detected and notification is sent."""
    event_data = {
        "event_id": "evt_aarav_arrival_315",
        "device_id": "doorbell_front",
        "timestamp": "2026-10-21T15:15:00Z",
        "metadata": {
            "face_hint": "aarav",
            "smart_lock_status": "locked"
        }
    }

    alert = family_safety_engine.check_kid_arrival(event_data)

    assert alert is not None
    assert alert.alert_type == AlertType.KID_ARRIVAL
    assert alert.member_name == "Aarav Reddy"
    assert "aarav" in alert.message.lower()
    assert "locked" in alert.message.lower()

    # Verify family member profile updated in database
    aarav = family_safety_engine.dynamodb._mock_family["fam_aarav"]
    assert aarav["is_safe"] is True
    assert "safe" in aarav["wellness_status"].lower()


def test_elder_no_motion_triggers_wellness_check(family_safety_engine):
    """Test 2: No motion detected at Grandma Meera's camera for 8+ hours triggers wellness check."""
    alert = family_safety_engine.check_elder_wellness(
        camera_id="cam_grandma_living",
        hours_threshold=8.0,
        hours_inactive=8.5
    )

    assert alert is not None
    assert alert.alert_type == AlertType.ELDER_CHECK
    assert alert.member_name == "Grandma Meera"
    assert "grandma meera" in alert.message.lower()
    assert "wellness check" in alert.message.lower()
    assert alert.metadata["hours_inactive"] >= 8.0


def test_curfew_violation_sends_alert(family_safety_engine):
    """Test 3: Curfew violation (departure after curfew time) generates an alert."""
    # Aarav's curfew is 20:00 (8:00 PM)
    # Exterior activity detected at 22:30 (10:30 PM)
    departure_time = "2026-10-21T22:30:00Z"

    alert = family_safety_engine.check_curfew("fam_aarav", departure_time)

    assert alert is not None
    assert alert.alert_type == AlertType.CURFEW_VIOLATION
    assert "curfew" in alert.message.lower()
    assert "aarav" in alert.message.lower()


def test_babysitter_face_match_verified(family_safety_engine):
    """Test 4: Pre-approved babysitter (Anita) face match is verified."""
    event_data = {
        "event_id": "evt_anita_checkin",
        "device_id": "doorbell_front",
        "timestamp": "2026-10-21T18:00:00Z",
        "metadata": {
            "face_hint": "anita"
        }
    }

    alert = family_safety_engine.verify_babysitter(event_data)

    assert alert is not None
    assert alert.alert_type == AlertType.BABYSITTER_VERIFIED
    assert "anita" in alert.member_name.lower()
    assert alert.status == "verified"
    assert alert.metadata["confidence"] >= 90.0
