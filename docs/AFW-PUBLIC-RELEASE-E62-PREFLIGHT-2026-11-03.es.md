# Preparación de la publicación pública AFW — 3 de noviembre de 2026

Este registro prepara una publicación de la guía AI Index y el caso Tokenizart. El estado es **preparación**, sin carga, promoción ni cambio de tráfico.

## Proyecto y alcance

- Proyecto AFW, repositorio tokenizartinfo-ops/agent-friendly-web, origen https://agentfriendlyweb.dev.
- Worker de producción `agent-friendly-web-web-production`, cuenta Cloudflare 85d0d5dadac3341a564f22ce885e9eec.
- Fuente candidata `e62cd321f38e07926659c52a59a220a4e0ea865e`, árbol `9810e6df5b3b6e53b8befddcaf45abdf042b6422`. Integra PR714 y PR713.
- Solo preparar una futura carga inactiva y una posterior aceptación con la versión efectivamente recibida. La reversión propuesta es la versión que se confirme como vigente antes del cambio; su legibilidad, bytes y configuración requieren comprobación primaria.

## Paquete disponible

CI main [41658579964](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41658579964), intento 1, concluyó correctamente test, lint y build. El artefacto `afw-build-e62cd321f38e07926659c52a59a220a4e0ea865e`, ID 13240978655, contiene 3.054.694 bytes ZIP; digest GitHub SHA-256 `5e664841173f3193e902ee4562815f622c27ecceb6d8e38fa44e33207bcd4693`, creado 2026-11-03 15:05:32 UTC, vence 2026-11-10 15:05:31 UTC.

El calificador existente `scripts/prepare-public-cloud-delivery.py` exige que el run origen tenga evento `pull_request`. El artefacto e62 procede de un `push` en main, por lo que ese calificador lo rechazará. Crear una verificación específica que exija explícitamente el evento push, la rama main, revisión e62 y run exitoso, o demostrar que un artefacto de PR tiene exactamente el árbol final antes de reutilizarlo. No cambiar el evento esperado por suposición.

Estos metadatos identifican el ZIP, no certifican su inventario ni el módulo desplegado. Calificar descarga, hash, tamaño, entradas, contenido, rutas y hashes pertinentes en un runner cloud antes de usarlo. Verificar revisión, árbol y vigencia sin reconstruir ni sustituir el paquete.

## Última evidencia primaria aportada por la operación AFW

Lectura del Worker público a las 2026-11-03 15:10:19.442 UTC: deployment `37fe1838-b871-4b98-818c-990d61667dbb`, versión `0fd30778-70ce-406f-8757-69bb29a21c09` al 100 % y `73a52556-46d3-49e9-a09b-c195a9515ce6` al 0 %. Una lectura de versiones elegibles a las 15:10:26.977 UTC incluyó la versión activa `0fd30778`.

Estas lecturas identifican tráfico y elegibilidad en esos instantes. No demuestran configuración completa, contenido recuperable, custodia ni estado futuro. Antes de cargar, releer deployment, versión activa, bindings, settings, runtime, subdominio y recuperación, sin imprimir secretos. Conservar la instantánea saneada y definir qué cambia si aparece deriva.

## Flujo disponible y trabajo pendiente

Los workflows establecidos `.github/workflows/afw-public-journey-inactive-upload.yml` y `.github/workflows/afw-public-journey-activation.yml` comparten exclusión, verifican paquetes y registran una única operación. El primero acepta `verify_only` o `upload_inactive`; el segundo acepta `verify_only` o `activate`. Ambos están fijados al paquete anterior `cace1d9c` y la activación a `0fd30778`, por lo que **no seleccionan e62 ni sirven para publicar esta candidata**. No despacharlos con intención de publicar e62.

Preparar un perfil específico para el artefacto e62 con inventario y observador de sus superficies reales, además de un controlador de carga inactiva que compare la primaria fresca. Después de un recibo de carga inequívoco, preparar una activación fijada al ID realmente recibido, con verificación de etapa 0 %, tráfico normal, propagación y recuperación. Un resultado incierto exige inspección antes de decidir; no repetir un POST por ausencia de respuesta.

El secreto `AFW_PUBLIC_UPLOAD_TOKEN` del entorno `afw-public-release` no fue leído ni probado aquí. Su última autorización conocida de siete días terminaba el 30 de octubre en Argentina. Confirmar vigencia y alcance efectivo antes de una operación remota; no deducirlos de la existencia del secreto en GitHub. Comprobar que la versión activa actual sea recuperable y preservar cambios legítimos posteriores antes de promover.

La futura observación debe cubrir por lo menos la portada y guía públicas, el caso Tokenizart, el JSON fechado, la FAQ de AI Index en ES/EN/PT y las fronteras privadas anónimas. Registrar origen, fecha, versión y contenido esperado. No inferir aceptación de AI Index ni funcionamiento privado desde la publicación pública.

## Calificación de solo lectura en GitHub

Run [41662447007](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41662447007), job 126008890141, intento 1, ejecutó el calificador de esta rama `50c4f27239a8b5af33daabdc52d8deb9d35d7385`. Comprobó 20 pruebas existentes del archivo, dos nuevas de procedencia y límites, y 27 pruebas de caso, FAQ y guía, todas aprobadas.

El runner validó el evento push/main, revisión y árbol e62, run exitoso, plazo y digest del ZIP. Recorrió en memoria 339 archivos y 5.810.921 bytes descomprimidos, rechazando rutas inseguras, enlaces, colisiones, compresión y tamaños fuera de límites. El JSON del caso coincidió por bytes con la fuente fijada. Encontró en los archivos compilados marcadores de cronología y textos de la guía en ES/EN/PT. El inventario deriva del ZIP fijado por digest, no de un inventario independiente previo.

Recibo e inventario saneados en artifact 13242836747, digest GitHub SHA-256 `1b049220e1d5404836b16377291281ae5e0b380b9c4c71abeecc8560aacd77d4`, vence 2026-11-10 15:18:18 UTC. El ZIP principal conserva su vencimiento original. No se extrajo ni ejecutó el paquete; los marcadores no prueban el renderizado de la candidata ni su publicación.

La lectura primaria adicional aportada por operación a las 15:15:30.286 UTC mostró diez nombres/tipos de bindings conocidos, flags de compatibilidad y subdominio y previews deshabilitados. Es un dato fechado, no verificación del secreto ni de recuperación. Releer y comparar las huellas completas en el perfil específico antes de cualquier carga.
