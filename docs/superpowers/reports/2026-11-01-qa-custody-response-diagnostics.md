# QA custody response diagnosis — source qualification
2026-11-01 UTC · source only · operationalReadiness=false

Project: Agent Friendly Web. Repository: tokenizartinfo-ops/agent-friendly-web. Environment: isolated source branch and GitHub-hosted Ubuntu24.04/Node22 qualifier. Origin: https://github.com/tokenizartinfo-ops/agent-friendly-web. Resources: branch refs, Git source objects and Actions source qualification. Allowed actions: scoped source/test/documentation commits and no-secret qualification only. Rollback: revert the source changes; no runtime rollback or resource mutation is claimed.

## Evidence and exact revisions
- Approved spec and plan: ../specs/2026-11-01-qa-custody-response-diagnostics.md and ../plans/2026-11-01-qa-custody-response-diagnostics.md.
- Main parent: abed6474df8e5ffdab3962af605f6bfb7247279b.
- Task BASE (spec/plan already present): f6be907b96ad919916bc3e5aa53f22354a9ac2ee.
- Branch: feat/qa-custody-response-diagnostics-20261101.
- RED source/test HEAD: 8b5284dfe957e8fb69943ebf586b7b820855de45 (initial test commit c2c71536c8a7aaae6e949e527d7aa2166cb3edf0).
- Verified code/source HEAD: b3065bed225041522946af872cb7acbb560dcf64; tree ad64f7c1e981ab982ca363df1e5794f7daf1b4d0.
- GREEN qualifier HEAD: 2bccc80f1177f6fe8b8eec59e4aa607c85eefbb6 on qualify/qa-custody-response-diagnostics-20261101. Its sole additional delivery-excluded file is .github/workflows/qualify-custody-response-diagnostics.yml.
- This report and matching ledger are a final documentation-only commit after the verified code HEAD. The resulting delivery HEAD is reported by the external ref/commit readback in the task completion contract; a commit cannot contain its own hash.

The earlier accepted inspector GET (Actions41326878464/job124908564953 under command6560728289) returned HTTP200/blocked invalid_response. Its discarded body is unavailable. Cause, token identity, scopes, Workflow permission and readiness remain UNKNOWN. No new observation was executed by this task.

## Delivered behavior
Only the existing library, entry-denied CLI DTO and their existing test file changed, plus this report/ledger. Two documentary output fields were added:
- responseSchema: null or the fixed group headers/stream/json/envelope/messages/result/timestamps/settlement. Success clears it to null; failures before a provider response retain null.
- responseShape: null before parsing or on verified success; otherwise only envelopeExtraFields, messageExtraFields, messagesWithNullType, resultExtraFields (saturating integers0..16) and notBeforeIsNull, expiryIsNull, errorsNonempty (booleans).

The helper reads own data descriptors on already bounded JSON and examines only fixed envelope/result/messages slots and key counts. It never copies unknown key names or values and never follows message URLs/pointers. Existing exact key allowlists are reused unchanged by validation. type:null, unknown fields and literal-null timestamps still reject; no parser compatibility was added. Existing failure/httpStatus/numeric errorCodes behavior is preserved. Parsed malformed/nonobject slots yield neutral structural values.

Original owner/source/attempt admission, fixed GET endpoint/account/environment/secret, admission-before-secret, 8192-byte body limit, request<=5s, original comment300s, dual clocks, abort, no retry/fallback/mutation and final metadata clearing are unchanged. Scope/workflowCreate/readiness/retry remain false. CLI artifact remains <=4096B with no stdout/stderr.

## TDD and hosted verification
RED: [Actions41327740816](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41327740816), job124911139233, attempt1, qualifier HEAD d9d257632fbb30cea58486f10276a18fcea3a1a3. Command:
`node --test test/mcp-qa-bootstrap-custody-inspection.test.mjs`
Result:94 tests,76 PASS,18 FAIL,0 cancelled,0 skipped. All original76 passed; each new test failed because responseSchema/responseShape were absent. No import/syntax/setup failure; install/lint were skipped after expected RED.

GREEN: [Actions41327872847](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41327872847), job124911537814, attempt1, qualifier HEAD2bccc80f1177f6fe8b8eec59e4aa607c85eefbb6. Commands:
- `node --test test/mcp-qa-bootstrap-custody-inspection.test.mjs` →94 PASS,0 FAIL,0 cancelled,0 skipped.
- `npm ci --ignore-scripts --no-audit --no-fund` → exit0,649 packages installed only on disposable hosted runner.
- `npx --no-install eslint lib/mcp-qa-bootstrap-custody-inspection.mjs scripts/qa-bootstrap-custody-inspection.mjs test/mcp-qa-bootstrap-custody-inspection.test.mjs` → exit0, no lint diagnostics.

Job completed SUCCESS. Hosted actions emitted upstream Node/action deprecation notices; these were not ESLint findings.

The18 new cases exercise own null/string message type, null timestamps, unknown envelope/result keys, malformed message slots, actual nonempty errors, invalid result/timestamp/nonobject envelope, headers/stream/JSON groups, saturated counts/sentinel exclusion, sanitized getter exceptions, null evidence before response/success, cleanup expiry and abort clearing all verified metadata, and executable CLI entry-denied field/artifact contract. Existing76 preserve admission, original bounds/deadlines/late awaits/watchdog, exact informational message grammar and numeric error handling.

Independent GitHub content readbacks matched source and qualifier blobs exactly:
- lib/mcp-qa-bootstrap-custody-inspection.mjs: b3e24e3bd4f63d1716ff446c3eade7255fb170a0.
- scripts/qa-bootstrap-custody-inspection.mjs: d1ee379fd06b7e5139c51f75a4bbee458af8b91a.
- test/mcp-qa-bootstrap-custody-inspection.test.mjs: d8155c25e36a95eda1025f2a7af4df4578130311.

## Rulings and limits
Ruling: preserve the private helper boundary. No production testing API or source-rewriting/data-URL seam was introduced. Public malformed response/getter-exception tests verify sanitized failure; actual JSON.parse guarantees plain own-data input for the helper, whose descriptor access is inspectable. Artificial parsed-object accessor injection is not independently exercised. Cost if wrong: source diagnostic rework, not expanded response acceptance or authority.

Cloud-only task instructions supersede local worktree/workspace scripts: source, dependencies and execution stayed in GitHub/Actions; no local code/temp/dependency/build work occurred. The qualifier has no environment, secret inputs, runtime calls or artifact delivery. Production workflow is unchanged. No token/role/policy/credential read, live GET/command, schema/runtime/config mutation, new case/mail/trial, PR or reviewer was created.

Task source qualification is complete. Fresh independent combined task+whole-branch review and normal PR/full CI remain root-owned gates before merge. Focused GREEN does not claim whole-repository CI, runtime delivery, credential diagnosis, new live authorization or operational readiness. Stop branch writes after this report/ledger commit.
