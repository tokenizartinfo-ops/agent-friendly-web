import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFileSync} from 'node:fs';
import {generateKeyPair,exportSPKI,SignJWT} from 'jose';
import {projectAssistanceSignal} from '../lib/assistance-supervision-contract.mjs';
import {signedAssistanceGoalRequest} from '../lib/assistance-goal-service-identity.mjs';
test('native workerd and separate D1 bindings read minimal goals and reject withdrawn permission',async()=>{
 const time=Date.now(),signingSecret='synthetic-native-goal-read-secret-minimum-32',signalSecret='synthetic-native-goal-signal-secret-minimum-32';
 const {privateKey,publicKey}=await generateKeyPair('RS256'),pem=await exportSPKI(publicKey);
 const sourceId='help-'+'a'.repeat(64),createdAt=new Date(time-1000).toISOString(),payload={contract:'afw.assistance-request.v1',requestId:crypto.randomUUID(),expectedRevision:3,topic:'orientation'};
 const signal=await projectAssistanceSignal({id:sourceId,projectId:'own',type:'assistance_requested',createdAt,payload},signalSecret),runId=crypto.randomUUID();
 const config={enabled:true,origin:'https://goal-context-canary.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'goal-only',clientId:'goal-only.access',purpose:'afw.goal-guidance.read.v1',excludedClientIds:['operations.access'],excludedAudiences:['operations-only'],expiresAt:new Date(time+60000).toISOString(),enrollment:{projectId:'own',userId:'owner',since:new Date(time-2000).toISOString()}};
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`import {createAssistanceGoalHttp} from './lib/assistance-goal-http.mjs';import {importSPKI} from 'jose';const key=await importSPKI(${JSON.stringify(pem)},'RS256');export default {fetch(r,b){return createAssistanceGoalHttp({sourceDb:b.SOURCE,operationsDb:b.DB,getSettings:()=>(${JSON.stringify(config)}),signingSecret:${JSON.stringify(signingSecret)},signalSecret:${JSON.stringify(signalSecret)},keySet:key,limiter:{limit:async()=>({success:true})},now:()=>${time}})(r);}};`},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,d1Databases:{DB:'goal-operational-native',SOURCE:'goal-private-native'}}));
 try{
 const source=await runtime.getD1Database('SOURCE'),db=await runtime.getD1Database('DB');
 const apply=async(target,text)=>{for(const sql of text.replace(/--[^\n]*/g,'').split(';').map(x=>x.trim()).filter(Boolean))await target.prepare(sql).run();};
 await apply(source,'CREATE TABLE site_projects(id TEXT,user_id TEXT,revision INTEGER,site_type TEXT,goals_json TEXT,notes TEXT);CREATE TABLE project_events(id TEXT,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);CREATE TABLE assistance_delivery_receipts(project_ref TEXT,source_event_id TEXT,event_id TEXT);'+readFileSync('db/assistance-goal-consent.sql','utf8'));
 for(const name of ['assistance-supervision','assistance-supervision-runs'])await apply(db,readFileSync('worker/operations/'+name+'.sql','utf8'));
 await source.prepare('INSERT INTO site_projects VALUES(?,?,?,?,?,?)').bind('own','owner',3,'commerce','["discovery"]','PRIVATE NARRATIVE').run();
 await source.prepare('INSERT INTO project_events VALUES(?,?,?,?,?,?)').bind(sourceId,'own','owner','assistance_requested',JSON.stringify(payload),createdAt).run();
 await source.prepare('INSERT INTO assistance_delivery_receipts VALUES(?,?,?)').bind(signal.projectRef,sourceId,signal.eventId).run();
 const consent='INSERT INTO assistance_goal_consent_events(project_id,user_id,source_event_id,revision,action,consent_version,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?)';
 await source.prepare(consent).bind('own','owner',sourceId,3,'grant','afw.assistance-goals-consent.v1',crypto.randomUUID(),time-1000,time+60000).run();
 await db.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').bind(signal.eventId,signal.projectRef,3,'assistance_requested','orientation',createdAt,time-900).run();
 await db.prepare('INSERT INTO assistance_supervision_runs VALUES(?,?,?,?,?,?,?)').bind(runId,crypto.randomUUID(),signal.eventId,time-500,time+30000,null,null).run();
 const call=async()=>{const request=await signedAssistanceGoalRequest({eventId:signal.eventId,projectRef:signal.projectRef,runId,revision:3},signingSecret,time);request.headers.set('Cf-Access-Jwt-Assertion',await new SignJWT({type:'app',common_name:config.clientId}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+config.teamDomain).setAudience(config.audience).setSubject('').setExpirationTime(Math.floor(time/1000)+300).sign(privateKey));return runtime.dispatchFetch(request.url,{method:request.method,headers:request.headers,body:await request.text()});};
 const response=await call();assert.equal(response.status,200);const body=await response.json();assert.deepEqual(body.context.declarations,{siteType:'commerce',goals:['discovery']});assert.doesNotMatch(JSON.stringify(body),/PRIVATE|"owner"|"own"|sequence/);
 await source.prepare(consent).bind('own','owner',sourceId,3,'revoke','afw.assistance-goals-consent.v1',crypto.randomUUID(),time,time).run();
 const denied=await call();assert.equal(denied.status,403);assert.equal((await denied.json()).context,undefined);
 assert.equal((await source.prepare('SELECT count(*) n FROM assistance_goal_consent_events').first()).n,2);assert.equal((await source.prepare('SELECT notes FROM site_projects').first()).notes,'PRIVATE NARRATIVE');
 }finally{await runtime.dispose();}
});


