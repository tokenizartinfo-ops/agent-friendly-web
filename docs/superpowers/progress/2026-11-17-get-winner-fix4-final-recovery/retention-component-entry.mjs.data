// Native workerd COMPONENT ONLY. Excluded from ordinary M, QA and full20.
import { createFiniteOwnerRequestLease } from './lib/mcp-qa-finite-owner-preparation.mjs';
import { observeFiniteOwnerRequestWork, readFiniteNativeRetentionForTest } from './lib/mcp-qa-finite-stage-work.mjs';
import { finiteNativeOperation, finiteNativeCancel, finiteNativeBytes, finiteNativeFailure } from './lib/mcp-qa-finite-owner-native-wire.mjs';
import { createGetWinnerObserver } from './component-get-observer.mjs';
import { componentBarriers,withOwnedComponentWork } from './component-work-boundaries.mjs';
const ids=['non_ok_first_before_cancel_completion','reader_failure_cancel_pending','abort_before_late_actual','timer_before_late_actual'];
const insist=value=>{if(!value)throw Error('AFW_RETENTION_COMPONENT_CHECK');};
function gate(){
 let resolve,releases=0;
 const promise=new Promise(done=>{resolve=done;});
 return {promise,get releases(){return releases;},release(){insist(releases===0);releases++;resolve();}};
}
async function exercise(id){
 const late=id==='abort_before_late_actual'||id==='timer_before_late_actual';
 const reader=id==='reader_failure_cancel_pending';
 const cancelGate=gate(),operationGate=late?gate():null,entered=gate(),cancelEntered=gate();
 const barriers=componentBarriers(entered,cancelEntered);
 const events=[],snapshots=[],state={actual:'pending',wait:'pending'};
 const emit=value=>{insist(events.length<32);events.push(value);};
 const aborter=new AbortController(),request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{signal:aborter.signal});
 const parent=createFiniteOwnerRequestLease(request),lease=parent.lease,env={};
 let outer,actual,waitArgument,actualObserved,waitObserved,outerError,actualError,D=null,finishCalls=0;
 let waitCalls=0,qualified=false,foreignRejected=false,entryOuter=false,entryDistinct=false;
 const ctx={waitUntil(promise){waitCalls++;waitArgument=promise;}};
 function finish(){
  insist(finishCalls===0);finishCalls++;parent.finish();emit('PARENT_FINISH');
 }
 function held(label){
  const snapshot=readFiniteNativeRetentionForTest(ctx,lease);
  insist(snapshot.present&&snapshot.promises.length===1&&snapshot.promises[0]===actual);
  insist(state.actual==='pending'&&state.wait==='pending');
  snapshots.push(label);
 }
 return withOwnedComponentWork(async()=>{
 if(__AFW_GET_COMPONENT_ON__){
  globalThis.__afwGetWinner=createGetWinnerObserver();
  globalThis.__afwGetWinner.enter(request);globalThis.__afwGetWinner.bind(request,lease);
 }
  outer=observeFiniteOwnerRequestWork({ctx,env,originalLease:lease},()=>finiteNativeOperation(lease,ctx,async first=>{
   const snapshot=readFiniteNativeRetentionForTest(ctx,lease);
   entryOuter=snapshot.present&&snapshot.promises.length===2&&snapshot.promises.includes(outer);
   insist(entryOuter);
   actual=snapshot.promises.find(p=>p!==outer);
   entryDistinct=actual instanceof Promise&&actual!==outer&&waitArgument instanceof Promise&&waitArgument!==actual&&waitArgument!==outer&&waitCalls===1;
   insist(entryDistinct);qualified=true;
   try{readFiniteNativeRetentionForTest(ctx,{});}catch{foreignRejected=true;}
   insist(foreignRejected);snapshots.push('ENTRY_TWO');emit('ENTRY');
   actualObserved=actual.then(()=>{state.actual='fulfilled';emit('ACTUAL_FULFILL');},
    error=>{actualError=error;state.actual='rejected';emit('ACTUAL_REJECT');});
   waitObserved=waitArgument.then(()=>{state.wait='fulfilled';emit('WAITUNTIL_FULFILL');},
    ()=>{state.wait='rejected';emit('WAITUNTIL_REJECT');});
   entered.release();
   if(late)await operationGate.promise;
   const stream=new ReadableStream({
    start(controller){if(reader)controller.enqueue(new Uint8Array(16385));},
    cancel(){emit('CANCEL_ENTER');cancelEntered.release();return cancelGate.promise;}
   });
   const response=new Response(stream,{status:reader?200:413});
   if(reader)return finiteNativeBytes(response,()=>lease.assertCurrent(),first,503);
   try{finiteNativeFailure(413);}catch(error){D=error;}
   return finiteNativeCancel(response,D,first);
  }));
  await barriers.entry(outer);
  if(id==='abort_before_late_actual'){emit('REQUEST_ABORT');aborter.abort();}
  let outerRejected=false;
  try{await outer;}catch(error){outerRejected=true;outerError=error;emit('OUTER_REJECT');}
  insist(outerRejected);held('OUTER_ONLY_ACTUAL');
  if(!late)insist(cancelEntered.releases===1);
  else insist(cancelEntered.releases===0);
  finish();insist(lease.signal.aborted);held('FINISHED_ONLY_ACTUAL');
  if(late){emit('OPERATION_RELEASE');operationGate.release();await barriers.cancel(actual);}
  insist(cancelEntered.releases===1&&cancelGate.releases===0&&state.actual==='pending'&&state.wait==='pending');
  emit('CANCEL_RELEASE');cancelGate.release();
  await actualObserved;await waitObserved;
  insist(state.actual==='rejected'&&state.wait==='fulfilled');
  insist(late?outerError!==actualError:outerError===actualError);
  if(!reader)insist(actualError===D&&(late?outerError!==D:outerError===D));
  const drained=readFiniteNativeRetentionForTest(ctx,lease);
  insist(qualified&&!drained.present&&drained.promises.length===0);
  snapshots.push('QUALIFIED_ABSENT');emit('QUALIFIED_DRAIN');
  insist(snapshots.length===4&&events.length<=32);
  const checks={entryMembers:2,heldMembers:1,entryOuter,uniqueActual:entryDistinct,actualDistinctFromOuter:actual!==outer,
   waitUntilCalls:waitCalls,waitUntilDistinctFromActual:waitArgument!==actual,waitUntilDistinctFromOuter:waitArgument!==outer,
   heldActualUnsettled:true,heldWaitUntilUnsettled:true,parentFinishedOnce:finishCalls===1,parentAborted:lease.signal.aborted,
   afterFinishActualRetained:true,cancelReleasedOnce:cancelGate.releases===1,actualRejects:state.actual==='rejected',
   waitUntilFulfills:state.wait==='fulfilled',qualifiedFinalAbsent:qualified&&!drained.present,maxEvents:32,maxSnapshots:4,
   scope:'native component + TOOL waitUntil spy; platform lifecycle unproved',
   outerEqualsActualError:outerError===actualError,outerEqualsD:reader?'not-applicable':outerError===D,
   actualEqualsD:reader?'not-applicable':actualError===D,cancelBeforeOuter:events.indexOf('CANCEL_ENTER')<events.indexOf('OUTER_REJECT'),
   operationGate:late,...(late?{operationReleasedOnce:operationGate.releases===1,externalAbort:id==='abort_before_late_actual'}:{}),
   mismatchedPresentLineageRejected:foreignRejected};
  return {id,events,snapshots,checks};
 },[
  ()=>{if(cancelGate.releases===0)cancelGate.release();},
  ()=>{if(operationGate&&operationGate.releases===0)operationGate.release();},
  ()=>{if(finishCalls===0)finish();}
 ],()=>[outer,actual,waitArgument,actualObserved,waitObserved]);
}
export default {async fetch(request){
 const url=new URL(request.url),id=url.pathname.slice(1);
 if(request.method!=='GET'||url.search||url.hash||!ids.includes(id))return new Response(null,{status:404});
 return Response.json(await exercise(id));
}};
