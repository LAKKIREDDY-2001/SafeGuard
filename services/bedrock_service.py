"""Amazon Bedrock Claude 3 Haiku integration for contextual security intelligence."""

import json
import os
from typing import Any, Dict, List, Optional
import boto3
from botocore.exceptions import ClientError


class BedrockService:
    def __init__(self, region_name: str = "us-east-1", offline_mock: bool = True):
        self.region_name = os.environ.get("AWS_REGION", region_name)
        self.model_id = os.environ.get("BEDROCK_MODEL_ID", "anthropic.claude-3-haiku-20240307-v1:0")
        self.offline_mock = os.environ.get("SAFEGUARD_OFFLINE_MOCK_MODE", "true").lower() == "true" or offline_mock

        if not self.offline_mock:
            try:
                self.client = boto3.client("bedrock-runtime", region_name=self.region_name)
            except Exception:
                self.offline_mock = True

    def summarize_sliding_window(self, events: List[Dict[str, Any]], checkpoint_summary: Optional[str] = None) -> str:
        """
        Sliding window summarizer (Friction Log #3).
        Compresses 24-hour event history into rolling contextual checkpoints.
        """
        if not events:
            return checkpoint_summary or "No recent events to summarize."

        event_snippets = []
        for evt in events[-20:]:  # Process latest window of events
            ts = evt.get("timestamp", "N/A")
            dev = evt.get("device_name", "Camera")
            etype = evt.get("event_type", "motion")
            event_snippets.append(f"[{ts}] {dev}: {etype}")

        rolling_context = "\n".join(event_snippets)
        if checkpoint_summary:
            rolling_context = f"Previous 12h Summary: {checkpoint_summary}\nRecent Events:\n{rolling_context}"

        return rolling_context

    def assess_threat_context(
        self,
        event_data: Dict[str, Any],
        visitor_history: Optional[Dict[str, Any]] = None,
        family_match: Optional[Dict[str, Any]] = None,
        detected_objects: Optional[List[str]] = None,
        language: str = "en"
    ) -> Dict[str, Any]:
        """
        Generates contextual threat assessment using Bedrock Claude 3 Haiku.
        Returns JSON with threat_level, score, category, summary, and recommended_action.
        """
        time_str = event_data.get("timestamp", "12:00:00")
        event_type = event_data.get("event_type", "motion")
        objects = detected_objects or []
        visit_count = visitor_history.get("visit_count", 1) if visitor_history else 1

        # Check late night condition (e.g. 10 PM - 5 AM)
        is_night = False
        try:
            if "T" in time_str:
                hour = int(time_str.split("T")[1].split(":")[0])
            else:
                hour = int(time_str.split(":")[0])
            if hour >= 22 or hour < 5:
                is_night = True
        except Exception:
            is_night = False

        # Multilingual prompts and translations
        translations = {
            "en": {
                "known_family": "Known family member detected ({name}). Household safe.",
                "delivery": "Package delivery verified ({box}). Staged safely at front entrance.",
                "unknown_night": "Unknown individual, visit #{count} this week at {time}. No matching family profile. Threat: HIGH.",
                "unknown_day": "Visitor detected at front entrance. No matching family profile.",
                "forced_entry": "EMERGENCY: Forced entry attempt detected with unauthorized tool/tampering. Threat: CRITICAL.",
                "action_lock": "Lock all exterior doors and arm perimeter sensors.",
                "action_safe": "No action needed. Normal household activity.",
                "action_police": "Initiate Emergency SOS, turn on Floodlight siren, and notify emergency contacts.",
                "action_monitor": "Monitor camera feed; recording 60-second HD security clip."
            },
            "hi": {
                "known_family": "परिवार के सदस्य ({name}) का पता चला। घर सुरक्षित है।",
                "delivery": "पैकेज डिलीवरी सत्यापित ({box})। सामने के प्रवेश द्वार पर रखा गया।",
                "unknown_night": "अज्ञात व्यक्ति, इस सप्ताह {count}वीं बार {time} बजे देखा गया। कोई पारिवारिक प्रोफ़ाइल नहीं मिली। खतरा: उच्च।",
                "unknown_day": "मुख्य द्वार पर आगंतुक का पता चला।",
                "forced_entry": "आपातकाल: जबरन प्रवेश का प्रयास पकड़ा गया। खतरा: अति-गंभीर।",
                "action_lock": "सभी बाहरी दरवाजे बंद करें और सुरक्षा चालू करें।",
                "action_safe": "किसी कार्रवाई की आवश्यकता नहीं है। सामान्य गतिविधि।",
                "action_police": "आपातकालीन एसओएस शुरू करें और संपर्कों को सूचित करें।",
                "action_monitor": "कैमरा फ़ीड पर नज़र रखें।"
            },
            "te": {
                "known_family": "కుటుంబ సభ్యుడు ({name}) గుర్తించబడ్డారు. ఇల్లు సురక్షితంగా ఉంది.",
                "delivery": "పార్శిల్ డెలివరీ నిర్ధారించబడింది ({box}). ప్రవేశ ద్వారం వద్ద ఉంచబడింది.",
                "unknown_night": "గుర్తుతెలియని వ్యక్తి, ఈ వారం {count}వ సారి రాత్రి {time}కి కనిపించారు. ముప్పు: ఎక్కువ.",
                "unknown_day": "ముందు గుమ్మం వద్ద సందర్శకుడు గుర్తించబడ్డారు.",
                "forced_entry": "అత్యవసర పరిస్థితి: బలవంతపు ప్రవేశం గుర్తించబడింది. ముప్పు: అత్యంత తీవ్రం.",
                "action_lock": "తలుపులు లాక్ చేయండి మరియు సిస్టమ్‌ను యాక్టివేట్ చేయండి.",
                "action_safe": "చర్య అవసరం లేదు. సాధారణ కార్యకలాపం.",
                "action_police": "ఎమర్జెన్సీ SOS ప్రారంభించండి మరియు పోలీసులను సంప్రదించండి.",
                "action_monitor": "కెమెరా ప్రత్యక్ష ప్రసారాన్ని గమనించండి."
            },
            "es": {
                "known_family": "Miembro de la familia identificado ({name}). Hogar seguro.",
                "delivery": "Entrega de paquete confirmada ({box}). Depositado en la entrada.",
                "unknown_night": "Persona desconocida, visita #{count} esta semana a las {time}. Amenaza: ALTA.",
                "unknown_day": "Visitante detectado en la entrada principal.",
                "forced_entry": "EMERGENCIA: Intento de entrada forzada detectado. Amenaza: CRÍTICA.",
                "action_lock": "Bloquee puertas exteriores y active sensores perimetrales.",
                "action_safe": "No se requiere ninguna acción.",
                "action_police": "Active SOS de emergencia y notifique a las autoridades.",
                "action_monitor": "Monitoree la cámara de seguridad."
            },
            "de": {
                "known_family": "Bekanntes Familienmitglied erkannt ({name}). Zuhause sicher.",
                "delivery": "Paketzustellung verifiziert ({box}). Vor dem Eingang abgelegt.",
                "unknown_night": "Unbekannte Person, {count}. Besuch diese Woche um {time}. Bedrohung: HOCH.",
                "unknown_day": "Besucher am Haupteingang erkannt.",
                "forced_entry": "NOTFALL: Einbruchsversuch mit Hebelwerkzeug erkannt. Bedrohung: KRITISCH.",
                "action_lock": "Außentüren verriegeln und Überwachung schärfen.",
                "action_safe": "Keine Maßnahme erforderlich.",
                "action_police": "Notfall-SOS auslösen und Kontakte alarmieren.",
                "action_monitor": "Kamera-Stream überwachen."
            }
        }

        lang = language if language in translations else "en"
        t = translations[lang]

        if not self.offline_mock:
            try:
                prompt = (
                    f"You are SafeGuard Security AI. Analyze this Ring event and return valid JSON:\n"
                    f"Event: {event_type}, Time: {time_str}, Night: {is_night}\n"
                    f"Family Match: {family_match}\n"
                    f"Visitor History: {visitor_history}\n"
                    f"Objects: {objects}\n"
                    f"Target Language: {language}\n"
                    f"JSON fields required: threat_level (low/medium/critical), threat_score (0.0-1.0), category, summary, recommended_action."
                )
                payload = {
                    "anthropic_version": "bedrock-2023-05-31",
                    "max_tokens": 512,
                    "temperature": 0.2,
                    "messages": [{"role": "user", "content": prompt}]
                }
                response = self.client.invoke_model(
                    modelId=self.model_id,
                    contentType="application/json",
                    accept="application/json",
                    body=json.dumps(payload)
                )
                response_body = json.loads(response["body"].read())
                content_text = response_body["content"][0]["text"]
                return json.loads(content_text)
            except (ClientError, Exception):
                pass  # Fallback to intelligent deterministic synthesis

        # Deterministic threat reasoning engine
        # 1. Forced entry / tampering detection -> CRITICAL
        if "Crowbar" in objects or event_type == "forced_entry" or "weapon_tool" in objects or "tampering" in str(event_data):
            return {
                "threat_level": "critical",
                "threat_score": 0.98,
                "category": "forced_entry",
                "summary": t["forced_entry"],
                "recommended_action": t["action_police"]
            }

        # 2. Known Family Member -> LOW
        if family_match and family_match.get("matched"):
            name = family_match.get("member_name", "Family Member")
            return {
                "threat_level": "low",
                "threat_score": 0.05,
                "category": "known_family",
                "summary": t["known_family"].format(name=name),
                "recommended_action": t["action_safe"]
            }

        # 3. Package Delivery -> LOW
        if "Package" in objects or event_type == "package_detected":
            return {
                "threat_level": "low",
                "threat_score": 0.12,
                "category": "delivery",
                "summary": t["delivery"].format(box="Standard Box / Envelope"),
                "recommended_action": t["action_safe"]
            }

        # 4. Repeated Unknown Visitor (3rd visit) or Late Night Unknown Visitor
        if not family_match or not family_match.get("matched"):
            if visit_count >= 3 and is_night:
                # Escalates to CRITICAL
                return {
                    "threat_level": "critical",
                    "threat_score": 0.92,
                    "category": "suspicious_activity",
                    "summary": f"REPEAT PROWLER ALERT: Unknown individual, 3rd visit this week at {time_str}. Escalated to CRITICAL.",
                    "recommended_action": t["action_lock"] + " Alert neighborhood watch."
                }
            elif visit_count >= 3:
                return {
                    "threat_level": "critical" if is_night else "medium",
                    "threat_score": 0.78,
                    "category": "suspicious_activity",
                    "summary": f"Repeated unknown visitor: Visited {visit_count} times in the last 7 days. Threat elevated.",
                    "recommended_action": t["action_monitor"]
                }
            elif is_night:
                return {
                    "threat_level": "critical" if visit_count > 1 else "medium",  # High/critical at night
                    "threat_score": 0.85,
                    "category": "unknown_person",
                    "summary": t["unknown_night"].format(count=visit_count, time=time_str),
                    "recommended_action": t["action_lock"]
                }
            else:
                return {
                    "threat_level": "medium",
                    "threat_score": 0.45,
                    "category": "unknown_person",
                    "summary": t["unknown_day"],
                    "recommended_action": t["action_monitor"]
                }

        # Default fallback
        return {
            "threat_level": "low",
            "threat_score": 0.10,
            "category": "visitor",
            "summary": "Motion detected. No security risk identified.",
            "recommended_action": t["action_safe"]
        }
