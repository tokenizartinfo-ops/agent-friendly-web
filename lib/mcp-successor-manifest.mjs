import {createHash} from 'node:crypto';
const NAME='afw-own-event-first-successor-v1';
const fail=()=>{throw Error('Successor preparation unavailable');};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);};
/** Internal server preparation. Resolves identity only; no get/start/permission.
 * The host must independently verify binding-to-namespace and deployed provenance. */
export function resolveSuccessorPreparation(options){
 try{
 const p=exact(options,['scope','original','candidate','namespace']);
 const scope=exact(p.scope,['accountId','workerName','namespaceId','applicationId','ownerRef','projectRef','resource']);
 const original=exact(p.original,['containerId','applicationId','programHash','sourceRevision']);
 const c=exact(p.candidate,['trialId','programHash','sourceRevision','startAt','expiresAt','budget']);
 if(!hex(scope.accountId,32)||!hex(scope.namespaceId,32)||!hex(scope.ownerRef,64)||!hex(scope.projectRef,64)||scope.workerName!=='agent-friendly-web-delegated-canary'||scope.resource!=='https://delegated-canary.agentfriendlyweb.dev/mcp'||typeof scope.applicationId!=='string'||!/^[A-Za-z0-9-]{1,200}$/.test(scope.applicationId)||original.applicationId!==scope.applicationId||!hex(original.containerId,64)||!hex(original.programHash,64)||!hex(original.sourceRevision,40)||!hex(c.trialId,64)||!hex(c.programHash,64)||!hex(c.sourceRevision,40)||!time(c.startAt)||!time(c.expiresAt)||c.expiresAt<=c.startAt||c.expiresAt-c.startAt>600000||c.budget!==1||typeof p.namespace?.idFromName!=='function'||typeof p.namespace?.idFromString!=='function')fail();
 const containerId=p.namespace.idFromName(NAME).toString();
 if(!hex(containerId,64)||containerId===original.containerId||p.namespace.idFromString(containerId).toString()!==containerId)fail();
 const resolved=Object.freeze({...c,containerId});
 const manifest=Object.freeze({purpose:'afw.first-successor-manifest.v1',scope,original,actorName:NAME,candidate:resolved});
 const scopeHash=createHash('sha256').update(JSON.stringify(manifest)).digest('hex');
 return Object.freeze({manifest,original,candidate:Object.freeze({...resolved,scopeHash}),mayBoot:false});
 }catch{fail();}
}
