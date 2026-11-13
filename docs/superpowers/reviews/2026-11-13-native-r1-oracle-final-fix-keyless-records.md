# Native R1 finalfix — complete actual closed KEYLESS records

No Native/privateproducer/models/cipher/key fetched. Sourceb14e1c08/run43385447465/1, fixedSourceclosedmarkerJSONonly from timestampedstdout, command echoes excluded.604phase records=302start/passpairs/0failed,99subcases/38newfocused. CorrectedversionKEYLESSonly; realNativeoriginalpassremains416c.

```json
{
  "producer": [
    {
      "marker": "AFW_R1_NODE_SELECTION/1",
      "node": "22.23.4",
      "layout": "omitted",
      "registered": 3,
      "executed": 1,
      "observedSkipped": 0,
      "NativeExecuted": false,
      "SDKImported": false,
      "MFAllocated": false,
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "legacy_custody",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_FIX1_PRIVATE_ROUTE/1",
      "route": "early",
      "captured": "failed",
      "published": "failed",
      "custody": "verified",
      "failure": {
        "stage": "native",
        "reason": "original_oracle_failed"
      }
    },
    {
      "marker": "AFW_R1_FIX1_PRIVATE_ROUTE/1",
      "route": "late",
      "captured": "failed",
      "published": "failed",
      "custody": "verified",
      "failure": {
        "stage": "native",
        "reason": "original_oracle_failed"
      }
    },
    {
      "marker": "AFW_R1_FIX1_PRIVATE_ROUTE/1",
      "route": "passed",
      "captured": "passed",
      "published": "passed",
      "custody": "verified",
      "failure": null
    },
    {
      "marker": "AFW_R1_FIX1_PRIVATE_ROUTE/1",
      "route": "infra",
      "captured": "unavailable",
      "published": "unavailable",
      "custody": "verified",
      "failure": {
        "stage": "validation",
        "reason": "invalid_evidence"
      }
    },
    {
      "marker": "AFW_R1_FIX1_PRIVATE_ROUTE/1",
      "route": "uncertain",
      "captured": "unavailable",
      "published": "unavailable",
      "custody": "verified",
      "failure": {
        "stage": "validation",
        "reason": "invalid_evidence"
      }
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "legacy_custody",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_empty",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_empty",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_empty",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_empty",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_empty",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_empty",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_empty",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_empty",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_empty",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_empty",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_FIX2_PARTIAL_ROUTE/1",
      "case": "empty",
      "Native": "unavailable",
      "custody": "verified",
      "failure": {
        "stage": "validation",
        "reason": "invalid_evidence"
      }
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_nonempty",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_nonempty",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_nonempty",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_nonempty",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_nonempty",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_nonempty",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_nonempty",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_nonempty",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_nonempty",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_nonempty",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_FIX2_PARTIAL_ROUTE/1",
      "case": "nonempty",
      "Native": "unavailable",
      "custody": "verified",
      "failure": {
        "stage": "validation",
        "reason": "invalid_evidence"
      }
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_missing_nonempty",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_missing_nonempty",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_missing_nonempty",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_missing_nonempty",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_missing_nonempty",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_missing_nonempty",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_missing_nonempty",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_missing_nonempty",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_extra_empty",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_extra_empty",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_extra_empty",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_extra_empty",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_extra_empty",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_extra_empty",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_extra_empty",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_extra_empty",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_mutated",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_mutated",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_mutated",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_mutated",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_mutated",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_mutated",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_mutated",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_mutated",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_symlink",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_symlink",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_symlink",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_symlink",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_symlink",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_symlink",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_symlink",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_reject_symlink",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_path",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_path",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_path",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_path",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_path",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_path",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_path",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_path",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_path",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_path",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_missing_at_capture",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_missing_at_capture",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_missing_at_capture",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_missing_at_capture",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_missing_at_capture",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_missing_at_capture",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_missing_at_capture",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_missing_at_capture",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_missing_at_capture",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_missing_at_capture",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_unexpected_at_capture",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_unexpected_at_capture",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_unexpected_at_capture",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_unexpected_at_capture",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_unexpected_at_capture",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_unexpected_at_capture",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_unexpected_at_capture",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_unexpected_at_capture",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_unexpected_at_capture",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_unexpected_at_capture",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_digest",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_digest",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_digest",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_digest",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_digest",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_digest",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_digest",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_digest",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_digest",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_digest",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_fabricated_clean",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_fabricated_clean",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_fabricated_clean",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_fabricated_clean",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_fabricated_clean",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_fabricated_clean",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_fabricated_clean",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_fabricated_clean",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_fabricated_clean",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "partial_invalid_fabricated_clean",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c0",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c0",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c0",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c0",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c0",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c0",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c0",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c0",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c0",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c0",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c1",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c1",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c1",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c1",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c1",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c1",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c1",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c1",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c1",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "epoch_c1",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4096",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4096",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4096",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4096",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4096",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4096",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4096",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4096",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4096",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4096",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4097",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4097",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4097",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4097",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4097",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4097",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4097",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4097",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4097",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_4097",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16384",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16384",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16384",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16384",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16384",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16384",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16384",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16384",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16384",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16384",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16385",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16385",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16385",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16385",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16385",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_operation_16385",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4096",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4096",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4096",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4096",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4096",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4096",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4096",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4096",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4096",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4096",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4097",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4097",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4097",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4097",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4097",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4097",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4097",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4097",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4097",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_4097",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16384",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16384",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16384",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16384",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16384",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16384",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16384",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16384",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16384",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16384",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16385",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16385",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16385",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16385",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16385",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_guard_16385",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4096",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4096",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4096",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4096",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4096",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4096",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4096",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4096",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4096",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4096",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4097",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4097",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4097",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4097",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4097",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4097",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4097",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4097",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4097",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_4097",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16384",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16384",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16384",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16384",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16384",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16384",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16384",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16384",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16384",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16384",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16385",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16385",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16385",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16385",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16385",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "native_scope_16385",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_no_omission",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_no_omission",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_scope_begin",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_scope_begin",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_scope_logical",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_scope_logical",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_operation_begin",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_operation_begin",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_guard_logical",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_guard_logical",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_tie_scope",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_tie_scope",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_tie_operation_guard",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_tie_operation_guard",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_not_full",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_not_full",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_ordinal_after_events",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_ordinal_after_events",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_ordinal_zero",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_ordinal_zero",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_no_omission_ordinal",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_no_omission_ordinal",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_trace_false",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_trace_false",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_overflow_false",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_overflow_false",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_spurious_overflow",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_spurious_overflow",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_spurious_first",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_spurious_first",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_wrong_kind",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_wrong_kind",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_wrong_event",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_wrong_event",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_wrong_ordinal",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_wrong_ordinal",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_earliest_order",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_earliest_order",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_scope_event_wrong",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_scope_event_wrong",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_missing_chronology",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_missing_chronology",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_inherited_chronology",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_inherited_chronology",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_noncount_chronology",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_noncount_chronology",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_noninteger_chronology",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_noninteger_chronology",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_negative_chronology",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_negative_chronology",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_accessor_chronology",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_accessor_chronology",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_valid",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_valid",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_valid",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_valid",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_valid",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_valid",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_valid",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_valid",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_valid",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_valid",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_invalid",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_invalid",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_invalid",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_invalid",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_invalid",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_invalid",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_invalid",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_invalid",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_invalid",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "retention_json_invalid",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_FIX2_BOUNDARIES/1",
      "coherentlyWrongC0Rejected": true,
      "coherentlyWrongC1Rejected": true,
      "nativeLists": [
        "rows",
        "logicalScopeEvents",
        "totals.scopes"
      ],
      "accepted": [
        4096,
        4097,
        16384
      ],
      "rejected": 16385,
      "custodyFiles": 4096,
      "normalArchiveFiles": 512
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_r1_sibling",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_r1_sibling",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_r1_sibling",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_r1_sibling",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_r1_sibling",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_r1_sibling",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_r1_sibling",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_r1_sibling",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_r1_sibling",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_r1_sibling",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_readonly_root",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_readonly_root",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_readonly_root",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_readonly_root",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_readonly_root",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_readonly_root",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_readonly_root",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_readonly_root",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_readonly_root",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_readonly_root",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_other_case",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_other_case",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_other_case",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_other_case",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_other_case",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_other_case",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_other_case",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_other_case",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_other_case",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_other_case",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_private_root",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_private_root",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_private_root",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_private_root",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_private_root",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_private_root",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_private_root",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_private_root",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_private_root",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "before_private_root",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_r1_sibling",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_r1_sibling",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_r1_sibling",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_r1_sibling",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_r1_sibling",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_r1_sibling",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_r1_sibling",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_r1_sibling",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_r1_sibling",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_r1_sibling",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_readonly_root",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_readonly_root",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_readonly_root",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_readonly_root",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_readonly_root",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_readonly_root",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_readonly_root",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_readonly_root",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_readonly_root",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_readonly_root",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_other_case",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_other_case",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_other_case",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_other_case",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_other_case",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_other_case",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_other_case",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_other_case",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_other_case",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_other_case",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_private_root",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_private_root",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_private_root",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_private_root",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_private_root",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_private_root",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_private_root",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_private_root",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_private_root",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "after_private_root",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_full",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_full",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_full",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_full",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_full",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_full",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_full",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_full",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_full",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_full",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_owned",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_owned",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_owned",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_owned",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_owned",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_owned",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_owned",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_owned",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_owned",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_owned",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_both",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_both",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_both",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_both",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_both",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_both",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_both",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_both",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_both",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "null_both",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "terminal_epoch",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "terminal_epoch",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "terminal_epoch",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "terminal_epoch",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "terminal_epoch",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "terminal_epoch",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "terminal_epoch",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "terminal_epoch",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "terminal_epoch",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "terminal_epoch",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_hash",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_hash",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_hash",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_hash",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_hash",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_hash",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_hash",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_hash",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_hash",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_hash",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_hash",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_hash",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_hash",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_hash",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_hash",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_hash",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_hash",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_hash",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_hash",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_hash",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_bytes",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_bytes",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_bytes",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_bytes",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_bytes",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_bytes",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_bytes",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_bytes",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_bytes",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_m_bytes",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_bytes",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_bytes",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_bytes",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_bytes",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_bytes",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_bytes",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_bytes",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_bytes",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_bytes",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_m_bytes",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_hash",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_hash",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_hash",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_hash",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_hash",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_hash",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_hash",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_hash",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_hash",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_hash",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_hash",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_hash",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_hash",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_hash",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_hash",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_hash",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_hash",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_hash",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_hash",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_hash",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_bytes",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_bytes",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_bytes",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_bytes",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_bytes",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_bytes",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_bytes",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_bytes",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_bytes",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "record_qa_bytes",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_bytes",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_bytes",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_bytes",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_bytes",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_bytes",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_bytes",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_bytes",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_bytes",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_bytes",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "owned_qa_bytes",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "lineage_m_hash",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "lineage_m_hash",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "lineage_m_hash",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "lineage_m_hash",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "lineage_m_hash",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "lineage_m_hash",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "lineage_m_hash",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "lineage_m_hash",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "lineage_m_hash",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "lineage_m_hash",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "private_qa_bytes",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "private_qa_bytes",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "private_qa_bytes",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "private_qa_bytes",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "private_qa_bytes",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "private_qa_bytes",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "private_qa_bytes",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "private_qa_bytes",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "private_qa_bytes",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "private_qa_bytes",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "distinct_preclose",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "distinct_preclose",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "distinct_preclose",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "distinct_preclose",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "distinct_preclose",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "distinct_preclose",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "distinct_preclose",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "distinct_preclose",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "distinct_preclose",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "distinct_preclose",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "copy_descendant",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "custody_binding",
      "subcase": "copy_descendant",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "stage_array",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "stage_array",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "stage_object",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "stage_object",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "stage_number",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "stage_number",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "stage_boolean",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "stage_boolean",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "stage_null",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "stage_null",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "stage_inherited",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "stage_inherited",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "reason_array",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "reason_array",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "reason_object",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "reason_object",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "reason_number",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "reason_number",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "reason_boolean",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "reason_boolean",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "reason_null",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "reason_null",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "wrong_pair",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "wrong_pair",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "publication_absence",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "schema_flags",
      "subcase": "publication_absence",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_verified",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_verified",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_verified",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_verified",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_verified",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_verified",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_verified",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_verified",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_verified",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_verified",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_unverified",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_unverified",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_unverified",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_unverified",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_unverified",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "missing_full_unverified",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "contradiction_verified",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "contradiction_verified",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "contradiction_unavailable",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "contradiction_unavailable",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "publisher_bad_state",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "publisher_bad_state",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_FIX2_OBSERVED_PASS/1",
      "contracts": "passed",
      "tap": "passed",
      "fullResult": "absent",
      "Native": "unavailable",
      "failure": {
        "stage": "validation",
        "reason": "invalid_evidence"
      },
      "verifiedAndUnavailableCustody": true,
      "contradictoryNativeNotObservedRejectedByPublisherDTOAndVerifier": true
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_before_open",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_before_open",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_before_open",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_before_open",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_before_open",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_before_open",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_before_open",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_before_open",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_after_open",
      "phase": "capture",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_after_open",
      "phase": "capture",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_after_open",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_after_open",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_after_open",
      "phase": "reopen",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_after_open",
      "phase": "reopen",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_after_open",
      "phase": "publish",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_after_open",
      "phase": "publish",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_after_open",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "primary_after_open",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "legacy_publication",
      "phase": "expectation",
      "status": "start"
    },
    {
      "marker": "AFW_R1_FIX1_PUBLICATION_ROUTES/1",
      "missingBoth": "publication_unavailable",
      "partialMalformed": "invalid_evidence",
      "validId404": "publication_unavailable",
      "non404Unknown": "invalid_evidence",
      "failedNativeSchemaAccepted": true,
      "impossibleTupleRejected": true
    },
    {
      "marker": "AFW_R1_KEYLESS_PHASE/1",
      "control": "unavailable_publication",
      "subcase": "legacy_publication",
      "phase": "expectation",
      "status": "passed"
    },
    {
      "marker": "AFW_R1_CONTROLS/1",
      "status": "passed",
      "expected": 12,
      "completed": 12,
      "passed": 12,
      "failed": 0,
      "firstFailure": null,
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    }
  ],
  "verifier": [
    {
      "marker": "AFW_R1_SAFE_ZIP_CONTROLS/1",
      "expected": 16,
      "completed": 16,
      "passed": 16,
      "failed": 0,
      "inventory": [
        {
          "id": "metadata_capture_after_success",
          "status": "passed"
        },
        {
          "id": "metadata_rejection_no_capture",
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
      ]
    },
    {
      "marker": "AFW_R1_SAFE_READBACK/1",
      "source": "b14e1c0870775c20daaa0fc41aaf92f12a73415a",
      "run": "43385447465",
      "attempt": 1,
      "kind": "controls",
      "artifactId": "14018452023",
      "status": "verified",
      "reason": "none",
      "proof": "strict_current_safe_pair",
      "programHashes": {
        "adapter": "4187dd8000e8b8c6c513071cb2ac070e087090e945354e6a634186777959a6f7",
        "controls": "ee65ea5b81ad3c026d18366271b22fd74fc83886678b403d1894af33d43da219",
        "verifier": "e8320ab55c24fca8487ac2b789f44b4f783d415f3b7e89525683142a7f436c1c",
        "safeZip": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"
      },
      "metadataBytes": 1218,
      "rawZipBytes": 1218,
      "rawZipSha256": "9bb87dab27399b42f75b3e6ae05f410473714a57d364efdeff385e7592741f71",
      "uploadedDigest": "9bb87dab27399b42f75b3e6ae05f410473714a57d364efdeff385e7592741f71",
      "metadataDigest": "sha256:9bb87dab27399b42f75b3e6ae05f410473714a57d364efdeff385e7592741f71",
      "expiresAt": "2026-11-20T07:23:57Z",
      "resultBytes": 1506,
      "resultSha256": "62de3b3d5c5372f6add5a00787de811f336ec861ca67745e5dfe62d411a1e866",
      "manifestBytes": 267,
      "manifestSha256": "39886cdd2196436183e90d09855ae5976a047e4adbedbdbe8fac0ebcc7170037",
      "producerStatus": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    }
  ]
}
```
