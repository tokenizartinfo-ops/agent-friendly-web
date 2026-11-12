import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,readdir,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,relative,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';
import {budgetReaderSiteCount} from './finite-budget-diagnostics.mjs';
import {verifyObservedBudgetMetrics,verifyCompleteBudgetTrace} from './finite-budget-evidence.mjs';


let fixedCompileProfileOverride=null;
const fixedAdapterFamily=()=>{const group=fixedCompileProfileOverride??process.env.AFW_BUDGET_GROUP;return group==='readonly'?'readonly':['reduction_a','reduction_b'].includes(group)?'reduction':null;};
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
// Source order is independent of esbuild's concurrent onLoad callbacks.
const readerCatalog=[];
for(const role of ['M','QA']){
 const modules=[...budgetNativeDescriptorProposal.sourceDescriptors,...budgetNativeDescriptorProposal.packages]
  .filter(module=>module.roles.includes(role)).sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);
 for(const descriptor of modules){
  const groups=Array.isArray(descriptor.selectors)
   ?descriptor.selectors.flatMap((row,index)=>descriptorMeta(row).edge==='reader'?[[index,row.expectedCount]]:[])
   :[['readerFactory',descriptor.selectors.readerFactory??0]];
  for(const [selector,count] of groups)for(let occurrence=1;occurrence<=count;occurrence++){
   readerCatalog.push({id:readerCatalog.length+1,role,path:descriptor.path,selector,occurrence});
  }
 }
}
assert.equal(readerCatalog.length,budgetReaderSiteCount,'closed reader catalog and runtime enum agree');

function attachReaderSites(ast,nodes,selected,role,path){
 const expected=readerCatalog.filter(entry=>entry.role===role&&entry.path===path);
 const slots=new Map((selected?.calls??[]).map(call=>[call.node,call.selector??call.group]));
 const occurrences=new Map(),proof=[];
 for(const [node,meta] of nodes){
  if(meta.edge!=='reader')continue;
  const selector=slots.get(node),occurrence=(occurrences.get(selector)??0)+1;occurrences.set(selector,occurrence);
  const entry=expected.find(row=>row.selector===selector&&row.occurrence===occurrence);
  assert(entry,'unregistered selected getReader in pinned module '+role+' '+path);
  assert.equal(callShape(node,ast).method,'getReader');
  const start=ast.getLineAndCharacterOfPosition(node.getStart(ast));
  proof.push({...entry,preparedLine:start.line+1,preparedColumn:start.character+1});
  nodes.set(node,{...meta,readerSite:entry.id});
 }
 proof.sort((a,b)=>a.id-b.id);
 assert.deepEqual(proof.map(row=>row.id),expected.map(row=>row.id),'all pinned readers emitted in '+role+' '+path);
 return proof;
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

// A reference target must remain a reference; its receiver/key reads are still visited.
export function isBudgetReferenceTarget(original){
 let node=original;
 for(;;){
  const parent=node.parent;if(!parent)return false;
  if(ts.isParenthesizedExpression(parent)&&parent.expression===node){node=parent;continue;}
  if(ts.isBinaryExpression(parent)&&parent.left===node)return parent.operatorToken.kind>=ts.SyntaxKind.FirstAssignment&&parent.operatorToken.kind<=ts.SyntaxKind.LastAssignment;
  if((ts.isPrefixUnaryExpression(parent)||ts.isPostfixUnaryExpression(parent))&&parent.operand===node)return parent.operator===ts.SyntaxKind.PlusPlusToken||parent.operator===ts.SyntaxKind.MinusMinusToken;
  if(ts.isDeleteExpression(parent)&&parent.expression===node)return true;
  if((ts.isForInStatement(parent)||ts.isForOfStatement(parent))&&parent.initializer===node)return true;
  if((ts.isSpreadElement(parent)||ts.isSpreadAssignment(parent))&&parent.expression===node){node=parent;continue;}
  if(ts.isPropertyAssignment(parent)&&parent.initializer===node){node=parent;continue;}
  if(ts.isArrayLiteralExpression(parent)&&parent.elements.includes(node)){node=parent;continue;}
  if(ts.isObjectLiteralExpression(parent)&&parent.properties.includes(node)){node=parent;continue;}
  // In particular, do not ascend through a larger member receiver or computed key.
  return false;
 }
}
export function rewriteBudgetIdentityAccess(original,node,{ast,path,hook,count}){
 if(!(ts.isPropertyAccessExpression(original)||ts.isElementAccessExpression(original))||isBudgetReferenceTarget(original))return node;
 const f=ts.factory,literal=createBudgetLiteral;
 if(ts.isElementAccessExpression(original)&&ts.isVariableDeclaration(original.parent)&&original.parent.name.getText(ast)==='method'){
  count('identity');return hook('readMethod',[node.expression,node.argumentExpression]);
 }
 if(ts.isPropertyAccessExpression(original)){
  const method=original.name.text,receiver=original.expression.getText(ast),optional=!!original.questionDotToken;
  if(path==='worker/mcp-own/finite.mjs'&&receiver==='request'&&method==='method'){count('scope');return hook('methodValue',[f.createIdentifier('request'),node]);}
  const resource=RESOURCE_BINDINGS[method];
  if(resource&&/(?:^|\.)env$/.test(receiver)){count('identity');return hook('nativeHolder',[node,literal(resource),literal(resource==='DO'?'namespace':'holder')]);}
  if(method==='storage'&&/^(?:this\.ctx|ctx|context)$/.test(receiver)){count('identity');return hook('nativeHolder',[node,literal('DO'),literal('storage')]);}
  if(method==='body'){count('body');return hook('body',[node.expression,optional?f.createTrue():f.createFalse()]);}
  if((CAPTURE_METHODS.has(method)||ts.isVariableDeclaration(original.parent)&&original.parent.name.getText(ast)==='method')&&!(ts.isCallExpression(original.parent)&&original.parent.expression===original)){
   count('identity');return hook('readMethod',[node.expression,literal(method),optional?f.createTrue():f.createFalse()]);
  }
 }
 return node;
}

// Pinned cleanup source gives work() a local put adapter around the captured transaction leaf.
function isInitialCleanupPutAdapter(node,ast,path){
 if(path!=='lib/mcp-qa-finite-initial-cleanup.mjs')return false;
 const call=node.parent;
 if(!ts.isCallExpression(call)||call.expression.getText(ast)!=='work'||call.arguments[0]!==node)return false;
 if(!node.properties.some(p=>ts.isShorthandPropertyAssignment(p)&&p.name.text==='put'))return false;
 let block=call.parent;
 while(block&&!ts.isBlock(block))block=block.parent;
 if(!block)return false;
 const definitions=block.statements.filter(ts.isVariableStatement)
  .filter(statement=>statement.declarationList.flags&ts.NodeFlags.Const)
  .flatMap(statement=>[...statement.declarationList.declarations])
  .filter(d=>ts.isIdentifier(d.name)&&d.name.text==='put');
 const wrapper=definitions.length===1?definitions[0].initializer:null;
 return Boolean(wrapper&&ts.isArrowFunction(wrapper)&&wrapper.getText(ast)==='async(key,value)=>{check();await parent.retain(Reflect.apply(tp,tx,[key,value]));check();}');
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
 const readerSites=attachReaderSites(ast,selectedNodes,selected,role,path);
 const transactionCallbacks=new Set();
 for(const node of selectedNodes.keys()){
  const shape=callShape(node,ast);
  const cleanupJournalTransaction=path==='lib/mcp-qa-finite-owner-cleanup-journal.mjs'&&shape.form==='Reflect.apply'&&shape.target==='c.transaction'&&shape.receiver==='c.storage';
  const transaction=cleanupJournalTransaction||shape.method==='transaction'||['transaction','native.transaction','nt'].includes(shape.target);
  if(!transaction)continue;
  const arg=shape.form==='Reflect.apply'&&ts.isArrayLiteralExpression(node.arguments[2])?node.arguments[2].elements[0]:shape.form==='Function.call'?node.arguments[1]:node.arguments[0];
  if(cleanupJournalTransaction)assert(arg&&ts.isArrowFunction(arg),'fixed cleanup journal transaction callback');
  if(arg&&(ts.isArrowFunction(arg)||ts.isFunctionExpression(arg)))transactionCallbacks.add(arg);
 }
 const f=ts.factory,id=()=>f.createIdentifier(BUDGET_ID),access=name=>f.createPropertyAccessExpression(id(),name);
 const literal=createBudgetLiteral;
 const hook=(name,args)=>f.createCallExpression(access(name),undefined,args);
 let nativeCalls=0,identityEdges=0,bodyEdges=0,facadeEdges=0,scopeEdges=0,guardEdges=0,cleanupPutAdapters=0;
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
   const identity=rewriteBudgetIdentityAccess(original,node,{ast,path,hook,count:kind=>{if(kind==='identity')identityEdges++;else if(kind==='body')bodyEdges++;else if(kind==='scope')scopeEdges++;else assert.fail('fixed identity hook kind');}});
   if(identity!==node)return identity;
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
    if(isInitialCleanupPutAdapter(original,ast,path)){cleanupPutAdapters++;names.push('put');}
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
 assert.equal(cleanupPutAdapters,path==='lib/mcp-qa-finite-initial-cleanup.mjs'?1:0,'fixed local cleanup put adapter');
 assert.equal(scopeEdges,expectedScopes[path]??0,'fixed prepared scope hook count '+role+' '+path);
 const transformed=ts.createPrinter({newLine:ts.NewLineKind.LineFeed}).printFile(result.transformed[0]);result.dispose();sourceAST(transformed,path);
 return {source:"import {budget as "+BUDGET_ID+"} from 'afw:budget-runtime';\n"+transformed,counts:{nativeCalls,identityEdges,bodyEdges,facadeEdges,scopeEdges,guardEdges},selectorCounts:selected?.counts??[],readerSites};
}

const scopeInputPins=budgetNativeDescriptorProposal.implementationSupplement.scopeInputPins;
function requireOrdinaryObserver(){
 assert.equal(process.env.AFW_BUDGET_DIAGNOSTIC_CANDIDATE,undefined,'deprecated diagnostic candidate rejected before I0');
}


function fixedSdkSettlementSequence(source,label){
 const ast=sourceAST(source,'SYN-fixed-SDK-sequence-'+label),matches=[],receivers=[];
 const call=(node,receiver,method,args)=>ts.isCallExpression(node)&&ts.isPropertyAccessExpression(node.expression)&&node.expression.expression.getText(ast)===receiver&&node.expression.name.text===method&&node.arguments.length===args.length&&node.arguments.every((arg,index)=>arg.getText(ast)===args[index]);
 const declaration=(statement,name)=>ts.isVariableStatement(statement)&&statement.declarationList.declarations.length===1&&statement.declarationList.declarations[0].name.getText(ast)===name?statement.declarationList.declarations[0]:null;
 const retainedSdk=statement=>{
  const d=declaration(statement,'actual'),outer=d?.initializer;
  return outer&&ts.isCallExpression(outer)&&outer.expression.getText(ast)==='retain'&&outer.arguments.length===1&&call(outer.arguments[0],'api','revokeGrant',['selector','i.subject']);
 };
 const walk=node=>{
  if(ts.isVariableStatement(node)){
   const d=declaration(node,'actual'),outer=d?.initializer;
   if(outer&&ts.isCallExpression(outer)&&outer.expression.getText(ast)==='retain'&&outer.arguments.length===1){
    const inner=outer.arguments[0];
    if(ts.isCallExpression(inner)&&ts.isPropertyAccessExpression(inner.expression)&&inner.expression.name.text==='revokeGrant')receivers.push(inner.expression.expression.getText(ast));
   }
  }
  if(ts.isBlock(node))for(let index=0;index+3<node.statements.length;index++){
   const [assignment,awaited,checked,metrics]=node.statements.slice(index,index+4);
   if(!retainedSdk(assignment))continue;
   assert(ts.isExpressionStatement(awaited)&&ts.isAwaitExpression(awaited.expression)&&ts.isIdentifier(awaited.expression.expression)&&awaited.expression.expression.text==='actual','SDK actual standalone await adjacency '+label);
   assert(ts.isExpressionStatement(checked)&&ts.isCallExpression(checked.expression)&&checked.expression.expression.getText(ast)==='check'&&checked.expression.arguments.length===0,'SDK original check adjacency '+label);
   const metric=declaration(metrics,'metrics');assert(metric&&call(metric.initializer,'bounded','facts',[]),'SDK bounded metrics same-block adjacency '+label);
   matches.push(assignment.end);
  }
  ts.forEachChild(node,walk);
 };walk(ast);
 assert.equal(matches.length,1,'single structural actual SDK settlement sequence '+label);
 assert.deepEqual(receivers.sort(),['api','store'],'two distinct original revokeGrant receivers '+label);
 return {end:matches[0],sites:matches.length,sameNameReceivers:receivers,receiver:'api',method:'revokeGrant',args:['selector','i.subject'],adjacency:['const-actual-retain-api','await-actual','check','bounded-facts']};
}

function fixedQueueObservation(baseline,originalSdk){
 const ast=sourceAST(baseline,'SYN-fixed-queue-observation'),sites=[],sdk=fixedSdkSettlementSequence(baseline,'emitted-baseline'),sdkSites=[sdk.end];
 const walk=node=>{
  if(ts.isExpressionStatement(node)&&ts.isCallExpression(node.expression)&&ts.isPropertyAccessExpression(node.expression.expression)&&node.expression.expression.getText(ast)==='queue.push'){
   let owner=node.parent,family=null;
   while(owner){if(ts.isFunctionDeclaration(owner)&&['readonlyGrantKv','reductionKv'].includes(owner.name?.text)){family=owner.name.text==='readonlyGrantKv'?1:2;break;}owner=owner.parent;}
   if(family!==null){
    assert.equal(node.expression.arguments.length,1);assert(ts.isObjectLiteralExpression(node.expression.arguments[0]));
    assert.deepEqual(node.expression.arguments[0].properties.map(p=>p.name.getText(ast)),['method','args','resolve','reject']);
    sites.push({family,end:node.end});
   }
  }ts.forEachChild(node,walk);
 };walk(ast);assert.deepEqual(sites.map(s=>s.family),[1,2],'exact two original enqueue notifications after pinned baseline transform');
 assert.equal(sdkSites.length,1,'single passive actual SDK settlement site');
 const edits=sites.map(site=>({end:site.end,text:"\ntry{globalThis.__afwFixedSynBudgetQueueObserve?.(alias,"+site.family+",queue.length,active,Date.now());}catch{}\n"}));
 edits.push({end:sdkSites[0],text:"\n{try{const __afwSynSdkObserver=Reflect.apply(__afwFixedSynPromiseThen,actual,[()=>{try{globalThis.__afwFixedSynBudgetSdkObserve?.(life.alias,1,Date.now());}catch{}},()=>{try{globalThis.__afwFixedSynBudgetSdkObserve?.(life.alias,2,Date.now());}catch{}}]);Reflect.apply(__afwFixedSynPromiseThen,__afwSynSdkObserver,[()=>undefined,()=>undefined]);}catch{}}\n"});
 let source=baseline;for(const edit of edits.sort((a,b)=>b.end-a.end))source=source.slice(0,edit.end)+edit.text+source.slice(edit.end);
 source="const __afwFixedSynPromiseThen=Promise.prototype.then;\n"+source;
 sourceAST(source,'SYN-fixed-queue-emission');
 return {source,proof:{purpose:'afw.fixed-syn-queue-observation.v1',baselineBytes:Buffer.byteLength(baseline),baselineSha256:hash(baseline),emittedBytes:Buffer.byteLength(source),emittedSha256:hash(source),sites:sites.map(s=>s.family),sdkSettlementSites:sdkSites.length,sdkDeclarationProvenance:{original:originalSdk,emitted:Object.fromEntries(Object.entries(sdk).filter(([key])=>key!=='end')),protectedModuleBlob:'1a5a2583d266179cdd89f799c64199f29044fec5',originalStatementSha256:hash('const actual=retain(api.revokeGrant(selector,i.subject));')},fields:['alias-identity','numeric-family','queued','active','timestamp'],businessAuthority:false}};
}
async function appendFixedSynAdapter(baseline,family){
 const ast=sourceAST(baseline,'SYN-baseline-entry'),classes=ast.statements.filter(n=>ts.isClassDeclaration(n)&&n.name?.text==='Initial');
 assert.equal(classes.length,1,'same existing named DO class');const node=classes[0];
 assert(node.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword));
 assert.equal(node.heritageClauses?.[0]?.types[0]?.expression.getText(ast),'FiniteClosure');
 const names=node.members.map(n=>n.name?.getText(ast)),added=['finiteBudgetReadonly','finiteBudgetReduction','finiteBudgetSignals','finiteBudgetRelease','finiteBudgetRestore'];
 for(const name of ['ownerReferenceConfigure','ownerCleanupFault','firstConnectionAvailability'])assert.equal(names.filter(n=>n===name).length,1);
 for(const name of added)assert(!names.includes(name)&&!baseline.includes(name),'no SYN method collision');
 const {finiteBudgetSynAdapterSource}=await import('./finite-owner-cleanup.mjs');
 assert(['readonly','reduction'].includes(family));
 const literal="const __afwFiniteBudgetFamily="+JSON.stringify(family)+";\n"+finiteBudgetSynAdapterSource;
 const extension=sourceAST(literal,'SYN-fixed-prototype-adapter'),calls=[];
 const operationInventory=Object.fromEntries(["Reflect.apply(","Object.defineProperty(","Object.defineProperties(","Promise.allSettled(","new WeakMap("].map(marker=>[marker,finiteBudgetSynAdapterSource.split(marker).length-1]));assert.deepEqual(operationInventory,{"Reflect.apply(":21,"Object.defineProperty(":2,"Object.defineProperties(":1,"Promise.allSettled(":1,"new WeakMap(":2},'closed fixed adapter operation inventory');
 const walk=n=>{if(ts.isCallExpression(n)){const expression=n.expression.getText(extension);if(expression==='Object.defineProperties'){
  assert.equal(n.arguments[0].getText(extension),'Initial.prototype');assert(ts.isObjectLiteralExpression(n.arguments[1]));calls.push(n.arguments[1].properties.map(p=>p.name.getText(extension)));
 }}ts.forEachChild(n,walk);};walk(extension);assert.deepEqual(calls,[added]);
 const source=baseline+'\n'+literal;assert.equal(source.slice(0,baseline.length),baseline,'exact original emitted prefix');
 return {source,proof:{purpose:'afw.fixed-syn-prototype-adapter.v1',family,baselineBytes:Buffer.byteLength(baseline),baselineSha256:hash(baseline),literalBytes:Buffer.byteLength(literal),literalSha256:hash(literal),emittedBytes:Buffer.byteLength(source),emittedSha256:hash(source),methods:added,operationInventory,nativeInputAndAckObservationsSeparate:true,businessAuthority:false,originalEntryBytes:64800,originalEntrySha256:'89ae285b8f00fdf95eecfeee37673138f4c136c7704f245152051a3be2985257'}};
}

export function createBudgetCompiler(role){
 assert(['M','QA'].includes(role));const testRevision=process.env.GITHUB_SHA;assert.match(testRevision??'',/^[a-f0-9]{40}$/,'budget actual Actions revision before I0');
 requireOrdinaryObserver();const runtimeOptions={testRevision,workerRole:role};
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
  const family=fixedAdapterFamily(),originalSdk=family&&role==='QA'&&path==='lib/mcp-qa-finite-owner-cleanup.mjs'?fixedSdkSettlementSequence(source,'original-prepared'):null;
  let result=transformBudgetPreparedSource(source,path,role);let additionalSYN=null;
  if(family&&role==='QA'&&path==='<stdin>'){const emitted=await appendFixedSynAdapter(result.source,family);additionalSYN=emitted.proof;result={...result,source:emitted.source};}
  if(family&&role==='QA'&&path==='lib/mcp-qa-finite-owner-cleanup.mjs'){assert.equal(source.split('const actual=retain(api.revokeGrant(selector,i.subject));').length-1,1,'original SDK call and retain unchanged');const emitted=fixedQueueObservation(result.source,Object.fromEntries(Object.entries(originalSdk).filter(([key])=>key!=='end')));additionalSYN=emitted.proof;result={...result,source:emitted.source};}
  records.set(path,{role,path,rawBytes:Buffer.byteLength(raw),rawSha256:hash(raw),preparedBytes:Buffer.byteLength(source),preparedSha256:hash(source),emittedBytes:Buffer.byteLength(result.source),emittedSha256:hash(result.source),counts:result.counts,selectors:result.selectorCounts,readerSites:result.readerSites,...additionalSYN?{additionalSYN}:{}});
  prepared.set(path,result.source);return result.source;
 }
 function plugin(existing=null){
  return {name:'fixed-finite-budget-'+role,setup(builder){
   builder.onResolve({filter:/^afw:budget-runtime$/},()=>({path:'runtime',namespace:'afw-budget'}));
   builder.onLoad({filter:/.*/,namespace:'afw-budget'},()=>({contents:"import {createBudgetRuntime} from "+JSON.stringify(resolve('test/fixtures/finite-budget-diagnostics.mjs'))+";export const budget=createBudgetRuntime("+JSON.stringify(runtimeOptions)+");",loader:'js',resolveDir:process.cwd()}));
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
    assert(!Object.keys(result.metafile?.inputs??{}).some(path=>path.endsWith('finite-budget-descriptors.json')||path.endsWith('finite-budget-world.mjs')||path.endsWith('finite-budget-evidence.mjs')),'Node-only map/compiler excluded from Worker bundle');
    const actualIds=[...records.values()].flatMap(record=>record.readerSites.map(site=>site.id)).sort((a,b)=>a-b);
    assert.deepEqual(actualIds,readerCatalog.filter(site=>site.role===role).map(site=>site.id),'complete role reader catalog before I0');
    if(process.env.AFW_BUDGET_PREFLIGHT){
     const prior=JSON.parse(await readFile(process.env.AFW_BUDGET_PREFLIGHT,'utf8'));
     assert.equal(prior.source,testRevision);assert.equal(prior.run,process.env.GITHUB_RUN_ID);assert.equal(prior.attempt,process.env.GITHUB_RUN_ATTEMPT);
     assert.equal(prior.observerChronology,'afw.finite-budget-chronology.syn.v2','same v2 preflight');
     const shape=list=>list.map(r=>({role:r.role,path:r.path,rawBytes:r.path==='<stdin>'?null:r.rawBytes,rawSha256:r.path==='<stdin>'?null:r.rawSha256,counts:r.counts,selectors:r.selectors,readerSites:r.readerSites})).sort((a,b)=>a.path.localeCompare(b.path));
     assert.deepEqual(shape([...records.values()]),shape(prior.inputs[role]),'native prepared role hooks match exact prior pure preflight before I0');
     const extra=list=>list.filter(record=>record.additionalSYN).map(record=>({path:record.path,...record.additionalSYN})).sort((a,b)=>a.path.localeCompare(b.path));assert.deepEqual(extra([...records.values()]),extra(prior.inputs[role]),'exact fixed SYN additional-emission provenance before I0');
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
 const requestedGroup=process.env.AFW_BUDGET_GROUP;assert(['positive','readonly','reduction_a'].includes(requestedGroup));
 requireOrdinaryObserver();
 const {initialEntryHarness}=await import('./finite-initial-entry-world.mjs');
 let graphs;fixedCompileProfileOverride=requestedGroup;process.env.AFW_BUDGET_GROUP='positive';
 try{graphs=await initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint:true,budgetCompileOnly:true,budgetQualification:true});}finally{fixedCompileProfileOverride=null;process.env.AFW_BUDGET_GROUP=requestedGroup;}
 assert.equal(graphs.I0Opened,false);assert.equal(graphs.nativeExecutionProduced,false);
 assert(graphs.budget?.M?.length&&graphs.budget?.QA?.length);
 assert(graphs.compatibility.M.compatibility_flags.includes('nodejs_compat'));assert(graphs.compatibility.QA.flags.includes('nodejs_compat'));
 const additions=graphs.budget.QA.filter(record=>record.additionalSYN).map(record=>({path:record.path,...record.additionalSYN}));assert.equal(additions.length,requestedGroup==='positive'?0:2);
 if(requestedGroup!=='positive'){assert.deepEqual(additions.find(r=>r.path==='lib/mcp-qa-finite-owner-cleanup.mjs').sites,[1,2]);assert.equal(additions.find(r=>r.path==='lib/mcp-qa-finite-owner-cleanup.mjs').sdkSettlementSites,1);assert.equal(additions.find(r=>r.path==='<stdin>').family,requestedGroup==='readonly'?'readonly':'reduction');}
 const result={purpose:'afw.finite-budget-preflight.syn.v1',group:requestedGroup,additionalSYN:additions,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,inputs:graphs.budget,I0Opened:false,nativeExecutionProduced:false,operationalReadiness:false,completePackage:false,PCoff:false};
 result.observerChronology='afw.finite-budget-chronology.syn.v2';
 await mkdir('output/finite-budget/pure',{recursive:true});await writeFile('output/finite-budget/pure/preflight-'+requestedGroup+'.json',JSON.stringify(result,null,2));if(requestedGroup==='positive')await writeFile('output/finite-budget/pure/preflight.json',JSON.stringify(result,null,2));
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
 if(kind==='reduction')return prepareReductionProducer(root);
 positiveKind(kind);
 const {produceCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
 return produceCheckpoint(root,{variant:'principal',budgetQualification:true});
}

async function preparePositiveProbe(root){
 positiveKind('positive');
 assert.equal(root,'output/finite-budget/producer');
 assert.equal(process.env.AFW_BUDGET_PREFLIGHT,'output/finite-budget/prior-pure/preflight.json');
 requireOrdinaryObserver();
 const checkpoint='output/chronology-native-checkpoint';
 const {produceCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
 console.info('AFW_PROBE {"kind":"step","step":"producer-entered"}');
 await produceCheckpoint(checkpoint,{variant:'principal',budgetQualification:true,deferWait:true});
 console.info('AFW_PROBE {"kind":"step","step":"producer-returned"}');
 const returnedAt=Date.now();
 const {manifest,data}=await verifyBudgetCheckpoint('positive',checkpoint);
 console.info('AFW_PROBE {"kind":"step","step":"checkpoint-verified"}');
 const {I0,C0,C1}=manifest;
 const {completeNormal,completeWrites,referenceRows,referenceReadbacks}=data.budget.ownerReference;
 const noticeRows=data.facts.rows.filter(([key])=>key.startsWith('connection-preparation:')&&key.endsWith(':notice')).length;
 const epochs=data.budget.epochs;
 const recordLimits={operations:16384,guards:16384,scopes:16384};
 const facts={
  recordLimits,
  purpose:'afw.finite-budget-producer-probe.syn.v1',scope:'partial-producer-only',
  source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,
  I0,C0,C1,returnedAt,completeNormal,completeWrites,referenceRows,referenceReadbacks,noticeRows,
  disposedBeforeC0:returnedAt<C0,originalAlarmObserved:data.facts.signal.entered!==0,
  operationalReadiness:false,completePackage:false,PCoff:false
 };
 await mkdir(join(root,'graphs'),{recursive:true});
 await writeFile(join(root,'full-result.json'),JSON.stringify({facts,epochs,preparedInputs:data.budget.preparedInputs},null,2));
 const aggregates=[{kind:'facts',...facts}];let rejectedProjection=false;
 const siteMap=Object.values(data.budget.preparedInputs).flatMap(records=>records.flatMap(record=>record.readerSites)).sort((a,b)=>a.id-b.id);
 assert.deepEqual(siteMap.map(site=>site.id),readerCatalog.map(site=>site.id),'producer contains every fixed site');
 for(const site of siteMap)aggregates.push({kind:'readerSite',...site});
 for(const {segment,epoch,role,snapshot} of epochs){
  const {purpose,eventCalls,byEvent,firstInvalid,invalid,unattributed,reasons}=snapshot.chronology;
  const who={segment,epoch,role};
  const {retention,coverage}=snapshot,{scopes,...totals}=snapshot.totals;
  assert.equal(retention.operationRows.limit,recordLimits.operations);assert.equal(retention.guardRows.limit,recordLimits.guards);assert.equal(retention.scopeRows.limit,recordLimits.scopes);
  const expectedComplete=coverage.invalid===0&&coverage.unattributed===0&&!coverage.numericOverflow&&retention.scopeRows.omitted===0;
  assert.equal(coverage.observedMetricsComplete,expectedComplete);
  let observedProof=null,traceProof=null;
  try{
   if(expectedComplete){
    observedProof=verifyObservedBudgetMetrics(snapshot);
    if(retention.traceComplete)traceProof=verifyCompleteBudgetTrace(snapshot);
   }else{
    assert.throws(()=>verifyObservedBudgetMetrics(snapshot),coverage.numericOverflow?/numeric overflow/:/incomplete observed metrics/);
   }
  }catch{
   rejectedProjection=true;
   aggregates.push({kind:'proofRejected',...who,expectedComplete});
  }
  aggregates.push({kind:'chronology',...who,purpose,eventCalls,byEvent,firstInvalid,invalid,unattributed,coverage});
  aggregates.push({kind:'retention',...who,retention,observedProof,traceProof});
  aggregates.push({kind:'totals',...who,totals,enumeratedScopes:scopes.length,maximumEnumeratedScopePeak:scopes.reduce((peak,s)=>Math.max(peak,s.peak),0)});
  for(const group of snapshot.byPhaseResource)aggregates.push({kind:'phaseResource',...who,...group});
  aggregates.push({kind:'reasons',...who,reasons});
  const {beforeRetentionOmission,afterRetentionOmission,firstReaderOrigin}=snapshot.chronology.readerOrigins;
  assert.equal(beforeRetentionOmission.length,budgetReaderSiteCount+1);assert.equal(afterRetentionOmission.length,budgetReaderSiteCount+1);
  const sum=array=>array.reduce((total,value)=>total+value,0);
  assert.equal(sum(beforeRetentionOmission)+sum(afterRetentionOmission),reasons.readerOrigin);
  aggregates.push({kind:'readerFirst',...who,firstReaderOrigin,before:sum(beforeRetentionOmission),after:sum(afterRetentionOmission)});
  for(let site=0;site<=budgetReaderSiteCount;site++)if(beforeRetentionOmission[site]||afterRetentionOmission[site]){
   if(site)assert.equal(siteMap[site-1].role,role);
   aggregates.push({kind:'readerCounts',...who,site,before:beforeRetentionOmission[site],after:afterRetentionOmission[site]});
  }
 }
 const proofNames=['graphs/native-syn.json','graphs/metafiles.json','graphs/canary-index.mjs','graphs/qa-index.mjs','manifest.json'];
 for(const name of proofNames){
  const file=join(checkpoint,name);
  const bytes=await readFile(file);
  const proof={path:name,bytes:bytes.length,sha256:hash(bytes)};
  if(name!=='manifest.json')assert.deepEqual(proof,manifest.files.find(entry=>entry.path===name));
  await copyFile(file,join(root,name));
  aggregates.push({kind:'proof',...proof});
 }
 await writeFile(join(root,'aggregates.json'),JSON.stringify(aggregates,null,2));
 for(const record of aggregates){
  const line='AFW_PROBE '+JSON.stringify(record);
  assert(Buffer.byteLength(line,'utf8')<=2048,'bounded SYN aggregate');
  console.info(line);
 }
 assert.equal(rejectedProjection,false,'producer projection failed its declared evidence check');
 assert.equal(C0,I0+900000);assert.equal(C1,C0+180000);assert(facts.disposedBeforeC0);assert.equal(facts.originalAlarmObserved,false);
 assert.equal(completeNormal,1);assert.equal(completeWrites,1);assert.equal(referenceRows,1);assert(referenceReadbacks>0);assert.equal(noticeRows,1);
 const identities=new Set();
 for(const {segment,role,epoch,snapshot} of epochs){
  assert.equal(segment,'producer');assert(['M','QA'].includes(role));
  assert(Number.isSafeInteger(epoch)&&epoch>=0);const key=role+'|'+epoch;assert(!identities.has(key));identities.add(key);
  const {purpose,eventCalls,byEvent,reasons,firstInvalid,invalid,unattributed}=snapshot.chronology;
  const sum=values=>Object.values(values).reduce((a,b)=>a+b,0);
  assert.equal(purpose,'afw.finite-budget-chronology.syn.v2');assert.equal(sum(byEvent),eventCalls);
  assert.equal(sum(invalid),snapshot.coverage.invalid);assert.equal(sum(reasons),snapshot.coverage.invalid);
  assert.equal(sum(unattributed),snapshot.coverage.unattributed);assert.equal(!!firstInvalid,snapshot.coverage.invalid>0);
  assert.equal(!snapshot.retention.traceComplete,snapshot.coverage.overflow);
 }
 for(const {epoch} of epochs){assert(identities.has('M|'+epoch));assert(identities.has('QA|'+epoch));}
}

export async function verifyBudgetCheckpoint(kind,root){
 if(kind==='reduction')return verifyReductionCheckpoint(root);
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

const budgetFixedFlags={operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
const fixedBudgetPause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function fixedBudgetWait(read,predicate,deadline){
 for(;;){const value=await read();if(predicate(value))return value;assert(Date.now()<deadline,'SYN fixed budget observation deadline');await fixedBudgetPause(20);}
}
function fixedBudgetEnvelope(role,kind,cases,extra={}){
 assert.equal(process.env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(process.env.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');
 return {purpose:'afw.fixed-budget-lineage.syn.v1',repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:1,role,kind,cases,...extra,...budgetFixedFlags};
}
async function fixedBudgetPersist(name,value){
 const root='output/finite-budget/'+name;await mkdir(root,{recursive:true});await writeFile(join(root,'full-result.json'),JSON.stringify(value,null,2));return value;
}
export async function runBudgetReadonlyCase(caseName){
 assert.equal(process.env.AFW_BUDGET_GROUP,'readonly');assert(['R1','R2','R3'].includes(caseName));
 const {ownerReferenceFixture,prepareOwnerReference,recordOwnerReference}=await import('./finite-owner-cleanup.mjs'),{plain}=await import('./finite-first-connection-publication.mjs');
 const cleanups=[];let f,response,rootDuring,rootAfter,rootBefore,beforeRelease,afterRelease;
 try{
  f=await ownerReferenceFixture({after(fn){cleanups.push(fn);}},{cleanupCheckpoint:true,budgetQualification:true});f.finiteBudgetReadonlyCase=caseName;
  const prepared=await prepareOwnerReference(f);rootBefore=await plain(f.stub.firstConnectionAvailability());assert.equal(rootBefore.available,true);
  const issue=prepared.issue();
  if(caseName==='R3'){const held=await fixedBudgetWait(()=>plain(f.stub.finiteBudgetSignals()),s=>s.heldNativeSettled===2,Date.now()+30000);assert.equal(held.queueObserverInvalid,false);assert(held.queuedAtHold>0,'actual populated readonly queue');}
  response=await issue;await response.body?.cancel();
  const observed=await plain(f.stub.ownerReferenceObserve());
  if(caseName==='R3'){
   rootDuring=await plain(f.stub.firstConnectionAvailability());assert.equal(rootDuring.available,false);assert.equal(rootDuring.live,true);
   beforeRelease=await plain(f.stub.finiteBudgetSignals());assert.equal(beforeRelease.nativeUnsettled,0);assert.equal(beforeRelease.outwardPending,2);
   await f.stub.finiteBudgetRelease();await fixedBudgetPause(100);afterRelease=await plain(f.stub.finiteBudgetSignals());rootAfter=await plain(f.stub.firstConnectionAvailability());
  }else{await f.stub.finiteBudgetRelease();afterRelease=await plain(f.stub.finiteBudgetSignals());}
  const native=afterRelease,reference=await plain(f.stub.ownerReferenceObserve()),record=await recordOwnerReference(f,'budget-'+caseName,{responseStatus:response.status});
  const referenceIndex=observed.trace.indexOf('reference-readback-native-settled'),responseIndex=observed.trace.indexOf('native-authorize-response:302');
  const cleanupFacts=await plain(f.stub.ownerCleanupFacts()),plan=JSON.parse(cleanupFacts.rows.find(([key])=>key==='afw.finite-initial-cleanup.v1:plan')[1]);
  const sdkRoot=JSON.parse(reference.rows.find(([key])=>key.endsWith(':root'))[1]),referenceRow=reference.rows.find(([key])=>key.endsWith(':reference')),sdkReference=referenceRow?JSON.parse(referenceRow[1]):null;
  assert.equal(sdkRoot.I0,plan.I0);assert.equal(sdkRoot.C0,plan.C0);assert.equal(sdkRoot.C1,plan.C1);assert.equal(sdkReference!==null,caseName==='R1');
  const mounted=f.cleanupCheckpointInputs().currentMountedOptions,graphs=[['M','canary-first-connection'],['QA','qa-first-connection']].map(([role,worker])=>{
   const actual=mounted.workers.find(value=>value.name===worker);assert(actual);assert.equal(hash(actual.script),f.firstConnectionBuild[role].sha256);
   return {role,worker,sha256:f.firstConnectionBuild[role].sha256,bytes:f.firstConnectionBuild[role].bytes,mounted:true};
  });
  const lineage={I0:plan.I0,C0:plan.C0,C1:plan.C1,sdkRootHash:sdkRoot.recordHash,sdkReferenceHash:sdkReference?.recordHash??null,graphs};

  const facts={...native,completeWrites:observed.completeWrites,completeNormal:observed.completeNormal,responseStatus:response.status,referenceRows:reference.rows.filter(([key])=>key.endsWith(':reference')).length,
   referenceBefore302:referenceIndex>=0&&responseIndex>referenceIndex,sdkReplay:Math.max(0,observed.completeWrites-1),rootBefore,rootDuring,rootAfter,
   originalChildElapsedMs:observed.lookupChild?.actualElapsedMs??null,callsAfterRelease:beforeRelease?native.nativeInvoked-beforeRelease.nativeInvoked:0,lateReference:caseName==='R3'&&reference.rows.some(([key])=>key.endsWith(':reference'))};
  return await fixedBudgetPersist('readonly/'+caseName,{...fixedBudgetEnvelope('consumer','readonly',[caseName],{consumerGroup:'readonly'}),caseName,facts,record,lineage,privateLineage:{sdkRoot,sdkReference,originalCleanupPlan:plan,actualBuildPair:f.firstConnectionBuild},diagnostics:{epochs:structuredClone(f.budgetEpochs)},preparedInputs:f.firstConnectionBuild.budget});
 }finally{
  if(f){try{await f.stub.finiteBudgetRelease();await f.stub.finiteBudgetRestore();}finally{for(const cleanup of cleanups.reverse())await cleanup();}}
 }
}
async function prepareReductionProducer(root){
 assert.equal(process.env.AFW_BUDGET_GROUP,'reduction_a');
 const {produceCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
 const manifest=await produceCheckpoint(join(root,'native'),{variant:'principal',unexchanged:true,budgetQualification:true,sdkOnly:false});
 const lineage=fixedBudgetEnvelope('producer','reduction',['D1','D2','D3','D4'],{producerGroup:'reduction_a',nativeManifestSha256:hash(await readFile(join(root,'native','manifest.json'))),I0:manifest.I0,C0:manifest.C0,C1:manifest.C1});
 await writeFile(join(root,'lineage.json'),JSON.stringify(lineage,null,2));return lineage;
}
async function verifyReductionCheckpoint(root,{consumer=false}={}){
 const {verifyCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
 const lineage=JSON.parse(await readFile(join(root,'lineage.json'),'utf8')),expected=fixedBudgetEnvelope('producer','reduction',['D1','D2','D3','D4'],{producerGroup:'reduction_a',nativeManifestSha256:lineage.nativeManifestSha256,I0:lineage.I0,C0:lineage.C0,C1:lineage.C1});
 assert.deepEqual(lineage,expected,'fixed producer bindings separate from consumer group');
 assert.equal(hash(await readFile(join(root,'native','manifest.json'))),lineage.nativeManifestSha256);
 const value=await verifyCheckpoint(join(root,'native')),b=value.data.budget;
 assert.equal(value.data.unexchanged,true);assert.equal(value.data.sdkOnlyBuild,null);assert.equal(value.data.sdkAfterExchange,null);assert.equal(value.data.lateToken,null);assert.equal(value.data.sdkUnexchanged.codeExchanged,false);
 assert.equal(b.source,process.env.GITHUB_SHA);assert.equal(b.run,process.env.GITHUB_RUN_ID);assert.equal(b.attempt,process.env.GITHUB_RUN_ATTEMPT);assert.equal(b.ownerReference.completeNormal,1);assert.equal(b.ownerReference.referenceRows,1);
 assert.deepEqual([value.manifest.I0,value.manifest.C0,value.manifest.C1],[lineage.I0,lineage.C0,lineage.C1]);
 if(consumer){
  assert.match(process.env.AFW_BUDGET_PRODUCER_ARTIFACT_ID??'',/^[1-9][0-9]*$/);assert.match(process.env.AFW_BUDGET_PRODUCER_DIGEST??'',/^[a-f0-9]{64}$/);
  assert.equal(process.env.AFW_BUDGET_PRODUCER_KIND,'reduction-checkpoint');assert.equal(process.env.AFW_BUDGET_PRODUCER_GROUP,'reduction_a');assert.equal(process.env.AFW_BUDGET_PRODUCER_READBACK,'verified');
 }
 return {...value,lineage};
}
async function observeFixedReduction(f,caseName,shared){
 const {plain}=await import('./finite-first-connection-publication.mjs'),{observeOriginalAlarm}=await import('./finite-owner-cleanup-persistence.mjs');
 let rootDuring,rootAfter,beforeRelease,afterRelease;
 try{
  if(caseName==='D4'){
   const held=await fixedBudgetWait(()=>plain(f.stub.finiteBudgetSignals()),s=>s.heldNativeSettled===2,f.plan.C0+15000);
   assert.equal(held.queueObserverInvalid,false);assert(held.queuedAtHold>0,'actual populated reduction queue');
  }
  const original=await observeOriginalAlarm(f);
  if(caseName==='D4'){
   rootDuring=await plain(f.stub.firstConnectionAvailability());assert.equal(rootDuring.available,false);assert.equal(rootDuring.live,true);
   beforeRelease=await plain(f.stub.finiteBudgetSignals());assert.equal(beforeRelease.nativeUnsettled,0);assert.equal(beforeRelease.outwardPending,2);
  }
  await f.stub.finiteBudgetRelease();await fixedBudgetPause(100);afterRelease=await plain(f.stub.finiteBudgetSignals());
  if(caseName==='D4')rootAfter=await plain(f.stub.firstConnectionAvailability());
  const final=await plain(f.stub.ownerCleanupFacts()),rows=final.rows,state=JSON.parse(rows.find(([key])=>key==='afw.finite-initial-cleanup.v1:state')[1]),ownerRows=rows.filter(([key])=>key.startsWith('afw.finite-owner-cleanup.v1:'));
  assert.equal(afterRelease.sdkObserverInvalid,false);assert.equal(afterRelease.sdkFulfilled+afterRelease.sdkRejected,1,'actual SDK promise outcome observed exactly once');
  const sdkObserved=ownerRows.some(([key])=>key.endsWith(':sdk_revoke:observed')),ownerReceipt=ownerRows.some(([key])=>key.endsWith(':receipt'));
  await f.captureBudgetEpoch('fixed-'+caseName+'-after-original-alarm');
  const facts={...afterRelease,sdkReplay:Math.max(0,afterRelease.sdkFulfilled+afterRelease.sdkRejected-1),sdkReturned:afterRelease.sdkFulfilled===1,sdkObserved,ownerReceipt,completed:state.status==='complete',pendingPreserved:state.status!=='complete',
   uncertainSendRetried:original.signal.entered!==1,rootBefore:f.budgetRootBefore,rootDuring,rootAfter,
   originalChildElapsedMs:caseName==='D4'?Math.max(0,...final.children.filter(child=>child.startedAt>=f.plan.C0).map(child=>child.elapsedMs)):null,
   callsAfterRelease:beforeRelease?afterRelease.nativeInvoked-beforeRelease.nativeInvoked:0,falseSdkReturn:caseName==='D4'&&afterRelease.sdkFulfilled>0};
  return await fixedBudgetPersist('reduction/'+caseName,{...fixedBudgetEnvelope('consumer','reduction',[caseName],{consumerGroup:shared.group}),caseName,plan:f.plan,facts,alarm:original,final,
   producer:{unexchanged:true,codeExchanged:false,normalComplete:f.checkpoint.budget.ownerReference.completeNormal,sameCheckpoint:true,consumerGroup:shared.group,manifestSha256:f.recovery.manifestSha256,artifactId:shared.producerArtifactId,digest:shared.producerDigest},
   recovery:{...f.recovery,pairSize:2,pairReady:shared.pairReady,restart:false,coldInventoryVerified:true,bothAliases:f.kvSemanticProof.bothAliases,pairEntered:shared.entered,consumerFinished:Date.now()},
   diagnostics:{epochs:structuredClone(f.budgetEpochs)},preparedInputs:f.checkpoint.budget.preparedInputs});
 }finally{await f.stub.finiteBudgetRelease();}
}

async function disposeFixedBudgetPair(fixtures){
 assert(Array.isArray(fixtures)&&fixtures.length<=2,'fixed owned pair only');
 const settled=await Promise.allSettled(fixtures.map(async fixture=>{
  const failures=[];
  for(const phase of ['release','restore','dispose']){
   try{if(phase==='release')await fixture.stub.finiteBudgetRelease();else if(phase==='restore')await fixture.stub.finiteBudgetRestore();else await fixture.mf.dispose();}
   catch(error){failures.push(error);}
  }
  if(failures.length)throw failures[0];
 }));
 const failure=settled.find(result=>result.status==='rejected');if(failure)throw failure.reason;
}
const FIXED_WRAPPER_CONTROL_BODY="\nglobalThis.__controlPromise=(async()=>{\n const data=new Map(),initialMethods={},trace=[],base=[];\n const user='SYN-wire-user',grantId='SSSSSSSSSSSSSSSS',grantKey='grant:'+user+':'+grantId,tokenPrefix='token:'+user+':'+grantId+':',expiration=Math.floor((Date.now()+1800000)/1000);\n let probe=false;\n const kv={\n  async get(key){if(probe)base.push({method:'get',receiver:this===kv,key});return data.has(key)?data.get(key).value:null;},\n  async put(key,value,options={}){data.set(key,{value,expiration:options.expiration??expiration});},\n  async delete(key){if(probe)base.push({method:'delete',receiver:this===kv,key});data.delete(key);},\n  async list(options){const keys=[...data.keys()].filter(key=>key.startsWith(options.prefix)).sort(),offset=options.cursor===undefined?0:Number(options.cursor),slice=keys.slice(offset,offset+options.limit);return {keys:slice.map(name=>({name,expiration:data.get(name).expiration})),list_complete:offset+slice.length>=keys.length,...offset+slice.length<keys.length?{cursor:String(offset+slice.length)}:{}};}\n };\n for(const method of ['get','put','delete','list'])initialMethods[method]=kv[method];\n data.set(grantKey,{value:JSON.stringify({id:grantId}),expiration});\n const rows=new Map([\n ['afw.finite-initial-cleanup.v1:plan',JSON.stringify({purpose:'INERT wrapper control only',C0:Date.now()+1200000})],\n ['afw.finite-owner-issuer-provenance.v1:SYN:reference',JSON.stringify({purpose:'INERT wrapper control only',sdkGrantId:grantId})],\n ['afw.finite-preparation-issuer.v1:SYN:reservation',JSON.stringify({identity:{preconnectionId:'SYN-wire-case',grantId:'SYN-wire-grant'}})]\n ]);\n const storage={async list(options={}){return new Map([...rows].filter(([key])=>!options.prefix||key.startsWith(options.prefix)));},async get(key){return rows.get(key);},async sync(){},async transaction(fn){return fn(this);}};\n const db={withSession(){return{prepare(){throw Error('INERT unused SQL session');}};},prepare(sql){return{bind(){return{async first(){return sql.includes('delegated_access_grants')?{user_id:user}:null;},async all(){return {results:[]};}};}};}};\n const fixture=new Initial({AFW_FINITE_OWNER_OAUTH_KV:kv,RELEASE_DB:db},{storage,id:{toString(){return'SYN-wire-actor';}}});\n let promises=[],settled=0,signals,restored=false;\n try{\n  if(__afwFiniteBudgetFamily==='reduction'){await fixture.ownerCleanupFault('normal');trace.push('existing-normal-installed');await fixture.finiteBudgetReduction('D4');trace.push('actual-D-adapter-setup');}\n  else{await fixture.finiteBudgetReadonly('R3');trace.push('actual-fresh-R-adapter-setup');}\n  probe=true;\n  const keys=__afwFiniteBudgetFamily==='reduction'?[tokenPrefix+'SYN-inert-0000',tokenPrefix+'SYN-inert-0001']:[grantKey,grantKey];\n  promises=keys.map(key=>__afwFiniteBudgetFamily==='reduction'?kv.delete(key):kv.get(key));\n  for(const promise of promises)promise.then(()=>{settled++;},()=>{settled++;});\n  for(let index=0;index<8;index++)await Promise.resolve();\n  signals=await fixture.finiteBudgetSignals();trace.push('actual-probe-observed');\n  const held=signals.heldNativeSettled===2&&signals.outwardPending===2&&settled===0;\n  const record={family:__afwFiniteBudgetFamily,stage:'complete',baseInvocations:base.filter(value=>value.method===(__afwFiniteBudgetFamily==='reduction'?'delete':'get')&&keys.includes(value.key)).length,baseReceiversPreserved:base.every(value=>value.receiver),held,actualObserverInvocations:signals.nativeInvoked,heldAfterBaseSettlement:signals.heldNativeSettled,outwardSettledBeforeRelease:settled,lostInterception:signals.nativeInvoked===0&&settled===2,trace};\n  await fixture.finiteBudgetRelease();await Promise.allSettled(promises);await fixture.finiteBudgetRestore();\n  restored=['get','put','delete','list'].every(method=>kv[method]===initialMethods[method]);record.originalMethodsRestored=restored;record.outwardSettledAfterRelease=settled;\n  return record;\n }finally{try{await fixture.finiteBudgetRelease();await Promise.allSettled(promises);await fixture.finiteBudgetRestore();}catch{}}\n})();\n";

async function runActualBudgetWrapperControl(family){
 assert(['readonly','reduction'].includes(family));
 const {Script,createContext}=await import('node:vm'),{webcrypto}=await import('node:crypto'),{TextEncoder}=await import('node:util');
 const {extendFiniteOwnerCleanup,finiteBudgetSynAdapterSource}=await import('./finite-owner-cleanup.mjs');
 const scaffold="class FiniteClosure{constructor(env,ctx){this.env=env;this.ctx=ctx;}fetch(){throw Error('INERT unused fetch');}}\n export class Initial extends FiniteClosure{ async fetch(request){let actual;actual=super.fetch(request);return actual;} }\n";
 let generated=extendFiniteOwnerCleanup(scaffold);
 const imported="import {observeFiniteReadOnlyWork} from './lib/mcp-qa-finite-stage-work.mjs';\n";assert.equal(generated.split(imported).length-1,1);
 generated=generated.replace(imported,'').replace(' export class Initial extends FiniteClosure{',' class Initial extends FiniteClosure{');
 const context=createContext({Buffer,TextEncoder,crypto:webcrypto,performance,setTimeout,clearTimeout,console:{info(){},log(){},error(){}}});
 const utility=new Script("({constructorType:typeof TextEncoder,encodeType:typeof TextEncoder.prototype.encode,bytes:new TextEncoder().encode('SYN-fixed-control-utility')})").runInContext(context,{timeout:100});
 const utilityProjection={constructorType:utility.constructorType,encodeType:utility.encodeType,literalBytes:utility.bytes.length,literalSha256:hash(utility.bytes)};
 assert.equal(utilityProjection.constructorType,'function');assert.equal(utilityProjection.encodeType,'function');assert.equal(utilityProjection.literalSha256,hash(Buffer.from('SYN-fixed-control-utility')));
 await mkdir('output/finite-budget/round1-controls',{recursive:true});await writeFile('output/finite-budget/round1-controls/utility-'+family+'.json',JSON.stringify(utilityProjection,null,2));
 const script=generated+"\nconst __afwFiniteBudgetFamily="+JSON.stringify(family)+";\n"+finiteBudgetSynAdapterSource+"\n"+FIXED_WRAPPER_CONTROL_BODY;
 new Script(script,{filename:'SYN-fixed-actual-wrapper-control.mjs'}).runInContext(context,{timeout:1000});
 let timer;try{return await Promise.race([context.__controlPromise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('SYN inert wrapper control timeout')),3000);})]);}finally{clearTimeout(timer);}
}
async function verifyNativePreparationRound1(){
 const cases=[];let stage='readonly',error=null;
 try{cases.push(await runActualBudgetWrapperControl('readonly'));stage='reduction';cases.push(await runActualBudgetWrapperControl('reduction'));stage='complete';}
 catch(value){error={name:['Error','AssertionError','TypeError','SyntaxError'].includes(value?.name)?value.name:'other',messageSha256:hash(String(value?.message??''))};}
 const r=cases.find(value=>value.family==='readonly'),d=cases.find(value=>value.family==='reduction'),passed=stage==='complete'&&r.held&&d.held&&cases.every(value=>value.originalMethodsRestored&&value.baseReceiversPreserved&&value.outwardSettledAfterRelease===2);
 const result={purpose:'afw.native-preparation-round1-controls.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,phase:process.env.AFW_BUDGET_CONTROL_PHASE??'unspecified',groups:[{group:'F1',stage,passed,cases,error},...['F2','F3','F4','F5','F6','F7'].map(group=>({group,status:'pending_implementation',businessCases:0}))],passed,causalF1Deficit:stage==='complete'&&r?.held===true&&d?.lostInterception===true,I0Opened:false,nativeExecutionProduced:false,businessCases:0,...budgetFixedFlags};
 await mkdir('output/finite-budget/round1-controls',{recursive:true});await writeFile('output/finite-budget/round1-controls/result.json',JSON.stringify(result,null,2));assert.equal(passed,true,'actual wrapper ordering preserves reduction interception and held ACKs');return result;
}

async function verifyFixedPairDisposer(){
 const scenarios=[];let failed=false;
 for(const phase of ['release','restore','dispose']){
  const expected=Error('SYN inert '+phase),calls=[[],[]];
  const fixtures=[0,1].map(index=>({stub:{
   async finiteBudgetRelease(){calls[index].push('release');if(index===0&&phase==='release')throw expected;},
   async finiteBudgetRestore(){calls[index].push('restore');if(index===0&&phase==='restore')throw expected;}
  },mf:{async dispose(){calls[index].push('dispose');if(index===0&&phase==='dispose')throw expected;}}}));
  let actual;try{await disposeFixedBudgetPair(fixtures);}catch(error){actual=error;}
  const sameError=actual===expected,allPhases=calls.every(value=>JSON.stringify(value)===JSON.stringify(['release','restore','dispose']));
  scenarios.push({faultPhase:phase,sameError,allPhases,fixtureCount:2,attempts:calls.map(value=>value.length)});failed||=!sameError||!allPhases;
 }
 const result={purpose:'afw.fixed-budget-pair-disposer-control.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,tests:1,scenarios,passed:!failed,I0Opened:false,nativeExecutionProduced:false,businessCases:0,...budgetFixedFlags};
 await mkdir('output/finite-budget/disposer-control',{recursive:true});await writeFile('output/finite-budget/disposer-control/result.json',JSON.stringify(result,null,2));
 assert.equal(failed,false,'actual fixed pair disposer covers every sibling phase and error identity');return result;
}

export async function prepareBudgetReductionPair(group,root){
 assert(['reduction_a','reduction_b'].includes(group));assert.equal(process.env.AFW_BUDGET_GROUP,group);
 const verified=await verifyReductionCheckpoint(root,{consumer:true});
 const {recoverCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs'),{plain}=await import('./finite-first-connection-publication.mjs');
 const cases=group==='reduction_a'?['D1','D2']:['D3','D4'],fixtures=[],results=new Map(),shared={group,entered:Date.now(),pairReady:null,producerArtifactId:process.env.AFW_BUDGET_PRODUCER_ARTIFACT_ID,producerDigest:process.env.AFW_BUDGET_PRODUCER_DIGEST};
 let closing;
 const dispose=()=>closing??=disposeFixedBudgetPair(fixtures);
 try{
  // Register each fulfilled mount immediately, including a late sibling after a
  // partial rejection. No replica starts after its sibling passes C0.
  const mounts=await Promise.allSettled(cases.map(async caseName=>{
   const f=await recoverCheckpoint(join(root,'native'),{label:'budget-'+caseName,restart:false,budgetQualification:true});fixtures.push(f);f.budgetCase=caseName;
   f.budgetRootBefore=await plain(f.stub.firstConnectionAvailability());assert.equal(f.budgetRootBefore.available,true);
   const input=await plain(f.stub.finiteBudgetReduction(caseName));assert.equal(input.sameKvBinding,true);
   f.budgetInputReady=Date.now();assert(f.budgetInputReady<=f.plan.C0-30000);return f;
  }));
  const rejected=mounts.find(result=>result.status==='rejected');if(rejected)throw rejected.reason;
  shared.pairReady=Math.max(...fixtures.map(f=>f.budgetInputReady));assert(shared.pairReady<=verified.lineage.C0-30000,'both original cold replicas and input readbacks ready');
  assert.equal(fixtures.length,2);assert(fixtures.every(f=>f.recovery.manifestSha256===verified.lineage.nativeManifestSha256));
  for(const f of fixtures){const result=observeFixedReduction(f,f.budgetCase,shared);result.catch(()=>{});results.set(f.budgetCase,result);}
  return {result(name){assert(cases.includes(name));return results.get(name);},dispose};
 }catch(error){await dispose();throw error;}
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
  else if(command==='prepare-positive-probe')await preparePositiveProbe(root);
  else if(command==='prepare-positive')await prepareBudgetProducer('positive',root);
  else if(command==='prepare-reduction')await prepareBudgetProducer('reduction',root);
  else if(command==='verify-reduction')await verifyBudgetCheckpoint('reduction',root);
  else if(command==='verify-pair-disposer')await verifyFixedPairDisposer();
  else if(command==='verify-native-preparation-round1')await verifyNativePreparationRound1();
  else if(command==='verify-positive')await verifyBudgetCheckpoint('positive',root);
  else if(command==='inspect-budget-graphs')await inspectBudgetCompilation(root);
  else throw Error('SYN budget command unsupported before I0');
 };
 // Finish this module before command work imports fixtures that import it.
 setImmediate(()=>{main().catch(()=>{console.error('SYN fixed budget command failed');process.exitCode=1;});});
}
