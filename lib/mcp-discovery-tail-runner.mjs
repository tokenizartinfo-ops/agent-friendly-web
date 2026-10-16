import {openSync,writeFileSync,fsyncSync,closeSync} from 'node:fs';
import {createDiscoveryCapture} from './mcp-discovery-capture.mjs';

// Local supervision only. Closing the child never proves deletion of its remote tail.
export async function runDiscoveryTailCapture({sourceRevision,startAt,expiresAt,outputFile,createChild,signal}){
 const unavailable=()=>Error('AFW capture unavailable');
 const initial=Date.now();let fd,recordCount=0;
 if(startAt>initial||expiresAt<=initial||expiresAt-initial>600000||typeof createChild!=='function'||typeof outputFile!=='string'||!outputFile)throw unavailable();
 let capture;
 try{
  capture=createDiscoveryCapture({sourceRevision,startAt,expiresAt,emit:row=>{writeFileSync(fd,JSON.stringify(row)+'\n');recordCount++;}});
  fd=openSync(outputFile,'wx',0o600);
 }catch{throw unavailable();}
 return new Promise((resolve,reject)=>{
  let child,timer,killTimer,closed=false,reason=null;
  const finish=code=>{
   if(closed)return;closed=true;clearTimeout(timer);clearTimeout(killTimer);signal?.removeEventListener('abort',abort);
   let streamValid=true;try{capture.finish();}catch{streamValid=false;}
   if(code!==0&&reason===null)reason='child_error';
   if(reason==='invalid_stream'||reason==='child_error'||reason==='spawn_error')streamValid=false;
   const result={captureEnded:true,reason:reason??'eof',streamValid,recordCount,remoteClosureVerified:false};
   try{writeFileSync(fd,JSON.stringify(result)+'\n');fsyncSync(fd);closeSync(fd);resolve(result);}
   catch{try{closeSync(fd);}catch{}reject(unavailable());}
  };
  const stop=why=>{
   if(closed||reason!==null)return;reason=why;
   try{child.kill('SIGINT');}catch{}
   killTimer=setTimeout(()=>{try{child.kill('SIGKILL');}catch{}},2000);
  };
  const abort=()=>stop('cancelled');
  try{
   child=createChild();
   child.stdout.setEncoding('utf8');
   child.stdout.on('data',chunk=>{if(closed||reason!==null)return;try{capture.push(chunk);}catch{stop('invalid_stream');}});
   child.stderr.on('data',()=>{});
   child.stdout.on('error',()=>stop('invalid_stream'));
   child.stderr.on('error',()=>stop('invalid_stream'));
   child.on('error',()=>{reason='spawn_error';});
   child.on('close',finish);
   timer=setTimeout(()=>stop('deadline'),Math.max(0,expiresAt-Date.now()));
   signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();
  }catch{reason='spawn_error';finish(null);}
 });
}
