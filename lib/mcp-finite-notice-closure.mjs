import {finiteData as data,finiteFields as fields,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';

import {correlateFiniteDossierReview} from './mcp-finite-dossier-review-receipt.mjs';

const fail=()=>{throw Error('Finite notice closure unavailable');};

/** Scope is supplied by the retained QA control, never by a webhook body. */
export function validateFiniteNoticeClosure(value,{startAt,endAt}){
 const r=fields(data(value),['purpose','subscriptionHash','eventId','httpReceipt','withdrawn','cloudReviewConfirmed']);
 if(r.purpose!=='afw.finite-native-subscription-closure.v1'||!hex(r.subscriptionHash)||
    r.eventId!==null&&!hex(r.eventId)||r.withdrawn!==true||r.cloudReviewConfirmed!==false)fail();
 if(r.httpReceipt!==null){
  const ack=fields(r.httpReceipt,['status','httpReceivedAt']);
  if(!hex(r.eventId)||!Number.isInteger(ack.status)||ack.status<200||ack.status>299||
     !time(ack.httpReceivedAt)||ack.httpReceivedAt<startAt||ack.httpReceivedAt>=endAt)fail();
 }
 return r;
}

export function validateFiniteOwnCloseReceipt(value,window){
 const r=fields(data(value),['closed','runtimeStopRequested',...(Object.hasOwn(value,'notice')?['notice']:[])]);
 if(r.closed!==true||r.runtimeStopRequested!==true)fail();
 if(Object.hasOwn(r,'notice'))validateFiniteNoticeClosure(r.notice,window);
 return r;
}

/** The late QA writer can report this historic occurrence independently of
 * its restoration. Caller scope and the historic notice must both match. */
export function validateFiniteCoupledNoticeEvidence(value,{controlHash,originalRestoreFrom}){
 const r=fields(data(value),['purpose','completionHash','startAt','closeAt','notice','review']);
 if(r.purpose!=='afw.finite-coupled-notice-evidence.v1'||!hex(r.completionHash)||!hex(controlHash)||
    !time(r.startAt)||!time(r.closeAt)||!time(originalRestoreFrom)||r.closeAt!==r.startAt+240000||
    originalRestoreFrom<=r.startAt+510000)fail();
 const notice=validateFiniteNoticeClosure(r.notice,{startAt:r.startAt,endAt:r.closeAt+60000});
 if(!notice.httpReceipt)fail();
 correlateFiniteDossierReview(r.review,{notice,controlHash,startAt:r.startAt,closeAt:r.closeAt});
 return r;
}
