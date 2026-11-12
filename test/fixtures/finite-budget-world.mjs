import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,readdir,copyFile,cp,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {AsyncLocalStorage} from 'node:async_hooks';
import {mkdirSync,writeFileSync} from 'node:fs';
import {types as fixedNodeTypes} from 'node:util';
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



const fixedControlCountKeys=['childBlocks','work','wait','selectReadonly','selectReduction','queueReadonly','queueReduction','capReadonlyList','capReadonlyGet','capReductionList','capReductionDelete','send','sdk'];
const fixedControlStages=new Set(['start','complete','wrapper_readonly','wrapper_reduction','observer_child','observer_calls','read_raw','legacy_composition','prepared_validate','baseline_transform','syn_instrument','adjacency_ro','adjacency_d','syn_counts','body_extract','cached_assembly','vm_start','facet_setup','facet_cleanup','vm_hold','vm_boundary','queue_verdict','queue_mutator','ownership','f5_no_adapter','f5_callback_extract','f5_callback_setup','f5_callback_invoke','f5_callback_return','f5_callback_assert','f5_legacy_case','manifest','peer_wait']);
let fixedControlState=null;
function fixedControlOwn(value,key){if(!value||typeof value!=='object'||fixedNodeTypes.isProxy(value))return undefined;const d=Object.getOwnPropertyDescriptor(value,key);return d&&Object.hasOwn(d,'value')?d.value:undefined;}
function fixedControlSafe(value){
 if(value===null||typeof value==='boolean'||typeof value==='number'&&Number.isFinite(value))return value;
 if(typeof value==='string')return /^[a-f0-9]{64}$/.test(value)?{type:'sha256',value}:{type:'string',bytes:Buffer.byteLength(value),sha256:hash(value)};
 if(value&&typeof value==='object'&&!fixedNodeTypes.isProxy(value)){
  const ds=Object.getOwnPropertyDescriptors(value),keys=Reflect.ownKeys(ds);
  if(keys.length===13&&fixedControlCountKeys.every(key=>keys.includes(key)&&Object.hasOwn(ds[key],'value')&&Number.isSafeInteger(ds[key].value)))return {type:'fixed_counts',counts:Object.fromEntries(fixedControlCountKeys.map(key=>[key,ds[key].value]))};
 }
 return {type:value===undefined?'undefined':typeof value};
}
function fixedControlError(error){
 const name=fixedControlOwn(error,'name'),code=fixedControlOwn(error,'code'),operator=fixedControlOwn(error,'operator'),message=fixedControlOwn(error,'message');
 const labels=['fixed actual callback complete f member premise','fixed original cleanup fixture blob','unique actual ownerReferenceFixture cleanup callback','original cleanup callback f-only closure','fallback original dispose once','actual original callback preserves its own failure control flow','native continuation original guard adjacency','exact family native statement kind','D original return retain native unchanged','RO original native declaration unchanged','exact two queue statement kinds','eleven cleanup primary blocks plus work/wait subcounts','actual facet native entry current queue bound','legacy queue bodies unchanged','single structural actual SDK settlement sequence','all pinned readers emitted in','fixed prepared scope hook count','exact prepared AST count','actual duplicate SEND or SDK attempts rejected','SYN previous owned disposal uncertain before allocation','SYN fixed job maximum two owned MF'];
 return {name:['Error','AssertionError','TypeError','SyntaxError','RangeError'].includes(name)?name:'other',nativeError:fixedNodeTypes.isNativeError(error),code:['ERR_ASSERTION','ERR_MODULE_NOT_FOUND','ERR_INVALID_ARG_TYPE','ERR_SCRIPT_EXECUTION_TIMEOUT'].includes(code)?code:code===undefined?'absent':'other',operator:['==','===','strictEqual','deepStrictEqual','match','ok','throws','rejects'].includes(operator)?operator:operator===undefined?'absent':'other',actual:fixedControlSafe(fixedControlOwn(error,'actual')),expected:fixedControlSafe(fixedControlOwn(error,'expected')),message:typeof message==='string'?{bytes:Buffer.byteLength(message),sha256:hash(message),publicLabel:labels.find(label=>message.includes(label))??'unmatched'}:{type:typeof message}};
}
function fixedControlProgress(stage,metrics={}){
 if(!fixedControlState)return;assert(fixedControlStages.has(stage),'closed pure stage');assert(fixedControlState.trace.length<128,'bounded pure control trace');
 fixedControlState.stage=stage;fixedControlState.trace.push({stage,...metrics});
 const bytes=Buffer.from(JSON.stringify(fixedControlState));assert(bytes.length<=65536,'bounded closed pure progress');mkdirSync('output/finite-budget/round1-controls',{recursive:true});writeFileSync('output/finite-budget/round1-controls/progress.json',bytes);
}
async function fixedControlBound(promise){let timer;try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('SYN fixed pure control bound')),5000);})]);}finally{clearTimeout(timer);}}

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


async function instrumentFixedSynLibrary(baseline,path,originalSdk){
 const ast=sourceAST(baseline,'SYN-fixed-observation-baseline'),edits=[],queueKinds=[],counts={childBlocks:0,work:0,wait:0,selectReadonly:0,selectReduction:0,queueReadonly:0,queueReduction:0,capReadonlyList:0,capReadonlyGet:0,capReductionList:0,capReductionDelete:0,send:0,sdk:0};
 const owner=(node,name)=>{for(let n=node.parent;n;n=n.parent)if(ts.isFunctionDeclaration(n)&&n.name?.text===name)return n;return null;};
 const named=(node,name)=>ts.isCallExpression(node)&&node.expression.getText(ast)===name;
 const insert=(position,text)=>edits.push({start:position,end:position,text});
 const replace=(node,text)=>edits.push({start:node.getStart(ast),end:node.end,text});
 if(path==='lib/mcp-qa-finite-initial-lease.mjs'){
  const walk=node=>{
   if(ts.isCallExpression(node)&&node.expression.getText(ast)==='retain'&&node.arguments.length===1&&node.arguments[0].getText(ast)==='actual'&&ts.isExpressionStatement(node.parent)){
    const block=node.parent.parent;assert(ts.isBlock(block)&&block.getText(ast).includes('__afwBudget.childCall(lease, l, until'),'original initial child block provenance');
    insert(node.parent.getStart(ast),"__afwSynWork(l,until,actual,lease.signal);\n");counts.work++;counts.childBlocks++;
   }
   if(named(node,'wait')&&node.arguments.length===2&&node.arguments.map(x=>x.getText(ast)).join('|')==='actual|l'){replace(node,'__afwSynWait(l,'+node.getText(ast)+')');counts.wait++;}
   ts.forEachChild(node,walk);
  };walk(ast);assert.equal(counts.childBlocks,1);assert.equal(counts.work,1);assert.equal(counts.wait,1);
 }else{
  assert.equal(path,'lib/mcp-qa-finite-owner-cleanup.mjs');const sdk=fixedSdkSettlementSequence(baseline,'emitted-baseline');
  const walk=node=>{
   if(ts.isVariableStatement(node)&&owner(node,'cleanupLifetime')){
    const ds=node.declarationList.declarations;
    if(ds.length===1&&ds[0].name.getText(ast)==='actual'&&ds[0].initializer?.getText(ast).includes('__afwBudget.childCall(originalLease, clock.lease, end,')){
     insert(node.end,'\n__afwSynWork(clock.lease,end,actual,originalLease.signal);');counts.work++;counts.childBlocks++;
    }
   }
   if(named(node,'clock.wait')&&node.arguments.length===1&&node.arguments[0].getText(ast)==='actual'&&owner(node,'cleanupLifetime')){replace(node,'__afwSynWait(clock.lease,'+node.getText(ast)+')');counts.wait++;}
   if(ts.isExpressionStatement(node)&&named(node.expression,'guard')&&node.expression.arguments.length===0&&owner(node,'readPrivateQaFiniteOwnerSdkGrant')){
    const siblings=node.parent.statements,index=siblings?.indexOf(node);if(index!==undefined&&index>=0&&siblings[index+1]?.getText(ast).includes('observeFiniteFactualReadWork')){insert(node.end,'\n__afwSynSelectGuard(alias,lease,guard,1);');counts.selectReadonly++;}
   }
   if(ts.isVariableStatement(node)&&node.declarationList.declarations.some(d=>d.name.getText(ast)==='bounded'&&d.initializer&&named(d.initializer,'reductionKv'))){
    assert(owner(node,'finishPrivateQaFiniteOwnerCleanup'));insert(node.end,'\n__afwSynSelectGuard(life.alias,l,check,2);');counts.selectReduction++;
   }
   if(ts.isCallExpression(node)&&ts.isCallExpression(node.expression)&&node.expression.expression.getText(ast)==='__afwBudget.reflect'&&node.expression.arguments[0]?.getText(ast)==='Reflect.apply'&&node.arguments.length===3&&node.arguments.map(x=>x.getText(ast)).join('|')==='methods[q.method]|alias|q.args'){
    const ro=owner(node,'readonlyGrantKv'),red=owner(node,'reductionKv');assert(Boolean(ro)!==Boolean(red));let statement=node;while(!ts.isExpressionStatement(statement)&&!ts.isVariableStatement(statement)&&!ts.isReturnStatement(statement))statement=statement.parent;
    const block=statement.parent,index=block.statements?.indexOf(statement),family=ro?1:2,statementKind=ts.isVariableStatement(statement)?'variable':ts.isReturnStatement(statement)?'return':'expression',previousCheck=ts.isBlock(block)&&index>0&&ts.isExpressionStatement(block.statements[index-1])&&named(block.statements[index-1].expression,'check');fixedControlProgress(ro?'adjacency_ro':'adjacency_d',{family,statementKind,previousCheck});assert(ts.isBlock(block)&&index>0&&ts.isExpressionStatement(block.statements[index-1])&&named(block.statements[index-1].expression,'check'),'native continuation original guard adjacency');
    assert.equal(statementKind,ro?'variable':'return','exact family native statement kind');if(red){assert(ts.isReturnStatement(statement)&&named(statement.expression,'retain')&&statement.expression.arguments.length===1&&statement.expression.arguments[0]===node,'D original return retain native unchanged');}else{assert(ts.isVariableStatement(statement)&&statement.declarationList.declarations.length===1&&statement.declarationList.declarations[0].name.getText(ast)==='native'&&statement.declarationList.declarations[0].initializer===node,'RO original native declaration unchanged');}
    queueKinds.push({family,statementKind,originalCheckAdjacent:true,originalReceiver:'alias',originalArgs:'q.args'});insert(statement.getStart(ast),"__afwSynNote('queue',alias,"+family+",__afwSynGuardChildren.get(guard)??0,queue.length,active,q.method);\n");counts[ro?'queueReadonly':'queueReduction']++;
   }
   if(ts.isBinaryExpression(node)&&node.operatorToken.kind===ts.SyntaxKind.GreaterThanEqualsToken){
    const counter=node.left.getText(ast),limit=node.right.getText(ast),ro=owner(node,'readonlyGrantKv'),red=owner(node,'reductionKv');
    const key=ro&&counter==='lists'&&limit==='2'?'capReadonlyList':ro&&counter==='gets'&&limit==='200'?'capReadonlyGet':red&&counter==='lists'&&limit==='2'?'capReductionList':red&&counter==='deletes'&&limit==='200'?'capReductionDelete':null;
    if(key){assert(ts.isBinaryExpression(node.parent)&&node.parent.operatorToken.kind===ts.SyntaxKind.BarBarToken&&node.parent.right===node,'original final cap disjunct');replace(node,"__afwSynCap("+node.getText(ast)+",alias,guard,"+(ro?1:2)+",'"+(counter==='lists'?'list':counter==='gets'?'get':'delete')+"',"+counter+","+limit+")");counts[key]++;}
   }
   if(ts.isCallExpression(node)&&node.expression.getText(ast)==='api.revokeGrant'&&node.arguments.map(x=>x.getText(ast)).join('|')==='selector|i.subject'){
    let sdkStatement=node;while(!ts.isVariableStatement(sdkStatement))sdkStatement=sdkStatement.parent;assert.equal(sdkStatement.end,sdk.end,'SDK declaration structural identity');replace(node.expression,'__afwSynSdkCallee(api.revokeGrant,api,life.alias,check)');counts.sdk++;
    const sdkBlock=sdkStatement.parent;assert(ts.isBlock(sdkBlock));
    const sends=[];const scan=n=>{if(ts.isCallExpression(n)&&n.expression.getText(ast)==='journal.appendSend')sends.push(n);ts.forEachChild(n,scan);};scan(sdkBlock);
    assert.equal(sends.length,1,'same SDK child exact SEND call');const send=sends[0];assert.equal(send.arguments.length,2);assert.equal(send.arguments[1].getText(ast),'l');replace(send.expression,'__afwSynSendCallee(journal.appendSend,journal,life.alias,check)');counts.send++;
   }
   ts.forEachChild(node,walk);
  };walk(ast);
  fixedControlProgress('syn_counts',{counts});assert.deepEqual(queueKinds.map(row=>({family:row.family,statementKind:row.statementKind})),[{family:1,statementKind:'variable'},{family:2,statementKind:'return'}],'exact two queue statement kinds');
  assert.deepEqual(counts,{childBlocks:1,work:1,wait:1,selectReadonly:1,selectReduction:1,queueReadonly:1,queueReduction:1,capReadonlyList:1,capReadonlyGet:1,capReductionList:1,capReductionDelete:1,send:1,sdk:1},'eleven cleanup primary blocks plus work/wait subcounts');
 }
 let source=baseline;for(const edit of edits.sort((a,b)=>b.start-a.start)){assert(edit.start<=edit.end);source=source.slice(0,edit.start)+edit.text+source.slice(edit.end);}
 const {finiteBudgetSynLibraryPrefix}=await import('./finite-owner-cleanup.mjs');source=finiteBudgetSynLibraryPrefix+'\n'+source;sourceAST(source,'SYN-fixed-observation-emission');
 return {source,proof:{purpose:'afw.fixed-syn-passive-observations.v2',baselineBytes:Buffer.byteLength(baseline),baselineSha256:hash(baseline),emittedBytes:Buffer.byteLength(source),emittedSha256:hash(source),primaryBlocks:path.includes('initial-lease')?1:11,counts,queueKinds,...originalSdk?{sdkDeclarationProvenance:{original:originalSdk,protectedModuleBlob:'1a5a2583d266179cdd89f799c64199f29044fec5',originalStatementSha256:hash('const actual=retain(api.revokeGrant(selector,i.subject));')}}:{},fields:['opaque-alias','child-ordinal','family','deadline','status','counter','limit','queue-length','active','time','send-record-hash'],businessAuthority:false}};
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
 const operationInventory=Object.fromEntries(["Reflect.apply(","Object.defineProperty(","Object.defineProperties(","Promise.allSettled(","new WeakMap("].map(marker=>[marker,finiteBudgetSynAdapterSource.split(marker).length-1]));assert.deepEqual(operationInventory,{"Reflect.apply(":23,"Object.defineProperty(":1,"Object.defineProperties(":1,"Promise.allSettled(":1,"new WeakMap(":3},'closed fixed adapter operation inventory');
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
  if(family&&role==='QA'&&['lib/mcp-qa-finite-owner-cleanup.mjs','lib/mcp-qa-finite-initial-lease.mjs'].includes(path)){if(originalSdk)assert.equal(source.split('const actual=retain(api.revokeGrant(selector,i.subject));').length-1,1,'original SDK call and retain unchanged');const emitted=await instrumentFixedSynLibrary(result.source,path,originalSdk?Object.fromEntries(Object.entries(originalSdk).filter(([key])=>key!=='end')):null);additionalSYN=emitted.proof;result={...result,source:emitted.source};}
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

const fixedBudgetOwners=new AsyncLocalStorage(),fixedBudgetOwnerErrors=new WeakMap();
let fixedBudgetAllocationOrdinal=0;const fixedBudgetOwnedLive=new Set();
function assertFixedBudgetAllocationSafe(){assert(![...fixedBudgetOwnedLive].some(record=>record.disposalUncertain),'SYN previous owned disposal uncertain before allocation');assert(fixedBudgetOwnedLive.size<2,'SYN fixed job maximum two owned MF');}
function ownedFailure(record,phase,error){record.failures.push({phase,error});}
function createFixedOwnedRecord(frame,kind){
 const record={ordinal:++fixedBudgetAllocationOrdinal,caseName:frame.caseName,kind,persist:null,mf:null,fixture:null,callbacks:[],failures:[],epochs:[],closing:null,disposed:false,archived:false,archive:null,terminalCapture:'not_available',events:[]};
 frame.records.push(record);
 record.attachPersist=path=>{assert.equal(record.persist,null);record.persist=path;record.events.push('persist-attached');};
 record.attachFixture=f=>{assert(!record.fixture||record.fixture===f);record.fixture=f;record.events.push('fixture-attached');};
 record.attachMiniflare=mf=>{
  assert(!record.mf||record.mf===mf);if(record.mf)return;assertFixedBudgetAllocationSafe();record.mf=mf;fixedBudgetOwnedLive.add(record);const original=mf.dispose;assert.equal(typeof original,'function');
  mf.dispose=()=>record.dispose();record.originalDispose=()=>Reflect.apply(original,mf,[]);record.events.push('miniflare-attached');
 };
 record.dispose=()=>record.disposal??= (async()=>{
  const f=record.fixture;
  if(f?.firstConnectionBuild&&f.cleanupCheckpointInputs)try{const mounted=f.cleanupCheckpointInputs().currentMountedOptions;record.graphs=['M','QA'].map(role=>{const worker=mounted.workers.find(v=>v.name===(role==='M'?'canary-first-connection':'qa-first-connection'));assert(worker);assert.equal(hash(worker.script),f.firstConnectionBuild[role].sha256);return {role,worker:worker.name,sha256:hash(worker.script),bytes:Buffer.byteLength(worker.script),mounted:true};});}catch(error){ownedFailure(record,'mount_provenance',error);}
  if(f?.captureBudgetEpoch)try{const failureCount=record.failures.length;await f.captureBudgetEpoch('terminal-owned-before-dispose');record.terminalCapture=record.failures.length===failureCount?'captured':'failed';record.epochs=structuredClone(f.budgetEpochs);}catch(error){record.terminalCapture='failed';ownedFailure(record,'terminal_epoch',error);}
  else if(record.mf){record.terminalCapture='unavailable_partial_setup';ownedFailure(record,'terminal_epoch',Error('SYN partial setup has no epoch capture'));}
  if(record.originalDispose)try{await record.originalDispose();record.disposed=true;fixedBudgetOwnedLive.delete(record);record.events.push('disposed');}catch(error){record.disposalUncertain=true;record.events.push('disposal-uncertain');ownedFailure(record,'dispose',error);}
  if(record.persist&&record.disposed)try{
   const destination=join(frame.root,'owned-native-'+record.ordinal);await mkdir(frame.root,{recursive:true});await cp(record.persist,destination,{recursive:true,errorOnExist:true,force:false});
   const source=await inventoryFiles(record.persist),copy=await inventoryFiles(destination);assert(source.length>0&&source.length<=512);assert(source.reduce((n,f)=>n+f.bytes,0)<=134217728);assert.deepEqual(copy,source,'owned cold native bytes exact');
   record.archive={path:destination,files:copy};record.archived=true;record.events.push('archived');
  }catch(error){ownedFailure(record,'cold_archive',error);}
 })();
 record.beforeDelete=async()=>{await record.dispose();if(!record.archived){record.events.push('delete-skipped-unsafe');return false;}record.events.push('delete-authorized');return true;};
 return record;
}
export function beginFixedBudgetOwnedAllocation(){
 const frame=fixedBudgetOwners.getStore();if(!frame)return null;assertFixedBudgetAllocationSafe();assert(!frame.records.some(r=>r.kind==='initial'),'one initial allocation per fixed occurrence');return createFixedOwnedRecord(frame,'initial');
}
export function attachFixedBudgetRecoveryOwner(f){
 const frame=fixedBudgetOwners.getStore();if(!frame)return;
 let record=frame.records.find(r=>r.kind==='recovery');if(!record)return;
 if(record.fixture){assert.equal(record.fixture,f);return;}record.attachFixture(f);
 assert(!Object.hasOwn(f,'mf'),'recovery hook precedes actual assignment');
 Object.defineProperty(f,'mf',{configurable:true,enumerable:true,set(mf){Object.defineProperty(f,'mf',{value:mf,writable:true,enumerable:true,configurable:true});record.attachMiniflare(mf);}});
}
function registerFixedOwnedCleanup(fn){const frame=fixedBudgetOwners.getStore();assert(frame);frame.callbacks.push(fn);}
async function closeFixedOwnedFrame(frame,primary){
 if(frame.closed)return frame.closed;
 frame.closed=(async()=>{
  // SYN RPCs belong only to fixed R/D adapters before owned disposal begins.
  await Promise.allSettled(frame.records.map(async record=>{
   for(const phase of ['release','restore']){
    const applicable=['R1','R2','R3','D1','D2','D3','D4'].includes(frame.caseName),reason=!applicable?'case_identity':record.disposal||record.disposed||record.disposalUncertain?'disposal_started':!record.fixture?.stub?'fixture_unavailable':null;
    record.phases??=[];
    if(reason){record.phases.push({phase,status:'not_applicable',reason});record.events.push(phase+'-not-applicable');continue;}
    record.phases.push({phase,status:'attempted'});
    try{await record.fixture.stub[phase==='release'?'finiteBudgetRelease':'finiteBudgetRestore']();record.phases.push({phase,status:'fulfilled'});record.events.push(phase);}
    catch(error){record.phases.push({phase,status:'rejected'});ownedFailure(record,phase,error);}
   }
  }));
  // Original callbacks may still need live RPC and may dispose through our wrapper.
  for(const callback of frame.callbacks.reverse())try{await callback();}catch(error){frame.failures.push({phase:'registered_cleanup',error});}
  // Every partial/fulfilled allocation receives an idempotent fallback attempt.
  await Promise.allSettled(frame.records.map(async record=>{try{await record.dispose();}catch{}}));
  for(const record of frame.records){
   // A pre-assignment allocation can still own a persistence directory.
   if(record.persist&&!record.mf)try{
    const destination=join(frame.root,'owned-partial-'+record.ordinal);await mkdir(frame.root,{recursive:true});await cp(record.persist,destination,{recursive:true,errorOnExist:true,force:false});const files=await inventoryFiles(record.persist);assert.deepEqual(await inventoryFiles(destination),files);record.archive={path:destination,files};record.archived=true;
   }catch(error){ownedFailure(record,'partial_archive',error);}
  }
  const failures=[...frame.failures,...frame.records.flatMap(r=>r.failures)];
  const result={purpose:'afw.fixed-budget-owned-lifecycle.syn.v1',caseName:frame.caseName,records:frame.records.map(r=>({ordinal:r.ordinal,caseName:r.caseName,kind:r.kind,graphs:r.graphs??[],disposalUncertain:r.disposalUncertain===true,disposed:r.disposed,archived:r.archived,terminalCapture:r.terminalCapture,archive:r.archive,events:r.events,phases:r.phases??[],failures:r.failures.map(x=>({phase:x.phase,name:Object.getOwnPropertyDescriptor(x.error??{},'name')?.value??'Error'})),epochs:r.epochs})),callbackCount:frame.callbacks.length,ancillaryFailureCount:failures.length,primaryPreserved:primary!==null,complete:failures.length===0};
  try{await mkdir(frame.root,{recursive:true});await writeFile(join(frame.root,'ownership.json'),JSON.stringify(result,null,2));}catch(error){failures.push({phase:'ownership_preservation',error});result.complete=false;result.ancillaryFailureCount=failures.length;}
  const error=primary??failures[0]?.error;if(error){fixedBudgetOwnerErrors.set(error,{primary,failures,result});throw error;}return result;
 })();return frame.closed;
}
async function withFixedBudgetOwner(caseName,root,operation,{recovery=false}={}){
 assert(['R1','R2','R3','D1','D2','D3','D4','P1','positive_producer','reduction_producer'].includes(caseName));
 const frame={caseName,root,records:[],callbacks:[],failures:[],closed:null};let value,primary=null;
 return fixedBudgetOwners.run(frame,async()=>{
  if(recovery){assertFixedBudgetAllocationSafe();const r=createFixedOwnedRecord(frame,'recovery');r.attachPersist(join('output','r2-native-'+(caseName==='P1'?'finite-budget-positive':'budget-'+caseName),'state'));}
  try{value=await operation();}catch(error){primary=error;}
  const ownership=await closeFixedOwnedFrame(frame,primary);
  if(value&&typeof value==='object'){value.ownership=ownership;value.diagnostics??={};value.diagnostics.epochs=frame.records.flatMap(r=>r.epochs);if(value.caseName)await fixedBudgetPersist((caseName.startsWith('R')?'readonly/':'reduction/')+caseName,value);}
  return value;
 });
}

export function attachBudgetEpochCapture(f,{segment='producer',epochs=[],epoch=0}={}){
 assert(['producer','consumer'].includes(segment));let current=epoch;
 f.budgetEpochs=epochs;
 const frame=fixedBudgetOwners.getStore(),ownedRecord=frame?.records.find(record=>record.fixture===f);
 const capture=async reason=>{
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
 f.captureBudgetEpoch=async reason=>{try{return await capture(reason);}catch(error){if(!ownedRecord)throw error;ownedFailure(ownedRecord,'capture_epoch',error);return epochs;}};
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
 const additions=graphs.budget.QA.filter(record=>record.additionalSYN).map(record=>({path:record.path,...record.additionalSYN}));assert.equal(additions.length,requestedGroup==='positive'?0:3);
 if(requestedGroup!=='positive'){const cleanup=additions.find(r=>r.path==='lib/mcp-qa-finite-owner-cleanup.mjs');assert.deepEqual(cleanup.queueKinds.map(row=>({family:row.family,statementKind:row.statementKind})),[{family:1,statementKind:'variable'},{family:2,statementKind:'return'}]);const lease=additions.find(r=>r.path==='lib/mcp-qa-finite-initial-lease.mjs');assert.equal(cleanup.primaryBlocks+lease.primaryBlocks,12);assert.equal(cleanup.counts.queueReadonly,1);assert.equal(cleanup.counts.queueReduction,1);assert.equal(cleanup.counts.sdk,1);assert.equal(cleanup.counts.send,1);assert.equal(cleanup.counts.work+lease.counts.work,2);assert.equal(cleanup.counts.wait+lease.counts.wait,2);assert.equal(additions.find(r=>r.path==='<stdin>').family,requestedGroup==='readonly'?'readonly':'reduction');}
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
 if(kind==='reduction')return withFixedBudgetOwner('reduction_producer','output/finite-budget/owned/reduction_producer',()=>prepareReductionProducer(root));
 positiveKind(kind);
 const {produceCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
 return withFixedBudgetOwner('positive_producer','output/finite-budget/owned/positive_producer',()=>produceCheckpoint(root,{variant:'principal',budgetQualification:true}));
}

async function preparePositiveProbe(root){
 positiveKind('positive');
 assert.equal(root,'output/finite-budget/producer');
 assert.equal(process.env.AFW_BUDGET_PREFLIGHT,'output/finite-budget/prior-pure/preflight.json');
 requireOrdinaryObserver();
 const checkpoint='output/chronology-native-checkpoint';
 const {produceCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
 console.info('AFW_PROBE {"kind":"step","step":"producer-entered"}');
 await withFixedBudgetOwner('positive_producer','output/finite-budget/owned/positive_producer',()=>produceCheckpoint(checkpoint,{variant:'principal',budgetQualification:true,deferWait:true}));
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
 if(!fixedBudgetOwners.getStore())return withFixedBudgetOwner('P1','output/finite-budget/positive',()=>runBudgetConsumer(kind,root),{recovery:true});
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

function fixedQueueCausality(value){
 const held=value.heldOperations??[];if(held.length!==2)return false;
 const [a,b]=held,child=a.childOrdinal;if(!Number.isSafeInteger(child)||child<1||b.childOrdinal!==child)return false;
 if(a.ordinal===b.ordinal||a.outwardSettledAt!==null||b.outwardSettledAt!==null)return false;
 if(!held.every(op=>op.sample?.childOrdinal===child&&op.sample.family===(value.caseName.startsWith('R')?1:2)&&op.sample.active===2&&op.sample.queued>0&&op.sample.method===op.method&&op.nativeSettledAt!==null&&op.heldSequence>op.sample.sequence))return false;
 const start=Math.min(a.sample.sequence,b.sample.sequence),end=Math.max(a.heldSequence,b.heldSequence);
 return !(value.observerEvents??[]).some(e=>e.kind==='outward_settled'&&e.sequence>start&&e.sequence<end);
}
function fixedChildDeadlineProof(before,after){
 assert.equal(before.observerInvalid,false);assert.equal(after.observerInvalid,false);
 assert.equal(before.children.length,1,'same selected SDK child only');const child=before.children[0],last=after.children.find(c=>c.childOrdinal===child.childOrdinal);assert(last);
 assert.equal(child.waitStatus,'rejected','actual original child wait rejected');assert(Number.isSafeInteger(child.deadline)&&Number.isSafeInteger(child.waitSettledAt));assert(child.waitSettledAt>=child.deadline&&child.waitSettledAt<child.deadline+5000,'actual original deadline denial timing');
 assert.equal(child.parentAliveAtAbort,true);assert(child.abortAt>=child.deadline&&child.abortAt<child.deadline+5000);
 assert.equal(before.outwardPending,2);assert.equal(before.heldNativeSettled,2);assert(fixedQueueCausality(before),'two actual held operations bound to same current queue');
 assert(after.released&&after.outwardPending===0&&after.nativeUnsettled===0);return {childOrdinal:child.childOrdinal,deadline:child.deadline,waitSettledAt:child.waitSettledAt,abortAt:child.abortAt,workStatusAtHold:child.workStatus,workStatusAfterRelease:last.workStatus,waitStatus:last.waitStatus,denialAfterDeadline:true,parentAlive:true,queueCausal:true};
}
function fixedNegativeBoundaryProof(value,family){
 const events=value.capEvents??[],method='list',childs=new Set(events.map(e=>e.childOrdinal));
 assert.equal(value.observerInvalid,false);assert.equal(events.length,1,'one actual reached final list cap');const e=events[0];assert.equal(e.family,family);assert(e.childOrdinal>0);assert.equal(childs.size,1);assert.equal(e.kind,'cap_'+method);assert.equal(e.counter,2);assert.equal(e.limit,2);assert.equal(value.lists,2);assert.equal(value.thirdListEntered,false);
 if(family===1)assert.equal(value.gets,200);else{assert.equal(value.gets,1);assert.equal(value.deletes,200);assert.equal(value.grantDeleteEntered,false);}
 return {method,childOrdinal:e.childOrdinal,counter:e.counter,limit:e.limit,exactPrecedingPages:2};
}
function fixedSendSdkProof(value,rows,{negative=false}={}){
 for(const name of ['sendCalls','sdkCalls']){const c=value[name];assert.equal(c.invoke,1,'actual single '+name+' invocation');assert.equal(c.sync_throw,0);assert.equal(c.fulfilled+c.rejected,1);}
 assert.equal(value.sendCalls.fulfilled,1,'original SEND ACK settled before SDK');assert.equal(value.sendCalls.sendHashes.length,1);
 const sendRows=rows.filter(([key])=>key.startsWith('afw.finite-owner-cleanup.v1:')&&key.endsWith(':sdk_revoke:send'));assert.equal(sendRows.length,1);
 assert.equal(JSON.parse(sendRows[0][1]).recordHash,value.sendCalls.sendHashes[0]);if(negative)assert.equal(value.sdkCalls.rejected,1,'actual SDK rejection for negative boundary');
 return {sendInvocations:1,sendAcknowledged:true,durablePendingSendHash:value.sendCalls.sendHashes[0],sdkInvocations:1,sdkOutcome:value.sdkCalls.fulfilled?'fulfilled':'rejected'};
}

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
 if(!fixedBudgetOwners.getStore())return withFixedBudgetOwner(caseName,'output/finite-budget/readonly/'+caseName,()=>runBudgetReadonlyCase(caseName));
 const {ownerReferenceFixture,prepareOwnerReference,recordOwnerReference}=await import('./finite-owner-cleanup.mjs'),{plain}=await import('./finite-first-connection-publication.mjs');
 const cleanups=[];let f,response,rootDuring,rootAfter,rootBefore,beforeRelease,afterRelease;
 try{
  f=await ownerReferenceFixture({after(fn){cleanups.push(fn);registerFixedOwnedCleanup(fn);}},{cleanupCheckpoint:true,budgetQualification:true});f.finiteBudgetReadonlyCase=caseName;
  const prepared=await prepareOwnerReference(f);rootBefore=await plain(f.stub.firstConnectionAvailability());assert.equal(rootBefore.available,true);
  const issue=prepared.issue();
  if(caseName==='R3'){const held=await fixedBudgetWait(()=>plain(f.stub.finiteBudgetSignals()),s=>s.heldNativeSettled===2,Date.now()+30000);assert.equal(held.queueObserverInvalid,false);assert(fixedQueueCausality(held),'actual causal populated readonly queue');}
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

  const deadlineProof=caseName==='R3'?fixedChildDeadlineProof(beforeRelease,afterRelease):null,boundaryProof=caseName==='R2'?fixedNegativeBoundaryProof(native,1):null;
  const facts={...native,deadlineProof,boundaryProof,completeWrites:observed.completeWrites,completeNormal:observed.completeNormal,responseStatus:response.status,referenceRows:reference.rows.filter(([key])=>key.endsWith(':reference')).length,
   referenceBefore302:referenceIndex>=0&&responseIndex>referenceIndex,sdkReplay:Math.max(0,observed.completeWrites-1),rootBefore,rootDuring,rootAfter,
   originalChildElapsedMs:deadlineProof?deadlineProof.waitSettledAt-(deadlineProof.deadline-5000):null,callsAfterRelease:beforeRelease?native.nativeInvoked-beforeRelease.nativeInvoked:0,lateReference:caseName==='R3'&&reference.rows.some(([key])=>key.endsWith(':reference'))};
  return ({...fixedBudgetEnvelope('consumer','readonly',[caseName],{consumerGroup:'readonly'}),caseName,facts,record,lineage,privateLineage:{sdkRoot,sdkReference,originalCleanupPlan:plan,actualBuildPair:f.firstConnectionBuild},diagnostics:{epochs:structuredClone(f.budgetEpochs)},preparedInputs:f.firstConnectionBuild.budget});
 }finally{
  // The scope owns callbacks and partial allocations even when external f assignment failed.
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
   assert.equal(held.queueObserverInvalid,false);assert(fixedQueueCausality(held),'actual causal populated reduction queue');
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
  const deadlineProof=caseName==='D4'?fixedChildDeadlineProof(beforeRelease,afterRelease):null,boundaryProof=caseName==='D3'?fixedNegativeBoundaryProof(afterRelease,2):null,sendSdkProof=fixedSendSdkProof(afterRelease,rows,{negative:caseName!=='D1'});
  const facts={...afterRelease,deadlineProof,boundaryProof,sendSdkProof,sdkReplay:Math.max(0,afterRelease.sdkFulfilled+afterRelease.sdkRejected-1),sdkReturned:afterRelease.sdkFulfilled===1,sdkObserved,ownerReceipt,completed:state.status==='complete',pendingPreserved:state.status!=='complete',
   uncertainSendRetried:afterRelease.sendCalls.invoke!==1,rootBefore:f.budgetRootBefore,rootDuring,rootAfter,
   originalChildElapsedMs:deadlineProof?deadlineProof.waitSettledAt-(deadlineProof.deadline-5000):null,
   callsAfterRelease:beforeRelease?afterRelease.nativeInvoked-beforeRelease.nativeInvoked:0,falseSdkReturn:caseName==='D4'&&afterRelease.sdkFulfilled>0};
  return ({...fixedBudgetEnvelope('consumer','reduction',[caseName],{consumerGroup:shared.group}),caseName,plan:f.plan,facts,alarm:original,final,
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

async function runFixedObserverControls(group){
 assert(['F2','F4'].includes(group));fixedControlProgress(group==='F2'?'observer_child':'observer_calls');
 const {Script,createContext}=await import('node:vm'),{finiteBudgetSynAdapterSource,finiteBudgetSynLibraryPrefix}=await import('./finite-owner-cleanup.mjs');
 const context=createContext({setTimeout,clearTimeout,Date,performance,AbortController,Buffer,__controlGroup:group,console:{info(){},error(){}}});
 const body=String.raw`
 globalThis.__observerControl=(async()=>{
  const records=[],kv={},owner={env:{AFW_FINITE_OWNER_OAUTH_KV:kv},ctx:{storage:{}}};for(const method of ['get','list','put','delete'])kv[method]=async()=>null;
  const state=__afwFiniteBudgetState(owner,'D4'),abort=new AbortController(),parent=new AbortController(),lease={signal:abort.signal},guard=()=>{};
  __afwSynSelectGuard(kv,lease,guard,2);
  if(__controlGroup==='F2'){
  let resolveWork,rejectWait;const work=new Promise(r=>{resolveWork=r;}),wait=new Promise((_,r)=>{rejectWait=r;}),deadline=Date.now()+15,error=Error('SYN inert deadline');
  if(__afwSynWork(lease,deadline,work,parent.signal)!==work||__afwSynWait(lease,wait)!==wait)throw Error('SYN original Promise identity changed');
  await new Promise(resolve=>setTimeout(()=>{abort.abort();rejectWait(error);resolve();},20));for(let i=0;i<4;i++)await Promise.resolve();
  const child=state.children[0];if(child.workStatus!=='pending'||child.waitStatus!=='rejected'||child.waitError!==error||child.deadline!==deadline||!child.parentAliveAtAbort||child.abortAt<deadline)throw Error('SYN actual child observation mismatch');
  resolveWork('SYN inert work');await work;for(let i=0;i<4;i++)await Promise.resolve();if(child.workStatus!=='fulfilled')throw Error('SYN work never observed');
  records.push({group:'F2',workPromiseSame:true,waitPromiseSame:true,waitErrorSame:true,separateWorkSettlement:true,actualDeadlineObserved:true,genuineBusinessRoot:false});}
  if(__controlGroup==='F4')for(const kind of ['sdk','send']){
   const helper=kind==='sdk'?__afwSynSdkCallee:__afwSynSendCallee,counts=state[kind==='sdk'?'sdkCalls':'sendCalls'],trace=[],args=[{record:{recordHash:'a'.repeat(64)}},'SYN-second'],result=Promise.resolve('SYN-result'),receiver={get method(){trace.push('getter');return function(...actual){trace.push('call');if(this!==receiver||actual[0]!==args[0]||actual[1]!==args[1])throw Error('SYN receiver or args');return result;};}};
   const arg=n=>{trace.push('arg'+n);return args[n];},actual=helper(receiver.method,receiver,kv,guard)(arg(0),arg(1));
   if(actual!==result||trace.join('|')!=='getter|arg0|arg1|call')throw Error('SYN callee order or result');await actual;for(let i=0;i<4;i++)await Promise.resolve();
   const before=counts.invoke,thrown=Error('SYN original sync'),badReceiver={get method(){trace.push('sync-getter');return()=>{throw thrown;};}};
   try{helper(badReceiver.method,badReceiver,kv,guard)(...args);throw Error('SYN missing sync throw');}catch(e){if(e!==thrown)throw e;}if(counts.invoke!==before+1||counts.sync_throw!==1)throw Error('SYN sync count');
   const getterError=Error('SYN getter'),argError=Error('SYN arg'),prior=counts.invoke;
   try{helper(({get method(){throw getterError;}}).method,receiver,kv,guard)(...args);}catch(e){if(e!==getterError)throw e;}
   try{helper(receiver.method,receiver,kv,guard)((()=>{throw argError;})(),args[1]);}catch(e){if(e!==argError)throw e;}
   if(counts.invoke!==prior)throw Error('SYN getter/arg counted as invocation');
   const rejection=Error('SYN original rejection'),promise=Promise.reject(rejection);Object.defineProperty(promise,'then',{get(){throw Error('SYN then getter read');}});
   const returned=helper(()=>promise,receiver,kv,guard)(...args);if(returned!==promise)throw Error('SYN rejected promise replaced');try{await returned;}catch(e){if(e!==rejection)throw e;}
   for(let i=0;i<4;i++)await Promise.resolve();if(counts.rejected!==1||counts.fulfilled!==1)throw Error('SYN real outcomes not observed');
   records.push({group:'F4',kind,getterArgumentCallOrder:true,receiverArgsPreserved:true,resultPromiseSame:true,syncErrorSame:true,rejectionSame:true,getterArgThrowInvocations:0,intrinsicThen:true,actualCounts:{sendCalls:state.sendCalls,sdkCalls:state.sdkCalls}});
  }
  return records;
 })();
`;
 new Script('class Initial{}\nconst __afwFiniteBudgetFamily="reduction";\n'+finiteBudgetSynAdapterSource+'\n'+finiteBudgetSynLibraryPrefix+'\n'+body).runInContext(context,{timeout:1000});
 const proof=await fixedControlBound(context.__observerControl);if(group==='F4'){const counts=proof.at(-1).actualCounts;assert.throws(()=>fixedSendSdkProof(counts,[]),'actual duplicate SEND or SDK attempts rejected');for(const row of proof){delete row.actualCounts;row.duplicateAttemptsRejected=true;}}return proof;
}

let fixedFacetPreparation=null,fixedFacetPreparationFailureStage=null;
async function prepareFixedFacetControls(){
 if(fixedFacetPreparation){fixedControlProgress('cached_assembly',{failed:fixedFacetPreparationFailureStage!==null,originStage:fixedFacetPreparationFailureStage});return fixedFacetPreparation;}
 return fixedFacetPreparation=(async()=>{
  fixedControlProgress('read_raw');const raw=await readFile('lib/mcp-qa-finite-owner-cleanup.mjs','utf8'),names=['readonlyGrantKv','reductionKv'];
  const {instrumentCleanupConsumer,finiteBudgetSynAdapterSource,finiteBudgetSynLibraryPrefix}=await import('./finite-owner-cleanup.mjs');
  const legacy=instrumentCleanupConsumer(raw);fixedControlProgress('legacy_composition');
  const bodiesOf=(source,label)=>{const ast=sourceAST(source,label);return names.map(name=>{const list=ast.statements.filter(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name);assert.equal(list.length,1);return list[0].getText(ast);});};
  const originalBodies=bodiesOf(raw,'fixed-protected-raw-facets'),legacyBodies=bodiesOf(legacy,'fixed-normal-legacy-facets'),queueInvariance=originalBodies.map((body,index)=>({family:index+1,rawSha256:hash(body),legacySha256:hash(legacyBodies[index]),unchanged:body===legacyBodies[index]}));
  fixedControlProgress('legacy_composition',{queueInvariance});assert.deepEqual(legacyBodies,originalBodies,'legacy queue bodies unchanged');
  fixedControlProgress('prepared_validate');const selected=await validateBudgetPreparedSource({path:'lib/mcp-qa-finite-owner-cleanup.mjs',role:'QA',prepared:legacy,raw});
  fixedControlProgress('baseline_transform',{selectors:selected.selectors});const transformed=transformBudgetPreparedSource(legacy,'lib/mcp-qa-finite-owner-cleanup.mjs','QA');
  fixedControlProgress('syn_instrument');const observed=await instrumentFixedSynLibrary(transformed.source,'lib/mcp-qa-finite-owner-cleanup.mjs',null);
  fixedControlProgress('body_extract',{counts:observed.proof.counts,queueKinds:observed.proof.queueKinds});const bodies=bodiesOf(observed.source,'fixed-pure-prepared-facets');
  const stage=await readFile('lib/mcp-qa-finite-stage-work.mjs','utf8'),stageAST=sourceAST(stage,'protected-retain'),retain=stageAST.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='retainFiniteOwnerStagePromise').getText(stageAST).replace('export function retainFiniteOwnerStagePromise','function retain');
  const records=await readFile('lib/mcp-qa-finite-initial-material-records.mjs','utf8'),recordAST=sourceAST(records,'protected-own'),own=recordAST.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='initialOwn').getText(recordAST).replace('export function initialOwn','function own');
  const evidence=await readFile('lib/mcp-finite-evidence.mjs','utf8'),evidenceAST=sourceAST(evidence,'protected-fields'),fieldsSource=evidenceAST.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='finiteFields').getText(evidenceAST).replace('export function','function');
  const prelude="class Initial{}\nconst __afwFiniteBudgetFamily='reduction';\n"+finiteBudgetSynAdapterSource+'\n'+finiteBudgetSynLibraryPrefix+"\n"+fieldsSource+"\nconst scopes={getStore(){return undefined;}},outstanding=new WeakMap();\n"+retain+"\nconst fail=()=>{throw Error('SYN facet denied');},canonical=JSON.stringify,fields=finiteFields,initialCanonical=JSON.stringify;\n"+own+"\nconst __afwBudget={reflect:fn=>(...args)=>Reflect.apply(fn,Reflect,args),readMethod:(v,k)=>v[k],facadeHolder:v=>v,facade:v=>v,guardValue:e=>e};\n"+bodies.join('\n');
  return {prelude,queueInvariance,proof:observed.proof};
 })().catch(error=>{fixedFacetPreparationFailureStage=fixedControlState?.stage??'unknown';throw error;});
}
async function runFixedFacetControls(group){
 assert(['F3','F4'].includes(group));const prepared=await prepareFixedFacetControls(),{Script,createContext}=await import('node:vm');
 const context=createContext({setTimeout,clearTimeout,Date,performance,AbortController,Buffer,__facetGroup:group,__facetProgress:(family,stage,metrics)=>fixedControlProgress(stage,{family,...metrics})});
 const body=String.raw`

 globalThis.__facetCleanupRecords=[];
 async function __closeFixedFacetControl(owner,jobs,primary,family,variant){
  const errors=[];let releaseSucceeded=true;
  try{await owner.finiteBudgetRelease();}catch(error){releaseSucceeded=false;errors.push({phase:'release',error});}
  if(releaseSucceeded)try{await Promise.allSettled(jobs);}catch(error){errors.push({phase:'settle',error});}
  try{await owner.finiteBudgetRestore();}catch(error){errors.push({phase:'restore',error});}
  globalThis.__facetCleanupRecords.push({family,variant,primary,errors,settlementSkipped:!releaseSucceeded,primaryPreserved:primary!==null});
  if(primary!==null)throw primary;if(errors.length)throw errors[0].error;
 }
 function __checkFixedFacetSetup(owner,state,family,variant,prefix){
  const inherited=owner instanceof Initial,signals=owner.finiteBudgetSignals===Initial.prototype.finiteBudgetSignals&&typeof owner.finiteBudgetSignals==='function',release=owner.finiteBudgetRelease===Initial.prototype.finiteBudgetRelease&&typeof owner.finiteBudgetRelease==='function',restore=owner.finiteBudgetRestore===Initial.prototype.finiteBudgetRestore&&typeof owner.finiteBudgetRestore==='function',prefixValid=family===1||state.tokenPrefix===prefix;
  __facetProgress(family,'facet_setup',{variant,inherited,signals,release,restore,prefixValid});
  if(!inherited||!signals||!release||!restore||!prefixValid)throw Error('SYN fixed facet setup premise');
 }
 globalThis.__facetControl=(async()=>{
  const proof=[];
  for(const family of [1,2]){
   const subject='SYN-facet',id='AAAAAAAAAAAAAAAA',prefix=(family===1?'grant:':'token:')+subject+':'+(family===1?'':id+':');
   if(__facetGroup==='F3')for(const variant of ['two_only','queued']){
    const kv={},owner=Object.assign(new Initial(),{env:{AFW_FINITE_OWNER_OAUTH_KV:kv},ctx:{storage:{}}}),methods={get:async()=>({}),list:async()=>({keys:[],list_complete:true}),delete:async()=>{}};
    for(const method of ['get','list','delete'])kv[method]=methods[method];kv.put=async()=>{};
    const state=__afwFiniteBudgetState(owner,family===1?'R3':'D4');state.grantKey='grant:'+subject+':'+id;if(family===2)state.tokenPrefix=prefix;__afwFiniteBudgetInstall(owner,state);
    const jobs=[];let primary=null;
    try{
     __checkFixedFacetSetup(owner,state,family,variant,prefix);
     const guard=()=>{},child={signal:new AbortController().signal};__afwSynSelectGuard(kv,child,guard,family);
     const captured={get:kv.get,list:kv.list,delete:kv.delete},facet=family===1?readonlyGrantKv(kv,captured,subject,guard):reductionKv(kv,captured,subject,id,guard).facet;
     for(let n=0;n<(variant==='two_only'?2:6);n++)jobs.push(family===1?facet.get('grant:'+subject+':'+id,{type:'json'}):facet.delete(prefix+'SYN'+n));
     for(const p of jobs)p.catch(()=>{});for(let i=0;i<12;i++)await Promise.resolve();
     const actual=await owner.finiteBudgetSignals();
     __facetProgress(family,'vm_hold',{variant,heldNativeSettled:actual.heldNativeSettled,outwardPending:actual.outwardPending,nativeInvoked:actual.nativeInvoked,samples:actual.heldOperations.slice(0,2).map(op=>({ordinal:op.ordinal,childOrdinal:op.childOrdinal,method:op.method,active:op.sample?.active??null,queued:op.sample?.queued??null,family:op.sample?.family??null,sequence:op.sample?.sequence??null,heldSequence:op.heldSequence,nativeSettledAt:op.nativeSettledAt,outwardSettledAt:op.outwardSettledAt}))});
     if(actual.heldNativeSettled!==2||actual.outwardPending!==2||actual.nativeInvoked!==2)throw Error('SYN actual facet did not hold exactly two');
     proof.push({family,variant,signals:JSON.parse(JSON.stringify(actual))});
    }catch(error){primary=error;}finally{await __closeFixedFacetControl(owner,jobs,primary,family,variant);}
   }else{
    const alias={},simple={get:async()=>({}),list:async()=>({keys:[],list_complete:true}),delete:async()=>{}},owner=Object.assign(new Initial(),{env:{AFW_FINITE_OWNER_OAUTH_KV:alias},ctx:{storage:{}}});Object.assign(alias,simple,{put:async()=>{}});
    const state=__afwFiniteBudgetState(owner,family===1?'R2':'D3'),guard=()=>{},child={signal:new AbortController().signal};if(family===2)state.tokenPrefix=prefix;__afwSynSelectGuard(alias,child,guard,family);
    let primary=null;try{
     __checkFixedFacetSetup(owner,state,family,'boundary',prefix);
     const facet=family===1?readonlyGrantKv(alias,simple,subject,guard):reductionKv(alias,simple,subject,id,guard).facet;
     for(let n=0;n<2;n++)await facet.list({prefix});
     let rejected=false;try{await facet.list({prefix});}catch{rejected=true;}
     __facetProgress(family,'vm_boundary',{rejected,capEvents:state.capEvents.map(e=>({family:e.family,childOrdinal:e.childOrdinal,counter:e.counter,limit:e.limit})),lists:2});
     if(!rejected||state.capEvents.length!==1||state.capEvents[0].counter!==2)throw Error('SYN actual list cap not reached');
     const earlier=family===1?readonlyGrantKv(alias,simple,subject,guard):reductionKv(alias,simple,subject,id,guard).facet,before=state.capEvents.length;
     try{await earlier.list({prefix:'invalid'});}catch{}if(state.capEvents.length!==before)throw Error('SYN early failure mistaken for cap');
     proof.push({family,boundaryReached:true,earlierFailureExcluded:true,actualProtectedFacet:true});
    }catch(error){primary=error;}finally{await __closeFixedFacetControl(owner,[],primary,family,'boundary');}
   }
  }return proof;
 })();
`;
 fixedControlProgress('vm_start',{caseGroup:group});let proof,primary=null;
 try{new Script(prepared.prelude+'\n'+body).runInContext(context,{timeout:1000});proof=await fixedControlBound(context.__facetControl);}catch(error){primary=error;}
 const cleanupRecords=fixedControlOwn(context,'__facetCleanupRecords')??[],failureStage=primary!==null?fixedControlState?.stage??null:null;
 for(const record of cleanupRecords){fixedControlProgress('facet_cleanup',{failureStage,family:record.family,variant:record.variant,primaryPreserved:record.primaryPreserved,thrownMatchesPrimary:record.primary!==null&&record.primary===primary,primaryError:record.primary===null?null:fixedControlError(record.primary),cleanupErrors:record.errors.map(value=>({phase:value.phase,error:fixedControlError(value.error)})),settlementSkipped:record.settlementSkipped});}
 if(primary!==null)throw primary;
 if(group==='F3'){
  for(const item of proof){const queueCausal=fixedQueueCausality(item.signals),expected=item.variant==='queued';fixedControlProgress('queue_verdict',{family:item.family,variant:item.variant,queueCausal,expected});assert.equal(queueCausal,expected,'actual facet native entry current queue bound');}
  const good=proof.find(item=>item.variant==='queued').signals,mutations=[x=>{x.heldOperations[0].sample.queued=0;},x=>{x.heldOperations[1].sample.active=1;},x=>{x.heldOperations[1].sample.family=3;},x=>{x.observerEvents.push({kind:'outward_settled',sequence:x.heldOperations[0].sample.sequence+0.5});},x=>{x.heldOperations[1].childOrdinal++;},x=>{x.heldOperations[0].outwardSettledAt=Date.now();}];
  for(let mutatorIndex=0;mutatorIndex<mutations.length;mutatorIndex++){const bad=structuredClone(good);mutations[mutatorIndex](bad);const queueCausal=fixedQueueCausality(bad);fixedControlProgress('queue_mutator',{mutatorIndex,queueCausal});assert.equal(queueCausal,false);}
 }
 return {queueInvariance:prepared.queueInvariance,queueKinds:prepared.proof.queueKinds,cases:proof.map(p=>p.signals?{family:p.family,variant:p.variant,currentQueueWithTwoHeld:fixedQueueCausality(p.signals),heldNativeSettled:p.signals.heldNativeSettled,outwardPending:p.signals.outwardPending,actualNativeInvocations:p.signals.nativeInvoked,genuineBusinessRoot:false}:p)};
}



async function fixedOriginalFixtureCleanup(){
 const source=await readFile('test/fixtures/finite-owner-cleanup.mjs','utf8'),blob=createHash('sha1').update('blob '+Buffer.byteLength(source)+'\0'+source).digest('hex');assert.equal(blob,'cda4ab10544fc8be127aa7a89f86b74141784dd3','fixed original cleanup fixture blob');
 const ast=sourceAST(source,'fixed-original-owner-cleanup-callback'),owners=ast.statements.filter(node=>ts.isFunctionDeclaration(node)&&node.name?.text==='ownerReferenceFixture');assert.equal(owners.length,1);
 const matches=[];const walk=node=>{if(ts.isCallExpression(node)&&ts.isPropertyAccessExpression(node.expression)&&node.expression.expression.getText(ast)==='t'&&node.expression.name.text==='after')matches.push(node);ts.forEachChild(node,walk);};walk(owners[0]);assert.equal(matches.length,1,'unique actual ownerReferenceFixture cleanup callback');
 const call=matches[0];assert.equal(call.arguments.length,1);const arrow=call.arguments[0];assert(ts.isArrowFunction(arrow)&&arrow.parameters.length===0&&arrow.modifiers?.some(m=>m.kind===ts.SyntaxKind.AsyncKeyword));
 const references=new Set();const refs=node=>{if(ts.isIdentifier(node)){const property=ts.isPropertyAccessExpression(node.parent)&&node.parent.name===node;if(!property)references.add(node.text);}ts.forEachChild(node,refs);};refs(arrow);assert.deepEqual([...references].sort(),['f'],'original cleanup callback f-only closure');
 return {source:arrow.getText(ast),proof:{blob,bytes:Buffer.byteLength(arrow.getText(ast)),sha256:hash(arrow.getText(ast)),matches:1,freeReferences:['f']}};
}
async function runFixedNoAdapterControls(){
 const cases=[];
 for(const identity of ['P1','positive_producer','reduction_producer']){
  fixedControlProgress('f5_no_adapter',{identity,step:'start'});
  const root='output/finite-budget/round1-controls/no-adapter-'+identity,persist=join(root,'source'),bytes=Buffer.from('SYN fixed no-adapter cold bytes');await mkdir(persist,{recursive:true});await writeFile(join(persist,'native.bin'),bytes);
  const trace=[];let touched=0,disposed=0,captured=0,cleaned=0,record;
  const value=await withFixedBudgetOwner(identity,join(root,'preserved'),async()=>{
   record=beginFixedBudgetOwnedAllocation();record.attachPersist(persist);
   const stub={};for(const method of ['finiteBudgetRelease','finiteBudgetRestore'])Object.defineProperty(stub,method,{get(){touched++;throw Error('SYN absent adapter touched');}});
   const fixture={stub,budgetEpochs:[],async captureBudgetEpoch(reason){captured++;trace.push('capture');fixture.budgetEpochs.push({reason,role:'QA',epoch:0});},async cleanup(){cleaned++;trace.push('original-cleanup');assert.equal(await record.beforeDelete(),true);trace.push('delete');await rm(persist,{recursive:true});}};
   record.attachFixture(fixture);record.attachMiniflare({async dispose(){disposed++;trace.push('dispose');}});
   registerFixedOwnedCleanup(()=>fixture.cleanup());return {};
  });
  fixedControlProgress('f5_no_adapter',{identity,step:'assert',adapterTouches:touched,disposed,captured,cleaned,archived:record.archived,phases:record.phases});
  assert.equal(touched,0);assert.equal(disposed,1);assert.equal(captured,1);assert.equal(cleaned,1);assert.equal(record.archived,true);assert.equal(record.events.filter(event=>event==='archived').length,1);assert(trace.indexOf('capture')<trace.indexOf('dispose'));assert(trace.indexOf('dispose')<trace.indexOf('delete'));assert((await readFile(join(record.archive.path,'native.bin'))).equals(bytes));await assert.rejects(()=>readFile(join(persist,'native.bin')),{code:'ENOENT'});
  assert.equal(value.ownership.complete,true);assert(record.phases.length===2&&record.phases.every(phase=>phase.status==='not_applicable'&&phase.reason==='case_identity'));
  cases.push({identity,adapterTouches:touched,originalDisposeAttempts:disposed,terminalCaptures:captured,originalCleanupCalls:cleaned,coldArchiveVerified:true,deletedAfterArchive:true,phaseEvidence:record.phases});
 }
 return cases;
}
async function runFixedActualCleanupControls(){
 fixedControlProgress('f5_callback_extract',{step:'start'});const extracted=await fixedOriginalFixtureCleanup(),{Script,createContext}=await import('node:vm'),cases=[];fixedControlProgress('f5_callback_extract',{step:'complete',callback:extracted.proof});
 for(const scenario of ['normal','preassignment','ancillary']){
  fixedControlProgress('f5_callback_setup',{scenario,step:'start'});
  const root='output/finite-budget/round1-controls/actual-callback-'+scenario,persist=join(root,'source'),bytes=Buffer.from('SYN actual callback cold bytes');await mkdir(persist,{recursive:true});await writeFile(join(persist,'native.bin'),bytes);
  const trace=[],primary=Error('SYN preassignment original'),rpcError=Error('SYN legacy RPC cleanup'),callbackError=Error('SYN independent cleanup');let alive=true,disposed=0,cleaned=0,record,actual;const callbackOutcomes=[];
  try{await withFixedBudgetOwner('R1',join(root,'preserved'),async()=>{
   record=beginFixedBudgetOwnedAllocation();record.attachPersist(persist);
   const fixture={budgetEpochs:[],stub:{
    async finiteBudgetRelease(){assert(alive);trace.push('syn-release');},
    async finiteBudgetRestore(){assert(alive);trace.push('syn-restore');},
    async ownerReferenceControl(value){assert.equal(value,'released');assert(alive);trace.push('legacy-release');},
    async firstConnectionRestore(){assert(alive);trace.push('legacy-first-restore');if(scenario==='ancillary')throw rpcError;},
    async restoreMethods(){assert(alive);trace.push('legacy-methods-restore');}
   },async captureBudgetEpoch(reason){assert(alive);trace.push('capture:'+reason);fixture.budgetEpochs.push({reason,role:'QA',epoch:0});},
   async cleanup(){cleaned++;trace.push('cleanup');assert.equal(await record.beforeDelete(),true);assert(record.archived);trace.push('delete');await rm(persist,{recursive:true});}};
   record.attachFixture(fixture);const inertMF={async dispose(){assert(alive);disposed++;trace.push('dispose');alive=false;}};record.attachMiniflare(inertMF);fixture.mf=record.mf;
   const setup={sameMF:fixture.mf===record.mf&&fixture.mf===inertMF,sameWrappedDispose:fixture.mf.dispose===record.mf.dispose,ownerReferenceControl:typeof Object.getOwnPropertyDescriptor(fixture.stub,'ownerReferenceControl')?.value==='function',firstConnectionRestore:typeof Object.getOwnPropertyDescriptor(fixture.stub,'firstConnectionRestore')?.value==='function',restoreMethods:typeof Object.getOwnPropertyDescriptor(fixture.stub,'restoreMethods')?.value==='function',captureBudgetEpoch:typeof Object.getOwnPropertyDescriptor(fixture,'captureBudgetEpoch')?.value==='function',dispose:typeof Object.getOwnPropertyDescriptor(fixture.mf,'dispose')?.value==='function',cleanup:typeof Object.getOwnPropertyDescriptor(fixture,'cleanup')?.value==='function'};
   fixedControlProgress('f5_callback_setup',{scenario,step:'before_registration',setup});assert(Object.values(setup).every(Boolean),'fixed actual callback complete f member premise');
   const context=createContext({__fixedOwnedFixture:fixture});const callback=new Script('(function(f){return '+extracted.source+';})(__fixedOwnedFixture)').runInContext(context,{timeout:1000});assert.equal(typeof callback,'function');
   registerFixedOwnedCleanup(async()=>{
    fixedControlProgress('f5_callback_invoke',{scenario,setup});let originalError=null,observerError=null;
    try{await callback();}catch(error){originalError=error;}
    const outcome={scenario,originalError:originalError===null?null:fixedControlError(originalError)};callbackOutcomes.push(outcome);
    try{fixedControlProgress('f5_callback_return',outcome);}catch(error){observerError=error;ownedFailure(record,'control_progress',error);}
    if(originalError!==null)throw originalError;if(observerError!==null)throw observerError;
   });
   if(scenario==='ancillary')registerFixedOwnedCleanup(async()=>{trace.push('independent-callback');throw callbackError;});
   if(scenario!=='normal')throw primary;return {};
  });}catch(error){actual=error;}
  const savedOutcome=actual&&typeof actual==='object'?fixedBudgetOwnerErrors.get(actual):null;
  fixedControlProgress('f5_callback_assert',{scenario,disposed,cleaned,archived:record?.archived??false,actualError:actual===undefined?null:fixedControlError(actual),operationPrimaryMatched:actual===primary,operationPrimary:savedOutcome?.primary?fixedControlError(savedOutcome.primary):null,cleanupErrors:savedOutcome?.failures.map(value=>({phase:value.phase,error:fixedControlError(value.error)}))??[],callbackOutcomes});
  assert.equal(disposed,1);assert.equal(cleaned,1);assert.equal(record.archived,true);assert(trace.indexOf('legacy-release')<trace.indexOf('dispose'));assert(trace.indexOf('legacy-first-restore')<trace.indexOf('dispose'));assert(trace.indexOf('capture:before-fixture-dispose')<trace.indexOf('dispose'));assert(trace.indexOf('capture:terminal-owned-before-dispose')<trace.indexOf('dispose'));assert(trace.indexOf('dispose')<trace.indexOf('delete'));assert((await readFile(join(record.archive.path,'native.bin'))).equals(bytes));
  if(scenario==='normal'){assert.equal(actual,undefined);assert(trace.indexOf('legacy-methods-restore')<trace.indexOf('dispose'));}
  else{assert.equal(actual,primary);const saved=fixedBudgetOwnerErrors.get(primary);assert.equal(saved.primary,primary);if(scenario==='ancillary'){assert.equal(saved.failures.length,2);assert(saved.failures.some(value=>value.error===rpcError));assert(saved.failures.some(value=>value.error===callbackError));assert(!trace.includes('legacy-methods-restore'),'actual original callback preserves its own failure control flow');}else assert.equal(saved.failures.length,0);}
  await record.dispose();assert.equal(disposed,1,'fallback original dispose once');
  cases.push({scenario,actualOriginalCallback:true,primaryIdentityPreserved:scenario==='normal'?true:actual===primary,originalDisposeAttempts:disposed,originalCleanupCalls:cleaned,rpcAndCaptureBeforeDispose:true,coldArchiveBeforeDelete:true,ancillaryFailures:scenario==='ancillary'?2:0,trace});
 }
 return {callback:extracted.proof,cases};
}

async function runFixedOwnershipControls(){
 const results=[];
 for(const scenario of ['normal','preassignment','multiple_cleanup']){
  fixedControlProgress('f5_legacy_case',{scenario,step:'start'});
  const root='output/finite-budget/round1-controls/ownership-'+scenario,persist=join(root,'source');await mkdir(persist,{recursive:true});await writeFile(join(persist,'native.bin'),'SYN cold database bytes');
  const trace=[],primary=Error('SYN original preassignment'),releaseError=Error('SYN release'),restoreError=Error('SYN restore'),disposeError=Error('SYN dispose');let actual,record;
  try{
   await withFixedBudgetOwner('R1',join(root,'preserved'),async()=>{
    record=beginFixedBudgetOwnedAllocation();record.attachPersist(persist);
    const fixture={budgetEpochs:[],captureBudgetEpoch:async reason=>{trace.push('epoch');fixture.budgetEpochs.push({reason,role:'QA',epoch:0});},stub:{async finiteBudgetRelease(){trace.push('release');if(scenario==='multiple_cleanup')throw releaseError;},async finiteBudgetRestore(){trace.push('restore');if(scenario==='multiple_cleanup')throw restoreError;}}};
    record.attachFixture(fixture);record.attachMiniflare({async dispose(){trace.push('dispose');if(scenario==='multiple_cleanup')throw disposeError;await writeFile(join(persist,'terminal.bin'),'SYN final cold bytes');}});
    registerFixedOwnedCleanup(async()=>{trace.push('cleanup-one');if(scenario==='multiple_cleanup')throw Error('SYN callback one');await record.beforeDelete();trace.push('delete-after-archive');});
    registerFixedOwnedCleanup(async()=>{trace.push('cleanup-two');if(scenario==='multiple_cleanup')throw Error('SYN callback two');});
    if(scenario==='preassignment'||scenario==='multiple_cleanup')throw primary;return {caseName:null};
   });
  }catch(error){actual=error;}
  fixedControlProgress('f5_legacy_case',{scenario,step:'assert',actualError:actual===undefined?null:fixedControlError(actual),primaryMatched:actual===primary,disposed:record.disposed,archived:record.archived,ancillaryCount:record.failures.length});
  assert(trace.indexOf('epoch')<trace.indexOf('dispose'));assert(trace.includes('release')&&trace.includes('restore')&&trace.includes('cleanup-one')&&trace.includes('cleanup-two'));
  if(scenario==='normal'){assert.equal(actual,undefined);assert.equal(record.archived,true);assert((await readFile(join(record.archive.path,'native.bin'))).equals(await readFile(join(persist,'native.bin'))));assert(trace.includes('delete-after-archive'));}
  else{assert.equal(actual,primary);const saved=fixedBudgetOwnerErrors.get(actual);assert.equal(saved.primary,primary);if(scenario==='multiple_cleanup'){assert(saved.failures.some(f=>f.error===releaseError));assert(saved.failures.some(f=>f.error===restoreError));assert(saved.failures.some(f=>f.error===disposeError));assert.equal(saved.failures.length,5);}else{assert.equal(saved.failures.length,0);assert.equal(record.archived,true);}}
  const before=trace.length;try{await record.dispose();}catch{}assert.equal(trace.length,before,'idempotent owned disposal');
  if(scenario==='multiple_cleanup'){assert.equal(record.disposalUncertain,true);assert.equal(record.archived,false);assert.equal(await record.beforeDelete(),false);let assigned=false;await assert.rejects(()=>withFixedBudgetOwner('R2',join(root,'blocked-next'),async()=>{beginFixedBudgetOwnedAllocation();assigned=true;}),/previous owned disposal uncertain before allocation/);assert.equal(assigned,false);}
  results.push({scenario,primaryIdentityPreserved:scenario==='normal'?true:actual===primary,allPhasesAttempted:true,epochBeforeDispose:true,coldBytesVerified:record.archived,ancillaryCount:record.failures.length+(scenario==='multiple_cleanup'?2:0)});
 }
 return results;
}
async function runFixedManifestControls(){
 const job='reduction_prepare',cfg=fixedBudgetJobs[job],sourceTree='d'.repeat(40),context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:'tokenizartinfo-ops/agent-friendly-web',ref:'refs/heads/feat/finite-native-cleanup-20261101',sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind:cfg.kind},expected={job,sourceTree,artifactId:'123',digest:'a'.repeat(64),context};
 const manifest={purpose:'afw.fixed-budget-job.syn.v1',repository:context.repository,ref:context.ref,source:context.sourceSha,sourceTree,run:context.runId,attempt:1,job,...cfg,commandSucceeded:true,...budgetFixedFlags};
 assert.equal(validateFixedBudgetJobManifest(manifest,expected).fullIdentityVerified,true);const cases=[];
 for(const key of ['purpose','repository','ref','source','sourceTree','run','attempt','job','role','group','lane','kind','cases','commandSucceeded']){
  const bad=structuredClone(manifest);bad[key]=key==='attempt'?2:key==='cases'?['D1']:key==='commandSucceeded'?false:'invalid';let mounted=false;assert.throws(()=>{validateFixedBudgetJobManifest(bad,expected);mounted=true;});assert.equal(mounted,false);cases.push(key);
 }
 for(const key of ['artifactId','digest','context']){const bad={...expected,[key]:key==='context'?{...context,kind:'checkpoint'}:'invalid'};let mounted=false;assert.throws(()=>{validateFixedBudgetJobManifest(manifest,bad);mounted=true;});assert.equal(mounted,false);cases.push(key);}
 return {mutations:cases.length,allRejectedBeforeMount:true,fullIdentity:true};
}
async function runFixedPeerWaitControls(){
 const results=[];
 for(const scenario of ['after_30_seconds','never_ready','headroom_exhausted','request_failure']){
  let time=1000000,queries=0,last,requested=[],actualError;const startedAt=scenario==='headroom_exhausted'?time-780000:time-720000,sentinel=Error('SYN request failure');
  try{await collectFixedBudgetPeers({startedAt,now:()=>time,read:async timeout=>{queries++;assert(timeout>0&&timeout<=10000);if(scenario==='request_failure')throw sentinel;return {ready:scenario==='after_30_seconds'&&time>=1035000,artifactCount:queries,terminalPeers:queries>7?6:4};},sleep:async ms=>{requested.push(ms);time+=ms;},persist:async facts=>{last=structuredClone(facts);}});}catch(error){actualError=error;}
  if(scenario==='after_30_seconds'){assert.equal(actualError,undefined);assert(time>=1035000);assert.equal(last.status,'ready');}
  else{assert(actualError);assert.equal(last.status,'failed');if(scenario==='headroom_exhausted')assert.equal(queries,0);if(scenario==='request_failure')assert.equal(actualError,sentinel);}
  assert(last.remaining>=0);assert(last.queries.every(q=>q.actualWaitMs===q.requestedWaitMs));results.push({scenario,queries,elapsed:time-1000000,preserved:true,headroom:last.remaining,requestedWaitMs:requested.reduce((n,v)=>n+v,0)});
 }return results;
}


async function verifyNativePreparationRound1(){
 const groups=[],failures=[],started=Date.now(),root='output/finite-budget/round1-controls';await mkdir(root,{recursive:true});
 const persist=async()=>{const passed=groups.length===7&&groups.every(g=>g.passed),result={purpose:'afw.native-preparation-round1-controls.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,phase:process.env.AFW_BUDGET_CONTROL_PHASE??'unspecified',stage:groups.length===7?'complete':'partial',groups,passed,started,observedAt:Date.now(),I0Opened:false,nativeExecutionProduced:false,businessCases:0,...budgetFixedFlags};await writeFile(join(root,'result.json'),JSON.stringify(result,null,2));return result;};
 const tests=[
  ['F1',async()=>{const cases=[];for(const family of ['readonly','reduction']){fixedControlProgress(family==='readonly'?'wrapper_readonly':'wrapper_reduction');cases.push(await runActualBudgetWrapperControl(family));}assert(cases.every(v=>v.held&&v.originalMethodsRestored&&v.baseReceiversPreserved&&v.outwardSettledAfterRelease===2));return {cases};}],
  ['F2',async()=>({cases:await runFixedObserverControls('F2')})],
  ['F3',()=>runFixedFacetControls('F3')],
  ['F4',async()=>({calls:await runFixedObserverControls('F4'),boundaries:await runFixedFacetControls('F4')})],
  ['F5',async()=>{fixedControlProgress('ownership');await verifyFixedPairDisposer();const noAdapter=await runFixedNoAdapterControls(),actualCleanup=await runFixedActualCleanupControls();return {noAdapter,actualCleanup,cases:await runFixedOwnershipControls(),actualPairedDisposerControl:true};}],
  ['F6',async()=>{fixedControlProgress('manifest');return {cases:await runFixedManifestControls()};}],
  ['F7',async()=>{fixedControlProgress('peer_wait');return {cases:await runFixedPeerWaitControls()};}]
 ];
 for(const [group,run]of tests){
  fixedControlState={group,stage:'start',trace:[]};fixedControlProgress('start');
  try{assert(Date.now()-started<45000,'SYN finite pure group headroom');const value=await run();fixedControlProgress('complete');groups.push({group,passed:true,...value,progress:fixedControlState});}
  catch(error){failures.push({group,error});groups.push({group,passed:false,error:fixedControlError(error),progress:fixedControlState});}
  await persist();
 }
 fixedControlState=null;const result=await persist();if(failures.length)throw failures[0].error;return result;
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
 const frames=new Map(cases.map(caseName=>{const frame={caseName,root:'output/finite-budget/reduction/'+caseName,records:[],callbacks:[],failures:[],closed:null};const record=createFixedOwnedRecord(frame,'recovery');record.attachPersist(join('output','r2-native-budget-'+caseName,'state'));return [caseName,frame];}));
 const dispose=()=>closing??=(async()=>{await Promise.allSettled([...results.values()]);const settled=await Promise.allSettled([...frames.values()].map(frame=>closeFixedOwnedFrame(frame,null)));const failure=settled.find(s=>s.status==='rejected');if(failure)throw failure.reason;})();
 try{
  // Register each fulfilled mount immediately, including a late sibling after a
  // partial rejection. No replica starts after its sibling passes C0.
  const mounts=await Promise.allSettled(cases.map(async caseName=>{
   assertFixedBudgetAllocationSafe();const f=await fixedBudgetOwners.run(frames.get(caseName),()=>recoverCheckpoint(join(root,'native'),{label:'budget-'+caseName,restart:false,budgetQualification:true}));fixtures.push(f);f.budgetCase=caseName;
   f.budgetRootBefore=await plain(f.stub.firstConnectionAvailability());assert.equal(f.budgetRootBefore.available,true);
   const input=await plain(f.stub.finiteBudgetReduction(caseName));assert.equal(input.sameKvBinding,true);
   f.budgetInputReady=Date.now();assert(f.budgetInputReady<=f.plan.C0-30000);return f;
  }));
  const rejected=mounts.find(result=>result.status==='rejected');if(rejected)throw rejected.reason;
  shared.pairReady=Math.max(...fixtures.map(f=>f.budgetInputReady));assert(shared.pairReady<=verified.lineage.C0-30000,'both original cold replicas and input readbacks ready');
  assert.equal(fixtures.length,2);assert(fixtures.every(f=>f.recovery.manifestSha256===verified.lineage.nativeManifestSha256));
  for(const f of fixtures){const frame=frames.get(f.budgetCase),result=fixedBudgetOwners.run(frame,async()=>{let value,primary=null;try{value=await observeFixedReduction(f,f.budgetCase,shared);}catch(error){primary=error;}const ownership=await closeFixedOwnedFrame(frame,primary);value.ownership=ownership;value.diagnostics.epochs=frame.records.flatMap(r=>r.epochs);return fixedBudgetPersist('reduction/'+f.budgetCase,value);});result.catch(()=>{});results.set(f.budgetCase,result);}
  return {result(name){assert(cases.includes(name));return results.get(name);},dispose};
 }catch(error){try{await dispose();}catch(ancillary){fixedBudgetOwnerErrors.set(error,{primary:error,ancillary});}throw error;}
}


const fixedBudgetJobs=Object.freeze({
 positive_prepare:{role:'producer',group:'positive',lane:'positive',kind:'checkpoint',cases:['P1']},
 positive_consume:{role:'consumer',group:'positive',lane:'positive',kind:'positive-result',cases:['P1']},
 reduction_prepare:{role:'producer',group:'reduction_a',lane:'reduction',kind:'reduction-checkpoint',cases:['D1','D2','D3','D4']},
 reduction_consume_a:{role:'consumer',group:'reduction_a',lane:'reduction_a',kind:'reduction-result-a',cases:['D1','D2']},
 readonly:{role:'consumer',group:'readonly',lane:'readonly',kind:'readonly-result',cases:['R1','R2','R3']},
 reduction_consume_b:{role:'consumer',group:'reduction_b',lane:'reduction_b',kind:'reduction-result-b',cases:['D3','D4']}
});
export function validateFixedBudgetJobManifest(manifest,{job,sourceTree,artifactId,digest,context}){
 const cfg=fixedBudgetJobs[job];assert(cfg,'fixed authenticated job role');
 assert.match(artifactId,/^[1-9][0-9]*$/);assert.match(digest,/^[a-f0-9]{64}$/);assert.match(sourceTree,/^[a-f0-9]{40}$/);
 const expected={purpose:'afw.fixed-budget-job.syn.v1',repository:'tokenizartinfo-ops/agent-friendly-web',ref:'refs/heads/feat/finite-native-cleanup-20261101',source:process.env.GITHUB_SHA,sourceTree,run:process.env.GITHUB_RUN_ID,attempt:1,job,role:cfg.role,group:cfg.group,lane:cfg.lane,kind:cfg.kind,cases:cfg.cases,commandSucceeded:true};
 for(const [key,value]of Object.entries(expected))assert.deepEqual(manifest[key],value,'full inner fixed identity '+key);
 assert.deepEqual(context,{purpose:'afw.finite-checkpoint-custody.syn.v1',repository:expected.repository,ref:expected.ref,sourceSha:expected.source,runId:expected.run,runAttempt:1,kind:cfg.kind},'same authenticated AAD identity');
 for(const key of ['operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'])assert.equal(manifest[key],false);
 return {artifactId,digest,job,kind:cfg.kind,sourceTree,fullIdentityVerified:true};
}
export async function collectFixedBudgetPeers({startedAt,read,sleep,persist,now=Date.now}){
 assert(Number.isSafeInteger(startedAt)&&startedAt>0);const deadline=startedAt+900000-120000,maxQueries=120,entered=now(),facts={purpose:'afw.fixed-budget-postnative-polls.syn.v1',startedAt,entered,deadline,reserveMs:120000,maxQueries,queries:[],status:'running'};
 let value,primary=null;
 try{
  for(let query=0;query<maxQueries;query++){
   const before=now(),remaining=deadline-before;assert(remaining>0,'postnative polling sealing headroom reached');
   const timeoutMs=Math.min(10000,remaining);value=await read(timeoutMs);
   const after=now(),ready=value.ready===true,record={query:query+1,before,after,remainingBefore:remaining,remainingAfter:deadline-after,timeoutMs,ready,artifacts:value.artifactCount,terminalPeers:value.terminalPeers,requestedWaitMs:0,actualWaitMs:0};facts.queries.push(record);await persist(facts);
   if(ready){facts.status='ready';return value;}
   const available=deadline-now();assert(available>0&&query+1<maxQueries,'postnative polling finite budget exhausted');
   record.requestedWaitMs=Math.min(5000,available);const waitStart=now();await sleep(record.requestedWaitMs);record.actualWaitMs=now()-waitStart;record.afterWait=now();record.remainingAfterWait=deadline-record.afterWait;await persist(facts);
  }
 }catch(error){primary=error;facts.status='failed';throw error;}
 finally{facts.finished=now();facts.remaining=deadline-facts.finished;facts.failed=primary!==null;try{await persist(facts);}catch(error){if(primary)fixedBudgetOwnerErrors.set(primary,{primary,failures:[{phase:'poll_preservation',error}]});else throw error;}}
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
