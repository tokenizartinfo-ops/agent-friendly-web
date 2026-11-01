Error.stackTraceLimit=0;
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {spawnSync} from 'node:child_process';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {randomUUID} from 'node:crypto';
import {qaClosedConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
import {finiteGhaCustody} from '../../lib/mcp-qa-finite-custody.mjs';
import {hashFinitePackageManifest} from '../../lib/mcp-qa-finite-seed.mjs';
import {seedPrimaryFixture,digest,SEED_GH} from './finite-seed-primary.mjs';
const MODULE=Buffer.from("throw new Error('ARCHIVE_MUST_NEVER_EXECUTE');\n");
const ROOT='/accounts/85d0d5dadac3341a564f22ce885e9eec',QA='agent-friendly-web-independent-closure-qa',CF='https://api.cloudflare.com/client/v4';
const SIGNED='https://productionresultssa1.blob.core.windows.net/actions-results/fixture/archive.zip?sig=SYNTHETIC';
/** Synthetic EXTERNAL PLATFORM + SOURCE AUTHORITY. Actual resolver/ZIP/parser/
 * hash/CLI/fences/native reader execute. No production reset/override hook. */
export async function seedWorld({sourceAuthority=true}={}){
 const f=await seedPrimaryFixture(),m=f.seed.manifest,versions={},closedId=f.seed.qaPublication.qaClosed.versionId,liveId=f.live.versionId;
 for(const role of Object.keys(m.modules)){
  const d=m.modules[role];d.module={name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',sha256:digest(MODULE),bytes:MODULE.length,exports:['default']};
  const v={id:role==='qaClosed'?closedId:liveId,main_module:d.module.name,compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],usage_model:'standard',urls:[],exports:['default'],modules:[{name:d.module.name,content_type:'application/javascript+module',content_base64:MODULE.toString('base64')}],bindings:[{name:'AFW_INDEPENDENT_CLOSURE',type:'durable_object_namespace',class_name:'IndependentClosure',namespace_id:'070c4a7708eb4592a3ded7c117a88225'}]};
  d.publicStatic.configurationHash=digest('PUBLIC-CONFIG:'+role);
  // Explicit SYNTHETIC commitments. Production semantics remain unimplemented.
  d.publicStatic.profileHash=digest('SYNTHETIC-PROFILE:'+role);d.publicStatic.bindingsHash=digest('SYNTHETIC-BINDINGS:'+role);
  if(['qaLive','qaClosed'].includes(role))versions[v.id]=v;
 }
 const built=spawnSync('python3',[fileURLToPath(new URL('../finite_archive_test.py',import.meta.url)),'--fixture'],{input:JSON.stringify({manifest:m}),maxBuffer:67108864,timeout:5000});
 if(built.status!==0)throw Error('synthetic ZIP failed');const zip=built.stdout;
 f.seed.build.manifestHash=hashFinitePackageManifest(m);f.seed.build.artifactDigest='sha256:'+digest(zip);
 for(const role of ['qaLive','qaClosed'])for(const key of ['module','publicStatic'])f.seed.qaPublication[role][key]=structuredClone(m.modules[role][key]);
 for(const role of ['qaLive','qaClosed'])f.seed.qaPublication[role].configurationHash=qaClosedConfigurationHash(versions[f.seed.qaPublication[role].versionId]);
 f.refresh();
 const artifact=f.map.get('/actions/artifacts/202');artifact.digest=f.seed.build.artifactDigest;artifact.size_in_bytes=zip.length;
 f.seedStep.status='in_progress';f.seedStep.conclusion=null;f.seedStep.completed_at=null;f.setNow(f.T0+1000);
 f.map.delete('/git/ref/tags/afw-finite-observer-create/'+f.seed.intentId);f.map.delete('/git/tags/'+f.tagSha);
 const pins={qaClosed:{name:QA,id:closedId,configurationHash:f.seed.qaPublication.qaClosed.configurationHash,bindingCount:1,flagCount:0,module:{name:'closed-rollback.mjs',bytes:MODULE.length,sha256:digest(MODULE)}}};
 const syntheticAuthority=`
 import assert from 'node:assert/strict';
 const expected=${JSON.stringify(m)},versions=${JSON.stringify(versions)};
 const fail=()=>{throw Error('synthetic source authority mismatch');};
 export function qualifyFiniteSourcePackage({manifest}){assert.deepEqual(manifest,expected);return expected.modules;}
 export function qualifyFiniteSourceRoleMetadata({manifest,role,metadata}){qualifyFiniteSourcePackage({manifest});const v=versions[role==='qaLive'?"11111111-1111-4111-8111-111111111111":"c570b60b-95dc-48e1-89f3-9c4651691dbc"];const config=Object.fromEntries(['compatibility_date','compatibility_flags','main_module','usage_model','containers','exports','bindings'].map(k=>[k,v[k]??(k==='containers'?[]:undefined)]));if(!['qaLive','qaClosed'].includes(role)||JSON.stringify(metadata)!==JSON.stringify(config))fail();return {publicStatic:expected.modules[role].publicStatic};}
 export function qualifyFiniteNativeSourceContext({ctx,env,intentId,sourceRevision,seed}){
  if(ctx.id.toString()!=='synthetic-actor'||env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1').toString()!=='synthetic-actor'||env.AFW_QA_VERSION.id!==${JSON.stringify(liveId)}||env.SOURCE_TEMPLATE!==${JSON.stringify(m.sourceRevision)}||sourceRevision!==env.SOURCE_TEMPLATE||intentId!==${JSON.stringify(f.seed.intentId)})fail();
  if(seed){qualifyFiniteSourcePackage({manifest:seed.manifest});if(seed.qaPublication.qaLive.publicStatic.profileHash!==expected.modules.qaLive.publicStatic.profileHash||seed.qaPublication.qaLive.publicStatic.bindingsHash!==expected.modules.qaLive.publicStatic.bindingsHash)fail();}
 }
 export function readFiniteNativeCustody(){return {id:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',tokenKind:'account',expiresAt:${f.T0+86400000}};}
 `;
 const authorityPath=resolve('lib/mcp-qa-finite-source-authority.mjs'),pinsPath=resolve('lib/mcp-qa-cloud-closed-pins.mjs');
 const bundle=await build({stdin:{contents:"export * from './lib/mcp-qa-finite-seed-issuer.mjs';export * from './lib/mcp-qa-finite-seed-http.mjs';export * from './lib/mcp-qa-finite-publication-bridge.mjs';export * from './lib/mcp-qa-cloud-lifecycle-admission.mjs';export * from './scripts/run-qa-finite-trial-finalizer.mjs';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node',external:['node:*'],banner:{js:"import {createRequire as __createRequire} from 'node:module'; const require = __createRequire(process.cwd()+'/package.json');"},plugins:[{name:'explicit-synthetic-source-authority',setup(b){
  b.onResolve({filter:/mcp-qa-finite-package\.mjs$/},()=>({path:pathToFileURL(resolve('lib/mcp-qa-finite-package.mjs')).href,external:true}));
  b.onLoad({filter:/mcp-qa-finite-source-authority\.mjs$/},async args=>args.path===authorityPath&&sourceAuthority?{contents:syntheticAuthority,loader:'js'}:undefined);
  b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},async args=>args.path===pinsPath&&sourceAuthority?{contents:'export const QA_CLOUD_CLOSED_PINS='+JSON.stringify(pins)+';',loader:'js'}:undefined);
 }}]});
 const api=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64')+'#'+randomUUID());
 const state={mode:'normal',tagPosts:0,refPosts:0,phase:'issuer',hook:null},calls=[],tags=new Map();
 const respond=(value,status=200)=>f.response(value,status);
 const fetchImpl=async(url,init)=>{
  calls.push({url,init});
  if(state.hook){const response=await state.hook(url,init);if(response)return response;}
  if(url===SIGNED)return new Response(zip);
  if(url.startsWith(CF)){
   const path=url.slice(CF.length);
   if(init.method!=='GET')throw Error('NO CF MUTATION');
   const envelope=result=>respond({success:true,errors:[],messages:[{code:10000,message:'Valid',type:null}],result});
   if(path===ROOT+'/tokens/verify'){
    const native=init.headers.Authorization==='Bearer synthetic-native';
    return envelope({id:native?'a'.repeat(32):finiteGhaCustody().id,status:'active',expires_on:new Date(native?f.T0+86400000:finiteGhaCustody().expiresAt).toISOString(),not_before:null});
   }
   if(path===ROOT+'/workers/scripts/'+QA+'/deployments?per_page=1')return envelope({deployments:[{id:f.live.deploymentId,strategy:'percentage',versions:[{version_id:f.live.versionId,percentage:100}]}]});
   if(path.startsWith(ROOT+'/workers/workers/'+QA+'/versions/'))return envelope(versions[path.split('/').at(-1).split('?')[0]]);
   throw Error('unexpected synthetic CF path');
  }
  if(!url.startsWith(SEED_GH))throw Error('unexpected synthetic origin');
  const path=url.slice(SEED_GH.length);
  if(path==='/contents/lib/mcp-qa-cloud-closed-pins.mjs?ref='+m.sourceRevision){const text=readFileSync('lib/mcp-qa-cloud-closed-pins.mjs','utf8');return respond({type:'file',path:'lib/mcp-qa-cloud-closed-pins.mjs',sha:'26213123304eea25e652a52d808d25b7e0e3475e',size:Buffer.byteLength(text),encoding:'base64',content:Buffer.from(text).toString('base64')});}
  if(path==='/actions/workflows/afw-finite-native-package.yml')return respond({id:7,path:f.buildPath,state:'active'});
  if(path.startsWith('/actions/workflows/afw-finite-native-package.yml/runs?'))return respond({total_count:1,workflow_runs:[{...f.map.get('/actions/runs/101'),workflow_id:7}]});
  if(path==='/actions/runs/101/artifacts?per_page=100&page=1')return respond({total_count:1,artifacts:[artifact]});
  if(path==='/actions/artifacts/202/zip')return new Response(null,{status:302,headers:{location:SIGNED}});
  if(path==='/git/commits/'+'d'.repeat(40))return respond({sha:'d'.repeat(40),tree:{sha:'e'.repeat(40)}});
  if(path==='/git/tags'&&init.method==='POST'){
   state.tagPosts++;const b=JSON.parse(init.body),tag={sha:f.tagSha,tag:b.tag,message:b.message,object:{type:b.type,sha:b.object}};tags.set(f.tagSha,tag);
   if(state.mode==='tag-lost')throw Error('SYNTHETIC lost ACK');if(state.mode==='tag-late')f.setNow(f.T0+120001);return respond(tag,201);
  }
  if(path==='/git/refs'&&init.method==='POST'){
   state.refPosts++;const b=JSON.parse(init.body),v={ref:b.ref,object:{type:'tag',sha:b.sha}};
   f.map.set('/git/ref/tags/afw-finite-observer-create/'+f.seed.intentId,v);
   if(state.mode==='ref-lost')throw Error('SYNTHETIC lost ACK');if(state.mode==='ref-late')f.setNow(f.T0+120001);return respond(v,201);
  }
  if(path==='/git/tags/'+f.tagSha&&tags.has(f.tagSha))return respond(tags.get(f.tagSha));
  return respond(f.map.get(path)??{},f.map.has(path)?200:404);
 };
 Object.assign(process.env,{AFW_FINITE_SEED_ORIGINAL_PID:String(process.pid),GITHUB_JOB:'admit',GITHUB_ACTION:'finite_seed_once',GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:m.sourceRevision});
 const event={action:'created',repository:f.repository,issue:{number:497},sender:f.actor,comment:{id:123,body:'/afw-qa-finite-confirmation v1 '+m.sourceRevision,created_at:new Date(f.T0).toISOString(),author_association:'OWNER',user:f.actor}};
 const context={repository:f.repository.full_name,repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'11',runAttempt:'1',sourceRevision:m.sourceRevision};
 const admission=api.validateQaFiniteConfirmationCommand({event,context,now:f.now});
 const options={admission,githubToken:'synthetic-gh',credential:'synthetic-cf',fetchImpl,now:f.now,signal:new AbortController().signal};
 const env={GITHUB_EVENT_PATH:'synthetic-event',GITHUB_REPOSITORY:context.repository,GITHUB_REPOSITORY_ID:context.repositoryId,GITHUB_REF:context.ref,GITHUB_EVENT_NAME:context.eventName,GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:m.sourceRevision,GITHUB_TOKEN:'synthetic-gh',AFW_QA_CLOSED_TOKEN:'synthetic-cf'};
 const nativeEnv={AFW_QA_VERSION:{id:liveId},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native',SOURCE_TEMPLATE:m.sourceRevision,AFW_INDEPENDENT_CLOSURE:{idFromName:()=>({toString:()=> 'synthetic-actor'})}};
 return {...f,api,state,calls,tags,versions,fetchImpl,options,event,env,nativeEnv,complete(){f.setNow(f.T0+3000);f.seedStep.status='completed';f.seedStep.conclusion='success';f.seedStep.completed_at=new Date(f.T0+2000).toISOString();},nativeOptions(){return {ctx:{id:{toString:()=> 'synthetic-actor'}},env:nativeEnv,intentId:f.seed.intentId,sourceRevision:m.sourceRevision,fetchImpl,now:f.now,signal:new AbortController().signal};},async cli(){return api.runFiniteFinalizerCli({phase:'seed-material',env,read:async()=>JSON.stringify(event),write:async()=>{},fetchImpl,now:f.now});}};
}
