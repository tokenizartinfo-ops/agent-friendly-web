# Correlación privada de ejecución: contrato del bloque

Preparación interna de Task2, sin montaje ni autoridad de instalación. El host administrativo resuelve tres originales por canales propios; el consumidor no puede suministrarlos ni seleccionar recursos. Un `sourceRef` localiza evidencia, no autentica su contenido por sí solo.

`readPins` conserva inscripción y aprobación completas V2, más `cloud`: threadId, environmentId, cwd y commandDigest. La fuente/configuración/publicación se fijan en el manifiesto aprobado, sin duplicar versiones elegibles. Origin se fija al repositorio AFW.

`readOfficialContext` aporta exactamente source=`official-platform-activity`, sourceRef, observedAt, threadId, turnId, callId, environmentId, configId, publicationId, configurationRevision, observationRevision, observationsCurrent, connectivity, phase, networkMode y networkState. Solo el original oficial o su constatación administrativa independiente puede originar estos campos; el informe del asistente no lo sustituye.

`readExecution` aporta exactamente source=`official-thread-command`, sourceRef, observedAt, threadId, turnId, commandItemId, commandDigest, cwd, turnStartedAt, turnCompletedAt, exitCode, sourceRevision, origin, checkoutClean, recordRef y receiptRef. Las fechas son límites del turno original, disponibles en el lector administrativo, no fechas de comando inventadas. HEAD/origin y estado del checkout requieren sus propias lecturas originales comprobadas. La salida de la operación solo localiza el recibo y no acredita publicación ni recepción.

`readChallengeObservation` conserva el contrato existente `afw-private-qa-observation/v1`, estado observado, recordRef y challenge confirmado. El recibo y las fechas proceden del diario primario autenticado. Retiro, ausencia de desafío o recibo ajeno impiden correlación.

Todas las fechas deben pertenecer a la ventana propia; el contexto se observa en el mismo turno de ejecución, después de su inicio y antes de emitir el desafío; emisión/consumo quedan dentro de ese turno completado. El contexto exige revisión actual coincidente, red restricted/enforced, fase running y conexión activa observadas. El TTL administrativo se fija antes de la ventana (30 segundos por defecto, máximo diez minutos); no renueva la fecha de las fuentes. Dos lecturas de cada fuente deben coincidir, con límite total y AbortSignal compartidos.

La salida contiene solo referencias de fuente, recibo, registro, digest de pins y fecha de correlación bajo `afw-private-execution-correlation/v1`. No crea propiedad de recursos, custodia exclusiva, atestación VM, desafío, programación ni permiso de instalación. Los lectores reales y la recepción propia permanecen pendientes; los fixtures de pruebas no acreditan procedencia operativa.
