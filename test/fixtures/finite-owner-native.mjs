import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';
import {finitePublicProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
const qaLimiterBinding=finitePublicProfileTemplate('qaLive').bindings.find(b=>b.type==='ratelimit').name;
const qaVersionBinding=finitePublicProfileTemplate('qaLive').bindings.find(b=>b.type==='version_metadata').name;
const origin='https://delegated-canary.agentfriendlyweb.dev';
export async function native(t,mode='normal',versionBinding=qaVersionBinding,limiterBinding=qaLimiterBinding,connection=null){
 const {privateKey,publicKey}=await generateKeyPair('RS256'),jwk={...await exportJWK(publicKey),kid:'finite-source-native',alg:'RS256'};
 const bundle=await build({entryPoints:[connection?.setupFacts?'test/fixtures/finite-policy-setup-facts-worker.mjs':connection?'test/fixtures/finite-connection-worker.mjs':'test/fixtures/finite-owner-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],plugins:[{name:'synthetic-fixed-source',setup(b){if(connection?.setupFacts){
 b.onResolve({filter:/mcp-qa-finite-policy-setup-source\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-policy-setup-facts-source.mjs'}));
 b.onResolve({filter:/mcp-qa-finite-seed-http\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-policy-setup-facts-seed.mjs'}));
 b.onLoad({filter:/mcp-qa-finite-owner-preparation\.mjs$/},args=>({contents:readFileSync(args.path,'utf8').replace('export async function readFiniteOwnerSetupFacts','async function actualReadFiniteOwnerSetupFacts')+"\nimport {observeActualFacts} from '"+process.cwd()+"/test/fixtures/finite-policy-setup-facts-source.mjs'; export function readFiniteOwnerSetupFacts(options,lease){return observeActualFacts(actualReadFiniteOwnerSetupFacts,options,lease);}",resolveDir:process.cwd()+'/lib',loader:'js'}));
 }if(connection)b.onResolve({filter:/mcp-qa-finite-connection-source\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-connection-source.mjs'}));b.onResolve({filter:/mcp-qa-finite-owner-source\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/'+(connection?'finite-connection-owner-source.mjs':'finite-owner-source.mjs')}));}}]});
 let jwksReads=0;
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundle.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],durableObjects:{FIXTURE:{className:connection?.setupFacts?'SetupFactsFixture':connection?'FiniteConnectionFixture':'FiniteOwnerFixture',useSQLite:true,uniqueKey:'finite-owner-task2'}},d1Databases:{DB:'qa-private',FIXTURE_RELEASE_DB:'release-primary',...(mode==='missing'?{}:{RELEASE_DB:mode==='wrong'?'qa-private':'release-primary'})},ratelimits:{[limiterBinding]:{namespace_id:'99122',simple:{limit:1000,period:60}}},bindings:{...(connection?{AFW_MCP_CLOSURE_READ_TOKEN:'SYNTHETIC_READER_0000000000000000',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_0000000000000000'}:{}),[versionBinding]:{id:'11111111-1111-4111-8111-111111111111'}},outboundService:async request=>{
  if(connection&&new URL(request.url).origin==='https://api.cloudflare.com')return connection.outbound(request);
  assert.equal(request.url,'https://finite-fixture.cloudflareaccess.com/cdn-cgi/access/certs');jwksReads++;
  return Response.json({keys:[jwk]});
 }}));
 t.after(()=>runtime.dispose());
 const db=await runtime.getD1Database('FIXTURE_RELEASE_DB');
 await db.exec("CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,organization TEXT,website TEXT,role TEXT,site_type TEXT,control TEXT,audience TEXT,goals_json TEXT,languages_json TEXT,status TEXT,completion INTEGER,revision INTEGER,updated_at TEXT,cms TEXT,hosting TEXT,content_sources_json TEXT); CREATE TABLE copilot_working_drafts(project_id TEXT,user_id TEXT,session_json TEXT);");
 await db.prepare("INSERT INTO site_projects VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind('synthetic-owned','owner','Proyecto sintético','https://example.invalid','owner','content','none','users','[\"discovery\"]','[\"es\"]','draft',10,1,new Date().toISOString(),'','','[]').run();
 for(const name of readdirSync('drizzle').filter(x=>/^001[12]_.*\.sql$/.test(x)).sort()){
  const statements=readFileSync('drizzle/'+name,'utf8').split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean);
  for(const sql of statements)await db.prepare(sql).run();
 }
 for(const path of ['db/dossier-monitoring-consent.sql','db/dossier-monitoring-owner-tickets.sql']){
  const sqls=[...readFileSync(path,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(x=>x[0]);
  for(const sql of sqls)await db.prepare(sql).run();
 }
 const jwt=(subject='owner',aud='finite-owner',expires='30m')=>new SignJWT({email:'fixture@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer('https://finite-fixture.cloudflareaccess.com').setAudience(aud).setIssuedAt().setExpirationTime(expires).sign(privateKey);
 const token=await jwt();
 const call=(path,options={})=>runtime.dispatchFetch(origin+path,{...options,headers:{'Cf-Access-Jwt-Assertion':token,...options.headers}});
 const json=(path,value)=>call(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(value)}).then(r=>r.json());
 assert.equal((await call('/fixture/init')).status,200);
 const screen=async(cookie)=>{const r=await call('/connections/finite-prepare',cookie?{headers:{Cookie:cookie}}:{}),html=await r.text();assert.equal(r.status,200);return {html,handle:html.match(/name="handle" value="([^"]+)"/)?.[1],projectRef:html.match(/name="projectRef" value="([^"]+)"/)?.[1],cookie:r.headers.get('Set-Cookie')?.split(';')[0]};};
 const submit=(s,extra={})=>call('/connections/finite-prepare',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:s.cookie,...extra.headers},body:new URLSearchParams({handle:s.handle,projectRef:s.projectRef,decision:'approve',...extra.fields})});
 return {call,json,screen,submit,jwt,token,db,jwksReads:()=>jwksReads};
}