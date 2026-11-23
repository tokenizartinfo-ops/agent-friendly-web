"""Qualify and optionally upload exactly the AFW PR 746 main artifact."""
import importlib.util
import io
import json
import os
import re
import stat
import subprocess
import sys
import zipfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = "fab1f2601e4e7053e34bae47317013943fbebc55"
BUILD_RUN = 45244039007
WORKFLOW = ".github/workflows/afw-pr746-inactive-upload.yml"
SCRIPT = "scripts/public-pr746-inactive-upload.py"
PROFILE = "pr746"
CONTRACT = "output/public-pr746-release.json"
RECEIPT = "output/public-pr746-inactive-receipt.json"
BASELINE = {
    "deploymentId": "fb1fe1fb-dd74-490d-a244-03c7c139b1b1",
    "versionId": "29ff6775-2f8f-4318-81c8-c8931c6a4973",
    "bindingsSha256": "7347149d5e22db8d04ef7fcdefa82da44eb9e877b0efde2faa1f1c22d099cf74",
    "settingsSha256": "aa39596bf29a129c7cc803eb9fc8e2a7df6d4de995f4bd8de69c207456f09166",
    "runtimeSha256": "d022a50e3aa634cb5b81066a014c552b59c82ca605ef7473d968cf8da07af739",
}
spec = importlib.util.spec_from_file_location("public_uploader", ROOT / "scripts/public-inactive-upload.py")
uploader = importlib.util.module_from_spec(spec)
spec.loader.exec_module(uploader)
qual = uploader.qual
require = uploader.require
TARGET = {"accountId": uploader.ACCOUNT, "worker": uploader.WORKER,
          "origin": "https://agentfriendlyweb.dev", "entrypoint": "server/index.js", "assets": "client"}


def packet(name):
    require(name == PROFILE, "pr746_scope")
    return {"sourceRevision": SOURCE, "contractPath": CONTRACT, "workflow": WORKFLOW, "receiptPath": RECEIPT}


def check_contract(contract, name):
    packet(name)
    require(contract["sourceRevision"] == SOURCE and contract["target"] == TARGET
            and contract["baseline"] == BASELINE and contract["artifact"]["runId"] == BUILD_RUN, "pr746_package_scope")


def inspect_archive(data, digest):
    require(0 < len(data) <= qual.MAX_ZIP and qual.sha256(data) == digest and data.startswith(b"PK\x03\x04"), "pr746_zip")
    files, names, folded, total = [], set(), set(), 0
    markers = {b"dossier_continuation_saved", b"Retomar este expediente"}
    found = set()
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        require(0 < len(archive.infolist()) <= qual.MAX_FILES * 2, "pr746_count")
        for entry in archive.infolist():
            directory = entry.is_dir()
            name = qual.safe_name(entry.orig_filename, directory)
            require(name not in names and name.casefold() not in folded, "pr746_collision")
            names.add(name)
            folded.add(name.casefold())
            require(not entry.flag_bits & 1 and entry.compress_type in (zipfile.ZIP_STORED, zipfile.ZIP_DEFLATED), "pr746_format")
            require(stat.S_IFMT(entry.external_attr >> 16) in (0, stat.S_IFDIR if directory else stat.S_IFREG), "pr746_type")
            if directory:
                require(entry.file_size == 0, "pr746_directory")
                continue
            total += entry.file_size
            require(entry.file_size <= qual.MAX_FILE and total <= qual.MAX_TOTAL and len(files) < qual.MAX_FILES, "pr746_size")
            content = archive.read(entry)
            require(len(content) == entry.file_size, "pr746_size")
            if name.endswith((".js", ".mjs", ".html")):
                found.update(marker for marker in markers if marker in content)
            files.append({"path": name, "bytes": len(content), "sha256": qual.sha256(content)})
    require(found == markers, "pr746_build_markers")
    inventory = {"sourceRevision": SOURCE, "files": len(files), "uncompressedBytes": total,
                 "inventory": sorted(files, key=lambda entry: entry["path"])}
    qual.qualify_archive(data, inventory, digest)
    return inventory


def prepare():
    require(os.environ.get("GITHUB_ACTIONS") == "true" and os.environ.get("GITHUB_REPOSITORY") == uploader.REPO, "pr746_runner")
    checkout = subprocess.check_output(["git", "rev-parse", "--verify", "HEAD"], cwd=ROOT, text=True, timeout=5).strip()
    qual.qualifier_context(os.environ, checkout)
    subprocess.run(["git", "merge-base", "--is-ancestor", SOURCE, checkout], cwd=ROOT, check=True, timeout=5)
    changed = set(subprocess.check_output(["git", "diff", "--name-only", SOURCE, checkout], cwd=ROOT, text=True, timeout=5).splitlines())
    require(changed <= {WORKFLOW, SCRIPT}, "pr746_checkout_delta")
    token = os.environ.get("GH_TOKEN", "")
    require(bool(token.strip()), "pr746_github_auth")
    base = "https://api.github.com/repos/" + uploader.REPO + "/actions"
    def metadata(path):
        return json.loads(qual.github_get(base + path, token, 1048576))
    run = metadata("/runs/" + str(BUILD_RUN))
    require(run["id"] == BUILD_RUN and run["head_sha"] == SOURCE and run["head_branch"] == "main"
            and run["event"] == "push" and run["path"] == ".github/workflows/ci.yml"
            and run["status"] == "completed" and run["conclusion"] == "success"
            and run["run_attempt"] == 1, "pr746_build")
    artifact, = [row for row in metadata("/runs/" + str(BUILD_RUN) + "/artifacts")["artifacts"]
                 if row["name"] == "afw-build-" + SOURCE]
    upload = artifact["workflow_run"]
    require(upload["id"] == BUILD_RUN and upload["head_sha"] == SOURCE and not artifact["expired"]
            and qual.parse_time(artifact["expires_at"]) > datetime.now(timezone.utc)
            and 0 < artifact["size_in_bytes"] <= qual.MAX_ZIP, "pr746_artifact")
    digest = artifact["digest"]
    require(isinstance(digest, str) and re.fullmatch(r"sha256:[a-f0-9]{64}", digest), "pr746_artifact_digest")
    raw = qual.github_get(base + "/artifacts/" + str(artifact["id"]) + "/zip", token, qual.MAX_ZIP, archive=True)
    require(len(raw) == artifact["size_in_bytes"], "pr746_artifact_size")
    inventory = inspect_archive(raw, digest[7:])
    handoff = ROOT / "output/public-cloud-delivery"
    handoff.mkdir(parents=True)
    (handoff / "receipt.json").write_text(json.dumps({"qualifierRevision": checkout, "artifactId": artifact["id"],
                  "zipSha256": digest[7:], "sourceRevision": SOURCE}), encoding="utf8")
    (handoff / "inventory.json").write_text(json.dumps(inventory), encoding="utf8")
    (handoff / "qualified-dist.zip").write_bytes(raw)
    contract = {"sourceRevision": SOURCE, "target": TARGET, "baseline": BASELINE,
                "artifact": {"id": artifact["id"], "runId": BUILD_RUN, "sha256": digest[7:], "expiresAt": artifact["expires_at"]}}
    (ROOT / CONTRACT).write_text(json.dumps(contract), encoding="utf8")


if __name__ == "__main__":
    try:
        prepare()
        uploader.upload_packet = packet
        uploader.check_packet_contract = check_contract
        uploader.main(PROFILE)
    except SystemExit:
        raise
    except Exception:
        print("PR 746 inactive release unavailable. Inspect the receipt before any repeat.", file=sys.stderr)
        sys.exit(2)
