# OAuth de lectura: bloque local

Fecha del owner: 2026-09-30. Rama `feat/afw-delegated-oauth-local-20260930`, base `bdefbaea3b98b1b638a24bd5590794c533d09a5d`. No modifica producción, Access, DNS ni MCP público.

Workers OAuth Provider 1.2.1 maneja protocolo/tokens. AFW exige identidad Access firmada, cliente preinscrito permitido, redirect/recurso exactos, S256 y consentimiento para un proyecto propio. Solo lectura del resumen y observaciones guardadas; sin auditorías nuevas, escrituras ni publicación. Token cinco minutos, sin refresh; permiso diez minutos y revocable antes. D1 conserva contexto, fechas y hashes, nunca tokens/cookies. Cada lectura revisa propiedad y permiso actuales con sesión `first-primary` cuando está disponible. Desconexión humana y revocación OAuth bloquean el permiso en D1.

## Verificación

628 pruebas aprobadas. Lint completo: cero errores, advertencia preexistente de imagen y una advertencia nueva de export corregida; lint de todos los archivos nuevos pasó después de corregirla. Proveedor/cliente MCP reales con Access firmado sintético, SQLite y KV emulado comprueban consentimiento, lectura, desconexión, revocación, PKCE, scopes/propiedad, expiración, CSRF y replay. No prueban consistencia de KV en edge ni aceptación de usuario real.

La revisión independiente reprodujo dos canjes concurrentes exitosos de un código en KV. Se añadió consumo atómico de canje en D1, con prueba vista fallar y luego pasar. Revisión posterior: nueve pruebas específicas aprobadas, sin otros hallazgos accionables. Ruling: `invalid_grant` del canje perdedor puede retirar también el token ganador; ante replay se falla cerrado y puede requerirse nuevo consentimiento. No reabrir un canje consumido después de un error de infraestructura.

Wrangler dry-run aprobó el bundle; workerd arrancó y `/mcp` devolvió 404 con servicio desactivado. Compatibilidad 2026-09-07, máxima soportada por el binario instalado. Config local sin rutas/IDs reales, workers.dev y preview desactivados. Migraciones generadas 0011 (tablas) y 0012 (canje), ninguna aplicada remotamente. Build completo se ejecuta en CI antes del cierre.

## Continuidad

Preparar canary aislado con D1/KV propios y aplicación Access dedicada a rutas humanas. MCP/token/discovery requieren OAuth y no la sesión humana del asistente. Preinscribir cliente con redirect exacto; validar consentimiento/desconexión en navegador real y retención/límites antes de abrir. No publicar discovery en el apex ni afirmar aumento de puntuación externa antes de acreditar servicio. A2A sigue separado y pendiente; DNSSEC conserva la espera acordada.

Instalación restaurada tras liberar espacio (aproximadamente 8.7 GB al retomar). Builds pesados pasan al CI existente de GitHub; pruebas pequeñas siguen locales. No se eliminaron fuentes, documentos históricos ni cambios ajenos; no se pidió otro login.
