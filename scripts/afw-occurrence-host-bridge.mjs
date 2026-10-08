import {createOccurrenceHostBridge} from '../lib/assistance-occurrence-host-bridge.mjs';
// Metadata-only probe. No HTTP runner, environment credential read or SDK.
let bridge,accepted=false;
try{
 const args=process.argv.slice(2);if(args.length!==3)throw Error('Invalid arguments');
 const [sourceRevision,configId,publicationId]=args;
 bridge=createOccurrenceHostBridge({input:process.stdin,output:process.stdout,pins:{sourceRevision,configId,publicationId}});
 await bridge.preflight({});accepted=true;
}catch{process.exitCode=1;}
finally{
 bridge?.close();process.stdin.pause();
 process.stdout.write(JSON.stringify({version:'afw-host-observe-v1',type:'probeResult',accepted})+'\n');
}
