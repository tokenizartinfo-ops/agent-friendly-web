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
OLD="29927b77-1e41-47df-9854-ab9830f84755"
NEW="1772ceae-7e8d-4dbc-bc1d-0ade956a3e45"
PREVIOUS="8fc686dd-bcf4-4445-a8d9-fdb8fc3224ff"
INITIAL="3cec273c-50ef-4010-b813-f917c3b1169d"
WORKFLOW=".github/workflows/afw-public-json-activation.yml"
SMOKE_SHA="907bd74247f0b1a69bae7259101b311fa7357b8d94c27e3a14d491bb048f741e"
INVENTORY_SHA="d008e8a79ff789dbe78b294fb7c7ebcb5915068cf15d54347fe6b3b747e4c4a2"
TAG="d3b638a4-r40146576430-a1"

def traffic(active,inactive):
    return [{"version_id":active,"percentage":100},{"version_id":inactive,"percentage":0}]

def same_traffic(actual,expected):
    if not isinstance(actual,list) or len(actual)!=2: return False
    if any(not isinstance(x,dict) or set(x)!={"version_id","percentage"} for x in actual): return False
    return len({x["version_id"] for x in actual})==2 and sorted(actual,key=lambda x:x["version_id"])==sorted(expected,key=lambda x:x["version_id"])

def marker(receipt,phase):
    upl.require(phase in ("stage0","promote","rollback") and re.fullmatch("[1-9][0-9]*",str(receipt["runId"])),"marker_scope")
    return "AFW public-json r"+str(receipt["runId"])+" a1 "+phase

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

def activate(read,write,observe,remaining,receipt,save):
    """Trusted adapters; no retry of a mutation, including after an unknown ACK."""
    def mutate(phase,versions):
        upl.require(remaining()>0 and phase not in receipt["mutationAttempts"],"mutation_expired_or_repeated")
        receipt["mutationAttempts"].append(phase)
        if phase=="promote":
            receipt.update(trafficPromotionAttempted=True,trafficPromotion=None)
        receipt["phase"]=phase
        save()
        result=write(phase,versions)
        if phase=="promote":
            receipt["trafficPromotion"]=True
            save()
        return result
    try:
        initial=read()
        upl.require(initial["id"]==INITIAL and same_traffic(initial["versions"],traffic(OLD,PREVIOUS)),"initial_drift")
        upl.require(remaining()>=240,"insufficient_original_budget")
        staged=mutate("stage0",traffic(OLD,NEW))
        current=read()
        upl.require(current["id"]==staged["id"] and owned(current,receipt,"stage0")
                    and same_traffic(current["versions"],traffic(OLD,NEW)),"stage0_drift")
        receipt["stage0"]=observe("stage0",60)
        upl.require(receipt["stage0"].get("ok") is True,"stage0_acceptance")
        current=read()
        upl.require(current["id"]==staged["id"] and owned(current,receipt,"stage0")
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
        receipt.update(ok=True,phase="accepted",activeDeploymentId=current["id"],activeVersion=NEW)
    except Exception:
        receipt.update(ok=False,error="activation_or_acceptance_failed")
        # Reads may close evidence after expiry, but they cannot renew mutation authority.
        try:
            current=read()
            old_serving=same_traffic(current["versions"],traffic(OLD,NEW))
            if (current["id"]==INITIAL and same_traffic(current["versions"],traffic(OLD,PREVIOUS))) or (old_serving and (owned(current,receipt,"stage0") or owned(current,receipt,"rollback"))):
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
    contract,inventory=upl.qual.load_delivery_packet(ROOT,"config/public-json-budget-delivery.v1.json")
    upl.check_packet_contract(contract,"json_budget")
    raw=(ROOT/contract["inventoryPath"]).read_bytes()
    upl.require(upl.hash_bytes(raw)==INVENTORY_SHA and contract["artifact"]["id"]==12576173498
                and contract["artifact"]["sha256"]=="564feba6fbbbc685434d12b6d8aa42aa61f34242d80ee6e58c929e028ea64549","packet_drift")
    upl.require(upl.hash_bytes((ROOT/"scripts/smoke-cloudflare-native-local.mjs").read_bytes())==SMOKE_SHA,"smoke_drift")
    upl.require(contract["baseline"]["versionId"]==OLD and contract["baseline"]["deploymentId"]==INITIAL,"baseline_scope")
    return contract,inventory

def main():
    mode=sys.argv[1] if len(sys.argv)==2 else ""
    upl.require(mode in ("verify_only","activate"),"operation")
    contract,_=packet()
    receipt={"kind":"fixed_public_json_cloud_activation","mode":mode,"ok":False,"runId":os.environ.get("GITHUB_RUN_ID",""),
             "mutationAttempts":[],"trafficPromotion":False,"operationalReadiness":False,"privateAcceptance":False,
             "sourceRevision":contract["sourceRevision"],"candidateId":NEW,"rollbackVersionId":OLD,"phase":"runner"}
    def save():
        receipt["checkedAt"]=datetime.now(timezone.utc).isoformat()
        (ROOT/"output").mkdir(exist_ok=True)
        (ROOT/"output/public-json-activation-receipt.json").write_text(json.dumps(receipt,indent=2)+"\n")
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
            raw=upl.child(["node",str(ROOT/"scripts/public-json-acceptance.mjs"),phase,str(utc_end)],ROOT,"",deadline=end)
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
                    data=response.read(1048577)
                    upl.require(response.status==200 and len(data)<=1048576,"deployment_ack_unknown")
                result=json.loads(data)
                upl.require(result.get("success") is True,"deployment_ack_unknown")
                result=result["result"]
                upl.require(re.fullmatch(upl.UUID,result.get("id","")) and same_traffic(result.get("versions"),versions),"deployment_ack_unknown")
                return result
            result=bounded_io(send_once,min(10,remaining()))
            ack[phase]=time.monotonic()
            receipt[phase+"AckAt"]=datetime.now(timezone.utc).isoformat()
            if phase=="promote":receipt["trafficPromotion"]=True
            save()
            return result
        activate(read,write,observe,remaining,receipt,save)
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
