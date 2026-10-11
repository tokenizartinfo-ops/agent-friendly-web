# Plan: firma sin montaje

Base origin/main 31a4f409, rama feat/afw-mcp-signed-envelopes-20261011. Ejecución inline bajo autorización vigente; preservar error.log.

1. Crear test/mcp-signed-envelope.test.mjs con vector literal, proyección real del expediente, validaciones de secretos/IDs/fecha, rechazo de coerción, cuerpo firmado exacto y verificación estricta. Ejecutar node --test test/mcp-signed-envelope.test.mjs; RED por módulo ausente.
2. Crear lib/mcp-signed-envelope.mjs con las tres APIs de la spec. Snapshot por contrato existente, HMAC nativo, límites y resultados congelados. No I/O/import en runtime existente. Ejecutar test enfocado GREEN.
3. Documentar separación firma/autoridad/transporte en docs/AFW-MCP-SIGNED-ENVELOPES-2026-10-11.es.md. Ejecutar npm test, npm run lint y npm run build. Registrar outputs sin secretos en output/afw-mcp-signed-envelope-ledger-20261011.md.
4. Revisión fresca de rama completa; una pasada de corrección RED→GREEN si aparece P1/P2, sin rereview. Commit/push/PR y checks exacthead, integrar solo con validación correcta bajo autorizaciones vigentes. Actualizar continuidad.

Review focus: base64 permissivo de Buffer; toJSON/accessors ejecutables; algoritmo y bytes; duplicados JSON y longitud de desafío; confundir validación local con permiso/uso único real.
