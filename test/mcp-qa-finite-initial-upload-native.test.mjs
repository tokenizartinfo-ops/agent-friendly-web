import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
const sha=x=>createHash('sha256').update(x).digest('hex');
async function using(mode,fn){const f=await initialEntryHarness(mode);try{await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
test('B2a actual native winner uploads actual M once with exact JSON deploy=false and baseline inheritance',()=>using('normal',async f=>{
 await f.stub.configure('normal');const r=await f.workflow(f.refs);
 assert.equal(r.result.status,'material_recorded');assert.equal(f.uploads.length,1,'surviving native winner must perform real inactive upload');
 const {data}=f.uploads[0];assert.deepEqual(Object.keys(data).sort(),['bindings','compatibility_date','compatibility_flags','containers','exports','main_module','modules','usage_model'].sort());
 const bytes=Buffer.from(data.modules[0].content_base64,'base64');assert.equal(sha(bytes),f.resident.module.sha256);assert.notEqual(sha(bytes),f.x.pin.module.sha256);
 assert.deepEqual(data.containers,[{class_name:'AfwOwnEventNode'}]);assert.deepEqual(Object.keys(data.exports).sort(),['AfwNodeControl','AfwOwnEventNode','default']);
 assert.equal(data.exports.AfwOwnEventNode.storage,'sqlite');assert.equal(data.exports.AfwOwnEventNode.container,'agent-friendly-web-delegated-canary-afwowneventnode');
 for(const b of data.bindings){assert.notEqual(b.type,'secret_text');if(b.type==='inherit')assert.deepEqual(b,{name:b.name,type:'inherit',version_id:'2607abae-cec3-4e35-89eb-8b8572262b54'});if(b.name.endsWith('_ENABLED'))assert.equal(b.text,'false');}
 const rows=await f.stub.snapshot();assert.ok(rows.some(([k])=>k.startsWith('afw.finite-initial-upload.v1:')&&k.endsWith(':receipt')));
 assert.equal(JSON.stringify(r).includes('content_base64'),false);assert.equal(JSON.stringify(r).includes('55555555'),false);assert.equal(JSON.stringify(r).includes('synthetic-native'),false);
 assert.equal((await f.workflow(f.refs)).result.status,'admin_pending');assert.equal(f.uploads.length,1);
}));
for(const mode of ['missing-publisher','invalid-publisher'])test('B2a '+mode+' fails before spending permanent Entry',()=>using('normal',async f=>{
 await f.stub.configure(mode);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');
 assert.equal((await f.stub.snapshot()).some(([k])=>k==='afw.finite-initial-preparation.v1:entry'),false);assert.equal(f.uploads.length,0);
}));
