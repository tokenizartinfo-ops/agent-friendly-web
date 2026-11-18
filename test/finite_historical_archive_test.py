import hashlib
import io
import json
import os
from pathlib import Path
import subprocess
import struct
import sys
import tempfile
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


class PinnedHistoricalArchiveTests(unittest.TestCase):
    def run_pinned(self, raw, locator, flag="--pinned-r2-historical-inputs"):
        with tempfile.TemporaryDirectory() as folder:
            work = Path(folder)
            script = work / "verify.py"
            script.write_bytes(Path(SCRIPT).read_bytes())
            (work / "mcp-finite-r2-historical-inputs.json").write_text(json.dumps(locator), encoding="utf-8")
            return subprocess.run([sys.executable, str(script), flag], input=raw, capture_output=True, check=False)

    def reference(self, raw):
        with zipfile.ZipFile(io.BytesIO(raw)) as archive:
            receipt_bytes = archive.read("receipt.json")
        receipt = json.loads(receipt_bytes)
        digest = hashlib.sha256(raw).hexdigest()
        return {
            "purpose": "afw.finite-r2-historical-inputs.v1",
            "bucket": "afw-release-backups",
            "objectKey": "historical-v1/sha256-" + digest + ".zip",
            "archiveSha256": digest,
            "archiveBytes": len(raw),
            "receiptSha256": hashlib.sha256(receipt_bytes).hexdigest(),
            "providerSourcePin": "26213123304eea25e652a52d808d25b7e0e3475e",
            "preservedAtUTC": receipt["preservedAtUTC"],
            "inputs": receipt["inputs"],
        }

    def test_only_the_pinned_r2_archive_can_enter(self):
        raw = make_archive()
        locator = self.reference(raw)
        out = self.run_pinned(raw, locator)
        self.assertEqual(out.returncode, 0, out.stderr)
        result = json.loads(out.stdout)
        self.assertEqual(result["archiveSha256"], locator["archiveSha256"])
        self.assertNotIn(b"synthetic-private-sentinel", out.stdout)
        for key, value in (
            ("bucket", "another-bucket"),
            ("archiveSha256", "0" * 64),
            ("receiptSha256", "1" * 64),
        ):
            with self.subTest(key=key):
                rejected = self.run_pinned(raw, {**locator, key: value})
                self.assertEqual(rejected.returncode, 1)
                self.assertEqual(rejected.stdout, b"")

    def test_draft_assembles_both_compiled_and_all_closed_roles(self):
        historical = make_archive()
        locator = self.reference(historical)
        roles = ("canaryLive", "qaLive")
        files = {role: f"export default function {role}() {{}}".encode() for role in roles}
        manifest = {
            "purpose": "afw.finite-native-compiler-staging.v1",
            "sourceRevision": "a" * 40,
            "sourceTree": "b" * 40,
            "completePackage": False,
            "operationalReadiness": False,
            "historicalInput": {
                **{k: locator[k] for k in ("purpose", "archiveSha256", "archiveBytes", "receiptSha256", "providerSourcePin")},
                "archiveReadByCompiler": False,
            },
            "modules": {role: {"name": "index.mjs", "bytes": len(files[role]),
                              "sha256": hashlib.sha256(files[role]).hexdigest(), "exports": ["default"]}
                        for role in roles},
        }
        expected = json.dumps(manifest).encode()
        for altered in (False, True):
            with self.subTest(altered=altered):
                stream = io.BytesIO()
                with zipfile.ZipFile(stream, "w", compression=zipfile.ZIP_DEFLATED) as stage:
                    stage.writestr("staging.json", expected)
                    for role in roles:
                        body = files[role] + (b"\n" if altered and role == "qaLive" else b"")
                        stage.writestr(role + "/index.mjs", body)
                staged = stream.getvalue()
                framed = struct.pack("<III", len(historical), len(staged), len(expected)) + historical + staged + expected
                outcome = self.run_pinned(framed, locator, "--assemble-private-draft")
                if altered:
                    self.assertEqual(outcome.returncode, 1)
                    self.assertEqual(outcome.stdout, b"")
                else:
                    self.assertEqual(outcome.returncode, 0, outcome.stderr)
                    evidence = json.loads(outcome.stdout)
                    self.assertEqual(evidence["moduleCount"], 5)
                    self.assertIs(evidence["completePackage"], False)
                    self.assertIs(evidence["operationalReadiness"], False)
                    self.assertNotIn(b"synthetic-private-sentinel", outcome.stdout)


if __name__ == "__main__":
    unittest.main()
