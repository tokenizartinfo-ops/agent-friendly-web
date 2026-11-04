import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {compileFiniteNativeStaging} from '../scripts/build-finite-native-package.mjs';
const sha=v=>createHash('sha256').update(v).digest('hex');
test('one actual changed-graph compiler/residency check remains closed with original size ceilings',async()=>{
 const sourceRevision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),r=await compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision});
 assert.equal(r.sourceRevision,sourceRevision);assert.equal(r.completePackage,false);assert.equal(r.operationalReadiness,false);
 for(const path of ['lib/mcp-qa-finite-preparation-cleanup-records.mjs','lib/mcp-qa-finite-preparation-cleanup.mjs','lib/mcp-qa-finite-initial-anchors.mjs']){
  assert(r.metafiles.qaLive.inputs[path]);
  console.log('SOURCE '+path+' sha256='+sha(await readFile(path)));
 }
 // Pure DATA helpers may occur in the shared graph. Full QA-only sources and
 // actual embedded M payload must still be absent from canary.
 for(const path of ['lib/mcp-qa-finite-bootstrap-source.mjs','lib/mcp-qa-finite-candidate-residency.mjs']){
  assert(r.metafiles.qaLive.inputs[path]);assert.equal(r.metafiles.canaryLive.inputs[path],undefined);
 }
 assert(!r.files['canaryLive/index.mjs'].includes(Buffer.from(r.candidateResidency.content)));
 for(const role of ['qaLive','canaryLive']){
  for(const output of Object.values(r.metafiles[role].outputs))assert(output.imports.every(x=>!/^node:fs(?:\/|$)/.test(x.path)));
  assert(Object.keys(r.metafiles[role].inputs).every(x=>!x.includes('build-finite-native-package')&&!x.includes('bootstrap-issuer')&&!x.includes('node_modules/esbuild')));
  const bytes=r.files[role+'/index.mjs'];assert(bytes.length<=(role==='canaryLive'?2097152:3145728));
  assert.equal(sha(bytes),r.modules[role].module.sha256);
  console.log('ACTUAL MODULE '+role+' bytes='+bytes.length+' sha256='+sha(bytes));
 }
 assert.equal(r.candidateResidency.module.sha256,r.modules.canaryLive.module.sha256);assert(r.files['qaLive/index.mjs'].includes(Buffer.from(r.candidateResidency.content)));
 assert(r.candidateResidency.compressedBytes<=2098176);
 for(const path of ['lib/mcp-qa-finite-policy-transport.mjs','lib/mcp-qa-finite-initial-cleanup.mjs'])console.log('SOURCE '+path+' sha256='+sha(await readFile(path)));
});
