import assert from 'node:assert/strict';
import {types} from 'node:util';
import {budgetProofVocabulary as vocab,budgetReaderSiteCount} from './finite-budget-diagnostics.mjs';
import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,relative,dirname} from 'node:path';
export async function persistBudgetEvidence({path,full,testRevision,caseName,counts}){
 if(typeof path!=='string'||!/^output\/(?:finite-budget|owner-reference|owner-cleanup)\/[a-zA-Z0-9_./-]+\.json$/.test(path)||path.split('/').some(part=>part==='..'||part===''))throw Error('SYN evidence fixed path required');
 const target=resolve(path),root=resolve('output'),rel=relative(root,target);if(rel.startsWith('..')||rel===root)throw Error('SYN evidence path outside fixed output');
 if(!(testRevision===null||typeof testRevision==='string'&&/^[a-f0-9]{40}$/.test(testRevision))||typeof caseName!=='string'||!/^[a-zA-Z0-9_-]{1,96}$/.test(caseName))throw Error('SYN evidence provenance required');
 const bytes=Buffer.from(JSON.stringify(full,null,2),'utf8');await mkdir(dirname(target),{recursive:true});await writeFile(target,bytes);
 const sha256=createHash('sha256').update(bytes).digest('hex'),safeCounts={};
 for(const key of ['tests','pass','fail','nativeStarted','nativeSettled','nativeRejected','logicalDenied','cancelStarted','cancelSettled','roots','children'])if(Number.isSafeInteger(counts?.[key])&&counts[key]>=0)safeCounts[key]=counts[key];
 const summary=JSON.stringify({purpose:'afw.finite-budget-evidence.syn.v1',source:testRevision,caseName,status:'preserved',counts:safeCounts,path,bytes:bytes.length,sha256,operationalReadiness:false,completePackage:false,PCoff:false});
 if(Buffer.byteLength(summary,'utf8')>2048)throw Error('SYN bounded evidence summary exceeded');
 return {path,bytes:bytes.length,sha256,summary};
}

const metricKeys=['nativeBytesUnavailable','nativeStarted','nativeSettled','nativeRejected','logicalDenied','cancelStarted','cancelSettled','active','peak','nativeBytesRead','chunksRead','nativeDurationSumMs'];
const additive=metricKeys.filter(key=>key!=='peak');
const spanKeys=['beforeRetentionOmission','afterRetentionOmission'];
const rowKeys=['testRevision','workerRole','phase','resourceClass','operation','rootOrdinal','childOrdinal','opOrdinal','enteredEventOrdinal','settledEventOrdinal','fetchOpOrdinal','kind','rootDeadline','childDeadline','enteredAt','settledAt','status','nativeBytesRead','nativeBytesReason','chunksRead','readDurationMs','logicalAt','logicalReason','cancelStartedAt','cancelSettledAt'];
const scopeKey=r=>r.rootOrdinal+'|'+(r.childOrdinal??0);
const groupKey=r=>r.phase+'|'+r.resourceClass;
const count=n=>Number.isSafeInteger(n)&&n>=0;
const pos=n=>count(n)&&n>0;
const time=n=>typeof n==='number'&&Number.isFinite(n)&&n>=0;
const nullable=(n,p)=>n===null||p(n);
const valid=(ok,field)=>assert(ok,'invalid SYN '+field);
function shape(o,keys){
 valid(o&&typeof o==='object'&&!types.isProxy(o)&&[Object.prototype,null].includes(Object.getPrototypeOf(o)),'record');
 const ds=Object.getOwnPropertyDescriptors(o);
 valid(Reflect.ownKeys(ds).length===keys.length&&keys.every(k=>Object.hasOwn(ds,k)&&ds[k].enumerable&&Object.hasOwn(ds[k],'value')),'closed data fields');
}
function list(a,max){
 valid(Array.isArray(a)&&!types.isProxy(a)&&Object.getPrototypeOf(a)===Array.prototype&&a.length<=max,'bounded list');
 valid(Reflect.ownKeys(a).length===a.length+1,'dense list');
 for(let i=0;i<a.length;i++)valid(Object.hasOwn(Object.getOwnPropertyDescriptor(a,i)??{},'value'),'list data');
}
function numericMap(o,keys){shape(o,keys);for(const k of keys)valid(count(o[k]),'count');}
function sum(values){
 const present=values.filter(v=>v!==null);
 return present.length?present.reduce((a,b)=>a+b,0):null;
}
function equalMetric(a,b,key){
 if(key==='nativeDurationSumMs')valid(time(a)&&time(b)&&Math.abs(a-b)<=1e-8+1e-10*Math.max(a,b),'duration sum');
 else valid(a===b,'metric '+key);
}
function metric(m,identity){
 shape(m,[...identity,...metricKeys]);
 for(const k of metricKeys){
  const ok=k==='nativeDurationSumMs'?time(m[k]):['nativeBytesRead','chunksRead'].includes(k)?nullable(m[k],count):count(m[k]);
  valid(ok,'metric scalar');
 }
 valid(m.nativeSettled+m.active===m.nativeStarted&&m.nativeRejected<=m.nativeSettled&&m.peak>=m.active&&m.peak<=m.nativeStarted,'operation balance');
 valid(m.logicalDenied<=m.nativeStarted&&m.cancelStarted<=m.nativeStarted&&m.cancelSettled<=m.nativeStarted,'facet balance');
 valid(m.nativeBytesUnavailable<=m.nativeStarted&&(m.nativeBytesRead===null)===(m.chunksRead===null),'byte denominator');
 valid((m.nativeBytesRead===null)===(m.nativeBytesUnavailable===m.nativeStarted),'observed byte availability');
}
function scope(s){valid(pos(s.rootOrdinal)&&nullable(s.childOrdinal,pos),'scope identity');}
function retention(s){
 // Check the descriptor before the ordinal can participate in a comparison.
 valid(s.chronology&&typeof s.chronology==='object'&&!types.isProxy(s.chronology)&&Object.hasOwn(Object.getOwnPropertyDescriptor(s.chronology,'eventCalls')??{},'value')&&count(s.chronology.eventCalls),'chronology count data');
 const r=s.retention;shape(r,['purpose','operationRows','guardRows','scopeRows','firstOmission','traceComplete']);
 valid(r.purpose==='afw.finite-budget-retention.syn.v1','retention purpose');
 const stores=[[r.scopeRows,s.totals.scopes,'scope'],[r.operationRows,s.rows,'operation'],[r.guardRows,s.logicalScopeEvents,'guard']];
 const missing=[];
 for(const [b,items,kind] of stores){
  shape(b,['limit','retained','omitted','firstOmittedOrdinal']);valid(pos(b.limit)&&b.limit<=16384&&count(b.retained)&&count(b.omitted),'record capacity');
  list(items,b.limit);valid(items.length===b.retained&&(!b.omitted||b.retained===b.limit),'record admission');
  valid(b.omitted?pos(b.firstOmittedOrdinal)&&b.firstOmittedOrdinal<=s.chronology.eventCalls:b.firstOmittedOrdinal===null,'first omission ordinal');
  if(b.omitted)missing.push({kind,ordinal:b.firstOmittedOrdinal});
 }
 valid(r.traceComplete===!missing.length&&s.coverage.overflow===!!missing.length,'retention completeness');
 if(!missing.length)valid(r.firstOmission===null,'no omission');
 else{
  shape(r.firstOmission,['event','ordinal','kind']);missing.sort((a,b)=>a.ordinal-b.ordinal);
  const m=missing[0],f=r.firstOmission;
  valid(f.kind===m.kind&&f.ordinal===m.ordinal&&(f.kind==='scope'?['begin','scopeLogical'].includes(f.event):f.event===(f.kind==='operation'?'begin':'scopeLogical')),'first omitted record');
 }
}
function chronology(s){
 const c=s.chronology;shape(c,['purpose','eventCalls','byEvent','firstInvalid','invalid','unattributed','reasons','readerOrigins']);
 valid(c.purpose==='afw.finite-budget-chronology.syn.v2'&&count(c.eventCalls),'chronology');
 numericMap(c.byEvent,vocab.events);numericMap(c.reasons,vocab.invalidReasons);numericMap(c.invalid,spanKeys);numericMap(c.unattributed,spanKeys);
 valid(sum(Object.values(c.byEvent))===c.eventCalls&&sum(Object.values(c.reasons))===s.coverage.invalid,'event denominators');
 valid(sum(Object.values(c.invalid))===s.coverage.invalid&&sum(Object.values(c.unattributed))===s.coverage.unattributed,'invalid denominators');
 for(const k of spanKeys)valid(c.unattributed[k]<=c.invalid[k],'attribution');
 function witness(w){
  valid(count(w.ordinal)&&w.ordinal<=c.eventCalls&&spanKeys.includes(w.relation),'witness');
  const first=s.retention.firstOmission;
  valid(w.relation===(first&&w.ordinal>=first.ordinal?'afterRetentionOmission':'beforeRetentionOmission'),'witness relation');
 }
 if(s.coverage.invalid){shape(c.firstInvalid,['event','ordinal','reason','relation']);witness(c.firstInvalid);valid([...vocab.events,'constructor','snapshot'].includes(c.firstInvalid.event)&&vocab.invalidReasons.includes(c.firstInvalid.reason),'reason witness');}
 else valid(c.firstInvalid===null,'no invalid witness');
 const o=c.readerOrigins;shape(o,[...spanKeys,'firstReaderOrigin']);
 for(const k of spanKeys){
  list(o[k],budgetReaderSiteCount+1);valid(o[k].length===budgetReaderSiteCount+1&&o[k].every(count),'reader buckets');
 }
 const recorded=sum([...o[spanKeys[0]],...o[spanKeys[1]]]);
 valid(recorded<=c.reasons.readerOrigin,'reader reason denominator');
 if(recorded){const f=o.firstReaderOrigin;shape(f,['ordinal','relation','site','context']);witness(f);valid(count(f.site)&&f.site<=budgetReaderSiteCount&&o[f.relation][f.site]>0&&['no_store','excluded','rooted','unrooted'].includes(f.context),'reader origin');}
 else valid(o.firstReaderOrigin===null,'reader witness');
}
function blank(){return Object.fromEntries(metricKeys.map(k=>[k,['nativeBytesRead','chunksRead'].includes(k)?null:0]));}
function updateFromRow(m,r){
 m.nativeStarted++;m.nativeSettled+=r.status!=='pending';m.nativeRejected+=r.status==='rejected';
 m.logicalDenied+=r.logicalAt!==null;m.cancelStarted+=r.cancelStartedAt!==null;m.cancelSettled+=r.cancelSettledAt!==null;
 m.nativeDurationSumMs+=r.settledAt===null?0:r.settledAt-r.enteredAt;
 if(r.nativeBytesRead===null)m.nativeBytesUnavailable++;
 else{m.nativeBytesRead=(m.nativeBytesRead??0)+r.nativeBytesRead;m.chunksRead=(m.chunksRead??0)+r.chunksRead;}
}
function inspect(s){
 shape(s,['purpose','testRevision','workerRole','rows','logicalScopeEvents','totals','byPhaseResource','coverage','retention','chronology','operationalReadiness','completePackage','PCoff']);
 valid(s.purpose==='afw.finite-budget-diagnostics.syn.v1'&&typeof s.testRevision==='string'&&/^[a-f0-9]{40}$/.test(s.testRevision)&&['M','QA','fixture'].includes(s.workerRole),'source identity');
 for(const key of ['operationalReadiness','completePackage','PCoff'])valid(s[key]===false,'readiness');
 shape(s.coverage,['overflow','invalid','unattributed','nativeBytesUnavailable','numericOverflow','observedMetricsComplete']);
 for(const key of ['overflow','numericOverflow','observedMetricsComplete'])valid(typeof s.coverage[key]==='boolean','coverage flag');
 for(const key of ['invalid','unattributed','nativeBytesUnavailable'])valid(count(s.coverage[key]),'coverage count');
 // A snapshot with exhausted arithmetic cannot support numeric reconciliation.
 valid(!s.coverage.numericOverflow,'numeric overflow');
 metric(s.totals,['scopeGuardEvents','deniedScopes','observedWallMs','scopes']);
 valid(time(s.totals.observedWallMs)&&count(s.totals.scopeGuardEvents)&&count(s.totals.deniedScopes)&&s.totals.deniedScopes<=s.totals.scopeGuardEvents,'guard totals');
 retention(s);chronology(s);
 const complete=s.coverage.invalid===0&&s.coverage.unattributed===0&&s.retention.scopeRows.omitted===0;
 valid(s.coverage.observedMetricsComplete===complete,'observed completeness flag');
 assert(complete,'incomplete observed metrics');
 valid(s.coverage.nativeBytesUnavailable===s.totals.nativeBytesUnavailable,'global byte denominator');
 valid(s.chronology.byEvent.begin===s.totals.nativeStarted&&s.chronology.byEvent.scopeLogical===s.totals.scopeGuardEvents&&s.chronology.byEvent.settle>=s.totals.nativeSettled&&s.chronology.byEvent.incomplete===0,'observed event counts');
 list(s.byPhaseResource,vocab.phases.length*vocab.resources.length);
 const groups=new Map(),scopes=new Map(),replayGroups=new Map(),replayScopes=new Map(),childRoots=new Map(),observedScopes=new Set();
 for(const entry of s.byPhaseResource){
  metric(entry,['phase','resourceClass']);
  valid(vocab.phases.includes(entry.phase)&&vocab.resources.includes(entry.resourceClass)&&entry.nativeStarted>0,'phase/resource');
  const key=groupKey(entry);valid(!groups.has(key),'unique phase/resource');
  groups.set(key,entry);replayGroups.set(key,blank());
 }
 for(const entry of s.totals.scopes){
  metric(entry,['rootOrdinal','childOrdinal']);scope(entry);const key=scopeKey(entry);
  valid(!scopes.has(key),'unique scope');
  if(entry.childOrdinal!==null){valid(!childRoots.has(entry.childOrdinal),'unique child root');childRoots.set(entry.childOrdinal,entry.rootOrdinal);}
  scopes.set(key,entry);replayScopes.set(key,blank());
 }
 for(const entries of [s.byPhaseResource,s.totals.scopes])for(const k of additive){
  const combined=sum(entries.map(m=>m[k]));
  equalMetric(s.totals[k],combined??(['nativeBytesRead','chunksRead'].includes(k)?null:0),k);
 }
 for(const entries of [s.byPhaseResource,s.totals.scopes]){
  const peaks=entries.map(entry=>entry.peak),upper=sum(peaks)??0;
  valid(peaks.every(peak=>peak<=s.totals.peak)&&s.totals.peak<=upper,'partition peak bounds');
  for(const entry of entries)if(entry.nativeStarted===s.totals.nativeStarted)valid(entry.peak===s.totals.peak,'whole partition peak');
 }
 const all=blank(),transitions=[],ordinals=new Set(),rows=new Map(),guards=new Set();
 let priorEnter=0,firstAt=null,lastAt=null;
 const rootMetadata=new Map(),childMetadata=new Map();
 const stamp=n=>{valid(pos(n)&&n<=s.chronology.eventCalls&&!ordinals.has(n),'unique transition');ordinals.add(n);};
 for(const [index,r] of s.rows.entries()){
  shape(r,rowKeys);scope(r);observedScopes.add(scopeKey(r));valid(r.opOrdinal===index+1&&r.testRevision===s.testRevision&&r.workerRole===s.workerRole,'prefix provenance');
  valid(vocab.phases.includes(r.phase)&&vocab.resources.includes(r.resourceClass)&&vocab.operations.includes(r.operation),'row enums');
  valid((r.operation!=='rpc'||r.resourceClass==='DO')&&((r.operation==='limit')===(r.resourceClass==='rateLimiter')),'method resource');
  valid(['control','transport'].includes(r.kind)&&(r.kind==='control'?time(r.rootDeadline):nullable(r.rootDeadline,time))&&nullable(r.childDeadline,time)&&(r.childOrdinal===null?r.childDeadline===null:time(r.childDeadline)),'deadlines');
  const rootInfo=rootMetadata.get(r.rootOrdinal);
  if(rootInfo)valid(rootInfo.kind===r.kind&&rootInfo.deadline===r.rootDeadline,'root context');
  else rootMetadata.set(r.rootOrdinal,{kind:r.kind,deadline:r.rootDeadline});
  if(r.childOrdinal!==null){
   if(childMetadata.has(r.childOrdinal))valid(childMetadata.get(r.childOrdinal)===r.childDeadline,'child deadline');else childMetadata.set(r.childOrdinal,r.childDeadline);
  }
  valid(time(r.enteredAt)&&nullable(r.settledAt,time)&&['pending','fulfilled','rejected'].includes(r.status),'native timing');
  valid((r.status==='pending')===(r.settledAt===null)&&(r.status==='pending')===(r.settledEventOrdinal===null),'settlement');
  valid(r.enteredEventOrdinal>priorEnter&&(!s.retention.operationRows.omitted||r.enteredEventOrdinal<s.retention.operationRows.firstOmittedOrdinal),'entry order');stamp(r.enteredEventOrdinal);priorEnter=r.enteredEventOrdinal;
  if(r.status!=='pending'){valid(r.settledAt>=r.enteredAt&&r.settledEventOrdinal>r.enteredEventOrdinal,'terminal order');stamp(r.settledEventOrdinal);}
  valid(nullable(r.nativeBytesRead,count)&&nullable(r.chunksRead,count)&&time(r.readDurationMs)&&(r.nativeBytesRead===null)===(r.chunksRead===null),'row bytes');
  valid(r.nativeBytesRead===null?r.nativeBytesReason==='not_exposed_by_native_api':r.nativeBytesReason===null&&r.operation==='read','byte source');
  valid(nullable(r.logicalAt,time)&&(r.logicalAt===null?r.logicalReason===null:vocab.logicalReasons.includes(r.logicalReason)),'logical state');
  valid(nullable(r.cancelStartedAt,time)&&nullable(r.cancelSettledAt,time),'cancel state');
  valid(groups.has(groupKey(r))&&scopes.has(scopeKey(r)),'row scope and group');
  if(r.fetchOpOrdinal!==null){const parent=rows.get(r.fetchOpOrdinal);valid(parent?.operation==='fetch'&&['read','cancel'].includes(r.operation)&&groupKey(parent)===groupKey(r)&&scopeKey(parent)===scopeKey(r),'fetch parent');}
  rows.set(r.opOrdinal,r);
  const targets=[all,replayGroups.get(groupKey(r)),replayScopes.get(scopeKey(r))];
  for(const target of targets)updateFromRow(target,r);
  transitions.push([r.enteredEventOrdinal,1,targets]);if(r.settledEventOrdinal!==null)transitions.push([r.settledEventOrdinal,-1,targets]);
  firstAt=firstAt===null?r.enteredAt:Math.min(firstAt,r.enteredAt);lastAt=Math.max(lastAt??r.enteredAt,r.enteredAt,r.settledAt??0);
 }
 for(const [,delta,targets] of transitions.sort((a,b)=>a[0]-b[0]))for(const m of targets){m.active+=delta;m.peak=Math.max(m.peak,m.active);}
 for(const [index,r] of s.logicalScopeEvents.entries()){
  shape(r,['testRevision','workerRole','eventOrdinal','rootOrdinal','childOrdinal','phase','at','reason']);scope(r);
  valid(r.testRevision===s.testRevision&&r.workerRole===s.workerRole&&r.eventOrdinal===index+1&&time(r.at)&&vocab.phases.includes(r.phase)&&vocab.logicalReasons.includes(r.reason)&&scopes.has(scopeKey(r)),'guard prefix');
  observedScopes.add(scopeKey(r));guards.add(scopeKey(r)+'|'+r.phase);
 }
 valid(s.totals.nativeStarted===s.rows.length+s.retention.operationRows.omitted&&s.totals.scopeGuardEvents===s.logicalScopeEvents.length+s.retention.guardRows.omitted&&s.totals.deniedScopes>=guards.size,'admission accounting');
 for(const [actual,part] of [[s.totals,all],...[...groups].map(([k,v])=>[v,replayGroups.get(k)]),...[...scopes].map(([k,v])=>[v,replayScopes.get(k)])]){
  for(const k of metricKeys){
   if(!s.retention.operationRows.omitted)equalMetric(actual[k],part[k],k);
   else if(part[k]!==null)valid(actual[k]!==null&&(k==='nativeDurationSumMs'?part[k]<=actual[k]+1e-8+Math.abs(actual[k])*1e-10:part[k]<=actual[k]),'prefix metric subset');
  }
 }
 if(s.retention.traceComplete)valid(observedScopes.size===scopes.size,'complete scope witnesses');
 if(!s.retention.guardRows.omitted)valid(s.totals.deniedScopes===guards.size,'distinct denied scopes');
 if(!s.retention.operationRows.omitted)equalMetric(s.totals.observedWallMs,firstAt===null?0:lastAt-firstAt,'nativeDurationSumMs');
}
const proof=(s,level)=>({purpose:'afw.finite-budget-metrics-proof.syn.v1',level,traceComplete:s.retention.traceComplete,operationalReadiness:false,completePackage:false,PCoff:false});
export function verifyObservedBudgetMetrics(s){inspect(s);return proof(s,'observed_metrics');}
export function verifyCompleteBudgetTrace(s){inspect(s);assert(s.retention.traceComplete,'incomplete retained trace');return proof(s,'complete_trace');}

export function verifyPositiveBudgetEpochInventory(epochs){
 list(epochs,8);valid(epochs.length===8,'positive epoch inventory');
 const expected=new Set(['producer|0|M','producer|0|QA','producer|1|M','producer|1|QA','producer|2|M','producer|2|QA','consumer|0|M','consumer|0|QA']);
 for(const epoch of epochs){
  shape(epoch,['segment','epoch','role','reason','capturedAt','snapshot']);
  valid(typeof epoch.reason==='string'&&count(epoch.capturedAt),'positive epoch capture metadata');
  valid(['producer','consumer'].includes(epoch.segment)&&count(epoch.epoch)&&['M','QA'].includes(epoch.role),'positive epoch identity');
  valid(epoch.snapshot&&typeof epoch.snapshot==='object'&&!types.isProxy(epoch.snapshot)&&[Object.prototype,null].includes(Object.getPrototypeOf(epoch.snapshot)),'positive epoch snapshot');
  valid(expected.delete(epoch.segment+'|'+epoch.epoch+'|'+epoch.role),'positive epoch key');
 }
 valid(expected.size===0,'positive epoch completeness');
}
