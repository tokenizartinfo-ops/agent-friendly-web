import {spawn} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {runDiscoveryTailCapture} from '../lib/mcp-discovery-tail-runner.mjs';

// Own canary only; no token arguments, arbitrary commands, raw files or automatic activation.
const controller=new AbortController();
const cancel=()=>controller.abort();
try{
 const [sourceRevision,start,end,...extra]=process.argv.slice(2);
 const initial=Date.now();
 if(extra.length||!/^[a-f0-9]{40}$/.test(sourceRevision??'')||!/^\d+$/.test(start??'')||!/^\d+$/.test(end??''))throw Error();
 const startAt=Number(start),expiresAt=Number(end);
 if(!Number.isSafeInteger(startAt)||startAt<0||!Number.isSafeInteger(expiresAt)||startAt>initial||expiresAt<=initial||expiresAt-startAt>600000)throw Error();
 const root=fileURLToPath(new URL('../',import.meta.url)),dir=join(root,'output');mkdirSync(dir,{recursive:true});
 const outputFile=join(dir,`afw-discovery-capture-${randomUUID()}.ndjson`);
 process.once('SIGINT',cancel);process.once('SIGTERM',cancel);
 const result=await runDiscoveryTailCapture({sourceRevision,startAt,expiresAt,outputFile,signal:controller.signal,
  // Wrangler's bin wrapper spawns another Node process; supervise the actual
  // installed entrypoint so Windows termination cannot orphan that wrapper child.
  createChild:()=>spawn(process.execPath,['--no-warnings',join(root,'node_modules/wrangler/wrangler-dist/cli.js'),'tail','agent-friendly-web-delegated-canary','--format','json'],{
   cwd:root,stdio:['ignore','pipe','pipe'],windowsHide:true,
   env:{...process.env,CLOUDFLARE_ACCOUNT_ID:'85d0d5dadac3341a564f22ce885e9eec',WRANGLER_WRITE_LOGS:'false',WRANGLER_LOG:'error',WRANGLER_LOG_SANITIZE:'true',WRANGLER_SEND_METRICS:'false'},
  }),
 });
 process.stdout.write(JSON.stringify({outputFile,...result})+'\n');
 process.exitCode=result.reason==='eof'&&result.streamValid?0:2;
}catch{process.stderr.write('AFW capture unavailable\n');process.exitCode=2;}
finally{process.removeListener('SIGINT',cancel);process.removeListener('SIGTERM',cancel);}
