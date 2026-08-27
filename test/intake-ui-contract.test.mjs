import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('expanded intake exposes the approved progressive sections and owner controls', async () => {
  const source = await readFile('app/components/intake-workspace.tsx', 'utf8');

  for (const label of [
    'Contenido disponible',
    'Capacidades y recursos',
    'Publicacion y crawlers',
    'Responsables y control',
    'Mantenedor actual',
    'Proveedor DNS',
    'Politica de busqueda',
    'Uso para entrenamiento',
    'Responsable de aprobacion',
  ]) {
    assert.match(source, new RegExp(label));
  }

  assert.match(source, /12 decisiones/);
  assert.match(source, /window\.setTimeout\(async \(\) => \{/);
  assert.match(source, /}, 900\)/);
});

test('domain verification is explicit, separate from autosave and non-publishing', async () => {
  const source = await readFile('app/components/intake-workspace.tsx', 'utf8');

  assert.match(source, /Verificar dominio/);
  assert.match(source, /Comprobar ahora/);
  assert.match(source, /Sin verificar/);
  assert.match(source, /Pendiente/);
  assert.match(source, /Verificado hasta/);
  assert.match(source, /Vencido/);
  assert.match(source, /No publica el perfil automaticamente/);
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
  assert.match(source, /claimStatusLabel\(activeClaim\)/);
  assert.match(source, /activeClaim \? \(/);
});
