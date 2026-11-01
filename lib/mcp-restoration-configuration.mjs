import {createHash} from 'node:crypto';
const CONFIG=['compatibility_date','compatibility_flags','main_module','containers','exports','limits','placement','usage_model','cache_options','assets','package_dependencies'];
const fail=()=>{throw Error('Successor canary restoration unavailable');};
const hash=x=>createHash('sha256').update(x).digest('hex');
function fields(v,keys,strict=true){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||strict&&Reflect.ownKeys(v).length!==keys.length)fail();
 const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);
}
function data(value){
 let bytes=0,nodes=0;
 const copy=(v,depth)=>{
  if(++nodes>20000||depth>24)fail();
  if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return v;
  if(typeof v==='string'){bytes+=Buffer.byteLength(v);if(bytes>6291456)fail();return v;}
  if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(Array.isArray(v)?Array.prototype:Object.prototype))fail();
  const out=Array.isArray(v)?[]:{},keys=Reflect.ownKeys(v);
  if(Array.isArray(v)&&Object.keys(v).length!==v.length)fail();
  for(const k of keys){if(Array.isArray(v)&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(v,k);if(typeof k!=='string'||['__proto__','toJSON','constructor'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value'))fail();Object.defineProperty(out,k,{value:copy(d.value,depth+1),enumerable:true});}
  return Object.freeze(out);
 };return copy(value,0);
}
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
function configurationHash(v){
 if(!Array.isArray(v.bindings))fail();const c={};for(const k of CONFIG)if(Object.hasOwn(v,k))c[k]=v[k];
 c.bindings=[...v.bindings].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0);
 return hash('afw.canary-restoration-configuration.v1\n'+canonical(c));
}
/** Fingerprint only, never approval or authority. Does not inspect secret values. */
export function restorationConfigurationHash(metadata){
 const v=fields(metadata,[...CONFIG.filter(k=>Object.hasOwn(metadata??{},k)),'bindings'],false);
 return configurationHash(data(v));
}
