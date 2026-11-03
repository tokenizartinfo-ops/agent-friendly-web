# Controlador de activación pública e62

Fuente del paquete `e62cd321f38e07926659c52a59a220a4e0ea865e`, artefacto 13240978655, digest `5e664841173f3193e902ee4562815f622c27ecceb6d8e38fa44e33207bcd4693`. La carga inactiva real única en Actions 41669272094 recibió la candidata `ad126c2c-d049-4083-9f41-b9879ee3fdd9`, tag `e62cd321-r41669272094-a1`. El recibo informa baseline `0fd30778-70ce-406f-8757-69bb29a21c09`, deployment `37fe1838-b871-4b98-818c-990d61667dbb` y configuración preservada. La carga no promovió tráfico.

El controlador de fuente fija esos identificadores, admite una primera etapa 0 % y, solo tras su aceptación y reserva suficiente, una promoción. Ante fallo después de promover, permite una reversión propia a 0fd bajo el plazo original y una sola tentativa. No adopta etapas anteriores. Lee de nuevo la configuración antes de cada escritura y no usa como autorización la aceptación de un ACK. El API no ofrece un CAS global entre lectura y POST; una actividad concurrente posterior a la última lectura sigue siendo una limitación.

El observador fija la versión candidata para la etapa 0 %, comprueba los recursos de protocolo y las superficies existentes, los hashes del paquete, el JSON del caso, la cronología y la FAQ AI Index en ES/EN/PT. La prueba PR ejecuta el ZIP exacto en un runtime local efímero de GitHub y comprueba caso y FAQ. Esa prueba y la fuente aprobada no acreditan tráfico público.

El workflow es manual con `verify_only` por defecto. La activación requiere un dispatch nuevo de main, credencial vigente y las comprobaciones existentes de estado/propiedad/recuperación. La fuente aquí preparada no ejecuta una promoción, ni acredita indexación por Cloudflare, operación privada o PC-off.
