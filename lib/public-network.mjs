import { isPrivateIp } from './scanner.mjs';

export const MAX_PUBLIC_RESPONSE_BYTES = 250_000;
export const PUBLIC_REQUEST_TIMEOUT_MS = 8_000;

const DNS_ENDPOINT = 'https://cloudflare-dns.com/dns-query';

function publicNetworkError(message = 'El destino no tiene una resolucion publica auditable.') {
  return new Error(message);
}

function isIpLiteral(hostname) {
  return /^[\d.]+$/.test(hostname) || hostname.includes(':');
}

function validateHostnameSyntax(value) {
  const hostname = String(value || '').trim().toLowerCase().replace(/^\[|\]$/g, '').replace(/\.$/, '');
  if (
    !hostname ||
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal')
  ) {
    throw publicNetworkError('El destino no es una direccion publica auditable.');
  }
  return hostname;
}

async function queryDns(name, type, fetchImpl = fetch, signal) {
  signal?.throwIfAborted();
  const response = await fetchImpl(
    `${DNS_ENDPOINT}?name=${encodeURIComponent(name)}&type=${type}`,
    {
      headers: { accept: 'application/dns-json' },
      redirect: 'manual',
      signal: combinedSignal(signal, PUBLIC_REQUEST_TIMEOUT_MS),
    },
  );
  if (!response.ok) throw publicNetworkError('No se pudo verificar el destino con seguridad.');

  const payload = await response.json();
  return Array.isArray(payload?.Answer) ? payload.Answer : [];
}

async function defaultResolveDns(hostname, options = {}) {
  const answers = await Promise.all(
    ['A', 'AAAA'].map(async (type) => {
      const records = await queryDns(hostname, type, options.fetchImpl || fetch, options.signal);
      return records
        .filter((answer) => answer?.type === 1 || answer?.type === 28)
        .map((answer) => String(answer.data || '').trim())
        .filter(Boolean);
    }),
  );
  return answers.flat();
}

export async function assertPublicHostname(hostname, resolveDns = defaultResolveDns, options = {}) {
  options.signal?.throwIfAborted();
  const normalized = validateHostnameSyntax(hostname);
  if (isIpLiteral(normalized)) {
    if (isPrivateIp(normalized)) {
      throw publicNetworkError('El destino no es una direccion publica auditable.');
    }
    return;
  }

  const addresses = await resolveDns(normalized, options);
  options.signal?.throwIfAborted();
  if (
    !Array.isArray(addresses) ||
    addresses.length === 0 ||
    addresses.some((address) => isPrivateIp(String(address)))
  ) {
    throw publicNetworkError();
  }
}

function decodeTxtRecord(value) {
  const source = String(value || '').trim();
  if (!source.startsWith('"')) return source;

  const chunks = [];
  for (const match of source.matchAll(/"((?:\\.|[^"\\])*)"/g)) {
    try {
      chunks.push(JSON.parse(`"${match[1]}"`));
    } catch {
      return source.replace(/^"|"$/g, '');
    }
  }
  return chunks.length ? chunks.join('') : source.replace(/^"|"$/g, '');
}

export async function resolvePublicTxt(name, options = {}) {
  const normalized = String(name || '').trim().toLowerCase().replace(/\.$/, '');
  if (!normalized) throw new Error('El nombre TXT no es valido.');
  const records = await queryDns(normalized, 'TXT', options.fetchImpl || fetch, options.signal);
  return records
    .filter((answer) => answer?.type === 16)
    .map((answer) => decodeTxtRecord(answer.data))
    .filter(Boolean);
}

function combinedSignal(signal, timeoutMs) {
  const timeout = AbortSignal.timeout(timeoutMs);
  return signal ? AbortSignal.any([signal, timeout]) : timeout;
}

async function readLimited(response, maxBytes, signal) {
  if (!response.body) {
    return { body: '', bodyBytes: new Uint8Array(), bytes: 0, truncated: false };
  }
  signal.throwIfAborted();
  const reader = response.body.getReader();
  const abort = () => { void reader.cancel().catch(() => undefined); };
  signal.addEventListener('abort', abort, { once: true });
  const chunks = [];
  let bytes = 0;
  let truncated = false;

  try {
    while (true) {
      signal.throwIfAborted();
      const { value, done } = await reader.read();
      signal.throwIfAborted();
      if (done) break;
      if (bytes >= maxBytes) {
        truncated = true;
        break;
      }
      const remaining = maxBytes - bytes;
      const chunk = value.byteLength > remaining ? value.subarray(0, remaining) : value;
      bytes += chunk.byteLength;
      chunks.push(chunk);
      if (value.byteLength > remaining) {
        truncated = true;
        break;
      }
    }
  } finally {
    signal.removeEventListener('abort', abort);
    void reader.cancel().catch(() => undefined);
  }

  const bodyBytes = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) {
    bodyBytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { body: new TextDecoder().decode(bodyBytes), bodyBytes, bytes, truncated };
}

export async function fetchLimitedPublicUrl(url, options = {}) {
  options.signal?.throwIfAborted();
  let target;
  try {
    target = new URL(url);
  } catch {
    throw new Error('La URL publica no es valida.');
  }
  if (!['http:', 'https:'].includes(target.protocol) || target.username || target.password || target.port) {
    throw new Error('La URL publica no es valida.');
  }

  const validatedHostname = String(options.validatedHostname || '').toLowerCase();
  if (validatedHostname !== target.hostname.toLowerCase()) {
    await assertPublicHostname(target.hostname, options.resolveDns || defaultResolveDns, { signal: options.signal });
  }

  const signal = combinedSignal(options.signal, options.timeoutMs || PUBLIC_REQUEST_TIMEOUT_MS);
  signal.throwIfAborted();
  const response = await (options.fetchImpl || fetch)(target, {
    headers: {
      accept: options.accept || 'text/html,*/*;q=0.8',
      'user-agent': options.userAgent || 'AgentFriendlyWebAuditor/0.1',
    },
    redirect: 'manual',
    signal,
  });
  const limited = await readLimited(response, options.maxBytes || MAX_PUBLIC_RESPONSE_BYTES, signal);

  return {
    status: response.status,
    contentType: response.headers.get('content-type') || '',
    link: response.headers.get('link') || '',
    body: limited.body,
    bodyBytes: limited.bodyBytes,
    bytes: limited.bytes,
    truncated: limited.truncated,
  };
}
