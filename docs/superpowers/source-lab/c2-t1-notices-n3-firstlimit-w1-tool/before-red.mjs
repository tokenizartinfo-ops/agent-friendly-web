// Root calls this native failure suite through the admitted R4 before-program only.
import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {discriminator,redEvidence} from './r4-controls.mjs';
const vectors=JSON.parse(await readFile(new URL('./r4-vectors.json',import.meta.url),'utf8'));
const rows=[];
for(const [index,id] of vectors.ids.beforeRed.entries()){
 test(id,{timeout:10000},async t=>{
  try{await discriminator(t,index,true);}
  catch(error){
   const evidence=redEvidence(error);
   if(!evidence||evidence.id!==id||evidence.code!==vectors.expected.before.requiredReasons[index]){
    throw Error('R4_BEFORE_SETUP_OR_ASSERTION_INVALID');
   }
   rows.push(evidence);
   throw Error(evidence.code);
  }
 });
}
after(async()=>{
 assert.deepEqual(rows.map(row=>row.id),vectors.ids.beforeRed);
 const proof={schema:'afw.c2-notices-n3.r4-before-red.v1',ledger:vectors.oldLedger,rows};
 const bytes=JSON.stringify(proof)+'\n';
 assert(Buffer.byteLength(bytes)<=4096);
 await mkdir('output',{recursive:true});
 await writeFile('output/r4-before.json',bytes,{flag:'wx'});
});
