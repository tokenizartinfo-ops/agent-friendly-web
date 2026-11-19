import {createHash} from 'node:crypto';
const fail=()=>{throw Error('Finite launch record unavailable');};
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const id=v=>typeof v==='string'&&/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(v);
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);
}
const canonical=v=>JSON.stringify(Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])));
const digest=(domain,v)=>createHash('sha256').update(domain+'\n'+canonical(v)).digest('hex');
export function finiteLauncherInstanceId(value){
 const v=fields(value,['intentId','sourceRevision']);if(!id(v.intentId)||!hex(v.sourceRevision,40))fail();
 return 'afw-finite-launch-'+digest('afw.finite-launcher.v1',v);
}
export function validateFiniteLaunchPolicy(value){
 const {T0,launchPolicy}=fields(value,['T0','launchPolicy']),p=fields(launchPolicy,['armAckBy','launchAt','lastCreateAt']);
 if(!time(T0)||!time(p.armAckBy)||!time(p.launchAt)||!time(p.lastCreateAt)||p.armAckBy!==T0+90000||p.launchAt!==T0+150000||p.lastCreateAt!==T0+160000)fail();return p;
}
const IDENTITY=['intentId','finitePlanHash','controlHash','sourceRevision','qaVersionId','actorId','launcherId','nominalId','bundleHash','nominalClaimHash'];
function identity(v){
 if(!id(v.intentId)||!hex(v.sourceRevision,40)||typeof v.qaVersionId!=='string'||!(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/).test(v.qaVersionId)||['finitePlanHash','controlHash','actorId','bundleHash','nominalClaimHash'].some(k=>!hex(v[k]))||v.launcherId!==finiteLauncherInstanceId({intentId:v.intentId,sourceRevision:v.sourceRevision})||v.nominalId!=='afw-release-'+v.bundleHash||v.nominalId===v.launcherId)fail();
}
/** Canonical arm record committed before the first possible cleanup delivery. */
export function finiteArmedGuardState(controlHash,C0){
 if(!hex(controlHash)||!time(C0))fail();
 return Object.freeze({purpose:'afw.finite-guard-state.v1',controlHash,deliveries:0,state:'armed',nextAt:C0});
}

export function validateFiniteLaunchPrepared(value){
 const v=fields(value,['purpose',...IDENTITY,'guardStateHash','preparedAt','armAckBy','launchAt','lastCreateAt']);identity(v);
 const T0=v.armAckBy-90000;validateFiniteLaunchPolicy({T0,launchPolicy:{armAckBy:v.armAckBy,launchAt:v.launchAt,lastCreateAt:v.lastCreateAt}});
 if(v.purpose!=='afw.qa-finite-launch-prepared.v1'||!hex(v.guardStateHash)||!time(v.preparedAt)||v.preparedAt<T0||v.preparedAt>v.armAckBy)fail();return v;
}
export function validateFiniteChildCreateSend(value){
 const v=fields(value,['purpose',...IDENTITY,'preparedHash','bindingHash','issuedAt','deadline']);identity(v);
 if(v.purpose!=='afw.qa-finite-child-create-send.v1'||!hex(v.preparedHash)||!hex(v.bindingHash)||!time(v.issuedAt)||!time(v.deadline)||v.deadline<160000||v.issuedAt<v.deadline-10000||v.issuedAt>=v.deadline)fail();return v;
}
export function validateFiniteChildCreateAck(value){
 const v=fields(value,['purpose','intentId','controlHash','sendHash','nominalId','acknowledgedAt']);
 if(v.purpose!=='afw.qa-finite-child-create-ack.v1'||!id(v.intentId)||!hex(v.controlHash)||!hex(v.sendHash)||typeof v.nominalId!=='string'||!/^afw-release-[a-f0-9]{64}$/.test(v.nominalId)||!time(v.acknowledgedAt))fail();return v;
}
export function hashFiniteLaunchRecord(value){
 const d=Object.getOwnPropertyDescriptor(value??{},'purpose');if(!d||!Object.hasOwn(d,'value'))fail();
 const validators={'afw.qa-finite-launch-prepared.v1':validateFiniteLaunchPrepared,'afw.qa-finite-child-create-send.v1':validateFiniteChildCreateSend,'afw.qa-finite-child-create-ack.v1':validateFiniteChildCreateAck};if(typeof d.value!=='string'||!Object.hasOwn(validators,d.value))fail();const v=validators[d.value](value);return digest(v.purpose,v);
}

/** Both the SEND journal and its child bind the same selected QA revision. */
export function finiteChildConfirmationBindingHash(plan){
 return digest('afw.finite-native-child-binding.v1',{
  accountId:'85d0d5dadac3341a564f22ce885e9eec',
  bindingName:'AFW_QA_NAMED_CONFIRMATION',
  className:'PrivateQaNamedConfirmation',
  definitionName:'afw-own-qa-private-confirmation',
  qaVersionId:plan.deployments.qaLive.versionId,
  scriptName:'agent-friendly-web-independent-closure-qa',
  sourceModuleHash:plan.source.moduleHash,
  sourceProfileHash:plan.source.profileHash,
  sourceRevision:plan.source.revision,
 });
}

/** The coordinator and native operation must bind the same optional source
 * capabilities by reference. This is internal material, not an RPC payload. */
export function validatePrivateQaFiniteLaunchMaterial(value){
 const extras=['alarmHandoff','businessPrimary','preflight','authorizeFinalSend'].filter(k=>Object.hasOwn(value??{},k));
 const m=fields(value,['ctx','env','plan','request','execution',...extras]);
 if(typeof m.plan!=='string'||typeof m.request!=='function')fail();
 return m;
}
