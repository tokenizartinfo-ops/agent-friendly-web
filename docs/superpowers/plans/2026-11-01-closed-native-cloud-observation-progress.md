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
