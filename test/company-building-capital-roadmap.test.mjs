import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('company-building roadmap separates verified public strategy from private capital data', async () => {
  const roadmap = await read('docs/COMPANY-BUILDING-AND-CAPITAL-ROADMAP-2026-09-02.md');

  for (const gate of ['Gate 7A', 'Gate 7B', 'Gate 7C', 'Gate 7D', 'Gate 7E', 'Gate 7F', 'Gate 7G', 'Gate 7H']) {
    assert.match(roadmap, new RegExp(gate));
  }

  assert.match(roadmap, /AF-4 como minimo/i);
  assert.match(roadmap, /Tokenizart.*80\/100/i);
  assert.match(roadmap, /evidencia externa.*fechada/i);
  assert.match(roadmap, /no equivale a una certificacion/i);
  assert.match(roadmap, /bootstrap/i);
  assert.match(roadmap, /apoyo no dilutivo/i);
  assert.match(roadmap, /incubadora|aceleradora/i);
  assert.match(roadmap, /angel|pre-seed|venture capital/i);
  assert.match(roadmap, /sitios AFW-native/i);
  assert.match(roadmap, /desde el momento cero/i);
  assert.match(roadmap, /sin lock-in/i);
  assert.match(roadmap, /identidad declarada/i);
  assert.match(roadmap, /exportable/i);
  assert.match(roadmap, /Nivel 1.*no_embed/i);
  assert.doesNotMatch(roadmap, /cap table actual|saldo bancario|numero de tarjeta|clave api/i);
});

test('service map includes the future AFW-native website creation branch without presenting it as deployed', async () => {
  const map = await read('docs/SERVICE-DELIVERY-AND-VALUE-CHAIN-MAP-V1.md');
  const growth = await read('docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md');

  for (const document of [map, growth]) {
    assert.match(document, /creacion de sitios AFW-native/i);
    assert.match(document, /capacidad futura|linea futura/i);
    assert.match(document, /portabilidad|exportable/i);
    assert.match(document, /sin lock-in/i);
  }

  assert.match(map, /sitio nuevo/i);
  assert.match(map, /sitio existente/i);
  assert.match(map, /humana.*machine-readable/i);
  assert.match(growth, /identidad.*declarada.*owner/i);
  assert.match(growth, /No es una capacidad disponible ni operativa hoy/i);
});

test('founder narrative preserves Gabriel attribution and the Tokenizart project boundary', async () => {
  const narrative = await read('docs/FOUNDER-NARRATIVE-AND-BRAND-FOUNDATION-V1.md');

  assert.match(narrative, /Gabriel Mucchiut/);
  assert.match(narrative, /cofundador de Tokenizart/i);
  assert.match(narrative, /primer caso integral/i);
  assert.match(narrative, /proyecto separado/i);
  assert.match(narrative, /Codex.*orquestador.*aprobacion humana/i);
  assert.match(narrative, /robots F0.*F5/i);
  assert.match(narrative, /sitios.*AFW-native/i);
  assert.match(narrative, /informacion declarada por su owner/i);
  assert.match(narrative, /no una promesa de posicionamiento/i);
  assert.doesNotMatch(narrative, /Tokenizart.*propietario tecnico/i);
});

test('service map covers the complete commercial and delivery lifecycle with human gates', async () => {
  const map = await read('docs/SERVICE-DELIVERY-AND-VALUE-CHAIN-MAP-V1.md');

  for (const stage of [
    'captacion',
    'auditoria',
    'diagnostico',
    'intake',
    'propuesta',
    'aprobacion',
    'implementacion',
    'verificacion',
    'entrega',
    'seguimiento',
  ]) {
    assert.match(map, new RegExp(stage, 'i'));
  }

  assert.match(map, /horas humanas.*modelos.*APIs.*infraestructura.*riesgo/i);
  assert.match(map, /version publica/i);
  assert.match(map, /version privada/i);
  assert.match(map, /rollback/i);
});

test('Gate 6C.1 is inbound-only and cannot become autonomous email operation', async () => {
  const gate = await read('docs/BLOCK-6C1-EMAIL-IDENTITY-AND-INBOUND-CANARY-DESIGN-2026-09-02.md');

  assert.match(gate, /hello@agentfriendlyweb\.dev/);
  assert.match(gate, /hola@agentfriendlyweb\.dev/);
  assert.match(gate, /ola@agentfriendlyweb\.dev/);
  assert.match(gate, /recepcion.*clasificacion.*metadata minima/i);
  assert.match(gate, /Cloudflare Email Routing/i);
  assert.match(gate, /no autoriza.*envio autonomo/i);
  assert.match(gate, /newsletter.*fuera de alcance/i);
  assert.match(gate, /kill switch/i);
  assert.match(gate, /rollback/i);
  assert.match(gate, /6C\.2/);
});

test('existing growth roadmap discovers the new company-building track without merging gates', async () => {
  const roadmap = await read('docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md');

  assert.match(roadmap, /COMPANY-BUILDING-AND-CAPITAL-ROADMAP-2026-09-02\.md/);
  assert.match(roadmap, /BLOCK-6C1-EMAIL-IDENTITY-AND-INBOUND-CANARY-DESIGN-2026-09-02\.md/);
  assert.match(roadmap, /Gate 6.*producto y operacion/i);
  assert.match(roadmap, /Gate 7.*construccion empresarial y capital/i);
});
