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
