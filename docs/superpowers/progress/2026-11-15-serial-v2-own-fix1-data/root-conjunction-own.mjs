// Independent Root conjunction. approvedSAME comes from verified Root candidate gate.
export default function(data,apiJoin,pref,others,mapping,closure,approvedSAME){
 const need=(v,m)=>{if(!v)throw Error("Root serial-v2 conjunction: "+m);},keys=(x,k)=>x!==null&&typeof x==="object"&&!Array.isArray(x)&&JSON.stringify(Object.keys(x))===JSON.stringify(k);
 need(typeof approvedSAME==="string"&&/^[a-f0-9]{40}$/.test(approvedSAME),"approved_SAME_pin");
 need(data?.accepted===true&&data.recordQualified===true&&data.record?.qualified===true,"full_record");
 need(apiJoin?.apiJoined===true&&pref?.accepted===true&&pref.fixtureOnly===true&&others?.boundary?.boundaryControlsPassed===true&&others?.unit?.unitControlsPassed===true&&others.boundary.contextObserved===true&&others.unit.contextObserved===true,"all_preflights_and_API");
 const records=[data.record,pref.record,others.boundary.record,others.unit.record];
 for(const r of records)need(r&&r.source===apiJoin.source&&r.sourceTree===apiJoin.tree&&r.run===String(apiJoin.run)&&r.attempt===1&&r.job==="readonly"&&r.node==="22.23.4","cross_record_context");
 const roles=["preflight","boundary","unit","full"],names=["Check serial v2 isolation and trace controls","Check serial loader boundary controls","Check serial entry pin reuse","Run declared full104 controls only"],markers=["AFW_Q1_SERIAL_LAB_PREFLIGHT/2","AFW_SERIAL_LOADER_BOUNDARY_UNIT/1","AFW_SERIAL_ENTRY_PIN_UNIT/1","AFW_Q1_SERIAL_LAB/2"];
 need(Number.isSafeInteger(apiJoin.run)&&apiJoin.run>0&&Number.isSafeInteger(apiJoin.jobId)&&apiJoin.jobId>0&&keys(apiJoin.requiredStepMap,names),"authenticated_API_step_map");
 const apiSteps=names.map(n=>apiJoin.requiredStepMap[n]);
 need(apiSteps.every((n,i)=>Number.isSafeInteger(n)&&n>0&&(i===0||apiSteps[i-1]<n))&&apiJoin.step===apiSteps[3],"API_step_order");
 // Root constructs this closed map only from its authenticated job-log fetch and actual Run-header order.
 // The fetched job origin is trusted separately from Source stdout; numbers are not supplied by a public record.
 need(keys(mapping,["logOrigin","frames"])&&keys(mapping.logOrigin,["runId","jobId"])&&keys(mapping.frames,roles),"log_mapping_shape");
 need(Number.isSafeInteger(mapping.logOrigin.runId)&&Number.isSafeInteger(mapping.logOrigin.jobId)&&mapping.logOrigin.runId===apiJoin.run&&mapping.logOrigin.jobId===apiJoin.jobId,"job_log_origin");
 for(let i=0;i<roles.length;i++){
  const f=mapping.frames[roles[i]];
  need(keys(f,["marker","count","stepName","stepNumber","runId","jobId","mappedByRunHeader"]),"frame_shape");
  need(f.marker===markers[i]&&f.count===1&&f.stepName===names[i]&&Number.isSafeInteger(f.stepNumber)&&f.stepNumber===apiSteps[i]&&Number.isSafeInteger(f.runId)&&f.runId===apiJoin.run&&Number.isSafeInteger(f.jobId)&&f.jobId===apiJoin.jobId&&f.mappedByRunHeader===true,"frame_API_origin_"+roles[i]);
 }
 const stop=reason=>({evidenceEligible:false,labRecordQualified:true,reason,C2Released:false,NativeReleased:false,operationalReadiness:false,I3Closed:false});
 if(closure===null)return stop("Source_closure_pending");
 need(closure?.activeSource===apiJoin.source&&closure.closedParent===apiJoin.source&&/^[a-f0-9]{40}$/.test(closure.closedSource)&&closure.closedSource!==apiJoin.source&&/^[a-f0-9]{40}$/.test(closure.closedTree),"closure_commit");
 need(closure.F7==="f7a71f1a0fa4f5ddf069ff411f008a098455e5cc"&&closure.proposedSAME===approvedSAME&&closure.wholeSAMEPreserved===true&&/^[a-f0-9]{40}$/.test(closure.wholeSAME),"closure_bytes");
 need(closure.coreSha256==="aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703"&&closure.main==="0c9c475b3ebaa970fc11d628b40e50a90cceb727"&&closure.activeQueueCount===0&&closure.closedHeadRunCount===0&&closure.SourcePendingNull===true&&closure.fullReadback===true,"closure_readback");
 return {evidenceEligible:true,labRecordQualified:true,reason:"versioned_lab_evidence_ready_for_review",Source:apiJoin.source,run:apiJoin.run,jobId:apiJoin.jobId,closedSource:closure.closedSource,I3Closed:false,C2Released:false,NativeReleased:false,operationalReadiness:false};
};
