# Entornos y superficies de Agent Friendly Web

## Regla principal

Agent Friendly Web utiliza tres superficies distintas. Compartir codigo no las convierte en el mismo sitio.

| Identificador | Direccion | Funcion | Escrituras |
| --- | --- | --- | --- |
| `public_web` | `https://agentfriendlyweb.dev` | Web publica canonica para personas y agentes | No captura contactos en Gate 6B |
| `contact_staging_ui` | Sites privado `tokenizart.chatgpt.site` | Interfaz humana autenticada para probar el formulario | No escribe directamente |
| `contact_staging_api` | `https://contact-staging.agentfriendlyweb.dev` | Worker API protegido por Cloudflare Access | Solo con kill switch temporal y D1 aislada |

La fuente verificable en codigo es `config/surface-environments.json`.

## Responsabilidades

### Web publica

- Muestra el producto, auditorias, metodologia y casos.
- Conserva `POST /api/contact-intake` deshabilitado durante Gate 6B.
- Usa el proyecto Sites publico declarado en `.openai/hosting.json`.
- Nunca debe recibir configuracion, D1 o banderas del canary privado.

### Interfaz privada de Sites

- Es la unica pantalla humana del canary.
- Se habilita con `CONTACT_STAGING_UI_ENABLED=true` para el actor autorizado.
- Mantiene `CONTACT_STAGING_WRITES_ENABLED=false`; su ruta local no escribe.
- Envia el caso aprobado al Worker API separado.
- Debe mostrar visualmente `contact_staging_ui` y no presentarse como la web publica.

### Worker API de contacto

- No es una pagina web.
- `GET /health` devuelve exclusivamente JSON saneado y `Cache-Control: no-store`.
- `POST /api/contact-intake` valida Access, allowlist, bindings, rate limit, cuerpo, contrato, Turnstile e idempotencia antes de D1.
- Toda escritura depende de su propio `CONTACT_STAGING_WRITES_ENABLED=true` temporal.
- Correo, CRM, newsletter, pagos y webhooks permanecen fuera de Gate 6B.3.

## Publicacion sin confusiones

Antes de publicar la web real:

```bash
npm run sites:assert:public
npm run build:public
```

Antes de preparar el Sites privado, comprobar su manifiesto separado:

```bash
npm run sites:assert:contact-staging
npm run build:contact-staging
```

Cada comando lee un manifiesto diferente. El build privado copia `.openai/hosting.contact-staging.json` solo a `dist/.openai/hosting.json`; nunca modifica `.openai/hosting.json`, que permanece fijado al sitio publico.

## Gate 6B.3 corregido

1. Verificar que `public_web` sigue cerrado.
2. Verificar que `contact_staging_ui` es el proyecto Sites privado correcto.
3. Mostrar la interfaz privada con su bandera de UI, sin abrir escrituras Sites.
4. Abrir temporalmente solo el kill switch de `contact_staging_api`.
5. Ejecutar un unico caso sintetico desde la interfaz privada.
6. Cerrar inmediatamente el Worker y comprobar D1 de forma agregada.
7. Restaurar la interfaz privada a estado cerrado.

No volver a convertir `/health` en HTML ni usar el dominio API como sustituto de Sites.
