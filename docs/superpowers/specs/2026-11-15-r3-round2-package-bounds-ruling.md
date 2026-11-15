# AFW — límites de paquete DATA, corrección ronda 2

Decisión Root: 2026-11-15 08:27:13 UTC. Responde al draft GitDB sin ref `2b3f2ef223fc0109a6dff27125a94dc29c27b2e8`.

Se autoriza únicamente ampliar los topes de transporte del paquete: gzip máximo **98.304 bytes** y base64 máximo **131.072 caracteres**, relación exacta 4/3. El draft declara gzip 79.689 y base64 106.252. La ampliación conserva la fuente y evita truncar historia, helpers o pruebas. No es una aprobación de corrección, candidata, ejecución ni runtime.

Se mantienen los límites vigentes: raw 400.000 bytes, helper 32.768, SAME 1.800.000, stdout 8.192, stderr 4.096, muestra 4.096, Source site 16.384, contexto 2.048 e informe 24.576. Los tiempos no cambian: harness 90 s, admisión mínima 20 s, captura Python 3,5/100 s, supervisor Node 4/110 s, techos 5/120 s y case launcher 5 s.

Mediciones del implementador, aún por verificar independientemente sobre el paquete final: raw 397.111; 33 helpers / 268.891; máximo helper 28.592. Margen raw estrecho: cualquier exceso posterior necesita medición y decisión previa; no se permite ocultarlo o recortar cobertura.

L01 añade 17,5 s obligatorios de bloqueo al conjunto de 100 casos por cinco grupos. El tiempo total todavía no fue medido ejecutando Source. Si no cabe, debe registrarse como incompleto; no ampliar el reloj ni reducir la matriz por inferencia.

El uso de FD7/pidfd/EOF indicado para los probes debe explicarse en la revisión final de DATA: distinguir el observador de laboratorio de la cadena de transporte ya autorizada. Esta decisión de límites no aprueba capacidades nuevas de selección de procesos ni comandos.

Source permanece cerrado en `1fe20347bd9c86d9343799a5994f9f3e3a4a339f`. No ejecutar Source localmente, crear refs o lanzar Actions por esta decisión. No permisos nuevos ni operaciones de Cloudflare.
