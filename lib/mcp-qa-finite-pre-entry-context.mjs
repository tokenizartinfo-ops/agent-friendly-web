import {finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';

export const QA_PRE_ENTRY_CUSTODY_RECEIPT_PURPOSE='afw.qa-pre-entry-custody.v3';
const purpose='afw.qa-pre-entry-custody-context.v3';
const qa=QA_CLOUD_CLOSED_PINS.qaClosed;
const inputKeys=['sourceRevision','releaseZipSha256','startAt','expiresAt'];
const fail=()=>{throw Error('Closed pre-entry custody context unavailable');};

export function createQaPreEntryCustodyContext(input){
 const {sourceRevision,releaseZipSha256,startAt,expiresAt}=fields(input,inputKeys);
 if(!hex(sourceRevision,40)||!hex(releaseZipSha256,64)||!time(startAt)||!time(expiresAt)||expiresAt<=startAt||expiresAt-startAt>600000)fail();
 const baselineVersionId=qa.id,baselineModuleHash=qa.module.sha256;
 const id=hash([purpose,sourceRevision,releaseZipSha256,baselineVersionId,baselineModuleHash,startAt,expiresAt]);
 return Object.freeze({purpose,id,sourceRevision,releaseZipSha256,baselineVersionId,baselineModuleHash,startAt,expiresAt});
}

/** Canonical content only. Runtime authority still depends on the closed
 * bindings, exact actor, admitted Workflow and current window. */
export function readQaPreEntryCustodyContext(value){
 const input=fields(value,['purpose','id','sourceRevision','releaseZipSha256','baselineVersionId','baselineModuleHash','startAt','expiresAt']);
 const context=createQaPreEntryCustodyContext({sourceRevision:input.sourceRevision,releaseZipSha256:input.releaseZipSha256,startAt:input.startAt,expiresAt:input.expiresAt});
 if(Object.keys(context).some(key=>input[key]!==context[key]))fail();
 return context;
}

export function renderQaPreEntryCustodyModule(value){
 return 'export const custodyContext=Object.freeze('+JSON.stringify(readQaPreEntryCustodyContext(value))+');\n';
}

function receiptTime(value){
 if(typeof value!=='string'||value.length!==24)fail();
 const stamp=Date.parse(value);
 if(!time(stamp)||new Date(stamp).toISOString()!==value)fail();
 return stamp;
}

function readActiveRole(value,observedAt,readAt){
 const role=fields(value,['status','expiresAt','notBefore']);
 if(role.status!=='active'||receiptTime(role.expiresAt)<=readAt||
    role.notBefore!==null&&receiptTime(role.notBefore)>observedAt)fail();
 return role;
}

/** Validate the observation against independently supplied run and archive pins.
 * This verifies receipt content only. The caller must verify provider provenance
 * and restoration independently before accepting the run. */
export function validateQaPreEntryCustodyReceipt(options){
 const {output,context,qaVersionId,observedFrom,readAt}=fields(options,
  ['output','context','qaVersionId','observedFrom','readAt']);
 const scope=readQaPreEntryCustodyContext(context);
 if(typeof qaVersionId!=='string'||!/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(qaVersionId)||
    !time(observedFrom)||!time(readAt)||observedFrom<scope.startAt||observedFrom>readAt||readAt>=scope.expiresAt)fail();

 if(typeof output==='string'&&new TextEncoder().encode(output).length>2048)fail();
 const receipt=fields(typeof output==='string'?JSON.parse(output):output,
  ['purpose','status','observationId','sourceRevision','releaseZipSha256','qaVersionId','observedAt',
   'reader','publisher','guardVerified','scopeVerified','authorizesEffects','operationalReadiness','mayRetry']);
 if(receipt.purpose!==QA_PRE_ENTRY_CUSTODY_RECEIPT_PURPOSE||receipt.status!=='observed'||
    receipt.observationId!==scope.id||receipt.sourceRevision!==scope.sourceRevision||
    receipt.releaseZipSha256!==scope.releaseZipSha256||receipt.qaVersionId!==qaVersionId||
    !time(receipt.observedAt)||receipt.observedAt<observedFrom||receipt.observedAt>readAt||
    receipt.guardVerified!==true||receipt.scopeVerified!==false||receipt.authorizesEffects!==false||
    receipt.operationalReadiness!==false||receipt.mayRetry!==false)fail();
 return Object.freeze({...receipt,
  reader:readActiveRole(receipt.reader,receipt.observedAt,readAt),
  publisher:readActiveRole(receipt.publisher,receipt.observedAt,readAt)});
}

