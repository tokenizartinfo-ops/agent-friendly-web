import {FINITE_RELEASE_ARCHIVE_MAX_BYTES,verifyFiniteReleaseArchive} from '../lib/mcp-qa-finite-package.mjs';

try{
 const [sourceRevision,sourceTree,workflowHash,expectedArchiveSha256]=process.argv.slice(2);
 if(process.argv.length!==6||[sourceRevision,sourceTree].some(value=>!(/^[a-f0-9]{40}$/).test(value))||
    [workflowHash,expectedArchiveSha256].some(value=>!(/^[a-f0-9]{64}$/).test(value)))throw Error();
 const chunks=[];
 let size=0;
 for await(const chunk of process.stdin){
  if((size+=chunk.length)>FINITE_RELEASE_ARCHIVE_MAX_BYTES)throw Error();
  chunks.push(chunk);
 }
 const receipt=await verifyFiniteReleaseArchive({archive:Buffer.concat(chunks,size),sourceRevision,sourceTree,workflowHash,
  expectedArchiveSha256,signal:AbortSignal.timeout(30000)});
 process.stdout.write(JSON.stringify(receipt)+'\n');
}catch{
 process.stderr.write('Finite package unavailable\n');
 process.exitCode=1;
}
