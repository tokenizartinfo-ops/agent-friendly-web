# Agent Friendly Web CLI Read-Only v1 Design

**Fecha:** 2026-08-27  
**Responsable:** Gabriel Mucchiut  
**Estado:** aprobado funcionalmente; pendiente de plan e implementacion  
**Bloque:** 4B de distribucion agentica

## 1. Proposito

La primera CLI oficial de Agent Friendly Web permitira que una persona, un desarrollador o un agente ejecute consultas publicas desde una terminal sin depender de la interfaz visual. Debe ofrecer los mismos limites y la misma verdad que el sitio: evidencia observada separada de declaraciones, herramientas y roadmap.

CLI significa *Command Line Interface*. En esta version funciona como un inspector por texto. Recibe una instruccion, lee recursos publicos y devuelve un objeto JSON estable. No controla sitios, no publica archivos y no recibe credenciales.

## 2. Decision funcional aprobada

La CLI v1 es completamente read-only y no crea archivos locales. Todos los resultados se escriben en `stdout` como JSON UTF-8. Los errores tambien son JSON, pero se escriben en `stderr` y usan codigos de salida estables.

Puede conectarse a Internet para leer sitios publicos cuando el usuario ejecuta un comando real. Con `--dry-run` no realiza solicitudes de red: valida la instruccion y describe exactamente que recursos consultaria.

## 3. Enfoques evaluados

### A. Cliente remoto minimo

Todos los comandos llamarian endpoints de `agentfriendlyweb.dev`. Es simple, pero hace que la auditoria dependa siempre de la disponibilidad del sitio y duplica menos protecciones locales.

### B. Nucleo hibrido reutilizable - elegido

La auditoria reutiliza `runPublicAudit` y sus protecciones de red. Registry y OKF se consultan desde superficies publicas oficiales. El contrato de salida y los errores son compartidos. Este enfoque funciona como herramienta local real, conserva una unica metodologia y prepara una futura tool MCP sin convertir la CLI en MCP.

### C. Framework completo de CLI y plugins

Commander, oclif o una arquitectura de plugins permitirian mas comandos, configuracion y extensiones. Se descarta para v1 porque agrega dependencias y superficies de seguridad antes de validar los tres casos de uso read-only.

## 4. Alcance v1

### 4.1 Auditoria publica

```text
afw audit https://ejemplo.com
afw audit https://ejemplo.com --dry-run
```

El modo real reutiliza la auditoria publica: normaliza el origen, verifica DNS publico, aplica limites SSRF, no sigue redirecciones, impone timeout y limita bytes. Devuelve evidencia, puntuacion metodologica, probes y limites.

El dry-run devuelve el origen normalizado, la lista de rutas que se consultarian, los limites de red y la aclaracion de que no se ejecuto ninguna solicitud.

### 4.2 Consulta del Registry publico

```text
afw registry get tokenizart
afw registry get tokenizart --origin https://agentfriendlyweb.dev
afw registry get tokenizart --version 1 --dry-run
```

El comando solo admite slugs simples, versiones enteras positivas y un origen HTTP/HTTPS publico sin credenciales ni puerto alternativo. Consulta el perfil JSON publicado, lo valida con `buildPublicProfile` y conserva sus estados de procedencia.

No lista expedientes, usuarios, borradores, observaciones privadas ni perfiles no publicados.

### 4.3 Verificacion OKF

```text
afw okf verify
afw okf verify --origin https://agentfriendlyweb.dev --release v0.2
afw okf verify --dry-run
```

El modo real descarga temporalmente en memoria `manifest.json`, `CHECKSUMS.sha256` y cada recurso declarado. Valida inventario, rutas confinadas al bundle, cantidad maxima de archivos, tamano, media types y SHA-256. Nada se persiste en disco.

El dry-run informa las rutas de entrada conocidas. Como todavia no descarga el manifiesto, no afirma que los archivos remotos existan o sean validos.

### 4.4 Informacion de la CLI

```text
afw --help
afw --version
afw capabilities
```

`--help` es la unica salida humana en texto. `--version` y `capabilities` devuelven JSON. Capabilities enumera comandos desplegados, operaciones de red, ausencia de escritura y acciones bloqueadas.

## 5. Contrato de salida

Cada resultado usa `agent-friendly-web.cli-response.v1`:

```json
{
  "contract": "agent-friendly-web.cli-response.v1",
  "cli_version": "0.1.0",
  "command": "audit",
  "status": "ok",
  "dry_run": false,
  "generated_at": "2026-08-27T00:00:00.000Z",
  "input": {},
  "result": {},
  "limits": []
}
```

Estados permitidos:

- `ok`: lectura terminada y validada;
- `planned`: dry-run valido, sin red;
- `error`: instruccion, red, contrato o integridad rechazados.

El schema JSON se publicara en `/schemas/cli-response.v1.json`. El manifiesto de capacidades se publicara en `/.well-known/agent-friendly-cli.json` como convencion propia del proyecto, no como estandar oficial.

## 6. Codigos de salida

| Codigo | Significado |
| --- | --- |
| `0` | resultado `ok` o `planned` |
| `2` | uso, argumento o URL invalida |
| `3` | destino publico inaccesible, timeout, DNS o respuesta remota invalida |
| `4` | contrato, inventario o integridad SHA-256 invalida |
| `5` | fallo interno no clasificado |

Nunca se incluye una traza de stack en la salida normal. La prueba interna puede verificar la causa, pero la interfaz publica entrega un error acotado y un codigo estable.

## 7. Limites de seguridad

- Solo `GET`/lecturas publicas; no POST, PUT, PATCH o DELETE remotos.
- No cookies, sesiones, OAuth, headers de autorizacion, API keys ni variables de entorno con secretos.
- Rechazo de URL con usuario, contrasena, puerto no estandar, host local o resolucion privada.
- Sin seguimiento automatico de redirects.
- Timeout de 8 segundos y 250 KB por recurso, reutilizando `public-network.mjs`.
- OKF admite como maximo 100 recursos y rechaza rutas absolutas, `..`, query strings, fragments u origen distinto.
- Sin D1, expedientes, owner data, observaciones guardadas o telemetria.
- Sin comandos `write`, `publish`, `fix`, `deploy`, `mint`, `certify`, `transfer`, `pay` o equivalentes.

## 8. Arquitectura de codigo

### `lib/cli-contract.mjs`

Define version, envelope, errores clasificados, codigos de salida y serializacion JSON. No accede a red ni a disco.

### `lib/cli-commands.mjs`

Implementa comandos con dependencias inyectables:

- `runAuditCommand(options, deps)`;
- `runRegistryGetCommand(options, deps)`;
- `runOkfVerifyCommand(options, deps)`;
- `runCapabilitiesCommand()`.

La inyeccion permite probar sin Internet y confirmar que dry-run no invoca `fetch` ni DNS.

### `lib/cli-parser.mjs`

Convierte `process.argv` en un comando tipado, rechaza flags desconocidos y normaliza `origin`, `slug`, `version` y `release`. No interpreta shell ni archivos de configuracion.

### `bin/afw.mjs`

Es un wrapper pequeno: parsea, ejecuta, escribe una unica respuesta y asigna `process.exitCode`. No contiene metodologia ni reglas de red.

### Superficies publicas

- `public/schemas/cli-response.v1.json`;
- `public/.well-known/agent-friendly-cli.json`;
- `public/cli/index.md`;
- pagina humana `/cli` con ejemplos, limites e instalacion desde el repositorio.

## 9. Distribucion inicial

La primera release es repo-first. Se ejecuta con Node.js 22 desde el repositorio publico:

```text
node bin/afw.mjs audit https://ejemplo.com
```

`package.json` incorpora los aliases `afw` y `agent-friendly-web`, ademas de un script `npm run cli`. La publicacion en npm, instaladores, binarios nativos y autoactualizacion quedan fuera de v1 y requieren un gate de distribucion posterior.

La CLI no debe describirse como disponible hasta que codigo, documentacion, pruebas y release del repositorio esten publicados y verificados.

## 10. Descubrimiento agentico

Cuando el release este aprobado, `llms.txt`, AI Catalog, Readiness, sitemap, mapa humano y la pagina `/cli` enlazaran el manifiesto. El estado sera `deployed` solo despues de verificar el comando desde un checkout limpio.

La CLI es una interfaz read-only. No se presenta como MCP, A2A, WebMCP, plugin, skill o protocolo de pago.

## 11. Pruebas

### Parser y contrato

- comandos y flags validos;
- flags desconocidos y argumentos faltantes;
- una sola respuesta JSON por ejecucion;
- codigos `0`, `2`, `3`, `4` y `5`;
- ausencia de stacks y secretos.

### Dry-run

- no invoca fetch, DNS, auditor ni filesystem;
- declara rutas y limites sin afirmar resultados;
- no crea archivos en el directorio de trabajo.

### Auditoria

- reutiliza `runPublicAudit`;
- conserva evidencia y limites;
- rechaza destinos privados y credenciales.

### Registry

- valida el perfil con el contrato canonico;
- conserva estados de procedencia;
- rechaza slug, version, origen o JSON invalidos.

### OKF

- verifica un bundle valido;
- detecta hash alterado, archivo faltante, path traversal, exceso de recursos y media type invalido;
- no deja archivos temporales.

### Gate de release

- `npm test`;
- `npm run lint`;
- `npm run build`;
- comandos reales contra `agentfriendlyweb.dev` y un sitio publico de fixture;
- ejecucion desde checkout limpio en Windows;
- auditoria del origen para confirmar que CLI se descubre sin inflar MCP o acciones.

## 12. Fuera de alcance

- escribir archivos locales, crear ZIP o paquetes de implementacion;
- modificar sitios, CMS, DNS, Cloudflare, GitHub o Registry;
- consultar proyectos autenticados;
- chat, voz, correo o memoria conversacional;
- MCP, A2A, WebMCP, plugins o skills ejecutables;
- pagos, x402, Mercury, cripto o facturacion;
- Tokenizart Owner Live, Mint, Certify, NFC, vouchers o wallet.

## 13. Relacion con la guia conversacional

El chatbot interno solicitado es una superficie diferente. Se documenta como Bloque 4B.1 y debe usar solamente conocimiento publico versionado, responder con enlaces y reconocer cuando no tiene evidencia. Podra explicar auditoria, AF-0 a AF-5, AEO, crawlers, Registry, OKF, CLI, sectores, expedientes y roadmap.

No debe ejecutar comandos de la CLI desde el navegador en su primera version. Tampoco puede publicar, guardar expedientes, solicitar credenciales o inventar precios. Su especificacion se prepara despues de cerrar el release CLI v1.

## 14. Criterios de exito

1. Una persona puede ejecutar los tres casos de uso desde Node.js 22.
2. Un agente puede interpretar cada respuesta mediante el schema v1 y codigos estables.
3. `--dry-run` no realiza red ni escritura.
4. Ningun comando crea o modifica archivos.
5. Auditoria, Registry y OKF conservan sus contratos y protecciones actuales.
6. La documentacion diferencia claramente CLI desplegada de MCP, A2A y mutaciones futuras.
