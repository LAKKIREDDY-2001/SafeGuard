"""REST API for SafeGuard User Preferences, Languages, and Thresholds."""

import json
from typing import Any, Dict
from services.dynamodb_service import DynamoDBService

db = DynamoDBService()


def lambda_handler(event: Dict[str, Any], context: Any = None) -> Dict[str, Any]:
    """Lambda handler for user preferences & settings."""
    http_method = event.get("httpMethod", "GET")
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization"
    }

    if http_method == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"status": "ok"})}

    if http_method == "GET":
        settings = db.get_settings()
        return {"statusCode": 200, "headers": headers, "body": json.dumps(settings)}

    elif http_method in ["PUT", "POST"]:
        body = json.loads(event.get("body", "{}"))
        updated = db.update_settings(body)
        return {"statusCode": 200, "headers": headers, "body": json.dumps(updated)}

    return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}
