import assert from 'node:assert/strict';
import test from 'node:test';
import {listOwnerProjects} from '../lib/project-directory.mjs';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';

test('private project directory binds the authenticated owner and exposes only summaries',async()=>{
 const calls=[];
 const row={id:'project-a',organization:'A',website:'https://a.example/',status:'draft',completion:20,updated_at:'2026-09-29T12:00:00.000Z',notes:'private',owner_email:'private@example.invalid'};
 const db={prepare(sql){calls.push(sql);return {bind(...args){calls.push(args);return {all:async()=>({results:[row]})};}};}};
 const result=await listOwnerProjects(db,'opaque-owner','0');
 assert.match(calls[0],/WHERE user_id=\?/);
 assert.deepEqual(calls[1],['opaque-owner',21,0]);
 assert.deepEqual(result,{status:200,projects:[{id:'project-a',organization:'A',website:'https://a.example/',status:'draft',completion:20,updatedAt:'2026-09-29T12:00:00.000Z'}],nextOffset:null});
});

test('directory rejects invalid offsets and paginates without exposing an extra row',async()=>{
 const rows=Array.from({length:21},(_,i)=>({id:`project-${i}`,organization:'',website:'https://example.org/',status:'draft',completion:0,updated_at:'2026-09-29T12:00:00.000Z'}));
 let reads=0;
 const db={prepare(){reads++;return {bind(){return {all:async()=>({results:rows})};}};}};
 for(const offset of ['-1','01','Infinity','10001','1e3'])assert.equal((await listOwnerProjects(db,'owner',offset)).status,400);
 assert.equal((await listOwnerProjects(db,'', '0')).status,401);
 assert.equal(reads,0);
 const result=await listOwnerProjects(db,'owner','20');
 assert.equal(result.projects.length,20);
 assert.equal(result.nextOffset,40);
});

test('private directory route authenticates before reading and keeps owner identity server-side',async()=>{
 let actor=null;const calls=[];const exports={};
 const code=ts.transpileModule(await readFile('app/api/projects/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const modules={
  'drizzle-orm':{and(){},desc(){},eq(){},sql(){}},
  '../../cloudflare-access-auth':{getCloudflareAccessUser:async()=>actor},
  '../../../db':{getDb(){throw Error('unexpected_dossier_read');}},
  '../../../db/schema':{siteProjects:{}},
  '../../../lib/intake.mjs':{},'../../../lib/methodology.mjs':{},
  '../../../lib/project-directory.mjs':{listOwnerProjects:async(...args)=>{calls.push(args);return {status:200,projects:[],nextOffset:null};}},
  '../../../lib/dossier-field-history.mjs':{changedDossierFields(){}},
  'cloudflare:workers':{env:{DB:'owner-scoped-db'}},
 };
 vm.runInNewContext(code,{exports,require:name=>{assert.ok(modules[name],name);return modules[name];},Response,URL,URLSearchParams,crypto});
 const get=path=>exports.GET(new Request(`https://agentfriendlyweb.dev${path}`));
 assert.equal((await get('/api/projects?list=1')).status,401);
 assert.equal(calls.length,0);
 actor={userId:'opaque-owner'};
 assert.equal((await get('/api/projects?list=1&project=other')).status,400);
 assert.equal((await get('/api/projects?list=1&offset=1&offset=2')).status,400);
 const response=await get('/api/projects?list=1&offset=20');
 assert.equal(response.status,200);
 assert.equal(response.headers.get('cache-control'),'no-store');
 assert.deepEqual(calls[0],['owner-scoped-db','opaque-owner','20']);
});
