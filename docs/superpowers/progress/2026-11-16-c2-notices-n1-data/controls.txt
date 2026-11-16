import {readObservation,parseNative,nativeJoin,safeWitness,verifyWitness,sanitizeProbeDelta} from './n1-reader.mjs';
import {runSlotControls} from './n1-slot.mjs';
const fail=()=>{throw Error('N1_SYNTHETIC_CONTROL_INVALID');};
const assert=x=>{if(!x)fail();};
function renumber(input){input.records.forEach((r,i)=>{r.sequence=i+1;r.elapsedMs=i;});}
function flowThrow(input,id,operation,error){
 const r=input.records.find(r=>r.kind==='flow'&&r.id===id&&r.operation===operation&&r.edge==='return');if(!r)fail();
 r.edge='throw';r.error=error;r.counters=null;input.native.find(n=>n.id===id).status='fail';
}
function block(input,id,error){
 flowThrow(input,id,'action',error);const at=input.native.findIndex(n=>n.id===id);
 const following=input.native.slice(at+1);for(const n of following)n.status='fail';
 const start=input.records.findIndex(r=>r.kind==='flow'&&r.id===following[0]?.id);
 const end=input.records.findIndex(r=>r.kind==='after');if(start<0||end<start)fail();
 input.records.splice(start,end-start,...following.map(n=>({sequence:0,elapsedMs:0,kind:'blocked',id:n.id,code:'PREREQUISITE_BLOCKED',workEntered:false})));renumber(input);
}
function edits(input,list){
 for(const e of list){
  if(e.op==='flowThrow')flowThrow(input,e.id,e.operation,e.error);
  else if(e.op==='failAndBlock')block(input,e.id,e.error);
  else if(e.op==='httpStatus'){for(const r of input.records)if(r.kind==='http'&&r.operation===e.operation&&r.status!==null)r.status=e.status;}
  else if(e.op==='httpThrow'){const r=input.records.find(r=>r.kind==='http'&&r.operation===e.operation&&r.edge==='return');r.edge='throw';r.bodySettled=false;r.error=e.error;}
  else if(e.op==='probeUnavailable'){for(const r of input.records)if(r.kind==='probe'){r.state='unavailable';r.newFailures=null;r.correlated=null;r.position=null;r.correlators=[];r.sites=[];r.guardOrigin='unknown';r.summary={consumedTicket:null,stageApproval:null,receiptCount:null};}}
  else fail();
 }
 renumber(input);
}
function tap(input){
 const lines=['TAP version 13'];for(const [i,n]of input.native.entries())lines.push('# Subtest: '+n.id,(n.status==='pass'?'':'not ')+'ok '+(i+1)+' - '+n.id,'  ---','  duration_ms: 1',"  type: 'test'",'  ...');
 const passed=input.native.filter(n=>n.status==='pass').length;lines.push('1..'+input.native.length,'# tests '+input.native.length,'# suites 0','# pass '+passed,'# fail '+(input.native.length-passed),'# cancelled 0','# skipped 0','# todo 0','# duration_ms 2','');return Buffer.from(lines.join('\n'));
}
export async function runControls(v){
 assert(v.schema==='afw.c2-notices-n1.controls.v1'&&v.syntheticOnly===true&&v.notSourceEvidence===true);
 const read=(input,tail='')=>{
  const raw=Buffer.from(input.records.map(r=>JSON.stringify(r)+'\n').join('')+tail),observation=readObservation(raw,v.binding),native=parseNative(tap(input));
  return {valid:observation.valid&&nativeJoin(observation,native),raw,observation,native};
 };
 let accepted=0,rejected=0,probeChecks=0,roundtrips=0,witnessRejected=0;
 for(const item of v.accepted){const input=structuredClone(v.base);edits(input,item.edits);const r=read(input);assert(r.valid);accepted++;const w=safeWitness(r.raw,v.binding,'normal',false);assert(verifyWitness(w)&&w.prefixBytes===r.raw.length);roundtrips++;}
 for(const item of v.rejected){
  const x=structuredClone(item.input??v.base),record=(kind,edge)=>x.records.find(r=>r.kind===kind&&(!edge||r.edge===edge));let tail='';
  switch(item.op){
   case 'literal':break;
   case 'extraKey':x.records[1].extra=true;break;
   case 'sequence':x.records[1].sequence=19;break;
   case 'binding':x.records[0].driverHash='f'.repeat(64);break;
   case 'torn':tail='{"';break;
   case 'caseOrder':x.records[1].id='N1_PHASE';break;
   case 'blockedHttp':block(x,'N1_OAUTH',{name:'Error',code:null,site:null});x.records.splice(-2,0,{sequence:0,elapsedMs:0,kind:'http',operation:'notices-get',edge:'enter',status:null,bodySettled:null,error:null});renumber(x);break;
   case 'blockedNativePass':block(x,'N1_OAUTH',{name:'Error',code:null,site:null});x.native.at(-1).status='pass';break;
   case 'nativePassAfterThrow':flowThrow(x,'N1_NOTICES','action',{name:'Error',code:null,site:null});x.native.at(-1).status='pass';break;
   case 'badCounters':x.records.find(r=>r.kind==='flow'&&r.id==='N1_CONNECTION'&&r.operation==='count'&&r.edge==='return').counters={upload:0,activation:0,receipts:0};break;
   case 'httpPrivate':record('http').cookie='SYN';break;
   case 'httpRange':record('http','response').status=600;break;
   case 'httpDuplicate':{const i=x.records.findIndex(r=>r.kind==='http'&&r.edge==='response');x.records.splice(i,0,structuredClone(x.records[i]));renumber(x);break;}
   case 'httpNoResponse':x.records=x.records.filter(r=>!(r.kind==='http'&&r.operation==='notices-get'&&r.edge==='response'));renumber(x);break;
   case 'origin':x.records.find(r=>r.kind==='probe').guardOrigin='child-clock';break;
   case 'probeDuplicate':{const i=x.records.findIndex(r=>r.kind==='probe');x.records.splice(i,0,structuredClone(x.records[i]));renumber(x);break;}
   case 'position':x.records.find(r=>r.kind==='probe').position='unapproved';break;
   case 'message':flowThrow(x,'N1_NOTICES','action',{name:'Error',code:null,site:null,message:'SYN'});break;
   case 'site':flowThrow(x,'N1_NOTICES','action',{name:'Error',code:null,site:{file:'S99',line:1,column:1}});break;
   case 'afterDuplicate':{const i=x.records.findIndex(r=>r.kind==='after');x.records.splice(i,0,structuredClone(x.records[i]));renumber(x);break;}
   case 'nativeExtra':x.native.push({id:'UNKNOWN',status:'pass'});break;
   default:fail();
  }
  assert(!read(x,tail).valid);rejected++;
 }
 for(const p of v.probeControls){const actual=sanitizeProbeDelta(p.before,p.after,'/synthetic');assert(actual.state===p.expected.state&&actual.newFailures===p.expected.newFailures);probeChecks++;}
 const raw=Buffer.from(v.base.records.map(r=>JSON.stringify(r)+'\n').join('')),w=safeWitness(raw,v.binding,'normal',false);
 for(const [key,value]of [['prefixBytes',w.prefixBytes+1],['prefixSha256','f'.repeat(64)]]){const changed=structuredClone(w);changed[key]=value;assert(!verifyWitness(changed));witnessRejected++;}
 const slotChecks=await runSlotControls(v.slotControls);
 return {accepted,rejected,probeChecks,roundtrips,witnessRejected,slotChecks};
}
