"""
SafeGuard — High-Resolution Screenshot & Animated Demo GIF Generator
Renders all 12 views of the SafeGuard platform using Chrome Headless,
then compiles an 800px animated demo GIF using ffmpeg.
"""

import os
import re
import subprocess
import time

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCREENSHOTS_DIR = os.path.join(PROJECT_DIR, "docs", "screenshots")
TEMP_DIR = "/tmp/safeguard_render"
CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

with open(os.path.join(PROJECT_DIR, "dashboard", "index.html"), "r", encoding="utf-8") as f:
    base_html = f.read()

# Helper to swap active view-pane
def set_active_view(html, active_id):
    # Remove all active classes from view-panes
    html = re.sub(r'class="view-pane active"', 'class="view-pane"', html)
    # Add active to target view
    html = html.replace(f'id="{active_id}"', f'id="{active_id}" class="view-pane active"')
    # Also adjust relative assets to absolute path
    dashboard_path = os.path.join(PROJECT_DIR, "dashboard")
    html = html.replace('href="styles.css"', f'href="{dashboard_path}/styles.css"')
    html = html.replace('src="app.js"', f'src="{dashboard_path}/app.js"')
    html = html.replace('src="assets/', f'src="{dashboard_path}/assets/')
    return html

# 12 Views specifications
views = [
    {
        "filename": "01_realtime_event_dashboard.png",
        "view": "view-dashboard",
        "custom": ""
    },
    {
        "filename": "02_ai_threat_assessment.png",
        "view": "view-dashboard",
        "custom": "<script>document.addEventListener('DOMContentLoaded', () => { setTimeout(() => { const el = document.querySelector('section[aria-label=\"AI Threat Assessment\"]'); if (el) el.scrollIntoView(); }, 300); });</script>"
    },
    {
        "filename": "03_behavioral_pattern_analysis.png",
        "view": "view-patterns",
        "custom": ""
    },
    {
        "filename": "04_family_safety_monitor.png",
        "view": "view-family",
        "custom": ""
    },
    {
        "filename": "05_proactive_security_recommendations.png",
        "view": "view-dashboard",
        "custom": "<script>document.addEventListener('DOMContentLoaded', () => { setTimeout(() => { const el = document.getElementById('security-scorecard-widget'); if (el) el.scrollIntoView(); }, 300); });</script>"
    },
    {
        "filename": "06_alexa_voice_integration.png",
        "view": "view-alexa",
        "custom": ""
    },
    {
        "filename": "07_weekly_security_report.png",
        "view": "view-reports",
        "custom": ""
    },
    {
        "filename": "08_visitor_recognition_history.png",
        "view": "view-patterns",
        "custom": "<script>document.addEventListener('DOMContentLoaded', () => { setTimeout(() => { window.scrollTo(0, 400); }, 300); });</script>"
    },
    {
        "filename": "09_geofence_family_tracking.png",
        "view": "view-family",
        "custom": "<script>document.addEventListener('DOMContentLoaded', () => { setTimeout(() => { window.scrollTo(0, 500); }, 300); });</script>"
    },
    {
        "filename": "10_emergency_response_panel.png",
        "view": "view-dashboard",
        "custom": "<script>document.addEventListener('DOMContentLoaded', () => { const m = document.getElementById('modal-alert-dispatch'); if (m) m.hidden = false; });</script>"
    },
    {
        "filename": "11_night_mode_smart_lighting.png",
        "view": "view-cameras",
        "custom": "<script>document.addEventListener('DOMContentLoaded', () => { const m = document.getElementById('modal-video-player'); if (m) m.hidden = false; });</script>"
    },
    {
        "filename": "12_multicamera_unified_view.png",
        "view": "view-cameras",
        "custom": ""
    }
]

print("Rendering 12 high-resolution screenshots with Chrome Headless...")

for idx, v in enumerate(views, 1):
    html = set_active_view(base_html, v["view"])
    if v["custom"]:
        html = html.replace("</body>", f"{v['custom']}</body>")

    temp_html_path = os.path.join(TEMP_DIR, f"view_{idx:02d}.html")
    with open(temp_html_path, "w", encoding="utf-8") as f:
        f.write(html)

    output_png = os.path.join(SCREENSHOTS_DIR, v["filename"])
    cmd = [
        CHROME_BIN,
        "--headless",
        "--disable-gpu",
        "--user-data-dir=/tmp/chrome-data-render",
        f"--screenshot={output_png}",
        "--window-size=1440,920",
        f"file://{temp_html_path}"
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(output_png):
        size_kb = os.path.getsize(output_png) // 1024
        print(f"[{idx:02d}/12] ✓ {v['filename']} ({size_kb} KB)")
    else:
        print(f"[{idx:02d}/12] ✗ Failed to render {v['filename']}")

print("\nCompiling safeguard-demo.gif (800px, 15 seconds) using ffmpeg...")
gif_output = os.path.join(SCREENSHOTS_DIR, "safeguard-demo.gif")

# Select key frames for the 15-second animated demonstration
selected_frames = [
    "01_realtime_event_dashboard.png",
    "02_ai_threat_assessment.png",
    "05_proactive_security_recommendations.png",
    "04_family_safety_monitor.png",
    "03_behavioral_pattern_analysis.png",
    "12_multicamera_unified_view.png",
    "11_night_mode_smart_lighting.png",
    "06_alexa_voice_integration.png",
    "10_emergency_response_panel.png",
    "07_weekly_security_report.png"
]

frame_inputs = []
for i, sf in enumerate(selected_frames):
    src = os.path.join(SCREENSHOTS_DIR, sf)
    dst = os.path.join(TEMP_DIR, f"frame_{i:03d}.png")
    if os.path.exists(src):
        # copy / link
        with open(src, "rb") as rf, open(dst, "wb") as wf:
            wf.write(rf.read())

ffmpeg_cmd = [
    "/opt/homebrew/bin/ffmpeg",
    "-y",
    "-framerate", "0.67",  # ~1.5s per slide -> 10 frames = 15 seconds
    "-i", os.path.join(TEMP_DIR, "frame_%03d.png"),
    "-vf", "scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse",
    "-loop", "0",
    gif_output
]
subprocess.run(ffmpeg_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

if os.path.exists(gif_output):
    gif_size = os.path.getsize(gif_output) // 1024
    print(f"✓ safeguard-demo.gif generated successfully! ({gif_size} KB)")
else:
    print("✗ Failed to generate GIF")
