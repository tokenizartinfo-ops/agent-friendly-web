import {pathToFileURL} from 'node:url';
import {createPrivateChallengeClient} from '../lib/assistance-private-challenge-client.mjs';
export async function runPrivateChallengeClient(args,env=process.env,dependencies={}){
 if(args.length!==4||args[0]!=='confirm'||!args.slice(2).every(x=>/^(0|[1-9][0-9]*)$/.test(x)))throw Error('Private challenge exchange unavailable');
 return createPrivateChallengeClient({env,...dependencies}).confirm({recordRef:args[1],startAt:Number(args[2]),deadline:Number(args[3])});
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{process.stdout.write(JSON.stringify(await runPrivateChallengeClient(process.argv.slice(2)))+'\n');}
 catch{process.stderr.write('Private challenge exchange unavailable\n');process.exitCode=1;}
}
