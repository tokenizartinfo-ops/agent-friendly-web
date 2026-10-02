# Canary privado de correo: recibo de despliegue

2 de octubre de 2026. Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, entorno mail-canary; Worker `agent-friendly-web-mail-canary`. Alcance autorizado: desplegar exclusivamente funciones deshabilitadas en `mail-ops-canary.agentfriendlyweb.dev` y `mail-consumer-canary.agentfriendlyweb.dev`. D1 dedicado `e1d480e2-e369-4f0b-ae7d-5cab3b7eee16`; nunca la base de producción.

Fuente compilada/desplegada `d50ae0b25912b04bbc1f5c07859c06f1d6ebba1b`, integrada por PR #163 en `390e5b9d1df546c40e9a69480141c710799d7853`. CI verify aprobado: test 686/686, lint sin errores con advertencia histórica de imagen, build completo.

Wrangler 4.128.0 subió el primer artefacto, pero falló después al configurar subdomain con código 10007. Lectura API confirmó el Worker y bindings cerrados. Un segundo despliegue acotado completó ambos custom domains: versión final `2f37fa85-7926-4ee9-919a-b086f876eff0`, API comprobó 100%. No afirmar éxito por la primera subida parcial.

Comprobaciones: ambas funciones false; solo MAIL_DB y variables no secretas, sin EMAIL, subject humano, Client ID, limitador ni cron. Dos políticas Access conservan deny everyone. GET anónimo a `/review/synthetic` y `/consume/synthetic` devuelve 302 a Cloudflare Access. Este resultado acredita protección edge, no la aceptación de un usuario ni el procesamiento de mensajes. Workers.dev/previews desactivados en configuración desplegada.

API de producción antes y después: versión `00861678-d968-41d3-be85-180896a321b7`, 100%, sin cambio. No se envió correo ni se creó credencial de servicio. La base exclusiva se provisionó vacía, con cuatro tablas; no se cargó expediente de cliente.

Rollback: mantener flags false, retirar únicamente rutas del Worker mail-canary y preservar D1 y aplicaciones Access. No borrar datos ni ampliar políticas para probar. Próximo: pantalla privada mínima, con contenido tratado como texto, aprobación explícita y revocación; después aceptación propia autenticada. Conectar el consumidor cloud requiere custodia y pruebas independientes, incluido recorrido con PC apagada.
