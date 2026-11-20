import {createHash} from 'node:crypto';
export function nominalFixture(identity,{sourceRevision='b'.repeat(40),runtimeVersionId='11111111-1111-4111-8111-111111111111',actorId='a'.repeat(64),monitorHash='9'.repeat(64),consentExpiresAt=identity.N1}={},at=identity.T0){
 const nominalIdentity={sourceRevision,runtimeVersionId,actorId,monitorHash,consentExpiresAt};
 const claim={purpose:'afw.qa-finite-trial.v1:effect',intentId:identity.intentId,controlHash:identity.controlHash,kind:'nominal',phase:'issued',issuedAt:identity.T0,deadline:Math.min(identity.N1,consentExpiresAt),proofHash:null};
 const value={purpose:'afw.qa-finite-nominal-control.v1',intentId:identity.intentId,controlHash:identity.controlHash,planHash:identity.planHash,sourceRevision,runtimeVersionId,actorId,observedAt:at,phase:'armed',withdrawnAt:null,claim,claimHash:createHash('sha256').update('afw.qa-finite-trial.v1:effect\n'+JSON.stringify(claim)).digest('hex'),ownedWriters:[],consent:{grantHash:identity.grantHash,monitorHash,expiresAt:consentExpiresAt,valid:true}};
 return {nominalIdentity,value};
}
