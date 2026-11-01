# Diagnóstico HTTP numérico del control cerrado
01nov2026 · fuente, no ensayo nuevo.

El recorrido cloud de fee050 (Actions41286044763) activó una candidata QA y restauró BASEc570, con lectura primaria independiente07:50:29UTC25GET. La creación del Workflow recibió4xx; el recibo anterior no guardó el número exacto. No se atribuye a403, expiración, billing o incidente público. La consulta de auditoría filtrada a ese token/POST/ventana solo devolvió3success200, sin el rechazo; no demuestra su causa.

La nueva salida effectHttp conserva solamente estado observado y hasta8 códigos numéricos por cada uno de5efectos. Ningún texto, header, cuerpo, URI o credencial pasa al log. El cuerpo de error se limita a8192B y al mismo plazo original; el diagnóstico no altera el latch denied/unknown, propiedad, ACK o cleanup. Una respuesta tardía puede tener número observado y seguirincierta. Cancelación no bloqueante y resultado propio congelado impiden cambios después de retornar.

PR703 ya separó material privado bajo el observador cerrado: ambas composiciones son fuente. Faltan canal confiable de borrador/alcance propio vigente, ARM real, diarios y finalizador por generación, suscripción/revisiónútil/retiradanativa y ensayo integradoPCoff.

La documentación pública permite Editor sobre Workers seleccionados, pero la referenciaREST de Workflow create/PATCH listaWorkersScriptsWrite. No documenta equivalencia de ese rol con el filtroWorker, ni demuestra que ese permiso de cuenta admita filtro de un Workflow. No inventar una política ni ampliar escritura a la cuenta compartida. Fuentes primarias:
- [Scopes por Worker](https://developers.cloudflare.com/workers/authorization/workers/)
- [Crear instancia](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/create/)
- [Cambiar estado](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/subresources/status/methods/edit/)
- [Catálogo de permisos](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)

Pregunta de soporte preparada, SIN enviar: ¿deben los endpoints de instancia del Workflow asociado al QA admitir IndividualWorkersEditor restringido aeseWorker? Si necesitanWorkersScriptsWrite, ¿qué filtro oficialmente soportado conserva aislamiento exactoQA/Workflow? Pedirpermission-group/resource-key/herencia/ejemplo, sin credenciales. Cualquierotra arquitectura requiereplan propio, nuncaunfallbackdelintento consumido.

TDDenActions119/1RED→119/38RED→171PASS0FAIL+ESLint, taskreview0P1/P2. Wholebranchreview/CIdeesta composición y eventualnuevaintenciónpendientes. Sinruntime/roles/token/grants/OTP/Max; operationalReadiness=false.
