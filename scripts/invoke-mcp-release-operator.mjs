import {fileURLToPath} from 'node:url';
import {resolve,join} from 'node:path';
import {tmpdir} from 'node:os';
import {mkdtemp,writeFile} from 'node:fs/promises';
import {checkOwnCronProvider} from './check-own-cron-provider.mjs';

async function connectRemoteOperator(){
 // Temporary non-secret config: no HTTP listener, no local credentials file.
 const directory=await mkdtemp(join(tmpdir(),'afw-release-invoker-')),configPath=join(directory,'wrangler.json');
 await writeFile(configPath,JSON.stringify({name:'afw-release-invoker-local',account_id:'85d0d5dadac3341a564f22ce885e9eec',compatibility_date:'2026-09-07',services:[{binding:'RELEASE_OPERATOR',service:'agent-friendly-web-release-operator',entrypoint:'AfwReleaseOperator',remote:true}]}));
 const {getPlatformProxy}=await import('wrangler');return getPlatformProxy({configPath,envFiles:[],persist:false,remoteBindings:true});
}
export async function invokeReleaseOperator({planHash,checkProvider=checkOwnCronProvider,connect=connectRemoteOperator}={}){
 let proxy;
 const outcome=status=>({status,mayRetry:false,operationalReadiness:false});
 try{
  if(typeof planHash!=='string'||!/^[a-f0-9]{64}$/.test(planHash))return outcome('blocked');
  const gate=await checkProvider();if(gate.providerGate!=='resolved'||gate.mayRunClosedVerification!==true)return outcome('blocked');
  proxy=await connect();
  const result=await proxy.env.RELEASE_OPERATOR.run(planHash);
  if(result?.mayDeploy!==false&&result?.mayLaunch!==false)return outcome('uncertain');
  // Return only non-secret journal references, never arbitrary RPC text/errors.
  const receipt={};for(const key of ['artifactKey','activationKey','versionId','deploymentId'])if(typeof result[key]==='string'&&/^[a-f0-9-]{32,64}$/.test(result[key]))receipt[key]=result[key];
  return {...outcome('confirmed'),receipt};
 }catch{return outcome('uncertain');}finally{if(proxy)try{await proxy.dispose();}catch{/* No retry after a disposable connection fails. */}}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 if(process.argv.length!==4||process.argv[2]!=='--execute-closed-release')throw Error('Explicit --execute-closed-release and accepted plan hash required');
 const result=await invokeReleaseOperator({planHash:process.argv[3]});process.stdout.write(JSON.stringify(result)+'\n');process.exitCode=result.status==='confirmed'?0:result.status==='blocked'?2:1;
}
