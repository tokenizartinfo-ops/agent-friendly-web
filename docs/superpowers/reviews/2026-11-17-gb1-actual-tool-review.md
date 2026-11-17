{
  "schema": "AFW.GB1.INDEPENDENT_ACTUAL_TOOL_EVIDENCE_REVIEW/1",
  "date": "2026-11-17",
  "disposition": "ACCEPT_TOOLING_FOR_DEPENDENT_TASK2_ONLY",
  "openFindings": [],
  "project": "AFW",
  "repository": "tokenizartinfo-ops/agent-friendly-web",
  "basis": "Independent readback of preserved immutable primary, terminal metadata, decoded log, archive, payload, gate and closure. No second acquisition from the live run, log or artifact service. No re-execution or Source import.",
  "objects": {
    "gate": "96c2eb9c32c97629daec432acd6b4311d6debe19",
    "ruling": "5ec0c3cc980b08b88b268c39e78be9596c25631a",
    "proposal": "597f4f4091700a2a046b37ccefb1c53ac488a284",
    "staticReview": "6c677054b1ad7a66688c512b777684d5f7c594cb",
    "primary": "a290e3c26382660f67c5ae8d2f8b0571c9f61956",
    "outcome": "dbf6d81998b5fc9a0e9bed04ccb1dc06ea6abec8",
    "payload": "e8d57d9f37de40d1e02c6dfd17a141bc9e68f81c",
    "closure": "bd3c3c583a17209be9390084eb390a24e515aeae",
    "schedule": "0a9457221583d9b7c8ac3d15e5a387101090c2f8",
    "schema": "5f4a0c1021aa86ccbb73782bd16e226de4e362d5",
    "sourceIndex": "adf5e3d04562a34718cce9a04ccb480bc70fa694",
    "fixtureIndex": "eefd23a6f730a830a1d2e537c12abf25fb5baded"
  },
  "context": {
    "event": "push",
    "branch": "lab/afw-c2-get-winner-20261117-tools1",
    "message": "AFW-C2-GET-WINNER-TOOLS1-ONEUSE-20261117",
    "workflow": ".github/workflows/afw-c2-get-winner-tools1.yml",
    "head": "3e9492c106a183c0338d21add6a7ef89851c5a3f",
    "tree": "ce07802318a626dc8f3f4e579a538d53fe58a764",
    "parent": "6791ce1bab9372e206d3c7b42b3e1394dc6e0c68",
    "run": 44189016920,
    "attempt": 1,
    "jobId": 134413114234,
    "jobName": "c2-get-winner-tools",
    "runAndJob": "completed/success",
    "artifactId": 14376161796,
    "artifactName": "afw-c2-get-winner-tools"
  },
  "bytes": {
    "log": {
      "utf8": 36258,
      "sha256": "b377510fe148045678e3b0fa3584421712c44adfd8e23c618fb5b05f73b3748d"
    },
    "zip": {
      "bytes": 4954,
      "sha256": "31b66fd8bb1b9dac050aee2bfd185c61a7cf68f6bc1a5c6db1c2eca90078f6ee",
      "member": "get-winner-tools.json",
      "deflatedBytes": 4798,
      "crc32": "c6890dc7",
      "signedDescriptorBytes": 16
    },
    "payload": {
      "utf8": 16415,
      "sha256": "a1ce49755befb06b018ab27c1c2c8c3a469cf7fedcc681d55c5107041ff2ac27",
      "cap": 24577
    },
    "verification": "Recomputed both SHA-256 digests and the log digest. Verified single-member local header/central directory/EOCD offsets and sizes, exact names and descriptor, raw DEFLATE exact consumption and bounded inflation, recomputed CRC32, fatal UTF-8 decoding and absence of BOM. Inflated text equals both preserved primary payload and standalone payload blob. Checked payload data against the pinned schema constraints, including constants, exact/required properties, ordered array items, counts, types and bounds."
  },
  "actual": {
    "syntaxInputs": 35,
    "syntaxEvidence": "Success step with 33 Node syntax invocations and one Python command naming two files.",
    "defensive": {
      "nodePassed": 34,
      "nodeFailed": 0,
      "pythonPassed": 2,
      "pythonResult": "OK"
    },
    "startup": 46,
    "startupEvidence": "STARTUP_HELPER_CONTROLS_46_OK",
    "model": 287,
    "modelBinding": "The ordinary-model receipt binds the digest of the sealed 287-ID list. H-joined and H-foreign-marker-tuple are in that list. This is a bounded, pinned aggregate receipt, not 287 individual raw logs.",
    "nativeDispatches": {
      "ordinary": 15,
      "retention": 8,
      "fixedFault": 12,
      "transport": 4,
      "total": 39
    },
    "groupEvidence": "Matched ordered ordinary/model digests and exact retention/fault/transport ID arrays to the sealed schedule. Four retention comparisons each reproduce the stored ON/OFF SHA-256 from the bounded result object. Fixed faults have six resident pairs, transport two. Three scheduled bootstraps and their child blobs match the admitted mount catalogue. All three report one guarded process, exit 0, bootstrap FULFILLED and matching targets and tool inputs. One preflight plus three tool processes gives four guarded Node processes.",
    "all13Targets": "Both ordered before/after SHA-256 arrays equal all 13 source-index after hashes.",
    "toolInputsRechecked": true,
    "ownedTempRemoved": true,
    "childExit": 0
  },
  "closure": {
    "head": "6efd539c6e2861a93e065da42aa0f4fa25534689",
    "tree": "dadea9603c5478d26239efef270a50aefac4038b",
    "workflowBlob": "22a195d37550c0f5d03c813739f195e9edf10b5c",
    "record": "Read back manual-only workflow with unconditional-false job. Closure record binds the accepted primary, payload and outcome, 3,296 leaves, 3,203 originals and 90 non-workflow candidate bodies preserved; all 20 protected expected/actual refs matched, run count 1 on branch and 0 on closed head at the recorded readback. These are closure-time observations."
  },
  "limits": {
    "allowedNext": "Implementation of dependent Task2 public-consumer binding only.",
    "parentCanonicalReplacementIntegrity": false,
    "platformWaitUntilLifecycle": false,
    "ordinaryRouteIntegrationFromRetention": false,
    "retentionEvidence": "Native component plus TOOL waitUntil spy. The component's qualified-drain observation is local to its fixture.",
    "fixedFaultScope": "TEST_ONLY_FIXED_M_SOURCE_FAULTS",
    "transportDirectRoute": false,
    "full20BusinessRouteExecuted": false,
    "businessGET503Cause": "UNKNOWN",
    "businessRepairProved": false,
    "SourceQualified": false,
    "Task1Pass": false,
    "completePackage": false,
    "PCoff": false,
    "operationalReadiness": false,
    "receiptAuthenticated": false,
    "globalNativeDrainVerified": false,
    "sdkNamespaceEmptyVerified": false,
    "providerRuntimeActivation": false
  },
  "reviewerActions": "DATA-only RAM checks and detached review creation/readback; no refs, runs, deployments, authentication operations or Source execution."
}
