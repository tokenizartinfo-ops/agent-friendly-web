import {readFiniteOwnerRequestContext,readFiniteOwnerRequestBoundary} from './mcp-qa-finite-owner-preparation.mjs';
import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
import {finiteNativeFailure as fail,finiteNativeUuid} from './mcp-qa-finite-owner-native-wire.mjs';
import {finiteOwnerOAuthTarget,qualifyFiniteOwnerOAuthRequest,readFiniteOwnerOAuthMetadata,finiteNativeActor,finiteNativePreservedHeaders,finiteNativeOperation,finiteNativeBytes,finiteNativePending as pending} from './mcp-qa-finite-owner-oauth-wire.mjs';
/** Unmounted forwarding only. Transport metadata never asserts SDK results. */
export async function forwardPrivateFiniteOwnerOAuth({request,env,ctx},originalLease){
 try{
  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
  const namespace=env?.AFW_FINITE_TRIAL_CONTROL,idFromName=namespace?.idFromName,get=namespace?.get,metadata=env?.AFW_FINITE_TRIAL_VERSION,version=metadata?.id;
  if([idFromName,get].some(v=>typeof v!=='function')||!finiteNativeUuid(version))fail();
  const id=Reflect.apply(idFromName,namespace,[finiteNativeActor]),actor=id.toString(),stub=Reflect.apply(get,namespace,[id]),fetcher=stub?.fetch;
  if(!/^[a-f0-9]{64}$/.test(actor)||typeof fetcher!=='function')fail();
  const check=()=>{originalLease.assertCurrent();if(env.AFW_FINITE_TRIAL_CONTROL!==namespace||namespace.idFromName!==idFromName||namespace.get!==get||Reflect.apply(idFromName,namespace,[finiteNativeActor]).toString()!==actor||stub.fetch!==fetcher||env.AFW_FINITE_TRIAL_VERSION!==metadata||metadata.id!==version)fail();};
  check();
  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async first=>{
   const bytes=await finiteNativeBytes(request,check,first);check();qualifyFiniteOwnerOAuthRequest(request,bytes);
   const headers=new Headers();for(const name of finiteNativePreservedHeaders){const value=request.headers.get(name);if(value!==null)headers.set(name,value);}
   headers.set('x-afw-finite-boundary',JSON.stringify(readFiniteOwnerRequestBoundary(originalLease)));
   headers.set('x-afw-finite-original-method',request.method);headers.set('x-afw-finite-original-url',request.url);
   headers.set('x-afw-finite-version',version);headers.set('x-afw-finite-request-id',crypto.randomUUID());
   readFiniteOwnerOAuthMetadata(headers);check();
   const response=await Reflect.apply(fetcher,stub,[new Request(finiteOwnerOAuthTarget,{method:'POST',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]);check();
   const body=await finiteNativeBytes(response,check,first,503);check();
   if(![200,302].includes(response.status))return pending([400,401,403,404,405,413,429].includes(response.status)?response.status:503);
   const output=new Headers({'Cache-Control':'no-store'});
   for(const [key,value]of response.headers){if(!['content-type','content-security-policy','referrer-policy','location','set-cookie','cache-control','x-frame-options'].includes(key)||value.length>8192)fail();output.append(key,value);}
   check();return new Response(body,{status:response.status,headers:output});
  }));
 }catch{return pending();}
}
