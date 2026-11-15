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
