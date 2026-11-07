import {AsyncLocalStorage} from 'node:async_hooks';
const PURPOSE='afw.finite-budget-diagnostics.syn.v1';
const PHASES=new Set(['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory']);
const RESOURCES=new Set(['CFcredential','CFdeployment','CFversion','CFworkflow','CFcontainer','CFschedule','CFtail','GHsource','JWKS','DO','SQL','KV','transport','rateLimiter']);
const OPERATIONS=new Set(['get','list','put','delete','first','all','run','sync','transaction','getAlarm','setAlarm','deleteAlarm','fetch','read','cancel','batch','exec','rpc','limit']);
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
  const phase=data(meta,'phase'),resourceClass=data(meta,'resourceClass'),operation=data(meta,'operation'),at=data(meta,'at'),fetchOpRef=data(meta,'fetchOpRef')??null;
  const fetchRow=fetchOpRef===null?null:nativeObject(fetchOpRef)&&operations.get(fetchOpRef);
  if(!r||childRef!==null&&!c||c&&c.rootOrdinal!==r.rootOrdinal||!PHASES.has(phase)||!RESOURCES.has(resourceClass)||!OPERATIONS.has(operation)||!number(at))return invalid(true);
  if(operation==='rpc'&&resourceClass!=='DO'||operation==='limit'&&resourceClass!=='rateLimiter'||resourceClass==='rateLimiter'&&operation!=='limit')return invalid(true);
  if(fetchOpRef!==null&&(!fetchRow||!['read','cancel'].includes(operation)||fetchRow.operation!=='fetch'||fetchRow.rootOrdinal!==r.rootOrdinal||fetchRow.childOrdinal!==(c?.childOrdinal??null)||fetchRow.phase!==phase||fetchRow.resourceClass!==resourceClass))return invalid(true);
  const row={testRevision,workerRole,phase,resourceClass,operation,rootOrdinal:r.rootOrdinal,childOrdinal:c?.childOrdinal??null,opOrdinal:++opOrdinal,fetchOpOrdinal:fetchRow?.opOrdinal??null,kind:r.kind,rootDeadline:r.deadline,childDeadline:c?.deadline??null,enteredAt:at,settledAt:null,status:'pending',nativeBytesRead:null,nativeBytesReason:'not_exposed_by_native_api',chunksRead:null,readDurationMs:0,logicalAt:null,logicalReason:null,cancelStartedAt:null,cancelSettledAt:null};
  const g=phase+'|'+resourceClass,scope=row.rootOrdinal+'|'+(row.childOrdinal??0);if(!groups.has(g))groups.set(g,{phase,resourceClass,...metric()});if(!scopes.has(scope))scopes.set(scope,{rootOrdinal:row.rootOrdinal,childOrdinal:row.childOrdinal,...metric()});
  coverage.nativeBytesUnavailable++;touch(row,'nativeStarted');active(row,1);
  firstAt=firstAt===null?at:Math.min(firstAt,at);lastAt=lastAt===null?at:Math.max(lastAt,at);
  const ref=handle();operations.set(ref,row);if(keep)rows.push(row);return ref;
 });
 const bytes=safe((ref,meta)=>{
  event();const row=nativeObject(ref)&&operations.get(ref),length=data(meta,'length'),chunks=data(meta,'chunks'),durationMs=data(meta,'durationMs');
  if(!row||row.operation!=='read'||!integer(length)||!integer(chunks)||!number(durationMs))return invalid();
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
 const incomplete=safe(()=>{event();return invalid(true);});
 return Object.freeze({root,child,begin,bytes,logical,cancel,settle,snapshot,incomplete});
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


// SYN observer only. Native identities and captured stores never authorize work.
export function createBudgetRuntime(options={}){
 const collector=createBudgetDiagnostics(options),als=new AsyncLocalStorage();
 const leaseClocks=new WeakMap(),leases=new WeakMap(),nativeHolders=new WeakMap(),nativePairs=new WeakMap(),bodies=new WeakMap(),facades=new WeakSet(),facadeHolders=new WeakSet(),nativeFunctions=new WeakMap(),requestResources=new WeakMap(),requestMethods=new WeakMap();
 const now=()=>performance.now(),incomplete=()=>collector.incomplete();
 const immutable=value=>Object.freeze(value);
 const root=(lease,phase,deadline,kind='control')=>{
  const ref=collector.root(lease,{phase,deadline,kind});
  if(nativeObject(lease)&&ref)leases.set(lease,immutable({root:ref,child:null,phase}));
  return lease;
 };
 const descendant=(parent,child,deadline)=>{
  const parentStore=leases.get(parent),currentStore=als.getStore(),store=currentStore?.root===parentStore?.root?currentStore:parentStore;
  if(!store||!nativeObject(child)){incomplete();return child;}
  const ref=collector.child(store.root,child,{deadline});
  if(ref)leases.set(child,immutable({...store,child:ref}));
  return child;
 };
 const run=(lease,invoke)=>{
  const store=leases.get(lease);if(!store&&als.getStore()?.excluded)return invoke();if(!store)incomplete();
  return als.run(store,()=>invoke());
 };
 const phase=(value,invoke)=>{
  const store=als.getStore();
  if(!store||!PHASES.has(value)){incomplete();return invoke();}
  return als.run(immutable({...store,phase:value}),()=>invoke());
 };
 const fixture=invoke=>als.run(immutable({excluded:true}),()=>invoke());
 const nativeHolder=(holder,resource,kind='holder')=>{
  if(holder==null)return holder;
  if(!nativeObject(holder)||!RESOURCES.has(resource)){incomplete();return holder;}
  const prior=nativeHolders.get(holder);if(prior&&(prior.resource!==resource||prior.kind!==kind))incomplete();else nativeHolders.set(holder,immutable({resource,kind}));
  return holder;
 };
 // Called only at source-proven original acquisitions, never by method-name inference.
 const capture=(holder,method,fn,resource)=>{
  if(!nativeObject(holder)||typeof fn!=='function'||!RESOURCES.has(resource)){incomplete();return fn;}
  let pairs=nativePairs.get(holder);if(!pairs){pairs=new WeakMap();nativePairs.set(holder,pairs);}
  const prior=pairs.get(fn);if(prior&&(prior.method!==method||prior.resource!==resource))incomplete();
  else if(!facades.has(fn)){const description=immutable({method,resource,kind:nativeHolders.get(holder)?.kind??'holder'});pairs.set(fn,description);nativeFunctions.set(fn,description);}
  return fn;
 };
 const facade=value=>{if(nativeObject(value))facades.add(value);else incomplete();return value;};
 const tagBody=(value,owner)=>{
  if(nativeObject(value)&&owner)bodies.set(value,owner);
  return value;
 };
 const request=(value,lease)=>tagBody(value,immutable({store:leases.get(lease),resource:'transport',fetch:null,origin:'inbound'}));
 const localResponse=(value)=>{
  const store=als.getStore();if(!store)incomplete();
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
   const chained=Reflect.apply(then,value,[v=>{try{fulfilled(v);}catch{incomplete();}},()=>{try{rejected();}catch{incomplete();}}]);
   const next=passiveThen(chained);if(next)Reflect.apply(next,chained,[undefined,()=>{}]);
  }catch{incomplete();}
 };
 function invoke(fn,receiver,args,meta,original=()=>Reflect.apply(fn,receiver,args)){
  const bodyOwner=bodies.get(receiver),currentStore=als.getStore();
  const localStore=bodyOwner&&!bodyOwner.fetch&&bodyOwner.origin!=='outbound'&&currentStore?.root===bodyOwner.store?.root&&!currentStore?.excluded?currentStore:null;
  const store=localStore??bodyOwner?.store??currentStore;
  if(meta.dormant){incomplete();return original();}
  if(meta.edge==='clone'){
   const result=original();if(bodyOwner)tagBody(result,bodyOwner);else incomplete();return result;
  }
  if(meta.edge==='reader'){
   const result=original();if(bodyOwner)tagBody(result,localStore?immutable({...bodyOwner,store:localStore}):bodyOwner);else incomplete();return result;
  }
  const pair=(nativeObject(receiver)?nativePairs.get(receiver)?.get(fn):null)??nativePairs.get(globalThis)?.get(fn)??nativeFunctions.get(fn);
  const resource=pair?.resource;
  if(meta.edge==='holder'||pair?.kind==='namespace'&&pair.method==='get'){
   const result=original();
   if(resource)nativeHolder(result,resource,pair?.kind==='namespace'?'stub':'holder');
   else if(!facades.has(fn)&&!store?.excluded)incomplete();
   return result;
  }
  if(facades.has(fn)||meta.excluded||store?.excluded)return original();
  const known=pair||bodyOwner;
  if(!known||!store?.root){incomplete();return original();}
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
 const methodPhase=(request,prefix)=>{const method=requestMethods.get(request);if(!['GET','POST'].includes(method)){incomplete();return null;}return prefix+'_'+method.toLowerCase();};
 const deadline=lease=>leaseClocks.get(lease);
 const clock=(lease,deadline)=>{if(nativeObject(lease))leaseClocks.set(lease,deadline);else incomplete();return lease;};
 const control=(lease,value,req,invoke)=>{
  if(!leases.has(lease))root(lease,value,leaseClocks.get(lease));
  request(req,lease);return run(lease,invoke);
 };
 const childCall=(parent,child,deadline,invoke)=>{if(!leases.has(parent)&&als.getStore()?.excluded)return invoke();descendant(parent,child,deadline);return run(child,invoke);};
 const childInvoke=(parent,deadline,fn,receiver,args)=>childCall(parent,args[0],deadline,()=>Reflect.apply(fn,receiver,args));
 const alias=(parent,child)=>{const store=leases.get(parent);if(store&&nativeObject(child))leases.set(child,store);else if(!als.getStore()?.excluded)incomplete();return child;};
 const transport=(req,path,invoke)=>{
  const value=path==='/oauth/token'?'token_exchange':path==='/mcp'?'mcp_read':null;
  if(!value){incomplete();return invoke();}
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
  else if(!als.getStore()?.excluded)incomplete();
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
  if(required&&!resource)incomplete();
  return resource;
 }
 const bind=fn=>{
  const method=fn.bind;
  return (...args)=>{
   const value=Reflect.apply(method,fn,args),description=nativeFunctions.get(fn);
   if(description&&typeof value==='function')nativeFunctions.set(value,description);
   return value;
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
 return immutable({collector,root,descendant,run,phase,fixture,nativeHolder,capture,facade,facadeHolder,readMethod,transactionArgument,methodValue,methodPhase,deadline,clock,control,childCall,childInvoke,alias,transport,request,localResponse,body,construct,bind,member,direct,reflect,call,snapshot:collector.snapshot});

}
