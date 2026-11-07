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
