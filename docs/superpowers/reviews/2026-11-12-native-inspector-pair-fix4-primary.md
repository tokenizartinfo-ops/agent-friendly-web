# Inspector fix4 — independent currentpair and transport evidence

2026-11-12 16:34UTC. AFW Source/SYN only. Sole keyless run43258702864/attempt1/head7a58b9631bccbcc29f8b8d254895f00e11d89650/tree6d9b748f0d37be0da9e6a8927f686d6d8c087d8b/WF7ecce8862bfa542f13f86ab4f9b4426e4b88ed66: SUCCESS. Root primary run/jobs/rawtimestamps: producer13132382419216:26:37–16:26:49 SUCCESS; verifier13132397005416:26:51–16:26:57 SUCCESS; workflowterminal16:26:58. Serialkeyless/no retries, 91CORE+16ZIP/capture+16newACTUALpaircontrolsGREEN. I7/I8baselineRED STATICONLY perRootrulingf36d974c; noexecutedoldbaselineclaim. Original954inertcounterexamples inside91 are separatealreadyexecutedchecks.

Paircontrols use exactCURRENTvalidateInspectionPair materializedfromsameDTOstring asactualreader, in bounded5s credentialless child viaenv-i/syntheticSHA0/run1/node--no-experimental-fetch BEFOREnetwork. Parent/realmetadata/currentartifact/OriginalAAD identity untouched; currentmetadatarecordstillactualhead7a58/run43258702864. Syntheticpairvalues neverpublishedasoriginalresult orauthority. Positive observedfail/skipped/todo tested asDIAGNOSTICcompatibility; nativequalificationnotclaimed.

## Independent complete safe artifact audit

Artifact13961714753/1824B/SHA b2997086e3c9658ff4fa318b919e9c03d5ee91c9d5baf135bbc1cae6a8b9e92d, expires2026-11-19T16:26:43Z. Root boundedRAM-onlydownloadonce, size/SHA/localcentral/CRC/paths/ranges/noextras/exact2JSON/strictschema/91uniqueorderedIDs/currentcontext/manifest/core verified; temporaryURLcleared. No originalcipher13949168304/key/SDK/I0/nativecase access.

```json
{
  "id": 13961714753,
  "zipBytes": 1824,
  "zipSha256": "b2997086e3c9658ff4fa318b919e9c03d5ee91c9d5baf135bbc1cae6a8b9e92d",
  "completeInventory": true,
  "strictSchema": true,
  "coreSha256": "d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246",
  "coreBytes": 77002,
  "controls": 91,
  "elapsedMs": 81,
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
      "sha256": "682c95ef80c68cc2cf3cdefede6b5f5755873aee91ab8e42c7a351b9dbc979fd",
      "crc32": "18409647"
    },
    {
      "name": "manifest.json",
      "bytes": 334,
      "sha256": "3d510fbd4e171ce7e09ede59a46da758d8994334931a745c74c12feb6bd8cd32",
      "crc32": "8c8b88fe"
    }
  ]
}
```

## Strict closed records and Sourcecode hashes

Root extractedEXACT4runtimeJSONrecords (excludingcodeecho), eachASCII<=2048B, strictkeys/enums/contexts/16uniqueorderedIDs+statuses/allpass/firstfailure null/metadata200776B/threeidenticalZIPdigests/result+manifesthashes/flagsfalse. Reconstructedcurrentverifierfrom7a58workflowasDATA(noSourceexecution),39,644B/SHA573f9c32... exactlymatchesruntime; unchangedCore77,002Bd514 andZIP13,305Bb36c. Pairtestbody and patchedDTO/driver identicalbetweenexecuted7a58 and finalc433.

```json
{
  "strictRecords": true,
  "producerControls": 91,
  "zipControls": 16,
  "inspectionPairControls": 16,
  "baselineI7I8Red": "STATIC_ONLY",
  "metadataHTTP": 200,
  "metadataBytes": 776,
  "coreSha256": "d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246",
  "verifierBytes": 39644,
  "verifierSha256": "573f9c32f21b2a9809b7b5bcf953cea2ef2b3a3a376d6efaef3aaaeab3079fda",
  "safeZipModuleSha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d",
  "sourceReconstructionVerified": true,
  "tripleSHA": "b2997086e3c9658ff4fa318b919e9c03d5ee91c9d5baf135bbc1cae6a8b9e92d",
  "readiness": false
}
```

```json
[
  {
    "marker": "INSPECTION_PAIR_CONTROLS",
    "expected": 16,
    "completed": 16,
    "pass": 16,
    "fail": 0,
    "inventory": [
      {
        "id": "observed_pass",
        "status": "passed"
      },
      {
        "id": "observed_failure",
        "status": "passed"
      },
      {
        "id": "observed_skip_todo",
        "status": "passed"
      },
      {
        "id": "result_source",
        "status": "passed"
      },
      {
        "id": "result_run",
        "status": "passed"
      },
      {
        "id": "manifest_source",
        "status": "passed"
      },
      {
        "id": "manifest_run",
        "status": "passed"
      },
      {
        "id": "foreign_pair",
        "status": "passed"
      },
      {
        "id": "fixture_count",
        "status": "passed"
      },
      {
        "id": "unexamined",
        "status": "passed"
      },
      {
        "id": "two_records",
        "status": "passed"
      },
      {
        "id": "unknown_case",
        "status": "passed"
      },
      {
        "id": "wrapper_only",
        "status": "passed"
      },
      {
        "id": "manifest_bytes",
        "status": "passed"
      },
      {
        "id": "manifest_digest",
        "status": "passed"
      },
      {
        "id": "case_order",
        "status": "passed"
      }
    ],
    "firstFailure": null
  },
  {
    "marker": "SAFE_ZIP_CONTROLS",
    "expected": 16,
    "completed": 16,
    "pass": 16,
    "fail": 0,
    "inventory": [
      {
        "id": "validator_capture_after_success",
        "status": "passed"
      },
      {
        "id": "validator_rejection_identity_no_capture",
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
    ],
    "failure": null
  },
  {
    "marker": "AFW_METADATA_READBACK/1",
    "source": "7a58b9631bccbcc29f8b8d254895f00e11d89650",
    "run": "43258702864",
    "attempt": 1,
    "assignedArtifactId": "13961714753",
    "stage": "complete",
    "firstFailedPredicate": "none",
    "reason": "none",
    "httpStatus": 200,
    "receivedBytes": 776,
    "timeoutObserved": false,
    "verified": true
  },
  {
    "marker": "AFW_SAFE_READBACK/1",
    "kind": "controls",
    "source": "7a58b9631bccbcc29f8b8d254895f00e11d89650",
    "run": "43258702864",
    "attempt": 1,
    "artifactId": "13961714753",
    "coreSha256": "d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246",
    "verifierSha256": "573f9c32f21b2a9809b7b5bcf953cea2ef2b3a3a376d6efaef3aaaeab3079fda",
    "safeZipModuleSha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d",
    "producerCoreVerified": true,
    "sourceCoreVerified": true,
    "safeControlsPass": true,
    "metadataVerified": true,
    "rawZipVerified": true,
    "inventoryVerified": true,
    "producerControlCount": 91,
    "zipBytes": 1824,
    "metadataZipBytes": 1824,
    "uploadDigest": "b2997086e3c9658ff4fa318b919e9c03d5ee91c9d5baf135bbc1cae6a8b9e92d",
    "metadataDigest": "sha256:b2997086e3c9658ff4fa318b919e9c03d5ee91c9d5baf135bbc1cae6a8b9e92d",
    "rawZipSha256": "b2997086e3c9658ff4fa318b919e9c03d5ee91c9d5baf135bbc1cae6a8b9e92d",
    "resultBytes": 7940,
    "resultSha256": "682c95ef80c68cc2cf3cdefede6b5f5755873aee91ab8e42c7a351b9dbc979fd",
    "manifestBytes": 334,
    "manifestSha256": "3d510fbd4e171ce7e09ede59a46da758d8994334931a745c74c12feb6bd8cd32",
    "stage": "complete",
    "reason": "none",
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false,
    "globalNativeDrainVerified": false,
    "sdkNamespaceEmptyVerified": false
  }
]
```

## Current inactive candidate

Sourcec433b92519a6f5c0eb25e2896d66e2fd67283fc7/treed6040d79d47c4cb63b8c8a8d3c02cfe2ff4d6438; WF43a926fd522632ba2f48d31d2799d2f59e34a67b/147034chars; reportb3efc0f728f43e0b9d634a2c18929419437571fd/221937chars. Rootfullbodies/ref/reportprefixchecked, complete7f..c4332commit/twopathU10diffs validatedallhunks/gaps/tails(31216WF+15459reportchars), 3188otherpathsprotected. Core/ZIP/DTO/driver/PAIRTESTS exactcoveredSource; manual/noinputs/noPush/BOTHfalse/5+2proposal; keyonlyexistingopenstep, verifierkeyless. RootSourcein_progress/queued/waiting/pending/requested0at16:34UTC. FreshwriterSTOP; originalwriterSTOP.

Actualprivateinspection STILLUNRELEASED, fullNative16/RcauseUNKNOWN, allreadinessfalse. SAMEreviewer scopedI7/I8+newbreakage next, M2deferred. Passingcontrols/transport is notprivateinspection/Nativequalification/PCoff.
