import https from 'node:https';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const origin='https://a2a.agentfriendlyweb.dev';
const agent=new https.Agent({keepAlive:true,maxSockets:1});
const receipts=[];
function call(url,{method='GET',body,version='1.0'}={}){
 return new Promise((resolve,reject)=>{const req=https.request(url,{agent,method,headers:{'content-type':'application/json','a2a-version':version}},res=>{const chunks=[];res.on('data',c=>chunks.push(c));res.on('end',()=>{const text=Buffer.concat(chunks).toString();let data;try{data=JSON.parse(text);}catch{}resolve({status:res.statusCode,data,cache:res.headers['cache-control'],bytes:text.length,retryAfter:res.headers['retry-after']});});});req.on('error',reject);req.setTimeout(25000,()=>req.destroy(Error('Timeout')));req.end(body?JSON.stringify(body):undefined);});
}
const input=url=>({jsonrpc:'2.0',id:1,method:'SendMessage',params:{message:{messageId:'public-acceptance',role:'ROLE_USER',parts:[{data:{url,locale:'es'}}]}}});
async function rpc(url,version='1.0'){
 const deadline=Date.now()+30000;
 while(true){const r=await call(origin+'/a2a',{method:'POST',body:input(url),version});receipts.push(r);if(r.status===404&&Date.now()<deadline){await new Promise(resolve=>setTimeout(resolve,1000));continue;}return r;}
}
try{
 if(process.argv.includes('--discovery')||process.argv.includes('--apex')){
  const cardUrl=(process.argv.includes('--apex')?'https://agentfriendlyweb.dev':origin)+'/.well-known/agent-card.json';
  let card;const deadline=Date.now()+30000;
  do{card=await call(cardUrl);if(card.status===200)break;await new Promise(resolve=>setTimeout(resolve,1000));}while(Date.now()<deadline);
  assert.equal(card.status,200);assert.equal(card.data.supportedInterfaces[0].url,origin+'/a2a');assert.equal(card.data.supportedInterfaces[0].protocolVersion,'1.0');assert.equal(card.data.capabilities.streaming,false);receipts.push({cardUrl,...card});
 }
 assert.equal((await rpc('http://127.0.0.1')).data?.error?.code,-32602);
 assert.equal((await rpc('https://agentfriendlyweb.dev','0.3')).data?.error?.code,-32009);
 const live=await rpc('https://agentfriendlyweb.dev');assert.equal(live.status,200);assert.equal(live.data?.result?.message?.role,'ROLE_AGENT');const data=live.data.result.message.parts[0].data;assert.equal(data.audit.target,'https://agentfriendlyweb.dev');assert.equal(data.publicationAuthorized,false);assert.equal(data.audit.probes.length,15);assert.equal(live.cache,'no-store');
 const statuses=[];for(let i=0;i<12;i++){const r=await rpc('http://127.0.0.1');statuses.push(r.status);if(r.status===429)break;}assert.ok(statuses.includes(429));
 console.log(JSON.stringify({accepted:true,origin,checkedAt:data.audit.checkedAt,successfulProbes:data.audit.probes.filter(p=>p.status===200).length,rateStatuses:statuses,discovery:process.argv.includes('--discovery'),apex:process.argv.includes('--apex')}));
}finally{agent.destroy();await mkdir('output/a2a-public',{recursive:true});await writeFile('output/a2a-public/'+(process.argv.includes('--apex')?'apex':process.argv.includes('--discovery')?'discovery':'service')+'-receipts.json',JSON.stringify(receipts,null,2));}
