# Entrega asistida AFW: una checklist por lote

Alcance inicial: `/llms.txt` y `/llms-full.txt`. Sirve para coordinar cliente,
AFW y proveedor; no es una autorizacion ni un instalador automatico.
Los idiomas se resuelven dentro del paquete aprobado y sus enlaces, no mediante
una nueva entrega por idioma. Robots, sitemap, plugins y cambios de portada se
presupuestan y autorizan aparte cuando sean necesarios.

## Alcance del piloto admitido

Entrega asistida, un sitio y un lote por vez, con un unico escritor durante la
ventana acordada. La referencia tecnica es WordPress nativo; Playground con un
worker sirve de ensayo secuencial. Playground multiproceso no esta admitido:
mantiene una incidencia reproducible de HTTP 500 despues del borrado.
No hay instalador automatico ni garantia de equivalencia con cada hosting.

El cliente participa en tres momentos: confirma sitio y contenido, autoriza la
ventana de publicacion y recibe el resultado. AFW coordina los detalles tecnicos
con el proveedor autorizado; si falta recuperacion, se entrega el paquete preparado
y se informa el bloqueo, sin pedir intentos repetidos al cliente.

La unidad comercial es el lote, no cada idioma ni cada reintento. Registrar una
sola fila temporal por actividad: preparacion, coordinacion, publicacion,
verificacion o recuperacion. Separar minutos de trabajo de minutos de espera.
Una ampliacion de alcance o incidencia ajena se comunica antes de generar trabajo
adicional. No deducir precios de la duracion de los ensayos sinteticos.

## 1. Acordar sin complicar al cliente

- [ ] Confirmar dominio exacto y si el trabajo corresponde a la web o a un subdominio.
- [ ] Recibir lo que el cliente conozca, incluso por partes; AFW ordena la informacion
      y devuelve un resumen con los datos faltantes. No pedir claves por chat/audio.
- [ ] Preguntar si autoriza a AFW a contactar al proveedor; registrar destinatario,
      finalidad y datos que se pueden compartir. Ese permiso no autoriza escrituras.
- [ ] Identificar quien puede publicar y quien puede recuperar el sitio.
- [ ] Acordar alcance, precio, ventana de trabajo, aprobacion del owner y habilitacion
      del proveedor. Si expira una autorizacion, renovar solo la que falta.

Mensaje sugerido: "No necesitas conocer los detalles tecnicos. Envia lo que tengas;
te indicaremos lo que falta y, con tu permiso, coordinaremos con tu proveedor.
Te avisaremos antes de publicar y comprobaremos que el sitio siga funcionando."

## 2. Preparar una sola entrega

- [ ] Fijar ID del lote, version, responsable, origen y las dos rutas permitidas.
- [ ] Revisar contenido publico, enlaces y capacidades realmente disponibles.
- [ ] Empaquetar una vez; calcular SHA-256 sobre los bytes finales, sin cambiar
      saltos de linea o codificacion al subir. ZIP no equivale a publicacion.
- [ ] Leer el estado actual por HTTP y desde el origen autorizado. Registrar
      diferencias, redirecciones, HTML inesperado y cache antes de escribir.
- [ ] Conservar copia exacta de cada archivo existente fuera del directorio publico,
      con permisos restringidos, hashes y referencia de recuperacion. Ausencia previa
      se registra como ausencia, no como archivo vacio.
- [ ] Comprobar portada y acordar quien restaura si una prueba falla. No comenzar
      sin acceso de recuperacion utilizable durante la ventana.
- [ ] Confirmar que la copia puede abrirse y verificarse desde una sesion nueva;
      no depender de la memoria, pestana o proceso que realizo la publicacion.

## 3. Publicar y verificar el lote

- [ ] Releer hashes justo antes de escribir. Si difieren del estado acordado, parar
      y conciliar; no sobreescribir ni ampliar permisos para resolver el conflicto.
- [ ] Publicar solo las rutas autorizadas. Con dos escrituras secuenciales puede
      existir un estado parcial: registrar por archivo y detenerse ante un fallo.
- [ ] Si se pierde la respuesta, observar primero; no repetir la escritura a ciegas.
- [ ] Verificar GET anonimo, URL exacta sin redireccion, 200, text/plain, SHA-256,
      HEAD y portada. Si interviene CDN, contrastar origen y respuesta externa.
- [ ] Estado mixto o cache vieja: pendiente de verificacion, no entrega finalizada.
      Fijar proxima comprobacion acotada sin mantener una LLM esperando.

## 4. Restaurar cuando corresponda

- [ ] Confirmar que el archivo actual sigue siendo la version de este lote. Un
      cambio posterior obliga a revision humana: no restaurar encima de otro trabajo.
- [ ] Verificar todas las copias y los estados del lote antes de restaurar el primer
      archivo. Copia corrupta, archivo ausente inesperado o cambio ajeno: detenerse.
- [ ] Si existia antes, restaurar sus bytes guardados; no regenerar el texto ni borrar
      el archivo. Si no existia, retirar solo el archivo creado por el lote.
- [ ] Repetir verificacion HTTP y hash: anterior existente debe responder 200 con
      hash original; anterior ausente debe recuperar el comportamiento acordado.
- [ ] Revisar portada y registrar por separado cualquier archivo no recuperado.

## 5. Cerrar con evidencia, no con promesas

- [ ] Entregar un unico recibo con las filas de ambos documentos y sus enlaces.
- [ ] Registrar tiempo humano activo, espera del proveedor, ejecucion, intervenciones
      y consumo conocido. Valor desconocido es `null`, nunca cero estimado.
- [ ] Retirar permisos temporales segun el acuerdo y aplicar la retencion acordada
      a copias/recibos; no conservar accesos generales por comodidad.
- [ ] Separar disponibilidad HTTP de indexacion, respuesta de una LLM y puntuacion AF.
      No prometer visibilidad inmediata ni notas maximas por subir dos archivos.

### Recibo unico (plantilla, no evidencia de una entrega real)

Lote/version: pendiente. Origen: pendiente. Owner/proveedor/aprobaciones: pendiente.
Ventana y responsables: pendiente. Referencia privada de copia: pendiente.

| Ruta | Estado previo/hash | Hash aprobado | Estado actual/hash observado | Verificado UTC | Restauracion |
| --- | --- | --- | --- | --- | --- |
| /llms.txt | pendiente | pendiente | pendiente | pendiente | pendiente |
| /llms-full.txt | pendiente | pendiente | pendiente | pendiente | pendiente |

Estado del lote: preparado / autorizado / parcial / pendiente de verificacion /
verificado / restaurado / bloqueado. Portada antes/despues: pendiente.
Tiempo activo: null. Espera: null. Consumo atribuible: null. Intervenciones: null.
Incidencias, responsable y siguiente accion: pendiente. Sin secretos en el recibo.

## Limites y evidencia tecnica

La prueba nativa descartable cubre entrega asistida sobre WordPress con Apache.
No prueba un plugin, CDN, aprobaciones remotas ni concurrencia de escritores.
Comparar un hash y escribir despues NO es compare-and-swap atomico; requiere una
ventana coordinada sin escritores concurrentes. No hay atomicidad global del par.
Copias de prueba en memoria no prueban recuperacion durable del hosting: el cliente
necesita su copia persistente y recuperacion verificable antes de publicar.
Resultados y versiones: [ensayos del PR #50](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/50).
Revision consolidada y siguiente gate: [revision del piloto del 11 de septiembre](WORDPRESS-PILOT-REVIEW-2026-09-11.es.md).

## Ensayar sin un cliente ni accesos

En la rama del piloto, el siguiente comando reutiliza el generador de capsulas y
emite un unico recibo JSON con tiempos y hashes. Solo usa datos ficticios y disco
temporal; no recibe destinos ni credenciales y no publica en Internet.

```sh
node scripts/Rehearse-AssistedDelivery.mjs interrupted
node scripts/Rehearse-AssistedDelivery.mjs missing-provider
node scripts/Rehearse-AssistedDelivery.mjs expired
```

El primer escenario termina `restored`, no `published`: se revierte deliberadamente
el lote parcial. Los otros dos terminan `blocked` sin intentar publicar. Las
aprobaciones son simuladas, no consentimiento ni identidad verificados. Esta prueba
no sustituye los ensayos WordPress/HTTP ni la checklist de un hosting real.
