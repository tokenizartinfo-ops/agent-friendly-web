import test from 'node:test';
import assert from 'node:assert/strict';

import {
  completionForIntake,
  normalizeIntake,
  nextQuestion,
} from '../lib/intake.mjs';

test('normalizeIntake keeps useful context and removes secret-like fields', () => {
  const result = normalizeIntake({
    organization: 'Museo Ejemplo',
    website: 'https://museo.example',
    role: 'owner',
    siteType: 'museum',
    control: 'dns',
    audience: 'Coleccionistas y escuelas',
    goals: ['discovery'],
    notes: 'Queremos mostrar la coleccion.',
    password: 'never-store-me',
    apiKey: 'also-never-store-me',
  });

  assert.equal(result.organization, 'Museo Ejemplo');
  assert.equal(result.website, 'https://museo.example/');
  assert.equal('password' in result, false);
  assert.equal('apiKey' in result, false);
});

test('completionForIntake measures only context fields needed to make a roadmap', () => {
  const partial = normalizeIntake({ organization: 'Galeria Uno', website: 'galeria.example' });
  assert.equal(completionForIntake(partial), 25);

  const complete = normalizeIntake({
    organization: 'Galeria Uno',
    website: 'galeria.example',
    role: 'owner',
    siteType: 'gallery',
    control: 'origin',
    audience: 'Artistas y compradores',
    goals: ['discovery', 'content'],
    languages: ['es'],
  });
  assert.equal(completionForIntake(complete), 100);
});

test('nextQuestion asks for the earliest missing decision in plain Spanish', () => {
  const question = nextQuestion(normalizeIntake({ organization: 'Archivo Sur' }));
  assert.equal(question.field, 'website');
  assert.match(question.prompt, /sitio/i);
});
