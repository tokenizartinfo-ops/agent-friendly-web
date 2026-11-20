import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
import {finiteNativeFailure as fail} from './mcp-qa-finite-owner-native-wire.mjs';
// Retain actual read and cancellation, including work after the HTTP race fails.
export async function readFiniteOwnerNoticeConsentBody(message,check,firstFailure){
 const reader=message.body?.getReader();if(!reader){check();return new Uint8Array();}
 const chunks=[];let size=0;
 try{
  check();
  for(;;){
   const {done,value}=await retain(reader.read());check();if(done)break;
   if(!(value instanceof Uint8Array)||(size+=value.length)>1024)fail(413);
   chunks.push(value);
  }
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  new TextDecoder('utf-8',{fatal:true}).decode(bytes);check();return bytes;
 }catch(error){firstFailure(error);try{await retain(reader.cancel());}catch{}throw error;}
}
