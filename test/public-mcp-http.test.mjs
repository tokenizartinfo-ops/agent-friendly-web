import assert from "node:assert/strict";
import test from "node:test";

import {
  MAX_PUBLIC_MCP_REQUEST_BYTES,
  PublicMcpHttpError,
  prepareBoundedPublicMcpRequest,
  sanitizePublicMcpResponse,
} from "../lib/public-mcp-http.mjs";

function streamedRequest(chunks, contentType = "application/json") {
  let index = 0;
  let cancelled = false;
  const body = new ReadableStream({
    pull(controller) {
      if (index >= chunks.length) {
        controller.close();
        return;
      }
      controller.enqueue(new TextEncoder().encode(chunks[index++]));
    },
    cancel() {
      cancelled = true;
    },
  });
  const request = new Request("https://agentfriendlyweb.dev/mcp", {
    method: "POST",
    headers: { "content-type": contentType },
    body,
    duplex: "half",
  });
  return { request, wasCancelled: () => cancelled };
}

test("bounded MCP request reader cancels a chunked body above 32 KiB", async () => {
  const { request, wasCancelled } = streamedRequest([
    "x".repeat(16 * 1024),
    "x".repeat(16 * 1024),
    "x",
  ]);
  await assert.rejects(
    prepareBoundedPublicMcpRequest(request),
    (error) => error instanceof PublicMcpHttpError && error.status === 413,
  );
  assert.equal(wasCancelled(), true);
});

test("bounded MCP request reader preserves a valid JSON body", async () => {
  const payload = JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" });
  const { request } = streamedRequest([payload.slice(0, 10), payload.slice(10)]);
  const bounded = await prepareBoundedPublicMcpRequest(request);
  assert.equal(await bounded.text(), payload);
  assert.equal(bounded.headers.has("content-length"), false);
  assert.equal(MAX_PUBLIC_MCP_REQUEST_BYTES, 32 * 1024);
});

test("bounded MCP request reader rejects unsupported media types and declared oversize", async () => {
  const nonJson = new Request("https://agentfriendlyweb.dev/mcp", {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: "{}",
  });
  await assert.rejects(
    prepareBoundedPublicMcpRequest(nonJson),
    (error) => error instanceof PublicMcpHttpError && error.status === 415,
  );

  const oversized = new Request("https://agentfriendlyweb.dev/mcp", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "content-length": String(MAX_PUBLIC_MCP_REQUEST_BYTES + 1),
    },
    body: "{}",
  });
  await assert.rejects(
    prepareBoundedPublicMcpRequest(oversized),
    (error) => error instanceof PublicMcpHttpError && error.status === 413,
  );
});

test("HTTP response sanitizer never reflects unknown tool or resource identifiers", async () => {
  const secret = "sk-secret-value-1234567890";
  for (const payload of [
    { jsonrpc: "2.0", id: 1, error: { code: -32602, message: `Tool ${secret} not found` } },
    { jsonrpc: "2.0", id: 2, error: { code: -32602, message: `Resource not found: afw://private/${secret}`, data: { uri: `afw://private/${secret}` } } },
  ]) {
    const response = await sanitizePublicMcpResponse(Response.json(payload, { status: 400 }));
    const text = await response.text();
    assert.equal(text.includes(secret), false);
    assert.match(text, /requested capability is not available/i);
  }
});
