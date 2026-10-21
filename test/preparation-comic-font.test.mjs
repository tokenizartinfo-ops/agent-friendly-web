import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {preparationComicAssetResponse,PREPARATION_COMIC_FONT_PATH as FONT,PREPARATION_COMIC_LICENSE_PATH as LICENSE} from '../lib/preparation-comic-font.mjs';
import {createDelegatedPreparationWorker} from '../worker/mcp-preparation/index.mjs';
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
test('asset routing never touches private authority, body, clocks or environment, and preserves unmatched routing',async()=>{
 const worker=createDelegatedPreparationWorker({now(){throw Error('clock read');},monotonic(){throw Error('clock read');}});
 const env=new Proxy({},{get(){throw Error('environment read');}});
 for(const path of[FONT,LICENSE]){
  assert.equal((await worker.fetch(new Request(origin+path),env,{})).status,200);
  const request=new Request(origin+path,{method:'POST',body:'never-read'});
  request.text=()=>{throw Error('body read');};request.arrayBuffer=()=>{throw Error('body read');};
  const denied=await worker.fetch(request,env,{});assert.equal(denied.status,405);assert.equal(denied.headers.get('Allow'),'GET, HEAD');
 }
 for(const path of['/','/mcp',FONT+'?other=1',FONT+'/extra','/assets/private']){
  assert.equal(preparationComicAssetResponse(new Request(origin+path)),null);
  assert.equal((await worker.fetch(new Request(origin+path),{},{})).status,404);
 }
});
