# AFW Source close intent

{
  "intent": {
    "commit": "49ee71ead8d52cb5d474d820d57828115f912923",
    "tree": "98c2121f98962d4a4c7d24b2d313f42aca014172",
    "parent": "f6e400f5af7fea2d35506cd7542b5e718660f8d9",
    "SAME": "3d7e28e25040ebc09fcf217801d3a2e7b6920e72",
    "originalF7": "f7a71f1a0fa4f5ddf069ff411f008a098455e5cc",
    "receipt": "80158ec70685926975d3e301b218bf3ad3dd03fc"
  },
  "activeSource": {
    "commit": "f6e400f5af7fea2d35506cd7542b5e718660f8d9",
    "activeTree": "1631f122f28701dc775be6d38671f0d5b6cc5f35",
    "inactiveTree": "bde1e4d88dcd6e3864ad6a665f7c12cac863bb1e",
    "parent": "dace0ec995e1f89599d3c1faf72b018db82e67a1",
    "F7": "7bdc774db2f25126ff8f98f26674b4481126b674",
    "SAME": "ba48a984ad74faec404852eb14a7b3a7ec9338f4",
    "oneUseMessage": "AFW-Q1-SERIAL-LAB-V2-ONEUSE-20261115",
    "SourceReleased": false
  },
  "actualReceipt": {
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
  },
  "logsConsumed": true,
  "SourceCASPending": false
}

RestoreoriginalF7,preserveentireba48proposal+Rootreceipt3d7e28,actualrunandalljobsterminal. ReconcileSourceactualrefbeforeCAS/retry. Sevenclaimsfalse. Actualfull520notinvoked.
