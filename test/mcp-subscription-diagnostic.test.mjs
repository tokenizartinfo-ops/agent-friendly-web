import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';
import {createOwnDurableEventHost} from '../lib/mcp-own-durable-host.mjs';

function diagnostic(value){
 const {elapsedMs,stageElapsedMs,closureElapsedMs,...fixed}=JSON.parse(value);
 for(const duration of [elapsedMs,stageElapsedMs,closureElapsedMs])assert.ok(Number.isSafeInteger(duration)&&duration>=0&&duration<=600000);
 assert.ok(elapsedMs>=stageElapsedMs);
 return fixed;
}

test('failure duration excludes subsequent closure and uses monotonic stage time',async t=>{
 const f=fixture(),logs=[],original=console.warn;let tick=100;
 t.mock.method(performance,'now',()=>tick);
 console.warn=value=>logs.push(value);
 try{
  f.grant();f.config.ctx.container.start=async()=>{tick+=25;throw Error('private');};
  f.config.ctx.container.destroy=async()=>{tick+=70;};
  const h=createOwnDurableEventHost(f.config);f.setHost(h);
  await assert.rejects(h.subscribe({name:'afw.dossier.changed',arguments:{projectRef:await h.list()},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')}}));
  const d=JSON.parse(logs[0]);diagnostic(logs[0]);
  // start() already performs one internal close before rejecting (25 + 70).
  assert.equal(d.elapsedMs,95);assert.equal(d.stageElapsedMs,95);
  assert.equal(d.closureElapsedMs,70);assert.equal(logs.length,1);
 }finally{console.warn=original;t.mock.restoreAll();f.close();}
});

test('later failure resets stage time while preserving earlier readiness duration',async t=>{
 const f=fixture(),logs=[],original=console.warn;let tick=100;
 t.mock.method(performance,'now',()=>tick);console.warn=value=>logs.push(value);
 try{
  f.grant();const c=f.config.ctx.container,start=c.start.bind(c),port=c.getTcpPort.bind(c),destroy=c.destroy.bind(c);
  c.start=async options=>{tick+=25;return start(options);};
  c.getTcpPort=n=>({fetch:request=>{if(new URL(request.url).pathname==='/dispatch'){tick+=40;return new Response('private',{status:503});}return port(n).fetch(request);}});
  c.destroy=async()=>{tick+=70;return destroy();};
  const h=createOwnDurableEventHost(f.config);f.setHost(h);
  await assert.rejects(h.subscribe({name:'afw.dossier.changed',arguments:{projectRef:await h.list()},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')}}));
  assert.equal(logs.length,1);diagnostic(logs[0]);
  const d=JSON.parse(logs[0]);assert.equal(d.stage,'callback_verification');
  assert.equal(d.elapsedMs,65);assert.equal(d.stageElapsedMs,40);assert.equal(d.closureElapsedMs,70);
 }finally{console.warn=original;t.mock.restoreAll();f.close();}
});

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
   assert.deepEqual(logs.map(diagnostic),[{event:'afw.own_subscription_failed',stage,closureCompleted:true}]);
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
  assert.deepEqual(logs.map(diagnostic),[{event:'afw.own_subscription_failed',stage:'process_readiness',closureCompleted:false}]);
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
