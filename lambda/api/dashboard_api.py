"""REST API for SafeGuard Web Dashboard and Live Demonstration."""

import json
from datetime import datetime, timedelta
import random
from typing import Any, Dict
import os
import sys

curr_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(curr_dir)
root_dir = os.path.dirname(parent_dir)
for p in [curr_dir, parent_dir, root_dir]:
    if p not in sys.path:
        sys.path.insert(0, p)

from event_processor.handler import processor
from services.dynamodb_service import DynamoDBService
from services.ring_api_service import RingAPIService

db = DynamoDBService()
ring = RingAPIService()


def get_dashboard_data() -> Dict[str, Any]:
    """Aggregates all real-time stats, events, camera statuses, and family cards."""
    recent_events = db.get_recent_events(limit=25)
    patterns = db.get_all_visitor_patterns()
    family = db.get_family_members()
    settings = db.get_settings()

    # Pre-populate sample events if store is empty for instant showcase
    if not recent_events:
        now = datetime.utcnow()
        sample_records = [
            {
                "event_id": "evt_demo_101",
                "device_id": "doorbell_front",
                "device_name": "Front Doorbell Pro 2",
                "timestamp": (now - timedelta(minutes=12)).isoformat() + "Z",
                "threat_assessment": {
                    "threat_level": "low",
                    "threat_score": 0.08,
                    "category": "known_family",
                    "summary": "Priya Reddy identified entering front door. Household secure.",
                    "recommended_action": "No action needed. Household safe."
                },
                "family_alert": None
            },
            {
                "event_id": "evt_demo_102",
                "device_id": "cam_backyard",
                "device_name": "Backyard Floodlight Cam Wired",
                "timestamp": (now - timedelta(minutes=45)).isoformat() + "Z",
                "threat_assessment": {
                    "threat_level": "critical",
                    "threat_score": 0.94,
                    "category": "suspicious_activity",
                    "summary": "Unknown individual, 3rd visit this week at 11:47 PM. No matching family profile. Threat: HIGH.",
                    "recommended_action": "Lock exterior doors. Floodlight recording 60s HD clip."
                },
                "family_alert": None
            },
            {
                "event_id": "evt_demo_103",
                "device_id": "doorbell_front",
                "device_name": "Front Doorbell Pro 2",
                "timestamp": (now - timedelta(hours=2, minutes=15)).isoformat() + "Z",
                "threat_assessment": {
                    "threat_level": "low",
                    "threat_score": 0.05,
                    "category": "known_family",
                    "summary": "Aarav (10) arrived home safely from school at 3:15 PM. Front door locked.",
                    "recommended_action": "System auto-locked front deadbolt."
                },
                "family_alert": {
                    "alert_type": "kid_arrival",
                    "message": "Aarav (10) arrived home from school at 3:15 PM. Front door locked."
                }
            },
            {
                "event_id": "evt_demo_104",
                "device_id": "cam_grandma_living",
                "device_name": "Grandma's Living Room Cam",
                "timestamp": (now - timedelta(hours=8, minutes=10)).isoformat() + "Z",
                "threat_assessment": {
                    "threat_level": "medium",
                    "threat_score": 0.65,
                    "category": "visitor",
                    "summary": "Grandma Meera (75): Inactivity detected for 8.2 hours. Wellness check initiated.",
                    "recommended_action": "Automated wellness check notification delivered to Priya."
                },
                "family_alert": {
                    "alert_type": "elder_check",
                    "message": "No motion detected at Grandma's Ring camera for 8+ hours. Wellness check alert sent."
                }
            }
        ]
        for s in sample_records:
            db.save_event(s)
        recent_events = db.get_recent_events(limit=25)

    stats = {
        "daily_ring_raw_events": 164,
        "safeguard_meaningful_alerts": 8,
        "noise_reduction_percentage": 95.1,
        "active_cameras": len(ring.devices),
        "threat_breakdown": {
            "low": 156,
            "medium": 6,
            "critical": 2
        },
        "overall_security_score": 96,
        "insurance_discount_pct": 12,
        "system_status": "All Systems Operational"
    }

    return {
        "stats": stats,
        "recent_events": recent_events,
        "cameras": ring.devices,
        "family": family,
        "visitor_patterns": patterns,
        "settings": settings,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }


def lambda_handler(event: Dict[str, Any], context: Any = None) -> Dict[str, Any]:
    """Lambda routing handler for Dashboard API."""
    path = event.get("path", "/api/dashboard")
    http_method = event.get("httpMethod", "GET")

    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization"
    }

    if http_method == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"status": "ok"})}

    if http_method == "GET":
        data = get_dashboard_data()
        return {"statusCode": 200, "headers": headers, "body": json.dumps(data)}

    elif http_method == "POST":
        body = json.loads(event.get("body", "{}"))
        action = body.get("action", "")

        if "simulate" in path or action == "simulate":
            scenario = body.get("scenario", "aarav_arrival")
            mock_evt = ring.generate_mock_event(scenario)
            result = processor.process_event(mock_evt.dict())
            return {"statusCode": 200, "headers": headers, "body": json.dumps(result)}

        elif "emergency-sos" in path or action == "emergency_sos":
            sos = processor.family_safety.trigger_emergency_sos(
                triggered_by=body.get("triggered_by", "Priya Reddy"),
                reason=body.get("reason", "Manual Dashboard SOS")
            )
            return {"statusCode": 200, "headers": headers, "body": json.dumps(sos.dict())}

    return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Not Found"})}


# Standalone runner for local development and live dashboard preview
if __name__ == "__main__":
    from flask import Flask, jsonify, request
    from flask_cors import CORS

    app = Flask(__name__)
    CORS(app)

    @app.route("/api/dashboard", methods=["GET"])
    def dashboard():
        return jsonify(get_dashboard_data())

    @app.route("/api/simulate", methods=["POST"])
    def simulate():
        data = request.json or {}
        scenario = data.get("scenario", "aarav_arrival")
        mock_evt = ring.generate_mock_event(scenario)
        result = processor.process_event(mock_evt.dict())
        return jsonify(result)

    @app.route("/api/emergency-sos", methods=["POST"])
    def emergency_sos():
        data = request.json or {}
        sos = processor.family_safety.trigger_emergency_sos(
            triggered_by=data.get("triggered_by", "Priya Reddy"),
            reason=data.get("reason", "Web Dashboard SOS")
        )
        return jsonify(sos.dict())

    print("SafeGuard Dashboard API Server running on http://127.0.0.1:5001")
    app.run(port=5001, debug=True)
