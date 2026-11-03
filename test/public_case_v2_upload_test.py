"""Fixed e62 profile: main provenance and inactive-only scope."""
import importlib.util
import json
import unittest
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class PublicE62UploadTests(unittest.TestCase):
    def setUp(self):
        spec = importlib.util.spec_from_file_location("public_upload", ROOT / "scripts/public-case-v2-inactive-upload.py")
        adapter = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(adapter)
        self.upload = adapter.uploader
        self.profile = adapter.profile
        self.contract = json.loads((ROOT / "config/public-case-v2-delivery.v1.json").read_text())

    def test_fixed_packet_and_dry_run_cannot_select_other_sources(self):
        profile = self.upload.upload_packet("case_v2")
        self.assertEqual(profile["sourceRevision"], "df9896f09b5f8785b6abe42c954b555e227ef954")
        self.assertEqual(profile["workflow"], ".github/workflows/afw-public-case-v2-inactive-upload.yml")
        self.upload.check_packet_contract(self.contract, "case_v2")
        self.assertEqual(self.contract["baseline"]["versionId"], "ad126c2c-d049-4083-9f41-b9879ee3fdd9")
        self.assertEqual(self.contract["baseline"]["deploymentId"], "b74ea9d6-0bff-4d1f-b7b6-5b6283c0c819")
        command = self.upload.wrangler_command(Path("/runner/wrangler"), Path("/runner/config.json"),
                                                "df9896f0-r123-a1", True, "case_v2")
        self.assertIn("--dry-run", command)
        self.assertEqual(command[1:3], ["versions", "upload"])
        self.assertNotIn("deploy", command)
        with self.assertRaises(ValueError):
            self.upload.wrangler_command(Path("/runner/wrangler"), Path("/runner/config.json"),
                                         "cace1d9c-r123-a1", True, "case_v2")
        with self.assertRaises(ValueError):
            self.upload.check_packet_contract({**self.contract, "sourceRevision": "a" * 40}, "case_v2")
        with self.assertRaises(ValueError):
            self.upload.check_packet_contract({**self.contract, "baseline": {**self.contract["baseline"], "versionId": "another"}}, "case_v2")
        with self.assertRaises(ValueError):
            self.upload.check_packet_contract({**self.contract, "artifact": {**self.contract["artifact"], "sha256": "0" * 64}}, "case_v2")
        with self.assertRaises(ValueError):
            self.upload.check_packet_contract({**self.contract, "inactiveUpload": {**self.contract["inactiveUpload"], "trafficPromotion": True}}, "case_v2")
        with self.assertRaises(ValueError):
            self.upload.check_packet_contract({key: value for key, value in self.contract.items() if key != "inactiveUpload"}, "case_v2")

    def test_main_push_artifact_provenance_is_fixed(self):
        a = self.contract["artifact"]
        artifact = {"id": a["id"], "name": a["name"], "size_in_bytes": a["bytes"],
                    "digest": "sha256:" + a["sha256"], "expired": False, "expires_at": a["expiresAt"],
                    "workflow_run": {"id": a["runId"], "head_sha": self.contract["sourceRevision"], "head_branch": "main"}}
        run = {"id": a["runId"], "run_attempt": 1, "event": "push", "head_branch": "main",
               "head_sha": self.contract["sourceRevision"], "path": a["workflow"], "status": "completed",
               "conclusion": "success", "repository": {"full_name": self.upload.REPO},
               "head_repository": {"full_name": self.upload.REPO}}
        now = datetime(2026, 11, 3, tzinfo=timezone.utc)
        self.profile.check_profile_provenance(self.contract, artifact, run, now)
        for patch in [{"event": "pull_request"}, {"head_branch": "other"}, {"head_sha": "a" * 40},
                      {"run_attempt": 2}, {"conclusion": "failure"}, {"path": ".github/workflows/other.yml"}]:
            with self.subTest(patch=patch), self.assertRaises(ValueError):
                self.profile.check_profile_provenance(self.contract, artifact, {**run, **patch}, now)
        with self.assertRaises(ValueError):
            self.profile.check_profile_provenance(self.contract, artifact, run, datetime(2026, 11, 11, tzinfo=timezone.utc))

    def test_digest_matches_recursive_sorted_js_json_for_ascii_primary_fields(self):
        sample = {"z": [{"b": 2, "a": 1}, "ascii"], "a": {"nested": True, "empty": None}, "n": 0}
        self.assertEqual(self.upload.digest(sample), "4e842f383649becf012e10dae687c000493c6ad665ec884646c06bd5e47e5434")


if __name__ == "__main__":
    unittest.main()
