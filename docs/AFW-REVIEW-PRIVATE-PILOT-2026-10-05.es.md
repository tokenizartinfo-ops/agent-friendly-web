# Ensayo privado de revisión — 5 de octubre de 2026

## Identidades y límites

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=QA sintética. Cuenta85d0d5dadac3341a564f22ce885e9eec; Worker agent-friendly-web-operations-review; D1QA d43b321d-a5e1-4e1a-9fe2-c63bcb0e9f46; zona4b1a3fe4b6dcb81e9d6a633174c5939f; origen operations-review.agentfriendlyweb.dev. Access propio f3db3135-0f6f-4910-9b72-e592f0fd6389, sesión10m. Producción web, D1operativa, receptor, otros Access y clientes excluidos.

Fuente integrada PR264/0873049b/main880586859; CI37351687647 correcto,895 pruebas. Deploy nuevo inicialmente cerrado d3bdce81-c3a5-4c55-bce0-6a6e2cd72434. Cuatro campos de configuración privada custodiados como bindings secret_text en Cloudflare, obtenidos de las aplicaciones propias/equipo verificados sin devolver valores al chat/Git/logs. No token de servicio creado ni subject supuesto desde correo.

ALLOWED_ACTION de este ensayo: vincular únicamente el origen nuevo al Worker QA cerrado bajo Accessdeny; limitar temporalmente Access al operador aprobado tokenizart.info@gmail.com; abrir solo /identity por diez minutos con los dos flags de decisiones false. La ruta no lee/escribe D1 ni concede un permiso. Recuperar solo operatorId opaco de JWT propio firmado, cerrar comprobación de identidad y fijar referencia por servidor. Ensayo de decisiones posterior requiere otra ventana explícita, datos sintéticos y las verificaciones del plan de aceptación. No ampliar permisos a otros usuarios.

ROLLBACK: cerrar flags de identity/review/reviews y quitar deadline; restaurar policy deny/everyone sin excepción, conservar D1/historia y versiones. Si se requiere retirar la ruta, desprender solo el nuevo Worker Domain por ID verificado, nunca un dominio/política ajenos. Conservar secretos de configuración o retirarlos individualmente bajo inventario; no devolver valores. Verificar versión/bindings y denegación posterior, sin asumir efecto instantáneo de Access sobre JWT aún vigente.

## Registro de resultados

Pendiente comprobar origen protegido, ventana de identidad y sesión humana. Preparación e integración no prueban todavía esos resultados ni una revisión privada real.

Preparación remota observada: Worker Domain 0d33aa85eb79d959a6fc8f768cff24dce46240da vinculado al Worker QA, tras comprobar Access y ambos flags de decisiones cerrados. GET anónimo a /identity devuelve 302 al ingreso Access. D1 contiene solo fixture sintética y cero revisiones; foreign_key_check vacío y ambos triggers de inmutabilidad presentes.

Ventana inicial con fecha de siete decimales y offset no cumplía el contrato estricto de operationsWindowOpen: permanecía cerrada. Se corrigió únicamente la configuración efímera a ISO canónica, sin relajar la validación. Versión desplegada 66655fa3-386a-4599-b8c4-d1dabba2ad7b, identity=true, review=false, reviews=false, plazo 2026-10-05T18:12:49.277Z. La configuración cerrada de rollback permanece en .wrangler/review-qa-protected-closed.jsonc (archivo ignorado, mismo origen y QA).

Access durante el ensayo: deny/everyone con excepción del único operador y allow exacto del mismo correo; sesión 10m. La pestaña existente de Chrome mostró una petición anterior para otra identidad: se volvió al ingreso canónico y se solicitó una sola vez el código para el operador previsto. Pantalla observada: Enter your code, destinatario tokenizart.info@gmail.com. Handoff marcado; pendiente ingreso humano. No inferir éxito del correo ni identidad validada desde esa pantalla.

Pendiente: obtener la referencia opaca solo después de Identidad comprobada; custodia del pin; ventana separada de revisión; actualizar únicamente la fecha de observación sintética; comprobar decisión, persistencia, reapertura, limitación y retiro; restaurar cierre y registrar evidencia real. No presentar el despliegue de identidad como aceptación de la pantalla de decisiones.

## Aceptación humana remota y cierre (18:04–18:10 UTC)

Página de identidad observada en Chrome: «Identidad comprobada». Se extrajo solo meta afw-operator-reference y se custodió AFW_OPERATIONS_REVIEW_OPERATOR_ID como secret_text; el pin raw SUBJECT no existía. No se obtuvo ni guardó JWT, cookie, correo firmado ni subject crudo.

La única actualización de fixture fue checked_at para representar una observación sintética reciente; condición paused, revisión 2, changed_at e historial anterior conservados. Ventana de decisiones separada: versión e43e93ee-1b8c-4fb7-b5b1-466f06788439, identity=false, review/reviews=true, vencimiento 2026-10-05T18:17:20.323Z.

Aceptado por navegación real con sesión Access: Mantener pendiente produjo recibo a 18:07:52.617 UTC. «Comprobar esta decisión» recuperó Pendiente de investigación desde el servidor. Archivar este aviso anterior produjo recibo a 18:08:09.177 UTC. La siguiente comprobación mostró «La decisión quedó registrada» / Aviso anterior archivado, sin botones de decisión. D1 confirmó exactamente dos filas CAS: sequence1/expected0 retain_block/investigation_required; sequence2/expected1 close_obsolete/producer_paused. Reserva original sigue superseded, count1; foreign_key_check vacío. No demuestra entrega, reparación ni datos de un cliente.

Prueba de consultas repetidas y retiro con sesión: Chrome devolvió ERR_BLOCKED_BY_CLIENT; CDP observó Network.loadingFailed blockedReason=inspector, sin código HTTP de documento. No acreditar 429, CSRF remoto ni denegación HTTP con JWT vigente a partir de ese bloqueo. No debilitar extensión/seguridad para evitarlo. Esas tres aceptaciones siguen pendientes; contratos automatizados ya pasan, pero no sustituyen la evidencia remota.

Restauración explícita completada: versión 390c3ecf-127d-419e-971e-131d9e784ad3, los tres flags false, sin deadline. GET settings verificó esos bindings y solamente D1 QA d43b321d-a5e1-4e1a-9fe2-c63bcb0e9f46. Policy propia volvió a deny/everyone, exclude vacío, precedence1. Historia y pin opaco custodiado conservados; ninguna credencial de recepción creada/extendida. Acceso cerrado por configuración comprobada; revocación con JWT vigente no acreditada aún.

Próximo bloque: repetir únicamente HTTP 429/CSRF/retiro en un navegador controlable, bajo otra ventana breve y la misma identidad/origen/QA; conservar las dos constancias inmutables y usar otro fixture explícito si se requiere una nueva decisión. No repetir inscripción, PC apagada, cron ni éxito de persistencia; no promover este ensayo a clientes hasta cerrar esas aceptaciones.
