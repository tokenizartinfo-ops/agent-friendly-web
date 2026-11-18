import hashlib
import io
import json
import os
from pathlib import Path
import subprocess
import sys
import unittest
import zipfile

SCRIPT = os.environ.get("AFW_TEST_ARCHIVE_SCRIPT") or str(
    Path(__file__).resolve().parents[1] / "scripts/verify-qa-finite-archive.py"
)
PURPOSE = "afw.finite-historical-input-receipt.v1"
ROLES = ("qaClosed", "canaryClosed", "operatorClosed")
MODULE_NAMES = {"qaClosed": "closed-rollback.mjs", "canaryClosed": "index.mjs", "operatorClosed": "index.mjs"}


def make_archive(change=None):
    members, inputs = {}, {}
    for i, role in enumerate(ROLES):
        name = MODULE_NAMES[role]
        module = f"export default function {role}() {{}}".encode()
        metadata = b'{"opaque":"synthetic-private-sentinel"}'
        inputs[role] = {
            "versionId": f"00000000-0000-4000-8000-{i:012d}",
            "moduleName": name,
            "moduleBytes": len(module),
            "moduleSha256": hashlib.sha256(module).hexdigest(),
            "configurationSha256": "1" * 64,
            "metadataSha256": hashlib.sha256(metadata).hexdigest(),
        }
        members[role + "/" + name] = module
        members[role + "/metadata.json"] = metadata
    receipt = {"purpose": PURPOSE, "preservedAtUTC": "2026-11-18T17:00:00Z", "inputs": inputs}
    if change == "module":
        members["canaryClosed/index.mjs"] += b"\n"
    if change == "metadata":
        members["operatorClosed/metadata.json"] += b"\n"
    if change == "extra":
        members["operatorClosed/extra.json"] = b"{}"
    if change == "unknown-receipt-field":
        inputs["qaClosed"]["unreviewed"] = "opaque"
    if change == "wrong-role":
        inputs["other"] = inputs.pop("operatorClosed")
    members["receipt.json"] = json.dumps(receipt, sort_keys=True, separators=(",", ":")).encode()
    output = io.BytesIO()
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for name, content in members.items():
            archive.writestr(name, content)
    return output.getvalue()


class HistoricalArchiveTests(unittest.TestCase):
    def inspect(self, change=None):
        return subprocess.run(
            [sys.executable, SCRIPT, "--historical-inputs"], input=make_archive(change),
            capture_output=True, check=False,
        )

    def test_returns_only_bounded_receipt_and_fingerprints(self):
        result = self.inspect()
        self.assertEqual(result.returncode, 0, result.stderr)
        parsed = json.loads(result.stdout)
        self.assertEqual(parsed["receipt"]["purpose"], PURPOSE)
        self.assertEqual(len(parsed["files"]), 6)
        self.assertNotIn(b"synthetic-private-sentinel", result.stdout)

    def test_module_and_configuration_metadata_require_exact_hashes(self):
        for change in ("module", "metadata"):
            with self.subTest(change=change):
                result = self.inspect(change)
                self.assertEqual(result.returncode, 1)
                self.assertEqual(result.stdout, b"")
                self.assertEqual(result.stderr.strip(), b"Finite archive unavailable")

    def test_archive_and_receipt_have_exact_shape(self):
        for change in ("extra", "unknown-receipt-field", "wrong-role"):
            with self.subTest(change=change):
                result = self.inspect(change)
                self.assertEqual(result.returncode, 1)
                self.assertEqual(result.stdout, b"")


if __name__ == "__main__":
    unittest.main()
