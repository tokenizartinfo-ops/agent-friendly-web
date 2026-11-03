"""Qualify the fixed e62 main build using the existing delivery reader."""
import importlib.util
import sys
from pathlib import Path

source = Path(__file__).resolve().with_name("qualify-public-case-v2-artifact.py")
spec = importlib.util.spec_from_file_location("afw_e62_profile", source)
profile = importlib.util.module_from_spec(spec)
spec.loader.exec_module(profile)
qualifier = profile.BASE
qualifier.PACKET_INVENTORIES["config/public-case-v2-delivery.v1.json"] = "docs/evidence/2026-11-03-public-case-v2/qualified-inventory.json"
qualifier.check_provenance = profile.check_profile_provenance

if __name__ == "__main__":
    try:
        qualifier.main("config/public-case-v2-delivery.v1.json")
    except Exception:
        print("Public e62 delivery qualification unavailable; no deployment performed.", file=sys.stderr)
        sys.exit(2)
