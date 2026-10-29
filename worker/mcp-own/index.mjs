import {withdrawOwnPermissions} from '../../lib/mcp-own-permission-withdrawal-host.mjs';
import {DurableObject,WorkerEntrypoint} from 'cloudflare:workers';
import {readOwnSuccessorHost} from '../../lib/mcp-own-successor-host.mjs';
import {observeOwnSuccessorRetiredCustody} from '../../lib/mcp-own-successor-retirement-host.mjs';
import {observeOwnRetiredCustody} from '../../lib/mcp-own-retirement-host.mjs';
import {createDelegatedOAuthWorker} from '../../lib/delegated-oauth-worker.mjs';
import {createOwnDurableEventHost} from '../../lib/mcp-own-durable-host.mjs';
import {createDossierEventRpcAuthority,readDossierEventHostPolicy} from '../../lib/dossier-event-rpc-authority.mjs';
import {runOwnEventSchedule,readClosedOwnScheduleWitness} from '../../lib/mcp-own-event-schedule.mjs';
import {createOwnSyntheticSaveHost} from '../../lib/mcp-own-synthetic-save-host.mjs';
import {observeMcpDiscoveryRequest,observeMcpEventAuthority,createMcpRpcCatalogDiagnostic} from '../../lib/mcp-discovery-diagnostic.mjs';
const deny=()=>new Response('{"code":"unavailable"}',{status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
const fail=()=>{throw Error('Private event Node unavailable');};
// Build replaces these public program/revision literals; no key is embedded.
const program=globalThis.__AFW_NODE_PROGRAM__??'',sourceRevision=globalThis.__AFW_NODE_SOURCE_REVISION__??'';

export class AfwOwnEventNode extends DurableObject{
 #host(historical=false,diagnostic){
  const trace=stage=>{try{diagnostic?.record(stage);}catch{}};
  const config=readDossierEventHostPolicy({enabled:historical||this.env.AFW_DOSSIER_EVENTS_ENABLED==='true',env:this.env,historical}),p=config.policy;
  trace('native_policy_ready');
  const successor=historical?null:readOwnSuccessorHost({env:this.env,ctx:this.ctx,program,sourceRevision,window:{startAt:p.startAt,expiresAt:p.expiresAt}});
  trace('native_successor_ready');
  if(this.ctx.id.toString()!==p.containerId)fail();const secret=this.env.AFW_DOSSIER_EVENTS_CUSTODY_KEY;
  if(typeof secret!=='string'||secret.length!==44)fail();const key=Buffer.from(secret,'base64');if(key.length!==32||key.toString('base64')!==secret){key.fill(0);fail();}
  trace('native_custody_ready');
  let host;try{host=createOwnDurableEventHost({...(successor?{successor:successor.successor}:{}),enabled:true,db:config.pins.DB,context:{grantId:p.grantId,subject:p.subject,clientId:p.clientId,resource:p.resource,scopes:['afw:project:read']},projectId:p.projectId,projectionSecret:config.pins.AFW_DOSSIER_EVENTS_PROJECTION_SECRET,custodyKey:key,ctx:this.ctx,program,sourceRevision,window:{startAt:p.startAt,expiresAt:p.expiresAt},makeControl:props=>this.ctx.exports.AfwNodeControl({props}),now:Date.now},trace);}finally{key.fill(0);}
  return{host,current:()=>{config.current();successor?.current();}};
 }
 async #call(method,...args){
  const diagnostic=method==='list'?createMcpRpcCatalogDiagnostic({env:this.env,sourceRevision}):null;
  diagnostic?.record('native_received');
  try{const c=this.#host(false,diagnostic);diagnostic?.record('native_host_ready');c.current();const result=await c.host[method](...args);c.current();diagnostic?.record('native_returned');return result;}
  catch{diagnostic?.record('native_failed');fail();}
 }
 fetch(){return deny();}
 // Private original-custody observation; no caller selectors or live runtime.
 async observeRetired(...args){try{if(args.length)fail();return await observeOwnRetiredCustody({env:this.env,ctx:this.ctx});}catch{fail();}}
 // Separate successor readback; preserves original observeRetired policy.
 async observeSuccessorRetired(...args){try{if(args.length)fail();return await observeOwnSuccessorRetiredCustody({env:this.env,ctx:this.ctx,program,sourceRevision});}catch{fail();}}
 list(){return this.#call('list');}
 subscribe(value){return this.#call('subscribe',value);}
 unsubscribe(value){return this.#call('unsubscribe',value);}
 // Trusted server observation only; never boots or refreshes the original.
 readReadiness(){return this.#call('readReadiness');}
 // Private read only, reached through the fixed own-QA Access handler.
 observeSubscription(){return this.#call('observeSubscription');}
 // Private operator shutdown retains original scope/config/DO fences but
 // must not depend on the live monitoring flag or window. Never starts Node.
 async close(){try{const c=this.#host(true);c.current();const result=await c.host.close();c.current();return result;}catch{fail();}}
 // Finite, server-fixed reduction. No RPC arguments or live grant renewal.
 async withdrawPermissionsForPlan(...args){if(args.length!==1)fail();return this.#withdraw(args[0]);}
 async withdrawPermissions(...args){if(args.length)fail();return this.#withdraw();}
 async #withdraw(boundary){try{
  return await withdrawOwnPermissions({env:this.env,ctx:this.ctx,program,sourceRevision,now:Date.now,
   close:async(signal,assertStage,expiresAt)=>{const c=this.#host(true);const assertCurrent=()=>{assertStage();c.current();if(signal.aborted)fail();};assertCurrent();const result=await c.host.close({signal,assertCurrent,expiresAt});assertCurrent();return result;}},boundary);
 }catch{fail();}}
 // Internal producer reference only; never accept a caller-authored signal.
 deliverSaved(subscriptionId,eventId){return this.#call('deliverSaved',subscriptionId,eventId);}
 deliverOwnSaved(eventId){return this.#call('deliverOwnSaved',eventId);}
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

const worker={fetch(request,env,ctx){
 if(new URL(request.url).pathname==='/qa/expediente')return createOwnSyntheticSaveHost({env,program,sourceRevision})(request);
 return observeMcpDiscoveryRequest({request,env,sourceRevision},diagnostic=>createDelegatedOAuthWorker({
  issuer:env.AFW_OAUTH_ISSUER,resource:env.AFW_OAUTH_RESOURCE,
  eventsAuthorityFactory:options=>observeMcpEventAuthority(diagnostic,()=>createDossierEventRpcAuthority({enabled:true,...options,diagnostic})),
 }).fetch(request,env,ctx));
},async scheduled(controller,env){const result=await runOwnEventSchedule(controller,env);if(result===null){const witness=readClosedOwnScheduleWitness(controller,env,{sourceRevision});if(witness)console.info(JSON.stringify(witness));}return result;}};
export default worker;
