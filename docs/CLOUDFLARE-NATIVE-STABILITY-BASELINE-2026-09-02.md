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
4. ejecuta un unico `SELECT` fijo sobre la D1 productiva mediante el ID exacto `d26fc9d2-df5a-4957-8e58-cc4c945faad8`;
5. falla si cambian las seis migraciones, las trece tablas, las cero filas o si la consulta escribe.

No despliega, no migra, no cambia DNS, no modifica Access y no usa recursos Tokenizart.

## Resultado inicial

- Worker productivo: observado;
- trafico publico declarado: 100%;
- smoke publico y frontera Access: OK;
- ledger vigente hasta: `2026-09-09`;
- D1: 6 migraciones, 13 tablas funcionales, 0 filas funcionales;
- consulta de verificacion: 0 filas escritas, `changed_db=false`;
- binding Sites: retenido sin trafico apex;
- retiro Sites: no autorizado.

La primera invocacion candidata por nombre y entorno fallo cerrada con el API de D1 y no escribio datos. El adaptador final usa el UUID exacto y ejecuta el JavaScript local de Wrangler mediante Node, sin shell ni argumentos mutables.

## Gate de cierre

La ventana no se considera cerrada antes del 9 de septiembre de 2026. Ese dia o despues se debe:

1. ejecutar nuevamente `npm run web:audit:stability`;
2. actualizar el ledger si su evidencia sigue vigente;
3. verificar el rollback DNS y el estado del binding legado;
4. documentar incidentes o divergencias;
5. tomar una decision separada y expresa sobre retirar o conservar Sites.

Un baseline verde no autoriza por si solo el retiro del legado, contacto real, correo, CRM, pagos, x402, OAuth ni A2A operativo.

La evidencia machine-readable se conserva en `docs/evidence/cloudflare-native-stability-baseline-2026-09-02.json`.
