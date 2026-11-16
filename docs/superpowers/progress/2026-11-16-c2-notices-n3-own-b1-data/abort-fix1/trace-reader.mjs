// Independent OWN N3.B1 causal core. No Source implementation import or execution.
// Root9a31 + abort matrix8b791; full outer N3 protocol remains pending B2.
const ngObj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const ngKeys=(v,a)=>ngObj(v)&&Object.keys(v).length===a.length&&Object.keys(v).every((k,i)=>k===a[i]);
const ngInt=(v,a,b)=>Number.isSafeInteger(v)&&v>=a&&v<=b;
const ngSame=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const ngBad=()=>{throw Error('ROOT_N3_OWN_CAUSAL_REJECTED');};

function ngSchema(value,node,document){
 if(!ngObj(node))return false;
 if(node.$ref){if(typeof node.$ref!=='string'||!node.$ref.startsWith('#/$defs/'))return false;return ngSchema(value,document.$defs[node.$ref.slice(8)],document);}
 if(Object.hasOwn(node,'const')&&!ngSame(value,node.const))return false;
 if(node.enum&&!node.enum.some(v=>ngSame(v,value)))return false;
 if(node.anyOf&&!node.anyOf.some(s=>ngSchema(value,s,document)))return false;
 if(node.oneOf&&node.oneOf.filter(s=>ngSchema(value,s,document)).length!==1)return false;
 if(node.allOf&&!node.allOf.every(s=>ngSchema(value,s,document)))return false;
 const isType=(v,t)=>t==='object'?ngObj(v):t==='array'?Array.isArray(v):t==='integer'?Number.isSafeInteger(v):t==='number'?typeof v==='number'&&Number.isFinite(v):t==='string'?typeof v==='string':t==='null'?v===null:t==='boolean'?typeof v==='boolean':false;
 if(node.type&&!(Array.isArray(node.type)?node.type.some(t=>isType(value,t)):isType(value,node.type)))return false;
 if(node.properties&&ngObj(value)){
  const names=Object.keys(node.properties);
  if(node.additionalProperties===false&&Object.keys(value).some(k=>!names.includes(k)))return false;
  if(node.required&&!node.required.every(k=>Object.hasOwn(value,k)))return false;
  if(node.required?.length===names.length&&node.additionalProperties===false&&!ngKeys(value,names))return false;
  for(const k of names)if(Object.hasOwn(value,k)&&!ngSchema(value[k],node.properties[k],document))return false;
 }
 if(typeof value==='number'&&(node.minimum!==undefined&&value<node.minimum||node.maximum!==undefined&&value>node.maximum))return false;
 if(typeof value==='string'&&node.pattern&&!new RegExp(node.pattern).test(value))return false;
 if(Array.isArray(value)){
  if(node.minItems!==undefined&&value.length<node.minItems||node.maxItems!==undefined&&value.length>node.maxItems)return false;
  for(let i=0;i<value.length;i++){const rule=node.prefixItems?.[i]??node.items;if(rule===false||rule&&!ngSchema(value[i],rule,document))return false;}
 }
 return true;
}



const N3_CAUSAL_SCHEMA={"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"afw.c2-notices-n3.causal-schema.v1","$ref":"#/$defs/causalRecord","$defs":{"snapshot":{"type":"object","properties":{"schema":{"const":"afw.c2-notices-n3.qa-snapshot.v1"},"state":{"enum":["joined","unjoined","ambiguous"]},"coverage":{"enum":["complete","prefix","unknown"]},"reason":{"enum":["OK","NO_ELIGIBLE","MULTIPLE_ELIGIBLE","UNBOUND","AMBIGUOUS_BINDING","PREBIND_GAP","CAP_PRIVATE","CAP_SNAPSHOT","SINK_FAULT","INVALID_EVENT","PROJECTION_GAP","PROBE_UNAVAILABLE","OUTER_LIMIT","OPEN_AT_CUT"]},"eligible":{"type":"integer","minimum":0,"maximum":16},"target":{"enum":["unreached","entered","returned","threw","unknown"]},"focus":{"type":"object","properties":{"mode":{"const":"selected-first-target-focus"},"pairChild":{"anyOf":[{"type":"integer","minimum":1,"maximum":8},{"type":"null"}]},"selection":{"enum":["first-check-threw","first-observed","none"]}},"required":["mode","pairChild","selection"],"additionalProperties":false},"leases":{"type":"array","maxItems":8,"items":{"type":"object","properties":{"ordinal":{"type":"integer","minimum":1,"maximum":8},"role":{"enum":["root","outer","activation-child","target-pair","pair-child"]},"parent":{"anyOf":[{"type":"integer","minimum":1,"maximum":8},{"type":"null"}]},"firstClose":{"anyOf":[{"type":"integer","minimum":1,"maximum":4096},{"type":"null"}]}},"required":["ordinal","role","parent","firstClose"],"additionalProperties":false}},"promises":{"type":"array","maxItems":4,"items":{"type":"object","properties":{"ordinal":{"type":"integer","minimum":1,"maximum":4},"lease":{"type":"integer","minimum":1,"maximum":8},"retained":{"anyOf":[{"type":"integer","minimum":1,"maximum":4096},{"type":"null"}]},"settlement":{"anyOf":[{"type":"integer","minimum":1,"maximum":4096},{"type":"null"}]}},"required":["ordinal","lease","retained","settlement"],"additionalProperties":false}},"errors":{"type":"array","maxItems":4,"items":{"type":"object","properties":{"ordinal":{"type":"integer","minimum":1,"maximum":4},"first":{"type":"integer","minimum":1,"maximum":4096}},"required":["ordinal","first"],"additionalProperties":false}},"events":{"type":"array","maxItems":24,"items":{"type":"object","properties":{"sequence":{"type":"integer","minimum":1,"maximum":4096},"kind":{"enum":["scope-enter","target-enter","pair-enter","check-threw","target-return","target-throw","logical-return","logical-throw","abort-observed","close-call","closed-transition","child-finally","retained","settlement-observed","snapshot-cut"]},"site":{"enum":["choice-admitted","postreceipt-check","target-pair","initial-holders","initial-child","initial-retain","initial-settled","initial-close","initial-stop","initial-child-finally","root-abort","root-finish","pair-parent-abort","pair-finally","outer-parent-abort","choice-catch","choice-return","snapshot"]},"lease":{"anyOf":[{"type":"integer","minimum":1,"maximum":8},{"type":"null"}]},"promise":{"anyOf":[{"type":"integer","minimum":1,"maximum":4},{"type":"null"}]},"error":{"anyOf":[{"type":"object","properties":{"present":{"const":false},"kind":{"const":"none"},"errorOrdinal":{"const":null}},"required":["present","kind","errorOrdinal"],"additionalProperties":false},{"type":"object","properties":{"present":{"const":true},"kind":{"const":"primitive"},"errorOrdinal":{"const":null}},"required":["present","kind","errorOrdinal"],"additionalProperties":false},{"type":"object","properties":{"present":{"const":true},"kind":{"const":"object"},"errorOrdinal":{"type":"integer","minimum":1,"maximum":4}},"required":["present","kind","errorOrdinal"],"additionalProperties":false}]},"cause":{"enum":[null,"explicit-finish","parent-abort","finally","unknown"]}},"required":["sequence","kind","site","lease","promise","error","cause"],"additionalProperties":false}},"firstError":{"anyOf":[{"type":"integer","minimum":1,"maximum":4096},{"type":"null"}]},"cut":{"anyOf":[{"type":"integer","minimum":1,"maximum":4096},{"type":"null"}]}},"required":["schema","state","coverage","reason","eligible","target","focus","leases","promises","errors","events","firstError","cut"],"additionalProperties":false},"causalRecord":{"type":"object","properties":{"sequence":{"type":"integer","minimum":1,"maximum":128},"elapsedMs":{"type":"integer","minimum":0,"maximum":180000},"kind":{"const":"causal"},"schema":{"const":"afw.c2-notices-n3.causal-record.v1"},"snapshot":{"$ref":"#/$defs/snapshot"}},"required":["sequence","elapsedMs","kind","schema","snapshot"],"additionalProperties":false},"summary":{"type":"object","properties":{"state":{"enum":["joined","unjoined","ambiguous"]},"coverage":{"enum":["complete","prefix","unknown"]},"reason":{"enum":["OK","NO_ELIGIBLE","MULTIPLE_ELIGIBLE","UNBOUND","AMBIGUOUS_BINDING","PREBIND_GAP","CAP_PRIVATE","CAP_SNAPSHOT","SINK_FAULT","INVALID_EVENT","PROJECTION_GAP","PROBE_UNAVAILABLE","OUTER_LIMIT","OPEN_AT_CUT"]},"target":{"enum":["unreached","entered","returned","threw","unknown"]},"firstError":{"anyOf":[{"type":"integer","minimum":1,"maximum":4096},{"type":"null"}]},"focusChild":{"anyOf":[{"type":"integer","minimum":1,"maximum":8},{"type":"null"}]},"events":{"type":"integer","minimum":0,"maximum":24},"settlementsObserved":{"type":"integer","minimum":0,"maximum":4},"interpretation":{"const":"unknown"}},"required":["state","coverage","reason","target","firstError","focusChild","events","settlementsObserved","interpretation"],"additionalProperties":false}},"$comment":"Canonical order and source contract FSM required in addition to JSON shape. Record6144UTF8 bytes includes envelope+LF. One snapshot only; never crosssnapshot join."};

// Original independent OWN causal FSM. Sealed schema is DATA; no Source implementation imported.
function n3JsonData(value,seen=new Set(),depth=0){
 if(value===null||typeof value==='string'||typeof value==='boolean')return true;
 if(typeof value==='number')return Number.isFinite(value)&&!Object.is(value,-0);
 if(typeof value!=='object'||depth>12||seen.has(value)||Object.getOwnPropertySymbols(value).length)return false;
 for(let p=value;p!==null;p=Object.getPrototypeOf(p))if(Object.getOwnPropertyDescriptor(p,'toJSON')!==undefined)return false;
 const array=Array.isArray(value);if(!array){const proto=Object.getPrototypeOf(value);if(proto!==null&&(Object.getPrototypeOf(proto)!==null||Object.getOwnPropertyDescriptor(proto,'toJSON')!==undefined))return false;}
 const descriptors=Object.getOwnPropertyDescriptors(value),keys=Object.keys(value);
 if(array){if(Object.keys(descriptors).length!==keys.length+1||keys.length!==value.length||keys.some((k,i)=>k!==String(i)))return false;}
 else if(Object.keys(descriptors).length!==keys.length)return false;
 seen.add(value);
 for(const k of keys){const d=descriptors[k];if(!d||!Object.hasOwn(d,'value')||!d.enumerable||!n3JsonData(d.value,seen,depth+1))return false;}
 seen.delete(value);return true;
}
function n3TraceSummary(s){return {state:s.state,coverage:s.coverage,reason:s.reason,target:s.target,firstError:s.firstError,focusChild:s.focus.pairChild,events:s.events.length,settlementsObserved:s.promises.filter(p=>p.settlement!==null).length,interpretation:'unknown'};}
function n3TraceReplay(s){
 if(!n3JsonData(s)||!ngSchema(s,N3_CAUSAL_SCHEMA.$defs.snapshot,N3_CAUSAL_SCHEMA)||Buffer.byteLength(JSON.stringify(s),'utf8')>6144)ngBad();
 const empty=s.leases.length===0&&s.promises.length===0&&s.errors.length===0&&s.events.length===0&&s.firstError===null&&s.cut===null&&s.target==='unknown'&&s.focus.pairChild===null&&s.focus.selection==='none';
 if(s.state!=='joined'){
  if(s.coverage!=='unknown'||!empty)ngBad();
  if(s.eligible>1){if(s.state!=='ambiguous'||s.reason!=='MULTIPLE_ELIGIBLE')ngBad();}
  else if(s.state==='ambiguous'){if(s.eligible!==1||s.reason!=='AMBIGUOUS_BINDING')ngBad();}
  else if(s.reason==='NO_ELIGIBLE'){if(s.eligible!==0)ngBad();}
  else if(!['UNBOUND','PREBIND_GAP','CAP_PRIVATE','CAP_SNAPSHOT','SINK_FAULT','INVALID_EVENT','PROJECTION_GAP','PROBE_UNAVAILABLE','OUTER_LIMIT'].includes(s.reason))ngBad();
  return n3TraceSummary(s);
 }
 if(s.eligible!==1||s.coverage==='unknown'||s.target==='unknown')ngBad();
 if(s.coverage==='complete'){if(s.reason!=='OK'||s.target==='entered')ngBad();}
 else if(!['PREBIND_GAP','PROJECTION_GAP','UNBOUND','OPEN_AT_CUT'].includes(s.reason)||s.reason==='OPEN_AT_CUT'&&s.target!=='entered')ngBad();
 for(const table of [s.leases,s.promises,s.errors])if(table.some((r,i)=>r.ordinal!==i+1))ngBad();
 const lease=n=>s.leases[n-1],promise=n=>s.promises[n-1],roles=new Map();
 for(const l of s.leases){const list=roles.get(l.role)??[];list.push(l);roles.set(l.role,list);}
 if((roles.get('root')?.length??0)!==1||(roles.get('outer')?.length??0)!==1||['activation-child','target-pair','pair-child'].some(r=>(roles.get(r)?.length??0)>1))ngBad();
 const one=r=>roles.get(r)?.[0]??null,root=one('root'),outer=one('outer'),activation=one('activation-child'),pair=one('target-pair');
 for(const l of s.leases){
  const expected=l.role==='root'?null:l.role==='outer'||l.role==='target-pair'?root.ordinal:l.role==='activation-child'?outer.ordinal:pair?.ordinal;
  if(l.parent!==expected||['activation-child','pair-child'].includes(l.role)&&l.firstClose!==null)ngBad();
 }
 if(s.focus.pairChild===null){if(s.focus.selection!=='none'||(roles.get('pair-child')?.length??0)>0)ngBad();}
 else if(!lease(s.focus.pairChild)||lease(s.focus.pairChild).role!=='pair-child'||s.focus.selection==='none')ngBad();
 for(const p of s.promises)if(!lease(p.lease)||!['activation-child','target-pair','pair-child'].includes(lease(p.lease).role))ngBad();
 let last=0,target='unreached',pairSeen=false,scopeSeen=false,logicalSeen=false,firstError=null,cutSeen=false;
 const closeCalls=new Map(),closed=new Map(),retained=new Map(),settled=new Map(),errorFirst=new Map(),childFinal=new Set(),pairChecks=[];
 const role=n=>n===null?null:lease(n)?.role;
 const plain=(e,hasError=false)=>{if(e.error.present!==hasError||hasError===false&&e.error.kind!=='none')ngBad();};
 for(const e of s.events){
  if(e.sequence<=last||cutSeen||e.lease!==null&&!lease(e.lease)||e.promise!==null&&!promise(e.promise))ngBad();last=e.sequence;
  const r=role(e.lease),requireRole=(...allowed)=>{if(!allowed.includes(r))ngBad();},requireSite=site=>{if(e.site!==site)ngBad();};
  if(e.error.present){if(firstError===null)firstError=e.sequence;if(e.error.kind==='object'){if(!s.errors[e.error.errorOrdinal-1])ngBad();if(!errorFirst.has(e.error.errorOrdinal))errorFirst.set(e.error.errorOrdinal,e.sequence);}}
  if(!['retained','settlement-observed'].includes(e.kind)&&e.promise!==null)ngBad();
  if(!['abort-observed','close-call','closed-transition','child-finally'].includes(e.kind)&&e.cause!==null)ngBad();
  switch(e.kind){
   case 'scope-enter':
    requireSite('choice-admitted');requireRole('root');plain(e);if(scopeSeen||e!==s.events[0])ngBad();scopeSeen=true;break;
   case 'target-enter':
    requireSite('postreceipt-check');requireRole('activation-child');plain(e);if(!scopeSeen||target!=='unreached'||logicalSeen)ngBad();target='entered';break;
   case 'pair-enter':
    requireSite('target-pair');requireRole(null,'target-pair');plain(e);if(target!=='entered'||pairSeen||logicalSeen||e.lease===null&&!(s.coverage==='prefix'&&['UNBOUND','PREBIND_GAP','PROJECTION_GAP'].includes(s.reason)))ngBad();pairSeen=true;break;
   case 'target-return':case 'target-throw':
    requireSite('postreceipt-check');requireRole('activation-child');plain(e,e.kind==='target-throw');if(target!=='entered'||logicalSeen)ngBad();if(e.kind==='target-return'&&!pairSeen)ngBad();target=e.kind==='target-return'?'returned':'threw';break;
   case 'check-threw':
    plain(e,true);if(!scopeSeen||!['initial-holders','initial-child'].includes(e.site))ngBad();
    if(e.site==='initial-child')requireRole(null,'activation-child','pair-child');else requireRole(null,'outer','target-pair');
    if(r==='pair-child')pairChecks.push(e);break;
   case 'logical-return':case 'logical-throw':
    requireSite(e.kind==='logical-return'?'choice-return':'choice-catch');requireRole('outer');plain(e,e.kind==='logical-throw');if(!scopeSeen||logicalSeen||target==='entered')ngBad();logicalSeen=true;break;
   case 'retained':case 'settlement-observed':{
    requireSite(e.kind==='retained'?'initial-retain':'initial-settled');plain(e);
    const p=promise(e.promise);if(!p||p.lease!==e.lease)ngBad();
    const table=e.kind==='retained'?retained:settled;if(table.has(p.ordinal))ngBad();
    if(e.kind==='settlement-observed'&&(!retained.has(p.ordinal)||retained.get(p.ordinal)>=e.sequence))ngBad();table.set(p.ordinal,e.sequence);break;
   }
   case 'close-call':
    plain(e);
    if(e.site==='root-finish'){requireRole('root');if(e.cause!=='explicit-finish')ngBad();}
    else if(e.site==='initial-close'){requireRole('outer','target-pair');if(e.cause!=='unknown')ngBad();}
    else ngBad();
    if(e.site==='initial-close'||e.site==='root-finish')closeCalls.set(e.lease,e.sequence);break;
   case 'closed-transition':
    plain(e);if(e.site==='root-finish'){requireRole('root');if(e.cause!=='explicit-finish')ngBad();}
    else if(e.site==='initial-close'){requireRole('outer','target-pair');if(e.cause!=='unknown')ngBad();}else ngBad();
    if(closed.has(e.lease)||!closeCalls.has(e.lease)||closeCalls.get(e.lease)>=e.sequence)ngBad();closed.set(e.lease,e.sequence);break;
   case 'abort-observed':
    plain(e);if(e.site==='root-finish'){requireRole('root');if(e.cause!=='explicit-finish')ngBad();}
    else if(e.site==='root-abort'){requireRole('root');if(e.cause!=='unknown')ngBad();}
    else if(e.site==='initial-stop'){requireRole('outer','target-pair');if(e.cause!=='unknown')ngBad();}
    else if(e.site==='initial-child'){requireRole('activation-child','pair-child');if(e.cause!=='unknown')ngBad();}
    else if(e.site==='pair-parent-abort'||e.site==='outer-parent-abort'){
     requireRole(e.site==='pair-parent-abort'?'target-pair':'outer');if(e.cause!=='parent-abort')ngBad();
     const first=lease(e.lease).firstClose;
     if(first!==null&&first>=e.sequence||!closed.has(e.lease)&&!(s.coverage==='prefix'&&['UNBOUND','PREBIND_GAP','PROJECTION_GAP'].includes(s.reason)))ngBad();
    }else ngBad();break;
   case 'child-finally':
    requireSite('initial-child-finally');requireRole('activation-child','pair-child');plain(e);if(e.cause!=='finally'||childFinal.has(e.lease))ngBad();childFinal.add(e.lease);break;
   case 'snapshot-cut':
    requireSite('snapshot');requireRole('root');plain(e);if(!scopeSeen||e!==s.events.at(-1)||e.sequence!==s.cut)ngBad();cutSeen=true;break;
   default:ngBad();
  }
 }
 if(!scopeSeen||!cutSeen||s.target!==target||s.firstError!==firstError||pairSeen&&!pair&&!(s.coverage==='prefix'&&['UNBOUND','PREBIND_GAP','PROJECTION_GAP'].includes(s.reason))||!pairSeen&&s.coverage==='complete'&&pair)ngBad();
 for(const l of s.leases)if(l.firstClose!==(closed.get(l.ordinal)??null))ngBad();
 for(const p of s.promises)if(p.retained!==(retained.get(p.ordinal)??null)||p.settlement!==(settled.get(p.ordinal)??null))ngBad();
 for(const e of s.errors)if(e.first!==errorFirst.get(e.ordinal))ngBad();
 if(s.focus.selection==='first-check-threw'){
  if(!pairChecks.length||pairChecks[0].lease!==s.focus.pairChild)ngBad();
 }else if(s.focus.selection==='first-observed'){
  if(pairChecks.length||s.events.find(e=>role(e.lease)==='pair-child')?.lease!==s.focus.pairChild)ngBad();
 }
 if(s.coverage==='complete'){
  if(target!=='unreached'&&!activation)ngBad();
  if(pairSeen&&(!pair||pair.firstClose===null||!s.promises.some(p=>p.lease===pair.ordinal&&p.retained!==null&&p.settlement!==null&&pair.firstClose<p.settlement)))ngBad();
 }
 return n3TraceSummary(s);
}
function n3CausalReplay(record){
 let value=record;
 if(typeof record==='string'||Buffer.isBuffer(record)){
  const bytes=typeof record==='string'?Buffer.from(record,'utf8'):record;if(bytes.length>6144)ngBad();
  let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{ngBad();}
  if(!text.endsWith('\n'))ngBad();try{value=JSON.parse(text.slice(0,-1));}catch{ngBad();}
  if(JSON.stringify(value)+'\n'!==text)ngBad();
 }
 if(!n3JsonData(value)||!ngSchema(value,N3_CAUSAL_SCHEMA,N3_CAUSAL_SCHEMA)||Buffer.byteLength(JSON.stringify(value)+'\n','utf8')>6144)ngBad();
 return n3TraceReplay(value.snapshot);
}

export {n3TraceReplay,n3CausalReplay};
