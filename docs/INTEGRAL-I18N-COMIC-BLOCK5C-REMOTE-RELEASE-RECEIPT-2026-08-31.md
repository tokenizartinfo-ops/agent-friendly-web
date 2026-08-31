# Recibo de publicacion remota: interfaz integral y Block 5C

**Fecha:** 2026-08-31
**Origen oficial:** https://agentfriendlyweb.dev
**Version Sites:** 29
**Commit publicado:** `e7a2059933b8e1e183cd5b8ec978a95bf69c2de1`

## Alcance publicado

- portada comic `La llamada` con recurso visual original;
- `Archivo del futuro` y progresion F0-F5;
- navegacion y contenido integral en espanol, ingles y portugues;
- formularios, Registry y superficies privadas con copia localizada;
- recursos publicos de descubrimiento agentico actualizados;
- laboratorio controlado Block 5C visible solo despues de comparacion completa y plan preparado.

## Limites conservados

- `remoteMutation=false`;
- provider unico `ephemeral_memory`;
- environment unico `local_sandbox`;
- ninguna conexion a WordPress, hosting, GitHub, DNS o proveedor externo;
- ninguna credencial, Secret Broker, filesystem, D1, cookie o storage persistente;
- ninguna creacion de PR, merge, publicacion remota o escritura fuera del navegador;
- ninguna migracion nueva respecto de la version Sites 28 ya desplegada.

## Verificacion previa

- `npm test`: 255/255 pruebas aprobadas;
- `npm run lint`: aprobado;
- `npm run build`: aprobado;
- comparacion contra la version Sites 28: sin cambios en `db/schema.ts` ni `drizzle/`;
- contrato Block 5C: un solo canary allowlisted, dry-run, apply efimero, verificacion, rollback e idempotencia;
- deteccion de secretos, destinos privados, evidencia vencida y divergencia: fallo cerrado.

## Pruebas posteriores

- `GET /`: `200`, portada y `Archivo del futuro` presentes;
- `GET /en` y `GET /pt`: `200`, home localizada;
- `GET /llms.txt` y `GET /llms-full.txt`: `200`;
- `GET /.well-known/agent-readiness.json`: `200`;
- `GET /registry`: `200`;
- `GET /expediente`: redireccion protegida, sin exposicion publica;
- `GET /qa-block5c`: `404`;
- recurso hero: `200`, 245390 bytes;
- QA visual Playwright: portada verificada en 1440 x 1000 y 390 x 844, sin superposiciones incoherentes.

## Estado del gate

La interfaz integral y el laboratorio local Block 5C quedan publicados. Esto no autoriza seleccionar un proveedor real, entregar credenciales, abrir escrituras remotas ni ejecutar una publicacion sobre un sitio de cliente.

El siguiente gate separado es elegir un unico adaptador de prueba en modo Draft PR o equivalente no fusionable, definir su autorizacion limitada y aprobar una prueba canary sobre un origen sintetico. Hasta esa decision, la frontera remota permanece cerrada.
