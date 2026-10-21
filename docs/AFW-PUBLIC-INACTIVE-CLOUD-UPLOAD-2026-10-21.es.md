# Carga pública inactiva desde GitHub

## Alcance y autorización

21oct2026. El owner autorizó continuar los bloques autónomos y reducir al mínimo el uso del ordenador. Este bloque extiende la entrega pública existente: prueba el ZIP exacto y prepara una carga inactiva desde un runner efímero. No es una guardia cloud, una activación de Max ni un arreglo de Container/OTP.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT public_web; ORIGIN https://agentfriendlyweb.dev; RESOURCE_TYPE Worker version; RESOURCE_ID agent-friendly-web-web-production. ALLOWED_ACTION una carga inactiva del paquete8057ee37 tras dispatch explícito y estado vigente coincidente; nunca promoción, rutas, Access, DNS, cron, D1 o migraciones. ROLLBACK mantener el despliegue actual4a7a9452/8fc686dd y versión9d4b1396 disponibles. Ante cambio concurrente no restaurar configuración histórica automáticamente: detener y revisar el estado real.

## Diseño del bloque

Alternativas: transferir localmente repite el problema del owner; conectar main a Builds puede promover una rama integral/configuración distinta; se elige extender el calificador de paquete congelado con un wrapper y un workflow manual. El módulo Python usa el calificador existente, valida todos los hashes antes de extraer en RUNNER_TEMP y rechaza colisiones ancestro archivo/directorio. La prueba real usa Wrangler4.128.0 ya fijado por package-lock, no_bundle, keep_vars y configuración explícita sin vars/pin privado, rutas, build hooks ni comandos de promoción.

Workflow `afw-public-inactive-upload.yml`: por defecto `verify_only`. PR de la misma repo ejecuta pruebas, calificación y dry-run sin credencial Cloudflare; no carga nada remoto. `upload_inactive` es otra decisión explícita, solo workflow_dispatch de main, primer intento y environment `afw-public-release`. Esa separación respeta que el contrato de entrega permite únicamente leer/preparar; la autorización de la carga procede del dispatch acotado, no de ese contrato.

## Ventana, versión y configuración

El origen de la ventana de carga es created_at del run primario GitHub, con diez minutos sin renovación. Debe coincidir repo/head_repository, SHA verificado del checkout, main, workflow, run e intento1. Reejecutar un intento no renueva autoridad ni reintenta un ACK desconocido. Concurrency evita dos ejecuciones de este workflow en paralelo; no bloquea operadores externos. Antes de usarlo coordinar ausencia de otra operación sobre el mismo Worker.

Se releen versión base, settings globales, despliegue y subdominio. Deben coincidir los fingerprints del contrato y los diez bindings exactos: seis variables existentes, AI, ASSETS, limiter5/60 y D1original. Sin secret_text o binding extra. Workers.dev y previews deben estar deshabilitados. Un drift detiene antes de la carga; no heredar LATEST ni forzar. El pin privado solo se compara mediante hash en memoria y no entra a config, logs o recibos.

Wrangler se invoca una sola vez como versions upload. Timeout/salida desconocida exige inspección, no otra carga automática. El readback comprueba que la candidata tiene tag único por run/intento, bindings/runtime esperados y sigue ausente del deployment; configuración global y activo conservados. La lectura de cierre puede ocurrir después de la ventana y no autoriza más mutaciones. Las lecturas y escritura de Cloudflare no son una transacción CAS global: ante concurrencia/drift se falla cerrado y no se hace rollback ciego.

## Custodia pendiente y límites de red

El modo de carga necesita un secreto de environment `AFW_PUBLIC_UPLOAD_TOKEN` aportado por canal privado autorizado. No se crea ni se solicita su valor en chat; no se exporta OAuth local ni se amplía el token canary. Antes de configurarlo comprobar la granularidad que Cloudflare admite y aprobar únicamente el acceso necesario; si no permite el límite pretendido, revisar el alcance antes de concederlo. La presencia del nombre de secreto en YAML no prueba que exista o esté habilitado.

Solo el proceso Wrangler recibe esa credencial; sus stdout/stderr se drenan con selector y límite conjunto2MiB antes de acumular; stderr se descarta. Plazo monotónico absoluto y grupo de procesos propio: se termina el grupo completo en timeout, exceso de salida o cierre, incluidos los shims. Nunca serializar excepciones. La API de control usa únicamente GET a rutas fijas del Worker en api.cloudflare.com, sin proxies ni redirecciones, máximo1MiB por respuesta y timeout de socket de hasta10s. Ese timeout no es un plazo absoluto de todo el cuerpo: una respuesta lenta puede demorar el recibo. La ventana original se comprueba otra vez antes de la carga y el job tiene un límite total; la demora no renueva autoridad. El token GitHub se usa separadamente en las lecturas de procedencia/identidad, sin reenviarse a redirecciones. No hay HTTP saliente genérico, bootstrap de permisos ni callbacks.

Los únicos artefactos nuevos del workflow son recibos saneados (siete días), sin config privada, claves ni salidaCLI. El ZIP, las dependencias y la extracción solo viven en el runner. Se conservan vigencia original del artefacto28oct22:16:22UTC y límites del calificador. No rebuild de la app ni ejecución de su runtime. dry-run y presencia de credencial no prueban upload real.

## Pruebas y gates de aceptación

Primero10pruebas RED: run39690430846/job119535008829, todas fallan por helper ausente; carga omitida. Cubren estado/pin/configuración, drift, binding secreto/extra, dispatch original/expiry/fork/branch/retry, ausencia de credencial antes de red, ACK desconocido sin retry, una sola carga y readback, comando sin deploy/force y extracción/hash/colisión. Después deben pasar esas pruebas, las16del calificador, dry-run real del ZIP congelado, CI y revisión independiente. Evidencia GREEN se registra en #497.

No se configura el secreto ni se despacha carga real durante esta preparación. La primera aceptación remota será una tarea separada y finita tras la custodia, con estado/rollback frescos, presupuesto y coordinación. Luego insertar candidata a0%, probar GET/Access/assets y promover por separado mediante el canal autorizado. Este helper no hace esos pasos ni declara listo un piloto.

Fuentes oficiales: [GitHub Actions de Cloudflare](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/), [versiones y despliegues](https://developers.cloudflare.com/workers/versions-and-deployments/), [version overrides](https://developers.cloudflare.com/workers/versions-and-deployments/version-overrides/). ProWebsite/Artifacts no suministran automáticamente esta identidad ni resuelven Container. operationalReadiness=false;PCoff=false.

## Revisión del proceso de herramienta
La revisión inicial identificó1Important: límite de salida poshoc y timeout solo del proceso directo. RED40adf84d/run39691156467/job119537383360:10PASS/3ERROR por contrato deadline ausente. Corrección: plazo absoluto, pipes no bloqueantes con límite antes de acumular y killpg del grupo propio, con prueba real de descendiente y límite de salida. Se aclara el Minor de timeout de socket HTTP; no se promete10s absolutos para el cuerpo. El resultado GREEN/revisión delta se enlaza en #497; no hubo carga real.
