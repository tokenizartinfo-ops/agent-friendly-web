# AFW: recorrido guiado publicado en producción

## Publicación comprobada

El 7oct2026 a las 14:19 Argentina se promovió el Worker `agent-friendly-web-web-production` a versión `831e2052-efed-49bc-a74e-680743138e64`, 100%, deployment `498d008a-4b96-4e70-a615-5423b207044c`. Artefacto congelado construido desde `97ce346`, integrado en main `80495f0`; CI `37649825544` aprobada. La aceptación autenticada de guardado/reapertura guiados del canary consta en `AFW-GUIDED-DELIVERY-ACCEPTANCE-2026-10-07.es.md`.

Se comprobó identidad de Wrangler y API en la cuenta AFW antes de operar. Dry-run pasó; candidata al0% pasó 16 páginas públicas, smoke público/Access y hash exacto del archivo `intake-workspace-LiuTz6Vx.js`. Tras promover, tráfico normal a las17:19:29.871UTC volvió a pasar todo. SHA256 esperado/observado: `8b4478496350fc79f048a64fe0a788e582b08113f0534d2a5930867161985015`. API confirmó deployment y100% de la candidata.

D1 productiva `d26fc9d2-df5a-4957-8e58-cc4c945faad8` verificada por ambos campos del binding; AI y limitador `26092803` conservados. Access aud/team, diagnóstico false, entrega remota false y copilot true únicamente para el piloto propio `6e972c18-cae1-402b-b959-646abd8499d7` se conservaron. No SQL, cambios de Access, consentimiento, activación de asistencia cloud ni expediente de Max. No había secretos Worker en la lectura previa ni posterior. Observabilidad conservada.

Rollback de código conservado: `fe4478cd-e58b-4a6d-ac93-d642d9118e67`, sin revertir datos. Evidencia local ignorada: `output/afw-guided-production-{override,normal}-20261007.json`, config congelada `output/afw-guided-release-20261007/production.json`. No usar config canary ni su D1 para rollback productivo.

## Verificación visual y límite

La revisión de `/metodologia` detectó que la plantilla española no consumía la sección integral añadida a la copia localizada. Este cambio conecta esa sección al texto compartido, conservando el resto de la página; su publicación posterior requiere evidencia propia. No presentar la primera publicación como aceptación visual de esa sección española.

La corrección se publicó después: fuente `da4b9a6623b99e19f1e25d3ef2d37e507d3e03d9`, PR320, CI `37658737852` aprobada y build local correcto. Candidata `3fc5fefc-9da1-4b39-bbd2-5b6fb3412222` al0% comprobada a las17:30:34.890UTC; promovida al100% a las17:31:02.754UTC mediante deployment `b1b6ea15-ead2-4c5c-9930-1c9cdcdc940d`. Tráfico normal a las17:31:24.758UTC pasó16 páginas, hash del asset, smoke público/Access y presencia de «Mejoras reales, más allá del puntaje» en la respuesta española. API confirmó100% y conservación de bindings/observabilidad. Rollback inmediato de código: `831e2052-efed-49bc-a74e-680743138e64`, sin revertir datos. Evidencia: `output/afw-methodology-production-{override,normal}-20261007.json`; artefacto/config congelados en `output/afw-methodology-release-20261007/`. La comprobación HTTP no sustituye una aceptación privada ni acredita ejecución cloud.

El smoke anónimo comprueba la protección del expediente, no una nueva interacción privada en producción. La publicación de UI no acredita recuperación del ejecutor Codex, supervisión permanente ni funcionamiento integrado con ordenador apagado. Ese bloqueo y su criterio de aceptación están en `AFW-CLOUD-RUNTIME-RECOVERY-2026-10-07.es.md`.
