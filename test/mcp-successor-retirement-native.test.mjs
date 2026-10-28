import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('native successor retirement RPC reads original sealed DO/D1 state without a Container',async()=>{
 const statements=file=>[...readFileSync(file,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE(?: UNIQUE)? INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(m=>m[0]);
 const schemas=['dossier-monitoring-consent','dossier-node-process','dossier-successor-reservation'].flatMap(n=>statements('db/'+n+'.sql'));
 const startAt=Date.now()-1000,expiresAt=startAt+180000;
 const contents=`
 import {createHash} from 'node:crypto';
 import {AfwOwnEventNode} from './worker/mcp-own/index.mjs';
 import {createNodeProcessCustody} from './lib/mcp-node-process-custody.mjs';
 import {resolveSuccessorPreparation} from './lib/mcp-successor-manifest.mjs';
 import {snapshotRetiredRpcObservation} from './lib/mcp-retired-rpc-observation.mjs';
 const context={grantId:'g',subject:'owner',clientId:'client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',scopes:['afw:project:read']};
 const program='CI-only custody program',sourceRevision='c'.repeat(40),programHash=createHash('sha256').update(program).digest('hex'),window={startAt:${startAt},expiresAt:${expiresAt}};
 const {startAt,expiresAt}=window;
 function settings(env){
  const namespace=env.NODE,scope={accountId:'1'.repeat(32),workerName:'agent-friendly-web-delegated-canary',namespaceId:'2'.repeat(32),applicationId:'ci-own',ownerRef:'3'.repeat(64),projectRef:'4'.repeat(64),resource:context.resource};
  const original={containerId:namespace.idFromName('afw-own-event-one-occurrence-v1').toString(),applicationId:scope.applicationId,programHash:'d'.repeat(64),sourceRevision:'e'.repeat(40)},candidate={trialId:'f'.repeat(64),programHash,sourceRevision,...window,budget:1};
  return {resolved:resolveSuccessorPreparation({scope,original,candidate,namespace}),env:{...env,AFW_DOSSIER_EVENTS_NODE:namespace,AFW_DOSSIER_EVENTS_ENABLED:'false',AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify({grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:context.resource,...window}),AFW_OAUTH_ISSUER:'https://delegated-canary.agentfriendlyweb.dev',AFW_OAUTH_RESOURCE:context.resource,AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'p',AFW_DOSSIER_EVENTS_PROJECTION_SECRET:'z'.repeat(32),AFW_DOSSIER_EVENTS_CUSTODY_KEY:Buffer.alloc(32,7).toString('base64'),AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify({scope,original,candidate,publication:{artifactKey:'6'.repeat(64),workerHash:'7'.repeat(64),activationKey:'8'.repeat(64)}}),AFW_DOSSIER_RETIREMENT_POLICY:'original-policy-preserved',AFW_DOSSIER_SUCCESSOR_RETIREMENT_READ_ENABLED:'true'}};
 }
 export class Qa extends AfwOwnEventNode{
  constructor(ctx,env){super(ctx,settings(env).env);}
  async seedClosed(){
   let manifest,running=false;
   const runtime={launch:async({key,...m})=>{if(key.length!==32)throw Error('key');manifest=m;running=true;await this.env.DB.prepare('UPDATE fixture_process SET launches=launches+1').run();},observe:async()=>({...manifest,running}),close:async()=>{running=false;}};
   const custody=createNodeProcessCustody({enabled:true,db:this.env.DB,context,projectId:'p',projectionSecret:'z'.repeat(32),storage:this.ctx.storage,custodyKey:Buffer.alloc(32,7),containerId:this.ctx.id.toString(),programHash,sourceRevision,image:'cloudflare/debian-trixie',window,runtime,now:Date.now});
   const first=await custody.start();await custody.close();return first.processGeneration;
  }
  async records(){return (await this.ctx.storage.list()).size;}
 }
 export default{async fetch(request,env){
  const path=new URL(request.url).pathname,node=env.NODE.get(env.NODE.idFromName('afw-own-event-first-successor-v1'));
  if(path==='/seed'){
   await env.DB.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);CREATE TABLE fixture_process(launches INTEGER);');
   for(const sql of ${JSON.stringify(schemas)})await env.DB.prepare(sql).run();
   await env.DB.prepare('INSERT INTO fixture_process VALUES(0)').run();
   await env.DB.prepare('INSERT INTO site_projects VALUES(?,?,?)').bind('p','owner',1).run();
   await env.DB.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').bind('g','owner','client','p',context.resource,JSON.stringify(context.scopes),new Date(expiresAt).toISOString(),'').run();
   await env.DB.prepare("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").bind('g','p','owner','client',context.resource,1,'grant','afw.dossier-monitoring.v1','11111111-1111-4111-8111-111111111111',startAt,expiresAt).run();
   const p=settings(env).resolved,c=p.candidate,o=p.original,n=Date.now();
   await env.DB.prepare('INSERT INTO dossier_successor_reservations VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('afw.own-successor.v1',c.trialId,o.containerId,'5'.repeat(64),o.programHash,o.sourceRevision,o.applicationId,c.containerId,c.programHash,c.sourceRevision,c.scopeHash,c.startAt,c.expiresAt,1,n-100,n-100,n,n,'prepared').run();
   return Response.json({generation:await node.seedClosed()});
  }
  if(path==='/withdraw'){
   const t=Date.now();await env.DB.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id='g'").bind(new Date(t).toISOString()).run();
   await env.DB.prepare("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").bind('g','p','owner','client',context.resource,1,'revoke','afw.dossier-monitoring.v1','22222222-2222-4222-8222-222222222222',t,t).run();return Response.json({});
  }
  if(path==='/state')return Response.json({launches:(await env.DB.prepare('SELECT launches FROM fixture_process').first()).launches,records:await node.records(),closures:(await env.DB.prepare('SELECT COUNT(*) n FROM dossier_node_process_closures').first()).n,permissions:(await env.DB.prepare('SELECT COUNT(*) n FROM dossier_monitoring_consent_events').first()).n,reservations:(await env.DB.prepare('SELECT COUNT(*) n FROM dossier_successor_reservations').first()).n});
  try{const r=path==='/extra'?await node.observeSuccessorRetired('forbidden-selector'):await node.observeSuccessorRetired();return Response.json(snapshotRetiredRpcObservation(r));}catch{return Response.json({code:'unavailable'},{status:409});}
 }};
 `;
 const bundle=await build({stdin:{contents,resolveDir:process.cwd(),sourcefile:'successor-retirement-native.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],define:{'globalThis.__AFW_NODE_PROGRAM__':JSON.stringify('CI-only custody program'),'globalThis.__AFW_NODE_SOURCE_REVISION__':JSON.stringify('c'.repeat(40))}});
 let outbound=0;const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundle.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{DB:'native-successor-readback'},durableObjects:{NODE:{className:'Qa',useSQLite:true}},outboundService:()=>{outbound++;throw Error('no network capability');}}));
 const call=async(path,status=200)=>{const r=await runtime.dispatchFetch('https://synthetic.invalid'+path);assert.equal(r.status,status,await r.clone().text());return r.json();};
 try{
  const first=await call('/seed');await call('/read',409);await call('/withdraw');const before=await call('/state');
  const result=await call('/read');assert.equal(result.processGeneration,first.generation);assert.equal(result.physicalStopVerified,false);assert.equal(result.mayStartSuccessor,false);
  await call('/extra',409);assert.deepEqual(await call('/state'),before);assert.deepEqual(before,{launches:1,records:1,closures:1,permissions:2,reservations:1});assert.equal(outbound,0);
 }finally{await runtime.dispose();}
});
