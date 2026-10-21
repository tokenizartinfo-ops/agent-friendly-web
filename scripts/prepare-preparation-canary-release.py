"""Prepare an exact closed AFW Worker package; no Cloudflare calls or activation."""
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

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location("public_delivery_reader",ROOT/"scripts/prepare-public-cloud-delivery.py")
reader=importlib.util.module_from_spec(spec);spec.loader.exec_module(reader)
REPOSITORY=reader.REPOSITORY
require=reader.require
sha256=reader.sha256

def canonical(value):
    return json.dumps(value,sort_keys=True,separators=(",",":"),allow_nan=False)

def closed_profile():
    return {"name":"agent-friendly-web-preparation-canary","account_id":"85d0d5dadac3341a564f22ce885e9eec",
            "main":"index.mjs","no_bundle":True,"compatibility_date":"2026-09-07","compatibility_flags":["nodejs_compat"],
            "workers_dev":False,"preview_urls":False,"keep_vars":False,"observability":{"enabled":False},
            "logpush":False,"tail_consumers":[],
            "vars":{"AFW_DELEGATED_PREPARATION_ROUTER_ENABLED":"false","AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED":"false",
                    "AFW_DELEGATED_OAUTH_ENABLED":"false","AFW_DELEGATED_PREPARATION_ENABLED":"false"}}

def validate_closed_profile(value):
    require(canonical(value)==canonical(closed_profile()),"closed profile mismatch")

def qualify_package(data,contract):
    a,b=contract["artifact"],contract["build"]
    require(isinstance(data,bytes) and 0<len(data)==a["bytes"]<=2097152,"package size")
    require(sha256(data)==a["sha256"],"package digest")
    require(type(b["workerBytes"]) is int and 0<b["workerBytes"]<=2097152,"Worker size")
    try:
        with zipfile.ZipFile(io.BytesIO(data)) as z:
            infos=z.infolist()
            require(len(infos)==2 and {v.orig_filename for v in infos}=={"index.mjs","build.json"},"package files")
            values={}
            for item in infos:
                require(item.filename==item.orig_filename and not item.is_dir(),"package path")
                require(not item.flag_bits&1 and item.compress_type in (zipfile.ZIP_STORED,zipfile.ZIP_DEFLATED),"package encoding")
                require(stat.S_IFMT(item.external_attr>>16) in (0,stat.S_IFREG),"package file type")
                limit=b["workerBytes"] if item.filename=="index.mjs" else 8192
                require(0<item.file_size<=limit,"package entry size")
                with z.open(item) as stream:
                    value=stream.read(limit+1)
                    require(len(value)==item.file_size<=limit,"package entry size")
                values[item.filename]=value
    except (zipfile.BadZipFile,zipfile.LargeZipFile,RuntimeError,EOFError,OSError,NotImplementedError):
        raise ValueError("package archive integrity") from None
    script=values["index.mjs"]
    require(len(script)==b["workerBytes"] and sha256(script)==b["workerHash"],"Worker digest")
    try:
        build=json.loads(values["build.json"].decode("utf-8"))
        script.decode("utf-8")
    except (ValueError,UnicodeError):
        raise ValueError("package text") from None
    require(canonical(build)==canonical(b),"build metadata")
    return {"script":script,"build":build}

def validate_pair_contract(contract):
    require(isinstance(contract,dict) and contract.get("schemaVersion")==2
            and contract.get("project")=="AFW" and contract.get("repository")==REPOSITORY
            and contract.get("allowedAction")=="prepare_closed_profile_only"
            and contract.get("activationReady") is False and contract.get("operationalReadiness") is False,"contract scope")
    profile=closed_profile()
    target=contract.get("target",{})
    require(target.get("accountId")==profile["account_id"] and target.get("worker")==profile["name"]
            and target.get("origin") is None,"target profile")
    rollback=contract.get("rollback",{})
    require(rollback.get("kind")=="retained_build_artifact","rollback provenance kind")
    def exact_hex(value,size):
        return isinstance(value,str) and len(value)==size and all(c in "0123456789abcdef" for c in value)
    def version(value):
        return isinstance(value,str) and len(value)==36 and [len(p) for p in value.split("-")]==[8,4,4,4,12] and exact_hex(value.replace("-",""),32)
    current=contract.get("evidence",{}).get("workerVersionId")
    require(version(current) and version(rollback.get("workerVersionId"))
            and current!=rollback["workerVersionId"],"rollback version identity")
    for member in (contract,rollback):
        b=member.get("build",{});a=member.get("artifact",{})
        require(b.get("buildOnly") is True and b.get("runtimeConfigIncluded") is False
                and b.get("sourceCheck")=="git-inputs-before-after-v1"
                and exact_hex(b.get("sourceRevision"),40) and exact_hex(b.get("sourceTree"),40)
                and exact_hex(b.get("workerHash"),64),"immutable build scope")
        require(type(a.get("id")) is int and a["id"]>0 and type(a.get("runId")) is int and a["runId"]>0,"artifact reference")
    require(contract["artifact"]["id"]!=rollback["artifact"]["id"]
            and contract["artifact"]["runId"]!=rollback["artifact"]["runId"]
            and contract["build"]["sourceRevision"]!=rollback["build"]["sourceRevision"],"rollback alias")

def qualify_pair(candidate_data,rollback_data,contract):
    validate_pair_contract(contract)
    return {"candidate":qualify_package(candidate_data,contract),
            "rollback":qualify_package(rollback_data,contract["rollback"])}

def check_build_provenance(contract,artifact,run,now):
    a,b=contract["artifact"],contract["build"]
    require(artifact.get("id")==a["id"] and artifact.get("name")==a["name"],"artifact identity")
    require(artifact.get("size_in_bytes")==a["bytes"] and artifact.get("digest")=="sha256:"+a["sha256"],"artifact digest")
    require(artifact.get("expired") is False,"artifact expired")
    expiry=reader.parse_time(artifact.get("expires_at"))
    require(expiry==reader.parse_time(a["expiresAt"]) and expiry>now,"artifact expiry")
    arun=artifact.get("workflow_run",{})
    require(arun.get("id")==a["runId"] and arun.get("head_sha")==b["sourceRevision"],"artifact source")
    require(run.get("id")==a["runId"] and run.get("run_attempt")==a["runAttempt"],"build run")
    require(run.get("head_sha")==b["sourceRevision"] and run.get("head_branch")=="main" and run.get("event")=="push","build source")
    require(run.get("path")==a["workflow"] and run.get("status")=="completed" and run.get("conclusion")=="success","build status")
    require(all(run.get(k,{}).get("full_name")==REPOSITORY for k in ("repository","head_repository")),"build repository")

def main():
    require(os.environ.get("GITHUB_ACTIONS")=="true" and os.environ.get("GITHUB_REPOSITORY")==REPOSITORY,"runner identity")
    checkout=subprocess.run(["git","rev-parse","--verify","HEAD"],cwd=ROOT,
                            env={"PATH":os.environ["PATH"],"HOME":os.environ.get("HOME","")},
                            check=True,capture_output=True,text=True,timeout=5).stdout.strip()
    qualifier=reader.qualifier_context(os.environ,checkout)
    contract=json.loads((ROOT/"config/preparation-canary-release.v2.json").read_text())
    validate_pair_contract(contract)
    profile=closed_profile();validate_closed_profile(profile)
    token=os.environ.get("GH_TOKEN","");require(bool(token),"GitHub reader unavailable")
    base="https://api.github.com/repos/"+REPOSITORY+"/actions/"
    packages={};provenance={}
    for role,member in (("candidate",contract),("rollback",contract["rollback"])):
        a=member["artifact"]
        artifact=json.loads(reader.github_get(base+"artifacts/"+str(a["id"]),token,1048576))
        run=json.loads(reader.github_get(base+"runs/"+str(a["runId"]),token,1048576))
        check_build_provenance(member,artifact,run,datetime.now(timezone.utc))
        packages[role]=reader.github_get(base+"artifacts/"+str(a["id"])+"/zip",token,a["bytes"],archive=True)
        provenance[role]=(member,artifact,run)
    result=qualify_pair(packages["candidate"],packages["rollback"],contract)
    for member,artifact,run in provenance.values():
        check_build_provenance(member,artifact,run,datetime.now(timezone.utc))
    output=ROOT/"output/preparation-canary-release"
    require(not output.exists() and not output.is_symlink(),"output already exists")
    output.mkdir(parents=True)
    a=contract["artifact"];r=contract["rollback"];ra=r["artifact"]
    candidate=result["candidate"];rollback=result["rollback"]
    receipt={"kind":"isolated_preparation_release_pair_preflight","checkedAt":datetime.now(timezone.utc).isoformat(),**qualifier,
             "repository":REPOSITORY,"sourceRevision":contract["build"]["sourceRevision"],"sourceTree":contract["build"]["sourceTree"],
             "artifactId":a["id"],"artifactSha256":a["sha256"],"originalExpiresAt":a["expiresAt"],
             "workerHash":contract["build"]["workerHash"],"workerBytes":len(candidate["script"]),
             "rollbackKind":r["kind"],"rollbackVersionId":r["workerVersionId"],
             "rollbackSourceRevision":r["build"]["sourceRevision"],"rollbackSourceTree":r["build"]["sourceTree"],
             "rollbackArtifactId":ra["id"],"rollbackArtifactSha256":ra["sha256"],"rollbackOriginalExpiresAt":ra["expiresAt"],
             "rollbackHash":r["build"]["workerHash"],"rollbackBytes":len(rollback["script"]),
             "profileSha256":sha256(canonical(profile).encode()),"profileScope":"synthetic closed execution only; NOT a hosted deployment configuration",
             "target":contract["target"],"targetEvidence":contract["evidence"],
             "nativeClosedQualified":False,"closedUploadReady":False,"activationReady":False,"operationalReadiness":False,
             "remoteMutations":0,"applicationRebuilt":False,"hostedRollbackPerformed":False,
             "pendingActivationGates":contract["activationGates"]}
    (output/"index.mjs").write_bytes(candidate["script"])
    (output/"rollback.mjs").write_bytes(rollback["script"])
    for name,value in [("build.json",candidate["build"]),("rollback-build.json",rollback["build"]),("contract.json",contract),
                       ("wrangler.closed.json",profile),("receipt.json",receipt)]:
        (output/name).write_text(json.dumps(value,indent=2)+"\n")
    print(json.dumps({k:receipt[k] for k in ("sourceRevision","qualifierRevision","artifactId","workerHash","workerBytes","remoteMutations","activationReady")}))

if __name__=="__main__":
    try:main()
    except Exception:
        print("Preparation release unavailable; no remote action performed.",file=sys.stderr);sys.exit(2)
