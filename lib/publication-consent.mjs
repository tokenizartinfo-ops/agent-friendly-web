import { createHash } from "node:crypto";

import { PUBLICATION_CAPSULE_CONTRACT } from "./publication-capsule.mjs";

export const PUBLICATION_EVENT_CONTRACT = "agentfriendly.publication-event.v1";

export const PUBLICATION_STATES = Object.freeze([
  "draft",
  "domain_verification_pending",
  "owner_verified",
  "owner_approved",
  "maintainer_pending",
  "maintainer_approved",
  "applying",
  "applied",
  "verification_failed",
  "verified",
  "rolled_back",
  "revoked",
  "expired",
]);

const STATE_SET = new Set(PUBLICATION_STATES);
const ACTOR_PATTERN = /^[a-z][a-z0-9_-]{2,79}$/;
const SCOPE_PATTERN = /^[a-z][a-z0-9:_-]{2,79}$/;
const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;
const EVENT_ID_PATTERN = /^afwevt_[a-f0-9]{24}$/;
const TERMINAL_STATES = new Set(["verified", "rolled_back", "revoked", "expired"]);
const SENSITIVE_PATTERNS = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/i,
  /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|password|passwd)\s*[:=]\s*["']?[^\s"']{12,}/i,
  /\b(?:sk|pk)_(?:live|test)_[A-Za-z0-9_-]{16,}\b/,
];

const ACTION_RULES = Object.freeze({
  request_domain_verification: {
    from: "draft",
    to: "domain_verification_pending",
    role: "owner",
    scope: "domain:verify",
    capsuleActor: "owner_ref",
  },
  verify_domain: {
    from: "domain_verification_pending",
    to: "owner_verified",
    role: "verifier",
    scope: "domain:verify",
  },
  approve_owner: {
    from: "owner_verified",
    to: "owner_approved",
    role: "owner",
    scope: "capsule:approve",
    capsuleActor: "owner_ref",
  },
  request_maintainer: {
    from: "owner_approved",
    to: "maintainer_pending",
    role: "owner",
    scope: "maintainer:request",
    capsuleActor: "owner_ref",
  },
  approve_maintainer: {
    from: "maintainer_pending",
    to: "maintainer_approved",
    role: "maintainer",
    scope: "capsule:apply",
    capsuleActor: "maintainer_ref",
  },
  start_application: {
    from: "maintainer_approved",
    to: "applying",
    role: "executor",
    scope: "capsule:apply",
  },
  record_applied: {
    from: "applying",
    to: "applied",
    role: "executor",
    scope: "capsule:apply",
  },
  record_verified: {
    from: "applied",
    to: "verified",
    role: "verifier",
    scope: "publication:verify",
  },
  record_verification_failed: {
    from: "applied",
    to: "verification_failed",
    role: "verifier",
    scope: "publication:verify",
  },
  record_rollback: {
    from: "verification_failed",
    to: "rolled_back",
    role: "maintainer",
    scope: "capsule:rollback",
    capsuleActor: "maintainer_ref",
  },
});

function fail(message, code = "invalid_publication_event") {
  const error = new Error(message);
  error.code = code;
  throw error;
}

function timestamp(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) {
    fail("El evento requiere una fecha UTC valida.", "invalid_timestamp");
  }
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) fail("El evento requiere una fecha UTC valida.", "invalid_timestamp");
  return new Date(parsed).toISOString();
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
  }
  return value;
}

function eventId(event) {
  const digest = createHash("sha256").update(JSON.stringify(stableValue(event))).digest("hex");
  return `afwevt_${digest.slice(0, 24)}`;
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const item of Object.values(value)) deepFreeze(item);
  return Object.freeze(value);
}

function assertCapsule(capsule) {
  if (
    !capsule
    || capsule.contract !== PUBLICATION_CAPSULE_CONTRACT
    || typeof capsule.capsule_id !== "string"
    || !SHA256_PATTERN.test(capsule.digest ?? "")
    || typeof capsule.expires_at !== "string"
  ) {
    fail("La capsula asociada al evento no es valida.", "invalid_capsule");
  }
}

function normalizeReason(value) {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || value.length < 3 || value.length > 300 || /[\u0000-\u001f\u007f]/.test(value)) {
    fail("El motivo del evento no es valido.", "invalid_reason");
  }
  if (SENSITIVE_PATTERNS.some((pattern) => pattern.test(value))) {
    fail("El motivo contiene informacion sensible probable.", "sensitive_reason");
  }
  return value;
}

function normalizeScopes(value, requiredScope) {
  if (
    !Array.isArray(value)
    || value.length < 1
    || value.length > 8
    || value.some((scope) => typeof scope !== "string" || !SCOPE_PATTERN.test(scope))
  ) {
    fail("Los scopes del evento no son validos.", "invalid_scopes");
  }
  const scopes = [...new Set(value)].sort();
  if (!scopes.includes(requiredScope)) {
    fail("El evento no incluye el scope requerido.", "missing_scope");
  }
  return scopes;
}

function ruleFor(action, currentState) {
  if (action === "revoke") {
    if (TERMINAL_STATES.has(currentState) || ["applying", "applied", "verification_failed"].includes(currentState)) {
      fail("La revocacion no esta permitida en el estado actual.", "invalid_transition");
    }
    return {
      from: currentState,
      to: "revoked",
      role: "owner",
      scope: "capsule:revoke",
      capsuleActor: "owner_ref",
    };
  }
  const rule = ACTION_RULES[action];
  if (!rule || rule.from !== currentState) {
    fail("La transicion solicitada no esta permitida.", "invalid_transition");
  }
  return rule;
}

function exactInputKeys(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    fail("El evento debe ser un objeto.", "invalid_event");
  }
  const allowed = new Set(["action", "actor_ref", "actor_role", "scopes", "reason"]);
  if (Object.keys(input).some((key) => !allowed.has(key))) {
    fail("El evento contiene campos no permitidos.", "invalid_event");
  }
}

function exactStoredEventKeys(event) {
  const allowed = new Set([
    "event_id",
    "contract",
    "capsule_id",
    "capsule_digest",
    "action",
    "from_status",
    "to_status",
    "actor_ref",
    "actor_role",
    "scopes",
    "created_at",
    "reason",
  ]);
  if (Object.keys(event).some((key) => !allowed.has(key))) {
    fail("El evento contiene campos no permitidos.", "invalid_event");
  }
}

export function createPublicationEvent(capsule, input, options = {}) {
  assertCapsule(capsule);
  exactInputKeys(input);
  if (!STATE_SET.has(options.currentState)) {
    fail("El estado actual no es valido.", "invalid_state");
  }
  const createdAt = timestamp(options.now ?? new Date().toISOString());
  const rule = ruleFor(input.action, options.currentState);
  if (Date.parse(createdAt) >= Date.parse(capsule.expires_at) && input.action !== "record_rollback") {
    fail("La capsula esta expirada y no admite nuevas aprobaciones.", "expired_capsule");
  }
  if (input.actor_role !== rule.role) {
    fail(`La accion requiere el rol ${rule.role}.`, "invalid_actor_role");
  }
  if (typeof input.actor_ref !== "string" || !ACTOR_PATTERN.test(input.actor_ref)) {
    fail("La referencia del actor no es valida.", "invalid_actor");
  }
  if (rule.capsuleActor && input.actor_ref !== capsule[rule.capsuleActor]) {
    fail(`La accion debe ser realizada por el ${rule.role} declarado.`, "actor_mismatch");
  }
  const event = {
    contract: PUBLICATION_EVENT_CONTRACT,
    capsule_id: capsule.capsule_id,
    capsule_digest: capsule.digest,
    action: input.action,
    from_status: rule.from,
    to_status: rule.to,
    actor_ref: input.actor_ref,
    actor_role: input.actor_role,
    scopes: normalizeScopes(input.scopes, rule.scope),
    created_at: createdAt,
    ...(input.reason === undefined ? {} : { reason: normalizeReason(input.reason) }),
  };
  return deepFreeze({ event_id: eventId(event), ...event });
}

function validateStoredEvent(capsule, event, expectedState) {
  if (!event || event.contract !== PUBLICATION_EVENT_CONTRACT) {
    fail("El historial contiene un evento incompatible.", "invalid_event");
  }
  exactStoredEventKeys(event);
  if (event.capsule_id !== capsule.capsule_id || event.capsule_digest !== capsule.digest) {
    fail("El evento pertenece a otra capsula.", "capsule_mismatch");
  }
  if (!EVENT_ID_PATTERN.test(event.event_id ?? "")) {
    fail("El identificador del evento no es valido.", "invalid_event_id");
  }
  const { event_id: storedId, ...body } = event;
  if (eventId(body) !== storedId) {
    fail("El evento fue alterado.", "event_integrity_failure");
  }
  if (event.from_status !== expectedState) {
    fail("El historial contiene una transicion fuera de orden.", "invalid_transition");
  }
  const rule = ruleFor(event.action, expectedState);
  if (event.to_status !== rule.to || event.actor_role !== rule.role || !event.scopes?.includes(rule.scope)) {
    fail("El historial contiene una transicion no autorizada.", "invalid_transition");
  }
  if (rule.capsuleActor && event.actor_ref !== capsule[rule.capsuleActor]) {
    fail("El evento no corresponde al actor declarado en la capsula.", "actor_mismatch");
  }
  timestamp(event.created_at);
  if (event.reason !== undefined) normalizeReason(event.reason);
  return event.to_status;
}

export function projectPublicationState(capsule, events, options = {}) {
  assertCapsule(capsule);
  if (!Array.isArray(events) || events.length > 64) {
    fail("El historial de publicacion no es valido.", "invalid_event_history");
  }
  let status = "draft";
  let previousTime = Date.parse(capsule.created_at);
  for (const event of events) {
    const eventTime = Date.parse(event.created_at);
    if (!Number.isFinite(eventTime) || eventTime < previousTime) {
      fail("Los eventos de publicacion estan fuera de orden temporal.", "invalid_event_order");
    }
    status = validateStoredEvent(capsule, event, status);
    previousTime = eventTime;
  }
  const now = Date.parse(timestamp(options.now ?? new Date().toISOString()));
  if (now >= Date.parse(capsule.expires_at) && !TERMINAL_STATES.has(status) && !["applying", "applied", "verification_failed"].includes(status)) {
    status = "expired";
  }
  return Object.freeze({
    capsule_id: capsule.capsule_id,
    capsule_digest: capsule.digest,
    status,
    domain_verified: events.some((event) => event.action === "verify_domain"),
    owner_approved: events.some((event) => event.action === "approve_owner"),
    maintainer_approved: events.some((event) => event.action === "approve_maintainer"),
    applied: events.some((event) => event.action === "record_applied"),
    verified: status === "verified",
    event_count: events.length,
    last_event_at: events.at(-1)?.created_at ?? null,
  });
}
