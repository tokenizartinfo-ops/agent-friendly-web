# AFW — comprobación independiente del contrato de informe, ronda 2

Se ejecutó únicamente el receptor propio Root sobre datos de ejemplo. No se ejecutó Source, no se lanzó GitHub Actions ni se modificó runtime. Los resultados sintéticos no acreditan funcionamiento AFW.

```json
{
  "dateUTC": "2026-11-15 08:14:58 UTC",
  "matrixBlob": "baa7b277322832c41cd76c74b6d4350d226f645f",
  "matrixHash": "95a6d8e04dae765e2a0957042c09a06ea3c5ce50bad4c48a627e8799e19976f2",
  "schemasBlob": "fbffb6156e18d07b231bf06bfd4dd7ecf7382285",
  "ownReceiver": "38749c663f4dd58fbb5f1a3c940a3820c4ff5100",
  "positiveAccepted": 4,
  "qualified": 1,
  "negativeRejected": 12,
  "negativeCases": [
    "matrix previous hash",
    "100th row omitted",
    "new rows falsely reordered",
    "mutant kill singleton falsely retained",
    "context foreign source",
    "private extra field",
    "false allPassed on observed failure",
    "false allPassed on cleanup failure",
    "false allPassed on budget exhaustion",
    "wrong count",
    "unexpected changed expected mutant kills",
    "unknown cleanup identity"
  ],
  "SourceExecuted": false,
  "NativeReleased": false,
  "operationalReadiness": false
}
```
