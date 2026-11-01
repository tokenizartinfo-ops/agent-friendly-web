import {finiteSourceFile} from './mcp-qa-finite-seed-primary.mjs';
import {createHash} from 'node:crypto';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {performance} from 'node:perf_hooks';
import {parseDocument} from 'yaml';
import {isQaGithubBearerTransportValue} from './mcp-qa-cloud-lifecycle-admission.mjs';
import {validateFinitePackageManifest,encodeFinitePackageManifest,hashFinitePackageManifest} from './mcp-qa-finite-seed.mjs';

// GHA-only technical lookup. No artifact code is loaded, no dispatch/fallback,
// and no metadata returned here establishes authorized profile/runtime semantics.
const REPOSITORY='tokenizartinfo-ops/agent-friendly-web',REPOSITORY_ID=1347578006;
const API='https://api.github.com/repos/'+REPOSITORY;
const WORKFLOW_PATH='.github/workflows/afw-finite-native-package.yml';
const WORKFLOW_API=API+'/actions/workflows/afw-finite-native-package.yml';
const ARCHIVE_LIMIT=67108864,JSON_LIMIT=1048576,TOTAL_MS=30000,STEP_MS=5000;
const ROLES=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
const fail=()=>{throw Error('Finite package unavailable');};
const positive=v=>Number.isSafeInteger(v)&&v>0;
const hex=(v,n=40)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const sha256=v=>createHash('sha256').update(v).digest('hex');
const sameRepository=r=>r?.id===REPOSITORY_ID&&r.full_name===REPOSITORY;
function createBudget(now,parent){
 const start=now(),nativeStart=performance.now(),controller=new AbortController();
 if(!Number.isSafeInteger(start)||parent&&!(parent instanceof AbortSignal))fail();
 let previous=start;
 const abort=()=>controller.abort();
 parent?.addEventListener('abort',abort,{once:true});
 if(parent?.aborted)abort();
 const timer=setTimeout(abort,TOTAL_MS);
 function check(){
  const current=now();
  if(controller.signal.aborted||!Number.isSafeInteger(current)||current<previous||current-start>=TOTAL_MS||performance.now()-nativeStart>=TOTAL_MS)fail();
  previous=current;
  return current;
 }
 async function bounded(action){
  check();
  const child=new AbortController();
  let rejectAbort;
  const rejected=new Promise((_,reject)=>{rejectAbort=reject;});
  const stop=()=>{child.abort();rejectAbort(Error('Finite package unavailable'));};
  controller.signal.addEventListener('abort',stop,{once:true});
  const timer=setTimeout(stop,Math.min(STEP_MS,TOTAL_MS-(performance.now()-nativeStart)));
  try{
   const value=await Promise.race([Promise.resolve().then(()=>action(child.signal)),rejected]);
   check();return value;
  }finally{
   clearTimeout(timer);controller.signal.removeEventListener('abort',stop);child.abort();
  }
 }
 return {check,bounded,close(){clearTimeout(timer);parent?.removeEventListener('abort',abort);controller.abort();}};
}
async function readBody(response,limit,signal){
 const length=response.headers.get('content-length');
 if(length!==null&&(!/^(0|[1-9][0-9]*)$/.test(length)||!Number.isSafeInteger(Number(length))||Number(length)>limit))fail();
 if(!response.body)fail();
 const reader=response.body.getReader(),parts=[];let size=0,done=false;
 const cancel=()=>{reader.cancel().catch(()=>{});};
 signal.addEventListener('abort',cancel,{once:true});
 try{
  while(true){
   if(signal.aborted)fail();
   const chunk=await reader.read();
   if(signal.aborted)fail();
   if(chunk.done){done=true;break;}
   if(!(chunk.value instanceof Uint8Array)||(size+=chunk.value.byteLength)>limit)fail();
   parts.push(chunk.value);
  }
  if(length!==null&&size!==Number(length))fail();
  return Buffer.concat(parts,size);
 }finally{signal.removeEventListener('abort',cancel);if(!done)cancel();reader.releaseLock();}
}
function safeRedirect(location){
 if(typeof location!=='string'||location.length>8192||/[^\x21-\x7e]/.test(location)||location.includes('\\'))fail();
 const url=new URL(location),rawPath=location.match(/^https:\/\/[^/?#]+([^?#]*)/)?.[1];
 if(url.protocol!=='https:'||url.username||url.password||url.port||url.hash||
  !/^productionresultssa[0-9]+\.blob\.core\.windows\.net$/.test(url.hostname)||
  !rawPath||!/^\/actions-results\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_.-]+)*$/.test(rawPath)||
  rawPath!==url.pathname||rawPath.split('/').some(s=>s==='.'||s==='..')||!url.searchParams.get('sig'))fail();
 return url.href;
}
function checkPagination(link,page,total,urlFor){
 const pages=Math.max(1,Math.ceil(total/100));
 const found=new Map();
 if(link){
  if(link.length>8192)fail();
  for(const part of link.split(',')){
   const match=part.trim().match(/^<([^>]+)>; rel="(next|prev|first|last)"$/);
   if(!match||found.has(match[2]))fail();
   const expectedPage={next:page+1,prev:page-1,first:1,last:pages}[match[2]];
   if(expectedPage<1||expectedPage>pages||match[1]!==urlFor(expectedPage))fail();
   if(match[2]==='next'&&page===pages||match[2]==='prev'&&page===1)fail();
   found.set(match[2],match[1]);
  }
 }
 if((page<pages)!==found.has('next')||pages===1&&found.size)fail();
}
function parseWorkflow(file){
 if(file?.type!=='file'||file.path!==WORKFLOW_PATH||file.encoding!=='base64'||!positive(file.size)||file.size>65536||!hex(file.sha)||typeof file.content!=='string'||file.content.length>90000)fail();
 const encoded=file.content.replace(/\n/g,'');
 if(!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encoded))fail();
 const bytes=Buffer.from(encoded,'base64');
 if(bytes.length!==file.size||bytes.toString('base64')!==encoded||createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')!==file.sha)fail();
 const source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
 const doc=parseDocument(source,{uniqueKeys:true});
 if(doc.errors.length||doc.warnings.length)fail();
 const config=doc.toJS({maxAliasCount:0}),push=config?.on?.push;
 if(!push||!Array.isArray(push.branches)||push.branches.length!==1||push.branches[0]!=='main'||Object.hasOwn(push,'branches-ignore'))fail();
 // This checks committed source/event binding; the actual 4C builder must
 // independently qualify exports, configurations, bindings and role authority.
 return sha256(bytes);
}
function inspectArchive(bytes,signal){
 return new Promise((resolve,reject)=>{
  const child=spawn('python3',['-I','-B',fileURLToPath(new URL('../scripts/verify-qa-finite-archive.py',import.meta.url))],{stdio:['pipe','pipe','pipe'],windowsHide:true});
  let size=0,stderrSize=0,failed=false;const parts=[];
  const stop=()=>{failed=true;child.kill('SIGKILL');};
  signal.addEventListener('abort',stop,{once:true});if(signal.aborted)stop();
  child.on('error',()=>{failed=true;reject(Error('Finite package unavailable'));});
  child.stdout.on('data',chunk=>{size+=chunk.length;if(size>65536)stop();else parts.push(chunk);});
  child.stderr.on('data',chunk=>{stderrSize+=chunk.length;if(stderrSize>1024)stop();});
  child.stdin.on('error',stop);
  child.on('close',code=>{
   signal.removeEventListener('abort',stop);
   if(failed||signal.aborted||code!==0||stderrSize||!size){reject(Error('Finite package unavailable'));return;}
   try{resolve(JSON.parse(Buffer.concat(parts,size).toString('utf8')));}catch{reject(Error('Finite package unavailable'));}
  });
  child.stdin.end(bytes);
 });
}

/** Resolve one fixed source package from primary GitHub facts, with no authority
 * to use it live. A missing future workflow/artifact is simply unavailable. */
export async function resolveFiniteNativePackage(options={}){
 let budget;
 try{
  if(!options||typeof options!=='object'||Object.keys(options).some(k=>!['sourceRevision','githubToken','fetchImpl','now','signal'].includes(k)))fail();
  const {sourceRevision,githubToken,fetchImpl=fetch,now=Date.now,signal}=options;
  if(!hex(sourceRevision)||!isQaGithubBearerTransportValue(githubToken)||typeof fetchImpl!=='function'||typeof now!=='function')fail();
  budget=createBudget(now,signal);
  async function request(url,{archive=false,redirect=false,anonymous=false}={}){
   return budget.bounded(async requestSignal=>{
    const headers={Accept:archive?'application/octet-stream':'application/vnd.github+json'};
    if(!anonymous){headers.Authorization='Bearer '+githubToken;headers['X-GitHub-Api-Version']='2022-11-28';}
    const response=await fetchImpl(url,{method:'GET',headers,redirect:'manual',credentials:'omit',referrerPolicy:'no-referrer',signal:requestSignal});
    if(requestSignal.aborted||response.headers.get('retry-after')!==null||response.headers.get('x-ratelimit-remaining')==='0')fail();
    if(redirect){
     if(response.status!==302)fail();
     const target=safeRedirect(response.headers.get('location'));
     response.body?.cancel().catch(()=>{});
     return target;
    }
    if(response.status!==200)fail();
    const content=await readBody(response,archive?ARCHIVE_LIMIT:JSON_LIMIT,requestSignal);
    if(archive)return content;
    return {value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(content)),link:response.headers.get('link')};
   });
  }
  const json=async url=>(await request(url)).value;
  const commits=new Map();
  async function tree(revision){
   if(!commits.has(revision)){
    const primary=await json(API+'/git/commits/'+revision);
    if(primary?.sha!==revision||!hex(primary.tree?.sha))fail();
    commits.set(revision,primary.tree.sha);
   }
   return commits.get(revision);
  }
  const sourceTree=await tree(sourceRevision);
  const workflowHash=parseWorkflow(await json(API+'/contents/'+WORKFLOW_PATH+'?ref='+sourceRevision));
  const workflow=await json(WORKFLOW_API);
  if(!positive(workflow?.id)||workflow.path!==WORKFLOW_PATH||workflow.state!=='active')fail();
  const runURL=page=>WORKFLOW_API+'/runs?head_sha='+sourceRevision+'&branch=main&event=push&status=success&per_page=100&page='+page;
  let total,all=[];const seen=new Set();
  for(let page=1;page<=2;page++){
   const {value,link}=await request(runURL(page));
   if(!Number.isSafeInteger(value?.total_count)||value.total_count<0||value.total_count>200||!Array.isArray(value.workflow_runs))fail();
   if(total===undefined)total=value.total_count;
   if(value.total_count!==total||value.workflow_runs.length!==Math.min(100,total-(page-1)*100))fail();
   checkPagination(link,page,total,runURL);
   for(const run of value.workflow_runs){if(!positive(run?.id)||seen.has(run.id))fail();seen.add(run.id);}
   all=all.concat(value.workflow_runs);
   if(all.length===total)break;
  }
  if(all.length!==total)fail();
  const eligible=all.filter(r=>r.workflow_id===workflow.id&&r.path===WORKFLOW_PATH&&r.head_sha===sourceRevision&&r.head_branch==='main'&&r.event==='push'&&r.status==='completed'&&r.conclusion==='success'&&r.run_attempt===1&&sameRepository(r.repository)&&sameRepository(r.head_repository));
  if(eligible.length!==1)fail();
  const run=eligible[0],artifactName='afw-finite-native-package-'+sourceRevision;
  const {value:listing,link}=await request(API+'/actions/runs/'+run.id+'/artifacts?per_page=100&page=1');
  if(link||!Number.isSafeInteger(listing?.total_count)||listing.total_count<0||listing.total_count>100||!Array.isArray(listing.artifacts)||listing.artifacts.length!==listing.total_count)fail();
  const artifactIDs=new Set();
  for(const a of listing.artifacts){if(!positive(a?.id)||artifactIDs.has(a.id))fail();artifactIDs.add(a.id);}
  const matches=listing.artifacts.filter(a=>a.name===artifactName);
  if(matches.length!==1)fail();
  const artifact=matches[0],ar=artifact.workflow_run,expiry=Date.parse(artifact.expires_at);
  if(artifact.expired!==false||!Number.isSafeInteger(expiry)||expiry<=budget.check()||!positive(artifact.size_in_bytes)||artifact.size_in_bytes>ARCHIVE_LIMIT||
   typeof artifact.digest!=='string'||!/^sha256:[a-f0-9]{64}$/.test(artifact.digest)||
   ar?.id!==run.id||ar.repository_id!==REPOSITORY_ID||ar.head_repository_id!==REPOSITORY_ID||ar.head_sha!==sourceRevision||ar.head_branch!=='main')fail();
  const target=await request(API+'/actions/artifacts/'+artifact.id+'/zip',{redirect:true,archive:true});
  const archive=await request(target,{archive:true,anonymous:true});
  if(archive.length!==artifact.size_in_bytes||'sha256:'+sha256(archive)!==artifact.digest)fail();
  const parsed=await budget.bounded(childSignal=>inspectArchive(archive,childSignal));
  const manifest=validateFinitePackageManifest(parsed.manifest);
  if(encodeFinitePackageManifest(manifest)!==parsed.manifestText||manifest.sourceRevision!==sourceRevision||manifest.sourceTree!==sourceTree||manifest.buildWorkflowHash!==workflowHash)fail();
  if(!parsed.files||Object.keys(parsed.files).length!==ROLES.length)fail();
  const receipts=new Set();
  for(const role of ROLES){
   const descriptor=manifest.modules[role],file=parsed.files[role+'/'+descriptor.module.name];
   const provenance=descriptor.provenance;
   if(provenance.kind==='compiled-source.v1'){
    if(provenance.sourceTree!==await tree(provenance.sourceRevision))fail();
   }else{
    if(!receipts.has(provenance.receiptPath)){
     const receipt=await json(API+'/contents/'+provenance.receiptPath+'?ref='+sourceRevision);
     finiteSourceFile(receipt,provenance.receiptPath);
     if(receipt.sha!==provenance.receiptBlobSha)fail();receipts.add(provenance.receiptPath);
    }
    if(provenance.kind==='historical-source-pin.v1'){
     const path='scripts/mcp-confirmation-frozen-artifact.json',receipt=finiteSourceFile(await json(API+'/contents/'+path+'?ref='+sourceRevision),path),frozen=JSON.parse(receipt.text);
     if(frozen.baseVersionId!==provenance.versionId||frozen.sourceRevision!==provenance.sourceRevision||frozen.sourceTree!==provenance.sourceTree||frozen.workerHash!==descriptor.module.sha256||frozen.workerBytes!==descriptor.module.bytes||provenance.sourceTree!==await tree(provenance.sourceRevision))fail();
    }
   }
   if(file?.sha256!==descriptor.module.sha256||file.bytes!==descriptor.module.bytes)fail();
  }
  budget.check();
  return Object.freeze({build:Object.freeze({workflowPath:WORKFLOW_PATH,runId:run.id,attempt:1,artifactId:artifact.id,artifactName,artifactDigest:artifact.digest,manifestHash:hashFinitePackageManifest(manifest)}),manifest});
 }catch{fail();}finally{budget?.close();}
}
