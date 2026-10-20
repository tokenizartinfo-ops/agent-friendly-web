# Esquema aislado de preparación AFW
20oct2026 · fuente y QA propia; operación remota solo por recibo posterior.

## Objetivo y alcance
Preparar únicamente el cierre de dependencias D1 que necesita el servicio de preparación, sin instalar todo el esquema de producto ni tocar producción. Se conservan los DDL originales y sus guardas; no se inventa una nueva variante del modelo ni se migra una base existente. KV OAuth será dedicado y vacío. Ni el esquema ni tener recursos concede autorización.
Las consultas de proyecto requieren también copilot_working_drafts y scan_observations; por eso el cierre comprobado contiene11tablas, no solo las de consentimientos y cápsulas. Refresh sigue denegado por el router: delegated_refresh_uses no se instala.

## Contrato
scripts/preparation-schema-package.mjs exporta readPreparationSchemaPackage() y buildPreparationSchemaPackage(sources), sin red ni operación remota. Once entradas exactas de fuente, ligadas a blobs Git de d863055afb04ef8fb83606d974e094f0f6044154; el paquete aporta SHA256 de bytes/SQL/fragmentos, origen e índice por sentencia. PREPARATION_SCHEMA_INPUTS es inmutable. No admite fuentes faltantes, extra, sustituidas o DML como entrada. Mantiene sentencias completas por statement-breakpoint, nunca divide triggers por punto y coma.
Salida afw.preparation.schema-package.v1, tables/statements/sources/schemaSql/schemaSha256 y provisioningAllowed=false/recordsIncluded=false/activationReady=false/operationalReadiness=false. Es un paquete de DDL revisable, no instalador.

## Cierre
Equivalencia en D1/workerd entre todos los objetos propios de esas11tablas en la cadena completa y el paquete mínimo. Tablas vacías. El ensayo nativo existente del Worker real cambia solo la carga DDL a este paquete: conserva JWT/SDK/PKCE/KV/D1/MCP/draft y retirada ya implementados. No se añade un flujo de permisos alternativo ni se copian fixtures a remoto.
Proyecto AFW; Worker separado agent-friendly-web-preparation-canary permanece4flagsfalse y sin bindings nuevos. No secret/cliente/Access/issuer/ruta/ventana/consentimiento reales. Public9d4b1396, G2/events y Tokenizart/FCO intactos. Nada de Max/avisos/PCoff acreditado.

## Operación posterior separada
Tras revisión y CI: releer cuenta/nombres/IDs y crear solo recursos D1/KV propios nuevos si no existen. D1 debe estar vacío; conservar ID y metadatos antes de aplicar el DDL exacto validado, consultar inventario y filas después. Un ACK desconocido exige leer estado de ESA operación antes de otro intento, nunca ejecutar a ciegas. Cualquier estado parcial queda cerrado.
Reversión proporcional: no hay binding/ruta/registro de cliente que retirar ni datos a rebobinar; conservar recursos no conectados y evidencia, sin DROP/borrado para resolver errores. Si hubiera cambio legítimo o datos, detener y conciliar, no aplicar el perfil de base vacía.
No se crea aún una identidad permisiva: requiere hostname humano, audiencia Access, cliente/redirect/resource/PKCE y consentimiento propio con fechas originales. Esas son etapas posteriores; no copiar la configuración o los registros del piloto viejo.
