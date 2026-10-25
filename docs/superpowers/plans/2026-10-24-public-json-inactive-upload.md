# Plan: fixed public JSON inactive upload
Spec: docs/superpowers/specs/2026-10-24-public-json-inactive-upload-design.md

1. Pin main3c90ebe8; add packet workflow/tag/source isolation tests and test-only CI harness. Observe missing helper RED before production changes; retain old guard tests.
2. Add immutable-by-construction literal upload_packet profiles; default legacy remains. Thread the packet through dispatch_context, wrangler_command and main; fence contract before handoff use. Add literal new wrapper and full default-verify-only workflow sharing existing concurrency/custody, preserving original deadlines/no-retry/readbacks.
3. Run old/new upload boundary suites, package rejection suite, exact old/new artifact qualification and offline Wrangler checks in GitHub, then full tests/lint/build. No source/build changes to the qualified application, no mutation on PR.
4. Fresh whole-branch review and exact-head/tree gates. Integrate source only when green; verify main CI.
5. Only then prepare ONE explicit upload_inactive workflow_dispatch via real GitHub UI if available, existing identity only. Fresh effective state must match qualified baseline; unknown ACK/readback failure never retries. Verify inactive candidate and untouched traffic/configuration, save evidence. Traffic promotion remains a separate block.

All work cloud/GitHub except browser control; no local clone/install/build or new permission. Source acceptance and actual upload are separate receipts; no automatic credential renewal, OTP, native/cloud proxy test replay, PC-off or Max mail.
