# Plan de implementación: puente Node privado firmado

Base aa4da475; rama feat/afw-private-node-bridge-20261011. Ejecución inline bajo autorización vigente; preservar error.log. Spec: docs/AFW-PRIVATE-NODE-BRIDGE-2026-10-11.es.md.

1. Módulo lib/mcp-node-private-bridge.mjs: propósito/Container/generación/lease/referencia exactos; claves derivadas por propósito y snapshots; fallar cerrado por defecto.
2. Handlers privados consume/dispatch y sender sobre Fetchers fijos; contexto original de plataforma y controlador request-bound SAME autoridad; firma handoff/receipt, bytes/deadline/cancelación, transporte nativo por defecto. No importar en runtime.
3. test/mcp-node-private-bridge.test.mjs y fixture Node hijo test/fixtures/mcp-node-process-bridge.mjs: firma/reflection/tamper/getter/expiry/lease/abort, HTTP real y SQLite SAME-stage, pérdidaACK/replay/ambas fases, Node separado IPC. TDD RED y desfase real1ms documentados; tolerancia solo issuedAt, nunca deadline.
4. Once pruebas enfocadas y regresiones existentes, lint/build y suite completa proporcionada; revisión fresca única de cambio completo. Corregir P1/P2 reproduciendo RED, sin rereview. Commit/push/PR, CI exacthead, merge y CI main/árbol igual. Guardar checkpoint/gates/evidencia, informar chat cloud autorizado solo continuidad sin operaciones/adopción.

No montar antes de registro/custodia/preflight/provenance de plataforma y rollback reales. No keys/OTP/Max/scheduler/PCoff por estas fixtures.
