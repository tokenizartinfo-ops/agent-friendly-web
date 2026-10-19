const controls=new WeakMap();
const validWall=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const unavailable=()=>new Error('Preparation request unavailable');

/** Server-created request lifetime, not identity or permission. No JSON/header
 * can mint the WeakMap identity. Controls stay in this server module graph.
 */
export function createCapsulePreparationRequestLease({now=()=>Date.now(),monotonic=()=>performance.now(),signal}={}){
 let wall,tick;try{wall=now();tick=monotonic();}catch{throw unavailable();}
 if(!validWall(wall)||wall>8640000000000000-5000||!Number.isFinite(tick)||tick<0)throw unavailable();
 const started=wall,initialMono=tick,notAfter=wall+5000,pending=new Set();
 let closed=false,lastWall=wall,lastMono=tick;
 function close(){
  if(closed)return;closed=true;
  signal?.removeEventListener('abort',close);
  for(const reject of pending)reject(unavailable());pending.clear();
 }
 function check(){
  if(closed)throw unavailable();
  try{
   const wall=now(),mono=monotonic();
   const remaining=Math.min(notAfter-wall,5000-(mono-initialMono));
   if(!validWall(wall)||!Number.isFinite(mono)||wall<lastWall||mono<lastMono||remaining<=0||signal?.aborted)throw unavailable();
   lastWall=wall;lastMono=mono;return {remaining,notAfter,started};
  }catch{close();throw unavailable();}
 }
 async function wait(work){
  const time=check();let timer,rejectWait;
  const stop=new Promise((_,reject)=>{rejectWait=reject;pending.add(reject);timer=setTimeout(close,Math.max(1,Math.floor(time.remaining)));});
  try{
   // Invoke only after checking and arming the original deadline/abort.
   const value=await Promise.race([Promise.resolve().then(()=>{check();return work();}),stop]);
   check();return value;
  }finally{clearTimeout(timer);pending.delete(rejectWait);}
 }
 try{signal?.addEventListener('abort',close,{once:true});check();}
 catch{close();throw unavailable();}
 const lease=Object.freeze({});
 controls.set(lease,Object.freeze({check,wait,close}));return lease;
}
export function readCapsulePreparationRequestLease(value){return controls.get(value)??null;}
