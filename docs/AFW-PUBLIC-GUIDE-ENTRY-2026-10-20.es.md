# AFW — entrada conversacional de la guía pública, 20 octubre 2026

Bloque acotado ejecutado en GitHub según autorización de mejora continua del owner. Diseño previo: issue497,comentario6299660546. Fuente integral base2f2b4a7267ebdb9f073dfda260fbee128505e660; runtime público sigue separado.

## Problema comprobado
El ensayo compilado previo39482674742 mostraba getting_started para ES “Quiero saber por dónde empezar” y clarification para EN “I want to know where to start” / PT “Quero saber por onde começar”. El catálogo ya contenía el primer paso localizado, pero explicitTopic no reconocía esas formas normalizadas. También faltaba un acceso visible desde la introducción al textarea, situado después de una conversación de altura mínima400px en móvil.

## Cambio previsto y límites
Ampliar solo frases concretas de comienzo, conservando el orden existente: credenciales se bloquean primero; intenciones de precio/privacidad/acciones/auditoría no son desplazadas por “por dónde empezar”. Palabras sueltas como start/iniciar no bastan. La conversación continúa hacia audit_process sin cambiar contratos, temas, contexto o fuentes.
En la cabecera existente de la guía, ancla localizada al textarea existente: visible al entrar, activable con teclado, destino enfocado y visible. Mantener explicaciones, límites y conversación desplazable; no esconder contenido para encajar controles. Foco visible, sin introducir movimientos ni peticiones remotas.

## Verificación y evidencia
Tests antes de producto: test/public-guide.test.mjs usa preguntas naturales, continuación y controles negativos. Browser QA de la rama compila la app real, workerd con config explícita local-only/D1 vacío y Chromium1.64.1 en runner GitHub efímero. No es mock de UI.
Proyecto/revisión se verifican contra checkout. Solicitudes del navegador soloGETloopback/data, sin rutas privadas/modelos/credenciales. Límites de archivos/inventario antes/después; finally cierra browser/proceso/puerto propio. Esta ruta no es descarga de artefacto: califica la compilación de la revisión de la rama y conserva sus hashes, no hereda el ZIP congelado5a.
CasosES/EN/PT en1440x900 y390x844, teclado/entrada/ancla/respuesta y capturas. Chromium y dependencias solo runner, no ordenador del owner. Capturas públicas sintéticas, sin clientes.
Ruling: patrón de scripts Playwright ya establecido en el repositorio, sin @playwright/test ni instalaciónCLI local; command-v-npx se comprueba en runner.

## No acreditado por este bloque
Publicación Cloudflare, configuración/hostingparity, accesibilidad completa, dispositivos físicos, identidad/consentimiento privado, modelos/eventos/Containers, guardia permanente, PC-off ni pilotoMax. operationalReadiness=false. No permisos/tokens/OTP/cron/correoMax. Soporte02382110 conserva su investigación y monitorPAUSED; no repetirG2.

## Integración
Una revisión final fresca de rama completa antes de main. Publicación necesita backport mínimo separado desde la rama pública vigente, preservando su triggerCI. No desplegar main integral ni atribuir este resultado a producción. Reversión de fuente por este diff; sin datos que revertir.

## RED observado antes de cambiar producto
Commit18cde2e8 solo tests/QA: browser39485129937/job118843454855 falló “visible question anchor is present: es-1440”, actual0/expected1, después de compilar y abrir HTML real. Limpieza finally se ejecutó antes de preservar evidencia.
CI39485129968/job118843455126:2470PASS/2FAIL/1SKIP. Falla esperada de pregunta natural “No sé cómo comenzar con mi sitio”:clarification!=getting_started. Además falló un test OAuthHTTP ajeno al diff con503; no atribuir a esta corrección ni declarar todoREDlimpio. El siguiente CI completo debe resolver/comprobar ese resultado sin relajar su test.

## Diagnóstico del salto al campo
La primera prueba tras la corrección mantuvo foco real, pero el casoEN390 situó el textarea en y=-0.078125px, alto66.59375px, scrollY1374. Diagnóstico39486193302/job118847106982 conserva geometría y captura; no se trató como pérdida de foco ni se relajó la aserción. Se añade scroll-margin-top16px al destino para que el borde y su indicador de foco queden dentro del viewport con margen. Sin JS de navegación ni scroll manual del arnés.
CI39485816241/job118845819378 del primer producto corrected pasó2472/0/1,lint0errores/8advertencias previas/cinco builds, incluido el testOAuthHTTP sin modificación. El503 inicial no se reprodujo allí; causa todavía no acreditada, sin cambiar permisos ni afirmar reparación remota.

## Ruling por inspección visual y RED de visibilidad
Las primeras aserciones solo comprobaban boundingBox dentro del viewport; las capturas revelaron la cabecera sticky cubriendo el campo y respuestas fuera de la vista. Se añadió RED separado contra el producto sin cambiar:cc99cf2e, native39487075046/job118850145928. Falló de forma esperada:campoES390 y16.06 debajo de cabecera66 (hit-testfalse), párrafoES1440 y-104.66 /ES390 y-525.89. No acreditar esas capturas anteriores como usabilidad aceptada.
Ruling: el objetivo es ver pregunta Y respuesta. El ancla alinea el campo hacia la zona inferior mediante scroll-margin-top:max(112px,100svh-240px), dejando cabecera y zona de conversación visibles. El efecto existente desplaza solo el panel interno al comienzo del último mensaje, en lugar de esconder el inicio de una respuesta larga al alinear siempre su final. No se desplaza la página desde JS ni se roba foco. Esto amplía el diff al efecto existente de PublicGuideChat dentro del mismo recorrido acotado; coste si falla:posición de lectura, comprobada en navegador antes de integración.
La prueba ahora mide solapamiento con cabecera y hit-test del textarea, y que el párrafo de respuesta quede completamente dentro de la zona visible/recorte del panel. No relaja la aserción anterior ni invoca scroll auxiliar para hacerla pasar.
