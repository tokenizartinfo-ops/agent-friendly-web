// N3 QA-only source seams. Pure text preparation; no Source execution here.
import {createHash} from 'node:crypto';
const hash=text=>({bytes:Buffer.byteLength(text),sha256:createHash('sha256').update(text).digest('hex')});
const modulePath='./test/fixtures/n3-qa-causal-ledger.mjs';
const header="import {n3QaLedger} from '../../test/fixtures/n3-qa-causal-ledger.mjs';\n";
const libHeader="import {n3QaLedger} from '../test/fixtures/n3-qa-causal-ledger.mjs';\n";
const event=(root,kind,site,lease,entity,promise='null',present='false',error='undefined',cause='null')=>"n3QaLedger.note("+root+",{type:'event',kind:'"+kind+"',site:'"+site+"',leaseRef:"+lease+",promiseRef:"+promise+",entityRef:"+entity+",errorPresent:"+present+",errorRef:"+error+",cause:"+cause+"});";
const bind=(root,entity,lease,affected,parent,role,call='null')=>"n3QaLedger.note("+root+",{type:'bind',entity:'"+entity+"',leaseRef:"+lease+",promiseRef:null,entityRef:"+affected+",parentRef:"+parent+",callRef:"+call+",role:'"+role+"'});";
const exact=(source,before,after,edits)=>{
 if(source.split(before).length!==2)throw Error('N3_SEAM_INVALID');
 edits.push({before,after});return source.replace(before,()=>after);
};
const finish=(id,before,after,edits)=>({id,before:hash(before),after:hash(after),contents:after,edits});
export function transformN3Lease(before){
 let s=before;const edits=[];
 s=exact(s,' const stop=()=>controller.abort();'," let n3Lease=null;\n const stop=()=>{controller.abort();"+event('null','abort-observed','initial-stop','n3Lease','n3Lease','null','false','undefined',"'unknown'")+"};",edits);
 const check=s.split('\n').find(line=>line.startsWith(' const check=()=>{'));
 if(!check||!check.endsWith('};'))throw Error('N3_SEAM_INVALID');
 s=exact(s,check,check.replace('()=>{','()=>{try{').slice(0,-2)+"}catch(error){"+event('null','check-threw','initial-holders','n3Lease','n3Lease','null','true','error')+"throw error;}};",edits);
 s=exact(s,' const lease=Object.freeze({signal:controller.signal,assertCurrent:check});',' const lease=Object.freeze({signal:controller.signal,assertCurrent:check});n3Lease=lease;',edits);
 s=exact(s,' const retain=p=>{pendingWork.add(p);const settled=()=>pendingWork.delete(p);p.then(settled,settled);return p;};',' const retain=p=>{pendingWork.add(p);'+event('null','retained','initial-retain','lease','null','p')+'const settled=()=>{const removed=pendingWork.delete(p);'+event('null','settlement-observed','initial-settled','lease','null','p')+'return removed;};p.then(settled,settled);return p;};',edits);
 s=exact(s,'  const abort=()=>c.abort();','  let n3Child=null;const abort=()=>{c.abort();'+event('null','abort-observed','initial-child','lease','n3Child','null','false','undefined',"'unknown'")+'};',edits);
 const childLine=s.split('\n').find(line=>line.startsWith('  const l=Object.freeze({signal:c.signal,assertCurrent(){'));
 if(!childLine||!childLine.endsWith('}});'))throw Error('N3_SEAM_INVALID');
 s=exact(s,childLine,childLine.replace('assertCurrent(){','assertCurrent(){try{').slice(0,-4)+'}catch(error){'+event('null','check-threw','initial-child','lease','n3Child','null','true','error')+'throw error;}}});n3Child=l;'+bind('null','lease','lease','l','lease','child'),edits);
 s=exact(s,"if(!actual||typeof actual.then!=='function')fail();retain(actual);","if(!actual||typeof actual.then!=='function')fail();"+bind('null','promise','lease','actual','l','child-work')+"retain(actual);",edits);
 s=exact(s,'c.abort();}\n };','c.abort();'+event('null','child-finally','initial-child-finally','lease','l','null','false','undefined',"'finally'")+'}\n };',edits);
 s=exact(s,'close(){closed=true;clearTimeout(timer);stop();}','close(){'+event('null','close-call','initial-close','lease','lease','null','false','undefined',"'unknown'")+'const n3WasClosed=closed;closed=true;if(!n3WasClosed){'+event('null','closed-transition','initial-close','lease','lease','null','false','undefined',"'unknown'")+'}clearTimeout(timer);stop();}',edits);
 s=libHeader+s;edits.unshift({before:'',after:libHeader,at:'prefix'});
 return finish('LEASE',before,s,edits);
}
export function transformN3Op(before){
 let s=before;const edits=[];
 s=exact(s,' let last=wall,closed=false;',' let last=wall,closed=false;let n3Root=null;',edits);
 s=exact(s,' const abort=()=>controller.abort();',' const abort=()=>{controller.abort();'+event('n3Root','abort-observed','root-abort','n3Root','n3Root','null','false','undefined',"'unknown'")+'};',edits);
 s=exact(s,' requestContexts.set(lease,{root:lease,startedAt,remaining,deadline:()=>deadline});',' requestContexts.set(lease,{root:lease,startedAt,remaining,deadline:()=>deadline});n3Root=lease;'+bind('lease','lease','lease','lease','null','root'),edits);
 s=exact(s,'finish(){requestContexts.delete(lease);stageAdmissions.delete(lease);closed=true;clearTimeout(timer);request.signal.removeEventListener(\'abort\',abort);controller.abort();}','finish(){'+event('lease','close-call','root-finish','lease','lease','null','false','undefined',"'explicit-finish'")+'requestContexts.delete(lease);stageAdmissions.delete(lease);const n3WasClosed=closed;closed=true;if(!n3WasClosed){'+event('lease','closed-transition','root-finish','lease','lease','null','false','undefined',"'explicit-finish'")+'}clearTimeout(timer);request.signal.removeEventListener(\'abort\',abort);controller.abort();'+event('lease','abort-observed','root-finish','lease','lease','null','false','undefined',"'explicit-finish'")+'}',edits);
 s=libHeader+s;edits.unshift({before:'',after:libHeader,at:'prefix'});return finish('OP',before,s,edits);
}
export function transformN3Phase(before){
 let s=before;const edits=[];
 s=exact(s,'  clock=createFiniteInitialLease(deadline,deadline,holders,fail);','  clock=createFiniteInitialLease(deadline,deadline,holders,fail);'+bind('root','lease','parent','clock.lease','root','pair','options')+event('root','pair-enter','target-pair','parent','clock.lease'),edits);
 s=exact(s,'parentSignal=signal;onAbort=()=>clock.close();','parentSignal=signal;onAbort=()=>{clock.close();'+event('root','abort-observed','pair-parent-abort','parent','clock.lease','null','false','undefined',"'parent-abort'")+'};',edits);
 const handlerStart='export async function handlePrivateQaFiniteOwnerChoice(',handlerEnd='/** Fixed unmounted QA implementation.';
 if(s.split(handlerStart).length!==2||s.split(handlerEnd).length!==2)throw Error('N3_SEAM_INVALID');
 const start=s.indexOf(handlerStart),end=s.indexOf(handlerEnd,start);
 if(start<0||end<=start)throw Error('N3_SEAM_INVALID');
 const prefix=s.slice(0,start),suffix=s.slice(end);s=s.slice(start,end);
 s=exact(s," let clock,onAbort,failed=false,position='entry';"," let clock,onAbort,failed=false,position='entry';let n3TargetActive=false,n3TargetSeen=false;",edits);
 s=exact(s,'clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);','clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);'+bind('originalLease','lease','originalLease','clock.lease','originalLease','outer'),edits);
 s=exact(s,'onAbort=()=>{clock.close();};originalLease.signal.addEventListener','onAbort=()=>{clock.close();'+event('originalLease','abort-observed','outer-parent-abort','originalLease','clock.lease','null','false','undefined',"'parent-abort'")+'};originalLease.signal.addEventListener',edits);
 s=exact(s,'admission=consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId:id,stage},originalLease);','admission=consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId:id,stage},originalLease);if(stage===\'notices\'){'+bind('originalLease','scope','originalLease','clock.lease','originalLease','notices')+event('originalLease','scope-enter','choice-admitted','originalLease','originalLease')+'}',edits);
 const pair="const pair=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));";
 s=exact(s,pair,"const pair=await wait(()=>{const n3Options={ctx,env,parent:originalLease,preconnectionId:id};if(n3TargetActive){"+bind('originalLease','call','originalLease','null','null','target','n3Options')+"}const n3Returned=observeOwnerPhasePair(n3Options);if(n3TargetActive){"+bind('originalLease','promise','originalLease','n3Returned','null','pair-return','n3Options')+"}return n3Returned;});",edits);
 s=exact(s,"await withChild(async(l,end)=>{\n     await recheckOwned();await engine.readPointer(baseline,l);","await withChild(async(l,end)=>{\n      if(stage==='notices'){"+bind('originalLease','lease','originalLease','l','clock.lease','activation-child')+"}await recheckOwned();await engine.readPointer(baseline,l);",edits);
 const target="position='receipt-recorded';await recheckOwned();position='complete';await recheckOwned();";
 s=exact(s,target,"position='receipt-recorded';if(stage==='notices'&&!n3TargetSeen){n3TargetSeen=true;n3TargetActive=true;"+event('originalLease','target-enter','postreceipt-check','originalLease','l')+"try{await recheckOwned();"+event('originalLease','target-return','postreceipt-check','originalLease','l')+"}catch(error){"+event('originalLease','target-throw','postreceipt-check','originalLease','l','null','true','error')+"throw error;}finally{n3TargetActive=false;}}else await recheckOwned();position='complete';await recheckOwned();",edits);
 const ret="check();return new Response('<h1>'+({connection:'Configuración de lectura preparada',notices:'Configuración de avisos preparada',finite:'Ensayo finito preparado'}[stage])+'</h1><p>La lectura y los avisos requieren decisiones separadas.</p>',{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});";
 s=exact(s,ret,ret.replace('return new Response','const n3Response=new Response')+event('originalLease','logical-return','choice-return','originalLease','clock.lease')+'return n3Response;',edits);
 const catchPrefix="}catch(error){",normalCatch="}catch(error){failed=true;position='failed';",preparedCatch="}catch(error){(globalThis.__t3Observation??=[]).push({kind:'connection-failure',position,";
 const catchAnchor=s.includes(preparedCatch)?preparedCatch:normalCatch;
 s=exact(s,catchAnchor,catchPrefix+event('originalLease','logical-throw','choice-catch','originalLease','clock?.lease??null','null','true','error')+catchAnchor.slice(catchPrefix.length),edits);
 s=libHeader+prefix+s+suffix;edits.unshift({before:'',after:libHeader,at:'prefix'});return finish('PH',before,s,edits);
}
export function transformN3Entry(before){
 const edits=[],importText="import {n3QaLedger} from './test/fixtures/n3-qa-causal-ledger.mjs';\n";
 const target="async firstConnectionProbe(){const rows=[...await this.ctx.storage.list()];return {observation:globalThis.__t3Observation??[],calls:this.firstConnectionCalls??[],business:rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')||k.startsWith('connection-preparation:')||k.startsWith('afw.finite-preparation-cleanup.v1:')||k.startsWith('owner-ticket:')).map(([key])=>key),alarm:await this.ctx.storage.getAlarm()};}";
 let s=exact(before,target,target.replace("alarm:await this.ctx.storage.getAlarm()};}","alarm:await this.ctx.storage.getAlarm(),causal:n3QaLedger.snapshot()};}"),edits);
 s=importText+s;edits.unshift({before:'',after:importText,at:'prefix'});return finish('STDIN',before,s,edits);
}

export function createN3CompilerObservation(){
 const inputs=new Map();
 const remember=result=>{
  if(inputs.has(result.id))throw Error('N3_COMPILE_INPUT_INVALID');
  inputs.set(result.id,{id:result.id,before:result.before,after:result.after});
  return result.contents;
 };
 return Object.freeze({
  phase:s=>remember(transformN3Phase(s)),op:s=>remember(transformN3Op(s)),lease:s=>remember(transformN3Lease(s)),entry:s=>remember(transformN3Entry(s)),
  ledger:s=>{
   if(inputs.has('ledger'))throw Error('N3_COMPILE_INPUT_INVALID');
   inputs.set('ledger',{id:'ledger',before:null,after:hash(s)});return s;
  },
  finish(Mbytes,QAbytes){
   const order=['ledger','PH','OP','LEASE','STDIN'];
   if(inputs.size!==5||order.some(id=>!inputs.has(id)))throw Error('N3_COMPILE_INPUT_INVALID');
   const rows=order.map(id=>inputs.get(id));
   for(const r of rows)if(r.before&&r.before.sha256===r.after.sha256)throw Error('N3_COMPILE_INPUT_INVALID');
   return {M:hash(Mbytes),QA:{...hash(QAbytes),deliberatelyChanged:true,inputManifestHash:createHash('sha256').update(JSON.stringify(rows)).digest('hex'),inputs:rows}};
  }
 });
}
