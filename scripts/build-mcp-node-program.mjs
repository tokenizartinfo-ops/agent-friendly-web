import {build} from 'esbuild';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';

export async function buildMcpNodeProgram(){
 const result=await build({entryPoints:[fileURLToPath(new URL('../worker/mcp-node/server.mjs',import.meta.url))],bundle:true,write:false,platform:'node',target:'node24',format:'esm',legalComments:'none',sourcemap:false});
 const program=result.outputFiles[0].text;
 return Object.freeze({program,programHash:createHash('sha256').update(program).digest('hex')});
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const built=await buildMcpNodeProgram(),directory=resolve('output/mcp-node-program');await mkdir(directory,{recursive:true});
 await writeFile(resolve(directory,'program.mjs'),built.program);await writeFile(resolve(directory,'sha256.txt'),built.programHash+'\n');
 process.stdout.write('AFW Node program built '+built.programHash+'\n');
}
