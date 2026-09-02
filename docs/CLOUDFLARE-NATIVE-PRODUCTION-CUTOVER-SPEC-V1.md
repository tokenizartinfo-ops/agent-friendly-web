# Agent Friendly Web Cloudflare-native production cutover v1

**Estado:** implementado; corte Cloudflare activo y Sites retenido para rollback
**Fecha:** 2026-09-01
**Owner:** Gabriel Mucchiut
**Proyecto:** `agent-friendly-web`
**Repositorio:** `tokenizartinfo-ops/agent-friendly-web`

## Objetivo

Reemplazar el runtime Sites del origen canonico `https://agentfriendlyweb.dev` por el Worker Vinext de Agent Friendly Web, conservando un retorno inmediato al origen anterior y sin habilitar capturas de contacto, pagos, Tokenizart ni otras mutaciones ajenas al corte.

## Frontera obligatoria

| Campo | Valor autorizado |
| --- | --- |
| `PROJECT` | `agent-friendly-web` |
| `REPOSITORY` | `tokenizartinfo-ops/agent-friendly-web` |
| `ENVIRONMENT` | `afw_public` |
| `ORIGIN` | `https://agentfriendlyweb.dev` |
| `RESOURCE_TYPE` | Worker web, D1 web, Access web privada y custom domains AFW |
| `ALLOWED_ACTION` | preparar, probar, cortar o revertir exclusivamente el origen web AFW |

Quedan excluidos todos los repositorios, Workers, D1, Access, dominios y datos de Tokenizart. Tambien quedan excluidos `*.chatgpt.site`, salvo la conservacion temporal del binding Sites ya existente como mecanismo de retorno.

## Estado de partida verificado

- El origen publico usa el proyecto Sites `appgprj_6a8f19e35d688191a53e93432543e39c`.
- El binding Sites `appgdom_6a8f665d5bc881919ac5fbdd05f69cbd` esta activo y usa dos registros A apex: `162.159.143.30` y `172.66.3.26`.
- La validacion Sites se conserva en `_openai-site-verification.agentfriendlyweb.dev`.
- El canary `canary.agentfriendlyweb.dev` esta detras de Access, usa una D1 aislada vacia y recibe 0% del trafico publico.
- El Worker productivo y la D1 productiva todavia no existen.

## Arquitectura de transicion

### 1. Recursos productivos sin trafico

Se crea `agent-friendly-web-web-production` y una D1 separada `agent-friendly-web-web-production`. Se aplican las seis migraciones sobre una base vacia y se comprueba que las trece tablas funcionales tienen cero filas.

El Worker se despliega con `workers_dev=false`, `preview_urls=false`, diagnostico canary deshabilitado y sin custom domain publico.

### 2. Release temporal protegido

El mismo Worker productivo se asocia temporalmente a `release.agentfriendlyweb.dev`. Cloudflare Access protege todo ese hostname para `tokenizart.info@gmail.com`.

La aplicacion Access debe admitir luego, con la misma audiencia, estos destinos privados del apex:

- `agentfriendlyweb.dev/expediente*`;
- `agentfriendlyweb.dev/capsula/*`;
- `agentfriendlyweb.dev/api/projects/*`.

El release permite comprobar HTML autenticado, rutas publicas, recursos agenticos, idiomas, responsive, D1 vacia y cierre de rutas privadas sin exponer la aplicacion a visitantes.

### 3. Ensayo de rollback sin trafico publico

Se desasocia `release.agentfriendlyweb.dev`, se verifica que deja de servir el Worker y se vuelve a asociar al mismo servicio. El resultado debe conservar el mismo Worker, D1 y politica Access. Este ensayo prueba el mecanismo operativo de detach/attach antes de usarlo sobre el apex.

### 4. Corte del apex

Antes del corte se registran IDs, contenido, proxy y TTL de cada DNS apex. El binding Sites no se elimina durante la ventana inicial.

La secuencia acotada es:

1. incorporar los destinos privados del apex a la aplicacion Access;
2. eliminar solamente los dos registros A apex observados;
3. asociar `agentfriendlyweb.dev` al Worker productivo como Custom Domain;
4. verificar DNS, TLS, HTML, recursos agenticos, idiomas, rutas privadas y D1;
5. mantener Sites y sus TXT de validacion sin cambios durante la ventana de estabilidad.

## Rollback del apex

Si cualquier smoke critico falla:

1. desasociar el Custom Domain `agentfriendlyweb.dev` del Worker;
2. restaurar exactamente los dos registros A anteriores como DNS-only;
3. comprobar el retorno de HTML, `robots.txt`, `llms.txt`, OKF y API Catalog desde Sites;
4. retirar los destinos Access del apex si interfieren con el runtime restaurado;
5. conservar Worker, D1 y evidencia para diagnostico sin revertir migraciones.

No se elimina el binding Sites hasta cerrar una ventana estable posterior. No se usa `*.chatgpt.site` como URL publica ni como entorno de prueba.

## Gates tecnicos

El cutover falla cerrado salvo que todos estos controles esten verdes:

1. suite, lint, build, compatibilidad y dry-run;
2. D1 productiva aislada, migrada y vacia;
3. Worker productivo desplegado sin trafico;
4. Access con un unico owner y destinos exactos;
5. release autenticado y responsive;
6. ensayo detach/attach del release;
7. comparacion automatizada entre origen vigente y candidato;
8. snapshot DNS y rollback completos;
9. smoke publico posterior con rutas publicas `200` y privadas interceptadas por Access;
10. D1 con cero escrituras durante la verificacion.

## Capacidades que permanecen deshabilitadas

- captura real de contactos y Turnstile productivo;
- email operativo;
- CRM remoto;
- pagos, x402 y A2A transaccional;
- escritura automatica sobre sitios de terceros;
- cualquier runtime o dato Tokenizart;
- eliminacion del proyecto Sites durante el primer corte.

## Evidencia final

El recibo `docs/CLOUDFLARE-NATIVE-PRODUCTION-CUTOVER-RECEIPT.md` debe registrar recursos, versiones, hashes, pruebas, timestamps, estado de D1, cambio DNS, resultado del rollback ensayado y decision de conservar o revertir el corte.

## Resultado 2026-09-02

- `agentfriendlyweb.dev` sirve el Worker `agent-friendly-web-web-production` mediante Custom Domain Cloudflare.
- El smoke publico final paso las ocho superficies publicas y la frontera privada `/expediente`.
- La D1 productiva conserva trece tablas funcionales y cero filas.
- `release.agentfriendlyweb.dev` permanece protegido por Access para diagnostico controlado.
- El binding Sites y sus TXT permanecen activos, sin recibir el dominio apex, durante la ventana de estabilidad.
- El detalle auditable vive en `docs/CLOUDFLARE-NATIVE-PRODUCTION-CUTOVER-RECEIPT.md` y `docs/evidence/cloudflare-native-production-cutover-receipt.json`.
