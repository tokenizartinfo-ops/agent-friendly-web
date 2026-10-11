import {createPrimaryOccurrenceHttpAdapter} from '../../lib/assistance-occurrence-http.mjs';

const ORIGIN='https://operations-manager.agentfriendlyweb.dev';
const response=status=>Response.json({code:status===404?'unavailable':'service_unavailable'},{status,headers:{'Cache-Control':'no-store'}});
function parsed(text){if(typeof text!=='string'||!text||text.length>20000)throw Error('Own configuration unavailable');return JSON.parse(text);}

// Only prior administrative configuration supplies authority and dependencies.
// No query/body selectors, alternate primary or D1-only admission fallback.
export async function fetchOwnOccurrence(request,env){
 if(env?.AFW_QA_HTTP_ENABLED!=='true')return response(404);
 const url=new URL(request.url);
 if(url.origin!==ORIGIN||!url.pathname.startsWith('/assistance/occurrences/')||url.search)return response(404);
 try{
  const policyText=env.AFW_QA_HTTP_POLICY,pinsText=env.AFW_QA_PREREGISTRATION;
  const policy=parsed(policyText),pins=parsed(pinsText);
  const db=env.AFW_QA_DB,namespace=env.AFW_QA_PREREGISTRY,limiter=env.AFW_QA_OCCURRENCE_RATE_LIMITER;
  if(typeof db?.prepare!=='function'||typeof namespace?.idFromName!=='function'||typeof namespace?.get!=='function'||typeof limiter?.limit!=='function')return response(503);
  const actor=namespace.get(namespace.idFromName('own-qa'));
  const unchanged=()=>env.AFW_QA_HTTP_ENABLED==='true'&&env.AFW_QA_HTTP_POLICY===policyText&&env.AFW_QA_PREREGISTRATION===pinsText&&env.AFW_QA_DB===db&&env.AFW_QA_PREREGISTRY===namespace&&env.AFW_QA_OCCURRENCE_RATE_LIMITER===limiter;
  const readPolicy=()=>{if(!unchanged())throw Error('Own configuration changed');return Date.now()>=policy.serverDeadline?{...policy,mode:'QA_OFF'}:policy;};
  const read=async method=>{
   if(!unchanged())throw Error('Own configuration changed');
   const value=await actor[method]();
   try{if(!unchanged())throw Error('Own configuration changed');return structuredClone(value);}finally{value?.[Symbol.dispose]?.();}
  };
  return await createPrimaryOccurrenceHttpAdapter({db,limiter,readPolicy,primary:{recordRef:pins?.registration?.plan?.baselineRef,creationRef:pins?.registration?.provisioning?.creationRef,readLive:()=>read('readOwnAdmissionScope'),readClosure:()=>read('readOwnClosureScope')}})(request);
 }catch{return response(503);}
}
