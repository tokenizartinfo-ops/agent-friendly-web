# AFW: custodia gestionada publicada y límite de readiness

5octubre2026. Token propio AFW Operations Managed20261005, ID1bf43326-9ad1-491a-8f04-ba92d777d724, versión2, vence2026-11-04T22:09:32Z. Owner cargó SECRET e ID exclusivamente en formulario privado, guardó y publicó; UI confirmó Entorno publicado. API: tokendisabled y ningún selector de esta identidad en la policy del manager. La clave anterior de versión1 se invalidó con previous_client_secret_expires_at2026-10-05T20:00:00Z, sin ampliar duración. Sin valores/clipboard/cookies/JWT en registros.

Metadata de custodia: turno01a10e2c-a107-765c-96cf-5e71a143c448, chat01a10e21-3324-7343-a1fe-607a18f03035; cuatro bindings guardados y destinos previstos mail-consumer-canary.agentfriendlyweb.dev/operations-manager.agentfriendlyweb.dev. Publicación observada no prueba qué bytes guardó el owner ni autenticación efectiva.

Contexto nuevo de Editar: chat01a10e31-b63e-7693-9b1b-1c82f497e008. Preflight01a10e32-4159-7428-98ff-85f078a53c2c confirmó HEADa4d90d4/origin canónico/status limpio por stdout real independiente; sourcececfgver_6ac423b3521081a3a3f40cb4fc25bfc0, spec5, observations_currenttrue, enforced/ready al final. El turno posterior01a10e33-b331-7194-9a62-8af29606ed3c informó unknown para red y bindings y terminó antes de cualquier request. Root retiró inmediatamente el token temporalmente habilitado y restauró selector original vencido. No hubo handshake ni acceso a datos.

Diagnóstico01a10e34-8279-7489-80c9-07e7fe416bb0: único comando dateUTC exit0; running/spec7/currenttrue, red y bindings unknown antes/después. Diagnóstico01a10e35-85b3-74d8-b103-9eb643c68763: policy startupversion1/proxyconfigured/vpnfalse, filtrado de HTTP/hosts unknown; draft/status sí coinciden en destinos esperados. Spec9/currenttrue, mismos unknown y sin errorcodes. No inferir claves incorrectas ni enforcement del proxy desde esta metadata.

Estado final: tokendisabled, política original restaurada, managerclosed con D1operacional original. No nuevo ciclo, cuota, escritura, scheduler, renovación ni guardia. No pedir al owner que recopie secretos sin evidencia de autenticación fallida.

Próxima aceptación: tarea cloud ordinaria desde la publicación actual, separada del editor. Debe verificar statuscurrent/enforced/ready y origen/source antes de requests; handshake acotado y denegación con misma custodia tras retirar permiso. Si unknown, fallar cerrado y registrar, sin loops ni ampliar red.

Fuente oficial revisada: https://learn.chatgpt.com/docs/environments/cloud-environments . La publicación captura filesystem para nuevas tareas; las existentes mantienen su estado. Los network secrets se sustituyen por proxy en destinosHTTPS permitidos, no entregan la clave cruda a procesos. Estas reglas no demuestran la causa interna del unknown observado.
