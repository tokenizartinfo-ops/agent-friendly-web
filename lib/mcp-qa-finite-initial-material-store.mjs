import {randomBytes,randomUUID} from 'node:crypto';
import {initialHash,initialFields,encodeFiniteInitialMaterialRecord as encode,decodeFiniteInitialMaterialRecord as decode,hashFiniteInitialMaterialRecord as hash} from './mcp-qa-finite-initial-material-records.mjs';
import {retainFiniteOwnerStagePromise as track} from './mcp-qa-finite-stage-work.mjs';
const PREFIX='afw.finite-initial-preparation.v1:',HEAD='afw.qa-finite-trial.v1:head';
const fail=()=>{throw Error('Finite initial storage unavailable');};
const check=l=>{initialFields(l,['signal','assertCurrent']);if(!(l.signal instanceof AbortSignal)||l.signal.aborted)fail();l.assertCurrent();};
const seal=(kind,value,key)=>decode(kind,encode(kind,{...value,[key]:hash(kind,value)}));
/** Private factual append-only storage, never permission/admission. */
export function createFiniteInitialMaterialStore({storage}){
 const transaction=storage?.transaction,get=storage?.get;if(typeof transaction!=='function'||typeof get!=='function')fail();
 const current=l=>{check(l);if(storage.transaction!==transaction||storage.get!==get)fail();};
 const read=async(key,kind,l)=>{current(l);const raw=await track(Reflect.apply(get,storage,[key]));current(l);return raw===undefined?null:decode(kind,raw);};
 const tx=async(l,fn)=>{current(l);const result=await track(Reflect.apply(transaction,storage,[async t=>{
  current(l);const tg=t.get,tp=t.put;if(typeof tg!=='function'||typeof tp!=='function')fail();
  const guard=()=>{current(l);if(t.get!==tg||t.put!==tp)fail();};
  const io={async get(k){guard();const v=await Reflect.apply(tg,t,[k]);guard();return v;},async put(k,kind,v){guard();await Reflect.apply(tp,t,[k,encode(kind,v)]);guard();}};
  const out=await fn(io);guard();return out;
 }]));current(l);return result;};
 return Object.freeze({
  async available(l){current(l);const result=await tx(l,async io=>{
   for(const key of [PREFIX+'once',PREFIX+'selector',PREFIX+'ack',HEAD])if(await io.get(key)!==undefined)return false;return true;
  });current(l);return result;},
  async claim(intent,commandHash,deadline,l){
   let allocated=null;
   const record=await tx(l,async io=>{
    for(const key of [PREFIX+'once',PREFIX+'selector',PREFIX+'ack',HEAD])if(await io.get(key)!==undefined)fail();
    // Memoize allocation within this original call, including platform callback
    // re-entry. A caller retry never reaches this point after a durable claim.
    allocated??={preconnectionId:randomBytes(32).toString('hex'),trialId:randomBytes(32).toString('hex'),activationKey:randomBytes(32).toString('hex'),withdrawalRequestId:randomUUID(),saveIdempotencyKey:randomUUID()};
    const v=seal('InitialClaim',{purpose:'afw.finite-initial-claim.v1',intent,commandHash,ids:allocated,claimedAt:Date.now(),deadline},'claimHash');
    await io.put(PREFIX+'once','InitialClaim',v);return v;
   });
   const observed=await read(PREFIX+'once','InitialClaim',l);
   if(encode('InitialClaim',observed)!==encode('InitialClaim',record))fail();return record;
  },
  async publish(claim,material,l){
   const m=decode('InitialMaterial',encode('InitialMaterial',material)),intentHash=initialHash('afw.finite-initial-intent.v1',claim.intent);
   if(m.claimHash!==claim.claimHash||m.preconnectionId!==claim.ids.preconnectionId||initialHash('intent',m.intent)!==initialHash('intent',claim.intent))fail();
   const o=m.originalContext;if(o.trialId!==claim.ids.trialId||o.publication.activationKey!==claim.ids.activationKey||o.withdrawalRequestId!==claim.ids.withdrawalRequestId||o.saveIdempotencyKey!==claim.ids.saveIdempotencyKey)fail();
   const selector={purpose:'afw.finite-initial-selector.v1',intentHash,claimHash:claim.claimHash,materialHash:m.materialHash,sourceRevision:claim.intent.sourceRevision,qaVersionId:claim.intent.qaVersionId,preconnectionId:claim.ids.preconnectionId};
   const key=PREFIX+'material:'+m.materialHash;
   await tx(l,async io=>{
    if(await io.get(HEAD)!==undefined||await io.get(PREFIX+'once')!==encode('InitialClaim',claim))fail();
    for(const k of [key,PREFIX+'selector',PREFIX+'ack'])if(await io.get(k)!==undefined)fail();
    await io.put(key,'InitialMaterial',m);await io.put(PREFIX+'selector','InitialSelector',selector);
   });
   // Only THIS actual transaction ACK can create this factual witness.
   current(l);const acknowledgedAt=Date.now();if(acknowledgedAt>=claim.deadline)fail();
   const ack={purpose:'afw.finite-initial-material-ack.v1',intentHash,claimHash:claim.claimHash,materialHash:m.materialHash,selectorHash:hash('InitialSelector',selector),acknowledgedAt};
   await tx(l,async io=>{
    if(await io.get(HEAD)!==undefined||await io.get(PREFIX+'once')!==encode('InitialClaim',claim)||await io.get(key)!==encode('InitialMaterial',m)||await io.get(PREFIX+'selector')!==encode('InitialSelector',selector)||await io.get(PREFIX+'ack')!==undefined)fail();
    await io.put(PREFIX+'ack','InitialAck',ack);
   });
   for(const[k,kind,v]of [[PREFIX+'once','InitialClaim',claim],[key,'InitialMaterial',m],[PREFIX+'selector','InitialSelector',selector],[PREFIX+'ack','InitialAck',ack]]){
    if(encode(kind,await read(k,kind,l))!==encode(kind,v))fail();
   }
   current(l);return m;
  }
 });
}
