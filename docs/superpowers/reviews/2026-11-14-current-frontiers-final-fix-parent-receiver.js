function(wire,ctx,schema,ids,beforeIds){
 const ok=(x,m)=>{if(!x)throw Error("fixreceipt:"+m);},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function check(v,s){if(s.anyOf){ok(s.anyOf.filter(t=>{try{check(v,t);return true;}catch{return false;}}).length===1,"union");return;}if(s.enum){ok(s.enum.some(x=>Object.is(v,x)),"enum");return;}
 switch(s.type){case"null":ok(v===null,"null");break;case"boolean":ok(typeof v==="boolean","bool");break;case"integer":ok(Number.isSafeInteger(v)&&v>=s.minimum&&v<=s.maximum,"int");break;case"string":ok(typeof v==="string"&&new RegExp(s.pattern).test(v),"string");break;case"array":ok(Array.isArray(v)&&v.length>=s.minItems&&v.length<=s.maxItems,"array");v.forEach(x=>check(x,s.items));break;case"object":ok(v&&typeof v==="object"&&!Array.isArray(v)&&s.additionalProperties===false&&eq(Object.keys(v).sort(),s.required.slice().sort()),"keys");s.required.forEach(k=>check(v[k],s.properties[k]));break;default:throw Error("schema");}}
 ok(typeof wire==="string"&&wire.length<=16384&&/^[\x20-\x7E]*$/.test(wire),"wire");const r=JSON.parse(wire);ok(JSON.stringify(r)===wire,"canonical");check(r,schema);
 ok(ctx.attempt===1&&r.attempt===ctx.attempt&&r.source===ctx.source&&r.run===String(ctx.run)&&r.job==="controls"&&ctx.job==="controls","context");ok(r.sourceTree===null||r.sourceTree===ctx.tree,"tree");
 for(const k of["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"])ok(r[k]===false,k);
 if(r.stage!=="complete")return{record:r,controlQualificationAccepted:false};
 ok(r.node==="22.23.4"&&r.sourceTree===ctx.tree&&r.noNativeInvoked===true&&r.noSDKImported===true,"scope");
 const p=r.programProof;ok(p.verified&&p.count===33&&p.setSha256==="716cdeb6886a41584ee161eaca5f86246ff11ce6e1b448770d7c8eb2895a1ede"&&p.payloadExpandedSha256==="16000dc2df60a458d96bf122fa9472064d3ca82964f8ea441700c94e7f913f62"&&p.coreGitVerified&&p.prefixVerified,"programproof");
 for(const [key,failed]of[["before",beforeIds],["fixed",[]]]){
  const v=r[key];ok(v&&v.valid&&v.ended&&eq(v.rows.map(x=>x.id),ids)&&v.rows.every(x=>["passed","failed"].includes(x.result))&&eq(v.rows.filter(x=>x.result==="failed").map(x=>x.id),failed),"rows"+key);
  ok(v.summary&&v.summary.success===(failed.length===0),"summary"+key);
  const c={cancelled:0,failed:failed.length,passed:23-failed.length,skipped:0,suites:0,tests:23,todo:0,topLevel:23};for(const[k,n]of Object.entries(c))ok(v.summary.counts[k]===n,"counts"+key+k);
 }
 ok(eq(r.mutations.map(x=>x.kind),["observer_disconnected","conversion_disabled"])&&r.mutations.every(x=>x.metadataOnlyExit===0&&x.actualTraversalExit===1&&x.assertionFailureObserved&&x.realTraversalReached),"mutations");
 const c=r.coverage;ok(c!==null,"coverage");
 for(const k of Object.keys(c).filter(k=>k!=="realSparseGuard"))ok(c[k]===true,"coverage"+k);
 const s=c.realSparseGuard;for(const[k,v]of Object.entries({logicalBytes:536870913,physicalBlocksSupported:true,physicalTinyChecked:true,materialBytesRead:false,guardProducedFirstLimit:true,firstLimit:"bytes",prefixFiles:0,prefixBytes:0,attemptedOrdinal:1,nextBytes:536870913,nextBytesClipped:false,firstLimitRegion:"root"}))ok(s[k]===v,"sparse"+k);
 ok(Number.isSafeInteger(s.allocatedBlocks)&&s.allocatedBlocks>=0&&s.allocatedBlocks<=2048,"sparseallocation");
 return{record:r,controlQualificationAccepted:true,beforeExpectedFailures:19,fixedPassed:23,productionMutationsKilled:2,NativeExecuted:false,operationalReadiness:false,PCoff:false};
}
