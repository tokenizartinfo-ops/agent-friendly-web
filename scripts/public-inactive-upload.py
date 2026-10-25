"""One exact public inactive upload, or offline verification. Never promotes traffic."""
import copy
import hashlib
import importlib.util
import io
import json
import os
import re
import selectors
import signal
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
import zipfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("public_qualifier", ROOT / "scripts/prepare-public-cloud-delivery.py")
qual = importlib.util.module_from_spec(spec)
spec.loader.exec_module(qual)
REPO = "tokenizartinfo-ops/agent-friendly-web"
ACCOUNT = "85d0d5dadac3341a564f22ce885e9eec"
WORKER = "agent-friendly-web-web-production"
DB = "d26fc9d2-df5a-4957-8e58-cc4c945faad8"
BASE = "/accounts/" + ACCOUNT + "/workers/scripts/" + WORKER
FLAGS = ["nodejs_compat", "global_fetch_strictly_public"]
OBSERVABILITY = {"enabled": True, "head_sampling_rate": 1, "redact_query_string": False,
                 "logs": {"enabled": True, "head_sampling_rate": 1, "persist": True, "invocation_logs": True},
                 "traces": {"enabled": False, "persist": True, "head_sampling_rate": 1}}
SETTINGS = {"compatibility_date": "2026-09-01", "compatibility_flags": FLAGS, "logpush": False,
            "tail_consumers": [], "observability": OBSERVABILITY, "usage_model": "standard", "placement": {}}
NAMES = {"ACCESS_AUD", "ACCESS_TEAM_DOMAIN", "AFW_CANARY_DIAGNOSTICS_ENABLED", "AFW_REMOTE_DEPLOY_ENABLED",
         "AFW_COPILOT_ENABLED", "AFW_COPILOT_PROJECT_ID", "AI", "ASSETS", "COPILOT_RATE_LIMIT", "DB"}
UUID = r"[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}"

def require(ok, code):
    if not ok:
        raise ValueError(code)

def hash_bytes(value):
    return hashlib.sha256(value).hexdigest()

def digest(value):
    return hash_bytes(json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode())

def bindings_hash(value):
    return digest(sorted(value, key=lambda item: item["name"]))

def settings_hash(value):
    return digest({key: value.get(key) for key in SETTINGS})

def check_state(state, expected):
    version, settings, deployment = state["version"], state["settings"], state["deployment"]
    bindings = version["resources"]["bindings"]
    require(len(bindings) == 10 and {b["name"] for b in bindings} == NAMES, "binding_scope")
    by_name = {b["name"]: b for b in bindings}
    require(all(b["type"] == "plain_text" for b in bindings if b["name"].startswith(("ACCESS_", "AFW_"))), "binding_type")
    require(by_name["AI"]["type"] == "ai" and by_name["ASSETS"]["type"] == "assets", "binding_type")
    require(by_name["DB"]["type"] == "d1" and by_name["DB"].get("id", by_name["DB"].get("database_id")) == DB, "db_scope")
    require(by_name["COPILOT_RATE_LIMIT"]["type"] == "ratelimit"
            and by_name["COPILOT_RATE_LIMIT"]["namespace_id"] == "26092803"
            and by_name["COPILOT_RATE_LIMIT"]["simple"] == {"limit": 5, "period": 60}, "rate_scope")
    require(by_name["AFW_CANARY_DIAGNOSTICS_ENABLED"]["text"] == "false"
            and by_name["AFW_REMOTE_DEPLOY_ENABLED"]["text"] == "false"
            and by_name["AFW_COPILOT_ENABLED"]["text"] == "true"
            and bool(by_name["AFW_COPILOT_PROJECT_ID"]["text"]), "flag_scope")
    require(bindings_hash(bindings) == expected["bindingsSha256"]
            and bindings_hash(settings["bindings"]) == expected["bindingsSha256"], "binding_drift")
    require(settings_hash(settings) == expected["settingsSha256"]
            and digest(version["resources"]["script_runtime"]) == expected["runtimeSha256"], "settings_drift")
    require(version["id"] == expected["versionId"] and deployment["id"] == expected["deploymentId"], "version_drift")
    positive = [v for v in deployment["versions"] if v["percentage"] != 0]
    require(positive == [{"version_id": expected["versionId"], "percentage": 100}], "traffic_drift")
    require(state["subdomain"].get("enabled") is False
            and state["subdomain"].get("previews_enabled") is False, "preview_drift")

def upload_config(_state=None):
    # No vars, private pin, credentials, route, trigger, migration or build hooks.
    return {"name": WORKER, "account_id": ACCOUNT, "main": "server/index.js", "no_bundle": True, "keep_vars": True,
            "compatibility_date": SETTINGS["compatibility_date"], "compatibility_flags": FLAGS[:],
            "workers_dev": False, "preview_urls": False,
            "assets": {"directory": "client", "binding": "ASSETS", "not_found_handling": "none"},
            "rules": [{"type": "ESModule", "globs": ["**/*.js", "**/*.mjs"]}], "ai": {"binding": "AI"},
            "ratelimits": [{"name": "COPILOT_RATE_LIMIT", "namespace_id": "26092803", "simple": {"limit": 5, "period": 60}}],
            "d1_databases": [{"binding": "DB", "database_name": WORKER, "database_id": DB}],
            "logpush": False, "observability": copy.deepcopy(OBSERVABILITY)}

def upload_packet(packet="legacy"):
    # Closed profiles return new literals: callers cannot mutate another invocation.
    if packet == "legacy":
        return {"sourceRevision": "61909a5805549abb9534679d1735c3be8745071f",
                "contractPath": "config/public-cloud-delivery.v1.json",
                "workflow": ".github/workflows/afw-public-inactive-upload.yml",
                "receiptPath": "output/public-upload-receipt.json"}
    if packet == "json_budget":
        return {"sourceRevision": "d3b638a46d1f9ab559142222e181e9aae2e0a83e",
                "contractPath": "config/public-json-budget-delivery.v1.json",
                "workflow": ".github/workflows/afw-public-json-inactive-upload.yml",
                "receiptPath": "output/public-json-upload-receipt.json"}
    raise ValueError("upload_packet")

def check_packet_contract(contract, packet="legacy"):
    profile = upload_packet(packet)
    require(contract["sourceRevision"] == profile["sourceRevision"]
            and contract["target"] == {"accountId": ACCOUNT, "worker": WORKER, "origin": "https://agentfriendlyweb.dev",
                                      "entrypoint": "server/index.js", "assets": "client"}, "package_scope")

def upload_context(env, run, checkout, now, packet="legacy"):
    profile = upload_packet(packet)
    require(env.get("GITHUB_ACTIONS") == "true" and env.get("GITHUB_REPOSITORY") == REPO
            and env.get("GITHUB_EVENT_NAME") == "workflow_dispatch"
            and env.get("GITHUB_REF") == "refs/heads/main" and env.get("GITHUB_RUN_ATTEMPT") == "1", "dispatch_scope")
    require(re.fullmatch("[a-f0-9]{40}", checkout or "") and env.get("GITHUB_SHA") == checkout
            and run.get("head_sha") == checkout and str(run.get("id")) == env.get("GITHUB_RUN_ID")
            and run.get("run_attempt") == 1 and run.get("event") == "workflow_dispatch"
            and run.get("path") == profile["workflow"], "dispatch_identity")
    require(all(run.get(key, {}).get("full_name") == REPO for key in ("repository", "head_repository")), "dispatch_repo")
    age = (now - qual.parse_time(run["created_at"])).total_seconds()
    require(0 <= age < 600, "dispatch_expired")
    return {"remainingSeconds": 600-age, "runId": run["id"], "runAttempt": 1}

def upload_once(token, read, upload, post):
    require(isinstance(token, str) and bool(token.strip()), "credential_unavailable")
    read()
    version = upload()  # Deliberately called once: unknown ACK is never retried.
    return post(version)

def check_path_tree(paths):
    names = {qual.safe_name(p) for p in paths}
    folded = {p.casefold() for p in names}
    require(len(names) == len(paths) and len(folded) == len(paths), "archive_collision")
    for name in names:
        parts = name.split("/")
        require(not any("/".join(parts[:n]).casefold() in folded for n in range(1, len(parts))), "archive_ancestor")

def extract_qualified(data, inventory, expected_hash, destination):
    qual.qualify_archive(data, inventory, expected_hash)  # Validate all bytes before writing any.
    check_path_tree([item["path"] for item in inventory["inventory"]])
    require(not destination.exists() and not destination.is_symlink(), "package_exists")
    destination.mkdir(mode=0o700)
    root = destination.resolve()
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        for item in inventory["inventory"]:
            target = root / item["path"]
            require(target.resolve().is_relative_to(root), "package_path")
            target.parent.mkdir(parents=True, exist_ok=True)
            with target.open("xb") as output:
                output.write(archive.read(item["path"]))

def wrangler_command(executable, config, tag, dry_run, packet="legacy"):
    prefix = upload_packet(packet)["sourceRevision"][:8]
    require(re.fullmatch(re.escape(prefix)+r"-r[1-9][0-9]*-a1", tag) is not None, "upload_tag")
    command = [str(executable), "versions", "upload", "--config", str(config), "--no-bundle", "--keep-vars",
               "--tag", tag, "--message", "AFW exact"+prefix+" inactive-only cloud package; no promotion"]
    if dry_run:
        command += ["--dry-run"]
    return command

def cf_get(suffix, token, remaining):
    require(suffix in ("/deployments", "/settings", "/subdomain")
            or re.fullmatch("/versions/" + UUID, suffix), "cf_path")
    require(remaining > 0, "dispatch_expired")
    request = urllib.request.Request("https://api.cloudflare.com/client/v4" + BASE + suffix,
                headers={"Authorization": "Bearer " + token, "Accept": "application/json"}, method="GET")
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), qual.NoRedirect())
    with opener.open(request, timeout=min(10, remaining)) as response:
        require(response.status == 200, "cf_unavailable")
        body = response.read(1048577)
        require(len(body) <= 1048576, "cf_size")
    result = json.loads(body)
    require(result.get("success") is True and "result" in result, "cf_unavailable")
    return result["result"]

def read_state(expected, token, remaining):
    return {"version": cf_get("/versions/"+expected["versionId"], token, remaining()),
            "settings": cf_get("/settings", token, remaining()),
            "deployment": cf_get("/deployments", token, remaining())["deployments"][0],
            "subdomain": cf_get("/subdomain", token, remaining())}

def verify_files(root, inventory):
    for item in inventory["inventory"]:
        body = (root / item["path"]).read_bytes()
        require(len(body) == item["bytes"] and hash_bytes(body) == item["sha256"], "package_changed")

def child(command, cwd, token, deadline):
    # Absolute original deadline: setup, pipe reads and wait never reset it.
    require(deadline > time.monotonic(), "dispatch_expired")
    deadline = min(deadline, time.monotonic()+180)
    env = {key: os.environ[key] for key in ("PATH", "HOME", "RUNNER_TEMP") if key in os.environ}
    env.update({"WRANGLER_SEND_METRICS": "false", "NO_COLOR": "1", "CI": "true"})
    if token:
        env["CLOUDFLARE_API_TOKEN"] = token
        env["CLOUDFLARE_ACCOUNT_ID"] = ACCOUNT
    process = subprocess.Popen(command, cwd=cwd, env=env, stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE, start_new_session=True)
    selector = None
    chunks, total = [], 0
    try:
        selector = selectors.DefaultSelector()
        for stream, name in ((process.stdout, "stdout"), (process.stderr, "stderr")):
            os.set_blocking(stream.fileno(), False)
            selector.register(stream, selectors.EVENT_READ, name)
        while selector.get_map():
            left = deadline-time.monotonic()
            if left <= 0:
                raise TimeoutError("uploader_deadline")
            events = selector.select(left)
            if not events:
                raise TimeoutError("uploader_deadline")
            for key, _ in events:
                try:
                    block = os.read(key.fileobj.fileno(), 65536)
                except BlockingIOError:
                    continue
                if not block:
                    selector.unregister(key.fileobj)
                    continue
                total += len(block)
                require(total <= 2097152, "uploader_output_limit")
                if key.data == "stdout":
                    chunks.append(block)  # stderr is drained/count-limited but never retained.
        left = deadline-time.monotonic()
        if left <= 0:
            raise TimeoutError("uploader_deadline")
        require(process.wait(timeout=left) == 0, "uploader_unavailable")
        return b"".join(chunks).decode("utf-8", "replace")  # Never printed or persisted.
    finally:
        if selector is not None:
            selector.close()
        # New session/process group belongs exclusively to this invocation, including CLI shims.
        try:
            os.killpg(process.pid, signal.SIGKILL)
        except ProcessLookupError:
            pass
        process.wait(timeout=5)
        process.stdout.close()
        process.stderr.close()

def main(packet="legacy"):
    profile = upload_packet(packet)
    mode = sys.argv[1] if len(sys.argv) == 2 else ""
    require(mode in ("verify_only", "upload_inactive", "check_credential"), "operation")
    token = os.environ.get("CLOUDFLARE_API_TOKEN", "")
    if mode == "check_credential":
        require(bool(token.strip()), "credential_unavailable")
        return
    receipt = {"kind": "public_inactive_cloud_upload", "mode": mode, "ok": False,
               "uploadAttempted": False, "trafficPromotion": False, "operationalReadiness": False,
               "privateAcceptance": False, "phase": "runner"}
    def save():
        receipt["checkedAt"] = datetime.now(timezone.utc).isoformat()
        (ROOT/"output").mkdir(exist_ok=True)
        (ROOT/profile["receiptPath"]).write_text(json.dumps(receipt, indent=2)+"\n")
    try:
        require(os.environ.get("GITHUB_ACTIONS") == "true" and os.environ.get("GITHUB_REPOSITORY") == REPO, "runner_scope")
        checkout = subprocess.run(["git", "rev-parse", "--verify", "HEAD"], cwd=ROOT, capture_output=True,
                                  text=True, timeout=5, check=True).stdout.strip()
        qual.qualifier_context(os.environ, checkout)
        if mode == "upload_inactive":
            require(bool(token.strip()), "credential_unavailable")  # Before all network/child/extraction.
        contract = json.loads((ROOT/profile["contractPath"]).read_text())
        check_packet_contract(contract, packet)
        expected = contract["baseline"]
        handoff = ROOT/"output/public-cloud-delivery"
        report = json.loads((handoff/"receipt.json").read_text())
        inventory = json.loads((handoff/"inventory.json").read_text())
        data = (handoff/"qualified-dist.zip").read_bytes()
        require(report["qualifierRevision"] == checkout and report["artifactId"] == contract["artifact"]["id"]
                and report["zipSha256"] == contract["artifact"]["sha256"]
                and report["sourceRevision"] == contract["sourceRevision"]
                and inventory["sourceRevision"] == contract["sourceRevision"], "package_receipt")
        require(datetime.now(timezone.utc) < qual.parse_time(contract["artifact"]["expiresAt"]), "package_expired")
        receipt.update({"sourceRevision": contract["sourceRevision"], "artifactId": contract["artifact"]["id"],
                        "packageSha256": contract["artifact"]["sha256"], "qualifierRevision": checkout})
        deadline = time.monotonic()+180  # Offline verification bound only; not upload authority.
        def remaining():
            return deadline-time.monotonic()
        if mode == "upload_inactive":
            receipt["phase"] = "dispatch"
            gh_token = os.environ.get("GH_TOKEN", "")
            run_id = os.environ.get("GITHUB_RUN_ID", "")
            require(bool(gh_token) and re.fullmatch("[1-9][0-9]*", run_id), "dispatch_identity")
            run = json.loads(qual.github_get("https://api.github.com/repos/"+REPO+"/actions/runs/"+run_id, gh_token, 1048576))
            original_mono = time.monotonic()
            context = upload_context(os.environ, run, checkout, datetime.now(timezone.utc), packet)
            deadline = original_mono+context["remainingSeconds"]
        # First attempt only is also used for the verification tag; reruns must not silently renew upload authority.
        run_id = os.environ.get("GITHUB_RUN_ID", "")
        require(re.fullmatch("[1-9][0-9]*", run_id), "run_identity")
        tag = profile["sourceRevision"][:8]+"-r"+run_id+"-a1"
        runner = Path(os.environ.get("RUNNER_TEMP", ""))
        require(runner.is_absolute() and runner.is_dir(), "runner_temp")
        package = Path(tempfile.mkdtemp(prefix="afw-public-inactive-", dir=runner))/"package"
        receipt["phase"] = "package"
        extract_qualified(data, inventory, contract["artifact"]["sha256"], package)
        config = package/"wrangler-upload.json"
        config.write_text(json.dumps(upload_config(), indent=2)+"\n")
        executable = ROOT/"node_modules/.bin/wrangler"
        require(executable.is_file(), "locked_uploader_unavailable")
        version = child([str(executable), "--version"], ROOT, "", deadline=time.monotonic()+15).strip()
        require(version == "4.128.0", "locked_uploader_version")
        if mode == "verify_only":
            receipt["phase"] = "offline_dry_run"
            child(wrangler_command(executable, config, tag, True, packet), package, "", deadline=deadline)
            verify_files(package, inventory)
            receipt.update({"ok": True, "archiveExtractedInRunner": True, "files": inventory["files"],
                            "wranglerVersion": version, "remoteConfigurationChecked": False, "publicationReady": False})
        else:
            def before():
                receipt["phase"] = "fresh_state"
                require(remaining() > 0, "dispatch_expired")
                check_state(read_state(expected, token, remaining), expected)
                require(datetime.now(timezone.utc) < qual.parse_time(contract["artifact"]["expiresAt"]), "package_expired")
            def upload():
                receipt["phase"] = "single_inactive_upload"
                require(remaining() > 0, "dispatch_expired")
                receipt["uploadAttempted"] = True
                save()  # A timeout/unknown ACK never causes an automatic retry.
                stdout = child(wrangler_command(executable, config, tag, False, packet), package, token, deadline=deadline)
                ids = re.findall(r"Worker Version ID:\s*(" + UUID + ")", stdout)
                require(len(ids) == 1, "upload_ack_unknown")
                return ids[0]
            def after(candidate_id):
                receipt["phase"] = "readback"
                # Read-only closure is allowed after deadline; no more mutation is possible here.
                bounded_read = lambda: 10
                state = read_state(expected, token, bounded_read)
                check_state(state, expected)
                candidate = cf_get("/versions/"+candidate_id, token, 10)
                require(candidate.get("annotations", {}).get("workers/tag") == tag
                        and bindings_hash(candidate["resources"]["bindings"]) == expected["bindingsSha256"]
                        and digest(candidate["resources"]["script_runtime"]) == expected["runtimeSha256"], "candidate_drift")
                require(all(v["version_id"] != candidate_id for v in state["deployment"]["versions"]), "candidate_active")
                verify_files(package, inventory)
                return {"ok": True, "versionId": candidate_id, "tag": tag,
                        "activeDeploymentId": state["deployment"]["id"], "configurationPreserved": True,
                        "files": inventory["files"], "wranglerVersion": version, "publicationReady": False}
            receipt.update(upload_once(token, before, upload, after))
        receipt["phase"] = "complete"
        save()
        print(json.dumps(receipt))
    except Exception:
        save()
        print(json.dumps({"ok": False, "phase": receipt["phase"], "uploadAttempted": receipt["uploadAttempted"],
                          "trafficPromotion": False, "operationalReadiness": False}), file=sys.stderr)
        raise SystemExit(2) from None

if __name__ == "__main__":
    try:
        main()
    except SystemExit:
        raise
    except Exception:
        # Never expose HTTP headers/body, credentials, private pin, raw CLI output or traceback.
        print("Public inactive upload unavailable; no promotion attempted.", file=sys.stderr)
        sys.exit(2)
