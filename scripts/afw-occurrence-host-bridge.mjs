import {createOccurrenceHostBridge} from '../lib/assistance-occurrence-host-bridge.mjs';
// Metadata-only probe. No HTTP runner, environment credential read or SDK.
let bridge,accepted=false;
// Process-owned guard survives bridge cleanup and the final write callback:
// a broken host pipe denies quietly, including a later emitted EPIPE event.
process.stdout.on('error',()=>{process.exitCode=1;});
try{
 const args=process.argv.slice(2);if(args.length!==3)throw Error('Invalid arguments');
 const [sourceRevision,configId,publicationId]=args;
 bridge=createOccurrenceHostBridge({input:process.stdin,output:process.stdout,pins:{sourceRevision,configId,publicationId}});
 await bridge.preflight({});accepted=true;
}catch{process.exitCode=1;}
finally{
 bridge?.close();process.stdin.pause();
 await new Promise(resolve=>{
  try{
   process.stdout.write(JSON.stringify({version:'afw-host-observe-v1',type:'probeResult',accepted})+'\n',error=>{
    if(error)process.exitCode=1;resolve();
   });
  }catch{process.exitCode=1;resolve();}
 });
}
