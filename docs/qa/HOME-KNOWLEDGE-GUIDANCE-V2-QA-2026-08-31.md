# Home Knowledge and Guidance v2 - QA 2026-08-31

## Alcance verificado

Rama: `feat/home-knowledge-guidance-v2`

Commit de implementacion sometido a QA: `ed95ed5`

Entorno: servidor Vinext local en `http://localhost:3000`. No se uso el origen productivo para validar esta rama.

## Verificacion automatizada

| Comando | Resultado |
| --- | --- |
| `npm test` | 281 pruebas aprobadas, 0 fallos |
| `npm run lint` | codigo de salida 0; 1 advertencia no bloqueante |
| `npm run validate:okf` | 14 conceptos OKF validados en 18 archivos |
| `npm run build` | build Vinext completo, codigo de salida 0 |

Advertencias no bloqueantes observadas:

- Node informa que SQLite es experimental durante las pruebas que validan migraciones aisladas.
- Vite anticipa que una futura version de `configLoader: native` exigira atributos en la importacion JSON de `.openai/hosting.json`.
- Vinext no clasifica estaticamente algunas rutas dinamicas durante el build.
- ESLint recomienda `next/image` para la ilustracion semantica del hero; se conserva `<img>` para mostrar el asset completo sin recorte ni transformacion del proveedor.

Ninguna advertencia produjo fallos de test, lint, OKF o build.

## Correcciones posteriores a revision independiente

La revision de codigo no encontro hallazgos criticos y marco cinco ajustes importantes. Todos quedaron corregidos y cubiertos por pruebas:

- el filtro de credenciales analiza el mensaje completo antes de limitar el texto usado por el clasificador;
- el test del canary 5D usa una hora inyectada y ya no depende del reloj calendario;
- las respuestas FAQ de la guia incluyen la pagina FAQ y las fuentes allowlisted propias de cada entrada;
- el manifiesto OKF evita enlaces mutables a `main`, y el paquete NotebookLM fija revision de repositorio y SHA-256 por fuente;
- los enlaces de fuentes FAQ usan nombres localizados y distinguibles para tecnologias de asistencia.

## HTTP local

Las siguientes rutas respondieron HTTP `200`:

- `/`
- `/preguntas-frecuentes`
- `/en/frequently-asked-questions`
- `/pt/perguntas-frequentes`
- `/evolucion-agentica`
- `/okf/v0.2/index.md`
- `/.well-known/public-guide-contract.json`
- `/sitemap.xml`
- `/llms.txt`

## QA visual y funcional

Viewports revisados:

- desktop: `1440x900`;
- mobile: `390x844`.

Idiomas revisados: espanol, ingles y portugues.

Resultados:

- la ilustracion muestra completos los dos robots, las dos latas y el hilo, sin recorte CSS ni texto superpuesto;
- titulo, imagen, explicacion y acciones mantienen orden estable en desktop y mobile;
- no se detecto overflow horizontal en `390x844`;
- el menu mobile abre, ocupa el ancho disponible y mantiene todas las rutas legibles;
- los enlaces AF-0 a AF-5 navegan a fragmentos reales; se verifico `/evolucion-agentica#af-0`;
- la referencia inactiva muestra `95 / 100`, fecha `2026-08-31` y el limite de comercio/pagos;
- el comparador abre con Restaurante y AF-2 seleccionados;
- las FAQ se expanden y conservan texto legible en mobile;
- el encabezado de la pagina FAQ conserva contraste alto en mobile y desktop;
- Enter envia una pregunta en la guia y la FAQ `automatic-progression` responde con enlace a la fuente publica;
- consola del navegador: 0 errores; un warning de preload sin `as` valido en desarrollo, originado por la capa Vite/React.

## Evidencia visual

- [Ilustracion completa desktop](screenshots/home-knowledge-guidance-v2/hero-art-desktop.png)
- [Home espanol mobile](screenshots/home-knowledge-guidance-v2/home-es-mobile.png)
- [Home ingles desktop](screenshots/home-knowledge-guidance-v2/home-en-desktop.png)
- [Home ingles mobile](screenshots/home-knowledge-guidance-v2/home-en-mobile.png)
- [Home portugues desktop](screenshots/home-knowledge-guidance-v2/home-pt-desktop.png)
- [Home portugues mobile](screenshots/home-knowledge-guidance-v2/home-pt-mobile.png)
- [Menu portugues mobile](screenshots/home-knowledge-guidance-v2/home-pt-mobile-menu.png)
- [FAQ espanol mobile](screenshots/home-knowledge-guidance-v2/faq-es-mobile-open.png)
- [Guia espanol mobile con respuesta FAQ](screenshots/home-knowledge-guidance-v2/guide-es-mobile-faq.png)

## Limites preservados

Esta rama no modifico el algoritmo ni el contrato de `/api/scan`, la identidad del Registry, las migraciones D1, el MCP publico, los conectores de Bloque 5D ni el Draft PR sintetico.

No se ejecutaron despliegues, DNS, pagos, trafico productivo, mutaciones de Registry, mutaciones MCP, publicaciones de capsulas, acciones remotas ni promocion de derivados NotebookLM. El paquete NotebookLM permanece auxiliar y `needs_review` hasta un gate separado posterior al merge y publicacion verificable.
