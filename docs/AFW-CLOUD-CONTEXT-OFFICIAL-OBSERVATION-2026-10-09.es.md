# Observación oficial del contexto cloud de AFW

9 octubre 2026, observación administrativa terminada antes de 16:07:54 UTC (13:07:54 Argentina). QA propia; no Max, credenciales nuevas, programación ni guardia.

## Procedencia comprobada

El operador de esta conversación solicitó una lectura contextual en la tarea ordinaria `01a120f4-dcf5-71bb-84b7-07559e67a005`, host `durable`. La respuesta final del asistente se utilizó para localizar la actividad, no como autoridad de los valores.

En Chrome habitual, pestaña `1913701866`, URL `https://chatgpt.com/local/01a120f4-dcf5-71bb-84b7-07559e67a005`, se abrió «Trabajó durante 14s» → «Usó Cloud Environment integración y editó un archivo» → «Environment status» → «Mostrar salida sin procesar de la llamada a herramientas». El diálogo oficial mostraba `codex_apps.cloud_environment.environment_status`, argumentos `{}`, callId `exec-da844cc8-97ad-4837-9e58-8cb07cb63034`, duración 637 ms y resultado success. Los campos se leyeron de esa salida original, no del archivo editable generado por el consumidor.

La lectura administrativa `read_thread`, un turno y outputs habilitados, confirmó ese mismo item/callId en el turno `01a1216a-42aa-755c-900c-8f8329e4d095`, completado sin error, inicio Unix1791561975/final1791561997. Esta API sigue sin devolver el contenido MCP; el contenido se comprobó por el diálogo oficial. El archivo `/workspace/work/afw-estado-oficial-actual-revision19.json` es una copia del cliente y no sustituye la observación.

## Campos observados literalmente

| Campo | Resultado oficial |
| --- | --- |
| environment_id | `ccarenv_b64_Y2NhcmVudl9kNWM2MzA2MTUxNjQ4MTkxYWQ3ODMxYjBlNWMyMTZkMw` |
| source_config_id | `38a3072b-f1e2-410e-9272-3c7e7eb434cb~cecfg_6abe6b6814a481a3aa2299efe46e2fe6` |
| source_config_version_id | `38a3072b-f1e2-410e-9272-3c7e7eb434cb~cecfgver_6ac8f1959e2481a398b373a2c4d00c5b` |
| spec_revision / observed_spec_revision | `"19"` / `"19"` |
| observations_current | `true` |
| connectivity / provider | `connected` / `cloud` |
| desired_phase / observed_phase | `running` / `running` |
| network_policy | `restricted`, `enforced` |
| failure | `null` |

Diez requisitos de secretos aparecían `ready`; solo nombres, estados y destinos, nunca valores. Esto no acredita vigencia de una identidad en Cloudflare, uso de la clave, recepción de un desafío o exclusividad global de custodia.

## Alcance y siguiente gate

Queda comprobado el vínculo contextual fechado tarea→entorno→configuración/publicación para esta observación. La publicación continúa siendo la anterior `cecfgver_6ac8f1959`, cuya fuente adoptada fue `0c559bc88a354e3810b848eccafe4a2adb1404c3`. Integrar PR354 en Git no actualiza esa publicación ni el checkout cloud; no se afirmó adopción nueva.

El propio servidor aún no recibió un desafío real ligado al preregistro V2 y a la aprobación completa. Falta reserva CAS administrativa de los recursos propios, montaje privado cerrado con rollback, identidad temporal válida, correlación de la ejecución real y journal primario. `state:'exclusive'` solo podrá significar reserva exclusiva del recurso dentro del registro propio, nunca que una clave no pudo copiarse.

La observación es fechada y no demuestra inmutabilidad entre lecturas ni atestación de VM. Antes de autorizar una ejecución posterior se requiere observación vigente correspondiente a su tarea/publicación y operación. El ensayo previo debe comprobar cierre espontáneo, retirada y readback; luego una sola programación alojada y finalmente el intervalo de PC apagado. No pedir apagar todavía.
