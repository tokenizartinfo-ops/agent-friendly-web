# AFW: revisión cloud del artefacto público
20oct2026. Cambio acotado de QA; no publicación ni prueba de producción.

## Pregunta y criterio de cierre
¿El paquete público aceptado de PR526 conserva texto, enlaces y presentación legibles en ES/EN/PT a1440×900 y390×844? Renderizar el MISMO ZIP desde su revisión/fingerprint, en un runtime nativo local del runner GitHub y navegador efímero; no volver a compilar el producto ni usar el ordenador del owner. Capturas y observaciones deben indicar revisión del arnés y del producto por separado. Cerrar solo tras observar el ensayo y revisar imágenes reales; una CI verde no sustituye inspección visual.

## Opciones y decisión
Se elige la previsualización efímera del artefacto en Actions. Evita un build/browser local y no necesita cargar una versión remota a0% antes de examinar el texto. Una previsualización local consumiría el equipo; una candidata remota exige preservación/configuración y canal de publicación propios que siguen separados. La lectura genérica del sandbox Cloudflare rechaza el dominio AFW por política de salida: no se intenta eludirla ni se trata como fallo del sitio. Este ensayo ejecuta el paquete propio en loopback aislado, no proxifica ese dominio.

## Entradas inmutables y autoridad
Repositorio tokenizartinfo-ops/agent-friendly-web; rama pública base5a8376d5d70dbb007190cd2eae23b10651a70f49, árbol51c14988. ZIP de CI39478721753, artefacto12289664737, SHA256c9b53eaefa6b92818f480656da14017ac4564b25b56fc446f5e7e3ffe644e878,2759679bytes, vence27oct18:54:55UTC. Revisión de arnés separada. Si vence, cambia el hash o falta una ruta esperada, fallar cerrado; nunca descargar otro artefacto por inferencia.

La identidad efímera GitHub tiene contents:read/actions:read solo para descargar este artefacto. Checkoutsin credenciales persistidas; token restringido al paso de descarga y no entregado al runtime/navegador. No credenciales Cloudflare, datos de usuarios, DDL remoto, modelos o servicios. Workflow solo PR propia por rutas exactas; sin cron, dispatch automático, publicación, guardia o PC-off.

## Ensayo previsto
Comprobar huella ZIP/metadata de origen antes de extraer: máximo16MiB comprimido,64MiB extraído,8MiB/archivo,1024entradas; negar cifrados, duplicados, enlaces y escapes de ruta. No ejecutar configuración generada del artefacto ni heredar recursos remotos.

Arrancar únicamente el programa compilado y sus assets en127.0.0.1 dentro del runner. Configuración efímera explícita: fecha2026-09-01 y flagsnodejs_compat/global_fetch_strictly_public de la versión pública leída20oct19:05UTC; assets y una D1 local vacía, sin AI, bindings remotos o identidad. No prueba paridad completa de producción.

Abrir portada y guía en tres idiomas/escritorio-móvil. Comprobar contenido revisado, un h1, idioma, falta de overflow, CTA/enlaces y comportamiento de orientación con mensaje sintético; teclado y movimiento reducido. No activar diagnóstico, WebMCP externo, expediente privado, login o permisos. Bloquear en el navegador toda salida externa y toda solicitud de escritura. Guardar errores saneados y capturas antes/después pertinentes. Terminar Chromium y proceso nativo aun si falla; jobmáximo10min. Los paquetes/browser solo se instalan en runner efímero.

Primero workflow sin implementación: RED esperado por herramienta ausente antes de instalar dependencias/browser; luego herramienta y ensayo real. Probar el flujo real, no agregar tests que reflejen el texto. Una revisión del conjunto al final. Fuente rollback a5a8376d5; sin runtime real que revertir.

## Qué no acredita
No certifica WCAG, lector de pantalla, prueba humana final, configuración/Access/identidad/D1/modelo real, hosting Cloudflare de la candidata, recepción de eventos, Containers, guardia Codex, PC-off o Max. G2 cerrado/noOTP; operationalReadiness=false. El programa/ZIP inspeccionado sigue5a8376d5 incluso si se integra después el arnés; no sustituirlo por todo main o por otro build. Nueva candidata futura necesita fingerprint y revisión explícitos.

## Primera ejecución real y revisión visual
B987d876, Actions39481514563/job118830993367,20oct19:13UTC:6casos reales de UI compilada,18capturas y2contactos; ZIP original337archivos/5471826bytes, inmutable antes/después. Sin errores de navegador, respuestasHTTP>=400 o solicitudes externas/de escritura en el navegador. CI separada39481514541:1158PASS/0FAIL/0SKIP, lint0errores/2advertencias previas, cinco builds. [Capturas e inspección](evidence/2026-10-20-public-copy-preview/README.md). Se conservan como evidencia de ESTE arnés y del producto5a8376d5, no de producción ni de una revisión futura.

Auto-revisión posterior: finalmente anidado para que un rechazo de browser.close no omita la terminación nativa; se añade comprobación TCP de cierre del puerto propio. Exige nuevo ensayo de ese arnés; los recibos exactos quedan en PR527. No se recompila ni cambia el producto5a8376d5. Las capturas no validan equivalencia semántica multilingüe: ES respondió getting_started; EN/PT pidieron aclaración, comportamiento existente observado y pendiente de mejora aparte. Entrada/compositor móvil bajo el pliegue inicial es una oportunidad existente; no se rediseña aquí.
