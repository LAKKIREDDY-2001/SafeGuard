/**
 * SafeGuard — AI-Powered Ring Security Intelligence Platform
 * Dashboard Application Logic & Live Simulation Engine
 */

// Application State
const state = {
  currentLang: 'en',
  activeFilter: 'all',
  soundEnabled: true,
  hapticEnabled: true,
  nightMode: true,
  isLockdown: false,
  rawEventsCount: 164,
  meaningfulAlertsCount: 8,
  securityScore: 96,
  events: []
};

// Multilingual Translations Dictionary (5 Languages)
const i18n = {
  en: {
    heroCriticalTitle: "CRITICAL THREAT",
    heroNightSummary: "Unknown individual, 3rd visit this week at 11:47 PM. No matching family profile. Bedrock AI: Threat level HIGH.",
    heroAction: "Lock exterior doors. Floodlight engaged; saving 60-second HD security clip.",
    aaravArrivalMsg: "Aarav (10) arrived home safely from school at 3:15 PM. Front door locked.",
    meeraWellnessMsg: "Grandma Meera (75): No motion detected for 8.2 hours. Wellness check initiated.",
    pkgDeliveryMsg: "Package delivery verified from FedEx. Staged safely at front entrance.",
    forcedEntryMsg: "EMERGENCY: Forced entry attempt detected with tampering tool. Alarm active.",
    alexaWhosAtDoor: "At your front door, SafeGuard Bedrock AI identified an unknown individual. This is his 3rd visit this week, all after 10 PM. Threat level is HIGH. I have turned on your front floodlight, saved a video clip, and sent a push alert to Priya's phone.",
    alexaFamilySafe: "Here is your family safety status: Aarav arrived safely home from school at 3:15 PM, and the front door deadbolt is locked. Priya is active. Notice: Grandma Meera has had no motion detected for 8 hours. SafeGuard has triggered a gentle wellness check alert.",
    alexaNightReport: "Last night between 11 PM and 6 AM, your Ring cameras detected 14 motion triggers. 13 were filtered out as harmless wind and a neighbor's cat. At 2:14 AM, the Driveway Spotlight detected a delivery van turning around. Low threat. No breaches occurred.",
    alexaSecurityReport: "Here is your weekly SafeGuard report. Your Ring cameras captured 164 motion events. SafeGuard AI filtered out 156 harmless events with 95% noise reduction. Security score is 96 out of 100, saving you 12% on insurance.",
    alexaArm: "SafeGuard is now armed in Enhanced Perimeter Protection mode. All Ring floodlights and motion sensors are set to maximum AI sensitivity, smart locks are engaged, and zero-false-positive filtering is active."
  },
  hi: {
    heroCriticalTitle: "अति-गंभीर खतरा",
    heroNightSummary: "अज्ञात व्यक्ति, इस सप्ताह 3री बार 11:47 बजे देखा गया। कोई पारिवारिक प्रोफ़ाइल नहीं मिली। खतरा: उच्च।",
    heroAction: "सभी बाहरी दरवाजे बंद करें। फ्लडलाइट चालू है; 60 सेकंड की क्लिप सुरक्षित की जा रही है।",
    aaravArrivalMsg: "आरव (10) दोपहर 3:15 बजे स्कूल से सुरक्षित घर पहुंचा। मुख्य दरवाजा बंद है।",
    meeraWellnessMsg: "दादी मीरा (75): 8.2 घंटे से कोई हलचल नहीं। वेलनेस जांच शुरू की गई।",
    pkgDeliveryMsg: "FedEx से पैकेज डिलीवरी सत्यापित। मुख्य द्वार पर सुरक्षित रखा गया।",
    forcedEntryMsg: "आपातकाल: जबरन प्रवेश का प्रयास पकड़ा गया। अलार्म सक्रिय है।",
    alexaWhosAtDoor: "आपके मुख्य द्वार पर, सेफ़गार्ड एआई ने एक अज्ञात व्यक्ति की पहचान की है। यह इस सप्ताह उनकी तीसरी यात्रा है। खतरा स्तर उच्च है।",
    alexaFamilySafe: "आरव 3:15 बजे स्कूल से सुरक्षित घर पहुंच गया है। दादी मीरा के कमरे में 8 घंटे से कोई हलचल नहीं हुई है, वेलनेस अलर्ट भेजा गया है।",
    alexaNightReport: "कल रात 14 मोशन अलर्ट में से 13 को हवा और बिल्लियों के रूप में सुरक्षित रूप से फ़िल्टर किया गया। घर पूरी तरह सुरक्षित है।",
    alexaSecurityReport: "इस सप्ताह 164 घटनाओं में से 156 को फ़िल्टर किया गया। 95% शोर में कमी। सुरक्षा स्कोर 96/100 है।",
    alexaArm: "सेफ़गार्ड अब एन्हांस्ड पेरीमीटर प्रोटेक्शन मोड में सक्रिय है। सभी स्मार्ट लॉक सुरक्षित हैं।"
  },
  te: {
    heroCriticalTitle: "తీవ్రమైన ముప్పు",
    heroNightSummary: "గుర్తుతెలియని వ్యక్తి, ఈ వారం 3వ సారి రాత్రి 11:47కి కనిపించారు. ముప్పు: ఎక్కువ.",
    heroAction: "తలుపులు లాక్ చేయండి. ఫ్లడ్‌లైట్ ఆన్ చేయబడింది; రికార్డింగ్ సేవ్ చేయబడింది.",
    aaravArrivalMsg: "ఆరవ్ (10) మధ్యాహ్నం 3:15 గంటలకు పాఠశాల నుండి సురక్షితంగా ఇంటికి చేరుకున్నాడు. తలుపు లాక్ చేయబడింది.",
    meeraWellnessMsg: "బామ్మ మీరా (75): 8.2 గంటలుగా కదలిక లేదు. వెల్‌నెస్ చెక్ ప్రారంభించబడింది.",
    pkgDeliveryMsg: "FedEx పార్శిల్ డెలివరీ నిర్ధారించబడింది. ప్రవేశ ద్వారం వద్ద ఉంచబడింది.",
    forcedEntryMsg: "అత్యవసర పరిస్థితి: బలవంతపు ప్రవేశం గుర్తించబడింది. అలారం మోగింది.",
    alexaWhosAtDoor: "ముందు గుమ్మం వద్ద గుర్తుతెలియని వ్యక్తి ఉన్నారు. ఈ వారం ఇది 3వ సారి. ముప్పు చాలా ఎక్కువ.",
    alexaFamilySafe: "ఆరవ్ సురక్షితంగా ఇంటికి చేరుకున్నాడు. బామ్మగారి వద్ద 8 గంటలుగా కదలిక లేదు, సమాచారం పంపబడింది.",
    alexaNightReport: "నిన్న రాత్రి ఎలాంటి ముప్పు లేదు. 14 ఈవెంట్లలో 13 సాధారణమైనవిగా ఫిల్టర్ చేయబడ్డాయి.",
    alexaSecurityReport: "ఈ వారం 95% అనవసర హెచ్చరికలు తొలగించబడ్డాయి. భద్రతా స్కోరు 96/100.",
    alexaArm: "సేఫ్‌గార్డ్ రక్షణ వ్యవస్థ విజయవంతంగా ఆన్ చేయబడింది."
  },
  es: {
    heroCriticalTitle: "AMENAZA CRÍTICA",
    heroNightSummary: "Persona desconocida, 3ª visita esta semana a las 11:47 PM. Sin perfil familiar coincidente. Amenaza: ALTA.",
    heroAction: "Bloquear puertas exteriores. Reflector encendido; grabando clip HD de 60 segundos.",
    aaravArrivalMsg: "Aarav (10) llegó seguro de la escuela a las 3:15 PM. Puerta principal cerrada.",
    meeraWellnessMsg: "Abuela Meera (75): Sin movimiento durante 8.2 horas. Verificación de bienestar iniciada.",
    pkgDeliveryMsg: "Entrega de paquete verificada de FedEx. Depositado de forma segura.",
    forcedEntryMsg: "EMERGENCIA: Intento de entrada forzada detectado. Alarma activa.",
    alexaWhosAtDoor: "En su puerta principal, SafeGuard AI identificó a un individuo desconocido. Es su 3ª visita esta semana después de las 10 PM. Nivel de amenaza: ALTO.",
    alexaFamilySafe: "Aarav llegó sano y salvo a las 3:15 PM con la puerta cerrada. La abuela Meera no ha registrado movimiento en 8 horas; alerta de bienestar enviada.",
    alexaNightReport: "Anoche se filtraron 13 eventos inofensivos de 14. No hubo brechas de seguridad.",
    alexaSecurityReport: "164 eventos reducidos a 8 alertas útiles (95% de reducción de ruido). Puntuación de seguridad: 96/100.",
    alexaArm: "SafeGuard está armado en modo de protección perimetral mejorada."
  },
  de: {
    heroCriticalTitle: "KRITISCHE BEDROHUNG",
    heroNightSummary: "Unbekannte Person, 3. Besuch diese Woche um 23:47 Uhr. Kein Familienprofil. Bedrohung: HOCH.",
    heroAction: "Außentüren verriegeln. Flutlicht aktiviert; 60s HD-Clip wird gespeichert.",
    aaravArrivalMsg: "Aarav (10) ist um 15:15 Uhr sicher aus der Schule nach Hause gekommen. Haustür verriegelt.",
    meeraWellnessMsg: "Oma Meera (75): Keine Bewegung seit 8,2 Stunden. Wohlfühl-Check eingeleitet.",
    pkgDeliveryMsg: "Paketzustellung von FedEx verifiziert. Sicher vor dem Eingang abgelegt.",
    forcedEntryMsg: "NOTFALL: Einbruchsversuch mit Hebelwerkzeug erkannt. Alarm aktiv.",
    alexaWhosAtDoor: "Vor Ihrer Haustür hat SafeGuard AI eine unbekannte Person erkannt. 3. Besuch diese Woche. Bedrohung: HOCH.",
    alexaFamilySafe: "Aarav ist um 15:15 Uhr sicher angekommen. Bei Oma Meera gab es seit 8 Stunden keine Bewegung; Wohlfühl-Check aktiv.",
    alexaNightReport: "Letzte Nacht wurden 14 Ereignisse erfasst und 13 als harmlos eingestuft. Keine Bedrohungen.",
    alexaSecurityReport: "164 Ereignisse wurden gefiltert, 95% Rauschunterdrückung. Sicherheitsbewertung 96 von 100.",
    alexaArm: "SafeGuard ist im erweiterten Perimeterschutzmodus scharfgeschaltet."
  }
};

// Web Audio API Synthesizer for Accessibility Audio Cues
const audioCtx = (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext))
  ? new (window.AudioContext || window.webkitAudioContext)()
  : null;

function playAudioCue(type) {
  if (!state.soundEnabled || !audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'critical') {
      // Urgent high dual tone
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(440, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'medium') {
      // Warm chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else {
      // Gentle safe confirmation tone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    console.warn("Audio cue error:", e);
  }
}

function triggerHaptic(duration = 200) {
  if (state.hapticEnabled && typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(duration);
  }
}

function announceToScreenReader(message) {
  const announcer = document.getElementById('screen-reader-announcer');
  if (announcer) {
    announcer.textContent = message;
  }
}

// Toast Notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <strong style="font-size:0.85rem;">${type.toUpperCase()}: SafeGuard Notice</strong>
      <button style="background:none;border:none;color:#94a3b8;cursor:pointer;" onclick="this.parentElement.parentElement.remove()">&times;</button>
    </div>
    <p style="font-size:0.78rem; margin-top:0.25rem; color:#f1f5f9;">${message}</p>
  `;

  container.appendChild(toast);
  announceToScreenReader(message);

  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 5000);
}

// Initial Sample Event Data
const sampleEvents = [
  {
    id: "evt_101",
    device: "Front Doorbell Pro 2",
    time: "12 mins ago",
    level: "low",
    title: "Priya Reddy (Family Member)",
    desc: "Recognized with 99.1% facial confidence. Front door unlocked.",
    category: "known_family"
  },
  {
    id: "evt_102",
    device: "Backyard Floodlight Cam",
    time: "45 mins ago",
    level: "critical",
    title: "Unknown Prowler (3rd Visit)",
    desc: "11:47 PM. No family match. Bedrock AI classified threat as HIGH.",
    category: "suspicious_activity"
  },
  {
    id: "evt_103",
    device: "Front Doorbell Pro 2",
    time: "3:15 PM",
    level: "low",
    title: "Aarav Safe Arrival",
    desc: "Arrived home from school at 3:15 PM. Front deadbolt secured.",
    category: "kid_arrival"
  },
  {
    id: "evt_104",
    device: "Grandma's Living Room Cam",
    time: "8 hrs ago",
    level: "medium",
    title: "Grandma Meera Inactivity",
    desc: "No movement detected for 8+ hours. Wellness check initiated.",
    category: "elder_check"
  },
  {
    id: "evt_105",
    device: "Driveway Spotlight Cam",
    time: "2:14 AM",
    level: "low",
    title: "Delivery Van Turnaround",
    desc: "Vehicle detected turning in driveway. No perimeter intrusion.",
    category: "vehicle"
  }
];

function renderEvents(filter = 'all') {
  const listEl = document.getElementById('events-stream-list');
  if (!listEl) return;

  const filtered = sampleEvents.filter(e => {
    if (filter === 'all') return true;
    return e.level === filter;
  });

  listEl.innerHTML = '';
  filtered.forEach(evt => {
    const row = document.createElement('div');
    row.className = 'event-row';
    row.innerHTML = `
      <div class="event-left">
        <span class="threat-dot-badge ${evt.level}"></span>
        <div class="event-info">
          <strong>${evt.title}</strong>
          <p>${evt.desc}</p>
        </div>
      </div>
      <div class="event-meta">
        <div>${evt.time}</div>
        <div style="font-size:0.7rem; color:#64748b;">${evt.device}</div>
      </div>
    `;
    listEl.appendChild(row);
  });
}

// 24-Hour Activity Baseline Chart
function renderHourlyChart() {
  const container = document.getElementById('hourly-bars-container');
  if (!container) return;

  container.innerHTML = '';
  // 24 hours simulation
  const activityData = [
    1, 8, 2, 0, 0, 1, 4, 12, 18, 15, 14, 16, 22, 19, 24, 28, 21, 16, 14, 12, 9, 6, 14, 3
  ];

  activityData.forEach((count, hour) => {
    const col = document.createElement('div');
    col.className = 'hour-bar-col';
    col.title = `${hour}:00 - ${count} events`;

    const bar = document.createElement('div');
    bar.className = 'hour-bar';
    if (hour === 1 || hour === 22 || hour === 23) {
      bar.classList.add('anomaly');
    }
    const heightPct = Math.min(100, Math.max(10, (count / 28) * 100));
    bar.style.height = `${heightPct}%`;

    col.appendChild(bar);
    container.appendChild(col);
  });
}

// Voice Intent Execution (Alexa Simulator)
function executeAlexaIntent(intentKey) {
  const currentT = i18n[state.currentLang] || i18n.en;
  let speech = "";
  let cardTitle = "";
  let cardText = "";

  if (intentKey === 'whos_at_door') {
    speech = currentT.alexaWhosAtDoor;
    cardTitle = "Visitor Alert: Unknown Person (Threat: HIGH)";
    cardText = "Bedrock Claude 3 Haiku: 3rd visit this week at 11:47 PM. Rekognition: 0% match to family profiles.\nAction: Floodlight turned on, video clip saved.";
    playAudioCue('critical');
    triggerHaptic(300);
  } else if (intentKey === 'is_family_safe') {
    speech = currentT.alexaFamilySafe;
    cardTitle = "Family Safety Status";
    cardText = "• Aarav (10): Safe at Home (Door Locked)\n• Priya (38): Active at Home\n• Grandma Meera (75): Wellness Check Alert Sent (8h inactive)";
    playAudioCue('medium');
    triggerHaptic(150);
  } else if (intentKey === 'what_happened_last_night') {
    speech = currentT.alexaNightReport;
    cardTitle = "Overnight Activity Summary";
    cardText = "14 Ring events detected. 13 safely suppressed as harmless wind & cat.\n2:14 AM: Delivery Van turnaround (Low Threat). 0 breaches.";
    playAudioCue('safe');
  } else if (intentKey === 'security_report') {
    speech = currentT.alexaSecurityReport;
    cardTitle = "Weekly Security Intelligence Report";
    cardText = "164 Raw Events -> 8 Meaningful Alerts (95% Noise Reduction)\nSecurity Score: 96/100 (12% Insurance Discount Eligible)";
    playAudioCue('safe');
  } else if (intentKey === 'arm_safeguard') {
    speech = currentT.alexaArm;
    cardTitle = "SafeGuard Armed";
    cardText = "Mode: Enhanced Perimeter Protection\nSmart Deadbolts: Locked\nCameras: Maximum AI Sensitivity";
    playAudioCue('safe');
  }

  // Update Echo Show visual card
  const titleEl = document.getElementById('echo-card-title');
  const textEl = document.getElementById('echo-card-text');
  const speechOutput = document.getElementById('alexa-speech-output');
  const soundwave = document.getElementById('echo-soundwave');

  if (titleEl) titleEl.textContent = cardTitle;
  if (textEl) textEl.textContent = cardText;
  if (speechOutput) speechOutput.textContent = `"${speech}"`;

  // Animate soundwave
  if (soundwave) {
    soundwave.classList.add('active');
    setTimeout(() => soundwave.classList.remove('active'), 4000);
  }

  // Speak aloud using Web Speech Synthesis if available
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speech);
    // Map language
    const langMap = { en: 'en-US', hi: 'hi-IN', te: 'te-IN', es: 'es-ES', de: 'de-DE' };
    utterance.lang = langMap[state.currentLang] || 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  announceToScreenReader(`Alexa answered: ${speech}`);
}

// Live Demo Scenarios
function triggerDemoScenario(scenario) {
  const currentT = i18n[state.currentLang] || i18n.en;

  if (scenario === 'aarav_arrival') {
    playAudioCue('safe');
    triggerHaptic(100);
    showToast(currentT.aaravArrivalMsg, 'low');
    sampleEvents.unshift({
      id: `evt_${Date.now()}`,
      device: "Front Doorbell Pro 2",
      time: "Just now",
      level: "low",
      title: "🎒 Aarav (10) Arrived Home",
      desc: currentT.aaravArrivalMsg,
      category: "kid_arrival"
    });
    renderEvents(state.activeFilter);
  } else if (scenario === 'night_visitor') {
    playAudioCue('critical');
    triggerHaptic(400);
    showToast(currentT.heroNightSummary, 'critical');
    sampleEvents.unshift({
      id: `evt_${Date.now()}`,
      device: "Backyard Floodlight Cam",
      time: "11:47 PM",
      level: "critical",
      title: "🌙 Unknown Visitor (3rd Visit)",
      desc: currentT.heroNightSummary,
      category: "suspicious_activity"
    });
    renderEvents(state.activeFilter);
  } else if (scenario === 'grandma_wellness') {
    playAudioCue('medium');
    triggerHaptic(200);
    showToast(currentT.meeraWellnessMsg, 'medium');
    const pill = document.getElementById('meera-status-pill');
    if (pill) {
      pill.textContent = "Wellness Alert Active";
      pill.className = "status-pill amber";
    }
  } else if (scenario === 'delivery') {
    playAudioCue('safe');
    showToast(currentT.pkgDeliveryMsg, 'low');
    sampleEvents.unshift({
      id: `evt_${Date.now()}`,
      device: "Front Doorbell Pro 2",
      time: "Just now",
      level: "low",
      title: "📦 Package Delivered",
      desc: currentT.pkgDeliveryMsg,
      category: "delivery"
    });
    renderEvents(state.activeFilter);
  } else if (scenario === 'forced_entry') {
    playAudioCue('critical');
    triggerHaptic(500);
    showToast(currentT.forcedEntryMsg, 'critical');
    sampleEvents.unshift({
      id: `evt_${Date.now()}`,
      device: "Front Doorbell Pro 2",
      time: "Immediate",
      level: "critical",
      title: "🚨 Forced Entry Attempt",
      desc: currentT.forcedEntryMsg,
      category: "forced_entry"
    });
    renderEvents(state.activeFilter);
  }
}

// Language Update
function updateLanguage(newLang) {
  state.currentLang = newLang;
  const currentT = i18n[newLang] || i18n.en;

  const heroBadge = document.getElementById('hero-threat-badge');
  const heroSummary = document.getElementById('hero-threat-summary');
  const heroAction = document.getElementById('hero-recommended-action');

  if (heroBadge) heroBadge.textContent = currentT.heroCriticalTitle;
  if (heroSummary) heroSummary.textContent = `"${currentT.heroNightSummary}"`;
  if (heroAction) heroAction.innerHTML = `<strong>Recommended Action:</strong> ${currentT.heroAction}`;

  showToast(`Language switched to ${newLang.toUpperCase()}`, 'info');
}

// Emergency SOS Action
function triggerEmergencySOS() {
  playAudioCue('critical');
  triggerHaptic(800);

  const confirmed = confirm("🚨 EMERGENCY SOS BROADCAST: This will sound all Ring 110dB sirens, notify Priya Reddy, lock all deadbolts, and alert emergency contacts. Proceed?");
  if (confirmed) {
    showToast("EMERGENCY SOS BROADCAST ACTIVE. All sirens engaged. 911 dispatch escalation initiated.", "critical");
    announceToScreenReader("Emergency SOS activated. Ring sirens sounding.");
  }
}

// DOM Event Bindings
document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
  renderHourlyChart();

  // Multi-Language Switcher
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => updateLanguage(e.target.value));
  }

  // Accessibility Panel Toggle
  const a11yToggle = document.getElementById('btn-a11y-toggle');
  const a11yPanel = document.getElementById('a11y-panel');
  const a11yClose = document.getElementById('btn-close-a11y');

  if (a11yToggle && a11yPanel) {
    a11yToggle.addEventListener('click', () => {
      a11yPanel.classList.toggle('hidden');
    });
  }
  if (a11yClose && a11yPanel) {
    a11yClose.addEventListener('click', () => {
      a11yPanel.classList.add('hidden');
    });
  }

  // Accessibility Toggles
  const chkContrast = document.getElementById('chk-high-contrast');
  if (chkContrast) {
    chkContrast.addEventListener('change', (e) => {
      document.body.classList.toggle('high-contrast', e.target.checked);
    });
  }

  const chkLargeText = document.getElementById('chk-large-text');
  if (chkLargeText) {
    chkLargeText.addEventListener('change', (e) => {
      document.body.classList.toggle('large-text', e.target.checked);
    });
  }

  const chkSound = document.getElementById('chk-sound-cues');
  if (chkSound) {
    chkSound.addEventListener('change', (e) => {
      state.soundEnabled = e.target.checked;
    });
  }

  const chkHaptic = document.getElementById('chk-haptic-cues');
  if (chkHaptic) {
    chkHaptic.addEventListener('change', (e) => {
      state.hapticEnabled = e.target.checked;
    });
  }

  const btnTestChime = document.getElementById('btn-test-chime');
  if (btnTestChime) {
    btnTestChime.addEventListener('click', () => {
      playAudioCue('critical');
      setTimeout(() => playAudioCue('medium'), 400);
      setTimeout(() => playAudioCue('safe'), 800);
    });
  }

  // Emergency SOS Button
  const btnSOS = document.getElementById('btn-emergency-sos');
  if (btnSOS) {
    btnSOS.addEventListener('click', triggerEmergencySOS);
  }

  // Filter Pills
  document.querySelectorAll('.filter-pills .pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-pills .pill').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      state.activeFilter = e.target.dataset.filter;
      renderEvents(state.activeFilter);
    });
  });

  // Demo Scenario Buttons
  document.querySelectorAll('.btn-scenario').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const scenario = e.currentTarget.dataset.scenario;
      triggerDemoScenario(scenario);
    });
  });

  // Alexa Voice Intent Buttons
  document.querySelectorAll('.btn-voice').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const intent = e.currentTarget.dataset.intent;
      executeAlexaIntent(intent);
    });
  });

  // Hero Card Quick Actions
  const btnHeroAction = document.getElementById('btn-hero-action');
  if (btnHeroAction) {
    btnHeroAction.addEventListener('click', () => {
      playAudioCue('safe');
      showToast("Smart Deadbolt Engaged: Backyard & Front doors locked.", "low");
      btnHeroAction.textContent = "✓ Doors Locked";
      btnHeroAction.disabled = true;
    });
  }

  const btnHeroSiren = document.getElementById('btn-hero-siren');
  if (btnHeroSiren) {
    btnHeroSiren.addEventListener('click', () => {
      playAudioCue('critical');
      showToast("Backyard Floodlight Siren Activated (110dB). Recording saved.", "critical");
    });
  }

  // Grandma Quick Actions
  const btnCallGrandma = document.getElementById('btn-call-grandma');
  if (btnCallGrandma) {
    btnCallGrandma.addEventListener('click', () => {
      showToast("Initiating two-way audio call to Grandma Meera's Echo Show...", "info");
    });
  }

  const btnCheckLivingRoom = document.getElementById('btn-check-livingroom');
  if (btnCheckLivingRoom) {
    btnCheckLivingRoom.addEventListener('click', () => {
      showToast("Switching to Grandma's Living Room live camera feed...", "info");
    });
  }

  // Emergency Action Panel Buttons
  const btnLockdown = document.getElementById('btn-lockdown');
  if (btnLockdown) {
    btnLockdown.addEventListener('click', () => {
      playAudioCue('critical');
      showToast("IMMEDIATE FULL LOCKDOWN: All doors locked, motion sensors armed to MAX.", "critical");
    });
  }

  const btnSirens = document.getElementById('btn-sirens');
  if (btnSirens) {
    btnSirens.addEventListener('click', () => {
      playAudioCue('critical');
      showToast("All Ring Floodlight Sirens Active (110dB).", "critical");
    });
  }

  const btnDispatchTest = document.getElementById('btn-dispatch-test');
  if (btnDispatchTest) {
    btnDispatchTest.addEventListener('click', () => {
      showToast("Escalation Chain Status: Primary (Priya Reddy) -> Secondary (Neighbor) -> 911 Dispatch. All online.", "info");
    });
  }

  // Night Mode Toggle
  const chkNightMode = document.getElementById('chk-night-mode');
  if (chkNightMode) {
    chkNightMode.addEventListener('change', (e) => {
      state.nightMode = e.target.checked;
      showToast(state.nightMode ? "Night Mode Active: Floodlights on auto-trigger." : "Night Mode Standby.", "info");
    });
  }
});
