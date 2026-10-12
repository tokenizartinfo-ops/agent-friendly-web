import {AsyncLocalStorage} from 'node:async_hooks';
const fail=()=>{throw Error('Invocation storage unavailable');};

/** INTERNAL same-storage composition. Nested callbacks borrow only reads;
 * they never manufacture the exterior transaction's first commit ACK. */
export function createInvocationStorage(original){
 if(typeof original?.transaction!=='function')fail();
 const chain=new AsyncLocalStorage();
 const view=(state,readOnly,isOpen=()=>true)=>Object.freeze({
  async get(key){if(!isOpen()||state.phase!=='callback')fail();return state.tx.get(key);},
  async put(key,value){if(readOnly||!isOpen()||state.phase!=='callback')fail();return state.tx.put(key,value);},
 });
 const storage=Object.freeze({async transaction(fn){
  if(typeof fn!=='function')fail();const parent=chain.getStore();
  if(parent){if(parent.phase!=='callback')fail();let open=true;try{return await fn(view(parent,true,()=>open));}finally{open=false;}}
  const state={phase:'waiting',tx:null};
  return chain.run(state,async()=>{try{return await original.transaction(async tx=>{
   if(typeof tx?.get!=='function'||typeof tx?.put!=='function')fail();state.tx=tx;state.phase='callback';
   try{return await fn(view(state,false));}finally{state.phase='ack';state.tx=null;}
  });}finally{state.phase='closed';state.tx=null;}});
 }});
 return Object.freeze({storage,assertOutside(){if(chain.getStore())fail();}});
}
