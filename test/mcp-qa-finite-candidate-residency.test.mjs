import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {gzipSync,gunzipSync} from 'node:zlib';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {compileFiniteNativeStaging} from '../scripts/build-finite-native-package.mjs';
import {buildMcpNodeProgram} from '../scripts/build-mcp-node-program.mjs';
const sha=x=>createHash('sha256').update(x).digest('hex');
const M=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const compiled=compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:M});
const node=buildMcpNodeProgram();
const decoder='lib/mcp-qa-finite-candidate-residency.mjs';
async function bundle(envelope,program,tree,native=false){
 const contents=native?
  `import {readPrivateQaFiniteCandidate} from './${decoder}';import {createHash} from 'node:crypto';export default {fetch(){const x=readPrivateQaFiniteCandidate();return Response.json({module:x.module,sourceRevision:x.sourceRevision,sourceTree:x.sourceTree,sourceCheck:x.sourceCheck,programHash:x.programHash,decodedHash:createHash('sha256').update(x.bytes).digest('hex')});}};`:
  `export {readPrivateQaFiniteCandidate} from './${decoder}';`;
 const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*','cloudflare:*'],define:{
  'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':JSON.stringify(envelope),
  'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(M),
  'globalThis.__AFW_FINITE_SOURCE_TREE__':JSON.stringify(tree),
  'globalThis.__AFW_NODE_PROGRAM__':JSON.stringify(program)
 }});return b.outputFiles[0].text;
}
let sequence=0;
async function reader(e,program,tree){const code=await bundle(e,program,tree);return import('data:text/javascript;base64,'+Buffer.from(code+'\n//instance'+sequence++).toString('base64'));}
test('real compiler creates QA-only exact candidate residency without hash cycle',async()=>{
 const r=await compiled,n=await node,c=r.files['canaryLive/index.mjs'],q=r.files['qaLive/index.mjs'];
 console.info('B1 measured '+JSON.stringify({sourceRevision:M,sourceTree:r.sourceTree,canaryBytes:c.length,qaBytes:q.length,programHash:n.programHash}));
 assert(c.length<=2097152,'Known candidate 2MiB cap');assert(q.length<=3145728,'QA 3MiB cap');
 const e=r.candidateResidency;assert(e,'actual source compiler must produce residency');
 assert.deepEqual(Object.keys(e).sort(),['compressedBytes','compressedSha256','content','encoding','module','programHash','purpose','sourceCheck','sourceRevision','sourceTree']);
 assert.deepEqual(Object.keys(e.module).sort(),['bytes','name','sha256']);
 assert.deepEqual(e.module,{name:'index.mjs',sha256:sha(c),bytes:c.length});
 assert.equal(e.sourceRevision,M);assert.equal(e.sourceTree,r.sourceTree);assert.equal(e.programHash,n.programHash);assert.equal(e.sourceCheck,'git-inputs-before-after-v1');
 const zipped=Buffer.from(e.content,'base64');assert.equal(zipped.length,e.compressedBytes);assert.equal(sha(zipped),e.compressedSha256);assert.deepEqual(gunzipSync(zipped),c);assert.deepEqual(gzipSync(c,{level:9,mtime:0}),zipped);
 assert(r.metafiles.qaLive.inputs[decoder]);assert.equal(r.metafiles.canaryLive.inputs[decoder],undefined);
 assert(q.includes(Buffer.from(e.content)));assert.equal(c.includes(Buffer.from(e.content)),false);
 assert.equal(r.completePackage,false);assert.equal(r.manifest,undefined);assert.equal(r.operationalReadiness,false);
 console.info('B1 resident metadata '+JSON.stringify({...e,content:undefined}));
});
test('actual fixed decoder returns fresh private bytes and independently checks compiled programM',async()=>{
 const r=await compiled,n=await node,{readPrivateQaFiniteCandidate:read}=await reader(r.candidateResidency,n.program,r.sourceTree);
 const first=read(),second=read();assert.deepEqual(Buffer.from(first.bytes),r.files['canaryLive/index.mjs']);
 assert.notEqual(first.bytes,second.bytes);first.bytes[0]^=255;assert.equal(sha(read().bytes),r.candidateResidency.module.sha256);
 assert(Object.isFrozen(first));assert(Object.isFrozen(first.module));assert.throws(()=>read({bytes:first.bytes}),/unavailable/);
 await assert.rejects(reader(r.candidateResidency,n.program+'changed',r.sourceTree),/unavailable/);
});
test('fixed decoder rejects malformed encoding, metadata, limits and gzip ambiguity before use',async t=>{
 const r=await compiled,n=await node,e=r.candidateResidency;assert(e,'real compiler envelope');
 const zipped=bytes=>({content:bytes.toString('base64'),compressedBytes:bytes.length,compressedSha256:sha(bytes)});
 const cases={
  extra:x=>{x.authorized=true;},revision:x=>{x.sourceRevision='0'.repeat(40);},tree:x=>{x.sourceTree='0'.repeat(40);},
  program:x=>{x.programHash='0'.repeat(64);},sourceCheck:x=>{x.sourceCheck='fixture';},exports:x=>{x.module.exports=[];},
  base64:x=>{x.content+='\n';},digest:x=>{x.compressedSha256='0'.repeat(64);},length:x=>{x.compressedBytes++;},
  decodedHash:x=>{x.module.sha256='0'.repeat(64);},decodedLength:x=>{x.module.bytes--;},cap:x=>{x.module.bytes=2097153;},
  bomb:x=>{const bytes=Buffer.alloc(2097153,65);Object.assign(x,zipped(gzipSync(bytes,{level:9,mtime:0})));},
  trailing:x=>{Object.assign(x,zipped(Buffer.concat([Buffer.from(x.content,'base64'),Buffer.from([0])])));},
  concatenated:x=>{Object.assign(x,zipped(Buffer.concat([Buffer.from(x.content,'base64'),gzipSync(Buffer.alloc(0),{level:9,mtime:0})])));},
  alternateCompression:x=>{Object.assign(x,zipped(gzipSync(r.files['canaryLive/index.mjs'],{level:1,mtime:0})));},
 };
 for(const [name,mutate] of Object.entries(cases))await t.test(name,async()=>{const x=structuredClone(e);mutate(x);await assert.rejects(reader(x,n.program,r.sourceTree),/unavailable/);});
 const absent=await reader(null,n.program,r.sourceTree);assert.throws(()=>absent.readPrivateQaFiniteCandidate(),/unavailable/);
});
test('real workerd executes decoder with actual emitted candidate and exposes metadata only in test fixture',async()=>{
 const r=await compiled,n=await node,script=await bundle(r.candidateResidency,n.program,r.sourceTree,true);
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat']}));
 try{const response=await mf.dispatchFetch('https://fixture.invalid');assert.equal(response.status,200);const x=await response.json();assert.deepEqual(x.module,r.candidateResidency.module);assert.equal(x.decodedHash,sha(r.files['canaryLive/index.mjs']));assert.equal(x.programHash,n.programHash);assert.equal(x.sourceRevision,M);assert.equal(x.sourceTree,r.sourceTree);assert.equal(x.bytes,undefined);assert.equal(x.script,undefined);assert.equal(x.content,undefined);}finally{await mf.dispose();}
});
