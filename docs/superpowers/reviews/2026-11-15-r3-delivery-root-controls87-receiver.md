# Root correction87 pre-execution receiver and cap ruling
15nov2026. Matrix880de2e98645c2edc1343350a877c59c655490c2/18853B/SHA3835e8b9977cbf99248cd547a0f5b499887e739020ab4c7791c4a70d807ef8fc; schemas19a7b38130ac6a2a621da7c2678ae63c1d0ae2f5; examplesc32e792c668f9a84cb0edf5d27de9671637fc845. Code below is OWN controller code, not Source execution, exact external receiver38749c663f4dd58fbb5f1a3c940a3820c4ff5100 (includes finalLF in blob).
```javascript
function(wire,ctx,schema,matrix,matrixHash){
 const need=(v,m)=>{if(!v)throw Error("Root delivery controls: "+m);},same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function check(x,s){
  if(s.anyOf){let n=0;for(const a of s.anyOf)try{check(x,a);n++;}catch{}need(n===1,"union");return;}
  if(s.enum){need(s.enum.some(v=>Object.is(v,x)),"enum");return;}
  switch(s.type){
   case"object":need(x!==null&&typeof x==="object"&&!Array.isArray(x)&&s.additionalProperties===false&&same(Object.keys(x).sort(),s.required.slice().sort()),"keys");for(const k of s.required)check(x[k],s.properties[k]);break;
   case"array":need(Array.isArray(x)&&x.length>=s.minItems&&x.length<=s.maxItems,"array");for(const v of x)check(v,s.items);break;
   case"string":need(typeof x==="string"&&new RegExp(s.pattern).test(x),"string");break;
   case"integer":need(Number.isSafeInteger(x)&&x>=s.minimum&&x<=s.maximum,"integer");break;
   case"boolean":need(typeof x==="boolean","boolean");break;
   case"null":need(x===null,"null");break;
   default:throw Error("Root delivery controls schema");
  }
 }
 need(typeof wire==="string"&&wire.length<=matrix.boundaries.report&&/^[\x20-\x7e]+$/.test(wire),"wire");const r=JSON.parse(wire);need(JSON.stringify(r)===wire,"canonical");check(r,schema);
 for(const k of ["source","sourceTree","run","attempt","job","node"])need(r[k]===ctx[k],"context");
 need(r.matrixSha256===matrixHash&&r.expected===matrix.ordered.length,"matrix");
 const ids=matrix.ordered.map(x=>x.id);need(same(r.results.map(x=>x.id),ids),"row-order");
 const counts={passed:0,failed:0,unknown:0};for(const row of r.results)counts[row.result]++;for(const k of Object.keys(counts))need(r[k]===counts[k],"counts");
 need(same(r.mutants.map(x=>x.id),matrix.mutants.map(x=>x.id)),"mutant-order");
 for(let i=0;i<r.mutants.length;i++){
  const got=r.mutants[i],wanted=matrix.mutants[i];need(same(got.expectedFailedIds,wanted.expectedFailedIds),"expected-mutant-failures");
  need(new Set(got.actualFailedIds).size===got.actualFailedIds.length&&same(got.actualFailedIds,ids.filter(id=>got.actualFailedIds.includes(id))),"observed-mutant-failures");
  if(got.result==="passed")need(same(got.actualFailedIds,wanted.expectedFailedIds),"exact-kill");
  if(got.result==="failed")need(!same(got.actualFailedIds,wanted.expectedFailedIds),"failed-truth");
 }
 const instances=["baseline",...matrix.mutants.map(x=>x.id)].flatMap(group=>ids.map(id=>group+":"+id));
 const cleanup=r.cleanup;
 for(const key of ["failedInstances","unknownInstances"])need(new Set(cleanup[key]).size===cleanup[key].length&&same(cleanup[key],instances.filter(id=>cleanup[key].includes(id))),"cleanup-order");
 need(!cleanup.failedInstances.some(id=>cleanup.unknownInstances.includes(id)),"cleanup-disjoint");
 const clean=cleanup.complete===true&&cleanup.failedInstances.length===0&&cleanup.unknownInstances.length===0;
 const qualified=counts.passed===ids.length&&r.mutants.every(x=>x.result==="passed")&&clean;
 need(r.allPassed===qualified,"pass-truth");return {record:r,accepted:true,qualified,NativeReleased:false};
}
```

Own tests:86contract6positive/12negative,87contract2positive/4negative; final87 Source example reports3accepted with qualification truth. EnvelopeRootfc579ca3 unchanged/new schemas10positive/8negative, including impossible not_observed and BOM/framing. None is a Source control run or Native test.

Cap ruling: measured provisional raw350459B exceeds earlier350000; gzip62234B/base6482980/helpermax24129 remain within old bounds. Permit raw400000B and SAME1650000B for current fullprefix1504398 plus bounded appendix. Keep gzip65536/base6487400/helper32768 and wire/5s/120s unchanged. Final package still must match declared cap. Source closed e27fb843; no new ref/run gate. Reviewer05ccd5868Important accepted, fix round1 pending.

Reachability: full implementation report, task review and review package are preserved as actual files in this docs tree, not solely linked SHA text. This preserves the review record independently of dangling GitDB object retention; no Source/product/runtime changes.
