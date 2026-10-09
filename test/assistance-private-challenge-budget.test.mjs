import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/assistance-private-challenge-budget.mjs');
function fixture(){let values=new Map(),queue=Promise.resolve(),lost=false,t=100;const storage={transaction(fn){const p=queue.then(async()=>{const draft=new Map(structuredClone([...values]));const out=await fn({get:async k=>draft.get(k),put:async(k,v)=>draft.set(k,v)});values=draft;if(lost){lost=false;throw Error('lost ack');}return out;});queue=p.catch(()=>{});return p;}};return {options:{storage,readPrincipal:()=> 'c'.repeat(64),now:()=>t},lost:()=>lost=true,time:v=>t=v};}
test('atomic lifetime budget permits only two authenticated attempts across actor recreation',async()=>{
 const f=fixture(),{createPrivateChallengeBudget}=await load(),key='afw-private-challenge:'+'c'.repeat(64);
 const results=await Promise.all(Array.from({length:6},()=>createPrivateChallengeBudget(f.options).limit({key})));
 assert.equal(results.filter(x=>x.success).length,2);f.time(60100);assert.equal((await createPrivateChallengeBudget(f.options).limit({key})).success,false);
 assert.equal((await createPrivateChallengeBudget({...f.options,readPrincipal:()=> 'd'.repeat(64)}).limit({key:'afw-private-challenge:'+'d'.repeat(64)})).success,false);
});
test('unknown acknowledgement consumes budget and backwards time never admits',async()=>{
 const f=fixture(),{createPrivateChallengeBudget}=await load(),key='afw-private-challenge:'+'c'.repeat(64);
 f.lost();const h=createPrivateChallengeBudget(f.options);assert.equal((await h.limit({key})).success,false);assert.equal((await h.limit({key})).success,true);assert.equal((await h.limit({key})).success,false);
 const g=fixture();assert.equal((await createPrivateChallengeBudget(g.options).limit({key})).success,true);g.time(99);assert.equal((await createPrivateChallengeBudget(g.options).limit({key})).success,false);
 assert.equal((await createPrivateChallengeBudget(g.options).limit({key:'foreign'})).success,false);
});
