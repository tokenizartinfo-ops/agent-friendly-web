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
 const semantic=code=>code==='ERR_ASSERTION'||code==='assertion'?'assertion':codes.includes(code)&&code!=='unknown'?code:null;
 const conflict=()=>({value:unknown(),count:2});
 const observations=[];
 for(let n=0;n<lines.length;n++){
  const line=lines[n],header=/^(Error|AssertionError|CustodyError)(?: \[([^\]\r\n]*)\])?: (.*)$/.exec(line);
  if(!header)continue;
  const message=header[3],explicit=semantic(header[2]),exact=semantic(message),token=/^([A-Za-z_]+): /.exec(message),messageCode=exact??semantic(token?.[1]);
  if(header[2]!==undefined&&explicit===null)return conflict();
  const claims=[header[1]==='AssertionError'?'assertion':null,explicit,messageCode].filter(Boolean);
  if(header[1]==='CustodyError'&&(!exact?.startsWith('custody_')||header[2]!==undefined))return conflict();
  if(new Set(claims).size>1)return conflict();
  if(!claims.length)continue;
  const recognized=claims[0],custody=recognized.startsWith('custody_')?recognized:null,code=recognized==='assertion'?'ERR_ASSERTION':custody?null:recognized;
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
  fd=await io.open(path,constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);const initial=await fd.stat();
  if(!regular(initial)||JSON.stringify(identity(initial))!==JSON.stringify(identity(before)))return {availability:'racing'};
  const size=Math.min(initial.size,65536),bytes=Buffer.alloc(size),read=await fd.read(bytes,0,size,initial.size-size);
  const after=await fd.stat(),pathAfter=await io.lstat(path);let parentStable=false;try{parentStable=JSON.stringify(parents)===JSON.stringify(await controlledRoot(root,io));}catch{}
  if(!parentStable||read.bytesRead!==size||JSON.stringify(identity(initial))!==JSON.stringify(identity(after))||JSON.stringify(identity(after))!==JSON.stringify(identity(pathAfter)))return {availability:'racing'};
  if(initial.size>65536)return {availability:'truncated'};
  if(size&&bytes[size-1]!==10)return {availability:'truncated'};
  let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(text).equals(bytes));linesOf(text);}catch{return {availability:'malformed'};}
  // Physical first/last nonempty lines only; empty means exactly zero bytes.
  // Interior noise, including a partial prefix, is not evidence of truncation.
  const nonempty=text.slice(0,-1).split('\n').filter(line=>line!=='');
  for(const line of [nonempty[0],nonempty.at(-1)])for(const prefix of ['AFW_SYN_STAGE/1','AFW_SYN_HTTP/1','AFW_SYN_FAILURE/1'])if(line&&prefix.startsWith(line)&&line!==prefix)return {availability:'truncated'};
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
 same(bytes.length,7871);same(sha(bytes),'6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c');
 same(createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),'62965a9d5836e54563550fe29dff23abe9a62054');
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

// Readonly boundary v1. Representation caps are checked first; TAP interpretation
// stops on the first literal failing result, before ANY of its error details.
const READONLY_IDS=Object.freeze(['R1','R2','R3','native_file']);
const NATIVE_PATH='test/mcp-qa-finite-budget-native.test.mjs';
const RUNNER_ROOT='/home/runner/work/agent-friendly-web/agent-friendly-web/';
const nativeNames=Object.freeze([NATIVE_PATH,RUNNER_ROOT+NATIVE_PATH,'file://'+RUNNER_ROOT+NATIVE_PATH]);
const tapRows=(result='not_observed')=>READONLY_IDS.map(id=>({id,result,directive:'none'}));
const tapUnknown=()=>({state:'unknown',cases:tapRows('unknown'),counts:null});
const tapAbsent=()=>({state:'not_observed',cases:tapRows(),counts:null});
const custodyUnknown=()=>({state:'unknown',guard:null});
const custodyAbsent=()=>({state:'not_observed',guard:null});
const GUARDS=Object.freeze({101:'regular_file_size_bounds',135:'inventory_files_or_bytes',150:'record_bytes',173:'header_bytes',177:'jsonl_bytes',179:'envelope_bytes',188:'envelope_input_bounds',215:'inspected_inventory',250:'expanded_jsonl_bytes',254:'inspected_record_bytes'});
function tapId(name){for(const id of READONLY_IDS.slice(0,3))if(name===id+' fixed original SDK readonly budget')return id;return nativeNames.includes(name)?'native_file':null;}
const duration=line=>/^ {2}duration_ms: [0-9]+(?:\.[0-9]+)?$/.test(line);
export function projectReadonlyTap(text){
 try{
  const lines=linesOf(text);if(!lines.length)return tapAbsent();
  same(lines[0],'TAP version 13');const cases=tapRows(),seen=new Set();let announced=null,details=false,next=1,plan=null,summary=null;
  for(let i=1;i<lines.length;i++){
   const line=lines[i];
   if(line==='  ---'){
    assert(details);assert(duration(lines[++i]));same(lines[++i],"  type: 'test'");same(lines[++i],'  ...');details=false;continue;
   }
   if(line.startsWith('# Subtest: ')){assert(plan===null&&!announced&&!details);const id=tapId(line.slice(11));assert(id&&!seen.has(id));announced=id;details=false;continue;}
   const row=/^(ok|not ok) ([1-4]) - (.*?)(?: # (SKIP|TODO)(?: .*)?)?$/.exec(line);
   if(row){
    assert(plan===null&&!details);const id=tapId(row[3]),ordinal=Number(row[2]),directive=row[4]?.toLowerCase()??'none';
    assert(id&&!seen.has(id)&&(announced===null||announced===id));
    const lateFile=id==='native_file'&&cases.slice(0,3).every(r=>r.result==='ok')&&seen.size===3&&row[1]==='not ok';
    assert(ordinal===next||lateFile&&ordinal===1);
    if(id==='native_file')assert(seen.size===0||lateFile);else same(id,'R'+next);
    cases[READONLY_IDS.indexOf(id)]={id,result:row[1]==='ok'?'ok':'not_ok',directive};seen.add(id);next++;announced=null;
    if(row[1]==='not ok')return {state:'first_failure',cases:cases.map(r=>seen.has(r.id)?r:{...r,result:'unknown'}),counts:null};
    details=true;continue;
   }
   const p=/^1\.\.([0-4])$/.exec(line);
   if(p){assert(plan===null&&!announced&&!details);plan=Number(p[1]);same(plan,seen.size);details=false;continue;}
   if(line.startsWith('# tests ')){
    assert(plan!==null&&summary===null);summary={};
    for(const key of ['tests','suites','pass','fail','cancelled','skipped','todo']){
     const m=new RegExp('^# '+key+' ([0-4])$').exec(lines[i++]);assert(m);summary[key]=Number(m[1]);
    }
    assert(/^# duration_ms [0-9]+(?:\.[0-9]+)?$/.test(lines[i]));
    same(summary.tests,seen.size);same(summary.suites,0);same(summary.fail,0);same(summary.cancelled,0);
    same(summary.skipped,cases.filter(r=>r.directive==='skip').length);same(summary.todo,cases.filter(r=>r.directive==='todo').length);same(summary.pass,seen.size-summary.skipped-summary.todo);
    continue;
   }
   assert(!details&&line.startsWith('# ')&&!/^# (?:tests|suites|pass|fail|cancelled|skipped|todo|duration_ms)(?: |:)/.test(line)&&plan===null);
  }
  assert(plan!==null&&summary!==null&&!announced);if(seen.has('native_file'))same(seen.size,1);
  const {tests,pass,fail,cancelled,skipped,todo}=summary;
  return {state:'complete',cases,counts:{tests,pass,fail,cancelled,skipped,todo}};
 }catch{return tapUnknown();}
}
export function projectCustodyLimit(text,P){
 try{
  const lines=linesOf(text);if(!lines.length)return custodyAbsent();
  const headers=lines.map((line,i)=>({i,line,match:/^(Error|AssertionError|CustodyError)(?: \[([^\]\r\n]*)\])?: (.*)$/.exec(line)})).filter(v=>v.match);
  const projected=projectLogText(text,P).failure;
  const mentioned=lines.some(line=>line.includes('custody_limit'));
  if(projected.code!=='custody_limit')return mentioned?custodyUnknown():custodyAbsent();
  if(headers.length!==1)return custodyUnknown();
  const header=headers[0],claims=[header.match[2],header.match[3]].filter(Boolean);
  if(!claims.includes('custody_limit')||claims.some(v=>v!=='custody_limit'))return custodyUnknown();
  const approved=['test/fixtures/finite-checkpoint-custody.mjs',RUNNER_ROOT+'test/fixtures/finite-checkpoint-custody.mjs','file://'+RUNNER_ROOT+'test/fixtures/finite-checkpoint-custody.mjs'];
  // Validate the fixed throw chain and stop as soon as its first real guard
  // is known. Node/internal/external caller frames below it are not interpreted.
  let phase=0,constructorSeen=false;
  for(let n=header.i+1;n<lines.length&&/^ {4}at /.test(lines[n]);n++){
   const match=/^ {4}at (?:async )?(?:new )?(?:(?:[A-Za-z0-9_$.[\]<>]+) \(([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3})\)|([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3}))$/.exec(lines[n]);
   if(!match)return custodyUnknown();const path=match[1]??match[4],number=Number(match[2]??match[5]);if(!approved.includes(path))return custodyUnknown();
   if(phase===0){if(number===22&&!constructorSeen){constructorSeen=true;continue;}if(number!==20)return custodyUnknown();phase=1;continue;}
   if(phase===1&&number===24){phase=2;continue;}
   const guard=GUARDS[number];if(!guard)return custodyUnknown();return {state:'observed',guard};
  }
  return custodyUnknown();
 }catch{return custodyUnknown();}
}
// Explicit synthetic root/IO boundary. Each fixed log is opened ONCE, then the
// same captured text supplies both old and new public observations.
export async function collectOwnedReadonlyLogRoot(root,P,io=fs){
 let safe=true;try{await controlledRoot(root,io);}catch{safe=false;}
 const reads=[],logs=[],observations=[];
 for(const [log,name]of FILES){
  const read=safe?await readOwned(root,name,io):{availability:'unsafe'},v=read.availability==='available'?projectLogText(read.text,P):{failure:unknown(),stage:unknownStage(),http:null};
  reads.push(read);logs.push({log,availability:read.availability,code:v.failure.code,site:v.failure.site});observations.push(v);
 }
 const project=(read,fn,absent,uncertain)=>read.availability==='missing'?absent():read.availability==='available'?fn(read.text):uncertain();
 const metadata=observations[2],count=logs[3];
 return {logs,stage:logs[2].availability==='available'?metadata.stage:unknownStage(),http:logs[2].availability==='available'?metadata.http:null,countCheck:count.availability==='missing'||count.availability==='available'&&count.code==='unknown'&&observations[3].stage.state==='not_observed'?'not_observed':count.availability==='available'&&count.code==='assertion'?'coded_assertion':'unknown',tap:project(reads[0],projectReadonlyTap,tapAbsent,tapUnknown),custodyLimit:project(reads[1],s=>projectCustodyLimit(s,P),custodyAbsent,custodyUnknown)};
}
function validateTap(v){
 fields(v,['state','cases','counts']);assert(['not_observed','unknown','complete','first_failure'].includes(v.state));same(v.cases.length,4);
 for(const [n,row]of v.cases.entries()){fields(row,['id','result','directive']);same(row.id,READONLY_IDS[n]);assert(['ok','not_ok','not_observed','unknown'].includes(row.result));assert(['none','skip','todo'].includes(row.directive));if(['unknown','not_observed'].includes(row.result))same(row.directive,'none');}
 if(v.state==='not_observed'){same(v,tapAbsent());return;}if(v.state==='unknown'){same(v,tapUnknown());return;}
 if(v.state==='first_failure'){
  same(v.counts,null);const failed=v.cases.findIndex(r=>r.result==='not_ok');assert(failed>=0&&v.cases.filter(r=>r.result==='not_ok').length===1);
  if(failed===3)assert(v.cases.slice(0,3).every(r=>r.result==='ok')||v.cases.slice(0,3).every(r=>r.result==='unknown'));
  else assert(v.cases.slice(0,failed).every(r=>r.result==='ok')&&v.cases.slice(failed+1).every(r=>r.result==='unknown'));
  return;
 }
 fields(v.counts,['tests','pass','fail','cancelled','skipped','todo']);for(const n of Object.values(v.counts))assert(Number.isInteger(n)&&n>=0&&n<=4);
 assert(v.cases.every(r=>r.result==='ok'||r.result==='not_observed'));const seen=v.cases.filter(r=>r.result==='ok');
 if(v.cases[3].result==='ok')same(seen.length,1);else{let gap=false;for(const r of v.cases.slice(0,3)){if(r.result==='not_observed')gap=true;else assert(!gap);}}
 same(v.counts,{tests:seen.length,pass:seen.filter(r=>r.directive==='none').length,fail:0,cancelled:0,skipped:seen.filter(r=>r.directive==='skip').length,todo:seen.filter(r=>r.directive==='todo').length});
}
function validateCustody(v){fields(v,['state','guard']);assert(['not_observed','unknown','observed'].includes(v.state));if(v.state==='observed')assert(Object.values(GUARDS).includes(v.guard));else same(v.guard,null);}
export function makeReadonlyPair({context,job,rawOutcome,observation}){
 validateContext(context);same(job,'readonly');assert(OUTCOMES.includes(rawOutcome));
 const value={purpose:'afw.readonly-boundary-observations.syn.v1',context,job,rawOutcome,logs:observation.logs,stage:observation.stage,http:observation.http,countCheck:observation.countCheck,tap:observation.tap,custodyLimit:observation.custodyLimit,nonclaims:NONCLAIMS};
 const bytes=canonical(value),manifest=canonical({purpose:'afw.readonly-boundary-observations.manifest.syn.v1',context,job,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]});assert(bytes.length+manifest.length<=16384,'stage_evidence_rejected');return new Map([['result.json',bytes],['manifest.json',manifest]]);
}
export async function collectFixedReadonlyPair({context,job,rawOutcome}){
 const e=process.env;same(process.versions.node,'22.23.4');same(e.GITHUB_JOB,'readonly');same(job,'readonly');assert(e.NODE_OPTIONS===undefined&&e.AFW_SYN_CHECKPOINT_KEY===undefined&&e.GH_ARTIFACT_TOKEN===undefined,'stage_evidence_rejected');assert(typeof e.RUNNER_TEMP==='string'&&isAbsolute(e.RUNNER_TEMP),'stage_evidence_rejected');
 const P=await projector(),pair=makeReadonlyPair({context,job,rawOutcome,observation:await collectOwnedReadonlyLogRoot(join(e.RUNNER_TEMP,'afw-native-private','logs'),P)});validateFixedReadonlyPairWithProjector(pair,context,job,P);return pair;
}
export async function validateFixedReadonlyPair(files,context,job){return validateFixedReadonlyPairWithProjector(files,context,job,await projector());}
export function validateFixedReadonlyPairWithProjector(files,context,job,P){
 validateContext(context);same(job,'readonly');assert(files instanceof Map);same([...files.keys()],['result.json','manifest.json']);assert([...files.values()].every(Buffer.isBuffer));assert([...files.values()].reduce((n,b)=>n+b.length,0)<=16384);
 const read=b=>{const text=new TextDecoder('utf-8',{fatal:true}).decode(b),v=JSON.parse(text);assert(canonical(v).equals(b));return v;};
 const value=read(files.get('result.json')),manifest=read(files.get('manifest.json'));fields(value,['purpose','context','job','rawOutcome','logs','stage','http','countCheck','tap','custodyLimit','nonclaims']);same(value.purpose,'afw.readonly-boundary-observations.syn.v1');
 const old={purpose:'afw.sanitized-stage-observations.syn.v1',context:value.context,job:value.job,rawOutcome:value.rawOutcome,logs:value.logs,stage:value.stage,http:value.http,countCheck:value.countCheck,nonclaims:value.nonclaims};validateValue(old,context,job,P);validateTap(value.tap);validateCustody(value.custodyLimit);for(const [index,key,absent,uncertain]of [[0,'tap',tapAbsent,tapUnknown],[1,'custodyLimit',custodyAbsent,custodyUnknown]]){if(value.logs[index].availability==='missing')same(value[key],absent());else if(value.logs[index].availability!=='available')same(value[key],uncertain());}
 fields(manifest,['purpose','context','job','files']);same(manifest.purpose,'afw.readonly-boundary-observations.manifest.syn.v1');same(manifest.context,context);same(manifest.job,job);same(manifest.files,[{path:'result.json',bytes:files.get('result.json').length,sha256:sha(files.get('result.json'))}]);return value;
}
