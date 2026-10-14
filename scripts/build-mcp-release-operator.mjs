import {build} from 'esbuild';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {validateReleaseOperatorBundle} from '../lib/mcp-release-operator-policy.mjs';
import {buildMcpOwnWorker} from './build-mcp-own-worker.mjs';
import {verifyMcpReleaseSource} from './mcp-release-source.mjs';

export async function buildMcpReleaseOperator(bundle){
 validateReleaseOperatorBundle(bundle);
 const encoded=JSON.stringify(bundle);
 const r=await build({entryPoints:[fileURLToPath(new URL('../worker/mcp-release/index.mjs',import.meta.url))],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',sourcemap:false,define:{'globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__':encoded}});
 const script=r.outputFiles[0].text;return {script,operatorHash:createHash('sha256').update(script).digest('hex'),planHash:createHash('sha256').update(encoded).digest('hex')};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const cwd=fileURLToPath(new URL('..',import.meta.url)),sourceRevision=process.argv[2],planPath=process.argv[3];
 if(!planPath)throw Error('Explicit non-secret operator plan required');
 const before=await verifyMcpReleaseSource({cwd,sourceRevision}),own=await buildMcpOwnWorker({sourceRevision});
 const policy=JSON.parse(await readFile(resolve(planPath),'utf8'));
 const result=await buildMcpReleaseOperator({artifact:{...own,sourceTree:before.tree,sourceCheck:'git-inputs-before-after-v1'},policy});
 const after=await verifyMcpReleaseSource({cwd,sourceRevision});if(before.tree!==after.tree)throw Error('Release source unavailable');
 const directory=resolve(cwd,'output/mcp-release-operator');await mkdir(directory,{recursive:true});await writeFile(resolve(directory,'index.mjs'),result.script);
 await writeFile(resolve(directory,'build.json'),JSON.stringify({sourceRevision,sourceTree:after.tree,operatorHash:result.operatorHash,planHash:result.planHash,workerHash:own.workerHash,operation:policy.operation,startAt:policy.startAt,expiresAt:policy.expiresAt,remotePublished:false},null,2)+'\n');
 process.stdout.write('Private operator built '+result.operatorHash+'; not deployed\n');
}
