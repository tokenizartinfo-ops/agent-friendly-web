# Plan: registro original y custodia Node

Base25687307, rama feat/afw-node-process-custody-20261011. Spec docs/AFW-NODE-PROCESS-CUSTODY-2026-10-11.es.md; inline bajo autorización vigente; preservar error.log.

1. TDD test/mcp-node-process-custody.test.mjs: SQLite primary/DO reales, permisos originales sintéticos. RED módulo ausente. db/dossier-node-process.sql append-only grant budget; lib/mcp-node-process-custody.mjs fixedcontext/nativeSQL CAS/firstACK + encrypted DO state/lease/launch/observe.
2. Demostrar ACK perdido en cada store y desaparición DO sin nuevo presupuesto D1; errores de estado/fuente/plataforma/permiso y no key en storage. No defaults permisivos, unknownACK no recuperación de start.
3. Tests nativos D1/workerd/DO proporcionados para semántica SQL y storage; documentar separadamente fixtures y hosting pendiente. Singlefreshreview del cambio completo; corregir una pasada RED→GREEN, sin rereview. Finalfocused/lint/build/full, commit/PR/exactCI/merge/trees/mainCI, checkpoints/gates.
4. Seguir con entrypoint Node real y Container binding cerrado tras cerrar este bloque; no repetir viabilidad TLS ni activar clientes por código local.
