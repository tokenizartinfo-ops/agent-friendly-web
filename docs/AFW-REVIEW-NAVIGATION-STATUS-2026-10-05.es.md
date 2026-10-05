# Revisión privada: estados comprensibles — 5 de octubre de 2026

## Problema y alcance

El operador vio {"code":"unavailable"} después de ingresar correctamente. Access registró tokenizart.info@gmail.com autorizado a18:29:08UTC; los tres flags estaban false. No era evidencia de conflicto de cookies/cuenta. No borrar cookies ni diagnosticar identidad desde ese código.

La presentación de errores para GET navigate/document que acepta text/html usa ahora una pantalla mínima, comic, sin scripts, formularios ni recursos externos. Explica cierre404, pausa429, acceso401, origen403, enlace400 y servicio503. Conserva el código HTTP, no-store/CSP/no-referrer/noindex. POST, fetch API, éxitos y códigos desconocidos permanecen sin cambios. No modifica identidad, permisos, journaling, limitador ni admisión.

## Evidencia y siguiente paso

RED: prueba nueva falla por módulo inexistente; GREEN: siete pruebas específicas pasan. Validación local:898/898 pruebas, lint0 errores/2 advertencias previas, build completo; git diff --check correcto.

Ensayo posterior a PR265: ventana fbf194a6-b484-478f-8c6f-b8cf92521d2c abrió correctamente la misma sesión aprobada, sin escrituras. Repetición11 terminó ERR_BLOCKED_BY_CLIENT; no HTTP429 confirmado. Restauración034bc596-045f-43de-ac4d-e8aaaef881c7, tres flags false/no deadline, política propia deny/everyone sin excepción. No nuevas constancias; dos revisiones anteriores preservadas.

Pendiente remoto:429, CSRF y retiro de permiso con JWT vigente. El bloqueo del inspector no acredita resultados del Worker. Las instrucciones de continuación deben evitar volver a pedir OTP para repetir pruebas ya aceptadas. Verificar soporte de observación HTTP antes de abrir otra ventana.

Cloudflare documenta que la pantalla «código enviado» no prueba envío y que el código expira diez minutos después de la solicitud: https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/. Nueva solicitud canónica generó nueva referencia de intento; el propietario finalmente ingresó. No hay evidencia de causa raíz de retraso de entrega ni duración de bloqueo del proveedor.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=private synthetic QA; ORIGIN=operations-review.agentfriendlyweb.dev; RESOURCE_TYPE=Worker; RESOURCE_ID=agent-friendly-web-operations-review; ALLOWED_ACTION=publicar nueva presentación con todos los flags false en QA ya protegido. Rollback: redeploy fuente880586859 con configuración .wrangler/review-qa-protected-closed.jsonc y conservar D1/pin/política/historia. No cambios en web pública o producción operativa; no ampliar permisos.


## Corrección de arranque del entrypoint

Wrangler local/workerd rechazó el export constante OPERATIONS_REVIEW_ORIGIN del módulo de entrada: Incorrect type for map entry. Las pruebas anteriores empaquetaban una factory mediante wrapper y no arrancaban el bundle de despliegue sin modificar. Se reprodujo RED con esbuild(entryPoints index)+Miniflare, sin inyectar identidad ni wrapper. Ahora index exporta solamente default; factory/constantes y lógica quedan en handler.mjs interno. Las pruebas de factory importan ese módulo; una nueva regresión ejecuta exactamente el entrypoint de despliegue y verifica404 JSON cerrado. GREEN observado.

Wrangler dev --local inició en127.0.0.1:8797. Chrome abrió el Worker real y mostró «Este ensayo está cerrado» y «No hace falta volver a ingresar ni cambiar de cuenta por este mensaje». Esto prueba presentación/arranque locales, no recepción Cloudflare ni aceptaciones remotas pendientes. No afirmar incidencia del mismo error en producción: el runtime remoto funcionó en el ensayo anterior; la incompatibilidad se observó en workerd local.
