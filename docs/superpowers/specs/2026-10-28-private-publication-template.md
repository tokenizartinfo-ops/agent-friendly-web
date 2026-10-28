# Plantilla pública del publicador privado
Fecha: 28oct2026. Proyecto AFW, repo tokenizartinfo-ops/agent-friendly-web, base6849501d.

## Resultado y alcance
Preparar el publicador de una revisión nueva en GitHub Actions sin trasladar bundles por el PC ni incrustar un plan vigente en Git público. Es preparación de código, no publicación, consentimiento, invocación ni readiness.

## Decisión de implementación
El owner delegó decisiones y pidió encadenar bloques cloud sin consultas de rutina. Root elige una plantilla específica de publicación: reutiliza el compilador y la validación nativa existentes, pero conserva un formato y slot distintos de confirm_named. No se altera la plantilla de confirmación aceptada. Seguir descargando ZIPs contradice la preferencia cloud; incrustar una ventana de diez minutos durante el build mezcla tiempos y custodia.

## Contrato
- buildMcpPrivatePublicationTemplate(bundle) acepta únicamente un bundle validado de operación publish con startAt0/expiresAt1; captura por valor antes del primer await.
- Omite COMPLETAMENTE la policy del seed; solo el artefacto público y un literal reservado entran en el bundle. No toma un target arbitrario.
- Manifest exacto: format,templateHash,templateBytes,slot,artifactKey,workerHash,programHash,artifactSourceRevision,artifactSourceTree,materializedfalse,remotePublishedfalse. artifactKey deriva del account/Worker fijos y workerHash.
- materializeMcpPrivatePublication({template,manifest,policyJson,expectedTemplateHash}) es una operación pura sin red/filesystem ni reloj o autoridad. Captura el manifest antes del await; comprueba hash separado, bytes UTF8, formato, slot único, hashes y procedencia.
- policyJson canónico exacto: operationpublish,startAt,expiresAt,pins. Ventana finita hasta600000ms; pins exactos de RELEASE_TARGET y baseVersionId UUID. Sin credenciales, valores de secretos ni propiedades adicionales. No se convierte en autorización por haber ensamblado.
- Caps: plantilla y resultado2097152bytes; policy65536bytes. Sustitución por slices+JSON.stringify, sin semántica de reemplazo especial. Error único sin cause/contenido.
- Script build-only verifica Git antes/después, compila Worker propio y materializador sin dependencias nuevas; genera template.mjs,materializer.mjs,template.json y build.json públicos, sin index materializado ni policy.json.
- Workflow contentsread, sin secrets ni environment, PR propia o dispatchmain, Ubuntu24.04/Node22,15min/7d artifact. Sin deploy, invocación, cron, permisos o credenciales.

## Cierre y límites
TDD en Actions, npm test/lint/build y workflow de paquete; un revisor final fresco de toda la rama y una pasada de correcciones materiales; merge y CI main. Publicación nativa futura debe verificar de nuevo versión/configuración actuales, rollback, identidad, custodia y resultado; no reutilizar planes0→1 ni recibos consumidos. El código622 sigue separado del runtime congelado0b/c56 hasta una promoción privada aceptada.
