"""Synthetic ZIP fixtures and black-box tests of the actual bounded parser."""
import hashlib
import io
import json
from pathlib import Path
import stat
import struct
import subprocess
import sys
import unittest
import warnings
import zipfile

SCRIPT = Path(__file__).resolve().parents[1] / "scripts/verify-qa-finite-archive.py"
ROLES = ("qaLive", "qaClosed", "canaryLive", "canaryClosed", "operatorClosed")
MODULE = b"throw new Error('ARCHIVE_MUST_NEVER_EXECUTE');\n"


def make_archive(manifest, mutation=None):
    text = json.dumps(manifest, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    if mutation == "duplicate-json":
        text = text[:-1] + ',"purpose":"afw.finite-native-package.v1"}'
    if mutation == "noncanonical":
        text += "\n"
    if mutation == "bad-json":
        text = "{"
    if mutation == "manifest-overflow":
        text = " " * 24577
    stream = io.BytesIO()
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", UserWarning)
        with zipfile.ZipFile(stream, "w", compression=zipfile.ZIP_DEFLATED) as z:
            z.writestr("manifest.json", text)
            for role in ROLES:
                name = role + "/index.mjs"
                if role == "qaLive" and mutation in ("traversal", "absolute", "backslash"):
                    name = {"traversal": "../qaLive/index.mjs", "absolute": "/qaLive/index.mjs",
                            "backslash": "qaLive\\index.mjs"}[mutation]
                info = zipfile.ZipInfo(name)
                info.compress_type = zipfile.ZIP_DEFLATED
                info.external_attr = (stat.S_IFREG | 0o600) << 16
                if role == "qaLive" and mutation == "symlink":
                    info.external_attr = (stat.S_IFLNK | 0o777) << 16
                if role == "qaLive" and mutation == "fifo":
                    info.external_attr = (stat.S_IFIFO | 0o600) << 16
                data = MODULE
                if role == "qaLive" and mutation == "module-altered":
                    data += b"x"
                if role == "qaLive" and mutation == "bomb":
                    data = b"x" * 3145729
                z.writestr(info, data)
            if mutation == "extra":
                z.writestr("extra.txt", "hidden")
            if mutation == "directory":
                z.writestr("qaLive/", "")
            if mutation == "duplicate":
                z.writestr("qaLive/index.mjs", MODULE)
            if mutation == "entry-overflow":
                for n in range(65):
                    z.writestr(str(n), "")
    data = bytearray(stream.getvalue())
    with zipfile.ZipFile(io.BytesIO(data)) as z:
        info = z.getinfo("qaLive/index.mjs") if mutation not in ("traversal", "absolute", "backslash") else None
    central = data.find(b"PK\x01\x02", data.find(b"PK\x01\x02") + 4)
    if mutation in ("crc", "declared-short", "declared-long", "encrypted", "unsupported", "nul"):
        offset = info.header_offset
        if mutation == "crc":
            struct.pack_into("<I", data, offset + 14, 1)
            struct.pack_into("<I", data, central + 16, 1)
        if mutation in ("declared-short", "declared-long"):
            size = 1 if mutation == "declared-short" else 3145729
            struct.pack_into("<I", data, offset + 22, size)
            struct.pack_into("<I", data, central + 24, size)
        if mutation == "encrypted":
            struct.pack_into("<H", data, offset + 6, 1)
            struct.pack_into("<H", data, central + 8, 1)
        if mutation == "unsupported":
            struct.pack_into("<H", data, offset + 8, 12)
            struct.pack_into("<H", data, central + 10, 12)
        if mutation == "nul":
            data[offset + 30 + 2] = 0
            data[central + 46 + 2] = 0
    return bytes(data)


class ArchiveTests(unittest.TestCase):
    def invoke(self, data):
        return subprocess.run([sys.executable, str(SCRIPT)], input=data, capture_output=True, timeout=8)

    def test_valid_archive_is_inspected_not_executed(self):
        r = self.invoke(make_archive({"purpose": "fixture"}))
        self.assertEqual(r.returncode, 0, r.stderr)
        result = json.loads(r.stdout)
        self.assertEqual(result["manifest"], {"purpose": "fixture"})
        self.assertEqual(len(result["files"]), 5)
        for role in ROLES:
            self.assertEqual(result["files"][role + "/index.mjs"],
                             {"sha256": hashlib.sha256(MODULE).hexdigest(), "bytes": len(MODULE)})
        self.assertNotIn(b"ARCHIVE_MUST_NEVER_EXECUTE", r.stdout)
        self.assertEqual(r.stderr, b"")

    def test_exact_manifest_boundary(self):
        text = json.dumps({"x": "a" * 24568}, separators=(",", ":"))
        self.assertEqual(len(text), 24576)
        self.assertEqual(self.invoke(make_archive(json.loads(text))).returncode, 0)

    def test_archive_overflow(self):
        self.assert_rejected(b"x" * (64 * 1024 * 1024 + 1))

    def assert_rejected(self, data):
        r = self.invoke(data)
        self.assertNotEqual(r.returncode, 0)
        self.assertEqual(r.stdout, b"")
        self.assertEqual(r.stderr, b"Finite archive unavailable\n")


def rejection_test(mutation):
    def run(self):
        self.assert_rejected(make_archive({"purpose": "fixture"}, mutation))
    return run


for case in ("traversal", "absolute", "backslash", "symlink", "fifo", "extra", "directory",
             "duplicate", "entry-overflow", "crc", "declared-short", "declared-long",
             "encrypted", "unsupported", "nul", "bomb", "duplicate-json", "noncanonical",
             "bad-json", "manifest-overflow"):
    setattr(ArchiveTests, "test_reject_" + case.replace("-", "_"), rejection_test(case))

if __name__ == "__main__":
    if sys.argv[1:] == ["--fixture"]:
        request = json.load(sys.stdin)
        sys.stdout.buffer.write(make_archive(request["manifest"], request.get("mutation")))
    else:
        unittest.main()
