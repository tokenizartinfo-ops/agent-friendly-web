import test from 'node:test';
import assert from 'node:assert/strict';
import {createMcpDiscoveryDiagnostic,observeMcpDiscoveryRequest,observeMcpEventAuthority} from '../lib/mcp-discovery-diagnostic.mjs';
import * as diagnostics from '../lib/mcp-discovery-diagnostic.mjs';
const env={AFW_MCP_DISCOVERY_DIAGNOSTIC_ENABLED:'true',AFW_MCP_DISCOVERY_DIAGNOSTIC_START_AT:'1000',AFW_MCP_DISCOVERY_DIAGNOSTIC_EXPIRES_AT:'601000'};
const sourceRevision='a'.repeat(40);
const request=new Request('https://example.invalid/mcp?private=secret',{method:'POST',headers:{'Mcp-Method':'events/list',Authorization:'Bearer secret',Cookie:'private=secret'},body:'{"private":"secret"}'});
test('diagnostic records fixed stages only, never request secrets or caller extras',()=>{
 const rows=[];const d=createMcpDiscoveryDiagnostic({env,request,sourceRevision,now:()=>1000,emit:r=>rows.push(r)});
 d.record('received');d.record('catalog',{count:1,secret:'secret'});d.record('response',{status:200});d.record('secret',{count:1});
 assert.equal(rows.length,3);assert.deepEqual(rows.map(r=>r.stage),['received','catalog','response']);assert.equal(rows[1].count,1);assert.equal(rows[2].status,200);assert.ok(!JSON.stringify(rows).includes('secret'));assert.equal(request.bodyUsed,false);
});
test('disabled, malformed, expired, overlong and drifting windows remain silent',()=>{
 for(const change of [{AFW_MCP_DISCOVERY_DIAGNOSTIC_ENABLED:'false'},{AFW_MCP_DISCOVERY_DIAGNOSTIC_START_AT:'NaN'},{AFW_MCP_DISCOVERY_DIAGNOSTIC_EXPIRES_AT:'601001'},{AFW_MCP_DISCOVERY_DIAGNOSTIC_EXPIRES_AT:'1000'}]){
  const rows=[];createMcpDiscoveryDiagnostic({env:{...env,...change},request,sourceRevision,now:()=>1000,emit:r=>rows.push(r)}).record('received');assert.deepEqual(rows,[]);
 }
 let t=1000;const mutable={...env},rows=[];const d=createMcpDiscoveryDiagnostic({env:mutable,request,sourceRevision,now:()=>t,emit:r=>rows.push(r)});d.record('received');t=601000;d.record('response',{status:200});assert.equal(rows.length,1);
 t=1000;mutable.AFW_MCP_DISCOVERY_DIAGNOSTIC_START_AT='999';d.record('received');assert.equal(rows.length,1);
});
test('sink failures cannot affect the caller and unknown methods are not logged verbatim',()=>{
 const d=createMcpDiscoveryDiagnostic({env,request,sourceRevision,now:()=>1000,emit:()=>{throw Error('sink');}});assert.doesNotThrow(()=>d.record('received'));
 const rows=[];createMcpDiscoveryDiagnostic({env,request:new Request('https://example.invalid/mcp',{method:'POST',headers:{'Mcp-Method':'secret'}}),sourceRevision,now:()=>1000,emit:r=>rows.push(r)}).record('received');assert.equal(rows[0].method,'other');
});
test('HTTP and authority observation preserves response, errors and subscription functions',async()=>{
 const rows=[],response=new Response('private body',{status:401}),failure=Error('private failure');
 const options={now:()=>1000,emit:r=>rows.push(r)};
 assert.equal(await observeMcpDiscoveryRequest({env,request,sourceRevision,...options},async()=>response),response);assert.equal(response.bodyUsed,false);
 assert.deepEqual(rows.map(r=>r.stage),['received','events_not_enabled','authorization_header_present','response']);assert.equal(rows[3].status,401);
 await assert.rejects(observeMcpDiscoveryRequest({env,request,sourceRevision,...options},async()=>{throw failure;}),e=>e===failure);
 const d=createMcpDiscoveryDiagnostic({env,request,sourceRevision,...options}),subscribe=()=>{},unsubscribe=()=>{};
 const authority=await observeMcpEventAuthority(d,()=>({list:async()=>'c'.repeat(64),subscribe,unsubscribe}));
 assert.equal(authority.subscribe,subscribe);assert.equal(authority.unsubscribe,unsubscribe);assert.equal(await authority.list(),'c'.repeat(64));
 const bad=await observeMcpEventAuthority(d,()=>({list:async()=>{throw failure;},subscribe,unsubscribe}));await assert.rejects(bad.list(),e=>e===failure);
 await assert.rejects(observeMcpEventAuthority(d,()=>{throw failure;}),e=>e===failure);
 assert.ok(rows.some(r=>r.stage==='catalog'&&r.count===1));assert.ok(rows.some(r=>r.stage==='catalog_failed'));assert.ok(rows.some(r=>r.stage==='authority_failed'));assert.ok(!JSON.stringify(rows).includes('private'));
});

test('non-MCP paths, invalid revisions and backward clocks produce no misleading rows',()=>{
 for(const overrides of [{sourceRevision:'unknown'},{request:new Request('https://example.invalid/mcp')},{request:new Request('https://example.invalid/authorize',{method:'POST'})}]){
  const rows=[];createMcpDiscoveryDiagnostic({env,request,sourceRevision,now:()=>1000,emit:r=>rows.push(r),...overrides}).record('received');assert.deepEqual(rows,[]);
 }
 let t=2000;const rows=[],d=createMcpDiscoveryDiagnostic({env,request,sourceRevision,now:()=>t,emit:r=>rows.push(r)});
 d.record('received');t=1999;d.record('response',{status:200});assert.equal(rows.length,1);
});

test('private catalog RPC records only fixed native stages in the same bounded diagnostic window',()=>{
 assert.equal(typeof diagnostics.createMcpRpcCatalogDiagnostic,'function');
 const rows=[],d=diagnostics.createMcpRpcCatalogDiagnostic({env,sourceRevision,now:()=>1000,emit:r=>rows.push(r)});
 d.record('native_received',{private:'SECRET'});d.record('native_runtime_check');d.record('native_failed');d.record('SECRET');
 assert.deepEqual(rows.map(r=>r.stage),['native_received','native_runtime_check','native_failed']);assert.ok(rows.every(r=>r.method==='events/list'));assert.ok(!JSON.stringify(rows).includes('SECRET'));
 const disabled=[];diagnostics.createMcpRpcCatalogDiagnostic({env:{...env,AFW_MCP_DISCOVERY_DIAGNOSTIC_ENABLED:'false'},sourceRevision,now:()=>1000,emit:r=>disabled.push(r)}).record('native_received');assert.deepEqual(disabled,[]);
});

test('token response observation distinguishes emission outcome without reading the body or credentials',async()=>{
 for(const status of [200,400,503]){
  const rows=[],request=new Request('https://example.invalid/oauth/token?SECRET',{method:'POST',headers:{Authorization:'SECRET','Mcp-Method':'SECRET',Cookie:'SECRET'},body:'code=SECRET&code_verifier=SECRET'}),response=new Response('SECRET',{status});
  assert.equal(await observeMcpDiscoveryRequest({env,request,sourceRevision,now:()=>1000,emit:r=>rows.push(r)},async()=>response),response);
  assert.deepEqual(rows.map(r=>[r.method,r.stage,r.status]),[['oauth/token','received',undefined],['oauth/token','response',status]]);
  assert.equal(request.bodyUsed,false);assert.equal(response.bodyUsed,false);assert.ok(!JSON.stringify(rows).includes('SECRET'));
 }
});

test('MCP authorization header presence is only a boolean stage, not token validation',async()=>{
 for(const present of [true,false]){
  const rows=[],request=new Request('https://example.invalid/mcp',{method:'POST',headers:present?{Authorization:'SECRET'}:{}});
  await observeMcpDiscoveryRequest({env,request,sourceRevision,now:()=>1000,emit:r=>rows.push(r)},async()=>new Response(null,{status:401}));
  assert.deepEqual(rows.map(r=>r.stage),['received','events_not_enabled',present?'authorization_header_present':'authorization_header_absent','response']);assert.ok(!JSON.stringify(rows).includes('SECRET'));
 }
 const rows=[];await observeMcpDiscoveryRequest({env:{...env,AFW_MCP_DISCOVERY_DIAGNOSTIC_ENABLED:'false'},request,sourceRevision,now:()=>1000,emit:r=>rows.push(r)},async()=>new Response(null,{status:401}));assert.deepEqual(rows,[]);
});

test('header inspection failure never prevents the real handler from running',async()=>{
 const rows=[],request=new Request('https://example.invalid/mcp',{method:'POST'});request.headers.has=()=>{throw Error('PRIVATE');};const response=new Response(null,{status:401});
 assert.equal(await observeMcpDiscoveryRequest({env,request,sourceRevision,now:()=>1000,emit:r=>rows.push(r)},async()=>response),response);assert.ok(!JSON.stringify(rows).includes('PRIVATE'));
});

test('MCP observation distinguishes the actual request events gate without claiming authorization',async()=>{
 for(const [value,stage]of [['true','events_enabled'],['false','events_not_enabled'],[undefined,'events_not_enabled']]){
  const rows=[],request=new Request('https://example.invalid/mcp',{method:'POST'});
  const response=await observeMcpDiscoveryRequest({env:{...env,AFW_DOSSIER_EVENTS_ENABLED:value},request,sourceRevision,now:()=>1000,emit:r=>rows.push(r)},async()=>new Response(null,{status:401}));
  assert.equal(response.status,401);assert.ok(rows.some(r=>r.stage===stage));assert.ok(!rows.some(r=>r.stage==='authenticated'));
  assert.ok(rows.every(r=>!Object.hasOwn(r,'enabled')&&!Object.hasOwn(r,'env')));
 }
});
