import {readRecord,readList,ref,integer,instant,closed} from '../../lib/agent-consumption-input.mjs';
const CATEGORIES=['consumer','afw','persistence','verification','human','recipe'],VARIANTS=['direct','afw'];
const INPUT=['contract','trialRef','currency','mode','cases','observations'];
const CASE=['caseRef','variant','conditionsRef','outcome','acceptanceRef'];
const OBS=['observationRef','caseRef','variant','category','attemptRef','observedAt','costMicros','costBasis','costRef','usage','usageRef'];
const USAGE=['inputTokens','outputTokens','cachedInputTokens','requestBytes','responseBytes'];
const full=(value,keys)=>{const r=readRecord(value,keys);return r&&keys.every(k=>Object.hasOwn(r,k))?r:null;};
class Invalid extends Error{constructor(code='invalid_input'){super('Observation ledger unavailable');this.code=code;}}
const fail=code=>{throw new Invalid(code);};
const sum=(a,b)=>{const r=a+b;if(!integer(r))fail('numeric_overflow');return r;};
const caseKey=(r)=>r.variant+'|'+r.caseRef;
function readCase(value){
 const c=full(value,CASE);
 if(!c||!ref(c.caseRef)||!VARIANTS.includes(c.variant)||!ref(c.conditionsRef)||!['accepted','failed','pending'].includes(c.outcome)
  ||(c.outcome==='accepted'?!ref(c.acceptanceRef):c.acceptanceRef!==null))fail();
 return c;
}
function observation(value){
 const r=full(value,OBS),at=instant(r?.observedAt);
 if(!r||!ref(r.observationRef)||!ref(r.caseRef)||!VARIANTS.includes(r.variant)||!CATEGORIES.includes(r.category)
  ||(r.attemptRef!==null&&!ref(r.attemptRef))||at===null||at<0)fail();
 if(r.costBasis==='not_applicable'){if(r.costMicros!==0||r.costRef!==null)fail();}
 else if(r.costBasis==='unknown'){if(r.costMicros!==null||r.costRef!==null)fail();}
 else if(!['observed_variable','approved_allocation'].includes(r.costBasis)||!integer(r.costMicros)||!ref(r.costRef))fail();
 let usage=null;
 if(r.usage===null){if(r.usageRef!==null)fail();}
 else{
  usage=full(r.usage,USAGE);
  if(!usage||!ref(r.attemptRef)||!ref(r.usageRef)||!USAGE.every(k=>usage[k]===null||integer(usage[k]))
   ||(usage.cachedInputTokens!==null&&usage.inputTokens!==null&&usage.cachedInputTokens>usage.inputTokens))fail();
 }
 return {...r,usage};
}
function signature(o){return JSON.stringify(OBS.map(k=>k==='usage'?(o.usage?USAGE.map(x=>o.usage[x]):null):o[k]));}
function group(){return {cases:[],observations:[],attempts:new Map(),coverage:new Map()};}
function summarizeGroup(g){
 let knownCostMicros=0,unknownCostObservations=0,missingCostCategories=0;
 for(const o of g.observations){if(o.costMicros===null)unknownCostObservations++;else knownCostMicros=sum(knownCostMicros,o.costMicros);}
 for(const c of g.cases)for(const category of CATEGORIES)if(!g.coverage.has(c.caseRef+'|'+category))missingCostCategories++;
 const complete=g.cases.length>0&&unknownCostObservations===0&&missingCostCategories===0;
 const accepted=g.cases.filter(c=>c.outcome==='accepted').length,totalCostMicros=complete?knownCostMicros:null;
 const knownUsage=Object.fromEntries(USAGE.map(k=>[k,0])),missingUsage=Object.fromEntries(USAGE.map(k=>[k,0]));
 for(const a of g.attempts.values())for(const field of USAGE){
  if(a.usage?.[field]===undefined||a.usage[field]===null)missingUsage[field]++;
  else knownUsage[field]=sum(knownUsage[field],a.usage[field]);
 }
 const usage=Object.fromEntries(USAGE.map(k=>[k,g.attempts.size>0&&missingUsage[k]===0?knownUsage[k]:null]));
 return {attemptedCases:g.cases.length,acceptedCases:accepted,acceptanceRate:g.cases.length?{accepted,attempted:g.cases.length}:null,
  recordedAttempts:g.attempts.size,observationCount:g.observations.length,knownCostMicros,totalCostMicros,
  missingCostCategories,unknownCostObservations,costPerAccepted:complete&&accepted>0?{numeratorMicros:knownCostMicros,denominator:accepted}:null,
  usage,knownUsage,missingUsage};
}
/** Validates/aggregates caller-supplied observations only. No metering/provider
 * IO, approval, price, charge, savings assertion or evidence attestation.
 * Cases are actually-started occurrences, not leads/plans. Opaque refs retain
 * traceability; the caller keeps protected originals and verifies their truth.
 */
export function summarizeEfficiencyTrial(value){
 try{
  const r=full(value,INPUT),cases=readList(r?.cases,200),rows=readList(r?.observations,1000);
  if(!r||r.contract!=='afw.efficiency-observations.v1'||!ref(r.trialRef)||typeof r.currency!=='string'||!/^[A-Z]{3}$/.test(r.currency)
   ||!['synthetic','declared_observation'].includes(r.mode)||!cases?.length||!rows)fail();
  const groups={direct:group(),afw:group()},caseMap=new Map(),conditions=new Map(),paired=new Map(),unique=new Map();
  for(const value of cases){
   const c=readCase(value),key=caseKey(c);if(caseMap.has(key))fail('duplicate_cases');
   if(conditions.has(c.caseRef)&&conditions.get(c.caseRef)!==c.conditionsRef)fail('comparison_conditions_mismatch');
   conditions.set(c.caseRef,c.conditionsRef);caseMap.set(key,c);groups[c.variant].cases.push(c);
   const variants=paired.get(c.caseRef)??new Set();variants.add(c.variant);paired.set(c.caseRef,variants);
  }
  for(const value of rows){
   const o=observation(value),key=caseKey(o);if(!caseMap.has(key))fail('unreferenced_observation');
   const sig=signature(o),prior=unique.get(o.observationRef);
   if(prior!==undefined){if(prior!==sig)fail('observation_conflict');continue;}
   unique.set(o.observationRef,sig);
   const g=groups[o.variant],coverageKey=o.caseRef+'|'+o.category,previous=g.coverage.get(coverageKey);
   if(previous&&(previous.notApplicable||o.costBasis==='not_applicable'))fail('cost_coverage_conflict');
   g.coverage.set(coverageKey,{notApplicable:o.costBasis==='not_applicable'});g.observations.push(o);
   if(o.attemptRef!==null){
    const a=g.attempts.get(o.attemptRef)??{caseRef:o.caseRef,usage:null};
    if(a.caseRef!==o.caseRef)fail('attempt_context_conflict');
    if(o.usage!==null){if(a.usage!==null)fail('duplicate_attempt_usage');a.usage=o.usage;}
    g.attempts.set(o.attemptRef,a);
   }
  }
  return closed('summarized',{contract:'afw.efficiency-summary.v1',trialRef:r.trialRef,currency:r.currency,sourceMode:r.mode,
   observationStatus:r.mode==='synthetic'?'synthetic_only':'source_observations_unverified',isEfficiencyEvidence:false,
   pairedCases:[...paired.values()].filter(s=>s.size===2).length,unpairedCases:[...paired.values()].filter(s=>s.size===1).length,
   sourceRefs:{observations:[...unique.keys()],conditions:[...new Set(conditions.values())],
    acceptances:[...caseMap.values()].filter(c=>c.acceptanceRef!==null).map(c=>c.acceptanceRef)},
   variants:{direct:summarizeGroup(groups.direct),afw:summarizeGroup(groups.afw)}});
 }catch(error){return closed('blocked',{code:error instanceof Invalid?error.code:'invalid_input',isEfficiencyEvidence:false});}
}
