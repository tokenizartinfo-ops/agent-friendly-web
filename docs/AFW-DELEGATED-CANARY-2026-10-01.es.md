# Canary OAuth de lectura: 1 de octubre

PR140 integrada: `5f60a236e45524fcec91c897d839cfa694a3d38d`. Su CI aprobó pruebas/lint/build en [ejecución 36802077218](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/36802077218). Producción sigue siendo un despliegue separado; merge no acredita activación OAuth.

## Entorno aislado preparado

Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, entorno `delegated-canary`. Cuenta `85d0d5dadac3341a564f22ce885e9eec`, zona `4b1a3fe4b6dcb81e9d6a633174c5939f`. Origen previsto `https://delegated-canary.agentfriendlyweb.dev`, Worker `agent-friendly-web-delegated-canary`.

- D1 nueva `6a728254-1494-4039-802e-b39288a55fcc`: tablas OAuth equivalentes a 0011/0012 y esquema mínimo de proyecto/observaciones. Dos proyectos sintéticos; ninguno copia contenido de producción. Una lectura acotada del identificador interno del expediente piloto existente permite ligar el sintético al owner real, sin publicar ese identificador en este documento.
- KV nuevo `6b94ff702e504e14a7730cee73a0f6ff`: un cliente público preinscrito `afw-canary-loopback-20261001`, sin secreto, callback exacto `http://localhost:8794/callback`. Registro directo conforme al formato del helper 1.2.1; requiere verificar el canje real antes de acreditar interoperabilidad.
- Access nueva `64d6982e-0afd-46e5-80f1-f929c5446696`, AUD `02b03e27a446409b924b6c2b2ee48a91d1845717c9d3433575d0d4634cc99138`: únicamente rutas `/authorize` y `/connections` (incluida retirada), con identidad owner ya autorizada. No modifica la aplicación de producción. MCP/token/discovery quedan protegidos por OAuth en el Worker.

Config desactivada por defecto, workers.dev/preview apagados, observabilidad apagada, ventana hasta 2026-10-02T12:14:20Z (09:14:20 de Buenos Aires). Límite 30 solicitudes/minuto por IP; no es presupuesto global. Fuera de plazo se cierra antes de consultar KV/D1. No hay llamadas a modelos ni add-ons contratados en este bloque.

## Comprobación

630 pruebas locales aprobadas, incluidas ausencia/fallo de limitador, cierre por plazo y callback con estado/issuer exactos. Cliente `scripts/check-delegated-canary.mjs` mantiene PKCE y tokens solo en RAM, nunca imprime credenciales. Lee únicamente el sintético y espera la desconexión humana para comprobar denegación con el token todavía vigente. Sus pruebas de callback no acreditan ejecución completa en navegador.

Antes de exponer el canary: revisión independiente, CI completo, dry-run y despliegue desactivado; después comprobaciones de Access/discovery/challenge y habilitación acotada. Aceptación OAuth autenticada en edge sigue pendiente. No publicar discovery en el apex ni reclamar puntos externos por esta preparación. DNSSEC conserva la espera acordada; A2A sigue como próximo servicio separado.

## Retirada y continuidad

Desactivar solo este Worker (`AFW_DELEGATED_OAUTH_ENABLED=false`) y desconectar su dominio nuevo si es necesario. La expiración automática bloquea solicitudes pero no borra recursos ni evidencias. Conservar la base sintética hasta revisar el resultado y retirar el entorno; no aplicar `DROP` ni migraciones sobre la D1 de producción. Es una excepción acotada al canary web histórico para preservar su despliegue y separar audiencias.

Build completo en GitHub; solo pruebas/bundle pequeño locales. No se limpiaron archivos compartidos. Solicitar al owner únicamente abrir el enlace de consentimiento generado por el proceso local cuando el canary esté verificado; no pedir códigos/tokens en el chat.
