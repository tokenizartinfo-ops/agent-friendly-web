import {readFiniteOwnerRequestContext,readFiniteOwnerRequestBoundary} from './mcp-qa-finite-owner-preparation.mjs';
import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
import {finiteNativeOriginalUrl,finiteNativeOrigin,finiteNativeTarget,finiteNativeActor,finiteNativePreservedHeaders,finiteNativeUuid,finiteNativeMetadata,finiteNativeFailure as fail,finiteNativePending as pending,finiteNativeOperation,finiteNativeBytes,finiteNativeCancel} from './mcp-qa-finite-owner-native-wire.mjs';
/** UNMOUNTED fixed transport. No QA holders or business authority in M. */
export async function forwardFiniteOwnerChoice({request,env,ctx},originalLease){
 try{
  if(!(request instanceof Request)||request.url!==finiteNativeOriginalUrl)fail(404);
  if(!['GET','POST'].includes(request.method))fail(405);
  if(request.method==='POST'&&request.headers.get('Origin')!==finiteNativeOrigin)fail(403);
  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
  const namespace=env?.AFW_FINITE_TRIAL_CONTROL,idFromName=namespace?.idFromName,get=namespace?.get,metadata=env?.AFW_FINITE_TRIAL_VERSION,version=metadata?.id;
  const db=env?.DB,prepare=db?.prepare,withSession=db?.withSession,kv=env?.OAUTH_KV,kvGet=kv?.get,kvPut=kv?.put,limiter=env?.DELEGATED_RATE_LIMITER,limit=limiter?.limit;
  if(!ctx||[idFromName,get,prepare,withSession,kvGet,kvPut,limit].some(value=>typeof value!=='function')||!finiteNativeUuid(version))fail();
  const id=Reflect.apply(idFromName,namespace,[finiteNativeActor]),actor=id.toString(),stub=Reflect.apply(get,namespace,[id]),fetcher=stub?.fetch;
  if(!/^[a-f0-9]{64}$/.test(actor)||typeof fetcher!=='function')fail();
  const check=()=>{
   originalLease.assertCurrent();
   if(env.AFW_FINITE_TRIAL_CONTROL!==namespace||namespace.idFromName!==idFromName||namespace.get!==get||Reflect.apply(idFromName,namespace,[finiteNativeActor]).toString()!==actor||stub.fetch!==fetcher||
    env.AFW_FINITE_TRIAL_VERSION!==metadata||metadata.id!==version||env.DB!==db||db.prepare!==prepare||db.withSession!==withSession||env.OAUTH_KV!==kv||kv.get!==kvGet||kv.put!==kvPut||env.DELEGATED_RATE_LIMITER!==limiter||limiter.limit!==limit)fail();
  };
  check();
  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async first=>{
   const body=await finiteNativeBytes(request,check,first);check();
   if(request.method==='GET'&&body.length)fail(400);
   // Start with an empty set: every caller private header and arbitrary header
   // is discarded. Only four future-verifier inputs cross this fixed boundary.
   const headers=new Headers();for(const name of finiteNativePreservedHeaders){const value=request.headers.get(name);if(value!==null)headers.set(name,value);}
   headers.set('x-afw-finite-boundary',JSON.stringify(readFiniteOwnerRequestBoundary(originalLease)));
   headers.set('x-afw-finite-original-method',request.method);headers.set('x-afw-finite-original-url',finiteNativeOriginalUrl);
   headers.set('x-afw-finite-version',version);headers.set('x-afw-finite-request-id',crypto.randomUUID());
   finiteNativeMetadata(headers);check();
   const forwarded=new Request(finiteNativeTarget,{method:'POST',headers,body:body.length?body:undefined,signal:originalLease.signal});
   const response=await Reflect.apply(fetcher,stub,[forwarded]);
   // Check HTTP first so cancellation/drift cannot replace an already known
   // response error. Never reflect an upstream body or headers to the caller.
   if(!response.ok){try{fail([400,401,403,404,405,413,429].includes(response.status)?response.status:503);}catch(error){return finiteNativeCancel(response,error,first);}}
   await finiteNativeBytes(response,check,first,503);check();
   return pending();
  }));
 }catch(error){return pending([400,401,403,404,405,413,429].includes(error?.status)?error.status:503);}
}
