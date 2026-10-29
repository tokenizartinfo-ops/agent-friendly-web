import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {materializeMcpPrivateConfirmation,PRIVATE_CONFIRMATION_FORMAT,PRIVATE_CONFIRMATION_SLOT} from '../lib/mcp-private-confirmation-template.mjs';
const hash=s=>createHash('sha256').update(s).digest('hex');
function fixture(binding){
 const template='const policy=JSON.parse('+JSON.stringify(PRIVATE_CONFIRMATION_SLOT)+');';
 const manifest={format:PRIVATE_CONFIRMATION_FORMAT,templateHash:hash(template),templateBytes:Buffer.byteLength(template),slot:PRIVATE_CONFIRMATION_SLOT,artifactKey:'a'.repeat(64),workerHash:'b'.repeat(64),programHash:'c'.repeat(64),artifactSourceRevision:'d'.repeat(40),artifactSourceTree:'e'.repeat(40),materialized:false,remotePublished:false};
 const policy={operation:'confirm_named',startAt:0,expiresAt:1,plan:{activationKey:'f'.repeat(64),artifactKey:manifest.artifactKey,trialId:'1'.repeat(64),configurationHash:'2'.repeat(64),startAt:0,expiresAt:1},
 observation:{versionId:'synthetic',deploymentId:'synthetic',namespaceId:'synthetic',applicationId:'synthetic',configuration:{bindings:[binding]}}};
 return {template,manifest,policyJson:JSON.stringify(policy),expectedTemplateHash:manifest.templateHash};
}
test('materialization admits the exact nonsecret prepared-save UUID as data, never a credential',async()=>{
 const input=fixture({name:'AFW_DOSSIER_OWN_SAVE_KEY',type:'plain_text',text:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'});
 const r=await materializeMcpPrivateConfirmation(input);assert.equal(r.materialized,true);assert.equal(r.remotePublished,false);
 assert.equal(r.script,input.template.replace(JSON.stringify(PRIVATE_CONFIRMATION_SLOT),JSON.stringify(input.policyJson)));
});
for(const binding of [
 ...['00000000-0000-0000-0000-000000000000','aaaaaaaa-aaaa-3aaa-8aaa-aaaaaaaaaaaa','aaaaaaaa-aaaa-4aaa-7aaa-aaaaaaaaaaaa'].map(text=>({name:'AFW_DOSSIER_OWN_SAVE_KEY',type:'plain_text',text})),
 {name:'AFW_OTHER_KEY',type:'plain_text',text:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'},
 {name:'AFW_DOSSIER_OWN_SAVE_KEY',type:'plain_text',text:'sensitive-value'},
 {name:'AFW_DOSSIER_OWN_SAVE_KEY',type:'plain_text',text:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',value:'sensitive-value'},
 {name:'AFW_DOSSIER_OWN_SAVE_KEY',type:'json',text:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'},
 {name:'AFW_RELEASE_READ_TOKEN',type:'plain_text',text:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'},
 {name:'AFW_DOSSIER_OWN_SAVE_KEY',type:'secret_text',text:'sensitive-value'},
])test('prepared-save exception rejects other name/type/value/shape '+JSON.stringify(binding),async()=>{
 await assert.rejects(materializeMcpPrivateConfirmation(fixture(binding)),e=>e.message==='Private confirmation preparation unavailable'&&!e.message.includes('sensitive-value'));
});
