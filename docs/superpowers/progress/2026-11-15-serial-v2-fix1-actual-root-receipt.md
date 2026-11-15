# Serial v2 fix1 actual Root receipt

{
  "purpose": "afw.serial-v2.fix1.actual-root-receipt.v1",
  "utc": "2026-11-15 23:38:03 UTC",
  "Source": "661ba7a1fd728efe3d269d776cb91cbfa2c8c994",
  "tree": "76de68a502f046edfc2d8cb655a30aff97dc3bd7",
  "parent": "49ee71ead8d52cb5d474d820d57828115f912923",
  "gate": "dba3963088b64c26904e21826a0208399894c164",
  "sourceIndex": "64ceddb8ed96d47daf912abbeecf52c7fa4f1bd0",
  "ownIndex": "06211e8bf5c37d3eca5015ab5c56c3f32adb0310",
  "run": 43775725913,
  "attempt": 1,
  "jobId": 133001451556,
  "API": {
    "runStatus": "completed",
    "runConclusion": "failure",
    "totalJobs": 1,
    "jobStatus": "completed",
    "jobConclusion": "failure",
    "steps": [
      {
        "number": 2,
        "name": "Run actions/checkout@11d5960a326750d5838078e36cf38b85af677262",
        "conclusion": "success"
      },
      {
        "number": 3,
        "name": "Run actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020",
        "conclusion": "success"
      },
      {
        "number": 4,
        "name": "Check serial v2 isolation and trace controls",
        "conclusion": "failure"
      },
      {
        "number": 5,
        "name": "Check serial loader boundary controls",
        "conclusion": "skipped"
      },
      {
        "number": 6,
        "name": "Check serial entry pin reuse",
        "conclusion": "skipped"
      },
      {
        "number": 7,
        "name": "Run declared full104 controls only",
        "conclusion": "skipped"
      }
    ]
  },
  "logsFetchedOnce": true,
  "publicFrameCounts": {
    "preflight": 0,
    "boundary": 0,
    "unit": 0,
    "full": 0,
    "unavailable": 0
  },
  "observed": "AFW_Q1_SERIAL_LAB_PREFLIGHT_FAILED then exit1; later boundary/unit/full steps skipped",
  "cause": "UNKNOWN; no assertion/stage inferred from fixed diagnostic",
  "actualFull520Invoked": false,
  "actualFull520ProcessCaseMeasurements": 0,
  "preflightFixtureProgress": "UNKNOWN",
  "rootAPIRejection": "Root serial-v2 API: run_status",
  "labQualified": false,
  "I3Closed": false,
  "C2Released": false,
  "NativeReleased": false,
  "rollback": "Restore original F7 as child of this exact candidate, preserve complete proposed SAME plus this receipt; full independent readback pending",
  "providerRuntimeRead": false,
  "nonclaims": {
    "historicalCauseProven": false,
    "receiptAuthenticated": false,
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false,
    "globalNativeDrainVerified": false,
    "sdkNamespaceEmptyVerified": false
  }
}
