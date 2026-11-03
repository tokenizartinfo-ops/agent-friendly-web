const fail=()=>{throw Error('Independent configuration preservation unavailable');};

// Compare only independently captured, sanitized configuration projections.
// This is a fingerprint comparison, never a provider read or authorization.
function canonical(value){
 let nodes=0,bytes=0;
 function copy(v,depth){
  if(++nodes>20000||depth>24)fail();
  if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return v;
  if(typeof v==='string'){bytes+=Buffer.byteLength(v);if(bytes>6291456)fail();return v;}
  const array=Array.isArray(v);
  if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(array?Array.prototype:Object.prototype))fail();
  const keys=Reflect.ownKeys(v);
  if(array&&Object.keys(v).length!==v.length)fail();
  const out=array?[]:{};
  for(const k of keys.filter(k=>!(array&&k==='length')).sort()){
   if(typeof k!=='string'||['__proto__','constructor','toJSON'].includes(k))fail();
   const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();
   Object.defineProperty(out,k,{value:copy(d.value,depth+1),enumerable:true});
  }
  return out;
 }
 return JSON.stringify(copy(value,0));
}

export function assertIndependentConfigPreserved(options){
 if(!options||Object.getPrototypeOf(options)!==Object.prototype)fail();
 const keys=['activeBefore','settingsBefore','activeAfter','settingsAfter'];
 if(Reflect.ownKeys(options).length!==keys.length)fail();
 const values=keys.map(k=>{const d=Object.getOwnPropertyDescriptor(options,k);if(!d?.enumerable||!Object.hasOwn(d,'value')||!d.value||Object.getPrototypeOf(d.value)!==Object.prototype)fail();return canonical(d.value);});
 if(values[0]!==values[2]||values[1]!==values[3])fail();
}
