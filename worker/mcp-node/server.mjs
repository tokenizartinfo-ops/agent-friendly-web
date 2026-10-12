import {createHash} from 'node:crypto';
import {startMcpNodeHttpServer} from '../../lib/mcp-node-http-server.mjs';

// Runtime private environment only. Removing this variable does not claim
// secure erasure of process memory or of the provider's environment history.
async function main(){
 const raw=process.env.AFW_NODE_BOOTSTRAP;delete process.env.AFW_NODE_BOOTSTRAP;
 if(typeof raw!=='string'||Buffer.byteLength(raw)>2048)throw Error();
 const input=JSON.parse(raw);
 if(!input||Object.keys(input).length!==2||!Object.hasOwn(input,'manifest')||!Object.hasOwn(input,'key')||typeof input.key!=='string')throw Error();
 const key=Buffer.from(input.key,'base64');if(key.length!==32||key.toString('base64')!==input.key)throw Error();
 const args=process.execArgv;
 if(args.length!==3||args[0]!=='--input-type=module'||args[1]!=='-e'||typeof args[2]!=='string'||createHash('sha256').update(args[2]).digest('hex')!==input.manifest?.programHash)throw Error();
 let runtime;
 try{runtime=await startMcpNodeHttpServer({manifest:input.manifest,key});}finally{key.fill(0);input.key='';}
 process.once('SIGTERM',()=>runtime.stop());process.once('SIGINT',()=>runtime.stop());
}
main().catch(()=>{process.stderr.write('AFW Node unavailable\n');process.exitCode=1;});
