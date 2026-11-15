# AFW active close checkpoint

{
  "state": {
    "project": "AFW",
    "repository": "tokenizartinfo-ops/agent-friendly-web",
    "phase": "serial-v2-close-prepared-after-preflight-failure",
    "SourceBranch": "feat/finite-native-cleanup-20261101",
    "sourceClosed": "dace0ec995e1f89599d3c1faf72b018db82e67a1",
    "sourceTree": "0ee8006a9b7f6461c4bd3d51e5c99ac8dcf4d3ec",
    "sourceActive": "f6e400f5af7fea2d35506cd7542b5e718660f8d9",
    "sourceFrozen": true,
    "Main": "0c9c475b3ebaa970fc11d628b40e50a90cceb727",
    "F7": "f7a71f1a0fa4f5ddf069ff411f008a098455e5cc",
    "SAME": {
      "blob": "192f884c8df658b7e22dd4f67207fd376a4b216f",
      "bytes": 2569436,
      "sha256": "7e93b5ab25e76421334183ae3681044a574f6c6e603790c9aa85d3a737a67c77"
    },
    "Core": {
      "leaves": 3201,
      "bytes": 324448,
      "sha256": "aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703"
    },
    "Rootdocs": "04557b92fc83c0ff18955e4cc2db8ed908628ca2",
    "serial": {
      "task": 1,
      "actor": "/root/serial_pin_reuse_impl",
      "checkpoint": "cccdca64f6e7801f68e75d13ba5163b3b351983d",
      "SourceReleased": true,
      "testsPending": false,
      "gate": "190c039d46c3eb37bb5b44d8ee6b44bc93113cb4",
      "index": "a989902d52e032a53675ff9a4e25ba44d3f4aa35",
      "actualPending": false,
      "run": 43758071013,
      "job": 132946447644,
      "qualified": false,
      "actualFull104Invoked": false,
      "actualFailure": "unit loader duplicate wire SyntaxError",
      "close": "a128bde0a3b3cf354a3a8ba751a5b8ebcefec72b",
      "reviewer": "/root/serial_pin_task_review",
      "reviewPackage": "4c6b87195d7ac9291abf0e47665c79a3f11115f8",
      "reviewPending": false,
      "fixRound": 1,
      "review": "f07a1ffbf7693cf1cc37e891cbcacbdfd86d66da",
      "reviewCounts": {
        "critical": 0,
        "important": 0,
        "minor": 0,
        "deferredMinor": 1
      },
      "fixBrief": "8114f3404b06087928eab4318f64b000f41753ff",
      "fix1": {
        "source": "d58803469eef47866ede083ddb6a1ce9b22e4c13",
        "tree": "6d018efd09dc7071e6cac428692fa4d23d57b1dd",
        "gate": "a151e40c647e7446775cff54d6adca0ab4bdeb01",
        "actualPending": false,
        "run": 43762213703,
        "jobId": 132959307956,
        "boundaryStepObserved": "success",
        "unitStepObserved": "success",
        "full104": "failure",
        "logsFetched": true,
        "boundaryControlsPassed": true,
        "unitControlsPassed": true,
        "full104Qualified": false,
        "close": "dace0ec995e1f89599d3c1faf72b018db82e67a1"
      },
      "strategyRetired": true,
      "task1Complete": true
    },
    "I3Open": true,
    "C2Released": false,
    "NativeReleased": false,
    "ownerActionNeeded": false,
    "providerRuntimeReadThisBlock": false,
    "historicalCauseProven": false,
    "receiptAuthenticated": false,
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false,
    "globalNativeDrainVerified": false,
    "sdkNamespaceEmptyVerified": false,
    "serialV2": {
      "actor": "/root/serial_v2_impl",
      "plan": "0244ace61c57f0846773929b15a4c172a78a26dd",
      "brief": "b73fa72c7f4b98ea4a5dad672a4c99011551bebf",
      "SourceReleased": true,
      "protocol": "e5e6770187ea336d6e71940674e19254d8b844d0",
      "testsPending": true,
      "index": "e41f042ba2495cd8b86d59842a3c41d4390d8a53",
      "refinementPending": false,
      "prepared": {
        "commit": "f6e400f5af7fea2d35506cd7542b5e718660f8d9",
        "activeTree": "1631f122f28701dc775be6d38671f0d5b6cc5f35",
        "inactiveTree": "bde1e4d88dcd6e3864ad6a665f7c12cac863bb1e",
        "parent": "dace0ec995e1f89599d3c1faf72b018db82e67a1",
        "F7": "7bdc774db2f25126ff8f98f26674b4481126b674",
        "SAME": "ba48a984ad74faec404852eb14a7b3a7ec9338f4",
        "oneUseMessage": "AFW-Q1-SERIAL-LAB-V2-ONEUSE-20261115",
        "SourceReleased": false
      },
      "actualPending": true,
      "gate": "82a075136949b689e577e46de8c91760d03b62ec",
      "run": 43769046439,
      "jobId": 132980579610,
      "logsFetched": true,
      "full520Invoked": false,
      "closePrepared": {
        "commit": "49ee71ead8d52cb5d474d820d57828115f912923",
        "tree": "98c2121f98962d4a4c7d24b2d313f42aca014172",
        "parent": "f6e400f5af7fea2d35506cd7542b5e718660f8d9",
        "SAME": "3d7e28e25040ebc09fcf217801d3a2e7b6920e72",
        "originalF7": "f7a71f1a0fa4f5ddf069ff411f008a098455e5cc",
        "receipt": "80158ec70685926975d3e301b218bf3ad3dd03fc"
      }
    },
    "sourceActiveTree": "1631f122f28701dc775be6d38671f0d5b6cc5f35"
  },
  "preparedClose": {
    "commit": "49ee71ead8d52cb5d474d820d57828115f912923",
    "tree": "98c2121f98962d4a4c7d24b2d313f42aca014172",
    "parent": "f6e400f5af7fea2d35506cd7542b5e718660f8d9",
    "SAME": "3d7e28e25040ebc09fcf217801d3a2e7b6920e72",
    "originalF7": "f7a71f1a0fa4f5ddf069ff411f008a098455e5cc",
    "receipt": "80158ec70685926975d3e301b218bf3ad3dd03fc"
  },
  "logsFetched": true,
  "SourcePending": null,
  "RootdocsBefore": "9b19028c50de934a7c6db37570949b7072dc540b"
}

PriorityRootclose Sourcef6e400f5->49ee71ead8d52cb5d474d820d57828115f912923 afterfreshlease/run/jobs/queueschecks. Logs43769046439/job132980579610 consumedonce; noSourcefullexecutionprefail/steps5–7skipped. Keepactualcauseunknownpendingstaticreview. Do notretryv2run; SourceoriginalF7andallSAME+receiptready. C2/Nativeheld,7claimsfalse.
