# Plan de servidor Node de producto

Ejecución inline autorizada. Base5ba3e54; spec docs/AFW-PRODUCT-NODE-SERVER-2026-10-11.es.md. Un cambio revisable, sin infraestructura remota ni tocar error.log.

1. RED de test/mcp-node-readiness.test.mjs; lib/mcp-node-readiness.mjs separación de propósitos/desafío original/campos exactos/lease/aceptación una vez. GREEN antes de servidor.
2. RED de test/mcp-node-server-native.test.mjs; scripts/build-mcp-node-program.mjs build/hash, worker/mcp-node/server.mjs bootstrap y validación del programa real, lib/mcp-node-http-server.mjs límites/cancelación/control fijo/transporte existente/cierre monotónico.
3. RED de socket parcial retenido, corrección y GREEN. Proceso hijo original lease y bundle test-only de reloj retrocedido; no override productivo de red/certificados/modelo.
4. Una revisión fresh del cambio completo, resolver Important con RED→GREEN una pasada. Foco+suite/lint/build, commit/PR/exactcandidateCI/merge/árboles/mainCI. Checkpoint con diferencias entre fuente local y alojamiento real.
5. Seguir adaptador real Container/SAME DO/bootstrapcustody/contexto/closedmount y realcallback/completedcloudturn; solo luego PC-off acordado y Max.
