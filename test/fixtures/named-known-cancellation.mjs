import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createPrivateQaArmEligibility} from '../../lib/mcp-qa-arm-eligibility.mjs';
export function namedHistoryFixture(bundle,variant='valid'){
 const bindings=bundle.policy.observation.configuration.bindings,text=name=>bindings.find(b=>b.name===name).text,events=JSON.parse(text('AFW_DOSSIER_EVENTS_POLICY')),at=bundle.policy.startAt;
 const cancelled={grantId:'fixture-cancelled',containerId:'9'.repeat(64),programHash:'a'.repeat(64),sourceRevision:'b'.repeat(40),image:'cloudflare/debian-trixie',closedAt:at-2000,revokedAt:new Date(at-2050).toISOString(),monitorSequence:3,monitorRevision:1,monitorRevokedAt:at-2100};
 const history={purpose:'afw.successor-known-cancellations.v1',currentGrant:{grantId:events.grantId,consentSequence:4,consentRevision:1,issuedAt:at,expiresAt:events.expiresAt},cancellations:[cancelled]};
 assert.ok(!['original','fixture-cancelled','fixture-alternative'].includes(events.grantId));
 const provided=structuredClone(history);if(variant==='missing-row')provided.cancellations=[];if(variant==='pin-mismatch')provided.cancellations[0].programHash='0'.repeat(64);if(variant==='alternative-grant')provided.currentGrant={...provided.currentGrant,grantId:'fixture-alternative',consentSequence:5};
 return{events,history,providedRaw:JSON.stringify(provided),variant};
}
export async function seedNamedHistoryFixture(db,fixture,retired,setup={}){
 // Fault injection for isolated native fixtures; defaults preserve every historical test.
 const originalClosure=setup.originalClosure===undefined?retired:setup.originalClosure,consentExpiresAt=setup.consentExpiresAt??retired.expiresAt;
 const {events:e,history:h,variant}=fixture,at=h.currentGrant.issuedAt,iso=n=>new Date(n).toISOString();
 await db.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT NOT NULL);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT NOT NULL,client_id TEXT NOT NULL,project_id TEXT NOT NULL,resource TEXT NOT NULL,scopes_json TEXT NOT NULL,created_at TEXT NOT NULL,expires_at TEXT NOT NULL,revoked_at TEXT NOT NULL DEFAULT "",exchanged_at TEXT NOT NULL DEFAULT "");');
 for(const name of ['node-process','monitoring-consent','successor-reservation'])for(const statement of readFileSync('db/dossier-'+name+'.sql','utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g))await db.prepare(statement[0]).run();
 await db.prepare('INSERT INTO site_projects VALUES(?,?)').bind(e.projectId,e.subject).run();
 const grant=async(id,revokedAt,expiresAt,exchange)=>db.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?,?,?)').bind(id,e.subject,e.clientId,e.projectId,e.resource,'["afw:project:read"]',iso(at-20000),iso(expiresAt),revokedAt,iso(exchange)).run();
 await grant('original',iso(retired.closedAt-100),retired.expiresAt,at-19000);await grant(h.cancellations[0].grantId,h.cancellations[0].revokedAt,e.expiresAt,at-11000);if(!setup.omitCurrent)await grant(e.grantId,['revoked-current','alternative-grant'].includes(variant)?iso(at+1):'',e.expiresAt,at-1);
 if(variant==='alternative-grant')await grant('fixture-alternative','',e.expiresAt,at-1);
 await db.prepare('INSERT INTO dossier_node_process_admissions(grant_id,project_id,user_id,client_id,resource,consent_sequence,consent_issued_at,consent_expires_at,container_id,process_generation,program_hash,source_revision,image,created_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('original',e.projectId,e.subject,e.clientId,e.resource,1,retired.createdAt,consentExpiresAt,retired.containerId,retired.processGeneration,retired.programHash,retired.sourceRevision,retired.image,retired.createdAt,retired.expiresAt).run();
 if(originalClosure!==null)await db.prepare('INSERT INTO dossier_node_process_closures(grant_id,process_generation,container_id,program_hash,source_revision,image,closed_at) VALUES(?,?,?,?,?,?,?)').bind(originalClosure.grantId??'original',originalClosure.processGeneration,originalClosure.containerId,originalClosure.programHash,originalClosure.sourceRevision,originalClosure.image,originalClosure.closedAt).run();
 // Only the custom generic-runtime test opts into its legacy one-closure data.
 // The production mounted builder never emits this fixture marker.
 const z=h.cancellations[0];if(variant!=='generic-without-history')await db.prepare('INSERT INTO dossier_node_process_closures(grant_id,process_generation,container_id,program_hash,source_revision,image,closed_at) VALUES(?,?,?,?,?,?,?)').bind(z.grantId,null,z.containerId,z.programHash,z.sourceRevision,z.image,z.closedAt).run();
 const consent=async(sequence,grantId,action,issuedAt,expiresAt)=>db.prepare('INSERT INTO dossier_monitoring_consent_events VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(sequence,grantId,e.projectId,e.subject,e.clientId,e.resource,1,action,'afw.dossier-monitoring.v1','fixture-'+sequence,issuedAt,expiresAt).run();
 await consent(1,'original','grant',retired.createdAt,retired.expiresAt);await consent(2,z.grantId,'grant',at-5000,e.expiresAt);await consent(3,z.grantId,'revoke',z.monitorRevokedAt,z.monitorRevokedAt);if(!setup.omitCurrent)await consent(4,e.grantId,'grant',at,e.expiresAt);if(variant==='alternative-grant')await consent(5,'fixture-alternative','grant',at,e.expiresAt);
 return variant==='alternative-grant'?createPrivateQaArmEligibility({db,original:{containerId:retired.containerId,processGeneration:retired.processGeneration,programHash:retired.programHash,sourceRevision:retired.sourceRevision,closedAt:retired.closedAt},window:{grantId:'fixture-alternative',startAt:at,expiresAt:e.expiresAt},cancellationHistory:fixture.providedRaw,authorize:async()=>true,now:Date.now,timeoutMs:5000}).check():null;
}
