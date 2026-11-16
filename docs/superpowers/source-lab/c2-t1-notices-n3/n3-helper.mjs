import {openSync,closeSync,writeSync,fstatSync,constants} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {safeError,validCounters,boundedProbe,sanitizeProbeDelta,unknownProbe,n3TraceReplay} from './n3-reader.mjs';
import {createObservationSlot} from './n3-slot.mjs';
import {guardObserver} from './n3-logger.mjs';
const root=process.env.AFW_C2_DIAG_ROOT,started=process.hrtime.bigint();
const binding={sourceIndexHash:process.env.AFW_N3_INDEX_HASH,driverHash:process.env.AFW_N3_DRIVER_HASH,selectionHash:process.env.AFW_N3_SELECTION_HASH,helperHash:process.env.AFW_N3_HELPER_HASH,readerHash:process.env.AFW_N3_READER_HASH,slotHash:process.env.AFW_N3_SLOT_HASH,loggerHash:process.env.AFW_N3_LOGGER_HASH,worldHash:process.env.AFW_N3_WORLD_HASH,ledgerHash:process.env.AFW_N3_LEDGER_HASH,transformHash:process.env.AFW_N3_TRANSFORM_HASH,producerManifestHash:process.env.AFW_N3_MANIFEST_HASH};
let sequence=0,written=0,disabled=false,beforeCalled=false,afterCalled=false,baseline=null,ticketHash=null,compilationWritten=false;
function fault(){disabled=true;try{process.stderr.write('AFW_C2_N3_RECORDER_FAULT\n');}catch{}}
function append(fields){
 if(disabled)return;let fd;
 try{
  if(sequence>=128||Object.values(binding).some(v=>typeof v!=='string'||!/^[a-f0-9]{64}$/.test(v)))throw 0;
  const r={sequence:sequence+1,elapsedMs:Number((process.hrtime.bigint()-started)/1000000n),...fields};
  if(!Number.isSafeInteger(r.elapsedMs)||r.elapsedMs<0||r.elapsedMs>180000)throw 0;
  const bytes=Buffer.from(JSON.stringify(r)+'\n');if(written+bytes.length>32768)throw 0;
  fd=openSync(join(root,'n3-progress.ndjson'),constants.O_WRONLY|constants.O_APPEND|constants.O_NOFOLLOW);
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
 if(edge==='return'&&operation==='count'&&!validCounters(counters))throw Error('N3_COUNTER_CAPTURE_INVALID');
 append({kind:'flow',id,operation,edge,error:edge==='throw'?safeError(error,root):null,counters});
}
export function blocked(id){append({kind:'blocked',id,code:'PREREQUISITE_BLOCKED',workEntered:false});}
export function after(edge,error=null){if(edge==='enter')guardObserver.setWindow('unscoped');append({kind:'after',edge,error:edge==='throw'?safeError(error,root):null});}
export function http(operation,edge,status=null,bodySettled=null,error=null){if(edge==='enter')guardObserver.setWindow(operation);append({kind:'http',operation,edge,status,bodySettled,error:edge==='throw'?safeError(error,root):null});if(edge==='return'||edge==='throw')guardObserver.setWindow(operation==='notices-post'?'after-post':'unscoped');}
export function form(handle){if(typeof handle==='string'&&/^[a-f0-9]{64}$/.test(handle))ticketHash=createHash('sha256').update(handle).digest('hex');else fault();}
const slot=createObservationSlot();
const unknownCausal=reason=>({schema:'afw.c2-notices-n3.qa-snapshot.v1',state:'unjoined',coverage:'unknown',reason,eligible:0,target:'unknown',focus:{mode:'selected-first-target-focus',pairChild:null,selection:'none'},leases:[],promises:[],errors:[],events:[],firstError:null,cut:null});
function peel(value){
 if(!value||typeof value!=='object'||Array.isArray(value))return {core:null,causal:null,over:false};
 const {causal,...rest}=value,core=boundedProbe(rest);
 let over=true;try{over=Buffer.byteLength(JSON.stringify(value))>131072;}catch{}
 return {core,causal,over};
}
export async function beforeProbe(read){
 if(beforeCalled){fault();return;}beforeCalled=true;guardObserver.baseline();
 try{const got=await slot.read(read);baseline=got.ok?peel(got.value).core:null;}catch{baseline=null;}
 append({kind:'probe',stage:'before',...unknownProbe(),state:baseline?'observed':'unavailable'});
}
export async function afterProbe(read){
 if(afterCalled){fault();return;}afterCalled=true;
 let result=unknownProbe(),causal=unknownCausal('PROBE_UNAVAILABLE');
 try{
  const got=await slot.read(read);
  if(got.ok){
   const split=peel(got.value);
   if(split.core&&baseline)result=sanitizeProbeDelta(baseline,split.core,root,ticketHash);
   if(split.over)causal=unknownCausal('OUTER_LIMIT');
   else if(split.causal!==undefined&&split.causal!==null){
    if(!n3TraceReplay(split.causal).valid){fault();return;}
    causal=split.causal;
   }
  }
 }catch{}
 append({kind:'probe',stage:'after',...result});
 const envelope={sequence:sequence+1,elapsedMs:180000,kind:'causal',schema:'afw.c2-notices-n3.causal-record.v1',snapshot:causal};
 if(Buffer.byteLength(JSON.stringify(envelope)+'\n')>6144)causal=unknownCausal('OUTER_LIMIT');
 append({kind:'causal',schema:'afw.c2-notices-n3.causal-record.v1',snapshot:causal});baseline=null;
}
export function compilation(value){
 if(compilationWritten){fault();return;}compilationWritten=true;
 let fd;
 try{
  const bytes=Buffer.from(JSON.stringify(value)+'\n');if(bytes.length>8192)throw 0;
  fd=openSync(join(root,'n3-compilation.json'),constants.O_WRONLY|constants.O_CREAT|constants.O_EXCL|constants.O_NOFOLLOW,0o600);
  const s=fstatSync(fd);if(!s.isFile()||(s.mode&0o777)!==0o600||s.nlink!==1||s.uid!==process.getuid()||s.gid!==process.getgid()||s.size!==0)throw 0;
  if(writeSync(fd,bytes)!==bytes.length)throw 0;
 }catch{fault();}finally{if(fd!==undefined)try{closeSync(fd);}catch{}}
}
