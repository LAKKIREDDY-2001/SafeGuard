"""Pytest configuration and module path configuration."""

import os
import sys

# Add project root and lambda directory to sys.path
root_dir = os.path.abspath(os.path.dirname(__file__))
lambda_dir = os.path.join(root_dir, "lambda")

if root_dir not in sys.path:
    sys.path.insert(0, root_dir)
if lambda_dir not in sys.path:
    sys.path.insert(0, lambda_dir)
