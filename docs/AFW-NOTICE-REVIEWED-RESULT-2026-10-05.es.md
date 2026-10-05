# Resultado trazable de avisos revisados — 5 de octubre de 2026

Cuando el historial recuperado contenía únicamente cierres humanos y no había avisos actuales, runNoticeCycle devolvía idle. El gerente perdía la diferencia entre no tener actividad y tener una constancia de revisión. Ahora devuelve reviewed, runId, review (decisión/motivo/fecha) y outcome original; elige la revisión más reciente por reviewedAt entre el historial recuperado. No afirma que sea todo el historial: la API mantiene su límite/ventana existentes.

No reserva, ACKea ni envía un aviso cerrado. Un aviso nuevo conserva su recorrido normal; retain_block sigue deteniendo el ciclo y reclamando revisión. Reconciled de una recepción aceptada conserva el contrato previo. Reviewed es una clasificación de constancia humana, no entrega, recuperación ni reparación. La autoridad sigue proveniendo del historial autenticado del servidor; se valida reviewMatchesReceipt y fechas antes de usarlo. No cambia permisos, flags, SQL, presupuesto o límites.

RED: caso de cierre esperaba una constancia y obtuvo idle. GREEN:20/20 pruebas focales ciclo/journal correctas; ajuste de expectativa previa de idle mantiene comprobación de ceroACK. PR y CI finales se verifican antes de integrar. Este código es cliente CLI/gerente, no una actualización silenciosa del entorno cloud ni guardia permanente. Incorporar la nueva fuente al siguiente ciclo cloud autorizado; no ejecutar ni abrir manager solo por este cambio.

La aceptación local del limitador real se integró en PR268/mainbcd830b/CI37359091929:900 pruebas. Pendientes remotos de seguridad siguen acotados en AFW-REVIEW-REAL-LIMITER-2026-10-05.es.md. QA/receptor/manager cerrados; no solicitar nuevos códigos ni renovar identidad de recepción por esta entrega.
