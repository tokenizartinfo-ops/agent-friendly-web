# Control sintético único para el ensayo WAF Pro

21oct2026. Extensión acotada del [chequeo público](AFW-PUBLIC-READING-CONTRACTS-2026-10-21.es.md) y de [la propuesta WAF](AFW-PRO-AGENT-SAFE-SECURITY-CANDIDATE-2026-10-21.es.md). Este cambio prepara un observador cloud; no instala ni habilita reglas y no consume la propuesta cerrada.

## Diseño y límites

El workflow existente mantiene por defecto su lectura pública normal. El input booleano `waf_probe` esfalse. Solo una activación deliberada con inicio/fin UNIX originales permite el control adicional. Defaults0→1 vencidos; no renovaciones automáticas; la ventana no puede superar900segundos y debe estar vigente antes de iniciar la solicitud.

`scripts/check-public-waf-probe.mjs` permite UNA petición GET a `https://agentfriendlyweb.dev/guia`, con el parámetro fijo `afw_waf_probe` y el marcador sintético versionado `afw-own-synthetic-v1`. La cadena de prueba es un patrón XSS trivial transportado como texto en una URL codificada; no se ejecuta en un navegador. La guía no usa ese parámetro como datos ni guarda respuestas. No se apuntan APIs, formularios, expedientes, otros sitios o servicios. Un resultado negativo no justifica agregar patrones, repetir solicitudes o habilitar más reglas para forzar un positivo.

No admite URL, ruta, método, encabezados, payload o argumentos CLI elegidos por el invocante. No usa cookies, sesión ni secretos; no sigue redirects y no reintenta. El timeout máximo10s incluye la espera de encabezados y se reduce al plazo original restante. Comprueba además reloj monotónico para no aceptar un resultado tardío si el event loop demora el timer. Las opciones de fixture solo reducen el timeout.

El cuerpo se cancela sin leerlo, sin esperar ACK de cancelación; no se guarda ni calcula su hash. Solo se conservan fecha, origen/ruta/método fijos, markerID, ventana válida, estado y RayID validado como16hex. No se copian Location, cookies, query/patrón, encabezados ajenos o mensajes de error. Los inputs del workflow pasan por variables de entorno, nunca como interpolación de código shell.

Esto acota la espera del observador y su recibo, no demuestra que un proceso externo haya terminado ni que cancelación implique drain. `processDrainAccepted` permanecefalse. Una respuesta tardía no puede cambiar el recibo ya devuelto.

## Resultado y correlación

-403 con Rayválido y sin challenge: `blocked_pending_correlation`. Permite continuar con la observación del evento, pero NO acepta enforcement.
-200: `not_blocked`; no se afirma que todo WAF esté roto o que el marcador deba activar cualquier selección de reglas.
-403 sin Rayválido, redirección, challenge, ventana cerrada, timeout o error de transporte: estados separados y saneados.
-`wafEnforcementAccepted`, `operationalReadiness` y `pcOffAccepted` permanecenfalse en todos los resultados.

La aceptación posterior exige un evento mínimo de SecurityEvents que tenga el MISMO Ray, acción/componente esperados y un ruleID perteneciente al managedruleset observado. No inferirlo de403, del nombre de un ruleset o de una consulta vacía. No recopilar IP, UA, correo, cookies, query o cuerpos. El muestreo/retraso puede dejar detección pendiente.

El control solo corre después de que las21lecturas públicas/límites anteriores pasen. Si aquellas fallan, se omite el probe y se cierra la regla del ensayo. En PR solo se ejecutan fixtures. La ejecución manual conserva dos recibos de lectura y, únicamente si corresponde, el tercero del probe; retención7días.

## Preflight remoto fechado, sin mutación

22oct01:13:36.735UTC /21oct22:13:36Argentina: zona agentfriendlyweb.dev/cuentaAFW confirmadas, planpro, managedentrypoint404. Config bots igual a la observación anterior; campos ausentes siguenunknown. Catálogo nueve rulesets, incluido un managedauxiliar de respuesta no observado en el catálogo anterior; no se atribuye al proyecto ni se modifica. La fase privada late_transform1864f999/version3 sigue preservada.

22oct01:13:59.542UTC: POST GraphQL de LECTURA, identidad administrativa existente, solo campos action/datetime/source/ruleId/rayName, limit1 y Rayficticio0000000000000000 para no consultar tráfico de usuarios. HTTP200/successtrue/errors[], resultado vacío. Esto prueba acceso al dataset y esquema, no existencia de un evento real o completitud del muestreo.

22oct01:15:09.686UTC: managedrulesetefb7b8c949ac4650a09736fc376e9aee/version412,875reglas,562habilitadas por defecto. Se conserva la selección del proveedor; no se habilitan todas. No hubo nuevo token o ampliación de acceso.

## Ejecución posterior y recuperación

Revalidar cuenta, fase, managedversion y configuración antes de cualquier aplicación. Preparar revisión temporal nueva<=900s, snapshot recuperable, validación dry-run y constancia de la única creación. ACKincierto: inspección porref, no segunda creación. La muestra0→1 anterior permanece inerte.

Usar la misma ventana en regla y runner; no ampliar el permiso cambiando solo inputs. Observar lecturas legítimas, controlúnico y correlación limitada. Cerrar solo la regla propia porID tras lectura fresca, sin reemplazar fase ni borrar cambios concurrentes; comprobar cierre y respuestas posteriores. Fin de expresión limita admisión nueva, no garantiza drain ni reemplaza readback. Una fase nueva con regla desactivada no equivale a ausencia física y no se borra como limpieza rutinaria.

Sin nueva evidencia técnica de Container/OTP no se repiten esos ensayos. ProWAF, cloudsubscription/entrega/baja yPC-off conservan gates independientes. No datos/clientes deMax, correo o guardia permanente en este bloque.

Fuentes primarias: [GraphQL de FirewallEvents](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-firewall-events/), [SecurityEvents/muestreo](https://developers.cloudflare.com/waf/analytics/security-events/), [ManagedRules/defaults](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/), [troubleshooting y falsos negativos](https://developers.cloudflare.com/waf/managed-rules/troubleshooting/). La sintaxis real de lectura se aceptó en el preflight fechado.
