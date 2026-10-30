import {createHash} from 'node:crypto';
import {restorationFixture} from './canary-restoration.mjs';
import {createPrivateQaExecutionPin} from '../../lib/mcp-qa-execution-identity.mjs';
export const LEGACY='afw.canary-restoration-control.v1',HEAD='afw.qa-generation-head.v2',INFO='afw.qa-generation-info.v2:',CONTROL='afw.qa-generation-control.v2:';
export const hash=value=>createHash('sha256').update(value).digest('hex');
export function generationFixture(){
 let at=Date.UTC(2026,9,30,20),calls=0;const rowPolicy=JSON.stringify(restorationFixture({at:at-240000}).policy);
 const legacy={purpose:LEGACY,planHash:hash(rowPolicy),policy:rowPolicy,armedAt:at-230000,withdrawnAt:at-200000};
 const capsule={purpose:'afw.qa-generation-capsule.v2',predecessor:{kind:'legacy',control:JSON.stringify(legacy),trialId:'1'.repeat(64),grantId:'legacy-grant',eventId:'2'.repeat(64)},trialId:'3'.repeat(64),grantId:'current-grant',eventId:'4'.repeat(64),closurePolicyHash:'5'.repeat(64),bundleHash:'6'.repeat(64),cancellationHistoryHash:'7'.repeat(64),startAt:at-1000,expiresAt:at+60000};
 let chain=Promise.resolve(),transactions=0,puts=0;const rows=new Map([[LEGACY,structuredClone(legacy)]]),lost=new Set();
 const storage={rows,get transactions(){return transactions;},get puts(){return puts;},transaction(fn){
  const p=chain.then(async()=>{const n=++transactions,copy=new Map([...rows].map(([k,v])=>[k,structuredClone(v)]));const value=await fn({get:async k=>structuredClone(copy.get(k)),put:async(k,v)=>{puts++;copy.set(k,structuredClone(v));},list:async({prefix,limit})=>new Map([...copy].filter(([k])=>k.startsWith(prefix)).slice(0,limit))});rows.clear();for(const [k,v]of copy)rows.set(k,v);if(lost.has(n))throw Error('synthetic lost ACK');return value;});chain=p.catch(()=>{});return p;
 }};
 const env={AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}};
 const pinOptions={env,expectedVersionId:env.AFW_QA_VERSION.id,sourceRevision:'a'.repeat(40),context:'durable_object'};
 const f={storage,rows,legacy,capsule,env,pinOptions,lost,eligibility:async()=>true,now:()=>at,setNow:n=>{at=n;},get calls(){return calls;}};
 f.options=()=>({storage,capsule:JSON.stringify(f.capsule),executionPin:createPrivateQaExecutionPin(f.pinOptions),checkEligibility:async()=>{calls++;return f.eligibility(calls);},now:f.now,timeoutMs:5000});
 return f;
}
