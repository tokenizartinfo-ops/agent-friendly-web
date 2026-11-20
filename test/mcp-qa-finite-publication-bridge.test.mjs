import test from 'node:test';
import assert from 'node:assert/strict';
import {seedWorld} from './fixtures/finite-seed-world.mjs';
import {readFiniteQaPublicationBridge} from '../lib/mcp-qa-finite-publication-bridge.mjs';
test('native bridge uses actual primary seed and fresh native pointer while direct QA code remains false',async()=>{
 const f=await seedWorld();await f.api.issueFiniteMaterialSeed(f.options);f.complete();f.calls.length=0;
 const r=await f.api.readFiniteQaPublicationBridge(f.nativeOptions());
 assert.equal(r.qaPublicationBridgeVerified,true);assert.equal(r.qaCodeProvenanceVerified,false);assert.equal(r.scopeVerified,false);assert.equal(r.operationalReadiness,false);
 assert.equal(f.calls.length,14);assert(f.calls.every(x=>x.init.method==='GET'));
 const gh=f.calls.filter(x=>x.url.includes('api.github.com'));assert.equal(gh.length,11);assert(gh.every(x=>x.init.headers.Authorization===undefined));
});
for(const mode of ['version','binding','source','in-progress','pointer-between-awaits','native-version-between-awaits','late'])test('native bridge denies '+mode,async()=>{
 const f=await seedWorld();await f.api.issueFiniteMaterialSeed(f.options);if(mode!=='in-progress')f.complete();
 if(mode==='version')f.nativeEnv.AFW_QA_VERSION.id='33333333-3333-4333-8333-333333333333';
 if(mode==='binding')f.nativeEnv.AFW_INDEPENDENT_CLOSURE={idFromName:()=>({toString:()=> 'wrong'})};
 if(mode==='source')f.nativeEnv.SOURCE_TEMPLATE='0'.repeat(40);
 let gets=0;f.state.hook=async url=>{
  if(url.includes('api.github.com')&&++gets===3){
   if(mode==='pointer-between-awaits')f.live.deploymentId='33333333-3333-4333-8333-333333333333';
   if(mode==='native-version-between-awaits')f.nativeEnv.AFW_QA_VERSION.id='33333333-3333-4333-8333-333333333333';
   if(mode==='late')f.setNow(f.now()+5000);
  }
 };
 await assert.rejects(f.api.readFiniteQaPublicationBridge(f.nativeOptions()));
 assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,1);
});
test('default missing native custody/source receipt remains unavailable before network',async()=>{
 let calls=0;await assert.rejects(readFiniteQaPublicationBridge({ctx:{},env:{},intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40),signal:new AbortController().signal,fetchImpl:async()=>{calls++;}}));assert.equal(calls,0);
});

for(const mode of ['malformed-notbefore','extra-token-field','wrong-native-id','inactive-native','expired-native'])test('native account identity rejects '+mode,async()=>{
 const f=await seedWorld();await f.api.issueFiniteMaterialSeed(f.options);f.complete();
 f.state.hook=async(url,init)=>{
  if(url.endsWith('/tokens/verify')&&init.headers.Authorization==='Bearer synthetic-native'){
   const result={id:'a'.repeat(32),status:'active',expires_on:new Date(f.T0+86400000).toISOString(),not_before:null};
   if(mode==='malformed-notbefore')result.not_before='garbage';if(mode==='extra-token-field')result.unapproved=true;if(mode==='wrong-native-id')result.id='b'.repeat(32);if(mode==='inactive-native')result.status='disabled';if(mode==='expired-native')result.expires_on=new Date(f.T0).toISOString();
   return f.response({success:true,errors:[],messages:[],result});
  }
 };
 await assert.rejects(f.api.readFiniteQaPublicationBridge(f.nativeOptions()));
});

for(const mode of ['missing','malformed','nonstring-array'])test('native bridge rejects '+mode+' admit job start',async()=>{
 const f=await seedWorld();await f.api.issueFiniteMaterialSeed(f.options);f.complete();
 const job=f.map.get('/actions/runs/11/attempts/1/jobs?per_page=100').jobs[0];
 if(mode==='missing')delete job.started_at;
 else job.started_at=mode==='malformed'?'not-a-date':[job.started_at];
 f.calls.length=0;
 await assert.rejects(f.api.readFiniteQaPublicationBridge(f.nativeOptions()));
 assert(f.calls.every(x=>x.init.method==='GET'));
});
