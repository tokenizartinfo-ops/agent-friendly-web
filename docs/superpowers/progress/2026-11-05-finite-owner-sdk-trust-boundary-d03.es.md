# D0.3 — compatibilidad token/MCP real, ACTIVO

5nov2026, checkpoint root14:06UTC. Único writer implement_sdk_token_d03(Sol high), BASE2f80f8db9d6cffd9ae32e6733069e886d1d1110d, rama feat/finite-native-cleanup-20261101. Brief y preflight D0.3 en BASE. No segundo writer producto. Diseño I/O en rama documental/pin previo no toca esta rama.

Root verificó RED causal 7a2fb82a70904f32c73ca983da78bac7d8501c51, Actions42041380574/job127292772280/attempt1: baseline válido PASS; cuatro negativos SDK-format SYN con userId/projectId ausentes o erróneos entregaron token200, luego MCP401/403; esperaban rechazo400 en intercambio. Corrección preautorizada 732ecd3b62956c7871e463b3303ff844a746c3f0 añade SOLO dos igualdades de props contra grant antes del consumeExchange. GREEN y matriz amplia todavía pendientes de verificación; no afirmar corrección final. Los ajustes previos Host canonical/D1 alias/Access pins son de fixture, producto mantiene validación original.



Alcance: test real QA-issued code / SDK / OAuth M / MCP / DB=QA RELEASE_DB / KV compartida SYN; baseline válido antes de negativos, permiso original sin fabricar positivo. Cuatro props redundantes se alteran solo en SDK-format SYN, claramente distintas de emisión real QA. Negativos PKCE/client/resource/puntero/SDKsubject/owner/project/scopes/exchange consumido/revocación/expiry/complete tardío deben quedar en reporte; no aceptar late-code cut por cerrar solo fence de emisión.

Reportar todos los heads/runs/jobs/attempts/counts, causalidad RED/GREEN, warnings, invocaciones reales del compilador y blobs protegidos. Un compilador estándar exact-head tras cambios M, caps2MiB/3MiB originales, exclusiones originales; no exigir SDK finito sin montar en grafo estándar. Retirar qualifier propio, reporte, diff BASE completo y revisión fresca antes de aceptación. Tests antiguos no se repiten por metadatos.

No permisos reales, nuevo UUID de aplicación, namespace, clocks falseados, refresh/fallback/mount, migraciones ni runtime. Techo source expirado; sustitución de fixtures SYN explícita y reloj SQL real. operationalReadiness=false;completePackage=false;PCoff=false. Usuario disponible si llega a ser indispensable, sin acción requerida ahora.
