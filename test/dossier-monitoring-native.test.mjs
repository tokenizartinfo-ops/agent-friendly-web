import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('native D1 original monitoring consent gates the real DO lifecycle and terminal withdrawal',async()=>{
 const journal=readFileSync('db/dossier-monitoring-consent.sql','utf8');
 const statements=[...journal.matchAll(/CREATE TABLE[\s\S]*?\);|CREATE INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(match=>match[0]);assert.equal(statements.length,4);
 const contents=`
import {recordDossierMonitoringConsent,createDossierMonitoringEventsAuthority} from './lib/dossier-monitoring-authority.mjs';
const resource='https://private.example.invalid/mcp',context={grantId:'g',subject:'owner',clientId:'client',resource,scopes:['afw:project:read']};
export class Fixture{
 constructor(ctx,env){this.storage=ctx.storage;this.env=env;}
 async fetch(request){
  const path=new URL(request.url).pathname,p=request.method==='POST'?await request.json():{};
  const authority=createDossierMonitoringEventsAuthority({db:this.env.DB,context,projectId:'p',projectionSecret:'x'.repeat(32),storage:this.storage,custodyKey:Buffer.alloc(32,1),send:async(_,message)=>{await this.storage.put('sends',(await this.storage.get('sends')??0)+1);return{status:200,body:JSON.stringify({challenge:JSON.parse(message.body).challenge})};}});
  try{let value;if(path==='/subscribe')value=await authority.subscribe(p);else if(path==='/unsubscribe')value=await authority.unsubscribe(p);else value={projectRef:await authority.list(),sends:await this.storage.get('sends')??0};return Response.json({value});}catch{return Response.json({code:'unavailable'},{status:409});}
 }
}
export default{async fetch(request,env){
 const path=new URL(request.url).pathname;
 if(path==='/seed'){
  await env.DB.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);');
  for(const sql of ${JSON.stringify(statements)})await env.DB.prepare(sql).run();
  await env.DB.prepare('INSERT INTO site_projects VALUES(?,?,?)').bind('p','owner',3).run();
  await env.DB.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').bind('g','owner','client','p',resource,'["afw:project:read"]',new Date(Date.now()+600000).toISOString(),'').run();return Response.json({});
 }
 if(path==='/grant'||path==='/withdraw'){
  const original=await env.DB.prepare('SELECT expires_at FROM delegated_access_grants WHERE id=?').bind('g').first();
  const latest=await env.DB.prepare('SELECT COALESCE(MAX(sequence),0) n FROM dossier_monitoring_consent_events WHERE grant_id=?').bind('g').first();
  return Response.json(await recordDossierMonitoringConsent({db:env.DB,subject:'owner',grantId:'g',projectId:'p',expectedRevision:3,expectedSequence:latest.n,requestId:path==='/grant'?'11111111-1111-4111-8111-111111111111':'22222222-2222-4222-8222-222222222222',action:path==='/grant'?'grant':'revoke',now:Date.now(),expiresAt:Date.parse(original.expires_at)}));
 }
 return env.QA.get(env.QA.idFromName('dedicated-own')).fetch(request);
}};
`;
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents},bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:bundle.outputFiles[0].text,d1Databases:{DB:'native-monitoring-own'},durableObjects:{QA:{className:'Fixture',useSQLite:true}}}));
 const call=async(path,body,status=200)=>{const response=await runtime.dispatchFetch('https://synthetic.invalid'+path,body?{method:'POST',body:JSON.stringify(body)}:undefined);assert.equal(response.status,status,response.status===status?'':(await response.clone().text()).slice(0,2000));return response.json();};
 try{
  await call('/seed');assert.equal((await call('/state')).value.projectRef,null);assert.equal((await call('/grant')).status,200);
  const projectRef=(await call('/state')).value.projectRef;assert.match(projectRef,/^[0-9a-f]{64}$/);
  const p={name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.example.com/own',secret:'whsec_'+Buffer.alloc(32,2).toString('base64')}};
  const first=(await call('/subscribe',p)).value;assert.deepEqual((await call('/subscribe',p)).value,first);assert.equal((await call('/state')).value.sends,1);
  assert.equal((await call('/withdraw')).status,200);assert.equal((await call('/state')).value.projectRef,null);
  const {secret:ignored,...delivery}=p.delivery;void ignored;await call('/unsubscribe',{...p,delivery});await call('/subscribe',p,409);assert.equal((await call('/state')).value.sends,1);
 }finally{await runtime.dispose();}
});
