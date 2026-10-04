import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('delivery constructs a compatible Workers request and rejects redirects',async()=>{
  const bundled=await build({stdin:{contents:`import {deliverOperationalSignal} from './lib/operations-delivery.mjs';
    export default {async fetch(){const results=[];for(const status of [202,302]) {
      results.push(await deliverOperationalSignal({secret:'synthetic-runtime-secret-at-least-32',
        signal:{eventId:'runtime-test',resource:'afw_delegated_canary',check:'delegated_edge',version:'aa121311-2d88-4a2f-ad54-b52193cd1c20',observedAt:new Date().toISOString(),result:'recovered'},
        receiver:{async fetch(request){if(request.redirect!=='manual')throw Error('Unsafe redirect mode');return status===202?Response.json({accepted:true,duplicate:false,fingerprint:'a'.repeat(64)},{status:202}):new Response(null,{status:302,headers:{location:'https://example.invalid'}});}}}));
    }return Response.json(results);}};`,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'browser'});
  const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundled.outputFiles[0].text}));
  try {const results=await (await runtime.dispatchFetch('https://example.invalid')).json();assert.equal(results[0].ok,true);assert.equal(results[1].ok,false);}
  finally {await runtime.dispose();}
});

test('delegated edge probes construct compatible Workers requests without following redirects',async()=>{
  const bundled=await build({stdin:{contents:`import {checkDelegatedEdge} from './lib/delegated-edge-health.mjs';
    export default {async fetch(){const results=[];for(const status of [404,302])results.push(await checkDelegatedEdge({service:'canary',fetchImpl:async(url,options)=>{const request=new Request(url,options);if(request.redirect!=='manual')throw Error('Unsafe redirect mode');return new Response(null,{status});}}));return Response.json(results);}};`,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'browser'});
  const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundled.outputFiles[0].text}));
  try {const results=await (await runtime.dispatchFetch('https://example.invalid')).json();assert.equal(results[0].ok,true);assert.equal(results[1].ok,false);}
  finally {await runtime.dispose();}
});
