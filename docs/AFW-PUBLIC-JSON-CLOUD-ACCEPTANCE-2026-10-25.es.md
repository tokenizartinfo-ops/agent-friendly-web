# Publicación pública de AFW y preparación del próximo ensayo

**Corte de evidencia: 25 de octubre de 2026, 15:36 UTC (12:36 Argentina).** Este documento registra una publicación aceptada y los requisitos que siguen pendientes. No autoriza otra ejecución, permisos ni una apertura del servicio privado.

## Resultado y alcance

La actualización pública que limita la complejidad de las solicitudes JSON del servidor MCP quedó publicada y comprobada desde GitHub Actions. La aceptación corresponde a la web pública; no demuestra que Codex nativo haya recibido un aviso ni que pueda acompañar un expediente con el ordenador apagado.

| Identidad | Valor comprobado |
| --- | --- |
| Proyecto y repositorio | AFW; `tokenizartinfo-ops/agent-friendly-web` |
| Entorno y origen | `public_web production`; https://agentfriendlyweb.dev |
| Recurso | Worker `agent-friendly-web-web-production`, cuenta `85d0d5dadac3341a564f22ce885e9eec` |
| Fuente de aplicación | `d3b638a46d1f9ab559142222e181e9aae2e0a83e`, cualificada en PR584 |
| Fuente del controlador | `54b813dfcc87bda22ee70f975731868a01c3820d`, árbol `d2f8c85cf3221a9358c16299636bfdf25265e8fa`, PR590 |
| Ejecución aceptada | [40204687610](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/40204687610), intento 1, rama main |
| Despliegue activo | `12373c27-9a52-4764-9064-7428887252a2` |
| Versión activa, 100 % | `1772ceae-7e8d-4dbc-bc1d-0ade956a3e45`, etiqueta `d3b638a4-r40146576430-a1` |
| Recuperación conservada, 0 % | `29927b77-1e41-47df-9854-ab9830f84755` |

La lectura independiente de las 14:59:42 UTC confirmó el despliegue, su marca de propiedad `AFW public-json r40204687610 a1 promote` y el tráfico. Otra lectura a las 15:32:06 UTC conservó esos valores. Son observaciones fechadas, no una garantía futura.

## Qué se corrigió y qué se comprobó

El observador anterior solo decodificaba JSON y rechazó respuestas MCP HTTP 200 que contenían SSE. PR589 incorporó una decodificación finita de ambos formatos, conservando la validación de RPC y los límites. No se sustituyó el artefacto de la aplicación por una nueva compilación del controlador.

La confirmación del POST de despliegue de la ejecución aceptada fue un sobre explícitamente exitoso que contenía un UUID, sin `versions` ni `strategy`. PR590 permite tratarlo como información provisional; si esos campos están presentes exige que coincidan exactamente. La aceptación requiere después una lectura del proveedor que confirme el ID, propietario, tráfico y configuración. Un UUID por sí solo no acredita promoción.

| Comprobación del recorrido público | Resultado |
| --- | --- |
| Once rutas antes de mutar, con candidata al 0 % y con tráfico normal | Correctas en las tres fases |
| Cuatro archivos fijados por bytes y SHA256 | Coinciden antes y después de promover |
| JSON con profundidad 65 o 4097 valores | HTTP 413, `request_too_complex` |
| Profundidad 64, 4096 valores, initialize y tools/list | HTTP 200, SSE finito y RPC esperado |
| JSON mal formado | HTTP 400, error RPC -32700 |
| Tres fronteras privadas anónimas | Redirección 302 esperada; sin seguirla ni usar sesión privada |
| Confirmación final | `accepted`, `trafficReadbackVerified=true` |

El primer sondeo normal del manifiesto observó 404 durante la propagación; el siguiente recibió sus bytes y hash exactos a las 14:58:26.721 UTC, 1,476 segundos después del ACK. Permaneció dentro del límite original de treinta segundos.

Hubo **un único POST de promoción** en esta ejecución: sin POST de stage0, reintentos de POST, recuperación, nueva carga o reconstrucción. Los intentos anteriores conservan sus recibos y no se reutilizan. En particular, 40203181801 sí promovió y verificó una recuperación propia; la presencia de campos en su ACK histórico quedó desconocida y no se deduce retrospectivamente de la respuesta nueva.

## Verificación de fuente y custodia

- Pruebas dirigidas del controlador: 28 Python; observador: 9 Node, todas correctas. Se conservaron los fallos RED anteriores y una revisión independiente final sin hallazgos pendientes.
- CI de PR590 [40203864900](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/40203864900) y de su main [40204244594](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/40204244594): 2833 aprobadas, cero fallos, una omitida existente; lint sin errores y doce advertencias existentes; cinco compilaciones correctas. No se suman esas pruebas a las dirigidas como si fueran conjuntos independientes.
- La autoridad del trabajo comenzó con el run nuevo a las 14:57:56 UTC y terminó al aceptar a las 14:58:28 UTC. Conservó sus 600 segundos originales, incluida cola/preparación, y la reserva de 360 segundos antes de promover.
- Cada fase del observador admite como máximo 50 peticiones y 512 KiB por respuesta; HTTP completo acotado a diez segundos. Stage0 dispone de hasta sesenta segundos y tráfico normal de treinta desde el ACK, sin renovar el reloj.
- El paquete original es artifact `12576173498`, run `40135198993`, intento 1: 2761442 bytes ZIP, 337 archivos, SHA256 `564feba6fbbbc685434d12b6d8aa42aa61f34242d80ee6e58c929e028ea64549`. Su retención vence el 31 de octubre a las 21:40:26 UTC. No reemplazarlo por otro build de main.
- El recibo saneado es artifact `12602907797`, 2004 bytes ZIP, digest GitHub `4657383f975c4d18d164bbea2496d1acc44e3b3d26a4d26f8cdf4825cccebba2`, retenido hasta el 1 de noviembre a las 14:58:28 UTC. [Recibo completo de aceptación](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/590#issuecomment-6399225879).

Se comprobaron diez bindings y sus huellas, configuración y runtime iguales a los cualificados; workers.dev y previews deshabilitados y tail consumers vacíos en el cierre público. La versión de recuperación permaneció legible. No hubo cambios de base de datos, permisos o credenciales en este bloque.

El workflow terminó. Su snapshot literal de continuación ya es antiguo y debe rechazar otra promoción. **No usar Re-run ni continue_staged para repetir esta aceptación.** Una publicación futura necesita su propio baseline y admisión. No existe CAS global documentado entre el último GET y el POST: el control de propiedad reduce el alcance, pero no elimina esa carrera externa.

## Cómo interpretar el cierre privado

A las 15:33–15:34 UTC se leyeron los bindings de las versiones realmente desplegadas:

| Recurso privado | Versión activa | Controles AFW |
| --- | --- | --- |
| `agent-friendly-web-delegated-canary` | `dde0750d-f5e3-4507-ac9c-0a1f25b20236`, 100 % | Ocho booleanos deshabilitados |
| `agent-friendly-web-release-operator` | `3e26fed5-2c02-41e0-ad39-ee25eca976f8`, 100 % | Tres booleanos deshabilitados |

Una consulta legacy a `/settings` mostró tres booleanos habilitados. Se comprobó que sus bindings coincidían con la última versión guardada `a4495890-16f1-47b6-a249-56c699b63f52`, subida el 23 de octubre, **sin tráfico** y con una ventana ya vencida. No eran los bindings de la versión activa. Este hallazgo no exige desplegar ni sobrescribir una configuración para cerrar el ensayo.

Cloudflare distingue la versión, que captura código y bindings, del despliegue que dirige el tráfico. [Documentación oficial](https://developers.cloudflare.com/workers/versions-and-deployments/). La correlación concreta de `/settings` con esa versión es evidencia fechada de AFW, no una regla inferida para cualquier respuesta API.

Esta comprobación privada no llamó OAuth, herramientas del expediente, Container, D1 o KV. La lectura de `/script-settings` no expuso `tail_consumers`; su ausencia no se convirtió en cero. No se refrescaron instancias Container. Las constancias anteriores sobre cron, tails o instancias conservan su fecha y su alcance.

## Siguiente recorrido: criterios para continuar

| Tramo | Estado al corte | Evidencia que falta |
| --- | --- | --- |
| Publicación y protocolo público | Aceptados | Ninguna repetición de este bloque |
| Conexión de Codex nativo | Último GET del 24 de octubre falló antes del origen, sin respuesta HTTP | Diagnóstico o cambio verificable que justifique una comprobación nueva y acotada |
| Caso OpenAI 18196140 | Derivado a especialista el 25 de octubre a las 14:15 UTC; sin reparación ni ETA comunicadas | Indicación técnica nueva; el acuse de derivación no basta |
| Caso Cloudflare 02382110, Container | Última respuesta técnica registrada: 23 de octubre, ingeniería, sin ETA | Contrastar cualquier nueva respuesta con el contexto real; no confundirlo con el proxy OpenAI ni el antiguo Cron |
| Circuito propio completo | Sin aceptación de extremo a extremo | Suscripción nativa, evento, entrega/ACK, revisión útil, retirada y cierre físico correlacionados |
| Ensayo con ordenador apagado | [PR571](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/571) sigue DRAFT, solo diseño | Primero aceptar el recorrido nativo; después contrato, implementación y ocurrencia posterior independiente |
| Piloto de Max | No enviado ni iniciado | Recorrido anterior aceptado, preview exacto aprobado por Gabriel y consentimiento del cliente |

Antes de pedir otra sesión o código al owner, comprobar la capacidad del receptor, cuenta/proyecto/revisión, recursos y recuperación, vigencia del paquete y alcance del nuevo intento. No repetir un plan consumido o incierto, renovar permisos por inercia ni usar start0/expires1. Una respuesta de soporte no autoriza ejecutar sus comandos ni ampliar accesos.

Una respuesta genérica de soporte mantiene la espera. Una indicación técnica concreta permite preparar el diagnóstico que corresponda, con un objetivo y presupuesto nuevos y verificables. Si un paquete o permiso venció durante la espera, queda pendiente su preparación propia; este documento no extiende fechas ni acceso.

El futuro correo de invitación mantiene hello@agentfriendlyweb.dev y un enlace directo para comenzar en el expediente. Su envío a Max sigue requiriendo el preview acordado y aprobación; recibir un aviso no autoriza enviar correo, editar o publicar por el cliente.

`operationalReadiness=false`; aceptación privada y PC-off pendientes. Chavo y el helper están IDLE; el seguimiento local permanece PAUSED. Este registro no instala una guardia ni un seguimiento cloud. [Continuidad operativa y autorizaciones](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6391041814).
