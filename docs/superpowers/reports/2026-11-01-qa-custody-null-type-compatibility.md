# QA custody informational null-type compatibility — implementation evidence
2026-11-01 UTC · AFW · SOURCE ONLY

## Scope and provenance
- PROJECT: Agent Friendly Web; REPOSITORY: tokenizartinfo-ops/agent-friendly-web.
- ENVIRONMENT: isolated source branch `fix/qa-custody-null-type-20261101`; ORIGIN: GitHub.
- RESOURCE_TYPE: source git trees/commits/refs and synthetic Actions qualification.
- RESOURCE_ID: this branch and excluded `qualify/qa-custody-null-type-20261101`.
- ALLOWED_ACTION: one parser bugfix in existing lib/test, new report/ledger; temporary no-project-secret qualifier only on qualification branch.
- ROLLBACK: revert source changes through a reviewed source commit. No runtime or data mutation occurred.
- Parent accepted main: `7c8013e494bd193ecf5bfea6dfb2cd1a894b9434`.
- Exact task BASE/spec/plan/AGENTS pin: `ef0783a9c42f4db4c368ee3fad6b899efc28223c` (tree `67dd586e587f5bdadd3a2a4b371e4e747747a8a8`).
- RED test-only source: `627354f307596784ae136cf4e21a6deeefb8b2c5`.
- Qualified code HEAD: `b2928e2937b9844d726026070f27554901726d56` (tree `6aebeee38f0ab4443227977a7cdd2ccd8ddf05a5`).
- This report/ledger delivery commit follows that code HEAD and changes documentation only; its immutable SHA is in the branch history and implementation handoff.

## Actual evidence and minimal correction
The approved spec records the ONE fixed read-only GET on main/PR711: command6561006046, Actions41328944349/job124914753923/attempt1, HTTP200 blocked/invalid_response/messages; envelope extra0, informational message extra1, own null type1, result extra0, timestamps nonnull, errors empty. No new provider request was made in this task. The historical PR711 reports remain unchanged.

The fixed `MESSAGE_KEYS` array now includes `type` and remains shared by exact-key validation and safe extra-field counts. An own `type` must be literal null; it is discarded and never projected. Nonnull values still reject. Required code/message, documented optional fields, all other exact keys, body and field bounds, result/timestamp grammar, errors, endpoint, lazy credential admission, original300s/request5s clocks, cancellation, no retry/fallback and false authority remain unchanged. A rejected nonnull type is a known field with invalid value, so its extra-field count is0.

## RED and GREEN
Both qualifiers use Ubuntu24.04 / Node22.23.4, contents:read, persist-credentials:false, timeout7min; no project environment or project secret references, no provider command. The qualifier workflow is EXCLUDED from delivery.

| Stage | Source/qualification HEAD | Run / job / attempt | Result |
| --- | --- | --- | --- |
| RED | source627354f307596784ae136cf4e21a6deeefb8b2c5 / qualifier8af1ef02b0a0a81df1a2888cf2da89ec5efb7c3e | [41329454613](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41329454613) / 124916277704 / 1 | 95 tests:94 PASS,1 FAIL,0 SKIP,0 cancelled; expected failure exit1 |
| GREEN | sourceb2928e2937b9844d726026070f27554901726d56 / qualifier96b6baa2941df71ac04d04c874ac1d9240fc27b8 | [41329558817](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41329558817) / 124916596155 / 1 | 109 tests:109 PASS,0 FAIL,0 SKIP,0 cancelled; lint success |

Commands:
```text
node --test test/mcp-qa-bootstrap-custody-inspection.test.mjs
npm ci --ignore-scripts --no-audit --no-fund
npx --no-install eslint lib/mcp-qa-bootstrap-custody-inspection.mjs scripts/qa-bootstrap-custody-inspection.mjs test/mcp-qa-bootstrap-custody-inspection.test.mjs
```
RED failed ONLY the new observed-envelope-shape case: actual blocked, expected verified. Prior94 cases passed; install/lint were skipped after expected RED. GREEN completed all three commands; install added649 packages on the ephemeral hosted runner. Scoped lint emitted no findings. Runner/actions emitted their Node20/24 deprecation and punycode infrastructure notices; these were not test or lint failures.

## Coverage and source equality
The observed-shape regression uses a synthetic expected ID, success/code10000, own type:null, nonnull timestamps and no errors/extras. It verifies identity metadata, empty errorCodes, cleared documentary diagnostics and all authority booleans false. Existing absent-type acceptance remains. Added null with documented URL/pointer verifies one request/no URL following/no echo. Ten nonnull values (strings, numbers, booleans, object and arrays) reject; raw undefined fails JSON parsing. Message counts16/17 retain the bound.

Prior94 semantic coverage was retained: the former null-type rejection fixture now contains an actual unsupported extra while retaining null-type flag1/extra1; the string-type diagnostic expects extra0 and still rejects. Existing exact envelope/result, null timestamps, malformed fields, counts saturation, admission, deadlines/abort, sanitized numeric error and fixed DTO/CLI checks remain.

Readback at qualification HEAD matched exact source contents and Git blob hashes:
- lib/mcp-qa-bootstrap-custody-inspection.mjs: `e22602e83f8e82945b35088efac7765b530f8a45`.
- test/mcp-qa-bootstrap-custody-inspection.test.mjs: `fbd7b08b2463fa51e4a3edbfe63ed03b2aae62f8`.

Only these two source files changed from task BASE before this new report/ledger. CLI, existing workflows, finite runtime and historical reports were untouched. No local code/files/temporary files/dependencies/builds were created.

## Limits and handoff
Implementation complete; combined task+whole-branch review, normal full PR CI, main merge and ONE later newly qualified fixed GET belong to root. No PR/reviewer/probe, credential/token/permission/schema/runtime/case/mail/Max action was performed by this implementer. No publication or operational capability is proven. Actual token identity and scope remain UNKNOWN until root's separately qualified observation; successful identity metadata still cannot prove Workflow-create permission or resolve the actual401 cause. operationalReadiness=false.
