"""One fixed public activation in GitHub; never accepts caller-selected resources."""
import importlib.util
import json
import os
import re
import signal
import subprocess
import sys
import time
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location("inactive",ROOT/"scripts/public-inactive-upload.py")
upl=importlib.util.module_from_spec(spec)
spec.loader.exec_module(upl)
OLD="ad126c2c-d049-4083-9f41-b9879ee3fdd9"
NEW="29ff6775-2f8f-4318-81c8-c8931c6a4973"
PREVIOUS="0fd30778-70ce-406f-8757-69bb29a21c09"
INITIAL="b74ea9d6-0bff-4d1f-b7b6-5b6283c0c819"
WORKFLOW=".github/workflows/afw-public-case-v2-activation.yml"
SMOKE_SHA="907bd74247f0b1a69bae7259101b311fa7357b8d94c27e3a14d491bb048f741e"
OBSERVER_SHA="e0ee4d9defd1615c2be129850407fc613ac44bad5b04abdd505ed8e5cee1f80f"
INVENTORY_SHA="adeb65c8031aee8f0d25c688b7b11d159740e83d217fb4b7697492e752ec1825"
TAG="df9896f0-r41680994050-a1"

def traffic(active,inactive):
    return [{"version_id":active,"percentage":100},{"version_id":inactive,"percentage":0}]

def same_traffic(actual,expected):
    if not isinstance(actual,list) or len(actual)!=2: return False
    if any(not isinstance(x,dict) or set(x)!={"version_id","percentage"} for x in actual): return False
    return len({x["version_id"] for x in actual})==2 and sorted(actual,key=lambda x:x["version_id"])==sorted(expected,key=lambda x:x["version_id"])

def marker(receipt,phase):
    upl.require(phase in ("stage0","promote","rollback") and re.fullmatch("[1-9][0-9]*",str(receipt["runId"])),"marker_scope")
    return "AFW public-case-v2 r"+str(receipt["runId"])+" a1 "+phase

def owned(state,receipt,phase):
    return state.get("owner")==marker(receipt,phase)

def bounded_io(action,seconds):
    """Bound the whole Linux HTTP operation, including a slowly dripping body."""
    upl.require(isinstance(seconds,(int,float)) and 0<seconds<=10,"io_deadline")
    upl.require(signal.getitimer(signal.ITIMER_REAL)==(0.0,0.0),"existing_io_alarm")
    prior=signal.getsignal(signal.SIGALRM)
    def expired(*_):raise TimeoutError("provider_operation_deadline")
    signal.signal(signal.SIGALRM,expired)
    try:
        signal.setitimer(signal.ITIMER_REAL,seconds)
        return action()
    finally:
        signal.setitimer(signal.ITIMER_REAL,0)
        signal.signal(signal.SIGALRM,prior)

def same_snapshot(actual,expected):
    return (isinstance(actual,dict) and isinstance(expected,dict)
            and actual.get("id")==expected.get("id") and actual.get("owner")==expected.get("owner")
            and same_traffic(actual.get("versions"),expected.get("versions")))

def prewrite_fence(read_snapshot,read_deployment,expected):
    """Final deployment GET follows every metadata read. API has no documented CAS."""
    current=read_snapshot()
    upl.require(same_snapshot(current,expected),"prewrite_metadata_drift")
    final=read_deployment()
    upl.require(same_snapshot(final,current),"prewrite_deployment_drift")
    return final

def deployment_view(dep):
    return {"id":dep["id"],"versions":dep["versions"],"owner":dep.get("annotations",{}).get("workers/message","")}

def deployment_ack_diagnostic(payload,versions):
    """Safe shape/presence only; absent fields must not be mistaken for conflicts."""
    inner=payload.get("result") if isinstance(payload,dict) and "success" in payload else payload
    return {
        "shape":"envelope" if isinstance(payload,dict) and "success" in payload else "direct" if isinstance(payload,dict) and "id" in payload else "other",
        "successIsTrue":isinstance(payload,dict) and payload.get("success") is True,
        "idIsUuid":isinstance(inner,dict) and isinstance(inner.get("id"),str) and re.fullmatch(upl.UUID,inner["id"]) is not None,
        "versionsPresent":isinstance(inner,dict) and "versions" in inner,
        "strategyPresent":isinstance(inner,dict) and "strategy" in inner,
        "versionsMatch":isinstance(inner,dict) and same_traffic(inner.get("versions"),versions),
        "strategyMatches":isinstance(inner,dict) and inner.get("strategy")=="percentage"}

def parse_deployment_ack(payload,versions):
    """An identifier ACK is provisional; actual traffic always requires readback."""
    upl.require(isinstance(payload,dict),"deployment_ack_schema")
    if "success" in payload:
        upl.require(payload.get("success") is True and isinstance(payload.get("result"),dict)
                    and not any(k in payload for k in ("id","versions","strategy")),"deployment_ack_schema")
        result=payload["result"]
        shape="envelope"
    else:
        upl.require("result" not in payload,"deployment_ack_schema")
        result=payload
        shape="direct"
    upl.require(isinstance(result.get("id"),str) and re.fullmatch(upl.UUID,result["id"]),"deployment_ack_schema")
    upl.require("strategy" not in result or result["strategy"]=="percentage","deployment_ack_schema")
    upl.require("versions" not in result or same_traffic(result["versions"],versions),"deployment_ack_schema")
    ack={"id":result["id"],"ackShape":shape,
         "ackCompleteness":"complete" if all(k in result for k in ("versions","strategy")) else "provisional"}
    if "versions" in result:ack["versions"]=result["versions"]
    return ack

def staged_state(state,receipt,already_staged):
    return not already_staged and owned(state,receipt,"stage0")

def activate(read,write,observe,remaining,receipt,save,already_staged=False):
    """Trusted adapters; no retry of a mutation, including after an unknown ACK."""
    def mutate(phase,versions):
        upl.require(remaining()>0 and phase not in receipt["mutationAttempts"],"mutation_expired_or_repeated")
        receipt["mutationAttempts"].append(phase)
        if phase=="promote":
            receipt.update(trafficPromotionAttempted=True,trafficPromotion=None)
        receipt["phase"]=phase
        save()
        result=write(phase,versions)
        # A returned identifier, even a complete ACK, is not provider readback.
        return result
    try:
        upl.require(already_staged is False,"stage_adoption_denied")
        initial=read()
        upl.require(remaining()>=240,"insufficient_original_budget")
        upl.require(initial["id"]==INITIAL and same_traffic(initial["versions"],traffic(OLD,PREVIOUS)),"initial_drift")
        staged=mutate("stage0",traffic(OLD,NEW))
        current=read()
        upl.require(current["id"]==staged["id"] and staged_state(current,receipt,already_staged)
                    and same_traffic(current["versions"],traffic(OLD,NEW)),"stage0_drift")
        receipt["stage0"]=observe("stage0",60)
        upl.require(receipt["stage0"].get("ok") is True,"stage0_acceptance")
        current=read()
        upl.require(current["id"]==staged["id"] and staged_state(current,receipt,already_staged)
                    and same_traffic(current["versions"],traffic(OLD,NEW)),"stage0_drift")
        # Worst bounded late-failure path: 60+30+40+40+60+40+40=310s.
        # Keep 50s additional margin inside the original, never-renewed authority.
        upl.require(remaining()>=360,"insufficient_recovery_budget")
        promoted=mutate("promote",traffic(NEW,OLD))
        receipt["normal"]=observe("normal",30)
        upl.require(receipt["normal"].get("ok") is True,"normal_acceptance")
        current=read()
        upl.require(current["id"]==promoted["id"] and owned(current,receipt,"promote")
                    and same_traffic(current["versions"],traffic(NEW,OLD)),"promotion_drift")
        receipt.update(ok=True,phase="accepted",activeDeploymentId=current["id"],activeVersion=NEW,
                       trafficPromotion=True,trafficReadbackVerified=True)
    except Exception as error:
        receipt.update(ok=False,error="activation_or_acceptance_failed")
        allowed_reasons={"deployment_ack_schema","deployment_ack_http_or_size","prewrite_metadata_drift",
                         "prewrite_deployment_drift","fixed_stage0_drift","stage0_acceptance","normal_acceptance",
                         "insufficient_recovery_budget","stage0_drift","promotion_drift"}
        receipt["failureReason"]=str(error) if isinstance(error,ValueError) and str(error) in allowed_reasons else "unclassified"

        # Reads may close evidence after expiry, but they cannot renew mutation authority.
        try:
            current=read()
            old_serving=same_traffic(current["versions"],traffic(OLD,NEW))
            if (current["id"]==INITIAL and same_traffic(current["versions"],traffic(OLD,PREVIOUS))) or (old_serving and (staged_state(current,receipt,already_staged) or owned(current,receipt,"rollback"))):
                receipt.update(oldServing=True,phase="unknown_promotion_ack_old_observed" if receipt.get("trafficPromotionAttempted") and receipt.get("trafficPromotion") is None else "not_promoted_or_recovered")
            elif owned(current,receipt,"promote") and same_traffic(current["versions"],traffic(NEW,OLD)):
                receipt["trafficPromotion"]=True
                save()
                upl.require(remaining()>0,"recovery_authority_expired")
                try:
                    rolled=mutate("rollback",traffic(OLD,NEW))
                    current=read()
                    upl.require(current["id"]==rolled["id"] and owned(current,receipt,"rollback")
                                and same_traffic(current["versions"],traffic(OLD,NEW)),"rollback_drift")
                    receipt.update(rollbackVerified=True,oldServing=True,phase="rolled_back")
                except Exception:
                    # Unknown rollback ACK: one readback, never repeat the POST.
                    current=read()
                    verified=owned(current,receipt,"rollback") and same_traffic(current["versions"],traffic(OLD,NEW))
                    receipt.update(rollbackVerified=verified,oldServing=verified,phase="rollback_reconciled" if verified else "closure_unconfirmed")
            else:
                receipt.update(foreignActivity=True,phase="closure_not_authorized")
        except Exception:
            receipt["phase"]="closure_unconfirmed"
    save()
    return receipt

def dispatch_context(env,run,checkout,now):
    upl.require(env.get("GITHUB_ACTIONS")=="true" and env.get("GITHUB_REPOSITORY")==upl.REPO
                and env.get("GITHUB_EVENT_NAME")=="workflow_dispatch" and env.get("GITHUB_REF")=="refs/heads/main"
                and env.get("GITHUB_RUN_ATTEMPT")=="1","dispatch_scope")
    upl.require(re.fullmatch("[a-f0-9]{40}",checkout or "") and env.get("GITHUB_SHA")==checkout
                and run.get("head_sha")==checkout and str(run.get("id"))==env.get("GITHUB_RUN_ID")
                and run.get("run_attempt")==1 and run.get("event")=="workflow_dispatch"
                and run.get("path")==WORKFLOW,"dispatch_identity")
    upl.require(all(run.get(k,{}).get("full_name")==upl.REPO for k in ("repository","head_repository")),"dispatch_repository")
    age=(now-upl.qual.parse_time(run["created_at"])).total_seconds()
    upl.require(0<=age<600,"dispatch_expired")
    return 600-age

def packet():
    spec = importlib.util.spec_from_file_location("e62_preparation", ROOT/"scripts/prepare-public-case-v2-delivery.py")
    preparation = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(preparation)
    contract,inventory=preparation.qualifier.load_delivery_packet(ROOT,"config/public-case-v2-delivery.v1.json")
    preparation.profile.check_profile_contract(contract)
    raw=(ROOT/contract["inventoryPath"]).read_bytes()
    upl.require(upl.hash_bytes(raw)==INVENTORY_SHA and contract["artifact"]["id"]==13251682820
                and contract["artifact"]["sha256"]=="7de67d9f0ec9e6dae77051afc0125ad5d5b0b03836bc5904aa0315f759e884c3","packet_drift")
    upl.require(upl.hash_bytes((ROOT/"scripts/smoke-cloudflare-native-local.mjs").read_bytes())==SMOKE_SHA,"smoke_drift")
    upl.require(upl.hash_bytes((ROOT/"scripts/public-case-v2-acceptance.mjs").read_bytes())==OBSERVER_SHA,"observer_drift")
    dependencies = {
        "lib/public-faq.mjs": "5d0ee29ca677caa39ec624712eac6df55e778ca5e6fc2bb9e88544342b6e6ab0",
        "lib/public-tools-copy.mjs": "325a8d6a5350e526a192a3986a8eb048baba3a5eba7afa0530cc10fac608b6a9",
        "lib/home-copy.mjs": "cce7d886b68c4b639aea3f3511853083c2f93269bba6f5040069f5e64a757d55",
        "lib/site-i18n.mjs": "660f9dde676190ad246e9e5c445ccea02d7fa2fb73366fc7d2c0c4317aea201d",
        "lib/public-capability-copy.mjs": "778fc23d9040acd17df3699383d2736898293cde3c0d7fefef551267b69f5db5",
        "lib/maturity-copy.mjs": "c17eb36ec1355a39a953210c71f36a477ea6f1f83ab6b3cd080671743b724a97",
    }
    for path, expected in dependencies.items():
        upl.require(upl.hash_bytes((ROOT/path).read_bytes())==expected,"observer_dependency_drift")
    upl.require(contract["baseline"]["versionId"]==OLD and contract["baseline"]["deploymentId"]==INITIAL,"baseline_scope")
    return contract,inventory

def main():
    mode=sys.argv[1] if len(sys.argv)==2 else ""
    upl.require(mode in ("verify_only","activate"),"operation")
    contract,_=packet()
    receipt={"kind":"fixed_public_case_v2_cloud_activation","mode":mode,"ok":False,"runId":os.environ.get("GITHUB_RUN_ID",""),
             "mutationAttempts":[],"trafficPromotion":False,"operationalReadiness":False,"privateAcceptance":False,
             "sourceRevision":contract["sourceRevision"],"candidateId":NEW,"rollbackVersionId":OLD,"phase":"runner"}
    def save():
        receipt["checkedAt"]=datetime.now(timezone.utc).isoformat()
        (ROOT/"output").mkdir(exist_ok=True)
        (ROOT/"output/public-case-v2-activation-receipt.json").write_text(json.dumps(receipt,indent=2)+"\n")
    try:
        upl.require(os.environ.get("GITHUB_ACTIONS")=="true" and os.environ.get("GITHUB_REPOSITORY")==upl.REPO,"runner_scope")
        checkout=subprocess.run(["git","rev-parse","--verify","HEAD"],cwd=ROOT,capture_output=True,text=True,timeout=5,check=True).stdout.strip()
        upl.qual.qualifier_context(os.environ,checkout)
        receipt["controllerRevision"]=checkout
        if mode=="verify_only":
            receipt.update(ok=True,phase="source_verified",runtimeChecked=False)
            save()
            print(json.dumps(receipt))
            return
        token=os.environ.get("CLOUDFLARE_API_TOKEN","")
        gh=os.environ.get("GH_TOKEN","")
        upl.require(bool(token.strip()) and bool(gh),"credential_unavailable")
        run_id=os.environ.get("GITHUB_RUN_ID","")
        upl.require(re.fullmatch("[1-9][0-9]*",run_id),"dispatch_identity")
        run=json.loads(upl.qual.github_get("https://api.github.com/repos/"+upl.REPO+"/actions/runs/"+run_id,gh,1048576))
        original_mono=time.monotonic()
        left=dispatch_context(os.environ,run,checkout,datetime.now(timezone.utc))
        deadline=original_mono+left
        remaining=lambda:deadline-time.monotonic()
        upl.require(datetime.now(timezone.utc)<upl.qual.parse_time(contract["artifact"]["expiresAt"]),"package_expired")
        # Immutable candidate read before any write. Credential never enters the observer.
        def provider_get(suffix):
            return bounded_io(lambda:upl.cf_get(suffix,token,10),10)
        candidate=provider_get("/versions/"+NEW)
        expected=contract["baseline"]
        upl.require(candidate["id"]==NEW and candidate.get("annotations",{}).get("workers/tag")==TAG
                    and upl.bindings_hash(candidate["resources"]["bindings"])==expected["bindingsSha256"]
                    and upl.digest(candidate["resources"]["script_runtime"])==expected["runtimeSha256"],"candidate_drift")
        last={}
        ack={}
        def read():
            dep=provider_get("/deployments")["deployments"][0]
            positive=[v for v in dep["versions"] if v["percentage"]!=0]
            upl.require(len(positive)==1 and positive[0]["percentage"]==100 and positive[0]["version_id"] in (OLD,NEW),"traffic_scope")
            v=positive[0]["version_id"]
            exp={**expected,"versionId":v,"deploymentId":dep["id"]}
            state={"deployment":dep,"version":provider_get("/versions/"+v),
                   "settings":provider_get("/settings"),"subdomain":provider_get("/subdomain")}
            upl.check_state(state,exp)
            view=deployment_view(dep)
            last["snapshot"]=view
            return view
        def observe(phase,seconds):
            # Normal deadline starts at the promotion ACK, not at observer start.
            end=min(deadline,ack["promote"]+30 if phase=="normal" else time.monotonic()+seconds)
            upl.require(end>time.monotonic(),"observer_expired")
            utc_end=int(time.time()*1000+(end-time.monotonic())*1000)
            raw=upl.child(["node",str(ROOT/"scripts/public-case-v2-acceptance.mjs"),phase,str(utc_end)],ROOT,"",deadline=end)
            report=json.loads(raw)
            upl.require(report.get("mode")==phase and report.get("operationalReadiness") is False,"observer_receipt")
            return report
        receipt["baseline"]=observe("baseline",60)
        upl.require(receipt["baseline"].get("ok") is True,"public_baseline")
        def write(phase,versions):
            # Recheck configuration/current deployment immediately before this single POST.
            expected_snapshot=last.get("snapshot")
            prewrite_fence(read,lambda:deployment_view(provider_get("/deployments")["deployments"][0]),expected_snapshot)
            upl.require(remaining()>0,"prewrite_expiry")
            upl.require(datetime.now(timezone.utc)<upl.qual.parse_time(contract["artifact"]["expiresAt"]),"package_expired")
            body={"strategy":"percentage","versions":versions,"annotations":{"workers/message":marker(receipt,phase)}}
            request=urllib.request.Request("https://api.cloudflare.com/client/v4"+upl.BASE+"/deployments",
                     data=json.dumps(body).encode(),headers={"Authorization":"Bearer "+token,"Content-Type":"application/json","Accept":"application/json"},method="POST")
            opener=urllib.request.build_opener(urllib.request.ProxyHandler({}),upl.qual.NoRedirect())
            def send_once():
                with opener.open(request,timeout=min(10,remaining())) as response:
                    receipt[phase+"HttpStatus"]=response.status
                    data=response.read(1048577)
                    save()
                    upl.require(response.status==200 and len(data)<=1048576,"deployment_ack_http_or_size")
                payload=json.loads(data)
                receipt[phase+"Response"]=deployment_ack_diagnostic(payload,versions)
                save()
                return parse_deployment_ack(payload,versions)
            result=bounded_io(send_once,min(10,remaining()))
            receipt[phase+"AckShape"]=result["ackShape"]
            receipt[phase+"AckCompleteness"]=result["ackCompleteness"]
            ack[phase]=time.monotonic()
            receipt[phase+"AckAt"]=datetime.now(timezone.utc).isoformat()
            save()
            return result
        activate(read,write,observe,remaining,receipt,save,already_staged=False)
        print(json.dumps(receipt))
        if not receipt["ok"]: raise SystemExit(2)
    except SystemExit:
        raise
    except Exception:
        receipt.update(ok=False,error="activation_unavailable")
        save()
        print(json.dumps({"ok":False,"phase":receipt["phase"],"mutationAttempts":receipt["mutationAttempts"],"operationalReadiness":False}),file=sys.stderr)
        raise SystemExit(2) from None

if __name__=="__main__":
    try:main()
    except SystemExit:raise
    except Exception:
        print("Fixed public activation unavailable; no retry.",file=sys.stderr)
        sys.exit(2)
