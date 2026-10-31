import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {namedHistoryFixture,seedNamedHistoryFixture} from './fixtures/named-known-cancellation.mjs';
import {RELEASE_TARGET} from '../lib/mcp-release-operator-policy.mjs';
const source=`import {createPrivateQaOriginalPinsReader} from './lib/mcp-qa-original-pins.mjs';
import {createPrivateQaArmEligibility} from './lib/mcp-qa-arm-eligibility.mjs';
export default{async fetch(request,env){
 const p=JSON.parse(env.PINS),window=p.window,original=p.original,db=env.DB,now=Date.now;
 try{const pins=await createPrivateQaOriginalPinsReader({db,original,window,authorize:async()=>true,now,timeoutMs:5000}).read();
 const eligible=await createPrivateQaArmEligibility({db,original:pins,window:{grantId:p.grantId,...window},cancellationHistory:p.cancellationHistory,authorize:async()=>true,now,timeoutMs:5000}).check();
 return Response.json({status:'observed',pins,eligible});
 }catch{return Response.json({status:'blocked'});}
}};`;
async function fixture(mode='valid'){
 const at=Date.now()-1000,e={grantId:'fixture-current',projectId:'fixture-project',subject:'fixture-user',clientId:'fixture-client',resource:'https://fixture.invalid/mcp',expiresAt:at+60000};
 const history=namedHistoryFixture({policy:{startAt:at,observation:{configuration:{bindings:[{name:'AFW_DOSSIER_EVENTS_POLICY',text:JSON.stringify(e)}]}}}});
 const retired={containerId:'a'.repeat(64),processGeneration:'b'.repeat(64),programHash:'c'.repeat(64),sourceRevision:'d'.repeat(40),image:'cloudflare/debian-trixie',createdAt:at-20000,expiresAt:at-10000,closedAt:at-5000};
 if(mode==='process-active')retired.expiresAt=at+30000;
 if(mode==='future-close')retired.closedAt=at+30000;
 if(mode==='close-before-creation')retired.closedAt=retired.createdAt-1;
 if(mode==='malformed-generation')retired.processGeneration='not-a-generation';
 const pins={original:{containerId:retired.containerId,applicationId:RELEASE_TARGET.namespaceId,programHash:retired.programHash,sourceRevision:retired.sourceRevision},window:{startAt:at,expiresAt:e.expiresAt},grantId:e.grantId,cancellationHistory:history.providedRaw};
 if(mode==='wrong-program')pins.original.programHash='e'.repeat(64);
 if(mode==='wrong-source')pins.original.sourceRevision='f'.repeat(40);
 const built=await build({stdin:{contents:source,resolveDir:process.cwd(),sourcefile:'qa-original-pins-native.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 let outbound=0;const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{PINS:JSON.stringify(pins)},d1Databases:{DB:'qa-original-pins'},outboundService:()=>{outbound++;throw Error('no outbound');}}));
 const db=await mf.getD1Database('DB'),setup={};
 if(mode==='consent-active')setup.consentExpiresAt=at+30000;
 if(mode==='missing-close')setup.originalClosure=null;
 if(mode==='null-generation')setup.originalClosure={...retired,processGeneration:null};
 if(mode.startsWith('join-')){const key=mode.slice(5);setup.originalClosure={...retired,[key]:key==='grantId'?e.grantId:key==='image'?'different/image':key==='sourceRevision'?'f'.repeat(40):'e'.repeat(64)};}
 await seedNamedHistoryFixture(db,history,retired,setup);
 if(mode==='second-admission')await db.prepare('INSERT INTO dossier_node_process_admissions(grant_id,project_id,user_id,client_id,resource,consent_sequence,consent_issued_at,consent_expires_at,container_id,process_generation,program_hash,source_revision,image,created_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(e.grantId,e.projectId,e.subject,e.clientId,e.resource,4,at,e.expiresAt,'e'.repeat(64),'f'.repeat(64),'0'.repeat(64),'1'.repeat(40),retired.image,at,e.expiresAt).run();
 const snapshot=async()=>Object.fromEntries(await Promise.all(['delegated_access_grants','dossier_monitoring_consent_events','dossier_node_process_admissions','dossier_node_process_closures','dossier_successor_reservations'].map(async t=>[t,(await db.prepare('SELECT * FROM '+t+' ORDER BY 1').all()).results])));
 const read=async()=>{const r=await mf.dispatchFetch('https://fixture.invalid/read');assert.equal(r.status,200);return r.json();};
 return {mf,db,retired,snapshot,read,get outbound(){return outbound;}};
}
test('actual primary D1 metadata supplies original pins to zero-reservation ARM eligibility without repairing history',async()=>{
 const f=await fixture();try{
 const before=await f.snapshot(),r=await f.read();
 assert.equal(r.status,'observed');assert.equal(r.eligible,true);const o=f.retired;
 assert.deepEqual(r.pins,{containerId:o.containerId,processGeneration:o.processGeneration,programHash:o.programHash,sourceRevision:o.sourceRevision,closedAt:o.closedAt});
 assert.equal(before.dossier_node_process_closures.length,2);assert.deepEqual(await f.snapshot(),before);assert.equal(f.outbound,0);
 }finally{await f.mf.dispose();}
});
for(const mode of ['process-active','future-close','close-before-creation','malformed-generation','wrong-program','wrong-source','second-admission','consent-active','missing-close','null-generation','join-grantId','join-containerId','join-processGeneration','join-programHash','join-sourceRevision','join-image'])test('native original derivation denies '+mode+' with all history retained',async()=>{
 const f=await fixture(mode);try{const before=await f.snapshot();assert.deepEqual(await f.read(),{status:'blocked'});assert.deepEqual(await f.snapshot(),before);assert.equal(f.outbound,0);}finally{await f.mf.dispose();}
});
