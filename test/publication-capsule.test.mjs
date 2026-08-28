import test from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import { readFile } from "node:fs/promises";

import {
  PUBLICATION_CAPSULE_CONTRACT,
  buildPublicationCapsule,
  publicationIdempotencyKey,
  signPublicationCapsule,
  verifyPublicationCapsule,
} from "../lib/publication-capsule.mjs";

const NOW = "2026-08-28T15:00:00.000Z";
const EXPIRES = "2026-08-30T15:00:00.000Z";
const PREVIOUS_HASH = `sha256:${"a".repeat(64)}`;

function inputWith(overrides = {}) {
  return {
    domain: "example.com",
    environment: "production",
    owner_ref: "owner_example_01",
    maintainer_ref: "maintainer_example_01",
    mode: "pull_request",
    created_at: NOW,
    expires_at: EXPIRES,
    files: [
      {
        path: "/llms.txt",
        operation: "replace",
        media_type: "text/plain",
        content: "# Example\n\nCanonical public description.\n",
        previous_sha256: PREVIOUS_HASH,
      },
    ],
    ...overrides,
  };
}

test("builds and verifies an immutable signed capsule", () => {
  const { privateKey, publicKey } = generateKeyPairSync("ed25519");
  const first = buildPublicationCapsule(inputWith(), { now: NOW });
  const second = buildPublicationCapsule(inputWith(), { now: NOW });

  assert.deepEqual(first, second);
  assert.equal(first.contract, PUBLICATION_CAPSULE_CONTRACT);
  assert.match(first.capsule_id, /^afwcap_[a-f0-9]{24}$/);
  assert.match(first.digest, /^sha256:[a-f0-9]{64}$/);
  assert.equal(first.files[0].content_sha256.startsWith("sha256:"), true);
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(first.files), true);

  const signed = signPublicationCapsule(first, privateKey, { keyId: "test-key-2026" });
  const verification = verifyPublicationCapsule(signed, publicKey, { now: NOW });

  assert.deepEqual(verification, {
    valid: true,
    capsule_id: first.capsule_id,
    digest: first.digest,
    key_id: "test-key-2026",
  });
  assert.equal(JSON.stringify(signed).includes("PRIVATE KEY"), false);
  assert.match(publicationIdempotencyKey(signed), /^sha256:[a-f0-9]{64}$/);
});

test("detects tampered content, hashes and signatures", () => {
  const { privateKey, publicKey } = generateKeyPairSync("ed25519");
  const signed = signPublicationCapsule(
    buildPublicationCapsule(inputWith(), { now: NOW }),
    privateKey,
    { keyId: "test-key-2026" },
  );

  const changedContent = structuredClone(signed);
  changedContent.files[0].content = "# Changed\n";
  assert.equal(
    verifyPublicationCapsule(changedContent, publicKey, { now: NOW }).code,
    "file_hash_mismatch",
  );

  const changedDigest = structuredClone(signed);
  changedDigest.digest = `sha256:${"b".repeat(64)}`;
  assert.equal(
    verifyPublicationCapsule(changedDigest, publicKey, { now: NOW }).code,
    "capsule_digest_mismatch",
  );

  const changedSignature = structuredClone(signed);
  changedSignature.signature.value = `${changedSignature.signature.value[0] === "A" ? "B" : "A"}${changedSignature.signature.value.slice(1)}`;
  assert.equal(
    verifyPublicationCapsule(changedSignature, publicKey, { now: NOW }).code,
    "invalid_signature",
  );
});

test("rejects non-allowlisted paths, traversal, duplicates and unsafe delete", () => {
  assert.throws(
    () => buildPublicationCapsule(inputWith({
      files: [{
        path: "/admin/config.php",
        operation: "create",
        media_type: "text/plain",
        content: "public",
      }],
    }), { now: NOW }),
    /ruta no autorizada/i,
  );
  assert.throws(
    () => buildPublicationCapsule(inputWith({
      files: [{
        path: "/../llms.txt",
        operation: "create",
        media_type: "text/plain",
        content: "public",
      }],
    }), { now: NOW }),
    /ruta invalida/i,
  );
  assert.throws(
    () => buildPublicationCapsule(inputWith({
      files: [inputWith().files[0], inputWith().files[0]],
    }), { now: NOW }),
    /ruta repetida/i,
  );
  assert.throws(
    () => buildPublicationCapsule(inputWith({
      files: [{
        path: "/llms.txt",
        operation: "delete",
        media_type: "text/plain",
        content: "",
      }],
    }), { now: NOW }),
    /hash previo/i,
  );
});

test("rejects credential-like content without echoing the value", () => {
  const secret = "fixture-secret-material-0000000";
  let captured;
  try {
    buildPublicationCapsule(inputWith({
      files: [{
        path: "/llms.txt",
        operation: "replace",
        media_type: "text/plain",
        content: `api_key=${secret}`,
        previous_sha256: PREVIOUS_HASH,
      }],
    }), { now: NOW });
  } catch (error) {
    captured = error;
  }

  assert.ok(captured instanceof Error);
  assert.match(captured.message, /contenido sensible/i);
  assert.equal(captured.message.includes(secret), false);
});

test("rejects credential-like post-checks and signatures outside the capsule window", () => {
  const secret = "fixture-secret-material-0000000";
  assert.throws(
    () => buildPublicationCapsule(inputWith({
      post_checks: [`api_key=${secret}`],
    }), { now: NOW }),
    /contenido sensible/i,
  );
  assert.throws(
    () => buildPublicationCapsule(inputWith({
      post_checks: [{ command: "curl" }],
    }), { now: NOW }),
    /post-check/i,
  );

  const { privateKey } = generateKeyPairSync("ed25519");
  const capsule = buildPublicationCapsule(inputWith(), { now: NOW });
  assert.throws(
    () => signPublicationCapsule(capsule, privateKey, {
      keyId: "test-key-2026",
      signedAt: "2026-08-27T15:00:00.000Z",
    }),
    /vigencia/i,
  );
  assert.throws(
    () => signPublicationCapsule(capsule, privateKey, {
      keyId: "test-key-2026",
      signedAt: EXPIRES,
    }),
    /vigencia/i,
  );
});

test("enforces text media, byte limits, bounded TTL and public hostnames", () => {
  assert.throws(
    () => buildPublicationCapsule(inputWith({
      files: [{
        path: "/llms.txt",
        operation: "replace",
        media_type: "application/octet-stream",
        content: "bytes",
        previous_sha256: PREVIOUS_HASH,
      }],
    }), { now: NOW }),
    /media type/i,
  );
  assert.throws(
    () => buildPublicationCapsule(inputWith({
      files: [{
        path: "/llms.txt",
        operation: "replace",
        media_type: "text/plain",
        content: "x".repeat(128 * 1024 + 1),
        previous_sha256: PREVIOUS_HASH,
      }],
    }), { now: NOW }),
    /128 KiB/i,
  );
  assert.throws(
    () => buildPublicationCapsule(inputWith({ expires_at: NOW }), { now: NOW }),
    /expiracion/i,
  );
  assert.throws(
    () => buildPublicationCapsule(inputWith({ expires_at: "2026-09-20T15:00:00.000Z" }), { now: NOW }),
    /14 dias/i,
  );
  assert.throws(
    () => buildPublicationCapsule(inputWith({ domain: "localhost" }), { now: NOW }),
    /dominio/i,
  );
});

test("idempotency changes only when the authorized publication payload changes", () => {
  const first = buildPublicationCapsule(inputWith(), { now: NOW });
  const same = buildPublicationCapsule(inputWith(), { now: NOW });
  const changed = buildPublicationCapsule(inputWith({
    files: [{
      ...inputWith().files[0],
      content: "# Example\n\nUpdated public description.\n",
    }],
  }), { now: NOW });

  assert.equal(publicationIdempotencyKey(first), publicationIdempotencyKey(same));
  assert.notEqual(publicationIdempotencyKey(first), publicationIdempotencyKey(changed));
});

test("publication capsule schema is strict and uses the canonical contract", async () => {
  const schema = JSON.parse(await readFile(
    new URL("../public/schemas/publication-capsule.v1.json", import.meta.url),
    "utf8",
  ));

  assert.equal(schema.$id, "https://agentfriendlyweb.dev/schemas/publication-capsule.v1.json");
  assert.equal(schema.additionalProperties, false);
  assert.equal(schema.properties.contract.const, PUBLICATION_CAPSULE_CONTRACT);
  assert.equal(schema.properties.files.maxItems, 16);
  assert.equal(schema.properties.signature.required.includes("value"), true);
});
