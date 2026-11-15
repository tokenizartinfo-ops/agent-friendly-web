// Independent Root conjunction; evidence eligible for review does not close I3 or release Native.
export default function(data,apiJoin,pref,others,mapping,closure){
 const need=(v,m)=>{if(!v)throw Error("Root serial-v2 conjunction: "+m);};
 need(data?.accepted===true&&data.recordQualified===true&&data.record?.qualified===true,"full_record");
 need(apiJoin?.apiJoined===true&&pref?.accepted===true&&pref.fixtureOnly===true&&others?.boundary?.boundaryControlsPassed===true&&others?.unit?.unitControlsPassed===true&&others.boundary.contextObserved===true&&others.unit.contextObserved===true,"all_preflights_and_API");
 const records=[data.record,pref.record,others.boundary.record,others.unit.record];
 for(const r of records)need(r&&r.source===apiJoin.source&&r.sourceTree===apiJoin.tree&&r.run===String(apiJoin.run)&&r.attempt===1&&r.job==="readonly"&&r.node==="22.23.4","cross_record_context");
 need(mapping?.preflightCount===1&&mapping.preflightMarker==="AFW_Q1_SERIAL_LAB_PREFLIGHT/2"&&mapping.preflightStepName==="Check serial v2 isolation and trace controls"&&mapping.preflightStepNumber===mapping.preflightAPIStepNumber&&mapping.preflightStepNumber<apiJoin.step&&mapping.mappedByRunHeader===true,"preflight_frame_mapping");
 const stop=reason=>({evidenceEligible:false,labRecordQualified:true,reason,NativeReleased:false,operationalReadiness:false,I3Closed:false});
 if(closure===null)return stop("Source_closure_pending");
 need(closure?.activeSource===apiJoin.source&&closure.closedParent===apiJoin.source&&/^[a-f0-9]{40}$/.test(closure.closedSource)&&closure.closedSource!==apiJoin.source&&/^[a-f0-9]{40}$/.test(closure.closedTree),"closure_commit");
 need(closure.F7==="f7a71f1a0fa4f5ddf069ff411f008a098455e5cc"&&closure.proposedSAME==="62dc296a61ab5dd83c23ef848e3555c96599db26"&&closure.wholeSAMEPreserved===true&&/^[a-f0-9]{40}$/.test(closure.wholeSAME),"closure_bytes");
 need(closure.coreSha256==="aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703"&&closure.main==="0c9c475b3ebaa970fc11d628b40e50a90cceb727"&&closure.activeQueueCount===0&&closure.closedHeadRunCount===0&&closure.SourcePendingNull===true&&closure.fullReadback===true,"closure_readback");
 return {evidenceEligible:true,labRecordQualified:true,reason:"versioned_lab_evidence_ready_for_review",Source:apiJoin.source,run:apiJoin.run,jobId:apiJoin.jobId,closedSource:closure.closedSource,I3Closed:false,C2Released:false,NativeReleased:false,operationalReadiness:false};
};
