import { clock, closed, instant, integer, readList, readRecord, ref, text } from '../../lib/agent-consumption-input.mjs';

const RESPONSE_KEYS=['status','data','code','recovery','error_code'];
const DATA_KEYS=['contract','projectRef','revision','observedAt','expiresAt','nextStep','missingInput','evidenceRefs','capsuleRef','status','executionAllowed','chargeAllowed','publicationAllowed'];
const KINDS=new Set(['provide_information','review','refresh','wait']);
const block=(code,action='review_contract')=>closed('blocked',{code,action,automaticReconnect:false});

// Consumer-side consistency only: this does not authenticate, authorize, call a tool,
// evaluate text, or attest clock synchronization. Transport limits belong to the caller.
export function consumeAgentNextStep(structuredContent, options) {
  const config=readRecord(options,['projectRef','expectedRevision','now']);
  if(!config||!ref(config.projectRef)||!integer(config.expectedRevision,1)||!clock(config.now))
    return block('invalid_context');
  const response=readRecord(structuredContent,RESPONSE_KEYS);
  if(!response)return block('invalid_response');
  if(response.status===409&&response.code==='revision_conflict')return block('revision_conflict','retry_read');
  if((response.status===401&&response.code==='delegated_authorization_required')||
    (response.status===403&&['delegated_access_denied','insufficient_scope'].includes(response.code)))
    return block('access_denied','review_connection');
  if(response.status===503&&response.code==='delegated_read_unavailable')return block('read_unavailable','retry_read');
  if(response.status!==200)return block('invalid_response');
  const data=readRecord(response.data,DATA_KEYS);
  if(!data||data.contract!=='afw.agent-consumption.next-step.v1'||data.status!=='ok'||
    !['executionAllowed','chargeAllowed','publicationAllowed'].every(k=>data[k]===false))
    return block('invalid_response');
  if(data.projectRef!==config.projectRef)return block('access_denied','review_connection');
  if(!integer(data.revision,1))return block('invalid_response');
  if(data.revision!==config.expectedRevision)return block('revision_conflict','retry_read');
  const observed=instant(data.observedAt),expires=instant(data.expiresAt);
  if(observed===null||expires===null||expires<=observed||expires-observed>5000)return block('invalid_response');
  if(observed>config.now)return block('state_unconfirmed','retry_read');
  if(expires<=config.now)return block('source_expired','retry_read');
  const step=readRecord(data.nextStep,['id','kind','label','reason']),refs=readList(data.evidenceRefs,5);
  if(!step||!ref(step.id)||!KINDS.has(step.kind)||!text(step.label,160)||!text(step.reason)||
    !refs||!refs.every(ref)||new Set(refs).size!==refs.length||
    (data.capsuleRef!=null&&!ref(data.capsuleRef)))return block('invalid_response');
  let missingInput=null;
  if(data.missingInput!=null){
    missingInput=readRecord(data.missingInput,['key','label']);
    if(!missingInput||!ref(missingInput.key)||!text(missingInput.label,160))return block('invalid_response');
  }
  return closed('ready',{action:'continue_guided_step',context:{
    contract:data.contract,projectRef:config.projectRef,revision:data.revision,
    observedAt:data.observedAt,expiresAt:data.expiresAt,nextStep:step,missingInput,
    evidenceRefs:refs,capsuleRef:data.capsuleRef??null,
  }});
}
