import {openSync,closeSync,writeSync,fstatSync,constants} from 'node:fs';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';

const cases = ['NG_CONNECTION','NG_OAUTH','NG_PHASE','NG_NOTICES','NG_MONITOR','NG_NEXT_GET'];
const aliases = [["S00","lib/mcp-qa-finite-owner-phase-context.mjs"],["S01","lib/mcp-qa-finite-owner-preparation.mjs"],["S02","lib/mcp-qa-finite-owner-native-receiver.mjs"],["S03","worker/mcp-own/finite.mjs"],["S04","lib/mcp-qa-finite-owner-cleanup-scope.mjs"],["S05","lib/mcp-qa-finite-owner-cleanup.mjs"],["S06","lib/mcp-qa-finite-initial-cleanup.mjs"],["D07","test/mcp-qa-finite-owner-three-stage-native.test.mjs"],["S08","test/fixtures/finite-coupled-native.mjs"],["S09","test/fixtures/finite-first-connection-publication.mjs"],["S10","test/fixtures/finite-initial-entry-world.mjs"],["S11","test/mcp-qa-finite-first-connection-publication-native.test.mjs"],["S12","lib/mcp-qa-finite-owner-notice-get-forward.mjs"]];
const root = process.env.AFW_C2_DIAG_ROOT;
const started = process.hrtime.bigint();
let sequence = 0, written = 0, disabled = false;
const faults = new Set(['AssertionError','Error','TypeError','RangeError','SyntaxError','AggregateError','AbortError','TimeoutError']);
const codes = new Set(['ERR_ASSERTION','ERR_TEST_FAILURE','ABORT_ERR','ETIMEDOUT','ENOENT','ERR_MODULE_NOT_FOUND','ECONNRESET','ERR_INVALID_ARG_TYPE']);

function summarize(error) {
  let name = null, code = null, site = null;
  try {
    const candidateName=error?.name, candidateCode=error?.code, candidateStack=error?.stack;
    if (faults.has(candidateName)) name = candidateName;
    if (codes.has(candidateCode)) code = candidateCode;
    const stack = typeof candidateStack === 'string' ? candidateStack : '';
    for (const line of stack.slice(0,16384).split('\n').slice(1,17)) {
      if (!/^    at /.test(line)) continue;
      const position = /(?:\(| )((?:file:\/\/\/|\/)[^()\r\n]+):([1-9]\d{0,5}):([1-9]\d{0,5})\)?$/.exec(line);
      if (!position) continue;
      const entry = aliases.find(([,path]) => position[1] === join(root,path) ||
        position[1] === pathToFileURL(join(root,path)).href);
      if (entry) {site={file:entry[0],line:Number(position[2]),column:Number(position[3])};break;}
    }
  } catch { /* Keep any already observed finite fields. */ }
  return {name,code,site};
}


import {validateTrace,validRetention} from './next-get-reader.mjs';
import {createObservationSlot} from './next-get-slot.mjs';
const binding={sourceIndexHash:process.env.AFW_NG_INDEX_HASH,selectionHash:process.env.AFW_NG_SELECTION_HASH,driverHash:process.env.AFW_NG_DRIVER_HASH};
function fault(){disabled=true;try{process.stderr.write('AFW_C2_NEXT_RECORDER_FAULT\n');}catch{}}
function append(fields){
 if(disabled)return;
 let fd;
 try{
  if(sequence>=128||Object.values(binding).some(v=>typeof v!=='string'||!/^[a-f0-9]{64}$/.test(v)))throw 0;
  const event={sequence:sequence+1,elapsedMs:Number((process.hrtime.bigint()-started)/1000000n),...fields};
  if(!Number.isSafeInteger(event.elapsedMs)||event.elapsedMs<0||event.elapsedMs>180000)throw 0;
  const bytes=Buffer.from(JSON.stringify(event)+'\n');if(written+bytes.length>32768)throw 0;
  fd=openSync(join(root,'next-get-progress.ndjson'),constants.O_WRONLY|constants.O_APPEND|constants.O_NOFOLLOW);
  const s=fstatSync(fd);if(!s.isFile()||(s.mode&0o777)!==0o600||s.nlink!==1||s.uid!==process.getuid()||s.gid!==process.getgid()||s.size!==written)throw 0;
  if(writeSync(fd,bytes)!==bytes.length)throw 0;written+=bytes.length;sequence++;
 }catch{fault();}finally{if(fd!==undefined)try{closeSync(fd);}catch{}}
}
append({kind:'binding',...binding});
export const recorderReady=()=>!disabled&&sequence>0;
export function mark(id,operation,edge,error){
 if((!cases.includes(id)&&id!=='AFTER')||!['action','count','after'].includes(operation)||!['enter','return','throw'].includes(edge)){fault();return;}
 append({kind:'flow',id,operation,edge,error:edge==='throw'?summarize(error):null});
}
export function markHttp(edge,status=null){if(!['request','response','body-return','body-throw'].includes(edge)||!(status===null||Number.isSafeInteger(status)&&status>=100&&status<=599)){fault();return;}append({kind:'http',edge,status});}
const unavailable=()=>({state:'unavailable',count:null});
let lastWorkerSequence=0;
function consume(value){
 let detached;
 try{detached=JSON.parse(JSON.stringify(value));}finally{try{value?.[Symbol.dispose]?.();}catch{fault();}}
 if(!detached||Object.keys(detached).length!==2||Object.keys(detached)[0]!=='trace'||Object.keys(detached)[1]!=='retention'||!validateTrace(detached.trace,binding.sourceIndexHash)||!validRetention(detached.retention)){fault();return unavailable();}
 const trace=detached.trace;
 if(trace.events.length<lastWorkerSequence){fault();return unavailable();}
 for(const event of trace.events.slice(lastWorkerSequence))append({kind:'worker-edge',...event});
 lastWorkerSequence=trace.events.length;
 append({kind:'worker-state',epoch:trace.epoch,workerSequence:lastWorkerSequence,workerElapsedMs:trace.workerElapsedMs,fault:trace.fault,stats:trace.stats,retention:detached.retention});
 return detached.retention;
}
const observationSlot=createObservationSlot();
const observationalRead=(call,allow=()=>true)=>observationSlot.read(call,allow,1000);
async function nativeState(stub){
 try{const read=await observationalRead(()=>stub.nextGetMetadata());if(!read.ok){append({kind:'worker-unavailable'});return unavailable();}return consume(read.value);}
 catch{append({kind:'worker-unavailable'});return unavailable();}
}
async function ticketSnapshot(stub){
 let value;
 try{
  const read=await observationalRead(()=>stub.snapshot());if(!read.ok)return {state:'unavailable',count:null,uses:null};value=read.value;
  const rows=JSON.parse(JSON.stringify(value));if(!Array.isArray(rows))throw 0;
  const count=rows.filter(([k])=>/^owner-ticket:[a-f0-9]{64}$/.test(k)).length,uses=rows.filter(([k])=>/^owner-ticket:[a-f0-9]{64}:use$/.test(k)).length;
  if(count>3||uses>3)throw 0;return {state:'observed',count,uses};
 }catch{return {state:'unavailable',count:null,uses:null};}
 finally{value?.[Symbol.dispose]?.();}
}
export async function beginNextGet(stub){
 try{const arm=await observationalRead(()=>stub.nextGetArm());if(!arm.ok||arm.value!==true)append({kind:'worker-unavailable'});}catch{append({kind:'worker-unavailable'});}
 const tickets=await ticketSnapshot(stub),retention=await nativeState(stub);append({kind:'metadata',stage:'before',tickets,retention});
 let stopped=false,timer=null,polls=0;
 const poll=async()=>{
  if(stopped||polls>=16)return;polls++;
  // The shared slot includes arm/state/snapshot/poll/final; timeout never frees actual.
  try{const read=await observationalRead(()=>stub.nextGetMetadata(),()=>!stopped);if(!stopped){if(read.ok)consume(read.value);else append({kind:'worker-unavailable'});}}catch{if(!stopped)append({kind:'worker-unavailable'});}
  if(!stopped&&polls<16)timer=setTimeout(()=>{poll().catch(()=>{});},2000);
 };
 poll().catch(()=>{});return ()=>{stopped=true;clearTimeout(timer);};
}
export async function finishNextGet(stub,stop){
 try{stop();const tickets=await ticketSnapshot(stub),retention=await nativeState(stub);append({kind:'metadata',stage:'after',tickets,retention});}
 catch{append({kind:'metadata',stage:'after',tickets:{state:'unavailable',count:null,uses:null},retention:unavailable()});}
}
