# Continuidad del relato privado del copilot

## Publicación y aceptación del 18 de octubre

La corrección está publicada en https://agentfriendlyweb.dev. La API primaria confirmó el 18 de octubre a las 23:06:44 UTC la versión `d8982d37-8966-4c6a-86fa-d265455d4df9` al 100%, deployment `05357264-6106-40b5-9361-db59fd576ded`. Fuente pública exacta: `dcca7fc5a3646280da4c233f6492ce9a0be2de86`; no todo el main integral.

| Comprobación | Resultado |
| --- | --- |
| Fuente revisada | `235ce8771bc2870d6e62b322c715c20b2e7f2542`, [PR 486](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/486), merge main `d822374a60b74aa7bf54d9543ab7739bcc876367` |
| CI integral | 39174335239 / job 117813778613: 2.036 PASS, cero fallos, una omitida; lint/build aprobados |
| Backport mínimo | [PR 487](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/487), merge público `6497c1a06ae6160b9541895fb3e0ab274e1556de`; cuatro blobs cambiados iguales a la fuente revisada |
| CI público | 39174446204 / job 117814118401: 1.158 PASS, cero fallos y cero omitidas; lint/build aprobados |
| Comprobación posterior de main | 39174897000: 2.036 PASS, cero fallos, una omitida; lint/build aprobados; árbol igual a la candidata integral |
| Pruebas dirigidas | 26 PASS y ESLint dirigido aprobado; regresiones RED de los dos bloqueos y del borrado voluntario antes de sus correcciones |
| Revisión independiente | Hallazgo P2 sobre el borrado reproducido y corregido; revisión final sin hallazgos pendientes, diez pruebas comprobadas por el revisor |
| Interfaz real con transporte sintético | Cinco escenarios aprobados; recuperación por teclado, ACK perdido sin PUT duplicado, borrado vacío conservado y acción EN/PT visible en móvil sin desborde; capturas inspeccionadas |
| Versión previa comprobada | `d94a1a33-4823-4ff6-bfde-fcf5b3f2eed5`: 16 páginas, tres assets exactos y Access smoke aprobados antes del upload, 23:03:58 UTC |
| Candidata sin tráfico normal | Deployment `c5257c97-fc07-4d68-abbc-3ff9c49e63de`: candidata 0%, previa 100%; override con 16 páginas, tres assets y Access smoke aprobados, 23:05:33 UTC |
| Tráfico normal | 16 páginas, tres assets y Access smoke aprobados, 23:06:30 UTC |

Se comprobaron los 298 hashes del artefacto congelado. Antes, en la candidata y después se conservó el mismo fingerprint de configuración efectiva, sin copiar sus valores privados al recibo. D1, AI, ASSETS, Access, rate limiter 5/60, runtime, observabilidad, pin propio de copilot y flags de publicación remota/diagnóstico permanecen iguales. No hubo migración, credenciales nuevas, escritura autenticada remota, uso del modelo, micrófono o activación de eventos privados.

El asset publicado es `/_next/static/chunks/intake-workspace-CiwHSKbW.js`, SHA-256 `6db6ce025242cb797fedc5e823243a49aa385aa9713934d8f1a99e973b6101d0`. La primera consulta normal, diez segundos después de promover, todavía observó respuestas con entrypoints anteriores y un 404 del chunk nuevo. Se conservó ese informe; una comprobación posterior aprobó toda la muestra unos 35 segundos después de promover. No se atribuye esa propagación al problema de Containers ni se oculta como una aceptación inicial. No fue necesario revertir.

La sesión Playwright propia y el servidor local del ensayo se cerraron; el puerto 8833 quedó sin escucha. No se tocó Chrome del owner. Esta aceptación de cliente con transporte ficticio y estos smokes públicos no acreditan una nueva sesión autenticada, suscripción, revisión cloud, retirada nativa, PC-off o preparación operacional del piloto de Max. Los casos 02375364 y 02382110 siguen separados; consulta manual de las 23:00 UTC sin respuesta técnica nueva y monitor PAUSED.

## Problema y corrección

El relato de trabajo tiene su propio guardado: incluye el texto escrito o incorporado desde una transcripción y las decisiones de la conversación. Es distinto de los campos confirmados del expediente. Sus lecturas y escrituras podían quedar pendientes sin un plazo propio y bloquear la recuperación o «Guardar y salir».

La corrección programa un presupuesto de 15 segundos para cada consulta de ese recurso, incluyendo cabeceras y JSON. Al vencer, cancela la lectura y libera el estado ocupado; no interpreta el vencimiento como rechazo o rollback del servidor. Una respuesta tardía no marca el relato como guardado ni reemplaza el texto actual. La limpieza de un efecto cancelado tampoco puede presentar un error tardío sobre otro montaje del componente.

El presupuesto depende de que el navegador pueda ejecutar tareas. No garantiza actuar a una hora exacta con el proceso suspendido ni guardar después de cerrar por la fuerza. No se añaden copias en localStorage, logs, correo o analytics.

## Recuperación guiada

El aviso explica que no se pudo confirmar y que el texto sigue en esta pestaña. «Comprobar guardado» queda visible junto al aviso, aunque esté plegado el panel de texto/audio. Su primer paso es una lectura privada; no repite automáticamente la escritura incierta.

Si el relato y sus decisiones ya coinciden con lo guardado, se recupera su revisión sin otro PUT. Si son distintos, se conserva lo escrito y se ofrece elegir una versión; no se atribuye esa diferencia necesariamente a otra pestaña. Solo después de elegir conservar el borrador puede reanudarse el guardado con la revisión actual y el control CAS existente.

Vaciar el relato también es una edición. La carga inicial intacta puede recuperar el relato guardado; después de una edición, incluso si el resultado es vacío, una diferencia pide elegir en lugar de restaurar texto anterior sin preguntar. La misma marca protege las decisiones locales de la conversación antes de completar una primera lectura.

La consulta se limita a `/api/projects/{projectId}/copilot/working-draft`; no abre un transporte a destinos arbitrarios. Conserva `cache: no-store` y evita seguir redirecciones de autenticación. Una sesión vencida, HTML, JSON inválido o un error de permisos no se convierten en un guardado confirmado. Un conflicto 409 mantiene su revisión separada.

## Límites de producto y autorización

Este cambio no permite usar el modelo ni procesar audio por el mero hecho de recuperar un relato. Conserva el pin propio de rollout, la identidad del propietario, el consentimiento del expediente y la confirmación de cada envío a IA. No incorpora una transcripción automáticamente a los campos definitivos, no publica, no amplía clientes y no activa avisos cloud.

La API, el esquema, las revisiones, la detección de credenciales y los permisos existentes no se modifican. El guardado de los campos del expediente mantiene su corrección anterior, documentada en [Recuperación de un guardado sin confirmación](AFW-SAVE-RECOVERY-2026-10-18.es.md).

## Verificación

Dos regresiones RED reproducen la espera indefinida usando los callbacks reales de lectura y guardado del componente. Las pruebas de recuperación cubren ACK perdido y tardío, lectura posterior sin duplicar PUT, decisiones recuperadas, texto local diferente, cancelación, cuerpo JSON bloqueado, redirecciones, conflictos y limpieza de temporizadores/listeners.

Son pruebas sintéticas. No acreditan un nuevo ingreso real, micrófono, transcripción con un modelo, suscripción, entrega útil o PC-off. La aceptación de interfaz y la publicación pública tienen el alcance y las referencias registrados al principio de este recibo.

La reversión de fuente no requiere migraciones ni retroceder datos. La versión previa `d94a1a33` y su configuración efectiva se conservaron y comprobaron antes de cambiar tráfico. Una reversión futura requiere nueva comprobación primaria y de recuperación, sin deshacer actividad legítima posterior. No repetir escrituras para documentar un resultado.
