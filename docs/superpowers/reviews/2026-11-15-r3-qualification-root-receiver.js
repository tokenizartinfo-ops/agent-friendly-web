function(wire,context,schema,pins,focused,contractIDs){
 const must=(v,n)=>{if(!v)throw Error('Root R3 qualification: '+n);},same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function shape(value,rule){
  if(rule.anyOf){let matches=0;for(const choice of rule.anyOf)try{shape(value,choice);matches++;}catch{}must(matches===1,'union');return;}
  if(rule.enum){must(rule.enum.some(x=>Object.is(x,value)),'enum');return;}
  if(rule.type==='object'){must(value!==null&&typeof value==='object'&&!Array.isArray(value)&&rule.additionalProperties===false&&same(Object.keys(value).sort(),rule.required.slice().sort()),'closed keys');for(const key of rule.required)shape(value[key],rule.properties[key]);return;}
  if(rule.type==='array'){must(Array.isArray(value)&&value.length>=rule.minItems&&value.length<=rule.maxItems,'array');for(const x of value)shape(x,rule.items);return;}
  if(rule.type==='integer'){must(Number.isSafeInteger(value)&&value>=rule.minimum&&value<=rule.maximum,'integer');return;}
  if(rule.type==='string'){must(typeof value==='string'&&new RegExp(rule.pattern).test(value),'string');return;}
  if(rule.type==='boolean'){must(typeof value==='boolean','boolean');return;}
  if(rule.type==='null'){must(value===null,'null');return;}
  throw Error('unknown schema');
 }
 must(typeof wire==='string'&&wire.length<=20000&&/^[\x20-\x7e]*$/.test(wire),'wire');
 const result=JSON.parse(wire);must(JSON.stringify(result)===wire,'canonical');shape(result,schema);
 must(result.purpose==='afw.r3-existing-sample.qualification.v1'&&result.sourceBase==='8b1e2f364608ebef7727ebcb51a47d171410ce8e','purpose');
 must(context.attempt===1&&context.job==='contracts'&&result.attempt===1&&result.job==='contracts'&&result.source===context.source&&result.sourceTree===context.tree&&result.run===String(context.run),'actual context');
 must(result.stage==='complete'&&result.allPassed===true&&result.node==='22.23.4'&&result.nativeBusinessCases===0,'completion');
 const p=result.proof;for(const key of ['programsVerified','coreBefore','coreAfter','prefixVerified','sourcePinsVerified'])must(p[key]===true,key);
 must(p.programCount===pins.count&&p.programSetSha256===pins.set&&p.payloadExpandedSha256===pins.expanded&&p.productionCount===18&&p.productionProgramSetSha256===pins.productionSet&&p.productionExpandedSha256===pins.productionExpanded,'payload pins');
 function report(report,ids,failed,purpose){
  must(report?.purpose===purpose&&report.valid===true&&report.ended===true&&same(report.rows.map(x=>x.id),ids),'report identity');
  must(report.rows.every(x=>x.result===(failed.includes(x.id)?'failed':'passed')),'report outcomes');
  const counts={cancelled:0,failed:failed.length,passed:ids.length-failed.length,skipped:0,suites:0,tests:ids.length,todo:0,topLevel:ids.length};
  must(same(report.summary?.counts,counts)&&report.summary.success===(failed.length===0),'report totals');
 }
 report(result.focused.before,focused.ids,focused.mutants[0].failed,'afw.r3-existing-sample.tests.v1');
 report(result.focused.fixed,focused.ids,[],'afw.r3-existing-sample.tests.v1');
 must(same(result.focused.mutants.map(x=>x.id),focused.mutants.map(x=>x.id)),'mutation inventory');
 for(let i=0;i<focused.mutants.length;i++){const want=focused.mutants[i],got=result.focused.mutants[i];must(got.killed===true&&same(got.failed,want.failed)&&got.tests===16&&got.passed===16-want.failed.length,'mutation outcome');}
 report(result.currentContracts,contractIDs,[],'afw.readonly-site.finalfix.regressions.v1');
 must(same(result.tiny,{passed:true,count:6,expected:6,usableShape:true,usableColumns:true}),'C1-C6');
 must(same(result.helper,{passed:true,cases:3,aliasesCleared:true,outcomesPreserved:true,afterFlagsCleared:true}),'helper');
 must(same(result.bounds,{fixed:{positive1024Mapped:true,negative1025Unknown:true},mutant:{positive1024Mapped:true,negative1025Unknown:false},killed:true}),'bounds');
 must(same(result.receivers,{accepted:2,rejected:20,syntheticOnly:true,historicalActualAccepted:true}),'receiver controls');
 must(same(result.pure,{passed:true,count:8})&&same(result.inactive,{inactivePassed:true,invalidRejected:true})&&same(result.profile,{passed:true,group:'readonly'})&&same(result.preparation,{passed:true,groups:['F1','F2','F3','F4','F5','F6','F7','F8']}),'source controls');
 for(const key of ['historicalCauseProven','receiptAuthenticated','operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'])must(result[key]===false,key);
 return {accepted:true,sourceQualified:true,source:result.source,run:result.run,NativeReleased:false,operationalReadiness:false,PCoff:false};
}