import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {realpath} from 'node:fs/promises';
const exec=promisify(execFile);
// Inputs to the own Worker/Node builders. Dependencies must separately be
// installed from the accepted lockfile; this is not dependency attestation.
const inputs=['lib','worker','scripts','package.json','package-lock.json','tsconfig.json','.npmrc'];
export async function verifyMcpReleaseSource({cwd,sourceRevision}={}){
 try{
  if(typeof cwd!=='string'||typeof sourceRevision!=='string'||!/^[a-f0-9]{40}$/.test(sourceRevision))throw Error();
  const git=async args=>(await exec('git',args,{cwd,encoding:'utf8',timeout:10000,maxBuffer:1048576,windowsHide:true})).stdout.trim();
  if(await realpath(await git(['rev-parse','--show-toplevel']))!==await realpath(cwd))throw Error();
  const head=await git(['rev-parse','HEAD']);if(head!==sourceRevision)throw Error();
  const entries=await git(['ls-files','-v','-z','--',...inputs]);if(entries.split('\0').filter(Boolean).some(v=>!v.startsWith('H ')))throw Error();
  if(await git(['ls-files','--others','--ignored','--exclude-standard','--',...inputs]))throw Error();
  if(await git(['status','--porcelain=v1','--untracked-files=all','--',...inputs]))throw Error();
  const tree=await git(['rev-parse','HEAD^{tree}']);if(!/^[a-f0-9]{40}$/.test(tree)||await git(['rev-parse','HEAD'])!==head)throw Error();
  return Object.freeze({sourceRevision:head,tree});
 }catch{throw Error('Release source unavailable');}
}
