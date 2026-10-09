# Ejecutable cloud de una ocurrencia propia

Implementar inline el wrapper existente, sin nuevo protocolo ni proveedor. Entrada: un archivo local de metadatos con únicamente manifest y planDigest, máximo 8192 bytes, UTF-8 válido. Custodia: process.env, nunca archivo, argv ni salida. stdin/stdout quedan reservados a seis intercambios host correlacionados y un resultado saneado. No scheduler, retry, autorización nueva ni publicación cloud implícita.

1. Pruebas RED de proceso: archivo inválido/campos secretos no producen HTTP ni observación; recorrido válido sintético produce seis observaciones y seis HTTP; observación incongruente detiene antes del primer HTTP. Sin tráfico real.
2. Script scripts/afw-run-http-occurrence.mjs: límites/forma exacta, llamar runAssistanceHttpOccurrenceWithHostBridge, cerrar stdin y producir resultado con exit 0 solo completed. Errores silenciosos y resultado unavailable, sin stderr privado.
3. Pruebas enfocadas, lint y suite; revisión independiente del bloque, CI antes de integrar. Nueva publicación/adopción requerida para usar este ejecutable en cloud; no fingir HEAD ni reusar prueba metadata como ejecución HTTP.

Ruling: separar el bloque cliente del montaje administrativo; la fuente nueva se adopta explícitamente, mientras la API mantiene origen y contrato existentes. Ninguna prueba sintética acredita custodia propia vigente ni PC apagado.
