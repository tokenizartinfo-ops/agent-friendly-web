# C2 · connection/OAuth diagnostic investigation

Status: SourceQualified=false; Task1Pass=false; proposed diagnostic SOURCE_TESTS_PENDING.

## Actual evidence preserved

Read only primary artifact7c250f7d58c70f88766e52421480c045751da3e5. Fix1 run43802367592/1/job133085365498, head6cf7715d3eee62d6eb4b37d8ef89b68aa7f29225: exact dependency-absence control passed EXPECTED_ENOENT, then baseline child timed out at180s. Captured actual TAP20/known20, frames4, firstKnownFailure C2T1_OAUTH, no file-level failure; stdout38125B/hash4c227680c6c74ad6bff6292bb6eb7f8fadf419c05827da7a2d5f80c20897f419, stderr0. Separate cleanup diagnostic had no cause. No logs refetched/replayed, no new occurrence started. Closed lab7a52969aa6f4e71e8a1e28b46ebee0489912e4a5 and all13 bodies remain unchanged.

TAP results and runner timeout can coexist: case outcomes were observed before subprocess completion. These observations do not identify the first OAuth exception, prove after-hook cause, prove privilege-related cleanup failure or any global physical settlement. No product patch follows from them.

## Ordered OAuth comparison as DATA

Frozen new coupled fixture65933f3ebd753859a3b341f684b46d11f5c43a5a:
1. line62 awaits firstConnectionContext, then directly accesses current.source.phase, asserts read_consent and stores source. If the reader returns {status:unavailable}, a TypeError is possible here before any OAuth HTTP. This is an earliest candidate, not an observed cause.
2. line63 obtains native OAUTH_KV; line64 puts the actual synthetic client registration.
3. lines65–66 issue actual /authorize GET using f.token from ownerSelection, assert200, read HTML and actual handle/cookie.
4. lines67–68 POST approve with original prepare cookie plus actual SDK cookie, assert302, require code and cancel response body.
5. line69 reads actual storage and asserts sdk_complete:observed. No /oauth/token exchange/MCP read is performed in this new helper.

Frozen regression19441f9aa4a464b9594431b6e196d4318a7809b3:
- Calls firstConnectionConfigure('normal') before approval; new open/approve does not.
- Verifies current.source?.phase (optional access within assertion), then generates a fresh enrollment token using source.
- Uses the same actual KV API, client tuple, redirect URI, PKCE verifier/challenge and GET→actual form/cookie→POST sequence.
- Then executes actual /oauth/token exchange and native MCP read; it preserves and compares original grant ACK and checks native exchanged_at.

Concrete differences do not establish a cause:
- firstConnectionConfigure('normal') wraps native storage get/list/transaction/sync, first-primary SQL and fetch for counters/passive trace; Date.now is wall()+0. Normal branches return the actual underlying result objects. Its fault branches do not run in normal. Extra await/observer timing exists, but no deterministic business-data change was identified. Adding this instrumentation merely to get green would be unjustified.
- Both enrollmentToken calls use the same signer privateKey/jwk/kid, subject owner, issuer=https://source.access.teamDomain, audience=source.access.audience, one-hour expiry. New uses p.access from ownerSelection; PH constructs source.access from that same p.access. This supports structural equality, but no actual JWT/realm bytes were captured and none are requested. Fresh iat/exp differs. No claim of actual realm equality is invented.
- clientName and state differ (SYN c2 native client/SYN-c2 vs SYN native client/SYN-state). Exact wire fc113a05e7f6d1ef72cd045a55c5934b357aa724 only requires nonempty query values<=4096, exact tuple/PKCE grammar; it has no eight-character state minimum. Do not patch state length by intuition.
- Missing later exchange does not automatically explain sdk_complete marker: actual PH completeAuthorization is called/observed on POST before302. It remains incomplete end-to-end coverage, not a proven explanation for first OAUTH failure.
- SourceBase.currentPublication is an object with stage:null and baseline pins. It is NOT null; that hypothesis is excluded.

Any of context denial, KV/API error, GET status/body/cookie, POST status/code or marker assertion remains possible until the actual original Error/code/known position is observed.

## Exact bounded diagnostic proposal

New independent lab only, Root-nominated branch lab/afw-c2-source-20261116-t1-oauth-diag1, message AFW-C2-OWNER-STAGES-OAUTH-DIAGNOSTIC-ONEUSE-20261116, workflow .github/workflows/afw-c2-oauth-diagnostic.yml, job c2-oauth-diagnostic.

Materialize BASE6791/tree62e exactly as prior baseline with unchanged frozen13 test-role overlay and fixed bootstrap DATA22f324; validate original preimages and every admitted body/hash. No proposed product body is installed. No later green/mutant/regression or other18 case executes: fixed pattern ^(C2T1_CONNECTION|C2T1_OAUTH)$.

Use native Node22.23.4 custom reporter over actual TestsStream test:pass/test:fail:
- Exact-version docs state details.error wraps actual thrown error in cause. Native tests_stream.js emits name/nesting/details/location; TAPreporter unwraps original causes and escapes text. Direct native event projection avoids brittle textual Error parsing.
- Emit class/code enums; actual whitelisted13 fileId+line+column only; map frozen fixture positions62/context,63/KV,64/client registration,65–66/GET,67–68/POST,69/SDK observation. Definitions are distinguished from error positions.
- Only booleans or actual asserted HTTP100..599 (expected200/302) may leave Error fields. No message, actual/expected string/object, assertion text, full stack, path, token, cookie, nonce, headers or private body.
- Suppress raw Source stdout/stderr/diagnostics. Only exact custody preload record passes through stdout event handling.
- Preserve native selected events even if after-hook/open handles cause the shorter90s child watchdog. Unknown/file/hook native events have id:null and remain auxiliary, never fake cases or invented Missing/fail outcomes.
- Output is AFW_C2_OAUTH_DIAGNOSTIC, never AFW_C2_SOURCE_RECEIPT. SourceQualified=false andTask1Pass=false unconditionally. A successful job means only valid diagnostic collection.

Primary sources read as DATA, exact version:
https://raw.githubusercontent.com/nodejs/node/v22.23.4/doc/api/test.md
https://raw.githubusercontent.com/nodejs/node/v22.23.4/lib/internal/test_runner/tests_stream.js
https://raw.githubusercontent.com/nodejs/node/v22.23.4/lib/internal/test_runner/reporter/tap.js
https://raw.githubusercontent.com/nodejs/node/v22.23.4/doc/api/process.md

## Cleanup investigated separately

Observed old cleanup failure has no errno/capture. Runner source launches command via sudo/unshare and does not drop credentials; outer GHA runner performs rm. Thus differently owned caches are a concrete source-based hypothesis, not an observed cause. No production permissions, users, groups or sudoers change is proposed.

For this new ephemeral diagnostic only:
- Capture actual nonroot parent UID/GID before first await. Within fresh network namespace, root brings only lo UP, then setpriv switches child to exact parentUID/GID, clears supplementary groups and sets no-new-privs.
- Child preload verifies UID/GID equality and only loopback. Node22.23.4 process.getgroups() always includes the effective GID, so verify no supplementary group other than exact primaryGID, rather than wrongly requiring an empty array.
- Same dropped-privilege preflight writes an owned fixed probe; parent checks actual native owner/group/content, removes only its own preflight area and verifies absence BEFORE native cases.
- Main child/runner preloads write bounded owned probes. Parent checks their actual ownership; actual final rm is restricted to own verified mkdtemp root and absence readback. Failure yields only enum errno.
- No chmod/chown/bypass. A successful new cleanup cannot prove the previous cause, global native drain or SDK namespace empty.

All runtime/source/product limits remain unchanged:7min job,330s total runner,32MiB archive,1MiB/64KiB capture,24576B safe summary, Node22.23.4, existing lock/SDK1.2.1, original5s/30s product clocks. Only diagnostic child cap is reduced to90s and preflight to10s.

## Pending action

Runner, reporter, guard, preflight, WF and schema are immutable DATA with full readback. Root must review exact identities/reader/branch/triggers before one new diagnostic occurrence. No local Source eval/import/compile/syntax/test, no refs/runs/PR/Core/runtime changes by author, no subagents. Two failed Source-lab occurrences are preserved; no blind product fix or same-head replay is proposed.

All seven remain false: historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified.

Exact Node22.23.4 cli.md additionally confirms --import is inherited by worker threads. Custody guard checks identities/network there too, but emits/writes one proof only on isMainThread to avoid same-PID duplicate wx writes perturbing the fixture. This guard detail is diagnostic-only; no frozen Source body changes.
