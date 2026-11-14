import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import {constants} from 'node:fs';
import {createHash} from 'node:crypto';
import {join,resolve,parse,sep,isAbsolute} from 'node:path';

// Source-only observations are unauthenticated location hints. A pending stage can
// also be caused by process termination; it never establishes a business cause.
export const STAGES=Object.freeze(['metadata_get','metadata_validation','raw_download','raw_binding','zip_decode','receipt_caps','mkdir','write_files']);
export const JOBS=Object.freeze(['positive_prepare','reduction_prepare','readonly']);
export const NEEDS=Object.freeze(['contracts','positive_prepare','positive_consume','reduction_prepare','reduction_consume_a','readonly','reduction_consume_b']);
export const NONCLAIMS=Object.freeze({historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
const FILES=Object.freeze([['command','command-output.log'],['seal','seal-custody.log'],['metadata','own-metadata.log'],['count','tap-check.log']]);
const AVAILABILITY=Object.freeze(['available','missing','oversized','unsafe','racing','malformed','truncated','unavailable']);
const OUTCOMES=Object.freeze(['success','failure','skipped','cancelled','not_observed']);
const COUNT=Object.freeze(['not_observed','coded_assertion','unknown']);
const CONTEXT_KEYS=['repository','repositoryId','ref','source','tree','workflowBlob','run','attempt','node'];
const sha=b=>createHash('sha256').update(b).digest('hex');
const canonical=v=>Buffer.from(JSON.stringify(v)+'\n');
const same=(a,b)=>assert.deepEqual(a,b,'stage_evidence_rejected');
const fields=(v,keys)=>{assert(v!==null&&typeof v==='object'&&!Array.isArray(v),'stage_evidence_rejected');same(Object.keys(v),keys);};
const unknown=()=>({code:'unknown',site:'unknown'});
const noStage=()=>({state:'not_observed',stage:null});
const unknownStage=()=>({state:'unknown',stage:null});
function marker(line,prefix,keys){
 assert(line.startsWith(prefix+' '),'stage_evidence_rejected');
 const raw=line.slice(prefix.length+1),v=JSON.parse(raw);fields(v,keys);same(JSON.stringify(v),raw);return v;
}
function linesOf(text){
 assert(typeof text==='string'&&Buffer.byteLength(text)<=65536,'stage_evidence_rejected');
 assert(text===''||text.endsWith('\n'),'stage_evidence_rejected');
 const lines=text===''?[]:text.slice(0,-1).split('\n');
 assert(lines.length<=4096&&lines.every(l=>Buffer.byteLength(l)<=1024&&!l.includes('\r')),'stage_evidence_rejected');return lines;
}
function stages(lines){
 let next=0,pending=false,status=null,seen=false;
 try{
  for(const line of lines){
   if(line.includes('AFW_SYN_STAGE/1')){
    seen=true;const v=marker(line,'AFW_SYN_STAGE/1',['stage','state']);
    assert(next<STAGES.length&&v.stage===STAGES[next],'stage_evidence_rejected');
    if(v.state==='start'){assert(!pending,'stage_evidence_rejected');pending=true;}
    else{same(v.state,'complete');assert(pending,'stage_evidence_rejected');pending=false;next++;}
   }else if(line.includes('AFW_SYN_HTTP/1')){
    const v=marker(line,'AFW_SYN_HTTP/1',['status']);
    assert(next===0&&pending&&status===null&&Number.isInteger(v.status)&&v.status>=100&&v.status<=599,'stage_evidence_rejected');status=v.status;
   }
  }
  if(!seen)return {stage:noStage(),http:null};
  if(pending)return {stage:{state:'pending',stage:STAGES[next]},http:status};
  if(next===STAGES.length)return {stage:{state:'complete',stage:STAGES.at(-1)},http:status};
  return {stage:unknownStage(),http:null};
 }catch{return {stage:unknownStage(),http:null};}
}
function legacy(lines,P){
 const codes=P.FIXED_BUDGET_FAILURE_CODES;
 const observations=[];
 for(let n=0;n<lines.length;n++){
  const line=lines[n],header=/^(Error|AssertionError|CustodyError)(?: \[(ERR_ASSERTION|EEXIST|ENOENT|EACCES|ENOSPC|ETIMEDOUT)\])?: (.*)$/.exec(line);
  if(!header)continue;
  const message=header[3];let code=header[2]??null,custody=null;
  if(codes.includes(message)&&message.startsWith('custody_'))custody=message;
  const system=/^(EEXIST|ENOENT|EACCES|ENOSPC|ETIMEDOUT): /.exec(message);if(system){if(code&&code!==system[1])return {value:unknown(),count:2};code=system[1];}
  if(header[1]==='CustodyError'&&(!custody||code!==null))continue;
  if(header[1]==='AssertionError'&&code===null)code='ERR_ASSERTION';
  if(!code&&!custody)continue;
  const frames=[];let unrecognizedSourceFrame=false;
  for(let k=n+1;k<lines.length&&/^ {4}at /.test(lines[k]);k++){
   const match=/^ {4}at (?:async )?(?:new )?(?:(?:[A-Za-z0-9_$.[\]<>]+) \(([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3})\)|([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3}))$/.exec(lines[k]);
   if(!match){if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>lines[k].includes(s.path.split('/').at(-1))))unrecognizedSourceFrame=true;continue;}
   const path=match[1]??match[4],root='/home/runner/work/agent-friendly-web/agent-friendly-web/';
   if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>[s.path,root+s.path,'file://'+root+s.path].includes(path)))frames.push(lines[k]);else if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>path.includes(s.path.split('/').at(-1))))unrecognizedSourceFrame=true;
  }
  // This is an owned Error with DATA properties, never an Error from a private log.
  const owned=new Error();Object.defineProperties(owned,{message:{value:custody??'',configurable:true},code:{value:code??undefined,configurable:true},stack:{value:'Error\n'+(unrecognizedSourceFrame?'':frames.join('\n')),configurable:true}});
  observations.push(P.projectFixedBudgetFailure(owned));
 }
 return {value:observations.length===1?observations[0]:unknown(),count:observations.length};
}
export function projectLogText(text,P){
 try{
  const lines=linesOf(text),observation=stages(lines),canonicalMarkers=lines.filter(l=>l.includes('AFW_SYN_FAILURE/1'));
  const old=legacy(lines,P);let failure=old.value;
  if(canonicalMarkers.length){failure=P.projectFixedBudgetLog(text);if(old.count>1||old.count===1&&JSON.stringify(old.value)!==JSON.stringify(failure))failure=unknown();}
  return {failure,stage:observation.stage,http:observation.http};
 }catch{return {failure:unknown(),stage:unknownStage(),http:null};}
}
function identity(st){return [st.dev,st.ino,st.mode,st.nlink,st.size,st.mtimeMs,st.ctimeMs];}
function regular(st){return st.isFile()&&st.nlink===1&&Number.isSafeInteger(st.size)&&st.size>=0;}
async function controlledRoot(root,io){
 assert(typeof root==='string'&&isAbsolute(root)&&resolve(root)===root,'stage_evidence_rejected');
 const base=parse(root).root,parts=root.slice(base.length).split(sep).filter(Boolean),identities=[];let current=base;
 for(const part of parts){current=join(current,part);const st=await io.lstat(current);assert(st.isDirectory()&&!st.isSymbolicLink(),'stage_evidence_rejected');same(await io.realpath(current),current);identities.push([st.dev,st.ino,st.mode]);}return identities;
}
async function readOwned(root,name,io){
 let fd;const path=join(root,name);
 try{
  const parents=await controlledRoot(root,io),before=await io.lstat(path);if(!regular(before)||before.isSymbolicLink())return {availability:'unsafe'};
  if(before.size>1048576)return {availability:'oversized'};
  fd=await io.open(path,constants.O_RDONLY|constants.O_NOFOLLOW);const initial=await fd.stat();
  if(!regular(initial)||JSON.stringify(identity(initial))!==JSON.stringify(identity(before)))return {availability:'racing'};
  const size=Math.min(initial.size,65536),bytes=Buffer.alloc(size),read=await fd.read(bytes,0,size,initial.size-size);
  const after=await fd.stat(),pathAfter=await io.lstat(path);let parentStable=false;try{parentStable=JSON.stringify(parents)===JSON.stringify(await controlledRoot(root,io));}catch{}
  if(!parentStable||read.bytesRead!==size||JSON.stringify(identity(initial))!==JSON.stringify(identity(after))||JSON.stringify(identity(after))!==JSON.stringify(identity(pathAfter)))return {availability:'racing'};
  if(initial.size>65536)return {availability:'truncated'};
  if(size&&bytes[size-1]!==10)return {availability:'truncated'};
  let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(text).equals(bytes));linesOf(text);}catch{return {availability:'malformed'};}
  // A partial marker at either edge is unavailable, including an initial prefix.
  for(const line of text.split('\n'))for(const prefix of ['AFW_SYN_STAGE/1','AFW_SYN_HTTP/1','AFW_SYN_FAILURE/1'])if(line&&prefix.startsWith(line)&&line!==prefix)return {availability:'truncated'};
  return {availability:'available',text};
 }catch(error){const code=Object.getOwnPropertyDescriptor(error??{},'code')?.value;return {availability:code==='ENOENT'?'missing':['ELOOP','ENOTDIR'].includes(code)?'unsafe':'unavailable'};}
 finally{if(fd)try{await fd.close();}catch{}}
}
// Explicit library-only test boundary: an owned synthetic root/IO can be passed
// here. Production collection below exposes no root, IO, argv or env path override.
export async function collectOwnedLogRoot(root,P,io=fs){
 let safe=true;try{await controlledRoot(root,io);}catch{safe=false;}
 const logs=[],observations=[];
 for(const [log,name]of FILES){
  const read=safe?await readOwned(root,name,io):{availability:'unsafe'},v=read.availability==='available'?projectLogText(read.text,P):{failure:unknown(),stage:unknownStage(),http:null};
  logs.push({log,availability:read.availability,code:v.failure.code,site:v.failure.site});observations.push(v);
 }
 const metadata=observations[2],count=logs[3];
 return {logs,stage:logs[2].availability==='available'?metadata.stage:unknownStage(),http:logs[2].availability==='available'?metadata.http:null,countCheck:count.availability==='missing'||count.availability==='available'&&count.code==='unknown'&&observations[3].stage.state==='not_observed'?'not_observed':count.availability==='available'&&count.code==='assertion'?'coded_assertion':'unknown'};
}
async function projector(){
 const bytes=await fs.readFile(join(process.cwd(),'test/fixtures/finite-budget-failure-diagnostic.mjs'));
 same(bytes.length,7927);same(sha(bytes),'97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2');
 same(createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),'6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f');
 return import('data:text/javascript;base64,'+bytes.toString('base64'));
}
export async function collectFixedStagePair({context,job,rawOutcome}){
 const e=process.env;assert(e.NODE_OPTIONS===undefined&&e.AFW_SYN_CHECKPOINT_KEY===undefined&&e.GH_ARTIFACT_TOKEN===undefined,'stage_evidence_rejected');
 assert(typeof e.RUNNER_TEMP==='string'&&isAbsolute(e.RUNNER_TEMP),'stage_evidence_rejected');
 const P=await projector(),pair=makeStagePair({context,job,rawOutcome,observation:await collectOwnedLogRoot(join(e.RUNNER_TEMP,'afw-native-private','logs'),P)});validateStagePairWithProjector(pair,context,job,P);return pair;
}
function validateContext(v){fields(v,CONTEXT_KEYS);same(v.repository,'tokenizartinfo-ops/agent-friendly-web');same(v.repositoryId,'1347578006');same(v.ref,'refs/heads/feat/finite-native-cleanup-20261101');for(const k of ['source','tree','workflowBlob'])assert(/^[a-f0-9]{40}$/.test(v[k]));assert(/^[1-9][0-9]*$/.test(v.run));same(v.attempt,1);same(v.node,'22.23.4');}
function validateValue(v,context,job,P){
 fields(v,['purpose','context','job','rawOutcome','logs','stage','http','countCheck','nonclaims']);same(v.purpose,'afw.sanitized-stage-observations.syn.v1');validateContext(v.context);same(v.context,context);same(v.job,job);assert(JOBS.includes(v.job)&&OUTCOMES.includes(v.rawOutcome));
 same(v.logs.length,4);for(const [n,row]of v.logs.entries()){fields(row,['log','availability','code','site']);same(row.log,FILES[n][0]);assert(AVAILABILITY.includes(row.availability));assert(typeof row.code==='string'&&P.FIXED_BUDGET_FAILURE_CODES.includes(row.code));assert(row.site==='unknown'||P.FIXED_BUDGET_FAILURE_SITES.some(s=>s.id===row.site));if(row.availability!=='available')same({code:row.code,site:row.site},unknown());}
 fields(v.stage,['state','stage']);assert(['not_observed','unknown','pending','complete'].includes(v.stage.state));if(['unknown','not_observed'].includes(v.stage.state))same(v.stage.stage,null);else assert(STAGES.includes(v.stage.stage));if(v.stage.state==='complete')same(v.stage.stage,'write_files');
 assert(v.http===null||Number.isInteger(v.http)&&v.http>=100&&v.http<=599);assert(COUNT.includes(v.countCheck));if(job!=='readonly')same(v.countCheck,'not_observed');same(v.nonclaims,NONCLAIMS);
}
export function makeStagePair({context,job,rawOutcome,observation}){
 validateContext(context);assert(JOBS.includes(job)&&OUTCOMES.includes(rawOutcome));
 const value={purpose:'afw.sanitized-stage-observations.syn.v1',context,job,rawOutcome,logs:observation.logs,stage:observation.stage,http:observation.http,countCheck:job==='readonly'?observation.countCheck:'not_observed',nonclaims:NONCLAIMS};
 const bytes=canonical(value),manifest=canonical({purpose:'afw.sanitized-stage-observations.manifest.syn.v1',context,job,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]});
 assert(bytes.length+manifest.length<=16384,'stage_evidence_rejected');return new Map([['result.json',bytes],['manifest.json',manifest]]);
}
export async function validateStagePair(files,context,job){
 return validateStagePairWithProjector(files,context,job,await projector());
}
export function validateStagePairWithProjector(files,context,job,P){
 validateContext(context);assert(files instanceof Map);same([...files.keys()],['result.json','manifest.json']);assert([...files.values()].every(Buffer.isBuffer));assert([...files.values()].reduce((n,b)=>n+b.length,0)<=16384);
 const read=b=>{const s=new TextDecoder('utf-8',{fatal:true}).decode(b),v=JSON.parse(s);assert(canonical(v).equals(b));return v;};
 const value=read(files.get('result.json')),manifest=read(files.get('manifest.json'));validateValue(value,context,job,P);
 fields(manifest,['purpose','context','job','files']);same(manifest.purpose,'afw.sanitized-stage-observations.manifest.syn.v1');same(manifest.context,context);same(manifest.job,job);same(manifest.files,[{path:'result.json',bytes:files.get('result.json').length,sha256:sha(files.get('result.json'))}]);return value;
}
const unavailableAssignments=()=>JOBS.map(job=>({job,state:'unavailable',artifactId:null,zipSha256:null}));
export function projectAssignments(text){
 const unavailable=unavailableAssignments();
 try{
  assert(typeof text==='string'&&Buffer.byteLength(text)<=65536);const needs=JSON.parse(text);assert(needs&&typeof needs==='object'&&!Array.isArray(needs));same(Object.keys(needs).sort(),NEEDS.slice().sort());
  const result=JOBS.map(job=>{const v=needs[job];assert(v&&typeof v==='object'&&!Array.isArray(v));same(Object.keys(v).sort(),['outputs','result']);assert(OUTCOMES.includes(v.result));assert(v.outputs!==null&&typeof v.outputs==='object'&&!Array.isArray(v.outputs));const id=v.outputs['safe-id'],digest=v.outputs['safe-digest'];if(typeof id!=='string'||!/^[1-9][0-9]*$/.test(id)||!Number.isSafeInteger(Number(id))||String(Number(id))!==id||typeof digest!=='string'||!/^[a-f0-9]{64}$/.test(digest))return unavailable.find(x=>x.job===job);return {job,state:'assigned',artifactId:id,zipSha256:digest};});
  const ids=result.filter(x=>x.state==='assigned').map(x=>x.artifactId);if(new Set(ids).size!==ids.length)return unavailable;return result;
 }catch{return unavailable;}
}
export function assignmentLine(text){return 'AFW_STAGE_DIAGNOSTIC_ASSIGNMENTS '+JSON.stringify(projectAssignments(text));}
