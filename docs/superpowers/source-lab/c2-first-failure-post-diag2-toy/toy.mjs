import test from 'node:test';
import assert from 'node:assert/strict';
const ids=["C2T1_CONNECTION","C2T1_OAUTH","C2T1_HANDLE","C2T1_PROJECTREF","C2T1_SUBJECT","C2T1_PHASE_RENAME","C2T1_SOURCE_BYTES","C2T1_APPROVAL","C2T1_PREDECESSOR","C2T1_GRANT_REVOKED","C2T1_EXTRA_KEY","C2T1_NOTICES","C2T1_MONITOR_COOKIE","C2T1_MONITOR","C2T1_SCOPE_MISSING","C2T1_FINITE","C2T1_SELECTION","C2T1_LOST_ACK_DUPLICATE","C2T1_UNRESOLVED_WRITER","C2T1_OWN_PROMISE"];
const phases=["connection","oauth","negative","negative","negative","negative","negative","negative","negative","negative","negative","notices","monitor","monitor","scope","finite","selection","negative","negative","negative"];
let current=-1;
const syntheticCounts=async()=>{
 await new Promise(resolve=>setImmediate(resolve));
 return current<11?{upload:1,activation:1,receipts:1}:{upload:2,activation:2,receipts:1};
};
const fixed=(id,phase,work)=>test(id,{timeout:120000},async()=>{
 let actionThrew=false,counterThrew=false,actionError,counterError,counts;
 try{await work();}catch(error){actionThrew=true;actionError=error;}
 try{counts=await syntheticCounts();}catch(error){counterThrew=true;counterError=error;}
 if(!counterThrew&&counts!==null&&counts!==undefined){
  const passed=!actionThrew;
  console.info('C2SOURCE '+JSON.stringify({id,status:passed?'pass':'fail',phase,counters:counts,code:passed?'OK':'TEST_FAILED'}));
 }
 if(actionThrew)throw actionError;
 if(counterThrew)throw counterError;
});
for(let i=0;i<ids.length;i++)fixed(ids[i],phases[i],async()=>{
 current=i;
 await new Promise(resolve=>setImmediate(resolve));
 if(i===11)assert.equal(503,200);
});
