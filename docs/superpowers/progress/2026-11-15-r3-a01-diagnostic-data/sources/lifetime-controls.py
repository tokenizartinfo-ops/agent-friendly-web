# Own synthetic transport probes only. No PID/path/error is emitted in the result.
import os,sys,json,time,stat,signal,selectors,subprocess,errno,select,fcntl
case=sys.argv[2] if len(sys.argv)==3 else ''
result='unknown';child=None;selector=None;pidfds={};verified=set();readies={};out=bytearray();err=bytearray();probe=bytearray();started=time.monotonic();deadline=started+4.5;cleanup_end=started+4.8
fallback=json.loads("{\"purpose\":\"afw.r3-delivery.unavailable.v1\",\"reason\":\"outer_startup_unavailable\",\"source\":\"unknown\",\"sourceTree\":\"unknown\",\"run\":\"unknown\",\"attempt\":\"unknown\",\"job\":\"unknown\",\"node\":\"unknown\",\"controls\":\"unknown\",\"availability\":\"unavailable\",\"sourceQualified\":false,\"collectionComplete\":\"unknown\",\"sampleObserved\":\"unknown\",\"nonclaims\":{\"historicalCauseProven\":false,\"receiptAuthenticated\":false,\"operationalReadiness\":false,\"completePackage\":false,\"PCoff\":false,\"globalNativeDrainVerified\":false,\"sdkNamespaceEmptyVerified\":false}}")
def need(v):
 if not v:raise ValueError()
def file(name):
 return '/proc/self/fd/6/'+name
def rewrite(name,old,new):
 path=file(name);text=open(path).read();need(text.count(old)==1);open(path,'w').write(text.replace(old,new))
def info(pid):
 raw=open('/proc/'+str(pid)+'/stat').read();at=raw.rfind(')');need(at>0 and raw[:raw.index('(')].strip()==str(pid));parts=raw[at+2:].split();need(len(parts)>=20)
 return {'pid':pid,'ppid':int(parts[1]),'state':parts[0],'start':parts[19]}
def held(pid,start=None):
 before=info(pid)
 if start is not None:need(before['start']==start)
 fd=os.pidfd_open(pid,0);after=info(pid)
 need(before['start']==after['start'])
 pidfds[pid]=fd;return after
def send(pid,sig):
 need(pid in verified and pid in pidfds);signal.pidfd_send_signal(pidfds[pid],sig,None,0)
def terminated(pid):
 need(pid in pidfds);poller=select.poll();poller.register(pidfds[pid],select.POLLIN);return bool(poller.poll(0))
def pump(duration=0.02):
 global probe
 need(time.monotonic()<deadline)
 for key,_ in selector.select(min(duration,max(0,deadline-time.monotonic()))):
  target=out if key.data=='out' else err if key.data=='err' else probe;cap=8192 if key.data=='out' else 4096
  part=os.read(key.fileobj,cap+1-len(target));need(len(target)+len(part)<=cap)
  if not part:selector.unregister(key.fileobj);continue
  target.extend(part)
 while b'\n' in probe:
  line,tail=probe.split(b'\n',1);probe=bytearray(tail);v=json.loads(line)
  need(json.dumps(v,separators=(',',':')).encode()==line and list(v)==['kind','pid','ppid','start'] and v['kind'] in ['parent','emitter','creator','shim','EOF_WOKE','CreatorDead'] and type(v['pid']) is int and v['pid']>1 and type(v['ppid']) is int and v['ppid']>=(1 if v['kind'] in ['EOF_WOKE','CreatorDead'] else 2) and type(v['start']) is str and v['start'].isdigit())
  need(v['kind'] not in readies);readies[v['kind']]=v
def wait_for(predicate):
 while not predicate():pump()
def open_self_creator():
 f=os.open('/proc/thread-self',os.O_RDONLY|os.O_DIRECTORY);os.dup2(f,4,inheritable=True)
 if f!=4:os.close(f)
def repin_entries():
 import gzip,base64,hashlib
 def pin(data):
  zipped=gzip.compress(data,compresslevel=9,mtime=0)
  return {'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'zipBytes':len(zipped),'zipSha256':hashlib.sha256(zipped).hexdigest(),'data':base64.b64encode(zipped).decode(),'cap':32768}
 kernel=open(file('lifetime.py'),'rb').read()
 for entry,module in [('delivery-entry.sh','delivery-outer.mjs'),('controls-entry.sh','controls-outer.mjs'),('missing-cwd-entry.sh','delivery-outer.mjs')]:
  path=file(entry);text=open(path).read()
  for key,data in [('_r3_kernel',kernel),('_r3_module',open(file(module),'rb').read())]:
   lines=[x for x in text.split('\n') if x.startswith(key+'=')];need(len(lines)==1)
   text=text.replace(lines[0],key+'='+json.dumps(pin(data),separators=(',',':')))
  open(path,'w').write(text)
def literal_probe_fd():
 text=open(file('delivery-entry.sh')).read();begin="<<'AFW_R3_LITERAL_PY'\n";end='\nAFW_R3_LITERAL_PY\n';need(text.count(begin)==text.count(end)==1);data=(text.split(begin)[1].split(end)[0]+'\n').encode()
 f=os.memfd_create('afw-r3-own-fixture-entry',os.MFD_CLOEXEC|os.MFD_ALLOW_SEALING)
 try:
  at=0
  while at<len(data):
   n=os.write(f,memoryview(data)[at:]);need(n>0);at+=n
  os.fchmod(f,0o400);os.lseek(f,0,os.SEEK_SET);seals=fcntl.F_SEAL_WRITE|fcntl.F_SEAL_GROW|fcntl.F_SEAL_SHRINK|fcntl.F_SEAL_SEAL;fcntl.fcntl(f,fcntl.F_ADD_SEALS,seals);need(fcntl.fcntl(f,fcntl.F_GET_SEALS)&seals==seals);return f
 except BaseException:os.close(f);raise
def launch(role):
 global child,selector
 open_self_creator();r,w=os.pipe();os.dup2(w,7,inheritable=True)
 if w!=7:os.close(w)
 repin_entries();program=literal_probe_fd()
 try:child=subprocess.Popen(['/usr/bin/python3','-I','-S','/proc/self/fd/'+str(program),role],stdin=subprocess.PIPE if role=='node-race-creator' else subprocess.DEVNULL,stdout=subprocess.PIPE,stderr=subprocess.PIPE,env=dict(os.environ),pass_fds=(3,4,6,7,program))
 finally:os.close(program)
 os.close(7);held(child.pid);verified.add(child.pid)
 selector=selectors.DefaultSelector();selector.register(child.stdout.fileno(),selectors.EVENT_READ,'out');selector.register(child.stderr.fileno(),selectors.EVENT_READ,'err');selector.register(r,selectors.EVENT_READ,'probe')
 return r
try:
 need(stat.S_ISDIR(os.fstat(7).st_mode) and (os.fstat(7).st_dev,os.fstat(7).st_ino)==(os.fstat(6).st_dev,os.fstat(6).st_ino))
 need(case in ['timeout','python','outer','bash','race'] and hasattr(os,'pidfd_open') and hasattr(signal,'pidfd_send_signal'))
 # Reserve/source fd7 is installed by the owning test controller; no production observer API.
 text=open(file('lifetime.py')).read();open(file('lifetime.py'),'w').write(text.replace('os.set_inheritable(n,True)','os.set_inheritable(n,True);os.set_inheritable(7,True)'))
 if case=='race':
  hook="# AFW_LIFE_BEFORE_ARM"
  injected="if sys.argv[1]=='node-witness':\n  _fixture_event('shim');need(stat.S_ISFIFO(os.fstat(0).st_mode));need(os.read(0,1)==b'');_fixture_event('EOF_WOKE')"
  rewrite('lifetime.py',hook,injected)
  rewrite('lifetime.py','class CreatorDead(ValueError):pass',"def _fixture_event(kind):\n import json\n raw=open('/proc/self/stat').read();parts=raw[raw.rfind(')')+2:].split();os.write(7,(json.dumps({'kind':kind,'pid':os.getpid(),'ppid':os.getppid(),'start':parts[19]},separators=(',',':'))+'\\n').encode())\nclass CreatorDead(ValueError):pass")
  rewrite('lifetime.py',"except BaseException:\n role=sys.argv[1] if len(sys.argv)==2 else ''","except CreatorDead:\n _fixture_event('CreatorDead');raise SystemExit(1)\nexcept BaseException:\n role=sys.argv[1] if len(sys.argv)==2 else ''")
  open(file('witness.mjs'),'w').write("import{writeFileSync}from'node:fs';writeFileSync('/proc/self/fd/6/delegation.marker','unexpected',{flag:'wx'});\n")
  r=launch('node-race-creator');wait_for(lambda:'creator' in readies and 'shim' in readies)
  creator=readies['creator'];shim=readies['shim'];need(creator['pid']==child.pid and shim['ppid']==child.pid);held(shim['pid'],shim['start']);need(info(shim['pid'])['ppid']==child.pid);verified.add(shim['pid']);wait_for(lambda:info(shim['pid'])['state']=='S');sleeping=time.monotonic()
  while time.monotonic()-sleeping<0.02:pump(0.005);need(info(shim['pid'])['state']=='S')
  send(child.pid,signal.SIGKILL);wait_for(lambda:child.poll() is not None and terminated(child.pid))
  need(not terminated(shim['pid']) and info(shim['pid'])['start']==shim['start'] and info(shim['pid'])['state']=='S');alive=time.monotonic()
  while time.monotonic()-alive<0.02:pump(0.005);need(not terminated(shim['pid']) and info(shim['pid'])['start']==shim['start'] and info(shim['pid'])['state']=='S')
  need('EOF_WOKE' not in readies and 'CreatorDead' not in readies);child.stdin.close()
  wait_for(lambda:'EOF_WOKE' in readies and 'CreatorDead' in readies)
  need(list(readies)==['creator','shim','EOF_WOKE','CreatorDead'])
  for kind in ['EOF_WOKE','CreatorDead']:need(readies[kind]['pid']==shim['pid'] and readies[kind]['start']==shim['start'] and readies[kind]['ppid']!=creator['pid'])
  wait_for(lambda:terminated(shim['pid']))
  try:os.lstat(file('delegation.marker'));raise ValueError()
  except OSError as error:need(error.errno==errno.ENOENT)
  wait_for(lambda:not selector.get_map());need(len(out)==0 and len(err)==0 and len(probe)==0);result='passed'
 else:
  # Instrument ONLY a case-owned copy; actual parent/entry and syscall code remain load-bearing.
  rewrite('delivery-outer.mjs',"stdio:['pipe','pipe','pipe',image,creatorHandle,5,helperHandle]","stdio:['pipe','pipe','pipe',image,creatorHandle,5,helperHandle,7]")
  rewrite('boundary.py',"pass_fds=(3,4,6),preexec_fn=pre","pass_fds=(3,4,6,7),preexec_fn=pre")
  ready="   raw=open('/proc/self/stat').read();parts=raw[raw.rfind(')')+2:].split();os.write(7,(json.dumps({'kind':'parent','pid':os.getpid(),'ppid':os.getppid(),'start':parts[19]},separators=(',',':'))+'\\n').encode())\n"
  rewrite('boundary.py',"   pre=r3_prepare_node_child()\n","   pre=r3_prepare_node_child()\n"+ready)
  emitter="import{readFileSync,writeSync}from'node:fs';const raw=readFileSync('/proc/self/stat','ascii'),parts=raw.slice(raw.lastIndexOf(')')+2).split(' ');writeSync(7,JSON.stringify({kind:'emitter',pid:process.pid,ppid:process.ppid,start:parts[19]})+'\\n');Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0);\n"
  open(file('emitter.mjs'),'w').write(emitter)
  r=launch('case-delivery');wait_for(lambda:'parent' in readies and 'emitter' in readies)
  parent=readies['parent'];emitter=readies['emitter'];need(emitter['ppid']==parent['pid']);pi=info(parent['pid']);ei=info(emitter['pid']);oi=info(parent['ppid']);need(pi['start']==parent['start'] and ei['start']==emitter['start'] and pi['ppid']==oi['pid'] and ei['ppid']==pi['pid'] and oi['ppid']==child.pid)
  held(parent['pid'],parent['start']);held(emitter['pid'],emitter['start']);outer=held(oi['pid'],oi['start']);verified.update([parent['pid'],emitter['pid'],outer['pid']])
  wait_for(lambda:info(emitter['pid'])['state']=='S');sleeping=time.monotonic()
  while time.monotonic()-sleeping<0.02:pump(0.005);need(info(emitter['pid'])['state']=='S')
  if case=='python':send(parent['pid'],signal.SIGKILL)
  elif case=='outer':send(outer['pid'],signal.SIGKILL)
  elif case=='bash':send(child.pid,signal.SIGKILL)
  wait_for(lambda:child.poll() is not None)
  for pid in [emitter['pid'],parent['pid'],outer['pid']]:wait_for(lambda p=pid:terminated(p))
  wait_for(lambda:not selector.get_map());need(len(err)==0 and len(probe)==0)
  if case=='timeout':need(time.monotonic()-sleeping>=3.0)
  if case=='bash':need(out==b'' and child.returncode==-signal.SIGKILL)
  elif case=='outer':need(out==b'' and child.returncode==1)
  else:
   reason='parent_unavailable';record={**fallback,'reason':reason};expected=('AFW_R3_DELIVERY_UNAVAILABLE/1 '+json.dumps(record,separators=(',',':'))+'\n').encode()
   need(out==expected and child.returncode==1)
  result='passed'
except ValueError:result='failed'
except BaseException:result='unknown'
finally:
 if child is not None and child.stdin is not None:
  try:child.stdin.close()
  except BaseException:result='unknown'
 # Cleanup uses ONLY pidfds proven to belong to this created lineage, never caller PIDs.
 for pid in list(verified):
  try:signal.pidfd_send_signal(pidfds[pid],signal.SIGKILL,None,0)
  except OSError as error:
   if error.errno!=errno.ESRCH:result='unknown'
  except BaseException:result='unknown'
 try:
  while time.monotonic()<cleanup_end and any(not terminated(pid) for pid in verified):time.sleep(0.005)
  if any(not terminated(pid) for pid in verified):result='unknown'
 except BaseException:result='unknown'
 if child is not None:
  try:child.wait(timeout=max(0.001,cleanup_end-time.monotonic()))
  except BaseException:result='unknown'
 if selector is not None:
  for key in list(selector.get_map().values()):
   try:os.close(key.fileobj)
   except BaseException:pass
  selector.close()
 for fd in pidfds.values():
  try:os.close(fd)
  except BaseException:pass
 print(json.dumps({'purpose':'afw.r3-lifetime.control.v1','case':case,'result':result},separators=(',',':')))
 raise SystemExit(0 if result=='passed' else 1)
