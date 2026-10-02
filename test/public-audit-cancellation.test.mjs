import test from 'node:test';
import assert from 'node:assert/strict';
import {runPublicAudit, PUBLIC_AUDIT_PROBES} from '../lib/public-audit.mjs';

test('audit cancellation propagates through DNS before any site request',async()=>{
 const original=globalThis.fetch;const controller=new AbortController();let sites=0;let stopped=0;
 globalThis.fetch=async(url,{signal})=>{
  if(!String(url).startsWith('https://cloudflare-dns.com/')){sites++;return new Response('');}
  return new Promise((_,reject)=>signal.addEventListener('abort',()=>{stopped++;reject(signal.reason);},{once:true}));
 };
 try {const pending=runPublicAudit('https://example.com',{signal:controller.signal});controller.abort();await assert.rejects(pending);assert.equal(stopped,2);assert.equal(sites,0);}
 finally {globalThis.fetch=original;}
});
test('audit cancellation cancels every stalled probe without returning a partial success',async()=>{
 const original=globalThis.fetch;const controller=new AbortController();let started=0;let cancelled=0;
 globalThis.fetch=async(url)=>{
  if(String(url).startsWith('https://cloudflare-dns.com/'))return Response.json({Answer:[{type:1,data:'104.16.132.229'}]});
  started++;return new Response(new ReadableStream({cancel(){cancelled++;}}));
 };
 try {const pending=runPublicAudit('https://example.com',{signal:controller.signal});await new Promise(resolve=>setTimeout(resolve,15));controller.abort();await assert.rejects(pending);assert.equal(started,PUBLIC_AUDIT_PROBES.length);assert.equal(cancelled,started);}
 finally {globalThis.fetch=original;}
});

test('one failed DNS family waits for the sibling query before releasing the audit',async()=>{
 const original=globalThis.fetch;let finish;let settled=false;
 globalThis.fetch=async(url)=>{if(String(url).endsWith('type=A'))throw Error('DNS unavailable');return new Promise(resolve=>{finish=()=>resolve(Response.json({Answer:[{type:28,data:'2606:4700::6810:84e5'}]}));});};
 try{
  const pending=runPublicAudit('https://example.com').then(()=>{settled=true;},error=>{settled=true;return error;});
  await new Promise(resolve=>setTimeout(resolve,10));assert.equal(settled,false);finish();assert.ok((await pending) instanceof Error);
 }finally{finish?.();globalThis.fetch=original;}
});
