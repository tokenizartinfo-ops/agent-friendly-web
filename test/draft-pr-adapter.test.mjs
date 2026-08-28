import test from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import { readFile } from "node:fs/promises";

import {
  buildPublicationCapsule,
  signPublicationCapsule,
} from "../lib/publication-capsule.mjs";
import {
  createPublicationEvent,
  projectPublicationState,
} from "../lib/publication-consent.mjs";
import {
  DRAFT_PR_PLAN_CONTRACT,
  buildDraftPrPlan,
} from "../lib/draft-pr-adapter.mjs";

const NOW = "2026-08-28T15:00:00.000Z";
const LATER = "2026-08-28T15:01:00.000Z";
const PREVIOUS_HASH = `sha256:${"a".repeat(64)}`;

function fixture() {
  const { privateKey, publicKey } = generateKeyPairSync("ed25519");
  const capsule = signPublicationCapsule(buildPublicationCapsule({
    domain: "example.com",
    environment: "production",
    owner_ref: "owner_example_01",
    maintainer_ref: "maintainer_example_01",
    mode: "pull_request",
    created_at: NOW,
    expires_at: "2026-08-30T15:00:00.000Z",
    files: [
      {
        path: "/llms.txt",
        operation: "replace",
        media_type: "text/plain",
        content: "# Example\n",
        previous_sha256: PREVIOUS_HASH,
      },
      {
        path: "/.well-known/mcp.json",
        operation: "create",
        media_type: "application/json",
        content: "{\"status\":\"proposed\"}\n",
      },
    ],
  }, { now: NOW }), privateKey, { keyId: "test-key-2026" });

  const inputs = [
    ["request_domain_verification", "owner_example_01", "owner", "domain:verify"],
    ["verify_domain", "verifier_afw_01", "verifier", "domain:verify"],
    ["approve_owner", "owner_example_01", "owner", "capsule:approve"],
    ["request_maintainer", "owner_example_01", "owner", "maintainer:request"],
    ["approve_maintainer", "maintainer_example_01", "maintainer", "capsule:apply"],
  ];
  const events = [];
  let currentState = "draft";
  inputs.forEach(([action, actor_ref, actor_role, scope], index) => {
    const event = createPublicationEvent(capsule, {
      action,
      actor_ref,
      actor_role,
      scopes: [scope],
    }, {
      currentState,
      now: new Date(Date.parse(NOW) + index * 1000).toISOString(),
    });
    currentState = event.to_status;
    events.push(event);
  });

  return {
    capsule,
    publicKey,
    approvedState: projectPublicationState(capsule, events, { now: LATER }),
    ownerOnlyState: projectPublicationState(capsule, events.slice(0, 3), { now: LATER }),
  };
}

test("creates a deterministic Draft PR plan without executing it", () => {
  const { capsule, publicKey, approvedState } = fixture();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => {
    throw new Error("network access is forbidden");
  };
  try {
    const first = buildDraftPrPlan(capsule, {
      publication_state: approvedState,
      repository: "example/site",
      base_branch: "main",
    }, { publicKey, now: LATER });
    const second = buildDraftPrPlan(capsule, {
      publication_state: approvedState,
      repository: "example/site",
      base_branch: "main",
    }, { publicKey, now: LATER });

    assert.deepEqual(first, second);
    assert.equal(first.contract, DRAFT_PR_PLAN_CONTRACT);
    assert.equal(first.draft, true);
    assert.equal(first.auto_merge, false);
    assert.equal(first.executed, false);
    assert.match(first.plan_id, /^afwpr_[a-f0-9]{24}$/);
    assert.match(first.branch, /^afw\/capsule-[a-f0-9]{12}$/);
    assert.deepEqual(first.touched_paths, [".well-known/mcp.json", "llms.txt"]);
    assert.equal(first.changes[0].content.includes("proposed"), true);
    assert.equal(first.rollback.strategy, "revert_pull_request");
    assert.deepEqual(first.requested_permissions, ["contents:write", "pull_requests:write"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rejects missing maintainer consent and mismatched capsule state", () => {
  const { capsule, publicKey, approvedState, ownerOnlyState } = fixture();
  assert.throws(
    () => buildDraftPrPlan(capsule, {
      publication_state: ownerOnlyState,
      repository: "example/site",
      base_branch: "main",
    }, { publicKey, now: LATER }),
    /mantenedor/i,
  );

  assert.throws(
    () => buildDraftPrPlan(capsule, {
      publication_state: { ...approvedState, capsule_digest: `sha256:${"b".repeat(64)}` },
      repository: "example/site",
      base_branch: "main",
    }, { publicKey, now: LATER }),
    /capsula/i,
  );
});

test("rejects invalid repositories, branches and non pull-request capsules", () => {
  const { capsule, publicKey, approvedState } = fixture();
  assert.throws(
    () => buildDraftPrPlan(capsule, {
      publication_state: approvedState,
      repository: "../private",
      base_branch: "main",
    }, { publicKey, now: LATER }),
    /repositorio/i,
  );
  assert.throws(
    () => buildDraftPrPlan(capsule, {
      publication_state: approvedState,
      repository: "example/site",
      base_branch: "../main",
    }, { publicKey, now: LATER }),
    /rama base/i,
  );
  assert.throws(
    () => buildDraftPrPlan(capsule, {
      publication_state: approvedState,
      repository: "example/site",
      base_branch: "main",
      token: "not-accepted-here",
    }, { publicKey, now: LATER }),
    /contexto.*campos no permitidos/i,
  );

  const packageCapsule = {
    ...capsule,
    mode: "package",
  };
  assert.throws(
    () => buildDraftPrPlan(packageCapsule, {
      publication_state: approvedState,
      repository: "example/site",
      base_branch: "main",
    }, { publicKey, now: LATER }),
    /pull_request/i,
  );
});

test("rejects a tampered capsule before planning repository changes", () => {
  const { capsule, publicKey, approvedState } = fixture();
  const tampered = structuredClone(capsule);
  tampered.files[0].content = "changed";

  assert.throws(
    () => buildDraftPrPlan(tampered, {
      publication_state: approvedState,
      repository: "example/site",
      base_branch: "main",
    }, { publicKey, now: LATER }),
    /integridad/i,
  );
});

test("Draft PR plan schema forbids execution and automatic merge", async () => {
  const schema = JSON.parse(await readFile(
    new URL("../public/schemas/draft-pr-plan.v1.json", import.meta.url),
    "utf8",
  ));

  assert.equal(schema.additionalProperties, false);
  assert.equal(schema.properties.contract.const, DRAFT_PR_PLAN_CONTRACT);
  assert.equal(schema.properties.draft.const, true);
  assert.equal(schema.properties.auto_merge.const, false);
  assert.equal(schema.properties.executed.const, false);
});
