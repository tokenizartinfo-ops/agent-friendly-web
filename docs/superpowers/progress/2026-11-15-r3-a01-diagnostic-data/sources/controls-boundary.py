# Fixed pure transport. No caller command, callback or output pathname.
try:
 import os,sys,json,re,selectors,subprocess,time,stat,signal
 def need(ok):
  if not ok: raise ValueError()
 def closed(raw,cap):
  need(len(raw)<=cap and re.fullmatch(rb'[\x20-\x7e]*\n',raw) is not None and not raw.endswith(b'\n\n'))
  v=json.loads(raw)
  need((json.dumps(v,separators=(',',':'),ensure_ascii=True)+'\n').encode()==raw)
  return v
 def shape(v,s):
  if 'anyOf' in s:
   count=0
   for one in s['anyOf']:
    try: shape(v,one); count+=1
    except Exception: pass
   need(count==1); return
  if 'enum' in s:
   need(any(type(v) is type(x) and v==x for x in s['enum'])); return
  t=s['type']
  if t=='null': need(v is None)
  elif t=='integer': need(type(v) is int and s['minimum']<=v<=s['maximum'])
  elif t=='string': need(type(v) is str and re.fullmatch(s['pattern'],v) is not None)
  elif t=='object':
   need(type(v) is dict and set(v)==set(s['required']) and s['additionalProperties'] is False)
   for k in s['required']: shape(v[k],s['properties'][k])
  elif t=='array':
   need(type(v) is list and s['minItems']<=len(v)<=s['maxItems'])
   for x in v: shape(x,s['items'])
  else: raise ValueError()
 def binding():
  base=os.environ['RUNNER_TEMP']; need(type(base) is str and len(base)<=4096 and base.startswith('/') and '\x00' not in base and os.path.realpath(base)==base)
  fds=[]
  try:
   d=os.open(base,os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW);fds.append(d);s=os.fstat(d)
   need(stat.S_ISDIR(s.st_mode) and s.st_uid==os.getuid() and not s.st_mode&0o022)
   d=os.open('afw-r3-delivery',os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW,dir_fd=d);fds.append(d);s=os.fstat(d)
   need(stat.S_ISDIR(s.st_mode) and s.st_uid==os.getuid() and not s.st_mode&0o077)
   f=os.open('context.json',os.O_RDONLY|os.O_NOFOLLOW|os.O_NONBLOCK,dir_fd=d);fds.append(f);s=os.fstat(f)
   need(stat.S_ISREG(s.st_mode) and s.st_uid==os.getuid() and s.st_nlink==1 and not s.st_mode&0o077 and s.st_size<=2048)
   b=os.read(f,2049);need(len(b)==s.st_size and len(b)<=2048 and re.fullmatch(rb'[\x20-\x7e]*',b) is not None);after=os.fstat(f)
   need((s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns)==(after.st_dev,after.st_ino,after.st_size,after.st_mtime_ns,after.st_ctime_ns))
   c=json.loads(b);need(json.dumps(c,separators=(',',':')).encode()==b)
   need(list(c)==['purpose','source','sourceTree','run','attempt','job','node'])
   need(all(type(c[k]) is str for k in ['purpose','source','sourceTree','run','job','node']))
   need(c['purpose']=='afw.r3-delivery.binding.v1' and c['node']=='22.23.4' and c['job']=='readonly' and type(c['attempt']) is int and c['attempt']==1)
   need(re.fullmatch(r'[a-f0-9]{40}',c['source']) is not None and re.fullmatch(r'[a-f0-9]{40}',c['sourceTree']) is not None and re.fullmatch(r'[1-9][0-9]{0,19}',c['run']) is not None)
   image=os.fstat(3);need(stat.S_ISREG(image.st_mode))
   for k,v in [('GITHUB_SHA',c['source']),('GITHUB_RUN_ID',c['run']),('GITHUB_RUN_ATTEMPT','1'),('GITHUB_JOB','readonly'),('GITHUB_REPOSITORY','tokenizartinfo-ops/agent-friendly-web'),('GITHUB_REPOSITORY_ID','1347578006'),('GITHUB_REF','refs/heads/feat/finite-native-cleanup-20261101')]:need(os.environ.get(k)==v)
   return c,base
  finally:
   for f in reversed(fds):os.close(f)
 def capture(base):
  # Independent delivery cap. It never encloses or invokes Native.
  allowed=['PATH','HOME','RUNNER_TEMP','CI','LANG','TZ','GITHUB_REPOSITORY','GITHUB_REPOSITORY_ID','GITHUB_REF','GITHUB_SHA','GITHUB_RUN_ID','GITHUB_RUN_ATTEMPT','GITHUB_JOB','GITHUB_WORKFLOW_REF']
  env={k:os.environ[k] for k in allowed if k in os.environ}
  p=None;sel=None
  try:
   pre=r3_prepare_node_child()
   p=subprocess.Popen(['/proc/self/fd/3','--disable-warning=ExperimentalWarning','/proc/self/fd/6/controls.mjs'],stdin=subprocess.DEVNULL,stdout=subprocess.PIPE,stderr=subprocess.PIPE,env=env,close_fds=True,pass_fds=(3,4,6),preexec_fn=pre)
   sel=selectors.DefaultSelector();sel.register(p.stdout,selectors.EVENT_READ,'out');sel.register(p.stderr,selectors.EVENT_READ,'err')
   out=bytearray();err=bytearray();deadline=time.monotonic()+100
   while sel.get_map():
    remaining=deadline-time.monotonic();need(remaining>0)
    for key,_ in sel.select(min(remaining,0.1)):
     buf=out if key.data=='out' else err;limit=2048 if key.data=='out' else 4096
     part=os.read(key.fileobj.fileno(),limit+1-len(buf))
     if not part: sel.unregister(key.fileobj);continue
     buf.extend(part);need(len(buf)<=limit)
   need(p.wait(timeout=max(0.001,deadline-time.monotonic())) in [0,23] and len(err)==0)
   return bytes(out),p.returncode
  finally:
   if sel is not None: sel.close()
   if p is not None:
    if p.poll() is None: p.kill()
    p.wait()
    if p.stdout: p.stdout.close()
    if p.stderr: p.stderr.close()
 c,base=binding();raw,childStatus=capture(base);r=closed(raw,2048)
 need(childStatus==23 and type(r) is dict)
 need(all(type(r[k]) is type(c[k]) and r[k]==c[k] for k in ['source','sourceTree','run','attempt','job','node']))
 # Private parent pipe only. Sealed Node outer owns final shape, associations and publication.
 need(os.write(1,raw)==len(raw))
 raise SystemExit(23)
except SystemExit:
 raise
except BaseException:
 raise SystemExit(1)
