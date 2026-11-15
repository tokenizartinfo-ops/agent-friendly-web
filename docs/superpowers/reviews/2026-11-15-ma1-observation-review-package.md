# MA1 scoped review package

Requirementsbrief41f70c2524bbe8dd4f69b960e0ae0bd5a76f9124 +contract6fc657524517c9dd6ecfb74480d6492fd7bdb592. BaseSourceba7de48c7fff34b9921b67c22e9d88549c642249. ActualSourcee10fc5bb98f39d569def2e24355a44b5d3e9bf8e/tree4e80d7f1bde215c40d9e1fc154fa77a62aa62903. Inactive4ecffcfab7929a081bacd43f53273a256269cf24/treea4cdaa6c. CompleteSourceclosed558bb4d6ea6723a911e59ce99ca1b5ed8f8c1ac2/tree3af15824bce789cd16994c751c7001dae4002702. Source range includes onlyF7+SAME, Core/Main unchanged. Frozenproduction18DATA, business/OriginalCLI/Native NOTcalled.

## Complete controller unified logic diff
```diff
@@ -278,31 +278,35 @@
  if(t.executionMarker){try{lstatSync(t.executionMarker);ok=false;}catch(error){if(error?.code!=='ENOENT')throw error;}}
  for(const spool of staged.spools)ok=ok&&readFileSync(spool.path).equals(spool.bytes);
  return ok?'passed':'failed';
 }
 function execute(row,mutant=null){
+ p[2]++;
  const instance=(mutant??'baseline')+':'+row.id;
  let outcome='unknown';try{outcome=executeOne(row,mutant,instance);}catch{}finally{
   cleanupOwn(instance);const proof=external.get(instance);
   if(proof){try{if(report.cleanup.unknownInstances.includes(instance))throw 'CLEANUP_UNKNOWN';const own=fstatSync(proof.fd),st=lstatSync(proof.path);if(!st.isFile()||st.uid!==process.getuid()||st.nlink!==1||own.dev!==st.dev||own.ino!==st.ino||(proof.proof&&(st.mode!==proof.proof.mode||st.dev!==proof.proof.dev||st.ino!==proof.proof.ino||!readFileSync(proof.path).equals(proof.bytes))))throw 1;unlinkSync(proof.path);external.delete(instance);}catch(error){if(error!=='CLEANUP_UNKNOWN'&&!report.cleanup.failedInstances.includes(instance))report.cleanup.failedInstances.push(instance);}finally{try{closeSync(proof.fd);}catch{if(!report.cleanup.unknownInstances.includes(instance)&&!report.cleanup.failedInstances.includes(instance))report.cleanup.failedInstances.push(instance);}}}
  }
- return outcome;
+ if(outcome==='unknown')p[3]++;return outcome;
 }
+const phases=['baseline',...matrix.mutants.map(x=>x.id)].map(x=>[x,'untouched',0,0,false,false]);let p,exceptionAt='none';
 try{
  const image=fstatSync(3),current=statSync('/proc/self/exe');
  if(process.versions.node!=='22.23.4'||c.source!==e.GITHUB_SHA||c.run!==e.GITHUB_RUN_ID||image.dev!==current.dev||image.ino!==current.ino)throw 1;
  if(createHash('sha256').update(readFileSync(join(home,'matrix.json'))).digest('hex')!==report.matrixSha256)throw 1;
- for(let i=0;i<matrix.ordered.length;i++){if(!admitCase())break;report.results[i].result=execute(matrix.ordered[i]);}
+ p=phases[0];p[1]='entered';
+ for(let i=0;i<matrix.ordered.length;i++){if(!admitCase()){p[4]=true;break;}report.results[i].result=execute(matrix.ordered[i]);}p[5]=!p[4];
  for(let i=0;i<matrix.mutants.length;i++){
-  if(!admitCase())break;
+  p=phases[i+1];p[1]='gate';if(!admitCase()){p[4]=true;break;}p[1]='entered';
   const m=matrix.mutants[i],failed=[];let unknown=false;
-  for(const row of matrix.ordered){if(!admitCase()){unknown=true;break;}const r=execute(row,m.id);if(r==='failed')failed.push(row.id);else if(r==='unknown')unknown=true;}
-  report.mutants[i].actualFailedIds=failed;report.mutants[i].result=unknown?'unknown':JSON.stringify(failed)===JSON.stringify(m.expectedFailedIds)?'passed':'failed';
+  for(const row of matrix.ordered){if(!admitCase()){p[4]=true;unknown=true;break;}const r=execute(row,m.id);if(r==='failed')failed.push(row.id);else if(r==='unknown')unknown=true;}
+  p[5]=!p[4];report.mutants[i].actualFailedIds=failed;report.mutants[i].result=unknown?'unknown':JSON.stringify(failed)===JSON.stringify(m.expectedFailedIds)?'passed':'failed';
  }
-}catch{}finally{
+}catch{exceptionAt=p?p[0]:'preflight';}finally{
  report.cleanup.complete=true;
  report.passed=report.results.filter(x=>x.result==='passed').length;report.failed=report.results.filter(x=>x.result==='failed').length;report.unknown=report.results.filter(x=>x.result==='unknown').length;
  report.allPassed=report.passed===count&&report.failed===0&&report.unknown===0&&report.mutants.every(x=>x.result==='passed')&&report.cleanup.failedInstances.length===0&&report.cleanup.unknownInstances.length===0;
  const text=JSON.stringify(report);
  try{put(join(home,'controls-report.json'),text);process.stdout.write(text+'\n');}catch{process.exitCode=1;}
  if(!report.allPassed)process.exitCode=23;
+ try{writeFileSync(join(home,'ma1-admission.json'),JSON.stringify({purpose:'afw.ma1.admission.v1',...ctx,matrixSha256:report.matrixSha256,exceptionAt,phases,nonclaims:report.nonclaims}),{flag:'wx',mode:0o600});}catch{}
 }
```

## Complete private reader Source
```python
# MA1 fixed reader: no Source invocation, network, file writes or caller path.
import os,sys,stat,json,re
KEYS=['purpose','source','sourceTree','run','attempt','job','node','matrixSha256','exceptionAt','phases','nonclaims']
NK=['historicalCauseProven','receiptAuthenticated','operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified']
IDS=['baseline','M_RAW','M_PROVENANCE','M_OUTPUT','M_ASSOC']
MH='0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e'
CK=['purpose','source','sourceTree','run','attempt','job','node']
NEUTRAL={'purpose':'afw.ma1.admission.v1',**dict.fromkeys(KEYS[1:-1],'unknown'),'nonclaims':dict.fromkeys(NK,False)}
def need(v):
 if not v:raise ValueError()
def encoded(v):return json.dumps(v,separators=(',',':'),ensure_ascii=True).encode('ascii')
def pairs(xs):
 d={}
 for k,v in xs:
  need(k not in d);d[k]=v
 return d
def canonical(b):
 need(type(b) is bytes and all(32<=x<=126 for x in b))
 v=json.loads(b.decode('ascii'),object_pairs_hook=pairs,parse_constant=lambda _:need(False))
 need(encoded(v)==b);return v
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
def private_open():
 path=os.environ.get('RUNNER_TEMP','')
 need(path.startswith('/') and path!='/' and len(path)<=4096 and '//' not in path and not path.endswith('/'))
 parts=path[1:].split('/');need(len(parts)<=32 and all(p not in ('','.','..') for p in parts))
 fds=[];links=[]
 try:
  fds.append(os.open('/',os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW))
  root=os.fstat(fds[0]);need(root.st_uid==0 and not(root.st_mode&0o022))
  for i,name in enumerate(parts+['afw-r3-delivery']):
   parent=fds[-1];before=os.stat(name,dir_fd=parent,follow_symlinks=False)
   child=os.open(name,os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW,dir_fd=parent);fds.append(child)
   s=os.fstat(child);need(directory(before)==directory(s) and stat.S_ISDIR(s.st_mode) and s.st_uid in (0,os.getuid()) and not(s.st_mode&0o022))
   if i>=len(parts)-1:need(s.st_uid==os.getuid())
   if i==len(parts):need(stat.S_IMODE(s.st_mode)==0o700)
   links.append((parent,name,child,directory(s)))
  return fds,links
 except BaseException:
  for f in reversed(fds):os.close(f)
  raise
def recheck(links):
 for parent,name,child,prior in links:need(directory(os.fstat(child))==prior==directory(os.stat(name,dir_fd=parent,follow_symlinks=False)))
def measured(r,c):
 need(type(r) is dict and list(r)==KEYS and r['purpose']=='afw.ma1.admission.v1')
 need(type(r['nonclaims']) is dict and list(r['nonclaims'])==NK and all(r['nonclaims'][k] is False for k in NK))
 if all(r[k]=='unknown' for k in KEYS[1:-1]):return NEUTRAL
 need(all(type(r[k]) is type(c[k]) and r[k]==c[k] for k in CK[1:]) and r['matrixSha256']==MH)
 need(r['exceptionAt'] in ['none','preflight']+IDS and type(r['phases']) is list and len(r['phases'])==5)
 stopped=r['exceptionAt']=='preflight';inner=False;saw=stopped
 for i,t in enumerate(r['phases']):
  need(type(t) is list and len(t)==6 and t[0]==IDS[i] and t[1] in ['untouched','gate','entered'])
  ident,state,a,u,b,done=t
  need(type(a) is int and type(u) is int and 0<=u<=a<=104 and type(b) is bool and type(done) is bool)
  ex=r['exceptionAt']==ident
  if stopped:need(t==[ident,'untouched',0,0,False,False]);continue
  need(state!='untouched' and (i!=0 or state=='entered'))
  if inner:need(state=='gate')
  if state=='gate':
   need(i>0 and a==u==0 and not done and ((b and not ex) or (not b and ex)))
   stopped=True;inner=False
  else:
   need(not inner)
   if done:need(a==104 and not b)
   if b:need(a<104 and not done)
   if not b and not done:need(ex)
   if i==0 and ex:need(not b and not done)
   inner=b and not ex;stopped=ex
  if ex:saw=True
 need((r['exceptionAt']=='none' and not saw) or (r['exceptionAt']!='none' and saw))
 return {k:r[k] for k in KEYS}
def context(c):
 need(type(c) is dict and list(c)==CK and c['purpose']=='afw.r3-delivery.binding.v1')
 need(type(c['source']) is str and re.fullmatch('[a-f0-9]{40}',c['source']) and type(c['sourceTree']) is str and re.fullmatch('[a-f0-9]{40}',c['sourceTree']))
 need(type(c['run']) is str and re.fullmatch('[1-9][0-9]{0,19}',c['run']) and type(c['attempt']) is int and c['attempt']==1 and c['job']=='readonly' and c['node']=='22.23.4')
 e=os.environ
 expected={'GITHUB_REPOSITORY':'tokenizartinfo-ops/agent-friendly-web','GITHUB_REPOSITORY_ID':'1347578006','GITHUB_JOB':'readonly','GITHUB_RUN_ATTEMPT':'1','GITHUB_REF':'refs/heads/feat/finite-native-cleanup-20261101','GITHUB_EVENT_NAME':'push','GITHUB_WORKFLOW_REF':'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101','AFW_CHECKOUT_OUTCOME':'success','AFW_NODE_OUTCOME':'success','AFW_MA1_UNIT_OUTCOME':'success'}
 need(all(e.get(k)==v for k,v in expected.items()) and e.get('GITHUB_SHA')==c['source'] and e.get('GITHUB_WORKFLOW_SHA')==c['source'] and e.get('GITHUB_RUN_ID')==c['run'])
 return c
def observe():
 fds=[];links=[]
 try:
  fds,links=private_open();d=fds[-1]
  cb,cs=leaf(d,'context.json');rb,rs=leaf(d,'ma1-admission.json')
  c=context(canonical(cb));r=measured(canonical(rb),c);recheck(links)
  # Names stay tied to opened identities through validation; no second file read.
  need(identity(os.stat('context.json',dir_fd=d,follow_symlinks=False))==cs and identity(os.stat('ma1-admission.json',dir_fd=d,follow_symlinks=False))==rs);recheck(links)
  return r
 except BaseException:return NEUTRAL
 finally:
  for f in reversed(fds):
   try:os.close(f)
   except BaseException:pass
def frame(r):
 b=b'AFW_MA1_ADMISSION/1 '+encoded(r)+b'\n';need(len(b)<=1024);return b
def main():
 try:b=frame(observe())
 except BaseException:
  try:b=frame(NEUTRAL)
  except BaseException:return 1
 try:return 0 if os.write(1,b)==len(b) else 1
 except BaseException:return 1
```

## Complete cloud covering driver (prefix reader byteexact, not duplicated here)
```python
# Fixed synthetic cloud controls; uses the exact reader functions above.
# This driver alone creates/removes verified owned ephemeral fixtures.
def controls():
 parent=None;root=None;prior=None;root_prior=None;passed=0;held=[]
 original=dict(os.environ);sandbox=None
 def check(v):
  nonlocal passed
  need(v);passed+=1
 def refused(call):
  try:call()
  except BaseException:return True
  return False
 def remove_leaf(name):
  p=root+'/'+name
  try:s=os.lstat(p)
  except FileNotFoundError:return
  need(s.st_uid==os.getuid())
  if stat.S_ISDIR(s.st_mode):os.rmdir(p)
  else:os.unlink(p)
 def reset(cb,rb):
  for name,b in [('context.json',cb),('ma1-admission.json',rb)]:
   remove_leaf(name)
   if b is not None:
    f=os.open(root+'/'+name,os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600)
    try:need(os.write(f,b)==len(b))
    finally:os.close(f)
 try:
  temp=original.get('RUNNER_TEMP','');need(temp.startswith('/') and temp!='/' and len(temp)<4096 and '//' not in temp and not temp.endswith('/'))
  parts=temp[1:].split('/');need(len(parts)<=32 and all(p not in ('','.','..') for p in parts))
  held.append(os.open('/',os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW))
  for name in parts:
   f=os.open(name,os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW,dir_fd=held[-1]);held.append(f);s=os.fstat(f)
   need(s.st_uid in (0,os.getuid()) and not(s.st_mode&0o022))
  need(os.fstat(held[-1]).st_uid==os.getuid())
  parent=temp+'/afw-ma1-reader-controls'
  os.mkdir('afw-ma1-reader-controls',0o700,dir_fd=held[-1]);prior=directory(os.lstat(parent))[:4];sandbox=parent+'/runner'
  os.mkdir(sandbox,0o700);root=sandbox+'/afw-r3-delivery';os.mkdir(root,0o700);root_prior=directory(os.lstat(root))[:4]
  e={'RUNNER_TEMP':sandbox,'GITHUB_REPOSITORY':'tokenizartinfo-ops/agent-friendly-web','GITHUB_REPOSITORY_ID':'1347578006','GITHUB_JOB':'readonly','GITHUB_RUN_ATTEMPT':'1','GITHUB_REF':'refs/heads/feat/finite-native-cleanup-20261101','GITHUB_EVENT_NAME':'push','GITHUB_WORKFLOW_REF':'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101','AFW_CHECKOUT_OUTCOME':'success','AFW_NODE_OUTCOME':'success','AFW_MA1_UNIT_OUTCOME':'success','GITHUB_SHA':'1'*40,'GITHUB_WORKFLOW_SHA':'1'*40,'GITHUB_RUN_ID':'900000001'}
  os.environ.update(e)
  c={'purpose':'afw.r3-delivery.binding.v1','source':'1'*40,'sourceTree':'2'*40,'run':'900000001','attempt':1,'job':'readonly','node':'22.23.4'}
  r={'purpose':'afw.ma1.admission.v1',**{k:c[k] for k in CK[1:]},'matrixSha256':MH,'exceptionAt':'none','phases':[[k,'entered',104,0,False,True] for k in IDS],'nonclaims':dict.fromkeys(NK,False)}
  cb=encoded(c);rb=encoded(r);reset(cb,rb);check(observe()==r);check(len(frame(observe()))<=1024)
  reset(cb,encoded(NEUTRAL));check(observe()==NEUTRAL)
  for bad in [None,b'{',rb+b' ',rb+b'\n',b'\xef\xbb\xbf'+rb,rb.replace(b'"purpose":',b'"purpose":"duplicate","purpose":',1),rb.replace(b'"attempt":1',b'"attempt":true'),rb.replace(b'"attempt":1',b'"attempt":1.0'),b'x'*1004,rb.replace(b'"source":"'+b'1'*40+b'"',b'"source":"'+b'3'*40+b'"'),rb.replace(b'"matrixSha256":"'+MH.encode()+b'"',b'"matrixSha256":"'+b'0'*64+b'"'),rb.replace(b'"none"',b'"private_error"'),rb.replace(b'104,0,false,true',b'103,0,false,true',1)]:
   reset(cb,bad);check(observe()==NEUTRAL)
  for bad in [None,b'{',cb+b' ',b'x'*2049,cb.replace(b'"attempt":1',b'"attempt":true'),cb.replace(b'"sourceTree":"'+b'2'*40+b'"',b'"sourceTree":"'+b'4'*40+b'"')]:
   reset(bad,rb);check(observe()==NEUTRAL)
  reset(cb,rb);os.chmod(root+'/ma1-admission.json',0o640);check(observe()==NEUTRAL)
  reset(cb,rb);remove_leaf('ma1-admission.json');os.mkdir(root+'/ma1-admission.json',0o700);check(observe()==NEUTRAL)
  reset(cb,rb);remove_leaf('ma1-admission.json');os.symlink('context.json',root+'/ma1-admission.json');check(observe()==NEUTRAL)
  reset(cb,rb);os.link(root+'/ma1-admission.json',root+'/extra');check(observe()==NEUTRAL);os.unlink(root+'/extra')
  reset(cb,rb);os.chmod(root,0o750);check(observe()==NEUTRAL);os.chmod(root,0o700)
  reset(cb,rb);os.environ['GITHUB_RUN_ID']='900000002';check(observe()==NEUTRAL);os.environ['GITHUB_RUN_ID']=e['GITHUB_RUN_ID']
  os.environ['RUNNER_TEMP']='relative';check(observe()==NEUTRAL);os.environ['RUNNER_TEMP']=sandbox
  os.symlink('runner',parent+'/alias');os.environ['RUNNER_TEMP']=parent+'/alias';check(observe()==NEUTRAL);os.environ['RUNNER_TEMP']=sandbox;os.unlink(parent+'/alias')
  # Identity/owner/read faults are syscall fault injection around actual leaf(),
  # not a parser replica or a claim to have changed a real runner file owner.
  saved_fstat=os.fstat;saved_read=os.read
  d=os.open(root,os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW)
  try:
   class Owner:
    def __init__(self,s):
     for k in ['st_dev','st_ino','st_mode','st_uid','st_nlink','st_size','st_mtime_ns','st_ctime_ns']:setattr(self,k,getattr(s,k))
     self.st_uid=os.getuid()+1
   os.fstat=lambda fd:Owner(saved_fstat(fd))
   check(refused(lambda:leaf(d,'context.json')));os.fstat=saved_fstat
   calls=[0]
   def torn(fd,n):
    calls[0]+=1
    if calls[0]==1:return saved_read(fd,1)
    return b''
   os.read=torn;check(refused(lambda:leaf(d,'context.json')));os.read=saved_read
   def error(fd,n):raise OSError()
   os.read=error;check(refused(lambda:leaf(d,'context.json')));os.read=saved_read
   # A changed post-read identity is rejected by the same leaf() code.
   calls=[0]
   def changed(fd):
    s=saved_fstat(fd);calls[0]+=1
    if calls[0]>1:
     x=Owner(s);x.st_uid=s.st_uid;x.st_size=s.st_size+1;return x
    return s
   os.fstat=changed;check(refused(lambda:leaf(d,'context.json')));os.fstat=saved_fstat
  finally:os.fstat=saved_fstat;os.read=saved_read;os.close(d)
  reset(cb,rb)
  # Branch-shape coverage at 0/104, unknown+catch and unknown+break.
  variants=[]
  x=json.loads(rb);x['phases'][2][3]=1;variants.append(x)
  x=json.loads(rb);x['exceptionAt']='preflight';x['phases']=[[k,'untouched',0,0,False,False] for k in IDS];variants.append(x)
  x=json.loads(rb);x['exceptionAt']='baseline';x['phases']=[[IDS[0],'entered',1,1,False,False]]+[[k,'untouched',0,0,False,False] for k in IDS[1:]];variants.append(x)
  x=json.loads(rb);x['phases']=[[IDS[0],'entered',0,0,True,False],[IDS[1],'gate',0,0,True,False]]+[[k,'untouched',0,0,False,False] for k in IDS[2:]];variants.append(x)
  x=json.loads(rb);x['exceptionAt']='M_ASSOC';x['phases'][4][3]=1;variants.append(x)
  x=json.loads(rb);x['exceptionAt']='M_OUTPUT';x['phases'][3]=[IDS[3],'entered',10,1,True,False];x['phases'][4]=[IDS[4],'untouched',0,0,False,False];variants.append(x)
  for x in variants:
   reset(cb,encoded(x));check(observe()==x)
  need(passed==40)
  return passed
 finally:
  os.environ.clear();os.environ.update(original)
  if prior is not None:
   need(directory(os.lstat(parent))[:4]==prior)
   # Only fixed entries created by this driver; never recurse or scan.
   if root_prior is not None:
    need(directory(os.lstat(root))[:4]==root_prior)
    for name in ['context.json','ma1-admission.json']:remove_leaf(name)
    os.rmdir(root)
   if sandbox is not None:os.rmdir(sandbox)
   os.rmdir(parent)
  for f in reversed(held):os.close(f)
try:
 n=controls();os.write(1,('MA1_READER_CONTROLS/1 passed='+str(n)+'\n').encode('ascii'))
except BaseException:
 try:os.write(1,b'MA1_READER_CONTROLS/1 unavailable\n')
 except BaseException:pass
 raise SystemExit(1)
```

## Complete bootstrap prelude logic diff withcontext
```diff
@@ -20,25 +20,30 @@
  const prefix=bytes.subarray(0,2260109);assert.equal(prefix.length,2260109);assert.equal(sha(prefix),'9b49c2699725fa9148202d046bc3f050d151313061eae17bfa67494559476421');assert.equal(blob(prefix),'71fabddb7fcee9f436ce3ea95785c3a2ee5afe70');
  const text=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes),begin='<!-- AFW-R3-DELIVERY-SUCCESSOR-R5-DATA-V1:BEGIN -->',end='<!-- AFW-R3-DELIVERY-SUCCESSOR-R5-DATA-V1:END -->';assert.equal(text.split(begin).length,2);assert.equal(text.split(end).length,2);const first=text.indexOf(begin),last=text.indexOf(end);assert(last>first&&Buffer.byteLength(text.slice(0,first))>=prefix.length);
  const section=text.slice(first+begin.length,last);assert.match(section,/^\n[A-Za-z0-9+/=\n]+\n$/);const b64=section.replaceAll('\n',''),pins={"bytes":487208,"sha256":"087bba2182c131579e233f6c29daf1ee85e2aae41e77b66d6f93cc44cb5000c5","blob":"f9c8261c54f761b5c33ddc370dbe7b308648033b","compressed":{"bytes":120211,"sha256":"7e9aace1b1a3930a1a5234a2fdee5af68ebec77cc5b9818a6d342328047bf0e5","blob":"b3dfc078047bee03b5b42140783ee1dcf2409fd8"},"base64Characters":160284};assert.equal(b64.length,pins.base64Characters);assert(b64.length<=174764);const zip=Buffer.from(b64,'base64');assert.equal(zip.toString('base64'),b64);assert.equal(zip.length,pins.compressed.bytes);assert(zip.length<=131072);assert.equal(sha(zip),pins.compressed.sha256);assert.equal(blob(zip),pins.compressed.blob);
  const raw=gunzipSync(zip,{maxOutputLength:524288});assert.equal(raw.length,pins.bytes);assert.equal(sha(raw),pins.sha256);assert.equal(blob(raw),pins.blob);const wire=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(raw),payload=JSON.parse(wire);assert.equal(JSON.stringify(payload),wire);
  // Closed captured-original-creator continuity derivation; no caller patch/path/code.
  const ccPrefix=bytes.subarray(0,2471214);assert.equal(ccPrefix.length,2471214);assert.equal(sha(ccPrefix),'1ba61ebb62514c1bb2e5b7b6058dd5abad09ddc1d059483987262032e154928a');assert.equal(blob(ccPrefix),'2fcd79c7d0a2475f176dc03360df5980a58c3120');
- const ccSuffix=bytes.subarray(2471214);assert.equal(ccSuffix.length,10612);assert.equal(sha(ccSuffix),'cdfe4a0b495be82b9d2746a12f09a3cb24c100f940bb6cdbecaa0585f8a7fac5');
+ const ccSuffix=bytes.subarray(2471214,2481826);assert.equal(ccSuffix.length,10612);assert.equal(sha(ccSuffix),'cdfe4a0b495be82b9d2746a12f09a3cb24c100f940bb6cdbecaa0585f8a7fac5');
  const ccBegin='<!-- AFW-CREATOR-CONTINUITY-DATA-V1:BEGIN -->',ccEnd='<!-- AFW-CREATOR-CONTINUITY-DATA-V1:END -->';assert.equal(text.split(ccBegin).length,2);assert.equal(text.split(ccEnd).length,2);const ccFirst=text.indexOf(ccBegin),ccLast=text.indexOf(ccEnd);assert(ccLast>ccFirst&&Buffer.byteLength(text.slice(0,ccFirst))>=2471214);const ccOverlayText=text.slice(ccFirst+ccBegin.length,ccLast);assert.equal(sha(Buffer.from(ccOverlayText)),'a7e62d0ce31a094090c6b1524f34cc55b776a4938010a5ec1c310ca4ac6b712f');
  const ccOldKernel=payload.helpers['lifetime.py'];assert.equal(sha(Buffer.from(ccOldKernel)),'ae23b6e242cb41d3978b391c3bde1095ee7e0c0c717db98a598fe8fd9dcb2a27');assert.equal(ccOldKernel.split(" # AFW_LIFE_BEFORE_ARM\n").length,2);payload.helpers['lifetime.py']=ccOldKernel.replace(" # AFW_LIFE_BEFORE_ARM\n"," # AFW_LIFE_BEFORE_ARM\n if os.getppid()!=before[0]:raise CreatorDead()\n");
  const ccKernelPin=JSON.parse(ccOverlayText).kernelSnapshot;assert.deepEqual(Object.keys(ccKernelPin),['bytes','sha256','zipBytes','zipSha256','data','cap']);assert.equal(ccKernelPin.bytes,16073);assert.equal(ccKernelPin.cap,32768);assert.equal(ccKernelPin.sha256,'f2b319e2a98a0959e421e80d7f94662476508f2ae6bc7cff2f9c6f8f0e17a791');assert.equal(ccKernelPin.zipBytes,5078);assert.equal(ccKernelPin.zipSha256,'f0ef8e96c2f15251fbdbcb0abe801cbb981f5c97663233a0cae0520b261f29ed');assert.equal(sha(Buffer.from(ccKernelPin.data)),'1ba509cdcd9ecda3ae60b3db8f5876e1ddf17f5f9692bff77f113cef3e6356ef');const ccKernelZip=Buffer.from(ccKernelPin.data,'base64');assert.equal(ccKernelZip.toString('base64'),ccKernelPin.data);assert.equal(ccKernelZip.length,ccKernelPin.zipBytes);assert.equal(sha(ccKernelZip),ccKernelPin.zipSha256);assert.equal(gunzipSync(ccKernelZip,{maxOutputLength:32768}).toString('utf8'),payload.helpers['lifetime.py']);
  for(const name of ['delivery-entry.sh','controls-entry.sh','missing-cwd-entry.sh']){const prior=payload.helpers[name],lines=prior.split('\n').filter(line=>line.startsWith('_r3_kernel='));assert.equal(lines.length,1);const oldPin=JSON.parse(lines[0].slice('_r3_kernel='.length));assert.equal(oldPin.bytes,16025);assert.equal(oldPin.sha256,'ae23b6e242cb41d3978b391c3bde1095ee7e0c0c717db98a598fe8fd9dcb2a27');payload.helpers[name]=prior.replace(lines[0],'_r3_kernel='+JSON.stringify(ccKernelPin));}
  const ccResult=Buffer.from(JSON.stringify(payload));assert.equal(ccResult.length,487293);assert.equal(sha(ccResult),'dda3f25ef82cdf4e65814360b52aafa9ddf3ec2e57d1fa2f92e46466acfcd25b');assert.equal(blob(ccResult),'f23fcfebf3c72632327cf24babf2ff7ace22dae6');
+ // Fixed MA1 observation only: current history and nominal CC1 slice remain separately bound.
+ const maPrefix=bytes.subarray(0,2492132);assert.equal(maPrefix.length,2492132);assert.equal(sha(maPrefix),'692560966b1ab2066eb020c2a0226f92acbec85765e2bef28bdc3921f1f6cc60');assert.equal(blob(maPrefix),'2de216ee1ac3c2b7f0f0fbe19fea8f28b2b518b9');
+ const maSuffix=bytes.subarray(2492132);assert.equal(maSuffix.length,3372);assert.equal(sha(maSuffix),'55ea49805dc69e166342fd984d97ede9e7a5943e4ec1939ee946e62948d545d9');
+ const maBegin='<!-- AFW-MA1-ADMISSION-DATA-V1:BEGIN -->',maEnd='<!-- AFW-MA1-ADMISSION-DATA-V1:END -->';assert.equal(text.split(maBegin).length,2);assert.equal(text.split(maEnd).length,2);const maFirst=text.indexOf(maBegin),maLast=text.indexOf(maEnd);assert(maLast>maFirst&&Buffer.byteLength(text.slice(0,maFirst))>=2492132);assert.equal(sha(Buffer.from(text.slice(maFirst+maBegin.length,maLast))),'64e81ea04d7d2d766f08814e2e346bfafa91ca8cfbabaf73b8d544abee6d998a');
+ const maChanges=[["function execute(row,mutant=null){","function execute(row,mutant=null){\n p[2]++;"],[" return outcome;\n}\ntry{"," if(outcome==='unknown')p[3]++;return outcome;\n}\nconst phases=['baseline',...matrix.mutants.map(x=>x.id)].map(x=>[x,'untouched',0,0,false,false]);let p,exceptionAt='none';\ntry{"],[" for(let i=0;i<matrix.ordered.length;i++){if(!admitCase())break;report.results[i].result=execute(matrix.ordered[i]);}"," p=phases[0];p[1]='entered';\n for(let i=0;i<matrix.ordered.length;i++){if(!admitCase()){p[4]=true;break;}report.results[i].result=execute(matrix.ordered[i]);}p[5]=!p[4];"],["  if(!admitCase())break;\n  const m=","  p=phases[i+1];p[1]='gate';if(!admitCase()){p[4]=true;break;}p[1]='entered';\n  const m="],["if(!admitCase()){unknown=true;break;}","if(!admitCase()){p[4]=true;unknown=true;break;}"],["  report.mutants[i].actualFailedIds=failed;","  p[5]=!p[4];report.mutants[i].actualFailedIds=failed;"],["}catch{}finally{\n report.cleanup.complete=true;","}catch{exceptionAt=p?p[0]:'preflight';}finally{\n report.cleanup.complete=true;"],[" if(!report.allPassed)process.exitCode=23;"," if(!report.allPassed)process.exitCode=23;\n try{writeFileSync(join(home,'ma1-admission.json'),JSON.stringify({purpose:'afw.ma1.admission.v1',...ctx,matrixSha256:report.matrixSha256,exceptionAt,phases,nonclaims:report.nonclaims}),{flag:'wx',mode:0o600});}catch{}"]];let maController=payload.helpers['controls.mjs'];assert.equal(sha(Buffer.from(maController)),'060c5b493d3c832efb057e786ccb622adfef0c14233cf5e394b053485981e7df');for(const[from,to]of maChanges){assert.equal(maController.split(from).length,2);maController=maController.replace(from,to);}payload.helpers['controls.mjs']=maController;const maResult=Buffer.from(JSON.stringify(payload));assert.equal(maResult.length,487835);assert.equal(sha(maResult),'c152e14d2db8bcb7dfb5b2f315649dfa71b945379b347a042b2e3ff4f83920b5');assert.equal(blob(maResult),'3645fe39cf4b9f6f725669f9384ba0c73086c227');
  // Original raw origin, production18, remaining29 helpers and public wire remain pinned.
  assert.deepEqual(Object.keys(payload),['purpose','sourceParent','sourceParentTree','core','prefix','production','helpers']);assert.equal(payload.purpose,'afw.r3-delivery.successor-round5-data.v1');assert.equal(payload.sourceParent,'bfa80fac58ecb60bb3c9bcd458da6f393b301f70');assert.equal(payload.sourceParentTree,'d17f87ef49892e6a4c0ec50dd2436b0697b9f45f');assert.deepEqual(payload.core,{"count":3201,"bytes":324448,"sha256":"aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703"});assert.deepEqual(payload.prefix,{"blob":"71fabddb7fcee9f436ce3ea95785c3a2ee5afe70","bytes":2260109,"sha256":"9b49c2699725fa9148202d046bc3f050d151313061eae17bfa67494559476421"});
  const prod=payload.production;assert.deepEqual(Object.keys(prod),['blob','bytes','sha256','count','setSha256','data']);assert.equal(prod.count,18);assert.equal(prod.blob,'b88ebef9a2aa979772d20bfb778cbfe463dc3011');assert.equal(prod.bytes,95518);assert.equal(prod.sha256,'cfcb0dc7992d27246dc785ef2991104f6715e61c9aa49cfddc0317b219e6ac91');assert.equal(prod.setSha256,'71b4454f4cd90f716852bbdbb44f686d7f46191e8d93f890c465a7cb5f29d9af');
  const frozen=Buffer.from(prod.data);assert.equal(frozen.length,prod.bytes);assert.equal(sha(frozen),prod.sha256);assert.equal(blob(frozen),prod.blob);const original=JSON.parse(prod.data);assert.equal(JSON.stringify(original)+'\n',prod.data);assert.equal(original.productionCount,18);assert.equal(Object.keys(original.programs).length,18);
  const originalPins={};for(const[name,p]of Object.entries(original.programs)){const b=Buffer.from(p.content);assert.deepEqual(Object.keys(p),['bytes','sha256','blob','content']);assert.equal(b.length,p.bytes);assert.equal(sha(b),p.sha256);assert.equal(blob(b),p.blob);originalPins[name]={bytes:p.bytes,sha256:p.sha256,blob:p.blob};}assert.equal(sha(Buffer.from(JSON.stringify(originalPins)+'\n')),prod.setSha256);
  // Frozen18 remain DATA. No production main/original readonly CLI/Native import, materialization or call.
- const expected={"io.mjs":{"bytes":1815,"sha256":"b7d4ee0b8786c52a26857a8e203a710017b40dc8f5636a1d387638b9ec78eb47","blob":"8bb9a8ab8ddf81689ee890252579c1fd41dfdf52"},"emitter.mjs":{"bytes":3511,"sha256":"02f80480dbc8bc8700d0ecf3a57e65f855954ca64b379d29eefdb75c6d7db760","blob":"f9eee51fbdb89d0e130f8137d6a48ae787904f66"},"source-provenance.mjs":{"bytes":6690,"sha256":"b4d0872044216a275458d14b838ecf57628780092767ea88910dce18585408ce","blob":"fc6b339e54bf0fe91ad73f9b744ab7d46df35b0d"},"raw-sample.mjs":{"bytes":4289,"sha256":"1b594a7768a69cba5db1f41e83eb2a941f6451c82584490fdb77ba1fea85e9fc","blob":"8cdabb2324ae97b04fa17350846e24d666cd3536"},"site-schema.json":{"bytes":12651,"sha256":"5b55423937bbe38a18f1bbb8196d8cd85336d81187810b8c5b5abe8a593c37fd","blob":"4871edc102386fe6db65c773e51c21ecb94897e3"},"site-map.json":{"bytes":6630,"sha256":"1be6536669654bcc8c181ed7057b189352bef9b0587eb75f4124500477e4f2fe","blob":"57c5a96710f0a2d97656b400882d8b4b4a1a7e2f"},"envelope-schema.json":{"bytes":5616,"sha256":"49c2a27cf977f0c9247fb8f20539fb29a9ca002294d86eeb0d9db8f876e090e5","blob":"90831bbc3035d944c4ae8f96d2cfa6b24362eb9f"},"boundary.py":{"bytes":12562,"sha256":"27274120076048fd6f63b122b5534d8d06e97a2d4cf36461c1f710c605accdf4","blob":"554a2b2d2a8e3f365533f0df3006bcce1e409698"},"delivery-schema.json":{"bytes":1380,"sha256":"d8332c8bf26c4224bd2a5da321dc50a28a2d6391b294bc262a438c2638fa2f60","blob":"ae706e0e659d0ee7647bbec8e6b3d9ebbcac3df8"},"unavailable-schema.json":{"bytes":1315,"sha256":"10d6dee3228f75a1ea09ebfa365287a460ec06537c8c0a3e3bb11702605806f9","blob":"4a310ddcef7b1b7bf0755bf56b760486254cf8c6"},"controls-schema.json":{"bytes":4681,"sha256":"2d0a4c404abfb107e44ab369f2998b1bbbbba2734cbf993acf8c8f2c0fe47d83","blob":"8586d4387a5fcd95b18d7c966cf841432330a789"},"matrix.json":{"bytes":24054,"sha256":"0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e","blob":"5b829c768ed3d7af03d5eb3f1870599d39bfd083"},"shape.mjs":{"bytes":843,"sha256":"82224496e7db35a1daf7168591cb2123edbb3242331a314680f13d05b3bfef5e","blob":"df49410ebf42b4fbc9a8c032f81a0edc8fb95d0b"},"control-proof.mjs":{"bytes":2206,"sha256":"a7318fd9452f0254fdb9ae1261040ab944ce2d56c443004579c51e55c2c63c71","blob":"ab38574f5fe697fd9f0d48f9ade065749f4a0c14"},"site-receiver.mjs":{"bytes":5460,"sha256":"0d346b88c9594c45ef207f9fa4b57c984d13a3e64943904f880e2e2b96377ad2","blob":"c2cf804b6d427b5fc40da2b7d1375785a0a2f459"},"normalized-sample.mjs":{"bytes":3987,"sha256":"2bee6afaa30f01f1f497512d595f24f3a0c92269e3b4ed7e2d2e349ae5b4419f","blob":"f7c2fefcc9df568a8453d876072a23a790b94fcd"},"witness.mjs":{"bytes":1044,"sha256":"336df41b1994c8a315e4f56d976ddd0c9922397c702a02869ac8d44f42a8629a","blob":"b207c0c9ea759a9a146783b8818276444bef155b"},"fixtures.json":{"bytes":7988,"sha256":"06b7dc9e63c178b6b823db1ee56049ce4d1406861df240ca2fbc119d2df45bc9","blob":"f29e76fd04627ebe5d1100007808610ebc240571"},"controls.mjs":{"bytes":31799,"sha256":"060c5b493d3c832efb057e786ccb622adfef0c14233cf5e394b053485981e7df","blob":"b9b58c4a22f04b177f92dcbf8841cfc77f648c86"},"examples.json":{"bytes":22739,"sha256":"4f8da5a563bb0498cc506d693421853777ba7efb67d42da44b1889e5fef7b945","blob":"6f28d4f4479fb093aec3188d21b1796fd7c3fff2"},"controls-boundary.py":{"bytes":12908,"sha256":"6e3dcd0c4f262a509b75499674375eaa3d91b9e83789f03689862f51734fc3d7","blob":"b6c39695cdca9963d083842b114b7e4fb59e6392"},"controls-unavailable-example.json":{"bytes":568,"sha256":"7544b33859efe6ba2f6f1789e709f89f5f94f08352dd4fe4b14d700b19b22644","blob":"beedc03c8066cef6e6a24914d5334f99183d014b"},"outer.mjs":{"bytes":25947,"sha256":"62f2faa1bff1a2aa2438e8c1794361910e44a6db9c632daa28185adc647bf515","blob":"c74d74879d6935c47d50b1233dad4027e6704365"},"delivery-entry.sh":{"bytes":24013,"sha256":"63b7e32a4291e5a1b2fc3753a5ae89758dcf0913f6f2bf2d558bc3a0dd9f2961","blob":"2477c393fbc7d9883894ef7299b4f749cc3857ab"},"controls-entry.sh":{"bytes":24058,"sha256":"e874d2de7710156e11726c7bd01626faa5351f94514cf0c42878e679981ad899","blob":"f0825d011a5e7942194a157a327ef7c42548180c"},"oracle.mjs":{"bytes":1877,"sha256":"37c8724ced0eaa42bd54aa01aef1af7c3a7107ff3e78243e1f3d04da841fa4d1","blob":"652201ebe699664b97a5bc3d7c815a02dd889805"},"lifetime.py":{"bytes":16073,"sha256":"f2b319e2a98a0959e421e80d7f94662476508f2ae6bc7cff2f9c6f8f0e17a791","blob":"765573c5eeaf83add464e94a8240dcd7a90786d0"},"delivery-outer.mjs":{"bytes":25986,"sha256":"d32eaeb8d09e1d50dd14195fecec7606d457004ea6f61084900b94547cc6899f","blob":"aac76e8c15a01cbb308ba63ad7dec19e2d5ebb76"},"controls-outer.mjs":{"bytes":25986,"sha256":"ada3cc7cf36a742d71c6ed12a7b5d15b91d56c4353aad02318a871ec370e4c35","blob":"e62dd9c4760da521b84f23b1c87855070767aac0"},"missing-cwd-entry.sh":{"bytes":24130,"sha256":"e625cd8b88726576b278099856bd6b3126c02da4f31c387ba49ced923a5fa9fc","blob":"3666fdd52620bd2a30bfa3e100897b2fab1610c1"},"race-creator.mjs":{"bytes":777,"sha256":"2657c30db6cff046599ff3d9cd2cdf7c3c312252b9636741627871d090372575","blob":"a6d47254adbf330a09b879a3a9b20ae4de476e73"},"lifetime-controls.py":{"bytes":12219,"sha256":"d67b5c8c8e127c359f8d2b5d7da30da809b8d91bfb77759df4bbf9ecaaf53c59","blob":"21b0b82242a76efd94d34fe1f722e04fda6cd489"},"authority-anchor.json":{"bytes":1964,"sha256":"e08d9864b16a1534b71344b817a6d3a78697d8d51af8ea798229a5f16d4b6407","blob":"1bed486f15a8743ef7c68470772835aaf4946a40"}},names=Object.keys(expected);assert.equal(names.length,33);assert.deepEqual(Object.keys(payload.helpers),names);
+ const expected={"io.mjs":{"bytes":1815,"sha256":"b7d4ee0b8786c52a26857a8e203a710017b40dc8f5636a1d387638b9ec78eb47","blob":"8bb9a8ab8ddf81689ee890252579c1fd41dfdf52"},"emitter.mjs":{"bytes":3511,"sha256":"02f80480dbc8bc8700d0ecf3a57e65f855954ca64b379d29eefdb75c6d7db760","blob":"f9eee51fbdb89d0e130f8137d6a48ae787904f66"},"source-provenance.mjs":{"bytes":6690,"sha256":"b4d0872044216a275458d14b838ecf57628780092767ea88910dce18585408ce","blob":"fc6b339e54bf0fe91ad73f9b744ab7d46df35b0d"},"raw-sample.mjs":{"bytes":4289,"sha256":"1b594a7768a69cba5db1f41e83eb2a941f6451c82584490fdb77ba1fea85e9fc","blob":"8cdabb2324ae97b04fa17350846e24d666cd3536"},"site-schema.json":{"bytes":12651,"sha256":"5b55423937bbe38a18f1bbb8196d8cd85336d81187810b8c5b5abe8a593c37fd","blob":"4871edc102386fe6db65c773e51c21ecb94897e3"},"site-map.json":{"bytes":6630,"sha256":"1be6536669654bcc8c181ed7057b189352bef9b0587eb75f4124500477e4f2fe","blob":"57c5a96710f0a2d97656b400882d8b4b4a1a7e2f"},"envelope-schema.json":{"bytes":5616,"sha256":"49c2a27cf977f0c9247fb8f20539fb29a9ca002294d86eeb0d9db8f876e090e5","blob":"90831bbc3035d944c4ae8f96d2cfa6b24362eb9f"},"boundary.py":{"bytes":12562,"sha256":"27274120076048fd6f63b122b5534d8d06e97a2d4cf36461c1f710c605accdf4","blob":"554a2b2d2a8e3f365533f0df3006bcce1e409698"},"delivery-schema.json":{"bytes":1380,"sha256":"d8332c8bf26c4224bd2a5da321dc50a28a2d6391b294bc262a438c2638fa2f60","blob":"ae706e0e659d0ee7647bbec8e6b3d9ebbcac3df8"},"unavailable-schema.json":{"bytes":1315,"sha256":"10d6dee3228f75a1ea09ebfa365287a460ec06537c8c0a3e3bb11702605806f9","blob":"4a310ddcef7b1b7bf0755bf56b760486254cf8c6"},"controls-schema.json":{"bytes":4681,"sha256":"2d0a4c404abfb107e44ab369f2998b1bbbbba2734cbf993acf8c8f2c0fe47d83","blob":"8586d4387a5fcd95b18d7c966cf841432330a789"},"matrix.json":{"bytes":24054,"sha256":"0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e","blob":"5b829c768ed3d7af03d5eb3f1870599d39bfd083"},"shape.mjs":{"bytes":843,"sha256":"82224496e7db35a1daf7168591cb2123edbb3242331a314680f13d05b3bfef5e","blob":"df49410ebf42b4fbc9a8c032f81a0edc8fb95d0b"},"control-proof.mjs":{"bytes":2206,"sha256":"a7318fd9452f0254fdb9ae1261040ab944ce2d56c443004579c51e55c2c63c71","blob":"ab38574f5fe697fd9f0d48f9ade065749f4a0c14"},"site-receiver.mjs":{"bytes":5460,"sha256":"0d346b88c9594c45ef207f9fa4b57c984d13a3e64943904f880e2e2b96377ad2","blob":"c2cf804b6d427b5fc40da2b7d1375785a0a2f459"},"normalized-sample.mjs":{"bytes":3987,"sha256":"2bee6afaa30f01f1f497512d595f24f3a0c92269e3b4ed7e2d2e349ae5b4419f","blob":"f7c2fefcc9df568a8453d876072a23a790b94fcd"},"witness.mjs":{"bytes":1044,"sha256":"336df41b1994c8a315e4f56d976ddd0c9922397c702a02869ac8d44f42a8629a","blob":"b207c0c9ea759a9a146783b8818276444bef155b"},"fixtures.json":{"bytes":7988,"sha256":"06b7dc9e63c178b6b823db1ee56049ce4d1406861df240ca2fbc119d2df45bc9","blob":"f29e76fd04627ebe5d1100007808610ebc240571"},"controls.mjs":{"bytes":32337,"sha256":"b3a871fffa2bc831213c002dbff52a36e0fd38dd0b3aaec8da1b0368da516c71","blob":"4ae3dd79c6796915877741d83db8f388f333d841"},"examples.json":{"bytes":22739,"sha256":"4f8da5a563bb0498cc506d693421853777ba7efb67d42da44b1889e5fef7b945","blob":"6f28d4f4479fb093aec3188d21b1796fd7c3fff2"},"controls-boundary.py":{"bytes":12908,"sha256":"6e3dcd0c4f262a509b75499674375eaa3d91b9e83789f03689862f51734fc3d7","blob":"b6c39695cdca9963d083842b114b7e4fb59e6392"},"controls-unavailable-example.json":{"bytes":568,"sha256":"7544b33859efe6ba2f6f1789e709f89f5f94f08352dd4fe4b14d700b19b22644","blob":"beedc03c8066cef6e6a24914d5334f99183d014b"},"outer.mjs":{"bytes":25947,"sha256":"62f2faa1bff1a2aa2438e8c1794361910e44a6db9c632daa28185adc647bf515","blob":"c74d74879d6935c47d50b1233dad4027e6704365"},"delivery-entry.sh":{"bytes":24013,"sha256":"63b7e32a4291e5a1b2fc3753a5ae89758dcf0913f6f2bf2d558bc3a0dd9f2961","blob":"2477c393fbc7d9883894ef7299b4f749cc3857ab"},"controls-entry.sh":{"bytes":24058,"sha256":"e874d2de7710156e11726c7bd01626faa5351f94514cf0c42878e679981ad899","blob":"f0825d011a5e7942194a157a327ef7c42548180c"},"oracle.mjs":{"bytes":1877,"sha256":"37c8724ced0eaa42bd54aa01aef1af7c3a7107ff3e78243e1f3d04da841fa4d1","blob":"652201ebe699664b97a5bc3d7c815a02dd889805"},"lifetime.py":{"bytes":16073,"sha256":"f2b319e2a98a0959e421e80d7f94662476508f2ae6bc7cff2f9c6f8f0e17a791","blob":"765573c5eeaf83add464e94a8240dcd7a90786d0"},"delivery-outer.mjs":{"bytes":25986,"sha256":"d32eaeb8d09e1d50dd14195fecec7606d457004ea6f61084900b94547cc6899f","blob":"aac76e8c15a01cbb308ba63ad7dec19e2d5ebb76"},"controls-outer.mjs":{"bytes":25986,"sha256":"ada3cc7cf36a742d71c6ed12a7b5d15b91d56c4353aad02318a871ec370e4c35","blob":"e62dd9c4760da521b84f23b1c87855070767aac0"},"missing-cwd-entry.sh":{"bytes":24130,"sha256":"e625cd8b88726576b278099856bd6b3126c02da4f31c387ba49ced923a5fa9fc","blob":"3666fdd52620bd2a30bfa3e100897b2fab1610c1"},"race-creator.mjs":{"bytes":777,"sha256":"2657c30db6cff046599ff3d9cd2cdf7c3c312252b9636741627871d090372575","blob":"a6d47254adbf330a09b879a3a9b20ae4de476e73"},"lifetime-controls.py":{"bytes":12219,"sha256":"d67b5c8c8e127c359f8d2b5d7da30da809b8d91bfb77759df4bbf9ecaaf53c59","blob":"21b0b82242a76efd94d34fe1f722e04fda6cd489"},"authority-anchor.json":{"bytes":1964,"sha256":"e08d9864b16a1534b71344b817a6d3a78697d8d51af8ea798229a5f16d4b6407","blob":"1bed486f15a8743ef7c68470772835aaf4946a40"}},names=Object.keys(expected);assert.equal(names.length,33);assert.deepEqual(Object.keys(payload.helpers),names);
  for(const name of names){assert.match(name,/^[a-z0-9][a-z0-9.-]{0,63}$/);const content=payload.helpers[name];assert.equal(typeof content,'string');const b=Buffer.from(content),pin=expected[name];assert(b.length<=32768);assert.equal(b.length,pin.bytes);assert.equal(sha(b),pin.sha256);assert.equal(blob(b),pin.blob);}
  assert.equal(sha(Buffer.from(payload.helpers['matrix.json'])),expected['matrix.json'].sha256);assert.equal(expected['matrix.json'].blob,'5b829c768ed3d7af03d5eb3f1870599d39bfd083');
  assert.equal(fs.realpathSync(e.RUNNER_TEMP),e.RUNNER_TEMP);const temp=fs.lstatSync(e.RUNNER_TEMP);assert(temp.isDirectory()&&temp.uid===process.getuid()&&!(temp.mode&0o022));
  const root=e.RUNNER_TEMP+'/afw-r3-delivery';fs.mkdirSync(root,{mode:0o700});for(const name of names)fs.writeFileSync(root+'/'+name,payload.helpers[name],{mode:0o600,flag:'wx'});
  for(const name of names){const b=fs.readFileSync(root+'/'+name);assert.equal(b.length,expected[name].bytes);assert.equal(sha(b),expected[name].sha256);assert.equal(blob(b),expected[name].blob);}
  const context={purpose:'afw.r3-delivery.binding.v1',source:e.GITHUB_SHA,sourceTree,run:e.GITHUB_RUN_ID,attempt:1,job:'readonly',node:process.versions.node};fs.writeFileSync(root+'/context.json',JSON.stringify(context),{mode:0o600,flag:'wx'});r3BootstrapAdmitted=true;
```

## All complete reversible source/workflow diff refs
{
  "diff-controls.mjs.json": "594e6d72f90ef22421110a002e7d69d46e5dbb85",
  "diff-bootstrap-prelude.mjs.json": "9129336a6d26b7115e592c273d23e01939421fbc",
  "diff-bootstrap-program.mjs.json": "908026babe054d6715af16ae05bdcf53ba04fd5b",
  "diff-bootstrap-entry.py.json": "20d7d636f1e03600d7243e457a925e69b6c11541",
  "diff-inactive-f7.yml.json": "96e7ca6aa30cb3a1d0b7221b981449e4784e84d9",
  "diff-active-f7.yml.json": "bab25a5b55d12c68223cfb28002c0659190a135a",
  "diff-full-same.md.json": "321c4366d5dc3fbb9f7946f6def921c2aeb60176"
}
Workflowdiffs are against ACTUALclosedoriginalF7f7a, not prior ephemeralCC1 workflow: both reverseexactRootverified. Headeronlyreadonly/7min/push/exactSourcebranch/oneuse/attempt1/contentsread; originalactions/Nodepins preserved. NewReaderunitstep1min andfixedreaderstep1min, originalstepconditionalonunitSUCCESS; nocontinue-on-error. New code/old clocks frombriefexact. Unit/readerhere-docs equal given plaintext; bootstraphere-doc equals31823Bentry. All39pins/caps/kinds+helper33 checkedRoot, other32helpers/CC1kernel/3entries/probe/parents/schema/matrix/proof byteexact. Bootstrapprogramcontinuation exact; two new bootstrap compressedpins decoded to exactkernel/program; oldsixsnapshots unchanged byexacthelperidentity. Fullprefix2492132preserved,3372B fixedliteral delta; suffixCC1bounded[2471214,2481826). SourceF7inactivefalse/activeexactOneuse. RawcanonicalJSONnoLF487835B/Gzip120386/base64160516 allboundtoactualmirrorgzipinflation. NoSourceexecutionlocally.

## Full typed39 manifest
{"io.mjs":{"bytes":1815,"sha256":"b7d4ee0b8786c52a26857a8e203a710017b40dc8f5636a1d387638b9ec78eb47","blob":"8bb9a8ab8ddf81689ee890252579c1fd41dfdf52","kind":"literal_piece","cap":32768},"emitter.mjs":{"bytes":3511,"sha256":"02f80480dbc8bc8700d0ecf3a57e65f855954ca64b379d29eefdb75c6d7db760","blob":"f9eee51fbdb89d0e130f8137d6a48ae787904f66","kind":"literal_piece","cap":32768},"source-provenance.mjs":{"bytes":6690,"sha256":"b4d0872044216a275458d14b838ecf57628780092767ea88910dce18585408ce","blob":"fc6b339e54bf0fe91ad73f9b744ab7d46df35b0d","kind":"literal_piece","cap":32768},"raw-sample.mjs":{"bytes":4289,"sha256":"1b594a7768a69cba5db1f41e83eb2a941f6451c82584490fdb77ba1fea85e9fc","blob":"8cdabb2324ae97b04fa17350846e24d666cd3536","kind":"literal_piece","cap":32768},"site-schema.json":{"bytes":12651,"sha256":"5b55423937bbe38a18f1bbb8196d8cd85336d81187810b8c5b5abe8a593c37fd","blob":"4871edc102386fe6db65c773e51c21ecb94897e3","kind":"literal_piece","cap":32768},"site-map.json":{"bytes":6630,"sha256":"1be6536669654bcc8c181ed7057b189352bef9b0587eb75f4124500477e4f2fe","blob":"57c5a96710f0a2d97656b400882d8b4b4a1a7e2f","kind":"literal_piece","cap":32768},"envelope-schema.json":{"bytes":5616,"sha256":"49c2a27cf977f0c9247fb8f20539fb29a9ca002294d86eeb0d9db8f876e090e5","blob":"90831bbc3035d944c4ae8f96d2cfa6b24362eb9f","kind":"literal_piece","cap":32768},"boundary.py":{"bytes":12562,"sha256":"27274120076048fd6f63b122b5534d8d06e97a2d4cf36461c1f710c605accdf4","blob":"554a2b2d2a8e3f365533f0df3006bcce1e409698","kind":"literal_piece","cap":32768},"delivery-schema.json":{"bytes":1380,"sha256":"d8332c8bf26c4224bd2a5da321dc50a28a2d6391b294bc262a438c2638fa2f60","blob":"ae706e0e659d0ee7647bbec8e6b3d9ebbcac3df8","kind":"literal_piece","cap":32768},"unavailable-schema.json":{"bytes":1315,"sha256":"10d6dee3228f75a1ea09ebfa365287a460ec06537c8c0a3e3bb11702605806f9","blob":"4a310ddcef7b1b7bf0755bf56b760486254cf8c6","kind":"literal_piece","cap":32768},"controls-schema.json":{"bytes":4681,"sha256":"2d0a4c404abfb107e44ab369f2998b1bbbbba2734cbf993acf8c8f2c0fe47d83","blob":"8586d4387a5fcd95b18d7c966cf841432330a789","kind":"literal_piece","cap":32768},"matrix.json":{"bytes":24054,"sha256":"0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e","blob":"5b829c768ed3d7af03d5eb3f1870599d39bfd083","kind":"literal_piece","cap":32768},"shape.mjs":{"bytes":843,"sha256":"82224496e7db35a1daf7168591cb2123edbb3242331a314680f13d05b3bfef5e","blob":"df49410ebf42b4fbc9a8c032f81a0edc8fb95d0b","kind":"literal_piece","cap":32768},"control-proof.mjs":{"bytes":2206,"sha256":"a7318fd9452f0254fdb9ae1261040ab944ce2d56c443004579c51e55c2c63c71","blob":"ab38574f5fe697fd9f0d48f9ade065749f4a0c14","kind":"literal_piece","cap":32768},"site-receiver.mjs":{"bytes":5460,"sha256":"0d346b88c9594c45ef207f9fa4b57c984d13a3e64943904f880e2e2b96377ad2","blob":"c2cf804b6d427b5fc40da2b7d1375785a0a2f459","kind":"literal_piece","cap":32768},"normalized-sample.mjs":{"bytes":3987,"sha256":"2bee6afaa30f01f1f497512d595f24f3a0c92269e3b4ed7e2d2e349ae5b4419f","blob":"f7c2fefcc9df568a8453d876072a23a790b94fcd","kind":"literal_piece","cap":32768},"witness.mjs":{"bytes":1044,"sha256":"336df41b1994c8a315e4f56d976ddd0c9922397c702a02869ac8d44f42a8629a","blob":"b207c0c9ea759a9a146783b8818276444bef155b","kind":"literal_piece","cap":32768},"fixtures.json":{"bytes":7988,"sha256":"06b7dc9e63c178b6b823db1ee56049ce4d1406861df240ca2fbc119d2df45bc9","blob":"f29e76fd04627ebe5d1100007808610ebc240571","kind":"literal_piece","cap":32768},"controls.mjs":{"bytes":32337,"sha256":"b3a871fffa2bc831213c002dbff52a36e0fd38dd0b3aaec8da1b0368da516c71","blob":"4ae3dd79c6796915877741d83db8f388f333d841","kind":"literal_piece","cap":32768},"examples.json":{"bytes":22739,"sha256":"4f8da5a563bb0498cc506d693421853777ba7efb67d42da44b1889e5fef7b945","blob":"6f28d4f4479fb093aec3188d21b1796fd7c3fff2","kind":"literal_piece","cap":32768},"controls-boundary.py":{"bytes":12908,"sha256":"6e3dcd0c4f262a509b75499674375eaa3d91b9e83789f03689862f51734fc3d7","blob":"b6c39695cdca9963d083842b114b7e4fb59e6392","kind":"literal_piece","cap":32768},"controls-unavailable-example.json":{"bytes":568,"sha256":"7544b33859efe6ba2f6f1789e709f89f5f94f08352dd4fe4b14d700b19b22644","blob":"beedc03c8066cef6e6a24914d5334f99183d014b","kind":"literal_piece","cap":32768},"outer.mjs":{"bytes":25947,"sha256":"62f2faa1bff1a2aa2438e8c1794361910e44a6db9c632daa28185adc647bf515","blob":"c74d74879d6935c47d50b1233dad4027e6704365","kind":"literal_piece","cap":32768},"delivery-entry.sh":{"bytes":24013,"sha256":"63b7e32a4291e5a1b2fc3753a5ae89758dcf0913f6f2bf2d558bc3a0dd9f2961","blob":"2477c393fbc7d9883894ef7299b4f749cc3857ab","kind":"literal_piece","cap":32768},"controls-entry.sh":{"bytes":24058,"sha256":"e874d2de7710156e11726c7bd01626faa5351f94514cf0c42878e679981ad899","blob":"f0825d011a5e7942194a157a327ef7c42548180c","kind":"literal_piece","cap":32768},"oracle.mjs":{"bytes":1877,"sha256":"37c8724ced0eaa42bd54aa01aef1af7c3a7107ff3e78243e1f3d04da841fa4d1","blob":"652201ebe699664b97a5bc3d7c815a02dd889805","kind":"literal_piece","cap":32768},"lifetime.py":{"bytes":16073,"sha256":"f2b319e2a98a0959e421e80d7f94662476508f2ae6bc7cff2f9c6f8f0e17a791","blob":"765573c5eeaf83add464e94a8240dcd7a90786d0","kind":"literal_piece","cap":32768},"delivery-outer.mjs":{"bytes":25986,"sha256":"d32eaeb8d09e1d50dd14195fecec7606d457004ea6f61084900b94547cc6899f","blob":"aac76e8c15a01cbb308ba63ad7dec19e2d5ebb76","kind":"literal_piece","cap":32768},"controls-outer.mjs":{"bytes":25986,"sha256":"ada3cc7cf36a742d71c6ed12a7b5d15b91d56c4353aad02318a871ec370e4c35","blob":"e62dd9c4760da521b84f23b1c87855070767aac0","kind":"literal_piece","cap":32768},"missing-cwd-entry.sh":{"bytes":24130,"sha256":"e625cd8b88726576b278099856bd6b3126c02da4f31c387ba49ced923a5fa9fc","blob":"3666fdd52620bd2a30bfa3e100897b2fab1610c1","kind":"literal_piece","cap":32768},"race-creator.mjs":{"bytes":777,"sha256":"2657c30db6cff046599ff3d9cd2cdf7c3c312252b9636741627871d090372575","blob":"a6d47254adbf330a09b879a3a9b20ae4de476e73","kind":"literal_piece","cap":32768},"lifetime-controls.py":{"bytes":12219,"sha256":"d67b5c8c8e127c359f8d2b5d7da30da809b8d91bfb77759df4bbf9ecaaf53c59","blob":"21b0b82242a76efd94d34fe1f722e04fda6cd489","kind":"literal_piece","cap":32768},"authority-anchor.json":{"bytes":1964,"sha256":"e08d9864b16a1534b71344b817a6d3a78697d8d51af8ea798229a5f16d4b6407","blob":"1bed486f15a8743ef7c68470772835aaf4946a40","kind":"literal_piece","cap":32768},"bootstrap-prelude.mjs":{"bytes":19469,"sha256":"4d9dfc858ac38d90b36ca23a81eeacead6920d909d1ec641bd89cd03ae1b3270","blob":"fbbbac0ec6a0d7075f407e3dec6526848de3e563","kind":"literal_piece","cap":32768},"bootstrap-program.mjs":{"bytes":45673,"sha256":"053af9d4a00db088c1dc1ea50530036d80ec78b6078fd357a777dd8ce2e7bcea","blob":"44e7b948ab4577682abe3c4dc5b6b863dbc4cacf","kind":"bootstrap_program","cap":65536},"bootstrap-entry.py":{"bytes":31823,"sha256":"0911b9f00a29391e9696c22f3057076486a984bd8317a8bbb3dbfc157f3559a5","blob":"ee62b7335e296396e4f42bb4b94471263cdd04f7","kind":"literal_piece","cap":32768},"image-cleanup.py":{"bytes":1828,"sha256":"41fba6da9182935e7580bcdeabc41c4f47d307fea8cfabfd1b4ff7427cc9bd50","blob":"8b21083aa516439b63a6e99c059d82de76e8a443","kind":"literal_piece","cap":32768},"inactive-f7.yml":{"bytes":64881,"sha256":"fe45f2d89c16dd872257875ee6a8aaf17e237d928716a02917138bf2cbaf58ff","blob":"30f6be31456fc061aacc04ecc16b0aabd96cc2ef","kind":"workflow","cap":73728},"active-f7.yml":{"bytes":65147,"sha256":"e0f999e3d9aef8e40a804873829109fb99d43f633ad1811b0d2cb50d2336fbc1","blob":"36b9c0692d596c1173731c604e772ce6b2fcf478","kind":"workflow","cap":73728}}

## Actual machine receipt
```json
{
  "purpose": "afw.root.ma1.actual-admission-receipt.v1",
  "at": "2026-11-15 18:14:29 UTC",
  "source": "e10fc5bb98f39d569def2e24355a44b5d3e9bf8e",
  "sourceTree": "4e80d7f1bde215c40d9e1fc154fa77a62aa62903",
  "run": 43745210412,
  "attempt": 1,
  "job": 132906890534,
  "jobName": "readonly",
  "node": "22.23.4",
  "runConclusion": "failure",
  "jobConclusion": "failure",
  "steps": [
    {
      "name": "Check fixed MA1 reader controls",
      "number": 4,
      "status": "completed",
      "conclusion": "success"
    },
    {
      "name": "Run declared full104 controls only",
      "number": 5,
      "status": "completed",
      "conclusion": "failure"
    },
    {
      "name": "Read fixed MA1 admission observation",
      "number": 6,
      "status": "completed",
      "conclusion": "success"
    }
  ],
  "readerUnitActual": {
    "uniqueFrame": "MA1_READER_CONTROLS/1 passed=40",
    "assertions": 40,
    "passed": true
  },
  "originalReceiver": "38749c663f4dd58fbb5f1a3c940a3820c4ff5100",
  "original": {
    "record": {
      "purpose": "afw.r3-delivery.controls.v1",
      "source": "e10fc5bb98f39d569def2e24355a44b5d3e9bf8e",
      "sourceTree": "4e80d7f1bde215c40d9e1fc154fa77a62aa62903",
      "run": "43745210412",
      "attempt": 1,
      "job": "readonly",
      "node": "22.23.4",
      "matrixSha256": "0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e",
      "allPassed": false,
      "expected": 104,
      "passed": 104,
      "failed": 0,
      "unknown": 0,
      "results": [
        {
          "id": "A01",
          "result": "passed"
        },
        {
          "id": "A02",
          "result": "passed"
        },
        {
          "id": "A03",
          "result": "passed"
        },
        {
          "id": "A04",
          "result": "passed"
        },
        {
          "id": "D01",
          "result": "passed"
        },
        {
          "id": "D02",
          "result": "passed"
        },
        {
          "id": "D03",
          "result": "passed"
        },
        {
          "id": "D04",
          "result": "passed"
        },
        {
          "id": "D05",
          "result": "passed"
        },
        {
          "id": "D06",
          "result": "passed"
        },
        {
          "id": "D07",
          "result": "passed"
        },
        {
          "id": "D08",
          "result": "passed"
        },
        {
          "id": "D09",
          "result": "passed"
        },
        {
          "id": "D10",
          "result": "passed"
        },
        {
          "id": "D11",
          "result": "passed"
        },
        {
          "id": "D12",
          "result": "passed"
        },
        {
          "id": "D13",
          "result": "passed"
        },
        {
          "id": "P01",
          "result": "passed"
        },
        {
          "id": "P02",
          "result": "passed"
        },
        {
          "id": "P03",
          "result": "passed"
        },
        {
          "id": "P04",
          "result": "passed"
        },
        {
          "id": "P05",
          "result": "passed"
        },
        {
          "id": "P06",
          "result": "passed"
        },
        {
          "id": "P07",
          "result": "passed"
        },
        {
          "id": "P08",
          "result": "passed"
        },
        {
          "id": "P09",
          "result": "passed"
        },
        {
          "id": "P10",
          "result": "passed"
        },
        {
          "id": "P11",
          "result": "passed"
        },
        {
          "id": "P12",
          "result": "passed"
        },
        {
          "id": "P13",
          "result": "passed"
        },
        {
          "id": "P14",
          "result": "passed"
        },
        {
          "id": "P15",
          "result": "passed"
        },
        {
          "id": "P16",
          "result": "passed"
        },
        {
          "id": "P17",
          "result": "passed"
        },
        {
          "id": "P18",
          "result": "passed"
        },
        {
          "id": "P19",
          "result": "passed"
        },
        {
          "id": "P20",
          "result": "passed"
        },
        {
          "id": "P21",
          "result": "passed"
        },
        {
          "id": "P22",
          "result": "passed"
        },
        {
          "id": "P23",
          "result": "passed"
        },
        {
          "id": "P24",
          "result": "passed"
        },
        {
          "id": "P25",
          "result": "passed"
        },
        {
          "id": "F01",
          "result": "passed"
        },
        {
          "id": "F02",
          "result": "passed"
        },
        {
          "id": "F03",
          "result": "passed"
        },
        {
          "id": "F04",
          "result": "passed"
        },
        {
          "id": "F05",
          "result": "passed"
        },
        {
          "id": "F06",
          "result": "passed"
        },
        {
          "id": "F07",
          "result": "passed"
        },
        {
          "id": "F08",
          "result": "passed"
        },
        {
          "id": "F09",
          "result": "passed"
        },
        {
          "id": "B01",
          "result": "passed"
        },
        {
          "id": "B02",
          "result": "passed"
        },
        {
          "id": "B03",
          "result": "passed"
        },
        {
          "id": "B04",
          "result": "passed"
        },
        {
          "id": "B05",
          "result": "passed"
        },
        {
          "id": "B06",
          "result": "passed"
        },
        {
          "id": "B07",
          "result": "passed"
        },
        {
          "id": "B08",
          "result": "passed"
        },
        {
          "id": "B09",
          "result": "passed"
        },
        {
          "id": "B10",
          "result": "passed"
        },
        {
          "id": "B11",
          "result": "passed"
        },
        {
          "id": "B12",
          "result": "passed"
        },
        {
          "id": "B13",
          "result": "passed"
        },
        {
          "id": "W01",
          "result": "passed"
        },
        {
          "id": "W02",
          "result": "passed"
        },
        {
          "id": "C01",
          "result": "passed"
        },
        {
          "id": "C02",
          "result": "passed"
        },
        {
          "id": "C03",
          "result": "passed"
        },
        {
          "id": "C04",
          "result": "passed"
        },
        {
          "id": "C05",
          "result": "passed"
        },
        {
          "id": "D14",
          "result": "passed"
        },
        {
          "id": "P26",
          "result": "passed"
        },
        {
          "id": "F10",
          "result": "passed"
        },
        {
          "id": "E01",
          "result": "passed"
        },
        {
          "id": "E02",
          "result": "passed"
        },
        {
          "id": "E03",
          "result": "passed"
        },
        {
          "id": "E04",
          "result": "passed"
        },
        {
          "id": "E05",
          "result": "passed"
        },
        {
          "id": "E06",
          "result": "passed"
        },
        {
          "id": "O01",
          "result": "passed"
        },
        {
          "id": "O02",
          "result": "passed"
        },
        {
          "id": "O03",
          "result": "passed"
        },
        {
          "id": "O04",
          "result": "passed"
        },
        {
          "id": "O05",
          "result": "passed"
        },
        {
          "id": "S01",
          "result": "passed"
        },
        {
          "id": "E07",
          "result": "passed"
        },
        {
          "id": "T01",
          "result": "passed"
        },
        {
          "id": "F11",
          "result": "passed"
        },
        {
          "id": "A05",
          "result": "passed"
        },
        {
          "id": "U01",
          "result": "passed"
        },
        {
          "id": "U02",
          "result": "passed"
        },
        {
          "id": "U03",
          "result": "passed"
        },
        {
          "id": "U04",
          "result": "passed"
        },
        {
          "id": "H01",
          "result": "passed"
        },
        {
          "id": "L01",
          "result": "passed"
        },
        {
          "id": "L02",
          "result": "passed"
        },
        {
          "id": "L03",
          "result": "passed"
        },
        {
          "id": "L04",
          "result": "passed"
        },
        {
          "id": "L05",
          "result": "passed"
        },
        {
          "id": "E08",
          "result": "passed"
        },
        {
          "id": "E09",
          "result": "passed"
        },
        {
          "id": "E10",
          "result": "passed"
        },
        {
          "id": "E11",
          "result": "passed"
        }
      ],
      "mutants": [
        {
          "id": "M_RAW",
          "expectedFailedIds": [
            "D02"
          ],
          "actualFailedIds": [
            "D02"
          ],
          "result": "passed"
        },
        {
          "id": "M_PROVENANCE",
          "expectedFailedIds": [
            "P06"
          ],
          "actualFailedIds": [
            "P06"
          ],
          "result": "passed"
        },
        {
          "id": "M_OUTPUT",
          "expectedFailedIds": [
            "B05",
            "U01"
          ],
          "actualFailedIds": [
            "B05",
            "U01"
          ],
          "result": "unknown"
        },
        {
          "id": "M_ASSOC",
          "expectedFailedIds": [
            "S01"
          ],
          "actualFailedIds": [],
          "result": "unknown"
        }
      ],
      "nativeBusinessCases": 0,
      "nonclaims": {
        "historicalCauseProven": false,
        "receiptAuthenticated": false,
        "operationalReadiness": false,
        "completePackage": false,
        "PCoff": false,
        "globalNativeDrainVerified": false,
        "sdkNamespaceEmptyVerified": false
      },
      "cleanup": {
        "complete": true,
        "failedInstances": [],
        "unknownInstances": []
      }
    },
    "accepted": true,
    "qualified": false,
    "NativeReleased": false
  },
  "RootMA1Receiver": "c4175aba90ff0dbe7093847378912dbf33cb3e8c",
  "MA1": {
    "accepted": true,
    "available": true,
    "measurementEligible": true,
    "qualified": false,
    "NativeReleased": false,
    "operationalReadiness": false,
    "record": {
      "purpose": "afw.ma1.admission.v1",
      "source": "e10fc5bb98f39d569def2e24355a44b5d3e9bf8e",
      "sourceTree": "4e80d7f1bde215c40d9e1fc154fa77a62aa62903",
      "run": "43745210412",
      "attempt": 1,
      "job": "readonly",
      "node": "22.23.4",
      "matrixSha256": "0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e",
      "exceptionAt": "none",
      "phases": [
        [
          "baseline",
          "entered",
          104,
          0,
          false,
          true
        ],
        [
          "M_RAW",
          "entered",
          104,
          0,
          false,
          true
        ],
        [
          "M_PROVENANCE",
          "entered",
          104,
          0,
          false,
          true
        ],
        [
          "M_OUTPUT",
          "entered",
          96,
          0,
          true,
          false
        ],
        [
          "M_ASSOC",
          "gate",
          0,
          0,
          true,
          false
        ]
      ],
      "nonclaims": {
        "historicalCauseProven": false,
        "receiptAuthenticated": false,
        "operationalReadiness": false,
        "completePackage": false,
        "PCoff": false,
        "globalNativeDrainVerified": false,
        "sdkNamespaceEmptyVerified": false
      }
    },
    "observedAdmissionPhases": [
      "M_OUTPUT",
      "M_ASSOC"
    ]
  },
  "interpretation": {
    "scope": "Only actual Source e10fc5bb/run43745210412/1",
    "actualAttemptCalls": 408,
    "actualReturnedUnknown": 0,
    "outerException": "none",
    "baseline104": "passed",
    "M_RAW104": "passed exactD02",
    "M_PROVENANCE104": "passed exactP06",
    "M_OUTPUT": "96 attempted,0 returnedunknown,direct row-admission break; original failed[B05,U01] but resultunknown because incomplete",
    "M_ASSOC": "direct outer-admission refusal,0attempts",
    "reasonForMissingCoverageThisOccurrence": "Direct observed normal finite admission closures; no returnedunknown or outerexception observed in attempted408calls",
    "doesNotProve": "Cause of prior runs, complete four-mutant qualification, native/runtime or PCoff"
  },
  "SourceControlClocks": "Unchanged90s total/20s minimum admission, fixed104order/fourkillsets/case/cleanup/parent/outer clocks; no widening or source business call.",
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

## Root independent receiver used
```javascript
function(wire,ctx,matrix,evidence=null){
 const need=(v,m)=>{if(!v)throw Error("Root MA1: "+m)},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),ints=x=>Number.isInteger(x)&&!Object.is(x,-0);
 const marker="AFW_MA1_ADMISSION/1 ",mh="0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e",ids=["baseline","M_RAW","M_PROVENANCE","M_OUTPUT","M_ASSOC"],nk=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"],keys=["purpose","source","sourceTree","run","attempt","job","node","matrixSha256","exceptionAt","phases","nonclaims"];
 need(typeof wire==="string"&&wire.length<=1024&&wire.startsWith(marker)&&wire.endsWith("\n")&&!wire.slice(0,-1).includes("\n")&&/^[\x20-\x7e]*\n$/.test(wire),"frame");
 const raw=wire.slice(marker.length,-1),r=JSON.parse(raw);need(JSON.stringify(r)===raw&&eq(Object.keys(r),keys),"canonical keys");need(r.purpose==="afw.ma1.admission.v1"&&r.nonclaims&&eq(Object.keys(r.nonclaims),nk)&&nk.every(k=>r.nonclaims[k]===false),"purpose/nonclaims");
 const unavailable=()=>({accepted:true,available:false,measurementEligible:false,qualified:false,NativeReleased:false,operationalReadiness:false,record:r});
 if(keys.slice(1,-1).every(k=>r[k]==="unknown"))return unavailable();
 need(/^[a-f0-9]{40}$/.test(r.source)&&/^[a-f0-9]{40}$/.test(r.sourceTree)&&typeof r.run==="string"&&/^[1-9][0-9]{0,19}$/.test(r.run)&&r.attempt===1&&r.job==="readonly"&&r.node==="22.23.4"&&r.matrixSha256===mh,"context");
 need(ctx&&["source","sourceTree","run","attempt","job","node"].every(k=>r[k]===ctx[k]),"context match");
 need(["none","preflight",...ids].includes(r.exceptionAt)&&Array.isArray(r.phases)&&r.phases.length===5,"phase shape");
 let stopped=r.exceptionAt==="preflight",innerStop=false,sawCatch=stopped;
 for(let i=0;i<5;i++){
  const t=r.phases[i];need(Array.isArray(t)&&t.length===6&&t[0]===ids[i]&&["untouched","gate","entered"].includes(t[1]),"phase order/state");
  const [id,state,a,u,b,c]=t;need(ints(a)&&ints(u)&&a>=0&&a<=104&&u>=0&&u<=a&&typeof b==="boolean"&&typeof c==="boolean","phase fields");
  const ex=r.exceptionAt===id;
  if(stopped){need(eq(t,[id,"untouched",0,0,false,false]),"stopped suffix");continue;}
  need(state!=="untouched"&&(i!==0||state==="entered"),"selected phase");
  if(innerStop)need(state==="gate","monotonic next gate");
  if(state==="gate"){
   need(i>0&&a===0&&u===0&&!c,"gate shape");need((b&&!ex)||(!b&&ex),"gate reason");stopped=true;innerStop=false;
  }else{
   need(!innerStop,"entered after inner stop");if(c)need(a===104&&!b,"complete implies exhausted");if(b)need(a<104&&!c,"row break prefix");
   if(!b&&!c)need(ex,"incomplete catch");if(i===0&&ex)need(!b&&!c,"baseline catch placement");
   innerStop=b&&!ex;stopped=ex;
  }
  if(ex)sawCatch=true;
 }
 need(r.exceptionAt==="none"?!sawCatch:sawCatch,"catch location");
 const out={accepted:true,available:true,measurementEligible:false,qualified:false,NativeReleased:false,operationalReadiness:false,record:r};
 if(evidence===null)return out;
 need(matrix&&Array.isArray(matrix.ordered)&&matrix.ordered.length===104&&Array.isArray(matrix.mutants)&&matrix.mutants.length===4,"matrix");
 need(eq(matrix.ordered.map(x=>x.id),["A01","A02","A03","A04","D01","D02","D03","D04","D05","D06","D07","D08","D09","D10","D11","D12","D13","P01","P02","P03","P04","P05","P06","P07","P08","P09","P10","P11","P12","P13","P14","P15","P16","P17","P18","P19","P20","P21","P22","P23","P24","P25","F01","F02","F03","F04","F05","F06","F07","F08","F09","B01","B02","B03","B04","B05","B06","B07","B08","B09","B10","B11","B12","B13","W01","W02","C01","C02","C03","C04","C05","D14","P26","F10","E01","E02","E03","E04","E05","E06","O01","O02","O03","O04","O05","S01","E07","T01","F11","A05","U01","U02","U03","U04","H01","L01","L02","L03","L04","L05","E08","E09","E10","E11"])&&eq(matrix.mutants.map(x=>[x.id,x.expectedFailedIds]),[["M_RAW",["D02"]],["M_PROVENANCE",["P06"]],["M_OUTPUT",["B05","U01"]],["M_ASSOC",["S01"]]]),"pinned matrix identities");
 const ac=evidence.original;need(ac&&ac.accepted===true&&ac.record&&["source","sourceTree","run","attempt","job","node","matrixSha256"].every(k=>ac.record[k]===r[k]),"original contextual");
 const o=ac.record,ordered=matrix.ordered.map(x=>x.id);need(o.results?.length===104&&o.results.every((x,i)=>x.id===ordered[i]&&["passed","failed","unknown"].includes(x.result))&&o.mutants?.length===4,"original rows");
 const [_,bs,ba,bu,bb,bc]=r.phases[0],unknownPrefix=o.results.slice(0,ba).filter(x=>x.result==="unknown").length;
 need(o.results.slice(ba).every(x=>x.result==="unknown"),"baseline unattempted unknown");
 if(r.exceptionAt==="baseline"){need(unknownPrefix===bu||(ba>0&&unknownPrefix===bu+1&&o.results[ba-1].result==="unknown"),"baseline catch join");}else need(unknownPrefix===bu,"baseline unknown join");
 for(let i=1;i<5;i++){
  const [id,s,a,u,b,c]=r.phases[i],m=o.mutants[i-1],spec=matrix.mutants[i-1];need(m.id===id&&spec.id===id&&eq(m.expectedFailedIds,spec.expectedFailedIds),"mutant identity");
  need(Array.isArray(m.actualFailedIds)&&m.actualFailedIds.length<=a-u&&m.actualFailedIds.every(x=>ordered.slice(0,a).includes(x)),"mutant failed prefix");
  const expected=m.actualFailedIds.filter(x=>ordered.includes(x)).slice().sort((x,y)=>ordered.indexOf(x)-ordered.indexOf(y));need(eq(expected,m.actualFailedIds)&&new Set(expected).size===expected.length,"mutant failure order");
  if(s!=="entered"){need(m.result==="unknown"&&m.actualFailedIds.length===0,"unentered original");continue;}
  const ex=r.exceptionAt===id,normal=(u>0||b)?"unknown":c?(eq(m.actualFailedIds,spec.expectedFailedIds)?"passed":"failed"):"unknown";
  if(!ex)need(m.result===normal,"mutant normal join");
  else if(!b&&!c)need(m.result==="unknown"&&m.actualFailedIds.length===0,"mutant in-loop catch initial");
  else need(m.result==="unknown"||m.result===normal,"mutant post-loop catch join");
 }
 const attempted=new Set();for(let i=0;i<5;i++)for(const id of ordered.slice(0,r.phases[i][2]))attempted.add(ids[i]+":"+id);
 need(o.cleanup&&Array.isArray(o.cleanup.failedInstances)&&Array.isArray(o.cleanup.unknownInstances)&&[...o.cleanup.failedInstances,...o.cleanup.unknownInstances].every(x=>attempted.has(x)),"cleanup attempted only");
 const run=evidence.run,jobs=evidence.jobs,commit=evidence.commit;
 need(ints(ctx.jobId)&&ctx.jobId>0&&run&&String(run.id)===r.run&&run.head_sha===r.source&&run.run_attempt===1&&run.event==="push"&&run.path===".github/workflows/afw-finite-budget-qualification.yml"&&run.status==="completed"&&typeof run.conclusion==="string"&&run.conclusion!=="","run metadata");
 need(commit&&commit.sha===r.source&&commit.tree?.sha===r.sourceTree,"Source tree metadata");
 need(Array.isArray(jobs)&&jobs.length===1&&jobs[0].id===ctx.jobId&&jobs[0].run_id===run.id&&jobs[0].name==="readonly"&&jobs[0].status==="completed"&&typeof jobs[0].conclusion==="string"&&jobs[0].conclusion!=="","job metadata");
 const steps=jobs[0].steps;need(Array.isArray(steps),"steps");const originals=steps.filter(s=>s.name==="Run declared full104 controls only"),readers=steps.filter(s=>s.name==="Read fixed MA1 admission observation");
 need(originals.length===1&&readers.length===1,"unique steps");const os=originals[0],rs=readers[0];const units=steps.filter(s=>s.name==="Check fixed MA1 reader controls");need(units.length===1&&units[0].status==="completed"&&units[0].conclusion==="success"&&ints(units[0].number)&&units[0].number<os.number,"reader cloud controls step");
 need(os.status==="completed"&&["success","failure"].includes(os.conclusion)&&rs.status==="completed"&&rs.conclusion==="success"&&ints(os.number)&&ints(rs.number)&&os.number<rs.number,"step binding");
 need(Array.isArray(evidence.readerFrames)&&evidence.readerFrames.length===1&&evidence.readerFrames[0]===wire&&evidence.readerFrameStepNumber===rs.number&&Array.isArray(evidence.originalFrames)&&evidence.originalFrames.length===1&&evidence.originalFrameStepNumber===os.number,"actual step frames");
 need(evidence.originalFrames[0]==="AFW_R3_DELIVERY_CONTROLS/1 "+JSON.stringify(o)+"\n","actual original frame equals accepted record");
 need(run.repository?.id===1347578006&&run.repository?.full_name==="tokenizartinfo-ops/agent-friendly-web"&&run.head_branch==="feat/finite-native-cleanup-20261101","API repository/ref");
 need(!(run.conclusion==="success"&&jobs[0].conclusion!=="success")&&!(jobs[0].conclusion==="success"&&os.conclusion!=="success"),"conclusion consistency");
 need(evidence.repository==="tokenizartinfo-ops/agent-friendly-web"&&evidence.repositoryId===1347578006&&evidence.ref==="refs/heads/feat/finite-native-cleanup-20261101","fixed origin");
 out.measurementEligible=true;out.observedAdmissionPhases=r.phases.filter(t=>t[4]).map(t=>t[0]);return out;
}
```
RootOWN-onlytests7contextpositive+1neutral/24grammarnegative/28joinnegative plusunitstepmandatoryconjunction7positives/5newnegatives. ExecutedSourceReader40checks isseparateactualGHAevidence. Sourceunitnegativewrong-owner/read/identity tests useexplicit syscall fault injection aroundactualfunctions, notrealchown/replicaparser. ActualoneOriginalframe5 andMA1readerframe6 orderedafterunitframe4; Root API allsteps terminal. QualifiedalwaysfalseforMA1 evenvalidmeasurement. ExistingRoot387originalcontrols/a1c scopesunchanged.

## Review remit
Bothspeccomplianceandqualityrequired. Actualdiagnostic accepted isnotoldhistoricalcausation/fullqualification. ReviewentireMA1 taskincludingobservationalinfluence, failclosedmetadata/file handling, transition/crossframejoin andpurposeconstraints. Do notreruntests/executeSourcePC, refs orprovider. Existing3deferreddiagnosticL05minorsafec2162remainseparateprojectionsandOriginalI3loadbearingheld. Allsevenclaimsfalse. Complete25artifactindex46a254d1b6ca011c0fbd58490df49e99aff39a21; Rootdocs27objects a1c7ec7516e861e6553208c83951909ce690f60d. Actorreportlogicalpath followsbrief.
