import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {verifyMcpReleaseSource} from './mcp-release-source.mjs';
import {createFinitePrivateR2Locator} from '../lib/mcp-qa-finite-package.mjs';

const fail=()=>{throw Error('Finite private package locator unavailable');};
try{
 const {GITHUB_SHA:sourceRevision,GITHUB_EVENT_NAME:event,GITHUB_REF:ref,GITHUB_RUN_ATTEMPT:attempt,
  GITHUB_REPOSITORY:repository,GITHUB_REPOSITORY_ID:id,AFW_R2_PACKAGE_SOURCE_REVISION:requestedRevision,
  AFW_R2_BUNDLE_READ_URL:credential}=process.env;
 if(process.argv.length!==2||event!=='workflow_dispatch'||ref!=='refs/heads/main'||attempt!=='1'||requestedRevision!==sourceRevision||
    repository!=='tokenizartinfo-ops/agent-friendly-web'||id!=='1347578006')fail();
 const cwd=fileURLToPath(new URL('..',import.meta.url));
 const workflow=resolve(cwd,'.github/workflows/afw-finite-native-package.yml');
 const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
 const {tree:sourceTree}=await verifyMcpReleaseSource({cwd,sourceRevision});
 const workflowHash=hash(await readFile(workflow));
 const locator=await createFinitePrivateR2Locator({sourceRevision,sourceTree,workflowHash,credential,
  signal:AbortSignal.timeout(30000)});
 if((await verifyMcpReleaseSource({cwd,sourceRevision})).tree!==sourceTree||
    hash(await readFile(workflow))!==workflowHash)fail();
 const out=resolve(cwd,'output/finite-r2-locator');
 await mkdir(out,{recursive:true});
 await writeFile(resolve(out,'locator.json'),JSON.stringify(Object.fromEntries(Object.keys(locator).sort()
  .map(key=>[key,locator[key]]))),{flag:'wx'});
}catch{
 process.stderr.write('Finite private package locator unavailable\n');
 process.exitCode=1;
}
