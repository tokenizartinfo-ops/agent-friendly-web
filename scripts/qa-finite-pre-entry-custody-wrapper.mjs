import {IndependentClosure as BaselineClosure,PrivateQaBootstrap as BaselineBootstrap} from './closed-rollback.mjs';
import {custodyContext} from './pre-entry-custody-context.mjs';
import {readFinitePreEntryCustody} from '../lib/mcp-qa-finite-initial-custody-probe.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
export {PrivateQaNamedConfirmation,PrivateQaPreregistration,default} from './closed-rollback.mjs';

const slot='afw-own-successor-closure-v1';
const purpose='afw.qa-pre-entry-custody.v1';
const policies=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
const fail=()=>{throw Error('Closed pre-entry custody unavailable');};
const blocked=()=>({purpose,status:'blocked',authorizesEffects:false,operationalReadiness:false,mayRetry:false});
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();}
 return v;
}
function guard(env,id,source,minimum){
 const c=fields(custodyContext,['purpose','id','sourceRevision','baselineVersionId','baselineModuleHash','startAt','expiresAt']);
 if(c.purpose!=='afw.qa-pre-entry-custody-context.v1'||!hex(c.id,64)||id!==c.id||!hex(c.sourceRevision,40)||source!==c.sourceRevision||c.baselineVersionId!=='c570b60b-95dc-48e1-89f3-9c4651691dbc'||c.baselineModuleHash!=='4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f'||!Number.isSafeInteger(c.startAt)||!Number.isSafeInteger(c.expiresAt)||c.expiresAt<=c.startAt||c.expiresAt-c.startAt>600000)fail();
 const ns=env.AFW_INDEPENDENT_CLOSURE,version=env.AFW_QA_VERSION,versionId=version?.id;
 if(!ns||typeof ns.get!=='function'||typeof ns.idFromName!=='function'||typeof versionId!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(versionId))fail();
 let wall=Date.now(),mono=performance.now();
 const check=()=>{
  const w=Date.now(),m=performance.now();
  if(!Number.isSafeInteger(w)||!Number.isFinite(m)||w<wall||m<mono||w<c.startAt||w+minimum>=c.expiresAt||env.AFW_INDEPENDENT_CLOSURE!==ns||env.AFW_QA_VERSION!==version||version.id!==versionId)fail();
  wall=w;mono=m;
  for(const key of PRIVATE_QA_CLOSED_FLAGS)if(env[key]!=='false')fail();
  for(const key of policies)if(env[key]!=='')fail();
 };
 check();return{check,ns,versionId};
}
function observation(r){
 if(!r||r.status!=='observed'||r.guardVerified!==true||r.scopeVerified!==false||r.authorizesEffects!==false||r.operationalReadiness!==false||r.reader?.status!=='active'||r.publisher?.status!=='active')fail();
 return {purpose,status:'observed',reader:r.reader,publisher:r.publisher,guardVerified:true,scopeVerified:false,authorizesEffects:false,operationalReadiness:false,mayRetry:false};
}
export class IndependentClosure extends BaselineClosure{
 async readPreEntryCustody(...args){
  try{
   if(args.length!==2)fail();
   const g=guard(this.env,args[0],args[1],15000),ctx=this.ctx,env=this.env,storage=ctx.storage,actor=ctx.id;
   if(actor.toString()!==g.ns.idFromName(slot).toString())fail();
   const value=await readFinitePreEntryCustody({ctx,env});
   g.check();if(this.ctx!==ctx||this.env!==env||ctx.storage!==storage||ctx.id!==actor||actor.toString()!==g.ns.idFromName(slot).toString())fail();
   return JSON.stringify(observation(value));
  }catch{return JSON.stringify(blocked());}
 }
}
export class PrivateQaBootstrap extends BaselineBootstrap{
 async run(event,step){
  let p=event?.payload;try{if(typeof p==='string'&&new TextEncoder().encode(p).length<=256)p=JSON.parse(p);}catch{/* Preserve the inherited closed handler. */}
  if(p?.operation!=='inspect_pre_entry_custody')return super.run(event,step);
  try{
   fields(p,['operation','observationId']);
   const g=guard(this.env,p.observationId,custodyContext.sourceRevision,15000),stamp=event.timestamp instanceof Date?event.timestamp.getTime():NaN,started=Date.now(),origin=performance.now();
   if(event.instanceId!=='afw-qa-custody-'+custodyContext.id||!Number.isSafeInteger(stamp)||stamp>started||started-stamp>=15000||typeof step?.do!=='function')fail();
   let executed=false;
   const value=await step.do('inspect-pre-entry-custody',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'15 seconds'},async()=>{
    if(executed)fail();executed=true;g.check();
    const actor=g.ns.get(g.ns.idFromName(slot)),raw=await actor.readPreEntryCustody(custodyContext.id,custodyContext.sourceRevision);g.check();if(typeof raw!=='string'||new TextEncoder().encode(raw).length>2048)fail();return raw;
   });
   g.check();if(!executed||Date.now()-stamp>=15000||performance.now()-origin>=15000||typeof value!=='string'||new TextEncoder().encode(value).length>2048)fail();
   const result=JSON.parse(value);if(result?.purpose!==purpose||result.status!=='observed'||result.guardVerified!==true||result.scopeVerified!==false||result.authorizesEffects!==false||result.operationalReadiness!==false||result.mayRetry!==false)fail();
   return result;
  }catch{return blocked();}
 }
}
