# Gate de release: Bloque 4B CLI read-only

**Fecha:** 2026-08-27
**Origen:** `https://agentfriendlyweb.dev`
**Rama candidata:** `feat/cli-readonly-v1`
**Commit funcional base:** `0d2b7964cd18d54cf228be97f26f8ba01a9fc9e6`
**Estado:** codigo completo y release candidate; produccion pendiente de verificacion

## Necesidad

Agent Friendly Web necesitaba una interfaz local y auditable para que personas, scripts y agentes pudieran recorrer evidencia publica sin depender del front humano. La CLI v1 une la auditoria publica, el Registry y el paquete OKF bajo un contrato JSON estable, manteniendo una frontera estrictamente read-only.

## Alcance candidato

- `audit <url>` inspecciona las señales publicas con las mismas defensas SSRF, redirects, timeout y tamano que usa la auditoria web.
- `registry get <slug>` consulta un perfil publico ya publicado y valida su contrato.
- `okf verify` verifica en memoria inventario, rutas, tipos de contenido, manifiesto y SHA-256.
- `capabilities`, `version` y `help` permiten descubrir version, limites y comandos.
- `--dry-run` devuelve un plan JSON sin realizar solicitudes de red.
- Cada ejecucion emite un solo envelope `agent-friendly-web.cli-response.v1` y usa codigos de salida estables.

## Fronteras de seguridad

La CLI:

- solo realiza `GET` sobre recursos publicos;
- no usa OAuth, cookies, API keys, sesiones ni otros secretos;
- rechaza URLs privadas, credenciales embebidas y destinos no permitidos;
- no crea, modifica ni borra archivos locales;
- no escribe en sitios, Registry, DNS, Cloudflare ni infraestructura de terceros;
- no es un servidor MCP, agente A2A, plugin ni herramienta de despliegue;
- no certifica indexacion, ranking, recomendacion ni un nivel AF universal.

## Gate tecnico local

- Suite completa: 132 pruebas aprobadas.
- Lint: aprobado sin errores.
- Build: aprobado, incluida la ruta `/cli` y los artefactos publicos.
- Dependencias de produccion: `npm audit --omit=dev` informo 0 vulnerabilidades.
- Checkout Windows limpio: instalacion reproducible; `capabilities` y `--dry-run` respondieron sin escrituras ni red en la simulacion.
- Auditoria remota del origen: `AF-3 herramientas`, puntaje 70, 15 probes.
- Registry Tokenizart: perfil publico v1 valido bajo `agentfriendly.public-profile.v1`.
- OKF v0.2: 13 archivos recuperados y 14 checksums verificados.
- Navegador: `/cli` revisado en 1440 x 900 y 390 x 844, sin overflow horizontal, solapamientos ni errores de consola de la aplicacion; menu movil operativo.

La primera revision independiente previa al PR detecto dos validaciones insuficientes. Se corrigieron antes de integrar: el contrato Registry ahora se comprueba antes de normalizar el perfil y OKF calcula SHA-256 sobre los bytes transferidos, no sobre texto decodificado.

La segunda revision independiente agrego tres defensas: los recursos truncados por limite de lectura ya no pueden superar la verificacion OKF; `registry get --version` exige coincidencia exacta con la version publicada; y el parser rechaza enteros fuera del rango seguro de JavaScript. Las cinco correcciones tienen pruebas de regresion.

## Uso reproducible

```bash
git clone https://github.com/tokenizartinfo-ops/agent-friendly-web.git
cd agent-friendly-web
npm ci
node bin/afw.mjs capabilities
node bin/afw.mjs audit https://agentfriendlyweb.dev --dry-run
node bin/afw.mjs registry get tokenizart
node bin/afw.mjs okf verify --release v0.2
```

Para `--dry-run` se recomienda ejecutar `node bin/afw.mjs` directamente. Algunos modos de npm pueden consumir esa bandera antes de entregarla al programa.

## Riesgos residuales

- La distribucion inicial es repo-first; no se publica aun un paquete npm.
- La precision de una auditoria depende de los recursos publicos observables en ese momento.
- Registry y OKF dependen de contratos remotos versionados; un cambio incompatible debe fallar cerrado.
- MCP, A2A, WebMCP, autenticacion, escritura, pagos y acciones owner-scoped conservan gates independientes.

## Publicacion y rollback

El candidato se publicara solo desde el commit mergeado y verificado por CI. Tras el despliegue se repetiran los cuatro recorridos contra produccion y la revision visual. Solo entonces el manifiesto, el readiness ledger, la pagina y este recibo pueden cambiar de `release-candidate` a `deployed`.

Si falla contrato, seguridad, navegacion, integridad o build remoto, se vuelve a Sites 16. No existen migraciones D1, secretos, pagos ni datos que revertir.

## Siguiente gate

Despues de cerrar este release corresponde especificar el Bloque 4B.1: una guia conversacional publica que explique todo el sitio con continuidad, lenguaje adaptable y fuentes, inicialmente sin persistencia ni acciones. El Bloque 4C MCP read-only permanece separado.
