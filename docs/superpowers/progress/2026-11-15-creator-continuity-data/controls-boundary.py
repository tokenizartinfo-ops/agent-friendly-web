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
     buf=out if key.data=='out' else err;limit=24576 if key.data=='out' else 4096
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
 c,base=binding();raw,childStatus=capture(base);r=closed(raw,24576)
 schema=json.loads("{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"purpose\",\"source\",\"sourceTree\",\"run\",\"attempt\",\"job\",\"node\",\"matrixSha256\",\"allPassed\",\"expected\",\"passed\",\"failed\",\"unknown\",\"results\",\"mutants\",\"nativeBusinessCases\",\"nonclaims\",\"cleanup\"],\"properties\":{\"purpose\":{\"enum\":[\"afw.r3-delivery.controls.v1\"]},\"source\":{\"type\":\"string\",\"pattern\":\"^[a-f0-9]{40}$\"},\"sourceTree\":{\"type\":\"string\",\"pattern\":\"^[a-f0-9]{40}$\"},\"run\":{\"type\":\"string\",\"pattern\":\"^[1-9][0-9]{0,19}$\"},\"attempt\":{\"enum\":[1]},\"job\":{\"enum\":[\"readonly\"]},\"node\":{\"enum\":[\"22.23.4\"]},\"matrixSha256\":{\"type\":\"string\",\"pattern\":\"^[a-f0-9]{64}$\"},\"allPassed\":{\"enum\":[true,false]},\"expected\":{\"type\":\"integer\",\"minimum\":104,\"maximum\":104},\"passed\":{\"type\":\"integer\",\"minimum\":0,\"maximum\":104},\"failed\":{\"type\":\"integer\",\"minimum\":0,\"maximum\":104},\"unknown\":{\"type\":\"integer\",\"minimum\":0,\"maximum\":104},\"results\":{\"type\":\"array\",\"minItems\":104,\"maxItems\":104,\"items\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"id\",\"result\"],\"properties\":{\"id\":{\"enum\":[\"A01\",\"A02\",\"A03\",\"A04\",\"D01\",\"D02\",\"D03\",\"D04\",\"D05\",\"D06\",\"D07\",\"D08\",\"D09\",\"D10\",\"D11\",\"D12\",\"D13\",\"P01\",\"P02\",\"P03\",\"P04\",\"P05\",\"P06\",\"P07\",\"P08\",\"P09\",\"P10\",\"P11\",\"P12\",\"P13\",\"P14\",\"P15\",\"P16\",\"P17\",\"P18\",\"P19\",\"P20\",\"P21\",\"P22\",\"P23\",\"P24\",\"P25\",\"F01\",\"F02\",\"F03\",\"F04\",\"F05\",\"F06\",\"F07\",\"F08\",\"F09\",\"B01\",\"B02\",\"B03\",\"B04\",\"B05\",\"B06\",\"B07\",\"B08\",\"B09\",\"B10\",\"B11\",\"B12\",\"B13\",\"W01\",\"W02\",\"C01\",\"C02\",\"C03\",\"C04\",\"C05\",\"D14\",\"P26\",\"F10\",\"E01\",\"E02\",\"E03\",\"E04\",\"E05\",\"E06\",\"O01\",\"O02\",\"O03\",\"O04\",\"O05\",\"S01\",\"E07\",\"T01\",\"F11\",\"A05\",\"U01\",\"U02\",\"U03\",\"U04\",\"H01\",\"L01\",\"L02\",\"L03\",\"L04\",\"L05\",\"E08\",\"E09\",\"E10\",\"E11\"]},\"result\":{\"enum\":[\"passed\",\"failed\",\"unknown\"]}}}},\"mutants\":{\"type\":\"array\",\"minItems\":4,\"maxItems\":4,\"items\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"id\",\"expectedFailedIds\",\"actualFailedIds\",\"result\"],\"properties\":{\"id\":{\"enum\":[\"M_RAW\",\"M_PROVENANCE\",\"M_OUTPUT\",\"M_ASSOC\"]},\"expectedFailedIds\":{\"type\":\"array\",\"minItems\":1,\"maxItems\":2,\"items\":{\"enum\":[\"D02\",\"P06\",\"B05\",\"U01\",\"S01\"]}},\"actualFailedIds\":{\"type\":\"array\",\"minItems\":0,\"maxItems\":104,\"items\":{\"enum\":[\"A01\",\"A02\",\"A03\",\"A04\",\"D01\",\"D02\",\"D03\",\"D04\",\"D05\",\"D06\",\"D07\",\"D08\",\"D09\",\"D10\",\"D11\",\"D12\",\"D13\",\"P01\",\"P02\",\"P03\",\"P04\",\"P05\",\"P06\",\"P07\",\"P08\",\"P09\",\"P10\",\"P11\",\"P12\",\"P13\",\"P14\",\"P15\",\"P16\",\"P17\",\"P18\",\"P19\",\"P20\",\"P21\",\"P22\",\"P23\",\"P24\",\"P25\",\"F01\",\"F02\",\"F03\",\"F04\",\"F05\",\"F06\",\"F07\",\"F08\",\"F09\",\"B01\",\"B02\",\"B03\",\"B04\",\"B05\",\"B06\",\"B07\",\"B08\",\"B09\",\"B10\",\"B11\",\"B12\",\"B13\",\"W01\",\"W02\",\"C01\",\"C02\",\"C03\",\"C04\",\"C05\",\"D14\",\"P26\",\"F10\",\"E01\",\"E02\",\"E03\",\"E04\",\"E05\",\"E06\",\"O01\",\"O02\",\"O03\",\"O04\",\"O05\",\"S01\",\"E07\",\"T01\",\"F11\",\"A05\",\"U01\",\"U02\",\"U03\",\"U04\",\"H01\",\"L01\",\"L02\",\"L03\",\"L04\",\"L05\",\"E08\",\"E09\",\"E10\",\"E11\"]}},\"result\":{\"enum\":[\"passed\",\"failed\",\"unknown\"]}}}},\"nativeBusinessCases\":{\"enum\":[0]},\"nonclaims\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"historicalCauseProven\",\"receiptAuthenticated\",\"operationalReadiness\",\"completePackage\",\"PCoff\",\"globalNativeDrainVerified\",\"sdkNamespaceEmptyVerified\"],\"properties\":{\"historicalCauseProven\":{\"enum\":[false]},\"receiptAuthenticated\":{\"enum\":[false]},\"operationalReadiness\":{\"enum\":[false]},\"completePackage\":{\"enum\":[false]},\"PCoff\":{\"enum\":[false]},\"globalNativeDrainVerified\":{\"enum\":[false]},\"sdkNamespaceEmptyVerified\":{\"enum\":[false]}}},\"cleanup\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"complete\",\"failedInstances\",\"unknownInstances\"],\"properties\":{\"complete\":{\"enum\":[true,false]},\"failedInstances\":{\"type\":\"array\",\"minItems\":0,\"maxItems\":520,\"items\":{\"type\":\"string\",\"pattern\":\"^(baseline|M_RAW|M_PROVENANCE|M_OUTPUT|M_ASSOC):(A01|A02|A03|A04|D01|D02|D03|D04|D05|D06|D07|D08|D09|D10|D11|D12|D13|P01|P02|P03|P04|P05|P06|P07|P08|P09|P10|P11|P12|P13|P14|P15|P16|P17|P18|P19|P20|P21|P22|P23|P24|P25|F01|F02|F03|F04|F05|F06|F07|F08|F09|B01|B02|B03|B04|B05|B06|B07|B08|B09|B10|B11|B12|B13|W01|W02|C01|C02|C03|C04|C05|D14|P26|F10|E01|E02|E03|E04|E05|E06|O01|O02|O03|O04|O05|S01|E07|T01|F11|A05|U01|U02|U03|U04|H01|L01|L02|L03|L04|L05|E08|E09|E10|E11)$\"}},\"unknownInstances\":{\"type\":\"array\",\"minItems\":0,\"maxItems\":520,\"items\":{\"type\":\"string\",\"pattern\":\"^(baseline|M_RAW|M_PROVENANCE|M_OUTPUT|M_ASSOC):(A01|A02|A03|A04|D01|D02|D03|D04|D05|D06|D07|D08|D09|D10|D11|D12|D13|P01|P02|P03|P04|P05|P06|P07|P08|P09|P10|P11|P12|P13|P14|P15|P16|P17|P18|P19|P20|P21|P22|P23|P24|P25|F01|F02|F03|F04|F05|F06|F07|F08|F09|B01|B02|B03|B04|B05|B06|B07|B08|B09|B10|B11|B12|B13|W01|W02|C01|C02|C03|C04|C05|D14|P26|F10|E01|E02|E03|E04|E05|E06|O01|O02|O03|O04|O05|S01|E07|T01|F11|A05|U01|U02|U03|U04|H01|L01|L02|L03|L04|L05|E08|E09|E10|E11)$\"}}}}}}")
 shape(r,schema)
 for k in ['source','sourceTree','run','attempt','job','node']:need(r[k]==c[k])
 need(r['matrixSha256']=='0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e')
 ids=["A01","A02","A03","A04","D01","D02","D03","D04","D05","D06","D07","D08","D09","D10","D11","D12","D13","P01","P02","P03","P04","P05","P06","P07","P08","P09","P10","P11","P12","P13","P14","P15","P16","P17","P18","P19","P20","P21","P22","P23","P24","P25","F01","F02","F03","F04","F05","F06","F07","F08","F09","B01","B02","B03","B04","B05","B06","B07","B08","B09","B10","B11","B12","B13","W01","W02","C01","C02","C03","C04","C05","D14","P26","F10","E01","E02","E03","E04","E05","E06","O01","O02","O03","O04","O05","S01","E07","T01","F11","A05","U01","U02","U03","U04","H01","L01","L02","L03","L04","L05","E08","E09","E10","E11"]
 need([x['id'] for x in r['results']]==ids)
 for name in ['passed','failed','unknown']:need(r[name]==sum(x['result']==name for x in r['results']))
 need(r['expected']==len(ids) and r['nativeBusinessCases']==0)
 mutants=[{"id":"M_RAW","expectedFailedIds":["D02"]},{"id":"M_PROVENANCE","expectedFailedIds":["P06"]},{"id":"M_OUTPUT","expectedFailedIds":["B05","U01"]},{"id":"M_ASSOC","expectedFailedIds":["S01"]}]
 need([x['id'] for x in r['mutants']]==[x['id'] for x in mutants])
 for actual,expected in zip(r['mutants'],mutants):
  need(actual['expectedFailedIds']==expected['expectedFailedIds'])
  failed=actual['actualFailedIds'];need(failed==[x for x in ids if x in failed] and len(set(failed))==len(failed))
  if actual['result']=='passed':need(failed==expected['expectedFailedIds'])
  if actual['result']=='failed':need(failed!=expected['expectedFailedIds'])
 instances=[group+':'+one for group in ['baseline']+[x['id'] for x in mutants] for one in ids];cl=r['cleanup']
 for key in ['failedInstances','unknownInstances']:need(cl[key]==[x for x in instances if x in cl[key]] and len(set(cl[key]))==len(cl[key]))
 need(set(cl['failedInstances']).isdisjoint(set(cl['unknownInstances'])))
 passed=cl['complete'] is True and not cl['failedInstances'] and not cl['unknownInstances'] and r['passed']==len(ids) and r['failed']==0 and r['unknown']==0 and all(x['result']=='passed' for x in r['mutants'])
 need(r['allPassed']==passed and childStatus==(0 if passed else 23))
 public=('AFW_R3_DELIVERY_CONTROLS/1 '+json.dumps(r,separators=(',',':'))+'\n').encode('ascii');need(os.write(1,public)==len(public))
 raise SystemExit(0 if passed else 23)
except SystemExit:
 raise
except BaseException:
 raise SystemExit(1)
