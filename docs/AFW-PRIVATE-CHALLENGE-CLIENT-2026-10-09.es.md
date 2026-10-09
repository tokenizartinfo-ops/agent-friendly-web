# Consumidor acotado de la prueba privada

El consumidor propio utiliza el transporte existente de AFW y únicamente POST `/assistance/custody/confirm` en `operations-manager.agentfriendlyweb.dev`. Solicita un nonce y lo confirma: como máximo dos solicitudes, sin reintentos. El nonce permanece en memoria y no se imprime ni se escribe en archivos. Una respuesta perdida consume el intento local; requiere reconciliación administrativa y no justifica otra ejecución.

El plan admite solamente recordRef, startAt y deadline. La ventana máxima es diez minutos. El cliente comprueba el reloj antes y después de cada espera, rechaza regresiones y valida los campos exactos de ambas respuestas. La referencia del recibo debe corresponder al SHA-256 del nonce y al mismo registro, emisión y vencimiento. Devuelve únicamente el comprobante confirmado; ese comprobante no autoriza reservar recursos, instalar ni publicar.

La entrada `node scripts/afw-private-challenge-client.mjs confirm <recordRef> <startAt> <deadline>` utiliza tiempos Unix en milisegundos y la custodia ya configurada del transporte. Los argumentos no contienen credenciales. No ejecutarla hasta comprobar preregistro, identidad, ruta protegida y ventana propios. Cada proceso nuevo es un cliente nuevo: el límite definitivo de dos intentos totales reside en el Durable Object y no se reinicia por esta CLI.

## Verificación local

El cliente y la CLI fueron probados contra el Worker y Durable Object reales bajo workerd, con SQLite, preregistro y firma RS256 sintética. La frontera externa de certificados y Access es sintética. Se comprobó correspondencia con el recibo primario y rechazo de una tercera solicitud. Las pruebas unitarias cubren correlación criptográfica, vencimiento, reloj regresivo, redirección, datos inesperados y ACK perdido. Revisión independiente sin hallazgos P1/P2; suite completa 1393 aprobadas, cero fallos, dos omisiones; lint sin errores y compilación aprobada.

## Estado y siguiente gate

Esta aceptación es local. La versión remota cerrada 7ae36679-b855-4a6e-b6df-fbf4daec9bf2 conserva flags deshabilitados, pins e identidad vacíos y cron vacío. La tarea cloud ordinaria 01a120f4 conserva la fuente publicada 0c559bc88a354e3810b848eccafe4a2adb1404c3; integrar esta fuente en Git no acredita adopción cloud.

Sigue publicar la fuente y verificar su adopción, preparar el intercambio propio dentro de una ventana finita, correlacionarlo con la historia primaria y comprobar reserva e instalación con cierre independiente. Después corresponde una única ocurrencia programada y el ensayo con ordenador apagado. No se acredita aún guardia permanente ni preparación para invitar a Max.
