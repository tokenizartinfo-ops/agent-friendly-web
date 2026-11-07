import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,relative,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';
import {initialEntryHarness} from './finite-initial-entry-world.mjs';

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
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const [command,root]=process.argv.slice(2);
 if(command!=='inspect-budget-graphs')throw Error('SYN budget inspection command unsupported before I0');
 await inspectBudgetCompilation(root);
}
export {inventoryFiles as inventoryBudgetFiles};
