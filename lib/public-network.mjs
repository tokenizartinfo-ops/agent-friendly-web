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

async function queryDns(name, type, fetchImpl = fetch) {
  const response = await fetchImpl(
    `${DNS_ENDPOINT}?name=${encodeURIComponent(name)}&type=${type}`,
    {
      headers: { accept: 'application/dns-json' },
      redirect: 'manual',
      signal: AbortSignal.timeout(PUBLIC_REQUEST_TIMEOUT_MS),
    },
  );
  if (!response.ok) throw publicNetworkError('No se pudo verificar el destino con seguridad.');

  const payload = await response.json();
  return Array.isArray(payload?.Answer) ? payload.Answer : [];
}

async function defaultResolveDns(hostname) {
  const answers = await Promise.all(
    ['A', 'AAAA'].map(async (type) => {
      const records = await queryDns(hostname, type);
      return records
        .filter((answer) => answer?.type === 1 || answer?.type === 28)
        .map((answer) => String(answer.data || '').trim())
        .filter(Boolean);
    }),
  );
  return answers.flat();
}

export async function assertPublicHostname(hostname, resolveDns = defaultResolveDns) {
  const normalized = validateHostnameSyntax(hostname);
  if (isIpLiteral(normalized)) {
    if (isPrivateIp(normalized)) {
      throw publicNetworkError('El destino no es una direccion publica auditable.');
    }
    return;
  }

  const addresses = await resolveDns(normalized);
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
  const records = await queryDns(normalized, 'TXT', options.fetchImpl || fetch);
  return records
    .filter((answer) => answer?.type === 16)
    .map((answer) => decodeTxtRecord(answer.data))
    .filter(Boolean);
}

async function readLimited(response, maxBytes) {
  if (!response.body) return { body: '', bytes: 0 };
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let body = '';
  let bytes = 0;

  try {
    while (bytes < maxBytes) {
      const { value, done } = await reader.read();
      if (done) break;
      const remaining = maxBytes - bytes;
      const chunk = value.byteLength > remaining ? value.subarray(0, remaining) : value;
      bytes += chunk.byteLength;
      body += decoder.decode(chunk, { stream: bytes < maxBytes });
      if (value.byteLength > remaining) break;
    }
    body += decoder.decode();
  } finally {
    await reader.cancel().catch(() => undefined);
  }

  return { body, bytes };
}

export async function fetchLimitedPublicUrl(url, options = {}) {
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
    await assertPublicHostname(target.hostname, options.resolveDns || defaultResolveDns);
  }

  const response = await (options.fetchImpl || fetch)(target, {
    headers: {
      accept: options.accept || 'text/html,*/*;q=0.8',
      'user-agent': options.userAgent || 'AgentFriendlyWebAuditor/0.1',
    },
    redirect: 'manual',
    signal: AbortSignal.timeout(options.timeoutMs || PUBLIC_REQUEST_TIMEOUT_MS),
  });
  const limited = await readLimited(response, options.maxBytes || MAX_PUBLIC_RESPONSE_BYTES);

  return {
    status: response.status,
    contentType: response.headers.get('content-type') || '',
    link: response.headers.get('link') || '',
    body: limited.body,
    bytes: limited.bytes,
  };
}
