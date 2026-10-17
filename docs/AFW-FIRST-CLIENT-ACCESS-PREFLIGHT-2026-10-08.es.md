# AFW — preflight del acceso previsto para Max

## Actualización: 17 octubre de 2026

Lectura API de la misma aplicación y sus dos políticas, 2026-10-17T16:01:54.170Z. La audiencia coincide con el binding de producción; `self_hosted_domains`/destinations conserva `agentfriendlyweb.dev/expediente*`, aunque el domain principal sigue siendo `release.agentfriendlyweb.dev`. Sesión configurada de ocho horas.

La regla `197c83d9-b87f-497c-9e25-38a880d03cd6` conserva allow del destinatario previsto exacto, sin everyone, sin requisitos adicionales y sin excluirlo. La otra política no lo incluye. No se modificó Access ni se solicitó OTP o ingreso. Es configuración compatible con la entrada prevista, no comprobación de entrega de correo, identidad del navegador ni sesión del cliente. Evidencia saneada local: `output/afw-pilot-access-preflight-20261017.json`.

## Lectura anterior: 8 octubre de 2026

Lectura API 2026-10-08T13:03:09.423Z (10:03 Buenos Aires). Proyecto AFW, cuenta Cloudflare85d0d5dadac3341a564f22ce885e9eec, recurso Access appb7d7d62e-de25-4b4b-ac52-972b104738a1/policy197c83d9-b87f-497c-9e25-38a880d03cd6, acción GET exclusivamente.

El domain principal es release.agentfriendlyweb.dev, pero destinations/self_hosted_domains incluye agentfriendlyweb.dev/expediente*. La identificación por domain principal solo habría dado un falso negativo; se verificó la ruta destino exacta antes de consultar la regla.

Regla allow, correo previsto del cliente incluido exactamente, sin everyone en include. HTTP200/success. No cambio de política, envío de código, sesión, cookies, identidad ni inscripción de proyecto. Esta lectura no acredita recepción OTP ni acceso efectivo del cliente. Mantener pendiente login propio y consentimiento.
