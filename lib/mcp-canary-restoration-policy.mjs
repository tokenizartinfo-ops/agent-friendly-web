import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
const fail=()=>{throw Error('Canary restoration transport unavailable');};
const hex=(x,n)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 const x={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();x[k]=d.value;}return Object.freeze(x);
}
export function parseCanaryRestorationPolicy(raw){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>8192)fail();
 const p=JSON.parse(raw);fields(p,['operation','startAt','expiresAt','candidate','live','closed','operator']);
 fields(p.candidate,['containerId','applicationId','programHash','sourceRevision']);fields(p.live,['versionId','deploymentId','configurationHash']);fields(p.closed,['versionId','moduleHash','moduleBytes','configurationHash']);fields(p.operator,['versionId','deploymentId','moduleHash','moduleBytes','configurationHash']);
 if(JSON.stringify(p)!==raw||p.operation!=='restore_canary'||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||
  !hex(p.candidate.containerId,64)||p.candidate.applicationId!==RELEASE_TARGET.namespaceId||!hex(p.candidate.programHash,64)||!hex(p.candidate.sourceRevision,40)||
  !uuid(p.live.deploymentId)||!uuid(p.operator.deploymentId)||[p.live,p.closed,p.operator].some(x=>!uuid(x.versionId)||!hex(x.configurationHash,64))||
  p.live.versionId===p.closed.versionId||[p.closed,p.operator].some(x=>!hex(x.moduleHash,64)||!Number.isSafeInteger(x.moduleBytes)||x.moduleBytes<1||x.moduleBytes>2097152))fail();
 for(const k of['candidate','live','closed','operator'])Object.freeze(p[k]);return Object.freeze(p);
}
