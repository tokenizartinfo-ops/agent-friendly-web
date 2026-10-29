import {createHash} from 'node:crypto';
const fail=()=>{throw Error('Private prepared dispatch unavailable');};
const sha=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x),time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
export function parsePrivatePreparedDispatchPolicy(raw,{closure,closurePolicyHash,withdrawalPolicyHash,dispatchPolicyHash}){
 if(typeof raw!=='string'||raw.length>1024||!sha(dispatchPolicyHash)||createHash('sha256').update(raw).digest('hex')!==dispatchPolicyHash)fail();
 const p=JSON.parse(raw),keys=['purpose','eventId','dispatchAt','expiresAt','closurePolicyHash','withdrawalPolicyHash'];
 if(!p||Object.getPrototypeOf(p)!==Object.prototype||Object.keys(p).length!==keys.length||keys.some(k=>!Object.hasOwn(p,k))||
 p.purpose!=='afw.private-prepared-dispatch.v1'||!sha(p.eventId)||!sha(p.closurePolicyHash)||!sha(p.withdrawalPolicyHash)||
 p.closurePolicyHash!==closurePolicyHash||p.withdrawalPolicyHash!==withdrawalPolicyHash||
 !time(p.dispatchAt)||!time(p.expiresAt)||p.dispatchAt%60000!==0||p.expiresAt<=p.dispatchAt||p.expiresAt-p.dispatchAt>30000||
 p.dispatchAt<closure.startAt-600000||p.expiresAt>closure.startAt)fail();
 return Object.freeze(p);
}
