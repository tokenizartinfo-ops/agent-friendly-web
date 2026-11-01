# Task4B Task1 — strict finite material codec and actual nominal identity
2026-11-01 · AFW · SOURCE ONLY · operationalReadiness=false

Status: DONE for this bounded Task1; fresh root review pending. Task4A acceptance is unchanged; full4C/Task5 is not complete.

## Scope and provenance
PROJECT=Agent Friendly Web; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=isolated source branch; ORIGIN=https://github.com/tokenizartinfo-ops/agent-friendly-web; RESOURCE_TYPE=Git objects/branch and hosted Actions qualifier; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=bounded source/tests/docs commits plus branch-push qualification. ROLLBACK=preserved BASE and parent history; no runtime mutation or history rewrite.

- BASE: 9304b0b066f32340e21be0331fc1f6628029631a.
- Hosted RED: 9939d1e34d0b07749b8e22b555c40e63df73d8f3.
- Initial implementation: adc60db9bfe8c66e7a5d0d9d78450ec90f11f373.
- Qualified code HEAD: efe382046a4478da36f6405d71fd3301e7d0bb36; source tree a780d6dd110db8c5466db1bd0753a6d81a41655c.
- Documentation checkpoint: recorded in the final documentation receipt below; this source qualification does not imply a runtime release.

The branch lease began at the exact BASE and every ref update uses expected_sha CAS. Existing branch changes remain ancestors. Implementation used connected GitHub tools and hosted Actions only: no local source files/clones, dependencies, builds or runtime processes. No additional agent was spawned.

## Implemented interfaces
New pure lib/mcp-qa-finite-seed.mjs exports:
- encodeFiniteMaterialSeed(seed): canonical envelope string.
- decodeFiniteMaterialSeed(text): immutable {seed,seedHash}.
- validateFinitePackageManifest(value): immutable structural manifest copy.
- encodeFinitePackageManifest(value): canonical manifest UTF-8 string.
- hashFinitePackageManifest(value): lowercase64hex of afw.finite-native-manifest.v1 plus newline and canonical manifest.

The two manifest encode/hash helpers are the root's specific adjacent-Task2 interface clarification, now added to the brief. All five exports share private structural validation and canonicalization, with no generic caller schema or I/O/authority. Task2 resolver and4C builder can consume these exact names without duplicating canonicalization or fabricating a dummy seed.

Own-data snapshots reject accessors without invoking them, nonplain prototypes, prototype keys, symbols, sparse/extended arrays and unsafe/nonfinite numbers; immutable output never freezes/mutates caller objects. Canonicalization ASCII-sorts object keys, preserves array order and uses compact UTF-8 JSON without normalization/newline. Exact decoder roundtrip rejects noncanonical bytes and duplicate keys, including escaped duplicates, because duplicate-key bytes cannot equal the unique-key canonical projection. Seed and manifest use the new independent domains; existing intent/plan/control hash algorithms are unchanged.

Exact schemas/fixed values, five role descriptors, historical per-descriptor source provenance, module index.mjs/cap3145728/ASCII sorted unique exports<=128, true structural compatibility assertions, envelope32768/manifest24576 UTF-8 bytes, depth12/nodes2048 are enforced. Manifest source revision equals seed source revision; historical descriptor pins are not relabeled. Both digests are independently recomputed. ZIP code and actual package resolution are absent from this task.

workflows now has exactly confirmation and bootstrap in trial-control and external-plan validation/projection. Fictitious nominalRunId and its inequality with finalizer.runId are removed; legacy added nominalRunId is rejected as an unknown field. Actual nominal remains the existing native NamedConfirmation identity. Exact finalizer repository/run/attempt/job/workflow/source/ready-step validation remains; mismatching primary run/attempt/job/repository/workflow regressions block prepare/nominal.

The shared finite fixture regenerates only candidate canonical material under the corrected schema. One obsolete invalidity test now rejects zero finalizer run rather than equality to a fictitious nominal GHA run. No historical record/claim/effect/hash is migrated or reinterpreted.

## Hosted RED/GREEN and scoped lint
Temporary qualifier .github/workflows/finite-task1-temporary-qualifier.yml triggers push only on the isolated branch, contents:read, checkout exact github.sha/persist-credentials:false, Node22, eight-minute bound. It references no secrets or protected environment and MUST BE EXCLUDED from integration.

Hosted install command: `npm ci --ignore-scripts --no-audit --no-fund`.

Exact required RED and GREEN command:
```sh
node --test test/mcp-qa-finite-seed.test.mjs test/mcp-qa-finite-phase-inventory.test.mjs test/mcp-qa-finite-trial-control.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs test/mcp-finite-nominal-control.test.mjs
```
Directly affected external-plan consumers:
```sh
node --test test/mcp-qa-finite-finalizer.test.mjs test/mcp-qa-finite-http.test.mjs
```
Scoped lint:
```sh
npx eslint lib/mcp-qa-finite-seed.mjs lib/mcp-qa-finite-trial-control.mjs lib/mcp-qa-finite-external-contract.mjs test/mcp-qa-finite-seed.test.mjs test/mcp-qa-finite-phase-inventory.test.mjs test/mcp-qa-finite-trial-control.test.mjs test/fixtures/qa-finite-trial.mjs
```

| Stage | Commit | Run / job | Observed result |
| --- | --- | --- | --- |
| Intended RED | 9939d1e34d0b07749b8e22b555c40e63df73d8f3 | [41337195445](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41337195445) /124939411150 |86tests:31PASS,55expectedFAIL,0SKIP. Codec module absent; corrected fixture rejected by old nominalRunId validators. Lint expectedly reports absent codec file. |
| First implementation | adc60db9bfe8c66e7a5d0d9d78450ec90f11f373 | [41337288416](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41337288416) /124939688639 |160focused+47external-consumer PASS,0FAIL,0SKIP. Lint found one @next/next/no-assign-module-variable diagnostic. |
| Final GREEN | efe382046a4478da36f6405d71fd3301e7d0bb36 | [41337388559](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41337388559) /124939980962 |160focused+47external-consumer=207PASS,0FAIL,0SKIP; scoped lint0errors/0warnings; job success. |

Lint correction renamed only the local descriptor binding module to mod; no semantic changes. Final workflow logs and job steps were fetched and checked before completion. Focused tests include actual hosted Miniflare/workerd DO reconstruction/alarm checks with synthetic primaries, as well as independent canonical digest roundtrip, strict schema/private-field/malformed-key/type/numeric/export/hash/size/accessor regressions and no input mutation. Full suite/build/Task4A were not rerun; these are source checks, not live custody/installed binding evidence.

## Preserved boundaries and negative absence regression
lib/mcp-fixed-terminal-workflows.mjs is byte-identical to BASE: blob e612bce91071264520f5471911405662641d4c24. lib/mcp-qa-finite-source.mjs is unchanged/unavailable: blob36ff3e3c7e1b07bf1ce746ca375fcc6e46103802. Exact blob readback at qualified code HEAD confirmed both.

New phase-inventory regression keeps missing nominal blocked at arm, nominal, canary_restore AND qa_restore. Existing full inventory and terminal checks remain; active nominal blocks both restores and observer must complete at QA restore. The test's existing-instance control proves test transport validity; there is no positive absent-nominal authority. No arm-absence implementation, evidence brand/minter, new journal or SEND producer was introduced. Task1's nominal permission claim remains distinct from the future child-create SEND journal.

Original T0/N1/C0/C1/R1,180000ms preparation margin, native event/wrapper interfaces, provider event/70s and nested5s/20s leases and effect history are unchanged. No reset/replay/refund/new occurrence is authorized or spent.

## Remaining work / limitations
Codec acceptance proves syntax and hashes only; compatibility=true fixtures do not qualify actual exports/classes/configuration/profile/binding semantics. Actual artifact package creation/profile/native source factories/producer/receiver/full route remain4C; child-create SEND inventory/launcher belongs4C/Task5. Package resolver/ZIP and seed transport/once issuance/adoption belong later4B tasks. Source-compiled finite default stays unavailable.

No CF/private/provider probe, deployed runtime, real command/trial, token/custody/policy/role/credentials/OAuth/DDL, public/main merge, Max or PC-off operation was performed. No semantic profile or operational readiness claim follows from these207 synthetic/source checks. Root owns fresh scoped review, final broader qualification and any integration; this agent stops branch writes after documentation receipt.
