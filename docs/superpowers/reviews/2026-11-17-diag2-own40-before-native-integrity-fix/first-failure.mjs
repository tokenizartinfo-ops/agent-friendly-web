import {G20_SCHEMA,G20_FIXED} from './fixed.mjs';
import {gBad,gKeys,gInt,gSchema} from './shape.mjs';
// Independent joins on exported safe DATA only. No actual private child TAP is available here.
function d2FirstFailure(o){
 const f=o.firstFailure;
 if(!gKeys(f,['schema','state','reason','throwSequence','source','assertion'])||Buffer.byteLength(JSON.stringify(f))>512||!gSchema(f,G20_SCHEMA.$defs.firstFailure,G20_SCHEMA))gBad();
 if(f.state!=='KNOWN'&&(f.throwSequence!==null||f.source!==null||f.assertion!==null))gBad();
 const events=o.witness.events,native=o.native.cases,target='C2T1_NOTICES',first=events.find(e=>e.edge==='throw');
 const exact=first?.id===target&&first.operation==='action'&&first.error?.name==='AssertionError'&&first.error.code==='ERR_ASSERTION'&&first.error.site?.file==='S08'&&first.error.site.line===41&&first.error.site.column===12;
 const actionReturned=events.some(e=>e.id===target&&e.operation==='action'&&e.edge==='return');
 const countReturned=events.some(e=>e.id===target&&e.operation==='count'&&e.edge==='return'&&(!first||e.sequence>first.sequence));
 let state='UNKNOWN',reasons=['JOURNAL_UNRESOLVED'];
 if(first&&!exact){state='NOT_APPLICABLE';reasons=['EARLIEST_THROW_DIFFERENT'];}
 else if(native.slice(0,11).some(row=>row.status==='fail')){state='NOT_APPLICABLE';reasons=['EARLIER_NATIVE_FAILURE'];}
 else if(native[11]?.status==='pass'){
  if(actionReturned&&countReturned){state='NOT_APPLICABLE';reasons=['TARGET_PASSED'];}
 }
 else if(o.witness.integrity==='complete'&&o.unknownReason===null&&!o.journal.recorderFaultObserved&&!first){state='NOT_APPLICABLE';reasons=['NO_QUALIFYING_THROW'];}
 else if(exact){
  // Prior returns are current facts from the validated chronological prefix, never historical PASS.
  const priorReturned=G20_FIXED.selected.slice(0,11).every(id=>['action','count'].every(operation=>events.some(e=>e.id===id&&e.operation===operation&&e.edge==='return'&&e.sequence<first.sequence)));
  if(!priorReturned)gBad();
  if(!countReturned)reasons=['COUNTER_UNAVAILABLE'];
  else if(!native[11])reasons=['TARGET_NATIVE_UNAVAILABLE','NATIVE_FORMAT_UNSUPPORTED','AMBIGUOUS_EVIDENCE','TRUNCATED_NATIVE'];
  else{
   if(native[11].id!==target||native[11].status!=='fail'||native.slice(0,11).length!==11||native.slice(0,11).some(row=>row.status!=='pass'))gBad();
   if(f.state==='KNOWN'){
    const s=f.source,a=f.assertion;
    if(f.reason!=='TARGET_POST_ASSERTION'||f.throwSequence!==first.sequence||f.throwSequence!==o.firstThrowSequence||!gKeys(s,['id','status','phase','counters','code'])||s.id!==target||s.status!=='fail'||s.phase!=='notices'||s.code!=='TEST_FAILED'||!gKeys(s.counters,['upload','activation','receipts'])||Object.values(s.counters).some(v=>!gInt(v,0,3))||!gKeys(a,['actual','expected'])||!gInt(a.actual,100,599)||a.actual===200||a.expected!==200)gBad();
    return JSON.parse(JSON.stringify(f));
   }
   // These reasons describe private collector evidence absent from this input; do not invent a RAW oracle.
   reasons=['SOURCE_ROW_UNAVAILABLE','ASSERTION_SCALARS_UNAVAILABLE','UNSUPPORTED_SCALARS','NATIVE_FORMAT_UNSUPPORTED','AMBIGUOUS_EVIDENCE','CONFLICTING_EVIDENCE','TRUNCATED_NATIVE'];
  }
 }
 if(f.state!==state||!reasons.includes(f.reason))gBad();
 return JSON.parse(JSON.stringify(f));
}
export {d2FirstFailure};
