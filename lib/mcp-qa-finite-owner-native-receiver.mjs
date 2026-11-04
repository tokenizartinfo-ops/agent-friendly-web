import {createFiniteOwnerForwardedRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
import {finiteNativeTarget,finiteNativeActor,finiteNativeMetadata,finiteNativeUuid,finiteNativeFailure as fail,finiteNativePending as pending,finiteNativeOperation,finiteNativeBytes} from './mcp-qa-finite-owner-native-wire.mjs';
/** UNMOUNTED, pending only. Metadata is DATA, never current M/JWT approval.
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
   const envelope=finiteNativeMetadata(request.headers);
   // Establish the receiving LOCAL root before all body/storage/source I/O.
   parent=createFiniteOwnerForwardedRequestLease(request,envelope.boundary);
   const check=()=>{
    parent.lease.assertCurrent();
    if([get,transaction,toString,idFromName,namespaceGet,prepare,withSession].some(value=>typeof value!=='function')||!finiteNativeUuid(version)||db===env.DB||
     ctx.storage!==storage||storage.get!==get||storage.transaction!==transaction||ctx.id!==actor||actor.toString!==toString||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||self.get!==namespaceGet||
     Reflect.apply(toString,actor,[])!==Reflect.apply(idFromName,self,[finiteNativeActor]).toString()||env.RELEASE_DB!==db||db.prepare!==prepare||db.withSession!==withSession||env.AFW_QA_VERSION!==metadata||metadata.id!==version)fail();
   };
   check();
   return await observeFiniteOwnerRequestWork({ctx,env,originalLease:parent.lease},()=>finiteNativeOperation(parent.lease,ctx,async first=>{
    const bytes=await finiteNativeBytes(request,check,first);check();
    if(envelope.method==='GET'&&bytes.length)fail(400);
    return pending();
   }));
  }catch(error){return pending([400,401,403,404,405,413,429].includes(error?.status)?error.status:503);}
  finally{parent?.finish();}
 }});
}
