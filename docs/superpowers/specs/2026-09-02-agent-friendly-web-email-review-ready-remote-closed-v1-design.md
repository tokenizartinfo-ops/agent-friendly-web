# Agent Friendly Web Email Review Ready Remote Closed v1 Design

**Date:** 2026-09-02

**Status:** approved for closed canary preparation; sending remains prohibited

## Scope declaration

- `PROJECT`: `agent-friendly-web`
- `REPOSITORY`: `tokenizartinfo-ops/agent-friendly-web`
- `ENVIRONMENT`: `afw_email_review_ready_canary`
- `ORIGIN`: `https://canary.agentfriendlyweb.dev`
- `RESOURCE_TYPE`: Cloudflare Worker, D1 migration and native rate-limit binding
- `RESOURCE_ID`: `agent-friendly-web-web-canary`, D1 `agent-friendly-web-web-canary`, rate namespace `1895760673`
- `ALLOWED_ACTION`: backup metadata, apply additive migration `0006`, deploy the reviewed branch with the email flag false, inspect and test the closed boundary
- `ROLLBACK`: keep `AFW_EMAIL_REVIEW_READY_ENABLED=false`; redeploy the prior Worker version if parity fails; leave the empty additive table unused

## Goal

Prove that the remote canary can host the review-ready route, its metadata table and its abuse control while remaining unable to send email.

## Phase boundary

This is Gate 6C.3B phase 1. It intentionally stops before the fixed-destination email binding and Access subject-hash allowlist are provisioned.

The phase may:

1. export a local D1 backup for rollback evidence;
2. confirm existing table counts without reading message bodies or private identities;
3. apply only `0006_email_transactional_deliveries.sql` to canary D1;
4. add one dedicated native rate-limit binding;
5. deploy the reviewed branch only to `agent-friendly-web-web-canary`;
6. verify Access at the edge, flag OFF behavior and an empty delivery table.

The phase must not:

- configure a `send_email` binding;
- read or commit the private destination;
- enable `AFW_EMAIL_REVIEW_READY_ENABLED`;
- send an email;
- alter `agentfriendlyweb.dev` or its production Worker;
- alter billing, Email Routing, DNS, CRM, contacts or Tokenizart resources.

## Rate limit

The canary receives `AFW_EMAIL_REVIEW_READY_RATE_LIMITER` with namespace `1895760673`, limit `1` and period `60`. The binding is a guardrail, not exact accounting. It is reached only after Access and actor allowlist validation when the gate is eventually enabled.

## Database migration

Migration `0006` is additive and creates only `email_transactional_deliveries` plus its indexes. Before applying it, export the current canary D1 to a local temporary path and record only file hash, size, migration list and aggregate table counts. The backup itself is not committed.

After applying it:

- migration list must be empty;
- the new table must exist;
- the new table must contain zero rows;
- existing business table counts must remain unchanged.

## Deployment

The branch build may be uploaded only to `agent-friendly-web-web-canary`. The deployment must preserve:

- exact Access audience already verified for the canary;
- `AFW_EMAIL_REVIEW_READY_ENABLED=false`;
- no `send_email` binding;
- no arbitrary Worker route or public traffic;
- no production D1 binding.

## Verification

Required evidence:

1. local tests, lint, build and Cloudflare dry-run pass;
2. unauthenticated requests to public and private canary paths are intercepted by Cloudflare Access;
3. deployed Worker settings show the dedicated rate limiter and no email binding;
4. D1 reports migration `0006` applied and zero delivery rows;
5. production deployment and public origin remain unchanged.

## Deferred phase

Gate 6C.3B phase 2 must provision the fixed destination without exposing it to Git, prompts, logs or public contracts. It also needs an Access subject hash stored outside Git. Only after those bindings are independently verified may a human authorize exactly one controlled send.
