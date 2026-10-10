import {validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
import {validateOccurrenceApproval} from './assistance-occurrence-approvals.mjs';
import {computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
const ORIGIN='https://github.com/tokenizartinfo-ops/agent-friendly-web.git';
const hash=v=>typeof v==='string'&&/^[0-9a-f]{64}$/.test(v);
const uuid=v=>typeof v==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(v);
const locator=v=>typeof v==='string'&&/^[A-Za-z0-9_-]{1,512}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const fail=()=>{throw Error('Original execution unavailable');};
const exact=(v,keys)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
function copy(v,depth=0,budget={left:4096}){
 if(depth>12||--budget.left<0)fail();if(v===null||typeof v==='boolean'||(typeof v==='number'&&Number.isFinite(v)))return v;
 if(typeof v==='string'){if(v.length>8192)fail();return v;}
 const array=Array.isArray(v);if(!v||(!array&&Object.getPrototypeOf(v)!==Object.prototype)||(array&&Object.getPrototypeOf(v)!==Array.prototype))fail();
 const keys=Reflect.ownKeys(v);if(keys.length>(array?257:32)||(array&&(v.length>256||keys.length!==v.length+1)))fail();const out=array?[]:{};
 for(const key of keys){if(array&&key==='length')continue;const d=Object.getOwnPropertyDescriptor(v,key);if(typeof key!=='string'||!d?.enumerable||!Object.hasOwn(d,'value')||(array&&!/^(0|[1-9][0-9]*)$/.test(key)))fail();Object.defineProperty(out,key,{value:copy(d.value,depth+1,budget),enumerable:true});}
 if(array&&out.length!==v.length)fail();return Object.freeze(out);
}
function canonical(command){
 if(typeof command!=='string')fail();for(const quote of ["'",'"']){const prefix='/bin/bash -lc '+quote;if(command.startsWith(prefix)&&command.endsWith(quote)){const body=command.slice(prefix.length,-1);if(body.includes(quote)||/[\\$`\n\r]/.test(body))fail();return body;}}
 return command;
}
async function commandDigest(command){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(command))),v=>v.toString(16).padStart(2,'0')).join('');}
/** Internal host adapter, not authentication. readThread resolves an original
 * bounded administrative page; stdout supplies only a primary receipt locator. */
export function createPrivateOriginalExecutionReader({readPins,readThread,now=Date.now,timeoutMs=5000,maxAgeMs=30000}={}){
 if(![readPins,readThread,now].every(f=>typeof f==='function')||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>10000||!Number.isSafeInteger(maxAgeMs)||maxAgeMs<1||maxAgeMs>600000)fail();let last=-1;
 return Object.freeze({async read(input){let timer,active=true;const controller=new AbortController(),wall=performance.now()+timeoutMs;try{
  input=copy(input);if(!exact(input,['recordRef','turnId','commandItemId'])||!hash(input.recordRef)||!uuid(input.turnId)||!locator(input.commandItemId))fail();let start=0,deadline=8640000000000000;
  const clock=()=>{const at=now();if(!active||controller.signal.aborted||performance.now()>=wall||!time(at)||at<last||at<start||at>=deadline)fail();last=at;return at;};
  const read=async(fn,args)=>{clock();const result=copy(await fn(Object.freeze({...args,signal:controller.signal})));clock();return result;};
  const work=async()=>{
   const pins=await read(readPins,{recordRef:input.recordRef});if(!exact(pins,['registration','approval','cloud'])||!exact(pins.cloud,['threadId','environmentId','cwd','commandDigest'])||!uuid(pins.cloud.threadId)||!locator(pins.cloud.environmentId)||typeof pins.cloud.cwd!=='string'||!/^\/[A-Za-z0-9_./-]{1,512}$/.test(pins.cloud.cwd)||pins.cloud.cwd.split('/').includes('..')||!hash(pins.cloud.commandDigest))fail();
   const approval=validateOccurrenceApproval(pins.approval),registration=await validateQaClosureApproval(pins.registration,approval);clock();start=Math.max(registration.provisioning.createdAt,approval.manifest.startAt);deadline=registration.plan.closeAt;if(registration.plan.baselineRef!==input.recordRef)fail();clock();
   const original=await read(readThread,{threadId:pins.cloud.threadId,turnId:input.turnId,includeOutputs:true,maxOutputCharsPerItem:4096});
   if(original.schemaVersion!==1||original.thread?.id!==pins.cloud.threadId||original.thread.kind!=='codex'||original.thread.hostId!=='durable'||!Array.isArray(original.turns))fail();const turns=original.turns.filter(t=>t.id===input.turnId);if(turns.length!==1)fail();const turn=turns[0];
   const began=turn.startedAt*1000,ended=turn.completedAt*1000,at=clock();const dated=t=>time(t)&&t>=start&&t<=at&&at-t<=maxAgeMs;
   if(turn.status!=='completed'||turn.error!==null||!Number.isSafeInteger(turn.startedAt)||!Number.isSafeInteger(turn.completedAt)||!dated(began)||!dated(ended)||began>ended||!Array.isArray(turn.items))fail();
   const challenge='node scripts/afw-private-challenge-client.mjs confirm '+input.recordRef+' '+approval.manifest.startAt+' '+deadline;
   const probes=['git rev-parse HEAD','git remote get-url origin','git status --porcelain --untracked-files=all'];const relevant=[];const ids=new Set();
   for(const item of turn.items){if(item.type!=='commandExecution')continue;if(!locator(item.id)||ids.has(item.id))fail();ids.add(item.id);const cmd=canonical(item.command);if(probes.includes(cmd)||item.id===input.commandItemId)relevant.push({item,cmd});}
   const expected=[...probes,challenge,...probes];if(relevant.length!==7)fail();
   for(let i=0;i<7;i++){const {item,cmd}=relevant[i];if(cmd!==expected[i]||item.cwd!==pins.cloud.cwd||item.status!=='completed'||item.exitCode!==0||!item.output||item.output.truncated!==false||typeof item.output.text!=='string'||item.output.text.length>4096)fail();if(i!==3){const out=item.output.text;if(cmd===probes[0]&&out.trim()!==approval.manifest.sourceRevision)fail();if(cmd===probes[1]&&out.trim()!==ORIGIN)fail();if(cmd===probes[2]&&out!=='')fail();}}
   const execution=relevant[3].item;if(execution.id!==input.commandItemId||await commandDigest(execution.command)!==pins.cloud.commandDigest)fail();clock();const receipt=copy(JSON.parse(execution.output.text));
   if(!exact(receipt,['contract','state','recordRef','receiptRef','issuedAt','deadline','consumedAt'])||receipt.contract!=='afw-private-custody-challenge/v1'||receipt.state!=='confirmed'||receipt.recordRef!==input.recordRef||!hash(receipt.receiptRef)||receipt.deadline!==deadline||!dated(receipt.issuedAt)||!dated(receipt.consumedAt)||receipt.issuedAt>receipt.consumedAt||receipt.issuedAt<began||receipt.consumedAt>ended||receipt.consumedAt>=deadline)fail();
   const sourceRef=await computeAdministrativeResultDigest({threadId:pins.cloud.threadId,turnId:input.turnId,began,ended,items:relevant.map(({item,cmd})=>({id:item.id,command:cmd})),commandDigest:pins.cloud.commandDigest,sourceRevision:approval.manifest.sourceRevision,origin:ORIGIN,checkoutClean:true,receipt});clock();const pinsDigest=await computeAdministrativeResultDigest(pins);clock();const finalPins=await read(readPins,{recordRef:input.recordRef});if(await computeAdministrativeResultDigest(finalPins)!==pinsDigest)fail();const observedAt=clock();if(observedAt-Math.min(began,ended,receipt.issuedAt,receipt.consumedAt)>maxAgeMs)fail();
   return {source:'official-thread-command',sourceRef,observedAt,threadId:pins.cloud.threadId,turnId:input.turnId,commandItemId:input.commandItemId,commandDigest:pins.cloud.commandDigest,cwd:pins.cloud.cwd,turnStartedAt:began,turnCompletedAt:ended,exitCode:0,sourceRevision:approval.manifest.sourceRevision,origin:ORIGIN,checkoutClean:true,recordRef:input.recordRef,receiptRef:receipt.receiptRef};
  };
  return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>{active=false;controller.abort();resolve(null);},timeoutMs);})]);
 }catch{return null;}finally{active=false;controller.abort();clearTimeout(timer);}}});
}
