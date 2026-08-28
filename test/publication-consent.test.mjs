import test from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import { readFile } from "node:fs/promises";

import {
  buildPublicationCapsule,
  signPublicationCapsule,
} from "../lib/publication-capsule.mjs";
import {
  PUBLICATION_EVENT_CONTRACT,
  PUBLICATION_STATES,
  createPublicationEvent,
  projectPublicationState,
} from "../lib/publication-consent.mjs";

const NOW = "2026-08-28T15:00:00.000Z";
const PREVIOUS_HASH = `sha256:${"a".repeat(64)}`;

function signedCapsule() {
  const { privateKey } = generateKeyPairSync("ed25519");
  return signPublicationCapsule(buildPublicationCapsule({
    domain: "example.com",
    environment: "production",
    owner_ref: "owner_example_01",
    maintainer_ref: "maintainer_example_01",
    mode: "pull_request",
    created_at: NOW,
    expires_at: "2026-08-30T15:00:00.000Z",
    files: [{
      path: "/llms.txt",
      operation: "replace",
      media_type: "text/plain",
      content: "# Example\n",
      previous_sha256: PREVIOUS_HASH,
    }],
  }, { now: NOW }), privateKey, { keyId: "test-key-2026" });
}

const APPROVAL_PATH = [
  {
    action: "request_domain_verification",
    actor_ref: "owner_example_01",
    actor_role: "owner",
    scopes: ["domain:verify"],
  },
  {
    action: "verify_domain",
    actor_ref: "verifier_afw_01",
    actor_role: "verifier",
    scopes: ["domain:verify"],
  },
  {
    action: "approve_owner",
    actor_ref: "owner_example_01",
    actor_role: "owner",
    scopes: ["capsule:approve"],
  },
  {
    action: "request_maintainer",
    actor_ref: "owner_example_01",
    actor_role: "owner",
    scopes: ["maintainer:request"],
  },
  {
    action: "approve_maintainer",
    actor_ref: "maintainer_example_01",
    actor_role: "maintainer",
    scopes: ["capsule:apply"],
  },
];

function eventPath(capsule, inputs = APPROVAL_PATH) {
  const events = [];
  let currentState = "draft";
  inputs.forEach((input, index) => {
    const event = createPublicationEvent(capsule, input, {
      currentState,
      now: new Date(Date.parse(NOW) + index * 1000).toISOString(),
    });
    events.push(event);
    currentState = event.to_status;
  });
  return events;
}

test("requires domain, owner and maintainer consent in order", () => {
  const capsule = signedCapsule();
  const events = eventPath(capsule);
  const state = projectPublicationState(capsule, events, { now: "2026-08-28T15:01:00.000Z" });

  assert.equal(state.status, "maintainer_approved");
  assert.equal(state.domain_verified, true);
  assert.equal(state.owner_approved, true);
  assert.equal(state.maintainer_approved, true);
  assert.equal(state.event_count, 5);
  assert.deepEqual(PUBLICATION_STATES.slice(0, 6), [
    "draft",
    "domain_verification_pending",
    "owner_verified",
    "owner_approved",
    "maintainer_pending",
    "maintainer_approved",
  ]);
});

test("cannot jump from draft to applying or use the wrong actor role", () => {
  const capsule = signedCapsule();
  assert.throws(
    () => createPublicationEvent(capsule, {
      action: "start_application",
      actor_ref: "executor_afw_01",
      actor_role: "executor",
      scopes: ["capsule:apply"],
    }, { currentState: "draft", now: NOW }),
    /transicion/i,
  );
  assert.throws(
    () => createPublicationEvent(capsule, {
      ...APPROVAL_PATH[2],
      actor_ref: "maintainer_example_01",
      actor_role: "maintainer",
    }, { currentState: "owner_verified", now: NOW }),
    /owner/i,
  );
});

test("rejects approvals bound to another capsule", () => {
  const capsule = signedCapsule();
  const events = eventPath(capsule);
  const foreign = structuredClone(events);
  foreign[2].capsule_digest = `sha256:${"b".repeat(64)}`;

  assert.throws(
    () => projectPublicationState(capsule, foreign, { now: "2026-08-28T15:01:00.000Z" }),
    /capsula/i,
  );
});

test("expiry cannot be extended by later approvals", () => {
  const capsule = signedCapsule();
  const events = eventPath(capsule);
  const state = projectPublicationState(capsule, events, { now: "2026-08-31T15:00:00.000Z" });

  assert.equal(state.status, "expired");
  assert.equal(state.maintainer_approved, true);
});

test("supports verification failure and scoped rollback only after apply", () => {
  const capsule = signedCapsule();
  const executionInputs = [
    ...APPROVAL_PATH,
    {
      action: "start_application",
      actor_ref: "executor_afw_01",
      actor_role: "executor",
      scopes: ["capsule:apply"],
    },
    {
      action: "record_applied",
      actor_ref: "executor_afw_01",
      actor_role: "executor",
      scopes: ["capsule:apply"],
    },
    {
      action: "record_verification_failed",
      actor_ref: "verifier_afw_01",
      actor_role: "verifier",
      scopes: ["publication:verify"],
      reason: "El hash publico no coincide.",
    },
    {
      action: "record_rollback",
      actor_ref: "maintainer_example_01",
      actor_role: "maintainer",
      scopes: ["capsule:rollback"],
    },
  ];
  const events = eventPath(capsule, executionInputs);
  const state = projectPublicationState(capsule, events, { now: "2026-08-28T15:01:00.000Z" });

  assert.equal(state.status, "rolled_back");
  assert.equal(state.applied, true);
  assert.equal(state.verified, false);
});

test("events are metadata-only and reject credential-like reasons", () => {
  const capsule = signedCapsule();
  const event = createPublicationEvent(capsule, APPROVAL_PATH[0], {
    currentState: "draft",
    now: NOW,
  });

  assert.equal(event.contract, PUBLICATION_EVENT_CONTRACT);
  assert.equal("content" in event, false);
  assert.equal(JSON.stringify(event).includes(capsule.files[0].content), false);
  assert.equal(Object.isFrozen(event), true);
  assert.equal(Object.isFrozen(event.scopes), true);

  const extraField = structuredClone(event);
  extraField.content = "unexpected public body";
  assert.throws(
    () => projectPublicationState(capsule, [extraField], { now: "2026-08-28T15:01:00.000Z" }),
    /campos no permitidos/i,
  );

  const secret = "fixture-secret-material-0000000";
  let captured;
  try {
    createPublicationEvent(capsule, {
      ...APPROVAL_PATH[0],
      reason: `password=${secret}`,
    }, { currentState: "draft", now: NOW });
  } catch (error) {
    captured = error;
  }
  assert.ok(captured instanceof Error);
  assert.match(captured.message, /sensible/i);
  assert.equal(captured.message.includes(secret), false);
});

test("publication approval schema is strict and metadata-only", async () => {
  const schema = JSON.parse(await readFile(
    new URL("../public/schemas/publication-approval.v1.json", import.meta.url),
    "utf8",
  ));

  assert.equal(schema.additionalProperties, false);
  assert.equal(schema.properties.contract.const, PUBLICATION_EVENT_CONTRACT);
  assert.equal("content" in schema.properties, false);
  assert.equal(schema.properties.action.enum.includes("approve_maintainer"), true);
});
