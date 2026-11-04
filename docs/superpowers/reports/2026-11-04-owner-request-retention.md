# Owner request retention — source-only implementation receipt

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT finite source branch and credential-free GitHub Actions; ORIGIN delegated-canary.agentfriendlyweb.dev; RESOURCE_TYPE internal request bookkeeping/lease ancestry and fixed owner stage callgraph; ALLOWED_ACTION source edits and synthetic/native tests only. Rollback: revert this source unit before any separate promotion. No provider request outside synthetic fixtures, deployment, OAuth, Entry, permission or owner consent was performed.

## Exact source range

- Binding spec: `docs/superpowers/specs/2026-11-04-owner-request-retention.md`; implementation plan: `docs/superpowers/plans/2026-11-04-owner-request-retention.md`.
- BASE: `c12d109395f9c1d386cf665d7eea5e49c12e311a`, tree `0237bbf155c0bb4eebee5eaa0899aea17c63736b`.
- Branch: `feat/finite-native-cleanup-20261101`, sole writer, every ref mutation used the exact expected prior SHA.
- RED1: `8bb9018bc985921280dfd51de397b6d857ba2ad1`.
- RED2: `5986380c0eb956a1bf8aa3f9d0bfef8bfa6b5746`.
- First implementation: `be12e9ed00cc7ab6790cf1ceee7265b9d4d6587d`.
- codeHEAD: `c47d241476e642aeb6873a9f6f5f33dc10e7ff9e`, tree `d0a9b4deb0907fe1bc888f82d9ef93ce49ff19cc`.
- Reviewed code range: BASE..codeHEAD. The enclosing delivery commit changes only this report and removes the branch-only qualifier. It does not change the tested source/test bytes.

## Implemented contract

`observeFiniteOwnerRequestWork({ctx,env,originalLease},operation)` creates internal mode=request bookkeeping before actual work, accepts only a genuine original root, and retains the whole pending operation plus actual child operations. It never grants business authority. A conflicting request/readonly/owner lineage cannot replace the occupied entry. Release still requires original parent abort AND actual retained-promise settlement.

`readFiniteOwnerRequestContext(lease)` returns frozen `{root,deadline}` for a genuine request root or private registered resolver child/proof. Unknown/shape-cloned leases fail. A private descendant registration links to the original root; child bounds are the minimum of ancestor/identity/window deadline and the existing five-second ceiling. Root finish invalidates the linked descendants. Generic trusted Workflow/setup parents remain unbranded and keep their previous guards; no generic exported descendant mint was added. `readFiniteOwnerRequestDeadline` remains available and now accepts genuine registered descendants with their narrower deadline.

The factual source reader uses that genuine ancestry, creates no new incoming thirty-second parent, and uses `observeFiniteFactualReadWork`. Borrowing requires the actual ambient request entry, matching holders and registered root; a separate RPC or other request/holder cannot borrow. Standalone reads retain the original strict readonly observer; Unit A readonly and owner-only continuation remain separate.

The owner policy transport still executes the unchanged real one-use WeakMap `consumeFiniteOwnerStageAdmission` before `adoptFiniteOwnerRequestStageWork`. Adoption changes the SAME entry in place, preserving promise Set, ctx/env/storage/RELEASE_DB, original root/clock, and adding the actual consumed admission. Bookkeeping does not authenticate admission. Missing, DTO-supplied and replayed admission cannot reach a second provider effect; old standalone owner observation remains compatible.

Request body work retains a single actual read/failure/cancellation lifecycle. When a read settles after logical timeout, cancellation can start later without a registry gap. Original error/deadline remains the caller result; cancellation errors do not replace it. Existing size, field, Origin, cookie/CSRF and JWT/owner checks stay in preparation.

Actual `createFiniteOwnerPreparationHost` remains unmounted and returns a non-actionable pending503 view for GET/POST, with no form, cookie, ticket consumption, preparation or publication. No caller boolean/env flag/bypass was added. The former renderer moved to an explicitly test-only internal component fixture so prior genuine synthetic prepare/auth/ticket tests remain meaningful; actual pending host behavior has its own native regression.

The recorded Minor is fixed: the original project revision is restored to1 and a successful fresh factual read is asserted BEFORE changing the owner. Owner denial is therefore independent of revision denial.

## Native RED/GREEN evidence

All runs attempt1, Ubuntu24.04 / Node22, source checkout pinned to github.sha, `npm ci --ignore-scripts --no-audit --no-fund`, contents:read only. Tests use real Miniflare/Workerd, native D1/SQLite, the actual prepare/auth/ticket/store/transport/one-use consumer, and explicitly synthetic identity/provider/custody. They establish component behavior, not live cleanup qualification.

| Run / exact job | Head | Result |
| --- | --- | --- |
| [41885124589](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41885124589) /126767419372 | 8bb9018 | RED:0pass/5fail; scoped lint clean |
| [41885445510](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41885445510) /126768525324 | 5986380 | RED:0pass/7fail; scoped lint clean |
| [41885838856](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41885838856) /126769927786 | be12e9e | 98pass/1fail/0skip; scoped lint clean |
| [41886367879](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41886367879) /126771803825 | c47d241 | GREEN:57pass/0fail/0cancel/0skip; scoped lint clean; artifact hashes logged |

RED command (both RED runs):

```sh
node --test test/mcp-qa-finite-owner-request-retention-native.test.mjs
```

The first five REDs showed that an overlapping request/readonly observation was allowed after actual source, native GET ticket write, POST approval write or streamed-body timeout, and that the actual host still returned form200. RED2 additionally failed preserved pre-retained work across actual consumed transport handoff and true child/proof ancestry. These were assertion failures, not missing imports or fixture parse failures.

Initial implementation covering command:

```sh
node --test test/mcp-qa-finite-owner-request-retention.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs test/mcp-qa-finite-owner-preparation-native.test.mjs test/mcp-qa-finite-connection-preparation-native.test.mjs test/mcp-qa-finite-initial-owner-source-records.test.mjs test/mcp-qa-finite-initial-owner-source-native.test.mjs test/mcp-qa-finite-initial-scope.test.mjs test/mcp-qa-finite-initial-custody-probe-native.test.mjs test/mcp-qa-finite-pre-entry-host-native.test.mjs test/mcp-qa-finite-policy-setup-facts-native.test.mjs
```

All seven new native cases and three scope cases passed on that run. The only failing existing case was `the same verified Access expiration remains a fence across asynchronous primary preparation`: narrowed child timer returned503 rather than the established401. Root cause: its timer reached the identity deadline before the delayed operation re-entered its proof guard. The fix consults the actual parent guard before producing the generic child timeout, retaining the earlier identity cause. No deadline was widened or restarted.

Final affected verification and real graph compiler command:

```sh
node --test test/mcp-qa-finite-owner-request-retention.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs test/mcp-qa-finite-owner-preparation-native.test.mjs test/mcp-qa-finite-initial-owner-source-native.test.mjs test/build-finite-native-package.test.mjs
```

Final output:57tests,57pass,0fail,0cancelled,0skipped, duration63043.981155ms; process exit0. This includes the original401 case, all new causal native/scope cases, original and nested factual source/holder/abort/backward/remaining-request-budget cases, genuine one-use admission, old owner hooks and the actual staging compiler. Compiler tests retain completePackage=false and operationalReadiness=false and emit no eligible manifest.

The47 unchanged tests from the first covering run (connection-stage/final-selection transport, readonly scopes, source-records, B1 custody/pre-entry and old setup facts) passed there and were not repeated after the targeted error-classification correction. The latest applicable covering set is104 unique passing tests (57final +47unchanged). No full repository npm test, main CI, merge or release was claimed. Per task instruction, passed unrelated groups were not broadened or repeated.

Scoped lint command (exit0, no lint diagnostics):

```sh
npx eslint lib/mcp-qa-finite-stage-work.mjs lib/mcp-qa-finite-owner-{preparation,http}.mjs lib/mcp-qa-finite-policy-transport.mjs lib/mcp-qa-finite-initial-owner-source.mjs test/mcp-qa-finite-owner-request-retention*.test.mjs test/mcp-qa-finite-initial-owner-source-native.test.mjs test/fixtures/finite-{owner*,connection-worker,initial-entry-world}.mjs
```

Actions emits its pre-existing dependency/action deprecation notices; these are not lint diagnostics. Exact job logs/head/attempt were checked. No dispatch or rerun was duplicated to compensate for delayed list/status metadata.

## Hashes from final cloud job

```text
5057fb83a7a6fa0924db491a623a5e8cc4a92242c4ac1f086fb352538b3d726c  lib/mcp-qa-finite-stage-work.mjs
d516aacdf7f5128a494d7dfc6f678495ad5a1d4fa7cea414890b728c535b88ba  lib/mcp-qa-finite-owner-preparation.mjs
b506e1381593df110efcb18a3dfd7c140b46c56bafc30a5b5a6ba16a409644a9  lib/mcp-qa-finite-owner-http.mjs
f51fe4ebf2907660c69a9ccae708b905aa0d8b15c1aef7dcf438419f64f55eb1  lib/mcp-qa-finite-policy-transport.mjs
2b02c7a4f15f14ed3c2a13b3806bf83175fd58411f4875dfec8e05789c24f662  lib/mcp-qa-finite-initial-owner-source.mjs
6df2f5a822c97e2279936d1274cec4b0c07ee129e7c9877b950552473b42fc40  test/mcp-qa-finite-owner-request-retention-native.test.mjs
dbb30b3ecd957bf33a9938e72c5e4948a945fc60630390bd4d733aa28ec02ea9  test/mcp-qa-finite-owner-request-retention.test.mjs
```

## Self-review and rulings

Pre-flight: one cohesive task; no cross-task shared-interface conflict. Spec is binding. Self-review examined the exact BASE..codeHEAD diff, fixed consumer order, same-entry transition, original clock/ancestry, readonly exclusion, cancellation gap, fixture-only imports, actual host pending response and source/forward seams. No remaining material finding or deferred Minor in this source unit; fresh task review remains separate.

- Cloud-first ruling: use GitHub tree/commit/ref leases and Actions rather than local clone/worktree/dependencies/build or local skill-ledger scripts. This report and Git history are the durable task ledger; no local resource-heavy work or new destination.
- Fixture ruling: keep the former actionable renderer solely in a test fixture; exercise the actual production host separately as pending. Treating component tests as live approval/cleanup qualification would be incorrect.
- Native hold ruling: GET/POST storage tests hold the real native transaction's return/ACK AFTER commit, not a transaction-interior read; release RPC therefore does not deadlock on SQLite input gates. Committed facts survive; the late captured guards cannot append a later stage or effect.
- Verification ruling: after the single observed401 regression, rerun affected groups and actual compiler only; retain previously passed unchanged groups as dated evidence. Whole-branch/full CI and independent task review are pending outside this unit.

The branch-only `.github/workflows/finite-task1-temporary-qualifier.yml` is removed by this delivery. No temporary runtime override or RED fallback remains. Production imports contain no fixture path.

## Gates still pending

Cleanup handoff qualification; native route/controller mounting and source/forward seam availability; actual custody/identity/permission/consent and any separate promotion approval; main/full CI and fresh task review; the single consuming Entry coordinated with PC-off. No PC-on consuming rehearsal/reset occurred. Expired source ceiling and I0/C0/C1/T0 are unchanged.

**operationalReadiness=false; completePackage=false; actual host approvals=PENDING; PC-off=PENDING.**
