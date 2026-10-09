# Lectura administrativa del recibo privado

9 octubre 2026. Preparación del ensayo propio; no acredita ejecución remota ni PC apagada.

El Workflow administrativo existente acepta `operation: observe` y una referencia exacta del registro. Lee dos veces la inscripción y aprobación históricas del Durable Object primario, comprueba su correlación y obtiene la metadata del desafío firmado. Devuelve únicamente estado del diario, referencia del recibo y fechas; nunca nonce, credenciales ni aprobación completa.

La lectura histórica sigue disponible después del vencimiento o retirada y en la versión de reversión. Un recibo confirmado demuestra aquella recepción, no permiso vigente, instalación, procedencia cloud por sí solo ni supervisión permanente. La correlación con tarea, turno, comando, fuente y salida oficial de plataforma exige constatación administrativa independiente.

No agrega rutas HTTP, bindings, clases, migraciones, programación ni privilegios. `register` conserva su contrato y validación vigente; la reversión continúa rechazándolo. `observe` no escribe pasos de Workflow ni modifica el registro. Parámetros adicionales, referencia incorrecta, deriva de inscripción, metadata sensible, fechas incompatibles, retroceso de reloj, fallo de transporte o timeout devuelven `unavailable`, sin reintentos.

Las pruebas nativas ejercitan un Workflow y SQLite Durable Object reales en Miniflare: recepción autenticada, observación del mismo recibo, referencia ajena, registro ausente, retiro, reinicio y reversión con historia preservada. Se detectó que workerd añade un manejador RPC `Symbol.dispose`: el adaptador copia los datos y libera ese manejador antes de aplicar el esquema estricto. Las pruebas unitarias cubren además lectura posterior al vencimiento, diario ausente/emitido/retirado, campos secretos, cambios históricos, timeout y reloj regresivo.

La publicación remota cerrada y su lectura de configuración deben registrarse por separado. El servicio no se habilita por integrar este código.

Después: implementar la autoridad primaria de reserva por recursos propios, fuentes administrativas de proveedor y expediente de custodia correlacionado. `custodyRef` identifica un expediente previo, no un recibo futuro; la evidencia posterior se añade sin cambiar la inscripción. Primero ensayo PC encendida e instalación recuperable, después una única ocurrencia programada y un intervalo acordado de PC apagada. Max sigue fuera de este ensayo.
