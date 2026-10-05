# AFW: admisión de avisos conectada al watchdog

El runtime runWatchdog ahora llama a admitWatchdogNotices después de registrar la observación, únicamente con AFW_OPERATIONS_NOTICES_ENABLED=true. El manifiesto mantiene esta bandera false, sin cron o deadline. No dispatch, claim, ACK, diagnóstico ni reparación desde el watchdog.

La admisión usa el mismo binding primario y revalida reloj/deadline posterior a la persistencia. SQL comprueba revisión/condición/fecha actuales y deduplica resource/revision. Outbox e inbox se escriben en transacciones separadas: no prometer atomicidad conjunta. Si inbox falla, outbox durable se conserva y el ciclo siguiente vuelve a intentar admisión del estado vigente; una pausa concurrente impide admitir historial. El error externo permanece genérico.

Tres pruebas nuevas fallaron antes de modificar el runtime y luego pasaron: admisión/dedupe/pausa, deadline entre outbox e inbox, fallo de inbox seguido de recuperación sin duplicar outbox. Quince pruebas focalizadas cubren además condiciones inválidas/stale y pausa durante SQL. Suite completa826/826. No se activó runtime remoto ni se acredita cron de esta integración; la aceptación programada de recepción previa usó fixture manual y permanece separada.

Prerequisitos remotos: operaciones D1 con schemas producer-state/watchdog-state/watchdog-inbox, flags explícitas y ventana. Esquemas operativos cerrados preparados según AFW-NOTICE-OPERATING-HANDOFF-2026-10-05.es.md. Próximo ensayo específico: cron QA de esta admisión con transición vigente, reobservación/dedupe, pausa y cierre; sin clientes o nuevas pruebas PC-off. Cadencia permanente requiere resolución trazable de review_required e identidad de servicio custodiada vigente.
