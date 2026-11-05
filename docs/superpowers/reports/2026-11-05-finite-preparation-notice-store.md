# Finite native preparation notice store — implementation receipt

Status: DONE — SOURCE ONLY / UNMOUNTED, pending root's independent full-BASE-diff spec and quality review. 2026-11-05 UTC.

## Scope, authority and immutable identity

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006, PUBLIC); ENVIRONMENT=GitHub source / GitHub-hosted Actions SYN; ORIGIN=GitHub App API; RESOURCE_TYPE=isolated source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=three mapped product files, this report and temporary path/branch-scoped credential-free qualifier. ROLLBACK=only own commits with a fresh expected-head CAS, preserving any foreign head; no runtime rollback or historical data changes.

- Activated BASE: `7a2a1c1ffa66b21ae0aa8ad7d0a5ef0c4a2441be`; tree `616d1e6187e652f07c067683a12b40c564da78d8`.
- Causal RED head: `916173f8507d55c7ac91940367918e7cd1677114`; tree `7b531ebb31d07962afbcc845c49c35b32ed03f21`, direct child of BASE.
- Qualified codeHEAD: `e7846aa4f3443d6f4b29973860e54415fbb7ccc8`; tree `46f0382aa201466a7a5fcf644bd638128d717e6a`, direct child of RED.
- reportHEAD means the commit introducing this immutable report and removing the temporary qualifier. Its exact SHA/tree are supplied by the final CAS readback/handoff (a commit cannot embed its own content hash). The three product blobs are identical to qualified codeHEAD. No repeat suite is claimed for this documentation/qualifier-removal head.
- Store blob `0869acc3482a3367c9c12e191e1058ba74849a2a`; fixture blob `055ac2c8e24e27f39ca51399f989ab3f86607ef3`; new test blob `4ce076605b9e700724bc409b2e3752c9c2c6199e`.

Binding requirements: [task brief](../briefs/2026-11-05-finite-preparation-notice-store.md), [root preflight](../reviews/2026-11-05-finite-preparation-notice-store-preflight.es.md), activated by root with exact BASE. No whole plan/history, private coordination, other project, runtime or provider inspected.

Root's [authority ruling at docs commit 644b82cbeeba9161274760a32b97c0a2879d2c54](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/644b82cbeeba9161274760a32b97c0a2879d2c54/docs/superpowers/reviews/2026-11-05-finite-preparation-notice-store-authority-ruling.es.md) corrects one expectation: the existing resolver returns enabled:true after CLOSE with a live grant, then rejects natively after original revokeGrant because its SQL filters revoked grants. The test asserts that real rejection as `resolverDeniedAfterRevoke:true`; no returned enabled:false DTO is invented, and authority production code is unchanged.

## Delivered source

Exactly three product files:

1. `lib/mcp-qa-finite-preparation-issuer-store.mjs` (268 lines): additive frozen seven-DDL metadata, isolated monitoring DATA boundary/schema preflight, three methods on the existing factory, native conditional SQL and private witness/attempt/failure state.
2. `test/fixtures/finite-preparation-issuer-worker.mjs` (306 lines): notice-only SYN schema installation/scenarios, real original issuer chain, native D1 queue/commit ACK gates and original authority reduction. Original cases still do not install monitoring schema.
3. `test/mcp-qa-finite-preparation-notice-native.test.mjs` (83 lines): 114 native notice tests, including complete equality with original SQL files and one shared compilation for this test file.

Locations at qualified codeHEAD: frozen monitoring schema line 31; new private state/helpers line 125; insertMonitoringTicket line 171; observeMonitoringTicket line 181; insertMonitoringConsent line 193; fixture notice scenarios line 54; test causal positive line 23.

No new production import, dependency, table, migration, journal operation, helper module, entrypoint, hook or mount. The fixture adds a test-only import of the existing `dossier-monitoring-authority.mjs` and its existing graph so reduction can exercise the actual resolver. Standard production import/mount/dependency graphs are unchanged; no extra standard compiler was run.

The new methods snapshot DATA synchronously before first await. Descriptor extraction excludes the witness, then existing initialOwn bounds apply before canonical size<=16384. The private WeakMap binds the original reference, detached row, identity hash, complete grant/common/window, ticket and same lease; consent consumes it before preflight/await. Serialised/cloned/foreign instances and leases deny. Attempts are instance-local and failure-absorbing; they do not establish durable cross-store exclusion.

Both INSERT SELECT RETURNING statements and the fresh-primary conditional ticket SELECT include current owner/revision, exact original open fence, consumed original authorization, exact active grant/scopes/canonical times and exchanged_at conditions, native n.ms, all DATA ceilings, and MAX(sequence)=0 plus absence of any prior event for this grant. Consent re-joins all fourteen ticket fields at commit, uses native n.ms as issued_at and retains absolute permission expiry. There is no recovery read/fallback after a failed mutation.

## Primary RED

[Actions run 42064402363](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42064402363), [job 127374420789](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42064402363/job/127374420789), attempt 1; exact head/tree above. Job terminal failure is the expected causal RED.

Command:

```text
npm ci --no-audit --no-fund
node --test --test-name-pattern="REAL first notice uses native original issuer grant" test/mcp-qa-finite-preparation-notice-native.test.mjs
```

Original openFence → insertAuthorization → consumeAuthorization → insertReadGrant all returned native success, with original grant UUID asserted before the failure. Assertion: `native grant reached; monitoring invocation: store.insertMonitoringTicket is not a function`. DDL/bundle/fixture setup succeeded; no substitute method/fallback. TAP 1 test, 0 pass, 1 fail, 0 cancelled, 0 skip, 0 todo; test duration 1148.94845ms. One native fixture compilation: 177245 bytes. No standard compilation.

## Primary GREEN and lint

[Actions run 42064801768](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42064801768), [job 127375852461](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42064801768/job/127375852461), attempt 1; head `e7846aa4f3443d6f4b29973860e54415fbb7ccc8`, tree `46f0382aa201466a7a5fcf644bd638128d717e6a`. Completed success 2026-11-05T16:30:36Z.

```text
npm ci --no-audit --no-fund
node --test test/mcp-qa-finite-preparation-notice-native.test.mjs test/mcp-qa-finite-preparation-issuer-native.test.mjs
node node_modules/eslint/bin/eslint.js lib/mcp-qa-finite-preparation-issuer-store.mjs test/fixtures/finite-preparation-issuer-worker.mjs test/mcp-qa-finite-preparation-notice-native.test.mjs
```

147 tests = 114 notice + 33 unchanged original issuer regressions; 147 pass, 0 fail/cancelled/skipped/todo, 96870.022336ms. Scoped lint exited 0, no ESLint diagnostics. No full npm test, full lint, standard build, remote smoke or publishing acceptance claimed.

Actual compilation count: GREEN new test compiled once, 191380 bytes. Original unchanged runner compiles once per scenario: 33 further native fixture builds, so 34 native builds in GREEN, 35 total including RED. Standard builds: zero. No suite was repeated to obtain hashes. Both jobs installed 649 packages only in cloud. Actual npm ci commands did not contain --ignore-scripts; root requested that flag for any later run after the already-started GREEN. There was no later installation/run.

Runner: Ubuntu 24.04.5 image ubuntu-24.04 20261101.360.1, Node 22.23.4, npm 10.9.9. Qualifier permissions contents:read/metadata:read, checkout persist-credentials:false/fetch-depth:1; no explicit secrets, provider calls or credential custody. Temporary qualifier is removed from final BASE diff. No local clone, dependencies, tests, builds or persistent worker was used.

All actual warnings, deduplicated and sanitised (not suppressed):

```text
(node:2482) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(node:2482) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.hirok.io
npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.hirok.io
npm warn deprecated eslint@9.39.4: This version is no longer supported. Please see https://eslint.org/version-support for other options.
##[warning]Node.js 20 is deprecated. The following actions target Node.js 20 but are being forced to run on Node.js 24: actions/checkout@v4, actions/setup-node@v4. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
(node:2191) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(node:2191) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(node:3015) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
```

Git emitted its normal initial-default-branch advisory during checkout. No workerd/esbuild test warning or lint rule warning occurred.

## Native acceptance and hostile cases

- Positive: actual original issuer grant → real ticket → conditional SELECT as first statement on a fresh first-primary session after schema preflight in other sessions → one returned consent event. Exact 14/12 result fields, native timestamp, positive safe actual sequence, detached/frozen output and unchanged grant row asserted. Absolute permission was >=10000ms beyond original issue and >5000ms beyond native event issuance; never replaced by child deadline.
- Per-grant MAX starts at 0 although global sequence already exceeds 1; returned original sequence>1 and two foreign SYN histories remain. Replayed same witness and a fresh-store attempt against a prior event deny/no_mutation, respectively.
- Hostiles: cloned/JSON/raw-row/store/lease witnesses, getters (counts stay zero), symbols, prototype, sparse/oversize/deep DATA, extra keys, arity and every Common field group; ticket DATA altered in each of six fields. Invalid writes emitted no monitoring mutating SQL.
- Native race gates: ticket/consent owner, revision, grant owner/project/client/resource/scopes/revocation/created/expiry/exchanged, consumed authorization, fence and competing event; consent additionally re-compares a changed ticket row after preflight. Every gate was reached before child deadline; own new row was zero. Normal ticket UPDATE aborted by the original immutability trigger. The isolated SYN tamper case removed only that trigger after preflight and altered request_id before release; it is not a possible legitimate mutation under intact schema.
- Schema negatives: both missing tables, changed constraint/unique/index/trigger, extra index object, wrong type, unsupported native clock and ISO deny before monitoring writes. Seven constants are frozen and normalised equality to original db files is asserted; no DDL is executed by production.
- Both native INSERTs held before actual bound.first for 5100ms, with original SYN parent<=30000ms and long DATA lifetimes. Gate was reached before window deadline and actual native query returned no_mutation after release; no earlier JS child-window check produced the result.
- Fourteen earliest-ceiling cases (both INSERTs × seven chosen ceilings) asserted gate before deadline and before effective minimum, released at minimum+50ms or later and returned no_mutation. The exact native receipts below expose inherited ties rather than claim a single predicate was independently isolated.
- Both barrier-wins cases completed original CLOSE and first-statement fresh-primary barrier read before releasing queued native INSERT; no new notice/ticket row. Grant-wins case kept the actual event after CLOSE and original observeGrant→revokeGrant; native resolver true after CLOSE, then denied after revocation, with event retained and no new grant.
- Both post-commit ACK losses left actual committed rows but rejected the caller, blocked both write retries and denied witness reconstruction in that instance, with zero second INSERT. Both held-after-commit cases aborted the SYN lease, observed the original Promise still pending, then released native settlement and got rejection with persisted row intact. No physical cancellation/drain or cross-RPC replay guarantee is claimed.

51 gate-bearing scenarios reached their actual SQL/ACK gates: 29 tuple races + 16 deadline/ceiling queues + 2 barriers + 4 post-commit ACK/held cases. Other cases do not masquerade as gate qualifications.

```text
SYN ceiling ticket C0 minimum=1793896184954 ties=C0,consent,grant,Access,preconnection,ticket,permission gate=1793896182009
SYN ceiling ticket consent minimum=1793896188166 ties=consent,grant,Access,preconnection,ticket,permission gate=1793896185237
SYN ceiling ticket grant minimum=1793896191380 ties=grant,Access,preconnection,ticket,permission gate=1793896188429
SYN ceiling ticket Access minimum=1793896194710 ties=Access,ticket,permission gate=1793896191944
SYN ceiling ticket preconnection minimum=1793896197924 ties=preconnection,ticket,permission gate=1793896194974
SYN ceiling ticket ticket minimum=1793896201141 ties=ticket,permission gate=1793896198190
SYN ceiling ticket permission minimum=1793896204358 ties=permission gate=1793896201408
SYN ceiling consent C0 minimum=1793896207569 ties=C0,consent,grant,Access,preconnection,ticket,permission gate=1793896204640
SYN ceiling consent consent minimum=1793896210886 ties=consent,grant,Access,preconnection,ticket,permission gate=1793896207982
SYN ceiling consent grant minimum=1793896214476 ties=grant,Access,preconnection,ticket,permission gate=1793896211549
SYN ceiling consent Access minimum=1793896217823 ties=Access,ticket,permission gate=1793896214893
SYN ceiling consent preconnection minimum=1793896221211 ties=preconnection,ticket,permission gate=1793896219538
SYN ceiling consent ticket minimum=1793896224451 ties=ticket,permission gate=1793896221760
SYN ceiling consent permission minimum=1793896227921 ties=permission gate=1793896225046
```

## Preservation and final-diff verification

Before final docs/qualifier removal, actual Git tree readback found only the three product files plus the temporary qualifier changed from activated BASE. Source-string comparison confirmed unchanged exact original issuer imports/constants (5053 bytes), factory/input/preflight/helpers (6071 bytes), and all original method bodies/closing suffix (7188 bytes). Original input witness exclusions, issuer SQL, issuer schema and original exports remain intact. The new metadata export is additive. Original test runner blob is unchanged.

Protected blobs read back unchanged at qualified codeHEAD:

- `lib/mcp-qa-finite-owner-phase-context.mjs`: `ebebaa9542c2408c0d505d1e23daa946762c1cab`.
- `lib/delegated-oauth-worker.mjs` (M): `d979f395029c9b1e66a99222d06acf99eba4f358`.

Both original db/*.sql blobs are unchanged: consent `e9962cea0c351f292ebc26a78c2ebb9d78ef9f22`, tickets `a12a8e84e28be554a84bac7d53d9c9d24b04a08c`. No phase/SDK/alias/historical grant ACK, host ordinary path, worker entrypoint/transport/config/clock/permission/journal changed. Parent ancestry and expected-head CAS were read back after each successful branch mutation; no force, foreign overwrite or uncertain mutation occurred.

Final expected BASE diff: store, fixture, new test, this report. Root independently reads the actual final tree/diff and reviews spec+quality; this receipt does not substitute for that review.

## Ceiling of this evidence and remaining work

Caller identity/Access/preconnection/approval inputs are explicit SYN DATA, not authentication or human consent. Instance-local Set/WeakMap state is not durable idempotency or a journal. An ACK-lost row can remain historical without caller success and without retry authority. CLOSE alone neither deletes the event nor revokes an existing grant; grant reduction is not human withdrawal of monitoring consent or complete cleanup.

D0.4 remains accepted and untouched; no token→notice integration, source human decision, notice journal/fixed receiver/provenance/NoticeLink, downstream notice phase/third CLOSED preparation, own SEND/full setup/cleanup/guard/preflight package, mount, ARM, real subscription/delivery/withdrawal or coordinated PC-off occurrence is established here. Prior Minor D0.3 OAuth-error precision and fanout fixture cleanup remain deferred to whole-branch triage per their existing ledger.

Expired source ceiling 2026-11-03T02:59Z was never renewed. No runtime/provider/alias/Entry/DDL/grant real, browser/OAuth/OTP/token/access, cron/Container/Max, main or merge operation. operationalReadiness=false; completePackage=false; PCoff=false.
