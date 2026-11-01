import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {existsSync} from 'node:fs';
let api;
try{api=await import('../scripts/build-finite-native-package.mjs');}catch{/* Explicit missing compiler RED. */}
const sourceRevision=()=>execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
test('missing_factory_blocks_package',async()=>{
 assert.equal(typeof api?.buildFiniteNativePackage,'function','actual builder required');
 await assert.rejects(api.buildFiniteNativePackage({cwd:process.cwd(),sourceRevision:sourceRevision()}),/unavailable/i);
 assert.equal(existsSync('output/finite-native-package/manifest.json'),false);
});
test('stale_historical_artifact_blocks_upload',async()=>{
 assert.equal(typeof api?.buildFiniteNativePackage,'function','actual builder required');
 // Caller-supplied historical input cannot replace a source-approved exact locator.
 await assert.rejects(api.buildFiniteNativePackage({cwd:process.cwd(),sourceRevision:sourceRevision(),historicalArtifact:{expired:true}}),/unavailable/i);
 assert.equal(existsSync('output/finite-native-package/manifest.json'),false);
});

test('actual compiler staging hashes final bytes and retains source classes without eligible manifest',async()=>{
 assert.equal(typeof api?.compileFiniteNativeStaging,'function');
 const M=sourceRevision(),r=await api.compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:M});
 assert.equal(r.completePackage,false);assert.equal(r.operationalReadiness,false);
 assert.equal(r.manifest,undefined);assert.equal(r.sourceRevision,M);
 assert.deepEqual(Object.keys(r.files).sort(),['canaryLive/index.mjs','qaLive/index.mjs']);
 for(const role of ['qaLive','canaryLive']){
  const bytes=r.files[role+'/index.mjs'],d=r.modules[role];
  assert.equal(createHash('sha256').update(bytes).digest('hex'),d.module.sha256);
  assert.equal(bytes.length,d.module.bytes);assert.equal(d.provenance.sourceRevision,M);
  assert(r.metafiles[role].inputs[role==='qaLive'?'worker/independent-closure/index.mjs':'worker/mcp-own/index.mjs']);
 }
 assert.deepEqual(r.modules.canaryLive.module.exports,['AfwNodeControl','AfwOwnEventNode','default']);
 assert(r.modules.qaLive.module.exports.includes('IndependentClosure'));
 assert.equal(existsSync('output/finite-native-package/manifest.json'),false);
});
