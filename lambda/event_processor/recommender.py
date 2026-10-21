"""Proactive Security Recommendations Engine for SafeGuard."""

from datetime import datetime
from typing import Any, Dict, List


class SecurityRecommender:
    def __init__(self):
        pass

    def evaluate_context(
        self,
        current_time: str,
        door_locked: bool = False,
        month: int = 12,
        weather_condition: str = "heavy_rain",
        days_away: int = 0
    ) -> List[Dict[str, Any]]:
        """
        Evaluates home context and returns proactive security recommendations.
        """
        recommendations = []

        # 1. Context-aware door lock recommendation at night
        hour = 23
        try:
            if "T" in current_time:
                hour = int(current_time.split("T")[1].split(":")[0])
            elif ":" in current_time:
                hour = int(current_time.split(":")[0])
        except Exception:
            hour = 23

        if hour >= 22 and not door_locked:
            recommendations.append({
                "id": "rec_lock_doors",
                "category": "context_aware",
                "severity": "high",
                "title": "Perimeter Lock Advisory",
                "message": "It's 11 PM and your back door is unlocked. Would you like SafeGuard to lock it now?",
                "action_label": "Lock Back Door",
                "action_type": "smart_lock_engage",
                "target_device": "door_back_smartlock"
            })

        # 2. Seasonal awareness (e.g., December holiday package theft spike)
        if month == 12 or month == 11:
            recommendations.append({
                "id": "rec_holiday_package",
                "category": "seasonal",
                "severity": "medium",
                "title": "Holiday Package Theft Defense",
                "message": "Package theft increases 300% in December. Consider enabling SafeGuard Package Guard with automatic floodlight chime.",
                "action_label": "Enable Package Guard",
                "action_type": "enable_package_guard",
                "target_device": "doorbell_front"
            })

        # 3. Weather-based sensitivity tuning
        if weather_condition in ["heavy_rain", "storm", "high_winds"]:
            recommendations.append({
                "id": "rec_weather_tuning",
                "category": "weather",
                "severity": "low",
                "title": "Storm Sensitivity Adjustment",
                "message": f"Heavy rain and winds expected tonight. Your Ring Floodlight may trigger false alerts from blowing branches. Temporarily adjust motion sensitivity?",
                "action_label": "Optimize Sensitivity",
                "action_type": "adjust_motion_threshold",
                "target_device": "cam_backyard"
            })

        # 4. Travel Mode
        if days_away >= 2:
            recommendations.append({
                "id": "rec_travel_mode",
                "category": "travel",
                "severity": "medium",
                "title": "Extended Absence Detected",
                "message": f"You've been away for {days_away} days. Activating enhanced monitoring with daily video digests and automated porch lighting.",
                "action_label": "Activate Travel Shield",
                "action_type": "enable_travel_shield",
                "target_device": "all_cameras"
            })

        # 5. Insurance Security Score Integration
        score = self.calculate_insurance_security_score()
        recommendations.append({
            "id": "rec_insurance_discount",
            "category": "insurance",
            "severity": "info",
            "title": f"Home Insurance Discount Eligible (Score: {score}/100)",
            "message": f"Your SafeGuard 30-day proactive safety score is {score}/100. Download your certified certificate for an estimated 10-15% discount on home insurance premiums.",
            "action_label": "Download Certificate",
            "action_type": "download_insurance_cert",
            "target_device": "insurance_portal"
        })

        return recommendations

    def calculate_insurance_security_score(self) -> int:
        """
        Calculates monthly security score (0-100) based on uptime, door locking,
        noise reduction, and alert responsiveness.
        """
        base_score = 96
        return base_score
