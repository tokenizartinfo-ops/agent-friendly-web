import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';
import {createOwnDurableEventHost} from '../lib/mcp-own-durable-host.mjs';

test('failed subscription records only a static stage and closure request, never exception or request data',async()=>{
 for(const stage of ['process_readiness','callback_verification','receipt_record','final_readiness']){
  const f=fixture(),logs=[],original=console.warn;
  console.warn=value=>logs.push(value);
  try{
   f.grant();const container=f.config.ctx.container,port=container.getTcpPort.bind(container);
   if(stage==='process_readiness')container.start=async()=>{throw Error('SECRET launch detail');};
   if(stage==='callback_verification')container.getTcpPort=number=>({fetch:request=>new URL(request.url).pathname==='/dispatch'?new Response('SECRET callback detail',{status:503}):port(number).fetch(request)});
   const prepare=f.config.db.prepare.bind(f.config.db);let recorded=false;
   f.config.db.prepare=sql=>{
    if(sql.includes('INSERT')&&sql.includes('dossier_event_subscription_receipts')){
     if(stage==='receipt_record')throw Error('SECRET database detail');
     recorded=true;
    }
    return prepare(sql);
   };
   if(stage==='final_readiness')container.getTcpPort=number=>({fetch:request=>recorded?new Response('SECRET final detail',{status:503}):port(number).fetch(request)});
   const h=createOwnDurableEventHost(f.config);f.setHost(h);
   await assert.rejects(h.subscribe({name:'afw.dossier.changed',arguments:{projectRef:await h.list()},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/private-reference',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')}}),/Own durable event host unavailable/);
   assert.deepEqual(logs.map(JSON.parse),[{event:'afw.own_subscription_failed',stage,closureCompleted:true}]);
   assert.equal(container.running,false);
   assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_node_process_closures').get().n,1);
  }finally{console.warn=original;f.close();}
 }
});

test('failed closure journal does not hide the stop attempt or claim completed closure',async()=>{
 const f=fixture(),logs=[],original=console.warn;console.warn=value=>logs.push(value);let stops=0;
 try{
  f.grant();const prepare=f.config.db.prepare.bind(f.config.db);
  f.config.db.prepare=sql=>{if(sql.includes('INSERT')&&sql.includes('dossier_node_process_closures'))throw Error('SECRET journal detail');return prepare(sql);};
  f.config.ctx.container.start=async()=>{throw Error('SECRET launch');};
  f.config.ctx.container.destroy=async()=>{stops++;};
  const h=createOwnDurableEventHost(f.config);f.setHost(h);
  await assert.rejects(h.subscribe({name:'afw.dossier.changed',arguments:{projectRef:await h.list()},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')}}),/Own durable event host unavailable/);
  assert.ok(stops>0);
  assert.deepEqual(logs.map(JSON.parse),[{event:'afw.own_subscription_failed',stage:'process_readiness',closureCompleted:false}]);
 }finally{console.warn=original;f.close();}
});

test('a broken diagnostic sink cannot prevent closure or replace the public generic error',async()=>{
 const f=fixture(),original=console.warn;console.warn=()=>{throw Error('sink unavailable');};
 try{
  f.grant();f.config.ctx.container.start=async()=>{throw Error('private');};
  const h=createOwnDurableEventHost(f.config);f.setHost(h);
  await assert.rejects(h.subscribe({name:'afw.dossier.changed',arguments:{projectRef:await h.list()},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')}}),/Own durable event host unavailable/);
  assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_node_process_closures').get().n,1);
 }finally{console.warn=original;f.close();}
});
