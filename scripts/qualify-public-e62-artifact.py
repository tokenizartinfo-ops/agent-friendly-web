"""Qualify the immutable e62 public build from main; no Cloudflare access."""
import hashlib
import importlib.util
import io
import json
import os
import stat
import subprocess
import sys
import zipfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("public_cloud_delivery", ROOT / "scripts/prepare-public-cloud-delivery.py")
BASE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(BASE)
REPO = "tokenizartinfo-ops/agent-friendly-web"
SOURCE = "e62cd321f38e07926659c52a59a220a4e0ea865e"
TREE = "9810e6df5b3b6e53b8befddcaf45abdf042b6422"
ARTIFACT = 13240978655
RUN = 41658579964
SIZE = 3054694
DIGEST = "5e664841173f3193e902ee4562815f622c27ecceb6d8e38fa44e33207bcd4693"
EXPIRY = "2026-11-10T15:05:31Z"
CASE_PATH = "cases/tokenizart/public-audit-2026-11-03.json"


def check_provenance(artifact, run, now):
    BASE.require(artifact.get("id") == ARTIFACT and artifact.get("name") == "afw-build-" + SOURCE, "artifact identity")
    BASE.require(artifact.get("size_in_bytes") == SIZE and artifact.get("digest") == "sha256:" + DIGEST, "artifact digest")
    BASE.require(artifact.get("expired") is False and BASE.parse_time(artifact.get("expires_at")) == BASE.parse_time(EXPIRY)
                 and BASE.parse_time(EXPIRY) > now, "artifact expiry")
    arun = artifact.get("workflow_run", {})
    BASE.require(arun.get("id") == RUN and arun.get("head_sha") == SOURCE
                 and arun.get("head_branch") == "main", "artifact run")
    BASE.require(run.get("id") == RUN and run.get("run_attempt") == 1 and run.get("event") == "push"
                 and run.get("head_branch") == "main" and run.get("head_sha") == SOURCE
                 and run.get("path") == ".github/workflows/ci.yml"
                 and run.get("status") == "completed" and run.get("conclusion") == "success", "run provenance")
    BASE.require(all(run.get(k, {}).get("full_name") == REPO for k in ("repository", "head_repository")), "repository")



def check_profile_contract(contract):
    expected_artifact = {
        "id": ARTIFACT, "name": "afw-build-" + SOURCE, "runId": RUN, "runAttempt": 1,
        "workflow": ".github/workflows/ci.yml", "bytes": SIZE, "sha256": DIGEST, "expiresAt": EXPIRY,
    }
    expected_baseline = {
        "versionId": "0fd30778-70ce-406f-8757-69bb29a21c09",
        "deploymentId": "37fe1838-b871-4b98-818c-990d61667dbb",
        "bindingsSha256": "7347149d5e22db8d04ef7fcdefa82da44eb9e877b0efde2faa1f1c22d099cf74",
        "settingsSha256": "aa39596bf29a129c7cc803eb9fc8e2a7df6d4de995f4bd8de69c207456f09166",
        "runtimeSha256": "d022a50e3aa634cb5b81066a014c552b59c82ca605ef7473d968cf8da07af739",
    }
    target = {"accountId": "85d0d5dadac3341a564f22ce885e9eec", "worker": "agent-friendly-web-web-production",
              "origin": "https://agentfriendlyweb.dev", "entrypoint": "server/index.js", "assets": "client"}
    baseline = contract.get("baseline", {})
    BASE.require(contract.get("project") == "AFW" and contract.get("repository") == REPO
                 and contract.get("sourceRevision") == SOURCE and contract.get("sourceTree") == TREE
                 and contract.get("target") == target and contract.get("artifact") == expected_artifact
                 and contract.get("inventoryPath") == "docs/evidence/2026-11-03-public-e62/qualified-inventory.json"
                 and contract.get("allowedAction") == "read_validate_and_prepare_only"
                 and contract.get("operationalReadiness") is False
                 and contract.get("inactiveUpload") == {"availability": "separate_manual_main_dispatch",
                                                         "maxAttemptsPerDispatch": 1, "trafficPromotion": False}
                 and all(baseline.get(k) == v for k, v in expected_baseline.items()), "package scope")


def check_profile_provenance(contract, artifact, run, now):
    check_profile_contract(contract)
    check_provenance(artifact, run, now)


def inventory_archive(data, expected_case):
    BASE.require(isinstance(data, bytes) and len(data) == SIZE and BASE.sha256(data) == DIGEST, "immutable ZIP")
    BASE.require(data.startswith(b"PK\x03\x04"), "ZIP signature")
    rows, seen, folded, total, markers = [], set(), set(), 0, set()
    required = {
        b"Cloudflare AI Index", b"ordenar y verificar", b"organize and verify",
        b"organizar e verificar", b"public-audit-2026-11-03.json",
        b"2026-08-26", b"2026-09-09", b"2026-11-03",
    }
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        infos = archive.infolist()
        BASE.require(0 < len(infos) <= BASE.MAX_FILES * 2, "archive count")
        for item in infos:
            directory = item.is_dir()
            name = BASE.safe_name(item.orig_filename, directory)
            BASE.require(name == (item.filename.rstrip("/") if directory else item.filename), "archive path")
            BASE.require(name not in seen and name.casefold() not in folded, "archive collision")
            seen.add(name)
            folded.add(name.casefold())
            BASE.require(not item.flag_bits & 1 and item.compress_type in (zipfile.ZIP_STORED, zipfile.ZIP_DEFLATED), "archive format")
            kind = stat.S_IFMT(item.external_attr >> 16)
            BASE.require(kind in (0, stat.S_IFDIR if directory else stat.S_IFREG), "archive file type")
            if directory:
                BASE.require(item.file_size == 0, "archive directory")
                continue
            BASE.require(item.file_size <= BASE.MAX_FILE, "file size")
            total += item.file_size
            BASE.require(total <= BASE.MAX_TOTAL and len(rows) < BASE.MAX_FILES, "archive size")
            content = archive.read(item)
            BASE.require(len(content) == item.file_size, "file size")
            if name == "client/" + CASE_PATH:
                BASE.require(content == expected_case, "case JSON source mismatch")
            if name.endswith((".js", ".mjs", ".html")):
                markers.update(marker for marker in required if marker in content)
            rows.append({"path": name, "bytes": len(content), "sha256": hashlib.sha256(content).hexdigest()})
    BASE.require("client/" + CASE_PATH in seen and "server/index.js" in seen, "required paths")
    BASE.require(markers == required, "compiled markers")
    inventory = {"sourceRevision": SOURCE, "files": len(rows), "uncompressedBytes": total,
                 "inventory": sorted(rows, key=lambda row: row["path"]), "productionAcceptance": False,
                 "operationalReadiness": False}
    BASE.qualify_archive(data, inventory, DIGEST)
    return inventory


def main():
    BASE.require(os.environ.get("GITHUB_ACTIONS") == "true" and os.environ.get("GITHUB_REPOSITORY") == REPO,
                 "runner identity")
    token = os.environ.get("GH_TOKEN", "")
    BASE.require(bool(token), "GitHub read token")
    tree = subprocess.run(["git", "rev-parse", SOURCE + "^{tree}"], cwd=ROOT, check=True,
                          capture_output=True, text=True, timeout=5).stdout.strip()
    BASE.require(tree == TREE, "source tree")
    expected_case = subprocess.run(["git", "show", SOURCE + ":public/" + CASE_PATH], cwd=ROOT, check=True,
                                   capture_output=True, timeout=5).stdout
    base = "https://api.github.com/repos/" + REPO + "/actions/"
    artifact = json.loads(BASE.github_get(base + "artifacts/" + str(ARTIFACT), token, 1048576))
    run = json.loads(BASE.github_get(base + "runs/" + str(RUN), token, 1048576))
    check_provenance(artifact, run, datetime.now(timezone.utc))
    archive = BASE.github_get(base + "artifacts/" + str(ARTIFACT) + "/zip", token, SIZE, archive=True)
    inventory = inventory_archive(archive, expected_case)
    check_provenance(artifact, run, datetime.now(timezone.utc))
    output = ROOT / "output" / "public-e62-qualification"
    BASE.require(not output.exists() and not output.is_symlink(), "existing output")
    output.mkdir(parents=True)
    (output / "inventory.json").write_text(json.dumps(inventory, indent=2) + "\n")
    receipt = {"sourceRevision": SOURCE, "sourceTree": TREE, "artifactId": ARTIFACT,
               "runId": RUN, "zipSha256": DIGEST, "artifactExpiresAt": EXPIRY,
               "checkedAt": datetime.now(timezone.utc).isoformat(), "files": inventory["files"],
               "uncompressedBytes": inventory["uncompressedBytes"], "caseJsonMatchesSource": True,
               "compiledMarkersPresent": True, "archiveExtracted": False, "appExecuted": False,
               "cloudflareMutations": 0, "productionAcceptance": False, "publicationReady": False,
               "operationalReadiness": False}
    (output / "receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt))


if __name__ == "__main__":
    try:
        main()
    except Exception:
        print("Public e62 qualification unavailable; no publication performed.", file=sys.stderr)
        sys.exit(2)
