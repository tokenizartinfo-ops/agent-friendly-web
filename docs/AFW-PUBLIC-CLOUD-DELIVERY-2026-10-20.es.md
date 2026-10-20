# Entrega pública comprobada en GitHub

## Propósito y decisión
Continuar desde el paquete público que aprobó la QA de interfaz, sin reconstruirlo ni trasladar compilaciones a la computadora del owner. Se extiende la cadena existente de artefactos con una comprobación de entrega de solo lectura. No se crea un publicador, credencial ni permiso.

Alternativas evaluadas: volver a compilar localmente perdería el vínculo con la QA y consume recursos del owner; reutilizar el publicador canary ampliaría su alcance; el paso elegido descarga y valida el paquete congelado en un runner efímero con permisos GitHub contents/actions read. La publicación conserva un gate independiente.

## Contrato
`config/public-cloud-delivery.v1.json` fija repositorio, fuente pública61e03107, árbol92fa0213, merge público d2c05337, ejecución39488908864/intento1, artefacto12295001318, tamaño2760196, SHA2567b87b58463dc91707ceb4052b3878048b7613c05a641e1b9238796279318ab70 y vencimiento27oct20:06:08UTC. No acepta IDs suministrados al despachar.

El inventario337archivos/5473671bytes proviene del artefacto nativo12295056186 y coincide con la misma QA6casos/18estados. No es el rebuild del merge ni todo main. Se conserva la entrada `server/index.js` y archivos ocultos. El nuevo paso comprueba bytes reales, CRC, hashes por archivo, lista completa, nombres seguros, tipos regulares, límites y procedencia/expiry; no extrae ni ejecuta la aplicación.

## Autenticación y límites
Solo el primer GET a la API GitHub recibe el token efímero del job. Las redirecciones permitidas HTTPS de descarga reciben cero credenciales; sin proxies ni redirecciones genéricas. JSON<=1MiB, ZIP<=16MiB, archivos<=1024/16MiB individuales/64MiB total, plazo por descarga45s y job5min. No instala dependencias, navegador, contenedor ni modelo. Nunca imprime URLs firmadas, cabeceras o excepciones de transporte.

La salida incluye el ZIP original, contrato, inventario y recibo saneado. El almacenamiento nuevo no extiende el vencimiento de la autorización documental del paquete original: al vencer se reconstruye/recalifica en cloud; no se renuevan permisos por inferencia. No hay cron, seguimiento ni guardia permanente.

## Configuración y reversión
GET20oct20:26:44UTC comprobó la versión pública d19c3d49/deployment88e25a5c a100%, diez bindings y coincidencia entre versión/configuración efectiva. Flags propios, D1 y rate5/60 preservados; sin secret_text. La versión anterior d8982d37 sigue disponible según GET20:23UTC. Solo se guardan huellas de configuración; no valores del pin privado ni credenciales.

Estas lecturas son históricas: el recibo NO contiene configuración utilizable para publicar y `publicationReady=false`. Antes de subir una candidata se deben releer y preservar configuración efectiva/versión/rollback, usar canal privado autorizado, verificar candidata sin tráfico normal y posteriormente la versión en tráfico normal. No ejecutar wranglerdefault ni desplegar main.

El workflow canary existente no es un publicador público. El20oct se consultaron los nombres de secretos/entornos GitHub: vacíos. cfCLI estaba sin autenticación en la lectura previa. Un GET de transferencia de artefacto desde el sandbox CF devolvió403: causa no acreditada/no repetir ni inferir fallo de la cuenta. El rechazo de egress al dominio AFW observado antes es independiente; no prueba fallo del sitio. Este bloque no fuerza un puente de credenciales.

## Validación y cierre
Pruebas negativas primero: commit0757dfcf, ejecución39492246139/job118868145102,14fallos esperados por comprobador ausente; descarga y subida de recibo omitidas. Después se implementa el comprobador y se contrasta contra el ZIP real en GitHub. La evidencia GREEN, revisión y merge se enlazan en #497.

G2/OAuth ya aceptado no se repite. CF02382110 y G3–G6, alta→aviso→revisión útil→baja nativa, PC-off y Max siguen separados. `operationalReadiness=false`. No mail ni sesión de clientes.
