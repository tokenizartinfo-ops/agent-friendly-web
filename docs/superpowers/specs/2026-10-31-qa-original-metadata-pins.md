# Derivar los pins históricos originales antes de ARM
31 de octubre de 2026. Base revisada: main460c8ef6 / PR680.

Resultado: resolver internamente processGeneration y closedAt a partir de la admisión/cierre originales en D1 primaria. El paquete contiene solo cuatro pins originales; no se aceptarán los dos faltantes desde un cliente ni se fingirá una observación de Container.

## Contrato
createPrivateQaOriginalPinsReader({db,original,window,authorize,now,timeoutMs}).read(), sin argumentos. original contiene exactamente containerId/applicationId/programHash/sourceRevision del manifest ya ensamblado; applicationId debe ser el namespace fijo de RELEASE_TARGET. window contiene startAt/expiresAt de la cápsula, duración máxima diez minutos. timeoutMs 1–5000.

Un SELECT first-primary une admisión y cierre por grant, actor, generación, programa, fuente e imagen. Fija los tres pins de contenido originales, exige una sola admisión global, intervalos/tipos numéricos válidos, proceso y consentimiento expirados, cierre no anterior a creación ni posterior a ahora, y closedAt anterior al inicio de la generación. Una clausura sin admisión adicional no invalida el original. Una segunda admisión o una clausura que solo tenga forma parecida no sirve. No se leen identificadores de usuario/grant ni contenido del expediente.

Resultado privado e inmutable con exactamente containerId/processGeneration/programHash/sourceRevision/closedAt. No montar en RPC, exponer en UI ni registrar el objeto. No es prueba física, permiso ni reserva; la elegibilidad ARM existente comprueba por separado cero reservas, historial completo y consentimiento actual. El host debe comprobarla antes/después del CAS, además de native execution pin y source/config.

Un único lease wall+mono y authorize antes/después incluye validación, espera y liquidación final. Fijar referencias de options, original/window, db.prepare/withSession y session.prepare/statement.bind/bound.first. Cambio, timeout, reloj regresivo, respuesta tardía, forma extra/getter o error: rechazo genérico, sin devolver cuerpo.

## Plan y cierre
1. RED remoto: pruebas del módulo ausente y composición native D1 → pins → elegibilidad ARM.
2. Implementación de solo lectura; negativos de identidad, ambigüedad, reloj y método cambiado; conservar snapshots.
3. CI enfocada/full/lint/build y revisión independiente exact head; integrar únicamente con evidencia verde.
4. Documentar que es un componente interno: no binding nuevo, grant, paquete vivo, ARM, Workflow, Container, publicación o PC-off. No alterar presupuestos ni journals históricos.
