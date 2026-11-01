import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile, mkdtemp, mkdir, stat, writeFile, symlink} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

const sourceRevision=process.env.GITHUB_SHA??'a'.repeat(40);
async function api(){
 const builder=await import('../lib/mcp-qa-native-wrapper-build.mjs').catch(()=>null);
 const validator=await import('../lib/mcp-qa-native-artifact.mjs').catch(()=>null);
 assert.equal(typeof builder?.buildQaNativeWrapper,'function','fixed builder API exists');
 assert.equal(typeof validator?.validateQaNativeArtifact,'function','dependency-free validator API exists');
 return {...builder,...validator};
}
let built;
async function artifact(){const {buildQaNativeWrapper}=await api();return built??=await buildQaNativeWrapper({sourceRevision});}
const replace=(a,k,v)=>({...a,[k]:v});
test('actual build validates against source-committed pin and is immutable',async()=>{
 const a=await artifact(),{validateQaNativeArtifact}=await api();
 assert.equal(a.purpose,'afw.qa-native-wrapper-artifact.v1');assert.equal(a.moduleName,'index.mjs');
 assert.ok(Object.isFrozen(a));assert.ok(a.bytes>0&&a.bytes<=131072);
 assert.equal(a.authorizesEffects,false);assert.equal(a.operationalReadiness,false);
 console.log('AFW_NATIVE_WRAPPER_PIN_RECEIPT',JSON.stringify({sourceRevision,sha256:a.sha256,bytes:a.bytes}));
 assert.deepEqual(validateQaNativeArtifact({artifact:a,sourceRevision}),a);
 assert.ok(Object.isFrozen(validateQaNativeArtifact({artifact:a,sourceRevision})));
});
test('separate context keeps wrapper bytes identical for distinct source revisions',async()=>{
 const {buildQaNativeWrapper}=await api(),a=await artifact(),b=await buildQaNativeWrapper({sourceRevision:'b'.repeat(40)});
 assert.equal(a.base64,b.base64);assert.equal(a.sha256,b.sha256);assert.equal(a.bytes,b.bytes);assert.notEqual(a.sourceRevision,b.sourceRevision);
});
test('builder rejects caller-selected inputs and malformed source revisions',async()=>{
 const {buildQaNativeWrapper}=await api();
 for(const o of [{sourceRevision:'main'},{sourceRevision:'A'.repeat(40)},{sourceRevision,entryPoint:'anything'},{sourceRevision,get path(){throw Error('getter');}}])await assert.rejects(()=>buildQaNativeWrapper(o));
});
for(const [name,change] of [
 ['noncanonical base64',a=>replace(a,'base64',a.base64+'\n')],
 ['byte count',a=>replace(a,'bytes',a.bytes-1)],
 ['bad hash',a=>replace(a,'sha256','0'.repeat(64))],
 ['wrong source',a=>replace(a,'sourceRevision','b'.repeat(40))],
 ['unknown key',a=>({...a,forged:true})],
 ['wrong baseline',a=>replace(a,'baselineVersionId','00000000-0000-0000-0000-000000000000')],
 ['oversize',a=>replace(a,'bytes',131073)],
 ['authority',a=>replace(a,'authorizesEffects',true)],
 ['null prototype',a=>Object.assign(Object.create(null),a)],
 ['symbol key',a=>({...a,[Symbol('extra')]:true})],
 ['hidden field',a=>Object.defineProperty({...a},'sha256',{value:a.sha256,enumerable:false})],
]){
 test('validator rejects '+name,async()=>{const a=await artifact(),{validateQaNativeArtifact}=await api();assert.throws(()=>validateQaNativeArtifact({artifact:change(a),sourceRevision}));});
}
test('accessors are rejected without invocation',async()=>{
 const a={...await artifact()},{validateQaNativeArtifact}=await api();let invoked=false;
 Object.defineProperty(a,'sha256',{get(){invoked=true;throw Error('secret');},enumerable:true});
 assert.throws(()=>validateQaNativeArtifact({artifact:a,sourceRevision}));assert.equal(invoked,false);
});
test('edited bytes plus edited manifest hash cannot replace the committed pin',async()=>{
 const a=await artifact(),{validateQaNativeArtifact}=await api(),bytes=Buffer.from(a.base64,'base64');
 bytes[0]^=1;const forged={...a,base64:bytes.toString('base64'),sha256:createHash('sha256').update(bytes).digest('hex')};
 assert.throws(()=>validateQaNativeArtifact({artifact:forged,sourceRevision}));
});
test('validator is importable with builtins alone and performs no source evaluation',async()=>{
 const source=await readFile('lib/mcp-qa-native-artifact.mjs','utf8');
 assert.doesNotMatch(source,/esbuild|\beval\s*\(|new\s+Function|import\s*\(/);
 const {validateQaNativeArtifact}=await api();assert.throws(()=>validateQaNativeArtifact({artifact:awaitNever(),sourceRevision}));
 function awaitNever(){return {get base64(){throw Error('do not execute');}};}
});
test('validator runs in a standalone child without any npm module tree',async()=>{
 const a=await artifact(),dir=await mkdtemp(join(tmpdir(),'afw-native-validator-'));
 for(const name of ['mcp-qa-native-artifact.mjs','mcp-qa-native-wrapper-pin.mjs'])await writeFile(join(dir,name),await readFile('lib/'+name));
 const code="import {readFileSync} from 'node:fs';const {validateQaNativeArtifact}=await import("+JSON.stringify(pathToFileURL(join(dir,'mcp-qa-native-artifact.mjs')).href)+");validateQaNativeArtifact(JSON.parse(readFileSync(0,'utf8')));console.log('validated');";
 const result=spawnSync(process.execPath,['--input-type=module','-e',code],{cwd:dir,input:JSON.stringify({artifact:a,sourceRevision}),encoding:'utf8',env:{PATH:process.env.PATH}});
 assert.equal(result.status,0,result.stderr);assert.equal(result.stdout.trim(),'validated');
});
test('CLI rejects missing runner, invalid source, and symlink runner roots',async()=>{
 const runner=await mkdtemp(join(tmpdir(),'afw-native-cli-root-')),link=runner+'-link';
 await symlink(runner,link,'dir');
 for(const changed of [{RUNNER_TEMP:''},{RUNNER_TEMP:'relative'},{RUNNER_TEMP:link},{GITHUB_SHA:'main'},{GITHUB_ACTIONS:'false'}]){
  const result=spawnSync(process.execPath,['scripts/qa-native-wrapper-build.mjs'],{env:{...process.env,GITHUB_ACTIONS:'true',RUNNER_TEMP:runner,GITHUB_SHA:sourceRevision,...changed},encoding:'utf8'});
  assert.notEqual(result.status,0);assert.equal(result.stdout,'');assert.ok(result.stderr.length<128);
 }
});
test('CLI writes only fixed private runner files, omits base64 and refuses overwrite',async()=>{
 const a=await artifact(),runner=await mkdtemp(join(tmpdir(),'afw-native-test-'));
 const env={...process.env,GITHUB_ACTIONS:'true',RUNNER_TEMP:runner,GITHUB_SHA:sourceRevision};
 const call=(args=[])=>spawnSync(process.execPath,['scripts/qa-native-wrapper-build.mjs',...args],{cwd:resolve('.'),env,encoding:'utf8'});
 const good=call();assert.equal(good.status,0,good.stderr);assert.ok(good.stdout.length<1024);assert.ok(!good.stdout.includes(a.base64.slice(0,64)));
 const dir=join(runner,'afw-native-observation'),entryModule=await readFile(join(dir,'index.mjs'));
 assert.equal(entryModule.toString('base64'),a.base64);const manifest=JSON.parse(await readFile(join(dir,'wrapper-manifest.json'),'utf8'));
 assert.equal(Object.hasOwn(manifest,'base64'),false);assert.equal(manifest.sha256,a.sha256);
 if(process.platform!=='win32'){assert.equal((await stat(join(dir,'index.mjs'))).mode&0o777,0o600);assert.equal((await stat(join(dir,'wrapper-manifest.json'))).mode&0o777,0o600);}
 assert.notEqual(call().status,0);assert.notEqual(call(['--output','elsewhere']).status,0);
 const blocked=await mkdtemp(join(tmpdir(),'afw-native-preexisting-'));await mkdir(join(blocked,'afw-native-observation'));
 assert.notEqual(spawnSync(process.execPath,['scripts/qa-native-wrapper-build.mjs'],{env:{...env,RUNNER_TEMP:blocked},encoding:'utf8'}).status,0);
});
