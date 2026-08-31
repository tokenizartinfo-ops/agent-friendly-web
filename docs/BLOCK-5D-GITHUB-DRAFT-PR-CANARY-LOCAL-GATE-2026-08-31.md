# Block 5D - GitHub Draft PR Canary - Gate local

## Estado

`PASS` local el 2026-08-31. El contrato y el ejecutor simulado estan implementados. No se creo repositorio, no se solicito token, no se abrio un Draft PR y no hubo mutacion remota.

## Frontera exacta

- Repositorio allowlisted: `tokenizartinfo-ops/agent-friendly-web-synthetic-origin`.
- Base: `main`.
- Rama: temporal y deterministica por run.
- Unico archivo: `llms.txt`.
- Tamano maximo: 128 KiB.
- Draft obligatorio.
- Merge, auto-merge, release, deployment, DNS y CMS: prohibidos.
- Ventana maxima del run: 30 minutos.
- Aprobacion humana: especifica, breve y vinculada a run, repositorio, operacion y un archivo.

## Implementacion

- Contrato: `agentfriendly.github-draft-pr-canary.v1`.
- Recibo metadata-only: `agentfriendly.github-draft-pr-receipt.v1`.
- Capability alias: `secretbroker://github/agent-friendly-web/block5d-synthetic-draft-pr`.
- Cliente GitHub: solo por inyeccion y con una unica operacion `createDraftPullRequest`.
- Idempotencia: un recibo valido impide una segunda llamada para el mismo run.
- Integridad: hashes de capsula, comparacion, plan y contenido deben coincidir.

## Pruebas negativas

El ejecutor falla cerrado ante:

- repositorio, base, rama o ruta diferentes;
- mas de un archivo o contenido superior a 128 KiB;
- secreto probable en contenido, titulo, cuerpo o metadata de aprobacion;
- capability incorrecta;
- run o aprobacion vencidos;
- flag remoto apagado o aprobacion ausente;
- resultado no Draft, ya mergeado o perteneciente a otro repositorio;
- replay con recibo divergente.

## Evidencia

- `npm test`: 266 pruebas aprobadas, 0 fallos.
- `npm run lint`: aprobado.
- `npm run build`: aprobado.
- No hay imports del ejecutor 5D en `app`, `scripts`, `proxy.ts`, configuracion Vite o Wrangler.
- No existe dependencia de GitHub SDK en `package.json`.
- Las pruebas usan exclusivamente un cliente simulado en memoria.

## Lo que permanece bloqueado

1. Crear o confirmar el repositorio sintetico.
2. Provisionar una capacidad GitHub minima y efimera fuera del modelo.
3. Emitir una aprobacion remota separada para un run concreto.
4. Abrir el unico Draft PR.
5. Revisar el recibo y el diff humano.

Ninguno de esos pasos queda autorizado por este gate. Aun con una futura aprobacion, el PR permanecera Draft y no podra fusionarse ni desplegarse.
