import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {verifyMcpReleaseSource} from './mcp-release-source.mjs';
import {buildMcpNodeProgram} from './build-mcp-node-program.mjs';
import {finiteWranglerProfileTemplate,finitePublicStaticExpectation} from '../lib/mcp-qa-finite-profile.mjs';
const exec=promisify(execFile),hash=x=>createHash('sha256').update(x).digest('hex');
const fail=()=>{throw Error('Finite native package unavailable');};
const workflow='.github/workflows/afw-finite-native-package.yml';
const roles=['qaLive','canaryLive'];
const paths={qaLive:'wrangler.independent-closure-qa.finite.jsonc',canaryLive:'wrangler.mcp-own.finite.jsonc'};
const expectedExports={qaLive:['IndependentClosure','PrivateQaBootstrap','PrivateQaCatalog','PrivateQaNamedConfirmation','PrivateQaPreregistration','default','observePrivateQa'],canaryLive:['AfwNodeControl','AfwOwnEventNode','default']};
function options(v){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==2)fail();
 for(const k of ['cwd','sourceRevision']){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value')||typeof d.value!=='string')fail();}
 if(!/^[a-f0-9]{40}$/.test(v.sourceRevision))fail();return v;
}
async function inputs(cwd,revision){
 const result={};
 const origin=(await exec('git',['remote','get-url','origin'],{cwd,encoding:'utf8',timeout:10000})).stdout.trim();
 if(!['https://github.com/tokenizartinfo-ops/agent-friendly-web','https://github.com/tokenizartinfo-ops/agent-friendly-web.git'].includes(origin))fail();
 for(const path of [workflow,...Object.values(paths)]){
  const bytes=await readFile(resolve(cwd,path)),tracked=(await exec('git',['show',revision+':'+path],{cwd,encoding:null,timeout:10000,maxBuffer:1048576})).stdout;
  if(!bytes.equals(tracked))fail();result[path]=hash(bytes);
  const role=roles.find(r=>paths[r]===path);if(role)assert.deepEqual(JSON.parse(bytes),finiteWranglerProfileTemplate(role));
 }return result;
}
/** Real compiler staging, deliberately NOT a package or deployment attestation.
 * No provider, private policy, callback, caller pins or readiness flag accepted. */
export async function compileFiniteNativeStaging(input){
 try{
  const {cwd,sourceRevision}=options(input),before=await verifyMcpReleaseSource({cwd,sourceRevision}),inputBefore=await inputs(cwd,sourceRevision);
  const node=await buildMcpNodeProgram(),files={},modules={},metafiles={};
  for(const role of roles){
   const config=finiteWranglerProfileTemplate(role),entry=config.main;
   const compiled=await build({absWorkingDir:cwd,entryPoints:[entry],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',sourcemap:false,metafile:true,define:{
    'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(sourceRevision),
    'globalThis.__AFW_NODE_SOURCE_REVISION__':JSON.stringify(sourceRevision),
    'globalThis.__AFW_NODE_PROGRAM__':JSON.stringify(node.program),
    'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify('finite_trial_event'),
   }});
   const out=Object.values(compiled.metafile.outputs);
   if(compiled.outputFiles.length!==1||out.length!==1)fail();
   assert.deepEqual(out[0].exports.slice().sort(),expectedExports[role]);
   const original=role==='qaLive'?'worker/independent-closure/index.mjs':'worker/mcp-own/index.mjs';
   if(!compiled.metafile.inputs[entry]||!compiled.metafile.inputs[original])fail();
   const bytes=compiled.outputFiles[0].contents;
   if(bytes.length<1||bytes.length>3145728)fail();
   files[role+'/index.mjs']=Buffer.from(bytes);
   modules[role]={provenance:{kind:'compiled-source.v1',sourceRevision,sourceTree:before.tree},module:{name:'index.mjs',sha256:hash(bytes),bytes:bytes.length,exports:out[0].exports.slice().sort()},publicStatic:finitePublicStaticExpectation(role)};
   metafiles[role]=compiled.metafile;
  }
  const after=await verifyMcpReleaseSource({cwd,sourceRevision});assert.deepEqual(after,before);assert.deepEqual(await inputs(cwd,sourceRevision),inputBefore);
  return {purpose:'afw.finite-native-compiler-staging.v1',sourceRevision,sourceTree:after.tree,sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:inputBefore[workflow],modules,files,metafiles,completePackage:false,operationalReadiness:false};
 }catch{fail();}
}
/** Complete-package boundary. Deliberately no positive path until separately
 * reviewed historical input custody/privacy and actual native mounts qualify.
 * Class exports and successful compilation are insufficient evidence. */
export async function buildFiniteNativePackage(input){
 options(input);
 await compileFiniteNativeStaging(input);
 // No exact approved historical artifact locator/normalized metadata exists.
 // Native5 launcher, 4C2 factories, 4C3 receiver/nominal and rollback compatibility
 // are also missing. Do not accept a caller boolean, callback or artifact path.
 fail();
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 if(process.argv.length!==3&&!(process.argv.length===4&&process.argv[2]==='--staging'))fail();
 const staging=process.argv[2]==='--staging',sourceRevision=process.argv[staging?3:2],cwd=fileURLToPath(new URL('..',import.meta.url));
 const built=staging?await compileFiniteNativeStaging({cwd,sourceRevision}):await buildFiniteNativePackage({cwd,sourceRevision});
 // Separate isolated staging namespace; never eligible artifact name/layout.
 const root=resolve(cwd,staging?'output/finite-native-staging':'output/finite-native-package');
 for(const [path,bytes] of Object.entries(built.files)){const target=resolve(root,path);await mkdir(resolve(target,'..'),{recursive:true});await writeFile(target,bytes);}
 if(staging){const evidence={...built};delete evidence.files;delete evidence.metafiles;await writeFile(resolve(root,'staging.json'),JSON.stringify(evidence,null,2)+'\n');}
}
