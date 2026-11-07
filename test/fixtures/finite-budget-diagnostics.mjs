const PURPOSE='afw.finite-budget-diagnostics.syn.v1';
const PHASES=new Set(['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory']);
const RESOURCES=new Set(['CFcredential','CFdeployment','CFversion','CFworkflow','CFcontainer','CFschedule','CFtail','GHsource','JWKS','DO','SQL','KV','transport']);
const OPERATIONS=new Set(['get','list','put','delete','first','all','run','sync','transaction','getAlarm','setAlarm','deleteAlarm','fetch','read','cancel','batch','exec']);
const REASONS=new Set(['timeout','denied','aborted','guard']);
const data=(value,key)=>{if(!value||typeof value!=='object')return undefined;const d=Object.getOwnPropertyDescriptor(value,key);return d&&Object.hasOwn(d,'value')?d.value:undefined;};
const nativeObject=value=>value!==null&&(typeof value==='object'||typeof value==='function');
const number=value=>typeof value==='number'&&Number.isFinite(value)&&value>=0;
const integer=value=>Number.isSafeInteger(value)&&value>=0;
const metric=()=>({nativeStarted:0,nativeSettled:0,nativeRejected:0,logicalDenied:0,cancelStarted:0,cancelSettled:0,active:0,peak:0,nativeBytesRead:null,chunksRead:null,nativeDurationSumMs:0});
export function createBudgetDiagnostics(options={}){
 const revision=data(options,'testRevision'),role=data(options,'workerRole'),requested=data(options,'maxEvents')??16384;
 const testRevision=typeof revision==='string'&&/^[a-f0-9]{40}$/.test(revision)?revision:null;
 const workerRole=['QA','M','fixture'].includes(role)?role:'fixture';
 const limit=integer(requested)&&requested>0&&requested<=16384?requested:16384;
 const coverage={overflow:false,invalid:testRevision&&workerRole===role&&limit===requested?0:1,unattributed:0,nativeBytesUnavailable:0};
 const roots=new WeakMap(),rootHandles=new WeakMap(),children=new WeakMap(),childHandles=new WeakMap(),operations=new WeakMap();
 const rows=[],groups=new Map(),scopes=new Map(),totals=metric();let rootOrdinal=0,childOrdinal=0,opOrdinal=0,events=0,firstAt=null,lastAt=null;
 const event=()=>{events++;if(events>limit){coverage.overflow=true;return false;}return true;};
 const invalid=(unattributed=false)=>{coverage.invalid++;if(unattributed)coverage.unattributed++;return null;};
 const handle=()=>Object.freeze(Object.create(null));
 const touch=(row,field,amount=1)=>{for(const m of [totals,groups.get(row.phase+'|'+row.resourceClass),scopes.get(row.rootOrdinal+'|'+(row.childOrdinal??0))])m[field]+=amount;};
 const active=(row,delta)=>{for(const m of [totals,groups.get(row.phase+'|'+row.resourceClass),scopes.get(row.rootOrdinal+'|'+(row.childOrdinal??0))]){m.active+=delta;m.peak=Math.max(m.peak,m.active);}};
 const safe=fn=>(...args)=>{try{return fn(...args);}catch{return invalid();}};
 const root=safe((object,meta)=>{
  const keep=event(),phase=data(meta,'phase'),deadline=data(meta,'deadline'),kind=data(meta,'kind');
  if(!nativeObject(object)||!PHASES.has(phase)||!['control','transport'].includes(kind)||!(deadline===null||number(deadline)))return invalid(true);
  const previous=roots.get(object);if(previous)return previous;
  if(!keep)return null;
  const ref=handle(),value={rootOrdinal:++rootOrdinal,phase,deadline,kind};roots.set(object,ref);rootHandles.set(ref,value);return ref;
 });
 const child=safe((rootRef,object,meta)=>{
  const keep=event(),r=nativeObject(rootRef)&&rootHandles.get(rootRef),deadline=data(meta,'deadline');
  if(!r||!nativeObject(object)||!(deadline===null||number(deadline)))return invalid(true);
  const previous=children.get(object);if(previous){if(childHandles.get(previous).rootOrdinal!==r.rootOrdinal)return invalid(true);return previous;}
  if(!keep)return null;
  const ref=handle();children.set(object,ref);childHandles.set(ref,{rootOrdinal:r.rootOrdinal,childOrdinal:++childOrdinal,deadline});return ref;
 });
 const begin=safe((rootRef,childRef,meta)=>{
  const keep=event(),r=nativeObject(rootRef)&&rootHandles.get(rootRef),c=childRef===null?null:nativeObject(childRef)&&childHandles.get(childRef);
  const phase=data(meta,'phase'),resourceClass=data(meta,'resourceClass'),operation=data(meta,'operation'),at=data(meta,'at');
  if(!r||childRef!==null&&!c||c&&c.rootOrdinal!==r.rootOrdinal||!PHASES.has(phase)||!RESOURCES.has(resourceClass)||!OPERATIONS.has(operation)||!number(at))return invalid(true);
  const row={testRevision,workerRole,phase,resourceClass,operation,rootOrdinal:r.rootOrdinal,childOrdinal:c?.childOrdinal??null,opOrdinal:++opOrdinal,kind:r.kind,rootDeadline:r.deadline,childDeadline:c?.deadline??null,enteredAt:at,settledAt:null,status:'pending',nativeBytesRead:null,nativeBytesReason:'not_exposed_by_native_api',chunksRead:null,readDurationMs:0,logicalAt:null,logicalReason:null,cancelStartedAt:null,cancelSettledAt:null};
  const g=phase+'|'+resourceClass,scope=row.rootOrdinal+'|'+(row.childOrdinal??0);if(!groups.has(g))groups.set(g,{phase,resourceClass,...metric()});if(!scopes.has(scope))scopes.set(scope,{rootOrdinal:row.rootOrdinal,childOrdinal:row.childOrdinal,...metric()});
  coverage.nativeBytesUnavailable++;touch(row,'nativeStarted');active(row,1);
  firstAt=firstAt===null?at:Math.min(firstAt,at);lastAt=lastAt===null?at:Math.max(lastAt,at);
  const ref=handle();operations.set(ref,row);if(keep)rows.push(row);return ref;
 });
 const bytes=safe((ref,meta)=>{
  event();const row=nativeObject(ref)&&operations.get(ref),length=data(meta,'length'),chunks=data(meta,'chunks'),durationMs=data(meta,'durationMs');
  if(!row||!integer(length)||!integer(chunks)||!number(durationMs))return invalid();
  if(row.nativeBytesRead===null){row.nativeBytesRead=0;row.chunksRead=0;row.nativeBytesReason=null;coverage.nativeBytesUnavailable--;}
  row.nativeBytesRead+=length;row.chunksRead+=chunks;row.readDurationMs+=durationMs;
  for(const m of [totals,groups.get(row.phase+'|'+row.resourceClass),scopes.get(row.rootOrdinal+'|'+(row.childOrdinal??0))]){m.nativeBytesRead=(m.nativeBytesRead??0)+length;m.chunksRead=(m.chunksRead??0)+chunks;}
 });
 const logical=safe((ref,meta)=>{
  event();const row=nativeObject(ref)&&operations.get(ref),at=data(meta,'at'),reason=data(meta,'reason');
  if(!row||!number(at)||!REASONS.has(reason))return invalid();
  if(row.logicalAt!==null)return;
  row.logicalAt=at;row.logicalReason=reason;touch(row,'logicalDenied');
 });
 const cancel=safe((ref,meta)=>{
  event();const row=nativeObject(ref)&&operations.get(ref),at=data(meta,'at'),stage=data(meta,'stage');
  if(!row||!number(at)||!['started','settled'].includes(stage))return invalid();
  const key=stage==='started'?'cancelStartedAt':'cancelSettledAt';if(row[key]!==null)return;
  row[key]=at;touch(row,stage==='started'?'cancelStarted':'cancelSettled');
 });
 const settle=safe((ref,meta)=>{
  event();const row=nativeObject(ref)&&operations.get(ref),at=data(meta,'at'),status=data(meta,'status');
  if(!row||!number(at)||!['fulfilled','rejected'].includes(status))return invalid();
  if(row.status!=='pending')return;
  if(at<row.enteredAt)return invalid();
  row.status=status;row.settledAt=at;lastAt=Math.max(lastAt??at,at);touch(row,'nativeSettled');if(status==='rejected')touch(row,'nativeRejected');touch(row,'nativeDurationSumMs',at-row.enteredAt);active(row,-1);
 });
 const snapshot=safe(()=>({purpose:PURPOSE,testRevision,workerRole,rows:rows.map(row=>({...row})),totals:{...totals,observedWallMs:firstAt===null?0:(lastAt??firstAt)-firstAt,scopes:[...scopes.values()].map(m=>({...m}))},byPhaseResource:[...groups.values()].map(m=>({...m})),coverage:{...coverage},operationalReadiness:false,completePackage:false,PCoff:false}));
 return Object.freeze({root,child,begin,bytes,logical,cancel,settle,snapshot});
}
function passiveThen(value){
 if(!nativeObject(value))return null;
 for(let object=value;object!==null;object=Object.getPrototypeOf(object)){const d=Object.getOwnPropertyDescriptor(object,'then');if(d)return Object.hasOwn(d,'value')&&typeof d.value==='function'?d.value:null;}
 return null;
}
export function observeBudgetPromise(collector,opRef,promise){
 try{
  const then=passiveThen(promise);if(!then){collector.settle(opRef,{at:performance.now(),status:null});return promise;}
  const chain=Reflect.apply(then,promise,[()=>collector.settle(opRef,{at:performance.now(),status:'fulfilled'}),()=>collector.settle(opRef,{at:performance.now(),status:'rejected'})]);
  const next=passiveThen(chain);if(next)Reflect.apply(next,chain,[undefined,()=>{}]);
 }catch{try{collector.settle(opRef,{at:performance.now(),status:null});}catch{/* A sensor never changes native output. */}}
 return promise;
}
