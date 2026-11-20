import {DurableObject} from 'cloudflare:workers';
import {createFiniteOwnerNativeReceiver} from '../../lib/mcp-qa-finite-owner-native-receiver.mjs';
// SYN observations are bounded booleans/counts only, never credentials/body.
export class NativeReceiverFixture extends DurableObject{
 constructor(ctx,env){super(ctx,env);this.observed={receiverEntered:0,receiverAborted:false,beforeGuardAborted:null,held:false,readReturned:false,readCancelled:false,settled:false,privateHeaders:[],callerHeader:false,businessRows:0};}
 async hold(){this.heldMode=true;}
 async release(){this.releaseRead?.();}
 async reset(){this.heldMode=false;this.releaseRead?.();this.observed={receiverEntered:0,receiverAborted:false,beforeGuardAborted:null,held:false,readReturned:false,readCancelled:false,settled:false,privateHeaders:[],callerHeader:false,businessRows:0};}
 async state(){return {...this.observed,businessRows:(await this.ctx.storage.list()).size};}
 async fetch(request){
  const seen=this.observed;seen.receiverEntered++;seen.privateHeaders=[...request.headers.keys()].filter(k=>k.startsWith('x-afw-finite-')).sort();seen.callerHeader=request.headers.has('X-Caller-Arbitrary');
  seen.receiverAborted=request.signal.aborted;request.signal.addEventListener('abort',()=>{seen.receiverAborted=true;},{once:true});
  seen.originalMethod=request.headers.get('x-afw-finite-original-method');seen.originalUrl=request.headers.get('x-afw-finite-original-url');
  seen.version=request.headers.get('x-afw-finite-version');try{seen.boundaryValid=Number.isSafeInteger(JSON.parse(request.headers.get('x-afw-finite-boundary')).remainingMs);}catch{seen.boundaryValid=false;}
  if(this.heldMode&&request.body){
   // Hold the actual native read's settlement, not a replacement signal.
   const stream=request.body,getReader=stream.getReader;
   stream.getReader=()=>{
    const reader=Reflect.apply(getReader,stream,[]),read=reader.read,cancel=reader.cancel;let once=false;
    reader.cancel=(...args)=>{seen.readCancelled=true;return Reflect.apply(cancel,reader,args);};
    reader.read=async()=>{
     const value=await Reflect.apply(read,reader,[]);
     if(!once){once=true;seen.held=true;await new Promise(resolve=>{this.releaseRead=resolve;});}
     seen.readReturned=true;seen.beforeGuardAborted=request.signal.aborted;return value;
    };return reader;
   };
  }
  try{return await createFiniteOwnerNativeReceiver({ctx:this.ctx,env:this.env}).fetch(request);}
  finally{seen.settled=true;}
 }
}
export default {fetch(){return new Response(null,{status:404});}};
