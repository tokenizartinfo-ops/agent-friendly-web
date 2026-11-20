import {finiteLauncherInstanceId,validateFiniteLaunchPolicy} from './mcp-qa-finite-launch-records.mjs';
import {createHash} from 'node:crypto';
export const finiteHash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
export const finiteHex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
export const finiteTime=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
export function finiteFields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)throw Error('Finite evidence unavailable');const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))throw Error('Finite evidence unavailable');out[k]=d.value;}return Object.freeze(out);}
export function finiteData(value,depth=0,budget={n:0}){
 if(++budget.n>2048||depth>12)throw Error('Finite evidence unavailable');
 if(value===null||typeof value==='boolean'||typeof value==='number'&&Number.isFinite(value))return value;
 if(typeof value==='string'){if(Buffer.byteLength(value)>32768)throw Error('Finite evidence unavailable');return value;}
 if(!value||typeof value!=='object'||Object.getPrototypeOf(value)!==(Array.isArray(value)?Array.prototype:Object.prototype))throw Error('Finite evidence unavailable');
 const result=Array.isArray(value)?[]:{};
 for(const k of Reflect.ownKeys(value)){if(Array.isArray(value)&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(value,k);if(typeof k!=='string'||['__proto__','constructor','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value'))throw Error('Finite evidence unavailable');result[k]=finiteData(d.value,depth+1,budget);}
 if(Array.isArray(value)&&(value.length!==result.length||Object.keys(result).length!==result.length))throw Error('Finite evidence unavailable');
 if(depth===0&&Buffer.byteLength(JSON.stringify(result))>32768)throw Error('Finite evidence unavailable');return Object.freeze(result);
}
export const finiteSame=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export function finiteControlIdentity(control){
 const c=finiteFields(finiteData(control),['plan','planHash','controlHash']);
 if(!finiteHex(c.planHash)||!finiteHex(c.controlHash)||!c.plan||typeof c.plan!=='object')throw Error('Finite control unavailable');
 const p=c.plan;
 if(p.purpose!=='afw.qa-finite-trial-plan.v1'||!finiteTime(p.T0)||p.N1!==p.T0+300000||p.C0!==p.N1-60000||p.C1!==p.N1+120000||p.R1!==p.N1+180000||typeof p.intentId!=='string'||!p.resources||!p.canaryContainment||!p.selectors)throw Error('Finite control unavailable');
 validateFiniteLaunchPolicy({T0:p.T0,launchPolicy:p.launchPolicy});
 const workflows=finiteFields(p.workflows,['confirmation','bootstrap','launcher']);
 if(workflows.confirmation!=='afw-release-'+p.bundleHash||workflows.launcher!==finiteLauncherInstanceId({intentId:p.intentId,sourceRevision:p.source.revision})||workflows.bootstrap===workflows.launcher)throw Error('Finite control unavailable');
 const actual=createHash('sha256').update(p.purpose+'\n'+JSON.stringify(p)).digest('hex');if(actual!==c.planHash)throw Error('Finite control unavailable');
 return c;
}
