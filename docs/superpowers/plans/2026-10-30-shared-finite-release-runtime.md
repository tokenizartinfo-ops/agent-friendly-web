# Shared finite release runtime Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Separate existing finite execution from Cloudflare entrypoint classes so a future QA-only named confirmator can use an explicit trusted bundle.
**Architecture:** Pure runtime module receives bundle and capabilities. Existing Worker wrappers retain their public signatures and closed HTTP behavior; no deployment or capability expansion.
**Tech Stack:** JavaScript ESM, native workerd/Miniflare, D1, GitHub Actions.
**Spec:** docs/superpowers/specs/2026-10-30-shared-finite-release-runtime-design.md

## Global Constraints

- No Cloudflare class or ambient bundle global in the shared library.
- Existing flags, original lease, payload/instance identity, SQL/budget1 and unknown ACK behavior unchanged.
- Unique build-time bundle token remains exactly once in the Worker entrypoint.
- No remote runtime, secret, OAuth, grant, guard history or Max action.
- Cloud branch and Actions only; no local clone, dependency install or build.
- operationalReadiness=false; no claim of QA integration or PC-off.

## Review Focus

- Ambient foreign bundle must not replace the explicit bundle; native test owns this.
- Closed/expired/foreign request must fail before provider/journal access; native test owns this.
- Restart must not issue a second publication; native D1 test owns this.
- Wrapper observation modes and original output field grammar remain unchanged; existing full suite owns this.
- Public template materialization must retain its unique slot/token and size caps; existing build/template tests own this.

### Task 1: Explicit runtime and unchanged wrappers

**Files:** create lib/mcp-release-runtime.mjs; modify worker/mcp-release/index.mjs; create test/mcp-release-runtime-native.test.mjs; add one focused early qualification in .github/workflows/ci.yml without removing existing checks.
**Interfaces:** runReleaseOperator(bundle,env,args,lease,observation); runReleaseWorkflow({bundle,env,event,step}).

- [x] Add native test that imports the helper and builds an alternate Workflow with a valid explicit publication bundle while the ambient bundle is foreign; assert confirmed + one native D1 attempt/receipt, then restart returns uncertain with no second POST. Test closed, expired and foreign payload yields blocked with provider0/journal0.
- [x] Commit test first; open draft PR and observe Actions failure at missing runtime export before implementation.
- [x] Move current helpers into the library; add explicit bundle parameter, no algorithm rewrite. Keep observer routing in the original wrapper; delegate its ordinary Workflow and RPC paths.
- [ ] Run targeted native tests plus npm test, lint and build in Actions. Require original wrappers and templates to pass unchanged.
- [ ] Independent whole-branch review; fix findings, verify final head, record source-only result. Merge only after required checks; no runtime deployment.

### Continuity

Ledger docs/superpowers/plans/2026-10-30-shared-finite-release-runtime-progress.md records exact RED/GREEN head/run/review and remaining QA integration gates. Later increments require their own precise plan; this extraction does not admit a new guard generation.
