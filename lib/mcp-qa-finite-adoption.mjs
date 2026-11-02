import {createHash} from 'node:crypto';
import {finiteFields as fields,finiteData as data,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';
import {finiteUuid} from './mcp-qa-finite-external-contract.mjs';
const fail=()=>{throw Error('Finite adoption unavailable');};
const adoptionParents=new WeakMap();
const sorted=v=>Array.isArray(v)?v.map(sorted):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
const canonical=v=>JSON.stringify(sorted(v)),hash=v=>createHash('sha256').update(v).digest('hex');
/** Read-only grammar for the fixed C2 source result. This validates correlation,
 * not authority; only the fixed unavailable-by-default producer supplies it. */
export function validatePrivateQaFiniteSetupCompletion(value,{intentId,sourceRevision,qaVersionId,seedHash,T0,now}){
 const r=fields(data(value),['receipt','instance','observedAt']),receipt=fields(r.receipt,['purpose','intentId','sourceRevision','setupInstanceId','qaVersionId','seedHash','contextHash','baselineVersionId','baselineDeploymentId','versionId','deploymentId','moduleHash','publicStaticHash','activationHash','restorationHash','bindingsHash','installedAt','receiptHash']);
 const {receiptHash,...body}=receipt,instanceId='afw-finite-policy-'+hash('afw.finite-private-policy-setup.v1\n'+canonical({intentId,sourceRevision}));
 if(Buffer.byteLength(JSON.stringify(receipt))>8192||receipt.purpose!=='afw.finite-policy-installed.v1'||receipt.intentId!==intentId||receipt.sourceRevision!==sourceRevision||receipt.qaVersionId!==qaVersionId||receipt.seedHash!==seedHash||receipt.setupInstanceId!==instanceId||['contextHash','seedHash','moduleHash','publicStaticHash','activationHash','restorationHash','bindingsHash','receiptHash'].some(k=>!hex(receipt[k]))||['qaVersionId','baselineVersionId','baselineDeploymentId','versionId','deploymentId'].some(k=>!finiteUuid(receipt[k]))||receiptHash!==hash(receipt.purpose+'\n'+canonical(body)))fail();
 const i=fields(r.instance,['definitionName','instanceId','status','sourceRevision','qaVersionId','completedAt','outputHash']);
 if(i.definitionName!=='afw-own-qa-private-bootstrap'||i.instanceId!==instanceId||i.status!=='complete'||i.sourceRevision!==sourceRevision||i.qaVersionId!==qaVersionId||i.outputHash!==hash(canonical({status:'installed',receipt})))fail();
 if(!time(receipt.installedAt)||receipt.installedAt<T0||receipt.installedAt>T0+50000||!time(i.completedAt)||i.completedAt<receipt.installedAt||!time(r.observedAt)||r.observedAt<i.completedAt||r.observedAt>now||now-r.observedAt>5000||i.completedAt>T0+50000)fail();
 return r;
}
/** One original adoption parent, before ANY remote work. Child slots may narrow
 * their timer but can never move this deadline or reset its monotonic origin. */
export function createFiniteAdoptionParent({T0,N1,now=Date.now,signal}){
 const entered=now(),mono=performance.now(),deadline=Math.min(T0+70000,N1-180000),controller=new AbortController();
 let last=entered,lastMono=mono,closed=false,timer;
 const check=()=>{const at=now(),m=performance.now();if(closed||signal.aborted||controller.signal.aborted||!time(at)||at<T0||at<last||at>=deadline||!Number.isFinite(m)||m<lastMono||m-mono>=deadline-entered)fail();last=at;lastMono=m;return at;};
 const stop=()=>controller.abort();check();signal.addEventListener('abort',stop,{once:true});timer=setTimeout(stop,deadline-entered);
 const parent=Object.freeze({check,signal:controller.signal,deadline});adoptionParents.set(parent,stop);
 return Object.freeze({parent,close(){closed=true;adoptionParents.delete(parent);clearTimeout(timer);signal.removeEventListener('abort',stop);controller.abort();}});
}
/** Slots are absolute. No catch-up burst and no retry of unqualified failure.
 * The fixed observer adapter alone classifies exact absence/pending previews. */
export async function waitForFiniteObserverAdoption({parent,T0,observer,sleep,now=Date.now}){
 const cancel=adoptionParents.get(parent);if(!cancel)fail();
 for(let k=0;k<36;k++){
  const target=T0+2000*k,at=parent.check();
  if(target<at)continue;
  if(target>at){await sleep(target-at);parent.check();}
  const began=parent.check();if(began<target)fail();if(began>=target+2000)continue;
  const mono=performance.now(),end=Math.min(parent.deadline,began+5000);
  let timer,active=true;
  const child=new AbortController(),stop=()=>child.abort();
  parent.signal.addEventListener('abort',stop,{once:true});
  const check=()=>{parent.check();if(!active||child.signal.aborted||now()>=end||performance.now()-mono>=end-began)fail();};
  try{
   const observed=await Promise.race([(async()=>{check();const value=await observer.adopt(parent,child.signal,check);check();return value;})(),new Promise((_,reject)=>{timer=setTimeout(()=>{active=false;cancel();child.abort();reject(Error('Finite adoption unavailable'));},end-began);})]);
   check();if(observed.status==='ready')return observed.preview;
   if(!['not_yet_observed','preview_pending'].includes(observed.status))fail();
  }finally{active=false;clearTimeout(timer);parent.signal.removeEventListener('abort',stop);child.abort();}
 }fail();
}
