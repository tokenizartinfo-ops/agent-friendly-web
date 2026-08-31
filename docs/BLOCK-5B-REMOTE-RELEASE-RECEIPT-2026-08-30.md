# Block 5B - Remote Release Receipt

**Fecha:** 2026-08-30

**Estado:** desplegado y verificado

**Sitio:** `https://agentfriendlyweb.dev`

**Modo:** comparacion publica read-only y plan tecnico `prepared_not_submitted`

## Preflight

- Sites 27, commit `6cc980560e5505ede7278ac21018506ba92e9b93`, queda identificado como version de aplicacion para rollback.
- La inspeccion D1 previa mostro las nueve tablas de los bloques anteriores y confirmo que `capsule_origin_comparisons` y `draft_pr_plans` aun no existian.
- La migracion `0003_origin_comparisons_and_draft_pr_plans.sql` es aditiva: solo crea esas dos tablas y sus indices.
- No se modifican accesos, variables, secretos, bindings, conectores ni datos owner.

## Frontera del release

- `remoteSubmission=false`;
- `mergeAllowed=false`;
- ningun cliente HTTP de GitHub activo;
- ningun Draft PR remoto;
- ningun merge o deployment externo;
- ninguna escritura sobre el sitio del owner;
- CMS, A2A, credenciales y pagos permanecen fuera de alcance.

## Release

- Sites 28 publico el commit `456b18bfb984bacfa00ef3d10c4fccbcbabbe407`.
- Sites 27 permanece disponible como version de rollback de la aplicacion.
- La migracion `0003_origin_comparisons_and_draft_pr_plans.sql` se aplico durante el deployment.

## Verificacion posterior

- `capsule_origin_comparisons`: presente y con cero filas;
- `draft_pr_plans`: presente y con cero filas;
- ambos schemas publicos: HTTP `200 application/json`;
- inicio con `Accept: text/markdown`: HTTP `200 text/markdown` y `Vary: Accept`;
- API privada de comparacion sin identidad: HTTP `401`;
- expediente privado sin identidad: HTTP `307` hacia el ingreso protegido;
- readiness publico: Block 5B `deployed`, `remote_submission=false`, `merge_allowed=false`;
- auditoria Cloudflare posterior: Level 4 `Agent-Integrated`, sin puntuacion numerica declarada.

La auditoria externa mantuvo como siguientes requisitos DNS-AID, `auth.md`/OAuth y A2A Agent Card. Se registran como gates futuros; no se publican artefactos ficticios para aumentar una nota.

## Rollback

Ante una regresion de aplicacion, volver a Sites 27. La migracion aditiva no altera tablas previas; mientras las tablas nuevas permanezcan vacias pueden conservarse sin afectar la version anterior. Eliminarlas seria una operacion D1 separada y no esta autorizada por este release.
