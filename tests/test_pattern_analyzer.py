"""Unit tests for SafeGuard Behavioral Pattern Analyzer."""

import pytest
from event_processor.pattern_analyzer import PatternAnalyzer
from services.dynamodb_service import DynamoDBService


@pytest.fixture
def pattern_analyzer():
    db = DynamoDBService(offline_mock=True)
    return PatternAnalyzer(dynamodb_service=db)


def test_repeat_visitor_detected_after_3_visits(pattern_analyzer):
    """Test 1: Repeat visitor is detected after 3 visits."""
    visitor_id = "vis_stranger_404"

    # Visit 1
    p1 = pattern_analyzer.record_visit(visitor_id, "2026-10-18T14:00:00Z", hour=14)
    assert p1.visit_count == 1
    assert p1.is_repeat_visitor is False

    # Visit 2
    p2 = pattern_analyzer.record_visit(visitor_id, "2026-10-19T14:15:00Z", hour=14)
    assert p2.visit_count == 2
    assert p2.is_repeat_visitor is False

    # Visit 3 -> Escalates to repeat visitor!
    p3 = pattern_analyzer.record_visit(visitor_id, "2026-10-21T14:30:00Z", hour=14)
    assert p3.visit_count == 3
    assert p3.is_repeat_visitor is True


def test_time_anomaly_flagged_for_2am_activity(pattern_analyzer):
    """Test 2: Activity at 2:00 AM is flagged as a time-of-day anomaly."""
    # 2:00 AM activity
    night_ts = "2026-10-21T02:00:00Z"
    result = pattern_analyzer.check_time_anomaly(night_ts)

    assert result["is_anomaly"] is True
    assert result["anomaly_score"] >= 0.80
    assert result["hour"] == 2
    assert "anomaly" in result["reason"].lower()

    # Normal daytime comparison (2:00 PM)
    day_ts = "2026-10-21T14:00:00Z"
    day_result = pattern_analyzer.check_time_anomaly(day_ts)
    assert day_result["is_anomaly"] is False
    assert day_result["anomaly_score"] == 0.0


def test_frequency_trend_calculated_correctly(pattern_analyzer):
    """Test 3: Weekly frequency trend is calculated correctly with noise reduction metrics."""
    # Simulate a week with 150 events
    sample_events = []
    for i in range(150):
        # Mostly normal daytime events
        hour = 14 if i < 140 else 2  # 10 anomalous events
        sample_events.append({
            "event_id": f"evt_sample_{i}",
            "timestamp": f"2026-10-21T{hour:02d}:15:00Z",
            "threat_level": "low" if i < 140 else "critical"
        })

    trend = pattern_analyzer.calculate_frequency_trends(sample_events)

    assert trend.total_events == 150
    assert trend.unusual_events >= 8
    assert trend.noise_filtered_percentage >= 90.0
    assert trend.period == "weekly"
    assert trend.average_daily_events > 0
