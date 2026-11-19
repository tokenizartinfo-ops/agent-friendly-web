import assert from 'node:assert/strict';
import test from 'node:test';
import {createFiniteInitialCustodySelector,assertFiniteInitialToken,assertFiniteInitialCleanupCustody} from '../lib/mcp-qa-finite-initial-custody-profile.mjs';

const start=Date.parse('2026-11-19T21:45:00Z');
const end=Date.parse('2026-11-27T02:00:00Z');
const role=(id,expiresAt)=>({id,expiresAt});
const renewed={startAt:start,endAt:end,reader:role('a'.repeat(32),end+30000),publisher:role('b'.repeat(32),end)};
const legacyAt=Date.parse('2026-11-02T12:00:00Z');

test('initial custody keeps the legacy record and chooses only an approved original window',()=>{
 const choose=createFiniteInitialCustodySelector([renewed]);
 const legacy=choose(legacyAt);
 assert.equal(legacy.endAt,Date.parse('2026-11-03T02:59:00Z'));
 assert.equal(legacy.reader.id,'9aa97ad1fc9afe3021cf69ea497d5190');
 assert.throws(()=>choose(start-1));
 assert.deepEqual(choose(start),renewed);
 assert.throws(()=>choose(end));
 assert.throws(()=>createFiniteInitialCustodySelector([renewed,{...renewed,startAt:start+1}]));
 assert.throws(()=>createFiniteInitialCustodySelector([{...renewed,publisher:renewed.reader}]));
});

test('approved token expiry and identity cannot be borrowed or extended',()=>{
 const select=createFiniteInitialCustodySelector([renewed]);
 const profile=select(start),peer=profile.reader;
 const response={id:peer.id,status:'active',expires_on:new Date(peer.expiresAt).toISOString()};
 assert.equal(assertFiniteInitialToken(response,peer,start),peer.expiresAt);
 assert.throws(()=>assertFiniteInitialToken({...response,id:profile.publisher.id},peer,start));
 assert.throws(()=>assertFiniteInitialToken({...response,expires_on:new Date(peer.expiresAt+1).toISOString()},peer,start));
 assert.throws(()=>assertFiniteInitialToken({...response,not_before:new Date(start+1).toISOString()},peer,start));
 const cleanup={I0:start,C1:start+1080000,readerId:peer.id,publisherId:profile.publisher.id,readerExpiresAt:peer.expiresAt,publisherExpiresAt:profile.publisher.expiresAt};
 assert.doesNotThrow(()=>assertFiniteInitialCleanupCustody(cleanup,select));
 assert.throws(()=>assertFiniteInitialCleanupCustody({...cleanup,C1:end+1},select));
 assert.throws(()=>assertFiniteInitialCleanupCustody({...cleanup,readerId:select(legacyAt).reader.id},select));
});
