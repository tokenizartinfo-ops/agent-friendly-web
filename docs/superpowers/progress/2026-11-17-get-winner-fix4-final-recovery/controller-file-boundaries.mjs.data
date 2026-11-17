import * as disk from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname,join,resolve } from 'node:path';

function requireMatch(condition) {
 if(!condition)throw new Error('AFW_FILE_INTEGRITY');
}
export async function readPinned(root,pin) {
 const file=join(root,pin.path);
 requireMatch((await disk.lstat(file)).isFile()&&await disk.realpath(file)===resolve(file));
 const data=await disk.readFile(file);
 const sha=createHash('sha256').update(data).digest('hex');
 const git=createHash('sha1').update('blob '+data.length+'\0').update(data).digest('hex');
 requireMatch(data.length===pin.bytes&&git===pin.blob&&sha===pin.sha256);
 return data;
}
export async function checkCustodyInputs(root,pins) {
 await readPinned(root,{...pins.guard,path:'c2-source-custody-guard.mjs'});
 await readPinned(root,{...pins.preflight,path:'c2-source-custody-preflight.mjs'});
}
export async function withCustodyInputs(root,pins,run) {
 await checkCustodyInputs(root,pins);
 const result=await run();
 await checkCustodyInputs(root,pins);
 return result;
}
export async function removeOwnedTemp(temp,root,initial,uid,gid,verified,fs=disk) {
 const stat=await fs.lstat(temp);
 requireMatch(initial&&dirname(temp)===root&&await fs.realpath(temp)===temp&&stat.isDirectory()&&
  stat.dev===initial.dev&&stat.ino===initial.ino&&stat.uid===uid&&stat.gid===gid);
 verified();
 await fs.rm(temp,{recursive:true,force:false});
 try { await fs.lstat(temp); }
 catch(error) { if(error?.code==='ENOENT')return; throw error; }
 throw new Error('AFW_OWNED_TEMP_REMAINS');
}
export async function publishBounded(file,bytes,cap,checkTime,fs=disk) {
 requireMatch(bytes.length<=cap);
 checkTime();
 const dir=dirname(file);
 await fs.mkdir(dir,{recursive:true});
 requireMatch(await fs.realpath(dir)===dir);
 const staging=file+'.partial';
 const handle=await fs.open(staging,'wx',0o600);
 let linked=false;
 try {
  try {
   try { await handle.writeFile(bytes); }
   finally { await handle.close(); }
   requireMatch((await fs.readFile(staging)).equals(bytes));
   checkTime();
   await fs.link(staging,file);
   linked=true;
   requireMatch((await fs.readFile(file)).equals(bytes));
  } finally {
   await fs.unlink(staging);
  }
  checkTime();
 } catch(error) {
  if(linked)await fs.unlink(file);
  throw error;
 }
}
