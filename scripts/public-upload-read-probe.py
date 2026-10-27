"""Bounded diagnosis of the existing public upload identity. Four fixed GETs, no mutation."""
import importlib.util,json,os,re,signal,socket,subprocess,sys,urllib.error,urllib.request
from datetime import datetime,timezone
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sp=importlib.util.spec_from_file_location("uploader",ROOT/"scripts/public-inactive-upload.py")
upl=importlib.util.module_from_spec(sp);sp.loader.exec_module(upl)
PATHS={"/versions/1772ceae-7e8d-4dbc-bc1d-0ade956a3e45":"active_version","/settings":"settings","/deployments":"deployments","/subdomain":"subdomain"}
class ProbeDeadline(Exception):pass

def codes(payload):
 if not isinstance(payload,dict):return []
 errors=payload.get("errors",[])
 if not isinstance(errors,list):return []
 return [x["code"] for x in errors if isinstance(x,dict) and type(x.get("code")) is int][:10]
def probe_path(suffix,token,open_it):
 upl.require(suffix in PATHS and isinstance(token,str) and bool(token.strip()),"probe_scope")
 result={"path":PATHS[suffix],"status":0,"ok":False,"providerCodes":[]}
 try:
  request=urllib.request.Request("https://api.cloudflare.com/client/v4"+upl.BASE+suffix,
   headers={"Authorization":"Bearer "+token,"Accept":"application/json"},method="GET")
  with open_it(request,timeout=10) as response:
   result["status"]=response.status;body=response.read(1048577)
  upl.require(len(body)<=1048576,"body_cap")
  payload=json.loads(body)
  result["providerCodes"]=codes(payload)
  result["ok"]=result["status"]==200 and isinstance(payload,dict) and payload.get("success") is True and "result" in payload
  return result,payload["result"] if result["ok"] else None
 except ProbeDeadline:raise
 except urllib.error.HTTPError as exc:
  result["status"]=exc.code
  try:
   body=exc.read(1048577)
   if len(body)<=1048576:result["providerCodes"]=codes(json.loads(body))
  except ProbeDeadline:raise
  except Exception:pass
  finally:exc.close()
 except (TimeoutError,socket.timeout):
  result["error"]="timeout"
 except Exception:
  result["error"]="transport_or_decode"
 return result,None
def main():
 report={"kind":"public_upload_read_diagnosis","ok":False,"reads":[],"configurationMatches":None,
  "uploadAttempted":False,"mutations":0,"operationalReadiness":False}
 def save():
  report["checkedAt"]=datetime.now(timezone.utc).isoformat()
  (ROOT/"output").mkdir(exist_ok=True)
  (ROOT/"output/public-upload-read-probe.json").write_text(json.dumps(report,indent=2)+"\n")
 try:
  upl.require(os.environ.get("GITHUB_ACTIONS")=="true" and os.environ.get("GITHUB_REPOSITORY")==upl.REPO
   and os.environ.get("GITHUB_EVENT_NAME")=="workflow_dispatch" and os.environ.get("GITHUB_REF")=="refs/heads/main"
   and os.environ.get("GITHUB_RUN_ATTEMPT")=="1","runner_scope")
  revision=os.environ.get("GITHUB_SHA","");run=os.environ.get("GITHUB_RUN_ID","")
  upl.require(re.fullmatch("[a-f0-9]{40}",revision) and re.fullmatch("[1-9][0-9]*",run),"runner_identity")
  actual=subprocess.run(["git","rev-parse","--verify","HEAD"],cwd=ROOT,capture_output=True,text=True,timeout=5,check=True).stdout.strip()
  upl.require(actual==revision,"checkout_scope")
  report.update(sourceRevision=revision,runId=run)
  token=os.environ.get("CLOUDFLARE_API_TOKEN","")
  upl.require(bool(token.strip()),"credential_unavailable")
  contract,_=upl.qual.load_delivery_packet(ROOT,"config/public-home-entry-delivery.v1.json")
  upl.check_packet_contract(contract,"home_entry")
  expected=contract["baseline"]
  upl.require(expected["versionId"]=="1772ceae-7e8d-4dbc-bc1d-0ade956a3e45" and expected["deploymentId"]=="12373c27-9a52-4764-9064-7428887252a2","baseline_scope")
  opener=urllib.request.build_opener(urllib.request.ProxyHandler({}),upl.qual.NoRedirect())
  def expired(*_):raise ProbeDeadline("probe_deadline")
  previous=signal.signal(signal.SIGALRM,expired);signal.setitimer(signal.ITIMER_REAL,60)
  values={}
  try:
   for suffix in PATHS:
    result,payload=probe_path(suffix,token,opener.open);report["reads"].append(result);values[PATHS[suffix]]=payload;save()
  finally:
   signal.setitimer(signal.ITIMER_REAL,0);signal.signal(signal.SIGALRM,previous)
  if all(x["ok"] for x in report["reads"]):
   try:
    state={"version":values["active_version"],"settings":values["settings"],"deployment":values["deployments"]["deployments"][0],"subdomain":values["subdomain"]}
    upl.check_state(state,expected);report.update(ok=True,configurationMatches=True)
   except Exception as exc:
    allowed={"binding_scope","binding_type","db_scope","rate_scope","flag_scope","binding_drift","settings_drift","version_drift","traffic_drift","preview_drift"}
    report.update(configurationMatches=False,configurationFailure=str(exc) if isinstance(exc,ValueError) and str(exc) in allowed else "shape_or_unclassified")
 except Exception:
  report["error"]="probe_unavailable"
 finally:
  save()
 print(json.dumps(report))
 if not report["ok"]:sys.exit(2)
if __name__=="__main__":
 try:main()
 except SystemExit:raise
 except Exception:
  print("Public read diagnosis unavailable; no mutation.",file=sys.stderr);sys.exit(2)
