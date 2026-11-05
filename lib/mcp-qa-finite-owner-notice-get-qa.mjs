import {finiteNativePending as pending} from './mcp-qa-finite-owner-native-wire.mjs';
import {createFiniteOwnerForwardedRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
import {finiteOwnerNoticeGetTarget,readFiniteOwnerNoticeGetMetadata} from './mcp-qa-finite-owner-notice-get-wire.mjs';
import {handlePrivateQaFiniteOwnerNoticeGet} from './mcp-qa-finite-owner-phase-context.mjs';
export function createPrivateQaFiniteOwnerNoticeGetReceiver({ctx,env}){
 return Object.freeze({async fetch(request){
  let parent;
  try{
   if(!(request instanceof Request)||request.url!==finiteOwnerNoticeGetTarget)return pending(404);
   if(request.method!=='POST')return pending(405);
   const metadata=readFiniteOwnerNoticeGetMetadata(request.headers);
   parent=createFiniteOwnerForwardedRequestLease(request,metadata.boundary);
   return await handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},parent.lease);
  }catch{return pending();}finally{parent?.finish();}
 }});
}
