import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {capsulePreparationFixture} from './agent-capsule-preparation.mjs';
import {createCapsulePreparationRequestLease} from '../../lib/capsule-preparation-request-lease.mjs';

export function preparationConsentStoreFixture(factory){
 assert.equal(typeof factory,'function','missing closed preparation consent store');
 const f=capsulePreparationFixture(()=>({}));
 f.sql.exec(readFileSync('db/delegated-preparation-consents.sql','utf8'));
 f.wall=Date.now();f.tick=0;
 f.profile={profileId:'afw.preparation-consent.v1',projectId:'project-a',clientId:'_ci-client',resource:'https://example.invalid/mcp',
  trialStartedAt:f.wall-1000,trialExpiresAt:f.wall+300000};
 f.beginInput={handleHash:'a'.repeat(64),requestHash:'b'.repeat(64),subject:'owner-a',requestedScopes:['afw:project:read','afw:capsule:prepare'],
  transactionStartedAt:f.wall-500,transactionExpiresAt:f.wall+120000,expectedRevision:1};
 f.ref={handleHash:f.beginInput.handleHash,requestHash:f.beginInput.requestHash,subject:'owner-a'};
 f.open=(overrides={})=>{
  const now=()=>f.wall,requestLease=createCapsulePreparationRequestLease({now,monotonic:()=>f.tick});
  const options={enabled:true,profile:{...f.profile},createPrimarySession:()=>f.db.withSession('first-primary'),now,requestLease,...overrides};
  return {options,store:factory(options),requestLease};
 };
 f.row=()=>f.sql.prepare('SELECT * FROM delegated_preparation_consents WHERE handle_hash=?').get(f.ref.handleHash);
 f.newGrants=()=>f.sql.prepare("SELECT * FROM delegated_access_grants WHERE id<>'grant-a'").all();
 f.original=()=>f.sql.prepare("SELECT * FROM delegated_access_grants WHERE id='grant-a'").get();
 return f;
}
