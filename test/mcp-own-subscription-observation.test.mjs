import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';
import {createOwnDurableEventHost} from '../lib/mcp-own-durable-host.mjs';
const params=projectRef=>({name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')},ttlMs:60000});
const withdrawal=p=>({name:p.name,arguments:p.arguments,delivery:{mode:'webhook',url:p.delivery.url}});
test('private original observation never starts a missing subscription or mistakes custody close for unsubscribe',async()=>{
 const f=fixture();try{f.grant();const h=createOwnDurableEventHost(f.config);f.setHost(h);assert.equal(await h.observeSubscription(),null);assert.equal(f.boots(),0);assert.equal(f.sends(),0);const p=params(await h.list());await h.subscribe(p);await h.close();const before=f.rows(),observed=await createOwnDurableEventHost(f.config).observeSubscription();assert.equal(observed.state,'active');assert.equal(observed.cloudReviewConfirmed,false);assert.equal(f.config.ctx.container.running,false);assert.deepEqual(f.rows(),before);await h.unsubscribe(withdrawal(p));const withdrawn=await h.observeSubscription();assert.equal(withdrawn.state,'withdrawn');assert.equal(f.boots(),1);assert.equal(f.sends(),1);assert.doesNotMatch(JSON.stringify(withdrawn),/whsec_|\/hook|cipher|subscription_id|principalRef/);}finally{f.close();}
});
test('original private observation fails when reading permission is revoked during receipt lookup',async()=>{
 const f=fixture();try{f.grant();const h=createOwnDurableEventHost(f.config);f.setHost(h);await h.subscribe(params(await h.list()));const original=f.config.db.prepare;f.config.db.prepare=sql=>{const stmt=original(sql);return{bind(...args){const bound=stmt.bind(...args);return{...bound,async first(){const row=await bound.first();if(sql.includes('FROM dossier_event_subscription_receipts'))f.db.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?').run(new Date().toISOString(),'g');return row;}};}};};await assert.rejects(h.observeSubscription(),/^Error: Own durable event host unavailable$/);assert.equal(f.boots(),1);assert.equal(f.sends(),1);}finally{f.close();}
});
test('foreign source or program has no matching original receipt and never observes another host record',async()=>{
 const f=fixture();try{f.grant();const h=createOwnDurableEventHost(f.config);f.setHost(h);await h.subscribe(params(await h.list()));for(const patch of [{sourceRevision:'d'.repeat(40)},{program:'different synthetic program'}])assert.equal(await createOwnDurableEventHost({...f.config,...patch}).observeSubscription(),null);assert.equal(f.boots(),1);assert.equal(f.sends(),1);}finally{f.close();}
});
