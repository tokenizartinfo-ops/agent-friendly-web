# Identidad y conservación del correo privado

Estado: fuente local, sin endpoint, aplicación Access, base remota o limpieza programada nuevos.

Validación: JWT RS256 firmados de prueba y SQLite sintético; suite 679/679, lint sin errores (advertencia previa de imagen en portada), build aprobado y diff check limpio. No prueba identidad de usuario real ni D1 remoto.

`resolveMailOperator` reutiliza verificación JWT RS256 de AFW: firma, issuer, audience y expiración. Exige origen HTTPS de un subdominio AFW exacto configurado en servidor y un único subject permitido explícitamente. Ignora el encabezado de correo como prueba de identidad. Devuelve solo actor opaco derivado de issuer/audience/subject; ningún correo ni JWT. El hostname de prueba `mail-ops.agentfriendlyweb.dev` no acredita existencia del recurso.

Exige explícitamente `exp` entero y futuro: el verificador genérico solo comprueba esa claim si está presente. Prueba con JWT firmado sin expiración reprodujo la aceptación indebida y pasa después de la corrección acotada al operador de correo; no modifica otros servicios AFW.

La configuración y la inyección de claves de pruebas son de servidor; nunca parámetros de un formulario. Todavía debe crearse y comprobarse una aplicación privada dedicada con su audience/sujeto reales. La verificación criptográfica de JWT no acredita revocación inmediata de una sesión Access; conservar el control edge y no afirmar introspección online. Este operador no concede acceso a expedientes de clientes ni automatiza respuestas.

`purgeFinalizedMailContent` implementa un valor operativo inicial: vaciar texto de respuestas `accepted` o `cancelled` cuyo último cambio tenga al menos 30 días. Conserva clave/hash como tombstone y nunca libera el intento para otro envío. Excluye `sending`, `uncertain`, borradores y aprobados: necesitan conciliación o decisión explícita antes de retirar evidencia. No borra expedientes, decisiones o recibos. Es mantenimiento manual interno, sin ruta ni cron; las pruebas usan exclusivamente datos sintéticos. No constituye un plazo legal ni promete borrar copias del proveedor o backups. Retención de recibos/decisiones y casos inciertos sigue pendiente de política antes del lanzamiento.

Siguiente: composición privada autenticada, aprobación/revocación con control Origin y CSRF, identidad de servicio para consumidor separada del operador humano, aplicación Access dedicada y prueba propia. Envío autónomo y limpieza remota permanecen cerrados. Rollback: retirar código/configuración antes de activación; una futura limpieza debe planificarse como irreversible y no confundirse con rollback de código.
