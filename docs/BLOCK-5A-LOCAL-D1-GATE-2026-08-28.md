# Block 5A - Gate D1 local y dos identidades

**Fecha:** 2026-08-28

**Estado:** aprobado en entorno local aislado; sin release remoto

## Alcance

Este gate valida la capsula de publicacion `manual_handoff` atravesando el Worker construido, las rutas privadas, Drizzle y una D1 local persistente. Los datos son sinteticos, el dominio usa el TLD reservado `.example` y no se consulta ni modifica ningun sitio real.

No se uso `--remote`, no se migro una D1 de Cloudflare, no se desplego una version y no se ejecuto Draft PR, CMS, DNS, A2A ni escritura externa.

## Preparacion

- Worker local: `http://127.0.0.1:4321` mediante Wrangler;
- D1: binding local `DB`, ID placeholder y persistencia aislada bajo `work/`;
- migraciones aplicadas en orden: `0000_tearful_ego.sql`, `0001_registry_block1.sql` y `0002_publication_capsules.sql`;
- expediente: museo sintetico con owner y mantenedor diferentes;
- dominio: `museum.example`, verificado solo como fixture local.

## Resultados HTTP

| Prueba | Resultado |
| --- | --- |
| GET sin identidad | `401` |
| GET con identidad ajena | `404` |
| GET owner | `200`, rol `owner` |
| GET mantenedor | `200`, rol `maintainer` y mismo hash |
| Descarga JSON | `200` con `Content-Disposition: attachment` |
| Creacion v1 | `201`, estado `owner_approval_pending` |
| Repeticion de creacion v1 | `200`, `replayed: true` |
| Aprobacion owner v1 | `201`, estado `maintainer_approval_pending` |
| Repeticion identica owner | `200`, `replayed: true` |
| Segunda decision owner | `409` |
| Aprobacion mantenedor v1 | `201`, estado `approved_for_manual_handoff` |
| Rechazo owner v2 | `201`, estado `rejected` |
| Repeticion identica del rechazo | `200`, `replayed: true` |
| Aprobacion posterior al rechazo | `409` |
| Decision sobre version vencida | `409` |

## Hallazgo y correccion

La inspeccion previa al recorrido detecto que la API calculaba el estado terminal despues de aceptar una decision nueva. Una version rechazada podia conservar estado `rejected`, pero aun recibir una fila de aprobacion del otro rol.

Se agrego primero una prueba de regresion que fallo. Luego la ruta se cambio para cargar las decisiones existentes, calcular el estado actual y rechazar toda decision nueva sobre `rejected` o `approved_for_manual_handoff`. El replay exacto se resuelve antes de esta clausura para conservar idempotencia.

## Evidencia D1

- tres versiones inmutables y tres claves de creacion diferentes;
- una decision por rol y version, sin duplicados;
- v1 aprobada por ambos roles;
- v2 rechazada por owner y cerrada;
- v3 vencida artificialmente para la prueba negativa;
- cero emails de actores en `capsule_json`;
- cero secretos probables en capsulas, notas y `project_events`;
- eventos limitados a IDs, rol, decision, estado, cantidad de archivos y hashes.

## Gate remoto

El codigo sigue siendo un candidato local. Antes de cualquier publicacion remota se requiere:

1. revisar el diff completo;
2. ejecutar nuevamente suite, lint y build;
3. inspeccionar la D1 remota objetivo y preparar backup/rollback;
4. aprobar separadamente migracion y release;
5. confirmar que el release sigue en `manual_handoff` y no agrega escritura sobre sitios.

Block 5B, Draft PR, conectores CMS y canary de escritura permanecen fuera de alcance.
