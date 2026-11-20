import {createHash} from 'node:crypto';
import {finitePublicStaticExpectation,finitePublicProfileTemplate} from './mcp-qa-finite-profile.mjs';
const fail=()=>{throw Error('Finite QA bootstrap unavailable');};
export const BOOTSTRAP=Object.freeze({repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:1347578006,ownerId:290715446,workflowPath:'.github/workflows/afw-finite-qa-bootstrap.yml',cliPath:'scripts/run-qa-finite-bootstrap.mjs',job:'publish',step:'qa-bootstrap-provenance',sourceCheck:'git-inputs-and-configuration-before-after-v1',accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-independent-closure-qa'});
export const bootstrapCanonical=x=>Array.isArray(x)?'['+x.map(bootstrapCanonical).join(',')+']':x&&typeof x==='object'?'{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+bootstrapCanonical(x[k])).join(',')+'}':JSON.stringify(x);
export const bootstrapHash=x=>createHash('sha256').update(x).digest('hex');
export function bootstrapOwn(input,cap=16384){
 let nodes=0,bytes=0;const walk=(v,depth=0)=>{
  if(++nodes>1024||depth>12)fail();
  if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isSafeInteger(v))return v;
  if(typeof v==='string'){bytes+=Buffer.byteLength(v);if(bytes>cap)fail();return v;}
  const array=Array.isArray(v);if(!v||Object.getPrototypeOf(v)!==(array?Array.prototype:Object.prototype))fail();
  const keys=Reflect.ownKeys(v),out=array?[]:{};if(array&&(keys.length!==v.length+1||v.length>128))fail();
  for(const k of keys){if(array&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(v,k);if(typeof k!=='string'||['__proto__','constructor','prototype','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value')||array&&!/^(0|[1-9][0-9]*)$/.test(k))fail();out[k]=walk(d.value,depth+1);}return out;
 };const out=walk(input);if(Buffer.byteLength(bootstrapCanonical(out))>cap)fail();return out;
}
export function bootstrapFields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length||keys.some(k=>!Object.hasOwn(v,k)))fail();return v;}
export function bootstrapFreeze(v){if(v&&typeof v==='object'){Object.values(v).forEach(bootstrapFreeze);Object.freeze(v);}return v;}
export const bootstrapHex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
export const bootstrapUuid=v=>typeof v==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);
export function validateFiniteQaBootstrap(input){
 const r=bootstrapOwn(input);bootstrapFields(r,['purpose','repository','repositoryId','sourceRevision','sourceTree','sourceCheck','workflowHash','cliHash','commandId','runId','jobId','attempt','workflowPath','job','step','P0','Pend','jobStartedAt','stepStartedAt','observedAt','qaLive']);
 if(r.purpose!=='afw.finite-qa-bootstrap.v1'||['repository','repositoryId','sourceCheck','workflowPath','job','step'].some(k=>r[k]!==BOOTSTRAP[k])||!bootstrapHex(r.sourceRevision,40)||!bootstrapHex(r.sourceTree,40)||!bootstrapHex(r.workflowHash)||!bootstrapHex(r.cliHash)||r.attempt!==1||['commandId','runId','jobId'].some(k=>!Number.isSafeInteger(r[k])||r[k]<1)||['P0','Pend','jobStartedAt','stepStartedAt','observedAt'].some(k=>!Number.isSafeInteger(r[k])||r[k]<0)||r.Pend!==r.P0+300000||r.jobStartedAt<r.P0||r.stepStartedAt<r.jobStartedAt||r.observedAt<r.stepStartedAt||r.observedAt>=r.Pend)fail();
 const q=bootstrapFields(r.qaLive,['versionId','deploymentId','module','publicStatic']),m=bootstrapFields(q.module,['name','sha256','bytes','exports']);
 if(!bootstrapUuid(q.versionId)||!bootstrapUuid(q.deploymentId)||m.name!=='index.mjs'||!bootstrapHex(m.sha256)||!Number.isSafeInteger(m.bytes)||m.bytes<1||m.bytes>3145728||bootstrapCanonical(m.exports)!==bootstrapCanonical(finitePublicProfileTemplate('qaLive').exports)||bootstrapCanonical(q.publicStatic)!==bootstrapCanonical(finitePublicStaticExpectation('qaLive')))fail();
 return bootstrapFreeze(r);
}
export function encodeFiniteQaBootstrap(input){
 const record=validateFiniteQaBootstrap(input),recordHash=bootstrapHash('afw.finite-qa-bootstrap.v1\n'+bootstrapCanonical(record)),wire=bootstrapCanonical({record,recordHash});if(Buffer.byteLength(wire)>16384)fail();return wire;
}
export function decodeFiniteQaBootstrap(wire){
 if(typeof wire!=='string'||Buffer.byteLength(wire)>16384)fail();let value;try{value=bootstrapOwn(JSON.parse(wire));}catch{fail();}
 bootstrapFields(value,['record','recordHash']);const record=validateFiniteQaBootstrap(value.record);
 if(!bootstrapHex(value.recordHash)||wire!==encodeFiniteQaBootstrap(record))fail();return bootstrapFreeze({record,recordHash:value.recordHash});
}
