import {createDiscoveryCapture} from '../lib/mcp-discovery-capture.mjs';
// Stdin only. This filter neither creates nor deletes a Cloudflare tail.
// The operator must supervise/close the upstream tail independently.
let timer,finished=false;
const end=code=>{if(finished)return;finished=true;clearTimeout(timer);process.stdin.destroy();process.exitCode=code;};
try{
 const [sourceRevision,start,expires,...extra]=process.argv.slice(2);
 if(extra.length||!/^\d+$/.test(start??'')||!/^\d+$/.test(expires??''))throw Error();
 const startAt=Number(start),expiresAt=Number(expires),remaining=expiresAt-Date.now();
 if(remaining<=0||remaining>600000)throw Error();
 const capture=createDiscoveryCapture({sourceRevision,startAt,expiresAt,emit:row=>process.stdout.write(JSON.stringify(row)+'\n')});
 process.stdin.setEncoding('utf8');
 process.stdin.on('data',chunk=>{try{capture.push(chunk);}catch{process.stderr.write('AFW capture unavailable\n');end(2);}});
 process.stdin.on('end',()=>{if(finished)return;try{capture.finish();end(0);}catch{process.stderr.write('AFW capture incomplete\n');end(2);}});
 process.stdin.on('error',()=>end(2));process.stdout.on('error',()=>end(2));
 timer=setTimeout(()=>{process.stderr.write('AFW capture window ended\n');end(2);},remaining);
}catch{process.stderr.write('AFW capture unavailable\n');end(2);}
