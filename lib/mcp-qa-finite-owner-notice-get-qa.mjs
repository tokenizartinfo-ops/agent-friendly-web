import {finiteNativePending as pending} from './mcp-qa-finite-owner-native-wire.mjs';
import {createFiniteOwnerForwardedRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
import {finiteOwnerNoticeGetTarget,readFiniteOwnerNoticeGetMetadata,finiteOwnerNoticeConsentTarget,readFiniteOwnerNoticeConsentMetadata} from './mcp-qa-finite-owner-notice-get-wire.mjs';
import {handlePrivateQaFiniteOwnerNoticeGet,handlePrivateQaFiniteOwnerNoticeConsent} from './mcp-qa-finite-owner-phase-context.mjs';
export function createPrivateQaFiniteOwnerNoticeGetReceiver(input){return receiver(input,false);}
export function createPrivateQaFiniteOwnerNoticeConsentReceiver(input){return receiver(input,true);}
function receiver({ctx,env},consent){
 return Object.freeze({async fetch(request){
  let parent;
  try{
   if(!(request instanceof Request)||request.url!==(consent?finiteOwnerNoticeConsentTarget:finiteOwnerNoticeGetTarget))return pending(404);
   if(request.method!=='POST')return pending(405);
   const metadata=(consent?readFiniteOwnerNoticeConsentMetadata:readFiniteOwnerNoticeGetMetadata)(request.headers);
   parent=createFiniteOwnerForwardedRequestLease(request,metadata.boundary);
   return await (consent?handlePrivateQaFiniteOwnerNoticeConsent:handlePrivateQaFiniteOwnerNoticeGet)({request,env,ctx},parent.lease);
  }catch{return pending();}finally{parent?.finish();}
 }});
}
