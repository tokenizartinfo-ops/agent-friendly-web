import {n3Read} from './reader.mjs';
import {n3TraceReplay,n3CausalReplay} from './trace-reader.mjs';
import {n3AbortFix1Controls,n3TraceLiteralControls,n3SealedDataControls} from './trace-controls.mjs';
function n3B2LiteralControls(data,read,hash,inflate){return data.cases.map(t=>{let accepted=false,result=null;try{result=read(t.input,t.trustedOverride===undefined?data.trustedModel:t.trustedOverride,hash,inflate);accepted=result.diagnosticCaptureAccepted===true;}catch{}return {id:'B2/'+t.id,pass:accepted===t.accepted,accepted};});}
function n3B2StateControls(data,read,hash,inflate){
 const t=data.cases.find(t=>t.id==='FULL_HONEST_TIMEOUT_POST_PREFIX'),first=read(t.input,data.trustedModel,hash,inflate),before=first.observation.causal.target;
 first.observation.causal.target='OWN_MUTATED_CALLER_VALUE';
 let second=null;try{second=read(t.input,data.trustedModel,hash,inflate);}catch{}
 const checks=[{id:'B2_STATE/MISSING_CAUSAL_SUMMARY_NO_CROSS_CALL_ALIAS',pass:before==='unknown'&&second!==null&&second.observation.causal.target==='unknown'&&first.observation.causal!==second.observation.causal}];
 first.observation.causal.target=before;return checks;
}


function n3B2SourceReducerControls(data,replay){return data.cases.map(t=>{let result=null;try{result=replay({sequence:128,elapsedMs:180000,kind:'causal',schema:'afw.c2-notices-n3.causal-record.v1',snapshot:t.expected});}catch{}return {id:t.id,pass:result!==null&&result.state==='joined'&&result.coverage==='prefix'&&result.reason==='PROJECTION_GAP'&&result.events===24,accepted:result!==null};});}
function n3B2AllControls(data,hash,inflate){
 const old=n3AbortFix1Controls(data.own,data.oldSealed,data.raw,data.transport,hash,data.ruling,data.rulingTransport,data.abort);
 const groups={...old.groups,axis:n3TraceLiteralControls(data.axis,n3TraceReplay),pairCardinality:n3TraceLiteralControls(data.pairCardinality,n3TraceReplay),pairCardinalityFull:n3B2LiteralControls(data.pairCardinalityFull,n3Read,hash,inflate),currentSource:n3SealedDataControls(data.currentSource,n3TraceReplay),sourceAxes:n3SealedDataControls(data.sourceAxes,n3TraceReplay),sourceReducer:n3B2SourceReducerControls(data.reducer,n3CausalReplay),fullInput:n3B2LiteralControls(data.full,n3Read,hash,inflate),fullSupplement:n3B2LiteralControls(data.supplement,n3Read,hash,inflate),fullState:n3B2StateControls(data.full,n3Read,hash,inflate),fullAxes:n3B2LiteralControls(data.fullAxes,n3Read,hash,inflate),fullBlocked:n3B2LiteralControls(data.blocked,n3Read,hash,inflate)};
 return {groups,checks:Object.entries(groups).flatMap(([group,rows])=>rows.map(c=>({...c,legacyId:c.id,id:group+'/'+c.id})))};
}

export {n3B2AllControls};
