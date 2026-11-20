import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {compileFiniteNativeStaging,buildFiniteNativePackage} from '../scripts/build-finite-native-package.mjs';
const sha=x=>createHash('sha256').update(x).digest('hex');
test('real compiler binds exact tracked workflow/CLI hashes in QA only and excludes issuer build graph',async()=>{
 const M=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),r=await compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:M});
 assert(r.bootstrapSource,'independent source file commitments required');
 assert.equal(r.bootstrapSource.sourceRevision,M);assert.equal(r.bootstrapSource.sourceTree,r.sourceTree);
 for(const [key,path] of [['workflowHash','.github/workflows/afw-finite-qa-bootstrap.yml'],['cliHash','scripts/run-qa-finite-bootstrap.mjs']]){
  const hash=sha(await readFile(path));assert.equal(r.bootstrapSource[key],hash);assert(r.files['qaLive/index.mjs'].includes(Buffer.from(hash)));assert(!r.files['canaryLive/index.mjs'].includes(Buffer.from(hash)));
 }
 assert(r.metafiles.qaLive.inputs['lib/mcp-qa-finite-bootstrap-source.mjs']);
 for(const path of ['lib/mcp-qa-finite-initial-entry.mjs','lib/mcp-qa-finite-initial-entry-records.mjs'])assert(r.metafiles.qaLive.inputs[path]);
 assert.equal(r.metafiles.canaryLive.inputs['lib/mcp-qa-finite-initial-entry.mjs'],undefined);
 // Accepted M phase-context reads the original capsule codec; it imports Entry records as DATA only.
 assert(r.metafiles.canaryLive.inputs['lib/mcp-qa-finite-initial-entry-records.mjs']);
 for(const role of ['qaLive','canaryLive'])for(const output of Object.values(r.metafiles[role].outputs))assert(output.imports.every(x=>!/^node:fs(?:\/|$)/.test(x.path)),'no filesystem import in runtime graph');assert(!r.metafiles.canaryLive.inputs['lib/mcp-qa-finite-bootstrap-source.mjs']);
 for(const role of ['qaLive','canaryLive'])assert(Object.keys(r.metafiles[role].inputs).every(x=>!x.includes('bootstrap-issuer')&&!x.includes('build-finite-native-package')&&!x.includes('node_modules/esbuild')));
 assert.equal(r.completePackage,false);assert.equal(r.manifest,undefined);
 console.log('D0.1 ACTUAL compiler '+JSON.stringify({sourceRevision:r.sourceRevision,sourceTree:r.sourceTree,qa:{bytes:r.files['qaLive/index.mjs'].length,sha256:sha(r.files['qaLive/index.mjs']),publicStatic:r.modules.qaLive.publicStatic,inputs:Object.keys(r.metafiles.qaLive.inputs).length},m:{bytes:r.files['canaryLive/index.mjs'].length,sha256:sha(r.files['canaryLive/index.mjs']),publicStatic:r.modules.canaryLive.publicStatic,inputs:Object.keys(r.metafiles.canaryLive.inputs).length},completePackage:r.completePackage,operationalReadiness:r.operationalReadiness}));
 await assert.rejects(buildFiniteNativePackage({cwd:process.cwd(),sourceRevision:M}));
});
