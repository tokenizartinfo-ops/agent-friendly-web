# Serial v2 fix2 actual Root receipt

{
  "purpose": "afw.serial-v2.fix2.actual-root-receipt.v1",
  "utc": "2026-11-16 00:19:21 UTC",
  "Source": "ae216d6e24b2af0e44985cca0f408d42e5dc1e38",
  "tree": "0450e5900e86b31667f79ee12d0bdef002abf4f7",
  "parent": "e57d6f2b862deccfbb90d8e042a576c68d0ccb3c",
  "sourceIndex": "871ad100702810c6421f32f5d038139d42b0a36d",
  "ownIndex": "6793b7c01ee70e4bc898b1b58f60c07f7c06c5ce",
  "gate": "c3a054b5f9d2215a9a0b2f134222b7a39155acdd",
  "run": 43779366057,
  "attempt": 1,
  "jobId": 133012825499,
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
  "frames": {
    "preflight": 0,
    "boundary": 0,
    "unit": 0,
    "full": 0,
    "unavailable": 0
  },
  "actual": "fixed preflight failure sentinel and exit1; later steps skipped",
  "firstFailingAssertion": "UNKNOWN",
  "fixtureProgress": "UNKNOWN",
  "actual520Invoked": false,
  "actual520ProcessCaseMeasurements": 0,
  "RootAPIRejected": "Root serial-v2 API: run_status",
  "RootOwnFixtures": {
    "positive": 45,
    "negative": 124,
    "actualSourceQualification": false
  },
  "qualified": false,
  "I3Closed": false,
  "C2Released": false,
  "NativeReleased": false,
  "closureMustBeVerifiedSeparately": true,
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
