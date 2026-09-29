import assert from 'node:assert/strict';
import test from 'node:test';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readMigrationFiles} from 'drizzle-orm/migrator';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';
import {readScopeReference,saveScopeReference} from '../lib/scope-reference.mjs';

const scopeText=JSON.stringify({format:'afw-scan-scope',version:1,observedUrl:'https://restaurant.example/',checkedAt:'2026-09-21T10:00:00.000Z',locale:'es',evidence:{llms:false},selected:['documents'],control:'unknown'});
const input=(extra={})=>({contract:'afw.scope-reference.v1',confirmSave:true,idempotencyKey:crypto.randomUUID(),expectedProjectRevision:1,expectedReferenceId:null,scopeText,...extra});

test('private scope reference: atomic storage, isolation, review consent and safe retries', {timeout:120000},async()=>{
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,host:'127.0.0.1',port:0,compatibilityDate:'2026-09-01',script:'export default {fetch(){return new Response(null,{status:404})}}',d1Databases:{DB:'scope-synthetic'},d1Persist:false}));
 try{
  const db=await runtime.getD1Database('DB');
  for(const m of readMigrationFiles({migrationsFolder:'drizzle'}))for(const s of m.sql)if(s.trim())await db.prepare(s).run();
  await db.prepare("INSERT INTO site_projects (id,user_id,owner_email,website,notes,created_at,updated_at) VALUES ('p','alice','alice@example.invalid','https://restaurant.example/','retain notes','2026-09-21','2026-09-21')").run();
  const save=(body,user='alice')=>saveScopeReference(db,user,'p',body);
  const count=async()=>(await db.prepare('SELECT count(*) AS n FROM project_events').first()).n;
  assert.equal((await readScopeReference(db,'alice','p')).reference,null);
  assert.equal((await readScopeReference(db,'bob','p')).status,404);
  assert.equal((await save(input(),'bob')).status,404);
  for(const changes of [{confirmSave:false},{owner:true},{expectedProjectRevision:0},{scopeText:scopeText.replace('restaurant.example','other.example')},{scopeText:scopeText.replace('https://restaurant.example/','https://restaurant.example/?token=private')},{scopeText:' '.repeat(16385)}])assert.equal((await save(input(changes))).status,400);
  assert.equal(await count(),0);
  const first=input();
  const concurrent=await Promise.all([save(first),save(first)]);
  assert.deepEqual(concurrent.map(r=>r.status),[200,200]);
  const reference=concurrent[0].reference;
  assert.equal(await count(),1);
  assert.equal(reference.scopeText,scopeText);
  assert.equal(reference.requiresFreshReview,true);
  assert.equal(reference.publicationAuthorized,false);
  assert.equal((await save({...first,scopeText:scopeText.replace('unknown','self')})).status,409);
  assert.equal((await save(input())).status,409);
  assert.equal((await save(input({expectedReferenceId:reference.id,expectedProjectRevision:2}))).status,409);
  const replacements=await Promise.all([save(input({expectedReferenceId:reference.id})),save(input({expectedReferenceId:reference.id}))]);
  assert.deepEqual(replacements.map(r=>r.status).sort(),[200,409]);
  assert.equal(await count(),2);
  assert.equal((await save(first)).status,409,'old retry must not present a superseded reference as current');
  const loaded=await readScopeReference(db,'alice','p');
  assert.notEqual(loaded.reference.id,reference.id);
  assert.equal(loaded.reference.websiteMatches,true);
  await db.prepare("UPDATE site_projects SET website='https://other.example/',revision=2 WHERE id='p'").run();
  assert.equal((await readScopeReference(db,'alice','p')).reference.websiteMatches,false);
  const project=await db.prepare("SELECT notes,revision FROM site_projects WHERE id='p'").first();
  assert.deepEqual(project,{notes:'retain notes',revision:2});
 }finally{await runtime.dispose();}
});

test('scope API authenticates before access and rejects cross-origin, oversized and malformed writes',async()=>{
 let actor=null;const calls=[];
 const exports={};
 const code=ts.transpileModule(await readFile('app/api/projects/[projectId]/scope-reference/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const modules={'cloudflare:workers':{env:{DB:'synthetic'}},'../../../../cloudflare-access-auth':{getCloudflareAccessUser:async()=>actor},'../../../../../lib/scope-reference.mjs':{
  readScopeReference:async(...args)=>{calls.push(args);return {status:200,reference:null};},saveScopeReference:async(...args)=>{calls.push(args);return {status:200,reference:null};}
 }};
 vm.runInNewContext(code,{exports,require:name=>{assert.ok(modules[name],name);return modules[name];},Response,URL,TextDecoder,Uint8Array});
 const ctx={params:Promise.resolve({projectId:'p'})};
 const post=(body='{}',headers={'content-type':'application/json'})=>exports.POST(new Request('https://agentfriendlyweb.dev/api/projects/p/scope-reference',{method:'POST',headers,body}),ctx);
 assert.equal((await exports.GET(null,ctx)).status,401);assert.equal((await post()).status,401);assert.equal(calls.length,0);
 actor={userId:'alice'};
 for(const [body,headers,status] of [['{}',{},403],['{}',{'content-type':'application/json',origin:'https://other.example'},403],['{',{'content-type':'application/json'},400],[' '.repeat(24577),{'content-type':'application/json'},413]])assert.equal((await post(body,headers)).status,status);
 assert.equal(calls.length,0);
 const result=await post();assert.equal(result.status,200);assert.equal(result.headers.get('cache-control'),'no-store');
 assert.deepEqual(calls[0].slice(0,3),['synthetic','alice','p']);
});
