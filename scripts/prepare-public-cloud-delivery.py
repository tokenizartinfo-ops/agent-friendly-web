"""Read-only AFW delivery qualification. Never extracts, executes or publishes a build."""
import hashlib
import io
import json
import os
import re
import stat
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import zipfile
from datetime import datetime, timezone
from pathlib import Path

REPOSITORY = "tokenizartinfo-ops/agent-friendly-web"
MAX_ZIP = 16 * 1024 * 1024
MAX_FILE = 16 * 1024 * 1024
MAX_TOTAL = 64 * 1024 * 1024
MAX_FILES = 1024

def require(value, message):
    if not value:
        raise ValueError(message)

def sha256(data):
    return hashlib.sha256(data).hexdigest()

def safe_name(name, directory=False):
    require(isinstance(name, str) and 0 < len(name) <= 512, "archive path")
    require(not any(ord(c) < 32 or ord(c) == 127 for c in name), "archive path")
    require("\\" not in name and ":" not in name and not name.startswith("/"), "archive path")
    path = name[:-1] if directory and name.endswith("/") else name
    parts = path.split("/")
    require(all(p and p not in (".", "..") for p in parts), "archive path")
    require(parts[0] in ("client", "server") and (directory or len(parts) > 1), "archive root")
    return path

def qualify_archive(data, inventory, expected_digest):
    require(isinstance(data, bytes) and 0 < len(data) <= MAX_ZIP, "archive size")
    require(re.fullmatch("[a-f0-9]{64}", expected_digest or "") is not None, "archive digest")
    require(sha256(data) == expected_digest, "archive digest")
    entries = inventory.get("inventory", [])
    require(isinstance(entries, list) and 0 < len(entries) <= MAX_FILES, "inventory count")
    require(inventory.get("files") == len(entries), "inventory count")
    expected, folded = {}, set()
    for item in entries:
        name = safe_name(item.get("path"))
        require(name not in expected and name.casefold() not in folded, "inventory collision")
        size = item.get("bytes")
        require(type(size) is int and 0 <= size <= MAX_FILE, "inventory file size")
        require(re.fullmatch("[a-f0-9]{64}", item.get("sha256", "")) is not None, "inventory hash")
        expected[name] = item
        folded.add(name.casefold())
    total = sum(v["bytes"] for v in expected.values())
    require(total == inventory.get("uncompressedBytes") and total <= MAX_TOTAL, "inventory total size")
    require("server/index.js" in expected, "inventory entrypoint")
    require(data.startswith(b"PK\x03\x04"), "archive signature")
    try:
        with zipfile.ZipFile(io.BytesIO(data)) as archive:
            infos = archive.infolist()
            require(0 < len(infos) <= MAX_FILES * 2, "archive count")
            seen, seen_folded = set(), set()
            for item in infos:
                directory = item.is_dir()
                name = safe_name(item.orig_filename, directory)
                require(name == item.filename.rstrip("/") if directory else name == item.filename, "archive path")
                require(not item.flag_bits & 1, "archive encryption")
                require(item.compress_type in (zipfile.ZIP_STORED, zipfile.ZIP_DEFLATED), "archive compression")
                kind = stat.S_IFMT(item.external_attr >> 16)
                require(kind in (0, stat.S_IFDIR if directory else stat.S_IFREG), "archive file type")
                # Reject duplicate directory/file spellings and cross-platform case collisions.
                require(name not in seen and name.casefold() not in seen_folded, "archive collision")
                seen.add(name); seen_folded.add(name.casefold())
                if directory:
                    require(item.file_size == 0, "archive directory size")
                    continue
                require(name in expected, "archive unexpected file")
                wanted = expected[name]
                require(item.file_size == wanted["bytes"] <= MAX_FILE, "archive file size")
                digest, count = hashlib.sha256(), 0
                with archive.open(item, "r") as stream:
                    while True:
                        chunk = stream.read(65536)
                        if not chunk:
                            break
                        count += len(chunk)
                        require(count <= wanted["bytes"], "archive file size")
                        digest.update(chunk)
                require(count == wanted["bytes"] and digest.hexdigest() == wanted["sha256"], "archive content")
            files = {v.orig_filename for v in infos if not v.is_dir()}
            require(files == set(expected), "archive missing files")
    except (zipfile.BadZipFile, zipfile.LargeZipFile, RuntimeError, EOFError, NotImplementedError, OSError):
        raise ValueError("archive integrity") from None
    return {"files": len(expected), "uncompressedBytes": total, "zipSha256": expected_digest}

def parse_time(value):
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
        require(parsed.tzinfo is not None, "provenance timestamp")
        return parsed
    except (AttributeError, TypeError, ValueError):
        raise ValueError("provenance timestamp") from None

def check_provenance(contract, artifact, run, now):
    expected = contract["artifact"]
    require(artifact.get("id") == expected["id"] and artifact.get("name") == expected["name"], "provenance artifact")
    require(artifact.get("size_in_bytes") == expected["bytes"], "provenance size")
    require(artifact.get("digest") == "sha256:" + expected["sha256"], "provenance digest")
    require(artifact.get("expired") is False, "provenance expired")
    expiry = parse_time(artifact.get("expires_at"))
    require(expiry == parse_time(expected["expiresAt"]) and expiry > now, "provenance expiry")
    source = contract["sourceRevision"]
    arun = artifact.get("workflow_run", {})
    require(arun.get("id") == expected["runId"] and arun.get("head_sha") == source, "provenance artifact run")
    require(run.get("id") == expected["runId"] and run.get("run_attempt") == expected["runAttempt"], "provenance run")
    require(run.get("status") == "completed" and run.get("conclusion") == "success", "provenance run success")
    require(run.get("head_sha") == source and run.get("event") == "pull_request", "provenance source")
    require(run.get("path") == expected["workflow"], "provenance workflow")
    require(all(run.get(k, {}).get("full_name") == contract["repository"]
                for k in ("repository", "head_repository")), "provenance repository")

def allowed_download_url(url):
    try:
        parsed = urllib.parse.urlsplit(url)
        host = parsed.hostname or ""
        return bool(parsed.scheme == "https" and not parsed.username and not parsed.password
                    and parsed.port in (None, 443) and not parsed.fragment
                    and (host == "api.github.com"
                         or re.fullmatch(r"productionresultssa[0-9]+\.blob\.core\.windows\.net", host)
                         or host.endswith(".actions.githubusercontent.com")))
    except (TypeError, ValueError):
        return False

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

def github_get(url, token, max_bytes, archive=False):
    """Only the initial GitHub API request receives auth; redirects get no credentials."""
    require(url.startswith("https://api.github.com/repos/" + REPOSITORY + "/actions/"), "GitHub endpoint")
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), NoRedirect())
    deadline = time.monotonic() + 45
    for hop in range(4):
        require(allowed_download_url(url), "GitHub download host")
        headers = {"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"}
        if hop == 0:
            headers["Authorization"] = "Bearer " + token
        request = urllib.request.Request(url, headers=headers, method="GET")
        remaining = deadline - time.monotonic()
        require(remaining > 0, "GitHub download deadline")
        try:
            response = opener.open(request, timeout=min(15, remaining))
        except urllib.error.HTTPError as error:
            if archive and error.code in (301, 302, 303, 307, 308):
                location = error.headers.get("Location", "")
                error.close()
                url = urllib.parse.urljoin(url, location)
                continue
            error.close()
            raise ValueError("GitHub response unavailable") from None
        try:
            require(response.status == 200, "GitHub response unavailable")
            chunks, size = [], 0
            while True:
                require(time.monotonic() < deadline, "GitHub download deadline")
                chunk = response.read(min(65536, max_bytes + 1 - size))
                if not chunk:
                    break
                size += len(chunk)
                require(size <= max_bytes, "GitHub response size")
                chunks.append(chunk)
            return b"".join(chunks)
        finally:
            response.close()
    raise ValueError("GitHub redirect limit")

def qualifier_context(env, checked_out):
    expected = env.get("AFW_QUALIFIER_REVISION", "")
    event = env.get("GITHUB_SHA", "")
    require(all(re.fullmatch("[a-f0-9]{40}", v or "") for v in (expected, checked_out, event)),
            "qualifier revision")
    require(checked_out == expected, "qualifier checkout mismatch")
    run, attempt = env.get("GITHUB_RUN_ID", ""), env.get("GITHUB_RUN_ATTEMPT", "")
    require(all(re.fullmatch("[1-9][0-9]*", v) for v in (run, attempt)), "qualifier run identity")
    return {"qualifierRevision": checked_out, "eventRevision": event,
            "qualifierRun": run, "qualifierRunAttempt": attempt}

def main():
    require(os.environ.get("GITHUB_ACTIONS") == "true" and os.environ.get("GITHUB_REPOSITORY") == REPOSITORY,
            "GitHub runner identity")
    root = Path(__file__).resolve().parents[1]
    checkout = subprocess.run(["git", "rev-parse", "--verify", "HEAD"], cwd=root,
                              env={"PATH": os.environ["PATH"], "HOME": os.environ.get("HOME", "")},
                              capture_output=True, text=True, check=True, timeout=5).stdout.strip()
    qualifier = qualifier_context(os.environ, checkout)
    contract = json.loads((root / "config/public-cloud-delivery.v1.json").read_text())
    require(contract["project"] == "AFW" and contract["repository"] == REPOSITORY
            and contract["allowedAction"] == "read_validate_and_prepare_only"
            and contract["operationalReadiness"] is False, "contract scope")
    require(contract["target"] == {"accountId": "85d0d5dadac3341a564f22ce885e9eec",
            "worker": "agent-friendly-web-web-production", "origin": "https://agentfriendlyweb.dev",
            "entrypoint": "server/index.js", "assets": "client"}, "contract target")
    inventory_path = root / "docs/evidence/2026-10-21-a2a-delivery/qualified-inventory.json"
    require(contract["inventoryPath"] == str(inventory_path.relative_to(root)), "contract inventory")
    inventory = json.loads(inventory_path.read_text())
    require(inventory["sourceRevision"] == contract["sourceRevision"]
            and inventory["productionAcceptance"] is False and inventory["operationalReadiness"] is False,
            "inventory source")
    token = os.environ.get("GH_TOKEN", "")
    require(bool(token), "GitHub reader unavailable")
    base = "https://api.github.com/repos/" + REPOSITORY + "/actions/"
    a = contract["artifact"]
    artifact = json.loads(github_get(base + "artifacts/" + str(a["id"]), token, 1048576))
    run = json.loads(github_get(base + "runs/" + str(a["runId"]), token, 1048576))
    check_provenance(contract, artifact, run, datetime.now(timezone.utc))
    archive = github_get(base + "artifacts/" + str(a["id"]) + "/zip", token, a["bytes"], archive=True)
    require(len(archive) == a["bytes"], "artifact size")
    qualified = qualify_archive(archive, inventory, a["sha256"])
    # Expiry can be crossed during a slow download. Recheck immediately before handing off bytes.
    check_provenance(contract, artifact, run, datetime.now(timezone.utc))
    output = root / "output/public-cloud-delivery"
    require(not output.exists() and not output.is_symlink(), "output already exists")
    output.mkdir(parents=True)
    receipt = {"kind": "public_cloud_delivery_qualification", "checkedAt": datetime.now(timezone.utc).isoformat(),
               "repository": REPOSITORY, "sourceRevision": contract["sourceRevision"], "sourceTree": contract["sourceTree"],
               **qualifier,
               "artifactId": a["id"], "artifactExpiresAt": a["expiresAt"], **qualified,
               "target": contract["target"], "baseline": contract["baseline"], "baselineIsHistorical": True,
               "archiveExtracted": False, "appExecuted": False, "appRebuilt": False, "cloudflareMutations": 0,
               "productionAcceptance": False, "publicationReady": False, "operationalReadiness": False,
               "nextGate": "fresh effective-config/rollback check and authorized cloud publication channel; no credential is supplied by this receipt"}
    (output / "qualified-dist.zip").write_bytes(archive)
    (output / "inventory.json").write_text(json.dumps(inventory, indent=2) + "\n")
    (output / "contract.json").write_text(json.dumps(contract, indent=2) + "\n")
    (output / "receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps({k: receipt[k] for k in ("checkedAt", "sourceRevision", "qualifierRevision", "eventRevision", "qualifierRun", "qualifierRunAttempt", "artifactId", "files", "uncompressedBytes",
                                           "zipSha256", "appRebuilt", "cloudflareMutations", "publicationReady",
                                           "operationalReadiness")}))

if __name__ == "__main__":
    try:
        main()
    except Exception:
        # Exceptions from HTTP clients may contain signed URLs or headers. Never serialize them.
        print("Public delivery qualification unavailable; no deployment performed.", file=sys.stderr)
        sys.exit(2)
