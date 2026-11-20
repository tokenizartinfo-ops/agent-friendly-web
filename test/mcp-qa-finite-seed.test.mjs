import {v2Manifest} from './fixtures/finite-v2.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as api from '../lib/mcp-qa-finite-seed.mjs';

// Independent test canonicalizer/digest; fixtures establish syntax only.
const canonical=v=>Array.isArray(v)?'['+v.map(canonical).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}':JSON.stringify(v);
const digest=(domain,v)=>createHash('sha256').update(domain+'\n'+canonical(v)).digest('hex');
const roles=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
function fixture(){
 const descriptor=role=>({sourceRevision:'c'.repeat(40),sourceTree:'d'.repeat(40),module:{name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',sha256:'e'.repeat(64),bytes:3145728,exports:['$export','A','_export','z']},configurationHash:'1'.repeat(64),profileHash:'2'.repeat(64),bindingsHash:'3'.repeat(64)});
 const manifest={purpose:'afw.finite-native-package.v2',sourceRevision:'b'.repeat(40),sourceTree:'f'.repeat(40),sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:'4'.repeat(64),modules:Object.fromEntries(roles.map(role=>[role,descriptor(role)])),compatibility:Object.fromEntries(['qaClassesPreserved','qaNamespacesPreserved','canaryClassesPreserved','canaryNamespacesPreserved','closedEntrypointsDenied','legacyContainmentQualified'].map(k=>[k,true]))};
 v2Manifest(manifest);
 return {purpose:'afw.finite-material-seed.v2',repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:1347578006,intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40),commandId:'123',finalizer:{runId:11,attempt:1,jobId:12,workflowPath:'.github/workflows/afw-finite-finalizer.yml',seedStep:'seed-material'},build:{workflowPath:'.github/workflows/afw-finite-native-package.yml',runId:13,attempt:1,artifactId:14,artifactName:'afw-finite-native-package-'+'b'.repeat(40),artifactDigest:'sha256:'+'5'.repeat(64),manifestHash:digest('afw.finite-native-manifest.v2',manifest)},manifest,qaPublication:{purpose:'afw.finite-qa-publication.v1',accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-independent-closure-qa',qaLive:{configurationHash:'1'.repeat(64),versionId:'11111111-1111-4111-8111-111111111111',deploymentId:'22222222-2222-4222-8222-222222222222',...Object.fromEntries(['module','publicStatic'].map(k=>[k,structuredClone(manifest.modules.qaLive[k])]))},qaClosed:{configurationHash:'1'.repeat(64),versionId:'c570b60b-95dc-48e1-89f3-9c4651691dbc',...Object.fromEntries(['module','publicStatic'].map(k=>[k,structuredClone(manifest.modules.qaClosed[k])]))},observedAt:Date.parse('2026-11-01T20:00:00Z')}};
}
const envelope=seed=>canonical({purpose:'afw.finite-material-seed-envelope.v2',seed,seedHash:digest('afw.finite-material-seed.v2',seed)});
function frozen(v){if(v&&typeof v==='object'){assert.equal(Object.isFrozen(v),true);for(const x of Object.values(v))frozen(x);}}
test('canonical roundtrip uses independent domains, immutable copy, historical descriptor provenance',()=>{
 const seed=fixture(),before=structuredClone(seed),text=api.encodeFiniteMaterialSeed(seed);
 assert.equal(text,envelope(seed));assert.equal(text.includes('\n'),false);
 const result=api.decodeFiniteMaterialSeed(text);
 assert.deepEqual(result,{seed,seedHash:digest('afw.finite-material-seed.v2',seed)});frozen(result);
 assert.notEqual(result.seed,seed);assert.deepEqual(seed,before);
 assert.notEqual(seed.manifest.modules.operatorClosed.provenance.sourceRevision,seed.sourceRevision);
 const reversed=Object.fromEntries(Object.entries(seed).reverse());assert.equal(api.encodeFiniteMaterialSeed(reversed),text);
 const manifest=api.validateFinitePackageManifest(seed.manifest);frozen(manifest);assert.notEqual(manifest,seed.manifest);
 assert.equal(api.encodeFinitePackageManifest(seed.manifest),canonical(seed.manifest));
 assert.equal(api.hashFinitePackageManifest(seed.manifest),seed.build.manifestHash);
 seed.manifest.modules.qaLive.module.bytes=1;assert.equal(result.seed.manifest.modules.qaLive.module.bytes,3145728);
});
const cases={
 'missing QA publication':s=>delete s.qaPublication,
 'foreign publication account':s=>s.qaPublication.accountId='a'.repeat(32),
 'foreign publication worker':s=>s.qaPublication.workerName='foreign',
 'unknown publication field':s=>s.qaPublication.token='secret',
 'wrong closed locator':s=>s.qaPublication.qaClosed.versionId=s.qaPublication.qaLive.versionId,
 'profile mismatch':s=>s.qaPublication.qaLive.publicStatic.profileHash='0'.repeat(64),
 'module mismatch':s=>s.qaPublication.qaClosed.module.bytes++,
 'noninteger publication date':s=>s.qaPublication.observedAt=1.5,
 'wrong repository':s=>s.repository='other/repo',
 'wrong repository ID':s=>s.repositoryId++,
 'wrong seed purpose':s=>s.purpose='other',
 'intent upper hex':s=>s.intentId='A'.repeat(64),
 'short source':s=>s.sourceRevision='b'.repeat(39),
 'numeric command':s=>s.commandId=123,
 'zero command':s=>s.commandId='0',
 'leading zero command':s=>s.commandId='01',
 'empty command':s=>s.commandId='',
 'finalizer zero run':s=>s.finalizer.runId=0,
 'finalizer unsafe job':s=>s.finalizer.jobId=Number.MAX_SAFE_INTEGER+1,
 'finalizer fractional job':s=>s.finalizer.jobId=1.5,
 'finalizer attempt2':s=>s.finalizer.attempt=2,
 'finalizer path':s=>s.finalizer.workflowPath='.github/workflows/other.yml',
 'finalizer step':s=>s.finalizer.seedStep='admit-and-ready',
 'build path':s=>s.build.workflowPath='other',
 'build zero run':s=>s.build.runId=0,
 'build zero artifact':s=>s.build.artifactId=0,
 'build attempt2':s=>s.build.attempt=2,
 'build artifact name':s=>s.build.artifactName='afw-finite-native-package-other',
 'build artifact digest':s=>s.build.artifactDigest='sha256:'+'A'.repeat(64),
 'build manifest digest':s=>s.build.manifestHash='0'.repeat(64),
 'manifest purpose':s=>s.manifest.purpose='other',
 'manifest source mismatch':s=>s.manifest.sourceRevision='c'.repeat(40),
 'manifest tree':s=>s.manifest.sourceTree='f'.repeat(39),
 'manifest sourceCheck':s=>s.manifest.sourceCheck='other',
 'manifest workflow hash':s=>s.manifest.buildWorkflowHash='A'.repeat(64),
 'missing role':s=>delete s.manifest.modules.qaClosed,
 'extra role':s=>s.manifest.modules.extra=s.manifest.modules.qaLive,
 'missing descriptor provenance':s=>delete s.manifest.modules.operatorClosed.provenance.receiptKey,
 'bad descriptor tree':s=>s.manifest.modules.qaLive.provenance.sourceTree='x'.repeat(40),
 'bad configuration hash':s=>s.manifest.modules.qaLive.publicStatic.configurationHash='x'.repeat(64),
 'bad profile hash':s=>s.manifest.modules.qaLive.publicStatic.profileHash=null,
 'bad binding hash':s=>s.manifest.modules.qaLive.publicStatic.bindingsHash=1,
 'module basename':s=>s.manifest.modules.qaLive.module.name='qaLive/index.mjs',
 'module zero bytes':s=>s.manifest.modules.qaLive.module.bytes=0,
 'module over cap':s=>s.manifest.modules.qaLive.module.bytes=3145729,
 'module unsafe bytes':s=>s.manifest.modules.qaLive.module.bytes=Number.MAX_SAFE_INTEGER+1,
 'module fractional bytes':s=>s.manifest.modules.qaLive.module.bytes=1.5,
 'module infinite bytes':s=>s.manifest.modules.qaLive.module.bytes=Infinity,
 'module NaN bytes':s=>s.manifest.modules.qaLive.module.bytes=NaN,
 'module hash':s=>s.manifest.modules.qaLive.module.sha256='e'.repeat(63),
 'export129':s=>s.manifest.modules.qaLive.module.exports=Array.from({length:129},(_,i)=>'export'+String(i).padStart(3,'0')),
 'export duplicate':s=>s.manifest.modules.qaLive.module.exports=['A','A'],
 'export unsorted':s=>s.manifest.modules.qaLive.module.exports=['z','A'],
 'export nonASCII':s=>s.manifest.modules.qaLive.module.exports=['é'],
 'export invalid identifier':s=>s.manifest.modules.qaLive.module.exports=['a-b'],
 'export too long':s=>s.manifest.modules.qaLive.module.exports=['a'.repeat(129)],
 'export wrong type':s=>s.manifest.modules.qaLive.module.exports='A',
 'compatibility false':s=>s.manifest.compatibility.closedEntrypointsDenied=false,
 'unknown root':s=>s.extra=true,
 'unknown module':s=>s.manifest.modules.qaLive.module.extra=true,
 'prototype key':s=>Object.defineProperty(s,'__proto__',{value:{},enumerable:true}),
 'constructor key':s=>s.manifest.constructor='x',
 'prototype object':s=>Object.setPrototypeOf(s,{extra:true}),
 'nonplain date':s=>s.manifest=new Date(),
 'symbol key':s=>s[Symbol('extra')]=1,
 'accessor':s=>Object.defineProperty(s.finalizer,'runId',{get(){throw Error('accessor invoked');},enumerable:true}),
 'array accessor':s=>Object.defineProperty(s.manifest.modules.qaLive.module.exports,'0',{get(){throw Error('accessor invoked');},enumerable:true}),
 'sparse array':s=>delete s.manifest.modules.qaLive.module.exports[0],
 'array property':s=>s.manifest.modules.qaLive.module.exports.extra=true,
 'nonenumerable':s=>Object.defineProperty(s,'extra',{value:1}),
};
for(const [name,mutate] of Object.entries(cases))test('encode rejects '+name,()=>{
 const seed=fixture();mutate(seed);assert.throws(()=>api.encodeFiniteMaterialSeed(seed),/Finite material/);
});
for(const field of ['planHash','controlHash','selectors','policy','grant','token','callback'])test('private '+field+' rejected at every structural boundary',()=>{
 const seed=fixture();for(const value of [seed,seed.finalizer,seed.build,seed.manifest,seed.manifest.modules,seed.manifest.modules.qaLive,seed.manifest.modules.qaLive.module,seed.manifest.compatibility,seed.qaPublication,seed.qaPublication.qaLive,seed.qaPublication.qaClosed]){
  value[field]='private';assert.throws(()=>api.encodeFiniteMaterialSeed(seed),/Finite material/);delete value[field];
 }
});
test('manifest helpers share structural validation and reject oversized manifest',()=>{
 const manifest=fixture().manifest;manifest.modules.qaLive.module.exports=['z','A'];
 for(const fn of [api.validateFinitePackageManifest,api.encodeFinitePackageManifest,api.hashFinitePackageManifest])assert.throws(()=>fn(manifest),/Finite material/);
 const large=fixture().manifest;for(const role of roles)large.modules[role].module.exports=Array.from({length:128},(_,i)=>'a'+String(i).padStart(3,'0')+'x'.repeat(124));
 assert.ok(Buffer.byteLength(canonical(large))>24576);assert.throws(()=>api.validateFinitePackageManifest(large),/Finite material/);
});
test('empty and 128 valid exports accepted; maximum safe IDs preserved',()=>{
 const seed=fixture();seed.finalizer.runId=Number.MAX_SAFE_INTEGER;seed.manifest.modules.qaLive.module.exports=[];
 seed.manifest.modules.qaClosed.module.exports=Array.from({length:128},(_,i)=>'a'+String(i).padStart(3,'0'));
 for(const role of ['qaLive','qaClosed'])seed.qaPublication[role].module=structuredClone(seed.manifest.modules[role].module);
 seed.build.manifestHash=digest('afw.finite-native-manifest.v2',seed.manifest);
 assert.deepEqual(api.decodeFiniteMaterialSeed(api.encodeFiniteMaterialSeed(seed)).seed,seed);
});
test('decode rejects duplicate keys including escaped duplicates and nested duplicates',()=>{
 const text=envelope(fixture());for(const bad of [
 text.replace('"purpose":"afw.finite-material-seed-envelope.v2"','"purpose":"ignored","purpose":"afw.finite-material-seed-envelope.v2"'),
 text.replace('"purpose":"afw.finite-material-seed-envelope.v2"','"pur\\u0070ose":"ignored","purpose":"afw.finite-material-seed-envelope.v2"'),
 text.replace('"attempt":1','"attempt":2,"attempt":1'),
 ])assert.throws(()=>api.decodeFiniteMaterialSeed(bad),/Finite material/);
});
test('decode enforces canonical envelope, both digests and exact keys',()=>{
 const text=envelope(fixture()),parsed=JSON.parse(text);
 for(const bad of [
 text+'\n',' '+text,JSON.stringify(parsed,null,2),JSON.stringify({...parsed,seedHash:'0'.repeat(64)}),
 canonical({...parsed,purpose:'other'}),canonical({...parsed,extra:1}),canonical({...parsed,seedHash:'A'.repeat(64)}),
 text.replace('"repositoryId":1347578006','"repositoryId":1.347578006e9'),
 text.replace('"seed":{','"seed":{"__proto__":{},'),
 ])assert.throws(()=>api.decodeFiniteMaterialSeed(bad),/Finite material/);
 const seed=fixture();seed.build.manifestHash='0'.repeat(64);assert.throws(()=>api.decodeFiniteMaterialSeed(envelope(seed)),/Finite material/);
});
test('envelope UTF8 byte bound, depth and node bounds fail closed',()=>{
 const seed=fixture(),text=envelope(seed),huge=' '.repeat(32769);
 assert.throws(()=>api.decodeFiniteMaterialSeed(huge),/Finite material/);
 seed.commandId='1'.repeat(32769);assert.throws(()=>api.encodeFiniteMaterialSeed(seed),/Finite material/);
 const atBoundary=fixture();let width=32768-Buffer.byteLength(envelope(atBoundary))+atBoundary.commandId.length;
 atBoundary.commandId='1'.repeat(width);assert.equal(Buffer.byteLength(envelope(atBoundary)),32768);
 assert.equal(api.encodeFiniteMaterialSeed(atBoundary),envelope(atBoundary));atBoundary.commandId+='1';
 assert.throws(()=>api.encodeFiniteMaterialSeed(atBoundary),/Finite material/);
 let nested=null;for(let i=0;i<13;i++)nested={x:nested};
 assert.throws(()=>api.validateFinitePackageManifest(nested),/Finite material/);
 assert.throws(()=>api.validateFinitePackageManifest({x:Array(2049).fill(1)}),/Finite material/);
 assert.throws(()=>api.decodeFiniteMaterialSeed(text.slice(0,-1)),/Finite material/);
});

test('fixed QA closed basename preserves closed-rollback.mjs and rejects relabeling',()=>{
 const manifest=fixture().manifest;
 assert.equal(api.validateFinitePackageManifest(manifest).modules.qaClosed.module.name,'closed-rollback.mjs');
 manifest.modules.qaClosed.module.name='index.mjs';
 assert.throws(()=>api.validateFinitePackageManifest(manifest),/Finite material/);
});
test('other fixed roles cannot adopt the QA closed module basename',()=>{
 for(const role of roles.filter(r=>r!=='qaClosed')){
  const manifest=fixture().manifest;manifest.modules[role].module.name='closed-rollback.mjs';
  assert.throws(()=>api.validateFinitePackageManifest(manifest),/Finite material/);
 }
});
