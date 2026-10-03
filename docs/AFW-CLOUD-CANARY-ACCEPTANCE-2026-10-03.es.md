# Subida cloud al canary: aceptación del 3 de octubre

## Recibo observado

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT canary cerrado; ORIGIN a2a-canary.agentfriendlyweb.dev; RESOURCE_TYPE Worker version; RESOURCE_ID agent-friendly-web-a2a-canary. Acción autorizada: subir una versión inactiva, sin promoción ni cambios de rutas/Access/datos.

El [PR 179](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/179) pasó CI y se integró. Se despachó manualmente el [run GitHub Actions 37134644865](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/37134644865) sobre release/a2a-canary-cloud, commit 637296786cfc875d6a4f3061d7413f8f4100df41. Inicio15:50:11 UTC; fin15:52:18 UTC (12:50–12:52 Buenos Aires). Resultado success.

717 pruebas aprobadas, cero fallos; lint y build aprobados; compilación específica dry-run aprobada. El job separado de subida confirmó credencial presente y subió la versión 03cb81b7-e0e2-4dcb-a209-ae558f5f7902 con ambos flags A2A false. Cloudflare API confirmó esa versión y el tag del commit exacto.

La consulta de deployments antes y después conservó dc155d84-ea17-4fee-98d8-1722491ff4a5, versión activa 50694a5d-41a3-4313-be8b-4c6c2a543be0 al100%, creada el2deoctubre. La versión nueva no se promovió. No se realizaron migraciones, cambios Access o entregas al cliente.

## Alcance y límites

Esto demuestra instalación, pruebas, compilación y subida remota desde GitHub sin usar el PC como ejecutor. No demuestra una ejecución por horario con PC apagado, un deploy público, promoción/rollback, gerente autónomo ni webhook Cloudflare→Codex. El recibo anterior de Gmail durante apagado sigue separado.

El secreto AFW_CANARY_UPLOAD_TOKEN se confirmó mediante listado de nombres, sin leer su valor. El token temporal aprobado tiene Scripts de Workers: Editar sobre la cuenta compartida y vence el4deoctubre; no es exclusivo del canary. La instalación GitHub seleccionó solo AFW. No se conectó Workers Builds: el selector no ofreció el token personalizado. Se utilizó GitHub Actions como alternativa.

La metadata de la versión indica has_preview=true; ese campo por sí solo no acredita una URL de preview accesible. No afirmar un smoke autenticado o exposición pública de esa versión sin comprobarlos. La configuración conservó preview_urls y workers_dev false. Limpieza posterior: retirar el secreto GitHub y revocar el token temporal; registrar el resultado antes de declararlos retirados. El intento de listar tokens mediante el conector API recibió Unauthorized y no realizó una revocación.

Limpieza comprobada: se retiró AFW_CANARY_UPLOAD_TOKEN de GitHub después de la aceptación; el listado de secretos quedó vacío. La UI Cloudflare aún mostró el token como «Caduca pronto», vencimiento4deoctubre. Revocación Cloudflare pendiente: su menú ofrece eliminación, no desactivación reversible. No confundir retirar el secreto GitHub con revocar el token en el emisor.

Rollback: la versión activa no requiere restauración; deshabilitar o retirar el workflow manual si deja de utilizarse. Una subida posterior necesita una nueva credencial autorizada tras revocar/expirar la temporal.

## DNSSEC: evidencia independiente

La lectura de Cloudflare el3deoctubre sigue mostrando pending, modified_on2026-09-29T20:32:11.984581+00:00. Google Public DNS devolvió DS sin Answer, Status0 y ADtrue; DNSKEY presente con ADfalse. La firma de la zona existe, pero esta lectura no muestra la cadena DS delegada. No atribuirlo sin más a propagación ni publicar una mejora del puntaje. Revisar el registrador y el registro DS antes de cualquier cambio, con un bloque y rollback propios.
