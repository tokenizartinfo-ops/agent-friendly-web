import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const REPO='tokenizartinfo-ops/agent-friendly-web',BASE='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',TREE='62e78926635d6b74f288d6c0d69e0f2516306989';
const BRANCH='refs/heads/lab/afw-c2-own-receiver-20261116-fix2',MESSAGE='AFW-C2-OWN-RECEIVER-FIX2-ONEUSE-20261116',JOB='c2-own-receiver-fix2',PREFIX='docs/superpowers/root-own/c2-t1-v2-fix2';
const pins=[{"path":"docs/superpowers/root-own/c2-t1-v2-fix2/own-receiver.mjs","blob":"f7994836872bcd00d19f6cead7ad1667fe16e44d","bytes":31155,"sha256":"fb23c3ec162136f24a4519a09eab3acd04113f8369ed5304e7a58313e4d7bb2c"},{"path":"docs/superpowers/root-own/c2-t1-v2-fix2/own-controls.mjs","blob":"1d04d617be16f9e84e6f1b57ff48347ae91b267e","bytes":19486,"sha256":"e69f12c2389616f1517dbd8f5472cda511c01b6fab2a42f6fe366afbe6a234c7"},{"path":"docs/superpowers/root-own/c2-t1-v2-fix2/fix2-vectors.json","blob":"6e5929efbd58acd113bfdf5813fe2670a6cccca4","bytes":107420,"sha256":"5f7166dc286946ee89ee61c70ea4c614f392e006ccbd1998d4611f05b66a9eef"},{"path":"docs/superpowers/root-own/c2-t1-v2-fix2/fixture-first.json","blob":"8a53d5b1e55dc8e62339f9d23b5dcb5168cab3c0","bytes":34834,"sha256":"e00942909c3eab5a0d8ee5fffe9c625d38e7566fdc648baf4eb6998dcc8612bf"},{"path":"docs/superpowers/root-own/c2-t1-v2-fix2/diagnostic-schema.json","blob":"552301a29267a19d8a6b57fd0e1d105286d859d3","bytes":9686,"sha256":"80af228d31d39d4759b222ac47be7fd5f62f5ec05514e23f7170d1ec7fc437ab"}];
const sha=s=>createHash('sha256').update(s).digest('hex'),fail=()=>{throw Error('OWN_CLOUD_CONTROL_FAILED');};
let phase='admission';
try{
 const root=resolve(process.cwd());
 if(process.argv.length!==2||process.version!=='v22.23.4'||process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!==BRANCH||process.env.GITHUB_JOB!==JOB||process.env.GITHUB_EVENT_NAME!=='push'||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9]\d*$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA??'')||root!==resolve(process.env.GITHUB_WORKSPACE??'')||fileURLToPath(import.meta.url)!==join(root,PREFIX,'run-cloud-controls.mjs'))fail();
 const git=args=>{const r=spawnSync('git',args,{encoding:'utf8',timeout:10000,maxBuffer:65536,stdio:['ignore','pipe','pipe']});if(r.error||r.signal||r.status!==0)fail();return r.stdout.trim();};
 if(git(['rev-parse','HEAD'])!==process.env.GITHUB_SHA||git(['rev-parse','HEAD^'])!==BASE||git(['rev-parse',BASE+'^{tree}'])!==TREE||git(['show','-s','--format=%B','HEAD'])!==MESSAGE)fail();
 const tree=git(['rev-parse','HEAD^{tree}']),texts={};
 phase='immutable-inputs';
 for(const pin of pins){const b=await readFile(join(root,pin.path));if(b.length!==pin.bytes||sha(b)!==pin.sha256||createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex')!==pin.blob)fail();texts[pin.path.split('/').at(-1)]=b.toString('utf8');}
 phase='module-graph';
 const {c2OwnControls,c2OwnSourceAssemblyControls,c2OwnFix2Controls}=await import('./own-controls.mjs');
 phase='synthetic-controls';
 const first=c2OwnControls(JSON.parse(texts['fixture-first.json']),JSON.parse(texts['diagnostic-schema.json']),sha),second=c2OwnSourceAssemblyControls(first.fixtures,sha),third=c2OwnFix2Controls(JSON.parse(texts['fix2-vectors.json']),JSON.parse(texts['diagnostic-schema.json']),sha);
 if(first.results.failed.length||second.results.failed.length||third.failed.length||first.results.passed.length!==187||second.results.passed.length!==28||third.passed.length!==10)fail();
 const result={schema:'afw.c2-own-cloud-controls.v2',repository:REPO,baselineSource:BASE,baselineTree:TREE,head:process.env.GITHUB_SHA,tree,runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:JOB,node:process.version,receiverBlob:'f7994836872bcd00d19f6cead7ad1667fe16e44d',controlsBlob:'1d04d617be16f9e84e6f1b57ff48347ae91b267e',ownChecks:187,sourceAssemblyChecks:28,fix2Checks:10,failed:0,moduleGraphLoaded:true,SourceExecuted:false,SourceQualified:false,Task1Pass:false,PCoff:false};
 process.stdout.write('AFW_C2_OWN_CONTROLS '+JSON.stringify(result)+'\n');
}catch{process.stderr.write('AFW_C2_OWN_CONTROL_FAILURE '+JSON.stringify({schema:'afw.c2-own-control-failure.v1',phase,SourceExecuted:false,SourceQualified:false,Task1Pass:false,PCoff:false})+'\n');process.exitCode=1;}
