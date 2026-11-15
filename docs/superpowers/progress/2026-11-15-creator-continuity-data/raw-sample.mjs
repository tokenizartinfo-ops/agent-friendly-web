export default function(raw,ctx){
 if(typeof raw!=='string'||raw.length>4096||!raw.endsWith('\n')||raw.endsWith('\n\n')||!(/^[\x20-\x7e]*\n$/.test(raw)))throw Error('Root R3 file framing');
 const parsed=JSON.parse(raw);if(raw!==JSON.stringify(parsed)+'\n')throw Error('Root R3 file canonical');
 return (function(wire,ctx){
 const need=(v,m)=>{if(!v)throw Error("r3sample:"+m);},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const keys=(v,ks)=>need(v&&typeof v==="object"&&!Array.isArray(v)&&eq(Object.keys(v).sort(),ks.slice().sort()),"keys");
 const one=(v,vs)=>vs.some(x=>Object.is(x,v)),u="unknown",count=(v,max,min=0)=>v===u||Number.isSafeInteger(v)&&v>=min&&v<=max;
 need(typeof wire==="string"&&wire.length<=4096&&/^[\x20-\x7E\n]*$/.test(wire),"wire");
 const r=JSON.parse(wire);need(wire===JSON.stringify(r)||wire===JSON.stringify(r)+"\n","canonical");
 keys(r,["purpose","source","run","attempt","case","sampleState","sample","nonclaims"]);
 need(r.purpose==="afw.r3-existing-sample.syn.v1"&&r.case==="R3"&&ctx.attempt===1&&r.attempt===1&&r.source===ctx.source&&r.run===String(ctx.run)&&/^[a-f0-9]{40}$/.test(r.source)&&/^[1-9][0-9]{0,19}$/.test(r.run),"context");
 need(ctx.sourceQualified===true,"sourceproof");need(one(r.sampleState,["observed","not_observed"]),"state");
 const fs=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];keys(r.nonclaims,fs);fs.forEach(k=>need(r.nonclaims[k]===false,k));
 const s=r.sample,bs=["observerInvalid","queueObserverInvalid","sdkObserverInvalid","childAbortSeen","parentAliveAtAbort","workPendingAtAbort","sameWorkWaitError"],ks=["inputSeeded","seedEntries","lists","gets","nativeInvoked","nativeSettled","nativeRejected","nativeUnsettled","outwardPending","heldNativeSettled",...bs,"selectedChildCount","selectedChildOrdinal","selectedChildFamily","childWorkStatus","childWaitStatus","queueCount","lastQueueFamily","lastQueueChild","lastQueueActive","lastQueueQueued","lastQueueMethod","heldOperationCount","phase"];keys(s,ks);
 need(one(s.inputSeeded,[true,false,u]),"seed");need(count(s.seedEntries,201),"entries");bs.forEach(k=>need(one(s[k],[true,false,u]),k));
 for(const[k,max,min]of[["lists",2,0],["gets",200,0],["nativeInvoked",202,0],["nativeSettled",202,0],["nativeRejected",202,0],["nativeUnsettled",2,0],["outwardPending",2,0],["heldNativeSettled",2,0],["selectedChildOrdinal",65535,1],["queueCount",512,0],["lastQueueChild",65535,1],["lastQueueQueued",200,0]])need(count(s[k],max,min),k);
 need(one(s.selectedChildCount,[0,1,"multiple",u]),"children");need(one(s.selectedChildFamily,[1,2,u]),"family");for(const k of ["childWorkStatus","childWaitStatus"])need(one(s[k],["unregistered","pending","fulfilled","rejected",u]),k);
 for(const k of ["lastQueueFamily","lastQueueActive"])need(one(s[k],[1,2,u]),k);need(one(s.lastQueueMethod,["get","list","delete",u]),"method");need(one(s.heldOperationCount,[0,1,2,"multiple",u]),"held");
 keys(s.phase,["completeWrites","completeNormal","lookupStage","authorizePostFinally"]);for(const k of["completeWrites","completeNormal"])need(one(s.phase[k],[0,1,"multiple",u]),k);need(one(s.phase.lookupStage,["not_seen","entered","exited",u]),"lookup");need(one(s.phase.authorizePostFinally,["not_seen","one","multiple",u]),"postfinally");
 if(s.selectedChildCount!==1)for(const k of ["selectedChildOrdinal","selectedChildFamily","childWorkStatus","childWaitStatus","childAbortSeen","parentAliveAtAbort","workPendingAtAbort","sameWorkWaitError"])need(s[k]===u,"childassociation");
 if(s.queueCount===0||s.queueCount===u)for(const k of ["lastQueueFamily","lastQueueChild","lastQueueActive","lastQueueQueued","lastQueueMethod"])need(s[k]===u,"queueassociation");
 if(s.inputSeeded!==true)need(s.seedEntries===u,"seedassociation");
 if(s.inputSeeded===true)need(Number.isSafeInteger(s.seedEntries)&&s.seedEntries>=0&&s.seedEntries<=201,"seedmarker");
 if(r.sampleState==="not_observed"){for(const k of ks.filter(x=>x!=="phase"))need(s[k]===u,"absence");for(const v of Object.values(s.phase))need(v===u,"phaseabsence");}
 return {record:r,sourceQualified:true,sampleObserved:r.sampleState==="observed",historicalCauseProven:false,operationalReadiness:false,PCoff:false};
})(raw,ctx);
};
