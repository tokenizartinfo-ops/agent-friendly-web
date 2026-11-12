import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {Script,createContext} from 'node:vm';
import ts from 'typescript';

export const POST_ACK_PROFILE='r2-post-ack-v1';
const REPOSITORY='tokenizartinfo-ops/agent-friendly-web',REF='refs/heads/feat/finite-native-cleanup-20261101';
const PHASE='lib/mcp-qa-finite-owner-phase-context.mjs',PURPOSE='afw.native-post-ack-r2.safe.v1';
const HASH=/^[a-f0-9]{64}$/,SOURCE=/^[a-f0-9]{40}$/;
const FLAGS=['operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'];
const IDS=Object.freeze(['off_graphs','sdk_pins','profile_scope','sites_exact','sealer_graph','lexical_op','one_shot','nested_scope','late_scope','entry_check','notice_guard','protocol_guard','pair_wait','expected_mismatch','exit_check','unbranded','same_error','observer_throws','same_effects','pair_orders','no_rejection','overflow','schema','provenance']);
const BOUNDARIES=['entry_check','notice_guard','protocol_invariant','pair_wait','expected_mismatch','exit_check','unknown'];
const sha=b=>createHash('sha256').update(b).digest('hex');
const ordinary=(v,keys)=>{assert(v&&typeof v==='object'&&!Array.isArray(v));const ds=Object.getOwnPropertyDescriptors(v);assert.deepEqual(Reflect.ownKeys(ds).sort(),[...keys].sort());for(const k of keys)assert(Object.hasOwn(ds[k],'value')&&ds[k].enumerable);};
const ascii=v=>{assert.equal(typeof v,'string');assert(/^[\x20-\x7e]*$/.test(v));};
function identity(c){ordinary(c,['repository','ref','source','run','attempt','case']);assert.equal(c.repository,REPOSITORY);assert.equal(c.ref,REF);assert.equal(typeof c.source,'string');assert.equal(typeof c.run,'string');assert(SOURCE.test(c.source));assert(/^[1-9][0-9]*$/.test(c.run));assert.equal(c.attempt,1);assert.equal(c.case,'R2');for(const k of ['repository','ref','source','run','case'])ascii(c[k]);return {repository:c.repository,ref:c.ref,source:c.source,run:c.run,attempt:1,case:'R2'};}
function ast(source,path){const a=ts.createSourceFile(path,source,ts.ScriptTarget.ESNext,true,ts.ScriptKind.JS);assert.equal(a.parseDiagnostics.length,0,'post-ACK parse');return a;}
function apply(source,edits){let last=source.length+1;for(const e of edits.sort((a,b)=>b.start-a.start)){assert(e.start>=0&&e.end<=last&&e.start<=e.end,'nonoverlapping edits');source=source.slice(0,e.start)+e.text+source.slice(e.end);last=e.start;}return source;}
function collectorLiteral(current){return [
'const __paIdentity='+JSON.stringify(identity(current))+';',
'const __paCollector={initialized:true,invalid:false,overflow:false,pending:0,invoked:0,completed:0,records:[]};',
'function __paInvalid(){__paCollector.invalid=true;}',
'function __paBegin(token){try{const c={ordinal:++__paCollector.invoked,operation:token.operation,error:null,boundary:"unknown",outerError:null,done:false};token.ctx=c;__paCollector.pending++;if(c.ordinal>32){__paCollector.overflow=true;__paCollector.invalid=true;}return c;}catch{__paInvalid();return null;}}',
'function __paBrand(c,error,boundary){try{if(c){c.error=error;c.boundary=boundary;}}catch{__paInvalid();}}',
'function __paEmit(token,error,rejected){try{if(!token)return;const c=token.ctx;if(!c||c.done){__paInvalid();return;}c.done=true;__paCollector.completed++;if(c.ordinal>32)return;const sameError=!rejected||c.outerError===error;const boundary=rejected&&c.error===error?c.boundary:"unknown";if(!sameError)__paInvalid();__paCollector.records.push({invocationOrdinal:c.ordinal,operation:c.operation,ackReturned:true,postAckEntered:true,outcome:rejected?"rejected":"fulfilled",boundary,sameError});}catch{__paInvalid();}}',
'export function __afwPostAckSnapshot(){return {purpose:"afw.post-ack-capture.syn.v1",profile:"r2-post-ack-v1",identity:{...__paIdentity},initialized:__paCollector.initialized,completeCapture:!__paCollector.invalid&&!__paCollector.overflow&&__paCollector.pending===0&&__paCollector.completed===__paCollector.invoked,invalid:__paCollector.invalid,overflow:__paCollector.overflow,pending:__paCollector.pending,invoked:__paCollector.invoked,completed:__paCollector.completed,records:__paCollector.records.map(r=>({...r}))};}'
].join('\n');}
function phaseTransform(source,current){
 assert(!source.includes('__paCollector'),'no observer collision');const a=ast(source,PHASE),targets=[];
 const visit=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body?.getText(a).includes('requireEmptyNotice(expected)'))targets.push(n);ts.forEachChild(n,visit);};visit(a);assert.equal(targets.length,1,'exact issuer recheck');
 const target=targets[0],siblings=target.parent.statements;assert(siblings);
 const issuers=siblings.filter(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='issuerCall');assert.equal(issuers.length,1);const issuer=issuers[0];assert.deepEqual(issuer.parameters.map(p=>p.name.getText(a)),['op','window','call']);
 const edits=[],siteCounts={entry_check:0,notice_guard:0,protocol_invariant:0,pair_wait:0,expected_mismatch:0,exit_check:0,issuer_ack:0};
 const statements=[...target.body.statements],checks=statements.filter(n=>ts.isExpressionStatement(n)&&ts.isCallExpression(n.expression)&&n.expression.expression.getText(a)==='check');assert.equal(checks.length,2);
 const wrap=(node,boundary)=>{siteCounts[boundary]++;edits.push({start:node.getStart(a),end:node.end,text:'try{'+node.getText(a)+'}catch(__paError){__paBrand(__paCtx,__paError,"'+boundary+'");throw __paError;}'});};
 wrap(checks[0],'entry_check');wrap(checks[1],'exit_check');
 const notices=statements.filter(n=>ts.isExpressionStatement(n)&&n.expression.getText(a)==='requireEmptyNotice(expected)');assert.equal(notices.length,1);wrap(notices[0],'notice_guard');
 let pair=null;
 for(const n of statements){
  if(ts.isIfStatement(n)){
   assert(ts.isExpressionStatement(n.thenStatement)&&ts.isCallExpression(n.thenStatement.expression)&&n.thenStatement.expression.expression.getText(a)==='fail'&&!n.elseStatement,'original explicit invariant');
   const boundary=n.expression.getText(a).includes('canonical(pair.first)')?'expected_mismatch':'protocol_invariant';wrap(n.thenStatement,boundary);
  }
  if(ts.isVariableStatement(n)&&n.declarationList.declarations.some(d=>d.name.getText(a)==='pair')){assert(n.getText(a).includes('await wait(')&&n.getText(a).includes('observeOwnerPhasePair'));pair=n;}
 }
 assert(pair);siteCounts.pair_wait++;edits.push({start:pair.getStart(a),end:pair.end,text:'let pair;try{'+pair.getText(a).replace(/^const\s+pair\s*=/,'pair=')+'}catch(__paError){__paBrand(__paCtx,__paError,"pair_wait");throw __paError;}'});
 assert.equal(siteCounts.protocol_invariant,5);assert.equal(siteCounts.expected_mismatch,1);
 const start=target.body.getStart(a)+1,end=target.body.end-1;
 const local=edits.map(e=>({...e,start:e.start-start,end:e.end-start}));
 const body=apply(source.slice(start,end),local);
 const recheck='{const __paToken=__paSlot;__paSlot=null;const __paCtx=__paToken?__paBegin(__paToken):null;try{'+body+'}catch(__paError){if(__paCtx)__paCtx.outerError=__paError;throw __paError;}finally{if(__paCtx)__paCollector.pending--;}}';
 const calls=issuer.body.statements;let ackCall=-1;
 for(let i=0;i<calls.length;i++)if(calls[i].getText(a).replace(/\s+/g,'')==="awaitissuerAppend('Ack',ack,op);")ackCall=i;
 assert(ackCall>=0);assert.equal(calls[ackCall+1].getText(a).replace(/\s+/g,''),"position='issuer-ack';");const after=calls[ackCall+2];assert.equal(after.getText(a).replace(/\s+/g,''),'awaitrecheckOwned();');siteCounts.issuer_ack++;
 const observed='{const __paToken=op==="consume"||op==="grant"?{operation:op,ctx:null}:null;__paSlot=__paToken;let __paError,__paRejected=false;try{'+after.getText(a)+'}catch(__paCaught){__paRejected=true;__paError=__paCaught;throw __paCaught;}finally{if(__paSlot===__paToken)__paSlot=null;__paEmit(__paToken,__paError,__paRejected);}}';
 const transformed=apply(source,[{start:target.getStart(a),end:target.getStart(a),text:'let __paSlot=null;\n'},{start:target.body.getStart(a),end:target.body.end,text:recheck},{start:after.getStart(a),end:after.end,text:observed}]);
 return {source:collectorLiteral(current)+'\n'+transformed,sites:siteCounts};
}
export function transformPostAckEmission({role,modulePath,source,identity:current}){
 assert(['M','QA'].includes(role));assert.equal(typeof source,'string');identity(current);
 if(role==='M')return {source,record:null};
 if(![PHASE,'<stdin>'].includes(modulePath))return {source,record:null};
 let output,sites;
 if(modulePath===PHASE){const r=phaseTransform(source,current);output=r.source;sites=r.sites;}
 else{
  const a=ast(source,'post-ack-entry'),matches=[];const visit=n=>{if(ts.isMethodDeclaration(n)&&n.name?.getText(a)==='budgetSnapshot'&&ts.isClassDeclaration(n.parent)&&n.parent.name?.text==='Initial')matches.push(n);ts.forEachChild(n,visit);};visit(a);assert.equal(matches.length,1);
  const m=matches[0];assert.equal(m.body.statements.length,1);const r=m.body.statements[0];assert(ts.isReturnStatement(r)&&r.expression?.getText(a)==='__afwBudget.snapshot()');
  output='import {__afwPostAckSnapshot} from "./lib/mcp-qa-finite-owner-phase-context.mjs";\n'+apply(source,[{start:r.getStart(a),end:r.end,text:'return {...'+r.expression.getText(a)+',postAckDiagnostic:__afwPostAckSnapshot()};'}]);sites={budgetSnapshot:1};
 }
 ast(output,modulePath);const literalSha256=sha(modulePath===PHASE?collectorLiteral(current):'budgetSnapshot/postAckDiagnostic/v1');
 return {source:output,record:{purpose:'afw.post-ack-emission.syn.v1',version:1,profile:POST_ACK_PROFILE,path:modulePath,phase:'after-baseline',baselineBytes:Buffer.byteLength(source),baselineSha256:sha(source),emittedBytes:Buffer.byteLength(output),emittedSha256:sha(output),transformLiteralSha256:literalSha256,sites,fields:['invocationOrdinal','operation','ackReturned','postAckEntered','outcome','boundary','sameError'],enums:BOUNDARIES,businessAuthority:false,addsAwait:0,addsPromise:0,addsNativeCall:0,changesRetention:false}};
}
export function validatePostAckSupplement({records,baseline,identity:current,metafile}){
 identity(current);assert(Array.isArray(records)&&records.length===2);assert.deepEqual(records.map(r=>r.path).sort(),['<stdin>',PHASE].sort());
 assert(Array.isArray(baseline));for(const r of records){const b=baseline.find(x=>x.role==='QA'&&x.path===r.path);assert(b);assert.equal(r.purpose,'afw.post-ack-emission.syn.v1');assert.equal(r.profile,POST_ACK_PROFILE);assert.equal(r.phase,'after-baseline');assert.equal(r.baselineBytes,b.emittedBytes);assert.equal(r.baselineSha256,b.emittedSha256);assert(HASH.test(r.emittedSha256)&&HASH.test(r.transformLiteralSha256));assert(r.emittedBytes>r.baselineBytes);for(const k of ['addsAwait','addsPromise','addsNativeCall'])assert.equal(r[k],0);assert.equal(r.businessAuthority,false);assert.equal(r.changesRetention,false);}
 assert(!Object.keys(metafile?.inputs??{}).some(p=>/finite-post-ack-diagnostic|finite-budget-world|finite-budget-evidence|finite-budget-descriptors/.test(p)),'Node-only graph exclusion');
 assert.deepEqual(records.find(r=>r.path===PHASE).sites,{entry_check:1,notice_guard:1,protocol_invariant:5,pair_wait:1,expected_mismatch:1,exit_check:1,issuer_ack:1});
 assert.deepEqual(records.find(r=>r.path==='<stdin>').sites,{budgetSnapshot:1});
 return {purpose:'afw.post-ack-supplement.syn.v1',profile:POST_ACK_PROFILE,context:identity(current),records:structuredClone(records),nodeModuleAbsent:true,businessAuthority:false};
}
function observationProjection(v){return {purpose:v.purpose,status:v.status,context:identity(v.context),provenance:{status:v.provenance.status,sdkPackage:v.provenance.sdkPackage,sdkFileSha256:v.provenance.sdkFileSha256,lockSha256:v.provenance.lockSha256,mGraphSha256:v.provenance.mGraphSha256,qaGraphSha256:v.provenance.qaGraphSha256,transformSha256:v.provenance.transformSha256,preflightSha256:v.provenance.preflightSha256},selection:v.selection,invocationOrdinal:v.invocationOrdinal,operation:v.operation,ackReturned:v.ackReturned,postAckEntered:v.postAckEntered,outcome:v.outcome,boundary:v.boundary,quality:v.quality,originalR2Outcome:v.originalR2Outcome,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};}
function observationHash(v){return sha(JSON.stringify(observationProjection(v)));}
export function validatePostAckResult(v,expectedContext){
 ordinary(v,['purpose','status','context','provenance','selection','invocationOrdinal','operation','ackReturned','postAckEntered','outcome','boundary','quality','originalR2Outcome','custody',...FLAGS]);assert.equal(v.purpose,PURPOSE);identity(v.context);assert.deepEqual(v.context,identity(expectedContext));
 assert(['observed','not_observed','invalid','unavailable'].includes(v.status));assert(['passed','failed','unavailable'].includes(v.originalR2Outcome));
 ordinary(v.provenance,['status','sdkPackage','sdkFileSha256','lockSha256','mGraphSha256','qaGraphSha256','transformSha256','preflightSha256']);assert.equal(v.provenance.sdkPackage,'@cloudflare/workers-oauth-provider@1.2.1');assert(['verified','unavailable'].includes(v.provenance.status));
 for(const [k,value]of Object.entries(v.provenance))if(k.endsWith('Sha256'))assert(v.provenance.status==='verified'?typeof value==='string'&&HASH.test(value):value===null);
 assert(BOUNDARIES.includes(v.boundary));for(const flag of FLAGS)assert.equal(v[flag],false);
 if(v.status==='observed'){assert.equal(v.provenance.status,'verified');assert.equal(v.quality,'qualified');assert.equal(v.selection,'unique_qualified_rejection');assert(Number.isSafeInteger(v.invocationOrdinal)&&v.invocationOrdinal>=1&&v.invocationOrdinal<=32);assert(['consume','grant'].includes(v.operation));assert.equal(v.ackReturned,true);assert.equal(v.postAckEntered,true);assert.equal(v.outcome,'rejected');}
 else{assert.equal(v.invocationOrdinal,null);assert.equal(v.operation,'unknown');assert.equal(v.ackReturned,null);assert.equal(v.postAckEntered,null);assert.equal(v.outcome,'unknown');assert.equal(v.boundary,'unknown');assert.equal(v.selection,'none');assert.equal(v.quality,v.status==='not_observed'?'qualified':v.status==='invalid'?'invalid':'incomplete');if(v.status==='not_observed')assert.equal(v.provenance.status,'verified');}
 ordinary(v.custody,['status','artifactId','zipSha256','observationSha256','reopenVerified']);assert(['verified','unavailable'].includes(v.custody.status));
 if(v.custody.status==='verified'){assert.equal(typeof v.custody.artifactId,'string');assert(/^[1-9][0-9]*$/.test(v.custody.artifactId));assert.equal(typeof v.custody.zipSha256,'string');assert(HASH.test(v.custody.zipSha256));assert.equal(v.custody.observationSha256,observationHash(v));assert.equal(v.custody.reopenVerified,true);assert.equal(v.provenance.status,'verified');assert.notEqual(v.originalR2Outcome,'unavailable');}
 else{for(const k of ['artifactId','zipSha256','observationSha256'])assert.equal(v.custody[k],null);assert.equal(v.custody.reopenVerified,false);}
 if(v.originalR2Outcome==='unavailable'){assert.equal(v.status,'unavailable');assert.equal(v.quality,'incomplete');assert.equal(v.custody.status,'unavailable');}
 const walk=x=>{if(typeof x==='string')ascii(x);else if(x&&typeof x==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(x))){assert(Object.hasOwn(d,'value'));walk(d.value);}};walk(v);return v;
}
const unavailableCustody=()=>({status:'unavailable',artifactId:null,zipSha256:null,observationSha256:null,reopenVerified:false});
function provenance(p,current){
 if(!p||p.status!=='verified')return {status:'unavailable',sdkPackage:'@cloudflare/workers-oauth-provider@1.2.1',sdkFileSha256:null,lockSha256:null,mGraphSha256:null,qaGraphSha256:null,transformSha256:null,preflightSha256:null};
 identity(current);assert.deepEqual(p.context,current);assert.equal(p.stage,'actual_configured');assert.equal(p.profile,POST_ACK_PROFILE);assert.equal(p.allocationIdentity,p.ownedAllocationIdentity);assert(Number.isSafeInteger(p.allocationIdentity)&&p.allocationIdentity>0);assert.equal(p.lifecycleComplete,true);assert.equal(p.successfulMount,true);assert.equal(p.actualOptionsVerified,true);assert.equal(p.modelOnly,false);assert.equal(p.sdkFileSha256,'bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80');assert.equal(p.sdkBytes,251149);assert.equal(p.sdkSites,44);assert.equal(p.lockBlob,'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b');assert.equal(p.emissions,2);
 const q={status:'verified',sdkPackage:'@cloudflare/workers-oauth-provider@1.2.1'};for(const k of ['sdkFileSha256','lockSha256','mGraphSha256','qaGraphSha256','transformSha256','preflightSha256']){assert(HASH.test(p[k]));q[k]=p[k];}return q;
}
export function selectPostAckCertificate({snapshots,mountedProvenance,originalR2Outcome,context}){
 context=identity(context);assert(['passed','failed','unavailable'].includes(originalR2Outcome));let p,status='unavailable',quality='incomplete',selected=null;
 try{
  p=provenance(mountedProvenance,context);
  if(originalR2Outcome!=='unavailable'&&p.status==='verified'){
   assert(Array.isArray(snapshots));const owned=snapshots.filter(x=>x.role==='QA'&&x.reason==='terminal-owned-before-dispose'&&x.allocationIdentity===mountedProvenance.allocationIdentity);assert.equal(owned.length,1,'one current terminal snapshot');
   const s=owned[0].snapshot;ordinary(s,['purpose','profile','identity','initialized','completeCapture','invalid','overflow','pending','invoked','completed','records']);assert.equal(s.purpose,'afw.post-ack-capture.syn.v1');assert.equal(s.profile,POST_ACK_PROFILE);assert.deepEqual(s.identity,context);assert.equal(s.initialized,true);
   assert.equal(s.completeCapture,true);assert.equal(s.invalid,false);assert.equal(s.overflow,false);assert.equal(s.pending,0);assert(Number.isSafeInteger(s.invoked)&&s.invoked>=0&&s.invoked<=32);assert.equal(s.completed,s.invoked);assert.equal(s.records.length,s.invoked);
   const seen=new Set();for(const r of s.records){ordinary(r,['invocationOrdinal','operation','ackReturned','postAckEntered','outcome','boundary','sameError']);assert(Number.isSafeInteger(r.invocationOrdinal)&&r.invocationOrdinal>=1&&r.invocationOrdinal<=32&&!seen.has(r.invocationOrdinal));seen.add(r.invocationOrdinal);assert(['consume','grant'].includes(r.operation));assert.equal(r.ackReturned,true);assert.equal(r.postAckEntered,true);assert.equal(r.sameError,true);assert(['fulfilled','rejected'].includes(r.outcome));assert(BOUNDARIES.includes(r.boundary));}
   assert.deepEqual([...seen].sort((a,b)=>a-b),Array.from({length:s.invoked},(_,i)=>i+1));
   const rejects=s.records.filter(r=>r.outcome==='rejected');assert(rejects.length<=1);selected=rejects[0]??null;status=selected?'observed':'not_observed';quality='qualified';
  }
 }catch{status=originalR2Outcome==='unavailable'?'unavailable':'invalid';quality=status==='invalid'?'invalid':'incomplete';selected=null;}
 p??=provenance(null,context);const result={purpose:PURPOSE,status,context,provenance:p,selection:selected?'unique_qualified_rejection':'none',invocationOrdinal:selected?.invocationOrdinal??null,operation:selected?.operation??'unknown',ackReturned:selected?true:null,postAckEntered:selected?true:null,outcome:selected?'rejected':'unknown',boundary:selected?.boundary??'unknown',quality,originalR2Outcome,custody:unavailableCustody(),...Object.fromEntries(FLAGS.map(k=>[k,false]))};
 return validatePostAckResult(result,context);
}

const VM_SETUP="\n let __paSlot=null,position='baseline',operation=null,actualPromise=null,actualResult=null,settled=false,childCalls=0,postChecks=0,nestedDone=false;\n const sdkOperations=[],expected={records:{issuer:{reservation:{identity:{identityHash:'SYN'},recordHash:'SYN'},operations:Object.fromEntries(['grant','consume','authorization','open_fence'].map(k=>[k,{send:null,ack:null}]))}},issuerRows:{}},ctx={},env={},originalLease={},id='SYN';\n function fail(){throw primary;}\n function check(){effects.push('check');if(position==='issuer-ack'){postChecks++;if(settings.mode==='entry_check'&&postChecks===1||settings.mode==='exit_check'&&postChecks===2)throw primary;}}\n function requireEmptyNotice(){effects.push('notice');if(position==='issuer-ack'&&settings.mode==='notice_guard')throw primary;}\n function canonical(v){effects.push('canonical');if(position==='issuer-ack'&&settings.mode==='unbranded')throw primary;return JSON.stringify(v);}\n function readSdk(){return null;}\n async function wait(p){effects.push('wait');if(position==='issuer-ack'&&settings.mode==='pair_abort')throw primary;return await p;}\n async function observeOwnerPhasePair(){\n  effects.push('pair');\n  if(position==='issuer-ack'&&settings.mode==='pair_wait')throw primary;\n  if(position==='issuer-ack'&&settings.mode==='nested_scope'&&!nestedDone){nestedDone=true;await recheckOwned();}\n  if(position==='issuer-ack'&&settings.mode==='late_scope'&&!nestedDone){nestedDone=true;queueMicrotask(()=>recheckOwned().catch(()=>{}));}\n  return settings.mode==='expected_mismatch'&&position==='issuer-ack'?{first:{SYN:true},second:expected}:{first:expected,second:expected};\n }\n function retain(p){effects.push('retain');return p;}\n function issuerSeal(kind,v){effects.push('seal:'+kind);return {...v,recordHash:'SYN'};}\n function digest(){return 'SYN';}\n async function issuerAppend(kind,record,op){effects.push('append:'+kind);expected.records.issuer.operations[op][kind.toLowerCase()]=record;if(kind==='Ack'&&settings.mode==='protocol_guard')settled=false;}\n";
const VM_TAIL="\n globalThis.control=(async()=>{let caught=null,returned=[];try{for(const op of settings.operations) {postChecks=0;expected.records.issuer.operations[op]={send:null,ack:null};returned.push(await issuerCall(op,{deadline:123},()=>op==='consume'?{id:'SYN'}:{status:'applied',row:{id:'SYN'}}));}}catch(e){caught=e;}await Promise.resolve();return {caught,returned,snapshot:__afwPostAckSnapshot(),effects,slotEmpty:__paSlot===null};})();\n";

const syntheticContext=()=>({repository:REPOSITORY,ref:REF,source:'0'.repeat(40),run:'1',attempt:1,case:'R2'});
const syntheticProvenance=c=>({status:'verified',context:c,stage:'actual_configured',profile:POST_ACK_PROFILE,allocationIdentity:1,ownedAllocationIdentity:1,lifecycleComplete:true,successfulMount:true,actualOptionsVerified:true,modelOnly:false,sdkFileSha256:'bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80',sdkBytes:251149,sdkSites:44,lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',lockSha256:'0'.repeat(64),mGraphSha256:'0'.repeat(64),qaGraphSha256:'0'.repeat(64),transformSha256:'0'.repeat(64),preflightSha256:'0'.repeat(64),emissions:2});
function selectSynthetic(snapshot,options={}){const context=syntheticContext();return selectPostAckCertificate({snapshots:[{role:'QA',reason:'terminal-owned-before-dispose',allocationIdentity:1,snapshot}],mountedProvenance:syntheticProvenance(context),originalR2Outcome:'failed',context,...options});}
let cachedControlInputs;
async function controlInputs(){
 if(cachedControlInputs)return cachedControlInputs;
 assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
 const source=await readFile(PHASE,'utf8'),transformed=transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:syntheticContext()}),a=ast(transformed.source,PHASE),functions=[];
 const visit=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='issuerCall')functions.push(n);ts.forEachChild(n,visit);};visit(a);assert.equal(functions.length,1);
 const issuer=functions[0],parent=issuer.parent.statements,recheck=parent.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body.getText(a).includes('__paToken'));assert(recheck);
 const prelude=a.statements.filter(n=>ts.isVariableStatement(n)&&n.declarationList.declarations.some(d=>['__paIdentity','__paCollector'].includes(d.name.getText(a)))||ts.isFunctionDeclaration(n)&&['__paInvalid','__paBegin','__paBrand','__paEmit','__afwPostAckSnapshot'].includes(n.name?.text)).map(n=>n.getText(a).replace(/^export /,'')).join('\n');
 const preflight=JSON.parse(await readFile('output/finite-budget/post-ack-private/preflight.json','utf8'));
 const rawAst=ast(source,PHASE),rawFunctions=[];const rawVisit=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='issuerCall')rawFunctions.push(n);ts.forEachChild(n,rawVisit);};rawVisit(rawAst);assert.equal(rawFunctions.length,1);const rawIssuer=rawFunctions[0],rawRecheck=rawIssuer.parent.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body.getText(rawAst).includes('requireEmptyNotice(expected)'));assert(rawRecheck);
 cachedControlInputs={source,transformed,prelude,recheck:recheck.getText(a),issuer:issuer.getText(a),originalRecheck:rawRecheck.getText(rawAst),originalIssuer:rawIssuer.getText(rawAst),preflight};return cachedControlInputs;
}
async function simulate(mode='ok',operations=['grant'],original=false){
 const {prelude,recheck,issuer,originalRecheck,originalIssuer}=await controlInputs(),primary=Error('SYN original local object'),effects=[],settings={mode,operations},context=createContext({settings,primary,effects,structuredClone,Promise,Error,JSON,Map,Set,queueMicrotask,Miniflare:class{constructor(){throw Error('allocation forbidden');}},createI0(){throw Error('I0 forbidden');}});
 const program=prelude+VM_SETUP+(original?originalRecheck:recheck)+'\n'+(original?originalIssuer:issuer)+VM_TAIL;
 if(mode==='observer_throws')context.settings.mode='expected_mismatch';
 let code=program;if(mode==='observer_throws')code=code.replace('__paCollector.records.push({invocationOrdinal:','(()=>{throw Error("SYN observer");})();__paCollector.records.push({invocationOrdinal:');
 new Script(code).runInContext(context,{timeout:1000});const value=await context.control;
 return {caughtSame:value.caught===primary,caught:value.caught,returned:JSON.parse(JSON.stringify(value.returned)),snapshot:JSON.parse(JSON.stringify(value.snapshot)),effects:[...effects],slotEmpty:value.slotEmpty};
}
const tokens=new WeakMap();let activeControl=null;
function complete(id){assert.equal(activeControl,id);const token=Object.freeze({});tokens.set(token,id);return token;}
function completionBarrier(rows){assert.deepEqual(rows.map(r=>r.id),IDS);const seen=new Set();for(const r of rows){assert(!seen.has(r.id)&&tokens.get(r.token)===r.id,'authentic exactly-once completion');seen.add(r.id);}assert.equal(seen.size,24);}

const REGISTRY=Object.freeze([
 ['off_graphs',async()=>{const {preflight:p}=await controlInputs();assert.equal(p.stage,'MODEL ONLY');assert.equal(p.offGraphs.length,2);for(const r of p.offGraphs){assert(r.equal&&r.sameCapturedInputs&&r.sameDefines);assert.equal(r.baselineSha256,r.candidateSha256);assert.equal(r.baselineBytes,r.candidateBytes);}assert.equal(p.offGraphs.find(r=>r.role==='QA').originalAdditionalSYN,3);assert.equal(p.mfAllocated,false);assert.equal(p.I0Created,false);return complete('off_graphs');}],
 ['sdk_pins',async()=>{const {preflight:p}=await controlInputs();const sdk=await readFile('node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js');assert.equal(sdk.length,251149);assert.equal(sha(sdk),p.sdkFileSha256);assert.equal(p.sdkSites,44);assert.equal(p.lockBlob,'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b');const f7=await readFile('.github/workflows/afw-finite-budget-qualification.yml');assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+f7.length+'\0'),f7])).digest('hex'),'f7a71f1a0fa4f5ddf069ff411f008a098455e5cc');return complete('sdk_pins');}],
 ['profile_scope',async()=>{const {source}=await controlInputs();assert.deepEqual(transformPostAckEmission({role:'M',modulePath:PHASE,source,identity:syntheticContext()}),{source,record:null});assert.throws(()=>transformPostAckEmission({role:'other',modulePath:PHASE,source,identity:syntheticContext()}));assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:{...syntheticContext(),attempt:2}}));return complete('profile_scope');}],
 ['sites_exact',async()=>{const {source,transformed}=await controlInputs();assert.equal(transformed.record.sites.protocol_invariant,5);assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source:source.replace('requireEmptyNotice(expected);','requireEmptyNotice(expected);requireEmptyNotice(expected);'),identity:syntheticContext()}));assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source:source.replace("await issuerAppend('Ack',ack,op);",""),identity:syntheticContext()}));return complete('sites_exact');}],
 ['sealer_graph',async()=>{const {preflight:p}=await controlInputs();const records=p.supplement.records,baseline=records.map(r=>({role:'QA',path:r.path,emittedBytes:r.baselineBytes,emittedSha256:r.baselineSha256})),args={records,baseline,identity:p.context,metafile:{inputs:{}}};validatePostAckSupplement(args);assert.throws(()=>validatePostAckSupplement({...args,records:records.slice(1)}));assert.throws(()=>validatePostAckSupplement({...args,records:[...records,records[0]]}));assert.throws(()=>validatePostAckSupplement({...args,baseline:baseline.map((r,i)=>i? r:{...r,emittedSha256:'f'.repeat(64)})}));assert.throws(()=>validatePostAckSupplement({...args,metafile:{inputs:{'test/fixtures/finite-post-ack-diagnostic.mjs':{}}}}));return complete('sealer_graph');}],
 ['lexical_op',async()=>{const s=await simulate('expected_mismatch',['consume']);assert(s.caughtSame);assert.equal(s.snapshot.records[0].operation,'consume');const other=await simulate('expected_mismatch',['authorization']);assert.equal(other.snapshot.records.length,0);return complete('lexical_op');}],
 ['one_shot',async()=>{const s=await simulate('ok',['consume','grant']);assert(s.slotEmpty);assert.equal(s.snapshot.invoked,2);assert.deepEqual(s.snapshot.records.map(r=>r.operation),['consume','grant']);assert.equal(s.snapshot.pending,0);return complete('one_shot');}],
 ['nested_scope',async()=>{const s=await simulate('nested_scope');assert.equal(s.caught,null);assert.equal(s.snapshot.invoked,1);assert.equal(s.snapshot.completed,1);assert.equal(s.snapshot.pending,0);return complete('nested_scope');}],
 ['late_scope',async()=>{const s=await simulate('late_scope');assert.equal(s.caught,null);assert.equal(s.snapshot.invoked,1);assert(s.slotEmpty);return complete('late_scope');}],
 ['entry_check',async()=>{const s=await simulate('entry_check');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'entry_check');return complete('entry_check');}],
 ['notice_guard',async()=>{const s=await simulate('notice_guard');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'notice_guard');return complete('notice_guard');}],
 ['protocol_guard',async()=>{const s=await simulate('protocol_guard');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'protocol_invariant');return complete('protocol_guard');}],
 ['pair_wait',async()=>{const s=await simulate('pair_wait');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'pair_wait');return complete('pair_wait');}],
 ['expected_mismatch',async()=>{const s=await simulate('expected_mismatch');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'expected_mismatch');assert.equal(selectSynthetic(s.snapshot).status,'observed');return complete('expected_mismatch');}],
 ['exit_check',async()=>{const s=await simulate('exit_check');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'exit_check');return complete('exit_check');}],
 ['unbranded',async()=>{const s=await simulate('unbranded');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'unknown');return complete('unbranded');}],
 ['same_error',async()=>{for(const mode of ['entry_check','notice_guard','protocol_guard','pair_wait','expected_mismatch','exit_check','unbranded']){const s=await simulate(mode);assert(s.caughtSame);assert.equal(s.snapshot.records[0].sameError,true);}return complete('same_error');}],
 ['observer_throws',async()=>{const s=await simulate('observer_throws');assert(s.caughtSame);assert.equal(s.snapshot.invalid,true);assert.equal(selectSynthetic(s.snapshot).status,'invalid');return complete('observer_throws');}],
 ['same_effects',async()=>{for(const mode of ['ok','entry_check','notice_guard','protocol_guard','pair_wait','expected_mismatch','exit_check','unbranded']){const observed=await simulate(mode),original=await simulate(mode,['grant'],true);assert.deepEqual(observed.effects,original.effects);assert.equal(observed.caughtSame,original.caughtSame);assert.deepEqual(observed.returned,original.returned);}const s=await simulate('ok');assert.equal(s.caught,null);assert.deepEqual(s.returned,[{id:'SYN'}]);assert.equal(s.effects.filter(x=>x==='retain').length,1);assert.equal(s.effects.filter(x=>x==='append:Ack').length,1);assert.equal(s.effects.filter(x=>x==='append:Send').length,1);const {source}=await controlInputs(),emission=transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:syntheticContext()}).source;const count=(text,pattern)=>(text.match(pattern)??[]).length;assert.equal(count(emission,/\bawait\b/g),count(source,/\bawait\b/g));assert.equal(count(emission,/Promise\./g),count(source,/Promise\./g));return complete('same_effects');}],
 ['pair_orders',async()=>{for(const mode of ['pair_wait','pair_abort']){const s=await simulate(mode);assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'pair_wait');}return complete('pair_orders');}],
 ['no_rejection',async()=>{const s=await simulate();assert.equal(selectSynthetic(s.snapshot).status,'not_observed');const foreign=structuredClone(s.snapshot);foreign.identity.run='2';assert.equal(selectSynthetic(foreign).status,'invalid');const unavailable=selectPostAckCertificate({snapshots:[],mountedProvenance:null,originalR2Outcome:'unavailable',context:syntheticContext()});assert.equal(unavailable.status,'unavailable');assert.equal(unavailable.custody.status,'unavailable');assert.throws(()=>completionBarrier([]));assert.throws(()=>completionBarrier(IDS.map(id=>({id,token:{}}))));assert.throws(()=>completionBarrier(IDS.slice(1).map(id=>({id,token:null}))));return complete('no_rejection');}],
 ['overflow',async()=>{const s=await simulate('ok',Array.from({length:33},()=> 'grant'));assert.equal(s.snapshot.overflow,true);assert.equal(selectSynthetic(s.snapshot).status,'invalid');const r=await simulate('expected_mismatch');const bad=structuredClone(r.snapshot);bad.records.push({...bad.records[0],invocationOrdinal:2});bad.invoked=2;bad.completed=2;assert.equal(selectSynthetic(bad).status,'invalid');return complete('overflow');}],
 ['schema',async()=>{const c=syntheticContext(),v={purpose:PURPOSE,status:'observed',context:c,provenance:{status:'verified',sdkPackage:'@cloudflare/workers-oauth-provider@1.2.1',sdkFileSha256:'0'.repeat(64),lockSha256:'0'.repeat(64),mGraphSha256:'0'.repeat(64),qaGraphSha256:'0'.repeat(64),transformSha256:'0'.repeat(64),preflightSha256:'0'.repeat(64)},selection:'unique_qualified_rejection',invocationOrdinal:1,operation:'grant',ackReturned:true,postAckEntered:true,outcome:'rejected',boundary:'expected_mismatch',quality:'qualified',originalR2Outcome:'failed',custody:unavailableCustody(),...Object.fromEntries(FLAGS.map(k=>[k,false]))};validatePostAckResult(v,c);const bytes=JSON.stringify(observationProjection(v));assert.equal(Buffer.byteLength(bytes),1221);assert.equal(sha(bytes),'47a77ac116e8d5514defb5fa615de87bf01e16968d30254a8754f389be59a005');assert.equal(observationHash(Object.fromEntries(Object.entries(v).reverse())),sha(bytes));for(const key of FLAGS)assert.throws(()=>validatePostAckResult({...v,[key]:true},c));assert.throws(()=>validatePostAckResult({...v,extra:true},c));assert.notEqual(observationHash({...v,originalR2Outcome:'passed'}),sha(bytes));assert.notEqual(observationHash({...v,context:{...c,run:'2'}}),sha(bytes));assert.notEqual(observationHash({...v,provenance:{...v.provenance,preflightSha256:'f'.repeat(64)}}),sha(bytes));return complete('schema');}],
 ['provenance',async()=>{const s=await simulate('expected_mismatch'),c=syntheticContext(),p=syntheticProvenance(c);for(const edit of [{stage:'MODEL ONLY'},{modelOnly:true},{actualOptionsVerified:false},{lifecycleComplete:false},{successfulMount:false},{ownedAllocationIdentity:2},{emissions:1},{sdkSites:43},{sdkFileSha256:'f'.repeat(64)},{context:{...c,run:'2'}},{context:{...c,source:'f'.repeat(40)}}])assert.equal(selectSynthetic(s.snapshot,{mountedProvenance:{...p,...edit}}).status,'invalid');const pass=selectSynthetic(s.snapshot,{originalR2Outcome:'passed'});assert.equal(pass.originalR2Outcome,'passed');assert.equal(pass.custody.status,'unavailable');assert.throws(()=>validatePostAckResult({...pass,custody:{status:'verified',artifactId:'1',zipSha256:'0'.repeat(64),observationSha256:'f'.repeat(64),reopenVerified:true}},c));return complete('provenance');}]
]);
export async function runPostAckObserverControls(){
 assert.deepEqual(REGISTRY.map(([id])=>id),IDS);assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
 const rows=[];let failed=null;
 for(const [id,callback]of REGISTRY){assert.equal(activeControl,null);activeControl=id;try{const token=await callback();assert.equal(tokens.get(token),id,'callback-owned post-final-assertion completion');rows.push({id,token});}catch{failed=id;throw Error('post_ack_control_failed:'+id);}finally{activeControl=null;}}
 completionBarrier(rows);const result={purpose:'AFW_POST_ACK_CONTROLS/1',expected:24,completed:24,pass:24,fail:0,inventory:[...IDS],firstFailure:failed,postAssertionExactlyOnce:true,...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};assert(Buffer.byteLength(JSON.stringify(result))<=2048);return result;
}

const PROGRAM_PATHS=["test/fixtures/finite-budget-world.mjs","test/fixtures/finite-post-ack-diagnostic.mjs","test/finite-post-ack-diagnostic.test.mjs",".github/workflows/afw-r2-post-ack-contracts.yml",".github/workflows/afw-r2-post-ack-diagnostic.yml",".github/workflows/afw-finite-budget-qualification.yml","package-lock.json","lib/mcp-qa-finite-owner-phase-context.mjs","test/fixtures/finite-initial-entry-world.mjs","test/fixtures/finite-checkpoint-custody.mjs"];

function executionContext(){return identity({repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:Number(process.env.GITHUB_RUN_ATTEMPT),case:'R2'});}
async function currentPrograms(){const files=[];for(const path of PROGRAM_PATHS){const b=await readFile(path);files.push({path,bytes:b.length,sha256:sha(b)});}return files;}
async function writeProof(result){
 const context=executionContext(),root='output/finite-budget/post-ack-safe';await mkdir(root,{recursive:true});const bytes=Buffer.from(JSON.stringify(result));assert(bytes.length<=60000);await writeFile(root+'/result.json',bytes);
 const manifest={purpose:'afw.native-post-ack-r2-manifest.safe.v1',context,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]};const m=Buffer.from(JSON.stringify(manifest));assert(m.length+bytes.length<=65536);await writeFile(root+'/manifest.json',m);
}
async function contractsProof(){
 assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const context=executionContext(),controls=JSON.parse(await readFile('output/finite-budget/post-ack-private/controls.json')),p=JSON.parse(await readFile('output/finite-budget/post-ack-private/preflight.json'));
 assert.equal(controls.pass,24);assert.deepEqual(controls.inventory,IDS);assert.deepEqual(p.context,context);
 const related=JSON.parse(await readFile('output/finite-budget/pure/controls.json'));assert.equal(related.passed,true);assert.deepEqual(related.groups.map(g=>g.group),['F1','F2','F3','F4','F5','F6','F7','F8']);
 await writeProof({purpose:'afw.post-ack-contracts.safe.v1',context,controls,programs:await currentPrograms(),preflight:{purpose:p.purpose,profile:p.profile,stage:p.stage,offGraphs:p.offGraphs,supplement:p.supplement,sdkFileSha256:p.sdkFileSha256,sdkBytes:p.sdkBytes,sdkSites:p.sdkSites,lockBlob:p.lockBlob,lockSha256:p.lockSha256,worldSha256:p.worldSha256,transformSha256:p.transformSha256,preflightSha256:sha(await readFile('output/finite-budget/post-ack-private/preflight.json'))},related:{purpose:related.purpose,groups:related.groups.map(g=>({group:g.group,passed:g.passed,evidence:g.evidence,caseCount:g.caseCount})),passed:true},...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false});
}
async function verifyProof(native){
 assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const root=process.env.RUNNER_TEMP+'/afw-post-ack-proof',raw=await readFile(root+'/result.json'),mraw=await readFile(root+'/manifest.json'),m=JSON.parse(mraw),context=executionContext();
 ordinary(m,['purpose','context','files']);assert.equal(m.purpose,'afw.native-post-ack-r2-manifest.safe.v1');assert.deepEqual(m.context,context);assert.equal(m.files.length,1);ordinary(m.files[0],['path','bytes','sha256']);assert.equal(m.files[0].path,'result.json');assert.equal(m.files[0].bytes,raw.length);assert.equal(m.files[0].sha256,sha(raw));assert(raw.length+mraw.length<=65536);const r=JSON.parse(raw);
 if(native){validatePostAckResult(r,context);assert.equal(r.custody.status,'verified');assert.equal(r.provenance.status,'verified');assert(['observed','not_observed'].includes(r.status));const metadata=await artifactMetadata(r.custody.artifactId);assert.equal(metadata.digest,'sha256:'+r.custody.zipSha256);assert.equal(r.custody.observationSha256,observationHash(r));}
 else{
  ordinary(r,['purpose','context','controls','programs','preflight','related',...FLAGS,'nativeExecuted','mfAllocated','I0Created']);assert.equal(r.purpose,'afw.post-ack-contracts.safe.v1');assert.deepEqual(r.context,context);assert.deepEqual(r.programs,await currentPrograms());assert.equal(r.controls.purpose,'AFW_POST_ACK_CONTROLS/1');assert.deepEqual(r.controls.inventory,IDS);assert.equal(r.controls.expected,24);assert.equal(r.controls.completed,24);assert.equal(r.controls.pass,24);assert.equal(r.controls.fail,0);assert.equal(r.controls.firstFailure,null);assert.equal(r.controls.postAssertionExactlyOnce,true);assert.equal(r.related.passed,true);assert.deepEqual(r.related.groups.map(g=>g.group),['F1','F2','F3','F4','F5','F6','F7','F8']);for(const g of r.related.groups)assert.equal(g.passed,true);for(const f of [...FLAGS,'nativeExecuted','mfAllocated','I0Created'])assert.equal(r[f],false);assert.equal(r.preflight.stage,'MODEL ONLY');for(const graph of r.preflight.offGraphs){assert.equal(graph.equal,true);assert.equal(graph.baselineSha256,graph.candidateSha256);}assert.equal(r.preflight.supplement.records.length,2);assert.equal(r.preflight.supplement.nodeModuleAbsent,true);
 }
 console.info(JSON.stringify({purpose:'afw.post-ack-independent-verdict.safe.v1',context,nativeCertificate:native,valid:true,operationalReadiness:false,completePackage:false,PCoff:false}));
}
async function artifactMetadata(id){
 assert(/^[1-9][0-9]*$/.test(id));const r=await fetch('https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/'+id,{headers:{Authorization:'Bearer '+process.env.GITHUB_TOKEN,Accept:'application/vnd.github+json'},redirect:'error',signal:AbortSignal.timeout(10000)});assert.equal(r.status,200);const m=await r.json();assert.equal(String(m.id),id);assert.equal(m.expired,false);assert.equal(String(m.workflow_run.id),process.env.GITHUB_RUN_ID);assert.equal(m.workflow_run.head_sha,process.env.GITHUB_SHA);assert(/^sha256:[a-f0-9]{64}$/.test(m.digest));return m;
}
async function sealNative(){
 const {cp}=await import('node:fs/promises'),{join}=await import('node:path'),{sealDirectory}=await import('./finite-checkpoint-custody.mjs');const root=join(process.env.RUNNER_TEMP,'afw-post-ack-native'),payload=join(root,'payload');
 await mkdir(payload,{recursive:true});const privateRoot='output/finite-budget/post-ack-private';let manifest;
 try{manifest=JSON.parse(await readFile(privateRoot+'/job-manifest.json'));}catch{return;}
 assert.deepEqual(manifest.context,executionContext());assert.equal(manifest.diagnosticOnly,true);assert.deepEqual(manifest.cases,['R2']);if(manifest.preallocationBlocked)return;
 await cp('output',join(payload,'output'),{recursive:true,errorOnExist:true,force:false});await cp(join(root,'logs'),join(payload,'logs'),{recursive:true,errorOnExist:true,force:false});
 const kind=manifest.originalR2Outcome==='passed'?'readonly-result':'consumer-failure';assert.equal(manifest.kind,kind);
 const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:REPOSITORY,ref:REF,sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind};
 await sealDirectory({sourceDir:payload,stagingDir:join(root,'cipher'),context});
 await writeFile(join(root,'kind.txt'),kind);
}
async function reopenNative(){
 const {join}=await import('node:path'),{openDirectory}=await import('./finite-checkpoint-custody.mjs'),root=join(process.env.RUNNER_TEMP,'afw-post-ack-native'),kind=(await readFile(join(root,'kind.txt'),'utf8')).trim(),id=process.env.CIPHER_ARTIFACT_ID,metadata=await artifactMetadata(id);
 assert.equal(metadata.name,'afw-post-ack-cipher-'+process.env.GITHUB_RUN_ID+'-1');
 const zip=await readFile(join(root,'cipher.zip'));assert.equal('sha256:'+sha(zip),metadata.digest);
 const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:REPOSITORY,ref:REF,sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind};
 await openDirectory({stagingDir:join(root,'download'),destinationDir:join(root,'opened'),context});
 const original=JSON.parse(await readFile('output/finite-budget/post-ack-private/observation.json')),restored=JSON.parse(await readFile(join(root,'opened/output/finite-budget/post-ack-private/observation.json'))),manifest=JSON.parse(await readFile(join(root,'opened/output/finite-budget/post-ack-private/job-manifest.json')));
 assert.deepEqual(original,restored);validatePostAckResult(restored,executionContext());assert.deepEqual(manifest.context,executionContext());assert.equal(manifest.originalR2Outcome,restored.originalR2Outcome);assert.equal(manifest.kind,kind);
 assert.notEqual(restored.originalR2Outcome,'unavailable');await writeFile(join(root,'reopen.json'),JSON.stringify({status:'verified',artifactId:id,zipSha256:sha(zip),observationSha256:observationHash(restored),reopenVerified:true}));
}
async function nativeProof(){
 let result;try{result=JSON.parse(await readFile('output/finite-budget/post-ack-private/observation.json'));}catch{result=selectPostAckCertificate({snapshots:[],mountedProvenance:null,originalR2Outcome:'unavailable',context:executionContext()});}
 try{const custody=JSON.parse(await readFile(process.env.RUNNER_TEMP+'/afw-post-ack-native/reopen.json'));if(result.originalR2Outcome!=='unavailable')result={...result,custody};}catch{}
 validatePostAckResult(result,executionContext());await writeProof(result);assert.equal(result.custody.status,'verified');assert.equal(result.provenance.status,'verified');assert(['observed','not_observed'].includes(result.status));
}
if(process.argv[1]&&process.argv[1].replaceAll('\\','/').endsWith('/finite-post-ack-diagnostic.mjs')){
 const [command]=process.argv.slice(2);
 try{
  if(command==='contracts-proof')await contractsProof();
  else if(command==='verify-contracts')await verifyProof(false);
  else if(command==='verify-native')await verifyProof(true);
  else if(command==='seal-native')await sealNative();
  else if(command==='reopen-native')await reopenNative();
  else if(command==='native-proof')await nativeProof();
  else throw Error('unsupported fixed diagnostic command');
 }catch{console.error('post_ack_closed_command_failed');process.exitCode=1;}
}
