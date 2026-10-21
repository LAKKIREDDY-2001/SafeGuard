"""REST API for Family Profile & Safety Management."""

import json
from typing import Any, Dict
from models.family_models import FamilyMember
from services.dynamodb_service import DynamoDBService

db = DynamoDBService()


def lambda_handler(event: Dict[str, Any], context: Any = None) -> Dict[str, Any]:
    """Lambda handler for Family API routes."""
    http_method = event.get("httpMethod", "GET")
    path = event.get("path", "/family")

    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization"
    }

    if http_method == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"status": "ok"})}

    if http_method == "GET":
        if "wellness" in path:
            members = db.get_family_members()
            wellness_summary = [
                {
                    "name": m["name"],
                    "role": m["role"],
                    "wellness_status": m.get("wellness_status", "Safe"),
                    "last_seen": m.get("last_seen", "Unknown"),
                    "is_safe": m.get("is_safe", True)
                }
                for m in members
            ]
            return {"statusCode": 200, "headers": headers, "body": json.dumps(wellness_summary)}
        else:
            members = db.get_family_members()
            return {"statusCode": 200, "headers": headers, "body": json.dumps(members)}

    elif http_method == "POST":
        body = json.loads(event.get("body", "{}"))
        member_id = body.get("member_id", f"fam_{len(db.get_family_members()) + 1}")
        body["member_id"] = member_id
        db.update_family_member(member_id, body)
        return {"statusCode": 201, "headers": headers, "body": json.dumps(body)}

    return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Route not found"})}
