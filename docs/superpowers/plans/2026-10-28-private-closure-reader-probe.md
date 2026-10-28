# Private closure reader probe Implementation Plan
> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Qualify the dedicated read token through a bounded private cloud-only observation without opening client capabilities.
**Architecture:** One strict server-owned policy and fixed actor, issued-before-read SQLite record, seven fixed GETs, existing Workflow dispatch. No public route or new infrastructure.
**Tech Stack:** JavaScript ESM, node:crypto, Cloudflare Durable Objects/Workflows, Miniflare/workerd, GitHub Actions.
**Spec:** docs/superpowers/specs/2026-10-28-private-closure-reader-probe.md

## Global Constraints
AFW only; original window<=600000ms; parent<=30000ms/child<=5000ms;sevenGETs/max4MiBJSON;module<=2MiB. Flags defaultfalse/policyempty, fixed private actor, no secretvalue output/read by agent, no POST/retry/newnamespace/cron/route/OAuth/Max. operationalReadiness=false always. Existing restoration/legacy behavior preserved.

## Review Focus
1. Resumed continuation after storage/credential/body await must recheck wall+monotonic clocks and control before each fetch.
2. Unknown initial/final SQLite ACK and recreation/concurrency must consume one budget, never duplicate HTTP or freshen historical output.
3. Redirect/cache/oversize/error/late stream bodies must release resources and never expose credential/provider values.
4. Inventory partial pages, mismatched pins/open flags and Workflow association must fail rather than imply closed state.
5. Actual private RPC/Workflow wiring and public denial must be exercised natively; no fixture replacing production logic.

## Task1: Tests before implementation
Files:test/mcp-closure-reader-probe.test.mjs;test/mcp-closure-reader-probe-native.test.mjs.
- [ ] Write behavior assertions for exact seven GET routes/read header, hash/config/module/closed pins, no POST, sanitized output; replay/concurrency/committed-ACK-loss; wrong hash/actor/flag/expiry/control switch;403/redirect/badcache/malformed/oversize/late and final stream; partial inventories; Workflow cached freshness/input denial.
- [ ] Native production entrypoint/SQLite/Workflow with synthetic outbound provider: closed gate blocks; own exact plan observes once, recreation and second instance historical without duplicate reads; public path404/foreign RPCblocked.
- [ ] Commit tests/spec/plan only on isolated cloud branch; npm test in Actions must fail for missing private probe (legacy suite remains green). Record exactRED.

## Task2: Minimal implementation
Create lib/mcp-closure-reader-probe.mjs. Export createPrivateClosureReaderProbe({env,ctx,fetchImpl,now}).run(planHash)->sanitized object and runPrivateClosureReaderProbeWorkflow({env,event,step,now})->sanitized object. Parse exact canonical policy internally; use restorationConfigurationHash only for a fingerprint, not authority.
Modify worker/independent-closure/index.mjs: retained private probe host, runOwnClosureReaderProbe(...args) returning JSONstring; exact Workflow dispatch. Modify wrangler.independent-closure-qa.jsonc with false flag/empty policy only.
- [ ] After observedRED implement strict parser, scoped actor/control and durable one-shot journal.
- [ ] Implement fixed request sequence, timing/body/resource guards and sanitized per-resource validation; Workflow primitive RPC result strictness/cached dates.
- [ ] Run npm test, npm run lint, npm run build and all independent package/build checks in Actions; fix actual failures with preserved assertions.

## Task3: Whole-branch review/integration
- [ ] One fresh whole-branch reviewer on Astra high, template/spec/plan, then author handles material findings in one RED/GREEN pass; ledger every ruling/deferred minor.
- [ ] All final checks green and exacthead verified before merge; verify accepted main and checkpoint. No runtime deploy by this plan.

# Ledger
Plan:docs/superpowers/plans/2026-10-28-private-closure-reader-probe.md
Base317c55d180fee485bf77254f3e13904e971ce142/tree98d0ac48a46e379f679e4ec199403be16942fb47.
Ruling: owner's cloud-first preference replaces local worktree/sdd scratch with isolated GitHub branch and committed plan ledger; no local clones/builds/deps.
Pre-flight: Task2 API consumed by Task1 Node tests and actual native Worker/Workflow tests; JSONstring RPC avoids extra disposal schema, no original restoration APIs changed.
Runtime baseline22:10:23Z: active405/ad5030d5 remainsclosed; normalized inactive3158d8dd-13fb-48a6-b9ed-dc827f0ed180 has13bindings including secret_text AFW_MCP_CLOSURE_READ_TOKEN, same400761/SHA75f9db02 and config3538e61a, no Containerattachment. UIcustodyd8c84844 has extra inactive attachment; never deploy it. Neither token usability nor lifecycle is proved.

RED403becae/CI40778909146/job123135277004:3171PASS/11expectedfeatureFAIL/1priorSKIP. Native production Workflow returned no probe status (expectedblocked);10Node cases detected missing probe module. Existing3171 remainedgreen. No implementation preceded this RED. Ruling: primitive JSON RPC is validated within the Workflow and retains original dates; no native object-disposer transport fields added. First implementation now pendingGREEN.
