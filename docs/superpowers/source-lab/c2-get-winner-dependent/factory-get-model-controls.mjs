// MODEL only. Synthetic observer method sequence, with exact frozen expectations.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createGetWinnerObserver, createGetWinnerHost } from './test/fixtures/finite-first-connection-publication.mjs';
const body='{"status":"admin_pending","mayRetry":false,"operationalReadiness":false}';
const pending=status=>new Response(body,{status,headers:{'Cache-Control':'no-store'}});
async function one(row){
 const observer=createGetWinnerObserver(),P={},P2={},L={},L2={},cell=observer.enter(P);
 const errors=new Map(),responses=new Map();
 let candidateP=P,candidateB='b1',parentNormal=false,finished=false,serialized=null,reserved=null,lastStub=null;
 const error=(id,status=503)=>{
  if(!errors.has(id))errors.set(id,Object.assign(new Error('MODEL'),{status}));
  return errors.get(id);
 };
 const finish=()=>{if(parentNormal&&!finished){finished=true;observer.finish(cell,candidateP,L,responses.get(candidateB));}};
 const copy=r=>new Response(body,{status:r.status,headers:r.headers});
 for(const [index,event]of row.input.events.entries()){
  const parts=event.split(':');
  if(event==='bind:l1'){observer.bind(P,L);continue;}
  if(event==='forward:private'){observer.forward(P,L);continue;}
  if(parts[0]==='timer'||parts[0]==='abort'){
   const lease=parts.length===3?L2:L;observer.deadline(lease,error(parts.at(-1)));continue;
  }
  if(event==='stub:413'){
   lastStub=new Response(null,{status:413});
   const first=row.input.events.slice(index+1).find(e=>e.startsWith('first:'));
   assert(first);const D=error(first.split(':').at(-1),413);
   observer.denied(P,L,lastStub,D,413);continue;
  }
  if(event==='stub:200'){lastStub=new Response('<html></html>',{status:200,headers:{'Content-Type':'text/html'}});continue;}
  if(event==='validate:explicit-mime:d1'){
   observer.validate(L,lastStub);observer.validationDenied(error('d1'));observer.validationEnd(L,lastStub);continue;
  }
  if(event==='validate:iterator.throw:d1'){
   observer.validate(L,lastStub);error('d1');observer.validationEnd(L,lastStub);continue;
  }
  if(parts[0]==='race'&&parts[1]!=='response'){observer.race(L,error(parts[1]));continue;}
  if(parts[0]==='catch'){
   const D=error(parts[1]),B=pending([400,401,403,404,405,413,429].includes(D.status)?D.status:503);
   responses.set('b1',B);observer.caught(P,L,D,B);continue;
  }
  if(event==='return:ok'){responses.set('ok',new Response('<html></html>',{headers:{'Content-Type':'text/html'}}));continue;}
  if(event==='finish:normal'){parentNormal=true;continue;}
  if(event==='finish:throw'){parentNormal=false;continue;}
  if(event==='finish:substitute:b2'){parentNormal=true;responses.set('b2',pending(503));continue;}
  if(event==='fallback:b2'){responses.set('b2',pending(503));continue;}
  if(event==='candidate:b2'){candidateB='b2';responses.set('b2',pending(503));continue;}
  if(event==='candidate:p2'){candidateP=P2;continue;}
  if(event==='second-bind:l1'){observer.bind(P,L);continue;}
  if(event==='collision:reserved'){
   reserved='fixture-collision';responses.get('b1').headers.set('x-afw-lab-get-winner',reserved);continue;
  }
  if(event==='header:combined'||event==='header:duplicate'){
   const headers=responses.get('b1').headers;
   headers.append('x-afw-lab-get-winner','g1.413.S.413');headers.append('x-afw-lab-get-winner','g1.413.S.413');
   reserved=headers.get('x-afw-lab-get-winner');continue;
  }
  if(event==='egress:marked'){finish();continue;}
  if(event==='strip'){const r=copy(responses.get('b1'));r.headers.delete('x-afw-lab-get-winner');responses.set('b2',r);continue;}
  if(event==='copyAll:b1:b2'){responses.set('b2',copy(responses.get('b1')));continue;}
  if(parts[0]==='serialize'){finish();serialized=copy(responses.get(parts[1]));continue;}
  if(event==='attempted-mark:b1'){finish();continue;}
 }
 assert(serialized,row.id);
 const external=serialized.headers.get('x-afw-lab-get-winner');
 if(reserved!==null)assert.equal(external,reserved,row.id);
 const main={},label={id:'C2T1_SCOPE_MISSING'},host=createGetWinnerHost(main,()=>row.input.directRoute,Response);
 const token=host.begin(label);token.capture(main,serialized,serialized.status);host.finish(label);
 const tuple=host.take(label,main),winner={L:'DEADLINE_OR_ABORT',S:'STUB_NON_OK',V:'POST_STUB_VALIDATION',U:'UNKNOWN'}[tuple.w];
 assert.equal(winner,row.expected.winner,row.id);assert.equal(tuple.s,row.expected.stub,row.id);
 assert.equal(reserved===null?external:null,row.expected.marker,row.id);
 assert.equal(reserved===null&&external!==null?1:0,row.expected.allowedHeaderDelta,row.id);
 assert.equal(row.expected.qa,'UNKNOWN');
 return row.id;
}
export async function factoryModelControls(){
 const corpus=JSON.parse(await readFile('m-race-egress.json','utf8'));
 const scope=JSON.parse(await readFile('factory-model-scope.json','utf8')),ids=[];
 for(const row of corpus.rows)if(scope.scheduledIds.includes(row.id))ids.push(await one(row));
 assert.deepEqual(ids,scope.scheduledIds);
 return {ids,held:scope.heldIds,evidence:'FACTORY_METHOD_SEQUENCE_MODEL_ONLY',native:false};
}
