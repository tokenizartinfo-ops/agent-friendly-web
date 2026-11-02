# C3 premature finite admission — source qualification and review handoff

Status: implemented and qualified SOURCE ONLY; STOP for fresh independent spec + quality review. No independent acceptance is claimed. operationalReadiness=false; completePackage=false; PCoff=false.

## Exact scope and provenance

- PROJECT Agent Friendly Web; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT source-only branch feat/finite-native-cleanup-20261101; ORIGIN GitHub API and hosted Actions; RESOURCE_TYPE branch source/tests/docs; ALLOWED_ACTION bounded C3 library correction/qualification; ROLLBACK forward revert of this exact change set, no force or historical reset.
- BASE ae7afdb8820b509f761ac026d311f9c39ed8b0db, tree87e0e990d935aa501c77c2122a24beec889d9fd7. B1/C1/A source and first finite HEAD preserved.
- Pre-code constructor/classification/query/test table: plan commit6af54224896e9d6574bd10f39d374a997badb024, exact readback. Requirements are the admission preflight + Root refinement + bounded plan. Source edits began only after meaningful hosted RED.
- Final codeHEAD 06e424666e7cc1fcf277024aaed463f7d764dc24, tree72031c6b1aeeed48b907ece99182d110798487dd. Every changed file at this head was fetched by exact revision and matched the submitted bytes. Branch ref independently read back.
- Documentation HEAD is the documentation-only child that contains this report and ledger append. Its exact SHA, tree and successful CAS/readbacks are delivered in the final Root handoff; a commit cannot embed its own SHA. The code/build evidence below remains pinned to06e424, never retrospectively relabeled as measurements of documentation HEAD.

## Implemented behavior

The actual host first invokes custody's internal preflight inside its existing error/cleanup route; custody repeats the guard before beginAdmission. Native source is optional all-or-none in createFiniteNativePrimaryReader, opaque and source-owned. It captures actual DB/ctx/storage/namespace/version/program/control provenance. The existing gate privately retains it; no registration, arbitrary callbacks, ready DTO, caller SQL or reservation hash grants permission. Internal custody-scope checks bind the gate to its actual DB and original selectors. Writer lease objects are privately tied to their issuing gate/kind before SQL generation.

Live readOwnSuccessorHost, resolveSuccessorPreparation, event policy/current and authorization resolve lazily on admission assertion/constraint, not in constructors, historical primary reads, settlement, sealing or reduction. No #finite/#host/cleanup-factory/nativeCleanup.close recursion was added. Existing source-less historical cleanup constructions stay inert for admission.

The fixed first-primary cardinality-checked query verifies the exact prepared reservation and its actual original admission/closure joins. It requires slot/trial/scopeHash/application/predecessor pins/candidate program/source/container/exact window/budget1/state/closed_at, T0<=reserved_at<=SQL_NOW and start<=SQL_NOW<min(N1,candidate expiry,selector expiry). The actual ordinary admission INSERT...SELECT .run() adds the same source-owned EXISTS; manifest expiry<=reservation expiry and original issued-lease SQL deadline remain inside that EXISTS. Original grant/consent/revocation/scopes/closure/time predicates remain. No global admissionsCOUNT=1 was added; that remains reservation creation's distinct gate. Historical reservation observed_at does not renew a lifetime, and existing launch retirement/deployment fences remain unchanged.

Known-no-admission errors are exact private objects of one custody/current attempt. Only its own host recognizes them; public failures remain sanitized. A fresh definitive pre-marker denial can suppress close only after valid custody/gate reads and a successful source query showing no candidate admission/launch/closure. Any admission/launch writer, row, custody record or ambiguous prior observation disqualifies fresh classification. Root explicitly approved BEFORE product that reservation-only issued/pending markers do not themselves imply possible process: rejecting a premature subscription must not poison legitimate reservation completion. No marker is reset/refunded.

After beginAdmission, the marker remains spent/unresolved even for zero rows. Cumulative pending/executed/unsafe/possible-launch evidence lives outside the retriable transaction callback. Only success===true/meta.changes===0 for every execution and the exact private zero-execution failure can suppress close. changes1, thrown uniqueness, lost ACK, successfalse, malformed metadata, any non-zero-specific callback failure or possible launch stays unsafe. A later zero never erases earlier inserted/unknown/unreadable-custody evidence. Existing settled ready admission may use the original reconcile-only path, never a new admission/launch.

Root's later scope clarification is explicit: absent native source cannot reach admission SQL/runtime.launch through this changed host/custody composition. Standalone createSuccessorLaunchGate and its existing lease fixtures are unchanged separately owned APIs; journal begin* methods alone are not effect permission. This unit does not establish standalone launch authority or actual Worker finite wiring/factory qualification.

## Hosted RED/GREEN evidence

All runs below are attempt1, Ubuntu24.04, Node22/current lock, npm ci --ignore-scripts --no-audit --no-fund. Artifacts verified0 for every run. No secrets, deploy, provider actions or public workflow dispatch. Temporary qualifier is branch/path-scoped, contents:read, persist-credentials:false, no docs-only trigger; EXCLUDE it from eventual integration.

| Head | Run / job | Result and interpretation |
| --- | --- | --- |
| 4a7ed2d562d1d4d7636221f5cdcda0188fe55807 | 41534579290 / 125583058407 | 6 tests:1PASS/5FAIL. Missing and pending reservation actually produced second admission/closure/finite markers. Atomic race also failed. Two extra failures were the SYN callback-loop fixture, not product attribution. Lint0errors/1new anonymous-export warning, corrected next commit. |
| 227358d26643b1bfb2655c8600a84f3bc341db2c | 41534843953 / 125583952579 | 6 tests:2PASS/4FAIL. Three causal failures preserved: missing/pending snapshots changed, actual before-INSERT reservation mutation produced admissions1/closures1 vs0/0. Historical cleanup and valid actual custody passed. Fourth failure was leftover callback-count assertion in direct SYN runtime; corrected explicitly. Lint clean. |
| d7b6271aa1d5bea081a79ac3a446d7a6d245c9ee | 41535513699 / 125586227858 | First product GREEN36PASS/0FAIL/cancel/skip; lint clean. |
| 340cbfd390e565f49da6292d41ada6f2d08ae509 | 41536173382 / 125588447271 | Related qualification98 tests:96PASS/2FAIL,0cancel/skip; lint clean. Both failures were fixtures: pending release polled outside DO transaction and hit native blockConcurrencyWhile limit; prior-launch row lacked its required reservation FK. No source guard was relaxed. Original lease/reconcile, ordinary host/custody, historical cleanup/reductions, existing launch/reservation regressions passed. |
| c943a005b1b24b6f39e1faeaf4a7b909954c82bc | 41536732464 / 125590356443 | Focused3 tests:2PASS/1FAIL,0cancel/skip; lint clean. Both fixture repairs passed. Self-review's actual new RED: after ACK0 a retried callback read malformed custody, but close was skipped (0 vs1). Root confirmed sticky ambiguous-prior-state rule before correction. |
| 06e424666e7cc1fcf277024aaed463f7d764dc24 | 41537047289 / 125591439327 | FINAL 65 affected native/custody tests + 23 actual compiler/residency tests = 88 PASS,0FAIL/cancel/skip; scoped lint clean; artifacts0. Completed SUCCESS at 22:26 UTC. |

Final exact commands:

~~~sh
node --test test/mcp-own-finite-premature-admission-native.test.mjs test/mcp-node-process-custody.test.mjs
node --test test/mcp-qa-finite-candidate-residency.test.mjs
npx eslint lib/mcp-own-finite-primary.mjs lib/mcp-own-finite-admission-gate.mjs lib/mcp-own-finite-cleanup-host.mjs lib/mcp-own-durable-host.mjs lib/mcp-node-process-custody.mjs test/mcp-own-finite-premature-admission-native.test.mjs test/fixtures/finite-premature-admission-worker.mjs test/fixtures/finite-premature-admission-native.mjs test/mcp-node-process-custody.test.mjs
~~~

Earlier related run340cbf command also included test/mcp-node-process-custody-native.test.mjs, test/mcp-own-durable-host.test.mjs, test/mcp-own-finite-admission-gate.test.mjs, test/mcp-own-finite-cleanup-native.test.mjs, test/mcp-own-finite-reduction-native.test.mjs, test/mcp-successor-launch-gate.test.mjs, test/mcp-successor-reservation-native.test.mjs. Its96 passing results belong to340cbf, not a claim that an entire repository suite ran at final HEAD. Final production delta was the bounded custody sticky-error fix, so only its affected native/custody suites and one final actual compiler/residency check ran. The narrow RED used --test-name-pattern='pending underlying|prior-launch-row|rerun-zero-prior'.

## Actual vs SYN and coverage

Actual: workerd SQLite Durable Object transactions/storage; real D1 schemas and ordinary run()/all() query results; real monitoring authorization, successor resolution/reservation, primary/gate, durable-host rejected path, custody and launch-gate composition. Full DO+D1 snapshots remain unchanged for premature missing/reservation-pending subscriptions; later actual reservation INSERT succeeds. Host-pass/custody-denial, sixteen incorrect reservation fields, before-INSERT reservation/consent races, unresolved marker on ACK0, unknown/false/malformed/forged errors, actual uniqueness conflict, post-insert authorization/persistence failure, primary admission/launch/custody presence, callback retries inserted/unknown then0 and zero then malformed custody all have assertions. Partial/foreign native provenance and forged opaque source are denied. No-source custody is denied.

Actual positive custody uses its real source/gate and D1 admission; a SYN runtime supplies process observations. Ready reuse keeps exact snapshots and one launch; seal blocks another start. The migrated three older finite custody tests retain original reconcile and narrow-deadline/REAL-runtime makeControl assertions, now backed by native source rather than a source-less synthetic gate. Ordinary nonfinite and historical N1/revocation close/read/seal remain qualified. Existing standalone launch tests stayed unchanged.

SYN boundaries: fixture control/source/version/nominal approval; provider retirement/deployment observations; Container API and callback sender; deliberate time offsets; D1 transport failures; native transaction callback retry scheduling. The retry fixture schedules callbacks around actual native transactions; it does not force the platform's retry scheduler. Deliberate reservation corruption drops the fixture immutability trigger/ignores CHECK constraints only in ephemeral test D1; no production schema changed. The pending operation is a retained promise with a controlled microtask ACK boundary, not physical process settlement or delayed disk durability. Failed timer polling was replaced at the fixture boundary, not by changing production clocks. There are no whole-primary-facts success DTO substitutes.

No real provider credential, grant, native subscription, callback reception, useful cloud review, physical retirement, owner interaction or PC-off behavior is proved.

## Compiler evidence — exact06e424 only

Actual compiler emitted:
- Canary1948550 bytes, SHA2563bb6c35c8c23a6a85aed2d323b3761f554b8eee0cfaf4631070c91b11d2bbf58.
- QA1878261 bytes, SHA256d45ad49729e7b58badb0061aa9f9e2926ddb040ed7190a02c3e93fafbe725cbb.
- Node program hashf6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6.
- Source tree72031c6b1aeeed48b907ece99182d110798487dd. Existing2MiB candidate/3MiB QA limits unchanged; actual canonical compressed residency and bounded native decoder tests passed. No compressed byte count is inferred from prior-source evidence.

Noise preserved: npm deprecations for @esbuild-kit/esm-loader2.6.5, core-utils3.3.2 and eslint9.39.4; punycode DEP0040; Node SQLite experimental warning; checkout/setup-node v4 Actions Node20-host deprecation/forcedNode24 warning (test runtime remains Node22). Expected sanitized own_subscription_failed diagnostics occur in negative tests. No dependency/lock/config cleanup was bundled. Final lint has0errors/0warnings.

## Files, CAS and remaining gates

Production changes are exactly lib/mcp-own-finite-primary.mjs, mcp-own-finite-admission-gate.mjs, mcp-own-finite-cleanup-host.mjs, mcp-own-durable-host.mjs and mcp-node-process-custody.mjs. New tests/fixtures are test/mcp-own-finite-premature-admission-native.test.mjs and test/fixtures/finite-premature-admission-{native,worker}.mjs; three existing tests in test/mcp-node-process-custody.test.mjs migrated without dropping their original assertions. Temporary existing qualifier and documentation are the only other changes. Worker entrypoints, source-package helpers, lockfile, schema, roles/grants and original runtime resources are unchanged.

All ref writes used force:false and exact expected SHA. Verified chain:
ae7afdb →6af542 →4a7ed2 →227358 →d7b627 →340cbf →c943a0 →06e424.
Full hashes are in the evidence table and pre-code provenance above. Final11 changed files were fetched at06e424 and matched exactly; final branch ref and tree matched. Documentation append preserves existing Root refinement, plan and full ledger prefix; its final CAS/ref/exact-file results are returned with docHEAD.

Remaining owning gates: fresh independent spec/quality review of this unit; actual Worker finiteGate wiring/factory and full source composition; callback readiness/verification; useful receiver turn; Save/early withdrawal; initial publisher/all writers/custody/rollback/ownerSource and complete publication package. No runtime fix, rollout, main merge, publication, provider/Container/cron/Workflow CREATE, token/role/OAuth change, owner window, Max/mail/chat/automation or real attempt occurred. No local source/clones/dependencies/builds/tempfiles/processes; only bounded skill text reads used local access. STOP/release sole-writer role for Root's fresh independent reviewers.

Evidence links: [final run](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41537047289), [final job](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41537047289/job/125591439327), [exact code](https://github.com/tokenizartinfo-ops/agent-friendly-web/commit/06e424666e7cc1fcf277024aaed463f7d764dc24).
