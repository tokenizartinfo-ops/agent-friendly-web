// DIAGNOSTIC ONLY: exact lexical insertions; original IO/proxy/callback/lease identities stay intact.
const prefix="import {nextGetMark as __ngMark,nextGetArmed as __ngArmed} from './__afw_next_get_trace.mjs';\n";
const local="const __ng=(site,edge,lease,ceiling=null)=>{if(!__ngArmed())return;let remaining=null;try{remaining=readFiniteOwnerRequestDeadline(lease)-Date.now();}catch{}__ngMark(site,edge,remaining,ceiling===null?null:ceiling-Date.now());};\n";
function replace(source,old,next){if(source.split(old).length!==2)throw Error('NEXT_DIAGNOSTIC_ANCHOR');return source.replace(old,next);}
function wrap(source,start,end,site,lease,ceiling='null'){
 const a=source.indexOf(start),b=source.indexOf(end,a);if(a<0||b<a||source.split(start).length!==2||source.split(end).length!==2)throw Error('NEXT_DIAGNOSTIC_FUNCTION');
 const part=source.slice(a,b),open=start.length-1,close=part.lastIndexOf('}');if(open<0||close<open)throw Error('NEXT_DIAGNOSTIC_FUNCTION');
 const next=part.slice(0,open+1)+"__ng('"+site+"','enter',"+lease+","+ceiling+");try{"+part.slice(open+1,close)+"}catch(error){__ng('"+site+"','throw',"+lease+","+ceiling+");throw error;}"+part.slice(close);
 return source.slice(0,a)+next+source.slice(b);
}
export function instrumentNextGetSource(kind,source){
 if(kind==='PH'){
  const old="const grammar=qualifyFiniteOwnerChoiceRequest(original,bytes),initial=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease})),initialState=initial.second;";
  const next="const grammar=qualifyFiniteOwnerChoiceRequest(original,bytes);__ng('initial-timeline','enter',originalLease);let initial;try{initial=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease}));__ng('initial-timeline','return',originalLease);}catch(error){__ng('initial-timeline','throw',originalLease);throw error;}const initialState=initial.second;";
  source=replace(source,old,next);
  const start="async function readOwnerTimeline({ctx,env},lease,preconnectionId=null){",end="function chooseOwnerStage(timeline){";
  source=replace(source,"return pair;\n}\nfunction chooseOwnerStage(timeline){","__ng('timeline','return',lease);return pair;\n}\nfunction chooseOwnerStage(timeline){");
  source=wrap(source,start,end,'timeline','lease');
  return prefix+local+source;
 }
 if(kind==='OP'){
  source=replace(source,"if(!ownedContext)return validateFiniteOwnerSource(value);","if(!ownedContext){const __ngUnowned=validateFiniteOwnerSource(value);__ng('op-source','return',parent);return __ngUnowned;}");
  source=replace(source,"return source;\n };\n const source=await readSource();","__ng('op-source','return',parent);return source;\n };\n const source=await readSource();");
  source=wrap(source,"const readSource=async(parent=lease)=>{"," const source=await readSource();",'op-source','parent');
  source=replace(source,"if(canonical(await readSource(proofLease))!==canonical(source))fail();current(proofLease);","if(canonical(await readSource(proofLease))!==canonical(source))fail();current(proofLease);__ng('op-check','return',proofLease,source.window.expiresAt);");
  source=wrap(source,"const check=async()=>{"," await check();",'op-check','proofLease','source.window.expiresAt');
  source=replace(source,"const step=async fn=>{await check();const value=await child(proofLease,fn);await check();return value;};","const step=async fn=>{__ng('op-step','enter',proofLease,source.window.expiresAt);try{await check();const value=await child(proofLease,fn);await check();__ng('op-step','return',proofLease,source.window.expiresAt);return value;}catch(error){__ng('op-step','throw',proofLease,source.window.expiresAt);throw error;}};");
  source=replace(source,"c=await permissions(c,stage==='finite');await stageHistory(c,stage==='notices'?1:2);return c;","if(stage==='finite')__ng('finite-permission','enter',lease,c.source.window.expiresAt);try{c=await permissions(c,stage==='finite');if(stage==='finite')__ng('finite-permission','return',lease,Math.min(c.source.window.expiresAt,c.event.expiresAt));}catch(error){if(stage==='finite')__ng('finite-permission','throw',lease);throw error;}if(stage==='finite')__ng('finite-history','enter',lease,c.source.window.expiresAt);try{await stageHistory(c,stage==='notices'?1:2);if(stage==='finite')__ng('finite-history','return',lease,c.source.window.expiresAt);}catch(error){if(stage==='finite')__ng('finite-history','throw',lease);throw error;}return c;");
  source=replace(source,"const result=await c.step(write);if(!['recorded','existing'].includes(result?.status)||result.recordHash!==hash(kind,value))fail();","if(kind==='Ticket')__ng('ticket-put','enter',c.lease,c.source.window.expiresAt);let result;try{result=await c.step(write);if(!['recorded','existing'].includes(result?.status)||result.recordHash!==hash(kind,value))fail();if(kind==='Ticket')__ng('ticket-put','return',c.lease,c.source.window.expiresAt);}catch(error){if(kind==='Ticket')__ng('ticket-put','throw',c.lease);throw error;}");
  source=replace(source,"const record=observed(await c.step(read));if(encode(kind,record)!==encode(kind,value))fail();return Object.freeze({record,mutation:result});","if(kind==='Ticket')__ng('ticket-readback','enter',c.lease,c.source.window.expiresAt);let record;try{record=observed(await c.step(read));if(encode(kind,record)!==encode(kind,value))fail();if(kind==='Ticket')__ng('ticket-readback','return',c.lease,c.source.window.expiresAt);}catch(error){if(kind==='Ticket')__ng('ticket-readback','throw',c.lease);throw error;}return Object.freeze({record,mutation:result});");
  return prefix+local+source;
 }
 if(kind==='WORK')return source+"\nexport function readNextGetRetention(ctx){const entry=outstanding.get(ctx);if(!entry)return {state:'absent',count:0};const count=entry.promises.size;return Number.isSafeInteger(count)&&count>=0&&count<=4096?{state:'active',count}:{state:'unavailable',count:null};}\n";
 throw Error('NEXT_DIAGNOSTIC_KIND');
}
export function extendNextGetEntry(entry){
 const start=" export class Initial extends FiniteClosure{";
 const methods=" nextGetArm(){return armNextGet();}\n nextGetMetadata(){return {trace:readNextGetTrace(),retention:readNextGetRetention(this.ctx)};}\n";
 return "import {armNextGet,readNextGetTrace} from './lib/__afw_next_get_trace.mjs';\nimport {readNextGetRetention} from './lib/mcp-qa-finite-stage-work.mjs';\n"+replace(entry,start,start+methods);
}
