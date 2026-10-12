// TEST ONLY: standalone synthetic Node receiver; no public callback or platform
// identity claim. Boot capability arrives through IPC, never argv or logs.
import {createServer} from 'node:http';
import {createPrivateNodeBridge,createPrivateNodeDispatchHandler} from '../../lib/mcp-node-private-bridge.mjs';
process.once('message',async boot=>{
 try{
  const bridge=createPrivateNodeBridge({...boot.bridge,key:Buffer.from(boot.bridge.key,'base64'),now:Date.now});
  const handler=createPrivateNodeDispatchHandler({enabled:true,bridge,consume:async request=>fetch(boot.controlUrl+new URL(request.url).pathname,{method:request.method,headers:request.headers,body:await request.text(),redirect:'error',signal:request.signal}),send:async(_url,envelope,signal)=>{if(signal.aborted)throw Error('cancelled');process.send({type:'synthetic_callback'});const v=JSON.parse(envelope.body);return{status:200,body:JSON.stringify({challenge:v.challenge})};}});
  const server=createServer(async(req,res)=>{try{let body='';for await(const chunk of req)body+=chunk;const reply=await handler(new Request('http://afw-node.internal'+req.url,{method:req.method,headers:req.headers,body}));res.writeHead(reply.status,Object.fromEntries(reply.headers));res.end(await reply.text());}catch{res.writeHead(500);res.end();}});
  server.listen(0,'127.0.0.1',()=>process.send({type:'ready',port:server.address().port}));
  const finish=()=>{server.closeAllConnections();server.close(()=>process.exit(0));};process.once('disconnect',finish);process.once('SIGTERM',finish);setTimeout(finish,Math.max(1,boot.bridge.expiresAt-Date.now())).unref();
 }catch{process.send({type:'unavailable'});process.exitCode=1;process.disconnect();}
});
