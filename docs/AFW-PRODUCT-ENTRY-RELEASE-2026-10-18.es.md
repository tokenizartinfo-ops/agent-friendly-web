# AFW: presentación, entrega y primer paso

Entrega comprobada el18oct2026; independiente de Containers y del ensayo con ordenador apagado.

## Resultado

La portada conserva la llamada, robots y diseño comic. Ahora explica el valor y muestra sus dos enlaces antes de la ilustración grande. «Cómo empezamos» lleva a tres pasos anteriores a la escala de madurez: entender necesidades/fuentes, preparar cambios revisables y comprobar lo aplicado. El diagnóstico público continúa disponible; navegar no ejecuta una auditoría.

La entrada privada explica que requiere una cuenta habilitada y ofrece la alternativa pública. Se distinguen propietario, mantenedor y AFW; preparar no acredita publicar. La visión futura aparece plegada y aclara que la supervisión cloud continua sigue en validación. No se abrió guardia ni inscripción general. La portada tiene un solo h1 y la auditoría interna usa h2 con su estilo conservado. El Markdown recoge también el recorrido, acceso y límites.

El [plan comercial operativo](AFW-COMMERCIAL-OPERATING-PLAN-2026-10-18.es.md) complementa la estrategia inicial: entregables, responsables, objeciones, públicos y medición de activación/esfuerzo/retrabajo/aceptación. Chavo compartió su síntesis y adjuntos del14oct; no se cotejaron íntegramente las44 páginas ni se acreditó demanda. Gabriel reiteró que producto, públicos, metodología, monetización y usabilidad siguen en definición temprana. Google y Jordan se consultaron como fuentes primarias acotadas. No se fijó precio, campaña, ahorro, ranking o superioridad; no tracking/CRM/contacto con clientes.

## Fuente y verificación

| Tramo | Referencia |
| --- | --- |
| Integración | PR472; fuente7639296abdf167adb45a699ce08d6ddfd56c7723; merge70a0c6386bea39624f8aafa1bfbfb0f8bef4ff50 |
| CI integral |39142806339/job117720505070:2015PASS,0FAIL,1SKIP; lint/build aprobados |
| Backport público | PR473; fuente97faf4a276aedaa6f337b376d336639151f4708b; merge269b3557b2e67a5fdc1d1122101a9606450379f7 |
| CI pública |39143376918/job117722170645:1137PASS,0FAIL,0SKIP; lint/build aprobados |

Los diez blobs del backport coinciden con la fuente revisada; no se desplegó todo main. Pruebas dirigidas: cuatro fallos RED esperados y14PASS finales, incluyendo HomeExperience real, tres idiomas, enlaces, orden y un h1. CSS se comprueba en navegador.

Una revisión independiente encontró0Critical/0Important/2Minor: cubrir la composición real/heading de auditoría y corregir «O guia» en portugués. Ambos corregidos. El revisor no acreditó despliegue, visual, demanda, investigación completa ni guardia cloud.

Chrome local con HomeExperience real, sin plugin Cloudflare/DB/scans:1440x900 y390x844 ES/EN/PT. Contenido móvil375px más15 de scrollbar, sin overflow; CTA principal antes de imagen y dentro de primera pantalla, tres pasos, imagen completa y rutas localizadas. Tab avanza del CTA privado a alternativa pública y explicación futura; Enter abre/cierra details nativo. Tamaño habitual restaurado. No es certificación WCAG ni prueba con lector de pantalla. Hubo rechazo de la extensión MetaMask ajeno al producto; no se declaró consola libre de errores de extensiones.

## Publicación y recuperación

Destino exclusivo AFW: https://agentfriendlyweb.dev, Worker `agent-friendly-web-web-production`, cuenta85d0d5dadac3341a564f22ce885e9eec. Artefacto congelado298 archivos/hash comprobados. D1d26fc9d2, AI, ASSETS, rate5/60, audiencias, pin propio, flags, runtime/settings preservados. Sin migración, Registry, Access, credenciales, rollout de clientes o eventos privados.

| Etapa UTC | Resultado |
| --- | --- |
|16:02:47 | API confirma baseline6f160a54 y configuración efectiva |
|16:06:58 | Rollback6f160a54 verificable:16páginas200, assets exactos y smoke público/Access aprobado |
|16:08:24 | Candidata5f4bb378 subida una vez; configuración preservada, baseline100% |
|16:08:38 | Deploymenta418991c: baseline100%/candidata0% |
|16:08:48 | Primera lectura aún devolvía portada previa; no se promovió ni aceptó esa lectura como candidata |
|16:09:20–24 | API confirma versiones; override ya muestra contenido nuevo en ES/EN/PT, un h1, acceso y CTA;16páginas/2assets/smoke aprobados |
|16:09:37–40 | Deployment6585eca3-d314-4f40-8ea6-c3651db4021f y lectura normal aprobada |
|16:12:07 | API confirma5f4bb378-6438-4d04-ac95-28c0f631574c al100%; bindings efectivos/de versión, runtime y settings preservados |

La [documentación de version overrides](https://developers.cloudflare.com/workers/versions-and-deployments/version-overrides/) advierte del fallback al reparto ordinario cuando la versión aún no está disponible. Se verificaron deployment y contenido antes de promover. HTTP200 o un asset aislado no bastan para acreditar la versión.

CSS `/_next/static/css/layout.CstG1CTA.css`, SHA256 `d98fe3d1b35ce25d7ac90a6152fddc1cd53d8111637eff149915e6fe93fe30c6`. Chunk del expediente conservado exacto: `intake-workspace-C7EQuJyI.js`, SHA256 `2c9acae9c2dc7b98984ae9836e861cab451630e9fb9e373d7c998370c6e335cc`. Rollback disponible6f160a54-202d-4a3c-a194-28bb025848fe; no se ejecutó ni rebobinó datos.

La sesión real vio la nueva sección y abrió `/expediente` desde el CTA. Tras cargar restauró el borrador con ocho respuestas y orientación de asociación. Sin OTP, editar, guardar, auditar, transferir ni crear proyecto por esta comprobación. Captura publicada: `output/afw-product-entry-20261018/07-production.png`. Un intento posterior de captura a otro tamaño falló; no se usa como evidencia y se restauró tamaño normal.

## Continuidad

Evidencia ignorada: `output/afw-product-entry-ledger-20261018.md`, carpeta `output/afw-product-entry-20261018/`, reportes `afw-product-web-{rollback,override,normal}-20261018.json`, `afw-product-final-readback-20261018.json` y manifiesto. Configuración con pins fuera de Git. Servidor de ensayo local cerrado al terminar.

No repetir subida/promoción/QA aceptada por documentación. El [roadmap del primer cliente](AFW-FIRST-CLIENT-READINESS-2026-10-05.es.md) conserva gates de Containers, suscripción, aviso/revisión útil, retirada, PC-off e invitación aprobada. Esta entrega no acredita esos servicios ni puntaje externo nuevo. No se envió correo a Max.
