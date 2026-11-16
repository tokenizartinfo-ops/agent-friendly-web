// N3 diagnostic-only causal replay. Source business authority is never inferred here.
const exact=(v,k)=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===k.length&&Object.keys(v).every((x,i)=>x===k[i]);
const n=(v,a,b)=>Number.isSafeInteger(v)&&v>=a&&v<=b;
const nullable=(x,a,b)=>x===null||n(x,a,b);
const kinds=["scope-enter","target-enter","pair-enter","check-threw","target-return","target-throw","logical-return","logical-throw","abort-observed","close-call","closed-transition","child-finally","retained","settlement-observed","snapshot-cut"],sites=["choice-admitted","postreceipt-check","target-pair","initial-holders","initial-child","initial-retain","initial-settled","initial-close","initial-stop","initial-child-finally","root-abort","root-finish","pair-parent-abort","pair-finally","outer-parent-abort","choice-catch","choice-return","snapshot"],reasons=["OK","NO_ELIGIBLE","MULTIPLE_ELIGIBLE","UNBOUND","AMBIGUOUS_BINDING","PREBIND_GAP","CAP_PRIVATE","CAP_SNAPSHOT","SINK_FAULT","INVALID_EVENT","PROJECTION_GAP","PROBE_UNAVAILABLE","OUTER_LIMIT","OPEN_AT_CUT"];
const error=e=>exact(e,['present','kind','errorOrdinal'])&&(e.present===false&&e.kind==='none'&&e.errorOrdinal===null||e.present===true&&(e.kind==='primitive'&&e.errorOrdinal===null||e.kind==='object'&&n(e.errorOrdinal,1,4)));
const blank=()=>({state:'unjoined',coverage:'unknown',reason:'INVALID_EVENT',target:'unknown',firstError:null,focusChild:null,events:0,settlementsObserved:0,interpretation:'unknown'});
export function n3TraceReplay(s){
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
