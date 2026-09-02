# Agent Friendly Web Cloudflare-native canary runbook v1

**Estado:** canary desplegado, protegido y verificado; rollback preparado sin ejecutar; produccion sin cambios
**Fecha:** 2026-09-01
**Proyecto:** `agent-friendly-web`
**Repositorio:** `tokenizartinfo-ops/agent-friendly-web`
**Entorno:** `afw_canary`
**Origen:** `https://canary.agentfriendlyweb.dev`

## Limite de esta operacion

Este runbook crea una copia remota excepcional para verificar paridad. No migra el origen publico, no cambia `agentfriendlyweb.dev`, no usa `*.chatgpt.site` y no toca Workers, D1, Access, DNS, repositorios ni datos de Tokenizart.

El canary completo queda detras de Cloudflare Access. No se enlaza desde el sitio publico, no tiene `workers.dev`, no tiene preview URL y recibe 0% del trafico publico.

## Recursos registrados

| Recurso | Nombre | ID |
| --- | --- | --- |
| D1 | `agent-friendly-web-web-canary` | `2b518988-eacb-4c31-b760-4e58c3c0285b` |
| Access application | `Agent Friendly Web Canary` | `dc905004-16dc-4174-b6ec-bb9911f6965c` |
| Access policy | `Allow Agent Friendly Web Canary Owner` | `39a8f0e6-419f-4c21-b8af-eabd6295a9b9` |
| Worker deployment | `agent-friendly-web-web-canary` | `620ebbd0-7434-4e30-b37c-1da780a3f62b` |
| Worker version | `agent-friendly-web-web-canary` | `5cddabb2-2efd-4b19-bcf7-ea4766a30104` |
| Custom domain | `canary.agentfriendlyweb.dev` | `b61a8874e9df56a6b2e9caec04cdd6f0f9616dc5` |

La audiencia Access y los IDs anteriores son metadata operativa, no secretos. La allowlist contiene exclusivamente `tokenizart.info@gmail.com`.

## Estado de datos

Las migraciones `0000` a `0005` fueron aplicadas el 2026-09-01. La D1 tiene 13 tablas funcionales con 0 filas totales y una tabla tecnica `d1_migrations` con 6 recibos. El recuento se repitio despues del deploy y de los smokes read-only: `rows_written=0` y todas las tablas funcionales continuaron vacias. Es una base nueva y vacia; no requiere backup de datos previo. Las futuras migraciones son forward-only.

## Preflight obligatorio

Desde la raiz del repositorio:

```powershell
npm run web:preflight:canary
```

Debe devolver `"ok": true`. El preflight es metadata-only y falla si detecta otro proyecto, otro dominio, un ID placeholder, D1 compartida o no vacia, Access incompleto, trafico mayor a 0%, dependencia de produccion o rollback inseguro.

## Verificacion local

Usar Node `>=22.18.0`. En este host, el runtime empaquetado Node 24 evita la incompatibilidad del runtime local antiguo:

```powershell
& 'C:\Users\gabri\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' 'node_modules\vinext\dist\cli.js' dev --host localhost --port 8788
npm run web:smoke:local
```

Ademas deben pasar:

```powershell
npm test
npm run lint
npm run web:compatibility
npm run build
npm run web:deploy:dry-run
```

## Secuencia remota

Los pasos 1 a 10 quedaron verificados el 2026-09-01. El smoke anonimo confirmo que nueve rutas representativas son interceptadas por Access antes de llegar a la aplicacion. Una sesion permitida confirmo el HTML autenticado del canary. La misma compilacion fue revisada en 1440x900 y 390x844: la ilustracion principal cargo, ES/EN/PT permanecieron visibles, no hubo desbordamiento horizontal ni errores de consola. El smoke local completo cubrio los recursos agenticos, APIs read-only y cierre de rutas privadas. Esta evidencia no autoriza el corte de produccion.

1. [Verificado] Access protege `canary.agentfriendlyweb.dev` y la politica allowlist es la unica politica asociada.
2. [Verificado] D1 corresponde al ID registrado, tiene seis migraciones y trece tablas funcionales vacias.
3. [Verificado] El Worker canary esta desplegado con `workers_dev` y preview URLs deshabilitados.
4. [Verificado] El deployment ID y Worker version ID quedaron registrados.
5. [Verificado] `canary.agentfriendlyweb.dev` esta asociado al Worker sin modificar los registros A de `agentfriendlyweb.dev`.
6. [Verificado] `npm run web:smoke:canary-edge` confirma que todas las rutas son interceptadas por Access.
7. [Verificado] El candidato endurecido se desplego con React `19.2.8`, Vinext `1.0.0-beta.8` y cero vulnerabilidades de produccion conocidas por `npm audit --omit=dev`.
8. [Verificado] Se inicio sesion con `tokenizart.info@gmail.com`; Access entrego la portada autenticada. La matriz de rutas se completo con el smoke local de la misma compilacion y el smoke anonimo del edge, sin cargar datos reales ni ejecutar publicaciones.
9. [Verificado] D1 se consulto nuevamente en tres lecturas acotadas: las trece tablas funcionales conservaron 0 filas, `rows_written=0` y `changed_db=false`.
10. [Verificado] El candidato se comparo con el origen publico sin cambiar trafico. Las capturas Playwright de escritorio y movil quedaron como evidencia local en `output/playwright/`; el origen canonico continuo sobre su runtime transitorio.

## Rollback canary

El rollback no depende del origen publico:

1. Desasociar `canary.agentfriendlyweb.dev` del Worker.
2. Verificar que el hostname deja de servir la aplicacion.
3. Conservar temporalmente Worker, Access y D1 para diagnostico; eliminarlos solo cuando la evidencia haya sido preservada.
4. Verificar `https://agentfriendlyweb.dev`, `robots.txt`, `llms.txt`, readiness, OKF y API Catalog. Deben permanecer iguales porque el canary nunca recibio trafico publico.

No se modifica DNS apex, no se restaura Sites como staging y no se toca ninguna superficie Tokenizart.

La secuencia, los IDs y las comprobaciones posteriores quedaron preparados y validados por preflight. El detach no se ejecuto porque destruir temporalmente una superficie verde no agrega evidencia proporcional y podria introducir una interrupcion innecesaria. Ejecutarlo sigue siendo una decision operativa separada si el canary falla.

## Gate posterior

Un canary verde solo habilita preparar el recibo de cutover. No autoriza por si mismo reemplazar el origen publico, crear D1 de produccion, migrar datos, retirar Sites ni enviar trafico real.
