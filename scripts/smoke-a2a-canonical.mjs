import https from 'node:https';
import assert from 'node:assert/strict';
import {createInterface} from 'node:readline';
import {mkdir,writeFile} from 'node:fs/promises';
const origin='https://a2a-canary.agentfriendlyweb.dev';
const agent=new https.Agent({keepAlive:true,maxSockets:1,maxFreeSockets:1,timeout:60000});
const receipts=[];
function call(path,{method='GET',body,version='1.0'}={}){
 return new Promise((resolve,reject)=>{
  const request=https.request(origin+path,{agent,method,headers:{'content-type':'application/json','a2a-version':version}},response=>{
   const chunks=[];response.on('data',chunk=>chunks.push(chunk));response.on('end',()=>{const text=Buffer.concat(chunks).toString();let result;try{result=JSON.parse(text);}catch{}resolve({status:response.statusCode,text,result,headers:response.headers});});
  });request.on('error',reject);request.setTimeout(25000,()=>request.destroy(Error('Client timeout')));request.end(body?JSON.stringify(body):undefined);
 });
}
const input=url=>({jsonrpc:'2.0',id:1,method:'SendMessage',params:{message:{messageId:'canonical-client',role:'ROLE_USER',parts:[{data:{url,locale:'es'}}]}}});
const trace=await call('/cdn-cgi/trace');const ip=trace.text.split('\n').find(line=>line.startsWith('ip='))?.slice(3);assert.ok(ip);console.log(JSON.stringify({phase:'source-ready',ip}));
const rl=createInterface({input:process.stdin});await new Promise(resolve=>rl.once('line',resolve));rl.close();
let exitCode=0;
try{
 let ready;const deadline=Date.now()+30000;
 do{ready=await call('/a2a',{method:'POST',body:input('http://127.0.0.1')});if(ready.result?.error?.code===-32602)break;await new Promise(resolve=>setTimeout(resolve,1000));}while(Date.now()<deadline);
 receipts.push({check:'private-target',status:ready.status,result:ready.result});assert.equal(ready.result?.error?.code,-32602);
 const incompatible=await call('/a2a',{method:'POST',body:input('https://agentfriendlyweb.dev'),version:'0.3'});receipts.push({check:'version',status:incompatible.status,result:incompatible.result});assert.equal(incompatible.result?.error?.code,-32009);
 const live=await call('/a2a',{method:'POST',body:input('https://agentfriendlyweb.dev')});receipts.push({check:'live',status:live.status,cache:live.headers['cache-control'],result:live.result});assert.equal(live.result?.result?.message?.role,'ROLE_AGENT');const data=live.result.result.message.parts[0].data;assert.equal(data.publicationAuthorized,false);assert.equal(data.audit.probes.length,15);
 const burst=[];let denied;for(let i=0;i<12;i++){denied=await call('/a2a',{method:'POST',body:input('http://127.0.0.1')});burst.push(denied.status);if(denied.status===429)break;}assert.equal(denied.status,429);receipts.push({check:'rate-limit',statuses:burst,bodyBytes:denied.text.length,retryAfter:denied.headers['retry-after']});
 console.log(JSON.stringify({accepted:true,origin,checkedAt:data.audit.checkedAt,successfulProbes:data.audit.probes.filter(p=>p.status===200).length,rateStatuses:burst}));
}catch(error){exitCode=1;console.log(JSON.stringify({accepted:false,error:error.message,checks:receipts.map(r=>({check:r.check,status:r.status,code:r.result?.error?.code}))}));}
finally{agent.destroy();await mkdir('output/a2a-canary',{recursive:true});await writeFile('output/a2a-canary/canonical-receipts.json',JSON.stringify(receipts,null,2));}
process.exitCode=exitCode;
