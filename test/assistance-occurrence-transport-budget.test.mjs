import test from 'node:test';
import assert from 'node:assert/strict';
import { createOccurrenceTransportBudget } from '../lib/assistance-occurrence-transport-budget.mjs';

const phases=[['control','create'],['operational','list'],['control','admitClaim'],['operational','claim'],['control','admitFinish'],['operational','finish']];

test('successful occurrence counts all six requests and rejects any extra effect',async()=>{
 const budget=createOccurrenceTransportBudget();let sent=0;
 for(const [kind,phase] of phases)await budget.send(kind,phase,async()=>++sent);
 assert.deepEqual(budget.snapshot(),{controls:3,operational:3,total:6,state:'completed'});
 await assert.rejects(budget.send('control','stop',async()=>++sent),/Occurrence transport denied/);
 await assert.rejects(budget.send('operational','finish',async()=>++sent),/Occurrence transport denied/);
 assert.equal(sent,6);
});

test('lost finish reply consumes its attempt; only one stop remains and total cannot exceed seven',async()=>{
 const budget=createOccurrenceTransportBudget();let sent=0;
 for(const [kind,phase] of phases.slice(0,5))await budget.send(kind,phase,async()=>++sent);
 await assert.rejects(budget.send('operational','finish',async()=>{sent++;throw Error('private transport detail');}),/^Error: Occurrence transport unavailable$/);
 await assert.rejects(budget.send('operational','finish',async()=>++sent),/Occurrence transport denied/);
 await assert.rejects(budget.send('control','stop',async()=>{sent++;throw Error('private stop detail');}),/^Error: Occurrence transport unavailable$/);
 await assert.rejects(budget.send('control','stop',async()=>++sent),/Occurrence transport denied/);
 assert.deepEqual(budget.snapshot(),{controls:4,operational:3,total:7,state:'stopped'});assert.equal(sent,7);
});

test('failure before reply never allows recovery queries or new phases',async()=>{
 const budget=createOccurrenceTransportBudget();let sent=0;
 await assert.rejects(budget.send('control','create',async()=>{sent++;throw Error('lost');}),/Occurrence transport unavailable/);
 for(const [kind,phase] of [['control','create'],['operational','list'],['control','admitClaim'],['control','query']])await assert.rejects(budget.send(kind,phase,async()=>++sent),/Occurrence transport denied/);
 await budget.send('control','stop',async()=>++sent);
 assert.deepEqual(budget.snapshot(),{controls:2,operational:0,total:2,state:'stopped'});assert.equal(sent,2);
});

test('concurrent or reordered sends do not reach the transport and snapshot cannot alter budget',async()=>{
 const budget=createOccurrenceTransportBudget();let release,sent=0;
 const first=budget.send('control','create',async()=>{sent++;await new Promise(r=>release=r);return 'ok';});
 await assert.rejects(budget.send('operational','list',async()=>++sent),/Occurrence transport denied/);
 const snapshot=budget.snapshot();snapshot.controls=0;snapshot.total=0;
 assert.equal(budget.snapshot().total,1);release();await first;
 await assert.rejects(budget.send('operational','claim',async()=>++sent),/Occurrence transport denied/);
 await assert.rejects(budget.send('control','admitClaim',async()=>++sent),/Occurrence transport denied/);
 await assert.rejects(budget.send('operational','list',null),/Occurrence transport denied/);
 await budget.send('operational','list',async()=>++sent);
 await budget.send('control','stop',async()=>++sent);
 assert.equal(sent,3);
});
