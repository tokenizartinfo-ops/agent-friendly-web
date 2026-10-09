import {validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
import {computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
const SHA=/^[0-9a-f]{64}$/;
const exact=(v,keys)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return d?.enumerable&&Object.hasOwn(d,'value');});
const unavailable=()=>({contract:'afw-private-qa-observation/v1',state:'unavailable'});
/** Private control-plane history reader. Observation never renews authority,
 * registers pins, consumes a nonce or writes a Workflow step checkpoint. */
export function createPrivateQaObservation({readHistory,readChallenge,now=Date.now,timeoutMs=5000}={}){
 return Object.freeze({async run(params){let timer;try{
  if(typeof params==='string'){if(params.length>256)return unavailable();params=JSON.parse(params);}
  if(!exact(params,['operation','recordRef'])||params.operation!=='observe'||typeof params.recordRef!=='string'||!SHA.test(params.recordRef)||typeof readHistory!=='function'||typeof readChallenge!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>10000)return unavailable();
  const recordRef=params.recordRef;let last=-1;
  const clock=()=>{const t=now();if(!Number.isSafeInteger(t)||t<0||t>8640000000000000||t<last)throw Error('Unavailable');last=t;return t;};
  const read=async()=>{clock();const p=await readHistory();clock();if(!exact(p,['registration','approval']))throw Error('Unavailable');const r=await validateQaClosureApproval(p.registration,p.approval);clock();if(r.plan.baselineRef!==recordRef||clock()<r.provisioning.createdAt)throw Error('Unavailable');return {r,digest:await computeAdministrativeResultDigest(p)};};
  const work=async()=>{
   const before=await read();clock();const value=await readChallenge();const observedAt=clock();let challenge=null;
   if(value!==null){
    const hasConsumed=Object.hasOwn(value,'consumedAt');
    const keys=['contract','state','recordRef','receiptRef','issuedAt','deadline',...(hasConsumed?['consumedAt']:[])];
    if(!exact(value,keys)||value.contract!=='afw-private-custody-challenge/v1'||!['issued','confirmed','withdrawn'].includes(value.state)||value.recordRef!==recordRef||typeof value.receiptRef!=='string'||!SHA.test(value.receiptRef)||!Number.isSafeInteger(value.issuedAt)||value.issuedAt<before.r.provisioning.createdAt||value.issuedAt>=value.deadline||value.issuedAt>observedAt||value.deadline!==before.r.plan.closeAt||(value.state==='confirmed'&&!hasConsumed)||(value.state==='issued'&&hasConsumed)||(hasConsumed&&(!Number.isSafeInteger(value.consumedAt)||value.consumedAt<value.issuedAt||value.consumedAt>=value.deadline||value.consumedAt>observedAt)))throw Error('Unavailable');
    challenge=Object.fromEntries(keys.map(k=>[k,value[k]]));
   }
   const after=await read();clock();if(before.digest!==after.digest)throw Error('Unavailable');
   return {contract:'afw-private-qa-observation/v1',state:'observed',recordRef,challenge};
  };
  return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>resolve(unavailable()),timeoutMs);})]);
 }catch{return unavailable();}finally{clearTimeout(timer);}}});
}
