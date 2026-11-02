import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode,hashFinitePreparationRecord as hash} from '../lib/mcp-qa-finite-preparation-records.mjs';
const H='a'.repeat(64),M='b'.repeat(40);
const ticket=()=>({purpose:'afw.finite-owner-ticket.v1',ticketHash:H,subjectHash:H,sourceRevision:M,projectRef:H,connectionRef:null,preconnectionId:H,action:'connection',createdAt:1,expiresAt:900000});
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:1)):x);
test('rejects_noncanonical_private_record_and_future_ack',()=>{
 const value=ticket(),raw=encode('Ticket',value);
 assert.equal(raw,canonical(value));assert.deepEqual(decode('Ticket',raw),value);assert.ok(Object.isFrozen(decode('Ticket',raw)));
 assert.equal(hash('Ticket',value),createHash('sha256').update(value.purpose+'\n'+raw).digest('hex'));
 for(const text of [JSON.stringify(value),' '+raw,raw.replace('"action":','"action":"finite","action":'),raw.replace('"createdAt":1','"createdAt":1.0')])assert.throws(()=>decode('Ticket',text));
 for(const bad of [{...value,jwt:'private'},{...value,cookie:'private'},{...value,credential:'private'},{...value,ticketHash:'A'.repeat(64)},{...value,sourceRevision:H},{...value,createdAt:-1},{...value,expiresAt:900002},{...value,action:'notices'},{...value,projectRef:'raw-id'},{...value,purpose:'other'}])assert.throws(()=>encode('Ticket',bad));
 const accessor={...value};Object.defineProperty(accessor,'ticketHash',{enumerable:true,get(){throw Error('must not invoke');}});assert.throws(()=>encode('Ticket',accessor));
 assert.throws(()=>encode('Ticket',Object.assign(Object.create(null),value)));
 const cycle={...value};cycle.cycle=cycle;assert.throws(()=>encode('Ticket',cycle));
 assert.throws(()=>decode('Ticket',' '.repeat(65537)));
 const ack={purpose:'afw.finite-policy-ack.v1',sendHash:H,resourceId:'11111111-1111-4111-8111-111111111111',acknowledgedAt:999999};
 // Codecs are timeless; actual future-vs-now/SEND checks belong to native journal.
 assert.deepEqual(decode('PolicyAck',encode('PolicyAck',ack)),ack);
});
test('records_do_not_touch_runtime',async()=>{
 let calls=0;const fetch=globalThis.fetch;globalThis.fetch=()=>{calls++;throw Error('unexpected runtime');};
 try{encode('Ticket',ticket());decode('Ticket',encode('Ticket',ticket()));hash('Ticket',ticket());assert.equal(calls,0);}finally{globalThis.fetch=fetch;}
 for(const path of ['lib/mcp-qa-finite-preparation-records.mjs','lib/mcp-qa-finite-preparation-store.mjs','lib/mcp-qa-finite-policy-journal.mjs']){
  const source=await readFile(path,'utf8');assert.doesNotMatch(source,/\bfetch\s*\(|\.create\s*\(|afw\.qa-finite-trial\.v1:head/);
 }
});

import * as control from '../lib/mcp-qa-finite-trial-control.mjs';
import * as records from '../lib/mcp-qa-finite-preparation-records.mjs';
import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
import {finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
const seal=(kind,v,key)=>({...v,[key]:hash(kind,v)});
const project={projectId:'synthetic-project',revision:1,synthetic:true};
const projectHash=createHash('sha256').update('afw.finite-owner-project.v1\n'+canonical(project)).digest('hex');
const U='11111111-1111-4111-8111-111111111111';
function samples(){
 const owner={subject:'synthetic-subject',accessRealmHash:H,accessVerifiedAt:1,accessExpiresAt:900000};
 const approval={purpose:'afw.own-synthetic-policy-preparation.v1',decision:'approve',sourceRevision:M,projectHash,goal:'discovery',approvedAt:1,expiresAt:900000,csrfReceiptHash:H};
 const pre=seal('OwnerPreparation',{purpose:'afw.finite-owner-preparation.v1',prepId:H,sourceRevision:M,actorId:H,selectedAt:10,expiresAt:900000,commandBy:390000,owner,connection:{connectionRef:H,grantId:'grant',clientId:'client',resource:'https://fixture.invalid/mcp',grantHash:H,consentHash:H,noticesHash:H,permissionExpiresAt:900000},project,goal:'discovery',programContext:{programHash:H,sourceRevision:M,originalContextHash:H},approval,auditHash:H},'preparationHash');
 const {legacy,T0}=finiteFixture().plan;
 // The immutable context uses the same original time as the real legacy fixture.
 const p=structuredClone(pre);p.selectedAt=T0-10;p.expiresAt=T0+900000;p.commandBy=T0+390000;p.owner.accessVerifiedAt=T0-100;p.owner.accessExpiresAt=T0+900000;p.connection.permissionExpiresAt=T0+900000;p.approval.approvedAt=T0-100;p.approval.expiresAt=T0+900000;p.preparationHash=hash('OwnerPreparation',p);
 const config=structuredClone(finitePublicProfileTemplate('canaryLive'));
 for(const b of config.bindings)if(b.privateSlot){delete b.privateSlot;b.text='synthetic';}
 const policySend={purpose:'afw.finite-policy-send.v1',intentId:'intent',sourceRevision:M,setupInstanceId:'setup',contextHash:H,effect:'upload',requestHash:H,issuedAt:10,deadline:100};
 const connectionSend={purpose:'afw.finite-connection-send.v1',preconnectionId:H,sourceRevision:M,stage:'connection',contextHash:H,effect:'upload',baselineVersionId:U,baselineDeploymentId:U,requestHash:H,issuedAt:10,deadline:100};
 return {
 Ticket:ticket(),TicketUse:{purpose:'afw.finite-owner-ticket-use.v1',ticketHash:H,recordHash:H,consumedAt:50},
 ConfigurationApproval:{purpose:'afw.finite-connection-approval.v1',subjectHash:H,sourceRevision:M,projectHash,clientId:'client',approvedAt:1,expiresAt:900000,csrfReceiptHash:H},
 Preconnection:seal('Preconnection',{purpose:'afw.finite-connection-preparation.v1',preconnectionId:H,sourceRevision:M,actorId:H,owner,project,clientId:'client',resource:'https://fixture.invalid/mcp',startedAt:1,expiresAt:900000,approvalHash:H,baselineHash:H},'recordHash'),
 OwnerPreparation:pre,
 Selection:seal('Selection',{purpose:'afw.finite-owner-selection.v1',sourceRevision:M,prepId:H,preparationHash:pre.preparationHash,selectedAt:10,sequence:1,previousSelectionHash:null},'selectionHash'),
 Binding:{purpose:'afw.finite-owner-binding.v1',prepId:H,preparationHash:pre.preparationHash,selectionHash:H,intentId:'intent',sourceRevision:M,T0:20,boundAt:30},
 GrantLink:{preconnectionId:H,authorizationHash:H,grantId:'grant',grantHash:H,acceptedAt:20},
 NoticeLink:{preconnectionId:H,grantHash:H,eventHash:H,sequence:1,acceptedAt:30},
 ConnectionRef:{connectionRef:H,subject:'subject',grantId:'grant',clientId:'client',projectId:'project',resource:'https://fixture.invalid/mcp',issuedAt:1,expiresAt:900000},
 PolicySend:policySend,ConnectionSend:connectionSend,
 PolicyAck:{purpose:'afw.finite-policy-ack.v1',sendHash:hash('PolicySend',policySend),resourceId:U,acknowledgedAt:30},
 ConnectionAck:{purpose:'afw.finite-connection-ack.v1',sendHash:hash('ConnectionSend',connectionSend),resourceId:U,acknowledgedAt:30},
 ConnectionReceipt:seal('ConnectionReceipt',{purpose:'afw.finite-connection-installed.v1',preconnectionId:H,sourceRevision:M,stage:'connection',baselineVersionId:U,baselineDeploymentId:U,versionId:U,deploymentId:U,moduleHash:H,configurationHash:H,completedAt:40},'receiptHash'),
 PolicyReceipt:seal('PolicyReceipt',{purpose:'afw.finite-policy-installed.v1',intentId:'intent',sourceRevision:M,setupInstanceId:'setup',qaVersionId:U,seedHash:H,contextHash:H,baselineVersionId:U,baselineDeploymentId:U,versionId:U,deploymentId:U,moduleHash:H,publicStaticHash:H,activationHash:H,restorationHash:H,bindingsHash:H,installedAt:40},'receiptHash'),
 Failure:{purpose:'afw.finite-policy-failure.v1',identityHash:H,reasonCode:'deadline',observedAt:40},
 SetupContext:{purpose:'afw.finite-policy-context.v1',intentId:'intent',sourceRevision:M,seedHash:H,preparationHash:p.preparationHash,selectionHash:H,bindingHash:H,T0,C0:T0+240000,C1:T0+420000,ownerPreparation:p,baselineProjectRevision:1,goal:'discovery',saveIdempotencyKey:U,legacy,policies:{AFW_DOSSIER_EVENTS_POLICY:'synthetic',AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY:'synthetic',AFW_DOSSIER_RETIREMENT_POLICY:'synthetic',AFW_DOSSIER_SUCCESSOR_POLICY:'synthetic',AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'project'},baseline:{versionId:U,deploymentId:U,module:{name:'index.mjs',sha256:H,bytes:1024},configuration:config},rollback:{versionId:U,deploymentId:U,module:{name:'index.mjs',sha256:H,bytes:1024},configuration:config},expectedFull:{activationHash:H,restorationHash:H,bindingsHash:H}}
 };
}
test('all_fixed_record_kinds_roundtrip_and_exact_domains',()=>{
 for(const [kind,v]of Object.entries(samples())){
  const raw=encode(kind,v);assert.deepEqual(decode(kind,raw),v,kind);assert.equal(encode(kind,decode(kind,raw)),raw);
  assert.throws(()=>encode(kind,{...v,unknown:true}),kind);
  if(v.purpose)assert.throws(()=>encode(kind,{...v,purpose:'wrong'}),kind);
 }
 const s=samples();
 for(const [kind,domain]of [['GrantLink','afw.finite-grant-link.v1'],['NoticeLink','afw.finite-notice-link.v1'],['ConnectionRef','afw.finite-connection-ref.v1']])assert.equal(hash(kind,s[kind]),createHash('sha256').update(domain+'\n'+canonical(s[kind])).digest('hex'));
 for(const [kind,key]of [['OwnerPreparation','preparationHash'],['Selection','selectionHash'],['Preconnection','recordHash'],['PolicyReceipt','receiptHash'],['ConnectionReceipt','receiptHash']])assert.throws(()=>encode(kind,{...s[kind],[key]:'f'.repeat(64)}));
});
test('context_uses_actual_legacy_module_and_configuration_grammars',()=>{
 assert.equal(typeof control.validatePrivateQaFiniteLegacy,'function');
 const {legacy,T0}=finiteFixture().plan;
 const accepted=control.validatePrivateQaFiniteLegacy({legacy,T0});assert.ok(Object.isFrozen(accepted));assert.deepEqual(accepted,legacy);
 for(const bad of [{legacy:{...legacy,retirement:{}},T0},{legacy:{...legacy,sourceHash:'invalid'},T0},{legacy,T0,extra:true}])assert.throws(()=>control.validatePrivateQaFiniteLegacy(bad));
 const context=samples().SetupContext;
 for(const change of [
  c=>{c.legacy.retirement={};},c=>{c.baseline.module.exports=[];},c=>{c.baseline.configuration.extra=true;},
  c=>{c.baseline.configuration.bindings.find(b=>b.type==='secret_text').text='private';},
  c=>{c.policies.alias='private';},c=>{c.ownerPreparation.approval.projectHash='f'.repeat(64);},
  c=>{c.C0++;},c=>{c.policies.AFW_DOSSIER_EVENTS_POLICY='x'.repeat(65536);}
 ]){const c=structuredClone(context);change(c);assert.throws(()=>encode('SetupContext',c));}
 assert.equal(typeof records.hashFiniteOwnerPreparationProject,'function');assert.equal(records.hashFiniteOwnerPreparationProject(project),projectHash);
});
