import test from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../lib/mcp-qa-arm-eligibility.mjs';
function fixture(){
 const at=Date.now();let sessions=0,reads=0;const f={answer:async()=>({eligible:1}),authorize:async()=>true,wall:at};
 const db={prepare(){throw Error('primary required');},withSession(mode){assert.equal(mode,'first-primary');sessions++;return{prepare(){return{bind(){return{first:async()=>{reads++;return f.answer();},run(){assert.fail('read-only must never run a statement');}};}};}};}};
 f.options=()=>({db,original:{containerId:'a'.repeat(64),processGeneration:'b'.repeat(64),programHash:'c'.repeat(64),sourceRevision:'d'.repeat(40),closedAt:at-50000},window:{grantId:'current',startAt:at-1000,expiresAt:at+60000},cancellationHistory:JSON.stringify({purpose:'afw.successor-known-cancellations.v1',currentGrant:{grantId:'current',consentSequence:1,consentRevision:1,issuedAt:at-1000,expiresAt:at+60000},cancellations:[]}),authorize:(...args)=>f.authorize(...args),now:()=>f.wall,timeoutMs:5000});
 Object.defineProperties(f,{sessions:{get:()=>sessions},reads:{get:()=>reads}});return f;
}
const make=(f,extra={})=>api.createPrivateQaArmEligibility({...f.options(),...extra});
test('each read opens a fresh primary session and returns only literal true',async()=>{
 const f=fixture(),r=make(f);assert.equal(await r.check(),true);assert.equal(await r.check(),true);assert.equal(f.sessions,2);assert.equal(f.reads,2);assert.equal(await r.check('foreign'),false);assert.equal(f.reads,2);
});
for(const result of [null,undefined,{}, {eligible:true},{eligible:'1'},{eligible:0},{eligible:1,extra:true}])test('unknown result stays false: '+JSON.stringify(result),async()=>{
 const f=fixture();f.answer=async()=>result;assert.equal(await make(f).check(),false);
});
for(const at of ['before','after'])test('explicit authorization required '+at+' primary read',async()=>{
 const f=fixture();let count=0;f.authorize=async()=>++count===(at==='before'?1:2)?{allowed:true}:true;assert.equal(await make(f).check(),false);assert.equal(f.reads,at==='before'?0:1);
});
test('binding drift before query blocks without fallback to ordinary prepare',async()=>{
 const f=fixture(),o=f.options();f.authorize=async()=>{o.db.withSession=()=>{throw Error('drift');};return true;};assert.equal(await api.createPrivateQaArmEligibility(o).check(),false);assert.equal(f.reads,0);
});
test('strict snapshots reject grant mismatch getters and oversized leases',()=>{
 const f=fixture(),o=f.options();let calls=0;const bad={...o};Object.defineProperty(bad,'window',{enumerable:true,get(){calls++;return o.window;}});
 for(const options of [bad,{...o,extra:true},{...o,timeoutMs:5001},{...o,window:{...o.window,grantId:'other'}},{...o,db:{prepare:o.db.prepare}},{...o,authorize:undefined}])assert.throws(()=>api.createPrivateQaArmEligibility(options));assert.equal(calls,0);
});
for(const stage of ['before','read','after'])test('hung '+stage+' check returns false and late completion cannot return true',async()=>{
 const f=fixture();let release;const gate=new Promise(resolve=>{release=resolve;});let calls=0;if(stage==='read')f.answer=()=>gate;else f.authorize=async()=>++calls===(stage==='before'?1:2)?gate:true;
 try{const promise=make(f,{timeoutMs:25}).check();const result=await Promise.race([promise,new Promise(resolve=>setTimeout(()=>resolve('hung'),180))]);assert.equal(result,false);const reads=f.reads;release(stage==='read'?{eligible:1}:true);await new Promise(resolve=>setTimeout(resolve,10));assert.equal(await promise,false);assert.equal(f.reads,reads);}
 finally{release(true);}
});
test('wall regression after primary response and expiry remain false',async()=>{
 const f=fixture(),at=f.wall;f.answer=async()=>{f.wall=at-1;return{eligible:1};};assert.equal(await make(f).check(),false);
 const g=fixture(),o=g.options();g.wall=o.window.expiresAt;assert.equal(await api.createPrivateQaArmEligibility(o).check(),false);assert.equal(g.reads,0);
});

for(const stage of ['before-read','after-read'])test('original wall deadline rejects forward jump '+stage+' while the grant remains live',async()=>{
 const f=fixture(),at=f.wall;if(stage==='before-read')f.authorize=async()=>{f.wall=at+5000;return true;};else f.answer=async()=>{f.wall=at+5000;return{eligible:1};};
 assert.equal(await make(f).check(),false);assert.equal(f.reads,stage==='before-read'?0:1);
});

test('primary reader rejects regression immediately after entry capture',async()=>{
 const f=fixture(),at=f.wall;let n=0;assert.equal(await make(f,{now:()=>++n===1?at+1:at}).check(),false);assert.equal(f.reads,0);
});
for(const initial of [NaN,-1])test('primary reader rejects invalid monotonic origin '+String(initial),async()=>{
 const f=fixture(),original=Object.getOwnPropertyDescriptor(performance,'now'),real=performance.now.bind(performance);let n=0;
 Object.defineProperty(performance,'now',{configurable:true,value:()=>++n===1?initial:real()});
 try{assert.equal(await make(f).check(),false);assert.equal(f.reads,0);}finally{if(original)Object.defineProperty(performance,'now',original);else delete performance.now;}
});

for(const drift of ['deadline','binding'])test('ARM eligibility rechecks '+drift+' after successful promise settlement',async()=>{
 const f=fixture(),o=f.options(),reader=api.createPrivateQaArmEligibility(o),original=Promise.race,at=f.wall;let changed=false;
 Promise.race=function(values){return Reflect.apply(original,this,[values]).then(r=>{if(r===true&&!changed){changed=true;if(drift==='deadline')f.wall=at+5000;else o.db.withSession=()=>{throw Error('binding changed');};}return r;});};
 try{assert.equal(await reader.check(),false);assert.equal(changed,true);assert.equal(f.reads,1);}finally{Promise.race=original;}
});

test('ARM eligibility checks the exact selected statement after successful settlement',async()=>{
 const f=fixture(),o=f.options(),sessionFactory=o.db.withSession;let selectedBound;
 o.db.withSession=function(mode){const s=Reflect.apply(sessionFactory,this,[mode]),prepare=s.prepare;return{prepare(...args){const statement=Reflect.apply(prepare,s,args),bind=statement.bind;return{bind(...params){selectedBound=Reflect.apply(bind,statement,params);return selectedBound;}};}};};
 const reader=api.createPrivateQaArmEligibility(o),original=Promise.race;let changed=false;
 Promise.race=function(values){return Reflect.apply(original,this,[values]).then(r=>{if(r===true&&!changed){changed=true;selectedBound.first=async()=>({eligible:1});}return r;});};
 try{assert.equal(await reader.check(),false);assert.equal(changed,true);assert.equal(f.reads,1);}finally{Promise.race=original;}
});
