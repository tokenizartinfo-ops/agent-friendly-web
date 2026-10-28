import {build} from 'esbuild';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {validateReleaseOperatorBundle,RELEASE_TARGET} from '../lib/mcp-release-operator-policy.mjs';
import {buildMcpOwnWorker} from './build-mcp-own-worker.mjs';
import {verifyMcpReleaseSource} from './mcp-release-source.mjs';
import {PRIVATE_CONFIRMATION_FORMAT,PRIVATE_CONFIRMATION_SLOT,PRIVATE_CONFIRMATION_SCRIPT_CAP} from '../lib/mcp-private-confirmation-template.mjs';
import {PRIVATE_PUBLICATION_FORMAT,PRIVATE_PUBLICATION_SLOT,PRIVATE_PUBLICATION_SCRIPT_CAP} from '../lib/mcp-private-publication-template.mjs';
export {materializeMcpPrivatePublication} from '../lib/mcp-private-publication-template.mjs';
export {materializeMcpPrivateConfirmation} from '../lib/mcp-private-confirmation-template.mjs';


export async function buildMcpReleaseOperator(bundle){
 validateReleaseOperatorBundle(bundle);
 const encoded=JSON.stringify(bundle);
 const r=await build({entryPoints:[fileURLToPath(new URL('../worker/mcp-release/index.mjs',import.meta.url))],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',sourcemap:false,define:{'globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__':encoded}});
 const script=r.outputFiles[0].text;return {script,operatorHash:createHash('sha256').update(script).digest('hex'),planHash:createHash('sha256').update(encoded).digest('hex')};
}

/** Public build only. Consent data from the validated inert seed is omitted.
 * The reserved JSON string must be materialized privately before any upload. */
export async function buildMcpPrivateConfirmationTemplate(bundle){
 try{
  validateReleaseOperatorBundle(bundle);
  bundle=JSON.parse(JSON.stringify(bundle));
  validateReleaseOperatorBundle(bundle);
  if(bundle.policy.operation!=='confirm_named'||bundle.policy.startAt!==0||bundle.policy.expiresAt!==1)throw Error();
  const entry=fileURLToPath(new URL('../worker/mcp-release/index.mjs',import.meta.url));
  const source=await readFile(entry,'utf8'),token='globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__';
  if(source.split(token).length!==2)throw Error();
  const expression='({artifact:'+JSON.stringify(bundle.artifact)+',policy:JSON.parse('+JSON.stringify(PRIVATE_CONFIRMATION_SLOT)+')})';
  const r=await build({stdin:{contents:source.replace(token,()=>expression),resolveDir:dirname(entry),sourcefile:'worker/mcp-release/index.mjs',loader:'js'},
   bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',sourcemap:false});
  const template=r.outputFiles[0].text,literal=JSON.stringify(PRIVATE_CONFIRMATION_SLOT);
  if(Buffer.byteLength(template)>PRIVATE_CONFIRMATION_SCRIPT_CAP||template.split(literal).length!==2||template.split(PRIVATE_CONFIRMATION_SLOT).length!==2)throw Error();
  const a=bundle.artifact;
  const manifest=Object.freeze({format:PRIVATE_CONFIRMATION_FORMAT,templateHash:createHash('sha256').update(template).digest('hex'),templateBytes:Buffer.byteLength(template),
   slot:PRIVATE_CONFIRMATION_SLOT,artifactKey:bundle.policy.plan.artifactKey,workerHash:a.workerHash,programHash:a.programHash,
   artifactSourceRevision:a.sourceRevision,artifactSourceTree:a.sourceTree,materialized:false,remotePublished:false});
  return Object.freeze({template,manifest});
 }catch{throw Error('Private confirmation preparation unavailable');}
}

/** Separate public publication template. The entire inert policy is omitted;
 * a private finite plan and native validation remain mandatory at execution. */
export async function buildMcpPrivatePublicationTemplate(bundle){
 try{
  validateReleaseOperatorBundle(bundle);
  bundle=JSON.parse(JSON.stringify(bundle));
  validateReleaseOperatorBundle(bundle);
  if(bundle.policy.operation!=='publish'||bundle.policy.startAt!==0||bundle.policy.expiresAt!==1)throw Error();
  const entry=fileURLToPath(new URL('../worker/mcp-release/index.mjs',import.meta.url));
  const source=await readFile(entry,'utf8'),token='globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__';
  if(source.split(token).length!==2)throw Error();
  const expression='({artifact:'+JSON.stringify(bundle.artifact)+',policy:JSON.parse('+JSON.stringify(PRIVATE_PUBLICATION_SLOT)+')})';
  const r=await build({stdin:{contents:source.replace(token,()=>expression),resolveDir:dirname(entry),sourcefile:'worker/mcp-release/index.mjs',loader:'js'},
   bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',sourcemap:false});
  const template=r.outputFiles[0].text,literal=JSON.stringify(PRIVATE_PUBLICATION_SLOT);
  if(Buffer.byteLength(template)>PRIVATE_PUBLICATION_SCRIPT_CAP||template.split(literal).length!==2||template.split(PRIVATE_PUBLICATION_SLOT).length!==2)throw Error();
  const a=bundle.artifact;
  const manifest=Object.freeze({format:PRIVATE_PUBLICATION_FORMAT,templateHash:createHash('sha256').update(template).digest('hex'),templateBytes:Buffer.byteLength(template),
   slot:PRIVATE_PUBLICATION_SLOT,artifactKey:createHash('sha256').update(JSON.stringify([RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,a.workerHash])).digest('hex'),
   workerHash:a.workerHash,programHash:a.programHash,artifactSourceRevision:a.sourceRevision,artifactSourceTree:a.sourceTree,materialized:false,remotePublished:false});
  return Object.freeze({template,manifest});
 }catch{throw Error('Private publication preparation unavailable');}
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
