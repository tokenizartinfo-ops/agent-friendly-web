"""Read-only qualification of the fixed e62 public packet."""
import importlib.util
import sys
from pathlib import Path

source = Path(__file__).resolve().with_name("prepare-public-cloud-delivery.py")
spec = importlib.util.spec_from_file_location("afw_public_delivery", source)
qualifier = importlib.util.module_from_spec(spec)
spec.loader.exec_module(qualifier)

if __name__ == "__main__":
    try:
        qualifier.main("config/public-e62-delivery.v1.json")
    except Exception:
        print("Public e62 delivery qualification unavailable; no deployment performed.", file=sys.stderr)
        sys.exit(2)
