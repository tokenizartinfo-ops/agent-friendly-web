"""Fixed e62 profile: main provenance and inactive-only scope."""
import importlib.util
import json
import unittest
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class PublicE62UploadTests(unittest.TestCase):
    def setUp(self):
        spec = importlib.util.spec_from_file_location("public_upload", ROOT / "scripts/public-e62-inactive-upload.py")
        adapter = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(adapter)
        self.upload = adapter.uploader
        self.profile = adapter.profile
        self.contract = json.loads((ROOT / "config/public-e62-delivery.v1.json").read_text())

    def test_fixed_packet_and_dry_run_cannot_select_other_sources(self):
        profile = self.upload.upload_packet("e62_case")
        self.assertEqual(profile["sourceRevision"], "e62cd321f38e07926659c52a59a220a4e0ea865e")
        self.assertEqual(profile["workflow"], ".github/workflows/afw-public-e62-inactive-upload.yml")
        self.upload.check_packet_contract(self.contract, "e62_case")
        self.assertEqual(self.contract["baseline"]["versionId"], "0fd30778-70ce-406f-8757-69bb29a21c09")
        self.assertEqual(self.contract["baseline"]["deploymentId"], "37fe1838-b871-4b98-818c-990d61667dbb")
        command = self.upload.wrangler_command(Path("/runner/wrangler"), Path("/runner/config.json"),
                                                "e62cd321-r123-a1", True, "e62_case")
        self.assertIn("--dry-run", command)
        self.assertEqual(command[1:3], ["versions", "upload"])
        self.assertNotIn("deploy", command)
        with self.assertRaises(ValueError):
            self.upload.wrangler_command(Path("/runner/wrangler"), Path("/runner/config.json"),
                                         "cace1d9c-r123-a1", True, "e62_case")
        with self.assertRaises(ValueError):
            self.upload.check_packet_contract({**self.contract, "sourceRevision": "a" * 40}, "e62_case")
        with self.assertRaises(ValueError):
            self.upload.check_packet_contract({**self.contract, "baseline": {**self.contract["baseline"], "versionId": "another"}}, "e62_case")
        with self.assertRaises(ValueError):
            self.upload.check_packet_contract({**self.contract, "artifact": {**self.contract["artifact"], "sha256": "0" * 64}}, "e62_case")
        with self.assertRaises(ValueError):
            self.upload.check_packet_contract({**self.contract, "inactiveUpload": {**self.contract["inactiveUpload"], "trafficPromotion": True}}, "e62_case")
        with self.assertRaises(ValueError):
            self.upload.check_packet_contract({key: value for key, value in self.contract.items() if key != "inactiveUpload"}, "e62_case")

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
