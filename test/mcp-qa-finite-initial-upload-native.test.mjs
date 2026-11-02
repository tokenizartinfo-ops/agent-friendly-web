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

const uploadRows=rows=>rows.filter(([k])=>k.startsWith('afw.finite-initial-upload.v1:'));
const has=(rows,suffix)=>uploadRows(rows).some(([k])=>k.endsWith(':'+suffix));
const digestRows=rows=>sha(JSON.stringify(rows));
test('B2a private backup reconstructs exact baseline with bounded deterministic chunks and retains old unknown',()=>using('normal',async f=>{
 await f.stub.configure('normal');const before=await f.stub.snapshot(),r=await f.stub.invoke(f.refs);assert.equal(r.status,'material_recorded');
 const rows=await f.stub.snapshot(),manifest=JSON.parse(uploadRows(rows).find(([k])=>k.endsWith(':backup'))[1]),chunks=uploadRows(rows).filter(([k])=>k.includes(':chunk:')).map(([,raw])=>JSON.parse(raw)).sort((a,b)=>a.index-b.index);
 assert.equal(chunks.length,Math.ceil(f.x.pin.module.bytes/32768));assert.equal(chunks.every(c=>c.manifestHash===manifest.recordHash&&sha(Buffer.from(c.content,'base64'))===c.sha256),true);
 assert.equal(sha(Buffer.concat(chunks.map(c=>Buffer.from(c.content,'base64')))),f.x.pin.module.sha256);
 assert.equal(uploadRows(rows).every(([,raw])=>Buffer.byteLength(raw)<=65536),true);
 const material=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-initial-preparation.v1:material:'))[1]);
 assert.equal(manifest.retainedIds.preconnectionId,material.preconnectionId);assert.equal(manifest.retainedIds.activationKey,material.originalContext.publication.activationKey);
 assert.equal(f.uploads[0].data.bindings.find(b=>b.name==='AFW_OAUTH_PILOT_EXPIRES_AT').text,new Date(material.intent.initialDeadline).toISOString());
 assert.equal(manifest.historicalSourceRevision,f.x.receipt.sourceRevision);assert.notEqual(manifest.historicalSourceRevision,material.intent.sourceRevision);
 for(const [key,value]of before)assert.equal(digestRows(rows.filter(([k])=>k===key)),digestRows([[key,value]]));
 const send=JSON.parse(uploadRows(rows).find(([k])=>k.endsWith(':send'))[1]);assert.equal(send.bodyHash,sha(f.uploads[0].body));assert.ok(send.deadline-send.issuedAt<=5000);
 assert.equal(rows.some(([k])=>k==='afw.qa-finite-trial.v1:head'),false);
}));
for(const fault of ['upload-lost-send-ack','upload-never-commit','upload-callback-retry','upload-reject-sync','upload-readback-tamper','upload-chunk-tamper','upload-publisher-drift'])test('B2a '+fault+' cannot authorize a POST or retry',()=>using('normal',async f=>{
 await f.stub.configure(fault);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,0);
 const before=digestRows(await f.stub.snapshot());assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,0);assert.equal(digestRows(await f.stub.snapshot()),before);
}));
for(const fault of ['upload-lost-send-ack','upload-never-commit'])test('B2a persisted native restart after '+fault+' never resumes effect',()=>using('restart',async f=>{
 await f.stub.configure(fault);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');const before=digestRows(await f.stub.snapshot());
 await f.restart();await f.stub.configure('normal');assert.equal(digestRows(await f.stub.snapshot()),before);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,0);
}));
for(const fault of ['upload-held-send','upload-hold-sync','upload-hold-ack-sync'])test('B2a actual pending '+fault+' cannot continue after child expiry',()=>using('normal',async f=>{
 await f.stub.configure(fault);const operation=f.stub.invoke(f.refs),start=Date.now();
 let held=false;for(let i=0;i<100;i++){if((await f.stub.stats()).held){held=true;break;}await new Promise(resolve=>setTimeout(resolve,20));}assert.equal(held,true);
 const rows=await f.stub.snapshot();assert.equal(has(rows,'send'),true);assert.equal(has(rows,'receipt'),false);
 assert.equal((await operation).status,'admin_pending');assert.ok(Date.now()-start>=4900);await f.stub.release();
 const count=f.uploads.length;await new Promise(resolve=>setTimeout(resolve,30));assert.equal(f.uploads.length,count);assert.equal(has(await f.stub.snapshot(),'receipt'),false);
 assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,count);
}));
test('B2a held SEND sync consumes partially spent original native parent, not a new30s',()=>using('upload-partial',async f=>{
 await f.stub.configure('upload-hold-sync');const began=Date.now(),operation=f.stub.invoke(f.refs);
 assert.equal((await operation).status,'admin_pending');assert.ok(Date.now()-began<5000);assert.equal((await f.stub.stats()).held,true);await f.stub.release();
 assert.equal(f.uploads.length,0);assert.equal(has(await f.stub.snapshot(),'receipt'),false);
}));
for(const fault of ['reader-wrong-id','reader-inactive','reader-expired','reader-not-before','publisher-wrong-id','publisher-inactive','publisher-expired','publisher-not-before'])test('B2a actual loaded custody '+fault+' fails before Entry',()=>using(fault,async f=>{
 await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal((await f.stub.snapshot()).some(([k])=>k==='afw.finite-initial-preparation.v1:entry'),false);assert.equal(f.uploads.length,0);
}));
test('B2a baseline mismatch never adopts pointer or dispatches upload',()=>using('baseline-drift',async f=>{
 await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,0);assert.equal(has(await f.stub.snapshot(),'send'),false);
}));
for(const fault of ['lost-http-ack','ack-baseline','ack-qa','ack-latest','ack-invalid','wrong-uploaded-module','qa-uploaded-module','literal-secret','new-resource','new-class','new-migration','enabled-cache','pointer-drift'])test('B2a '+fault+' preserves unknown/orphan without receipt, second POST or activation',()=>using(fault,async f=>{
 await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,1);const rows=await f.stub.snapshot();
 assert.equal(has(rows,'send'),true);assert.equal(has(rows,'receipt'),false);assert.equal(JSON.stringify(rows).includes('SYNTHETIC_SHOULD_NEVER_PERSIST'),false);
 assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,1);
 assert.equal(f.requests.some(u=>u.includes('/deployments')&&!u.endsWith('?per_page=1')),false);
}));
for(const fault of ['held-http','held-body'])test('B2a retained underlying '+fault+' cannot publish late ACK',()=>using(fault,async f=>{
 await f.stub.configure('normal');const operation=f.stub.invoke(f.refs);
 let held=false;for(let i=0;i<150;i++){if(f.held){held=true;break;}await new Promise(resolve=>setTimeout(resolve,20));}assert.equal(held,true);
 assert.equal((await operation).status,'admin_pending');assert.equal(f.uploads.length,1);f.release();await new Promise(resolve=>setTimeout(resolve,50));
 assert.equal(has(await f.stub.snapshot(),'ack'),false);assert.equal(has(await f.stub.snapshot(),'receipt'),false);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,1);
}));
