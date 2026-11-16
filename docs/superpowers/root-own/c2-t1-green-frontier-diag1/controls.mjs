import {g20Read} from './reader.mjs';
import {g20Build} from './model-builder.mjs';
// Focused new-family controls only; no historical419/W1 or producer helpers imported.
function g20Cases(seed,plans,hash,deflate,inflate){
 const list=plans.cases.map(vector=>({id:vector.id,run:()=>{
  const model=g20Build(seed,vector,hash,deflate);let accepted=false,value;
  try{value=g20Read(model.input,model.trusted,hash,inflate);accepted=value.diagnosticCollectionAccepted===true;}catch{}
  if(accepted!==(vector.expected==='accept'))throw Error('G20_EXPECTATION_'+vector.id);
  if(accepted&&(value.nativeQualification!==false||value.SourceQualified!==false||value.Task1Pass!==false||Object.values(value.nonclaims).some(v=>v!==false)))throw Error('G20_SCOPE');
 }}));
 if(list.length!==124||new Set(list.map(c=>c.id)).size!==124)throw Error('G20_CENSUS');return list;
}
export {g20Cases};
