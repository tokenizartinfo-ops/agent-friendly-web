# Block 5A - Remote Release Receipt

**Fecha:** 2026-08-28

**Estado:** desplegado y verificado

**Sitio:** `https://agentfriendlyweb.dev`

**Modo:** `manual_handoff`; cero escritura sobre sitios objetivo

## Release

- Sites 25 publico el commit `3a9a4aac2a7d0d99818fe0b06ee938a0f3b5fdfa`.
- Sites 24 permanece disponible como version de rollback de la aplicacion.
- No se modificaron conectores, variables, secretos, accesos ni bindings privados.
- La migracion `0002_publication_capsules.sql` fue aditiva.

## D1

Antes del release no existian las tablas del Block 5A. Despues del release aparecen:

- `publication_capsules`;
- `capsule_approvals`.

Ambas tablas quedaron con cero filas. No se creo una capsula real ni se uso informacion de un owner.

## Pruebas

- suite local completa: 186 de 186 aprobadas;
- lint y build: aprobados;
- `llms.txt`, `llms-full.txt`, readiness y ambos schemas: HTTP 200;
- API privada sin identidad: HTTP 401;
- pagina privada sin identidad: redireccion al ingreso protegido;
- MCP publico: protocolo moderno `2026-07-28`, compatibilidad heredada, cuatro tools, cuatro resources y negativos HTTP aprobados;
- D1 posterior: tablas esperadas presentes y vacias.

El primer comando MCP sin URL explicita intento el origen local por diseno y fallo porque no habia servidor local. La repeticion contra `https://mcp.agentfriendlyweb.dev/mcp` aprobo; no fue un incidente remoto.

## Rollback

Ante una regresion de aplicacion, volver a Sites 24. La migracion aditiva no altera tablas previas; las tablas nuevas vacias pueden permanecer sin afectar la version anterior. Eliminarlas seria una operacion D1 separada y no esta autorizada por este release.

## Proximo gate

Block 5B puede leer archivos publicos vigentes, calcular un diff saneado y preparar un Draft PR sin merge. No puede escribir en CMS, publicar archivos, usar credenciales, desplegar en un dominio cliente ni ejecutar A2A. Cualquier primera escritura pertenece a Block 5C y requiere aprobacion separada.
