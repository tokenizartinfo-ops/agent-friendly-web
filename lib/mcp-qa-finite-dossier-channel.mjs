import {receiveFiniteDossierCallback,FINITE_DOSSIER_CALLBACK_PATH} from './mcp-qa-finite-dossier-callback.mjs';
import {FINITE_DOSSIER_QA_ORIGIN,readFiniteDossierReviewPolicy} from './dossier-supervision-finite-review.mjs';
import {matchesMcpVerificationReply} from './mcp-signed-envelope.mjs';
import {finiteFields as fields,finiteHash as hash} from './mcp-finite-evidence.mjs';

export const finiteDossierChannelTag=({controlHash,challenge,projectRef,eventId,revision})=>
 hash(['afw.finite-prelaunch-channel.v1',controlHash,challenge,projectRef,eventId,revision]);

/** Private service-binding check. Only the challenge form of the existing
 * signed callback is accepted. It never inserts a notice or a review. */
export async function verifyPrivateFiniteDossierChannel({env,value,now=Date.now}){
 try{
  const x=fields(value,['challenge','projectRef','eventId','controlHash','revision','envelope']);
  const policy=readFiniteDossierReviewPolicy(env);
  if(!policy||['projectRef','eventId','controlHash','revision'].some(k=>policy[k]!==x[k]))return {verified:false};
  const e=fields(x.envelope,['body','headers']);
  if(typeof x.challenge!=='string'||!(/^[A-Za-z0-9_-]{43}$/).test(x.challenge)||
     e.body!==JSON.stringify({type:'verification',challenge:x.challenge}))return {verified:false};
  const tag=finiteDossierChannelTag(x),headers=new Headers(e.headers);
  if(headers.get('webhook-id')!=='verify_'+tag||headers.get('x-mcp-subscription-id')!=='sub_'+tag)return {verified:false};
  headers.set('Content-Type','application/json');
  const reply=await receiveFiniteDossierCallback({env,now,request:new Request(FINITE_DOSSIER_QA_ORIGIN+FINITE_DOSSIER_CALLBACK_PATH,
   {method:'POST',headers,body:e.body})});
  if(!matchesMcpVerificationReply(x.challenge,reply.status,await reply.text()))return {verified:false};
  return {verified:true,challenge:x.challenge};
 }catch{return {verified:false};}
}
