# AFW: trabajo cloud sin transferencias al ordenador

Fecha de decisión: 21 octubre 2026. Alcance AFW únicamente. El owner pide continuar en GitHub/Cloudflare y evitar temporales locales que después no pueden retirarse. Este bloque actualiza el contrato de entrega ya existente; no instala un publicador ni modifica el Worker.

## Circuito vigente y cambio acotado

GitHub conserva fuente, PR, revisión y CI. La QA pública produjo el paquete exacto `8057ee37f5b0cf02e5e14ab07b98145e07f977d0`, artefacto12385851354, run39685119496/intento1. La publicación8fc686dd ya fue aceptada y su recibo es [6328010783](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6328010783). No se repite su upload ni aceptación privada.

Se actualiza `config/public-cloud-delivery.v1.json` y el inventario de solo archivos públicos para que el calificador existente descargue y verifique ese ZIP exclusivamente en un runner efímero. La ruta fija del inventario y el filtro del workflow se ajustan a la evidencia del21oct. No se añade entrada libre al dispatch, extracción, ejecución de la aplicación, rebuild ni credencial. Se mantienen los límites, hashes, procedencia, plazo y rechazo de expiración. La evidencia del20oct y la recuperación anterior permanecen en Git/historia.

Resultado verificable: 16 pruebas de rechazo/procedencia y calificación real en Actions, seguida de un artefacto de entrega con recibo e inventario. Sus IDs y resultados se registran en #497 después de ejecutar. `publicationReady=false` y `operationalReadiness=false` se conservan aunque todo pase. El vencimiento original28oct22:16:22UTC no se renueva al copiar el ZIP.

Las próximas ediciones, revisiones y recibos de este bloque se guardan directamente en GitHub. No se descarga ZIP nuevo, no se hace checkout/build/npm local y no se intenta otra limpieza de temporales rechazados.

## Qué falta para publicar íntegramente desde cloud

Lecturas21oct22:36–22:38UTC: secretos de repositorio GitHub=0 y entornos=0; triggers de Workers Builds para el Worker público exacto=0. La autenticación local OAuth de Wrangler no se exporta ni reutiliza como secreto de CI. El token/publicador canary conserva su propio alcance y no se amplía para publicar la web.

La opción preferida para el siguiente bloque es una identidad dedicada al Worker público y un job manual de GitHub con revisión/protección, limitado a cargar una versión inactiva desde el ZIP ya calificado. Debe cotejar configuración efectiva y reversión antes y después; promover100% es una acción separada tras comprobar candidata. No conectar automáticamente main al deploy: el main integral no es la rama pública mínima y la configuración default difiere del runtime efectivo.

Alternativa: Workers Builds enlazado a la fuente pública, con comando/configuración explícitos y carga de versión sin promoción. Un build desde fuente no es el mismo ZIP ya probado: requiere sus propias pruebas, inventario y aceptación. La integración nueva no debe promover al conectar, abrir workers.dev/previews privados, extender permisos del canary ni sustituir silenciosamente bindings/D1/pin propio.

La [guía oficial de GitHub Actions](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/) requiere token API para CI no interactivo. La [configuración de Builds](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) permite token dedicado; su creación automática puede abarcar más recursos de los necesarios. Antes de habilitar cualquiera de las dos opciones, preparar y verificar permisos mínimos, custodia privada y rollback. No crear secretos, tokens, suscripciones o integraciones desde este bloque. La autorización general del proyecto no permite extraer credenciales del navegador ni leer su valor.

## Cloudflare Artifacts: herramienta propuesta por el owner

Identificada en fuentes primarias como almacenamiento versionado compatible con Git, [beta abierta desde1oct2026](https://developers.cloudflare.com/changelog/post/2026-10-01-artifacts-open-beta/). Permite repositorios, forks, archivos/commits y acceso desde Workers, REST o clientes Git; la computación se ejecuta en Workers Builds u otro runner. Así puede reducir clones locales si también usamos ejecución remota. No convierte por sí sola este chat en una guardia cloud.

Conviene distinguir:
- **GitHub Actions artifacts:** ZIP inmutable de una ejecución, digest y vencimiento; es lo que usa nuestra QA.
- **Cloudflare Artifacts:** repositorios/árboles versionados compatibles con Git; no sustituye automáticamente nuestros checks, revisión o procedencia.

No hay namespace AFW observado en la lista autorizada21oct22:39:55UTC; GET200 no prueba que una nueva operación de escritura esté habilitada ni que exista presupuesto. No se inspeccionaron repositorios de otros proyectos ni se creó namespace.

Aplicación futura que vale evaluar: una cápsula o trabajo de agente por repositorio aislado, base de solo lectura, diff/versiones y permiso limitado por cliente/caso. GitHub seguiría como origen canónico del producto hasta una decisión expresa de migración. Cada cápsula necesita consentimiento, propiedad, clasificación de datos, retención/borrado real, cuotas y verificación de entrega; no volcar expedientes privados o el Brain por inferencia.

Para AFW ahora, incorporar Artifacts solo para repetir el almacenamiento que GitHub ya proporciona añadiría otra fuente sin resolver el canal de publicación. La opción elegida es aprovechar primero el circuito cloud existente y guardar esta evaluación para un piloto de cápsula sintética con beneficio medible. No se creó tal piloto ni un repositorio nuevo.

## Costos y límites contrastados

Según [pricing oficial](https://developers.cloudflare.com/artifacts/platform/pricing/), Artifacts requiere **Workers Paid**, separado de ProWebsite; el cobro comenzó14oct2026. Incluye10.000operaciones/mes y1GB; adicionales USD0,15/1.000operaciones y USD0,50/GB-mes. Los repositorios permanecen almacenados hasta borrarlos explícitamente. No asumir limpieza automática o costo cero por ser beta.

Los [límites vigentes21oct](https://developers.cloudflare.com/artifacts/platform/limits/) fijan1GB por repositorio creado desde29sept2026. La [CI personalizada de Artifacts](https://developers.cloudflare.com/artifacts/guides/build-and-deploy-on-push/) utiliza Workflow, R2 y bindings Container/DurableObject para sus runners; esa vía añade dependencias y no es una solución demostrada a nuestro incidente Container. La integración estándar Workers Builds es una opción distinta.

No se contrató ni activó ningún servicio, cobro, evento, trigger o acceso. Costos y elegibilidad reales de esta cuenta deben comprobarse antes de adoptar. Pro del dominio, Workers Paid, Artifacts y sus cuotas no son intercambiables.

## Límites y reversión

Rollback de este cambio: revertir solo el contrato, la ruta fija, el nuevo inventario y el filtro del workflow; no hay mutación remota que revertir. No borrar el ZIP público anterior ni su recuperación. Si falla procedencia/hash/expiry o GitHub no responde, detener calificación con el error saneado existente; no renovar, reconstruir localmente ni pedir claves.

Cloudflare02389649/OTP y02382110/Container conservan sus gates. Ningún paso aquí pide OTP, OAuth, nueva ventana, cron, consumidor, Containers, datos/correo de Max o apagado del equipo. Desarrollo y calificación cloud no acreditan suscripción, revisión útil, baja nativa, guardia permanente o PC-off.
