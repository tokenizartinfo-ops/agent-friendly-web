import copy
import importlib.util
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODULE = ROOT / "scripts/public-inactive-upload.py"

class PacketUploadTests(unittest.TestCase):
    def setUp(self):
        spec = importlib.util.spec_from_file_location("packet_upload", MODULE)
        self.m = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(self.m)
        self.assertTrue(callable(getattr(self.m, "upload_packet", None)), "Fixed upload packet selection is missing")
        self.assertTrue(callable(getattr(self.m, "check_packet_contract", None)), "Upload source fence is missing")

    def context(self, workflow):
        now = datetime(2026, 10, 24, 23, tzinfo=timezone.utc)
        env = {"GITHUB_ACTIONS": "true", "GITHUB_REPOSITORY": self.m.REPO,
               "GITHUB_EVENT_NAME": "workflow_dispatch", "GITHUB_REF": "refs/heads/main",
               "GITHUB_SHA": "a"*40, "GITHUB_RUN_ID": "40140000", "GITHUB_RUN_ATTEMPT": "1"}
        run = {"id": 40140000, "head_sha": "a"*40, "event": "workflow_dispatch",
               "path": workflow, "run_attempt": 1, "created_at": (now-timedelta(seconds=60)).isoformat(),
               "repository": {"full_name": self.m.REPO}, "head_repository": {"full_name": self.m.REPO}}
        return env, run, now

    def test_known_profiles_keep_the_legacy_default_and_exact_new_source(self):
        old = self.m.upload_packet("legacy")
        new = self.m.upload_packet("json_budget")
        self.assertEqual(old["sourceRevision"], "61909a5805549abb9534679d1735c3be8745071f")
        self.assertEqual(old["contractPath"], "config/public-cloud-delivery.v1.json")
        self.assertEqual(old["workflow"], ".github/workflows/afw-public-inactive-upload.yml")
        self.assertEqual(old["receiptPath"], "output/public-upload-receipt.json")
        self.assertEqual(new["sourceRevision"], "d3b638a46d1f9ab559142222e181e9aae2e0a83e")
        self.assertEqual(new["contractPath"], "config/public-json-budget-delivery.v1.json")
        self.assertEqual(new["workflow"], ".github/workflows/afw-public-json-inactive-upload.yml")
        self.assertEqual(new["receiptPath"], "output/public-json-upload-receipt.json")

    def test_unknown_profile_is_rejected(self):
        for packet in ["../other", "other", "", None]:
            with self.subTest(packet=packet), self.assertRaises(ValueError):
                self.m.upload_packet(packet)

    def test_dispatch_must_match_the_exact_packet_workflow(self):
        workflows = {"legacy": ".github/workflows/afw-public-inactive-upload.yml",
                     "json_budget": ".github/workflows/afw-public-json-inactive-upload.yml"}
        for packet, workflow in workflows.items():
            env, run, now = self.context(workflow)
            self.assertEqual(self.m.upload_context(env, run, "a"*40, now, packet=packet)["remainingSeconds"], 540)
            other = next(w for w in workflows.values() if w != workflow)
            wrong = copy.deepcopy(run)
            wrong["path"] = other
            with self.subTest(packet=packet), self.assertRaises(ValueError):
                self.m.upload_context(env, wrong, "a"*40, now, packet=packet)

    def test_upload_commands_cannot_borrow_another_packet_tag_or_promote(self):
        prefixes = {"legacy": "61909a58", "json_budget": "d3b638a4"}
        for packet, prefix in prefixes.items():
            tag = prefix+"-r40140000-a1"
            command = self.m.wrangler_command(Path("/runner/wrangler"), Path("/runner/config.json"), tag, False, packet=packet)
            self.assertEqual(command[1:3], ["versions", "upload"])
            self.assertNotIn("deploy", command)
            self.assertIn("--keep-vars", command)
            other = next(p for p in prefixes.values() if p != prefix)
            for wrong in [other+"-r40140000-a1", prefix+"-r40140000-a2", prefix+"-r0-a1"]:
                with self.subTest(packet=packet, tag=wrong), self.assertRaises(ValueError):
                    self.m.wrangler_command(Path("/runner/wrangler"), Path("/runner/config.json"), wrong, False, packet=packet)

    def test_contract_source_or_worker_cannot_cross_the_packet_boundary(self):
        target = {"accountId": self.m.ACCOUNT, "worker": self.m.WORKER, "origin": "https://agentfriendlyweb.dev",
                  "entrypoint": "server/index.js", "assets": "client"}
        for packet in ["legacy", "json_budget"]:
            profile = self.m.upload_packet(packet)
            contract = {"sourceRevision": profile["sourceRevision"], "target": copy.deepcopy(target)}
            self.m.check_packet_contract(contract, packet=packet)
            wrong = copy.deepcopy(contract)
            wrong["sourceRevision"] = self.m.upload_packet("json_budget" if packet == "legacy" else "legacy")["sourceRevision"]
            with self.subTest(packet=packet), self.assertRaises(ValueError):
                self.m.check_packet_contract(wrong, packet=packet)
            wrong = copy.deepcopy(contract)
            wrong["target"]["worker"] = "another-worker"
            with self.subTest(packet=packet), self.assertRaises(ValueError):
                self.m.check_packet_contract(wrong, packet=packet)

if __name__ == "__main__":
    unittest.main()
