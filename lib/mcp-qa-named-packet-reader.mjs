const fail=()=>{throw Error('Private QA packet read unavailable');};
const SQL='SELECT packet_json FROM afw_qa_named_packets_v1 WHERE generation_plan_hash=? LIMIT 1';
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const hex=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v);
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);
}
/** Internal data grammar only; never an authority or public response. */
export function decodePrivateQaNamedDataPacket(raw){
 if(typeof raw!=='string'||raw.length>65536||new TextEncoder().encode(raw).length>65536)fail();
 const p=fields(JSON.parse(raw),['purpose','generationCapsule','namedPolicy','closurePolicy','cancellationHistory']);
 if(p.purpose!=='afw.qa-named-data-packet.v1'||['generationCapsule','namedPolicy','closurePolicy','cancellationHistory'].some(k=>typeof p[k]!=='string'||!p[k].length)||JSON.stringify(p)!==raw)fail();
 return p;
}
function packet(raw){decodePrivateQaNamedDataPacket(raw);return raw;}
/** PRIVATE INTERNAL raw-data reader, not a public RPC response or authority.
 * Envelope grammar is not semantic bundle/grant validation. The fixed future
 * assembler must validate every commitment and emit only sanitized metadata.
 * db must be the explicitly preserved isolated QA_DB, never dossier fallback.
 * One fixed SELECT; no write, install, retry, provider or credential surface. */
export function createPrivateQaNamedPacketReader(options){
 const keys=['db','now','timeoutMs'],pinned=fields(options,keys),{db,now,timeoutMs}=pinned,ordinaryPrepare=db?.prepare,withSession=db?.withSession;
 if(typeof ordinaryPrepare!=='function'||typeof withSession!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 async function read(args){
  if(args.length!==2||!hex(args[0])||!(args[1] instanceof AbortSignal)||args[1].aborted)return null;
  const [generationPlanHash,parent]=args;let finished=false,timer,onAbort,readCurrent=()=>{};
  try{
   const entered=now(),origin=performance.now();let lastWall=entered,lastMono=origin;
   if(!time(entered)||entered+timeoutMs>8640000000000000||!Number.isFinite(origin)||origin<0)fail();
   const current=()=>{
    const at=now(),mono=performance.now();if(finished||parent.aborted||!time(at)||at<lastWall||at>=entered+timeoutMs||!Number.isFinite(mono)||mono<lastMono||mono>=origin+timeoutMs)fail();
    const value=fields(options,keys);if(keys.some(k=>value[k]!==pinned[k])||db.prepare!==ordinaryPrepare||db.withSession!==withSession)fail();
    readCurrent();lastWall=at;lastMono=mono;return at;
   };
   const work=async()=>{try{
    current();const session=Reflect.apply(withSession,db,['first-primary']),prepare=session?.prepare;if(typeof prepare!=='function')fail();current();
    const statement=Reflect.apply(prepare,session,[SQL]),bind=statement?.bind;if(typeof bind!=='function')fail();current();
    const bound=Reflect.apply(bind,statement,[generationPlanHash]),first=bound?.first;if(typeof first!=='function')fail();
    readCurrent=()=>{if(session.prepare!==prepare||statement.bind!==bind||bound.first!==first)fail();};current();
    const row=await Reflect.apply(first,bound,[]);current();const result=packet(fields(row,['packet_json']).packet_json);current();return result;
   }catch{return null;}};
   const stopped=new Promise(resolve=>{
    onAbort=()=>{finished=true;resolve(null);};parent.addEventListener('abort',onAbort,{once:true});
    timer=setTimeout(onAbort,Math.max(1,Math.floor(timeoutMs-(performance.now()-origin))));
   });
   const result=await Promise.race([stopped,work()]);current();return result;
  }catch{return null;}finally{finished=true;clearTimeout(timer);if(onAbort)parent.removeEventListener('abort',onAbort);}
 }
 return Object.freeze({read(...args){return read(args);}});
}
