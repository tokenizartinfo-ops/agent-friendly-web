import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {PRIVATE_CONFIRMATION_FORMAT,PRIVATE_CONFIRMATION_SLOT} from '../lib/mcp-private-confirmation-template.mjs';
import {RELEASE_TARGET} from '../lib/mcp-release-operator-policy.mjs';
const snapshot=await import('../lib/mcp-named-template-public-snapshot.mjs').catch(e=>{if(e.code==='ERR_MODULE_NOT_FOUND')return {};throw e;});
const opt={skip:typeof snapshot.createMcpPublicNamedTemplateSnapshot!=='function'};
const hash=x=>createHash('sha256').update(x).digest('hex');
const gitHash=x=>createHash('sha1').update('blob '+Buffer.byteLength(x)+'\0').update(x).digest('hex');
const rev='a'.repeat(40),tree='b'.repeat(40),frozenRev='c'.repeat(40),frozenTree='d'.repeat(40);
function fixture(extra=''){
 const template='export const policy=JSON.parse('+JSON.stringify(PRIVATE_CONFIRMATION_SLOT)+');\n// '+extra;
 const materializer='export const publicMaterializer = true;\n',workerHash=hash('historical-worker');
 const pin={baseVersionId:'11111111-1111-4111-8111-111111111111',artifactKey:hash(JSON.stringify([RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,workerHash])),
 sourceRevision:frozenRev,sourceTree:frozenTree,programHash:'e'.repeat(64),workerHash,workerBytes:100,sourceCheck:'git-inputs-before-after-v1'};
 const m={format:PRIVATE_CONFIRMATION_FORMAT,templateHash:hash(template),templateBytes:Buffer.byteLength(template),slot:PRIVATE_CONFIRMATION_SLOT,
 artifactKey:pin.artifactKey,workerHash,programHash:pin.programHash,artifactSourceRevision:frozenRev,artifactSourceTree:frozenTree,materialized:false,remotePublished:false};
 const r={operatorSourceRevision:rev,operatorSourceTree:tree,templateHash:m.templateHash,templateBytes:m.templateBytes,materializerHash:hash(materializer),materializerBytes:Buffer.byteLength(materializer),
 artifactJsonHash:hash('frozen-json'),artifactJsonBytes:200,artifactSourceRevision:frozenRev,artifactSourceTree:frozenTree,artifactKey:pin.artifactKey,workerHash,programHash:pin.programHash,
 materialized:false,realPolicyAccepted:false,remotePublished:false,invoked:false};
 return {files:{'template.mjs':template,'materializer.mjs':materializer,'template.json':JSON.stringify(m),'private-template-build.json':JSON.stringify(r)},
 expectedOperatorRevision:rev,expectedOperatorTree:tree,expectedFrozenArtifact:pin,expectedMaterializerHash:hash(materializer)};
}
const create=p=>snapshot.createMcpPublicNamedTemplateSnapshot(p);
const fixed=e=>e?.message==='Public named template snapshot unavailable'&&!Object.hasOwn(e,'cause');
const recover=out=>Buffer.concat(out.entries.filter(e=>/^template-\d{4}\.b64$/.test(e.path)).map(e=>Buffer.from(e.content,'base64')));
test('public named template snapshot builder is available',()=>assert.equal(typeof snapshot.createMcpPublicNamedTemplateSnapshot,'function'));
test('distinct operator and historical source survive exact public roundtrip and Git blob hashing',opt,async()=>{
 const p=fixture(),out=await create(p),es=out.entries;
 assert.equal(out.ref,'refs/heads/artifacts/afw-named-template-'+rev);
 assert.equal(recover(out).toString('utf8'),p.files['template.mjs']);
 for(const e of es){assert.equal(e.sha,gitHash(e.content));assert.equal(e.mode,'100644');assert.equal(e.type,'blob');}
 assert.equal(Buffer.from(es.find(e=>e.path==='materializer.b64').content,'base64').toString('utf8'),p.files['materializer.mjs']);
 const receipt=JSON.parse(es.find(e=>e.path==='preservation.json').content);
 assert.equal(receipt.format,'afw-public-named-template-snapshot-v1');
 assert.equal(receipt.operatorSourceRevision,rev);assert.equal(receipt.operatorSourceTree,tree);
 assert.deepEqual(receipt.frozenArtifact,p.expectedFrozenArtifact);
 assert.equal(receipt.materialized,false);assert.equal(receipt.remotePublished,false);assert.equal(receipt.operationalReadiness,false);
 assert.equal(out.materialized,false);assert.equal(out.remotePublished,false);
 assert.ok(Object.isFrozen(out));assert.ok(Object.isFrozen(out.entries));
 assert.equal(es.some(e=>/^(index\.mjs|policy\.json|frozen-artifact\.json)$/.test(e.path)),false);
 for(const e of es.filter(e=>e.path!=='preservation.json'))assert.ok(receipt.files.some(f=>f.path===e.path&&f.sha===e.sha&&f.bytes===Buffer.byteLength(e.content)));
});
test('48KiB split crosses an actual multibyte scalar without corrupting raw bytes',opt,async()=>{
 const prefix=fixture().files['template.mjs'],padding=49150-Buffer.byteLength(prefix);
 const p=fixture('x'.repeat(padding)+'🙂'.repeat(4000)),out=await create(p);
 const first=Buffer.from(out.entries.find(e=>e.path==='template-0000.b64').content,'base64');
 assert.equal(first.length,49152);assert.deepEqual([...first.subarray(-2)],[0xf0,0x9f]);
 assert.equal(hash(recover(out)),hash(p.files['template.mjs']));
});
test('extra private outputs, missing public outputs and accessor inputs are rejected without reading them',opt,async()=>{
 for(const change of [p=>p.files['policy.json']='PRIVATE_SENTINEL',p=>p.files['index.mjs']='PRIVATE_SENTINEL',p=>p.files['frozen-artifact.json']='PRIVATE_SENTINEL',p=>delete p.files['private-template-build.json'],p=>p.privatePolicy='PRIVATE_SENTINEL']){
 const p=fixture();change(p);await assert.rejects(create(p),fixed);}
 for(const location of ['top','files','pin']){
 const p=fixture();let reads=0;
 const target=location==='top'?p:location==='files'?p.files:p.expectedFrozenArtifact;
 const key=location==='top'?'expectedOperatorRevision':location==='files'?'template.mjs':'sourceRevision';
 Object.defineProperty(target,key,{enumerable:true,get(){reads++;return 'PRIVATE_SENTINEL';}});
 await assert.rejects(create(p),fixed);assert.equal(reads,0);}
});
test('independent operator metadata and frozen source cannot be conflated or replaced',opt,async()=>{
 for(const change of [p=>p.expectedOperatorRevision=frozenRev,p=>p.expectedOperatorTree=frozenTree,p=>p.expectedFrozenArtifact.sourceRevision=rev,p=>p.expectedFrozenArtifact.sourceTree=tree,
 p=>p.expectedFrozenArtifact.workerHash='f'.repeat(64),p=>p.expectedFrozenArtifact.programHash='f'.repeat(64),p=>p.expectedFrozenArtifact.artifactKey='f'.repeat(64),p=>p.expectedFrozenArtifact.sourceCheck='unknown',
 p=>p.expectedFrozenArtifact.baseVersionId='unknown',p=>p.expectedFrozenArtifact.workerBytes=0]){
 const p=fixture();change(p);await assert.rejects(create(p),fixed);}
});
test('tampered template materializer manifest receipt and live authority flags are denied',opt,async()=>{
 for(const change of [
 p=>p.files['template.mjs']+='PRIVATE_SENTINEL',p=>p.files['materializer.mjs']+='PRIVATE_SENTINEL',p=>p.expectedMaterializerHash='f'.repeat(64),
 p=>{const m=JSON.parse(p.files['template.json']);m.format='afw-private-publication-template-v1';p.files['template.json']=JSON.stringify(m);},
 ...['remotePublished','materialized','realPolicyAccepted','invoked'].map(k=>p=>{const r=JSON.parse(p.files['private-template-build.json']);r[k]=true;p.files['private-template-build.json']=JSON.stringify(r);}),
 p=>{const r=JSON.parse(p.files['private-template-build.json']);r.artifactJsonHash='unknown';p.files['private-template-build.json']=JSON.stringify(r);},
 p=>{const r=JSON.parse(p.files['private-template-build.json']);r.artifactJsonBytes=99;p.files['private-template-build.json']=JSON.stringify(r);},
 p=>{const r=JSON.parse(p.files['private-template-build.json']);r.privatePolicy='PRIVATE_SENTINEL';p.files['private-template-build.json']=JSON.stringify(r);}
 ]){const p=fixture();change(p);await assert.rejects(create(p),fixed);}
});
test('all public input byte caps reject excess text without reflecting it',opt,async()=>{
 for(const name of ['template.mjs','materializer.mjs','template.json','private-template-build.json']){
 const p=fixture();p.files[name]='PRIVATE_SENTINEL'+'x'.repeat(name==='template.mjs'?2097153:65537);
 await assert.rejects(create(p),e=>fixed(e)&&!e.stack.includes('PRIVATE_SENTINEL'));}
});
test('caller mutation during async digest cannot replace captured files or frozen pins',opt,async()=>{
 const p=fixture(),original=p.files['template.mjs'],expected={...p.expectedFrozenArtifact};
 const pending=create(p);p.files['template.mjs']='PRIVATE_SENTINEL';p.expectedFrozenArtifact.sourceRevision=rev;p.expectedOperatorRevision=frozenRev;
 const out=await pending;assert.equal(recover(out).toString('utf8'),original);
 assert.deepEqual(JSON.parse(out.entries.find(e=>e.path==='preservation.json').content).frozenArtifact,expected);
});
