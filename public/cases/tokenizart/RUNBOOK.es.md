# Guia de instalacion del paquete Tokenizart

## Regla de seguridad

Cada cambio necesita backup, responsable, prueba y rollback. El paquete no habilita Owner Live ni acciones reales de Atelier.

## Tokenizart.com

1. Leonardo exporta una copia del sitio, la base de datos y la configuracion WordPress.
2. Conserva las reglas WooCommerce del `robots.txt` actual.
3. Instala `llms.txt`, `llms-full.txt`, el contenido aprobado de `robots.proposed.txt` y el JSON-LD revisado.
4. Corrige idioma, meta description, canonical, H1 y paginas duplicadas.
5. Leandro revisa AI Crawl Control y cabeceras en Cloudflare sin bloquear en masa.
6. Codex verifica las URLs canonicas y repite ambas auditorias.

No publicar todavia los manifests `.preview.json`: describen la fase P2 y no son endpoints productivos.

## Atelier

1. Leandro identifica repositorio, rama y SHA exactos del frontend desplegado.
2. Prepara un PR con `llms.txt`, `llms-full.txt`, sitemap, robots y metadata.
3. Mantiene `/api/*`, cuenta, owner y admin fuera de crawlers y sitemap.
4. Ejecuta tests, build y preview por version.
5. Gabriel aprueba una ventana separada antes de produccion.

No poner Atelier detras del proxy Cloudflare como atajo. Eso requiere un plan tecnico independiente.

## Verificacion

```bash
curl -i https://tokenizart.com/llms.txt
curl -i https://tokenizart.com/llms-full.txt
curl -i https://tokenizart.com/robots.txt
curl -i https://atelier.tokenizart.com/llms.txt
curl -i https://atelier.tokenizart.com/sitemap.xml
```

Un archivo cuenta como disponible solo cuando su URL de produccion devuelve HTTP 200 y el contenido esperado.

## Documento completo

https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/main/docs/TOKENIZART-INSTALLATION-RUNBOOK.es.md

