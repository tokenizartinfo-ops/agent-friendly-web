# Host privado del cierre aprobado

Objetivo autorizado: conectar el cierre aprobado existente a eventos del Durable Object, reconstruyendo la autoridad en cada arm/status/alarm, sin aceptar planes desde llamadas consumidoras ni activar el ensayo por variables.

El host recibe dependencias del servidor: contexto DO, D1 aislada, lector privado de aprobación, catálogo privado y dos lectores de secretos distintos. Relee la aprobación completa antes de crear el actor aprobado; ese actor vuelve a verificar catálogo V2 y aprobación primaria D1 antes de acciones. La persistencia y el rechazo de cambios de plan corresponden al lifecycle existente. No mantener actor/autorización en caché entre eventos. Lectura privada con timeout finito; errores devuelven unavailable sin exponer causas o secretos. La cola local serializa los eventos del host; no promete atomicidad distribuida.

Worker IndependentClosure usa AFW_QA_DB y un futuro binding privado AFW_QA_CATALOG a un objeto fijo own-qa. El catálogo debe ofrecer readOccurrenceApproval() y read(); no hay approve, configure ni publicación HTTP en este Worker. Ausencia de catálogo/custodia falla cerrado. El binding no se instala hasta disponer del catálogo real con constancias de provisioning/custody/inventory. Los lectores de prueba no acreditan esos recursos remotos.

## Plan de ejecución directa

- [x] Test SQLite real de reconstrucción: arm, pérdida de respuesta PUT, host nuevo recupera solo con GET y deja plan revocado/journal cerrado.
- [x] RED por módulo ausente; segundo RED reprodujo alarma consumida sin recuperación.
- [x] lib/assistance-approved-qa-closure-host.mjs con métodos sin argumentos y lectura privada acotada.
- [x] Retirada de autoridad, falta de lector y timeout sin acciones; errores saneados. Recuperación limitada y host nunca armado comprobados.
- [x] Worker conectado a dependencias privadas manteniendo fetch404 y ausencia de catálogo cerrada.
- [x] Pruebas dirigidas/nativas y revisión independiente sin P1/P2; lint global 0errores/2warnings previos, build aceptado.

No cambia catálogo, aprobación, permisos, TTL, schema ni cliente cloud. No afirmar cierre espontáneo remoto o PC-off por estos tests. Remoto sigue preparación cerrada ff3682b8/D1 propia; reversión f838 y config original preservan datos/DO/secreto.

Revisión independiente encontró que unavailable antes de reconstruir el lifecycle consumía una alarma real. Corrección: el módulo lifecycle puede diferir solo un plan ya armado, sin acciones ni aprobación nueva. Guarda presupuesto separado de tres entregas sin autoridad; al agotarlo deja intervention_required y elimina la alarma. El presupuesto sobrevive reconstrucción, no se reinicia con un host nuevo. Plan inexistente, terminal o corrupto no obtiene alarma nueva. Esto no promete cierre administrativo cuando la autoridad retirada permanece inaccesible.

Las fixtures de creación/admisión usan reloj SQLite para observedAt y now, igual que el adapter HTTP. Mezclar Date.now con SQLite en Windows produjo un desfase observado de13ms y rechazo correcto por los triggers, sin defecto del actor. No se modifica ningún guardrail temporal productivo. Suite global posterior al ajuste:1314pass/1fallo de hook de limpieza EBUSY en otro archivo/2skips Windows; assertions de ese caso pasaron y su archivo se reejecutó. CI completa de la rama debe pasar antes de merge. No presentar esa ejecución local como suite entera verde.
