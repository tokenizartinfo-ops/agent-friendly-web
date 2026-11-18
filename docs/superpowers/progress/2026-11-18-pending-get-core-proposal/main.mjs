import {isEpoch, isUuid} from './codec.mjs';

const header = 'x-afw-lab-pending1';
const cellLimit = 64;
const writeLimit = 255;
const identity = value => value !== null && (typeof value === 'object' || typeof value === 'function');
const transition = {
  requestBytesEnter: [0, 1],
  requestBytesReturn: [1, 2],
  stubEnter: [2, 3],
  stubReturn: [3, 4],
  responseBytesEnter: [4, 5],
};

export function createPendingMain(config) {
  const {enabled, epoch, directProof, registerModelBudgetSeed} = config ?? {};
  if (enabled !== true || !isEpoch(epoch) || !identity(directProof)) return null;
  const cells = new WeakMap();
  const leases = new WeakMap();
  let count = 0;
  let overflow = false;

  function poison(cell) {
    cell.bad = true;
    cell.candidates = null;
    cell.selected = null;
  }

  function write(cell) {
    if (cell.writes === writeLimit) {
      poison(cell);
      return false;
    }
    cell.writes += 1;
    return true;
  }

  function active(lease) {
    const cell = leases.get(lease);
    return overflow || !cell || cell.bad || cell.selected ? null : cell;
  }

  function enter(original, proof) {
    if (overflow || proof !== directProof) return;
    if (count === cellLimit) {
      overflow = true;
      return;
    }
    count += 1;
    cells.set(original, {
      writes: 1, cursor: 0, key: null, response: null, inFirstRead: false,
      bad: false, candidates: [], selected: null, published: false,
    });
  }

  function bind(original, lease) {
    const cell = cells.get(original);
    if (overflow || !cell || cell.bad || !write(cell)) return;
    leases.set(lease, cell);
  }

  function mark(lease, boundary, response) {
    const cell = active(lease);
    if (!cell) return;
    if (typeof boundary !== 'string' || !Object.hasOwn(transition, boundary)) {
      poison(cell);
      return;
    }
    const [before, after] = transition[boundary];
    if (cell.cursor !== before || (boundary === 'stubReturn' && !identity(response)) ||
        (boundary === 'responseBytesEnter' && cell.response !== response)) {
      poison(cell);
      return;
    }
    if (!write(cell)) return;
    cell.cursor = after;
    if (boundary === 'stubReturn') cell.response = response;
  }

  function captureUuid(lease, key) {
    const cell = active(lease);
    if (!cell) return;
    if (cell.cursor !== 2 || cell.key !== null || !isUuid(key)) {
      poison(cell);
      return;
    }
    if (write(cell)) cell.key = key;
  }

  function markRead(lease, response, point) {
    const cell = active(lease);
    if (!cell) return;
    if (cell.response !== null && cell.response !== response) return;
    const cursor = cell.cursor;
    if (!cell.response) {
      poison(cell);
      return;
    }
    if (point === 'enter' && cursor === 5 && !cell.inFirstRead) {
      if (write(cell)) cell.inFirstRead = true;
      return;
    }
    if (point === 'enter' && cursor === 6) {
      if (write(cell)) cell.cursor = 7;
      return;
    }
    if (point === 'return' && ((cursor === 5 && cell.inFirstRead) || cursor === 7)) {
      if (write(cell)) {
        cell.cursor = 6;
        cell.inFirstRead = false;
      }
      return;
    }
    if (point === 'responseBytesReturn' && ((cursor === 5 && !cell.inFirstRead) || cursor === 6)) {
      if (write(cell)) cell.cursor = 8;
      return;
    }
    poison(cell);
  }

  function invalidate(lease) {
    const cell = active(lease);
    if (cell) poison(cell);
  }

  function deadline(lease, error, origin, arity) {
    const cell = active(lease);
    if (!cell) return;
    const validOrigin = (origin === 'T' && arity === 0) || (origin === 'E' && arity === 1);
    if (!validOrigin || cell.candidates.length === 2 || cell.candidates.some(item => item.error === error)) {
      poison(cell);
      return;
    }
    if (write(cell)) {
      cell.candidates.push(Object.freeze({error, origin, cursor: cell.cursor, key: cell.key}));
    }
  }

  function select(lease, error, winner) {
    const cell = active(lease);
    if (!cell) return;
    const exact = winner === 'L' && cell.candidates.find(item => item.error === error);
    if (!exact) {
      poison(cell);
      return;
    }
    if (!write(cell)) return;
    cell.selected = exact;
    cell.candidates = null;
  }

  function finish(original, lease, headers, headerSet) {
    const cell = leases.get(lease);
    if (overflow || !cell || cells.get(original) !== cell || cell.bad || cell.published || !cell.selected) return;
    const {origin, cursor, key} = cell.selected;
    if ((cursor >= 3 && !key) || (cursor < 2 && key)) return;
    cell.published = true;
    Reflect.apply(headerSet, headers, [header, 'm1.' + epoch + '.' + origin + cursor + '.' + (key ?? '-')]);
  }

  // B1 fixture injection only. B2 must exclude this registration and mutation seam.
  if (typeof registerModelBudgetSeed === 'function') {
    let seedUsed = false;
    registerModelBudgetSeed(lease => {
      const cell = active(lease);
      if (!cell || seedUsed) return false;
      seedUsed = true;
      cell.writes = writeLimit;
      return true;
    });
  }

  const hooks = Object.freeze({mark, captureUuid, markRead, invalidate});
  return Object.freeze({enter, bind, deadline, select, finish, hooks});
}
