# Revisión humana canary preparada

Fuente `bac14af124d30d6ee0a783d6c2a1754ddf2fdaf3`, PR #165 integrada, CI aprobado (689 pruebas, lint y build). Pantalla publicada primero con flags false, versión `4c489c0b-ae75-49be-9b13-5df44696465f`.

Caso exclusivamente sintético `synthetic-review-20261002`, destinatario bajo example.invalid, hash `40551506ce7b32d9fe2aa669ed83c963765d79e4f66237b1b93b88a76a3ca160`. Custodia y outbox insertados en D1 mail-canary `e1d480e2-e369-4f0b-ae7d-5cab3b7eee16`; lectura primaria confirmó draft. No expediente o datos de cliente.

Preparación de aceptación propia: política de aplicación operador `a5c2c609-5314-47d9-a2cf-9cd97e2131e4` limitada a una identidad del owner, sesión cinco minutos; subject guardado como binding privado fuera de Git. Override CLI habilita únicamente operador humano. Versión `6a1e244f-8386-45ea-8fd2-4ea2b67adbd4`; API comprobó MAIL_OPERATOR_ENABLED true y MAIL_SERVICE_ENABLED false. Consumer Access permanece deny everyone; no EMAIL, Client ID, limitador o scheduler.

La configuración versionada conserva ambos flags false: un despliegue normal vuelve a cerrar el operador. No guardar el subject en documentos públicos ni copiar credenciales locales a cloud. Rollback explícito: desplegar configuración sin override, volver política de operador a deny everyone y conservar D1/decisiones. Restaurar solo versión antigua sin comprobar variables y política no acredita cierre.

Aceptación real pendiente: owner abre `/message/synthetic-review-20261002`, aprueba y retira permiso; verificar cancelled y decisión revoked en D1, sin recibos ni intentos enviados. Solicitud presentada; no afirmar resultado hasta observarlo. Producción API conserva versión `00861678-d968-41d3-be85-180896a321b7` al 100%.

Gerente cloud: siguen separados lectura Gmail ya comprobada, cadencia con PC apagada pendiente, entorno de código con fallo de raíz y conexión de envío no disponible en cloud. Esta pantalla no resuelve ni acredita esos tramos. Próximo bloque autónomo: preparar contrato del disparador y custodia de identidad de servicio sin crear ni divulgar secretos; aceptación humana y envío propio antes del primer cliente.
