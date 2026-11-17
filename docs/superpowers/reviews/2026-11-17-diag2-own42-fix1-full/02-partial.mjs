import {G20_FIXED} from './fixed.mjs';
import {gBad,gSame,gKeys,gInt} from './shape.mjs';
function gReduce(events,condition,integrity='prefix',fault=false){
 if(!Array.isArray(events)||events.length>128||!['timeout','normal'].includes(condition)||!['empty','prefix','complete','torn','ambiguous'].includes(integrity))gBad();
 let cursor=0,next='action-enter',active=null,hook='unseen',threw=false,lastMs=0;
 for(let i=0;i<events.length;i++){
  const e=events[i];
  if(!gKeys(e,['sequence','elapsedMs','id','operation','edge','error'])||e.sequence!==i+1||!gInt(e.elapsedMs,lastMs,330000)||!['enter','return','throw'].includes(e.edge))gBad();
  lastMs=e.elapsedMs;
  if(e.edge==='throw'){
   if(!gKeys(e.error,['name','code','site'])||!([null,'AssertionError','Error','TypeError','RangeError','SyntaxError','AggregateError','AbortError','TimeoutError'].includes(e.error.name))||!([null,'ERR_ASSERTION','ERR_TEST_FAILURE','ABORT_ERR','ETIMEDOUT','ENOENT','ERR_MODULE_NOT_FOUND','ECONNRESET','ERR_INVALID_ARG_TYPE'].includes(e.error.code)))gBad();
   const s=e.error.site;
   if(s!==null&&(!gKeys(s,['file','line','column'])||!['S00','S01','S02','S03','S04','S05','S06','D07','S08','S09','S10','S11','S12'].includes(s.file)||!gInt(s.line,1,999999)||!gInt(s.column,1,999999)))gBad();
   threw=true;
  }else if(e.error!==null)gBad();
  if(e.id==='AFTER'){
   if(e.operation!=='close')gBad();
   if(e.edge==='enter'){if(hook!=='unseen')gBad();hook='open';}
   else{if(hook!=='open')gBad();hook='settled';}
   continue;
  }
  if(e.id!==G20_FIXED.selected[cursor])gBad();
  if(next==='action-enter'){
   if(e.operation!=='action'||e.edge!=='enter')gBad();
   active={id:e.id,operation:'action'};next='action-exit';
  }else if(next==='action-exit'){
   if(e.operation!=='action'||e.edge==='enter')gBad();
   active=null;next='count-enter';
  }else if(next==='count-enter'){
   if(e.operation!=='count'||e.edge!=='enter')gBad();
   active={id:e.id,operation:'count'};next='count-exit';
  }else{
   if(e.operation!=='count'||e.edge==='enter')gBad();
   active=null;cursor++;next='action-enter';
  }
 }
 const complete=cursor===20&&hook==='settled';
 if(integrity==='empty'&&events.length||integrity==='complete'&&!complete)gBad();
 let state=events.length?(complete?'complete':'prefix'):'empty',frontier='unknown';
 if(fault||integrity==='ambiguous'||integrity==='torn'){
  state=fault?'ambiguous':integrity;return {integrity:state,frontier,events,openCase:null,afterOpen:false};
 }
 const afterOpen=hook==='open';
 if(active&&afterOpen)frontier='case-and-after';
 else if(active)frontier=active.operation;
 else if(afterOpen)frontier='after-close';
 else if(complete)frontier=condition==='timeout'?(threw?'post-settlement-process-exit':'post-teardown-process-exit'):'all-settled';
 else if(events.length)frontier=next==='count-enter'?'between-action-and-count':cursor===20?'before-after':'between-cases';
 return {integrity:state,frontier,events,openCase:active,afterOpen};
}
function g20Partial(o,hash){
 const c=o.capture,j=o.journal,w=o.witness,n=o.native;
 if(!(c.errorKind==='timeout'||c.errorKind==='none'&&c.signal==='none'&&[0,1].includes(c.exitCode)))gBad();
 const empty=hash('');for(const stream of [c.stdout,c.stderr])if(stream.bytes===0&&stream.sha256!==empty)gBad();
 const reduced=gReduce(w.events,c.errorKind==='timeout'?'timeout':'normal',w.integrity,j.recorderFaultObserved);
 if(!gSame(reduced,w))gBad();
 const reason=j.recorderFaultObserved?'RECORDER_FAULT':w.integrity==='ambiguous'?'JOURNAL_INVALID_RECORD':w.integrity==='torn'?'JOURNAL_TORN':w.integrity==='empty'?'JOURNAL_EMPTY':null;
 if(o.unknownReason!==reason)gBad();
 const text=w.events.map(e=>JSON.stringify(e)+'\n').join(''),bytes=Buffer.byteLength(text),digest=hash(text);
 if(j.bytes<bytes||j.bytes===bytes&&j.sha256!==digest)gBad();
 if(['empty','prefix','complete'].includes(w.integrity)&&(j.bytes!==bytes||j.sha256!==digest))gBad();
 if(!j.recorderFaultObserved&&['torn','ambiguous'].includes(w.integrity)&&j.bytes<=bytes)gBad();
 const first=w.events.find(e=>e.edge==='throw')?.sequence??null;if(o.firstThrowSequence!==first)gBad();
 if(n.integrity==='empty'&&n.cases.length)gBad();
 for(let i=0;i<n.cases.length;i++){
  const row=n.cases[i];if(row.id!==G20_FIXED.selected[i])gBad();
  if(row.status==='pass'&&w.events.some(e=>e.id===row.id&&(e.operation==='action'||e.operation==='count')&&e.edge==='throw'))gBad();
 }
 return {witness:reduced,unknownReason:reason,firstThrowSequence:first,native:n};
}
export {g20Partial,gReduce};
