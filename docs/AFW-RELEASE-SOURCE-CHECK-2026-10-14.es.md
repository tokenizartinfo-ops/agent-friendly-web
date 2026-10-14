# Comprobación de fuente antes de compilar AFW

El CLI `scripts/build-mcp-own-worker.mjs` exige que la revisión indicada coincida con HEAD del repositorio que contiene el script. Antes y después de compilar comprueba que los directorios lib, worker y scripts, y los manifiestos de dependencias/configuración declarados no tengan cambios ni archivos nuevos. Rechaza archivos ignorados dentro de esas entradas y flags de índice que pueden ocultar modificaciones (assume-unchanged o skip-worktree).

El artefacto conserva sourceRevision, sourceTree, sourceCheck, programHash y workerHash. El resultado de la función interna de compilación usada por tests no constituye evidencia de publicación. Los archivos ajenos a estas entradas, como logs y output, no se modifican.

Esta comprobación detecta deriva accidental de la fuente; no es una compilación hermética ni una protección contra modificaciones concurrentes restauradas entre ambas lecturas. No certifica node_modules: el entorno de publicación debe instalar dependencias desde el lockfile aceptado. Tampoco acredita upload, versionId, etag ni ejecución remota.

Antes de habilitar el sucesor falta asociar el artefacto realmente enviado con el recibo confirmado de publicación y su lectura posterior. Un upload con respuesta perdida no debe reconstruirse como confirmado ni reintentarse automáticamente. No se ha publicado ni desplegado nada mediante este cambio.
