import assert from 'node:assert/strict';
import test from 'node:test';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import {createMcpHandler} from 'agents/mcp/server';
import {z} from 'zod';
import {DatabaseSync} from 'node:sqlite';
import {createMcpSubscriptionController} from '../lib/mcp-subscription-lifecycle.mjs';
import {createDelegatedProjectMcpServer} from '../lib/delegated-project-mcp.mjs';

const projectRef='c'.repeat(64),otherRef='d'.repeat(64);
const catalog=z.object({events:z.array(z.any())});
const receipt=z.object({id:z.string(),refreshBefore:z.string(),cursor:z.null(),truncated:z.boolean()});
const params={name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.example.com/own',secret:'whsec_fixture'},ttlMs:600000};
async function fixture(options={}) {
 const handler=createMcpHandler(()=>createDelegatedProjectMcpServer({resource:'https://private.example.invalid/mcp',resolveAuthorization:async()=>null,...options}),{route:'/mcp',legacy:'reject',corsOptions:false,allowedHostnames:['private.example.invalid']});
 const fetch=async(input,init)=>{const request=new Request(input,init);request.headers.set('host',new URL(request.url).host);return handler(request,{}, {waitUntil(){}});};
 const client=new Client({name:'afw-local-private-events-test',version:'1'},{versionNegotiation:{mode:{pin:'2026-07-28'}}});
 await client.connect(new StreamableHTTPClientTransport(new URL('https://private.example.invalid/mcp'),{fetch}));
 return client;
}

test('default delegated endpoint does not mount Events or touch its authority',async()=>{
 let touched=0;
 const authority=new Proxy({}, {get(){touched++;throw Error('must stay closed');}});
 const client=await fixture({eventsAuthority:authority});
 try {await assert.rejects(client.request({method:'events/list',params:{}},catalog));assert.equal(touched,0);assert.deepEqual((await client.listTools()).tools.map(t=>t.name).sort(),['read_project_summary','read_saved_evidence']);}
 finally {await client.close();}
});

test('private MCP2 catalog exposes only the authorized opaque selector on the read endpoint',async()=>{
 const authority={list:async()=>projectRef,subscribe:async()=>({id:'sub_fixture',refreshBefore:'2026-10-11T18:00:00.000Z',cursor:null,truncated:false}),unsubscribe:async()=>({})};
 const client=await fixture({eventsEnabled:true,eventsAuthority:authority});
 try {const list=await client.request({method:'events/list',params:{}},catalog);assert.equal(list.events.length,1);assert.deepEqual(list.events[0].inputSchema.properties.projectRef.enum,[projectRef]);assert.equal(list.events[0].inputSchema.additionalProperties,false);assert.equal(JSON.stringify(list).includes('whsec'),false);assert.equal((await client.listTools()).tools.length,2);assert.equal((await client.request({method:'events/subscribe',params},receipt)).id,'sub_fixture');}
 finally {await client.close();}
});

test('foreign project and client owner or storage selectors are denied before subscription',async()=>{
 let subscriptions=0;
 const authority={list:async()=>projectRef,subscribe:async()=>{subscriptions++;throw Error('should not reach');},unsubscribe:async()=>({})};
 const client=await fixture({eventsEnabled:true,eventsAuthority:authority});
 try {for(const invalid of [{...params,arguments:{projectRef:otherRef}},{...params,owner:'other'},{...params,storage:'other'},{...params,arguments:{projectRef,owner:'other'}}])await assert.rejects(client.request({method:'events/subscribe',params:invalid},receipt));assert.equal(subscriptions,0);}
 finally {await client.close();}
});

test('empty revoked catalog prevents new subscriptions but permits an authenticated authority withdrawal',async()=>{
 let selector=projectRef,withdrawals=0,subscriptions=0;
 const authority={list:async()=>selector,subscribe:async()=>{subscriptions++;throw Error('forbidden');},unsubscribe:async value=>{assert.equal(value.arguments.projectRef,projectRef);withdrawals++;return {};}};
 const client=await fixture({eventsEnabled:true,eventsAuthority:authority});
 try {assert.equal((await client.request({method:'events/list',params:{}},catalog)).events.length,1);selector=null;assert.deepEqual((await client.request({method:'events/list',params:{}},catalog)).events,[]);await assert.rejects(client.request({method:'events/subscribe',params},receipt));const {secret:ignored,...delivery}=params.delivery;void ignored;await client.request({method:'events/unsubscribe',params:{name:params.name,arguments:params.arguments,delivery}},z.object({}));assert.equal(withdrawals,1);assert.equal(subscriptions,0);}
 finally {await client.close();}
});

test('authority errors are static and do not expose custody or internal diagnostics',async()=>{
 const authority={list:async()=>{throw Error('secret-private-custody');},subscribe:async()=>{},unsubscribe:async()=>{throw Error('secret-private-custody');}};
 const client=await fixture({eventsEnabled:true,eventsAuthority:authority});
 try {await assert.rejects(client.request({method:'events/list',params:{}},catalog),error=>{assert.equal(String(error).includes('secret-private-custody'),false);return true;});}
 finally {await client.close();}
});

test('real lifecycle retains one challenge and terminal global budget through the private MCP2 adapter',async()=>{
 const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE records(k TEXT PRIMARY KEY,v TEXT NOT NULL)');let queue=Promise.resolve(),sends=0;
 const storage={transaction(fn){const result=queue.then(async()=>{db.exec('BEGIN');try{const result=await fn({get:async k=>{const row=db.prepare('SELECT v FROM records WHERE k=?').get(k);return row?JSON.parse(row.v):undefined;},put:async(k,v)=>db.prepare('INSERT INTO records VALUES(?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v').run(k,JSON.stringify(v))});db.exec('COMMIT');return result;}catch(error){db.exec('ROLLBACK');throw error;}});queue=result.catch(()=>{});return result;}};
 const auth={principalRef:'a'.repeat(64),resourceRef:'b'.repeat(64),projectRef,permissionRef:'e'.repeat(64),enabled:true,expiresAt:601000};
 const controller=createMcpSubscriptionController({storage,custodyKey:Buffer.alloc(32,1),readAuthorization:async()=>({...auth}),now:()=>1000,send:async(_,message)=>{sends++;return {status:200,body:JSON.stringify({challenge:JSON.parse(message.body).challenge})};}});
 const authority={list:async()=>auth.enabled?projectRef:null,subscribe:controller.subscribe,unsubscribe:controller.unsubscribe};
 const client=await fixture({eventsEnabled:true,eventsAuthority:authority});
 const valid={...params,delivery:{...params.delivery,secret:'whsec_'+Buffer.alloc(32,2).toString('base64')}};
 try {
  const first=await client.request({method:'events/subscribe',params:valid},receipt);
  assert.deepEqual(await client.request({method:'events/subscribe',params:valid},receipt),first);assert.equal(sends,1);
  await assert.rejects(client.request({method:'events/subscribe',params:{...valid,delivery:{...valid.delivery,url:'https://callback.example.com/second'}}},receipt));assert.equal(sends,1);
  auth.enabled=false;assert.deepEqual((await client.request({method:'events/list',params:{}},catalog)).events,[]);
  const {secret:ignored,...delivery}=valid.delivery;void ignored;
  await client.request({method:'events/unsubscribe',params:{name:valid.name,arguments:valid.arguments,delivery}},z.object({}));
  auth.enabled=true;await assert.rejects(client.request({method:'events/subscribe',params:valid},receipt));assert.equal(sends,1);
 }finally {await client.close();db.close();}
});
