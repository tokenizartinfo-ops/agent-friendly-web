# Consentimiento por herramienta: preparación local

AFW, 3 de octubre de 2026. El complemento instalado permite administrar cuentas, nombre, descripción y actualizar herramientas; la interfaz observada no ofrece edición de scopes OAuth. No se modificaron permisos ni se abrió canary.

## Cambio

El adaptador MCP declara mediante `_meta.securitySchemes` el permiso propio de cada herramienta: resumen requiere project read; evidencia requiere además evidence read. Cuando el servicio devuelve insufficient_scope, el resultado incorpora `_meta["mcp/www_authenticate"]` con metadata del recurso y los scopes necesarios. No devuelve datos ni cambia el grant. Revocación continúa como denegación, sin provocar reconexión automática.

Este es el mecanismo documentado en [autenticación OpenAI](https://developers.openai.com/plugins/build/auth) y su [referencia de compatibilidad](https://developers.openai.com/plugins/reference). La metadata solo comunica requisitos; el servidor sigue verificando permisos y revocación en cada lectura. El SDK actual conserva la declaración `_meta` en tools/list, comprobada con cliente MCP local.

## Aceptación pendiente

Prueba local comprueba descriptor, challenge, ausencia de lecturas al faltar scope y ausencia de challenge tras revocar. Aún falta comprobar que ChatGPT interprete esta señal, pida ambos permisos con consentimiento humano y devuelva únicamente el fixture fechado autorizado. No se acredita resultado edge ni publicación.

Validación: 720/720 pruebas aprobadas, lint sin errores (una advertencia histórica de imagen) y build aprobado.

Próxima ventana: preflight SQL, publicar candidato solo en delegated-canary con deadline, actualizar herramientas del complemento, consulta de evidencia con permiso mínimo, consentimiento adicional visible, lectura sintética, retirada antes de vencer token y restauración del cierre. Rollback: versión canary cerrada `4775ff39-b406-4f62-8eaa-d4d336a80446`, conservando D1/KV. Producción y Access no cambian.
