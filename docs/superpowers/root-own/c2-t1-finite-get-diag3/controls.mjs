import {d3ModelRead} from './reader.mjs';
import {d2ModelRead} from './legacy/reader.mjs';
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function runEvaluation(fixture,family,hash,inflate){
 let actual=null,error=null;
 try{actual=(family==='D2'?d2ModelRead:d3ModelRead)(fixture.input,fixture.trusted,hash,inflate);}catch(e){error=e;}
 if(!actual){
  if(fixture.expected.accepted!==false||error?.message!=='G20_OWN_UNQUALIFIED')throw Error('OWN_CONTROL_FAILED '+fixture.id+' unexpected rejection '+error?.message);
  return {id:fixture.id,accepted:false,state:'REJECTED',reason:'G20_OWN_UNQUALIFIED',projectionSha256:hash('null')};
 }
 if(fixture.expected.accepted!==true||actual.SourceQualified!==false||actual.Task1Pass!==false||actual.finalSourceBinding!==false||Object.values(actual.nonclaims).some(v=>v!==false))throw Error('OWN_CONTROL_FAILED '+fixture.id+' admission/nonclaim');
 const f=actual.firstFailure,expected=fixture.expected;
 if(f.state!==expected.firstFailureState||f.reason!==expected.firstFailureReason)throw Error('OWN_CONTROL_FAILED '+fixture.id+' C1 state/reason');
 if(expected.outerFirstThrowSequence!==undefined&&actual.replay.firstThrowSequence!==expected.outerFirstThrowSequence)throw Error('OWN_CONTROL_FAILED '+fixture.id+' firstthrow');
 const given=JSON.parse(fixture.input.artifact.payloadText).observation;
 if(!same(f,given.firstFailure))throw Error('OWN_CONTROL_FAILED '+fixture.id+' firstFailure projection');
 const projection=family==='D2'?f:{firstFailure:f,finiteGet:actual.finiteGet};
 if(family==='D3'&&!same(actual.finiteGet,expected.finiteGet))throw Error('OWN_CONTROL_FAILED '+fixture.id+' finiteGet projection');
 const state=family==='D2'?f.state:actual.finiteGet.http.state,reason=family==='D2'?f.reason:actual.finiteGet.http.reason;
 return {id:fixture.id,accepted:true,state,reason,projectionSha256:hash(JSON.stringify(projection))};
}
export {runEvaluation};
