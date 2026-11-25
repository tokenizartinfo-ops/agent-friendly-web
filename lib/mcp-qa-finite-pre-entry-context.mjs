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
