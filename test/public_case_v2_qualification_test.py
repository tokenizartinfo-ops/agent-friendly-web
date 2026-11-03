import hashlib
import importlib.util
import io
import unittest
import zipfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("e62_qualification", ROOT / "scripts/qualify-public-case-v2-artifact.py")
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class QualificationTests(unittest.TestCase):
    def metadata(self):
        artifact = {"id": MODULE.ARTIFACT, "name": "afw-build-" + MODULE.SOURCE,
                    "size_in_bytes": MODULE.SIZE, "digest": "sha256:" + MODULE.DIGEST,
                    "expired": False, "expires_at": MODULE.EXPIRY,
                    "workflow_run": {"id": MODULE.RUN, "head_sha": MODULE.SOURCE, "head_branch": "main"}}
        run = {"id": MODULE.RUN, "run_attempt": 1, "event": "push", "head_branch": "main",
               "head_sha": MODULE.SOURCE, "path": ".github/workflows/ci.yml", "status": "completed",
               "conclusion": "success", "repository": {"full_name": MODULE.REPO},
               "head_repository": {"full_name": MODULE.REPO}}
        return artifact, run

    def test_provenance_requires_the_exact_main_push(self):
        artifact, run = self.metadata()
        now = datetime(2026, 11, 3, tzinfo=timezone.utc)
        MODULE.check_provenance(artifact, run, now)
        for patch in [{"event": "pull_request"}, {"head_branch": "other"}, {"head_sha": "a" * 40},
                      {"run_attempt": 2}, {"conclusion": "failure"}, {"path": ".github/workflows/other.yml"}]:
            with self.subTest(patch=patch), self.assertRaises(ValueError):
                MODULE.check_provenance(artifact, {**run, **patch}, now)
        for patch in [{"digest": "sha256:" + "0" * 64}, {"expired": True}]:
            with self.subTest(patch=patch), self.assertRaises(ValueError):
                MODULE.check_provenance({**artifact, **patch}, run, now)
        with self.assertRaises(ValueError):
            MODULE.check_provenance(artifact, run, datetime(2026, 11, 11, tzinfo=timezone.utc))

    def archive(self, extra=None):
        output = io.BytesIO()
        markers = b"Cloudflare AI Index ordenar y verificar organize and verify organizar e verificar "
        markers += b"public-audit-2026-11-03.json 2026-08-26 2026-09-09 2026-11-03"
        with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as z:
            z.writestr("server/index.js", markers)
            z.writestr("client/" + MODULE.CASE_PATH, b'{"source":"case"}')
            if extra:
                z.writestr(extra, b"bad")
        return output.getvalue()

    def check_archive(self, archive, expected=b'{"source":"case"}'):
        old_size, old_digest = MODULE.SIZE, MODULE.DIGEST
        try:
            MODULE.SIZE = len(archive)
            MODULE.DIGEST = hashlib.sha256(archive).hexdigest()
            return MODULE.inventory_archive(archive, expected)
        finally:
            MODULE.SIZE, MODULE.DIGEST = old_size, old_digest

    def test_zip_checks_case_and_safe_paths(self):
        archive = self.archive()
        self.assertEqual(self.check_archive(archive)["files"], 2)
        with self.assertRaises(ValueError):
            self.check_archive(archive, b"wrong case")
        with self.assertRaises(ValueError):
            self.check_archive(self.archive("../escape"))


if __name__ == "__main__":
    unittest.main()
