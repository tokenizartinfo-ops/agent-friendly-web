import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {readFile,stat,writeFile,mkdir} from 'node:fs/promises';
import {readFileSync} from 'node:fs';
import {buildMcpReleaseOperator} from './build-mcp-release-operator.mjs';
import {verifyMcpReleaseSource} from './mcp-release-source.mjs';
import {validateReleaseOperatorBundle} from '../lib/mcp-release-operator-policy.mjs';

const pins=Object.freeze(JSON.parse(readFileSync(new URL('./mcp-confirmation-frozen-artifact.json',import.meta.url),'utf8')));
const fail=()=>{throw Error('Named confirmation package unavailable');};
const admission=()=>({wall:Date.now(),mono:performance.now()});
function originalWindow(policy,started){
 const inert=policy.startAt===0&&policy.expiresAt===1,end=started.mono+(policy.expiresAt-started.wall);
 let lastWall=started.wall,lastMono=started.mono;
 return ()=>{const wall=Date.now(),mono=performance.now();
  if(!Number.isSafeInteger(wall)||!Number.isFinite(mono)||!Number.isSafeInteger(started.wall)||!Number.isFinite(started.mono)||wall<lastWall||mono<lastMono||!inert&&(wall<policy.startAt||wall>=policy.expiresAt||mono>=end))fail();
  lastWall=wall;lastMono=mono;
 };
}
/** Build-only snapshot. Pins come from the recorded code receipt, not a live
 * grant; the hosted journal must independently verify its own primary receipt. */
export async function buildMcpNamedConfirmation(input){
 const started=admission();
 try{
  validateReleaseOperatorBundle(input);
  const bundle=JSON.parse(JSON.stringify(input)),{artifact,policy}=bundle;
  validateReleaseOperatorBundle(bundle);
  if(policy.operation!=='confirm_named'||policy.plan.artifactKey!==pins.artifactKey)fail();
  for(const key of ['sourceRevision','sourceTree','programHash','workerHash','sourceCheck'])if(artifact[key]!==pins[key])fail();
  if(Buffer.byteLength(artifact.script)!==pins.workerBytes)fail();
  for(const b of policy.observation.configuration.bindings){
   if(b.type==='secret_text'&&Reflect.ownKeys(b).some(k=>!['name','type'].includes(k)))fail();
   if(/(?:_TOKEN|_SECRET|_KEY)$/.test(b.name)&&b.type!=='secret_text')fail();
  }
  const current=originalWindow(policy,started);current();
  const built=await buildMcpReleaseOperator(bundle);current();
  return Object.freeze({...built,operation:'confirm_named',startAt:policy.startAt,expiresAt:policy.expiresAt,inertPreparation:policy.startAt===0&&policy.expiresAt===1,artifactSourceRevision:artifact.sourceRevision,artifactSourceTree:artifact.sourceTree,programHash:artifact.programHash,workerHash:artifact.workerHash,artifactKey:policy.plan.artifactKey,recordedClosedVersion:pins.baseVersionId,artifactPinCheck:'recorded-frozen-artifact-v1',remotePublished:false,invoked:false});
 }catch{fail();}
}
async function readJson(path,cap){
 const file=resolve(path),info=await stat(file);if(!info.isFile()||info.size>cap)fail();
 const bytes=await readFile(file);if(bytes.length>cap)fail();return JSON.parse(bytes.toString('utf8'));
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.length!==5)fail();
  const started=admission(),cwd=fileURLToPath(new URL('..',import.meta.url)),sourceRevision=process.argv[2];
  const artifact=await readJson(process.argv[3],4194304),policy=await readJson(process.argv[4],65536);
  const current=originalWindow(policy,started);current();
  const before=await verifyMcpReleaseSource({cwd,sourceRevision});current();
  const built=await buildMcpNamedConfirmation({artifact,policy});current();
  const after=await verifyMcpReleaseSource({cwd,sourceRevision});current();if(before.tree!==after.tree)fail();
  const {script,...metadata}=built,directory=resolve(cwd,'output/mcp-release-confirmation');
  await mkdir(directory,{recursive:true});current();
  await writeFile(resolve(directory,'index.mjs'),script);current();
  const manifest={...metadata,operatorSourceRevision:sourceRevision,operatorSourceTree:after.tree};
  if(createHash('sha256').update(script).digest('hex')!==manifest.operatorHash)fail();
  await writeFile(resolve(directory,'build.json'),JSON.stringify(manifest,null,2)+'\n');current();
  process.stdout.write('Named confirmation package built '+manifest.operatorHash+'; not published or invoked\n');
 }catch{fail();}
}
