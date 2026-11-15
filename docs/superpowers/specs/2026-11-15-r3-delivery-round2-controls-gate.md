# AFW — gate Root, ronda 2 de controles de entrega

Fecha: 2026-11-15 09:06:53 UTC.

## Alcance de la única operación

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT Source QA sintético en GitHub Actions; ORIGIN rama feat/finite-native-cleanup-20261101; RESOURCE_TYPE ref Git y workflow; RESOURCE_ID .github/workflows/afw-finite-budget-qualification.yml; ALLOWED_ACTION una sola ocurrencia nueva de CONTROLES, intento1, sin main/CLI original/Native, runtime Cloudflare, credenciales, OAuth o datos de clientes.

Root autoriza mover la rama mediante CAS desde1fe20347bd9c86d9343799a5994f9f3e3a4a339f al commit preparado **81703533efc6ee8614665981d2eb7aef4d68f5a1**, árbol **d99c61e311307006df765fa7c1cf0b8a0f20189f**, mensaje único **AFW-R3-DELIVERY-R2-CONTROLS-ONEUSE-20261115**. La candidata DATA6577d0d5e3e59b7965cbfe7ebe3ee5f86e30c86e no se publica como rama. La mutación prevista tiene exactamente F7+SAME; Main no se modifica. No repetir una ejecución previa ni reintentar automáticamente esta ocurrencia.

Lease comprobado:
```json
{
  "dateUTC": "2026-11-15 09:05:41 UTC",
  "source": "1fe20347bd9c86d9343799a5994f9f3e3a4a339f",
  "main": "0c9c475b3ebaa970fc11d628b40e50a90cceb727",
  "queued": 0,
  "in_progress": 0,
  "waiting": 0,
  "requested": 0,
  "pending": 0
}
```

## Evidencia previa

Revisión aceptada861c4d1f54242d91ce755fd58da7861c31088540 y briefc9f18e08edbe65bd7f8901568ff3a33f657564c7. Ronda2 de5, mismo implementador. Informe completo append-only275501ca854b2231586a0ed8047132c1831e9dd7 preservado como archivo en esta rama docs. Los bloqueos de borrador quedaron revisados estáticamente; todavía no hay controles100 medidos.

Root verificó árbol completo3.203 hojas, diferencias exactas F7+SAME, Core3.201 hojas intactas, los18 programas congelados exactos, prefijo SAME1.600.042 bytes completo y Source/Main sin cambios. Verificó33 helpers por bytes/SHA256/GitBlob, diez autoridades y framing, archivo gzip extraído de SAME y descompresión byteexacta, ambos F7, mismo outer literal en tres entradas, mismo lifetime.py literal en F7, roles inicial/anidado, único exec común, gate repositorio/evento/rama/intento/mensaje, postludio Bash y ausencia de los pins de matrices retirados. No se evaluó, importó, comprobó sintaxis ni ejecutó Source en el PC.

```json
{
  "payload": {
    "bytes": 400168,
    "sha256": "322ef87839eb99970145ee65972e16e8fc3963ec04d68c5efbf5a6fcb9988eaf",
    "gitBlob": "9bf2e58b836d7fe75c59adafb7e420e2f42113b1"
  },
  "manifest": {
    "bytes": 5289,
    "sha256": "6afa58bbd4e58fa15867a208581b9d1c9140ff8b6a4a25503f20a9622f0d3324",
    "gitBlob": "668c3704eef5b8b1186ac59bed3e0ef5b2330993"
  },
  "activeF7": {
    "bytes": 54419,
    "sha256": "dd3ce56a0cb94c0fcaec21f4385cb07241a1b1c560cd99eec7b661780845f882",
    "gitBlob": "8f8bc1431a00faff1d5d851953136bcdf29a1166"
  },
  "inactiveF7": {
    "bytes": 54146,
    "sha256": "1f62e2f1bd4da234efa2c516929aa84a71422913743bd2ae224be7fd9bc817cc",
    "gitBlob": "b93d337c5418a4ac607441d8975f7f2a9ad8efcd"
  },
  "same": {
    "bytes": 1715466,
    "sha256": "d1a80a98df444e52c3e07f0f3fcda67021a2c2efeeaeaaf99905cd4fd2b151b2",
    "gitBlob": "6bc44eee2574c618a91c36bdd857fa4094ec230d"
  },
  "prefix": {
    "bytes": 1600042,
    "sha256": "2d883e68dfaaa6db5901b9ece3aca84e350ca36b51050cbd8d2b4f4036b4762d",
    "gitBlob": "35abeda77948f5ac8c0ddc1718739c7d56e01e08"
  },
  "gzip": {
    "bytes": 81621,
    "sha256": "cc0067415a5118ef90569801db1dc874ef5498d7bd72eae9047fd074503a5a63",
    "gitBlob": "cebe1dcf3c4dd001002bea6e81a13cde971e7fb7"
  },
  "base64": 108828,
  "core": {
    "bytes": 324448,
    "sha256": "aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703",
    "gitBlob": "1c632e55be1cb7fc1b1e854aba4781ea3fcc296d"
  },
  "production": {
    "bytes": 95518,
    "sha256": "cfcb0dc7992d27246dc785ef2991104f6715e61c9aa49cfddc0317b219e6ac91",
    "gitBlob": "b88ebef9a2aa979772d20bfb778cbfe463dc3011"
  },
  "helperCount": 33,
  "helperBytes": 271921,
  "helperMax": 28887
}
```

Límites aprobados raw400500/helper32768/SAME1800000/gzip98304/base64131072. Matriz100 baa7b277322832c41cd76c74b6d4350d226f645f / SHA25695a6d8e04dae765e2a0957042c09a06ea3c5ce50bad4c48a627e8799e19976f2; schemasfbffb6156e18d07b231bf06bfd4dd7ecf7382285; ejemplosfbd7525c44a4706275f2a30eb471f38f9d15da20, declarados antes de ejecución y sin cambios. Cuatro mutantes sobre todos100: [D02], [P06], [B05,U01], [S01]. Harness90s/admisión20s y demás relojes originales no cambian. La cobertura puede no caber: cualquier resto queda UNKNOWN y no califica.

Receptores independientes externos: informe38749c663f4dd58fbb5f1a3c940a3820c4ff5100 (cuatro positivos aceptados, solo uno calificado, doce negativos rechazados); indisponible91d9339be63ca5ff5a39fe69f01a54b4f38bb657 (seis positivos/catorce negativos); envelopefc579ca30a7a2a6388a34740c8f4edaa2a73cb73; preflight de pins087099540c15caacecc5f629151502aa609ff6d2. Son comprobaciones propias sobre ejemplos, no resultados Source.

## Consumo y cierre obligatorios

Tras CAS: congelar Source; descubrir exactamente un run del head81703533efc6ee8614665981d2eb7aef4d68f5a1, intento1/path/evento correctos, conservar resultado real y esperar todos los jobs terminales. No mover la rama ni redisparar mientras esté activo. Validar únicamente wire real con contexto Source/tree/run correctos mediante receptor externo. Un fallback conserva mediciones desconocidas; un fallo o UNKNOWN nunca se convierte en PASS.

Al terminar: restaurar F7 originalf7a71f1a0fa4f5ddf069ff411f008a098455e5cc, conservar íntegra la propuesta SAME6bc44eee2574c618a91c36bdd857fa4094ec230d y añadir solo evidencia factual saneada de la ejecución. Verificar árbol completo/Core/Main, ambos archivos y hashes, cinco estados activos vacíos y cierre sin ejecución inesperada. Preservar informe/diff/recibo completos como archivos alcanzables, no solo SHAs. Entonces reactivar revisión ACOTADA por /root/r3_delivery_task_review sobre I01+N01–N06 y regresiones de esta corrección. No revisión amplia del carrier retirado.

I3 y Native siguen retenidos hasta esa evaluación. Una futura observación Native necesita controles reales ligados al mismo contexto Source/run; no renombrar mediciones anteriores ni usar fixtures sintéticos como evidencia.

No hay lectura actual de runtime/proveedor en este bloque. Los siete no-acreditados siguen false; no pedir apagar el ordenador. Gabriel no debe intervenir antes de11:30UTC.
