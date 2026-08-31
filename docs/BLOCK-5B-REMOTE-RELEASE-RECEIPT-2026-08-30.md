# Block 5B - Remote Release Receipt

**Fecha:** 2026-08-30

**Estado:** preparado para Sites 28; verificacion posterior obligatoria

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

## Verificacion posterior requerida

1. confirmar Sites 28 y el commit exacto publicado;
2. confirmar que las dos tablas nuevas existen y tienen cero filas;
3. comprobar schemas y recursos publicos por HTTP;
4. comprobar que las rutas privadas fallan cerradas sin identidad;
5. repetir la observacion externa declarada y registrar su respuesta sin inferir puntuaciones ausentes.

## Rollback

Ante una regresion de aplicacion, volver a Sites 27. La migracion aditiva no altera tablas previas; mientras las tablas nuevas permanezcan vacias pueden conservarse sin afectar la version anterior. Eliminarlas seria una operacion D1 separada y no esta autorizada por este release.
