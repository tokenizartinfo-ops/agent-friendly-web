import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('isolated preparation DDL matches the necessary full-schema objects in real native D1',{timeout:60000},async()=>{
 const module=await import('../scripts/preparation-schema-package.mjs').catch(()=>null);
 assert.equal(typeof module?.readPreparationSchemaPackage,'function','Missing isolated schema packager');
 const p=await module.readPreparationSchemaPackage();
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  script:'export default {fetch(){return new Response(null,{status:404})}};',d1Databases:{FULL_DB:'schema-full-ci-only',MINIMAL_DB:'schema-minimal-ci-only'}}));
 try{
  const full=await runtime.getD1Database('FULL_DB'),minimal=await runtime.getD1Database('MINIMAL_DB');
  for(const name of(await readdir('drizzle')).filter(n=>/^\d+.*\.sql$/.test(n)).sort())
   for(const sql of(await readFile('drizzle/'+name,'utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean))await full.prepare(sql).run();
  for(const name of ['agent-capsule-preparations','delegated-preparation-consents'])
   for(const sql of(await readFile('db/'+name+'.sql','utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean))await full.prepare(sql).run();
  for(const row of p.statements)await minimal.prepare(row.sql).run();
  const metadata=async db=>(await db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_master WHERE name NOT LIKE 'sqlite_%' ORDER BY type,name").all()).results;
  const actual=await metadata(minimal),expected=(await metadata(full)).filter(x=>p.tables.includes(x.tbl_name));
  assert.deepEqual(actual,expected);
  assert.deepEqual(actual.filter(x=>x.type==='table').map(x=>x.name).sort(),[...p.tables].sort());
  for(const table of p.tables){assert.equal((await minimal.prepare('SELECT count(*) AS n FROM '+table).first()).n,0);}
  assert.ok(!actual.some(x=>x.tbl_name==='contact_leads'||x.tbl_name==='delegated_refresh_uses'));
 }finally{await runtime.dispose();}
});
