# Serial v2 fix3 actual Root receipt

{
  "purpose": "afw.serial-v2.fix3.actual-root-receipt.v1",
  "utc": "2026-11-16 01:08:06 UTC",
  "Source": "ef41b65dd5402092a6de3977532a8fffcac59d81",
  "tree": "ff3691c4bedcd855b66ba69485ce8f20d920e537",
  "parent": "b26843c72dccc9bdcf9a9771e59faeff077c6461",
  "sourceIndex": "d138a0640a0bcdea8f0f6075a8975eb75c1b6e6b",
  "ownIndex": "6793b7c01ee70e4bc898b1b58f60c07f7c06c5ce",
  "gate": "083cb71b7337ca099bca9a726e514600cb0d76f9",
  "run": 43783876645,
  "attempt": 1,
  "jobId": 133027042797,
  "API": {
    "runStatus": "completed",
    "runConclusion": "failure",
    "totalJobs": 1,
    "jobStatus": "completed",
    "jobConclusion": "failure",
    "steps": [
      {
        "n": 2,
        "name": "Run actions/checkout@11d5960a326750d5838078e36cf38b85af677262",
        "conclusion": "success"
      },
      {
        "n": 3,
        "name": "Run actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020",
        "conclusion": "success"
      },
      {
        "n": 4,
        "name": "Check serial v2 isolation and trace controls",
        "conclusion": "failure"
      },
      {
        "n": 5,
        "name": "Check serial loader boundary controls",
        "conclusion": "skipped"
      },
      {
        "n": 6,
        "name": "Check serial entry pin reuse",
        "conclusion": "skipped"
      },
      {
        "n": 7,
        "name": "Run declared full104 controls only",
        "conclusion": "skipped"
      }
    ]
  },
  "logsFetchedOnce": true,
  "frames": [
    0,
    0,
    0,
    0,
    0
  ],
  "actual": "fixed failure sentinel followed immediately by platform exit71",
  "reportedPhase": {
    "code": 71,
    "phase": "launch capture bounds unexpected child",
    "scope": "reported last-entered group, not first assertion or cause",
    "Source": "ef41b65dd5402092a6de3977532a8fffcac59d81",
    "run": 43783876645,
    "job": 133027042797,
    "sentinelIndex": 164,
    "platformExitIndex": 165
  },
  "firstFailingAssertion": "UNKNOWN",
  "actual520Invoked": false,
  "actual520ProcessCaseMeasurements": 0,
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
