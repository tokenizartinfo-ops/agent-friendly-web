# Cierre de una identidad QA: preparación y evidencia

8 de octubre de2026. Componente interno `lib/assistance-service-identity-disable.mjs`; sin montaje, credencial administrativa, transporte de escritura ni despliegue.

PR338 preparó la acción y su lectura primaria: mergeab94037bffd1dc209eae69ae240156f6762b1e5c; CI37853049101/headb82a983,1262 pruebas aprobadas,0 fallos,1 omisión, lint/build correctos. Esta aceptación de código no acreditaba los efectos reales de Cloudflare.

## Problema observado y corrección

La API PUT acepta `enabled:false`, pero omitir el nombre no conserva ese dato. En una identidad nueva, propia, desactivada y de diez minutos, la comparación primaria22:26:59UTC detectó `name` diferente y conservó id/client identity/creación/duración/expiración/versión. El adaptador anterior devolvía unknown ante esa diferencia; no acreditaba una restauración inexistente.

La corrección envía únicamente `enabled:false` y el nombre capturado de la lectura primaria cuyo digest coincide con la aprobación. No envía duración, rotación, vencimiento de la clave anterior, políticas ni bindings. Exige `exclusiveQa:true` en configuración confiable del servidor; no se puede utilizar como cierre general de identidades compartidas. Esa declaración no es prueba de exclusividad ni CAS: el catálogo futuro debe resolver la propiedad exclusiva del recurso.

La regresión reprodujo el comportamiento del proveedor y falló antes del cambio; luego pasaron15 pruebas focales (ocho de identidad y siete de readback administrativo), con lint focal correcto y revisión independiente sin P1/P2. La CI del head final es el gate de integración de la corrección.

## Ensayos y reversión

Se crearon tres identidades desactivadas con duración10m, sin entregar ni usar sus claves y sin conectarlas a políticas o aplicaciones. Primer ensayo: resultado incompleto porque la lectura404 de limpieza interrumpió el recibo; no se acepta como comprobación de preservación. Los dos siguientes separaron creación, efecto y limpieza para conservar la referencia antes de mutar.

El ensayo de omisión sobre `acd381c1-b8bd-4e54-8acf-3b1ad32a188e` detectó el cambio de nombre. Se eliminó exclusivamente esa identidad nueva; DELETE y ausencia primaria confirmados22:27:29UTC.

El cuerpo corregido sobre `0e1d2970-ec16-4c24-b85b-d56b460224b1` conservó los nueve campos comparados y el estado disabled en lectura primaria22:30:06UTC. DELETE y ausencia primaria confirmados22:30:08UTC. La conciliación de lista completa22:30:46UTC encontró cero candidatos con nombre de estos ensayos y cero identidades sin nombre/de10m creadas en la ventana del primer ensayo; no se eliminó ningún recurso inferido por nombre o fecha.

Receipts metadata-only locales: output/afw-service-token-omission-20261008.json, output/afw-service-token-staged-cleanup-20261008.json, output/afw-service-name-corrected-provider-20261008.json, output/afw-service-name-corrected-cleanup-20261008.json y output/afw-service-token-cleanup-reconciliation-20261008.json. No contienen claves ni client IDs. Las identidades preexistentes, selector Access, Workers y D1 permanecieron fuera de estas mutaciones.

## Límites y siguientes gates

La comprobación real fue disabled→disabled, directamente en el proveedor; no demuestra el recorrido activo→disabled del módulo ni custodia independiente. El fence local evita repeticiones en una instancia; entre reinicios se requiere el fence persistente del coordinador ya preparado. Respuestas perdidas se concilian por GET sin repetir PUT.

Preparar transporte de escritura con origen/rutas/body fijos y plazo acotado, catálogo de recursos QA exclusivos y custodia privada; luego una ocurrencia propia integrada y cierre independiente. No restaurar un conjunto a partir de esta constancia de identidad. PC-off integrado y preview/aprobación/ingreso de Max siguen pendientes; no hay guardia permanente ni envío a clientes.

Fuente técnica consultada8oct: [API de actualización de service tokens](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/service_tokens/methods/update/). El schema describe campos; las comparaciones primarias anteriores establecen el comportamiento realmente observado.
