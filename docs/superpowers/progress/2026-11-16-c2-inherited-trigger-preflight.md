# C2 Task 1 · inherited workflow trigger preflight (DATA only)

UTC 2026-11-16 03:16:12 UTC. Repository tokenizartinfo-ops/agent-friendly-web. Closed baseline 6791ce1bab9372e206d3c7b42b3e1394dc6e0c68; tree 62e78926635d6b74f288d6c0d69e0f2516306989. Proposed lab branch lab/afw-c2-source-20261116-t1. No ref or run created by this audit.

## Scope and result

All 62 workflow blobs were read as DATA. Literal top-level event declarations contain only push, pull_request, workflow_dispatch and issue_comment; no create, workflow_run or schedule event. An ordinary ref push creates no PR/issue_comment/dispatch event. Of 19 inherited push workflows, 18 require exact branch main, which differs from this lab ref. The remaining workflow filters three exact paths, all of which must remain unchanged in the lab: scripts/check-preparation-closed-origin.mjs, test/preparation-closed-origin.test.mjs, .github/workflows/afw-preparation-closed-origin.yml. The final Rootgate must join the actual lab diff and manifest to these pins before any ref mutation.

This is a bounded inspection of these 62 pinned literal headers, not a general YAML parser or guarantee about uninspected revisions. GitHub documents branch/path filters as conjunctive and new-branch two-dot comparison semantics, with diff timeout/large-push fallbacks: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax . Do not infer filter success from a proposed filename alone; keep the actual push one commit, inspect parents and changed paths. If the closed-origin workflow nevertheless becomes eligible, its push route has contents:read, no environment/secrets, a three-minute test job with injected synthetic fetchers; its fixed-origin HTTP command and artifact upload are both gated to workflow_dispatch, absent here. Those guards must remain pinned. Fallback test bb3172ddce16826d94e04376ad5269c990a1e614 imports script17ca8e83cf549617e754d4f56f8d712afe241860; inspect its CLI-only entry condition before admitting this fallback.

## Pinned inherited headers

| Workflow | Blob | Events | Push result on proposed lab |
| --- | --- | --- | --- |
| .github/workflows/afw-canary-cloud-upload.yml | 47ebf94c1d7dc8d6c22c529c57296dbc10498d8e | workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-delegated-edge.yml | 36dc1ba8cbb1cc3fae37dec80cd230fa00de8573 | workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-delivery-recipe-guidance.yml | 2fd232c486cc6150d752a45d7e9c9e618981b6ef | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-finite-budget-qualification.yml | f7a71f1a0fa4f5ddf069ff411f008a098455e5cc | workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-finite-finalizer.yml | 566d597223497c5cf3c0435dd0f4e8b3ab7557ea | issue_comment | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-finite-native-package.yml | 92729f5952fd2d8bec107b4072bb569216d21863 | push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-finite-qa-bootstrap.yml | 22f324e480dbe0295fe23fb7415328cba7952b1b | issue_comment | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-home-hero-art.yml | bf197aa0a7a06b2891cbdda48a134e64f91d9358 | pull_request | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-independent-closure-build.yml | 741b21bbd00e7da0454e5f84532b23a52533b421 | workflow_dispatch, pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-independent-container-control.yml | 2c5bfd41119552a659a075833c9f95fe798b980a | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-named-confirmation-package.yml | 282bff4d04efd495b84681dbb1953c959ab91a69 | workflow_dispatch, pull_request | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-original-native-observer.yml | 0dd840a967c9f6d6f4b766d059262ba36d8cfab2 | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-own-closed-readback.yml | c1a5b4b5881a9d890e6556a7851c917911685195 | issue_comment | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-own-worker-build.yml | 063fd026824c09e13a1705d2017e166fa8bada88 | workflow_dispatch, pull_request | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-preparation-client-draft.yml | f1ae3e894bf2c55be089a941bddeb7a556678805 | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-preparation-client-maintenance.yml | 6979c6874ec9c567f8b4af53754c8e9e94026b34 | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-preparation-closed-origin.yml | 3c09bcb4bcb4d3f1f33280fa690f3b0806d5c299 | push, pull_request, workflow_dispatch | Push fixed three exact paths; planned lab workflow/DATA/runner do not touch them |
| .github/workflows/afw-preparation-maintenance-api-plan.yml | 2a857568bc5a539d11baa09fcd9acf67838b67f9 | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-preparation-maintenance-caller.yml | 7af5278a2940c021b871db476d7b738fcb471fa5 | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-preparation-maintenance-worker.yml | ad8cd6765fa0b2202d8a711c99a57977f7b61365 | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-preparation-record-owner.yml | e1ba948e59070c3c2998a881b81fa10f5921adb3 | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-preparation-release-preflight.yml | b5fbd64d0db4f31249a2e6916a9053023fc7a019 | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-preparation-schema.yml | caa208e912b8f715115780d94845bdb7e2628384 | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-preparation-source-create-worker.yml | 740e48ccd1015b8ad5f3f389ef026020f8c01812 | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-preparation-source-inspect.yml | 4da051fa70890542a0cf1da46ceabf8a00717a98 | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-preparation-source-intake-http.yml | f59ee72086960474591bdedc9610bae2ede1bcd3 | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-preparation-source-intake.yml | 3e46ef491ae0977f3911a02b77eefe5ec1cf6eb9 | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-preparation-source-session.yml | ae487e0117dde6cda36dfa9fd16663a1bf7d9aaa | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-preparation-source-worker.yml | 4f0e8238333f6e4f0bf580396895f241b1ff3f70 | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-preparation-view-qa.yml | cc686287e4561f70c4e0847cca7479acbd9748de | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-preparation-worker-build.yml | 26505421f62bb9587f08d5f354748ccf6956d9ff | workflow_dispatch, pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/afw-provider-preflight.yml | 5ac2de34874c3f055d66ae45c9c97c14a6c76199 | workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-provider-readonly-check.yml | 36faefbe250ba57d936a182b5cf07f80c20b9d14 | workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-public-delivery-qualification.yml | afa732a0e31dd0fd7a0a5e78dc4b2c12b90f5129 | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-public-edge-check.yml | 296286892c515d3d2c2bef5e0099e5601a180a93 | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-public-guide-start-qa.yml | 0a263ab85999aebd0c8e048402cd4fa8c0badb9e | pull_request | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-public-home-activation.yml | d11540abb72143e1cee973e5abdcd5217a810e98 | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-public-home-inactive-upload.yml | 617935510b1ed42ef3ac9af0d269c18e06e3c53f | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-public-inactive-upload.yml | a1e0ac904fa31501e26186dc0f318473a50f7664 | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-public-journey-activation.yml | 05cab1e3cb661336c68c29ef77d8030f46c686d5 | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-public-journey-inactive-upload.yml | 25063993ada3c4d2c08079fdf3f8fde69e95ffe2 | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-public-json-activation.yml | 7fdffb9c516d6b91eb937fe53c49c2cb45f7ff68 | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-public-json-inactive-upload.yml | 61390672bffc33996e445f263c8b0faf8d27308c | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-public-json-qualification.yml | b8611390a25da9802bf79402c56e1e531508acfb | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-public-methodology-once.yml | ad94df4b4c174c72f62f27dd14646244947c60e9 | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-public-upload-read-probe.yml | 51af06841e144ed44ce9cf9b34e94117744d545d | pull_request, workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-publication-template-build.yml | f72adaa9221157b68be2b2075dbbfd8dff2615a2 | workflow_dispatch, pull_request | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-qa-arm-observation-qualification.yml | 07e25529a0dc5c73a5d9efe8d3dfa7e8665b38aa | workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-qa-bootstrap-custody-inspection.yml | b8e7ecf0f90b8ef24bdbe06a93ef3eef646ade0e | issue_comment | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-qa-closed-observation-v2-qualification.yml | 583a94180db9d79613846c8ad93d4e2e69bb6e1d | workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-qa-cloud-clone-source-qualification.yml | ff342ecb37e5f31711f07915233cff6e2df10933 | pull_request | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-qa-cloud-clone.yml | 713f0b83130e57af3263c591638f1fd9ea95c326 | issue_comment | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-qa-cloud-closed-rollback.yml | 74493a4b0702498b71cefd2761e443e87db1b145 | workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-qa-cloud-native-observation.yml | c2f7d3f883db369b20fab294759dece9ab4d393e | issue_comment | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-qa-legacy-baseline-qualification.yml | 0e63bc9cb094474a11ff92733d4fedaa65ee3a7a | workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-qa-native-observation-source-qualification.yml | 36c3af76fa962fc1a435a31e7de3e9dc9023627e | pull_request | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-qa-writer-queue-qualification.yml | 24974c071363fc5a9e96fae2c5ef9e8b93917d09 | pull_request | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-r2-post-ack-contracts.yml | 2006beb4d081ef127d1192fd99967f5f76eeb7db | workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-r2-post-ack-diagnostic.yml | baa8442094731bea1413d2cc03028ab8682b300b | workflow_dispatch | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-release-operator-build.yml | c95329e11064417f227e41431efc939bd1411cff | workflow_dispatch, pull_request | No push trigger; no PR/dispatch/comment action authorized |
| .github/workflows/afw-verified-access-expiry.yml | 0ea41f39ef6d11dc3c620ecf3026e61a603a3059 | pull_request, push | Push exact branch main only; lab branch differs |
| .github/workflows/ci.yml | 496e4327b3b1bfb9e05d2c02ae33f7810a3a0d04 | pull_request, push | Push exact branch main only; lab branch differs |

## Gates still pending

Source proposal/index/runner/workflow not complete. Root must inspect final action pins, no credentials/env/internet consumer/provider calls, bounded outputs, context/attempt/one-use guards, exact task tests and negative modes, independent receipt receiver and full before/after admission. Actual cloud qualification and task review are pending. No local Source execution authorized. Product Core, historical Source ref and Main remain unchanged. All operational claims, including PCoff, remain false.
