import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {createSuccessorReservation} from '../lib/mcp-successor-reservation.mjs';

const IMAGE='cloudflare/debian-trixie',PURPOSE='afw.successor-known-cancellations.v1';
async function fixture(mode='valid',{cancel=true,offset=0}={}){
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:'export default{fetch(){return new Response(null,{status:404});}}',d1Databases:{DB:'known-cancellation',OTHER:'known-cancellation'}}));
 try{
 const db=await mf.getD1Database('DB'),other=await mf.getD1Database('OTHER'),now=Date.now()+offset,iso=n=>new Date(n).toISOString();
 await db.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT NOT NULL);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT NOT NULL,client_id TEXT NOT NULL,project_id TEXT NOT NULL,resource TEXT NOT NULL,scopes_json TEXT NOT NULL,created_at TEXT NOT NULL,expires_at TEXT NOT NULL,revoked_at TEXT NOT NULL DEFAULT "",exchanged_at TEXT NOT NULL DEFAULT "");');
 await db.prepare('INSERT INTO site_projects VALUES(?,?)').bind('project',mode==='changed-project-owner'?'foreign':'owner').run();
 for(const name of ['node-process','monitoring-consent','successor-reservation']){
  const source=readFileSync('db/dossier-'+name+'.sql','utf8');
  for(const statement of source.matchAll(/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g))await db.prepare(statement[0]).run();
 }
 const original={containerId:'a'.repeat(64),applicationId:'own-app',programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)};
 const candidate={trialId:'d'.repeat(64),containerId:'e'.repeat(64),programHash:'f'.repeat(64),sourceRevision:'1'.repeat(40),scopeHash:'2'.repeat(64),startAt:mode==='future-cancellation'?now+40000:now-500,expiresAt:now+60000,budget:1};
 const evidence={purpose:'afw.retirement-evidence.v1',...original,processGeneration:'3'.repeat(64),closedAt:now-79000,stoppedAt:now-79500,observedAt:now,physicalStopVerified:true,mayStartSuccessor:false};
 const scope={user:'owner',client:'client',project:'project',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'};
 const addGrant=async(id,{user=scope.user,revokedAt='',expiresAt=now+120000,exchangedAt=iso(now-2000),scopes=['afw:project:read']}={})=>db.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?,?,?)').bind(id,user,scope.client,scope.project,scope.resource,JSON.stringify(scopes),iso(now-100000),iso(expiresAt),revokedAt,exchangedAt).run();
 await addGrant('original',{revokedAt:iso(now-79000),expiresAt:now-80000,exchangedAt:iso(now-85000)});
 await addGrant('cancelled',{exchangedAt:iso(now-35000),user:mode==='foreign-cancellation'?'foreign':scope.user,revokedAt:mode==='unrevoked-cancellation'?'':iso(mode==='future-cancellation'?now+29990:now-30010)});
 await addGrant('current',{user:mode==='foreign-current'?'foreign':scope.user,revokedAt:mode==='revoked-current'?iso(now-100):'',expiresAt:mode==='short-current'?now+5000:now+120000,exchangedAt:mode==='unexchanged-current'?'':mode==='invalid-exchange'?'junk':iso(mode==='future-exchange'?now+1000:mode==='exchange-before-created'?now-110000:now-2000),scopes:mode==='extra-scope'?['afw:project:read','afw:evidence:read']:mode==='empty-scope'?[]:mode==='duplicate-scope'?['afw:project:read','afw:project:read']:mode==='object-scope'?{read:'afw:project:read'}:['afw:project:read']});
 await db.prepare('INSERT INTO dossier_node_process_admissions(grant_id,project_id,user_id,client_id,resource,consent_sequence,consent_issued_at,consent_expires_at,container_id,process_generation,program_hash,source_revision,image,created_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('original',scope.project,scope.user,scope.client,scope.resource,1,now-90000,mode==='original-consent-live'?now+10000:now-80000,original.containerId,evidence.processGeneration,original.programHash,original.sourceRevision,IMAGE,now-90000,mode==='original-admission-live'?now+10000:now-80000).run();
 await db.prepare('INSERT INTO dossier_node_process_closures(grant_id,process_generation,container_id,program_hash,source_revision,image,closed_at) VALUES(?,?,?,?,?,?,?)').bind('original',evidence.processGeneration,original.containerId,original.programHash,original.sourceRevision,IMAGE,evidence.closedAt).run();
 const addConsent=async(grant,sequence,action,issuedAt,expiresAt)=>db.prepare('INSERT INTO dossier_monitoring_consent_events VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(sequence,grant,scope.project,(mode==='foreign-current-monitor'&&grant==='current'||mode==='foreign-past-monitor'&&grant==='cancelled'&&sequence===3)?'foreign':scope.user,scope.client,scope.resource,1,action,'afw.dossier-monitoring.v1','request-'+sequence,issuedAt,expiresAt).run();
 await addConsent('original',1,'grant',now-90000,now-80000);
 if(mode!=='missing-past-grant')await addConsent('cancelled',2,'grant',now-40000,now+10000);
 await addConsent('cancelled',3,mode==='monitoring-not-revoked'?'grant':'revoke',mode==='future-cancellation'?now+29980:now-30020,mode==='monitoring-not-revoked'?now+10000:mode==='future-cancellation'?now+29980:now-30020);
 await addConsent('current',4,'grant',mode==='future-current-monitor'?now+1000:now-1000,mode==='short-current-monitor'?now+5000:now+120000);
 if(mode==='revoked-current-monitor')await addConsent('current',5,'revoke',now-100,now-100);
 const closed={grantId:'cancelled',containerId:'4'.repeat(64),programHash:'5'.repeat(64),sourceRevision:'6'.repeat(40),image:IMAGE,closedAt:mode==='future-cancellation'?now+30000:now-30000,revokedAt:iso(mode==='future-cancellation'?now+29990:now-30010),monitorSequence:3,monitorRevision:1,monitorRevokedAt:mode==='future-cancellation'?now+29980:now-30020};
 const addClosure=async(record=closed,generation=null)=>{await db.prepare('INSERT OR IGNORE INTO delegated_access_grants SELECT ?,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants WHERE id=?').bind(record.grantId,'cancelled').run();return db.prepare('INSERT INTO dossier_node_process_closures(grant_id,process_generation,container_id,program_hash,source_revision,image,closed_at) VALUES(?,?,?,?,?,?,?)').bind(record.grantId,generation,record.containerId,record.programHash,record.sourceRevision,record.image,record.closedAt).run();};
 if(cancel)await addClosure({...closed,...(mode==='changed-pin'?{programHash:'7'.repeat(64)}:{})},mode==='extra-generation'?'8'.repeat(64):null);
 if(mode==='unknown-cancellation')await addClosure({...closed,grantId:'unknown'});
 const history={purpose:PURPOSE,currentGrant:{grantId:'current',consentSequence:4,consentRevision:1,issuedAt:mode==='future-current-monitor'?now+1000:now-1000,expiresAt:mode==='short-current-monitor'?now+5000:now+120000},cancellations:cancel?[closed]:[]};
 const snapshot=async()=>Object.fromEntries(await Promise.all(['delegated_access_grants','dossier_node_process_admissions','dossier_node_process_closures','dossier_monitoring_consent_events'].map(async table=>[table,(await db.prepare('SELECT * FROM '+table+' ORDER BY 1').all()).results])));
 const count=async()=>Number((await db.prepare('SELECT COUNT(*) AS n FROM dossier_successor_reservations').first()).n);
 const diagnostics={};
 const audited={prepare:db.prepare.bind(db),withSession(...args){const primary=db.withSession(...args);return{prepare(sql){const statement=primary.prepare(sql);return{bind(...values){const bound=statement.bind(...values);return{async run(){try{const result=await bound.run();diagnostics.last={success:result.success,changes:result.meta?.changes};return result;}catch(error){diagnostics.last={sqlError:error.message};throw error;}}};}};}};}};
 const make=(options={})=>createSuccessorReservation({db:audited,original,candidate,readRetirement:async()=>evidence,authorize:async()=>true,cancellationHistory:JSON.stringify(history),...options});
 return{mf,db,other,original,candidate,evidence,history,snapshot,count,make,addClosure,diagnostics};
 }catch(error){
  await mf.dispose();
  throw error;
 }
}
test('V2 exact known cancellation reserves once and preserves every historical row',async()=>{
 const f=await fixture();try{
  const before=await f.snapshot();
  let result;try{result=await f.make().reserve();}catch{assert.fail(JSON.stringify(f.diagnostics));}assert.equal(result.state,'prepared');assert.equal(result.mayBoot,false);assert.equal(await f.count(),1);assert.deepEqual(await f.snapshot(),before);
  await assert.rejects(f.db.prepare('DELETE FROM dossier_successor_reservations').run());
  await assert.rejects(f.db.prepare('UPDATE dossier_node_process_closures SET closed_at=0').run());
  await assert.rejects(async()=>f.make().reserve());assert.deepEqual(await f.snapshot(),before);
 }finally{await f.mf.dispose();}
});
test('legacy still blocks known NULL history and works unchanged with one closure',async()=>{
 for(const cancel of [true,false]){const f=await fixture('valid',{cancel});try{
  const run=()=>f.make({cancellationHistory:undefined,authorize:undefined}).reserve();
  if(cancel)await assert.rejects(run());else assert.equal((await run()).mayBoot,false);
  assert.equal(await f.count(),cancel?0:1);
 }finally{await f.mf.dispose();}}
});
for(const mode of ['unknown-cancellation','changed-pin','extra-generation','unrevoked-cancellation','foreign-cancellation','monitoring-not-revoked','missing-past-grant','foreign-current','revoked-current','short-current','unexchanged-current','extra-scope','revoked-current-monitor','invalid-exchange','future-exchange','exchange-before-created','empty-scope','duplicate-scope','object-scope','foreign-current-monitor','foreign-past-monitor','changed-project-owner','future-current-monitor','short-current-monitor','future-cancellation']){
 test('V2 denies '+mode+' without erasing or reserving',async()=>{const f=await fixture(mode);try{const before=await f.snapshot();await assert.rejects(async()=>f.make().reserve());assert.equal(await f.count(),0);assert.deepEqual(await f.snapshot(),before);}finally{await f.mf.dispose();}});
}
test('known-set pins and primary current consent must match exactly',async()=>{
 const changes=[
  h=>h.cancellations.splice(0),h=>h.cancellations[0].monitorRevision++,
  h=>h.cancellations[0].monitorSequence++,h=>h.cancellations[0].monitorRevokedAt--,
  h=>h.cancellations[0].revokedAt=new Date(Date.parse(h.cancellations[0].revokedAt)-1).toISOString(),
  h=>h.currentGrant.consentSequence++,h=>h.currentGrant.consentRevision++,h=>h.currentGrant.issuedAt--,
  h=>h.currentGrant.expiresAt--
 ];
 for(const change of changes){const f=await fixture();try{const h=structuredClone(f.history);change(h);await assert.rejects(f.make({cancellationHistory:JSON.stringify(h)}).reserve());assert.equal(await f.count(),0);}finally{await f.mf.dispose();}}
});
test('V2 parser/authority rejects malformed data even when legacy history would pass',async()=>{
 const mutations=[h=>{h.extra=true;return JSON.stringify(h);},h=>{h.currentGrant.extra=true;return JSON.stringify(h);},h=>{h.currentGrant.grantId='cancelled';h.cancellations=[{grantId:'cancelled'}];return JSON.stringify(h);},()=>'{',()=> ' '.repeat(16385),()=>({purpose:PURPOSE})];
 for(const mutate of mutations){const f=await fixture('valid',{cancel:false});try{await assert.rejects(async()=>f.make({cancellationHistory:mutate(structuredClone(f.history))}).reserve());assert.equal(await f.count(),0);}finally{await f.mf.dispose();}}
 const f=await fixture('valid',{cancel:false});try{await assert.rejects(async()=>f.make({authorize:undefined}).reserve());assert.equal(await f.count(),0);}finally{await f.mf.dispose();}
});
test('a new cancellation after retirement read blocks the actual SQL write',async()=>{
 const f=await fixture();try{await assert.rejects(f.make({readRetirement:async()=>{await f.addClosure({...f.history.cancellations[0],grantId:'late'});return f.evidence;}}).reserve());assert.equal(await f.count(),0);assert.equal((await f.snapshot()).dossier_node_process_closures.length,3);}finally{await f.mf.dispose();}
});
test('two primary bindings retain one reservation and exact historical rows',async()=>{
 const f=await fixture();try{const before=await f.snapshot(),results=await Promise.allSettled([f.make().reserve(),f.make({db:f.other,candidate:{...f.candidate,trialId:'9'.repeat(64)}}).reserve()]);assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.equal(await f.count(),1);assert.deepEqual(await f.snapshot(),before);}finally{await f.mf.dispose();}
});
test('lost acknowledgement preserves the one reservation and does not permit retry',async()=>{
 const f=await fixture();try{const before=await f.snapshot(),primary=f.db.withSession('first-primary'),wrapped={prepare(){throw Error('must use primary');},withSession(){return{prepare(sql){const statement=primary.prepare(sql);return{bind(...values){const bound=statement.bind(...values);return{async run(){await bound.run();throw Error('synthetic lost acknowledgement');}};}};}};}};
 await assert.rejects(f.make({db:wrapped}).reserve());assert.equal(await f.count(),1);await assert.rejects(async()=>f.make().reserve());assert.deepEqual(await f.snapshot(),before);}finally{await f.mf.dispose();}
});

test('V2 empty exact cancellation set preserves the ordinary positive path',async()=>{
 const f=await fixture('valid',{cancel:false});try{const before=await f.snapshot();assert.equal((await f.make().reserve()).mayBoot,false);assert.equal(await f.count(),1);assert.deepEqual(await f.snapshot(),before);}finally{await f.mf.dispose();}
});
test('strict known-set parser rejects duplicates, limits and temporal drift',async()=>{
 const mutations=[
  h=>{h.cancellations.push({...h.cancellations[0]});},
  h=>{h.cancellations=Array.from({length:9},(_,i)=>({...h.cancellations[0],grantId:'cancelled-'+i}));},
  h=>{h.cancellations[0].revokedAt=h.cancellations[0].revokedAt.replace('.000Z','Z')+' ';},
  h=>{h.cancellations[0].monitorRevokedAt=h.cancellations[0].closedAt+1;},
  h=>{h.cancellations[0].closedAt=h.currentGrant.issuedAt+10000;},
  h=>{h.cancellations[0].grantId=h.currentGrant.grantId;}
 ];
 for(const mutate of mutations){const f=await fixture();try{const h=structuredClone(f.history);mutate(h);await assert.rejects(async()=>f.make({cancellationHistory:JSON.stringify(h)}).reserve());assert.equal(await f.count(),0);}finally{await f.mf.dispose();}}
});
test('UTF-8 byte ceiling is checked before JSON parsing',async()=>{
 const f=await fixture('valid',{cancel:false});try{const raw=JSON.stringify({purpose:'é'.repeat(9000)}),parse=JSON.parse;let calls=0;
  assert.ok(raw.length<16384);assert.ok(new TextEncoder().encode(raw).byteLength>16384);
  JSON.parse=(...args)=>{calls++;return parse(...args);};
  try{assert.throws(()=>f.make({cancellationHistory:raw}));}finally{JSON.parse=parse;}
  assert.equal(calls,0);assert.equal(await f.count(),0);
 }finally{await f.mf.dispose();}
});

test('V2 authorization must return exact true for an otherwise valid history',async()=>{
 const f=await fixture();try{await assert.rejects(f.make({authorize:async()=>({allowed:true})}).reserve());assert.equal(await f.count(),0);}finally{await f.mf.dispose();}
});

test('V2 requires a primary session even for an empty exact set',async()=>{
 const f=await fixture('valid',{cancel:false});try{assert.throws(()=>f.make({db:{prepare:f.db.prepare.bind(f.db)}}));assert.equal(await f.count(),0);}finally{await f.mf.dispose();}
});

const loadArmEligibility=async()=>{const api=await import('../lib/mcp-qa-arm-eligibility.mjs').catch(()=>null);assert.equal(typeof api?.createPrivateQaArmEligibility,'function','read-only primary ARM eligibility interface required');return api.createPrivateQaArmEligibility;};
const armOptions=f=>({db:f.db,original:{containerId:f.original.containerId,processGeneration:f.evidence.processGeneration,programHash:f.original.programHash,sourceRevision:f.original.sourceRevision,closedAt:f.evidence.closedAt},window:{grantId:'current',startAt:f.candidate.startAt,expiresAt:f.candidate.expiresAt},cancellationHistory:JSON.stringify(f.history),authorize:async()=>true,now:Date.now,timeoutMs:5000});
test('primary ARM eligibility reads exact known history twice and denies a consumed global budget',async()=>{
 const create=await loadArmEligibility(),f=await fixture();try{const before=await f.snapshot(),check=create(armOptions(f));assert.equal(await check.check(),true);assert.equal(await check.check(),true);assert.equal(await f.count(),0);assert.deepEqual(await f.snapshot(),before);await f.make().reserve();assert.equal(await check.check(),false);assert.equal(await f.count(),1);assert.deepEqual(await f.snapshot(),before);}finally{await f.mf.dispose();}
});
for(const mode of ['unknown-cancellation','changed-pin','extra-generation','unrevoked-cancellation','foreign-cancellation','monitoring-not-revoked','foreign-current','revoked-current','short-current','unexchanged-current','extra-scope','revoked-current-monitor','invalid-exchange','future-exchange','exchange-before-created','empty-scope','duplicate-scope','object-scope','foreign-current-monitor','foreign-past-monitor','changed-project-owner','future-current-monitor','short-current-monitor','future-cancellation','original-consent-live','original-admission-live'])test('primary ARM eligibility denies '+mode+' without writes',async()=>{
 const create=await loadArmEligibility(),f=await fixture(mode);try{const before=await f.snapshot();if(mode==='short-current-monitor')assert.throws(()=>create(armOptions(f)));else assert.equal(await create(armOptions(f)).check(),false);assert.equal(await f.count(),0);assert.deepEqual(await f.snapshot(),before);}finally{await f.mf.dispose();}
});
test('primary SQL clock rejects an expired window despite an earlier application clock',async()=>{
 const create=await loadArmEligibility(),f=await fixture('valid',{cancel:false,offset:-300000});try{const before=await f.snapshot();assert.equal(await create({...armOptions(f),now:()=>f.evidence.observedAt}).check(),false);assert.equal(await f.count(),0);assert.deepEqual(await f.snapshot(),before);}finally{await f.mf.dispose();}
});
test('primary original pins must match independently of valid grant history',async()=>{
 const create=await loadArmEligibility(),f=await fixture();try{for(const key of ['containerId','processGeneration','programHash','sourceRevision','closedAt']){const o=armOptions(f);o.original[key]=key==='closedAt'?o.original[key]-1:'0'.repeat(key==='sourceRevision'?40:64);assert.equal(await create(o).check(),false);}assert.equal(await f.count(),0);}finally{await f.mf.dispose();}
});
test('a global reservation appearing after metadata pending prevents armed promotion',async()=>{
 const create=await loadArmEligibility(),f=await fixture();try{
 const {createPrivateQaGenerationLedger}=await import('../lib/mcp-qa-generation-ledger.mjs'),{generationFixture}=await import('./fixtures/qa-generation-ledger.mjs');const g=generationFixture();g.setNow(f.evidence.observedAt);g.capsule={...g.capsule,trialId:f.candidate.trialId,grantId:'current',startAt:f.candidate.startAt,expiresAt:f.candidate.expiresAt};const check=create(armOptions(f));let n=0;
 const ledger=createPrivateQaGenerationLedger({...g.options(),checkEligibility:async()=>{if(++n===2)await f.make().reserve();return check.check();}});assert.equal((await ledger.arm()).status,'uncertain');assert.equal((await ledger.status()).status,'pending');assert.equal((await ledger.readArmed()).status,'blocked');assert.equal(await f.count(),1);assert.equal((await ledger.withdraw()).status,'withdrawn');
 }finally{await f.mf.dispose();}
});
