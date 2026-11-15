# Fixed pure transport. No caller command, callback or output pathname.
try:
 import os,sys,json,re,selectors,subprocess,time,stat
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
   p=subprocess.Popen(['/proc/self/fd/3','--disable-warning=ExperimentalWarning','/proc/self/fd/6/emitter.mjs'],stdin=subprocess.DEVNULL,stdout=subprocess.PIPE,stderr=subprocess.PIPE,env=env,close_fds=True,pass_fds=(3,4,6),preexec_fn=pre)
   sel=selectors.DefaultSelector();sel.register(p.stdout,selectors.EVENT_READ,'out');sel.register(p.stderr,selectors.EVENT_READ,'err')
   out=bytearray();err=bytearray();deadline=time.monotonic()+3.5
   while sel.get_map():
    remaining=deadline-time.monotonic();need(remaining>0)
    for key,_ in sel.select(min(remaining,0.1)):
     buf=out if key.data=='out' else err;limit=8192 if key.data=='out' else 4096
     part=os.read(key.fileobj.fileno(),limit+1-len(buf))
     if not part: sel.unregister(key.fileobj);continue
     buf.extend(part);need(len(buf)<=limit)
   need(p.wait(timeout=max(0.001,deadline-time.monotonic()))==0 and len(err)==0)
   return bytes(out)
  finally:
   if sel is not None: sel.close()
   if p is not None:
    if p.poll() is None: p.kill()
    p.wait()
    if p.stdout: p.stdout.close()
    if p.stderr: p.stderr.close()
 c,base=binding();envelope=closed(capture(base),8192)
 schema=json.loads("{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"purpose\",\"sample\",\"delivery\"],\"properties\":{\"purpose\":{\"enum\":[\"afw.r3-delivery.envelope.v1\"]},\"sample\":{\"anyOf\":[{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"purpose\",\"source\",\"run\",\"attempt\",\"case\",\"sampleState\",\"sample\",\"nonclaims\"],\"properties\":{\"purpose\":{\"enum\":[\"afw.r3-existing-sample.syn.v1\"]},\"source\":{\"type\":\"string\",\"pattern\":\"^[a-f0-9]{40}$\"},\"run\":{\"type\":\"string\",\"pattern\":\"^[1-9][0-9]{0,19}$\"},\"attempt\":{\"enum\":[1]},\"case\":{\"enum\":[\"R3\"]},\"sampleState\":{\"enum\":[\"observed\",\"not_observed\"]},\"sample\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"inputSeeded\",\"seedEntries\",\"lists\",\"gets\",\"nativeInvoked\",\"nativeSettled\",\"nativeRejected\",\"nativeUnsettled\",\"outwardPending\",\"heldNativeSettled\",\"observerInvalid\",\"queueObserverInvalid\",\"sdkObserverInvalid\",\"childAbortSeen\",\"parentAliveAtAbort\",\"workPendingAtAbort\",\"sameWorkWaitError\",\"selectedChildCount\",\"selectedChildOrdinal\",\"selectedChildFamily\",\"childWorkStatus\",\"childWaitStatus\",\"queueCount\",\"lastQueueFamily\",\"lastQueueChild\",\"lastQueueActive\",\"lastQueueQueued\",\"lastQueueMethod\",\"heldOperationCount\",\"phase\"],\"properties\":{\"inputSeeded\":{\"enum\":[true,false,\"unknown\"]},\"seedEntries\":{\"anyOf\":[{\"type\":\"integer\",\"minimum\":0,\"maximum\":201},{\"enum\":[\"unknown\"]}]},\"lists\":{\"anyOf\":[{\"type\":\"integer\",\"minimum\":0,\"maximum\":2},{\"enum\":[\"unknown\"]}]},\"gets\":{\"anyOf\":[{\"type\":\"integer\",\"minimum\":0,\"maximum\":200},{\"enum\":[\"unknown\"]}]},\"nativeInvoked\":{\"anyOf\":[{\"type\":\"integer\",\"minimum\":0,\"maximum\":202},{\"enum\":[\"unknown\"]}]},\"nativeSettled\":{\"anyOf\":[{\"type\":\"integer\",\"minimum\":0,\"maximum\":202},{\"enum\":[\"unknown\"]}]},\"nativeRejected\":{\"anyOf\":[{\"type\":\"integer\",\"minimum\":0,\"maximum\":202},{\"enum\":[\"unknown\"]}]},\"nativeUnsettled\":{\"anyOf\":[{\"type\":\"integer\",\"minimum\":0,\"maximum\":2},{\"enum\":[\"unknown\"]}]},\"outwardPending\":{\"anyOf\":[{\"type\":\"integer\",\"minimum\":0,\"maximum\":2},{\"enum\":[\"unknown\"]}]},\"heldNativeSettled\":{\"anyOf\":[{\"type\":\"integer\",\"minimum\":0,\"maximum\":2},{\"enum\":[\"unknown\"]}]},\"observerInvalid\":{\"enum\":[true,false,\"unknown\"]},\"queueObserverInvalid\":{\"enum\":[true,false,\"unknown\"]},\"sdkObserverInvalid\":{\"enum\":[true,false,\"unknown\"]},\"childAbortSeen\":{\"enum\":[true,false,\"unknown\"]},\"parentAliveAtAbort\":{\"enum\":[true,false,\"unknown\"]},\"workPendingAtAbort\":{\"enum\":[true,false,\"unknown\"]},\"sameWorkWaitError\":{\"enum\":[true,false,\"unknown\"]},\"selectedChildCount\":{\"enum\":[0,1,\"multiple\",\"unknown\"]},\"selectedChildOrdinal\":{\"anyOf\":[{\"type\":\"integer\",\"minimum\":1,\"maximum\":65535},{\"enum\":[\"unknown\"]}]},\"selectedChildFamily\":{\"enum\":[1,2,\"unknown\"]},\"childWorkStatus\":{\"enum\":[\"unregistered\",\"pending\",\"fulfilled\",\"rejected\",\"unknown\"]},\"childWaitStatus\":{\"enum\":[\"unregistered\",\"pending\",\"fulfilled\",\"rejected\",\"unknown\"]},\"queueCount\":{\"anyOf\":[{\"type\":\"integer\",\"minimum\":0,\"maximum\":512},{\"enum\":[\"unknown\"]}]},\"lastQueueFamily\":{\"enum\":[1,2,\"unknown\"]},\"lastQueueChild\":{\"anyOf\":[{\"type\":\"integer\",\"minimum\":1,\"maximum\":65535},{\"enum\":[\"unknown\"]}]},\"lastQueueActive\":{\"enum\":[1,2,\"unknown\"]},\"lastQueueQueued\":{\"anyOf\":[{\"type\":\"integer\",\"minimum\":0,\"maximum\":200},{\"enum\":[\"unknown\"]}]},\"lastQueueMethod\":{\"enum\":[\"get\",\"list\",\"delete\",\"unknown\"]},\"heldOperationCount\":{\"enum\":[0,1,2,\"multiple\",\"unknown\"]},\"phase\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"completeWrites\",\"completeNormal\",\"lookupStage\",\"authorizePostFinally\"],\"properties\":{\"completeWrites\":{\"enum\":[0,1,\"multiple\",\"unknown\"]},\"completeNormal\":{\"enum\":[0,1,\"multiple\",\"unknown\"]},\"lookupStage\":{\"enum\":[\"not_seen\",\"entered\",\"exited\",\"unknown\"]},\"authorizePostFinally\":{\"enum\":[\"not_seen\",\"one\",\"multiple\",\"unknown\"]}}}}},\"nonclaims\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"historicalCauseProven\",\"receiptAuthenticated\",\"operationalReadiness\",\"completePackage\",\"PCoff\",\"globalNativeDrainVerified\",\"sdkNamespaceEmptyVerified\"],\"properties\":{\"historicalCauseProven\":{\"enum\":[false]},\"receiptAuthenticated\":{\"enum\":[false]},\"operationalReadiness\":{\"enum\":[false]},\"completePackage\":{\"enum\":[false]},\"PCoff\":{\"enum\":[false]},\"globalNativeDrainVerified\":{\"enum\":[false]},\"sdkNamespaceEmptyVerified\":{\"enum\":[false]}}}}},{\"type\":\"null\"}]},\"delivery\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"purpose\",\"source\",\"sourceTree\",\"run\",\"attempt\",\"job\",\"node\",\"controls\",\"availability\",\"sourceQualified\",\"collectionComplete\",\"sampleObserved\",\"reason\",\"nonclaims\"],\"properties\":{\"purpose\":{\"enum\":[\"afw.r3-delivery.result.v1\"]},\"source\":{\"type\":\"string\",\"pattern\":\"^[a-f0-9]{40}$\"},\"sourceTree\":{\"type\":\"string\",\"pattern\":\"^[a-f0-9]{40}$\"},\"run\":{\"type\":\"string\",\"pattern\":\"^[1-9][0-9]{0,19}$\"},\"attempt\":{\"enum\":[1]},\"job\":{\"enum\":[\"readonly\"]},\"node\":{\"enum\":[\"22.23.4\"]},\"controls\":{\"enum\":[\"passed\"]},\"availability\":{\"enum\":[\"available\",\"unavailable\"]},\"sourceQualified\":{\"enum\":[true,false]},\"collectionComplete\":{\"enum\":[true,false,\"unknown\"]},\"sampleObserved\":{\"enum\":[true,false,\"unknown\"]},\"reason\":{\"enum\":[\"none\",\"sample_missing\",\"sample_invalid\",\"source_missing\",\"source_invalid\",\"io_unavailable\"]},\"nonclaims\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"historicalCauseProven\",\"receiptAuthenticated\",\"operationalReadiness\",\"completePackage\",\"PCoff\",\"globalNativeDrainVerified\",\"sdkNamespaceEmptyVerified\"],\"properties\":{\"historicalCauseProven\":{\"enum\":[false]},\"receiptAuthenticated\":{\"enum\":[false]},\"operationalReadiness\":{\"enum\":[false]},\"completePackage\":{\"enum\":[false]},\"PCoff\":{\"enum\":[false]},\"globalNativeDrainVerified\":{\"enum\":[false]},\"sdkNamespaceEmptyVerified\":{\"enum\":[false]}}}}}}}")
 shape(envelope,schema)
 d=envelope['delivery'];s=envelope['sample']
 for a,b in [('source','source'),('sourceTree','sourceTree'),('run','run'),('attempt','attempt'),('job','job'),('node','node')]:need(d[a]==c[b])
 if d['availability']=='available':
  need(s is not None and d['sourceQualified'] is True and d['reason']=='none' and type(d['collectionComplete']) is bool and d['sampleObserved']==(s['sampleState']=='observed'))
  need(s['source']==c['source'] and s['run']==c['run'] and s['attempt']==c['attempt'])
  output='AFW_R3_EXISTING_SAMPLE/1 '+json.dumps(s,separators=(',',':'))+'\n'+'AFW_R3_DELIVERY/1 '+json.dumps(d,separators=(',',':'))+'\n';status=0
 else:
  need(s is None and d['reason']!='none' and d['sampleObserved']=='unknown')
  if d['sourceQualified'] is True: need(d['reason'] in ['sample_missing','sample_invalid','io_unavailable'] and type(d['collectionComplete']) is bool)
  else: need(d['reason'] in ['source_missing','source_invalid','io_unavailable'] and d['collectionComplete']=='unknown')
  output='AFW_R3_DELIVERY/1 '+json.dumps(d,separators=(',',':'))+'\n';status=23
 # No output precedes this completed closed validation.
 need(os.write(1,output.encode('ascii'))==len(output))
 raise SystemExit(status)
except SystemExit:
 raise
except BaseException:
 raise SystemExit(1)
