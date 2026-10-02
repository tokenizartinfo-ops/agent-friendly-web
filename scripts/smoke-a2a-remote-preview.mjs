import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.argv[2]||'http://127.0.0.1:8796';
if(!['http://127.0.0.1:8796','http://127.0.0.1:8797','https://a2a-canary.agentfriendlyweb.dev'].includes(base))throw Error('Use the verified AFW test endpoint');
const request=url=>({jsonrpc:'2.0',id:1,method:'SendMessage',params:{message:{messageId:'afw-cloud-smoke',role:'ROLE_USER',parts:[{data:{url,locale:'es'}}]}}});
const receipts=[];
async function rpc(body,version='1.0'){
 const deadline=Date.now()+30000;
 while(true){
  const response=await fetch(`${base}/a2a`,{method:'POST',redirect:'manual',headers:{'content-type':'application/json','a2a-version':version},body:JSON.stringify(body),signal:AbortSignal.timeout(25000)});
  const text=await response.text();
  const result=text&&response.headers.get('content-type')?.includes('application/json')?JSON.parse(text):null;
  receipts.push({at:new Date().toISOString(),status:response.status,bodyBytes:new TextEncoder().encode(text).length,version:response.headers.get('a2a-version'),cache:response.headers.get('cache-control'),result});
  if(response.status===404&&result?.error==='Unavailable'&&Date.now()<deadline){await new Promise(resolve=>setTimeout(resolve,1000));continue;}
  return {response,result};
 }
}
try {
 assert.equal((await fetch(`${base}/.well-known/agent-card.json`)).status,404);
 assert.equal((await fetch(`${base}/a2a`)).status,405);
 assert.equal((await rpc(request('http://127.0.0.1'))).result.error.code,-32602);
 assert.equal((await rpc(request('https://agentfriendlyweb.dev'),'0.3')).result.error.code,-32009);
 const {response,result}=await rpc(request('https://agentfriendlyweb.dev'));
 assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');
 assert.equal(result.result?.message?.role,'ROLE_AGENT',JSON.stringify(result.error));
 const data=result.result.message.parts[0].data;
 assert.equal(data.audit.target,'https://agentfriendlyweb.dev');assert.equal(data.publicationAuthorized,false);assert.equal(data.audit.probes.length,15);
 assert.ok(Date.now()-Date.parse(data.audit.checkedAt)<60000);
 assert.ok(data.audit.probes.some(probe=>probe.status===200),'No successful live probe');
 const statuses=[];for(let i=0;i<5;i++)statuses.push((await rpc(request('http://127.0.0.1'))).response.status);
 assert.ok(statuses.includes(429),'Live limiter did not reject the burst');
 console.log(JSON.stringify({verifiedAt:new Date().toISOString(),transport:base.startsWith('https:')?'Canonical Cloudflare canary HTTPS':'Wrangler remote preview through private loopback',target:data.audit.target,checkedAt:data.audit.checkedAt,successfulProbes:data.audit.probes.filter(p=>p.status===200).length,rateStatuses:statuses,publicationAuthorized:false}));
} finally {await mkdir('output/a2a-canary',{recursive:true});await writeFile(base.startsWith('https:')?'output/a2a-canary/https-receipts.json':'output/a2a-canary/remote-receipts.json',JSON.stringify(receipts,null,2));}
