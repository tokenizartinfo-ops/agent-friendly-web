// Independent Root-only synthetic controls. No product Source is loaded or executed.
export default function(record,api,conjunction,preflight,factory,legacyNegatives,approved,ctx,previous){
 const clone=x=>JSON.parse(JSON.stringify(x)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),need=(v,m)=>{if(!v)throw Error("OWN fix1 control: "+m);};
 need(previous&&typeof previous.record==="function"&&typeof previous.conjunction==="function","previous_OWN_functions_required");
 const accepted=[],rejected=[],beforeAccepted=[],focusedRejectionReasons={};
 const pass=(name,fn)=>{fn();accepted.push(name);};
 const deny=(name,fn)=>{let threw=false;try{fn();}catch(e){threw=true;focusedRejectionReasons[name]=e.message;}need(threw,"negative accepted "+name);rejected.push(name);};
 const read=x=>record(JSON.stringify(x),ctx,approved),valid=factory(approved,ctx);
 const ids=approved.matrix.ordered.map(x=>x.id),names=["baseline","M_RAW","M_PROVENANCE","M_OUTPUT","M_ASSOC"],kills=[[],["D02"],["P06"],["B05","U01"],["S01"]];
 // Test fixture bookkeeping is refreshed before a transition mutant, so rejection is not a stale count/v1/qualified bit.
 function recount(r){
  const failedInstances=[],unknownInstances=[],sums=[];
  for(const g of r.groups){
   g.entered=[...g.entry].filter(x=>x==="1").length;g.returned=[...g.outcome].filter(x=>"PFU".includes(x)).length;
   g.passed=[...g.outcome].filter(x=>x==="P").length;g.failed=[...g.outcome].filter(x=>x==="F").length;g.unknown=[...g.outcome].filter(x=>"UX".includes(x)).length;g.unentered=104-g.entered;
   ids.forEach((id,i)=>{if(g.cleanup[i]==="F")failedInstances.push(g.id+":"+id);if(g.cleanup[i]==="U")unknownInstances.push(g.id+":"+id);});
   sums.push({failedIds:ids.filter((id,i)=>g.outcome[i]==="F")});
  }
  const b=r.groups[0],clean=!r.groups.some(g=>g.outcome.includes("X"))&&unknownInstances.length===0;
  r.v1.passed=b.passed;r.v1.failed=b.failed;r.v1.unknown=104-b.passed-b.failed;
  r.v1.results=ids.map((id,i)=>({id,result:b.outcome[i]==="P"?"passed":b.outcome[i]==="F"?"failed":"unknown"}));
  r.v1.mutants=approved.matrix.mutants.map((m,i)=>({id:m.id,expectedFailedIds:m.expectedFailedIds,actualFailedIds:sums[i+1].failedIds,result:r.groups[i+1].unknown+r.groups[i+1].unentered?"unknown":same(sums[i+1].failedIds,m.expectedFailedIds)?"passed":"failed"}));
  r.v1.cleanup={complete:clean,failedInstances,unknownInstances};
  r.v1.allPassed=b.passed===104&&b.failed===0&&r.v1.unknown===0&&r.v1.mutants.every(x=>x.result==="passed")&&clean&&failedInstances.length===0;
  const exact=r.groups.every((g,i)=>g.entered===104&&g.returned===104&&g.unknown===0&&g.cleanup==="C".repeat(104)&&same(sums[i].failedIds,kills[i]));
  r.qualified=exact&&r.terminal.kind==="complete"&&r.terminal.next===520&&Number.isSafeInteger(r.lastAdmissionMs)&&r.lastAdmissionMs<=220000&&Number.isSafeInteger(r.terminalMs)&&r.terminalMs<=240000&&r.v1.allPassed;
  return r;
 }
 const set=(g,key,index,char)=>{g[key]=g[key].slice(0,index)+char+g[key].slice(index+1);};
 const positives=[
 ["complete515P5F520C",{}],["inner220001",{full:false,entries:207,kind:"inner"}],["outer220001",{full:false,entries:104,kind:"outer"}],["late240001",{full:false,entries:207,kind:"late"}],
 ["empty-initialization-exception",{full:false,entries:0,kind:"exception",terminalMs:0}],["final-returned-U-exception",{full:false,entries:1,kind:"exception",unknown:true}],["final-cleanup-U-custody",{full:false,entries:1,kind:"custody",cleanupUnknown:true}],
 ["abrupt-open-X",{full:false,entries:207,kind:"abrupt",lost:true}],["abrupt-completed-prefix",{full:false,entries:207,kind:"abrupt"}],["empty-abrupt",{full:false,entries:0,kind:"abrupt"}]
 ];
 for(const[name,options]of positives)pass(name,()=>{const r=read(factory(approved,ctx,options));need(r.accepted===true&&r.recordQualified===(name==="complete515P5F520C"),name);});
 for(const entries of [208,312,416])pass("outer-prefix"+entries,()=>need(read(factory(approved,ctx,{full:false,entries,kind:"outer"})).accepted,"outer_boundary"));
 pass("complete-terminal240000-admission220000",()=>need(read(factory(approved,ctx,{lastAdmissionMs:220000,terminalMs:240000})).recordQualified,"complete_bounds"));
 pass("inner-refusal-before-first",()=>need(read(factory(approved,ctx,{full:false,entries:0,kind:"inner"})).accepted,"empty_inner"));
 pass("complete-known-F-unqualified",()=>{const r=clone(valid);set(r.groups[0],"outcome",0,"F");const result=read(recount(r));need(result.accepted&&!result.recordQualified,"knownF");});
 pass("complete-cleanup-F-unqualified",()=>{const r=clone(valid);set(r.groups[0],"cleanup",0,"F");const result=read(recount(r));need(result.accepted&&!result.recordQualified,"cleanupF");});
 pass("refusal-boundary-lastAdmission220000",()=>{const r=factory(approved,ctx,{full:false,entries:207,kind:"inner",lastAdmissionMs:220000});need(read(r).accepted,"boundary");});
 const transitions=[
 ["after-returned-U-entry",()=>{const r=factory(approved,ctx,{full:false,entries:2,kind:"exception",unknown:true});set(r.groups[0],"outcome",0,"U");return recount(r);}],
 ["after-cleanup-U-entry",()=>{const r=factory(approved,ctx,{full:false,entries:2,kind:"custody",cleanupUnknown:true});set(r.groups[0],"cleanup",0,"U");return recount(r);}],
 ["abrupt-entry-after-returned-U",()=>{const r=factory(approved,ctx,{full:false,entries:2,kind:"abrupt",lost:true});set(r.groups[0],"outcome",0,"U");return recount(r);}],
 ["abrupt-entry-after-cleanup-U",()=>{const r=factory(approved,ctx,{full:false,entries:2,kind:"abrupt",lost:true});set(r.groups[0],"cleanup",0,"U");return recount(r);}],
 ["exception-nonabrupt-open-X",()=>{const r=factory(approved,ctx,{full:false,entries:1,kind:"exception",lost:true});return recount(r);}],
 ["late-nonabrupt-open-X",()=>{const r=factory(approved,ctx,{full:false,entries:1,kind:"late",lost:true});return recount(r);}],
 ["custody-nonabrupt-open-X",()=>{const r=factory(approved,ctx,{full:false,entries:1,kind:"custody",lost:true});return recount(r);}],
 ["inner-early220000",()=>factory(approved,ctx,{full:false,entries:207,kind:"inner",terminalMs:220000})],
 ["outer-early220000",()=>factory(approved,ctx,{full:false,entries:104,kind:"outer",terminalMs:220000})],
 ["late-early240000",()=>factory(approved,ctx,{full:false,entries:207,kind:"late",terminalMs:240000})],
 ["complete-impossible240001",()=>recount(factory(approved,ctx,{terminalMs:240001}))],
 ["exception-final-known",()=>factory(approved,ctx,{full:false,entries:1,kind:"exception"})],
 ["custody-final-known-cleanup",()=>factory(approved,ctx,{full:false,entries:1,kind:"custody"})],
 ["complete-final-returned-U",()=>{const r=clone(valid);set(r.groups[4],"outcome",103,"U");return recount(r);}],
 ["complete-final-cleanup-U",()=>{const r=clone(valid);set(r.groups[4],"cleanup",103,"U");return recount(r);}],
 ["outer-wrong-prefix105",()=>factory(approved,ctx,{full:false,entries:105,kind:"outer"})],
 ["admission-after-terminal",()=>factory(approved,ctx,{full:false,entries:1,kind:"exception",unknown:true,lastAdmissionMs:1001,terminalMs:1000})],
 ["empty-nonnull-admission",()=>{const r=factory(approved,ctx,{full:false,entries:0,kind:"exception"});r.lastAdmissionMs=0;return r;}],
 ["abrupt-numeric-time",()=>{const r=factory(approved,ctx,{full:false,entries:1,kind:"abrupt"});r.terminalMs=1000;return r;}],
 ["nonabrupt-unknown-time",()=>{const r=factory(approved,ctx,{full:false,entries:1,kind:"exception",unknown:true});r.terminalMs="unknown";return r;}],
 ["global-prefix-hole",()=>{const r=factory(approved,ctx,{full:false,entries:2,kind:"inner"});set(r.groups[0],"entry",0,"0");set(r.groups[0],"outcome",0,"N");set(r.groups[0],"cleanup",0,"N");r.terminal.next=1;return recount(r);}]
 ];
 for(const[name,make]of transitions){
  const r=make();deny(name,()=>read(r));
  if(previous.record){let old=false;try{old=previous.record(JSON.stringify(r),ctx,approved).accepted===true;}catch{}if(old)beforeAccepted.push(name);}
 }
 deny("attempt-boolean",()=>record(JSON.stringify(valid).replace('"attempt":1','"attempt":true'),ctx,approved));
 deny("attempt-float-spelling1.0",()=>record(JSON.stringify(valid).replace('"attempt":1','"attempt":1.0'),ctx,approved));
 const legacy=legacyNegatives(record,valid,ctx,approved,factory);
 need(legacy.negativeRejected===36,"legacy36");
 const roleKeys=["preflight","boundary","unit","full"],stepNames=["Check serial v2 isolation and trace controls","Check serial loader boundary controls","Check serial entry pin reuse","Run declared full104 controls only"],markers=["AFW_Q1_SERIAL_LAB_PREFLIGHT/2","AFW_SERIAL_LOADER_BOUNDARY_UNIT/1","AFW_SERIAL_ENTRY_PIN_UNIT/1","AFW_Q1_SERIAL_LAB/2"];
 const run=Number(ctx.run),jobId=202,parent="1".repeat(40),expected={source:ctx.source,tree:ctx.sourceTree,parent,run,jobId,jobName:"readonly",preflightStepNames:stepNames.slice(0,3),fullStepName:stepNames[3]};
 need(Number.isSafeInteger(run)&&run>0,"synthetic_run");
 const goodStep=(name,number)=>({name,number,status:"completed",conclusion:"success"});
 const apiInput={commit:{sha:ctx.source,tree:{sha:ctx.sourceTree},parents:[{sha:parent}]},run:{id:run,head_sha:ctx.source,run_attempt:1,event:"push",path:".github/workflows/afw-finite-budget-qualification.yml",head_branch:"feat/finite-native-cleanup-20261101",status:"completed",conclusion:"success"},jobs:{total_count:1,jobs:[{id:jobId,run_id:run,name:"readonly",status:"completed",conclusion:"success",steps:[goodStep("Set up job",1),goodStep("Run actions/checkout@11d5960a326750d5838078e36cf38b85af677262",2),goodStep("Run actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020",3),...stepNames.map((n,i)=>goodStep(n,i+4))]}]},frame:{marker:markers[3],count:1,unavailableCount:0,legacySuccessCount:0,stepName:stepNames[3],stepNumber:7,mappedByRunHeader:true}};
 const joined=api(ctx,apiInput,expected);
 pass("authenticated-four-step-map",()=>need(same(joined.requiredStepMap,Object.fromEntries(stepNames.map((n,i)=>[n,i+4])))&&joined.step===7,"API_map"));
 const apiMutants=[
 ["API-string-step",a=>a.jobs.jobs[0].steps[3].number="4"],["API-missing-step",a=>a.jobs.jobs[0].steps.splice(4,1)],["API-duplicate-step",a=>a.jobs.jobs[0].steps.push(clone(a.jobs.jobs[0].steps[4]))],
 ["API-swap-boundary-unit",a=>{a.jobs.jobs[0].steps[4].number=6;a.jobs.jobs[0].steps[5].number=5;}],["API-stale-job",a=>a.jobs.jobs[0].id=203],["API-stale-run",a=>a.jobs.jobs[0].run_id=run+1],
 ["API-string-setup-step",a=>a.jobs.jobs[0].steps[1].number="2"],["API-string-full-frame",a=>a.frame.stepNumber="7"],["API-second-job",a=>{a.jobs.total_count=2;a.jobs.jobs.push(clone(a.jobs.jobs[0]));}]
 ];
 for(const[name,mut]of apiMutants){const a=clone(apiInput);mut(a);deny(name,()=>api(ctx,a,expected));}
 deny("API-caller-relabels-required-step",()=>{const a=clone(apiInput),e=clone(expected);e.preflightStepNames[0]="caller-selected";a.jobs.jobs[0].steps[3].name="caller-selected";api(ctx,a,e);});
 const flags=clone(valid.nonclaims);
 const prefRecord={purpose:"afw.q1.serial-source-lab.preflight.v2",...ctx,policySha256:approved.policySha256,schemaSha256:approved.schemaSha256,driverSha256:approved.driver.sha256,tests:Object.fromEntries(["isolation-original33","nested-T01","seal-and-import","trace-order/missing-nonkill/duplicateordinal/unknown-exception-inflight","timing-refusal-inner/outer/late","cleanup-uncertain","context-and-frame","fixedstderr/malformedstdout"].map(n=>[n,"passed"])),fixtureOnly:true,nativeBusinessCases:0,nonclaims:flags};
 const pref=preflight(JSON.stringify(prefRecord),ctx,approved),others={boundary:{boundaryControlsPassed:true,contextObserved:true,record:clone(ctx)},unit:{unitControlsPassed:true,contextObserved:true,record:clone(ctx)}};
 const mapping={logOrigin:{runId:run,jobId},frames:Object.fromEntries(roleKeys.map((role,i)=>[role,{marker:markers[i],count:1,stepName:stepNames[i],stepNumber:i+4,runId:run,jobId,mappedByRunHeader:true}]))};
 const approvedSAME="2".repeat(40),closure={activeSource:ctx.source,closedParent:ctx.source,closedSource:"3".repeat(40),closedTree:"4".repeat(40),F7:"f7a71f1a0fa4f5ddf069ff411f008a098455e5cc",proposedSAME:approvedSAME,wholeSAMEPreserved:true,wholeSAME:"5".repeat(40),coreSha256:"aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703",main:"0c9c475b3ebaa970fc11d628b40e50a90cceb727",activeQueueCount:0,closedHeadRunCount:0,SourcePendingNull:true,fullReadback:true};
 const data=read(valid),join=(m,c=closure,a=joined)=>conjunction(data,a,pref,others,m,c,approvedSAME);
 pass("four-frames-matching-numeric-origins",()=>{const r=join(mapping);need(r.evidenceEligible===true&&r.I3Closed===false&&r.NativeReleased===false&&r.C2Released===false,"fixture_conjunction");});
 pass("closure-pending-ineligible",()=>{const r=join(mapping,null);need(r.evidenceEligible===false&&r.I3Closed===false,"pending");});
 const mapMutants=[
 ["both-old-assertions-forged-together",m=>m.frames.preflight.stepNumber=2],
 ["both-old-assertions-numeric-string",m=>m.frames.preflight.stepNumber="2"],
 ["swap-preflight-boundary-positions",m=>{m.frames.preflight.stepNumber=5;m.frames.boundary.stepNumber=4;}],
 ["swap-boundary-unit-positions",m=>{m.frames.boundary.stepNumber=6;m.frames.unit.stepNumber=5;}],
 ["numeric-string-preflight",m=>m.frames.preflight.stepNumber="4"],
 ["numeric-string-boundary",m=>m.frames.boundary.stepNumber="5"],
 ["numeric-string-unit",m=>m.frames.unit.stepNumber="6"],
 ["numeric-string-full",m=>m.frames.full.stepNumber="7"],
 ["missing-boundary-frame",m=>delete m.frames.boundary],
 ["missing-unit-frame",m=>delete m.frames.unit],
 ["duplicate-preflight-marker-count",m=>m.frames.preflight.count=2],
 ["duplicate-boundary-marker-count",m=>m.frames.boundary.count=2],
 ["wrong-unit-marker",m=>m.frames.unit.marker=markers[1]],
 ["stale-job-log-origin",m=>{m.logOrigin.jobId=203;for(const f of Object.values(m.frames))f.jobId=203;}],
 ["stale-run-log-origin",m=>{m.logOrigin.runId=run+1;for(const f of Object.values(m.frames))f.runId=run+1;}],
 ["string-job-log-origin",m=>m.logOrigin.jobId=String(jobId)],
 ["stale-boundary-job-only",m=>m.frames.boundary.jobId=203],
 ["stale-unit-run-only",m=>m.frames.unit.runId=run+1],
 ["stale-full-run-only",m=>m.frames.full.runId=run+1],
 ["missing-header-mapping",m=>m.frames.boundary.mappedByRunHeader=false]
 ];
 for(const role of roleKeys){
  mapMutants.push(["missing-frame-"+role,m=>delete m.frames[role]],["duplicate-count-"+role,m=>m.frames[role].count=2],["stale-job-"+role,m=>m.frames[role].jobId=203],["string-run-"+role,m=>m.frames[role].runId=String(run)]);
 }
 function oldProjection(m){const f=m.frames.preflight;return{preflightCount:f.count,preflightMarker:f.marker,preflightStepName:f.stepName,preflightStepNumber:f.stepNumber,preflightAPIStepNumber:f.stepNumber,mappedByRunHeader:f.mappedByRunHeader};}
 for(const[name,mut]of mapMutants){
  const m=clone(mapping);mut(m);deny(name,()=>join(m));
  if(previous.conjunction&&m.frames.preflight){let old=false;try{old=previous.conjunction(data,joined,pref,others,oldProjection(m),closure,approvedSAME).evidenceEligible===true;}catch{}if(old)beforeAccepted.push(name);}
 }
 deny("missing-authenticated-API-map",()=>{const a=clone(joined);delete a.requiredStepMap;join(mapping,closure,a);});
 deny("closure-wrong-SAME",()=>{const c=clone(closure);c.proposedSAME="6".repeat(40);join(mapping,c);});
 deny("closure-no-readback",()=>{const c=clone(closure);c.fullReadback=false;join(mapping,c);});
 for(const name of ["both-old-assertions-forged-together","both-old-assertions-numeric-string"])need(focusedRejectionReasons[name]==="Root serial-v2 conjunction: frame_API_origin_preflight","I5 focused reason "+name);
 for(const name of ["after-returned-U-entry","after-cleanup-U-entry","abrupt-entry-after-returned-U","abrupt-entry-after-cleanup-U"])need(focusedRejectionReasons[name]==="Root serial-v2 record: entry_prefix","I4 sticky reason "+name);
 need(beforeAccepted.includes("both-old-assertions-forged-together")&&beforeAccepted.includes("both-old-assertions-numeric-string"),"old_I5_regression_demonstrated");
 return{fixtureOnly:true,positivePassed:accepted.length,positiveNames:accepted,negativeRejected:rejected.length+legacy.negativeRejected,focusedNegativeNames:rejected,focusedRejectionReasons,legacyNegativeRejected:legacy.negativeRejected,previouslyAcceptedRegressions:beforeAccepted,SourceExecuted:false,actualQualification:false,I3Closed:false,C2Released:false,NativeReleased:false,nonclaims:flags};
};
