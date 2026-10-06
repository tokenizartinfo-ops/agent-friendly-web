const fail=()=>new Error('Assistance receipt unconfirmed');
export function createAssistanceAttempt(){
 let pending;
 return{prepare(_projectId,revision,topic){if(!pending)pending={method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({contract:'afw.assistance-request.v1',requestId:crypto.randomUUID(),expectedRevision:revision,topic})};return{...pending,headers:{...pending.headers}};},confirm(){pending=null;}};
}
export async function readAssistanceResponse(response,{allowEmpty=false,expected}={}){
 if(response.headers.get('content-type')?.split(';')[0].trim()!=='application/json')throw fail();
 const reader=response.body?.getReader();if(!reader)throw fail();let timer,length=0;const chunks=[];
 const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject(fail()),3000);});
 try{
  while(true){const next=await Promise.race([reader.read(),deadline]);if(next.done)break;length+=next.value.length;if(length>2048)throw fail();chunks.push(next.value);}
  const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  const result=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
  if(response.status!==200){const error=fail();if(response.status===409&&result?.status===409&&result.code==='project_changed'&&Object.keys(result).length===2)error.code='project_changed';throw error;}
  if(!result||Object.keys(result).length!==2||result.status!==200||!Object.hasOwn(result,'receipt'))throw fail();
  if(result.receipt===null&&allowEmpty)return null;
  const r=result.receipt,keys=['id','requestedAt','revision','topic','state','stale'];
  const hasReview=r&&Object.hasOwn(r,'review');
  if(!r||Object.keys(r).length!==keys.length+(hasReview?1:0)||keys.some(x=>!Object.hasOwn(r,x))||!/^help-[a-f0-9]{64}$/.test(r.id)||typeof r.requestedAt!=='string'||!Number.isFinite(Date.parse(r.requestedAt))||new Date(r.requestedAt).toISOString()!==r.requestedAt||!Number.isSafeInteger(r.revision)||r.revision<1||!['orientation','save','comparison','delivery'].includes(r.topic)||r.state!=='received'||typeof r.stale!=='boolean')throw fail();
  if(hasReview&&(!r.review||Object.keys(r.review).length!==2||!Object.hasOwn(r.review,'outcome')||!Object.hasOwn(r.review,'reviewedAt')||!['reviewed','intervention_required','superseded'].includes(r.review.outcome)||!Number.isSafeInteger(r.review.reviewedAt)||r.review.reviewedAt<Date.parse(r.requestedAt)||r.review.reviewedAt>Date.now()))throw fail();
  if(expected&&(r.revision!==expected.expectedRevision||r.topic!==expected.topic))throw fail();
  return{...r,...(hasReview?{review:{...r.review}}:{})};
 }catch(error){if(error?.code==='project_changed')throw error;throw fail();}finally{clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
