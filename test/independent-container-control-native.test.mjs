import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
test('native diagnostic journal keeps consumed cases and original window across host replacement',{timeout:120000},async()=>{
 const bundle=await build({entryPoints:['test/fixtures/independent-container-control-worker.mjs'],bundle:true,format:'esm',platform:'neutral',
  mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const path=await mkdtemp(join(tmpdir(),'afw-control-native-')),start=Math.floor(Date.now()/1000)*1000-1000,end=start+600000;
 const config=(caseName='0907',endAt=end)=>({...convertV4MiniflareOptions({modules:true,script:bundle.outputFiles[0].text,
  compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat','global_fetch_strictly_public'],
  durableObjects:{CONTROL:{className:'AfwContainerControl',useSQLite:true}},
  bindings:{AFW_CONTROL_ENABLED:'true',AFW_CONTROL_PLAN:'afw-container-control-20261022-v1',
   AFW_CONTROL_CASE:caseName,AFW_CONTROL_START:String(start/1000),AFW_CONTROL_END:String(endAt/1000)}}),resourcePersistencePath:path});
 const mf=new Miniflare(config());
 try {
  const call=async p=>{const r=await mf.dispatchFetch('http://fixture/__ci/'+p);assert.equal(r.status,200);return r.json();};
  const closed=await mf.dispatchFetch('http://fixture/public');
  assert.equal(closed.status,404);assert.equal(closed.headers.get('cache-control'),'no-store');
  const first=await call('first');
  assert.equal(first.stage,'native_container_absent');assert.equal(first.startAttempted,false);
  assert.equal((await call('first')).stage,'case_already_admitted');
  assert.equal((await call('inspect')).cases.length,1);
  await mf.setOptions(config('0929',end+1000));
  assert.equal((await call('second')).stage,'original_window_changed');
  const unchanged=await call('inspect');assert.equal(unchanged.cases.length,1);assert.equal(unchanged.cases[0].stage,'native_container_absent');
  await mf.setOptions(config('0929'));
  assert.equal((await call('second')).stage,'native_container_absent');
  assert.equal((await call('second')).stage,'case_already_admitted');
  const final=await call('inspect');assert.deepEqual(final.cases.map(x=>x.caseName),['0907','0929']);
  assert.equal(final.operationalReadiness,false);assert.equal(final.pcOffAccepted,false);assert.equal(final.physicalClosureAccepted,false);
 }finally{await mf.dispose();await rm(path,{recursive:true,force:true});}
});
