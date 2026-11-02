import {finiteLauncherInstanceId} from './mcp-qa-finite-launch-records.mjs';
import {createHash} from 'node:crypto';
import {readPrivateQaFiniteConfirmationMaterial} from './mcp-qa-finite-confirmation-source.mjs';
import {readPrivateQaFinitePlan} from './mcp-qa-finite-trial-control.mjs';
import {createPrivateQaFiniteLaunchParent} from './mcp-qa-finite-launch-inventory.mjs';
import {validateReleaseOperatorBundle} from './mcp-release-operator-policy.mjs';
import {runKnownCancellationReleaseWorkflow} from './mcp-release-runtime.mjs';
import {finiteFields as fields,finiteHex as hex,finiteTime as time,finiteSame as same} from './mcp-finite-evidence.mjs';
const fail=()=>{throw Error('Finite confirmation unavailable');};
const nativeDateTime=Date.prototype.getTime;
const hash=s=>createHash('sha256').update(s).digest('hex');
const executionKeys=['intentId','finitePlanHash','controlHash','sourceRevision','qaVersionId','actorId','launcherId','nominalId','bundleHash','preparedHash','sendHash','bindingHash','createdAt'];
const pending=()=>({status:'blocked',mayRetry:false,operationalReadiness:false});
/** Facts-only parser. expectedExecution is the SOURCE-INTERNAL correlated
 * context, never RPC authority. No status here attests terminal/physical stop. */
export function validatePrivateQaFiniteConfirmationResult(value,expectedExecution){
 const seen=new Set();let nodes=0;
 const ownData=v=>{
  if(++nodes>4096)fail();
  if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return;
  if(typeof v==='string'){if(Buffer.byteLength(v)>65536)fail();return;}
  if(!v||typeof v!=='object'||seen.has(v)||seen.size>=16||Object.getPrototypeOf(v)!==(Array.isArray(v)?Array.prototype:Object.prototype))fail();
  seen.add(v);
  const keys=Reflect.ownKeys(v);
  if(Array.isArray(v)&&(keys.length!==v.length+1||!Number.isSafeInteger(v.length)||v.length>4096))fail();
  for(const k of keys){
   if(Array.isArray(v)&&k==='length')continue;
   const d=Object.getOwnPropertyDescriptor(v,k);
   if(typeof k!=='string'||['__proto__','constructor','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value')||Array.isArray(v)&&(!/^(0|[1-9][0-9]*)$/.test(k)||Number(k)>=v.length))fail();
   ownData(d.value);
  }seen.delete(v);
 };
 ownData(value);if(Buffer.byteLength(JSON.stringify(value))>65536)fail();
 const e=fields(expectedExecution,executionKeys),r=fields(value,['purpose','provenance','result']),keys=executionKeys.filter(k=>!['actorId','launcherId'].includes(k)),provenance=fields(r.provenance,keys);
 if(!hex(e.sourceRevision,40)||!time(e.createdAt)||['finitePlanHash','controlHash','actorId','bundleHash','preparedHash','sendHash','bindingHash'].some(k=>!hex(e[k]))||!(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/).test(e.qaVersionId)||e.launcherId!==finiteLauncherInstanceId({intentId:e.intentId,sourceRevision:e.sourceRevision})||e.nominalId!=='afw-release-'+e.bundleHash)fail();
 if(r.purpose!=='afw.finite-confirmation-result.v1'||keys.some(k=>provenance[k]!==e[k])||!r.result||Object.getPrototypeOf(r.result)!==Object.prototype)fail();
 return value;
}
/** Original event enters once; hydration spends its original70s envelope. The
 * existing Known wrapper owns all eighteen business stages and cancellation. */
export async function runPrivateQaFiniteConfirmation({env,event,step}){
 let timer,active=true;
 try{
  const entered=Date.now(),timestamp=event.timestamp,createdAt=Reflect.apply(nativeDateTime,timestamp,[]),payload=event.payload,instanceId=event.instanceId,workflowName=event.workflowName;
  const input=fields(payload,['planHash']),bundleHash=input.planHash,version=env.AFW_QA_VERSION?.id,namespace=env.AFW_INDEPENDENT_CLOSURE,stepDo=step?.do;
  if(!time(entered)||!time(createdAt)||createdAt>entered||entered>=createdAt+70000||!hex(bundleHash)||instanceId!=='afw-release-'+bundleHash||event.schedule!==undefined||workflowName!==undefined&&workflowName!=='afw-own-qa-private-confirmation'||typeof stepDo!=='function')fail();
  const parent=createPrivateQaFiniteLaunchParent({deadline:Math.min(entered+5000,createdAt+70000)});
  const check=()=>{
   const at=parent.check();
   if(!active||event.timestamp!==timestamp||Reflect.apply(nativeDateTime,timestamp,[])!==createdAt||event.payload!==payload||fields(payload,['planHash']).planHash!==bundleHash||event.instanceId!==instanceId||event.schedule!==undefined||event.workflowName!==workflowName||env.AFW_QA_VERSION?.id!==version||env.AFW_INDEPENDENT_CLOSURE!==namespace||step.do!==stepDo)fail();
   return at;
  };
  const inspect=value=>{
   const m=fields(value,['bundle','plan','execution']),{plan:p,planHash}=readPrivateQaFinitePlan(m.plan),e=fields(m.execution,executionKeys);
   validateReleaseOperatorBundle(m.bundle);
   if(m.bundle.policy.operation!=='confirm_named'||hash(JSON.stringify(m.bundle))!==bundleHash||e.bundleHash!==bundleHash||p.bundleHash!==bundleHash||e.nominalId!==instanceId||p.workflows.confirmation!==instanceId||e.createdAt!==createdAt||createdAt<p.launchPolicy.launchAt||createdAt>p.launchPolicy.lastCreateAt)fail();
   if(e.intentId!==p.intentId||e.finitePlanHash!==planHash||e.sourceRevision!==p.source.revision||e.qaVersionId!==version||p.deployments.qaLive.versionId!==version||e.actorId!==p.resources.actorId||namespace.idFromName('afw-own-successor-closure-v1').toString()!==e.actorId||e.launcherId!==p.workflows.launcher||['controlHash','preparedHash','sendHash','bindingHash'].some(k=>!hex(e[k])))fail();
   const binding={accountId:'85d0d5dadac3341a564f22ce885e9eec',bindingName:'AFW_QA_NAMED_CONFIRMATION',className:'PrivateQaNamedConfirmation',definitionName:'afw-own-qa-private-confirmation',qaVersionId:version,scriptName:'agent-friendly-web-independent-closure-qa',sourceModuleHash:p.source.moduleHash,sourceProfileHash:p.source.profileHash,sourceRevision:p.source.revision};
   if(e.bindingHash!==hash('afw.finite-native-child-binding.v1\n'+JSON.stringify(Object.fromEntries(Object.keys(binding).sort().map(k=>[k,binding[k]])))))fail();
   const at=check();if(at>=Math.min(p.N1,p.selectors.expiresAt,m.bundle.policy.expiresAt)||at<m.bundle.policy.startAt)fail();
   return {m,p,e};
  };
  const material=await Promise.race([(async()=>{
   check();const first=inspect(await readPrivateQaFiniteConfirmationMaterial({env,event,step,parent}));check();
   // Re-read fixed current source/owner/consent immediately before handoff.
   const second=inspect(await readPrivateQaFiniteConfirmationMaterial({env,event,step,parent}));check();
   if(!same(first.m,second.m))fail();return first;
  })(),new Promise((_,reject)=>{timer=setTimeout(()=>{active=false;reject(Error('Finite confirmation unavailable'));},parent.deadline-entered);})]);
  check();clearTimeout(timer);
  const {m,e}=material,provenance=Object.fromEntries(executionKeys.filter(k=>!['actorId','launcherId'].includes(k)).map(k=>[k,e[k]]));
  // Do not copy event/env/step, add a fifth argument, reset its timestamp or
  // introduce a stage into Known. Its end is original event.timestamp+70000.
  const result=await runKnownCancellationReleaseWorkflow({bundle:m.bundle,env,event,step});
  if(result===undefined||result===null)fail();
  return validatePrivateQaFiniteConfirmationResult({purpose:'afw.finite-confirmation-result.v1',provenance,result},e);
 }catch{return pending();}
 finally{active=false;clearTimeout(timer);}
}
