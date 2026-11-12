import {AsyncLocalStorage} from 'node:async_hooks';
const PURPOSE='afw.finite-budget-diagnostics.syn.v1';
const CHRONOLOGY='afw.finite-budget-chronology.syn.v2';
// IDs 1..54 are closed over the pinned compiler manifest. 0 denotes unknown.
export const budgetReaderSiteCount=54;
const READER_ORIGIN=Symbol('reader-origin');
function readerSite(meta){
 let value;
 try{value=data(meta,'readerSite');}catch{return 0;}
 return Number.isInteger(value)&&value>=1&&value<=budgetReaderSiteCount?value:0;
}
const EVENTS=['root','child','begin','bytes','logical','scopeLogical','cancel','settle','incomplete'];
const INVALID_REASONS=new Set([
 'unknown','constructorOptions','collectorException','rootInput','childInput','childConflict','beginContext','beginMethodResource',
 'beginFetchLink','bytesInput','logicalInput','scopeLogicalInput','cancelInput','settleInput','settleTime','promiseThenMissing','promiseThenException',
 'descendantStore','descendantChild','runMissingLease','phaseStore','phaseValue','guardRoot','holderInput','holderConflict','captureInput',
 'captureConflict','facadeInput','localBodyStore','observerFulfilledCallback','observerRejectedCallback','observerThenException','dormantInvocation','cloneOrigin',
 'readerOrigin','holderIdentity','invocationIdentity','invocationRoot','methodPhase','clockLease','aliasStore','aliasChild','transportPhase','transactionContext','fetchResource',
]);
const counts=keys=>Object.fromEntries(Array.from(keys,key=>[key,0]));
const splitCount=()=>({beforeRetentionOmission:0,afterRetentionOmission:0});
const PHASES=new Set(['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory']);
const PHASE_BITS=new Map([...PHASES].map((phase,index)=>[phase,1<<index]));
const RESOURCES=new Set(['CFcredential','CFdeployment','CFversion','CFworkflow','CFcontainer','CFschedule','CFtail','GHsource','JWKS','DO','SQL','KV','transport','rateLimiter']);
const OPERATIONS=new Set(['get','list','put','delete','first','all','run','sync','transaction','getAlarm','setAlarm','deleteAlarm','fetch','read','cancel','batch','exec','rpc','limit']);
const REASONS=new Set(['timeout','denied','aborted','guard']);
const data=(value,key)=>{if(!value||typeof value!=='object')return undefined;const d=Object.getOwnPropertyDescriptor(value,key);return d&&Object.hasOwn(d,'value')?d.value:undefined;};
const nativeObject=value=>value!==null&&(typeof value==='object'||typeof value==='function');
const number=value=>typeof value==='number'&&Number.isFinite(value)&&value>=0;
const integer=value=>Number.isSafeInteger(value)&&value>=0;
const metric=()=>({nativeBytesUnavailable:0,nativeStarted:0,nativeSettled:0,nativeRejected:0,logicalDenied:0,cancelStarted:0,cancelSettled:0,active:0,peak:0,nativeBytesRead:null,chunksRead:null,nativeDurationSumMs:0});
export const budgetProofVocabulary=Object.freeze(Object.fromEntries(Object.entries({
 phases:PHASES,resources:RESOURCES,operations:OPERATIONS,logicalReasons:REASONS,events:EVENTS,invalidReasons:INVALID_REASONS
}).map(([key,values])=>[key,Object.freeze([...values])])));
export function createBudgetDiagnostics(options={}){

 const revision=data(options,'testRevision'),role=data(options,'workerRole');
 const testRevision=typeof revision==='string'&&/^[a-f0-9]{40}$/.test(revision)?revision:null;
 const workerRole=['QA','M','fixture'].includes(role)?role:'fixture';
 let optionsValid=!!testRevision&&role===workerRole;
 function recordLimit(key){
  const descriptor=Object.getOwnPropertyDescriptor(options??{},key);
  if(!descriptor)return 16384;
  if(Object.hasOwn(descriptor,'value')&&integer(descriptor.value)&&descriptor.value>=1&&descriptor.value<=16384)return descriptor.value;
  optionsValid=false;return 16384;
 }
 const limits={operation:recordLimit('maxRows'),guard:recordLimit('maxGuards'),scope:recordLimit('maxScopes')};
 if(Object.getOwnPropertyDescriptor(options??{},'maxEvents')||Object.getOwnPropertyDescriptor(options??{},'diagnosticCandidate'))optionsValid=false;
 const budget=Object.fromEntries(Object.entries(limits).map(([kind,limit])=>[kind,{limit,retained:0,omitted:0,firstOmittedOrdinal:null}]));
 const coverage={overflow:false,invalid:optionsValid?0:1,unattributed:0,nativeBytesUnavailable:0,numericOverflow:false};
 const roots=new WeakMap(),rootHandles=new WeakMap(),children=new WeakMap(),childHandles=new WeakMap(),operations=new WeakMap();
 const rowMetrics=new WeakMap(),rows=[],logicalScopeEvents=[],scopeRows=[],groups=new Map(),totals=metric();
 let rootOrdinal=0,childOrdinal=0,opOrdinal=0,scopeGuardEvents=0,deniedScopes=0,events=0,firstAt=null,lastAt=null;
 const byEvent=counts(EVENTS),reasons=counts(INVALID_REASONS),invalidByRetention=splitCount(),unattributedByRetention=splitCount();
 const readerBefore=Array(budgetReaderSiteCount+1).fill(0),readerAfter=Array(budgetReaderSiteCount+1).fill(0);
 let firstReaderOrigin=null,firstOmission=null,firstInvalid=null,method='constructor';
 function plus(value,delta=1,duration=false){
  const next=value+delta;
  if(duration?number(next):integer(next))return next;
  coverage.numericOverflow=true;return value;
 }
 function increment(target,key,delta=1,duration=false){target[key]=plus(target[key]??0,delta,duration);}
 const event=()=>{events=plus(events);increment(byEvent,method);};
 const relation=()=>firstOmission?'afterRetentionOmission':'beforeRetentionOmission';
 function admit(kind){
  const entry=budget[kind];
  if(entry.retained<entry.limit){increment(entry,'retained');return true;}
  increment(entry,'omitted');entry.firstOmittedOrdinal??=events;
  firstOmission??={event:method,ordinal:events,kind};coverage.overflow=true;return false;
 }
 const retention=()=>({
  purpose:'afw.finite-budget-retention.syn.v1',operationRows:{...budget.operation},
  guardRows:{...budget.guard},scopeRows:{...budget.scope},firstOmission:firstOmission&&{...firstOmission},traceComplete:!coverage.overflow
 });
 const recordInvalid=(candidate,unattributed)=>{
  const reason=INVALID_REASONS.has(candidate)?candidate:'unknown',where=relation();
  firstInvalid??={event:method,ordinal:events,reason,relation:where};
  increment(reasons,reason);increment(invalidByRetention,where);
  if(unattributed)increment(unattributedByRetention,where);
 };
 if(coverage.invalid)recordInvalid('constructorOptions',false);
 const invalid=(reason,unattributed=false)=>{
  increment(coverage,'invalid');if(unattributed)increment(coverage,'unattributed');
  recordInvalid(reason,unattributed);return null;
 };
 const chronology=()=>({
  purpose:CHRONOLOGY,eventCalls:events,byEvent:{...byEvent},firstInvalid:firstInvalid&&{...firstInvalid},
  invalid:{...invalidByRetention},unattributed:{...unattributedByRetention},reasons:{...reasons},
  readerOrigins:{beforeRetentionOmission:readerBefore.slice(),afterRetentionOmission:readerAfter.slice(),firstReaderOrigin:firstReaderOrigin&&{...firstReaderOrigin}}
 });
 const handle=()=>Object.freeze(Object.create(null));
 function metricForScope(owner){
  if(owner.metric===undefined){
   owner.metric=admit('scope')?{rootOrdinal:owner.rootOrdinal,childOrdinal:owner.childOrdinal??null,...metric()}:null;
   if(owner.metric)scopeRows.push(owner.metric);
  }
  return owner.metric;
 }
 const touch=(row,field,amount=1,duration=false)=>{for(const m of rowMetrics.get(row))increment(m,field,amount,duration);};
 const active=(row,delta)=>{for(const m of rowMetrics.get(row)){increment(m,'active',delta);m.peak=Math.max(m.peak,m.active);}};
 const safe=(name,fn)=>(...args)=>{
  const previous=method;method=name;
  try{return fn(...args);}catch{return invalid('collectorException');}
  finally{method=previous;}
 };
 const root=safe('root',(object,meta)=>{
  event();const phase=data(meta,'phase'),deadline=data(meta,'deadline'),kind=data(meta,'kind');
  if(!nativeObject(object)||!PHASES.has(phase)||!['control','transport'].includes(kind)||!(deadline===null||number(deadline)))return invalid('rootInput',true);
  const previous=roots.get(object);if(previous)return previous;
  rootOrdinal=plus(rootOrdinal);
  const ref=handle(),value={rootOrdinal,phase,deadline,kind,denialMask:0};roots.set(object,ref);rootHandles.set(ref,value);return ref;
 });
 const child=safe('child',(rootRef,object,meta)=>{
  event();const r=nativeObject(rootRef)&&rootHandles.get(rootRef),deadline=data(meta,'deadline');
  if(!r||!nativeObject(object)||!(deadline===null||number(deadline)))return invalid('childInput',true);
  const previous=children.get(object);if(previous){if(childHandles.get(previous).rootOrdinal!==r.rootOrdinal)return invalid('childConflict',true);return previous;}
  childOrdinal=plus(childOrdinal);
  const ref=handle();children.set(object,ref);childHandles.set(ref,{rootOrdinal:r.rootOrdinal,childOrdinal,deadline,denialMask:0});return ref;
 });
 const begin=safe('begin',(rootRef,childRef,meta)=>{
  event();const r=nativeObject(rootRef)&&rootHandles.get(rootRef),c=childRef===null?null:nativeObject(childRef)&&childHandles.get(childRef);
  const phase=data(meta,'phase'),resourceClass=data(meta,'resourceClass'),operation=data(meta,'operation'),at=data(meta,'at'),fetchOpRef=data(meta,'fetchOpRef')??null;
  const fetchRow=fetchOpRef===null?null:nativeObject(fetchOpRef)&&operations.get(fetchOpRef);
  if(!r||childRef!==null&&!c||c&&c.rootOrdinal!==r.rootOrdinal||!PHASES.has(phase)||!RESOURCES.has(resourceClass)||!OPERATIONS.has(operation)||!number(at))return invalid('beginContext',true);
  if(operation==='rpc'&&resourceClass!=='DO'||operation==='limit'&&resourceClass!=='rateLimiter'||resourceClass==='rateLimiter'&&operation!=='limit')return invalid('beginMethodResource',true);
  if(fetchOpRef!==null&&(!fetchRow||!['read','cancel'].includes(operation)||fetchRow.operation!=='fetch'||fetchRow.rootOrdinal!==r.rootOrdinal||fetchRow.childOrdinal!==(c?.childOrdinal??null)||fetchRow.phase!==phase||fetchRow.resourceClass!==resourceClass))return invalid('beginFetchLink',true);
  opOrdinal=plus(opOrdinal);
  const row={testRevision,workerRole,phase,resourceClass,operation,rootOrdinal:r.rootOrdinal,childOrdinal:c?.childOrdinal??null,opOrdinal,enteredEventOrdinal:events,settledEventOrdinal:null,fetchOpOrdinal:fetchRow?.opOrdinal??null,kind:r.kind,rootDeadline:r.deadline,childDeadline:c?.deadline??null,enteredAt:at,settledAt:null,status:'pending',nativeBytesRead:null,nativeBytesReason:'not_exposed_by_native_api',chunksRead:null,readDurationMs:0,logicalAt:null,logicalReason:null,cancelStartedAt:null,cancelSettledAt:null};
  const g=phase+'|'+resourceClass;if(!groups.has(g))groups.set(g,{phase,resourceClass,...metric()});
  const scopeMetric=metricForScope(c??r),metrics=[totals,groups.get(g)];
  if(scopeMetric)metrics.push(scopeMetric);
  rowMetrics.set(row,metrics);
  increment(coverage,'nativeBytesUnavailable');touch(row,'nativeBytesUnavailable');touch(row,'nativeStarted');active(row,1);
  firstAt=firstAt===null?at:Math.min(firstAt,at);lastAt=lastAt===null?at:Math.max(lastAt,at);
  const ref=handle();operations.set(ref,row);if(admit('operation'))rows.push(row);return ref;
 });
 const bytes=safe('bytes',(ref,meta)=>{
  event();const row=nativeObject(ref)&&operations.get(ref),length=data(meta,'length'),chunks=data(meta,'chunks'),durationMs=data(meta,'durationMs');
  if(!row||row.operation!=='read'||!integer(length)||!integer(chunks)||!number(durationMs))return invalid('bytesInput');
  if(row.nativeBytesRead===null){row.nativeBytesRead=0;row.chunksRead=0;row.nativeBytesReason=null;increment(coverage,'nativeBytesUnavailable',-1);touch(row,'nativeBytesUnavailable',-1);}
  increment(row,'nativeBytesRead',length);increment(row,'chunksRead',chunks);increment(row,'readDurationMs',durationMs,true);
  touch(row,'nativeBytesRead',length);touch(row,'chunksRead',chunks);
 });
 const logical=safe('logical',(ref,meta)=>{
  event();const row=nativeObject(ref)&&operations.get(ref),at=data(meta,'at'),reason=data(meta,'reason');
  if(!row||!number(at)||!REASONS.has(reason))return invalid('logicalInput');
  if(row.logicalAt!==null)return;
  row.logicalAt=at;row.logicalReason=reason;touch(row,'logicalDenied');
 });

 const scopeLogical=safe('scopeLogical',(rootRef,childRef,meta)=>{
  event();const r=nativeObject(rootRef)&&rootHandles.get(rootRef),c=childRef===null?null:nativeObject(childRef)&&childHandles.get(childRef);
  const phase=data(meta,'phase'),at=data(meta,'at'),reason=data(meta,'reason');
  if(!r||childRef!==null&&!c||c&&c.rootOrdinal!==r.rootOrdinal||!PHASES.has(phase)||!number(at)||!REASONS.has(reason))return invalid('scopeLogicalInput',true);
  const owner=c??r,bit=PHASE_BITS.get(phase);metricForScope(owner);
  scopeGuardEvents=plus(scopeGuardEvents);
  if(!(owner.denialMask&bit)){owner.denialMask|=bit;deniedScopes=plus(deniedScopes);}
  if(admit('guard'))logicalScopeEvents.push({testRevision,workerRole,eventOrdinal:scopeGuardEvents,rootOrdinal:r.rootOrdinal,childOrdinal:c?.childOrdinal??null,phase,at,reason});
 });

 const cancel=safe('cancel',(ref,meta)=>{
  event();const row=nativeObject(ref)&&operations.get(ref),at=data(meta,'at'),stage=data(meta,'stage');
  if(!row||!number(at)||!['started','settled'].includes(stage))return invalid('cancelInput');
  const key=stage==='started'?'cancelStartedAt':'cancelSettledAt';if(row[key]!==null)return;
  row[key]=at;touch(row,stage==='started'?'cancelStarted':'cancelSettled');
 });
 const settle=safe('settle',(ref,meta,observerReason)=>{
  event();const row=nativeObject(ref)&&operations.get(ref),at=data(meta,'at'),status=data(meta,'status');
  if(!row||!number(at)||!['fulfilled','rejected'].includes(status))return invalid(observerReason==='promiseThenMissing'||observerReason==='promiseThenException'?observerReason:'settleInput');
  if(row.status!=='pending')return;
  if(at<row.enteredAt)return invalid('settleTime');
  row.status=status;row.settledAt=at;row.settledEventOrdinal=events;lastAt=Math.max(lastAt??at,at);touch(row,'nativeSettled');if(status==='rejected')touch(row,'nativeRejected');touch(row,'nativeDurationSumMs',at-row.enteredAt,true);active(row,-1);
 });
 const snapshot=safe('snapshot',()=>({purpose:PURPOSE,testRevision,workerRole,rows:rows.map(row=>({...row})),logicalScopeEvents:logicalScopeEvents.map(event=>({...event})),totals:{...totals,scopeGuardEvents,deniedScopes,observedWallMs:firstAt===null?0:(lastAt??firstAt)-firstAt,scopes:scopeRows.map(m=>({...m}))},byPhaseResource:[...groups.values()].map(m=>({...m})),coverage:{...coverage,observedMetricsComplete:coverage.invalid===0&&coverage.unattributed===0&&!coverage.numericOverflow&&budget.scope.omitted===0},retention:retention(),chronology:chronology(),operationalReadiness:false,completePackage:false,PCoff:false}));
 const incomplete=safe('incomplete',(reason,origin,site,context)=>{
  event();
  if(origin===READER_ORIGIN){
   const buckets=firstOmission?readerAfter:readerBefore;
   increment(buckets,site);firstReaderOrigin??={ordinal:events,relation:relation(),site,context};
  }
  return invalid(reason,true);
 });
 return Object.freeze({root,child,begin,bytes,logical,scopeLogical,cancel,settle,snapshot,incomplete});
}
function passiveThen(value){
 if(!nativeObject(value))return null;
 for(let object=value;object!==null;object=Object.getPrototypeOf(object)){const d=Object.getOwnPropertyDescriptor(object,'then');if(d)return Object.hasOwn(d,'value')&&typeof d.value==='function'?d.value:null;}
 return null;
}
export function observeBudgetPromise(collector,opRef,promise){
 try{
  const then=passiveThen(promise);if(!then){collector.settle(opRef,{at:performance.now(),status:null},'promiseThenMissing');return promise;}
  const chain=Reflect.apply(then,promise,[()=>collector.settle(opRef,{at:performance.now(),status:'fulfilled'}),()=>collector.settle(opRef,{at:performance.now(),status:'rejected'})]);
  const next=passiveThen(chain);if(next)Reflect.apply(next,chain,[undefined,()=>{}]);
 }catch{try{collector.settle(opRef,{at:performance.now(),status:null},'promiseThenException');}catch{/* A sensor never changes native output. */}}
 return promise;
}


// SYN observer only. Native identities and captured stores never authorize work.
export function createBudgetRuntime(options={}){
 const collector=createBudgetDiagnostics(options),als=new AsyncLocalStorage();
 const leaseClocks=new WeakMap(),leases=new WeakMap(),nativeHolders=new WeakMap(),nativePairs=new WeakMap(),bodies=new WeakMap(),facades=new WeakSet(),facadeHolders=new WeakSet(),nativeFunctions=new WeakMap(),requestResources=new WeakMap(),requestMethods=new WeakMap();
 const now=()=>performance.now(),incomplete=reason=>collector.incomplete(reason);
 const immutable=value=>Object.freeze(value);
 const root=(lease,phase,deadline,kind='control')=>{
  const ref=collector.root(lease,{phase,deadline,kind});
  if(nativeObject(lease)&&ref)leases.set(lease,immutable({root:ref,child:null,phase}));
  return lease;
 };
 const descendant=(parent,child,deadline)=>{
  const parentStore=leases.get(parent),currentStore=als.getStore(),store=currentStore?.root===parentStore?.root?currentStore:parentStore;
  if(!store||!nativeObject(child)){incomplete(!store?'descendantStore':'descendantChild');return child;}
  const ref=collector.child(store.root,child,{deadline});
  if(ref)leases.set(child,immutable({...store,child:ref,phaseOverlay:undefined}));
  return child;
 };
 const runWithPhase=(store,value,invoke)=>als.run(immutable({...store,phase:value,phaseOverlay:value}),invoke);
 const run=(lease,invoke)=>{
  const store=leases.get(lease),active=als.getStore();
  if(!store&&active?.excluded)return invoke();
  if(!store)incomplete('runMissingLease');
  if(store&&active?.root===store.root&&active.phaseOverlay)return runWithPhase(store,active.phaseOverlay,invoke);
  return als.run(store,invoke);
 };
 const phase=(value,invoke)=>{
  const store=als.getStore();
  if(!store||!PHASES.has(value)){incomplete(!store?'phaseStore':'phaseValue');return invoke();}
  return runWithPhase(store,value,invoke);
 };
 const guardValue=value=>{const store=als.getStore();if(store?.excluded)return value;if(store?.root)collector.scopeLogical(store.root,store.child,{phase:store.phase,at:now(),reason:'guard'});else incomplete('guardRoot');return value;};
 const fixture=invoke=>als.run(immutable({excluded:true}),()=>invoke());
 const nativeHolder=(holder,resource,kind='holder')=>{
  if(holder==null)return holder;
  if(!nativeObject(holder)||!RESOURCES.has(resource)){incomplete('holderInput');return holder;}
  const prior=nativeHolders.get(holder);if(prior&&(prior.resource!==resource||prior.kind!==kind))incomplete('holderConflict');else nativeHolders.set(holder,immutable({resource,kind}));
  return holder;
 };
 // Called only at source-proven original acquisitions, never by method-name inference.
 const capture=(holder,method,fn,resource)=>{
  if(!nativeObject(holder)||typeof fn!=='function'||!RESOURCES.has(resource)){incomplete('captureInput');return fn;}
  let pairs=nativePairs.get(holder);if(!pairs){pairs=new WeakMap();nativePairs.set(holder,pairs);}
  const prior=pairs.get(fn);if(prior&&(prior.method!==method||prior.resource!==resource))incomplete('captureConflict');
  else if(!facades.has(fn)){const description=immutable({method,resource,kind:nativeHolders.get(holder)?.kind??'holder'});pairs.set(fn,description);nativeFunctions.set(fn,description);}
  return fn;
 };
 const facade=value=>{if(nativeObject(value))facades.add(value);else incomplete('facadeInput');return value;};
 const tagBody=(value,owner)=>{
  if(nativeObject(value)&&owner)bodies.set(value,owner);
  return value;
 };
 const request=(value,lease)=>tagBody(value,immutable({store:leases.get(lease),resource:'transport',fetch:null,origin:'inbound'}));
 const localResponse=(value)=>{
  const store=als.getStore();if(!store)incomplete('localBodyStore');
  return tagBody(value,immutable({store,resource:'transport',fetch:null,origin:'local-transport'}));
 };
 const body=(receiver,optional=false)=>{
  if(optional&&receiver==null)return undefined;
  // This getter is the business getter, evaluated once at its original access.
  const value=receiver.body,owner=bodies.get(receiver);
  if(owner)tagBody(value,owner);
  return value;
 };
 const thenObserve=(value,fulfilled,rejected)=>{
  try{
   const then=passiveThen(value);
   if(!then){fulfilled(value);return;}
   const chained=Reflect.apply(then,value,[v=>{try{fulfilled(v);}catch{incomplete('observerFulfilledCallback');}},()=>{try{rejected();}catch{incomplete('observerRejectedCallback');}}]);
   const next=passiveThen(chained);if(next)Reflect.apply(next,chained,[undefined,()=>{}]);
  }catch{incomplete('observerThenException');}
 };
 function invoke(fn,receiver,args,meta,original=()=>Reflect.apply(fn,receiver,args)){
  const bodyOwner=bodies.get(receiver),currentStore=als.getStore();
  const localStore=bodyOwner&&!bodyOwner.fetch&&bodyOwner.origin!=='outbound'&&currentStore?.root===bodyOwner.store?.root&&!currentStore?.excluded?currentStore:null;
  const store=localStore??bodyOwner?.store??currentStore;
  if(meta.dormant){incomplete('dormantInvocation');return original();}
  if(meta.edge==='clone'){
   const result=original();if(bodyOwner)tagBody(result,bodyOwner);else incomplete('cloneOrigin');return result;
  }
  if(meta.edge==='reader'){
   const result=original();
   if(bodyOwner)tagBody(result,localStore?immutable({...bodyOwner,store:localStore}):bodyOwner);
   else if(currentStore?.excluded!==true){
    const context=currentStore===undefined?'no_store':currentStore?.excluded?'excluded':currentStore?.root?'rooted':'unrooted';
    collector.incomplete('readerOrigin',READER_ORIGIN,readerSite(meta),context);
   }
   return result;
  }
  const pair=(nativeObject(receiver)?nativePairs.get(receiver)?.get(fn):null)??nativePairs.get(globalThis)?.get(fn)??nativeFunctions.get(fn);
  const resource=pair?.resource;
  if(meta.edge==='holder'||pair?.kind==='namespace'&&pair.method==='get'){
   const result=original();
   if(resource)nativeHolder(result,resource,pair?.kind==='namespace'?'stub':'holder');
   else if(!facades.has(fn)&&!store?.excluded)incomplete('holderIdentity');
   return result;
  }
  if(facades.has(fn)||meta.excluded||store?.excluded)return original();
  const known=pair||bodyOwner;
  if(!known||!store?.root){incomplete(!known?'invocationIdentity':'invocationRoot');return original();}
  const operation=meta.operation??pair?.method,resourceClass=bodyOwner?.resource??(meta.classifyFetch?fetchResource(args[0]):meta.resource??resource);
  const at=now(),ref=collector.begin(store.root,store.child,{phase:store.phase,resourceClass,operation,at,fetchOpRef:bodyOwner?.fetch??null});
  if(operation==='cancel'&&bodyOwner?.fetch)collector.cancel(bodyOwner.fetch,{at,stage:'started'});
  let result;
  try{result=operation==='transaction'?als.run(immutable({...store,nativeTransaction:true}),()=>original()):original();}catch(error){collector.settle(ref,{at:now(),status:'rejected'});throw error;}
  thenObserve(result,value=>{
   const settled=now();
   if(operation==='fetch')tagBody(value,immutable({store,resource:resourceClass,fetch:ref,origin:'outbound'}));
   if(operation==='read'&&meta.exposedBytes){
    // Only exposed native ArrayBuffers/chunks. No text, JSON, cloning or probing.
    const chunk=data(value,'value'),done=data(value,'done');
    if(value instanceof ArrayBuffer)collector.bytes(ref,{length:value.byteLength,chunks:1,durationMs:settled-at});
    else if(ArrayBuffer.isView(chunk))collector.bytes(ref,{length:chunk.byteLength,chunks:1,durationMs:settled-at});
    else if(done===true)collector.bytes(ref,{length:0,chunks:0,durationMs:settled-at});
   }
   collector.settle(ref,{at:settled,status:'fulfilled'});
   if(operation==='cancel'&&bodyOwner?.fetch)collector.cancel(bodyOwner.fetch,{at:settled,stage:'settled'});
  },()=>{
   const settled=now();collector.settle(ref,{at:settled,status:'rejected'});
   if(operation==='cancel'&&bodyOwner?.fetch)collector.cancel(bodyOwner.fetch,{at:settled,stage:'settled'});
  });
  return result;
 }
 const member=(receiver,method,meta,optionalReceiver=false,optionalMethod=false)=>{
  if(optionalReceiver&&receiver==null)return undefined;
  const fn=readMethod(receiver,method);
  if(optionalMethod&&fn==null)return undefined;
  return (...args)=>invoke(fn,receiver,args,meta);
 };
 const direct=(fn,meta)=>(...args)=>invoke(fn,undefined,args,meta,()=>Reflect.apply(fn,undefined,args));
 const reflect=(apply,meta)=>(fn,receiver,args)=>invoke(fn,receiver,args,meta,()=>Reflect.apply(apply,Reflect,[fn,receiver,args]));
 const call=(fn,meta)=>{
  const callMethod=fn.call;
  return (receiver,...args)=>invoke(fn,receiver,args,meta,()=>Reflect.apply(callMethod,fn,[receiver,...args]));
 };
 
 const methodValue=(request,value)=>{requestMethods.set(request,value);return value;};
 const methodPhase=(request,prefix)=>{const method=requestMethods.get(request);if(!['GET','POST'].includes(method)){incomplete('methodPhase');return null;}return prefix+'_'+method.toLowerCase();};
 const deadline=lease=>leaseClocks.get(lease);
 const clock=(lease,deadline)=>{if(nativeObject(lease))leaseClocks.set(lease,deadline);else incomplete('clockLease');return lease;};
 const control=(lease,value,req,invoke)=>{
  if(!leases.has(lease))root(lease,value,leaseClocks.get(lease));
  request(req,lease);return run(lease,invoke);
 };
 const childCall=(parent,child,deadline,invoke)=>{if(!leases.has(parent)&&als.getStore()?.excluded)return invoke();descendant(parent,child,deadline);return run(child,invoke);};
 const childInvoke=(parent,deadline,fn,receiver,args)=>childCall(parent,args[0],deadline,()=>Reflect.apply(fn,receiver,args));
 const alias=(parent,child)=>{const store=leases.get(parent);if(store&&nativeObject(child))leases.set(child,store);else if(!als.getStore()?.excluded)incomplete(!store?'aliasStore':'aliasChild');return child;};
 const transport=(req,path,invoke)=>{
  const value=path==='/oauth/token'?'token_exchange':path==='/mcp'?'mcp_read':null;
  if(!value){incomplete('transportPhase');return invoke();}
  root(req,value,null,'transport');request(req,req);return run(req,invoke);
 };
 function readMethod(receiver,method,optional=false){
  if(optional&&receiver==null)return undefined;
  const fn=receiver[method],holder=nativeHolders.get(receiver);
  if(holder&&typeof fn==='function'&&!facades.has(fn))capture(receiver,method,fn,holder.resource);
  return fn;
 }
 const facadeHolder=(value,keys)=>{
  if(nativeObject(value))facadeHolders.add(value);
  if(nativeObject(value))for(const key of keys){
   const d=Object.getOwnPropertyDescriptor(value,key);
   if(d&&Object.hasOwn(d,'value')&&typeof d.value==='function')facades.add(d.value);
  }
  return value;
 };
 const transactionArgument=value=>{
  if(facadeHolders.has(value))return value;
  if(als.getStore()?.nativeTransaction)nativeHolder(value,'DO','transaction');
  else if(!als.getStore()?.excluded)incomplete('transactionContext');
  return value;
 };
 
 
 function fetchResource(value,required=true){
  if(nativeObject(value)&&requestResources.has(value))return requestResources.get(value);
  let resource=null;
  if(typeof value==='string'){
   if(value.startsWith('https://api.github.com/'))resource='GHsource';
   else if(value.includes('/cdn-cgi/access/certs'))resource='JWKS';
   else if(value.startsWith('https://api.cloudflare.com/client/v4/')){
    if(value.includes('/tokens/'))resource='CFcredential';
    else if(value.includes('/deployments'))resource='CFdeployment';
    else if(value.includes('/workflows'))resource='CFworkflow';
    else if(value.includes('/containers')||value.includes('/instances-v2'))resource='CFcontainer';
    else if(value.includes('/schedules'))resource='CFschedule';
    else if(value.includes('/tails'))resource='CFtail';
    else if(value.includes('/versions')||value.includes('/scripts/')||value.includes('/workers/workers/'))resource='CFversion';
   }
  }
  if(required&&!resource)incomplete('fetchResource');
  return resource;
 }
 const bind=fn=>{
  const method=fn.bind;
  return (...args)=>{
   const value=Reflect.apply(method,fn,args),description=nativeFunctions.get(fn);
   if(description&&typeof value==='function')nativeFunctions.set(value,description);
   return value;
  };
 };
 const construct=(constructor,kind)=>(...args)=>{
  const value=Reflect.construct(constructor,args);
  if(kind==='Request'){const resource=fetchResource(args[0],false);if(resource)requestResources.set(value,resource);}
  const parent=bodies.get(args[0]),store=als.getStore();
  if(parent)tagBody(value,parent);
  else if(store)tagBody(value,immutable({store,resource:'transport',fetch:null,origin:kind==='Request'?'inbound':'local-transport'}));
  return value;
 };
 // Captured once before the fixed fixture can install any of its existing facades.
 capture(globalThis,'fetch',globalThis.fetch,'transport');
 return immutable({collector,root,descendant,run,phase,fixture,guardValue,nativeHolder,capture,facade,facadeHolder,readMethod,transactionArgument,methodValue,methodPhase,deadline,clock,control,childCall,childInvoke,alias,transport,request,localResponse,body,construct,bind,member,direct,reflect,call,snapshot:collector.snapshot});

}
