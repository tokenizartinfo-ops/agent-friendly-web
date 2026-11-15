# AFW — resultado real y cierre, controles ronda 2

El intento43697701677/1 terminó con fallo de arranque. Único wire: controls-unavailable/outer_startup_unavailable. Las cien mediciones y los cuatro mutantes permanecen desconocidos; cero Native. No se acredita la causa del fallo original R3. No repetir esta ocurrencia.

Se restauró F7 original y se preservó íntegra la propuesta más el recibo. El cierre se verificó con archivos completos (SAME por Git blob, ya que Contents API omite el cuerpo de archivos >1MB), árbol, hashes, Main y cinco estados activos vacíos.

```json
{
  "actual": {
    "recordedUTC": "2026-11-15 09:10:38 UTC",
    "run": 43697701677,
    "attempt": 1,
    "job": 132761789616,
    "source": "81703533efc6ee8614665981d2eb7aef4d68f5a1",
    "sourceTree": "d99c61e311307006df765fa7c1cf0b8a0f20189f",
    "conclusion": "failure",
    "checkout": "success",
    "setupNode": "success",
    "preparationAndControls": "failure",
    "actualWire": "AFW_R3_DELIVERY_CONTROLS_UNAVAILABLE/1 {\"purpose\":\"afw.r3-delivery.controls-unavailable.v1\",\"reason\":\"outer_startup_unavailable\",\"source\":\"unknown\",\"sourceTree\":\"unknown\",\"run\":\"unknown\",\"attempt\":\"unknown\",\"job\":\"unknown\",\"node\":\"unknown\",\"allPassed\":\"unknown\",\"expected\":100,\"passed\":\"unknown\",\"failed\":\"unknown\",\"unknown\":\"unknown\",\"results\":\"unknown\",\"mutants\":\"unknown\",\"nativeBusinessCases\":0,\"nonclaims\":{\"historicalCauseProven\":false,\"receiptAuthenticated\":false,\"operationalReadiness\":false,\"completePackage\":false,\"PCoff\":false,\"globalNativeDrainVerified\":false,\"sdkNamespaceEmptyVerified\":false}}",
    "acceptedByRoot": "91d9339be63ca5ff5a39fe69f01a54b4f38bb657",
    "expectedControls": 100,
    "measurements": "unknown",
    "NativeBusinessCases": 0,
    "originalCLIExecuted": false,
    "originalR3CauseProven": false,
    "consumed": true,
    "retryAllowed": false,
    "operationalReadiness": false
  },
  "closure": {
    "dateUTC": "2026-11-15 09:13:17 UTC",
    "SourceClosed": "dfed0449d2f401554f98e962d3cb7c8fcc95bd1c",
    "tree": "2321d0294c43a442160f151da9232abf357b146f",
    "SAME": {
      "bytes": 1717394,
      "sha256": "def4eeed7aea141f278d4324d53bcddb874c41bf92fdf9081160bce8fb5b33af",
      "gitBlob": "1a0e30469a4c0c09399f28eaf4ca2d4c59070f79"
    },
    "F7": "f7a71f1a0fa4f5ddf069ff411f008a098455e5cc",
    "Main": "0c9c475b3ebaa970fc11d628b40e50a90cceb727",
    "fiveActiveZero": true,
    "closedHeadRuns": 0,
    "fullFilesReadback": true,
    "fullTreeScopeVerified": true,
    "NativeReleased": false
  }
}
```
