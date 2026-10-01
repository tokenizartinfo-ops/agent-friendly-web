# AFW: preparación real de Codex Cloud

Evidencia del 2026-10-01; entorno preparado para revisión, no publicado ni guardia activada.

El owner autorizó el conector GitHub después de preparar la selección exclusiva de AFW. En el selector cloud elegimos únicamente `tokenizartinfo-ops/agent-friendly-web`. [Conversación de setup](https://chatgpt.com/local/01a0f7d3-a806-76c5-a024-6ddf4ccb401b?hostId=local), ID `01a0f7d3-a806-76c5-a024-6ddf4ccb401b`. La interfaz identifica «Chat en la nube» y mostró **GPT-6.1 Sol Bajo**. El backend de estado devuelve host durable; los comandos del setup usan `/workspace`. No inferir ejecución local solo por el segmento local de su URL.

Primer informe visible: Node 24.19.0, npm ci, 634 pruebas, lint sin errores (una advertencia existente), build y ocho contratos públicos aprobados; servidor y D1 locales comprobados. No se copiaron vault, expedientes, correo ni perfiles Chrome.

Ajustes guardados por interfaz: **AFW Operations**, **Solo yo**, red **Solo dominios personalizados**, destinos `github.com` y `registry.npmjs.org`; sin secretos de proxy ni variables productivas. Retirado el preset heredado package_managers. Falta repetir comprobaciones con esta red y checkout actual antes de publicar.

## Código entregado y correcciones

PR #148 integrado en main `52610ec778571fc071fa53f094c962d8d42cc5be`, fuente `05c63da`: inbox operacional y runbook; 647 pruebas, CI [36875536747](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/36875536747) aprobó tests/lint/build. No se crearon Worker/D1 operacionales remotos ni consumidor.

El setup detectó expectativas locales incorrectas: `/api/projects` devuelve 401 JSON sin sesión; `/api/projects/probe` no existe y devuelve 404. Corrección local probada RED→GREEN; 649 pruebas totales y lint de los archivos modificados sin errores. Rechaza denegaciones inventadas, datos extras, respuesta 200 o caché insegura. La ruta ausente se identifica como `local_missing_route` y no prueba Access. Los modos edge mantienen sus exigencias de redirects/headers de Cloudflare. Compilación de esta corrección pendiente de CI al crear PR.

## Continuidad

Actualizar checkout del setup sin perder cambios, leer runbook en main, ejecutar suite/build/smoke corregido y revisar reporte. Actualizar skill de inicio para retirar excepciones históricas. Publicar después de revisión del owner. La primera tarea posterior debe acreditar entorno publicado, revisión y herramientas; después conectar disparador cloud con uso de suscripción y aceptar incidente sintético con PC apagado.

Setup no equivale a monitor continuo, permisos Cloudflare, lectura de expedientes, envío de correo ni reparación productiva. Producción permanece intacta; no se activó facturación API.
