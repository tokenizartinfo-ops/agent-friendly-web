import {createFiniteOwnerRequestLease} from '../../lib/mcp-qa-finite-owner-preparation.mjs';
import {forwardFiniteOwnerChoice} from '../../lib/mcp-qa-finite-owner-native-bridge.mjs';
import {forwardPrivateFiniteOwnerOAuth} from '../../lib/mcp-qa-finite-owner-oauth-forward.mjs';
import {forwardPrivateFiniteOwnerNoticeGet,forwardPrivateFiniteOwnerNoticeConsent} from '../../lib/mcp-qa-finite-owner-notice-get-forward.mjs';
import {finiteNativeOrigin,finiteNativePending} from '../../lib/mcp-qa-finite-owner-native-wire.mjs';
import worker,{AfwNodeControl,AfwOwnEventNode as OwnEventNode} from './index.mjs';
const denyLegacyWithdrawal=()=>{throw Error('Finite legacy withdrawal unavailable');};
// Same actual SQLite constructor, namespace and inherited finite cleanup path.
// The finite profile enables only the separately qualified C0/C1 reduction.
// Legacy withdrawal RPCs must deny before touching any actual env/host state.
export class AfwOwnEventNode extends OwnEventNode{
 withdrawPermissions(){return denyLegacyWithdrawal();}
 withdrawPermissionsForPlan(){return denyLegacyWithdrawal();}
}
export {AfwNodeControl};
const finiteEntrypoint=globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__==='finite_trial_event';
export default {...worker,async fetch(request,env,ctx){
 const url=new URL(request.url),path=url.pathname;
 let decoded;try{decoded=decodeURIComponent(path);}catch{decoded=path;}
 const reserved=value=>['/connections','/authorize','/monitoring'].some(prefix=>value===prefix||value.startsWith(prefix+'/'));
 if(!reserved(path)&&!reserved(decoded))return worker.fetch(request,env,ctx);
 const parent=createFiniteOwnerRequestLease(request);
 try{
  if(!finiteEntrypoint||url.origin!==finiteNativeOrigin||url.hash||path!==decoded)return finiteNativePending(404);
  const input={request,env,ctx};
  if(path==='/connections/finite-prepare'){
   if(!['GET','POST'].includes(request.method))return finiteNativePending(405);
   return await forwardFiniteOwnerChoice(input,parent.lease);
  }
  if(path==='/authorize'){
   if(!['GET','POST'].includes(request.method))return finiteNativePending(405);
   if(env?.AFW_DELEGATED_OAUTH_ENABLED!=='true')return finiteNativePending();
   return await forwardPrivateFiniteOwnerOAuth(input,parent.lease);
  }
  if(path==='/monitoring'||path==='/monitoring/grant'){
   if(request.method!==(path==='/monitoring'?'GET':'POST'))return finiteNativePending(405);
   if(env?.AFW_DELEGATED_OAUTH_ENABLED!=='true')return finiteNativePending();
   return await (path==='/monitoring'?forwardPrivateFiniteOwnerNoticeGet:forwardPrivateFiniteOwnerNoticeConsent)(input,parent.lease);
  }
  return finiteNativePending(404);
 }catch{return finiteNativePending();}finally{parent.finish();}
}};

