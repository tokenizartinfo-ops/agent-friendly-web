import {createHash} from 'node:crypto';
import {projectFinitePublicConfiguration} from './mcp-qa-finite-profile.mjs';

const ALIAS='AFW_FINITE_OWNER_OAUTH_KV';
const NAMESPACE_ID='6b94ff702e504e14a7730cee73a0f6ff';
const CONFIG=['compatibility_date','compatibility_flags','main_module','usage_model','containers','exports','bindings'];
const fail=()=>{throw Error('Finite owner SDK binding facts unavailable');};
const canonical=v=>Array.isArray(v)?'['+v.map(canonical).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}':JSON.stringify(v);

function own(value){
 let nodes=0,bytes=0;
 function copy(v,depth=0){
  if(++nodes>4096||depth>20)fail();
  if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isSafeInteger(v))return v;
  if(typeof v==='string'){bytes+=Buffer.byteLength(v);if(bytes>262144)fail();return v;}
  const array=Array.isArray(v);
  if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(array?Array.prototype:Object.prototype))fail();
  const keys=Reflect.ownKeys(v),out=array?[]:{};
  if(array&&(v.length>1024||keys.length!==v.length+1))fail();
  for(const k of keys){
   if(array&&k==='length')continue;
   const d=Object.getOwnPropertyDescriptor(v,k);
   if(typeof k!=='string'||['__proto__','constructor','prototype','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value')||array&&!/^(0|[1-9][0-9]*)$/.test(k))fail();
   out[k]=copy(d.value,depth+1);
  }
  return out;
 }
 return copy(value);
}

/** Exact, bounded source DATA equality. It neither reads provider state nor grants access. */
export function qualifyFiniteOwnerSdkBindingFacts(input){
 const args=own(input);
 if(!args||canonical(Object.keys(args).sort())!=='["mMetadata","qaMetadata"]')fail();
 const qa=projectFinitePublicConfiguration({role:'qaLive',metadata:args.qaMetadata});
 const m=args.mMetadata;
 if(!m||canonical(Object.keys(m).sort())!==canonical([...CONFIG].sort())||!Array.isArray(m.compatibility_flags)||!Array.isArray(m.containers)||!Array.isArray(m.bindings)||!m.bindings.length||typeof m.compatibility_date!=='string'||typeof m.main_module!=='string'||typeof m.usage_model!=='string'||!m.exports||typeof m.exports!=='object')fail();
 const q=qa.bindings.filter(b=>b.name===ALIAS);
 if(q.length!==1||q[0].type!=='kv_namespace'||q[0].namespace_id!==NAMESPACE_ID||qa.bindings.filter(b=>b.type==='kv_namespace').length!==1)fail();
 const names=new Set();let oauth=null;
 for(const b of m.bindings){
  if(!b||typeof b.name!=='string'||!b.name||names.has(b.name))fail();
  names.add(b.name);
  if(b.name==='OAUTH_KV')oauth=b;
  else if(b.type==='kv_namespace'||/OAUTH.*KV|KV.*OAUTH/.test(b.name))fail();
 }
 if(!oauth||canonical(Object.keys(oauth).sort())!=='["name","namespace_id","type"]'||oauth.type!=='kv_namespace'||oauth.namespace_id!==NAMESPACE_ID||oauth.namespace_id!==q[0].namespace_id)fail();
 const fact={alias:ALIAS,namespaceId:NAMESPACE_ID};
 return Object.freeze({...fact,bindingHash:createHash('sha256').update('afw.finite-owner-sdk-binding.v1\n'+canonical(fact)).digest('hex')});
}
