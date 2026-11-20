import test from 'node:test';
import assert from 'node:assert/strict';
import {initialHash as hash,initialCanonical as canonical} from '../lib/mcp-qa-finite-initial-material-records.mjs';
import {sealFinitePreparationIssuerRecord as issuer} from '../lib/mcp-qa-finite-preparation-issuer-records.mjs';
import {sealFinitePreparationNoticeRecord as seal,encodeFinitePreparationNoticeRecord as encode,decodeFinitePreparationNoticeRecord as decode,FINITE_PREPARATION_NOTICE_PREFIX as P,FINITE_PREPARATION_NOTICE_OPERATIONS as OPS} from '../lib/mcp-qa-finite-preparation-notice-records.mjs';
const H='a'.repeat(64),U='11111111-1111-4111-8111-111111111111',at=1800000000000;
const i=issuer('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:H,subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:H,grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:new Date(at+20000).toISOString(),I0:at-1000,C0:at+899000,C1:at+1079000,reservedAt:at-10});
const body={identity:i,issuerReservationHash:H,originalGrantAckHash:H,grantLinkHash:H,connectionHash:H,expectedGrant:{scopes:['afw:project:read'],createdAt:new Date(at).toISOString(),expiresAt:new Date(at+18000).toISOString()},consumedAt:new Date(at).toISOString(),accessExpiresAt:at+19000,preconnectionExpiresAt:at+20000,ticket:{handleHash:H,requestId:U,expectedSequence:0,issuedAt:at,expiresAt:at+17000,permissionExpiresAt:at+16000},issuedAt:at+1};
const make=(kind,v)=>seal(kind,{purpose:'afw.finite-preparation-notice-'+kind.toLowerCase()+'.v1',...v});
const reservation=make('Reservation',body);
const send=make('Send',{identityHash:i.identityHash,reservationHash:reservation.recordHash,operation:'ticket',requestHash:H,accessExpiresAt:body.accessExpiresAt,window:{startedAt:at+2,deadline:at+4000},issuedAt:at+2,decisionHash:null});
const consent=make('Send',{...send,operation:'consent',decisionHash:H});
const records=[['Reservation',reservation],['Send',send],['Send',consent],['Ack',make('Ack',{sendHash:send.recordHash,outcome:'applied',rowHash:H,sequence:null,observedAt:at+3})],['Ack',make('Ack',{sendHash:consent.recordHash,outcome:'applied',rowHash:H,sequence:17,observedAt:at+4})],['Ack',make('Ack',{sendHash:send.recordHash,outcome:'no_mutation',rowHash:null,sequence:null,observedAt:at+3})],['Freeze',make('Freeze',{identityHash:i.identityHash,reservationHash:reservation.recordHash,frozenAt:at+5})]];
test('DATA exact canonical round trips all kinds and real global sequence 17 independent of expectedSequence zero',()=>{
 assert.equal(P,'afw.finite-preparation-notice.v1:');assert.deepEqual(OPS,['ticket','consent']);assert.ok(Object.isFrozen(OPS));
 for(const [kind,r]of records){const raw=encode(kind,r),decoded=decode(kind,raw);assert.equal(raw,canonical(r));assert.deepEqual(decoded,r);assert.notEqual(decoded,r);assert.ok(Object.isFrozen(decoded));assert.throws(()=>decode(kind,' '+raw),/Finite preparation notice unavailable/);}
 assert.equal(records[4][1].sequence,17);assert.equal(reservation.ticket.expectedSequence,0);
});
test('DATA detached deeply frozen snapshots',()=>{const v=structuredClone(body),r=make('Reservation',v);v.ticket.requestId='22222222-2222-4222-8222-222222222222';assert.equal(r.ticket.requestId,U);assert.ok(Object.isFrozen(r.ticket)&&Object.isFrozen(r.identity.requestedScopes));});
for(const fault of ['extra','symbol','getter','prototype','sparse','oversize','identity-C0','identity-C1','Access','window','time','sequence','grant-order','scopes','ticket-limit','permission','consumed','purpose','hash','null-row','no-mutation-sequence','zero-sequence','fraction-sequence','unknown-kind'])test('DATA rejects '+fault+' generically without evaluating getters',()=>{
 let calls=0,kind='Reservation',v={purpose:'afw.finite-preparation-notice-reservation.v1',...structuredClone(body)},fn=()=>seal(kind,v);
 if(fault==='extra')v.approval=true;
 if(fault==='symbol')v[Symbol('SYN')]=true;
 if(fault==='getter')Object.defineProperty(v,'issuedAt',{enumerable:true,get(){calls++;return at;}});
 if(fault==='prototype')Object.setPrototypeOf(v,{});
 if(fault==='sparse')v.expectedGrant.scopes=new Array(1);
 if(fault==='oversize')v.identity.subject='x'.repeat(17000);
 if(fault==='identity-C0')v.identity.C0++;
 if(fault==='identity-C1')v.identity.C1++;
 if(fault==='Access')v.accessExpiresAt=v.ticket.expiresAt-1;
 if(fault==='window'){kind='Send';v={...send,window:{startedAt:at,deadline:at+5001}};}
 if(fault==='time')v.issuedAt=v.ticket.permissionExpiresAt;
 if(fault==='sequence')v.ticket.expectedSequence=1;
 if(fault==='grant-order')v.expectedGrant.expiresAt=v.expectedGrant.createdAt;
 if(fault==='scopes')v.expectedGrant.scopes=['afw:evidence:read','afw:project:read'];
 if(fault==='ticket-limit')v.ticket.expiresAt=v.ticket.issuedAt+600001;
 if(fault==='permission')v.ticket.permissionExpiresAt=v.ticket.issuedAt;
 if(fault==='consumed')v.consumedAt=new Date(at-20).toISOString();
 if(fault==='purpose')v.purpose='wrong';
 if(fault==='hash'){v={...reservation,recordHash:'f'.repeat(64)};fn=()=>encode(kind,v);}
 if(['null-row','no-mutation-sequence','zero-sequence','fraction-sequence'].includes(fault)){kind='Ack';v={...records[4][1]};if(fault==='null-row')v.rowHash=null;if(fault==='no-mutation-sequence'){v.outcome='no_mutation';v.rowHash=null;}if(fault==='zero-sequence')v.sequence=0;if(fault==='fraction-sequence')v.sequence=1.5;}
 if(fault==='unknown-kind')kind='Other';
 assert.throws(fn,e=>e.message==='Finite preparation notice unavailable');assert.equal(calls,0);
});
test('DATA decode rejects malformed JSON, unknown fields, noncanonical bytes and wrong checksums',()=>{
 for(const raw of ['{','{}','x'.repeat(16385),JSON.stringify({...reservation,extra:1}),JSON.stringify(reservation),canonical({...reservation,recordHash:'f'.repeat(64)})])if(raw!==canonical(reservation))assert.throws(()=>decode('Reservation',raw),/Finite preparation notice unavailable/);
 const wrong=canonical({...reservation,issuerReservationHash:'f'.repeat(64)});assert.throws(()=>decode('Reservation',wrong));
 assert.equal(reservation.recordHash,hash(reservation.purpose,Object.fromEntries(Object.entries(reservation).filter(([k])=>k!=='recordHash'))));
});

test('DATA Access and preconnection are independent ceilings, never renewal authority',()=>{
 const r=make('Reservation',{...body,accessExpiresAt:at+30000});assert.ok(r.accessExpiresAt>r.preconnectionExpiresAt);assert.equal(r.ticket.expiresAt,body.ticket.expiresAt);
});
