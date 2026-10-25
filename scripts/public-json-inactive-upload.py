"""Upload only the fixed PR584 public JSON-budget packet as an inactive version."""
import importlib.util
import sys
from pathlib import Path

source = Path(__file__).resolve().with_name("public-inactive-upload.py")
spec = importlib.util.spec_from_file_location("afw_public_upload", source)
uploader = importlib.util.module_from_spec(spec)
spec.loader.exec_module(uploader)

if __name__ == "__main__":
    try:
        uploader.main("json_budget")
    except SystemExit:
        raise
    except Exception:
        print("Public JSON inactive upload unavailable; no promotion attempted.", file=sys.stderr)
        sys.exit(2)
