"""Pytest setup to enable clean imports from event_processor, api, models, and services."""

import os
import sys

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
lambda_dir = os.path.join(root_dir, "lambda")

if root_dir not in sys.path:
    sys.path.insert(0, root_dir)
if lambda_dir not in sys.path:
    sys.path.insert(0, lambda_dir)
