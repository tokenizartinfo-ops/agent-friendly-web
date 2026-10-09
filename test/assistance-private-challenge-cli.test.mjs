import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
test('CLI rejects missing or noncanonical pins without HTTP and prints only fixed error',()=>{
 for(const args of [[],['confirm','foreign','0','1000'],['confirm','a'.repeat(64),'01','1000']]){
  const r=spawnSync(process.execPath,['scripts/afw-private-challenge-client.mjs',...args],{encoding:'utf8',env:{...process.env,AFW_OPERATIONS_ACCESS_CLIENT_ID:'synthetic-id',AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'synthetic-secret'}});
  assert.equal(r.status,1);assert.equal(r.stdout,'');assert.equal(r.stderr,'Private challenge exchange unavailable\n');
 }
});
