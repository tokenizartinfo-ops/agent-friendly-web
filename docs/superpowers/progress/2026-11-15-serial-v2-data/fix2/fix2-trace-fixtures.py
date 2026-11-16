 c=json.loads(CONTEXT_JSON)
 def header(attempt=1):return 'H '+json.dumps({'purpose':'afw.q1.serial-source-lab.trace.v2',**{k:c[k] for k in ['source','sourceTree','run','attempt','job','node']},'matrixSha256':matrixHash,'policySha256':policyHash}|{'attempt':attempt},separators=(',',':'))+'\n'
 def tail(kind,n,last=0,ms=1):return 'T '+json.dumps({'kind':kind,'next':n,'lastAdmissionMs':last,'terminalMs':ms},separators=(',',':'))+'\n'
 def parse(s,status=0):return reduce(s.encode(),c,status)
 def reject(s,status):
  try:parse(s,status)
  except Exception:return
  raise ValueError()
 def removal(needle,replacement,bad,status=23):
  need(reducerSource.count(needle)==1);ns=dict(globals());exec(reducerSource.replace(needle,replacement,1),ns);r=ns['reduce'](bad.encode(),c,status);need(not r['qualified'] if status==23 else r['qualified']);removed.append(needle)
 h=header();pairs=''
 for i in range(520):
  group=i//104;one=ids[i%104];failed=group>0 and one in mutantDefs[group-1]['expectedFailedIds'];pairs+='E%03d\nR%03d%sC0\n'%(i,i,'F' if failed else 'P')
 good=h+pairs+tail('complete',520);need(parse(good,0)['qualified']);removed=[]
 for attempt in [True,1.0]:
  bad=good.replace(h,header(attempt),1);reject(bad,0);removal(" and type(h['attempt']) is int",'',bad,0)
 reject(good.replace('E001\nR001PC0\n',''),0);reject(good.replace('E001\n','E000\n',1),0);need(not parse(good.replace('F','P'),0)['qualified'])
 clean=h+'E000\nR000PC0\n';uncertain=h+'E000\nR000UU0\n';caught=h+'E000\nR000UC1\n';returned=h+'E000\nR000UC0\n'
 for prefix in [uncertain,caught,returned]:
  need(not parse(prefix,23)['qualified']);bad=prefix+'E001\n';reject(bad,23);removal('active is None and not stopped and i==n','active is None and i==n',bad)
 for kind,prefix,n in [('inner',h,0),('outer',h+pairs[:104*13],104)]:
  last=None if n==0 else 0;need(not parse(prefix+tail(kind,n,last,220001),23)['qualified']);bad=prefix+tail(kind,n,last,1);reject(bad,23);removal("terminal['terminalMs']>220000",'True',bad)
 need(not parse(clean+tail('late',1,0,240001),23)['qualified']);bad=clean+tail('late',1,0,1);reject(bad,23);removal("terminal['terminalMs']>240000",'True',bad)
 need(not parse(uncertain+tail('custody',1),23)['qualified']);bad=uncertain+tail('exception',1);reject(bad,23);removal("need('U' not in cleanups or kind=='custody')",'need(True)',bad)
 need(not parse(uncertain+tail('custody',1),23)['qualified']);bad=h+'E000\n'+tail('custody',1);reject(bad,23);removal(" and active is None and terminal['next']==n"," and terminal['next']==n",bad)
 need(parse(h+'E000\n',23)['groups'][0]['outcome'][0]=='X');need(not parse(h+tail('exception',0,None),23)['qualified']);need(not parse(caught+tail('exception',1),23)['qualified']);need(len(removed)==10)
 print('AFW_FIX2_TRACE_OK')
except BaseException:raise SystemExit(1)
