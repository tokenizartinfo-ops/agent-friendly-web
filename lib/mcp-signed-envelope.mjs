import {createHmac, timingSafeEqual} from 'node:crypto';
import {buildDossierMcpEvent} from './dossier-mcp-event.mjs';

const invalid = () => { throw new Error('Invalid MCP signed message'); };
const validId = value => typeof value === 'string' && /^[A-Za-z0-9_-]{1,128}$/.test(value);

function challengeBytes(value) {
  if (typeof value !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(value)) return null;
  const bytes = Buffer.from(value, 'base64url');
  return bytes.length === 32 && bytes.toString('base64url') === value ? bytes : null;
}

function signingKey(secret) {
  if (typeof secret !== 'string' || secret.length > 94 || !secret.startsWith('whsec_')) invalid();
  const base64 = secret.slice(6);
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) invalid();
  const key = Buffer.from(base64, 'base64');
  if (key.length < 24 || key.length > 64 || key.toString('base64') !== base64) invalid();
  return key;
}

function sign(body, id, subscriptionId, secret, signedAtMs) {
  if (!validId(id) || !validId(subscriptionId) || !Number.isSafeInteger(signedAtMs) || signedAtMs < 0) invalid();
  if (Buffer.byteLength(body, 'utf8') > 262144) invalid();
  const key = signingKey(secret);
  const timestamp = String(Math.floor(signedAtMs / 1000));
  let signature;
  try {
    signature = createHmac('sha256', key).update(`${id}.${timestamp}.${body}`, 'utf8').digest('base64');
  } finally {
    key.fill(0);
  }
  return Object.freeze({
    body,
    headers: Object.freeze({
      'Content-Type': 'application/json',
      'webhook-id': id,
      'webhook-timestamp': timestamp,
      'webhook-signature': `v1,${signature}`,
      'X-MCP-Subscription-Id': subscriptionId,
    }),
  });
}

/** Node-only pure signer. No authorization, custody, freshness, transport or
 * delivery proof. The host must send these exact bytes after live admission.
 */
export function signDossierMcpEvent(signal, authorizedProjectRef, subscriptionId, secret, signedAtMs) {
  const event = buildDossierMcpEvent(signal, authorizedProjectRef);
  return sign(JSON.stringify(event), event.eventId, subscriptionId, secret, signedAtMs);
}

/** Host generates a CSPRNG challenge and owns its finite single-use budget. */
export function signMcpVerification(challenge, verificationId, subscriptionId, secret, signedAtMs) {
  if (!challengeBytes(challenge)) invalid();
  return sign(JSON.stringify({type: 'verification', challenge}), verificationId, subscriptionId, secret, signedAtMs);
}

/** Strict ASCII JSON echo; escaped keys/values and duplicate keys fail closed.
 * Equality does not establish freshness, single use or subscription activation.
 */
export function matchesMcpVerificationReply(challenge, status, body) {
  const expected = challengeBytes(challenge);
  if (!expected || !Number.isInteger(status) || status < 200 || status > 299 || typeof body !== 'string' || Buffer.byteLength(body, 'utf8') > 1024) return false;
  const match = /^[\x20\t\r\n]*\{[\x20\t\r\n]*"challenge"[\x20\t\r\n]*:[\x20\t\r\n]*"([A-Za-z0-9_-]{43})"[\x20\t\r\n]*\}[\x20\t\r\n]*$/.exec(body);
  if (!match) return false;
  const received = challengeBytes(match[1]);
  return received !== null && timingSafeEqual(expected, received);
}
