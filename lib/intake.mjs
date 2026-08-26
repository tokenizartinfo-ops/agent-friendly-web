const allowedFields = [
  'organization',
  'website',
  'role',
  'siteType',
  'control',
  'audience',
  'goals',
  'languages',
  'cms',
  'hosting',
  'notes',
];

const completionFields = [
  'organization',
  'website',
  'role',
  'siteType',
  'control',
  'audience',
  'goals',
  'languages',
];

const questions = {
  organization: 'Como se llama la organizacion, proyecto o persona responsable?',
  website: 'Cual es el sitio que queres mejorar?',
  role: 'Que relacion tenes con el sitio?',
  siteType: 'Que tipo de sitio es?',
  control: 'Que nivel de acceso o control tecnico tenes hoy?',
  audience: 'A quienes queres que personas y agentes ayuden a encontrarte?',
  goals: 'Que deberian poder descubrir o hacer los agentes?',
  languages: 'En que idiomas debe poder comprenderse el sitio?',
};

function cleanText(value, max = 1200) {
  return String(value || '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
}

function cleanList(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map((item) => cleanText(item, 80)).filter(Boolean))].slice(0, 12);
}

function normalizeWebsite(value) {
  const text = cleanText(value, 500);
  if (!text) return '';
  try {
    const url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    url.hash = '';
    return url.toString();
  } catch {
    return '';
  }
}

export function normalizeIntake(input = {}) {
  const output = {};
  for (const field of allowedFields) {
    if (field === 'goals' || field === 'languages') {
      output[field] = cleanList(input[field]);
    } else if (field === 'website') {
      output[field] = normalizeWebsite(input[field]);
    } else {
      output[field] = cleanText(input[field]);
    }
  }
  return output;
}

export function completionForIntake(intake = {}) {
  const completed = completionFields.filter((field) => {
    const value = intake[field];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  }).length;
  return Math.round((completed / completionFields.length) * 100);
}

export function nextQuestion(intake = {}) {
  const field = completionFields.find((key) => {
    const value = intake[key];
    return Array.isArray(value) ? value.length === 0 : !value;
  });
  return field ? { field, prompt: questions[field] } : null;
}
