# Backport plan: public MCP JSON budget — 2026-10-24

This is a byte-exact backport of the source accepted in PR583/main6531a005; no new behavior or architecture. The owner delegated routine source work and asks to continue autonomously. Keep runtime release separate.

Target: tokenizartinfo-ops/agent-friendly-web, source branch release/web-production-20261017 at11305a9c30a43b6a94e98e183100c58b8725bfef, isolated candidate fix/public-json-budget-release-20261024. GitHub App source operations only. Rollback: revert this isolated source PR. No new local clone/build/dependency installation.

## Baseline and design

The public release's lib/public-mcp-http.mjs is byte-identical to the unchanged RED baseline from PR583. Its existing test/public-mcp-http.test.mjs is an exact prefix of PR583's accepted test file: retain every existing test. Both release callers still map PublicMcpHttpError to its fixed status/code before SDK dispatch.

Copy exactly the two accepted files from6531a005, not all of main. Add those two paths to the existing public guide QA trigger so this security change receives the existing isolated browser/build qualification and exact dist retention. Preserve every job, permission, pinned tool, command and seven-day retention setting. Preserve32KiB, original bytes, malformed JSON protocol parsing, media/method/host/SSRF/auth. Iterative budget: root depth1/count1; depth<=64, values<=4096; excess413/request_too_complex. This does not address response recursion or stream lifetime.

## Sequential execution and closure

1. Confirm release ref11305a9c, original source/test equality and both callers. Already observed before preparing this plan.
2. Create one cloud GitHub candidate from11305a9c, copy the two accepted files and this plan. Add only those two paths to the existing public guide QA workflow. No package/lock/runtime config/entrypoint/schema, job, command or permission changes.
3. Open PR against release/web-production-20261017. Require branch-context full npm test, lint and build in existing CI, the existing isolated public guide browser QA plus retained exact dist, exact head/merge-tree verification, and whole-branch independent review.
4. Integrate source only after those gates. Verify the release-branch push CI and preserve BOTH artifact identities: use the PR head's browser-qualified dist for a future controlled qualification, not the separately rebuilt push dist. Existing release CI already retains dist for push; do not edit ci.yml or invoke remote upload.
5. Save actual results/refs in the PR and issue497 checkpoint. A separate package qualification, inactive upload, runtime inventory/rollback and normal-traffic acceptance are needed before any deployment claim.

Prior TDD is preserved rather than fabricated or repeated: byte-identical original RED8cases/5PASS/3FAIL, candidate GREEN8PASS/0FAIL. Main CI40134062028 passed2824/0/1existing skip; those totals do not predict the smaller release branch's suite count.

No deploy, remote resource/traffic mutation, secret/credential change, OAuth/OTP, cron, Container, other-project files or customer data. Public web's last accepted version29927b77 remains distinct; frozen private e3/3d4/V4 are not repinned. operationalReadiness and PC-off remain false.

Execution refinement: after the initial three-file candidate af00fd99 was reviewed, root found that the existing qualified-dist job only triggers on selected paths and omitted this module/test. Adding two trigger paths makes the existing acceptance reusable; it adds no execution capability. Initial source-only review remains applicable to unchanged implementation, while the final four-file diff and exact-head CI/QA require their own readback.
