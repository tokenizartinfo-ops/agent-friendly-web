# Roadmap operativo y continuidad de AFW

2026-10-02, [A2A diagnóstico y transporte cerrado](AFW-A2A-DIAGNOSTIC-CORE-2026-10-02.es.md): núcleo JSON-RPC 1.0 reutiliza auditoría pública y próximos pasos; once pruebas específicas pasan, incluida conexión HTTP local con cliente separado y datos sintéticos. Límites de cuerpo/lectura/concurrencia; falla cerrado sin limitador. Sin endpoint ni tarjeta publicados, sin nuevo puntaje acreditado. Siguiente: limitador distribuido, plazo total, canary y cliente externo antes de promoción. DNS DS continúa ausente en lectura fechada.

2026-10-02, [kit visual y correo HTML propio recibido](design/afw-mail-20261002/README.es.md): tres modelos, brochure HTML/PDF y nueva ilustración de marca. Owner autorizó prueba propia única vía API Cloudflare, Gmail INBOX/Promotions y render Chrome confirmados; mensaje fechado 14:10:38 Buenos Aires, entregado 13 segundos después, SPF/DKIM/DMARC PASS. No envío a Sector de Sistemas, no consumidor automático HTML ni cambios en canary cerrado/producción. Siguiente: elegir dirección, integrar custodia/aprobación exactas del HTML y activos con pruebas antes del primer cliente; seguir DNSSEC/OAuth/A2A por recibo de auditoría.

2026-10-02, [auditoría externa nueva y diagnóstico DNSSEC](AFW-EXTERNAL-AUDIT-2026-10-02.es.md): all nivel 4, 11 PASS/5 FAIL; content nivel 5, 6 PASS/1 FAIL. DNSSEC sigue pending, CDS y SVCB firmados presentes, DS ausente en delegación; Registrar Cloudflare confirmado. Siguiente: investigar operación Registrar, luego OAuth ChatGPT real, registro auth.md y servicio A2A público comprobable. Sin cambio de producción ni puntuación numérica nueva. Owner pospone prueba PC apagada mientras otro chat trabaja.

2026-10-02, [envío propio cloud aceptado](AFW-OWN-MAIL-ACCEPTANCE-2026-10-02.es.md): owner aprobó nuevo borrador, consumo accepted y segunda consulta not_claimed. Primaria: un intento/un recibo. Gmail: un único mensaje INBOX a las 13:30:35 Buenos Aires. Canary cerrado (flags false/ambos Access deny), EMAIL/limiter/identidad temporal retirados, datos preservados. Siguiente: disparador/cadencia independiente sin PC con evidencia; no acredita gerente permanente ni cliente real.

2026-10-02, PR171 integrada/CI aprobado: fix de transporte vacío publicado solo en mail-canary, 691 pruebas y lint/build pasan. Diagnóstico cloud con clave inexistente y sin EMAIL obtuvo 200 blocked, acreditando cuerpo vacío/JWT; no envío. Permiso propio vencido: intento anterior cancelado sin attempt/recibo; nuevo borrador idéntico own-cloud-mail-20261002-02 observado en Chrome. Servicio false/Access deny, EMAIL ausente; pendiente nueva aprobación humana antes de probar envío idempotente. [Continuidad](AFW-OWN-MAIL-PILOT-2026-10-02.es.md).

2026-10-02, [piloto propio de correo preparado](AFW-OWN-MAIL-PILOT-2026-10-02.es.md): borrador privado en D1, hash verificado, cero intentos/recibos; pantalla Chrome observada con destinatario propio y aprobación habilitada. Operador propio abierto, servicio false/Access deny; EMAIL limitado y limitador preparados. Pendiente aprobación humana del mensaje exacto antes de consumidor cloud y aceptación idempotente; no envío ni cliente real.

2026-10-02, Access/proxy cloud aceptado tras corrección humana de ID y rotación/carga del secreto: [recibo actualizado](AFW-CLOUD-PROXY-CONNECTION-2026-10-02.es.md). Nueva tarea 01a0fd44-ed76-701d-8891-e028a2ce9032: bindings ready/red enforced; autenticado 404 JSON unavailable y control 403, curl returncode 0 en ambos. Consumidor restaurado deny; flags false/EMAIL ausente, sin envío. Vigencia conservada hasta 3 de octubre 10:50 Buenos Aires. Siguiente: mensaje propio revisable y consumidor idempotente con identidad exacta/rate limiter/aprobación trazable; luego disparador sin PC. No acredita JWT activo del Worker, envío ni gerente autónomo.

2026-10-02, [custodia cloud y diagnóstico de conexión](AFW-CLOUD-PROXY-CONNECTION-2026-10-02.es.md): dos bindings guardados y entorno publicado; nueva tarea con raíz/origin correctos y metadatos ready. GET con bindings y control devolvieron 401; no aceptación. Headers probados offline con datos ficticios correctos; causa de credenciales/proxy todavía abierta. Consumidor restaurado y verificado deny everyone; Worker cerrado, sin EMAIL ni envío. Siguiente: aclarar formato de la carga sin secretos, luego prueba acotada antes de consumidor propio idempotente. No repetir pruebas humanas canceladas ni declarar gerente autónomo/PC apagada.

2026-10-02, entorno cloud corregido y publicado: [aceptación de instancia nueva](AFW-CLOUD-INSTANCE-ACCEPTANCE-2026-10-02.es.md). Montaje/SHA comprobados; setup 689 y smoke 11/11. Tarea nueva creada y ejecutada, raíz recuperada. Tras fallo de sandbox, aprobación acotada por comando permitió 689/689 y smoke 11/11; lint/build pasan, servidor detenido y política global conservada. Siguiente: conexión mediada, correo propio idempotente y disparador con PC apagada; no acredita gerente autónomo ni cliente real todavía.

2026-10-02, diagnóstico cloud y auditor actualizado: [evidencia](AFW-CLOUD-ROOT-DIAGNOSIS-2026-10-02.es.md). Mount_path vacío frente a raíz Git en subdirectorio; start_skill corregido en borrador, setup antiguo 649 y smoke 11/11. Cambio de montaje/SHA todavía no confirmado por interrupción Chrome; no publicación ni tarea nueva. Auditor completo mantiene Level 4/5, 11 PASS y 5 FAIL, DNSSEC pending, sin puntaje numérico. Siguiente: reconectar pestaña, guardar montaje al commit verificado, probar candidato, publicar y aceptar tarea nueva antes de credenciales/disparadores.

2026-10-02, aceptación humana de correo completada: [recibo y conexión siguiente](AFW-MAIL-REVIEW-ACCEPTANCE-2026-10-02.es.md). Owner confirmó cancelación en pantalla; D1 primario cancelled/revoked, sin intento ni recibo. Canary nuevamente cerrado, flags false y operador deny everyone; versión `999794d2-1b10-4e08-8ea0-3ddd4b0b267e`. Siguiente: verificar custodia/conexión en runtime cloud antes de crear servicio; luego envío propio idempotente, cadencia con PC apagada y recorrido del cliente. No repetir la prueba humana ya aceptada.

2026-10-02, revisión canary lista: [recibo](AFW-MAIL-REVIEW-CANARY-2026-10-02.es.md), pantalla publicada y caso sintético draft. Operador habilitado solo para identidad propia con subject privado; consumidor false, Access deny everyone y sin EMAIL. Versión `6a1e244f-8386-45ea-8fd2-4ea2b67adbd4`; producción intacta. Solicitada aceptación humana aprobar→revocar; pendiente resultado y lectura D1. No acredita envío ni gerente cloud autónomo.

2026-10-02, revisión privada mínima: [pantalla de correo](AFW-MAIL-REVIEW-UI-2026-10-02.es.md) bajo identidad existente, un mensaje y decisiones explícitas; texto inerte, estado consultado, fallos sin reintento automático. Suite local 689/689; validación de build/CI del incremento antes de publicación. Canary sigue cerrado; no envío ni aceptación autenticada real. Siguiente: caso sintético custodiado y aceptación visual propia con alcance acotado, antes de consumidor cloud.

2026-10-02, canary de correo publicado y cerrado: [recibo](AFW-MAIL-CANARY-RELEASE-2026-10-02.es.md), versión `2f37fa85-7926-4ee9-919a-b086f876eff0` al 100%; dos custom domains protegidos por Access deny everyone, flags false y sin EMAIL/credenciales/cron. CI PR #163 aprobado, 686 pruebas; producción conserva `00861678-d968-41d3-be85-180896a321b7`. Siguiente: revisión privada mínima antes de pedir autenticación propia; envío cloud y cliente real siguen pendientes.

2026-10-02, controles privados de correo: [aprobación, revocación y consumidor separado](AFW-MAIL-PRIVATE-CONTROLS-2026-10-02.es.md) implementados; 686 pruebas y build aprobados. D1 canary dedicado vacío y dos aplicaciones Access con deny everyone provisionados. Configuración mantiene ambas funciones deshabilitadas, sin EMAIL ni credenciales de servicio. Dry-run correcto; todavía sin despliegue remoto. Siguiente: publicar canary cerrado y preparar revisión privada mínima; luego aceptación propia antes de conectar el gerente cloud o enviar a clientes.

2026-10-02, operador y conservación: [contrato privado](AFW-MAIL-OPERATOR-IDENTITY-2026-10-02.es.md) implementado localmente. Identidad JWT firmada, audience/origen/subject exactos, expiración obligatoria y actor opaco; limpieza manual de contenido finalizado antiguo preservando tombstones e intentos inciertos. 679/679, lint sin errores (advertencia previa de imagen) y build aprobado. No aplicación Access, endpoint, base de correo ni limpieza remotos creados. Siguiente: composición autenticada de aprobación/revocación con Origin/CSRF y servicio consumidor separado; luego canary propio antes de integrar cloud.

2026-10-02, integración de correo: recorrido completo custodia→decisión→outbox→recibo comprobado con SQLite real y proveedor sintético. Corregida autorización obsoleta durante reserva: segunda comprobación antes de invocar proveedor, cancelación sin envío cuando se retira el permiso. 676/676, lint sin errores con advertencia previa y build aprobado. No acredita identidad remota ni envío real. Siguiente: política de retención y composición autenticada en runtime privado; conservar envío cerrado hasta aceptación propia.

2026-10-02, custodia de correo: contenido inmutable, decisión ligada al hash y destinatario, actor opaco, vencimiento y revocación persistidos, recibos privados idempotentes por intento. Implementación local en `lib/mail-custody.mjs`, esquema separado de correo; 674/674 pruebas, lint sin errores con advertencia existente de portada y build aprobado. PR #161 previa pasó CI; este incremento requiere CI nuevo. No almacén remoto ni ruta autenticada activos. Siguiente: identidad de servidor, composición de custodia/consumidor y política de retención, antes de desplegar una prueba propia de envío.

2026-10-01, consumidor de correo: validación local 671/671, lint sin errores (advertencia existente de imagen en portada), build completo. Consumidor interno verifica hash/destinatario, autorización por callback de servidor, remitente hello fijo, intento único y espera acotada de proveedor. Prueba SQLite con proveedor sintético; no demuestra envío ni autenticación cloud. [Contrato de integración](AFW-MAIL-OUTBOX-DESIGN.es.md). Siguiente: custodia privada de contenido/recibos y decisión revocable en runtime AFW dedicado, antes de exponer conexión o probar envío propio.

2026-10-01, correo durable: [outbox separado](AFW-MAIL-OUTBOX-DESIGN.es.md) implementado localmente con aprobación ligada al hash, reclamación SQL única y resultado incierto sin reintento automático. 666 pruebas aprobadas y build completo; no consumidor, conexión cloud de envío, almacenamiento remoto ni envío activados. Consulta de correo sin novedades del piloto. La interfaz horaria avanzó hasta el próximo horario de las 22:00 BA, pero no expuso un recibo independiente de ejecución por cadencia: esa aceptación sigue pendiente. Siguiente: consumidor autenticado con contenido custodiado y recibos opacos; después prueba de envío propia desde cloud antes de usarlo con clientes.

2026-10-01, correo cloud: [primera lectura cloud comprobada](AFW-CLOUD-MAIL-ACCEPTANCE-2026-10-01.es.md), Gmail operativo verificado desde tarea web GPT-6.1 Sol bajo y seguimiento horario configurado. [Correo propio](AFW-EMAIL-READINESS-2026-10-01.es.md): envío Cloudflare y recepción hello en INBOX comprobados. No acredita aún primer run por cadencia/PC apagada, respuestas autónomas ni gerente de código: AFW Operations conserva el fallo de raíz. Siguiente: comprobar continuidad del seguimiento, envío mediado/idempotente y acceso real del primer piloto; conservar el recorrido dentro de su expediente propio.

2026-10-01, continuidad: [próximo paso delegado](AFW-DELEGATED-NEXT-STEP-2026-10-01.es.md) alineado en fuente con el copilot y decisiones pospuestas sin exportar memoria privada. 659 pruebas aprobadas; integración no activa ChatGPT. Plan de entrega ya publicado según [recibo vigente](AFW-DELIVERY-PLAN-RELEASE-2026-10-01.es.md). Nuevo intento del entorno AFW Operations publicado sigue fallando al resolver raíz; ninguna tarea/disparador cloud activo. Siguiente: cerrar checks/CI de lectura y preparar registro/callback real de ChatGPT.

2026-10-01: [plan de entrega durable](AFW-DELIVERY-PLAN-2026-10-01.es.md) implementado en fuente, 657 tests/lint/build aprobados; migración aditiva generada sin aplicación remota. Capacidad y responsable guardados, acceso no verificado y autorización ninguna; producción intacta. [Primera tarea cloud](AFW-CLOUD-FIRST-TASK-2026-10-01.es.md) intentada dos veces desde AFW Operations publicado: fallo del producto al resolver raíz, ninguna tarea creada. Borrador de diagnóstico abierto sin cambiar configuración. ChatGPT sigue pendiente de registro/callback y aceptación real; avanzar proyección útil de lectura mientras se resuelve arranque cloud.

2026-10-01: primer [asesor de entrega](AFW-DELIVERY-ADVISOR-2026-10-01.es.md) conectado en fuente a cápsula aprobada para entrega manual. Pregunta opcional por capacidad, una orientación por turno, ES/EN/PT; no infiere permisos por hosting/CMS, no ejecuta ni guarda elecciones informativas. No toca extracción de datos ni datos Tokenizart. Validación y publicación pendientes de recibo. Siguientes: prueba renderizada/entrega AFW, plan de entrega persistido, primera tarea gerente cloud y piloto ChatGPT real.

2026-10-01: [guía de adopción operacional](AFW-OPERATIONS-ADOPTION-GUIDE.es.md) preparada para el chat responsable Tokenizart/Atelier. Documenta ventajas medibles, interfaces del inbox existente, permisos/costos, implementación por etapas y aceptación con PC apagado. Ningún recurso Tokenizart modificado; disparador cloud y guardia permanecen pendientes. Siguiente AFW: primera tarea desde entorno publicado, después disparador real; asesoría de entrega del cliente mantiene su contrato separado pendiente.

2026-10-01, continuidad posterior: biblioteca de [experiencia de entrega](AFW-DELIVERY-EXPERIENCE.es.md) incorporada a AGENTS y gerente cloud desde recibos del caso Tokenizart/Atelier. Distingue WordPress/Hibou-cPanel/Donweb-VPS/Traefik, permisos temporales, rollback y discrepancia Markdown externa todavía pendiente. Hostinger no verificado. Próximo bloque de producto: asesoría de entrega por capacidades, separada del extractor de hechos, con pruebas antes de conectar al copilot productivo. El owner ya publicó AFW Operations; interfaz confirmó publicación del setup `01a0f7d3-a806-76c5-a024-6ddf4ccb401b`. Primera tarea y disparador/guardia siguen pendientes. Los estados anteriores debajo son históricos.

Última evidencia 2026-10-01: [entorno cloud listo para publicar](AFW-CLOUD-SETUP-2026-10-01.es.md). PR #148/#149 integrados; main 5c15c0a. Setup remoto final: 649 pruebas, build y smoke 11/11 aprobados, red restringida comprobada, GPT-6.1 Sol Bajo visible y continuidad guardada. El owner tiene Publicar disponible en su Chrome; falta confirmar publicación, primera tarea y disparador cloud. Inbox operacional sigue sin runtime/consumidor remoto; ninguna guardia activa. Las notas siguientes describen estados anteriores del mismo día.

2026-10-01: PR #148 integrado, 647 pruebas y CI build aprobados para inbox operacional; sin runtime ni consumidor activos. [Setup cloud real](AFW-CLOUD-SETUP-2026-10-01.es.md) iniciado y primer informe aprobado; nombre AFW Operations, modelo visible GPT-6.1 Sol Bajo, red limitada y Solo yo. Corregidas expectativas del smoke local, 649 pruebas locales; falta CI de esa corrección, refrescar setup, revisión/publicación y primera aceptación cloud. Producción sin cambios.

Dirección del owner, 2026-10-01: [operación cloud y mejora continua](AFW-CLOUD-OPERATIONS-DESIGN-2026-10-01.es.md), con **GPT 6.1 Sol bajo, Codex Cloud y cupo de suscripción** como vía preferida. [Runbook del gerente y entorno](AFW-CLOUD-MANAGER-RUNBOOK.es.md). Inventario, contrato saneado, inbox D1 transaccional y entrada firmada en desarrollo local; no probes, guardia, scheduler, API ni webhook activos. Próximo: completar revisión/CI y preparar/publicar entorno nuevo exclusivo AFW; verificar disparador y aceptación con ordenador apagado. Email Routing AFW leído: hello/hola/ola reenvían, no-reply descarta; sin prueba de buzón/entrega ni envío. Mantener pendiente el piloto ChatGPT de cliente; su OAuth no concede acceso administrativo.

2026-10-01: [selección OAuth del expediente](AFW-OAUTH-PROJECT-SELECTION-2026-10-01.es.md) implementada y comprobada localmente, 634 pruebas. Sin query propia, consentimiento muestra solo proyectos propios y exige selección si hay varios; vuelve a validar propiedad antes de emitir permiso. Canary cerrado y producción intacta. ChatGPT aún requiere registro/callback y aceptación interoperable. Nueva dirección del owner: evaluar control operativo independiente de su ordenador con Codex Cloud y disparadores; conservar estos cambios y separar ese control de los permisos del cliente.

Preparación siguiente, 2026-10-01: [piloto con cliente externo](AFW-REAL-CLIENT-READINESS-2026-10-01.es.md). Diferencias detectadas: registro/callback del cliente, selección segura del expediente durante consentimiento, duración breve sin refresh y guía delegada aún distinta del planificador del copilot. Corrección de estados de conexiones preparada localmente; canary permanece cerrado. Resolver esos contratos antes de pedir otra autenticación o afirmar interoperabilidad externa.

Estado vigente 2026-10-01: [aceptación OAuth real y cierre](AFW-OAUTH-ACCEPTANCE-2026-10-01.es.md). Consentimiento y lectura del proyecto sintético comprobados; después de desconectar, el cliente recibió rechazo con el token aún vigente. Ambos grants revocados. Canary deshabilitado y siete probes de cierre aprobadas; producción sin cambios. Los pendientes OAuth de los párrafos históricos siguientes quedan superados para este caso sintético. Próximo: preparar cliente compatible y recorrido de lectura útil de un expediente real, sin abrir producción por inferencia; A2A después.

Continuidad del intento OAuth: [corrección de políticas de navegador](AFW-OAUTH-CONSENT-FIX-2026-10-01.es.md), PR142 integrada (`6d42ac2`), canary fuente `7ade40e`, versión `27238a30-4ace-49de-bfec-d833449582a8`. Owner autenticado llegó a Permitir lectura, pero el primer intento dejó cero grants; corregidos contrato Origin/referrer y retorno CSP. Cliente nuevo esperando consentimiento; no pedir otro login por ese fallo. Lectura/retirada reales siguen pendientes hasta recibir evidencia del proceso; si el enlace venció, generar otro y conservar sesión Chrome.

2026-10-01: PR140 integrada (`5f60a23`), CI completo aprobado. [Canary delegado](AFW-DELEGATED-CANARY-2026-10-01.es.md) preparado con D1/KV/Access nuevos y datos sintéticos; guardas de plazo/límite comprobadas, 630 pruebas. Aceptación autenticada en edge pendiente; no mezclar su AUD ni recursos con producción. Próxima intervención del owner solo para consentimiento cuando se confirme la superficie remota.

Continuidad posterior: canary fuente `a3facaa` desplegado y habilitado en ventana acotada, versión `807bf611-a4e1-4bc7-bb6c-ffd2062da58b`. Siete probes antes y después aprobados, Access/discovery/challenge correctos; producción sin cambio. Falta consentimiento y retirada con cliente loopback real. El proceso genera enlace efímero (no conservarlo); si ya venció, reiniciar `node scripts/check-delegated-canary.mjs`. No confundir este canary sintético con activación OAuth del expediente productivo ni publicar discovery en el apex todavía.

Continuidad OAuth posterior: [bloque local completo](AFW-DELEGATED-OAUTH-LOCAL-2026-09-30.es.md), 628 pruebas y revisión independiente. Instalación restaurada; consentimiento, PKCE, lectura y desconexión comprobados con identidad sintética. Config desactivada por defecto, sin despliegue privado ni migraciones remotas. Próximo: canary aislado y aceptación real; no publicar discovery en el apex por esta prueba. Priorizar CI para builds pesados y conservar documentación histórica.

## Auditoria externa: bloque del 30 de septiembre

Primer bloque delegado implementado localmente: [lectura acotada](AFW-DELEGATED-READ-BLOCK-2026-09-30.es.md), 619 tests aprobados. Aun sin OAuth/endpoints privados de agentes. Dependencias locales parciales por ENOSPC; usar CI limpio para lint/build, restaurar entorno antes del siguiente adaptador. No publicar discovery por la sola existencia de estos modulos.

Propuesta de servicios reales para los pendientes OAuth/A2A: [diseno funcional](AFW-OAUTH-A2A-PROPOSAL-2026-09-30.es.md). Orden recomendado: acceso delegado de solo lectura al expediente, luego tareas A2A con evidencias y propuestas; escritura/publicacion permanecen etapas separadas. Propuesta no implementada ni piloto ampliado.

Consulta nueva de Cloudflare: perfil completo Level 4 (11 aprobadas, 5 pendientes); contenido Level 5 (6 aprobadas, 1 pendiente). No devuelve puntaje numerico. DNSSEC sigue `pending`, sin DS en el padre; no deshabilitarlo ni fabricar descriptores OAuth/A2A. Evidencia y orden de remediacion: [recibo externo](AFW-EXTERNAL-AUDIT-2026-09-30.es.md). La evidencia publica actualizada conserva el baseline; verificar su despliegue antes de afirmar que ya esta publicada. Siguiente incremento comprobable: validar DS y DNS-AID tras la publicacion automatica del Registrar, luego evaluar autenticacion para una API agéntica real.

Actualizado: 2026-09-30. Fuente inicial: [microauditoría](AFW-MICROAUDIT-2026-09-30.es.md), base `9f3d869822080a2f30a242c3fdd29b5ad4bbc392`. MA-01..05 ya están implementados y desplegados: [recibo actual](AFW-GUIDED-RELEASE-2026-09-30.es.md). Los cierres privados y bloques posteriores se distinguen abajo. Conservar la historia de entregas.

## Resultado que dirige el trabajo

Una persona debe poder expresar un objetivo sin conocer protocolos, recibir una interpretación revisable, continuar con una pregunta útil, pausar y volver, y comprobar una mejora concreta. El copilot mantiene el hilo y explica el motivo de cada paso. El nivel objetivo depende del negocio, el momento y el sitio; puede terminar en descubrimiento o contenido suficiente y cambiar después.

No usar «expediente completo», cantidad de archivos o puntaje propio como sustitutos de ese resultado. Separar datos aportados, hipótesis, observaciones, objetivo acordado, permisos y cambio verificado.

## Punto de partida de la microauditoría inicial

- Repo canónico: `tokenizartinfo-ops/agent-friendly-web`; web: `https://agentfriendlyweb.dev`.
- Entrega de referencia: [procedencia y prueba privada](AFW-COPILOT-SOURCE-HINTS-RELEASE-2026-09-30.es.md). Fuente funcional integrada en `cff6ae06e23f1b7a4a5793c8493158b2209730dd`; recibos posteriores están en `main`.
- Última versión documentada del Worker: `8b327ba8-5ef9-424e-a335-464ad50a8c01`; verificar de nuevo el deployment antes de una publicación. No se consultó Cloudflare durante esta microauditoría.
- Piloto exacto: `6e972c18-cae1-402b-b959-646abd8499d7`; el copilot y la vista breve no están abiertos para todos los expedientes.
- Texto de trabajo, permisos durables y campos revisados existen. Las decisiones conversacionales y la cola de propuestas aún no se recuperan entre sesiones.
- La cuenta documentada para el piloto privado es `tokenizart.info@gmail.com`. El correo de administración compartido no autoriza recursos de otro proyecto.

## Orden de bloques

| ID | Prioridad y dependencia | Resultado entregable | Criterio de cierre |
| --- | --- | --- | --- |
| MA-01 | Primero; M01 | Contrato coherente de objetivos | Una intención explícita de consultar una API puede confirmarse como `tools`; genera horizonte correcto. Texto libre no se guarda como categoría nueva. Negaciones y ambigüedades no activan categorías. |
| MA-02 | Después de MA-01; M02 | Planificador de etapa con una intervención principal | No dice `done` por seis casillas; objetivo precede a detalles técnicos innecesarios. El mismo contexto produce una sola pregunta o revisión, con razón visible. |
| MA-03 | Después de MA-02; M03 | Memoria mínima de decisiones | «No lo sé», aceptar, descartar y pregunta activa sobreviven a recarga. Conflicto entre dos pestañas no pierde decisiones. Hay límites, retención y revisión del esquema. |
| MA-04 | Después de MA-03 | Vista breve que conduce el hilo | Una tarea y una acción principal; texto/audio como alternativas. Resumen de guardado siempre visible. Vista completa optativa; errores y sesión caducada conservan el modo breve. |
| MA-05 | Después de MA-03, integrando MA-04; M04 | Contexto acotado y evaluación del copilot | El servidor prepara contexto del expediente propio; no envía todo el historial. Corpus reproducible detecta nombre genérico, negación, corrección y contradicción. La IA propone; el servidor decide acciones permitidas. |
| MA-06 | Después de MA-04/05; M06 | Una entrega verificada de punta a punta | Objetivo → alcance → propuesta de archivos → entrega → implementación declarada → nueva observación comparable. No presentar archivo preparado como desplegado. |
| MA-07 | Después de MA-06; M05 | Piloto de dos clientes/identidades | Dos sujetos Access y dos expedientes aislados; invitar, pausar, volver y retirar acceso funcionan. Revisar política/operación antes de datos reales. Nunca abrir por comodín. |
| MA-08 | Después de MA-06; puede preceder apertura amplia | Seguimiento y novedades dentro de AFW | Bandeja del expediente con cambios relevantes y una acción por novedad; distingue observado/declarado y fecha. Preferencia de seguimiento no se presenta como tarea activa sin scheduler probado. |
| MA-09 | Después de MA-05/06 | Enriquecimiento público con fuentes | Reutiliza scanner; Firecrawl solo para una pregunta faltante, dominio permitido, límites y costo. Propuesta con URL/fecha/cita, contradicción explícita y revisión antes de guardar. |
| MA-10 | Tras probar utilidad con clientes | Escala comercial y transformación progresiva | Paquete repetible con alcance/entregables verificables, soporte y mantenimiento. Mapa de procesos y corpus preceden skills/MCPs internos. Subdominio agéntico y cerebro empresarial se evalúan como capas opcionales. |

MA-01 a MA-05 forman el segmento desplegado. Cerrar primero su aceptación privada y la evidencia vertical de MA-06. MA-07 tiene identidades de prueba preparadas; MA-09/10 siguen como horizontes, sin implementación masiva ni fechas inventadas. La prueba vertical local de contenido/servicios se distingue de una instalación en cliente.

## Especificación breve de los próximos bloques

### MA-01 — Objetivo interpretado y confirmado

Usar `goalGuidance` con cita validada como entrada de una propuesta de interpretación, no como categoría ya aceptada. Correspondencia declarada: `discover → discovery`, `explain → content`, `query → tools`, `act → actions`, `transact → payments`. La persona confirma la interpretación; no equivale a autorización de acciones o pagos.

Eliminar la extracción de `goals` en texto libre del proveedor y rechazar ese campo en la salida revisada de este contrato. Mantener `goals` en el expediente y la guía normal: se modifica con opciones canónicas tras revisión. Conservar cualquier valor histórico desconocido, pero no usarlo para decidir que ya se conoce el horizonte. No migrar datos antiguos por heurística.

Entrada de ejecución exacta: [plan MA-01](superpowers/plans/2026-09-30-afw-goal-contract.md).

### MA-02 — Una decisión siguiente, vinculada a la etapa

Crear un contrato de turno con `kind`, `stage`, `field` o `actionId`, `reasonKey` y `basedOnRevision`. Prioridad: recuperar guardado/sesión/conflicto → resolver una contradicción pertinente → confirmar objetivo → revisar una propuesta pertinente → pedir un dato necesario para ese objetivo → ofrecer síntesis/preparación. Una pregunta puede quedar pendiente sin bloquear todos los demás pasos.

Etapas iniciales: `orientation`, `intake`, `scope_review`, `delivery_review`, `verification`. Son etapas de trabajo, no niveles AF. «Datos suficientes» no significa que la publicación esté lista. Mantener el orden del modelo determinista y comprobable; la IA aporta candidatos o redacción, no permisos.

Archivos principales: `lib/copilot-next-turn.mjs`, `lib/intake-question-coach.mjs`, `lib/scope-question-guide.mjs`, `lib/proportional-target.mjs`, `app/components/intake-intelligent-copilot.tsx`. Evitar que dos guías hagan preguntas distintas al mismo tiempo. Prueba clave: sitio informativo sin necesidad de herramientas no recibe una exigencia de MCP ni un bloqueo por hosting durante orientación.

### MA-03 — Conservar el hilo con el menor estado necesario

Diseñar primero un estado privado por expediente: objetivo confirmado, campos pospuestos, decisiones de candidatos y siguiente turno, con revisión propia y revisión base del expediente. Persistir IDs y metadatos mínimos; definir cuándo se necesita conservar el valor/cita y durante cuánto tiempo. No convertir `project_events` en copia del relato.

D1 + control optimista es la opción inicial; no agregar Durable Objects salvo requisito concreto de coordinación persistente demostrado. GET/PUT propietario, origen exacto, cuerpo acotado, idempotencia y recuperación de conflicto. Migración aditiva, rollback de código conservando datos y prueba de restauración. No persistir archivos de audio por conveniencia.

### MA-04 a MA-06 — Un corte vertical usable

La interfaz consume el turno y el estado anterior. Muestra una propuesta o pregunta; las demás quedan en segundo plano y recuperables. «Guardar» refleja confirmación del servidor. Un fallo recuperable muestra una salida simple sin abrir todas las secciones. Una síntesis pequeña permite revisar organización, objetivo, fuente y siguiente acción.

Después, contexto mínimo del copilot preparado por servidor y evaluaciones. El caso final debe pasar por una entrega real controlada o una simulación claramente rotulada; solo una comprobación externa convierte implementación declarada en observada. El informe muestra antes/después, fecha, límites y cambios, sin prometer ranking, clientes o puntuaciones universales.

## Instrucciones de continuidad para GPT-6 Sol

1. Leer `AGENTS.md`, este documento y el plan del primer bloque pendiente. Consultar la microauditoría solo para el hallazgo que se va a resolver. No cargar todos los recibos o el vault de Tokenizart.
2. Verificar árbol limpio, rama, `origin` y revisión de `main`; preservar cambios ajenos. El checkout de trabajo conocido es `C:/Users/gabri/OneDrive/Documentos/Agent Friendly Web Worktrees/afw-release-reconciliation`, pero verificarlo antes de usarlo.
3. Continuar aceptación privada del caso API después de PR #119 y MA-06 desde el recibo actual; no rehacer MA-01..05. Contenido/guardado/pausa/recarga/acceso a entrega ya se probaron en Chrome. Luego MA-07 con los expedientes sintéticos de las dos identidades del owner, sin ampliar por inferencia el piloto del copilot. Los apartados de punto de partida anteriores describen la microauditoría inicial; el recibo actual y la tabla de estado prevalecen para continuidad.
4. Tomar un bloque con resultado y cierre, implementar y probar el comportamiento. Al aprobarlo, continuar el siguiente dentro del alcance autorizado; informar solo hitos, riesgos reales o una acción humana estrictamente necesaria.
5. No remendar cada síntoma con un mensaje adicional. Si el problema es de estado, contrato u orden de preguntas, corregir esa capa y usarla desde la UI.
6. Mantener identidad, consentimiento, compuerta del piloto, confirmación de propuestas y distinción entre datos e implementación. No ampliar permisos por haber alcanzado una etapa o puntaje.
7. Navegador: usar el autorizado en la sesión vigente. Gabriel autorizó el navegador integrado el 2026-09-30; la sesión privada A funciona allí. No abrir otra instancia de Chrome ni cerrar o reclamar pestañas de Atelier/Tokenizart de otro chat.
8. Para cada publicación remota declarar `PROJECT`, `REPOSITORY`, `ENVIRONMENT`, `ORIGIN`, `RESOURCE_TYPE`, `RESOURCE_ID`, `ALLOWED_ACTION`, `ROLLBACK`. Compartir cuenta no comparte recursos.
9. Pruebas proporcionales: lógica de contrato, identidad y concurrencia; un recorrido UI relevante y casos de error. Antes de publicar: `npm test`, `npm run lint`, `npm run build`, CI y fuente del artefacto. La cuenta de tests no demuestra usabilidad.
10. Una respuesta perdida exige comprobar el resultado antes de reintentar. Prueba privada y smoke anónimo acreditan cosas distintas. La presencia de un archivo o PR no acredita despliegue.
11. Cerrar cada bloque actualizando su estado, evidencia, pendientes, versión/rollback si aplica y el siguiente bloque. Dejar una sola entrada de continuidad; conservar recibos históricos sin reescribirlos.
12. Si aparece una decisión de privacidad, nueva audiencia, envío externo, gasto o acceso que excede el alcance vigente, preparar el resultado revisable y pedir solo esa decisión. El owner ya autorizó avanzar entre bloques ordinarios.

## Prueba de producto que debe dirigir el segmento

Caso A: una pyme informativa desea explicar servicios. Caso B: una organización desea consultas de catálogo mediante API. Caso C: una empresa contempla reservas más adelante. Cada caso aporta un relato multitema; AFW confirma objetivo, conserva datos, admite desconocidos, pausa y retorno, y explica un siguiente paso diferente. No exige llegar a AF-5. Caso B verifica que un objetivo de herramientas no se degrada a contenido por un contrato roto; Caso C verifica que un deseo futuro no activa transacciones.

Errores mínimos: sesión caducada, envío duplicado, respuesta tardía, cambio del expediente durante inferencia, dos pestañas con revisiones diferentes, permiso revocado y fallo de guardado. Preservar palabras y decisiones confirmadas sin afirmar un guardado no comprobado.

## Medición mínima y carriles separados

Medir en pruebas de producto: tiempo hasta primer objetivo confirmado, repreguntas de datos ya dados, recuperaciones después de pausa, proporción de candidatos corregidos y entregas comprobadas. No fijar metas numéricas hasta tener una línea base. Eventos mínimos sin relatos/PII; no introducir analytics de terceros para este segmento.

La revisión de Cloudflare del jueves 2026-10-01 compara mismo origen/perfil y fechas; no bloquea MA-01 a MA-06. Mantener puntaje AFW, objetivo proporcional y resultado externo separados. Una calificación alta solo vale si se sustenta en capacidades relevantes realmente disponibles.

## Estado de ejecución

| Bloque | Estado al 2026-09-30 | Evidencia |
| --- | --- | --- |
| Microauditoría y traspaso | Documentado | Hallazgos reproducidos localmente; código y límites registrados. |
| MA-01/02 | Implementados/desplegados | Objetivos canónicos y un turno con razón/revisión; PR #118. |
| MA-03 | Implementado/desplegado | Sesión atómica y migración 0009; pruebas de conflicto/recuperación y restore SQLite local. |
| MA-04/05 | Implementados/desplegados; aceptación privada parcial | Contenido, guardado, pausa/recarga y entrega probados. Con A autenticada se recuperó la interpretación API, se revisó/guardó y persistió tras recarga sin pagos. No acredita nueva inferencia en esa continuación. Ver recibo privado. |
| MA-06 | Recorrido integral sintético cerrado; cliente externo pendiente | [Aceptación integral](AFW-INTEGRAL-ACCEPTANCE-2026-09-30.es.md): misma cápsula revisada/aprobada/descargada → archivo exacto instalado → auditoría 9→17 AF0 → comparación coincidente recuperada tras recarga. Historial conservado y destino temporal retirado. No acredita entrega externa ni instalación de v2 sobre el apex. |
| MA-07 | Escritura cruzada comprobada; política QA retirada | [Recibo vigente](AFW-CROSS-WRITE-ACCEPTANCE-2026-09-30.es.md): escritura rechazada y D1 intacta; owner conserva acceso. Solicitud B sin correo compatible con bloqueo OTP documentado. No exigir código a un usuario retirado; revocación de un token B activo no probada. |
| MA-08 | Feed acotado implementado/desplegado | Observaciones compatibles/fechadas; sin scheduler ni bandeja persistida acreditados. |
| MA-09/10 | Horizonte posterior | Requieren entrega útil acreditada y límites de fuentes/costes. |

## Apertura de producción

Actualización2026-10-01: plan de entrega persistido y disponible durante revisión/comparación pendiente, sin conceder acceso ni publicación. Guardado, reapertura y conflicto entre pestañas comprobados en Canary. Producción fuente4788e5a, versión00861678-d968-41d3-be85-180896a321b7 activa, con smokes y hash específico después de convergencia del despliegue. [Recibo y procedimiento](AFW-DELIVERY-PLAN-RELEASE-2026-10-01.es.md). Siguientes bloques: comprobación real de accesos por método, consulta delegada desde ChatGPT y primera tarea cloud (aún bloqueada al iniciar; no guardia24/7). No repetir aceptación ya completada ni trasladar datos privados a herramientas externas por esta actualización.

La web está desplegada; el recorrido privado todavía no está abierto a clientes generales. Seguir [la puerta de salida para beta acompañada](AFW-PRODUCTION-OPENING-2026-09-30.es.md): corrección de mensajes → entrega real controlada → aislamiento/retirada → habilitación acotada → primer cliente. No ampliar el piloto por inferencia.

Continuidad vigente tras PR #126: comenzar por MA-07, no repetir la entrega sintética. La sesión del owner confirmó aprobación y lectura coincidente. Se solicitó la segunda identidad para escritura cruzada; si el navegador no controla la pestaña anterior, recuperar control antes de afirmar una petición remota. Procedimiento de beta preparado en [operaciones](AFW-BETA-OPERATIONS-2026-09-30.es.md); rollout productivo aún de un solo expediente.

Continuidad posterior a PR #128: la escritura cruzada ya fue comprobada y QA retirada. No repetir login B esperando OTP: la falta de correo es compatible con el bloqueo y Cloudflare no envía códigos a usuarios no permitidos. Chrome del owner está autenticado. MA-08 pasó pruebas de origen/metodología/historial; aceptación del desplegable y su acción sigue pendiente porque el control de Chrome no ejecutó el clic. Próximo trabajo operativo: aceptación de seguimiento y recorrido del piloto, preparar paquete de primer cliente sin habilitar identidades externas por inferencia. Revocación de token activo, scheduler y presupuesto diario no acreditados.

Continuidad de guía tras comparación: corregir la indicación de entrega cuando todos los archivos de la cápsula aprobada coinciden en la última lectura. El mensaje debe referirse a esa lectura fechada, permitir repetirla y no implicar certificación del sitio, despliegue por aprobación ni vigencia permanente. La comprobación exige cápsula/manifiesto, conjunto completo de rutas y hashes propuestos compatibles; comparaciones incompletas o antiguas de otra versión no sirven. Validación privada del mensaje pendiente hasta recuperar control de Chrome; el sitio sintético del ensayo MA-06 fue retirado y su lectura guardada sigue siendo histórica.

PR #130 desplegada: fuente `6c822c5`, versión `8c36db0d-4bba-4af3-bdb1-1bf14c582a83`, 100 %, 11 comprobaciones previas y posteriores aprobadas. [Recibo vigente de guía](AFW-OBSERVED-GUIDANCE-RELEASE-2026-09-30.es.md). Próximo bloque MA-08: evitar confundir falta de consulta con ausencia de observaciones. Chrome no disponible para control; aceptación visual pendiente, sin repetir login.

Corrección MA-08 preparada: las novedades distinguen consulta pendiente/fallida de historial vacío confirmado. La confirmación se liga a expediente y sitio guardado; reintentar solo recupera las observaciones, no crea una auditoría. Aceptación visual pendiente; consultar el próximo recibo de despliegue antes de atribuirlo a producción. [Paquete de primer cliente](AFW-FIRST-CLIENT-PACKAGE.es.md) preparado para una beta acompañada; sin identidad externa ni rollout ampliado.

PR #132 desplegada: fuente `644e605`, versión `0f3eb3e6-38dd-46b7-9a1d-a31f92e47001`, 100 %, 11 comprobaciones previas/posteriores aprobadas. [Recibo vigente de novedades](AFW-UPDATES-READ-RELEASE-2026-09-30.es.md). Incluye la guía de PR #130 y el paquete preparado del primer cliente. Sigue pendiente aceptación visual privada, caso API del piloto y concreción de cliente externo; no abrir otra identidad ni repetir MA-06/07 por defecto.

MA-08 aceptación manual parcial: el owner confirmó que Novedades abre Entrega y muestra la fecha de observación en su Chrome. [Recibo manual](AFW-UPDATES-MANUAL-ACCEPTANCE-2026-09-30.es.md): declaración del owner, sin captura ni control del agente; mensaje de guía y fallos de lectura privados siguen separados. Ajuste preparado para reabrir entrega después de cerrarla manualmente y llevar el foco al resumen, sin ampliar el formulario.

PR #134 desplegada: fuente `7c049da`, versión `c6175cff-42ca-490d-8507-96c5fce23126`, 100 %, 11 comprobaciones previas/posteriores aprobadas. [Recibo vigente de navegación](AFW-DELIVERY-NAVIGATION-RELEASE-2026-09-30.es.md). Reapertura repetida probada localmente; aceptación de navegador no acreditada. Conservar la confirmación manual de MA-08 sin exigir otro login ni repetir el camino normal por defecto.

Confirmación posterior del owner: mensaje de coincidencia histórica de PR #130 visible y transcrito, con cápsula v1/manifiesto compatible con MA-06. Cierra la aceptación manual de esa guía; no acredita nueva lectura ni disponibilidad actual del destino retirado. [Recibo manual actualizado](AFW-UPDATES-MANUAL-ACCEPTANCE-2026-09-30.es.md). No repetir la pregunta de mensaje. Continuar inferencia/revisión/guardado del piloto; reapertura repetida y fallos de consulta siguen probados localmente, sin aceptación privada adicional.
