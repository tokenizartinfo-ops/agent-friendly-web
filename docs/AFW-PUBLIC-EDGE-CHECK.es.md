# AFW — comprobación pública desde GitHub Actions

21oct2026. Control manual de compatibilidad de la zona pública, preparado después del cambio verificado a Pro. Reutiliza el comprobador existente; no instala paquetes, compila o ejecuta un modelo. La PR portadora conserva revisión, CI e integración y el tracker497 la evidencia de cada observación real.

## Qué ejecuta

El workflow `.github/workflows/afw-public-edge-check.yml` comprueba primero los fixtures de `test/cloudflare-native-parity.test.mjs`. Solo una invocación manual `workflow_dispatch` hace las lecturas reales. En pull_request no consulta producción. Se fija el checkout de la revisión concreta; no se aceptan destinos o comandos por input. Permiso GitHub contents:read, credenciales de checkout no persistidas y ningún secreto Cloudflare.

La lectura real invoca el script aceptado `scripts/smoke-cloudflare-native-local.mjs` con origen exacto https://agentfriendlyweb.dev y modo public-edge. Sus once GET incluyen ocho superficies públicas: portada, robots.txt, llms.txt, index.md, agent-readiness, infrastructure-status, manifiesto OKF y api-catalog. Cada una debe cumplir estado, tipo y marcador del contrato existente. Las tres privadas son expediente, api/projects y su descendiente probe; se exige la frontera Access esperada y no se sigue la redirección.

No se pulsa Send login code ni se visita la página de ingreso. No usa cookies o bearer del owner, invoca scanner/MCP/A2A, crea expediente, audita un sitio ni escribe en APIs del producto. Los límites existentes son10s y512KiB por respuesta; el job completo termina en3min. No es un scheduler: no tiene schedule, cola de eventos ni guardia. Cada ejecución manual debe responder a una pregunta concreta, con presupuesto y revisión verificados; no repetir fallos sin diagnóstico.

## Evidencia y límites

El JSON saneado queda en un artefacto de7d vinculado al run/attempt/commit reales; la fecha primaria está en el log del paso y la metadata de Actions. No se copian ubicaciones de login con parámetros, Set-Cookie, JWT, credenciales o cuerpos privados. Conservar referencia, revisión del comprobador, fecha, resultados por ruta y limitaciones; no atribuir la versión de código del comprobador al Worker público.

Un resultado correcto acredita esas respuestas desde ese runner y en esa fecha. No acredita identidad, despacho OTP, consentimiento, escritura, configuración interna, instalación vigente, puntaje externo nuevo, ahorro de tokens, Container, revisión cloud útil o PC-off. Un fallo requiere distinguir contrato, red y protección; no autoriza crear una excepción WAF, desactivar seguridad o desplegar.

Pro ofrece nuevas opciones de control, pero el catálogo de reglas disponibles no demuestra que estén aplicadas. Esta comprobación no configura WAF, bots, caché, Access, DNS o cobros. La producción y los ensayos privados conservan sus gates. Reversión de este incremento: revertir únicamente el workflow/documentación; no hay datos o recursos Cloudflare que deshacer.
