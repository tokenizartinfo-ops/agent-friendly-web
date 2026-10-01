# Plan de entrega durable

Bloque fuente del 2026-10-01. El asesor ofrece guardar capacidad elegida y responsable (owner/mantenedor), con una sola pregunta adicional. GET/PUT bajo la cápsula recuperan y conservan el plan del owner autenticado. No ejecuta publicación ni confirma acceso al hosting.

Tabla nueva `delivery_plans`, migración aditiva generada `drizzle/0013_ancient_darwin.sql`, sin ALTER/DROP ni cambios de datos existentes. Plan ligado a proyecto, sujeto, capsule ID y manifiesto. Revisión optimista evita sobrescritura entre pestañas; mutation key + payload + revisión reconocen reintentos del último guardado. Datos conservados: capacidad declarada, método recomendado, responsable, contacto de mantenedor pendiente/declarado, límites y fecha/revisión. No copia correo, credenciales ni texto libre. El cliente no puede enviar acceso comprobado ni autorizaciones.

`accessStatus: not_verified`, `capabilityEvidence: owner_declared`, `authorization: none` y `publicationStatus: not_published` son límites del plan, no una auditoría del sitio. «Contact declared» indica únicamente que existe contacto en el expediente; no prueba identidad, consentimiento ni permisos del mantenedor. Comprobar acceso real y registrar evidencia server-side será un bloque posterior por método; no incluir controles falsos para anticiparlo.

La API exige owner del proyecto, cápsula de ese proyecto, Origin exacto para escritura y JSON acotado a 2048 bytes; respuestas no-store. PUT rechaza manifiesto cambiado, estado rechazado/vencido y plazos inválidos. GET permite consultar el plan histórico; no lo convierte en una aprobación vigente. UI muestra carga/guardado/error/conflicto, conserva elección ante fallo y exige cargar el estado vigente después de conflicto. Las elecciones sin guardar están rotuladas; la persistencia solo se confirma tras respuesta del servidor. Un cambio de cápsula remonta el asesor para no reutilizar decisiones entre versiones.

Verificación fuente: 657 tests aprobados, lint sin errores (una advertencia de imagen preexistente), build completo. Pruebas SQLite usan la migración real; pruebas de ruta cubren anonimato, otro owner, cápsula ajena, Origin externo y tamaño. No acredita D1 remoto ni aceptación de UI autenticada.

Canary publicado y migrado: ver [recibo y aceptación pendiente](AFW-DELIVERY-PLAN-CANARY-2026-10-01.es.md). Falta comprobar UI/guardado/reapertura/conflicto antes de producción. Rollback de código conserva la tabla y planes; no retirar columnas ni borrar registros. Producción no fue migrada ni desplegada por este bloque.
