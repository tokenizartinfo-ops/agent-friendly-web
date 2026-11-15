# Whole-unit review brief — readonly source-site diagnostic

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT cloud Git database read-only; ORIGIN GitHub; RESOURCE_TYPE public Source and Rootdocs; ALLOWED_ACTION inspect data and create one unattached review-report blob. No ref update, execution/import/eval/test/deps, run dispatch, local source file, private artifact, key, network probe to AFW/Cloudflare, browser, OAuth or permissions. No subagents.

Review only this completed unit, against its settled spec/plan and Root gate. Do not reopen the accepted prior final-fix unit or redesign C2. One whole-unit review; return actionable Critical/Important/Minor findings with exact public blob/line and impact, plus accepted invariants and limitations. Distinguish collection correctness from business success. An honest R3 failure is an expected diagnostic outcome, not itself a mapper defect. No separate review of every intermediate candidate.

Rootdocs baseline 80a9bd30425005312f026f48020f55cf52d71b6e:
- docs/superpowers/specs/2026-11-14-readonly-source-site-diagnostic-design.md
- docs/superpowers/plans/2026-11-14-readonly-source-site-diagnostic.md
- docs/superpowers/reviews/2026-11-14-readonly-source-site-preflight.md (binding report 632769237cff1ae7b35a9b6b28b6e528907a85db)
- docs/superpowers/reviews/2026-11-14-readonly-source-site-root-gate.md (blob 6b6d7ba872544814e742740e3b8fcf774399a914)
- docs/superpowers/reviews/2026-11-14-readonly-source-site-parent-receiver.js (blob 773c2092a20f9f8364eb0104b6b775eb4a3b3d7b)
- docs/superpowers/reviews/2026-11-14-readonly-source-site-prep-report.json (blob 8cc442b14004c893ca5c9e24c9a5dd7b25717ca5; includes exact final program blob pins)
- this publication adds reviews/2026-11-14-readonly-source-site-actual.md with complete actual wire and closure.

Inactive candidate 5582dbfcc11195154916585d53f5004ed590af44, direct parent327e9b7ec2182588dfb02e58b238787abb37a017. Active derivative862ba9d258d6ad467ada5ba8d987dc1ce1603b46 removed only one false job mask. Actual43658045169/1/job132640910465 completed diagnostic: C1–C6/current8pure/profile PASS; original readonly CLI exit1; R1/R2PASS, R3FAIL world_1158_a1 (World1158 wait deadline, R3caller1176 heldNativeSettled===2/30000ms). Closed Source6739481ada03d50e035edfd9c157c1646fad705d/tree0f210b844740cc52426cc3282e3d0f5a7300e01a/originalF7f7a71f1a0fa4f5ddf069ff411f008a098455e5cc/SAME2c9fee8d24567aba21ca58554f7187bceb16d3cb. Core3200 and Main unchanged. Full prefix exact.

Focus on production helper first-frame/header/path/line-and-column correctness, safe own descriptors/proxy/getter bounds, provenance pins before and after, production/fixture map separation, all-row/firstFailure/end/count consistency, actual Node tiny controls and hold-before-Native, confirmed launch/fallback unknown, original CLI/clocks/caps, Root receipt acceptance, consumed single-run closure. Node serializer may access properties before our projector; no blanket zero-getter claim. Site label is diagnostic, not authenticated cause. Private TAP not to be fetched. Read code as data only.

Report via one create_blob, report markdown with counts and exact source references. Send Root only report SHA and concise counts/findings. If no load-bearing defect, say so without claiming AFW readiness or underlying cause.
