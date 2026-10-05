# AFW: vencimiento del productor operacional

Antes de promover una ventana operacional se detectó que createOperationsProducer solo comprobaba enabled y no el deadline. Incluso con ventana ausente o vencida iniciaba una reserva, seis sondas y entregas. El productor remoto permanecía disabled; no se activó para reproducir el fallo.

Dos regresiones RED demostraron acceso D1 con ventana cerrada y continuación de red/entrega después de vencer durante la primera sonda. La corrección reutiliza operationsWindowOpen: comprueba al entrar, antes/después de admitir lease, antes de cada fetch real, después del observer, después de firmar e inmediatamente antes de receiver.fetch, y antes de finalizar el checkpoint.

Cuando vence, conserva la lease unfinished para recuperación durable. No inicia otro target ni entrega una observación failed causada por el corte. El observer puede clasificar internamente el fetch bloqueado como network_unavailable, pero el productor pausa antes de enviar esa señal o finalizar.

Una operación admitida antes del deadline puede concluir después: el corte no revierte un POST recibido ni una transacción D1 ya iniciada. La regresión de respuesta de entrega en vuelo conserva el evento admitido y la lease pendiente, sin falsa confirmación ni segundo target. No prometer cancelación retroactiva.

Validación: suite completa previa905/905, lint0errores/2warnings existentes y build completo; posterior prueba adicional de entrega en vuelo4/4 casos productor. CI de la revisión debe validar la suite906 antes de merge. Sin migraciones, datos de clientes o activación permanente.

Inventario público read-only: las seis rutas de delegated-canary/delegated-pilot son404 con las versiones esperadas aa121311/94a3c291. Dos lecturas iniciales PowerShell tuvieron error de transporte; curl corroboró404 sin credenciales. Esto solo verifica el borde cerrado, no lectura privada ni funcionalidad OAuth.

Promoción remota: desplegar primero productor disabled/sin deadline/cron vacío, conservar servicio receptor y D1operacional original. Verificar settings y versión independientemente. Después preparar ventana operacional con firma de entrega en custodia servidor y cierre de todos los componentes; no habilitar cron sin ese contrato.
