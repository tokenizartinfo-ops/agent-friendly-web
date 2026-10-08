# Recibo local — occurrence D1, 2026-10-08

Base: 8eecaac0dcfca4c5dd2748cd75c8dda5b6cde5cc. Rama propia afw/local-occurrence-d1; worktree /workspace/work/afw-occurrence-d1. Checkout original preservado. No remoto, HTTP privado, SQL remoto, configuración, permisos, claves, gates, publicación o nuevas tareas. No declarar listo para piloto.

## TDD y verificación

- RED inicial antes de schema/módulo: seis SQLite y un Miniflare, contrato ausente. Logs *-red.txt versionados.
- Regresión cierre expirado: 8pass/1fail antes de corregir CHECK lease; después9pass. Conserva lease histórico al cerrar, sin preflight ni red.
- Regresión UUID SQL:9pass/1fail; constraints UUID completos corregidos.
- Regresión constraints SQL config/fecha:14pass/1fail; sufijos estrictos y fecha JS máxima corregidos.
- Regresión error de proveedor:15pass/1fail; fallo preflight ahora false sin detalles privados.
- GREEN final SQLite real:16/16, dos conexiones a un mismo archivo SQLite, no fake DB. Casos CASrace, consumo concurrente, UUID cambiado misma señal, replay/lost responses, efecto CHECK y postcondición cero filas, cierre/finish, señal nueva en espera, constraints/inmutabilidad, preflight/margen.
- Focalización existente por proceso separado: occurrence15total/14pass/1skip Windows; client3pass; assistance review/shared budget5pass; controls5pass. Suma con nuevas:44tests,43pass/1skip/0fail. Logs individuales versionados.
- Una ejecución conjunta con --test-isolation=none tuvo un fallo transitorio en el timeout15ms del client existente (aborted false); el mismo archivo pasó aislado tanto en base intacta como worktree. No se modificó código ni test legacy; se verificaron archivos por procesos separados. El recibo no oculta ese intento.
- Lint focalizado: exit0. No build/full suite: módulo no montado y esquema aditivo únicamente, no publicación. No ampliar verificación por build como prueba de QA remota.
- Miniflare real: test escrito, RED contractual observado, ejecución posterior/final BLOQUEADA por listen EPERM 127.0.0.1 en use_default. No solicitar/ampliar permisos por restricción del usuario. No convertir bloqueo en skip o native pass; falta aceptación workerd/D1. Log workerd-blocked versionado.

## Revisión independiente

Reviewer revisó CAS/batch/close y no encontró defecto crítico. Hallazgo constraints SQL más laxos que JS corregido con RED→GREEN. Pruebas solicitadas de consumo concurrente, finish vs close, claim/finish perdido, postcondición SQL y señal cambiada agregadas/pasadas en SQLite. Corrección UUID realizada durante revisión y endurecimiento posterior de rangos/config. No atribuir prueba Miniflare a esta revisión ni anunciar integración legacy.

## Decisiones y pendientes

- Journal modela admisión por attempted y consumo por consumed/completed; índices únicos parciales y triggers en mismo batch, no tablas mutables separadas. Exclusión por occurrence/request/event global; sin atestación de VM.
- Claims/finish reciben array de statements confiables en consume; transición primero y efecto después en un único db.batch. No callback de IO ni dos commits. Una postcondición SQL puede abortar efecto de cero filas; integración debe construirla y correlacionar run/lease/presupuesto. Array nunca es input HTTP.
- No se integra claimAssistanceSignal/finishAssistanceSignal legacy aún, ni rutas/budgets. Pruebas genéricas qa_effects acreditan atomicidad del mecanismo SQL, no reserva de negocio integrada.
- Controles SQL confirmados <=4 y fases operacionales admitidas <=3. Capa de transporte futura debe contabilizar TODAS las solicitudes enviadas/incluidas las perdidas/rechazadas, máximo4control/3operacionales/7total sin retries. Este módulo sin HTTP no observa solicitudes que nunca llegan ni promete presupuesto de red implementado.
- D1 QA citada por recibo histórico únicamente; ningún binding vivo verificado/cambiado. Sin prueba cross-instance remota o PC-off; /workspace/work no acredita persistencia entre instancias.
- Antes de piloto: workerd green bajo ejecución ya permitida, integración transaccional con helpers y sus postcondiciones, contador de transporte, rutas QA cerradas y fences legacy, verificación independiente de binding/owner/preflight/cierre, señal propia nueva y consentimiento/contexto privado separados.

## Cierre posterior autorizado: Miniflare green y push de rama

El owner autorizó network.enabled=true por comando, sin alterar política ni credenciales. Native D1 se ejecutó con proxy/CA/TLS heredados y restricted/enforced conservado. Primera ejecución soportada expuso defecto en cargador de test: regex terminaba trigger en END de CASE; causó D1_ERROR transacción no permitida. Se corrigió terminación anclada a END de trigger y formato multilínea de triggers de inmutabilidad, sin cambiar lógica del esquema. Segunda ejecución native1/1pass,0fail. Log workerd-green versionado; EPERM anterior permanece evidencia histórica, ya superado por permiso por comando.

Retorno explícito use_default: SQLite16/16; lint0; diff-check0. environment_status posterior: currenttrue, spec/observed7/7, restricted/enforced, diez custodiasready; source publication original sin cambio. No se modificó proxy/TLS/policy/config. Origin verificado https://github.com/tokenizartinfo-ops/agent-friendly-web.git.

Push autorizado exclusivamente HEAD:refs/heads/afw/local-occurrence-d1, sin force/main; verificación remota por ls-remote. Resultado del push se registra en continuidad fuera del commit para no crear otro commit circular. Continúan pendientes integración helpers/rutas/contador y aceptación QA propia; no listo para piloto. Sin Cloudflare/SQL remoto/gates/cliente.
