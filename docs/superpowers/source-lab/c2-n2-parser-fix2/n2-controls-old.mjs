import {readObservation,parseNative,nativeJoin,safeWitness,verifyWitness,sanitizeProbeDelta} from './n2-reader-old.mjs';
import {runSlotControls} from './n2-slot.mjs';
import {parseGuard,createGuardObserver} from './n2-logger.mjs';
import {createHash} from 'node:crypto';
const fail=()=>{throw Error('N2_SYNTHETIC_CONTROL_INVALID');};
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
 if(input.records.some(r=>r.kind==='http'&&r.operation==='notices-post'&&(r.edge==='throw'||r.edge==='return'&&r.status!==200)))input.records=input.records.filter(r=>!(r.kind==='host-proof'&&r.call===5));
 renumber(input);
}
function tap(input){
 const lines=['TAP version 13'];for(const [i,n]of input.native.entries())lines.push('# Subtest: '+n.id,(n.status==='pass'?'':'not ')+'ok '+(i+1)+' - '+n.id,'  ---','  duration_ms: 1',"  type: 'test'",'  ...');
 const passed=input.native.filter(n=>n.status==='pass').length;lines.push('1..'+input.native.length,'# tests '+input.native.length,'# suites 0','# pass '+passed,'# fail '+(input.native.length-passed),'# cancelled 0','# skipped 0','# todo 0','# duration_ms 2','');return Buffer.from(lines.join('\n'));
}
export async function runControls(v){
 assert(v.schema==='afw.c2-notices-n2.controls.v1'&&v.syntheticOnly===true&&v.notSourceEvidence===true);
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
   case 'caseOrder':x.records[1].id='N2_PHASE';break;
   case 'blockedHttp':block(x,'N2_OAUTH',{name:'Error',code:null,site:null});x.records.splice(-2,0,{sequence:0,elapsedMs:0,kind:'http',operation:'notices-get',edge:'enter',status:null,bodySettled:null,error:null});renumber(x);break;
   case 'blockedNativePass':block(x,'N2_OAUTH',{name:'Error',code:null,site:null});x.native.at(-1).status='pass';break;
   case 'nativePassAfterThrow':flowThrow(x,'N2_NOTICES','action',{name:'Error',code:null,site:null});x.native.at(-1).status='pass';break;
   case 'badCounters':x.records.find(r=>r.kind==='flow'&&r.id==='N2_CONNECTION'&&r.operation==='count'&&r.edge==='return').counters={upload:0,activation:0,receipts:0};break;
   case 'httpPrivate':record('http').cookie='SYN';break;
   case 'httpRange':record('http','response').status=600;break;
   case 'httpDuplicate':{const i=x.records.findIndex(r=>r.kind==='http'&&r.edge==='response');x.records.splice(i,0,structuredClone(x.records[i]));renumber(x);break;}
   case 'httpNoResponse':x.records=x.records.filter(r=>!(r.kind==='http'&&r.operation==='notices-get'&&r.edge==='response'));renumber(x);break;
   case 'origin':x.records.find(r=>r.kind==='probe').guardOrigin='child-clock';break;
   case 'probeDuplicate':{const i=x.records.findIndex(r=>r.kind==='probe');x.records.splice(i,0,structuredClone(x.records[i]));renumber(x);break;}
   case 'position':x.records.find(r=>r.kind==='probe').position='unapproved';break;
   case 'message':flowThrow(x,'N2_NOTICES','action',{name:'Error',code:null,site:null,message:'SYN'});break;
   case 'site':flowThrow(x,'N2_NOTICES','action',{name:'Error',code:null,site:{file:'S99',line:1,column:1}});break;
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
 let guardAccepted=0,guardRejected=0,guardTransitions=0,invarianceChecks=0,guardRecordRejected=0;
 for(const item of v.guardControls.accepted){assert(JSON.stringify(parseGuard(item.message))===JSON.stringify(item.expected));guardAccepted++;}
 for(const item of v.guardControls.rejected){let rejected=false;try{rejected=parseGuard(item.message)===null;}catch{rejected=true;}assert(rejected);guardRejected++;}
 const tag=id=>v.guardControls.accepted.find(x=>x.id===id)?.message??fail();
 for(const item of v.guardControls.transitions){
  const log=createGuardObserver(),records=[];let faults=0,throwing=false,rpc=0;
  log.bind(value=>{if(throwing)throw Error('SYN_SINK');records.push(value);},()=>{faults++;});
  const originalFetch=globalThis.fetch;globalThis.fetch=()=>{rpc++;throw Error('SYN_RPC_FORBIDDEN');};
  try{
   for(const [op,arg]of item.steps){
    if(op==='tag'){const result=log.handler({level:'info',message:tag(arg)});assert(result===undefined);}
    else if(op==='baseline')log.baseline();else if(op==='window')log.setWindow(arg);else if(op==='final')log.finish();
    else if(op==='throwing-sink'){throwing=true;const original={synthetic:true};let retained=false;try{try{throw original;}finally{const result=log.handler({level:'info',message:tag('EXACT_CHILD_CLOCK')});assert(result===undefined);}}catch(value){retained=value===original;}assert(retained);}
    else fail();
   }
  }finally{globalThis.fetch=originalFetch;}
  const guards=records.filter(r=>r.kind==='guard'),last=records.findLast(r=>r.kind==='hook-state');
  if(Object.hasOwn(item.expected,'guards'))assert(guards.length===item.expected.guards);
  if(Object.hasOwn(item.expected,'excluded'))assert(last?.excludedTags===item.expected.excluded);
  if(item.expected.windows)assert(JSON.stringify(guards.map(r=>r.window))===JSON.stringify(item.expected.windows));
  if(item.expected.fault)assert(faults>0);
  assert(rpc===0);guardTransitions++;
 }
 const digest=x=>createHash('sha256').update(x).digest('hex');
 for(const item of v.guardControls.invariance){
  const records=[],log=createGuardObserver();let faults=0,callbackCalls=0,getterCalls=0,setterCalls=0,retained=false;
  const content='export default {};',bytes=Buffer.byteLength(content),hash=digest(content),callback=()=>{callbackCalls++;};
  const worker=name=>({config:{name,manifest:{mainModule:'index.mjs',modules:{'index.mjs':{type:'esm',contents:content}}},compatibilityDate:'2026-09-07'},dev:{outboundService:callback}});
  const options={workers:[worker('canary-first-connection'),worker('qa-first-connection')]},expected={M:{bytes,sha256:hash},QA:{bytes,sha256:hash}};
  log.bind(r=>records.push(r),()=>{faults++;});
  const existing=()=>{};
  if(item.mutate==='existing')options.handleStructuredLogs=existing;
  if(item.mutate==='data-undefined')options.handleStructuredLogs=undefined;
  if(item.mutate==='same-handler')options.handleStructuredLogs=log.handler;
  if(item.mutate==='accessor')Object.defineProperty(options,'handleStructuredLogs',{configurable:true,enumerable:true,get(){getterCalls++;return undefined;},set(value){setterCalls++;}});
  if(item.mutate==='accessor'){const original={synthetic:true};try{try{throw original;}finally{log.prepare(options,'adopt',expected);}}catch(value){retained=value===original;}}
  else log.prepare(options,'adopt',expected);
  if(item.mutate==='script')options.workers[0].config.manifest.modules['index.mjs'].contents+=' ';
  else if(item.mutate==='setting')options.workers[0].config.compatibilityDate='2026-09-08';
  else if(item.mutate==='callback')options.workers[0].dev.outboundService=()=>{};
  else if(item.mutate==='lost-hook')delete options.handleStructuredLogs;
  if(item.mutate==='late-complete')log.finish();
  log.complete(options,'adopt');
  const compared=records.length===2&&records.every(r=>r.settingsEqual&&r.callbackSame&&r.referencesSame&&r.compiledMatch===true)&&faults===0;
  assert(compared===item.expected&&callbackCalls===0);
  if(item.mutate==='existing')assert(options.handleStructuredLogs===existing);
  if(item.mutate==='accessor')assert(getterCalls===0&&setterCalls===0&&retained&&faults>0&&records.length===0);
  if(item.mutate==='late-complete')assert(records.at(-1)?.kind==='hook-state'&&records.every(r=>r.edge!=='returned'));
  invarianceChecks++;
 }
 const guardFields={kind:'guard',guardSequence:1,tag:'initial-child-clock',window:'notices-post',closed:null,aborted:true,alive:true,wallExpired:true,monoExpired:true,wallRegressed:false,monoRegressed:false,correlated:null};
 for(const name of v.guardRecordRejections){
  const literal=v.guardRecordInputs?.[name],x=structuredClone(literal?.input??v.base);let want;
  if(literal){renumber(x);const result=read(x);assert(!result.valid&&result.observation.code===literal.code);guardRecordRejected++;continue;}
  const insertGuard=fields=>{
   const at=x.records.findIndex(r=>r.kind==='http'&&r.operation==='notices-post'&&r.edge==='enter')+1;
   x.records.splice(at,0,{sequence:0,elapsedMs:0,...guardFields,...fields});x.records.findLast(r=>r.kind==='hook-state').newGuards=1;
  };
  if(name==='guard-before-baseline'){x.records.splice(2,0,{sequence:0,elapsedMs:0,...guardFields});want='GUARD_INVALID';}
  else if(name==='guard-sequence-gap'){insertGuard({guardSequence:2});want='GUARD_INVALID';}
  else if(name==='wrong-window'){insertGuard({window:'notices-get'});want='GUARD_INVALID';}
  else if(name==='guard-private-key'){insertGuard({token:'SYN_PRIVATE'});want='GUARD_INVALID';}
  else if(name==='host-hash-mismatch'){x.records.find(r=>r.kind==='host-proof').argumentHash='c'.repeat(64);want='HOST_INVALID';}
  else if(name==='callback-identity-false'){x.records.find(r=>r.kind==='host-proof').callbackSame=false;want='HOST_INVALID';}
  else if(name==='missing-host-return'){x.records=x.records.filter(r=>!(r.kind==='host-proof'&&r.call===5&&r.edge==='returned'));want='HOST_INVALID';}
  else if(name==='late-hook-state-duplicate'){x.records.push(structuredClone(x.records.at(-1)));want='HOOK_INVALID';}
  else if(name==='parent-holders-expiry-invented'){insertGuard({tag:'initial-parent-holders',closed:false,alive:null,wallExpired:false,monoExpired:null,wallRegressed:null,monoRegressed:null});want='GUARD_INVALID';}
  else if(name==='missing-fifth-adoption-on-positive'){x.records=x.records.filter(r=>!(r.kind==='host-proof'&&r.call===5));want='HOST_INVALID';}
  else fail();
  renumber(x);const result=read(x);assert(!result.valid&&result.observation.code===want);guardRecordRejected++;
 }
 return {accepted,rejected,probeChecks,roundtrips,witnessRejected,slotChecks,guardAccepted,guardRejected,guardTransitions,invarianceChecks,guardRecordRejected};
}
