function(wire,ctx,schema,expected,aliases){
 const need=(x,m)=>{if(!x)throw Error("site:"+m);},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function shape(v,s){if(s.anyOf){need(s.anyOf.filter(t=>{try{shape(v,t);return true;}catch{return false;}}).length===1,"union");return;}if(s.enum){need(s.enum.some(x=>Object.is(v,x)),"enum");return;}switch(s.type){case"null":need(v===null,"null");break;case"boolean":need(typeof v==="boolean","boolean");break;case"integer":need(Number.isSafeInteger(v)&&v>=s.minimum&&v<=s.maximum,"integer");break;case"string":need(typeof v==="string"&&new RegExp(s.pattern).test(v),"string");break;case"array":need(Array.isArray(v)&&v.length>=s.minItems&&v.length<=s.maxItems,"array");v.forEach(x=>shape(x,s.items));break;case"object":need(v&&typeof v==="object"&&!Array.isArray(v)&&s.additionalProperties===false&&eq(Object.keys(v).sort(),s.required.slice().sort()),"keys");s.required.forEach(k=>shape(v[k],s.properties[k]));break;default:throw Error("schema");}}
 need(typeof wire==="string"&&wire.length<=16384&&/^[\x20-\x7E]*$/.test(wire),"wire");const r=JSON.parse(wire);need(JSON.stringify(r)===wire,"canonical");shape(r,schema);
 need(ctx.attempt===1&&r.attempt===ctx.attempt&&ctx.job==="readonly"&&r.job===ctx.job&&r.source===ctx.source&&r.run===String(ctx.run),"context");
 need(r.sourceTree===null||r.sourceTree===ctx.tree,"tree");
 for(const k of["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"])need(r[k]===false,k);
 const n=r.businessCommand,p=r.sourceProof,proof=r.programProof;
 need(p.mapBlob==="bcc38e8aeeffa82329701bf382e9868a34cf8ec0"&&p.mapSha256==="1f1024c4feb46f242b1d3ab7d87c5a8d696cccdb51547f5336f5bae90217deaf","map");
 if(r.controls.passed)need(r.controls.count===6&&r.controls.expected===6&&r.controls.usableShape&&r.controls.usableColumns,"controls");
 if(r.pure.passed)need(r.controls.passed&&r.pure.cases===8&&r.pure.expected===8,"pure");
 if(r.profile.passed)need(r.pure.passed&&r.profile.group==="readonly","profile");
 if(n.started===true){need(r.node==="22.23.4"&&r.sourceTree===ctx.tree&&proof.verified&&proof.count===18&&proof.setSha256===expected.programSet&&proof.payloadExpandedSha256===expected.expanded&&proof.coreGitVerified&&proof.prefixVerified,"programproof");need(p.mapVerified&&p.worldBeforeVerified&&p.nativeBeforeVerified&&r.controls.passed&&r.pure.passed&&r.profile.passed,"nativegates");}
 else need(n.ended===false&&n.exitCode===null&&r.readonly===null,"notobserved");
 if(n.ended)need(n.started===true,"ended");
 if(n.exitCode!==null)need(n.ended&&n.signal==="none","exit");
 const q=r.readonly;let known=0;
 if(q){
  need(eq(q.rows.map(x=>x.case),["R1","R2","R3"]),"rows");
  for(const row of q.rows)need((row.result==="failed")===(row.error!==null),"rowerror");
  for(const error of[...q.rows.map(x=>x.error),q.precase?.error].filter(Boolean)){need(error.sourceSite==="unknown"||aliases.includes(error.sourceSite),"alias");if(error.causeCode!=="ERR_ASSERTION")need(error.sourceSite==="unknown","nonassert");if(error.sourceSite!=="unknown")known++;}
  const first=q.precase?{target:"native_file",error:q.precase.error}:q.rows.filter(x=>x.result==="failed").map(x=>({target:x.case,error:x.error}))[0]??null;
  need(eq(q.firstFailure,first),"first");
  if(q.valid){
   need(q.ended&&n.ended&&n.signal==="none"&&q.summary!==null&&q.state!=="unknown","validend");
   const file=q.state==="file_failure";if(file)need(q.precase?.result==="failed"&&q.rows.every(x=>x.result==="not_observed"),"file");else need(q.precase===null&&q.rows.every(x=>["passed","failed"].includes(x.result)),"cases");
   const pass=file?0:q.rows.filter(x=>x.result==="passed").length,fail=file?1:3-pass,counts={cancelled:0,failed:fail,passed:pass,skipped:0,suites:0,tests:file?1:3,todo:0,topLevel:file?1:3};
   for(const[k,v]of Object.entries(counts))need(q.summary.counts[k]===v,"counts"+k);
   need(q.summary.success===(fail===0)&&q.state===(file?"file_failure":fail?"case_failure":"all_pass")&&(n.exitCode===0)===(fail===0),"result");
  }else need(q.state==="unknown"&&q.summary===null,"unknownstream");
 }
 need(r.usableLocationCount===known,"locationcount");need(r.collectionComplete===(r.stage==="complete"),"coverage");
 if(r.stage==="complete")need(n.started===true&&n.ended&&n.signal==="none"&&Number.isSafeInteger(n.exitCode)&&q?.valid&&p.mapVerified&&p.worldBeforeVerified&&p.nativeBeforeVerified&&p.worldAfterVerified&&p.nativeAfterVerified&&p.originalBodiesUnchanged,"complete");
 if(r.stage==="hold")need(n.started===false,"hold");
 return{record:r,diagnosticCollectionComplete:r.collectionComplete,usableLocationCount:known,commandExitedZero:n.ended&&n.exitCode===0&&n.signal==="none",historicalCauseProven:false,operationalReadiness:false,PCoff:false};
}
