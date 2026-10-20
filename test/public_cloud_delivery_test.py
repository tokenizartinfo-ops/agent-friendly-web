import copy
import hashlib
import importlib.util
import io
import json
import stat
import unittest
import zipfile
from datetime import datetime, timezone
from pathlib import Path

MODULE = Path(__file__).resolve().parents[1] / "scripts" / "prepare-public-cloud-delivery.py"

class PublicCloudDeliveryTests(unittest.TestCase):
    def setUp(self):
        if not MODULE.is_file():
            self.fail("Public artifact qualification is not implemented")
        spec = importlib.util.spec_from_file_location("public_delivery", MODULE)
        self.m = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(self.m)
        self.entries = [("client/.assetsignore", b"**/.*\n"), ("client/index.html", b"<h1>AFW</h1>"),
                        ("server/index.js", b"export default {fetch(){return new Response('AFW')}}")]
        self.inventory = {"sourceRevision": "a" * 40, "files": 3,
                          "uncompressedBytes": sum(len(b) for _, b in self.entries),
                          "inventory": [{"path": p, "bytes": len(b), "sha256": hashlib.sha256(b).hexdigest()} for p, b in self.entries]}

    def archive(self, entries=None, compression=zipfile.ZIP_DEFLATED):
        output = io.BytesIO()
        with zipfile.ZipFile(output, "w", compression=compression) as z:
            for p, b in self.entries if entries is None else entries:
                z.writestr(p, b)
        return output.getvalue()

    def qualify(self, data=None, inventory=None, digest=None):
        data = self.archive() if data is None else data
        return self.m.qualify_archive(data, self.inventory if inventory is None else inventory,
                                      hashlib.sha256(data).hexdigest() if digest is None else digest)

    def test_exact_zip_and_hidden_files_qualify_without_extraction(self):
        result = self.qualify()
        self.assertEqual(result["files"], 3)
        self.assertEqual(result["uncompressedBytes"], self.inventory["uncompressedBytes"])
        self.assertEqual(result["zipSha256"], hashlib.sha256(self.archive()).hexdigest())

    def test_zip_digest_mismatch_fails(self):
        with self.assertRaisesRegex(ValueError, "digest"):
            self.qualify(digest="0" * 64)

    def test_same_sized_changed_file_fails(self):
        entries = copy.deepcopy(self.entries)
        entries[1] = (entries[1][0], b"<h1>BAD</h1>")
        with self.assertRaisesRegex(ValueError, "content"):
            self.qualify(self.archive(entries))

    def test_missing_or_extra_file_fails(self):
        for entries in [self.entries[:-1], self.entries + [("client/extra", b"extra")]]:
            with self.subTest(entries=len(entries)), self.assertRaises(ValueError):
                self.qualify(self.archive(entries))

    def test_duplicate_and_case_collision_fail(self):
        for name in ["client/index.html", "client/INDEX.html"]:
            with self.subTest(name=name), self.assertRaises(ValueError):
                self.qualify(self.archive(self.entries + [(name, b"duplicate")]))

    def test_unsafe_names_fail_before_read(self):
        for name in ["../escape", "/absolute", "C:/drive", "client/../escape", "client//empty", "client/./dot",
                     "client\\escape", "client/nul\x00suffix", "other/index.js"]:
            with self.subTest(name=name), self.assertRaises(ValueError):
                self.qualify(self.archive(self.entries + [(name, b"bad")]))

    def test_symlink_and_special_file_fail(self):
        for mode in [stat.S_IFLNK, stat.S_IFIFO]:
            z = io.BytesIO()
            with zipfile.ZipFile(z, "w") as archive:
                for p, b in self.entries:
                    item = zipfile.ZipInfo(p)
                    item.create_system = 3
                    item.external_attr = (mode | 0o644) << 16
                    archive.writestr(item, b)
            with self.subTest(mode=mode), self.assertRaises(ValueError):
                self.qualify(z.getvalue())

    def test_unsupported_compression_fails(self):
        with self.assertRaises(ValueError):
            self.qualify(self.archive(compression=zipfile.ZIP_BZIP2))

    def test_inventory_size_path_hash_and_entrypoint_fail_closed(self):
        for change in ["size", "path", "hash", "entrypoint", "collision"]:
            inv = copy.deepcopy(self.inventory)
            if change == "size": inv["uncompressedBytes"] += 1
            if change == "path": inv["inventory"][0]["path"] = "../escape"
            if change == "hash": inv["inventory"][0]["sha256"] = "bad"
            if change == "entrypoint": inv["inventory"] = inv["inventory"][:-1]; inv["files"] = 2
            if change == "collision": inv["inventory"][0]["path"] = "client/INDEX.html"
            with self.subTest(change=change), self.assertRaises(ValueError):
                self.qualify(inventory=inv)

    def test_resource_limits_fail(self):
        inv = copy.deepcopy(self.inventory)
        inv["inventory"][0]["bytes"] = 16777217
        inv["uncompressedBytes"] = sum(v["bytes"] for v in inv["inventory"])
        with self.assertRaises(ValueError): self.qualify(inventory=inv)
        with self.assertRaises(ValueError): self.qualify(b"x" * 16777217)

    def test_corrupt_crc_fails_sanitized(self):
        data = bytearray(self.archive(compression=zipfile.ZIP_STORED))
        start = data.index(b"<h1>")
        data[start] ^= 1
        with self.assertRaisesRegex(ValueError, "archive"):
            self.qualify(bytes(data))

    def contract_and_metadata(self):
        now = datetime(2026, 10, 20, tzinfo=timezone.utc)
        contract = {"repository": "tokenizartinfo-ops/agent-friendly-web", "sourceRevision": "a" * 40,
                    "artifact": {"id": 12, "name": "qualified", "runId": 20, "runAttempt": 1, "bytes": 100,
                                 "sha256": "b" * 64, "expiresAt": "2026-10-27T20:06:08Z",
                                 "workflow": ".github/workflows/qa.yml"}}
        metadata = {"id": 12, "name": "qualified", "size_in_bytes": 100, "expired": False,
                    "expires_at": "2026-10-27T20:06:08Z", "digest": "sha256:" + "b" * 64,
                    "workflow_run": {"id": 20, "head_sha": "a" * 40}}
        run = {"id": 20, "run_attempt": 1, "head_sha": "a" * 40, "event": "pull_request", "status": "completed",
               "conclusion": "success", "path": ".github/workflows/qa.yml",
               "repository": {"full_name": contract["repository"]},
               "head_repository": {"full_name": contract["repository"]}}
        return contract, metadata, run, now

    def test_exact_successful_same_repo_run_qualifies(self):
        c, a, r, now = self.contract_and_metadata()
        self.m.check_provenance(c, a, r, now)

    def test_expiry_digest_foreign_and_failed_runs_fail(self):
        for field in ["expired", "expires_at", "digest", "id", "name", "size_in_bytes", "head_sha", "run",
                      "failed", "attempt", "workflow", "fork"]:
            c, a, r, now = self.contract_and_metadata()
            if field == "expired": a["expired"] = True
            elif field == "expires_at": a["expires_at"] = "2026-10-19T00:00:00Z"
            elif field == "digest": a["digest"] = "sha256:" + "c" * 64
            elif field == "id": a["id"] += 1
            elif field == "name": a["name"] = "rebuilt"
            elif field == "size_in_bytes": a["size_in_bytes"] += 1
            elif field == "head_sha": a["workflow_run"]["head_sha"] = "c" * 40
            elif field == "run": a["workflow_run"]["id"] += 1
            elif field == "failed": r["conclusion"] = "failure"
            elif field == "attempt": r["run_attempt"] = 2
            elif field == "workflow": r["path"] = ".github/workflows/other.yml"
            elif field == "fork": r["head_repository"]["full_name"] = "foreign/repo"
            with self.subTest(field=field), self.assertRaises(ValueError):
                self.m.check_provenance(c, a, r, now)

    def test_download_redirect_allowlist_and_credential_boundary(self):
        for url, allowed in [("https://api.github.com/repos/a/b", True),
                             ("https://productionresultssa1.blob.core.windows.net/results/file?sig=test", True),
                             ("https://results-receiver.actions.githubusercontent.com/file", True),
                             ("http://api.github.com/file", False), ("https://api.github.com.evil.invalid/file", False),
                             ("https://user:secret@api.github.com/file", False), ("https://api.github.com:444/file", False),
                             ("https://127.0.0.1/file", False), ("https://agentfriendlyweb.dev/file", False)]:
            with self.subTest(url=url):
                self.assertEqual(self.m.allowed_download_url(url), allowed)

if __name__ == "__main__":
    unittest.main()
