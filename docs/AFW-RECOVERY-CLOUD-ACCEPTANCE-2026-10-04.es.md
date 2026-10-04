# Recuperación temporal aceptada desde ChatGPT cloud

4 de octubre de 2026, 13:17–13:23 UTC /10:17–10:23 Argentina. PROJECT AFW, REPOSITORY agent-friendly-web, ENVIRONMENT synthetic canary, ORIGIN delegated-canary.agentfriendlyweb.dev. Adaptador QA PR210/sourceef12e0e, main7b69434; CI37205040895 pasó734 pruebas/lint/build. La preparación está en AFW-RECOVERY-PROBE-2026-10-04.es.md. No usa datos reales, evidencia privada ni herramientas de escritura.

Ventana nueva con deadline13:32:01UTC. Candidato normalcc41f5c3-b94f-4004-8319-4ed53cb91356 y candidato QAd8ef080b-f7e3-458b-8934-35b9d9fbbbc4: bindings D1/KV, cliente, deadline y flags idénticos verificados por API; OAuthtrue/refreshfalse. El QA intercepta únicamente lectura del proyecto durante la herramienta de resumen. No se cambiaron tablas, propietarios, registros de credenciales ni Access.

Consentimiento nuevo revisado en Chrome: resumen solamente, casilla de evidencia desmarcada. Creado13:19:26.315UTC, vencimiento original13:29:26.315UTC. La sesión Access seguía vigente: no hizo falta intervención del owner. Se descartó el diálogo pendiente previo de ChatGPT y se emitió una lectura nueva, sin duplicar consentimiento.

| Paso | Resultado observado en ChatGPT cloud |
| --- | --- |
| Normal, completado13:20:21UTC | MCP200, proyecto sintético draft; pregunta real «¿Qué contenido disponible podemos usar para responder con precisión?» |
| QA, completado13:21:10UTC | 503 delegated_read_unavailable, sin datos nuevos. El asistente informó que el servidor no confirmó la causa y recomendó reintentar sin ampliar permisos. Conservó la misma pregunta solo como contexto histórico. No reconectó ni ejecutó llamadas adicionales. |
| Normal restaurado, completado13:22:05UTC | MCP200, mismo proyecto y pregunta, sin consentimiento nuevo ni reconexión. |

Los prompts no proporcionaron el código503 ni el mensaje de recuperación: el asistente los obtuvo en la llamada real. La evidencia del chat y su marcador MCP demuestra recepción del error y uso de la orientación; el recibo no reproduce bytes íntegros del transporte. HTTP200 sin challenge se verificó en la prueba local de PR209, no mediante una captura de red de ChatGPT. No confundir este error de aplicación con la intercepción OAuth documentada en AFW-MCP-RECOVERY-CLIENT-BOUNDARY-2026-10-03.es.md.

## Cierre

Desconectar desde /connections retiró el permiso13:22:31.292UTC. D1 conservó exactamente el alcance y vencimiento original, ocho registros históricos, cero sin retirar. Captura local ignorada output/afw-recovery-closed-20261004.png. Canary restaurado efaf2265-b97f-4b5f-aaf0-52036d4c6217 al100%, OAuthfalse/refreshfalse, MCP y ambos metadatos404. Piloto real permanece774c9547-a205-4f24-b369-1dca58a7de16 al100%, flagsfalse. No reapertura comercial, discovery hacia canary cerrado ni puntaje externo nuevo acreditados.

Este bloque queda aceptado. No repetir ingreso, QA móvil, aislamiento ni este fallo por rutina. Siguiente: disponibilidad y monitoreo del servicio estable con clientes registrados, preservando modalidad inicial de diez minutos y consentimiento explícito; después discovery coherente y auditoría externa. El primer cliente requiere sus objetivos y acceso recibido, no datos inferidos.
