import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {Miniflare} from 'miniflare';

test('preparation build returns bounded exact bytes and its closed bundle runs without configuration',async()=>{
 const file=new URL('../scripts/build-preparation-worker.mjs',import.meta.url);
 assert.ok(await readFile(file,'utf8').catch(()=>null),'missing preparation Worker builder before cloud compilation');
 const {buildPreparationWorker}=await import(file.href);
 for(const sourceRevision of [undefined,'main','a'.repeat(39),'A'.repeat(40),'a'.repeat(41)]){
  await assert.rejects(buildPreparationWorker({sourceRevision}),/Explicit source revision required/);
 }
 // A library build labels bytes only; CLI + Actions separately prove actual Git inputs.
 const sourceRevision='a'.repeat(40),result=await buildPreparationWorker({sourceRevision});
 assert.equal(Object.isFrozen(result),true);assert.equal(result.sourceRevision,sourceRevision);
 const bytes=Buffer.from(result.script,'utf8');assert.ok(bytes.length>0&&bytes.length<=2097152);
 assert.equal(result.workerHash,createHash('sha256').update(bytes).digest('hex'));
 assert.deepEqual(Object.keys(result).sort(),['script','sourceRevision','workerHash']);
 const runtime=new Miniflare({modules:true,script:result.script,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat']});
 try{
  const r=await runtime.dispatchFetch('https://example.invalid/mcp',{method:'POST',body:'not JSON'});
  assert.equal(r.status,404);assert.equal(r.headers.get('Cache-Control'),'no-store');
  const data=await r.json();assert.equal(data.executionAllowed,false);assert.equal(data.chargeAllowed,false);assert.equal(data.publicationAllowed,false);
 }finally{await runtime.dispose();}
});
