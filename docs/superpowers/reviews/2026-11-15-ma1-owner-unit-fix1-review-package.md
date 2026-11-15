# MA1 fix1 scoped re-review package

Finding37f76280226f6fa9eb53fe156347c3796c116cac I1. OriginalreviewSourcee10fc5bb/tree4e80d7f1. Fixsource022c5c66e94b6f7c4fc359aab74043a438bee4d0/tree599dcaedfd1f63e8ec202b5ba9933652576d99d2, Sourcebase558bb4d6; closed3f23a980/treea8c00272. Immutablecandidatec51a7fb2/treef95b742b. ONLYtwoleavesF7+SAME. ProductionReader797cf2fe/6618B+existing40script3482dd34/13993B exact, normal33helpers/39snapshots remain historicalDATA unchanged/notmaterialized; allCore/Main/frozen18unchanged.

## Original finding verbatim
**I1 — The wrong-owner test can pass with the leaf owner guard deleted.** In ma1-reader-controls-driver.py (6a35f482807f3aa16d6fd5b2274adc70bd023038), lines 65–66 replace only os.fstat with a wrapper reporting an altered UID. The named stat in leaf() retains the actual UID. In ma1-reader.py (797cf2fe3a486d5e52fcc5bdeb09f41b5fc238fd), line 28 short-circuits at identity(before)==identity(s) because UID is part of identity. The explicit s.st_uid==os.getuid() predicate is never reached by that case. The production predicate exists and rejects a stable wrong-owner leaf. The observed 40 successes establish the actual checks executed, including syscall fault injection, but leave the distinct stable-owner regression uncovered. Use consistent synthetic UID responses for the before/opened/after observations of the same leaf, or vary only the expected UID inside a direct call to the actual leaf function so all file identities remain equal. Preserve an independently successful control and show that this specific wrong-owner control fails when only the owner predicate is removed. No real chown is required. This gap holds full reader-control compliance. It does not contradict the two observed gate decisions.

## Actual leaf unchanged
```python
def identity(s):return(s.st_dev,s.st_ino,s.st_mode,s.st_uid,s.st_nlink,s.st_size,s.st_mtime_ns,s.st_ctime_ns)
def directory(s):return(s.st_dev,s.st_ino,s.st_mode,s.st_uid,s.st_nlink)
def leaf(d,name):
 cap={'context.json':2048,'ma1-admission.json':1003}[name]
 before=os.stat(name,dir_fd=d,follow_symlinks=False)
 f=os.open(name,os.O_RDONLY|os.O_NOFOLLOW|os.O_NONBLOCK,dir_fd=d)
 try:
  s=os.fstat(f);need(identity(before)==identity(s) and stat.S_ISREG(s.st_mode) and s.st_uid==os.getuid() and s.st_nlink==1 and stat.S_IMODE(s.st_mode)==0o600 and 0<s.st_size<=cap)
  b=b''
  while len(b)<=cap:
   part=os.read(f,cap+1-len(b))
   if not part:break
   b+=part
  need(len(b)==s.st_size and len(b)<=cap and os.read(f,1)==b'')
  need(identity(s)==identity(os.fstat(f))==identity(os.stat(name,dir_fd=d,follow_symlinks=False)))
  return b,identity(s)
 finally:os.close(f)
```

## Complete targeted driver, appended to byteexact original reader definitions
```python
# Fixed MA1 stable-owner unit ONLY; normal reader definitions above remain byteexact.
import base64,zlib,hashlib,subprocess,select,time
OWNER_KEYS=['purpose','source','sourceTree','run','attempt','job','node','readerSha256','mutantSha256','normalOwner','stableWrongOwner','deletedOwnerGuard','targetedMutantControl','identityContinuity','nonclaims']
OWNER_NEUTRAL={'purpose':'afw.ma1.reader-owner-unit.v1',**dict.fromkeys(OWNER_KEYS[1:-1],'unknown'),'nonclaims':dict.fromkeys(NK,False)}
READER_HASH='30a0e0ce3c31b4d59b3371babd749282f8e8cad60f13493bab68c2b94bbe2165'
MUTANT_HASH='ab99a8fc2af7fc3521b8869183c39718ea72fba68c6b1b6ff7513bc5ec88541d'
FIXED_READER_ZIP='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'
def owner_metadata(kind):
 args={'head':['/usr/bin/git','rev-parse','HEAD'],'tree':['/usr/bin/git','rev-parse','HEAD^{tree}'],'node':['node','--version']}[kind]
 p=None
 try:
  p=subprocess.Popen(args,stdin=subprocess.DEVNULL,stdout=subprocess.PIPE,stderr=subprocess.DEVNULL,close_fds=True)
  end=time.monotonic()+3;b=b''
  while True:
   left=end-time.monotonic();need(left>0)
   ready,_,_=select.select([p.stdout],[],[],left);need(ready)
   part=os.read(p.stdout.fileno(),65-len(b))
   if not part:break
   b+=part;need(len(b)<=64)
  need(p.wait(timeout=max(0.001,end-time.monotonic()))==0)
  return b.decode('ascii').strip()
 finally:
  if p is not None:
   if p.poll() is None:
    p.kill()
    try:p.wait(timeout=3)
    except BaseException:pass
   if p.stdout is not None:p.stdout.close()
def owner_context():
 e=os.environ
 fixed={'GITHUB_REPOSITORY':'tokenizartinfo-ops/agent-friendly-web','GITHUB_REPOSITORY_ID':'1347578006','GITHUB_JOB':'readonly','GITHUB_RUN_ATTEMPT':'1','GITHUB_REF':'refs/heads/feat/finite-native-cleanup-20261101','GITHUB_EVENT_NAME':'push','GITHUB_WORKFLOW_REF':'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101','AFW_CHECKOUT_OUTCOME':'success','AFW_NODE_OUTCOME':'success','AFW_MA1_UNIT_OUTCOME':'success'}
 need(all(e.get(k)==v for k,v in fixed.items()))
 need(all(k not in e for k in ['NODE_OPTIONS','NODE_PATH','AFW_SYN_CHECKPOINT_KEY','AFW_BUDGET_DIAGNOSTIC_CANDIDATE']))
 source=e.get('GITHUB_SHA','');run=e.get('GITHUB_RUN_ID','')
 need(re.fullmatch('[a-f0-9]{40}',source) and re.fullmatch('[1-9][0-9]{0,19}',run) and e.get('GITHUB_WORKFLOW_SHA')==source)
 need(os.path.isabs(os.getcwd()) and os.path.realpath(os.getcwd())==os.getcwd())
 need(owner_metadata('head')==source and owner_metadata('node')=='v22.23.4')
 tree=owner_metadata('tree');need(re.fullmatch('[a-f0-9]{40}',tree))
 return {'source':source,'sourceTree':tree,'run':run,'attempt':1,'job':'readonly','node':'22.23.4'}
def owner_mutant():
 compressed=base64.b64decode(FIXED_READER_ZIP,validate=True);need(len(compressed)<=4096)
 dec=zlib.decompressobj(31);source=dec.decompress(compressed,6619)
 need(len(source)==6618 and dec.eof and not dec.unused_data and not dec.unconsumed_tail and hashlib.sha256(source).hexdigest()==READER_HASH)
 deletion=b' and s.st_uid==os.getuid()';need(source.count(deletion)==1)
 changed=source.replace(deletion,b'',1)
 need(len(changed)==6592 and hashlib.sha256(changed).hexdigest()==MUTANT_HASH)
 scope={'__builtins__':__builtins__}
 exec(compile(changed,'<fixed-ma1-owner-unit-mutant>','exec'),scope)
 return scope['leaf']
def owner_causal_controls():
 native_uid=os.getuid();native_stat=os.stat;native_fstat=os.fstat
 held=[];parent_links=[];private_fd=None;file_fd=None;private_id=None;file_id=None
 made_private=False;made_file=False;cleanup_ok=True
 fixed_dir='afw-ma1-reader-owner-unit';fixed_leaf='context.json'
 fixture=b'ma1-owner-fixture-v1'
 try:
  path=os.environ.get('RUNNER_TEMP','')
  need(path.startswith('/') and path!='/' and len(path)<=4096 and '//' not in path and not path.endswith('/'))
  parts=path[1:].split('/');need(len(parts)<=32 and all(x not in ('','.','..') for x in parts))
  held.append(os.open('/',os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW))
  root=native_fstat(held[0]);need(root.st_uid==0 and not(root.st_mode&0o022))
  for name in parts:
   parent=held[-1];before=native_stat(name,dir_fd=parent,follow_symlinks=False)
   f=os.open(name,os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW,dir_fd=parent);held.append(f);s=native_fstat(f)
   need(directory(before)==directory(s) and stat.S_ISDIR(s.st_mode) and s.st_uid in (0,native_uid) and not(s.st_mode&0o022))
   parent_links.append((parent,name,f,directory(s)[:4]))
  def check_parents():
   for p,n,f,before in parent_links:need(directory(native_fstat(f))[:4]==before==directory(native_stat(n,dir_fd=p,follow_symlinks=False))[:4])
  need(native_fstat(held[-1]).st_uid==native_uid);check_parents()
  os.mkdir(fixed_dir,0o700,dir_fd=held[-1]);made_private=True
  private_fd=os.open(fixed_dir,os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW,dir_fd=held[-1])
  private=native_fstat(private_fd);private_id=(private.st_dev,private.st_ino)
  named=native_stat(fixed_dir,dir_fd=held[-1],follow_symlinks=False)
  need((named.st_dev,named.st_ino)==private_id and stat.S_ISDIR(private.st_mode) and private.st_uid==native_uid and stat.S_IMODE(private.st_mode)==0o700)
  file_fd=os.open(fixed_leaf,os.O_RDWR|os.O_CREAT|os.O_EXCL|os.O_NOFOLLOW,0o600,dir_fd=private_fd);made_file=True
  initial=native_fstat(file_fd);file_id=(initial.st_dev,initial.st_ino)
  need(os.write(file_fd,fixture)==len(fixture))
  base=native_fstat(file_fd);named=native_stat(fixed_leaf,dir_fd=private_fd,follow_symlinks=False)
  need(identity(base)==identity(named) and stat.S_ISREG(base.st_mode) and base.st_uid==native_uid and base.st_nlink==1 and stat.S_IMODE(base.st_mode)==0o600 and base.st_size==len(fixture)<=64)
  normal_bytes,normal_id=leaf(private_fd,fixed_leaf)
  need(normal_bytes==fixture and normal_id==identity(base))
  wrong_uid=native_uid+1;need(wrong_uid!=native_uid)
  class WrongOwner:
   def __init__(self,s):
    for k in ['st_dev','st_ino','st_mode','st_uid','st_nlink','st_size','st_mtime_ns','st_ctime_ns']:setattr(self,k,getattr(s,k))
    self.st_uid=wrong_uid
  expected=list(identity(base));expected[3]=wrong_uid;expected=tuple(expected)
  def run_with_coherent_owner(actual_leaf):
   audit=[]
   def changed(s):
    need(identity(s)==identity(base))
    value=WrongOwner(s);audit.append(identity(value));need(len(audit)<=8);return value
   def fixed_stat(*args,**kwargs):
    s=native_stat(*args,**kwargs)
    if args==(fixed_leaf,) and kwargs=={'dir_fd':private_fd,'follow_symlinks':False} and (s.st_dev,s.st_ino)==file_id:return changed(s)
    return s
   def fixed_fstat(fd):
    s=native_fstat(fd)
    if (s.st_dev,s.st_ino)==file_id:return changed(s)
    return s
   need(os.stat is native_stat and os.fstat is native_fstat and os.getuid()==native_uid)
   try:
    os.stat=fixed_stat;os.fstat=fixed_fstat
    try:value=actual_leaf(private_fd,fixed_leaf);kind='returned'
    except ValueError:kind='rejected';value=None
   finally:os.stat=native_stat;os.fstat=native_fstat
   need(os.getuid()==native_uid and len(audit)==(2 if kind=='rejected' else 4) and all(x==expected for x in audit))
   return kind,value
  def rejection_control(kind,value):return kind=='rejected' and value is None
  guarded_kind,guarded_value=run_with_coherent_owner(leaf)
  need(rejection_control(guarded_kind,guarded_value))
  mutant_leaf=owner_mutant()
  mutant_kind,mutant_value=run_with_coherent_owner(mutant_leaf)
  need(mutant_kind=='returned' and type(mutant_value) is tuple and len(mutant_value)==2 and mutant_value[0]==fixture and mutant_value[1]==expected)
  # Same rejection-control predicate: expected rejection is FALSE on this mutant.
  mutant_rejection_control=rejection_control(mutant_kind,mutant_value)
  need(mutant_rejection_control is False)
  return {'normalOwner':'returned_fixture','stableWrongOwner':'rejected','deletedOwnerGuard':'returned_fixture','targetedMutantControl':'failed','identityContinuity':'coherent'}
 finally:
  # Always restore real syscalls BEFORE cleanup, including assertion/harness failure.
  os.stat=native_stat;os.fstat=native_fstat
  try:
   if parent_links:check_parents()
   if made_file:
    need(private_fd is not None and file_fd is not None and file_id is not None)
    named=native_stat(fixed_leaf,dir_fd=private_fd,follow_symlinks=False);opened=native_fstat(file_fd)
    need((named.st_dev,named.st_ino)==file_id==(opened.st_dev,opened.st_ino) and stat.S_ISREG(named.st_mode) and named.st_uid==native_uid and named.st_nlink==1 and stat.S_IMODE(named.st_mode)==0o600)
    os.unlink(fixed_leaf,dir_fd=private_fd);need(native_fstat(file_fd).st_nlink==0)
   if made_private:
    need(private_fd is not None and private_id is not None and held)
    named=native_stat(fixed_dir,dir_fd=held[-1],follow_symlinks=False);opened=native_fstat(private_fd)
    need((named.st_dev,named.st_ino)==private_id==(opened.st_dev,opened.st_ino) and stat.S_ISDIR(named.st_mode) and named.st_uid==native_uid and stat.S_IMODE(named.st_mode)==0o700)
    os.rmdir(fixed_dir,dir_fd=held[-1]);need(native_fstat(private_fd).st_nlink==0)
  except BaseException:cleanup_ok=False
  finally:
   for f in [file_fd,private_fd]+list(reversed(held)):
    if f is not None:
     try:os.close(f)
     except BaseException:cleanup_ok=False
  need(cleanup_ok)
def owner_main():
 status=1;r=OWNER_NEUTRAL
 try:
  c=owner_context();facts=owner_causal_controls()
  r={'purpose':'afw.ma1.reader-owner-unit.v1',**c,'readerSha256':READER_HASH,'mutantSha256':MUTANT_HASH,**facts,'nonclaims':dict.fromkeys(NK,False)};status=0
 except BaseException:pass
 try:
  need(list(r)==OWNER_KEYS);wire=b'AFW_MA1_READER_OWNER_UNIT/1 '+encoded(r)+b'\n';need(len(wire)<=2048)
  if os.write(1,wire)!=len(wire):status=1
 except BaseException:status=1
 return status
raise SystemExit(owner_main())
```

## Exact unit-only mutant reversible diff
```json
{"purpose":"afw.ma1.reversible-literal-data-diff.v1","label":"owner-fix1-unit-only-single-predicate-deletion","before":{"bytes":6618,"sha256":"30a0e0ce3c31b4d59b3371babd749282f8e8cad60f13493bab68c2b94bbe2165","blob":"797cf2fe3a486d5e52fcc5bdeb09f41b5fc238fd"},"after":{"bytes":6592,"sha256":"ab99a8fc2af7fc3521b8869183c39718ea72fba68c6b1b6ff7513bc5ec88541d","blob":"bc607e4853f3b2ebd625af17b80e8b5561829c51"},"prefixCharacters":1570,"suffixCharacters":5022,"forward":{"from":"uid==os.getuid() and s.st_","to":""},"reverse":{"from":"","to":"uid==os.getuid() and s.st_"}}
```

## Complete F7 and Source history diff references
inactivedifff5a3176d73670b31a37ab43bba9de030fedf3310;activediff1cbb499192f5e69011fca47e88754b24211ec49d;historydiffdd291daa740fd31b175cb1861d6886cc78f8d6e9;actualReader unitmutant diff6df2cd5dd9d028fc757c4eb40e916fd29e593959. Allfour Rootforward/reverseexact. F7twohere-docs exactold40/targettext; read-onlycontents/onejob7min/checkout+setupNodeunchangedpins/Node22.23.4/exactbranchpushattempt1uniqueoneuse. Existing40stepSUCCESS requiredbeforetarget; nofull104/normalMA1observerstep. Targetedprogram19964B=reader6618+driver13346, F7active41144B/SAMEcandidate2511418withinoriginalcaps. Entire2509354Bprefixpreserved+2064delta. NewunitcleanupidentityFDsfixednames/localfinally; deferredM1old40driver unchanged. Metadata subprocess calls fixedGitHEAD/tree andnodeversiononly, notAFWoriginalCLI/runtime; bounded3sread/waits.

## Contract and Root independent receiver
Contract700d9e481735f0884d68e323f0f4fc8f2b90063f/schema913cd418/examples2bc1ef47/plan14b60f20. Fixbriefa8948f93 andacceptedRootruling5a3e3f03. Rootreceiverba6dbd14 tested2grammarpositive/1APIjoint/16grammarnegative/20joinnegative; normal/mutant data hashes independentlychecked; no Sourceexecutedlocally. Causalgroup withholds contextualclaim onanyharnessfault. Normalhelper guard neverchanged.
```javascript
function(wire,ctx,evidence=null){
 const need=(v,m)=>{if(!v)throw Error("Root MA1 owner unit: "+m)},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),int=x=>Number.isInteger(x)&&x>0;
 const marker="AFW_MA1_READER_OWNER_UNIT/1 ",keys=["purpose","source","sourceTree","run","attempt","job","node","readerSha256","mutantSha256","normalOwner","stableWrongOwner","deletedOwnerGuard","targetedMutantControl","identityContinuity","nonclaims"],nk=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];
 need(typeof wire==="string"&&wire.length<=2048&&wire.startsWith(marker)&&wire.endsWith("\n")&&!wire.slice(0,-1).includes("\n")&&/^[\x20-\x7e]*\n$/.test(wire),"frame");const raw=wire.slice(marker.length,-1),r=JSON.parse(raw);need(JSON.stringify(r)===raw&&eq(Object.keys(r),keys),"canonical ordered keys");need(r.purpose==="afw.ma1.reader-owner-unit.v1"&&r.nonclaims&&eq(Object.keys(r.nonclaims),nk)&&nk.every(k=>r.nonclaims[k]===false),"purpose/nonclaims");
 const out={accepted:true,contextObserved:false,unitControlsPassed:false,qualified:false,NativeReleased:false,operationalReadiness:false,record:r};
 if(keys.slice(1,-1).every(k=>r[k]==="unknown"))return out;
 need(typeof r.source==="string"&&typeof r.sourceTree==="string"&&/^[a-f0-9]{40}$/.test(r.source)&&/^[a-f0-9]{40}$/.test(r.sourceTree)&&typeof r.run==="string"&&/^[1-9][0-9]{0,19}$/.test(r.run)&&r.attempt===1&&r.job==="readonly"&&r.node==="22.23.4","context");need(ctx&&["source","sourceTree","run","attempt","job","node"].every(k=>r[k]===ctx[k]),"context match");
 const facts={readerSha256:"30a0e0ce3c31b4d59b3371babd749282f8e8cad60f13493bab68c2b94bbe2165",mutantSha256:"ab99a8fc2af7fc3521b8869183c39718ea72fba68c6b1b6ff7513bc5ec88541d",normalOwner:"returned_fixture",stableWrongOwner:"rejected",deletedOwnerGuard:"returned_fixture",targetedMutantControl:"failed",identityContinuity:"coherent"};need(Object.keys(facts).every(k=>r[k]===facts[k]),"causal facts");
 if(evidence===null)return out;
 const run=evidence.run,jobs=evidence.jobs,c=evidence.commit;
 need(int(ctx.jobId)&&run&&String(run.id)===r.run&&run.head_sha===r.source&&run.run_attempt===1&&run.event==="push"&&run.path===".github/workflows/afw-finite-budget-qualification.yml"&&run.head_branch==="feat/finite-native-cleanup-20261101"&&run.status==="completed"&&run.conclusion==="success","run");
 need(run.repository?.id===1347578006&&run.repository?.full_name==="tokenizartinfo-ops/agent-friendly-web","repo");
 need(c&&c.sha===r.source&&c.tree?.sha===r.sourceTree&&c.message==="AFW-MA1-READER-OWNER-UNIT-ONEUSE-20261115","commit");
 need(Array.isArray(jobs)&&jobs.length===1&&jobs[0].id===ctx.jobId&&jobs[0].run_id===run.id&&jobs[0].name==="readonly"&&jobs[0].status==="completed"&&jobs[0].conclusion==="success","job");const steps=jobs[0].steps;need(Array.isArray(steps),"steps");
 const a=steps.filter(s=>s.name==="Check fixed MA1 reader controls"),b=steps.filter(s=>s.name==="Check stable MA1 leaf owner control");need(a.length===1&&b.length===1&&a[0].status==="completed"&&a[0].conclusion==="success"&&b[0].status==="completed"&&b[0].conclusion==="success"&&int(a[0].number)&&int(b[0].number)&&a[0].number<b[0].number,"step");
 need(!steps.some(s=>["Run declared full104 controls only","Read fixed MA1 admission observation"].includes(s.name)),"unit only");
 need(eq(evidence.existingFrames,["MA1_READER_CONTROLS/1 passed=40\n"])&&evidence.existingFrameStepNumber===a[0].number&&eq(evidence.targetedFrames,[wire])&&evidence.targetedFrameStepNumber===b[0].number,"actual frames");
 out.contextObserved=true;out.unitControlsPassed=true;return out;
}
```

## Actual covering command/output/metadata
ExactcommandSourceF7oneuse/steps run /usr/bin/python3 -I -S - withfixedhere-docs; nooldtestsre-runinreview. ActualmachineReceipt:
```json
{
  "purpose": "afw.root.ma1.owner-unit.actual-receipt.v1",
  "at": "2026-11-15 18:51:00 UTC",
  "source": "022c5c66e94b6f7c4fc359aab74043a438bee4d0",
  "sourceTree": "599dcaedfd1f63e8ec202b5ba9933652576d99d2",
  "run": 43748948427,
  "attempt": 1,
  "job": 132918389520,
  "jobName": "readonly",
  "node": "22.23.4",
  "runConclusion": "success",
  "jobConclusion": "success",
  "steps": [
    {
      "name": "Check fixed MA1 reader controls",
      "number": 4,
      "status": "completed",
      "conclusion": "success"
    },
    {
      "name": "Check stable MA1 leaf owner control",
      "number": 5,
      "status": "completed",
      "conclusion": "success"
    }
  ],
  "RootOwn": "ba6dbd14d5ca778661d00be7f408757855a3f71c",
  "old40Actual": "MA1_READER_CONTROLS/1 passed=40",
  "acceptance": {
    "accepted": true,
    "contextObserved": true,
    "unitControlsPassed": true,
    "qualified": false,
    "NativeReleased": false,
    "operationalReadiness": false,
    "record": {
      "purpose": "afw.ma1.reader-owner-unit.v1",
      "source": "022c5c66e94b6f7c4fc359aab74043a438bee4d0",
      "sourceTree": "599dcaedfd1f63e8ec202b5ba9933652576d99d2",
      "run": "43748948427",
      "attempt": 1,
      "job": "readonly",
      "node": "22.23.4",
      "readerSha256": "30a0e0ce3c31b4d59b3371babd749282f8e8cad60f13493bab68c2b94bbe2165",
      "mutantSha256": "ab99a8fc2af7fc3521b8869183c39718ea72fba68c6b1b6ff7513bc5ec88541d",
      "normalOwner": "returned_fixture",
      "stableWrongOwner": "rejected",
      "deletedOwnerGuard": "returned_fixture",
      "targetedMutantControl": "failed",
      "identityContinuity": "coherent",
      "nonclaims": {
        "historicalCauseProven": false,
        "receiptAuthenticated": false,
        "operationalReadiness": false,
        "completePackage": false,
        "PCoff": false,
        "globalNativeDrainVerified": false,
        "sdkNamespaceEmptyVerified": false
      }
    }
  },
  "scope": "Actual fixedreaderleaf unit only. Native-owner exact-byte positive; original owner guard rejects coherent wrongUID; ONLY26B deletion mutant returns exactfixturebytes causing same rejectioncontrol false. No realchown/productionguardchange. HarnessnotRED; all run/job/stepsSUCCESS. No repeatednormal104/MA1observation/OriginalCLI/Native/runtime.",
  "nonclaims": {
    "historicalCauseProven": false,
    "receiptAuthenticated": false,
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false,
    "globalNativeDrainVerified": false,
    "sdkNamespaceEmptyVerified": false
  }
}
```
RootclosedafterALLterminal, logsONCE. ActualOriginal40framebeforetargetedframe, bothuniqueRootmetadatajoined. FullSAMEaf9eee4beb70ea89fef675cfc5bb99ec10811fc4/2514447B/SHAae7a7ed3d0cbd38149bfd284eaeb458fc696bede38976f509a801c40ced1b770. SourceF7restoredf7a/fulltree/Core/Main/fivequeues0/closedheadruns0 readbackverified. Actual unitprovesI1coveringcauseonly, notfullmutationI3/Native/PCoff.Source408 gateobservationspreviousremainseparate scopedvalid. M1and3oldL05minorsdeferredforwholebranchtriage, nofixinthisround.

Fullindex676d9ecd3f09df3145284730228d7352b4bd5b40/all17objectsRootdocsbaa8f6dce; taskreportappendchaincontainsdesign/candidate/actual. ReviewI1ADDRESSEDorNOTADDRESSED andnewbreakagefixdiffonly, bothspec+quality; no tests/provider/refmutations. NewreportMUSTpreserveoriginal37f76280prefix andappendScopedfix1verdict.
