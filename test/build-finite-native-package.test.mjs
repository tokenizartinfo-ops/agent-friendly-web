import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {existsSync} from 'node:fs';
import {mkdtemp,readFile,appendFile,symlink,rm,realpath} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {verifyMcpReleaseSource} from '../scripts/mcp-release-source.mjs';
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
 assert.deepEqual(Object.keys(r.files).sort(),['canaryLive/index.mjs','qaCustodyProbe/index.mjs','qaLive/index.mjs']);
 const probe=r.custodyProbeTemplate,bytes=r.files['qaCustodyProbe/index.mjs'];
 assert.equal(probe.sourceRevision,M);
 assert.equal(probe.sourceTree,r.sourceTree);
 assert.equal(probe.authorizesEffects,false);
 assert.equal(probe.operationalReadiness,false);
 assert.equal(probe.module.bytes,bytes.byteLength);
 assert.equal(probe.module.sha256,createHash('sha256').update(bytes).digest('hex'));
 assert.deepEqual(probe.assemblyInputs,['./closed-rollback.mjs','./pre-entry-custody-context.mjs']);
 assert.equal(Object.hasOwn(r.modules,'qaCustodyProbe'),false);
 const {verifyColdQaCustodyMount}=await import('../scripts/verify-finite-native-rollback.mjs');
 const baseline=`
 import {DurableObject,WorkflowEntrypoint} from 'cloudflare:workers';
 export class IndependentClosure extends DurableObject {}
 export class PrivateQaBootstrap extends WorkflowEntrypoint {}
 export class PrivateQaNamedConfirmation extends WorkflowEntrypoint {}
 export class PrivateQaPreregistration extends DurableObject {}
 export default {fetch(){return new Response(null,{status:404});}};
 `;
 const mount=await verifyColdQaCustodyMount({code:bytes,baseline,sourceRevision:M,metadata:{
  compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],bindings:[],
 }});
 assert.deepEqual(mount,{coldAssemblyBlocked:true,outboundAttempts:0});
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

test('compiler imported from checkout A rejects independently verified checkout B with different Node source',async t=>{
 const ownerRoot=await realpath(process.cwd()),temporary=await mkdtemp(join(tmpdir(),'afw-finite-checkout-boundary-')),other=join(temporary,'checkout-b');
 let added=false;
 t.after(async()=>{
  if(added)execFileSync('git',['worktree','remove','--force',other],{cwd:ownerRoot,stdio:'pipe'});
  assert.equal(resolve(temporary).startsWith(resolve(tmpdir())+'/afw-finite-checkout-boundary-'),true);
  await rm(temporary,{recursive:true,force:true});
 });
 execFileSync('git',['worktree','add','--detach',other,sourceRevision()],{cwd:ownerRoot,stdio:'pipe'});added=true;
 const nodePath='worker/mcp-node/server.mjs';
 await appendFile(join(other,nodePath),'\nconsole.info("SYNTHETIC_CHECKOUT_B_NODE_PROGRAM");\n');
 execFileSync('git',['add','--',nodePath],{cwd:other,stdio:'pipe'});
 execFileSync('git',['-c','user.name=AFW synthetic test','-c','user.email=synthetic@example.invalid','-c','core.hooksPath=/dev/null','commit','-m','test-only divergent Node source'],{cwd:other,stdio:'pipe'});
 await symlink(join(ownerRoot,'node_modules'),join(other,'node_modules'),'dir');
 const revision=execFileSync('git',['rev-parse','HEAD'],{cwd:other,encoding:'utf8'}).trim();
 assert.notEqual(revision,sourceRevision());
 assert.notEqual(await readFile(join(other,nodePath),'utf8'),await readFile(join(ownerRoot,nodePath),'utf8'));
 // B is a real clean, independently verified checkout. The rejection must be
 // the executing-compiler boundary, not invalid Git/configuration/dependencies.
 assert.equal((await verifyMcpReleaseSource({cwd:other,sourceRevision:revision})).sourceRevision,revision);
 await assert.rejects(api.compileFiniteNativeStaging({cwd:other,sourceRevision:revision}),{message:'Finite native package unavailable'});
});
test('canonical symlink alias of executing checkout remains the same trusted root',async t=>{
 const temporary=await mkdtemp(join(tmpdir(),'afw-finite-root-alias-')),alias=join(temporary,'same-checkout');
 t.after(async()=>{assert.equal(resolve(temporary).startsWith(resolve(tmpdir())+'/afw-finite-root-alias-'),true);await rm(temporary,{recursive:true,force:true});});
 await symlink(await realpath(process.cwd()),alias,'dir');
 const staged=await api.compileFiniteNativeStaging({cwd:alias,sourceRevision:sourceRevision()});
 assert.equal(staged.completePackage,false);assert.equal(staged.sourceRevision,sourceRevision());
 assert(staged.files['canaryLive/index.mjs'].length>0);
});
