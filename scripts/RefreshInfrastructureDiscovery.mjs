import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { stringify } from 'yaml';

// Derive the current infrastructure concept from its dated public ledger only.
const ledgerPath = 'public/.well-known/infrastructure-status.json';
const ledger = JSON.parse(readFileSync(ledgerPath, 'utf8'));
if (ledger.project !== 'agent-friendly-web' || ledger.schema_version !== '1.2') {
  throw new Error('Unsupported AFW infrastructure ledger');
}
const origin = 'https://agentfriendlyweb.dev';
if (ledger.canonical_origin !== origin) throw new Error('Unexpected origin');
const at = `${ledger.observed_at}T00:00:00Z`;
const stale = `${ledger.stale_after}T00:00:00Z`;
const metadata = {
  type: 'Reference', title: 'Infraestructura y piloto privado de Agent Friendly Web',
  description: 'Observaciones fechadas, alcance privado y limites del piloto reducido.',
  resource: `${origin}/.well-known/infrastructure-status.json`,
  tags: ['agent-friendly-web', 'infrastructure', 'cloudflare', 'provenance'],
  status: 'stable', stale_after: stale,
  generated: { by: 'process:afw-infrastructure-ledger', at },
  verified: [{ by: 'process:afw-infrastructure-ledger-review', at }],
  sources: [{ id: 'source-1', resource: `${origin}/.well-known/infrastructure-status.json`,
    title: `AFW infrastructure observation ${ledger.observed_at}`, author: 'organization:agent-friendly-web', last_modified: at }],
};
const body = `# Infraestructura y piloto privado

## Estado observado: ${ledger.observed_at}

El origen canonico es ${origin}. Cloudflare Workers sirve el sitio publico y el expediente privado. Cloudflare Access conserva una lista limitada de cuentas autorizadas; el piloto no abre el registro comercial.

El expediente permite guardar contexto, revisar conflictos soportados y preparar, comparar, rechazar y descargar capsulas. La verificacion del dominio no autoriza por si sola una instalacion. Las capsulas sinteticas de QA no son entregables aprobados para un sitio real.

## Evidencia y limites

Se verifico recuperacion tras cierre explicito de sesion, reingreso y guardado. No se espero el vencimiento natural del TTL. Los conflictos de campos no soportados requieren asistencia y bloquean la escritura.

La base contiene datos de pruebas persistidos; no se publico un recuento nuevo. Las afirmaciones historicas de cero filas, seis migraciones o unica cuenta canary no deben extrapolarse al estado actual.

Release utiliza el mismo Worker y base productiva, no una base aislada. La regla temporal que fijaba su version esta deshabilitada. Canary es un entorno distinto: sus mediciones historicas conservan su propia fecha.

Pagos, correo comercial, instalacion remota y vinculacion CRM ampliada no estan habilitados en este piloto. No se declara el lanzamiento comercial ni AF-5 por haber completado estas pruebas.

## Siguiente etapa

Validar el recorrido asistido de un cliente y resolver las pruebas remotas de CRM antes de reintroducir esa vinculacion. No confundir estado documentado con monitorizacion continua.

## Separacion de proyectos y recuperacion

Tokenizart es un caso de referencia, no el runtime de AFW. Companion, Copilot, Atelier y Owner Live pertenecen a Tokenizart y no comparten esta autorizacion.

Sites esta retirado y no es un destino de recuperacion. Se conserva la version anterior del Worker para rollback de codigo; no se afirma una restauracion integral de base de datos.
`;
const output = `---\n${stringify(metadata)}---\n${body}`;
const concept = 'discovery/infrastructure-status.md';
writeFileSync(`public/okf/v0.2/${concept}`, output);
const modulePath = 'app/okf/v0.2/CHECKSUMS.sha256/checksums.generated.ts';
const current = readFileSync(modulePath, 'utf8').match(/export const OKF_V02_CHECKSUMS = ("[\s\S]*");\s*$/);
if (!current) throw new Error('Invalid checksum module');
const lines = JSON.parse(current[1]).trimEnd().split('\n');
if (lines.filter(line => line.endsWith(`  ${concept}`)).length !== 1) throw new Error('Expected one infrastructure checksum');
const sha = createHash('sha256').update(output).digest('hex');
const updated = lines.map(line => line.endsWith(`  ${concept}`) ? `${sha}  ${concept}` : line).join('\n') + '\n';
writeFileSync(modulePath, `export const OKF_V02_CHECKSUMS = ${JSON.stringify(updated)};\n`);
console.log(JSON.stringify({ concept, observedAt: ledger.observed_at, sha256: sha, remoteWrites: 0 }));
