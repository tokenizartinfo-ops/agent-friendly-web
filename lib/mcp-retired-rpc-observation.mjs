const fields=['purpose','containerId','processGeneration','programHash','sourceRevision','image','createdAt','expiresAt','closedAt','observedAt','physicalStopVerified','mayStartSuccessor'];
const times=new Set(['createdAt','expiresAt','closedAt','observedAt']);
const booleans=new Set(['physicalStopVerified','mayStartSuccessor']);
const fail=()=>{throw Error('Private retired RPC observation unavailable');};
/** Trusted private RPC boundary ONLY. The native own Symbol.dispose is lifecycle
 * metadata, never domain evidence. Every other key/accessor/capability is denied.
 * Domain identity, timestamps and custody remain the reader's responsibility. */
export function snapshotRetiredRpcObservation(value){
 let dispose;
 try{
  if(!value||typeof value!=='object')fail();
  const lifecycle=Object.getOwnPropertyDescriptor(value,Symbol.dispose);
  if(lifecycle){
   if(!Object.hasOwn(lifecycle,'value')||typeof lifecycle.value!=='function'||lifecycle.enumerable)fail();
   dispose=lifecycle.value;
  }
  if(Object.getPrototypeOf(value)!==Object.prototype)fail();
  const descriptors=Object.getOwnPropertyDescriptors(value),keys=Reflect.ownKeys(descriptors);
  if(keys.length!==fields.length+(lifecycle?1:0)||keys.some(k=>typeof k==='symbol'?k!==Symbol.dispose:!fields.includes(k)))fail();
  const result={};
  for(const key of fields){
   const d=descriptors[key],type=times.has(key)?'number':booleans.has(key)?'boolean':'string';
   if(!d?.enumerable||!Object.hasOwn(d,'value')||typeof d.value!==type)fail();
   result[key]=d.value;
  }
  return Object.freeze(result);
 }finally{
  // Synchronous native lifecycle cleanup; an exception prevents acceptance.
  if(dispose)dispose.call(value);
 }
}
