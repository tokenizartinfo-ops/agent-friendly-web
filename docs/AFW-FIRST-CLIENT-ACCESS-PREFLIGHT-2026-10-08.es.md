# AFW — preflight del acceso previsto para Max

Lectura API 2026-10-08T13:03:09.423Z (10:03 Buenos Aires). Proyecto AFW, cuenta Cloudflare85d0d5dadac3341a564f22ce885e9eec, recurso Access appb7d7d62e-de25-4b4b-ac52-972b104738a1/policy197c83d9-b87f-497c-9e25-38a880d03cd6, acción GET exclusivamente.

El domain principal es release.agentfriendlyweb.dev, pero destinations/self_hosted_domains incluye agentfriendlyweb.dev/expediente*. La identificación por domain principal solo habría dado un falso negativo; se verificó la ruta destino exacta antes de consultar la regla.

Regla allow, correo previsto del cliente incluido exactamente, sin everyone en include. HTTP200/success. No cambio de política, envío de código, sesión, cookies, identidad ni inscripción de proyecto. Esta lectura no acredita recepción OTP ni acceso efectivo del cliente. Mantener pendiente login propio y consentimiento.
