// CI-ONLY D1 storage adapter; no SDK, Access, public route or deploy configuration.
// Identity/policy controls and ACK fault header are synthetic, not authorization.
import {createDelegatedPreparationConsentStore} from '../../lib/delegated-preparation-consent-store.mjs';
import {createCapsulePreparationRequestLease} from '../../lib/capsule-preparation-request-lease.mjs';
let profile;
const worker={async fetch(request,env){
 const path=new URL(request.url).pathname,action=path.slice('/__ci/'.length);
 if(!path.startsWith('/__ci/')||!['profile','begin','decide','inspect'].includes(action))return new Response(null,{status:404});
 profile??={profileId:'afw.preparation-consent.v1',projectId:'project-a',clientId:'_ci-client',resource:'https://example.invalid/mcp',
  trialStartedAt:Date.now()-1000,trialExpiresAt:Date.now()+180000};
 if(action==='profile'&&request.method==='GET')return Response.json(profile);
 if(request.method!=='POST')return new Response(null,{status:405});
 const raw=await request.text();if(raw.length>4096)return new Response(null,{status:413});
 const input=JSON.parse(raw),fault=request.headers.get('x-ci-ack-loss');let lost=false;
 const createPrimarySession=()=>{
  const primary=env.DB.withSession('first-primary');
  const wrap=(stmt,sql)=>({bind(...args){return wrap(stmt.bind(...args),sql);},first:(...args)=>stmt.first(...args),all:()=>stmt.all(),
   async run(){const result=await stmt.run();
    if(!lost&&((fault==='reserve'&&sql.includes("SET state='reserved'"))||(fault==='admit'&&sql.includes("SET state='admitted'")))){
     lost=true;throw Error('synthetic ACK loss after real D1 commit');
    }return result;
   }});
  return {prepare:sql=>wrap(primary.prepare(sql),sql)};
 };
 const now=()=>Date.now(),requestLease=createCapsulePreparationRequestLease({now});
 const store=createDelegatedPreparationConsentStore({enabled:true,profile,createPrimarySession,now,requestLease});
 return Response.json(store?await store[action](input):{code:'unavailable'});
}};
export default worker;
