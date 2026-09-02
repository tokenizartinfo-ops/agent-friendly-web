# Cloudflare-native production stability baseline

**Proyecto:** `agent-friendly-web`  
**Entorno:** `afw_public`  
**Origen:** `https://agentfriendlyweb.dev`  
**Fecha:** 2026-09-02  
**Estado:** baseline verde; ventana de estabilidad abierta

## Alcance

El comando `npm run web:audit:stability` ejecuta un control estrictamente read-only:

1. repite el smoke de ocho recursos publicos y tres rutas privadas;
2. exige el redirect identificable de Cloudflare Access, no un `401/403` de aplicacion;
3. lee el ledger publico `/.well-known/infrastructure-status.json` con limite de tiempo y tamano;
4. consulta por Wrangler el deployment y la version remota activos, y comprueba que el binding D1 coincide con `wrangler.jsonc`;
5. contrasta el custom domain con la API de Cloudflare y el rollback con el conector de Sites mediante una observacion saneada que caduca en 24 horas;
6. ejecuta un unico `SELECT` fijo sobre la D1 productiva obtenida de la configuracion validada;
7. falla si cambian las seis migraciones, las trece tablas, las cero filas, la identidad de la base o si la consulta escribe.

No despliega, no migra, no cambia DNS, no modifica Access y no usa recursos Tokenizart.

## Resultado inicial

- Worker productivo y version al 100%: observados remotamente por Wrangler;
- custom domain `agentfriendlyweb.dev` -> `agent-friendly-web-web-production`: observado por API Cloudflare;
- trafico publico declarado por el ledger: 100%;
- once rutas del smoke publico y frontera Access: OK;
- ledger vigente hasta: `2026-09-09`;
- D1: 6 migraciones, 13 tablas funcionales, 0 filas funcionales;
- consulta de verificacion: 0 filas escritas, `changed_db=false`;
- binding Sites: observado activo y retenido; el plano Cloudflare confirma que el apex sirve el Worker productivo;
- retiro Sites: no autorizado.

La primera invocacion candidata por nombre y entorno fallo cerrada con el API de D1 y no escribio datos. El adaptador final obtiene el UUID desde `wrangler.jsonc`, lo contrasta con el binding de la version remota y ejecuta el JavaScript local de Wrangler mediante Node, sin shell ni argumentos SQL mutables. Las afirmaciones del ledger se etiquetan como declaraciones y no sustituyen la evidencia independiente de los planos de control.

## Gate de cierre

La ventana no se considera cerrada antes del 9 de septiembre de 2026. Ese dia o despues se debe:

1. ejecutar nuevamente `npm run web:audit:stability`;
2. renovar la observacion saneada de Cloudflare y Sites; una captura con mas de 24 horas falla cerrada;
3. actualizar el ledger si su evidencia sigue vigente;
4. verificar el rollback DNS y el estado del binding legado;
5. documentar incidentes o divergencias;
6. tomar una decision separada y expresa sobre retirar o conservar Sites.

Un baseline verde no autoriza por si solo el retiro del legado, contacto real, correo, CRM, pagos, x402, OAuth ni A2A operativo.

La evidencia machine-readable se conserva en `docs/evidence/cloudflare-native-stability-baseline-2026-09-02.json`.
