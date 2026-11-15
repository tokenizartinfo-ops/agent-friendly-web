// Independent Root record semantics; API/preflights/closure remain mandatory.
export default function(wire,ctx,approved){
 const need=(v,m)=>{if(!v)throw Error("Root serial-v2 record: "+m);},same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function check(value,s){
  if(s.anyOf){let hits=0;for(const variant of s.anyOf)try{check(value,variant);hits++;}catch{}need(hits===1,"schema_union");return;}
  if(s.enum){need(s.enum.some(x=>same(x,value)),"schema_enum");return;}
  if(s.type==="object"){need(value!==null&&typeof value==="object"&&!Array.isArray(value)&&s.additionalProperties===false&&same(Object.keys(value),s.required),"schema_keys");for(const key of s.required)check(value[key],s.properties[key]);return;}
  if(s.type==="array"){need(Array.isArray(value)&&value.length>=s.minItems&&value.length<=s.maxItems,"schema_array");for(const x of value)check(x,s.items);return;}
  if(s.type==="string"){need(typeof value==="string"&&new RegExp(s.pattern).test(value),"schema_string");return;}
  if(s.type==="integer"){need(Number.isSafeInteger(value)&&value>=s.minimum&&value<=s.maximum,"schema_integer");return;}
  throw Error("Root serial-v2 unsupported schema");
 }
 need(approved&&approved.policy&&approved.schema&&approved.matrix&&approved.driver&&approved.normalManifest,"approved_inputs");
 const policy=approved.policy,matrix=approved.matrix,ids=matrix.ordered.map(x=>x.id),groups=["baseline","M_RAW","M_PROVENANCE","M_OUTPUT","M_ASSOC"],killSets=[[],["D02"],["P06"],["B05","U01"],["S01"]];
 need(ids.length===104&&new Set(ids).size===104&&matrix.mutants.length===4&&same(matrix.mutants.map(x=>x.id),groups.slice(1))&&same(matrix.mutants.map(x=>x.expectedFailedIds),killSets.slice(1)),"matrix_authority");
 need(policy.purpose==="afw.q1.serial-source-lab.policy.v2"&&policy.scope==="top-laboratory-only"&&policy.unit==="ms"&&policy.horizon===240000&&policy.reserve===20000&&policy.parent===250000&&policy.outer===260000&&policy.step===300000&&policy.job===420000&&policy.instances===520&&policy.width===104&&same(policy.groups,groups),"policy_scope");
 need(same(policy.normal,{horizon:90000,reserve:20000,parent:100000,outer:110000,ceiling:120000,delivery:[3500,4000,5000],case:5000,cleanup:2000,probe:[4500,4800],alive:20}),"nested_policy");
 need(typeof wire==="string"&&/^[\x20-\x7e]+$/.test(wire)&&wire.length+"AFW_Q1_SERIAL_LAB/2 ".length+1<=24576,"wire_cap");
 const r=JSON.parse(wire);need(JSON.stringify(r)===wire,"canonical");check(r,approved.schema);
 for(const key of ["source","sourceTree","run","attempt","job","node"])need(r[key]===ctx[key],"context_"+key);
 need(same(r.scope,policy)&&r.policySha256===approved.policySha256&&r.matrixSha256===approved.matrixSha256&&same(r.normalManifest,approved.normalManifest)&&same(r.driver,approved.driver),"pinned_authority");
 need(same(r.groups.map(x=>x.id),groups),"group_order");
 let entered=0,returned=0,passed=0,failed=0,unknown=0,suffix=false,open=false,mustStop=false;
 const failedInstances=[],unknownInstances=[],reduced=[];
 for(let gi=0;gi<5;gi++){
  const g=r.groups[gi];let ge=0,gr=0,gp=0,gf=0,gu=0,gn=0;const failedIds=[];
  for(let i=0;i<104;i++){
   const E=g.entry[i],O=g.outcome[i],C=g.cleanup[i],instance=g.id+":"+ids[i];
   if(E==="0"){need(O==="N"&&C==="N","unentered_state");suffix=true;gn++;continue;}
   need(!suffix&&!open&&!mustStop&&E==="1"&&O!=="N"&&C!=="N","entry_prefix");ge++;entered++;
   if(O==="X"){need(C==="U","inflight_cleanup");open=true;}else{need(["P","F","U"].includes(O),"outcome");gr++;returned++;}
   if(O==="P"){gp++;passed++;}else if(O==="F"){gf++;failed++;failedIds.push(ids[i]);}else{gu++;unknown++;}
   if(C==="F")failedInstances.push(instance);if(C==="U")unknownInstances.push(instance);
   if(O==="U"||C==="U")mustStop=true;
  }
  need(g.entered===ge&&g.returned===gr&&g.passed===gp&&g.failed===gf&&g.unknown===gu&&g.unentered===gn,"group_counts");
  need(ge+gn===104&&gr+Number(g.outcome.includes("X"))===ge&&gp+gf+gu===ge,"group_arithmetic");
  reduced.push({entered:ge,returned:gr,passed:gp,failed:gf,unknown:gu,unentered:gn,failedIds});
 }
 const terminal=r.terminal;
 const finalOutcome=entered?r.groups[Math.floor((entered-1)/104)].outcome[(entered-1)%104]:null,finalCleanup=entered?r.groups[Math.floor((entered-1)/104)].cleanup[(entered-1)%104]:null;
 if(terminal.kind!=="abrupt"){
  need(finalCleanup!=="U"||terminal.kind==="custody","terminal_cleanup_requires_custody");
  need(finalOutcome!=="U"||terminal.kind==="exception"||terminal.kind==="custody","terminal_return_unknown_reason");
 }
 if(terminal.kind==="complete")need(terminal.next===520&&entered===520&&returned===520&&unknown===0&&unknownInstances.length===0&&!open&&r.terminalMs<=240000,"terminal_complete");
 else if(terminal.kind==="abrupt")need(terminal.next==="unknown"&&r.lastAdmissionMs==="unknown"&&r.terminalMs==="unknown","terminal_abrupt");
 else{
  need(terminal.next===entered&&!open,"terminal_prefix");
  if(terminal.kind==="inner")need(entered<520&&r.terminalMs>220000,"terminal_inner");
  if(terminal.kind==="outer")need([104,208,312,416].includes(entered)&&r.terminalMs>220000,"terminal_outer");
  if(terminal.kind==="late")need(r.terminalMs>240000,"terminal_late");
  if(terminal.kind==="exception")need(entered===0||finalOutcome==="U","terminal_exception");
  if(terminal.kind==="custody")need(entered>0&&finalCleanup==="U","terminal_custody");
 }
 if(terminal.kind!=="abrupt"){
  need(Number.isSafeInteger(r.terminalMs),"terminal_time");
  if(entered===0)need(r.lastAdmissionMs===null,"empty_last_admission");
  else need(Number.isSafeInteger(r.lastAdmissionMs)&&r.lastAdmissionMs<=r.terminalMs,"admission_time");
 }
 const baseline=reduced[0],cleanComplete=!open&&unknownInstances.length===0;
 const v1={purpose:"afw.r3-delivery.controls.v1",source:ctx.source,sourceTree:ctx.sourceTree,run:ctx.run,attempt:1,job:"readonly",node:"22.23.4",matrixSha256:approved.matrixSha256,
 allPassed:false,expected:104,passed:baseline.passed,failed:baseline.failed,unknown:104-baseline.passed-baseline.failed,
 results:ids.map((id,i)=>({id,result:r.groups[0].outcome[i]==="P"?"passed":r.groups[0].outcome[i]==="F"?"failed":"unknown"})),
 mutants:matrix.mutants.map((m,i)=>({id:m.id,expectedFailedIds:m.expectedFailedIds,actualFailedIds:reduced[i+1].failedIds,result:reduced[i+1].unknown+reduced[i+1].unentered>0?"unknown":same(reduced[i+1].failedIds,m.expectedFailedIds)?"passed":"failed"})),
 nativeBusinessCases:0,nonclaims:r.nonclaims,cleanup:{complete:cleanComplete,failedInstances,unknownInstances}};
 v1.allPassed=v1.passed===104&&v1.failed===0&&v1.unknown===0&&v1.mutants.every(x=>x.result==="passed")&&cleanComplete&&failedInstances.length===0&&unknownInstances.length===0;
 need(same(r.v1,v1),"subordinate_v1_reduction");
 const exact=entered===520&&returned===520&&passed===515&&failed===5&&unknown===0&&r.groups.every(g=>g.cleanup==="C".repeat(104))&&reduced.every((g,i)=>same(g.failedIds,killSets[i]));
 const recordQualified=exact&&terminal.kind==="complete"&&terminal.next===520&&Number.isSafeInteger(r.lastAdmissionMs)&&r.lastAdmissionMs<=220000&&Number.isSafeInteger(r.terminalMs)&&r.terminalMs<=240000&&v1.allPassed===true;
 need(r.qualified===recordQualified,"qualified_truth");
 return {accepted:true,recordQualified,record:r,counts:{entered,returned,passed,failed,unknown},reason:recordQualified?"record_complete_at_versioned_horizon":"record_not_qualified",NativeReleased:false,operationalReadiness:false};
};
