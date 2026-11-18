import {isEpoch, parseMain, parseQa, parseRow} from './codec.mjs';

const identityFields = ['response', 'main', 'label', 'test', 'token', 'actor', 'generation', 'directProof'];
const identity = value => value !== null && (typeof value === 'object' || typeof value === 'function');
const journalCustodyFields = ['regular', 'pathStable', 'ownerMatch', 'modeMatch', 'singleLink', 'trailingLf'];
const postConditions = ['publicFrameConfirmed', 'recorderIntact', 'closeReturned', 'childTerminatedNormally'];

function qualifiedJournal(proof, label) {
  const {marks, bytes, rows, custody, recorderIntact, countQualified, countSnapshot} = proof ?? {};
  if (recorderIntact !== true || countQualified !== true || !identity(countSnapshot) ||
      !custody || !journalCustodyFields.every(field => custody[field] === true) ||
      !Number.isSafeInteger(bytes) || bytes < 1 || bytes > 32768 ||
      !Number.isSafeInteger(rows) || rows < 4 || rows > 128 ||
      !Array.isArray(marks) || marks.length !== 4 || !marks.every(mark => mark?.label === label)) {
    return false;
  }
  const [actionEnter, actionTerminal, countEnter, countTerminal] = marks;
  return actionEnter.kind === 'actionEnter' &&
    (actionTerminal.kind === 'actionReturn' || actionTerminal.kind === 'actionThrow') &&
    countEnter.kind === 'countEnter' && countTerminal.kind === 'countReturn';
}

export function createPendingHost(config) {
  const {enabled, epoch, directProof, expectedLabel, testIdentity} = config ?? {};
  const on = enabled === true && isEpoch(epoch) && identity(directProof) &&
    typeof expectedLabel === 'string' && expectedLabel.length > 0 && identity(testIdentity);
  let state = 'empty';
  let retained;
  let main;
  let stagedRow = null;

  function capture(handle) {
    if (!on || state === 'closed') return false;
    if (state !== 'empty' || handle?.directProof !== directProof || handle.label !== expectedLabel ||
        handle.test !== testIdentity || !identityFields.every(field => field === 'label' || identity(handle[field]))) {
      state = 'closed';
      retained = null;
      return false;
    }
    retained = Object.freeze({
      response: handle.response, main: handle.main, label: handle.label, test: handle.test,
      token: handle.token, actor: handle.actor, generation: handle.generation, directProof,
      status: handle.status, g1: handle.g1,
    });
    state = 'captured';
    return true;
  }

  function stage(code, tuple = '-----') {
    stagedRow = 'p1.' + code + '.' + main.cut + '.' + tuple;
    state = 'staged';
    return stagedRow;
  }

  function take(context, proof, readMain) {
    if (state !== 'captured') return false;
    const current = retained;
    state = 'closed';
    retained = null;
    if (!context || !identityFields.every(field => context[field] === current[field]) ||
        current.status !== 503 || current.g1 !== 'g1.503.L.0' ||
        context.beforeCutoff !== true || context.reserveAvailable !== true ||
        !qualifiedJournal(proof, current.label) || typeof readMain !== 'function') {
      return false;
    }
    try {
      main = parseMain(readMain(current.response), epoch);
    } catch {
      return false;
    }
    if (!main) return false;
    if (main.key === null) stage('K');
    else state = 'ready';
    return true;
  }

  function startRead(invoke) {
    if (state !== 'ready' || typeof invoke !== 'function') return undefined;
    state = 'waiting';
    try {
      return invoke(epoch, main.key);
    } catch {
      completeRead('failure');
      return undefined;
    }
  }

  function completeRead(kind, value) {
    if (state !== 'waiting') return null;
    if (kind === 'timeout') return stage('T');
    if (kind !== 'reply') return stage('V');
    const qa = parseQa(value, epoch, main.key);
    return stage(qa.code, qa.tuple);
  }

  function staged() {
    return state === 'staged' ? stagedRow : null;
  }

  function admit(privateFile, proof) {
    if (state !== 'staged') return null;
    state = 'closed';
    return proof && postConditions.every(field => proof[field] === true) &&
      parseRow(privateFile) === stagedRow ? stagedRow : null;
  }

  return Object.freeze({capture, take, startRead, completeRead, staged, admit});
}
