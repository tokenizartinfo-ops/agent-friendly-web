import {c2OwnControls,c2OwnSourceAssemblyControls,c2OwnFix2Controls} from './legacy/own-controls.mjs';
import {c2OwnReadSourceFixtureFix1,c230ZipPayload} from './full-reader.mjs';
import {buildFullModel,modelZip} from './model-builder.mjs';
// Only independently authored OWN modules are imported. Source JSON is never executable.
function makeOwnFullCases(seed,plans,first,diagnosticSchema,fix2Vectors,hash,deflate,inflate){
 const old=c2OwnControls(first,diagnosticSchema,hash),assembly=c2OwnSourceAssemblyControls(old.fixtures,hash),fix=c2OwnFix2Controls(fix2Vectors,diagnosticSchema,hash);
 const runs=[old.results,assembly.results,fix],wanted=[187,28,10],cases=[];
 for(let group=0;group<runs.length;group++){
  const result=runs[group];if(result.passed.length!==wanted[group]||result.failed.length!==0)throw Error('LEGACY_225_FAILED');
  for(const id of result.passed)cases.push({id,run:()=>{if(result.failed.includes(id)||!result.passed.includes(id))throw Error('LEGACY_CONTROL_FAILED');}});
 }
 for(const vector of plans.fullInputCases)cases.push({id:vector.id,run:()=>{
  // Construction occurs outside the rejection catch: a broken model is never a successful negative.
  const model=buildFullModel(seed,vector,hash,deflate);let accepted=false,value;
  try{value=c2OwnReadSourceFixtureFix1(model.input,model.trustedExpected,hash,inflate);accepted=value.receiverChecksSatisfied===true;}catch{}
  if(accepted!==(vector.expect==='accept'))throw Error('FULL_MODEL_EXPECTATION_'+vector.id);
  if(accepted&&(value.SourceQualified!==false||value.Task1Pass!==false||value.tree.checkedEdges!==25||Object.values(value.nonclaims).some(v=>v!==false)))throw Error('FULL_MODEL_SCOPE');
 }});
 for(const vector of plans.zipUnitCases)cases.push({id:vector.id,run:()=>{
  const archive=vector.archiveBytes?Buffer.alloc(vector.archiveBytes):modelZip('x'.repeat(vector.bytes),seed.fileName,vector.zip,deflate);
  let accepted=false;try{const decoded=c230ZipPayload(archive.toString('base64'),seed.fileName,inflate);accepted=decoded.payload.length===vector.bytes;}catch{}
  if(accepted!==(vector.expect==='accept'))throw Error('ZIP_MODEL_EXPECTATION_'+vector.id);
 }});
 const ids=cases.map(c=>c.id);if(cases.length!==370||new Set(ids).size!==370)throw Error('OWN_CENSUS');
 return cases;
}
export {makeOwnFullCases};
