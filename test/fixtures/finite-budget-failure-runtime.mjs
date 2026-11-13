import {types} from 'node:util';
import {AssertionError} from 'node:assert/strict';
import process from 'node:process';

// First trusted Source dependency; pre-capture arbitrary code is outside this contract.
const globalObject=globalThis,descriptor=Object.getOwnPropertyDescriptor,prototype=Object.getPrototypeOf,own=Object.hasOwn,apply=Reflect.apply;
const isProxy=types.isProxy,isNativeError=types.isNativeError,isArray=Array.isArray,byteLength=Buffer.byteLength;
const objectPrototype=Object.prototype;
function sameDescriptor(a,b){
 if(!a||!b)return a===b;
 for(const key of ['value','writable','get','set','enumerable','configurable']){if(own(a,key)!==own(b,key))return false;if(own(a,key)&&a[key]!==b[key])return false;}
 return true;
}
function data(value){return value&&own(value,'value');}
function bounded(value){return typeof value==='string'&&value.length<=65536&&byteLength(value,'utf8')<=65536;}
function startupAllowed(){
 if(process.versions.node!=='22.23.4')return false;
 const env=descriptor(process,'env'),args=descriptor(process,'execArgv');
 if(!data(env)||!env.value||isProxy(env.value)||!data(args)||!isArray(args.value)||isProxy(args.value))return false;
 const option=descriptor(env.value,'NODE_OPTIONS');if(option&&(!data(option)||(option.value!==undefined&&option.value!=='')))return false;
 const length=descriptor(args.value,'length');if(!data(length)||!Number.isSafeInteger(length.value)||length.value>16)return false;
 for(let index=0;index<length.value;index++){const entry=descriptor(args.value,String(index));if(!data(entry)||!['--experimental-vm-modules','--test','--test-reporter=tap','--input-type=module'].includes(entry.value))return false;}
 return true;
}
function capture(){
 try{
  if(!startupAllowed())return null;
  const globalError=descriptor(globalObject,'Error');if(!data(globalError)||typeof globalError.value!=='function'||isProxy(globalError.value))return null;
  const ErrorConstructor=globalError.value,errorPrototypeProperty=descriptor(ErrorConstructor,'prototype'),assertionPrototypeProperty=descriptor(AssertionError,'prototype');
  if(!data(errorPrototypeProperty)||!data(assertionPrototypeProperty))return null;
  const errorPrototype=errorPrototypeProperty.value,assertionPrototype=assertionPrototypeProperty.value;
  if(!errorPrototype||!assertionPrototype||isProxy(errorPrototype)||isProxy(assertionPrototype)||prototype(errorPrototype)!==objectPrototype||prototype(assertionPrototype)!==errorPrototype)return null;
  const constructors=[];for(let cursor=ErrorConstructor;cursor!==null;cursor=prototype(cursor)){
   if(isProxy(cursor))return null;const formatting=descriptor(cursor,'prepareStackTrace');
   if(cursor===ErrorConstructor){if(!data(formatting)||typeof formatting.value!=='function'||isProxy(formatting.value)||formatting.enumerable||!formatting.writable||!formatting.configurable)return null;}
   else if(formatting)return null;
   constructors.push({object:cursor,parent:prototype(cursor),formatting});
  }
  const limit=descriptor(ErrorConstructor,'stackTraceLimit');if(!data(limit)||typeof limit.value!=='number'||!Number.isFinite(limit.value))return null;
  const keys=['name','message','toString','constructor','code',Symbol.toStringTag],prototypes=[];
  for(const object of [errorPrototype,assertionPrototype,objectPrototype]){
   if(isProxy(object))return null;const fields=keys.map(key=>[key,descriptor(object,key)]);
   for(const [key,value]of fields){if(!value)continue;if(key===Symbol.toStringTag||!data(value))return null;if((key==='name'||key==='message'||key==='code')&&value.value!==undefined&&!bounded(value.value))return null;if((key==='toString'||key==='constructor')&&(typeof value.value!=='function'||isProxy(value.value)))return null;}
   prototypes.push({object,parent:prototype(object),fields});
  }
  const sample=new ErrorConstructor();if(!isNativeError(sample)||isProxy(sample))return null;
  const stack=descriptor(sample,'stack');if(!stack||data(stack)||typeof stack.get!=='function'||typeof stack.set!=='function'||isProxy(stack.get)||isProxy(stack.set))return null;
  return {globalError,ErrorConstructor,errorPrototype,assertionPrototype,errorPrototypeProperty,assertionPrototypeProperty,constructors,prototypes,limit,stack};
 }catch{return null;}
}
const trusted=capture();
export function readNativeStack(error){
 try{
  if(!trusted||!startupAllowed()||!sameDescriptor(descriptor(globalObject,'Error'),trusted.globalError))throw null;
  if(error===null||typeof error!=='object'||isProxy(error)||!isNativeError(error))throw null;
  if(!sameDescriptor(descriptor(trusted.ErrorConstructor,'prototype'),trusted.errorPrototypeProperty)||!sameDescriptor(descriptor(AssertionError,'prototype'),trusted.assertionPrototypeProperty)||!sameDescriptor(descriptor(trusted.ErrorConstructor,'stackTraceLimit'),trusted.limit))throw null;
  const parent=prototype(error);if(parent!==trusted.errorPrototype&&parent!==trusted.assertionPrototype)throw null;
  for(const entry of trusted.constructors)if(isProxy(entry.object)||prototype(entry.object)!==entry.parent||!sameDescriptor(descriptor(entry.object,'prepareStackTrace'),entry.formatting))throw null;
  for(const entry of trusted.prototypes){
   if(isProxy(entry.object)||prototype(entry.object)!==entry.parent)throw null;
   for(const [key,value]of entry.fields)if(!sameDescriptor(descriptor(entry.object,key),value))throw null;
  }
  for(const key of ['name','message','code']){
   const value=descriptor(error,key);if(value&&(!data(value)||(value.value!==undefined&&!bounded(value.value))))throw null;
  }
  for(const key of ['toString','constructor',Symbol.toStringTag])if(descriptor(error,key))throw null;
  const stack=descriptor(error,'stack');if(!sameDescriptor(stack,trusted.stack))throw null;
  const text=apply(trusted.stack.get,error,[]);if(!bounded(text))throw null;return text;
 }catch{throw null;}
}
