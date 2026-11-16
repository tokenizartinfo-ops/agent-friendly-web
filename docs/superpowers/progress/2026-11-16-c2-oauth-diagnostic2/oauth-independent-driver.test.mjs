// DIAGNOSTIC ONLY. Calls frozen actual world methods; never Source regression acceptance.
import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import {createFiniteCoupledOwnerWorld} from './test/fixtures/finite-coupled-native.mjs';
import {projectThrown} from './oauth-error-sanitizer.mjs';
let w,sequence=0,driverPhase='initial';
function hook(status,projection=null){
 const value={schema:'afw.c2-oauth-lifecycle.v1',sequence:++sequence,hook:'after',driverPhase,status,error:status==='close-threw'?projection.error:null,sanitized:status==='close-threw'?projection.sanitized:true};
 process.stdout.write('AFW_C2_OAUTH_LIFECYCLE '+JSON.stringify(value)+'\n');
}
after(async()=>{
 hook('entered');
 let closeThrew=false,closeError;
 try{await w?.close();}catch(error){closeThrew=true;closeError=error;}
 hook(closeThrew?'close-threw':'close-returned',closeThrew?projectThrown(closeError):null);
 if(closeThrew)throw closeError;
});
function emit(id,operation,status,projection){
 const value={schema:'afw.c2-oauth-operation.v1',sequence:++sequence,id,operation,status,error:status==='threw'?projection.error:null,sanitized:status==='threw'?projection.sanitized:true};
 process.stdout.write('AFW_C2_OAUTH_OPERATION '+JSON.stringify(value)+'\n');
}
const observe=async(id,work)=>test(id,{timeout:120000},async()=>{
 assert(w||id==='C2T1_CONNECTION');
 let actionThrew=false,counterThrew=false,actionError,counterError;
 driverPhase=id==='C2T1_CONNECTION'?'connection-action':'oauth-action';
 try{await work();}catch(error){actionThrew=true;actionError=error;}
 // Publish action fact BEFORE the independent counter wait can throw or hang.
 const actionProjection=actionThrew?projectThrown(actionError):null;
 emit(id,'action',actionThrew?'threw':'returned',actionProjection);
 driverPhase=id==='C2T1_CONNECTION'?'connection-counter':'oauth-counter';
 try{const counts=w?await w.counts():null;void counts;}catch(error){counterThrew=true;counterError=error;}
 const counterProjection=counterThrew?projectThrown(counterError):null;
 emit(id,'counter',counterThrew?'threw':'returned',counterProjection);
 driverPhase=id==='C2T1_CONNECTION'?'between-cases':'complete';
 // Preserve the exact thrown value, including null/undefined. Counter never overrides action.
 if(actionThrew)throw actionError;
 if(counterThrew)throw counterError;
});
await observe('C2T1_CONNECTION',async()=>{
 w=await createFiniteCoupledOwnerWorld();
 await w.approve('connection');
 assert.deepEqual(await w.counts(),{upload:1,activation:1,receipts:1});
});
await observe('C2T1_OAUTH',async()=>{await w.oauth();});
