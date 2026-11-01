import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {seedWorld} from './fixtures/finite-seed-world.mjs';
test('actual CLI resolves real archive, verifies bytes/primaries and issues one annotated seed/ref',async()=>{
 const f=await seedWorld(),r=await f.cli();assert.equal(r.status,'seed_material_created');assert.equal(r.qaPublicationBridgeVerified,false);
 assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,1);
 assert(f.calls.some(x=>x.url.includes('/actions/artifacts/202/zip')));assert(f.calls.some(x=>x.url.includes('?include=modules')));
 const posts=f.calls.filter(x=>x.init.method==='POST');assert.equal(posts.length,2);assert(posts.every(x=>x.url.startsWith('https://api.github.com/')));
 await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));assert.equal(f.state.tagPosts,1);
 f.complete();const observed=await f.api.readFiniteMaterialSeed({intentId:f.seed.intentId,sourceRevision:f.seed.sourceRevision,fetchImpl:f.fetchImpl,now:f.now,signal:f.options.signal});
 assert.equal(observed.seedHash,r.seedHash);assert.equal(observed.tagSha,r.tagSha);
 assert(!f.calls.some(x=>x.url.includes('/user/tokens')));
});
test('original seed cannot claim future completion; later reader requires primary success',async()=>{
 const f=await seedWorld();await f.api.issueFiniteMaterialSeed(f.options);
 await assert.rejects(f.api.readFiniteMaterialSeed({intentId:f.seed.intentId,sourceRevision:f.seed.sourceRevision,fetchImpl:f.fetchImpl,now:f.now,signal:f.options.signal}));
 f.complete();assert((await f.api.readFiniteMaterialSeed({intentId:f.seed.intentId,sourceRevision:f.seed.sourceRevision,fetchImpl:f.fetchImpl,now:f.now,signal:f.options.signal})).seedHash);
});
for(const mode of ['tag-lost','tag-late','ref-lost','ref-late'])test('shared original capability never refills after '+mode,async()=>{
 const f=await seedWorld();f.state.mode=mode;await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));const posts=f.state.tagPosts+f.state.refPosts;
 f.state.mode='normal';await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));assert.equal(f.state.tagPosts+f.state.refPosts,posts);assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,mode.startsWith('tag')?0:1);
});
for(const mode of ['marker','action','attempt','existing','bare','wrong-module','wrong-profile','changed-pointer','primary-complete','bad-comment'])test('issuer fails closed before seed POST: '+mode,async()=>{
 const f=await seedWorld();
 if(mode==='marker')process.env.AFW_FINITE_SEED_ORIGINAL_PID='0';if(mode==='action')process.env.GITHUB_ACTION='other';if(mode==='attempt')process.env.GITHUB_RUN_ATTEMPT='2';
 if(mode==='existing'||mode==='bare')f.map.set('/git/ref/tags/afw-finite-observer-create/'+f.seed.intentId,{ref:f.ref,object:{type:mode==='bare'?'commit':'tag',sha:f.tagSha}});
 if(mode==='wrong-module')f.versions[f.live.versionId].modules[0].content_base64=Buffer.from('altered').toString('base64');
 if(mode==='wrong-profile')f.versions[f.live.versionId].bindings[0].class_name='Wrong';
 if(mode==='changed-pointer'){let reads=0;f.state.hook=async url=>{if(url.includes('/deployments?')&&++reads===2)f.live.deploymentId='33333333-3333-4333-8333-333333333333';};}
 if(mode==='primary-complete')f.complete();
 if(mode==='bad-comment')f.map.get('/issues/comments/123').body+=' ';
 await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));assert.equal(f.state.tagPosts,0);assert.equal(f.state.refPosts,0);
});
test('default missing 4C source authority is unavailable after real package and before custody/POST',async()=>{
 const f=await seedWorld({sourceAuthority:false});await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));assert(f.calls.some(x=>x.url.includes('/actions/artifacts/202/zip')));assert(!f.calls.some(x=>x.url.includes('api.cloudflare.com')));assert.equal(f.state.tagPosts,0);
});
test('caller source/pins/receipt cannot replace fixed original issuer authority',async()=>{
 const f=await seedWorld();for(const k of ['seed','pins','resolveSource','receipt'])await assert.rejects(f.api.issueFiniteMaterialSeed({...f.options,[k]:()=>true}));assert.equal(f.calls.length,0);
});
test('actual workflow has sole seed launcher before ready and preserves restore launcher',async()=>{
 const text=await readFile('.github/workflows/afw-finite-finalizer.yml','utf8');
 assert(text.indexOf('name: seed-material')<text.indexOf('name: admit-and-ready'));assert.equal((text.match(/export AFW_FINITE_SEED_ORIGINAL_PID=\$\$/g)??[]).length,1);
 assert.equal((text.match(/exec node scripts\/run-qa-finite-trial-finalizer.mjs seed-material/g)??[]).length,1);
 assert.match(text,/id: finite_seed_once/);assert.match(text,/id: finite_restore_once/);
});
