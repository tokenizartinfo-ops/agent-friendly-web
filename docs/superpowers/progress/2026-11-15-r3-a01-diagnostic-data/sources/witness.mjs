// Pre-Native absence only. No sidecar read, deletion, retry or Native invocation.
import {openSync,closeSync,fstatSync,constants} from 'node:fs';
let fd,leaf;
try{
 const flags=constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW;
 fd=openSync('.',flags);
 for(const part of ['output','finite-budget','readonly','R3']){
  const s=fstatSync(fd);if(!s.isDirectory()||s.uid!==process.getuid()||(s.mode&0o022)!==0)throw 1;
  let next;try{next=openSync('/proc/self/fd/'+fd+'/'+part,flags);}catch(e){if(e?.code==='ENOENT'){process.exitCode=0;throw 'absent';}throw e;}closeSync(fd);fd=next;
 }
 const last=fstatSync(fd);if(!last.isDirectory()||last.uid!==process.getuid()||(last.mode&0o022)!==0)throw 1;
 try{leaf=openSync('/proc/self/fd/'+fd+'/r3-existing-sample.json',constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);process.exitCode=1;}catch(e){if(e?.code==='ENOENT')process.exitCode=0;else throw e;}
}catch(e){if(e!=='absent')process.exitCode=1;}finally{if(leaf!==undefined)closeSync(leaf);if(fd!==undefined)closeSync(fd);}
