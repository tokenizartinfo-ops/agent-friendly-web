# AFW — gate Root: diagnóstico inicial único

Fecha 2026-11-15 10:40:11 UTC.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT Source QA GitHub Actions; ORIGIN feat/finite-native-cleanup-20261101; RESOURCE_TYPE ref/workflow; RESOURCE_ID .github/workflows/afw-finite-budget-qualification.yml. ALLOWED_ACTION una sola ocurrencia **INITIAL-ONLY**, intento1, sin controles, captura de helpers, CLI original, Native ni runtime/credenciales/OAuth/OTP/clientes.

Se permite CAS Root desde Source cerrado **dfed0449d2f401554f98e962d3cb7c8fcc95bd1c** al commit preparado **45bd4941ddda6959d9d2a00c9e88d02f1c2ddcb9**, árbol **119038aca05c47eda7200e9aa6f07dee6b16f1dc**, mensaje **AFW-R3-STARTUP-DIAGNOSTIC-R3-ONEUSE-20261115**. No es una repetición de43697701677 ni ejecuta104. Las candidatas previas0bc/303f/5b116/b098 no se publicaron y están supersedidas.

Prelease:
```json
{
  "dateUTC": "2026-11-15 10:39:08 UTC",
  "source": "dfed0449d2f401554f98e962d3cb7c8fcc95bd1c",
  "main": "0c9c475b3ebaa970fc11d628b40e50a90cceb727",
  "fiveActiveZero": true,
  "leaves": 3203,
  "diff": [
    ".github/workflows/afw-finite-budget-qualification.yml",
    "docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md"
  ]
}
```

## Cotejo previo y autoridad

Informe append completo **1a4c456925508e59d5d1e41c2176e9606ef0d91f**; paquete DATA **50db752ab8f07195471519b1641358d340932be7**, manifiesto7 **e781d2047381c1a80e5c2bbbb1b5fbf2cc6ee2b8**, mirror **9d6b70c8210898c0931e2aa5f863e51fb0174a98**, patch **3c0b851bee071a1baf46c222ae9efc17fc39e48a**. Se preservan como archivos completos alcanzables en esta rama docs antes de CAS.

Root verificó cada fuente por bytes/SHA256/GitBlob, espejo base64/gzip/descompresión completa, SAME/prefijo entero1717394, candidato hijo directo/cierre, árbol completo3203/soloF7+SAME/Core3201igual/Main0c9c y18b88exactos. El bootstrap recupera el R2histórico9bf2 de su bloque único DENTRO del prefijo validado, no después; su parent1fe solo identifica procedencia. No nuevo assertParent o fetch extra. Binding/tree son de HEAD actual. Se cotejó el patch reversible de shim y prelude contraR2 y la igualdad byteexacta del commonouter25794B dentro del MISMO módulo compilado, sin invocación. Programa39903=14108+LF+25794; se mantiene la superficie de parseo para no ocultar posibles fallos. No se comprobó sintaxis ni ejecutó Source enPC.

```json
{
  "raw": {
    "bytes": 216107,
    "sha256": "d5693de23ef8df2d147a2b8a819c3d9aadc6267cd47f120ec04f61d7f70d3200",
    "gitBlob": "50db752ab8f07195471519b1641358d340932be7"
  },
  "gzip": {
    "bytes": 64245,
    "sha256": "a2c42f73fab175591b32e02fc573698072640b291b7669e1ab116d235425cfac",
    "gitBlob": "70a2d325643d5ef3cc7983ce427bfa0179185195"
  },
  "mirror": {
    "bytes": 85660,
    "sha256": "2882dc15c2c675b009b542d186287056f5d49247c0d58200e0a9c8dbb6241638",
    "gitBlob": "9d6b70c8210898c0931e2aa5f863e51fb0174a98"
  },
  "manifest": {
    "bytes": 1294,
    "sha256": "0048cc3417982775fc6cecbd3ef78e2232980e7705335014b9c8f052c6f1f866",
    "gitBlob": "e781d2047381c1a80e5c2bbbb1b5fbf2cc6ee2b8"
  },
  "same": {
    "bytes": 1723002,
    "sha256": "d861e2647c662d1f12aa3fd98222abd24587598bbe09eb215963c617d65ed90d",
    "gitBlob": "1cf1144154f8f5f26c914cbef0bfdaf6b68d645c"
  },
  "prefix": {
    "bytes": 1717394,
    "sha256": "def4eeed7aea141f278d4324d53bcddb874c41bf92fdf9081160bce8fb5b33af",
    "gitBlob": "1a0e30469a4c0c09399f28eaf4ca2d4c59070f79"
  },
  "sources": [
    {
      "name": "initial-shim.py",
      "cap": 32768,
      "bytes": 7788,
      "sha256": "f95e22f2dff97f2057c15bf695b97c8bfeebe94940ba1ec0ea7baa74c70f257f",
      "gitBlob": "a8b5c6caf8e6af50196f3fabc11904ffbfb981c8"
    },
    {
      "name": "initial-node-prelude.mjs",
      "cap": 32768,
      "bytes": 14108,
      "sha256": "d43782c2738e642cbb68ac3f7f3d87410a5f6641c00f4d8a65b9d63548ee3cd7",
      "gitBlob": "6ba589390fcec92b3dcfaa7f1260b70c8024c31b"
    },
    {
      "name": "initial-node-common.mjs",
      "cap": 32768,
      "bytes": 25794,
      "sha256": "1c8094cb913f8ae06d553b1b29d54bf89ad654524d6afab3f647791057c934aa",
      "gitBlob": "8a74fe67af2c1a870b9964f0f5c17c2514986e36"
    },
    {
      "name": "initial-node.mjs",
      "cap": 65536,
      "bytes": 39903,
      "sha256": "734547d8efecca63c89672ba4abaf82ee6f5ad66cfb5a17f8736dd90767a31d8",
      "gitBlob": "34859a884de58391d11f965c1fb7aea464312ea1"
    },
    {
      "name": "trace-formatter.py",
      "cap": 32768,
      "bytes": 2193,
      "sha256": "bcc297154f283193b46ec144094b45b9493ce2bbfa3abf8eef4b65d78e39c639",
      "gitBlob": "d2e7a492c70651aeb17561efb3797d2597c72c44"
    },
    {
      "name": "inactive-f7.yml",
      "cap": 65536,
      "bytes": 58412,
      "sha256": "6bf60ee7c5a0397f6d896eb17ec07a57b973787f25bf99ae2762e4a936b69a84",
      "gitBlob": "02957956ad7e70a5dbc37568343cb6c39a43a47e"
    },
    {
      "name": "active-f7.yml",
      "cap": 65536,
      "bytes": 58679,
      "sha256": "1453246dfad2177644e8fe859b4d35f3d42855ea189a32890d4857faf8335a8b",
      "gitBlob": "db7b88bcf3164462821fcfc21bbf2ee70705c2ce"
    }
  ]
}
```

Rulings783ede8c/8ad93567/eefed353/a546babc/aff71a6d. Helpers/piezas≤32768; programa bootstrap/F7 son artefactos separados≤65536. Raw≤400500/gzip98304/base64131072/SAME1800000; sin reloj nuevo, Source job7min/Node22.23.4/Ubuntu24.04/contentsread, actionpins exactos y checks de presencia sin valores.

## Único recibo y significado

Contrato **a4ff0bf3a8c771a3bb28dc661261a2033fc7d8d3**, schema **aa82dbe4e99dbba23754a745c8d5d25c9be8d375**, ejemplos **86a93b68afbbf31f5a32f3f8666ec05744952c50** ya fijados. Receptor Root independiente **a2da3cb46ee5b3a67c728ca109c6bbe978e28016** y traza **08f0acb71a17947e985eb36f12ebcfc25d14b8e1**, 7+/20- y10+/11- propios, sin Source.

Marker AFW_R3_DELIVERY_STARTUP_DIAGNOSTIC/1. Publicación única≤2048B; registro privado≤256B solo etapas fijas. FD10lector/11writer propios separados, mismo inode600 unlinked, estrictos metadatos/bytes/prefijo; todo stdout/stderr del bootstrap suprimido y formatterliteral final. No capturado se invoca: el registro no se acepta como autoridad durante futuras capturas. Ausente/malformado→unknown; lastObserved nunca significa causa exacta fallida.

BootstrapAdmitted solo con resultado declaradobootstrap_admitted, traza completa y step real success. Aun entonces qualified/operationalReadiness/NativeReleased false. Siempre controlesInvoked0,originalCLIInvoked0,nativeBusinessCases0 y7nonclaimsfalse. No104PASS ni cierreI3 desde ese resultado.

## Ejecución y cierre

Tras CAS congelar Source. Descubrir exactamente un run de este head/path/evento/intento1; no redisparar ni mover durante ejecución. Consumir único wire real usando receptor externo y outcome real del step, conservar también fallo/unknown sin reinterpretación.

Al terminar todos los jobs: restaurar F7original **f7a71f1a0fa4f5ddf069ff411f008a098455e5cc**, preservar íntegra propuesta SAME **1cf1144154f8f5f26c914cbef0bfdaf6b68d645c** y añadir evidencia saneada. Verificar fulltree/Core/Main, archivos completos/hashes, cinco activos0 y cierreheadruns0. No Content API vacía para SAME>1MB: obtener Gitblob completo.

Si se admite bootstrap, rebasear full104 contra ese cierre y evaluar gate SEPARADO. Si no, decidir siguiente cambio desde observación sin hunch/replay/activación automática. Ronda3 y su revisión acotada siguen pendientes. No runtime Cloudflare leído ni modificado; causaR3original desconocida. Los siete no-acreditados permanecenfalse y no pedir apagar el ordenador.
