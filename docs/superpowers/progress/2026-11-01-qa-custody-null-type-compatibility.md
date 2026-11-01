# QA custody null-type compatibility — progress
2026-11-01 UTC · SOURCE ONLY

Spec/plan: ../specs/2026-11-01-qa-custody-null-type-compatibility.md and ../plans/2026-11-01-qa-custody-null-type-compatibility.md.
Detailed evidence: ../reports/2026-11-01-qa-custody-null-type-compatibility.md.

Task1 implementation DONE, awaiting root combined task+whole-branch review and full PR CI.
- Exact BASE `ef0783a9c42f4db4c368ee3fad6b899efc28223c`; parent main `7c8013e494bd193ecf5bfea6dfb2cd1a894b9434`.
- RED source `627354f307596784ae136cf4e21a6deeefb8b2c5`, qualifier `8af1ef02b0a0a81df1a2888cf2da89ec5efb7c3e`, Actions41329454613/job124916277704/attempt1:94PASS1FAIL0SKIP (observed null-type acceptance actual blocked).
- Code HEAD `b2928e2937b9844d726026070f27554901726d56`, qualifier `96b6baa2941df71ac04d04c874ac1d9240fc27b8`, Actions41329558817/job124916596155/attempt1:109PASS0FAIL0SKIP, scoped lint clean.
- Exact lib/test blob hashes `e22602e83f8e82945b35088efac7765b530f8a45` / `fbd7b08b2463fa51e4a3edbfe63ed03b2aae62f8` read back equal at qualifier HEAD.
- Shared allowed-key set plus own literal-null guard only; all nonnull/other extras and existing constraints retained; former blocked-null fixture now unsupported-extra+null-flag. Historical PR711 documentation preserved.
- Commands: `node --test test/mcp-qa-bootstrap-custody-inspection.test.mjs`; `npm ci --ignore-scripts --no-audit --no-fund`; `npx --no-install eslint lib/mcp-qa-bootstrap-custody-inspection.mjs scripts/qa-bootstrap-custody-inspection.mjs test/mcp-qa-bootstrap-custody-inspection.test.mjs`.
- Source delivery lib/test plus new report/ledger only. Qualification workflow excluded; no localfiles/deps/builds, subagents, liveprobe/credentials/permissions/runtime/schema/case/mail/Max actions.
- Stop branch writes after report delivery. Root alone handles review/PR/fullCI/merge and later ONE new qualified fixed GET. Identity/scope still UNKNOWN; no Workflow-create proof, operationalReadiness=false.
