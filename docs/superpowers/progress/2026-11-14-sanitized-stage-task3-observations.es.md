# AFW Task3 — evidencia primaria saneada y consumo independiente Root

Fecha14nov2026. Solo lectura de metadata finalverify y TRESparesdiagnósticos literalmenteasignados. NoNative/contracts/producerlogs, archivoscifrados/modelos/clave, Suitefallback ni otrocontexto. ZIPestricto2JSON/ranges/EOF/CRCknownvector/fatalUTF8/canonical/schema16KiB/current9context/job/finiteenums/manifest/API-uploader-rawdigest binding PASS para los3pares. Se conservaron tamaño/hash/CRC de cada result/manifest abajo. Nombres/IDs son referencias técnicas de este ensayo sintético, sin datosclientes.

## Resultado e incertidumbre

WholetrialFAILED; businessQ8+Native8=16 NOaceptado. CincojobsSUCCESS,readonlyFAILURE,reduction_consume_bSKIPPED explícito,verifyFAILURE. Ambospreparadores tienenrawOutcomesuccess ycompletanmetadatadescarga/verificación/escritura conHTTP200. Readonly expone rawOutcome FAILURE del pasoCOMPUESTO, sealcode EXACTO **custody_limit**, sitecustody_20; commandcodeunknown, metadata/countmissing, stageunknown/httpnull/countChecknot_observed. No se identifica cuál límite, casoR1/R2/R3 ni causa del fallo interno del paso a partir de eso. No se infiere causa histórica ni reparaciónproveedor. SuiteSAFE literalnoasignado: publication_unavailable/proofabsent/acceptedfalse; NOdescargaSuite.

La fuente pública produceCheckpoint declara deferWait=false por defecto (finite-owner-cleanup-persistence.mjs:70), y después de cleanup espera C0-120000 (:138). WorldprepareBudgetProducer yprepareReductionProducer llaman ese flujo sin deferWaittrue. Esto explica que la arquitectura PREVEA una espera larga, no acredita el punto exacto de espera actual ni unincidenteCF; originalC0=I0+900000 no se cambió.

REST deljobSKIPPED devuelve started15:22:01 ycompleted15:22:00 (1sno-monótono). Se conserva como metadatafechada de unjobnoejecutado; no compensar relojes ni inferircron/proveedor/hallazgoglobal. Todos8statuscompleted acreditados por Root; Sourceexecutorrestauródespués.

```json
{
  "observedAtUTC": "2026-11-14T15:26:49Z",
  "context": {
    "repository": "tokenizartinfo-ops/agent-friendly-web",
    "repositoryId": "1347578006",
    "ref": "refs/heads/feat/finite-native-cleanup-20261101",
    "source": "c44db8cf2d08bdbb15287026e3ca93c3155ae5f1",
    "tree": "049314b0962089400424dc25e80a488320eee893",
    "workflowBlob": "9614b64c67a293118fb5983868699abac5fd16bd",
    "run": "43608448872",
    "attempt": 1,
    "node": "22.23.4"
  },
  "run": {
    "id": "43608448872",
    "attempt": 1,
    "status": "completed",
    "conclusion": "failure"
  },
  "jobs": [
    {
      "id": "132488025732",
      "name": "contracts",
      "status": "completed",
      "conclusion": "success",
      "startedAt": "2026-11-14T15:07:25Z",
      "completedAt": "2026-11-14T15:08:11Z"
    },
    {
      "id": "132488245736",
      "name": "reduction_prepare",
      "status": "completed",
      "conclusion": "success",
      "startedAt": "2026-11-14T15:08:16Z",
      "completedAt": "2026-11-14T15:22:00Z"
    },
    {
      "id": "132488245757",
      "name": "readonly",
      "status": "completed",
      "conclusion": "failure",
      "startedAt": "2026-11-14T15:08:15Z",
      "completedAt": "2026-11-14T15:11:24Z"
    },
    {
      "id": "132488245845",
      "name": "positive_prepare",
      "status": "completed",
      "conclusion": "success",
      "startedAt": "2026-11-14T15:08:16Z",
      "completedAt": "2026-11-14T15:22:09Z"
    },
    {
      "id": "132492091570",
      "name": "reduction_consume_a",
      "status": "completed",
      "conclusion": "success",
      "startedAt": "2026-11-14T15:22:05Z",
      "completedAt": "2026-11-14T15:24:10Z"
    },
    {
      "id": "132492093014",
      "name": "reduction_consume_b",
      "status": "completed",
      "conclusion": "skipped",
      "startedAt": "2026-11-14T15:22:01Z",
      "completedAt": "2026-11-14T15:22:00Z"
    },
    {
      "id": "132492136639",
      "name": "positive_consume",
      "status": "completed",
      "conclusion": "success",
      "startedAt": "2026-11-14T15:22:14Z",
      "completedAt": "2026-11-14T15:24:03Z"
    },
    {
      "id": "132492710716",
      "name": "verify",
      "status": "completed",
      "conclusion": "failure",
      "startedAt": "2026-11-14T15:24:13Z",
      "completedAt": "2026-11-14T15:24:22Z"
    }
  ],
  "literalAssignments": [
    {
      "job": "positive_prepare",
      "state": "assigned",
      "artifactId": "14119776284",
      "zipSha256": "c3dddc0ebeb48fbd897f683b2b205d6b25588df66bd72c8afc26c8f974dda3a9"
    },
    {
      "job": "reduction_prepare",
      "state": "assigned",
      "artifactId": "14119682967",
      "zipSha256": "4b1287d69ed7c17be542b560e7eb1fd4ead948492a9b378d8a0c9ab8e5c421cb"
    },
    {
      "job": "readonly",
      "state": "assigned",
      "artifactId": "14119507842",
      "zipSha256": "95eada759d9157a8739049b8371624808fae8c6fd0646e5ca007d7a65672ff30"
    }
  ],
  "artifactMetadata": [
    {
      "job": "positive_prepare",
      "id": "14119776284",
      "name": "afw-stage-positive_prepare-safe-c44db8cf2d08bdbb15287026e3ca93c3155ae5f1-43608448872",
      "bytes": 1217,
      "digest": "sha256:c3dddc0ebeb48fbd897f683b2b205d6b25588df66bd72c8afc26c8f974dda3a9",
      "expired": false,
      "createdAt": "2026-11-14T15:22:06Z",
      "expiresAt": "2026-11-21T15:22:06Z"
    },
    {
      "job": "reduction_prepare",
      "id": "14119682967",
      "name": "afw-stage-reduction_prepare-safe-c44db8cf2d08bdbb15287026e3ca93c3155ae5f1-43608448872",
      "bytes": 1219,
      "digest": "sha256:4b1287d69ed7c17be542b560e7eb1fd4ead948492a9b378d8a0c9ab8e5c421cb",
      "expired": false,
      "createdAt": "2026-11-14T15:21:57Z",
      "expiresAt": "2026-11-21T15:21:57Z"
    },
    {
      "job": "readonly",
      "id": "14119507842",
      "name": "afw-stage-readonly-safe-c44db8cf2d08bdbb15287026e3ca93c3155ae5f1-43608448872",
      "bytes": 1211,
      "digest": "sha256:95eada759d9157a8739049b8371624808fae8c6fd0646e5ca007d7a65672ff30",
      "expired": false,
      "createdAt": "2026-11-14T15:11:21Z",
      "expiresAt": "2026-11-21T15:11:20Z"
    }
  ],
  "rootIndependentChecks": [
    {
      "job": "positive_prepare",
      "zipBytes": 1217,
      "zipSha256": "c3dddc0ebeb48fbd897f683b2b205d6b25588df66bd72c8afc26c8f974dda3a9",
      "files": [
        {
          "name": "manifest.json",
          "bytes": 567,
          "sha256": "2b5c145e5610ed7bcba803705d7f3b8ae62d44b0425d16248101843beed86f40",
          "crc32": "b95f4e16"
        },
        {
          "name": "result.json",
          "bytes": 1076,
          "sha256": "e1151fe9f0e0d88b2e232c441a36e0ad12d7d21bc27ca17694d7a61be2b1dc0f",
          "crc32": "550ed6eb"
        }
      ],
      "summary": {
        "job": "positive_prepare",
        "rawOutcome": "success",
        "logs": [
          {
            "log": "command",
            "availability": "available",
            "code": "unknown",
            "site": "unknown"
          },
          {
            "log": "seal",
            "availability": "available",
            "code": "unknown",
            "site": "unknown"
          },
          {
            "log": "metadata",
            "availability": "available",
            "code": "unknown",
            "site": "unknown"
          },
          {
            "log": "count",
            "availability": "missing",
            "code": "unknown",
            "site": "unknown"
          }
        ],
        "stage": {
          "state": "complete",
          "stage": "write_files"
        },
        "http": 200,
        "countCheck": "not_observed",
        "resultBytes": 1076,
        "resultSha256": "e1151fe9f0e0d88b2e232c441a36e0ad12d7d21bc27ca17694d7a61be2b1dc0f",
        "manifestBytes": 567,
        "manifestSha256": "2b5c145e5610ed7bcba803705d7f3b8ae62d44b0425d16248101843beed86f40",
        "allNonclaimsFalse": true
      }
    },
    {
      "job": "reduction_prepare",
      "zipBytes": 1219,
      "zipSha256": "4b1287d69ed7c17be542b560e7eb1fd4ead948492a9b378d8a0c9ab8e5c421cb",
      "files": [
        {
          "name": "manifest.json",
          "bytes": 568,
          "sha256": "336321aac09e0c28435661029a1291390c206d37d066ff27f4b17f9f6f8faf6f",
          "crc32": "5ea83eda"
        },
        {
          "name": "result.json",
          "bytes": 1077,
          "sha256": "a30eb525f1f9943b4a8510bc12a549793cf5668f61e25ccacb73f0c8960123e5",
          "crc32": "52b0c8ad"
        }
      ],
      "summary": {
        "job": "reduction_prepare",
        "rawOutcome": "success",
        "logs": [
          {
            "log": "command",
            "availability": "available",
            "code": "unknown",
            "site": "unknown"
          },
          {
            "log": "seal",
            "availability": "available",
            "code": "unknown",
            "site": "unknown"
          },
          {
            "log": "metadata",
            "availability": "available",
            "code": "unknown",
            "site": "unknown"
          },
          {
            "log": "count",
            "availability": "missing",
            "code": "unknown",
            "site": "unknown"
          }
        ],
        "stage": {
          "state": "complete",
          "stage": "write_files"
        },
        "http": 200,
        "countCheck": "not_observed",
        "resultBytes": 1077,
        "resultSha256": "a30eb525f1f9943b4a8510bc12a549793cf5668f61e25ccacb73f0c8960123e5",
        "manifestBytes": 568,
        "manifestSha256": "336321aac09e0c28435661029a1291390c206d37d066ff27f4b17f9f6f8faf6f",
        "allNonclaimsFalse": true
      }
    },
    {
      "job": "readonly",
      "zipBytes": 1211,
      "zipSha256": "95eada759d9157a8739049b8371624808fae8c6fd0646e5ca007d7a65672ff30",
      "files": [
        {
          "name": "manifest.json",
          "bytes": 559,
          "sha256": "42b22bcad71ef0cfe9a32abcbbf0dd4c9cccd5ca6603128ced986e4e0e6b3045",
          "crc32": "59c94329"
        },
        {
          "name": "result.json",
          "bytes": 1066,
          "sha256": "02a1286611f46a8785c912aa2a47b227e2cd521be790a3dea989c32e46867e5e",
          "crc32": "22a4cf06"
        }
      ],
      "summary": {
        "job": "readonly",
        "rawOutcome": "failure",
        "logs": [
          {
            "log": "command",
            "availability": "available",
            "code": "unknown",
            "site": "unknown"
          },
          {
            "log": "seal",
            "availability": "available",
            "code": "custody_limit",
            "site": "custody_20"
          },
          {
            "log": "metadata",
            "availability": "missing",
            "code": "unknown",
            "site": "unknown"
          },
          {
            "log": "count",
            "availability": "missing",
            "code": "unknown",
            "site": "unknown"
          }
        ],
        "stage": {
          "state": "unknown",
          "stage": null
        },
        "http": null,
        "countCheck": "not_observed",
        "resultBytes": 1066,
        "resultSha256": "02a1286611f46a8785c912aa2a47b227e2cd521be790a3dea989c32e46867e5e",
        "manifestBytes": 559,
        "manifestSha256": "42b22bcad71ef0cfe9a32abcbbf0dd4c9cccd5ca6603128ced986e4e0e6b3045",
        "allNonclaimsFalse": true
      }
    }
  ],
  "suiteReadback": [
    {
      "marker": "AFW_COHERENT_SUITE_READBACK/1",
      "kind": "suite",
      "source": "c44db8cf2d08bdbb15287026e3ca93c3155ae5f1",
      "run": "43608448872",
      "attempt": 1,
      "artifactId": null,
      "uploadedDigest": null,
      "status": "unavailable",
      "reason": "publication_unavailable",
      "proof": "absent",
      "metadataBytes": null,
      "metadataDigest": null,
      "rawZipBytes": null,
      "rawZipSha256": null,
      "resultBytes": null,
      "resultSha256": null,
      "manifestBytes": null,
      "manifestSha256": null,
      "expiresAt": null,
      "producerStatus": null,
      "upstream": "not_all_seven_success",
      "accepted": false,
      "programHashes": {
        "adapter": "3c36b155aab486f82fb9b89f55e0b61ffe01be4a7502350391784195e552b6d0",
        "controls": "1f2d53a7ae00b215634c0d6c9aaa40134e725d561d4334ef827ca54a418df261",
        "verifier": "94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf",
        "safeZip": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"
      },
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    }
  ],
  "business16Accepted": false,
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
```

Todas7nonclaimsfalse. Nooperationalreadiness, autorizaciónPCoff, nuevaejecución, desvío deprivacidad ni ampliación depermisos desde este recibo. Siguiente: cierre/reviewTask3 y diagnóstico Sourceacotado deReadonly; no aumentar límites ni repetir igual sin nuevaevidencia.
