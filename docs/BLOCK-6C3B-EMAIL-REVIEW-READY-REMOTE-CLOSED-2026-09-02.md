# Gate 6C.3B: Review Ready Remote Closed

**Fecha:** 2026-09-02

**Estado:** `remote_database_and_closed_route_ready_binding_pending`

## Declaracion de frontera

| Campo | Valor |
| --- | --- |
| `PROJECT` | `agent-friendly-web` |
| `REPOSITORY` | `tokenizartinfo-ops/agent-friendly-web` |
| `ENVIRONMENT` | `afw_email_review_ready_canary` |
| `ORIGIN` | `https://canary.agentfriendlyweb.dev` |
| `RESOURCE_TYPE` | Cloudflare Worker, D1 y Rate Limiting binding aislados |
| `RESOURCE_ID` | Worker `agent-friendly-web-web-canary`; D1 `2b518988-eacb-4c31-b760-4e58c3c0285b`; Rate Limit namespace `1895760673` |
| `ALLOWED_ACTION` | backup saneado, migracion aditiva `0006`, deploy con flag OFF y pruebas read-only/fail-closed |
| `ROLLBACK` | restaurar Worker `5ca4fe04-2156-47b4-ae66-3390510f18af`; conservar tabla aditiva vacia o restaurar el backup temporal solo ante incidente D1 |

Esta declaracion aplica exclusivamente a Agent Friendly Web. No usa runtimes, datos, repositorios ni recursos de Tokenizart.

## Resultado

La ruta cerrada de `internal_review_ready` quedo desplegada en el Worker canary version `6bb88a08-ec6c-4577-b131-5d7729446822`. Cloudflare Access intercepta la ruta antes de la aplicacion y el kill switch continua exactamente como `AFW_EMAIL_REVIEW_READY_ENABLED=false`.

La configuracion remota contiene D1, assets y el rate limiter nativo de una solicitud por 60 segundos. No existe ningun binding `send_email`, no se incorporo un destino privado y no hay capacidad recurrente de salida.

## D1 y trazabilidad

Antes de migrar se registraron migraciones pendientes y conteos agregados sin leer filas. Se exporto un backup a almacenamiento temporal del sistema operativo, con 10.628 bytes y SHA-256 `4fb4dffe543ddb19b947c8e1df592a70b4de86341787f94de454739ca8836e24`. La ruta local y cualquier URL temporal firmada se excluyen deliberadamente de este documento.

Se aplico solo `0006_email_transactional_deliveries.sql`. Despues de la migracion quedaron cero migraciones pendientes, las trece tablas funcionales anteriores conservaron cero filas y `email_transactional_deliveries` quedo con cero filas. No se escribio un destinatario, cuerpo, subject de Access ni error crudo de proveedor.

## Verificaciones remotas

- el smoke completo del canary recibio redireccion a Cloudflare Access;
- `POST /api/canary/email/review-ready` sin identidad recibio `302` hacia el dominio Access esperado;
- la version desplegada contiene el rate limiter y conserva el flag en `false`;
- no existe ningun binding `send_email` en la version;
- D1 conserva cero filas de entregas;
- el Worker productivo mantuvo la version `33ac170d-6b16-4a48-95c7-bbe31d34792a`;
- `agentfriendlyweb.dev` no fue modificado y el contrato nuevo continuo ausente del origen publico durante esta prueba;
- ningun correo fue preparado, enviado ni reintentado.

## Limite del gate

Este gate prueba infraestructura cerrada, no una operacion de correo. Siguen pendientes el binding Cloudflare con destino fijo, la allowlist hash del actor verificado fuera de Git y una nueva ronda de pruebas negativas con esas capacidades privadas presentes. Solo despues puede evaluarse un unico envio humano controlado.

No habilita destinatarios arbitrarios, correo a clientes, marketing, autorespuestas, lectura entrante, adjuntos, CRM, billing ni automatizacion.

## Rollback

El rollback de aplicacion consiste en volver a la version Worker `5ca4fe04-2156-47b4-ae66-3390510f18af`. La migracion es aditiva y la tabla permanece vacia, por lo que el rollback normal no requiere borrar schema. El backup temporal queda reservado para recuperacion ante incidente y no forma parte del repositorio.
