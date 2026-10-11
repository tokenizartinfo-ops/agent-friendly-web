# Montaje propio HTTP cerrado

Base aceptada: PR389, merge87e6745a32f512c91f5ca92073b7f335940da5d9.

Componer fetchOwnOccurrence en el Worker propio, default404 sin tocar dependencias, origen fijo y política servidor validada por el adaptador primario. Requerir D1, preregistro y limitador dedicado; usar autenticación existente contra JWKS remoto. Los pins provienen únicamente del preregistro configurado y las lecturas RPC fijas comparten own-qa. Detectar cambios de flags, configuración y bindings durante los awaits. Conservar cierre documental separado y todos los controles de frescura/SQL de PR389.

Cierre del bloque: RED→GREEN, ensayo workerd del montaje con recursos explícitamente sintéticos, suite/lint/build/dry-run cerrado y una revisión fresca. No desplegar, crear claves ni activar flags. La integración nativa del montaje con el preregistro real completo continúa como bloque siguiente; no declarar dispatch o PC-off desde fixtures.
