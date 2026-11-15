 c=json.loads(CONTEXT_JSON)
 def header(attempt=1):return 'H '+json.dumps({'purpose':'afw.q1.serial-source-lab.trace.v2',**{k:c[k] for k in ['source','sourceTree','run','attempt','job','node']},'matrixSha256':matrixHash,'policySha256':policyHash}|{'attempt':attempt},separators=(',',':'))+'\n'
 def tail(kind,n,last=0,ms=1):return 'T '+json.dumps({'kind':kind,'next':n,'lastAdmissionMs':last,'terminalMs':ms},separators=(',',':'))+'\n'
 def parse(s,status=0):return reduce(s.encode(),c,status)
 def reject(s):
  try:parse(s)
  except Exception:return
  raise ValueError()
 h=header();pairs=''
 for i in range(520):
  group=i//104;one=ids[i%104];failed=group>0 and one in mutantDefs[group-1]['expectedFailedIds'];pairs+='E%03d\nR%03d%sC0\n'%(i,i,'F' if failed else 'P')
 good=h+pairs+tail('complete',520);need(parse(good)['qualified'])
 reject(good.replace(h,header(True),1));reject(good.replace(h,header(1.0),1));reject(good.replace('E001\nR001PC0\n',''));reject(good.replace('E001\n','E000\n',1))
 for suffix in ['E000\nR000PU0\nE001\nR001PC0\n'+tail('custody',2),'E000\nR000UC1\nE001\n','E000\nR000UC0\nE001\n',tail('inner',0,None,1),tail('late',0,None,1),'E000\n'+tail('exception',1)]:reject(h+suffix)
 need(not parse(h+tail('inner',0,None,220001),23)['qualified']);need(not parse(h+pairs[:104*13]+tail('outer',104,0,220001),23)['qualified']);need(not parse(h+pairs.replace('F','P')+tail('complete',520))['qualified']);need(not parse(h+pairs[:len('E000\nR000PC0\n')]+tail('late',1,0,240001),23)['qualified']);need(not parse(h+tail('exception',0,None),23)['qualified']);need(parse(h+'E000\n',23)['groups'][0]['outcome'][0]=='X');need(not parse(h+'E000\nR000UC1\n'+tail('exception',1),23)['qualified']);need(not parse(h+'E000\nR000UU0\n'+tail('custody',1),23)['qualified'])
 print('AFW_FIX1_TRACE_OK')
except BaseException:raise SystemExit(1)
