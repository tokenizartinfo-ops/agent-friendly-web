import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {verifyMcpReleaseSource} from './mcp-release-source.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
const exec=promisify(execFile),sha=x=>createHash('sha256').update(x).digest('hex');
const configPath='wrangler.independent-closure-qa.jsonc',workflowPath='.github/workflows/afw-independent-closure-build.yml',rollbackConfigPath='wrangler.independent-closure-qa.rollback.jsonc';
const expected={"name":"agent-friendly-web-independent-closure-qa","account_id":"85d0d5dadac3341a564f22ce885e9eec","main":"worker/independent-closure/index.mjs","compatibility_date":"2026-09-07","workers_dev":false,"preview_urls":false,"routes":[{"pattern":"https://operations-manager.agentfriendlyweb.dev/assistance/occurrences/*","zone_id":"4b1a3fe4b6dcb81e9d6a633174c5939f"},{"pattern":"https://operations-manager.agentfriendlyweb.dev/assistance/custody/confirm","zone_id":"4b1a3fe4b6dcb81e9d6a633174c5939f"}],"triggers":{"crons":[]},"durable_objects":{"bindings":[{"name":"AFW_INDEPENDENT_CLOSURE","class_name":"IndependentClosure"},{"name":"AFW_QA_PREREGISTRY","class_name":"PrivateQaPreregistration"},{"name":"AFW_MCP_CLOSURE_NODE","class_name":"AfwOwnEventNode","script_name":"agent-friendly-web-delegated-canary"}]},"migrations":[{"tag":"afw-own-qa-closed-v1","new_sqlite_classes":["IndependentClosure"]},{"tag":"afw-private-preregistry-v1","new_sqlite_classes":["PrivateQaPreregistration"]}],"d1_databases":[{"database_id":"676ca49e-af71-4f2f-a12d-11f13de78a51","database_name":"agent-friendly-web-independent-closure-qa","binding":"AFW_QA_DB"}],"workflows":[{"name":"afw-own-qa-private-bootstrap","binding":"AFW_QA_BOOTSTRAP","class_name":"PrivateQaBootstrap"},{"name":"afw-own-qa-private-confirmation","binding":"AFW_QA_NAMED_CONFIRMATION","class_name":"PrivateQaNamedConfirmation"}],"ratelimits":[{"name":"AFW_QA_OCCURRENCE_RATE_LIMITER","namespace_id":"2026101003","simple":{"limit":10,"period":60}}],"vars":{"AFW_QA_HTTP_ENABLED":"false","AFW_QA_HTTP_POLICY":"","AFW_QA_BOOTSTRAP_ENABLED":"false","AFW_QA_PREREGISTRATION":"","AFW_QA_CHALLENGE_ENABLED":"false","AFW_QA_CHALLENGE_IDENTITY":"","AFW_MCP_CLOSURE_ENABLED":"false","AFW_MCP_CLOSURE_POLICY":"","AFW_MCP_READER_PROBE_ENABLED":"false","AFW_MCP_READER_PROBE_POLICY":"","AFW_MCP_PUBLISHER_PROBE_ENABLED":"false","AFW_MCP_PUBLISHER_PROBE_POLICY":"","AFW_MCP_CLOSURE_DISPATCH_ENABLED":"false","AFW_MCP_CLOSURE_DISPATCH_POLICY":"","AFW_QA_ORIGINALS_ENABLED":"false","AFW_QA_PROVIDER_OBSERVATION_ENABLED":"false","AFW_QA_PRIMARY_RESERVATION_ENABLED":"false","AFW_QA_INSTALLATION_ENABLED":"false","AFW_QA_PRIMARY_CATALOG_ENABLED":"false","AFW_QA_PRIMARY_ADMISSION_ENABLED":"false","AFW_MCP_CLOSURE_REDUCTION_ENABLED":"false"},"compatibility_flags":["nodejs_compat"],"version_metadata":{"binding":"AFW_QA_VERSION"}};
const unavailable=()=>{throw Error('Closed QA package unavailable');};
export function validatePrivateQaClosedConfiguration(raw,rollback=false){
 try{if(typeof raw!=='string'||Buffer.byteLength(raw)>16384)unavailable();assert.deepEqual(JSON.parse(raw),rollback?{...expected,main:'worker/independent-closure/closed-rollback.mjs'}:expected);return true;}catch{unavailable();}
}
function options(value){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==2)unavailable();
 for(const key of ['cwd','sourceRevision']){const d=Object.getOwnPropertyDescriptor(value,key);if(!d?.enumerable||!Object.hasOwn(d,'value')||typeof d.value!=='string')unavailable();}
 if(!/^[a-f0-9]{40}$/.test(value.sourceRevision))unavailable();return {cwd:value.cwd,sourceRevision:value.sourceRevision};
}
async function configuration(cwd,revision){
 const result={};
 for(const path of [configPath,rollbackConfigPath,workflowPath]){
  const bytes=await readFile(resolve(cwd,path)),committed=(await exec('git',['show',revision+':'+path],{cwd,encoding:null,timeout:10000,maxBuffer:1048576,windowsHide:true})).stdout;
  if(!bytes.equals(committed))unavailable();result[path]=sha(bytes);
  if(path===configPath||path===rollbackConfigPath)validatePrivateQaClosedConfiguration(bytes.toString('utf8'),path===rollbackConfigPath);
 }
 return result;
}
async function bundle(cwd,entry,sourceRevision,exports){
 const result=await build({absWorkingDir:cwd,entryPoints:[entry],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',sourcemap:false,metafile:true,define:{'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(sourceRevision)}});
 if(result.outputFiles.length!==1)unavailable();const script=result.outputFiles[0].text,bytes=Buffer.byteLength(script),outputs=Object.values(result.metafile.outputs);
 if(bytes<1||bytes>1048576||outputs.length!==1)unavailable();assert.deepEqual(outputs[0].exports.slice().sort(),exports.slice().sort());
 return {script,metadata:{name:entry.endsWith('closed-rollback.mjs')?'closed-rollback.mjs':'index.mjs',sha256:sha(script),bytes,exports:exports.slice().sort()}};
}
/** Build only. Does not authenticate Cloudflare, inherit custody or publish. */
export async function buildPrivateQaClosedContext(input){
 try{
  const {cwd,sourceRevision}=options(input),before=await verifyMcpReleaseSource({cwd,sourceRevision}),configurationBefore=await configuration(cwd,sourceRevision);
  const candidateModule=await bundle(cwd,'worker/independent-closure/index.mjs',sourceRevision,['IndependentClosure','PrivateQaBootstrap','PrivateQaCatalog','PrivateQaNamedConfirmation','PrivateQaPreregistration','default','observePrivateQa']);
  const rollback=await bundle(cwd,'worker/independent-closure/closed-rollback.mjs',sourceRevision,['IndependentClosure','PrivateQaBootstrap','PrivateQaNamedConfirmation','PrivateQaPreregistration','default']);
  const after=await verifyMcpReleaseSource({cwd,sourceRevision}),configurationAfter=await configuration(cwd,sourceRevision);
  if(before.tree!==after.tree)unavailable();assert.deepEqual(configurationAfter,configurationBefore);
  return Object.freeze({script:candidateModule.script,rollbackScript:rollback.script,manifest:Object.freeze({purpose:'afw.qa-closed-context-build.v1',sourceRevision,sourceTree:after.tree,configurationHash:configurationAfter[configPath],rollbackConfigurationHash:configurationAfter[rollbackConfigPath],remoteConfigurationPreserved:false,workflowHash:configurationAfter[workflowPath],sourceCheck:'git-inputs-and-configuration-before-after-v1',module:candidateModule.metadata,rollback:rollback.metadata,closedFlags:[...PRIVATE_QA_CLOSED_FLAGS],remotePublished:false,invoked:false,operationalReadiness:false})});
 }catch{unavailable();}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.length!==3)unavailable();const cwd=fileURLToPath(new URL('..',import.meta.url)),built=await buildPrivateQaClosedContext({cwd,sourceRevision:process.argv[2]}),directory=resolve(cwd,'output/qa-sealed');
  await mkdir(directory,{recursive:true});await writeFile(resolve(directory,'index.mjs'),built.script);await writeFile(resolve(directory,'closed-rollback.mjs'),built.rollbackScript);await writeFile(resolve(directory,'build.json'),JSON.stringify(built.manifest,null,2)+'\n');
  process.stdout.write(JSON.stringify(built.manifest)+'\n');
 }catch{unavailable();}
}
