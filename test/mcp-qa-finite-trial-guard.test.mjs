import test from 'node:test';
import assert from 'node:assert/strict';
const api=await import('../lib/mcp-qa-finite-trial-guard.mjs').catch(()=>({}));
test('finite guard and fixed native alarm adapter are available',()=>{
 for(const k of ['createPrivateQaFiniteTrialGuard','runPrivateQaFiniteTrialAlarm'])assert.equal(typeof api[k],'function');
});
