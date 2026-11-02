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
 assert(r.metafiles.qaLive.inputs['lib/mcp-qa-finite-bootstrap-source.mjs']);assert(!r.metafiles.canaryLive.inputs['lib/mcp-qa-finite-bootstrap-source.mjs']);
 for(const role of ['qaLive','canaryLive'])assert(Object.keys(r.metafiles[role].inputs).every(x=>!x.includes('bootstrap-issuer')&&!x.includes('build-finite-native-package')&&!x.includes('node_modules/esbuild')));
 assert.equal(r.completePackage,false);assert.equal(r.manifest,undefined);
 console.log('ACTUAL compiler bytes QA='+r.files['qaLive/index.mjs'].length+' canary='+r.files['canaryLive/index.mjs'].length);
 await assert.rejects(buildFiniteNativePackage({cwd:process.cwd(),sourceRevision:M}));
});
