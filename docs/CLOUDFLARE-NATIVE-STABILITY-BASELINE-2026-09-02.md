# Cloudflare-native production stability baseline

**Proyecto:** `agent-friendly-web`

**Entorno:** `afw_public`

**Origen:** `https://agentfriendlyweb.dev`

**Fecha:** 2026-09-02

**Estado:** baseline verde; ventana de estabilidad abierta

## Alcance

El comando `npm run web:audit:stability` ejecuta un control estrictamente read-only:

1. repite un contrato independiente y ordenado de ocho recursos publicos y tres rutas privadas;
2. exige el redirect real de Cloudflare Access con audiencia y destino exactos, no un `401/403` de aplicacion;
3. lee el ledger publico `/.well-known/infrastructure-status.json` con limite de tiempo y tamano;
4. limita el ledger a ocho dias desde su observacion y rechaza fechas futuras o vigencias artificialmente largas;
5. consulta por Wrangler el deployment y la version remota activos, y comprueba que el binding D1 coincide con `wrangler.jsonc`;
6. contrasta el custom domain con la API de Cloudflare y verifica los tres JWT `meta` de Access contra las claves publicas vivas del tenant;
7. contrasta tambien el documento publico `cloudflare-access-protected-resource` sin conservar identidad, sesion ni reglas de usuarios;
8. ejecuta un unico `SELECT` fijo sobre la D1 productiva obtenida de la configuracion validada;
9. falla si cambian las seis migraciones, las trece tablas, las cero filas, la identidad de la base o si la consulta escribe.

No despliega, no migra, no cambia DNS, no modifica Access y no usa recursos Tokenizart.

## Resultado inicial

- Worker productivo y version al 100%: observados remotamente por Wrangler;
- custom domain `agentfriendlyweb.dev` -> `agent-friendly-web-web-production`: observado por API Cloudflare;
- Access: tres desafios del borde con audiencia AFW exacta y firmas `RS256` verificadas contra el JWKS vivo;
- trafico publico declarado por el ledger: 100%;
- once rutas del smoke publico y frontera Access: OK;
- ledger vigente hasta: `2026-09-09`;
- D1: 6 migraciones, 13 tablas funcionales, 0 filas funcionales;
- consulta de verificacion: 0 filas escritas, `changed_db=false`;
- Sites: existe una observacion operativa separada, historica y no decisiva para este control automatico;
- retiro Sites: no autorizado.

El dominio compartido `tokenizart.cloudflareaccess.com` se usa unicamente como contenedor de identidad Cloudflare. La evidencia verificada pertenece a `agentfriendlyweb.dev`, usa una audiencia especifica de AFW y no concede acceso a ningun runtime, D1, Worker ni dato de Tokenizart.

La primera invocacion candidata por nombre y entorno fallo cerrada con el API de D1 y no escribio datos. El adaptador final obtiene el UUID desde `wrangler.jsonc`, lo contrasta con el binding de la version remota y ejecuta el JavaScript local de Wrangler mediante Node, sin shell ni argumentos SQL mutables. Las afirmaciones del ledger se etiquetan como declaraciones y no sustituyen la evidencia independiente de los planos de control.

## Gate de cierre

La ventana no se considera cerrada antes del 9 de septiembre de 2026. Ese dia o despues se debe:

1. ejecutar nuevamente `npm run web:audit:stability`;
2. consultar nuevamente el dominio Cloudflare y verificar una nueva firma efimera de Access;
3. actualizar el ledger si su evidencia sigue vigente;
4. refrescar por separado la observacion de Sites y probar el procedimiento concreto de restauracion antes de considerarlo rollback operativo;
5. documentar incidentes o divergencias;
6. tomar una decision separada y expresa sobre retirar o conservar Sites.

Un baseline verde no autoriza por si solo el retiro del legado, contacto real, correo, CRM, pagos, x402, OAuth ni A2A operativo.

La evidencia machine-readable se conserva en `docs/evidence/cloudflare-native-stability-baseline-2026-09-02.json`. El recibo no decisivo de Sites se conserva en `docs/evidence/sites-rollback-operator-observation.json`.
