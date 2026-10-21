/**
 * SafeGuard — AI-Powered Ring Security Intelligence Platform
 * True View Navigation Controller: Dashboard, Patterns, Family, Cameras, Alexa, Reports, Settings
 */

// Application State
const state = {
  activeTab: 'dashboard',
  currentLang: 'en',
  activeFilter: 'all',
  activeCamera: 'all',
  soundEnabled: true,
  hapticEnabled: true,
  nightMode: true,
  isAuthenticated: true,
  unreadNotifs: 3,
  currentUser: {
    name: 'Priya',
    fullName: 'Priya Reddy',
    email: 'priya.reddy@safeguard.internal',
    role: 'Household Admin • Ring Pro',
    avatar: '👩'
  },
  events: [
    {
      id: "evt_101",
      camera: "Backyard Floodlight",
      cameraId: "cam_backyard",
      time: "11:47 PM",
      level: "critical",
      badge: "HIGH",
      summary: "Unknown male, 3rd visit this week at 11:47 PM. No matching family profile."
    },
    {
      id: "evt_102",
      camera: "Front Doorbell Pro 2",
      cameraId: "doorbell_front",
      time: "3:15 PM",
      level: "low",
      badge: "LOW",
      summary: "Aarav (10) arrived home from school. Front door locked."
    },
    {
      id: "evt_103",
      camera: "Grandma's Living Room",
      cameraId: "cam_grandma_living",
      time: "1:30 PM",
      level: "medium",
      badge: "MEDIUM",
      summary: "Grandma Meera (75): Inactivity detected for 8+ hours. Wellness check initiated."
    },
    {
      id: "evt_104",
      camera: "Front Doorbell Pro 2",
      cameraId: "doorbell_front",
      time: "11:20 AM",
      level: "low",
      badge: "LOW",
      summary: "Package delivered safely. USPS carrier identified."
    },
    {
      id: "evt_105",
      camera: "Driveway Spotlight Cam",
      cameraId: "cam_driveway",
      time: "2:14 AM",
      level: "low",
      badge: "LOW",
      summary: "Delivery van turnaround detected in driveway. No perimeter breach."
    }
  ]
};

// 5-Language Localization Dictionary
const i18n = {
  en: {
    aiThreatHigh: "Unknown male, 3rd visit this week, 11:47 PM. No matching family profile. Cross-referenced with neighborhood correlation: Pattern suggests reconnaissance behavior.",
    aiActionDefault: "Lock exterior doors, activate floodlight, and alert emergency contacts.",
    alexaWhosAtDoor: "At your front door, SafeGuard Bedrock AI identified an unknown individual. This is his 3rd visit this week, all after 10 PM. Threat level is HIGH. I have turned on your front floodlight, saved a video clip, and sent a push alert to Priya's phone.",
    alexaFamilySafe: "Here is your family safety status: Aarav arrived safely home from school at 3:15 PM, and the front door deadbolt is locked. Priya is active. Notice: Grandma Meera has had no motion detected for 8 hours. SafeGuard has triggered a gentle wellness check alert.",
    alexaNightReport: "Last night between 11 PM and 6 AM, your Ring cameras detected 14 motion triggers. 13 were filtered out as harmless wind and a neighbor's cat. At 2:14 AM, the Driveway Spotlight detected a delivery van turning around. Low threat. 0 breaches.",
    alexaSecurityReport: "Here is your weekly SafeGuard report. Your Ring cameras captured 164 motion events. SafeGuard AI filtered out 156 harmless events with 95.1% noise reduction. Security score is 96 out of 100, saving you 12% on insurance.",
    alexaArm: "SafeGuard is now armed in Enhanced Perimeter Protection mode. All Ring floodlights and motion sensors are set to maximum AI sensitivity, smart locks are engaged, and zero-false-positive filtering is active."
  },
  hi: {
    aiThreatHigh: "अज्ञात व्यक्ति, इस सप्ताह 3री बार 11:47 बजे देखा गया। कोई पारिवारिक प्रोफ़ाइल नहीं मिली। रेकी व्यवहार का संकेत। अनुशंसित कार्रवाई: पिछला दरवाजा बंद करें, फ्लडलाइट चालू करें।",
    aiActionDefault: "बाहरी दरवाजे बंद करें, फ्लडलाइट चालू करें और संपर्कों को सूचित करें।",
    alexaWhosAtDoor: "मुख्य द्वार पर, सेफ़गार्ड एआई ने एक अज्ञात व्यक्ति की पहचान की है। यह इस सप्ताह उनकी तीसरी यात्रा है। खतरा स्तर उच्च है।",
    alexaFamilySafe: "आरव 3:15 बजे स्कूल से सुरक्षित घर पहुंच गया है। दादी मीरा के कमरे में 8 घंटे से कोई हलचल नहीं हुई है, वेलनेस अलर्ट भेजा गया है।",
    alexaNightReport: "कल रात 14 मोशन अलर्ट में से 13 को सुरक्षित रूप से फ़िल्टर किया गया। घर पूरी तरह सुरक्षित है।",
    alexaSecurityReport: "इस सप्ताह 164 घटनाओं में से 156 को फ़िल्टर किया गया। 95.1% शोर में कमी। सुरक्षा स्कोर 96/100 है।",
    alexaArm: "सेफ़गार्ड अब एन्हांस्ड पेरीमीटर प्रोटेक्शन मोड में सक्रिय है।"
  },
  te: {
    aiThreatHigh: "గుర్తుతెలియని వ్యక్తి, ఈ వారం 3వ సారి రాత్రి 11:47కి కనిపించారు. కుటుంబ సభ్యులు కాదు. అనుమానాస్పద కదలిక. సిఫార్సు: తలుపులు లాక్ చేయండి మరియు ఫ్లడ్‌లైట్ ఆన్ చేయండి.",
    aiActionDefault: "వెనుక తలుపు లాక్ చేయండి మరియు పోలీసు లేదా సహాయకులను సంప్రదించండి.",
    alexaWhosAtDoor: "ముందు గుమ్మం వద్ద గుర్తుతెలియని వ్యక్తి ఉన్నారు. ఈ వారం ఇది 3వ సారి. ముప్పు చాలా ఎక్కువ.",
    alexaFamilySafe: "ఆరవ్ సురక్షితంగా ఇంటికి చేరుకున్నాడు. బామ్మగారి వద్ద 8 గంటలుగా కదలిక లేదు, సమాచారం పంపబడింది.",
    alexaNightReport: "నిన్న రాత్రి ఎలాంటి ముప్పు లేదు. 14 ఈవెంట్లలో 13 సాధారణమైనవిగా ఫిల్టర్ చేయబడ్డాయి.",
    alexaSecurityReport: "ఈ వారం 95.1% అనవసర హెచ్చరికలు తొలగించబడ్డాయి. భద్రతా స్కోరు 96/100.",
    alexaArm: "సేఫ్‌గార్డ్ రక్షణ వ్యవస్థ విజయవంతంగా ఆన్ చేయబడింది."
  },
  es: {
    aiThreatHigh: "Persona desconocida, 3ª visita esta semana a las 11:47 PM. Sin perfil familiar coincidente. El patrón sugiere vigilancia. Acción recomendada: Bloquear puertas y activar reflectores.",
    aiActionDefault: "Bloquear puertas exteriores y notificar a los contactos de emergencia.",
    alexaWhosAtDoor: "En su puerta principal, SafeGuard AI identificó a un individuo desconocido. 3ª visita después de las 10 PM. Amenaza: ALTO.",
    alexaFamilySafe: "Aarav llegó sano y salvo a las 3:15 PM con la puerta cerrada. Abuela Meera sin movimiento en 8 horas; alerta enviada.",
    alexaNightReport: "Anoche se filtraron 13 eventos inofensivos de 14. No hubo brechas de seguridad.",
    alexaSecurityReport: "164 eventos reducidos a 8 alertas útiles (95.1% de reducción de ruido). Puntuación: 96/100.",
    alexaArm: "SafeGuard está armado en modo de protección perimetral mejorada."
  },
  de: {
    aiThreatHigh: "Unbekannte Person, 3. Besuch diese Woche um 23:47 Uhr. Kein Familienprofil. Verdächtiges Verhalten. Empfohlene Maßnahme: Außentüren verriegeln und Flutlicht einschalten.",
    aiActionDefault: "Außentüren verriegeln und Notfallkontakte benachrichtigen.",
    alexaWhosAtDoor: "Vor Ihrer Haustür hat SafeGuard AI eine unbekannte Person erkannt. 3. Besuch diese Woche. Bedrohung: HOCH.",
    alexaFamilySafe: "Aarav ist um 15:15 Uhr sicher angekommen. Bei Oma Meera gab es seit 8 Stunden keine Bewegung; Wohlfühl-Check aktiv.",
    alexaNightReport: "Letzte Nacht wurden 14 Ereignisse erfasst und 13 als harmlos eingestuft. Keine Bedrohungen.",
    alexaSecurityReport: "164 Ereignisse wurden gefiltert, 95.1% Rauschunterdrückung. Sicherheitsbewertung 96 von 100.",
    alexaArm: "SafeGuard ist im erweiterten Perimeterschutzmodus scharfgeschaltet."
  }
};

// Web Audio API Synthesizer
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
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(440, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'medium') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else {
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
  const el = document.getElementById('screen-reader-announcer');
  if (el) el.textContent = message;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <strong style="font-size:12px;text-transform:uppercase;color:${type === 'critical' ? 'var(--threat-critical)' : (type === 'medium' ? 'var(--threat-medium)' : 'var(--accent)')}">
        ${type === 'critical' ? '🚨 Critical Alert' : (type === 'medium' ? '⚠️ Advisory' : '🛡️ SafeGuard')}
      </strong>
      <button style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:14px;" onclick="this.parentElement.parentElement.remove()">&times;</button>
    </div>
    <div style="font-size:13px;margin-top:4px;color:var(--text-primary);line-height:1.4;">${message}</div>
  `;
  container.appendChild(toast);
  announceToScreenReader(message);

  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 4500);
}

// =========================================================================
// VIEW / TAB SEPARATION LOGIC
// =========================================================================
function switchTab(tabName) {
  state.activeTab = tabName;

  // 1. Update Desktop Sidebar
  document.querySelectorAll('.sidebar .nav-item').forEach(item => {
    if (item.dataset.tab === tabName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // 2. Update Mobile Bottom Nav
  document.querySelectorAll('.bottom-nav .nav-tab').forEach(tab => {
    if (tab.dataset.tab === tabName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // 3. Switch View Pane Visibility
  document.querySelectorAll('.view-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  const activePane = document.getElementById(`view-${tabName}`);
  if (activePane) {
    activePane.classList.add('active');
  }

  // 4. Reset scroll on main container
  const main = document.getElementById('main-content');
  if (main) {
    main.scrollTop = 0;
  }

  // 5. Trigger secondary renders if needed
  if (tabName === 'patterns') {
    renderPatternChart();
  }

  showToast(`Switched to ${tabName.toUpperCase()} space`, 'info');
}
window.switchTab = switchTab; // Ensure globally accessible

// Render Live Event Feed in Dashboard
function renderEvents() {
  const feed = document.getElementById('live-event-feed');
  if (!feed) return;

  const filtered = state.events.filter(item => {
    const matchFilter = state.activeFilter === 'all' || item.level === state.activeFilter;
    const matchCamera = state.activeCamera === 'all' || item.cameraId === state.activeCamera;
    return matchFilter && matchCamera;
  });

  feed.innerHTML = '';
  if (filtered.length === 0) {
    feed.innerHTML = `
      <div style="padding:24px;text-align:center;color:var(--text-muted);font-size:var(--fs-sm);">
        No events match current filter.
      </div>
    `;
    return;
  }

  filtered.forEach(evt => {
    const item = document.createElement('div');
    item.className = `event-item ${evt.level}`;
    item.innerHTML = `
      <span class="time">${evt.time}</span>
      <div class="content">
        <span class="camera-tag">${evt.camera}</span>
        <div class="summary">"${evt.summary}"</div>
      </div>
      <span class="threat-badge ${evt.level}">${evt.badge}</span>
    `;
    feed.appendChild(item);
  });
}

// Render Pattern Histogram in Patterns Space
function renderPatternChart() {
  const container = document.getElementById('pattern-bars-large');
  if (!container) return;

  container.innerHTML = '';
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat (Peak)', 'Sun'];
  const values = [18, 22, 14, 26, 32, 58, 16]; // Saturday night intruder spike

  values.forEach((val, idx) => {
    const col = document.createElement('div');
    col.className = 'h-col';

    const bar = document.createElement('div');
    bar.className = 'h-bar';
    if (idx === 5) bar.classList.add('anomaly'); // Saturday anomaly
    const pct = Math.min(100, Math.max(12, (val / 58) * 100));
    bar.style.height = `${pct}%`;

    const label = document.createElement('span');
    label.className = 'h-day';
    label.textContent = days[idx];

    col.appendChild(bar);
    col.appendChild(label);
    container.appendChild(col);
  });
}

// Alexa Intent Execution
function executeAlexaIntent(intentKey) {
  const t = i18n[state.currentLang] || i18n.en;
  let speech = "";
  let cardTitle = "";
  let cardText = "";

  if (intentKey === 'whos_at_door') {
    speech = t.alexaWhosAtDoor;
    cardTitle = "Visitor Alert: Unknown Male (Threat: HIGH)";
    cardText = "Bedrock Claude 3 Haiku: 3rd visit this week at 11:47 PM. Rekognition: 0% match to family profiles.\nAction: Floodlight turned on, video clip saved, phone push alert dispatched.";
    playAudioCue('critical');
    triggerHaptic(300);
  } else if (intentKey === 'is_family_safe') {
    speech = t.alexaFamilySafe;
    cardTitle = "Family Safety Status";
    cardText = "• Aarav (10): Safe at Home (Deadbolt Locked)\n• Priya (38): Working Remotely\n• Grandma Meera (75): Wellness Check Alert (8h no motion in living room)";
    playAudioCue('medium');
    triggerHaptic(150);
  } else if (intentKey === 'what_happened_last_night') {
    speech = t.alexaNightReport;
    cardTitle = "Overnight Activity Summary";
    cardText = "14 Ring events detected. 13 safely suppressed as harmless wind & cat.\n2:14 AM: Delivery Van turnaround (Low Threat). 0 perimeter breaches.";
    playAudioCue('safe');
  } else if (intentKey === 'security_report') {
    speech = t.alexaSecurityReport;
    cardTitle = "Weekly Security Intelligence Report";
    cardText = "164 Raw Events -> 8 Meaningful Alerts (95.1% Noise Reduction)\nSecurity Score: 96/100 (12% Insurance Discount Eligible)";
    playAudioCue('safe');
  } else if (intentKey === 'arm_safeguard') {
    speech = t.alexaArm;
    cardTitle = "SafeGuard Armed";
    cardText = "Mode: Enhanced Perimeter Protection\nSmart Deadbolts: Locked\nCameras: Maximum AI Sensitivity";
    playAudioCue('safe');
  }

  // Update Echo Show in Alexa View
  const titleEl = document.getElementById('echo-card-title-lg');
  const bodyEl = document.getElementById('echo-card-body-lg');
  const textEl = document.getElementById('alexa-speech-full');
  const waveEl = document.getElementById('echo-wave-lg');

  if (titleEl) titleEl.textContent = cardTitle;
  if (bodyEl) bodyEl.textContent = cardText;
  if (textEl) textEl.textContent = `"${speech}"`;

  // Wave bounce
  if (waveEl) {
    waveEl.classList.add('active');
    setTimeout(() => waveEl.classList.remove('active'), 3500);
  }

  // Native Web Speech
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(speech);
    const langMap = { en: 'en-US', hi: 'hi-IN', te: 'te-IN', es: 'es-ES', de: 'de-DE' };
    utt.lang = langMap[state.currentLang] || 'en-US';
    utt.rate = 1.0;
    window.speechSynthesis.speak(utt);
  }

  announceToScreenReader(`Alexa: ${speech}`);
}

// Live Demo Scenarios
function triggerDemoScenario(scenario) {
  const t = i18n[state.currentLang] || i18n.en;

  if (scenario === 'aarav_arrival') {
    playAudioCue('safe');
    triggerHaptic(100);
    showToast("Aarav (10) arrived home from school at 3:15 PM. Front door auto-locked.", "low");

    state.events.unshift({
      id: `evt_${Date.now()}`,
      camera: "Front Doorbell Pro 2",
      cameraId: "doorbell_front",
      time: "Just now",
      level: "low",
      badge: "LOW",
      summary: "Aarav (10) arrived home from school at 3:15 PM. Front door locked."
    });

    renderEvents();

  } else if (scenario === 'night_visitor') {
    playAudioCue('critical');
    triggerHaptic(400);

    const banner = document.getElementById('active-threat-banner');
    if (banner) {
      banner.className = 'threat-banner critical';
      banner.style.display = 'flex';
      document.getElementById('banner-title-text').textContent = "CRITICAL THREAT: Unknown Intruder Loitering (11:47 PM)";
      document.getElementById('banner-sub-text').textContent = "3rd visit this week. Rekognition: 0% match. Bedrock: Reconnaissance activity flagged.";
    }

    // Update AI Panel
    const badge = document.getElementById('ai-assessment-badge');
    if (badge) {
      badge.className = "threat-badge critical";
      badge.textContent = "CRITICAL";
    }
    const aiText = document.getElementById('ai-assessment-text');
    if (aiText) aiText.textContent = `"${t.aiThreatHigh}"`;
    const confVal = document.getElementById('ai-confidence-val');
    if (confVal) confVal.textContent = "96.4%";
    const confFill = document.getElementById('ai-confidence-fill');
    if (confFill) confFill.style.width = "96.4%";

    state.events.unshift({
      id: `evt_${Date.now()}`,
      camera: "Backyard Floodlight",
      cameraId: "cam_backyard",
      time: "11:47 PM",
      level: "critical",
      badge: "HIGH",
      summary: "Unknown male, 3rd visit this week at 11:47 PM. No matching family profile."
    });

    showToast("CRITICAL THREAT: Unknown male detected at backyard perimeter.", "critical");
    renderEvents();

  } else if (scenario === 'grandma_wellness') {
    playAudioCue('medium');
    triggerHaptic(200);
    showToast("Grandma Meera (75): Inactivity detected for 8.2 hours. Automated wellness check prompted.", "medium");

  } else if (scenario === 'delivery') {
    playAudioCue('safe');
    showToast("Package delivery verified from FedEx. Staged at front entrance.", "low");

    state.events.unshift({
      id: `evt_${Date.now()}`,
      camera: "Front Doorbell Pro 2",
      cameraId: "doorbell_front",
      time: "Just now",
      level: "low",
      badge: "LOW",
      summary: "Package delivered safely. FedEx courier verified with 98.7% confidence."
    });
    renderEvents();

  } else if (scenario === 'forced_entry') {
    playAudioCue('critical');
    triggerHaptic(600);

    const banner = document.getElementById('active-threat-banner');
    if (banner) {
      banner.className = 'threat-banner critical';
      banner.style.display = 'flex';
      document.getElementById('banner-title-text').textContent = "🚨 EMERGENCY: FORCED ENTRY TAMPER ATTEMPT";
      document.getElementById('banner-sub-text').textContent = "Front Doorbell tampering sensor triggered. Sounding 110dB Siren.";
    }

    state.events.unshift({
      id: `evt_${Date.now()}`,
      camera: "Front Doorbell Pro 2",
      cameraId: "doorbell_front",
      time: "Immediate",
      level: "critical",
      badge: "EMERGENCY",
      summary: "FORCED ENTRY TAMPER ATTEMPT: Crowbar tool identified by Rekognition. Alarm sounding."
    });

    showToast("EMERGENCY FORCED ENTRY: Ring siren activated, emergency contacts dispatched.", "critical");
    renderEvents();
  }
}

// Emergency SOS Trigger
function triggerEmergencySOS() {
  playAudioCue('critical');
  triggerHaptic(800);

  const confirmSOS = confirm("🚨 EMERGENCY SOS BROADCAST:\n\nSound all Ring 110dB sirens, lock all exterior smart deadbolts, alert Priya Reddy, and dispatch 911 emergency escalation chain?\n\nClick OK to confirm.");
  if (confirmSOS) {
    showToast("EMERGENCY SOS ACTIVATED: Sirens active. 911 dispatch escalation initiated.", "critical");
    announceToScreenReader("Emergency SOS activated. Ring sirens sounding.");
  }
}

// DOM Setup
document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
  renderPatternChart();

  // Desktop Sidebar Nav clicks
  document.querySelectorAll('.sidebar .nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const tab = e.currentTarget.dataset.tab;
      if (tab) switchTab(tab);
    });
  });

  // Mobile Bottom Nav clicks
  document.querySelectorAll('.bottom-nav .nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.dataset.tab;
      if (targetTab) switchTab(targetTab);
    });
  });

  // Camera Selector
  const cameraSelect = document.getElementById('camera-select');
  if (cameraSelect) {
    cameraSelect.addEventListener('change', (e) => {
      state.activeCamera = e.target.value;
      renderEvents();
      showToast(`Filter: ${e.target.options[e.target.selectedIndex].text}`, 'info');
    });
  }

  // Filter Pills (Live Feed)
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      state.activeFilter = e.target.dataset.filter;
      renderEvents();
    });
  });

  // Scenario Buttons
  document.querySelectorAll('.btn-pill[data-scenario]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const scenario = e.currentTarget.dataset.scenario;
      triggerDemoScenario(scenario);
    });
  });

  // Banner Actions
  const btnBannerDismiss = document.getElementById('btn-banner-dismiss');
  if (btnBannerDismiss) {
    btnBannerDismiss.addEventListener('click', () => {
      const banner = document.getElementById('active-threat-banner');
      if (banner) banner.style.display = 'none';
    });
  }

  const btnBannerDetails = document.getElementById('btn-banner-details');
  if (btnBannerDetails) {
    btnBannerDetails.addEventListener('click', () => {
      switchTab('dashboard');
      const panel = document.querySelector('section[aria-label="AI Threat Assessment"]');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        panel.style.boxShadow = '0 0 25px var(--accent-glow)';
        setTimeout(() => panel.style.boxShadow = '', 2000);
      }
    });
  }

  // Alexa Voice Intent Buttons
  document.querySelectorAll('.btn-voice-intent, .intent-card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const intent = e.currentTarget.dataset.intent;
      executeAlexaIntent(intent);
    });
  });

  // SOS Buttons (Desktop Family space, Mobile SOS bar)
  const btnFamilySOS = document.getElementById('btn-family-sos');
  if (btnFamilySOS) btnFamilySOS.addEventListener('click', triggerEmergencySOS);

  const btnMobileSOS = document.getElementById('btn-mobile-sos');
  if (btnMobileSOS) btnMobileSOS.addEventListener('click', triggerEmergencySOS);

  // Quick Action Buttons
  const btnQuickLock = document.getElementById('btn-quick-lock');
  if (btnQuickLock) {
    btnQuickLock.addEventListener('click', () => {
      playAudioCue('safe');
      btnQuickLock.textContent = "✓ Doors Locked";
      btnQuickLock.style.background = "var(--threat-low)";
      showToast("Smart Deadbolt Engaged: All exterior doors secured.", "low");
    });
  }

  const btnDashLock = document.getElementById('btn-dash-quick-lock');
  if (btnDashLock) {
    btnDashLock.addEventListener('click', () => {
      playAudioCue('safe');
      btnDashLock.textContent = "✓ Locked";
      showToast("Smart Deadbolt Engaged: Back door locked.", "low");
    });
  }

  const btnQuickSiren = document.getElementById('btn-quick-siren');
  if (btnQuickSiren) {
    btnQuickSiren.addEventListener('click', () => {
      playAudioCue('critical');
      showToast("Floodlight Siren Activated (110dB). Clip saved to cloud.", "critical");
    });
  }

  // Multi-Language Dropdown
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      state.currentLang = e.target.value;
      const t = i18n[state.currentLang] || i18n.en;
      const aiText = document.getElementById('ai-assessment-text');
      if (aiText) aiText.textContent = `"${t.aiThreatHigh}"`;
      showToast(`Language set to ${e.target.value.toUpperCase()}`, 'info');
    });
  }

  // Settings Toggles
  const setContrast = document.getElementById('set-chk-contrast');
  if (setContrast) {
    setContrast.addEventListener('change', (e) => {
      document.body.classList.toggle('high-contrast', e.target.checked);
    });
  }

  const setLargeText = document.getElementById('set-chk-large-text');
  if (setLargeText) {
    setLargeText.addEventListener('change', (e) => {
      document.body.classList.toggle('large-text', e.target.checked);
    });
  }

  const setAudio = document.getElementById('set-chk-audio');
  if (setAudio) {
    setAudio.addEventListener('change', (e) => {
      state.soundEnabled = e.target.checked;
    });
  }

  const setHaptic = document.getElementById('set-chk-haptic');
  if (setHaptic) {
    setHaptic.addEventListener('change', (e) => {
      state.hapticEnabled = e.target.checked;
    });
  }

  // Night Vision Toggle
  const camNightToggle = document.getElementById('cam-night-toggle');
  if (camNightToggle) {
    camNightToggle.addEventListener('change', (e) => {
      state.nightMode = e.target.checked;
      showToast(state.nightMode ? "Night Vision Active on all cameras." : "Daylight Mode.", "info");
    });
  }

  // Live Clocks
  function updateClocks() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const clockAlexa = document.getElementById('echo-clock-alexa');
    if (clockAlexa) clockAlexa.textContent = timeStr;
  }
  setInterval(updateClocks, 30000);
  updateClocks();

  // =========================================================================
  // NOTIFICATIONS & ACCOUNT DROPDOWNS & AUTHENTICATION
  // =========================================================================

  const btnNotif = document.getElementById('btn-notif');
  const notifDropdown = document.getElementById('notifications-dropdown');
  const notifBadge = document.getElementById('notif-badge');
  const notifPillBadge = document.getElementById('notif-pill-badge');
  const btnMarkAllRead = document.getElementById('btn-mark-all-read');
  const notifList = document.getElementById('notif-list');
  const btnNotifViewReports = document.getElementById('btn-notif-view-reports');

  const btnUserProfile = document.getElementById('btn-user-profile');
  const accountDropdown = document.getElementById('account-dropdown');
  const btnLogout = document.getElementById('btn-logout');

  const authModal = document.getElementById('auth-modal');
  const btnAuthClose = document.getElementById('btn-auth-close');
  const tabBtnLogin = document.getElementById('tab-btn-login');
  const tabBtnSignup = document.getElementById('tab-btn-signup');
  const paneLogin = document.getElementById('pane-login');
  const paneSignup = document.getElementById('pane-signup');
  const btnDemoLogin = document.getElementById('btn-demo-login');
  const formLogin = document.getElementById('form-login');
  const formSignup = document.getElementById('form-signup');

  // Close all open dropdowns
  function closeAllDropdowns() {
    if (notifDropdown) notifDropdown.hidden = true;
    if (accountDropdown) accountDropdown.hidden = true;
    if (btnNotif) btnNotif.setAttribute('aria-expanded', 'false');
    if (btnUserProfile) btnUserProfile.setAttribute('aria-expanded', 'false');
  }

  // Toggle Notifications Dropdown
  if (btnNotif && notifDropdown) {
    btnNotif.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = notifDropdown.hidden;
      closeAllDropdowns();
      if (willOpen) {
        notifDropdown.hidden = false;
        btnNotif.setAttribute('aria-expanded', 'true');
        playAudioCue('click');
      }
    });
  }

  // Mark all notifications as read
  if (btnMarkAllRead) {
    btnMarkAllRead.addEventListener('click', (e) => {
      e.stopPropagation();
      state.unreadNotifs = 0;
      if (notifBadge) notifBadge.style.display = 'none';
      if (notifPillBadge) notifPillBadge.textContent = '0 New';
      if (notifList) {
        notifList.querySelectorAll('.notif-item').forEach(item => {
          item.classList.remove('unread');
          item.classList.add('read');
        });
      }
      playAudioCue('safe');
      showToast('All security alerts marked as read.', 'low');
    });
  }

  // Notification item click navigation
  if (notifList) {
    notifList.addEventListener('click', (e) => {
      const item = e.target.closest('.notif-item');
      if (!item) return;
      item.classList.remove('unread');
      item.classList.add('read');
      const targetView = item.dataset.view || 'dashboard';
      closeAllDropdowns();
      switchTab(targetView);
      showToast(`Navigated to ${targetView.toUpperCase()} from alert.`, 'info');
    });
  }

  if (btnNotifViewReports) {
    btnNotifViewReports.addEventListener('click', () => {
      closeAllDropdowns();
      switchTab('reports');
    });
  }

  // Update User Profile UI
  function updateUserUI() {
    const topbarAvatar = document.getElementById('topbar-user-avatar');
    const topbarName = document.getElementById('topbar-user-name');
    const dropdownAvatar = document.getElementById('dropdown-avatar');
    const dropdownName = document.getElementById('dropdown-name');
    const dropdownEmail = document.getElementById('dropdown-email');

    if (state.isAuthenticated) {
      if (topbarAvatar) topbarAvatar.textContent = state.currentUser.avatar;
      if (topbarName) topbarName.textContent = state.currentUser.name;
      if (dropdownAvatar) dropdownAvatar.innerHTML = `${state.currentUser.avatar}<span class="online-dot"></span>`;
      if (dropdownName) dropdownName.textContent = state.currentUser.fullName || state.currentUser.name;
      if (dropdownEmail) dropdownEmail.textContent = state.currentUser.email;
      if (btnUserProfile) btnUserProfile.title = `Active Account: ${state.currentUser.fullName || state.currentUser.name}`;
    } else {
      if (topbarAvatar) topbarAvatar.textContent = '🔑';
      if (topbarName) topbarName.textContent = 'Sign In';
      if (btnUserProfile) btnUserProfile.title = 'Logged out. Click to Sign In.';
    }
  }

  // Toggle Account Dropdown or Open Auth Modal if logged out
  if (btnUserProfile) {
    btnUserProfile.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!state.isAuthenticated) {
        openAuthModal('login');
        return;
      }
      const willOpen = accountDropdown.hidden;
      closeAllDropdowns();
      if (willOpen) {
        accountDropdown.hidden = false;
        btnUserProfile.setAttribute('aria-expanded', 'true');
        playAudioCue('click');
      }
    });
  }

  // Account Menu items tab switcher
  if (accountDropdown) {
    accountDropdown.querySelectorAll('.acc-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetTab = item.dataset.tab;
        if (targetTab) {
          closeAllDropdowns();
          switchTab(targetTab);
        }
      });
    });
  }

  // Log Out Handler
  if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
      e.stopPropagation();
      state.isAuthenticated = false;
      closeAllDropdowns();
      updateUserUI();
      playAudioCue('critical');
      showToast('Logged out of SafeGuard session.', 'info');
      openAuthModal('login');
    });
  }

  // Auth Modal Helpers
  function openAuthModal(initialTab = 'login') {
    closeAllDropdowns();
    if (authModal) {
      authModal.hidden = false;
      switchAuthTab(initialTab);
    }
  }

  function closeAuthModal() {
    if (authModal) authModal.hidden = true;
  }

  function switchAuthTab(tabName) {
    if (tabName === 'login') {
      tabBtnLogin.classList.add('active');
      tabBtnSignup.classList.remove('active');
      paneLogin.hidden = false;
      paneSignup.hidden = true;
    } else {
      tabBtnSignup.classList.add('active');
      tabBtnLogin.classList.remove('active');
      paneSignup.hidden = false;
      paneLogin.hidden = true;
    }
  }

  if (tabBtnLogin) tabBtnLogin.addEventListener('click', () => switchAuthTab('login'));
  if (tabBtnSignup) tabBtnSignup.addEventListener('click', () => switchAuthTab('signup'));
  if (btnAuthClose) btnAuthClose.addEventListener('click', closeAuthModal);

  // Close modal when clicking backdrop outside card
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        closeAuthModal();
      }
    });
  }

  // One-Click Hackathon Demo Login
  if (btnDemoLogin) {
    btnDemoLogin.addEventListener('click', () => {
      state.isAuthenticated = true;
      state.currentUser = {
        name: 'Priya',
        fullName: 'Priya Reddy',
        email: 'priya.reddy@safeguard.internal',
        role: 'Household Admin • Ring Pro',
        avatar: '👩'
      };
      updateUserUI();
      closeAuthModal();
      playAudioCue('safe');
      showToast('Welcome back, Priya! SafeGuard AI is protecting 4 cameras.', 'low');
    });
  }

  // Login Form Submission
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('input-login-email');
      const email = emailInput ? emailInput.value.trim() : 'priya.reddy@safeguard.internal';
      
      let displayName = 'Priya';
      if (email.includes('@')) {
        const rawName = email.split('@')[0].replace('.', ' ');
        displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      }

      state.isAuthenticated = true;
      state.currentUser = {
        name: displayName.split(' ')[0],
        fullName: displayName,
        email: email,
        role: 'Household Admin • Ring Pro',
        avatar: '👩'
      };

      updateUserUI();
      closeAuthModal();
      playAudioCue('safe');
      showToast(`Signed in successfully! Bedrock AI active for ${state.currentUser.name}.`, 'low');
    });
  }

  // Sign Up Form Submission
  if (formSignup) {
    formSignup.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('input-signup-name');
      const emailInput = document.getElementById('input-signup-email');
      const ringInput = document.getElementById('input-signup-ring');
      const roleSelect = document.getElementById('input-signup-role');
      const passInput = document.getElementById('input-signup-pass');
      const confirmInput = document.getElementById('input-signup-confirm');

      if (passInput && confirmInput && passInput.value !== confirmInput.value) {
        showToast('Passwords do not match. Please re-enter.', 'critical');
        playAudioCue('critical');
        return;
      }

      const fullName = nameInput ? nameInput.value.trim() : 'Madhava Reddy';
      const shortName = fullName.split(' ')[0];
      const email = emailInput ? emailInput.value.trim() : 'madhav@safeguard.io';
      const role = roleSelect ? roleSelect.value : 'Admin';

      state.isAuthenticated = true;
      state.currentUser = {
        name: shortName,
        fullName: fullName,
        email: email,
        role: `${role} • Ring Pro`,
        avatar: '👤'
      };

      updateUserUI();
      closeAuthModal();
      playAudioCue('safe');
      showToast(`Account created & Ring linked! Welcome to SafeGuard, ${shortName}!`, 'low');
    });
  }

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.notif-wrapper') && !e.target.closest('.profile-wrapper')) {
      closeAllDropdowns();
    }
  });

  // ESC key closes dropdowns or modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
      if (authModal && !authModal.hidden) closeAuthModal();
    }
  });

  // Initial user UI sync
  updateUserUI();
});
