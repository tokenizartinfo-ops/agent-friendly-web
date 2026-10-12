import {DurableObject,WorkerEntrypoint} from 'cloudflare:workers';
import {createDelegatedOAuthWorker} from '../../lib/delegated-oauth-worker.mjs';
import {createOwnDurableEventHost} from '../../lib/mcp-own-durable-host.mjs';
import {createDossierEventRpcAuthority,readDossierEventHostPolicy} from '../../lib/dossier-event-rpc-authority.mjs';
const deny=()=>new Response('{"code":"unavailable"}',{status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
const fail=()=>{throw Error('Private event Node unavailable');};
// Build replaces these public program/revision literals; no key is embedded.
const program=globalThis.__AFW_NODE_PROGRAM__??'',sourceRevision=globalThis.__AFW_NODE_SOURCE_REVISION__??'';

export class AfwOwnEventNode extends DurableObject{
 #host(historical=false){
  const config=readDossierEventHostPolicy({enabled:historical||this.env.AFW_DOSSIER_EVENTS_ENABLED==='true',env:this.env,historical}),p=config.policy;
  if(this.ctx.id.toString()!==p.containerId)fail();const secret=this.env.AFW_DOSSIER_EVENTS_CUSTODY_KEY;
  if(typeof secret!=='string'||secret.length!==44)fail();const key=Buffer.from(secret,'base64');if(key.length!==32||key.toString('base64')!==secret){key.fill(0);fail();}
  let host;try{host=createOwnDurableEventHost({enabled:true,db:config.pins.DB,context:{grantId:p.grantId,subject:p.subject,clientId:p.clientId,resource:p.resource,scopes:['afw:project:read']},projectId:p.projectId,projectionSecret:config.pins.AFW_DOSSIER_EVENTS_PROJECTION_SECRET,custodyKey:key,ctx:this.ctx,program,sourceRevision,window:{startAt:p.startAt,expiresAt:p.expiresAt},makeControl:props=>this.ctx.exports.AfwNodeControl({props}),now:Date.now});}finally{key.fill(0);}
  return{host,current:config.current};
 }
 async #call(method,...args){try{const c=this.#host();c.current();const result=await c.host[method](...args);c.current();return result;}catch{fail();}}
 fetch(){return deny();}
 list(){return this.#call('list');}
 subscribe(value){return this.#call('subscribe',value);}
 unsubscribe(value){return this.#call('unsubscribe',value);}
 // Private operator shutdown retains original scope/config/DO fences but
 // must not depend on the live monitoring flag or window. Never starts Node.
 async close(){try{const c=this.#host(true);c.current();const result=await c.host.close();c.current();return result;}catch{fail();}}
 // Internal producer reference only; never accept a caller-authored signal.
 deliverSaved(subscriptionId,eventId){return this.#call('deliverSaved',subscriptionId,eventId);}
 async consume(request,serverProps){try{return await this.#call('consume',request,serverProps);}catch{return deny();}}
}

export class AfwNodeControl extends WorkerEntrypoint{
 async fetch(request){try{
  const c=readDossierEventHostPolicy({enabled:this.env.AFW_DOSSIER_EVENTS_ENABLED==='true',env:this.env}),p=this.ctx.props;
  if(!p||Object.getPrototypeOf(p)!==Object.prototype||Object.keys(p).length!==3||p.containerId!==c.policy.containerId||typeof p.processGeneration!=='string'||!/^[0-9a-f]{64}$/.test(p.processGeneration)||!Number.isSafeInteger(p.expiresAt)||p.expiresAt>c.policy.expiresAt||p.expiresAt<=Date.now())fail();
  const id=c.pins.AFW_DOSSIER_EVENTS_NODE.idFromString(c.policy.containerId);if(id.toString()!==c.policy.containerId)fail();c.current();
  const result=await c.pins.AFW_DOSSIER_EVENTS_NODE.get(id).consume(request,{containerId:p.containerId,processGeneration:p.processGeneration,expiresAt:p.expiresAt});c.current();return result;
 }catch{return deny();}}
}

const worker={fetch(request,env,ctx){return createDelegatedOAuthWorker({issuer:env.AFW_OAUTH_ISSUER,resource:env.AFW_OAUTH_RESOURCE,eventsAuthorityFactory:options=>createDossierEventRpcAuthority({enabled:true,...options})}).fetch(request,env,ctx);}};
export default worker;
