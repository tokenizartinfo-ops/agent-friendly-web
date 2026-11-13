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
function postAckPairComparison(node){
 const unwrap=n=>ts.isParenthesizedExpression(n)?unwrap(n.expression):n;
 const call=(n,name)=>ts.isCallExpression(n)&&ts.isIdentifier(n.expression)&&n.expression.text===name&&n.arguments.length===1;
 const expected=n=>call(n,'canonical')&&ts.isIdentifier(n.arguments[0])&&n.arguments[0].text==='expected';
 const member=(n,key)=>{n=unwrap(n);if(ts.isPropertyAccessExpression(n))return ts.isIdentifier(n.expression)&&n.expression.text==='pair'&&n.name.text===key;
  return key==='first'&&ts.isCallExpression(n)&&ts.isPropertyAccessExpression(n.expression)&&ts.isIdentifier(n.expression.expression)&&n.expression.expression.text==='__afwBudget'&&n.expression.name.text==='readMethod'&&n.arguments.length===3&&ts.isIdentifier(n.arguments[0])&&n.arguments[0].text==='pair'&&ts.isStringLiteral(n.arguments[1])&&n.arguments[1].text==='first'&&n.arguments[2].kind===ts.SyntaxKind.FalseKeyword;};
 const comparison=(n,key)=>{n=unwrap(n);return ts.isBinaryExpression(n)&&n.operatorToken.kind===ts.SyntaxKind.ExclamationEqualsEqualsToken&&call(n.left,'canonical')&&member(n.left.arguments[0],key)&&expected(n.right);};
 node=unwrap(node);return ts.isBinaryExpression(node)&&node.operatorToken.kind===ts.SyntaxKind.BarBarToken&&comparison(node.left,'first')&&comparison(node.right,'second');
}
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
   const boundary=postAckPairComparison(n.expression)?'expected_mismatch':'protocol_invariant';wrap(n.thenStatement,boundary);
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
function validateEmissionShape(record,current){
 ordinary(record,['purpose','version','profile','path','phase','baselineBytes','baselineSha256','emittedBytes','emittedSha256','transformLiteralSha256','sites','fields','enums','businessAuthority','addsAwait','addsPromise','addsNativeCall','changesRetention']);
 assert.equal(record.purpose,'afw.post-ack-emission.syn.v1');assert.equal(record.version,1);assert.equal(record.profile,POST_ACK_PROFILE);assert([PHASE,'<stdin>'].includes(record.path));assert.equal(record.phase,'after-baseline');
 for(const key of ['baselineBytes','emittedBytes'])assert(Number.isSafeInteger(record[key])&&record[key]>0);assert(record.emittedBytes>record.baselineBytes);
 for(const key of ['baselineSha256','emittedSha256','transformLiteralSha256'])assert(typeof record[key]==='string'&&HASH.test(record[key]));
 assert.equal(record.transformLiteralSha256,sha(record.path===PHASE?collectorLiteral(current):'budgetSnapshot/postAckDiagnostic/v1'));
 assert.deepEqual(record.sites,record.path===PHASE?{entry_check:1,notice_guard:1,protocol_invariant:5,pair_wait:1,expected_mismatch:1,exit_check:1,issuer_ack:1}:{budgetSnapshot:1});
 assert.deepEqual(record.fields,['invocationOrdinal','operation','ackReturned','postAckEntered','outcome','boundary','sameError']);assert.deepEqual(record.enums,BOUNDARIES);
 for(const key of ['businessAuthority','changesRetention'])assert.equal(record[key],false);for(const key of ['addsAwait','addsPromise','addsNativeCall'])assert.equal(record[key],0);
}
export function validatePostAckSupplement({records,baseline,identity:current,metafile}){
 identity(current);assert(Array.isArray(records)&&records.length===2);assert.deepEqual(records.map(r=>r.path).sort(),['<stdin>',PHASE].sort());
 assert(metafile&&typeof metafile==='object'&&metafile.inputs&&typeof metafile.inputs==='object'&&!Array.isArray(metafile.inputs));const inputs=Object.keys(metafile.inputs);assert(inputs.length>0&&inputs.includes(PHASE)&&inputs.includes('<stdin>'),'actual complete metafile');
 assert(!inputs.some(p=>/finite-post-ack-diagnostic|finite-budget-world|finite-budget-evidence|finite-budget-descriptors/.test(p)),'Node-only graph exclusion');
 assert(Array.isArray(baseline));const keys=baseline.map(b=>b.role+':'+b.path);assert.equal(new Set(keys).size,keys.length);
 for(const r of records){
  validateEmissionShape(r,current);const b=baseline.find(x=>x.role==='QA'&&x.path===r.path);assert(b&&typeof b.source==='string'&&typeof b.output==='string');
  assert.equal(b.emittedBytes,Buffer.byteLength(b.source));assert.equal(b.emittedSha256,sha(b.source));assert.equal(r.baselineBytes,b.emittedBytes);assert.equal(r.baselineSha256,b.emittedSha256);
  const actual=transformPostAckEmission({role:'QA',modulePath:r.path,source:b.source,identity:current});assert.deepEqual(r,actual.record);assert.equal(b.output,actual.source);assert.equal(r.emittedBytes,Buffer.byteLength(b.output));assert.equal(r.emittedSha256,sha(b.output));
 }
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

const VM_SETUP="\n let __paSlot=null,position='baseline',operation=null,actualPromise=null,actualResult=null,settled=false,postChecks=0;\n const nested=new Set(),identityFacts={callReceiver:true,callArguments:true,appendIdentity:true,observeArguments:true,promiseIdentity:true,retainIdentity:true,lateDuringGrant:false},retained=[],waited=[],nativePromises=[],sealed=new Map();\n let savedLate=null,lateRan=false,pairReject=null,abortReject=null;\n const sdkOperations=[],expected={records:{issuer:{reservation:{identity:{identityHash:'SYN'},recordHash:'SYN'},operations:Object.fromEntries(['grant','consume','authorization','open_fence'].map(k=>[k,{send:null,ack:null}]))}},issuerRows:{}},ctx={},env={},originalLease={},id='SYN';\n const __afwBudget={readMethod(receiver,key,optional){assert.equal(key,'first');assert.equal(optional,false);return receiver[key];}};\n function fail(){throw primary;}\n function check(){effects.push('check');if(position==='issuer-ack'){postChecks++;if(settings.mode==='entry_check'&&postChecks===1||settings.mode==='exit_check'&&postChecks===2)throw primary;}}\n function requireEmptyNotice(value){assert.equal(this,undefined);assert.equal(value,expected);effects.push('notice');if(position==='issuer-ack'&&settings.mode==='notice_guard')throw primary;}\n function canonical(value){assert.equal(this,undefined);effects.push('canonical');if(position==='issuer-ack'&&settings.mode==='unbranded')throw primary;return JSON.stringify(value);}\n function readSdk(){return null;}\n async function wait(p){\n  assert.equal(this,undefined);waited.push(p);effects.push('wait');\n  if(position==='issuer-ack'&&settings.mode.startsWith('pair_order_')){\n   assert(p instanceof Promise);const abort=new Promise((_,reject)=>{abortReject=reject;}),other=Error('SYN losing race');\n   queueMicrotask(()=>{if(settings.mode==='pair_order_reject_first'){pairReject(primary);queueMicrotask(()=>abortReject(other));}else{abortReject(primary);queueMicrotask(()=>pairReject(other));}});\n   return await Promise.race([p,abort]);\n  }\n  return await p;\n }\n function observeOwnerPhasePair(options){\n  assert.equal(this,undefined);assert.deepEqual(Object.keys(options),['ctx','env','parent','preconnectionId']);assert.equal(options.ctx,ctx);assert.equal(options.env,env);assert.equal(options.parent,originalLease);assert.equal(options.preconnectionId,id);effects.push('pair');\n  if(position==='issuer-ack'&&settings.mode==='pair_wait')return Promise.reject(primary);\n  if(position==='issuer-ack'&&settings.mode.startsWith('pair_order_'))return new Promise((_,reject)=>{pairReject=reject;});\n  if(position==='issuer-ack'&&settings.mode==='nested_scope'&&!nested.has(operation)){nested.add(operation);return (async()=>{await recheckOwned();return {first:expected,second:expected};})();}\n  if(position==='issuer-ack'&&settings.mode==='late_scope'){\n   if(operation==='consume'&&!savedLate)savedLate=()=>recheckOwned();\n   if(operation==='grant'&&savedLate&&!lateRan){lateRan=true;identityFacts.lateDuringGrant=true;return (async()=>{await savedLate();return {first:expected,second:expected};})();}\n  }\n  return Promise.resolve(settings.mode==='expected_mismatch'&&position==='issuer-ack'?{first:{SYN:true},second:expected}:{first:expected,second:expected});\n }\n function retain(p){assert.equal(this,undefined);assert(p instanceof Promise);retained.push(p);effects.push('retain');return p;}\n function issuerSeal(kind,v){assert.equal(this,undefined);effects.push('seal:'+kind);const record={...v,recordHash:'SYN'};sealed.set(kind,record);return record;}\n function digest(){return 'SYN';}\n async function issuerAppend(kind,record,op){assert.equal(this,undefined);assert.equal(record,sealed.get(kind));assert.equal(op,operation);effects.push('append:'+kind);expected.records.issuer.operations[op][kind.toLowerCase()]=record;if(kind==='Ack'&&settings.mode==='protocol_guard')settled=false;}\n";
const VM_TAIL="\n globalThis.control=(async()=>{let caught=null,returned=[];try{for(const op of settings.operations){\n  postChecks=0;expected.records.issuer.operations[op]={send:null,ack:null};\n  const native=Promise.resolve(op==='consume'?{id:'SYN'}:{status:'applied',row:{id:'SYN'}});nativePromises.push(native);\n  function nativeCall(){assert.equal(this,undefined);assert.equal(arguments.length,0);effects.push('native');return native;}\n  returned.push(await issuerCall(op,{deadline:123},nativeCall));\n }}catch(e){caught=e;}\n await Promise.resolve();assert(retained.every(p=>waited.includes(p)));assert.equal(retained.length,nativePromises.length);identityFacts.promiseIdentity=retained.every(p=>waited.filter(v=>v===p).length===1);identityFacts.retainIdentity=new Set(retained).size===retained.length;\n return {caught,returned,snapshot:__afwPostAckSnapshot(),effects,identityFacts,slotEmpty:__paSlot===null};})();\n";
const syntheticContext=()=>({repository:REPOSITORY,ref:REF,source:'0'.repeat(40),run:'1',attempt:1,case:'R2'});
const syntheticProvenance=c=>({status:'verified',context:c,stage:'actual_configured',profile:POST_ACK_PROFILE,allocationIdentity:1,ownedAllocationIdentity:1,lifecycleComplete:true,successfulMount:true,actualOptionsVerified:true,modelOnly:false,sdkFileSha256:'bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80',sdkBytes:251149,sdkSites:44,lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',lockSha256:'0'.repeat(64),mGraphSha256:'0'.repeat(64),qaGraphSha256:'0'.repeat(64),transformSha256:'0'.repeat(64),preflightSha256:'0'.repeat(64),emissions:2});
function selectSynthetic(snapshot,options={}){const context=syntheticContext();return selectPostAckCertificate({snapshots:[{role:'QA',reason:'terminal-owned-before-dispose',allocationIdentity:1,snapshot}],mountedProvenance:syntheticProvenance(context),originalR2Outcome:'failed',context,...options});}
let cachedControlInputs;
async function controlInputs(){
 if(cachedControlInputs)return cachedControlInputs;
 assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
 const source=await readFile('output/finite-budget/post-ack-private/phase-composed.mjs','utf8'),transformed=transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:syntheticContext()}),a=ast(transformed.source,PHASE),functions=[];
 const visit=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='issuerCall')functions.push(n);ts.forEachChild(n,visit);};visit(a);assert.equal(functions.length,1);
 const issuer=functions[0],parent=issuer.parent.statements,recheck=parent.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body.getText(a).includes('__paToken'));assert(recheck);
 const prelude=a.statements.filter(n=>ts.isVariableStatement(n)&&n.declarationList.declarations.some(d=>['__paIdentity','__paCollector'].includes(d.name.getText(a)))||ts.isFunctionDeclaration(n)&&['__paInvalid','__paBegin','__paBrand','__paEmit','__afwPostAckSnapshot'].includes(n.name?.text)).map(n=>n.getText(a).replace(/^export /,'')).join('\n');
 const preflight=JSON.parse(await readFile('output/finite-budget/post-ack-model/model.json','utf8'));
 const rawAst=ast(source,PHASE),rawFunctions=[];const rawVisit=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='issuerCall')rawFunctions.push(n);ts.forEachChild(n,rawVisit);};rawVisit(rawAst);assert.equal(rawFunctions.length,1);const rawIssuer=rawFunctions[0],rawRecheck=rawIssuer.parent.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body.getText(rawAst).includes('requireEmptyNotice(expected)'));assert(rawRecheck);
 assert.equal(sha(source),preflight.privateCompileHashes.phaseSha256);const oracleProof=oracleControls(await readFile('test/fixtures/finite-budget-world.mjs','utf8'),preflight.handoffControls);cachedControlInputs={source,transformed,prelude,oracleProof,recheck:recheck.getText(a),issuer:issuer.getText(a),originalRecheck:rawRecheck.getText(rawAst),originalIssuer:rawIssuer.getText(rawAst),preflight};return cachedControlInputs;
}
async function simulate(mode='ok',operations=['grant'],original=false){
 const {prelude,recheck,issuer,originalRecheck,originalIssuer}=await controlInputs(),primary=Error('SYN original local object'),effects=[],settings={mode,operations},context=createContext({settings,primary,effects,structuredClone,Promise,Error,JSON,Map,Set,queueMicrotask,assert,Miniflare:class{constructor(){throw Error('allocation forbidden');}},createI0(){throw Error('I0 forbidden');}});
 const program='\"use strict\";\n'+prelude+VM_SETUP+(original?originalRecheck:recheck)+'\n'+(original?originalIssuer:issuer)+VM_TAIL;
 if(mode==='observer_throws')context.settings.mode='expected_mismatch';
 let code=program;if(mode==='observer_throws')code=code.replace('__paCollector.records.push({invocationOrdinal:','(()=>{throw Error("SYN observer");})();__paCollector.records.push({invocationOrdinal:');
 new Script(code).runInContext(context,{timeout:1000});const value=await context.control;
 return {caughtSame:value.caught===primary,caught:value.caught,returned:JSON.parse(JSON.stringify(value.returned)),snapshot:JSON.parse(JSON.stringify(value.snapshot)),effects:[...effects],identityFacts:JSON.parse(JSON.stringify(value.identityFacts)),slotEmpty:value.slotEmpty};
}
const tokens=new WeakMap();let activeControl=null;
function complete(id){assert(activeControl&&activeControl.id===id,'active callback identity');assert.equal(activeControl.issued,false,'one witness issuance per callback/run');activeControl.issued=true;const token=Object.freeze({});tokens.set(token,{id,run:activeControl.run});return token;}
function completionBarrier(rows,run){assert.deepEqual(rows.map(r=>r.id),IDS);const seen=new Set();for(const r of rows){const witness=tokens.get(r.token);assert(!seen.has(r.id)&&witness?.id===r.id&&witness.run===run,'authentic exactly-once completion');seen.add(r.id);}assert.equal(seen.size,24);}
async function executeControlRegistry(registry,progress={completed:0,pass:0,firstFailure:null}){
 assert.deepEqual(registry.map(([id])=>id),IDS,'complete module-scope registry');const parent=activeControl,run=Object.freeze({}),rows=[];
 try{for(const [id,callback]of registry){activeControl={id,run,issued:false};try{const token=await callback(),witness=tokens.get(token);assert(activeControl.issued&&witness?.id===id&&witness.run===run,'callback-owned post-final-assertion witness');rows.push({id,token});progress.pass++;}catch(error){progress.firstFailure=id;throw error;}finally{progress.completed++;}}completionBarrier(rows,run);return rows.length;}
 finally{activeControl=parent;}
}
function oracleControls(worldSource,handoff){
 validateHandoffControls(handoff);
 const a=ast(worldSource,'fixed-current-world-oracle'),matches=a.statements.filter(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='qualifyPostAckOriginalR2');assert.equal(matches.length,1);
 const body=matches[0].getText(a),context=createContext({assert,postAckIdentity:syntheticContext,performance:{now:()=>0}}),good={caseName:'R2',facts:{completeWrites:1,completeNormal:1,input:{entries:201,correlations:1,expirationPreserved:true},foreignUnchanged:true,lists:2,gets:200,scopePeak:2,sdkReplay:0,nativeUnsettled:0,outwardPending:0,responseStatus:400,referenceRows:0,thirdListEntered:false,boundaryProof:{exactPrecedingPages:2,counter:2}},operationalReadiness:false,completePackage:false,PCoff:false};
 const helpers=['recordPostAckOriginal','finishPostAckOriginal','assertPostAckHeadroom'].map(name=>{const n=a.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name);assert(n);return n.getText(a);}).join('\n');
 new Script(body+';'+helpers+';globalThis.oracle=qualifyPostAckOriginalR2;globalThis.capture=recordPostAckOriginal;globalThis.finish=finishPostAckOriginal;globalThis.headroom=assertPostAckHeadroom;').runInContext(context,{timeout:1000});assert.equal(context.oracle(good),good);
 const mutations=[v=>v.caseName='R1',v=>v.facts.completeWrites=0,v=>v.facts.completeNormal=0,v=>v.facts.input.entries=200,v=>v.facts.input.correlations=0,v=>v.facts.input.expirationPreserved=false,v=>v.facts.foreignUnchanged=false,v=>v.facts.lists=3,v=>v.facts.gets=201,v=>v.facts.scopePeak=3,v=>v.facts.sdkReplay=1,v=>v.facts.nativeUnsettled=1,v=>v.facts.outwardPending=1,v=>v.facts.responseStatus=302,v=>v.facts.referenceRows=1,v=>v.facts.thirdListEntered=true,v=>v.facts.boundaryProof.exactPrecedingPages=1,v=>v.facts.boundaryProof.counter=1,v=>v.operationalReadiness=true,v=>v.completePackage=true,v=>v.PCoff=true];
 for(const mutate of mutations){const bad=structuredClone(good);mutate(bad);assert.throws(()=>context.oracle(bad));}
 const original=Error('SYN diagnostic pre-MF refusal'),blocked={mfAttached:false,harnessReturned:false,persistAttached:true};context.capture(blocked,null,original,true);assert.equal(blocked.originalR2Outcome,'unavailable');assert.throws(()=>context.finish(blocked),error=>error===original);assert.equal(nativeSealEligible({mfAttached:false,preallocationBlocked:true}),false);
 const now=Date.now(),timing={job:'native',timeoutMinutes:7,context:syntheticContext(),startedAt:now-1000,responseDate:now,requestElapsed:1,metadataAgeMs:0,observedMono:0};context.headroom(timing);assert.throws(()=>context.headroom({...timing,startedAt:now+1}));
 return {protectedTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',assertionInventory:21,negativeFamilies:mutations.length,allRejected:true,oracleSha256:sha(body),outcomeIsolation:{knownSuccessNormal:handoff.variants[2].normalReturn,primaryRejectionSame:handoff.variants[4].successful.sameError&&handoff.variants[4].uncertain.sameError&&handoff.variants[4].samePrimary.sameError,qualificationErrorSame:handoff.variants[3].sameError,preMfUnavailable:true,futureJobStartRejected:true}};
}
const REGISTRY=Object.freeze([
 ['off_graphs',async()=>{const {preflight:p}=await controlInputs();const checked=await checkedModel();assert.deepEqual(checked.model,p);validateOffGraphs(p.offGraphs);assert.equal(p.stage,'MODEL ONLY');assert.equal(p.offGraphs.length,2);for(const r of p.offGraphs){assert(r.equal&&r.sameCapturedInputs&&r.sameDefines);assert.equal(r.baselineSha256,r.candidateSha256);assert.equal(r.baselineBytes,r.candidateBytes);}assert.equal(p.offGraphs.find(r=>r.role==='QA').originalAdditionalSYN,3);assert.equal(p.mfAllocated,false);assert.equal(p.I0Created,false);return complete('off_graphs');}],
 ['sdk_pins',async()=>{const {preflight:p}=await controlInputs();const sdk=await readFile('node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js');assert.equal(sdk.length,251149);assert.equal(sha(sdk),p.sdkFileSha256);assert.equal(p.sdkSites,44);assert.equal(p.lockBlob,'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b');const f7=await readFile('.github/workflows/afw-finite-budget-qualification.yml');assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+f7.length+'\0'),f7])).digest('hex'),'f7a71f1a0fa4f5ddf069ff411f008a098455e5cc');return complete('sdk_pins');}],
 ['profile_scope',async()=>{runZipRangeControls();const transport=await runArtifactReadControls();assert.equal(transport.passed,true);const {source}=await controlInputs();assert.deepEqual(transformPostAckEmission({role:'M',modulePath:PHASE,source,identity:syntheticContext()}),{source,record:null});assert.throws(()=>transformPostAckEmission({role:'other',modulePath:PHASE,source,identity:syntheticContext()}));assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:{...syntheticContext(),attempt:2}}));
 const entry=await readFile('test/finite-post-ack-diagnostic.test.mjs','utf8'),a=ast(entry,'actual-diagnostic-entry'),body=a.statements.filter(n=>!ts.isImportDeclaration(n)).map(n=>n.getText(a)).join('\n');
 for(const selected of [undefined,'','unknown_mode']){
  let registrations=0;const reads=[],env=new Proxy({},{get(_target,key){reads.push(key);assert.equal(key,'AFW_POST_ACK_MODE','inactive/unknown branch may only read mode');return selected;}});
  const vm=createContext({assert,process:{env},test(){registrations++;},Miniflare:class{constructor(){throw Error('allocation forbidden');}},createI0(){throw Error('I0 forbidden');}});
  if(selected==='unknown_mode')assert.throws(()=>new Script(body).runInContext(vm,{timeout:1000}));else new Script(body).runInContext(vm,{timeout:1000});
  assert.equal(registrations,0);assert.deepEqual(reads,['AFW_POST_ACK_MODE']);
 }
 return complete('profile_scope');
 }],
 ['sites_exact',async()=>{const {source,transformed}=await controlInputs();assert.equal(transformed.record.sites.protocol_invariant,5);assert.equal(transformed.record.sites.expected_mismatch,1);
 const a=ast(source,PHASE),targets=[];const walk=n=>{if(ts.isFunctionDeclaration(n)&&n.name?.text==='recheckOwned'&&n.body.getText(a).includes('requireEmptyNotice(expected)'))targets.push(n);ts.forEachChild(n,walk);};walk(a);assert.equal(targets.length,1);const recheck=targets[0],comparison=recheck.body.statements.find(n=>ts.isIfStatement(n)&&postAckPairComparison(n.expression));assert(comparison);
 const notice=recheck.body.statements.find(n=>ts.isExpressionStatement(n)&&n.expression.getText(a)==='requireEmptyNotice(expected)');assert(notice);const issuer=recheck.parent.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='issuerCall'),ack=issuer.body.statements.find(n=>n.getText(a).replace(/\s+/g,'')==="awaitissuerAppend('Ack',ack,op);");assert(ack);
 const variants=[
 apply(source,[{start:comparison.expression.getStart(a),end:comparison.expression.end,text:'true'}]),
 apply(source,[{start:comparison.getStart(a),end:comparison.end,text:''}]),
 apply(source,[{start:comparison.end,end:comparison.end,text:comparison.getText(a)}]),
 apply(source,[{start:comparison.expression.getStart(a),end:comparison.expression.end,text:'canonical(pair.second)!==canonical(expected)||canonical(pair.first)!==canonical(expected)'}]),
 apply(source,[{start:notice.end,end:notice.end,text:notice.getText(a)}]),
 apply(source,[{start:ack.getStart(a),end:ack.end,text:''}])
 ];
 for(const bad of variants)assert.throws(()=>transformPostAckEmission({role:'QA',modulePath:PHASE,source:bad,identity:syntheticContext()}));
 return complete('sites_exact');
 }],
 ['sealer_graph',async()=>{
 const {preflight:p}=await controlInputs(),records=p.supplement.records,metafileBytes=await readFile('output/finite-budget/post-ack-private/qa-metafile.json');assert.equal(sha(metafileBytes),p.privateCompileHashes.qaMetafileSha256);const metafile=JSON.parse(metafileBytes),baseline=[];
 for(const r of records){const source=await readFile('output/finite-budget/post-ack-private/'+(r.path===PHASE?'phase':'entry')+'-composed.mjs','utf8'),output=transformPostAckEmission({role:'QA',modulePath:r.path,source,identity:p.context}).source;baseline.push({role:'QA',path:r.path,emittedBytes:Buffer.byteLength(source),emittedSha256:sha(source),source,output});}
 const args={records,baseline,identity:p.context,metafile};validatePostAckSupplement(args);
 for(const recordsBad of [records.slice(1),[...records,records[0]],records.map((r,i)=>i?r:{...r,version:2}),records.map((r,i)=>i?r:{...r,fields:[]}),records.map((r,i)=>i?r:{...r,enums:[]}),records.map((r,i)=>i?r:{...r,transformLiteralSha256:'f'.repeat(64)}),records.map((r,i)=>i?r:{...r,emittedSha256:'f'.repeat(64)})])assert.throws(()=>validatePostAckSupplement({...args,records:recordsBad}));
 assert.throws(()=>validatePostAckSupplement({...args,baseline:baseline.map((r,i)=>i?r:{...r,output:r.output+'\\n'})}));
 for(const meta of [undefined,{}, {inputs:{}},{inputs:{[PHASE]:{},'<stdin>':{},'test/fixtures/finite-post-ack-diagnostic.mjs':{}}}])assert.throws(()=>validatePostAckSupplement({...args,metafile:meta}));
 return complete('sealer_graph');
 }],
 ['lexical_op',async()=>{const s=await simulate('expected_mismatch',['consume']);assert(s.caughtSame);assert.equal(s.snapshot.records[0].operation,'consume');const other=await simulate('expected_mismatch',['authorization']);assert.equal(other.snapshot.records.length,0);return complete('lexical_op');}],
 ['one_shot',async()=>{const s=await simulate('ok',['consume','grant']);assert(s.slotEmpty);assert.equal(s.snapshot.invoked,2);assert.deepEqual(s.snapshot.records.map(r=>r.operation),['consume','grant']);assert.equal(s.snapshot.pending,0);return complete('one_shot');}],
 ['nested_scope',async()=>{const s=await simulate('nested_scope',['consume','grant']);assert.equal(s.caught,null);assert.equal(s.snapshot.invoked,2);assert.equal(s.snapshot.completed,2);assert.deepEqual(s.snapshot.records.map(r=>r.operation),['consume','grant']);assert.equal(s.snapshot.pending,0);return complete('nested_scope');}],
 ['late_scope',async()=>{const s=await simulate('late_scope',['consume','grant']);assert.equal(s.caught,null);assert.equal(s.snapshot.invoked,2);assert.equal(s.identityFacts.lateDuringGrant,true);assert.deepEqual(s.snapshot.records.map(r=>r.operation),['consume','grant']);assert(s.slotEmpty);return complete('late_scope');}],
 ['entry_check',async()=>{const s=await simulate('entry_check');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'entry_check');return complete('entry_check');}],
 ['notice_guard',async()=>{const s=await simulate('notice_guard');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'notice_guard');return complete('notice_guard');}],
 ['protocol_guard',async()=>{const s=await simulate('protocol_guard');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'protocol_invariant');return complete('protocol_guard');}],
 ['pair_wait',async()=>{const s=await simulate('pair_wait');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'pair_wait');return complete('pair_wait');}],
 ['expected_mismatch',async()=>{const s=await simulate('expected_mismatch');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'expected_mismatch');assert.equal(selectSynthetic(s.snapshot).status,'observed');return complete('expected_mismatch');}],
 ['exit_check',async()=>{const s=await simulate('exit_check');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'exit_check');return complete('exit_check');}],
 ['unbranded',async()=>{const s=await simulate('unbranded');assert(s.caughtSame);assert.equal(s.snapshot.records[0].boundary,'unknown');return complete('unbranded');}],
 ['same_error',async()=>{for(const mode of ['entry_check','notice_guard','protocol_guard','pair_wait','expected_mismatch','exit_check','unbranded']){const s=await simulate(mode);assert(s.caughtSame);assert.equal(s.snapshot.records[0].sameError,true);}return complete('same_error');}],
 ['observer_throws',async()=>{const s=await simulate('observer_throws');assert(s.caughtSame);assert.equal(s.snapshot.invalid,true);assert.equal(selectSynthetic(s.snapshot).status,'invalid');return complete('observer_throws');}],
 ['same_effects',async()=>{for(const mode of ['ok','entry_check','notice_guard','protocol_guard','pair_wait','expected_mismatch','exit_check','unbranded']){const observed=await simulate(mode),original=await simulate(mode,['grant'],true);assert.deepEqual(observed.effects,original.effects);assert.equal(observed.caughtSame,original.caughtSame);assert.deepEqual(observed.returned,original.returned);for(const flag of ['callReceiver','callArguments','appendIdentity','observeArguments','promiseIdentity','retainIdentity']){assert.equal(observed.identityFacts[flag],true);assert.equal(original.identityFacts[flag],true);}}const s=await simulate('ok');assert.equal(s.caught,null);assert.deepEqual(s.returned,[{id:'SYN'}]);assert.equal(s.effects.filter(x=>x==='retain').length,1);assert.equal(s.effects.filter(x=>x==='append:Ack').length,1);assert.equal(s.effects.filter(x=>x==='append:Send').length,1);const {source}=await controlInputs(),emission=transformPostAckEmission({role:'QA',modulePath:PHASE,source,identity:syntheticContext()}).source;const count=(text,pattern)=>(text.match(pattern)??[]).length;assert.equal(count(emission,/\bawait\b/g),count(source,/\bawait\b/g));assert.equal(count(emission,/Promise\./g),count(source,/Promise\./g));return complete('same_effects');}],
 ['pair_orders',async()=>{for(const mode of ['pair_order_reject_first','pair_order_abort_first']){const s=await simulate(mode),baseline=await simulate(mode,['grant'],true);assert(s.caughtSame&&baseline.caughtSame);assert.deepEqual(s.effects,baseline.effects);assert.equal(s.snapshot.records[0].boundary,'pair_wait');}return complete('pair_orders');}],
 ['no_rejection',async()=>{const s=await simulate();assert.equal(selectSynthetic(s.snapshot).status,'not_observed');const foreign=structuredClone(s.snapshot);foreign.identity.run='2';assert.equal(selectSynthetic(foreign).status,'invalid');const unavailable=selectPostAckCertificate({snapshots:[],mountedProvenance:null,originalR2Outcome:'unavailable',context:syntheticContext()});assert.equal(unavailable.status,'unavailable');assert.equal(unavailable.custody.status,'unavailable');
 const changed=callback=>REGISTRY.map(([id,fn],i)=>[id,i===0?callback:fn]);
 await assert.rejects(()=>executeControlRegistry(REGISTRY.slice(1)));
 await assert.rejects(()=>executeControlRegistry(changed(async()=>undefined)));
 await assert.rejects(()=>executeControlRegistry(changed(async()=>({skip:true}))));
 await assert.rejects(()=>executeControlRegistry(changed(async()=>Object.freeze({}))));
 await assert.rejects(()=>executeControlRegistry(changed(async()=>{complete('off_graphs');return complete('off_graphs');})));
 return complete('no_rejection');
 }],
 ['overflow',async()=>{const s=await simulate('ok',Array.from({length:33},()=> 'grant'));assert.equal(s.snapshot.overflow,true);assert.equal(selectSynthetic(s.snapshot).status,'invalid');const r=await simulate('expected_mismatch');const bad=structuredClone(r.snapshot);bad.records.push({...bad.records[0],invocationOrdinal:2});bad.invoked=2;bad.completed=2;assert.equal(selectSynthetic(bad).status,'invalid');return complete('overflow');}],
 ['schema',async()=>{const c=syntheticContext(),v={purpose:PURPOSE,status:'observed',context:c,provenance:{status:'verified',sdkPackage:'@cloudflare/workers-oauth-provider@1.2.1',sdkFileSha256:'0'.repeat(64),lockSha256:'0'.repeat(64),mGraphSha256:'0'.repeat(64),qaGraphSha256:'0'.repeat(64),transformSha256:'0'.repeat(64),preflightSha256:'0'.repeat(64)},selection:'unique_qualified_rejection',invocationOrdinal:1,operation:'grant',ackReturned:true,postAckEntered:true,outcome:'rejected',boundary:'expected_mismatch',quality:'qualified',originalR2Outcome:'failed',custody:unavailableCustody(),...Object.fromEntries(FLAGS.map(k=>[k,false]))};validatePostAckResult(v,c);const bytes=JSON.stringify(observationProjection(v));assert.equal(Buffer.byteLength(bytes),1221);assert.equal(sha(bytes),'47a77ac116e8d5514defb5fa615de87bf01e16968d30254a8754f389be59a005');assert.equal(observationHash(Object.fromEntries(Object.entries(v).reverse())),sha(bytes));for(const key of FLAGS)assert.throws(()=>validatePostAckResult({...v,[key]:true},c));assert.throws(()=>validatePostAckResult({...v,extra:true},c));assert.notEqual(observationHash({...v,originalR2Outcome:'passed'}),sha(bytes));assert.notEqual(observationHash({...v,context:{...c,run:'2'}}),sha(bytes));assert.notEqual(observationHash({...v,provenance:{...v.provenance,preflightSha256:'f'.repeat(64)}}),sha(bytes));const record={purpose:'AFW_POST_ACK_CONTROLS/1',expected:24,completed:24,pass:24,fail:0,inventory:[...IDS],firstFailure:null,postAssertionExactlyOnce:true,...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};validateControlRecord(record);for(const key of [...FLAGS,'nativeExecuted','mfAllocated','I0Created'])assert.throws(()=>validateControlRecord({...record,[key]:true}));assert.throws(()=>validateControlRecord({...record,inventory:IDS.slice(1)}));
 const {preflight:model}=await controlInputs();validateModelShape(model,model.context);for(const mutate of [m=>m.handoffControls.variants[0].oracleCalls=1,m=>m.handoffControls.variants[4].samePrimary.eligible=true,m=>m.offGraphs=[],m=>m.offGraphs[1].role='M',m=>m.offGraphs[0].onPreDiagnosticEqual=false,m=>m.supplement.records[0].fields=[],m=>m.supplement.records[0].version=2,m=>m.supplement.records[0].transformLiteralSha256='f'.repeat(64),m=>m.modelGraphs.M.sha256='f'.repeat(64),m=>m.nativeExecuted=true,m=>m.privateCompileHashes.phaseSha256='f'.repeat(64)]){const bad=structuredClone(model);mutate(bad);assert.throws(()=>validateModelShape(bad,model.context));}
 const checked=await checkedModel(),programs=await currentPrograms(),formatProof={purpose:'afw.post-ack-contracts.safe.v1',context:model.context,controls:record,programs,preflight:modelProjection(checked.model,checked.sha256),modelReceipt:checked.receipt,oracle:oracleControls(await readFile('test/fixtures/finite-budget-world.mjs','utf8'),checked.model.handoffControls),related:{purpose:'afw.closed-pure-controls.syn.v2',groups:['F1','F2','F3','F4','F5','F6','F7','F8'].map(group=>({group,passed:true,evidence:{bytes:1,sha256:'0'.repeat(64)},caseCount:1})),passed:true,pureTests:{tests:1,pass:1,fail:0,skipped:0,cancelled:0,tapSha256:'0'.repeat(64)}},...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};
 await runNativePublicationControls(v,model.handoffControls);
 validateContractsProof(formatProof,model.context,programs,checked);
 for(const mutate of [p=>p.preflight.handoffControls.variants[0].eligible=true,p=>p.preflight.offGraphs=[],p=>p.preflight.offGraphs[1].role='M',p=>p.preflight.modelGraphs.QA.sha256='f'.repeat(64),p=>p.preflight.preflightSha256='f'.repeat(64),p=>p.modelReceipt.artifactId='999',p=>p.modelReceipt.uploaderDigest='f'.repeat(64),p=>p.controls.nativeExecuted=true,p=>p.controls.PCoff=true,p=>p.preflight.supplement.records[0].fields=[],p=>p.programs.pop()]){const bad=structuredClone(formatProof);mutate(bad);assert.throws(()=>validateContractsProof(bad,model.context,programs,checked));}
 return complete('schema');}],
 ['provenance',async()=>{const {oracleProof}=await controlInputs();assert.equal(oracleProof.negativeFamilies,21);assert.equal(oracleProof.allRejected,true);const s=await simulate('expected_mismatch'),c=syntheticContext(),p=syntheticProvenance(c);for(const edit of [{stage:'MODEL ONLY'},{modelOnly:true},{actualOptionsVerified:false},{lifecycleComplete:false},{successfulMount:false},{ownedAllocationIdentity:2},{emissions:1},{sdkSites:43},{sdkFileSha256:'f'.repeat(64)},{context:{...c,run:'2'}},{context:{...c,source:'f'.repeat(40)}}])assert.equal(selectSynthetic(s.snapshot,{mountedProvenance:{...p,...edit}}).status,'invalid');const pass=selectSynthetic(s.snapshot,{originalR2Outcome:'passed'});assert.equal(pass.originalR2Outcome,'passed');assert.equal(pass.custody.status,'unavailable');assert.throws(()=>validatePostAckResult({...pass,custody:{status:'verified',artifactId:'1',zipSha256:'0'.repeat(64),observationSha256:'f'.repeat(64),reopenVerified:true}},c));return complete('provenance');}]
]);
export async function runPostAckObserverControls(){
 assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const progress={completed:0,pass:0,firstFailure:null};
 try{
  const completed=await executeControlRegistry(REGISTRY,progress);assert.equal(completed,24);
  const result={purpose:'AFW_POST_ACK_CONTROLS/1',expected:24,completed,pass:completed,fail:0,inventory:[...IDS],firstFailure:null,postAssertionExactlyOnce:true,...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};assert(Buffer.byteLength(JSON.stringify(result))<=2048);return result;
 }catch(error){
  const failure={purpose:'AFW_POST_ACK_CONTROLS/1',expected:24,completed:progress.completed,pass:progress.pass,fail:1,inventory:[...IDS],firstFailure:progress.firstFailure,postAssertionExactlyOnce:false,...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false};assert(Buffer.byteLength(JSON.stringify(failure))<=2048);console.info(JSON.stringify(failure));try{await writeFile('output/finite-budget/post-ack-private/controls-failure.json',JSON.stringify(failure));}catch{}throw error;
 }
}

const PROGRAM_PATHS=["test/fixtures/finite-budget-world.mjs","test/fixtures/finite-post-ack-diagnostic.mjs","test/finite-post-ack-diagnostic.test.mjs",".github/workflows/afw-r2-post-ack-contracts.yml",".github/workflows/afw-r2-post-ack-diagnostic.yml",".github/workflows/afw-finite-budget-qualification.yml","package-lock.json","lib/mcp-qa-finite-owner-phase-context.mjs","test/fixtures/finite-initial-entry-world.mjs","test/fixtures/finite-checkpoint-custody.mjs","test/mcp-qa-finite-budget-native.test.mjs"];


function validateControlRecord(c){
 ordinary(c,['purpose','expected','completed','pass','fail','inventory','firstFailure','postAssertionExactlyOnce',...FLAGS,'nativeExecuted','mfAllocated','I0Created']);assert.equal(c.purpose,'AFW_POST_ACK_CONTROLS/1');assert.deepEqual(c.inventory,IDS);for(const k of ['expected','completed','pass'])assert.equal(c[k],24);assert.equal(c.fail,0);assert.equal(c.firstFailure,null);assert.equal(c.postAssertionExactlyOnce,true);for(const k of [...FLAGS,'nativeExecuted','mfAllocated','I0Created'])assert.equal(c[k],false);assert(Buffer.byteLength(JSON.stringify(c))<=2048);
}
function validateOffGraphs(graphs){
 assert(Array.isArray(graphs)&&graphs.length===2);assert.deepEqual(graphs.map(g=>g.role).sort(),['M','QA']);for(const g of graphs){ordinary(g,['role','baselineBytes','candidateBytes','baselineSha256','candidateSha256','equal','sameCapturedInputs','sameDefines','onPreDiagnosticEqual','baselineRecordsSha256','offRecordsSha256','onPreDiagnosticRecordsSha256','recordCount','originalAdditionalSYN']);for(const k of ['baselineBytes','candidateBytes','recordCount'])assert(Number.isSafeInteger(g[k])&&g[k]>0);assert.equal(g.baselineBytes,g.candidateBytes);for(const k of ['baselineSha256','candidateSha256','baselineRecordsSha256','offRecordsSha256','onPreDiagnosticRecordsSha256'])assert(typeof g[k]==='string'&&HASH.test(g[k]));assert.equal(g.baselineSha256,g.candidateSha256);assert.equal(g.baselineRecordsSha256,g.offRecordsSha256);assert.equal(g.offRecordsSha256,g.onPreDiagnosticRecordsSha256);for(const k of ['equal','sameCapturedInputs','sameDefines','onPreDiagnosticEqual'])assert.equal(g[k],true);assert.equal(g.originalAdditionalSYN,g.role==='QA'?3:0);}
}
function validateHandoffControls(value){
 const fact=(outcome,oracleCalls,legacyComplete,eligible)=>({outcome,sameError:true,oracleCalls,legacyComplete,eligible,callbackCalls:1});
 const expected={purpose:'afw.post-ack-owner-handoff-controls.syn.v1',variants:[
  {name:'valid_inner_cleanup_reject',...fact('failed',0,true,false)},
  {name:'invalid_inner_cleanup_reject',...fact('failed',0,true,false)},
  {name:'success_added_persistence_reject',...fact('passed',1,true,false),normalReturn:true,addedPersistenceRejected:true},
  {name:'returned_oracle_reject',...fact('failed',1,true,true)},
  {name:'business_primary_cleanup',successful:fact('failed',0,true,true),uncertain:fact('failed',0,false,false),samePrimary:fact('failed',0,true,false)}
 ],families:5,wholeHelperBeforeOracle:true,actualOwnerHandoff:true,mfAllocated:false,I0Created:false,nativeExecuted:false,businessAuthority:false};
 const closed=(actual,wanted)=>{if(Array.isArray(wanted)){assert(Array.isArray(actual));assert.deepEqual(Reflect.ownKeys(actual).sort(),Reflect.ownKeys(wanted).sort());assert.equal(actual.length,wanted.length);for(let i=0;i<wanted.length;i++)closed(actual[i],wanted[i]);}else if(wanted&&typeof wanted==='object'){ordinary(actual,Object.keys(wanted));for(const key of Object.keys(wanted))closed(actual[key],wanted[key]);}else assert.equal(actual,wanted);};
 closed(value,expected);return value;
}

function validateModelShape(p,current){
 ordinary(p,['handoffControls','purpose','profile','context','stage','modelOnly','mfAllocated','I0Created','nativeExecuted','offGraphs','supplement','baselineInputs','privateCompileHashes','originalWorldBlob','protectedTestBlob','oracleSha256','worldSha256','transformSha256','sdkFileSha256','sdkBytes','sdkSites','lockBlob','lockSha256','modelGraphs',...FLAGS]);
 validateHandoffControls(p.handoffControls);assert.equal(p.purpose,'afw.post-ack-preflight.syn.v1');assert.equal(p.profile,POST_ACK_PROFILE);assert.deepEqual(p.context,identity(current));assert.equal(p.stage,'MODEL ONLY');assert.equal(p.modelOnly,true);for(const k of [...FLAGS,'mfAllocated','I0Created','nativeExecuted'])assert.equal(p[k],false);
 assert.equal(p.originalWorldBlob,'5fb78c057b7e80260ae683abf4af892767ce110e');assert.equal(p.protectedTestBlob,'533dafb5df5f8e57442c5b9029dc8dec6dded434');assert.equal(p.sdkFileSha256,'bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80');assert.equal(p.sdkBytes,251149);assert.equal(p.sdkSites,44);assert.equal(p.lockBlob,'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b');
 for(const k of ['oracleSha256','worldSha256','transformSha256','sdkFileSha256','lockSha256'])assert(typeof p[k]==='string'&&HASH.test(p[k]));
 validateOffGraphs(p.offGraphs);ordinary(p.supplement,['purpose','profile','context','records','nodeModuleAbsent','businessAuthority']);assert.equal(p.supplement.purpose,'afw.post-ack-supplement.syn.v1');assert.equal(p.supplement.profile,POST_ACK_PROFILE);assert.deepEqual(p.supplement.context,current);assert.equal(p.supplement.nodeModuleAbsent,true);assert.equal(p.supplement.businessAuthority,false);assert.equal(p.supplement.records.length,2);assert.deepEqual(p.supplement.records.map(r=>r.path).sort(),['<stdin>',PHASE].sort());for(const r of p.supplement.records)validateEmissionShape(r,current);
 ordinary(p.modelGraphs,['M','QA']);for(const role of ['M','QA']){const g=p.modelGraphs[role];ordinary(g,['bytes','sha256']);assert(Number.isSafeInteger(g.bytes)&&g.bytes>0&&typeof g.sha256==='string'&&HASH.test(g.sha256));}assert.equal(p.modelGraphs.M.sha256,p.offGraphs.find(g=>g.role==='M').baselineSha256);
 ordinary(p.privateCompileHashes,['phaseSha256','entrySha256','qaMetafileSha256']);for(const value of Object.values(p.privateCompileHashes))assert(typeof value==='string'&&HASH.test(value));assert.equal(p.privateCompileHashes.phaseSha256,p.supplement.records.find(r=>r.path===PHASE).baselineSha256);assert.equal(p.privateCompileHashes.entrySha256,p.supplement.records.find(r=>r.path==='<stdin>').baselineSha256);
 ordinary(p.baselineInputs,['M','QA']);for(const role of ['M','QA']){const list=p.baselineInputs[role];assert(Array.isArray(list)&&list.length>0);assert.equal(new Set(list.map(r=>r.path)).size,list.length);for(const r of list){ordinary(r,['path','bytes','sha256']);ascii(r.path);assert(Number.isSafeInteger(r.bytes)&&r.bytes>0&&typeof r.sha256==='string'&&HASH.test(r.sha256));}}
 return p;
}
async function checkedModel(){
 const current=executionContext(),root=process.env.RUNNER_TEMP+'/afw-post-ack-model-readback',bytes=await readFile(root+'/model.json'),p=validateModelShape(JSON.parse(bytes),current),receipt=JSON.parse(await readFile(process.env.RUNNER_TEMP+'/afw-post-ack-model-receipt.json'));
 ordinary(receipt,['artifactId','uploaderDigest','apiDigest','rawZipSha256','modelSha256','verified','context']);assert.deepEqual(receipt.context,current);assert.equal(receipt.verified,true);assert.equal(receipt.artifactId,process.env.MODEL_ARTIFACT_ID);assert.equal(receipt.uploaderDigest,process.env.MODEL_ARTIFACT_DIGEST);assert(HASH.test(receipt.uploaderDigest));assert.equal(receipt.apiDigest,'sha256:'+receipt.uploaderDigest);assert.equal(receipt.rawZipSha256,receipt.uploaderDigest);assert.equal(receipt.modelSha256,sha(bytes));
 const pins=[['node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js','sdkFileSha256'],['package-lock.json','lockSha256'],['test/fixtures/finite-post-ack-diagnostic.mjs','transformSha256'],['test/fixtures/finite-budget-world.mjs','worldSha256']];
 for(const [path,key]of pins)assert.equal(sha(await readFile(path)),p[key]);
 const test=await readFile('test/mcp-qa-finite-budget-native.test.mjs');assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from('blob '+test.length+'\0'),test])).digest('hex'),p.protectedTestBlob);
 const world=await readFile('test/fixtures/finite-budget-world.mjs','utf8'),a=ast(world,'current-world-pin'),oracle=a.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='qualifyPostAckOriginalR2');assert(oracle);assert.equal(sha(oracle.getText(a)),p.oracleSha256);
 return {model:p,receipt,sha256:sha(bytes)};
}
function modelProjection(p,digest){return {handoffControls:p.handoffControls,purpose:p.purpose,profile:p.profile,stage:p.stage,offGraphs:p.offGraphs,supplement:p.supplement,modelGraphs:p.modelGraphs,privateCompileHashes:p.privateCompileHashes,sdkFileSha256:p.sdkFileSha256,sdkBytes:p.sdkBytes,sdkSites:p.sdkSites,lockBlob:p.lockBlob,lockSha256:p.lockSha256,worldSha256:p.worldSha256,transformSha256:p.transformSha256,protectedTestBlob:p.protectedTestBlob,oracleSha256:p.oracleSha256,preflightSha256:digest};}
function executionContext(){return identity({repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:Number(process.env.GITHUB_RUN_ATTEMPT),case:'R2'});}
async function currentPrograms(){const files=[];for(const path of PROGRAM_PATHS){const b=await readFile(path);files.push({path,bytes:b.length,sha256:sha(b)});}return files;}
async function writeProof(result){
 const context=executionContext(),root='output/finite-budget/post-ack-safe';await mkdir(root,{recursive:true});const bytes=Buffer.from(JSON.stringify(result));assert(bytes.length<=60000);await writeFile(root+'/result.json',bytes);
 const manifest={purpose:'afw.native-post-ack-r2-manifest.safe.v1',context,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]};const m=Buffer.from(JSON.stringify(manifest));assert(m.length+bytes.length<=65536);await writeFile(root+'/manifest.json',m);
}
class ArtifactReadFault extends Error{
 constructor(code){super('artifact_read_'+code);this.name='ArtifactReadFault';this.code=code;}
}
const ARTIFACT_RETRY_STATUS=new Set([404,408,429,500,502,503,504]);
function artifactNeed(value,code='invalid'){if(!value)throw new ArtifactReadFault(code);}
function artifactSpec(kind,safePrefix){
 artifactNeed(['model','safe','cipher'].includes(kind));artifactNeed(['afw-post-ack-contracts-','afw-post-ack-native-safe-'].includes(safePrefix));
 return kind==='model'?{limit:4194304,budget:25000,prefix:'afw-post-ack-model-'}:kind==='safe'?{limit:131072,budget:25000,prefix:safePrefix}:{limit:136314880,budget:60000,prefix:'afw-post-ack-cipher-'};
}
function artifactLocation(text){
 let url;try{url=new URL(text);}catch{throw new ArtifactReadFault('invalid');}
 artifactNeed(url.protocol==='https:'&&!url.username&&!url.password&&!url.hash&&(!url.port||url.port==='443'));
 artifactNeed(url.hostname==='results-receiver.actions.githubusercontent.com'||/^[a-z0-9-]+\.blob\.core\.windows\.net$/.test(url.hostname));artifactNeed(url.pathname.length>1);
 return url.href;
}
function parseArtifactMetadata(bytes){
 artifactNeed(!(bytes.length>=3&&bytes[0]===0xef&&bytes[1]===0xbb&&bytes[2]===0xbf));
 let text,value;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);value=JSON.parse(text);}catch{throw new ArtifactReadFault('invalid');}
 try{
  const tree=ast('('+text+')','artifact-metadata-json'),pending=[tree];let visited=0;
  while(pending.length){const node=pending.pop();artifactNeed(++visited<=8192);if(ts.isObjectLiteralExpression(node)){const seen=new Set();for(const property of node.properties){artifactNeed(ts.isPropertyAssignment(property)&&ts.isStringLiteral(property.name));const key=property.name.text;artifactNeed(!seen.has(key));seen.add(key);}}ts.forEachChild(node,child=>{pending.push(child);});}
 }catch{throw new ArtifactReadFault('invalid');}
 return value;
}
function validateArtifactMetadata(value,request,spec,api){
 const m=value,w=m?.workflow_run,c=request.context;
 artifactNeed(m&&typeof m==='object'&&!Array.isArray(m)&&Number.isSafeInteger(m.id)&&String(m.id)===request.id&&m.expired===false);
 artifactNeed(m.name===spec.prefix+c.run+'-1'&&Number.isSafeInteger(m.size_in_bytes)&&m.size_in_bytes>0&&m.size_in_bytes<=spec.limit);
 artifactNeed(m.digest==='sha256:'+request.digest&&m.url===api&&m.archive_download_url===api+'/zip');
 artifactNeed(w&&typeof w==='object'&&Number.isSafeInteger(w.id)&&String(w.id)===c.run&&w.head_sha===c.source&&w.head_branch===c.ref.slice('refs/heads/'.length));
 for(const key of ['repository_id','head_repository_id'])if(Object.hasOwn(w,key))artifactNeed(w[key]===1347578006);
 if(Object.hasOwn(w,'run_attempt'))artifactNeed(w.run_attempt===1);
 return m;
}
async function readFixedArtifact(request,dependencies={},metadataOnly=false){
 const context=identity(request.context),spec=artifactSpec(request.kind,request.safePrefix);
 artifactNeed(typeof request.id==='string'&&/^[1-9][0-9]{0,19}$/.test(request.id)&&typeof request.digest==='string'&&HASH.test(request.digest));artifactNeed(typeof request.token==='string'&&request.token.length>0&&request.token.length<=8192);
 const deps={fetch:globalThis.fetch,now:()=>performance.now(),setTimer:(fn,ms)=>setTimeout(fn,ms),clearTimer:id=>clearTimeout(id),sleep:ms=>new Promise(resolve=>setTimeout(resolve,ms)),onRecord:()=>{},...dependencies};
 const began=deps.now(),deadline=began+spec.budget,records=[],api='https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/'+request.id;artifactNeed(Number.isFinite(began));
 const remaining=()=>deadline-deps.now();
 function emit(phase,attempt,httpStatus,outcome){
  const row={purpose:'AFW_ARTIFACT_READ/1',kind:request.kind,phase,attempt,httpStatus,elapsedMs:Math.max(0,Math.floor(deps.now()-began)),outcome};
  artifactNeed(Number.isSafeInteger(row.elapsedMs)&&Buffer.byteLength(JSON.stringify(row))<=256);records.push(row);artifactNeed(records.length<=9&&Buffer.byteLength(JSON.stringify(records))<=4096);deps.onRecord(row);
 }
 async function bounded(work,cap){
  artifactNeed(cap>0,'deadline');const controller=new AbortController();let timer;
  const limit=new Promise((_,reject)=>{timer=deps.setTimer(()=>{controller.abort();reject(new ArtifactReadFault('attempt_timeout'));},cap);});
  try{return await Promise.race([work(controller.signal),limit]);}finally{deps.clearTimer(timer);controller.abort();}
 }
 async function body(response,cap){
  const size=response.headers.get('content-length');if(size!==null)artifactNeed(/^[0-9]{1,12}$/.test(size)&&Number(size)<=cap);
  if(!response.body)return Buffer.alloc(0);const reader=response.body.getReader(),parts=[];let bytes=0;
  for(;;){artifactNeed(remaining()>0,'deadline');const next=await reader.read();if(next.done)break;artifactNeed(next.value instanceof Uint8Array);bytes+=next.value.byteLength;artifactNeed(bytes<=cap,'limit');parts.push(Buffer.from(next.value));}
  return Buffer.concat(parts,bytes);
 }
 async function phase(name,url,expected,consume){
  for(let attempt=1;attempt<=3;attempt++){
   let status='network',failure=null,result;
   try{
    artifactNeed(remaining()>0,'deadline');
    result=await bounded(async signal=>{
     const apiRequest=name!=='zip_body';artifactNeed(apiRequest?url===(name==='metadata'?api:api+'/zip'):artifactLocation(url)===url);
     const headers=apiRequest?{Authorization:'Bearer '+request.token,Accept:'application/vnd.github+json'}:{Accept:'application/octet-stream'};
     const response=await deps.fetch(url,{method:'GET',headers,redirect:'manual',signal});const observed=response.status;artifactNeed(Number.isInteger(observed)&&observed>=100&&observed<=599);status=observed;
     if(status!==expected)throw new ArtifactReadFault(ARTIFACT_RETRY_STATUS.has(status)?'retryable_http':'http');
     const value=await consume(response);artifactNeed(remaining()>0,'deadline');return value;
    },Math.min(name==='zip_body'?spec.budget:8000,remaining()));
   }catch(error){failure=error;}
   if(!failure){emit(name,attempt,status,'success');return result;}
   const retryable=!(failure instanceof ArtifactReadFault)||['retryable_http','attempt_timeout'].includes(failure.code);
   if(!retryable){emit(name,attempt,status,failure.code==='deadline'?'deadline':failure.code==='http'?'rejected':'invalid');throw failure;}
   const delay=attempt===1?2000:5000;
   if(remaining()<=0||attempt<3&&delay>=remaining()){emit(name,attempt,status,'deadline');throw new ArtifactReadFault('deadline');}
   if(attempt===3){emit(name,attempt,status,'exhausted');throw new ArtifactReadFault('exhausted');}
   emit(name,attempt,status,'retryable');
   try{await bounded(()=>deps.sleep(delay),remaining());}catch{throw new ArtifactReadFault('deadline');}
   artifactNeed(remaining()>0,'deadline');
  }
  throw new ArtifactReadFault('exhausted');
 }
 let metadataBytes;
 const metadata=await phase('metadata',api,200,async response=>{metadataBytes=await body(response,65536);return validateArtifactMetadata(parseArtifactMetadata(metadataBytes),{...request,context},spec,api);});
 if(metadataOnly)return {metadata,metadataBytes,records};
 const location=await phase('zip_api',api+'/zip',302,async response=>artifactLocation(response.headers.get('location')));
 const zip=await phase('zip_body',location,200,async response=>{const bytes=await body(response,spec.limit);artifactNeed(bytes.length===metadata.size_in_bytes&&sha(bytes)===request.digest,'integrity');return bytes;});
 return {metadata,metadataBytes,zip,records};
}
// These fixed artifacts use single-disk classic ZIP. Python verifies decompression,
// CRCs, file types, JSON and per-file limits after this structural check.
function zipRangeEnd(start,length,limit){
 artifactNeed(Number.isSafeInteger(limit)&&Number.isSafeInteger(start)&&Number.isSafeInteger(length));
 artifactNeed(start>=0&&length>=0&&start<=limit&&length<=limit-start);
 return start+length;
}
function zipBoundary(end,next){
 artifactNeed(Number.isSafeInteger(end)&&end>=0&&end===next);
}
function zipTupleMatches(actual,expected){
 return actual.length===expected.length&&actual.every((value,index)=>value===expected[index]);
}
function checkArtifactZip(bytes,kind){
 const names={safe:['manifest.json','result.json'],model:['budget-artifact.json','model.json'],cipher:['envelope.bin','manifest.json','receipt.json']}[kind];
 artifactNeed(names&&Buffer.isBuffer(bytes));
 const eof=bytes.length,eocd=eof-22;
 const u16=at=>bytes.readUInt16LE(at),u32=at=>bytes.readUInt32LE(at);
 const tuple=at=>[u32(at),u32(at+4),u32(at+8)];
 function extras(begin,end){
  let cursor=begin;
  while(cursor<end){
   zipRangeEnd(cursor,4,end);
   artifactNeed(u16(cursor)!==1); // ZIP64 needs a different validated layout.
   cursor=zipRangeEnd(cursor+4,u16(cursor+2),end);
  }
  zipBoundary(cursor,end);
 }
 zipBoundary(zipRangeEnd(eocd,22,eof),eof);
 artifactNeed(u32(eocd)===0x06054b50&&u16(eocd+4)===0&&u16(eocd+6)===0&&u16(eocd+20)===0);
 artifactNeed(u16(eocd+8)===names.length&&u16(eocd+10)===names.length);
 const central=u32(eocd+16);
 zipBoundary(zipRangeEnd(central,u32(eocd+12),eocd),eocd);
 const members=[],remaining=new Set(names);
 let cursor=central;
 for(let i=0;i<names.length;i++){
  zipRangeEnd(cursor,46,eocd);artifactNeed(u32(cursor)===0x02014b50);
  const nameStart=cursor+46,nameEnd=zipRangeEnd(nameStart,u16(cursor+28),eocd);
  const extraEnd=zipRangeEnd(nameEnd,u16(cursor+30),eocd);
  const recordEnd=zipRangeEnd(extraEnd,u16(cursor+32),eocd);
  const nameBytes=bytes.subarray(nameStart,nameEnd),name=nameBytes.toString('utf8');
  artifactNeed(remaining.delete(name)&&Buffer.from(name).equals(nameBytes));
  extras(nameEnd,extraEnd);
  const flags=u16(cursor+8),method=u16(cursor+10),sizes=tuple(cursor+16),local=u32(cursor+42);
  artifactNeed(u16(cursor+34)===0&&(method===0||method===8));
  artifactNeed((flags&~(method===8?0x080e:0x0808))===0);
  artifactNeed(sizes[1]!==0xffffffff&&sizes[2]!==0xffffffff&&local!==0xffffffff);
  if(method===0)artifactNeed(sizes[1]===sizes[2]);
  members.push({local,nameBytes,sizes,flags,method,version:u16(cursor+6),time:u32(cursor+12)});
  cursor=recordEnd;
 }
 zipBoundary(cursor,eocd);
 members.sort((a,b)=>a.local-b.local);
 let previousEnd=0;
 for(const member of members){
  const {local,nameBytes,sizes,flags,method,version,time}=member;
  zipBoundary(previousEnd,local);zipRangeEnd(local,30,central);
  artifactNeed(u32(local)===0x04034b50&&u16(local+4)===version&&u16(local+6)===flags&&u16(local+8)===method&&u32(local+10)===time);
  const localSizes=tuple(local+14),descriptor=(flags&8)!==0;
  artifactNeed(localSizes.every((v,i)=>v===sizes[i]||(descriptor&&v===0)));
  const nameStart=local+30,nameEnd=zipRangeEnd(nameStart,u16(local+26),central);
  artifactNeed(bytes.subarray(nameStart,nameEnd).equals(nameBytes));
  const dataStart=zipRangeEnd(nameEnd,u16(local+28),central);
  extras(nameEnd,dataStart);
  previousEnd=zipRangeEnd(dataStart,sizes[1],central);
  if(descriptor){
   const at=previousEnd;
   zipRangeEnd(at,12,central);
   const bare=zipTupleMatches(tuple(at),sizes);
   const signed=u32(at)===0x08074b50&&central-at>=16&&zipTupleMatches(tuple(at+4),sizes);
   artifactNeed(bare!==signed);
   previousEnd=zipRangeEnd(at,signed?16:12,central);
  }
 }
 zipBoundary(previousEnd,central);
}

function runZipRangeControls(){
 // Complete, valid two-file archives of '{}' in both members.
 const examples={
  "stored": "UEsDBBQAAAAAAAAAIQBDv6ajAgAAAAIAAAANAAAAbWFuaWZlc3QuanNvbnt9UEsDBBQAAAAAAAAAIQBDv6ajAgAAAAIAAAALAAAAcmVzdWx0Lmpzb257fVBLAQIUABQAAAAAAAAAIQBDv6ajAgAAAAIAAAANAAAAAAAAAAAAAAAAAAAAAABtYW5pZmVzdC5qc29uUEsBAhQAFAAAAAAAAAAhAEO/pqMCAAAAAgAAAAsAAAAAAAAAAAAAAAAALQAAAHJlc3VsdC5qc29uUEsFBgAAAAACAAIAdAAAAFgAAAAAAA==",
  "signed": "UEsDBBQACAAIAAAAIQAAAAAAAAAAAAAAAAANAAAAbWFuaWZlc3QuanNvbquuBQBQSwcIQ7+mowQAAAACAAAAUEsDBBQACAAIAAAAIQAAAAAAAAAAAAAAAAALAAAAcmVzdWx0Lmpzb26rrgUAUEsHCEO/pqMEAAAAAgAAAFBLAQIUABQACAAIAAAAIQBDv6ajBAAAAAIAAAANAAAAAAAAAAAAAAAAAAAAAABtYW5pZmVzdC5qc29uUEsBAhQAFAAIAAgAAAAhAEO/pqMEAAAAAgAAAAsAAAAAAAAAAAAAAAAAPwAAAHJlc3VsdC5qc29uUEsFBgAAAAACAAIAdAAAAHwAAAAAAA==",
  "unsigned": "UEsDBBQACAAIAAAAIQAAAAAAAAAAAAAAAAANAAAAbWFuaWZlc3QuanNvbquuBQBDv6ajBAAAAAIAAABQSwMEFAAIAAgAAAAhAAAAAAAAAAAAAAAAAAsAAAByZXN1bHQuanNvbquuBQBDv6ajBAAAAAIAAABQSwECFAAUAAgACAAAACEAQ7+mowQAAAACAAAADQAAAAAAAAAAAAAAAAAAAAAAbWFuaWZlc3QuanNvblBLAQIUABQACAAIAAAAIQBDv6ajBAAAAAIAAAALAAAAAAAAAAAAAAAAADsAAAByZXN1bHQuanNvblBLBQYAAAAAAgACAHQAAAB0AAAAAAA="
};
 for(const encoded of Object.values(examples))checkArtifactZip(Buffer.from(encoded,'base64'),'safe');
 const rejectsInvalid={code:'invalid'};
 const boundaries=[
  ['initial_offset',0,2],['inter_member_gap',17,19],['final_gap',31,34],
  ['overlap',18,16],['central_mismatch',72,71],['trailing',84,86]
 ];
 for(const [,end,next] of boundaries)assert.throws(()=>zipBoundary(end,next),rejectsInvalid);
 const bounds=[['truncated_descriptor',11,12,21],['negative_offset',-1,1,9],['unsafe_extent',0,Number.MAX_SAFE_INTEGER+1,99]];
 for(const [,start,length,limit] of bounds)assert.throws(()=>zipRangeEnd(start,length,limit),rejectsInvalid);
 assert.equal(zipTupleMatches([41,10,22],[41,11,22]),false);
 console.info(JSON.stringify({purpose:'AFW_POST_ACK_ZIP_COVERAGE_CONTROLS/1',validByteFormats:Object.keys(examples),numericRejects:[...boundaries,...bounds].map(([name])=>name),descriptorTupleMismatch:true}));
}

async function fetchArtifactFromEnvironment(){
 const kind=process.env.ARTIFACT_KIND,id=process.env.ARTIFACT_ID,digest=process.env.ARTIFACT_DIGEST,safePrefix=process.env.SAFE_ARTIFACT_PREFIX??'afw-post-ack-contracts-';
 const result=await readFixedArtifact({kind,id,digest,safePrefix,context:executionContext(),token:process.env.GITHUB_TOKEN},{onRecord:record=>console.info(JSON.stringify(record))});
 checkArtifactZip(result.zip,kind);
 const root=process.env.RUNNER_TEMP;artifactNeed(typeof root==='string'&&root.length>0);
 await writeFile(root+'/afw-'+kind+'-meta.json',result.metadataBytes,{flag:'wx',mode:0o600});await writeFile(root+'/afw-'+kind+'.zip',result.zip,{flag:'wx',mode:0o600});await writeFile(root+'/afw-'+kind+'-read-trace.json',JSON.stringify(result.records),{flag:'wx',mode:0o600});
}

async function runArtifactReadControls(){
 const context=syntheticContext(),payload=Buffer.from('SYN fixed artifact body'),digest=sha(payload),token='SYN_ARTIFACT_TOKEN_DO_NOT_LOG',location='https://results-receiver.actions.githubusercontent.com/SYN?sig=DO_NOT_LOG';
 const metadata=()=>({id:7,name:'afw-post-ack-model-1-1',size_in_bytes:payload.length,digest:'sha256:'+digest,expired:false,url:'https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/7',archive_download_url:'https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/7/zip',workflow_run:{id:1,repository_id:1347578006,head_repository_id:1347578006,head_branch:'feat/finite-native-cleanup-20261101',head_sha:context.source}});
 const cases=[];
 async function scenario(name,configure,expected){
  let now=0,nextTimer=0;const timers=new Map(),waits=[],calls=[],records=[],counts={metadata:0,zip_api:0,zip_body:0};
  const advance=ms=>{const target=now+ms;for(;;){const due=[...timers].filter(([,timer])=>timer.at<=target).sort((a,b)=>a[1].at-b[1].at)[0];if(!due)break;now=due[1].at;timers.delete(due[0]);due[1].fn();}now=target;};
  const deps={now:()=>now,setTimer:(fn,ms)=>{const id=++nextTimer;timers.set(id,{at:now+ms,fn});return id;},clearTimer:id=>timers.delete(id),sleep:async ms=>{waits.push(ms);advance(ms);},onRecord:row=>records.push(row),fetch:async(url,options)=>{
   const phase=url.endsWith('/7')?'metadata':url.endsWith('/7/zip')?'zip_api':'zip_body';counts[phase]++;calls.push({phase,url,authorization:Object.hasOwn(options.headers,'Authorization'),redirect:options.redirect});
   assert.equal(options.method,'GET');assert.equal(options.redirect,'manual');if(phase==='zip_body')assert.equal(Object.hasOwn(options.headers,'Authorization'),false);else assert.equal(options.headers.Authorization,'Bearer '+token);
   const changed=configure?.({phase,attempt:counts[phase],advance,metadata:metadata(),payload,location});if(changed instanceof Error)throw changed;if(changed)return changed;
   return phase==='metadata'?new Response(JSON.stringify(metadata()),{status:200}):phase==='zip_api'?new Response(null,{status:302,headers:{location}}):new Response(payload,{status:200});
  }};
  let result,error;try{result=await readFixedArtifact({kind:'model',id:'7',digest,context,token,safePrefix:'afw-post-ack-contracts-'},deps);}catch(caught){error=caught;}
  if(expected.error){assert(error instanceof ArtifactReadFault);assert.equal(error.code,expected.error);}else{assert.equal(error,undefined);assert(result.zip.equals(payload));}
  if(expected.counts)assert.deepEqual(counts,expected.counts);if(expected.waits)assert.deepEqual(waits,expected.waits);if(expected.elapsed!==undefined)assert.equal(now,expected.elapsed);
  for(const row of records){ordinary(row,['purpose','kind','phase','attempt','httpStatus','elapsedMs','outcome']);assert.equal(row.purpose,'AFW_ARTIFACT_READ/1');assert(['metadata','zip_api','zip_body'].includes(row.phase));assert(row.attempt>=1&&row.attempt<=3&&Number.isSafeInteger(row.elapsedMs)&&row.elapsedMs>=0);assert(Buffer.byteLength(JSON.stringify(row))<=256);}
  assert(records.length<=9);const encoded=JSON.stringify(records);assert(encoded.length<=4096&&!encoded.includes(token)&&!encoded.includes(location)&&!encoded.includes('https://')&&!encoded.includes('Authorization')&&!encoded.includes('stack'));
  assert(calls.filter(c=>c.phase==='zip_body').every(c=>c.authorization===false));assert(calls.filter(c=>c.phase!=='zip_body').every(c=>c.url==='https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/7'+(c.phase==='zip_api'?'/zip':'')));
  cases.push({name,passed:true,counts,waits,elapsedMs:now,terminal:error?.code??'success',records});
 }
 for(const selected of ['metadata','zip_api','zip_body'])await scenario(selected+'_404_then_success',({phase,attempt})=>phase===selected&&attempt===1?new Response(null,{status:404}):null,{counts:{metadata:selected==='metadata'?2:1,zip_api:selected==='zip_api'?2:1,zip_body:selected==='zip_body'?2:1},waits:[2000],elapsed:2000});
 for(const status of [408,429,500,502,503,504])await scenario('retryable_'+status+'_then_success',({phase,attempt})=>phase==='metadata'&&attempt===1?new Response(null,{status}):null,{counts:{metadata:2,zip_api:1,zip_body:1},waits:[2000],elapsed:2000});
 await scenario('network_then_success',({phase,attempt})=>phase==='metadata'&&attempt===1?Error('SYN bounded network'):null,{counts:{metadata:2,zip_api:1,zip_body:1},waits:[2000],elapsed:2000});
 await scenario('exhaustion_three_reads',({phase})=>phase==='metadata'?new Response(null,{status:404}):null,{error:'exhausted',counts:{metadata:3,zip_api:0,zip_body:0},waits:[2000,5000],elapsed:7000});
 await scenario('deadline_no_reset',({phase,advance})=>{advance(phase==='zip_body'?11000:7000);return null;},{error:'deadline',counts:{metadata:1,zip_api:1,zip_body:1},waits:[],elapsed:25000});
 await scenario('deadline_fewer_attempts',({phase,advance})=>{if(phase==='metadata'){advance(24000);return new Response(null,{status:404});}return null;},{error:'deadline',counts:{metadata:1,zip_api:0,zip_body:0},waits:[],elapsed:24000});
 await scenario('403_immediate',()=>new Response(null,{status:403}),{error:'http',counts:{metadata:1,zip_api:0,zip_body:0},waits:[],elapsed:0});
 await scenario('501_not_retryable',()=>new Response(null,{status:501}),{error:'http',counts:{metadata:1,zip_api:0,zip_body:0},waits:[],elapsed:0});
 for(const mutate of [m=>m.id=8,m=>m.name='afw-post-ack-model-1-2',m=>m.expired=true,m=>m.workflow_run.id=2,m=>m.workflow_run.head_sha='f'.repeat(40),m=>m.workflow_run.repository_id=1,m=>m.digest='sha256:'+'f'.repeat(64)]){
  await scenario('invalid_metadata_immediate',({phase,metadata:m})=>{if(phase==='metadata'){mutate(m);return new Response(JSON.stringify(m),{status:200});}return null;},{error:'invalid',counts:{metadata:1,zip_api:0,zip_body:0},waits:[],elapsed:0});
 }
 await scenario('malformed_metadata_immediate',({phase})=>phase==='metadata'?new Response('{',{status:200}):null,{error:'invalid',counts:{metadata:1,zip_api:0,zip_body:0},waits:[],elapsed:0});
 await scenario('duplicate_metadata_immediate',({phase,metadata:m})=>phase==='metadata'?new Response(JSON.stringify(m).replace('{"id":7,','{"id":7,"id":7,'),{status:200}):null,{error:'invalid',counts:{metadata:1,zip_api:0,zip_body:0},waits:[],elapsed:0});
 await scenario('raw_digest_immediate',({phase})=>phase==='zip_body'?new Response(Buffer.from('BAD fixed artifact body'),{status:200}):null,{error:'integrity',counts:{metadata:1,zip_api:1,zip_body:1},waits:[],elapsed:0});
 for(const invalid of ['http://results-receiver.actions.githubusercontent.com/SYN','https://user:pass@results-receiver.actions.githubusercontent.com/SYN','https://foreign.invalid/SYN','https://results-receiver.actions.githubusercontent.com/SYN#fragment']){
  await scenario('invalid_redirect_immediate',({phase})=>phase==='zip_api'?new Response(null,{status:302,headers:{location:invalid}}):null,{error:'invalid',counts:{metadata:1,zip_api:1,zip_body:0},waits:[],elapsed:0});
 }
 const summary={purpose:'AFW_ARTIFACT_READ_CONTROLS/1',passed:true,scenarios:cases.length,threePhases:true,sharedDeadlineMs:25000,attemptLimit:3,waitScheduleMs:[2000,5000],noCredentialForwarding:true,noPrivateLogs:true,cases:cases.map(({records,...record})=>({...record,phaseEvidence:records.map(r=>({phase:r.phase,attempt:r.attempt,httpStatus:r.httpStatus,outcome:r.outcome,elapsedMs:r.elapsedMs}))}))};
 assert(Buffer.byteLength(JSON.stringify(summary))<=16384);console.info(JSON.stringify(summary));return summary;
}

async function contractsProof(){
 assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const context=executionContext(),controls=JSON.parse(await readFile('output/finite-budget/post-ack-private/controls.json')),checked=await checkedModel();validateControlRecord(controls);
 const related=JSON.parse(await readFile('output/finite-budget/pure/controls.json'));assert.equal(related.passed,true);assert.deepEqual(related.groups.map(g=>g.group),['F1','F2','F3','F4','F5','F6','F7','F8']);
 const tap=await readFile('output/finite-budget/post-ack-private/related.tap','utf8'),count=name=>{const hits=[...tap.matchAll(new RegExp('^# '+name+' ([0-9]+)$','gm'))];assert.equal(hits.length,1);return Number(hits[0][1]);},pureTests={tests:count('tests'),pass:count('pass'),fail:count('fail'),skipped:count('skipped'),cancelled:count('cancelled'),tapSha256:sha(tap)};assert(pureTests.tests>0&&pureTests.pass===pureTests.tests&&pureTests.fail===0&&pureTests.skipped===0&&pureTests.cancelled===0);
 await writeProof({purpose:'afw.post-ack-contracts.safe.v1',context,controls,programs:await currentPrograms(),preflight:modelProjection(checked.model,checked.sha256),modelReceipt:checked.receipt,oracle:oracleControls(await readFile('test/fixtures/finite-budget-world.mjs','utf8'),checked.model.handoffControls),related:{purpose:related.purpose,groups:related.groups.map(g=>({group:g.group,passed:g.passed,evidence:g.evidence,caseCount:g.caseCount})),passed:true,pureTests},...Object.fromEntries(FLAGS.map(k=>[k,false])),nativeExecuted:false,mfAllocated:false,I0Created:false});
}
function validateContractsProof(r,context,programs,checked){
  ordinary(r,['purpose','context','controls','programs','preflight','modelReceipt','oracle','related',...FLAGS,'nativeExecuted','mfAllocated','I0Created']);assert.equal(r.purpose,'afw.post-ack-contracts.safe.v1');assert.deepEqual(r.context,context);assert.deepEqual(r.programs,programs);validateControlRecord(r.controls);assert.deepEqual(r.preflight,modelProjection(checked.model,checked.sha256));assert.deepEqual(r.modelReceipt,checked.receipt);
  ordinary(r.oracle,['protectedTestBlob','assertionInventory','negativeFamilies','allRejected','oracleSha256','outcomeIsolation']);ordinary(r.oracle.outcomeIsolation,['knownSuccessNormal','primaryRejectionSame','qualificationErrorSame','preMfUnavailable','futureJobStartRejected']);for(const value of Object.values(r.oracle.outcomeIsolation))assert.equal(value,true);assert.equal(r.oracle.protectedTestBlob,checked.model.protectedTestBlob);assert.equal(r.oracle.oracleSha256,checked.model.oracleSha256);assert.equal(r.oracle.assertionInventory,21);assert.equal(r.oracle.negativeFamilies,21);assert.equal(r.oracle.allRejected,true);
  ordinary(r.related,['purpose','groups','passed','pureTests']);assert.equal(r.related.purpose,'afw.closed-pure-controls.syn.v2');assert.equal(r.related.passed,true);assert.deepEqual(r.related.groups.map(g=>g.group),['F1','F2','F3','F4','F5','F6','F7','F8']);for(const g of r.related.groups){ordinary(g,['group','passed','evidence','caseCount']);assert.equal(g.passed,true);assert(Number.isSafeInteger(g.caseCount)&&g.caseCount>0);ordinary(g.evidence,['bytes','sha256']);assert(Number.isSafeInteger(g.evidence.bytes)&&g.evidence.bytes>0&&HASH.test(g.evidence.sha256));}
  const t=r.related.pureTests;ordinary(t,['tests','pass','fail','skipped','cancelled','tapSha256']);assert(Number.isSafeInteger(t.tests)&&t.tests>0);assert.equal(t.pass,t.tests);for(const k of ['fail','skipped','cancelled'])assert.equal(t[k],0);assert(HASH.test(t.tapSha256));
  for(const f of [...FLAGS,'nativeExecuted','mfAllocated','I0Created'])assert.equal(r[f],false);
}
async function verifyProof(native){
 assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);const root=process.env.RUNNER_TEMP+'/afw-post-ack-proof',raw=await readFile(root+'/result.json'),mraw=await readFile(root+'/manifest.json'),m=JSON.parse(mraw),context=executionContext(),checked=await checkedModel();
 ordinary(m,['purpose','context','files']);assert.equal(m.purpose,'afw.native-post-ack-r2-manifest.safe.v1');assert.deepEqual(m.context,context);assert.equal(m.files.length,1);ordinary(m.files[0],['path','bytes','sha256']);assert.equal(m.files[0].path,'result.json');assert.equal(m.files[0].bytes,raw.length);assert.equal(m.files[0].sha256,sha(raw));assert(raw.length+mraw.length<=65536);const r=JSON.parse(raw);
 if(native){
  validatePostAckResult(r,context);requireQualifiedNativeResult(r);
  const p=checked.model;assert.equal(r.provenance.sdkFileSha256,p.sdkFileSha256);assert.equal(r.provenance.lockSha256,p.lockSha256);assert.equal(r.provenance.transformSha256,p.transformSha256);assert.equal(r.provenance.preflightSha256,checked.sha256);
  assert.equal(r.custody.artifactId,process.env.CIPHER_ARTIFACT_ID);assert.equal(r.custody.zipSha256,process.env.CIPHER_ARTIFACT_DIGEST);assert.equal(process.env.ORIGINAL_COMMAND_OUTCOME,r.originalR2Outcome==='passed'?'success':'failure');
  const metadata=await artifactMetadata(r.custody.artifactId);assert.equal(metadata.name,'afw-post-ack-cipher-'+context.run+'-1');assert.equal(metadata.digest,'sha256:'+process.env.CIPHER_ARTIFACT_DIGEST);assert.equal(r.custody.observationSha256,observationHash(r));
 }else{
  validateContractsProof(r,context,await currentPrograms(),checked);
 }
 console.info(JSON.stringify({purpose:'afw.post-ack-independent-verdict.safe.v1',context,nativeCertificate:native,valid:true,modelArtifactId:checked.receipt.artifactId,modelSha256:checked.sha256,operationalReadiness:false,completePackage:false,PCoff:false}));
}
async function artifactMetadata(id){
 const result=await readFixedArtifact({kind:'cipher',id,digest:process.env.CIPHER_ARTIFACT_DIGEST,context:executionContext(),token:process.env.GITHUB_TOKEN,safePrefix:'afw-post-ack-native-safe-'},{onRecord:record=>console.info(JSON.stringify(record))},true);return result.metadata;
}
async function currentCipherMetadata(id){
 const bytes=await readFile(process.env.RUNNER_TEMP+'/afw-cipher-meta.json');artifactNeed(bytes.length<=65536);
 const receipt=JSON.parse(await readFile(process.env.RUNNER_TEMP+'/afw-cipher-download-check.json'));ordinary(receipt,['artifactId','uploaderDigest','apiDigest','rawZipSha256']);artifactNeed(receipt.artifactId===id&&receipt.uploaderDigest===process.env.CIPHER_ARTIFACT_DIGEST&&receipt.apiDigest==='sha256:'+receipt.uploaderDigest&&receipt.rawZipSha256===receipt.uploaderDigest);
 const request={kind:'cipher',id,digest:process.env.CIPHER_ARTIFACT_DIGEST,context:executionContext(),safePrefix:'afw-post-ack-native-safe-'};
 return validateArtifactMetadata(parseArtifactMetadata(bytes),request,artifactSpec('cipher',request.safePrefix),'https://api.github.com/repos/'+REPOSITORY+'/actions/artifacts/'+id);
}
function nativeSealEligible(manifest){return manifest.mfAttached===true&&manifest.preallocationBlocked===false;}
async function sealNative(){
 const {cp}=await import('node:fs/promises'),{join}=await import('node:path'),{sealDirectory}=await import('./finite-checkpoint-custody.mjs');const root=join(process.env.RUNNER_TEMP,'afw-post-ack-native'),payload=join(root,'payload');
 await mkdir(payload,{recursive:true});const privateRoot='output/finite-budget/post-ack-private';let manifest;
 try{manifest=JSON.parse(await readFile(privateRoot+'/job-manifest.json'));}catch{return;}
 assert.deepEqual(manifest.context,executionContext());assert.equal(manifest.diagnosticOnly,true);assert.deepEqual(manifest.cases,['R2']);if(!nativeSealEligible(manifest))return;
 await cp('output',join(payload,'output'),{recursive:true,errorOnExist:true,force:false});await cp(join(root,'logs'),join(payload,'logs'),{recursive:true,errorOnExist:true,force:false});
 const kind=manifest.originalR2Outcome==='passed'?'readonly-result':'consumer-failure';assert.equal(manifest.kind,kind);
 const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:REPOSITORY,ref:REF,sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind};
 await sealDirectory({sourceDir:payload,stagingDir:join(root,'cipher'),context});
 await writeFile(join(root,'kind.txt'),kind);
}
async function reopenNative(){
 const {join}=await import('node:path'),{openDirectory}=await import('./finite-checkpoint-custody.mjs'),root=join(process.env.RUNNER_TEMP,'afw-post-ack-native'),kind=(await readFile(join(root,'kind.txt'),'utf8')).trim(),id=process.env.CIPHER_ARTIFACT_ID,metadata=await currentCipherMetadata(id);
 assert.equal(metadata.name,'afw-post-ack-cipher-'+process.env.GITHUB_RUN_ID+'-1');
 const zip=await readFile(join(root,'cipher.zip'));assert.equal('sha256:'+sha(zip),metadata.digest);assert.equal(sha(zip),process.env.CIPHER_ARTIFACT_DIGEST);
 const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:REPOSITORY,ref:REF,sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind};
 await openDirectory({stagingDir:join(root,'download'),destinationDir:join(root,'opened'),context});
 const original=JSON.parse(await readFile('output/finite-budget/post-ack-private/observation.json')),restored=JSON.parse(await readFile(join(root,'opened/output/finite-budget/post-ack-private/observation.json'))),manifest=JSON.parse(await readFile(join(root,'opened/output/finite-budget/post-ack-private/job-manifest.json')));
 assert.deepEqual(original,restored);validatePostAckResult(restored,executionContext());assert.deepEqual(manifest.context,executionContext());assert.equal(manifest.originalR2Outcome,restored.originalR2Outcome);assert.equal(manifest.kind,kind);
 assert.notEqual(restored.originalR2Outcome,'unavailable');await writeFile(join(root,'reopen.json'),JSON.stringify({status:'verified',artifactId:id,zipSha256:sha(zip),observationSha256:observationHash(restored),reopenVerified:true}));
}
function validateReopenReceipt(custody, observation){
 ordinary(custody,['status','artifactId','zipSha256','observationSha256','reopenVerified']);
 assert.equal(custody.status,'verified');
 assert.equal(typeof custody.artifactId,'string');assert(/^[1-9][0-9]*$/.test(custody.artifactId));
 assert.equal(typeof custody.zipSha256,'string');assert(HASH.test(custody.zipSha256));
 assert.equal(custody.observationSha256,observationHash(observation));
 assert.equal(custody.reopenVerified,true);
}

function requireQualifiedNativeResult(result){
 assert.equal(result.custody.status,'verified','public diagnostic custody unavailable');
 assert.equal(result.provenance.status,'verified');
 assert(['observed','not_observed'].includes(result.status));
}

async function nativeProof(){
 const context=executionContext();
 let result;
 try{result=JSON.parse(await readFile('output/finite-budget/post-ack-private/observation.json'));}
 catch(error){
  if(error.code!=='ENOENT')throw error;
  result=selectPostAckCertificate({snapshots:[],mountedProvenance:null,originalR2Outcome:'unavailable',context});
 }
 validatePostAckResult(result,context);
 assert.deepEqual(result.custody,unavailableCustody());
 let receipt;
 try{receipt=JSON.parse(await readFile(process.env.RUNNER_TEMP+'/afw-post-ack-native/reopen.json'));}
 catch(error){if(error.code!=='ENOENT')throw error;}
 if(receipt!==undefined&&result.originalR2Outcome!=='unavailable'){
  validateReopenReceipt(receipt,result);
  if(result.provenance.status==='verified')result={...result,custody:receipt};
 }
 validatePostAckResult(result,context);
 await writeProof(result);
 requireQualifiedNativeResult(result);
}

async function runNativePublicationControls(observed,handoff){
 assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
 validateHandoffControls(handoff);
 const {mkdtemp,readdir,rm}=await import('node:fs/promises');
 const {join}=await import('node:path');
 const previousCwd=process.cwd(),prior=Object.fromEntries(['RUNNER_TEMP','GITHUB_SHA','GITHUB_RUN_ID'].map(k=>[k,process.env[k]]));
 const evidence=[];
 const context=syntheticContext();
 const unavailable=outcome=>selectPostAckCertificate({snapshots:[],mountedProvenance:null,originalR2Outcome:outcome,context});
 const receiptFor=value=>({status:'verified',artifactId:'1',zipSha256:'0'.repeat(64),observationSha256:observationHash(value),reopenVerified:true});
 const successful=await simulate();
 const normal=selectSynthetic(successful.snapshot,{originalR2Outcome:'passed'});
 const cases=[
  ['cleanup_rejected',unavailable(handoff.variants[0].outcome),false],
  ['persistence_rejected',unavailable(handoff.variants[2].outcome),false],
  ['unknown_original',unavailable('unavailable'),false],
  ['missing_observation',null,false],
  ['qualified_observed',observed,true],
  ['qualified_not_observed',normal,true]
 ];
 const root=await mkdtemp(join(prior.RUNNER_TEMP,'afw-publication-control-'));
 try{
  process.env.GITHUB_SHA=context.source;process.env.GITHUB_RUN_ID=context.run;
  assert.deepEqual(executionContext(),context);
  for(const [name,observation,qualified] of cases){
   const work=join(root,name),privateDir=join(work,'output/finite-budget/post-ack-private'),reopenDir=join(work,'afw-post-ack-native');
   await mkdir(privateDir,{recursive:true});await mkdir(reopenDir);
   process.chdir(work);process.env.RUNNER_TEMP=work;
   const expected=observation??unavailable('unavailable');
   if(observation)await writeFile(join(privateDir,'observation.json'),JSON.stringify(observation));
   const receipt=receiptFor(observation??observed);
   const reopened=join(reopenDir,'reopen.json');await writeFile(reopened,JSON.stringify(receipt));
   if(qualified)await nativeProof();
   else await assert.rejects(nativeProof,error=>error.code==='ERR_ASSERTION'&&error.message.includes('public diagnostic custody unavailable'));
   assert.deepEqual(JSON.parse(await readFile(reopened)),receipt);
   const out='output/finite-budget/post-ack-safe';
   assert.deepEqual((await readdir(out)).sort(),['manifest.json','result.json']);
   const raw=await readFile(out+'/result.json'),manifest=await readFile(out+'/manifest.json');
   const wanted={...expected,custody:qualified?receipt:unavailableCustody()};
   assert.deepEqual(raw,Buffer.from(JSON.stringify(wanted)));
   assert.deepEqual(manifest,Buffer.from(JSON.stringify({purpose:'afw.native-post-ack-r2-manifest.safe.v1',context,files:[{path:'result.json',bytes:raw.length,sha256:sha(raw)}]})));
   assert(raw.length+manifest.length<=65536);
   const published=validatePostAckResult(JSON.parse(raw),context);
   if(qualified){
    requireQualifiedNativeResult(published);
    assert.equal(published.custody.observationSha256,observationHash(expected));
    if(name==='qualified_observed')assert.equal(published.custody.observationSha256,'47a77ac116e8d5514defb5fa615de87bf01e16968d30254a8754f389be59a005');
   }else{
    assert.throws(()=>requireQualifiedNativeResult(published));
    assert.equal(published.status,'unavailable');assert.equal(published.provenance.status,'unavailable');
    assert.equal(published.quality,'incomplete');assert.deepEqual(published.custody,unavailableCustody());
   }
   evidence.push({name,outcome:published.originalR2Outcome,status:published.status,qualified,resultBytes:raw.length,resultSha256:sha(raw),manifestBytes:manifest.length,manifestSha256:sha(manifest)});
  }
  const valid=receiptFor(observed);
  for(const [name,bad] of [['malformed_receipt',{...valid,unexpected:true}],['wrong_observation_digest',{...valid,observationSha256:'f'.repeat(64)}]]){
   const work=join(root,name);await mkdir(join(work,'output/finite-budget/post-ack-private'),{recursive:true});await mkdir(join(work,'afw-post-ack-native'));
   process.chdir(work);process.env.RUNNER_TEMP=work;
   await writeFile('output/finite-budget/post-ack-private/observation.json',JSON.stringify(observed));
   await writeFile('afw-post-ack-native/reopen.json',JSON.stringify(bad));
   await assert.rejects(nativeProof,{code:'ERR_ASSERTION'});
   await assert.rejects(readdir('output/finite-budget/post-ack-safe'),{code:'ENOENT'});
  }
 }finally{
  process.chdir(previousCwd);
  for(const [key,value] of Object.entries(prior)){if(value===undefined)delete process.env[key];else process.env[key]=value;}
  await rm(root,{recursive:true,force:true});
 }
 console.info(JSON.stringify({purpose:'AFW_POST_ACK_PUBLICATION_CONTROLS/1',cases:evidence,malformedReceiptsRejected:2}));
}
if(process.argv[1]&&process.argv[1].replaceAll('\\','/').endsWith('/finite-post-ack-diagnostic.mjs')){
 const [command]=process.argv.slice(2);
 try{
  if(command==='read-artifact')await fetchArtifactFromEnvironment();
  else if(command==='contracts-proof')await contractsProof();
  else if(command==='verify-contracts')await verifyProof(false);
  else if(command==='verify-native')await verifyProof(true);
  else if(command==='seal-native')await sealNative();
  else if(command==='reopen-native')await reopenNative();
  else if(command==='native-proof')await nativeProof();
  else throw Error('unsupported fixed diagnostic command');
 }catch{console.error('post_ack_closed_command_failed');process.exitCode=1;}
}
