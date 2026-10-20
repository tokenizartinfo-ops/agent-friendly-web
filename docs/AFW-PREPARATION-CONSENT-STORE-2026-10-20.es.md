# AFW: persistencia del consentimiento de preparación
19oct2026 Argentina /20oct UTC. Fuente candidata, no servicio habilitado.
Nueva tabla propuesta db/delegated-preparation-consents.sql, FUERA de drizzle y NO instalada. No altera el consentimiento/cliente/almacenamiento de lectura aceptado.

## Qué conserva
Perfil explícito, hash del handle y de solicitud original SDK, subject/client/project/resource fijados por servidor, scopes originales, inicio/fin original y ventana del ensayo; revisión/sitio/claim comprobados; un grantID interno generado una sola vez. No se guardan bearer, códigos, cookies, assertions ni respuestas privadas del expediente.
La elección y vencimiento no se reconstruyen desde un kind ni se renuevan al renderizar o reintentar.

## Estados y confirmaciones
pending no concede nada. La primera decisión válida reserva un único intento en reserved y debe recibir ACK durable. Solo ese escritor continúa en la MISMA petición y lease original.
La transición reserved->admitted y el INSERT del grant de aplicación ocurren en UNA sentencia con trigger SQLite. Si el INSERT falla, ambas modificaciones de esa sentencia se revierten; la reserva anterior permanece y no se repite. El grant queda sin intercambio; no implica código, token o autenticación SDK.
Pérdida de ACK en reserva o admisión: unknown_ack. inspect es solo lectura con la misma identidad/referencia y lease vigente; freshDecision=false nunca autoriza repetir SDK completion. Una reserva incompleta no genera otro grant ni otra clave al consultar o decidir otra vez.
Cancelar reduce el intento pendiente/reservado y no crea grant, incluso si cambió el dominio/propiedad. Una concesión ya admitida se retira con el revocador existente; el historial de decisión no se reescribe para simular que nunca ocurrió.

## Frontera del módulo
lib/delegated-preparation-consent-store.mjs es un primitivo interno cerrado por defecto. Requiere perfil exacto/fijo, fábrica primaria, reloj confiable y lease opaco ORIGINAL. Estos parámetros y hashes provienen del FUTURO host verificado; su sintaxis no prueba identidad, CSRF o procedencia SDK.
begin/decide/inspect reciben referencias privadas del host, NO cuerpos de formulario o argumentos MCP. Resultado interno no se serializa como contrato público por inferencia. Flags code/token issued describen que ESTA llamada no emite esos objetos, no certifican que no existan en otro sistema.
Admisión positiva comprueba esquema propio exacto y esquema de preparación, owner/revisión/dominio/claim actual y plazo; la sentencia revalida la fuente. El claim fijado debe seguir válido y verificado; no se concede con un snapshot ya inválido.
Rollback del reloj, vencimiento de lease/ventana o cambio de configuración cierran. El presupuesto5s se comparte con el trabajo previo del host y no se reinicia por método.
No hay HTTP, SDK begin/approve/complete, formulario, ruta, cliente/scope real, refresh, migración, despliegue ni instalación. La integración SDK/UI/token exchange/revocación/limpieza parcial todavía debe implementarse y probarse.

## Evidencia
22casos REDc781d883/CI39353246217/job118402091627:2324PASS/22newFAIL/1existingSKIP; solo faltaba el nuevo módulo. GREEN, native D1, revisión, integración y límites en PR514 e issue497; este documento candidato no los presume.
La prueba nativa usa workerd/D1 reales en runner con identidad/controles/fallos sintéticos, sin Access/SDK ni datos de clientes. No sustituye la prueba criptográfica SDK de512 ni es un ensayo remoto Cloudflare.
[Spec](superpowers/specs/2026-10-20-afw-preparation-consent-store.md) · [Plan/ledger](superpowers/plans/2026-10-20-afw-preparation-consent-store.md).
G2 cerrado sin OTP/reconexión; Container02382110, suscripción/turno útil/baja nativa, PC-off y Max separados. operationalReadiness=false. Rollback de fuente por revert revisado, historial/configuración/custodia preservados.
