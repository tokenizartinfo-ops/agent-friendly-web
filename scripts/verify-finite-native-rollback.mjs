import {createHash} from 'node:crypto';
import {Miniflare,NoOpLog,convertV4MiniflareOptions} from 'miniflare';
import {QA_CLOUD_CLOSED_PINS} from '../lib/mcp-qa-cloud-closed-pins.mjs';

const roles=Object.freeze({qaClosed:'qaClosed',canaryClosed:'canary',operatorClosed:'operator'});
const disabledRoutes=Object.freeze({
 qaClosed:['/','/mcp','/_finite-owner/monitoring'],
 canaryClosed:['/mcp','/authorize','/monitoring','/qa/expediente'],
 operatorClosed:['/','/mcp','/_finite-owner/monitoring']
});
const canaryOrigin='https://delegated-canary.agentfriendlyweb.dev';
const humanPausedRoutes=new Set(['/authorize','/monitoring']);
const fail=()=>{throw Error('Finite private rollback mounts unavailable');};

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
   return Object.freeze({exactModuleCount:workers.length,deniedRouteCount,operationalReadiness:false});
  }finally{
   await mf.dispose();
  }
 }catch{fail();}
}
