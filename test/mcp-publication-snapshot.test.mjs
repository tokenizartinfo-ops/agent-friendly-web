import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {PRIVATE_PUBLICATION_FORMAT,PRIVATE_PUBLICATION_SLOT,PRIVATE_PUBLICATION_TARGET} from '../lib/mcp-private-publication-template.mjs';
const snapshotModule=await import('../lib/mcp-publication-public-snapshot.mjs').catch(e=>{if(e.code==='ERR_MODULE_NOT_FOUND')return {};throw e;});
const supported=typeof snapshotModule.createMcpPublicPublicationSnapshot==='function',opt={skip:!supported};
const hash=x=>createHash('sha256').update(x).digest('hex');
const gitHash=x=>createHash('sha1').update('blob '+Buffer.byteLength(x)+'\0').update(x).digest('hex');
const revision='a'.repeat(40),tree='b'.repeat(40),workerHash=hash('public-worker'),programHash='c'.repeat(64);
function fixture(extra=''){
 const template='export const policy=JSON.parse('+JSON.stringify(PRIVATE_PUBLICATION_SLOT)+');\n// public🙂'+extra;
 const materializer='export const publicMaterializer = true;\n';
 const m={format:PRIVATE_PUBLICATION_FORMAT,templateHash:hash(template),templateBytes:Buffer.byteLength(template),slot:PRIVATE_PUBLICATION_SLOT,
  artifactKey:hash(JSON.stringify([PRIVATE_PUBLICATION_TARGET.accountId,PRIVATE_PUBLICATION_TARGET.workerName,workerHash])),
  workerHash,programHash,artifactSourceRevision:revision,artifactSourceTree:tree,materialized:false,remotePublished:false};
 const r={operatorSourceRevision:revision,operatorSourceTree:tree,artifactSourceRevision:revision,artifactSourceTree:tree,
  artifactKey:m.artifactKey,workerHash,programHash,templateHash:m.templateHash,templateBytes:m.templateBytes,materializerHash:hash(materializer),materializerBytes:Buffer.byteLength(materializer),
  materialized:false,realPolicyAccepted:false,remotePublished:false,invoked:false,operationalReadiness:false};
 return {files:{'template.mjs':template,'materializer.mjs':materializer,'template.json':JSON.stringify(m),'build.json':JSON.stringify(r)},
  expectedSourceRevision:revision,expectedSourceTree:tree,expectedMaterializerHash:hash(materializer)};
}
const create=x=>snapshotModule.createMcpPublicPublicationSnapshot(x);
const fixed=e=>e?.message==='Public publication snapshot unavailable'&&!Object.hasOwn(e,'cause');

test('public publication snapshot builder is available',()=>assert.equal(typeof snapshotModule.createMcpPublicPublicationSnapshot,'function'));
test('snapshot roundtrips only public code and fixed provenance with exact Git blob hashes',opt,async()=>{
 const p=fixture(),out=await create(p);
 assert.equal(out.ref,'refs/heads/artifacts/afw-publication-template-'+revision);
 const es=out.entries;
 for(const e of es){assert.equal(e.mode,'100644');assert.equal(e.type,'blob');assert.equal(e.sha,gitHash(e.content));}
 const chunks=es.filter(e=>/^template-\d{4}\.b64$/.test(e.path)).sort((a,b)=>a.path.localeCompare(b.path));
 assert.equal(Buffer.concat(chunks.map(e=>Buffer.from(e.content,'base64'))).toString('utf8'),p.files['template.mjs']);
 assert.equal(Buffer.from(es.find(e=>e.path==='materializer.b64').content,'base64').toString('utf8'),p.files['materializer.mjs']);
 assert.equal(es.find(e=>e.path==='template.json').content,p.files['template.json']);
 assert.equal(es.find(e=>e.path==='build.json').content,p.files['build.json']);
 assert.equal(es.some(e=>/policy\.json|index\.mjs|frozen-artifact/.test(e.path)),false);
 const receipt=JSON.parse(es.find(e=>e.path==='preservation.json').content);
 assert.equal(receipt.sourceRevision,revision);assert.equal(receipt.sourceTree,tree);
 assert.equal(receipt.templateHash,hash(p.files['template.mjs']));
 assert.equal(out.remotePublished,false);assert.equal(out.materialized,false);
 assert.ok(Object.isFrozen(out));assert.ok(Object.isFrozen(out.entries));
});
test('UTF8 split at48KiB raw boundary roundtrips without lossy string slicing',opt,async()=>{
 const p=fixture('x'.repeat(49100)+'🙂'.repeat(4000)),out=await create(p);
 const chunks=out.entries.filter(e=>/^template-\d{4}\.b64$/.test(e.path)).sort((a,b)=>a.path.localeCompare(b.path));
 assert.ok(chunks.length>1);
 assert.equal(Buffer.from(chunks[0].content,'base64').length,49152);
 assert.equal(hash(Buffer.concat(chunks.map(e=>Buffer.from(e.content,'base64')))),hash(p.files['template.mjs']));
});
test('private extra outputs and missing public outputs are rejected',opt,async()=>{
 for(const mutate of [x=>{x.files['policy.json']='PRIVATE_SENTINEL';},x=>{x.files['index.mjs']='materialized';},x=>{delete x.files['build.json'];},x=>{x.secret='PRIVATE_SENTINEL';}]){
  const p=fixture();mutate(p);await assert.rejects(create(p),fixed);
 }
});
test('source and tree must match independent expected Git metadata',opt,async()=>{
 for(const mutate of [x=>{x.expectedSourceRevision='d'.repeat(40);},x=>{x.expectedSourceTree='d'.repeat(40);}]){
  const p=fixture();mutate(p);await assert.rejects(create(p),fixed);
 }
});
test('materializer must match the independent accepted-source hash',opt,async()=>{
 const p=fixture();p.expectedMaterializerHash='d'.repeat(64);await assert.rejects(create(p),fixed);
});
test('tampered code, manifest or operational flags cannot enter the public snapshot',opt,async()=>{
 for(const mutate of [
  x=>{x.files['template.mjs']+='\n';},
  x=>{x.files['materializer.mjs']+='PRIVATE_SENTINEL';},
  x=>{const m=JSON.parse(x.files['template.json']);m.format='afw-private-confirmation-template-v1';x.files['template.json']=JSON.stringify(m);},
  x=>{const r=JSON.parse(x.files['build.json']);r.remotePublished=true;x.files['build.json']=JSON.stringify(r);},
  x=>{const r=JSON.parse(x.files['build.json']);r.workerHash='d'.repeat(64);x.files['build.json']=JSON.stringify(r);},
  x=>{const r=JSON.parse(x.files['build.json']);r.privatePolicy='PRIVATE_SENTINEL';x.files['build.json']=JSON.stringify(r);}
 ]){
  const p=fixture();mutate(p);await assert.rejects(create(p),fixed);
 }
});
test('bounded public inputs reject excess bytes without reflecting private text',opt,async()=>{
 for(const name of ['template.json','build.json','materializer.mjs','template.mjs']){
  const p=fixture();p.files[name]='PRIVATE_SENTINEL'+'x'.repeat(name==='template.mjs'?2097153:65537);
  await assert.rejects(create(p),e=>fixed(e)&&!e.stack.includes('PRIVATE_SENTINEL'));
 }
});
test('callers cannot replace captured strings after validation has started',opt,async()=>{
 const p=fixture(),original=p.files['template.mjs'];
 const pending=create(p);p.files['template.mjs']='PRIVATE_SENTINEL';p.expectedSourceRevision='d'.repeat(40);
 const out=await pending;
 const chunks=out.entries.filter(e=>/^template-\d{4}\.b64$/.test(e.path));
 assert.equal(Buffer.concat(chunks.map(e=>Buffer.from(e.content,'base64'))).toString('utf8'),original);
});
test('input and file getters are denied before evaluation',opt,async()=>{
 for(const isFile of [false,true]){
  const p=fixture();let read=0;
  Object.defineProperty(isFile?p.files:p,isFile?'template.mjs':'expectedSourceRevision',{enumerable:true,get(){read++;return 'PRIVATE_SENTINEL';}});
  await assert.rejects(create(p),fixed);assert.equal(read,0);
 }
});
