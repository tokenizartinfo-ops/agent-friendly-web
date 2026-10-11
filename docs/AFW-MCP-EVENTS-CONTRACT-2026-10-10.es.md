# MCP Events: contrato local para despertar la supervisión

La documentación oficial actual identifica un canal de callbacks para chats Work cloud y dots: [MCP Events](https://developers.openai.com/plugins/build/mcp-events). Esta lectura10oct amplía la investigación histórica6oct, que no había identificado un webhook arbitrario hacia el chat. No invalida sus observaciones de entonces ni acredita disponibilidad actual de la cuenta AFW.

El bloque prepara catálogo y proyección pura afw.dossier.changed desde la señal operacional existente afw-dossier-event-v1. Conserva ID opaco y fecha original; data contiene únicamente projectRef, revision y kind. Filtro de proyecto exacto, rechazo de campos extra/accesores/tipos incorrectos y copias independientes del catálogo. No admite correo, dominio, texto o instrucciones del expediente.

El parámetro authorizedProjectRef debe ser resuelto por el host, nunca por el navegador. La función solo valida forma y correspondencia: no autentica un owner ni comprueba D1. No se anuncia events en ningún endpoint; la capa público-read-only y OAuth delegado permanecen iguales. No hay suscripción, secreto, envío, scheduler o despliegue en este bloque.

Siguiente: lifecycle de suscripciones en endpoint privado propio, permiso y vigencia revalidados, custodia cifrada, verificación callback sin SSRF/redirecciones y entrega firmada con presupuesto. Luego rescan del plugin y una suscripción sintética real. Registrar por separado recepción, ejecución/revisión y cierre, ligados al chat/entorno/fuente/modelo exactos. Un ACK del callback no completa una revisión.

La consulta real de codex cloud list no encontró entornos en el workspace del CLI instalado; no se inició tarea. AFW Operations visible en web no prueba que el CLI lo pueda usar. No copiar credenciales a un host nuevo ni sustituir la suscripción por API de pago desde esta discrepancia.

Validación y aceptación se registran en el ledger local y CI exacthead. Mantener piloto Max sujeto a preview/aprobación y consentimiento; PC-off aún no listo.
