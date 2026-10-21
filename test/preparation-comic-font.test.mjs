import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {preparationComicAssetResponse,PREPARATION_COMIC_FONT_PATH as FONT,PREPARATION_COMIC_LICENSE_PATH as LICENSE} from '../lib/preparation-comic-font.mjs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const origin='https://preparation-canary.agentfriendlyweb.dev';
test('public font and full license retain exact unmodified upstream blobs',async()=>{
 for(const [path,expected,size,type]of [[FONT,'c63e2402929a1f3f570b9383859e031842999d10',13888,'font/woff2'],[LICENSE,'1a1fefa43bba6bb1b5a2530d780b3fa0d122cb43',4390,'text/plain; charset=utf-8']]){
  const response=preparationComicAssetResponse(new Request(origin+path)),bytes=Buffer.from(await response.arrayBuffer());
  assert.equal(response.status,200);assert.equal(bytes.length,size);
  assert.equal(createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),expected);
  assert.equal(response.headers.get('Content-Type'),type);assert.match(response.headers.get('Cache-Control'),/immutable/);
  assert.equal(response.headers.get('Cross-Origin-Resource-Policy'),'same-origin');
  assert.equal(response.headers.get('Access-Control-Allow-Origin'),null);assert.equal(response.headers.get('Set-Cookie'),null);
  assert.ok(response.headers.get('Link').includes(LICENSE));
  const head=preparationComicAssetResponse(new Request(origin+path,{method:'HEAD'}));
  assert.equal(head.status,200);assert.equal(await head.text(),'');
  assert.deepEqual([...head.headers],[...response.headers]);
 }
});
test('asset routing never touches private authority, body, clocks or environment in native workerd',async()=>{
 const fixture=`import {createDelegatedPreparationWorker} from './worker/mcp-preparation/index.mjs';
 const worker=createDelegatedPreparationWorker({now(){throw Error('clock read');},monotonic(){throw Error('clock read');}});
 const forbidden=new Proxy({},{get(){throw Error('environment read');}});
 export default {fetch(request,env,ctx){
  const path=new URL(request.url).pathname,asset=path.startsWith('/assets/afw-comic-neue-')&&!new URL(request.url).search;
  request.text=()=>{throw Error('body read');};request.arrayBuffer=()=>{throw Error('body read');};request.json=()=>{throw Error('body read');};
  return worker.fetch(request,asset?forbidden:{},ctx);
 }};`;
 const result=await build({stdin:{contents:fixture,resolveDir:process.cwd(),sourcefile:'font-native.mjs'},bundle:true,format:'esm',platform:'neutral',
  mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:result.outputFiles[0].text}));
 try{
  for(const path of[FONT,LICENSE]){
   const accepted=await runtime.dispatchFetch(origin+path);assert.equal(accepted.status,200);assert.ok((await accepted.arrayBuffer()).byteLength>0);
   const denied=await runtime.dispatchFetch(origin+path,{method:'POST',body:'never-read'});
   assert.equal(denied.status,405);assert.equal(denied.headers.get('Allow'),'GET, HEAD');
  }
  for(const path of['/','/mcp',FONT+'?other=1',FONT+'/extra','/assets/private']){
   assert.equal(preparationComicAssetResponse(new Request(origin+path)),null);
   // Unknown exact static paths still enter the original disabled private gate.
   if(!path.startsWith(FONT+'/'))assert.equal((await runtime.dispatchFetch(origin+path)).status,404);
  }
 }finally{await runtime.dispose();}
});
