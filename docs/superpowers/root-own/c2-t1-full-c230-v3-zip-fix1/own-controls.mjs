import {makeOwnFullCases} from './controls-baseline370.mjs';
import {c2OwnReadSourceFixtureFix1} from './full-reader.mjs';
import {buildZipFixModel} from './zip-model-builder.mjs';
// The original370 factory/expectations are byte-preserved and now exercise the fixed reader.
function makeZipFixedCases(seed,oldPlans,first,diagnosticSchema,fix2Vectors,example,zipPlans,hash,deflate,inflate){
 const cases=makeOwnFullCases(seed,oldPlans,first,diagnosticSchema,fix2Vectors,hash,deflate,inflate);
 if(cases.length!==370)throw Error('ORIGINAL_370_CENSUS');
 for(const vector of zipPlans.cases)cases.push({id:vector.id,run:()=>{
  const model=buildZipFixModel(example,vector,hash,deflate);let accepted=false,value;
  try{value=c2OwnReadSourceFixtureFix1(model.input,model.trustedExpected,hash,inflate);accepted=value.receiverChecksSatisfied===true;}catch{}
  if(accepted!==(vector.expected==='accept'))throw Error('ZIP_FIX1_EXPECTATION_'+vector.id);
  if(accepted&&(value.SourceQualified!==false||value.Task1Pass!==false||value.tree.checkedEdges!==25))throw Error('ZIP_FIX1_SCOPE');
 }});
 if(cases.length!==419||new Set(cases.map(c=>c.id)).size!==419)throw Error('ZIP_FIX1_CENSUS');
 return cases;
}
export {makeZipFixedCases};
