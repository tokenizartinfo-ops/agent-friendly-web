# Task1 — IN_PROGRESS: compile-only native-callsite inventory checkpoint

PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web/public1347578006; ENVIRONMENT Source/SYN GitHub Actions. This is a preparation checkpoint, **not Task1 completion, native coverage, attribution qualification, or 9/9 GREEN**.

## Exact revisions and bounded actions

Global Task1 BASE: `29681cae2bf1094ec5c66d5b2784254f77bec697`, tree `0200cf32ac4e020bd35c56c307fbc8060cf8bd64` (3179 leaves).
Accepted causal R0 Source: `ecd572222f7ec4e2759a9e6301e6a8481a6ea6b2`; [run42401162548](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42401162548), job128488992085. R0 failed only after actual SDKcomplete1 + durable Reference +302; 1test/1expectedFAIL/0pass/cancel/skip/todo. Full causal history will be appended in the final Task1 report; R0 was not rerun.
Collector/evidence/Q checkpoint: `050ad1a1eb9091ae02dbf3f2d2131656de0a5da3`, tree `8f3f9610332368fa6bd2edd06a5c9fdd41634a28`. Q1–Q8 remain unexecuted.
This compile-only code Source: `e8b2ebed173ea4ce38040db3b19368918e72c79a`, tree `8a21dd9aac317ac251832a70e3369b01427b78b7`, parent050ad1a. Main independently read back `0c9c475b3ebaa970fc11d628b40e50a90cceb727`. Source was frozen from the activator commit through terminal run/readback.
Only finite-budget-world, the allowed initial-entry fixture opt-in, and TEMP changed from050ad1a. All production/lib/worker/package/lock/SDK/config leaves remain exact BASE. No local clone, dependency install, test/build, native DB extraction, provider API, OAuth, runtime, main, PR or publication action occurred.

## Primary cloud evidence

[Compile-only run42403413324](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42403413324), attempt1, eventpush, job `compile_only/128495875870`, created2026-11-07T18:52:13Z. Single run for this head; all install/syntax/lint/compile/seal/upload/download/readback steps succeeded. Timeout3min; compiler+AST inventory measured1231ms.
Command: `AFW_BUDGET_INSPECTION=compile-only node test/fixtures/finite-budget-world.mjs inspect-budget-graphs output/finite-budget/compile-only`.
Syntax: `node --check` each changed fixture; focused ESLint on the two changed fixtures succeeded. No Q, R0, P1, 9/16/56 suite or native lineage ran.

Artifact `13586248119`, name `finite-budget-compile-only-e8b2ebed173ea4ce38040db3b19368918e72c79a`, 1888357ZIP bytes, SHA256 `b342ff82ad1ab43918d0ae5b2631cccb63f1f0faefce210a1a7fa71a7a337002`, expiry2026-11-14T18:52:35Z.
Runner downloaded the **same artifact ID** into runner.temp and verified exact9paths, source/run/attempt, bytes/SHA, graph/metafile/input membership and10seams. Manifest 1576B SHA256 `6db6eae2fa1a906fe9eae047423c5732b5370c5dc0be22ac4329b13e6165daba`; map 995026B SHA256 `51c4b9c87b47d8a5d51c1fe4b9440b904c6f2d574a7ab535ac67c98231532c95`.
Exact archive paths: candidate-map.json, console.log, manifest.json, metafiles.json, prepared-inputs.json, provenance.json, scripts/M-index.mjs, scripts/QA-index.mjs, source-inputs.json. There are **no native-state/checkpoint files**.

A separate Root-authorized RAM-only read of the connector-returned archive verified ZIP size/digest, exact9entries, manifest source/run/attempt and map size/digest before extraction. Total uncompressed archive7351721B <25MB; ZIP <5MB. Only map/manifest/source-input metadata/provenance were inflated; no scripts or contained code executed, no filesystem writes/child process/dependency or credential lookup. Buffer references were dropped after extraction.

|Graph|Actual compiled bytes|SHA256|Existing compatibility|
|---|---:|---|---|
|M|1988061|`c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32`|2026-09-07 / nodejs_compat,global_fetch_strictly_public,enable_request_signal|
|QA|2507783|`28bba1dba9d81d1608e28f5615d57aea1fab2b580f87376c18293033d7117c7f`|2026-09-07 / nodejs_compat|

Both scripts were rebuilt with the actual existing esbuild compositions. QA uses explicitly MODELED namespace hash/string **compiler input data**, not namespace objects or derived native identity. Inspection omits keypair/persist/Miniflare constructor/getBindings/setOptions/seed/invoke and asserts mf/persist/pair null before returning immediately after M/QA compile. The final P1 must rebuild with actual native identity derivation and **must never consume these compile-only IDs or bundles**. No new compatibility date, flag or dependency was added.

## Decision status and limits

**acceptedForNativeInstrumentation=false.** Discovery inspects a closed set of API-shaped CallExpressions with locked TypeScript5.9.3; it performs no instrumentation rewriting. Counts are syntactic candidates, not executed operations or measured provider quota/RTT.
461inputs;172candidate-bearing modules;1696calls in1140groups;732native candidates,128body facets,376excluded API-shaped calls,460unresolved calls in317groups/98modules.117modules have native/body candidates. Compared with R0's458disk-source inputs, this total also includes virtual compiler data/entry inputs; denominators differ.

Important remaining defect in the **map**, not the compiled scripts: inventory deduplicates module paths across M/QA and uses a QA prepared override for a shared path. At least `lib/mcp-qa-finite-fixed-policy-engine.mjs` is shared but only QA has existing diagnostic substitutions. Its prepared line/hash view cannot represent M as well. Role-specific source variants are required before this map can be accepted for native instrumentation. The scripts/metafiles retain separate actual hashes.
The heuristic is intentionally provisional: lexical receivers named s/tx may be helpers, namespace get may select a stub, helper journal reads can duplicate lower native entries, and several memory/RegExp calls remain unresolved. None can be blanket rewritten or treated as zero unknown.
Snapshot ordinals/peaks must stay local to disjoint producer/consumer and M/QA segments. Actual setup I/O precedes stage-work ALS; explicit actual setup parent.lease and original alarm parent.lease are mandatory. Missing ALS/weak attribution is incompleteness, never fallback authority or an invented Root.
The ten marker matches below prove source seams exist, not that all native operations are already mapped. Entry handler phase and exact callback flow still need closure, including restore/final inventory and late native settlement.

## Ten exact source seams (each expected1, observed1)

|#|Module|Fixed phase / mapping|Observed/expected|Meaning|Marker SHA256|
|---:|---|---|---:|---|---|
|1|`lib/mcp-qa-finite-initial-entry.mjs`|setup|1/1|actual setup Root before first command/source/storage I/O and stage-work|`086baa4b066153e3e7142dbafb1493353a6c7e2a9c274893e0fdce823732aec0`|
|2|`lib/mcp-qa-finite-initial-cleanup.mjs`|cleanup_before_restore|1/1|actual original alarm Root; never a reconstructed request Root|`166c8c6e4b2ea143fa3266bd595c99066de76b590d9527a956b6f7b49881737a`|
|3|`lib/mcp-qa-finite-owner-preparation.mjs`|request-callsite|1/1|actual request Root registration; observed deadline only|`cc684114922db5600b13dc91beecc766793acc44e3bbf0dc5b96719821503699`|
|4|`lib/mcp-qa-finite-owner-preparation.mjs`|inherited|1/1|actual request child identity and original deadline|`a4084a2fd9d24481cb2621950fb0ef343ce38add2ebedaa8cb41b89f5ee22cb0`|
|5|`lib/mcp-qa-finite-initial-lease.mjs`|inherited|1/1|actual child callback retains exact returned native promise|`81088ec29352af90efd4c0d24503ed1cb7d7b654bfa2e9a2a240f7f1fc38cf33`|
|6|`lib/mcp-qa-finite-owner-phase-context.mjs`|sdk_lookup|1/1|lookup callback fixed sdk_lookup scope before composed existing diagnostics|`61d9cb3fd8eb9cfb344d9a94dc4e12be491beef4e581713797f9cf24ade34c57`|
|7|`lib/mcp-qa-finite-owner-cleanup.mjs`|sdk_lookup|1/1|actual private readonly native entry, original guards/retain/order|`d3780a931d5a1323e72ba3d0c4dd61791a4df1044e8d5b5c7b739e85c5e3ba92`|
|8|`lib/mcp-qa-finite-owner-cleanup.mjs`|sdk_reduction|1/1|actual private reduction native entry, no exported facet|`f8e06b50cdc6eedee6fb1f4e633f296489e622c22ba4bc1ba6c433ecced539f3`|
|9|`lib/mcp-qa-finite-owner-cleanup.mjs`|final_inventory|1/1|fixed final-inventory call scope, nested I/O inherits immutable store|`b83f48bc817c7736b8c4e33ea36e63db5f6325639bbe194f9d1a308a8d61a891`|
|10|`worker/mcp-own/finite.mjs`|token_exchange-or-mcp_read|1/1|actual unreserved M entry; transport Root only, deadline null|`c8c0ee065fdd3a47fb4d748c97570b6c518b954c046ccb1dc71681e3f39d00c4`|

## Candidate-bearing modules — classifications kept separate

N=provisional native-boundary candidate; B=body read/cancel facet; E=excluded API-shaped call; U=unresolved. These columns do not assert execution or authorized scope. Roles identify graph membership; the shared prepared-source limitation above applies.

|ID|Module|Roles|N|B|E|U|
|---|---|---|---:|---:|---:|---:|
|M001|`<stdin>`|QA|113|11|6|6|
|M002|`lib/assistance-administrative-get-transport.mjs`|QA|0|2|2|0|
|M003|`lib/assistance-approved-qa-closure-actor.mjs`|QA|0|0|0|3|
|M004|`lib/assistance-closure-alarm-lifecycle.mjs`|QA|19|0|0|0|
|M005|`lib/assistance-closure-d1-actions.mjs`|QA|1|0|0|2|
|M006|`lib/assistance-independent-closure.mjs`|QA|6|0|0|0|
|M007|`lib/assistance-occurrence-approvals.mjs`|QA|7|0|0|0|
|M008|`lib/assistance-occurrence-d1.mjs`|QA|4|0|0|0|
|M009|`lib/assistance-occurrence-http.mjs`|QA|4|0|0|4|
|M010|`lib/assistance-private-challenge-budget.mjs`|QA|3|0|0|0|
|M011|`lib/assistance-private-challenge-host.mjs`|QA|0|0|0|2|
|M012|`lib/assistance-private-challenge-identity.mjs`|QA|0|0|1|1|
|M013|`lib/assistance-private-custody-challenge.mjs`|QA|14|0|0|0|
|M014|`lib/assistance-private-evidence-journal.mjs`|QA|8|0|0|0|
|M015|`lib/assistance-private-installation-consumption.mjs`|QA|2|0|0|0|
|M016|`lib/assistance-private-installation-d1.mjs`|QA|7|0|0|1|
|M017|`lib/assistance-private-installation-finalization.mjs`|QA|2|0|0|0|
|M018|`lib/assistance-private-installation-intent.mjs`|QA|2|0|0|0|
|M019|`lib/assistance-private-provider-get-transport.mjs`|QA|0|2|2|0|
|M020|`lib/assistance-private-qa-catalog-host.mjs`|QA|3|0|0|5|
|M021|`lib/assistance-private-qa-installer.mjs`|QA|14|2|0|5|
|M022|`lib/assistance-private-qa-preregistration.mjs`|QA|25|0|0|4|
|M023|`lib/assistance-private-qa-provisioning.mjs`|QA|19|0|0|2|
|M024|`lib/assistance-private-resource-holds.mjs`|QA|10|0|0|0|
|M025|`lib/assistance-private-revocation-budget.mjs`|QA|3|0|0|0|
|M026|`lib/assistance-provider-token-name.mjs`|QA|0|2|2|0|
|M027|`lib/assistance-qa-administrative-composition.mjs`|QA|0|0|0|1|
|M028|`lib/assistance-qa-closure-catalog.mjs`|QA|15|0|0|0|
|M029|`lib/assistance-service-identity-transport.mjs`|QA|0|2|2|0|
|M030|`lib/cloudflare-access-identity.mjs`|M,QA|0|0|1|0|
|M031|`lib/delegated-dossier-events.mjs`|M|0|0|0|1|
|M032|`lib/delegated-oauth-store.mjs`|M,QA|11|0|0|0|
|M033|`lib/delegated-oauth-worker.mjs`|M|5|2|9|4|
|M034|`lib/delegated-project-repository.mjs`|M,QA|4|0|0|0|
|M035|`lib/dossier-event-rpc-authority.mjs`|M,QA|1|0|0|1|
|M036|`lib/dossier-monitoring-authority.mjs`|M,QA|3|0|0|0|
|M037|`lib/dossier-monitoring-owner-http.mjs`|M|3|2|7|1|
|M038|`lib/dossier-supervision.mjs`|M,QA|8|0|0|0|
|M039|`lib/mcp-activation-journal.mjs`|QA|4|0|0|0|
|M040|`lib/mcp-activation-observer.mjs`|M,QA|0|2|3|0|
|M041|`lib/mcp-callback-transport.mjs`|M,QA|0|0|1|1|
|M042|`lib/mcp-canary-restoration-transport.mjs`|QA|0|3|4|1|
|M043|`lib/mcp-closed-version-upload.mjs`|QA|0|2|4|0|
|M044|`lib/mcp-closure-reader-probe.mjs`|QA|1|3|4|4|
|M045|`lib/mcp-discovery-diagnostic.mjs`|M|0|0|1|1|
|M046|`lib/mcp-fixed-terminal-workflows.mjs`|QA|0|0|1|0|
|M047|`lib/mcp-hosted-canary-restoration.mjs`|QA|3|1|3|10|
|M048|`lib/mcp-invocation-storage.mjs`|M|0|0|0|4|
|M049|`lib/mcp-node-private-bridge.mjs`|M|1|3|4|0|
|M050|`lib/mcp-node-process-custody.mjs`|M|20|0|0|4|
|M051|`lib/mcp-original-container-runtime.mjs`|M|1|3|2|0|
|M052|`lib/mcp-own-durable-host.mjs`|M|5|0|0|0|
|M053|`lib/mcp-own-event-schedule.mjs`|M,QA|0|0|0|1|
|M054|`lib/mcp-own-finite-admission-gate.mjs`|M,QA|0|0|0|9|
|M055|`lib/mcp-own-finite-cleanup-host.mjs`|M|3|0|0|3|
|M056|`lib/mcp-own-finite-cleanup-proof.mjs`|M,QA|3|0|0|4|
|M057|`lib/mcp-own-finite-primary.mjs`|M,QA|2|0|0|1|
|M058|`lib/mcp-own-finite-reduction.mjs`|M|8|0|0|0|
|M059|`lib/mcp-own-permission-withdrawal.mjs`|M|2|0|0|0|
|M060|`lib/mcp-own-subscription-observation-http.mjs`|M|0|0|1|0|
|M061|`lib/mcp-own-subscription-receipt.mjs`|M|4|0|0|0|
|M062|`lib/mcp-own-successor-host.mjs`|M,QA|0|0|0|1|
|M063|`lib/mcp-own-successor-retirement-host.mjs`|M|1|0|0|0|
|M064|`lib/mcp-own-synthetic-save-host.mjs`|M|0|0|0|2|
|M065|`lib/mcp-own-synthetic-save-http.mjs`|M|1|2|4|2|
|M066|`lib/mcp-own-synthetic-save.mjs`|M|5|0|0|0|
|M067|`lib/mcp-publication-artifact-reader.mjs`|M,QA|0|2|4|0|
|M068|`lib/mcp-publication-deployment-reader.mjs`|M,QA|1|0|0|0|
|M069|`lib/mcp-publication-journal.mjs`|QA|2|0|0|0|
|M070|`lib/mcp-qa-closed-context.mjs`|M,QA|0|0|0|1|
|M071|`lib/mcp-qa-finite-bootstrap-native.mjs`|QA|1|3|7|0|
|M072|`lib/mcp-qa-finite-bootstrap-primary.mjs`|QA|0|0|1|0|
|M073|`lib/mcp-qa-finite-cleanup-store.mjs`|QA|22|0|0|3|
|M074|`lib/mcp-qa-finite-confirmation.mjs`|QA|0|0|0|1|
|M075|`lib/mcp-qa-finite-fixed-policy-engine.mjs`|M,QA|1|3|4|0|
|M076|`lib/mcp-qa-finite-historical-source.mjs`|QA|4|3|5|1|
|M077|`lib/mcp-qa-finite-initial-cleanup.mjs`|QA|16|3|5|0|
|M078|`lib/mcp-qa-finite-initial-custody-probe.mjs`|QA|1|3|5|0|
|M079|`lib/mcp-qa-finite-initial-entry.mjs`|QA|48|9|20|8|
|M080|`lib/mcp-qa-finite-initial-history-schema.mjs`|QA|1|0|0|0|
|M081|`lib/mcp-qa-finite-initial-lease.mjs`|QA|0|0|0|1|
|M082|`lib/mcp-qa-finite-initial-material-store.mjs`|QA|2|0|0|17|
|M083|`lib/mcp-qa-finite-initial-material.mjs`|QA|1|3|7|0|
|M084|`lib/mcp-qa-finite-initial-old-guard.mjs`|QA|1|3|5|0|
|M085|`lib/mcp-qa-finite-initial-owner-source.mjs`|QA|4|3|5|1|
|M086|`lib/mcp-qa-finite-launch-inventory.mjs`|QA|0|0|0|7|
|M087|`lib/mcp-qa-finite-launch.mjs`|QA|3|0|0|0|
|M088|`lib/mcp-qa-finite-launcher.mjs`|QA|0|0|0|1|
|M089|`lib/mcp-qa-finite-observer-native.mjs`|QA|1|0|0|3|
|M090|`lib/mcp-qa-finite-observer.mjs`|QA|0|0|0|1|
|M091|`lib/mcp-qa-finite-owner-cleanup-journal.mjs`|QA|6|0|0|0|
|M092|`lib/mcp-qa-finite-owner-cleanup.mjs`|QA|11|6|12|18|
|M093|`lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs`|QA|6|0|0|0|
|M094|`lib/mcp-qa-finite-owner-native-bridge.mjs`|M|0|0|2|1|
|M095|`lib/mcp-qa-finite-owner-native-wire.mjs`|M,QA|0|3|17|0|
|M096|`lib/mcp-qa-finite-owner-notice-consent-body.mjs`|M,QA|0|2|0|0|
|M097|`lib/mcp-qa-finite-owner-notice-get-forward.mjs`|M|0|1|2|1|
|M098|`lib/mcp-qa-finite-owner-notice-get-wire.mjs`|M,QA|0|0|10|0|
|M099|`lib/mcp-qa-finite-owner-oauth-forward.mjs`|M|0|0|1|1|
|M100|`lib/mcp-qa-finite-owner-oauth-wire.mjs`|M,QA|0|0|11|6|
|M101|`lib/mcp-qa-finite-owner-phase-context.mjs`|QA|7|3|17|10|
|M102|`lib/mcp-qa-finite-owner-preparation.mjs`|M,QA|4|2|31|2|
|M103|`lib/mcp-qa-finite-policy-journal.mjs`|M,QA|5|0|0|7|
|M104|`lib/mcp-qa-finite-policy-setup.mjs`|M,QA|1|0|1|6|
|M105|`lib/mcp-qa-finite-policy-transport.mjs`|M,QA|0|0|0|5|
|M106|`lib/mcp-qa-finite-preparation-cleanup.mjs`|M,QA|0|0|0|2|
|M107|`lib/mcp-qa-finite-preparation-enrollment-writer.mjs`|M,QA|3|0|0|1|
|M108|`lib/mcp-qa-finite-preparation-issuer-journal.mjs`|QA|6|0|0|1|
|M109|`lib/mcp-qa-finite-preparation-issuer-store.mjs`|QA|0|0|1|1|
|M110|`lib/mcp-qa-finite-preparation-notice-journal.mjs`|QA|6|0|0|0|
|M111|`lib/mcp-qa-finite-preparation-store.mjs`|M,QA|13|0|0|25|
|M112|`lib/mcp-qa-finite-seed-wire.mjs`|M,QA|0|2|6|0|
|M113|`lib/mcp-qa-finite-stage-work.mjs`|M,QA|0|0|17|1|
|M114|`lib/mcp-qa-finite-trial-control.mjs`|M,QA|7|0|0|26|
|M115|`lib/mcp-qa-finite-trial-guard.mjs`|QA|19|0|0|3|
|M116|`lib/mcp-qa-generation-draft-reader.mjs`|QA|1|0|0|0|
|M117|`lib/mcp-qa-generation-ledger.mjs`|QA|3|0|0|5|
|M118|`lib/mcp-qa-generation-preparation.mjs`|QA|1|2|0|3|
|M119|`lib/mcp-qa-generation-resolver.mjs`|QA|1|0|0|4|
|M120|`lib/mcp-qa-historical-identity.mjs`|QA|1|0|0|0|
|M121|`lib/mcp-qa-named-eligibility.mjs`|QA|1|0|0|0|
|M122|`lib/mcp-qa-named-packet-reader.mjs`|QA|1|0|0|0|
|M123|`lib/mcp-qa-named-preflight.mjs`|QA|1|1|0|5|
|M124|`lib/mcp-qa-original-pins.mjs`|QA|1|0|0|0|
|M125|`lib/mcp-release-runtime.mjs`|QA|4|0|0|1|
|M126|`lib/mcp-release-successor-reservation.mjs`|QA|0|0|0|1|
|M127|`lib/mcp-retired-custody-reader.mjs`|M|2|0|0|0|
|M128|`lib/mcp-retirement-provider-reader.mjs`|M,QA|0|3|4|0|
|M129|`lib/mcp-saved-dossier-event.mjs`|M|1|0|0|0|
|M130|`lib/mcp-signed-envelope.mjs`|M,QA|0|0|0|1|
|M131|`lib/mcp-subscription-lifecycle.mjs`|M,QA|24|0|0|3|
|M132|`lib/mcp-successor-canary-restorer.mjs`|QA|4|0|3|0|
|M133|`lib/mcp-successor-deployment-reader.mjs`|M,QA|0|2|4|0|
|M134|`lib/mcp-successor-launch-gate.mjs`|M|2|0|0|0|
|M135|`lib/mcp-successor-reservation.mjs`|QA|1|0|0|0|
|M136|`lib/mcp-successor-retirement-handoff.mjs`|M,QA|3|0|0|0|
|M137|`lib/operations-service-request-controls.mjs`|QA|0|2|2|1|
|M138|`node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js`|M,QA|55|9|29|5|
|M139|`node_modules/@modelcontextprotocol/server/dist/ajvProvider-CEoC__sr.mjs`|M|0|0|0|13|
|M140|`node_modules/@modelcontextprotocol/server/dist/index.mjs`|M|0|2|51|2|
|M141|`node_modules/@modelcontextprotocol/server/dist/mcp-DXXb3Vv3.mjs`|M|0|0|2|10|
|M142|`node_modules/@modelcontextprotocol/server/dist/src-CX2iR2pK.mjs`|M|0|0|1|27|
|M143|`node_modules/agents/dist/handler-stateless-VvrWSAVA.js`|M|2|4|3|1|
|M144|`node_modules/jose/dist/webapi/jwks/local.js`|M,QA|0|0|1|1|
|M145|`node_modules/jose/dist/webapi/lib/deflate.js`|M,QA|0|2|0|0|
|M146|`node_modules/jose/dist/webapi/lib/jws_verify.js`|M,QA|0|0|0|1|
|M147|`node_modules/jose/dist/webapi/lib/jwt_claims_set.js`|M,QA|0|0|0|2|
|M148|`node_modules/jose/dist/webapi/lib/key.js`|M,QA|0|0|1|0|
|M149|`node_modules/yaml/browser/dist/compose/resolve-flow-scalar.js`|M,QA|0|0|0|3|
|M150|`node_modules/yaml/browser/dist/doc/anchors.js`|M,QA|0|0|0|1|
|M151|`node_modules/yaml/browser/dist/doc/applyReviver.js`|M,QA|0|0|0|4|
|M152|`node_modules/yaml/browser/dist/doc/createNode.js`|M,QA|0|0|0|1|
|M153|`node_modules/yaml/browser/dist/doc/Document.js`|M,QA|0|0|0|2|
|M154|`node_modules/yaml/browser/dist/nodes/Alias.js`|M,QA|0|0|0|3|
|M155|`node_modules/yaml/browser/dist/nodes/Collection.js`|M,QA|0|0|0|6|
|M156|`node_modules/yaml/browser/dist/schema/tags.js`|M,QA|0|0|0|1|
|M157|`node_modules/zod/v4/classic/from-json-schema.js`|M|3|0|0|0|
|M158|`node_modules/zod/v4/classic/schemas.js`|M|0|0|0|3|
|M159|`node_modules/zod/v4/core/api.js`|M|0|0|0|2|
|M160|`node_modules/zod/v4/core/checks.js`|M|0|0|0|1|
|M161|`node_modules/zod/v4/core/json-schema-processors.js`|M|10|0|0|0|
|M162|`node_modules/zod/v4/core/parse.js`|M|0|0|0|4|
|M163|`node_modules/zod/v4/core/registries.js`|M|0|0|0|6|
|M164|`node_modules/zod/v4/core/schemas.js`|M|0|0|11|43|
|M165|`node_modules/zod/v4/core/to-json-schema.js`|M|15|0|0|1|
|M166|`node_modules/zod/v4/core/util.js`|M|0|0|2|0|
|M167|`scripts/check-own-cron-provider.mjs`|QA|0|2|1|0|
|M168|`worker/independent-closure/finite.mjs`|QA|2|0|1|3|
|M169|`worker/independent-closure/index.mjs`|QA|8|1|0|35|
|M170|`worker/independent-closure/occurrence-host.mjs`|QA|0|0|0|1|
|M171|`worker/mcp-own/finite.mjs`|M|1|0|0|0|
|M172|`worker/mcp-own/index.mjs`|M|1|0|0|1|

## Native/body candidate callsite groups

All626provisional groups are listed, grouped only by exact module/receiver/method/function/classification. Lines are **prepared source** locations, not GitHub raw-source line guarantees. Full positions, every callsite hash, original receiver/function text and full source-input hashes live in the immutable downloaded candidate-map/source-input files covered by the map digest above. Cell shortening is presentation only; no JSON artifact was truncated. Each group retains its exact total count; up to six line locations are shown.

|Module ID|Class|Receiver / target|Method|Source function/callback|Count|Prepared lines|
|---|---|---|---|---|---:|---|
|M001|N|kv / native.put|put|anonymous|3|33,36,37|
|M001|N|s / native.transaction|transaction|anonymous|2|50,263|
|M001|N|tx / put|put|anonymous|1|51|
|M001|N|s / native.storageGet|storageGet|anonymous|1|55|
|M001|N|s / native.sync|sync|anonymous|2|56,274|
|M001|N|this.ctx.storage / this.ctx.storage.list|list|ownerReferenceObserve|1|58|
|M001|N|bound / first|first|anonymous|2|82,244|
|M001|N|kv / get|get|anonymous|1|90|
|M001|N|kv / list|list|anonymous|1|96|
|M001|N|kv / del|del|anonymous|1|103|
|M001|N|this.ctx.storage / this.ctx.storage.list|list|ownerCleanupNativeRows|1|127|
|M001|N|db.prepare([literal]).bind(i.preconnectionId) / db.prepare([literal]).bind(i.preconnectionId).first|first|ownerCleanupNativeRows|1|130|
|M001|N|db.prepare([literal]).bind(i.grantId) / db.prepare([literal]).bind(i.grantId).first|first|ownerCleanupNativeRows|1|130|
|M001|N|db.prepare([literal]).bind(i.grantId) / db.prepare([literal]).bind(i.grantId).all|all|ownerCleanupNativeRows|1|130|
|M001|N|this.env.RELEASE_DB.prepare([literal]) / this.env.RELEASE_DB.prepare([literal]).first|first|ownerCleanupFacts|1|141|
|M001|N|this.ctx.storage / this.ctx.storage.getAlarm|getAlarm|ownerCleanupFacts|1|142|
|M001|N|this.ctx.storage / this.ctx.storage.list|list|ownerCleanupFacts|1|142|
|M001|N|super / super.fetch|fetch|callback:this.ownerReferenceFetch|1|147|
|M001|N|s / s.put|put|firstConnectionTicketFault|2|158,169|
|M001|N|s / s.sync|sync|firstConnectionTicketFault|2|158,169|
|M001|N|s / s.list|list|firstConnectionTicketFault|1|160|
|M001|N|s / s.get|get|firstConnectionTicketFault|3|166,167,168|
|M001|N|s / s.put|put|firstConnectionCorruptCompleted|2|173,195|
|M001|N|s / s.sync|sync|firstConnectionCorruptCompleted|2|173,197|
|M001|N|s / s.list|list|firstConnectionCorruptCompleted|1|175|
|M001|N|s / s.get|get|firstConnectionCorruptCompleted|4|177,177,181,195|
|M001|N|s / s.get|get|change|1|178|
|M001|N|s / s.put|put|change|1|178|
|M001|N|this / this.fetch|fetch|firstConnectionExpiredEntry|1|205|
|M001|B|response.body / response.body?.cancel|cancel|firstConnectionExpiredEntry|1|205|
|M001|N|owner / owner.fetch|fetch|firstConnectionBodyStart|1|217|
|M001|B|response.body / response.body?.cancel|cancel|firstConnectionBodyStart|1|217|
|M001|N|s / s.put|put|firstConnectionBackupFault|2|225,229|
|M001|N|s / s.sync|sync|firstConnectionBackupFault|2|225,230|
|M001|N|s / s.list|list|firstConnectionBackupFault|1|226|
|M001|N|s / s.delete|delete|firstConnectionBackupFault|1|229|
|M001|N|s / native.list|list|anonymous|1|245|
|M001|N|env.RELEASE_DB.prepare([literal]) / env.RELEASE_DB.prepare([literal]).run|run|get|1|256|
|M001|N|tx / tx.put|put|anonymous|2|264,445|
|M001|B|response.body / response.body.cancel|cancel|anonymous|5|296,297,298,299,301|
|M001|N|s / s.list|list|firstConnectionReseal|1|309|
|M001|N|s / s.put|put|firstConnectionReseal|2|312,314|
|M001|N|s / s.sync|sync|firstConnectionReseal|1|314|
|M001|N|this.ctx.storage / this.ctx.storage.list|list|firstConnectionProbe|1|320|
|M001|N|this.ctx.storage / this.ctx.storage.getAlarm|getAlarm|firstConnectionProbe|1|320|
|M001|N|this.ctx.storage / this.ctx.storage.put|put|seed|1|322|
|M001|N|this.ctx.storage / this.ctx.storage.sync|sync|seed|1|322|
|M001|N|this.ctx.storage / this.ctx.storage.list|list|snapshot|1|323|
|M001|N|this.ctx.storage / this.ctx.storage.delete|delete|mutateCleanup|1|324|
|M001|N|this.ctx.storage / this.ctx.storage.get|get|mutateCleanup|1|324|
|M001|N|this.ctx.storage / this.ctx.storage.put|put|mutateCleanup|1|324|
|M001|N|this.ctx.storage / this.ctx.storage.sync|sync|mutateCleanup|1|324|
|M001|N|s / s.get|get|read|1|325|
|M001|N|this.ctx.storage / this.ctx.storage.get|get|seedFutureActivation|2|329,330|
|M001|N|this.ctx.storage / this.ctx.storage.put|put|seedFutureActivation|3|331,333,335|
|M001|N|this.ctx.storage / this.ctx.storage.sync|sync|seedFutureActivation|1|335|
|M001|N|this.ctx.storage / this.ctx.storage.get|get|probeActivationWire|3|339,339,339|
|M001|N|s / s.get|get|ownerSourceRead|1|357|
|M001|B|response.body / response.body.cancel|cancel|callback:Reflect.apply(fetcher,globalThis,args).then|1|364|
|M001|N|s / get|get|anonymous|1|368|
|M001|N|s / alarm|alarm|anonymous|1|382|
|M001|N|s / list|list|anonymous|1|383|
|M001|N|this.ctx.storage / this.ctx.storage.get|get|probeInitialInventory|1|398|
|M001|N| / fetch|fetch|read|1|398|
|M001|N|this.ctx.storage / this.ctx.storage.getAlarm|getAlarm|alarmInfo|1|403|
|M001|N|this.ctx.storage / this.ctx.storage.setAlarm|setAlarm|installAlarm|1|406|
|M001|B|response.body / response.body?.cancel|cancel|callback:Reflect.apply(actualFetch,globalThis,args).then|3|409,410,411|
|M001|N|s / nt|nt|anonymous|3|422,424,453|
|M001|N|tx / tx.get|get|anonymous|2|422,430|
|M001|N|s / s.put|put|anonymous|1|423|
|M001|N|s / ns|ns|anonymous|2|423,474|
|M001|N|tx / tx.setAlarm|setAlarm|anonymous|1|440|
|M001|N|tx / tx.deleteAlarm|deleteAlarm|anonymous|1|440|
|M001|N|s / s.put|put|callback:actual.then|4|458,463,482,487|
|M001|N|s / s.setAlarm|setAlarm|callback:actual.then|1|458|
|M001|N|s / ns|ns|callback:actual.then|5|458,459,463,464,468|
|M001|N|s / nt|nt|callback:actual.then|2|458,463|
|M001|N|s / s.list|list|callback:actual.then|1|487|
|M001|N|s / ng|ng|anonymous|2|494,502|
|M001|N|statement / all|all|anonymous|1|510|
|M001|N|s / s.put|put|callback:Reflect.apply(nlist,s,args).then|1|518|
|M001|N|s / nga|nga|anonymous|1|520|
|M002|B|reader / reader.read|read|work|1|26|
|M002|B|reader / reader.cancel|cancel|anonymous|1|37|
|M004|N|context.storage / context.storage.transaction|transaction|callback:context.blockConcurrencyWhile|1|21|
|M004|N|tx / tx.get|get|callback:context.storage.transaction|2|22,27|
|M004|N|tx / tx.put|put|callback:context.storage.transaction|2|30,32|
|M004|N|tx / tx.deleteAlarm|deleteAlarm|callback:context.storage.transaction|1|32|
|M004|N|tx / tx.setAlarm|setAlarm|callback:context.storage.transaction|1|35|
|M004|N|storage / storage.transaction|transaction|transaction|1|48|
|M004|N|tx / tx.get|get|callback:storage.transaction|1|49|
|M004|N|tx / tx.put|put|callback:transaction|4|57,63,68,82|
|M004|N|tx / tx.setAlarm|setAlarm|callback:transaction|3|57,66,70|
|M004|N|tx / tx.deleteAlarm|deleteAlarm|callback:transaction|3|64,70,82|
|M005|N|db.prepare([literal]).bind(pin.occurrenceId) / db.prepare([literal]).bind(pin.occurrenceId).first|first|ledgerReceipt|1|30|
|M006|N|storage / storage.transaction|transaction|transact|1|20|
|M006|N|tx / tx.get|get|callback:storage.transaction|1|22|
|M006|N|tx / tx.put|put|callback:storage.transaction|1|24|
|M006|N|tx / tx.put|put|callback:transact|3|43,54,65|
|M007|N|db.prepare([literal]) / db.prepare([literal]).first|first|schema|2|25,25|
|M007|N|db.prepare([literal]).bind(...approvalValues(a)) / db.prepare([literal]).bind(...approvalValues(a))…|run|approve|1|27|
|M007|N|db.prepare([literal]).bind(occurrenceId) / db.prepare([literal]).bind(occurrenceId).first|first|read|2|28,28|
|M007|N|db.prepare([literal]).bind(input.reason,input.occurrenceId) / db.prepare([literal]).bind(input.reas…|run|revoke|1|29|
|M007|N|db.prepare([literal]).bind(input.occurrenceId) / db.prepare([literal]).bind(input.occurrenceId).fir…|first|revoke|1|29|
|M008|N|db.prepare([literal]) / db.prepare([literal]).first|first|ready|2|32,32|
|M008|N|db / db.batch|batch|batch|1|41|
|M008|N|db.prepare([literal]).bind(m.occurrenceId) / db.prepare([literal]).bind(m.occurrenceId).first|first|previous|1|42|
|M009|N|primary.prepare([literal]) / primary.prepare([literal]).first|first|checked|3|64,64,83|
|M009|N|primary.prepare([literal]).bind(m.occurrenceId,[literal]) / primary.prepare([literal]).bind(m.occur…|first|anonymous|1|105|
|M010|N|storage / storage.transaction|transaction|limit|1|11|
|M010|N|tx / tx.get|get|callback:storage.transaction|1|12|
|M010|N|tx / tx.put|put|callback:storage.transaction|1|15|
|M013|N|storage / storage.transaction|transaction|issue|1|43|
|M013|N|tx / tx.get|get|callback:storage.transaction|7|43,43,50,50,56,56,…(+1)|
|M013|N|tx / tx.put|put|callback:storage.transaction|3|43,52,57|
|M013|N|storage / storage.transaction|transaction|consume|1|49|
|M013|N|storage / storage.transaction|transaction|status|1|56|
|M013|N|storage / storage.transaction|transaction|withdraw|1|57|
|M014|N|tx / tx.get|get|history|2|18,22|
|M014|N|storage / storage.transaction|transaction|append|1|35|
|M014|N|tx / tx.put|put|callback:storage.transaction|3|41,42,47|
|M014|N|storage / storage.transaction|transaction|history|1|46|
|M014|N|storage / storage.transaction|transaction|withdraw|1|47|
|M015|N|tx / tx.get|get|readPrivateInstallationConsumption|1|11|
|M015|N|tx / tx.put|put|consumePrivateInstallation|1|21|
|M016|N|primary.prepare([literal]) / primary.prepare([literal]).first|first|schema|4|40,40,40,40|
|M016|N|primary.prepare([literal]).bind(occurrenceId) / primary.prepare([literal]).bind(occurrenceId).first|first|read|1|41|
|M016|N|primary.prepare([literal]).bind(p.occurrenceId) / primary.prepare([literal]).bind(p.occurrenceId).f…|first|write|1|47|
|M016|N|primary.prepare([literal]).bind(...values(p)) / primary.prepare([literal]).bind(...values(p)).run|run|revoke|1|50|
|M017|N|tx / tx.get|get|readPrivateInstallationFinalization|1|14|
|M017|N|tx / tx.put|put|finalizePrivateInstallation|1|42|
|M018|N|tx / tx.put|put|write|1|8|
|M018|N|tx / tx.get|get|readPrivateInstallationIntent|1|12|
|M019|B|reader / reader.read|read|work|1|28|
|M019|B|reader / reader.cancel|cancel|anonymous|1|34|
|M020|N|storage / storage.get|get|current|1|23|
|M020|N|storage / storage.transaction|transaction|anonymous|1|33|
|M020|N|tx / tx.get|get|check|1|34|
|M021|N|storage / storage.get|get|install|1|28|
|M021|B|reader / reader.read|read|install|2|32,38|
|M021|N|storage / storage.transaction|transaction|install|3|47,56,75|
|M021|N|tx / tx.get|get|callback:storage.transaction|4|48,57,59,75|
|M021|N|tx / tx.put|put|callback:storage.transaction|6|49,61,62,63,64,75|
|M022|N|tx / tx.get|get|stored|1|40|
|M022|N|storage / storage.transaction|transaction|fence|1|43|
|M022|N|tx / tx.get|get|callback:storage.transaction|8|43,43,71,79,79,84,…(+2)|
|M022|N|tx / tx.get|get|originalRecord|1|48|
|M022|N|tx / tx.get|get|originalProof|2|50,55|
|M022|N|tx / tx.get|get|anonymous|1|53|
|M022|N|storage / storage.transaction|transaction|activeOriginal|1|57|
|M022|N|storage / storage.get|get|finalOriginalFence|1|62|
|M022|N|storage / storage.transaction|transaction|appendOperatorObservation|1|71|
|M022|N|tx / tx.put|put|callback:storage.transaction|3|71,80,89|
|M022|N|storage / storage.transaction|transaction|readOperatorHistory|1|75|
|M022|N|storage / storage.transaction|transaction|register|1|78|
|M022|N|storage / storage.transaction|transaction|read|1|84|
|M022|N|storage / storage.transaction|transaction|readForClosure|1|87|
|M022|N|storage / storage.transaction|transaction|withdraw|1|89|
|M023|N|tx / tx.get|get|anonymous|1|25|
|M023|N|tx / tx.put|put|anonymous|1|25|
|M023|N|tx / tx.get|get|history|2|26,26|
|M023|N|storage / storage.transaction|transaction|confirmPrimary|1|35|
|M023|N|storage / storage.transaction|transaction|callback:run|11|36,43,67,75,87,90,…(+5)|
|M023|N|tx / tx.put|put|callback:storage.transaction|3|95,95,98|
|M024|N|tx / tx.get|get|owners|1|21|
|M024|N|tx / tx.get|get|history|1|22|
|M024|N|storage / storage.transaction|transaction|reserve|1|28|
|M024|N|tx / tx.get|get|callback:storage.transaction|1|30|
|M024|N|tx / tx.put|put|callback:storage.transaction|3|32,33,38|
|M024|N|storage / storage.transaction|transaction|read|1|36|
|M024|N|storage / storage.transaction|transaction|history|1|37|
|M024|N|storage / storage.transaction|transaction|withdraw|1|38|
|M025|N|tx / tx.get|get|checkpointOwnRevocation|1|12|
|M025|N|tx / tx.put|put|checkpointOwnRevocation|2|22,29|
|M026|B|reader / reader.cancel|cancel|cancel|1|19|
|M026|B|reader / reader.read|read|resolveProviderTokenName|1|21|
|M028|N|tx / tx.get|get|stored|3|70,71,71|
|M028|N|storage / storage.transaction|transaction|approve|1|77|
|M028|N|tx / tx.get|get|callback:storage.transaction|5|78,78,78,97,98|
|M028|N|tx / tx.put|put|callback:storage.transaction|3|83,85,99|
|M028|N|storage / storage.transaction|transaction|read|2|92,94|
|M028|N|storage / storage.transaction|transaction|revoke|1|96|
|M029|B|reader / reader.read|read|work|1|50|
|M029|B|reader / reader.cancel|cancel|anonymous|1|62|
|M032|N|db.prepare([literal]).bind(g.grantId,g.subject,g.clientId,g.projectId,g.resource,JSON.stringify(g.s…|run|createGrant|1|27|
|M032|N|db.prepare([literal]).bind(id) / db.prepare([literal]).bind(id).first|first|getGrant|1|32|
|M032|N|db.prepare([literal])         .bind(now,id,subject,clientId,resource,now) / db.prepare([literal])  …|first|consumeExchange|1|35|
|M032|N|db.prepare([literal]).bind(now) / db.prepare([literal]).bind(now).run|run|consumeRefresh|1|40|
|M032|N|db.prepare([literal])         .bind(tokenHash,grantId,subject,clientId,resource,now) / db.prepare([…|first|consumeRefresh|1|43|
|M032|N|db.prepare([literal]).bind() / db.prepare([literal]).bind().all|all|refreshSchemaReady|1|52|
|M032|N|db.prepare([literal]).bind(...values) / db.prepare([literal]).bind(...values).all|all|listGrants|1|59|
|M032|N|db.prepare([literal]).bind(now,id,subject) / db.prepare([literal]).bind(now,id,subject).run|run|revokeGrant|1|63|
|M032|N|db.prepare([literal]).bind(c.handleHash,c.subject,c.kind,c.projectId,c.clientId,c.resource,JSON.str…|run|createConsent|1|66|
|M032|N|db.prepare([literal]).bind(hash,subject,kind,now) / db.prepare([literal]).bind(hash,subject,kind,no…|first|getConsent|1|71|
|M032|N|db.prepare([literal]).bind(now,hash,subject,kind,now) / db.prepare([literal]).bind(now,hash,subject…|first|consumeConsent|1|74|
|M033|B|reader / reader.read|read|form|1|37|
|M033|B|reader / reader.cancel|cancel|form|1|37|
|M033|N|resourceServer / resourceServer.fetch|fetch|fetch|1|204|
|M033|N|authorizationServer / authorizationServer.fetch|fetch|fetch|4|206,221,228,231|
|M034|N|db.prepare([literal]).bind(subject) / db.prepare([literal]).bind(subject).all|all|listConsentProjects|1|36|
|M034|N|db.prepare(PROJECT_SQL).bind(projectId, subject) / db.prepare(PROJECT_SQL).bind(projectId, subject)…|first|getOwnedProject|1|40|
|M034|N|primary.prepare(ADMISSION_SQL).bind(projectId, subject, grantId, clientId, resource) / primary.prep…|first|getProjectReadAdmission|1|58|
|M034|N|db.prepare(OBSERVATIONS_SQL).bind(projectId, subject, origin) / db.prepare(OBSERVATIONS_SQL).bind(p…|all|listCurrentObservations|1|69|
|M035|N|db.prepare([literal]).bind(p.grantId) / db.prepare([literal]).bind(p.grantId).first|first|callback:safe|1|50|
|M036|N|db.prepare([literal]).bind(o.grantId,o.requestId,o.projectId,o.subject) / db.prepare([literal]).bin…|first|recover|1|40|
|M036|N|db.prepare([literal]p.revision=? AND g.revoked_at=[literal] AND g.expires_at>? AND g.expires_at>=? …|run|recordDossierMonitoringConsent|1|45|
|M036|N|primary(db).prepare(query).bind(ctx.grantId,ctx.subject,ctx.clientId,projectId,ctx.resource) / prim…|first|read|1|75|
|M037|B|reader / reader.read|read|handleForm|1|22|
|M037|B|reader / reader.cancel|cancel|handleForm|1|22|
|M037|N|primary().prepare([literal]).bind(p.grantId,subject,p.projectId,p.clientId,p.resource) / primary().…|first|owned|1|45|
|M037|N|primary().prepare([literal]).bind(hash(handle),randomUUID(),subject,p.grantId,p.projectId,p.clientI…|run|anonymous|1|61|
|M037|N|primary().prepare([literal]).bind(hash(handle),subject,p.grantId,p.projectId,p.clientId,p.resource,…|first|anonymous|1|69|
|M038|N|db.prepare([literal]).bind(signal.eventId,signal.projectRef,signal.revision,signal.kind,signal.obse…|run|recordDossierEvent|1|22|
|M038|N|db.prepare([literal]).bind(signal.eventId) / db.prepare([literal]).bind(signal.eventId).first|first|recordDossierEvent|1|23|
|M038|N|db.prepare([literal]).bind(...(allowedRefs\|\|[])) / db.prepare([literal]).bind(...(allowedRefs\|\|…|all|listDossierSignals|1|29|
|M038|N|db.prepare([literal]).bind(requestId) / db.prepare([literal]).bind(requestId).first|first|claimDossierSignal|2|35,44|
|M038|N|db.prepare([literal]).bind(runId,requestId,eventId,now,expires,eventId,now,eventId,...(sharedBudget…|run|claimDossierSignal|1|38|
|M038|N|db.prepare([literal]).bind(outcome,now,runId,now) / db.prepare([literal]).bind(outcome,now,runId,no…|run|finishDossierSignal|1|49|
|M038|N|db.prepare([literal]).bind(runId) / db.prepare([literal]).bind(runId).first|first|finishDossierSignal|1|50|
|M039|N|primary.prepare([literal]).bind(p.artifactKey) / primary.prepare([literal]).bind(p.artifactKey).fir…|first|work|1|26|
|M039|N|primary.prepare([literal]).bind(p.activationKey,p.artifactKey,p.trialId,p.scopeHash,p.configuration…|run|work|1|30|
|M039|N|primary.prepare([literal]+sqlNow+[literal]+sqlNow+[literal]+sqlNow+[literal]).bind(p.activationKey,…|run|work|1|35|
|M039|N|primary.prepare([literal]+sqlNow+[literal]+sqlNow+[literal]+sqlNow+[literal]).bind(p.activationKey,…|run|work|1|39|
|M040|B|stream / stream.read|read|read|1|49|
|M040|B|stream / stream.cancel|cancel|anonymous|1|55|
|M042|B|reader / reader.read|read|work|1|98|
|M042|B|r.body / r.body?.cancel|cancel|work|1|104|
|M042|B|reader / reader.cancel|cancel|run|1|108|
|M043|B|stream / stream.read|read|request|1|38|
|M043|B|stream / stream.cancel|cancel|anonymous|1|49|
|M044|N|storage / transaction|transaction|tx|1|101|
|M044|B|response.body / response.body?.cancel|cancel|cancel|1|102|
|M044|B|reader / reader.read|read|work|1|116|
|M044|B|reader / reader.cancel|cancel|read|1|125|
|M047|N|storage / transaction|transaction|tx|1|108|
|M047|B|response.body / response.body?.cancel|cancel|fetchGuarded|1|143|
|M047|N|storage / transaction|transaction|anonymous|1|146|
|M047|N|storage / transaction|transaction|journal|1|160|
|M049|B|reader / reader.cancel|cancel|cancel|1|70|
|M049|B|reader / reader.read|read|readBody|1|71|
|M049|B|reader / reader.cancel|cancel|readBody|1|72|
|M049|N| / fetcher|fetch|exchange|1|89|
|M050|N|db().prepare([literal]).bind(ctx.grantId) / db().prepare([literal]).bind(ctx.grantId).first|first|current|1|31|
|M050|N|tx / tx.put|put|save|1|33|
|M050|N|tx / tx.get|get|read|1|35|
|M050|N|db().prepare([literal]).bind(ctx.grantId,[literal]) / db().prepare([literal]).bind(ctx.grantId,[lit…|first|consent|1|42|
|M050|N|statement / statement.run|run|claim|1|58|
|M050|N|db().prepare([literal]+sqlNow+[literal]).bind(ctx.grantId) / db().prepare([literal]+sqlNow+[literal…|first|originalAdmission|1|67|
|M050|N|o.storage / o.storage.transaction|transaction|readyState|2|79,80|
|M050|N|o.storage / o.storage.transaction|transaction|preflightAdmission|2|89,98|
|M050|N|o.storage / o.storage.transaction|transaction|callback:nominalLease.run|3|130,143,148|
|M050|N|o.storage / o.storage.transaction|transaction|callback:nominalLease.exit|1|152|
|M050|N|o.storage / o.storage.transaction|transaction|callback:invokeRuntime|3|163,168,198|
|M050|N|db().prepare([literal]).bind(ctx.grantId,o.projectId,ctx.subject,ctx.clientId,ctx.resource) / db().…|first|query|1|164|
|M050|N|db().prepare(sql).bind(...parameters) / db().prepare(sql).bind(...parameters).run|run|callback:invokeRuntime|1|195|
|M050|N|db().prepare([literal]).bind(ctx.grantId) / db().prepare([literal]).bind(ctx.grantId).first|first|callback:invokeRuntime|1|196|
|M051|B|reader / reader.cancel|cancel|cancel|1|16|
|M051|B|reader / reader.read|read|packet|1|17|
|M051|B|reader / reader.cancel|cancel|packet|1|18|
|M051|N|container.getTcpPort(8080) / container.getTcpPort(8080).fetch|fetch|callback:bounded|1|58|
|M052|N|db().prepare([literal]).bind(context.grantId) / db().prepare([literal]).bind(context.grantId).first|first|isClosed|1|43|
|M052|N|container.getTcpPort(8080) / container.getTcpPort(8080).fetch|fetch|anonymous|1|50|
|M052|N|db().prepare([literal]).bind(context.grantId,o.projectId,context.subject,context.clientId,context.r…|first|read|1|89|
|M052|N|db().prepare(ownSubscriptionReceiptEligibilitySql).bind(context.grantId,context.subject,o.projectId…|first|read|1|103|
|M052|N|db().prepare([literal]).bind(context.grantId,o.projectId,context.subject,context.clientId,context.r…|first|callback:safe|1|110|
|M055|N|storage / storage.transaction|transaction|anonymous|1|23|
|M055|N|tx / tx.get|get|anonymous|1|23|
|M055|N|tx / tx.put|put|anonymous|1|23|
|M056|N|storage / storage.transaction|transaction|work|1|90|
|M056|N|tx / tx.get|get|callback:storage.transaction|1|90|
|M056|N|tx / tx.put|put|callback:storage.transaction|1|90|
|M057|N|d.prepare(sql).bind(...args) / d.prepare(sql).bind(...args).all|all|rows|1|21|
|M057|N|db.withSession([literal]).prepare(query).bind(...q.params,s.grantId,r.containerId,p.trialId,r.conta…|all|assertPrepared|1|83|
|M058|N|storage / storage.get|get|observed|1|27|
|M058|N|storage / storage.transaction|transaction|work|2|40,45|
|M058|N|tx / tx.get|get|callback:storage.transaction|2|40,45|
|M058|N|tx / tx.put|put|callback:storage.transaction|2|40,45|
|M058|N|storage / storage.get|get|work|1|46|
|M059|N|primary().prepare(query).bind(...pins) / primary().prepare(query).bind(...pins).first|first|callback:bounded|1|102|
|M059|N|primary().prepare([literal])      .bind(at, ...pins, window.startAt, current.expiresAt) / primary()…|run|callback:bounded|1|163|
|M061|N|db().prepare([literal]).bind() / db().prepare([literal]).bind().first|first|preflight|2|50,51|
|M061|N|db().prepare([literal]).bind(ctx.grantId) / db().prepare([literal]).bind(ctx.grantId).first|first|preflight|1|53|
|M061|N|db().prepare(sql).bind(r.id,observedAt,expiresAt,ctx.grantId,ctx.subject,o.projectId,ctx.clientId,c…|run|record|1|72|
|M063|N|primary.prepare([literal]+columns.join([literal])+[literal]).bind(SLOT) / primary.prepare([literal]…|first|readReservation|1|31|
|M065|B|reader / reader.read|read|form|1|10|
|M065|B|reader / reader.cancel|cancel|form|1|10|
|M065|N|db.prepare([literal]).bind(o.projectId,o.context.subject) / db.prepare([literal]).bind(o.projectId,…|first|anonymous|1|26|
|M066|N|db.prepare(ownSubscriptionReceiptEligibilitySql).bind(...pins) / db.prepare(ownSubscriptionReceiptE…|first|current|1|29|
|M066|N|db.prepare(query).bind(eventId,o.projectId,c.subject) / db.prepare(query).bind(eventId,o.projectId,…|first|saveOwnSyntheticGoal|2|34,45|
|M066|N|db.prepare([literal]).bind() / db.prepare([literal]).bind().first|first|saveOwnSyntheticGoal|1|38|
|M066|N|db / db.batch|batch|saveOwnSyntheticGoal|1|44|
|M067|B|stream / stream.read|read|get|1|22|
|M067|B|stream / stream.cancel|cancel|anonymous|1|33|
|M068|N|db.withSession([literal]).prepare([literal]).bind(artifactKey,a.activationKey) / db.withSession([li…|first|createPublicationDeploymentReader|1|20|
|M069|N|primary.prepare([literal]).bind(artifactKey,accountId,workerName,a.sourceRevision,a.sourceTree,a.pr…|run|work|1|27|
|M069|N|primary.prepare([literal]).bind(artifactKey,versionId,etag,confirmedAt) / primary.prepare([literal]…|run|work|1|34|
|M071|N| / fetcher|fetch|callback:Promise.resolve().then|1|37|
|M071|B|reader / reader.read|read|callback:Promise.resolve().then|1|41|
|M071|B|reader / reader.cancel|cancel|callback:Promise.resolve().then|1|44|
|M071|B|r.body / r.body.cancel|cancel|callback:Promise.resolve().then|1|44|
|M073|N|storage / storage.get|get|readFiniteCleanupControl|4|11,13,18,20|
|M073|N|storage / storage.get|get|read|2|36,37|
|M073|N|storage / storage.transaction|transaction|work|2|48,52|
|M073|N|tx / tx.get|get|callback:storage.transaction|5|48,52,52,82,82|
|M073|N|tx / tx.put|put|callback:storage.transaction|3|48,52,82|
|M073|N|storage / storage.get|get|completion|3|60,65,65|
|M073|N|storage / storage.get|get|retainCompletion|1|74|
|M073|N|storage / storage.transaction|transaction|retainCompletion|1|82|
|M073|N|storage / storage.get|get|readRetainedFiniteCleanupProof|1|93|
|M075|N| / fetcher|fetch|anonymous|1|43|
|M075|B|reader / reader.read|read|anonymous|1|49|
|M075|B|reader / reader.cancel|cancel|anonymous|1|53|
|M075|B|response.body / response.body.cancel|cancel|anonymous|1|53|
|M076|N| / fetcher|fetch|callback:child|1|210|
|M076|B|reader / reader.read|read|callback:child|1|213|
|M076|B|reader / reader.cancel|cancel|callback:child|1|219|
|M076|B|response.body / response.body.cancel|cancel|callback:child|1|219|
|M076|N|storage / transaction|transaction|callback:child|1|226|
|M076|N|tx / tx.get|get|anonymous|1|228|
|M076|N|bound / all|all|callback:child|1|237|
|M077|N|storage / get|get|callback:parent.child|1|42|
|M077|N|storage / list|list|callback:parent.child|2|47,48|
|M077|N|storage / getAlarm|getAlarm|callback:parent.child|2|63,116|
|M077|N|storage / transaction|transaction|transact|1|102|
|M077|N|tx / tg|tg|r|1|106|
|M077|N|tx / tp|tp|put|1|107|
|M077|N|tx / td|td|anonymous|1|109|
|M077|N|tx / ta|ta|anonymous|1|109|
|M077|N|storage / sync|sync|durable|1|112|
|M077|N|storage / get|get|durable|1|112|
|M077|N|tx / tx.put|put|callback:transact|3|114,119,182|
|M077|N| / fetcher|fetch|http|1|123|
|M077|B|stream / stream.read|read|http|1|129|
|M077|B|stream / stream.cancel|cancel|http|1|131|
|M077|B|response.body / response.body.cancel|cancel|http|1|131|
|M078|N| / fetcher|fetch|anonymous|1|38|
|M078|B|stream / stream.read|read|anonymous|1|42|
|M078|B|stream / stream.cancel|cancel|anonymous|1|49|
|M078|B|response.body / response.body.cancel|cancel|anonymous|1|49|
|M079|N| / fetcher|fetch|anonymous|2|79,238|
|M079|B|reader / reader.read|read|anonymous|2|83,243|
|M079|B|reader / reader.cancel|cancel|anonymous|2|85,245|
|M079|B|response.body / response.body.cancel|cancel|anonymous|2|85,245|
|M079|N|storage / transaction|transaction|callback:parent.child|4|104,264,405,416|
|M079|N|tx / tg|tg|anonymous|2|106,108|
|M079|N|tx / tp|tp|anonymous|1|109|
|M079|N|storage / sync|sync|callback:parent.child|5|112,118,282,412,423|
|M079|N|storage / get|get|callback:parent.child|11|113,128,129,130,132,283,…(+5)|
|M079|N|storage / getAlarm|getAlarm|callback:parent.child|5|131,285,403,414,424|
|M079|N|storage / list|list|callback:parent.child|2|133,404|
|M079|N|storage / transaction|transaction|append|2|222,335|
|M079|N|tx / getTx|getTx|read|1|225|
|M079|N|tx / putTx|putTx|anonymous|2|230,280|
|M079|N|storage / sync|sync|append|1|232|
|M079|N|storage / get|get|append|1|233|
|M079|N|storage / getAlarm|getAlarm|append|1|233|
|M079|N|tx / readTx|readTx|read|1|267|
|M079|N| / fetcher|fetch|http|1|309|
|M079|B|stream / stream.read|read|http|1|316|
|M079|B|stream / stream.cancel|cancel|http|1|318|
|M079|B|response.body / response.body.cancel|cancel|http|1|318|
|M079|N|tx / write|write|anonymous|3|339,409,421|
|M079|N|storage / sync|sync|durable|1|345|
|M079|N|storage / get|get|durable|1|346|
|M079|N|tx / alarm|alarm|anonymous|1|410|
|M080|N|statement / all|all|callback:Promise.resolve().then|1|29|
|M082|N|storage / get|get|read|1|16|
|M082|N|storage / transaction|transaction|tx|1|17|
|M083|N| / fetcher|fetch|callback:child|1|45|
|M083|B|reader / reader.read|read|callback:child|1|48|
|M083|B|reader / reader.cancel|cancel|callback:child|1|52|
|M083|B|response.body / response.body.cancel|cancel|callback:child|1|52|
|M084|N| / fetcher|fetch|callback:Promise.resolve().then|1|23|
|M084|B|reader / reader.read|read|callback:Promise.resolve().then|1|27|
|M084|B|reader / reader.cancel|cancel|callback:Promise.resolve().then|1|42|
|M084|B|response.body / response.body.cancel|cancel|callback:Promise.resolve().then|1|42|
|M085|N|storage / get|get|callback:child|1|63|
|M085|N|storage / list|list|callback:child|1|64|
|M085|N| / fetcher|fetch|callback:child|1|70|
|M085|B|stream / stream.read|read|callback:child|1|76|
|M085|B|stream / stream.cancel|cancel|callback:child|1|79|
|M085|B|response.body / response.body.cancel|cancel|callback:child|1|79|
|M085|N|storage / getAlarm|getAlarm|callback:child|1|93|
|M087|N|tx / tx.list|list|list|1|77|
|M087|N|tx / tx.getAlarm|getAlarm|callback:transaction.call|1|79|
|M087|N|tx / tx.put|put|callback:transaction.call|1|82|
|M089|N|ctx.storage / ctx.storage.get|get|read|1|61|
|M091|N|storage / list|list|inventory|1|9|
|M091|N|c.storage / c.transaction|transaction|append|1|38|
|M091|N|tx / get|get|anonymous|1|50|
|M091|N|tx / put|put|anonymous|1|52|
|M091|N|c.storage / c.sync|sync|append|1|54|
|M091|N|c.storage / c.get|get|append|1|55|
|M092|N|alias / methods[q.method]|dynamic|callback:Promise.resolve().then|2|55,614|
|M092|N|storage / list|list|callback:child|3|166,168,172|
|M092|N|storage / get|get|callback:child|2|171,660|
|M092|N| / fetcher|fetch|callback:child|2|178,664|
|M092|B|stream / stream.read|read|callback:child|2|184,668|
|M092|B|stream / stream.cancel|cancel|callback:child|2|187,671|
|M092|B|response.body / response.body.cancel|cancel|callback:child|2|187,671|
|M092|N|bound / first|first|callback:child|1|194|
|M092|N|bound / all|all|callback:child|1|202|
|M093|N|storage / list|list|inventory|1|11|
|M093|N|c.storage / c.transaction|transaction|append|1|43|
|M093|N|tx / get|get|anonymous|1|47|
|M093|N|tx / put|put|anonymous|1|64|
|M093|N|c.storage / c.sync|sync|append|1|66|
|M093|N|c.storage / c.get|get|append|1|67|
|M095|B|reader / reader.read|read|finiteNativeBytes|1|47|
|M095|B|reader / reader.cancel|cancel|finiteNativeBytes|1|49|
|M095|B|message.body / message.body?.cancel|cancel|finiteNativeCancel|1|52|
|M096|B|reader / reader.read|read|readFiniteOwnerNoticeConsentBody|1|10|
|M096|B|reader / reader.cancel|cancel|readFiniteOwnerNoticeConsentBody|1|16|
|M097|B|response.body / response.body.cancel|cancel|callback:finiteNativeOperation|1|37|
|M101|N|storage / get|get|callback:child|1|104|
|M101|N|storage / list|list|callback:child|1|105|
|M101|N| / fetcher|fetch|callback:child|1|111|
|M101|B|stream / stream.read|read|callback:child|1|117|
|M101|B|stream / stream.cancel|cancel|callback:child|1|120|
|M101|B|response.body / response.body.cancel|cancel|callback:child|1|120|
|M101|N|bound / first|first|callback:child|1|127|
|M101|N|bound / all|all|callback:child|1|135|
|M101|N|storage / native.sync|sync|callback:wait|1|577|
|M101|N|issuerCapture.storage / issuerCapture.sync|sync|anonymous|1|1080|
|M102|B|reader / reader.read|read|callback:child|1|117|
|M102|B|reader / reader.cancel|cancel|callback:child|1|120|
|M102|N|c.primary().prepare([literal]).bind(authorizationHash,c.identity.subject,[literal]) / c.primary().p…|first|callback:c.step|1|282|
|M102|N|c.primary().prepare([literal]).bind(requestId,sequence,grantId,c.identity.subject) / c.primary().pr…|first|callback:c.step|1|348|
|M102|N|c.primary().prepare([literal]).bind(sha(handle),requestId) / c.primary().prepare([literal]).bind(sh…|first|callback:c.step|1|366|
|M102|N|c.primary().prepare([literal]).bind(noticeLink.sequence,grant.grantId,c.identity.subject) / c.prima…|first|callback:c.step|1|403|
|M103|N|storage / storage.transaction|transaction|transact|1|26|
|M103|N|tx / tx.get|get|raw|1|29|
|M103|N|tx / tx.put|put|head|1|30|
|M103|N|tx / tx.get|get|get|1|31|
|M103|N|tx / tx.put|put|put|1|32|
|M104|N|storage / storage.get|get|callback:parent.child|1|109|
|M107|N|storage / transaction|transaction|append|1|55|
|M107|N|tx / tg|tg|read|1|59|
|M107|N|tx / tp|tp|anonymous|1|69|
|M108|N|tx / listing|listing|readAll|1|31|
|M108|N|c.storage / c.transaction|transaction|append|1|51|
|M108|N|tx / tg|tg|anonymous|1|62|
|M108|N|tx / tp|tp|anonymous|1|64|
|M108|N|c.storage / c.sync|sync|append|1|66|
|M108|N|c.storage / c.get|get|append|1|67|
|M110|N|tx / listing|listing|readAll|1|36|
|M110|N|c.storage / c.transaction|transaction|append|1|49|
|M110|N|tx / tg|tg|anonymous|1|53|
|M110|N|tx / tp|tp|anonymous|1|63|
|M110|N|c.storage / c.sync|sync|append|1|65|
|M110|N|c.storage / c.get|get|append|1|66|
|M111|N|storage / storage.transaction|transaction|transaction|1|27|
|M111|N|tx / tx.get|get|get|2|30,214|
|M111|N|tx / tx.put|put|put|1|31|
|M111|N|tx / tx.get|get|head|2|32,214|
|M111|N|tx / tx.put|put|setHead|1|33|
|M111|N|tx / tx.get|get|witness|1|34|
|M111|N|tx / tx.put|put|putWitness|1|35|
|M111|N|storage / storage.get|get|readWitness|1|55|
|M111|N|storage / storage.get|get|readRecord|1|64|
|M111|N|storage / storage.transaction|transaction|readSelected|1|212|
|M111|N|storage / storage.get|get|readContext|1|220|
|M112|B|reader / reader.read|read|work|1|28|
|M112|B|reader / reader.cancel|cancel|request|1|35|
|M114|N|storage / methods.transaction|transaction|callback:bounded|1|256|
|M114|N|storage / methods.get|get|callback:bounded|1|279|
|M114|N|storage / methods.getAlarm|getAlarm|callback:bounded|1|280|
|M114|N|storage / methods.transaction|transaction|work|1|419|
|M114|N|tx / getMethod|getMethod|get|1|422|
|M114|N|tx / listMethod|listMethod|list|1|423|
|M114|N|tx / alarmMethod|alarmMethod|anonymous|1|425|
|M115|N|tx / tx.get|get|callback:transaction.call|1|53|
|M115|N|storage / storage.get|get|runEffect|1|58|
|M115|N|storage / storage.transaction|transaction|runEffect|2|67,76|
|M115|N|tx / tx.get|get|callback:storage.transaction|2|67,76|
|M115|N|tx / tx.put|put|callback:storage.transaction|2|67,76|
|M115|N|tx / tx.put|put|callback:transact|3|82,97,110|
|M115|N|tx / tx.setAlarm|setAlarm|callback:transact|3|82,94,97|
|M115|N|storage / storage.getAlarm|getAlarm|callback:serial|1|83|
|M115|N|tx / tx.deleteAlarm|deleteAlarm|callback:transact|2|97,110|
|M115|N|ctx.storage / ctx.storage.get|get|runPrivateQaFiniteTrialAlarm|1|122|
|M115|N|ctx.storage / ctx.storage.get|get|readPrivateQaFiniteNominalControl|1|134|
|M116|N|bound / first|first|work|1|41|
|M117|N|storage / transaction|transaction|readPrivateQaStoredGenerationSnapshot|1|116|
|M117|N|storage / transaction|transaction|tx|1|163|
|M117|N|storage / transaction|transaction|work|1|234|
|M118|N|storage / transaction|transaction|snapshot|1|73|
|M118|B|createPrivateQaGenerationDraftReader({db:qa,now:current,timeoutMs:remaining()}) / createPrivateQaGe…|read|readDraft|1|80|
|M118|B|createPrivateQaOriginalPinsReader({db:dossier,original:material.original,window,authorize,now:curre…|read|callback:bounded|1|85|
|M119|N|storage / transaction|transaction|work|1|42|
|M120|N|bound / first|first|work|1|55|
|M121|N|bound / first|first|work|1|44|
|M122|N|bound / first|first|work|1|41|
|M123|N|storage / transaction|transaction|primary|1|60|
|M123|B|createPrivateQaNamedPacketReader({db,now:current,timeoutMs:remaining}) / createPrivateQaNamedPacket…|read|work|1|64|
|M124|N|bound / first|first|work|1|41|
|M125|N| / fetch|fetch|fetchImpl|1|70|
|M125|N|db.withSession([literal]).prepare([literal]).bind(policy.plan.artifactKey) / db.withSession([litera…|first|runReleaseOperatorImpl|1|78|
|M125|N| / fetch|fetch|anonymous|1|133|
|M125|N|bound / all|all|read|1|226|
|M127|N|o.storage / o.storage.transaction|transaction|anonymous|1|10|
|M127|N|tx / tx.get|get|anonymous|1|10|
|M128|B|reader / reader.read|read|work|1|26|
|M128|B|r.body / r.body?.cancel|cancel|work|1|31|
|M128|B|reader / reader.cancel|cancel|anonymous|1|33|
|M129|N|db().prepare(query).bind(eventId,o.projectId,context.subject,context.subject) / db().prepare(query)…|first|read|1|19|
|M131|N|tx / tx.put|put|saveBudget|1|53|
|M131|N|tx / tx.get|get|readBudget|1|55|
|M131|N|tx / tx.put|put|save|1|60|
|M131|N|tx / tx.get|get|read|1|62|
|M131|N|tx / tx.put|put|saveTransport|1|92|
|M131|N|tx / tx.get|get|readTransport|1|94|
|M131|N|storage / storage.transaction|transaction|sendOnce|5|113,121,122,125,132|
|M131|N|tx / tx.get|get|callback:storage.transaction|1|114|
|M131|N|storage / storage.transaction|transaction|liveReceipt|1|136|
|M131|N|storage / storage.transaction|transaction|callback:safe|11|145,157,169,172,177,183,…(+5)|
|M132|N|storage / transaction|transaction|transact|1|109|
|M132|N|tx / tx.get|get|anonymous|1|109|
|M132|N|tx / tx.put|put|callback:transact|2|153,160|
|M133|B|reader / reader.read|read|get|1|23|
|M133|B|reader / reader.cancel|cancel|anonymous|1|35|
|M134|N|primary.prepare(sql).bind(c.trialId,c.scopeHash,o.applicationId,o.containerId,e.processGeneration,o…|run|work|1|35|
|M134|N|finalPrimary.prepare([literal]).bind(ctx.grantId) / finalPrimary.prepare([literal]).bind(ctx.grantI…|first|work|1|37|
|M135|N|primary.prepare(sql).bind(...values,o.containerId,e.processGeneration,o.programHash,o.sourceRevisio…|run|work|1|32|
|M136|N|storage / transaction|transaction|transact|1|53|
|M136|N|tx / tx.get|get|anonymous|1|55|
|M136|N|tx / tx.put|put|callback:transact|1|81|
|M137|B|reader / reader.read|read|readOperationsServicePayload|1|30|
|M137|B|reader / reader.cancel|cancel|readOperationsServicePayload|1|42|
|M138|B|reader / reader.cancel|cancel|abort|1|694|
|M138|B|reader / reader.read|read|anonymous|1|698|
|M138|B|response.body / response.body?.cancel|cancel|readJsonWithSizeLimit$1|1|706|
|M138|B|reader / reader.cancel|cancel|readJsonWithSizeLimit$1|1|720|
|M138|N| / fetch|fetch|fetchCimdOrigin|1|751|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.get|get|markUsed|1|1009|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.put|put|markUsed|1|1013|
|M138|N| / fetch|fetch|fetch|1|1039|
|M138|B|reader / reader.read|read|readJsonWithSizeLimit|1|1081|
|M138|B|reader / reader.cancel|cancel|readJsonWithSizeLimit|1|1085|
|M138|N|new handler(context, env) / new handler(context, env).fetch|fetch|fetch|1|1678|
|M138|N|handler / handler.fetch|fetch|fetch|1|1678|
|M138|N|kv / kv.put|put|createTransaction|1|1999|
|M138|N|kv / kv.get|get|openTransaction|1|2014|
|M138|N|kv / kv.delete|delete|anonymous|1|2031|
|M138|N|this.#impl / this.#impl.fetch|fetch|fetch|1|2206|
|M138|N|defaultHandler.handler / defaultHandler.handler.fetch|fetch|fetchForRoles|1|2630|
|M138|N|new defaultHandler.handler(ctx, env) / new defaultHandler.handler(ctx, env).fetch|fetch|fetchForRoles|1|2631|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.get|get|unwrapToken|1|2644|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.get|get|handleAuthorizationCodeGrant|1|3126|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.get|get|handleRefreshTokenGrant|1|3312|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.put|put|handleRefreshTokenGrant|1|3444|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.get|get|exchangeToken|2|3487,3533|
|M138|N|jwksProvider / jwksProvider.fetch|fetch|verifyAssertionSignature|2|3804,3811|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.get|get|revokeAccessIfOwned|2|3900,3905|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.get|get|revokeRefreshIfOwned|1|3911|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.delete|delete|revokeSpecificAccessToken|1|3927|
|M138|B|callbackRequest.body / callbackRequest.body?.cancel|cancel|handleClientRegistration|1|3963|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.get|get|handleApiRequest|1|4119|
|M138|N|apiHandler.handler / apiHandler.handler.fetch|fetch|handleApiRequest|1|4219|
|M138|N|new apiHandler.handler(ctx, env) / new apiHandler.handler(ctx, env).fetch|fetch|handleApiRequest|1|4220|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.put|put|saveGrantWithTTL|1|4242|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.put|put|putRegisteredClient|2|4291,4294|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.get|get|renewClientRegistrationIfDue|1|4320|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.get|get|getClient|2|4330,4341|
|M138|N|env.OAUTH_KV / env.OAUTH_KV.put|put|createAccessToken|1|4511|
|M138|B|reader / reader.read|read|readTextWithLimit|1|4735|
|M138|B|reader / reader.cancel|cancel|readTextWithLimit|1|4739|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.put|put|completeAuthorization|1|5243|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.list|list|findGrants|1|5279|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.get|get|callback:batch.map|1|5299|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.put|put|createClient|1|5354|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.list|list|listClients|1|5368|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.put|put|updateClient|1|5419|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.delete|delete|deleteClient|1|5431|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.list|list|listUserGrants|2|5447,5450|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.get|get|callback:ownKeys.map|1|5458|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.list|list|revokeGrant|1|5524|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.delete|delete|callback:result.keys.map|1|5526|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.delete|delete|revokeGrant|1|5531|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.list|list|purgeExpiredData|2|5580,5620|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.get|get|purgeExpiredData|4|5584,5590,5624,5630|
|M138|N|this.env.OAUTH_KV / this.env.OAUTH_KV.delete|delete|purgeExpiredData|2|5628,5633|
|M140|B|reader / reader.read|read|anonymous|1|1004|
|M140|B|reader / reader.cancel|cancel|anonymous|1|1018|
|M143|B|reader / reader.read|read|pull|1|148|
|M143|B|reader / reader.cancel|cancel|cancel|1|162|
|M143|B|reader / reader.read|read|callback:runWithAuthContext|1|220|
|M143|B|reader / reader.cancel|cancel|callback:runWithAuthContext|1|229|
|M143|N|legacyCompatibilityHandler / legacyCompatibilityHandler.fetch|fetch|invoke|1|299|
|M143|N|sdkHandler / sdkHandler.fetch|fetch|invoke|1|300|
|M145|B|reader / reader.read|read|compress|1|25|
|M145|B|reader / reader.read|read|decompress|1|42|
|M157|N|ctx.refs / ctx.refs.get|get|convertBaseSchema|1|141|
|M157|N|ctx.refs / ctx.refs.get|get|callback:z.lazy|1|149|
|M157|N|ctx.processing / ctx.processing.delete|delete|convertBaseSchema|1|156|
|M161|N|ctx.seen / ctx.seen.get|get|nullableProcessor|1|444|
|M161|N|ctx.seen / ctx.seen.get|get|nonoptionalProcessor|1|456|
|M161|N|ctx.seen / ctx.seen.get|get|defaultProcessor|1|462|
|M161|N|ctx.seen / ctx.seen.get|get|prefaultProcessor|1|469|
|M161|N|ctx.seen / ctx.seen.get|get|catchProcessor|1|477|
|M161|N|ctx.seen / ctx.seen.get|get|pipeProcessor|1|493|
|M161|N|ctx.seen / ctx.seen.get|get|readonlyProcessor|1|499|
|M161|N|ctx.seen / ctx.seen.get|get|promiseProcessor|1|506|
|M161|N|ctx.seen / ctx.seen.get|get|optionalProcessor|1|512|
|M161|N|ctx.seen / ctx.seen.get|get|lazyProcessor|1|518|
|M165|N|ctx.seen / ctx.seen.get|get|process|3|35,76,93|
|M165|N|ctx.metadataRegistry / ctx.metadataRegistry.get|get|process|1|80|
|M165|N|ctx.seen / ctx.seen.get|get|extractDefs|1|100|
|M165|N|ctx.metadataRegistry / ctx.metadataRegistry.get|get|extractDefs|2|106,194|
|M165|N|ctx.external.registry / ctx.external.registry.get|get|makeURI|1|124|
|M165|N|ctx.external.registry / ctx.external.registry.get|get|extractDefs|1|187|
|M165|N|ctx.seen / ctx.seen.get|get|finalize|1|216|
|M165|N|ctx.seen / ctx.seen.get|get|flattenRef|3|221,231,273|
|M165|N|ctx.external.registry / ctx.external.registry.get|get|finalize|1|315|
|M165|N|ctx.metadataRegistry / ctx.metadataRegistry.get|get|finalize|1|325|
|M167|B|reader / reader.read|read|readJson|1|117|
|M167|B|reader / reader.cancel|cancel|checkOwnCronProvider|1|136|
|M168|N|factory({ctx:this.ctx,env:this.env}) / factory({ctx:this.ctx,env:this.env}).fetch|fetch|fetch|1|30|
|M168|N|super / super.fetch|fetch|fetch|1|33|
|M169|N|storage / storage.get|get|checkpoint|2|103,106|
|M169|N|storage / storage.get|get|#reservation|4|115,115,120,130|
|M169|N|this.challenge / this.challenge.fetch|fetch|fetch|1|151|
|M169|B|this.reader / this.reader.read|read|read|1|179|
|M169|N|env.AFW_QA_PREREGISTRY.get(env.AFW_QA_PREREGISTRY.idFromName([literal])) / env.AFW_QA_PREREGISTRY.g…|fetch|fetch|1|240|
|M171|N|worker / worker.fetch|fetch|fetch|1|21|
|M172|N|createDelegatedOAuthWorker({   issuer:env.AFW_OAUTH_ISSUER,resource:env.AFW_OAUTH_RESOURCE,   event…|fetch|callback:observeMcpDiscoveryRequest|1|100|

## Unresolved modules and bounded examples

All98modules with unresolved calls are listed. Examples are source/lexical questions, not proof of native I/O. No authorization or final GREEN is inferred.

|Module ID|Unresolved calls|Example prepared callsite(s)|Required disposition|
|---|---:|---|---|
|M001|6|firstJournal({storage:s,identity:identity([literal]),now:Date.no….read L199 ×2; currentValues.get L266 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M003|3|catalog.read L24 ×2; primary.read L27 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M005|2|catalog.read L24 ×1; insert.run L46 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M009|4|routes.get L43 ×1; catalog.read L55 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M011|2|preregistration.read L15 ×2|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M012|1|keys.get L28 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M016|1|primary.batch L48 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M020|5|catalog.read L38 ×3; primary.read L39 ×2|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M021|5|primary.read L36 ×3; p.read L103 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M022|4|createPrivateExecutionCorrelation({readPins:async()=>{c.checked(….read L54 ×1; rows.get L64 ×3|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M023|2|c.read L42 ×2|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M027|1|catalog.read L28 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M031|1|authority.list L21 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M033|4|body.get L217 ×2; preservedPreparationRequests.get L275 ×2|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M035|1|namespace.get L41 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M037|1|preservedPreparationRequests.get L73 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M041|1|resolver.cancel L40 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M042|1|allowed.get L38 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M044|4|t.get L101 ×1; t.put L131 ×2|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M045|1|authority.list L23 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M047|10|t.get L100 ×1; t.list L102 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M048|4|state.tx.get L10 ×1; state.tx.put L11 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M050|4|finiteGate.read L89 ×2; nominalLease.run L113 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M053|1|binding.get L48 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M054|9|t.get L58 ×1; t.put L69 ×3|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M055|3|reductions().read L35 ×1; hosts.get L49 ×2|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M056|4|gate.read L66 ×2; gate.read L74 ×2|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M057|1|admissionSources.get L96 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M062|1|namespace.get L32 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M064|2|c.pins.AFW_DOSSIER_EVENTS_NODE.get L25 ×1; c.pins.AFW_DOSSIER_EVENTS_NODE.get L29 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M065|2|p.get L10 ×2|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M070|1|ns.get L57 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M073|3|createPrivateQaFiniteCleanupStore({storage,control:c}).read L88 ×1; createPrivateQaFiniteCleanupStore({storage,control:c}).read L94 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M074|1|seen.delete L31 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M076|1|/^Finite historical source unavailable:(input\|custody\|http\|me….exec L250 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M079|8|journals.get L135 ×3; tx.read L338 ×5|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M081|1|pendingWork.delete L9 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M082|17|t.tg L20 ×1; t.tp L20 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M085|1|cleanup.get L89 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M086|7|observations.get L9 ×1; contexts.get L48 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M088|1|ns.get L17 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M089|3|store.read L32 ×2; store.read L61 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M090|1|ns.get L36 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M092|18|createFiniteOwnerIssuerProvenanceJournal({ctx,env}).read L103 ×2; createFinitePreparationIssuerJournal({ctx,env}).read L103 ×2|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M094|1|namespace.get L16 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M097|1|namespace.get L17 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M099|1|namespace.get L11 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M100|6|q.get L19 ×5; /^\s*([^=\s]+)=([^;\s]*)\s*$/.exec L30 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M101|10|createFinitePreparationIssuerJournal({ctx,env}).read L156 ×1; sdkJournal({ctx,env}).read L157 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M102|2|journal([literal]).read L386 ×2|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M103|7|io.get L41 ×4; io.get L50 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M104|6|parents.delete L43 ×1; admissions.delete L43 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M105|5|upload.read L90 ×1; activation.read L90 ×2|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M106|2|rows.get L18 ×2|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M107|1|old.get L67 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M108|1|pending.delete L20 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M109|1|monitoringWitnesses.get L200 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M111|25|io.get L46 ×1; io.put L48 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M113|1|entry.promises.delete L21 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M114|26|rows.get L151 ×10; pins.get L216 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M115|3|control.read L52 ×1; caps.proof.read L104 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M117|5|t.get L64 ×2; t.list L65 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M118|3|t.get L75 ×1; t.list L77 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M119|4|t.get L45 ×2; observer.read L55 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M123|5|t.get L60 ×2; createPrivateQaGenerationResolver({env,ctx,sourceRevision,now:cu….read L61 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M125|1|knownRequestLeases.delete L279 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M126|1|namespace.get L39 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M130|1|/^[\x20\t\r\n]*\{[\x20\t\r\n]*[literal][\x20\t\r\n]*:[\x20\t\r\n….exec L65 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M131|3|inFlight.get L134 ×1; inFlight.delete L134 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M137|1|keys.get L15 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M138|5|/^127\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec L318 ×1; /(?:^\|,)\s*s-maxage\s*=\s*"?(\d+)/i.exec L777 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M139|13|vs.get L223 ×1; vs.get L239 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M140|2|inflight.delete L1295 ×1; inflight.delete L1311 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M141|10|this._listeners.delete L104 ×1; open.delete L275 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M142|27|seenLower.get L4573 ×1; DATETIME_FRACTION_DIGITS.exec L5363 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M143|1|authContextStorage.run L10 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M144|1|cache.set(jwk, {}).get L21 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M146|1|/[\p{Cs}\p{Cn}]/u.exec L73 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M147|2|REGEX.exec L22 ×1; producerPayloads.get L168 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M149|3|first.exec L91 ×1; line.exec L98 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M150|1|sourceObjects.get L54 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M151|4|val.get L23 ×1; val.delete L26 ×3|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M152|1|sourceObjects.get L39 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M153|2|this.contents.delete L159 ×1; this.contents.get L184 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M154|3|anchors.get L57 ×2; anchors.get L96 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M155|6|this.get L66 ×1; this.delete L82 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M156|1|schemas.get L54 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M158|3|_installedGroups.get L22 ×1; core.globalRegistry.get L177 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M159|2|registries.globalRegistry.get L998 ×2|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M160|1|def.schema._zod.run L541 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M162|4|schema._zod.run L6 ×4|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M163|6|this._map.get L23 ×1; this._idmap.delete L25 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M164|43|def.element._zod.run L697 ×1; _catchall.run L777 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M165|1|idToSchema.get L108 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M168|3|super.run L16 ×2; createPrivateQaFiniteInitialEntry({ctx:this.ctx,env:this.env}).run L37 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M169|35|actor.read L40 ×1; createPrivateProviderObservation({readPins,request}).read L43 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M170|1|namespace.get L18 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|
|M172|1|c.pins.AFW_DOSSIER_EVENTS_NODE.get L94 ×1|native receiver versus helper/memory/protocol, then fixed callback/reachability mapping|

Concrete examples: `pendingWork.delete` in initial-lease is memory retention; `journals.get` in initial-entry needs collection provenance; RegExp.exec in historical-source is lexical matching; `tx.read` in initial-entry is an internal journal facade and must not be counted again over its lower native call. Those remain **U** in this observed artifact until a source-backed disposition is recorded.

## Pure/data module exclusions

289 graph inputs have no candidate under this syntactic method set. This is a limited discovery exclusion, not a claim that arbitrary exported functions have no effects.

|Discovery exclusion|Modules|
|---|---:|
|compile-time-data-no-native-callsite|2|
|no-call-matching-closed-native-method-discovery-set|284|
|JSON-data-no-native-callsite|3|

The376excluded API-shaped calls are separately counted in E above. No pure/data module or memory call is silently reclassified into a native count.

## Warnings, costs and next gate

Cloud logs retain npm package deprecations and Actions runtime warnings (punycode, url.parse, Buffer, Node20 actions forced to Node24); this checkpoint claims successful focused lint, not zero warnings. Native business code was not run and all operational readiness/completePackage/PCoff remainfalse. Real provider quotas, memory/CPU, RTT, physical drain and namespace emptiness remain unmeasured.
One compile-only job and one artifact were added; this preparation observation is not included in final9test accounting. Root must accept a corrected per-role, source/callback/reachability map and resolve native scope before further instrumentation/final qualification. No finalGREEN or Task2 is authorized by this checkpoint.

Report records tested code e8b2ebed; it cannot contain its own future commit/blob hash. Final report commit/blob/ref are returned after independent readback.


## Architectural continuation — bounded dependency provenance recovery

2026-11-07 19:20 UTC preparation checkpoint, not closed-map approval or GREEN. Source before this appendix: c30b8360d38ea5911a6e867b58f35a7138df581e/tree582996de7ebf2f2a88c9dbd0eba3612adc24d4fc. Source head and main0c9c475b3ebaa970fc11d628b40e50a90cceb727 were independently read; zero Actions runs at c30. Root authorized exactly one further RAM-only inspection after the earlier transient tool cache lost two needed dependency rows. This was recovery of missing scalars, not another inventory run, graph replay or native qualification.

The SAME artifact13586248119 was fetched through the GitHub connector; ZIP1888357B/SHA256b342ff82ad1ab43918d0ae5b2631cccb63f1f0faefce210a1a7fa71a7a337002 matched. Its central directory matched the exact9paths listed above and expanded-size sum remained under25MiB. Only manifest.json and source-inputs.json were inflated with built-in crypto/zlib. Manifest1576B/SHA2566db6eae2fa1a906fe9eae047423c5732b5370c5dc0be22ac4329b13e6165daba bound sourcee8b2ebed173ea4ce38040db3b19368918e72c79a/run42403413324/attempt1; source-inputs.json183901B/SHA25629b9e2bccbbc7492d4e123a5a56f11f7aeaeda39d68cfe801bd2f84c7cca759b matched that manifest. No filesystem/process/dependency/native DB access or execution of archive contents occurred. ZIP and inflated source-input buffers were released after the two-row projection.

|Dependency input|Roles|Raw bytes|Raw SHA256|Prepared variant|
|---|---|---:|---|---|
|`node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js`|M,QA|251149|`bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80`|raw-identical in both existing graphs|
|`node_modules/agents/dist/handler-stateless-VvrWSAVA.js`|M|13056|`e8a4d4802990ac3f434c8c84b8820dfd9510421ad6ac1e8a44ce628f42250bde`|raw-identical|

Source-backed gaps found while closing the map:
- `lib/mcp-qa-finite-initial-anchors.mjs` invokes captured get/list/getAlarm through `Reflect.apply(method,storage,args)`; this actual native boundary was absent from the heuristic method-name set and its172candidate-bearing modules. The preceding289 no-candidate modules cannot be called pure without typed call/callback review.
- `lib/mcp-qa-finite-initial-entry.mjs` has namespace.get→actor.prepareFiniteInitialMaterial→Reflect.apply(method,actor,[r]). The selector is synchronous holder selection; the named RPC is a separate invocation boundary if reached. This does not assert that the exported Workflow path is traversed by P1.
- SDK OAUTH_KV calls can target QA readonly/reduction facades while M uses actual KV. Moreover existing positive QA fixture wrappers can sit between those facade leaves and the captured native method. Counting each layer as native would double count and conflate native settlement with outer ACK.
- Receiver-only modules establish forwarded genuine local Root leases before body/native I/O and must participate in phase attribution despite containing no discovered I/O.
- Root permits the fixed diagnostics operation enum `rpc` with resourceClassDO, with no raw method/argument/payload in DTO. Operation counts represent native API invocations, not network requests, physical retry attempts, exclusive wall time, or real provider quota.

No additional Source runtime hook, test registration, workflow activation or CI run is claimed by this appendix. Closed per-role map and semantic approval are still pending. All readiness/completePackage/PCoff flags remainfalse.


## Source schema and role-variant correction checkpoint (unexecuted)

This continuation adds the Root-approved fixed native classes/operations `rateLimiter/limit` and `DO/rpc` and the optional collector-owned `fetchOpRef` link projected as `fetchOpOrdinal`. A foreign, non-fetch, mismatched Root/child/phase/resource or non-body reference is explicitly invalid/unattributed. Incoming Request body reads may legitimately have no fetch reference. Linked read/cancel calls are individual native API invocations; bytes belong only to each read row, while cancellation lifecycle facets belong to the owning fetch row. Fetch settlement at headers is not stretched across later body activity.

Existing Q2/Q5/Q8 contract groups were extended for typed invocation counts, unchanged promise/rejection identity, false limiter result versus logical denial, separate fetch/read/cancel intervals, no additive duplicate bytes and invalid cross-context links. There are still exactly eight Q registrations. They have not yet been executed; no passing result is claimed.

The exploratory compiler map's cross-role path deduplication defect is corrected in code: source inputs, candidates and seams are emitted separately per M/QA role. QA's already-prepared source no longer substitutes for M's original source. Every input records role and hookStage as well as raw/prepared hashes. Counts distinguish unique input paths from role variants. This corrects the descriptor representation only: the original API-shaped discovery remains explicitly exploratory and incomplete, and no second compile-only run has been activated.

Further direct source closure review follows236 repository modules from the actual QA entry and M entry import roots. This is a bounded static read traversal, not a claim that all branches run in P1 or a new compiler/native result. It identified:
- forwarded request Root creation in the receiver-only OAuth/Notice/choice modules;
- additional actual child callback seams in initial-material, policy-transport and cleanupLifetime, beyond the prior ten marker list;
- rateLimiter.limit native calls in delegated-oauth-worker and owner-preparation;
- JWKS `fetchImpl` plus opaque native `response.json()` in jose6.2.10. The locked version and package integrity are unchanged. The first-party tagged source describes this alias at [jose v6.2.10 remote.ts](https://github.com/panva/jose/blob/v6.2.10/src/jwks/remote.ts); final compiler markers must bind the installed JS bytes, not assume TS equals the package output. The actual preparation/phase readers call Access verification without supplying a local key set, and the existing SYN outbound handler serves the fixed certs route.

No native-identity carrier or blanket rewriter is activated by this checkpoint. The intended callsite observer will capture original native receiver/method pairs before existing fixture wrappers, preserve those wrappers as outer ACK layers, and record only actual bottom invocations. Exact callsite/alias/callback descriptors and complete per-role hook counts are still being closed; Root acceptance and the final single9-test qualification remain pending. Source controls, defaults, production/lib/worker/package/lock/config files, TEMP and all clocks are unchanged by this checkpoint.


## Architecture escalation preservation checkpoint — raw alias closure WIP

Parent Source: `1ab0fcef6e01bae1e0b282efaed3f5641ae8556d`, tree `0212fe1839362d848ecd93191f5266adae9fae17`. Root schema body-link amendment: Rootdocs `f0603f09a3490ef26adce0b63a386501cd328088`; design blob `539bc47f22d5a1a5ac271075f7b5f09d3c437fc2`; escalation brief blob `7c2b6f5ac86d1812e7c90a78f76ffc5dbc4c636a`.

This is preservation of analysis, **not the closed map, acceptance, a native hook activation, or a CI result**. No new inventory or qualification run was started. The existing compile-only evidence is unchanged. Static import traversal of the pinned repository source yields 118 M paths and 199 QA paths including the composed QA entry, with 80 common paths (237 distinct paths including the entry). This traversal can include tree-shaken/dormant exports; it is not a replacement for the actual compiler metafile. The QA entry was reconstructed as editorial text from the already pinned base literal and the existing first-connection and owner-cleanup string additions. No repository code, compiler, test, runtime, or dependency was executed locally.

The following bounded audit records all 317 textual `Reflect.apply` call expressions found in the 236 repository source modules of that static closure, across 41 files. Parentheses and quoted arguments were balanced to retain generic aliases, including nested `method(expected,'toString')`. These are raw-source locations and blob identities, not final prepared-role hook positions or native invocation counts. Direct member calls, body consumers, installed package code, prepared fixture bottom wrappers, Root/child seams, and dormant reachability still require closure. No universal-zero-unknown claim follows from this table.

The newly explicit omissions from the old API-name heuristic include initial-anchors and preparation-cleanup `io(method,...)`, native-bridge/oauth-forward captured stub `fetcher`, and issuer-store session/statement/bound `method`. For each native-capable row, existing wrapper/facade functions must remain unchanged and only the captured actual native receiver/function pair may create a native operation row. The outer wrapper Promise/ACK remains distinct. Native transaction entry and callback leaf operations are separate API invocations, not physical network request counts.

| Source path / pinned blob | Static roles | Captured calls (raw-source lines) | Disposition |
|---|---|---|---|
| `lib/mcp-closure-reader-probe.mjs`<br>`85ae775ae1b267f7fdaebf8abbd7b4f96fb53962` | QA | idFromName → self: 92<br>transaction → storage: 101 | Pure captured identity/clock selector; no I/O row<br>DO storage/transaction native boundary or existing fixture outer ACK |
| `lib/mcp-hosted-canary-restoration.mjs`<br>`b8edf426c23d8c07f78e0b1571a83c9f2af57f83` | QA | dispose → value: 37<br>selfMethod → self: 57,60<br>nodeName → node: 66<br>nodeString → node: 66,197,223<br>get → t: 100<br>list → t: 102<br>transaction → storage: 108,146,160<br>nodeGet → node: 197,223<br>method → original: 200<br>get → ns: 265<br>method → ns: 265 | RPC-result disposal; no operation disposition inferred<br>Pure captured identity/clock selector; no I/O row<br>DO storage/transaction native boundary or existing fixture outer ACK<br>DO namespace stub identity edge; no native settlement<br>DO named RPC native boundary; exported-Workflow reachability separate |
| `lib/mcp-qa-finite-bootstrap-native.mjs`<br>`003b8cda2b723d3422f8f696302acc8f550b3477` | QA | stringify → actor: 22,28<br>idFromName → self: 22,28 | Pure captured identity/clock selector; no I/O row |
| `lib/mcp-qa-finite-confirmation.mjs`<br>`530cbc2e1051431f07764ae7718c293982a66af2` | QA | nativeDateTime → timestamp: 44,50 | Pure captured identity/clock selector; no I/O row |
| `lib/mcp-qa-finite-historical-source.mjs`<br>`855af60b2880d566f665a405cb3ab4fe8b9d369e` | QA | toString → actor: 190,199<br>transaction → storage: 226<br>withSession → db: 234<br>method → session: 235<br>bind → statement: 236<br>all → bound: 237 | Pure captured identity/clock selector; no I/O row<br>DO storage/transaction native boundary or existing fixture outer ACK<br>D1 synchronous holder identity edge<br>SQL native execution or existing fixture outer ACK; bottom capture required |
| `lib/mcp-qa-finite-initial-anchors.mjs`<br>`00f743593d7670e9cb358c8512a25367d29cd6ed` | M,QA | toString → actor: 26,27<br>idFromName → ns: 27<br>method → storage: 28 | Pure captured identity/clock selector; no I/O row<br>DO storage/transaction native boundary or existing fixture outer ACK |
| `lib/mcp-qa-finite-initial-cleanup.mjs`<br>`0a04ae3a4d74c2c7939b1654683054b1d5d751d4` | QA | get → storage: 42,112<br>list → storage: 47,48<br>getAlarm → storage: 63,116<br>transaction → storage: 102<br>tg → tx: 106<br>tp → tx: 107<br>td → tx: 109<br>ta → tx: 109<br>sync → storage: 112 | DO storage/transaction native boundary or existing fixture outer ACK |
| `lib/mcp-qa-finite-initial-custody-probe.mjs`<br>`b81bb37e495d4c8cd3ef77a19e875e04ebd19d32` | QA | toString → actor: 22,28<br>idFromName → self: 23,28 | Pure captured identity/clock selector; no I/O row |
| `lib/mcp-qa-finite-initial-entry.mjs`<br>`c5ae0f53bee077c693d7f0a0599bbb6347648fee` | QA | disposer → value: 57<br>toString → actorId: 70,72<br>transaction → storage: 104,222,264,335,405,416<br>tg → tx: 106,108<br>tp → tx: 109<br>sync → storage: 112,118,232,282,345,412,423<br>get → storage: 113,128,129,130,132,233,283,285,346,413,414,424,424<br>getAlarm → storage: 131,233,285,403,414,424<br>list → storage: 133,404<br>getTx → tx: 225<br>putTx → tx: 230,280<br>readTx → tx: 267<br>read → tx: 338,408,419,420,420<br>write → tx: 339,409,421<br>alarm → tx: 410<br>nativeTime → timestamp: 434,437<br>namespaceGet → self: 439<br>idFromName → self: 439<br>stepDo → step: 440<br>method → actor: 442 | RPC-result disposal; no operation disposition inferred<br>Pure captured identity/clock selector; no I/O row<br>DO storage/transaction native boundary or existing fixture outer ACK<br>DO namespace stub identity edge; no native settlement<br>Workflow scheduling callback (P1 reachability unproved; not counted as helper or native yet)<br>DO named RPC native boundary; exported-Workflow reachability separate |
| `lib/mcp-qa-finite-initial-history-schema.mjs`<br>`2f22eb8a8b50cef57cc075956cf261165184e2d3` | QA | withSession → db: 27<br>prepare → session: 28<br>all → statement: 29 | D1 synchronous holder identity edge<br>SQL native execution or existing fixture outer ACK; bottom capture required |
| `lib/mcp-qa-finite-initial-material-store.mjs`<br>`f62cd3f930245c48a074f4d5899329cac3390ae9` | QA | get → storage: 16<br>transaction → storage: 17<br>tg → t: 20<br>tp → t: 20 | DO storage/transaction native boundary or existing fixture outer ACK |
| `lib/mcp-qa-finite-initial-material.mjs`<br>`8e2d3e4a75baabf1be5d12b6e2868ffc16599f78` | QA | toString → actor: 19,21<br>withSession → db: 70 | Pure captured identity/clock selector; no I/O row<br>D1 synchronous holder identity edge |
| `lib/mcp-qa-finite-initial-owner-source.mjs`<br>`f1ef3a1c8214decc6a02044da211be127d8e2e9e` | QA | toString → actor: 46,52<br>idFromName → self: 48,53<br>get → storage: 63<br>list → storage: 64<br>getAlarm → storage: 93<br>nodeName → node: 103<br>withSession → db: 105 | Pure captured identity/clock selector; no I/O row<br>DO storage/transaction native boundary or existing fixture outer ACK<br>D1 synchronous holder identity edge |
| `lib/mcp-qa-finite-launch.mjs`<br>`3c5716076be75b28388579ce81c2773e2dec6027` | QA | create → binding: 134 | Workflow create (P1 reachability unproved; enum disposition pending) |
| `lib/mcp-qa-finite-owner-cleanup-journal.mjs`<br>`127e5906891b20d2f08c74a412383b8b7e3ff1e2` | QA | list → storage: 9<br>c.transaction → c.storage: 38<br>get → tx: 50<br>put → tx: 52<br>c.sync → c.storage: 54<br>c.get → c.storage: 55 | DO storage/transaction native boundary or existing fixture outer ACK |
| `lib/mcp-qa-finite-owner-cleanup.mjs`<br>`1a5a2583d266179cdd89f799c64199f29044fec5` | QA | methods[q.method] → alias: 55,614<br>list → storage: 166,168,172<br>get → storage: 171,660<br>withSession → db: 190,198<br>method → session: 192,200<br>bind → statement: 193,201<br>first → bound: 194<br>all → bound: 202<br>nodeName → node: 229 | KV private facet entry; follow existing wrapper to native leaf<br>DO storage/transaction native boundary or existing fixture outer ACK<br>D1 synchronous holder identity edge<br>SQL native execution or existing fixture outer ACK; bottom capture required<br>Pure captured identity/clock selector; no I/O row |
| `lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs`<br>`2fad787bd05736a17cf013f41aa143264298afd2` | QA | list → storage: 11<br>c.transaction → c.storage: 43<br>get → tx: 47<br>put → tx: 64<br>c.sync → c.storage: 66<br>c.get → c.storage: 67 | DO storage/transaction native boundary or existing fixture outer ACK |
| `lib/mcp-qa-finite-owner-native-bridge.mjs`<br>`f2c473cdd11b055a3c6037de317f73d7b3a7a968` | M | idFromName → namespace: 16,20<br>get → namespace: 16<br>fetcher → stub: 36 | Pure captured identity/clock selector; no I/O row<br>DO namespace stub identity edge; no native settlement<br>DO fetch native boundary |
| `lib/mcp-qa-finite-owner-native-receiver.mjs`<br>`e760b3579a38f1dbb73b177bb73b06d814eb881f` | QA | toString → actor: 22<br>idFromName → self: 22 | Pure captured identity/clock selector; no I/O row |
| `lib/mcp-qa-finite-owner-notice-get-forward.mjs`<br>`ea910f0fcdeade5a794ddaa60898706924e72f80` | M | idFromName → namespace: 17,19<br>get → namespace: 17<br>fetcher → stub: 30 | Pure captured identity/clock selector; no I/O row<br>DO namespace stub identity edge; no native settlement<br>DO fetch native boundary |
| `lib/mcp-qa-finite-owner-oauth-forward.mjs`<br>`f7979579fcb6d00b3d5d68c7790089c803f4170f` | M | idFromName → namespace: 11,13<br>get → namespace: 11<br>fetcher → stub: 22 | Pure captured identity/clock selector; no I/O row<br>DO namespace stub identity edge; no native settlement<br>DO fetch native boundary |
| `lib/mcp-qa-finite-owner-phase-context.mjs`<br>`7eb8f28760de60f143e487eeb6988705059a0a44` | QA | toString → actor: 87,93,497,501<br>idFromName → self: 89,94<br>get → storage: 104<br>list → storage: 105<br>withSession → db: 123,131,164<br>method → session: 125,133<br>bind → statement: 126,134<br>first → bound: 127<br>all → bound: 135<br>nodeName → node: 162<br>native.sync → storage: 577<br>issuerCapture.sync → issuerCapture.storage: 1080 | Pure captured identity/clock selector; no I/O row<br>DO storage/transaction native boundary or existing fixture outer ACK<br>D1 synchronous holder identity edge<br>SQL native execution or existing fixture outer ACK; bottom capture required |
| `lib/mcp-qa-finite-policy-setup.mjs`<br>`34285e7c8ee3d9838763344edba2dcf6ce33da9b` | M,QA | nativeTime → timestamp: 129,131<br>stepDo → step: 137<br>setup → actor: 139 | Pure captured identity/clock selector; no I/O row<br>Workflow scheduling callback (P1 reachability unproved; not counted as helper or native yet)<br>DO named RPC native boundary; exported-Workflow reachability separate |
| `lib/mcp-qa-finite-preparation-cleanup.mjs`<br>`e9999c6ea5d086599844f86120cb0e3449f5d636` | M,QA | toString → actor: 12<br>idFromName → ns: 12<br>method → storage: 14 | Pure captured identity/clock selector; no I/O row<br>DO storage/transaction native boundary or existing fixture outer ACK |
| `lib/mcp-qa-finite-preparation-enrollment-writer.mjs`<br>`6eb0f08d581faef8ee12ce4f9e0d62cebdfb57f9` | M,QA | method → storage: 33<br>transaction → storage: 55<br>tg → tx: 59<br>tl → tx: 60<br>tp → tx: 69 | DO storage/transaction native boundary or existing fixture outer ACK |
| `lib/mcp-qa-finite-preparation-issuer-journal.mjs`<br>`414450aa08f797bed5a41cf5cc697342785ce16b` | QA | toString → actor: 10<br>idFromName → ns: 12<br>listing → tx: 31<br>c.transaction → c.storage: 51<br>tg → tx: 62<br>tp → tx: 64<br>c.sync → c.storage: 66<br>c.get → c.storage: 67 | Pure captured identity/clock selector; no I/O row<br>DO storage/transaction native boundary or existing fixture outer ACK |
| `lib/mcp-qa-finite-preparation-issuer-store.mjs`<br>`b3e5f890ca525f8b3eb4e40ce4473cc9690cdcfb` | QA | c.session → c.db: 73,79,114,158,190<br>prepare → s: 74<br>bind → stmt: 75<br>method → bound: 76 | D1 synchronous holder identity edge<br>SQL native execution or existing fixture outer ACK; bottom capture required |
| `lib/mcp-qa-finite-preparation-notice-journal.mjs`<br>`b9c15aba18e2442a0ed864b8afd5e86313c5e470` | QA | listing → tx: 36<br>c.transaction → c.storage: 49<br>tg → tx: 53<br>tp → tx: 63<br>c.sync → c.storage: 65<br>c.get → c.storage: 66 | DO storage/transaction native boundary or existing fixture outer ACK |
| `lib/mcp-qa-finite-trial-control.mjs`<br>`18996dc32972e3e33726b242e508d9635147a7e5` | M,QA | actorString → actor: 192,197<br>idFromName → ns: 192,198<br>method(expected,'toString') → expected: 193<br>method(expectedNow,'toString') → expectedNow: 198<br>primary[name] → readPrimary: 252<br>methods.transaction → storage: 256,419<br>m.get → t: 259<br>m.put → t: 260<br>m.list → t: 261<br>m.setAlarm → t: 263<br>methods.get → storage: 279<br>methods.getAlarm → storage: 280<br>primary.effect → readPrimary: 351,371<br>getMethod → tx: 422<br>listMethod → tx: 423<br>alarmMethod → tx: 425 | Pure captured identity/clock selector; no I/O row<br>Source helper callback; no native row at this invocation<br>DO storage/transaction native boundary or existing fixture outer ACK |
| `lib/mcp-qa-generation-draft-reader.mjs`<br>`f4180dd3cfd22df84630b59b51c5b74b0cac6f97` | QA | withSession → db: 37<br>prepare → session: 38<br>bind → statement: 39<br>first → bound: 41 | D1 synchronous holder identity edge<br>SQL native execution or existing fixture outer ACK; bottom capture required |
| `lib/mcp-qa-generation-ledger.mjs`<br>`f7a72347eb44cf3305ab1a0a09ff1cd9e50d5816` | QA | get → t: 64,119,166<br>list → t: 65<br>transaction → storage: 116,163,234<br>assertPin → pin: 143,147<br>snapshotPin → pin: 143,147<br>put → t: 167 | DO storage/transaction native boundary or existing fixture outer ACK<br>Source helper callback; no native row at this invocation |
| `lib/mcp-qa-generation-preparation.mjs`<br>`2f931c2d3bbcf087be9dbe2e80f8506ab57234f0` | QA | idString → id: 70,71<br>select → self: 71,108<br>transaction → storage: 73<br>get → t: 75<br>list → t: 77<br>toString → id: 107,108<br>stepDo → step: 140<br>get → ns: 140<br>select → ns: 140 | Pure captured identity/clock selector; no I/O row<br>DO storage/transaction native boundary or existing fixture outer ACK<br>Workflow scheduling callback (P1 reachability unproved; not counted as helper or native yet)<br>DO namespace stub identity edge; no native settlement |
| `lib/mcp-qa-generation-resolver.mjs`<br>`ddaf4b847e35be04ce302176140ef65b5ea818e4` | QA | idString → id: 33,37<br>select → self: 37<br>transaction → storage: 42<br>get → t: 45,48 | Pure captured identity/clock selector; no I/O row<br>DO storage/transaction native boundary or existing fixture outer ACK |
| `lib/mcp-qa-historical-identity.mjs`<br>`cbf7699be2ff6e330e8bfc945d6d228e4bb93714` | QA | withSession → db: 52<br>prepare → session: 53<br>bind → statement: 54<br>first → bound: 55 | D1 synchronous holder identity edge<br>SQL native execution or existing fixture outer ACK; bottom capture required |
| `lib/mcp-qa-named-eligibility.mjs`<br>`1c8ac8795d57fb1ff889163056146053d5647509` | QA | withSession → db: 41<br>prepare → session: 42<br>bind → statement: 43<br>first → bound: 44 | D1 synchronous holder identity edge<br>SQL native execution or existing fixture outer ACK; bottom capture required |
| `lib/mcp-qa-named-packet-reader.mjs`<br>`800f7dc409a81e7238937fa308ee5193fb138c83` | QA | withSession → db: 37<br>prepare → session: 38<br>bind → statement: 39<br>first → bound: 41 | D1 synchronous holder identity edge<br>SQL native execution or existing fixture outer ACK; bottom capture required |
| `lib/mcp-qa-named-preflight.mjs`<br>`62f59b70cc0a0d60ea1b5f55909960f95d822538` | QA | idString → id: 57,59<br>select → self: 59<br>transaction → storage: 60<br>get → t: 60,60<br>stepDo → step: 90<br>get → ns: 90<br>select → ns: 90 | Pure captured identity/clock selector; no I/O row<br>DO storage/transaction native boundary or existing fixture outer ACK<br>Workflow scheduling callback (P1 reachability unproved; not counted as helper or native yet)<br>DO namespace stub identity edge; no native settlement |
| `lib/mcp-qa-original-pins.mjs`<br>`3f7b3c5caf977f56c4ff677dc01db70db3f3beef` | QA | withSession → db: 37<br>prepare → session: 38<br>bind → statement: 39<br>first → bound: 41 | D1 synchronous holder identity edge<br>SQL native execution or existing fixture outer ACK; bottom capture required |
| `lib/mcp-release-runtime.mjs`<br>`585dcbda7d5403e1ddb37d697457cc0899e0d03b` | QA | nativeDateTime → timestamp: 195,203<br>withSession → db: 221<br>prepare → session: 222<br>bind → statement: 223<br>all → bound: 226<br>stepDo → step: 273 | Pure captured identity/clock selector; no I/O row<br>D1 synchronous holder identity edge<br>SQL native execution or existing fixture outer ACK; bottom capture required<br>Workflow scheduling callback (P1 reachability unproved; not counted as helper or native yet) |
| `lib/mcp-successor-canary-restorer.mjs`<br>`1638679062b5798874cbe63847da7035ab4931e8` | QA | idFromName → namespace: 100<br>idFromString → namespace: 100<br>transaction → storage: 109 | Pure captured identity/clock selector; no I/O row<br>DO storage/transaction native boundary or existing fixture outer ACK |
| `lib/mcp-successor-retirement-handoff.mjs`<br>`9ba62d6227090dbf989d4d887a54483fa277ad1f` | M,QA | transaction → storage: 53 | DO storage/transaction native boundary or existing fixture outer ACK |

### Fixed semantics retained while completing the map

- Immutable ALS stores capture actual Root/child/phase. Missing scope on an in-scope business call is incomplete; no manufactured Root, global mutable phase, new authorization, or new timeout. Fixture setup/seeding/configuration queries are explicitly outside SourceRoot accounting.
- Native fetch settlement is headers settlement. Each native reader read/cancel and Response body-consumer call has its own actual native Promise row. Known outbound response/reader association must be retained; inbound Request reads may have no fetch link. Exposed chunk or ArrayBuffer bytes belong only to read rows. Opaque json/text remains null/not_exposed. Per-fetch totals are derived through validated numeric links, not added again to fetch rows.
- Namespace selection and D1 session/prepare/bind return their exact synchronous holders. No network settlement is inferred. Named native stub calls use DO/rpc; captured limiter calls use rateLimiter/limit. Native fulfilled limiter results and Source logical denial are independent.
- Only fixed reviewed callsite descriptors may be transformed after the existing role-specific fixture composition. Receiver, method lookup, argument evaluation, callback guard/retain order, actual returned Promise/value, and thrown error identity must be preserved. No env holder wrapping or additional method replacement is authorized by this analysis.
- The installed jose remote-JWKS helper calls captured/default `fetchImpl` followed by native Response `json()`; both escaped the old discovery names. Installed locked source must be matched in preflight; upstream TypeScript is not a substitute for installed JavaScript hashes.

This checkpoint also tightens the collector's byte setter to reject non-read rows, preventing a fetch/cancel additive duplicate, and extends the existing Q8 group with those rejects and an inbound Request read without a fetch parent. Eight Q registrations remain. These edits are **unexecuted**; no PASS is asserted. Final map acceptance and final nine-test activation are still pending. Operational readiness, complete package, and PC-off evidence remain false.


## Consolidated fixed-P1 descriptor and carrier proposal — review checkpoint

Parent Source `fbcd6b7cdff7baa081b28287f4415338b912b8d2`; the original Task1 history above remains intact. The reviewable data is exported as `budgetNativeDescriptorProposal` from `test/fixtures/finite-budget-world.mjs`. It contains 130 pinned repository paths, 635 fixed selector groups, per-role membership and raw/prepared source hashes, and package/fixture supplements. It is **data only**: no native transform, fixture opt-in, TEMP activation, build, test, I0, or native qualification was added by this checkpoint. Root map acceptance is still pending.

### Boundary and role closure

The proposal is for the fixed P1 route: direct existing QA setup entry; M choice/authorize and QA receivers; ordinary M token exchange and read_project_summary; Notice GET/consent; original cold alarm; restoration, SDK reduction and final inventory. It does not qualify all exported Worker/Workflow/Container/Node callbacks. Legacy event/installation/launch paths, real Workflow execution, DNS/HTTP callback transport, Container start/stop, negative fixture branches and other MCP tools remain outside that route. Unexpected entry into a declared dormant path must mark coverage incomplete while allowing the original business call to proceed unchanged; it cannot fabricate an enum, Root, or successful observation.

The selector data resolves capture forms missed by the 1696-name heuristic: generic Reflect.apply, Function.call on captured storage/session methods, statement aliases such as insert.run, direct fetchImpl/fetcher calls, dynamic issuer-store method(bound), namespace-holder edges, native limiter limit, Request/Response consumers and clone/reader identities. The old 1696 denominator remains syntactic discovery only.

| Fixed family | Distinct repository sites | M variant sites | QA variant sites |
|---|---:|---:|---:|
| Captured invocation closures | 221 | 26 | 215 |
| Direct storage/transaction native-capable calls | 293 | 81 | 264 |
| Direct namespace holder selections | 22 | 7 | 19 |
| Captured Function.call storage/namespace aliases | 10 | 7 | 10 |
| Fixed global/fetchImpl/fetcher callsites (native or declared facade) | 32 | 7 | 31 |
| Reader factory identity edges | 36 | 14 | 31 |
| Native reader reads | 39 | 14 | 34 |
| Native reader/stream cancellation | 58 | 20 | 50 |
| SQL execution members | 97 | 64 | 67 |
| Direct SQL prepare/bind/withSession identities | 239 | 151 | 162 |
| Captured D1 withSession.call identity | 1 | 1 | 0 |
| Actual native limiter limit members | 2 | 2 | 1 |

These are fixed **source selector counts**, not actual API execution counts or a sum of native operations. Identity factories and explicit facades are listed separately from native entry. The repository selector families are nonexclusive at the module level; paths and exact receiver/method/target selectors and line locations are present in the helper data. AST reconciliation during the already required final preflight must select actual expressions, enforce each exact count, reject overlapping edits or unmatched native-capable sites, and emit role/pre-hook/post-hook hashes before I0. A mismatch fails preflight; it is not permission to broaden a selector or silently drop a row.

The 317 captured Reflect sites have the source-backed dispositions preserved in the preceding table: 81 pure identity/clock selectors, 7 pure helper callbacks, 54 namespace/D1 holder edges, 146 storage/transaction native-capable entries, 13 SQL execution aliases, 3 captured stub fetches, 3 named RPC entries, 2 SDK facet entries, 5 dormant step.do calls, 1 dormant Workflow binding.create and 2 RPC-result disposals with no I/O row inferred. The 10 captured Function.call storage/namespace sites additionally distinguish 9 storage entries from one namespace selection; delegated-continuity-host adds one captured D1 withSession identity edge. Native class/operation comes from the captured real pair and closed descriptor, not the spelling alone.

All 130 repository path role memberships were reconciled with the immutable source-input metadata: no role disagreement with the direct import closure was found. M uses each raw source variant; it never inherits QA's prepared override. The eight changed QA variants are recorded below. These hashes are evidence of the prior compile input, **not golden hashes for a future dynamic fixture ceiling**. Existing approval/namespace/compiled data preparation must run unchanged; final preflight records the actual new pre-hook variant and checks the pinned raw input, original composition seams and unchanged native-call counts.

| Prepared QA source | Raw SHA256 (also M where present) | Prior QA prepared SHA256 |
|---|---|---|
| `lib/mcp-qa-finite-bootstrap-native.mjs` | `88c881bdcefc48d934010ee8b342ad921284c60f52ddeaebd924b63bf9a18997` | `bfae4026af2d13715dbce55b3bd8c7e98b1b710fbdfae6a49b0db28fb8b08a03` |
| `lib/mcp-qa-finite-fixed-policy-engine.mjs` | `9e4debe5e87be5191f09aaf36438d78bf12724b292d8a3b39fb322087d563a7d` | `cef8ad565a97d2f3018abf989555e8f1d26af7f4bbf47c69dcf65a36fd06cf9a` |
| `lib/mcp-qa-finite-historical-source.mjs` | `1ff09d3f9db050b19181d304a6533cc88f076f48898fd5fe20c8d5958d19ed12` | `099db8b6900a8b56558f5830f13a297c0003a95d74e837f6810469b66c63ca11` |
| `lib/mcp-qa-finite-initial-cleanup.mjs` | `f0e8a2720987d13d0011c437abd3c5ef7d1452493b3c0e67b5da5d319e474de5` | `abc7de3bbf6d6ef326f1636ffa7b53f4f4dd933b1cc0263691020a243ec80342` |
| `lib/mcp-qa-finite-initial-entry.mjs` | `364491541624f6722cd0366422bf7977851d4e9b33a9db745d7e862eea86c2fa` | `48cef41b16f418864d1c73b8bce32ae9a7154f71af15829199fe7be2bcb32a77` |
| `lib/mcp-qa-finite-initial-material.mjs` | `7a8a17463688295a2ce45b72bf0744c6d83b40f9196a64170a7f42271ee76c67` | `d62aaf82f231de83e429221cf65e2703b62598f0aef40d0fc3ed22db5ee3cef5` |
| `lib/mcp-qa-finite-owner-cleanup.mjs` | `866cdda4ea43f56c3c2f69c0a2846167e95f36ae26be35a76cc7eaa7b34a4483` | `c4d70030042d71dbb5deb525d77a7e41a929d1fcf6f1819690ae8f5ef094b3ba` |
| `lib/mcp-qa-finite-owner-phase-context.mjs` | `d97d07f69916c45f58af511a6dfb57322ed3fe7d8fa1f6fbb2220d44be15b921` | `383333fee44645574486f22eab97060fb2087794fe413424adc643c7f69eac69` |

The complete literal QA entry was reconstructed editorially without executing a repository helper, compiler or runtime. Retaining the two literal trailing spaces reconciles it exactly with the artifact: 64,800 UTF8 bytes, SHA256 `89ae285b8f00fdf95eecfeee37673138f4c136c7704f245152051a3be2985257`. Its 35 captured receiver/target groups contain 61 Reflect.apply sites, separately listed in the helper. Seed/configuration/probe RPCs and fixture setup SQL/KV are explicit fixture scopes, not Source Roots. The normal pre-existing wrapper chains remain intact; unselected fault branches are dormant.

### Actual identity acquisition and phase carriers

No Root is inferred from a fixture command, lexical function name, missing store, serialized parent, or current clock. Registration observes these actual Source identities:

| Seam | Expected marker count | Carrier |
|---|---:|---|
| initial-entry parent=clock(r.createdAt+30000,holders) | 1 QA | actual parent.lease, setup, original observed deadline |
| initial-cleanup parent=clock(Date.now()+30000,holders) | 1 QA | actual alarm parent.lease, cleanup_before_restore |
| owner-preparation requestLease root registration | 1 per role | actual lease and already computed deadline; covers local and forwarded factory calls |
| M finite fetch reserved branch | 1 | actual request lease, setup / authorize_get / authorize_post / monitoring_get / monitoring_post from the fixed route and method |
| M finite fetch unreserved delegate | 1 | actual Request transport Root, null deadline, token_exchange or mcp_read for the fixed P1 endpoints |
| QA native-choice / OAuth / Notice receiving handlers | 1 each | their actual locally created forwarded request leases and the fixed receiving phase |
| initial-lease actual=work(l,until) | 1 per included role | actual child l and original until, inherited immutable Root/phase |
| owner-preparation return work(childLease) | 1 per included role | actual childLease/end after the original current() guard |
| initial-material return work(l) | 1 QA | actual material child and its existing end |
| owner-cleanup return work(clock.lease,end) | 1 QA | actual cleanup child, including this non-clock.child path |

Internal proof/clock guards do not become new Roots. Child deadline is the Source-computed value, not a renewed or reconstructed budget. Phase overrides are fixed call scopes: one lookup callback after the existing QA observation composition; the actual restore child and its immediate verification; the actual SDK-reduction child containing revokeGrant; and the one final-inventory invocation. Late settlement uses the captured operation handle and never the later active phase. Root30s, child5s, I0/C0/C1 and SDK limits remain unchanged.

The carrier uses immutable AsyncLocalStorage stores through run/getStore only. The Source's native guard/retention calls remain in their original order. Outside an explicit fixture exclusion, an unproved missing business context increments incomplete coverage; there is no fallback Root. Body handles additionally retain their actual captured request/fetch scope for the already existing late stream callbacks. This is a captured identity relationship, not authority or a global mutable current phase. No new stream callback, consumer, parser, clone or cancellation is introduced.

Native holders/functions are retained weakly from actual existing acquisition/capture sites. A method call observes its evaluated receiver and method once before evaluating the original argument list; Reflect.apply and Function.call forms retain their original argument evaluation and receiver semantics. The observer invokes the actual captured function once, registers passive settlement on its actual Promise, and returns that same Promise or synchronous value; synchronous throws rethrow the same error object. No env proxy, holder replacement, or newly replaced method is used. Existing fixture-assigned wrapper functions and Source facades are identified as outer ACKs; their original bottom native call is the measured operation. Native transaction and its leaf calls are separate native API invocations, never exclusive wall time or physical request counts.

### Resolved Agents/MCP native-body closure

Root authorized bounded RAM-only inspection of the same immutable artifact for this specific body-origin question. ZIP bytes/hash, exact nine paths, expanded size 7,351,721 bytes, manifest hash, source e8b2ebed173ea4ce38040db3b19368918e72c79a, run42403413324/attempt1 and M script bytes/hash all matched the existing receipt. No contents were executed, no files/processes/dependencies were created, and ZIP/bundle buffers were released.

The labelled Agents excerpt is 12,793 bytes, compiled offsets1772115–1784908, SHA256 `e8fa1845a5831733775327ebd5817db7d3ceb60d8f02d9c3badc45e06987ea57`. The labelled MCP index segment is 50,658 UTF8 bytes, compiled offsets1721458–1772114, SHA256 `9b1bb51f64d8fb4fa53797a86e01b63c18729506819a234c1e3309d6eb6526b6`. Including overlapping focused excerpts, extraction was 71,856 bytes, below120KB. Installed MCP input is M-only, 80,210 bytes, raw/prepared SHA256 `4494af7ea28b45d1655df5a67dcbd6079a50cbe382f811d82441ad2004bf4d60`. This distinguishes installed module bytes from the tree-shaken compiled segment.

Agents createLegacyCompatibilityRequestHandler obtains a Response from WebStandardStreamableHTTPServerTransport.handleRequest, reads its local SSE stream through one reader, and forwards chunks into the pre-existing adapter stream. wrapResponseBodyWithAuthContext adds the pre-existing second reader adapter; runWithAuthContext owns separate SDK ALS. Those two reads and two cancels are real native stream API invocations, not outbound fetches. Their reader identities acquire the original mcp_read transport context at actual getReader calls. The native calls and Promise settlements are observed without replacing the existing pull/cancel callbacks.

MCP handlePostRequest consumes req.json() when parsedBody was not supplied. isLegacyRequest creates its existing Request clone and classifyEntryRequest consumes text(); the existing classify forward clone is a separate identity edge. Both opaque native consumers receive read rows with null bytes. The inspected MCP legacy fallback has one read/cancel adapter pair but is dormant under the selected Agents legacy-stateless lane; this does not prove it executed. Native local SSE Responses are created inside the known transport, and Agents' existing Response reconstructions preserve that local transport provenance. A known native-fetch association must survive forwarding/copying/cloning; lack of a link alone never establishes local origin.

Package hook selector counts are explicit in the helper: OAuth SDK44 KV sites,2 native fetch sites,9 reader/cancel sites,1 native request.formData consumer,3 reader factories and1 existing request clone;9 handler dispatch fetch sites are excluded as helpers. Agents has2 reads,2 cancels,2 reader factories. MCP index has1 read,1 cancel,1 reader factory,1 request json,1 request text and2 existing request clones in the specified functions. jose remote-JWKS has1 fetchImpl and1 response.json; its installed input is5,258 bytes, SHA256 `2b64e5710a3b59a2ecae7084bbe6ac725a1356c84449f32ee32b3a32c040b63a`, M and QA. Upstream tagged source was consulted as semantic support; it was not substituted for these installed hashes.

For all body paths, fulfilled fetch tags only the Response identity. Stream identity is acquired from the business code's actual body getter, and reader identity from its actual getReader call, preserving one evaluation and errors. Existing request/response.clone is a synchronous identity edge returning the same actual clone. A proven local SDK Response may use transport/read with a null fetch link. Each real read/cancel has its own native row and exact Promise settlement. Exposed chunks/ArrayBuffer bytes appear only on read rows; json/text/formData remain opaque. Existing clones or adapter rereads can count the same logical payload more than once as actual API reads: these metrics are **not unique network transfer bytes**. No fetch/read additive double count is permitted.

### Review gate and remaining implementation

The semantic decisions raised to Root have been resolved: typed rateLimiter/limit and DO/rpc; separate read/cancel rows and validated fetch links; inbound/local body exceptions with proof; existing clone preservation; dormant Workflow paths; and explicit pure helper exclusions. This checkpoint asks Root to review the fixed-P1 proposal and its native/facade/identity distinctions. It does not assert acceptance or complete coverage from unexecuted code.

Remaining work is implementation within the same12paths: install the fixed descriptors and immutable carrier into the two positive-only compiler paths; assert prepared AST counts/hashes before I0; integrate per-isolate/worker/producer-consumer snapshots; preserve full evidence with bounded console summaries; complete the existing8Q contracts and single P1 pipeline; then run only after Root acceptance. No new test group, native graph, timeline, source deadline, permission, account binding or operating-readiness claim is proposed. Source must freeze during active CI. All readiness/completePackage/PCoff flags remain false.


## Accepted map implementation checkpoint — 2026-11-07

Root accepted the dc404 map under Rootdocs 3f29a04dd0c6f5bb362d920979559484295d842e (escalation 15c25f3f1faeb54aa3cd22567544380a44d5baf0; design 39beca07d8704eadd6514903f5dca2ead4db29f2). Source freeze released for implementation and one final coherent 8Q+P1 qualification after the static gate. No additional native execution has occurred.

The approved thirteenth Source path, test/fixtures/finite-budget-descriptors.json, now contains the same proposal data formerly appended to finite-budget-world.mjs. Loading is deterministic through import.meta.url and JSON.parse in Node only. No map or raw source is emitted into a Worker. The compiler/harness dependency is made lazy to permit the positive opt-in plugin without a cycle. Added an unactivated prepared-source selector validator: independent role pins, raw bytes/SHA256, exact M original-source equality, TypeScript AST parse, exact 635 group counts, and duplicate-node selector rejection. Nested D1 prepare/bind/execute nodes remain separate selected nodes rather than being flattened. Existing QA dynamic hashes remain historical provenance.

This checkpoint is implementation WIP, not a preflight/test result. Runtime hooks, body associations, all isolate-epoch snapshots and positive qualification integration remain to be completed. TEMP is unchanged and no Actions activation is requested by this checkpoint. operationalReadiness=false; completePackage=false; PCoff=false.


## Unactivated runtime/compiler WIP preserved after map release

This checkpoint preserves ongoing implementation, at Root's request, before additional fixture integration. It does not activate any hook, TEMP trigger, native run, build or test. The existing eight pure contracts have not yet exercised this draft.

The diagnostics helper now also exports a draft immutable-ALS runtime with weak lease/native/function/body identities, original-invocation closures, native Promise/value/error passthrough, distinct fetch/read/cancel settlement, byte updates on exposed read values only, and original body/clone/reader identity edges. Locally created facade functions are marked without replacing their holders or methods; captured native and bound-native identities remain separate. Native transaction callbacks retain their original argument/function; their existing body can record its received transaction under the captured native transaction scope. Explicit fixture methods receive an excluded observation scope, while actual Source Root/child entries override that scope using their real leases. Unknown business context remains incomplete.

The unactivated Node compiler draft adds fixed package/entry selectors, Source Root/child/phase seams, nested AST invocation transforms, original method/getter/argument evaluation order, facade identity marking and body-origin propagation. Supplemental delegated adapter source facts: five existing clone calls and two JSON body consumers are statically present; only actual P1 executions will be observed. Four ordinary authorization clones/branches are not asserted executed. Original package/raw pins and the 61 composed QA entry Reflect.apply counts remain required; dynamic QA prepared hashes are not replaced by historical goldens.

Outstanding before the single authorized final qualification: finish plugin wiring and exact supplemental seam/identity count gates; connect every M/QA isolate epoch snapshot around remount, checkpoint and cold disposal; integrate full positive lineage and bounded evidence output; extend existing Q groups with runtime semantic checks; inspect final Source changes and then activate the three-job 8Q+P1 workflow once. No green or complete-runtime claim is made. All readiness flags remain false.


## Positive opt-in integration WIP checkpoint

Preserves compiler/plugin plumbing and runtime/Q drafts before the remaining producer/consumer work. No TEMP edit, Actions activation, test, native run or completion claim.

- Positive M compilation alone receives the budget plugin; negative spy and default compilations retain the original options. QA hooks run after the existing fixture loaders and deadline substitutions. The plugin validates independent actual role inputs, raw/package pins, exact selector counts and absence of the Node compiler/descriptor data from emitted Worker inputs.
- The pinned data now records full receiver expansions for all 120 body selector groups, resolved from their original raw lines; e.g. the documentary short selector body resolves to request.body or response.body. Counts and original raw pins are retained; the compiler checks the exact expanded receiver multiplicities. This is not a suffix wildcard over prepared code.
- The exact pinned 64,800-byte QA entry additionally has 81 direct storage/body member sites in 18 groups, plus five prepare/three bind/three first/one all/one run/one direct fetch/two opaque JSON sites. The majority are explicit fixture-only probes/seed/fault branches; the actual normal transaction wrapper's two tx.put leaves must be observed separately from its outer facade. The original 61 Reflect.apply sites remain independently checked. Existing computed kv[method] facade assignments and native bound-method identities are covered without method replacement.
- Actual request clock aliases, existing relative five-second helper children, body-reader capture and immutable phase scopes are tied to their source objects/guard/controller and original invocation. No fresh business Root or clock is introduced. Source-created callbacks retain their function argument, receiver, arguments and original returned Promise/value.
- Eight Q groups remain eight. Draft extensions exercise actual ALS late settlement across two Roots, getter-before-argument order, same native Promise/error/callback-this, native versus outer facade ACK counts, and lazy body access plus separate real stream read/cancel rows.
- Positive fixture wiring captures old M/QA epochs before first-connection remount, connection configuration, optional SDK-only remount and restart. Remaining work includes final/checkpoint/cold-consumer capture, the complete P1/CLI/evidence integration, fixed supplemental hook-count assertions and final static review. R1 complete JSON is preserved before bounded console output. The historical unobserved R0 branch continues to use the default fixture, and is not being rerun.

All changes remain opt-in or unactivated WIP; normal/negative emitted semantics are intended unchanged but not yet tested. No universal native coverage or operating-readiness claim. operationalReadiness=false; completePackage=false; PCoff=false.


## Unactivated scope-event implementation checkpoint — 2026-11-07

Follows Rootdocs a69f10dc085791051570a5868c9d7f62175a4691. The draft now separates bounded logicalScopeEvents, totals.scopeGuardEvents and totals.deniedScopes from explicitly associated per-native-row logicalDenied. The actual fixed fail/finiteNativeFailure throw expression is passed through guardValue once, retaining the identical thrown value; no raw Error, fanout or guard reprobe. Q4 checks fulfilled native work remains fulfilled/unmarked, repeated scope events versus distinct scopes, and explicit operation denial separately. Existing 16384 event cap applies.

Additional immutable carrier plumbing captures four existing request-clock aliases and the fixed bootstrap/old-guard/custody child invocation registrations. The original initial-lease current check remains immediately before its original work invocation inside the captured child context. No callback argument or native Promise is replaced. Corrected an unfinished bind helper delimiter in the unactivated runtime and guaranteed fixture disposal even if evidence capture fails. Owner-reference diagnostics now use a purpose/revision/epochs envelope, preserving local role/epoch ordinals and peaks.

This is preservation only: no preflight/test/native execution, TEMP change or qualification claim. Remaining: exact compiler hook gates, positive producer/consumer/checkpoint integration, P1 and bounded historical log callers, then the authorized final 8Q+P1 run. All readiness flags remain false.


## Unactivated positive-lineage integration checkpoint — 2026-11-07

The draft positive producer opts into the existing principal checkpoint pipeline, retains the actual SDK completion/token/MCP/Notice flow and original I0/C0/C1, captures every producer epoch before native disposal, and includes full owner-reference evidence plus prepared role metadata. The cold consumer uses the original persisted native state and original alarm (restart=false), carries all producer epochs forward, captures cold/final consumer epochs and guarantees disposal. Default non-opt-in paths retain their existing composition.

Added the required positive prepare/verify/consumer interfaces and CLI. instrumentBudgetDiagnostics takes moduleRole={workerRole,path}, a fixed Node-only role/path selector; extendBudgetQualification takes the prepared QA entry. Unsupported kinds still reject before I0. Fixed scope hook counts are checked with exact prepared AST selectors; native compilation also compares role/path/raw pins/selector counts/hook counts to the same-run pure preflight before I0, without treating old dynamic QA hashes as goldens.

P1 is one case that preserves its full result before assertions, then checks actual native cleanup receipt/state/alarm/restore/SDK reduction/final inventory, original 900s lineage and cold margin, role/epoch-local row/counter/byte/link consistency and complete attribution across the twelve phases. Existing R0 remains a historical red branch and will not run. The only two older R2 console callers now persist the full object once and print its bounded hash summary; their assertions and business work are unchanged.

No CI, tests, syntax execution or TEMP activation at this checkpoint. Artifact seal/same-ID verification helpers are prepared; final three-job workflow remains to be activated after editorial static review. Readiness remains false. This is not nine-check qualification or runtime evidence.


## Authorized final nine-check activation — 2026-11-07

Editorial activation review: exactly eight Q groups and one positive P1 case; three dependent jobs (pure 2m, producer 15m, consumer 15m), original principal 900s lineage and two prepared native role graphs. No historical R0/16/56 suite or standalone inventory is scheduled. Pure syntax/lint/Q tests and exact prepared AST closure precede native I0. Producer compilation compares exact role hook/selector/raw-pin records against the same-run downloaded pure preflight. Compile-only gate explicitly accepts this positive preflight while retaining its old inspection route. Removed one unused compiler binding and validated emitted AST syntax before bundling.

Artifact handling: pure, checkpoint and final evidence each have a seven-day artifact, immediate exact-ID download/readback, source/run/attempt and complete path/byte/SHA manifest. Consumer verifies the producer outer artifact and unchanged inner native checkpoint before cold loading. Native persisted files and actual scripts/metafiles remain in the original checkpoint format. Artifact manifests sit outside the inner checkpoint so original exact inventory checks remain intact. No local artifact extraction or DB access is introduced.

Pre-activation remote readback: Source 8b111b89d4a831c6141a0f27886342761cb192e0/tree e5ef8dc4af08ad02a0700598edfefd2a9ec21431; main remains 0c9c475b3ebaa970fc11d628b40e50a90cceb727. Full recursive trees are non-truncated: BASE3179 leaves, Source3187. Exactly thirteen approved Source paths differ from global BASE29681ca; no protected Core/package/SDK/config path differs. Final activation adds only world helper, initial-entry preflight gate, TEMP and this append.

Source is frozen from this activation until CI terminal. This entry records intended execution, not a pass. Any failed gate or native qualification will be preserved and reported without an automatic retry or scope widening. All readiness flags remain false; no real provider/runtime/auth or main/publication action is authorized or performed.


## Final qualification attempt failed before I0 — 2026-11-07 21:34:31 UTC

Status: IN_PROGRESS / NEEDS_CONTEXT for further activation; Task1 is not complete. This appends to and preserves all earlier failed/partial history above.

- Frozen Source: 23e7800ac5ef5c29852473ab98a77d202a1b8534, tree ad3e7f97980155ff4294fcb63c005a862532f5b7; activation report blob0e11183679eec49b66f0cd7c965fd7ea6a0576f1.
- GitHub run42416460642, attempt1, started21:33:55Z, terminalfailure21:34:31Z. Purejob128535508219 failed; positive_prepare128535654120 and positive_consume128535654167 skipped. No retry or second native lineage was started.
- Node22.23.4; locked npm install649packages/17s. Ten syntax checks PASS; focused ESLint PASS with no ESLint warnings/errors (empty lint.log). Q1–Q8 all PASS: tests8/pass8/fail0/skipped0,157.335681ms. This is eight pure groups only, not nine-check qualification.
- Exact prepared AST closure command failed at21:34:25Z with exit13: Node reported unsettled top-level await at finite-budget-world.mjs:627, awaiting preflightBudgetCompilation. There is no compiler graph/native setup/I0 marker and both dependent native jobs were skipped. No actual SDK/Notice/cold/alarm/reduction/P1 result was produced by this attempt.
- Source diagnosis: CLI top-level-await waits for the dynamic import of finite-initial-entry-world, whose new static import of finite-budget-world waits for that still-evaluating CLI module. This is an ESM module-evaluation cycle, not evidence of an unmatched native descriptor. Minimal proposed correction is dispatching the existing CLI async function after world module evaluation without top-level await. No correction or rerun is claimed here; reported to Root before any retry.
- Failure artifact13591143645: finite-budget-pure-23e7800ac5ef5c29852473ab98a77d202a1b8534,1614B, ZIP SHA256 c5e4cf831bdcf4e60dceb2c71221da8ce802cc123deba9d68b0e13c61d93a6b4. Created21:34:27Z, expires2026-11-14T21:34:26Z, expired=false. Exact four paths: budget-artifact.json,lint.log,preflight.log,tests.log. Immediate download by the SAME ID13591143645 reproduced the same ZIP digest and verified source23e7800/run42416460642/attempt1 plus exact path/byte/SHA inventory. Manifest695B, SHA256 eba29e78db14fd36c3ff89c6c735288b055f16955eff43f7c8a618db4c5b9b5c. API metadata and decoded job logs were independently read back after terminal. No local ZIP/DB extraction was needed.
- External tooling warnings retained in job log: npm package deprecations and GitHub action Node20→24 runtime warning; none was the failing gate. The sole observed gate failure is the CLI import cycle.

TEMP is retired in this terminal cleanup commit. Source implementation remains preserved and unqualified; no automatic retry, main update, PR/publication, provider/runtime/auth action or owner request. operationalReadiness=false,completePackage=false,PCoff=false; real Workflow execution, global native drain and SDK namespace emptiness remain unproved. Root's fresh Spec/Quality review and Task2 remain pending. Further Source fixes/activation require Root's concrete continuation ruling under the failed-run condition; STOP_WRITES after terminal readbacks unless that ruling arrives.


## Focused CLI cycle correction and corrected qualification authorization — 2026-11-07

Root resumed this same Task1 at Source21d795f3b2a359266fa2d22ae6a74a28216cfc30. Binding Rootdocs976be2c15de7f811a2406eaa130883db10ec40c3 records independent verification of failed run42416460642 and the world CLI→dynamic initial-entry→static world module-evaluation cycle. Root authorizes one focused correction and one corrected final-nine qualification, not a general retry or new scope.

Only the world CLI dispatch changes: the same filename/argv/command branches now execute in an async main scheduled by setImmediate after the module completes evaluation. Its rejection handler prints the error and explicitly sets process.exitCode=1; no unobserved rejection or success-on-error path is intended. Non-CLI imports remain inert. All world text before the CLI block is byte-for-byte unchanged; selectors, runtime observation, Source guards/clocks/TTL and business code are unchanged for this correction.

The exact three-job TEMP from failed Source23e7800 is restored unchanged (workflow blob8e940dcf91efcdbc167088386c086ef90cc87578). New revision must run all8Q plus exact AST preflight again before any I0, then the same original900s principal producer/P1 consumer; old8PASS cannot be added to a new P1. Same contents:read/self-path push trigger, timeouts, seven-day artifacts and exact-ID readbacks. Source freezes on activation until terminal. Another failure will be preserved and reported without automatic retry/widening. Prior failed history above is retained. All readiness flags remain false; no actual provider/runtime/auth/main/publication action.


## Corrected CLI run failed at emitted AST parse gate — 2026-11-07 21:42:43 UTC

Status remains IN_PROGRESS / NEEDS_CONTEXT; Task1 is not complete. The one correction/run authorized by Rootdocs976be2c15de7f811a2406eaa130883db10ec40c3 is exhausted. No automatic retry or further instrumentation edit follows this failure.

Frozen Source7eeb66bca9e4bbc52487f31d6999e2d73ab37b7e/tree01a3fb039df215d5d6d72841b748a0523dcde936, world9898bd775d9ee544082d60b1476dbf85f1d432cd, reportad14b8f5fc28c9825cefe9f9c6242de7d076fae0. Run42417096301 attempt1 started21:42:03Z, terminalfailure21:42:43Z. Purejob128537445920 failed; positive_prepare128537598861 and positive_consume128537599462 skipped.

All ten syntax checks and ESLint passed on this NEW SHA; Q1–Q8 again tests8/pass8/fail0. No old result was carried forward as a new pass. The CLI correction is causally supported: command progressed to harness-start, MODELED compile-only namespace DATA, and M-compile-start, instead of unresolved-TLA exit13. The explicitly caught compiler failure returned exit1. No native I0, SDK flow, checkpoint, alarm or P1 occurred.

The actual M build failed with19 emitted-source parse assertions. This is a distinct previously unexecuted preflight failure family; the raw/prepared source hashes/selectors are not silently relaxed. Complete reported family (diagnostic count is a parser-error count, not native I/O):

- lib/mcp-qa-finite-owner-native-wire.mjs: 17
- lib/mcp-qa-finite-owner-notice-get-forward.mjs: 4
- lib/mcp-qa-finite-owner-notice-consent-body.mjs: 4
- lib/mcp-own-successor-host.mjs: 17
- lib/mcp-own-successor-retirement-host.mjs: 38
- lib/mcp-qa-finite-policy-setup.mjs: 79
- lib/mcp-own-durable-host.mjs: 93
- lib/mcp-own-synthetic-save-host.mjs: 20
- lib/delegated-oauth-worker.mjs: 1
- lib/delegated-oauth-store.mjs: 125
- lib/mcp-qa-finite-preparation-store.mjs: 128
- lib/mcp-retired-custody-reader.mjs: 5
- lib/mcp-activation-observer.mjs: 40
- lib/mcp-qa-finite-seed-wire.mjs: 16
- lib/dossier-monitoring-authority.mjs: 165
- lib/mcp-own-finite-reduction.mjs: 48
- lib/mcp-own-finite-cleanup-proof.mjs: 5
- lib/mcp-own-finite-primary.mjs: 69
- lib/dossier-supervision.mjs: 19

Bounded source-inspection hypothesis, not a verified cause/fix: world.parseExpression constructs a separate SourceFile fragment and returns its parsed child with fragment positions; those nodes are later inserted into another SourceFile and emitted by that file's printer. A foreign source-range/synthesis interaction could corrupt emitted literals. The present failure artifact contains only module/count assertions and build stacks, not a focused emitted location/excerpt. The next useful diagnostic is a minimal pinned transform witness and first generated parse location to distinguish this from another visitor/printer defect; no source/selector weakening, new map or guessed golden count is justified. Reported this uncertainty and minimal next evidence to Root.

Failure artifact13591583752, finite-budget-pure-7eeb66bca9e4bbc52487f31d6999e2d73ab37b7e,3286B, ZIP SHA256529bd5c2f92e448e55391f3d265f420ffba20a23f95d992786e50257e2377c35; created21:42:37Z, expires2026-11-14T21:42:37Z, expired=false. Four files: budget-artifact.json,lint.log,preflight.log,tests.log. Download by SAME ID13591583752 reproduced ZIP digest and verified exact source/run/attempt and complete path/bytes/SHA inventory. Manifest697B/SHA2562b3bfc7fb16f7b253b0d82a4876057374c770459eca7c1b92d5a41e6f2bb73a7. API metadata/job logs independently read after terminal; no local ZIP extraction, dependency install, process, DB or project execution.

TEMP retired again by this cleanup commit. All prior history is preserved. Source remains unqualified; main/protected paths and readiness flags unchanged. STOP_WRITES after CAS/report/tree/main readbacks pending Root continuation ruling. Fresh Task1 Spec/Quality and Task2 remain pending.


## Approved bounded compiler diagnostic activation — 2026-11-07

Root approval: Rootdocsda29bc3d53ea1fcc2fbc9f0724935c1eaa0dccee, ledgerdb544335690b38d1bd6ebe230ec642b323e16ed0 (following G2 ruling521eb6963133f72683767ee5b6562effa970660b). This authorizes ONE diagnostic run, not a compiler fix or another final9. Source before activation294e88ee95bc187acf22c7699b91daef696ce0e3/treeff62e80167f3e128ef8eae277cd30cd13b601c12; main independently read again0c9c475b3ebaa970fc11d628b40e50a90cceb727. Prior full-tree3186 leaves/12 approved differences/protected equality remains tied to that unchanged tip.

Exactly three edited paths: world sourceAST failure-message enrichment only, existing TEMP, this append. parseDiagnostics.length===0 remains strict. No parseExpression/visitor/selector/map/runtime/Source behavior correction. New bounded failure metadata: parser count and first code/start/length/line/column, full emitted bytes/SHA, and at most240 characters of context. No full actual emitted module is retained.

TEMP runs one contents:read/self-path-push Ubuntu/Node22 job≤3m with unchanged locked npm ci. It checks world syntax, then runs one inline Node diagnostic importing TypeScript and world as a non-CLI library. No initialEntryHarness, esbuild build, Miniflare, full graph, business-module evaluation or nativeI0. Exact lock445991B/SHA846c4d28819170cfd188ebf1e78fc19878c9aa97b41d73ce7710a6c0cd9ece34/blob36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b; installed TypeScript5.9.3 version/integrity recorded against lock. Current parseExpression179B/SHA6d87bb59a40fbf99c3d738499e734ce130e9a7ecf18d7c41ba1bc85d75a22933 must equal the copied diagnostic function exactly.

Witness comparison inserts the same fixed JSON fragment into two tiny different SourceFiles using the current parser/printer pipeline. Foreign parsed nodes and factory-created nodes are compared only inside the diagnostic, not applied as a fix. Four rows record escaped source/emitted text (each≤2KB), hashes and parser diagnostics. One actual pinned delegated-oauth-worker33008B/SHA3161d183fac7bb31b5bd863deba7f0641400b4f0ef5709c940f11e5441125318/blobd979f395029c9b1e66a99222d06acf99eba4f358 undergoes the unchanged exported M transform exactly once; its current count1 strict assertion is captured as evidence. Total witness≤20KB; each artifact input≤64KB.

Artifact exact paths witness.json,console.log,manifest.json; source/run/attempt/path/bytes/SHA, seven days, upload and SAME-ID download with independent inline built-in Node exact readback. Diagnostic SUCCESS means captured evidence only: compilerFixed=false,qualificationPassed=false,I0Opened=false,nativeExecutionProduced=false and all readiness flags false. Source freezes until terminal; then preserve outcome, retire TEMP, verify CAS/tree/main and STOP. All G1/G2 failures above are retained; no final9 retry authorized.


## Bounded compiler diagnostic outcome and retirement — 2026-11-07

Diagnostic run42418045543 attempt1 succeeded at Source6880630593a68f1d892bdc4ea21d241e8102ad48/treeed2b9f58dea4943127c60585ffac7683148e3bff, world4bc8668b38fbe6d7acfe69ceb07cc0628899ff86. One job128540284113; started21:54:09Z, terminal21:54:33Z. This is a captured diagnostic, NOT a fixed compiler, passing preflight, nine-check qualification or native execution. No tests/fullgraph/esbuild/Miniflare/I0 ran.

Root performed the sole additionally authorized RAM inspection of the SAME artifact13592805304 because exact synthetic emissions were absent from logs. No duplicate inspection by Source implementer. Bounds held: ZIP2689B, expanded6402B, builtincrypto/zlib, no filesystem/process/dependencies/content execution; buffers released. ZIP SHA25683980ec0585028c61228be3ec5728b72afa14e16df52607702f76535dfb0888a; exact paths manifest.json673B/SHA b2472abb89e6ebe5f84c882f9c4e0c204df911e52119ff9ff53f31e9caf63d66, witness.json5334B/SHA89055318962b23a5dd2e2005951aa77057407364fe4b420bec16f9622a9d2011, console.log395B/SHA9dfe0ee60ca4eccc3c34080090fb3043b8b2321c2955c6cbd81c06ece596b0cd. Source/run/attempt/path/byte/hash verified by Actions SAME-ID download and independently by Root RAM inspection. Artifact expires2026-11-14T21:54:29Z. Locked TS5.9.3, exact lock/world/function pins confirmed.

Exact bounded emissions below use JSON string notation so newlines/quotes remain explicit. Own arithmetic SHA recomputation over the strings supplied by Root matches every provided digest; no code was executed.

### A foreign

41B; SHA256 aaffd1c2fdc9a2250edb0e0b3717042d2937b70a5efc704bbfc4ab3e9abc99fa; parser diagnostics 5.

```json
"const target = observe({ = 0;\n    :  });\n"
```

### A factory

49B; SHA256 689b246743ab85100f5ca0e16da6cfa36854d9bd9e2bf33a73680b2a384eab70; parser diagnostics 0.

```json
"const target = observe({ \"operation\": \"read\" });\n"
```

### B foreign

83B; SHA256 e7b77f2dd8ff025650e0ec74d21ad0cba16b02a266f3f3ca767f325242dcba32; parser diagnostics 2.

```json
"const padding = \"different file\";\nconst target = observe({ g = \"differ: nt fil });\n"
```

### B factory

83B; SHA256 b9c582b19374e7bd186a7edb4b6388ba97aeb5896299dcc85eb8b5986832d023; parser diagnostics 0.

```json
"const padding = \"different file\";\nconst target = observe({ \"operation\": \"read\" });\n"
```

This is not merely different formatting. A foreign metadata fragment containing operation/read emitted pieces of the first destination declaration (=0), and changing only destination source made it emit pieces of that destination's padding string. Both foreign variants fail to parse (5 and2 diagnostics); factory-node variants preserve operation/read and parse with0. Root accepts the demonstrated cause: parsed foreign fragment nodes retain coordinates subsequently interpreted in the destination SourceFile. The conclusion is bounded to compiler-generated inserted nodes, not original business AST nodes or universal graph behavior.

The unchanged actual M transform of pinned delegated-oauth-worker33008B/SHA3161d183fac7bb31b5bd863deba7f0641400b4f0ef5709c940f11e5441125318 retained strict failure:1 diagnostic, code1136, start5950,length1,line52,column80. Emitted43990B/SHA3bc9aaa9a6104595c13c483363045503dd9223145b47e6c9059dff15697acce6. Bounded context includes corrupted generated call: __afwBudget.member(reader, uthAutho, { thAuthoriza: ionServe, , OAuthResourc: false }, false, false). This agrees with the synthetic causal witness. Original raw Source was not edited or evaluated.

TEMP retired in this terminal cleanup. All G1/G2 failure history retained; diagnostic parser-message enrichment remains only for honest bounded errors. No compiler correction or final9 retry is authorized by this outcome. compilerFixed=false,qualificationPassed=false,I0Opened=false,nativeExecutionProduced=false,operationalReadiness=false,completePackage=false,PCoff=false. After final CAS/report/tree/main readbacks: STOP_WRITES; send minimal remediation/regression proposal to Root before any further Source mutation or CI.


## G3 explicit factory correction and final-nine activation — 2026-11-07

Authorized by Rootdocsd79d016a994ea03d7dd5adad6ab0f2c88ea428a8, ledger22ca669b1c7d8c4892c74922250381d0a5e730fe, canonical814ed6715c0c4f84bd82c35ea314d47b6fb45fd6. Same Task1/sole Source writer, startingfc62a91842f2b79af2749159d0d30778be84b174/treefb44d2f682344a47ecdc8db7ba85b07e704fdd85. Main freshly unchanged0c9c475b3ebaa970fc11d628b40e50a90cceb727. Only world/Q5/report/TEMP change for G3.

Focused correction: inserted JSON metadata is constructed with ts.factory rather than parsed in a foreign SourceFile. Supported plain data preserves key order, strings, nested arrays/objects, booleans/null, finite numbers and JSON zero normalization; sparse array holes become null. Unsupported values/prototypes/symbol fields/cycles reject. Property descriptors are inspected without executing accessors; accessors reject. Nine inserted scope-expression callsites now use a six-form fixed factory allowlist (three original+5000 expressions, parent.lease, two original conditionals). No generic expression interpreter, original business-node coordinate mutation or cloning. Unused parseExpression removed. Source selectors/pins/counts, runtime, callbacks, guard/clock/TTL and all business behavior remain untouched; raw and emitted parse gates stay strict.

Q5 regression was drafted before the correction and retains every earlier runtime/Promise/receiver/callback assertion. It exercises the SAME exported Node-only compiler builders in both exact causal destination SourceFiles, reparses emitted output and independently checks literal operation/read, nested JSON values/order and -0 normalization. It rejects accessors without invoking them, unsupported forms and cycles. All six fixed scope expressions are printed/reparsed and checked against hand-authored AST semantics. One actual delegated-oauth-worker source is pinned33008B/SHA3161d183fac7bb31b5bd863deba7f0641400b4f0ef5709c940f11e5441125318; its actual exported transform must parse with0 diagnostics and retain reader/read/cancel literal metadata. No business Source evaluation or native fixture runs in this regression. Exactly8Q groups remain.

Read the TDD and verification-before-completion skills plus writing-good-tests reference. Root explicitly accepts preserved G2/causal diagnostic as RED and forbids another standalone RED/inventory run; this specific authorization overrides generic skill suite expansion. No local project code/build/test/dependency execution occurred; only small instruction-file reads. No passing claim before the fresh G3 result.

Restored EXACT original three-job TEMP blob8e940dcf91efcdbc167088386c086ef90cc87578, independently fetched/read back. G3 runs new-SHA syntax/lint/8Q and strict complete prepared preflight before I0, then the original principal P1/900s/C0/C1/Root30s/child5s pipeline. No extra case, lineage or timing relaxation; source freezes activation→terminal, seven-day same-ID artifact readbacks, terminal retirement/report/readbacks/STOP. Further failure means preserve evidence/NEEDS_CONTEXT, not auto-retry. All prior G1/G2/diagnostic history retained; all operational/readiness claims remain false.


## G3 terminal failure: QA reference-context rewriting — 2026-11-07 22:05:04 UTC

Run42418864856 attempt1 at frozen Source42debdc2dadc14543f48cbc768816ac1ed16ac2c/treec57ce6e87d231fd6c9923344e6b723936046e374, world5fe06a77f51ed8af1079da27002f5e404d63661b, Q520d8c80bc1bf321d689c1bbbddd5036564b6262a. Started22:04:33Z, terminalfailure22:05:04Z. Purejob128542767084 failed; positive_prepare128542892044 and positive_consume128542892514 skipped. No I0/native lineage/P1.

Fresh syntax/lint PASS and exactly8Q PASS (8/8,0fail), including new actual compiler-node regression. The prior foreign-fragment corruption is fixed for the tested boundary: both causal fixtures and pinned delegated module now pass Q5, and complete M compilation reached M-compile-done. This does not prove complete QA/preflight/native qualification.

QA esbuild then rejected10 Invalid assignment target expressions in emitted stdin, at line:column555:75,571:16,596:40,618:16,874:20,909:220,1050:146,1050:215,1272:16,1274:16. Examples are update targets rewritten as calls (++__afwBudget.readMethod(state.counts,"transaction",...), state.counts.list++ rewritten to readMethod(... )++), and binding assignment targets rewritten to nativeHolder(...) = original. TypeScript parseDiagnostics alone does not reject these reference semantics; esbuild's strict build correctly stopped before I0. No selector counts or Source guards were weakened to bypass it.

Root independently inspected the same primary logs and identified the distinct visitor read/write-context defect: native binding/storage capture runs before assignment-target checks, while readMethod only avoids binary-left positions and not update operands. Required static follow-up is one coherent reference-context predicate across affected identity branches, preserving direct assignment/update targets while still observing receiver subexpressions actually read (binding.get=fn still reads binding). No fix or further activation authorized at this terminal checkpoint; no extra diagnostic run needed for the concrete emitted errors.

Artifact13592134907, finite-budget-pure-42debdc2dadc14543f48cbc768816ac1ed16ac2c,2197B, ZIP SHA256e748b322b2275927cc96662934a004accabb70cdce17003d0bc44a47d8aae118. Created22:05:01Z, expires2026-11-14T22:05:00Z, expired=false. Exact four paths budget-artifact.json,lint.log,preflight.log,tests.log. SAME-ID download/readback PASS with exact source/run/attempt/path/bytes/SHA; manifest696B/SHAa98f61af077516525a235d4b18c758b66573e9dc6d4ef69c56c026e9ddc12d63. API metadata and job logs independently read after terminal. No local artifact extraction/DB access.

TEMP retired in this cleanup. Preserve all prior G1/G2/diagnostic evidence and this G3, STOP_WRITES after CAS/report/protected-tree/main readbacks, then send only bounded static remediation/regression proposal. All readiness flags remain false; Task1/fresh reviews/Task2 incomplete. Owner steering now plans PC off23:00UTC7Nov and Root close22:55UTC: no inflight run or unsaved work at that cutoff; any separately authorized future attempt must fit the unchanged original900s lineage and readback/retirement, without extending time windows.


## G4 reference-context correction and bounded final-nine activation — 2026-11-07

Authorization Rootdocs5ccc3de6dcb6c6d5426d78d18630abb2ddc89474/ledger44d7310254887ae59c37f5f92482eed359be75af/canonical107d48891ddd181cd9c2122c8ef47785c2ffe9e0. Starting Sourceb305ca3deac19546f28169bfc71d6703f145e47f/treea87c3a80b1e5fb32f154e00a4042bad2d89a8687; freshly verified main0c9c475b3ebaa970fc11d628b40e50a90cceb727 unchanged. Only world/Q5/report/TEMP changed; the approved13path boundary and all earlier failures remain intact.

One shared isBudgetReferenceTarget(original) covers direct assignment operators, ++/--, delete, for-in/of initializers and destructuring targets through parentheses, SpreadElement/SpreadAssignment, array/object-property initializer wrappers and defaults. It stops at a larger member receiver or computed key. The compiler still visits children exactly once before this classification: binding.get=fn retains the actual binding receiver read, while .get remains an assignable reference. The former broad BinaryExpression exclusions are removed because comparison/RHS reads are real reads.

Only the existing compact property/element identity-access block was factored into rewriteBudgetIdentityAccess, a Node-only helper used by BOTH the real transform and Q5. It covers binding/storage/body/readMethod/methodValue observations uniformly. Native call selectors,130path/635group map,pins,Source/runtime/Root/guards/clocks/TTL and callback behavior are unchanged. Identity counts now describe legitimate read contexts rather than invalid rewrites. No broad visitor redesign or new holder/method wrappers.

Q5 retains all earlier assertions and actual G2 compiler regression. New actual-helper assertions compile emitted controlled snippets with esbuild.transform (no bundle/fullgraph/native) to reject invalid assignment targets beyond TypeScript parseDiagnostics. The snippets cover update/direct/compound/logical assignments, parentheses, delete, object/array rest, default RHS and for-in/of targets; they separately require legitimate binding receivers, computed body keys, default/comparison RHS body reads and captured method reads to remain observed. A small self-authored synthetic getter/setter fixture compares original and emitted outputs, exact getter/setter order, counts and deletion, without evaluating any actual business module. Exactly8Q groups remain. G3 is the preserved causal RED; no standalone diagnostic/inventory replay.

Original three-job TEMP restored EXACT blob8e940dcf91efcdbc167088386c086ef90cc87578 after independent readback. New SHA must run8Q+strict full M/QA prepared preflight before I0, then original principalP1/900s/C0/C1 with unchangedRoot30s/child5s. No extra attempt,lineage or timing margin. Source freezes activation→terminal; artifacts7days/SAME-ID readbacks, terminal TEMP retirement/fullreport/CAS/protected/main/STOP. Activation permitted only before22:28UTC; editorial readiness time22:15UTC. Root closes22:55UTC and owner PCoff23:00UTC; this does not authorize late/inflight work or clock extension. Another failure is evidence/NEEDS_CONTEXT before further changes. All operational/readiness flags remain false; no pass claimed before fresh evidence.


## G4 terminal syntax failure in new Q5 fixture — 2026-11-07 22:16:49 UTC

Run42419815858 attempt1 at Sourcece65a00531ff00410d305ad8fb4ff6a26fcd3384/tree73f1c2c4526edbebbf44471f980002c3721b022e. Activated22:16:14Z before cutoff; run started22:16:18Z, terminalfailure22:16:49Z. Purejob128545613974 failed; positive_prepare128545734229 and positive_consume128545733743 skipped. No nativeI0, preflight or Q groups ran.

The syntax loop stopped at test/finite-budget-diagnostics.test.mjs:194: SyntaxError: Identifier 'observed' has already been declared. The new controlled identity fixture introduced const observed in the same Q5 function scope as an existing later runtime assertion's const observed. This is an implementer-created test binding collision. It does not prove success or failure of the reference-context predicate. Earlier files in the syntax loop, including world, parsed; the full syntax set did NOT pass, ESLint did NOT execute, tests did NOT execute. No earlier8PASS is counted for G4.

Primary job log retains the exact error/caret and exit1 at22:16:42Z. The always-run artifact seal/upload/readback succeeded, but because syntax runs before tee commands, the artifact contains ONLY budget-artifact.json (files=[]). Artifact13593072163,338B ZIP/SHAf249121765d1889d56e04e4b9572348663f1fe6017d9fb8bd9e074c64d946295; manifest262B/SHA41b4100aff4693a5834a5115fe6b0d76cc61cfc72ab2004b912e5d3eb96aa706. SAME-ID downloaded readback verified the actual one-file inventory/source/run/attempt. Created22:16:43Z, expires2026-11-14T22:16:43Z, expired=false. Artifact does not contain test/preflight/lint logs; diagnostic evidence is the independently read decoded primary job log128545613974 and this append. No claim of complete test evidence or nine-check success.

Reported immediately to Root. Minimal prospective correction is renaming only the newly introduced fixture-local observed binding and its uses (e.g. identityObserved), with no predicate, scope, expectation or business change; no correction or retry has been made. TEMP retired by this cleanup, then CAS/report/tree/main readbacks and STOP_WRITES. Any further action requires Root ruling within the unchanged22:28 activation/22:55 closure cutoff. All failures/history preserved; Task1 remains incomplete and all readiness flags false.


## G5 final attempt today: mechanical Q5 binding rename — 2026-11-07

Authorized only by Rootdocsed56bb9c8d51092c651f14cd00f0ea2813a13755/ledgerbcf0f2a17494987d7c3dfc8be71007d4f3b6c2b5/canonicalfeb7536619827b57165e7b42c9e89392cb90f036. Source68a65ff881a2ce9f90307dde303ba60de1a3b8f2/tree12a024cab26240b28b8b5884a66cf9ae1a179930 is the preserved G4 baseline. Main freshly unchanged0c9c475b3ebaa970fc11d628b40e50a90cceb727.

Exactly8 identifier tokens in the NEW five-line controlled fixture fragment change from observed to identityObserved (declaration+seven uses). Exact prefix and suffix string comparisons PASS; every byte outside that fragment is unchanged, including the original later const observed=runtime.control(...), all test expectations, all8Q groups, world/predicate/runtime/Source. No other implementation correction.

Before:

```js
 const untouched=execute(semanticSource),observed=execute(semantic.source);
 assert.deepEqual(observed.result,untouched.result);assert.deepEqual(observed.trace,untouched.trace);assert.equal(observed.deleted,true);
 assert.deepEqual(observed.trace,['binding-set','binding-get','method-set','body-get','storage-get','body-get','body-get','method-get']);
 assert.deepEqual(observed.result.counts,{list:1,transaction:1,get:2,sync:1});assert.equal(observed.result.sameMethod,true);
 assert.deepEqual(observed.observations,['holder','body','holder','method','body','body','request-method']);
```

After:

```js
 const untouched=execute(semanticSource),identityObserved=execute(semantic.source);
 assert.deepEqual(identityObserved.result,untouched.result);assert.deepEqual(identityObserved.trace,untouched.trace);assert.equal(identityObserved.deleted,true);
 assert.deepEqual(identityObserved.trace,['binding-set','binding-get','method-set','body-get','storage-get','body-get','body-get','method-get']);
 assert.deepEqual(identityObserved.result.counts,{list:1,transaction:1,get:2,sync:1});assert.equal(identityObserved.result.sameMethod,true);
 assert.deepEqual(identityObserved.observations,['holder','body','holder','method','body','body','request-method']);
```

Only Q5/report/TEMP paths change. Restore EXACT original three-job TEMP blob8e940dcf91efcdbc167088386c086ef90cc87578. G5 is the LAST qualification attempt today; activate only before22:28UTC (rename/comparison prepared22:20:27UTC), run every new-SHA8Q+strictM/QApreflight beforeI0 then originalP1/900s/Root30s/child5s/C0/C1, without priorPASS summing/newcase/clock extension. Source freezes until terminal; artifacts7days/SAME-ID readback and terminal retirement/fullfailurehistory/CAS/protected/main/STOP. A failure permits evidence/analysis only, NO G6 today. Root closes22:55UTC/ownerPCoff23:00UTC; no late/inflight extension. All readiness claims remain false and no test pass is claimed at activation.

## G5 terminal outcome — 2026-11-07, Task1 NEEDS_CONTEXT

The LAST authorized qualification today ran at source bbe7e518eac6b548e05384806da2f78c66c2e1e7, tree215644d0342d7794890e555699ddbd5f5ab7ba80, report8a267b179e36558b09e7253b9f0f7c0cefc3d4a2, unchanged world8e6b4600a0d402b4123f303b16ca227136825940, Q75d39b53c06c1891ae8ed6786a4c7e3dae6f516e, exactTEMP8e940dcf91efcdbc167088386c086ef90cc87578. Activation22:21:12UTC was before22:28 cutoff. Source remained frozen through terminal. Run42420218406 attempt1 is completed/failure, updated22:37:34UTC: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42420218406

- Pure job128546815140 SUCCESS: syntax of10files, ESLint, all8Q (8pass/0fail), strict independent M+QA prepared AST/compiler preflight PASS on THIS source beforeI0. This establishes that the prior G1–G4 compiler/syntax failures are no longer reproduced in this run; it is not Task1 qualification.
- Producer job128546981834 SUCCESS. Actual native graph mounted, SDK/token/MCP/Notice/owner-reference preparation assertions completed. Original I0=1794090145000, C0=1794091045000, C1=1794091225000 (900000ms then180000ms), nativeDbNow1794090223534. Deliberate unchanged wait until C0−120s ended22:35:25. Original checkpoint46files, inner manifestSHAef28ec2419933c97ef427326baf4649128110803298ef08e6b6680b8a6cf92bc. Modeled provider bootstrapStatus=complete/recorded1794090223679; realWorkflowTerminationProved=false. Full owner-reference output15,687,617B/SHA19a1d20f949e9e21e4653117e84c03f885605d974bf4f9d472d9bee980ae2321 preserved in checkpoint artifact.
- Consumer job128550183737 FAILURE. P1 ran once (1test/0pass/1fail, duration91992.398558ms), failed at test/mcp-qa-finite-budget-native.test.mjs:87:10 with ERR_ASSERTION, producer|0|QA, coverage.overflow actualtrue expectedfalse. The full result was persisted before assertions: output/finite-budget/positive/full-result.json,40,267,275B/SHA9746051b92b7454b4932d2bbf860b9348a0e19c5c91e762a6a4255da39578989.
- All preceding P1 business assertions passed: original C0/C1, cold ready≤C0−30s, native DB now≥C0, alarm null, state complete, one restore, baseline pointer, both KV aliases, receipt businessAccessClosed and sdkReductionReturned with SDK hashes, explicit false globalNativeDrainVerified/sdkNamespaceEmptyVerified, native fence/revoked-or-absent grant, grant/revoke Notice rows, final inventory proof, producer completeNormal1/referenceRows1/readbacks>0, SDK expiry≤C0. They do not waive failed diagnostic coverage. Later per-epoch invalid/unattributed/denominator/phase assertions were NOT reached after the first overflow failure; no claim that they pass.
- Therefore the coherent qualification is 8Q PASS plus P1 FAIL, not9GREEN. No previous attempt is summed into this run.

All three artifacts were uploaded with7-day retention and downloaded/read back by their SAME actual ID in Actions, verifying manifest source/run/attempt/path inventory/bytes/hashes:
- ID13593821080 finite-budget-positive-bbe7e518eac6b548e05384806da2f78c66c2e1e7: ZIP751744B/sha256:8a315c7bf559d621d9df681dcef75377bfd34483f15bc1c709851687a782742b, expiry2026-11-14T22:37:29Z.
- ID13593397013 finite-budget-checkpoint-bbe7e518eac6b548e05384806da2f78c66c2e1e7: ZIP11877670B/sha256:1fce769cf45b982863a354a65947311306d9ac0d137ffb5c2a3727b2c5d65da3, expiry2026-11-14T22:35:25Z.
- ID13593241365 finite-budget-pure-bbe7e518eac6b548e05384806da2f78c66c2e1e7: ZIP25885B/sha256:062774f5f663be7bdb453a16ca0464d7d633392a79555780ae31b2b8cf0ba4ff, expiry2026-11-14T22:21:51Z.
- Pure13593241365:5files, manifest846B/SHA8d42424578d27964e6728cbc14dc6deab58dd63e57f465ae0ed5bb960640ec69.
- Checkpoint13593397013:49files, manifest10653B/SHA14c33a40f636e915e1229954d80fa667d60cdedcb2e189ddaa26259b6efe4dd8; consumer independently downloaded/verified same ID too.
- Positive13593821080:4files, manifest717B/SHA6a5193d213864ce364c3bca24b0c729f70d6738576515a3ac0adebae9b2d792a.
No artifact/DB/full-result download or extraction occurred locally for this outcome. The40MB JSON remains preserved in cloud evidence.

Bounded static diagnostic: createBudgetDiagnostics retains the existing16384 event cap. event() is called by root, child, begin, bytes, logical, scopeLogical, cancel, settle and incomplete, including repeated root/child calls before deduplication and lifecycle updates; this cap is not a native row count. snapshot does not export the internal events counter or per-event-type counts. overflow proves >16384 event() calls for producer|0|QA, but the current primary logs do not expose rows/resource/phase/scope totals or the causal distribution. No row-count, native-IO-count, data-volume cause or redundant-hook cause is inferred. Native API invocation counts do not equal physical network attempts. A bounded read-only cloud inspection of this existing positive artifact could project saved epoch aggregates without rerunning native work; it requires a separate concrete Root ruling. No cap increase, filtering, row deletion or speculative fix is made.

Terminal action is report append and TEMP retirement ONLY. Preserve all implementation bytes and all earlier R0/inventory/G1/G2/diagnostic/G3/G4 history above. Verify cleanup commit by CAS, full recursive tree/protected BASE diff, report exact-content readback, unchanged main0c9c475b3ebaa970fc11d628b40e50a90cceb727 and no cleanup-triggered run; publish final hashes to Root after readback. STOP_WRITES after retirement; no G6 today. All operationalReadiness/completePackage/PCoff false. No provider/runtime/auth/main/PR/publication/human steps. Fresh Task1 Spec+Quality review and Task2 remain pending; Task1 is NEEDS_CONTEXT.

## Approved G5 existing-artifact aggregate inspection — activation checkpoint

Root explicitly authorized ONE cloud-only read-only inspection after cleanup868f158e47f567505559d037b891d9669ff43874. Only report and existing TEMP change; implementation remains byte-identical. This is not G6, a qualification, a native replay or a cap change. One Ubuntu job≤3minutes, no checkout/npm/dependencies/MF/tests/business imports/DB/other artifact. Python standard library receives platform token only for two fixed api.github.com artifact metadata/ZIP routes; automatic redirects disabled. ZIP redirect requires HTTPS approved GitHub artifact-storage host and is fetched without Authorization; further redirects rejected. Signed URLs/token/raw HTTP errors never logged; failure emits only fixed stage enum.

Input artifact13593821080, sourcebbe7e518eac6b548e05384806da2f78c66c2e1e7/run42420218406/attempt1, exactZIP751744B/SHA8a315c7bf559d621d9df681dcef75377bfd34483f15bc1c709851687a782742b. ZIP≤1MB/expanded≤100MB in cloud RAM. Exact4 paths budget-artifact.json/epochs.json/full-result.json/tests.log and every manifest byte/hash checked; manifest717B/SHA6a5193d213864ce364c3bca24b0c729f70d6738576515a3ac0adebae9b2d792a, full result40267275B/SHA9746051b92b7454b4932d2bbf860b9348a0e19c5c91e762a6a4255da39578989. Contents are parsed as data, never executed or extracted to disk.

Projection≤64KB contains only numeric/boolean/fixed-known enum values: per-epoch coverage/retainedRows/missingRows/numeric totals, counts of retained roots/children/scopes/logical events, saved phase/resource aggregates and retained phase/resource/operation/status distributions. eventCalls=null/not_exposed; no reconstruction of unknown event count or inferred cause. Output safe summary to logs and summary.json+manifest.json only,7day artifact and SAME-ID download/hash readback. Original evidence unchanged. Freeze Source through terminal, retire TEMP/report/readbacks/STOP by22:55UTC. No retry, fix or G6 authorized.

## G5 artifact aggregate inspection terminal result — 2026-11-07

Root ruling cf3256b739f477d6c20a16b64b4e55563f09bf42 / ledger78619bc65a437b14b6d137b207b6370e22a8f9fa / canonicalb75d2dc2eb3b3dceedd497ab3b1d17dcd381bb1b. Inspection Source189406aaf6a30a87392dedd310ef868390aceccd/tree36b680c0803ec55f570b7c65075ce6b09a06488f; exact TEMPc0bf61761cbda929b86d9ab71d39fb8d6b1f05e1 read back. Run42422039237 attempt1/job128552339285 SUCCESS, terminal22:44:55UTC: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42422039237. This is the single authorized data inspection, NOT G6 or native qualification. No checkout/deps/tests/MF/native/business module execution occurred.

Fixed original artifact13593821080 passed exact ZIP/source/run/attempt/manifest/full4-file inventory/every file hash and40,267,275B full-result pin checks. Original data remained untouched. Output summary21,325B/SHA4c3e541cc788c82da477b3547bcf5adf5ebfd43f2032c48abb739571e78644a3 was printed safely in primary logs and preserved. Artifact13593613366 ZIP2911B/SHA4bee46446cb5825fda3b17a1584f3aabd666599afddcb8945e9e54797f72751d expires2026-11-14T22:44:54Z. SAME actual ID download/readback PASS, exactly2files(summary.json+manifest.json), manifest241B/SHA58697ebd804335501940b5430307804acb0315122cde7fa0f7f1466dab41cd89; manifest ties current inspection source/run/attempt to fixed input artifact. No local artifact download, DB or full-result extraction.

| Segment | Epoch | Role | Overflow | Invalid/unattributed | Started/settled | Retained rows | Missing rows | Retained reads |
| --- | ---: | --- | --- | ---: | ---: | ---: | ---: | ---: |
| producer | 0 | M | false | 0/0 | 0/0 | 0 | 0 | 0 |
| producer | 0 | QA | true | 2074/2074 | 5553/5553 | 5537 | 16 | 5116 |
| producer | 1 | M | false | 0/0 | 8/8 | 8 | 0 | 6 |
| producer | 1 | QA | true | 251067/251067 | 6628/6628 | 5461 | 1167 | 5172 |
| producer | 2 | M | false | 0/0 | 56/56 | 56 | 0 | 31 |
| producer | 2 | QA | true | 296039/296039 | 6359/6359 | 5464 | 895 | 5153 |
| consumer | 0 | M | false | 0/0 | 0/0 | 0 | 0 | 0 |
| consumer | 0 | QA | true | 19801/19801 | 5951/5951 | 5457 | 494 | 5164 |

All4 QA epochs have overflow AND nonzero invalid/unattributed. All4 M snapshots have no overflow/invalid/unattributed; two have zero rows. This does not make missing M coverage universally zero or prove every later P1 assertion. Every saved native-started counter is settled, with zero active/rejected in these snapshots; this is not global native drain. Retained QA rows are predominantly read observations. These are measured API reads, not unique network transfer bytes; repeated existing business reads/clones/adapters can contribute. Scope counts and peak values are per epoch only. Do not sum epoch-local ordinals or peaks.

The collector's eventCalls counter was not exposed, so every projection explicitly retains eventCalls:null/eventCallsReason:not_exposed. Missing rows are exactly saved totals.nativeStarted minus retained row length, not estimates of physical network requests. Counters may continue after retention overflow; retained distributions are therefore incomplete. Invalid/unattributed observations show a separate attribution problem exists; saved DTOs do not identify the originating hook/callsite/reason. This evidence does not distinguish repeated invalid sensor calls, missing carriers or legitimate diagnostic event volume sufficiently to choose a fix. No cap increase, filtering, deletion, retry or causal claim is justified by overflow alone. Next technical work needs a concrete Root-approved diagnosis/remediation scope; none is performed here.

Complete sanitized aggregate projection (fixed-known enums and numeric/boolean fields only, no native rows/payloads/errors) is preserved below for durable review, without requiring another download:

```json
{"purpose":"afw.budget-aggregate-inspection.v1","source":"bbe7e518eac6b548e05384806da2f78c66c2e1e7","run":42420218406,"attempt":1,"artifactId":13593821080,"collectorLimit":16384,"eventCalls":null,"eventCallsReason":"not_exposed","epochs":[{"segment":"producer","epoch":0,"role":"M","coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":0},"retainedRows":0,"missingRows":0,"retainedRootCount":0,"retainedChildCount":0,"scopeCount":0,"logicalScopeEventCount":0,"totals":{"nativeStarted":0,"nativeSettled":0,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":0,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":0,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":0},"byPhaseResource":[],"retainedByPhase":[],"retainedByResource":[],"retainedByOperation":[],"retainedByStatus":[],"eventCalls":null,"eventCallsReason":"not_exposed"},{"segment":"producer","epoch":0,"role":"QA","coverage":{"overflow":true,"invalid":2074,"unattributed":2074,"nativeBytesUnavailable":423},"retainedRows":5537,"missingRows":16,"retainedRootCount":1,"retainedChildCount":73,"scopeCount":74,"logicalScopeEventCount":0,"totals":{"nativeStarted":5553,"nativeSettled":5553,"nativeRejected":0,"logicalDenied":0,"cancelStarted":62,"cancelSettled":62,"active":0,"peak":11,"nativeBytesRead":20188388,"chunksRead":5068,"nativeDurationSumMs":2361,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":7135},"byPhaseResource":[{"phase":"setup","resourceClass":"GHsource","nativeStarted":64,"nativeSettled":64,"nativeRejected":0,"logicalDenied":0,"cancelStarted":16,"cancelSettled":16,"active":0,"peak":6,"nativeBytesRead":10028,"chunksRead":16,"nativeDurationSumMs":49},{"phase":"setup","resourceClass":"CFcredential","nativeStarted":52,"nativeSettled":52,"nativeRejected":0,"logicalDenied":0,"cancelStarted":13,"cancelSettled":13,"active":0,"peak":2,"nativeBytesRead":2197,"chunksRead":13,"nativeDurationSumMs":98},{"phase":"setup","resourceClass":"CFdeployment","nativeStarted":36,"nativeSettled":36,"nativeRejected":0,"logicalDenied":0,"cancelStarted":9,"cancelSettled":9,"active":0,"peak":2,"nativeBytesRead":2007,"chunksRead":9,"nativeDurationSumMs":133},{"phase":"setup","resourceClass":"DO","nativeStarted":291,"nativeSettled":291,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":6,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":986},{"phase":"setup","resourceClass":"CFversion","nativeStarted":5050,"nativeSettled":5050,"nativeRejected":0,"logicalDenied":0,"cancelStarted":11,"cancelSettled":11,"active":0,"peak":4,"nativeBytesRead":20171490,"chunksRead":5017,"nativeDurationSumMs":718},{"phase":"setup","resourceClass":"SQL","nativeStarted":8,"nativeSettled":8,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":20},{"phase":"setup","resourceClass":"CFworkflow","nativeStarted":32,"nativeSettled":32,"nativeRejected":0,"logicalDenied":0,"cancelStarted":8,"cancelSettled":8,"active":0,"peak":2,"nativeBytesRead":2365,"chunksRead":8,"nativeDurationSumMs":200},{"phase":"setup","resourceClass":"CFcontainer","nativeStarted":4,"nativeSettled":4,"nativeRejected":0,"logicalDenied":0,"cancelStarted":1,"cancelSettled":1,"active":0,"peak":1,"nativeBytesRead":85,"chunksRead":1,"nativeDurationSumMs":30},{"phase":"setup","resourceClass":"CFschedule","nativeStarted":8,"nativeSettled":8,"nativeRejected":0,"logicalDenied":0,"cancelStarted":2,"cancelSettled":2,"active":0,"peak":2,"nativeBytesRead":108,"chunksRead":2,"nativeDurationSumMs":63},{"phase":"setup","resourceClass":"CFtail","nativeStarted":8,"nativeSettled":8,"nativeRejected":0,"logicalDenied":0,"cancelStarted":2,"cancelSettled":2,"active":0,"peak":2,"nativeBytesRead":108,"chunksRead":2,"nativeDurationSumMs":64}],"retainedByPhase":[{"value":"setup","count":5537}],"retainedByResource":[{"value":"CFcredential","count":52},{"value":"CFdeployment","count":36},{"value":"CFversion","count":5035},{"value":"CFworkflow","count":32},{"value":"CFcontainer","count":4},{"value":"CFschedule","count":8},{"value":"CFtail","count":8},{"value":"GHsource","count":64},{"value":"DO","count":291},{"value":"SQL","count":7}],"retainedByOperation":[{"value":"get","count":193},{"value":"list","count":2},{"value":"put","count":68},{"value":"first","count":2},{"value":"all","count":5},{"value":"sync","count":8},{"value":"transaction","count":15},{"value":"getAlarm","count":4},{"value":"setAlarm","count":1},{"value":"fetch","count":62},{"value":"read","count":5116},{"value":"cancel","count":61}],"retainedByStatus":[{"value":"fulfilled","count":5537}],"eventCalls":null,"eventCallsReason":"not_exposed"},{"segment":"producer","epoch":1,"role":"M","coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":2},"retainedRows":8,"missingRows":0,"retainedRootCount":2,"retainedChildCount":0,"scopeCount":2,"logicalScopeEventCount":0,"totals":{"nativeStarted":8,"nativeSettled":8,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":724,"chunksRead":3,"nativeDurationSumMs":28186,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":28207},"byPhaseResource":[{"phase":"setup","resourceClass":"DO","nativeStarted":6,"nativeSettled":6,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":560,"chunksRead":2,"nativeDurationSumMs":28185},{"phase":"setup","resourceClass":"transport","nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":164,"chunksRead":1,"nativeDurationSumMs":1}],"retainedByPhase":[{"value":"setup","count":8}],"retainedByResource":[{"value":"DO","count":6},{"value":"transport","count":2}],"retainedByOperation":[{"value":"fetch","count":2},{"value":"read","count":6}],"retainedByStatus":[{"value":"fulfilled","count":8}],"eventCalls":null,"eventCallsReason":"not_exposed"},{"segment":"producer","epoch":1,"role":"QA","coverage":{"overflow":true,"invalid":251067,"unattributed":251067,"nativeBytesUnavailable":308},"retainedRows":5461,"missingRows":1167,"retainedRootCount":1,"retainedChildCount":246,"scopeCount":247,"logicalScopeEventCount":0,"totals":{"nativeStarted":6628,"nativeSettled":6628,"nativeRejected":0,"logicalDenied":0,"cancelStarted":24,"cancelSettled":24,"active":0,"peak":2,"nativeBytesRead":25345212,"chunksRead":6296,"nativeDurationSumMs":893,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":8767},"byPhaseResource":[{"phase":"setup","resourceClass":"DO","nativeStarted":243,"nativeSettled":243,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":2,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":39},{"phase":"setup","resourceClass":"CFcredential","nativeStarted":32,"nativeSettled":32,"nativeRejected":0,"logicalDenied":0,"cancelStarted":8,"cancelSettled":8,"active":0,"peak":2,"nativeBytesRead":1352,"chunksRead":8,"nativeDurationSumMs":17},{"phase":"setup","resourceClass":"CFdeployment","nativeStarted":32,"nativeSettled":32,"nativeRejected":0,"logicalDenied":0,"cancelStarted":8,"cancelSettled":8,"active":0,"peak":2,"nativeBytesRead":2300,"chunksRead":8,"nativeDurationSumMs":12},{"phase":"setup","resourceClass":"CFversion","nativeStarted":6304,"nativeSettled":6304,"nativeRejected":0,"logicalDenied":0,"cancelStarted":8,"cancelSettled":8,"active":0,"peak":2,"nativeBytesRead":25341560,"chunksRead":6280,"nativeDurationSumMs":789},{"phase":"setup","resourceClass":"SQL","nativeStarted":14,"nativeSettled":14,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":29},{"phase":"setup","resourceClass":"JWKS","nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":2},{"phase":"setup","resourceClass":"rateLimiter","nativeStarted":1,"nativeSettled":1,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":5}],"retainedByPhase":[{"value":"setup","count":5461}],"retainedByResource":[{"value":"CFcredential","count":32},{"value":"CFdeployment","count":32},{"value":"CFversion","count":5154},{"value":"DO","count":231},{"value":"SQL","count":12}],"retainedByOperation":[{"value":"get","count":201},{"value":"list","count":27},{"value":"first","count":9},{"value":"all","count":3},{"value":"getAlarm","count":3},{"value":"fetch","count":24},{"value":"read","count":5172},{"value":"cancel","count":22}],"retainedByStatus":[{"value":"fulfilled","count":5461}],"eventCalls":null,"eventCallsReason":"not_exposed"},{"segment":"producer","epoch":2,"role":"M","coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":33},"retainedRows":56,"missingRows":0,"retainedRootCount":9,"retainedChildCount":0,"scopeCount":9,"logicalScopeEventCount":0,"totals":{"nativeStarted":56,"nativeSettled":56,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":3,"nativeBytesRead":3547,"chunksRead":11,"nativeDurationSumMs":32196,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":32825},"byPhaseResource":[{"phase":"authorize_get","resourceClass":"DO","nativeStarted":3,"nativeSettled":3,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":372,"chunksRead":1,"nativeDurationSumMs":10861},{"phase":"authorize_post","resourceClass":"transport","nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":94,"chunksRead":1,"nativeDurationSumMs":0},{"phase":"authorize_post","resourceClass":"DO","nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":0,"chunksRead":0,"nativeDurationSumMs":14359},{"phase":"token_exchange","resourceClass":"rateLimiter","nativeStarted":1,"nativeSettled":1,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":5},{"phase":"token_exchange","resourceClass":"transport","nativeStarted":4,"nativeSettled":4,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":304,"chunksRead":1,"nativeDurationSumMs":1},{"phase":"token_exchange","resourceClass":"KV","nativeStarted":5,"nativeSettled":5,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":5},{"phase":"token_exchange","resourceClass":"SQL","nativeStarted":5,"nativeSettled":5,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":5},{"phase":"mcp_read","resourceClass":"rateLimiter","nativeStarted":4,"nativeSettled":4,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":11},{"phase":"mcp_read","resourceClass":"KV","nativeStarted":4,"nativeSettled":4,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":3},{"phase":"mcp_read","resourceClass":"transport","nativeStarted":16,"nativeSettled":16,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":2,"nativeBytesRead":1663,"chunksRead":5,"nativeDurationSumMs":11},{"phase":"mcp_read","resourceClass":"SQL","nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":2},{"phase":"monitoring_get","resourceClass":"DO","nativeStarted":3,"nativeSettled":3,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":694,"chunksRead":1,"nativeDurationSumMs":3220},{"phase":"monitoring_post","resourceClass":"transport","nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":50,"chunksRead":1,"nativeDurationSumMs":1},{"phase":"monitoring_post","resourceClass":"DO","nativeStarted":3,"nativeSettled":3,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":370,"chunksRead":1,"nativeDurationSumMs":3712}],"retainedByPhase":[{"value":"authorize_get","count":3},{"value":"authorize_post","count":4},{"value":"token_exchange","count":15},{"value":"mcp_read","count":26},{"value":"monitoring_get","count":3},{"value":"monitoring_post","count":5}],"retainedByResource":[{"value":"DO","count":11},{"value":"SQL","count":7},{"value":"KV","count":9},{"value":"transport","count":24},{"value":"rateLimiter","count":5}],"retainedByOperation":[{"value":"get","count":7},{"value":"put","count":2},{"value":"first","count":7},{"value":"fetch","count":4},{"value":"read","count":31},{"value":"limit","count":5}],"retainedByStatus":[{"value":"fulfilled","count":56}],"eventCalls":null,"eventCallsReason":"not_exposed"},{"segment":"producer","epoch":2,"role":"QA","coverage":{"overflow":true,"invalid":296039,"unattributed":296039,"nativeBytesUnavailable":335},"retainedRows":5464,"missingRows":895,"retainedRootCount":1,"retainedChildCount":255,"scopeCount":256,"logicalScopeEventCount":0,"totals":{"nativeStarted":6359,"nativeSettled":6359,"nativeRejected":0,"logicalDenied":0,"cancelStarted":20,"cancelSettled":20,"active":0,"peak":2,"nativeBytesRead":24501840,"chunksRead":6004,"nativeDurationSumMs":782,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":3905},"byPhaseResource":[{"phase":"authorize_get","resourceClass":"DO","nativeStarted":282,"nativeSettled":282,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":2,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":38},{"phase":"authorize_get","resourceClass":"CFcredential","nativeStarted":24,"nativeSettled":24,"nativeRejected":0,"logicalDenied":0,"cancelStarted":6,"cancelSettled":6,"active":0,"peak":2,"nativeBytesRead":1014,"chunksRead":6,"nativeDurationSumMs":16},{"phase":"authorize_get","resourceClass":"CFdeployment","nativeStarted":24,"nativeSettled":24,"nativeRejected":0,"logicalDenied":0,"cancelStarted":6,"cancelSettled":6,"active":0,"peak":2,"nativeBytesRead":1338,"chunksRead":6,"nativeDurationSumMs":12},{"phase":"authorize_get","resourceClass":"CFversion","nativeStarted":6016,"nativeSettled":6016,"nativeRejected":0,"logicalDenied":0,"cancelStarted":8,"cancelSettled":8,"active":0,"peak":2,"nativeBytesRead":24499488,"chunksRead":5992,"nativeDurationSumMs":694},{"phase":"authorize_get","resourceClass":"SQL","nativeStarted":8,"nativeSettled":8,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":13},{"phase":"authorize_get","resourceClass":"JWKS","nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":2},{"phase":"authorize_get","resourceClass":"KV","nativeStarted":3,"nativeSettled":3,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":7}],"retainedByPhase":[{"value":"authorize_get","count":5464}],"retainedByResource":[{"value":"CFcredential","count":24},{"value":"CFdeployment","count":24},{"value":"CFversion","count":5142},{"value":"JWKS","count":2},{"value":"DO","count":264},{"value":"SQL","count":8}],"retainedByOperation":[{"value":"get","count":230},{"value":"list","count":27},{"value":"first","count":6},{"value":"all","count":2},{"value":"transaction","count":4},{"value":"getAlarm","count":3},{"value":"fetch","count":21},{"value":"read","count":5153},{"value":"cancel","count":18}],"retainedByStatus":[{"value":"fulfilled","count":5464}],"eventCalls":null,"eventCallsReason":"not_exposed"},{"segment":"consumer","epoch":0,"role":"M","coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":0},"retainedRows":0,"missingRows":0,"retainedRootCount":0,"retainedChildCount":0,"scopeCount":0,"logicalScopeEventCount":0,"totals":{"nativeStarted":0,"nativeSettled":0,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":0,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":0,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":0},"byPhaseResource":[],"retainedByPhase":[],"retainedByResource":[],"retainedByOperation":[],"retainedByStatus":[],"eventCalls":null,"eventCallsReason":"not_exposed"},{"segment":"consumer","epoch":0,"role":"QA","coverage":{"overflow":true,"invalid":19801,"unattributed":19801,"nativeBytesUnavailable":295},"retainedRows":5457,"missingRows":494,"retainedRootCount":1,"retainedChildCount":212,"scopeCount":212,"logicalScopeEventCount":0,"totals":{"nativeStarted":5951,"nativeSettled":5951,"nativeRejected":0,"logicalDenied":0,"cancelStarted":49,"cancelSettled":49,"active":0,"peak":6,"nativeBytesRead":22773609,"chunksRead":5607,"nativeDurationSumMs":634,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":692},"byPhaseResource":[{"phase":"cleanup_before_restore","resourceClass":"DO","nativeStarted":187,"nativeSettled":187,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":2,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":19},{"phase":"cleanup_before_restore","resourceClass":"CFcredential","nativeStarted":32,"nativeSettled":32,"nativeRejected":0,"logicalDenied":0,"cancelStarted":8,"cancelSettled":8,"active":0,"peak":2,"nativeBytesRead":1352,"chunksRead":8,"nativeDurationSumMs":18},{"phase":"cleanup_before_restore","resourceClass":"CFdeployment","nativeStarted":32,"nativeSettled":32,"nativeRejected":0,"logicalDenied":0,"cancelStarted":8,"cancelSettled":8,"active":0,"peak":2,"nativeBytesRead":1784,"chunksRead":8,"nativeDurationSumMs":72},{"phase":"cleanup_before_restore","resourceClass":"GHsource","nativeStarted":44,"nativeSettled":44,"nativeRejected":0,"logicalDenied":0,"cancelStarted":11,"cancelSettled":11,"active":0,"peak":6,"nativeBytesRead":8391,"chunksRead":11,"nativeDurationSumMs":38},{"phase":"cleanup_before_restore","resourceClass":"CFversion","nativeStarted":5598,"nativeSettled":5598,"nativeRejected":0,"logicalDenied":0,"cancelStarted":10,"cancelSettled":10,"active":0,"peak":2,"nativeBytesRead":22759858,"chunksRead":5568,"nativeDurationSumMs":466},{"phase":"cleanup_before_restore","resourceClass":"SQL","nativeStarted":10,"nativeSettled":10,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":14},{"phase":"cleanup_before_restore","resourceClass":"CFworkflow","nativeStarted":28,"nativeSettled":28,"nativeRejected":0,"logicalDenied":0,"cancelStarted":7,"cancelSettled":7,"active":0,"peak":1,"nativeBytesRead":1923,"chunksRead":7,"nativeDurationSumMs":5},{"phase":"cleanup_before_restore","resourceClass":"CFcontainer","nativeStarted":4,"nativeSettled":4,"nativeRejected":0,"logicalDenied":0,"cancelStarted":1,"cancelSettled":1,"active":0,"peak":1,"nativeBytesRead":85,"chunksRead":1,"nativeDurationSumMs":1},{"phase":"cleanup_before_restore","resourceClass":"CFschedule","nativeStarted":8,"nativeSettled":8,"nativeRejected":0,"logicalDenied":0,"cancelStarted":2,"cancelSettled":2,"active":0,"peak":1,"nativeBytesRead":108,"chunksRead":2,"nativeDurationSumMs":0},{"phase":"cleanup_before_restore","resourceClass":"CFtail","nativeStarted":8,"nativeSettled":8,"nativeRejected":0,"logicalDenied":0,"cancelStarted":2,"cancelSettled":2,"active":0,"peak":1,"nativeBytesRead":108,"chunksRead":2,"nativeDurationSumMs":1}],"retainedByPhase":[{"value":"cleanup_before_restore","count":5457}],"retainedByResource":[{"value":"CFcredential","count":32},{"value":"CFdeployment","count":32},{"value":"CFversion","count":5104},{"value":"CFworkflow","count":28},{"value":"CFcontainer","count":4},{"value":"CFschedule","count":8},{"value":"CFtail","count":8},{"value":"GHsource","count":44},{"value":"DO","count":187},{"value":"SQL","count":10}],"retainedByOperation":[{"value":"get","count":160},{"value":"list","count":16},{"value":"put","count":1},{"value":"first","count":5},{"value":"all","count":5},{"value":"sync","count":1},{"value":"transaction","count":5},{"value":"getAlarm","count":3},{"value":"setAlarm","count":1},{"value":"fetch","count":49},{"value":"read","count":5164},{"value":"cancel","count":47}],"retainedByStatus":[{"value":"fulfilled","count":5457}],"eventCalls":null,"eventCallsReason":"not_exposed"}],"operationalReadiness":false,"completePackage":false,"PCoff":false}
```

Terminal cleanup changes only report and removal of TEMP; all implementation blobs remain exactly as cleanup868f158 and qualified Sourcebbe7. Verify CAS/head/report/full recursive tree/protected BASE/main and no cleanup-triggered run, then STOP_WRITES. Task1 remains NEEDS_CONTEXT, 8Q PASS/P1 FAIL; no G6 today, no review/Task2 claim, and operationalReadiness/completePackage/PCoff remain false.


## 2026-11-11 UTC — chronology, pure RED preserved; same-ID runner gate failed

Source/SYN on `feat/finite-native-cleanup-20261101`. BASE-C `1455ba78e021f41b82700035a3819898b6a255d7`, tree `521f2c67291569073f3a2b0a8c13a3b6b1f1e0a7`, historical report blob `03aa96c5ba3b4b4298e1a6016015d5eb86faf768`. Single RED source `0f533b9beb454cd9d374bfda931f8738ab67e3e2`, tree `f9757ff5b681f7e6f44578b3f13d071207ebe368`, test `696bed5af2d3ca49b0295747582b74b659dbd28a`, TEMP `b5af7a02f7c274b988ff588115426f9c37ff6e7e`, unchanged sensor `d9b3e114b8298759159f0d85cce18b2ac0959ac3`. The recursive Source tree was compared with BASE-C before CAS. The only RED leaf changes were the Q test and TEMP. Main read back `0c9c475b3ebaa970fc11d628b40e50a90cceb727`.

[Run 43099361016](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43099361016), attempt 1, push, job `pure/130785598421`, terminal **failure**. After `npm ci --ignore-scripts --no-audit --no-fund`, `node --test test/finite-budget-diagnostics.test.mjs` ran exactly 8 groups. Seven passed, Q6 failed with the intended assertion `missing bounded chronology contract`, 0 cancelled, 0 skipped, 0 todo. The gate checked the process exit, exact Q6 name, failure text and TAP counts, and passed. Sealing and artifact upload succeeded.

GitHub recorded [artifact 13890881726](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43099361016/artifacts/13890881726), `finite-budget-chronology-red-0f533b9beb454cd9d374bfda931f8738ab67e3e2`, 1,454 ZIP bytes, SHA-256 `380ab836792156358e31d7a9b9ff028da620be1e4ce6d61226673c3fdc603a8b`, expiry 2026-11-18 21:01:02 UTC. The runner reported two files uploaded from the pure evidence directory (tests.log and budget-artifact.json). Its subsequent download of that exact ID reported zero artifacts. Verification then returned ENOENT for budget-artifact.json. The connector later listed the same artifact and returned a ZIP reference by ID. That later lookup establishes availability at the time of lookup. The original runner inventory readback failed; no individual byte/SHA inventory is claimed from that step. The cause of the discrepancy is unconfirmed.

Stage B was withheld at this evidence gate. Zero native producers, I0, C0, C1, cold consumers or alarms in this run. There are no observed first-invalid, first-overflow, role/epoch or reason counts from the experiment. No causal order can be inferred. The Q test is retained for the next authorized stage. TEMP retires with this append. Task1 remains NEEDS_CONTEXT; operationalReadiness=false, completePackage=false, PCoff=false.


### 2026-11-11 UTC — RED accepted by independent readback; one Stage B activation

Root independently downloaded the exact 1,454-byte artifact 13890881726. It verified the ZIP SHA-256 above, the exact two paths, budget-artifact.json (408 bytes, SHA-256 `4e7a797a65e69a8074a53725f030439e21635d3d118e156d341011615c5c268f`), and tests.log (2,641 bytes, SHA-256 `cf391dc854442e3013277d53cc1dfa71ab6fe054859066eddce6236a1e98c269`). Manifest source, attempt, run, kind and flags matched. Root accepted the intended Q6 RED while retaining the failed runner readback. The retrieval discrepancy remains unexplained. [Dated ruling](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/b02b6a51b461dd7bf7c784d14eba342269cf9148/docs/superpowers/briefs/2026-11-07-finite-native-budget-qualification-chronology-resume-20261111.md)

One Stage B attempt is authorized from cleanup `53e97746a3357331136a2bdf16e21b6991829117`, tree `7a3689be7cc2d4a6932f053d6a3616b0b88b9ad8`. TEMP selects the same artifact ID with explicit repository and run using the ephemeral Actions read permission. The prior RED is not repeated. The command is a fixed producer-only diagnostic with original clocks, a 16,384-event limit, and pre-C0 disposal. This activation records intent; the resulting test counts, readbacks and observations follow only after the run reaches terminal.


### 2026-11-11 UTC — producer-only chronology observed

[Run 43101479429](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43101479429), attempt 1, event push, terminal success. Source `ebeba97e38ea74e6d2821b3f34ed750c0bed9982`, tree `15afaeb11c0b05089497e65839a203617508a5d3`, parent `53e97746a3357331136a2bdf16e21b6991829117`. Blob SHAs: diagnostics `eaba60d19ef26bf7732225fae65b4c33103d50ec`, world `29fba98d00af116257e08a0b655695fa0f3ab8d6`, unchanged RED test `696bed5af2d3ca49b0295747582b74b659dbd28a`, temporary workflow `0e0e636dc022d20352c97b9ed6998d3704e2fff2`, report at activation `0ea7db980fd62dc7371817d9fae877b59d080a37`. The feature branch remained frozen through terminal. All source changes relative to BASE-C fit the five named paths.

* `pure/130793769601`, 3-minute limit. `npm ci --ignore-scripts --no-audit --no-fund`; `node --check` and `npx eslint` on the sensor/world/test paths; `node --test test/finite-budget-diagnostics.test.mjs`: **8 tests, 8 pass, 0 fail, 0 cancelled, 0 skipped, 0 todo**. `node test/fixtures/finite-budget-world.mjs preflight-budget` completed strict prepared M/QA compilation before I0.
* `positive_prepare/130794121379`, 5-minute limit, passed after the pure gate. `npm ci --ignore-scripts --no-audit --no-fund`, exact prior pure artifact verification, then `node test/fixtures/finite-budget-world.mjs prepare-positive-probe output/finite-budget/producer`. The existing compiler compared role/path/selector/count records to the prior preflight before I0 under its original stdin normalization. A single principal producer invocation used the original genuine SDK setup, two compiled role graphs, original clocks and deferred wait. It returned at `1794431872227`, after disposal, 827773 ms before C0. SDK completeNormal=1, completeWrites=1, Reference rows=1, Reference readbacks=1, Notice rows=1. Original alarm observed=false. No consumer, cold recovery, full P1, final alarm or live provider ran. No measured MF instance count is inferred from the number of epoch snapshots.
* `sealBudgetArtifact` recorded immutable source/run/attempt and per-file path/bytes/SHA. `verifyBudgetArtifact` verified the exact downloaded inventory and flags on both jobs. Pure artifact [13891043393](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43101479429/artifacts/13891043393), 25931 ZIP bytes, SHA-256 `480a1e9c51916971db214485aa6843825c89f84d4d772a15708baae3a62c1775`, expiry 2026-11-18 21:16:02 UTC. Same-ID readbacks in pure and producer each verified 5 files including budget-artifact.json (846 bytes, SHA-256 `ddc85a92b533bb1fb818e8b3eb722529a3ca0f49711d35b00d834ec14b71a7d7`).
* Producer artifact [13890948411](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43101479429/artifacts/13890948411), 1,512,269 ZIP bytes, SHA-256 `f3721359c9e8b18867299c59d4fb562916f5682509b2290b9a3e5cd396ec9be9`, expiry 2026-11-18 21:17:53 UTC. Exact same-ID readback verified 9 files including budget-artifact.json (1,504 bytes, SHA-256 `b848e979adf9f9d72dbecacb45c23557904f32365f00cef9c9b0e9bbf51beda1`). Inventory comprises aggregates.json, console.log, full-result.json, manifest.json, the four graphs files listed below and budget-artifact.json. Full-result stores sanitized SYN epoch snapshots and prepared role records. The native checkpoint manifest and original script/metafile proofs are preserved, while raw checkpoint data and databases existed only on the disposable runner. This artifact is diagnostic evidence and cannot be used to recover the full checkpoint.

**Observed chronology by producer epoch.** QA0 and QA1 each crossed the original limit at settle ordinal 16,385. Their first invalid was runMissingLease at 18,212 and 19,690 respectively. QA2 began with readerOrigin at ordinal 1; 14 invalid/unattributed observations preceded its own overflow, and 296,394 followed. All three M epochs stayed below the limit with zero invalid observations. The histogram covers each complete epoch. It cannot assign individual reasons to the other 13 pre-overflow events in QA2. A prior epoch's context or an independent origin failure could contribute; this probe does not establish the cause. Chronology alone does not justify changing retention, the cap, or attribution. Task1 still requires Root's causal ruling and any later qualification. operationalReadiness=false, completePackage=false, PCoff=false.

**Exact bounded log aggregates.** Each JSON line below reproduces a corresponding `AFW_PROBE` aggregate from the producer job; step markers are omitted. Fixed zero buckets are retained.

```jsonl
{"kind":"facts","purpose":"afw.finite-budget-producer-probe.syn.v1","scope":"partial-producer-only","source":"ebeba97e38ea74e6d2821b3f34ed750c0bed9982","run":"43101479429","attempt":"1","I0":1794431800000,"C0":1794432700000,"C1":1794432880000,"returnedAt":1794431872227,"completeNormal":1,"completeWrites":1,"referenceRows":1,"referenceReadbacks":1,"noticeRows":1,"disposedBeforeC0":true,"originalAlarmObserved":false,"operationalReadiness":false,"completePackage":false,"PCoff":false}
{"kind":"chronology","segment":"producer","epoch":0,"role":"M","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":0,"byEvent":{"root":0,"child":0,"begin":0,"bytes":0,"logical":0,"scopeLogical":0,"cancel":0,"settle":0,"incomplete":0},"firstInvalid":null,"firstOverflow":null,"invalid":{"beforeOverflow":0,"afterOverflow":0},"unattributed":{"beforeOverflow":0,"afterOverflow":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":0}}
{"kind":"reasons","segment":"producer","epoch":0,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"chronology","segment":"producer","epoch":0,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":19702,"byEvent":{"root":1,"child":93,"begin":6147,"bytes":5714,"logical":0,"scopeLogical":0,"cancel":134,"settle":6147,"incomplete":1466},"firstInvalid":{"event":"incomplete","ordinal":18212,"reason":"runMissingLease","relation":"afterOverflow"},"firstOverflow":{"event":"settle","ordinal":16385},"invalid":{"beforeOverflow":0,"afterOverflow":1466},"unattributed":{"beforeOverflow":0,"afterOverflow":1466},"coverage":{"overflow":true,"invalid":1466,"unattributed":1466,"nativeBytesUnavailable":433}}
{"kind":"reasons","segment":"producer","epoch":0,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":15,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":12,"holderIdentity":0,"invocationIdentity":1334,"invocationRoot":99,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":6,"fetchResource":0}}
{"kind":"chronology","segment":"producer","epoch":1,"role":"M","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":24,"byEvent":{"root":2,"child":0,"begin":8,"bytes":6,"logical":0,"scopeLogical":0,"cancel":0,"settle":8,"incomplete":0},"firstInvalid":null,"firstOverflow":null,"invalid":{"beforeOverflow":0,"afterOverflow":0},"unattributed":{"beforeOverflow":0,"afterOverflow":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":2}}
{"kind":"reasons","segment":"producer","epoch":1,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"chronology","segment":"producer","epoch":1,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":274794,"byEvent":{"root":2,"child":3997,"begin":6578,"bytes":6270,"logical":0,"scopeLogical":0,"cancel":48,"settle":6578,"incomplete":251321},"firstInvalid":{"event":"incomplete","ordinal":19690,"reason":"runMissingLease","relation":"afterOverflow"},"firstOverflow":{"event":"settle","ordinal":16385},"invalid":{"beforeOverflow":0,"afterOverflow":251321},"unattributed":{"beforeOverflow":0,"afterOverflow":251321},"coverage":{"overflow":true,"invalid":251321,"unattributed":251321,"nativeBytesUnavailable":308}}
{"kind":"reasons","segment":"producer","epoch":1,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":7889,"descendantChild":0,"runMissingLease":11655,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":824,"holderIdentity":0,"invocationIdentity":217905,"invocationRoot":12908,"methodPhase":0,"clockLease":0,"aliasStore":88,"aliasChild":0,"transportPhase":0,"transactionContext":52,"fetchResource":0}}
{"kind":"chronology","segment":"producer","epoch":2,"role":"M","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":144,"byEvent":{"root":9,"child":0,"begin":56,"bytes":23,"logical":0,"scopeLogical":0,"cancel":0,"settle":56,"incomplete":0},"firstInvalid":null,"firstOverflow":null,"invalid":{"beforeOverflow":0,"afterOverflow":0},"unattributed":{"beforeOverflow":0,"afterOverflow":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":33}}
{"kind":"reasons","segment":"producer","epoch":2,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"chronology","segment":"producer","epoch":2,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":318964,"byEvent":{"root":4,"child":3764,"begin":6361,"bytes":6026,"logical":0,"scopeLogical":0,"cancel":40,"settle":6361,"incomplete":296408},"firstInvalid":{"event":"incomplete","ordinal":1,"reason":"readerOrigin","relation":"beforeOverflow"},"firstOverflow":{"event":"settle","ordinal":16385},"invalid":{"beforeOverflow":14,"afterOverflow":296394},"unattributed":{"beforeOverflow":14,"afterOverflow":296394},"coverage":{"overflow":true,"invalid":296408,"unattributed":296408,"nativeBytesUnavailable":335}}
{"kind":"reasons","segment":"producer","epoch":2,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":7731,"descendantChild":0,"runMissingLease":11287,"phaseStore":1,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":834,"holderIdentity":0,"invocationIdentity":262771,"invocationRoot":13241,"methodPhase":0,"clockLease":0,"aliasStore":43,"aliasChild":0,"transportPhase":0,"transactionContext":500,"fetchResource":0}}
{"kind":"proof","path":"graphs/native-syn.json","bytes":1066,"sha256":"94a24606cde0b61a912492a14b8b052976921cf175beffe51e922d7b7384a498"}
{"kind":"proof","path":"graphs/metafiles.json","bytes":448785,"sha256":"470372b65fcb4d888346aa2899c9af9827509ca9e411770377807dfb23461cbd"}
{"kind":"proof","path":"graphs/canary-index.mjs","bytes":2060944,"sha256":"8313e48e6c6cf5a65f8d0d2c814c555da0bd23828a04837c1f1908135638d0e0"}
{"kind":"proof","path":"graphs/qa-index.mjs","bytes":2693441,"sha256":"eba68180d5565174252a88218a7fcc4e36774338ca16c0c3fa23baf986063b91"}
{"kind":"proof","path":"manifest.json","bytes":9903,"sha256":"ea1791696fc909ef973ec070175097ed93eace3eff076528000f26fbf1fba4c3"}
```

**Source-line to fixed invalid-reason map.** Line numbers refer to [the qualified sensor](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/ebeba97e38ea74e6d2821b3f34ed750c0bed9982/test/fixtures/finite-budget-diagnostics.mjs). Two reasons on a common line identify distinct existing conditions/callbacks. The optional zero-argument incomplete() normalizes to unknown. Its input is matched against a fixed set without object coercion or accessor reads.

| Source line(s) | Fixed reason |
| --- | --- |
| 39 | `unknown` |
| 45 | `constructorOptions` |
| 60 | `collectorException` |
| 65 | `rootInput` |
| 72 | `childInput` |
| 73 | `childConflict` |
| 81 | `beginContext` |
| 82 | `beginMethodResource` |
| 83 | `beginFetchLink` |
| 92 | `bytesInput` |
| 99 | `logicalInput` |
| 107 | `scopeLogicalInput` |
| 114 | `cancelInput` |
| 120 | `settleInput` |
| 122 | `settleTime` |
| 120, 136 | `promiseThenMissing` |
| 120, 139 | `promiseThenException` |
| 157 | `descendantStore` |
| 157 | `descendantChild` |
| 163 | `runMissingLease` |
| 168 | `phaseStore` |
| 168 | `phaseValue` |
| 171 | `guardRoot` |
| 175 | `holderInput` |
| 176 | `holderConflict` |
| 181 | `captureInput` |
| 183 | `captureConflict` |
| 187 | `facadeInput` |
| 194 | `localBodyStore` |
| 208 | `observerFulfilledCallback` |
| 208 | `observerRejectedCallback` |
| 210 | `observerThenException` |
| 216 | `dormantInvocation` |
| 218 | `cloneOrigin` |
| 221 | `readerOrigin` |
| 228 | `holderIdentity` |
| 233 | `invocationIdentity` |
| 233 | `invocationRoot` |
| 271 | `methodPhase` |
| 273 | `clockLease` |
| 280 | `aliasStore` |
| 280 | `aliasChild` |
| 283 | `transportPhase` |
| 303 | `transactionContext` |
| 324 | `fetchResource` |

Terminal action: remove TEMP and append only these observed results. Keep Source implementation for readback; Task1 remains incomplete and Root owns subsequent decisions. No additional execution, review, Task2, production mutation or PC-off rehearsal is part of this probe.


### 2026-11-11 UTC — explicit cap32768 diagnostic candidate: pure RED

Root authorized a single candidate comparison using a private SYN marker with requested limit 32,768. Ordinary and unmarked options retain their original 16,384 ceiling. The candidate uses the same producer fixture, clocks, event increments, retention algorithm and fixed reasons. This comparison does not promote a new ordinary limit. [Ruling](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/c53caaa294ba298ac587db21a7bb849ae87fbd76/docs/superpowers/briefs/2026-11-07-finite-native-budget-qualification-chronology-resume-20261111.md)

BASE-D `bc03e760c2c360755b2f94f3fbc6a0db942e4c36`, tree `b3eedfeccd64018495db72fc5550fa2ecf8e2b96`, report blob `318a77affda20793a0316bd5387c5e99da1d3ef9`. New RED Source `f671566e90673cdb1762e6e33a3fa16594e5b735`, tree `925be677a3f56c3712eaf547cdd58e7fbba23743`, Q test `dbf8304da9a281ab2e7fc7ceb1711199846acb60`, TEMP `490a5d02f39081cd0d2c602ec13e9399af33a349`; sensor `eaba60d19ef26bf7732225fae65b4c33103d50ec` stayed byte-identical to BASE-D. The Q6 extension checks marker isolation, ordinary fallback, passive/accessor handling, native Promise and return identity, snapshot stability, original overflow ordinal 16,385 and the candidate boundary at 32,769.

[Candidate RED 43102922737](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43102922737), attempt 1, pure job 130798723989, terminal success. `npm ci --ignore-scripts --no-audit --no-fund`, then `node --test test/finite-budget-diagnostics.test.mjs`: 8 tests, 7 pass, 1 intended Q6 failure at `explicit SYN cap32768 candidate unavailable`, 0 cancelled, skipped or todo. The original sensor returned 16,384. No native fixture ran in the RED. Its assertion-failure gate, upload and explicit repository/run/same-ID REST download all passed.

[Artifact 13892082715](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43102922737/artifacts/13892082715), 1,450 ZIP bytes, SHA-256 `b3112c2950b505036b0cae3bf352ed0e8450b80603e615f4654a6c3023078947`, expiry 2026-11-18 21:25:59 UTC. Same-ID readback verified 2 exact files (tests.log and budget-artifact.json), manifest 408 bytes, SHA-256 `b01383ed6ba3366c2e4ff67375c0b9bd81281687c467631db6b1801dbca436e5`. Source/run/attempt/kind and all three false flags matched. One pure/preflight→producer-only comparison now follows. This activation makes no native result claim.


### 2026-11-11 UTC — cap32768 comparison: QA0 clears, QA1 and QA2 remain incomplete

[Run 43103332654](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43103332654), attempt 1, push on `feat/finite-native-cleanup-20261101`, terminal success. Source `80c85c784f38659e5927c5df27613afba21978a9`, tree `a80936ceefbdcdf10e50798b597ee3a32013639d`, parent `f671566e90673cdb1762e6e33a3fa16594e5b735`. Sensor `e87f2a05d4e6cc766ee1d3539ce72999337c7f2a`, world `e143a4e1e7bb9dbef2a639d07ff5d0747ce7271a`, Q test `dbf8304da9a281ab2e7fc7ceb1711199846acb60`, TEMP `ba1b8d1e7b8f038c86950f9ccd671aa5aa555bf7`, report at activation `f9e7631df37eeefbd0c19fa49050ac3547c5e393`. Single Stage B execution, feature ref frozen through terminal. Ordinary options still use the prior 16,384 ceiling. The candidate requires both the fixed own data property and exact request 32,768; the compiler receives the marker solely in the marked preflight and producer steps.

* `pure/130800152383`, limit 3 minutes, success. `npm ci --ignore-scripts --no-audit --no-fund`; `node --check` and `npx eslint` on sensor, world and Q test; `node --test test/finite-budget-diagnostics.test.mjs`: **8 tests, 8 pass, 0 fail, 0 cancelled, 0 skipped, 0 todo**. The original Q6 and new candidate assertions both passed. `AFW_BUDGET_DIAGNOSTIC_CANDIDATE=cap32768 node test/fixtures/finite-budget-world.mjs preflight-budget` completed strict M/QA preparation before I0. 
* `positive_prepare/130800483950`, limit 5 minutes, success. Verified the exact prior pure artifact, then `AFW_BUDGET_DIAGNOSTIC_CANDIDATE=cap32768 node test/fixtures/finite-budget-world.mjs prepare-positive-probe output/finite-budget/producer`, using the prior marked preflight (role, selector, counts, source, run, attempt and marker checks before I0). The existing fixed principal producer ran once with deferred wait. completeNormal=1, completeWrites=1, referenceRows=1, referenceReadbacks=1, noticeRows=1. Actual snapshot limits were [32768]. Original I0/C0/C1 and return time are printed below; disposal occurred at least 849605 ms before C0, originalAlarmObserved=false. No consumer, alarm exercise, full P1, live provider action or further cap comparison ran.
* [Pure 13893480491](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43103332654/artifacts/13893480491), 25,932 ZIP bytes, SHA-256 `eafa8869b3ae671ce98a4f76784ee0ac864d42bf823991ab3709075aedc36260`, expires 2026-11-18 21:28:57 UTC. Explicit repository, run and same-ID REST download verified 5 files including budget-artifact.json, 846 bytes, SHA-256 `30a01a019242cad9e91485e9e9d1fff370662e88d452d4b722935dbe559c2aa8`; verified again by the producer.
* [Producer 13892298718](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43103332654/artifacts/13892298718), 1,646,589 ZIP bytes, SHA-256 `7763545645b74b6909d393b50934998fe28eb521aaa1e758c3aa6fb7a096c4b7`, expires 2026-11-18 21:30:20 UTC. Explicit same-ID REST download verified 9 files including budget-artifact.json, 1,504 bytes, SHA-256 `1ae67cb999656f27d4386648bdd84f7bd79fa1a32b15460e3da39cb6ec96395e`. Source/run/attempt/kind/flags and exact per-path bytes/SHA matched. Producer inventory consists of aggregates.json, console.log, full-result.json, manifest.json, the four original graphs files listed below and budget-artifact.json. It preserves the safe SYN snapshots, graph proofs and native manifest; raw native checkpoint state is not in the archive.

| Producer QA epoch | Ordinary events | Candidate events | Ordinary first invalid, before/after counts | Candidate first invalid, before/after counts |
| --- | ---: | ---: | --- | --- |
| 0 | 19,702 | 22,451 | runMissingLease at 18,212; 0 / 1,466 | none; 0 / 0, no overflow |
| 1 | 274,794 | 284,210 | runMissingLease at 19,690; 0 / 251,321 | runMissingLease at 34,796; 0 / 245,940 |
| 2 | 318,964 | 327,942 | readerOrigin at 1; 14 / 296,394 | readerOrigin at 1; 14 / 291,482 |

In the marked run, QA0 finished below the new limit with no invalids. QA1 again first recorded a missing lease after its own threshold, now at 34,796 after settle 32,769. QA2 crossed on bytes 32,769; its first event again lacked a reader origin and 14 invalids preceded its own saturation. In both runs all three M epochs stayed below the cap with zero invalids. The candidate changes the observed denominators as context retention changes which native operations can be attributed. Event-count differences cannot be interpreted as provider traffic differences. The paired observations support a contribution from saturation in QA0 and QA1. They do not establish the cause of QA2's early observations, or assign a reason to the other 13 individually.

Static provenance at qualified Source: `test/fixtures/finite-initial-entry-world.mjs:168` and `:174` capture immediately before their respective `mf.setOptions`; `test/fixtures/finite-budget-world.mjs:625` increments the epoch label; `test/fixtures/finite-owner-cleanup.mjs:121` asks firstConnectionContext after configuration adoption. The runtime records readerOrigin at `test/fixtures/finite-budget-diagnostics.mjs:225` when the reader's receiver has no recorded body owner. This aggregate does not identify a specific reader call or prove carryover across a remount. The fixed reason map in the preceding diagnostic report remains identical in labels; the candidate inserts four lines before every mapped branch (qualified [sensor](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/80c85c784f38659e5927c5df27613afba21978a9/test/fixtures/finite-budget-diagnostics.mjs)).

**Exact candidate log aggregates** (fixed zero buckets retained; producer step markers omitted).

```jsonl
{"kind":"facts","diagnosticCandidate":"cap32768","actualSnapshotLimits":[32768],"purpose":"afw.finite-budget-producer-probe.syn.v1","scope":"partial-producer-only","source":"80c85c784f38659e5927c5df27613afba21978a9","run":"43103332654","attempt":"1","I0":1794432569000,"C0":1794433469000,"C1":1794433649000,"returnedAt":1794432619395,"completeNormal":1,"completeWrites":1,"referenceRows":1,"referenceReadbacks":1,"noticeRows":1,"disposedBeforeC0":true,"originalAlarmObserved":false,"operationalReadiness":false,"completePackage":false,"PCoff":false}
{"kind":"chronology","segment":"producer","epoch":0,"role":"M","purpose":"afw.finite-budget-chronology.syn.v1","limit":32768,"eventCalls":0,"byEvent":{"root":0,"child":0,"begin":0,"bytes":0,"logical":0,"scopeLogical":0,"cancel":0,"settle":0,"incomplete":0},"firstInvalid":null,"firstOverflow":null,"invalid":{"beforeOverflow":0,"afterOverflow":0},"unattributed":{"beforeOverflow":0,"afterOverflow":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":0}}
{"kind":"reasons","segment":"producer","epoch":0,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"chronology","segment":"producer","epoch":0,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v1","limit":32768,"eventCalls":22451,"byEvent":{"root":1,"child":93,"begin":7581,"bytes":7037,"logical":0,"scopeLogical":0,"cancel":158,"settle":7581,"incomplete":0},"firstInvalid":null,"firstOverflow":null,"invalid":{"beforeOverflow":0,"afterOverflow":0},"unattributed":{"beforeOverflow":0,"afterOverflow":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":544}}
{"kind":"reasons","segment":"producer","epoch":0,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"chronology","segment":"producer","epoch":1,"role":"M","purpose":"afw.finite-budget-chronology.syn.v1","limit":32768,"eventCalls":24,"byEvent":{"root":2,"child":0,"begin":8,"bytes":6,"logical":0,"scopeLogical":0,"cancel":0,"settle":8,"incomplete":0},"firstInvalid":null,"firstOverflow":null,"invalid":{"beforeOverflow":0,"afterOverflow":0},"unattributed":{"beforeOverflow":0,"afterOverflow":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":2}}
{"kind":"reasons","segment":"producer","epoch":1,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"chronology","segment":"producer","epoch":1,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v1","limit":32768,"eventCalls":284210,"byEvent":{"root":2,"child":3997,"begin":11616,"bytes":10955,"logical":0,"scopeLogical":0,"cancel":84,"settle":11616,"incomplete":245940},"firstInvalid":{"event":"incomplete","ordinal":34796,"reason":"runMissingLease","relation":"afterOverflow"},"firstOverflow":{"event":"settle","ordinal":32769},"invalid":{"beforeOverflow":0,"afterOverflow":245940},"unattributed":{"beforeOverflow":0,"afterOverflow":245940},"coverage":{"overflow":true,"invalid":245940,"unattributed":245940,"nativeBytesUnavailable":661}}
{"kind":"reasons","segment":"producer","epoch":1,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":7889,"descendantChild":0,"runMissingLease":11348,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":806,"holderIdentity":0,"invocationIdentity":213184,"invocationRoot":12573,"methodPhase":0,"clockLease":0,"aliasStore":88,"aliasChild":0,"transportPhase":0,"transactionContext":52,"fetchResource":0}}
{"kind":"chronology","segment":"producer","epoch":2,"role":"M","purpose":"afw.finite-budget-chronology.syn.v1","limit":32768,"eventCalls":144,"byEvent":{"root":9,"child":0,"begin":56,"bytes":23,"logical":0,"scopeLogical":0,"cancel":0,"settle":56,"incomplete":0},"firstInvalid":null,"firstOverflow":null,"invalid":{"beforeOverflow":0,"afterOverflow":0},"unattributed":{"beforeOverflow":0,"afterOverflow":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":33}}
{"kind":"reasons","segment":"producer","epoch":2,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"chronology","segment":"producer","epoch":2,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v1","limit":32768,"eventCalls":327942,"byEvent":{"root":4,"child":3764,"begin":11057,"bytes":10496,"logical":0,"scopeLogical":0,"cancel":68,"settle":11057,"incomplete":291496},"firstInvalid":{"event":"incomplete","ordinal":1,"reason":"readerOrigin","relation":"beforeOverflow"},"firstOverflow":{"event":"bytes","ordinal":32769},"invalid":{"beforeOverflow":14,"afterOverflow":291482},"unattributed":{"beforeOverflow":14,"afterOverflow":291482},"coverage":{"overflow":true,"invalid":291496,"unattributed":291496,"nativeBytesUnavailable":561}}
{"kind":"reasons","segment":"producer","epoch":2,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":7731,"descendantChild":0,"runMissingLease":11105,"phaseStore":1,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":820,"holderIdentity":0,"invocationIdentity":258275,"invocationRoot":13029,"methodPhase":0,"clockLease":0,"aliasStore":43,"aliasChild":0,"transportPhase":0,"transactionContext":492,"fetchResource":0}}
{"kind":"proof","path":"graphs/native-syn.json","bytes":1066,"sha256":"d64893f7d7343fc4473552635d7355e80c89b8203f6b8038ad77754af0425a55"}
{"kind":"proof","path":"graphs/metafiles.json","bytes":448785,"sha256":"98747aaa0eaf2dd8772f5c35752664e6412db424eef899dcece178abba2f31eb"}
{"kind":"proof","path":"graphs/canary-index.mjs","bytes":2061138,"sha256":"dc5672b6244fe7f0724901ed0c0490f11b2e6c2c82f1cbfb84e313e6962fc4f6"}
{"kind":"proof","path":"graphs/qa-index.mjs","bytes":2693715,"sha256":"283c6a32e7b303bee0b5050da7dc0e9c5c24e12879b02295282d11d23e71365e"}
{"kind":"proof","path":"manifest.json","bytes":9904,"sha256":"75791c9fac4788219846da3ec8edd4e3f3732b95cb23147a90a109ceb77b96c8"}
```

Terminal action: retire TEMP, append these results, verify feature/main and full protected tree. No automatic cap increase, promotion or further experiment. Root's causal decision remains pending. operationalReadiness=false, completePackage=false, PCoff=false.


### 2026-11-11 UTC — fixed reader-site provenance, pure RED

BASE-E `69f5c5da6af1407e8ecb706a96c89fb3678c5f51`, tree `eb0f0df245be309a6b0d55dc25dee88e0a46f80d`, report blob `dbf341d434b2a1befd770ad9ffec64e29d89eb8c`. Root authorized an ordinary 16,384-cap diagnostic to identify the selected reader sites and the actual store context on the first reader-origin failure. Existing retention, calls, ownership, validation and attribution decisions remain fixed. [Diagnostic brief](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/92daaa99a040a2754d6876efc9b423a95500d3f3/docs/superpowers/briefs/2026-11-11-finite-budget-reader-site-diagnostic.md)

Pure RED Source `d2d0ff36273c845f1c7d84a362d1864c0931b27d`, tree `8cf2921a7dc3b2fd4c335e6d7cbbe8b6ef3a2d33`, Q test `dff00b554c40669a4333660ab6c64e5ae7e6bc5f`, TEMP `1b4ccbfd219c9608f94e3c8c574985618d26af65`. Unchanged ordinary/candidate sensor `e87f2a05d4e6cc766ee1d3539ce72999337c7f2a`. [Run 43104984521](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43104984521), attempt 1, job 130805854383, terminal success. After locked npm ci, `node --test test/finite-budget-diagnostics.test.mjs` executed 8 tests: 7 pass, 1 intended Q6 failure at `missing fixed reader-site provenance`, 0 cancelled, skipped or todo. No native execution or I0. [Artifact 13891964990](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43104984521/artifacts/13891964990), ZIP 1,438 bytes, SHA-256 `eb297756fd1ba95aa9a152b5f5e36ae210c729453657dd38c1ef37ca0a89ff4b`, expiry 2026-11-18 21:40:06 UTC. Same-ID REST readback verified source, run, attempt, kind, flags and exact 2-file inventory; budget-artifact.json 408 bytes, SHA-256 `fa18f94eccf30296a6f76794a9584120c92513a35f47cd2ecf2e99e27ea2a6ed`.

One marked-by-purpose, ordinary-limit producer-only probe follows the pure contract and strict M/QA preflight. The candidate-cap environment variable stays unset. The append records the RED and intended comparison scope, not a native result.


### 2026-11-11 UTC — reader-site probe stopped by lint before tests and I0

[Run 43105402978](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43105402978), attempt 1, push; terminal failure. Source `8ae77fc486ec308701a8058675083fc6f0e6049d`, tree `67707c731c0aa6c51152f1cd776e0a84106676ce`, parent `d2d0ff36273c845f1c7d84a362d1864c0931b27d`, report at activation `71cdcfa48d91257fa1f7fa268620b7f16c49856b`. Attempted source blobs: sensor `edec2496ef704956bd6a3357c97a783274a256a5`, world `51ab3a8cef8ac72e3085558b71c450cd2b9081b7`, test `dff00b554c40669a4333660ab6c64e5ae7e6bc5f`, TEMP `cfdcd1375c34a47f024caff3c73d13806155e890`. Descriptor remained `be695028e4c12c3cb7d3b7bf2c5f2e7508f3db15`. The Source ref remained frozen to terminal.

Pure job 130807310028 installed locked dependencies with `npm ci --ignore-scripts --no-audit --no-fund`. `node --check` completed on all three paths. `npx eslint test/fixtures/finite-budget-diagnostics.mjs test/fixtures/finite-budget-world.mjs test/finite-budget-diagnostics.test.mjs` returned 1 error and 0 warnings. [World line 258](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/8ae77fc486ec308701a8058675083fc6f0e6049d/test/fixtures/finite-budget-world.mjs#L258) binds a loop variable named `module`, violating `@next/next/no-assign-module-variable`. This is a deterministic linter finding in the new compiler helper. Stage B executed zero Q groups, produced no TAP counts, skipped strict preflight and skipped its entire dependent producer job 130807573497. The previous intended RED remains 8 tests, 7 pass, 1 expected failure. There is no Stage B 8Q pass.

Evidence seal/upload and same-ID REST download and inventory validation succeeded. [Artifact 13894006069](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43105402978/artifacts/13894006069), 725 ZIP bytes, SHA-256 `732db0c90ac7f21de2b3265552ac9e81ac36a5554ede67367210b2254cf8247e`, expires 2026-11-18 21:42:51 UTC. Verified 2 files including lint.log and budget-artifact.json (406 bytes; SHA-256 `af2eb72dec788be6182bef1cd30f7bb0190ea98c2e7e8ae86b6c549972f7d38b`). Manifest source/run/attempt/kind and all three false flags matched. No candidate binary artifact or native checkpoint was produced. I0, C0, C1, SDK/Reference/Notice and actual reader-site counts/context are unobserved in this attempt, as is an actual snapshot limit. Zero observations must not be reported as a measured zero histogram.

**Unqualified, static catalog from the pinned descriptor.** The numbering below follows the selected role, lexical path, fixed selector and one-based occurrence. These are declared slots: 33 Source selector groups, 36 source occurrences before role expansion, 45 role-specific source slots, 9 role-specific package slots, 54 total. Zero is reserved for unknown. Existing supplemental/entry selections add no declared reader slot. Raw source lines come from the descriptor; blank package line entries require actual prepared AST proof. No complete compiler match or prepared line/column for this revision can be claimed because its preflight was skipped.

| ID | Role | Pinned path | Selector | Occurrence | Descriptor raw line |
| ---: | --- | --- | --- | ---: | ---: |
| 1 | M | `lib/delegated-oauth-worker.mjs` | 0 | 1 | 36 |
| 2 | M | `lib/dossier-monitoring-owner-http.mjs` | 0 | 1 | 21 |
| 3 | M | `lib/mcp-activation-observer.mjs` | 1 | 1 | 49 |
| 4 | M | `lib/mcp-node-private-bridge.mjs` | 1 | 1 | 69 |
| 5 | M | `lib/mcp-original-container-runtime.mjs` | 0 | 1 | 16 |
| 6 | M | `lib/mcp-own-synthetic-save-http.mjs` | 0 | 1 | 10 |
| 7 | M | `lib/mcp-publication-artifact-reader.mjs` | 1 | 1 | 22 |
| 8 | M | `lib/mcp-qa-finite-fixed-policy-engine.mjs` | 1 | 1 | 48 |
| 9 | M | `lib/mcp-qa-finite-owner-native-wire.mjs` | 0 | 1 | 43 |
| 10 | M | `lib/mcp-qa-finite-owner-notice-consent-body.mjs` | 0 | 1 | 5 |
| 11 | M | `lib/mcp-qa-finite-owner-preparation.mjs` | 0 | 1 | 115 |
| 12 | M | `lib/mcp-qa-finite-seed-wire.mjs` | 1 | 1 | 27 |
| 13 | M | `lib/mcp-retirement-provider-reader.mjs` | 1 | 1 | 25 |
| 14 | M | `lib/mcp-successor-deployment-reader.mjs` | 1 | 1 | 23 |
| 15 | M | `node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js` | readerFactory | 1 |  |
| 16 | M | `node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js` | readerFactory | 2 |  |
| 17 | M | `node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js` | readerFactory | 3 |  |
| 18 | M | `node_modules/@modelcontextprotocol/server/dist/index.mjs` | readerFactory | 1 |  |
| 19 | M | `node_modules/agents/dist/handler-stateless-VvrWSAVA.js` | readerFactory | 1 |  |
| 20 | M | `node_modules/agents/dist/handler-stateless-VvrWSAVA.js` | readerFactory | 2 |  |
| 21 | QA | `lib/assistance-administrative-get-transport.mjs` | 1 | 1 | 25 |
| 22 | QA | `lib/assistance-private-provider-get-transport.mjs` | 1 | 1 | 27 |
| 23 | QA | `lib/assistance-provider-token-name.mjs` | 1 | 1 | 18 |
| 24 | QA | `lib/assistance-service-identity-transport.mjs` | 1 | 1 | 49 |
| 25 | QA | `lib/mcp-activation-observer.mjs` | 1 | 1 | 49 |
| 26 | QA | `lib/mcp-canary-restoration-transport.mjs` | 1 | 1 | 97 |
| 27 | QA | `lib/mcp-closed-version-upload.mjs` | 1 | 1 | 38 |
| 28 | QA | `lib/mcp-closure-reader-probe.mjs` | 7 | 1 | 115 |
| 29 | QA | `lib/mcp-publication-artifact-reader.mjs` | 1 | 1 | 22 |
| 30 | QA | `lib/mcp-qa-finite-bootstrap-native.mjs` | 3 | 1 | 40 |
| 31 | QA | `lib/mcp-qa-finite-fixed-policy-engine.mjs` | 1 | 1 | 48 |
| 32 | QA | `lib/mcp-qa-finite-historical-source.mjs` | 8 | 1 | 213 |
| 33 | QA | `lib/mcp-qa-finite-initial-cleanup.mjs` | 11 | 1 | 128 |
| 34 | QA | `lib/mcp-qa-finite-initial-custody-probe.mjs` | 3 | 1 | 41 |
| 35 | QA | `lib/mcp-qa-finite-initial-entry.mjs` | 21 | 1 | 82 |
| 36 | QA | `lib/mcp-qa-finite-initial-entry.mjs` | 21 | 2 | 242 |
| 37 | QA | `lib/mcp-qa-finite-initial-entry.mjs` | 21 | 3 | 315 |
| 38 | QA | `lib/mcp-qa-finite-initial-material.mjs` | 3 | 1 | 48 |
| 39 | QA | `lib/mcp-qa-finite-initial-old-guard.mjs` | 1 | 1 | 26 |
| 40 | QA | `lib/mcp-qa-finite-initial-owner-source.mjs` | 8 | 1 | 75 |
| 41 | QA | `lib/mcp-qa-finite-owner-cleanup.mjs` | 10 | 1 | 183 |
| 42 | QA | `lib/mcp-qa-finite-owner-cleanup.mjs` | 10 | 2 | 667 |
| 43 | QA | `lib/mcp-qa-finite-owner-native-wire.mjs` | 0 | 1 | 43 |
| 44 | QA | `lib/mcp-qa-finite-owner-notice-consent-body.mjs` | 0 | 1 | 5 |
| 45 | QA | `lib/mcp-qa-finite-owner-phase-context.mjs` | 13 | 1 | 116 |
| 46 | QA | `lib/mcp-qa-finite-owner-preparation.mjs` | 0 | 1 | 115 |
| 47 | QA | `lib/mcp-qa-finite-seed-wire.mjs` | 1 | 1 | 27 |
| 48 | QA | `lib/mcp-retirement-provider-reader.mjs` | 1 | 1 | 25 |
| 49 | QA | `lib/mcp-successor-deployment-reader.mjs` | 1 | 1 | 23 |
| 50 | QA | `lib/operations-service-request-controls.mjs` | 0 | 1 | 24 |
| 51 | QA | `node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js` | readerFactory | 1 |  |
| 52 | QA | `node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js` | readerFactory | 2 |  |
| 53 | QA | `node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js` | readerFactory | 3 |  |
| 54 | QA | `scripts/check-own-cron-provider.mjs` | 1 | 1 | 115 |

Terminal action: retire TEMP and preserve this failed attempt. No automatic correction, rerun, promotion, lifecycle acceptance or PC-off rehearsal. Task1 NEEDS_CONTEXT for Root ruling. operationalReadiness=false, completePackage=false, PCoff=false.


### 2026-11-11 UTC — one corrected reader qualification authorized

Root independently confirmed the single ESLint error in run 43105402978 and verified its failure artifact. The accepted RED and failed qualification are preserved above. [Root ruling](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/133f2a3303ee0df531a0961319ec9e47c3f225c3/docs/superpowers/briefs/2026-11-11-finite-budget-reader-site-diagnostic.md). From cleanup `46df7e9f6da6eb8e9793d00c1a6b345a9aed5ad6` / tree `2e0e82eff7a9b34f74dc359808f1cfd734367075` / report `b97ed2c97ea8830b04e7dc08935b38103d85b593`, only the catalog loop variable and its references are renamed from module to descriptor. Replacing the new identifier with its old name in that loop reconstructs the prior source byte-for-byte. The same temporary workflow is restored for one ordinary-cap qualification. No RED is repeated and no additional diagnostic or behavior change is part of this authorization.


### 2026-11-11 UTC — corrected ordinary producer identifies the early reader site

[Run 43106034899](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43106034899), attempt 1, push, terminal success. Source `1c10a4c4514675cf02b32878b19f4071cf299176`, tree `878c6b5ca591ace8f528dce0907fcb0d0cde4193`, parent `46df7e9f6da6eb8e9793d00c1a6b345a9aed5ad6`. Source-world blob `c768af1b01af2b8216273765da62d00894b65b33`, sensor `edec2496ef704956bd6a3357c97a783274a256a5`, Q test `dff00b554c40669a4333660ab6c64e5ae7e6bc5f`, TEMP `cfdcd1375c34a47f024caff3c73d13806155e890`, report at activation `f9facf78400908079ccea857ec89a01916e7f728`. The CAS acknowledgement was followed by a discrepant first ref read; a fresh read confirmed the intended head/parent, unchanged main, exact full tree and sole activation run. No second ref mutation or job retry was used. Source was frozen through terminal. The accepted RED and original lint failure remain recorded above.

* Pure job 130809480535, 3-minute limit, success. `npm ci --ignore-scripts --no-audit --no-fund`, `node --check` and `npx eslint` on the sensor/world/Q file. `node --test test/finite-budget-diagnostics.test.mjs` executed 8 tests, 8 pass, 0 fail, 0 cancelled, 0 skipped, 0 todo. With the candidate variable absent, `node test/fixtures/finite-budget-world.mjs preflight-budget` compiled both prepared roles. Their closure covered all pinned selected reader hooks; original path/selector gates stayed enabled.
* Dependent producer job 130809927084, 5-minute limit, success. It downloaded and reverified the same pure ID. The compiler checked the exact role/path/selector/occurrence/line/column reader map against pure before I0, alongside all existing closed input checks. `node test/fixtures/finite-budget-world.mjs prepare-positive-probe output/finite-budget/producer` used the existing single principal producer with deferred wait, no cap marker, and actual limit 16,384 in every snapshot. Genuine completeNormal=1, completeWrites=1, Reference rows/readbacks=1/1, Notice rows=1. Original I0/C0/C1 and return time are below. The return after disposal preceded C0 by 854206 ms. OriginalAlarmObserved=false. No consumer, full P1, live provider or PC-off run.
* [Pure 13894346433](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43106034899/artifacts/13894346433), 27,353 ZIP bytes, SHA-256 `6b63607d374a5cb94495824254e70cc2b71b4d6a5b03e1caec6aeff43962529e`, expires 2026-11-18T21:47:31Z. Exact same-ID REST readback verified 5 files and budget-artifact.json of 846 bytes, SHA-256 `608ce40e38055b1f04875ed2fd1d0e2e3e9d50ff505869a3558e54770e106724`, with source/run/attempt/kind and false flags checked.
* [Producer 13894386455](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43106034899/artifacts/13894386455), 1,515,867 ZIP bytes, SHA-256 `bf589c85c545b0409ba65dcd425e2a0626848d3ef48d7af50bbc20cea20f1e3a`, expires 2026-11-18T21:48:43Z. Exact same-ID REST readback verified 9 files and budget-artifact.json of 1504 bytes, SHA-256 `217b2d283faf8e415452c76526fcfd8275d3a04f23cf2239137baf8862e73bc3`, with source/run/attempt/kind and false flags checked.

Pure inventory: tests.log, lint.log, preflight.log, preflight.json, budget-artifact.json. Producer inventory: aggregates.json, console.log, full-result.json, manifest.json, four graphs files (individual sizes/hashes below), budget-artifact.json. The safe original snapshot arrays include each fixed site 1…54 and unknown slot 0, split before/after threshold. Exact nonzero buckets are reproduced below; every omitted site/epoch bucket was zero. The full raw checkpoint is not an exported recovery artifact.

**Observed early QA2 failures.** All 14 pre-overflow readerOrigin events in QA2 occurred at fixed QA site 45, `lib/mcp-qa-finite-owner-phase-context.mjs`, selector 13, occurrence 1, prepared line 116 column 13. The first occurred at ordinal 1 with actual current context `excluded`. The probe records the context only for the first reader-origin failure in an epoch. It cannot establish the individual contexts of the other 13 or the caller that established the first excluded store. QA1's first readerOrigin also occurred at site 45, with actual `no_store` at ordinal 20,157, after its own overflow. The site alone cannot justify exclusion. Known-origin propagation, real unknown-origin failures and all old increments were preserved. No attribution, early return or factory behavior was corrected here.

**Verified site map.** Line and column form a one-based coordinate in the qualified prepared source, before emission. The original descriptor remains pinned at `be695028e4c12c3cb7d3b7bf2c5f2e7508f3db15`. Each numbered entry below matched both compilations. Paths and selectors are compiler proof only; runtime data carries a closed integer.

| ID | Role | Pinned path | Selector | Occurrence | Prepared line | Column |
| ---: | --- | --- | --- | ---: | ---: | ---: |
| 1 | M | `lib/delegated-oauth-worker.mjs` | 0 | 1 | 36 | 16 |
| 2 | M | `lib/dossier-monitoring-owner-http.mjs` | 0 | 1 | 21 | 15 |
| 3 | M | `lib/mcp-activation-observer.mjs` | 1 | 1 | 49 | 11 |
| 4 | M | `lib/mcp-node-private-bridge.mjs` | 1 | 1 | 69 | 33 |
| 5 | M | `lib/mcp-original-container-runtime.mjs` | 0 | 1 | 16 | 15 |
| 6 | M | `lib/mcp-own-synthetic-save-http.mjs` | 0 | 1 | 10 | 141 |
| 7 | M | `lib/mcp-publication-artifact-reader.mjs` | 1 | 1 | 22 | 12 |
| 8 | M | `lib/mcp-qa-finite-fixed-policy-engine.mjs` | 1 | 1 | 48 | 12 |
| 9 | M | `lib/mcp-qa-finite-owner-native-wire.mjs` | 0 | 1 | 43 | 15 |
| 10 | M | `lib/mcp-qa-finite-owner-notice-consent-body.mjs` | 0 | 1 | 5 | 15 |
| 11 | M | `lib/mcp-qa-finite-owner-preparation.mjs` | 0 | 1 | 115 | 16 |
| 12 | M | `lib/mcp-qa-finite-seed-wire.mjs` | 1 | 1 | 27 | 12 |
| 13 | M | `lib/mcp-retirement-provider-reader.mjs` | 1 | 1 | 25 | 11 |
| 14 | M | `lib/mcp-successor-deployment-reader.mjs` | 1 | 1 | 23 | 12 |
| 15 | M | `node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js` | readerFactory | 1 | 710 | 17 |
| 16 | M | `node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js` | readerFactory | 2 | 1076 | 17 |
| 17 | M | `node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js` | readerFactory | 3 | 4730 | 17 |
| 18 | M | `node_modules/@modelcontextprotocol/server/dist/index.mjs` | readerFactory | 1 | 993 | 19 |
| 19 | M | `node_modules/agents/dist/handler-stateless-VvrWSAVA.js` | readerFactory | 1 | 144 | 19 |
| 20 | M | `node_modules/agents/dist/handler-stateless-VvrWSAVA.js` | readerFactory | 2 | 215 | 17 |
| 21 | QA | `lib/assistance-administrative-get-transport.mjs` | 1 | 1 | 25 | 11 |
| 22 | QA | `lib/assistance-private-provider-get-transport.mjs` | 1 | 1 | 27 | 11 |
| 23 | QA | `lib/assistance-provider-token-name.mjs` | 1 | 1 | 18 | 16 |
| 24 | QA | `lib/assistance-service-identity-transport.mjs` | 1 | 1 | 49 | 11 |
| 25 | QA | `lib/mcp-activation-observer.mjs` | 1 | 1 | 49 | 11 |
| 26 | QA | `lib/mcp-canary-restoration-transport.mjs` | 1 | 1 | 97 | 12 |
| 27 | QA | `lib/mcp-closed-version-upload.mjs` | 1 | 1 | 38 | 12 |
| 28 | QA | `lib/mcp-closure-reader-probe.mjs` | 7 | 1 | 115 | 14 |
| 29 | QA | `lib/mcp-publication-artifact-reader.mjs` | 1 | 1 | 22 | 12 |
| 30 | QA | `lib/mcp-qa-finite-bootstrap-native.mjs` | 3 | 1 | 40 | 13 |
| 31 | QA | `lib/mcp-qa-finite-fixed-policy-engine.mjs` | 1 | 1 | 48 | 12 |
| 32 | QA | `lib/mcp-qa-finite-historical-source.mjs` | 8 | 1 | 213 | 12 |
| 33 | QA | `lib/mcp-qa-finite-initial-cleanup.mjs` | 11 | 1 | 128 | 12 |
| 34 | QA | `lib/mcp-qa-finite-initial-custody-probe.mjs` | 3 | 1 | 41 | 13 |
| 35 | QA | `lib/mcp-qa-finite-initial-entry.mjs` | 21 | 1 | 82 | 13 |
| 36 | QA | `lib/mcp-qa-finite-initial-entry.mjs` | 21 | 2 | 242 | 15 |
| 37 | QA | `lib/mcp-qa-finite-initial-entry.mjs` | 21 | 3 | 315 | 11 |
| 38 | QA | `lib/mcp-qa-finite-initial-material.mjs` | 3 | 1 | 48 | 14 |
| 39 | QA | `lib/mcp-qa-finite-initial-old-guard.mjs` | 1 | 1 | 26 | 12 |
| 40 | QA | `lib/mcp-qa-finite-initial-owner-source.mjs` | 8 | 1 | 75 | 13 |
| 41 | QA | `lib/mcp-qa-finite-owner-cleanup.mjs` | 10 | 1 | 183 | 13 |
| 42 | QA | `lib/mcp-qa-finite-owner-cleanup.mjs` | 10 | 2 | 667 | 11 |
| 43 | QA | `lib/mcp-qa-finite-owner-native-wire.mjs` | 0 | 1 | 43 | 15 |
| 44 | QA | `lib/mcp-qa-finite-owner-notice-consent-body.mjs` | 0 | 1 | 5 | 15 |
| 45 | QA | `lib/mcp-qa-finite-owner-phase-context.mjs` | 13 | 1 | 116 | 13 |
| 46 | QA | `lib/mcp-qa-finite-owner-preparation.mjs` | 0 | 1 | 115 | 16 |
| 47 | QA | `lib/mcp-qa-finite-seed-wire.mjs` | 1 | 1 | 27 | 12 |
| 48 | QA | `lib/mcp-retirement-provider-reader.mjs` | 1 | 1 | 25 | 11 |
| 49 | QA | `lib/mcp-successor-deployment-reader.mjs` | 1 | 1 | 23 | 12 |
| 50 | QA | `lib/operations-service-request-controls.mjs` | 0 | 1 | 24 | 18 |
| 51 | QA | `node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js` | readerFactory | 1 | 710 | 17 |
| 52 | QA | `node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js` | readerFactory | 2 | 1076 | 17 |
| 53 | QA | `node_modules/@cloudflare/workers-oauth-provider/dist/oauth-provider.js` | readerFactory | 3 | 4730 | 17 |
| 54 | QA | `scripts/check-own-cron-provider.mjs` | 1 | 1 | 115 | 11 |

**Exact safe aggregates.** Site-map log records are represented by the verified table above; step markers are omitted. The JSONL retains the facts, chronology, fixed-reason histograms, first reader-origin observations, nonzero per-site splits and file proofs.

```jsonl
{"kind":"facts","diagnosticCandidate":null,"actualSnapshotLimits":[16384],"purpose":"afw.finite-budget-producer-probe.syn.v1","scope":"partial-producer-only","source":"1c10a4c4514675cf02b32878b19f4071cf299176","run":"43106034899","attempt":"1","I0":1794433677000,"C0":1794434577000,"C1":1794434757000,"returnedAt":1794433722794,"completeNormal":1,"completeWrites":1,"referenceRows":1,"referenceReadbacks":1,"noticeRows":1,"disposedBeforeC0":true,"originalAlarmObserved":false,"operationalReadiness":false,"completePackage":false,"PCoff":false}
{"kind":"chronology","segment":"producer","epoch":0,"role":"M","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":0,"byEvent":{"root":0,"child":0,"begin":0,"bytes":0,"logical":0,"scopeLogical":0,"cancel":0,"settle":0,"incomplete":0},"firstInvalid":null,"firstOverflow":null,"invalid":{"beforeOverflow":0,"afterOverflow":0},"unattributed":{"beforeOverflow":0,"afterOverflow":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":0}}
{"kind":"reasons","segment":"producer","epoch":0,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":0,"role":"M","firstReaderOrigin":null,"before":0,"after":0}
{"kind":"chronology","segment":"producer","epoch":0,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":19703,"byEvent":{"root":1,"child":93,"begin":6147,"bytes":5714,"logical":0,"scopeLogical":0,"cancel":134,"settle":6147,"incomplete":1467},"firstInvalid":{"event":"incomplete","ordinal":18212,"reason":"runMissingLease","relation":"afterOverflow"},"firstOverflow":{"event":"settle","ordinal":16385},"invalid":{"beforeOverflow":0,"afterOverflow":1467},"unattributed":{"beforeOverflow":0,"afterOverflow":1467},"coverage":{"overflow":true,"invalid":1467,"unattributed":1467,"nativeBytesUnavailable":433}}
{"kind":"reasons","segment":"producer","epoch":0,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":15,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":12,"holderIdentity":0,"invocationIdentity":1335,"invocationRoot":99,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":6,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":0,"role":"QA","firstReaderOrigin":{"ordinal":18252,"relation":"afterOverflow","site":32,"context":"no_store"},"before":0,"after":12}
{"kind":"readerCounts","segment":"producer","epoch":0,"role":"QA","site":32,"before":0,"after":1}
{"kind":"readerCounts","segment":"producer","epoch":0,"role":"QA","site":35,"before":0,"after":8}
{"kind":"readerCounts","segment":"producer","epoch":0,"role":"QA","site":36,"before":0,"after":3}
{"kind":"chronology","segment":"producer","epoch":1,"role":"M","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":24,"byEvent":{"root":2,"child":0,"begin":8,"bytes":6,"logical":0,"scopeLogical":0,"cancel":0,"settle":8,"incomplete":0},"firstInvalid":null,"firstOverflow":null,"invalid":{"beforeOverflow":0,"afterOverflow":0},"unattributed":{"beforeOverflow":0,"afterOverflow":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":2}}
{"kind":"reasons","segment":"producer","epoch":1,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":1,"role":"M","firstReaderOrigin":null,"before":0,"after":0}
{"kind":"chronology","segment":"producer","epoch":1,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":275074,"byEvent":{"root":2,"child":3997,"begin":6586,"bytes":6278,"logical":0,"scopeLogical":0,"cancel":48,"settle":6586,"incomplete":251577},"firstInvalid":{"event":"incomplete","ordinal":19714,"reason":"runMissingLease","relation":"afterOverflow"},"firstOverflow":{"event":"settle","ordinal":16385},"invalid":{"beforeOverflow":0,"afterOverflow":251577},"unattributed":{"beforeOverflow":0,"afterOverflow":251577},"coverage":{"overflow":true,"invalid":251577,"unattributed":251577,"nativeBytesUnavailable":308}}
{"kind":"reasons","segment":"producer","epoch":1,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":7889,"descendantChild":0,"runMissingLease":11655,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":824,"holderIdentity":0,"invocationIdentity":218161,"invocationRoot":12908,"methodPhase":0,"clockLease":0,"aliasStore":88,"aliasChild":0,"transportPhase":0,"transactionContext":52,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":1,"role":"QA","firstReaderOrigin":{"ordinal":20157,"relation":"afterOverflow","site":45,"context":"no_store"},"before":0,"after":824}
{"kind":"readerCounts","segment":"producer","epoch":1,"role":"QA","site":31,"before":0,"after":11}
{"kind":"readerCounts","segment":"producer","epoch":1,"role":"QA","site":45,"before":0,"after":812}
{"kind":"readerCounts","segment":"producer","epoch":1,"role":"QA","site":46,"before":0,"after":1}
{"kind":"chronology","segment":"producer","epoch":2,"role":"M","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":144,"byEvent":{"root":9,"child":0,"begin":56,"bytes":23,"logical":0,"scopeLogical":0,"cancel":0,"settle":56,"incomplete":0},"firstInvalid":null,"firstOverflow":null,"invalid":{"beforeOverflow":0,"afterOverflow":0},"unattributed":{"beforeOverflow":0,"afterOverflow":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":33}}
{"kind":"reasons","segment":"producer","epoch":2,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":2,"role":"M","firstReaderOrigin":null,"before":0,"after":0}
{"kind":"chronology","segment":"producer","epoch":2,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":319337,"byEvent":{"root":4,"child":3764,"begin":6369,"bytes":6034,"logical":0,"scopeLogical":0,"cancel":40,"settle":6369,"incomplete":296757},"firstInvalid":{"event":"incomplete","ordinal":1,"reason":"readerOrigin","relation":"beforeOverflow"},"firstOverflow":{"event":"settle","ordinal":16385},"invalid":{"beforeOverflow":14,"afterOverflow":296743},"unattributed":{"beforeOverflow":14,"afterOverflow":296743},"coverage":{"overflow":true,"invalid":296757,"unattributed":296757,"nativeBytesUnavailable":335}}
{"kind":"reasons","segment":"producer","epoch":2,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":7731,"descendantChild":0,"runMissingLease":11287,"phaseStore":1,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":834,"holderIdentity":0,"invocationIdentity":263120,"invocationRoot":13241,"methodPhase":0,"clockLease":0,"aliasStore":43,"aliasChild":0,"transportPhase":0,"transactionContext":500,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":2,"role":"QA","firstReaderOrigin":{"ordinal":1,"relation":"beforeOverflow","site":45,"context":"excluded"},"before":14,"after":820}
{"kind":"readerCounts","segment":"producer","epoch":2,"role":"QA","site":45,"before":14,"after":820}
{"kind":"proof","path":"graphs/native-syn.json","bytes":1066,"sha256":"dd40cd78230c65b79a21991ebcdff3f2d09b69f9b418d7f525db54ef0cb035a5"}
{"kind":"proof","path":"graphs/metafiles.json","bytes":448787,"sha256":"142cf76ce6a0e78573bafa20b09c2efda2aa27110403c2f4f49474fd32288144"}
{"kind":"proof","path":"graphs/canary-index.mjs","bytes":2062500,"sha256":"7f45d2e952ba74acc17286855d76fde5ffaba423c1c79eba1dd391c274e19573"}
{"kind":"proof","path":"graphs/qa-index.mjs","bytes":2695973,"sha256":"b996ae421bbe60a3490283e4ed9a0796a2834922b79c5d9c0591e91d130aa341"}
{"kind":"proof","path":"manifest.json","bytes":9903,"sha256":"ab5d79e84bb50e5a453f8bc3fc15f927165a1cd49e2f6e4ff25e341f626d3d60"}
```

Terminal action: retire TEMP and preserve the verified source and evidence. The producer-only experiment is complete. Task1 and the PC-off rehearsal remain pending. operationalReadiness=false, completePackage=false, PCoff=false.


### 2026-11-11 UTC — RED: existing fixture exclusion and unowned reader factory

BASE `9ea350ca6234a520d1457569a8ca6ff61fc0d591`, tree `ec042db8fd7ff28a592fde991edc69de2b6c1d99`, report blob `757a761530f3e746d659085fd31d9b1b49bf061c`. Root authorized one test-only correction after the observed first excluded-store readerOrigin. [Bounded correction brief](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/8da761d15fc52e7431bd04c702d0dbe5c13ae7b9/docs/superpowers/briefs/2026-11-11-finite-budget-excluded-reader-fix.md)

RED Source `d83865bc1a93b150e9da95b6495505c628ba43ae`, tree `921fb870a0437918513e54897bbeb1380a872be1`, test `6c7a81b9e95e4aa7c04b7c2e89262415ada20b8b`, TEMP `fb6af6265de34a362481107b22e46ad57da6c06a`, prior sensor unchanged `edec2496ef704956bd6a3357c97a783274a256a5`. [Run 43107068701](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43107068701), attempt 1, job 130813050746: locked install, then `node --test test/finite-budget-diagnostics.test.mjs`, 8 tests, 7 pass, 1 intended Q6 failure at `declared fixture-only missing reader must not count as an invalid`, 0 cancelled/skipped/todo. No native producer or I0. Same-ID REST readback verified [artifact 13894751944](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43107068701/artifacts/13894751944), 1,458 ZIP bytes, SHA-256 `18384fddf0e157062710a768668ce3b2636ef2c0b38eadf97dc894b93107dd56`, expiry 2026-11-18 21:54:13 UTC, 2 paths, manifest 408 bytes, SHA-256 `b55a60c2ac5454e59b897f60dd512c2ea9286e72bc8554e60ba04989df945e5c`, matching source/run/attempt/kind and false flags.

One ordinary 16,384-cap verification follows. The proposed guard checks the actual fixture store after original invocation and known-owner propagation; it adds no site or method exclusion. The completed RED and the preceding observations are preserved regardless of the native outcome.


### 2026-11-11 UTC — excluded-reader correction: pure tests passed, producer skipped on artifact download

[Run 43107327439](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43107327439), attempt 1, push, terminal **failure**. Source `71dfad8e3abd12309f89bfe6262eadfdf7a7d1ec`, tree `c5b0ff69948d2a19d2b29e33df25757a929a5dee`, parent `d83865bc1a93b150e9da95b6495505c628ba43ae`, sensor `3d494abe3aac52df269ff177931bc1c85c9feed9`, Q test `6c7a81b9e95e4aa7c04b7c2e89262415ada20b8b`, unchanged world `c768af1b01af2b8216273765da62d00894b65b33`, TEMP `55889478f81e3dfc19d9b981e5a504cfbba55af2`, activation report `6a8742581486c1f258e7626464e186e66d9c4e59`. The only source implementation edit qualifies the missing-owner reader branch with `currentStore?.excluded!==true` after the original factory call and known-owner propagation. The Source ref remained frozen until terminal.

Pure job 130813943884 passed locked install, `node --check` and focused `npx eslint` on the sensor/world/Q files. `node --test test/finite-budget-diagnostics.test.mjs` ran **8 tests, 8 pass, 0 fail, 0 cancelled, 0 skipped, 0 todo**. The controlled paired regression exercised the same unowned reader inside and outside runtime.fixture. It verified original receiver, argument, effect count, returned Promise and thrown error, zero fixture-only errors, and exactly one no_store observation outside the fixture. A known-owner body through fixture retained original root/child/phase, its fetch link and original Promise/native effects. The ordinary, candidate and fixed site tests remain in the same eight groups. `node test/fixtures/finite-budget-world.mjs preflight-budget` passed the compile-only role checks, including the fixed 54-site catalog, with the candidate variable absent.

Pure evidence sealing and upload succeeded. [Artifact 13894128295](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43107327439/artifacts/13894128295), ZIP 27,352 bytes, SHA-256 `a191b14983959cf3bd9ecfe1e5d43e5301c08930ae1f32bb757368185fa2a70c`, expiry 2026-11-18 21:56:24 UTC. Explicit same-ID/repository/run REST listing **found 1 artifact** and printed that exact ID, size and expected digest. The subsequent download returned Not Found; verifyBudgetArtifact then returned ENOENT for its missing downloaded manifest. The later connector artifact list matched and download-by-ID returned a file reference. A connector reference alone provides no independently verified ZIP contents. The runner's exact inventory/manifest readback failed. Its underlying service cause is unconfirmed. This failure occurred after successful ID discovery, unlike the earlier zero-ID listing failure.

The dependent producer job 130814342835 was skipped, so there was no I0, C0, C1, native SDK/Reference/Notice observation, native reader-map comparison, actual snapshot limit or new before/after/site/context evidence. The earlier site 45 breakdown remains historical. This run does not establish whether the 14 pre-overflow QA2 events disappear after the correction. No additional attempt or cap experiment followed this failure.

Terminal action: preserve evidence and retire TEMP. Task1 NEEDS_CONTEXT for Root's ruling; operationalReadiness=false, completePackage=false, PCoff=false.


### 2026-11-11 UTC — bounded same-ID artifact download recovery

[Root ruling](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/b35538dd0604eeca9b5d8b81239bf5c5cc2add50/docs/superpowers/briefs/2026-11-11-finite-budget-excluded-reader-fix.md). Start at terminal cleanup `7c41f3e863e5761e7c79248f22a3c1940774e210`, tree `f161e45d9009df8d9f470b9050ee193a7ce536a1`, report `e2cd50bd4ff0b0b51d8dd1c4f547b02ac8f50ca3`. The sensor, Q tests, compiler, descriptors and producer files stay byte-identical to the tested Source `71dfad8e3abd12309f89bfe6262eadfdf7a7d1ec`. The only code change restores TEMP with up to three downloads of the exact uploaded artifact ID at each original download point. Retry 2 requires a failed first attempt and a two-second delay; retry 3 requires a failed second attempt and a five-second delay. A successful download, a nonempty ID and the original complete inventory/source/run/attempt/flags/bytes/SHA verification are mandatory. Repository, original run, destination, ephemeral read token, selected action, job budgets and ordinary 16,384 producer remain fixed. The earlier failure and its skipped producer remain recorded. This activation authorizes one qualification with the new workflow; previous RED is not repeated.


### 2026-11-11 UTC — excluded-reader ordinary producer completed with exact same-ID receipts

[Run 43108015025](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43108015025), attempt 1, push, terminal success. Source `8232684957fdb65e8e0e1b05e6c9f81d05cbe8d4`, tree `85385961ba81891782b176ec9893cfe7b2de55ab`, parent `7c41f3e863e5761e7c79248f22a3c1940774e210`; TEMP `1d1abd935b8f0699bf5955a84369e4745d57a8ad`, activation report `62bcc4d867ff5c8093240f5c0fc587a545320c2b`. The full leaf comparison against the preceding tested Source `71dfad8e3abd12309f89bfe6262eadfdf7a7d1ec` differed only in TEMP and report. The implementation/test/compiler were identical, including sensor `3d494abe3aac52df269ff177931bc1c85c9feed9`, Q test `6c7a81b9e95e4aa7c04b7c2e89262415ada20b8b`, compiler `c768af1b01af2b8216273765da62d00894b65b33`. The feature ref stayed frozen until terminal.

Pure job 130816333516 succeeded within its 3-minute budget. Locked install, syntax, focused lint, `node --test test/finite-budget-diagnostics.test.mjs`: **8 tests, 8 pass, 0 fail, 0 cancelled, 0 skipped, 0 todo**. Ordinary `node test/fixtures/finite-budget-world.mjs preflight-budget` completed strict M/QA compilation before I0. Dependent producer job 130816604472 succeeded within its 5-minute budget. With the cap marker absent, `node test/fixtures/finite-budget-world.mjs prepare-positive-probe output/finite-budget/producer` used the original fixed producer once in this run and all snapshots reported limit 16,384. The actual 54 reader-site records (including coordinates and occurrence) matched pure before I0; their ordered content also exactly matches the complete **Verified site map** in this report for run 43106034899. No new RED, cold consumer, original alarm exercise, or full P1 occurred.

| Required download and strict inventory check | Attempt 1 | Attempt 2 | Attempt 3 |
| --- | --- | --- | --- |
| Pure's own receipt for 13895490783 | success + readback | skipped | skipped |
| Producer's prior pure input for 13895490783 | success + readback | skipped | skipped |
| Producer's own receipt for 13893749413 | success + readback | skipped | skipped |

No retry delay ran. This validates the first-attempt transport and strict gates; it provides no runtime observation of either fallback branch. The earlier 43107327439 runner failure remains a failure.

* [Pure 13895490783](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43108015025/artifacts/13895490783), ZIP 27,366 bytes, SHA-256 `56c2292bf98c93c325832b61fb17d6187ad6178823927b3ac22ffa1ee100f5f7`, expiry 2026-11-18T22:00:57Z. Verified 5 exact files including budget-artifact.json, 846 bytes, SHA-256 `5e2b18216971598367bf33278caf8bf3b679dddcce9060a0a98eab3943ae0f14`, checking source/run/attempt/kind/flags and path/bytes/SHA inventory.
* [Producer 13893749413](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43108015025/artifacts/13893749413), ZIP 1,518,666 bytes, SHA-256 `64598a445c1ccdf1b1d7e3b5d5475b1c34a103c4219d5af2768dbe2e3820c3b0`, expiry 2026-11-18T22:02:31Z. Verified 9 exact files including budget-artifact.json, 1504 bytes, SHA-256 `2d0b853533d5590d5e30ff4f282b1a3e995b2f7d494bde04b83953e9dfad02dd`, checking source/run/attempt/kind/flags and path/bytes/SHA inventory.

The pure package contains lint.log, tests.log, preflight.log, preflight.json and budget-artifact.json. The producer package contains aggregates.json, console.log, full-result.json, manifest.json, four graph files and budget-artifact.json; the graph/manifest hashes are reproduced below. It preserves safe projected data and provenance. Raw native checkpoint state is not included in this evidence package. Genuine SDK completeNormal/completeWrites=1/1, Reference rows/readbacks=1/1, Notice rows=1. Native disposal occurred before C0, confirmed by return at 1794434550098 (836902 ms before C0); originalAlarmObserved=false. I0/C0/C1 are recorded below.

**Observed correction.** In the prior ordinary run QA2 had 14 site-45 readerOrigin observations before its epoch overflow. In this corrected run QA2 had **zero** invalid or unattributed observations before overflow. It still recorded **820 site-45 readerOrigin observations after overflow**, first at ordinal 19,033 in no_store. QA1 still recorded 812 site-45 observations. This is consistent with honoring the explicit fixture exclusion and keeping nonexcluded missing origins visible; the old run individually recorded the excluded context only on the first early reader error. The controlled Q test separately verified the owned reader preserved its original fetch/root/child/phase through fixture. The producer result does not establish universal attribution coverage.

Every QA epoch still overflowed at 16,385 and first recorded runMissingLease afterward. QA0/1/2 accumulated respectively 1,443 / 251,576 / 296,729 invalid observations. All M epochs had zero invalid observations and no overflow. The exclusion fix addresses the early fixture signal only. The separate post-overflow attribution problem remains open.

**Exact safe producer log aggregates.** The 54 fixed map records are unchanged from the complete table above; no unknown-site entries occurred. Unlisted per-site buckets were zero. Fixed reason buckets retain their zeros. Step markers are omitted.

```jsonl
{"kind":"facts","diagnosticCandidate":null,"actualSnapshotLimits":[16384],"purpose":"afw.finite-budget-producer-probe.syn.v1","scope":"partial-producer-only","source":"8232684957fdb65e8e0e1b05e6c9f81d05cbe8d4","run":"43108015025","attempt":"1","I0":1794434487000,"C0":1794435387000,"C1":1794435567000,"returnedAt":1794434550098,"completeNormal":1,"completeWrites":1,"referenceRows":1,"referenceReadbacks":1,"noticeRows":1,"disposedBeforeC0":true,"originalAlarmObserved":false,"operationalReadiness":false,"completePackage":false,"PCoff":false}
{"kind":"chronology","segment":"producer","epoch":0,"role":"M","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":0,"byEvent":{"root":0,"child":0,"begin":0,"bytes":0,"logical":0,"scopeLogical":0,"cancel":0,"settle":0,"incomplete":0},"firstInvalid":null,"firstOverflow":null,"invalid":{"beforeOverflow":0,"afterOverflow":0},"unattributed":{"beforeOverflow":0,"afterOverflow":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":0}}
{"kind":"reasons","segment":"producer","epoch":0,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":0,"role":"M","firstReaderOrigin":null,"before":0,"after":0}
{"kind":"chronology","segment":"producer","epoch":0,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":19652,"byEvent":{"root":1,"child":93,"begin":6138,"bytes":5705,"logical":0,"scopeLogical":0,"cancel":134,"settle":6138,"incomplete":1443},"firstInvalid":{"event":"incomplete","ordinal":18185,"reason":"runMissingLease","relation":"afterOverflow"},"firstOverflow":{"event":"settle","ordinal":16385},"invalid":{"beforeOverflow":0,"afterOverflow":1443},"unattributed":{"beforeOverflow":0,"afterOverflow":1443},"coverage":{"overflow":true,"invalid":1443,"unattributed":1443,"nativeBytesUnavailable":433}}
{"kind":"reasons","segment":"producer","epoch":0,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":15,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":12,"holderIdentity":0,"invocationIdentity":1311,"invocationRoot":99,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":6,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":0,"role":"QA","firstReaderOrigin":{"ordinal":18225,"relation":"afterOverflow","site":32,"context":"no_store"},"before":0,"after":12}
{"kind":"readerCounts","segment":"producer","epoch":0,"role":"QA","site":32,"before":0,"after":1}
{"kind":"readerCounts","segment":"producer","epoch":0,"role":"QA","site":35,"before":0,"after":8}
{"kind":"readerCounts","segment":"producer","epoch":0,"role":"QA","site":36,"before":0,"after":3}
{"kind":"chronology","segment":"producer","epoch":1,"role":"M","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":24,"byEvent":{"root":2,"child":0,"begin":8,"bytes":6,"logical":0,"scopeLogical":0,"cancel":0,"settle":8,"incomplete":0},"firstInvalid":null,"firstOverflow":null,"invalid":{"beforeOverflow":0,"afterOverflow":0},"unattributed":{"beforeOverflow":0,"afterOverflow":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":2}}
{"kind":"reasons","segment":"producer","epoch":1,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":1,"role":"M","firstReaderOrigin":null,"before":0,"after":0}
{"kind":"chronology","segment":"producer","epoch":1,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":275082,"byEvent":{"root":2,"child":3997,"begin":6589,"bytes":6281,"logical":0,"scopeLogical":0,"cancel":48,"settle":6589,"incomplete":251576},"firstInvalid":{"event":"incomplete","ordinal":19723,"reason":"runMissingLease","relation":"afterOverflow"},"firstOverflow":{"event":"settle","ordinal":16385},"invalid":{"beforeOverflow":0,"afterOverflow":251576},"unattributed":{"beforeOverflow":0,"afterOverflow":251576},"coverage":{"overflow":true,"invalid":251576,"unattributed":251576,"nativeBytesUnavailable":308}}
{"kind":"reasons","segment":"producer","epoch":1,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":7889,"descendantChild":0,"runMissingLease":11655,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":824,"holderIdentity":0,"invocationIdentity":218160,"invocationRoot":12908,"methodPhase":0,"clockLease":0,"aliasStore":88,"aliasChild":0,"transportPhase":0,"transactionContext":52,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":1,"role":"QA","firstReaderOrigin":{"ordinal":20166,"relation":"afterOverflow","site":45,"context":"no_store"},"before":0,"after":824}
{"kind":"readerCounts","segment":"producer","epoch":1,"role":"QA","site":31,"before":0,"after":11}
{"kind":"readerCounts","segment":"producer","epoch":1,"role":"QA","site":45,"before":0,"after":812}
{"kind":"readerCounts","segment":"producer","epoch":1,"role":"QA","site":46,"before":0,"after":1}
{"kind":"chronology","segment":"producer","epoch":2,"role":"M","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":144,"byEvent":{"root":9,"child":0,"begin":56,"bytes":23,"logical":0,"scopeLogical":0,"cancel":0,"settle":56,"incomplete":0},"firstInvalid":null,"firstOverflow":null,"invalid":{"beforeOverflow":0,"afterOverflow":0},"unattributed":{"beforeOverflow":0,"afterOverflow":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":33}}
{"kind":"reasons","segment":"producer","epoch":2,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":2,"role":"M","firstReaderOrigin":null,"before":0,"after":0}
{"kind":"chronology","segment":"producer","epoch":2,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v1","limit":16384,"eventCalls":319309,"byEvent":{"root":4,"child":3764,"begin":6369,"bytes":6034,"logical":0,"scopeLogical":0,"cancel":40,"settle":6369,"incomplete":296729},"firstInvalid":{"event":"incomplete","ordinal":19028,"reason":"runMissingLease","relation":"afterOverflow"},"firstOverflow":{"event":"bytes","ordinal":16385},"invalid":{"beforeOverflow":0,"afterOverflow":296729},"unattributed":{"beforeOverflow":0,"afterOverflow":296729},"coverage":{"overflow":true,"invalid":296729,"unattributed":296729,"nativeBytesUnavailable":335}}
{"kind":"reasons","segment":"producer","epoch":2,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":7731,"descendantChild":0,"runMissingLease":11287,"phaseStore":1,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":820,"holderIdentity":0,"invocationIdentity":263106,"invocationRoot":13241,"methodPhase":0,"clockLease":0,"aliasStore":43,"aliasChild":0,"transportPhase":0,"transactionContext":500,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":2,"role":"QA","firstReaderOrigin":{"ordinal":19033,"relation":"afterOverflow","site":45,"context":"no_store"},"before":0,"after":820}
{"kind":"readerCounts","segment":"producer","epoch":2,"role":"QA","site":45,"before":0,"after":820}
{"kind":"proof","path":"graphs/native-syn.json","bytes":1066,"sha256":"3bd9b9314a62f734f4ee1506e6259d96934697de081878778d211ef3755c34f1"}
{"kind":"proof","path":"graphs/metafiles.json","bytes":448787,"sha256":"df7dc0c2ac912f0194044107e3eb2c1eb7938d53d51c7c85984043b1950950e1"}
{"kind":"proof","path":"graphs/canary-index.mjs","bytes":2062537,"sha256":"ad3b17bb452d249d9d5a38856add8d1b08959a9f6ca70d6c41469ba8c10b290e"}
{"kind":"proof","path":"graphs/qa-index.mjs","bytes":2696018,"sha256":"6ced665a7f4bb0b25c928923f3a40791b39f182e5467bcc0a5dfa4b0e2568151"}
{"kind":"proof","path":"manifest.json","bytes":9903,"sha256":"4053f2b28d08c792fa82cedae17fed67053bb7317222fe5b9e469d617be5aeee"}
```

Terminal action: preserve this evidence and retire TEMP. Task1 remains pending subject to Root's ruling; this report does not promote a structural observer or establish full lifecycle readiness. operationalReadiness=false, completePackage=false, PCoff=false.


### 2026-11-11 UTC — bounded observer phase A, independent-identity causal RED

Root released the revised test-only evidence contract on BASE `d23c2befeeaf1b269eb70161ad8023910099a29b`, tree `727b00bb9df95afa8b2869968032ab8f4850be30`, report `88ef7625fe7dda7c5f4d1cc1e4d5922bb37ab465`. Its seven allowed paths include Node evidence and native budget test integration. The full P1 lifecycle and Task2 are outside this release. [Phase A brief](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/ae7070963021352ec711979d80efd00e645849fa/docs/superpowers/briefs/2026-11-11-finite-budget-bounded-observer-task1.md)

[RED 43109332082](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43109332082), attempt 1, push, job 130820884367. Source `77a076e9a1c48a29c534a8cc0d3294a06abcb76a`, tree `288244bcbbd2b2fd5eb6b3f4f7b571434f8145be`, Q test `fbb1cdee4132ecffaf62762d39adf1d4cbc7c20a`, TEMP `7e00a5179d17a903f3cb5d3ea9069bbe771aee6b`, prior sensor `3d494abe3aac52df269ff177931bc1c85c9feed9` unchanged. After more than 16,384 collector calls, the pure test requested a legitimate new Root. The old sensor returned null and Q6 reached its intended assertion. `node --test test/finite-budget-diagnostics.test.mjs`: 8 tests, 7 pass, 1 expected failure, 0 cancelled, skipped or todo. No I0. Same-ID REST readback verified [artifact 13895237411](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43109332082/artifacts/13895237411), 1,487 ZIP bytes, SHA-256 `a71f10f96c45fedd703e29047cba938277a04cc43992cc5a191d3e2cb398672a`, expiry 2026-11-18 22:09:49 UTC. Exact 2 files, budget-artifact.json 408 bytes, SHA-256 `289f2bc31bfba6e7a732e5e90ad545ac2eeecb1facc2e787f1fbf1d48926b7ec`, matching source/run/attempt/kind/flags.

One pure/preflight→producer-only qualification follows. V2 has fixed maximum prefix sizes of 16,384 for each of operation, guard and scope rows. Weak metadata follows live native identities and pending callbacks; the record limits are not an absolute heap bound. V2 eventCalls remains a scalar denominator independent of those record budgets. Trace omissions are explicit. An observed-metrics proof requires zero invalid/unattributed/numeric loss and enumeration of every observed scope. A complete-trace proof also requires full retention and exact row/guard reconstruction including real transition order. The source edit integrates these levels into P1 for a future release; this activation does not execute P1.


### 2026-11-11 UTC — Phase A V2 bounded observer verified on the producer

[Run 43111053230](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43111053230), attempt 1, push, terminal success. Qualified Source `bbd7570e86b3bbc6ae76a831a20eb581dd6bc6eb`, tree `20a489df11173cc584f1935a0df72c0504c7e55f`, parent `77a076e9a1c48a29c534a8cc0d3294a06abcb76a`; feature ref frozen through terminal. Qualified blobs:

| Path | Blob |
| --- | --- |
| `test/fixtures/finite-budget-diagnostics.mjs` | `82ff9a34f51c4e344e3c9bc8cd5d5640d1e0dac5` |
| `test/fixtures/finite-budget-evidence.mjs` | `81178d96e10784366ab1b11bbf0805e347dea173` |
| `test/fixtures/finite-budget-world.mjs` | `3069ab81768893192cd882a5b5a5c61dcce9ff29` |
| `test/finite-budget-diagnostics.test.mjs` | `d282bddb9dc59ce0b4922514ab2ba9260f1aea2b` |
| `test/mcp-qa-finite-budget-native.test.mjs` | `d63f6e5752894ddc7d52f2430fa8f1fd1c07156a` |
| `.github/workflows/afw-finite-budget-qualification.yml` | `04c5e9c60401fa10b9bc115deb1496f3d7c26cbb` |
| `docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md` | `9d78dec60c0c35ed6d8562a3b6919021d2046268` |

The causal RED at 77a076e is preserved above. All leaves outside the seven explicitly named paths remained byte-/mode-/type-identical to Phase A BASE. Main read back at `0c9c475b3ebaa970fc11d628b40e50a90cceb727`. No SDK/config/production/descriptor changes. Code and evidence use these qualified source anchors:

* [Sensor line 41](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/bbd7570e86b3bbc6ae76a831a20eb581dd6bc6eb/test/fixtures/finite-budget-diagnostics.mjs#L41) establishes maxRows/maxGuards/maxScopes; line 65 admits prefixes and records each kind's first omission ordinal and the first overall event. Line 92 lazily admits each distinct scope once; line 106 registers validated weak identities independently of those budgets. Line 120 preserves source-linked op identities and actual entry ordinal; line 167 records real settlement order and updates retained and unretained operations. Line 174 projects only public fields. Line 279 preserves the observed fixture-only reader exclusion while known owners still propagate. Identity metadata follows native key/callback reachability; the three record limits do not bound absolute heap bytes or the number of live native objects.
* [Node verifier line 61](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/bbd7570e86b3bbc6ae76a831a20eb581dd6bc6eb/test/fixtures/finite-budget-evidence.mjs#L61) checks retention, first omissions and bounded inventory. Lines 82/113 check fixed chronology and independent aggregate/scope/row consistency; line 179 replays actual enter/settle ordinals including timestamp ties. Lines 197/198 expose observed_metrics and complete_trace with separate qualification gates. Source/role, safe scalars, closed data shapes, observed counters/peaks, byte availability and retained fetch links are checked. A missing required scope, numeric error or genuine attribution failure cannot establish observed_metrics. Complete_trace additionally requires no omission and exact reconstruction.
* [World line 589](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/bbd7570e86b3bbc6ae76a831a20eb581dd6bc6eb/test/fixtures/finite-budget-world.mjs#L589) rejects the deprecated cap selector before I0. Line 631 excludes the Node verifier/compiler/map from Worker inputs; line 730 obtains per-epoch proofs. The 54 fixed reader-site records independently matched actual preflight/native compilation and exactly matched all role/path/selector/occurrence/coordinate fields of the existing complete site table for 43106034899. [Native test line 89](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/bbd7570e86b3bbc6ae76a831a20eb581dd6bc6eb/test/mcp-qa-finite-budget-native.test.mjs#L89) integrates the explicit proof levels for future P1. The original business assertions remain present; this run did not execute them in a cold consumer.

Pure job 130826856226 (3-minute limit): locked install with `npm ci --ignore-scripts --no-audit --no-fund`; syntax of the five changed MJS paths via `node --check`; focused `npx eslint`; `node --test test/finite-budget-diagnostics.test.mjs`: **8 tests, 8 pass, 0 fail, 0 cancelled, 0 skipped, 0 todo**. Original compiler-node, privacy/native identity, cancel/bytes and fixture/site semantics stayed covered. The extended Q2/Q4/Q6/Q8 exercised tied timestamps and distinct real peaks, new valid identities after saturation, retained and omitted late settlements, duplicate settlement, pre/post omission reader provenance, actual scope omission, distinct denied scope masks, numeric overflow and projection privacy. `node test/fixtures/finite-budget-world.mjs preflight-budget` passed strict M/QA preparation before I0.

Producer job 130827104627 (5-minute limit): downloaded and reverified prior pure evidence, then `node test/fixtures/finite-budget-world.mjs prepare-positive-probe output/finite-budget/producer`. One existing principal producer with original clocks, two original role graphs, genuine completeNormal=1/completeWrites=1, Reference rows/readbacks=1/1, Notice rows=1. I0/C0/C1 are below; return at 1794435831998 after disposal was 808002 ms before C0. originalAlarmObserved=false. No extra native work was added to induce saturation; native execution itself filled the operation-row prefixes in QA1 and QA2.

| Producer epoch | Actual collector calls | Operations observed | Operation rows retained / omitted | Guard rows retained / omitted | Scope rows retained / omitted | Verified proof levels |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| M0 | 0 | 0 | 0 / 0 | 0 / 0 | 0 / 0 | observed_metrics + complete_trace |
| QA0 | 22367 | 7553 | 7553 / 0 | 0 / 0 | 94 / 0 | observed_metrics + complete_trace |
| M1 | 24 | 8 | 8 / 0 | 0 / 0 | 2 / 0 | observed_metrics + complete_trace |
| QA1 | 713071 | 237842 | 16384 / 221458 | 0 / 0 | 11836 / 0 | observed_metrics; raw trace incomplete |
| M2 | 144 | 56 | 56 / 0 | 0 / 0 | 9 / 0 | observed_metrics + complete_trace |
| QA2 | 847922 | 283045 | 16384 / 266661 | 0 / 0 | 11498 / 0 | observed_metrics; raw trace incomplete |

All six snapshots verified observed_metrics: 0 invalid, 0 unattributed, 0 unknown reader origins, 0 numeric overflow, 0 omitted required scopes. QA1 first omitted an operation at collector ordinal 49,153; QA2 at 49,095. Coverage overflow stayed true for both. Their subsequent observations retained attribution without creating further strong operation rows. All M epochs and QA0 verified complete_trace as well. Native byte availability is separate: QA1/QA2 reported 14,037/14,392 native invocations without a native byte measurement. The exposed byte counts and durations below concern observed API invocations in SYN; they cannot establish physical provider traffic, global drain or real infrastructure resource consumption.

* [Pure 13896052382](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43111053230/artifacts/13896052382), ZIP 27,457 bytes, SHA-256 `9b1b6c4b9b2b1fdbf5674b990eaf9a1b303f55447df5b5670eda7aaf824a2590`, expiry 2026-11-18T22:21:45Z. Exact same-ID readback verified 5 files; budget-artifact.json 846 bytes, SHA-256 `6d0c3cd841a448142995554ca5194f353fb0b293b1ae20f76c5f125ef748e3fa`, with matching source/run/attempt/kind/flags.
* [Producer 13896821273](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43111053230/artifacts/13896821273), ZIP 2,253,614 bytes, SHA-256 `9af6a5929285d3e45f126974c22893a92f7f38112e8b8bce7e15d2ed012c1622`, expiry 2026-11-18T22:23:55Z. Exact same-ID readback verified 9 files; budget-artifact.json 1504 bytes, SHA-256 `ccd20e41d95d4bb3061812157b8444c7a8a3846bd27f9717d9863703fe151eb2`, with matching source/run/attempt/kind/flags.

All three required downloads (pure receipt, producer's prior pure, producer receipt) and strict inventory validators succeeded on their first same-ID attempts. Second and third attempts and their delays were skipped. The pure archive has lint.log, tests.log, preflight.log, preflight.json and budget-artifact.json. The producer archive has aggregates.json, console.log, full-result.json, manifest.json, the four original graph files identified below and budget-artifact.json. Full safe JSON includes every enumerated scope metric and every fixed reader bucket. It preserves the evidence projection and original graph hashes; raw persisted databases and a recoverable checkpoint are not exported in this producer-only archive.

**Exact safe aggregate records.** The ordered 54-site map exactly matches the earlier complete table. All omitted per-site log entries have zero counts, including unknown slot 0. All emitted epoch summaries, independent proof levels, phase/resource aggregates, first omissions, fixed histogram buckets and file proofs are reproduced here. Step markers and the duplicate site map are omitted.

```jsonl
{"kind":"facts","recordLimits":{"operations":16384,"guards":16384,"scopes":16384},"purpose":"afw.finite-budget-producer-probe.syn.v1","scope":"partial-producer-only","source":"bbd7570e86b3bbc6ae76a831a20eb581dd6bc6eb","run":"43111053230","attempt":"1","I0":1794435740000,"C0":1794436640000,"C1":1794436820000,"returnedAt":1794435831998,"completeNormal":1,"completeWrites":1,"referenceRows":1,"referenceReadbacks":1,"noticeRows":1,"disposedBeforeC0":true,"originalAlarmObserved":false,"operationalReadiness":false,"completePackage":false,"PCoff":false}
{"kind":"chronology","segment":"producer","epoch":0,"role":"M","purpose":"afw.finite-budget-chronology.syn.v2","eventCalls":0,"byEvent":{"root":0,"child":0,"begin":0,"bytes":0,"logical":0,"scopeLogical":0,"cancel":0,"settle":0,"incomplete":0},"firstInvalid":null,"invalid":{"beforeRetentionOmission":0,"afterRetentionOmission":0},"unattributed":{"beforeRetentionOmission":0,"afterRetentionOmission":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":0,"numericOverflow":false,"observedMetricsComplete":true}}
{"kind":"retention","segment":"producer","epoch":0,"role":"M","retention":{"purpose":"afw.finite-budget-retention.syn.v1","operationRows":{"limit":16384,"retained":0,"omitted":0,"firstOmittedOrdinal":null},"guardRows":{"limit":16384,"retained":0,"omitted":0,"firstOmittedOrdinal":null},"scopeRows":{"limit":16384,"retained":0,"omitted":0,"firstOmittedOrdinal":null},"firstOmission":null,"traceComplete":true},"observedProof":{"purpose":"afw.finite-budget-metrics-proof.syn.v1","level":"observed_metrics","traceComplete":true,"operationalReadiness":false,"completePackage":false,"PCoff":false},"traceProof":{"purpose":"afw.finite-budget-metrics-proof.syn.v1","level":"complete_trace","traceComplete":true,"operationalReadiness":false,"completePackage":false,"PCoff":false}}
{"kind":"totals","segment":"producer","epoch":0,"role":"M","totals":{"nativeBytesUnavailable":0,"nativeStarted":0,"nativeSettled":0,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":0,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":0,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":0},"enumeratedScopes":0,"maximumEnumeratedScopePeak":0}
{"kind":"reasons","segment":"producer","epoch":0,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":0,"role":"M","firstReaderOrigin":null,"before":0,"after":0}
{"kind":"chronology","segment":"producer","epoch":0,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v2","eventCalls":22367,"byEvent":{"root":1,"child":93,"begin":7553,"bytes":7009,"logical":0,"scopeLogical":0,"cancel":158,"settle":7553,"incomplete":0},"firstInvalid":null,"invalid":{"beforeRetentionOmission":0,"afterRetentionOmission":0},"unattributed":{"beforeRetentionOmission":0,"afterRetentionOmission":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":544,"numericOverflow":false,"observedMetricsComplete":true}}
{"kind":"retention","segment":"producer","epoch":0,"role":"QA","retention":{"purpose":"afw.finite-budget-retention.syn.v1","operationRows":{"limit":16384,"retained":7553,"omitted":0,"firstOmittedOrdinal":null},"guardRows":{"limit":16384,"retained":0,"omitted":0,"firstOmittedOrdinal":null},"scopeRows":{"limit":16384,"retained":94,"omitted":0,"firstOmittedOrdinal":null},"firstOmission":null,"traceComplete":true},"observedProof":{"purpose":"afw.finite-budget-metrics-proof.syn.v1","level":"observed_metrics","traceComplete":true,"operationalReadiness":false,"completePackage":false,"PCoff":false},"traceProof":{"purpose":"afw.finite-budget-metrics-proof.syn.v1","level":"complete_trace","traceComplete":true,"operationalReadiness":false,"completePackage":false,"PCoff":false}}
{"kind":"totals","segment":"producer","epoch":0,"role":"QA","totals":{"nativeBytesUnavailable":544,"nativeStarted":7553,"nativeSettled":7553,"nativeRejected":0,"logicalDenied":0,"cancelStarted":79,"cancelSettled":79,"active":0,"peak":11,"nativeBytesRead":27858409,"chunksRead":6930,"nativeDurationSumMs":2847,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":9280},"enumeratedScopes":94,"maximumEnumeratedScopePeak":6}
{"kind":"phaseResource","segment":"producer","epoch":0,"role":"QA","phase":"setup","resourceClass":"GHsource","nativeBytesUnavailable":32,"nativeStarted":64,"nativeSettled":64,"nativeRejected":0,"logicalDenied":0,"cancelStarted":16,"cancelSettled":16,"active":0,"peak":6,"nativeBytesRead":10028,"chunksRead":16,"nativeDurationSumMs":47}
{"kind":"phaseResource","segment":"producer","epoch":0,"role":"QA","phase":"setup","resourceClass":"CFcredential","nativeBytesUnavailable":32,"nativeStarted":64,"nativeSettled":64,"nativeRejected":0,"logicalDenied":0,"cancelStarted":16,"cancelSettled":16,"active":0,"peak":2,"nativeBytesRead":2704,"chunksRead":16,"nativeDurationSumMs":121}
{"kind":"phaseResource","segment":"producer","epoch":0,"role":"QA","phase":"setup","resourceClass":"CFdeployment","nativeBytesUnavailable":26,"nativeStarted":52,"nativeSettled":52,"nativeRejected":0,"logicalDenied":0,"cancelStarted":13,"cancelSettled":13,"active":0,"peak":2,"nativeBytesRead":3139,"chunksRead":13,"nativeDurationSumMs":142}
{"kind":"phaseResource","segment":"producer","epoch":0,"role":"QA","phase":"setup","resourceClass":"DO","nativeBytesUnavailable":376,"nativeStarted":376,"nativeSettled":376,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":6,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":1234}
{"kind":"phaseResource","segment":"producer","epoch":0,"role":"QA","phase":"setup","resourceClass":"CFversion","nativeBytesUnavailable":28,"nativeStarted":6907,"nativeSettled":6907,"nativeRejected":0,"logicalDenied":0,"cancelStarted":14,"cancelSettled":14,"active":0,"peak":4,"nativeBytesRead":27837950,"chunksRead":6865,"nativeDurationSumMs":827}
{"kind":"phaseResource","segment":"producer","epoch":0,"role":"QA","phase":"setup","resourceClass":"SQL","nativeBytesUnavailable":10,"nativeStarted":10,"nativeSettled":10,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":17}
{"kind":"phaseResource","segment":"producer","epoch":0,"role":"QA","phase":"setup","resourceClass":"CFworkflow","nativeBytesUnavailable":30,"nativeStarted":60,"nativeSettled":60,"nativeRejected":0,"logicalDenied":0,"cancelStarted":15,"cancelSettled":15,"active":0,"peak":2,"nativeBytesRead":4287,"chunksRead":15,"nativeDurationSumMs":293}
{"kind":"phaseResource","segment":"producer","epoch":0,"role":"QA","phase":"setup","resourceClass":"CFcontainer","nativeBytesUnavailable":2,"nativeStarted":4,"nativeSettled":4,"nativeRejected":0,"logicalDenied":0,"cancelStarted":1,"cancelSettled":1,"active":0,"peak":1,"nativeBytesRead":85,"chunksRead":1,"nativeDurationSumMs":33}
{"kind":"phaseResource","segment":"producer","epoch":0,"role":"QA","phase":"setup","resourceClass":"CFschedule","nativeBytesUnavailable":4,"nativeStarted":8,"nativeSettled":8,"nativeRejected":0,"logicalDenied":0,"cancelStarted":2,"cancelSettled":2,"active":0,"peak":2,"nativeBytesRead":108,"chunksRead":2,"nativeDurationSumMs":66}
{"kind":"phaseResource","segment":"producer","epoch":0,"role":"QA","phase":"setup","resourceClass":"CFtail","nativeBytesUnavailable":4,"nativeStarted":8,"nativeSettled":8,"nativeRejected":0,"logicalDenied":0,"cancelStarted":2,"cancelSettled":2,"active":0,"peak":2,"nativeBytesRead":108,"chunksRead":2,"nativeDurationSumMs":67}
{"kind":"reasons","segment":"producer","epoch":0,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":0,"role":"QA","firstReaderOrigin":null,"before":0,"after":0}
{"kind":"chronology","segment":"producer","epoch":1,"role":"M","purpose":"afw.finite-budget-chronology.syn.v2","eventCalls":24,"byEvent":{"root":2,"child":0,"begin":8,"bytes":6,"logical":0,"scopeLogical":0,"cancel":0,"settle":8,"incomplete":0},"firstInvalid":null,"invalid":{"beforeRetentionOmission":0,"afterRetentionOmission":0},"unattributed":{"beforeRetentionOmission":0,"afterRetentionOmission":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":2,"numericOverflow":false,"observedMetricsComplete":true}}
{"kind":"retention","segment":"producer","epoch":1,"role":"M","retention":{"purpose":"afw.finite-budget-retention.syn.v1","operationRows":{"limit":16384,"retained":8,"omitted":0,"firstOmittedOrdinal":null},"guardRows":{"limit":16384,"retained":0,"omitted":0,"firstOmittedOrdinal":null},"scopeRows":{"limit":16384,"retained":2,"omitted":0,"firstOmittedOrdinal":null},"firstOmission":null,"traceComplete":true},"observedProof":{"purpose":"afw.finite-budget-metrics-proof.syn.v1","level":"observed_metrics","traceComplete":true,"operationalReadiness":false,"completePackage":false,"PCoff":false},"traceProof":{"purpose":"afw.finite-budget-metrics-proof.syn.v1","level":"complete_trace","traceComplete":true,"operationalReadiness":false,"completePackage":false,"PCoff":false}}
{"kind":"totals","segment":"producer","epoch":1,"role":"M","totals":{"nativeBytesUnavailable":2,"nativeStarted":8,"nativeSettled":8,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":724,"chunksRead":3,"nativeDurationSumMs":32112,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":32132},"enumeratedScopes":2,"maximumEnumeratedScopePeak":1}
{"kind":"phaseResource","segment":"producer","epoch":1,"role":"M","phase":"setup","resourceClass":"DO","nativeBytesUnavailable":2,"nativeStarted":6,"nativeSettled":6,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":560,"chunksRead":2,"nativeDurationSumMs":32110}
{"kind":"phaseResource","segment":"producer","epoch":1,"role":"M","phase":"setup","resourceClass":"transport","nativeBytesUnavailable":0,"nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":164,"chunksRead":1,"nativeDurationSumMs":2}
{"kind":"reasons","segment":"producer","epoch":1,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":1,"role":"M","firstReaderOrigin":null,"before":0,"after":0}
{"kind":"chronology","segment":"producer","epoch":1,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v2","eventCalls":713071,"byEvent":{"root":2,"child":11886,"begin":237842,"bytes":223805,"logical":0,"scopeLogical":0,"cancel":1694,"settle":237842,"incomplete":0},"firstInvalid":null,"invalid":{"beforeRetentionOmission":0,"afterRetentionOmission":0},"unattributed":{"beforeRetentionOmission":0,"afterRetentionOmission":0},"coverage":{"overflow":true,"invalid":0,"unattributed":0,"nativeBytesUnavailable":14037,"numericOverflow":false,"observedMetricsComplete":true}}
{"kind":"retention","segment":"producer","epoch":1,"role":"QA","retention":{"purpose":"afw.finite-budget-retention.syn.v1","operationRows":{"limit":16384,"retained":16384,"omitted":221458,"firstOmittedOrdinal":49153},"guardRows":{"limit":16384,"retained":0,"omitted":0,"firstOmittedOrdinal":null},"scopeRows":{"limit":16384,"retained":11836,"omitted":0,"firstOmittedOrdinal":null},"firstOmission":{"event":"begin","ordinal":49153,"kind":"operation"},"traceComplete":false},"observedProof":{"purpose":"afw.finite-budget-metrics-proof.syn.v1","level":"observed_metrics","traceComplete":false,"operationalReadiness":false,"completePackage":false,"PCoff":false},"traceProof":null}
{"kind":"totals","segment":"producer","epoch":1,"role":"QA","totals":{"nativeBytesUnavailable":14037,"nativeStarted":237842,"nativeSettled":237842,"nativeRejected":0,"logicalDenied":0,"cancelStarted":847,"cancelSettled":847,"active":0,"peak":2,"nativeBytesRead":910492491,"chunksRead":222956,"nativeDurationSumMs":29246,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":32081},"enumeratedScopes":11836,"maximumEnumeratedScopePeak":2}
{"kind":"phaseResource","segment":"producer","epoch":1,"role":"QA","phase":"setup","resourceClass":"DO","nativeBytesUnavailable":11785,"nativeStarted":11785,"nativeSettled":11785,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":2,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":990}
{"kind":"phaseResource","segment":"producer","epoch":1,"role":"QA","phase":"setup","resourceClass":"CFcredential","nativeBytesUnavailable":552,"nativeStarted":1104,"nativeSettled":1104,"nativeRejected":0,"logicalDenied":0,"cancelStarted":276,"cancelSettled":276,"active":0,"peak":2,"nativeBytesRead":46644,"chunksRead":276,"nativeDurationSumMs":911}
{"kind":"phaseResource","segment":"producer","epoch":1,"role":"QA","phase":"setup","resourceClass":"CFdeployment","nativeBytesUnavailable":564,"nativeStarted":1128,"nativeSettled":1128,"nativeRejected":0,"logicalDenied":0,"cancelStarted":282,"cancelSettled":282,"active":0,"peak":2,"nativeBytesRead":80154,"chunksRead":282,"nativeDurationSumMs":471}
{"kind":"phaseResource","segment":"producer","epoch":1,"role":"QA","phase":"setup","resourceClass":"CFversion","nativeBytesUnavailable":578,"nativeStarted":223263,"nativeSettled":223263,"nativeRejected":0,"logicalDenied":0,"cancelStarted":289,"cancelSettled":289,"active":0,"peak":2,"nativeBytesRead":910365365,"chunksRead":222396,"nativeDurationSumMs":25884}
{"kind":"phaseResource","segment":"producer","epoch":1,"role":"QA","phase":"setup","resourceClass":"SQL","nativeBytesUnavailable":555,"nativeStarted":555,"nativeSettled":555,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":979}
{"kind":"phaseResource","segment":"producer","epoch":1,"role":"QA","phase":"setup","resourceClass":"JWKS","nativeBytesUnavailable":2,"nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":2}
{"kind":"phaseResource","segment":"producer","epoch":1,"role":"QA","phase":"setup","resourceClass":"rateLimiter","nativeBytesUnavailable":1,"nativeStarted":1,"nativeSettled":1,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":5}
{"kind":"phaseResource","segment":"producer","epoch":1,"role":"QA","phase":"setup","resourceClass":"transport","nativeBytesUnavailable":0,"nativeStarted":4,"nativeSettled":4,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":328,"chunksRead":2,"nativeDurationSumMs":4}
{"kind":"reasons","segment":"producer","epoch":1,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":1,"role":"QA","firstReaderOrigin":null,"before":0,"after":0}
{"kind":"chronology","segment":"producer","epoch":2,"role":"M","purpose":"afw.finite-budget-chronology.syn.v2","eventCalls":144,"byEvent":{"root":9,"child":0,"begin":56,"bytes":23,"logical":0,"scopeLogical":0,"cancel":0,"settle":56,"incomplete":0},"firstInvalid":null,"invalid":{"beforeRetentionOmission":0,"afterRetentionOmission":0},"unattributed":{"beforeRetentionOmission":0,"afterRetentionOmission":0},"coverage":{"overflow":false,"invalid":0,"unattributed":0,"nativeBytesUnavailable":33,"numericOverflow":false,"observedMetricsComplete":true}}
{"kind":"retention","segment":"producer","epoch":2,"role":"M","retention":{"purpose":"afw.finite-budget-retention.syn.v1","operationRows":{"limit":16384,"retained":56,"omitted":0,"firstOmittedOrdinal":null},"guardRows":{"limit":16384,"retained":0,"omitted":0,"firstOmittedOrdinal":null},"scopeRows":{"limit":16384,"retained":9,"omitted":0,"firstOmittedOrdinal":null},"firstOmission":null,"traceComplete":true},"observedProof":{"purpose":"afw.finite-budget-metrics-proof.syn.v1","level":"observed_metrics","traceComplete":true,"operationalReadiness":false,"completePackage":false,"PCoff":false},"traceProof":{"purpose":"afw.finite-budget-metrics-proof.syn.v1","level":"complete_trace","traceComplete":true,"operationalReadiness":false,"completePackage":false,"PCoff":false}}
{"kind":"totals","segment":"producer","epoch":2,"role":"M","totals":{"nativeBytesUnavailable":33,"nativeStarted":56,"nativeSettled":56,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":3,"nativeBytesRead":3547,"chunksRead":11,"nativeDurationSumMs":36684,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":37295},"enumeratedScopes":9,"maximumEnumeratedScopePeak":3}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"authorize_get","resourceClass":"DO","nativeBytesUnavailable":1,"nativeStarted":3,"nativeSettled":3,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":372,"chunksRead":1,"nativeDurationSumMs":12350}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"authorize_post","resourceClass":"transport","nativeBytesUnavailable":0,"nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":94,"chunksRead":1,"nativeDurationSumMs":0}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"authorize_post","resourceClass":"DO","nativeBytesUnavailable":1,"nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":0,"chunksRead":0,"nativeDurationSumMs":16348}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"token_exchange","resourceClass":"rateLimiter","nativeBytesUnavailable":1,"nativeStarted":1,"nativeSettled":1,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":4}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"token_exchange","resourceClass":"transport","nativeBytesUnavailable":2,"nativeStarted":4,"nativeSettled":4,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":304,"chunksRead":1,"nativeDurationSumMs":1}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"token_exchange","resourceClass":"KV","nativeBytesUnavailable":5,"nativeStarted":5,"nativeSettled":5,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":5}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"token_exchange","resourceClass":"SQL","nativeBytesUnavailable":5,"nativeStarted":5,"nativeSettled":5,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":6}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"mcp_read","resourceClass":"rateLimiter","nativeBytesUnavailable":4,"nativeStarted":4,"nativeSettled":4,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":7}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"mcp_read","resourceClass":"KV","nativeBytesUnavailable":4,"nativeStarted":4,"nativeSettled":4,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":1}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"mcp_read","resourceClass":"transport","nativeBytesUnavailable":6,"nativeStarted":16,"nativeSettled":16,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":2,"nativeBytesRead":1663,"chunksRead":5,"nativeDurationSumMs":8}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"mcp_read","resourceClass":"SQL","nativeBytesUnavailable":2,"nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":1}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"monitoring_get","resourceClass":"DO","nativeBytesUnavailable":1,"nativeStarted":3,"nativeSettled":3,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":694,"chunksRead":1,"nativeDurationSumMs":3654}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"monitoring_post","resourceClass":"transport","nativeBytesUnavailable":0,"nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":50,"chunksRead":1,"nativeDurationSumMs":0}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"M","phase":"monitoring_post","resourceClass":"DO","nativeBytesUnavailable":1,"nativeStarted":3,"nativeSettled":3,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":370,"chunksRead":1,"nativeDurationSumMs":4299}
{"kind":"reasons","segment":"producer","epoch":2,"role":"M","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":2,"role":"M","firstReaderOrigin":null,"before":0,"after":0}
{"kind":"chronology","segment":"producer","epoch":2,"role":"QA","purpose":"afw.finite-budget-chronology.syn.v2","eventCalls":847922,"byEvent":{"root":4,"child":11495,"begin":283045,"bytes":268653,"logical":0,"scopeLogical":0,"cancel":1680,"settle":283045,"incomplete":0},"firstInvalid":null,"invalid":{"beforeRetentionOmission":0,"afterRetentionOmission":0},"unattributed":{"beforeRetentionOmission":0,"afterRetentionOmission":0},"coverage":{"overflow":true,"invalid":0,"unattributed":0,"nativeBytesUnavailable":14392,"numericOverflow":false,"observedMetricsComplete":true}}
{"kind":"retention","segment":"producer","epoch":2,"role":"QA","retention":{"purpose":"afw.finite-budget-retention.syn.v1","operationRows":{"limit":16384,"retained":16384,"omitted":266661,"firstOmittedOrdinal":49095},"guardRows":{"limit":16384,"retained":0,"omitted":0,"firstOmittedOrdinal":null},"scopeRows":{"limit":16384,"retained":11498,"omitted":0,"firstOmittedOrdinal":null},"firstOmission":{"event":"begin","ordinal":49095,"kind":"operation"},"traceComplete":false},"observedProof":{"purpose":"afw.finite-budget-metrics-proof.syn.v1","level":"observed_metrics","traceComplete":false,"operationalReadiness":false,"completePackage":false,"PCoff":false},"traceProof":null}
{"kind":"totals","segment":"producer","epoch":2,"role":"QA","totals":{"nativeBytesUnavailable":14392,"nativeStarted":283045,"nativeSettled":283045,"nativeRejected":0,"logicalDenied":0,"cancelStarted":840,"cancelSettled":840,"active":0,"peak":2,"nativeBytesRead":1093997544,"chunksRead":267811,"nativeDurationSumMs":30784,"scopeGuardEvents":0,"deniedScopes":0,"observedWallMs":37254},"enumeratedScopes":11498,"maximumEnumeratedScopePeak":2}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_get","resourceClass":"DO","nativeBytesUnavailable":3876,"nativeStarted":3876,"nativeSettled":3876,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":2,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":372}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_get","resourceClass":"CFcredential","nativeBytesUnavailable":160,"nativeStarted":320,"nativeSettled":320,"nativeRejected":0,"logicalDenied":0,"cancelStarted":80,"cancelSettled":80,"active":0,"peak":2,"nativeBytesRead":13520,"chunksRead":80,"nativeDurationSumMs":161}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_get","resourceClass":"CFdeployment","nativeBytesUnavailable":160,"nativeStarted":320,"nativeSettled":320,"nativeRejected":0,"logicalDenied":0,"cancelStarted":80,"cancelSettled":80,"active":0,"peak":2,"nativeBytesRead":17840,"chunksRead":80,"nativeDurationSumMs":131}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_get","resourceClass":"CFversion","nativeBytesUnavailable":240,"nativeStarted":89480,"nativeSettled":89480,"nativeRejected":0,"logicalDenied":0,"cancelStarted":120,"cancelSettled":120,"active":0,"peak":2,"nativeBytesRead":364634440,"chunksRead":89120,"nativeDurationSumMs":9276}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_get","resourceClass":"SQL","nativeBytesUnavailable":274,"nativeStarted":274,"nativeSettled":274,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":346}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_get","resourceClass":"JWKS","nativeBytesUnavailable":2,"nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":1}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_get","resourceClass":"KV","nativeBytesUnavailable":3,"nativeStarted":3,"nativeSettled":3,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":4}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_post","resourceClass":"transport","nativeBytesUnavailable":0,"nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":94,"chunksRead":1,"nativeDurationSumMs":4}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_post","resourceClass":"DO","nativeBytesUnavailable":5298,"nativeStarted":5298,"nativeSettled":5298,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":2,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":777}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_post","resourceClass":"CFcredential","nativeBytesUnavailable":216,"nativeStarted":432,"nativeSettled":432,"nativeRejected":0,"logicalDenied":0,"cancelStarted":108,"cancelSettled":108,"active":0,"peak":2,"nativeBytesRead":18252,"chunksRead":108,"nativeDurationSumMs":235}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_post","resourceClass":"CFdeployment","nativeBytesUnavailable":216,"nativeStarted":432,"nativeSettled":432,"nativeRejected":0,"logicalDenied":0,"cancelStarted":108,"cancelSettled":108,"active":0,"peak":2,"nativeBytesRead":24084,"chunksRead":108,"nativeDurationSumMs":244}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_post","resourceClass":"CFversion","nativeBytesUnavailable":324,"nativeStarted":120785,"nativeSettled":120785,"nativeRejected":0,"logicalDenied":0,"cancelStarted":162,"cancelSettled":162,"active":0,"peak":2,"nativeBytesRead":492256494,"chunksRead":120299,"nativeDurationSumMs":12098}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_post","resourceClass":"SQL","nativeBytesUnavailable":450,"nativeStarted":450,"nativeSettled":450,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":484}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"authorize_post","resourceClass":"KV","nativeBytesUnavailable":6,"nativeStarted":6,"nativeSettled":6,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":9}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"monitoring_get","resourceClass":"DO","nativeBytesUnavailable":1182,"nativeStarted":1182,"nativeSettled":1182,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":2,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":171}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"monitoring_get","resourceClass":"CFcredential","nativeBytesUnavailable":48,"nativeStarted":96,"nativeSettled":96,"nativeRejected":0,"logicalDenied":0,"cancelStarted":24,"cancelSettled":24,"active":0,"peak":2,"nativeBytesRead":4056,"chunksRead":24,"nativeDurationSumMs":48}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"monitoring_get","resourceClass":"CFdeployment","nativeBytesUnavailable":48,"nativeStarted":96,"nativeSettled":96,"nativeRejected":0,"logicalDenied":0,"cancelStarted":24,"cancelSettled":24,"active":0,"peak":2,"nativeBytesRead":5352,"chunksRead":24,"nativeDurationSumMs":37}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"monitoring_get","resourceClass":"CFversion","nativeBytesUnavailable":72,"nativeStarted":26835,"nativeSettled":26835,"nativeRejected":0,"logicalDenied":0,"cancelStarted":36,"cancelSettled":36,"active":0,"peak":2,"nativeBytesRead":109390332,"chunksRead":26727,"nativeDurationSumMs":2691}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"monitoring_get","resourceClass":"SQL","nativeBytesUnavailable":108,"nativeStarted":108,"nativeSettled":108,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":116}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"monitoring_post","resourceClass":"transport","nativeBytesUnavailable":0,"nativeStarted":2,"nativeSettled":2,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":50,"chunksRead":1,"nativeDurationSumMs":0}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"monitoring_post","resourceClass":"DO","nativeBytesUnavailable":1377,"nativeStarted":1377,"nativeSettled":1377,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":2,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":195}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"monitoring_post","resourceClass":"CFcredential","nativeBytesUnavailable":56,"nativeStarted":112,"nativeSettled":112,"nativeRejected":0,"logicalDenied":0,"cancelStarted":28,"cancelSettled":28,"active":0,"peak":2,"nativeBytesRead":4732,"chunksRead":28,"nativeDurationSumMs":54}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"monitoring_post","resourceClass":"CFdeployment","nativeBytesUnavailable":56,"nativeStarted":112,"nativeSettled":112,"nativeRejected":0,"logicalDenied":0,"cancelStarted":28,"cancelSettled":28,"active":0,"peak":2,"nativeBytesRead":6244,"chunksRead":28,"nativeDurationSumMs":46}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"monitoring_post","resourceClass":"CFversion","nativeBytesUnavailable":84,"nativeStarted":31309,"nativeSettled":31309,"nativeRejected":0,"logicalDenied":0,"cancelStarted":42,"cancelSettled":42,"active":0,"peak":2,"nativeBytesRead":127622054,"chunksRead":31183,"nativeDurationSumMs":3146}
{"kind":"phaseResource","segment":"producer","epoch":2,"role":"QA","phase":"monitoring_post","resourceClass":"SQL","nativeBytesUnavailable":136,"nativeStarted":136,"nativeSettled":136,"nativeRejected":0,"logicalDenied":0,"cancelStarted":0,"cancelSettled":0,"active":0,"peak":1,"nativeBytesRead":null,"chunksRead":null,"nativeDurationSumMs":138}
{"kind":"reasons","segment":"producer","epoch":2,"role":"QA","reasons":{"unknown":0,"constructorOptions":0,"collectorException":0,"rootInput":0,"childInput":0,"childConflict":0,"beginContext":0,"beginMethodResource":0,"beginFetchLink":0,"bytesInput":0,"logicalInput":0,"scopeLogicalInput":0,"cancelInput":0,"settleInput":0,"settleTime":0,"promiseThenMissing":0,"promiseThenException":0,"descendantStore":0,"descendantChild":0,"runMissingLease":0,"phaseStore":0,"phaseValue":0,"guardRoot":0,"holderInput":0,"holderConflict":0,"captureInput":0,"captureConflict":0,"facadeInput":0,"localBodyStore":0,"observerFulfilledCallback":0,"observerRejectedCallback":0,"observerThenException":0,"dormantInvocation":0,"cloneOrigin":0,"readerOrigin":0,"holderIdentity":0,"invocationIdentity":0,"invocationRoot":0,"methodPhase":0,"clockLease":0,"aliasStore":0,"aliasChild":0,"transportPhase":0,"transactionContext":0,"fetchResource":0}}
{"kind":"readerFirst","segment":"producer","epoch":2,"role":"QA","firstReaderOrigin":null,"before":0,"after":0}
{"kind":"proof","path":"graphs/native-syn.json","bytes":1066,"sha256":"59a25ebabf61cd2526936a79d228584e77594142adbd13ed5faeeaca94c11eff"}
{"kind":"proof","path":"graphs/metafiles.json","bytes":448787,"sha256":"0b58f4c059232aa95b9c13c79f81a0f0731ccad0b88747244dda2315800927f8"}
{"kind":"proof","path":"graphs/canary-index.mjs","bytes":2064777,"sha256":"19cc7c756c27118e4a14d7ab3ea31b70dfbf81920168ae5173a237aa52b0a754"}
{"kind":"proof","path":"graphs/qa-index.mjs","bytes":2699213,"sha256":"f32c6fe29788648d9a6bb6b508c09bdb882109a03ef879376bf478747b978747"}
{"kind":"proof","path":"manifest.json","bytes":9396,"sha256":"13d4298441d3baae24a1cebd367d0de6897079c0d10b8625f884490c3db22983"}
```

Phase A producer diagnostic succeeded. Full P1/9, original alarm, consumer restoration, formal review, Task2 and the PC-off rehearsal remain pending; this result is not Task1 lifecycle acceptance. Retire TEMP and STOP_WRITES for Root's decision. operationalReadiness=false, completePackage=false, PCoff=false.


### 2026-11-11 UTC — secret-free custody API RED and streaming contract revision

Phase B/full9 was suspended before I0. The principal checkpoint exporter retains an OAuth response and raw native state, so cold recovery needs approved custody. This pure fixture work does not access the environment secret, actual checkpoint contents, current tokens or an OAuth runtime. Source baseline `8452b974606171af39ee02fb41ddb124e7701ac1`, tree `50b818a164460052fd77344bf3bb0ddb4d6f2886`, original report `1e9277d1a6f63d841f7deb5d53e5161efbcf4af8`.

[Custody API RED 43115730088](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43115730088), attempt 1, job 130843094053. Source `0de4016401893ee2478815bfb80dd54b92fcc5d3`, tree `ad321f3b9b5aca42d478bccafefb88a114a77e4e`, first contract test `e567503d8c447c4dff5b4b36cdfeeeedf8155dca`, TEMP `423f08b34a67fc4b5b691cf91fe4da1c89dce318`. The new helper was absent. Node 22 reported 1 test, 0 passed, 1 intended missing-API assertion, 0 cancelled/skipped/todo; its explicit RED gate passed. No exploit, native scenario, environment key or leakage was exercised. Public evidence was limited to a fixed summary and manifest. [Artifact 13899040691](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43115730088/artifacts/13899040691), 1,091 ZIP bytes, SHA-256 `7cfe6a92c6be54c34834fa0a5319962cabdece86aefd269293be4808ddae8376`, expires 2026-11-18 22:55:28 UTC. Same-ID readback verified result.json (311 bytes, SHA-256 `849a39c32f91466c88597261135c9b858b9a8fff8fa4c20bcfc0961fa096360e`), summary.log (325 bytes, SHA-256 `6566bf5e2373123e2d4553358cf4aaaa9881d8e2330551a884a8ba9916a8e1b7`) and manifest.json (377 bytes, SHA-256 `5727cf25df2dc5a8bec656adfdf06460880abc370cc700356a146353a1ca4c80`).

Root independently inspected an already-preserved sanitized inventory: 44 native files totalled 230,256,629 bytes before the 9,396-byte manifest. This rules out the initial 64 MiB assumption. The [amended brief](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/59c2e15029bc22c59a2b482be9f30d3f03cf7877/docs/superpowers/briefs/2026-11-11-finite-syn-checkpoint-custody-task1.md) now requires bounded streaming JSONL, gzip followed by authenticated encryption, and complete authentication before inflation. The real compression ratio remains unknown. RED is accepted; TEMP retires before implementation.


### 2026-11-11 UTC — bounded streaming custody feature, pure qualification activation

From RED cleanup `b9276463df13992dd3c1d8b58778517b7e02783b` (tree `7e9676532c5ddc1c307df456dd30fbbe21328de6`), the closed format is a four-byte big-endian header length, a short authenticated canonical JSON header, ciphertext and a 16-byte tag. A fresh 12-byte IV and dedicated 32-byte test key are used for AES-256-GCM. The inner data consists of strict LF-terminated header/file/chunk/file-end/package-end JSONL frames compressed with gzip before encryption. Each chunk holds at most 65,536 native bytes. Limits are 4,096 files, 512 MiB native bytes, 768 MiB expanded JSONL, 128 KiB per record including LF, and 128 MiB for the entire binary envelope.

The new tests use independently generated SYN fixtures and throwaway CSPRNG keys. The isolated pure job uses no GitHub environment, provisioned secret, real state or native fixture. Full P1 and the earlier 8Q are outside this activation. This entry does not claim that the real checkpoint fits the envelope or that the future cross-runner custody workflow has been qualified.


### 2026-11-11 UTC — streaming custody helper verified with synthetic inputs only

[Custody GREEN 43117597048](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43117597048), attempt 1, push, single pure job 130849494150, terminal success. Source `20726e9f30bf44f8ca78003f28d41bb1b17d8094`, tree `14ea22e80e736c1d23d2451caf9d889383453d90`, parent `b9276463df13992dd3c1d8b58778517b7e02783b`, Node helper `9a486b839874ed8e9a950f6a823b18e7585de52e`, tests `c913c94be080597704fbf7d370475443e1f1b96d`, TEMP `d484bf8208efa271cf06fcff1541f5aa1fd465cd`, activation report `2f44bff168bf5c298992357d079e7c7d0c0c338b`. The source was frozen through terminal. Across this custody unit, only the two new Node files, temporary workflow and appended report were touched. The observer's five MJS files, SDK, descriptor, package/lock, production/config and all other base leaves retained their original modes/types/blob SHAs.

* Ubuntu hosted runner/Node 22, 3-minute job budget. Locked `npm ci --ignore-scripts --no-audit --no-fund` supplied the repository lint tool. Syntax checks and focused `npx --no-install eslint` passed on both files. The closure gate confirmed only the seven declared built-in Node import specifiers within crypto/fs/path/stream/zlib, no dynamic require/import in the helper and no references from lib/worker. No Worker graph was rebuilt for this unit.
* `node --test --test-reporter=tap test/finite-checkpoint-custody.test.mjs`: **9 TAP tests, 9 passed, 0 failed/cancelled/skipped/todo**. The count includes one enclosing test and eight subtests: binary/Unicode/multi-chunk roundtrip and fresh IV; keys/expected context; independent packet and tamper rejection; invalid authenticated internal records; JSONL/gzip framing and bounded size/EOF; filesystem links/specials/oversize; allowlisted public inventory/exclusive destination; separate Node processes and closed CLI output. The explicit unavailable-API RED above was not rerun. These nine TAP entries are custody checks and do not include 8Q, P1 or an original lifecycle.
* The implementation pins path lookups to open directory descriptors on hosted Linux, rejects symlinks and multiply linked regular files, checks inventory/hash consistency across source passes and leaves source permissions intact. [Public APIs](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/20726e9f30bf44f8ca78003f28d41bb1b17d8094/test/fixtures/finite-checkpoint-custody.mjs#L328) accept `sealDirectory({sourceDir,stagingDir,context})` / `openDirectory({stagingDir,destinationDir,context})`. Staging contains exactly envelope.bin, receipt.json and manifest.json. The caller supplies trusted isolated runner directories. The serialized inventory is defined over regular-file paths and bytes; empty-directory topology and source permission metadata are outside that inventory.
* [Authentication and bounded verification](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/20726e9f30bf44f8ca78003f28d41bb1b17d8094/test/fixtures/finite-checkpoint-custody.mjs#L187) authenticates the complete GCM body before gunzip. Opening first verifies all JSONL framing, sizes, paths, hashes and end-of-stream without creating a destination. It then replays the same authenticated compressed bytes into an exclusive directory, revalidates content and hashes the restored files. Rollback tracks the inodes created by the invocation. Seal verifies the actual written public inventory before returning its receipt. The public receipt proves the authenticated regular-file inventory; it does not certify subsequent business assertions.
* The pure test job generated ephemeral CSPRNG keys only for its own fixtures and did not reference the dedicated GitHub environment. Native stdout/TAP and fixture contents were not published. [Artifact 13898912465](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43117597048/artifacts/13898912465) contains only the safe test summary and manifest, 1,137 ZIP bytes, SHA-256 `25cbc22b7d26e5b6493c6648d4644f8230c48374dff863ae95c1f25c50bd323d`, expires 2026-11-18 23:09:48 UTC. Same-ID download attempt 1 passed; attempts 2/3 and both delays were skipped. Strict readback verified source/run/attempt/mode and three exact paths: result.json (347 bytes, SHA-256 `48a6d320bb91e222e169fe5563e53d1212ad0597de4ff209bc527403e25e925b`), summary.log (361 bytes, SHA-256 `4ebcf42de9905de9faef55469a93d803bd154a758129ebd230cc7a06658a7e99`), manifest.json (379 bytes, SHA-256 `72679820152331c9035239478e922b5fa1fdd7b839b6adcb2cb2d5d2d416a6fb`).

Bounded rejection was tested with small malformed inputs and sparse over-limit files, not a full-scale native checkpoint. Encrypted artifacts remain public ciphertext; future authorized callers still need the correct dedicated key, exact expected run/kind/revision, checked exterior inventory and sufficient original clock margin. This pure run established neither the actual native compression ratio under the 128 MiB envelope ceiling nor stored environment-key availability or rotation. No I0, producer, consumer, native database read, full9 or PC-off run occurred. Terminal action: retire TEMP and STOP before any full lifecycle launch. operationalReadiness=false, completePackage=false, PCoff=false.


### 2026-11-11 UTC — inactive staging for the fixed SYN original lifecycle with custody

Base `ae688f979dc35fa2c2274703c2b6e89cc9272cdd`, tree `e12ecc7f366ad04df8baf83ad3e2af1d0a4aafed`, report `7f586fc96b057bbce3fa4e04cdfff5efebaff692`; 3,188 leaves. [Narrow staging authorization](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/99914b91d596519254a95e18e2f8cb90cba3833b/docs/superpowers/briefs/2026-11-11-finite-budget-custody-orchestration-task1.md). This is a static proposal for Root's review. TEMP blob `8982fffc2c8c4ec35b84c194a4f84521694a03ca`, 48,601 characters. No execution, native enrollment/issuer, key preflight, decryption, GitHub environment read, I0, alarm or PC-off evidence is claimed.

The workflow declares only a manual dispatch with no inputs. Each of its three jobs has a literal false job condition, including both environment-referencing jobs. No automatic trigger exists. Future activation requires a separate controlled workflow revision and Root ruling. The encryption-secret name in YAML is a reference only. No secret value is present in Source, report, process arguments or workflow outputs. Its format/use would only be established by a future successful per-job preflight.

| Job | Fixed scope if later released | Private inputs/outputs | Permitted public artifacts |
| --- | --- | --- | --- |
| pure, ≤3 min | Fixed repository/branch/attempt, exact checkout, Node 22, seven syntax/lint inputs, original eight Q groups and exact prepared M/QA preflight. No environment. | Raw npm/lint/preflight/TAP diagnostics remain on the runner. | Closed safe TAP/status/preflight plus original budget manifest in afw-pure-public, same-ID readback. |
| positive_prepare, ≤15 min, needs successful pure | Original job start recorded once; dedicated key preflight before native work; prior pure source/run/attempt/path/bytes/SHA verification; exactly one filename-based prepare-positive using default wait to original C0−120s. | In runner.temp/afw-prep-private: original checkpoint child, its producer log/status and only the fixed failure-epochs output if present. No log or outer custody file is placed in the original checkpoint child. | Only afw-prep-public/{envelope.bin,manifest.json,receipt.json}; checkpoint or explicit producer-failure kind. Only the verified artifact ID and three outer file digests pass to the next job. |
| positive_consume, ≤5 min, needs successful positive_prepare | Revalidate dedicated key, exact producer artifact ID and all three outer hashes. Authenticate and restore into fresh afw-cold-input; run original verify-positive and one native P1 against its checkpoint child and original C0/C1. | In runner.temp/afw-result-private: only the fixed full-result.json, epochs.json, original TAP, status and local validation log where present. Native SQLite/KV scratch and other workspace output never become public upload paths. | Only afw-result-public/{envelope.bin,manifest.json,receipt.json}; positive-result or consumer-failure kind. Closed numeric/boolean/enumerated business and epoch receipts only after successful P1, custody and readback. |

The native fixture has its own local SDK client, ephemeral RS256 signer and modeled CF/GitHub responses. The staged commands name its fixed paths and take no arbitrary source directory, log glob or external request input. Checkout/npm and GitHub artifact actions are CI transport. The custody key is scoped to nine helper-only steps across the two secured jobs. Native, dependency, upload and download steps receive no injected custody key. Runner ancestors, browser data, user profiles and system logs are outside collection scope.

The custodian verifies its three public files, authenticates before any decompression, verifies all internal file hashes and authenticates the local roundtrip before upload; readback requires an exact same-ID download, direct byte comparisons on the originating runner, a new authenticated open and original checkpoint verification where applicable. The consumer additionally checks the producer's verified exterior digests. A red original fixture step stays red; only its fixed failure bundle can take the encrypted preservation path. A failed seal/open/local verification prevents the corresponding upload/consumer. No plaintext fallback, alternate artifact or extended clock is staged.

Static inspection, without a local checkout/runtime or CI: exactly three false jobs, dependencies pure → positive_prepare → positive_consume, budgets 3/15/5, 14/26/29 steps. Three exact allowlisted artifact upload destinations; five same-ID download points, three attempts each with 2s/5s delays conditional on preceding failure and a mandatory successful-download gate. No dispatch input, push, schedule, workflow_run, PR trigger, generic uploader, old suites, new RED or partial producer. Inspected 45 Bash step bodies and parsed the syntax of 9 embedded Node heredocs without executing them. This was a structural inspection of the emitted YAML and scripts, not GitHub runner validation or a native rehearsal.

The real envelope ratio and cold-runner timing remain unmeasured. Extra encryption, readback and validation must fit the existing post-disposal margin or the future qualification must fail. The helper retains its fixed 128 MiB envelope bound. No Task1 acceptance, fresh review, Task2 or full9 launch follows from this staging. operationalReadiness=false, completePackage=false, PCoff=false. Leave TEMP inactive and STOP_WRITES pending Root review.


### 2026-11-11 UTC — finite activation of the original SYN qualification

[Root release](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/197400ad1d2b2a38e54cafbde7b7ef1eef12b114/docs/superpowers/briefs/2026-11-11-finite-budget-custody-full-lifecycle-task1.md) permits one attempt from the reviewed staging Source `5a3ea2a41504dad4cac66215272bac7608d6a25d`, tree `1ceef99250f521cb1104099a84988ce50e9d625a`, report `42a17ba5a12812180807ab6c0664f1f884f2a40e`. Immediately before activation the ref and main matched their pinned values, the staging commit had zero runs and no recent Source job was active. The original 48,601-character staged workflow `8982fffc2c8c4ec35b84c194a4f84521694a03ca` is reconstructable byte-for-byte by reversing just its run name, sole trigger and three job guards. The activated TEMP blob is `e2b057db7408a8cf0ebdca24333c9452e4e39c20`. Its only trigger is a push to this exact branch touching TEMP. All three jobs require attempt 1; producer and consumer also require the successful preceding job. Scripts, time limits, original clocks, custody gates, fixed synthetic inputs and all other Source MJS/config/SDK files are unchanged.

This entry records activation only. Actual key validation, compressed fit, recovery margin, original alarm, 8Q/P1 results and custody receipts remain unclaimed until terminal. The ref is frozen through terminal; no rerun or fixture refresh is authorized.
