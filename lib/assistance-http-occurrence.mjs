import {createOperationsHttpTransport} from './operations-http-transport.mjs';
import {createOccurrenceTransportBudget} from './assistance-occurrence-transport-budget.mjs';
import {validateAssistanceSignal} from './assistance-supervision-contract.mjs';
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const fields=['occurrenceId','requestId','signal','sourceRevision','configId','publicationId','startAt','deadline','tokenExpiresAt','serverDeadline'];
const exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
const stamp=v=>Number.isSafeInteger(v)&&v>=0&&Number.isFinite(new Date(v).getTime());
const deny=()=>{throw Error('Occurrence stopped');};
const steps=[['control','create','create'],['operational','list','list'],['control','admitClaim','admit-claim'],['operational','claim','claim'],['control','admitFinish','admit-finish'],['operational','finish','finish']];
/** Internal finite runner. Host supplies actual fresh cloud observations; fixtures
 * do not prove readiness. Server owns approvals and global effect exclusion.
 * No checkpoint recovery, retries, customer context, scheduler or admin cleanup.
 */
export async function runAssistanceHttpOccurrence({manifest,planDigest,preflight,env,fetchImpl,now=Date.now}={}){
 const budget=createOccurrenceTransportBudget();let m,http,lease,phase='preflight',observations=0,last=-1,stopConfirmed=false;
 const time=()=>{const t=now();if(!stamp(t)||t<last)deny();last=t;return t;};
 const fits=()=>{const t=time();if(t<m.startAt||t+10000>=Math.min(m.deadline,m.tokenExpiresAt,m.serverDeadline,lease?.expiresAt??Infinity))deny();return t;};
 const cloud=(o,t)=>{
  if(!o||o.sourceRevision!==m.sourceRevision||o.configId!==m.configId||o.publicationId!==m.publicationId||o.origin!=='https://github.com/tokenizartinfo-ops/agent-friendly-web.git'||o.checkoutClean!==true||o.observationsCurrent!==true||o.networkMode!=='restricted'||o.networkEnforced!==true||o.operationsBindingsReady!==true||!Number.isSafeInteger(o.observationRevision)||o.observationRevision<1||o.observationRevision!==o.configurationRevision||!stamp(o.observedAt)||o.observedAt>t||t-o.observedAt>30000)deny();
 };
 const envelope=(r,p,sequence)=>{
  if(!exact(r,['version','occurrenceId','phase','sequence','planDigest','result'])||r.version!=='afw-occurrence-http-v1'||r.occurrenceId!==m.occurrenceId||r.phase!==p||r.planDigest!==planDigest||!Number.isSafeInteger(r.sequence)||(p==='stop'?(r.sequence<1||r.sequence>7):r.sequence!==sequence))deny();
  return r.result;
 };
 const observe=async()=>{
  let timer;const abort=new AbortController();
  try{
   return {...await Promise.race([preflight({signal:abort.signal}),new Promise((_,reject)=>{
    timer=setTimeout(()=>{abort.abort();reject(Error('Occurrence stopped'));},10000);
   })])};
  }finally{clearTimeout(timer);abort.abort();}
 };
 try{
  if(!exact(manifest,fields)||!['occurrenceId','requestId'].every(k=>typeof manifest[k]==='string'&&UUID.test(manifest[k]))||typeof manifest.sourceRevision!=='string'||!/^[0-9a-f]{40}$/.test(manifest.sourceRevision)||typeof manifest.configId!=='string'||!/^cecfg_[a-zA-Z0-9]{1,128}$/.test(manifest.configId)||typeof manifest.publicationId!=='string'||!/^cecfgver_[a-zA-Z0-9]{1,128}$/.test(manifest.publicationId)||!['startAt','deadline','tokenExpiresAt','serverDeadline'].every(k=>stamp(manifest[k]))||typeof planDigest!=='string'||!/^[0-9a-f]{64}$/.test(planDigest)||typeof preflight!=='function'||typeof now!=='function')deny();
  const signal=validateAssistanceSignal(manifest.signal);
  if(!Object.keys(signal).filter(k=>k!=='revision').every(k=>typeof signal[k]==='string'))deny();
  m={...manifest,signal:{...signal}};fits();if(Date.parse(signal.observedAt)>time())deny();
  http=createOperationsHttpTransport({env,fetchImpl,timeoutMs:10000});
  let outcome;
  for(let i=0;i<steps.length;i++){
   const [kind,p,path]=steps[i];phase=p;fits();observations++;
   const observed=await observe();cloud(observed,fits());
   await budget.send(kind,p,async()=>{
    cloud(observed,fits());
    const body={occurrenceId:m.occurrenceId,...(i?{expectedSequence:i}:{})};
    const reply=await http('/assistance/occurrences/'+path,body);
    cloud(observed,fits());const result=envelope(reply,p,i+1);
    if(p==='list'){
     if(!Array.isArray(result)||result.length!==1)deny();
     const selected=validateAssistanceSignal(result[0]);if(Object.keys(m.signal).some(k=>selected[k]!==m.signal[k]))deny();
    }else if(p==='claim'){
     if(!exact(result,['eventId','requestId','runId','expiresAt'])||result.eventId!==m.signal.eventId||result.requestId!==m.requestId||typeof result.runId!=='string'||!UUID.test(result.runId)||!stamp(result.expiresAt)||result.expiresAt>Math.min(m.deadline,m.tokenExpiresAt,m.serverDeadline,time()+300000))deny();
     lease={...result};fits();
    }else if(p==='finish'){
     if(!['intervention_required','superseded'].includes(result))deny();outcome=result;
    }else if(result!=='accepted')deny();
    cloud(observed,fits());
   });
  }
  return {status:'completed',outcome,...budget.snapshot(),observations};
 }catch{
  if(http&&budget.snapshot().total>0){
   try{
    const t=time();if(t<m.startAt||t+10000>=m.tokenExpiresAt)deny();
    await budget.send('control','stop',async()=>{
     const reply=await http('/assistance/occurrences/stop',{occurrenceId:m.occurrenceId,reason:'ambiguous_response'});
     if(envelope(reply,'stop')!=='stopped')deny();stopConfirmed=true;
    });
   }catch{ /* Lost closure reply is never recovered by another request. */ }
  }
  return {status:'stopped',phase,...budget.snapshot(),observations,stopConfirmed};
 }
}
