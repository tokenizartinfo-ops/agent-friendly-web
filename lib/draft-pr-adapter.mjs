import { createHash } from "node:crypto";

import {
  publicationIdempotencyKey,
  verifyPublicationCapsule,
} from "./publication-capsule.mjs";

export const DRAFT_PR_PLAN_CONTRACT = "agentfriendly.draft-pr-plan.v1";

const REPOSITORY_PATTERN = /^[A-Za-z0-9_.-]{1,100}\/[A-Za-z0-9_.-]{1,100}$/;
const BRANCH_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._/-]{0,99}$/;

function fail(message, code = "invalid_draft_pr_plan") {
  const error = new Error(message);
  error.code = code;
  throw error;
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
  }
  return value;
}

function digest(value) {
  return createHash("sha256").update(JSON.stringify(stableValue(value))).digest("hex");
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const item of Object.values(value)) deepFreeze(item);
  return Object.freeze(value);
}

function normalizeRepository(value) {
  if (!REPOSITORY_PATTERN.test(value ?? "")) {
    fail("El repositorio debe usar el formato owner/repo.", "invalid_repository");
  }
  const [owner, repo] = value.split("/");
  if ([owner, repo].some((part) => part === "." || part === ".." || part.startsWith(".") || part.endsWith("."))) {
    fail("El repositorio no es valido.", "invalid_repository");
  }
  return value;
}

function normalizeBaseBranch(value) {
  if (
    !BRANCH_PATTERN.test(value ?? "")
    || value.includes("..")
    || value.includes("//")
    || value.includes("@{")
    || value.endsWith("/")
    || value.endsWith(".")
    || /[\u0000-\u0020\u007f~^:?*\[\\]/.test(value)
  ) {
    fail("La rama base no es valida.", "invalid_base_branch");
  }
  return value;
}

function repositoryPath(publicPath) {
  const path = publicPath.replace(/^\//, "");
  if (!path || path.includes("..") || path.includes("\\") || path.startsWith("/")) {
    fail("La capsula contiene una ruta incompatible con Git.", "invalid_repository_path");
  }
  return path;
}

function validateState(capsule, state) {
  if (
    !state
    || state.capsule_id !== capsule.capsule_id
    || state.capsule_digest !== capsule.digest
  ) {
    fail("El estado de aprobacion pertenece a otra capsula.", "capsule_state_mismatch");
  }
  if (state.status !== "maintainer_approved" || !state.owner_approved || !state.maintainer_approved) {
    fail("El plan requiere la aprobacion previa del owner y del mantenedor.", "maintainer_approval_required");
  }
}

function validateContext(context) {
  if (!context || typeof context !== "object" || Array.isArray(context)) {
    fail("El contexto del Draft PR debe ser un objeto.", "invalid_context");
  }
  const allowed = new Set(["publication_state", "repository", "base_branch"]);
  if (Object.keys(context).some((key) => !allowed.has(key))) {
    fail("El contexto contiene campos no permitidos.", "invalid_context");
  }
}

export function buildDraftPrPlan(capsule, context, options = {}) {
  if (capsule?.mode !== "pull_request") {
    fail("El adaptador Draft PR solo acepta capsulas en modo pull_request.", "invalid_capsule_mode");
  }
  validateContext(context);
  validateState(capsule, context?.publication_state);
  const verification = verifyPublicationCapsule(capsule, options.publicKey, {
    now: options.now ?? new Date().toISOString(),
  });
  if (!verification.valid) {
    fail("La capsula no supero la verificacion de integridad.", "capsule_integrity_failure");
  }
  const repository = normalizeRepository(context.repository);
  const baseBranch = normalizeBaseBranch(context.base_branch ?? "main");
  const changes = capsule.files
    .map((file) => ({
      path: repositoryPath(file.path),
      operation: file.operation,
      media_type: file.media_type,
      content: file.content,
      content_sha256: file.content_sha256,
      ...(file.previous_sha256 ? { expected_previous_sha256: file.previous_sha256 } : {}),
    }))
    .sort((left, right) => left.path.localeCompare(right.path));
  const touchedPaths = changes.map((change) => change.path);
  const digestPrefix = capsule.digest.slice(7, 19);
  const idempotencyKey = publicationIdempotencyKey(capsule);
  const planSeed = {
    capsule_id: capsule.capsule_id,
    capsule_digest: capsule.digest,
    repository,
    base_branch: baseBranch,
    idempotency_key: idempotencyKey,
  };

  return deepFreeze({
    contract: DRAFT_PR_PLAN_CONTRACT,
    plan_id: `afwpr_${digest(planSeed).slice(0, 24)}`,
    capsule_id: capsule.capsule_id,
    capsule_digest: capsule.digest,
    idempotency_key: idempotencyKey,
    repository,
    base_branch: baseBranch,
    branch: `afw/capsule-${digestPrefix}`,
    title: `Agent Friendly Web: publication capsule ${capsule.capsule_id}`,
    body: [
      "Draft PR plan generated from an approved Agent Friendly Web publication capsule.",
      `Domain: ${capsule.domain}`,
      `Capsule: ${capsule.capsule_id}`,
      "Automatic merge is disabled. Final review and merge remain separate human decisions.",
    ].join("\n\n"),
    draft: true,
    auto_merge: false,
    executed: false,
    requested_permissions: ["contents:write", "pull_requests:write"],
    touched_paths: touchedPaths,
    changes,
    post_checks: changes.map((change) => ({
      type: "public_http",
      url: `https://${capsule.domain}/${change.path}`,
      expected_status: change.operation === "delete" ? 404 : 200,
      ...(change.operation === "delete" ? {} : { expected_sha256: change.content_sha256 }),
    })),
    rollback: {
      strategy: "revert_pull_request",
      scope: "capsule_paths_only",
      touched_paths: touchedPaths,
      previous_hashes: Object.fromEntries(
        changes
          .filter((change) => change.expected_previous_sha256)
          .map((change) => [change.path, change.expected_previous_sha256]),
      ),
    },
    limits: [
      "Plan local: no crea ramas, commits ni pull requests.",
      "No usa red, credenciales ni tokens de GitHub.",
      "Nunca habilita merge automatico.",
    ],
  });
}
