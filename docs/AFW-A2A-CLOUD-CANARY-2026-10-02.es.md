# A2A en Cloudflare: prueba remota acotada — 2 octubre 2026

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT afw_canary; RESOURCE_TYPE Worker; RESOURCE_ID agent-friendly-web-a2a-canary; cuenta85d0d5dadac3341a564f22ce885e9eec. ORIGIN de prueba: sesión remota privada Wrangler, mediante puente127.0.0.1:8796; sin URL canónica pública. ALLOWED_ACTION: crear Worker dedicado cerrado, sesión temporal de diagnóstico público AFW, lecturas de estado y retiro. ROLLBACK: terminar sesión y mantener flagfalse, workers_devfalse, preview_urlsfalse y sin rutas. No toca Worker productivo, Access, D1/KV ni recursos Tokenizart.

## Resultado remoto

Wrangler4.128.0 comprobó identidad de cuenta y OAuth válido. No había Worker persistente con el nombre elegido antes de la prueba. Configuración nueva wrangler.a2a-canary.jsonc: binding A2A_RATE_LIMITER namespace26100201, 6 solicitudes/60s; flag A2A_ENABLEDfalse; nodejs_compat y global_fetch_strictly_public. Bundle dry-run44KiB/gzip13.34KiB. No otros bindings.

Remote preview explícito (no Miniflare local): código ejecutado en Cloudflare, cliente Node fetch independiente mediante puente loopback privado. Override de flagtrue solo en sesión temporal; no cambia configuración persistente. Segunda prueba aceptada en torno a20:16:39UTC (17:16 Argentina): diagnóstico AFW ROLE_AGENT, 15 sondas/13 HTTP200, evidencia fechada y publicationAuthorizedfalse. Destino127.0.0.1 rechazado con-32602; versión0.3 con-32009; GET405, tarjeta inexistente404. Ráfaga termina en429.

El puente Wrangler entregó cuerpo vacío para429 en la primera prueba; el cliente esperaba JSON y falló aunque el log remoto confirmaba429. Se corrigió el cliente para tolerar ausencia de cuerpo en rechazo HTTP; segunda prueba completa pasó. Esto no acredita JSON de error a través de un endpoint público estable. Rate limit es eventual por ubicación: se observaron más admisiones que seis; no prometer presupuesto global estricto.

Recibos locales ignorados output/a2a-canary/remote-receipts.json. Repetición: sesión privada `npx wrangler dev --config wrangler.a2a-canary.jsonc --remote --ip 127.0.0.1 --port 8796 --var A2A_ENABLED:true`; cliente `node scripts/smoke-a2a-remote-preview.mjs`. No es una prueba con SDK A2A oficial ni aceptación de despliegue canónico/Access.

## Validación y continuación

712/712 pruebas completas; lint global sin errores (advertencia img previa); build completo código0; ESLint específico Worker/pruebas/script aprobado. Recibos output/a2a-canary-{tests,lint,build}.txt. Módulo mantiene un agente por instancia para conservar el contador de concurrencia entre peticiones.

Despliegue persistente cerrado completado: source378f97b; Worker version6ea0f124-3f5d-4c59-ad56-d7ed226a7c75. CLI confirma «No targets deployed». API settings confirma flagfalse y binding dedicado6/60; API subdomain confirma enabledfalse y previews_enabledfalse. Puente loopback dejó de responder después de terminar el proceso. Sin rutas, hostname público ni recursos de datos. Después preparar endpoint canónico con protección canary y cliente independiente antes de promoción/Agent Card. Producción sin A2A y ninguna subida externa de puntaje atribuible al ensayo.

## Endpoint canónico HTTPS y correcciones previas a promoción

Prueba HTTPS aceptada a20:38:03UTC (17:38 Argentina) en https://a2a-canary.agentfriendlyweb.dev/a2a: cliente Node HTTPS independiente directo,15sondas/13HTTP200, private-target-32602, versión0.3-32009 y ráfaga429. Access appab7650f9-b08a-4b01-a844-2738b992ce2a fue creada deny-all antes de asociar el dominio. Excepción temporal limitada a la dirección exacta del cliente directo; eliminada fd2dc725-957d-414b-8a47-25e19dea1eaf. API confirmó únicamente deny ba5b0c90-8417-4bdd-bc87-d95fedb09044 y flagfalse. Versión de cierre50694a5d-41a3-4313-be8b-4c6c2a543be0. Recibo output/a2a-canary/canonical-receipts.json. Esto prueba HTTPS/ejecución remota, no identidad de un cliente privado ni SDK oficial.

Problemas encontrados en la prueba: cliente fetch con direcciones de salida variables; propagación de versiones observada tras deploy; conector Cloudflare prohíbe fetch directo al dominio canary (403 de su política de red, no rechazo del runtime AFW). Un token de servicio efímero y su política fueron eliminados sin guardar/exponer credenciales; IDs92e0495b-9cb0-47ca-a51d-3be47a4568d2/f4a9a532-b098-40be-87ad-5ac105d29c4e, DELETEs confirmados. Se usó cliente HTTPS nativo de Node por el canal local autorizado, con conexión persistente y dirección verificada. Las primeras pruebas no se marcaron como aceptadas.

Revisión independiente detectó y se corrigieron dos fallos: DNS A/AAAA ahora espera ambos resultados aunque uno falle; JSON inválido retorna envelope JSON-RPC-32700/idnull. Capacidad usa código implementativo-32000 en lugar del código de operación no soportada. Regresiones vistas fallar y pasar. Segunda revisión no encontró bloqueador de promoción. Agent Card preparado detrás de flags independientes, binding real y servicio enabled; declara una sola habilidad estructurada de diagnóstico público y capacidades de streaming/push/privatefalse. HEAD/304 y cierre que prevalece sobre ETag comprobados. No promoción de OAuth ni Auth.md.
