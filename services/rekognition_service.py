"""Amazon Rekognition integration service for SafeGuard."""

import os
from typing import Any, Dict, List, Optional
import boto3
from botocore.exceptions import ClientError


class RekognitionService:
    def __init__(self, region_name: str = "us-east-1", offline_mock: bool = True):
        self.region_name = os.environ.get("AWS_REGION", region_name)
        self.collection_id = os.environ.get("REKOGNITION_COLLECTION_ID", "safeguard-family-faces")
        # 90% confidence threshold tuning per Friction Log #6
        self.confidence_threshold = float(os.environ.get("REKOGNITION_CONFIDENCE_THRESHOLD", "90.0"))
        self.offline_mock = os.environ.get("SAFEGUARD_OFFLINE_MOCK_MODE", "true").lower() == "true" or offline_mock

        if not self.offline_mock:
            try:
                self.client = boto3.client("rekognition", region_name=self.region_name)
            except Exception:
                self.offline_mock = True

    def match_face(self, image_bytes: Optional[bytes] = None, face_hint: Optional[str] = None) -> Optional[Dict[str, Any]]:
        """
        Search face collection using 90% confidence threshold.
        Returns matched face information or None if unknown.
        """
        if self.offline_mock or image_bytes is None:
            # Deterministic mock response for testing and offline execution
            if face_hint == "aarav":
                return {
                    "matched": True,
                    "face_id": "face_aarav_reddy",
                    "member_name": "Aarav Reddy",
                    "role": "child",
                    "confidence": 98.4
                }
            elif face_hint == "meera" or face_hint == "grandma":
                return {
                    "matched": True,
                    "face_id": "face_grandma_meera",
                    "member_name": "Grandma Meera",
                    "role": "elder",
                    "confidence": 97.2
                }
            elif face_hint == "priya":
                return {
                    "matched": True,
                    "face_id": "face_priya_reddy",
                    "member_name": "Priya Reddy",
                    "role": "parent",
                    "confidence": 99.1
                }
            elif face_hint == "anita" or face_hint == "babysitter":
                return {
                    "matched": True,
                    "face_id": "face_anita_caretaker",
                    "member_name": "Anita Sharma (Babysitter)",
                    "role": "caregiver",
                    "confidence": 95.8
                }
            elif face_hint == "unknown":
                return {
                    "matched": False,
                    "face_id": "face_unknown_repeat_visitor",
                    "member_name": "Unknown Person",
                    "role": "unknown",
                    "confidence": 88.0  # Under 90% threshold for family
                }
            return None

        try:
            # Production Rekognition call with 90% threshold
            response = self.client.search_faces_by_image(
                CollectionId=self.collection_id,
                Image={"Bytes": image_bytes},
                FaceMatchThreshold=self.confidence_threshold,
                MaxFaces=1
            )
            matches = response.get("FaceMatches", [])
            if matches:
                top_match = matches[0]
                return {
                    "matched": True,
                    "face_id": top_match["Face"]["FaceId"],
                    "confidence": top_match["Similarity"]
                }
            return {"matched": False, "confidence": 0.0}
        except (ClientError, Exception):
            return {"matched": False, "confidence": 0.0}

    def detect_labels(self, image_bytes: Optional[bytes] = None, label_hint: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Detect objects (e.g., Person, Package, Delivery Truck, Crowbar/Weapon, Pet).
        """
        if self.offline_mock or image_bytes is None:
            if label_hint == "package":
                return [
                    {"name": "Package", "confidence": 99.2, "category": "delivery"},
                    {"name": "Box", "confidence": 98.7, "category": "delivery"},
                    {"name": "Delivery Person", "confidence": 94.1, "category": "person"}
                ]
            elif label_hint == "forced_entry":
                return [
                    {"name": "Person", "confidence": 98.5, "category": "person"},
                    {"name": "Crowbar", "confidence": 92.4, "category": "weapon_tool"},
                    {"name": "Ski Mask", "confidence": 91.0, "category": "disguise"}
                ]
            elif label_hint == "animal":
                return [
                    {"name": "Raccoon", "confidence": 96.5, "category": "animal"}
                ]
            elif label_hint == "vehicle":
                return [
                    {"name": "Delivery Van", "confidence": 97.0, "category": "vehicle"}
                ]
            else:
                return [
                    {"name": "Person", "confidence": 96.0, "category": "person"}
                ]

        try:
            response = self.client.detect_labels(
                Image={"Bytes": image_bytes},
                MaxLabels=10,
                MinConfidence=self.confidence_threshold
            )
            return [
                {"name": label["Name"], "confidence": label["Confidence"], "category": "general"}
                for label in response.get("Labels", [])
            ]
        except (ClientError, Exception):
            return []
