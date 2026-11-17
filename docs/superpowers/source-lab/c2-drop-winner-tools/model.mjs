import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createDropDiagnostic} from './test/fixtures/finite-first-connection-publication.mjs';
import {dropTicket,resolveDropSite} from './test/fixtures/finite-initial-entry-world.mjs';
const sha=x=>createHash('sha256').update(x).digest('hex');
const Q='x-afw-lab-qa-denial',M='x-afw-lab-m-denial';
const serialize=(r,status=r.status)=>new Response(r.clone().body,{status,headers:r.headers});
const anchors=[['S01:247',11,21],['S00:743',31,41],['S04:37',51,61],['S04:43',51,71],['S01:69',11,81],['S01:95',11,91]].map(([label,a,b])=>({label,throw:{line:a,column:5},call:{line:b,column:9}}));
function stack(i){
 const site=anchors.find(a=>a.label===i.throwSite)??{throw:anchors[1].throw,call:{line:43,column:9}};
 const key=i.framePair==='foreign-script'?'foreign.js':'qa-script.js';
 const list=['    at fail ('+key+':'+site.throw.line+':5)','    at choice ('+key+':'+site.call.line+':'+(i.framePair==='adjacent-generated-column'?10:9)+')'];
 if(i.framePair==='shared-helper-only')list[1]=list[0];
 if(i.framePair==='throw-without-caller')list.pop();
 return list;
}
function wireResponse(i,hop,r,name) {
 const res=serialize(r,hop==='change-response-status'?502:r.status);
 if(hop==='strip'||hop==='fresh-unmarked-same-status')res.headers.delete(name);
 if(hop==='combined-values')res.headers.append(name,'invalid-second-value');
 if(hop==='duplicate-exact')res.headers.append(name,res.headers.get(name));
 if(['stale-uuid','foreign-uuid'].includes(hop))res.headers.set(name,'q1.'+sha('afw.lab.drop.uuid.v2\0'+i.foreignUuid)+'.'+r.status);
 return res;
}
function blockHeaders(r,kind,name){
 if(kind==='preexisting-reserved-field')r.headers.set(name,'reserved-collision');
 if(['immutable','diagnostic-write-throws'].includes(kind)) {
   const original=r.headers;
   Object.defineProperty(r,'headers',{value:new Proxy(original,{get(h,k){
     if(k==='set')return ()=>{throw TypeError(kind);};
     const x=Reflect.get(h,k,h);return typeof x==='function'?x.bind(h):x;
   }})});
 }
}
export async function exercise(i){
 const qh=createDropDiagnostic(sha),mh=createDropDiagnostic(sha),host=createDropDiagnostic(sha);
 const p=new Request(i.url,{method:'POST'}),r=new Request(i.url,{method:'POST'}),p2=new Request(p),r2=new Request(r);
 const lease={},l2={},c=i.optIn?mh.cell(p):null,c2=mh.cell(p2);
 const e=i.optIn?qh.arm('qa-script.js'):null;
 let current=e;
 qh.enter(e,r,i.uuid,i.handle);
 if(i.qaRequest==='twice-in-E1')qh.enter(e,r2,i.uuid,i.handle);
 mh.bind(p,lease);mh.assign(p,i.uuid);mh.bind(p2,l2);mh.assign(p2,i.foreignUuid);
 const fixedHeaders=()=>[i.unchangedHeader];
 const q=new Response(i.qaBody,{status:i.qaStatus,headers:fixedHeaders()});
 const d=new Error('owned-denial'),expired=new Error('owned-deadline'),foreign=new Error('foreign');
 const clear=Promise.withResolvers(),first=Promise.withResolvers(),deadline=Promise.withResolvers();
 let qaAtM=null,beforeSeal=null,sealedUnchanged;
 if(i.epoch.startsWith('seal-E1')){beforeSeal=qh.cut(e);qh.revoke(e);current=qh.arm('qa-script.js');}
 if(i.epoch.startsWith('late-E1')){qh.revoke(e);current=qh.arm('qa-script.js');}
 function settleQa(){
   qh.register(i.qaRequest==='foreign-R2'?r2:r,q,stack(i));
   blockHeaders(q,i.qaResult,Q);
   const result=i.qaResult==='fresh-Q2-same-status'?serialize(q):q;
   let early=null;if(i.qaHop==='serialize-before-tap')early=serialize(result);
   qh.qaEnd(e,r,result);
   qaAtM=wireResponse(i,i.qaHop,early??result,Q);
   mh.denied(p,i.lease==='foreign-L2'?l2:lease,qaAtM,d);
   assert.equal(qaAtM.headers.get(i.unchangedHeader[0]),i.unchangedHeader[1]);
 }
 const ownedDeadline=['original-deadline','original-abort','foreign-deadline-same-kind'].includes(i.winner);
 const actual=clear.promise.then(()=>{throw d;});
 const joined=Promise.race([actual,first.promise,deadline.promise]);
 if(ownedDeadline) {
   const l=i.winner==='foreign-deadline-same-kind'?l2:lease;
   mh.deadline(l,expired);deadline.reject(expired);
 } else {
   settleQa();first.reject(i.winner==='foreign-denial-same-status'?foreign:d);
   if(i.cancel!=='pending-at-cut')clear.resolve();
 }
 let b,earlyOuter,finished=0;
 const raised=new Error('parent finish');
 const original=joined.catch(error=>{
   if(ownedDeadline&&i.qaSettlement==='after-winner-before-cut')settleQa();
   b=new Response(i.outerBody,{status:i.outerStatus,headers:fixedHeaders()});
   mh.caught(i.parentRequest==='foreign-P2'?p2:p,i.lease==='foreign-L2'?l2:lease,error,b);
   blockHeaders(b,i.parentResult,M);
   if(i.parentResult==='fresh-B2-same-status')return serialize(b);
   if(['substitute-previously-marked-B2','reused-B2'].includes(i.parentResult)){
     const old=new Response(i.outerBody,{status:i.outerStatus,headers:fixedHeaders()});
     const earlier=new Error('earlier');mh.denied(p2,l2,new Response('prior',{status:403}),earlier);mh.caught(p2,l2,earlier,old);
     const prior=Promise.resolve(old);mh.tap(c2,p2,prior);return prior;
   }
   if(i.mHop==='serialize-before-tap')earlyOuter=serialize(b);
   return b;
 }).finally(()=>{finished++;if(i.parentResult==='original-finish-throws')throw raised;});
 mh.tap(i.parentCell==='foreign-C2'?c2:c,p,original);
 let atHost=null,settlement='fulfilled';
 try{const value=await original;atHost=wireResponse(i,i.mHop,earlyOuter??value,M);}
 catch(err){assert.strictEqual(err,raised);settlement='original-rejection';}
 if(atHost){host.receive(atHost);assert.equal(atHost.headers.get(i.unchangedHeader[0]),i.unchangedHeader[1]);assert.equal(await atHost.clone().text(),i.outerBody);}
 assert.equal(finished,1);
 let state=beforeSeal??qh.cut(current);
 if(i.epoch.startsWith('seal-E1')){const saved=JSON.stringify(state);qh.qaEnd(e,r,q);sealedUnchanged=saved===JSON.stringify(state)&&!state.qaEgress;}
 if(i.hostCut==='absent')state=null;
 if(i.hostCut==='foreign-join'&&state)state={...state,entryJoin:sha(i.foreignUuid)};
 const form={handle:i.hostCut==='wrong-form'?'other-handle':i.handle,projectRef:i.project};
 const t={action:'finite',projectRef:i.hostCut==='wrong-project-holder'?'foreign-project':i.project,ticketHash:sha(i.handle)};
 const row=['owner-ticket:'+t.ticketHash,JSON.stringify(t)];
 const unique=dropTicket(i.hostCut==='two-matching-tickets'?[row,row]:[row],form,(_,raw)=>JSON.parse(raw));
 const prep={},binding={prep,siblingPrep:i.compiler==='equal-js-other-preparation'?{}:prep,
   realNamespace:i.compiler!=='budget-compile-only',qa:'a',sibling:i.compiler==='unequal-generated-js'?'b':'a',
   mountedQA:i.compiler==='other-mounted-script'?'other':'a',m:'m',mountedM:'m',sites:i.compiler==='only-one-distinct-anchor'?anchors.slice(0,1):anchors};
 const mapped=resolveDropSite(binding,state?.coords);
 const result=host.host(atHost,state,form.handle,unique,mapped,i.qaTransport!=='unverified',i.mHop!=='fallback-copy-all-fields-unverified')??host.unknown();
 let originalAssertionPropagated=false;
 if(i.originalPutsAssertion==='throw-after-cut'){
   try{assert.equal(0,1,'controlled puts');}catch(error){originalAssertionPropagated=error instanceof assert.AssertionError && error.actual===0 && error.expected===1;}
 }
 if(ownedDeadline&&i.qaSettlement==='after-cut')settleQa();
 clear.resolve();await actual.catch(()=>{});
 if(qaAtM)assert.equal(await qaAtM.clone().text(),i.qaBody);
 return {qaAtM,atHost,dropWinner:result,settlement,originalAssertionPropagated,sealedUnchanged};
}
