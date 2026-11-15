# Fixed Linux transport lineage. Roles and targets are Source literals, never caller paths/PIDs.
import os,sys,stat,re,signal,ctypes,errno,fcntl,runpy,shutil,hashlib,time
def _r3diag(event):pass
_r3diag('imports_ready')
_obs_wake=None
_obs_site='unknown'
_obs_reject=False
_obs_sent=False
def _obs_mark(site):
 global _obs_site,_obs_reject
 _obs_site=site;_obs_reject=False
def _obs_check(v):
 global _obs_reject
 if not v:_obs_reject=True
 need(v)
def _obs_note(exc=None):
 global _obs_sent
 try:
  if _obs_sent or _obs_wake is None or _obs_site=='unknown':return
  cls='arm_return' if exc is None and _obs_site=='arm_return' else 'check_rejected' if _obs_reject else 'os_error' if isinstance(exc,OSError) else None
  if cls is None:return
  import json
  data=('~'+json.dumps([_obs_site,cls,*_obs_wake],separators=(',',':'))+'\n').encode()
  if len(data)<=256:
   _obs_sent=True;old=fcntl.fcntl(7,fcntl.F_GETFL)
   try:
    fcntl.fcntl(7,fcntl.F_SETFL,old|os.O_NONBLOCK);os.write(7,data)
   finally:fcntl.fcntl(7,fcntl.F_SETFL,old)
 except BaseException:pass
def _fixture_event(kind):
 global _obs_wake
 import json
 raw=open('/proc/self/stat').read();parts=raw[raw.rfind(')')+2:].split();v={'kind':kind,'pid':os.getpid(),'ppid':os.getppid(),'start':parts[19]};os.write(7,(json.dumps(v,separators=(',',':'))+'\n').encode())
 if kind=='EOF_WOKE':_obs_wake=(v['pid'],v['ppid'],v['start'])
class CreatorDead(ValueError):pass
def need(v):
 if not v:raise ValueError()
libc=ctypes.CDLL(None,use_errno=True)
libc.prctl.argtypes=[ctypes.c_int,ctypes.c_ulong,ctypes.c_ulong,ctypes.c_ulong,ctypes.c_ulong];libc.prctl.restype=ctypes.c_int
def death_get():
 value=ctypes.c_int(0);need(libc.prctl(2,ctypes.addressof(value),0,0,0)==0);return value.value
def creator():
 _obs_mark('fd4_type_owner')
 _obs_check(stat.S_ISDIR(os.fstat(4).st_mode) and os.fstat(4).st_uid==os.getuid())
 _obs_mark('fd4_read_mode')
 _obs_check(fcntl.fcntl(4,fcntl.F_GETFL)&os.O_ACCMODE==os.O_RDONLY)
 _obs_mark('fd4_link_form')
 link=os.readlink('/proc/self/fd/4');match=re.fullmatch(r'/proc/([1-9][0-9]*)/task/([1-9][0-9]*)',link);_obs_check(match is not None)
 _obs_mark('fd4_pid_tid')
 pid,tid=map(int,match.groups());_obs_check(pid==tid)
 _obs_mark('creator_ppid')
 if pid!=os.getppid():raise CreatorDead()
 _obs_mark('stat_open')
 f=os.open('stat',os.O_RDONLY|os.O_NOFOLLOW,dir_fd=4)
 _obs_mark('stat_read_close')
 try:raw=os.read(f,4097);_obs_check(len(raw)<=4096)
 finally:os.close(f)
 _obs_mark('stat_text')
 text=raw.decode('ascii');at=text.rfind(')');_obs_check(at>0 and text[:text.index('(')].strip()==str(pid));parts=text[at+2:].split();_obs_check(len(parts)>=20 and parts[0] not in ['Z','X'] and parts[19].isdigit())
 return pid,parts[19]
def main_thread():
 link=os.readlink('/proc/thread-self');m=re.fullmatch(r'(?:/proc/)?([1-9][0-9]*)/task/([1-9][0-9]*)',link);need(m is not None and int(m[1])==int(m[2])==os.getpid())
def arm():
 main_thread();before=creator()
 _r3diag('creator_checked')
 if sys.argv[1]=='node-witness':
  _fixture_event('shim');need(stat.S_ISFIFO(os.fstat(0).st_mode));need(os.read(0,1)==b'');_fixture_event('EOF_WOKE')
 _obs_mark('arm_set_verify')
 _obs_check(libc.prctl(1,signal.SIGKILL,0,0,0)==0 and death_get()==signal.SIGKILL)
 _obs_before=creator()
 _obs_mark('same_creator');_obs_check(_obs_before==before)
 if _obs_wake is not None:_obs_mark('arm_return');_obs_note()
 _r3diag('pdeath_checked')
 return before
def sealed_source(data,label,maximum):
 need(type(data) is bytes and 0<len(data)<=maximum and maximum in [32768,65536] and label in ['afw-r3-lifetime','afw-r3-module','afw-r3-parent','afw-r3-helper'])
 f=os.memfd_create(label,os.MFD_CLOEXEC|os.MFD_ALLOW_SEALING)
 try:
  at=0
  while at<len(data):
   n=os.write(f,memoryview(data)[at:]);need(n>0);at+=n
  os.fchmod(f,0o400);os.lseek(f,0,os.SEEK_SET)
  seals=fcntl.F_SEAL_WRITE|fcntl.F_SEAL_GROW|fcntl.F_SEAL_SHRINK|fcntl.F_SEAL_SEAL
  fcntl.fcntl(f,fcntl.F_ADD_SEALS,seals);need(fcntl.fcntl(f,fcntl.F_GET_SEALS)&seals==seals)
  return f
 except BaseException:os.close(f);raise
def kernel_bytes():
 s=os.fstat(5);seals=fcntl.F_SEAL_WRITE|fcntl.F_SEAL_GROW|fcntl.F_SEAL_SHRINK|fcntl.F_SEAL_SEAL
 need(stat.S_ISREG(s.st_mode) and s.st_uid==os.getuid() and s.st_mode&0o777==0o400 and 0<s.st_size<=32768 and fcntl.fcntl(5,fcntl.F_GET_SEALS)&seals==seals)
 data=os.pread(5,32769,0);need(len(data)==s.st_size);return data
def helper_bytes(name):
 need(name in ['lifetime.py','boundary.py','controls-boundary.py','delivery-entry.sh','controls-entry.sh','missing-cwd-entry.sh','delivery-outer.mjs','controls-outer.mjs','witness.mjs','lifetime-controls.py','race-creator.mjs'])
 d=os.fstat(6);need(stat.S_ISDIR(d.st_mode) and d.st_uid==os.getuid() and not d.st_mode&0o077)
 f=os.open(name,os.O_RDONLY|os.O_NOFOLLOW|os.O_NONBLOCK,dir_fd=6)
 try:
  s=os.fstat(f);need(stat.S_ISREG(s.st_mode) and s.st_uid==os.getuid() and s.st_nlink==1 and not s.st_mode&0o077 and 0<s.st_size<=32768)
  data=bytearray()
  while True:
   part=os.read(f,32769-len(data))
   if not part:break
   data.extend(part);need(len(data)<=32768)
  need(len(data)==s.st_size and _image_meta(s)==_image_meta(os.fstat(f)));return bytes(data)
 finally:os.close(f)
def helper_fd(name):
 return sealed_source(helper_bytes(name),'afw-r3-helper',32768)
def _image_need(ok,event):
 if not ok:_r3diag(event)
 need(ok)
def executable(fd,kind='target'):
 try:s=os.fstat(fd)
 except BaseException:
  _r3diag(kind+'_fstat_failed');raise
 _image_need(stat.S_ISREG(s.st_mode),kind+'_regular_rejected')
 _image_need(not s.st_mode&(stat.S_ISUID|stat.S_ISGID),kind+'_setid_rejected')
 _image_need(s.st_mode&0o111,kind+'_execbits_rejected')
 _image_need(s.st_uid in [0,os.getuid()],kind+'_owner_rejected')
 if kind=='target':_image_need(not s.st_mode&0o022,kind+'_writebits_rejected')
 try:cap=os.getxattr(fd,'security.capability')
 except OSError as error:
  if error.errno!=errno.ENODATA:_r3diag(kind+'_xattr_failed')
  need(error.errno==errno.ENODATA)
 except BaseException:
  _r3diag(kind+'_xattr_failed');raise
 else:_image_need(cap==b'',kind+'_caps_nonempty')
 _image_need(os.geteuid()==os.getuid(),kind+'_uid_rejected')
 _image_need(os.getegid()==os.getgid(),kind+'_gid_rejected')
def private_root():
 r=os.fstat(9);path=os.readlink('/proc/self/fd/9');parent=os.environ.get('RUNNER_TEMP','').rstrip('/')
 need(os.path.isabs(parent) and os.path.realpath(parent)==parent and re.fullmatch(re.escape(parent)+r'/afw-r3-node\.[A-Za-z0-9]{8}',path) is not None)
 need(stat.S_ISDIR(r.st_mode) and r.st_uid==os.getuid() and r.st_mode&0o7777==0o700 and r.st_nlink==2 and fcntl.fcntl(9,fcntl.F_GETFL)&os.O_ACCMODE==os.O_RDONLY)
 p=os.open('..',os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW,dir_fd=9)
 try:
  s=os.fstat(p);need(stat.S_ISDIR(s.st_mode) and s.st_uid in [0,os.getuid()] and not s.st_mode&0o022 and os.readlink('/proc/self/fd/'+str(p))==parent)
  name=os.path.basename(path);n=os.stat(name,dir_fd=p,follow_symlinks=False)
  need((n.st_dev,n.st_ino)==(r.st_dev,r.st_ino) and stat.S_ISDIR(n.st_mode));return p,name,r
 except BaseException:os.close(p);raise
def _copy_need(ok,event):
 _image_need(ok,event)
def _copy_check(end):
 _copy_need(time.monotonic()<=end,'copy_time_exceeded')
def _copy_call(end,event,fn,*args,**kwargs):
 _copy_check(end)
 try:value=fn(*args,**kwargs)
 except BaseException:_r3diag(event);raise
 _copy_check(end);return value
def _image_meta(s):
 return (s.st_dev,s.st_ino,s.st_size,s.st_uid,s.st_gid,s.st_mode,s.st_nlink,s.st_mtime_ns,s.st_ctime_ns)
def private_image(image):
 end=time.monotonic()+15;writer=target=None;p=None
 try:
  try:p,name,root=private_root()
  except BaseException:_r3diag('copy_root_rejected');raise
  before=_copy_call(end,'input_fstat_failed',os.fstat,image)
  _copy_need(0<before.st_size<=268435456,'copy_size_rejected')
  writer=_copy_call(end,'copy_create_failed',os.open,'node',os.O_WRONLY|os.O_CREAT|os.O_EXCL|os.O_NOFOLLOW,0o600,dir_fd=9)
  made=_copy_call(end,'copy_target_changed',os.fstat,writer)
  _copy_need(stat.S_ISREG(made.st_mode) and made.st_uid==os.getuid() and made.st_nlink==1 and made.st_mode&0o7777==0o600,'copy_target_changed')
  _copy_call(end,'copy_seek_failed',os.lseek,image,0,os.SEEK_SET)
  a=hashlib.sha256();total=0
  while True:
   block=_copy_call(end,'copy_read_failed',os.read,image,min(1048576,before.st_size+1-total))
   if not block:break
   total+=len(block);_copy_need(total<=before.st_size,'copy_size_rejected');a.update(block);at=0
   while at<len(block):
    n=_copy_call(end,'copy_write_failed',os.write,writer,memoryview(block)[at:]);_copy_need(n>0,'copy_write_failed');at+=n
  _copy_need(total==before.st_size,'copy_size_rejected')
  _copy_call(end,'copy_mode_failed',os.fchmod,writer,0o500)
  target=_copy_call(end,'copy_readonly_failed',os.open,'node',os.O_RDONLY|os.O_NOFOLLOW|os.O_NONBLOCK,dir_fd=9)
  ts=_copy_call(end,'copy_target_changed',os.fstat,target)
  _copy_need((ts.st_dev,ts.st_ino)==(made.st_dev,made.st_ino) and ts.st_size==total and ts.st_uid==os.getuid() and ts.st_nlink==1 and ts.st_mode&0o7777==0o500,'copy_target_changed')
  _copy_call(end,'copy_writer_close_failed',os.close,writer);writer=None
  hashes=[]
  for fd,event in [(target,'copy_read_failed'),(image,'copy_read_failed')]:
   _copy_call(end,'copy_seek_failed',os.lseek,fd,0,os.SEEK_SET);h=hashlib.sha256();count=0
   while True:
    block=_copy_call(end,event,os.read,fd,min(1048576,total+1-count))
    if not block:break
    count+=len(block);_copy_need(count<=total,'copy_size_rejected');h.update(block)
   _copy_need(count==total,'copy_size_rejected');hashes.append(h.digest())
  _copy_need(a.digest()==hashes[0]==hashes[1],'copy_hash_mismatch')
  after=_copy_call(end,'input_fstat_failed',os.fstat,image)
  _copy_need(_image_meta(before)==_image_meta(after),'copy_source_changed')
  executable(image,'input');_copy_check(end)
  _copy_need(_image_meta(ts)==_image_meta(_copy_call(end,'copy_target_changed',os.fstat,target)),'copy_target_changed')
  executable(target)
  named=_copy_call(end,'target_identity_rejected',os.stat,'node',dir_fd=9,follow_symlinks=False)
  _copy_need(_image_meta(named)==_image_meta(ts) and fcntl.fcntl(target,fcntl.F_GETFL)&os.O_ACCMODE==os.O_RDONLY,'target_identity_rejected')
  _copy_call(end,'copy_seek_failed',os.lseek,target,0,os.SEEK_SET)
  _copy_call(end,'copy_root_rejected',os.close,p);p=None
  _copy_check(end);result=target;target=None;return result
 except BaseException:_r3diag('copy_unavailable');raise
 finally:
  for f in [writer,target,p]:
   if f is not None:
    try:os.close(f)
    except BaseException:pass
def prepare_node_child():
 # This is a NEW fork; refresh fd4 to THIS actual creating main thread.
 main_thread();own=os.open('/proc/thread-self',os.O_RDONLY|os.O_DIRECTORY);os.dup2(own,4,inheritable=True)
 if own!=4:os.close(own)
 expected=os.getpid();executable(3)
 def before_exec():
  try:
   need(os.getppid()==expected);arm();executable(3);need(os.getppid()==expected and death_get()==signal.SIGKILL)
  except BaseException:os._exit(125)
 return before_exec
def exec_node(name,case=None,initial=False):
 # EXEC replacement keeps the same creator and relationship. Do NOT refresh fd4.
 if name is None and initial:
  # One initial Source-literal node selection from successful setup-node PATH; custody is the opened object.
  try:path=shutil.which('node')
  except BaseException:
   _r3diag('input_which_failed');raise
  _image_need(type(path) is str and os.path.isabs(path) and len(path)<=4096,'input_path_rejected')
  try:resolved=os.path.realpath(path)
  except BaseException:
   _r3diag('input_realpath_failed');raise
  try:image=os.open(resolved,os.O_RDONLY|os.O_NOFOLLOW)
  except BaseException:
   _r3diag('input_open_failed');raise
  executable(image,'input')
  target=private_image(image)
  try:os.close(image)
  except BaseException:
   _r3diag('input_close_failed');raise
  try:os.dup2(target,3,inheritable=True)
  except BaseException:
   _r3diag('target_dup2_failed');raise
  if target!=3:
   try:os.close(target)
   except BaseException:
    _r3diag('target_close_failed');raise
  os.close(9)
  _r3diag('image_checked')
 else:
  executable(3)
  if name is not None:
   f=helper_fd(name);os.dup2(f,0,inheritable=True)
   if f!=0:os.close(f)
 if name is None:
  s=os.fstat(0);seals=fcntl.F_SEAL_WRITE|fcntl.F_SEAL_GROW|fcntl.F_SEAL_SHRINK|fcntl.F_SEAL_SEAL
  need(stat.S_ISREG(s.st_mode) and 0<s.st_size<=65536 and fcntl.fcntl(0,fcntl.F_GET_SEALS)&seals==seals)
 kernel_bytes()
 for n in [3,4,5,6] if name is not None else [3,4,5]:os.set_inheritable(n,True);os.set_inheritable(7,True)
 need(death_get()==signal.SIGKILL and os.execve in os.supports_fd)
 args=['node','--disable-warning=ExperimentalWarning','--input-type=module','-']
 if case is not None:need(case in ['timeout','python','outer','bash','race']);args.append(case)
 _r3diag('exec_handoff')
 os.execve(3,args,dict(os.environ))
def exec_bash(name):
 f=helper_fd(name);os.set_inheritable(f,True)
 bash=os.open('/usr/bin/bash',os.O_RDONLY);executable(bash)
 for n in [3,4,5,6]:os.set_inheritable(n,True);os.set_inheritable(7,True)
 need(death_get()==signal.SIGKILL and os.execve in os.supports_fd)
 os.execve(bash,['bash','/proc/self/fd/'+str(f)],dict(os.environ))
def remove_empty_cwd():
 own=os.path.realpath('/proc/self/fd/6');base=os.path.dirname(os.path.dirname(own));cwd=os.getcwd()
 need(cwd==base+'/gone' and os.path.realpath(cwd)==cwd and not os.listdir('.'))
 s=os.stat('.');need(s.st_uid==os.getuid() and stat.S_ISDIR(s.st_mode));os.rmdir(cwd)
 try:os.lstat(cwd);raise ValueError()
 except OSError as error:need(error.errno==errno.ENOENT)
def make_fifo():
 own=os.path.realpath('/proc/self/fd/6');base=os.path.dirname(os.path.dirname(own));need(os.getcwd()==base+'/work')
 path='output/finite-budget/readonly/R3/r3-existing-sample.json'
 need(os.path.realpath(os.path.dirname(path)).startswith(base+'/work/'));os.mkfifo(path,0o600)
def main():
 need(len(sys.argv)==2 and type(sys.argv[1]) is str);role=sys.argv[1]
 need(role in ['bootstrap-initial','bootstrap-stdin','bootstrap-delivery','bootstrap-controls','parent-delivery','parent-controls','case-delivery','case-controls','case-missing-cwd','node-delivery','node-controls','node-witness','remove-empty-cwd','make-fifo','node-race-creator','life-timeout','life-python','life-outer','life-bash','life-race'])
 arm()
 if role in ['parent-delivery','parent-controls','life-timeout','life-python','life-outer','life-bash','life-race']:
  name=('boundary.py' if role=='parent-delivery' else 'controls-boundary.py') if role.startswith('parent-') else 'lifetime-controls.py'
  if role.startswith('parent-'):
   expected=kernel_bytes();materialized=helper_bytes('lifetime.py')
   if hashlib.sha256(materialized).digest()!=hashlib.sha256(expected).digest() or materialized!=expected:
    os.write(1,b'AFW_R3_PARENT_INPUT_REJECTED/1\n');raise SystemExit(23)
   data=bytearray()
   while True:
    part=os.read(0,32769-len(data))
    if not part:break
    data.extend(part);need(len(data)<=32768)
   f=sealed_source(bytes(data),'afw-r3-parent',32768)
  else:f=helper_fd(name)
  if role.startswith('life-'):sys.argv=['lifetime-controls.py','-',role[5:]]
  try:runpy.run_path('/proc/self/fd/'+str(f),init_globals={'r3_prepare_node_child':prepare_node_child},run_name='__main__')
  finally:os.close(f)
 elif role in ['bootstrap-initial','bootstrap-stdin','bootstrap-delivery','bootstrap-controls']:exec_node(None,initial=role=='bootstrap-initial')
 elif role=='case-delivery':exec_bash('delivery-entry.sh')
 elif role=='case-controls':exec_bash('controls-entry.sh')
 elif role=='case-missing-cwd':exec_bash('missing-cwd-entry.sh')
 elif role=='node-delivery':exec_node('delivery-outer.mjs')
 elif role=='node-controls':exec_node('controls-outer.mjs')
 elif role=='node-witness':exec_node('witness.mjs')
 elif role=='node-race-creator':
  need(stat.S_ISFIFO(os.fstat(0).st_mode) and fcntl.fcntl(0,fcntl.F_GETFL)&os.O_ACCMODE==os.O_RDONLY);os.dup2(0,8,inheritable=True);exec_node('race-creator.mjs')
 elif role=='remove-empty-cwd':remove_empty_cwd()
 elif role=='make-fifo':make_fifo()
try:main()
except SystemExit as result:raise SystemExit(result.code if type(result.code) is int and 0<=result.code<=255 else 1)
except CreatorDead:
 _fixture_event('CreatorDead');raise SystemExit(1)
except BaseException as _obs_exc:
 _obs_note(_obs_exc)
 role=sys.argv[1] if len(sys.argv)==2 else ''
 if role in ['bootstrap-initial','bootstrap-delivery','bootstrap-controls']:
  record={"delivery":{"purpose":"afw.r3-delivery.unavailable.v1","reason":"outer_startup_unavailable","source":"unknown","sourceTree":"unknown","run":"unknown","attempt":"unknown","job":"unknown","node":"unknown","controls":"unknown","availability":"unavailable","sourceQualified":False,"collectionComplete":"unknown","sampleObserved":"unknown","nonclaims":{"historicalCauseProven":False,"receiptAuthenticated":False,"operationalReadiness":False,"completePackage":False,"PCoff":False,"globalNativeDrainVerified":False,"sdkNamespaceEmptyVerified":False}},"controls":{"purpose":"afw.r3-delivery.controls-unavailable.v1","reason":"outer_startup_unavailable","source":"unknown","sourceTree":"unknown","run":"unknown","attempt":"unknown","job":"unknown","node":"unknown","allPassed":"unknown","expected":104,"passed":"unknown","failed":"unknown","unknown":"unknown","results":"unknown","mutants":"unknown","nativeBusinessCases":0,"nonclaims":{"historicalCauseProven":False,"receiptAuthenticated":False,"operationalReadiness":False,"completePackage":False,"PCoff":False,"globalNativeDrainVerified":False,"sdkNamespaceEmptyVerified":False}}}
  kind='delivery' if role=='bootstrap-delivery' else 'controls'
  try:os.write(1,(('AFW_R3_DELIVERY_UNAVAILABLE/1' if kind=='delivery' else 'AFW_R3_DELIVERY_CONTROLS_UNAVAILABLE/1')+' '+__import__('json').dumps(record[kind],separators=(',',':'))+'\n').encode('ascii'))
  except BaseException:pass
 raise SystemExit(1)
