import {openSync,closeSync,writeSync,fstatSync,constants} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {safeError,validCounters,boundedProbe,sanitizeProbeDelta,unknownProbe} from './n2-reader.mjs';
import {createObservationSlot} from './n2-slot.mjs';
import {guardObserver} from './n2-logger.mjs';
const root=process.env.AFW_C2_DIAG_ROOT,started=process.hrtime.bigint();
const binding={sourceIndexHash:process.env.AFW_N2_INDEX_HASH,driverHash:process.env.AFW_N2_DRIVER_HASH,selectionHash:process.env.AFW_N2_SELECTION_HASH,helperHash:process.env.AFW_N2_HELPER_HASH,readerHash:process.env.AFW_N2_READER_HASH,slotHash:process.env.AFW_N2_SLOT_HASH,loggerHash:process.env.AFW_N2_LOGGER_HASH,worldHash:process.env.AFW_N2_WORLD_HASH};
let sequence=0,written=0,disabled=false,beforeCalled=false,afterCalled=false,baseline=null,ticketHash=null;
function fault(){disabled=true;try{process.stderr.write('AFW_C2_N2_RECORDER_FAULT\n');}catch{}}
function append(fields){
 if(disabled)return;let fd;
 try{
  if(sequence>=128||Object.values(binding).some(v=>typeof v!=='string'||!/^[a-f0-9]{64}$/.test(v)))throw 0;
  const r={sequence:sequence+1,elapsedMs:Number((process.hrtime.bigint()-started)/1000000n),...fields};
  if(!Number.isSafeInteger(r.elapsedMs)||r.elapsedMs<0||r.elapsedMs>180000)throw 0;
  const bytes=Buffer.from(JSON.stringify(r)+'\n');if(written+bytes.length>32768)throw 0;
  fd=openSync(join(root,'n2-progress.ndjson'),constants.O_WRONLY|constants.O_APPEND|constants.O_NOFOLLOW);
  const s=fstatSync(fd);if(!s.isFile()||(s.mode&0o777)!==0o600||s.nlink!==1||s.uid!==process.getuid()||s.gid!==process.getgid()||s.size!==written)throw 0;
  if(writeSync(fd,bytes)!==bytes.length)throw 0;written+=bytes.length;sequence++;
 }catch{fault();}finally{if(fd!==undefined)try{closeSync(fd);}catch{}}
}
append({kind:'binding',...binding});
guardObserver.bind(append,fault);
export const guardFinal=()=>guardObserver.finish();
export const ready=()=>!disabled&&sequence>0;
export const captureFault=()=>fault();
export function flow(id,operation,edge,error=null,counters=null){
 if(edge==='return'&&operation==='count'&&!validCounters(counters))throw Error('N2_COUNTER_CAPTURE_INVALID');
 append({kind:'flow',id,operation,edge,error:edge==='throw'?safeError(error,root):null,counters});
}
export function blocked(id){append({kind:'blocked',id,code:'PREREQUISITE_BLOCKED',workEntered:false});}
export function after(edge,error=null){if(edge==='enter')guardObserver.setWindow('unscoped');append({kind:'after',edge,error:edge==='throw'?safeError(error,root):null});}
export function http(operation,edge,status=null,bodySettled=null,error=null){if(edge==='enter')guardObserver.setWindow(operation);append({kind:'http',operation,edge,status,bodySettled,error:edge==='throw'?safeError(error,root):null});if(edge==='return'||edge==='throw')guardObserver.setWindow(operation==='notices-post'?'after-post':'unscoped');}
export function form(handle){if(typeof handle==='string'&&/^[a-f0-9]{64}$/.test(handle))ticketHash=createHash('sha256').update(handle).digest('hex');else fault();}
const slot=createObservationSlot();
export async function beforeProbe(read){
 if(beforeCalled){fault();return;}beforeCalled=true;guardObserver.baseline();
 try{const got=await slot.read(read);baseline=got.ok?boundedProbe(got.value):null;}catch{baseline=null;}
 append({kind:'probe',stage:'before',...unknownProbe(),state:baseline?'observed':'unavailable'});
}
export async function afterProbe(read){
 if(afterCalled){fault();return;}afterCalled=true;
 let result=unknownProbe();
 try{const got=await slot.read(read);if(got.ok&&baseline)result=sanitizeProbeDelta(baseline,got.value,root,ticketHash);}catch{}
 append({kind:'probe',stage:'after',...result});baseline=null;
}
