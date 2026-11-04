# Fixed factual initial owner source — source-only report

PROJECT AFW; REPOSITORY `tokenizartinfo-ops/agent-friendly-web`; ENVIRONMENT finite source branch and credential-free synthetic GitHub Actions; ORIGIN `delegated-canary.agentfriendlyweb.dev`; RESOURCE_TYPE fixed IndependentClosure factual reader; RESOURCE_ID `afw-own-successor-closure-v1`. ALLOWED_ACTION source implementation and credential-free synthetic/native qualification. Rollback: revert this source unit before promotion. No actual provider request, credential access, deploy, OAuth, permission, Entry command or owner consent.

## Revisions and current qualification

- Task BASE: `3ee192749d45824707bcc621df33e4e61d67ed24`.
- Branch: `feat/finite-native-cleanup-20261101`; sole-writer ref updates used exact expected-SHA leases.
- Final code/test/qualifier HEAD: `e38b1ef4c20a1672a2e9fe49130ae25d256e4a98`; tree `f7cde7c577beaadc0cb6cf048c35351470cd4ebf`. This report-only commit follows that HEAD; it changes no code.
- Accepted prerequisites remain capsule `bae656253793eca490e9d7d38cd3a8cb142ba0c4` / Actions 41873478253 and readonly integration `b43847adf24fad08b91eccd0f055b6dadd99d49c` / Actions 41875644983; neither was reimplemented.
- **Final same-HEAD qualification PENDING / NOT ACCEPTED.** At 17:50 UTC, connected run listings and an independent root no-cache GitHub API check had not exposed a run for e38. The presence of source and a workflow is not evidence of execution. Do not promote from this interim report.

## Implemented bounded contract

`readPrivateQaFiniteInitialOwnerSource({ctx,env,parent,preconnectionId})` is UNMOUNTED and returns exactly the private factual envelope `{source,preconnectionId,capsuleHash}`. The unchanged `validateFiniteOwnerSource` grammar validates its inner source; envelope metadata never enters the source DTO/snapshot grammar.

The entry requires a genuine original incoming `createFiniteOwnerRequestLease` lease through the existing private request-deadline WeakMap. It narrows that original <=30s wall/monotonic deadline and uses <=5s children. It opens the already-accepted readonly retention scope before actual reads and tracks the entire actual storage, fetch, body read and awaited cancellation lifecycle through settlement, even after timeout. The scope provides no publication admission or effect authority and does not encompass later ticket/approval/provider writes.

It reads the fixed immutable capsule and actual Entry/Claim/Selector/Material/Ack and six pending cleanup/activation records, decodes strict codecs, reseals the complete same-lineage capsule and checks exact alarm at C0. Extra cleanup transitions, finite trial state, policy effect history, selected preparation or original-A stage approvals deny. Native storage, actor/namespace methods, source/candidate literals, QA version, RELEASE_DB/node methods, loaded aliases and fetch holders are captured and checked. A caller ID, if supplied, must match original material/capsule A; none is generated.

Fresh fixed primary observations repeat both loaded token identities/unchanged original expiries, QA deployment/version/module and exact QA configuration, actual M deployment/version/module/configuration and complete bindings, plus the real first-primary project owner/revision. QA/canary version metadata is distinct from mutable saved settings; unrelated owner data is not normalized or written. The original container identity is checked against the actual fixed node namespace method. Stable source and stored anchors are repeated before return.

Mapping is deliberately qualified rather than copied across unlike conventions:
- Capsule configurationHash is the restoration commitment. The same actual qualified M configuration produces owner initialBaseline.configurationHash via activationConfigurationHash. Complete name-sorted, key-canonical bindings use plain SHA-256. The M module is checked against actual fetched bytes and resident candidate bytes. Historical 2607 remains rollback, never initialBaseline.
- programContext.programHash/sourceRevision come from material.originalContext.original (Q), not artifact M. originalContextHash uses `afw.finite-original-context.v1` over the retained five-field artifact projection without script. Native tests deliberately have unequal original Q and artifact M identities.
- Source phase is closed_ui, publication stage/receiptHash are null with actual M UUID/deployment. Window is I0..C0=I0+900000; C1 stays C0+180000 and original custody bounds apply. Historical capsule recording precedes the technical 300s limit, while factual reads can occur after that limit and before C0. No technical authority or window is renewed.

Existing owner source, all three forwarding exports, owner HTTP and native production mounts remain unavailable and unchanged.

## RED / initial behavior GREEN / final checks

All execution used Actions (Node 22, `npm ci --ignore-scripts --no-audit --no-fund`). No local clone, dependency installation, build, container or test run.

1. RED `252b3ffeb09d638c715fee251c0add7251965db0`, Actions [41877858830](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41877858830), job126742183626, attempt1:
   `node --test test/mcp-qa-finite-initial-owner-source-native.test.mjs`
   **2 pass / 2 fail / 0 cancel / 0 skip.** Expected causal failure: unavailable status versus exact factual envelope; actual pending-read boundary also absent. Dependency/compile/setup steps passed.
2. Expanded test-only RED `530473463bedd629dcaa0481f2af49e012f4e14f`, Actions41879068205, job126746516792, attempt1. This added actual fetch/read/cancellation and closed seam coverage before product implementation. Its final logs will be recorded when read.
3. First implementation `11aea7cd788d089885b864ca7d87eccfefedb89d`, Actions [41880138792](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41880138792), job126750150004, attempt1:
   `node --test test/mcp-qa-finite-initial-owner-source-records.test.mjs test/mcp-qa-finite-initial-owner-source-native.test.mjs`
   **9 pass / 0 fail / 0 cancel / 0 skip.** Scoped lint failed only Next no-assign-module-variable at line125. e38 renames that local to qaModule; it also adds original near-expired request/abort coverage, zero-write-attempt assertions and disposes newly added snapshot RPC results.
4. Final e38 qualification is pending. Required command:
   ```sh
node --test test/mcp-qa-finite-initial-owner-source-records.test.mjs test/mcp-qa-finite-initial-owner-source-native.test.mjs test/mcp-qa-finite-initial-capsule-records.test.mjs test/mcp-qa-finite-initial-capsule-native.test.mjs test/mcp-qa-finite-initial-cleanup-native.test.mjs test/mcp-qa-finite-initial-entry-native.test.mjs test/mcp-qa-finite-initial-scope.test.mjs test/mcp-qa-finite-initial-custody-probe-native.test.mjs test/mcp-qa-finite-pre-entry-host-native.test.mjs
npx eslint lib/mcp-qa-finite-initial-owner-source.mjs test/mcp-qa-finite-initial-owner-source-*.test.mjs test/fixtures/finite-initial-entry-world.mjs
   ```
   The qualifier then prints wc/sha256sum for the reader, both new tests and the shared fixture. These SHA-256 values are not yet measured and are not invented here. No broad/full suite was claimed. Runtime worker/mount source graph is unchanged because only a new unmounted library and its synthetic fixture import were added; native bundling exercises that new graph. Whole-branch compiler/package/promotion remains root's separate gate.

Metadata limitation: repeated API snapshots reported queued while the first RED job's actual logs show execution17:28:40..17:29:27; a later completed/failure metadata read and root independently corroborated completion. Those observations do not establish runner capacity, credentials, provider health or the cause of the discrepancy. We did not rerun a completed occurrence to compensate for metadata delay.

## Self-review, preserved fixture, hashes

Changes from BASE are exactly the new reader, two new tests, isolated synthetic fixture additions and the branch-only qualifier. Removing only the new reader imports/methods, synthetic QA response and fault additions, method instrumentation and outer helper from the final shared fixture reproduces the entire BASE fixture byte-for-byte (46,371 characters). Thus prior capsule append/late HTTP/body/cancel/lost-ACK machinery is intact. No subagents or external reviewers were used. Static self-review found no unresolved implementation defect; qualification remains pending.

Measured Git object identities at final code HEAD (SHA-1 blob IDs, not SHA-256):
- `lib/mcp-qa-finite-initial-owner-source.mjs` — Git blob SHA-1 `b57c8151c309bd00526474417b1afec07093c3c2`.
- `test/fixtures/finite-initial-entry-world.mjs` — Git blob SHA-1 `a7cc3a70788d04a412cafbf06db3c793a2e5efa2`.
- `test/mcp-qa-finite-initial-owner-source-native.test.mjs` — Git blob SHA-1 `304750ae6775f1c59c3c51bae39e70b13fbb9ac7`.
- `test/mcp-qa-finite-initial-owner-source-records.test.mjs` — Git blob SHA-1 `15159977e639d821cf683a1e6005a1f501f0ed7c`.

The final branch-only `.github/workflows/finite-task1-temporary-qualifier.yml` must be EXCLUDED with other temporaries before final main integration.

## Explicit later bridge and remaining live gates

The existing owner resolver currently passes a child lease to its unavailable seam, so this standalone original-parent entry is **not** claimed compatible with that seam. A separate native request-retention/lineage bridge must start before body/source/identity/storage, retain actual GET ticket and POST approval writes and explicitly hand off the same outstanding set/holders/original lease using genuine consumed stage admission, with no delete/recreate gap. The initial GET must retain original A/envelope hash; POST must block before consumeTicket until cleanup handoff is qualified. No readonly scope is converted into authority here.

Exact historical baseline module/holders, Unit B controller/command, current source ceiling/custody/owner authorization, complete artifact/preservation, whole-branch checks, cleanup/live operation, independent restoration/readback and the coordinated PC-off occurrence remain separate gates. Follow the single-live-pcoff-sequence spec: all non-consuming prerequisites first; consuming Entry is reserved for ONE coordinated PC-off occurrence, with attended bootstrap and owner phases in that same occurrence, never a partial live qualification or separate full PC-on rehearsal/reset/rearm. Initial I0, C0/C1 and business T0 clocks stay unchanged; the source ceiling remains expired.

`operationalReadiness=false`; `completePackage=false`; PC-off pending.
