function c2RootReceive(frame,expected){
 const bad=()=>{throw Error('C2_RECEIPT_UNQUALIFIED');};
 const keys=(v,k)=>{if(v===null||typeof v!=='object'||Array.isArray(v)||JSON.stringify(Object.keys(v))!==JSON.stringify(k))bad();};
 const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const bytes=s=>{try{return encodeURIComponent(s).replace(/%[A-Fa-f0-9]{2}|./g,'x').length;}catch{bad();}};
 const marker='AFW_C2_SOURCE_RECEIPT ';
 if(typeof frame!=='string'||!frame.startsWith(marker)||!frame.endsWith('\n')||frame.slice(0,-1).includes('\n')||bytes(frame)>24576)bad();
 const body=frame.slice(marker.length,-1);let value;try{value=JSON.parse(body);}catch{bad();}
 if(JSON.stringify(value)!==body)bad();
 keys(value,['schema','context','admitted','runs','regressions','nonclaims']);
 if(value.schema!=='afw.c2-source-lab-receipt.v1')bad();
 const contextKeys=['repository','baselineSource','baselineTree','proposalIndexHash','head','tree','runId','runAttempt','job','node'];
 keys(value.context,contextKeys);keys(expected.context,contextKeys);
 const c=value.context;
 if(c.repository!=='tokenizartinfo-ops/agent-friendly-web'||c.baselineSource!=='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68'||c.baselineTree!=='62e78926635d6b74f288d6c0d69e0f2516306989'||!/^[a-f0-9]{64}$/.test(c.proposalIndexHash)||!/^[a-f0-9]{40}$/.test(c.head)||!/^[a-f0-9]{40}$/.test(c.tree)||typeof c.runId!=='string'||!(/^[1-9][0-9]*$/).test(c.runId)||c.runAttempt!==1||c.job!=='c2-source-lab'||c.node!=='v22.23.4'||!eq(c,expected.context))bad();
 if(!Array.isArray(value.admitted)||!value.admitted.length||!Array.isArray(expected.admitted)||!eq(value.admitted,expected.admitted))bad();
 const paths=new Set();for(const a of value.admitted){keys(a,['path','sha256','bytes']);if(typeof a.path!=='string'||!(/^[a-zA-Z0-9_.\/-]+$/).test(a.path)||a.path.startsWith('/')||a.path.split('/').some(x=>x===''||x==='.'||x==='..')||paths.has(a.path)||!(/^[a-f0-9]{64}$/).test(a.sha256)||!Number.isSafeInteger(a.bytes)||a.bytes<1)bad();paths.add(a.path);}
 const ids=['CONNECTION','OAUTH','HANDLE','PROJECTREF','SUBJECT','PHASE_RENAME','SOURCE_BYTES','APPROVAL','PREDECESSOR','GRANT_REVOKED','EXTRA_KEY','NOTICES','MONITOR_COOKIE','MONITOR','SCOPE_MISSING','FINITE','SELECTION','LOST_ACK_DUPLICATE','UNRESOLVED_WRITER','OWN_PROMISE'].map(x=>'C2T1_'+x);
 const phases=['connection','oauth','negative','negative','negative','negative','negative','negative','negative','negative','negative','notices','monitor','monitor','scope','finite','selection','negative','negative','negative'];
 const modes=['baseline-red','proposal-green','mutant-prefix'];
 if(!Array.isArray(value.runs)||value.runs.length!==3)bad();
 for(let m=0;m<3;m++){
  const run=value.runs[m];keys(run,['mode','exitCode','qualified','cases']);
  if(run.mode!==modes[m]||!Number.isInteger(run.exitCode)||run.exitCode<0||run.exitCode>255||typeof run.qualified!=='boolean'||!Array.isArray(run.cases)||run.cases.length!==20)bad();
  let previous={upload:0,activation:0,receipts:0};
  for(let i=0;i<20;i++){
   const row=run.cases[i];keys(row,['id','status','phase','counters','code']);keys(row.counters,['upload','activation','receipts']);
   if(row.id!==ids[i]||row.phase!==phases[i]||!['pass','fail'].includes(row.status)||row.code!==(row.status==='pass'?'OK':'TEST_FAILED'))bad();
   const n=row.counters;if(Object.values(n).some(x=>!Number.isInteger(x)||x<0||x>3)||n.receipts>n.activation||n.activation>n.upload)bad();
   if(i<17){for(const key of ['upload','activation','receipts'])if(n[key]<previous[key])bad();previous=n;}
  }
  const allPass=run.cases.every(x=>x.status==='pass');
  if(run.qualified!==(run.exitCode===0&&allPass))bad();
  if(m===0){if(run.qualified||run.exitCode===0||run.cases[0].status!=='pass'||run.cases[1].status!=='pass'||run.cases[11].status!=='fail'||!eq(run.cases[11].counters,{upload:1,activation:1,receipts:1}))bad();}
  if(m===1){if(!run.qualified||!allPass||run.exitCode!==0)bad();for(let i=0;i<17;i++){const n=i<11?1:i<15?2:3;if(!eq(run.cases[i].counters,{upload:n,activation:n,receipts:n}))bad();}}
  if(m===2){if(run.qualified||run.exitCode===0||run.cases[10].status!=='fail')bad();}
 }
 keys(value.regressions,['exitCode','cases','selectionHash']);keys(expected.regressions,['ids','selectionHash']);
 const rg=value.regressions,eg=expected.regressions;
 if(!Array.isArray(eg.ids)||eg.ids.length!==11||new Set(eg.ids).size!==11||eg.ids.some(x=>typeof x!=='string'||!(/^[A-Z0-9_]{1,48}$/).test(x))||!(/^[a-f0-9]{64}$/).test(eg.selectionHash))bad();
 if(rg.exitCode!==0||!Array.isArray(rg.cases)||rg.cases.length!==11||rg.selectionHash!==eg.selectionHash)bad();
 for(let i=0;i<11;i++){const row=rg.cases[i];keys(row,['id','status','code']);if(row.id!==eg.ids[i]||row.status!=='pass'||row.code!=='OK')bad();}
 const flags=['historicalCauseProven','receiptAuthenticated','operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'];
 keys(value.nonclaims,flags);if(Object.values(value.nonclaims).some(x=>x!==false))bad();
 return {schema:value.schema,sourceLabQualified:true,context:value.context,admitted:value.admitted.length,casesPerMode:20,modes:modes.slice(),regressions:11,nonclaims:value.nonclaims};
}
