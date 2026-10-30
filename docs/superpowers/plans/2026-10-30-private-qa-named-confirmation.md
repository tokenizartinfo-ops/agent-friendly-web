# Plan: confirmador privado de QA y generaciones de cierre

ProyectoAFW / repoagent-friendly-web. Rama cloud aislada; Actions y APIs propias autorizadas. No dependencias o builds locales. Base82f854c; main conserva cada incremento aceptado.

## A. Contratos y procedencia

- [ ] Revisión del diseño completo y orden de presupuesto, incluidos límites entre control/confirmación/limpieza.
- [ ] Cápsula estricta servidor y adaptador mínimo de entorno; validar operación/hash/bindings y flags cerrados antes de effects. No publicador al nominal.
- [ ] Lector version_metadata en ambos contextos; argumento expectedUUID estrecha, no autoriza. Guardar correlación de source/module/config antes de ARM.

## B. Control generacional

- [ ] HEAD/INFO/control V2 aditivos, CAS contra predecessor retirado/vencido y prueba D1 reconciliada sin reserva; sin transacción distribuida inventada.
- [ ] Autoridad por plan/versión/ventana con lease5s y cajas/snapshot/disposal RPC; late-withdrawal aislada, old APIs de escritura bloqueadas tras HEAD.
- [ ] Journals nuevos por plan y allowlist, historia legacy intacta, unknownACK terminal; cero reserva solo antes de ARM, luego solo reserva propia.

## C. Ejecutor e integración

- [ ] Nueva clase PrivateQaNamedConfirmation del host existente; wrapper HTTP cerrado, bundle explícito y authorize interno. Integración privada V2 de cancelaciones en broker con pins estables, ningún selector público.
- [ ] Inventario fijo adicional de Workflow QA paginado; terminal nominal antes de restore y guard actual permitido mientras cierra.
- [ ] Retirada exclusiva de permisos y fallback sin admisión con prueba primaria/nativa exacta; cualquier admisión exige handoff físico.
- [ ] Packaging separado con tamaño medido, source/sourceTree/moduleHash/configHash y rollback cerrado compatible con todos los exports nuevos.

## D. Cualificación

Cada componente: escribir RED, observar causa real, implementar GREEN, dirigida proporcionada y revisión independiente. Antes de integrar el conjunto: suite/lint/build/paquetes y nativa compartida legacy+V2. No repetir checks verdes sin cambio/fallo/gate concreto.

- [ ] Fixture de integración carga los bytes congelados315 exactos y schemas originales, conserva2closures/1admission previos y reserva singleton; matriz grant/consent/scope/HEAD/código/clock/ACK/carrera/fallback.
- [ ] Verificación cerrada remota preregistrada, de identidad Workflow+DO y flagsfalse, presupuesto finito propio/rollback recuperable. No OAuth/Container/subscribe/evento.
- [ ] Preflight completo cerrado: cuenta/repo/servicio/revisión/metadata, permisos y custodia actuales, estado proveedor, todos los Workflows/cron/tails/Containers, sourcegraph y comandos listos. No usar plan start0/expires1.

## E. Ventana posterior y cierre

- [ ] Solo con paquete completo y disponibilidad del owner: permiso nuevo específico de lectura/avisos sin observaciones; catálogo sin motor; resolver ruta nativa/selección antes de gastar reserva cuando la evidencia lo permita. Un límite de plataforma sigue como gate explícito, no se rellena por inferencia.
- [ ] Guard vigente, reserva única, proceso/suscripción/recepción útil/retirada/parada/restauración con sus recibos separados. Coordinar PC-off dentro del único ensayo antes del único evento; no pedir apagar desde la preparación.
- [ ] Guardar evidencia saneada/continuidad y retirar permisos/flags; no guardia permanente, automatizaciones nuevas no justificadas ni Max.
