# Finite readonly integration — source-only report

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated source branch and credential-free GitHub Actions; ORIGIN delegated-canary.agentfriendlyweb.dev; RESOURCE_TYPE finite source and synthetic fixtures; ALLOWED_ACTION source integration and cloud qualification. Rollback: revert this integration unit before promotion.

- Primary BASE: `73c6b79430db10ed9eaa663c9625569d8f88aba6`; incoming accepted source: `97a939037ed7a66b86a0a90c92c2b2ac2e957a68`; common ancestor: `ce76c9ac3cfd5332ae8957dfd9eab8bebdccbb45`.
- Integrated and tested source HEAD: `b43847adf24fad08b91eccd0f055b6dadd99d49c`, tree `22ef6cea59986ee647a6e6aff4129c1c74ad7520`. The final report-only commit is the commit containing this file, whose parent is that tested HEAD; it does not change source or workflow. Branch ref update used an expected-SHA lease.
- Primary capsule independently accepted in `docs/superpowers/reviews/2026-11-04-finite-initial-capsule.es.md`; incoming helper and Unit A approvals and small specs/reports copied under their existing names. Full review packages remain recoverable on the pinned incoming branch.

## Reconciliation and self-review

Six incoming source/test files are byte-identical to incoming. The shared fixture was reconciled against the actual common ancestor: the only incoming change is the fixed `preEntryCustody` method; removing exactly that insertion from the resulting fixture reproduces the complete primary fixture byte-for-byte. Its blob is `f10891ea00ae88eeab0b0e2d538c7c7910ed5771`. Thus the primary capsule, late HTTP/body cancellation, lost ACK and other faults remain intact. No unrelated source changes or new conflicts found. The incoming temporary qualifier was not copied. The primary branch-only qualifier was amended to cover the combined source; **all temporary qualifiers must be removed before final main integration/promotion**.

Readonly retains its independent <=15s lease, <=5s child reads, pending-work exclusion and retained outstanding work. It provides neither owner admission nor effect authority. H and context remain correlation, not credentials; the original reviewed administrative/binding trust boundary remains, and concrete contrary drift blocks promotion. Original ceilings, deadlines, cleanup arm, B1/A lineage and M versus historical rollback remain binding.

## Cloud validation

Credential-free Actions [41875644983](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41875644983), attempt 1, source HEAD above: focused job 126734176314 **162 pass, 0 fail/cancel/skip** and scoped lint success; compiler job 126734176073 **23 pass, 0 fail/cancel/skip**. No unchanged consumer suite repeated; its accepted capsule evidence remains Actions 41873478253 (140 focused, 102 consumers, 23 compiler plus lint). Fixture tests are synthetic; the exact historical module was not supplied.

Commands, from repository root (Node 22; `npm ci --ignore-scripts --no-audit --no-fund`):
```sh
node --test test/mcp-qa-finite-initial-cleanup-native.test.mjs test/mcp-qa-finite-initial-cleanup-records.test.mjs test/mcp-qa-finite-initial-capsule-records.test.mjs test/mcp-qa-finite-initial-capsule-native.test.mjs test/mcp-qa-finite-initial-workflows-native.test.mjs test/mcp-qa-finite-initial-history-schema-native.test.mjs test/mcp-qa-finite-initial-old-guard-native.test.mjs test/mcp-qa-finite-initial-gates-native.test.mjs test/mcp-qa-finite-initial-activation-wire-native.test.mjs test/mcp-qa-finite-initial-custody-probe-native.test.mjs test/mcp-qa-finite-initial-scope.test.mjs test/mcp-qa-finite-pre-entry-host-native.test.mjs
npx eslint scripts/qa-finite-pre-entry-custody-wrapper.mjs test/mcp-qa-finite-pre-entry-host-native.test.mjs test/mcp-qa-finite-initial-custody-probe-native.test.mjs lib/mcp-qa-finite-stage-work.mjs lib/mcp-fixed-terminal-workflows.mjs lib/mcp-qa-finite-initial-*.mjs worker/independent-closure/finite.mjs test/mcp-qa-finite-initial-cleanup-*.test.mjs test/mcp-qa-finite-initial-capsule-*.test.mjs test/mcp-qa-finite-initial-scope.test.mjs test/fixtures/finite-initial-entry-world.mjs
node --test test/mcp-qa-finite-candidate-residency.test.mjs
```

Stable wrapper source: 5889 bytes, SHA-256 `bc8d2e9ca942489631b8b9d0ee2920290a86a69b951a7506d36af66d40ea6b28`; synthetic two-build bundle: 40831 bytes, SHA-256 `24c4fb81917f74617d1af9a3c05f383882bb04b104516237abe300d38fb503f5`; both match incoming accepted evidence. The bundle has external baseline/context and is not a deployable artifact. Compiler on tested source emitted canary 1948550 bytes SHA-256 `6c8c1f85c4ae68b664e2eac380193ab880f4dc9d52a65cad42c2f1956e19bed3`, QA 1986238 bytes SHA-256 `5a61cca7db72ffd6d878cf974104748381733b3b7f22345689335b9894511f05`, program hash `f6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6`; source provenance differs from prior builds. These are ephemeral synthetic test outputs, not deployed artifacts.

## Remaining gates

Actual historical module 395915 bytes SHA-256 `4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f`, valid inherited methods/reachable binding holders, and retention interaction require exact qualification before upload. Unit B controller/command, current owner authorization, source ceiling, full artifact/preservation and independent restoration/readback, actual cleanup/live and whole-branch promotion checks remain separate gates. The source ceiling remains expired. No provider calls, credentials, OAuth, Entry commands, deployments or runtime changes occurred; no live or physical-settlement inference follows from these tests.

`operationalReadiness=false`; `completePackage=false`; PC-off pending.
