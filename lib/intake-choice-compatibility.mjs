import { privateUiCopy } from './private-ui-copy.mjs';

const codes = ['es', 'en', 'pt', 'it', 'fr'];
const aliases = new Map(codes.map(code => [code, code]));
for (const locale of ['es', 'en', 'pt']) {
  privateUiCopy(locale).intake.languages.forEach((label, index) => aliases.set(label.toLowerCase(), codes[index]));
}

export function languageSelection(values = []) {
  return [...new Set(values.filter(value => typeof value === 'string' && value.trim())
    .map(value => aliases.get(value.trim().toLowerCase()) || value.trim()))];
}

export function languageChoices(locale, selected = []) {
  const labels = privateUiCopy(locale).intake.languages;
  return [...codes.map((code, index) => [code, labels[index]]),
    ...languageSelection(selected).filter(value => !codes.includes(value)).map(value => [value, value])];
}

export function goalChoices(locale, selected = []) {
  const choices = privateUiCopy(locale).intake.goals;
  const known = new Set(choices.map(([value]) => value));
  const extra = [...new Set(selected)].filter(value => typeof value === 'string' && value && !known.has(value));
  return [...choices, ...extra.map(value => [value, value])];
}
