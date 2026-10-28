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

99536ac8 first implementationCI40779975186/job123138880028:3181PASS/1nativeFAIL/1priorSKIP; five package checks PASS. Native fresh Workflow returnedblocked insteadobserved; all10Node behaviorspassed. Preserve assertion; characterize native step result metadata before fixing. Ruling: add credential-free focused new-boundary tests before the unchanged fullCI suite to make native diagnosis fast; full npmtest/lint/build remain required, cost one duplicate focused run on successfulCI.

3ce0cf12 focusedCI40780753954/job123141539748:10NodePASS/1nativeFAIL. Native diagnostic preserved production code and realStep.do: returnkindobject, exact8observationfields PLUS nonenumerableSymbol.dispose, outboundGETcount7; final Workflowrejected it asblocked. Rootcause is our objectstep-cache boundary, not denied credential/provider/Container. Ruling: keep strict receipt grammar and serialize validated sanitized JSON as a primitive across BOTH originalRPC and step cache; do not ignore unexpected symbols or relax schema. Remove diagnostic subclass beforeGREEN. Same nativeRED asserts correct behavior; complete suite/package checks pending.

Ruling: extend the existing credential-free closed build guard with the new probe flag=false/policyempty, so an artifact cannot be labelledclosed while enabling the new reader; this is a narrow workflow configuration check, not a new runtime feature or deployment. Existing source flags remainfalse.

Task1 complete RED403becae and native boundary characterization above. Task2 complete378f6110/CI40781218886/job123143088712:focusedPASS/full3182PASS0FAIL1priorSKIP/lint0errors13priorwarnings/all5appbuilds, five packagechecksPASS.

Final whole-branch review378f6110 by one fresh Astrahigh reviewer:0Critical/2ImportantP2/1Minor, With fixes. Important1 verified in exact helper: full100terminal rows with onlyper_page100 passed without total evidence. Important2 exact helper accepted script_deleted:true with historical matching association identifiers. Author accepts both by impact; actual primaryWorkflow schema22:36:58Z hascount7/per_page100/total_count7 while emptyContainer legitimately onlyper_page100. Split completeness requirements by resource and reject deleted/malformed association; preserve old emptyContainer shape.
Final: minor (deferred): native foreign-actor RPC invocation is not exercised, although Node identity denial and real native own-slot behavior pass; no concrete bypass found. Cost: reduced direct native coverage, remains a future small acceptance, not a claim already proved.
Final: Ruling D1 real token permission/lifetime is outside source review; retain separate real finite probe gate, never infer from greenCI. Cost if wrong: premature permission claim; prevent with explicit sourceCredentialNotTested.
Final: Ruling D2 actual deployment/bindings/versions require dated primary readback independent of review. Root22:41:41Z verified unchanged canary6a0c97e9/operator855dc5c1/QA405da253; no promotion from review. Cost if wrong: wrong-resource adoption; exacttarget/hash preflight remainsmandatory.
Final: Ruling D3 subscribe/unsubscribe,bothrevocations,physicalstop,restoration/posteffects remain separate lifecycle gates. Readerresult cannot authorize them. Cost if wrong: unsafe lifecycle inference; readinessfalse/negativeauthority retained.
Final: Ruling D4 PCoff,periodiccontinuity/guard are unproved; existing localmonitorPAUSED. Cost if wrong: missed unattended work; no readiness/apagar claim.
Final: Ruling D5 sevenGETs are sequential dated snapshots, never atomic or proof resources stayed unchanged. Accept observedSnapshotOnly; downstream restoration/closure must reobserve current state. Cost if wrong: stale composite; noauthority/readinessfalse and final primary preflight required.
Final: Ruling D6 schedules are not among sevenreads and observed does not prove no future triggers; full runtime closure/PCoff must separately check schedules/tails/activeframes. Keep narrow readonly qualification, no extra GET or inference. Cost if wrong: overlooked future activity; no lifecycle acceptance from this result.
Material author pass: add focused REDs for missing/inconsistent Workflow total and deleted/malformed association before modifying code, then GREEN plus fullCI. No second reviewer.

MaterialREDe6ff841f/CI40782673878/job123148012873:focused21tests13PASS8FAIL0skip. All six invalid evidence subcases returnedobservedvsblocked:missingfullpagetotal,countonly,nonemptyzero-pages,script_deletedtrue/stringfalse/null; two aggregate parentsfailed. Both positivecontrols and real nativeWorkflow passed. Author fixes only Workflow total/completeness requirement plus script_deleted false-or-absent; originalemptyContainerper_page100 remainsvalid. FullGREEN pending, no secondreview.
