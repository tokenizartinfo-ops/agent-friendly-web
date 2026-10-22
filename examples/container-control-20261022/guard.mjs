const PLAN='afw-container-control-20261022-v1';
const CASES=new Set(['0907','0929']);
export function controlConfig(env, now, instanceId) {
 if (!env || env.AFW_CONTROL_ENABLED!=='true' || env.AFW_CONTROL_PLAN!==PLAN ||
     !CASES.has(env.AFW_CONTROL_CASE) || instanceId!=='afw-20261022-'+env.AFW_CONTROL_CASE ||
     !Number.isSafeInteger(now) || now<0) return null;
 const digits=/^[1-9][0-9]{0,9}$/;
 if(!digits.test(env.AFW_CONTROL_START)||!digits.test(env.AFW_CONTROL_END))return null;
 const start=Number(env.AFW_CONTROL_START)*1000,end=Number(env.AFW_CONTROL_END)*1000;
 if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||end<=start||end-start>1200000||
    now<start||now>=end||end-now<75000)return null;
 return Object.freeze({planId:PLAN,caseName:env.AFW_CONTROL_CASE,instanceId,start,end});
}
export function sameControlPlan(stored, config) {
 if(!stored||typeof stored!=='object'||Array.isArray(stored))return false;
 const proto=Object.getPrototypeOf(stored);if(proto!==Object.prototype&&proto!==null)return false;
 const ds=Object.getOwnPropertyDescriptors(stored),keys=Reflect.ownKeys(ds);
 if(keys.length!==3||!keys.every(k=>['planId','start','end'].includes(k)&&'value'in ds[k]&&ds[k].enumerable))return false;
 return ds.planId.value===config.planId&&ds.start.value===config.start&&ds.end.value===config.end;
}
export function verifyControlResponse(text, caseName) {
 if(!CASES.has(caseName)||typeof text!=='string'||new TextEncoder().encode(text).byteLength>512)return false;
 try {const v=JSON.parse(text);return v!==null&&typeof v==='object'&&!Array.isArray(v)&&
   Object.keys(v).length===2&&v.marker===PLAN&&v.caseName===caseName;
 }catch{return false;}
}
