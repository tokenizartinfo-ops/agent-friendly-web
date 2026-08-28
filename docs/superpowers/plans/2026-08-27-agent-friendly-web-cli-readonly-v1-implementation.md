# Agent Friendly Web CLI Read-Only v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar un CLI oficial, determinista y estrictamente read-only que audite sitios publicos, lea perfiles publicos del Registry, verifique el paquete OKF publicado y exponga sus propias capacidades sin credenciales ni mutaciones.

**Architecture:** El binario Node delega el parseo, los contratos de salida y cada operacion en modulos pequenos bajo `lib/`. Reutiliza las fronteras de red y auditoria publicas existentes, inyecta dependencias en tests para demostrar que `--dry-run` no hace red y publica contratos/documentacion consumibles por humanos y agentes. La distribucion inicial es repo-first; publicar en npm queda fuera de este release.

**Tech Stack:** Node.js 22.13+, ECMAScript modules, `node:test`, `node:assert/strict`, APIs estandar `fetch` y `node:crypto`, Next/Vinext, Cloudflare/Sites.

**Spec:** `docs/superpowers/specs/2026-08-27-agent-friendly-web-cli-readonly-v1-design.md`

## Global Constraints

- El runtime del CLI no puede crear, editar ni borrar archivos locales.
- Solo puede efectuar solicitudes HTTP `GET` a recursos publicos; no envia credenciales, cookies ni cabeceras de autenticacion.
- Debe rechazar credenciales embebidas, puertos explicitos y destinos privados, reservados o no publicos.
- No sigue redirecciones; aplica timeout de 8 segundos y limite de respuesta de 250.000 bytes por recurso.
- `--dry-run` no puede efectuar ninguna solicitud de red.
- Resultados: un objeto JSON UTF-8 en `stdout`; errores: un objeto JSON UTF-8 en `stderr`; `--help` es la unica salida humana.
- El contrato de salida es `agent-friendly-web.cli-response.v1` con estados `ok`, `planned` o `error`.
- Codigos de salida: `0` exito/plan, `2` uso/validacion, `3` red, `4` contrato/integridad y `5` error interno.
- El verificador OKF admite como maximo 100 rutas y exige confinement dentro de `/okf/<release>/`.
- La publicacion inicial es repo-first y conserva el paquete como `private`; npm es un gate futuro separado.
- El chatbot publico queda fuera de este bloque y permanece registrado como Bloque 4B.1 del roadmap.
- Toda afirmacion publica debe distinguir capacidad desplegada de capacidad planeada.

---

### Task 1: Contrato de salida y parser estricto

**Files:**
- Create: `test/cli-contract-parser.test.mjs`
- Create: `lib/cli-contract.mjs`
- Create: `lib/cli-parser.mjs`

**Interfaces:**
- Consumes: argumentos de proceso como `string[]`.
- Produces: `CLI_CONTRACT`, `CLI_VERSION`, `EXIT_CODES`, `CliError`, `createSuccessEnvelope()`, `createErrorEnvelope()`, `serializeEnvelope()` y `parseCliArgs(argv)`.

- [ ] **Step 1: Write the failing contract and parser tests**

```js
import test from "node:test";
import assert from "node:assert/strict";
import {
  CLI_CONTRACT,
  EXIT_CODES,
  CliError,
  createErrorEnvelope,
  createSuccessEnvelope,
  serializeEnvelope,
} from "../lib/cli-contract.mjs";
import { parseCliArgs } from "../lib/cli-parser.mjs";

test("success envelopes use the v1 contract", () => {
  const envelope = createSuccessEnvelope("capabilities", { commands: [] });
  assert.equal(envelope.contract, CLI_CONTRACT);
  assert.equal(envelope.status, "ok");
  assert.equal(envelope.command, "capabilities");
  assert.equal(envelope.cli_version, "0.1.0");
  assert.equal(envelope.dry_run, false);
  assert.deepEqual(envelope.input, {});
  assert.deepEqual(envelope.result, { commands: [] });
  assert.deepEqual(envelope.limits, []);
});

test("planned envelopes are explicit", () => {
  const envelope = createSuccessEnvelope("audit", { probes: [] }, { planned: true });
  assert.equal(envelope.status, "planned");
});

test("errors do not expose stack traces", () => {
  const error = new CliError("invalid_arguments", "Falta la URL.", EXIT_CODES.USAGE);
  const envelope = createErrorEnvelope("audit", error);
  assert.equal(envelope.status, "error");
  assert.equal(envelope.error.code, "invalid_arguments");
  assert.equal("stack" in envelope.error, false);
  assert.doesNotThrow(() => JSON.parse(serializeEnvelope(envelope)));
});

test("parses every supported command", () => {
  assert.deepEqual(parseCliArgs(["audit", "https://example.com", "--dry-run"]), {
    command: "audit",
    target: "https://example.com",
    dryRun: true,
  });
  assert.deepEqual(parseCliArgs(["registry", "get", "tokenizart", "--version", "2"]), {
    command: "registry-get",
    slug: "tokenizart",
    origin: "https://agentfriendlyweb.dev",
    version: 2,
    dryRun: false,
  });
  assert.deepEqual(parseCliArgs(["okf", "verify", "--release", "v0.2"]), {
    command: "okf-verify",
    origin: "https://agentfriendlyweb.dev",
    release: "v0.2",
    dryRun: false,
  });
  assert.deepEqual(parseCliArgs(["capabilities"]), { command: "capabilities" });
  assert.deepEqual(parseCliArgs(["--version"]), { command: "version" });
  assert.deepEqual(parseCliArgs(["--help"]), { command: "help" });
});

test("rejects unknown flags and malformed identifiers", () => {
  assert.throws(() => parseCliArgs(["audit", "https://example.com", "--write"]), CliError);
  assert.throws(() => parseCliArgs(["registry", "get", "../secret"]), CliError);
  assert.throws(() => parseCliArgs(["okf", "verify", "--release", "latest"]), CliError);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test test/cli-contract-parser.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `lib/cli-contract.mjs`.

- [ ] **Step 3: Implement the contract and strict parser**

`lib/cli-contract.mjs` must expose immutable constants and envelopes with this shape:

```js
export const CLI_CONTRACT = "agent-friendly-web.cli-response.v1";
export const CLI_VERSION = "0.1.0";
export const EXIT_CODES = Object.freeze({ OK: 0, USAGE: 2, NETWORK: 3, INTEGRITY: 4, INTERNAL: 5 });

export class CliError extends Error {
  constructor(code, message, exitCode, details = undefined) {
    super(message);
    this.name = "CliError";
    this.code = code;
    this.exitCode = exitCode;
    this.details = details;
  }
}
```

`lib/cli-parser.mjs` must use an allowlist parser, validate slugs with `^[a-z0-9]+(?:-[a-z0-9]+)*$`, releases with `^v\d+\.\d+$`, positive integer versions and reject duplicate or unknown flags.

- [ ] **Step 4: Run the focused and complete tests**

Run: `node --test test/cli-contract-parser.test.mjs`

Expected: PASS.

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add test/cli-contract-parser.test.mjs lib/cli-contract.mjs lib/cli-parser.mjs
git commit -m "feat(cli): add response contract and strict parser"
```

### Task 2: Auditoria publica y capacidades

**Files:**
- Create: `test/cli-audit-capabilities.test.mjs`
- Create: `lib/cli-commands.mjs`
- Modify: `lib/public-audit.mjs`

**Interfaces:**
- Consumes: `runPublicAudit(url, options)` y la lista exportada `PUBLIC_AUDIT_PROBES`.
- Produces: `executeCliCommand(parsed, dependencies)` y descripciones deterministas para `audit` y `capabilities`.

- [ ] **Step 1: Write failing behavior tests**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { executeCliCommand } from "../lib/cli-commands.mjs";

test("audit dry-run lists probes without network", async () => {
  let calls = 0;
  const result = await executeCliCommand(
    { command: "audit", target: "https://example.com", dryRun: true },
    { runPublicAudit: async () => { calls += 1; } },
  );
  assert.equal(calls, 0);
  assert.equal(result.status, "planned");
  assert.equal(result.result.target, "https://example.com/");
  assert.ok(result.result.probes.some((probe) => probe.path === "/llms.txt"));
});

test("audit delegates to the existing public auditor", async () => {
  const report = { target: "https://example.com/", readiness: { level: "AF-1" } };
  const result = await executeCliCommand(
    { command: "audit", target: "https://example.com", dryRun: false },
    { runPublicAudit: async (url) => { assert.equal(url, "https://example.com/"); return report; } },
  );
  assert.equal(result.status, "ok");
  assert.deepEqual(result.result.report, report);
});

test("capabilities declares read-only boundaries", async () => {
  const result = await executeCliCommand({ command: "capabilities" });
  assert.equal(result.result.access, "public-read-only");
  assert.equal(result.result.localWrites, false);
  assert.equal(result.result.remoteWrites, false);
  assert.deepEqual(result.result.httpMethods, ["GET"]);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test test/cli-audit-capabilities.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `lib/cli-commands.mjs`.

- [ ] **Step 3: Export probes and implement the two commands**

Change the existing private probe array in `lib/public-audit.mjs` to an immutable export:

```js
export const PUBLIC_AUDIT_PROBES = Object.freeze([
  Object.freeze({ id: "home", path: "/", accept: "text/html" }),
  // Preserve every existing probe exactly once.
]);
```

Implement `executeCliCommand` with dependency injection and URL normalization. Dry-run must only transform `PUBLIC_AUDIT_PROBES`; the live path must call the existing auditor once.

- [ ] **Step 4: Run focused regression tests**

Run: `node --test test/cli-audit-capabilities.test.mjs test/public-audit.test.mjs test/public-network.test.mjs`

Expected: PASS.

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add test/cli-audit-capabilities.test.mjs lib/cli-commands.mjs lib/public-audit.mjs
git commit -m "feat(cli): expose public audit and capabilities"
```

### Task 3: Lectura del Registry publico

**Files:**
- Create: `test/cli-registry.test.mjs`
- Modify: `lib/cli-commands.mjs`

**Interfaces:**
- Consumes: `fetchLimitedPublicUrl(url, options)` y `buildPublicProfile(record)`.
- Produces: ejecucion de `registry-get` con profile validado y metadatos de origen/version.

- [ ] **Step 1: Write failing Registry tests**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { executeCliCommand } from "../lib/cli-commands.mjs";

test("registry dry-run performs no request", async () => {
  let requests = 0;
  const result = await executeCliCommand(
    { command: "registry-get", slug: "tokenizart", origin: "https://agentfriendlyweb.dev", version: 2, dryRun: true },
    { fetchLimitedPublicUrl: async () => { requests += 1; } },
  );
  assert.equal(requests, 0);
  assert.equal(result.status, "planned");
  assert.equal(result.result.url, "https://agentfriendlyweb.dev/registry/tokenizart/profile.json?version=2");
});

test("registry get returns a validated public profile", async () => {
  const profile = { contract: "agent-friendly-web.public-profile.v1", project: { slug: "tokenizart" } };
  const result = await executeCliCommand(
    { command: "registry-get", slug: "tokenizart", origin: "https://agentfriendlyweb.dev", dryRun: false },
    {
      fetchLimitedPublicUrl: async () => ({ status: 200, contentType: "application/json", text: JSON.stringify(profile) }),
      buildPublicProfile: (value) => value,
    },
  );
  assert.deepEqual(result.result.profile, profile);
});

test("registry get classifies unavailable and malformed profiles", async () => {
  await assert.rejects(
    executeCliCommand(
      { command: "registry-get", slug: "missing", origin: "https://agentfriendlyweb.dev", dryRun: false },
      { fetchLimitedPublicUrl: async () => ({ status: 404, contentType: "application/json", text: "{}" }) },
    ),
    (error) => error.exitCode === 3,
  );
  await assert.rejects(
    executeCliCommand(
      { command: "registry-get", slug: "bad", origin: "https://agentfriendlyweb.dev", dryRun: false },
      { fetchLimitedPublicUrl: async () => ({ status: 200, contentType: "application/json", text: "not-json" }) },
    ),
    (error) => error.exitCode === 4,
  );
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test test/cli-registry.test.mjs`

Expected: FAIL because `registry-get` is unsupported.

- [ ] **Step 3: Implement the Registry command**

Build the exact public endpoint with `new URL`, append `version` only when present, require HTTP 200 and JSON, parse without `eval`, validate through `buildPublicProfile`, and map transport/unavailability to exit `3` and malformed contract to exit `4`.

- [ ] **Step 4: Run focused and complete tests**

Run: `node --test test/cli-registry.test.mjs test/public-profile.test.mjs test/public-network.test.mjs`

Expected: PASS.

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add test/cli-registry.test.mjs lib/cli-commands.mjs
git commit -m "feat(cli): read public registry profiles"
```

### Task 4: Verificacion remota OKF

**Files:**
- Create: `test/cli-okf.test.mjs`
- Create: `lib/cli-okf.mjs`
- Modify: `lib/cli-commands.mjs`

**Interfaces:**
- Consumes: `fetchLimitedPublicUrl` y `sha256Hex(text)` inyectables.
- Produces: `verifyRemoteOkf({ origin, release, dryRun }, dependencies)` y comando `okf-verify`.

- [ ] **Step 1: Write failing OKF tests**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { verifyRemoteOkf } from "../lib/cli-okf.mjs";

test("OKF dry-run lists bounded public requests without fetching", async () => {
  let requests = 0;
  const result = await verifyRemoteOkf(
    { origin: "https://agentfriendlyweb.dev", release: "v0.2", dryRun: true },
    { fetchLimitedPublicUrl: async () => { requests += 1; } },
  );
  assert.equal(requests, 0);
  assert.equal(result.planned, true);
  assert.deepEqual(result.initialPaths, ["manifest.json", "CHECKSUMS.sha256"]);
});

test("OKF verifier validates inventory and checksums", async () => {
  const files = { "index.md": "# Index\n", "log.md": "# Log\n" };
  const manifest = {
    release: "v0.2",
    files: [
      { path: "index.md", mediaType: "text/markdown" },
      { path: "log.md", mediaType: "text/markdown" },
    ],
  };
  const hashes = Object.fromEntries(Object.entries(files).map(([path, text]) => [path, `hash-${text.length}`]));
  const checksums = Object.entries(hashes).map(([path, hash]) => `${hash}  ${path}`).join("\n");
  const fetchLimitedPublicUrl = async (url) => {
    const path = new URL(url).pathname.split("/okf/v0.2/")[1];
    const text = path === "manifest.json" ? JSON.stringify(manifest) : path === "CHECKSUMS.sha256" ? checksums : files[path];
    return { status: 200, contentType: path.endsWith(".json") ? "application/json" : "text/markdown", text };
  };
  const result = await verifyRemoteOkf(
    { origin: "https://agentfriendlyweb.dev", release: "v0.2", dryRun: false },
    { fetchLimitedPublicUrl, sha256Hex: (text) => `hash-${text.length}` },
  );
  assert.equal(result.valid, true);
  assert.equal(result.filesVerified, 2);
});

test("OKF verifier rejects traversal and oversized inventories", async () => {
  const traversal = { release: "v0.2", files: [{ path: "../secret", mediaType: "text/plain" }] };
  await assert.rejects(
    verifyRemoteOkf(
      { origin: "https://agentfriendlyweb.dev", release: "v0.2", dryRun: false },
      { fetchLimitedPublicUrl: async (url) => ({ status: 200, contentType: "application/json", text: url.endsWith("manifest.json") ? JSON.stringify(traversal) : "" }) },
    ),
    (error) => error.exitCode === 4,
  );
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test test/cli-okf.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `lib/cli-okf.mjs`.

- [ ] **Step 3: Implement bounded OKF verification**

Implement pure helpers for checksum parsing and path validation. Fetch manifest and checksums first, require an array of 1-100 unique relative paths, reject `..`, backslashes, encoded traversal, absolute paths and paths outside the release base, then fetch each declared file and compare SHA-256 using `createHash("sha256")`.

- [ ] **Step 4: Integrate `okf-verify` in the dispatcher**

`executeCliCommand` must wrap a planned result as status `planned` and a completed verification as status `ok`; integrity failures must remain exit `4`.

- [ ] **Step 5: Run focused and complete tests**

Run: `node --test test/cli-okf.test.mjs test/okf-public-distribution.test.mjs test/public-network.test.mjs`

Expected: PASS.

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 6: Commit**

```bash
git add test/cli-okf.test.mjs lib/cli-okf.mjs lib/cli-commands.mjs
git commit -m "feat(cli): verify public OKF releases"
```

### Task 5: Binario y codigos de salida

**Files:**
- Create: `test/cli-entrypoint.test.mjs`
- Create: `bin/afw.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `parseCliArgs`, `executeCliCommand`, envelopes y exit codes.
- Produces: ejecutable `afw`, script `npm run cli --` y comportamiento stdout/stderr estable.

- [ ] **Step 1: Write failing process-level tests**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

const runCli = (...args) => spawnSync(process.execPath, ["bin/afw.mjs", ...args], { encoding: "utf8" });

test("capabilities emits exactly one JSON document", () => {
  const result = runCli("capabilities");
  assert.equal(result.status, 0);
  assert.equal(result.stderr, "");
  const parsed = JSON.parse(result.stdout);
  assert.equal(parsed.contract, "agent-friendly-web.cli-response.v1");
});

test("usage failures emit JSON only on stderr", () => {
  const result = runCli("audit");
  assert.equal(result.status, 2);
  assert.equal(result.stdout, "");
  assert.equal(JSON.parse(result.stderr).status, "error");
});

test("help is the only human-readable output", () => {
  const result = runCli("--help");
  assert.equal(result.status, 0);
  assert.match(result.stdout, /afw audit <url>/);
  assert.equal(result.stderr, "");
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test test/cli-entrypoint.test.mjs`

Expected: FAIL because `bin/afw.mjs` does not exist.

- [ ] **Step 3: Implement the process wrapper**

The entrypoint must catch `CliError`, classify unknown exceptions as internal, write one serialized envelope plus newline, never emit a stack and set `process.exitCode`. The shebang is `#!/usr/bin/env node`.

- [ ] **Step 4: Expose package entrypoints**

Add to `package.json`:

```json
"bin": {
  "afw": "./bin/afw.mjs",
  "agent-friendly-web": "./bin/afw.mjs"
},
"scripts": {
  "cli": "node bin/afw.mjs"
}
```

Preserve all existing scripts and keep `private: true`.

- [ ] **Step 5: Run command and regression tests**

Run: `node --test test/cli-entrypoint.test.mjs`

Expected: PASS.

Run: `npm run cli -- capabilities`

Expected: valid JSON with `status: "ok"`.

Run: `node bin/afw.mjs audit https://example.com --dry-run`

Expected: valid JSON with `status: "planned"` and no network dependency.

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 6: Commit**

```bash
git add test/cli-entrypoint.test.mjs bin/afw.mjs package.json
git commit -m "feat(cli): add executable read-only interface"
```

### Task 6: Contratos y documentacion publica

**Files:**
- Create: `test/cli-public-discovery.test.mjs`
- Create: `public/schemas/cli-response.v1.json`
- Create: `public/.well-known/agent-friendly-cli.json`
- Create: `public/cli/index.md`
- Create: `app/cli/page.tsx`
- Modify: `app/components/site-header.tsx`
- Modify: `app/components/site-footer.tsx`
- Modify: `app/mapa-del-sitio/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `public/llms.txt`
- Modify: `public/llms-full.txt`
- Modify: `public/openapi.json`
- Modify: `app/api-catalog/route.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: comandos, limites y contrato ya implementados.
- Produces: manifest machine-readable, JSON Schema, guia Markdown, pagina humana y enlaces de descubrimiento.

- [ ] **Step 1: Write failing discovery tests**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("CLI manifest and schema describe the released commands", async () => {
  const manifest = JSON.parse(await readFile("public/.well-known/agent-friendly-cli.json", "utf8"));
  const schema = JSON.parse(await readFile("public/schemas/cli-response.v1.json", "utf8"));
  assert.equal(manifest.contract, "agent-friendly-web.cli-manifest.v1");
  assert.equal(manifest.access, "public-read-only");
  assert.deepEqual(manifest.httpMethods, ["GET"]);
  assert.ok(manifest.commands.includes("afw audit <url>"));
  assert.equal(schema.$id, "https://agentfriendlyweb.dev/schemas/cli-response.v1.json");
});

test("public discovery surfaces link the CLI without claiming MCP", async () => {
  const [llms, llmsFull, guide, sitemap] = await Promise.all([
    readFile("public/llms.txt", "utf8"),
    readFile("public/llms-full.txt", "utf8"),
    readFile("public/cli/index.md", "utf8"),
    readFile("app/sitemap.ts", "utf8"),
  ]);
  for (const content of [llms, llmsFull]) assert.match(content, /https:\/\/agentfriendlyweb\.dev\/\.well-known\/agent-friendly-cli\.json/);
  assert.match(guide, /No escribe archivos locales/);
  assert.match(sitemap, /\/cli/);
  assert.doesNotMatch(guide, /MCP disponible en produccion/i);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test test/cli-public-discovery.test.mjs`

Expected: FAIL with missing manifest/schema files.

- [ ] **Step 3: Create machine-readable public artifacts**

The manifest must include contract, version, status `release-candidate`, access, commands, restrictions, schema URL, source repository, guide URL and no authentication. The JSON Schema must set `additionalProperties: false` for envelope and nested error, enumerate states and require `contract`, `cli_version`, `command`, `status`, `dry_run`, `generated_at`, `input`, `limits` and either `result` or `error` as appropriate.

- [ ] **Step 4: Create the human CLI page and guide**

The page must explain in Spanish: what it does, what it never does, installation from a clean checkout, the four commands, dry-run, outputs, exit codes and copyable examples. Preserve the comic visual language and use existing layout/icon patterns; no card nesting.

- [ ] **Step 5: Connect every discovery surface**

Add `/cli` to header/footer/site map/sitemap, add manifest/schema/guide to `llms.txt` and `llms-full.txt`, and list the read-only CLI resources in the API catalog/OpenAPI without representing the CLI as an HTTP mutation API or MCP server.

- [ ] **Step 6: Run focused and complete verification**

Run: `node --test test/cli-public-discovery.test.mjs test/agent-discovery.test.mjs test/site-navigation.test.mjs`

Expected: PASS.

Run: `npm test`

Expected: all tests PASS.

Run: `npm run lint`

Expected: exit `0`.

Run: `npm run build`

Expected: exit `0`, including `/cli` and all public artifacts.

- [ ] **Step 7: Commit**

```bash
git add test/cli-public-discovery.test.mjs public/schemas/cli-response.v1.json public/.well-known/agent-friendly-cli.json public/cli/index.md app/cli/page.tsx app/components/site-header.tsx app/components/site-footer.tsx app/mapa-del-sitio/page.tsx app/sitemap.ts public/llms.txt public/llms-full.txt public/openapi.json app/api-catalog/route.ts app/globals.css
git commit -m "feat(cli): publish discovery contracts and guide"
```

### Task 7: Release gate, PR and production verification

**Files:**
- Create: `docs/BLOCK-4B-CLI-RELEASE-2026-08-27.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`
- Modify: `public/.well-known/agent-friendly-cli.json`

**Interfaces:**
- Consumes: complete CLI release candidate and public site.
- Produces: verified merge commit, deployed Sites version and production receipt without broadening write permissions.

- [ ] **Step 1: Run the full local release gate**

Run: `npm test`

Expected: all tests PASS.

Run: `npm run lint`

Expected: exit `0`.

Run: `npm run build`

Expected: exit `0`.

Run: `npm run cli -- capabilities`

Expected: one valid JSON document and exit `0`.

Run: `node bin/afw.mjs audit https://agentfriendlyweb.dev --dry-run`

Expected: `status: "planned"`, 0 requests.

Run: `npm run cli -- audit https://agentfriendlyweb.dev`

Expected: `status: "ok"` with the current evidence-based AF level.

Run: `npm run cli -- registry get tokenizart`

Expected: `status: "ok"` with `agentfriendly.public-profile.v1`.

Run: `npm run cli -- okf verify --release v0.2`

Expected: `status: "ok"`, all declared OKF files verified.

- [ ] **Step 2: Verify installation from a clean Windows checkout**

Create a temporary clone outside the repo, run `npm ci`, then run `npm run cli -- capabilities` and `node bin/afw.mjs audit https://agentfriendlyweb.dev --dry-run`. Do not persist credentials or publish packages. The direct Node form is required for `--dry-run` because npm can consume that option before forwarding arguments to the script.

- [ ] **Step 3: Record the release candidate**

Create `docs/BLOCK-4B-CLI-RELEASE-2026-08-27.md` with exact branch/commit, commands, results, limitations and rollback. Mark the roadmap as code-complete/release-candidate; do not mark production until deployment verification passes.

- [ ] **Step 4: Commit, push and open the PR**

```bash
git add docs/BLOCK-4B-CLI-RELEASE-2026-08-27.md docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md
git commit -m "docs(cli): record read-only release gate"
git push -u origin feat/cli-readonly-v1
gh pr create --base main --head feat/cli-readonly-v1 --title "feat(cli): add public read-only CLI v1" --body-file docs/BLOCK-4B-CLI-RELEASE-2026-08-27.md
```

- [ ] **Step 5: Review PR and CI before merge**

Inspect the complete diff, verify no credentials/runtime writes/mutations, require green tests/lint/build, and merge only the reviewed head commit.

- [ ] **Step 6: Deploy the exact merge commit through Sites**

Build/package from the merge commit, create the next Sites version, deploy without changing unrelated DNS, billing or secrets, and preserve the previous version as rollback.

- [ ] **Step 7: Verify production and visual behavior**

Verify 200/expected content for:

```text
https://agentfriendlyweb.dev/cli
https://agentfriendlyweb.dev/cli/index.md
https://agentfriendlyweb.dev/.well-known/agent-friendly-cli.json
https://agentfriendlyweb.dev/schemas/cli-response.v1.json
```

Run the four CLI commands against production. Inspect `/cli` at desktop and mobile widths for legibility, no overlap, usable navigation and accurate release language.

- [ ] **Step 8: Close the receipt only after production passes**

Change manifest status from `release-candidate` to `deployed` only if the exact production checks pass. Record deployment version, merge SHA, evidence URLs, rollback target and residual limitations in the release document. Commit the receipt separately so code and post-deploy evidence remain distinguishable.
