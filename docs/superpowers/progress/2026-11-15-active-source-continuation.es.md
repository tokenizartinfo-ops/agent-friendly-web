# AFW active Source continuation

FIX3 ONE-USE ACTIVO.

{
  "prepared": {
    "commit": "ef41b65dd5402092a6de3977532a8fffcac59d81",
    "activeTree": "ff3691c4bedcd855b66ba69485ce8f20d920e537",
    "inactiveTree": "45850c8f684161854f6ec636149faa3e5f1e5bb3",
    "parent": "b26843c72dccc9bdcf9a9771e59faeff077c6461",
    "F7": "54aa12557867127bf85d5707845e400a19b662d5",
    "SAME": "bb58ba7ebe5bcca0cd27e4a2ec0050f220460225",
    "oneUseMessage": "AFW-Q1-SERIAL-LAB-V2-FIX3-ONEUSE-20261115",
    "SourceReleased": false
  },
  "gate": "083cb71b7337ca099bca9a726e514600cb0d76f9",
  "phaseContract": "b240b62b0c0bf0c0dd74e8621536a70a22272efc",
  "run": "await identification",
  "SourceFrozen": true,
  "rollback": {
    "parent": "ef41b65dd5402092a6de3977532a8fffcac59d81",
    "F7": "f7a71f1a0fa4f5ddf069ff411f008a098455e5cc",
    "preserveEntireCandidateSAME": true,
    "fullActualReceiptBeforeClose": true,
    "compactAppendMax": 1024,
    "spareAfterCloseMin": 1024,
    "fullReadback": "Source/commit/tree/F7/fullSAME/Core/Main/5queues/closedheadruns"
  },
  "allSevenFalse": true,
  "I3Open": true,
  "NativeHeld": true,
  "C2Held": true
}

No unchanged retry/refetch. Terminal run+job, logsONCE; finite reported phases only, not firstcause. Full receipt Rootdocs beforeclose, originalF7+wholeSAME+compactreceipt<=1024; full readback beforependingnull. Provider/runtime unread; no owneraction.
