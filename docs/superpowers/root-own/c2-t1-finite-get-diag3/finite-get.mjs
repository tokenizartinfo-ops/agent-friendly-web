import {gBad,gKeys,gInt,gSchema} from './legacy/shape.mjs';
// Only exported safe projections are joined here. No raw TAP, C2SOURCE, C2FT3 or private row input.
function finiteGet(o,schema,selected){
 const f=o.finiteGet;
 if(!gKeys(f,['schema','http','afterMonitor','afterScopeMissing'])||Buffer.byteLength(JSON.stringify(f))>512||!gSchema(f,schema.$defs.finiteGet,schema))gBad();
 const events=o.witness.events,rows=o.native.cases,first=events.find(e=>e.edge==='throw'),target=selected[14];
 const terminal=(id,operation)=>events.find(e=>e.id===id&&e.operation===operation&&e.edge!=='enter');
 const priorReturns=(n,before=Infinity)=>selected.slice(0,n).every(id=>['action','count'].every(operation=>events.some(e=>e.id===id&&e.operation===operation&&e.edge==='return'&&e.sequence<before)));
 const action=terminal(target,'action'),count=terminal(target,'count');
 const exact=first?.id===target&&first.operation==='action'&&first.error?.name==='AssertionError'&&first.error.code==='ERR_ASSERTION'&&first.error.site?.file==='S08'&&first.error.site.line===18&&first.error.site.column===118;
 let state='UNKNOWN',reasons=['JOURNAL_UNRESOLVED'],known=false;
 if(first&&!exact){state='NOT_APPLICABLE';reasons=['EARLIEST_THROW_DIFFERENT'];}
 else if(rows.slice(0,14).some(r=>r.status==='fail')){state='NOT_APPLICABLE';reasons=['EARLIER_NATIVE_FAILURE'];}
 else if(rows[14]?.status==='pass'){
  if(action?.edge==='return'&&count?.edge==='return'){state='NOT_APPLICABLE';reasons=['TARGET_PASSED'];}
 }else if(o.witness.integrity==='complete'&&o.unknownReason===null&&!o.journal.recorderFaultObserved&&!first){state='NOT_APPLICABLE';reasons=['NO_QUALIFYING_THROW'];}
 else if(exact){
  if(!priorReturns(14,first.sequence))gBad();
  if(count?.edge!=='return')reasons=['COUNTER_UNAVAILABLE'];
  else if(o.native.integrity==='torn')reasons=['TRUNCATED_NATIVE'];
  else if(o.native.integrity==='ambiguous')reasons=['NATIVE_FORMAT_UNSUPPORTED','AMBIGUOUS_EVIDENCE'];
  else if(o.native.integrity!=='prefix'||rows.length<15)reasons=['TARGET_NATIVE_UNAVAILABLE','NATIVE_FORMAT_UNSUPPORTED'];
  else{
   if(rows[14].id!==target||rows[14].status!=='fail'||rows.slice(0,14).length!==14||rows.slice(0,14).some(r=>r.status!=='pass'))gBad();
   known=true;
   // These source/scalar distinctions concern omitted private bytes; public evidence only bounds eligibility.
   reasons=['SOURCE_ROW_UNAVAILABLE','ASSERTION_SCALARS_UNAVAILABLE','UNSUPPORTED_SCALARS','NATIVE_FORMAT_UNSUPPORTED','AMBIGUOUS_EVIDENCE','CONFLICTING_EVIDENCE','TRUNCATED_NATIVE'];
  }
 }
 const h=f.http;
 if(h.state==='KNOWN'){
  if(!known||h.reason!=='TARGET_GET_ASSERTION'||h.throwSequence!==first.sequence||h.throwSequence!==o.firstThrowSequence||!gInt(h.actual,100,599)||h.actual===200||h.expected!==200)gBad();
 }else if(h.state!==state||!reasons.includes(h.reason)||h.throwSequence!==null||h.actual!==null||h.expected!==null)gBad();
 const blockers=[];
 for(const [name,n] of [['afterMonitor',14],['afterScopeMissing',15]]){
  const sample=f[name],id=selected[n-1],a=terminal(id,'action'),c=terminal(id,'count');
  const hasCountEnter=events.some(e=>e.id===id&&e.operation==='count'&&e.edge==='enter'&&a&&e.sequence>a.sequence&&c&&e.sequence<c.sequence);
  const interleave=!!c&&events.some(e=>e.id==='AFTER'&&e.sequence<c.sequence);
  const journal=priorReturns(n-1)&&a&&(n===14?a.edge==='return':['return','throw'].includes(a.edge))&&c?.edge==='return'&&hasCountEnter&&!interleave;
  const native=journal&&o.native.integrity==='prefix'&&rows.length>=n&&rows.slice(0,n-1).every(r=>r.status==='pass')&&rows[n-1]?.id===id&&rows[n-1].status===(a.edge==='return'?'pass':'fail');
  let required=null;
  if(!journal)required='JOURNAL_UNRESOLVED';else if(!native)required='NATIVE_UNJOINED';
  if(required){
   if(sample.value!=='UNKNOWN'||sample.reason!==required||sample.countSequence!==null)gBad();
  }else if(sample.reason==='JOINED_SNAPSHOT'){
   if(!['0','1','2+'].includes(sample.value)||sample.countSequence!==c.sequence)gBad();
  }else if(sample.value!=='UNKNOWN'||sample.countSequence!==null||!['SOURCE_UNJOINED','MARKER_STREAM_INVALID','MARKER_UNAVAILABLE','SNAPSHOT_INVALID'].includes(sample.reason))gBad();
  blockers.push({name,required,interleave});
 }
 const samples=[f.afterMonitor,f.afterScopeMissing];
 if(samples.some(s=>s.reason==='MARKER_STREAM_INVALID')&&samples.some(s=>!['MARKER_STREAM_INVALID','JOURNAL_UNRESOLVED','NATIVE_UNJOINED','SOURCE_UNJOINED'].includes(s.reason)))gBad();
 if(h.state==='KNOWN')for(const b of blockers){
  const s=f[b.name];if(['NATIVE_UNJOINED','SOURCE_UNJOINED'].includes(s.reason)||s.reason==='JOURNAL_UNRESOLVED'&&!b.interleave)gBad();
 }
 // Merge only public claims about the same ordered Source-row prefixes.
 const sampleClaim=s=>s.reason==='SOURCE_UNJOINED'?false:['JOINED_SNAPSHOT','MARKER_STREAM_INVALID','MARKER_UNAVAILABLE','SNAPSHOT_INVALID'].includes(s.reason)?true:null;
 const prefix14=sampleClaim(f.afterMonitor),sample15=sampleClaim(f.afterScopeMissing);
 const http15=h.state==='KNOWN'||h.state==='UNKNOWN'&&h.reason==='ASSERTION_SCALARS_UNAVAILABLE'?true:h.state==='UNKNOWN'&&h.reason==='SOURCE_ROW_UNAVAILABLE'?false:null;
 if(sample15!==null&&http15!==null&&sample15!==http15)gBad();
 const prefix15=sample15===null?http15:sample15;
 if(prefix15===true&&prefix14===false)gBad();
 return JSON.parse(JSON.stringify(f));
}
export {finiteGet};
