import {readFileSync} from 'node:fs';
import {v2Manifest} from './fixtures/finite-v2.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {encodeFinitePackageManifest,hashFinitePackageManifest} from '../lib/mcp-qa-finite-seed.mjs';
import {resolvePrivateQaFiniteExternalSource,resolveFiniteNativePackage as syntheticResolver,finitePrivateLocatorZip,
 finiteR2TestUrl,verifyFinitePrivateR2Draft,createFinitePrivateR2Locator} from './fixtures/finite-package-resolver.mjs';

let resolver;
resolver=syntheticResolver;
const REPO='tokenizartinfo-ops/agent-friendly-web',ID=1347578006;
const API='https://api.github.com/repos/'+REPO;
const M='a'.repeat(40),TREE='b'.repeat(40),OLD='c'.repeat(40),OLDTREE='d'.repeat(40);
const WORKFLOW='.github/workflows/afw-finite-native-package.yml';
const WORKFLOW_TEXT='name: Finite native package\non:\n  push:\n    branches: [main]\n  workflow_dispatch:\n    inputs:\n      source_revision:\n        description: Exact current main revision of the verified R2 package\n        required: true\n        type: string\npermissions:\n  contents: read\njobs:\n  package:\n    runs-on: ubuntu-24.04\n    steps:\n      - run: echo source-only-synthetic-fixture\n';
const SIGNED='https://productionresultssa1.blob.core.windows.net/actions-results/11111111-1111-4111-8111-111111111111/artifacts/fixture.zip?sig=SYNTHETIC_PRIVATE_SIGNATURE';
const TOKEN='opaque+/=~.future-'+'z'.repeat(30);
const AT=Date.parse('2026-11-01T18:00:00.000Z');
const MODULE=Buffer.from("throw new Error('ARCHIVE_MUST_NEVER_EXECUTE');\n");
const ROLES=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
const sha=b=>createHash('sha256').update(b).digest('hex');
const blob=b=>createHash('sha1').update('blob '+Buffer.byteLength(b)+'\0').update(b).digest('hex');
const clone=o=>structuredClone(o);
const R2_KEY='finite-bundles-v1/'+M+'.zip';
const R2=finiteR2TestUrl(M,AT);
function fixture(){
 const manifest={purpose:'afw.finite-native-package.v2',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:sha(WORKFLOW_TEXT),modules:{},compatibility:{}};
 for(const role of ROLES)manifest.modules[role]={sourceRevision:role==='operatorClosed'?OLD:M,sourceTree:role==='operatorClosed'?OLDTREE:TREE,module:{name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',sha256:sha(MODULE),bytes:MODULE.length,exports:[]},configurationHash:'1'.repeat(64),profileHash:'2'.repeat(64),bindingsHash:'3'.repeat(64)};
 for(const k of ['qaClassesPreserved','qaNamespacesPreserved','canaryClassesPreserved','canaryNamespacesPreserved','closedEntrypointsDenied','legacyContainmentQualified'])manifest.compatibility[k]=true;
 v2Manifest(manifest);
 const run={id:101,workflow_id:11,path:WORKFLOW,head_sha:M,head_branch:'main',event:'push',status:'completed',conclusion:'success',run_attempt:1,repository:{id:ID,full_name:REPO},head_repository:{id:ID,full_name:REPO}};
 const f={manifest,run,pages:null,artifact:null,calls:[],mutation:null,hook:null,workflowText:WORKFLOW_TEXT};
 f.options={sourceRevision:M,githubToken:TOKEN,now:()=>AT,fetchImpl:async(url,init)=>{
  f.calls.push({url,init});
  if(f.hook){const r=await f.hook(url,init);if(r)return r;}
  const json=value=>new Response(JSON.stringify(value),{headers:{'content-type':'application/json'}});
  if(url===API+'/contents/lib/mcp-qa-cloud-closed-pins.mjs?ref='+M){const text=readFileSync('lib/mcp-qa-cloud-closed-pins.mjs','utf8');return json({type:'file',path:'lib/mcp-qa-cloud-closed-pins.mjs',sha:blob(text),size:Buffer.byteLength(text),encoding:'base64',content:Buffer.from(text).toString('base64')});}
  if(url===API+'/git/commits/'+M)return json({sha:M,tree:{sha:TREE}});
  if(url===API+'/git/commits/'+OLD)return json({sha:OLD,tree:{sha:OLDTREE}});
  if(url===API+'/contents/'+WORKFLOW+'?ref='+M)return json({type:'file',path:WORKFLOW,sha:blob(f.workflowText),size:Buffer.byteLength(f.workflowText),encoding:'base64',content:Buffer.from(f.workflowText).toString('base64')});
  if(url===API+'/actions/workflows/afw-finite-native-package.yml')return json({id:11,path:WORKFLOW,state:'active'});
  if(url.startsWith(API+'/actions/workflows/afw-finite-native-package.yml/runs?')){
   const page=Number(new URL(url).searchParams.get('page'));
   const value=f.pages?.[page-1]??{total_count:1,workflow_runs:[f.run]};
   const r=json(value);
   if(f.links?.[page-1])r.headers.set('link',f.links[page-1]);
   return r;
  }
  if(url===API+'/actions/runs/101/artifacts?per_page=100&page=1'){
   const built=spawnSync('python3',[fileURLToPath(new URL('./finite_archive_test.py',import.meta.url)),'--fixture'],{input:JSON.stringify({manifest:f.manifest,mutation:f.mutation}),maxBuffer:64*1024*1024,timeout:5000});
   assert.equal(built.status,0,built.stderr?.toString());
   f.zip=built.stdout;
   if(f.privateR2){
    f.r2Zip=f.zip;
    const locator={purpose:'afw.finite-private-package-locator.v1',sourceRevision:M,sourceTree:TREE,
     buildWorkflowHash:sha(f.workflowText),objectKey:R2_KEY,archiveBytes:f.r2Zip.length,
     archiveSha256:sha(f.r2Zip),manifestHash:hashFinitePackageManifest(f.manifest)};
    f.zip=finitePrivateLocatorZip({...locator,...f.editLocator});
   }
   const artifact={id:202,name:'afw-finite-native-package-'+M,expired:false,expires_at:new Date(AT+86400000).toISOString(),digest:'sha256:'+sha(f.zip),size_in_bytes:f.zip.length,workflow_run:{id:101,repository_id:ID,head_repository_id:ID,head_sha:M,head_branch:'main'}};
   if(f.editArtifact)f.editArtifact(artifact);
   return json(f.artifact??{total_count:1,artifacts:[artifact]});
  }
  if(url===API+'/actions/artifacts/202/zip')return new Response(null,{status:302,headers:{location:SIGNED}});
  if(url===SIGNED)return new Response(f.zip);
  if(url===R2)return new Response(f.editPrivateBody?.(f.r2Zip)??f.r2Zip,{
   headers:{'content-type':'application/zip','content-length':String(f.r2Zip.length)}});
  throw Error('Unexpected synthetic URL '+url);
 }};
 return f;
}
async function resolve(f){assert.equal(typeof resolver,'function','concrete package resolver must be installed');return resolver(f.options);}
async function denied(f){await assert.rejects(()=>resolve(f),{message:'Finite package unavailable'});}
function runURL(page){return API+'/actions/workflows/afw-finite-native-package.yml/runs?head_sha='+M+'&branch=main&event=push&status=success&per_page=100&page='+page;}

test('real ZIP through actual Python subprocess yields immutable technical material only',async()=>{
 const f=fixture(),result=await resolve(f);
 assert.deepEqual(result.manifest,f.manifest);
 assert.deepEqual(result.build,{workflowPath:WORKFLOW,runId:101,attempt:1,artifactId:202,artifactName:'afw-finite-native-package-'+M,artifactDigest:'sha256:'+sha(f.zip),manifestHash:hashFinitePackageManifest(f.manifest)});
 assert.equal(encodeFinitePackageManifest(result.manifest),encodeFinitePackageManifest(f.manifest));
 assert(Object.isFrozen(result));assert(Object.isFrozen(result.build));assert(Object.isFrozen(result.manifest.modules.operatorClosed.module));
 assert.equal(result.manifest.modules.operatorClosed.provenance.kind,'historical-content-pin.v1');
 assert.deepEqual(Object.keys(result).sort(),['build','manifest']);
 assert(!JSON.stringify(result).includes(TOKEN));assert(!JSON.stringify(result).includes('ARCHIVE_MUST_NEVER_EXECUTE'));
 assert(!f.calls.some(x=>x.url===API+'/git/commits/'+OLD));
 assert(f.calls.some(x=>x.url===API+'/contents/lib/mcp-qa-cloud-closed-pins.mjs?ref='+M));
 for(const {url,init} of f.calls){assert.equal(init.method,'GET');assert.equal(init.redirect,'manual');assert.equal(init.headers.Authorization,url===SIGNED?undefined:'Bearer '+TOKEN);}
});
test('the protected resolver verifies an Actions receipt, then reads the exact ZIP only from private R2',async()=>{
 const f=fixture();f.run.event='workflow_dispatch';f.privateR2=true;f.options.r2Credential=R2;
 const result=await resolve(f);
 assert(f.calls.some(({url})=>url.includes('&event=workflow_dispatch&')));
 assert.deepEqual(result.manifest,f.manifest);
 assert.equal(result.build.artifactDigest,'sha256:'+sha(f.zip));
 assert.equal(result.build.manifestHash,hashFinitePackageManifest(f.manifest));
 const steps=f.calls.filter(r=>[SIGNED,R2].includes(r.url));assert.deepEqual(steps.map(r=>r.url),[SIGNED,R2]);
 assert.equal(steps[1].init.method,'GET');assert.equal(steps[1].init.redirect,'error');
 assert.equal(Object.keys(steps[1].init.headers).some(k=>k.toLowerCase()==='authorization'),false);
 assert(!JSON.stringify(result).includes(R2));
});
test('private R2 requires a main dispatch at the exact head, rejecting a push receipt',async()=>{
 const f=fixture();f.privateR2=true;f.options.r2Credential=R2;
 await denied(f);
 assert(!f.calls.some(({url})=>url===R2));
});
test('the private route rejects locator or ZIP drift and refuses legacy artifact fallback',async()=>{
 for(const fault of ['objectKey','sourceTree','manifestHash','digest','legacy','redirect']){
  const f=fixture();f.run.event='workflow_dispatch';f.privateR2=fault!=='legacy';f.options.r2Credential=R2;
  if(fault==='objectKey')f.editLocator={objectKey:'other.zip'};
  if(fault==='sourceTree')f.editLocator={sourceTree:'e'.repeat(40)};
  if(fault==='manifestHash')f.editLocator={manifestHash:'1'.repeat(64)};
  if(fault==='digest')f.editPrivateBody=b=>Buffer.from(b).fill(0,0,1);
  if(fault==='redirect')f.hook=async url=>url===R2?new Response(null,{status:302,headers:{location:'https://example.invalid/private'}}):null;
  await denied(f);
  assert.equal(f.calls.filter(r=>r.url===R2).length,['manifestHash','digest','redirect'].includes(fault)?1:0,fault);
 }
});
test('private readback verifies every draft member without issuing a release locator',async()=>{
 const drafts={purpose:'afw.finite-native-private-draft.v1',sourceRevision:M,sourceTree:TREE,moduleCount:5,
  completePackage:false,operationalReadiness:false,files:{}};
 for(const role of ROLES)drafts.files[role+'/'+(role==='qaClosed'?'closed-rollback.mjs':'index.mjs')]=
  {bytes:MODULE.length,sha256:sha(MODULE)};
 const built=spawnSync('python3',[fileURLToPath(new URL('./finite_archive_test.py',import.meta.url)),'--fixture'],
  {input:JSON.stringify({manifest:drafts}),timeout:5000,maxBuffer:65536});
 assert.equal(built.status,0,built.stderr?.toString());
 const bytes=built.stdout;
 const options={sourceRevision:M,sourceTree:TREE,archiveBytes:bytes.length,archiveSha256:sha(bytes),
  credential:R2,now:()=>AT,fetchImpl:async(url,req)=>{
   assert.equal(url,R2);assert.equal(req.method,'GET');
   return new Response(bytes,{headers:{'content-type':'application/zip','content-length':String(bytes.length)}});
  }};
 const result=await verifyFinitePrivateR2Draft(options);
 assert.equal(result.moduleCount,5);assert.equal(result.authorizesDeployment,false);
 await assert.rejects(createFinitePrivateR2Locator({...options,workflowHash:sha(WORKFLOW_TEXT)}),{message:'Finite package unavailable'});
});
test('source constructor invokes concrete resolver only during seed-material',async()=>{
 const f=fixture(),r=await resolvePrivateQaFiniteExternalSource({phase:'seed-material',...f.options});
 assert.deepEqual(r.manifest,f.manifest);assert(f.calls.some(x=>x.url===SIGNED));
 const missing=fixture();missing.hook=async url=>url.includes('/actions/workflows/')?new Response('{}',{status:404}):null;
 await assert.rejects(()=>resolvePrivateQaFiniteExternalSource({phase:'seed-material',...missing.options}),{message:'Finite package unavailable'});
 for(const phase of [undefined,'prepare','admit-and-ready','runtime'])await assert.rejects(()=>resolvePrivateQaFiniteExternalSource({phase,...f.options}));
});
for(const [field,value] of [['head_sha',OLD],['head_branch','feature'],['event','pull_request'],['path','.github/workflows/other.yml'],['run_attempt',2],['status','in_progress'],['conclusion','failure'],['workflow_id',12],['repository',{id:2,full_name:REPO}],['head_repository',{id:ID,full_name:'foreign/repo'}]]){
 test('reject run provenance '+field,async()=>{const f=fixture();f.run[field]=value;await denied(f);});
}
for(const [name,make] of [
 ['zero runs',f=>{f.pages=[{total_count:0,workflow_runs:[]}];}],
 ['two eligible runs',f=>{f.pages=[{total_count:2,workflow_runs:[f.run,{...f.run,id:102}]}];}],
 ['duplicate run IDs',f=>{f.pages=[{total_count:2,workflow_runs:[f.run,clone(f.run)]}];}],
 ['overflow total',f=>{f.pages=[{total_count:201,workflow_runs:[f.run]}];}],
 ['incomplete page',f=>{f.pages=[{total_count:2,workflow_runs:[f.run]}];}],
 ['unknown total',f=>{f.pages=[{workflow_runs:[f.run]}];}],
 ['unexpected pagination link',f=>{f.links=['<https://evil.test/private>; rel="next"'];}],
]){
 test(name,async()=>{const f=fixture();make(f);await denied(f);});
}
function twoPages(f){
 const others=Array.from({length:100},(_,i)=>({...f.run,id:1000+i,conclusion:'failure'}));
 f.pages=[{total_count:101,workflow_runs:others},{total_count:101,workflow_runs:[f.run]}];
 f.links=['<'+runURL(2)+'>; rel="next", <'+runURL(2)+'>; rel="last"','<'+runURL(1)+'>; rel="prev", <'+runURL(1)+'>; rel="first"'];
}
test('complete bounded two-page lookup preserves one exact eligible run',async()=>{const f=fixture();twoPages(f);assert.equal((await resolve(f)).build.runId,101);});
for(const name of ['changed total','missing next','duplicate across pages','short first page']){
 test('reject '+name,async()=>{
  const f=fixture();twoPages(f);
  if(name==='changed total')f.pages[1].total_count=102;
  if(name==='missing next')f.links[0]='';
  if(name==='duplicate across pages')f.pages[1].workflow_runs=[clone(f.pages[0].workflow_runs[0])];
  if(name==='short first page')f.pages[0].workflow_runs.pop();
  await denied(f);
 });
}
for(const [name,edit] of [
 ['expired',a=>{a.expired=true;}],['past expiry',a=>{a.expires_at=new Date(AT).toISOString();}],
 ['unknown expiry',a=>{delete a.expires_at;}],['wrong name',a=>{a.name='afw-independent-closure-'+M;}],
 ['missing digest',a=>{delete a.digest;}],['malformed digest',a=>{a.digest='sha256:AAAA';}],
 ['mismatched digest',a=>{a.digest='sha256:'+'0'.repeat(64);}],
 ['wrong run',a=>{a.workflow_run.id=999;}],['wrong repo',a=>{a.workflow_run.repository_id=2;}],
 ['wrong head repo',a=>{a.workflow_run.head_repository_id=2;}],['wrong source',a=>{a.workflow_run.head_sha=OLD;}],
 ['wrong branch',a=>{a.workflow_run.head_branch='feature';}],['too large',a=>{a.size_in_bytes=67108865;}],
 ['size mismatch',a=>{a.size_in_bytes++;}],
]){
 test('reject artifact '+name,async()=>{const f=fixture();f.editArtifact=edit;await denied(f);});
}
for(const name of ['zero','duplicate','overflow','incomplete']){
 test('reject artifact listing '+name,async()=>{
  const f=fixture();
  f.editArtifact=a=>{f.artifact=name==='zero'?{total_count:0,artifacts:[]}:name==='duplicate'?{total_count:2,artifacts:[a,{...a,id:203}]}:{total_count:name==='overflow'?101:2,artifacts:[a]};};
  await denied(f);
 });
}
for(const [name,edit] of [
 ['wrong source',m=>{m.sourceRevision=OLD;}],['wrong tree',m=>{m.sourceTree=OLDTREE;}],
 ['workflow hash',m=>{m.buildWorkflowHash='0'.repeat(64);}],['module hash',m=>{m.modules.qaLive.module.sha256='0'.repeat(64);}],
 ['module size',m=>{m.modules.qaLive.module.bytes++;}],['literal historical module mismatch',m=>{m.modules.qaClosed.module.sha256='0'.repeat(64);}],['private field',m=>{m.token='private';}],
 ['nested unknown field',m=>{m.modules.qaLive.policy={};}],['historical operator relabeled current M',m=>{m.modules.operatorClosed.sourceRevision=M;m.modules.operatorClosed.sourceTree=TREE;}],
 ['unknown historical source tree',m=>{m.modules.operatorClosed.sourceTree=TREE;}],['untrue structural assertion',m=>{m.compatibility.legacyContainmentQualified=false;}],
 ['module traversal',m=>{m.modules.qaLive.module.name='../index.mjs';}],
]){
 test('reject manifest '+name,async()=>{const f=fixture();edit(f.manifest);await denied(f);});
}
for(const mutation of ['traversal','symlink','duplicate','crc','bomb','extra','directory','nul','encrypted','unsupported','declared-short','duplicate-json','noncanonical','module-altered','manifest-overflow']){
 test('actual Python subprocess rejects ZIP '+mutation,async()=>{const f=fixture();f.mutation=mutation;await denied(f);});
}
for(const [name,hook] of [
 ['missing future workflow',url=>url.includes('/actions/workflows/')?new Response('{}',{status:404}):null],
 ['wrong workflow path',url=>url.endsWith('/actions/workflows/afw-finite-native-package.yml')?Response.json({id:11,path:'.github/workflows/other.yml',state:'active'}):null],
 ['wrong primary commit',url=>url===API+'/git/commits/'+M?Response.json({sha:OLD,tree:{sha:TREE}}):null],
 ['workflow blob SHA mismatch',url=>url.includes('/contents/')?Response.json({type:'file',path:WORKFLOW,sha:'0'.repeat(40),size:WORKFLOW_TEXT.length,encoding:'base64',content:Buffer.from(WORKFLOW_TEXT).toString('base64')}):null],
 ['rate limit',()=>new Response('{}',{status:429})],
 ['rate exhausted',()=>new Response('{}',{headers:{'x-ratelimit-remaining':'0'}})],
 ['unexpected API redirect',()=>new Response(null,{status:302,headers:{location:SIGNED}})],
 ['response overflow',()=>new Response('{}',{headers:{'content-length':'1048577'}})],
 ['sanitized provider exception',()=>{throw Error(TOKEN+' '+SIGNED);}],
]){
 test('fail closed '+name,async()=>{const f=fixture();f.hook=async url=>hook(url);await denied(f);});
}
test('workflow committed source must contain fixed push/main',async()=>{const f=fixture();f.workflowText=WORKFLOW_TEXT.replace('branches: [main]','branches: [feature]');f.manifest.buildWorkflowHash=sha(f.workflowText);await denied(f);});
for(const target of ['http://productionresultssa1.blob.core.windows.net/actions-results/a.zip?sig=x','https://evil.test/a.zip?sig=x','https://productionresultssa1.blob.core.windows.net.evil.test/actions-results/a.zip?sig=x','https://productionresultssa1.blob.core.windows.net/other/a.zip?sig=x','https://user:pass@productionresultssa1.blob.core.windows.net/actions-results/a.zip?sig=x','https://productionresultssa1.blob.core.windows.net:8443/actions-results/a.zip?sig=x','https://productionresultssa1.blob.core.windows.net/actions-results/%2e%2e/a.zip?sig=x']){
 test('reject unsafe provider redirect '+target.split('?')[0],async()=>{const f=fixture();f.hook=async url=>url.endsWith('/202/zip')?new Response(null,{status:302,headers:{location:target}}):null;await denied(f);assert(!f.calls.some(x=>x.url===target));});
}
test('redirect loop is denied without forwarding credential',async()=>{const f=fixture();f.hook=async url=>url===SIGNED?new Response(null,{status:302,headers:{location:SIGNED}}):null;await denied(f);assert.equal(f.calls.filter(x=>x.url===SIGNED).length,1);});
for(const sourceRevision of ['',M.toUpperCase(),'a'.repeat(41),null])test('invalid source before any read '+String(sourceRevision),async()=>{const f=fixture();f.options.sourceRevision=sourceRevision;await denied(f);assert.equal(f.calls.length,0);});
for(const githubToken of ['',null,'bad token','a\nb','\u007f','x'.repeat(8193)])test('invalid opaque credential denied before read '+String(githubToken).length,async()=>{const f=fixture();f.options.githubToken=githubToken;await denied(f);assert.equal(f.calls.length,0);});
test('opaque one-byte and 8192-byte credentials are valid transport',async()=>{for(const token of ['X','q'.repeat(8192)]){const f=fixture();f.options.githubToken=token;await resolve(f);assert.equal(f.calls[0].init.headers.Authorization,'Bearer '+token);}});
test('native parent abort cancels hanging fetch and sanitizes its reason',async()=>{
 const f=fixture(),c=new AbortController();f.options.signal=c.signal;
 f.options.fetchImpl=async(_url,init)=>new Promise((_,reject)=>{init.signal.addEventListener('abort',()=>reject(Error(SIGNED)),{once:true});});
 const pending=resolve(f);setTimeout(()=>c.abort(Error(TOKEN)),20);await assert.rejects(pending,{message:'Finite package unavailable'});
});
test('real timeout bounds noncooperative fetch',async()=>{
 const f=fixture();f.options.fetchImpl=async()=>new Promise(()=>{});const started=Date.now();
 await denied(f);assert(Date.now()-started<7500);
});
test('body read timeout is bounded even when stream ignores abort',async()=>{
 const f=fixture();f.options.fetchImpl=async()=>new Response(new ReadableStream({start(){}}));
 const started=Date.now();await denied(f);assert(Date.now()-started<7500);
});
test('original elapsed clock cannot be reset by successful reads',async()=>{const f=fixture();let ticks=0;f.options.now=()=>AT+(ticks++>6?30001:0);await denied(f);});
test('unknown/backwards time fails closed',async()=>{for(const value of [NaN,AT-1]){const f=fixture();let first=true;f.options.now=()=>first?(first=false,AT):value;await denied(f);}});
test('parent abort remains active across actual archive subprocess',async()=>{const f=fixture(),c=new AbortController();f.options.signal=c.signal;f.hook=async url=>{if(url===SIGNED)setTimeout(()=>c.abort(),1);return null;};await denied(f);});

test('closed QA archive cannot be silently renamed to index.mjs',async()=>{
 const f=fixture();f.mutation='qa-closed-renamed';await denied(f);
});
test('provider signature query may contain escaped slash without weakening raw path limits',async()=>{
 const f=fixture(),signed=SIGNED.replace('SYNTHETIC_PRIVATE_SIGNATURE','SYNTHETIC%2FPRIVATE%2BSIGNATURE%3D');
 f.hook=async(url,init)=>{
  if(url.endsWith('/202/zip'))return new Response(null,{status:302,headers:{location:signed}});
  if(url===signed){assert.equal(init.headers.Authorization,undefined);return new Response(f.zip);}
  return null;
 };
 assert.equal((await resolve(f)).manifest.modules.qaClosed.module.name,'closed-rollback.mjs');
});
