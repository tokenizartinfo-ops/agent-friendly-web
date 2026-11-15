import {readFixed,jsonFixed} from './io.mjs';
import {admitControls} from './control-proof.mjs';
import {statSync,fstatSync} from 'node:fs';
import admitSite from './source-provenance.mjs';
import admitRaw from './raw-sample.mjs';
import schema from './site-schema.json' with {type:'json'};
import map from './site-map.json' with {type:'json'};
const e=process.env,nonclaims={"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false};
const badRead=e=>['AFW_INVALID','ELOOP','ENOTDIR','EISDIR'].includes(e?.code);
let context,delivery,sample=null;
try{
 if(process.versions.node!=='22.23.4'||e.GITHUB_REPOSITORY!=='tokenizartinfo-ops/agent-friendly-web'||e.GITHUB_REPOSITORY_ID!=='1347578006'||e.GITHUB_REF!=='refs/heads/feat/finite-native-cleanup-20261101'||e.GITHUB_JOB!=='readonly'||e.GITHUB_RUN_ATTEMPT!=='1'||!(typeof e.RUNNER_TEMP==='string'&&e.RUNNER_TEMP.startsWith('/')&&e.RUNNER_TEMP.length<=4096&&!e.RUNNER_TEMP.includes('\0'))||!/^[a-f0-9]{40}$/.test(e.GITHUB_SHA??'')||!/^[1-9][0-9]{0,19}$/.test(e.GITHUB_RUN_ID??''))throw 1;
 const b=jsonFixed(e.RUNNER_TEMP,['afw-r3-delivery','context.json'],2048);
 if(JSON.stringify(Object.keys(b))!==JSON.stringify(['purpose','source','sourceTree','run','attempt','job','node']))throw 1;
 if(b.purpose!=='afw.r3-delivery.binding.v1'||b.source!==e.GITHUB_SHA||b.run!==e.GITHUB_RUN_ID||b.attempt!==1||b.job!=='readonly'||b.node!=='22.23.4'||!/^[a-f0-9]{40}$/.test(b.sourceTree))throw 1;
 const image=fstatSync(3),current=statSync('/proc/self/exe');if(image.dev!==current.dev||image.ino!==current.ino||image.size!==current.size)throw 1;
 context={source:b.source,tree:b.sourceTree,run:b.run,attempt:1,job:'readonly'};
 admitControls(jsonFixed(e.RUNNER_TEMP,['afw-r3-delivery','controls-report.json'],24576),context);
 delivery={purpose:'afw.r3-delivery.result.v1',source:b.source,sourceTree:b.sourceTree,run:b.run,attempt:1,job:'readonly',node:'22.23.4',controls:'passed',availability:'unavailable',sourceQualified:false,collectionComplete:'unknown',sampleObserved:'unknown',reason:'source_missing',nonclaims};
 try{
  let site;try{site=readFixed(e.RUNNER_TEMP,['afw-site','public-result.json'],16384);}catch(e){delivery.reason=e?.code==='ENOENT'?'source_missing':badRead(e)?'source_invalid':'io_unavailable';throw 1;}
  let admitted;try{admitted=admitSite(site,context,schema,{programSet:'71b4454f4cd90f716852bbdbb44f686d7f46191e8d93f890c465a7cb5f29d9af',expanded:'cfcb0dc7992d27246dc785ef2991104f6715e61c9aa49cfddc0317b219e6ac91'},map.spans.map(x=>x.alias));}catch{delivery.reason='source_invalid';throw 1;}
  delivery.sourceQualified=true;delivery.collectionComplete=admitted.diagnosticCollectionComplete;
  let raw;try{raw=readFixed('.',['output','finite-budget','readonly','R3','r3-existing-sample.json'],4096);}catch(e){delivery.reason=e?.code==='ENOENT'?'sample_missing':badRead(e)?'sample_invalid':'io_unavailable';throw 1;}
  let a;try{a=admitRaw(raw,{...context,sourceQualified:admitted.sourceQualifiedForSample});}catch{delivery.reason='sample_invalid';throw 1;}
  sample=a.record;delivery.availability='available';delivery.sourceQualified=true;delivery.collectionComplete=admitted.diagnosticCollectionComplete;delivery.sampleObserved=a.sampleObserved;delivery.reason='none';
 }catch{}
 process.stdout.write(JSON.stringify({purpose:'afw.r3-delivery.envelope.v1',sample,delivery})+'\n');
}catch{process.exitCode=1;}
