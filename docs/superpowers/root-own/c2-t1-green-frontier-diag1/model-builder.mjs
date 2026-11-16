// OWN model utility only. No Source code or actual private data is executed.
function gCopy(x){return JSON.parse(JSON.stringify(x));}
function gPatch(root,p){const[op,path,value]=p;let a=root;for(const k of path.slice(0,-1))a=a[k];const k=path.at(-1);if(op==='set')a[k]=gCopy(value);else if(op==='delete')delete a[k];else if(op==='splice')a[k].splice(...value);else if(op==='reverse')a[k]=Object.fromEntries(Object.entries(a[k]).reverse());else throw Error('MODEL_PATCH');}
const gCrcTable=Array.from({length:256},(_,n)=>{for(let i=0;i<8;i++)n=n&1?(n>>>1)^0xedb88320:n>>>1;return n>>>0;});
function gModelCrc(b){let n=0xffffffff;for(const x of b)n=(n>>>8)^gCrcTable[(n^x)&255];return(n^0xffffffff)>>>0;}
function gModelZip(text,name,o={},deflate){
 const p=Buffer.from(text),n=Buffer.from(o.name??name),le=Buffer.from(o.localExtra??'','hex'),ce=Buffer.from(o.centralExtra??'','hex'),m=o.method??0,dd=o.dd??false,crc=gModelCrc(p);
 let z=m===8?deflate(p):p;if(o.tail)z=Buffer.concat([z,Buffer.from('deadbeef','hex')]);
 const l=Buffer.alloc(30);l.writeUInt32LE(0x04034b50);l.writeUInt16LE(o.version??20,4);l.writeUInt16LE(dd?8:0,6);l.writeUInt16LE(m,8);l.writeUInt16LE(n.length,26);l.writeUInt16LE(le.length,28);
 const fields=dd&&!o.match?[0,0,0]:[crc,z.length,p.length];if(o.badLocal)fields[o.badLocal-1]=(fields[o.badLocal-1]+1)>>>0;
 l.writeUInt32LE(fields[0],14);l.writeUInt32LE(fields[1],18);l.writeUInt32LE(fields[2],22);
 let d=Buffer.alloc(0);if(dd){const signed=o.signed!==false;d=Buffer.alloc(signed?16:12);let i=0;if(signed){d.writeUInt32LE(0x08074b50);i=4;}d.writeUInt32LE(crc,i);d.writeUInt32LE(z.length,i+4);d.writeUInt32LE(p.length,i+8);}
 const c=Buffer.alloc(46);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(o.version??20,6);c.writeUInt16LE(dd?8:0,8);c.writeUInt16LE(m,10);c.writeUInt32LE(crc,16);c.writeUInt32LE(z.length,20);c.writeUInt32LE(p.length,24);c.writeUInt16LE(n.length,28);c.writeUInt16LE(ce.length,30);
 const cd=Buffer.concat([c,n,ce]),offset=30+n.length+le.length+z.length+d.length,e=Buffer.alloc(22);e.writeUInt32LE(0x06054b50);e.writeUInt16LE(1,8);e.writeUInt16LE(1,10);e.writeUInt32LE(cd.length,12);e.writeUInt32LE(offset,16);
 let all=Buffer.concat([l,n,le,z,d,cd,e]);if(o.corrupt==='crc'){all.writeUInt32LE((crc^1)>>>0,14);all.writeUInt32LE((crc^1)>>>0,offset+16);}if(o.corrupt==='entries'){all.writeUInt16LE(2,all.length-14);all.writeUInt16LE(2,all.length-12);}if(o.corrupt==='bounds')all.writeUInt32LE(offset+1,all.length-6);return all;
}
function g20Build(seed,vector,hash,deflate){
 const v=gCopy(seed.variants[vector.variant??'action']),ctx=gCopy(seed.context),e=gCopy(seed.expected),rows=v.events;
 const journalText=rows.map(x=>JSON.stringify(x)+'\n').join('')+v.rawSuffix;
 const stdout='TAP version 13\n'+v.native.cases.map((c,i)=>'# Subtest: '+c.id+'\n'+(c.status==='pass'?'ok':'not ok')+' '+(i+1)+' - '+c.id+'\n').join('');
 const stderr=v.recorderFault?'AFW_C2_GREEN_RECORDER_FAULT\n':'';
 const custody={schema:'afw.c2-green20-frontier-diag1-custody.v1',context:gCopy(ctx),parentNonRoot:true,preflightOwned:true,preflightRemoved:true,checkedLaunches:2,preflightProcesses:1,greenProcesses:1,checkedProcesses:2,uidGidGroupsLoopbackMatched:true,targetsBeforeMatched:true,targetsAfterMatched:true,journalOwnershipMatched:true,ownRootVerified:true,ownTempRemoved:true};
 const outcome={schema:'afw.c2-green20-frontier-diag1-outcome.v1',context:gCopy(ctx),diagnosticCollectionComplete:true,nativeQualification:false,sourceReads:{beforeSha256:gCopy(seed.sourceHashes),afterSha256:gCopy(seed.sourceHashes)},observation:{capture:{exitCode:v.exitCode,signal:'none',errorKind:v.errorKind,stdout:{bytes:Buffer.byteLength(stdout),sha256:hash(stdout)},stderr:{bytes:Buffer.byteLength(stderr),sha256:hash(stderr)}},journal:{bytes:Buffer.byteLength(journalText),sha256:hash(journalText),stable:true,recorderFaultObserved:v.recorderFault},witness:{integrity:v.integrity,frontier:v.frontier,events:rows,openCase:v.openCase,afterOpen:v.afterOpen},unknownReason:v.unknownReason,firstThrowSequence:v.firstThrowSequence,native:v.native},custody:gCopy(custody),SourceQualified:false,Task1Pass:false,nonclaims:gCopy(seed.nonclaims)};
 const trusted={expected:e,bodyEdges:gCopy(seed.bodyEdges),bodyEdgesHash:hash(JSON.stringify(seed.bodyEdges))};
 const run={id:e.runId,run_attempt:1,head_sha:e.head,head_branch:e.branch,path:e.workflowPath,event:'push',status:'completed',conclusion:'success',repository:{full_name:e.repository},head_repository:{full_name:e.repository},created_at:'2037-01-02T03:09:59Z',run_started_at:'2037-01-02T03:10:00Z',updated_at:'2037-01-02T03:14:21Z'};
 const steps=e.requiredSteps.map((name,i)=>({number:i+2,name,status:'completed',conclusion:'success',started_at:['2037-01-02T03:10:00Z','2037-01-02T03:10:05Z','2037-01-02T03:10:10Z','2037-01-02T03:10:30Z','2037-01-02T03:13:40Z'][i],completed_at:['2037-01-02T03:10:05Z','2037-01-02T03:10:10Z','2037-01-02T03:10:30Z','2037-01-02T03:13:40Z','2037-01-02T03:14:15Z'][i]}));
 const item={id:99051003,name:'afw-c2-t1-green-frontier-diag1',expired:false,size_in_bytes:0,created_at:'2037-01-02T03:14:10Z',expires_at:'2037-01-09T03:14:10Z',workflow_run:{id:e.runId,head_sha:e.head,head_branch:e.branch},digest:''};
 const input={run,jobs:{total_count:1,jobs:[{id:e.jobId,run_id:e.runId,run_attempt:1,head_sha:e.head,name:e.job,status:'completed',conclusion:'success',started_at:'2037-01-02T03:10:00Z',completed_at:'2037-01-02T03:14:20Z',steps}]},commit:{sha:e.head,tree:{sha:e.tree},message:e.oneUseMessage,parents:[{sha:e.parent}]},tree:{sha:e.tree,truncated:false,tree:[...seed.bodyEdges.map(b=>({path:b.path,mode:b.mode,type:b.type,sha:b.blob,size:b.bytes})),{path:'test/fixtures/finite-first-connection-publication.mjs',mode:'100644',type:'blob',sha:'cede301c3e9cd95716ae2134f938dbb1d940e7a9',size:57864}]},transport:{runId:e.runId,jobId:e.jobId,rawLog:''},artifact:{runId:e.runId,jobId:e.jobId,listing:{total_count:1,artifacts:[item]},artifactId:item.id,fileName:'c2-t1-green-frontier-diag1.json',archiveBase64:'',payloadText:''}};
 const m={custody,outcome,trusted,input};for(const p of vector.patches??[])gPatch(m,p);
 if(vector.syncCustody!==false)outcome.custody=gCopy(custody);
 let pair=['AFW_C2_GREEN20_FRONTIER_DIAG1_CUSTODY '+JSON.stringify(custody),'AFW_C2_GREEN20_FRONTIER_DIAG1_OUTCOME '+JSON.stringify(outcome)];
 if(vector.wire==='missing')pair.pop();if(vector.wire==='duplicate')pair.push(pair[1]);if(vector.wire==='reverse')pair.reverse();if(vector.wire==='fault')pair.push('AFW_C2_GREEN20_FRONTIER_DIAG1_FAULT {}');
 if(vector.wire==='pretty')pair[1]=pair[1].replace('{','{ ');if(vector.wire==='dupKey')pair[1]=pair[1].replace('{"schema":','{"schema":"bad","schema":');if(vector.wire==='cr')pair[1]+='\r';if(vector.wire==='double')pair[1]+=' '+pair[1];
 const cmd='node docs/superpowers/source-lab/c2-t1-green-frontier-diag1/run-green-frontier-diag1.mjs';
 let log=['##[group]Run '+cmd,cmd,'##[endgroup]',...pair].map((s,i)=>'2037-01-02T03:'+(i<3?'10:30':'13:'+String(30+i-3))+'.0000000Z '+s).join('\n')+'\n';
 if(vector.log==='wrongCommand')log=log.replaceAll(cmd,cmd+'-alias');if(vector.log==='nan')log=log.replace('2037-01-02','2037-99-02');if(vector.log==='calendar')log=log.replaceAll('2037-01-02','2037-02-30');if(vector.log==='outside')log=log.replaceAll('03:13:','03:19:');if(vector.log==='unwrapped')log=log.replaceAll(/2037-01-02T[^ ]+ /g,'');if(vector.log==='hidden')log=log.replace('AFW_C2_GREEN20','prefixAFW_C2_GREEN20');if(vector.log==='noLF')log=log.slice(0,-1);
 input.transport.rawLog=log;let payload=JSON.stringify(outcome)+'\n';if(vector.payload==='extraLF')payload+='\n';if(vector.payload==='wrong')payload='{}\n';
 const zip=gModelZip(payload,input.artifact.fileName,vector.zip??{},deflate);input.artifact.archiveBase64=zip.toString('base64');input.artifact.payloadText=payload;item.size_in_bytes=zip.length;item.digest='sha256:'+hash(zip);
 for(const p of vector.post??[])gPatch(m,p);
 return m;
}
export {g20Build,gModelZip,gModelCrc,gPatch};
