// RED shell: missing append-only journal behavior, fails closed.
export function createFinitePolicyEffectJournal({storage}){
 const mutation=async()=>{await storage.transaction(async tx=>{await tx.get('afw.finite-policy.v1:unimplemented');});return {status:'uncertain',recordHash:null};};
 return Object.freeze({issue:mutation,acknowledge:mutation,finish:mutation,markAdminPending:mutation,read:async()=>({state:'absent',send:null,ack:null,receipt:null})});
}
