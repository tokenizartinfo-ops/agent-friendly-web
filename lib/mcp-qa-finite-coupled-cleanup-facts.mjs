const P='afw.finite-policy-effect.v1:',WRITER=P+'writer-head';
const fail=()=>{throw Error('Finite coupled owner cleanup unavailable');};

/** The six rows have already been decoded under the setup actor and lease.
 * Keep everything else for the original exact connection-inventory checks. */
export function partitionFiniteCoupledPolicyEffects(rows,policy){
 const {keys,writerHead}=policy;
 if(!(rows instanceof Map)||rows.size>22||!Array.isArray(keys)||keys.length!==6||
    new Set(keys).size!==keys.length||rows.get(WRITER)!==writerHead)fail();
 const setupPrefixes=new Set(keys.map(key=>key.slice(0,key.lastIndexOf(':')+1)));
 if(setupPrefixes.size!==2||keys.some(key=>!key.startsWith(P)||!rows.has(key)))fail();
 const connection=new Map(rows);
 connection.delete(WRITER);
 for(const key of keys)connection.delete(key);
 if([...connection.keys()].some(key=>[...setupPrefixes].some(prefix=>key.startsWith(prefix))))fail();
 return connection;
}

export function qualifyFiniteCoupledCleanupSelection({stage,policy,selected,scope}){
 const {prepId,sourceRevision,selectionHash,intentId,cleanupScopeHash,pin,upload}=policy;
 const binding=selected?.binding;
 if(stage?.stage!=='finite'||stage.versionId!==upload.baselineVersionId||stage.deploymentId!==upload.baselineDeploymentId||
    stage.moduleHash!==pin.module.sha256||!binding||binding.prepId!==prepId||binding.intentId!==intentId||
    binding.sourceRevision!==sourceRevision||binding.selectionHash!==selectionHash||
    selected.selection.selectionHash!==selectionHash||selected.preparation.prepId!==prepId||
    selected.preparation.sourceRevision!==sourceRevision||!scope||scope.prepId!==prepId||
    scope.sourceRevision!==sourceRevision||scope.scopeHash!==cleanupScopeHash)fail();
}

/** Local classification only. Raw version bytes and the closed backup must
 * still be qualified by the original native reader. */
export function qualifyFiniteCoupledCleanupPointer({policy,restore,pointer,deployment}){
 if(!restore||restore.handoffHash!==policy.handoffHash)fail();
 if(restore.kind==='no_restore'){
  if(pointer.versionId!==policy.pin.versionId||pointer.deploymentId!==policy.pin.deploymentId||
     Object.hasOwn(deployment,'annotations'))fail();
  return 'original_restore_needed';
 }
 if(restore.kind==='retained'&&restore.versionId===policy.rollback.versionId&&pointer.versionId===restore.versionId&&
    pointer.deploymentId===restore.deploymentId&&deployment.annotations?.['workers/message']===restore.annotation)return 'prior_restore_observed';
 fail();
}
