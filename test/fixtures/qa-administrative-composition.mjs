import {computeAdministrativeResultDigest} from '../../lib/assistance-administrative-closure-readback.mjs';
import {computeAdministrativeTokenDigestV2} from '../../lib/assistance-administrative-closure-v2.mjs';
import {computeServiceIdentityDigest} from '../../lib/assistance-service-identity-disable.mjs';
import {computeQaClosureBaselineRef} from '../../lib/assistance-qa-closure-catalog.mjs';
export async function qaAdministrationFixture({createdAt=Date.parse('2026-10-08T22:00:00Z'),closeAt=createdAt+1000,expiresAt=createdAt+12000}={}){
 const resources={accountId:'a'.repeat(32),tokenId:'22222222-2222-4222-8222-222222222222',workerName:'afw-own-qa',applicationId:'33333333-3333-4333-8333-333333333333',policyId:'44444444-4444-4444-8444-444444444444'};
 const token={id:resources.tokenId,client_id:'synthetic-placeholder',name:'owned-qa',duration:'10m',created_at:new Date(createdAt).toISOString(),expires_at:new Date(expiresAt).toISOString(),enabled:true,updated_at:new Date(createdAt).toISOString(),last_seen_at:null,client_secret_version:1};
 const results={token,settings:{bindings:[{name:'AFW_OPERATIONS_CONSUMER_ENABLED',type:'plain_text',text:'false'}]},schedules:{schedules:[]},policy:{id:resources.policyId,include:[]}};
 const digests=Object.fromEntries(await Promise.all(Object.entries(results).map(async([k,v])=>[k,await(k==='token'?computeAdministrativeTokenDigestV2({...v,enabled:false}):computeAdministrativeResultDigest(v))])));
 const registration={contract:'afw-qa-closure-approval/v1',plan:{occurrenceId:'11111111-1111-4111-8111-111111111111',baselineRef:'a'.repeat(64),closeAt},planRevision:1,resources,digests,identity:{name:token.name,metadataDigest:await computeServiceIdentityDigest(token)},provisioning:{creationRef:'1'.repeat(64),custodyRef:'2'.repeat(64),inventoryRef:'3'.repeat(64),createdAt,expiresAt}};
 registration.plan.baselineRef=await computeQaClosureBaselineRef(registration);
 const calls=[];let approved=true,clock=registration.plan.closeAt,lost=false;
 const options={plan:registration.plan,catalog:{read:async()=>approved?structuredClone(registration):null},now:()=>clock,readIdentityCredential:async()=> 'synthetic-custody-placeholder',readAdministrativeCredential:async()=> 'synthetic-read-placeholder',fetchImpl:async(url,init)=>{
  const path=new URL(url).pathname;calls.push({path,method:init.method,body:init.body});
  if(init.method==='PUT'){const body=JSON.parse(init.body);results.token.enabled=body.enabled;results.token.name=body.name;results.token.updated_at=new Date(createdAt+2000).toISOString();if(lost)throw Error('synthetic lost acknowledgment');return Response.json({success:true,result:null});}
  const key=path.includes('/service_tokens/')?'token':path.endsWith('/settings')?'settings':path.endsWith('/schedules')?'schedules':'policy';return Response.json({success:true,result:structuredClone(results[key])});
 }};
 return {registration,results,options,calls,setApproved(v){approved=v;},setClock(v){clock=v;},loseAck(){lost=true;}};
}
