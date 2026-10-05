# AFW: Worker humano de revisión preparado cerrado

Base main52ae09c1204d2707b26b829976ce4a94d0b88afd. PR258/source861a6bf revisada por root; CI37335518484:869 pruebas, cero fallos, lint cero errores/dos warnings previos, build completo. Sus dos pruebas workerd/D1 también pasaron en Windows. Aunque el host de seguimiento cloud dejó de responder, la entrega se recuperó desde GitHub sin duplicar implementación.

## Preparación comprobada

`worker/operations-review/index.mjs` conecta el adapter real a un entrypoint propio. No modifica el receptor automático. Origen previsto: https://operations-review.agentfriendlyweb.dev; NO acredita DNS, ruta, Access o despliegue.

`wrangler.operations-review.jsonc`: Worker previsto agent-friendly-web-operations-review, cuenta85d0d5dadac3341a564f22ce885e9eec, exclusivamente D1 operaciones603c471d-19bb-4530-9773-c02e18b29840 mediante OPERATIONS_STATE_DB. Flags REVIEW_ENABLED y REVIEWS_ENABLED=false; sin deadline/rutas/crons/workers.dev/previews/observabilidad. Binding separada OPERATIONS_REVIEW_RATE_LIMITER10/60; namespace propuesto2026100502 no colisiona con configs del repo, pero debe verificarse en cuenta antes de provisionar.

Configuración de identidad exclusivamente servidor: ACCESS_TEAM_DOMAIN, REVIEW_AUDIENCE, CONSUMER_AUDIENCE y REVIEW_SUBJECT. Audiencias distintas, subject firmado fijado; email/body no conceden autoridad. Factoría permite clave pública/reloj solo desde código de pruebas; export por defecto usa JWKS Access y reloj servidor, sin dependencias tomadas de HTTP ni nuevas credenciales.

RED por módulo ausente → GREEN: tres pruebas de cierre sin IO, config sin exposición y wiring con JWT realmente firmado/SQLite real/actor opaco. Origen receptor, audiencia receptora/compartida, subject distinto y autorización inyectada no escriben; reserva/outcome conservados. La fixture inicialmente omitió el inbox requerido por foreign key: se corrigió la fixture, sin relajar producción.

Suite local872/872; lint cero errores/dos warnings previos; build completo. Wrangler4.128.0 deploy --dry-run reconoce bundle/D1/limitador/flagsfalse y termina sin publicar. La aceptación workerd anterior es de adapters; el nuevo entrypoint suma wiring local y bundle, sin afirmar nueva aceptación remota o binding10/60 real. Revisión/CI de este bloque se acreditan separadamente.

## Próximos pasos de promoción, en orden

1. Integrar fuente tras revisión/CI y preparar vista mínima autenticada: contexto vigente, una decisión por vez, razón explicada y recibo. Un POST sin vista no constituye recorrido humano terminado.
2. Inventariar configuración efectiva/identidades operativas. Verificar cuenta/DB; no sobrescribir bindings remotos con config incompleto. Declarar PROJECT/REPOSITORY/ENVIRONMENT/ORIGIN/RESOURCE_TYPE/RESOURCE_ID/ALLOWED_ACTION/ROLLBACK antes de mutar.
3. Aplicación Access humana propia, política de operador explícito/default deny y audiencia distinta de recepción. Obtener subject de sesión firmada verificada; custodiar configuración privada fuera de chat/Git/log/mail. No conceder escritura al token receptor.
4. Journal aditivo solo en D1 operaciones y con servicios cerrados. Preservar tablas/historial y verificar foreign_key_check. Rollback por cierre de flags/ruta/versión previa, nunca DROP/DELETE. Con historial instalado, mantener lectura/fences de reviews donde se consuman notices; REVIEW_ENABLED permite cerrar escritura de este entrypoint por separado.
5. Publicar cerrado y verificar versión/hash/binding/ausencia de exposición. Después preparar ruta protegida y ventana breve sintética. Aceptar operador real, CSRF, limitador10/60 y retirada de acceso efectiva en la siguiente consulta. Firma JWT local no demuestra revocación Access; sin demostrar retirada no abrir escritura estable.
6. Comprobar recibo/replay/competencia, cerrar ensayo y registrar constancia sin modificar ACK/outcomes/presupuesto anteriores. La cadencia del gerente y la identidad receptora tienen ciclo de vida independiente; no extender vencimiento temporal automáticamente ni repetir PC-off/scheduler/cron aceptados.

Sin intervención del owner para este código. Solo solicitar autenticación humana cuando pantalla/ensayo estén preparados. Sin cambios remotos, clientes, correo, producción web, A2A/OAuth, DNSSEC o puntuación externa.
