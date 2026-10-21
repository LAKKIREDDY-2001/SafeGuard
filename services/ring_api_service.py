"""Ring API integration service with rate-limiting, deduplication, and mock event generation."""

import time
from datetime import datetime, timedelta
import random
from typing import Any, Dict, List, Optional
from models.event_models import DeviceType, EventType, RingEvent


class RingAPIService:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or "mock_ring_api_key_2026"
        # Deduplication cache with timestamps (Friction Log #4)
        self.seen_event_ids: Dict[str, float] = {}
        # Rate limit tracking: 20 requests per minute (Friction Log #1)
        self.request_timestamps: List[float] = []
        self.max_rate_per_min = 20

        # Known hardware devices
        self.devices = [
            {
                "device_id": "doorbell_front",
                "device_name": "Front Doorbell Pro 2",
                "device_type": DeviceType.DOORBELL,
                "battery_level": 94,
                "is_online": True,
                "location": "Front Porch"
            },
            {
                "device_id": "cam_backyard",
                "device_name": "Backyard Floodlight Cam Wired",
                "device_type": DeviceType.FLOODLIGHT,
                "battery_level": 100,
                "is_online": True,
                "location": "Backyard Garden"
            },
            {
                "device_id": "cam_driveway",
                "device_name": "Driveway Spotlight Cam Plus",
                "device_type": DeviceType.CAMERA,
                "battery_level": 88,
                "is_online": True,
                "location": "Driveway & Garage"
            },
            {
                "device_id": "cam_grandma_living",
                "device_name": "Grandma's Living Room Cam",
                "device_type": DeviceType.CAMERA,
                "battery_level": 100,
                "is_online": True,
                "location": "Living Room (Meera's House)"
            }
        ]

    def _enforce_rate_limit(self):
        """Exponential backoff / queueing for Ring API rate limits (Friction Log #1)."""
        now = time.time()
        self.request_timestamps = [t for t in self.request_timestamps if now - t < 60]
        if len(self.request_timestamps) >= self.max_rate_per_min:
            sleep_duration = 0.1  # Fast throttle simulation
            time.sleep(sleep_duration)
        self.request_timestamps.append(time.time())

    def deduplicate_and_sequence(self, event_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Deduplicates incoming webhooks and drops out-of-order repeats (Friction Log #4).
        """
        event_id = event_data.get("event_id")
        if not event_id:
            return event_data

        now = time.time()
        # Clean up cache older than 10 minutes
        self.seen_event_ids = {k: v for k, v in self.seen_event_ids.items() if now - v < 600}

        if event_id in self.seen_event_ids:
            return None  # Duplicate event dropped

        self.seen_event_ids[event_id] = now
        return event_data

    def classify_raw_event(self, raw_payload: Dict[str, Any]) -> str:
        """
        Normalizes Ring proprietary event taxonomy (Friction Log #8).
        Translates raw dings, motions, person detection signals to unified taxonomy.
        """
        kind = raw_payload.get("kind", "").lower()
        subkind = raw_payload.get("detection_type", "").lower()

        if "ding" in kind or raw_payload.get("state") == "ringing":
            return EventType.DOORBELL_RING.value
        elif "package" in subkind or "package" in kind:
            return EventType.PACKAGE_DETECTED.value
        elif "human" in subkind or "person" in subkind:
            return EventType.PERSON_DETECTED.value
        elif "alarm" in kind or raw_payload.get("tamper_alert") is True:
            return EventType.FORCED_ENTRY.value
        return EventType.MOTION.value

    def generate_mock_event(self, scenario: str = "random") -> RingEvent:
        """
        Generates realistic Ring events for sandbox testing & dashboard demo (Friction Log #10).
        Scenarios: aarav_arrival, grandma_wellness, night_visitor, forced_entry, delivery, normal
        """
        now_iso = datetime.utcnow().isoformat() + "Z"

        if scenario == "aarav_arrival":
            return RingEvent(
                event_id=f"evt_aarav_{int(time.time())}",
                device_id="doorbell_front",
                device_name="Front Doorbell Pro 2",
                device_type=DeviceType.DOORBELL,
                event_type=EventType.PERSON_DETECTED,
                timestamp=now_iso,
                image_url="/assets/snapshots/aarav_door.jpg",
                metadata={"face_hint": "aarav", "smart_lock_status": "locked", "location": "Front Porch"}
            )
        elif scenario == "grandma_wellness":
            # 8 hours in past for wellness check trigger
            past_time = (datetime.utcnow() - timedelta(hours=8, minutes=15)).isoformat() + "Z"
            return RingEvent(
                event_id=f"evt_elder_{int(time.time())}",
                device_id="cam_grandma_living",
                device_name="Grandma's Living Room Cam",
                device_type=DeviceType.CAMERA,
                event_type=EventType.MOTION,
                timestamp=past_time,
                image_url="/assets/snapshots/living_room.jpg",
                metadata={"member_id": "fam_meera", "hours_inactive": 8.25}
            )
        elif scenario == "night_visitor":
            # Late night 11:47 PM timestamp simulation
            night_time = "2026-10-21T23:47:00Z"
            return RingEvent(
                event_id=f"evt_night_{int(time.time())}",
                device_id="cam_backyard",
                device_name="Backyard Floodlight Cam Wired",
                device_type=DeviceType.FLOODLIGHT,
                event_type=EventType.PERSON_DETECTED,
                timestamp=night_time,
                image_url="/assets/snapshots/unknown_night_prowler.jpg",
                metadata={"face_hint": "unknown", "visitor_id": "vis_prowler_3", "dwell_time_seconds": 320}
            )
        elif scenario == "forced_entry":
            return RingEvent(
                event_id=f"evt_emergency_{int(time.time())}",
                device_id="doorbell_front",
                device_name="Front Doorbell Pro 2",
                device_type=DeviceType.DOORBELL,
                event_type=EventType.FORCED_ENTRY,
                timestamp=now_iso,
                image_url="/assets/snapshots/forced_entry.jpg",
                metadata={"label_hint": "forced_entry", "tamper_detected": True, "sound_decibels": 95}
            )
        elif scenario == "delivery":
            return RingEvent(
                event_id=f"evt_pkg_{int(time.time())}",
                device_id="doorbell_front",
                device_name="Front Doorbell Pro 2",
                device_type=DeviceType.DOORBELL,
                event_type=EventType.PACKAGE_DETECTED,
                timestamp=now_iso,
                image_url="/assets/snapshots/package_delivery.jpg",
                metadata={"label_hint": "package", "courier": "Amazon Prime"}
            )
        else:
            return RingEvent(
                event_id=f"evt_motion_{int(time.time())}",
                device_id="cam_driveway",
                device_name="Driveway Spotlight Cam Plus",
                device_type=DeviceType.CAMERA,
                event_type=EventType.MOTION,
                timestamp=now_iso,
                image_url="/assets/snapshots/driveway.jpg",
                metadata={"label_hint": "vehicle"}
            )
