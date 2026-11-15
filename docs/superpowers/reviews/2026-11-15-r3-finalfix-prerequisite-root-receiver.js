function(wire,context,schema){
 const need=(v,m)=>{if(!v)throw Error('Root R3 prequalification: '+m);},equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function shape(v,s){
  if(s.anyOf){let n=0;for(const t of s.anyOf)try{shape(v,t);n++;}catch{}need(n===1,'union');return;}
  if(s.enum){need(s.enum.some(x=>Object.is(x,v)),'enum');return;}
  switch(s.type){
   case'object':need(v!==null&&typeof v==='object'&&!Array.isArray(v)&&s.additionalProperties===false&&equal(Object.keys(v).sort(),s.required.slice().sort()),'keys');for(const k of s.required)shape(v[k],s.properties[k]);return;
   case'array':need(Array.isArray(v)&&v.length>=s.minItems&&v.length<=s.maxItems,'array');for(const x of v)shape(x,s.items);return;
   case'integer':need(Number.isSafeInteger(v)&&v>=s.minimum&&v<=s.maximum,'integer');return;
   case'string':need(typeof v==='string'&&new RegExp(s.pattern).test(v),'string');return;
   case'boolean':need(typeof v==='boolean','boolean');return;
   case'null':need(v===null,'null');return;
   default:throw Error('unknown schema');
  }
 }
 need(typeof wire==='string'&&wire.length<=8192&&/^[\x20-\x7e]*$/.test(wire),'wire');
 const p=JSON.parse(wire);need(wire===JSON.stringify(p),'canonical');shape(p,schema);
 need(context.attempt===1&&context.job==='contracts'&&p.source===context.source&&p.run===String(context.run)&&p.attempt===1&&p.job==='contracts','actual context');
 need(p.sourceTree===null||p.sourceTree===context.tree,'tree');
 need(equal(p.syntax.files.map(x=>x.file),['world','fixture','focused']),'syntax aliases');
 for(const l of [p.lintBefore,p.lintFixed]){need(new Set(l.files.map(x=>x.file)).size===l.files.length,'lint duplicate');for(const row of l.files){if(l.availability==='unavailable')need(row.counts===null&&row.warnings===null,'unknown counts');else need(row.counts!==null&&row.warnings!==null,'known counts');}}
 for(const k of ['historicalCauseProven','receiptAuthenticated','operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'])need(p.nonclaims[k]===false,k);
 if(p.passed){
  need(p.availability==='observed'&&p.stage==='complete'&&p.firstFailure===null&&p.node==='22.23.4'&&p.sourceTree===context.tree,'complete');
  need(p.syntax.availability==='observed'&&p.syntax.files.every(x=>x.state==='passed'),'syntax');
  need(p.lintBefore.availability==='observed'&&p.lintBefore.passed===false&&p.lintBefore.files.length===1&&p.lintBefore.files[0].file==='focused_before'&&equal(p.lintBefore.files[0].counts,{assign_module:2,other:0,parser:0}),'actual expected lint red');
  need(p.lintFixed.availability==='observed'&&p.lintFixed.passed===true&&equal(p.lintFixed.files.map(x=>x.file),['world','fixture','focused'])&&p.lintFixed.files.every(x=>equal(x.counts,{assign_module:0,other:0,parser:0})),'actual fixed lint');
  need(equal(p.formatter,{availability:'observed',passed:true,positives:3,negatives:16,getters:0,proxyTraps:0}),'formatter');
  need(p.proof.sourceBefore===true&&p.proof.sourceAfter===true&&p.proof.temporaryRemoved===true,'source proof');
 }else need(p.stage!=='complete'&&p.firstFailure!==null,'failed stage');
 return {record:p,prequalified:p.passed,observed:p.availability==='observed',SourceQualified:false,NativeReleased:false,operationalReadiness:false,PCoff:false};
}