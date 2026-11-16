import {n3TraceReplay} from './n3-trace-reader.mjs';
const check=x=>{if(!x)throw Error('N3_TRACE_CONTROL_INVALID');};
export function runTraceControls(v){
 check(v.schema==='afw.c2-notices-n3.early-vectors.v1'&&v.syntheticOnly===true&&v.notSourceEvidence===true);
 let accepted=0,rejected=0;
 for(const c of v.positives){
  const result=n3TraceReplay(c.snapshot);check(result.valid&&result.code==='OK');
  const s=result.summary;check(s.state===c.snapshot.state&&s.coverage===c.snapshot.coverage&&s.reason===c.snapshot.reason&&s.firstError===c.snapshot.firstError&&s.focusChild===c.snapshot.focus.pairChild&&s.interpretation==='unknown');accepted++;
 }
 for(const c of v.negatives){const result=n3TraceReplay(c.snapshot);check(!result.valid&&result.code==='CAUSAL_INVALID');rejected++;}
 check(accepted===31&&rejected===32);return {accepted,rejected};
}
