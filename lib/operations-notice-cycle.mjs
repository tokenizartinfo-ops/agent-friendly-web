/** Reception only. Recovery comes from the authenticated server ledger, never scratch disk. */
export async function runNoticeCycle(client,{now=Date.now}={}){
 try{
  const time=now();if(!Number.isSafeInteger(time)||time<0)throw Error('Invalid clock');
  const receipts=await client.listNoticeReceipts();
  const pending=receipts.filter(x=>x.outcome===null);
  if(pending.length>1)return {status:'review_required',reason:'multiple_unfinished_receipts'};
  let reservation=pending[0]?.reservation;
  if(reservation&&reservation.expiresAt<=time)return {status:'review_required',reason:'lease_expired',runId:reservation.runId};
  if(!reservation){
   const notices=await client.listNotices();
   if(!notices.length){const receipt=receipts[0];return receipt?{status:'reconciled',runId:receipt.reservation.runId,outcome:receipt.outcome}:{status:'idle'};}
   const notice=notices[0];
   reservation=await client.claimNotice(notice.resource,notice.revision,crypto.randomUUID());
   if(reservation.expiresAt<=now())return {status:'review_required',reason:'lease_expired',runId:reservation.runId};
  }
  const outcome=await client.ackNotice(reservation.runId);
  return outcome==='accepted'?{status:'received',runId:reservation.runId}:{status:'review_required',reason:'superseded',runId:reservation.runId};
 }catch{throw Error('Operational request unavailable');}
}
