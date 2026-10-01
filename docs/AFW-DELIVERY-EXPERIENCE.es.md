# Experiencia de entrega: conocimiento operativo de AFW

Fecha de incorporación: 2026-10-01. Fuente: lectura del chat «Tokenizart / Atelier · Operación y descubrimiento» y recibos del repositorio `tokenizart-platform-operations`, revisión `788fec0879466064dc1f1f2a1bee0dcec281565c`. Lectura autorizada por el owner; ninguna infraestructura del cliente modificada desde AFW. Son observaciones históricas fechadas, no una inspección actual ni una garantía para otro hosting.

## Caso inicial: dos sitios, varias capas de responsabilidad

| Capa | Evidencia disponible | Aprendizaje para una entrega nueva |
| --- | --- | --- |
| WordPress de tokenizart.com | Plugins de publicación acotada 1.1.2–1.1.6 instalados mediante reemplazo explícito; recibos HTTP posteriores | Una sesión CMS permite solamente las operaciones de su rol. Confirmar versión activa, conservar paquete previo y probar rutas exactas, MIME, UTF-8, GET/HEAD y métodos rechazados. |
| Hosting WordPress, Hibou/cPanel | Docroot confirmado; índice estático reemplazado y verificado el 01/10 | Un plugin no demuestra control de un archivo estático preexistente. Confirmar dominio, raíz y hash anterior antes de subir únicamente el archivo autorizado. |
| VPS Atelier, Donweb | Inventario DNS/hosting histórico y despliegues posteriores de servicio Swarm | Donweb es una capa distinta del hosting WordPress. Verificar servicio efectivo, imagen, mounts y procedencia; una cuenta de dominio/DNS no concede acceso al runtime. |
| Portainer/Swarm | El inventario de servicios resolvió una lista de contenedores aparentemente vacía | Elegir el inventario apropiado al orquestador y rol. Una lista vacía no demuestra ausencia de aplicación ni autoriza recrearla. |
| Traefik Atelier | Entrega de negociación Markdown del 01/10: 12 controles sintéticos y 16 públicos; sin reiniciar servicio | Adaptador limitado a raíz, GET/HEAD anónimos y Accept explícito; Cookie/Authorization mantienen HTML. Preservar inode al editar un archivo con bind mount; un rename puede dejar el proceso leyendo la versión anterior. |
| Cloudflare/DNS/auditor | DNS/edge y auditor son planos diferentes; evidencia fechada por origen | No trasladar controles o puntuación de un hostname a otro. Registrar request, fecha, resultado y versión del auditor cuando esté disponible. |

### Resultados y problemas que debemos conservar juntos

- Índice WordPress: nueve entradas publicadas, documentos y hashes verificados; 16 controles HTTP. Recibo `deliveries/tokenizart-skills-index-20261001/release-receipt.json`, observado `2026-10-01T14:53:57.344744+00:00`. Lectura externa posterior confirmó nueve skills válidas, pero no se extrajo un nuevo puntaje numérico. Las guías de wallet/Mint/Certify son documentación: no prueban acciones delegadas funcionando.
- Auditoría del 01/10: Atelier 53/100, nivel propio del auditor 4; Tokenizart 53/100, nivel propio 2. Fuente `deliveries/discovery-audits-20261001/cloudflare-markdown-summary.json`, lecturas 14:02:59 y 14:03:30 UTC. No equivalen a niveles AFW ni certifican transacciones.
- WordPress Markdown pasa en controles propios y falla en la lectura externa. La hipótesis del wildcard no explica el request externo observado. La regla raíz existe antes del cache/WordPress; duplicar exclusiones o desactivar protección carece de justificación. Pendiente: contraste causal de metadatos saneados del request del auditor. Fuente posterior `deliveries/tokenizart-skills-index-20261001/PUBLISHED.md` y `deliveries/discovery-audits-20261001/WORDPRESS-EXTERNAL-CONTRAST.md`.
- El verificador buscó inicialmente un sitemap equivocado. Usar el sitemap declarado en robots, sin inferir nombres propios de un plugin.
- En menús multilingües el contenido público seguía antiguo hasta purgar cache por el control ordinario; comprobar cada idioma anónimamente. Fuente `deliveries/atelier-public-resources-2026-09-29/RELEASE.md`.
- Una página creció a 9137 bytes y excedió el límite de lectura heredado de 8192. Dos intentos revirtieron correctamente. Se ajustó solamente ese verificador a un límite de 16384, manteniendo controles y rollback. Un fallo del verificador no permite proclamar instalación exitosa ni ampliar límites globales.
- Navegación local relativa y `ERR_BLOCKED_BY_CLIENT` confundieron la revisión humana de documentos que HTTP servía correctamente. Separar preview local, navegador, contenido publicado y disponibilidad de servidor. Ofrecer portada humana y URLs de lectura claramente identificadas.
- Tras timeout o resultado `applied:false`, consultar estado real antes de reintentar: puede haber una escritura parcial o una verificación transitoria fallida. No duplicar publicaciones.

Referencias adicionales: `deliveries/wordpress-negotiation-20261001/RELEASE.md`, `deliveries/atelier-markdown-20261001/RELEASE.md`, `deliveries/discovery-next-20260930/README.md`, `docs/CLOUDFLARE-CONTROL-AND-ATELIER-NEXT-GATES-2026-09-15.es.md`. Las referencias apuntan al repositorio responsable; no copiar secretos, configuraciones crudas, rutas privadas de recuperación ni transcripciones a AFW. Ese repositorio local no estará disponible automáticamente en Codex Cloud: este resumen saneado es su continuidad portátil.

## Método reutilizable, sin asumir permisos por proveedor

1. Confirmar objetivo y origen. Elegir alcance útil según negocio; no empujar AF5 por tener un CMS o por mejorar un indicador.
2. Preguntar una capacidad concreta: «¿Podés instalar un plugin o tenés alguien que mantiene la web?». Si no sabe, dejarlo pendiente y preparar una petición para el responsable. Evitar pedir todos los accesos de una vez.
3. Resolver la capa: editor CMS, plugins, archivos del docroot, repositorio/build, proxy/runtime o tercero. Registrar lo declarado separadamente de lo verificado.
4. Preparar cápsula específica: archivos/rutas permitidos, versión, hashes, dependencias, estado previo o ausencia, comprobaciones y rollback. Personalizar por arquitectura efectiva; no solo por marca del proveedor.
5. Acordar acceso temporal si hace falta: persona/servicio nominal, recurso exacto, acciones mínimas, vencimiento, custodia, revocación y prueba de retirada. El consentimiento para publicar no demuestra que ese permiso exista. Nunca pedir contraseñas por chat.
6. Instalar por mecanismo autorizado. Si controla un tercero, entregar instrucciones reproducibles, criterio de aceptación y retirada; no sortear su protección ni usar editores generales para suplir permisos ausentes.
7. Verificar públicamente bytes, MIME, métodos, límites, rutas ajenas y comportamiento autenticado relevante. Distinguir preparado, autorizado, instalado, HTTP verificado y observado por auditor externo.
8. Registrar resultado, pendiente y siguiente paso. Reauditar con fecha y comparar el mismo perfil; nunca prometer 100%, ranking o recomendación de un LLM.

### Petición sencilla al mantenedor

> Estamos preparando una mejora de descubrimiento para [origen]. Necesitamos [capacidad concreta] para publicar únicamente [rutas/archivos versionados]. Adjuntamos hashes, comprobación y rollback. ¿Podés realizarlo vos o habilitar acceso nominal limitado hasta [fecha]? Confirmaremos el resultado desde fuera y retiraremos el acceso al terminar. No necesitamos permisos sobre datos de clientes, pagos ni otras aplicaciones.

El copilot debe explicar por qué hace esa pregunta: «Con eso puedo elegir el camino más sencillo y preparar los archivos por vos. Si no tenés ese acceso, podemos coordinarlo con quien mantiene tu sitio». No mostrar todo el checklist al usuario. Mantener el detalle en expediente técnico y pedir una decisión a la vez.

## Registro que crece con cada experiencia

Cada caso nuevo guarda: ID opaco, fecha, proveedor/producto/capa, origen consentido o anonimizado, revisión de fuentes, capacidades comprobadas, problema reproducible, hipótesis descartadas, solución o bloqueo, cápsula/versiones/hashes, permiso aplicable, pruebas, rollback, revocación, efecto observado y siguiente paso. Sin credenciales, tickets ni datos privados. Una actualización agrega evidencia y supersede estados previos explícitamente; no borra la historia.

Hostinger y otros proveedores: **sin implementación comprobada en esta revisión**. Investigar su producto concreto cuando exista un caso; no convertir una solución cPanel en soporte garantizado para toda una marca. El registry debe distinguir documentado, probado en laboratorio y probado en cliente.

Track record comercial: publicar solo casos con autorización de exposición, alcance y recibos saneados. Separar mejora técnica, puntuación externa y resultados comerciales. Estos aprendizajes son conocimiento interno reutilizable; no crean por sí solos una nueva referencia comercial pública.

## Incorporación al sistema

Esta biblioteca es accesible al gerente Codex mediante AGENTS y su runbook. **No está cargada en el copilot de cliente en producción**. El extractor actual se limita deliberadamente a hechos expresados por el usuario; no insertar casos históricos como hechos de su expediente.

Siguiente bloque: contrato de asesoría de entrega separado de extracción/intake, selección por capacidad comprobada y etapa, referencias saneadas, una pregunta por turno y revisión antes de preparar/publicar. Probar CMS sin plugins, archivos estáticos, tercero sin acceso, timeout con escritura incierta y proveedor desconocido. Promover conocimiento al copilot solo con ese contrato probado y recibo de despliegue. No crear ejecutores de hosting a partir de esta documentación.
