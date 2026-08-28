import test from "node:test";
import assert from "node:assert/strict";

import { EXIT_CODES } from "../lib/cli-contract.mjs";
import { executeCliCommand } from "../lib/cli-commands.mjs";

const publishedProfile = {
  slug: "tokenizart",
  version: 1,
  publishedAt: "2026-08-27T14:00:00.000Z",
  canonicalUrl: "https://agentfriendlyweb.dev/registry/tokenizart",
  organization: "Tokenizart",
  canonicalOrigin: "https://tokenizart.com",
  siteType: "platform",
  sectors: ["arte"],
  audiences: ["owners"],
  languages: ["Español"],
  publicSources: [],
  declaredCapabilities: ["public-discovery"],
  observedResources: [],
  verification: {
    status: "owner_declared",
    hostname: "tokenizart.com",
    method: "",
    verifiedAt: "",
    verifiedUntil: "",
  },
  readiness: {
    level: "AF-1",
    score: 20,
    state: "observed",
    observedAt: "2026-08-27T13:00:00.000Z",
  },
  historyUrl: "https://agentfriendlyweb.dev/registry/tokenizart",
  limits: ["No garantiza indexacion."],
};

test("registry dry-run performs no request", async () => {
  let requests = 0;
  const response = await executeCliCommand(
    {
      command: "registry-get",
      slug: "tokenizart",
      origin: "https://agentfriendlyweb.dev",
      version: 2,
      dryRun: true,
    },
    {
      fetchLimitedPublicUrl: async () => {
        requests += 1;
        throw new Error("must not run");
      },
    },
  );

  assert.equal(requests, 0);
  assert.equal(response.status, "planned");
  assert.equal(
    response.result.url,
    "https://agentfriendlyweb.dev/registry/tokenizart/profile.json?version=2",
  );
  assert.equal(response.result.executed_requests, 0);
});

test("registry get returns a profile validated by the canonical builder", async () => {
  let validated = 0;
  const response = await executeCliCommand(
    {
      command: "registry-get",
      slug: "tokenizart",
      origin: "https://agentfriendlyweb.dev",
      dryRun: false,
    },
    {
      fetchLimitedPublicUrl: async (url, options) => {
        assert.equal(url.toString(), "https://agentfriendlyweb.dev/registry/tokenizart/profile.json");
        assert.match(options.accept, /application\/json/);
        return {
          status: 200,
          contentType: "application/json; charset=utf-8",
          body: JSON.stringify(publishedProfile),
          bytes: 100,
        };
      },
      buildPublicProfile: (value) => {
        validated += 1;
        return { ...value, contract: "agentfriendly.public-profile.v1" };
      },
    },
  );

  assert.equal(validated, 1);
  assert.equal(response.status, "ok");
  assert.equal(response.result.profile.contract, "agentfriendly.public-profile.v1");
  assert.equal(response.result.profile.slug, "tokenizart");
});

test("registry get classifies unavailable profiles as network failures", async () => {
  await assert.rejects(
    executeCliCommand(
      {
        command: "registry-get",
        slug: "missing",
        origin: "https://agentfriendlyweb.dev",
        dryRun: false,
      },
      {
        fetchLimitedPublicUrl: async () => ({
          status: 404,
          contentType: "text/plain",
          body: "Not found",
          bytes: 9,
        }),
      },
    ),
    (error) => error.exitCode === EXIT_CODES.NETWORK && error.code === "registry_unavailable",
  );
});

test("registry get classifies malformed JSON and contracts as integrity failures", async () => {
  await assert.rejects(
    executeCliCommand(
      {
        command: "registry-get",
        slug: "bad-json",
        origin: "https://agentfriendlyweb.dev",
        dryRun: false,
      },
      {
        fetchLimitedPublicUrl: async () => ({
          status: 200,
          contentType: "application/json",
          body: "not-json",
          bytes: 8,
        }),
      },
    ),
    (error) => error.exitCode === EXIT_CODES.INTEGRITY && error.code === "invalid_registry_profile",
  );

  await assert.rejects(
    executeCliCommand(
      {
        command: "registry-get",
        slug: "bad-contract",
        origin: "https://agentfriendlyweb.dev",
        dryRun: false,
      },
      {
        fetchLimitedPublicUrl: async () => ({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(publishedProfile),
          bytes: 100,
        }),
        buildPublicProfile: () => {
          throw new Error("organization is required");
        },
      },
    ),
    (error) => error.exitCode === EXIT_CODES.INTEGRITY && error.code === "invalid_registry_profile",
  );
});

