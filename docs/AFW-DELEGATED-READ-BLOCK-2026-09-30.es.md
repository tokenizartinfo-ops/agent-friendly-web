# Lectura delegada: primer bloque de OAuth

Estado: implementacion interna y adaptador MCP local; no servidor OAuth ni endpoint privado desplegado. Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`. No mutaciones remotas de Workers, Access, D1 o DNS.

## Resultado

`lib/delegated-project-read.mjs` valida en cada llamada un permiso persistido, sujeto, cliente, recurso, proyecto, scopes, vencimiento y revocacion. Tambien comprueba la propiedad actual del expediente. El contexto solo puede provenir del futuro adaptador OAuth tras validar el token; este modulo no verifica tokens ni se puede conectar directamente a datos de una peticion HTTP.

`lib/delegated-project-repository.mjs` usa consultas parametrizadas y seleccion explicita de campos. Recibe un almacen de permisos autoritativo del adaptador OAuth: no inventa una tabla o un grant de produccion. El resumen omite contactos, notas y borradores. Las observaciones se limitan al origen actual y conservan su fecha, con cinco resultados como maximo.

`lib/delegated-project-mcp.mjs` ofrece dos herramientas locales: resumen del proyecto y evidencias guardadas. Sus argumentos son vacios/estrictos: el agente no elige sujeto, grant ni otro proyecto. Cada llamada resuelve de nuevo autorizacion y permiso; no hace auditorias, inferencia, escritura ni publicacion. La siguiente pregunta usa el contrato basico existente del expediente.

## Evidencia y limites

619 pruebas completas aprobadas. Nueve pruebas nuevas incluyen intercambios con el cliente MCP, revocacion entre llamadas y consultas SQLite reales con otro sujeto/origen e intento de inyeccion. No prueban PKCE, consentimiento OAuth, identidad Access o interoperabilidad con un asistente externo: esos corresponden al siguiente bloque.

Intento de instalar Workers OAuth Provider 1.2.1 fallo por ENOSPC. `package.json` y el lock no cambiaron. Npm sustituyo el enlace local de dependencias por una instalacion parcial; lint local falla por un modulo faltante. La eliminacion recursiva de la instalacion nueva fue rechazada por politica. No borrar dependencias compartidas ni archivos ajenos. CI limpio de PR #139, run `36799153517`, aprobo tests, lint y build del commit `009f4eedc7be810caf24763f2769169a025e7710`; eso no restaura las dependencias locales ni prueba un despliegue.

Revision independiente de lectura sobre ese commit: sin hallazgos accionables en el alcance del servicio interno. No reprodujo los tests ni valido el futuro transporte OAuth. El owner fue informado del impedimento local y se solicito liberar al menos 2 GB en C: para continuar la instalacion/adaptador. Ninguna credencial ni permiso real fue agregado.

## Siguiente bloque

Restaurar dependencias locales/liberar espacio, integrar proveedor 1.2.1 y registro autoritativo de grants junto con su schema/migracion. Implementar pre-registro del cliente piloto, Authorization Code + PKCE, consentimiento ligado a sujeto/proyecto, revocacion, vida corta y validacion del recurso. La version actual ofrece roles separados y helpers de consentimiento propios; no copiar el ejemplo antiguo de `OAuthProvider` sin contrastarlo con esa API. Descriptores y `auth.md` solo despues de un flujo probado. Mantener anonimo el MCP publico y el piloto actual sin cambios.

Plan: `docs/superpowers/plans/2026-09-30-delegated-read.md`. Propuesta aprobada: `docs/AFW-OAUTH-A2A-PROPOSAL-2026-09-30.es.md`.
