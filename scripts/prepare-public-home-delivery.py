"""Read-only qualification of the fixed PR608 public home-entry delivery packet."""
import importlib.util
import sys
from pathlib import Path

source = Path(__file__).resolve().with_name("prepare-public-cloud-delivery.py")
spec = importlib.util.spec_from_file_location("afw_public_delivery", source)
qualifier = importlib.util.module_from_spec(spec)
spec.loader.exec_module(qualifier)

if __name__ == "__main__":
    try:
        qualifier.main("config/public-home-entry-delivery.v1.json")
    except Exception:
        # HTTP exceptions can contain headers or signed download URLs.
        print("Public home delivery qualification unavailable; no deployment performed.", file=sys.stderr)
        sys.exit(2)
