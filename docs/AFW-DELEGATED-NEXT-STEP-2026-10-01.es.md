# Próximo paso delegado coherente con el copilot

2026-10-01. Bloque de fuente para el futuro piloto ChatGPT; no activa servicio remoto.

`project_summary` conserva su contrato previo y añade `nextStep`: kind, stage, reasonKey, basedOnRevision y field o actionId. `nextQuestion` contiene solo field/prompt cuando corresponde preguntar; en revisión de alcance o pendiente de objetivo es null. Utiliza el mismo `planCopilotNextTurn` que AFW: objetivo primero, una pregunta, alcance proporcional y decisiones pospuestas respetadas. La revisión de alcance no acredita nivel AF, autorización ni publicación.

La consulta SQL vincula proyecto y memoria de trabajo al mismo propietario. Extrae únicamente códigos pospuestos permitidos de sesión versión 1 y booleanos de presencia de CMS, hosting y fuentes. No selecciona narrativa, propuestas, citas, notas, secretos ni valores de hosting/CMS/fuentes. JSON inválido y memoria de otro propietario no aportan decisiones. La verificación de grant, scopes, recurso, revocación y propiedad continúa en cada lectura.

Pruebas: contrato acotado, objetivo prioritario, preguntas pospuestas, alcance sin obligar transacciones, memoria de otro owner y JSON inválido. El fixture OAuth incorpora las columnas/tablas ya existentes en el esquema real; consentimiento, PKCE, selección, aislamiento, replay y retirada se vuelven a comprobar. Suite completa: 659 aprobadas. Lint aprobado sin errores (una advertencia preexistente de img); build aprobado.

Producción conserva el recibo AFW-DELIVERY-PLAN-RELEASE-2026-10-01.es.md. Canary OAuth permanece deshabilitado. Siguiente: registro/callback comprobado de ChatGPT y piloto real limitado, conectar/leer/desconectar con rechazo del token vigente. No copiar expedientes reales al canary sintético.

Comprobación cloud adicional: AFW Operations continúa mostrando Entorno publicado. Reintento limitado desde su compositor existente devuelve «Unable to determine project root for task». No se inició tarea, no se cambió configuración, red ni permisos; no hay evidencia de disparador ni operación con PC apagado.