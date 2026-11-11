import {createCipheriv,createDecipheriv,createHash,randomBytes} from 'node:crypto';
import {constants} from 'node:fs';
import {open,opendir,lstat,mkdir,rmdir,unlink} from 'node:fs/promises';
import {resolve,dirname,basename,sep} from 'node:path';
import {Readable} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import {createGzip,createGunzip} from 'node:zlib';

const MiB=1024*1024;
const MAX_FILES=4096,MAX_NATIVE=512*MiB,MAX_JSONL=768*MiB,MAX_ENVELOPE=128*MiB;
const MAX_RECORD=128*1024,CHUNK=65536,MAX_HEADER=4096;
const PURPOSE='afw.finite-checkpoint-custody.syn.v1';
const REPOSITORY='tokenizartinfo-ops/agent-friendly-web',REF='refs/heads/feat/finite-native-cleanup-20261101';
const PUBLIC_NAMES=['envelope.bin','manifest.json','receipt.json'];
const DIRECTORY=constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW;
const REGULAR=constants.O_RDONLY|constants.O_NONBLOCK|constants.O_NOFOLLOW;
const utf8=value=>Buffer.from(JSON.stringify(value),'utf8');
const sha=value=>createHash('sha256').update(value).digest('hex');
const numeric=(value,max)=>Number.isSafeInteger(value)&&value>=0&&value<=max;
const fail=code=>{throw new CustodyError(code);};
class CustodyError extends Error{
 constructor(code){super('custody_'+code);this.name='CustodyError';}
}
function requireValue(ok,code='format'){if(!ok)fail(code);}
function fields(value,keys){
 requireValue(value!==null&&typeof value==='object'&&!Array.isArray(value));
 const descriptors=Object.getOwnPropertyDescriptors(value);
 requireValue(Reflect.ownKeys(descriptors).length===keys.length&&keys.every(k=>Object.hasOwn(descriptors,k)&&Object.hasOwn(descriptors[k],'value')&&descriptors[k].enumerable));
}
function parse(bytes){
 const string=bytes.toString('utf8');requireValue(Buffer.from(string).equals(bytes));
 let value;try{value=JSON.parse(string);}catch{fail('format');}
 // Canonical records prevent duplicate keys and ambiguous string representations.
 requireValue(utf8(value).equals(bytes));return value;
}
function expectedContext(c){
 fields(c,['purpose','repository','ref','sourceSha','runId','runAttempt','kind']);
 requireValue(c.purpose===PURPOSE&&c.repository===REPOSITORY&&c.ref===REF,'context');
 requireValue(typeof c.sourceSha==='string'&&c.sourceSha.length===40&&/^[0-9a-f]{40}$/.test(c.sourceSha)&&typeof c.runId==='string'&&c.runId.trim()===c.runId&&/^[1-9][0-9]*$/.test(c.runId)&&c.runAttempt===1,'context');
 requireValue(['checkpoint','positive-result','producer-failure','consumer-failure'].includes(c.kind),'context');
 return {purpose:PURPOSE,repository:REPOSITORY,ref:REF,sourceSha:c.sourceSha,runId:c.runId,runAttempt:1,kind:c.kind};
}
function keyFromEnvironment(){
 const hex=process.env.AFW_SYN_CHECKPOINT_KEY;
 requireValue(typeof hex==='string'&&hex.length===64&&/^[0-9a-fA-F]{64}$/.test(hex),'key');
 return Buffer.from(hex,'hex');
}
async function guarded(fn){
 let key;
 try{key=keyFromEnvironment();return await fn(key);}
 catch(error){if(error instanceof CustodyError)throw error;fail('io');}
 finally{key?.fill(0);}
}
function pathParts(path){
 requireValue(typeof path==='string'&&path.length>0&&Buffer.from(path).toString('utf8')===path,'path');
 const parts=path.split('/');
 requireValue(parts.every(p=>p!==''&&p!=='.'&&p!=='..'&&!p.includes('\\')&&!p.includes('\0')&&!/^[A-Za-z]:/.test(p)&&Buffer.byteLength(p)<=255),'path');
 return parts;
}
const order=(a,b)=>Buffer.compare(Buffer.from(a),Buffer.from(b));
function separate(one,two){
 requireValue(typeof one==='string'&&typeof two==='string'&&one&&two,'path');
 const a=resolve(one),b=resolve(two);
 requireValue(a!==b&&a!=='/'&&b!=='/'&&!b.startsWith(a+sep)&&!a.startsWith(b+sep),'path');
}
// Linux hosted runners: anchor every lookup in an open directory. A later
// rename or symlink swap cannot redirect a child lookup into a different tree.
const at=(handle,name)=>'/proc/self/fd/'+handle.fd+(name?'/'+name:'');
async function withDirs(root,parts,operation,onMissing){
 let parent=root,owned=null;
 try{
  for(let i=0;i<parts.length;i++){
   const name=parts[i],p=at(parent,name);let child;
   try{child=await open(p,DIRECTORY);}
   catch(error){
    if(error.code!=='ENOENT'||!onMissing)throw error;
    await mkdir(p,{mode:0o700});
    const created=await lstat(p,{bigint:true});
    onMissing(parts.slice(0,i+1),created);
    child=await open(p,DIRECTORY);
    requireValue(sameFile(created,await child.stat({bigint:true})),'changed');
   }
   if(owned)await owned.close();parent=child;owned=child;
  }
  return await operation(parent);
 }finally{if(owned)await owned.close();}
}
async function fromAbsolute(path,fn){
 requireValue(process.platform==='linux','platform');
 const root=await open('/',DIRECTORY);
 try{return await withDirs(root,resolve(path).split('/').filter(Boolean),fn);}
 finally{await root.close();}
}
const sameFile=(a,b)=>a.dev===b.dev&&a.ino===b.ino;
const unchanged=(a,b)=>sameFile(a,b)&&a.size===b.size&&a.mtimeNs===b.mtimeNs&&a.ctimeNs===b.ctimeNs;
async function regular(parent,leaf,max,fn){
 const h=await open(at(parent,leaf),REGULAR);
 try{
  const stat=await h.stat({bigint:true});
  requireValue(stat.isFile()&&stat.nlink===1n,'file');
  requireValue(stat.size>=0n&&stat.size<=BigInt(max),'limit');
  const result=await fn(h,stat);
  requireValue(unchanged(stat,await h.stat({bigint:true})),'changed');
  return result;
 }finally{await h.close();}
}
async function* chunks(handle,size){
 let offset=0;
 while(offset<size){
  const b=Buffer.allocUnsafe(Math.min(CHUNK,size-offset));
  const {bytesRead}=await handle.read(b,0,b.length,offset);
  requireValue(bytesRead>0,'changed');offset+=bytesRead;yield b.subarray(0,bytesRead);
 }
}
async function readSmall(parent,name,max){
 return regular(parent,name,max,async(h,stat)=>{
  const parts=[];for await(const chunk of chunks(h,Number(stat.size)))parts.push(chunk);
  return Buffer.concat(parts,Number(stat.size));
 });
}
async function listDirectory(root,hashFiles){
 const files=[];let total=0;
 async function walk(parent,prefix){
  const entries=await opendir(at(parent),{encoding:'buffer'});
  for await(const e of entries){
   const raw=Buffer.isBuffer(e.name)?e.name:Buffer.from(e.name);
   const name=raw.toString('utf8');requireValue(Buffer.from(name).equals(raw),'path');
   pathParts(name);const path=prefix?prefix+'/'+name:name;
   const st=await lstat(at(parent,name),{bigint:true});
   if(st.isDirectory()){
    await withDirs(parent,[name],async dir=>{requireValue(sameFile(st,await dir.stat({bigint:true})),'changed');await walk(dir,path);});
    continue;
   }
   requireValue(st.isFile()&&st.nlink===1n,'file');
   requireValue(files.length<MAX_FILES&&st.size<=BigInt(MAX_NATIVE-total),'limit');
   total+=Number(st.size);const entry={path,bytes:Number(st.size),stat:st};
   if(hashFiles){
    entry.sha256=await regular(parent,name,MAX_NATIVE,async(h,before)=>{
     requireValue(unchanged(st,before),'changed');const digest=createHash('sha256');
     for await(const chunk of chunks(h,entry.bytes))digest.update(chunk);
     return digest.digest('hex');
    });
   }
   files.push(entry);
  }
 }
 await walk(root,'');files.sort((a,b)=>order(a.path,b.path));
 return {files,total};
}
const line=value=>{const b=Buffer.concat([utf8(value),Buffer.from('\n')]);requireValue(b.length<=MAX_RECORD,'limit');return b;};
async function* sourceRecords(root,inventory,context){
 yield line({type:'header',version:1,context});
 for(const file of inventory.files){
  yield line({type:'file',path:file.path,bytes:file.bytes,sha256:file.sha256});
  const parts=pathParts(file.path),leaf=parts.pop();
  const h=await withDirs(root,parts,parent=>open(at(parent,leaf),REGULAR));
  let n=0;
  try{
   const stat=await h.stat({bigint:true});requireValue(stat.isFile()&&stat.nlink===1n&&unchanged(stat,file.stat),'changed');
   const digest=createHash('sha256');
   for await(const chunk of chunks(h,file.bytes)){n++;digest.update(chunk);yield line({type:'data',data:chunk.toString('base64')});}
   requireValue(digest.digest('hex')===file.sha256&&unchanged(stat,await h.stat({bigint:true})),'changed');
  }finally{await h.close();}
  yield line({type:'file-end',chunks:n});
 }
 const after=await listDirectory(root,false);
 requireValue(after.total===inventory.total&&after.files.length===inventory.files.length&&after.files.every((f,i)=>f.path===inventory.files[i].path&&unchanged(f.stat,inventory.files[i].stat)),'changed');
 yield line({type:'end',files:inventory.files.length,bytes:inventory.total});
}
async function encrypt(records,context,key){
 const iv=randomBytes(12);
 const header=utf8({version:1,context,algorithm:'AES-256-GCM',compression:'gzip',iv:iv.toString('base64')});
 requireValue(header.length<=MAX_HEADER,'limit');
 const size=Buffer.alloc(4);size.writeUInt32BE(header.length);
 const cipher=createCipheriv('aes-256-gcm',key,iv,{authTagLength:16});cipher.setAAD(header);
 const parts=[size,header];let length=4+header.length+16;
 async function* bounded(){let n=0;for await(const row of records){n+=row.length;requireValue(n<=MAX_JSONL,'limit');yield row;}}
 await pipeline(Readable.from(bounded(),{objectMode:false}),createGzip(),cipher,async stream=>{
  for await(const chunk of stream){length+=chunk.length;requireValue(length<=MAX_ENVELOPE,'limit');parts.push(chunk);}
 });
 parts.push(cipher.getAuthTag());return Buffer.concat(parts,length);
}
function base64(text,max){
 requireValue(typeof text==='string'&&text.length<=4*Math.ceil(max/3),'format');
 const b=Buffer.from(text,'base64');requireValue(b.length<=max&&b.toString('base64')===text,'format');return b;
}
function authenticate(envelope,context,key){
 requireValue(envelope.length<=MAX_ENVELOPE&&envelope.length>20,'limit');
 const n=envelope.readUInt32BE(0);requireValue(n>0&&n<=MAX_HEADER&&4+n+16<envelope.length);
 const header=envelope.subarray(4,4+n),h=parse(header);
 fields(h,['version','context','algorithm','compression','iv']);
 requireValue(h.version===1&&h.algorithm==='AES-256-GCM'&&h.compression==='gzip');
 requireValue(utf8(expectedContext(h.context)).equals(utf8(context)),'context');
 const iv=base64(h.iv,12);requireValue(iv.length===12);
 try{
  const decipher=createDecipheriv('aes-256-gcm',key,iv,{authTagLength:16});
  decipher.setAAD(header);decipher.setAuthTag(envelope.subarray(-16));
  const compressed=decipher.update(envelope.subarray(n+4,-16));
  // No inflater or filesystem writer sees bytes until final authenticates them.
  const tail=decipher.final();return tail.length?Buffer.concat([compressed,tail]):compressed;
 }catch{fail('authentication');}
}

async function inspectPacket(compressed,context,writer){
 const inventory=[],paths=new Set();let current=null,header=false,ended=false,total=0;
 async function record(raw){
  requireValue(!ended);const row=parse(raw);
  if(!header){
   fields(row,['type','version','context']);
   requireValue(row.type==='header'&&row.version===1&&utf8(expectedContext(row.context)).equals(utf8(context)),'context');
   header=true;return;
  }
  if(row?.type==='file'&&!current){
   fields(row,['type','path','bytes','sha256']);const parts=pathParts(row.path);
   requireValue(inventory.length<MAX_FILES&&numeric(row.bytes,MAX_NATIVE-total),'limit');
   requireValue(typeof row.sha256==='string'&&/^[0-9a-f]{64}$/.test(row.sha256));
   requireValue(!inventory.length||order(inventory[inventory.length-1].path,row.path)<0,'path');
   let parent='';for(const name of parts.slice(0,-1)){parent=parent?parent+'/'+name:name;requireValue(!paths.has(parent),'path');}
   requireValue(!paths.has(row.path),'path');paths.add(row.path);
   current={path:row.path,bytes:row.bytes,sha256:row.sha256,digest:createHash('sha256'),seen:0,chunks:0,handle:null};
   if(writer)current.handle=await writer.create(row.path);
   return;
  }
  if(row?.type==='data'&&current){
   fields(row,['type','data']);const chunk=base64(row.data,CHUNK);
   requireValue(chunk.length>0&&current.seen+chunk.length<=current.bytes,'size');
   current.digest.update(chunk);current.seen+=chunk.length;current.chunks++;
   if(current.handle){
    let offset=0;while(offset<chunk.length){
     const {bytesWritten}=await current.handle.write(chunk,offset,chunk.length-offset,null);
     requireValue(bytesWritten>0,'io');offset+=bytesWritten;
    }
   }
   return;
  }
  if(row?.type==='file-end'&&current){
   fields(row,['type','chunks']);requireValue(current.seen===current.bytes&&row.chunks===current.chunks&&current.digest.digest('hex')===current.sha256,'integrity');
   if(current.handle)await current.handle.close();
   total+=current.bytes;inventory.push({path:current.path,bytes:current.bytes,sha256:current.sha256});current=null;return;
  }
  if(row?.type==='end'&&!current){
   fields(row,['type','files','bytes']);requireValue(row.files===inventory.length&&row.bytes===total,'size');ended=true;return;
  }
  fail('format');
 }
 try{
  await pipeline(Readable.from([compressed],{objectMode:false}),createGunzip(),async stream=>{
   let expanded=0,pending=0,pieces=[];
   for await(const block of stream){
    expanded+=block.length;requireValue(expanded<=MAX_JSONL,'limit');
    let start=0;
    while(start<block.length){
     const nl=block.indexOf(10,start),end=nl<0?block.length:nl,part=block.subarray(start,end);
     pending+=part.length;requireValue(pending+1<=MAX_RECORD,'limit');if(part.length)pieces.push(part);
     if(nl<0)break;
     requireValue(pending>0);const raw=pieces.length===1?pieces[0]:Buffer.concat(pieces,pending);
     await record(raw);pieces=[];pending=0;start=nl+1;
    }
   }
   requireValue(pending===0&&header&&ended&&!current,'format');
  });
 }finally{if(current?.handle)await current.handle.close();}
 return {files:inventory,total};
}
const publicEntry=(path,data)=>({path,bytes:data.length,sha256:sha(data)});
function publicReceipt(context,envelope,inventory){
 return {purpose:'afw.finite-checkpoint-custody-receipt.syn.v1',context,envelopeBytes:envelope.length,envelopeSha256:sha(envelope),fileCount:inventory.files.length,totalBytes:inventory.total,authenticated:true,innerInventoryVerified:true,operationalReadiness:false,completePackage:false,PCoff:false};
}
function publicManifest(context,envelope,receipt){
 return {purpose:'afw.finite-checkpoint-custody-manifest.syn.v1',context,files:[publicEntry('envelope.bin',envelope),publicEntry('receipt.json',receipt)]};
}
function compareInventory(actual,expected){
 requireValue(actual.total===expected.total&&actual.files.length===expected.files.length,'integrity');
 for(let i=0;i<actual.files.length;i++){
  const a=actual.files[i],b=expected.files[i];
  requireValue(a.path===b.path&&a.bytes===b.bytes&&a.sha256===b.sha256,'integrity');
 }
}
async function verifyPublic(dir,context,key){
 const names=[];const listing=await opendir(at(dir));
 for await(const e of listing){requireValue(names.length<3&&PUBLIC_NAMES.includes(e.name)&&e.isFile(),'staging');names.push(e.name);}
 requireValue(names.sort().join('|')===PUBLIC_NAMES.join('|'),'staging');
 const envelope=await readSmall(dir,'envelope.bin',MAX_ENVELOPE);
 const receipt=await readSmall(dir,'receipt.json',MAX_RECORD),manifest=await readSmall(dir,'manifest.json',MAX_RECORD);
 requireValue(manifest.equals(utf8(publicManifest(context,envelope,receipt))),'integrity');
 const compressed=authenticate(envelope,context,key);
 const inventory=await inspectPacket(compressed,context);
 const checked=publicReceipt(context,envelope,inventory);
 requireValue(receipt.equals(utf8(checked)),'integrity');
 return {compressed,inventory,receipt:checked};
}
async function removeIfOwned(parent,name,id){
 let current;try{current=await lstat(at(parent,name),{bigint:true});}catch(error){if(error.code==='ENOENT')return;throw error;}
 if(!sameFile(current,id))return;
 if(id.isDirectory())await rmdir(at(parent,name));else await unlink(at(parent,name));
}
// The caller supplies private runner parents. mkdir and O_EXCL prevent overwrites,
// and rollback targets only inodes created by this invocation, without recursive deletion.
async function exclusiveDirectory(target,operation){
 return fromAbsolute(dirname(resolve(target)),async parent=>{
  const leaf=basename(resolve(target));requireValue(leaf&&leaf!=='.'&&leaf!=='..','path');
  try{await mkdir(at(parent,leaf),{mode:0o700});}catch(error){if(error.code==='EEXIST')fail('destination');throw error;}
  const id=await lstat(at(parent,leaf),{bigint:true}),owned=[];let root;
  try{
   root=await open(at(parent,leaf),DIRECTORY);requireValue(sameFile(id,await root.stat({bigint:true})),'changed');
   const writer={create:async path=>{
    const parts=pathParts(path),name=parts.pop();
    return withDirs(root,parts,async folder=>{
     const h=await open(at(folder,name),constants.O_WRONLY|constants.O_CREAT|constants.O_EXCL|constants.O_NOFOLLOW,0o600);
     try{owned.push({parts:[...parts,name],id:await h.stat({bigint:true})});return h;}catch(error){await h.close();throw error;}
    },(parts,id)=>owned.push({parts,id}));
   }};
   return await operation(root,writer);
  }catch(error){
   let cleanupFailed=false;
   if(root)for(const obj of owned.reverse()){
    const parts=obj.parts.slice(),name=parts.pop();
    try{await withDirs(root,parts,p=>removeIfOwned(p,name,obj.id));}catch{cleanupFailed=true;}
   }
   try{await removeIfOwned(parent,leaf,id);}catch{cleanupFailed=true;}
   if(cleanupFailed)fail('cleanup');throw error;
  }finally{await root?.close();}
 });
}
async function writeClosed(writer,path,data){
 const h=await writer.create(path);try{await h.writeFile(data);}finally{await h.close();}
}
export async function sealDirectory(options){
 return guarded(async key=>{
  fields(options,['sourceDir','stagingDir','context']);
  const {sourceDir,stagingDir}=options,context=expectedContext(options.context);separate(sourceDir,stagingDir);
  return fromAbsolute(sourceDir,async source=>{
   const original=await listDirectory(source,true);
   const envelope=await encrypt(sourceRecords(source,original,context),context,key);
   const checked=await inspectPacket(authenticate(envelope,context,key),context);
   compareInventory(checked,original);
   const receipt=publicReceipt(context,envelope,checked),body=utf8(receipt);
   return exclusiveDirectory(stagingDir,async(dir,writer)=>{
    await writeClosed(writer,'envelope.bin',envelope);await writeClosed(writer,'receipt.json',body);
    await writeClosed(writer,'manifest.json',utf8(publicManifest(context,envelope,body)));
    // Verify the actual three on-disk artifacts before a caller can publish them.
    const readback=await verifyPublic(dir,context,key);compareInventory(readback.inventory,original);
    return readback.receipt;
   });
  });
 });
}
export async function openDirectory(options){
 return guarded(async key=>{
  fields(options,['stagingDir','destinationDir','context']);
  const {stagingDir,destinationDir}=options,context=expectedContext(options.context);separate(stagingDir,destinationDir);
  const checked=await fromAbsolute(stagingDir,dir=>verifyPublic(dir,context,key));
  // The first complete, bounded validation succeeded. Restore only from the
  // same authenticated compressed bytes; do not reopen the public input paths.
  return exclusiveDirectory(destinationDir,async(dir,writer)=>{
   const restored=await inspectPacket(checked.compressed,context,writer);
   compareInventory(restored,checked.inventory);
   compareInventory(await listDirectory(dir,true),checked.inventory);
   return checked.receipt;
  });
 });
}
function githubContext(kind){
 requireValue(process.env.GITHUB_RUN_ATTEMPT==='1','context');
 return expectedContext({purpose:PURPOSE,repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind});
}
async function preflight(context){
 return guarded(async key=>{
  const marker=randomBytes(16),file={path:'marker',bytes:marker.length,sha256:sha(marker)};
  const rows=[{type:'header',version:1,context},{type:'file',...file},{type:'data',data:marker.toString('base64')},{type:'file-end',chunks:1},{type:'end',files:1,bytes:marker.length}];
  const envelope=await encrypt(rows.map(line),context,key);
  const restored=await inspectPacket(authenticate(envelope,context,key),context);
  compareInventory(restored,{files:[file],total:marker.length});
 });
}
if(process.argv[1]&&resolve(process.argv[1])===import.meta.filename){
 try{
  const [cmd,kind,first,second]=process.argv.slice(2),context=githubContext(kind);
  if(cmd==='key-preflight'&&process.argv.length===4){await preflight(context);process.stdout.write('custody_key_verified\n');}
  else if(cmd==='seal'&&process.argv.length===6){const receipt=await sealDirectory({sourceDir:first,stagingDir:second,context});process.stdout.write(JSON.stringify(receipt)+'\n');}
  else if(cmd==='open'&&process.argv.length===6){const receipt=await openDirectory({stagingDir:first,destinationDir:second,context});process.stdout.write(JSON.stringify(receipt)+'\n');}
  else fail('command');
 }catch(error){process.stderr.write((error instanceof CustodyError?error.message:'custody_io')+'\n');process.exitCode=1;}
}
