# Inspector fix3 — independent cross-job cryptographic evidence

2026-11-12 16:08UTC. PROJECT AFW; repo tokenizartinfo-ops/agent-friendly-web/public1347578006; Source/SYN only, originGitHubconnector. Exactlyone attempt43253820290/1, push, headf7368b790216482910932e45ebb7e52dc45c471c/treeb02e6cd2ffd4622cd5db2a93ccee0a2e7fd5e971/WF3d5b54657ef8c100a0b82dbbcd19bc71ee7c01f6: overallSUCCESS. Root primary run+alljobsteps+rawjobstimestamps readbacks:

- producer131306581984 SUCCESS 16:00:00–16:00:11UTC;91currentinertcontrols/localproof/upload/gate success.
- verifier131306721812 SUCCESS 16:00:13–16:00:30UTC; fixedSource reconstruction/16separateZIP+capturecontrols/metadata/rawdownload/fullinventory success. Verifier started afterproducerterminal; maxoneactivejob, no retry/poll/sleep. Workflowterminal16:00:31UTC.

This proves the testedsequence works, NOT why earlierimmediate metadata returned404 (runner/jobtoken alsochanged). Prior404cause remainsUNKNOWN, nottoken/providerrepairclaim. Originalencryptednativeartifact13949168304, AFWkey, SDK/I0/businesscases NOT accessed.

## Complete safe proof, Root independent RAM audit

Assignedartifact13959882163,1825B,SHA1d37df747a9da298d5f472db27f78e9f44e50e5e62da849796a4a2631e1181c9, expires2026-11-19T16:00:05Z. Source/run/branch/name/retention match primarymetadata. Root downloaded onlythissmallpublicsafeZIP once intoRAM and verified exactSHA/length/local+central/descriptor/ranges/noextras/CRCknownvector/exact2JSON/strictschemas/91uniqueorderedIDs/allpass/context/manifesthashes. TemporarydownloadURLremoved afteraudit.

```json
{
  "id": 13959882163,
  "zipBytes": 1825,
  "zipSha256": "1d37df747a9da298d5f472db27f78e9f44e50e5e62da849796a4a2631e1181c9",
  "completeInventory": true,
  "strictSchema": true,
  "coreSha256": "d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246",
  "coreBytes": 77002,
  "controls": 91,
  "elapsedMs": 41,
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
      "sha256": "654f7c424dab3609941ab98a3770af93394dac97f8684a8a02a6b2638da0d895",
      "crc32": "b22c112f"
    },
    {
      "name": "manifest.json",
      "bytes": 334,
      "sha256": "049fac9f363da4ba435419f4682ff83f85c55018df501dc204f7cfc127efcbd2",
      "crc32": "7a4f57c4"
    }
  ]
}
```

## Closed runtime records and independent code reconstruction

Root extracted EXACT3runtimeJSONrecords, excludingcodeecho; eachASCII≤2048B, strictkeys/enums/context/counts/IDs/hashes/readinesschecked. RawZIP(module)SHA and generatedverifierSHA reconstructed from f736Source as DATAonly, no Sourceprogram execution, then matchedruntime. CORE current77002B/d514 is byte-exact82/f736/final7f; currentvalidatorbodyunchanged, approvedpassivecaptureseam separate.

```json
{
  "strictRecords": true,
  "producerControls": 91,
  "safeVerifierControls": 16,
  "metadataHTTP": 200,
  "metadataBytes": 776,
  "coreSha256": "d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246",
  "verifierBytes": 39282,
  "verifierSha256": "ec07235cd6ba641dca203755e0e944d810136c634e144df1fbb97caacfc0f059",
  "safeZipModuleBytes": 13305,
  "safeZipModuleSha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d",
  "sourceReconstructionVerified": true,
  "tripleSHA": "1d37df747a9da298d5f472db27f78e9f44e50e5e62da849796a4a2631e1181c9",
  "readiness": false
}
```

```json
[
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
    "source": "f7368b790216482910932e45ebb7e52dc45c471c",
    "run": "43253820290",
    "attempt": 1,
    "assignedArtifactId": "13959882163",
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
    "source": "f7368b790216482910932e45ebb7e52dc45c471c",
    "run": "43253820290",
    "attempt": 1,
    "artifactId": "13959882163",
    "coreSha256": "d514b1906a8ab6bde818a1aba6f99a9f1a3ee91814f88b28560013d23f657246",
    "verifierSha256": "ec07235cd6ba641dca203755e0e944d810136c634e144df1fbb97caacfc0f059",
    "safeZipModuleSha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d",
    "producerCoreVerified": true,
    "sourceCoreVerified": true,
    "safeControlsPass": true,
    "metadataVerified": true,
    "rawZipVerified": true,
    "inventoryVerified": true,
    "producerControlCount": 91,
    "zipBytes": 1825,
    "metadataZipBytes": 1825,
    "uploadDigest": "1d37df747a9da298d5f472db27f78e9f44e50e5e62da849796a4a2631e1181c9",
    "metadataDigest": "sha256:1d37df747a9da298d5f472db27f78e9f44e50e5e62da849796a4a2631e1181c9",
    "rawZipSha256": "1d37df747a9da298d5f472db27f78e9f44e50e5e62da849796a4a2631e1181c9",
    "resultBytes": 7940,
    "resultSha256": "654f7c424dab3609941ab98a3770af93394dac97f8684a8a02a6b2638da0d895",
    "manifestBytes": 334,
    "manifestSha256": "049fac9f363da4ba435419f4682ff83f85c55018df501dc204f7cfc127efcbd2",
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

## Complete inactive candidate and scope

Source7f213f4f3aa9162b148e9f55c2efa9599a0efb0f/treee26a4c5c8e50137173234617e68cd6d93c2d7f89; WF537caafba053ed6f1b5de7f0f2648d17cec5bcf5/140647chars; report4cf882bb6ec8cfc3f1af0033594744c62783b70a/211432chars. Root independentlyref/fullbodies checked. Comparea51..7f has2commits/onlyWF+appendreport,3188protectedpaths unchanged; f736..7f completeU10diff validatedagainstfullbefore/afterhunks/gaps/tails (59078chars). RealcandidateSourceCORE, ZIPmodule, DTO+driver are EXACTcoveredbytes. Manual/noinputs/noPush/BOTHfalseguards, limits5+2min; existingkeybindingonlyoneopenstep/producerenvironment, keylessverifier, READBACK_KINDinspection. RootSource in_progress/queued/waiting/pending/requested all0 at16:08UTC. WriterSTOP. No actualprivateinspection release yet;5+2 remainspreparedproposalpendingfullreview/Rootexplicitamendment.

Allreadinessfalse. OriginalNative16/R1–R3cause/statusUNKNOWN; current91+16 are INSPECTORcontrols, notoriginal16qualification orPCoff. Fullsame-reviewer candidate reviewnext; I5/M1addressed, I6controls integration nowobservedpass pendingfullactualcandidatevalidation; M2deferred.
