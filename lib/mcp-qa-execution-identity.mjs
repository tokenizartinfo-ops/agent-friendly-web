const unavailable=()=>{throw Error('Private QA execution pin unavailable');};
const uuid=value=>typeof value==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value);
const keys=['env','expectedVersionId','sourceRevision','context'];
function optionsData(value){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)unavailable();
 const out={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(value,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))unavailable();out[key]=d.value;}
 return Object.freeze(out);
}
function data(object,key){
 if(!object||typeof object!=='object'||Array.isArray(object))unavailable();
 const d=Object.getOwnPropertyDescriptor(object,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))unavailable();return d.value;
}
/** Pure local coherence check, not provenance or authority.
 * Host must separately correlate QA source/module/config and native binding type.
 * sourceRevision is the QA code revision, never the frozen canary revision. */
export function createPrivateQaExecutionPin(options){
 const pinned=optionsData(options);
 if(!uuid(pinned.expectedVersionId)||typeof pinned.sourceRevision!=='string'||!/^[a-f0-9]{40}$/.test(pinned.sourceRevision)||!['workflow','durable_object'].includes(pinned.context))unavailable();
 const metadata=data(pinned.env,'AFW_QA_VERSION'),version=data(metadata,'id');
 if(!uuid(version)||version!==pinned.expectedVersionId)unavailable();
 let invalidated=false;
 const assertCurrent=()=>{
  try{
   if(invalidated)unavailable();
   const current=optionsData(options);
   if(keys.some(key=>current[key]!==pinned[key])||data(pinned.env,'AFW_QA_VERSION')!==metadata||data(metadata,'id')!==version)unavailable();
  }catch{invalidated=true;unavailable();}
  // Deliberately void: this function cannot substitute for authorize -> true.
 };
 assertCurrent();
 return Object.freeze({assertCurrent,snapshot(){
  assertCurrent();
  return Object.freeze({purpose:'afw.qa-execution-pin.v1',runtimeVersionId:version,sourceRevision:pinned.sourceRevision,context:pinned.context,authorizesEffects:false,operationalReadiness:false});
 }});
}
