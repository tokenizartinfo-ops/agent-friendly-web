import copy
import importlib.util
import io
import json
import tempfile
import unittest
import zipfile
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODULE = ROOT / "scripts/public-inactive-upload.py"

class InactiveUploadTests(unittest.TestCase):
    def setUp(self):
        if not MODULE.is_file():
            self.fail("Inactive upload boundary is not implemented")
        spec = importlib.util.spec_from_file_location("inactive_upload", MODULE)
        self.m = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(self.m)

    def state(self):
        bindings = [{"name": name, "type": "plain_text", "text": value}
                    for name, value in [("ACCESS_AUD", "synthetic-aud"), ("ACCESS_TEAM_DOMAIN", "synthetic.example"),
                    ("AFW_CANARY_DIAGNOSTICS_ENABLED", "false"), ("AFW_REMOTE_DEPLOY_ENABLED", "false"),
                    ("AFW_COPILOT_ENABLED", "true"), ("AFW_COPILOT_PROJECT_ID", "synthetic-private-pin")]]
        bindings += [{"name": "AI", "type": "ai"}, {"name": "ASSETS", "type": "assets"},
                     {"name": "COPILOT_RATE_LIMIT", "type": "ratelimit", "namespace_id": "26092803",
                      "simple": {"limit": 5, "period": 60}},
                     {"name": "DB", "type": "d1", "id": self.m.DB, "database_id": self.m.DB}]
        settings = {"bindings": copy.deepcopy(bindings), **self.m.SETTINGS}
        runtime = {"compatibility_date": "2026-09-01", "compatibility_flags": self.m.FLAGS, "usage_model": "standard"}
        version = {"id": "8fc686dd-bcf4-4445-a8d9-fdb8fc3224ff",
                   "resources": {"bindings": bindings, "script_runtime": runtime}}
        deployment = {"id": "4a7a9452-e843-408a-bd69-3d3990cc51ed",
                      "versions": [{"version_id": version["id"], "percentage": 100}]}
        state = {"version": version, "settings": settings, "deployment": deployment,
                 "subdomain": {"enabled": False, "previews_enabled": False}}
        expected = {"versionId": version["id"], "deploymentId": deployment["id"],
                    "bindingsSha256": self.m.bindings_hash(bindings),
                    "settingsSha256": self.m.settings_hash(settings),
                    "runtimeSha256": self.m.digest(runtime)}
        return state, expected

    def test_fresh_state_and_private_pin_are_preserved_without_serializing_it(self):
        state, expected = self.state()
        self.m.check_state(state, expected)
        config = self.m.upload_config(state)
        self.assertTrue(config["keep_vars"])
        self.assertNotIn("vars", config)
        self.assertNotIn("synthetic-private-pin", json.dumps(config))
        self.assertEqual(config["name"], self.m.WORKER)
        self.assertEqual(config["d1_databases"][0]["database_id"], self.m.DB)
        self.assertEqual(config["ratelimits"][0]["simple"], {"limit": 5, "period": 60})

    def test_binding_settings_runtime_or_deployment_drift_rejected(self):
        for field in ["pin", "global", "runtime", "settings", "deployment", "traffic", "preview"]:
            state, expected = self.state()
            if field == "pin": state["version"]["resources"]["bindings"][5]["text"] = "foreign"
            if field == "global": state["settings"]["bindings"].pop()
            if field == "runtime": state["version"]["resources"]["script_runtime"]["usage_model"] = "unbound"
            if field == "settings": state["settings"]["logpush"] = True
            if field == "deployment": state["deployment"]["id"] = "foreign"
            if field == "traffic": state["deployment"]["versions"][0]["percentage"] = 50
            if field == "preview": state["subdomain"]["previews_enabled"] = True
            with self.subTest(field=field), self.assertRaises(ValueError):
                self.m.check_state(state, expected)

    def test_new_or_secret_binding_fails_closed_even_if_hash_updated(self):
        state, expected = self.state()
        for binding in [{"name": "SECRET", "type": "secret_text"}, {"name": "OTHER", "type": "service", "service": "other"}]:
            changed = copy.deepcopy(state)
            changed["version"]["resources"]["bindings"].append(binding)
            changed["settings"]["bindings"].append(binding)
            expected["bindingsSha256"] = self.m.bindings_hash(changed["settings"]["bindings"])
            with self.subTest(binding=binding["name"]), self.assertRaises(ValueError):
                self.m.check_state(changed, expected)

    def context(self):
        now = datetime(2026, 10, 21, 23, tzinfo=timezone.utc)
        env = {"GITHUB_ACTIONS": "true", "GITHUB_REPOSITORY": self.m.REPO,
               "GITHUB_EVENT_NAME": "workflow_dispatch", "GITHUB_REF": "refs/heads/main",
               "GITHUB_SHA": "a"*40, "GITHUB_RUN_ID": "39600000", "GITHUB_RUN_ATTEMPT": "1"}
        run = {"id": 39600000, "head_sha": "a"*40, "event": "workflow_dispatch",
               "path": ".github/workflows/afw-public-inactive-upload.yml", "run_attempt": 1,
               "created_at": (now-timedelta(seconds=60)).isoformat(),
               "repository": {"full_name": self.m.REPO}, "head_repository": {"full_name": self.m.REPO}}
        return env, run, now

    def test_original_dispatch_window_main_and_first_attempt_required(self):
        env, run, now = self.context()
        self.assertEqual(self.m.upload_context(env, run, "a"*40, now)["remainingSeconds"], 540)
        for field in ["branch", "event", "attempt", "sha", "expired", "future", "repo", "workflow"]:
            e, r = copy.deepcopy(env), copy.deepcopy(run)
            if field == "branch": e["GITHUB_REF"] = "refs/heads/feature"
            if field == "event": e["GITHUB_EVENT_NAME"] = "pull_request"
            if field == "attempt": e["GITHUB_RUN_ATTEMPT"] = "2"
            if field == "sha": r["head_sha"] = "b"*40
            if field == "expired": r["created_at"] = (now-timedelta(seconds=600)).isoformat()
            if field == "future": r["created_at"] = (now+timedelta(seconds=1)).isoformat()
            if field == "repo": r["head_repository"]["full_name"] = "foreign/repo"
            if field == "workflow": r["path"] = ".github/workflows/other.yml"
            with self.subTest(field=field), self.assertRaises(ValueError):
                self.m.upload_context(e, r, "a"*40, now)

    def test_missing_credential_stops_before_any_network_or_subprocess(self):
        called = []
        with self.assertRaises(ValueError):
            self.m.upload_once("", lambda: called.append("read"), lambda: called.append("upload"), lambda _: called.append("post"))
        self.assertEqual(called, [])

    def test_unknown_upload_ack_is_not_retried(self):
        calls = []
        def upload():
            calls.append("upload")
            raise TimeoutError("synthetic")
        with self.assertRaises(TimeoutError):
            self.m.upload_once("synthetic", lambda: calls.append("read"), upload, lambda _: calls.append("post"))
        self.assertEqual(calls, ["read", "upload"])

    def test_exactly_one_inactive_upload_and_readback(self):
        calls = []
        result = self.m.upload_once("synthetic", lambda: calls.append("read"),
             lambda: calls.append("upload") or "12345678-1234-4234-8234-123456789abc",
             lambda v: calls.append(("post", v)) or {"inactive": True})
        self.assertEqual(result, {"inactive": True})
        self.assertEqual(calls, ["read", "upload", ("post", "12345678-1234-4234-8234-123456789abc")])

    def test_command_never_promotes_and_uses_exact_frozen_config(self):
        cmd = self.m.wrangler_command(Path("/runner/wrangler"), Path("/runner/config.json"), "8057ee37-r39600000-a1", False)
        self.assertEqual(cmd[1:3], ["versions", "upload"])
        self.assertNotIn("deploy", cmd)
        self.assertNotIn("--force", cmd)
        self.assertIn("--keep-vars", cmd)
        self.assertEqual(cmd[cmd.index("--config")+1], "/runner/config.json")

    def test_extract_rejects_ancestor_file_collision_before_writing(self):
        with tempfile.TemporaryDirectory() as temp:
            with self.assertRaises(ValueError):
                self.m.check_path_tree(["client/branch", "client/branch/file", "server/index.js"])
            self.assertEqual(list(Path(temp).iterdir()), [])

    def test_extract_preserves_hidden_files_and_hashes(self):
        entries = [("client/.assetsignore", b"hidden"), ("server/index.js", b"export default {}")]
        archive = io.BytesIO()
        with zipfile.ZipFile(archive, "w") as z:
            for name, content in entries: z.writestr(name, content)
        raw = archive.getvalue()
        inv = {"files": 2, "uncompressedBytes": sum(len(v) for _,v in entries),
               "inventory": [{"path": n, "bytes": len(v), "sha256": self.m.hash_bytes(v)} for n,v in entries]}
        with tempfile.TemporaryDirectory() as temp:
            dest = Path(temp) / "fresh"
            self.m.extract_qualified(raw, inv, self.m.hash_bytes(raw), dest)
            self.assertEqual((dest/"client/.assetsignore").read_bytes(), b"hidden")
            with self.assertRaises(ValueError): self.m.extract_qualified(raw, inv, self.m.hash_bytes(raw), dest)

if __name__ == "__main__":
    unittest.main()
