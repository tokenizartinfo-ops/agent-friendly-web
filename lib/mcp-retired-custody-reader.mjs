import {createNodeProcessCustody} from './mcp-node-process-custody.mjs';
const fail=()=>{throw Error('Retired custody unavailable');};
/** Server-only ORIGINAL manifest/context/key; no live runtime is constructed.
 * This facade narrows capability, it does not establish provenance of its inputs. */
export function createRetiredCustodyReader(options){
 const keys=['db','context','projectId','projectionSecret','storage','custodyKey','containerId','programHash','sourceRevision','image','window','now'];
 if(!options||Object.getPrototypeOf(options)!==Object.prototype||Reflect.ownKeys(options).length!==keys.length)fail();
 const o={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(options,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();o[k]=d.value;}
 if(typeof o.storage?.transaction!=='function')fail();
 const storage={transaction:fn=>o.storage.transaction(tx=>fn(Object.freeze({get:key=>tx.get(key)})))};
 const custody=createNodeProcessCustody({...o,storage,enabled:true,runtime:{launch:fail,observe:fail,close:fail}});
 return Object.freeze({observeRetired:()=>custody.observeRetired()});
}
