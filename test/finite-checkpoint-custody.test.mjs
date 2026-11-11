import test from 'node:test';
import assert from 'node:assert/strict';
import {createCipheriv,createHash,randomBytes} from 'node:crypto';
import {mkdtemp,mkdir,writeFile,readFile,readdir,rm,symlink,link,stat,truncate,lstat} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {createServer} from 'node:net';
import {fileURLToPath} from 'node:url';

const helper=new URL('./fixtures/finite-checkpoint-custody.mjs',import.meta.url);
const purpose='afw.finite-checkpoint-custody.syn.v1';
const context={purpose,repository:'tokenizartinfo-ops/agent-friendly-web',ref:'refs/heads/feat/finite-native-cleanup-20261101',sourceSha:'b'.repeat(40),runId:'17',runAttempt:1,kind:'checkpoint'};
const marker='SYN-PRIVATE-EVIDENCE-MARKER';
const fileNames=['envelope.json','manifest.json','receipt.json'];
const bytes=v=>Buffer.from(JSON.stringify(v));
const sha=v=>createHash('sha256').update(v).digest('hex');
const entry=(path,data)=>({path,bytes:data.length,sha256:sha(data),data:data.toString('base64')});
const nonexistent=async path=>{try{await lstat(path);return false;}catch(error){if(error.code==='ENOENT')return true;throw error;}};
const safeError=error=>error instanceof Error&&/^custody_[a-z_]+$/.test(error.message)&&!error.message.includes(marker);

// Independently construct a SYN packet under the test's ephemeral key.
// These path cases are input grammar checks; no external path is used by the fixture.
function encodePacket(inner,key){
 const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',key,iv,{authTagLength:16});
 cipher.setAAD(bytes(context));
 const ciphertext=Buffer.concat([cipher.update(bytes(inner)),cipher.final()]);
 return {version:1,context,algorithm:'AES-256-GCM',iv:iv.toString('base64'),tag:cipher.getAuthTag().toString('base64'),ciphertext:ciphertext.toString('base64')};
}
async function stagePacket(folder,envelope,counts={fileCount:1,totalBytes:1},mutateReceipt=()=>{}){
 await mkdir(folder,{mode:0o700});
 const seal=bytes(envelope);
 const receipt={purpose:'afw.finite-checkpoint-custody-receipt.syn.v1',context,envelopeBytes:seal.length,envelopeSha256:sha(seal),...counts,authenticated:true,innerInventoryVerified:true,operationalReadiness:false,completePackage:false,PCoff:false};
 mutateReceipt(receipt);
 const rec=bytes(receipt);
 const manifest={purpose:'afw.finite-checkpoint-custody-manifest.syn.v1',context,files:[{path:'envelope.json',bytes:seal.length,sha256:sha(seal)},{path:'receipt.json',bytes:rec.length,sha256:sha(rec)}]};
 await Promise.all([writeFile(join(folder,'envelope.json'),seal),writeFile(join(folder,'receipt.json'),rec),writeFile(join(folder,'manifest.json'),bytes(manifest))]);
}

test('SYN directory custody contract',async t=>{
 let api;
 try{api=await import(helper.href);}catch(error){if(error.code!=='ERR_MODULE_NOT_FOUND'||error.url!==helper.href)throw Error('unexpected custody import failure');}
 assert.equal(typeof api?.sealDirectory,'function','missing custody API');
 assert.equal(typeof api?.openDirectory,'function','missing custody API');
 const sandbox=await mkdtemp(join(tmpdir(),'afw-custody-syn-'));
 const key=randomBytes(32),otherKey=randomBytes(32),keyEnv='AFW_SYN_CHECKPOINT_KEY';
 const prior=process.env[keyEnv];process.env[keyEnv]=key.toString('hex');
 t.after(async()=>{if(prior===undefined)delete process.env[keyEnv];else process.env[keyEnv]=prior;key.fill(0);otherKey.fill(0);await rm(sandbox,{recursive:true,force:true});});
 const source=join(sandbox,'private'),stage=join(sandbox,'public'),sub=join(source,'datos');
 await mkdir(sub,{recursive:true,mode:0o700});
 const original=Buffer.concat([Buffer.from([0,255,1]),Buffer.from(marker),randomBytes(600)]);
 await writeFile(join(sub,'obra-ñ.bin'),original);await writeFile(join(source,'vacío'),Buffer.alloc(0));
 const seal=(sourceDir,stagingDir,c=context)=>api.sealDirectory({sourceDir,stagingDir,context:c});
 const open=(stagingDir,destinationDir,c=context)=>api.openDirectory({stagingDir,destinationDir,context:c});
 const rejectNew=async(operation,dest)=>{await assert.rejects(operation,safeError);assert(await nonexistent(dest));};

 await t.test('closed staging, fresh IV and byte-exact authenticated roundtrip',async()=>{
  const rec=await seal(source,stage);
  assert.equal(rec.authenticated,true);assert.equal(rec.innerInventoryVerified,true);
  assert.equal(rec.fileCount,2);assert.equal(rec.totalBytes,original.length);
  for(const flag of ['operationalReadiness','completePackage','PCoff'])assert.equal(rec[flag],false);
  assert.deepEqual((await readdir(stage)).sort(),fileNames);
  const content=await Promise.all(fileNames.map(name=>readFile(join(stage,name))));
  for(const item of content){assert(!item.includes(marker));assert(!item.includes('obra-ñ'));assert(!item.includes(key.toString('hex')));}
  const envelope=JSON.parse(content[0]);assert.deepEqual(Object.keys(envelope).sort(),['algorithm','ciphertext','context','iv','tag','version']);assert.equal(Buffer.from(envelope.iv,'base64').length,12);assert.equal(Buffer.from(envelope.tag,'base64').length,16);
  const alternate=join(sandbox,'second');await seal(source,alternate);
  assert.notEqual(envelope.iv,JSON.parse(await readFile(join(alternate,'envelope.json'))).iv);
  const dest=join(sandbox,'restored');const receipt=await open(stage,dest);assert.deepEqual(receipt,rec);
  assert((await readFile(join(dest,'datos','obra-ñ.bin'))).equals(original));assert.equal((await readFile(join(dest,'vacío'))).length,0);
  assert.equal((await stat(dest)).mode&0o777,0o700);assert.equal((await stat(join(dest,'datos'))).mode&0o777,0o700);assert.equal((await stat(join(dest,'datos','obra-ñ.bin'))).mode&0o777,0o600);
 });

 await t.test('wrong key, absent key and every different context fail without output',async()=>{
  const dest=join(sandbox,'bad-context');
  for(const secret of [undefined,'',key.toString('hex').slice(2),otherKey.toString('hex')]){
   try{if(secret===undefined)delete process.env[keyEnv];else process.env[keyEnv]=secret;await rejectNew(()=>open(stage,dest),dest);}
   finally{process.env[keyEnv]=key.toString('hex');}
  }
  for(const changes of [{sourceSha:'a'.repeat(40)},{runId:'18'},{runAttempt:2},{kind:'positive-result'},{repository:'unrelated/repo'},{ref:'refs/tags/fixture'},{extra:true}]){
   await rejectNew(()=>open(stage,dest,{...context,...changes}),dest);
  }
 });

 await t.test('independent packet accepted and tampered IV, tag or ciphertext rejected',async()=>{
  const data=Buffer.from([1]),inner={version:1,files:[entry('sample',data)]},envelope=encodePacket(inner,key);
  const independent=join(sandbox,'independent');await stagePacket(independent,envelope);
  await open(independent,join(sandbox,'independent-open'));
  for(const field of ['iv','tag','ciphertext']){
   const mutated=Buffer.from(envelope[field],'base64');mutated[0]^=1;
   const folder=join(sandbox,'tamper-'+field),dest=folder+'-open';
   await stagePacket(folder,{...envelope,[field]:mutated.toString('base64')});await rejectNew(()=>open(folder,dest),dest);
  }
 });

 await t.test('authenticated invalid internal records fail before any output',async()=>{
  const ordinary=entry('sample',Buffer.from([1])),other=entry('other',Buffer.alloc(0));
  const invalidPaths=['','/','C:example','x\\y','a//b','./a','inside/../inside','a\0b'];
  const cases=[
   ...invalidPaths.map(path=>[other,{...ordinary,path}]),
   [ordinary,ordinary],[ordinary,{...other,path:'sample/child'}],
   [ordinary,{...other,path:'other'}], // out of order
   [{...ordinary,sha256:'0'.repeat(64)}],[{...ordinary,bytes:2}],
   [{...ordinary,data:'AQ'}],[{...ordinary,data:'AR=='}],
   [{...ordinary,type:'symlink'}],[{...ordinary,type:'fifo'}],
   Array.from({length:4097},(_,i)=>({...other,path:'z'+String(i).padStart(5,'0')}))
  ];
  for(const [index,files] of cases.entries()){
   const folder=join(sandbox,'inner-'+index),dest=folder+'-open';
   await stagePacket(folder,encodePacket({version:1,files},key),{fileCount:files.length,totalBytes:files.reduce((n,row)=>n+row.bytes,0)});
   await rejectNew(()=>open(folder,dest),dest);
  }
 });

 await t.test('origin links, special files and over-limit inputs are rejected',async()=>{
  const file=join(source,'vacío');
  const blocked=async(name,make)=>{
   const root=join(sandbox,'source-'+name),dest=join(sandbox,'stage-'+name);await mkdir(root);
   await make(join(root,'entry'));await rejectNew(()=>seal(root,dest),dest);
  };
  await blocked('symlink',p=>symlink(file,p));
  await blocked('hardlink',p=>link(file,p));await rm(join(sandbox,'source-hardlink','entry'));
  await blocked('large',async p=>{await writeFile(p,'');await truncate(p,64*1024*1024+1);});
  const root=join(sandbox,'socket'),dest=join(sandbox,'socket-output');await mkdir(root);
  const socket=createServer();await new Promise((resolve,reject)=>{socket.once('error',reject);socket.listen(join(root,'sock'),resolve);});
  try{await rejectNew(()=>seal(root,dest),dest);}finally{await new Promise(resolve=>socket.close(resolve));}
 });

 await t.test('closed public inventory, totals, limits and exclusive destinations',async()=>{
  const existing=join(sandbox,'existing');await mkdir(existing);await writeFile(join(existing,'preserve'),'untouched');
  await assert.rejects(()=>open(stage,existing),safeError);await assert.rejects(()=>seal(source,existing),safeError);
  assert.equal(await readFile(join(existing,'preserve'),'utf8'),'untouched');
  const nested=join(source,'public-output');await rejectNew(()=>seal(source,nested),nested);
  const unexpected=join(stage,'unexpected');await writeFile(unexpected,'x');
  const dest=join(sandbox,'unexpected-open');await rejectNew(()=>open(stage,dest),dest);await rm(unexpected);
  const envelope=encodePacket({version:1,files:[entry('sample',Buffer.from([1]))]},key);
  const folder=join(sandbox,'wrong-receipt');await stagePacket(folder,envelope,{fileCount:1,totalBytes:1},r=>{r.fileCount=2;});
  await rejectNew(()=>open(folder,dest),dest);
  const caps=join(sandbox,'too-large-envelope');await stagePacket(caps,envelope);
  await truncate(join(caps,'envelope.json'),128*1024*1024+1);await rejectNew(()=>open(caps,dest),dest);
 });

 await t.test('separate Node processes hand off sealed data and emit only fixed public output',async()=>{
  const folder=join(sandbox,'child-stage'),dest=join(sandbox,'child-output');
  const env={AFW_SYN_CHECKPOINT_KEY:key.toString('hex'),GITHUB_REPOSITORY:context.repository,GITHUB_REF:context.ref,GITHUB_SHA:context.sourceSha,GITHUB_RUN_ID:context.runId,GITHUB_RUN_ATTEMPT:'1'};
  const child=(args,e=env)=>{
   assert(!args.some(v=>v.includes(env.AFW_SYN_CHECKPOINT_KEY)));
   const run=spawnSync(process.execPath,[fileURLToPath(helper),...args],{env:e,encoding:'utf8',timeout:15000});
   const log=(run.stdout??'')+(run.stderr??'');assert(!log.includes(marker)&&!log.includes(env.AFW_SYN_CHECKPOINT_KEY)&&!log.includes(sandbox));
   return {status:run.status,log};
  };
  assert.equal(child(['key-preflight','checkpoint']).status,0);
  assert.equal(child(['seal','checkpoint',source,folder]).status,0);
  assert.equal(child(['open','checkpoint',folder,dest]).status,0);
  assert((await readFile(join(dest,'datos','obra-ñ.bin'))).equals(original));
  const denied=child(['key-preflight','checkpoint'],{...env,AFW_SYN_CHECKPOINT_KEY:''});
  assert.notEqual(denied.status,0);assert.match(denied.log,/custody_[a-z_]+/);
 });
});
