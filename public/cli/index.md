# Agent Friendly Web CLI read-only v1

La CLI oficial permite consultar desde una terminal las mismas superficies públicas que Agent Friendly Web publica para humanos y agentes. Esta primera versión es **repo-first**, requiere Node.js 22.13 o superior y permanece en estado **release candidate** hasta cerrar la verificación del despliegue.

## Qué hace

- audita señales públicas de un sitio con la metodología AF-0 a AF-5;
- lee un perfil ya publicado del Registry;
- verifica en memoria el manifiesto, inventario y SHA-256 de un bundle OKF;
- declara sus capacidades y límites en JSON estable.

## Qué no hace

- No escribe archivos locales.
- No modifica sitios, DNS, Cloudflare, GitHub ni el Registry.
- No solicita ni transmite credenciales, cookies o tokens.
- No ejecuta MCP, A2A, pagos, despliegues ni acciones privadas.
- No convierte el puntaje AF en una certificación oficial ni garantiza indexación o recomendación.

## Ejecutar desde el repositorio

```powershell
git clone https://github.com/tokenizartinfo-ops/agent-friendly-web.git
cd agent-friendly-web
npm ci
node bin/afw.mjs capabilities
```

La publicación en npm y los instaladores nativos quedan para un gate posterior. Hasta entonces, el repositorio versionado es la distribución oficial.

## Comandos

### Auditar un sitio público

```powershell
node bin/afw.mjs audit https://ejemplo.com
node bin/afw.mjs audit https://ejemplo.com --dry-run
```

El modo real consulta 15 rutas públicas mediante `GET`, sin seguir redirecciones. `--dry-run` no usa red: solo muestra el origen normalizado, las rutas y los límites que aplicaría.

### Leer un perfil público del Registry

```powershell
node bin/afw.mjs registry get tokenizart
node bin/afw.mjs registry get tokenizart --version 1 --dry-run
```

Solo accede a `profile.json` ya publicado. No lista expedientes, borradores, identidades, observaciones privadas ni registros D1 internos.

### Verificar el bundle OKF

```powershell
node bin/afw.mjs okf verify
node bin/afw.mjs okf verify --release v0.2 --dry-run
```

La verificación descarga temporalmente en memoria el manifiesto, `CHECKSUMS.sha256` y hasta 100 archivos declarados. Rechaza rutas fuera del bundle, tipos de contenido inesperados, inventarios inconsistentes y hashes alterados. No persiste archivos.

### Consultar capacidades y versión

```powershell
node bin/afw.mjs capabilities
node bin/afw.mjs --version
node bin/afw.mjs --help
```

`--help` es la única salida humana. Los demás comandos emiten un único documento JSON UTF-8.

## Contrato de respuesta

- Schema: [cli-response.v1.json](https://agentfriendlyweb.dev/schemas/cli-response.v1.json)
- Manifiesto: [agent-friendly-cli.json](https://agentfriendlyweb.dev/.well-known/agent-friendly-cli.json)
- Estados: `ok`, `planned`, `error`
- Códigos: `0` éxito/plan, `2` uso, `3` red, `4` integridad, `5` fallo interno.

Los resultados salen por `stdout`; los errores, por `stderr`. Las trazas internas y credenciales nunca forman parte del contrato público.

## Nota sobre npm run

Algunas versiones de npm interpretan `--dry-run` como una opción propia. Para evitar ambigüedad, los ejemplos oficiales con esa bandera usan directamente `node bin/afw.mjs`.
