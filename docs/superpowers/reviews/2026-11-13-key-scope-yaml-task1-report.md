# Task1 inactive preparation report — STOP_FOR_ROOT_GATE

Prepared by the Task1 implementer from the exact brief at docs ref 1028239f985a8c79d10fefd30a0ef871034d209d. This report is proposed content for Root to publish at docs/superpowers/reviews/2026-11-13-key-scope-yaml-task1-report.md; the implementer did not write the docs branch.

## Disposition and authority

STOP_FOR_ROOT_GATE. The candidate is INACTIVE and UNATTACHED. Source ref remains 72c10833654aa7226d8376e95d767455e1c144b2; no update_ref, push, dispatch, workflow run, activation, Native/key/Cloudflare action or main mutation was performed. Root explicitly reconciled the restrictive no-refpush clause: preparation permits GitDB objects only; Root owns any later attachment, overlay and exact one-use release.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT=Source-only/inactive/unattached; ORIGIN=https://github.com/tokenizartinfo-ops/agent-friendly-web; RESOURCE_TYPE=GitDB blob/tree/commit; RESOURCE_ID=.github/workflows/afw-finite-budget-qualification.yml; ALLOWED_ACTION=create inactive objects and read metadata; ROLLBACK=no ref was changed, original F7 and complete BASE tree/report remain recoverable.

Tests-first regression edits were prepared as public Source strings in RAM before the adapter repair. No Source was executed, evaluated, imported, parsed by yaml, syntax checked or tested during preparation. No local Source files, clones, dependencies, builds or persistent processes were created. The only local computation used public strings for passive inventory, byte comparison and hashing. There is no manufactured RED/GREEN. The candidate has not been qualified.

## Immutable candidate and complete patch

- Source: [ab4d2dd87e27f7e4308f601f6eda410d5ebba557](https://github.com/tokenizartinfo-ops/agent-friendly-web/commit/ab4d2dd87e27f7e4308f601f6eda410d5ebba557)
- Tree: `31c6da3e51f4fd4425c303ae1ace6b3df68e3071`; parent: `72c10833654aa7226d8376e95d767455e1c144b2`.
- F7 blob: `bf74dae9ff69157cf7dc76cd079e40e77089fcde`; 355372 bytes; SHA256 `776c767d38a7b23d03000a655e5eae7099b10a14414ca54daba98b971699aa8f`.
- [Complete candidate F7](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/ab4d2dd87e27f7e4308f601f6eda410d5ebba557/.github/workflows/afw-finite-budget-qualification.yml). Four helper bodies are identified by their existing NODE_SUITE_ADAPTER, NODE_SUITE_CONTROLS, NODE_SUITE_VERIFIER and NODE_SAFE_ZIP markers.
- [Full current BASE-to-candidate comparison](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/72c10833654aa7226d8376e95d767455e1c144b2...ab4d2dd87e27f7e4308f601f6eda410d5ebba557). Its sole leaf delta is F7.
- Complete reconstructive unified patch (all lines, no truncation): GitDB blob `bbf05a0be722f0e8a5b7dc26fd3cb716553e33cd`, 486989 UTF-8 bytes, fetchable with GitHub fetch_blob in this repository. The patch transforms the exact original F7 f7a71f1a0fa4f5ddf069ff411f008a098455e5cc into this candidate. It is a Git object only, not another Source leaf.

| Helper | Bytes | SHA256 |
| --- | ---: | --- |
| NODE_SUITE_ADAPTER | 61127 | `2e33b676b244a463a9bdc637c303e62945631587749906bb6f9eea775a4f2e1f` |
| NODE_SUITE_CONTROLS | 58832 | `3627dafe53c6b1c6d930cc8c6f747e5d9678ecc54438e6ae03213ee1f7f44ece` |
| NODE_SUITE_VERIFIER | 15099 | `94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf` |
| NODE_SAFE_ZIP | 13305 | `b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d` |

Verifier and SafeZIP are byte-exact to the corrected b564 seed. Existing six family IDs, 32 subcase IDs and 16 independent receiver controls remain unchanged. New assertions are inside the existing key_scope subcase. The corrected whole-job receipt 4096/512MiB, needs classification, generic ZIP3, cryptographic scripts, all Native commands, TAP/oracles/16checks8executions/budgets and public DTO keys remain untouched.

Passive reverse projection removes only the new run-name, replaces adapter/controls with their corrected b564 seed bodies, removes the contracts precheck and the appended two keyless jobs; it reproduces b5646538bb9f2d119e8943896990ac657d7bd518 F7 exactly. This is byte evidence, not execution evidence.

## Parser and field policy

validateKeyScopes(text) is synchronous and returns true only on admission; every failure is reduced to Error('key_scope_rejected'), without source extracts, parser error details, paths or arbitrary strings. It requires AFW_SYN_CHECKPOINT_KEY absent. Input is a primitive losslessly encodable UTF-8 string <=524288 bytes; the AST walk is <=20000 nodes and depth<=64.

The lazy loader is anchored to realpath(GITHUB_WORKSPACE), requires process.cwd() to be that checkout, checks the exact package.json and real package-lock bytes (Git blob 36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b), package name, yaml 2.9.0 and the specified integrity. createRequire(checkout package.json).resolve('./node_modules/yaml') is confined to the exact real checkout node_modules/yaml directory; absent, wrong-version, relocated/symlinked or unexpected-API libraries reject. There is no global/NODE_PATH fallback, install in bootstrap/verifier or top-level external import. Other helper consumers can import without yaml when they do not call this validator.

Parser profile: yaml.parseAllDocuments with YAML1.2/core, strict, uniqueKeys, stringKeys:false, merge:false, customTags:[], prettyErrors:false and logLevel:silent. Exactly one document; every error/warning fails. Explicit document/directive forms, YAML/TAG directives, aliases, anchors, tags, merge keys, non-string/complex keys and unsupported AST node kinds reject. The AST is walked directly, without alias expansion or toJS/toJSON conversion. Mapping keys are decoded primitive strings and independently checked for duplicates. Step name/run/uses/shell/if values, when present, must be primitive strings; IDs are unique per job.

The same fixed 26 canonical bindings are required once each at their job/step/env identities; key and value must be untagged/unanchored PLAIN scalars with exact source spelling. The only secret scalar is dollar-opener + ' secrets.AFW_SYN_CHECKPOINT_KEY ' + closing delimiter. Every decoded mapping key and string value is inspected. Extra AFW env keys at workflow/job/other-step scope, secret-context access, secret delegation/inheritance fields and dynamic mapping keys reject. Custody name, custody module and prohibited operation/token checks are applied to decoded content. Six exact environment associations and all six direct contracts dependencies are required; key-bearing job conditions cannot use always().

All delimited expression spans use single-quote state and doubled-single-quote escaping; a quoted closing delimiter cannot terminate the span. Unterminated/nested/malformed or unproved forms reject. Unquoted sensitive identifiers are matched case-insensitively before normalization. Sensitive AFW-key string indices also reject. Implicit job/step if fields are inspected as expressions without requiring delimiters. No Boolean if constants were added to the reviewed finite forms.

The complete field-form policy below is FIXED DATA from b564 plus the explicit two-job qualifier and activation guard shapes. It is never derived from input under test. A form is token-normalized for whitespace using the same conservative lexer, then must match its exact field class. The only opaque literal is the github.event.head_commit.message comparison literal in an already fixed complete job.if form; it becomes '@ROOT_MESSAGE' after sensitive-token checks. Repository/ref literals remain exact; status literals remain exact. Unknown fields/forms reject, including alternative indexing/casing/wrappers not enumerated. This finite policy is not a complete Actions evaluator or a general script non-exfiltration proof.

Field paths: run-name is root only; job.if and outputs.FIELD are under jobs.JOB; step.if and run are under jobs.JOB.steps.INDEX; with.FIELD and env.FIELD are under those steps. Keys containing expression openers reject. No other expression field class is admitted. Approved canonical secret scalar nodes are handled separately and do not enter the non-secret registry.

```json
{
  "run-name": [
    "github.sha"
  ],
  "job.if": [
    "false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1",
    "false && always() && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1",
    "github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1",
    "always() && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1",
    "github.event_name == 'push' && github.event.head_commit.message == '@ROOT_MESSAGE' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1",
    "false && github.event_name == 'push' && github.event.head_commit.message == '@ROOT_MESSAGE' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1",
    "always() && github.event_name == 'push' && github.event.head_commit.message == '@ROOT_MESSAGE' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1",
    "false && always() && github.event_name == 'push' && github.event.head_commit.message == '@ROOT_MESSAGE' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1"
  ],
  "outputs.artifact-id": [
    "steps.upload.outputs.artifact-id"
  ],
  "outputs.artifact-digest": [
    "steps.upload.outputs.artifact-digest"
  ],
  "with.ref": [
    "github.sha"
  ],
  "step.if": [
    "steps.pure_test.outcome == 'success'",
    "always() && !cancelled() && steps.pure_test.outcome == 'success'",
    "always() && !cancelled() && steps.scope.outcome == 'success'",
    "always() && !cancelled() && steps.pure_seal.outcome == 'success'",
    "always() && !cancelled() && steps.upload.outcome == 'success' && steps.upload.outputs.artifact-id != ''",
    "always() && !cancelled() && steps.pure_receipt_1.outcome == 'failure'",
    "always() && !cancelled() && steps.pure_receipt_wait2.outcome == 'success' && steps.pure_receipt_1.outcome == 'failure'",
    "always() && !cancelled() && steps.pure_receipt_2.outcome == 'failure'",
    "always() && !cancelled() && steps.pure_receipt_wait3.outcome == 'success' && steps.pure_receipt_2.outcome == 'failure'",
    "always() && !cancelled() && steps.upload.outcome == 'success'",
    "always() && !cancelled() && steps.pure_verified.outcome == 'success'",
    "always() && !cancelled()",
    "always() && !cancelled() && steps.custody.outcome == 'success'",
    "always() && !cancelled() && steps.seal_prepare.outcome == 'success'",
    "always() && !cancelled() && steps.seal.outcome == 'success'",
    "always() && !cancelled() && steps.own_metadata.outcome == 'success'",
    "always() && !cancelled() && steps.own_open.outcome == 'success'",
    "steps.native.outcome == 'success'",
    "steps.peer_download.outcome == 'success'",
    "always() && !cancelled() && steps.suite_bootstrap.outcome == 'success' && steps.native.outcome == 'success'",
    "always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'",
    "always() && !cancelled() && steps.summary_pair.outcome == 'success'",
    "always() && !cancelled() && steps.pair_written.outcome == 'success'"
  ],
  "env.PURE_COMPLETE": [
    "steps.pure_test.outcome == 'success' && steps.controls.outcome == 'success' && steps.preflight.outputs.all-passed == 'true'"
  ],
  "env.PURE_TEST_OUTCOME": [
    "steps.pure_test.outcome"
  ],
  "env.CONTROLS_OUTCOME": [
    "steps.controls.outcome"
  ],
  "env.PREFLIGHT_OUTCOME": [
    "steps.preflight.outcome"
  ],
  "with.name": [
    "github.sha",
    "github.run_id"
  ],
  "with.path": [
    "runner.temp"
  ],
  "with.github-token": [
    "github.token"
  ],
  "with.repository": [
    "github.repository"
  ],
  "with.run-id": [
    "github.run_id"
  ],
  "with.artifact-ids": [
    "steps.upload.outputs.artifact-id",
    "needs.contracts.outputs.artifact-id"
  ],
  "env.ARTIFACT_ID": [
    "steps.upload.outputs.artifact-id"
  ],
  "env.DOWNLOADED": [
    "steps.pure_receipt_1.outcome == 'success' || steps.pure_receipt_2.outcome == 'success' || steps.pure_receipt_3.outcome == 'success'"
  ],
  "env.READBACK": [
    "runner.temp"
  ],
  "run": [
    "steps.pure_test.outcome",
    "steps.controls.outcome",
    "steps.preflight.outputs.all-passed",
    "steps.pure_verified.outcome",
    "steps.pure_seal.outcome",
    "steps.native.outcome",
    "steps.own_verified.outcome",
    "steps.peer_download.outcome",
    "steps.peer_open_positive_prepare.outcome",
    "steps.peer_open_positive_consume.outcome",
    "steps.peer_open_reduction_prepare.outcome",
    "steps.peer_open_reduction_consume_a.outcome",
    "steps.peer_open_readonly.outcome",
    "steps.aggregate.outcome",
    "steps.summary_pair.outputs.status",
    "steps.summary_upload.outcome",
    "steps.pair_written.outputs.status"
  ],
  "outputs.kind": [
    "steps.seal.outputs.kind"
  ],
  "env.PURE_ID": [
    "needs.contracts.outputs.artifact-id"
  ],
  "env.PURE_DIGEST": [
    "needs.contracts.outputs.artifact-digest"
  ],
  "env.PURE_MANIFEST_SHA": [
    "needs.contracts.outputs.manifest-sha256"
  ],
  "env.GH_ARTIFACT_TOKEN": [
    "github.token"
  ],
  "env.COMMAND_OK": [
    "steps.native.outcome == 'success'",
    "steps.native.outcome == 'success' && steps.aggregate.outcome == 'success'"
  ],
  "env.OWN_ARTIFACT_ID": [
    "steps.upload.outputs.artifact-id"
  ],
  "env.OWN_DIGEST": [
    "steps.upload.outputs.artifact-digest"
  ],
  "env.OWN_KIND": [
    "steps.seal.outputs.kind"
  ],
  "env.PRODUCER_ID": [
    "needs.positive_prepare.outputs.artifact-id",
    "needs.reduction_prepare.outputs.artifact-id"
  ],
  "env.PRODUCER_DIGEST": [
    "needs.positive_prepare.outputs.artifact-digest",
    "needs.reduction_prepare.outputs.artifact-digest"
  ],
  "env.PRODUCER_KIND": [
    "needs.positive_prepare.outputs.kind",
    "needs.reduction_prepare.outputs.kind"
  ],
  "outputs.safe-id": [
    "steps.summary_upload.outputs.artifact-id"
  ],
  "outputs.safe-digest": [
    "steps.summary_upload.outputs.artifact-digest"
  ],
  "env.PURE_BINDING_OUTCOME": [
    "steps.pure_binding.outcome"
  ],
  "env.NATIVE_OUTCOME": [
    "steps.native.outcome"
  ],
  "env.AGGREGATE_OUTCOME": [
    "steps.aggregate.outcome"
  ],
  "env.OWN_METADATA_OUTCOME": [
    "steps.own_metadata.outcome"
  ],
  "env.OWN_OPEN_OUTCOME": [
    "steps.own_open.outcome"
  ],
  "env.OWN_VERIFIED_OUTCOME": [
    "steps.own_verified.outcome"
  ],
  "env.NATIVE_ID": [
    "steps.upload.outputs.artifact-id"
  ],
  "env.NATIVE_DIGEST": [
    "steps.upload.outputs.artifact-digest"
  ],
  "env.NATIVE_KIND": [
    "steps.seal.outputs.kind"
  ],
  "env.AFW_SUITE_NEEDS": [
    "toJSON(needs)"
  ],
  "outputs.manifest-sha256": [
    "steps.pure_verified.outputs.manifest-sha256"
  ]
}
```

## Actual current expression inventory

This inventory is a complete PASSIVE reading of the final immutable Source strings, not a YAML/Actions parse or proof of admission. There are 290 delimited occurrences (including exactly26 canonical secret bindings), 66 implicit step-if fields, and 73 distinct complete strings across both categories. Every current occurrence has a named field class; passive literal comparison finds no non-secret form outside the fixed registry after the one declared message normalization. Root must still review the actual Source and run-bound parser positive in a separately released qualification.

Expression dictionary:

```json
{
  "E001": "github.sha",
  "E002": "false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1",
  "E003": "steps.upload.outputs.artifact-id",
  "E004": "steps.upload.outputs.artifact-digest",
  "E005": "steps.pure_verified.outputs.manifest-sha256",
  "E006": "steps.pure_test.outcome == 'success'",
  "E007": "always() && !cancelled() && steps.pure_test.outcome == 'success'",
  "E008": "always() && !cancelled() && steps.scope.outcome == 'success'",
  "E009": "steps.pure_test.outcome == 'success' && steps.controls.outcome == 'success' && steps.preflight.outputs.all-passed == 'true'",
  "E010": "steps.pure_test.outcome",
  "E011": "steps.controls.outcome",
  "E012": "steps.preflight.outcome",
  "E013": "always() && !cancelled() && steps.pure_seal.outcome == 'success'",
  "E014": "runner.temp",
  "E015": "always() && !cancelled() && steps.upload.outcome == 'success' && steps.upload.outputs.artifact-id != ''",
  "E016": "github.token",
  "E017": "github.repository",
  "E018": "github.run_id",
  "E019": "always() && !cancelled() && steps.pure_receipt_1.outcome == 'failure'",
  "E020": "always() && !cancelled() && steps.pure_receipt_wait2.outcome == 'success' && steps.pure_receipt_1.outcome == 'failure'",
  "E021": "always() && !cancelled() && steps.pure_receipt_2.outcome == 'failure'",
  "E022": "always() && !cancelled() && steps.pure_receipt_wait3.outcome == 'success' && steps.pure_receipt_2.outcome == 'failure'",
  "E023": "always() && !cancelled() && steps.upload.outcome == 'success'",
  "E024": "steps.pure_receipt_1.outcome == 'success' || steps.pure_receipt_2.outcome == 'success' || steps.pure_receipt_3.outcome == 'success'",
  "E025": "always() && !cancelled() && steps.pure_verified.outcome == 'success'",
  "E026": "always() && !cancelled()",
  "E027": "steps.preflight.outputs.all-passed",
  "E028": "steps.pure_verified.outcome",
  "E029": "steps.pure_seal.outcome",
  "E030": "steps.seal.outputs.kind",
  "E031": "secrets.AFW_SYN_CHECKPOINT_KEY",
  "E032": "needs.contracts.outputs.artifact-id",
  "E033": "needs.contracts.outputs.artifact-digest",
  "E034": "needs.contracts.outputs.manifest-sha256",
  "E035": "always() && !cancelled() && steps.custody.outcome == 'success'",
  "E036": "steps.native.outcome == 'success'",
  "E037": "always() && !cancelled() && steps.seal_prepare.outcome == 'success'",
  "E038": "always() && !cancelled() && steps.seal.outcome == 'success'",
  "E039": "always() && !cancelled() && steps.own_metadata.outcome == 'success'",
  "E040": "always() && !cancelled() && steps.own_open.outcome == 'success'",
  "E041": "steps.native.outcome",
  "E042": "steps.own_verified.outcome",
  "E043": "needs.positive_prepare.outputs.artifact-id",
  "E044": "needs.positive_prepare.outputs.artifact-digest",
  "E045": "needs.positive_prepare.outputs.kind",
  "E046": "needs.reduction_prepare.outputs.artifact-id",
  "E047": "needs.reduction_prepare.outputs.artifact-digest",
  "E048": "needs.reduction_prepare.outputs.kind",
  "E049": "steps.summary_upload.outputs.artifact-id",
  "E050": "steps.summary_upload.outputs.artifact-digest",
  "E051": "steps.peer_download.outcome == 'success'",
  "E052": "always() && !cancelled() && steps.suite_bootstrap.outcome == 'success' && steps.native.outcome == 'success'",
  "E053": "steps.peer_download.outcome",
  "E054": "steps.peer_open_positive_prepare.outcome",
  "E055": "steps.peer_open_positive_consume.outcome",
  "E056": "steps.peer_open_reduction_prepare.outcome",
  "E057": "steps.peer_open_reduction_consume_a.outcome",
  "E058": "steps.peer_open_readonly.outcome",
  "E059": "steps.native.outcome == 'success' && steps.aggregate.outcome == 'success'",
  "E060": "always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'",
  "E061": "steps.pure_binding.outcome",
  "E062": "steps.aggregate.outcome",
  "E063": "steps.own_metadata.outcome",
  "E064": "steps.own_open.outcome",
  "E065": "always() && !cancelled() && steps.summary_pair.outcome == 'success'",
  "E066": "steps.summary_pair.outputs.status",
  "E067": "steps.summary_upload.outcome",
  "E068": "false && always() && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1",
  "E069": "toJSON(needs)",
  "E070": "false && github.event_name == 'push' && github.event.head_commit.message == 'AFW DECODED KEY SCOPE QUALIFICATION HELD' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1",
  "E071": "always() && !cancelled() && steps.pair_written.outcome == 'success'",
  "E072": "steps.pair_written.outputs.status",
  "E073": "false && always() && github.event_name == 'push' && github.event.head_commit.message == 'AFW DECODED KEY SCOPE QUALIFICATION HELD' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1"
}
```

All occurrences (one-based F7 line, zero-based step index; null means not a step):

```json
[
  {
    "line": 2,
    "job": null,
    "stepIndex": null,
    "stepId": null,
    "field": "run-name",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 15,
    "job": "contracts",
    "stepIndex": null,
    "stepId": null,
    "field": "job.if",
    "kind": "delimited",
    "form": "E002"
  },
  {
    "line": 21,
    "job": "contracts",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-id",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 22,
    "job": "contracts",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-digest",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 23,
    "job": "contracts",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.manifest-sha256",
    "kind": "delimited",
    "form": "E005"
  },
  {
    "line": 41,
    "job": "contracts",
    "stepIndex": 1,
    "stepId": null,
    "field": "with.ref",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 1347,
    "job": "contracts",
    "stepIndex": 8,
    "stepId": "controls",
    "field": "step.if",
    "kind": "implicit",
    "form": "E006"
  },
  {
    "line": 1358,
    "job": "contracts",
    "stepIndex": 9,
    "stepId": "preflight",
    "field": "step.if",
    "kind": "implicit",
    "form": "E007"
  },
  {
    "line": 1383,
    "job": "contracts",
    "stepIndex": 10,
    "stepId": "pure_seal",
    "field": "step.if",
    "kind": "implicit",
    "form": "E008"
  },
  {
    "line": 1385,
    "job": "contracts",
    "stepIndex": 10,
    "stepId": "pure_seal",
    "field": "env.PURE_COMPLETE",
    "kind": "delimited",
    "form": "E009"
  },
  {
    "line": 1386,
    "job": "contracts",
    "stepIndex": 10,
    "stepId": "pure_seal",
    "field": "env.PURE_TEST_OUTCOME",
    "kind": "delimited",
    "form": "E010"
  },
  {
    "line": 1387,
    "job": "contracts",
    "stepIndex": 10,
    "stepId": "pure_seal",
    "field": "env.CONTROLS_OUTCOME",
    "kind": "delimited",
    "form": "E011"
  },
  {
    "line": 1388,
    "job": "contracts",
    "stepIndex": 10,
    "stepId": "pure_seal",
    "field": "env.PREFLIGHT_OUTCOME",
    "kind": "delimited",
    "form": "E012"
  },
  {
    "line": 1503,
    "job": "contracts",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "step.if",
    "kind": "implicit",
    "form": "E013"
  },
  {
    "line": 1506,
    "job": "contracts",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 1507,
    "job": "contracts",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 1512,
    "job": "contracts",
    "stepIndex": 12,
    "stepId": "pure_receipt_1",
    "field": "step.if",
    "kind": "implicit",
    "form": "E015"
  },
  {
    "line": 1516,
    "job": "contracts",
    "stepIndex": 12,
    "stepId": "pure_receipt_1",
    "field": "with.github-token",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 1517,
    "job": "contracts",
    "stepIndex": 12,
    "stepId": "pure_receipt_1",
    "field": "with.repository",
    "kind": "delimited",
    "form": "E017"
  },
  {
    "line": 1518,
    "job": "contracts",
    "stepIndex": 12,
    "stepId": "pure_receipt_1",
    "field": "with.run-id",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 1519,
    "job": "contracts",
    "stepIndex": 12,
    "stepId": "pure_receipt_1",
    "field": "with.artifact-ids",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 1520,
    "job": "contracts",
    "stepIndex": 12,
    "stepId": "pure_receipt_1",
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 1524,
    "job": "contracts",
    "stepIndex": 13,
    "stepId": "pure_receipt_wait2",
    "field": "step.if",
    "kind": "implicit",
    "form": "E019"
  },
  {
    "line": 1532,
    "job": "contracts",
    "stepIndex": 14,
    "stepId": "pure_receipt_2",
    "field": "step.if",
    "kind": "implicit",
    "form": "E020"
  },
  {
    "line": 1536,
    "job": "contracts",
    "stepIndex": 14,
    "stepId": "pure_receipt_2",
    "field": "with.github-token",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 1537,
    "job": "contracts",
    "stepIndex": 14,
    "stepId": "pure_receipt_2",
    "field": "with.repository",
    "kind": "delimited",
    "form": "E017"
  },
  {
    "line": 1538,
    "job": "contracts",
    "stepIndex": 14,
    "stepId": "pure_receipt_2",
    "field": "with.run-id",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 1539,
    "job": "contracts",
    "stepIndex": 14,
    "stepId": "pure_receipt_2",
    "field": "with.artifact-ids",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 1540,
    "job": "contracts",
    "stepIndex": 14,
    "stepId": "pure_receipt_2",
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 1544,
    "job": "contracts",
    "stepIndex": 15,
    "stepId": "pure_receipt_wait3",
    "field": "step.if",
    "kind": "implicit",
    "form": "E021"
  },
  {
    "line": 1552,
    "job": "contracts",
    "stepIndex": 16,
    "stepId": "pure_receipt_3",
    "field": "step.if",
    "kind": "implicit",
    "form": "E022"
  },
  {
    "line": 1555,
    "job": "contracts",
    "stepIndex": 16,
    "stepId": "pure_receipt_3",
    "field": "with.github-token",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 1556,
    "job": "contracts",
    "stepIndex": 16,
    "stepId": "pure_receipt_3",
    "field": "with.repository",
    "kind": "delimited",
    "form": "E017"
  },
  {
    "line": 1557,
    "job": "contracts",
    "stepIndex": 16,
    "stepId": "pure_receipt_3",
    "field": "with.run-id",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 1558,
    "job": "contracts",
    "stepIndex": 16,
    "stepId": "pure_receipt_3",
    "field": "with.artifact-ids",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 1559,
    "job": "contracts",
    "stepIndex": 16,
    "stepId": "pure_receipt_3",
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 1563,
    "job": "contracts",
    "stepIndex": 17,
    "stepId": "pure_verified",
    "field": "step.if",
    "kind": "implicit",
    "form": "E023"
  },
  {
    "line": 1565,
    "job": "contracts",
    "stepIndex": 17,
    "stepId": "pure_verified",
    "field": "env.ARTIFACT_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 1566,
    "job": "contracts",
    "stepIndex": 17,
    "stepId": "pure_verified",
    "field": "env.DOWNLOADED",
    "kind": "delimited",
    "form": "E024"
  },
  {
    "line": 1567,
    "job": "contracts",
    "stepIndex": 17,
    "stepId": "pure_verified",
    "field": "env.READBACK",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 1583,
    "job": "contracts",
    "stepIndex": 18,
    "stepId": null,
    "field": "step.if",
    "kind": "implicit",
    "form": "E025"
  },
  {
    "line": 1590,
    "job": "contracts",
    "stepIndex": 19,
    "stepId": null,
    "field": "step.if",
    "kind": "implicit",
    "form": "E026"
  },
  {
    "line": 1593,
    "job": "contracts",
    "stepIndex": 19,
    "stepId": null,
    "field": "run",
    "kind": "delimited",
    "form": "E010"
  },
  {
    "line": 1594,
    "job": "contracts",
    "stepIndex": 19,
    "stepId": null,
    "field": "run",
    "kind": "delimited",
    "form": "E011"
  },
  {
    "line": 1595,
    "job": "contracts",
    "stepIndex": 19,
    "stepId": null,
    "field": "run",
    "kind": "delimited",
    "form": "E027"
  },
  {
    "line": 1596,
    "job": "contracts",
    "stepIndex": 19,
    "stepId": null,
    "field": "run",
    "kind": "delimited",
    "form": "E028"
  },
  {
    "line": 1597,
    "job": "contracts",
    "stepIndex": 19,
    "stepId": null,
    "field": "run",
    "kind": "delimited",
    "form": "E029"
  },
  {
    "line": 1599,
    "job": "positive_prepare",
    "stepIndex": null,
    "stepId": null,
    "field": "job.if",
    "kind": "delimited",
    "form": "E002"
  },
  {
    "line": 1605,
    "job": "positive_prepare",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-id",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 1606,
    "job": "positive_prepare",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-digest",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 1607,
    "job": "positive_prepare",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.kind",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 1632,
    "job": "positive_prepare",
    "stepIndex": 1,
    "stepId": null,
    "field": "with.ref",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 1672,
    "job": "positive_prepare",
    "stepIndex": 5,
    "stepId": "custody",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 1681,
    "job": "positive_prepare",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.github-token",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 1682,
    "job": "positive_prepare",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.repository",
    "kind": "delimited",
    "form": "E017"
  },
  {
    "line": 1683,
    "job": "positive_prepare",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.run-id",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 1684,
    "job": "positive_prepare",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.artifact-ids",
    "kind": "delimited",
    "form": "E032"
  },
  {
    "line": 1685,
    "job": "positive_prepare",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 1690,
    "job": "positive_prepare",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_ID",
    "kind": "delimited",
    "form": "E032"
  },
  {
    "line": 1691,
    "job": "positive_prepare",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_DIGEST",
    "kind": "delimited",
    "form": "E033"
  },
  {
    "line": 1692,
    "job": "positive_prepare",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_MANIFEST_SHA",
    "kind": "delimited",
    "form": "E034"
  },
  {
    "line": 1693,
    "job": "positive_prepare",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 1723,
    "job": "positive_prepare",
    "stepIndex": 9,
    "stepId": "seal_prepare",
    "field": "step.if",
    "kind": "implicit",
    "form": "E035"
  },
  {
    "line": 1725,
    "job": "positive_prepare",
    "stepIndex": 9,
    "stepId": "seal_prepare",
    "field": "env.COMMAND_OK",
    "kind": "delimited",
    "form": "E036"
  },
  {
    "line": 1741,
    "job": "positive_prepare",
    "stepIndex": 10,
    "stepId": "seal",
    "field": "step.if",
    "kind": "implicit",
    "form": "E037"
  },
  {
    "line": 1743,
    "job": "positive_prepare",
    "stepIndex": 10,
    "stepId": "seal",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 1754,
    "job": "positive_prepare",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "step.if",
    "kind": "implicit",
    "form": "E038"
  },
  {
    "line": 1757,
    "job": "positive_prepare",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 1757,
    "job": "positive_prepare",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 1758,
    "job": "positive_prepare",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 1763,
    "job": "positive_prepare",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "step.if",
    "kind": "implicit",
    "form": "E023"
  },
  {
    "line": 1765,
    "job": "positive_prepare",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "env.OWN_ARTIFACT_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 1766,
    "job": "positive_prepare",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "env.OWN_DIGEST",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 1767,
    "job": "positive_prepare",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 1768,
    "job": "positive_prepare",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 1778,
    "job": "positive_prepare",
    "stepIndex": 13,
    "stepId": "own_open",
    "field": "step.if",
    "kind": "implicit",
    "form": "E039"
  },
  {
    "line": 1780,
    "job": "positive_prepare",
    "stepIndex": 13,
    "stepId": "own_open",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 1781,
    "job": "positive_prepare",
    "stepIndex": 13,
    "stepId": "own_open",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 1789,
    "job": "positive_prepare",
    "stepIndex": 14,
    "stepId": "own_verified",
    "field": "step.if",
    "kind": "implicit",
    "form": "E040"
  },
  {
    "line": 1791,
    "job": "positive_prepare",
    "stepIndex": 14,
    "stepId": "own_verified",
    "field": "env.OWN_ARTIFACT_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 1792,
    "job": "positive_prepare",
    "stepIndex": 14,
    "stepId": "own_verified",
    "field": "env.OWN_DIGEST",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 1793,
    "job": "positive_prepare",
    "stepIndex": 14,
    "stepId": "own_verified",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 1809,
    "job": "positive_prepare",
    "stepIndex": 15,
    "stepId": "actual_outcome",
    "field": "step.if",
    "kind": "implicit",
    "form": "E026"
  },
  {
    "line": 1813,
    "job": "positive_prepare",
    "stepIndex": 15,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E041"
  },
  {
    "line": 1814,
    "job": "positive_prepare",
    "stepIndex": 15,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E042"
  },
  {
    "line": 1816,
    "job": "positive_consume",
    "stepIndex": null,
    "stepId": null,
    "field": "job.if",
    "kind": "delimited",
    "form": "E002"
  },
  {
    "line": 1822,
    "job": "positive_consume",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-id",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 1823,
    "job": "positive_consume",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-digest",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 1824,
    "job": "positive_consume",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.kind",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 1849,
    "job": "positive_consume",
    "stepIndex": 1,
    "stepId": null,
    "field": "with.ref",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 1889,
    "job": "positive_consume",
    "stepIndex": 5,
    "stepId": "custody",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 1898,
    "job": "positive_consume",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.github-token",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 1899,
    "job": "positive_consume",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.repository",
    "kind": "delimited",
    "form": "E017"
  },
  {
    "line": 1900,
    "job": "positive_consume",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.run-id",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 1901,
    "job": "positive_consume",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.artifact-ids",
    "kind": "delimited",
    "form": "E032"
  },
  {
    "line": 1902,
    "job": "positive_consume",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 1907,
    "job": "positive_consume",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_ID",
    "kind": "delimited",
    "form": "E032"
  },
  {
    "line": 1908,
    "job": "positive_consume",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_DIGEST",
    "kind": "delimited",
    "form": "E033"
  },
  {
    "line": 1909,
    "job": "positive_consume",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_MANIFEST_SHA",
    "kind": "delimited",
    "form": "E034"
  },
  {
    "line": 1910,
    "job": "positive_consume",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 1932,
    "job": "positive_consume",
    "stepIndex": 8,
    "stepId": "producer_metadata",
    "field": "env.PRODUCER_ID",
    "kind": "delimited",
    "form": "E043"
  },
  {
    "line": 1933,
    "job": "positive_consume",
    "stepIndex": 8,
    "stepId": "producer_metadata",
    "field": "env.PRODUCER_DIGEST",
    "kind": "delimited",
    "form": "E044"
  },
  {
    "line": 1934,
    "job": "positive_consume",
    "stepIndex": 8,
    "stepId": "producer_metadata",
    "field": "env.PRODUCER_KIND",
    "kind": "delimited",
    "form": "E045"
  },
  {
    "line": 1935,
    "job": "positive_consume",
    "stepIndex": 8,
    "stepId": "producer_metadata",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 1946,
    "job": "positive_consume",
    "stepIndex": 9,
    "stepId": "producer_open",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 1955,
    "job": "positive_consume",
    "stepIndex": 10,
    "stepId": "producer_binding",
    "field": "env.PRODUCER_ID",
    "kind": "delimited",
    "form": "E043"
  },
  {
    "line": 1956,
    "job": "positive_consume",
    "stepIndex": 10,
    "stepId": "producer_binding",
    "field": "env.PRODUCER_DIGEST",
    "kind": "delimited",
    "form": "E044"
  },
  {
    "line": 1957,
    "job": "positive_consume",
    "stepIndex": 10,
    "stepId": "producer_binding",
    "field": "env.PRODUCER_KIND",
    "kind": "delimited",
    "form": "E045"
  },
  {
    "line": 1998,
    "job": "positive_consume",
    "stepIndex": 12,
    "stepId": "seal_prepare",
    "field": "step.if",
    "kind": "implicit",
    "form": "E035"
  },
  {
    "line": 2000,
    "job": "positive_consume",
    "stepIndex": 12,
    "stepId": "seal_prepare",
    "field": "env.COMMAND_OK",
    "kind": "delimited",
    "form": "E036"
  },
  {
    "line": 2016,
    "job": "positive_consume",
    "stepIndex": 13,
    "stepId": "seal",
    "field": "step.if",
    "kind": "implicit",
    "form": "E037"
  },
  {
    "line": 2018,
    "job": "positive_consume",
    "stepIndex": 13,
    "stepId": "seal",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2029,
    "job": "positive_consume",
    "stepIndex": 14,
    "stepId": "upload",
    "field": "step.if",
    "kind": "implicit",
    "form": "E038"
  },
  {
    "line": 2032,
    "job": "positive_consume",
    "stepIndex": 14,
    "stepId": "upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 2032,
    "job": "positive_consume",
    "stepIndex": 14,
    "stepId": "upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 2033,
    "job": "positive_consume",
    "stepIndex": 14,
    "stepId": "upload",
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 2038,
    "job": "positive_consume",
    "stepIndex": 15,
    "stepId": "own_metadata",
    "field": "step.if",
    "kind": "implicit",
    "form": "E023"
  },
  {
    "line": 2040,
    "job": "positive_consume",
    "stepIndex": 15,
    "stepId": "own_metadata",
    "field": "env.OWN_ARTIFACT_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 2041,
    "job": "positive_consume",
    "stepIndex": 15,
    "stepId": "own_metadata",
    "field": "env.OWN_DIGEST",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 2042,
    "job": "positive_consume",
    "stepIndex": 15,
    "stepId": "own_metadata",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2043,
    "job": "positive_consume",
    "stepIndex": 15,
    "stepId": "own_metadata",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2053,
    "job": "positive_consume",
    "stepIndex": 16,
    "stepId": "own_open",
    "field": "step.if",
    "kind": "implicit",
    "form": "E039"
  },
  {
    "line": 2055,
    "job": "positive_consume",
    "stepIndex": 16,
    "stepId": "own_open",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2056,
    "job": "positive_consume",
    "stepIndex": 16,
    "stepId": "own_open",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2064,
    "job": "positive_consume",
    "stepIndex": 17,
    "stepId": "own_verified",
    "field": "step.if",
    "kind": "implicit",
    "form": "E040"
  },
  {
    "line": 2066,
    "job": "positive_consume",
    "stepIndex": 17,
    "stepId": "own_verified",
    "field": "env.OWN_ARTIFACT_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 2067,
    "job": "positive_consume",
    "stepIndex": 17,
    "stepId": "own_verified",
    "field": "env.OWN_DIGEST",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 2068,
    "job": "positive_consume",
    "stepIndex": 17,
    "stepId": "own_verified",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2084,
    "job": "positive_consume",
    "stepIndex": 18,
    "stepId": "actual_outcome",
    "field": "step.if",
    "kind": "implicit",
    "form": "E026"
  },
  {
    "line": 2088,
    "job": "positive_consume",
    "stepIndex": 18,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E041"
  },
  {
    "line": 2089,
    "job": "positive_consume",
    "stepIndex": 18,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E042"
  },
  {
    "line": 2091,
    "job": "reduction_prepare",
    "stepIndex": null,
    "stepId": null,
    "field": "job.if",
    "kind": "delimited",
    "form": "E002"
  },
  {
    "line": 2097,
    "job": "reduction_prepare",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-id",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 2098,
    "job": "reduction_prepare",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-digest",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 2099,
    "job": "reduction_prepare",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.kind",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2124,
    "job": "reduction_prepare",
    "stepIndex": 1,
    "stepId": null,
    "field": "with.ref",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 2164,
    "job": "reduction_prepare",
    "stepIndex": 5,
    "stepId": "custody",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2173,
    "job": "reduction_prepare",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.github-token",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2174,
    "job": "reduction_prepare",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.repository",
    "kind": "delimited",
    "form": "E017"
  },
  {
    "line": 2175,
    "job": "reduction_prepare",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.run-id",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 2176,
    "job": "reduction_prepare",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.artifact-ids",
    "kind": "delimited",
    "form": "E032"
  },
  {
    "line": 2177,
    "job": "reduction_prepare",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 2182,
    "job": "reduction_prepare",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_ID",
    "kind": "delimited",
    "form": "E032"
  },
  {
    "line": 2183,
    "job": "reduction_prepare",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_DIGEST",
    "kind": "delimited",
    "form": "E033"
  },
  {
    "line": 2184,
    "job": "reduction_prepare",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_MANIFEST_SHA",
    "kind": "delimited",
    "form": "E034"
  },
  {
    "line": 2185,
    "job": "reduction_prepare",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2215,
    "job": "reduction_prepare",
    "stepIndex": 9,
    "stepId": "seal_prepare",
    "field": "step.if",
    "kind": "implicit",
    "form": "E035"
  },
  {
    "line": 2217,
    "job": "reduction_prepare",
    "stepIndex": 9,
    "stepId": "seal_prepare",
    "field": "env.COMMAND_OK",
    "kind": "delimited",
    "form": "E036"
  },
  {
    "line": 2233,
    "job": "reduction_prepare",
    "stepIndex": 10,
    "stepId": "seal",
    "field": "step.if",
    "kind": "implicit",
    "form": "E037"
  },
  {
    "line": 2235,
    "job": "reduction_prepare",
    "stepIndex": 10,
    "stepId": "seal",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2246,
    "job": "reduction_prepare",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "step.if",
    "kind": "implicit",
    "form": "E038"
  },
  {
    "line": 2249,
    "job": "reduction_prepare",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 2249,
    "job": "reduction_prepare",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 2250,
    "job": "reduction_prepare",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 2255,
    "job": "reduction_prepare",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "step.if",
    "kind": "implicit",
    "form": "E023"
  },
  {
    "line": 2257,
    "job": "reduction_prepare",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "env.OWN_ARTIFACT_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 2258,
    "job": "reduction_prepare",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "env.OWN_DIGEST",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 2259,
    "job": "reduction_prepare",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2260,
    "job": "reduction_prepare",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2270,
    "job": "reduction_prepare",
    "stepIndex": 13,
    "stepId": "own_open",
    "field": "step.if",
    "kind": "implicit",
    "form": "E039"
  },
  {
    "line": 2272,
    "job": "reduction_prepare",
    "stepIndex": 13,
    "stepId": "own_open",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2273,
    "job": "reduction_prepare",
    "stepIndex": 13,
    "stepId": "own_open",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2281,
    "job": "reduction_prepare",
    "stepIndex": 14,
    "stepId": "own_verified",
    "field": "step.if",
    "kind": "implicit",
    "form": "E040"
  },
  {
    "line": 2283,
    "job": "reduction_prepare",
    "stepIndex": 14,
    "stepId": "own_verified",
    "field": "env.OWN_ARTIFACT_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 2284,
    "job": "reduction_prepare",
    "stepIndex": 14,
    "stepId": "own_verified",
    "field": "env.OWN_DIGEST",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 2285,
    "job": "reduction_prepare",
    "stepIndex": 14,
    "stepId": "own_verified",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2301,
    "job": "reduction_prepare",
    "stepIndex": 15,
    "stepId": "actual_outcome",
    "field": "step.if",
    "kind": "implicit",
    "form": "E026"
  },
  {
    "line": 2305,
    "job": "reduction_prepare",
    "stepIndex": 15,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E041"
  },
  {
    "line": 2306,
    "job": "reduction_prepare",
    "stepIndex": 15,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E042"
  },
  {
    "line": 2308,
    "job": "reduction_consume_a",
    "stepIndex": null,
    "stepId": null,
    "field": "job.if",
    "kind": "delimited",
    "form": "E002"
  },
  {
    "line": 2314,
    "job": "reduction_consume_a",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-id",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 2315,
    "job": "reduction_consume_a",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-digest",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 2316,
    "job": "reduction_consume_a",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.kind",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2341,
    "job": "reduction_consume_a",
    "stepIndex": 1,
    "stepId": null,
    "field": "with.ref",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 2381,
    "job": "reduction_consume_a",
    "stepIndex": 5,
    "stepId": "custody",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2390,
    "job": "reduction_consume_a",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.github-token",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2391,
    "job": "reduction_consume_a",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.repository",
    "kind": "delimited",
    "form": "E017"
  },
  {
    "line": 2392,
    "job": "reduction_consume_a",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.run-id",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 2393,
    "job": "reduction_consume_a",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.artifact-ids",
    "kind": "delimited",
    "form": "E032"
  },
  {
    "line": 2394,
    "job": "reduction_consume_a",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 2399,
    "job": "reduction_consume_a",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_ID",
    "kind": "delimited",
    "form": "E032"
  },
  {
    "line": 2400,
    "job": "reduction_consume_a",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_DIGEST",
    "kind": "delimited",
    "form": "E033"
  },
  {
    "line": 2401,
    "job": "reduction_consume_a",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_MANIFEST_SHA",
    "kind": "delimited",
    "form": "E034"
  },
  {
    "line": 2402,
    "job": "reduction_consume_a",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2424,
    "job": "reduction_consume_a",
    "stepIndex": 8,
    "stepId": "producer_metadata",
    "field": "env.PRODUCER_ID",
    "kind": "delimited",
    "form": "E046"
  },
  {
    "line": 2425,
    "job": "reduction_consume_a",
    "stepIndex": 8,
    "stepId": "producer_metadata",
    "field": "env.PRODUCER_DIGEST",
    "kind": "delimited",
    "form": "E047"
  },
  {
    "line": 2426,
    "job": "reduction_consume_a",
    "stepIndex": 8,
    "stepId": "producer_metadata",
    "field": "env.PRODUCER_KIND",
    "kind": "delimited",
    "form": "E048"
  },
  {
    "line": 2427,
    "job": "reduction_consume_a",
    "stepIndex": 8,
    "stepId": "producer_metadata",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2438,
    "job": "reduction_consume_a",
    "stepIndex": 9,
    "stepId": "producer_open",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2447,
    "job": "reduction_consume_a",
    "stepIndex": 10,
    "stepId": "producer_binding",
    "field": "env.PRODUCER_ID",
    "kind": "delimited",
    "form": "E046"
  },
  {
    "line": 2448,
    "job": "reduction_consume_a",
    "stepIndex": 10,
    "stepId": "producer_binding",
    "field": "env.PRODUCER_DIGEST",
    "kind": "delimited",
    "form": "E047"
  },
  {
    "line": 2449,
    "job": "reduction_consume_a",
    "stepIndex": 10,
    "stepId": "producer_binding",
    "field": "env.PRODUCER_KIND",
    "kind": "delimited",
    "form": "E048"
  },
  {
    "line": 2490,
    "job": "reduction_consume_a",
    "stepIndex": 12,
    "stepId": "seal_prepare",
    "field": "step.if",
    "kind": "implicit",
    "form": "E035"
  },
  {
    "line": 2492,
    "job": "reduction_consume_a",
    "stepIndex": 12,
    "stepId": "seal_prepare",
    "field": "env.COMMAND_OK",
    "kind": "delimited",
    "form": "E036"
  },
  {
    "line": 2508,
    "job": "reduction_consume_a",
    "stepIndex": 13,
    "stepId": "seal",
    "field": "step.if",
    "kind": "implicit",
    "form": "E037"
  },
  {
    "line": 2510,
    "job": "reduction_consume_a",
    "stepIndex": 13,
    "stepId": "seal",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2521,
    "job": "reduction_consume_a",
    "stepIndex": 14,
    "stepId": "upload",
    "field": "step.if",
    "kind": "implicit",
    "form": "E038"
  },
  {
    "line": 2524,
    "job": "reduction_consume_a",
    "stepIndex": 14,
    "stepId": "upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 2524,
    "job": "reduction_consume_a",
    "stepIndex": 14,
    "stepId": "upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 2525,
    "job": "reduction_consume_a",
    "stepIndex": 14,
    "stepId": "upload",
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 2530,
    "job": "reduction_consume_a",
    "stepIndex": 15,
    "stepId": "own_metadata",
    "field": "step.if",
    "kind": "implicit",
    "form": "E023"
  },
  {
    "line": 2532,
    "job": "reduction_consume_a",
    "stepIndex": 15,
    "stepId": "own_metadata",
    "field": "env.OWN_ARTIFACT_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 2533,
    "job": "reduction_consume_a",
    "stepIndex": 15,
    "stepId": "own_metadata",
    "field": "env.OWN_DIGEST",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 2534,
    "job": "reduction_consume_a",
    "stepIndex": 15,
    "stepId": "own_metadata",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2535,
    "job": "reduction_consume_a",
    "stepIndex": 15,
    "stepId": "own_metadata",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2545,
    "job": "reduction_consume_a",
    "stepIndex": 16,
    "stepId": "own_open",
    "field": "step.if",
    "kind": "implicit",
    "form": "E039"
  },
  {
    "line": 2547,
    "job": "reduction_consume_a",
    "stepIndex": 16,
    "stepId": "own_open",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2548,
    "job": "reduction_consume_a",
    "stepIndex": 16,
    "stepId": "own_open",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2556,
    "job": "reduction_consume_a",
    "stepIndex": 17,
    "stepId": "own_verified",
    "field": "step.if",
    "kind": "implicit",
    "form": "E040"
  },
  {
    "line": 2558,
    "job": "reduction_consume_a",
    "stepIndex": 17,
    "stepId": "own_verified",
    "field": "env.OWN_ARTIFACT_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 2559,
    "job": "reduction_consume_a",
    "stepIndex": 17,
    "stepId": "own_verified",
    "field": "env.OWN_DIGEST",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 2560,
    "job": "reduction_consume_a",
    "stepIndex": 17,
    "stepId": "own_verified",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2576,
    "job": "reduction_consume_a",
    "stepIndex": 18,
    "stepId": "actual_outcome",
    "field": "step.if",
    "kind": "implicit",
    "form": "E026"
  },
  {
    "line": 2580,
    "job": "reduction_consume_a",
    "stepIndex": 18,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E041"
  },
  {
    "line": 2581,
    "job": "reduction_consume_a",
    "stepIndex": 18,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E042"
  },
  {
    "line": 2583,
    "job": "readonly",
    "stepIndex": null,
    "stepId": null,
    "field": "job.if",
    "kind": "delimited",
    "form": "E002"
  },
  {
    "line": 2589,
    "job": "readonly",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-id",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 2590,
    "job": "readonly",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-digest",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 2591,
    "job": "readonly",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.kind",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2616,
    "job": "readonly",
    "stepIndex": 1,
    "stepId": null,
    "field": "with.ref",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 2656,
    "job": "readonly",
    "stepIndex": 5,
    "stepId": "custody",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2665,
    "job": "readonly",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.github-token",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2666,
    "job": "readonly",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.repository",
    "kind": "delimited",
    "form": "E017"
  },
  {
    "line": 2667,
    "job": "readonly",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.run-id",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 2668,
    "job": "readonly",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.artifact-ids",
    "kind": "delimited",
    "form": "E032"
  },
  {
    "line": 2669,
    "job": "readonly",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 2674,
    "job": "readonly",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_ID",
    "kind": "delimited",
    "form": "E032"
  },
  {
    "line": 2675,
    "job": "readonly",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_DIGEST",
    "kind": "delimited",
    "form": "E033"
  },
  {
    "line": 2676,
    "job": "readonly",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_MANIFEST_SHA",
    "kind": "delimited",
    "form": "E034"
  },
  {
    "line": 2677,
    "job": "readonly",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2713,
    "job": "readonly",
    "stepIndex": 9,
    "stepId": "seal_prepare",
    "field": "step.if",
    "kind": "implicit",
    "form": "E035"
  },
  {
    "line": 2715,
    "job": "readonly",
    "stepIndex": 9,
    "stepId": "seal_prepare",
    "field": "env.COMMAND_OK",
    "kind": "delimited",
    "form": "E036"
  },
  {
    "line": 2731,
    "job": "readonly",
    "stepIndex": 10,
    "stepId": "seal",
    "field": "step.if",
    "kind": "implicit",
    "form": "E037"
  },
  {
    "line": 2733,
    "job": "readonly",
    "stepIndex": 10,
    "stepId": "seal",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2744,
    "job": "readonly",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "step.if",
    "kind": "implicit",
    "form": "E038"
  },
  {
    "line": 2747,
    "job": "readonly",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 2747,
    "job": "readonly",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 2748,
    "job": "readonly",
    "stepIndex": 11,
    "stepId": "upload",
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 2753,
    "job": "readonly",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "step.if",
    "kind": "implicit",
    "form": "E023"
  },
  {
    "line": 2755,
    "job": "readonly",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "env.OWN_ARTIFACT_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 2756,
    "job": "readonly",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "env.OWN_DIGEST",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 2757,
    "job": "readonly",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2758,
    "job": "readonly",
    "stepIndex": 12,
    "stepId": "own_metadata",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2768,
    "job": "readonly",
    "stepIndex": 13,
    "stepId": "own_open",
    "field": "step.if",
    "kind": "implicit",
    "form": "E039"
  },
  {
    "line": 2770,
    "job": "readonly",
    "stepIndex": 13,
    "stepId": "own_open",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2771,
    "job": "readonly",
    "stepIndex": 13,
    "stepId": "own_open",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2779,
    "job": "readonly",
    "stepIndex": 14,
    "stepId": "own_verified",
    "field": "step.if",
    "kind": "implicit",
    "form": "E040"
  },
  {
    "line": 2781,
    "job": "readonly",
    "stepIndex": 14,
    "stepId": "own_verified",
    "field": "env.OWN_ARTIFACT_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 2782,
    "job": "readonly",
    "stepIndex": 14,
    "stepId": "own_verified",
    "field": "env.OWN_DIGEST",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 2783,
    "job": "readonly",
    "stepIndex": 14,
    "stepId": "own_verified",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2799,
    "job": "readonly",
    "stepIndex": 15,
    "stepId": "actual_outcome",
    "field": "step.if",
    "kind": "implicit",
    "form": "E026"
  },
  {
    "line": 2803,
    "job": "readonly",
    "stepIndex": 15,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E041"
  },
  {
    "line": 2804,
    "job": "readonly",
    "stepIndex": 15,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E042"
  },
  {
    "line": 2806,
    "job": "reduction_consume_b",
    "stepIndex": null,
    "stepId": null,
    "field": "job.if",
    "kind": "delimited",
    "form": "E002"
  },
  {
    "line": 2812,
    "job": "reduction_consume_b",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-id",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 2813,
    "job": "reduction_consume_b",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.artifact-digest",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 2814,
    "job": "reduction_consume_b",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.kind",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 2815,
    "job": "reduction_consume_b",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.safe-id",
    "kind": "delimited",
    "form": "E049"
  },
  {
    "line": 2816,
    "job": "reduction_consume_b",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.safe-digest",
    "kind": "delimited",
    "form": "E050"
  },
  {
    "line": 2841,
    "job": "reduction_consume_b",
    "stepIndex": 1,
    "stepId": null,
    "field": "with.ref",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 2881,
    "job": "reduction_consume_b",
    "stepIndex": 5,
    "stepId": "custody",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2890,
    "job": "reduction_consume_b",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.github-token",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2891,
    "job": "reduction_consume_b",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.repository",
    "kind": "delimited",
    "form": "E017"
  },
  {
    "line": 2892,
    "job": "reduction_consume_b",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.run-id",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 2893,
    "job": "reduction_consume_b",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.artifact-ids",
    "kind": "delimited",
    "form": "E032"
  },
  {
    "line": 2894,
    "job": "reduction_consume_b",
    "stepIndex": 6,
    "stepId": null,
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 2899,
    "job": "reduction_consume_b",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_ID",
    "kind": "delimited",
    "form": "E032"
  },
  {
    "line": 2900,
    "job": "reduction_consume_b",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_DIGEST",
    "kind": "delimited",
    "form": "E033"
  },
  {
    "line": 2901,
    "job": "reduction_consume_b",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.PURE_MANIFEST_SHA",
    "kind": "delimited",
    "form": "E034"
  },
  {
    "line": 2902,
    "job": "reduction_consume_b",
    "stepIndex": 7,
    "stepId": "pure_binding",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2924,
    "job": "reduction_consume_b",
    "stepIndex": 8,
    "stepId": "producer_metadata",
    "field": "env.PRODUCER_ID",
    "kind": "delimited",
    "form": "E046"
  },
  {
    "line": 2925,
    "job": "reduction_consume_b",
    "stepIndex": 8,
    "stepId": "producer_metadata",
    "field": "env.PRODUCER_DIGEST",
    "kind": "delimited",
    "form": "E047"
  },
  {
    "line": 2926,
    "job": "reduction_consume_b",
    "stepIndex": 8,
    "stepId": "producer_metadata",
    "field": "env.PRODUCER_KIND",
    "kind": "delimited",
    "form": "E048"
  },
  {
    "line": 2927,
    "job": "reduction_consume_b",
    "stepIndex": 8,
    "stepId": "producer_metadata",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 2938,
    "job": "reduction_consume_b",
    "stepIndex": 9,
    "stepId": "producer_open",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 2947,
    "job": "reduction_consume_b",
    "stepIndex": 10,
    "stepId": "producer_binding",
    "field": "env.PRODUCER_ID",
    "kind": "delimited",
    "form": "E046"
  },
  {
    "line": 2948,
    "job": "reduction_consume_b",
    "stepIndex": 10,
    "stepId": "producer_binding",
    "field": "env.PRODUCER_DIGEST",
    "kind": "delimited",
    "form": "E047"
  },
  {
    "line": 2949,
    "job": "reduction_consume_b",
    "stepIndex": 10,
    "stepId": "producer_binding",
    "field": "env.PRODUCER_KIND",
    "kind": "delimited",
    "form": "E048"
  },
  {
    "line": 2990,
    "job": "reduction_consume_b",
    "stepIndex": 12,
    "stepId": "peer_download",
    "field": "step.if",
    "kind": "implicit",
    "form": "E036"
  },
  {
    "line": 2992,
    "job": "reduction_consume_b",
    "stepIndex": 12,
    "stepId": "peer_download",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 3042,
    "job": "reduction_consume_b",
    "stepIndex": 13,
    "stepId": "peer_open_positive_prepare",
    "field": "step.if",
    "kind": "implicit",
    "form": "E051"
  },
  {
    "line": 3044,
    "job": "reduction_consume_b",
    "stepIndex": 13,
    "stepId": "peer_open_positive_prepare",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 3052,
    "job": "reduction_consume_b",
    "stepIndex": 14,
    "stepId": "peer_open_positive_consume",
    "field": "step.if",
    "kind": "implicit",
    "form": "E051"
  },
  {
    "line": 3054,
    "job": "reduction_consume_b",
    "stepIndex": 14,
    "stepId": "peer_open_positive_consume",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 3062,
    "job": "reduction_consume_b",
    "stepIndex": 15,
    "stepId": "peer_open_reduction_prepare",
    "field": "step.if",
    "kind": "implicit",
    "form": "E051"
  },
  {
    "line": 3064,
    "job": "reduction_consume_b",
    "stepIndex": 15,
    "stepId": "peer_open_reduction_prepare",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 3072,
    "job": "reduction_consume_b",
    "stepIndex": 16,
    "stepId": "peer_open_reduction_consume_a",
    "field": "step.if",
    "kind": "implicit",
    "form": "E051"
  },
  {
    "line": 3074,
    "job": "reduction_consume_b",
    "stepIndex": 16,
    "stepId": "peer_open_reduction_consume_a",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 3082,
    "job": "reduction_consume_b",
    "stepIndex": 17,
    "stepId": "peer_open_readonly",
    "field": "step.if",
    "kind": "implicit",
    "form": "E051"
  },
  {
    "line": 3084,
    "job": "reduction_consume_b",
    "stepIndex": 17,
    "stepId": "peer_open_readonly",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 3092,
    "job": "reduction_consume_b",
    "stepIndex": 18,
    "stepId": "aggregate",
    "field": "step.if",
    "kind": "implicit",
    "form": "E052"
  },
  {
    "line": 3097,
    "job": "reduction_consume_b",
    "stepIndex": 18,
    "stepId": "aggregate",
    "field": "run",
    "kind": "delimited",
    "form": "E053"
  },
  {
    "line": 3098,
    "job": "reduction_consume_b",
    "stepIndex": 18,
    "stepId": "aggregate",
    "field": "run",
    "kind": "delimited",
    "form": "E054"
  },
  {
    "line": 3099,
    "job": "reduction_consume_b",
    "stepIndex": 18,
    "stepId": "aggregate",
    "field": "run",
    "kind": "delimited",
    "form": "E055"
  },
  {
    "line": 3100,
    "job": "reduction_consume_b",
    "stepIndex": 18,
    "stepId": "aggregate",
    "field": "run",
    "kind": "delimited",
    "form": "E056"
  },
  {
    "line": 3101,
    "job": "reduction_consume_b",
    "stepIndex": 18,
    "stepId": "aggregate",
    "field": "run",
    "kind": "delimited",
    "form": "E057"
  },
  {
    "line": 3102,
    "job": "reduction_consume_b",
    "stepIndex": 18,
    "stepId": "aggregate",
    "field": "run",
    "kind": "delimited",
    "form": "E058"
  },
  {
    "line": 3150,
    "job": "reduction_consume_b",
    "stepIndex": 19,
    "stepId": "seal_prepare",
    "field": "step.if",
    "kind": "implicit",
    "form": "E035"
  },
  {
    "line": 3152,
    "job": "reduction_consume_b",
    "stepIndex": 19,
    "stepId": "seal_prepare",
    "field": "env.COMMAND_OK",
    "kind": "delimited",
    "form": "E059"
  },
  {
    "line": 3168,
    "job": "reduction_consume_b",
    "stepIndex": 20,
    "stepId": "seal",
    "field": "step.if",
    "kind": "implicit",
    "form": "E037"
  },
  {
    "line": 3170,
    "job": "reduction_consume_b",
    "stepIndex": 20,
    "stepId": "seal",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 3181,
    "job": "reduction_consume_b",
    "stepIndex": 21,
    "stepId": "upload",
    "field": "step.if",
    "kind": "implicit",
    "form": "E038"
  },
  {
    "line": 3184,
    "job": "reduction_consume_b",
    "stepIndex": 21,
    "stepId": "upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 3184,
    "job": "reduction_consume_b",
    "stepIndex": 21,
    "stepId": "upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 3185,
    "job": "reduction_consume_b",
    "stepIndex": 21,
    "stepId": "upload",
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 3190,
    "job": "reduction_consume_b",
    "stepIndex": 22,
    "stepId": "own_metadata",
    "field": "step.if",
    "kind": "implicit",
    "form": "E023"
  },
  {
    "line": 3192,
    "job": "reduction_consume_b",
    "stepIndex": 22,
    "stepId": "own_metadata",
    "field": "env.OWN_ARTIFACT_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 3193,
    "job": "reduction_consume_b",
    "stepIndex": 22,
    "stepId": "own_metadata",
    "field": "env.OWN_DIGEST",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 3194,
    "job": "reduction_consume_b",
    "stepIndex": 22,
    "stepId": "own_metadata",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 3195,
    "job": "reduction_consume_b",
    "stepIndex": 22,
    "stepId": "own_metadata",
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 3205,
    "job": "reduction_consume_b",
    "stepIndex": 23,
    "stepId": "own_open",
    "field": "step.if",
    "kind": "implicit",
    "form": "E039"
  },
  {
    "line": 3207,
    "job": "reduction_consume_b",
    "stepIndex": 23,
    "stepId": "own_open",
    "field": "env.AFW_SYN_CHECKPOINT_KEY",
    "kind": "delimited",
    "form": "E031"
  },
  {
    "line": 3208,
    "job": "reduction_consume_b",
    "stepIndex": 23,
    "stepId": "own_open",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 3216,
    "job": "reduction_consume_b",
    "stepIndex": 24,
    "stepId": "own_verified",
    "field": "step.if",
    "kind": "implicit",
    "form": "E040"
  },
  {
    "line": 3218,
    "job": "reduction_consume_b",
    "stepIndex": 24,
    "stepId": "own_verified",
    "field": "env.OWN_ARTIFACT_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 3219,
    "job": "reduction_consume_b",
    "stepIndex": 24,
    "stepId": "own_verified",
    "field": "env.OWN_DIGEST",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 3220,
    "job": "reduction_consume_b",
    "stepIndex": 24,
    "stepId": "own_verified",
    "field": "env.OWN_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 3237,
    "job": "reduction_consume_b",
    "stepIndex": 25,
    "stepId": "summary_pair",
    "field": "step.if",
    "kind": "implicit",
    "form": "E060"
  },
  {
    "line": 3239,
    "job": "reduction_consume_b",
    "stepIndex": 25,
    "stepId": "summary_pair",
    "field": "env.PURE_BINDING_OUTCOME",
    "kind": "delimited",
    "form": "E061"
  },
  {
    "line": 3240,
    "job": "reduction_consume_b",
    "stepIndex": 25,
    "stepId": "summary_pair",
    "field": "env.NATIVE_OUTCOME",
    "kind": "delimited",
    "form": "E041"
  },
  {
    "line": 3241,
    "job": "reduction_consume_b",
    "stepIndex": 25,
    "stepId": "summary_pair",
    "field": "env.AGGREGATE_OUTCOME",
    "kind": "delimited",
    "form": "E062"
  },
  {
    "line": 3242,
    "job": "reduction_consume_b",
    "stepIndex": 25,
    "stepId": "summary_pair",
    "field": "env.OWN_METADATA_OUTCOME",
    "kind": "delimited",
    "form": "E063"
  },
  {
    "line": 3243,
    "job": "reduction_consume_b",
    "stepIndex": 25,
    "stepId": "summary_pair",
    "field": "env.OWN_OPEN_OUTCOME",
    "kind": "delimited",
    "form": "E064"
  },
  {
    "line": 3244,
    "job": "reduction_consume_b",
    "stepIndex": 25,
    "stepId": "summary_pair",
    "field": "env.OWN_VERIFIED_OUTCOME",
    "kind": "delimited",
    "form": "E042"
  },
  {
    "line": 3245,
    "job": "reduction_consume_b",
    "stepIndex": 25,
    "stepId": "summary_pair",
    "field": "env.NATIVE_ID",
    "kind": "delimited",
    "form": "E003"
  },
  {
    "line": 3246,
    "job": "reduction_consume_b",
    "stepIndex": 25,
    "stepId": "summary_pair",
    "field": "env.NATIVE_DIGEST",
    "kind": "delimited",
    "form": "E004"
  },
  {
    "line": 3247,
    "job": "reduction_consume_b",
    "stepIndex": 25,
    "stepId": "summary_pair",
    "field": "env.NATIVE_KIND",
    "kind": "delimited",
    "form": "E030"
  },
  {
    "line": 3264,
    "job": "reduction_consume_b",
    "stepIndex": 26,
    "stepId": "summary_upload",
    "field": "step.if",
    "kind": "implicit",
    "form": "E065"
  },
  {
    "line": 3267,
    "job": "reduction_consume_b",
    "stepIndex": 26,
    "stepId": "summary_upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 3268,
    "job": "reduction_consume_b",
    "stepIndex": 26,
    "stepId": "summary_upload",
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 3273,
    "job": "reduction_consume_b",
    "stepIndex": 27,
    "stepId": "actual_outcome",
    "field": "step.if",
    "kind": "implicit",
    "form": "E026"
  },
  {
    "line": 3277,
    "job": "reduction_consume_b",
    "stepIndex": 27,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E041"
  },
  {
    "line": 3278,
    "job": "reduction_consume_b",
    "stepIndex": 27,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E062"
  },
  {
    "line": 3279,
    "job": "reduction_consume_b",
    "stepIndex": 27,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E042"
  },
  {
    "line": 3280,
    "job": "reduction_consume_b",
    "stepIndex": 27,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E066"
  },
  {
    "line": 3281,
    "job": "reduction_consume_b",
    "stepIndex": 27,
    "stepId": "actual_outcome",
    "field": "run",
    "kind": "delimited",
    "form": "E067"
  },
  {
    "line": 3283,
    "job": "verify",
    "stepIndex": null,
    "stepId": null,
    "field": "job.if",
    "kind": "delimited",
    "form": "E068"
  },
  {
    "line": 3291,
    "job": "verify",
    "stepIndex": 0,
    "stepId": null,
    "field": "with.ref",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 3319,
    "job": "verify",
    "stepIndex": 3,
    "stepId": null,
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 3320,
    "job": "verify",
    "stepIndex": 3,
    "stepId": null,
    "field": "env.AFW_SUITE_NEEDS",
    "kind": "delimited",
    "form": "E069"
  },
  {
    "line": 3328,
    "job": "keyless_controls",
    "stepIndex": null,
    "stepId": null,
    "field": "job.if",
    "kind": "delimited",
    "form": "E070"
  },
  {
    "line": 3332,
    "job": "keyless_controls",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.safe-id",
    "kind": "delimited",
    "form": "E049"
  },
  {
    "line": 3333,
    "job": "keyless_controls",
    "stepIndex": null,
    "stepId": null,
    "field": "outputs.safe-digest",
    "kind": "delimited",
    "form": "E050"
  },
  {
    "line": 3338,
    "job": "keyless_controls",
    "stepIndex": 0,
    "stepId": null,
    "field": "with.ref",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 3384,
    "job": "keyless_controls",
    "stepIndex": 5,
    "stepId": "pair_written",
    "field": "step.if",
    "kind": "implicit",
    "form": "E060"
  },
  {
    "line": 3394,
    "job": "keyless_controls",
    "stepIndex": 6,
    "stepId": "summary_upload",
    "field": "step.if",
    "kind": "implicit",
    "form": "E071"
  },
  {
    "line": 3397,
    "job": "keyless_controls",
    "stepIndex": 6,
    "stepId": "summary_upload",
    "field": "with.name",
    "kind": "delimited",
    "form": "E018"
  },
  {
    "line": 3398,
    "job": "keyless_controls",
    "stepIndex": 6,
    "stepId": "summary_upload",
    "field": "with.path",
    "kind": "delimited",
    "form": "E014"
  },
  {
    "line": 3402,
    "job": "keyless_controls",
    "stepIndex": 7,
    "stepId": null,
    "field": "step.if",
    "kind": "implicit",
    "form": "E026"
  },
  {
    "line": 3405,
    "job": "keyless_controls",
    "stepIndex": 7,
    "stepId": null,
    "field": "run",
    "kind": "delimited",
    "form": "E011"
  },
  {
    "line": 3406,
    "job": "keyless_controls",
    "stepIndex": 7,
    "stepId": null,
    "field": "run",
    "kind": "delimited",
    "form": "E072"
  },
  {
    "line": 3407,
    "job": "keyless_controls",
    "stepIndex": 7,
    "stepId": null,
    "field": "run",
    "kind": "delimited",
    "form": "E067"
  },
  {
    "line": 3409,
    "job": "keyless_verify",
    "stepIndex": null,
    "stepId": null,
    "field": "job.if",
    "kind": "delimited",
    "form": "E073"
  },
  {
    "line": 3417,
    "job": "keyless_verify",
    "stepIndex": 0,
    "stepId": null,
    "field": "with.ref",
    "kind": "delimited",
    "form": "E001"
  },
  {
    "line": 3445,
    "job": "keyless_verify",
    "stepIndex": 3,
    "stepId": null,
    "field": "env.GH_ARTIFACT_TOKEN",
    "kind": "delimited",
    "form": "E016"
  },
  {
    "line": 3446,
    "job": "keyless_verify",
    "stepIndex": 3,
    "stepId": null,
    "field": "env.AFW_SUITE_NEEDS",
    "kind": "delimited",
    "form": "E069"
  }
]
```

## Whole pipeline projection

All ten top-level guards begin literally false &&. The original eight are disabled; the only future keyless executed pair would be keyless_controls / keyless_verify after separate Root overlay/run release. No actual AFW environment/key binding exists on those two jobs. The preserved helper carrier shell if false remains disabled.

```json
[
  {
    "job": "contracts",
    "guard": "${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}",
    "needs": null,
    "timeout": 2,
    "environment": null,
    "secretBindings": 0
  },
  {
    "job": "positive_prepare",
    "guard": "${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}",
    "needs": "[contracts]",
    "timeout": 15,
    "environment": "afw-finite-syn-checkpoint",
    "secretBindings": 3
  },
  {
    "job": "positive_consume",
    "guard": "${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}",
    "needs": "[contracts, positive_prepare]",
    "timeout": 15,
    "environment": "afw-finite-syn-checkpoint",
    "secretBindings": 4
  },
  {
    "job": "reduction_prepare",
    "guard": "${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}",
    "needs": "[contracts]",
    "timeout": 15,
    "environment": "afw-finite-syn-checkpoint",
    "secretBindings": 3
  },
  {
    "job": "reduction_consume_a",
    "guard": "${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}",
    "needs": "[contracts, reduction_prepare]",
    "timeout": 15,
    "environment": "afw-finite-syn-checkpoint",
    "secretBindings": 4
  },
  {
    "job": "readonly",
    "guard": "${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}",
    "needs": "[contracts]",
    "timeout": 7,
    "environment": "afw-finite-syn-checkpoint",
    "secretBindings": 3
  },
  {
    "job": "reduction_consume_b",
    "guard": "${{ false && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}",
    "needs": "[contracts, readonly, reduction_prepare]",
    "timeout": 15,
    "environment": "afw-finite-syn-checkpoint",
    "secretBindings": 9
  },
  {
    "job": "verify",
    "guard": "${{ false && always() && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}",
    "needs": "[contracts, positive_prepare, positive_consume, reduction_prepare, reduction_consume_a, readonly, reduction_consume_b]",
    "timeout": 2,
    "environment": null,
    "secretBindings": 0
  },
  {
    "job": "keyless_controls",
    "guard": "${{ false && github.event_name == 'push' && github.event.head_commit.message == 'AFW DECODED KEY SCOPE QUALIFICATION HELD' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}",
    "needs": null,
    "timeout": 7,
    "environment": null,
    "secretBindings": 0
  },
  {
    "job": "keyless_verify",
    "guard": "${{ false && always() && github.event_name == 'push' && github.event.head_commit.message == 'AFW DECODED KEY SCOPE QUALIFICATION HELD' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}",
    "needs": "[keyless_controls]",
    "timeout": 2,
    "environment": null,
    "secretBindings": 0
  }
]
```

The contracts key_scope_precheck is a mandatory keyless step immediately after the existing locked install and before pure/SYN orchestration. It has no if, continue-on-error, env or environment; its complete decoded script is required exactly and imports the Source-bound adapter to call validateKeyScopes on the actual F7. Its absence, relocation or bypass is covered by Source-control assertions. Since contracts is disabled in the future KEYLESS variant, Source/control inspection proves this wiring; observed execution of the actual contracts hook is not claimed and awaits a separately released Native variant.

The qualifier installs with the existing npm ci --ignore-scripts --no-audit --no-fund before importing/calling the control parser. The independent verifier installs no parser. runControls reads the actual current F7 and requires validateKeyScopes(... ) === true before constructing/counting any negative family, including dag_peer_inventory; it then emits one bounded parser line. keyScopeParserProvenance revalidates that same Source and checks its exact Git workflowBlob before producing:

`AFW_KEY_SCOPE_PARSER/1` followed by exactly version,lockBlob,checkoutResolved,positiveSourceValidated,source,workflowBlob. Version=2.9.0; lockBlob=36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b; both booleans=true; source/workflowBlob=current context lowerhex40; <=1024 bytes; no paths/URLs/errors. This line has NOT been emitted by an actual candidate run in preparation.

## Assertions written, not run

New actual-validator mutations cover quoted closer plus hidden unquoted secret, doubled quotes, YAML escaped keys/values, mapping-key expressions, implicit and folded if, unknown conditions, secret case/bracket/wrappers, AFW env indexing, outer workflow/job/step env aliases, nonplain canonical slots, duplicate IDs/keys, aliases/anchors/merge, tags, directives (including default TAG override), multiple documents, complex/non-string keys, malformed syntax, non-string step names/run fields, non-string API inputs, input/node/depth bounds, and absent/relocated/bypassed precheck. All mutants retain the valid surrounding reviewed workflow and meaningful secret mutants retain the original26 slots. Opener fixtures are assembled at runtime so no extra real workflow secret binding is introduced.

Hosted-only loader controls copy inert package/lock fixtures into RUNNER_TEMP and invoke the actual qualified adapter in a fresh child for absent parser, wrong version, symlink/temp-resolved library and unexpected API. The current Source positive and provenance must succeed before these negatives count. No loader control ran during preparation.

All prior assertions remain; no subcase or receiver ID was invented or marked passed. NOT RUN: npm ci, yaml parse/validator call, node --check, bash -n, lint, test suite, keyless controls, independent receiver or Native.

## Protected tree, prefix and recoverability

At 2026-11-13 15:50:37 UTC the candidate commit, complete tree and full F7 were read back from GitHub. Source readback is byte-exact to the staged text; tree is untruncated and has3196 leaves /62 workflows. The sole type-mode-blob delta from BASE is F7 (100644/blob). All other3195 leaves, including the full report, remain exact. Commit has the single BASE parent and the declared tree. Source ref is still72c108; main remains0c9c475b3ebaa970fc11d628b40e50a90cceb727. Five active status collections (in_progress/queued/waiting/requested/pending) each returned0; no candidate ref event occurred.

Original F7 remains recoverable at BASE: blob f7a71f1a0fa4f5ddf069ff411f008a098455e5cc,126209 bytes,SHA2561e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a.

The complete existing report prefix remains blob ac1b323410baa2319ada28c32b4a153e8fddd21c,224620 characters/224684 UTF-8 bytes,SHA25675e775709e5dd61087622b19f122fcac4eb6d5f038a606d2845d1b63c75b3e75. No append or rewrite was performed by this worker; eventual Source closure must restore exact F7 and append that SAME report after any separately authorized run.

Protected five leaves:

```json
[
  {
    "path": "package-lock.json",
    "mode": "100644",
    "type": "blob",
    "sha": "36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b",
    "size": 445991
  },
  {
    "path": "test/finite-budget-diagnostics.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8",
    "size": 63691
  },
  {
    "path": "test/fixtures/finite-budget-world.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b",
    "size": 242987
  },
  {
    "path": "test/fixtures/finite-checkpoint-custody.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "4d05b5ec0f7b074be88ef9733a47c984b0212351",
    "size": 21159
  },
  {
    "path": "test/mcp-qa-finite-budget-native.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "533dafb5df5f8e57442c5b9029dc8dec6dded434",
    "size": 12749
  }
]
```

Complete readback proof:

```json
{
  "time": "2026-11-13 15:50:37 UTC",
  "tree": "31c6da3e51f4fd4425c303ae1ace6b3df68e3071",
  "leaves": 3196,
  "workflowCount": 62,
  "truncated": false,
  "changes": [
    {
      "path": ".github/workflows/afw-finite-budget-qualification.yml",
      "before": {
        "mode": "100644",
        "type": "blob",
        "sha": "f7a71f1a0fa4f5ddf069ff411f008a098455e5cc"
      },
      "after": {
        "mode": "100644",
        "type": "blob",
        "sha": "bf74dae9ff69157cf7dc76cd079e40e77089fcde"
      }
    }
  ],
  "sourceExact": true,
  "SourceRef": "72c10833654aa7226d8376e95d767455e1c144b2",
  "mainRef": "0c9c475b3ebaa970fc11d628b40e50a90cceb727",
  "commitTree": "31c6da3e51f4fd4425c303ae1ace6b3df68e3071",
  "commitParents": [
    "72c10833654aa7226d8376e95d767455e1c144b2"
  ],
  "active": [
    {
      "status": "in_progress",
      "total": 0
    },
    {
      "status": "queued",
      "total": 0
    },
    {
      "status": "waiting",
      "total": 0
    },
    {
      "status": "requested",
      "total": 0
    },
    {
      "status": "pending",
      "total": 0
    }
  ],
  "report": {
    "path": "docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md",
    "mode": "100644",
    "type": "blob",
    "sha": "ac1b323410baa2319ada28c32b4a153e8fddd21c",
    "size": 224684,
    "url": "https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/git/blobs/ac1b323410baa2319ada28c32b4a153e8fddd21c"
  }
}
```

## Self-review and remaining gate

Completeness/scope review found and repaired, before handoff, non-string name/run states in non-key steps; their assertions were written before their checks. Reverse seed projection, untouched Verifier/SafeZIP bytes, exact32 subcase IDs, sole-F7 tree delta and current ten literal-false guards were checked passively. No runtime correctness or executed acceptance is claimed.

Root must independently review complete candidate/body/delta, fixed registry, current Source projection and zero-executed-key conditions. All later attachment/qualification/activation/readback/restoration phases remain separately held. Do not activate by reading this report. STOP_FOR_ROOT_GATE.


## EOF-only correction / Root initial inactive gate

Superseding INACTIVE UNATTACHED candidate:291c32f18aa7e3965cceab88703e3153a9c8e198/treeaf0d1b99a8d71c2e6ad75c8d51c28f4f81574613/F7539ebe02e180ba02e7c293486c573947f08230e8/355373B/SHA8a81a3a6de292b5bd4891320aea90d2c6ba4fbb9769595a11157b9448fe6de4c. Sole change from ab4d F7 is one terminal LF; allfour bodies/registry/inventory line identities unchanged. Source ref unchanged72c. Root detected Important PREP-I1 missing imports for realpathSync/readFileSync/createRequire/sep in adapter; positive cannot work until repaired. Gate BLOCKED, no run authorized. Tests remain NOT RUN.


## PREP-I1 import-only correction — current inactive candidate

Current candidateb2d40d2c72cd6c29e8d0ba3d87306eac78587b1b/tree58db7a19640442ea2e42cf511134915df58c6658/F7ef92e822d5f981575a19cc8b4cf01584df03fab8,355491B,SHA0b446c724d6c2011c6e1111b7296632cafad937ee604e22d97a565b7e9ddfe60; sole parentBASE72c108. Only missing builtin imports added relative291c, finalLF retained; other bodies/controlassertions/26slots/registryidentities/tenfalseguards exact. Adapter61225B/ad4c08de403c02b10140245c46143b2fd83872aa44401e877a369a6a1485dea6; controls58832B/3627dafe53c6b1c6d930cc8c6f747e5d9678ecc54438e6ae03213ee1f7f44ece; unchangedverifier15099B/94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf andSafeZIP13305B/b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d. Root independently recomputedfullSourceSHA256/Gitblob/all4bodyhashes inRAM and readfullimportdelta; noSourceexecute. Completecurrenttree3196/onlyF7delta/reportprefixandallother3195leavesexact. All32subcaseIDs preserved. PREP-I1 addressedbyinspectionONLY; coveringcloudrun andscopedreview remainpending. No currentSourcepositive orqualification claimed.


## R1 actual run and Root closure

{
  "run": 43459300386,
  "source": "afed5ff612fc8618962f8b372ad054672175077e",
  "attempt": 1,
  "conclusion": "failure",
  "all10Terminal": true,
  "old8Skipped": true,
  "actualPositiveAndProvenanceVerified": true,
  "completedFamilies": 2,
  "passedFamilies": 1,
  "failedFamily": "key_scope",
  "subcasesPassed": 5,
  "subcasesFailed": 1,
  "subcasesNotExecuted": 26,
  "failingSubcase": "secret_run_and_ambiguous_context_references_rejected",
  "receiverControlsPassed": 16,
  "currentSAFEIndependentStrictVerified": true,
  "artifact": {
    "id": 14056095996,
    "zipBytes": 1402,
    "sha256": "b02fce117243a4bdac3057ba19015416d207bbfb5096db2473ea27c8608cd0e8"
  },
  "accepted": false,
  "operationalReadiness": false,
  "PCoff": false
}

{
  "source": "c0c65836a677b23949624bc9afc14f4c59012a62",
  "tree": "7b8922952555441abf96e8fe83f94c30e4de7f19",
  "prior3195LeavesExact": true,
  "leaves": 3196,
  "soleNewReport": "docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md",
  "reportSha": "7096ec150ea9a4285930d96da85224b4f62b1e61",
  "reportChars": 234732,
  "F7exact": true,
  "mainUnchanged": true,
  "runId": "43459300386",
  "runSource": "afed5ff612fc8618962f8b372ad054672175077e",
  "runCompleted": true,
  "allDeclaredJobsTerminal": true,
  "declaredJobs": 10,
  "fiveBranchActiveStatusesZero": true,
  "all62WorkflowBlobsExact": true,
  "providerRuntimeRead": false,
  "operationalReadiness": false,
  "PCoff": false
}

FullactualSourceappendix is in c0c658... sameSource report; Root taskreview package preserves wholetemporaryexecutedSource delta. CandidateFAILED/unqualified, PREP-I1 actualpositivecoveringseampassed; exactinnerfailurecause awaitsreview. No autofix/rerun.
