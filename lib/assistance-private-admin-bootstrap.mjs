import {snapshotOperatorOriginals} from './assistance-private-qa-preregistration.mjs';
const result=state=>({contract:'afw-private-admin-bootstrap/v1',state});
const exact=(v,keys)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return d?.enumerable&&Object.hasOwn(d,'value');});
/** Control-plane-only Workflow composition. No HTTP mount, retry, approval,
 * installation or resource reservation. An uncertain result stays unavailable.
 */
export function createPrivateAdminBootstrap({readControl,register,readRegistered,appendOriginals,readOriginals,now=Date.now}={}){
 return Object.freeze({async run(params,step){try{
  // REST instance API preserves a JSON-encoded string; SDK passes an object.
  if(typeof params==='string'){const length=params.length;if(length>8192)return result('unavailable');params=JSON.parse(params);if(length>256&&params?.operation!=='originals')return result('unavailable');}
  const original=exact(params,['operation','recordRef','expectedSequence','originals'])&&params.operation==='originals'&&params.expectedSequence===0;
  if(!(original||exact(params,['operation','recordRef'])&&params.operation==='register')||typeof params.recordRef!=='string'||!/^[0-9a-f]{64}$/.test(params.recordRef)||typeof readControl!=='function'||(original?(typeof appendOriginals!=='function'||typeof readOriginals!=='function'):(typeof register!=='function'||typeof readRegistered!=='function'))||typeof now!=='function'||typeof step?.do!=='function')return result('unavailable');
  params=Object.freeze({operation:params.operation,recordRef:params.recordRef,...(original?{expectedSequence:0,originals:snapshotOperatorOriginals(params.originals)}:{})});
  let last=-1,snapshot;
  const checked=()=>{const t=now(),c=readControl();if(!Number.isSafeInteger(t)||t<0||t<last||!exact(c,['enabled','recordRef','closeAt'])||c.enabled!==true||c.recordRef!==params.recordRef||!Number.isSafeInteger(c.closeAt)||t>=c.closeAt)throw Error('Bootstrap unavailable');last=t;const s=JSON.stringify(c);if(snapshot!==undefined&&s!==snapshot)throw Error('Bootstrap changed');snapshot=s;};
  checked();
  const ok=await step.do(original?'record-prior-administrative-originals':'register-prior-administrative-pins',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'20 seconds'},async()=>{checked();const written=original?await appendOriginals(params.recordRef,0,params.originals):await register(params.recordRef);checked();return written===true;});
  checked();if(ok!==true)return result('unavailable');const active=original?await readOriginals():await readRegistered(params.recordRef);checked();return result(original?(active?.correlation?.state==='observed'&&active.correlation.recordRef===params.recordRef&&JSON.stringify(snapshotOperatorOriginals(active.originals))===JSON.stringify(params.originals)?'originals_recorded':'unavailable'):(active===true?'registered':'unavailable'));
 }catch{return result('unavailable');}}});
}
