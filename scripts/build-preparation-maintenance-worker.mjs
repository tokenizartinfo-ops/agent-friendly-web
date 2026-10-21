import {build} from 'esbuild';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {mkdir,writeFile} from 'node:fs/promises';
import {verifyMcpReleaseSource} from './mcp-release-source.mjs';

export async function buildPreparationMaintenanceWorker({sourceRevision}={}){
 if(typeof sourceRevision!=='string'||!/^[0-9a-f]{40}$/.test(sourceRevision))throw Error('Explicit source revision required');
 const result=await build({entryPoints:[fileURLToPath(new URL('../worker/preparation-maintenance/index.mjs',import.meta.url))],
  bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',
  external:['node:*','cloudflare:*'],legalComments:'none',sourcemap:false});
 const script=result.outputFiles[0].text,bytes=Buffer.byteLength(script,'utf8');
 if(bytes<=0||bytes>2097152)throw Error('Preparation maintenance Worker bundle unavailable');
 return Object.freeze({script,sourceRevision,workerHash:createHash('sha256').update(script).digest('hex')});
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const cwd=fileURLToPath(new URL('..',import.meta.url)),sourceRevision=process.argv[2];
 const before=await verifyMcpReleaseSource({cwd,sourceRevision});
 const result=await buildPreparationMaintenanceWorker({sourceRevision}),after=await verifyMcpReleaseSource({cwd,sourceRevision});
 if(before.tree!==after.tree)throw Error('Release source unavailable');
 const directory=resolve(cwd,'output/preparation-maintenance-worker');
 await mkdir(directory,{recursive:true});
 await writeFile(resolve(directory,'index.mjs'),result.script);
 const manifest={sourceRevision:result.sourceRevision,sourceTree:after.tree,sourceCheck:'git-inputs-before-after-v1',
  workerHash:result.workerHash,workerBytes:Buffer.byteLength(result.script,'utf8'),buildOnly:true,runtimeConfigIncluded:false};
 await writeFile(resolve(directory,'build.json'),JSON.stringify(manifest,null,2)+'\n');
 process.stdout.write(JSON.stringify(manifest)+'\n');
}
