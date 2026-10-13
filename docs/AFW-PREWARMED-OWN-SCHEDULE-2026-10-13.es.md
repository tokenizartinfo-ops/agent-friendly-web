# Preparar el disparador antes del permiso

Cloudflare documenta hasta quince minutos para propagar cambios de cron: https://developers.cloudflare.com/workers/configuration/cron-triggers/ . Un permiso de diez minutos no debe depender de instalar su disparador después del consentimiento. Esto identifica un riesgo de preparación; no demuestra la causa del ensayo vencido del 13 de octubre.

El modo opcional de servidor `AFW_DOSSIER_EVENTS_SCHEDULE_MODE=stable-minute` permite conservar un único cron `* * * * *`. Se prepara mientras las seis capacidades están cerradas y no hay política de ejecución: las invocaciones retornan sin seleccionar Node ni acceder a datos privados. Antes de solicitar un permiso nuevo, se debe observar una invocación real del proveedor y de la versión cerrada esperada. Una lectura de configuración, un ensayo local o esperar quince minutos no sustituyen esa evidencia.

Con la política original instalada, los minutos intermedios siguen inactivos. La entrega solo puede solicitarse en el `dispatchAt` original dentro del permiso vigente; una invocación posterior no recupera una entrega perdida. El presupuesto durable sigue admitiendo una sola entrega. El cierre puede solicitarse desde el `closeAt` original en adelante, incluso con capacidades de entrega cerradas; se verifica por separado la detención física. Esto no renueva el permiso ni acredita retiro nativo del consumidor.

El preparador exige modo explícito y exactamente ese único cron; conserva el vencimiento original, los recursos y la identidad. El modo predeterminado `exact` conserva su contrato anterior y rechaza un cron ya instalado.

La observación previa es acotada y supervisada. Se conservan únicamente fecha, tipo de invocación, cron, resultado y versión; nunca solicitudes HTTP, cookies, encabezados, respuestas del expediente ni logs sin sanear. No se deja una guardia permanente: al suspender o finalizar la preparación se retira el cron y se comprueban capacidades cerradas e instancias físicas vacías. Una invocación cerrada no demuestra una notificación, una revisión cloud útil ni funcionamiento con el ordenador apagado.

Estado de preparación: pruebas locales focalizadas 18/18; revisión, aceptación de CI, despliegue cerrado y observación real pendientes. No abrir otra ventana de consentimiento para validar únicamente la propagación del cron.
