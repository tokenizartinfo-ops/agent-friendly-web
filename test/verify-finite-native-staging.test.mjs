import test from 'node:test';
import assert from 'node:assert/strict';
import {verifyClosedQaWorkflows} from '../scripts/verify-finite-native-staging.mjs';

for(const pendingCall of ['create','status'])test('the QA Workflow deadline covers a pending '+pendingCall,{timeout:1000},async()=>{
 const pending=()=>new Promise(()=>{});
 const calls=[];
 const bootstrap={
  create(){
   calls.push('create');
   return pendingCall==='create'?pending():{status(){calls.push('status');return pending();}};
  }
 };
 const confirmation={create(){assert.fail('second Workflow must not start after timeout');}};
 const runtime={getBindings:async()=>({AFW_QA_BOOTSTRAP:bootstrap,AFW_QA_NAMED_CONFIRMATION:confirmation})};
 await assert.rejects(verifyClosedQaWorkflows(runtime,'qa',{timeoutMs:20}),/AFW_QA_BOOTSTRAP did not finish before the staging deadline/);
 assert.deepEqual(calls,pendingCall==='create'?['create']:['create','status']);
});
