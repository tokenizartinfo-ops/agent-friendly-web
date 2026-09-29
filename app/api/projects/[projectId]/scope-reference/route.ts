import {env} from 'cloudflare:workers';
import {getCloudflareAccessUser} from '../../../../cloudflare-access-auth';
import {readScopeReference,saveScopeReference} from '../../../../../lib/scope-reference.mjs';

type Context={params:Promise<{projectId:string}>};
const headers={'cache-control':'no-store'};
const reply=(value:{status:number})=>Response.json(value,{status:value.status,headers});
export async function GET(_request:Request,context:Context){
 const user=await getCloudflareAccessUser();
 if(!user)return reply({status:401});
 try{return reply(await readScopeReference(env.DB,user.userId,(await context.params).projectId));}
 catch{return reply({status:503});}
}
export async function POST(request:Request,context:Context){
 const user=await getCloudflareAccessUser();
 if(!user)return reply({status:401});
 const origin=request.headers.get('origin');
 if((origin&&origin!==new URL(request.url).origin)||request.headers.get('content-type')?.split(';')[0].trim()!=='application/json')return reply({status:403});
 let raw:unknown;
 try{
  const reader=request.body?.getReader();if(!reader)return reply({status:400});
  const chunks:Uint8Array[]=[];let length=0;
  while(true){const {value,done}=await reader.read();if(done)break;length+=value.byteLength;if(length>24576){await reader.cancel();return reply({status:413});}chunks.push(value);}
  const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  raw=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
 }catch{return reply({status:400});}
 try{return reply(await saveScopeReference(env.DB,user.userId,(await context.params).projectId,raw));}
 catch{return reply({status:503});}
}
