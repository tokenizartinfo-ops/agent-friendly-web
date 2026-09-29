const allowedFields = /** @type {const} */ ([
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
  'maintainerName',
  'maintainerEmail',
  'dnsProvider',
  'contentSources',
  'desiredCapabilities',
  'authorizedResources',
  'publicationPreference',
  'crawlerSearchPolicy',
  'crawlerTrainingPolicy',
  'approverName',
  'approverEmail',
  'monitoringPreference',
]);

/**
 * @typedef {'goals'|'languages'|'contentSources'|'desiredCapabilities'|'authorizedResources'} ListField
 * @typedef {Record<Exclude<typeof allowedFields[number], ListField>, string> & Record<ListField, string[]>} Intake
 */

const listFields = new Set([
  'goals',
  'languages',
  'contentSources',
  'desiredCapabilities',
  'authorizedResources',
]);

const basicFields = [
  'organization',
  'website',
  'role',
  'siteType',
  'control',
  'audience',
  'goals',
  'languages',
];

const publicationFields = [
  'publicationPreference',
  'crawlerSearchPolicy',
  'crawlerTrainingPolicy',
  'approverEmail',
];

const completionFields = [...basicFields, ...publicationFields];

const questions = {
  organization: 'Como se llama la organizacion, proyecto o persona responsable?',
  website: 'Cual es el sitio que queres mejorar?',
  role: 'Que relacion tenes con el sitio?',
  siteType: 'Que tipo de sitio es?',
  control: 'Que nivel de acceso o control tecnico tenes hoy?',
  audience: 'A quienes queres que personas y agentes ayuden a encontrarte?',
  goals: 'Que deberian poder descubrir o hacer los agentes?',
  languages: 'En que idiomas debe poder comprenderse el sitio?',
  publicationPreference: 'Como preferis publicar primero: en el Registry, en el sitio o en ambos?',
  crawlerSearchPolicy: 'Queres permitir que crawlers de busqueda y asistentes consulten el contenido publico?',
  crawlerTrainingPolicy: 'Que politica queres declarar para el uso del contenido en entrenamiento?',
  approverEmail: 'Que email del responsable debe aprobar una publicacion antes de hacerla visible?',
};

const translatedQuestions = {
  en: {
    organization: 'What is the name of the organization, project or responsible person?',
    website: 'Which website would you like to improve?',
    role: 'What is your relationship with the website?',
    siteType: 'What type of website is it?',
    control: 'What technical access or control do you currently have?',
    audience: 'Who should be able to find you through people and agents?',
    goals: 'What should agents be able to discover or do?',
    languages: 'In which languages should the website be understood?',
    publicationPreference: 'Where would you prefer to publish first: the Registry, your website or both?',
    crawlerSearchPolicy: 'Should search crawlers and assistants access the public content?',
    crawlerTrainingPolicy: 'What policy would you like to declare for using content in training?',
    approverEmail: 'Which responsible email should approve a publication before it becomes visible?',
  },
  pt: {
    organization: 'Qual e o nome da organizacao, projeto ou pessoa responsavel?',
    website: 'Qual site voce quer melhorar?',
    role: 'Qual e a sua relacao com o site?',
    siteType: 'Que tipo de site e?',
    control: 'Qual acesso ou controle tecnico voce tem hoje?',
    audience: 'Quem deve encontrar voce por meio de pessoas e agentes?',
    goals: 'O que os agentes devem poder descobrir ou fazer?',
    languages: 'Em quais idiomas o site deve ser compreendido?',
    publicationPreference: 'Onde prefere publicar primeiro: no Registry, no site ou em ambos?',
    crawlerSearchPolicy: 'Permitir que crawlers de busca e assistentes consultem o conteudo publico?',
    crawlerTrainingPolicy: 'Qual politica deseja declarar para o uso do conteudo em treinamento?',
    approverEmail: 'Qual email responsavel deve aprovar a publicacao antes de ficar visivel?',
  },
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

/** @param {Record<string, unknown>} input @returns {Intake} */
export function normalizeIntake(input = {}) {
  const output = /** @type {Intake} */ ({});
  for (const field of allowedFields) {
    if (listFields.has(field)) {
      output[field] = cleanList(input[field]);
    } else if (field === 'website') {
      output[field] = normalizeWebsite(input[field]);
    } else {
      output[field] = cleanText(input[field]);
    }
  }
  return output;
}

export function publicAttestationDraft(intake = {}) {
  let canonicalOrigin = '';
  try {
    canonicalOrigin = intake.website ? new URL(intake.website).origin : '';
  } catch {
    canonicalOrigin = '';
  }

  return {
    organization: cleanText(intake.organization),
    canonicalOrigin,
    siteType: cleanText(intake.siteType),
    audience: cleanText(intake.audience),
    languages: cleanList(intake.languages),
    goals: cleanList(intake.goals),
    contentSources: cleanList(intake.contentSources),
    desiredCapabilities: cleanList(intake.desiredCapabilities),
    authorizedResources: cleanList(intake.authorizedResources),
    crawlerSearchPolicy: cleanText(intake.crawlerSearchPolicy),
    crawlerTrainingPolicy: cleanText(intake.crawlerTrainingPolicy),
  };
}

function fieldsForStage(options = {}) {
  return options.stage === 'basic' ? basicFields : completionFields;
}

export function completionForIntake(intake = {}, options = {}) {
  const fields = fieldsForStage(options);
  const completed = fields.filter((field) => {
    const value = intake[field];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  }).length;
  return Math.round((completed / fields.length) * 100);
}

export function nextQuestion(intake = {}, options = {}) {
  const field = fieldsForStage(options).find((key) => {
    const value = intake[key];
    return Array.isArray(value) ? value.length === 0 : !value;
  });
  return field ? { field, prompt: translatedQuestions[options.locale]?.[field] || questions[field] } : null;
}
