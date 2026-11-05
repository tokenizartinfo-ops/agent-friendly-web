import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const built=await build({entryPoints:['test/fixtures/finite-preparation-notice-provenance-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
console.log('SYN notice provenance fixture compilations=1 bytes='+built.outputFiles[0].contents.length);
test('REAL native original grant precedes durable notice reservation',async t=>{
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{RELEASE_DB:'SYN-notice-provenance'},durableObjects:{FIXTURE:{className:'FiniteIssuerFixture',useSQLite:true,uniqueKey:'SYN-notice-provenance'}}}));
 t.after(()=>mf.dispose());const response=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({})});
 assert.equal(response.status,200);const {result:r,identity:i}=await response.json();
 assert.equal(r.grant?.row.id,i.grantId);assert.equal(r.reachedNativeGrant,true);
 console.log('reachedNativeGrant='+r.reachedNativeGrant+' journalError='+r.error);
 assert.equal(r.reservation?.status,'recorded','native grant reached; missing journal reservation: '+r.error);
});
