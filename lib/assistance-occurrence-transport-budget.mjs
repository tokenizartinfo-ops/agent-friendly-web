const phases=[['control','create'],['operational','list'],['control','admitClaim'],['operational','claim'],['control','admitFinish'],['operational','finish']];

/** Internal per-runner transport fence. Does not replace the global D1 ledger,
 * trusted preflight, server window, canonical abort/timeout, or independent closure.
 * Counts attempts before invoking transport; ambiguous replies never permit retry.
 * The callback must include canonical timeout/abort and reply validation before
 * resolving; an invalid reply must throw so the budget stops before another phase.
 */
export function createOccurrenceTransportBudget(){
 let controls=0,operational=0,step=0,busy=false,state='active';
 return {
  snapshot(){return {controls,operational,total:controls+operational,state};},
  async send(kind,phase,transport){
   const stop=kind==='control'&&phase==='stop';
   if(busy||typeof transport!=='function'||['completed','stopped'].includes(state)||(!stop&&(state!=='active'||phases[step]?.[0]!==kind||phases[step]?.[1]!==phase))||controls+operational>=7||(kind==='control'?controls>=4:kind==='operational'?operational>=3:true))throw Error('Occurrence transport denied');
   if(kind==='control')controls++;else operational++;
   busy=true;if(stop)state='stopped';
   try{
    const result=await transport();
    if(!stop){step++;if(step===phases.length)state='completed';}
    return result;
   }catch{
    if(!stop)state='failed';
    throw Error('Occurrence transport unavailable');
   }finally{busy=false;}
  },
 };
}
