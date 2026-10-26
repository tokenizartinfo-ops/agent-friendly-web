# AFW · siguiente paso desde Work cloud: aceptación acotada

Fecha: 26 de octubre de 2026. Resultado: **una consulta real de continuidad aceptada**, con consentimiento nuevo de solo resumen y cierre primario antes de vencer. `operationalReadiness=false`; el flujo de eventos y PC-off integrado siguen pendientes.

## Proyecto y alcance

Proyecto AFW; repositorio `tokenizartinfo-ops/agent-friendly-web`; entorno privado `delegated-canary`; origen `https://delegated-canary.agentfriendlyweb.dev`. Recurso: Worker `agent-friendly-web-delegated-canary`, cuenta `85d0d5dadac3341a564f22ce885e9eec`. Acción: una ventana finita de lectura, una llamada `read_project_next_step` desde el chat Work cloud existente y restauración cerrada. No datos de Max, nuevos scopes, claves, migraciones, eventos, cobros ni publicación de contenido.

[Recibo consolidado](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6426665499), [admisión](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6426382716) y [controladores corregidos](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6426055434).

## Qué se corrigió

La fuente ya incluía continuidad: `createDelegatedContinuityHost` monta la tercera herramienta solo con `AFW_DELEGATED_CONTINUITY_ENABLED === 'true'`, modo `window`, proyecto/cliente concretos y plazo original. Las ventanas OAuth anteriores conservaban dos herramientas, mientras el catálogo del cliente anunciaba `read_project_next_step`; Root y Work recibieron `Tool ... not found`. Esto no acreditaba fallo de credenciales ni de Cloudflare.

Se preservó el mismo módulo congelado y se añadió temporalmente un único binding no secreto: `AFW_DELEGATED_CONTINUITY_ENABLED=true`. La candidata tuvo 30 bindings: OAuth y continuidad activos,27 bindings heredados exactamente; eventos, avisos, sucesor, refresh y cron permanecieron deshabilitados. El host conserva su admisión raw D1 `first-primary` por lectura y límite original de hasta 5 segundos. No se cambió código, schema, identidad ni alcance de acceso.

La revisión del controlador detectó que el cierre admitía 30 bindings pero comparaba 29 nombres únicos. Se corrigieron ambos conteos; el fallo se reprodujo antes del uso vivo. El preflight de la apertura pasó 44 fixtures. El cierre pasó 8 casos, incluida candidata válida 30 → normalizada 29 y rechazo de duplicados, identidad, plazo, tipo o flags incorrectos. Un preflight de solo la base cerrada no bastaba para cubrir esa rama.

## Evidencia fechada

| Hecho | Evidencia UTC del 26 de octubre de 2026 |
| --- | --- |
| Ventana original |20:18:55–20:28:55; corte de admisión de llamadas20:26:55 |
| Candidata propia |`5bf04280-8e01-4050-9492-8754ea532b3e`, deployment `cee69bc3-50ee-4876-9cb9-ec208b72c42b` |
| Permiso nuevo |Creado20:23:35.368; expiración capada20:28:55; primaria20:24:26 confirma exactamente uno, summary-only e intercambiado |
| Consulta Work cloud |20:24:48.170–20:24:49.410, una llamada; observación del servidor20:24:48.916 |
| Cierre primario |20:27:58.491, antes del vencimiento; deployment `921a4f1f-97a3-4aa1-a6d6-23116f5fbd12` |
| Reconciliación administrativa |20:31:33: Workflow con listado completo de2instancias y0activas; operador con tres flags en false |

El cliente reportó `isError=false`, `status=200` en el resultado y contrato `afw.agent-consumption.next-step.v1`, revisión 1, estado `ok`. **El HTTP de transporte no estuvo expuesto**; no convertir ese campo en una medición HTTP independiente. Es evidencia del cliente contrastada con permiso/configuración primarios, no un log de red firmado.

El siguiente paso fue `provide_information`, entrada `contentSources`, con la pregunta: «¿Qué contenido disponible podemos usar para responder con precisión?». `executionAllowed`, `chargeAllowed` y `publicationAllowed` permanecieron en `false`. No se guardó una respuesta ni se atribuyeron hechos al owner.

El primer `read_thread` posterior todavía mostraba un turno previo; la lectura posterior recogió el resultado con su hora original. Un snapshot `idle` o metadata retrasada no demostraba ausencia de ejecución y no se utilizó para repetir la llamada.

## Procedencia y reversión

El módulo conservado mide 1.794.163 bytes y su SHA256 es `ffb6c26aee0f3d7bb2e4ad0562cf3d0ea7eb739bc06bffbff4b71662d3a13905`. Su fuente es `444d9a13cffe563f1711b624e754d6dee98cfeb4`, árbol `7cd0728e6a2038ad0056ce32cc50c9659a38b24f`, programa `f6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6` y artifactKey `a038796126b8d8a937f5d9d4e472ed4630220ff92242674ef501a62dadc6e6ca`.

La base restaurada fue la versión journal `ffd91801-f7f2-468f-9cad-2f3fb448f783` al 100 %, con 29 bindings, ocho flags enfalse y SHA de configuración `bf1d2527f6ddc9b4d8f613c1b62b6474f82acb8f0fcefc81d500831e2509aa12`. El binding temporal de continuidad desapareció al restaurar esa versión. Cron, tails e instancias activas de la aplicación propia fueron 0 en la lectura de cierre. ACK y puntero coincidieron. Son snapshots fechados, sin garantía de exclusividad futura ni cancelación física de una API en vuelo.

Operador cerrado `2033948b-087c-4cb0-bb73-554e2966e7a6` y deployment `9bd1c991-0758-4c29-8d7a-f2133b5bec60` no fueron mutados. Tampoco se repitió la publicación nativa 133d: una tentativa/recibo para esa clave sigue aceptada. Los planes 04, 05 y C01 están consumidos y no se reinician. El grantC01 terminó por su TTL; esta ejecución no certifica una nueva retirada nativa.

El paquete nominal cualificado sigue siendo run 40364131193 / artifact 12669088876, fuente de operador/template `fda963191ac45c3ce717edf7692a7c59077d68e5`; su Worker congelado es 444d, distinto del empaquetador. Este documento no reconstruye ni sustituye ese artefacto. El ejemplo start0/expires1 sigue deliberadamente vencido: nunca invocarlo.

## Selección del cliente y límites

Había dos conexiones con nombres indistinguibles. El owner asignó un apodo a una; tras actualizarse la metadata del host, cada cliente pudo escoger un `link_id` literal de su propia lista mediante una etiqueta inequívoca. Se reconectó la conexión existente elegida, sin crear otra, borrar cuentas, copiar IDs entre hosts o inventar argumentos. El esquema de cuenta puede cambiar entre superficies; volver a inspeccionarlo después de cambios de conexión. Un badge conectado o sin aviso no acredita vigencia del grant.

No se volvió a usar el control de Chrome bloqueado ni otra instancia del navegador para eludirlo. El owner completó los clics de consentimiento y el resto se ejecutó mediante herramientas cloud. No hubo builds, dependencias o archivos locales nuevos.

## Siguiente bloque

La orientación de lectura ya no debe repetirse como un hito nuevo. Preparar el recorrido de avisos antes de solicitar otra ventana: comprobar el camino nativo `confirm_named` y lectores custodiados, autorización original de avisos, catálogo real/rescan/fuente y esquema, alta nativa con callback/firma proporcionados por ChatGPT, challenge, una ocurrencia, recepción y revisión útil, retirada nativa y parada primaria. Nunca fabricar callbacks o deducir una suscripción de un catálogo visible.

Solo después podrá coordinarse PC-off integrado. Esta lectura no acredita un disparador, supervisión permanente, operación con el equipo apagado ni disponibilidad comercial. No se envió correo a Max; conserva preview, aprobación y consentimiento propios. El caso Access 02389649 y su borrador privado sin enviar siguen separados de esta aceptación; tampoco se modifica el Tunnel de Tokenizart.
