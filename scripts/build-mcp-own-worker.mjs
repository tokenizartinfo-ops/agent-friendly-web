import {build} from 'esbuild';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {writeFile,mkdir} from 'node:fs/promises';
import {buildMcpNodeProgram} from './build-mcp-node-program.mjs';
export async function buildMcpOwnWorker({sourceRevision}={}){
 if(typeof sourceRevision!=='string'||!/^[0-9a-f]{40}$/.test(sourceRevision))throw Error('Explicit source revision required');
 const node=await buildMcpNodeProgram(),r=await build({entryPoints:[fileURLToPath(new URL('../worker/mcp-own/index.mjs',import.meta.url))],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',sourcemap:false,define:{'globalThis.__AFW_NODE_PROGRAM__':JSON.stringify(node.program),'globalThis.__AFW_NODE_SOURCE_REVISION__':JSON.stringify(sourceRevision)}});
 const script=r.outputFiles[0].text;return Object.freeze({script,sourceRevision,programHash:node.programHash,workerHash:createHash('sha256').update(script).digest('hex')});
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const r=await buildMcpOwnWorker({sourceRevision:process.argv[2]}),directory=resolve('output/mcp-own-worker');await mkdir(directory,{recursive:true});await writeFile(resolve(directory,'index.mjs'),r.script);await writeFile(resolve(directory,'build.json'),JSON.stringify({sourceRevision:r.sourceRevision,programHash:r.programHash,workerHash:r.workerHash},null,2)+'\n');process.stdout.write('AFW own Worker built '+r.workerHash+'\n');
}
