# Runbook de instalacion agent-friendly para Tokenizart y Atelier

**Version:** 1.0

**Fecha:** 2026-08-26

**Alcance:** archivos publicos y metadata; no incluye Owner Live ni acciones Atelier

## Antes de empezar

Cada cambio se realiza con cuatro elementos: copia de seguridad, responsable, prueba y rollback. Nunca se instala un archivo recibido por correo sin compararlo con este repositorio.

## A. Tokenizart WordPress

### Responsable operativo recomendado

Leonardo implementa en WordPress; Leandro revisa Cloudflare/cabeceras; Codex verifica el resultado; Gabriel aprueba la ventana.

### Secuencia

1. Exportar una copia del sitio, base de datos y configuracion activa de WordPress.
2. Guardar el `robots.txt` actual y confirmar que las reglas WooCommerce siguen presentes.
3. Instalar desde `public/cases/tokenizart/tokenizart.com/`:
   - `llms.txt` en `https://tokenizart.com/llms.txt`;
   - `llms-full.txt` en `https://tokenizart.com/llms-full.txt`;
   - el contenido aprobado de `robots.proposed.txt` como nueva politica de robots;
   - `structured-data.json` dentro del `<head>` de la portada, como `application/ld+json`, despues de verificar que coincide con el texto visible.
4. No publicar todavia `agent-skills.preview.json` ni `ai-catalog.preview.json` en rutas canonicas. Son borradores para P2.
5. Corregir portada: idioma real, meta description, canonical y un solo H1 principal.
6. Revisar el sitemap de WordPress y excluir duplicados, borradores y contenido historico que no debe ser una fuente vigente.
7. En Cloudflare, revisar AI Crawl Control y registrar la politica crawler por crawler. No bloquear en masa sin evaluar busqueda, recuperacion solicitada y entrenamiento por separado.
8. Evaluar Markdown for Agents solo si el plan lo admite. Probar primero una URL no critica y comparar HTML, Markdown y JSON-LD antes de extenderlo.

### Verificacion

```bash
curl -i https://tokenizart.com/llms.txt
curl -i https://tokenizart.com/llms-full.txt
curl -i https://tokenizart.com/robots.txt
curl -i https://tokenizart.com/wp-sitemap.xml
curl -i -H "Accept: text/markdown" https://tokenizart.com/
```

Esperado: HTTP 200, tipos de contenido correctos, ninguna redireccion a login y ningun secreto o dato owner.

### Rollback

Restaurar el `robots.txt` anterior, retirar los dos archivos `llms`, retirar el JSON-LD agregado y purgar solamente las URLs modificadas en cache. No restaurar toda la zona Cloudflare si el problema se limita a contenido.

## B. Atelier

### Restriccion actual

Atelier no debe ponerse detras del proxy de Cloudflare como atajo. El origen observado es directo y el repositorio publico disponible todavia no contiene el baseline completo desplegado.

### Secuencia

1. Leandro identifica repositorio, rama y SHA exactos de la aplicacion web desplegada.
2. Crear una rama y PR con los archivos de `public/cases/tokenizart/atelier.tokenizart.com/` adaptados al framework real.
3. Instalar `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, metadata canonical/description, JSON-LD y la politica de `robots.txt`, conservando `Disallow: /api/*`.
4. Confirmar que ninguna ruta de cuenta, owner, admin o API aparece en el sitemap o archivos `llms`.
5. Ejecutar tests, build reproducible y preview por version.
6. Solicitar aprobacion de produccion antes del deploy.

### Verificacion

```bash
curl -i https://atelier.tokenizart.com/robots.txt
curl -i https://atelier.tokenizart.com/sitemap.xml
curl -i https://atelier.tokenizart.com/llms.txt
curl -i https://atelier.tokenizart.com/llms-full.txt
```

Ademas, probar login, carga de pantalla, rutas publicas, rutas autenticadas, uploads, CORS y enlaces externos. Esta fase no habilita Owner Live.

### Rollback

Revertir el commit de release o redeplegar el SHA anterior verificado. No corregir manualmente archivos dentro del servidor sin reflejarlo en Git.

## C. Link headers

Cuando cada recurso exista, se recomienda exponer en la portada:

```http
Link: </sitemap.xml>; rel="sitemap"; type="application/xml"
Link: </llms.txt>; rel="alternate"; type="text/plain"
Link: </openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"
```

El tercer enlace solo se publica donde el OpenAPI sea real y vigente.

## D. Cierre

Codex repite la auditoria propia y la externa, guarda fecha/evidencia y actualiza el caso. Un check se considera cerrado solo cuando la URL publica responde correctamente; un archivo en Drive, email, GitHub o staging no basta.
