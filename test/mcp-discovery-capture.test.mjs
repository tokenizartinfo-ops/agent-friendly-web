import test from 'node:test';
import assert from 'node:assert/strict';
import {createDiscoveryCapture} from '../lib/mcp-discovery-capture.mjs';
const revision='a'.repeat(40),start=1000,end=601000;
const row={event:'afw.mcp_discovery_diagnostic',sourceRevision:revision,at:new Date(2000).toISOString(),method:'events/list',stage:'catalog',count:1};
const frame=()=>({scriptName:'agent-friendly-web-delegated-canary',event:{request:{headers:{authorization:'SECRET'},url:'https://private.invalid/?secret=SECRET'}},exceptions:[{message:'SECRET'}],logs:[{message:[JSON.stringify(row)]},{message:['SECRET']}]});
const capture=(emit,extra={})=>createDiscoveryCapture({sourceRevision:revision,startAt:start,expiresAt:end,now:()=>2000,emit,...extra});
test('fragmented pretty JSON projects only diagnostic fields and groups invocation locally',()=>{
 const rows=[],c=capture(r=>rows.push(r)),raw=JSON.stringify(frame(),null,4);for(let i=0;i<raw.length;i+=7)c.push(raw.slice(i,i+7));
 assert.equal(rows.length,1);assert.deepEqual(rows[0],{invocation:1,...row});assert.ok(!JSON.stringify(rows).includes('SECRET'));c.finish();
});
test('foreign workers, source drift, malformed schemas and out-of-window dates are discarded',()=>{
 const rows=[],c=capture(r=>rows.push(r));
 for(const change of [{sourceRevision:'b'.repeat(40)},{at:new Date(end).toISOString()},{stage:'SECRET'},{method:'SECRET'},{count:2},{extra:'SECRET'}]){const f=frame();f.logs=[{message:[JSON.stringify({...row,...change})]}];c.push(JSON.stringify(f));}
 const foreign=frame();foreign.scriptName='tokenizart';c.push(JSON.stringify(foreign));assert.deepEqual(rows,[]);
});
test('expired capture and byte/frame budgets stop processing without printing raw errors',()=>{
 const rows=[];const c=capture(r=>rows.push(r),{now:()=>end});assert.throws(()=>c.push(JSON.stringify(frame())),/Capture unavailable/);assert.deepEqual(rows,[]);
 const b=capture(()=>{});assert.throws(()=>b.push('x'.repeat(1048577)),/Capture unavailable/);assert.throws(()=>b.push('{}'),/Capture unavailable/);
 const unfinished=capture(()=>{});unfinished.push('{');assert.throws(()=>unfinished.finish(),/Capture unavailable/);
});

test('real stdin CLI emits only sanitized NDJSON and rejects malformed input without echo',async()=>{
 const {spawnSync}=await import('node:child_process');const t=Date.now(),f=frame();f.logs[0].message=[JSON.stringify({...row,at:new Date(t).toISOString()})];
 const args=['scripts/filter-mcp-discovery-tail.mjs',revision,String(t-1000),String(t+30000)];
 const ok=spawnSync(process.execPath,args,{input:JSON.stringify(f,null,4),encoding:'utf8',timeout:5000});assert.equal(ok.status,0,ok.stderr);assert.equal(JSON.parse(ok.stdout).stage,'catalog');assert.ok(!ok.stdout.includes('SECRET'));
 const bad=spawnSync(process.execPath,args,{input:'PRIVATE_SECRET {',encoding:'utf8',timeout:5000});assert.equal(bad.status,2);assert.equal(bad.stdout,'');assert.equal(bad.stderr,'AFW capture unavailable\n');
});

test('too many log entries fail instead of silently reporting complete coverage',()=>{
 const f=frame();f.logs=Array.from({length:101},()=>({message:['ignored']}));const c=capture(()=>{});assert.throws(()=>c.push(JSON.stringify(f)),/Capture unavailable/);
});

test('bounded native catalog stages survive the sanitizer without extra payload',()=>{
 const rows=[],c=capture(r=>rows.push(r)),f=frame();f.logs=[{message:[JSON.stringify({...row,stage:'native_runtime_check',count:undefined})]}];c.push(JSON.stringify(f));
 assert.equal(rows.length,1);assert.equal(rows[0].stage,'native_runtime_check');assert.ok(!JSON.stringify(rows).includes('SECRET'));
});

test('token status and MCP header-presence stages survive sanitization without private fields',()=>{
 const rows=[],c=capture(r=>rows.push(r)),f=frame();
 f.logs=[{message:[JSON.stringify({...row,method:'oauth/token',stage:'response',count:undefined,status:200})]},{message:[JSON.stringify({...row,stage:'authorization_header_absent',count:undefined})]}];c.push(JSON.stringify(f));
 assert.deepEqual(rows.map(r=>[r.method,r.stage,r.status]),[['oauth/token','response',200],['events/list','authorization_header_absent',undefined]]);assert.ok(!JSON.stringify(rows).includes('SECRET'));
});

test('request events-gate witnesses survive only as fixed stages, not configuration payloads',()=>{
 const rows=[],c=capture(r=>rows.push(r)),f=frame();
 f.logs=['events_enabled','events_not_enabled'].map(stage=>({message:[JSON.stringify({...row,stage,count:undefined})]}));
 f.logs.push({message:[JSON.stringify({...row,stage:'events_enabled',count:undefined,env:'SECRET'})]});c.push(JSON.stringify(f));
 assert.deepEqual(rows.map(r=>r.stage),['events_enabled','events_not_enabled']);assert.ok(!JSON.stringify(rows).includes('SECRET'));c.finish();
});
