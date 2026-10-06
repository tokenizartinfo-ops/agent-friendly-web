# Seguimiento cloud del expediente: contrato y orden de implementación

Estado: diseño operativo, sin despliegue ni guardia permanente. Complementa el piloto app-first de Sector; no sustituye consentimiento ni permite leer expedientes con la identidad operacional actual.

## Fuente y aislamiento

`app/api/projects/route.ts` ya escribe el proyecto y su evento dentro del mismo batch atómico D1. Un conflicto de revisión no crea evento. Esa constancia debe ser la fuente del seguimiento; no emitir un webhook antes de confirmar el guardado, ni hacer depender el guardado del estado del proveedor cloud.

El productor toma eventos confirmados de proyectos explícitamente inscritos. Conserva su cursor y reintenta con clave estable. Exporta un sobre cerrado: versión de contrato, ID opaco del evento, referencia opaca del proyecto, revisión, tipo permitido y fecha. No exporta correo, nombre, dominio, respuestas, fragmentos, lista de campos modificados ni transcripciones. La referencia opaca permite correlacionar eventos y es privada: no publicarla en Registry ni documentos de arquitectura.

El journal operativo de incidentes y clientes se mantiene separado del Fix-Center de arquitectura. Al elevar un defecto técnico, incluir solo referencia opaca y reproducción sintética.

## Recepción y trabajo

Validar esquema exacto, firma, audiencia, fecha, proyecto inscrito y vigencia antes de recibir. Aceptación idempotente por ID; una revisión vieja no puede sobrescribir una nueva. Firma o inscripción retirada debe rechazar aunque exista una sesión previa. Cola acotada, lease y expiración evitan dos ejecuciones concurrentes. La recepción tiene estados independientes: recibido, reservado, revisado, requiere intervención, resuelto. Un HTTP 200 o ACK no acredita reparación.

El primer consumidor cloud solo recibe metadata y puede detectar falta de avance o incidentes de la plataforma. Un borrador incompleto no es un incidente: el cliente puede pausar. No enviar recordatorios sin preferencia y cadencia consentidas. Una nueva respuesta no exige un nuevo mensaje al cliente si el copilot de la aplicación ya continuó el recorrido.

Leer contenido para orientar o preparar una repregunta exige un servicio de expedientes separado, autorización del proyecto e identidad resueltas por servidor, consentimiento revocable y alcance explícito. No ampliar `operations-client.mjs` para aceptar IDs arbitrarios ni copiar credenciales del cliente. Las propuestas siguen siendo borradores revisables dentro de AFW; el manager no publica ni aprueba en nombre de Max.

## Orden y aceptación

1. Contrato y proyección de eventos sintéticos: rechazar campos extra, contenido privado, revisiones inválidas y eventos fuera de inscripción. Pruebas RED/GREEN antes de implementación.
2. Productor deshabilitado por defecto, cursor durable y recepción idempotente en ensayo aislado. Demostrar fallo del receptor sin pérdida del guardado y reintento sin duplicados.
3. Consumidor cloud acotado: fuente publicada verificada, una reserva, revisión de metadata, constancia y cierre. Presupuesto inicial de prueba: un proyecto sintético y una ejecución; sin cron permanente.
4. Servicio de lectura consentida y repregunta: probar permiso, rechazo, revocación y aislamiento con dos identidades antes de proyecto real.
5. Promover cadencia solo después de los recibos: cuota por ventana, máximo de concurrencia, timeout, backoff, interruptor de retirada y aviso humano por fallo persistente. La publicación del entorno no prueba que una ejecución ocurriera.

Para Sector: la invitación propia corregida se revisa primero; el cliente crea su expediente autenticado. Se añade únicamente ese ID al piloto conservando los anteriores. No crear propiedad del expediente desde su correo ni prometer vigilancia continua mientras estos bloques sigan pendientes.
