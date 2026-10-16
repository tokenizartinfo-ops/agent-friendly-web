const className='AfwOwnEventNode',containerName='agent-friendly-web-delegated-canary-afwowneventnode';
const fail=()=>{throw Error('Own Worker execution metadata unavailable');};
function exact(value,keys){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)fail();
 const out={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(value,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[key]=d.value;}return out;
}
/** Only the dated own-canary declarations. No app creation, migration,
 * namespace replacement or runtime boot. Missing attachment stays missing. */
export function snapshotOwnWorkerExecution({exports:map,containers=[]}){
 const named=map&&Reflect.ownKeys(map).length===3;
 const entries=exact(map,named?['default','AfwNodeControl',className]:[className]);
 const linked=Object.hasOwn(entries[className]??{},'container');
 const node=exact(entries[className],linked?['type','storage','container']:['type','storage']);if(node.type!=='durable-object'||node.storage!=='sqlite'||linked&&node.container!==containerName)fail();
 const result={};for(const [name,entry] of Object.entries(entries)){
  if(name===className)result[name]=Object.freeze(node);
  else{const worker=exact(entry,['type']);if(worker.type!=='worker')fail();result[name]=Object.freeze(worker);}
 }
 if(!Array.isArray(containers)||containers.length>1)fail();
 if(linked&&containers.length!==1)fail();
 let attached=[];if(containers.length){
  const raw=containers[0],entry=exact(raw,Object.hasOwn(raw??{},'name')?['class_name','name']:['class_name']);
  if(entry.class_name!==className||Object.hasOwn(entry,'name')&&entry.name!==containerName)fail();
  attached=[Object.freeze({class_name:className,name:containerName})];
 }
 return Object.freeze({exports:Object.freeze(result),containers:Object.freeze(attached)});
}
