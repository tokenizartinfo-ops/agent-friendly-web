# Primario y HTTP: aceptación conjunta local

Sobre el montaje cerrado de PR390, el ensayo workerd de bootstrap ahora conecta el Worker HTTP original con la implementación primaria real del mismo preregistro `own-qa`. No sustituye el lector de admisión por una constante ni por una devolución independiente de D1.

La política y su fingerprint se calculan antes de generar aprobación y baseline. La identidad RS256 y el JWKS son sintéticos y se verifican a través del transporte de autenticación existente. Provider, originales cloud, desafío y dispatcher son fixtures explícitas. Se utilizan SQLite/DO, Workflow, D1 y limitador nativos locales.

Tras los originales, reserva, instalación y consumo, pasan create, list, admit-claim, claim, admit-finish y finish. El journal alcanza secuencia seis. Un segundo ensayo aislado revoca D1 tras admit-finish: el mismo finish que devuelve 200 con permiso vigente devuelve 409 tras revocación, conserva secuencia cinco y no escribe una finalización; la historia y el alcance documental de cierre se conservan sin renovar autoridad ni recrear despacho. Las pruebas de concurrencia, pérdida de ACK, replay y retirada del primario siguen activas.

Esto prueba la composición local. El dispatcher sintético solo cuenta una llamada: no inicia Codex cloud. No acredita originales reales, custodia administrativa, publicación/adopción cloud, scheduler ni PC apagada. El runtime remoto permanece sin modificación.

Siguiente: fijar y verificar el canal alojado soportado, cerrar administración/recuperación y preparar montaje cerrado con rollback recuperable. La investigación oficial de canales está en el checkpoint local; un Workspace Agent publicado, una sesión Agents API y el chat cloud actual no comparten automáticamente identidad, permisos ni facturación. Max continúa condicionado a preview, aprobación y consentimiento.
