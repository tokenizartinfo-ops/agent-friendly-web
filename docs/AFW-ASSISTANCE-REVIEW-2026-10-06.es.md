# AFW: revisión operacional de ayuda

Implementación local del 6 de octubre. No turno cloud real, activación, respuesta sobre contenido privado ni resolución acreditados por estas pruebas.

## Contrato de servicio

El gerente puede consultar `/assistance`, reservar `/assistance/claim` con eventId y requestId exactos, y completar `/assistance/finish` con runId y outcome `reviewed` o `intervention_required`. No texto libre ni outcome `resolved`. Reutiliza la verificación estricta de servicio Cloudflare Access: origen, issuer, audiencia única, cliente exacto, type app, subject vacío, expiración y firma válidos; rechaza Origin/Sec-Fetch del navegador y limita peticiones.

Inscripción por referencias de propósito propio `AFW_ASSISTANCE_PROJECT_REFS`, flag `AFW_ASSISTANCE_SUPERVISION_ENABLED=true`, ventana UTC y presupuesto simétrico son requisitos independientes. Modos ayuda y guardados son excluyentes. Missing/invalid configuración y retirada fallan cerrados; se vuelve a comprobar la ventana después de awaits relevantes. La identidad operacional no obtiene acceso al expediente privado.

Una reserva dura como máximo cinco minutos y se recorta al final de la ventana. requestId estable recupera la misma reserva tras respuesta perdida. No se completa después de expirar ni se renueva por reintento. Una nueva revisión de ayuda vuelve obsoleto el evento anterior; finalizarlo produce superseded. `reviewed` significa revisión operacional de metadata, no solución para el usuario.

## Presupuesto común

`assistanceBudgetFence` se incluye dentro del INSERT/UPDATE de admisión, sin una lectura previa de contadores. Una sola reserva activa y tres intentos por24h, sumando `assistance_supervision_runs`, `dossier_supervision_runs`, `operations_investigations` y `operations_notice_reservations`. Los intentos expirados siguen consumiendo presupuesto; cambiar de modo no crea otra cuota.

Ayuda siempre exige el fence. Los modos previos lo usan con `AFW_OPERATIONS_SHARED_ASSISTANCE_BUDGET_ENABLED=true`, conservado en la configuración canónica del gerente incluso con ayuda cerrada. No retirar ese control durante una transición de modo para esquivar el historial. Antes de cualquier apertura deben existir los cuatro esquemas aditivos en el ledger correcto. Una tabla faltante falla cerrada; no justificar por eso recrear bases, borrar historial o ampliar permisos.

## Evidencia y siguientes pasos

Regresiones observadas antes de implementar: funciones de revisión ausentes; rutas de servicio indisponibles; una investigación previa podía reservarse a la vez que ayuda; configuración sin presupuesto simétrico. Corregidas y probadas. Suite acotada11/11 con configuración, ledger y servicio; regresión de consumidores anteriores28/28; pruebas HTTP del servicio y rutas anteriores12/12. Lint y CI integral son comprobaciones separadas.

Workerd y D1 reales locales: JWT sintético de servicio aceptado; respuesta de claim perdida, replay con una única reserva, finish idempotente, lista quieta después de revisión y retirada404. Se prueba código y contrato, no un turno del gerente cloud publicado.

Sigue publicar código del gerente cerrado con procedencia/rollback y D1/custodia comprobados; preparar ledger QA con todos los esquemas; adoptar esta fuente en el entorno cloud ya autorizado; prueba propia de señal comprometida→entrega→GET/claim/finish real→cierre/retirada. No repetir la custodia o aceptación del circuito previo por un error de conexión histórico. Primero resolver readiness/network del executor con el procedimiento documentado.

Después devolver el recibo real a la aplicación mediante servicio y contrato separados. La comparación con la revisión privada vigente y cualquier repregunta requieren contexto consentido y revocable; no inferirlos a partir de metadata. No invitar a Sector de Sistemas ni activar guardia permanente por este documento.

Rollback: cerrar consumer/ayuda/ventana y trigger, conservar presupuesto e historial, retirar activación, volver a la versión previa preservando D1/custodia. Verificar bindings efectivos después de seleccionar versión.
