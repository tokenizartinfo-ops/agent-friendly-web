const fail=()=>{throw Error('Private permission withdrawal unavailable');};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[0-9a-f]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const fields=(v,keys)=>{
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 const out={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(v,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[key]=d.value;}return out;
};
/** Shared exact grammar only: parsing creates no authority or current-state proof. */
export function parseOwnPermissionWithdrawalPolicy(raw){
 try{
  if(typeof raw!=='string'||raw.length>4096)fail();
  const p=fields(JSON.parse(raw),['purpose','requestId','startAt','expiresAt','originalConsent','containerId','programHash','sourceRevision']);
  const c=fields(p.originalConsent,['sequence','revision','issuedAt','expiresAt']);
  if(p.purpose!=='afw.private-permission-withdrawal.v1'||typeof p.requestId!=='string'||! /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(p.requestId)||
   !hex(p.containerId,64)||!hex(p.programHash,64)||!hex(p.sourceRevision,40)||
   !time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||
   !Number.isSafeInteger(c.sequence)||c.sequence<1||!Number.isSafeInteger(c.revision)||c.revision<1||
   !time(c.issuedAt)||!time(c.expiresAt)||c.expiresAt<=c.issuedAt)fail();
  return Object.freeze({...p,originalConsent:Object.freeze(c)});
 }catch{fail();}
}
