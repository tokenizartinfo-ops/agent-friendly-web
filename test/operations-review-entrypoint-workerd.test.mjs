import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
test('unmodified deploy entrypoint boots in workerd and preserves closed API admission',async()=>{
 const bundle=await build({entryPoints:['worker/operations-review/index.mjs'],bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text}));
 try{
  const response=await runtime.dispatchFetch('https://operations-review.agentfriendlyweb.dev/');
  assert.equal(response.status,404);assert.deepEqual(await response.json(),{code:'unavailable'});
 }finally{await runtime.dispose();}
});
