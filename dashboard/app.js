/**
 * SafeGuard — AI-Powered Ring Security Intelligence Platform
 * Complete Dashboard Controller: Desktop Sidebar + Mobile Bottom Nav + Live Simulator
 */

// Application State
const state = {
  currentLang: 'en',
  activeFilter: 'all',
  activeCamera: 'all',
  soundEnabled: true,
  hapticEnabled: true,
  nightMode: true,
  activeThreat: {
    level: 'medium',
    title: 'MEDIUM THREAT ACTIVE — Front Door (11:47 PM)',
    desc: 'Unknown individual, 3rd visit this week. Rekognition: 0% match to family profiles.'
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

// 5-Language Dictionary
const i18n = {
  en: {
    aiThreatHigh: "Unknown male, 3rd visit this week, 11:47 PM. No matching family profile. Pattern suggests reconnaissance behavior. Recommended action: Lock back door, enable floodlight, notify emergency contact.",
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

// Web Audio API Synthesized Chimes
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

// Render Live Event Feed
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

// Render 7-Day Pattern Histogram
function renderPatternChart() {
  const container = document.getElementById('pattern-bars-container');
  if (!container) return;

  container.innerHTML = '';
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = [18, 22, 14, 26, 32, 45, 12]; // Sat had late night anomaly

  values.forEach((val, idx) => {
    const col = document.createElement('div');
    col.className = 'mini-bar-col';

    const bar = document.createElement('div');
    bar.className = 'mini-bar';
    if (idx === 5) bar.classList.add('anomaly'); // Saturday anomaly
    const pct = Math.min(100, Math.max(15, (val / 45) * 100));
    bar.style.height = `${pct}%`;

    const label = document.createElement('span');
    label.className = 'mini-bar-day';
    label.textContent = days[idx];

    col.appendChild(bar);
    col.appendChild(label);
    container.appendChild(col);
  });
}

// Alexa Voice Intent Execution
function executeAlexaIntent(intentKey) {
  const t = i18n[state.currentLang] || i18n.en;
  let speech = "";
  let cardTitle = "";
  let cardText = "";

  if (intentKey === 'whos_at_door') {
    speech = t.alexaWhosAtDoor;
    cardTitle = "Visitor Alert: Unknown Male (Threat: HIGH)";
    cardText = "Bedrock Claude 3 Haiku: 3rd visit this week at 11:47 PM. Rekognition: 0% match to family profiles.\nAction: Floodlight turned on, video clip saved.";
    playAudioCue('critical');
    triggerHaptic(300);
  } else if (intentKey === 'is_family_safe') {
    speech = t.alexaFamilySafe;
    cardTitle = "Family Safety Status";
    cardText = "• Aarav (10): Safe at Home (Deadbolt Locked)\n• Priya (38): Working Remotely\n• Grandma Meera (75): Wellness Check Alert (8h no motion)";
    playAudioCue('medium');
    triggerHaptic(150);
  } else if (intentKey === 'what_happened_last_night') {
    speech = t.alexaNightReport;
    cardTitle = "Overnight Activity Summary";
    cardText = "14 Ring events detected. 13 safely filtered as harmless wind & cat.\n2:14 AM: Delivery Van turnaround (Low Threat). 0 breaches.";
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

  // Update Echo Show preview frame
  const titleEl = document.getElementById('echo-card-title');
  const bodyEl = document.getElementById('echo-card-body');
  const textEl = document.getElementById('alexa-speech-text');
  const waveEl = document.getElementById('echo-wave');

  if (titleEl) titleEl.textContent = cardTitle;
  if (bodyEl) bodyEl.textContent = cardText;
  if (textEl) textEl.textContent = `"${speech}"`;

  // Animate soundwave
  if (waveEl) {
    waveEl.classList.add('active');
    setTimeout(() => waveEl.classList.remove('active'), 3500);
  }

  // Native Speech Synthesis
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

// Live Demo Scenario Simulator
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

    const cardAarav = document.getElementById('fam-card-aarav');
    if (cardAarav) {
      cardAarav.querySelector('.status').textContent = "✅ Home · 3:15 PM (Locked)";
    }
    renderEvents();

  } else if (scenario === 'night_visitor') {
    playAudioCue('critical');
    triggerHaptic(400);

    // Update banner
    const banner = document.getElementById('active-threat-banner');
    if (banner) {
      banner.className = 'threat-banner critical';
      banner.style.display = 'flex';
      document.getElementById('banner-title-text').textContent = "CRITICAL THREAT: Unknown Intruder Loitering (11:47 PM)";
      document.getElementById('banner-sub-text').textContent = "3rd visit this week. Rekognition: 0% match. Bedrock: Reconnaissance activity flagged.";
    }

    // Update AI Panel
    document.getElementById('ai-assessment-badge').className = "threat-badge critical";
    document.getElementById('ai-assessment-badge').textContent = "CRITICAL";
    document.getElementById('ai-assessment-text').textContent = `"${t.aiThreatHigh}"`;
    document.getElementById('ai-confidence-val').textContent = "96.4%";
    document.getElementById('ai-confidence-fill').style.width = "96.4%";

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

    const meeraText = document.getElementById('meera-status-text');
    if (meeraText) {
      meeraText.textContent = "⚠️ Wellness Alert (8.2h idle)";
    }
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

// Emergency SOS Action
function triggerEmergencySOS() {
  playAudioCue('critical');
  triggerHaptic(800);

  const confirmSOS = confirm("🚨 EMERGENCY SOS BROADCAST:\n\nSound all Ring 110dB sirens, lock all exterior smart deadbolts, alert Priya Reddy, and dispatch 911 emergency escalation chain?\n\nClick OK to confirm.");
  if (confirmSOS) {
    showToast("EMERGENCY SOS ACTIVATED: Sirens active. 911 dispatch escalation initiated.", "critical");
    announceToScreenReader("Emergency SOS activated. Ring sirens sounding.");
  }
}

// Synchronized Tab Switching for Sidebar & Mobile Bottom Nav
function switchTab(tabName) {
  // Update desktop sidebar
  document.querySelectorAll('.sidebar .nav-item').forEach(item => {
    if (item.dataset.tab === tabName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update mobile bottom nav
  document.querySelectorAll('.bottom-nav .nav-tab').forEach(tab => {
    if (tab.dataset.tab === tabName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Scroll or focus corresponding section
  const main = document.getElementById('main-content');
  if (tabName === 'dashboard') {
    main.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (tabName === 'patterns') {
    const el = document.querySelector('section[aria-label="Behavioral Pattern Analysis"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabName === 'family') {
    const el = document.querySelector('section[aria-label="Family Safety Intelligence"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabName === 'cameras') {
    const el = document.querySelector('section[aria-label="Multi-Camera Unified View"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabName === 'alexa') {
    const el = document.querySelector('section[aria-label="Alexa Voice Integration"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabName === 'settings') {
    const drawer = document.getElementById('a11y-drawer');
    if (drawer) drawer.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showToast(`Switched view to ${tabName.toUpperCase()}`, 'info');
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
  renderPatternChart();

  // Navigation tab clicks (Desktop Sidebar)
  document.querySelectorAll('.sidebar .nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const tab = e.currentTarget.dataset.tab;
      if (tab) switchTab(tab);
    });
  });

  // Navigation tab clicks (Mobile Bottom Nav)
  document.querySelectorAll('.bottom-nav .nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.dataset.tab;
      if (targetTab) switchTab(targetTab);
    });
  });

  // Camera Selector Dropdown
  const cameraSelect = document.getElementById('camera-select');
  if (cameraSelect) {
    cameraSelect.addEventListener('change', (e) => {
      state.activeCamera = e.target.value;
      renderEvents();
      showToast(`Filter: ${e.target.options[e.target.selectedIndex].text}`, 'info');
    });
  }

  // Filter Pills (All / Critical / Medium / Low)
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      state.activeFilter = e.target.dataset.filter;
      renderEvents();
    });
  });

  // Live Scenario Simulator Buttons
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
      const panel = document.querySelector('section[aria-label="AI Threat Assessment"]');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        panel.style.boxShadow = '0 0 25px var(--accent-glow)';
        setTimeout(() => panel.style.boxShadow = '', 2000);
      }
    });
  }

  // Alexa Voice Intent Buttons
  document.querySelectorAll('.btn-voice-intent').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const intent = e.currentTarget.dataset.intent;
      executeAlexaIntent(intent);
    });
  });

  // Emergency SOS Buttons (Desktop & Mobile)
  const btnMainSOS = document.getElementById('btn-main-sos');
  if (btnMainSOS) btnMainSOS.addEventListener('click', triggerEmergencySOS);

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

  const btnQuickSiren = document.getElementById('btn-quick-siren');
  if (btnQuickSiren) {
    btnQuickSiren.addEventListener('click', () => {
      playAudioCue('critical');
      showToast("Floodlight Siren Activated (110dB). Clip saved to cloud.", "critical");
    });
  }

  const btnRecLock = document.getElementById('btn-rec-lock');
  if (btnRecLock) {
    btnRecLock.addEventListener('click', () => {
      playAudioCue('safe');
      btnRecLock.textContent = "✓ Locked";
      showToast("Proactive Recommendation Accepted: Back door locked.", "low");
    });
  }

  const btnRecGuard = document.getElementById('btn-rec-guard');
  if (btnRecGuard) {
    btnRecGuard.addEventListener('click', () => {
      btnRecGuard.textContent = "✓ Guard Enabled";
      showToast("SafeGuard Holiday Package Guard Activated.", "low");
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

  // Accessibility Controls
  const btnA11y = document.getElementById('btn-a11y-toggle');
  const a11yDrawer = document.getElementById('a11y-drawer');
  const btnCloseA11y = document.getElementById('btn-close-a11y');

  if (btnA11y && a11yDrawer) {
    btnA11y.addEventListener('click', () => {
      a11yDrawer.classList.toggle('hidden');
    });
  }
  if (btnCloseA11y && a11yDrawer) {
    btnCloseA11y.addEventListener('click', () => {
      a11yDrawer.classList.add('hidden');
    });
  }

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
      setTimeout(() => playAudioCue('medium'), 350);
      setTimeout(() => playAudioCue('safe'), 700);
    });
  }

  // Night Mode Toggle
  const chkNight = document.getElementById('chk-night-mode-toggle');
  if (chkNight) {
    chkNight.addEventListener('change', (e) => {
      state.nightMode = e.target.checked;
      showToast(state.nightMode ? "Night Vision Active on all cameras." : "Daylight Mode.", "info");
    });
  }

  // Live Clock for Echo Show Preview
  function updateClock() {
    const clock = document.getElementById('echo-clock');
    if (clock) {
      const now = new Date();
      clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
  setInterval(updateClock, 30000);
  updateClock();
});
