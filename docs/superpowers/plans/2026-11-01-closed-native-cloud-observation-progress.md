# SDD ledger — plan: docs/superpowers/plans/2026-11-01-closed-native-cloud-observation.md
Project AFW; repository tokenizartinfo-ops/agent-friendly-web; isolated cloud branch feat/closed-native-cloud-observation-20261101; source base main1b3409ee72cb26d902b086ce8ccb017004730654. No local checkout/build. No live intent yet.

## Preflight/interface scan
| Pair/task | Producer / consumer | Finding and ruling |
|---|---|---|
| Typed admission / native controller | native factories, typed claim / controller fixed native purpose | Add native factory and stateless inspector; keep old command unchanged; cross-kind reject before fetch. |
| Builder / controller | fixed pinned wrapper artifact / validate before any transport | Ruling: immutable source pin plus exact source SHA, canonical bytes/hash, not self-reported manifest authority. |
| Preparation / admission | read-only inspect / effects entry rereads event | No admission serialized; original comment wall ends maintained, one effects-process mono origin. |
| Native work / cleanup | own Workflow / owned Worker restore | Separate tries/aborts; preserve original R1 reserves and unknown outcomes. |
| Source CI / live job | synthetic/native qualification / protected main | Source CI has no protected secrets or runtime effects; no model/permission changes. |
| Admission task | two fixed kinds plus stateless metadata | Tests must reject forged/inspect/cross-kind authority; no general purpose selector. |
| Artifact task | fixed wrapper build, pinned validator, runner files | No arbitrary paths or caller module selection; native baseline tests secret-free. |
| Controller task | one candidate/Workflow / one restore | Existing phase-A clone behavior stays fixed. Workflow403 stops nominal, no scope workaround. |
| CLI/workflow task | owner/main/attempt1 fixed event / exact runner entry | Same queue:max writer and protected env; original clocks include setup; final DTO only. |

## Rulings
Use this versioned cloud ledger rather than local git-ignored workspace: owner explicitly prioritizes GitHub/cloud and no local clones/dependencies; cost is reviewer-visible bookkeeping in source.
Artifact pin is a transport/data validation boundary, not remote attestation against a compromised trusted runner. No credential decoding.
Owner unavailable before 2026-11-01T12:45:00Z. No OTP or new grants.
## Status
- Design preflight reviewed: 0 P1/P2 with precisions captured in spec.
- Task1 admission: implemented05b5ec34, cloud focused97PASS; independent task review0P1/P2.
- Task2 pinned wrapper artifact: implemented5db1655, cloud focused20PASS; wrapper48388B/SHA5b06e201...; independent task review0P1/P2.
- Task3 integration/entry/workflow: implemented on PR700; root source-only RED22fail; controller corrected to validate the three-module profile both inactive and active. Cloud qualification41282835144 now25PASS, including403, original clocks, unknown ACK and independent restore; old clone qualification also passes. Real CLI/guard contract tests delegated separately.
- Source CI, exact-head review, merge, new live intent: pending.

Ruling: source pin obtained by actual cloud build receipt41282383977, checked again41282445234; no raw modules in artifact/log. Root independently read job12477693622620PASS, correcting an accidental concatenated job-ID/20PASS in reviewer brief.

## Fix round1/5 (in progress)
Whole-branch/interim reviewed5c455/f461:0P1/3P2. P2 nominal result+await consumption and sleeporiginalbounds; P2 bestEffort restore starvation125s+10ms; P2 deniedcreate403/409 cannot authorize terminate of concurrentH. Minor nativecommentId/runId required. Delegated native_controller_fix_round1 with realcontroller RED→GREEN regressions. No merge/live until scoped re-review and corrected-head CI.

Fix round1 implementation7067e655/tree81245be2: original nominal consumers and sleep guarded, bestEffort restore uses min40s/originalR1remaining, known denied create excludes Workflow cleanup, nativeDTO comment/run present. Cloud RED41283403201 53PASS8FAIL; GREEN41283495287/job12478001111061PASS0FAIL for native+oldclone; nativequalification34PASS, clonequalification35PASS. Scoped re-review in progress. Task entry/workflow review0P1/P2; cloud57PASS and validator bypass mutant RED independently verified. No local/runtime effects.

Fix round1 scoped re-review7067e655 vs5c455: all3P2+Minor ADDRESSED, no newP1/P2; integratedb32f830d. CI on earlier5c455 had14sealed/1305focused/4753fullPASS0FAIL1skip, but lint found two test-only bindings named module forbidden by Next. Original task implementers renamed only those lexical bindings, no suppressions or production changes: CLI9a4d77d8 cloud57PASS+ESLint41283953447; artifact0e9d5e5b cloud20PASS+ESLint41283956331. Final integrated-head CI still required. Root inspected exact rename diffs; source and artifact pin unchanged.

Fix round2/5: prior real v2 total7867ms exposed functional cadence gap: 12polls×500ms can exhaust at~5.5s. RED41284851960/job12478397512861PASS1FAIL/premature5522ms; GREEN30d3f3c/41284934622/job12478422302462PASS0FAIL+targetedESLint, healthy7800ms provider fixture verified8033ms/termination0. Productive diff ONLYcadence500→1000ms, existing12GET/20s/N1/mono caps unchanged. Scoped re-review pending. Head022 fullCI41284048435/job12478161916114sealed/1313focused/4761fullPASS0FAIL1skip/lint0errors14existingwarnings/build+5packagesSUCCESS; new final head CI required after cadence fix. No live intent exists.
