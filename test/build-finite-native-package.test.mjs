import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
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
