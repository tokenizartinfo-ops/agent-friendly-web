import {
  createHash,
  sign as cryptoSign,
  verify as cryptoVerify,
} from "node:crypto";
import { isIP } from "node:net";

export const PUBLICATION_CAPSULE_CONTRACT = "agentfriendly.publication-capsule.v1";

export const DEFAULT_PUBLICATION_PATHS = Object.freeze([
  "/llms.txt",
  "/llms-full.txt",
  "/robots.txt",
  "/sitemap.xml",
  "/openapi.json",
  "/ai-catalog.json",
  "/.well-known/mcp.json",
]);

const ALLOWED_MEDIA_TYPES = new Set([
  "application/json",
  "application/ld+json",
  "application/xml",
  "text/markdown",
  "text/plain",
  "text/xml",
]);
const ALLOWED_MODES = new Set(["package", "pull_request", "connector"]);
const ALLOWED_OPERATIONS = new Set(["create", "replace", "delete"]);
const MAX_FILE_BYTES = 128 * 1024;
const MAX_BUNDLE_BYTES = 512 * 1024;
const MAX_FILES = 16;
const MIN_TTL_MS = 60 * 1000;
const MAX_TTL_MS = 14 * 24 * 60 * 60 * 1000;
const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;
const REFERENCE_PATTERN = /^[a-z][a-z0-9_-]{2,79}$/;
const ENVIRONMENT_PATTERN = /^[a-z][a-z0-9_-]{1,31}$/;
const KEY_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{2,79}$/;

const SENSITIVE_PATTERNS = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/i,
  /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|password|passwd)\s*[:=]\s*["']?[^\s"']{12,}/i,
  /\b(?:sk|pk)_(?:live|test)_[A-Za-z0-9_-]{16,}\b/,
  /\bgh[opusa]_[A-Za-z0-9]{20,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\b(?:postgres|mysql|mongodb(?:\+srv)?):\/\/[^\s/@:]+:[^\s/@]+@/i,
];

function fail(message, code = "invalid_capsule") {
  const error = new Error(message);
  error.code = code;
  throw error;
}

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, stableValue(value[key])]),
    );
  }
  return value;
}

function canonicalJson(value) {
  return JSON.stringify(stableValue(value));
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const item of Object.values(value)) deepFreeze(item);
  return Object.freeze(value);
}

function exactKeys(value, allowed, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} debe ser un objeto.`, "invalid_structure");
  }
  const unexpected = Object.keys(value).filter((key) => !allowed.has(key));
  if (unexpected.length > 0) {
    fail(`${label} contiene campos no permitidos.`, "invalid_structure");
  }
}

function normalizeTimestamp(value, label) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) {
    fail(`${label} debe ser una fecha UTC ISO 8601.`, "invalid_timestamp");
  }
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) fail(`${label} no es una fecha valida.`, "invalid_timestamp");
  return new Date(parsed).toISOString();
}

function normalizeDomain(value) {
  if (typeof value !== "string" || value !== value.trim() || value.length > 253 || /[^\x00-\x7F]/.test(value)) {
    fail("El dominio de la capsula no es valido.", "invalid_domain");
  }
  if (value.includes("://") || /[/?#:@]/.test(value) || isIP(value) !== 0) {
    fail("El dominio de la capsula no es valido.", "invalid_domain");
  }
  const domain = value.toLowerCase();
  const labels = domain.split(".");
  if (
    labels.length < 2
    || labels.some((label) => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))
    || ["localhost", "local", "internal", "invalid", "test"].includes(labels.at(-1))
  ) {
    fail("El dominio debe ser un hostname publico valido.", "invalid_domain");
  }
  return domain;
}

function normalizeReference(value, label) {
  if (typeof value !== "string" || !REFERENCE_PATTERN.test(value)) {
    fail(`${label} debe ser una referencia opaca valida.`, "invalid_reference");
  }
  return value;
}

function normalizePath(value, allowedPaths) {
  if (
    typeof value !== "string"
    || value.length < 2
    || value.length > 160
    || !value.startsWith("/")
    || value.includes("\\")
    || value.includes("..")
    || value.includes("//")
    || /[%?#\u0000-\u001f\u007f]/.test(value)
  ) {
    fail("Ruta invalida para publicacion.", "invalid_path");
  }
  if (!allowedPaths.has(value)) {
    fail("Ruta no autorizada por la allowlist de publicacion.", "path_not_allowed");
  }
  return value;
}

function containsSensitiveContent(content) {
  return SENSITIVE_PATTERNS.some((pattern) => pattern.test(content));
}

function normalizePostChecks(value) {
  if (value === undefined) return ["http_status_200", "content_hash_matches"];
  if (
    !Array.isArray(value)
    || value.length < 1
    || value.length > 16
    || value.some((item) => typeof item !== "string" || item.length < 1 || item.length > 160 || /[\u0000-\u001f\u007f]/.test(item))
  ) {
    fail("Cada post-check debe ser texto breve y seguro.", "invalid_post_check");
  }
  if (value.some(containsSensitiveContent)) {
    fail("Un post-check contiene contenido sensible o una credencial probable.", "sensitive_content");
  }
  return [...new Set(value)];
}

function normalizeFile(raw, allowedPaths) {
  exactKeys(
    raw,
    new Set(["path", "operation", "media_type", "content", "previous_sha256"]),
    "El archivo",
  );
  const path = normalizePath(raw.path, allowedPaths);
  if (!ALLOWED_OPERATIONS.has(raw.operation)) {
    fail("La operacion del archivo no esta permitida.", "invalid_operation");
  }
  if (!ALLOWED_MEDIA_TYPES.has(raw.media_type)) {
    fail("El media type del archivo no esta permitido.", "invalid_media_type");
  }
  if (typeof raw.content !== "string") {
    fail("El contenido debe ser texto UTF-8.", "invalid_content");
  }
  const content = raw.content.replace(/\r\n?/g, "\n");
  const size = Buffer.byteLength(content, "utf8");
  if (size > MAX_FILE_BYTES) {
    fail("Cada archivo debe medir como maximo 128 KiB.", "file_too_large");
  }
  if (containsSensitiveContent(content)) {
    fail("El archivo contiene contenido sensible o una credencial probable.", "sensitive_content");
  }
  if (raw.operation === "delete" && content !== "") {
    fail("Una eliminacion no puede incluir contenido nuevo.", "invalid_delete");
  }
  if (["replace", "delete"].includes(raw.operation) && !SHA256_PATTERN.test(raw.previous_sha256 ?? "")) {
    fail("Reemplazar o eliminar requiere un hash previo SHA-256.", "missing_previous_hash");
  }
  if (raw.operation === "create" && raw.previous_sha256 !== undefined) {
    fail("Crear una ruta no admite un hash previo.", "unexpected_previous_hash");
  }

  return {
    path,
    operation: raw.operation,
    media_type: raw.media_type,
    content,
    size_bytes: size,
    content_sha256: sha256(Buffer.from(content, "utf8")),
    ...(["replace", "delete"].includes(raw.operation)
      ? { previous_sha256: raw.previous_sha256 }
      : {}),
  };
}

function capsuleCore(capsule) {
  return {
    contract: capsule.contract,
    version: capsule.version,
    domain: capsule.domain,
    environment: capsule.environment,
    owner_ref: capsule.owner_ref,
    maintainer_ref: capsule.maintainer_ref,
    mode: capsule.mode,
    created_at: capsule.created_at,
    expires_at: capsule.expires_at,
    files: capsule.files,
    approval_requirements: capsule.approval_requirements,
    post_checks: capsule.post_checks,
    rollback: capsule.rollback,
  };
}

function signaturePayload(capsule) {
  return canonicalJson({
    ...capsule,
    signature: {
      algorithm: capsule.signature.algorithm,
      key_id: capsule.signature.key_id,
      signed_at: capsule.signature.signed_at,
    },
  });
}

function verifyFileHashes(capsule) {
  for (const file of capsule.files ?? []) {
    const actual = sha256(Buffer.from(file.content ?? "", "utf8"));
    if (actual !== file.content_sha256 || Buffer.byteLength(file.content ?? "", "utf8") !== file.size_bytes) {
      fail("El contenido no coincide con su hash declarado.", "file_hash_mismatch");
    }
  }
}

function verifyDigest(capsule) {
  const digest = sha256(canonicalJson(capsuleCore(capsule)));
  if (digest !== capsule.digest || capsule.capsule_id !== `afwcap_${digest.slice(7, 31)}`) {
    fail("El digest de la capsula no coincide.", "capsule_digest_mismatch");
  }
}

export function buildPublicationCapsule(input, options = {}) {
  exactKeys(
    input,
    new Set([
      "domain",
      "environment",
      "owner_ref",
      "maintainer_ref",
      "mode",
      "created_at",
      "expires_at",
      "files",
      "post_checks",
    ]),
    "La capsula",
  );
  const now = Date.parse(normalizeTimestamp(options.now ?? new Date().toISOString(), "now"));
  const createdAt = normalizeTimestamp(input.created_at, "created_at");
  const expiresAt = normalizeTimestamp(input.expires_at, "expires_at");
  const createdMs = Date.parse(createdAt);
  const expiresMs = Date.parse(expiresAt);
  if (createdMs > now + 5 * 60 * 1000) {
    fail("La fecha de creacion no puede estar en el futuro.", "invalid_created_at");
  }
  if (expiresMs - createdMs < MIN_TTL_MS || expiresMs <= now) {
    fail("La expiracion debe ser posterior por al menos un minuto.", "invalid_expiration");
  }
  if (expiresMs - createdMs > MAX_TTL_MS) {
    fail("La capsula no puede durar mas de 14 dias.", "invalid_expiration");
  }
  if (typeof input.environment !== "string" || !ENVIRONMENT_PATTERN.test(input.environment)) {
    fail("El entorno de publicacion no es valido.", "invalid_environment");
  }
  if (!ALLOWED_MODES.has(input.mode)) {
    fail("El modo de publicacion no esta permitido.", "invalid_mode");
  }
  if (!Array.isArray(input.files) || input.files.length < 1 || input.files.length > MAX_FILES) {
    fail("La capsula debe contener entre 1 y 16 archivos.", "invalid_file_count");
  }

  const allowedPaths = new Set(options.allowedPaths ?? DEFAULT_PUBLICATION_PATHS);
  const files = input.files.map((file) => normalizeFile(file, allowedPaths));
  if (new Set(files.map((file) => file.path)).size !== files.length) {
    fail("La capsula contiene una ruta repetida.", "duplicate_path");
  }
  if (files.reduce((total, file) => total + file.size_bytes, 0) > MAX_BUNDLE_BYTES) {
    fail("La capsula supera el limite total de 512 KiB.", "bundle_too_large");
  }

  const core = {
    contract: PUBLICATION_CAPSULE_CONTRACT,
    version: 1,
    domain: normalizeDomain(input.domain),
    environment: input.environment,
    owner_ref: normalizeReference(input.owner_ref, "owner_ref"),
    maintainer_ref: normalizeReference(input.maintainer_ref, "maintainer_ref"),
    mode: input.mode,
    created_at: createdAt,
    expires_at: expiresAt,
    files: files.sort((left, right) => left.path.localeCompare(right.path)),
    approval_requirements: {
      owner: "required",
      maintainer: "required",
      merge: "separate_explicit_approval",
    },
    post_checks: normalizePostChecks(input.post_checks),
    rollback: {
      strategy: input.mode === "pull_request" ? "revert_pull_request" : "restore_previous_hashes",
      scope: "capsule_paths_only",
    },
  };
  const digest = sha256(canonicalJson(core));
  return deepFreeze({
    ...core,
    capsule_id: `afwcap_${digest.slice(7, 31)}`,
    digest,
  });
}

export function signPublicationCapsule(capsule, privateKey, options = {}) {
  if (!capsule || capsule.contract !== PUBLICATION_CAPSULE_CONTRACT || capsule.signature) {
    fail("Solo puede firmarse una capsula v1 sin firma previa.", "invalid_signing_input");
  }
  verifyFileHashes(capsule);
  verifyDigest(capsule);
  if (!KEY_ID_PATTERN.test(options.keyId ?? "")) {
    fail("La firma requiere un key_id valido.", "invalid_key_id");
  }
  const signedAt = normalizeTimestamp(options.signedAt ?? capsule.created_at, "signed_at");
  if (
    Date.parse(signedAt) < Date.parse(capsule.created_at)
    || Date.parse(signedAt) >= Date.parse(capsule.expires_at)
  ) {
    fail("La firma debe realizarse dentro de la vigencia de la capsula.", "invalid_signature_time");
  }
  const candidate = {
    ...structuredClone(capsule),
    signature: {
      algorithm: "Ed25519",
      key_id: options.keyId,
      signed_at: signedAt,
      value: "",
    },
  };
  try {
    candidate.signature.value = cryptoSign(
      null,
      Buffer.from(signaturePayload(candidate), "utf8"),
      privateKey,
    ).toString("base64url");
  } catch {
    fail("No se pudo firmar la capsula con la clave provista.", "signing_failed");
  }
  return deepFreeze(candidate);
}

export function verifyPublicationCapsule(capsule, publicKey, options = {}) {
  try {
    if (!capsule || capsule.contract !== PUBLICATION_CAPSULE_CONTRACT) {
      fail("El contrato de la capsula no es compatible.", "invalid_contract");
    }
    exactKeys(
      capsule,
      new Set([
        "contract",
        "version",
        "domain",
        "environment",
        "owner_ref",
        "maintainer_ref",
        "mode",
        "created_at",
        "expires_at",
        "files",
        "approval_requirements",
        "post_checks",
        "rollback",
        "capsule_id",
        "digest",
        "signature",
      ]),
      "La capsula firmada",
    );
    verifyFileHashes(capsule);
    verifyDigest(capsule);
    const now = Date.parse(normalizeTimestamp(options.now ?? new Date().toISOString(), "now"));
    if (Date.parse(capsule.expires_at) <= now) {
      fail("La capsula esta expirada.", "expired_capsule");
    }
    if (
      capsule.signature?.algorithm !== "Ed25519"
      || !KEY_ID_PATTERN.test(capsule.signature?.key_id ?? "")
      || typeof capsule.signature?.value !== "string"
    ) {
      fail("La firma de la capsula no es valida.", "invalid_signature");
    }
    const signedAt = normalizeTimestamp(capsule.signature.signed_at, "signed_at");
    if (
      Date.parse(signedAt) < Date.parse(capsule.created_at)
      || Date.parse(signedAt) >= Date.parse(capsule.expires_at)
    ) {
      fail("La firma esta fuera de la vigencia de la capsula.", "invalid_signature_time");
    }
    const valid = cryptoVerify(
      null,
      Buffer.from(signaturePayload(capsule), "utf8"),
      publicKey,
      Buffer.from(capsule.signature.value, "base64url"),
    );
    if (!valid) fail("La firma de la capsula no es valida.", "invalid_signature");
    return {
      valid: true,
      capsule_id: capsule.capsule_id,
      digest: capsule.digest,
      key_id: capsule.signature.key_id,
    };
  } catch (error) {
    return {
      valid: false,
      code: error?.code ?? "invalid_capsule",
      message: "La capsula no supero la verificacion de integridad.",
    };
  }
}

export function publicationIdempotencyKey(capsule) {
  if (!capsule?.capsule_id || !capsule?.digest || !Array.isArray(capsule.files)) {
    fail("No se puede derivar idempotencia de una capsula invalida.", "invalid_capsule");
  }
  return sha256(canonicalJson({
    capsule_id: capsule.capsule_id,
    digest: capsule.digest,
    domain: capsule.domain,
    files: capsule.files.map((file) => ({
      path: file.path,
      operation: file.operation,
      content_sha256: file.content_sha256,
      previous_sha256: file.previous_sha256 ?? null,
    })),
  }));
}
