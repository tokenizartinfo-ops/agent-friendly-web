import {createFiniteOwnerForwardedRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
import {finiteOwnerOAuthTarget,readFiniteOwnerOAuthMetadata,finiteNativePending as pending} from './mcp-qa-finite-owner-oauth-wire.mjs';
import {handlePrivateQaFiniteOwnerOAuth} from './mcp-qa-finite-owner-phase-context.mjs';
export function createPrivateQaFiniteOwnerOAuthReceiver({ctx,env}){
 return Object.freeze({async fetch(request){
  let parent;
  try{
   if(!(request instanceof Request)||request.url!==finiteOwnerOAuthTarget)return pending(404);
   if(request.method!=='POST')return pending(405);
   const metadata=readFiniteOwnerOAuthMetadata(request.headers);
   parent=createFiniteOwnerForwardedRequestLease(request,metadata.boundary);
   return await handlePrivateQaFiniteOwnerOAuth({request,env,ctx},parent.lease);
  }catch{return pending();}finally{parent?.finish();}
 }});
}
