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
