// Ephemeral attempt identity, never localStorage: changing the body starts a new attempt.
export function createProjectSaveAttempt() {
  let previousBody;
  let key;
  return {
    prepare(payload) {
      const body = JSON.stringify(payload);
      if (body !== previousBody) {
        previousBody = body;
        key = crypto.randomUUID();
      }
      return { method: 'PUT', redirect: /** @type {const} */ ('manual'), headers: { 'content-type': 'application/json', 'idempotency-key': key }, body };
    },
  };
}
