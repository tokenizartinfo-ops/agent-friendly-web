// N3 QA-only diagnostic ledger. No authority, IO, clock, timer or promise reaction.
const object=v=>v!==null&&typeof v==='object';
const identity=v=>object(v)||typeof v==='function';
const kinds=["scope-enter","target-enter","pair-enter","check-threw","target-return","target-throw","logical-return","logical-throw","abort-observed","close-call","closed-transition","child-finally","retained","settlement-observed","snapshot-cut"],sites=["choice-admitted","postreceipt-check","target-pair","initial-holders","initial-child","initial-retain","initial-settled","initial-close","initial-stop","initial-child-finally","root-abort","root-finish","pair-parent-abort","pair-finally","outer-parent-abort","choice-catch","choice-return","snapshot"];
const own=(v,keys)=>{if(!object(v)||Array.isArray(v))throw 0;const out={};for(const k of Reflect.ownKeys(v)){if(typeof k!=='string'||!keys.includes(k))throw 0;const d=Object.getOwnPropertyDescriptor(v,k);if(!d||!Object.hasOwn(d,'value'))throw 0;out[k]=d.value;}return out;};
const none=()=>({present:false,kind:'none',errorOrdinal:null});
export function makeN3QaLedger(){
 const roots=new WeakMap(),leases=new WeakMap(),promises=new WeakMap(),calls=new WeakMap(),gaps=new WeakMap();
 const all=[];let leaseCount=0,promiseCount=0,errorCount=0,eventCount=0,gapCount=0,ambiguous=false,fault=null;
 const fail=reason=>{if(fault===null)fault=reason;};
 const textBytes=value=>new TextEncoder().encode(JSON.stringify(value)).length;
 const scopeForRoot=root=>{
  if(!object(root))return null;let s=roots.get(root);
  if(!s){if(all.length>=16){fail('CAP_PRIVATE');return null;}s={root,eligible:false,seq:0,leases:[],promises:[],events:[],errors:[],errorMap:new WeakMap(),firstError:null,target:'unreached',targetCall:null,pairPromise:null,firstChild:null,errorChild:null,gap:false,unbound:false};roots.set(root,s);all.push(s);}
  return s;
 };
 const resolve=(root,e)=>{
  const explicit=root===null?null:roots.get(root),a=object(e.leaseRef)?leases.get(e.leaseRef)?.scope:null,b=object(e.promiseRef)?promises.get(e.promiseRef)?.scope:null;
  const found=[explicit,a,b].filter(Boolean);if(!found.length)return null;
  if(found.some(s=>s!==found[0])){ambiguous=true;return null;}
  const affected=object(e.entityRef)?leases.get(e.entityRef)?.scope:null;if(affected&&affected!==found[0]){ambiguous=true;return null;}return found[0];
 };
 const gap=(e)=>{
  const ref=object(e.leaseRef)?e.leaseRef:object(e.promiseRef)?e.promiseRef:null;if(!ref)return;
  const old=gaps.get(ref);if(old){if(e.errorPresent===true)old.error=true;return;}
  if(leaseCount+gapCount>=128){fail('CAP_PRIVATE');return;}gaps.set(ref,{error:e.errorPresent===true});gapCount++;
 };
 const consumeGap=(s,ref,relevant)=>{
  const old=gaps.get(ref);if(old){gaps.delete(ref);gapCount--;if(relevant||old.error)s.gap=true;}
 };
 const addLease=(s,ref,parent,role)=>{
  if(!object(ref))return null;const old=leases.get(ref);
  if(old){if(old.scope!==s){ambiguous=true;return null;}if(old.parent!==parent||old.role!==role){s.unbound=true;return null;}return old;}
  if(leaseCount+gapCount>=128){fail('CAP_PRIVATE');return null;}
  const r={scope:s,ref,parent,role,index:++leaseCount,firstClose:null,firstObserved:null};leases.set(ref,r);s.leases.push(r);consumeGap(s,ref,role!=='other-pair');return r;
 };
 const publicMeta=()=>all.map(s=>({eligible:s.eligible,seq:s.seq,leases:s.leases.map(l=>[l.index,l.role,l.parent?.index??null,l.firstClose]),promises:s.promises.map(p=>[p.index,p.work.index,p.retained,p.settlement]),errors:s.errors.map(e=>[e.index,e.first]),events:s.events.map(e=>[e.sequence,e.kind,e.site,e.lease?.index??null,e.promise?.index??null,e.error.present,e.error.kind,e.error.record?.index??null,e.cause])}));
 const size=()=>{if(textBytes(publicMeta())>65536)fail('CAP_PRIVATE');};
 const bind=(root,e)=>{
  let s=object(root)?scopeForRoot(root):resolve(null,e);if(!s)return gap(e);
  if(e.entity==='scope'){
   if(root===null||e.role!=='notices'||e.leaseRef!==root||!object(e.entityRef)||e.parentRef!==root){s.unbound=true;return;}
   const r=addLease(s,root,null,'root');if(!r)return;const outer=addLease(s,e.entityRef,r,'outer');if(!outer)return;s.eligible=true;return;
  }
  if(e.entity==='call'){
   if(root===null||!s.eligible||e.role!=='target'||!object(e.callRef)){s.unbound=true;return;}
   const old=calls.get(e.callRef);if(old&&old!==s){ambiguous=true;return;}
   if(s.targetCall&&s.targetCall!==e.callRef){s.unbound=true;return;}s.targetCall=e.callRef;calls.set(e.callRef,s);return;
  }
  if(e.entity==='lease'){
   const ref=e.entityRef,par=e.parentRef===null?null:leases.get(e.parentRef);
   if(e.role==='root'){if(root===null||ref!==root||e.parentRef!==null){s.unbound=true;return;}addLease(s,ref,null,'root');return;}
   if(!par||par.scope!==s){s.unbound=true;return;}
   let role=e.role;
   if(role==='pair'){role=s.eligible&&object(e.callRef)&&s.targetCall===e.callRef?'target-pair':'other-pair';}
   if(role==='child'){
    if(par.role!=='target-pair')return;
    role='pair-child';
   }
   if(!['outer','activation-child','target-pair','other-pair','pair-child'].includes(role)){s.unbound=true;return;}
   if(role==='outer'&&par.role!=='root'||role==='activation-child'&&par.role!=='outer'||['target-pair','other-pair'].includes(role)&&par.role!=='root'||role==='pair-child'&&par.role!=='target-pair'){s.unbound=true;return;}
   const r=addLease(s,ref,par,role);if(r&&role==='pair-child'&&s.firstChild===null)s.firstChild=r;return;
  }
  if(e.entity==='promise'){
   const work=e.role==='pair-return'&&e.callRef===s.targetCall?s.leases.find(l=>l.role==='target-pair'):leases.get(e.parentRef),ref=e.entityRef;
   if(!work||work.scope!==s||!['activation-child','target-pair','pair-child'].includes(work.role))return;
   if(!object(ref)){s.unbound=true;return;}
   if(work.role==='target-pair'&&(e.role!=='pair-return'||e.callRef!==s.targetCall)){s.unbound=true;return;}
   const old=promises.get(ref);
   if(old){if(old.scope!==s)ambiguous=true;else if(old.work!==work)s.unbound=true;return;}
   if(promiseCount>=64){fail('CAP_PRIVATE');return;}
   const p={scope:s,ref,work,index:++promiseCount,retained:null,settlement:null};promises.set(ref,p);s.promises.push(p);consumeGap(s,ref,true);
   if(work.role==='target-pair'){if(s.pairPromise&&s.pairPromise!==p){s.unbound=true;return;}s.pairPromise=p;}return;
  }
  s.unbound=true;
 };
 const observe=(root,e)=>{
  const s=resolve(root,e);if(!s){gap(e);return;}if(!s.eligible)return;
  if(!kinds.includes(e.kind)||!sites.includes(e.site)||![null,'explicit-finish','parent-abort','finally','unknown'].includes(e.cause)||typeof e.errorPresent!=='boolean'){s.unbound=true;return;}
  let l=object(e.entityRef)?leases.get(e.entityRef):null;
  if(l&&l.scope!==s){ambiguous=true;return;}
  const p=object(e.promiseRef)?promises.get(e.promiseRef):null;if(p&&p.scope!==s){ambiguous=true;return;}
  if(e.kind==='pair-enter'&&l?.role!=='target-pair')return;
  if(['retained','settlement-observed'].includes(e.kind)&&!p)return;
  const core=['scope-enter','target-enter','pair-enter','target-return','target-throw','logical-return','logical-throw'].includes(e.kind);
  if(!e.errorPresent&&!core&&!p&&(!l||['other-pair','outside'].includes(l.role)))return;
  if(s.seq>=4095){fail('CAP_PRIVATE');return;}const sequence=++s.seq;
  if(e.kind==='retained'||e.kind==='settlement-observed'){
   if(!p)return;
   l=p.work;
   if(e.kind==='retained'){if(p.retained!==null)return;p.retained=sequence;}
   else{if(p.settlement!==null)return;if(p.retained===null){s.gap=true;return;}p.settlement=sequence;}
  }
  if(l?.role==='pair-child'&&l.firstObserved===null)l.firstObserved=sequence;
  if(e.kind==='check-threw'&&l?.role==='pair-child'&&s.errorChild===null)s.errorChild=l;
  let error={present:e.errorPresent,kind:e.errorPresent?'primitive':'none',record:null};
  if(e.errorPresent&&identity(e.errorRef)){
   let r=s.errorMap.get(e.errorRef);
   if(!r){if(errorCount>=64){fail('CAP_PRIVATE');return;}r={ref:e.errorRef,index:++errorCount,first:sequence};s.errorMap.set(e.errorRef,r);s.errors.push(r);}
   error={present:true,kind:'object',record:r};
  }
  if(e.kind==='closed-transition'){
   if(!l||!['root','outer','target-pair'].includes(l.role)){s.unbound=true;return;}
   if(l.firstClose!==null)return;l.firstClose=sequence;
  }
  if(e.kind==='target-enter'){if(s.target!=='unreached'){s.unbound=true;return;}s.target='entered';}
  if(e.kind==='target-return'||e.kind==='target-throw'){
   if(s.target!=='entered'){s.unbound=true;return;}s.target=e.kind==='target-return'?'returned':'threw';
  }
  if(e.errorPresent&&s.firstError===null&&object(e.entityRef)&&!l){l=addLease(s,e.entityRef,object(e.leaseRef)?leases.get(e.leaseRef)??null:null,'outside');}
  if(eventCount>=256){fail('CAP_PRIVATE');return;}
  const r={sequence,kind:e.kind,site:e.site,lease:l,promise:p,error,cause:e.cause};
  s.events.push(r);eventCount++;if(e.errorPresent&&s.firstError===null)s.firstError=r;size();
 };
 const unknown=(state,reason,eligible)=>({schema:'afw.c2-notices-n3.qa-snapshot.v1',state,coverage:'unknown',reason,eligible,target:'unknown',focus:{mode:'selected-first-target-focus',pairChild:null,selection:'none'},leases:[],promises:[],errors:[],events:[],firstError:null,cut:null});
 const note=(root,event)=>{
  try{
   if(root!==null&&!object(root))return;
   const type=object(event)?Object.getOwnPropertyDescriptor(event,'type'):null;
   if(!type||!Object.hasOwn(type,'value'))throw 0;
   const e=own(event,type.value==='bind'?['type','entity','leaseRef','promiseRef','entityRef','parentRef','callRef','role']:['type','kind','site','leaseRef','promiseRef','entityRef','errorPresent','errorRef','cause']);
   if(e.type==='bind')bind(root,e);else if(e.type==='event')observe(root,e);else fail('INVALID_EVENT');
  }catch{fail('SINK_FAULT');}
  return undefined;
 };
 const snapshot=()=>{
  try{
   const selected=all.filter(s=>s.eligible),eligible=selected.length;
   if(ambiguous||eligible>1)return unknown('ambiguous',ambiguous?'AMBIGUOUS_BINDING':'MULTIPLE_ELIGIBLE',eligible);
   if(fault!==null)return unknown('unjoined',fault,eligible);
   if(!eligible)return unknown('unjoined','NO_ELIGIBLE',0);
   const s=selected[0],root=s.leases.find(l=>l.role==='root'),outer=s.leases.find(l=>l.role==='outer'),activation=s.leases.find(l=>l.role==='activation-child'),pair=s.leases.find(l=>l.role==='target-pair'),child=s.errorChild??s.firstChild;
   if(!root||!outer)return unknown('unjoined','UNBOUND',eligible);
   if(s.seq>=4096)return unknown('unjoined','CAP_PRIVATE',eligible);const cut=++s.seq;
   const focus=[root,outer,...(activation?[activation]:[]),...(pair?[pair]:[]),...(child?[child]:[])];
   const leaseOrdinal=new Map(focus.map((r,i)=>[r,i+1]));
   let ps=s.promises.filter(p=>(leaseOrdinal.has(p.work)&&['activation-child','pair-child'].includes(p.work.role))||p===s.pairPromise);
   if(focus.length>8||ps.length>4||new Set(ps.map(p=>p.work)).size!==ps.length)return unknown('unjoined','CAP_SNAPSHOT',eligible);
   const core=e=>e===s.firstError||['scope-enter','target-enter','pair-enter','target-return','target-throw','logical-return','logical-throw'].includes(e.kind);
   let selectedEvents=s.events.filter(e=>core(e)||leaseOrdinal.has(e.lease)||ps.includes(e.promise));
   const mandatory=new Set(),first=predicate=>{const e=selectedEvents.find(predicate);if(e)mandatory.add(e);return e;};
   for(const kind of ['scope-enter','target-enter','pair-enter','target-return','target-throw','logical-return','logical-throw'])first(e=>e.kind===kind);
   if(s.firstError)mandatory.add(s.firstError);
   first(e=>e.kind==='check-threw'&&e.lease===child);
   for(const kind of ['retained','settlement-observed'])first(e=>e.kind===kind&&e.promise===s.pairPromise);
   for(const l of [root,outer,pair].filter(Boolean)){
    first(e=>e.kind==='close-call'&&e.lease===l);
    first(e=>e.kind==='closed-transition'&&e.lease===l);
   }
   const abortKeys=new Set();
   for(const e of selectedEvents)if(e.kind==='abort-observed'){
    const key=e.site+'/'+(e.lease?.index??0)+'/'+e.cause;
    if(!abortKeys.has(key)){abortKeys.add(key);mandatory.add(e);}
   }
   if(child){
    const anchor=selectedEvents.find(e=>e.lease===child&&!e.promise)??selectedEvents.find(e=>e.lease===child);
    if(anchor)mandatory.add(anchor);else return unknown('unjoined','UNBOUND',eligible);
   }
   // Preserve each retained opaque error's original first observation, including an off-focus branch.
   const closeErrors=()=>{
    for(const e of [...selectedEvents])if(e.error.record){
     const original=s.events.find(r=>r.sequence===e.error.record.first);
     if(!original)return false;
     if(!selectedEvents.includes(original)){selectedEvents.push(original);selectedEvents.sort((a,b)=>a.sequence-b.sequence);}
    }
    return true;
   };
   if(!closeErrors())return unknown('unjoined','UNBOUND',eligible);
   for(const e of [...mandatory])if(e.error.record){
    const original=s.events.find(r=>r.sequence===e.error.record.first);
    if(!original)return unknown('unjoined','UNBOUND',eligible);
    mandatory.add(original);
   }
   let omitted=false;
   const make=()=>{
    const promiseOrdinal=new Map(ps.map((p,i)=>[p,i+1])),es=[];
    for(const e of selectedEvents)if(e.error.record&&!es.includes(e.error.record))es.push(e.error.record);
    if(es.length>4)return null;
    const errorOrdinal=new Map(es.map((e,i)=>[e,i+1]));
    const events=selectedEvents.map(e=>({sequence:e.sequence,kind:e.kind,site:e.site,lease:leaseOrdinal.get(e.lease)??null,promise:promiseOrdinal.get(e.promise)??null,error:{present:e.error.present,kind:e.error.kind,errorOrdinal:e.error.record?errorOrdinal.get(e.error.record):null},cause:e.cause}));
    events.push({sequence:cut,kind:'snapshot-cut',site:'snapshot',lease:1,promise:null,error:none(),cause:null});
    let coverage='complete',reason='OK';
    if(s.unbound){coverage='prefix';reason='UNBOUND';}
    else if(s.gap){coverage='prefix';reason='PREBIND_GAP';}
    else if(s.target==='entered'){coverage='prefix';reason='OPEN_AT_CUT';}
    else if(pair&&(!s.pairPromise||s.pairPromise.retained===null||s.pairPromise.settlement===null||pair.firstClose===null)){coverage='prefix';reason='UNBOUND';}
    if(omitted){coverage='prefix';reason='PROJECTION_GAP';}
    return {schema:'afw.c2-notices-n3.qa-snapshot.v1',state:'joined',coverage,reason,eligible,target:s.target,focus:{mode:'selected-first-target-focus',pairChild:leaseOrdinal.get(child)??null,selection:child?s.errorChild?'first-check-threw':'first-observed':'none'},leases:focus.map((l,i)=>({ordinal:i+1,role:l.role,parent:leaseOrdinal.get(l.parent)??null,firstClose:l.firstClose})),promises:ps.map((p,i)=>({ordinal:i+1,lease:leaseOrdinal.get(p.work),retained:p.retained,settlement:p.settlement})),errors:es.map((e,i)=>({ordinal:i+1,first:e.first})),events,firstError:s.firstError?.sequence??null,cut};
   };
   const fits=p=>p!==null&&p.events.length<=24&&textBytes({sequence:128,elapsedMs:180000,kind:'causal',schema:'afw.c2-notices-n3.causal-record.v1',snapshot:p})+1<=6144;
   let projected=make();
   if(!fits(projected)){
    for(const p of [...ps])if(p!==s.pairPromise&&!selectedEvents.some(e=>e.promise===p&&mandatory.has(e))){
     ps=ps.filter(r=>r!==p);selectedEvents=selectedEvents.filter(e=>e.promise!==p);omitted=true;
    }
    projected=make();
   }
   const firstClose=new Set(),firstAbort=new Set();
   const optional=[];
   for(const e of selectedEvents){
    if(e.kind==='close-call'){
     if(firstClose.has(e.lease)&&!mandatory.has(e))optional.push(e);
     firstClose.add(e.lease);
    }else if(e.kind==='abort-observed'){
     const key=e.site+'/'+(e.lease?.index??0)+'/'+e.cause;
     if(firstAbort.has(key)&&!mandatory.has(e))optional.push(e);
     firstAbort.add(key);
    }
   }
   optional.push(...selectedEvents.filter(e=>e.kind==='check-threw'&&!mandatory.has(e)),...selectedEvents.filter(e=>e.kind==='child-finally'&&!mandatory.has(e)));
   for(const e of optional){
    if(fits(projected))break;
    // An error alias's original first event remains while any kept reference needs it.
    if(e.error.record&&e.sequence===e.error.record.first&&selectedEvents.some(r=>r!==e&&r.error.record===e.error.record))continue;
    selectedEvents=selectedEvents.filter(r=>r!==e);omitted=true;projected=make();
   }
   if(!fits(projected)||[...mandatory].some(e=>!selectedEvents.includes(e)))return unknown('unjoined','CAP_SNAPSHOT',eligible);
   return projected;
  }catch{return unknown('unjoined','SINK_FAULT',all.filter(s=>s.eligible).length);}
 };
 return Object.freeze({note,snapshot});
}
export const n3QaLedger=makeN3QaLedger();
