import {finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';

export const QA_PRE_ENTRY_CUSTODY_RECEIPT_PURPOSE='afw.qa-pre-entry-custody.v2';
const purpose='afw.qa-pre-entry-custody-context.v2';
const qa=QA_CLOUD_CLOSED_PINS.qaClosed;
const inputKeys=['sourceRevision','startAt','expiresAt'];
const fail=()=>{throw Error('Closed pre-entry custody context unavailable');};

export function createQaPreEntryCustodyContext(input){
 const {sourceRevision,startAt,expiresAt}=fields(input,inputKeys);
 if(!hex(sourceRevision,40)||!time(startAt)||!time(expiresAt)||expiresAt<=startAt||expiresAt-startAt>600000)fail();
 const baselineVersionId=qa.id,baselineModuleHash=qa.module.sha256;
 const id=hash([purpose,sourceRevision,baselineVersionId,baselineModuleHash,startAt,expiresAt]);
 return Object.freeze({purpose,id,sourceRevision,baselineVersionId,baselineModuleHash,startAt,expiresAt});
}

/** Canonical content only. Runtime authority still depends on the closed
 * bindings, exact actor, admitted Workflow and current window. */
export function readQaPreEntryCustodyContext(value){
 const input=fields(value,['purpose','id','sourceRevision','baselineVersionId','baselineModuleHash','startAt','expiresAt']);
 const context=createQaPreEntryCustodyContext({sourceRevision:input.sourceRevision,startAt:input.startAt,expiresAt:input.expiresAt});
 if(Object.keys(context).some(key=>input[key]!==context[key]))fail();
 return context;
}

export function renderQaPreEntryCustodyModule(value){
 return 'export const custodyContext=Object.freeze('+JSON.stringify(readQaPreEntryCustodyContext(value))+');\n';
}
