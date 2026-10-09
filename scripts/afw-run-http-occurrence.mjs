import {open} from 'node:fs/promises';
import {runAssistanceHttpOccurrenceWithHostBridge} from '../lib/assistance-occurrence-host-bridge.mjs';

// Internal own-QA executable. The host owns the metadata file and each fresh
// stdin observation; neither authorizes a server approval or selects an origin.
let result={status:'unavailable'},file;
process.stdout.on('error',()=>{process.exitCode=1;});
try{
 const args=process.argv.slice(2);
 if(args.length!==1)throw Error('Denied');
 file=await open(args[0],'r');
 const stat=await file.stat();
 if(!stat.isFile()||stat.size<1||stat.size>8192)throw Error('Denied');
 const buffer=Buffer.alloc(8193);const {bytesRead}=await file.read(buffer,0,buffer.length,0);
 if(bytesRead!==stat.size||bytesRead>8192)throw Error('Denied');
 const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(buffer.subarray(0,bytesRead)));
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==2||!Object.hasOwn(value,'manifest')||!Object.hasOwn(value,'planDigest'))throw Error('Denied');
 await file.close();file=null;
 result=await runAssistanceHttpOccurrenceWithHostBridge({manifest:value.manifest,planDigest:value.planDigest,env:process.env},{input:process.stdin,output:process.stdout});
}catch{ /* Do not emit file contents, environment, paths or exception details. */ }
finally{
 if(file)await file.close().catch(()=>{});
 process.stdin.pause();
 if(result.status!=='completed')process.exitCode=1;
 await new Promise(resolve=>{
  try{process.stdout.write(JSON.stringify({version:'afw-host-observe-v1',type:'occurrenceResult',result})+'\n',error=>{if(error)process.exitCode=1;resolve();});}
  catch{process.exitCode=1;resolve();}
 });
}
