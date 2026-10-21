# Composición cerrada de la entrada privada AFW
Fecha2026-10-21. Fuente únicamente; repo tokenizartinfo-ops/agent-friendly-web.
Dependencias: PR544 sesión GET-only + PR543 inspect readonly. No source row, dominio, consentimiento o app creados.
Resultado: el Worker de preparación puede seleccionar /source y /source/identity con flag independiente, sin pins OAuth/project/client/DB, conservando el ingreso y el lease original5s.
La ruta antigua conserva su decode/semántica y no se abre por el flag nuevo.
GET-only: no se monta create/inspect ni se crean filas al abrir la página.
El Worker importa host sesión; opciones server sourceAccessVerifier separadas del antiguo accessVerifier de forma legacy {userId,email}.
Nuevos pins independientes: AFW_PREPARATION_SOURCE_INTAKE_ENABLED,AFW_PREPARATION_SOURCE_SESSION_OPERATION_KEY,AFW_PREPARATION_SOURCE_SESSION_SUBJECT,AFW_PREPARATION_SOURCE_SESSION_STARTED_AT,AFW_PREPARATION_SOURCE_SESSION_EXPIRES_AT. Subject vacío/null de config significa bootstrap propio; no cuerpo/query o email.
Un perfil servidor máximo10min. Instant ISO canónica. Issuer exacto https://preparation-canary.agentfriendlyweb.dev.
Default-off de las rutas fuente no lee otros pins/bindings/relojes/body/identidad. /mcp y otras rutas siguen comprobando solo su flag anterior.
Lease se crea una vez ANTES de leer/decodificar pins; el host fuente recibe el mismo WeakMap lease y no lo cierra si no es suyo. No nuevos5s.
Pins se revalidan por wrappers now/monotonic después de awaits; cambio de pin deniega. Rate/Access no consultanDB.
Pruebas de Worker real+JWT nativo demuestran source funciona con routerfalse, pinsOAuth inválidos/ausentes y env DB/KV prohibido, defaultoffquiet, expiración/drift/originallease, fuente flag no activa otras rutas.
Rollback: revertir fuente; sin configuración ni política remota por este PR. La actual Access app24c5c643… aún no cubre /source y deniegaeveryone. No usar ruta real ni abrir ventana hasta protección real/rollback/identidad comprobados.
operationalReadiness=false; nada acredita alta fuente, dominio, asistente conectado o PC-off.
