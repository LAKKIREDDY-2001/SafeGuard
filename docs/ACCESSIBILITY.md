# SafeGuard Multi-Modal Accessibility Documentation

> *"Security should protect everyone, including those who can't see or hear the alerts."*

SafeGuard was designed from the ground up to comply with **WCAG 2.1 Level AA** guidelines and provide universal security access for elderly family members, deaf or hard-of-hearing individuals, visually impaired users, and non-native English speakers.

---

## 1. Visual Accessibility

### 1.1 High-Contrast Mode (WCAG AAA)
* **Design Philosophy:** Standard subtle dark mode can be difficult for aging eyes or users with cataracts.
* **Implementation:**
  * Enabled with a single toggle in the Accessibility Center (`body.high-contrast`).
  * Contrast ratio exceeds **12:1** (pure `#000000` canvas, `#FFFFFF` text, high-luminance `#FFFF55` secondary text).
  * 2px solid neon borders replace subtle dark borders.

### 1.2 3-Tier Color-Coded Threat Indicators
* Every alert status uses redundant cues (Color + Text Label + Icon + Tone) so color-blind users (deuteranopia / protanopia) are never disadvantaged:
  * 🔴 **Critical:** Crimson Red (`#EF4444`) + Label `"CRITICAL THREAT"` + Warning Icon 🚨
  * 🟡 **Medium / Warning:** Amber Gold (`#F59E0B`) + Label `"MEDIUM"` + Triangle Icon ⚠️
  * 🟢 **Low / Safe:** Emerald Green (`#10B981`) + Label `"LOW THREAT"` + Shield Icon 🛡️

---

## 2. Auditory Accessibility

### 2.1 Web Audio API Synthesized Chimes
Unlike external audio files that can fail to buffer, SafeGuard synthesizes mathematically precise acoustic frequencies via `AudioContext`:
* **Critical Threat Chime:** Dual harmonic sawtooth wave alternating between 880Hz (A5) and 440Hz (A4) with sharp attack (0.35s duration). Pierces background ambient noise.
* **Medium Advisory Chime:** Pure sine wave at 587.33Hz (D5) with gentle decay (0.25s).
* **Safe / Family Event Chime:** Warm major third interval: 523.25Hz (C5) transitioning to 659.25Hz (E5).

### 2.2 Alexa Voice Descriptions
* Hard-of-seeing users can interact entirely hands-free via Amazon Echo:
  * *"Alexa, who's at my door?"*
  * *"Alexa, is my family safe?"*
  * Audio announcements proactively broadcast over Echo smart speakers when Critical threats emerge.

---

## 3. Haptic Accessibility (Deaf & Hard-of-Hearing)

* **Mobile Vibration Patterns:**
  * **Critical Threat / Forced Entry:** Continuous high-intensity pulse: `[500ms vibrate, 100ms pause, 500ms vibrate]`.
  * **Family Member Arrival:** Gentle double tap: `[100ms vibrate, 80ms pause, 100ms vibrate]`.
  * **Elder Wellness Alert:** Periodic pulse every 10 seconds until acknowledged.

---

## 4. Elderly User Experience (Aging in Place)

### 4.1 Large Text Mode
* One-click toggle scales all core UI typography up by 125% to 150%:
  * Dashboard headings increase from `1.0rem` to `1.4rem`.
  * Key KPI telemetry increases to `2.4rem`.
  * AI Threat summary font increases to `1.15rem` with `1.7` line-height for effortless legibility.

### 4.2 Elder Wellness Automation
* Protects isolated elders (like Grandma Meera, 75) who may not remember to push buttons or call relatives.
* If indoor Ring cameras register inactivity for >8 hours during normal waking periods, family members receive proactive wellness prompts.

---

## 5. Screen Reader Compliance & ARIA Implementation

* **Live Region Announcer:** An invisible `aria-live="assertive"` region dynamically announces incoming threats:
  ```html
  <div id="screen-reader-announcer" class="sr-only" aria-live="assertive"></div>
  ```
* **Semantic HTML5:** Built using `<main>`, `<header>`, `<aside role="region">`, and `<div role="feed">`.
* **Explicit Keyboard Focus:** All interactive elements feature `:focus-visible` styling with 2px bright blue outlines.
* **Descriptive Labels:** All icon buttons (Emergency SOS, Accessibility drawer) contain explicit `aria-label` tags.

---

## 6. Multi-Language Inclusivity (5 Languages)

To ensure security alerts are instantly comprehended in high-stress moments, SafeGuard generates native threat summaries in 5 global languages:

| Language | Locale | Example AI Threat Summary |
|---|---|---|
| **English** | `en-US` | *"Unknown individual, 3rd visit this week at 11:47 PM. Threat: HIGH."* |
| **Hindi (हिन्दी)** | `hi-IN` | *"अज्ञात व्यक्ति, इस सप्ताह 3री बार 11:47 बजे देखा गया। खतरा: उच्च।"* |
| **Telugu (తెలుగు)** | `te-IN` | *"గుర్తుతెలియని వ్యక్తి, ఈ వారం 3వ సారి రాత్రి 11:47కి కనిపించారు. ముప్పు: ఎక్కువ."* |
| **Spanish (Español)** | `es-ES` | *"Persona desconocida, 3ª visita esta semana a las 11:47 PM. Amenaza: ALTA."* |
| **German (Deutsch)** | `de-DE` | *"Unbekannte Person, 3. Besuch diese Woche um 23:47 Uhr. Bedrohung: HOCH."* |
