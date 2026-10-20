import test from 'node:test';
import assert from 'node:assert/strict';
import {capsulePreparationFixture,input} from './fixtures/agent-capsule-preparation.mjs';
import {createDelegatedCapsulePreparationOAuthHost,readCapsulePreparationOAuthAuthorization} from '../lib/delegated-capsule-preparation-oauth.mjs';
function setup(clientId){
 const f=capsulePreparationFixture(()=>null);
 f.sql.prepare("UPDATE delegated_access_grants SET client_id=? WHERE id='grant-a'").run(clientId);
 const env={DB:f.db,OAUTH_KV:{},DELEGATED_RATE_LIMITER:{async limit(){return {success:true};}},
  AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',
  AFW_OAUTH_PILOT_EXPIRES_AT:new Date(Date.now()+120000).toISOString(),AFW_OAUTH_PILOT_PROJECT_ID:'project-a',
  AFW_OAUTH_PILOT_CLIENT_ID:clientId,ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'ci-only'};
 const pair={auth:{userId:'owner-a',clientId,audience:f.authority.resource,scope:['afw:project:read','afw:capsule:prepare'],
  expiresAt:Math.floor((Date.now()+100000)/1000)},props:{applicationGrantId:'grant-a',userId:'owner-a',projectId:'project-a'}};
 return {f,env,pair,create:()=>createDelegatedCapsulePreparationOAuthHost({env,resource:f.authority.resource,
  getVerifiedContext:()=>pair,monotonic:()=>f.mono})};
}
for(const clientId of ['_sdk-client-01','-sdk-client-02']){
 test('SDK-compatible registered client '+clientId[0]+' prefix passes the complete preparation bridge and domain',async()=>{
  const {f,pair,create}=setup(clientId);
  try{
   assert.notEqual(readCapsulePreparationOAuthAuthorization(pair),null,'valid SDK opaque client identifier must project');
   let host;assert.doesNotThrow(()=>{host=create();},'valid registered SDK client must reach the finite host');
   const prepared=await host.prepare(input);assert.equal(prepared.code,'prepared');
   assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
   const recovered=await host.reconcile(input);assert.equal(recovered.code,'prepared');
   assert.deepEqual(recovered.preparation,prepared.preparation);
   assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
  }finally{f.close();}
 });
}
test('client syntax compatibility preserves bounds, forbidden characters and other identity grammar',()=>{
 for(const clientId of ['', ' client','/client','client space','client\nid','x'.repeat(129)]){
  const {f,create}=setup(clientId);try{assert.throws(create,/Preparation host unavailable/);assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});}finally{f.close();}
 }
 for(const mutate of [
  p=>{p.auth.userId='_owner';p.props.userId='_owner';},
  p=>{p.props.projectId='_project';},
  p=>{p.props.applicationGrantId='_grant';}
 ]){
  const {f,pair}=setup('_sdk-client-valid');try{mutate(pair);assert.equal(readCapsulePreparationOAuthAuthorization(pair),null);}finally{f.close();}
 }
});
