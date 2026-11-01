import {finiteHash} from '../lib/mcp-finite-evidence.mjs';
import {nominalFixture} from './fixtures/finite-nominal-control.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
const api=await import('../lib/mcp-own-finite-admission-gate.mjs').catch(()=>({}));
function fixture(){
 let at=1000,alarm=null,chain=Promise.resolve(),lost=false;
 const rows=new Map();
 const storage={get:async k=>structuredClone(rows.get(k)),transaction(fn){const work=chain.then(async()=>{const copy=new Map(rows);const result=await fn({get:async k=>structuredClone(copy.get(k)),put:async(k,v)=>copy.set(k,structuredClone(v)),list:async({prefix})=>new Map([...copy].filter(([k])=>k.startsWith(prefix))),setAlarm:async v=>{alarm=v;}});rows.clear();for(const [k,v]of copy)rows.set(k,v);if(lost){lost=false;throw Error('lost ACK');}return result;});chain=work.catch(()=>{});return work;}};
 const identity={intentId:'finite-1',controlHash:'1'.repeat(64),planHash:'2'.repeat(64),containerId:'3'.repeat(64),applicationId:'d6fc71552de7494a863aca20365a572d',grantHash:'4'.repeat(64),trialId:'5'.repeat(64),sourceRevision:'6'.repeat(40),runtimeVersionId:'22222222-2222-4222-8222-222222222222',T0:1000,N1:301000,C1:421000};
 const primary={reservation:async()=>null,admission:async()=>null,launch:async()=>null};
 const nominal=nominalFixture(identity);const options={storage,identity,readPrimary:primary,readNominalControl:async()=>({...nominal.value,observedAt:at,ownedWriters:['reservation','admission','launch'].filter(k=>rows.get('afw.own-finite-admission.v1:head')?.writers[k]).map(kind=>{const w=rows.get('afw.own-finite-admission.v1:head').writers[kind];return {intentId:identity.intentId,controlHash:identity.controlHash,actorId:identity.containerId,kind,claimHash:finiteHash(w.claim),phase:w.settlement===null?'issued':'settled'};})}),nominalIdentity:nominal.nominalIdentity,now:()=>at,timeoutMs:1000};
 return {options,identity,primary,rows,setTime:v=>{at=v;},lose:()=>{lost=true;},get alarm(){return alarm;}};
}
test('finite gate factory required',()=>assert.equal(typeof api.createFiniteAdmissionGate,'function'));
test('seal persists independently and blocks every new fixed writer after reconstruction',async()=>{
 const f=fixture(),g=api.createFiniteAdmissionGate(f.options);
 assert.equal((await g.seal()).status,'sealed');
 for(const k of ['beginReservation','beginAdmission','beginLaunch'])assert.equal((await g[k]()).status,'blocked');
 const rebuilt=api.createFiniteAdmissionGate(f.options);assert.equal((await rebuilt.read()).sealed,true);
 assert.equal((await rebuilt.beginAdmission()).status,'blocked');
});
test('issued reservation remains unresolved across seal, reconstruction and empty primary',async()=>{
 const f=fixture(),g=api.createFiniteAdmissionGate(f.options);
 assert.equal((await g.beginReservation()).status,'issued');assert.equal((await g.beginReservation()).status,'reconcile_only');
 await g.seal();assert.equal((await g.settleReservation()).status,'admin_pending');
 const read=await api.createFiniteAdmissionGate(f.options).read();assert.equal(read.unresolvedWriters,1);assert.equal(read.launchNeverIssued,true);
});
test('launch marker is durable before runtime can be called and never becomes never-issued',async()=>{
 const f=fixture(),g=api.createFiniteAdmissionGate(f.options);
 assert.equal((await g.beginLaunch()).status,'issued');await g.seal();
 assert.equal((await g.read()).launchNeverIssued,false);
});
test('lost seal ACK cannot authorize no-admission without independent exact readback',async()=>{
 const f=fixture(),g=api.createFiniteAdmissionGate(f.options);f.lose();
 assert.equal((await g.seal()).status,'uncertain');
 assert.equal((await g.read()).sealed,true);assert.equal((await g.seal()).status,'reconcile_only');
});
test('original deadlines reject first effect, preserve claims and permit read only recovery',async()=>{
 const f=fixture(),g=api.createFiniteAdmissionGate(f.options);await g.beginAdmission();
 f.setTime(f.identity.N1);assert.equal((await g.beginLaunch()).status,'blocked');
 f.setTime(f.identity.C1);assert.equal((await g.seal()).status,'blocked');
 assert.equal((await g.read()).unresolvedWriters,1);
});
test('constructor rejects replacement intent and never resets retained gate',async()=>{
 const f=fixture();await api.createFiniteAdmissionGate(f.options).seal();
 const options={...f.options,identity:{...f.identity,intentId:'replacement'}};
 assert.equal((await api.createFiniteAdmissionGate(options).read()).status,'blocked');
});

test('narrow writer deadline survives reconstruction while settlement keeps original C1',async()=>{
 const {finiteWriterFixture}=await import('./fixtures/finite-admission-gate.mjs');let at=1000;
 const f=finiteWriterFixture({now:()=>at,deadline:2000});
 f.primary.reservation=async({identityHash,claimHash})=>({purpose:'afw.own-finite-admission.v1:settled',identityHash,kind:'reservation',claimHash,primaryRowHash:'a'.repeat(64),settledAt:at});
 const g=api.createFiniteAdmissionGate(f.options),begun=await g.beginReservation();
 assert.equal(begun.status,'issued');assert.equal(begun.claim.deadline,2000);
 at=2000;const restored=api.createFiniteAdmissionGate(f.options);assert.equal((await restored.beginLaunch()).status,'blocked');
 assert.equal((await restored.read()).writers.reservation.claim.deadline,2000);
 assert.equal((await restored.settleReservation()).status,'settled');
 assert.equal((await restored.read()).unresolvedWriters,0);
});
