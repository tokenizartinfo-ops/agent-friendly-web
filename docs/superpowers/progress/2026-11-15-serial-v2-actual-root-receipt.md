# AFW serial v2 actual Root receipt

{
  "purpose": "afw.q1.serial-source-lab.actual-root-receipt.v2",
  "dateUTC": "2026-11-15T22:23:56Z",
  "source": "f6e400f5af7fea2d35506cd7542b5e718660f8d9",
  "sourceTree": "1631f122f28701dc775be6d38671f0d5b6cc5f35",
  "gate": "82a075136949b689e577e46de8c91760d03b62ec",
  "run": 43769046439,
  "attempt": 1,
  "jobId": 132980579610,
  "jobName": "readonly",
  "runConclusion": "failure",
  "jobConclusion": "failure",
  "steps": [
    {
      "number": 1,
      "name": "Set up job",
      "status": "completed",
      "conclusion": "success"
    },
    {
      "number": 2,
      "name": "Run actions/checkout@11d5960a326750d5838078e36cf38b85af677262",
      "status": "completed",
      "conclusion": "success"
    },
    {
      "number": 3,
      "name": "Run actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020",
      "status": "completed",
      "conclusion": "success"
    },
    {
      "number": 4,
      "name": "Check serial v2 isolation and trace controls",
      "status": "completed",
      "conclusion": "failure"
    },
    {
      "number": 5,
      "name": "Check serial loader boundary controls",
      "status": "completed",
      "conclusion": "skipped"
    },
    {
      "number": 6,
      "name": "Check serial entry pin reuse",
      "status": "completed",
      "conclusion": "skipped"
    },
    {
      "number": 7,
      "name": "Run declared full104 controls only",
      "status": "completed",
      "conclusion": "skipped"
    }
  ],
  "logs": {
    "fetchedOnce": true,
    "chars": 17623,
    "preflightFrames": 0,
    "fullV2Frames": 0,
    "boundaryFrames": 0,
    "unitFrames": 0,
    "unavailableFrames": 0,
    "observedFixedError": "AFW_Q1_SERIAL_LAB_PREFLIGHT_FAILED",
    "errorTime": "2026-11-15T22:23:45.0622987Z",
    "exit": 1
  },
  "actualFull520Invoked": false,
  "actualProcessCaseMeasurements": 0,
  "fixtureResultsObserved": "unknown: no valid preflight frame",
  "cause": "not established by sanitized logs; static task review required",
  "v2Qualified": false,
  "I3Closed": false,
  "C2Released": false,
  "NativeReleased": false,
  "providerRuntimeReadOrChanged": false,
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

The new Source occurrence is consumed; do not repeat it. No actual 520 qualification. Sourceclosuremustpreservewholeproposal+thisreceipt andrestoreoriginalF7. Sourceclosure doesnotaccreditCloudflareruntimeclosure.
