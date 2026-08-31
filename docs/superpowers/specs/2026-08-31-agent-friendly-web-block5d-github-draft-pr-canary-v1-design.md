# Agent Friendly Web Block 5D: GitHub Draft PR Canary v1

## Estado

Aprobado para implementacion local por Gabriel Mucchiut el 2026-08-31. La apertura remota del Draft PR requiere una aprobacion posterior sobre el repositorio sintetico exacto.

## Objetivo

Preparar la primera frontera remota reversible de Agent Friendly Web: crear un unico Draft PR en un repositorio sintetico, sin merge ni despliegue, usando una capacidad efimera inyectada fuera del modelo.

## Target unico

- Provider: GitHub.
- Repositorio allowlisted: `tokenizartinfo-ops/agent-friendly-web-synthetic-origin`.
- Base: `main`.
- Archivo canary: `llms.txt`.
- Maximo: un archivo y un Draft PR.
- Merge, auto-merge, release, deployment, DNS y CMS: prohibidos.

El repositorio no se crea ni se modifica en este gate local. Su existencia y propiedad se verificaran antes de la aprobacion remota.

## Contrato

`agentfriendly.github-draft-pr-canary.v1` declara:

- identificadores de run, capsula, comparacion y plan;
- manifest y SHA-256 del canary;
- repositorio, base, rama temporal y ruta allowlisted;
- `provider=github`, `environment=synthetic_repository`;
- `remoteMutation=true`, `draft=true`, `mergeAllowed=false`, `maxFiles=1`;
- `capabilityRef` como alias no secreto;
- clave de idempotencia y expiracion.

El recibo `agentfriendly.github-draft-pr-receipt.v1` conserva solo metadata: run, PR, URL GitHub, estado draft, hashes y fecha. Nunca incluye token, cabeceras o contenido sensible.

## Autorizacion

La libreria recibe un cliente GitHub ya autenticado por inyeccion. El modelo y el navegador no reciben el token. El alias canonico sera `secretbroker://github/agent-friendly-web/block5d-synthetic-draft-pr`.

La ejecucion remota exige simultaneamente:

1. flag del servidor habilitado;
2. aprobacion humana especifica aun vigente;
3. capability alias exacto;
4. target allowlisted;
5. plan y hashes coincidentes;
6. cliente que solo implemente `createDraftPullRequest`.

## Fallo cerrado

Se rechazan repositorios, bases o rutas diferentes; mas de un archivo; contenido con secreto probable; PR no draft; respuesta sin URL GitHub verificable; expiracion; replay divergente; merge o capacidad ausente.

## Limite del release

Este bloque implementa contrato, adaptador, cliente simulado, recibo y documentacion. No crea el repositorio, no solicita credenciales, no abre el Draft PR y no cambia produccion.

