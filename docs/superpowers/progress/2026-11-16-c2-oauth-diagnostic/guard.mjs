import {networkInterfaces} from 'node:os';
import {isMainThread} from 'node:worker_threads';
import {mkdir,writeFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
const uid=Number(process.env.AFW_C2_DIAG_PARENT_UID),gid=Number(process.env.AFW_C2_DIAG_PARENT_GID),root=resolve(process.env.AFW_C2_DIAG_ROOT??'');
const uidMatches=Number.isSafeInteger(uid)&&uid>0&&process.getuid()===uid,gidMatches=Number.isSafeInteger(gid)&&gid>=0&&process.getgid()===gid;
const groupsCleared=process.getgroups().every(value=>value===gid),interfaces=networkInterfaces();
const loopbackOnly=Object.keys(interfaces).length===1&&Array.isArray(interfaces.lo)&&interfaces.lo.length>0&&interfaces.lo.every(v=>v.internal)&&interfaces.lo.some(v=>v.address==='127.0.0.1');
const proof={schema:'afw.c2-oauth-custody.v1',uidMatches,gidMatches,groupsCleared,loopbackOnly};
if(!uidMatches||!gidMatches||!groupsCleared||!loopbackOnly||!process.env.AFW_C2_DIAG_ROOT)throw Error('C2_DIAGNOSTIC_CUSTODY_UNAVAILABLE');
if(isMainThread){
 await mkdir(join(root,'custody-probes'),{recursive:true});
 await writeFile(join(root,'custody-probes',String(process.pid)+'.json'),JSON.stringify(proof)+'\n',{flag:'wx',mode:0o600});
 process.stdout.write('AFW_C2_OAUTH_CUSTODY '+JSON.stringify(proof)+'\n');
}
