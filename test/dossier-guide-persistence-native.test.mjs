import test from 'node:test';
import assert from 'node:assert/strict';
import {readdir,readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

// Real API + Drizzle + native D1. The Access actor below is a synthetic fixture,
// not an acceptance of remote authentication or a new owner session.
test('private guide preferences persist in the native project API with CAS and owner isolation',async()=>{
 const bundle=await build({stdin:{contents:`import {GET,PUT} from './app/api/projects/route.ts';
 export default {async fetch(request){globalThis.__guideFixtureOwner=request.headers.get('x-test-owner');return request.method==='GET'?GET(request):PUT(request);}};`,resolveDir:process.cwd()},bundle:true,format:'esm',platform:'neutral',target:'es2022',write:false,external:['cloudflare:workers'],plugins:[{
  name:'synthetic-access-actor',setup(b){b.onResolve({filter:/cloudflare-access-auth$/},()=>({path:'fixture-actor',namespace:'fixture'}));b.onLoad({filter:/.*/,namespace:'fixture'},()=>({contents:`export async function getCloudflareAccessUser(){const id=globalThis.__guideFixtureOwner;return id?{userId:id,email:id+'@example.invalid'}:null;}`}));}
 }]});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:bundle.outputFiles[0].text,d1Databases:{DB:'guide-local-only'}}));
 try{
  const db=await runtime.getD1Database('DB');
  const migrations=(await readdir('drizzle')).filter(name=>/^\d+.*\.sql$/.test(name)).sort();
  for(const name of migrations)for(const sql of (await readFile(`drizzle/${name}`,'utf8')).split('--> statement-breakpoint').map(v=>v.trim()).filter(Boolean))await db.prepare(sql).run();
  const call=(method,owner,body,id,key)=>runtime.dispatchFetch(`http://localhost/api/projects${id?'?project='+encodeURIComponent(id):''}`,{method,headers:{...(owner?{'x-test-owner':owner}:{}),...(body?{'content-type':'application/json'}:{}),...(key?{'idempotency-key':key}:{})},...(body?{body:JSON.stringify(body)}:{})});
  assert.equal((await call('GET',null)).status,401);
  const created=await call('PUT','owner-a',{website:'https://example.com',deferredQuestions:['hosting','cms']});
  assert.equal(created.status,200);
  let project=(await created.json()).project;
  assert.deepEqual(project.deferredQuestions,['hosting','cms']);
  assert.deepEqual((await(await call('GET','owner-a',null,project.id)).json()).project.deferredQuestions,['hosting','cms']);
  assert.equal((await call('GET','owner-b',null,project.id)).status,404);
  // A deployed older client must preserve private preferences it cannot edit.
  const older={...project,organization:'Saved by older client'};delete older.deferredQuestions;
  const legacyKey='00000000-0000-4000-8000-000000000001';
  const olderResponse=await call('PUT','owner-a',older,undefined,legacyKey);
  assert.equal(olderResponse.status,200);
  assert.equal((await call('PUT','owner-a',{...older,deferredQuestions:[]},undefined,legacyKey)).status,409,'omitted preference and explicit resume are distinct save intentions');
  const before=project;
  project=(await olderResponse.json()).project;
  assert.deepEqual(project.deferredQuestions,['hosting','cms']);
  assert.equal((await call('PUT','owner-a',{...before,deferredQuestions:[]})).status,409);
  const answered=await call('PUT','owner-a',{...project,cms:'WordPress'});
  assert.equal(answered.status,200);
  project=(await answered.json()).project;
  assert.deepEqual(project.deferredQuestions,['hosting']);
  const resumed=await call('PUT','owner-a',{...project,deferredQuestions:[]});
  assert.equal(resumed.status,200);
  assert.deepEqual((await resumed.json()).project.deferredQuestions,[]);
  const other=await call('PUT','owner-b',{website:'https://other.example'});
  assert.deepEqual((await other.json()).project.deferredQuestions,[]);
 }finally{await runtime.dispose();}
});
