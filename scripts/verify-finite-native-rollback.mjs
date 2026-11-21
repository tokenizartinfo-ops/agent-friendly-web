import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import ts from 'typescript';
import {Miniflare,NoOpLog,convertV4MiniflareOptions} from 'miniflare';
import {QA_CLOUD_CLOSED_PINS} from '../lib/mcp-qa-cloud-closed-pins.mjs';
import {QA_PRE_ENTRY_CUSTODY_RECEIPT_PURPOSE,createQaPreEntryCustodyContext,renderQaPreEntryCustodyModule} from '../lib/mcp-qa-finite-pre-entry-context.mjs';

const roles=Object.freeze({qaClosed:'qaClosed',canaryClosed:'canary',operatorClosed:'operator'});
const disabledRoutes=Object.freeze({
 qaClosed:['/','/mcp','/_finite-owner/monitoring'],
 canaryClosed:['/mcp','/authorize','/monitoring','/qa/expediente'],
 operatorClosed:['/','/mcp','/_finite-owner/monitoring']
});
const canaryOrigin='https://delegated-canary.agentfriendlyweb.dev';
const humanPausedRoutes=new Set(['/authorize','/monitoring']);
const fail=()=>{throw Error('Finite private rollback mounts unavailable');};

export async function readArchivedExports(source,sourcefile,providerExports){
 const contents=new TextDecoder('utf-8',{fatal:true}).decode(source);
 const syntax=ts.createSourceFile(sourcefile,contents,ts.ScriptTarget.Latest,false,ts.ScriptKind.JS);
 // A bare star re-exports names that the current module's metadata cannot enumerate.
 if(syntax.statements.some(statement=>ts.isExportDeclaration(statement)&&statement.moduleSpecifier&&!statement.exportClause))fail();
 // Parsing the pinned source must not resolve runtime imports or execute it.
 const result=await build({stdin:{contents,sourcefile,loader:'js'},bundle:false,write:false,
  format:'esm',platform:'neutral',metafile:true,logLevel:'silent'});
 const outputs=Object.values(result.metafile.outputs);
 if(outputs.length!==1||!Array.isArray(outputs[0].exports))fail();
 const names=outputs[0].exports.slice().sort();
 if(names.length>128||!names.includes('default')||new Set(names).size!==names.length||
    names.some(name=>!/^[A-Za-z_$][A-Za-z0-9_$]{0,127}$/.test(name)))fail();
 if(providerExports!==undefined&&(!providerExports||Object.getPrototypeOf(providerExports)!==Object.prototype||
    Object.keys(providerExports).some(name=>!names.includes(name))))fail();
 return Object.freeze(names);
}

export async function verifyFiniteRollbackMounts(moduleFrame,metadata){
 let offset=0,outboundAttempts=0;
 try{
  const workers=Object.entries(roles).map(([role,key])=>{
   const {module:closedModule}=QA_CLOUD_CLOSED_PINS[key];
   const source=moduleFrame.subarray(offset,offset+closedModule.bytes);
   offset+=closedModule.bytes;
   if(source.length!==closedModule.bytes||createHash('sha256').update(source).digest('hex')!==closedModule.sha256)fail();
   const model=metadata[role];
   return {
    name:role,
    modules:[{type:'ESModule',path:role+'/'+closedModule.name,contents:source}],
    compatibilityDate:model.compatibility_date,
    compatibilityFlags:model.compatibility_flags,
    bindings:Object.fromEntries(model.bindings.filter(binding=>binding.type==='plain_text')
     .map(binding=>[binding.name,binding.text])),
    outboundService:async()=>{outboundAttempts+=1;return new Response(null,{status:503});}
   };
  });
  if(offset!==moduleFrame.length)fail();
  const moduleExports=Object.freeze(Object.fromEntries(await Promise.all(workers.map(async worker=>{
   const role=worker.name,{contents,path}=worker.modules[0];
   return [role,await readArchivedExports(contents,path,metadata[role].exports)];
  }))));
  // No provider connections, runtime secrets or persistent state are mounted.
  // Silence Workerd output for this private payload and return counts only.
  const mf=new Miniflare(convertV4MiniflareOptions({workers,log:new NoOpLog(),handleStructuredLogs:()=>{}}));
  try{
   let deniedRouteCount=0;
   for(const [role,paths] of Object.entries(disabledRoutes)){
    const worker=await mf.getWorker(role);
    for(const path of paths){
     const origin=role==='canaryClosed'?canaryOrigin:'https://fixture.invalid';
     const result=await worker.fetch(origin+path);
     if(result.status!==404){await result.body?.cancel();fail();}
     if(role==='canaryClosed'&&humanPausedRoutes.has(path)){
      const type=result.headers.get('content-type');
      if(!type?.startsWith('text/html')||!(await result.text()).includes('<h1>Esta prueba está en pausa</h1>'))fail();
     }else await result.body?.cancel();
     deniedRouteCount+=1;
    }
   }
   if(outboundAttempts)fail();
   return Object.freeze({exactModuleCount:workers.length,deniedRouteCount,operationalReadiness:false,moduleExports});
  }finally{
   await mf.dispose();
  }
 }catch{fail();}
}

/** Mount the real compiled wrapper against the exact QA backup without
 * injecting synthetic custody profiles or an active observation window. */
export async function verifyExpiredQaCustodyTemplate({staging,baseline,metadata}){
 const template=staging.custodyProbeTemplate,code=staging.files['qaCustodyProbe/index.mjs'];
 const {id:baselineVersionId,module:pin}=QA_CLOUD_CLOSED_PINS.qaClosed;
 const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
 if(template.sourceRevision!==staging.sourceRevision||template.sourceTree!==staging.sourceTree||
    template.authorizesEffects!==false||template.operationalReadiness!==false||code.byteLength!==template.module.bytes||
    sha(code)!==template.module.sha256||baseline.byteLength!==pin.bytes||sha(baseline)!==pin.sha256)fail();
 const mounted=await verifyColdQaCustodyMount({code,baseline,metadata,sourceRevision:staging.sourceRevision});
 return Object.freeze({templateSha256:template.module.sha256,baselineSha256:pin.sha256,
  ...mounted,authorizesEffects:false,operationalReadiness:false});
}

export async function verifyColdQaCustodyMount({code,baseline,metadata,sourceRevision}){
 const context=createQaPreEntryCustodyContext({sourceRevision,startAt:0,expiresAt:1});
 const {id,baselineVersionId}=context;
 let outboundAttempts=0;
 let mf;
 try{
  mf=new Miniflare(convertV4MiniflareOptions({
  modules:[
   {type:'ESModule',path:'custody-staging/index.mjs',contents:code},
   {type:'ESModule',path:'custody-staging/closed-rollback.mjs',contents:baseline},
   {type:'ESModule',path:'custody-staging/pre-entry-custody-context.mjs',contents:renderQaPreEntryCustodyModule(context)}
  ],
  compatibilityDate:metadata.compatibility_date,compatibilityFlags:metadata.compatibility_flags,
  bindings:{...Object.fromEntries(metadata.bindings.filter(binding=>binding.type==='plain_text')
   .map(binding=>[binding.name,binding.text])),AFW_QA_VERSION:{id:baselineVersionId}},
  durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'IndependentClosure',useSQLite:true}},
  outboundService:async()=>{outboundAttempts++;return new Response(null,{status:503});},
  log:new NoOpLog(),handleStructuredLogs:()=>{},
  }));
  const ns=await mf.getDurableObjectNamespace('AFW_INDEPENDENT_CLOSURE');
  const raw=await ns.get(ns.idFromName('afw-own-successor-closure-v1')).readPreEntryCustody(id,sourceRevision);
  const receipt=JSON.parse(raw);
  if(receipt?.purpose!==QA_PRE_ENTRY_CUSTODY_RECEIPT_PURPOSE||receipt.status!=='blocked'||
     receipt.authorizesEffects!==false||receipt.operationalReadiness!==false||
     receipt.mayRetry!==false||Object.keys(receipt).length!==5)fail();
  const response=await mf.dispatchFetch('https://fixture.invalid/');
  const closed=response.status===404;await response.body?.cancel();
  if(!closed||outboundAttempts)fail();
  return Object.freeze({coldAssemblyBlocked:true,outboundAttempts});
 }catch{fail();}finally{
  if(mf)try{await mf.dispose();}catch{fail();}
 }
}
