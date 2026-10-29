import test from 'node:test';
import assert from 'node:assert/strict';
import { makeGuardedFetch, bodies, protocolResult, readCapped } from '../scripts/public-journey-acceptance.mjs';

test('acceptance denies foreign URLs, caller auth and nonliteral writes before fetch',async()=>{
 let calls=0;const guarded=makeGuardedFetch({mode:'stage0',notAfter:Date.now()+5000,fetchImpl:async()=>{calls++;return new Response('{}');}});
 for(const [url,init] of [
  ['https://example.com/',{method:'GET'}],
  ['https://agentfriendlyweb.dev/?other=1',{method:'GET'}],
  ['https://agentfriendlyweb.dev/',{method:'GET',headers:{authorization:'Bearer fixture'}}],
  ['https://agentfriendlyweb.dev/mcp',{method:'POST',body:JSON.stringify({method:'tools/call'})}],
  ['https://agentfriendlyweb.dev/api/projects',{method:'POST',body:'{}'}],
 ])await assert.rejects(guarded(url,init));
 assert.equal(calls,0);
});
test('normal reads omit override while stage0 has only the fixed candidate',async()=>{
 for(const mode of ['stage0','normal']){
  let seen;const guarded=makeGuardedFetch({mode,notAfter:Date.now()+5000,fetchImpl:async(_,init)=>{seen=init;return new Response('{}');}});
  await guarded('https://agentfriendlyweb.dev/mcp',{method:'POST',headers:{accept:'application/json, text/event-stream','content-type':'application/json'},body:bodies.initialize});
  assert.equal(seen.redirect,'manual');assert.equal(seen.credentials,'omit');
  assert.equal(seen.headers.get('Cloudflare-Workers-Version-Overrides'),mode==='stage0'?'agent-friendly-web-web-production="0fd30778-70ce-406f-8757-69bb29a21c09"':null);
 }
});
test('expired or unknown observation cannot emit a request',async()=>{
 let calls=0;
 for(const options of [{mode:'normal',notAfter:Date.now()-1},{mode:'other',notAfter:Date.now()+1000}]){
  await assert.rejects(async()=>makeGuardedFetch({...options,fetchImpl:async()=>{calls++;}})('https://agentfriendlyweb.dev/',{method:'GET'}));
 }
 assert.equal(calls,0);
});
test('complexity requires exact413 and allowed boundaries retain protocol errors',()=>{
 const json=x=>Buffer.from(JSON.stringify(x));
 for(const name of ['depth65','values4097']){
  assert.equal(protocolResult(name,413,json({error:{code:'request_too_complex'}})).ok,true);
  assert.equal(protocolResult(name,200,json({error:{code:'request_too_complex'}})).ok,false);
 }
 for(const name of ['depth64','values4096']){
  assert.equal(protocolResult(name,400,json({error:{code:-32600}})).ok,true);
  assert.equal(protocolResult(name,413,json({error:{code:'request_too_complex'}})).ok,false);
 }
 assert.equal(protocolResult('invalid',400,json({error:{code:-32700}})).ok,true);
 assert.equal(protocolResult('initialize',200,json({jsonrpc:'2.0',id:1,result:{}})).ok,true);
 assert.equal(protocolResult('toolsList',200,json({jsonrpc:'2.0',id:1,result:{}})).ok,false);
});
test('response reader enforces512KiB while streaming',async()=>{
 let cancelled=false;
 const response=new Response(new ReadableStream({start(c){c.enqueue(new Uint8Array(524289));},cancel(){cancelled=true;}}));
 await assert.rejects(readCapped(response),/response_cap/);
 assert.equal(cancelled,true);
});

test('directed requests hit exact JSON depth and value limits with valid method metadata',()=>{
 function measure(value){const pending=[[value,1]];let count=0,depth=0;while(pending.length){const[v,d]=pending.pop();count++;depth=Math.max(depth,d);if(v&&typeof v==='object')for(const c of Object.values(v))pending.push([c,d+1]);}return {count,depth};}
 assert.equal(measure(JSON.parse(bodies.depth64)).depth,64);
 assert.equal(measure(JSON.parse(bodies.depth65)).depth,65);
 assert.equal(measure(JSON.parse(bodies.values4096)).count,4096);
 assert.equal(measure(JSON.parse(bodies.values4097)).count,4097);
 for(const b of Object.values(bodies))assert.ok(Buffer.byteLength(b)<32768);
});

test('positive MCP responses accept explicit JSON or finite SSE with the same exact RPC identity',()=>{
 const cases=[['initialize',1,{}],['toolsList',2,{tools:[]}],['depth64',3,{tools:[]}],['values4096',4,{tools:[]}]];
 for(const[name,id,result]of cases){
  const response={jsonrpc:'2.0',id,result};
  const raw=JSON.stringify(response);
  assert.equal(protocolResult(name,200,Buffer.from(raw),'application/json; charset=utf-8').ok,true);
  assert.equal(protocolResult(name,200,Buffer.from('event: message\r\ndata: '+raw+'\r\n\r\n'),'text/event-stream; charset=utf-8').ok,true);
 }
});
test('SSE supports comments, empty priming and multiline data without opening another stream',()=>{
 const text=': keepalive\n\nid: fixture\ndata:\n\nevent: message\ndata: {"jsonrpc":"2.0",\ndata: "id":1,"result":{}}\n\n';
 assert.equal(protocolResult('initialize',200,Buffer.from(text),'text/event-stream').ok,true);
});
test('protocol acceptance rejects incorrect MIME, truncated, ambiguous or unrelated SSE',()=>{
 const good=JSON.stringify({jsonrpc:'2.0',id:1,result:{}});
 assert.equal(protocolResult('initialize',200,Buffer.from(good),'text/html').ok,false);
 assert.equal(protocolResult('initialize',200,Buffer.from('data: '+good+'\n\n'),'application/json').ok,false);
 for(const text of [
  'data: '+good+'\n',
  'data: not-json\n\n',
  'event: endpoint\ndata: '+good+'\n\n',
  'data: '+good+'\n\ndata: '+good+'\n\n',
  'data: '+JSON.stringify({jsonrpc:'2.0',id:2,result:{}})+'\n\n',
  'data: '+JSON.stringify({jsonrpc:'2.0',id:1,error:{code:-32603}})+'\n\n',
 ]){
  assert.equal(protocolResult('initialize',200,Buffer.from(text),'text/event-stream').ok,false);
 }
 assert.equal(protocolResult('depth65',200,Buffer.from('data: '+JSON.stringify({error:{code:'request_too_complex'}})+'\n\n'),'text/event-stream').ok,false);
});

test('home acceptance requires the approved semantic order, both dialogues and the exact illustration', async()=>{
 const {homeResult}=await import('../scripts/public-journey-acceptance.mjs');
 const {COMIC_HOME_COPY,HOME_VALUE_COPY}=await import('../lib/home-copy.mjs');
 const {localizedPath}=await import('../lib/site-i18n.mjs');
 for(const locale of ['es','en','pt']){
  const html='<main lang="'+locale+'"><figure class="comic-call-scene"><figcaption>'+COMIC_HOME_COPY[locale].dialogue.join(' ')+'</figcaption><img src="/images/agent-friendly-call-robots-screen.webp"></figure><h1 id="comic-call-title">Call</h1><section id="que-hacemos">'+HOME_VALUE_COPY[locale].title+'</section><section id="ruta-de-madurez"></section><section id="tu-primer-paso"><a href="'+localizedPath('dossier',locale)+'" aria-describedby="home-entry-access">Open</a><p id="home-entry-access">Access</p></section><section id="auditar"></section></main>';
  assert.equal(homeResult(locale,200,Buffer.from(html)).ok,true);
  for(const bad of [html.replace('comic-call-scene','old-scene'),html.replace('robots-screen.webp','robots.webp'),html.replace(COMIC_HOME_COPY[locale].dialogue[1],''),html.replace('id="que-hacemos"','id="other"'),html.replace('id="home-entry-access"','id="missing"'),html.replace('id="ruta-de-madurez"','id="later"').replace('id="tu-primer-paso"','id="ruta-de-madurez"').replace('id="later"','id="tu-primer-paso"')]){
   assert.equal(homeResult(locale,200,Buffer.from(bad)).ok,false);
  }
  assert.equal(homeResult(locale,403,Buffer.from(html)).ok,false);
 }
 assert.equal(homeResult('other',200,Buffer.from('')).ok,false);
});

test('journey acceptance rejects missing explanatory copy or accessible navigation in all locales',async()=>{
 const {journeyResult}=await import('../scripts/public-journey-acceptance.mjs');
 const {PUBLIC_TOOLS_COPY}=await import('../lib/public-tools-copy.mjs');
 for(const locale of ['es','en','pt'])for(const route of ['guide','assistant','measurement']){
  const c=PUBLIC_TOOLS_COPY[locale];
  const markers=route==='guide'?[c.guide.title,c.guide.intro]:route==='assistant'?[c.assistant.title,c.intake.privacy]:[c.comparison.exampleNotice,c.comparison.disclaimer];
  const html='<a href="#afw-main-content">Skip</a><nav id="afw-primary-navigation"></nav><span id="afw-main-content"></span><main>'+markers.join('<p>')+'</main>';
  assert.equal(journeyResult(route,locale,200,Buffer.from(html)).ok,true);
  for(const marker of [...markers,'href="#afw-main-content"','id="afw-main-content"','id="afw-primary-navigation"']){
   assert.equal(journeyResult(route,locale,200,Buffer.from(html.replace(marker,''))).ok,false);
  }
  assert.equal(journeyResult(route,locale,403,Buffer.from(html)).ok,false);
 }
 assert.equal(journeyResult('unknown','es',200,Buffer.from('')).ok,false);
});
