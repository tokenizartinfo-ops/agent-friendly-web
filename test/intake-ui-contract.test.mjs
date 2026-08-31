import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { PRIVATE_UI_COPY } from '../lib/private-ui-copy.mjs';

test('expanded intake exposes the approved progressive sections and owner controls', async () => {
  const source = await readFile('app/components/intake-workspace.tsx', 'utf8');

  const copy = PRIVATE_UI_COPY.es.intake;
  for (const label of ['Contenido disponible', 'Capacidades y recursos', 'Publicación y crawlers', 'Responsables y control']) assert.ok(copy.sections.some((section) => section.includes(label)));
  for (const label of ['Mantenedor actual', 'Proveedor DNS', 'Política de búsqueda', 'Uso para entrenamiento', 'Responsable de aprobación']) assert.ok(Object.values(copy.labels).includes(label));

  assert.match(source, /completedFields\}\/12/);
  assert.match(source, /window\.setTimeout\(async \(\) => \{/);
  assert.match(source, /}, 900\)/);
});

test('domain verification is explicit, separate from autosave and non-publishing', async () => {
  const source = await readFile('app/components/intake-workspace.tsx', 'utf8');

  assert.equal(PRIVATE_UI_COPY.es.intake.labels.verify, 'Verificar dominio');
  assert.equal(PRIVATE_UI_COPY.es.intake.labels.checkNow, 'Comprobar ahora');
  assert.match(source, /Sin verificar/);
  assert.match(source, /Pendiente/);
  assert.match(source, /Verificado hasta/);
  assert.match(source, /Vencido/);
  assert.match(PRIVATE_UI_COPY.es.intake.verifyBody, /control.*dominio/i);
  assert.match(source, /domain-claims/);
  assert.match(source, /navigator\.clipboard\.writeText/);

  const autosaveStart = source.indexOf('const timer = window.setTimeout');
  const autosave = source.slice(autosaveStart, source.indexOf('}, 900)', autosaveStart));
  assert.doesNotMatch(autosave, /domain-claims/);
});

test('project completion switches from the basic preview to all twelve decisions', async () => {
  const route = await readFile('app/api/projects/route.ts', 'utf8');

  assert.match(route, /completionForIntake\(intake\)/);
  assert.match(route, /nextQuestion\(intake\)/);
  assert.doesNotMatch(route, /stage:\s*'basic'/);
});

test('domain instructions are scoped to the hostname currently saved in the expediente', async () => {
  const source = await readFile('app/components/intake-workspace.tsx', 'utf8');

  assert.match(source, /const activeClaim = claim\?\.hostname === hostname \? claim : null/);
  assert.match(source, /claimStatusLabel\(activeClaim, locale\)/);
  assert.match(source, /activeClaim \? \(/);
});
