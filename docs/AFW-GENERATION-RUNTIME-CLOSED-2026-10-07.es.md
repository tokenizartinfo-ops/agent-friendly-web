# Runtime de orientación preparado, 7 octubre

El entrypoint independiente de `agent-friendly-web-goal-context-canary` ahora compone `/proposal` con el presupuesto durable y el adaptador Workers AI. Lectura, propuesta y generación tienen flags separados, todosfalse en la configuración editable. No se infiere generación al activar lectura. El locale del generador viene del servidor y debe ser es/en/pt. Sin binding AI o locale válido no hay inferencia.

La identidad de propuesta exige pins distintos para propuesta/lectura/operaciones y tres secretos HMAC distintos. D1 fuente y operativo son dependencias separadas; la reserva registra únicamente referencias opacas en el operativo. Un JWT válido no acredita revocación viva de Access ni consentimiento privado: siguen los controles primarios del contexto y del lease. No hay cron ni matrícula automática de clientes.

Pruebas: se observó red404vs401 antes de incorporar la ruta; después autentica antes de inferir y permanece cerrada sin configuración. Workerd con dos D1, JWT/HMAC real sintético, presupuesto SQL real y binding AI simulado: una reserva, una llamada, un resultado; retry devuelve exactamente la misma propuesta; retirada403 y narrativa conservada. Ocho pruebas del presupuesto/proveedor/composición nativa pasan; suite completa1086 y lint de los archivos modificados aprobados. Esto no acredita una llamada remota al modelo.

Pendiente para ensayo real: política y custodia de propuesta diferenciadas, recursos fuente/operativo propios verificados, esquema aditivo conservado, cuota compartida y matrícula propia limitada, recibo privado consentido y revisión operativa vigente, ventana canónica finita, consulta del modelo/lectura/retirada verificadas y cierre final. No usar la cuenta ni expediente de Max para esta preparación. No promover guardia permanente ni ampliar el piloto de producción.

## Recibo remoto cerrado

Fuente5fafeb489249053f3117108f5f8d0dfeebb03d75; CI37619104758 aprobada. Worker agent-friendly-web-goal-context-canary versión9a7a75ab-4b41-4899-9f6a-10b5629e220b100%, deploymentef9a39a5-1d2d-4020-83eb-29f3dac34daf (7oct12:11:03UTC). API posterior confirma solo tres flagsfalse, sin D1/AI/secretos/limiter/inscripción, workers.dev y previewsfalse, schedules[]. Rollback87142980-bce1-47ab-853c-01678e00686a conservado. No migraciones ni inferencia remota. La corrección pública tiene recibo independiente AFW-ICON-PRODUCTION-RELEASE-2026-10-07.es.md.
