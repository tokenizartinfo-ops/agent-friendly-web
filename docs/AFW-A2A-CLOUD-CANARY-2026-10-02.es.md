# A2A en Cloudflare: prueba remota acotada — 2 octubre 2026

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT afw_canary; RESOURCE_TYPE Worker; RESOURCE_ID agent-friendly-web-a2a-canary; cuenta85d0d5dadac3341a564f22ce885e9eec. ORIGIN de prueba: sesión remota privada Wrangler, mediante puente127.0.0.1:8796; sin URL canónica pública. ALLOWED_ACTION: crear Worker dedicado cerrado, sesión temporal de diagnóstico público AFW, lecturas de estado y retiro. ROLLBACK: terminar sesión y mantener flagfalse, workers_devfalse, preview_urlsfalse y sin rutas. No toca Worker productivo, Access, D1/KV ni recursos Tokenizart.

## Resultado remoto

Wrangler4.128.0 comprobó identidad de cuenta y OAuth válido. No había Worker persistente con el nombre elegido antes de la prueba. Configuración nueva wrangler.a2a-canary.jsonc: binding A2A_RATE_LIMITER namespace26100201, 6 solicitudes/60s; flag A2A_ENABLEDfalse; nodejs_compat y global_fetch_strictly_public. Bundle dry-run44KiB/gzip13.34KiB. No otros bindings.

Remote preview explícito (no Miniflare local): código ejecutado en Cloudflare, cliente Node fetch independiente mediante puente loopback privado. Override de flagtrue solo en sesión temporal; no cambia configuración persistente. Segunda prueba aceptada en torno a20:16:39UTC (17:16 Argentina): diagnóstico AFW ROLE_AGENT, 15 sondas/13 HTTP200, evidencia fechada y publicationAuthorizedfalse. Destino127.0.0.1 rechazado con-32602; versión0.3 con-32009; GET405, tarjeta inexistente404. Ráfaga termina en429.

El puente Wrangler entregó cuerpo vacío para429 en la primera prueba; el cliente esperaba JSON y falló aunque el log remoto confirmaba429. Se corrigió el cliente para tolerar ausencia de cuerpo en rechazo HTTP; segunda prueba completa pasó. Esto no acredita JSON de error a través de un endpoint público estable. Rate limit es eventual por ubicación: se observaron más admisiones que seis; no prometer presupuesto global estricto.

Recibos locales ignorados output/a2a-canary/remote-receipts.json. Repetición: sesión privada `npx wrangler dev --config wrangler.a2a-canary.jsonc --remote --ip 127.0.0.1 --port8796 --var A2A_ENABLED:true`; cliente `node scripts/smoke-a2a-remote-preview.mjs`. Usar espacios correctos en flags: `--port 8796`. No es una prueba con SDK A2A oficial ni aceptación de despliegue canónico/Access.

## Validación y continuación

712/712 pruebas completas; lint global sin errores (advertencia img previa); build completo código0; ESLint específico Worker/pruebas/script aprobado. Recibos output/a2a-canary-{tests,lint,build}.txt. Módulo mantiene un agente por instancia para conservar el contador de concurrencia entre peticiones.

Pendiente de este recibo: despliegue persistente cerrado y verificación API de flag/subdominios. Después preparar endpoint canónico con protección canary y cliente independiente antes de promoción/Agent Card. Producción sin A2A y ninguna subida externa de puntaje atribuible al ensayo.
