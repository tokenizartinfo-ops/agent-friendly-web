import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,relative,dirname} from 'node:path';
export async function persistBudgetEvidence({path,full,testRevision,caseName,counts}){
 if(typeof path!=='string'||!/^output\/(?:finite-budget|owner-reference|owner-cleanup)\/[a-zA-Z0-9_./-]+\.json$/.test(path)||path.split('/').some(part=>part==='..'||part===''))throw Error('SYN evidence fixed path required');
 const target=resolve(path),root=resolve('output'),rel=relative(root,target);if(rel.startsWith('..')||rel===root)throw Error('SYN evidence path outside fixed output');
 if(!(testRevision===null||typeof testRevision==='string'&&/^[a-f0-9]{40}$/.test(testRevision))||typeof caseName!=='string'||!/^[a-zA-Z0-9_-]{1,96}$/.test(caseName))throw Error('SYN evidence provenance required');
 const bytes=Buffer.from(JSON.stringify(full,null,2),'utf8');await mkdir(dirname(target),{recursive:true});await writeFile(target,bytes);
 const sha256=createHash('sha256').update(bytes).digest('hex'),safeCounts={};
 for(const key of ['tests','pass','fail','nativeStarted','nativeSettled','nativeRejected','logicalDenied','cancelStarted','cancelSettled','roots','children'])if(Number.isSafeInteger(counts?.[key])&&counts[key]>=0)safeCounts[key]=counts[key];
 const summary=JSON.stringify({purpose:'afw.finite-budget-evidence.syn.v1',source:testRevision,caseName,status:'preserved',counts:safeCounts,path,bytes:bytes.length,sha256,operationalReadiness:false,completePackage:false,PCoff:false});
 if(Buffer.byteLength(summary,'utf8')>2048)throw Error('SYN bounded evidence summary exceeded');
 return {path,bytes:bytes.length,sha256,summary};
}
