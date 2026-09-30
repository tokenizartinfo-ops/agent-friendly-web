# Aislamiento de escritura y retirada de la política QA

Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, producción `agentfriendlyweb.dev`. Evidencia del 2026-09-30, posterior al recibo de [entrega integral](AFW-INTEGRAL-ACCEPTANCE-2026-09-30.es.md). Solo expedientes sintéticos de identidades autorizadas por el owner.

## Escritura real comprobada

La sesión B recuperó su único expediente, guardó una audiencia sintética y recibió confirmación del servidor. D1 acreditó revisión 2, `updated_at` 2026-09-30T21:17:24.151Z. Al abrir el expediente A por ID, no recibió datos y los controles permanecieron deshabilitados.

Se conservó la pestaña B cargada. En otra pestaña se cerró la sesión y el owner inició A. La nueva pestaña mostró A; la anterior seguía mostrando el formulario B, sin recargar. Desde ese formulario se modificó la audiencia con una marca de intento cruzado y se pulsó Guardar cambios mediante controles normales.

La interfaz rechazó el guardado: «No pudimos recuperar este expediente. Conserva tu borrador y vuelve a iniciar sesion con la cuenta original antes de reintentar». No anunció éxito ni descartó el borrador. Consulta D1 posterior: revisión 2, audiencia original y fecha original intactas. Esto acredita una escritura cruzada intentada mediante la aplicación real y rechazada, no solo una lectura denegada. No se capturó el código HTTP y no se atribuye uno por inferencia.

Captura privada local ignorada por Git: `output/end-to-end-qa/cross-write-rejected.png`. No copiar identidad de sesión, borradores o transcripciones al corpus público ni a Tokenizart.

## Retirada limitada a AFW

Aplicación Access `b7d7d62e-de25-4b4b-ac52-972b104738a1`. Se verificó el alcance exacto de la política QA `05f77bee-4e40-47d8-b2b3-22d1eb5a1bcf` antes de retirarla mediante DELETE application-scoped. Respuesta 202/success. Consulta posterior mostró únicamente la política del owner `24dea92b-d7b3-47cf-a0d6-e1a00005e016`.

La sesión A se recargó después de la retirada y recuperó su expediente. No se borraron registros, modificaron propietarios, ampliaron permisos ni revocaron tokens de toda la organización compartida. La configuración previa de QA se conservó en memoria de herramientas para recuperación explícita; no restaurarla automáticamente, porque volvería a habilitar acceso.

## Pendiente preciso

Actualización posterior: se solicitó un nuevo OTP para B y el owner informó que no recibió correo, tampoco en spam. La documentación oficial de [Cloudflare OTP](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) aclara que usuarios bloqueados no reciben código y que la pantalla afirma envío independientemente del resultado. Por tanto, fue incorrecto pedir que esperara un correo o exigir una pantalla de rechazo tras un código que no se enviará. Consulta administrativa posterior volvió a confirmar que solo queda el Allow exacto del owner. Esto acredita retirada de la política y comportamiento de solicitud compatible con bloqueo; no acredita una respuesta posterior a autenticación ni revocación de un token B activo. No repetir solicitudes OTP a B para cerrar ese supuesto requisito.

El owner regresó mediante Chrome habitual: sesión A y expediente recuperado observados. El navegador integrado se congeló repetidamente en el login; Chrome permitió el ingreso humano. Utilizar la pestaña AFW de Chrome ya autorizada, sin abrir otra instancia ni intervenir en pestañas Tokenizart/Atelier.

Se pidió al owner un nuevo ingreso B para observar el rechazo de acceso después de retirar la política. La eliminación administrativa y la preservación del acceso A están comprobadas; el rechazo de nueva autenticación B todavía no. Tampoco se prueba revocación inmediata de una sesión B activa: durante la escritura cruzada la sesión del navegador ya era A.

MA-07: lectura/listado/guardado propio y escritura cruzada comprobados; política QA retirada; aceptación de renovación retirada pendiente. El copilot productivo conserva su expediente piloto único. No declarar apertura general ni incorporar identidades externas por inferencia.
