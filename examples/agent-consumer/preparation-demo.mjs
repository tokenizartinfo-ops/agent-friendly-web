import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {consumeCapsulePreparation} from './preparation-client.mjs';
export function buildPreparationDemo(){
 const request={contract:'agentfriendly.capsule-prepare.v1',expectedRevision:3,idempotencyKey:'reference-demo-0001'};
 const flags={executionAllowed:false,chargeAllowed:false,publicationAllowed:false};
 const unknown={contract:request.contract,code:'unknown_ack',replayed:null,preparation:null,...flags,
  recovery:{action:'check_preparation',nextTool:'reconcile_capsule_preparation',reuseOriginalRequest:true,automaticRetry:false,automaticReconnect:false,message:'Consultar la misma solicitud.'}};
 const known={contract:request.contract,code:'prepared',replayed:true,...flags,
  preparation:{capsuleRef:'123e4567-e89b-42d3-a456-426614174000',version:1,manifestSha256:'a'.repeat(64),sourceRevision:3},
  recovery:{action:'review_capsule',nextTool:null,reuseOriginalRequest:false,automaticRetry:false,automaticReconnect:false,message:'Borrador para revisar.'}};
 return {synthetic:true,isEfficiencyEvidence:false,label:'Fixtures ficticios; no se llamó a un servicio ni se preparó una cápsula real.',
  uncertain:consumeCapsulePreparation(unknown,{method:'prepare',request}),
  reconciled:consumeCapsulePreparation(known,{method:'reconcile',request})};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))process.stdout.write(JSON.stringify(buildPreparationDemo(),null,2)+'\n');
