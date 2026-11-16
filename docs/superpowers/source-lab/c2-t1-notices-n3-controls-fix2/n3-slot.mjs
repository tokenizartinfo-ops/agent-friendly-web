// Node diagnostic-only actual-promise exclusion. A timeout is not settlement.
export function createObservationSlot(){
 let actual=null;
 const dispose=value=>{try{value?.[Symbol.dispose]?.();}catch{}};
 return Object.freeze({
  busy(){return actual!==null;},
  async read(call,allow=()=>true,limit=1000){
   if(actual!==null)return {ok:false};
   let timer,expired=false;
   const physical=Promise.resolve().then(call);actual=physical;
   const completion=physical.then(value=>{if(expired||!allow()){dispose(value);return {ok:false};}return {ok:true,value};},()=>({ok:false})).finally(()=>{if(actual===physical)actual=null;});
   try{
    const result=await Promise.race([completion,new Promise(resolve=>{timer=setTimeout(()=>{expired=true;resolve({ok:false});},limit);})]);
    if(result.ok&&!allow()){dispose(result.value);return {ok:false};}return result;
   }finally{clearTimeout(timer);}
  }
 });
}
export async function runSlotControls(data){
 if(data?.checks!==5||data.observationLimitMsForSynthetic!==1||data.normalObservationLimitMs!==1000)throw Error('SLOT_CONTROL_INVALID');
 const check=v=>{if(!v)throw Error('SLOT_CONTROL_INVALID');};
 const slot=createObservationSlot();let resolve,launches=0,disposed=0;
 const pending=new Promise(r=>{resolve=r;});const first=await slot.read(()=>{launches++;return pending;},()=>true,1);
 check(!first.ok&&slot.busy()&&launches===1);
 const second=await slot.read(()=>{launches++;return true;},()=>true,1);check(!second.ok&&slot.busy()&&launches===1);
 resolve({[Symbol.dispose](){disposed++;}});await new Promise(resolve=>setImmediate(resolve));check(!slot.busy()&&disposed===1);
 const fresh=await slot.read(()=>{launches++;return 'SYN';},()=>true,1000);check(fresh.ok&&fresh.value==='SYN'&&launches===2);
 let finish,allowed=true,lateDisposed=0;const last=slot.read(()=>new Promise(r=>{finish=r;}),()=>allowed,1000);
 await new Promise(resolve=>setImmediate(resolve));allowed=false;finish({[Symbol.dispose](){lateDisposed++;}});
 const stopped=await last;check(!stopped.ok&&!slot.busy()&&lateDisposed===1);return 5;
}
