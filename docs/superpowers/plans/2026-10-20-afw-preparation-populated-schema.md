# SDD ledger — populated preparation schema qualification
Spec: ../specs/2026-10-20-afw-preparation-populated-schema.md
Base: 0ad0d59a30b6336879293d65a028501956b6c625/treef213fb3ccc2b72295874d7f7df95febc7e0a73e7 (PR516 exact tested tree; its fresh mainCI receipt will close integration separately). GitHub/Actions only; remote branch/spec/plan/PR/issue ledger substitutes local worktree/sdd scripts. Owner approved autonomous source work.

## Rulings
Ruling: test existing additive DDL, do not introduce an installer or alter installed migrations — cost if wrong: remote migration remains an explicit later operation, never inferred safe.
Ruling: bundle actual human GET/POST with two explicit CI auth/DB adapters, rather than duplicate its SQL — cost: real Access/browser behavior is still outside this qualification.
Ruling: compare full baseline row hashes/object definitions after every partial statement and exact replay — byte-preservation evidence only for synthetic native D1 fixtures, not backup/restore certification.
Ruling: actual human POST interleaves after real reservation, not Promise scheduling pretending generic concurrency — cost: standalone concurrent native consent writers remain deferred.
Ruling: existing behavior characterization may pass first run; no fake RED. No implementation change is planned.

## Tasks
1. Verify main/base/tree, existing seven DDL statements and exact human route; save source-only spec/plan/test first.
2. Execute existing full Actions tests/lint/five builds. Inspect failures before any fix.
3. One fresh most-capable whole-branch review; Important/Critical reproduce RED then one fix/GREEN, Minor ledger/defer.
4. Merge exact reviewed/tested tree with expected head; fresh mainCI/artifact metadata; issue497 receipt closes ledger, without docs-only retest churn.

## Interface checks
Existing D1 schema/data -> unchanged hashes/objects across additive DDL.
Partial exact dependencies -> source schema/store gate closed, actual human read usable.
CI auth/db adapter -> actual human route/generator/Drizzle/D1, never production identity.
Agent reserve -> actual human write -> agent fenced pending, history retained.
Conflicting source object -> exact reapply no repair, consent gate closed.

## Closure
No production source/DDL/drizzle/config/registration/secret/permission/deploy changes; no remote database, OAuth, support mail, Container, event guard, PC-off or Max actions. No G2 repeat/OTP. operationalReadiness=false. Future remote installation/recovery and own-only finite trial remain separate.
