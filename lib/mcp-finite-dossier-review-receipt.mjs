import {finiteFields as fields,finiteData as data,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';

export function validateFiniteDossierReviewReceipt(value){
 const r=fields(data(value),['purpose','eventId','controlHash','actorHash','executionHash','resultHash','runId','revision','receivedAt','reviewedAt']);
 if(r.purpose!=='afw.finite-dossier-review.v1'||['eventId','controlHash','actorHash','executionHash','resultHash'].some(k=>!hex(r[k]))||
    typeof r.runId!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(r.runId)||
    !Number.isSafeInteger(r.revision)||r.revision<1||!time(r.receivedAt)||!time(r.reviewedAt)||r.receivedAt>r.reviewedAt)throw Error('Finite review unavailable');
 return r;
}

export function correlateFiniteDossierReview(value,{notice,controlHash,startAt,closeAt}){
 const r=validateFiniteDossierReviewReceipt(value);
 if(!notice?.httpReceipt||notice.withdrawn!==true||r.eventId!==notice.eventId||r.controlHash!==controlHash||
    r.receivedAt<startAt||r.receivedAt>notice.httpReceipt.httpReceivedAt||r.reviewedAt>=closeAt)throw Error('Finite review unavailable');
 return r;
}
