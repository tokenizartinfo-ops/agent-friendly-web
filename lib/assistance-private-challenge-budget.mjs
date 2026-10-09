const KEY='afw-private-challenge-budget/v1:current';
const deny=()=>({success:false});
/** Two total authenticated attempts for this immutable own-QA actor.
 * Never reset on time, revision, restart or principal change. An unknown commit
 * acknowledgement spends the attempt and requires operator reconciliation.
 */
export function createPrivateChallengeBudget({storage,readPrincipal,now=Date.now}={}){
 return Object.freeze({async limit({key}={}){try{
  const principal=readPrincipal(),at=now();
  if(typeof principal!=='string'||!/^[0-9a-f]{64}$/.test(principal)||key!=='afw-private-challenge:'+principal||!Number.isSafeInteger(at)||at<0)return deny();
  const accepted=await storage.transaction(async tx=>{
   const previous=await tx.get(KEY);
   if(readPrincipal()!==principal)return false;
   if(previous!==undefined&&(!previous||Object.getPrototypeOf(previous)!==Object.prototype||Object.keys(previous).length!==3||previous.principalRef!==principal||!Number.isSafeInteger(previous.at)||previous.at<0||at<previous.at||!Number.isSafeInteger(previous.count)||previous.count<1||previous.count>=2))return false;
   await tx.put(KEY,{principalRef:principal,count:(previous?.count??0)+1,at});
   return readPrincipal()===principal&&Number.isSafeInteger(now())&&now()>=at;
  });
  return {success:accepted===true&&readPrincipal()===principal&&Number.isSafeInteger(now())&&now()>=at};
 }catch{return deny();}}});
}
