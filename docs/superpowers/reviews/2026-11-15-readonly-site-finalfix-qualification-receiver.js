function(wire,ctx,expected,matrix){
 const need=(v,m)=>{if(!v)throw Error("siteff:"+m);},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const keys=(v,ks)=>need(v&&typeof v==="object"&&!Array.isArray(v)&&eq(Object.keys(v).sort(),ks.slice().sort()),"keys");
 need(typeof wire==="string"&&wire.length<=16384&&/^[\x20-\x7E]*$/.test(wire),"wire");
 const r=JSON.parse(wire);need(JSON.stringify(r)===wire,"canonical");
 const flags=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];
 keys(r,["purpose","sourceBase","source","sourceTree","run","attempt","job","node","stage","before","fixed","tiny","helper","bounds","historicalActualAccepted","noNativeInvoked","noSDKImported","proof",...flags]);
 need(r.purpose==="afw.readonly-site.finalfix.qualification.v1"&&r.sourceBase==="6739481ada03d50e035edfd9c157c1646fad705d","purpose");
 need(ctx.attempt===1&&ctx.job==="controls"&&r.attempt===1&&r.job==="controls"&&r.source===ctx.source&&r.sourceTree===ctx.tree&&r.run===String(ctx.run)&&r.node==="22.23.4","context");
 flags.forEach(k=>need(r[k]===false,k));need(r.stage==="complete"&&r.noNativeInvoked===true&&r.noSDKImported===true&&r.historicalActualAccepted===true,"complete");
 keys(r.proof,["verified","programCount","programSetSha256","payloadExpandedSha256","productionCount","productionProgramSetSha256","productionExpandedSha256","coreGitVerified","prefixVerified","rootReceiverBlob"]);
 const p=r.proof;need(p.verified===true&&p.programCount===49&&p.programSetSha256===expected.programSet&&p.payloadExpandedSha256===expected.expanded&&p.productionCount===18&&p.productionProgramSetSha256===expected.productionSet&&p.productionExpandedSha256===expected.productionExpanded&&p.coreGitVerified===true&&p.prefixVerified===true&&p.rootReceiverBlob==="518e5be786a43023a5bfc0007f1a97c1d363d001","proof");
 need(Array.isArray(matrix.cases)&&matrix.cases.length===59&&new Set(matrix.cases.map(x=>x.id)).size===59,"matrix");
 for(const variant of ["before","fixed"]){
  const q=r[variant],e=matrix.expected[variant];keys(q,["purpose","valid","ended","rows","summary"]);need(q.purpose==="afw.readonly-site.finalfix.regressions.v1"&&q.valid===true&&q.ended===true,"stream");
  need(Array.isArray(q.rows)&&q.rows.length===59,"rows");q.rows.forEach((row,i)=>{keys(row,["id","result"]);need(row.id===matrix.cases[i].id&&row.result===matrix.cases[i][variant],"case");});
  keys(q.summary,["counts","success"]);keys(q.summary.counts,["cancelled","failed","passed","skipped","suites","tests","todo","topLevel"]);
  const counts={cancelled:0,failed:e.failed,passed:e.passed,skipped:0,suites:0,tests:59,todo:0,topLevel:59};for(const[k,v]of Object.entries(counts))need(q.summary.counts[k]===v,"counts");
  need(e.tests===59&&q.summary.success===(e.failed===0),"summary");
 }
 need(matrix.expected.before.failed===39&&matrix.expected.before.passed===20&&matrix.expected.fixed.failed===0&&matrix.expected.fixed.passed===59,"expected");
 keys(r.tiny,["passed","count","expected","usableShape","usableColumns"]);need(r.tiny.passed===true&&r.tiny.count===6&&r.tiny.expected===6&&r.tiny.usableShape===true&&r.tiny.usableColumns===true,"tiny");
 keys(r.helper,["passed","cases","aliasesCleared","outcomesPreserved","afterFlagsCleared"]);need(r.helper.passed===true&&r.helper.cases===3&&r.helper.aliasesCleared===true&&r.helper.outcomesPreserved===true&&r.helper.afterFlagsCleared===true,"helper");
 keys(r.bounds,["fixed","mutant","mutantKilled"]);for(const k of["fixed","mutant"]){keys(r.bounds[k],["positive1024Mapped","negative1025Unknown"]);need(r.bounds[k].positive1024Mapped===true&&r.bounds[k].negative1025Unknown===(k==="fixed"),"bounds");}need(r.bounds.mutantKilled===true,"mutant");
 return {record:r,contractQualificationPassed:true,NativeExecuted:false,operationalReadiness:false,PCoff:false};
}
