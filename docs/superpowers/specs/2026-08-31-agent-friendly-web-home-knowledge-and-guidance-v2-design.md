# Agent Friendly Web Home, Knowledge and Guidance v2

## Estado

Aprobado integralmente por Gabriel Mucchiut el 2026-08-31.

## Objetivo

Hacer que la portada explique visualmente la comunicacion entre agentes, convierta la ruta AF-0 a AF-5 en navegacion util y mantenga una unica base publica de preguntas frecuentes para la web, el bot, los datos estructurados, OKF y el paquete de fuentes NotebookLM. El cambio debe mejorar comprension humana sin inflar el nivel agentico ni mezclar capacidades planificadas con capacidades desplegadas.

## 1. Portada apilada

La primera seccion conserva el orden semantico:

1. etiqueta `La llamada`;
2. slogan principal como `h1` HTML;
3. ilustracion completa de los dos robots comunicandose mediante latas e hilo;
4. explicacion;
5. comandos para auditar y recorrer AF-0 a AF-5.

En escritorio y movil la imagen sera un elemento visual independiente, no un fondo cubierto por texto. Debe usar su proporcion real, `object-fit: contain`, ancho estable y suficiente altura para reconocer ambos robots, ambas latas y el hilo completo. No habra degradados, velos ni texto superpuesto. La primera banda puede crecer verticalmente para preservar nitidez y jerarquia.

La ilustracion tendra texto alternativo localizado. El slogan y la explicacion permanecen texto seleccionable.

## 2. Ruta de madurez navegable

No habra un nivel premarcado por CSS. Los seis robots tendran tratamiento visual equivalente y cada etapa sera un enlace real a la pagina de evolucion con un fragmento estable:

- `#af-0`;
- `#af-1`;
- `#af-2`;
- `#af-3`;
- `#af-4`;
- `#af-5`.

La pagina de evolucion aceptara el fragmento como orientacion humana y expondra anclas reales. El comparador de esa pagina conservara controles manuales; un fragmento no habilita capacidades, no modifica el puntaje y no ejecuta acciones.

La introduccion explicara en ES, EN y PT que Agent Friendly Web acompana un recorrido progresivo desde invisible hasta agent-native. No es automatico: cada etapa requiere evidencia publica, implementacion, validacion, limites, aprobacion humana y nueva medicion.

## 3. Baseline verificable de Agent Friendly Web

La referencia inicial del auditor usara un objeto versionado compartido con:

- dominio canonico;
- puntaje observado `95/100`;
- fecha de medicion `2026-08-31`;
- nivel mostrado con limites;
- enlace o accion para ejecutar una medicion nueva.

No se auditara el dominio automaticamente en cada visita. Esto evita latencia, consumo y una experiencia inestable. La interfaz distinguira claramente la ultima referencia verificada de un resultado recien calculado. Al ejecutar `Auditar`, el valor se reemplaza por la respuesta real de `/api/scan`.

El baseline no es una certificacion universal, no promete indexacion y no oculta que la capa de pagos sigue sin detectarse.

## 4. Comparador con restaurante inicial

El caso inicial sera `restaurant`, que ya ocupa la primera posicion del selector. Su boton estara presionado, con peso visual suficiente y semantica `aria-pressed=true`. El nivel inicial seguira siendo AF-2 para demostrar una respuesta comprensible sin presentar delegacion o pagos como activos.

Municipalidad y Tokenizart seguiran disponibles como casos alternativos.

## 5. Preguntas frecuentes como fuente unica

Se creara un catalogo publico versionado y localizado para ES, EN y PT. Cada entrada incluira:

- identificador estable;
- pregunta;
- respuesta breve;
- respuesta ampliada;
- rutas o fuentes publicas allowlisted;
- temas de intencion asociados.

El mismo catalogo alimentara:

1. una seleccion breve en la portada;
2. una pagina completa de preguntas frecuentes;
3. el bot guia publico;
4. JSON-LD `FAQPage`;
5. el concepto OKF correspondiente;
6. el manifiesto del paquete NotebookLM.

La pagina FAQ se incorporara al mapa humano, navegacion, footer, sitemap y rutas localizadas. Los enlaces y respuestas no prometeran resultados de ranking ni capacidades todavia planificadas.

## 6. Guia conversacional

La guia publica seguira siendo determinista, read-only, efimera y sin modelo externo. Reutilizara el catalogo FAQ para responder preguntas sobre:

- que resuelve Agent Friendly Web;
- por donde empezar;
- significado de AF-0 a AF-5;
- diferencia entre auditoria, expediente e implementacion;
- archivos agenticos y AEO;
- crawlers;
- accesos sin contrasenas;
- Registry, OKF, CLI y MCP;
- costos y presupuestos personalizados sin inventar precios;
- limites de A2A, pagos y escrituras remotas;
- caso Tokenizart.

Las respuestas conservaran contexto inmediato y ofreceran como maximo un siguiente paso principal. Toda fuente visible debe resolver a una ruta publica real.

## 7. OKF publico

El release publico OKF se actualizara sin cambiar la version de formato `0.2`. La nueva revision incorporara como minimo:

- experiencia humana y ruta de madurez;
- FAQ y guia publica;
- baseline verificable y limites del puntaje;
- estado actual de CLI, MCP, Registry y Block 5D;
- enlaces canonicos vigentes;
- fecha, procedencia y ventana de revision actualizadas.

El generador reconstruira indice, manifiesto y checksums. Las pruebas verificaran inventario, hashes, medios y enlaces. La revision del bundle no convertira roadmap, A2A, pagos o escritura remota en capacidades desplegadas.

## 8. Paquete NotebookLM

Se preparara un paquete de fuentes publico Nivel 5 con:

- README de alcance;
- manifiesto de fuentes y procedencia;
- documentos OKF;
- FAQ;
- metodologia AF-0 a AF-5;
- AEO y crawlers;
- guia de uso;
- caso Tokenizart;
- limites y fecha de corte.

El paquete podra cargarse en un cuaderno dedicado de NotebookLM para generar informes, guiones, presentaciones y videos. NotebookLM sera una interfaz auxiliar: sus derivados vuelven a revision y no reemplazan GitHub/OKF como fuente canonica.

No se incorporaran secretos, expedientes privados, credenciales, datos owner ni contenido Nivel 1 a 4.

## 9. Contratos y rutas

Se agregara una route key localizada para FAQ y se actualizaran los mapas existentes. Las rutas tecnicas conservaran canonicals en espanol y aliases estables en ingles y portugues.

Los cambios no modifican:

- el contrato `/api/scan`;
- el puntaje o algoritmo del scanner;
- identidad, permisos o sesiones;
- D1 y sus migraciones;
- el MCP remoto;
- Block 5D ni el PR sintetico;
- DNS, billing, pagos o credenciales.

## 10. Pruebas y publicacion

La implementacion seguira TDD y debe demostrar:

1. hero apilado con imagen completa y sin superposicion;
2. seis enlaces AF con anclas validas y sin AF-3 premarcado;
3. baseline `95/100` con fecha y limites;
4. restaurante seleccionado inicialmente;
5. catalogo FAQ completo en tres idiomas;
6. pagina, JSON-LD, sitemap y guia alimentados por la misma fuente;
7. OKF regenerado y checksums validos;
8. paquete NotebookLM sin datos sensibles;
9. `npm test`, lint y build aprobados;
10. QA Playwright en 1440x900 y 390x844, sin overflow, texto superpuesto, imagen recortada ni errores de consola;
11. pruebas HTTP de paginas, recursos agenticos y negociacion Markdown;
12. auditoria publica posterior y MCP read-only sin regresiones.

La entrega se integrara mediante PR. La publicacion requiere build exacto, version Sites, smoke posterior y rollback identificado. El PR sintetico de Block 5D permanecera Draft y sin merge.

## Criterio de cierre

Una persona debe poder reconocer la comunicacion entre los robots, comprender que AF-0 a AF-5 es un recorrido no automatico, obtener un diagnostico actualizado, iniciar con un ejemplo cotidiano, resolver dudas desde FAQ o chat y descubrir las fuentes publicas que sustentan cada explicacion. Un agente debe poder recuperar el mismo conocimiento desde HTML, JSON-LD, sitemap, OKF y los recursos ya publicados, sin contradicciones de estado.
