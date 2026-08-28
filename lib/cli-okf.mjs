import { createHash } from "node:crypto";

import { CliError, EXIT_CODES } from "./cli-contract.mjs";
import { fetchLimitedPublicUrl } from "./public-network.mjs";

const DISTRIBUTION_CONTRACT = "agent-friendly-web.okf-distribution.v1";
const MAX_OKF_FILES = 100;
const SAFE_PATH = /^[A-Za-z0-9._/-]+$/;
const SHA256 = /^[a-f0-9]{64}$/;
const ALLOWED_MEDIA_TYPES = new Set([
  "application/json",
  "text/markdown",
  "text/plain",
]);

function integrityError(message, details = undefined) {
  return new CliError("okf_integrity_failure", message, EXIT_CODES.INTEGRITY, details);
}

function baseUrl(origin, release) {
  let parsed;
  try {
    parsed = new URL(origin);
  } catch {
    throw integrityError("El origen OKF no es una URL valida.");
  }
  if (
    !["http:", "https:"].includes(parsed.protocol)
    || parsed.username
    || parsed.password
    || parsed.port
    || parsed.pathname !== "/"
    || parsed.search
    || parsed.hash
  ) {
    throw integrityError("El origen OKF debe ser un origen HTTP publico sin credenciales ni ruta.");
  }
  if (!/^v\d+\.\d+$/.test(release)) {
    throw integrityError("La release OKF no cumple el formato vN.N.");
  }
  return new URL(`/okf/${release}/`, parsed);
}

function mediaType(value) {
  return String(value ?? "").split(";", 1)[0].trim().toLowerCase();
}

function validateRelativePath(value, base) {
  const filePath = String(value ?? "");
  if (
    !filePath
    || filePath.length > 300
    || !SAFE_PATH.test(filePath)
    || filePath.startsWith("/")
    || filePath.includes("\\")
    || filePath.includes("?")
    || filePath.includes("#")
  ) {
    throw integrityError(`Ruta OKF invalida: ${filePath || "<vacia>"}`);
  }
  const segments = filePath.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) {
    throw integrityError(`Ruta OKF fuera del bundle: ${filePath}`);
  }
  const resolved = new URL(filePath, base);
  if (
    resolved.origin !== base.origin
    || !resolved.pathname.startsWith(base.pathname)
    || resolved.search
    || resolved.hash
  ) {
    throw integrityError(`Ruta OKF fuera del bundle: ${filePath}`);
  }
  return filePath;
}

function parseChecksums(text) {
  const entries = new Map();
  const lines = String(text ?? "").replace(/\r\n?/g, "\n").trim().split("\n");
  if (lines.length === 1 && !lines[0]) throw integrityError("CHECKSUMS.sha256 esta vacio.");

  for (const line of lines) {
    const match = /^([a-f0-9]{64})\s{2}(.+)$/.exec(line);
    if (!match) throw integrityError(`Linea de checksum invalida: ${line}`);
    if (entries.has(match[2])) throw integrityError(`Checksum duplicado: ${match[2]}`);
    entries.set(match[2], match[1]);
  }
  return entries;
}

function sha256Hex(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function fetchResource(url, accept, dependencies) {
  let response;
  try {
    response = await (dependencies.fetchLimitedPublicUrl ?? fetchLimitedPublicUrl)(url, { accept });
  } catch (error) {
    throw new CliError(
      "network_failure",
      error instanceof Error ? error.message : "No se pudo leer el bundle OKF publico.",
      EXIT_CODES.NETWORK,
    );
  }
  if (response.status !== 200) {
    throw new CliError(
      "okf_resource_unavailable",
      `Recurso OKF no disponible: ${url.pathname} (HTTP ${response.status}).`,
      EXIT_CODES.NETWORK,
      { path: url.pathname, status: response.status },
    );
  }
  return response;
}

function validateManifest(manifest, release, base) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    throw integrityError("manifest.json debe contener un objeto JSON.");
  }
  if (manifest.schema !== DISTRIBUTION_CONTRACT) {
    throw integrityError("El contrato del manifest OKF no es compatible.");
  }
  if (manifest.okf_version !== release.slice(1)) {
    throw integrityError("La version OKF del manifest no coincide con la ruta solicitada.");
  }
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
    throw integrityError("El manifest OKF no declara archivos.");
  }
  if (manifest.files.length > MAX_OKF_FILES) {
    throw integrityError(`El manifest excede el maximo de ${MAX_OKF_FILES} archivos.`);
  }

  const seen = new Set();
  return manifest.files.map((entry) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw integrityError("El inventario OKF contiene una entrada invalida.");
    }
    const path = validateRelativePath(entry.path, base);
    if (seen.has(path)) throw integrityError(`Ruta OKF duplicada: ${path}`);
    seen.add(path);
    if (!SHA256.test(entry.sha256 ?? "")) {
      throw integrityError(`SHA-256 invalido en manifest: ${path}`);
    }
    const expectedMediaType = mediaType(entry.media_type);
    if (!ALLOWED_MEDIA_TYPES.has(expectedMediaType)) {
      throw integrityError(`Media type OKF no permitido en ${path}: ${entry.media_type ?? ""}`);
    }
    return { path, sha256: entry.sha256, mediaType: expectedMediaType };
  });
}

export async function verifyRemoteOkf(options, dependencies = {}) {
  const base = baseUrl(options.origin, options.release);
  if (options.dryRun) {
    return {
      planned: true,
      origin: options.origin,
      release: options.release,
      base_url: base.toString(),
      executed_requests: 0,
      initial_paths: ["manifest.json", "CHECKSUMS.sha256"],
    };
  }

  const manifestResponse = await fetchResource(
    new URL("manifest.json", base),
    "application/json,*/*;q=0.8",
    dependencies,
  );
  if (mediaType(manifestResponse.contentType) !== "application/json") {
    throw integrityError("manifest.json no fue servido como application/json.");
  }

  let manifest;
  try {
    manifest = JSON.parse(manifestResponse.body);
  } catch {
    throw integrityError("manifest.json no contiene JSON valido.");
  }
  const entries = validateManifest(manifest, options.release, base);

  const checksumResponse = await fetchResource(
    new URL("CHECKSUMS.sha256", base),
    "text/plain,*/*;q=0.8",
    dependencies,
  );
  if (mediaType(checksumResponse.contentType) !== "text/plain") {
    throw integrityError("CHECKSUMS.sha256 no fue servido como text/plain.");
  }
  const checksums = parseChecksums(checksumResponse.body);
  const expectedChecksumPaths = new Set(["manifest.json", ...entries.map((entry) => entry.path)]);
  if (
    checksums.size !== expectedChecksumPaths.size
    || [...checksums.keys()].some((path) => !expectedChecksumPaths.has(path))
  ) {
    throw integrityError("El inventario de CHECKSUMS.sha256 no coincide con el manifest.");
  }

  const hash = dependencies.sha256Hex ?? sha256Hex;
  if (checksums.get("manifest.json") !== hash(manifestResponse.body)) {
    throw integrityError("El checksum de manifest.json no coincide.");
  }

  await Promise.all(entries.map(async (entry) => {
    const response = await fetchResource(
      new URL(entry.path, base),
      `${entry.mediaType},*/*;q=0.8`,
      dependencies,
    );
    if (mediaType(response.contentType) !== entry.mediaType) {
      throw integrityError(`Media type remoto inesperado en ${entry.path}.`);
    }
    const actual = hash(response.body);
    if (actual !== entry.sha256 || actual !== checksums.get(entry.path)) {
      throw integrityError(`Checksum incorrecto en ${entry.path}.`);
    }
  }));

  return {
    valid: true,
    origin: options.origin,
    release: manifest.release,
    okf_version: manifest.okf_version,
    files_verified: entries.length,
    checksum_entries: checksums.size,
    writes: false,
  };
}

