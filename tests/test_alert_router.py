"""Unit tests for SafeGuard Multi-Channel Smart Alert Router."""

import pytest
from event_processor.alert_router import AlertRouter
from models.threat_models import ThreatAssessment, ThreatCategory, ThreatLevel
from services.dynamodb_service import DynamoDBService
from services.sns_service import SNSService


@pytest.fixture
def alert_router():
    db = DynamoDBService(offline_mock=True)
    sns = SNSService(offline_mock=True)
    return AlertRouter(sns_service=sns, dynamodb_service=db)


def test_critical_threat_sends_all_channels(alert_router):
    """Test 1: Critical threat routes immediately across all channels (Mobile + Alexa + SMS)."""
    assessment = ThreatAssessment(
        threat_id="threat_crit_01",
        event_id="evt_emergency_101",
        threat_level=ThreatLevel.CRITICAL,
        threat_score=0.98,
        category=ThreatCategory.FORCED_ENTRY,
        summary="EMERGENCY: Forced entry attempt detected. Tampering at front entrance.",
        recommended_action="Emergency SOS broadcast and Floodlight sirens engaged.",
        timestamp="2026-10-21T02:15:00Z"
    )

    result = alert_router.route_alert(assessment)

    assert result["status"] == "delivered_immediate"
    assert result["channel"] == "ALL_CHANNELS"
    assert "mobile_push" in result["channels_delivered"]
    assert "alexa_voice" in result["channels_delivered"]
    assert "sms_emergency" in result["channels_delivered"]
    assert result["escalation_chain_armed"] is True


def test_low_threat_batched_to_daily_digest(alert_router):
    """Test 2: Low threat events are batched into daily digest to eliminate alert fatigue."""
    assessment = ThreatAssessment(
        threat_id="threat_low_02",
        event_id="evt_delivery_102",
        threat_level=ThreatLevel.LOW,
        threat_score=0.08,
        category=ThreatCategory.DELIVERY,
        summary="Package delivery verified from UPS.",
        recommended_action="No urgent action required.",
        timestamp="2026-10-21T14:20:00Z"
    )

    result = alert_router.route_alert(assessment)

    assert result["status"] == "batched_for_digest"
    assert result["channel"] == "DAILY_DIGEST_BATCH"
    assert "daily_digest_queue" in result["channels_delivered"]
