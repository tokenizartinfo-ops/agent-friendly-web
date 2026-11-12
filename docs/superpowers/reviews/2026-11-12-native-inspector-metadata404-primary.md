# AFW inspector fix2 — observed metadata404, independent proof

2026-11-12 15:34UTC. AFW Source/SYN only, repository tokenizartinfo-ops/agent-friendly-web/public1347578006. Sole keyless controls run43248453374/attempt1 atSource82cb1cf51a89e88f065b10ee1ca162956c1dafc7/treefd20138d74298a4cb20ba27b26319b7c1696a307/WFfcd20785d8a6e9233d3a4949560550220435d172. Job131287433221:91fixtures, localproof, upload SUCCESS; metadataFAILURE; payloadinventorySKIPPED; overallFAILURE. All91currentchecksPASS45ms, notintegrationgreen.

Root independently extracted the EXACTONE runtime JSON diagnostic from the primary job log, strict316B record (code-echo lines excluded):

```json
{
  "marker": "AFW_METADATA_READBACK/1",
  "source": "82cb1cf51a89e88f065b10ee1ca162956c1dafc7",
  "run": "43248453374",
  "attempt": 1,
  "assignedArtifactId": "13959006495",
  "stage": "response",
  "firstFailedPredicate": "http_status",
  "reason": "metadata_identity",
  "httpStatus": 404,
  "receivedBytes": 0,
  "timeoutObserved": false,
  "verified": false
}
```

This proves the request received HTTP404 at response/http_status before bodydecode/field/digest checks; reportedreceivedBytes0/timeoutObservedfalse. It does NOT prove a token, permission, provider or timing cause, nor retrospectively identify the earlier run43244518810's unknown failure. No rotation/reconnect is warranted by this evidence.

Safeartifact13959006495,1825B,SHA4506c493886b8aca18fe02f45af23f39b7f30b59501750205db57bd09be9788b; expires2026-11-19T15:30:16Z. Root RAM-only SHA/size/localcentral/noextras/ranges/CRC/exact2JSON/schema/context/91IDs/order/manifest/corehash audit:

```json
{
  "id": 13959006495,
  "zipBytes": 1825,
  "zipSha256": "4506c493886b8aca18fe02f45af23f39b7f30b59501750205db57bd09be9788b",
  "completeInventory": true,
  "strictSchema": true,
  "coreSha256": "d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246",
  "coreBytes": 77002,
  "controls": 91,
  "elapsedMs": 45,
  "counterexamples": {
    "workflowBlob": "97b37fec44696dde23daa013196a5acdb05c2f4d",
    "verdictCounterexample": "executed_inert",
    "digestCounterexample": "executed_inert"
  },
  "readiness": false,
  "files": [
    {
      "name": "result.json",
      "bytes": 7940,
      "sha256": "ebec426495431e868cf931b806b87021179897c3da3617150b761358444ab752",
      "crc32": "38597421"
    },
    {
      "name": "manifest.json",
      "bytes": 334,
      "sha256": "083abd567ea3255e30869695134c063c9c6137631ae3c5cbbd6e69cd5d7c1653",
      "crc32": "bea3c7aa"
    }
  ]
}
```

No nativeartifact13949168304, key, SDK/I0 or actualoriginalcase data accessed. Allreadinessfalse. Temporary safe-download URL removed afteraudit.

Safeclosurea51c074e89ff2b4c3d5105388939d2c516f6b77c/tree64b0042ed34fc10c5f8facb09b81f8ada63d80bd/exactF7a71manualsevenfalse/report95f5d131b0d9d57e61ed845a017ca5f8d733fcf6. Root ref/fullWF/reportprefix checked; compare844..a51contains2commits and finalonlyreportdelta (workflow returnedexactF7), source in_progress/queued/waiting countsall0 at15:34UTC. WriterSTOP; no repair/retry released.

Official REST and upload-action docs show no documented digest/field mismatch and document v4 immediate availability, but examples do not guarantee eachfieldpresence/timing. No blanket must-wait-for-run-terminal conclusion. Sources: https://docs.github.com/en/rest/actions/artifacts#get-an-artifact and https://github.com/actions/upload-artifact/blob/v4/README.md#improvements .

Separate dated evidence supports testing a cross-job boundary without assigning cause: originalNative43229236340 positive_consume and reduction_consume_a had successful “Authenticate assigned producer before any cold mount” steps; Source1978 nativeWF uses same singular REST artifact endpoint there, after each producerjobcompleted. Their own encrypted sameIDreadbacks are different (download+open), so do notclaim they proved immediate samejobmetadata. This is a sequencing hypothesis with precedent, not a cause or repair claim. ActualR1–R3cause/status remainsUNKNOWN.
