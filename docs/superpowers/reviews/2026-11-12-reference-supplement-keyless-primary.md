# AFW reference supplement — independent keyless primary proof

2026-11-12 17:45 UTC. Root read-only reconciliation of the sole released keyless attempt. This is inspector preparation, not Original Native16 qualification, a private artifact inspection or PC-off readiness.

## Identity and results

Repository tokenizartinfo-ops/agent-friendly-web (1347578006); Source branch feat/finite-native-cleanup-20261101; frozen c0524de57c4b688c11df67c58bcc72cd3f472870 / tree76cde41f50e22b60c1ac3ba53cf414292b317ec4 / workflow8642974018f1b54846ed0d2c451233cd5cef753b. Run [43272182415/attempt1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43272182415), push2026-11-12T17:42:01Z, completedSUCCESS. Jobs producer131371262155 and dependent verifier131371394506 completedSUCCESS, serial. Source has no environment or secrets binding, both job budgets2min. Current dynamic controls:91Core +24supplement +16inspection-pair +16ZIP/capture, ALLPASS. Old missing-feature RED is static, not represented as executed.

Root independently fetched run/jobs/artifact metadata, read only keyless logs' whitelisted closed records, and downloaded only the safe2312B controls ZIP into ephemeral RAM. Root did not execute Source programs, access the Original cipher/key/payload, clone/install/build locally, alter Source or contact Cloudflare/runtime.

## Strict safe artifact audit

One safe artifact13967708601, expiry2026-11-19T17:42:08Z. Root validated exact ZIP size and SHA, strict local/central/EOCD ranges, no extras/duplicates/links/traversal, CRC known vector and each file CRC, complete two-file inventory. Parsed JSON is closed, source/run/attempt and original fixed control inventory match, all sensitivity/readiness flags false, whole result bytes/hash bound by real manifest. All91control IDs and24supplement IDs present once in expected order, allpassed. Supplement module/tests/bootstrap hashes independently computed from the full frozen workflow as data and matched the safe result. Core remains77002B/d514; ZIP module unchanged b36c. No signed artifact URL retained in evidence.

```json
{
  "id": 13967708601,
  "zipBytes": 2312,
  "zipSha256": "bd25d56446e1df147373af88978d6be553be9e56549fe33950f3fece0d506dd8",
  "completeInventory": true,
  "strictSchema": true,
  "coreSha256": "d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246",
  "coreBytes": 77002,
  "controls": 91,
  "elapsedMs": 50,
  "counterexamples": {
    "workflowBlob": "97b37fec44696dde23daa013196a5acdb05c2f4d",
    "verdictCounterexample": "executed_inert",
    "digestCounterexample": "executed_inert"
  },
  "readiness": false,
  "files": [
    {
      "name": "result.json",
      "bytes": 10557,
      "sha256": "92694a7dca11839121ebe319f24c45bbad4348c0a509503c64e974276a4dc122",
      "crc32": "30ec0620"
    },
    {
      "name": "manifest.json",
      "bytes": 335,
      "sha256": "588a684eb3c7caec34998f03f110ff15b258c9a7fb49fd6e365f643dbe409df8",
      "crc32": "9210240e"
    }
  ],
  "referenceControls": 24,
  "referenceModuleSha256": "7fb8dea6e3fc6db00a1b320f591f223b06a0e3f81ab42ebf968ced8e17c03eeb",
  "referenceTestsSha256": "e279e65887e093a5aced964dc2ea24c540b8ee031704ce46914318c590fe61bc",
  "referenceBootstrapSha256": "2a04ef50b5dbe6a0a404fcef3bd83795181010c66a3b36990461a9033c3035f1"
}
```

## Closed verifier records

```json
[
  {
    "marker": "INSPECTION_PAIR_CONTROLS",
    "expected": 16,
    "completed": 16,
    "pass": 16,
    "fail": 0,
    "inventory": [
      {
        "id": "observed_pass",
        "status": "passed"
      },
      {
        "id": "observed_failure",
        "status": "passed"
      },
      {
        "id": "observed_skip_todo",
        "status": "passed"
      },
      {
        "id": "result_source",
        "status": "passed"
      },
      {
        "id": "result_run",
        "status": "passed"
      },
      {
        "id": "manifest_source",
        "status": "passed"
      },
      {
        "id": "manifest_run",
        "status": "passed"
      },
      {
        "id": "foreign_pair",
        "status": "passed"
      },
      {
        "id": "fixture_count",
        "status": "passed"
      },
      {
        "id": "unexamined",
        "status": "passed"
      },
      {
        "id": "two_records",
        "status": "passed"
      },
      {
        "id": "unknown_case",
        "status": "passed"
      },
      {
        "id": "wrapper_only",
        "status": "passed"
      },
      {
        "id": "manifest_bytes",
        "status": "passed"
      },
      {
        "id": "manifest_digest",
        "status": "passed"
      },
      {
        "id": "case_order",
        "status": "passed"
      }
    ],
    "firstFailure": null
  },
  {
    "marker": "SAFE_ZIP_CONTROLS",
    "expected": 16,
    "completed": 16,
    "pass": 16,
    "fail": 0,
    "inventory": [
      {
        "id": "validator_capture_after_success",
        "status": "passed"
      },
      {
        "id": "validator_rejection_identity_no_capture",
        "status": "passed"
      },
      {
        "id": "zip_valid_store_crc_vector",
        "status": "passed"
      },
      {
        "id": "zip_valid_deflate",
        "status": "passed"
      },
      {
        "id": "zip_signed_unsigned_descriptors",
        "status": "passed"
      },
      {
        "id": "zip_wrong_size",
        "status": "passed"
      },
      {
        "id": "zip_wrong_upload_sha",
        "status": "passed"
      },
      {
        "id": "zip_wrong_metadata_sha",
        "status": "passed"
      },
      {
        "id": "zip_extra_entry",
        "status": "passed"
      },
      {
        "id": "zip_duplicate_entry",
        "status": "passed"
      },
      {
        "id": "zip_traversal_entry",
        "status": "passed"
      },
      {
        "id": "zip_symlink",
        "status": "passed"
      },
      {
        "id": "zip_bad_crc",
        "status": "passed"
      },
      {
        "id": "zip_noncontiguous_ranges",
        "status": "passed"
      },
      {
        "id": "zip_declared_and_inflate_caps",
        "status": "passed"
      },
      {
        "id": "download_stream_redirect_auth_bounds",
        "status": "passed"
      }
    ],
    "failure": null
  },
  {
    "marker": "AFW_METADATA_READBACK/1",
    "source": "c0524de57c4b688c11df67c58bcc72cd3f472870",
    "run": "43272182415",
    "attempt": 1,
    "assignedArtifactId": "13967708601",
    "stage": "complete",
    "firstFailedPredicate": "none",
    "reason": "none",
    "httpStatus": 200,
    "receivedBytes": 776,
    "timeoutObserved": false,
    "verified": true
  },
  {
    "marker": "AFW_SAFE_READBACK/1",
    "kind": "controls",
    "source": "c0524de57c4b688c11df67c58bcc72cd3f472870",
    "run": "43272182415",
    "attempt": 1,
    "artifactId": "13967708601",
    "coreSha256": "d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246",
    "verifierSha256": "73d5579a27bc054566a9a95857306b14b79f86b7b8d3814f31350c33faf23741",
    "safeZipModuleSha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d",
    "producerCoreVerified": true,
    "sourceCoreVerified": true,
    "safeControlsPass": true,
    "metadataVerified": true,
    "rawZipVerified": true,
    "inventoryVerified": true,
    "producerControlCount": 91,
    "supplementStatus": null,
    "zipBytes": 2312,
    "metadataZipBytes": 2312,
    "uploadDigest": "bd25d56446e1df147373af88978d6be553be9e56549fe33950f3fece0d506dd8",
    "metadataDigest": "sha256:bd25d56446e1df147373af88978d6be553be9e56549fe33950f3fece0d506dd8",
    "rawZipSha256": "bd25d56446e1df147373af88978d6be553be9e56549fe33950f3fece0d506dd8",
    "resultBytes": 10557,
    "resultSha256": "92694a7dca11839121ebe319f24c45bbad4348c0a509503c64e974276a4dc122",
    "manifestBytes": 335,
    "manifestSha256": "588a684eb3c7caec34998f03f110ff15b258c9a7fb49fd6e365f643dbe409df8",
    "stage": "complete",
    "reason": "none",
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false,
    "globalNativeDrainVerified": false,
    "sdkNamespaceEmptyVerified": false
  }
]
```

## Supplement controls

```json
{
  "marker": "REFERENCE_CONTROLS/1",
  "expected": 24,
  "completed": 24,
  "pass": 24,
  "fail": 0,
  "inventory": [
    {
      "id": "two_valid",
      "status": "passed"
    },
    {
      "id": "zero_fraction_false",
      "status": "passed"
    },
    {
      "id": "lookup_states",
      "status": "passed"
    },
    {
      "id": "identities_flags",
      "status": "passed"
    },
    {
      "id": "required_bounds",
      "status": "passed"
    },
    {
      "id": "optional_types",
      "status": "passed"
    },
    {
      "id": "array_bounds",
      "status": "passed"
    },
    {
      "id": "empty_absent",
      "status": "passed"
    },
    {
      "id": "writer_http",
      "status": "passed"
    },
    {
      "id": "private_canary",
      "status": "passed"
    },
    {
      "id": "file_missing_bad",
      "status": "passed"
    },
    {
      "id": "file_bound_links",
      "status": "passed"
    },
    {
      "id": "gate_no_read",
      "status": "passed"
    },
    {
      "id": "one_cleanup",
      "status": "passed"
    },
    {
      "id": "primary_cleanup",
      "status": "passed"
    },
    {
      "id": "timeout_cleanup",
      "status": "passed"
    },
    {
      "id": "uncertain_no_cleanup",
      "status": "passed"
    },
    {
      "id": "cleanup_late_fail",
      "status": "passed"
    },
    {
      "id": "whole_hash_bytes",
      "status": "passed"
    },
    {
      "id": "nested_identity",
      "status": "passed"
    },
    {
      "id": "complete_partial",
      "status": "passed"
    },
    {
      "id": "strict_envelope",
      "status": "passed"
    },
    {
      "id": "producer_transport",
      "status": "passed"
    },
    {
      "id": "verifier_transport",
      "status": "passed"
    }
  ],
  "firstFailure": null
}
```

## Limits and next gate

This proves current inspector controls and assigned-safe-artifact transport only. R1/R2 receipt membership/values in Original13949168304 remain unobserved. Underlying Original Native run43229236340 stillFAILED. No cause or repair, delivery, work, native withdrawal/drain, PC-off or Max readiness established. Actual supplemental5+2 remains HELD pending COMPLETE inactive proposal, full independent code/spec review, then a separate exact Root release. Do not replay this keyless permit or Original Native16. Implementer retains sole Source custody only to reconcile the authorized inactive candidate and stop.
