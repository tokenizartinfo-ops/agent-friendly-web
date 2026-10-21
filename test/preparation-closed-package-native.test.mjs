import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash} from 'node:crypto';
const exec=promisify(execFile),hash=v=>createHash('sha256').update(v).digest('hex');
const flags={AFW_DELEGATED_PREPARATION_ROUTER_ENABLED:'false',AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED:'false',
 AFW_DELEGATED_OAUTH_ENABLED:'false',AFW_DELEGATED_PREPARATION_ENABLED:'false'};

test('closed release qualification rejects every open human source entry for candidate and rollback',{timeout:120000},async t=>{
 const parent=resolve('output');await mkdir(parent,{recursive:true});
 const directory=await mkdtemp(join(parent,'own-closed-package-native-')),scripts=join(directory,'scripts'),out=join(directory,'output/preparation-canary-release');
 await mkdir(scripts,{recursive:true});await mkdir(out,{recursive:true});
 const probe=join(scripts,'check.mjs');await writeFile(probe,await readFile('scripts/check-preparation-closed-package.mjs','utf8'));
 const env={...process.env,GITHUB_ACTIONS:'true',GITHUB_REPOSITORY:'tokenizartinfo-ops/agent-friendly-web',WRANGLER_SEND_METRICS:'false'};
 const profile={name:'agent-friendly-web-preparation-canary',workers_dev:false,preview_urls:false,keep_vars:false,
  compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],vars:flags};
 const source=(openPath=null,openMethod=null)=>`export default {fetch(r){const open=new URL(r.url).pathname===${JSON.stringify(openPath)}&&r.method===${JSON.stringify(openMethod)};return Response.json({code:"preparation_route_unavailable",executionAllowed:false,chargeAllowed:false,publicationAllowed:false},{status:open?200:404,headers:{"Cache-Control":"no-store"}})}};`;
 async function packageOf({openPath,openMethod,target='index.mjs'}={}){
  const script=source(target==='index.mjs'?openPath:null,target==='index.mjs'?openMethod:null),
   rollback=source(target==='rollback.mjs'?openPath:null,target==='rollback.mjs'?openMethod:null);
  await writeFile(join(out,'wrangler.closed.json'),JSON.stringify(profile));
  await writeFile(join(out,'index.mjs'),script);await writeFile(join(out,'rollback.mjs'),rollback);
  await writeFile(join(out,'receipt.json'),JSON.stringify({workerHash:hash(script),rollbackHash:hash(rollback),nativeClosedQualified:false,closedUploadReady:false}));
  return {script,rollback};
 }
 try{
  for(const target of ['index.mjs','rollback.mjs'])await t.test('rejects open source routes in '+target,async()=>{
   for(const path of ['/source','/source/identity','/source/new'])for(const method of ['GET','POST']){
    await packageOf({openPath:path,openMethod:method,target});
    await assert.rejects(()=>exec(process.execPath,[probe],{env,timeout:20000,maxBuffer:262144}),e=>{
     assert.ok(Number.isInteger(e.code)&&e.code!==0,path+' '+method+' must be rejected');
     assert.match(e.stderr,/AssertionError/);return true;
    },path+' '+method+' must not qualify');
    const receipt=JSON.parse(await readFile(join(out,'receipt.json'),'utf8'));
    assert.equal(receipt.nativeClosedQualified,false);assert.equal(receipt.closedUploadReady,false);
   }
  });
  await t.test('fully closed exact payload preserves both hashes and all44 cases without claiming upload',async()=>{
   const original=await packageOf();const r=await exec(process.execPath,[probe],{env,timeout:20000,maxBuffer:262144});
   const summary=JSON.parse(r.stdout.trim());assert.equal(summary.tests,44);assert.equal(summary.nativeClosedQualified,true);
   const result=JSON.parse(await readFile(join(out,'native-closed.json'),'utf8')),
    receipt=JSON.parse(await readFile(join(out,'receipt.json'),'utf8'));
   assert.equal(result.remoteMutations,0);assert.equal(result.operationalReadiness,false);
   assert.equal(receipt.closedUploadReady,false);assert.equal(receipt.workerHash,hash(original.script));assert.equal(receipt.rollbackHash,hash(original.rollback));
   assert.equal(await readFile(join(out,'index.mjs'),'utf8'),original.script);assert.equal(await readFile(join(out,'rollback.mjs'),'utf8'),original.rollback);
   for(const filename of ['index.mjs','rollback.mjs'])for(const path of ['/source','/source/identity','/source/new'])for(const method of ['GET','POST'])
    assert.equal(result.cases.filter(x=>x.source===filename&&x.path===path&&x.method===method&&x.status===404&&x.closed===true).length,1);
  });
 }finally{
  // Exact mkdtemp descendant only; test owns this ephemeral Actions directory.
  assert.equal(directory.startsWith(parent+'/')||directory.startsWith(parent+'\\'),true);
  await rm(directory,{recursive:true,force:true});
 }
});
