# Inspección nativa del historial QA: aceptada y cerrada

31 de octubre de 2026. Resultado acotado: se leyó el historial técnico real desde el Workflow y Durable Object propios, sin modificar KV; QA volvió a su versión cerrada y se verificó independientemente. No acredita ARM nominal, primera reserva, suscripción, entrega útil, retirada nativa ni PC-off. operationalReadiness=false.

## Procedencia y cualificación

PR683/main4ebb4b66 incorporó el lector HTTP de quiescencia, sin montarlo. PR684/main834fc5c4b570de374a8af9a91aaafe21e6744bb7/árbol7589650f18c7e3d87b51e3d102d6c4ac48411f82 incorporó el inspector heredado y su runbook. Head revisado62614159:0P1/P2. CI41246506297/job124670941835:14sealed/698focused/4213fullPASS,0FAIL,1skip previo,lint0errores/14advertencias previas; paquetes disparados exitosos. RED3fc0bda/41246324988 reprodujo las tres fugas de settlement/plazo monótono y se corrigieron antes de integrar.

La cualificación GET-only de GitHub41247253336/job124673144475 ejecutó18/18 pruebas nativas contra los bytes EXACTOS de BASE c570b60b-95dc-48e1-89f3-9c4651691dbc (395915B/SHA4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f), no sólo el fixture de fuente actual. Conservó constructors/alarm/handlers/default; código BASE sólo en runner efímero, artefacto saneado.

## Ejecución única

La intención6549887484 quedó cerrada sin efectos: un rechazo de compilación y una preparación blocked/mutationIssued=false, cero POST; nunca se reutilizó. El programa corregido pasó una preparación separada GET-only (cuatro lecturas, ninguna mutación) antes de la intención nueva6549932226.

ID 4e79abca76282be139870a30e6c84d51f94c51dc113a407b62d9bcc969b2e6a5. Ventana original 2026-10-31T22:22:43.179Z–2026-10-31T22:27:43.179Z; retirada administrativa separada hasta2026-10-31T22:30:43.179Z. Consumida, no reabrir. Una carga inactiva784d0cd0-b939-4379-b05d-03090f16da9a; un deployment temporalb5a87a4f-82ff-4c54-b6f4-1d195166ff11; una instancia afw-qa-legacy-inspect-4e79abca76282be139870a30e6c84d51f94c51dc113a407b62d9bcc969b2e6a5. Tiempos primarios: queued2026-10-31T22:23:51.131Z, start2026-10-31T22:23:53.212Z, end2026-10-31T22:23:53.432Z, statuscomplete/successtrue. El recibo devolvió source834fc5c4 y runtimeVersionId784d0cd0, correlacionados externamente; no se usó el versionId opaco de la API Workflows como UUID Worker.

Los tres módulos se verificaron antes de activar y restaurar: closed-rollback.mjs395915B/SHA4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f; index.mjs13019B/SHA92b68f52c5a2126c9609113f8acee394924e0738078a9a5dcf4b1884f6c7a657; inspection-context.mjs419B/SHA6008bd3ea63c286ed8058a16ec76b22039b0a1367e5dfeb326cc08919bac67b2. Herencia explícita BASE31, nunca latest/settings32; catorce flagsfalse/siete políticasvacías y runtime/exports preservados. No nuevas credenciales, bindings, migraciones ni namespace.

## Hallazgo primario saneado

Dos snapshots primarios seleccionados estables, storageWritesIssued=false. El DTO sólo contiene metadatos; no extrae política, cápsula, grants ni datos owner.

```json
{
  "legacy": {
    "present": true,
    "shape": "recognized",
    "timeShapeReady": true,
    "hash": "3791d920451c8530b69d3a15a5dd7ceeee2035760a0f2516a8c984023c64fda1",
    "armedAt": 1793378345640,
    "withdrawnAt": 1793378527958,
    "startAt": 1793378460000,
    "expiresAt": 1793378520000
  },
  "journals": [
    {
      "key": "restoration",
      "present": false,
      "hash": null,
      "bytes": 0,
      "phase": "absent",
      "recognizedPurpose": false,
      "uncertain": false
    },
    {
      "key": "retirement",
      "present": false,
      "hash": null,
      "bytes": 0,
      "phase": "absent",
      "recognizedPurpose": false,
      "uncertain": false
    },
    {
      "key": "prepared_dispatch",
      "present": true,
      "hash": "2ae51fb3ee0891295ae5166b51bb82bfba9969791ca16571fabe81fb35cef72a",
      "bytes": 357,
      "phase": "issued",
      "recognizedPurpose": true,
      "uncertain": true
    },
    {
      "key": "reduction_dispatch",
      "present": true,
      "hash": "91a48a933c3a88fd341e64222644e786b7303597227351618ff0776bf3fe49eb",
      "bytes": 281,
      "phase": "complete",
      "recognizedPurpose": true,
      "uncertain": true
    }
  ],
  "hasUncertainJournal": true,
  "generation": {
    "headPresent": false,
    "infoCount": 0,
    "controlCount": 0,
    "inventoryComplete": true,
    "requiresReview": false,
    "hash": "34ab759181cc592817c3a47433e39730e8d88e07fd36f04079e73eae0c88eaaf"
  }
}
```

Legacy presente, armado, retirado y vencido: la forma temporal satisface el parser anterior. Es evidencia real, no un fixture. V2 HEAD/INFO/CONTROL ausentes. Prepared_dispatch sigue ISSUED; reduction_dispatch dice complete pero ambos journals presentes conservan incertidumbre hasta su parser completo. No marcarlos como terminados, borrarlos, repararlos ni inferir cierre a partir del puntero actual.

## Restauración comprobada

Una restauración conocida c570 a22:24:36.736UTC, DEP2e1a5866-0a35-4033-952d-7220d316f437. Readback independiente 2026-10-31T22:24:57.381Z:25GET, BASE y perfiles externos/config/hashes exactos; QA31bindings/14false, canary29/8false, operador7/3false; cron/tailsvacíos, QA noexpuesta, Containeractivo[], dos namespaces intactos, registroWorkflow completo y19instanciasterminales. Canary2607/DEP7b5a3683 y operador855/DEP979026f8 no cambiaron. No se borraron versiones/historial.

## Siguiente cierre pendiente

Preparación privada de datos y predecesor desde almacenamiento primario; el DTO saneado no sustituye el control literal ni valida los journals completos. Integrar ARM V2 con identidad nativa, fuente frozen315, pins originales, elegibilidad sin reservas y ledger CAS; conservar la incertidumbre legacy y la denegación de sus efectos ante V2. Después guard/finalizer, recorrido nominal y retirada verificable, y sólo entonces ensayo PC-off coordinado. Monitor LOCAL PAUSED, Max sin usar.

Evidencia durable: issue497#6549851146 (source y BASE), #6549911869 (intento sin efectos), #6549932226 (intención nueva), #6549972475 (aceptación y cierre). El estado descrito es fechado, no garantía futura.
