# Plan: adaptación Container original

Base540a182, spec docs/AFW-ORIGINAL-CONTAINER-RUNTIME-2026-10-11.es.md. Inline bajo autorización vigente; no nuevo actor cloud, rollout, secreto o namespaces. Preservar error.log.

1. RED de probe recuperado por custodia original tras reconstrucción, sin key expuesta ni nuevo launch. Derivar createNodeReadiness en observe y pasar fábrica al hook, manteniendo primarios/ACK/lease/estado.
2. RED test/mcp-original-container-runtime.test.mjs; lib/mcp-original-container-runtime.mjs APIctx exacto/programhash/source/originalwindow/fixedport+control, once start/env sin secretargv, preparación firmada más running, abort/error sin restart, timeout despuésstart y originalrestante, destroy sin falsa constancia de proveedor.
3. Prueba Node hijo real con APIctx sintética para preparación/lease/cancel/stop; separar claramente la evidencia de plataforma real. No re-probe account/NodeTLS previamente aceptado.
4. Una revisión fresh del cambio completo; resolver Important con RED→GREEN una pasada. Foco/lint/build/full exactcandidateCI y mainCI. En Windows conservar fallos previos como tales; nunca ampliar guardas para obtener verde.
5. Siguiente entrega operativa: componer el host privado con originales OAuth/D1/DO y control virtual real, plan de publicación cerrada/rollback/migración exacta antes de alojar. Ownconsent/callback/completedcloudturn/withdrawstop preceden PC-off acordado y Max preview aprobado.
