import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {verifyMcpReleaseSource} from './mcp-release-source.mjs';
import {buildMcpOwnWorker} from './build-mcp-own-worker.mjs';
import {buildMcpPrivatePublicationTemplate,materializeMcpPrivatePublication} from './build-mcp-release-operator.mjs';
import {RELEASE_TARGET} from '../lib/mcp-release-operator-policy.mjs';

export async function buildMcpPublicPublicationPackage({sourceRevision}={}){
 const cwd=fileURLToPath(new URL('..',import.meta.url)),hash=x=>createHash('sha256').update(x).digest('hex');
 const before=await verifyMcpReleaseSource({cwd,sourceRevision}),own=await buildMcpOwnWorker({sourceRevision});
 const artifact={...own,sourceTree:before.tree,sourceCheck:'git-inputs-before-after-v1'};
 // Deliberately expired, non-existent base: NEVER upload/invoke this seed.
 const policy={operation:'publish',startAt:0,expiresAt:1,pins:{...RELEASE_TARGET,baseVersionId:'00000000-0000-4000-8000-000000000000'}};
 const {template,manifest}=await buildMcpPrivatePublicationTemplate({artifact,policy});
 const materializer=await readFile(new URL('../lib/mcp-private-publication-template.mjs',import.meta.url),'utf8');
 const assembled=await materializeMcpPrivatePublication({template,manifest,policyJson:JSON.stringify(policy),expectedTemplateHash:manifest.templateHash});
 if(assembled.operatorHash!==hash(assembled.script)||assembled.startAt!==0||assembled.expiresAt!==1||assembled.remotePublished!==false)throw Error('Public publication package unavailable');
 const after=await verifyMcpReleaseSource({cwd,sourceRevision});if(before.tree!==after.tree)throw Error('Public publication package unavailable');
 const receipt=Object.freeze({operatorSourceRevision:sourceRevision,operatorSourceTree:after.tree,
  artifactSourceRevision:own.sourceRevision,artifactSourceTree:after.tree,artifactKey:manifest.artifactKey,workerHash:own.workerHash,programHash:own.programHash,
  templateHash:manifest.templateHash,templateBytes:manifest.templateBytes,materializerHash:hash(materializer),materializerBytes:Buffer.byteLength(materializer),
  materialized:false,realPolicyAccepted:false,remotePublished:false,invoked:false,operationalReadiness:false});
 return Object.freeze({template,manifest,materializer,receipt});
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const p=await buildMcpPublicPublicationPackage({sourceRevision:process.argv[2]});
 const directory=fileURLToPath(new URL('../output/mcp-publication-template/',import.meta.url));await mkdir(directory,{recursive:true});
 // Public code and provenance only. No policy, live plan or materialized index.
 for(const [name,value]of [['template.mjs',p.template],['materializer.mjs',p.materializer],['template.json',JSON.stringify(p.manifest,null,2)+'\n'],['build.json',JSON.stringify(p.receipt,null,2)+'\n']]){
  await writeFile(resolve(directory,name),value);
 }
 process.stdout.write(JSON.stringify(p.receipt)+'\n');
}
