// Structural test fixtures only; synthetic modules do not claim historical bytes.
export function v2Manifest(m){
 m.purpose='afw.finite-native-package.v2';
 const versions={qaClosed:'c570b60b-95dc-48e1-89f3-9c4651691dbc',canaryClosed:'2607abae-cec3-4e35-89eb-8b8572262b54',operatorClosed:'855dc5c1-e757-49aa-a6f5-cb02f8d03ea4'};
 for(const [role,d] of Object.entries(m.modules)){
  if(d.provenance)continue;
  const key={qaClosed:'qaClosed',canaryClosed:'canary',operatorClosed:'operator'}[role];
  m.modules[role]={provenance:key?{kind:'historical-content-pin.v1',receiptPath:'lib/mcp-qa-cloud-closed-pins.mjs',receiptBlobSha:'26213123304eea25e652a52d808d25b7e0e3475e',receiptKey:key,versionId:versions[role]}:{kind:'compiled-source.v1',sourceRevision:m.sourceRevision,sourceTree:m.sourceTree},module:d.module,publicStatic:{purpose:'afw.finite-public-static-profile.v1',configurationHash:d.configurationHash,profileHash:d.profileHash,bindingsHash:d.bindingsHash}};
 }return m;
}
