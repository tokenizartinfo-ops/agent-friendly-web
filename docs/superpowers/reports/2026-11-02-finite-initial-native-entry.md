# C2-B1 initial native entry — source qualification, awaiting fresh review

Date: 2026-11-02. Requirements remain [the initial-publication brief](../briefs/2026-11-02-finite-initial-publication.md). This is the bounded native-entry unit selected by Root, not the earlier proposed additional factual reader. No publisher, window, ownerSource, full package or operational activation was implemented.

## Revision and ruling chronology

- Accepted A source: `44dde8d14fd2ae9ab69d1c38a3599157d590bcd4`; accepted C1 remains unchanged.
- Root checkpoint/base: `f61ec7b2251672cc34016715c45dd3ecf085c14c`, tree `8aace9ea1b2c7da06b13499da72b33210b4d20d2`.
- BEFORE product, full supported preflight table, durability/causal refinement, Root selection, spec, plan and append-only ledger were committed as `69e338a3378d3fafaf8593def21802aac78308f0`, tree `fe275f0e5637624b59df79a75b40d58954a3436e`. All four files and branch ref were read back exactly.
- Meaningful feature-missing RED: `a50d07f36d40acee7ef4fdd0106150fbc35b8c00`.
- Final qualified source: `e95b4cf1b1f4d098c3c4e412678b79a3a389a8f7`, tree `670a7a9b117f5bb693804501147c60df8d1515cc`. All 12 changed files versus the Root base were exactly read back, and branch ref matched.
- This report/spec refinement/plan/ledger update is a subsequent documentation-only commit. Its exact SHA is reported in the final CAS/readback handoff; it is not represented as the compiler-qualified source SHA.
- Work stayed on `feat/finite-native-cleanup-20261101`, using non-force expected-SHA CAS updates. Root preserved the sole-writer boundary. No main update, provider query, live command, Workflow instance, deployment, publication, owner window, Max action or local build occurred.

The original approved invariant is **first acknowledged durable winner**, not first callback ever. The [preflight at the pre-product commit](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/69e338a3378d3fafaf8593def21802aac78308f0/docs/superpowers/reports/2026-11-02-finite-initial-publication-preflight.md) records the full original issuer/native entry/clock/source/custody/current-writers/byte ingress/inherit/baseline/rollback/journal/capsule table. Its unresolved publisher gates were not promoted into success DTOs.

## Implemented source

| Owning surface | Actual behavior | Source |
| --- | --- | --- |
| Finite Workflow route | Exact operation/payload; native Date/instance/name correlation; captured holders; fixed actor RPC; step retry limit 0; safe data only | [finite entry](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e95b4cf1b1f4d098c3c4e412678b79a3a389a8f7/worker/independent-closure/finite.mjs#L1), [wrapper lines 120–137](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e95b4cf1b1f4d098c3c4e412678b79a3a389a8f7/lib/mcp-qa-finite-initial-entry.mjs#L120) |
| Actor prerequisites | Exact refs, compiled M/tree and resident candidate, fixed actor, native storage/DB/node/version/namespace holders, original unedited owner command, current M and QA pointer, bounded reader custody | [entry lines 65–98](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e95b4cf1b1f4d098c3c4e412678b79a3a389a8f7/lib/mcp-qa-finite-initial-entry.mjs#L65) |
| Private EntryClaim | Fixed global key; exact canonical deterministic record capped at 4096 UTF-8 bytes; no random IDs or renewed timestamps | [record codec](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e95b4cf1b1f4d098c3c4e412678b79a3a389a8f7/lib/mcp-qa-finite-initial-entry-records.mjs#L1) |
| Durable winner | Native transaction final return only; get-if-absent/put; existing record never admits A; actual captured sync then exact readback | [CAS/barriers lines 99–109](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e95b4cf1b1f4d098c3c4e412678b79a3a389a8f7/lib/mcp-qa-finite-initial-entry.mjs#L99) |
| Actual A composition | Only surviving winner calls actual A.collect and A.assertCurrent; second captured storage.sync and current assertions precede safe success | [composition lines 110–115](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e95b4cf1b1f4d098c3c4e412678b79a3a389a8f7/lib/mcp-qa-finite-initial-entry.mjs#L110) |
| Native RPC result | Only documented own Symbol.dispose is handled at this transport boundary; exact remaining own-data fields/false flags; captured synchronous disposal in finally; first error preserved | [boundary lines 38–63](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e95b4cf1b1f4d098c3c4e412678b79a3a389a8f7/lib/mcp-qa-finite-initial-entry.mjs#L38) |
| Original lifetime | Wall/monotonic/abort checks, original absolute base, actor-only narrowing, child limit 5 seconds, retained actual storage/RPC/step promises before races | [clock lines 14–30](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e95b4cf1b1f4d098c3c4e412678b79a3a389a8f7/lib/mcp-qa-finite-initial-entry.mjs#L14) |
| Build graph | Actual finite QA class includes entry and codec; canary excludes them; compiler/issuer/esbuild and filesystem imports excluded from runtime graph | [compiler regression](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e95b4cf1b1f4d098c3c4e412678b79a3a389a8f7/test/mcp-qa-finite-bootstrap-compiler.test.mjs#L1) |

Success is exactly `{status:"material_recorded",entryHash,materialHash,sourceRevision,qaVersionId,authorizesEffects:false,completePackage:false,operationalReadiness:false}`. Failure is `{status:"admin_pending",mayRetry:false,operationalReadiness:false}`. No owner data, material bytes, script, function, capability or effect permission crosses this boundary. Ordinary entrypoints, source-authority defaults, bindings, profiles, exports, first finite HEAD and legacy keys remain unchanged.

## Post-implementation Root ruling on the clock distinction

This is a disclosed refinement after implementation observation, not a claim that the original pre-code sentence already described the final clock split.

Workflow and actor share the unchanged absolute `baseDeadline = min(native createdAt + 30000, fixed ceiling)`. The actor independently narrows to original owner-command `I0 + 300000` and verified custody expiry before Entry/A, and owns every A/possible future effect continuation. The deterministic record keeps `operationDeadline = min(I0 + 300000, createdAt + 30000, fixed ceiling)`; expiry narrows the invocation only.

The exact safe RPC output carries no deadline. The wrapper can receive factual data after the actor's tighter I0/expiry bound, provided its unchanged native base is still current. Root explicitly approved this distinction because the returned data confers no authority, effect permission or resumable continuation. The cost is potentially delayed factual output; this unit cannot grant a timely effect permit. The original base may never be widened. Future publication must remain inside the surviving winning actor continuation with independent gates. Fresh reviewers must evaluate this amended contract.

## Causal and durability limits

The transaction callback uses only storage and local validation, and its final successful return is the only winner oracle. A retried callback cannot leak a previous outer inserted flag. Native sync is required before exact readback/A and again after A. No allowUnconfirmed is used. A cached get or transaction Promise alone is not substituted for disk persistence.

If an entry never committed, another contender in the same original intent/deadline may attempt the same deterministic pre-effect CAS. If it committed but its ACK was lost, its durable entry blocks every contender. Existing, conflicting, expired, restarted or losing invocations never reconstruct A admission. A crash after durable entry deliberately sacrifices liveness. Unknown A outcome leaves Entry spent.

This exception applies only to the private deterministic pre-effect claim. Unknown actual upload/deploy/Workflow CREATE SEND/ACK never permits a resend. Promise retention, timeout, abort or RPC disposal does not prove physical process settlement or remote cancellation. The accepted factual A was not characterized as unsafe; the new composition adds explicit durability barriers.

Cloudflare primary storage sources are recorded with blobs/line references in the preflight: SQLite async KV includes transaction/sync; put/get can use a buffer; sync resolves after prior writes persist; native transactions are atomic/isolated and callbacks may retry. [SQLite storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) and [Cloudflare transaction explanation](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/) support the argument.

## Observed failures and exact fixes

1. Initial RED had 13 pass/9 fail. The actor/record failures were meaningful missing-product RED. One Workflow fixture failed at Miniflare RPC construction, so that case was not counted as a meaningful feature oracle.
2. Earlier Workflow fixture attempts constructed WorkflowEntrypoint through a test actor, then recursively called the same actor. The supported final fixture invokes the actual finite class run method in Worker context and performs actual Worker-to-DO RPC. Native Workflow event and step delivery are explicitly SYN.
3. The supported Worker-to-DO fixture then revealed a **production RPC boundary defect**: strict fields rejected the system-added disposer. Diagnostic run 41529389046 showed `finiteFields -> initialFields -> safe` at bundled lines 496/3673/4221, wrapper line 4345. No gate was relaxed to get a pass.
4. [Official RPC lifecycle](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/#disposing-rpc-objects-disposes-stubs-that-are-part-of-that-object), source `workers/runtime-apis/rpc/lifecycle.mdx` blob `ab3813ceecc3a2391dca8c8235cb2294e7a12225`, lines 114–125 and 140, documents a disposer on object results and synchronous disposal that does not wait for server-side disposal. Only that own symbol is normalized at native return boundaries. Record/actor parsers remain exact; other symbols/getters/extra fields are rejected. No remote drain claim is made.
5. Persisted restart fixture failed **before any restarted invocation**: exact snapshot was `[]` instead of prior rows. Locked Miniflare is `5.20260831.0-alpha`. Its [versioned converter](https://github.com/cloudflare/workers-sdk/blob/miniflare%405.20260831.0-alpha/packages/miniflare/src/config/v4-convert.ts#L72), blob `207fa88316c56c50319d23935d5fd583b9ad7f3c`, copies `resourcePersistencePath` (lines 72–74), not obsolete per-resource persistence options. The fixture now uses this actual native persistence root, disposes/recreates Miniflare, verifies exact rows before invoking again, then verifies no recollection. Scoped hosted temporary directories are removed after verified path checks.
6. Narrow additional RED found **production precondition gaps**: missing DB/node bindings allowed Entry to be written before later failure. Run 41530212673 had exactly those two failures (29/31 pass). Final source captures, requires and rechecks actual DB/node methods before entry. Missing sync and changed sync tests already passed.
7. Root accepted the disclosed base/actor-narrowed lease distinction above after implementation. No hidden clock widening or authority output was introduced.

## Hosted evidence

All runs were attempt 1 on the exact heads below; artifact inventories were independently fetched and empty. No run was dispatched manually.

| Head | Run / job | Result |
| --- | --- | --- |
| a50d07f36d40acee7ef4fdd0106150fbc35b8c00 | [41526693694](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41526693694) / 125556134751 | RED: 22 tests, 13 pass, 9 fail; lint pass |
| 6803318641e3248d304c4694f61dafe6f947f807 | [41527143949](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41527143949) / 125557689040 | 22 tests, 21 pass, 1 Workflow boundary failure; lint pass |
| 5240672a6ed7093f017fe0fc05cc959ed2a7918a | [41527420054](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41527420054) / 125558627250 | 22 tests, 21 pass, 1 Workflow boundary failure; lint pass |
| 4899b3b8666f100668707ed6ff45edbec34f668c | [41527758440](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41527758440) / 125559773140 | 26 tests, 23 pass, 3 boundary failures; lint pass |
| 6d73970fa2beb9c19fa6bc1b5f8219dec04097ba | [41529389046](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41529389046) / 125565364418 | Diagnostic: 26 tests, 23 pass, same 3 failures; lint pass |
| 59e999d0affc889e79e0b16149884e9e141bbd11 | [41529932538](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41529932538) / 125567180360 | GREEN: 26/26, lint pass; actual RPC and persisted restarts |
| 01cf00035a3f374c4a574bcc132916a8e11a9511 | [41530212673](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41530212673) / 125568144913 | Prerequisite RED: 31 tests, 29 pass, 2 fail; lint pass |
| e95b4cf1b1f4d098c3c4e412678b79a3a389a8f7 | [41530593619](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41530593619) / 125569445138 | Final GREEN: 68/68, 0 fail/cancelled/skipped; lint pass; artifacts 0 |

Exact final commands, Ubuntu 24.04 hosted runner, Node 22, existing lockfile:

```text
npm ci --ignore-scripts --no-audit --no-fund
node --test --test-concurrency=1 test/mcp-qa-finite-initial-entry-native.test.mjs test/mcp-qa-finite-initial-entry-records.test.mjs test/build-finite-native-package.test.mjs test/mcp-qa-finite-bootstrap-compiler.test.mjs test/mcp-qa-finite-candidate-residency.test.mjs test/mcp-qa-finite-profile-native.test.mjs
npx eslint lib/mcp-qa-finite-initial-entry.mjs lib/mcp-qa-finite-initial-entry-records.mjs worker/independent-closure/finite.mjs test/mcp-qa-finite-initial-entry-native.test.mjs test/mcp-qa-finite-initial-entry-records.test.mjs test/fixtures/finite-initial-entry-world.mjs test/mcp-qa-finite-bootstrap-compiler.test.mjs
```

The actual A/B1/B2/C1 composition is exercised by the native entry fixture with real source modules, SQLite storage, D1 and exact historical rows; their standalone accepted suites were not unnecessarily repeated. The final compiler/profile/residency checks were run once after source stabilized. Sequential file execution limits hosted contention in partial-parent tests.

| Compiled role/data | Actual bytes | SHA-256 |
| --- | ---: | --- |
| Canary | 1,942,384 (cap 2,097,152) | 4af04b7493866a5310d1955b4a43bbb49924a77522219461795fb2814fe6f335 |
| QA | 1,875,803 (cap 3,145,728) | 520026131ec65ea019bfb408e3e8d9d7e87798dd9d57d338ecbec782a3940b3a |
| Compressed resident canary | 381,302 | b309bbe88ca83aff914886443c6a216d65f16c40ed7ddde5b53659951597acd6 |

Program hash: `f6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6`. Compiler emits no eligible full-package manifest; completePackage and operationalReadiness remain false.

Baseline log noise: punycode deprecation; Actions v4 Node 20-to-24 host warning; SDK CIMD-disabled informational message. No compatibility flag, configuration or permission was changed to silence these messages.

## Actual versus SYN validation

Actual: compiled finite class and wrapper method; Worker-to-DO RPC and native disposer; SQLite DO transaction/get/put/sync; persistent SQLite restart; D1 repositories; A material producer/assertCurrent; resident candidate, bootstrap and historical source readers; compiler/profiles/residency and exact byte hashes.

SYN: external GitHub/Cloudflare responses, source pins/historical metadata/approval ceilings/custody data, original owner command, Workflow event/step delivery, fixture-controlled lost/held/rejected ACKs and callback retry scheduling. No genuine Cloudflare Workflow runtime was invoked; no live account/capability/clock/role claim follows.

The held-transaction fixture holds the ACK after an actual native transaction has committed. It proves the expired old ACK cannot enter A; it does not force or observe delayed disk commit. Callback retry coverage uses actual rollback, competing storage write and rerun, with SYN scheduling. Serializability plus final-return and deadline checks support the causal argument; this is not a measurement of provider disk scheduling or physical settlement. Root expressly accepted this honest test boundary for independent review.

## Remaining gates and stop

The source-owned callgraph, account and binding governance remain a trust assumption; transported native event fields are correlation, not cryptographic caller-script attestation. Source metadata, administrative tool success or stored DTOs do not prove key custody or authority.

Publisher B2 must independently resolve current global Workflow/native/D1 writers, exact source and publisher permission, actual 9aa REST capability, current custody, byte ingress/inherit/baseline/rollback/journal/capsule and ownerSource. No new role/key/proxy is inferred. All operational/full-package/PC-off flags remain false. Callback, Save, early withdrawal, receiver, full material, complete package and Task 4's deferred A oracle improvement remain separate.

Temporary `.github/workflows/finite-task1-temporary-qualifier.yml` is branch/path scoped, contents:read only, no secrets/artifacts/deploy, no documentation-only trigger, and **EXCLUDED from eventual integration**. Root must preserve that exclusion.

STOP: bounded source work and hosted qualification complete; fresh independent spec and quality review are still required. No operational or publisher action is authorized by this report.
