// Task1 fix2 R2 only: independent Root OWN synthetic terminal-neighbor controls.
export default function(own,approved,ctx,previous){
 const need=(v,m)=>{if(!v)throw Error("OWN fix2 R2: "+m);},clone=x=>JSON.parse(JSON.stringify(x));
 need(own&&["record","recordBefore","api","conjunction","preflight","factory","legacyNegatives","priorControls"].every(k=>typeof own[k]==="function"),"OWN_interfaces");
 const prior=own.priorControls(own.record,own.api,own.conjunction,own.preflight,own.factory,own.legacyNegatives,approved,ctx,previous);
 need(prior.fixtureOnly===true&&prior.positivePassed===21&&prior.negativeRejected===108&&prior.SourceExecuted===false&&prior.actualQualification===false,"prior21_108");
 const positives=[],negatives=[],oldAccepted=[],oldRejected=[],neighbors=[],rejectionReasons={};
 const read=(fn,r)=>fn(JSON.stringify(r),ctx,approved);
 const accept=(name,r,expectedRow)=>{
  const entered=r.groups.reduce((n,g)=>n+g.entered,0),g=entered?r.groups[Math.floor((entered-1)/104)]:null,i=(entered-1)%104;
  if(expectedRow)need(g&&g.outcome[i]===expectedRow.outcome&&g.cleanup[i]===expectedRow.cleanup,"fixture_last_row "+name);
  const a=read(own.record,r),b=read(own.recordBefore,r);
  need(a.accepted===true&&a.recordQualified===false&&b.accepted===true&&b.recordQualified===false,"legal "+name);
  positives.push(name);
 };
 const rejectNeighbor=(name,base,kind,reason,oldPass)=>{
  const r=clone(base);r.terminal.kind=kind;
  const back=clone(r);back.terminal.kind=base.terminal.kind;
  need(JSON.stringify(back)===JSON.stringify(base)&&r.terminal.kind!==base.terminal.kind,"single_field "+name);
  let err=null;try{read(own.record,r);}catch(e){err=e.message;}
  need(err==="Root serial-v2 record: "+reason,"targeted_rejection "+name+" observed="+err);rejectionReasons[name]=err;negatives.push(name);
  let old=false,oldReason=null;try{old=read(own.recordBefore,r).accepted===true;}catch(e){oldReason=e.message;}
  need(old===oldPass,"old_43187_behavior "+name);
  (old?oldAccepted:oldRejected).push(name);
  neighbors.push({name,changedField:"terminal.kind",before:base.terminal.kind,after:kind,entered:base.terminal.next,lastAdmissionMs:base.lastAdmissionMs,terminalMs:base.terminalMs,allOtherFieldsByteIdentical:true,oldAccepted:old,oldReason,newReason:err});
  return r;
 };
 const timing={exception:{entries:1,terminalMs:1},inner:{entries:1,terminalMs:220001},outer:{entries:104,terminalMs:220001},late:{entries:1,terminalMs:240001},complete:{entries:520,terminalMs:240000},custody:{entries:1,terminalMs:220001}};
 const malformed={};
 for(const row of [
  {id:"U_U",unknown:true,cleanupUnknown:true,kind:"custody",targets:["exception","inner","outer","late","complete"]},
  {id:"P_U",unknown:false,cleanupUnknown:true,kind:"custody",targets:["exception","inner","outer","late","complete"]},
  {id:"U_C",unknown:true,cleanupUnknown:false,kind:"exception",targets:["inner","outer","late","complete","custody"]}
 ]){
  for(const kind of row.targets){
   const t=timing[kind],base=own.factory(approved,ctx,{full:false,entries:t.entries,kind:row.kind,unknown:row.unknown,cleanupUnknown:row.cleanupUnknown,lastAdmissionMs:0,terminalMs:t.terminalMs});
   const name=row.id+"_"+row.kind+"_to_"+kind;
   accept("legal-original-"+name,base,{outcome:row.unknown?"U":"P",cleanup:row.cleanupUnknown?"U":"C"});
   const reason=row.cleanupUnknown?"terminal_cleanup_requires_custody":kind==="custody"?"terminal_custody":"terminal_return_unknown_reason";
   const oldPass=row.id==="U_U"?kind!=="complete":row.id==="P_U"?["inner","outer","late"].includes(kind):["inner","outer","late"].includes(kind);
   malformed[name]=rejectNeighbor(name,base,kind,reason,oldPass);
  }
 }
 const preserves=[
 ["abrupt-final-U_C",{full:false,entries:1,kind:"abrupt",unknown:true}],
 ["abrupt-final-U_U",{full:false,entries:1,kind:"abrupt",unknown:true,cleanupUnknown:true}],
 ["abrupt-final-P_U",{full:false,entries:1,kind:"abrupt",cleanupUnknown:true}],
 ["abrupt-open-X",{full:false,entries:1,kind:"abrupt",lost:true}],
 ["known-F-partial",{full:false,entries:110,kind:"inner"}],
 ["known-F-cleanup-U-custody",{full:false,entries:110,kind:"custody",cleanupUnknown:true}]
 ];
 for(const[name,settings]of preserves)accept(name,own.factory(approved,ctx,settings),{outcome:name.startsWith("known-F")?"F":settings.lost?"X":settings.unknown?"U":"P",cleanup:settings.lost||settings.cleanupUnknown?"U":"C"});
 function cleanupF(r){
  const last=r.groups.reduce((n,g)=>n+g.entered,0)-1,gi=Math.floor(last/104),i=last%104,g=r.groups[gi];
  g.cleanup=g.cleanup.slice(0,i)+"F"+g.cleanup.slice(i+1);
  r.v1.cleanup.failedInstances=[g.id+":"+approved.matrix.ordered[i].id];
  return r;
 }
 accept("known-P-cleanup-F-partial",cleanupF(own.factory(approved,ctx,{full:false,entries:1,kind:"inner"})),{outcome:"P",cleanup:"F"});
 accept("known-F-cleanup-F-partial",cleanupF(own.factory(approved,ctx,{full:false,entries:110,kind:"inner"})));
 const uf=cleanupF(own.factory(approved,ctx,{full:false,entries:1,kind:"exception",unknown:true,terminalMs:220001,lastAdmissionMs:0}));
 accept("returned-U-cleanup-F-exception",uf,{outcome:"U",cleanup:"F"});
 rejectNeighbor("U_F_exception_to_custody",uf,"custody","terminal_custody",false);
 need(oldAccepted.includes("U_U_custody_to_exception")&&oldAccepted.includes("U_C_exception_to_inner"),"reviewed_old_acceptances");
 // These optional OWN-only mutation functions are constructed by removing exactly one new guard, never product Source.
 const predicateRemovalDetected={};
 if(own.withoutCleanupReason||own.withoutReturnedReason){
  need(typeof own.withoutCleanupReason==="function"&&typeof own.withoutReturnedReason==="function","OWN_mutation_interfaces");
  need(read(own.withoutCleanupReason,malformed.U_U_custody_to_exception).accepted===true,"cleanup_predicate_removal_not_measured");
  need(read(own.withoutReturnedReason,malformed.U_C_exception_to_inner).accepted===true,"returned_predicate_removal_not_measured");
  predicateRemovalDetected.cleanupURequiresCustody=true;predicateRemovalDetected.returnedUReasonRestricted=true;
 }
 return{purpose:"afw.root-own.fix2.R2.synthetic-controls.v1",fixtureOnly:true,prior:{positivePassed:prior.positivePassed,negativeRejected:prior.negativeRejected,previouslyAcceptedRegressions:prior.previouslyAcceptedRegressions.length,unchangedSuite:true},supplementalPositivePassed:positives.length,supplementalPositiveNames:positives,supplementalNegativeRejected:negatives.length,supplementalNegativeNames:negatives,positivePassed:prior.positivePassed+positives.length,negativeRejected:prior.negativeRejected+negatives.length,previous43187AcceptedRegressions:oldAccepted,previous43187RejectedNeighbors:oldRejected,neighbors,rejectionReasons,predicateRemovalDetected,SourceExecuted:false,actualQualification:false,I3Closed:false,C2Released:false,NativeReleased:false,nonclaims:clone(prior.nonclaims)};
};
