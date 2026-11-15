import {openSync,fstatSync,readSync,closeSync,constants} from 'node:fs';
import {TextDecoder} from 'node:util';
const invalid=()=>{const e=new Error();e.code='AFW_INVALID';return e;};
const uid=process.getuid(),dirFlags=constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW;
function checked(fd,directory){const s=fstatSync(fd);if((directory?!s.isDirectory():!s.isFile())||s.uid!==uid||(s.mode&0o022)!==0||(!directory&&(s.nlink!==1||(s.mode&0o077)!==0)))throw invalid();return s;}
export function readFixed(base,parts,max){
 let fd,leaf;
 try{fd=openSync(base,dirFlags);checked(fd,true);for(const part of parts.slice(0,-1)){if(!/^[a-zA-Z0-9.-]+$/.test(part))throw invalid();const next=openSync('/proc/self/fd/'+fd+'/'+part,dirFlags);try{checked(next,true);}catch(e){closeSync(next);throw e;}closeSync(fd);fd=next;}
 leaf=openSync('/proc/self/fd/'+fd+'/'+parts.at(-1),constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);const before=checked(leaf,false);if(before.size>max)throw invalid();
 const out=Buffer.alloc(max+1);let offset=0;while(offset<out.length){const n=readSync(leaf,out,offset,out.length-offset,null);if(n===0)break;offset+=n;}const after=checked(leaf,false);
 if(offset>max||offset!==before.size||before.dev!==after.dev||before.ino!==after.ino||before.size!==after.size||before.mtimeMs!==after.mtimeMs||before.ctimeMs!==after.ctimeMs)throw invalid();
 // ignoreBOM:true PRESERVES U+FEFF; ASCII/canonical receivers must reject it.
 try{return new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(out.subarray(0,offset));}catch{throw invalid();}
 }finally{if(leaf!==undefined)closeSync(leaf);if(fd!==undefined)closeSync(fd);}
}
export function jsonFixed(base,parts,max){const raw=readFixed(base,parts,max),v=JSON.parse(raw);if(JSON.stringify(v)!==raw)throw invalid();return v;}
