const exact=(value,keys)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===keys.length&&keys.every(key=>Object.hasOwn(value,key));
const uuid=value=>typeof value==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value);
const time=value=>Number.isSafeInteger(value)&&value>=0&&Number.isFinite(new Date(value).getTime());
const text=(value,max)=>typeof value==='string'&&value.length>0&&value===value.trim()&&value.length<=max&&!/[<>\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]|https?:|www\.|javascript:|data:/i.test(value);
export function createGoalReadConfirmationAttempt({sourceId,proposalId,revision}){
 if(!/^help-[a-f0-9]{64}$/.test(sourceId||'')||!uuid(proposalId)||!Number.isSafeInteger(revision)||revision<1)throw Error('invalid confirmation');
 const body=Object.freeze({sourceId,proposalId,expectedRevision:revision,requestId:crypto.randomUUID()});
 return Object.freeze({body:()=>({...body})});
}
async function read(response,{timeoutMs=3000}={}){
 if(!response.ok||response.headers.get('content-type')?.split(';')[0].trim()!=='application/json'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>3000)throw Error('unavailable');
 const reader=response.body?.getReader();if(!reader)throw Error('unavailable');let size=0,timer;const chunks=[];
 const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('unavailable')),timeoutMs);});
 try{while(true){const part=await Promise.race([reader.read(),deadline]);if(part.done)break;size+=part.value.byteLength;if(size>4096)throw Error('unavailable');chunks.push(part.value);}const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}
 finally{clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
export async function readOwnerGuidanceResponse(response,{now=Date.now(),timeoutMs=3000}={}){
 const value=await read(response,{timeoutMs});if(!time(now)||!exact(value,['guidance']))throw Error('unavailable');
 const g=value.guidance;if(g===null)return value;
 if(!exact(g,['proposalId','message','preparedAt','revision','expiresAt','expired','stale','confirmedAt'])||!uuid(g.proposalId)||!time(g.preparedAt)||g.preparedAt>now||!time(g.expiresAt)||g.expiresAt<=g.preparedAt||!Number.isSafeInteger(g.revision)||g.revision<1||typeof g.expired!=='boolean'||!g.expired&&g.expiresAt<=now||typeof g.stale!=='boolean'||!exact(g.message,['question','why'])||!text(g.message.question,300)||!g.message.question.endsWith('?')||(g.message.question.match(/\?/g)||[]).length!==1||!text(g.message.why,500)||g.confirmedAt!==null&&(!time(g.confirmedAt)||g.confirmedAt<g.preparedAt||g.confirmedAt>now))throw Error('unavailable');
 return value;
}
export async function readGoalReadConfirmationResponse(response,{now=Date.now(),timeoutMs=3000}={}){
 const value=await read(response,{timeoutMs});if(!time(now)||!exact(value,['confirmedAt'])||!time(value.confirmedAt)||value.confirmedAt>now)throw Error('unavailable');return value;
}
