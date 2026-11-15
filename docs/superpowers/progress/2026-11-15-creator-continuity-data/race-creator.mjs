// Own synthetic parent for the pre-arm race. No public process data.
import {openSync,closeSync,constants,readFileSync,writeSync,fstatSync} from 'node:fs';
import {spawn} from 'node:child_process';
if(!fstatSync(8).isFIFO())throw 1;
const stat=readFileSync('/proc/self/stat','ascii'),parts=stat.slice(stat.lastIndexOf(')')+2).split(' ');
writeSync(7,JSON.stringify({kind:'creator',pid:process.pid,ppid:process.ppid,start:parts[19]})+'\n');
const creator=openSync('/proc/thread-self',constants.O_RDONLY|constants.O_DIRECTORY);
try{const child=spawn('/usr/bin/python3',['-I','-S','/proc/self/fd/5','node-witness'],{env:process.env,stdio:[8,'ignore','ignore',3,creator,5,6,7]});child.on('error',()=>{process.exitCode=1;});}finally{closeSync(creator);}
await new Promise(()=>{});
