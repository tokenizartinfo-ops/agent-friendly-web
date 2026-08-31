# Block 5B - recibo del gate local

Fecha: 2026-08-30  
Estado: `release_candidate`  
Alcance remoto: no ejecutado

## Resultado

El Bloque 5B quedo implementado y verificado localmente. Extiende la capsula manual del Bloque 5A con dos capacidades privadas:

1. comparacion read-only contra recursos publicos allowlisted del origen;
2. preparacion y descarga de un plan tecnico de Draft PR que permanece `No enviado`.

No se creo un PR remoto, no se hizo merge, no se desplego codigo, no se modifico el sitio del owner y no se aplico la migracion a D1 remota.

## Frontera implementada

- destinos comparables: `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/sitemap.xml` y `/`;
- solo HTTPS publico y puertos estandar;
- redirects manuales, timeout de ocho segundos y maximo de 250.000 bytes;
- diff de hasta 400 lineas y 1.000 caracteres por linea;
- estados `missing`, `unchanged`, `changed`, `manual_review_required`, `unavailable` y `blocked`;
- probable contenido sensible bloqueado sin reflejarlo;
- identidad y rol derivados en servidor;
- comparacion ligada al SHA-256 del manifiesto;
- eventos D1 solo con metadata tecnica;
- archivos de fusion manual bajo `.agentfriendly/proposals/`;
- rutas de repositorio sin absolutos, `..`, workflows ni lockfiles;
- `remoteSubmission=false` y `mergeAllowed=false` en contrato, schema, provider y UI;
- proveedor GitHub sin cliente HTTP real y deshabilitado por defecto.

## Persistencia local

La migracion `drizzle/0003_origin_comparisons_and_draft_pr_plans.sql` agrega solamente:

- `capsule_origin_comparisons`;
- `draft_pr_plans`.

Las cuatro migraciones `0000` a `0003` se aplicaron en orden sobre SQLite aislado en memoria. Las tablas nuevas quedaron vacias y no se detecto SQL destructivo. La repeticion de una comparacion o plan ya preparado recupera el registro ligado a la misma capsula y manifiesto en vez de crear un duplicado.

## Contratos

- `public/schemas/origin-comparison.v1.json`;
- `public/schemas/draft-pr-plan.v1.json`;
- `agentfriendly.origin-comparison-request.v1`;
- `agentfriendly.draft-pr-plan-request.v1`;
- `agentfriendly.origin-comparison.v1`;
- `agentfriendly.draft-pr-plan.v1`.

## Verificacion ejecutada

- pruebas focales Block 5B: 18/18;
- pruebas focales de UI, rutas y descubrimiento: 10/10;
- regresion completa `npm test`: 214/214;
- `npm run lint`: PASS;
- `npm run build`: PASS;
- migracion SQLite aislada: PASS;
- negativas de rutas, secretos, manifest obsoleto, destinos inseguros, envio remoto y merge: PASS;
- QA Chromium con payload sintetico privado: escritorio 1440 x 1000 y movil 390 x 844, sin errores de consola;
- screenshots locales ignoradas por Git en `output/playwright/block5b-desktop.png` y `output/playwright/block5b-mobile.png`.

La advertencia de build sobre el futuro `configLoader: native` de Vite no bloquea el release candidate. El runtime local de Miniflare no inicio de forma estable en esta maquina, por lo que la QA visual uso el build de produccion y respuestas privadas sinteticas interceptadas. La integracion D1 real queda, correctamente, para el gate remoto.

## Evidencia externa

El registro `docs/EXTERNAL-AUDIT-AND-EVIDENCE-REGISTRY-2026-08-30.md` separa:

- pruebas tecnicas reproducibles de protocolo;
- telemetria del dominio controlada por el owner;
- observaciones fechadas de motores de respuesta;
- graders comerciales y direccionales.

Cloudflare Agent Readiness sigue siendo la observacion externa principal del caso actual. Vercel Agent Readability se tratara como una rubrica tecnica reproducible, no como auditor independiente mientras no exista un scanner oficial verificable. Schema.org, Google y Bing aportan validacion e indexacion. Cloudflare AI Crawl Control aporta evidencia de acceso real por crawler. HubSpot sirve como senal comercial secundaria, nunca como unica prueba tecnica.

## Commits del bloque

- `c581c23`: comparacion de origen;
- `3e212cb`: plan y providers Draft PR;
- `42ef6a3`: migracion local y schemas;
- `5b8d20a`: APIs privadas;
- `8775cfd`: interfaz progresiva y replay seguro del plan.

## Rollback

Todavia no existe estado remoto que revertir. El rollback local consiste en retirar los commits del bloque antes de fusionar. En el gate remoto, el rollback debera contemplar la version previa de Sites, verificacion de tablas nuevas vacias y cierre de cualquier borrador no fusionado. Nunca debe borrar tablas con datos sin una decision especifica.

## Proximo gate separado

Requiere nueva aprobacion expresa para:

1. verificar backup y estado de D1 remota;
2. aplicar exclusivamente la migracion aditiva `0003`;
3. confirmar que las tablas nuevas nacen vacias;
4. publicar el commit exacto en Sites conservando `remoteSubmission=false`;
5. ejecutar smokes privados y publicos;
6. repetir las auditorias externas declaradas despues del despliegue.

Ese gate no autoriza GitHub App, creacion remota de PR, merge, CMS, A2A, credenciales ni escritura sobre el dominio del cliente.
