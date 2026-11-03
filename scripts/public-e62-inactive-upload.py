"""Use the existing inactive uploader with the fixed e62 profile."""
import importlib.util
import sys
from pathlib import Path

root = Path(__file__).resolve().parent
source = root / "public-inactive-upload.py"
spec = importlib.util.spec_from_file_location("afw_public_upload", source)
uploader = importlib.util.module_from_spec(spec)
spec.loader.exec_module(uploader)
profile_spec = importlib.util.spec_from_file_location("afw_e62_profile", root / "qualify-public-e62-artifact.py")
profile = importlib.util.module_from_spec(profile_spec)
profile_spec.loader.exec_module(profile)


def packet(name):
    uploader.require(name == "e62_case", "upload_packet")
    return {"sourceRevision": profile.SOURCE, "contractPath": "config/public-e62-delivery.v1.json",
            "workflow": ".github/workflows/afw-public-e62-inactive-upload.yml",
            "receiptPath": "output/public-e62-upload-receipt.json"}


def check_contract(contract, name):
    uploader.require(name == "e62_case", "upload_packet")
    profile.check_profile_contract(contract)


uploader.upload_packet = packet
uploader.check_packet_contract = check_contract

if __name__ == "__main__":
    try:
        uploader.main("e62_case")
    except SystemExit:
        raise
    except Exception:
        print("Public e62 inactive upload unavailable; no promotion attempted.", file=sys.stderr)
        sys.exit(2)
