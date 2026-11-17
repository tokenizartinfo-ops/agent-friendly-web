import assert from 'node:assert/strict';
// Sealed literal expectations are independent of the receiver. No fixture construction or Source imports.
function checkOne(read,fixture,hash,inflate){
 let value,error;
 try{value=read(fixture.input,fixture.trusted,hash,inflate);}catch(caught){error=caught;}
 const expected=fixture.expected;
 if(!expected.accepted){
  // An accidental load/TypeError must not count as an expected guard rejection.
  assert.equal(error?.name,'Error',fixture.id+': controlled guard rejection required');
  assert.equal(error.message,'G20_OWN_UNQUALIFIED',fixture.id+': unexpected receiver failure');
  return {id:fixture.id,accepted:false,state:null,reason:null};
 }
 assert.equal(error,undefined,fixture.id+': valid diagnostic rejected');
 assert.equal(value.diagnosticCollectionAccepted,true,fixture.id+': collection result');
 assert.equal(value.firstFailure.state,expected.firstFailureState,fixture.id+': state');
 assert.equal(value.firstFailure.reason,expected.firstFailureReason,fixture.id+': reason');
 const literal=JSON.parse(fixture.input.artifact.payloadText);
 assert.equal(JSON.stringify(value.firstFailure),JSON.stringify(literal.observation.firstFailure),fixture.id+': preserve canonical safe projection');
 assert.equal(value.replay.firstThrowSequence,literal.observation.firstThrowSequence,fixture.id+': preserve observed prefix throw');
 assert.equal(value.tree.matchedBodyEdges,25,fixture.id+': full admitted body join');
 assert.equal(value.commandStepNumber,5,fixture.id+': actual numeric step');
 assert.equal(value.artifact.payloadBytes,Buffer.byteLength(fixture.input.artifact.payloadText),fixture.id+': exact payload');
 assert.equal(value.nativeQualification,false,fixture.id+': no qualification');
 assert.equal(value.SourceQualified,false);assert.equal(value.Task1Pass,false);
 for(const v of Object.values(value.nonclaims))assert.equal(v,false);
 return {id:fixture.id,accepted:true,state:value.firstFailure.state,reason:value.firstFailure.reason};
}
export {checkOne};
