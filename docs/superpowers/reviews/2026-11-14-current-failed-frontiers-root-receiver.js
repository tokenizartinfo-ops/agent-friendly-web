function(record,context,schema){
 const need=(v,m)=>{if(!v)throw Error("frontiers:"+m);};
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function walk(v,s,p="$"){
  if(s.anyOf){need(s.anyOf.filter(x=>{try{walk(v,x,p);return true;}catch{return false;}}).length===1,p+":union");return;}
  if(s.enum){need(s.enum.some(x=>Object.is(x,v)),p+":enum");return;}
  switch(s.type){
   case"null":need(v===null,p);break;
   case"boolean":need(typeof v==="boolean",p);break;
   case"integer":need(Number.isSafeInteger(v)&&v>=s.minimum&&v<=s.maximum,p);break;
   case"string":need(typeof v==="string"&&new RegExp(s.pattern).test(v),p);break;
   case"array":need(Array.isArray(v)&&v.length>=s.minItems&&v.length<=s.maxItems,p);v.forEach(x=>walk(x,s.items,p+"[]"));break;
   case"object":need(v!==null&&typeof v==="object"&&!Array.isArray(v)&&s.additionalProperties===false,p);need(same(Object.keys(v).sort(),s.required.slice().sort()),p+":keys");for(const k of s.required)walk(v[k],s.properties[k],p+"."+k);break;
   default:throw Error("unsupported schema");
  }
 }
 need(typeof record==="string"&&/^[\x20-\x7E]*$/.test(record)&&record.length<=16384,"wire");
 const r=JSON.parse(record);need(JSON.stringify(r)===record,"canonical");walk(r,schema);
 need(r.source===context.source&&r.run===String(context.run)&&r.job===context.job&&r.attempt===1,"binding");
 need(r.sourceTree===null||r.sourceTree===context.tree,"tree");
 need(r.profile.group===(r.job==="readonly"?"readonly":"positive"),"group");
 for(const k of["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"])need(r[k]===false,k);
 const n=r.native,p=r.provenance,rep=r.representation;
 need(p.originalWorldBlob==="1e18873791e0520fff611e353232e38786c51941"&&p.overlaySha256==="dc3dde82b2e89cf1f6d1b3127c01ed86f108ceafbd80f51edb9f33d9e2e018dd","worldpins");
 need(!r.controls.passed||r.controls.count===10,"controls");need(!r.pure.passed||r.pure.cases===8,"pure");
 need(!r.pure.passed||r.controls.passed,"pureorder");need(!r.profile.passed||r.pure.passed,"profileorder");
 if(n.started===true){
  need(r.node==="22.23.4"&&r.sourceTree===context.tree&&r.controls.passed&&r.pure.passed&&r.profile.passed,"nativegates");
  need(p.coreVerified&&p.worldBeforeVerified&&rep.currentPureProfileGenerated&&rep.originalWorkflowResident===true,"nativeprovenance");
  if(r.job==="positive_prepare")need(r.headroom.checked&&r.headroom.admitted&&Number.isInteger(r.headroom.elapsedMs)&&r.headroom.elapsedMs>=0&&r.headroom.elapsedMs<90000&&n.instrumentedWorld===true&&p.overlayInstalled===true&&p.overlayVerified,"originalclockoverlay");
  else need(n.instrumentedWorld===false&&p.overlayInstalled===false&&!p.overlayVerified&&rep.originalTAPRedirection===true,"readonlyoriginal");
 }else need(n.exitCode===null&&r.positive===null&&r.readonly===null&&r.inventory===null,"nonexecution");
 if(n.ended===true)need(n.started===true,"ended");
 if(n.exitCode!==null)need(n.ended===true&&n.signal==="none","exit");
 need(!p.worldRestored||p.overlayInstalled===true,"restore");
 if(r.job==="positive_prepare"){need(r.readonly===null&&r.inventory===null,"positiverole");if(r.positive)need(n.started===true&&r.positive.error.wrapperFailureType==="unknown","primarywrapper");}
 else{need(r.positive===null&&!r.headroom.checked&&!r.headroom.admitted&&r.headroom.elapsedMs===null,"readonlyrole");}
 if(r.readonly){
  const q=r.readonly;need(same(q.rows.map(x=>x.case),["R1","R2","R3"]),"caseids");
  for(const row of q.rows)need((row.result==="failed")===(row.error!==null),"rowerror");
  if(q.valid){
   need(q.ended&&n.ended===true&&n.signal==="none"&&q.state!=="unknown"&&q.summary!==null,"validend");
   const file=q.state==="file_failure";
   if(file)need(q.precase?.result==="failed"&&q.rows.every(x=>x.result==="not_observed")&&q.firstFailure?.target==="native_file","filefailure");
   else need(q.precase===null&&q.rows.every(x=>["passed","failed"].includes(x.result)),"allcases");
   const pass=file?0:q.rows.filter(x=>x.result==="passed").length,fail=file?1:3-pass,counts=q.summary.counts;
   need(same(Object.keys(counts).sort(),["cancelled","failed","passed","skipped","suites","tests","todo","topLevel"].sort()),"countkeys");
   for(const [k,v]of Object.entries({cancelled:0,failed:fail,passed:pass,skipped:0,suites:0,tests:file?1:3,todo:0,topLevel:file?1:3}))need(counts[k]===v,"counts"+k);
   need(q.summary.success===(fail===0)&&q.state===(file?"file_failure":fail?"case_failure":"all_pass"),"outcome");
   const first=file?{target:"native_file",error:q.precase.error}:q.rows.filter(x=>x.result==="failed").map(x=>({target:x.case,error:x.error}))[0]??null;
   need(same(first,q.firstFailure),"firstfailure");need((n.exitCode===0)===(fail===0),"clioutcome");
  }else need(q.state==="unknown"&&q.summary===null,"unknown");
 }
 if(r.inventory){
  const x=r.inventory;need(r.job==="readonly"&&n.started===true&&x.filesCap===4096&&x.bytesCap===536870912,"inventoryscope");
  need(!x.hashFiles&&x.newRunOnly&&!x.openedFileStabilityProved,"inventoryclaims");
  if(x.state==="complete")need(x.complete&&x.firstLimit==="none"&&x.firstLimitRegion==="none"&&x.attemptedOrdinal===null&&x.nextBytes===null&&!x.nextBytesClipped,"completeinventory");
  if(x.state==="first_limit"){
   need(!x.complete&&["files","bytes","both"].includes(x.firstLimit)&&x.firstLimitRegion!=="none"&&x.attemptedOrdinal===x.prefixFiles+1&&x.nextBytes!==null,"limit");
   const fs=x.prefixFiles===4096,bs=x.nextBytes>536870912-x.prefixBytes;
   need(x.firstLimit===(fs&&bs?"both":fs?"files":bs?"bytes":"none"),"dimension");
   need(!x.nextBytesClipped||x.nextBytes===536870913,"clipping");
  }
  if(x.state==="unknown")need(!x.complete&&x.firstLimit==="unknown"&&x.firstLimitRegion==="unknown","unknowninventory");
 }
 if(r.stage==="complete"){
  need(n.started===true&&n.ended===true&&n.signal==="none"&&p.worldAfterVerified,"complete");
  if(r.job==="positive_prepare")need(p.worldRestored===true&&(n.exitCode===0||r.positive!==null),"positivecomplete");
  else need(r.readonly?.valid===true&&r.inventory!==null,"readonlycomplete");
 }
 return{record:r,diagnosticComplete:r.stage==="complete",nativeBusinessPassed:n.ended===true&&n.signal==="none"&&n.exitCode===0,operationalReadiness:false,PCoff:false};
}
