export function diagnosePublicWafSnapshot() {
  return { contract_version: 'agentfriendly.public-waf-snapshot.v1', checked_at: null,
    snapshotMatches: false, issues: [{ component: 'snapshot', field: 'unavailable' }],
    mutationAllowed: false, wafEnforcementAccepted: false, operationalReadiness: false, pcOffAccepted: false };
}
