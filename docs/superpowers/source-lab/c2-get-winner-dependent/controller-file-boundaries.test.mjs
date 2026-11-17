import test from 'node:test';
import assert from 'node:assert/strict';
import * as disk from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkCustodyInputs,withCustodyInputs,removeOwnedTemp,publishBounded } from './controller-file-boundaries.mjs';

async function workspace(run) {
 const root=await disk.realpath(await disk.mkdtemp(join(tmpdir(),'afw-defensive-test-')));
 try { return await run(root); }
 finally { await disk.rm(root,{recursive:true,force:true}); }
}
const names={guard:'c2-source-custody-guard.mjs',preflight:'c2-source-custody-preflight.mjs'};
async function custody(root) {
 const pins={};
 for(const [key,path] of Object.entries(names)) {
  const bytes=Buffer.from('fixed '+key);
  await disk.writeFile(join(root,path),bytes);
  pins[key]={path,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),
   blob:createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')};
 }
 return pins;
}
for(const key of Object.keys(names))for(const when of ['before-work','during-work','after-work-before-receipt']) {
 test('materialized '+key+' drift '+when,()=>workspace(async root=>{
  const pins=await custody(root),file=join(root,names[key]),drift=()=>disk.writeFile(file,Buffer.alloc(pins[key].bytes,0x78));
  let launches=0,accepted=false;
  if(when==='before-work')await drift();
  await assert.rejects(async()=>{
   await withCustodyInputs(root,pins,async()=>{launches++;if(when==='during-work')await drift();});
   if(when==='after-work-before-receipt')await drift();
   await checkCustodyInputs(root,pins);
   accepted=true;
  },/AFW_FILE_INTEGRITY/);
  assert.equal(launches,when==='before-work'?0:1);assert.equal(accepted,false);
 }));
}
test('both copies remain valid across repeated preflight/group boundaries',()=>workspace(async root=>{
 const pins=await custody(root),seen=[];
 for(const group of ['preflight','ordinary-model','retention','fault-transport']){
  await withCustodyInputs(root,pins,async()=>seen.push(group));await checkCustodyInputs(root,pins);
 }
 assert.equal(seen.length,4);
}));
const missing=async path=>assert.rejects(disk.lstat(path),{code:'ENOENT'});
const expires=()=>Object.assign(new Error('deadline'),{code:'TEST_DEADLINE'});
test('owned cleanup remaining pending cannot admit a subsequent publication',{timeout:3000},()=>workspace(async root=>{
 const temp=join(root,'owned'),out=join(root,'evidence');await disk.mkdir(temp);
 const initial=await disk.lstat(temp),entered=Promise.withResolvers(),release=Promise.withResolvers();
 let expired=false,verified=false,published=false;
 const fs={...disk,async rm(...args){entered.resolve();await release.promise;return disk.rm(...args);}};
 const result=(async()=>{
  await removeOwnedTemp(temp,root,initial,initial.uid,initial.gid,()=>{verified=true;},fs);
  await publishBounded(out,Buffer.from('test'),10,()=>{if(expired)throw expires();});
  published=true;
 })();
 const observed=result.then(()=>null,e=>e);
 try{
  await entered.promise;assert.equal(verified,true);assert.equal(published,false);await missing(out);
  expired=true;
 }finally{release.resolve();}
 assert.equal((await observed)?.code,'TEST_DEADLINE');await missing(temp);await missing(out);
}));
test('successful publication verifies final bytes and removes exclusively owned staging',()=>workspace(async root=>{
 const out=join(root,'evidence'),bytes=Buffer.from('unit');
 await publishBounded(out,bytes,16,()=>{});
 assert.deepEqual(await disk.readFile(out),bytes);await missing(out+'.partial');
}));
for(const phase of ['write','stage-read','link','final-read','stage-unlink']) {
 test('expiry during blocked '+phase+' excludes success',{timeout:3000},()=>workspace(async root=>{
  const out=join(root,'evidence'),entered=Promise.withResolvers(),release=Promise.withResolvers();
  let expired=false,done=false;
  const block=async name=>{if(name===phase){entered.resolve();await release.promise;}};
  const fs={...disk,
   async open(...args){const h=await disk.open(...args);return {
    writeFile:async data=>{await block('write');return h.writeFile(data);},close:()=>h.close()};},
   async readFile(path){await block(path===out?'final-read':'stage-read');return disk.readFile(path);},
   async link(...args){await block('link');return disk.link(...args);},
   async unlink(path){if(path===out+'.partial')await block('stage-unlink');return disk.unlink(path);}
  };
  const result=publishBounded(out,Buffer.from('unit'),16,()=>{if(expired)throw expires();},fs)
   .then(()=>({ok:true}),error=>({ok:false,error})).finally(()=>{done=true;});
  try {await entered.promise;assert.equal(done,false);expired=true;}
  finally{release.resolve();}
  const end=await result;assert.equal(end.ok,false);assert.equal(end.error?.code,'TEST_DEADLINE');
  await missing(out);await missing(out+'.partial');
 }));
}
