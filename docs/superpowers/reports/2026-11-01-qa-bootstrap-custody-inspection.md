# AFW bootstrap custody inspection — source qualification
2026-11-01 · SOURCE ONLY · operationalReadiness=false

## Scope and provenance
Repository `tokenizartinfo-ops/agent-friendly-web` (1347578006); isolated branch `feat/qa-bootstrap-custody-inspection-20261101`.
BASE `af8c5d962eead7300b749e8353d11bdc61dff30a`, parent `cd13d3de95e32adaef0411e94b5665dae3cdbcc2`.
Qualified code/test/workflow revision `7b6d5728ae18cbc0887d1744118665b9241586b4`.
All reads, source writes and execution used GitHub tools/hosted Actions; no local source, dependency, runtime or secret reads.

## Result
Standalone library, CLI, fixed owner-comment workflow and focused tests implement the approved spec.
The sole provider operation is one fixed account-token self-verify GET. Admission checks repository/id/owner, sender/comment identity, OWNER association, issue497/notPR, created action, main, attempt1, exact current source command and original comment time before lazy credential access.
Original five-minute command and maximum five-second child request retain wall/monotonic reversal and abort checks around asynchronous boundaries and settlement. Redirects/retries/alternate endpoints and resource writes are absent.
Response bytes are bounded at8192; success envelope/result and safe metadata are checked. Informational success messages including code10000 are validated and discarded, never treated as error codes. Missing expiry/not-before remains null. Actual mismatch/disabled/expired status is reported as metadata, never permission or readiness.
CLI validates GitHub context, actual checkout SHA/origin and bounded no-follow event file; only fixed sanitized result.json is written, with no stdout/stderr/provider detail. Protected environment/secret remain existing; contents:read only; artifact retention seven days.

## Cloud TDD and qualification
- Initial runs41324561626 and41324685982 are invalid RED evidence: abort fixture syntax error. Corrected before semantic RED.
- Semantic RED revision`79fe383dd0d8ff98df11f78e76bb575fdc856aba`, Actions[41324719898](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41324719898), job124902143555:53tests,31PASS22FAIL,0SKIP. Explicit blocked stub lacked success/metadata/transport behavior.
- Candidate`8cc699c7` Actions41324829271:52PASS1FAIL; expired fixture had not_before after expires_on. Corrected fixture chronology, no relaxation.
- Candidate`7f581313` Actions41324868728:54PASS0FAIL; isolated lint lacked URL global. Fixed by explicit node:url import.
- GREEN exact revision`7b6d5728ae18cbc0887d1744118665b9241586b4`, Actions[41324976371](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41324976371), job124902904842:57PASS0FAIL0SKIP; scoped ESLint9.39.4 no-unused-vars/no-undef clean (0errors/0warnings). Ubuntu24.04, Node22.23.4.
- Focused command: `node --test test/mcp-qa-bootstrap-custody-inspection.test.mjs`.
- Independent source imports only Node builtins; no shared admission import changed, so nearby shared-admission rerun was unnecessary. Root retains normalPR/fullCI responsibility.
- Temporary branch-push qualifier `.github/workflows/afw-qa-bootstrap-custody-source-qualification.yml` contained no protected environment or credential binding. It is DELETED/EXCLUDED from the delivery tree; code/test/production-workflow blobs remain exactly GREEN.

## Self-review and remaining gates
Self-review checked admission-before-secret, fixed GET/no redirect/retry, actual source correlation, original clock/abort settlement, bounded response/output, informational10000 handling and authority false fields; no known outstanding source defect.
Focused tests cover wrong contexts before credential reads; mismatched/disabled/expired/missing-expiry observations; malformed/oversized/unknown/getter responses;401/error10000; stale Date/cache; malicious exception/message/credential sentinel suppression; late credential/fetch/body; held fetch/body abort and ignored-abort five-second watchdog.
Fresh independent review and normalPR/fullCI remain required before merge. No inspection command was posted or dispatched. No token/permission/policy/runtime was created, changed or inspected live.
The actual protected-job credential identity is STILL UNCORRELATED until a separately authorized post-review/CI/merge owner command succeeds. Metadata never establishes Workflow create permission or operational readiness and does not explain/fix the historical401.
Rollback is source revert only; no cloud runtime rollback is involved.

## Consolidated final-review fix wave 1/1 — documented informational fields
Review FIX_BASE `205196e28d7369f8c2a0d8215876b0d409c02bf1`; PR710 draft. One P2 identified a valid documented success response being rejected when messages[] included optional documentation_url/source.
Primary schema verified2026-11-01: [Cloudflare account-token verify](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/methods/verify/), message schema lines4114–4126/example4180–4188. Root accepted bounded compatibility of documented optional INFO fields; this changes no authority, endpoint or runtime scope.
Required code/message remain unchanged. Allowed optional documentation_url is a string bounded to2048; source must be a plain object with only optional string pointer bounded to2048 (empty source{} accepted). Unknown keys, malformed optionals and oversized strings are blocked. Fields are discarded without following any URL or echoing URL/pointer/message. Rejection branch remains numeric-error-code-only and unchanged. No legacy nullable type was introduced;8192-byte body cap, array caps, exact result schema, clocks/abort and false authority fields remain intact.
- Isolated qualification branch `qualify/qa-bootstrap-custody-info-fix-20261101` starts at FIX_BASE; intermediate RED/GREEN never advanced the PR delivery head.
- Meaningful RED `0af12929fad049f8e7ced2a56ecf674ed8b57f2b`, Actions[41325902105](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41325902105), job124905647512:76tests,71PASS5FAIL0SKIP. Five documented optional-field success cases fail with the original validator.
- Exact GREEN `bfae945e133c82e51cac731f77e72cb6ef75d64b`, Actions[41325942238](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41325942238), job124905766055:76PASS0FAIL0SKIP, scoped ESLint9.39.4 no-unused-vars/no-undef clean0errors0warnings.
- Added19 focused tests: documented extras, individual optional fields, empty source,2048 boundaries, malformed/unknown/missing fields and2049 rejection, no URL following/sentinel leakage, and documented error extras retaining numeric code only.
- Temporary no-secret qualifier exists only in the isolated qualification branch and is EXCLUDED from delivery. Qualified library/test blobs are copied unchanged into the single final delivery commit based on FIX_BASE; CLI/production workflow are unchanged.
Scoped self-review found the one reported compatibility gap corrected without a known outstanding source defect. Root scoped rereview and normalPR/fullCI remain pending; no live inspection, token read, runtime or permission change. Branch writes stop after this report for root review.
