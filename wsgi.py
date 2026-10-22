"""WSGI Entry Point for SafeGuard Web & API Service.
Compatible with Gunicorn, uWSGI, Render, AWS App Runner, and standard Python.
"""

import os
import sys

# Ensure project root and lambda directory are in Python module search path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LAMBDA_DIR = os.path.join(BASE_DIR, "lambda")

for path in [LAMBDA_DIR, BASE_DIR]:
    if path not in sys.path:
        sys.path.insert(0, path)

# Import the pre-configured Flask application
from api.dashboard_api import app  # noqa: E402

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    print(f"🚀 SafeGuard Web & API Server starting on http://0.0.0.0:{port}")
    app.run(host="0.0.0.0", port=port, debug=False)
