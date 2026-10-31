import test from 'node:test';
import assert from 'node:assert/strict';
import {createPrivateQaOriginalPinsReader} from '../lib/mcp-qa-original-pins.mjs';
import {RELEASE_TARGET} from '../lib/mcp-release-operator-policy.mjs';
function fixture(){
 const at=Date.UTC(2026,9,31,20),original={containerId:'a'.repeat(64),applicationId:RELEASE_TARGET.namespaceId,programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)},window={startAt:at,expiresAt:at+60000};
 let wall=at,sql,params,calls=0,sessions=0;
 const row={containerId:original.containerId,processGeneration:'d'.repeat(64),programHash:original.programHash,sourceRevision:original.sourceRevision,closedAt:at-1000};
 const bound={async first(){calls++;return row;}},statement={bind(...p){params=p;return bound;}},session={prepare(s){sql=s;return statement;}};
 const db={prepare(){throw Error('ordinary connection forbidden');},withSession(mode){assert.equal(mode,'first-primary');sessions++;return session;}};
 const stages=[],options={db,original,window,authorize:async(stage,signal)=>{assert.ok(signal instanceof AbortSignal);assert.equal(signal.aborted,false);stages.push(stage);return true;},now:()=>wall,timeoutMs:50};
 return{row,db,bound,statement,session,options,stages,setWall:v=>{wall=v;},get calls(){return calls;},get sessions(){return sessions;},get sql(){return sql;},get params(){return params;}};
}
test('private original pins derive only bounded primary metadata; no client generation or close timestamp',async()=>{
 const f=fixture(),r=await createPrivateQaOriginalPinsReader(f.options).read();
 assert.deepEqual(r,f.row);assert.ok(Object.isFrozen(r));assert.equal(f.sessions,1);assert.equal(f.calls,1);assert.match(f.sql,/^SELECT /);assert.doesNotMatch(f.sql,/INSERT|UPDATE|DELETE|user_id|project_id|scopes_json/);
 assert.deepEqual(f.params,[f.row.containerId,f.row.programHash,f.row.sourceRevision,f.options.window.startAt]);
 assert.deepEqual(f.stages,['qa_original_before_read','qa_original_after_read']);
});
for(const field of ['processGeneration','closedAt','extra'])test('constructor denies injected original '+field,()=>{
 const f=fixture();f.options.original[field]=field==='closedAt'?1:'e'.repeat(64);assert.throws(()=>createPrivateQaOriginalPinsReader(f.options),/Private QA original pins unavailable/);assert.equal(f.sessions,0);
});
test('foreign application and accessor metadata are denied before primary IO',()=>{
 const a=fixture();a.options.original.applicationId='1'.repeat(32);assert.throws(()=>createPrivateQaOriginalPinsReader(a.options));
 const b=fixture();Object.defineProperty(b.options.window,'startAt',{enumerable:true,get(){throw Error('must not invoke');}});assert.throws(()=>createPrivateQaOriginalPinsReader(b.options));assert.equal(b.sessions,0);
});
for(const change of [
 row=>{row.processGeneration='bad';},row=>{row.closedAt=Date.UTC(2026,9,31,20);},row=>{row.closedAt='yesterday';},
 row=>{row.sourceRevision='e'.repeat(40);},row=>{row.extra=true;},
])test('malformed or mismatched primary metadata remains private and denied '+change.toString(),async()=>{
 const f=fixture();change(f.row);await assert.rejects(createPrivateQaOriginalPinsReader(f.options).read(),/Private QA original pins unavailable/);
});
test('unknown primary result and provider errors do not leak details',async()=>{
 for(const first of [async()=>null,async()=>{throw Error('PRIVATE-ROW-TOKEN');}]){const f=fixture();f.bound.first=first;await assert.rejects(createPrivateQaOriginalPinsReader(f.options).read(),e=>e.message==='Private QA original pins unavailable');}
});
for(const where of ['before','after'])test('authorization '+where+' read cannot be inferred',async()=>{
 const f=fixture();f.options.authorize=async stage=>!stage.includes(where);await assert.rejects(createPrivateQaOriginalPinsReader(f.options).read());assert.equal(f.calls,where==='before'?0:1);
});
test('argument selectors do not reach DB',async()=>{
 const f=fixture();await assert.rejects(createPrivateQaOriginalPinsReader(f.options).read('alternate'));assert.equal(f.sessions,0);
});
for(const mutation of [
 f=>{f.options.original.containerId='e'.repeat(64);},
 f=>{f.options.db.prepare=()=>{};},
 f=>{f.options.db.withSession=()=>{};},
 f=>{f.session.prepare=()=>{};},
 f=>{f.statement.bind=()=>{};},
 f=>{f.bound.first=()=>{};},
])test('selection changes while primary read is pending fail closed '+mutation.toString(),async()=>{
 const f=fixture();f.bound.first=async()=>{mutation(f);return f.row;};await assert.rejects(createPrivateQaOriginalPinsReader(f.options).read());
});
test('the original deadline covers a delayed primary result and cancels authorization',async()=>{
 const f=fixture();let signal;f.options.timeoutMs=10;f.options.authorize=async(_stage,s)=>{signal=s;return true;};f.bound.first=()=>new Promise(r=>setTimeout(()=>r(f.row),35));
 await assert.rejects(createPrivateQaOriginalPinsReader(f.options).read());assert.equal(signal.aborted,true);
});
test('clock regression, nominal expiry and final settlement do not return expired metadata',async()=>{
 for(const mode of ['regress','expiry','settlement']){
 const f=fixture();f.options.authorize=async stage=>{if(stage==='qa_original_after_read'){if(mode==='settlement')queueMicrotask(()=>f.setWall(f.options.window.expiresAt));else f.setWall(mode==='regress'?f.options.window.startAt-1:f.options.window.expiresAt);}return true;};
 await assert.rejects(createPrivateQaOriginalPinsReader(f.options).read());
 }
});
