import {readPrivateQaFiniteSharedOrigin} from './mcp-qa-finite-shared-origin.mjs';
import {AFW_FIXED_WORKFLOWS} from './mcp-fixed-terminal-workflows.mjs';
import {FINITE_ACCOUNT,finiteUuid} from './mcp-qa-finite-external-contract.mjs';
import {finiteFields as fields,finiteHex as hex,finiteHash as hash} from './mcp-finite-evidence.mjs';
import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';

const compiledRevision=globalThis.__AFW_QA_SOURCE_REVISION__??'';
const definition=AFW_FIXED_WORKFLOWS.find(workflow=>workflow.className==='PrivateQaBootstrap');
const roots=AFW_FIXED_WORKFLOWS.map(workflow=>'/workflows/'+workflow.name);
const launcherRoot='/workflows/'+definition.name;
const contexts=new WeakMap();
const fail=()=>{throw Error('Finite native launch material unavailable');};

export const privateQaFiniteLaunchSource=Object.freeze({
 async resolve({ctx,env,refs,parent}){
  const hasRevision=Object.hasOwn(refs,'sourceRevision');
  const x=fields(refs,['intentId',hasRevision?'sourceRevision':'controlHash']);
  if(!hex(compiledRevision,40)||hasRevision&&x.sourceRevision!==compiledRevision||!hasRevision&&!hex(x.controlHash))fail();
  const storage=ctx.storage,fetcher=globalThis.fetch,credential=env.AFW_MCP_CLOSURE_READ_TOKEN;
  const signal=parent.signal,clock=parent.check,deadline=parent.deadline;
  const check=()=>{
   const now=clock();
   if(signal.aborted||parent.signal!==signal||parent.check!==clock||parent.deadline!==deadline||now>=deadline||
      ctx.storage!==storage||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==credential)fail();
   return now;
  };
  check();
  const native=await readPrivateQaFiniteSharedOrigin({ctx,env,refs:{intentId:x.intentId,sourceRevision:compiledRevision},parent});check();
  const {control,external,planRaw}=native,plan=control.plan;
  if(!hasRevision&&x.controlHash!==control.controlHash)fail();
  const execution=Object.freeze({intentId:plan.intentId,controlHash:control.controlHash,sourceRevision:compiledRevision,
   moduleHash:plan.source.moduleHash,confirmationId:plan.workflows.confirmation,observerId:plan.workflows.bootstrap,
   admissionHash:hash(external),launcherId:plan.workflows.launcher});

  const request=async(input,callerCheck)=>{
   const {method,path,query:rawQuery,signal:callerSignal}=fields(input,['method','path','query','signal']);
   const query=rawQuery??{};
   const current=()=>{check();callerCheck();};
   if(method!=='GET'||callerSignal!==signal||typeof callerCheck!=='function'||!query||Object.getPrototypeOf(query)!==Object.prototype)fail();
   const enumerate=roots.some(root=>path===root+'/instances');
   const version=path.startsWith(launcherRoot+'/versions/')&&finiteUuid(path.slice((launcherRoot+'/versions/').length));
   const entry=path===launcherRoot+'/instances/'+execution.launcherId;
   if(!(path==='/workflows'||roots.includes(path)||enumerate||version||entry))fail();
   const keys=Object.keys(query);
   if(keys.some(k=>!['per_page','page','direction','cursor'].includes(k))||query.per_page!==undefined&&query.per_page!==100||
      query.page!==undefined&&query.page!==1||query.direction!==undefined&&query.direction!=='desc'||query.cursor!==undefined&&
      (typeof query.cursor!=='string'||!query.cursor||Buffer.byteLength(query.cursor)>1024||/[\x00-\x20\x7f]/.test(query.cursor))||
      keys.length&&!(path==='/workflows'||enumerate))fail();
   current();const queryString=new URLSearchParams(query).toString();
   const wire=finiteSeedWire({fetchImpl:fetcher,now:check,signal,credential,origin:'https://api.cloudflare.com/client/v4',check:current,requests:1,limit:262144});
   try{
    const {value,status}=await wire.request('/accounts/'+FINITE_ACCOUNT+path+(queryString?'?'+queryString:''));
    finiteCfEnvelope(value);current();return {...value,status};
   }finally{wire.close();}
  };
  const token=Object.freeze({});
  contexts.set(token,{parent,check,value:Object.freeze({ctx,env,plan:planRaw,request,execution})});
  return token;
 },
 read({ctx,env,context,parent}){
  const entry=contexts.get(context);
  if(!entry||entry.parent!==parent||entry.value.ctx!==ctx||entry.value.env!==env)fail();
  entry.check();return entry.value;
 },
});
