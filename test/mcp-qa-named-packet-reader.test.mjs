import test from 'node:test';
import assert from 'node:assert/strict';
const api=await import('../lib/mcp-qa-named-packet-reader.mjs').catch(()=>({}));
const key='a'.repeat(64),packet='{"purpose":"afw.qa-named-data-packet.v1","generationCapsule":"fixture","namedPolicy":"fixture","closurePolicy":"fixture","cancellationHistory":"fixture"}';
function fixture(){
 let at=Date.UTC(2026,9,31,17),calls=[];const f={calls,now:()=>at,setNow:v=>{at=v;},answer:{packet_json:packet}};
 const bound={first:async()=>{calls.push('first');return f.answer;}},statement={bind(...values){calls.push({bind:values});return bound;}},session={prepare(sql){calls.push({sql});return statement;}};
 const db={prepare(){throw Error('ordinary prepare forbidden');},withSession(...args){calls.push({session:args});return session;}};
 f.db=db;f.session=session;f.statement=statement;f.bound=bound;f.options={db,now:f.now,timeoutMs:5000};return f;
}
const make=f=>{assert.equal(typeof api.createPrivateQaNamedPacketReader,'function','bounded primary reader required');return api.createPrivateQaNamedPacketReader(f.options);};
const signal=()=>new AbortController().signal;
test('private packet reader performs one exact first-primary SELECT and returns private raw data internally',async()=>{
 const f=fixture(),r=make(f);assert.deepEqual(Object.keys(r),['read']);assert.equal(await r.read(key,signal()),packet);assert.deepEqual(f.calls,[{session:['first-primary']},{sql:'SELECT packet_json FROM afw_qa_named_packets_v1 WHERE generation_plan_hash=? LIMIT 1'},{bind:[key]},'first']);
});
for(const bad of [undefined,null,'','a'.repeat(63),'A'.repeat(64),{key}])test('invalid key never touches D1 '+JSON.stringify(bad),async()=>{const f=fixture();assert.equal(await make(f).read(bad,signal()),null);assert.equal(f.calls.length,0);});
test('missing, extra and aborted invocation arguments never read',async()=>{
 const f=fixture(),r=make(f),c=new AbortController();c.abort();assert.equal(await r.read(key),null);assert.equal(await r.read(key,signal(),{}),null);assert.equal(await r.read(key,c.signal),null);assert.equal(f.calls.length,0);
});
for(const row of [null,{}, {packet_json:packet,other:'private'}, {packet_json:3},{packet_json:'[]'},{packet_json:'{'},{packet_json:'{}'},{packet_json:JSON.stringify({purpose:'afw.qa-named-data-packet.v1',generationCapsule:'x',namedPolicy:'x',closurePolicy:'x',cancellationHistory:'x',secret:'forbidden'})},{packet_json:JSON.stringify({purpose:'afw.qa-named-data-packet.v1',generationCapsule:'x',namedPolicy:'x',closurePolicy:'x',cancellationHistory:'é'.repeat(33000)})}])test('absent or malformed private row returns no data '+String(row?.packet_json?.length),async()=>{const f=fixture();f.answer=row;assert.equal(await make(f).read(key,signal()),null);});
test('packet must be canonical and contain exact bounded data strings',async()=>{
 for(const value of [packet+'\n',packet.replace('"fixture"','3'),packet.replace('"fixture"','null'),packet.replace('afw.qa-named-data-packet.v1','foreign'),packet.replace('"fixture"','""'),JSON.stringify({...JSON.parse(packet),purpose:undefined})]){const f=fixture();f.answer={packet_json:value};assert.equal(await make(f).read(key,signal()),null);}
});
test('UTF8 combined limit is enforced at exactly65536bytes',async()=>{
 const f=fixture(),base=JSON.parse(packet);base.cancellationHistory='x'.repeat(65536-Buffer.byteLength(JSON.stringify({...base,cancellationHistory:''})));const exact=JSON.stringify(base);assert.equal(Buffer.byteLength(exact),65536);f.answer={packet_json:exact};assert.equal(await make(f).read(key,signal()),exact);f.answer={packet_json:exact.replace('xxx','xxxx')};assert.equal(await make(f).read(key,signal()),null);
});
test('hung read is bounded; abort and late results are never accepted',async()=>{
 for(const abort of [false,true]){const f=fixture();let release;const gate=new Promise(r=>{release=r;});f.options.timeoutMs=30;f.bound.first=async()=>{await gate;return f.answer;};const c=new AbortController(),p=make(f).read(key,c.signal);if(abort)c.abort();const r=await Promise.race([p,new Promise(resolve=>setTimeout(()=>resolve('hung'),180))]);assert.notEqual(r,'hung');assert.equal(r,null);release();await new Promise(resolve=>setTimeout(resolve,10));assert.equal(await p,null);}
});
for(const changed of ['db','session','bind','first','clock'])test('post-read identity/deadline drift blocks '+changed,async()=>{
 const f=fixture();f.bound.first=async()=>{if(changed==='db')f.db.withSession=()=>{};if(changed==='session')f.session.prepare=()=>{};if(changed==='bind')f.statement.bind=()=>{};if(changed==='first')f.bound.first=()=>{};if(changed==='clock')f.setNow(f.now()+5000);return f.answer;};assert.equal(await make(f).read(key,signal()),null);
});
for(const drift of ['deadline','binding'])test('final settlement rechecks '+drift,async()=>{
 const f=fixture(),original=Promise.race;let changed=false;Promise.race=function(values){return Reflect.apply(original,this,[values]).then(v=>{if(!changed&&v===packet){changed=true;if(drift==='deadline')f.setNow(f.now()+5000);else f.db.withSession=()=>{};}return v;});};try{assert.equal(await make(f).read(key,signal()),null);assert.equal(changed,true);}finally{Promise.race=original;}
});

test('canonical envelope order and accessors do not pass as packet data',async()=>{
 const f=fixture(),p=JSON.parse(packet),reordered=JSON.stringify({namedPolicy:p.namedPolicy,purpose:p.purpose,generationCapsule:p.generationCapsule,closurePolicy:p.closurePolicy,cancellationHistory:p.cancellationHistory});f.answer={packet_json:reordered};assert.equal(await make(f).read(key,signal()),null);
 f.answer=Object.defineProperty({},'packet_json',{enumerable:true,get(){throw Error('private getter');}});assert.equal(await make(f).read(key,signal()),null);
});
test('invalid options and private provider errors never become output',async()=>{
 const f=fixture();assert.throws(()=>api.createPrivateQaNamedPacketReader({...f.options,timeoutMs:5001}));assert.throws(()=>api.createPrivateQaNamedPacketReader({...f.options,extra:true}));f.bound.first=async()=>{throw Error('synthetic private provider contents');};assert.equal(await make(f).read(key,signal()),null);
});
