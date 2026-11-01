import {createHash} from 'node:crypto';
const ROOT='afw.own-finite-admission.v1',KEY=ROOT+':head',KINDS=['reservation','admission','launch'];
const gates=new WeakMap(),releaseGates=new WeakMap();
const fail=()=>{throw Error('Finite admission unavailable');};
const hash=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex');
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function exact(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);}
const result=(status,extra={})=>Object.freeze({status,...extra,authorizesEffects:false,operationalReadiness:false});
/** INTERNAL fixed candidate-DO journal. A seal is not remote cancellation.
 * Any issued writer lacking its exact immutable settlement remains unresolved.
 * RPC adapters may expose only the fixed no-argument operations selected by the
 * native intent/control configuration; never accept a writer kind or receipt. */
export function createFiniteAdmissionGate(options){
 const keys=['storage','identity','readPrimary','now','timeoutMs'],o=exact(options,keys);
 const {storage,readPrimary,now,timeoutMs}=o;
 const identity=exact(o.identity,['intentId','controlHash','planHash','containerId','applicationId','grantHash','trialId','sourceRevision','runtimeVersionId','T0','N1','C1']);
 if(!/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(identity.intentId)||['controlHash','planHash','containerId','grantHash','trialId'].some(k=>!hex(identity[k]))||!hex(identity.sourceRevision,40)||['applicationId','runtimeVersionId'].some(k=>!(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/).test(identity[k]))||!time(identity.T0)||identity.N1!==identity.T0+300000||identity.C1!==identity.N1+120000||typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 const readers=exact(readPrimary,KINDS);if(KINDS.some(k=>typeof readers[k]!=='function'))fail();
 const transaction=storage.transaction,get=storage.get,identityHash=hash({purpose:ROOT,identity});let last=-1,invalid=false;
 function current(){const n=now();if(invalid||!time(n)||n<identity.T0||n<last||storage.transaction!==transaction||storage.get!==get||!same(exact(o.identity,Object.keys(identity)),identity)||keys.some(k=>options[k]!==o[k])||KINDS.some(k=>readPrimary[k]!==readers[k])){invalid=true;fail();}last=n;return n;}
 const claim=kind=>Object.freeze({purpose:ROOT+':writer',identityHash,kind,issuedAt:current(),deadline:identity.N1});
 function state(raw){
  if(raw===undefined)return null;
  const s=exact(raw,['purpose','identity','identityHash','seal','writers']);
  if(s.purpose!==ROOT||!same(s.identity,identity)||s.identityHash!==identityHash)fail();
  const writers=exact(s.writers,KINDS);
  if(s.seal!==null){const x=exact(s.seal,['purpose','identityHash','sealedAt']);if(x.purpose!==ROOT+':seal'||x.identityHash!==identityHash||!time(x.sealedAt)||x.sealedAt<identity.T0||x.sealedAt>=identity.C1||x.sealedAt>current())fail();}
  for(const kind of KINDS){const w=writers[kind];if(w===null)continue;
   exact(w,['claim','settlement']);const c=exact(w.claim,['purpose','identityHash','kind','issuedAt','deadline']);
   if(c.purpose!==ROOT+':writer'||c.identityHash!==identityHash||c.kind!==kind||!time(c.issuedAt)||c.issuedAt<identity.T0||c.issuedAt>=identity.N1||c.issuedAt>current()||c.deadline!==identity.N1)fail();
   if(w.settlement!==null)receipt(w.settlement,kind,c);
  }return s;
 }
 function receipt(value,kind,c){
  const r=exact(value,['purpose','identityHash','kind','claimHash','primaryRowHash','settledAt']);
  if(r.purpose!==ROOT+':settled'||r.identityHash!==identityHash||r.kind!==kind||r.claimHash!==hash(c)||!hex(r.primaryRowHash)||!time(r.settledAt)||r.settledAt<c.issuedAt||r.settledAt>current()||r.settledAt>=identity.C1)fail();return r;
 }
 function projection(s){return result('observed',{identity,identityHash,sealed:s?.seal!==null&&s!==null,seal:s?.seal??null,sealHash:s?.seal?hash(s.seal):null,writers:s?.writers??Object.fromEntries(KINDS.map(k=>[k,null])),unresolvedWriters:s?KINDS.filter(k=>s.writers[k]&&!s.writers[k].settlement).length:0,launchNeverIssued:!s?.writers.launch});}
 async function invoke(operation,kind){
  let issued=false,finished=false,timer;const entered=current(),mono=performance.now();
  const check=()=>{const n=current();if(finished||n-entered>=timeoutMs||performance.now()-mono>=timeoutMs)fail();if(operation==='begin'&&n>=identity.N1||['seal','settle'].includes(operation)&&n>=identity.C1)fail();return n;};
  const tx=fn=>transaction.call(storage,async t=>{check();const raw=await t.get(KEY);check();const s=state(raw);return fn(t,s);});
  const work=async()=>{
   check();if(operation==='read'){const raw=await get.call(storage,KEY);check();return projection(state(raw));}
   if(operation==='settle'){
    const raw=await get.call(storage,KEY);check();const before=state(raw),w=before?.writers[kind];if(!w)return result('blocked');
    if(w.settlement)return result('reconciled',{receipt:w.settlement});
    // Reader is fixed server code. It must prove the exact issued write's
    // durable terminal receipt, never infer settlement from row absence.
    const value=await readers[kind](Object.freeze({identityHash,claimHash:hash(w.claim)}));check();
    if(value===null)return result('admin_pending');
    const r=receipt(value,kind,w.claim);
    await tx(async(t,s)=>{if(!s||!same(s.writers[kind],w))fail();issued=true;await t.put(KEY,{...s,writers:{...s.writers,[kind]:{...w,settlement:r}}});check();});
    const after=state(await get.call(storage,KEY));check();if(!same(after?.writers[kind]?.settlement,r))fail();return result('settled',{receipt:r});
   }
   const value=await tx(async(t,s)=>{
    const next=s??{purpose:ROOT,identity,identityHash,seal:null,writers:Object.fromEntries(KINDS.map(k=>[k,null]))};
    if(operation==='seal'){
     if(next.seal)return result('reconcile_only',{sealHash:hash(next.seal)});
     const seal={purpose:ROOT+':seal',identityHash,sealedAt:check()};issued=true;await t.put(KEY,{...next,seal});check();return result('sealed',{sealHash:hash(seal)});
    }
    if(next.writers[kind])return result('reconcile_only',{claim:next.writers[kind].claim});
    if(next.seal)fail();
    const c=claim(kind);issued=true;await t.put(KEY,{...next,writers:{...next.writers,[kind]:{claim:c,settlement:null}}});check();return result('issued',{claim:c});
   });check();return value;
  };
  try{return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>{finished=true;resolve(result(issued?'uncertain':'blocked'));},timeoutMs);})]);}catch{return result(issued?'uncertain':'blocked');}finally{finished=true;clearTimeout(timer);}
 }
 const token=Object.freeze({
  beginReservation:()=>invoke('begin','reservation'),settleReservation:()=>invoke('settle','reservation'),
  beginAdmission:()=>invoke('begin','admission'),settleAdmission:()=>invoke('settle','admission'),
  beginLaunch:()=>invoke('begin','launch'),settleLaunch:()=>invoke('settle','launch'),
  seal:()=>invoke('seal'),read:()=>invoke('read')
 });
 gates.set(token,{identity,identityHash});return token;
}
/** Private module hooks; an arbitrary lookalike object is never a gate. */
export function requireFiniteAdmissionGate(gate){if(!gates.has(gate))fail();return gate;}
export function registerFiniteReleaseGate(env,gate){requireFiniteAdmissionGate(gate);if(!env||releaseGates.has(env))fail();releaseGates.set(env,gate);}
export function readFiniteReleaseGate(env){return releaseGates.get(env);}
