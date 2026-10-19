# AFW: servicio interno de preparación de cápsulas
19 de octubre de 2026. Base:3a1d197eff9d3b48caebd73517f1cfed281c363b. Diseño padre:docs/AFW-AGENT-CAPSULE-PREPARATION-DESIGN-2026-10-19.es.md.
## Diseño y alcance
Servicio de dominio SIN HTTP/MCP/OAuth mount. Por defecto cerrado; habilitación exacta true solo por un host futuro. Reutiliza buildPublicationCapsule y maintainerApprovalRequired. No modifica ruta humana, catálogo OAuth, permisos ni datos remotos.
Factory createAgentCapsulePreparation({enabled,createPrimarySession,resolveAuthority,now,monotonic}); métodos prepare(input) y reconcile(input). Entrada JSON estricta contract/expectedRevision/idempotencyKey. Contexto de identidad SOLO del resolver de servidor y revalidado con el grant/current owner en D1 primaria, scope futuro afw:capsule:prepare explícito, intercambio consumido y vencimiento actual.
Reserva persistente propia antes de generar. ACK incierto de reserva => no generar ni continuar. Misma identidad/clave recupera estado original; cambio de contrato/revisión/generador => conflicto. Estado reservado incierto jamás se reinicia automáticamente; reconcile solo lee. Nueva tabla de fuente en db/agent-capsule-preparations.sql, FUERA de migraciones instalables.
Un batch atómico confirma cápsula/estado/evento solo desde la reserva original y con owner/revisión/dominio/claim/grant aún vigentes. La reserva liga versión y origen; reserva + índice único evitan doble asignación entre agentes. Carrera con ruta humana no migrada falla cerrada, conserva intento y exige conciliación; no renumera automáticamente.
Deadline original <=5000ms, reloj monotónico y guardia SQL de tiempo actual. Después de cada await se comprueba presupuesto; tras commit se relee desde primaria antes de responder. La retirada no borra un commit previo, pero impide su confirmación/lectura posterior.
Resultado mínimo: ref/versión/hash/revisión, estado, sin archivos/respuestas privadas/credenciales. Aprobar, instalar, publicar, gastar y ejecutar modelos son gates distintos.
## Alternativas y decisiones
- Ruling: usar rama GitHub + Actions, sin checkout/worktree local — preferencia expresa cloud; RED/GREEN deben acreditarse remotamente.
- Ruling: reservar primero en tabla propia, no confiar solo en INSERT de cápsula — permite distinguir ACK perdido y nunca regenerar un intento desconocido.
- Ruling: mantener pendiente una reserva no conciliada, sin lease renovable o borrado — sacrifica disponibilidad ante fallos para evitar duplicación; recuperación administrativa es trabajo futuro.
- Ruling: no compartir aún el nuevo servicio con ruta humana — ese refactor requiere aceptación propia; su carrera se detecta y no se convierte en éxito.
- Ruling: el scope es requisito futuro de fuente, no se añade a scopes admitidos por OAuth ni se fabrica consentimiento. Fixtures sintéticos son los únicos permisos nuevos.
- Ruling: SQL batch es transacción según documentación primaria Cloudflare; probar en SQLite y D1 nativo de Miniflare en Actions. No instancia remota ni Container.
## Plan y ledger
Task 1: pendiente — tests de comportamiento primero; RED por servicio ausente, sin error de import/setup.
Task 2: pendiente — SQL aditivo no instalado y servicio cerrado; GREEN suite/lint/build.
Task 3: pendiente — una revisión fresca de rama completa, corregir Important/Critical una sola ronda con regresión; CI exacta y main; recibos en PR/issue497.
Pre-flight: tests/DDL/servicio comparten nombres de tabla y forma D1 prepare/batch. D1 nativo decide compatibilidad; no usar transacción JS/SQLite como única prueba de plataforma.
## Aceptación
Default cerrado sin tocar dependencias; request malformado antes de autoridad; scope lectura/identidad ajena/revisión vencida/claim retirado no escriben; replay/conflicto; concurrencia misma y distinta clave; versiones secuenciales; ACK perdido antes/después de commit; rollback completo ante error de evento; retirada durante awaits; deadline original/SQL; historia no borrable; D1 nativo con withSession(first-primary).
Comandos existentes en Actions: npm test; npm run lint; npm run build. No nuevas dependencias/workflows, despliegue, migración remota, OTP, credenciales, cobro o Max.
## Fuentes
- https://developers.cloudflare.com/d1/worker-api/d1-database/ (batch transaccional y Sessions; consultado19oct2026).
- Fuente humana app/api/projects/[projectId]/deployment-capsules/route.ts en la base indicada.
## Reversión
Cerrar rama o revertir commit de fuente. DDL no instalado: no DROP, borrado de historial, reset, nueva instancia ni rollback de datos. Runtime/custodia aceptados G2 quedan intactos. operationalReadiness=false.

## Primera constancia de ejecución
RED508cdc9cd252d2f5b21115dec6e67e766a039a0b / Actions39318023222 / job118284472616:2159PASS,18FAIL esperados por servicio ausente,1SKIP. Ningún error de import/setup ni fallo de la base anterior. GREEN pendiente.
Task 1: complete — 17 casos SQLite/contrato +1 D1 nativo observados en RED. Se amplió verificación antes de GREEN con cola SQL más allá de5000ms, carrera de ruta humana, cambio sin revisión y datos malformados/futuros; sin nueva capacidad o relajación.
Task 2: in_progress — servicio interno y DDL fuera de migraciones; futura activación aún no autorizada por fuente.
Ruling: read-only reconcile y replay exigen grant/scope/current owner/dominio vigentes — retirar permiso bloquea incluso la referencia; no borra hechos previamente aceptados.
Ruling: una carrera humana conserva reserva pendiente, no reenumera ni publica — la ruta humana se preserva y el posible bloqueo requiere conciliación explícita futura.
Ruling: el resolver del host debe validar el token OAuth y su vida útil antes de invocar el dominio; no se pretende verificar bearer/cookies en esta biblioteca sin transporte. El servicio revalida el grant en SQL.

## Revisión y diagnóstico
Revisión fresca completa en2909ad6:0Critical/1Important/0Minor. Ruling: aceptar P2 de carrera entre lectura de autoridad y lectura de intent; regresión separada antes de fix, luego una sola consulta primaria y vencimiento postawait. No nueva revisión en bucle.
Primera candidata Actions39318956108:2180PASS/1FAIL/1SKIP; D1 nativo y21 casos nuevos en su mayoría aceptados. Fallo concreto en cambio sin incremento de revisión: returned revision_conflict en lugar de preparation_pending; se antepone la comprobación de estado persistido para diagnosticar sin relajar seguridad. No declarar GREEN ni modificar el comportamiento por inferencia.

## Una ronda de corrección
Regresiones P2 en9881d89 / Actions39319584747 / job118289857865:2180PASS/4FAIL/1SKIP; tres fallos reales prepared vs delegated_access_denied (retirada, transferencia, vencimiento durante await) y la aserción previa ya diagnosticada. La comprobación añadida confirmó reserva1/cápsula0/evento0: no hubo escritura incorrecta en ese caso.
Ruling: el fallo previo es expectativa errónea, no defecto de CAS — drizzle/0006 contiene trigger site_projects_legacy_revision_fence; exigir revision2 y revision_conflict conservando los conteos de no escritura.
P2fix: unir autoridad actual/fuentes/intento/resultado en UNA lectura primaria; comprobar grant y dominio con reloj actual después del await. Punto de linealización de esa lectura, no garantía de estado eterno; la siguiente consulta revalida. Sin revisor adicional ni aperturas remotas.
Task 2: pending final verification — corrección y25 pruebas nuevas (24SQLite/1D1); Actions exacta debe pasar antes de merge.
Task 3: review complete, Important corregido pendiente de GREEN; runtime, scope/consentimiento real, migración remota, hosting/rate limit/recuperación administrativa/PCoff excluidos por alcance, no acreditados.
