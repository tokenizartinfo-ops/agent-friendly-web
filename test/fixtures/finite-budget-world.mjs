import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,relative,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';


const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const METHODS=new Set(['get','put','list','delete','first','all','run','exec','batch','transaction','sync','getAlarm','setAlarm','deleteAlarm','fetch','read','cancel']);
const label=text=>text.replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g,'[literal]');
function nearest(node){
 for(let n=node.parent;n;n=n.parent)if(ts.isFunctionDeclaration(n)||ts.isFunctionExpression(n)||ts.isArrowFunction(n)||ts.isMethodDeclaration(n)||ts.isConstructorDeclaration(n)||ts.isGetAccessorDeclaration(n)||ts.isSetAccessorDeclaration(n)){
  const name=n.name?.getText();if(name)return name;
  if(ts.isVariableDeclaration(n.parent))return n.parent.name.getText();
  if(ts.isCallExpression(n.parent))return 'callback:'+n.parent.expression.getText();
  return 'anonymous';
 }
 return 'module';
}
function decision(receiver,method,target){
 const joined=receiver+' '+target;
 if(/^(?:Promise|Math|Object|Reflect|JSON|Array|Buffer|String|Number|Date|console)$/.test(receiver))return ['excluded','pure-language-or-aggregation'];
 if(/(?:WeakMap|WeakSet|Map|Set)/.test(joined)||/^(?:roots|rootHandles|children|childHandles|operations|groups|scopes|results|receipts|reductions|requestContexts|stageAdmissions|outstanding|requestEntries|cache|map|maps|handlers|headers|form|params|searchParams)$/.test(receiver)||/\.headers$|\.searchParams$/.test(receiver))return ['excluded','memory-collection-or-HTTP-data-accessor'];
 if(method==='read'||method==='cancel'){
  if(/stream|reader|body|message|response/i.test(joined))return ['body-facet','associate-with-captured-request-opRef-not-another-fetch'];
  return ['unresolved','receiver-needs-native-or-helper-disposition'];
 }
 if(method==='fetch'||/^(?:fetch|fetcher|actualFetch)$/.test(target))return ['native-candidate',/stub|worker|actor|node|negative|m\b/i.test(receiver)?'DO-or-transport-fetch':'network-fetch-source-owned-resource-classification-required'];
 if(/storage|^(?:tx|transaction|s)$/.test(receiver)||/storage|(?:^|\.)ctx(?:\.|$)/.test(joined)&&/get|put|list|delete|sync|transaction|Alarm/.test(method))return ['native-candidate','DO-storage-or-transaction-method-capture'];
 if(/^(?:alias|kv|oauthKv)$/.test(receiver)||/OAUTH_KV|OAuthKv|oauthKv/.test(joined))return ['native-candidate','native-KV-boundary-or-fixed-facet-entry'];
 if(/^(?:bound|statement|stmt|db|session)$/.test(receiver)&&['first','all','run','exec','batch'].includes(method)||/\.prepare\(|\.bind\(/.test(receiver)&&['first','all','run'].includes(method))return ['native-candidate','native-SQL-statement-result'];
 if(/(?:^|\.)env\.[A-Z_]+$/.test(receiver)&&method==='get')return ['unresolved','binding-type-and-selector-versus-I/O-required'];
 return ['unresolved','lexical-receiver-or-helper-boundary-needs-review'];
}
function discover(source,path,roles){
 const file=ts.createSourceFile(path,source,ts.ScriptTarget.ESNext,true,path.endsWith('.tsx')?ts.ScriptKind.TSX:path.endsWith('.ts')?ts.ScriptKind.TS:ts.ScriptKind.JS);
 assert.equal(file.parseDiagnostics.length,0,'parse actual graph input '+path);
 const candidates=[];let calls=0;
 function walk(node){
  if(ts.isCallExpression(node)){
   calls++;
   let receiver='',method='',target='',reflect=false;
   if(ts.isPropertyAccessExpression(node.expression)){
    receiver=node.expression.expression.getText(file);method=node.expression.name.text;target=node.expression.getText(file);
    if(target==='Reflect.apply'&&node.arguments.length>=2){
     reflect=true;target=node.arguments[0].getText(file);receiver=node.arguments[1].getText(file);
     if(ts.isPropertyAccessExpression(node.arguments[0]))method=node.arguments[0].name.text;
     else if(ts.isElementAccessExpression(node.arguments[0]))method='dynamic';
     else method=target.replace(/^(?:native|storage)/,'');
    }
   }else if(ts.isIdentifier(node.expression)&&['fetch','fetcher','actualFetch'].includes(node.expression.text)){method='fetch';target=node.expression.text;}
   if(METHODS.has(method)||reflect&&(/^(?:get|put|list|delete|first|all|sync|transaction|getAlarm|setAlarm|deleteAlarm|tg|tp|td|ta|getTx|putTx|readTx|read|write|alarm|del|ns|ng|nt|native\.|methods\[)/.test(target))){
    assert(candidates.length<16384,'bounded syntactic candidate inventory');
    const [classification,reason]=decision(receiver,method,target),position=file.getLineAndCharacterOfPosition(node.getStart(file));
    candidates.push({roles,path,line:position.line+1,column:position.character+1,position:node.getStart(file),end:node.end,receiver:label(receiver).slice(0,240),method,target:label(target).slice(0,240),function:label(nearest(node)).slice(0,160),reflect,classification,reason,callBytes:Buffer.byteLength(node.getText(file)),callSha256:hash(node.getText(file))});
   }
  }
  ts.forEachChild(node,walk);
 }
 walk(file);return {candidates,calls};
}
const SEAMS=[
 {path:'lib/mcp-qa-finite-initial-entry.mjs',marker:'parent=clock(r.createdAt+30000,holders);const lease=parent.lease;',expected:1,meaning:'actual setup Root before first command/source/storage I/O and stage-work',phase:'setup'},
 {path:'lib/mcp-qa-finite-initial-cleanup.mjs',marker:'parent=clock(Date.now()+30000,holders);const lease=parent.lease;',expected:1,meaning:'actual original alarm Root; never a reconstructed request Root',phase:'cleanup_before_restore'},
 {path:'lib/mcp-qa-finite-owner-preparation.mjs',marker:'requestContexts.set(lease,{root:lease,startedAt,remaining,deadline:()=>deadline});',expected:1,meaning:'actual request Root registration; observed deadline only',phase:'request-callsite'},
 {path:'lib/mcp-qa-finite-owner-preparation.mjs',marker:'descendant(childLease,lease,()=>end,()=>end-wall-(performance.now()-mono));',expected:1,meaning:'actual request child identity and original deadline',phase:'inherited'},
 {path:'lib/mcp-qa-finite-initial-lease.mjs',marker:'actual=work(l,until);',expected:1,meaning:'actual child callback retains exact returned native promise',phase:'inherited'},
 {path:'lib/mcp-qa-finite-owner-phase-context.mjs',marker:"return await readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId:id,parent:originalLease},l);",expected:1,meaning:'lookup callback fixed sdk_lookup scope before composed existing diagnostics',phase:'sdk_lookup'},
 {path:'lib/mcp-qa-finite-owner-cleanup.mjs',marker:'check();const native=Reflect.apply(methods[q.method],alias,q.args);return retain(native);',expected:1,meaning:'actual private readonly native entry, original guards/retain/order',phase:'sdk_lookup'},
 {path:'lib/mcp-qa-finite-owner-cleanup.mjs',marker:'const actual=retain(Promise.resolve().then(()=>{check();return retain(Reflect.apply(methods[q.method],alias,q.args));}));',expected:1,meaning:'actual private reduction native entry, no exported facet',phase:'sdk_reduction'},
 {path:'lib/mcp-qa-finite-owner-cleanup.mjs',marker:'async function readCleanupFinalInventory(options,originalLease,s){',expected:1,meaning:'fixed final-inventory call scope, nested I/O inherits immutable store',phase:'final_inventory'},
 {path:'worker/mcp-own/finite.mjs',marker:'if(!reserved(path)&&!reserved(decoded))return worker.fetch(request,env,ctx);',expected:1,meaning:'actual unreserved M entry; transport Root only, deadline null',phase:'token_exchange-or-mcp_read'}
];
async function inventoryFiles(root){
 const rows=[];async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const path=join(dir,e.name);assert(!e.isSymbolicLink());if(e.isDirectory())await walk(path);else{assert(e.isFile());const b=await readFile(path);rows.push({path:relative(root,path).replaceAll('\\','/'),bytes:b.length,sha256:hash(b)});}}}
 await walk(root);return rows.sort((a,b)=>a.path.localeCompare(b.path));
}
export async function inspectBudgetCompilation(root){
 assert.equal(process.env.AFW_BUDGET_INSPECTION,'compile-only');
 assert.equal(root,'output/finite-budget/compile-only');
 const source=process.env.GITHUB_SHA;assert.match(source??'',/^[a-f0-9]{40}$/);
 const {initialEntryHarness}=await import('./finite-initial-entry-world.mjs');
 const began=Date.now(),graphs=await initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint:true,budgetCompileOnly:true});
 assert.equal(graphs.I0Opened,false);assert.equal(graphs.nativeExecutionProduced,false);assert.equal(graphs.nativeCheckpointProduced,false);
 assert(graphs.compatibility.QA.flags.includes('nodejs_compat'));assert(graphs.compatibility.M.compatibility_flags.includes('nodejs_compat'));
 const overriddenByRole={M:new Map(),QA:new Map(graphs.preparedSources.map(([p,s])=>[relative(process.cwd(),p).replaceAll('\\','/'),s]))};
 const rolePaths={M:Object.keys(graphs.M.metafile.inputs),QA:Object.keys(graphs.QA.metafile.inputs)},paths=[...new Set([...rolePaths.M,...rolePaths.QA])].sort(),inputs=[],modules=[],candidates=[];
 for(const role of ['M','QA'])for(const path of [...rolePaths[role]].sort()){
  const roles=[role],overridden=overriddenByRole[role],hookStage=role==='QA'?'after-existing-QA-fixture-composition':'M-original-source';
  if(path.startsWith('<define:')){const text=graphs.virtualSources[path];assert.equal(typeof text,'string','known virtual define');inputs.push({path,role,roles,hookStage,kind:'compiler-define-data',bytes:Buffer.byteLength(text),sha256:hash(text)});modules.push({path,roles,classification:'excluded',reason:'compile-time-data-no-native-callsite'});continue;}
  const raw=path==='<stdin>'?graphs.QA.entry:await readFile(path,'utf8'),prepared=overridden.get(path)??raw;
  inputs.push({path,role,roles,hookStage,kind:path==='<stdin>'?'fixture-entry':'source',diskBytes:Buffer.byteLength(raw),diskSha256:hash(raw),preparedBytes:Buffer.byteLength(prepared),preparedSha256:hash(prepared),prepared:prepared!==raw});
  if(path.endsWith('.json')){modules.push({path,roles,classification:'excluded',reason:'JSON-data-no-native-callsite'});continue;}
  if(path.endsWith('.d.ts')){modules.push({path,roles,classification:'excluded',reason:'declaration-only-no-runtime'});continue;}
  const discovered=discover(prepared,path,roles);
  assert(candidates.length+discovered.candidates.length<=16384,'bounded complete syntactic candidate map');
  candidates.push(...discovered.candidates);modules.push({path,roles,syntacticCalls:discovered.calls,candidateCount:discovered.candidates.length,classification:discovered.candidates.length?'inventoried':'excluded',reason:discovered.candidates.length?'API-shaped calls require individual disposition':'no-call-matching-closed-native-method-discovery-set'});
 }
 const seams=[];
 for(const seam of SEAMS)for(const role of ['M','QA'].filter(role=>rolePaths[role].includes(seam.path))){const raw=await readFile(seam.path,'utf8'),prepared=seam.rawSource?raw:overriddenByRole[role].get(seam.path)??raw,count=prepared.split(seam.marker).length-1;assert.equal(count,seam.expected,'exact source seam '+role+' '+seam.path+' '+seam.phase);seams.push({...seam,role,count,markerSha256:hash(seam.marker),rawSha256:hash(raw),preparedSha256:hash(prepared),hookStage:role==='QA'?'after-existing-QA-fixture-composition':'M-original-source'});}
 const grouped=new Map();
 for(const row of candidates){const key=JSON.stringify([row.roles,row.path,row.receiver,row.method,row.target,row.function,row.classification,row.reason]);let group=grouped.get(key);if(!group){group={roles:row.roles,path:row.path,receiver:row.receiver,method:row.method,target:row.target,function:row.function,classification:row.classification,reason:row.reason,count:0,callsites:[]};grouped.set(key,group);}group.count++;group.callsites.push({line:row.line,column:row.column,position:row.position,end:row.end,callBytes:row.callBytes,callSha256:row.callSha256});}
 const counts={inputPaths:paths.length,roleVariants:inputs.length,inputs:inputs.length,modulesWithCandidates:modules.filter(m=>m.candidateCount>0).length,candidates:candidates.length,groups:grouped.size,nativeCandidates:candidates.filter(c=>c.classification==='native-candidate').length,bodyFacets:candidates.filter(c=>c.classification==='body-facet').length,excluded:candidates.filter(c=>c.classification==='excluded').length,unresolved:candidates.filter(c=>c.classification==='unresolved').length,seams:seams.length};
 const envelope={purpose:'afw.finite-budget-compile-inspection.syn.v1',source,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,I0Opened:false,nativeExecutionProduced:false,nativeCheckpointProduced:false,operationalReadiness:false,completePackage:false,PCoff:false};
 const map={...envelope,discovery:'TypeScript5.9.3 exploratory CallExpression inspection; separate role/path/raw/prepared/stage variants; method set is not complete native coverage',counts,seams,modules,candidates:[...grouped.values()],scopeNotes:{carrier:'proposed immutable AsyncLocalStorage; no enterWith/disable/fallback Root',phase:'fixed actual source entry and child callback capture, never global currentPhase',identity:'actual weak Root/child identities required in final native run; compile-only modeled IDs are not identities',segments:'disjoint producer/consumer and M/QA epochs; ordinals and peaks remain local',unresolved:'must receive explicit source/callback/reachability disposition before native preflight may pass'},acceptedForNativeInstrumentation:false};
 await mkdir(join(root,'scripts'),{recursive:true});
 await writeFile(join(root,'scripts/M-index.mjs'),graphs.M.script);await writeFile(join(root,'scripts/QA-index.mjs'),graphs.QA.script);
 await writeFile(join(root,'metafiles.json'),JSON.stringify({M:graphs.M.metafile,QA:graphs.QA.metafile},null,2));
 await writeFile(join(root,'prepared-inputs.json'),JSON.stringify({...envelope,inputs:['M','QA'].flatMap(role=>[...overriddenByRole[role]].map(([path,content])=>({role,path,content}))),virtualInputs:Object.entries(graphs.virtualSources).map(([path,content])=>({path,content}))},null,2));
 await writeFile(join(root,'source-inputs.json'),JSON.stringify({...envelope,inputs},null,2));await writeFile(join(root,'candidate-map.json'),JSON.stringify(map,null,2));
 const provenance={...envelope,counts,startedAt:began,finishedAt:Date.now(),compatibility:{M:{date:graphs.compatibility.M.compatibility_date,flags:graphs.compatibility.M.compatibility_flags},QA:graphs.compatibility.QA},modeledCompilerInput:{label:'MODELED compile-only namespace hash/string DATA, never instantiated as namespaces or used by P1',namespaceHashes:graphs.modeledNamespaceIds},graphs:{M:{bytes:Buffer.byteLength(graphs.M.script),sha256:hash(graphs.M.script)},QA:{bytes:Buffer.byteLength(graphs.QA.script),sha256:hash(graphs.QA.script)}},notProduced:['I0','native-Root','native-child','SDK-complete','OAuth-exchange','native-checkpoint','provider-API-call','runtime','positive-lineage']};
 await writeFile(join(root,'provenance.json'),JSON.stringify(provenance,null,2));
 console.info('COMPILE ONLY INVENTORY',JSON.stringify({source,counts,graphs:provenance.graphs,I0Opened:false,nativeExecutionProduced:false,nativeCheckpointProduced:false}));
 return provenance;
}

export {inventoryFiles as inventoryBudgetFiles};


// Compilation-only data. This module is never imported by a Worker graph.
const descriptorURL=new URL('./finite-budget-descriptors.json',import.meta.url);
export const budgetNativeDescriptorProposal=Object.freeze(JSON.parse(await readFile(descriptorURL,'utf8')));
const objectPath=p=>relative(process.cwd(),p).replaceAll('\\','/');
const nativeDescriptorByPath=new Map(budgetNativeDescriptorProposal.sourceDescriptors.map(row=>[row.path,row]));
function sourceAST(source,path){
 const ast=ts.createSourceFile(path,source,ts.ScriptTarget.ESNext,true,path.endsWith('.ts')?ts.ScriptKind.TS:ts.ScriptKind.JS);
 let detail='';
 if(ast.parseDiagnostics.length){
  const first=ast.parseDiagnostics[0],start=first.start??0,location=ast.getLineAndCharacterOfPosition(start),from=Math.max(0,start-120);
  detail='\nAFW_PARSE_WITNESS '+JSON.stringify({path,diagnostics:ast.parseDiagnostics.length,code:first.code,start,length:first.length??0,line:location.line+1,column:location.character+1,bytes:Buffer.byteLength(source),sha256:hash(source),contextStart:from,context:source.slice(from,from+240)});
 }
 assert.equal(ast.parseDiagnostics.length,0,'budget prepared source parses: '+path+detail);return ast;
}
function callShape(node,ast){
 const callee=node.expression;
 if(ts.isPropertyAccessExpression(callee)){
  const receiver=callee.expression.getText(ast),method=callee.name.text;
  if(receiver==='Reflect'&&method==='apply'&&node.arguments.length===3)return {form:'Reflect.apply',target:node.arguments[0].getText(ast),receiver:node.arguments[1].getText(ast),method};
  if(method==='call')return {form:'Function.call',target:receiver,method};
  return {form:'member',receiver,method};
 }
 if(ts.isIdentifier(callee))return {form:'direct-fetch',callee:callee.text};
 return {form:'other'};
}
function matchesSelector(row,shape){
 const s=row.selector;
 if(row.family==='Reflect.apply')return shape.form===row.family&&shape.target===s.target&&shape.receiver===s.receiver;
 if(row.family==='Function.call')return shape.form===row.family&&shape.target===s.target;
 if(row.family==='direct-fetch')return shape.form===row.family&&shape.callee===s.callee;
 if(shape.form!=='member'||shape.method!==s.method)return false;
 if(row.family==='body'&&s.receivers){if(!Object.hasOwn(s.receivers,shape.receiver))return false;}
 else if(s.receiver!==undefined&&shape.receiver!==s.receiver)return false;
 if(s.exclude==='nominalLease.run'&&shape.receiver==='nominalLease')return false;
 // These two bind expressions bind pure helper functions, not D1 statements.
 if(row.family==='SQL-identity'&&shape.method==='bind'&&['provisioning[k]','installation[k]'].includes(shape.receiver))return false;
 return true;
}
export function selectBudgetCallsites(source,path,role){
 assert(['M','QA'].includes(role));const row=nativeDescriptorByPath.get(path);assert(row,'fixed descriptor path '+path);assert(row.roles.includes(role),'fixed descriptor role '+role+' '+path);
 const ast=sourceAST(source,path),hits=row.selectors.map(()=>[]),calls=[];
 function visit(node){
  if(ts.isCallExpression(node)){
   const shape=callShape(node,ast),matches=[];
   row.selectors.forEach((s,i)=>{const pin=s.family==='body'?budgetNativeDescriptorProposal.implementationSupplement.bodyReceiverPins.find(p=>p.path===path&&p.selector===i):null;const effective=pin?{...s,selector:{...s.selector,receivers:pin.receivers}}:s;if(matchesSelector(effective,shape))matches.push(i);});
   assert(matches.length<=1,'overlapping descriptor at '+role+' '+path+':'+(ast.getLineAndCharacterOfPosition(node.getStart(ast)).line+1));
   if(matches.length){const index=matches[0],at=node.getStart(ast),site={selector:index,position:at,end:node.end,line:ast.getLineAndCharacterOfPosition(at).line+1,shape,node};hits[index].push(site);calls.push(site);}
  }
  ts.forEachChild(node,visit);
 }
 visit(ast);
 row.selectors.forEach((s,i)=>assert.equal(hits[i].length,s.expectedCount,'exact prepared AST count '+role+' '+path+' selector '+i+' '+JSON.stringify(s.selector)));
 for(const p of budgetNativeDescriptorProposal.implementationSupplement.bodyReceiverPins.filter(p=>p.path===path)){const actual={};for(const hit of hits[p.selector])actual[hit.shape.receiver]=(actual[hit.shape.receiver]??0)+1;assert.deepEqual(actual,p.receivers,'exact resolved body receiver '+role+' '+path+' '+p.selector);}
 return {ast,row,calls,counts:hits.map((v,i)=>({selector:i,count:v.length}))};
}
export async function validateBudgetPreparedSource({path,role,prepared,raw}){
 const descriptor=nativeDescriptorByPath.get(path);assert(descriptor,'fixed native descriptor path '+path);
 assert.equal(Buffer.byteLength(raw),descriptor.rawBytes,'raw byte pin '+path);
 assert.equal(hash(raw),descriptor.rawSha256,'raw SHA256 pin '+path);
 if(role==='M')assert.equal(prepared,raw,'M uses its original role variant '+path);
 // QA uses the actual existing fixture composition. Its old dynamic hashes are
 // historical provenance, not a replacement for today's prepared source.
 const selected=selectBudgetCallsites(prepared,path,role);
 return {role,path,rawSha256:hash(raw),rawBytes:Buffer.byteLength(raw),preparedSha256:hash(prepared),preparedBytes:Buffer.byteLength(prepared),stage:role==='M'?'M-original-source':'after-existing-QA-fixture-composition',selectors:selected.counts,calls:selected.calls.map(({selector,position,end,line,shape})=>({selector,position,end,line,shape})),selected};
}

const BUDGET_ID='__afwBudget';
const RESOURCE_BINDINGS=Object.freeze({
 DB:'SQL',RELEASE_DB:'SQL',AFW_QA_DB:'SQL',OAUTH_KV:'KV',AFW_FINITE_OWNER_OAUTH_KV:'KV',
 DELEGATED_RATE_LIMITER:'rateLimiter',AFW_QA_OCCURRENCE_RATE_LIMITER:'rateLimiter',
 AFW_FINITE_TRIAL_CONTROL:'DO',AFW_INDEPENDENT_CLOSURE:'DO',AFW_RELEASE_EVENTS_NODE:'DO',AFW_DOSSIER_EVENTS_NODE:'DO',AFW_MCP_CLOSURE_NODE:'DO'
});
const CAPTURE_METHODS=new Set([...METHODS,'prepare','bind','withSession','limit']);
const FIXTURE_EXCLUDED_METHODS=new Set(["ownerReferenceConfigure","ownerReferenceObserve","ownerReferenceControl","ownerCleanupFault","ownerCleanupReset","ownerCleanupControl","ownerCleanupFaultSignal","ownerCleanupFaultFacts","ownerCleanupScopeProbe","ownerCleanupNativeRows","ownerCleanupSignal","ownerCleanupFacts","firstConnectionTicketFault","firstConnectionCorruptCompleted","firstConnectionExpiredEntry","firstConnectionBodyControl","firstConnectionBodyState","firstConnectionInstance","firstConnectionBackupFault","firstConnectionAvailability","firstConnectionRestore","firstConnectionState","firstConnectionRelease","firstConnectionConfigure","firstConnectionReseal","firstConnectionContext","firstConnectionProbe","seed","snapshot","mutateCleanup","capsuleFacts","probeCapsuleFacts","seedFutureActivation","probeActivationWire","ownerSourceRead","ownerEffectCount","preEntryCustody","probeStageAvailability","probeNativeCustody","probeOldGuard","probeHistorySchema","probeInitialInventory","alarmInfo","nominalAlarmData","installAlarm","configure","release","releaseBodyCancel","releaseBodyRead","stats","restoreMethods"]);
const sourceOnlyHookPaths=new Set(['lib/mcp-qa-finite-initial-lease.mjs','lib/mcp-qa-finite-stage-work.mjs','worker/mcp-own/finite.mjs','lib/mcp-qa-finite-owner-oauth-qa.mjs','lib/mcp-qa-finite-owner-notice-get-qa.mjs','lib/mcp-qa-finite-owner-preparation-qa.mjs','lib/mcp-qa-finite-owner-native-receiver.mjs']);
function descriptorMeta(selector){
 const {family,selector:s}=selector,d=s.disposition??'';
 if(d.startsWith('Pure ')||d.startsWith('RPC-result disposal')||d.startsWith('Source helper'))return {excluded:true};
 if(d.startsWith('Workflow '))return {dormant:true};
 if(family==='identity'||family==='SQL-identity'||d.includes('holder identity edge')||d.startsWith('DO namespace'))return {edge:'holder'};
 if(family==='body')return s.method==='getReader'?{edge:'reader'}:{operation:s.method,exposedBytes:s.method==='read'};
 if(family==='rateLimiter')return {operation:'limit',resource:'rateLimiter'};
 if(family==='direct-fetch')return {operation:'fetch',classifyFetch:true};
 if(d.startsWith('DO named RPC'))return {operation:'rpc',resource:'DO'};
 if(d.startsWith('DO fetch'))return {operation:'fetch',resource:'DO'};
 if(family==='Function.call'&&d==='fixed-selector/helper-or-dormant')return {excluded:true};
 if(family==='Function.call'&&s.target==='withSession')return {edge:'holder'};
 return s.method?{operation:s.method}:{};
}
// Only inserted compiler data uses these factories; original business nodes are untouched.
export function createBudgetLiteral(value){
 const f=ts.factory,active=new Set();
 const build=value=>{
  if(value===null)return f.createNull();
  if(typeof value==='string')return f.createStringLiteral(value);
  if(typeof value==='boolean')return value?f.createTrue():f.createFalse();
  if(typeof value==='number'){
   assert(Number.isFinite(value),'finite compiler JSON number');
   const normalized=value===0?0:value;
   return normalized<0?f.createPrefixUnaryExpression(ts.SyntaxKind.MinusToken,f.createNumericLiteral(-normalized)):f.createNumericLiteral(normalized);
  }
  assert(value&&typeof value==='object','supported compiler JSON value');
  const array=Array.isArray(value),prototype=Object.getPrototypeOf(value);
  assert(array?prototype===Array.prototype:prototype===Object.prototype||prototype===null,'plain compiler JSON data');
  assert.equal(Object.getOwnPropertySymbols(value).length,0,'no compiler symbol fields');
  assert(!active.has(value),'acyclic compiler JSON data');active.add(value);
  try{
   const descriptors=Object.getOwnPropertyDescriptors(value);
   for(const descriptor of Object.values(descriptors))assert(Object.hasOwn(descriptor,'value'),'no compiler data accessors');
   if(array){
    const elements=[];for(let i=0;i<descriptors.length.value;i++)elements.push(Object.hasOwn(descriptors,String(i))?build(descriptors[i].value):f.createNull());
    return f.createArrayLiteralExpression(elements);
   }
   return f.createObjectLiteralExpression(Object.keys(descriptors).filter(key=>descriptors[key].enumerable).map(key=>f.createPropertyAssignment(f.createStringLiteral(key),build(descriptors[key].value))));
  }finally{active.delete(value);}
 };
 return build(value);
}
export function createBudgetScopeExpression(text){
 const f=ts.factory,id=name=>f.createIdentifier(name),property=(name,key)=>f.createPropertyAccessExpression(id(name),key);
 const conditional=(condition,yes,no)=>f.createConditionalExpression(condition,f.createToken(ts.SyntaxKind.QuestionToken),f.createStringLiteral(yes),f.createToken(ts.SyntaxKind.ColonToken),f.createStringLiteral(no));
 switch(text){
  case 'began+5000':return f.createBinaryExpression(id('began'),f.createToken(ts.SyntaxKind.PlusToken),f.createNumericLiteral(5000));
  case 'entered+5000':return f.createBinaryExpression(id('entered'),f.createToken(ts.SyntaxKind.PlusToken),f.createNumericLiteral(5000));
  case 'started+5000':return f.createBinaryExpression(id('started'),f.createToken(ts.SyntaxKind.PlusToken),f.createNumericLiteral(5000));
  case 'parent.lease':return property('parent','lease');
  case "metadata.method==='POST'?'authorize_post':'authorize_get'":return conditional(f.createBinaryExpression(property('metadata','method'),f.createToken(ts.SyntaxKind.EqualsEqualsEqualsToken),f.createStringLiteral('POST')),'authorize_post','authorize_get');
  case "consent?'monitoring_post':'monitoring_get'":return conditional(id('consent'),'monitoring_post','monitoring_get');
  default:assert.fail('fixed compiler scope expression required');
 }
}
function packageSelection(source,path,role){
 const pin=budgetNativeDescriptorProposal.packages.find(p=>p.path===path);
 assert(pin&&pin.roles.includes(role),'fixed package role');assert.equal(Buffer.byteLength(source),pin.bytes,'installed package byte pin');assert.equal(hash(source),pin.sha256,'installed package hash pin');
 const ast=sourceAST(source,path),calls=[],counts=Object.fromEntries(Object.keys(pin.selectors).map(k=>[k,0]));
 const sdk=path.includes('workers-oauth-provider'),mcp=path.includes('/server/'),jose=path.includes('/jose/');
 function visit(node){
  if(ts.isCallExpression(node)){
   const shape=callShape(node,ast);let group=null,meta=null;
   if(sdk&&shape.form==='member'&&['env.OAUTH_KV','this.env.OAUTH_KV','kv'].includes(shape.receiver)&&['get','put','list','delete'].includes(shape.method)){group='kv';meta={operation:shape.method,resource:'KV'};}
   else if(sdk&&shape.form==='direct-fetch'&&shape.callee==='fetch'){group='fetch';meta={operation:'fetch',resource:'JWKS'};}
   else if(shape.form==='member'&&['read','cancel'].includes(shape.method)&&(['reader','response.body','callbackRequest.body'].includes(shape.receiver))){
    group=sdk?'readCancel':shape.method;meta={operation:shape.method,exposedBytes:shape.method==='read'};
   }else if(shape.form==='member'&&shape.method==='getReader'){group='readerFactory';meta={edge:'reader'};}
   else if(shape.form==='member'&&shape.method==='clone'&&(sdk||mcp)){group='requestClone';meta={edge:'clone'};}
   else if(sdk&&shape.form==='member'&&shape.method==='formData'){group='requestFormData';meta={operation:'read'};}
   else if(mcp&&shape.form==='member'&&shape.method==='json'&&shape.receiver==='req'){group='requestJson';meta={operation:'read'};}
   else if(mcp&&shape.form==='member'&&shape.method==='text'&&shape.receiver==='request'){group='requestText';meta={operation:'read'};}
   else if(jose&&shape.form==='direct-fetch'&&shape.callee==='fetchImpl'){group='fetchImpl';meta={operation:'fetch',resource:'JWKS'};}
   else if(jose&&shape.form==='member'&&shape.method==='json'&&shape.receiver==='response'){group='responseJson';meta={operation:'read'};}
   if(group){assert(Object.hasOwn(counts,group),'package selector category '+path+' '+group);counts[group]++;calls.push({node,meta,group});}
  }
  ts.forEachChild(node,visit);
 }
 visit(ast);for(const [group,count]of Object.entries(pin.selectors))assert.equal(counts[group],count,'exact installed package selector '+path+' '+group);
 return {ast,calls,counts,pin};
}

function entrySelection(source){
 const pin=budgetNativeDescriptorProposal.entry;assert.equal(Buffer.byteLength(source),pin.bytes,'composed QA entry bytes');assert.equal(hash(source),pin.sha256,'composed QA entry pin');
 const nativeMembers=budgetNativeDescriptorProposal.implementationSupplement.entryNativeMembers;
 const extraExpected=budgetNativeDescriptorProposal.implementationSupplement.entryAdditionalCounts;
 const ast=sourceAST(source,'<stdin>'),counts=Object.fromEntries(Object.keys(pin.reflectSelectors).map(k=>[k,0])),members=Object.fromEntries(Object.keys(nativeMembers).map(k=>[k,0])),extras=Object.fromEntries(Object.keys(extraExpected).map(k=>[k,0])),calls=[];
 function visit(node){
  if(ts.isCallExpression(node)){
   const shape=callShape(node,ast);
   if(shape.form==='Reflect.apply'){
    const key=shape.target+' → '+shape.receiver;assert(Object.hasOwn(counts,key),'unmapped QA entry Reflect.apply '+key);counts[key]++;
    let meta={};
    if(['nodeName','nodeString'].includes(shape.target))meta={excluded:true};
    else if(shape.target==='selfGet')meta={edge:'holder'};
    else if(['session','withSession','dbSession','prepare','originalPrepare','bind'].includes(shape.target))meta={edge:'holder'};
    else if(['fetcher','actualFetch'].includes(shape.target))meta={operation:'fetch',classifyFetch:true};
    calls.push({node,meta,group:key});
   }else if(shape.form==='member'&&Object.hasOwn(members,shape.receiver+' → '+shape.method)){
    const key=shape.receiver+' → '+shape.method;members[key]++;calls.push({node,meta:{operation:shape.method},group:key});
   }else if(shape.form==='direct-fetch'&&shape.callee==='fetch'){
    extras.fetch++;calls.push({node,meta:{operation:'fetch',classifyFetch:true},group:'fetch'});
   }else if(shape.form==='member'&&shape.method==='json'&&['r','request'].includes(shape.receiver)){
    extras.json++;calls.push({node,meta:{operation:'read'},group:'json'});
   }else if(shape.form==='member'&&['prepare','bind','first','all','run'].includes(shape.method)&&/^(?:db|this\.env\.RELEASE_DB|env\.RELEASE_DB)(?:\.prepare\(|$)/.test(shape.receiver)){
    extras[shape.method]++;calls.push({node,meta:['prepare','bind'].includes(shape.method)?{edge:'holder'}:{operation:shape.method},group:shape.method});
   }
  }
  ts.forEachChild(node,visit);
 }
 visit(ast);assert.deepEqual(members,nativeMembers,'exact composed entry native member selectors');assert.deepEqual(extras,extraExpected,'exact composed entry SQL/body selectors');
 for(const [key,count]of Object.entries(pin.reflectSelectors))assert.equal(counts[key],count,'exact composed QA entry selector '+key);
 return {ast,calls,counts:{reflect:counts,members,extras}};
}


function budgetScopeSeams(source,path){
 const replace=(needle,replacement)=>{assert.equal(source.split(needle).length-1,1,'fixed scope seam '+path+' '+needle);source=source.replace(needle,replacement);};
 if(path==='worker/mcp-own/finite.mjs')replace('const url=new URL(request.url),path=url.pathname;',"const url=new URL(request.url),path=url.pathname;if(path==='/_fixture/finite-budget')return new Response(JSON.stringify(__afwBudget.snapshot()),{headers:{'Content-Type':'application/json'}});");
 if(path==='lib/mcp-qa-finite-initial-lease.mjs'){
  const n='const lease=Object.freeze({signal:controller.signal,assertCurrent:check});';
  replace(n,n+'__afwBudget.clock(lease,end);');
  replace('current(l,fail);actual=work(l,until);','actual=__afwBudget.childCall(lease,l,until,()=>{current(l,fail);return work(l,until);});');
 }
 if(path==='lib/mcp-qa-finite-initial-entry.mjs'){
  const n='parent=clock(r.createdAt+30000,holders);const lease=parent.lease;';
  replace(n,n+"__afwBudget.root(lease,'setup',__afwBudget.deadline(lease));");
 }
 if(path==='lib/mcp-qa-finite-initial-cleanup.mjs'){
  const n='parent=clock(Date.now()+30000,holders);const lease=parent.lease;';
  replace(n,n+"__afwBudget.root(lease,'cleanup_before_restore',__afwBudget.deadline(lease));");
 }
 if(path==='lib/mcp-qa-finite-owner-preparation.mjs'){
  const n='requestContexts.set(lease,{root:lease,startedAt,remaining,deadline:()=>deadline});';
  replace(n,n+'__afwBudget.clock(lease,deadline);');
  const d='const ancestor=requestContexts.get(parent);if(!ancestor)return;';
  replace(d,'__afwBudget.alias(parent,lease);'+d);
  replace('current(childLease);return work(childLease);','current(childLease);return __afwBudget.childCall(lease,childLease,end,()=>work(childLease));');
 }
 if(path==='lib/mcp-qa-finite-initial-material.mjs'){
  const n='const lease=Object.freeze({signal:controller.signal,assertCurrent:check});narrow(end);';
  replace(n,n+'__afwBudget.alias(originalLease,lease);');
  replace('current();return work(l);','current();return __afwBudget.childCall(lease,l,childEnd,()=>work(l));');
 }
 
 if(['lib/mcp-qa-finite-owner-phase-context.mjs','lib/mcp-qa-finite-initial-owner-source.mjs'].includes(path)){
  const n='clock=createFiniteInitialLease(deadline,deadline,holders,fail);';replace(n,n+'__afwBudget.alias(parent,clock.lease);');
 }
 if(path==='lib/mcp-qa-finite-owner-phase-context.mjs'){
  const n='clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);';
  assert.equal(source.split(n).length-1,4,'four actual request clock aliases');source=source.replaceAll(n,n+'__afwBudget.alias(originalLease,clock.lease);');
 }
 if(path==='lib/mcp-qa-finite-historical-source.mjs')replace('current();return work(abort.signal,current);','current();return __afwBudget.childInvoke(originalLease,start+5000,work,undefined,[abort.signal,current]);');
 if(path==='lib/mcp-qa-finite-owner-cleanup.mjs')replace('current(clock.lease);return work(clock.lease,end);','current(clock.lease);return __afwBudget.childCall(originalLease,clock.lease,end,()=>work(clock.lease,end));');
 if(path==='lib/mcp-qa-finite-policy-transport.mjs')replace('current(c);return fn(c,end);','current(c);return __afwBudget.childCall(originalLease,c,end,()=>fn(c,end));');
 return source;
}

export function transformBudgetPreparedSource(source,path,role){
 source=budgetScopeSeams(source,path);
 const selected=nativeDescriptorByPath.has(path)?selectBudgetCallsites(source,path,role):budgetNativeDescriptorProposal.packages.some(p=>p.path===path)?packageSelection(source,path,role):path==='<stdin>'?entrySelection(source):null;
 assert(selected||sourceOnlyHookPaths.has(path)||path==='<stdin>','fixed transform input '+path);
 const ast=selected?.ast??sourceAST(source,path),selectedNodes=new Map();
 if(selected)for(const call of selected.calls)selectedNodes.set(call.node,call.meta??descriptorMeta(selected.row.selectors[call.selector]));
 
 // Supplemental native body methods omitted by the earlier lexical method set.
 // The fixed delegated adapter contains five existing clones and two consumers;
 // only its actual P1 branches are claimed at runtime.
 if(path==='lib/delegated-oauth-worker.mjs'){
  const expected={clone:5,json:2},found={clone:0,json:0};
  const scan=n=>{if(ts.isCallExpression(n)&&ts.isPropertyAccessExpression(n.expression)&&Object.hasOwn(expected,n.expression.name.text)){
   const method=n.expression.name.text;found[method]++;assert(!selectedNodes.has(n));selectedNodes.set(n,method==='clone'?{edge:'clone'}:{operation:'read'});
  }ts.forEachChild(n,scan);};scan(ast);assert.deepEqual(found,expected,'fixed delegated body methods');
 }
 const transactionCallbacks=new Set();
 for(const node of selectedNodes.keys()){
  const shape=callShape(node,ast);
  const transaction=shape.method==='transaction'||['transaction','native.transaction','nt'].includes(shape.target);
  if(!transaction)continue;
  const arg=shape.form==='Reflect.apply'&&ts.isArrayLiteralExpression(node.arguments[2])?node.arguments[2].elements[0]:shape.form==='Function.call'?node.arguments[1]:node.arguments[0];
  if(arg&&(ts.isArrowFunction(arg)||ts.isFunctionExpression(arg)))transactionCallbacks.add(arg);
 }
 const f=ts.factory,id=()=>f.createIdentifier(BUDGET_ID),access=name=>f.createPropertyAccessExpression(id(),name);
 const literal=createBudgetLiteral;
 const hook=(name,args)=>f.createCallExpression(access(name),undefined,args);
 let nativeCalls=0,identityEdges=0,bodyEdges=0,facadeEdges=0,scopeEdges=0,guardEdges=0;
 const closure=expression=>f.createArrowFunction(undefined,undefined,[],undefined,f.createToken(ts.SyntaxKind.EqualsGreaterThanToken),expression);
 const result=ts.transform(ast,[context=>{
  const visit=node=>{
   const original=node;
   // Preserve the original callee getter evaluation before argument evaluation.
   if(ts.isCallExpression(node)&&selectedNodes.has(node)){
    const meta=selectedNodes.get(node),expr=node.expression;
    if(meta.excluded)return ts.visitEachChild(node,visit,context);
    const args=node.arguments.map(arg=>ts.visitNode(arg,visit)),data=literal(meta);
    nativeCalls++;
    if(ts.isPropertyAccessExpression(expr)&&expr.expression.getText(ast)==='Reflect'&&expr.name.text==='apply'){
     return f.updateCallExpression(node,hook('reflect',[ts.visitNode(expr,visit),data]),node.typeArguments,args);
    }
    if(ts.isPropertyAccessExpression(expr)&&expr.name.text==='call'){
     return f.updateCallExpression(node,hook('call',[ts.visitNode(expr.expression,visit),data]),node.typeArguments,args);
    }
    if(ts.isPropertyAccessExpression(expr)){
     const optionalReceiver=!!expr.questionDotToken,optionalMethod=!!node.questionDotToken;
     const callee=hook('member',[ts.visitNode(expr.expression,visit),literal(expr.name.text),data,optionalReceiver?f.createTrue():f.createFalse(),optionalMethod?f.createTrue():f.createFalse()]);
     return optionalReceiver||optionalMethod?f.createCallChain(callee,f.createToken(ts.SyntaxKind.QuestionDotToken),node.typeArguments,args):f.updateCallExpression(node,callee,node.typeArguments,args);
    }
    assert(ts.isIdentifier(expr),'fixed call form');
    return f.updateCallExpression(node,hook('direct',[expr,data]),node.typeArguments,args);
   }
   node=ts.visitEachChild(node,visit,context);
   if(ts.isThrowStatement(original)){
    let owner=original.parent;
    while(owner&&!ts.isFunctionLike(owner))owner=owner.parent;
    const name=owner?.name?.getText(ast)??(owner&&ts.isVariableDeclaration(owner.parent)?owner.parent.name.getText(ast):null);
    if(['fail','finiteNativeFailure'].includes(name)){guardEdges++;return f.updateThrowStatement(node,hook('guardValue',[node.expression]));}
   }
   if(path==='<stdin>'&&ts.isMethodDeclaration(original)&&ts.isClassDeclaration(original.parent)&&FIXTURE_EXCLUDED_METHODS.has(original.name.getText(ast))){
    const modifiers=original.modifiers?.some(m=>m.kind===ts.SyntaxKind.AsyncKeyword)?[f.createModifier(ts.SyntaxKind.AsyncKeyword)]:undefined;
    const invoke=f.createArrowFunction(modifiers,undefined,[],undefined,f.createToken(ts.SyntaxKind.EqualsGreaterThanToken),node.body);
    scopeEdges++;return f.updateMethodDeclaration(node,node.modifiers,node.asteriskToken,node.name,node.questionToken,node.typeParameters,node.parameters,node.type,f.createBlock([f.createReturnStatement(hook('fixture',[invoke]))],true));
   }

   if(ts.isCallExpression(original)){
    const callee=original.expression.getText(ast),text=original.getText(ast);

    if(callee==='Promise.resolve().then'&&path==='lib/mcp-qa-finite-bootstrap-native.mjs'&&text.includes('r=await fetcher(')){
     scopeEdges++;return hook('childCall',[f.createIdentifier('originalLease'),f.createIdentifier('child'),createBudgetScopeExpression('began+5000'),closure(node)]);
    }
    if(callee==='Promise.resolve().then'&&path==='lib/mcp-qa-finite-initial-old-guard.mjs'&&text.includes('response=await fetcher(')){
     scopeEdges++;return hook('childCall',[f.createIdentifier('originalLease'),f.createIdentifier('controller'),createBudgetScopeExpression('entered+5000'),closure(node)]);
    }
    if(path==='lib/mcp-qa-finite-initial-custody-probe.mjs'&&ts.isParenthesizedExpression(original.expression)&&ts.isArrowFunction(original.expression.expression)&&text.includes("fetcher(ROOT+'/tokens/verify'")){
     scopeEdges++;return hook('childCall',[f.createIdentifier('originalLease'),f.createIdentifier('childCheck'),createBudgetScopeExpression('started+5000'),closure(node)]);
    }

    if(path==='lib/mcp-qa-finite-stage-work.mjs'&&callee==='scopes.run'){scopeEdges++;return hook('run',[f.createIdentifier('originalLease'),closure(node)]);}
    let phase=null;
    if(path==='lib/mcp-qa-finite-owner-phase-context.mjs'&&callee==='readPrivateQaFiniteOwnerSdkGrant')phase='sdk_lookup';
    if(path==='lib/mcp-qa-finite-owner-cleanup.mjs'&&callee==='child'&&text.includes('api.revokeGrant('))phase='sdk_reduction';
    if(path==='lib/mcp-qa-finite-owner-cleanup.mjs'&&callee==='readCleanupFinalInventory')phase='final_inventory';
    if(path==='lib/mcp-qa-finite-initial-cleanup.mjs'&&callee==='parent.child'&&text.includes("seal('RestoreSend'"))phase='restore';
    if(phase){scopeEdges++;return hook('phase',[literal(phase),closure(node)]);}
    if(path==='worker/mcp-own/finite.mjs'){
     if(callee==='worker.fetch'){scopeEdges++;return hook('transport',[f.createIdentifier('request'),f.createIdentifier('path'),closure(node)]);}
     const control=callee==='forwardFiniteOwnerChoice'?'setup':callee==='forwardPrivateFiniteOwnerOAuth'?'authorize':text.startsWith('(path===')?'monitoring':null;
     if(control){scopeEdges++;return hook('control',[createBudgetScopeExpression('parent.lease'),control==='setup'?literal(control):hook('methodPhase',[f.createIdentifier('request'),literal(control)]),f.createIdentifier('request'),closure(node)]);}
    }
    if(path==='lib/mcp-qa-finite-owner-native-receiver.mjs'&&callee==='handlePrivateQaFiniteOwnerConnection'){
     scopeEdges++;return hook('control',[createBudgetScopeExpression('parent.lease'),literal('setup'),f.createIdentifier('request'),closure(node)]);
    }
    if(path==='lib/mcp-qa-finite-owner-oauth-qa.mjs'&&callee==='handlePrivateQaFiniteOwnerOAuth'){
     scopeEdges++;return hook('control',[createBudgetScopeExpression('parent.lease'),createBudgetScopeExpression("metadata.method==='POST'?'authorize_post':'authorize_get'"),f.createIdentifier('request'),closure(node)]);
    }
    if(path==='lib/mcp-qa-finite-owner-notice-get-qa.mjs'&&callee.startsWith('(consent?handlePrivateQaFiniteOwnerNoticeConsent')){
     scopeEdges++;return hook('control',[createBudgetScopeExpression('parent.lease'),createBudgetScopeExpression("consent?'monitoring_post':'monitoring_get'"),f.createIdentifier('request'),closure(node)]);
    }
   }

   if(ts.isCallExpression(original)&&ts.isPropertyAccessExpression(original.expression)&&original.expression.name.text==='bind'&&ts.isPropertyAccessExpression(original.expression.expression)&&CAPTURE_METHODS.has(original.expression.expression.name.text)){
    identityEdges++;return f.updateCallExpression(node,hook('bind',[node.expression.expression]),node.typeArguments,node.arguments);
   }
   if(ts.isCallExpression(original)&&original.expression.getText(ast)==='Response.json'){
    bodyEdges++;return hook('localResponse',[node]);
   }
   
   if(path==='<stdin>'&&ts.isClassDeclaration(original)&&original.name?.text==='Initial'){
    const method=f.createMethodDeclaration(undefined,undefined,'budgetSnapshot',undefined,undefined,[],undefined,f.createBlock([f.createReturnStatement(hook('snapshot',[]))],true));
    return f.updateClassDeclaration(node,node.modifiers,node.name,node.typeParameters,node.heritageClauses,[...node.members,method]);
   }
   if(ts.isElementAccessExpression(original)&&ts.isVariableDeclaration(original.parent)&&original.parent.name.getText(ast)==='method'){
    identityEdges++;return hook('readMethod',[node.expression,node.argumentExpression]);
   }
   if(ts.isPropertyAccessExpression(original)){
    const method=original.name.text,receiver=original.expression.getText(ast),optional=!!original.questionDotToken;
    if(path==='worker/mcp-own/finite.mjs'&&receiver==='request'&&method==='method'){scopeEdges++;return hook('methodValue',[f.createIdentifier('request'),node]);}
    // Passive identity capture at existing binding/storage reads only.
    const resource=RESOURCE_BINDINGS[method];
    if(resource&&/(?:^|\.)env$/.test(receiver)){identityEdges++;return hook('nativeHolder',[node,literal(resource),literal(resource==='DO'?'namespace':'holder')]);}
    if(method==='storage'&&/^(?:this\.ctx|ctx|context)$/.test(receiver)){identityEdges++;return hook('nativeHolder',[node,literal('DO'),literal('storage')]);}
    if(method==='body'&&!ts.isBinaryExpression(original.parent)){bodyEdges++;return hook('body',[node.expression,optional?f.createTrue():f.createFalse()]);}
    if((CAPTURE_METHODS.has(method)||ts.isVariableDeclaration(original.parent)&&original.parent.name.getText(ast)==='method')&&!(ts.isCallExpression(original.parent)&&original.parent.expression===original)&&
       !(ts.isBinaryExpression(original.parent)&&original.parent.left===original)){
     identityEdges++;return hook('readMethod',[node.expression,literal(method),optional?f.createTrue():f.createFalse()]);
    }
   }
   if(ts.isNewExpression(original)&&ts.isIdentifier(original.expression)&&['Request','Response','ReadableStream'].includes(original.expression.text)){
    bodyEdges++;return f.createCallExpression(hook('construct',[node.expression,literal(original.expression.text)]),node.typeArguments,node.arguments??[]);
   }
   
   if(transactionCallbacks.has(original)){
    assert.equal(original.parameters.length,1,'fixed native transaction callback argument');
    const parameter=original.parameters[0].name;assert(ts.isIdentifier(parameter),'native tx identity argument');
    const mark=hook('transactionArgument',[parameter]);
    const body=ts.isBlock(node.body)?f.updateBlock(node.body,[f.createExpressionStatement(mark),...node.body.statements]):f.createParenthesizedExpression(f.createCommaListExpression([mark,node.body]));
    identityEdges++;
    return ts.isArrowFunction(node)?f.updateArrowFunction(node,node.modifiers,node.typeParameters,node.parameters,node.type,node.equalsGreaterThanToken,body):f.updateFunctionExpression(node,node.modifiers,node.asteriskToken,node.name,node.typeParameters,node.parameters,node.type,body);
   }
   if(ts.isObjectLiteralExpression(original)){
    const names=original.properties.filter(p=>(ts.isMethodDeclaration(p)||ts.isPropertyAssignment(p)&&(ts.isArrowFunction(p.initializer)||ts.isFunctionExpression(p.initializer)))&&p.name&&!ts.isComputedPropertyName(p.name)).map(p=>p.name.getText(ast).replace(/^['"]|['"]$/g,'')).filter(name=>CAPTURE_METHODS.has(name)||name==='fetch'||name==='rpc');
    if(names.length){facadeEdges++;return hook('facadeHolder',[node,literal(names)]);}
   }
   if(ts.isBinaryExpression(original)&&original.operatorToken.kind===ts.SyntaxKind.EqualsToken&&(ts.isPropertyAccessExpression(original.left)||ts.isElementAccessExpression(original.left))&&
      (ts.isArrowFunction(original.right)||ts.isFunctionExpression(original.right))&&(ts.isElementAccessExpression(original.left)||CAPTURE_METHODS.has(original.left.name.text))){
    facadeEdges++;return f.updateBinaryExpression(node,node.left,node.operatorToken,hook('facade',[node.right]));
   }
   return node;
  };
  return root=>ts.visitNode(root,visit);
 }]);

 const expectedScopes={
  '<stdin>':51,
  'lib/mcp-qa-finite-stage-work.mjs':7,
  'worker/mcp-own/finite.mjs':7,
  'lib/mcp-qa-finite-owner-native-receiver.mjs':1,
  'lib/mcp-qa-finite-owner-oauth-qa.mjs':1,
  'lib/mcp-qa-finite-owner-notice-get-qa.mjs':1,
  'lib/mcp-qa-finite-owner-phase-context.mjs':1,
  'lib/mcp-qa-finite-owner-cleanup.mjs':2,
  'lib/mcp-qa-finite-initial-cleanup.mjs':1,
  'lib/mcp-qa-finite-bootstrap-native.mjs':1,
  'lib/mcp-qa-finite-initial-old-guard.mjs':1,
  'lib/mcp-qa-finite-initial-custody-probe.mjs':1
 };
 assert.equal(scopeEdges,expectedScopes[path]??0,'fixed prepared scope hook count '+role+' '+path);
 const transformed=ts.createPrinter({newLine:ts.NewLineKind.LineFeed}).printFile(result.transformed[0]);result.dispose();sourceAST(transformed,path);
 return {source:"import {budget as "+BUDGET_ID+"} from 'afw:budget-runtime';\n"+transformed,counts:{nativeCalls,identityEdges,bodyEdges,facadeEdges,scopeEdges,guardEdges},selectorCounts:selected?.counts??[]};
}

const scopeInputPins=budgetNativeDescriptorProposal.implementationSupplement.scopeInputPins;
export function createBudgetCompiler(role){
 assert(['M','QA'].includes(role));const testRevision=process.env.GITHUB_SHA;assert.match(testRevision??'',/^[a-f0-9]{40}$/,'budget actual Actions revision before I0');
 const records=new Map(),prepared=new Map(),expected=new Set(budgetNativeDescriptorProposal.sourceDescriptors.filter(p=>p.roles.includes(role)).map(p=>p.path));
 for(const p of scopeInputPins.filter(p=>p.roles.includes(role)))expected.add(p.path);
 for(const p of budgetNativeDescriptorProposal.packages.filter(p=>p.roles.includes(role)))expected.add(p.path);
 if(role==='QA')expected.add('<stdin>');
 const wanted=path=>expected.has(path);
 async function transform(path,source){
  assert(wanted(path),'unexpected instrumentation path '+role+' '+path);assert(!records.has(path),'duplicate prepared module '+role+' '+path);
  const raw=path==='<stdin>'?source:await readFile(path,'utf8');
  if(nativeDescriptorByPath.has(path))await validateBudgetPreparedSource({path,role,prepared:source,raw});
  else if(path!=='<stdin>'&&!path.startsWith('node_modules/')){
   const pin=scopeInputPins.find(p=>p.path===path);assert(pin?.roles.includes(role));assert.equal(hash(raw),pin.rawSha256,'scope input raw pin '+path);assert.equal(Buffer.byteLength(raw),pin.rawBytes);if(role==='M')assert.equal(source,raw);
  }
  const result=transformBudgetPreparedSource(source,path,role);
  records.set(path,{role,path,rawBytes:Buffer.byteLength(raw),rawSha256:hash(raw),preparedBytes:Buffer.byteLength(source),preparedSha256:hash(source),emittedBytes:Buffer.byteLength(result.source),emittedSha256:hash(result.source),counts:result.counts,selectors:result.selectorCounts});
  prepared.set(path,result.source);return result.source;
 }
 function plugin(existing=null){
  return {name:'fixed-finite-budget-'+role,setup(builder){
   builder.onResolve({filter:/^afw:budget-runtime$/},()=>({path:'runtime',namespace:'afw-budget'}));
   builder.onLoad({filter:/.*/,namespace:'afw-budget'},()=>({contents:"import {createBudgetRuntime} from "+JSON.stringify(resolve('test/fixtures/finite-budget-diagnostics.mjs'))+";export const budget=createBudgetRuntime("+JSON.stringify({testRevision,workerRole:role})+");",loader:'js',resolveDir:process.cwd()}));
   if(existing){
    existing.setup({...builder,onLoad(options,loader){
     builder.onLoad(options,async args=>{
      const result=await loader(args),path=objectPath(args.path);
      if(result?.contents!==undefined&&wanted(path))return {...result,contents:await transform(path,String(result.contents))};
      return result;
     });
    }});
   }
   builder.onLoad({filter:/\.(?:mjs|js|ts)$/},async args=>{
    const path=objectPath(args.path);if(!wanted(path))return undefined;
    return {contents:await transform(path,await readFile(args.path,'utf8')),loader:path.endsWith('.ts')?'ts':'js'};
   });
   builder.onEnd(async result=>{
    if(result.errors.length)return;
    assert.deepEqual([...records.keys()].sort(),[...expected].sort(),'closed prepared role input map '+role);
    assert(!Object.keys(result.metafile?.inputs??{}).some(path=>path.endsWith('finite-budget-descriptors.json')||path.endsWith('finite-budget-world.mjs')),'Node-only map/compiler excluded from Worker bundle');
    if(process.env.AFW_BUDGET_PREFLIGHT){
     const prior=JSON.parse(await readFile(process.env.AFW_BUDGET_PREFLIGHT,'utf8'));
     assert.equal(prior.source,testRevision);assert.equal(prior.run,process.env.GITHUB_RUN_ID);assert.equal(prior.attempt,process.env.GITHUB_RUN_ATTEMPT);
     const shape=list=>list.map(r=>({role:r.role,path:r.path,rawBytes:r.path==='<stdin>'?null:r.rawBytes,rawSha256:r.path==='<stdin>'?null:r.rawSha256,counts:r.counts,selectors:r.selectors})).sort((a,b)=>a.path.localeCompare(b.path));
     assert.deepEqual(shape([...records.values()]),shape(prior.inputs[role]),'native prepared role hooks match exact prior pure preflight before I0');
    }
   });
  }};
 }
 return Object.freeze({role,plugin,entry:source=>transform('<stdin>',source),records:()=>[...records.values()],prepared:()=>[...prepared]});
}
export function attachBudgetEpochCapture(f,{segment='producer',epochs=[],epoch=0}={}){
 assert(['producer','consumer'].includes(segment));let current=epoch;
 f.budgetEpochs=epochs;
 f.captureBudgetEpoch=async reason=>{
  const qaValue=await f.stub.budgetSnapshot();let QA;try{QA=JSON.parse(JSON.stringify(qaValue));}finally{qaValue[Symbol.dispose]?.();}
  const worker=await f.mf.getWorker('canary-first-connection'),response=await worker.fetch('https://delegated-canary.agentfriendlyweb.dev/_fixture/finite-budget');
  assert.equal(response.status,200);const M=await response.json();
  for(const [role,snapshot]of Object.entries({M,QA})){
   assert.equal(snapshot.purpose,'afw.finite-budget-diagnostics.syn.v1');assert.equal(snapshot.workerRole,role);assert.equal(snapshot.testRevision,process.env.GITHUB_SHA);
   const value={segment,epoch:current,role,reason,capturedAt:Date.now(),snapshot},index=epochs.findIndex(v=>v.segment===segment&&v.epoch===current&&v.role===role);
   if(index<0)epochs.push(value);else epochs[index]=value;
  }
  return epochs;
 };
 f.nextBudgetEpoch=()=>{current++;};
 return f;
}
export async function preflightBudgetCompilation(){
 assert.equal(process.env.AFW_BUDGET_GROUP,'positive');
 const {initialEntryHarness}=await import('./finite-initial-entry-world.mjs');
 const graphs=await initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint:true,budgetCompileOnly:true,budgetQualification:true});
 assert.equal(graphs.I0Opened,false);assert.equal(graphs.nativeExecutionProduced,false);
 assert(graphs.budget?.M?.length&&graphs.budget?.QA?.length);
 assert(graphs.compatibility.M.compatibility_flags.includes('nodejs_compat'));assert(graphs.compatibility.QA.flags.includes('nodejs_compat'));
 const result={purpose:'afw.finite-budget-preflight.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,inputs:graphs.budget,I0Opened:false,nativeExecutionProduced:false,operationalReadiness:false,completePackage:false,PCoff:false};
 await mkdir('output/finite-budget/pure',{recursive:true});await writeFile('output/finite-budget/pure/preflight.json',JSON.stringify(result,null,2));
 return result;
}

export function instrumentBudgetDiagnostics(source,{moduleRole}={}){
 assert(moduleRole&&['M','QA'].includes(moduleRole.workerRole)&&typeof moduleRole.path==='string','fixed role/path selector required');
 return transformBudgetPreparedSource(source,moduleRole.path,moduleRole.workerRole).source;
}
export function extendBudgetQualification(entry){
 return transformBudgetPreparedSource(entry,'<stdin>','QA').source;
}
function positiveKind(kind){assert.equal(kind,'positive','SYN budget kind unsupported before I0');assert.equal(process.env.AFW_BUDGET_GROUP,'positive');}
export async function prepareBudgetProducer(kind,root){
 positiveKind(kind);
 const {produceCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
 return produceCheckpoint(root,{variant:'principal',budgetQualification:true});
}
export async function verifyBudgetCheckpoint(kind,root){
 positiveKind(kind);
 const {verifyCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
 const value=await verifyCheckpoint(root),b=value.data.budget;
 assert.equal(b?.purpose,'afw.finite-budget-checkpoint.syn.v1');assert.equal(b.source,process.env.GITHUB_SHA);
 assert.equal(b.run,process.env.GITHUB_RUN_ID);assert.equal(b.attempt,process.env.GITHUB_RUN_ATTEMPT);
 assert.equal(value.data.variant,'principal');assert.equal(value.data.unexchanged,false);assert.equal(value.data.sdkOnlyBuild,null);
 assert(b.preparedInputs.M.length&&b.preparedInputs.QA.length);assert(b.epochs.length>=2);
 for(const e of b.epochs){assert.equal(e.segment,'producer');assert.equal(e.snapshot.testRevision,process.env.GITHUB_SHA);assert.equal(e.role,e.snapshot.workerRole);}
 return value;
}
export async function runBudgetConsumer(kind,root){
 positiveKind(kind);await verifyBudgetCheckpoint(kind,root);
 const {recoverCheckpoint,observeOriginalAlarm}=await import('./finite-owner-cleanup-persistence.mjs');
 const {plain}=await import('./finite-first-connection-publication.mjs');
 const f=await recoverCheckpoint(root,{label:'finite-budget-positive',restart:false,budgetQualification:true});
 try{
  await f.captureBudgetEpoch('after-consumer-cold-load');
  const facts=await observeOriginalAlarm(f),native=await plain(f.stub.ownerCleanupNativeRows()),fault=await plain(f.stub.ownerCleanupFaultFacts());
  await f.captureBudgetEpoch('consumer-final-before-dispose');
  const result={purpose:'afw.finite-budget-positive-result.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,
   plan:f.plan,recovery:f.recovery,kvSemanticProof:f.kvSemanticProof,facts,fault,native,restores:f.restores.length,pointer:f.providerRegistry.pointer,
   producer:f.checkpoint.budget.ownerReference,sdkAfterExchange:f.checkpoint.sdkAfterExchange,preparedInputs:f.checkpoint.budget.preparedInputs,
   diagnostics:{purpose:'afw.finite-budget-diagnostics.syn.v1',testRevision:process.env.GITHUB_SHA,epochs:structuredClone(f.budgetEpochs)},
   modeledProviderInput:f.checkpoint.modeledProviderInput,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
  return result;
 }finally{
  try{await f.captureBudgetEpoch('consumer-before-dispose');await mkdir('output/finite-budget/positive',{recursive:true});await writeFile('output/finite-budget/positive/epochs.json',JSON.stringify({source:process.env.GITHUB_SHA,epochs:f.budgetEpochs},null,2));}
  finally{await f.mf.dispose();}
 }
}
export async function sealBudgetArtifact(root,kind){
 assert(['pure','checkpoint','positive'].includes(kind));
 await mkdir(root,{recursive:true});
 const files=(await inventoryFiles(root)).filter(f=>f.path!=='budget-artifact.json');
 const manifest={purpose:'afw.finite-budget-artifact.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,kind,files,operationalReadiness:false,completePackage:false,PCoff:false};
 await writeFile(join(root,'budget-artifact.json'),JSON.stringify(manifest,null,2));return manifest;
}
export async function verifyBudgetArtifact(root,kind,artifactId){
 assert.match(artifactId??'',/^[1-9][0-9]*$/);
 const bytes=await readFile(join(root,'budget-artifact.json')),m=JSON.parse(bytes);
 assert.equal(m.purpose,'afw.finite-budget-artifact.syn.v1');assert.equal(m.kind,kind);assert.equal(m.source,process.env.GITHUB_SHA);assert.equal(m.run,process.env.GITHUB_RUN_ID);assert.equal(m.attempt,process.env.GITHUB_RUN_ATTEMPT);
 for(const flag of ['operationalReadiness','completePackage','PCoff'])assert.equal(m[flag],false);
 const files=await inventoryFiles(root);assert.deepEqual(files.filter(f=>f.path!=='budget-artifact.json'),m.files,'exact same-ID downloaded path/bytes/SHA inventory');
 console.info('BUDGET SAME ID READBACK VERIFIED',JSON.stringify({source:m.source,run:m.run,attempt:m.attempt,kind,artifactId,files:files.length,manifestBytes:bytes.length,manifestSha256:hash(bytes),operationalReadiness:false,completePackage:false,PCoff:false}));
 return m;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const main=async()=>{
  const [command,root]=process.argv.slice(2);
  if(command==='preflight-budget')await preflightBudgetCompilation();
  else if(command==='prepare-positive')await prepareBudgetProducer('positive',root);
  else if(command==='verify-positive')await verifyBudgetCheckpoint('positive',root);
  else if(command==='inspect-budget-graphs')await inspectBudgetCompilation(root);
  else throw Error('SYN budget command unsupported before I0');
 };
 // Finish this module before command work imports fixtures that import it.
 setImmediate(()=>{main().catch(error=>{console.error(error);process.exitCode=1;});});
}
