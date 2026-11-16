import {createHash} from 'node:crypto';
const exact=(v,n)=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===n.length&&Object.keys(v).every((k,i)=>k===n[i]);
const range=(v,a,b)=>Number.isSafeInteger(v)&&v>=a&&v<=b;
export const IDS=['NG_CONNECTION','NG_OAUTH','NG_PHASE','NG_NOTICES','NG_MONITOR','NG_NEXT_GET'];
export const SITES=['initial-timeline','timeline','op-source','op-check','op-step','finite-permission','finite-history','ticket-put','ticket-readback'];
const errNames=[null,'AssertionError','Error','TypeError','RangeError','SyntaxError','AggregateError','AbortError','TimeoutError'];
const errCodes=[null,'ERR_ASSERTION','ERR_TEST_FAILURE','ABORT_ERR','ETIMEDOUT','ENOENT','ERR_MODULE_NOT_FOUND','ECONNRESET','ERR_INVALID_ARG_TYPE'];
const unknownRetention=()=>({state:'unavailable',count:null});
const unknownTickets=()=>({state:'unavailable',count:null,uses:null});
const retention=r=>exact(r,['state','count'])&&['active','absent','unavailable'].includes(r.state)&&(r.state==='unavailable'?r.count===null:range(r.count,0,4096)&&(r.state!=='absent'||r.count===0));
const tickets=t=>exact(t,['state','count','uses'])&&['observed','unavailable'].includes(t.state)&&(t.state==='unavailable'?t.count===null&&t.uses===null:range(t.count,0,3)&&range(t.uses,0,3));
const error=e=>exact(e,['name','code','site'])&&errNames.includes(e.name)&&errCodes.includes(e.code)&&(e.site===null||exact(e.site,['file','line','column'])&&/^(?:S0[0-689]|S1[012]|D07)$/.test(e.site.file)&&range(e.site.line,1,999999)&&range(e.site.column,1,999999));
const margin=(v,n)=>v===null||range(v,-n,n);
export function validStat(s){return Array.isArray(s)&&s.length===8&&SITES.includes(s[0])&&s.slice(1,5).every(v=>range(v,0,4096))&&s[4]===s[1]-s[2]-s[3]&&range(s[5],0,180000)&&margin(s[6],30000)&&margin(s[7],900000);}
export function validateTrace(v,indexHash){
 if(!exact(v,['schema','sourceIndexHash','epoch','workerElapsedMs','fault','events','stats'])||v.schema!=='afw.c2-next-get.worker.v1'||v.sourceIndexHash!==indexHash||v.epoch!==1||!range(v.workerElapsedMs,0,180000)||typeof v.fault!=='boolean'||!Array.isArray(v.events)||v.events.length>27||!Array.isArray(v.stats)||v.stats.length>9)return false;
 const seen=new Set();let at=0;
 for(let i=0;i<v.events.length;i++){const e=v.events[i];if(!exact(e,['workerSequence','workerElapsedMs','site','edge','remainingMs','ceilingMs'])||e.workerSequence!==i+1||!range(e.workerElapsedMs,at,180000)||!SITES.includes(e.site)||!['enter','return','throw'].includes(e.edge)||!margin(e.remainingMs,30000)||!margin(e.ceilingMs,900000)||seen.has(e.site+'/'+e.edge))return false;at=e.workerElapsedMs;seen.add(e.site+'/'+e.edge);}
 const sites=new Set();for(const s of v.stats){if(!validStat(s)||sites.has(s[0]))return false;sites.add(s[0]);}
 return v.events.every(e=>sites.has(e.site));
}
export function parseNative(raw,ids=IDS){
 const result={integrity:'unknown',cases:[],sourceFileFailure:false};
 if(!Buffer.isBuffer(raw)||raw.length>1048576)return result;
 let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(raw);}catch{return result;}
 if(text.split(/\r?\n/).filter(line=>line==='TAP version 13').length!==1)return result;
 for(const line of text.split(/\r?\n/)){
  if(/\b(?:SKIP|TODO)\b/.test(line))return result;
  const m=/^(not )?ok [0-9]+ - (.+)$/.exec(line);if(!m)continue;
  if(m[1]&&(m[2]==='test/mcp-qa-finite-owner-three-stage-native.test.mjs'||m[2].endsWith('/test/mcp-qa-finite-owner-three-stage-native.test.mjs'))){if(result.sourceFileFailure)return result;result.sourceFileFailure=true;continue;}
  if(result.cases.length>=ids.length||m[2]!==ids[result.cases.length])return result;
  result.cases.push({id:m[2],status:m[1]?'fail':'pass'});
 }
 result.integrity=result.cases.length===ids.length?'complete':'prefix';return result;
}
export function readObservation(raw,binding,condition='normal',writerFault=false){
 const result={valid:false,code:'JOURNAL_INVALID',integrity:'unknown',flow:[],http:{requestEntered:false,responseArrived:false,status:null,bodyReadSettled:null,requestMs:null,responseMs:null,bodyMs:null},tickets:{before:unknownTickets(),after:unknownTickets(),delta:null},checkpoints:[],retention:{before:unknownRetention(),latest:unknownRetention(),after:unknownRetention()},writerFault};
 const stop=code=>{result.code=code;return result;};
 if(writerFault||!Buffer.isBuffer(raw)||raw.length>32768||!exact(binding,['sourceIndexHash','selectionHash','driverHash'])||Object.values(binding).some(v=>typeof v!=='string'||!/^[a-f0-9]{64}$/.test(v)))return result;
 let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(raw);}catch{return result;}
 const lines=text.split('\n');if(lines.pop()!=='')return stop('JOURNAL_TORN');
 if(lines.length<1||lines.length>128)return result;
 let elapsed=0,caseAt=0,stage=0,afterStage=0,workerAt=0,workerElapsed=0,metadataBefore=false,metadataAfter=false;
 const firstEdges=new Set(),lastStats=new Map();
 for(let i=0;i<lines.length;i++){
  let r;try{r=JSON.parse(lines[i]);}catch{return result;}
  if(JSON.stringify(r)!==lines[i]||r.sequence!==i+1||!range(r.elapsedMs,elapsed,180000))return result;elapsed=r.elapsedMs;
  if(i===0){if(!exact(r,['sequence','elapsedMs','kind','sourceIndexHash','selectionHash','driverHash'])||r.kind!=='binding'||Object.keys(binding).some(k=>r[k]!==binding[k]))return stop('BINDING_INVALID');continue;}
  if(r.kind==='flow'){
   if(!exact(r,['sequence','elapsedMs','kind','id','operation','edge','error'])||!['enter','return','throw'].includes(r.edge)||(r.edge==='throw'?!error(r.error):r.error!==null))return result;
   if(r.id==='AFTER'){
    if(caseAt!==IDS.length||r.operation!=='after'||(afterStage===0?r.edge!=='enter':afterStage===1?!['return','throw'].includes(r.edge):true))return stop('ORDER_INVALID');
    afterStage++;continue;
   }
   if(afterStage||r.id!==IDS[caseAt]||r.operation!==(stage<2?'action':'count')||(stage%2===0?r.edge!=='enter':!['return','throw'].includes(r.edge)))return stop('ORDER_INVALID');
   let row=result.flow[caseAt];if(!row){row={id:r.id,action:'entered',count:'unobserved',actionError:null,countError:null};result.flow.push(row);}
   if(stage===1){row.action=r.edge==='return'?'returned':'threw';row.actionError=r.error;}
   if(stage===2)row.count='entered';if(stage===3){row.count=r.edge==='return'?'returned':'threw';row.countError=r.error;}
   stage++;if(stage===4){stage=0;caseAt++;}continue;
  }
  if(r.kind==='http'){
   if(!exact(r,['sequence','elapsedMs','kind','edge','status'])||caseAt!==5||stage!==1||afterStage)return stop('HTTP_INVALID');
   const h=result.http;
   if(r.edge==='request'){if(h.requestEntered||r.status!==null)return stop('HTTP_INVALID');h.requestEntered=true;h.requestMs=r.elapsedMs;}
   else if(r.edge==='response'){if(!h.requestEntered||h.responseArrived||!range(r.status,100,599))return stop('HTTP_INVALID');h.responseArrived=true;h.status=r.status;h.responseMs=r.elapsedMs;}
   else if(['body-return','body-throw'].includes(r.edge)){if(!h.responseArrived||h.bodyReadSettled!==null||r.status!==h.status)return stop('HTTP_INVALID');h.bodyReadSettled=r.edge==='body-return';h.bodyMs=r.elapsedMs;}
   else return stop('HTTP_INVALID');continue;
  }
  if(r.kind==='metadata'){
   if(!exact(r,['sequence','elapsedMs','kind','stage','tickets','retention'])||!['before','after'].includes(r.stage)||caseAt!==5||stage!==1||!tickets(r.tickets)||!retention(r.retention))return stop('METADATA_INVALID');
   if(r.stage==='before'){if(metadataBefore||result.http.requestEntered)return stop('METADATA_INVALID');metadataBefore=true;}
   else{if(metadataAfter||!result.http.requestEntered)return stop('METADATA_INVALID');metadataAfter=true;}
   result.tickets[r.stage]=r.tickets;result.retention[r.stage]=r.retention;result.retention.latest=r.retention;continue;
  }
  if(r.kind==='worker-edge'){
   if(!exact(r,['sequence','elapsedMs','kind','workerSequence','workerElapsedMs','site','edge','remainingMs','ceilingMs'])||caseAt!==5||stage!==1||r.workerSequence!==workerAt+1||!range(r.workerElapsedMs,workerElapsed,180000)||!SITES.includes(r.site)||!['enter','return','throw'].includes(r.edge)||!margin(r.remainingMs,30000)||!margin(r.ceilingMs,900000)||firstEdges.has(r.site+'/'+r.edge))return stop('TRACE_INVALID');
   workerAt=r.workerSequence;workerElapsed=r.workerElapsedMs;firstEdges.add(r.site+'/'+r.edge);continue;
  }
  if(r.kind==='worker-state'){
   if(!exact(r,['sequence','elapsedMs','kind','epoch','workerSequence','workerElapsedMs','fault','stats','retention'])||caseAt!==5||stage!==1||r.epoch!==1||r.workerSequence!==workerAt||!range(r.workerElapsedMs,workerElapsed,180000)||r.fault!==false||!Array.isArray(r.stats)||r.stats.length>9||!retention(r.retention))return stop('TRACE_INVALID');
   const sites=new Set();
   for(const s of r.stats){const old=lastStats.get(s?.[0]);if(!validStat(s)||sites.has(s[0])||old&&[1,2,3,5].some(k=>s[k]<old[k]))return stop('TRACE_INVALID');sites.add(s[0]);lastStats.set(s[0],s);}
   if([...lastStats.keys()].some(s=>!sites.has(s)))return stop('TRACE_INVALID');
   workerElapsed=r.workerElapsedMs;result.checkpoints=r.stats;result.retention.latest=r.retention;continue;
  }
  if(r.kind==='worker-unavailable'){if(!exact(r,['sequence','elapsedMs','kind'])||caseAt!==5||stage!==1)return stop('TRACE_INVALID');result.retention.latest=unknownRetention();continue;}
  return result;
 }
 const complete=caseAt===IDS.length&&stage===0&&afterStage===2;
 if(!complete&&condition!=='timeout')return result;
 if(result.tickets.before.state==='observed'&&result.tickets.after.state==='observed')result.tickets.delta=result.tickets.after.count-result.tickets.before.count;
 result.valid=true;result.code='OK';result.integrity=complete?'complete':'prefix';return result;
}
export function nativeJoin(observation,native){
 if(!observation.valid||native.integrity==='unknown')return false;
 for(const item of native.cases){const row=observation.flow.find(f=>f.id===item.id),complete=row&&['returned','threw'].includes(row.action)&&['returned','threw'].includes(row.count);
  if(item.status==='pass'&&(!complete||row.action!=='returned'||row.count!=='returned'))return false;
  if(complete&&item.status!==(row.action==='threw'||row.count==='threw'?'fail':'pass'))return false;
 }return observation.integrity!=='complete'||native.integrity==='complete';
}
export function runControls(vectors){
 if(vectors?.schema!=='afw.c2-next-get.controls.v1'||vectors.syntheticOnly!==true||vectors.notSourceEvidence!==true)throw Error('CONTROL_INVALID');
 const all=[...vectors.accepted,...vectors.rejected];let accepted=0,rejected=0,roundtrips=0;
 for(const vector of all){
  const input=structuredClone(vectors.base);let tail='';
  for(const edit of vector.edits){
   if(edit.op==='insert'){input.records.splice(edit.index,0,{sequence:0,elapsedMs:0,...edit.value});input.records.forEach((r,i)=>{r.sequence=i+1;r.elapsedMs=i;});continue;}
   if(edit.op==='tail'){tail=edit.value;continue;}if(edit.op==='truncate'){input.records=input.records.slice(0,edit.count);continue;}
   if(!['set','replace'].includes(edit.op)||!Array.isArray(edit.path)||!edit.path.length)throw Error('CONTROL_INVALID');
   let target=input;for(const key of edit.path.slice(0,-1))target=target[key];target[edit.path.at(-1)]=structuredClone(edit.value);
  }
  const raw=Buffer.from(input.records.map(r=>JSON.stringify(r)+'\n').join('')+tail),result=readObservation(raw,input.binding,input.condition,input.writerFault),native=parseNative(Buffer.from(input.tap));
  const actual=result.valid&&!nativeJoin(result,native)?{...result,valid:false,code:'NATIVE_INVALID'}:result;
  const wanted=vector.expected;
  if(actual.valid!==wanted.valid||actual.code!==wanted.code||wanted.valid&&(actual.integrity!==wanted.integrity||actual.http.status!==wanted.status||actual.http.bodyReadSettled!==wanted.bodyReadSettled||actual.tickets.delta!==wanted.ticketDelta||Object.hasOwn(wanted,'latestRetention')&&actual.retention.latest.state!==wanted.latestRetention))throw Error('CONTROL_INVALID');
  if(wanted.valid){const w=safeWitness(raw,input.binding,input.condition,input.writerFault);if(!verifyWitness(w)||w.prefixBytes!==raw.length||w.prefixSha256!==digest(raw))throw Error('CONTROL_INVALID');accepted++;roundtrips++;}else rejected++;
 }
 const baseRaw=Buffer.from(vectors.base.records.map(r=>JSON.stringify(r)+'\n').join(''));const witness=safeWitness(baseRaw,vectors.base.binding,vectors.base.condition,false);
 if(!verifyWitness(witness)||witness.prefixBytes!==vectors.witnessVectors.expected.prefixBytes||witness.prefixSha256!==vectors.witnessVectors.expected.prefixSha256)throw Error('CONTROL_INVALID');
 for(const item of vectors.witnessVectors.rejected){const changed=structuredClone(witness);changed[item.field]=item.value;if(verifyWitness(changed))throw Error('CONTROL_INVALID');rejected++;}
 return {accepted,rejected,roundtrips};
}

export {retention as validRetention};

const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
export function safeWitness(raw,binding,condition,writerFault){
 const observed=readObservation(raw,binding,condition,writerFault);
 if(!observed.valid)return {integrity:'unknown',records:[],prefixBytes:0,prefixSha256:digest(Buffer.alloc(0))};
 const records=new TextDecoder('utf-8',{fatal:true}).decode(raw).slice(0,-1).split('\n').map(line=>JSON.parse(line));
 const encoded=Buffer.from(records.map(r=>JSON.stringify(r)+'\n').join(''));
 if(!encoded.equals(raw))return {integrity:'unknown',records:[],prefixBytes:0,prefixSha256:digest(Buffer.alloc(0))};
 return {integrity:observed.integrity,records,prefixBytes:encoded.length,prefixSha256:digest(encoded)};
}
export function verifyWitness(w){
 if(!exact(w,['integrity','records','prefixBytes','prefixSha256'])||!['complete','prefix','unknown'].includes(w.integrity)||!Array.isArray(w.records)||w.records.length>128||!range(w.prefixBytes,0,32768)||typeof w.prefixSha256!=='string'||!/^[a-f0-9]{64}$/.test(w.prefixSha256))return false;
 const bytes=Buffer.from(w.records.map(r=>JSON.stringify(r)+'\n').join(''));
 return bytes.length===w.prefixBytes&&digest(bytes)===w.prefixSha256&&(w.integrity!=='unknown'||w.records.length===0);
}
