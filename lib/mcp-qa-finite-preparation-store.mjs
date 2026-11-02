// RED shell: missing factual transaction behavior, fails closed.
export function createFiniteOwnerPreparationStore({storage}){
 const mutation=async()=>{await storage.transaction(async tx=>{await tx.get('afw.finite-preparation.v1:unimplemented');});return {status:'uncertain',recordHash:null};};
 return Object.freeze({putPreconnection:mutation,putTicket:mutation,consumeTicket:mutation,putLink:mutation,publishSelection:mutation,bindSelection:mutation,putContext:mutation,readSelected:async()=>null,readContext:async()=>null});
}
