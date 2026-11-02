import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const schemas=['dossier-monitoring-consent','dossier-node-process','dossier-successor-reservation','dossier-successor-launch','dossier-subscription-receipt'].flatMap(file=>[...readFileSync('db/'+file+'.sql','utf8').matchAll(/CREATE TABLE(?: IF NOT EXISTS)?[\s\S]*?\);|CREATE(?: UNIQUE)? INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(x=>x[0]));
const bundle=await build({entryPoints:['test/fixtures/finite-premature-admission-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
export async function exercise(mode,extra={}){
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundle.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{T0:String(Date.now()-1000)},durableObjects:{AFW_DOSSIER_EVENTS_NODE:{className:'Native',useSQLite:true}},d1Databases:{DB:'c3-premature'}}));
 try{
  const db=await mf.getD1Database('DB');
  await db.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);');
  for(const sql of schemas)await db.prepare(sql).run();
  const response=await mf.dispatchFetch('https://synthetic.invalid',{method:'POST',body:JSON.stringify({mode,...extra})});
  assert.equal(response.status,200,await response.clone().text());return await response.json();
 }finally{await mf.dispose();}
}
