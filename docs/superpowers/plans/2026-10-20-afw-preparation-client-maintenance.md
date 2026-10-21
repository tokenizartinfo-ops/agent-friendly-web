# AFW preparation client maintenance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans inline; no implementer subagents. One fresh whole-branch reviewer at end.

**Goal:** Durable single-admission SDK client registration plus honest reconciliation, as unmounted source.
**Architecture:** Fixed-slot D1 journal gates one SDK KV create; explicit bounded readback reconciles lost ACK. Existing 5s lease and four false flags fence work.
**Tech Stack:** Node22, Workers, SDK1.2.1, Miniflare/workerd, D1/KV.
**Spec:** docs/superpowers/specs/2026-10-20-afw-preparation-client-maintenance.md

## Global Constraints
- Source-only: no hosted import/endpoint, remote schema/client/app/window/permission or new credentials.
- Original management window<=600000ms; original per-call lease5000ms. No delete/reset/recreate or refresh.
- Single fixed slot; four stringfalse flags; publicclient none/authorization_code/code; exact ChatGPT callback from future app.
- Cloud-only test/build; existing local deps read for SDK signature only, no local build/install.

## Review Focus
- Actual KV lag/late writes must never cause duplicate SDK create: native lost-ACK/invisible/late cases.
- Lost D1 ACK must never call createClient: real committed row with thrown response.
- Separate workers compete: actual concurrent primary INSERT and new factory repeats.
- Clock/config drift between each await: monotonic/wall/window checks, no late acceptance.
- Metadata/redirect/journal mismatch must not export secrets or widen client settings: exact public output, complete bounded inventory, native tamper tests.

### Task1: Durable SDK registration and reconciliation, native qualification
**Files:** create lib/preparation-client-maintenance.mjs; db/preparation-client-bootstrap.sql; test/fixtures/preparation-client-maintenance-worker.mjs; test/preparation-client-maintenance-native.test.mjs; .github/workflows/afw-preparation-client-maintenance.yml.
**Consumes:** createCapsulePreparationRequestLease/readCapsulePreparationRequestLease; existing input validators; OAuthAuthorizationServer.getOAuthApi(env) createClient/listClients/lookupClient.
**Produces:** createPreparationClientMaintenance(options) -> null or frozen {register(),reconcile()} results; standalone optional DDL, no runtime mount.
- [x] Write native tests and CI fixture/workflow first. Assert missing feature before bundling; run focused CI and observe expected RED.
- [x] Implement SQL journal and minimal helper per spec. No independent runtime or test-only hooks in product.
- [x] Run focused native cases GREEN; investigate actual failures sequentially, add targeted RED before behavior fix.
- [x] Run npm test, npm run lint, npm run build in GitHub; confirm full output, no local build.
- [x] Dispatch one fresh most-capable whole-branch reviewer. Record declined-to-judge rulings; Critical/Important one authorfix pass with RED/GREEN, Minor ledger.
- [ ] Accept/merge expected head only under owner standing authorization; verify mainCI, preserve primary receipts and checkpoint. Source-only acceptance does not deploy or register.

## Ledger
Plan reviewed inline against spec: every mutation admission is journal-gated; shared interface: fixture uses exact factory API/options and standalone DDL, workflow runs that native test. No external client identity/callback chosen here. Ruling: honor owner's explicit delegation of routine design/implementation/review/merge choices; no repeated design approval. Ruling: use remote Git branch and Actions as isolation/execution, not new local worktree/dependency setup.

Single-review authorfix ledger: Important known-ACK identity binding accepted. Native forwarding RED115af20b / run39524719455/job118976567040 observed actual confirmed versus expected unconfirmed;14PASS/2FAIL incl parent. One minimal correction pins created.clientId through observe before CAS. Unknown-ACK reconciliation remains explicitly metadata-only, not causal attribution. Final corrected focused/full/main CI still gates acceptance. One new anonymous fixture export lint warning is Minor/deferred. Hosted identity/ownership/callback/custody/schema/PKCE/MCP/PC-off remain unjudged separate gates; no KV-global-current or late-write cancellation guarantee. Retirement/reset remains separate lifecycle; trusted binding internals/D1 admin rewrites excluded.
