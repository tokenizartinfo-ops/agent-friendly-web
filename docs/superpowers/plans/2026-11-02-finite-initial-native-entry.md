# Initial native entry Implementation Plan

> For agentic workers: execute this single bounded task sequentially; Root expressly prohibits subagents. Use executing-plans/TDD. Root approval already recorded.

**Goal:** At most one actual A collection following a first acknowledged durable entry winner.
**Architecture:** Fixed finite Workflow→existingSQLiteactor; deterministicglobalCAS, actualsync/readback, privateoneuseAcontinuation, postsync andsafereferencesonly.
**Tech Stack:** NativeWorkers/DO SQLite/D1, Node22, existingesbuild/Miniflare lockfile, GitHubAPI/Actions.
**Spec:** ../specs/2026-11-02-finite-initial-native-entry.md.

## Global constraints
No localclone/dependencies/build/provider/runtime/action; onlyisolatedsourcebranch viaGitHubAPI. Noagents. No secrets/artifacts/deploy intemporaryqualifier; EXCLUDEqualifierfromintegration.
Exactrecord/entry/clock/output perapprovedspec. Fixedceiling unchanged. Noeffectpermission/allwriters/sourceauthorityclaim. Actual2MiBcanary/3MiBQA caps. PreserveA/B1/B2/C1 semantics/oldkeys/D1/finiteHEAD.

## Review focus
- Retriedtransactioncallback cannotleaveouterwinnerflag.
- Bufferedget notdurability: actualsync mustfinish beforeA andsafesuccess.
- Late/uncommittedclaims cannotreissueA afteracknowledgedwinner.
- CrossRPCabsoluteclock notrenewed; transportednativefields arecorrelationundergovernedcallgraph.
- Safeoutput/cachedstepresult cannotreconstructpublisheradmission.

## One bounded task
Files create lib/mcp-qa-finite-initial-entry.mjs, lib/mcp-qa-finite-initial-entry-records.mjs, test/mcp-qa-finite-initial-entry-native.test.mjs, test/mcp-qa-finite-initial-entry-records.test.mjs; extendnativefixture narrowlyifneeded; modifyworker/independent-closure/finite.mjs andtemporaryqualifier. Actualcompilerregression fixtures onlyasneeded.
Interfaces: runPrivateQaFiniteInitialPreparation({env,event,step}); createPrivateQaFiniteInitialEntry({ctx,env}).run(exactrefs); EntryClaimcodec; existingfiniteactormethodprepareFiniteInitialMaterial(refs). ExistingA API unchanged.
- [ ] Persist preflight/spec/plan/ledger BEFOREproduct, CAS/ref/exactreadback.
- [ ] AddmeaningfulREDnative/recordtests, scopedtemporaryhostedqualifier; verifyfeature-missingbehavior failurewithworkingharness.
- [ ] Implementstrictrecord andfixednativewinnergate; actualsync/readback beforeA, postAactualsync, safeoutput; mountfiniteonly.
- [ ] HostedGREENnativeunit/relatedA/C1/compiler/profile/residencychecks, lint; inspectactualrun/head/attempt/logs/counts/bytes/artifacts0.
- [ ] Fixonlyobservedfailures; no genericrewrite/testwave; preserveoriginalceilings/identities.
- [ ] Recordexactbase/code/docsheads, commands/run/job/counts/bytes/actualvsSYN/CAS/readbacks/remaininggates; appendledger; STOPfreshindependentspec+qualityreview.

Commands planned:
npm ci --ignore-scripts --no-audit --no-fund
node --test test/mcp-qa-finite-initial-entry-native.test.mjs test/mcp-qa-finite-initial-entry-records.test.mjs test/mcp-qa-finite-initial-material-native.test.mjs test/mcp-qa-finite-initial-material-records.test.mjs
node --test test/build-finite-native-package.test.mjs test/mcp-qa-finite-bootstrap-compiler.test.mjs test/mcp-qa-finite-profile-native.test.mjs
npx eslint <changed source/test files>

No actualproductionworkflowdispatch/sourcecommands. Hostedtests sourceonly, no promotion/readiness/PCoff proof.
