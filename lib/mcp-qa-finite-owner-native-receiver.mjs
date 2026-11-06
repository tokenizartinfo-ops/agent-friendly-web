import {createFiniteOwnerForwardedRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
import {finiteNativeTarget,finiteNativeActor,finiteNativeMetadata,finiteNativeUuid,finiteNativeFailure as fail,finiteNativePending as pending,finiteNativeOperation,finiteNativeBytes,finiteNativeOriginalUrl,qualifyFiniteOwnerChoiceRequest} from './mcp-qa-finite-owner-native-wire.mjs';
import {readFiniteOwnerNoticeConsentBody as readChoicePostBody} from './mcp-qa-finite-owner-notice-consent-body.mjs';
/** SOURCE mounted, pending only. Metadata is DATA, never current M/JWT approval.
 * The later business verifier/producer is deliberately absent. */
export function createFiniteOwnerNativeReceiver({ctx,env}){
 const storage=ctx?.storage,get=storage?.get,transaction=storage?.transaction,actor=ctx?.id,toString=actor?.toString;
 const self=env?.AFW_INDEPENDENT_CLOSURE,idFromName=self?.idFromName,namespaceGet=self?.get;
 const db=env?.RELEASE_DB,prepare=db?.prepare,withSession=db?.withSession,metadata=env?.AFW_QA_VERSION,version=metadata?.id;
 return Object.freeze({async fetch(request){
  let parent;
  try{
   if(!(request instanceof Request)||request.url!==finiteNativeTarget)fail(404);
   if(request.method!=='POST')fail(405);
   const originalHeaders=request.headers,headerBytes=JSON.stringify([...originalHeaders]),originalSignal=request.signal;
   const envelope=finiteNativeMetadata(originalHeaders);
   // Establish the receiving LOCAL root before all body/storage/source I/O.
   parent=createFiniteOwnerForwardedRequestLease(request,envelope.boundary);
   let failed=false;const check=()=>{
    if(failed)fail();parent.lease.assertCurrent();
    if(request.url!==finiteNativeTarget||request.method!=='POST'||request.headers!==originalHeaders||JSON.stringify([...originalHeaders])!==headerBytes||request.signal!==originalSignal||[get,transaction,toString,idFromName,namespaceGet,prepare,withSession].some(value=>typeof value!=='function')||!finiteNativeUuid(version)||db===env.DB||
     ctx.storage!==storage||storage.get!==get||storage.transaction!==transaction||ctx.id!==actor||actor.toString!==toString||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||self.get!==namespaceGet||
     Reflect.apply(toString,actor,[])!==Reflect.apply(idFromName,self,[finiteNativeActor]).toString()||env.RELEASE_DB!==db||db.prepare!==prepare||db.withSession!==withSession||env.AFW_QA_VERSION!==metadata||metadata.id!==version)fail();
   };
   check();
   return await observeFiniteOwnerRequestWork({ctx,env,originalLease:parent.lease},()=>finiteNativeOperation(parent.lease,ctx,async signalFailure=>{
    const first=error=>{failed=true;signalFailure(error);};
    const bytes=await (envelope.method==='POST'?readChoicePostBody:finiteNativeBytes)(request,check,first);check();
    qualifyFiniteOwnerChoiceRequest(new Request(finiteNativeOriginalUrl,{method:envelope.method,headers:originalHeaders}),bytes);
    return pending();
   }));
  }catch(error){return pending([400,401,403,404,405,413,429].includes(error?.status)?error.status:503);}
  finally{parent?.finish();}
 }});
}
