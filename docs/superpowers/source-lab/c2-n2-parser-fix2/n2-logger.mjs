import {createHash} from 'node:crypto';
const sha=v=>createHash('sha256').update(v).digest('hex');
const exact=(v,k)=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===k.length&&Object.keys(v).every((x,i)=>x===k[i]);
const wall=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const mono=x=>typeof x==='number'&&Number.isFinite(x)&&x>=0&&x<=Number.MAX_SAFE_INTEGER;
const invalid=()=>{throw Error('N2_CAPTURE_INVALID');};
const definitions=[
 ['T2 original parent holders rejected','initial-parent-holders',['closed','aborted','entered','end','last','mono','lastMono']],
 ['T2 original parent clock rejected','initial-parent-clock',['closed','aborted','entered','end','last','at','mono','m','lastMono']],
 ['T2 original child clock rejected','initial-child-clock',['alive','aborted','began','until','m0','wall','monotonic']]
];
export function parseGuard(message){
 if(typeof message!=='string')return null;
 const d=definitions.find(([tag])=>message.startsWith(tag+' '));if(!d)return null;
 if(Buffer.byteLength(message)>2048)invalid();
 const raw=message.slice(d[0].length+1);let p;try{p=JSON.parse(raw);}catch{invalid();}
 if(JSON.stringify(p)!==raw||!exact(p,d[2]))invalid();
 if(d[1]==='initial-child-clock'){
  if(typeof p.alive!=='boolean'||typeof p.aborted!=='boolean'||!wall(p.began)||!wall(p.until)||!wall(p.wall)||!mono(p.m0)||!mono(p.monotonic))invalid();
  return {tag:d[1],closed:null,aborted:p.aborted,alive:p.alive,wallExpired:p.wall>=p.until,monoExpired:p.monotonic-p.m0>=p.until-p.began,wallRegressed:p.wall<p.began,monoRegressed:p.monotonic<p.m0};
 }
 if(typeof p.closed!=='boolean'||typeof p.aborted!=='boolean'||!wall(p.entered)||!wall(p.end)||!wall(p.last)||!mono(p.mono)||!mono(p.lastMono))invalid();
 if(d[1]==='initial-parent-holders')return {tag:d[1],closed:p.closed,aborted:p.aborted,alive:null,wallExpired:null,monoExpired:null,wallRegressed:null,monoRegressed:null};
 if(!wall(p.at)||!mono(p.m))invalid();
 return {tag:d[1],closed:p.closed,aborted:p.aborted,alive:null,wallExpired:p.at>=p.end,monoExpired:p.m-p.mono>=p.end-p.entered,wallRegressed:p.at<p.last,monoRegressed:p.m<p.lastMono};
}
export function createGuardObserver(){
 let record=null,onFault=null,armed=false,ended=false,window='prerequisite',excluded=0,guards=0,observed=false,broken=false,call=0;
 const proofs=new WeakMap(),functionIds=new WeakMap();let nextFunction=0;
 const fault=()=>{broken=true;try{onFault?.();}catch{}};
 const emit=value=>{try{record?.(value);}catch{fault();}};
 const snapshot=(options,stage,expected)=>{
  const refs=[],ancestors=new Set();let nodes=0;
  const walk=(v,depth=0,root=false)=>{
   if(++nodes>50000||depth>64)invalid();
   if(v===null)return ['null'];if(v===undefined)return ['undefined'];
   if(typeof v==='string'){const b=Buffer.from(v);return ['string',b.length,sha(b)];}
   if(typeof v==='boolean')return ['boolean',v];
   if(typeof v==='number'){if(!Number.isFinite(v))invalid();return ['number',Object.is(v,-0)?'-0':String(v)];}
   if(typeof v==='function'){refs.push(v);if(!functionIds.has(v))functionIds.set(v,++nextFunction);return ['function',functionIds.get(v)];}
   if(typeof v!=='object')invalid();refs.push(v);
   if(ancestors.has(v))invalid();ancestors.add(v);
   try{
    if(ArrayBuffer.isView(v)){
     if(!(v instanceof Uint8Array))invalid();const b=Buffer.from(v.buffer,v.byteOffset,v.byteLength);return ['bytes',b.length,sha(b)];
    }
    if(v instanceof RegExp)return ['regexp',v.source,v.flags,v.lastIndex];
    const proto=Object.getPrototypeOf(v);if(!Array.isArray(v)&&proto!==Object.prototype&&proto!==null)invalid();
    const keys=Reflect.ownKeys(v);if(keys.some(k=>typeof k!=='string'))invalid();
    const rows=[];for(const key of keys){
     if(root&&key==='handleStructuredLogs')continue;
     const d=Object.getOwnPropertyDescriptor(v,key);if(!d||!Object.hasOwn(d,'value'))invalid();
     rows.push([key,d.enumerable,d.configurable,d.writable,walk(d.value,depth+1)]);
    }
    return [Array.isArray(v)?'array':proto===null?'null-prototype':'object',rows];
   }finally{ancestors.delete(v);}
  };
  const tree=walk(options,0,true),hash=sha(Buffer.from(JSON.stringify(tree)));
  const role=name=>{
   if(!Array.isArray(options?.workers))invalid();
   const found=options.workers.filter(w=>w?.config?.name===name);if(found.length!==1)invalid();
   const manifest=found[0].config.manifest,entry=manifest?.modules?.[manifest.mainModule];
   if(entry?.type!=='esm'||typeof entry.contents!=='string')invalid();
   const b=Buffer.from(entry.contents);if(b.length>33554432)invalid();return {bytes:b.length,sha256:sha(b)};
  };
  let M=null,QA=null,compiledMatch=null;
  if(stage!=='constructor'){
   M=role('canary-first-connection');QA=role('qa-first-connection');
   compiledMatch=!!expected&&M.bytes===expected.M?.bytes&&M.sha256===expected.M?.sha256&&QA.bytes===expected.QA?.bytes&&QA.sha256===expected.QA?.sha256;
  }
  return {hash,refs,M,QA,compiledMatch};
 };
 const sameRefs=(a,b)=>a.length===b.length&&a.every((v,i)=>Object.is(v,b[i]));
 const sameScripts=(a,b)=>JSON.stringify([a.M,a.QA,a.compiledMatch])===JSON.stringify([b.M,b.QA,b.compiledMatch]);
 const handler=entry=>{
  if(ended)return;
  try{
   observed=true;
   const projection=parseGuard(entry?.message);if(!projection)return;
   if(entry?.level!=='info')invalid();
   if(!armed){if(++excluded>4096)invalid();return;}
   if(guards>=8)invalid();guards++;
   const {tag,...flags}=projection;
   emit({kind:'guard',guardSequence:guards,tag,window,...flags,correlated:null});
  }catch{fault();}
 };
 const loggerDescriptor=options=>{const d=Object.getOwnPropertyDescriptor(options,'handleStructuredLogs');if(d&&!Object.hasOwn(d,'value'))invalid();return d;};
 const loggerValue=options=>loggerDescriptor(options)?.value;
 const prepare=(options,stage,expected=null)=>{
  try{
   if(ended||!['constructor','assembly','mount','adopt'].includes(stage)||call>=5||proofs.has(options))invalid();
   const descriptor=loggerDescriptor(options),prior=descriptor?.value;if(prior!==undefined&&prior!==handler)invalid();
   const before=snapshot(options,stage,expected);
   if(prior!==handler)Object.defineProperty(options,'handleStructuredLogs',descriptor?{...descriptor,value:handler}:{value:handler,writable:true,enumerable:true,configurable:true});
   const actual=snapshot(options,stage,expected),settingsEqual=before.hash===actual.hash&&sameScripts(before,actual),referencesSame=sameRefs(before.refs,actual.refs),callbackSame=loggerValue(options)===handler;
   const p={call:++call,stage,before,expected};proofs.set(options,p);
   emit({kind:'host-proof',call:p.call,stage,edge:'prepared',beforeHash:before.hash,argumentHash:actual.hash,settingsEqual,callbackSame,referencesSame,compiledMatch:actual.compiledMatch,M:actual.M,QA:actual.QA});
   if(!settingsEqual||!referencesSame||!callbackSame||stage!=='constructor'&&actual.compiledMatch!==true)fault();
  }catch{fault();}
 };
 const complete=(options,stage)=>{
  if(ended)return;
  try{
   const p=proofs.get(options);if(!p||p.stage!==stage)invalid();
   const actual=snapshot(options,stage,p.expected),settingsEqual=p.before.hash===actual.hash&&sameScripts(p.before,actual),referencesSame=sameRefs(p.before.refs,actual.refs),callbackSame=loggerValue(options)===handler;
   emit({kind:'host-proof',call:p.call,stage,edge:'returned',beforeHash:p.before.hash,argumentHash:actual.hash,settingsEqual,callbackSame,referencesSame,compiledMatch:actual.compiledMatch,M:actual.M,QA:actual.QA});
   proofs.delete(options);if(!settingsEqual||!referencesSame||!callbackSame||stage!=='constructor'&&actual.compiledMatch!==true)fault();
  }catch{fault();}
 };
 return Object.freeze({
  bind(sink,failed){if(record!==null){fault();return;}record=sink;onFault=failed;},
  handler,prepare,complete,
  setWindow(next){if(!['prerequisite','notices-get','notices-post','after-post','unscoped'].includes(next)){fault();return;}window=next;},
  baseline(){if(armed||ended){fault();return;}armed=true;window='unscoped';emit({kind:'hook-state',stage:'baseline',callbackObserved:observed?true:null,excludedTags:excluded,newGuards:guards,fault:broken});},
  finish(){if(ended){fault();return;}emit({kind:'hook-state',stage:'after',callbackObserved:observed?true:null,excludedTags:excluded,newGuards:guards,fault:broken});ended=true;}
 });
}
export const guardObserver=createGuardObserver();
