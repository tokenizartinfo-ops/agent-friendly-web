import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {verifyMcpReleaseSource} from './mcp-release-source.mjs';
import {buildPrivateQaClosedContext} from './build-private-qa-closed-context.mjs';
import {RELEASE_TARGET} from '../lib/mcp-release-operator-policy.mjs';
const exec=promisify(execFile),hash=x=>createHash('sha256').update(x).digest('hex'),fail=()=>{throw Error('Fixed QA artifact context build unavailable');};
const receiptPath='scripts/mcp-confirmation-frozen-artifact.json',workflowPath='.github/workflows/afw-named-confirmation-package.yml';
function fields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();return Object.fromEntries(keys.map(k=>{const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return[k,d.value];}));}
export function validateFixedQaArtifactContext(artifact,receipt){
 try{
  const r=fields(receipt,['baseVersionId','artifactKey','sourceRevision','sourceTree','programHash','workerHash','workerBytes','sourceCheck']),a=fields(artifact,['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck']);
  if(typeof r.baseVersionId!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(r.baseVersionId)||!['sourceRevision','sourceTree'].every(k=>typeof r[k]==='string'&&/^[a-f0-9]{40}$/.test(r[k]))||!['programHash','workerHash','artifactKey'].every(k=>typeof r[k]==='string'&&/^[a-f0-9]{64}$/.test(r[k]))||r.sourceCheck!=='git-inputs-before-after-v1'||!Number.isSafeInteger(r.workerBytes)||r.workerBytes<1||r.workerBytes>2097152||typeof a.script!=='string'||Buffer.byteLength(a.script)!==r.workerBytes||hash(a.script)!==r.workerHash||['sourceRevision','sourceTree','programHash','workerHash','sourceCheck'].some(k=>a[k]!==r[k])||hash(JSON.stringify([RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,r.workerHash]))!==r.artifactKey)fail();
  // Preserve original artifact order: it is part of namedBundleHash runtime bytes.
  return Object.freeze({artifact:Object.freeze(Object.fromEntries(Object.keys(artifact).map(k=>[k,a[k]]))),receipt:Object.freeze(r)});
 }catch{fail();}
}
async function committed(cwd,revision,path){
 const bytes=await readFile(resolve(cwd,path)),stored=(await exec('git',['show',revision+':'+path],{cwd,encoding:null,timeout:10000,maxBuffer:1048576,windowsHide:true})).stdout;if(!bytes.equals(stored))fail();return bytes;
}
/** Build only. Does not read a real grant/policy/packet, authenticate or publish. */
export async function buildPrivateQaNamedContext(input){
 try{
  const {cwd,sourceRevision,artifact}=fields(input,['cwd','sourceRevision','artifact']);if(typeof cwd!=='string'||typeof sourceRevision!=='string'||!/^[a-f0-9]{40}$/.test(sourceRevision))fail();
  const before=await verifyMcpReleaseSource({cwd,sourceRevision}),receiptBefore=await committed(cwd,sourceRevision,receiptPath),workflowBefore=await committed(cwd,sourceRevision,workflowPath),context=validateFixedQaArtifactContext(artifact,JSON.parse(receiptBefore.toString('utf8')));
  const closed=await buildPrivateQaClosedContext({cwd,sourceRevision});
  const built=await build({absWorkingDir:cwd,entryPoints:['worker/independent-closure/index.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',sourcemap:false,metafile:true,define:{'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(sourceRevision),'globalThis.__AFW_QA_NAMED_ARTIFACT_CONTEXT__':JSON.stringify(context)}});
  const outputs=Object.values(built.metafile.outputs);if(built.outputFiles.length!==1||outputs.length!==1)fail();assert.deepEqual(outputs[0].exports.slice().sort(),closed.manifest.module.exports);
  const script=built.outputFiles[0].text,bytes=Buffer.byteLength(script);if(bytes<1||bytes>3145728)fail();
  const after=await verifyMcpReleaseSource({cwd,sourceRevision}),receiptAfter=await committed(cwd,sourceRevision,receiptPath),workflowAfter=await committed(cwd,sourceRevision,workflowPath),configurationAfter=await committed(cwd,sourceRevision,'wrangler.independent-closure-qa.jsonc'),rollbackConfigurationAfter=await committed(cwd,sourceRevision,'wrangler.independent-closure-qa.rollback.jsonc');
  if(after.tree!==before.tree||!receiptAfter.equals(receiptBefore)||!workflowAfter.equals(workflowBefore)||closed.manifest.sourceTree!==after.tree||hash(configurationAfter)!==closed.manifest.configurationHash||hash(rollbackConfigurationAfter)!==closed.manifest.rollbackConfigurationHash)fail();
  const contextJson=JSON.stringify(context);
  return Object.freeze({script,rollbackScript:closed.rollbackScript,manifest:Object.freeze({purpose:'afw.qa-fixed-artifact-context-build.v1',sourceRevision,sourceTree:after.tree,sourceCheck:'git-inputs-and-configuration-before-after-v1',configurationFileHash:closed.manifest.configurationHash,rollbackConfigurationFileHash:closed.manifest.rollbackConfigurationHash,workflowHash:hash(workflowAfter),receiptHash:hash(receiptAfter),compiledContextHash:hash(contextJson),compiledContextBytes:Buffer.byteLength(contextJson),artifactSourceRevision:context.receipt.sourceRevision,artifactSourceTree:context.receipt.sourceTree,artifactKey:context.receipt.artifactKey,artifactWorkerHash:context.receipt.workerHash,artifactWorkerBytes:context.receipt.workerBytes,module:{name:'index.mjs',sha256:hash(script),bytes,exports:outputs[0].exports.slice().sort(),maximumBytes:3145728},rollback:closed.manifest.rollback,closedFlags:closed.manifest.closedFlags,containsLatePolicy:false,containsGrant:false,containsPacket:false,remotePublished:false,invoked:false,authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false})});
 }catch{fail();}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.length!==4)fail();const cwd=fileURLToPath(new URL('..',import.meta.url)),artifact=JSON.parse(await readFile(resolve(cwd,process.argv[3]),'utf8')),built=await buildPrivateQaNamedContext({cwd,sourceRevision:process.argv[2],artifact}),directory=resolve(cwd,'output/qa-fixed-artifact');
  await mkdir(directory,{recursive:true});await writeFile(resolve(directory,'index.mjs'),built.script);await writeFile(resolve(directory,'closed-rollback.mjs'),built.rollbackScript);await writeFile(resolve(directory,'build.json'),JSON.stringify(built.manifest,null,2)+'\n');process.stdout.write(JSON.stringify(built.manifest)+'\n');
 }catch{fail();}
}
