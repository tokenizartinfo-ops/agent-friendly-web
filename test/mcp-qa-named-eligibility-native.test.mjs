import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {namedHistoryFixture,seedNamedHistoryFixture} from './fixtures/named-known-cancellation.mjs';
const source=`import {createPrivateQaNamedEligibility} from './lib/mcp-qa-named-eligibility.mjs';
import {createPrivateQaArmEligibility} from './lib/mcp-qa-arm-eligibility.mjs';
import {createSuccessorReservation} from './lib/mcp-successor-reservation.mjs';
export default{async fetch(request,env){const p=JSON.parse(env.PINS),path=new URL(request.url).pathname;
 const now=Date.now,db=env.DB;
 if(path.startsWith('/check-field/')){const k=path.split('/').pop();if(k==='applicationId')p.original.applicationId='5'.repeat(32);else if(k==='startAt'){p.candidate.startAt++;p.window.startAt++;}else if(k==='expiresAt'){p.candidate.expiresAt--;p.window.expiresAt--;}else if(['trialId','containerId','programHash','scopeHash'].includes(k))p.candidate[k]='6'.repeat(64);else if(k==='sourceRevision')p.candidate.sourceRevision='7'.repeat(40);else throw Error('unknown fixture pin');}
 if(path==='/arm'){const{applicationId,...original}=p.original;return Response.json(await createPrivateQaArmEligibility({db,original,window:p.window,cancellationHistory:p.cancellationHistory,authorize:async()=>true,now,timeoutMs:5000}).check());}
 if(path==='/reserve'||path==='/reserve-foreign'){
  const{processGeneration,closedAt,...original}=p.original,candidate={...p.candidate,...(path==='/reserve-foreign'?{scopeHash:'0'.repeat(64)}:{})};
  const r=await createSuccessorReservation({db,original,candidate,cancellationHistory:p.cancellationHistory,authorize:async()=>true,now,timeoutMs:5000,readRetirement:async()=>({purpose:'afw.retirement-evidence.v1',...original,processGeneration,closedAt,stoppedAt:closedAt+1,observedAt:Date.now(),physicalStopVerified:true,mayStartSuccessor:false})}).reserve();return Response.json(r);
 }
 return Response.json(await createPrivateQaNamedEligibility({db,...p,now,timeoutMs:5000}).check(request.signal));}};
`;
const original={containerId:'a'.repeat(64),processGeneration:'b'.repeat(64),programHash:'c'.repeat(64),sourceRevision:'d'.repeat(40),applicationId:'4'.repeat(32)};
async function fixture(mode='valid',old=false){
 const at=Date.now()-(old?45000:1000),events={grantId:'fixture-current',projectId:'fixture-project',subject:'fixture-user',clientId:'fixture-client',resource:'https://fixture.invalid/mcp',expiresAt:at+(old?120000:60000)};
 const history=namedHistoryFixture({policy:{startAt:at,observation:{configuration:{bindings:[{name:'AFW_DOSSIER_EVENTS_POLICY',text:JSON.stringify(events)}]}}}},mode);
 const retired={...original,image:'cloudflare/debian-trixie',createdAt:at-20000,expiresAt:at-10000,closedAt:at-5000};
 const pins={original:{...original,closedAt:retired.closedAt},candidate:{trialId:'f'.repeat(64),containerId:'e'.repeat(64),programHash:'1'.repeat(64),sourceRevision:'2'.repeat(40),scopeHash:'3'.repeat(64),startAt:at,expiresAt:events.expiresAt,budget:1},window:{grantId:events.grantId,startAt:at,expiresAt:events.expiresAt},cancellationHistory:history.providedRaw};
 const built=await build({stdin:{contents:source,resolveDir:process.cwd(),sourcefile:'qa-named-eligibility-native.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 let outbound=0;const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{PINS:JSON.stringify(pins)},d1Databases:{DB:'qa-named-primary-eligibility'},outboundService:()=>{outbound++;throw Error('no outbound');}}));
 const db=await mf.getD1Database('DB');await seedNamedHistoryFixture(db,history,retired);
 const call=async path=>{const r=await mf.dispatchFetch('https://fixture.invalid'+path);assert.equal(r.status,200);return r.json();};
 const snapshot=async()=>Object.fromEntries(await Promise.all(['delegated_access_grants','dossier_monitoring_consent_events','dossier_node_process_admissions','dossier_node_process_closures','dossier_successor_reservations'].map(async t=>[t,(await db.prepare('SELECT * FROM '+t+' ORDER BY 1').all()).results])));
 return{mf,db,pins,history,retired,call,snapshot,get outbound(){return outbound;}};
}
test('native named eligibility permits zero or exact own reservation while ARM remains zero-only',async()=>{
 const f=await fixture();try{
 const before=await f.snapshot();assert.equal(await f.call('/check'),true);assert.equal(await f.call('/arm'),true);assert.deepEqual(await f.snapshot(),before);
 assert.equal((await f.call('/reserve')).state,'prepared');const prepared=await f.snapshot();assert.equal(prepared.dossier_successor_reservations.length,1);
 assert.equal(await f.call('/check'),true);assert.equal(await f.call('/arm'),false);assert.deepEqual(await f.snapshot(),prepared);assert.equal(f.outbound,0);
 }finally{await f.mf.dispose();}
});
test('a foreign prepared reservation cannot become the current generation budget',async()=>{
 const f=await fixture();try{assert.equal((await f.call('/reserve-foreign')).state,'prepared');const before=await f.snapshot();assert.equal(await f.call('/check'),false);assert.equal(await f.call('/arm'),false);assert.deepEqual(await f.snapshot(),before);}finally{await f.mf.dispose();}
});
for(const variant of ['missing-row','pin-mismatch','revoked-current'])test('actual primary '+variant+' stays closed without repairing history',async()=>{
 const f=await fixture(variant);try{const before=await f.snapshot();assert.equal(await f.call('/check'),false);assert.deepEqual(await f.snapshot(),before);}finally{await f.mf.dispose();}
});
test('latest monitoring revocation stops named reading without deleting the retained reservation',async()=>{
 const f=await fixture();try{await f.call('/reserve');const p=f.pins,e=f.history.events,at=Date.now();await f.db.prepare('INSERT INTO dossier_monitoring_consent_events VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(5,e.grantId,e.projectId,e.subject,e.clientId,e.resource,1,'revoke','afw.dossier-monitoring.v1','fixture-revoke',at,at).run();const before=await f.snapshot();assert.equal(await f.call('/check'),false);assert.equal(before.dossier_successor_reservations.length,1);assert.deepEqual(await f.snapshot(),before);assert.equal(p.candidate.budget,1);}finally{await f.mf.dispose();}
});

test('each stored candidate or application pin remains exact after own reservation',async()=>{
 const f=await fixture();try{await f.call('/reserve');const before=await f.snapshot();for(const field of ['trialId','containerId','programHash','sourceRevision','scopeHash','applicationId','startAt','expiresAt'])assert.equal(await f.call('/check-field/'+field),false,field);assert.deepEqual(await f.snapshot(),before);}finally{await f.mf.dispose();}
});
async function insertOwn(f,extra={}){
 const o=f.pins.original,c=f.pins.candidate,at=Date.now(),row={slot:'afw.own-successor.v1',trial_id:c.trialId,predecessor_container_id:o.containerId,predecessor_generation:o.processGeneration,predecessor_program_hash:o.programHash,predecessor_source_revision:o.sourceRevision,application_id:o.applicationId,container_id:c.containerId,program_hash:c.programHash,source_revision:c.sourceRevision,scope_hash:c.scopeHash,start_at:c.startAt,expires_at:c.expiresAt,budget:1,closed_at:o.closedAt,stopped_at:o.closedAt+1,observed_at:at,reserved_at:at,state:'prepared',...extra};
 const keys=Object.keys(row);await f.db.prepare('INSERT INTO dossier_successor_reservations ('+keys.join(',')+') VALUES('+keys.map(()=>'?').join(',')+')').bind(...keys.map(k=>row[k])).run();
}
test('old acknowledged-shaped rows keep their original reservation freshness rather than requiring a renewed observation',async()=>{
 const f=await fixture('valid',true);try{const at=Date.now();await insertOwn(f,{observed_at:at-40000,reserved_at:at-39999});const before=await f.snapshot();assert.equal(await f.call('/check'),true);assert.equal(await f.call('/arm'),false);assert.deepEqual(await f.snapshot(),before);}finally{await f.mf.dispose();}
});
for(const extra of [{stopped_at:-1},{stopped_at:0.5},{reserved_at:'future'}])test('schema-permitted invalid primary timestamp is rejected '+JSON.stringify(extra),async()=>{
 const f=await fixture();try{await insertOwn(f,extra.reserved_at==='future'?{reserved_at:Date.now()+2000}:extra);const before=await f.snapshot();assert.equal(await f.call('/check'),false);assert.deepEqual(await f.snapshot(),before);}finally{await f.mf.dispose();}
});
