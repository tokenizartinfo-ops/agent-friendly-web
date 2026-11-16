import {createHash} from 'node:crypto';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
export const IDS=['N3_CONNECTION','N3_OAUTH','N3_PHASE','N3_NOTICES'];
const exact=(v,k)=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===k.length&&Object.keys(v).every((x,i)=>x===k[i]);
const range=(v,a,b)=>Number.isSafeInteger(v)&&v>=a&&v<=b;
const hex=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
export const validCounters=c=>exact(c,['upload','activation','receipts'])&&Object.values(c).every(x=>range(x,0,3))&&c.receipts<=c.activation&&c.activation<=c.upload;
const names=[null,'AssertionError','Error','TypeError','RangeError','SyntaxError','AggregateError','AbortError','TimeoutError'];
const codes=[null,'ERR_ASSERTION','ERR_TEST_FAILURE','ABORT_ERR','ETIMEDOUT','ENOENT','ERR_MODULE_NOT_FOUND','ECONNRESET','ERR_INVALID_ARG_TYPE'];
const positions=['entry','approved','enrollment-recorded','enrollment-ack-recorded','upload-send-recorded','upload-native-pending','upload-ack-recorded','upload-observed','activation-send-recorded','activation-native-pending','activation-ack-recorded','activation-observed','receipt-recorded','complete','failed'];
const labels=['preparation','ticket-map','source-snapshot','connection-history','publication-pointer','receipt-physical-hash','writer-head'];
const paths=['lib/mcp-qa-finite-owner-phase-context.mjs','lib/mcp-qa-finite-owner-preparation.mjs','lib/mcp-qa-finite-owner-native-receiver.mjs','worker/mcp-own/finite.mjs','lib/mcp-qa-finite-owner-cleanup-scope.mjs','lib/mcp-qa-finite-owner-cleanup.mjs','lib/mcp-qa-finite-initial-cleanup.mjs','test/mcp-qa-finite-owner-three-stage-native.test.mjs','test/fixtures/finite-coupled-native.mjs','test/fixtures/finite-first-connection-publication.mjs','test/fixtures/finite-initial-entry-world.mjs','test/mcp-qa-finite-first-connection-publication-native.test.mjs','lib/mcp-qa-finite-owner-notice-get-forward.mjs'];
const site=s=>exact(s,['file','line','column'])&&/^(?:S0[0-9]|S1[012]|D0[78]|D10)$/.test(s.file)&&range(s.line,1,999999)&&range(s.column,1,999999);
const error=e=>exact(e,['name','code','site'])&&names.includes(e.name)&&codes.includes(e.code)&&(e.site===null||site(e.site));
export function safeSites(frames,root){
 const out=[];if(!Array.isArray(frames)||frames.length>32||typeof root!=='string')return out;
 for(const line of frames){if(typeof line!=='string'||line.length>4096||!/^    at /.test(line))continue;
  const p=/(?:\(| )((?:file:\/\/\/|\/)[^()\r\n]+):([1-9]\d{0,5}):([1-9]\d{0,5})\)?$/.exec(line);if(!p)continue;
  const i=paths.findIndex(path=>p[1]===join(root,path)||p[1]===pathToFileURL(join(root,path)).href);if(i<0)continue;
  const item={file:i===7?'D07':i===8?'D08':i===10?'D10':'S'+String(i).padStart(2,'0'),line:Number(p[2]),column:Number(p[3])};
  if(!out.some(s=>JSON.stringify(s)===JSON.stringify(item)))out.push(item);if(out.length===6)break;
 }return out;
}
export function safeError(value,root){
 let name=null,code=null,where=null;
 try{if(names.includes(value?.name))name=value.name;if(codes.includes(value?.code))code=value.code;
  if(typeof value?.stack==='string')where=safeSites(value.stack.slice(0,16384).split('\n').slice(1,17),root)[0]??null;
 }catch{}return {name,code,site:where};
}
const emptySummary=()=>({consumedTicket:null,stageApproval:null,receiptCount:null});
export const unknownProbe=()=>({state:'unavailable',newFailures:null,correlated:null,position:null,correlators:[],sites:[],guardOrigin:'unknown',summary:emptySummary()});
export function boundedProbe(value){
 try{const text=JSON.stringify(value);if(Buffer.byteLength(text)>131072)return null;const v=JSON.parse(text);
  if(!v||!Array.isArray(v.observation)||v.observation.length>2048||!Array.isArray(v.calls)||v.calls.length>32||!Array.isArray(v.business)||v.business.length>64||v.business.some(k=>typeof k!=='string'||k.length>256))return null;return v;
 }catch{return null;}
}
export function sanitizeProbeDelta(before,after,root,ticketHash=null){
 const a=boundedProbe(before),b=boundedProbe(after);if(!a||!b||JSON.stringify(b.observation.slice(0,a.observation.length))!==JSON.stringify(a.observation)||JSON.stringify(b.calls.slice(0,a.calls.length))!==JSON.stringify(a.calls))return unknownProbe();
 const delta=b.observation.slice(a.observation.length),failures=delta.filter(x=>x?.kind==='connection-failure');
 if(failures.length>8)return unknownProbe();
 const receipts=b.business.filter(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt')).length;if(receipts>3)return unknownProbe();
 const summary={consumedTicket:hex(ticketHash)?b.business.includes('owner-ticket:'+ticketHash+':use'):null,stageApproval:b.business.some(k=>/^connection-preparation:[a-f0-9]{64}:notices:approval$/.test(k)),receiptCount:receipts};
 if(failures.length>1)return {state:'ambiguous',newFailures:failures.length,correlated:null,position:null,correlators:[],sites:[],guardOrigin:'unknown',summary};
 const one=failures[0],correlators=[...new Set(delta.filter(x=>x?.kind==='correlator'&&labels.includes(x.name)).map(x=>x.name))];
 return {state:'observed',newFailures:failures.length,correlated:null,position:positions.includes(one?.position)?one.position:null,correlators,sites:one?safeSites(one.frames,root):[],guardOrigin:'unknown',summary};
}
function validProbe(r){
 if(!exact(r,['stage','state','newFailures','correlated','position','correlators','sites','guardOrigin','summary'])||!['before','after'].includes(r.stage)||!['observed','unavailable','ambiguous'].includes(r.state)||r.correlated!==null||r.guardOrigin!=='unknown'||!(r.position===null||positions.includes(r.position))||!Array.isArray(r.correlators)||r.correlators.length>7||r.correlators.some(x=>!labels.includes(x))||new Set(r.correlators).size!==r.correlators.length||!Array.isArray(r.sites)||r.sites.length>6||r.sites.some(s=>!site(s))||!exact(r.summary,['consumedTicket','stageApproval','receiptCount']))return false;
 if(![r.summary.consumedTicket,r.summary.stageApproval].every(v=>v===null||typeof v==='boolean')||!(r.summary.receiptCount===null||range(r.summary.receiptCount,0,3)))return false;
 if(r.stage==='before')return r.state!=='ambiguous'&&r.newFailures===null&&r.position===null&&!r.correlators.length&&!r.sites.length&&Object.values(r.summary).every(x=>x===null);
 if(r.state==='unavailable')return r.newFailures===null&&r.position===null&&!r.correlators.length&&!r.sites.length&&Object.values(r.summary).every(x=>x===null);
 if(r.state==='ambiguous')return range(r.newFailures,2,8)&&r.position===null&&!r.correlators.length&&!r.sites.length;
 return range(r.newFailures,0,1)&&(r.newFailures===1||r.position===null&&!r.sites.length);
}
export function readObservation(raw,binding,condition='normal',writerFault=false){
 const out={valid:false,code:'JOURNAL_INVALID',integrity:'unknown',flow:[],http:[],probes:[],after:'unobserved',guards:{count:0,distinctTags:[],interpretation:'unknown'},host:{prepared:0,returned:0,openCall:null,allCompared:null},hook:{callbackObserved:null,excludedTags:0,finalObserved:false},causal:{state:'unjoined',coverage:'unknown',reason:'PROBE_UNAVAILABLE',target:'unknown',firstError:null,focusChild:null,events:0,settlementsObserved:0,interpretation:'unknown'}};
 const bad=code=>{out.code=code;return out;};
 if(writerFault||!Buffer.isBuffer(raw)||raw.length>32768||!exact(binding,['sourceIndexHash','driverHash','selectionHash','helperHash','readerHash','slotHash','loggerHash','worldHash','ledgerHash','transformHash','producerManifestHash'])||!Object.values(binding).every(hex))return out;
 let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(raw);}catch{return out;}
 const lines=text.split('\n');if(lines.pop()!=='')return bad('JOURNAL_TORN');if(!lines.length||lines.length>128)return out;
 let at=0,stage=0,elapsed=0,failed=false,before=false,afterProbe=false;
 let causalSeen=false;let hostPending=null,hostCall=0,baseline=false,hookFinal=false,guardSeq=0,window='prerequisite',excluded=0,callbackObserved=null;
 for(let i=0;i<lines.length;i++){
  let r;try{r=JSON.parse(lines[i]);}catch{return out;}
  if(JSON.stringify(r)!==lines[i]||r.sequence!==i+1||!range(r.elapsedMs,elapsed,180000))return out;elapsed=r.elapsedMs;
  if(hookFinal)return bad('HOOK_INVALID');
  if(i===0){if(!exact(r,['sequence','elapsedMs','kind',...Object.keys(binding)])||r.kind!=='binding'||Object.keys(binding).some(k=>r[k]!==binding[k]))return bad('BINDING_INVALID');continue;}
  if(r.kind==='host-proof'){
   if(!exact(r,['sequence','elapsedMs','kind','call','stage','edge','beforeHash','argumentHash','settingsEqual','callbackSame','referencesSame','compiledMatch','M','QA'])||!range(r.call,1,5)||!['prepared','returned'].includes(r.edge)||!hex(r.beforeHash)||r.beforeHash!==r.argumentHash||r.settingsEqual!==true||r.callbackSame!==true||r.referencesSame!==true)return bad('HOST_INVALID');
   const desc=v=>exact(v,['bytes','sha256'])&&range(v.bytes,0,33554432)&&hex(v.sha256);
   if(r.stage==='constructor'?(r.call!==1||r.compiledMatch!==null||r.M!==null||r.QA!==null):(r.compiledMatch!==true||!desc(r.M)||!desc(r.QA)))return bad('HOST_INVALID');
   if(r.edge==='prepared'){
    if(hostPending||r.call!==hostCall+1||r.stage!==['constructor','assembly','mount','adopt','adopt'][hostCall]||stage!==1)return bad('HOST_INVALID');
    if(r.call<=4?at!==0:!(at===3&&out.http.some(h=>h.operation==='notices-post'&&h.completion==='returned'&&h.status===200)))return bad('HOST_INVALID');
    hostCall=r.call;hostPending=r;out.host.prepared++;out.host.openCall=r.call;out.host.allCompared=true;
   }else{
    if(!hostPending||r.call!==hostPending.call||Object.keys(r).filter(k=>!['sequence','elapsedMs','edge'].includes(k)).some(k=>JSON.stringify(r[k])!==JSON.stringify(hostPending[k])))return bad('HOST_INVALID');
    hostPending=null;out.host.returned++;out.host.openCall=null;
   }continue;
  }
  if(r.kind==='hook-state'){
   if(!exact(r,['sequence','elapsedMs','kind','stage','callbackObserved','excludedTags','newGuards','fault'])||![true,null].includes(r.callbackObserved)||!range(r.excludedTags,0,4096)||r.newGuards!==guardSeq||r.fault!==false||callbackObserved===true&&r.callbackObserved!==true)return bad('HOOK_INVALID');
   if(r.stage==='baseline'){
    if(baseline||hookFinal||at!==3||stage!==1||out.http.length||r.newGuards!==0)return bad('HOOK_INVALID');baseline=true;excluded=r.excludedTags;window='unscoped';
   }else if(r.stage==='after'){
    if(hookFinal||at!==4||stage!==0||!['returned','threw'].includes(out.after)||baseline&&r.excludedTags!==excluded||guardSeq&&r.callbackObserved!==true)return bad('HOOK_INVALID');
    hookFinal=true;out.hook.finalObserved=true;
   }else return bad('HOOK_INVALID');
   callbackObserved=r.callbackObserved;out.hook.callbackObserved=r.callbackObserved;out.hook.excludedTags=r.excludedTags;continue;
  }
  if(r.kind==='guard'){
   if(!exact(r,['sequence','elapsedMs','kind','guardSequence','tag','window','closed','aborted','alive','wallExpired','monoExpired','wallRegressed','monoRegressed','correlated'])||!baseline||hookFinal||r.guardSequence!==guardSeq+1||r.guardSequence>8||r.window!==window||r.correlated!==null)return bad('GUARD_INVALID');
   const boolean=x=>typeof x==='boolean';
   if(r.tag==='initial-parent-holders'){
    if(!boolean(r.closed)||!boolean(r.aborted)||[r.alive,r.wallExpired,r.monoExpired,r.wallRegressed,r.monoRegressed].some(x=>x!==null))return bad('GUARD_INVALID');
   }else if(r.tag==='initial-parent-clock'){
    if(r.alive!==null||![r.closed,r.aborted,r.wallExpired,r.monoExpired,r.wallRegressed,r.monoRegressed].every(boolean))return bad('GUARD_INVALID');
   }else if(r.tag==='initial-child-clock'){
    if(r.closed!==null||![r.aborted,r.alive,r.wallExpired,r.monoExpired,r.wallRegressed,r.monoRegressed].every(boolean))return bad('GUARD_INVALID');
   }else return bad('GUARD_INVALID');
   guardSeq++;out.guards.count=guardSeq;if(!out.guards.distinctTags.includes(r.tag))out.guards.distinctTags.push(r.tag);
   callbackObserved=true;out.hook.callbackObserved=true;continue;
  }
  if(r.kind==='blocked'){
   if(!exact(r,['sequence','elapsedMs','kind','id','code','workEntered'])||stage!==0||!failed||r.id!==IDS[at]||r.code!=='PREREQUISITE_BLOCKED'||r.workEntered!==false)return bad('ORDER_INVALID');
   out.flow.push({id:r.id,workEntered:false,action:'blocked',count:'unobserved',actionError:null,countError:null,counters:null});at++;continue;
  }
  if(r.kind==='flow'){
   if(!exact(r,['sequence','elapsedMs','kind','id','operation','edge','error','counters'])||r.id!==IDS[at]||at>=4||failed&&stage===0||out.after!=='unobserved'||r.operation!==(stage<2?'action':'count')||(stage%2===0?r.edge!=='enter':!['return','throw'].includes(r.edge))||(r.edge==='throw'?!error(r.error):r.error!==null))return bad('ORDER_INVALID');
   if(r.operation==='count'&&r.edge==='return'){if(!validCounters(r.counters))return out;}else if(r.counters!==null)return out;
   if(stage===0)out.flow.push({id:r.id,workEntered:true,action:'entered',count:'unobserved',actionError:null,countError:null,counters:null});
   const row=out.flow.at(-1);
   if(stage===1){if(at===3&&(!baseline||!before))return bad('PROBE_INVALID');if(r.edge==='return'&&(at===0&&(hostCall!==4||hostPending)||at===3&&(hostCall!==5||hostPending)))return bad('HOST_INVALID');if(at===3&&out.http.some(h=>h.completion==='entered'))return bad('HTTP_INVALID');row.action=r.edge==='return'?'returned':'threw';row.actionError=r.error;if(r.edge==='throw')failed=true;
    if(at===3&&r.edge==='return'&&!(out.http.length===2&&out.http.every(h=>h.completion==='returned'&&h.status===200&&h.bodySettled===true)))return bad('HTTP_INVALID');
   }
   if(stage===2){if(at===3&&(!afterProbe||!causalSeen))return bad('PROBE_INVALID');row.count='entered';}
   if(stage===3){row.count=r.edge==='return'?'returned':'threw';row.countError=r.error;row.counters=r.counters;if(r.edge==='throw')failed=true;
    if(row.action==='returned'&&r.edge==='return'&&!Object.values(r.counters).every(v=>v===(at===3?2:1)))return out;
   }
   stage++;if(stage===4){stage=0;at++;}continue;
  }
  if(r.kind==='http'){
   if(!exact(r,['sequence','elapsedMs','kind','operation','edge','status','bodySettled','error'])||at!==3||stage!==1||!before||!baseline||!['notices-get','notices-post'].includes(r.operation)||!(r.status===null||range(r.status,100,599))||!(r.bodySettled===null||typeof r.bodySettled==='boolean')||(r.edge==='throw'?!error(r.error):r.error!==null))return bad('HTTP_INVALID');
   let h=out.http.find(h=>h.operation===r.operation);
   if(r.edge==='enter'){
    if(h||r.status!==null||r.bodySettled!==null||r.operation==='notices-get'&&out.http.length||r.operation==='notices-post'&&!(out.http.length===1&&out.http[0].completion==='returned'&&out.http[0].status===200&&out.http[0].bodySettled===true))return bad('HTTP_INVALID');
    out.http.push({operation:r.operation,entered:true,response:false,status:null,bodySettled:null,completion:'entered'});window=r.operation;continue;
   }
   if(!h||h.completion!=='entered')return bad('HTTP_INVALID');
   if(r.edge==='response'){if(h.response||r.status===null||r.bodySettled!==null)return bad('HTTP_INVALID');h.response=true;h.status=r.status;}
   else if(r.edge==='return'){if(!h.response||r.status!==h.status||r.bodySettled!==true)return bad('HTTP_INVALID');h.bodySettled=true;h.completion='returned';window=r.operation==='notices-post'?'after-post':'unscoped';}
   else if(r.edge==='throw'){if(r.status!==h.status||r.bodySettled!==(h.response?false:null))return bad('HTTP_INVALID');h.bodySettled=r.bodySettled;h.completion='threw';window=r.operation==='notices-post'?'after-post':'unscoped';}
   else return bad('HTTP_INVALID');continue;
  }
  if(r.kind==='probe'){
   if(!exact(r,['sequence','elapsedMs','kind','stage','state','newFailures','correlated','position','correlators','sites','guardOrigin','summary']))return bad('PROBE_INVALID');
   const {sequence,elapsedMs,kind,...p}=r;if(at!==3||!validProbe(p))return bad('PROBE_INVALID');
   if(p.stage==='before'){if(stage!==1||!baseline||before||out.http.length)return bad('PROBE_INVALID');before=true;}
   else{if(stage!==2||afterProbe||!before)return bad('PROBE_INVALID');afterProbe=true;}
   out.probes.push(p);continue;
  }
  if(r.kind==='causal'){
   if(!exact(r,['sequence','elapsedMs','kind','schema','snapshot'])||r.schema!=='afw.c2-notices-n3.causal-record.v1'||at!==3||stage!==2||!afterProbe||causalSeen||Buffer.byteLength(JSON.stringify(r)+'\n')>6144)return bad('CAUSAL_INVALID');
   const trace=n3TraceReplay(r.snapshot);if(!trace.valid)return bad('CAUSAL_INVALID');out.causal=trace.summary;causalSeen=true;continue;
  }
  if(r.kind==='after'){
   if(!exact(r,['sequence','elapsedMs','kind','edge','error'])||at!==4||stage!==0||(out.after==='unobserved'?r.edge!=='enter':out.after==='entered'?!['return','throw'].includes(r.edge):true)||(r.edge==='throw'?!error(r.error):r.error!==null))return bad('ORDER_INVALID');
   out.after=r.edge==='enter'?'entered':r.edge==='return'?'returned':'threw';window='unscoped';continue;
  }
  return out;
 }
 const complete=at===4&&stage===0&&['returned','threw'].includes(out.after)&&hookFinal;
 if(!complete&&condition!=='timeout')return out;
 out.valid=true;out.code='OK';out.integrity=complete?'complete':'prefix';return out;
}
export function parseNative(raw){
 const out={integrity:'unknown',cases:[],sourceFileFailure:false};
 if(!Buffer.isBuffer(raw)||raw.length>1048576)return out;let text;
 try{text=new TextDecoder('utf-8',{fatal:true}).decode(raw);}catch{return out;}
 if(text.split(/\r?\n/).filter(s=>s==='TAP version 13').length!==1)return out;
 for(const line of text.split(/\r?\n/)){
  if(/\b(?:SKIP|TODO)\b/.test(line))return out;
  const m=/^(not )?ok [0-9]+ - (.+)$/.exec(line);if(!m)continue;
  if(m[1]&&(m[2]==='test/mcp-qa-finite-owner-three-stage-native.test.mjs'||m[2].endsWith('/test/mcp-qa-finite-owner-three-stage-native.test.mjs'))){if(out.sourceFileFailure)return out;out.sourceFileFailure=true;continue;}
  if(out.cases.length>=4||m[2]!==IDS[out.cases.length])return out;out.cases.push({id:m[2],status:m[1]?'fail':'pass'});
 }out.integrity=out.cases.length===4?'complete':'prefix';return out;
}
export function nativeJoin(observation,native){
 const reject=()=>{native.integrity='unknown';native.cases=[];return false;};
 if(!observation.valid||native.integrity==='unknown')return reject();
 const cases=[];
 for(const n of native.cases){const row=observation.flow.find(x=>x.id===n.id);if(!row)return reject();
  const blocked=row.action==='blocked',complete=blocked||['returned','threw'].includes(row.action)&&['returned','threw'].includes(row.count);
  if(!complete||n.status!==(blocked||row.action==='threw'||row.count==='threw'?'fail':'pass'))return reject();
  cases.push({id:n.id,status:n.status,code:blocked?'PREREQUISITE_BLOCKED':n.status==='pass'?'OK':'TEST_FAILED',workEntered:row.workEntered});
 }
 if(observation.integrity==='complete'&&(native.integrity!=='complete'||native.sourceFileFailure!==(observation.after==='threw')))return reject();
 native.cases=cases;return true;
}
const digest=b=>createHash('sha256').update(b).digest('hex');
export function verifyWitness(w){
 if(!exact(w,['integrity','records','prefixBytes','prefixSha256'])||!['complete','prefix','unknown'].includes(w.integrity)||!Array.isArray(w.records)||w.records.length>128||!range(w.prefixBytes,0,32768)||!hex(w.prefixSha256))return false;
 const bytes=Buffer.from(w.records.map(r=>JSON.stringify(r)+'\n').join(''));
 return bytes.length===w.prefixBytes&&digest(bytes)===w.prefixSha256&&(w.integrity!=='unknown'||w.records.length===0);
}
export function safeWitness(raw,binding,condition,fault){
 const r=readObservation(raw,binding,condition,fault),empty={integrity:'unknown',records:[],prefixBytes:0,prefixSha256:digest(Buffer.alloc(0))};
 if(!r.valid)return empty;const records=JSON.parse('['+raw.toString('utf8').slice(0,-1).split('\n').join(',')+']'),bytes=Buffer.from(records.map(x=>JSON.stringify(x)+'\n').join(''));
 return bytes.equals(raw)?{integrity:r.integrity,records,prefixBytes:bytes.length,prefixSha256:digest(bytes)}:empty;
}

// Same pinned causal implementation embedded to keep readerHash transitively complete.
export const n3TraceReplay=(()=>{
// N3 diagnostic-only causal replay. Source business authority is never inferred here.
const exact=(v,k)=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===k.length&&Object.keys(v).every((x,i)=>x===k[i]);
const n=(v,a,b)=>Number.isSafeInteger(v)&&v>=a&&v<=b;
const nullable=(x,a,b)=>x===null||n(x,a,b);
const kinds=["scope-enter","target-enter","pair-enter","check-threw","target-return","target-throw","logical-return","logical-throw","abort-observed","close-call","closed-transition","child-finally","retained","settlement-observed","snapshot-cut"],sites=["choice-admitted","postreceipt-check","target-pair","initial-holders","initial-child","initial-retain","initial-settled","initial-close","initial-stop","initial-child-finally","root-abort","root-finish","pair-parent-abort","pair-finally","outer-parent-abort","choice-catch","choice-return","snapshot"],reasons=["OK","NO_ELIGIBLE","MULTIPLE_ELIGIBLE","UNBOUND","AMBIGUOUS_BINDING","PREBIND_GAP","CAP_PRIVATE","CAP_SNAPSHOT","SINK_FAULT","INVALID_EVENT","PROJECTION_GAP","PROBE_UNAVAILABLE","OUTER_LIMIT","OPEN_AT_CUT"];
const error=e=>exact(e,['present','kind','errorOrdinal'])&&(e.present===false&&e.kind==='none'&&e.errorOrdinal===null||e.present===true&&(e.kind==='primitive'&&e.errorOrdinal===null||e.kind==='object'&&n(e.errorOrdinal,1,4)));
const blank=()=>({state:'unjoined',coverage:'unknown',reason:'INVALID_EVENT',target:'unknown',firstError:null,focusChild:null,events:0,settlementsObserved:0,interpretation:'unknown'});
function n3TraceReplay(s){
 const invalid=()=>({valid:false,code:'CAUSAL_INVALID',summary:blank()});
 try{
  if(!exact(s,['schema','state','coverage','reason','eligible','target','focus','leases','promises','errors','events','firstError','cut'])||s.schema!=='afw.c2-notices-n3.qa-snapshot.v1'||!['joined','unjoined','ambiguous'].includes(s.state)||!['complete','prefix','unknown'].includes(s.coverage)||!reasons.includes(s.reason)||!n(s.eligible,0,16)||!['unreached','entered','returned','threw','unknown'].includes(s.target)||!exact(s.focus,['mode','pairChild','selection'])||s.focus.mode!=='selected-first-target-focus'||!nullable(s.focus.pairChild,1,8)||!['first-check-threw','first-observed','none'].includes(s.focus.selection)||!Array.isArray(s.leases)||s.leases.length>8||!Array.isArray(s.promises)||s.promises.length>4||!Array.isArray(s.errors)||s.errors.length>4||!Array.isArray(s.events)||s.events.length>24||!nullable(s.firstError,1,4096)||!nullable(s.cut,1,4096))return invalid();
  const wire={sequence:128,elapsedMs:180000,kind:'causal',schema:'afw.c2-notices-n3.causal-record.v1',snapshot:s};
  if(new TextEncoder().encode(JSON.stringify(wire)+'\n').length>6144)return invalid();
  if(s.state!=='joined'){
   if(s.coverage!=='unknown'||s.reason==='OK'||s.target!=='unknown'||s.focus.pairChild!==null||s.focus.selection!=='none'||s.leases.length||s.promises.length||s.errors.length||s.events.length||s.firstError!==null||s.cut!==null||s.reason==='MULTIPLE_ELIGIBLE'&&(s.state!=='ambiguous'||s.eligible<2)||s.reason==='NO_ELIGIBLE'&&(s.state!=='unjoined'||s.eligible!==0))return invalid();
   return {valid:true,code:'OK',summary:{state:s.state,coverage:s.coverage,reason:s.reason,target:s.target,firstError:null,focusChild:null,events:0,settlementsObserved:0,interpretation:'unknown'}};
  }
  if(s.eligible!==1||!s.events.length||s.cut===null||s.coverage==='complete'&&s.reason!=='OK'||s.coverage!=='complete'&&s.reason==='OK'||s.target==='unknown')return invalid();
  const leases=new Map(),promises=new Map(),errors=new Map(),events=new Map();
  const singleton=new Set();
  for(const [i,l]of s.leases.entries()){
   if(!exact(l,['ordinal','role','parent','firstClose'])||l.ordinal!==i+1||!['root','outer','activation-child','target-pair','pair-child'].includes(l.role)||!nullable(l.parent,1,8)||!nullable(l.firstClose,1,4096))return invalid();
   if(l.role!=='pair-child'){if(singleton.has(l.role))return invalid();singleton.add(l.role);}
   if(l.role==='root'?(l.ordinal!==1||l.parent!==null):!leases.has(l.parent))return invalid();
   const role=leases.get(l.parent)?.role;if(l.role==='outer'&&role!=='root'||l.role==='activation-child'&&role!=='outer'||l.role==='target-pair'&&role!=='root'||l.role==='pair-child'&&role!=='target-pair')return invalid();
   leases.set(l.ordinal,l);
  }
  if(!singleton.has('root')||!singleton.has('outer'))return invalid();
  for(const [i,p]of s.promises.entries()){
   if(!exact(p,['ordinal','lease','retained','settlement'])||p.ordinal!==i+1||!leases.has(p.lease)||!['activation-child','target-pair','pair-child'].includes(leases.get(p.lease).role)||!nullable(p.retained,1,4096)||!nullable(p.settlement,1,4096))return invalid();promises.set(p.ordinal,p);
  }
  for(const [i,e]of s.errors.entries()){if(!exact(e,['ordinal','first'])||e.ordinal!==i+1||!n(e.first,1,4096))return invalid();errors.set(e.ordinal,e);}
  let last=0,targetEnter=null,targetEnd=null,pairEnter=null,logical=null,cut=null,firstError=null;
  const retained=new Map(),settled=new Map(),closed=new Map(),closeCalls=new Set(),errorFirst=new Map(),childChecks=[];
  const byRole=role=>s.leases.find(l=>l.role===role)?.ordinal??null;
  for(const e of s.events){
   if(!exact(e,['sequence','kind','site','lease','promise','error','cause'])||!n(e.sequence,last+1,4096)||!kinds.includes(e.kind)||!sites.includes(e.site)||!nullable(e.lease,1,8)||e.lease!==null&&!leases.has(e.lease)||!nullable(e.promise,1,4)||e.promise!==null&&!promises.has(e.promise)||!error(e.error)||![null,'explicit-finish','parent-abort','finally','unknown'].includes(e.cause)||cut!==null)return invalid();
   last=e.sequence;events.set(last,e);const role=leases.get(e.lease)?.role;
   const threw=['check-threw','target-throw','logical-throw'].includes(e.kind);
   if(threw!==e.error.present)return invalid();
   if(e.error.present){if(firstError===null)firstError=e.sequence;if(e.error.kind==='object'){if(!errors.has(e.error.errorOrdinal))return invalid();if(!errorFirst.has(e.error.errorOrdinal))errorFirst.set(e.error.errorOrdinal,e.sequence);}}
   if(e.kind==='scope-enter'){if(e.site!=='choice-admitted'||e.sequence!==s.events[0].sequence||role!=='root'||e.promise!==null||e.cause!==null)return invalid();}
   else if(e.kind==='target-enter'||e.kind==='target-return'||e.kind==='target-throw'){
    if(e.site!=='postreceipt-check'||role!=='activation-child'||e.promise!==null||e.cause!==null)return invalid();
    if(e.kind==='target-enter'){if(targetEnter!==null||targetEnd!==null)return invalid();targetEnter=e.sequence;}
    else{if(targetEnter===null||targetEnd!==null)return invalid();targetEnd=e;}
   }else if(e.kind==='pair-enter'){if(e.site!=='target-pair'||!(role==='target-pair'||e.lease===null&&s.coverage!=='complete'&&['UNBOUND','PREBIND_GAP','PROJECTION_GAP'].includes(s.reason))||targetEnter===null||pairEnter!==null||targetEnd!==null||e.promise!==null||e.cause!==null)return invalid();pairEnter=e.sequence;}
   else if(e.kind==='check-threw'){
    if(!['initial-holders','initial-child'].includes(e.site)||e.promise!==null||e.cause!==null||e.lease!==null&&(e.site==='initial-holders'?!['outer','target-pair'].includes(role):!['activation-child','pair-child'].includes(role)))return invalid();
    if(role==='pair-child')childChecks.push(e);
   }else if(e.kind==='retained'||e.kind==='settlement-observed'){
    const p=promises.get(e.promise);if(!p||e.lease!==p.lease||e.cause!==null||e.site!==(e.kind==='retained'?'initial-retain':'initial-settled'))return invalid();
    if(e.kind==='retained'){if(retained.has(p.ordinal))return invalid();retained.set(p.ordinal,e.sequence);}
    else{if(!retained.has(p.ordinal)||settled.has(p.ordinal))return invalid();settled.set(p.ordinal,e.sequence);}
   }else if(e.kind==='close-call'||e.kind==='closed-transition'){
    if(e.promise!==null||!(e.site==='root-finish'&&role==='root'&&e.cause==='explicit-finish'||e.site==='initial-close'&&['outer','target-pair'].includes(role)&&e.cause==='unknown'))return invalid();
    if(e.kind==='close-call')closeCalls.add(e.lease);
    else{if(closed.has(e.lease)||!closeCalls.has(e.lease))return invalid();closed.set(e.lease,e.sequence);}
   }else if(e.kind==='child-finally'){if(e.site!=='initial-child-finally'||!['activation-child','pair-child'].includes(role)||e.promise!==null||e.cause!=='finally')return invalid();}
   else if(e.kind==='abort-observed'){
    if(s.coverage==='complete'&&['pair-parent-abort','outer-parent-abort'].includes(e.site)&&!closed.has(e.lease))return invalid();
    if(e.promise!==null||!(e.site==='initial-stop'&&['outer','target-pair'].includes(role)&&e.cause==='unknown'||e.site==='root-abort'&&role==='root'&&e.cause==='unknown'||e.site==='root-finish'&&role==='root'&&e.cause==='explicit-finish'||e.site==='outer-parent-abort'&&role==='outer'&&e.cause==='parent-abort'||e.site==='pair-parent-abort'&&role==='target-pair'&&e.cause==='parent-abort'||e.site==='initial-child'&&['activation-child','pair-child'].includes(role)&&e.cause==='unknown'))return invalid();
   }else if(e.kind==='logical-return'||e.kind==='logical-throw'){if(e.site!==(e.kind==='logical-return'?'choice-return':'choice-catch')||e.lease!==null&&role!=='outer'||logical!==null||e.promise!==null||e.cause!==null)return invalid();logical=e;}
   else if(e.kind==='snapshot-cut'){if(e.site!=='snapshot'||role!=='root'||e.promise!==null||e.cause!==null)return invalid();cut=e.sequence;}
   else return invalid();
   if(!['retained','settlement-observed'].includes(e.kind)&&e.promise!==null)return invalid();
  }
  if(s.events[0].kind!=='scope-enter'||cut!==s.cut||firstError!==s.firstError)return invalid();
  for(const l of s.leases)if(l.firstClose!==(closed.get(l.ordinal)??null))return invalid();
  for(const p of s.promises)if(p.retained!==(retained.get(p.ordinal)??null)||p.settlement!==(settled.get(p.ordinal)??null))return invalid();
  for(const e of s.errors)if(e.first!==errorFirst.get(e.ordinal))return invalid();
  if(s.focus.pairChild!==null&&leases.get(s.focus.pairChild)?.role!=='pair-child')return invalid();
  if(s.leases.some(l=>l.role==='pair-child'&&l.ordinal!==s.focus.pairChild))return invalid();
  if(childChecks.length){if(s.focus.selection!=='first-check-threw'||s.focus.pairChild!==childChecks[0].lease)return invalid();}
  else if(s.focus.pairChild!==null){if(s.focus.selection!=='first-observed')return invalid();}
  else if(s.focus.selection!=='none')return invalid();
  if(s.target==='unreached'){if(targetEnter!==null||pairEnter!==null||targetEnd!==null||byRole('target-pair')!==null||s.focus.pairChild!==null||s.promises.some(p=>leases.get(p.lease)?.role!=='activation-child'))return invalid();}
  else{if(targetEnter===null||!singleton.has('activation-child')||s.target==='entered'&&targetEnd!==null||s.target==='returned'&&targetEnd?.kind!=='target-return'||s.target==='threw'&&targetEnd?.kind!=='target-throw')return invalid();}
  if(s.target==='returned'&&pairEnter===null)return invalid();
  if(new Set(s.promises.map(p=>p.lease)).size!==s.promises.length)return invalid();
  if(s.coverage==='complete'){
   if(s.target==='entered')return invalid();
   if(pairEnter!==null){const pair=byRole('target-pair'),p=s.promises.find(p=>p.lease===pair);if(pair===null||!p||p.retained===null||p.settlement===null||!closed.has(pair))return invalid();}
  }
  return {valid:true,code:'OK',summary:{state:s.state,coverage:s.coverage,reason:s.reason,target:s.target,firstError:s.firstError,focusChild:s.focus.pairChild,events:s.events.length,settlementsObserved:settled.size,interpretation:'unknown'}};
 }catch{return invalid();}
}

return n3TraceReplay;
})();
