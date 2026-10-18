import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('native observation preflight resolves only the original same-owner dossier without auditing or writing',async()=>{
 const bundle=await build({stdin:{contents:`import {POST as create} from './app/api/projects/route.ts';import {GET,POST} from './app/api/projects/[projectId]/observations/route.ts';export default {async fetch(request){globalThis.__domainOwner=request.headers.get('x-test-owner');if(new URL(request.url).pathname==='/api/projects')return create(request);const projectId=new URL(request.url).pathname.split('/')[3];return (request.method==='GET'?GET:POST)(request,{params:Promise.resolve({projectId})});}};`,resolveDir:process.cwd()},bundle:true,format:'esm',platform:'neutral',target:'es2022',write:false,external:['cloudflare:workers'],plugins:[{name:'synthetic-domain-actor',setup(b){b.onResolve({filter:/cloudflare-access-auth$/},()=>({path:'actor',namespace:'fixture'}));b.onResolve({filter:/public-audit\.mjs$/},()=>({path:'audit',namespace:'fixture'}));b.onLoad({filter:/.*/,namespace:'fixture'},args=>({contents:args.path==='actor'?`export async function getCloudflareAccessUser(){const userId=globalThis.__domainOwner;return userId?{userId,email:userId+'@example.invalid'}:null;}`:`export async function runPublicAudit(){throw Error('unexpected_public_audit');}export const sanitizeObservation=value=>value;`}));}}]});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:bundle.outputFiles[0].text,d1Databases:{DB:'domain-continuation-local-only'}}));
 try{
  const db=await runtime.getD1Database('DB');
  for(const name of (await readdir('drizzle')).filter(n=>/^\d+.*\.sql$/.test(n)).sort())for(const sql of (await readFile('drizzle/'+name,'utf8')).split('--> statement-breakpoint').map(v=>v.trim()).filter(Boolean))await db.prepare(sql).run();
  async function create(owner){const response=await runtime.dispatchFetch('http://localhost/api/projects',{method:'POST',headers:{'x-test-owner':owner,'content-type':'application/json'},body:JSON.stringify({contract:'agentfriendly.project-create.v1',confirmCreate:true,idempotencyKey:crypto.randomUUID(),website:'https://example.org/',organization:'Synthetic'})});assert.equal(response.status,201);return(await response.json()).project.id;}
  const original=await create('owner-a'),draft=await create('owner-a'),foreign=await create('owner-b');
  const at='2026-10-18T12:00:00Z';
  await db.prepare('INSERT INTO registry_sites(id,project_id,user_id,hostname,canonical_origin,created_at,updated_at) VALUES(?,?,?,?,?,?,?)').bind('registry-original',original,'owner-a','example.org','https://example.org',at,at).run();
  const snapshot=()=>db.prepare('SELECT (SELECT count(*) FROM scan_observations) AS observations,(SELECT count(*) FROM project_events) AS events,(SELECT sum(revision) FROM site_projects) AS revisions,(SELECT count(*) FROM registry_sites) AS sites').first();
  const before=await snapshot();
  const call=(id,owner,method='GET')=>runtime.dispatchFetch('http://localhost/api/projects/'+id+'/observations',{method,headers:{...(owner?{'x-test-owner':owner}:{}),...(method==='POST'?{'content-type':'application/json','idempotency-key':crypto.randomUUID()}:{})},...(method==='POST'?{body:JSON.stringify({confirmSave:true})}:{})});
  assert.equal((await call(draft,null)).status,401);assert.equal((await call(draft,'owner-b')).status,404);
  const ownResponse=await call(draft,'owner-a'),own=await ownResponse.json();
  assert.equal(ownResponse.headers.get('cache-control'),'no-store');
  assert.deepEqual(own.domainAssociation,{state:'own_other',origin:'https://example.org',projectId:original});assert.equal(own.observation,null);
  assert.deepEqual((await(await call(original,'owner-a')).json()).domainAssociation,{state:'current',origin:'https://example.org'});
  const other=await(await call(foreign,'owner-b')).json();
  assert.deepEqual(other.domainAssociation,{state:'other',origin:'https://example.org'});assert.ok(!JSON.stringify(other).includes(original));
  for(const [id,owner,state]of [[draft,'owner-a','own_other'],[foreign,'owner-b','other']]){
   const response=await call(id,owner,'POST');assert.equal(response.status,409);assert.equal(response.headers.get('cache-control'),'no-store');const payload=await response.json();assert.equal(payload.code,'domain_association_conflict');assert.equal(payload.domainAssociation.state,state);
  }
  assert.deepEqual(await snapshot(),before);
  await db.prepare('UPDATE site_projects SET website=? WHERE id=?').bind('https://changed.example/',original).run();
  assert.deepEqual((await(await call(draft,'owner-a')).json()).domainAssociation,{state:'other',origin:'https://example.org'});
 }finally{await runtime.dispose();}
});
