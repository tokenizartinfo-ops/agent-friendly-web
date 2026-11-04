// SYN only. Source is derived first from the real initial native capsule reader.
import {initialCanonical as canonical} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
import {readPrivateQaFiniteCandidate} from '../../lib/mcp-qa-finite-candidate-residency.mjs';
export async function readPrivateQaFiniteOwnerSource({ctx,parent}){
 parent.assertCurrent();if(!ctx.fixtureEnrollmentSource)throw Error('SYN source absent');return ctx.fixtureEnrollmentSource;
}
export async function readPrivateQaFiniteConnectionSource({ctx},lease){
 lease.assertCurrent();const ownerSource=ctx.fixtureEnrollmentSource;
 const plan=JSON.parse(await ctx.storage.get('afw.finite-initial-cleanup.v1:plan'));
 const baseline={versionId:ownerSource.currentPublication.versionId,deploymentId:ownerSource.currentPublication.deploymentId,module:{name:'index.mjs',bytes:plan.moduleBytes,sha256:plan.moduleHash},configuration:plan.configuration};
 const bytes=readPrivateQaFiniteCandidate().bytes;
 return {ownerSource,baseline,rollback:baseline,candidate:{sourceRevision:ownerSource.sourceRevision,role:'preparation',module:baseline.module,configuration:baseline.configuration,publicStatic:null},bytes:{baseline:bytes,rollback:bytes,candidate:bytes},assertCurrent(c){c.assertCurrent();if(canonical(ctx.fixtureEnrollmentSource)!==canonical(ownerSource))throw Error('SYN source drift');}};
}
