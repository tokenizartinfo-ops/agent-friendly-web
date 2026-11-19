import {createFiniteNativePrimaryReader} from './mcp-own-finite-primary.mjs';
import {createFiniteProviderInventoryReader} from './mcp-finite-primary-inventory.mjs';
import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlIdentity} from './mcp-qa-finite-trial-control.mjs';
import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {FINITE_ACCOUNT} from './mcp-qa-finite-external-contract.mjs';
import {finiteControlIdentity,finiteFields as fields,finiteHash as hash,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';

const ROOT='/accounts/'+FINITE_ACCOUNT;
const roles=Object.freeze({'agent-friendly-web-independent-closure-qa':'qaLive',
 'agent-friendly-web-delegated-canary':'canaryLive','agent-friendly-web-release-operator':'operatorClosed'});
const emptyFields=['reservationHash','admissionHash','launchHash','closureHash','processGeneration'];
const fail=()=>{throw Error('Finite QA prelaunch checks unavailable');};
const stable=value=>Object.fromEntries(Object.entries(value).filter(([key])=>key!=='observedAt'));

/** Read-only provider and original D1 verification, under the launcher clock.
 * This deliberately returns evidence without providing effect authority. */
export async function readPrivateQaFinitePrelaunch({ctx,env,control,parent}={}){
 const c=finiteControlIdentity(control),p=c.plan;
 const {signal,deadline,check}=fields(parent,['signal','deadline','check']);
 if(!(signal instanceof AbortSignal)||!time(deadline)||typeof check!=='function')fail();
 const storage=ctx.storage,db=env.RELEASE_DB,metadata=env.AFW_QA_VERSION,fetchImpl=globalThis.fetch;
 const credential=env.AFW_MCP_CLOSURE_READ_TOKEN,raw=JSON.stringify(p);
 if(typeof credential!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(credential))fail();
 const pin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:p.source.revision});
 const expiresAt=Math.min(deadline,p.launchPolicy.lastCreateAt,p.selectors.expiresAt);
 let last=-1;
 const current=()=>{
  const at=check();
  if(signal.aborted||parent.signal!==signal||parent.deadline!==deadline||parent.check!==check||
     ctx.storage!==storage||env.RELEASE_DB!==db||env.AFW_QA_VERSION!==metadata||
     env.AFW_MCP_CLOSURE_READ_TOKEN!==credential||globalThis.fetch!==fetchImpl||
     !time(at)||at<last||at<p.T0||at>=expiresAt||readPrivateQaFiniteControlIdentity({nativePin:pin,raw}).controlHash!==c.controlHash)fail();
  last=at;return at;
 };
 current();
 const primary=createFiniteNativePrimaryReader({db,control:c,now:current});
 const wire=finiteSeedWire({fetchImpl,now:current,signal,credential,origin:'https://api.cloudflare.com/client/v4',
  requests:24,limit:262144});
 const get=async path=>{current();const response=await wire.request(path);current();finiteCfEnvelope(response.value);return response;};
 const inventory=createFiniteProviderInventoryReader({control:c,now:current,request:async(input,assertCurrent)=>{
  if(input.method!=='GET'||input.signal!==signal||input.path!==ROOT+'/containers/applications/'+p.resources.applicationId+'/instances-v2')fail();
  assertCurrent();const response=await get(input.path+'?'+new URLSearchParams(input.query));assertCurrent();
  return {...response.value,status:response.status};
 }});
 const pointers=()=>Promise.all(Object.entries(roles).map(async([name,role])=>{
  const {value}=await get(ROOT+'/workers/scripts/'+name+'/deployments?per_page=1');
  const rows=value.result?.deployments,expected=p.deployments[role],d=rows?.[0];
  if(!Array.isArray(rows)||rows.length!==1||d?.strategy!=='percentage'||d.id!==expected.deploymentId||
     !Array.isArray(d.versions)||d.versions.length!==1||d.versions[0]?.version_id!==expected.versionId||
     d.versions[0]?.percentage!==100)fail();
  return {role,versionId:expected.versionId,deploymentId:expected.deploymentId};
 }));
 const triggers=()=>Promise.all(Object.keys(roles).flatMap(name=>['schedules','tails'].map(async section=>{
  const {value}=await get(ROOT+'/workers/scripts/'+name+'/'+section),rows=Array.isArray(value.result)?value.result:value.result?.schedules;
  if(!Array.isArray(rows)||rows.length!==0)fail();
 })));
 const database=async()=>{
  const value=await primary.read();current();if(emptyFields.some(key=>value[key]!==null))fail();return value;
 };
 try{
  const [first,before]=await Promise.all([pointers(),database()]);
  const [provider]=await Promise.all([inventory({signal,assertCurrent:current}),triggers()]);
  const [last,after]=await Promise.all([pointers(),database()]);
  if(!same(first,last)||!same(stable(before),stable(after))||provider.instances.some(row=>row.containerId===p.resources.containerId))fail();
  return Object.freeze({status:'verified',intentId:p.intentId,controlHash:c.controlHash,observedAt:current(),expiresAt,
   evidenceHash:hash({pointers:last,primary:after,provider}),authorizesEffects:false,operationalReadiness:false});
 }finally{wire.close();}
}
