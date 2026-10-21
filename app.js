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
  locks: {
    frontDoor: {
      id: 'frontDoor',
      name: 'Front Door Pro Deadbolt',
      location: 'Front Porch • Main Entry',
      locked: true,
      battery: 94,
      autoLockSeconds: 45,
      lastActivity: 'Secured via Auto-Lock (3:15 PM)'
    },
    backDoor: {
      id: 'backDoor',
      name: 'Backyard Patio Smart Lock',
      location: 'Back Patio • Kitchen Deck',
      locked: true,
      battery: 89,
      autoLockSeconds: 60,
      lastActivity: 'Secured via Schedule (11:00 PM)'
    },
    garageDoor: {
      id: 'garageDoor',
      name: 'Garage Side Entry Deadbolt',
      location: 'Mudroom • Garage Access',
      locked: false,
      battery: 91,
      autoLockSeconds: 30,
      lastActivity: 'Unlocked by Rahul at 6:45 PM'
    }
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
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;

    if (type === 'doorbell' || type === 'chime') {
      // REALISTIC RING DOORBELL CHIME ("Ding-Dong")
      // High Bell Tone (Ding)
      const osc1 = audioCtx.createOscillator();
      const osc1Harmonic = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now); // A5
      osc1Harmonic.type = 'triangle';
      osc1Harmonic.frequency.setValueAtTime(1760, now);

      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.35, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc1.connect(gain1);
      osc1Harmonic.connect(gain1);
      gain1.connect(audioCtx.destination);

      osc1.start(now);
      osc1Harmonic.start(now);
      osc1.stop(now + 1.2);
      osc1Harmonic.stop(now + 1.2);

      // Low Bell Tone (Dong) at +0.42s
      const osc2 = audioCtx.createOscillator();
      const osc2Harmonic = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(587.33, now + 0.42); // D5
      osc2Harmonic.type = 'triangle';
      osc2Harmonic.frequency.setValueAtTime(1174.66, now + 0.42);

      gain2.gain.setValueAtTime(0, now + 0.42);
      gain2.gain.linearRampToValueAtTime(0.32, now + 0.44);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

      osc2.connect(gain2);
      osc2Harmonic.connect(gain2);
      gain2.connect(audioCtx.destination);

      osc2.start(now + 0.42);
      osc2Harmonic.start(now + 0.42);
      osc2.stop(now + 2.0);
      osc2Harmonic.stop(now + 2.0);

    } else if (type === 'calling') {
      // REALISTIC PHONE RING-BACK TONE (Dual 440Hz + 480Hz)
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(440, now);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(480, now);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.setValueAtTime(0.14, now + 1.4);
      gain.gain.linearRampToValueAtTime(0.001, now + 1.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.5);
      osc2.stop(now + 1.5);

    } else if (type === 'siren') {
      // 110dB EMERGENCY SIREN SWEEP
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.linearRampToValueAtTime(1350, now + 0.4);
      osc.frequency.linearRampToValueAtTime(650, now + 0.8);
      osc.frequency.linearRampToValueAtTime(1350, now + 1.2);
      osc.frequency.linearRampToValueAtTime(650, now + 1.6);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 1.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 1.8);

    } else if (type === 'radio_chirp') {
      // PUSH-TO-TALK TWO-WAY CHIRP
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.05);

    } else if (type === 'critical') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(440, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);

    } else if (type === 'medium') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);

    } else if (type === 'lock') {
      // MOTORIZED MECHANICAL SMART DEADBOLT LOCK
      // 1. Motor hum with frequency drop (160 Hz -> 95 Hz)
      const motorOsc = audioCtx.createOscillator();
      const motorGain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);

      motorOsc.type = 'sawtooth';
      motorOsc.frequency.setValueAtTime(160, now);
      motorOsc.frequency.linearRampToValueAtTime(95, now + 0.18);

      motorGain.gain.setValueAtTime(0, now);
      motorGain.gain.linearRampToValueAtTime(0.24, now + 0.02);
      motorGain.gain.exponentialRampToValueAtTime(0.01, now + 0.20);

      motorOsc.connect(filter);
      filter.connect(motorGain);
      motorGain.connect(audioCtx.destination);

      motorOsc.start(now);
      motorOsc.stop(now + 0.20);

      // 2. Heavy dual metallic latch strike
      const strike1 = audioCtx.createOscillator();
      const strikeGain1 = audioCtx.createGain();
      strike1.type = 'sine';
      strike1.frequency.setValueAtTime(1200, now + 0.16);
      strike1.frequency.exponentialRampToValueAtTime(220, now + 0.22);
      strikeGain1.gain.setValueAtTime(0.35, now + 0.16);
      strikeGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.23);
      strike1.connect(strikeGain1);
      strikeGain1.connect(audioCtx.destination);
      strike1.start(now + 0.16);
      strike1.stop(now + 0.23);

      const strike2 = audioCtx.createOscillator();
      const strikeGain2 = audioCtx.createGain();
      strike2.type = 'triangle';
      strike2.frequency.setValueAtTime(600, now + 0.19);
      strikeGain2.gain.setValueAtTime(0.25, now + 0.19);
      strikeGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      strike2.connect(strikeGain2);
      strikeGain2.connect(audioCtx.destination);
      strike2.start(now + 0.19);
      strike2.stop(now + 0.25);

    } else if (type === 'unlock') {
      // MOTORIZED SMART DEADBOLT UNLOCK & SPRING RELEASE
      // 1. Motor hum with frequency rise (105 Hz -> 180 Hz)
      const motorOsc = audioCtx.createOscillator();
      const motorGain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1100, now);

      motorOsc.type = 'sawtooth';
      motorOsc.frequency.setValueAtTime(105, now);
      motorOsc.frequency.linearRampToValueAtTime(180, now + 0.16);

      motorGain.gain.setValueAtTime(0, now);
      motorGain.gain.linearRampToValueAtTime(0.22, now + 0.02);
      motorGain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

      motorOsc.connect(filter);
      filter.connect(motorGain);
      motorGain.connect(audioCtx.destination);

      motorOsc.start(now);
      motorOsc.stop(now + 0.18);

      // 2. Crisp metallic spring clicks
      const click1 = audioCtx.createOscillator();
      const clickGain1 = audioCtx.createGain();
      click1.type = 'sine';
      click1.frequency.setValueAtTime(950, now + 0.13);
      clickGain1.gain.setValueAtTime(0.26, now + 0.13);
      clickGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      click1.connect(clickGain1);
      clickGain1.connect(audioCtx.destination);
      click1.start(now + 0.13);
      click1.stop(now + 0.18);

      const click2 = audioCtx.createOscillator();
      const clickGain2 = audioCtx.createGain();
      click2.type = 'triangle';
      click2.frequency.setValueAtTime(1400, now + 0.16);
      clickGain2.gain.setValueAtTime(0.20, now + 0.16);
      clickGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      click2.connect(clickGain2);
      clickGain2.connect(audioCtx.destination);
      click2.start(now + 0.16);
      click2.stop(now + 0.22);

    } else {
      // Pleasant Safe/Success Arpeggio
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
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

// =========================================================================
// SMART DEADBOLTS & PERIMETER LOCKS CONTROLLER
// =========================================================================

function setDoorLockState(doorKey, shouldLock, triggerSource = 'Manual UI') {
  if (!state.locks || !state.locks[doorKey]) return;

  const door = state.locks[doorKey];
  door.locked = shouldLock;
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  door.lastActivity = `${shouldLock ? 'Secured' : 'Unlocked'} via ${triggerSource} (${timeStr})`;

  playAudioCue(shouldLock ? 'lock' : 'unlock');
  triggerHaptic(shouldLock ? 200 : 100);

  updateLocksUI();

  if (shouldLock) {
    showToast(`🔒 ${door.name} secured. Motorized deadbolt engaged.`, 'low');
  } else {
    showToast(`🔓 ${door.name} unlocked. (${door.autoLockSeconds}s auto-lock timer running)`, 'medium');
  }
}

function secureAllDoors() {
  if (!state.locks) return;

  let changed = false;
  Object.keys(state.locks).forEach(k => {
    if (!state.locks[k].locked) {
      state.locks[k].locked = true;
      state.locks[k].lastActivity = `Secured via 1-Tap Master Lock (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
      changed = true;
    }
  });

  playAudioCue('lock');
  triggerHaptic(300);
  updateLocksUI();
  showToast("🔒 All 3 exterior smart deadbolts locked and verified secured.", "low");
}

function unlockAllDoors() {
  if (!state.locks) return;

  const confirmUnlock = confirm("⚠️ UNLOCK ALL EXTERIOR SMART DEADBOLTS?\n\nThis will disengage deadbolts on the Front Door, Backyard Patio, and Garage Entry.\n\nAre you sure you want to proceed?");
  if (!confirmUnlock) return;

  Object.keys(state.locks).forEach(k => {
    state.locks[k].locked = false;
    state.locks[k].lastActivity = `Unlocked via Master Unlock (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
  });

  playAudioCue('unlock');
  triggerHaptic(200);
  updateLocksUI();
  showToast("🔓 Advisory: All exterior smart deadbolts have been unlocked.", "medium");
}

function updateLocksUI() {
  if (!state.locks) return;

  const unlockedCount = Object.values(state.locks).filter(l => !l.locked).length;

  // 1. Topbar Lock Status Button
  const btnTopbarLock = document.getElementById('btn-topbar-lock-toggle');
  const topbarLockIcon = document.getElementById('topbar-lock-icon');
  const topbarLockText = document.getElementById('topbar-lock-text');
  const globalBadge = document.getElementById('smart-locks-global-badge');

  if (btnTopbarLock) {
    if (unlockedCount === 0) {
      btnTopbarLock.className = 'btn-topbar-lock locked';
      if (topbarLockIcon) topbarLockIcon.textContent = '🔒';
      if (topbarLockText) topbarLockText.textContent = 'All Doors Secured';
      if (globalBadge) {
        globalBadge.className = 'threat-badge low';
        globalBadge.textContent = 'All 3 Secured';
      }
    } else {
      btnTopbarLock.className = 'btn-topbar-lock unlocked';
      if (topbarLockIcon) topbarLockIcon.textContent = '🔓';
      if (topbarLockText) topbarLockText.textContent = `${unlockedCount} Door${unlockedCount > 1 ? 's' : ''} Unlocked`;
      if (globalBadge) {
        globalBadge.className = 'threat-badge medium';
        globalBadge.textContent = `${unlockedCount} Unlocked`;
      }
    }
  }

  // 2. Dashboard Smart Locks Console Cards
  Object.keys(state.locks).forEach(key => {
    const door = state.locks[key];
    const cardSuffix = key === 'frontDoor' ? 'front' : (key === 'backDoor' ? 'back' : 'garage');
    const card = document.getElementById(`lock-card-${cardSuffix}`);
    const badge = document.getElementById(`badge-${key}`);
    const activity = document.getElementById(`activity-${key}`);
    const lockBtn = document.getElementById(`btn-lock-${cardSuffix}`);
    const unlockBtn = document.getElementById(`btn-unlock-${cardSuffix}`);

    if (card) {
      card.classList.toggle('unlocked', !door.locked);
    }
    if (badge) {
      badge.className = `lock-status-badge ${door.locked ? 'locked' : 'unlocked'}`;
      badge.textContent = door.locked ? '🔒 Locked' : '🔓 Unlocked';
    }
    if (activity) {
      activity.textContent = `Last activity: ${door.lastActivity}`;
    }
    if (lockBtn && unlockBtn) {
      lockBtn.classList.toggle('lock-active', door.locked);
      unlockBtn.classList.toggle('unlock-active', !door.locked);
    }
  });

  // 3. Camera View Front Doorbell Card Badge & Buttons
  const camFrontBadge = document.getElementById('cam-front-door-lock-badge');
  const btnCamLockFront = document.getElementById('btn-cam-lock-front');
  const btnCamUnlockFront = document.getElementById('btn-cam-unlock-front');
  const frontLocked = state.locks.frontDoor && state.locks.frontDoor.locked;

  if (camFrontBadge) {
    camFrontBadge.textContent = frontLocked ? 'FRONT ENTRANCE • DEADBOLT LOCKED' : 'FRONT ENTRANCE • DEADBOLT UNLOCKED';
    camFrontBadge.style.color = frontLocked ? 'var(--text-secondary)' : '#fbbf24';
  }
  if (btnCamLockFront) {
    btnCamLockFront.style.color = frontLocked ? 'var(--threat-low)' : 'var(--text-secondary)';
    btnCamLockFront.style.fontWeight = frontLocked ? '700' : '400';
  }
  if (btnCamUnlockFront) {
    btnCamUnlockFront.style.color = !frontLocked ? 'var(--threat-medium)' : 'var(--text-secondary)';
    btnCamUnlockFront.style.fontWeight = !frontLocked ? '700' : '400';
  }

  // 4. Video Player Modal Buttons
  const btnForensicLock = document.getElementById('btn-forensic-lock');
  const btnForensicUnlock = document.getElementById('btn-forensic-unlock');
  if (btnForensicLock) {
    btnForensicLock.className = frontLocked ? 'btn-ai-action' : 'btn-ai-secondary';
    btnForensicLock.textContent = frontLocked ? '✓ Door Locked' : '🔒 Lock Door';
  }
  if (btnForensicUnlock) {
    btnForensicUnlock.className = !frontLocked ? 'btn-ai-action' : 'btn-ai-secondary';
    btnForensicUnlock.textContent = !frontLocked ? '✓ Unlocked' : '🔓 Unlock';
  }

  // 5. Intercom Modal Buttons
  const btnIntercomLock = document.getElementById('btn-intercom-lock');
  const btnIntercomUnlock = document.getElementById('btn-intercom-unlock');
  if (btnIntercomLock) {
    btnIntercomLock.classList.toggle('active', frontLocked);
  }
  if (btnIntercomUnlock) {
    btnIntercomUnlock.classList.toggle('active', !frontLocked);
  }

  // 6. Dashboard AI Hero Quick-Lock and Proactive Advisory
  const btnQuickLock = document.getElementById('btn-quick-lock');
  const btnDashLock = document.getElementById('btn-dash-quick-lock');
  const backLocked = state.locks.backDoor && state.locks.backDoor.locked;

  if (btnQuickLock) {
    if (backLocked) {
      btnQuickLock.textContent = '✓ Back Door Locked';
      btnQuickLock.style.background = 'var(--threat-low)';
    } else {
      btnQuickLock.textContent = '🔒 Lock Back Door';
      btnQuickLock.style.background = '';
    }
  }
  if (btnDashLock) {
    if (backLocked) {
      btnDashLock.textContent = '✓ Back Door Locked';
      btnDashLock.style.background = 'var(--threat-low)';
    } else {
      btnDashLock.textContent = 'Lock Back Door Now';
      btnDashLock.style.background = '';
    }
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

  // Smart Locks Quick Status & Toggle Button (Topbar)
  const btnTopbarLock = document.getElementById('btn-topbar-lock-toggle');
  if (btnTopbarLock) {
    btnTopbarLock.addEventListener('click', () => {
      const unlockedCount = Object.values(state.locks).filter(l => !l.locked).length;
      if (unlockedCount > 0) {
        secureAllDoors();
      } else {
        showToast("Perimeter Secure: All 3 exterior smart deadbolts locked.", "low");
        switchTab('dashboard');
        const consoleEl = document.getElementById('smart-locks-console');
        if (consoleEl) consoleEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // Smart Locks Panel Master Controls
  const btnSecureAll = document.getElementById('btn-secure-all-doors');
  if (btnSecureAll) {
    btnSecureAll.addEventListener('click', secureAllDoors);
  }

  const btnUnlockAll = document.getElementById('btn-unlock-all-doors');
  if (btnUnlockAll) {
    btnUnlockAll.addEventListener('click', unlockAllDoors);
  }

  // Smart Locks Individual Cards Actions
  document.querySelectorAll('[data-door-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btn.dataset.doorAction;
      const doorKey = btn.dataset.doorKey;
      setDoorLockState(doorKey, action === 'lock', 'Console');
    });
  });

  // Quick Action Buttons
  const btnQuickLock = document.getElementById('btn-quick-lock');
  if (btnQuickLock) {
    btnQuickLock.addEventListener('click', () => {
      setDoorLockState('backDoor', true, 'AI Threat Panel');
    });
  }

  const btnDashLock = document.getElementById('btn-dash-quick-lock');
  if (btnDashLock) {
    btnDashLock.addEventListener('click', () => {
      setDoorLockState('backDoor', true, 'Proactive Advisory');
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

  // =========================================================================
  // CAMERA SCENES & HIGH-DEFINITION VIDEO PLAYER CONTROLLER
  // =========================================================================

  const cameraScenes = {
    doorbell_front: {
      name: "Front Doorbell Pro 2",
      img: "assets/cam_front_door_night.svg",
      badge: "LIVE 1080p HDR",
      clock: "2026-10-21 23:47:19 EDT • IR NIGHT VISION ACTIVE",
      forensicTitle: "✦ Bedrock AI Forensic: Unknown Person Loitering",
      forensicDesc: "3rd visit in 5 days at 11:47 PM. Rekognition Face Match: 0% to family. Claude 3 Haiku Assessment: Reconnaissance loitering (duration 42s). Recommended: Smart Deadbolt lock + 110dB floodlight siren.",
      doorbellRingAvailable: true
    },
    cam_backyard: {
      name: "Backyard Floodlight Cam Wired",
      img: "assets/cam_backyard_floodlight.svg",
      badge: "THREAT ACTIVE • 2000 LM",
      clock: "2026-10-21 23:47:19 EDT • FLOODLIGHTS ON (100%)",
      forensicTitle: "✦ Bedrock AI Forensic: Backyard Perimeter Breach",
      forensicDesc: "Motion detected near rear fence line at 11:47 PM. Correlated with Front Door event. Floodlight 2000lm triggered. 110dB Siren ready.",
      doorbellRingAvailable: false
    },
    cam_driveway: {
      name: "Driveway Spotlight Cam Plus",
      img: "assets/cam_driveway_spotlight.svg",
      badge: "SECURE • SPOTLIGHT ON",
      clock: "2026-10-21 02:14:11 EDT • SPOTLIGHT ACTIVE",
      forensicTitle: "✦ Bedrock AI Forensic: Vehicle Turnaround",
      forensicDesc: "Delivery van turned around in driveway apron. No perimeter breach. Garage doors verified locked. Low Threat.",
      doorbellRingAvailable: false
    },
    cam_grandma_living: {
      name: "Grandma's Living Room Cam",
      img: "assets/cam_grandma_room.svg",
      badge: "WELLNESS CHECK ADVISORY",
      clock: "2026-10-21 13:30:00 EDT • ELDER CARE AI SENSOR",
      forensicTitle: "✦ Bedrock AI Forensic: Inactivity Advisory (8.2 Hours)",
      forensicDesc: "Grandma Meera (75): No motion detected since 1:30 PM lunch. Echo Show 10 check-in prompt queued. High wellness priority.",
      doorbellRingAvailable: false
    },
    aarav_arrival: {
      name: "Front Doorbell Pro 2 — Aarav Arrival",
      img: "assets/cam_aarav_arrival.svg",
      badge: "FAMILY SAFE • VERIFIED",
      clock: "2026-10-21 15:15:22 EDT • DAYLIGHT HDR",
      forensicTitle: "✦ Bedrock AI Forensic: Child Arrived Home Safely",
      forensicDesc: "Aarav Reddy (10) arrived from school at 3:15 PM. Rekognition Match: 99.1%. Front deadbolt confirmed auto-locked.",
      doorbellRingAvailable: true
    },
    night_visitor: {
      name: "Front Doorbell Pro 2 — Night Prowler",
      img: "assets/cam_front_door_night.svg",
      badge: "CRITICAL THREAT • HIGH",
      clock: "2026-10-21 23:47:19 EDT • IR NIGHT VISION",
      forensicTitle: "✦ Bedrock AI Forensic: Reconnaissance Activity Detected",
      forensicDesc: "Unknown individual observed loitering on porch for 42s. 0% match to family profiles. Smart lock engaged.",
      doorbellRingAvailable: true
    },
    grandma_wellness: {
      name: "Grandma's Living Room — Wellness Check",
      img: "assets/cam_grandma_room.svg",
      badge: "WELLNESS ADVISORY",
      clock: "2026-10-21 13:30:00 EDT • ELDER SENSOR",
      forensicTitle: "✦ Bedrock AI Forensic: Inactivity Pattern Detected",
      forensicDesc: "8.2 hours without living room movement. SafeGuard initiated gentle two-way check-in via Echo Show 10.",
      doorbellRingAvailable: false
    },
    package: {
      name: "Front Doorbell Pro 2 — Package Delivery",
      img: "assets/cam_package_delivery.svg",
      badge: "SAVED CLIP • PACKAGE GUARD",
      clock: "2026-10-21 11:20:00 EDT • DAYLIGHT HDR",
      forensicTitle: "✦ Bedrock AI Forensic: USPS Package Verified",
      forensicDesc: "Package delivered safely to welcome mat. USPS carrier identified. Ring Package Guard active.",
      doorbellRingAvailable: true
    }
  };

  const videoModal = document.getElementById('modal-video-player');
  const videoHeading = document.getElementById('video-player-heading');
  const videoBadge = document.getElementById('video-player-badge');
  const videoFeedImg = document.getElementById('video-player-feed-img');
  const videoClock = document.getElementById('video-clock-display');
  const videoForensicTitle = document.getElementById('forensic-title');
  const videoForensicDesc = document.getElementById('forensic-desc');
  const videoCamSelect = document.getElementById('video-cam-select');
  const btnCloseVideo = document.getElementById('btn-close-video');
  const btnPlayerRing = document.getElementById('btn-player-ring-doorbell');
  const btnHudAi = document.getElementById('btn-hud-ai');
  const btnHudNight = document.getElementById('btn-hud-night');
  const btnHudZoom = document.getElementById('btn-hud-zoom');
  const btnPlayerIntercom = document.getElementById('btn-player-intercom');
  const btnPlayerSnapshot = document.getElementById('btn-player-snapshot');
  const btnForensicAlert = document.getElementById('btn-forensic-alert');
  const btnForensicLock = document.getElementById('btn-forensic-lock');
  const btnForensicUnlock = document.getElementById('btn-forensic-unlock');

  let currentZoomIndex = 0;
  const zoomClasses = ['', 'zoom-15x', 'zoom-20x'];
  const zoomLabels = ['🔍 1.0x', '🔍 1.5x', '🔍 2.0x'];

  function openVideoPlayer(camId = 'doorbell_front', sceneKey = null) {
    if (!videoModal) return;
    closeAllDropdowns();
    videoModal.hidden = false;

    const key = sceneKey || camId;
    loadCameraScene(key);
    playAudioCue('click');
  }

  function closeVideoPlayer() {
    if (videoModal) videoModal.hidden = true;
  }

  function loadCameraScene(key) {
    const scene = cameraScenes[key] || cameraScenes.doorbell_front;
    if (videoHeading) videoHeading.textContent = scene.name;
    if (videoBadge) videoBadge.textContent = scene.badge;
    if (videoFeedImg) videoFeedImg.src = scene.img;
    if (videoClock) videoClock.textContent = scene.clock;
    if (videoForensicTitle) videoForensicTitle.textContent = scene.forensicTitle;
    if (videoForensicDesc) videoForensicDesc.textContent = scene.forensicDesc;

    if (btnPlayerRing) {
      btnPlayerRing.style.display = scene.doorbellRingAvailable ? 'flex' : 'none';
    }

    if (videoCamSelect) {
      if (['doorbell_front', 'cam_backyard', 'cam_driveway', 'cam_grandma_living'].includes(key)) {
        videoCamSelect.value = key;
      }
    }
  }

  if (btnCloseVideo) btnCloseVideo.addEventListener('click', closeVideoPlayer);

  if (videoCamSelect) {
    videoCamSelect.addEventListener('change', (e) => {
      loadCameraScene(e.target.value);
    });
  }

  // Timeline Marker Chips
  document.querySelectorAll('.timeline-marker-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.timeline-marker-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const scene = chip.dataset.scene;
      loadCameraScene(scene);
      showToast(`Scrubbed video timeline to ${chip.textContent.trim()}`, 'info');
    });
  });

  // HUD AI Overlay Toggle
  if (btnHudAi) {
    btnHudAi.addEventListener('click', () => {
      btnHudAi.classList.toggle('active');
      const isActive = btnHudAi.classList.contains('active');
      showToast(isActive ? "Rekognition AI Bounding Box HUD: ON" : "AI Vision Overlays: Hidden", "info");
    });
  }

  // Night Vision IR Toggle
  if (btnHudNight && videoFeedImg) {
    btnHudNight.addEventListener('click', () => {
      btnHudNight.classList.toggle('active');
      videoFeedImg.classList.toggle('night-vision-filter', btnHudNight.classList.contains('active'));
      showToast(btnHudNight.classList.contains('active') ? "Infrared Monochrome Filter Enabled" : "Daylight Color Sensor Mode", "info");
    });
  }

  // Digital Zoom Toggle
  if (btnHudZoom && videoFeedImg) {
    btnHudZoom.addEventListener('click', () => {
      currentZoomIndex = (currentZoomIndex + 1) % zoomClasses.length;
      videoFeedImg.className = `video-player-img ${zoomClasses[currentZoomIndex]} ${btnHudNight.classList.contains('active') ? 'night-vision-filter' : ''}`.trim();
      btnHudZoom.textContent = zoomLabels[currentZoomIndex];
    });
  }

  // Realistic Doorbell Ring
  function triggerDoorbellRing() {
    playAudioCue('doorbell');
    triggerHaptic(500);
    showToast("🔔 DING-DONG! Ring Doorbell pressed at Front Door!", "critical");

    setTimeout(() => {
      startIntercomCall('doorbell');
    }, 1200);
  }

  if (btnPlayerRing) {
    btnPlayerRing.addEventListener('click', triggerDoorbellRing);
  }

  if (btnPlayerIntercom) {
    btnPlayerIntercom.addEventListener('click', () => {
      startIntercomCall('doorbell');
    });
  }

  if (btnPlayerSnapshot) {
    btnPlayerSnapshot.addEventListener('click', () => {
      playAudioCue('click');
      showToast("HD Forensic Snapshot saved to cloud & local device.", "low");
    });
  }

  if (btnForensicAlert) {
    btnForensicAlert.addEventListener('click', () => {
      openAlertDispatch("Front Door Threat Loitering");
    });
  }

  if (btnForensicLock) {
    btnForensicLock.addEventListener('click', () => {
      setDoorLockState('frontDoor', true, 'Forensic Video Player');
    });
  }

  if (btnForensicUnlock) {
    btnForensicUnlock.addEventListener('click', () => {
      setDoorLockState('frontDoor', false, 'Forensic Video Player');
    });
  }

  // =========================================================================
  // TWO-WAY AUDIO INTERCOM & FAMILY CALLING CONTROLLER
  // =========================================================================

  const intercomModal = document.getElementById('modal-intercom');
  const intercomHeading = document.getElementById('intercom-heading');
  const intercomDeviceDesc = document.getElementById('intercom-device-desc');
  const intercomAvatarIcon = document.getElementById('intercom-avatar-icon');
  const intercomStatusBadge = document.getElementById('intercom-status-badge');
  const intercomStatusText = document.getElementById('intercom-status-text');
  const btnCloseIntercom = document.getElementById('btn-close-intercom');
  const btnCallHangup = document.getElementById('btn-call-hangup');
  const btnCallMute = document.getElementById('btn-call-mute');
  const btnCallSpeaker = document.getElementById('btn-call-speaker');
  const btnCallVideo = document.getElementById('btn-call-video');

  let intercomTimer = null;
  let intercomSeconds = 0;
  let waveAnimId = null;

  const intercomTargets = {
    priya: {
      name: "Priya Reddy (Work)",
      desc: "iPhone 14 Pro • Low-Latency Ring WebRTC VoIP Stream",
      avatar: "👩"
    },
    aarav: {
      name: "Aarav Reddy (Kids Room)",
      desc: "Echo Dot 5th Gen • Kids Bedroom Intercom",
      avatar: "👦"
    },
    meera: {
      name: "Grandma Meera (Living Room)",
      desc: "Echo Show 10 • Kitchen & Living Room Drop-In",
      avatar: "👵"
    },
    anita: {
      name: "Anita Sharma (Caregiver)",
      desc: "Mobile Phone • Authorized Caregiver VoIP",
      avatar: "👩‍💼"
    },
    doorbell: {
      name: "Front Doorbell Pro 2",
      desc: "Two-Way Audio Talk • Wide-Angle Mic & Speaker",
      avatar: "🚪"
    }
  };

  function startIntercomCall(targetKey = 'priya') {
    if (!intercomModal) return;
    closeAllDropdowns();
    intercomModal.hidden = false;

    const t = intercomTargets[targetKey] || intercomTargets.doorbell;
    if (intercomHeading) intercomHeading.textContent = `Calling ${t.name}`;
    if (intercomDeviceDesc) intercomDeviceDesc.textContent = t.desc;
    if (intercomAvatarIcon) intercomAvatarIcon.textContent = t.avatar;

    // Ringing state
    if (intercomStatusBadge) intercomStatusBadge.className = 'intercom-status-pill ringing';
    if (intercomStatusText) intercomStatusText.textContent = "Ringing...";
    playAudioCue('calling');

    clearInterval(intercomTimer);
    intercomSeconds = 0;

    setTimeout(() => {
      if (intercomModal.hidden) return; // cancelled before connect
      playAudioCue('radio_chirp');
      if (intercomStatusBadge) intercomStatusBadge.className = 'intercom-status-pill';

      intercomTimer = setInterval(() => {
        intercomSeconds++;
        const mins = String(Math.floor(intercomSeconds / 60)).padStart(2, '0');
        const secs = String(intercomSeconds % 60).padStart(2, '0');
        if (intercomStatusText) intercomStatusText.textContent = `Connected • ${mins}:${secs}`;
      }, 1000);

      startIntercomWaveform();
      showToast(`2-Way Audio Connected to ${t.name}`, 'low');
    }, 2000);
  }

  function endIntercomCall() {
    if (intercomModal) intercomModal.hidden = true;
    clearInterval(intercomTimer);
    cancelAnimationFrame(waveAnimId);
    playAudioCue('radio_chirp');
    showToast("Call ended.", "info");
  }

  if (btnCloseIntercom) btnCloseIntercom.addEventListener('click', endIntercomCall);
  if (btnCallHangup) btnCallHangup.addEventListener('click', endIntercomCall);

  if (btnCallMute) {
    btnCallMute.addEventListener('click', () => {
      btnCallMute.classList.toggle('active');
      const isMuted = btnCallMute.classList.contains('active');
      btnCallMute.textContent = isMuted ? "🔇" : "🎙️";
      showToast(isMuted ? "Microphone muted" : "Microphone active", "info");
    });
  }

  if (btnCallSpeaker) {
    btnCallSpeaker.addEventListener('click', () => {
      btnCallSpeaker.classList.toggle('active');
      showToast("Speaker boost active (100%)", "info");
    });
  }

  if (btnCallVideo) {
    btnCallVideo.addEventListener('click', () => {
      openVideoPlayer('doorbell_front');
    });
  }

  // Intercom Door Lock / Unlock Actions
  const btnIntercomLock = document.getElementById('btn-intercom-lock');
  if (btnIntercomLock) {
    btnIntercomLock.addEventListener('click', () => {
      setDoorLockState('frontDoor', true, 'Two-Way Intercom');
    });
  }

  const btnIntercomUnlock = document.getElementById('btn-intercom-unlock');
  if (btnIntercomUnlock) {
    btnIntercomUnlock.addEventListener('click', () => {
      setDoorLockState('frontDoor', false, 'Two-Way Intercom');
    });
  }

  // Canned voice responses
  document.querySelectorAll('.canned-chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const phrase = btn.dataset.say || btn.textContent;
      playAudioCue('radio_chirp');

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          const utterance = new SpeechSynthesisUtterance(phrase);
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          window.speechSynthesis.speak(utterance);
        } catch (e) {
          console.warn("Speech synthesis error:", e);
        }
      }
      showToast(`Spoke over Intercom: "${phrase}"`, 'low');
    });
  });

  // Animated Waveform Canvas
  function startIntercomWaveform() {
    const canvas = document.getElementById('intercom-wave-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let step = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 36;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const height = Math.abs(Math.sin((i * 0.28) + (step * 0.12))) * 32 + 6;
        const x = i * barWidth;
        const y = (canvas.height - height) / 2;

        ctx.fillStyle = '#00D2FF';
        ctx.fillRect(x + 2, y, barWidth - 4, height);
      }
      step++;
      waveAnimId = requestAnimationFrame(draw);
    }
    draw();
  }

  // =========================================================================
  // EMERGENCY ALERT & WORKING MEMBER DISPATCHER CONTROLLER
  // =========================================================================

  const dispatchModal = document.getElementById('modal-alert-dispatch');
  const btnCloseDispatch = document.getElementById('btn-close-dispatch');
  const btnTriggerDispatch = document.getElementById('btn-trigger-dispatch');
  const dispatchConsole = document.getElementById('dispatch-console');

  function openAlertDispatch(presetIncident = "Front Door Threat") {
    if (!dispatchModal) return;
    closeAllDropdowns();
    if (dispatchConsole) dispatchConsole.style.display = 'none';
    dispatchModal.hidden = false;
    playAudioCue('click');
  }

  function closeAlertDispatch() {
    if (dispatchModal) dispatchModal.hidden = true;
  }

  if (btnCloseDispatch) btnCloseDispatch.addEventListener('click', closeAlertDispatch);

  if (btnTriggerDispatch) {
    btnTriggerDispatch.addEventListener('click', () => {
      btnTriggerDispatch.disabled = true;
      btnTriggerDispatch.textContent = "⚡ Dispatching via AWS SNS...";
      playAudioCue('calling');

      if (dispatchConsole) {
        dispatchConsole.style.display = 'block';
        dispatchConsole.innerHTML = `<div>[${new Date().toLocaleTimeString()}] ⚡ AWS SNS Client initializing region us-east-1...</div>`;

        setTimeout(() => {
          dispatchConsole.innerHTML += `<div>[${new Date().toLocaleTimeString()}] ✓ SMS Alert delivered to Priya Reddy (+1-555-0199) • Latency: 114ms</div>`;
          playAudioCue('radio_chirp');
        }, 650);

        setTimeout(() => {
          dispatchConsole.innerHTML += `<div>[${new Date().toLocaleTimeString()}] ✓ Alexa Guard Announcement queued to 3 Echo endpoints</div>`;
          playAudioCue('doorbell');
        }, 1300);

        setTimeout(() => {
          dispatchConsole.innerHTML += `<div>[${new Date().toLocaleTimeString()}] ✓ High-Priority iOS APNs Push Delivered with Rekognition Snapshot</div>`;
          btnTriggerDispatch.disabled = false;
          btnTriggerDispatch.textContent = "✓ Dispatched Successfully";
          showToast("🚨 Emergency Alert Dispatched to Family & Priya's Office!", "critical");
        }, 1900);
      }
    });
  }

  // =========================================================================
  // EVENT DELEGATION FOR FAMILY CARDS & CAMERA FEEDS
  // =========================================================================

  // Family Member Action Buttons
  document.querySelectorAll('[data-action="call-member"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const member = btn.dataset.member || 'priya';
      startIntercomCall(member);
    });
  });

  document.querySelectorAll('[data-action="alert-member"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openAlertDispatch();
    });
  });

  document.querySelectorAll('[data-action="view-member-cam"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cam = btn.dataset.cam || 'doorbell_front';
      const scene = btn.dataset.scene || 'aarav_arrival';
      openVideoPlayer(cam, scene);
    });
  });

  document.querySelectorAll('[data-action="nudge-member"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playAudioCue('safe');
      const member = btn.dataset.member;
      if (member === 'aarav') {
        showToast("Alexa Whisper sent to Aarav's Echo: 'Please ensure front door deadbolt is locked.'", "low");
      } else {
        showToast("Caregiver Shift Notice dispatched via SMS.", "info");
      }
    });
  });

  // Camera Card Viewport Click to Open Stream
  document.querySelectorAll('.camera-viewport-large').forEach(vp => {
    vp.addEventListener('click', () => {
      const cam = vp.dataset.cam || 'doorbell_front';
      openVideoPlayer(cam);
    });
  });

  // Camera Card Control Buttons
  document.querySelectorAll('[data-cam-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btn.dataset.camAction;
      const cam = btn.dataset.cam || 'doorbell_front';

      if (action === 'stream') {
        openVideoPlayer(cam);
      } else if (action === 'talk') {
        startIntercomCall(cam === 'cam_grandma_living' ? 'meera' : 'doorbell');
      } else if (action === 'doorbell-ring') {
        triggerDoorbellRing();
      } else if (action === 'siren') {
        playAudioCue('siren');
        showToast("🚨 Floodlight Siren Sounding (110dB)! Clip saved to cloud.", "critical");
      } else if (action === 'alert-dispatch') {
        openAlertDispatch("Grandma Wellness Alert");
      } else if (action === 'lock') {
        const door = btn.dataset.door || 'frontDoor';
        setDoorLockState(door, true, 'Camera Surveillance');
      } else if (action === 'unlock') {
        const door = btn.dataset.door || 'frontDoor';
        setDoorLockState(door, false, 'Camera Surveillance');
      } else if (action === 'light') {
        playAudioCue('click');
        showToast("2000-Lumen Floodlight set to 100% brightness.", "info");
      } else if (action === 'clip') {
        playAudioCue('click');
        showToast("60-Second forensic HD clip saved to cloud storage.", "low");
      } else if (action === 'spotlight') {
        playAudioCue('click');
        showToast("Spotlight beam toggled ON.", "info");
      } else if (action === 'garage') {
        playAudioCue('safe');
        showToast("Garage door sensor verified CLOSED.", "low");
      }
    });
  });

  // Dashboard Banner Buttons
  const btnBannerAlert = document.getElementById('btn-banner-alert-family');
  if (btnBannerAlert) {
    btnBannerAlert.addEventListener('click', () => {
      openAlertDispatch("Active Front Door Threat");
    });
  }

  const btnBannerClip = document.getElementById('btn-banner-view-clip');
  if (btnBannerClip) {
    btnBannerClip.addEventListener('click', () => {
      openVideoPlayer('doorbell_front', 'night_visitor');
    });
  }

  const btnHeroClip = document.getElementById('btn-hero-watch-clip');
  if (btnHeroClip) {
    btnHeroClip.addEventListener('click', () => {
      openVideoPlayer('doorbell_front', 'night_visitor');
    });
  }

  const btnHeroAlert = document.getElementById('btn-hero-alert-family');
  if (btnHeroAlert) {
    btnHeroAlert.addEventListener('click', () => {
      openAlertDispatch("Front Door Unknown Person Loitering");
    });
  }

  // Close modals on escape key or backdrop click
  [videoModal, intercomModal, dispatchModal].forEach(m => {
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m) m.hidden = true;
      });
    }
  });

  // Initial UI sync
  updateUserUI();
  updateLocksUI();
});
