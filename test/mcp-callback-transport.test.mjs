import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createServer} from 'node:https';
import {checkServerIdentity} from 'node:tls';
import {build} from 'esbuild';
import {signMcpVerification,matchesMcpVerificationReply} from '../lib/mcp-signed-envelope.mjs';

const target='https://callback.agentfriendlyweb.dev/hook';
const challenge=Buffer.alloc(32,7).toString('base64url');
const envelope=()=>signMcpVerification(challenge,'verify-1','subscription-1','whsec_'+Buffer.alloc(32).toString('base64'),Date.now());
async function fixture(){
 const root=await mkdtemp(join(tmpdir(),'afw-callback-tls-')),key=join(root,'key.pem'),cert=join(root,'cert.pem'),id='afw-test-'+crypto.randomUUID();let server;
 try{
  const openssl=process.platform==='win32'?'C:/Program Files/Git/usr/bin/openssl.exe':'openssl';
  execFileSync(openssl,['req','-x509','-newkey','rsa:2048','-nodes','-days','1','-keyout',key,'-out',cert,'-subj','/CN=callback.agentfriendlyweb.dev','-addext','subjectAltName=DNS:callback.agentfriendlyweb.dev'],{stdio:'ignore'});
  const ca=await readFile(cert),state={queries:[],pins:[],received:[],cancellations:0,a:['8.8.8.8'],aaaa:[],timers:[],mode:'echo',trusted:true};
  state.resolve=async(family,hostname)=>{state.queries.push({family,hostname});if(state.mode==='dns-stall')return new Promise(()=>{});const result=family===4?state.a:state.aaaa;if(result instanceof Error)throw result;return result;};
  server=createServer({key:await readFile(key),cert:ca},async(req,res)=>{let body='';for await(const chunk of req)body+=chunk;state.received.push({url:req.url,headers:req.headers,body});
   if(state.mode==='headers-stall')return;
   if(state.mode==='redirect'){res.writeHead(302,{Location:'https://127.0.0.1/private'});res.end();return;}
   if(state.mode==='large'){res.end('x'.repeat(1025));return;}
   if(state.mode==='encoded'){res.writeHead(200,{'Content-Encoding':'gzip'});res.end('fake');return;}
   if(state.mode==='bad-utf8'){res.end(Buffer.from([0xff]));return;}
   if(state.mode==='bom'){res.end('\ufeff'+JSON.stringify({challenge}));return;}
   if(state.mode==='body-stall'){res.writeHead(200);res.write('x');const t=setInterval(()=>{if(!res.destroyed)res.write('x');},100);state.timers.push(t);res.on('close',()=>clearInterval(t));return;}
   res.end(JSON.stringify({challenge}));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const port=server.address().port;
  // TEST ONLY: inspect the original pinned lookup, then redirect the dial to
  // our local socket and inject its CA. Product has no connector/CA override.
  state.connect=(options,callback,nativeRequest)=>{
   assert.equal(options.method,'POST');assert.equal(options.agent,false);assert.equal(options.autoSelectFamily,false);assert.equal(options.rejectUnauthorized,true);assert.equal(options.checkServerIdentity,checkServerIdentity);assert.equal(options.servername,options.hostname);
   let pinned;options.lookup(options.hostname,{all:false},(error,address,family)=>{assert.ifError(error);pinned={address,family};});assert.ok(pinned);state.pins.push(pinned);
   return nativeRequest({...options,hostname:'127.0.0.1',port,lookup:undefined,...(state.trusted?{ca}:{})},callback);
  };
  globalThis[id]=state;
  const bundle=await build({stdin:{resolveDir:process.cwd(),contents:"export {sendSignedMcpCallback} from './lib/mcp-callback-transport.mjs';"},bundle:true,write:false,format:'esm',platform:'node',plugins:[{name:'test-only-callback-native-imports',setup(builder){builder.onResolve({filter:/^node:(https|dns\/promises)$/},args=>args.namespace==='test-callback'?{path:args.path,external:true}:{path:args.path,namespace:'test-callback'});builder.onLoad({filter:/.*/,namespace:'test-callback'},args=>({loader:'js',contents:args.path==='node:https'?`import {request as nativeRequest} from 'node:https';export function request(options,callback){return globalThis[${JSON.stringify(id)}].connect(options,callback,nativeRequest);}`:`export class Resolver{resolve4(host){return globalThis[${JSON.stringify(id)}].resolve(4,host);}resolve6(host){return globalThis[${JSON.stringify(id)}].resolve(6,host);}cancel(){globalThis[${JSON.stringify(id)}].cancellations++;}}`}));}}]});
  const file=join(root,'transport.mjs');await writeFile(file,bundle.outputFiles[0].text);const transport=await import(pathToFileURL(file).href);
  return {state,send:transport.sendSignedMcpCallback,async close(){for(const t of state.timers)clearInterval(t);server.closeAllConnections();await new Promise(resolve=>server.close(resolve));delete globalThis[id];await rm(root,{recursive:true,force:true});}};
 }catch(error){server?.closeAllConnections();if(server)await new Promise(resolve=>server.close(resolve));delete globalThis[id];await rm(root,{recursive:true,force:true});throw error;}
}

test('signed callback transport sends exact bytes through native HTTPS with original Host and pinned lookup',async()=>{
 const f=await fixture();try{const message=envelope(),result=await f.send(target,message);assert.equal(matchesMcpVerificationReply(challenge,result.status,result.body),true);assert.equal(Object.isFrozen(result),true);assert.equal(f.state.received[0].body,message.body);assert.equal(f.state.received[0].headers.host,'callback.agentfriendlyweb.dev');assert.equal(f.state.received[0].headers['webhook-signature'],message.headers['webhook-signature']);assert.deepEqual(f.state.pins,[{address:'8.8.8.8',family:4}]);
  f.state.a=['1.1.1.1'];await f.send(target,message);assert.equal(f.state.queries.length,4);assert.deepEqual(f.state.pins[1],{address:'1.1.1.1',family:4});
 }finally{await f.close();}
});
test('mixed/private/malformed/empty DNS and unexpected resolver errors reject before any socket',async()=>{
 const f=await fixture();try{for(const [a,aaaa] of [[['8.8.8.8','127.0.0.1'],[]],[['8.8.8.8'],['::1']],[['bad'],[]],[[],[]],[Object.assign(new Error('sensitive resolver data'),{code:'ESERVFAIL'}),[]],[['8.8.8.8'],Array(65).fill('2606:4700::1')]]){f.state.a=a;f.state.aaaa=aaaa;await assert.rejects(f.send(target,envelope()),/^Error: MCP callback transport unavailable$/);}assert.equal(f.state.pins.length,0);assert.equal(f.state.received.length,0);
  f.state.a=['8.8.8.8'];f.state.aaaa=Object.assign(new Error('no record'),{code:'ENODATA'});assert.equal((await f.send(target,envelope())).status,200);
 }finally{await f.close();}
});
test('native TLS rejects wrong certificate hostname and an untrusted chain without sending a body',async()=>{
 const f=await fixture();try{await assert.rejects(f.send('https://other.agentfriendlyweb.dev/hook',envelope()),/MCP callback transport unavailable/);f.state.trusted=false;await assert.rejects(f.send(target,envelope()),/MCP callback transport unavailable/);assert.equal(f.state.received.length,0);}finally{await f.close();}
});
test('redirects, excessive responses, compression and invalid UTF8 fail without another connection',async()=>{
 const f=await fixture();try{for(const mode of ['redirect','large','encoded','bad-utf8']){f.state.mode=mode;const before=f.state.pins.length;await assert.rejects(f.send(target,envelope()),/MCP callback transport unavailable/);assert.equal(f.state.pins.length,before+1);}assert.equal(f.state.received.length,4);}finally{await f.close();}
});
test('callback validation rejects mutable/accessor envelopes and arbitrary headers before DNS',async()=>{
 const f=await fixture();try{const valid=envelope(),getter=Object.freeze(Object.defineProperty({},'body',{get(){throw Error('must not invoke');},enumerable:true}));for(const message of [{...valid},getter,Object.freeze({...valid,headers:Object.freeze({...valid.headers,Authorization:'forbidden'})}),Object.freeze({...valid,body:'x'.repeat(262145)})])await assert.rejects(f.send(target,message),/MCP callback transport unavailable/);assert.equal(f.state.queries.length,0);const abort=new AbortController();abort.abort();await assert.rejects(f.send(target,valid,abort.signal),/MCP callback transport unavailable/);assert.equal(f.state.queries.length,0);}finally{await f.close();}
});
test('one hard deadline includes stalled DNS, stalled headers and a continuously dripping body',async()=>{
 const f=await fixture();try{for(const mode of ['dns-stall','headers-stall','body-stall']){f.state.mode=mode;const began=performance.now();await assert.rejects(f.send(target,envelope()),/MCP callback transport unavailable/);assert.ok(performance.now()-began>=4500,mode);assert.ok(performance.now()-began<10000,mode);}assert.ok(f.state.cancellations>=3);}finally{await f.close();}
});
test('caller cancellation destroys a request waiting for headers',async()=>{
 const f=await fixture();try{f.state.mode='headers-stall';const abort=new AbortController(),pending=f.send(target,envelope(),abort.signal);const timer=setTimeout(()=>abort.abort(),200);try{await assert.rejects(pending,/MCP callback transport unavailable/);}finally{clearTimeout(timer);}assert.ok(f.state.cancellations>0);}finally{await f.close();}
});

test('invalid cancellation input fails without invoking caller methods or DNS',async()=>{
 const f=await fixture();try{let invoked=0;const signal={removeEventListener(){invoked++;throw Error('caller method');}};await assert.rejects(f.send(target,envelope(),signal),/^Error: MCP callback transport unavailable$/);assert.equal(invoked,0);assert.equal(f.state.queries.length,0);}finally{await f.close();}
});

test('genuine AbortSignal overridden listener methods cannot prevent settlement or leak errors',async()=>{
 const f=await fixture();try{const abort=new AbortController();let invoked=0;abort.signal.removeEventListener=()=>{invoked++;throw Error('caller detail');};await assert.rejects(Promise.race([f.send('invalid',envelope(),abort.signal),new Promise((_,reject)=>setTimeout(()=>reject(Error('never settled')),250))]),/^Error: MCP callback transport unavailable$/);assert.equal(invoked,0);assert.equal(f.state.queries.length,0);}finally{await f.close();}
});

test('UTF8 decoding preserves BOM so the strict verification helper rejects it',async()=>{
 const f=await fixture();try{f.state.mode='bom';const result=await f.send(target,envelope());assert.equal(result.body.charCodeAt(0),0xfeff);assert.equal(matchesMcpVerificationReply(challenge,result.status,result.body),false);}finally{await f.close();}
});
