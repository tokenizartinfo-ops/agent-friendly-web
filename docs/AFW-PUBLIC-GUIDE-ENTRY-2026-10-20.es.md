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
