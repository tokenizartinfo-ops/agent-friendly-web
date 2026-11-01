"""Inspect a finite package from stdin; never extract, import or execute it.

This is a transport parser, not the manifest schema authority. The Node caller
uses the existing strict manifest codec on this bounded result.
"""
import hashlib
import io
import json
import stat
import struct
import sys
import zipfile
import zlib

ARCHIVE_LIMIT = 64 * 1024 * 1024
EXPANDED_LIMIT = 128 * 1024 * 1024
MODULE_LIMIT = 3145728
MANIFEST_LIMIT = 24576
ROLES = ("qaLive", "qaClosed", "canaryLive", "canaryClosed", "operatorClosed")
NAMES = {"manifest.json"} | {
    role + ("/closed-rollback.mjs" if role == "qaClosed" else "/index.mjs") for role in ROLES
}


def require(condition):
    if not condition:
        raise ValueError("unavailable")


def pairs(values):
    result = {}
    for key, value in values:
        require(key not in result and key not in ("__proto__", "prototype", "constructor", "toJSON"))
        result[key] = value
    return result


def invalid_constant(_value):
    raise ValueError("unavailable")


def actual_deflate_size(compressed, expected):
    # ZipExtFile clips to the declared size. Independently count the actual
    # deflate expansion so a forged short size/CRC cannot hide a trailing payload.
    decoder = zlib.decompressobj(-15)
    size = 0
    for offset in range(0, len(compressed), 65536):
        pending = compressed[offset:offset + 65536]
        while pending:
            out = decoder.decompress(pending, expected - size + 1)
            size += len(out)
            require(size <= expected)
            pending = decoder.unconsumed_tail
        require(not decoder.unused_data)
    require(decoder.eof and size == expected and not decoder.unused_data)


def inspect_archive(raw):
    require(0 < len(raw) <= ARCHIVE_LIMIT)
    # Reject multi-disk, ZIP64, comments, prefixes and trailing undeclared bytes.
    require(len(raw) >= 22 and raw[-22:-18] == b"PK\x05\x06")
    disk, central_disk, disk_count, count, central_size, central_start, comment = struct.unpack_from(
        "<4H2IH", raw, len(raw) - 18)
    require(disk == central_disk == comment == 0 and disk_count == count == 6 and count <= 64)
    require(central_start + central_size == len(raw) - 22)
    expanded = 0
    files = {}
    manifest_text = None
    with zipfile.ZipFile(io.BytesIO(raw)) as archive:
        entries = archive.infolist()
        require(len(entries) == count and archive.start_dir == central_start)
        names = [entry.filename for entry in entries]
        require(len(set(names)) == len(names) and set(names) == NAMES)
        end = 0
        for entry in sorted(entries, key=lambda item: item.header_offset):
            name = entry.filename
            require(name == entry.orig_filename and "\x00" not in name and "\\" not in name)
            require(name in NAMES and not entry.is_dir())
            mode = entry.external_attr >> 16
            require(stat.S_IFMT(mode) in (0, stat.S_IFREG) and not (entry.external_attr & 0x10))
            require(entry.create_system in (0, 3) and entry.extract_version <= 20)
            require(entry.flag_bits & ~0x80E == 0 and not entry.flag_bits & 1)
            require(entry.compress_type in (zipfile.ZIP_STORED, zipfile.ZIP_DEFLATED))
            limit = MANIFEST_LIMIT if name == "manifest.json" else MODULE_LIMIT
            require(0 < entry.file_size <= limit and 0 <= entry.compress_size <= ARCHIVE_LIMIT)
            expanded += entry.file_size
            require(expanded <= EXPANDED_LIMIT)
            offset = entry.header_offset
            require(offset == end and raw[offset:offset + 4] == b"PK\x03\x04")
            version, flags, method, _time, _date, crc, compressed_size, size, name_len, extra_len = struct.unpack_from(
                "<5H3I2H", raw, offset + 4)
            require(version <= 20 and flags == entry.flag_bits and method == entry.compress_type)
            require(raw[offset + 30:offset + 30 + name_len] == name.encode("ascii"))
            if flags & 8:
                require((crc, compressed_size, size) in ((0, 0, 0), (entry.CRC, entry.compress_size, entry.file_size)))
            else:
                require((crc, compressed_size, size) == (entry.CRC, entry.compress_size, entry.file_size))
            start = offset + 30 + name_len + extra_len
            end = start + entry.compress_size
            require(start <= end <= central_start)
            compressed = memoryview(raw)[start:end]
            if method == zipfile.ZIP_STORED:
                require(entry.compress_size == entry.file_size)
            else:
                actual_deflate_size(compressed, entry.file_size)
            if flags & 8:
                if raw[end:end + 4] == b"PK\x07\x08":
                    end += 4
                require(end + 12 <= central_start)
                require(struct.unpack_from("<3I", raw, end) == (entry.CRC, entry.compress_size, entry.file_size))
                end += 12
            digest = hashlib.sha256()
            actual = 0
            parts = []
            with archive.open(entry, "r") as source:
                while True:
                    chunk = source.read(min(65536, limit - actual + 1))
                    if not chunk:
                        break
                    actual += len(chunk)
                    require(actual <= limit and actual <= entry.file_size)
                    digest.update(chunk)
                    if name == "manifest.json":
                        parts.append(chunk)
            require(actual == entry.file_size)
            if name == "manifest.json":
                manifest_text = b"".join(parts).decode("utf-8", errors="strict")
            else:
                files[name] = {"sha256": digest.hexdigest(), "bytes": actual}
        require(end == central_start)
    manifest = json.loads(manifest_text, object_pairs_hook=pairs, parse_constant=invalid_constant)
    require(isinstance(manifest, dict) and manifest.get("purpose") == "afw.finite-native-package.v2")
    require(json.dumps(manifest, sort_keys=True, separators=(",", ":"), ensure_ascii=False) == manifest_text)
    return {"manifest": manifest, "manifestText": manifest_text, "files": files}


def main():
    raw = sys.stdin.buffer.read(ARCHIVE_LIMIT + 1)
    result = inspect_archive(raw)
    output = json.dumps(result, sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
    require(len(output) <= 65536)
    sys.stdout.buffer.write(output)


if __name__ == "__main__":
    try:
        main()
    except Exception:
        # Never emit archive names, contents, exception details or stack traces.
        sys.stderr.write("Finite archive unavailable\n")
        sys.exit(1)
