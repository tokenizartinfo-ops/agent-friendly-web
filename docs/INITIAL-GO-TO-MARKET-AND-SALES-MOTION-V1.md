# Initial Go-to-Market and Sales Motion v1

**Estado:** hipotesis comercial para pilotos

**Fecha:** 2026-08-31

**Owner:** Gabriel Mucchiut

## Posicionamiento

Agent Friendly Web ayuda a organizaciones a transformar informacion dispersa y sitios dificiles de interpretar en superficies que humanos y agentes pueden descubrir, comprender y usar con limites claros.

No vende una puntuacion ni garantiza aparicion en un LLM. Entrega diagnostico, contenido reconciliado, contratos, implementacion controlada y evidencia antes/despues.

## Cliente ideal inicial

### Perfil de credibilidad

Museos, galerias, artistas, coleccionistas, archivos e instituciones culturales que:

- tienen informacion valiosa repartida entre web, redes, Drive, PDFs o sistemas internos;
- dependen de un tercero para modificar su sitio;
- no pueden explicar con claridad servicios, colecciones, horarios, eventos o procesos;
- quieren ser encontrados y entendidos por buscadores, asistentes y agentes;
- necesitan avanzar sin reemplazar todo su sitio ni entregar contrasenas generales.

### Perfil de escala

Agencias, estudios web y mantenedores que administran varios sitios y necesitan una entrega repetible, auditable y white-label para sus clientes.

### Primer producto sectorial

Grupos de restaurantes, hoteles boutique, bodegas y espacios de eventos con informacion cambiante, reservas directas, varias sedes o un valor comercial claro por cada consulta bien resuelta.

### Comprador

El comprador inicial suele ser fundador, director, owner, responsable de comunicacion o responsable digital. La implementacion puede requerir a un mantenedor web distinto. La propuesta debe hablar a ambos:

- al owner: claridad, control, alcance, evidencia y costo;
- al mantenedor: archivos exactos, rutas, diff, pruebas y rollback.

### Descalificadores

- busca garantia de ranking o recomendacion;
- no puede identificar a ningun responsable de contenido;
- exige publicar claims no verificables;
- pretende usar la plataforma para evadir permisos del mantenedor;
- requiere un proyecto enterprise antes de validar el problema;
- quiere entregar contrasenas generales en lugar de un acceso acotado.

## Mensaje central

> Tu sitio puede estar online y aun asi resultar dificil de interpretar para un agente. Lo auditamos, ordenamos que debe explicarse, preparamos cambios acotados y mostramos evidencia antes y despues. No necesitas reconstruir todo ni entregar el control general del servidor.

## Conversacion de descubrimiento

1. Que deberia poder responder correctamente un asistente sobre tu organizacion?
2. Donde vive hoy esa informacion?
3. Que respuestas actuales resultan incorrectas, incompletas o desactualizadas?
4. Quien puede aprobar contenido?
5. Quien controla el sitio, DNS o repositorio?
6. Que cambio tendria valor dentro de los proximos 30 dias?
7. Como comprobaremos que la entrega fue correcta?

La conversacion produce un problema firmado, no un listado de protocolos.

## Oferta piloto

### Discovery Pack F0/F1 a F3

**Entregables:**

- auditoria inicial y baseline externo aplicable;
- mapa de preguntas y entidades prioritarias;
- inventario de contradicciones y fuentes;
- contenido agent-readable propuesto;
- archivos o integraciones aplicables al origen;
- capsula de entrega para owner y mantenedor;
- evidencia de QA y reauditoria cuando se publique;
- reporte de pendientes y siguientes gates.

**Exclusiones:**

- rediseño completo;
- seguridad integral;
- migracion de hosting;
- ranking, citas o ventas garantizadas;
- acceso a datos privados;
- MCP, A2A, OAuth o pagos no incluidos en el PDR;
- mantenimiento recurrente obligatorio.

## Calificacion simple

Cada oportunidad recibe 0, 1 o 2 puntos:

| Criterio | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Dolor | abstracto | ejemplo aislado | problema repetido y visible |
| Responsable | desconocido | contacto parcial | owner y aprobador identificados |
| Acceso | ninguno | mantenedor identificable | origen o canal de cambio disponible |
| Evidencia | sin fuente | fuentes dispersas | fuentes y decisiones conciliables |
| Urgencia | sin fecha | trimestre | proximo mes |
| Presupuesto | no previsto | exploratorio | rango compatible |

Con 8 o mas puntos se prepara diagnostico. Entre 5 y 7 se nutre y aclara. Por debajo de 5 no se cotiza todavia.

### Gate 6A.1: calificacion ejecutable

La misma regla se implementa como `agent-friendly-web.traction-f1.v1` en estado `local_planning_only`. Recibe solamente un identificador opaco, segmento, fuente, idioma y seis valores numericos. No recibe datos personales ni texto libre, no persiste, no contacta, no cotiza y no cobra. Toda salida pasa por revision humana y cualquier uso remoto requiere aprobacion separada.

## Politica de precio para lanzamiento

El objetivo inicial es reducir la barrera de entrada sin vender trabajo manual por debajo de su costo:

| Oferta | Precio de referencia | Piloto fundador | Limite |
| --- | ---: | ---: | --- |
| Auditoria publica | USD 0 | USD 0 | sin email obligatorio |
| Diagnostico guiado | USD 20 | USD 10 | alcance automatizado, sin publicacion |
| Discovery Pack | USD 198 | USD 99 | un dominio, un idioma y hasta cinco areas |
| Implementacion F0/F1 a F3 | USD 250-600 | cotizacion | depende de CMS, acceso, volumen e idiomas |

El piloto del Discovery Pack se ofrece a los primeros cinco sitios o 30 dias desde la activacion comercial, lo que ocurra primero. La fecha de inicio y los lugares utilizados deben quedar visibles. El descuento del 50% solo se comunica si USD 198 fue aprobado previamente como precio de lista real. En caso contrario se presenta honestamente como `piloto fundador USD 99`, sin precio tachado.

Los precios anteriores son hipotesis para medir disposicion a pagar, horas, consumo y soporte. Esta tabla no constituye una tarifa publica activa. La promocion no comenzo, no se renueva automaticamente y no incluye implementacion, monitoreo, MCP, A2A, pagos agenticos ni cambios de hosting. Publicar la oferta o cobrar requiere aprobacion separada.

Los referidos se evaluaran despues de habilitar consentimiento y contacto. Nunca se importaran cinco emails de terceros: cada organizacion referida debe iniciar su propia auditoria y consentir su contacto. Cualquier credito se aplica a trabajo futuro y no equivale a efectivo ni activa una accion automatica.

### Guardrail de costo

Cada piloto registra tiempo humano, uso de modelos/APIs, infraestructura, soporte y retrabajo. La regla de control es:

`precio_minimo_sostenible = costo_directo_estimado / (1 - margen_objetivo)`

Para la fase fundadora:

- el diagnostico de USD 10 no admite investigacion o redaccion a medida; si requiere intervencion humana material se convierte en Discovery Pack;
- el Discovery Pack de USD 99 tiene un presupuesto maximo de dos horas y media de trabajo humano y cinco areas; un alcance mayor se cotiza aparte;
- ningun piloto se acepta si el costo directo previsto supera el precio;
- despues de cada entrega se calcula margen de contribucion y se corrige alcance o precio antes de abrir otro cupo.

### Frontera entre producto estandar y proyecto custom

De AF-0 a AF-3 se puede estandarizar una parte sustancial del trabajo: auditoria publica, inventario, reconciliacion basica, `llms.txt`, metadatos, respuestas citables, politicas de crawlers, documentacion y capsula de publicacion. El precio fijo solo aplica cuando dominio, idioma, cantidad de paginas, fuentes y entregables entran en el alcance publicado.

AF-4 y AF-5 requieren customizacion por empresa, web, plataforma o sistema. Pueden involucrar OpenAPI, MCP, OAuth, A2A, herramientas con permisos, pagos, datos privados, observabilidad, integracion con sistemas existentes y responsabilidades operativas. Cada caso exige:

1. relevamiento y fuentes verificadas;
2. requerimiento entendible y firmable;
3. PDR con arquitectura, riesgos y limites;
4. roadmap y estimacion de tiempos;
5. cotizacion particular;
6. criterios de aceptacion, pruebas y rollback;
7. aprobaciones separadas para identidad, datos, pagos, produccion o acciones mutantes.

Un sitio no compra automaticamente AF-5 por completar AF-3. Primero debe existir una necesidad concreta y una herramienta real. La metodologia conserva AF-0 a AF-5 como recorrido de madurez; la unidad comercial cambia de paquete estandar a proyecto custom cuando aparecen integraciones y riesgos propios.

### Experimento comercial de 30 dias

El periodo empieza solo cuando contacto consentido, propuesta y cobro humano tengan sus gates aprobados. Hasta entonces permanece planificado.

1. Dias 1-7: seleccionar cinco prospectos con relacion o contexto verificable y registrar una pregunta concreta que su sitio deberia responder mejor.
2. Dias 8-14: ejecutar cinco auditorias gratuitas y ofrecer dos devoluciones guiadas a cambio de feedback, sin exigir testimonio.
3. Dias 15-21: ofrecer hasta cinco diagnosticos de USD 10 y preparar como maximo dos propuestas de Discovery Pack fundador.
4. Dias 22-30: completar al menos una entrega, reauditar, medir costo/tiempo, registrar objeciones y decidir si se mantiene, sube o retira el precio.

El exito inicial no es cantidad de formularios. Es obtener una entrega paga verificable, una decision humana clara y datos suficientes para saber si el alcance puede repetirse.

## Pipeline

```mermaid
stateDiagram-v2
  [*] --> Nuevo
  Nuevo --> Calificado
  Nuevo --> NoEncaja
  Calificado --> Descubrimiento
  Descubrimiento --> Propuesta
  Propuesta --> Aprobado
  Propuesta --> Perdido
  Aprobado --> Entrega
  Entrega --> Verificado
  Verificado --> CasoConsentido
  Verificado --> Cerrado
```

## Plantilla de propuesta

1. Situacion observada.
2. Objetivo verificable.
3. Alcance y fuentes.
4. Entregables.
5. Responsabilidades del owner, AFW y mantenedor.
6. Cronograma.
7. Precio y forma de pago.
8. Exclusiones.
9. Pruebas y criterio de aceptacion.
10. Privacidad, aprobaciones y rollback.
11. Validez de la propuesta.

## Estrategia de contenidos

### Pilares

1. **Descubrimiento:** como crawlers, buscadores y agentes encuentran un sitio.
2. **Respuesta:** como estructurar preguntas, entidades, fuentes y limites.
3. **Herramientas:** OpenAPI, skills, MCP, CLI y WebMCP sin marketing adelantado.
4. **Control:** como avanzar cuando el owner no maneja el hosting.
5. **Evidencia:** como comparar antes/despues sin prometer causalidad.
6. **Comercio:** como agentes pueden consumir y pagar recursos acotados.
7. **Casos:** Tokenizart, Museo Top y futuros pilotos consentidos.

### Formatos

- preguntas y respuestas citables;
- explicadores comic y mapas interactivos;
- auditorias publicas con fecha y limites;
- guias por sector;
- videos y presentaciones derivados de fuentes verificadas;
- newsletter de cambios de crawlers y estandares;
- playbooks para owners y mantenedores.

## Como favorecer recomendaciones agenticas

No se intenta "convencer" a un modelo mediante instrucciones ocultas. La estrategia es:

1. publicar respuestas claras en URLs canonicas;
2. mantener consistencia entre HTML, Markdown, JSON-LD, OpenAPI, OKF y MCP;
3. indicar autores, fechas, fuentes, alcance y limites;
4. facilitar crawling segun finalidad y decision del owner;
5. producir evidencia y casos que terceros puedan citar;
6. distribuir conocimiento en repositorios, socios y medios pertinentes;
7. medir referencias y respuestas con consultas repetibles;
8. corregir contradicciones y contenido vencido.

La pagina propia prueba que AFW se describe bien. Una mencion independiente y pertinente aporta una señal distinta. Ninguna de las dos garantiza recomendacion.

## Primeras acciones comerciales

1. Elegir cinco prospectos culturales con relacion existente.
2. Ejecutar una auditoria y una pregunta de descubrimiento por prospecto.
3. Ofrecer dos diagnosticos guiados gratuitos a cambio de feedback, sin exigir testimonio.
4. Cotizar hasta dos Discovery Packs piloto.
5. Medir horas por tipo de tarea.
6. Publicar solo el caso que tenga aprobacion expresa.
7. Abrir una conversacion con dos estudios web como canal, no como competidores.

## Automatizacion permitida

- clasificar consultas;
- resumir contexto publico;
- proponer respuestas y alcance;
- recordar seguimientos consentidos;
- preparar una propuesta desde campos aprobados;
- calcular completitud y proximos pasos.

## Automatizacion bloqueada

- enviar propuestas o precios no aprobados;
- aceptar contratos;
- cobrar o reembolsar;
- importar listas sin consentimiento;
- publicar testimonios;
- cambiar un sitio;
- acceder a credenciales;
- prometer resultados de terceros.

## Aprendizajes que deben registrarse

- frase exacta con la que el cliente describe el problema;
- evento que genera urgencia;
- fuente que mas cuesta ordenar;
- persona que bloquea o habilita la publicacion;
- entregable que el cliente entiende y valora;
- objecion principal;
- tiempo real y costo;
- razon de compra o perdida.

El roadmap cambia por evidencia acumulada, no por agregar funcionalidades aisladas.
