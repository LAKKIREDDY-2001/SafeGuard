"""Integration and endpoint tests for SafeGuard Web & REST API."""

import pytest
import wsgi


@pytest.fixture
def client():
    wsgi.app.config["TESTING"] = True
    with wsgi.app.test_client() as client:
        yield client


def test_health_check_endpoint(client):
    """Test /health and /api/health endpoints for container readiness."""
    res = client.get("/health")
    assert res.status_code == 200
    data = res.get_json()
    assert data["status"] == "healthy"
    assert "Bedrock" in data["aws_services"]

    res_api = client.get("/api/health")
    assert res_api.status_code == 200
    assert res_api.get_json()["service"] == "SafeGuard AI Security Platform"


def test_dashboard_data_endpoint(client):
    """Test /api/dashboard returns full aggregated telemetry."""
    res = client.get("/api/dashboard")
    assert res.status_code == 200
    data = res.get_json()
    assert "cameras" in data
    assert "family" in data
    assert "recent_events" in data
    assert "stats" in data
    assert len(data["cameras"]) >= 3


def test_simulate_event_endpoint(client):
    """Test /api/simulate executes an AI-evaluated scenario."""
    payload = {"scenario": "aarav_arrival"}
    res = client.post("/api/simulate", json=payload)
    assert res.status_code == 200
    data = res.get_json()
    assert data["status"] == "processed"
    assert "event_id" in data
    assert data["threat_level"] in ["low", "medium", "high", "critical"]
    assert "threat_score" in data


def test_emergency_sos_endpoint(client):
    """Test /api/emergency-sos triggers family safety escalation."""
    payload = {"triggered_by": "Priya Reddy", "reason": "Test Alert"}
    res = client.post("/api/emergency-sos", json=payload)
    assert res.status_code == 200
    data = res.get_json()
    assert data["triggered_by"] == "Priya Reddy"
    assert data["status"] == "urgent_broadcast"
    assert "alarm_active" in data["metadata"]


def test_static_frontend_served(client):
    """Test root / serves dashboard/index.html."""
    res = client.get("/")
    assert res.status_code == 200
    assert b"SafeGuard" in res.data
    assert b"<!DOCTYPE html>" in res.data
