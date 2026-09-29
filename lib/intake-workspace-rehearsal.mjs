import { normalizeIntake, completionForIntake, nextQuestion } from './intake.mjs';
import { previewScanScope } from './scan-scope-transfer.mjs';

async function scopeId(key) {
  const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key)));
  return `scope-${Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')}`;
}

export function createIntakeRehearsal({ versioned = false, failInitialRead = false } = {}) {
  let project = { ...normalizeIntake({ organization: 'Restaurante Demo', website: 'https://restaurant.example/', cms: 'WordPress', hosting: 'Proveedor Demo', languages: ['es'] }), id: 'demo', completion: 0, roadmap: [] };
  let fail = false;
  let loseResponse = false;
  const receipts = new Map();
  const scopeReceipts = new Map();
  let scopeReference = null;
  project.revision = 1;
  let sessionActive = true;
  return {
    simulateRemoteEdit() { project = { ...project, organization: 'Restaurante actualizado en otra pestaña', revision: project.revision + 1 }; },
    simulateRemoteWebsite() { project = { ...project, website: 'https://changed.example/', revision: project.revision + 1 }; },
    expireSession() { sessionActive = false; },
    restoreSession() { sessionActive = true; },
    failNext() { fail = true; },
    loseNextResponse() { loseResponse = true; },
    async request(url, init = {}) {
      if (!sessionActive) return Response.json({ code: 'session_required' }, { status: 401 });
      const method = init.method || 'GET';
      if (url === '/api/projects' && method === 'GET') { if(failInitialRead){failInitialRead=false;return Response.json({error:'Simulated initial read failure'},{status:503});} return Response.json({ project }); }
      if (url === '/api/projects' && method === 'PUT') {
        if (fail) { fail = false; return Response.json({ error: 'Simulated connection failure. Borrador conservado; vuelve a guardar.' }, { status: 503 }); }
        const raw = JSON.parse(init.body);
        const key = new Headers(init.headers).get('idempotency-key');
        const receipt = key && receipts.get(key);
        if (receipt) {
          if (receipt.body !== init.body) return Response.json({ code: 'idempotency_conflict' }, { status: 409 });
          if (receipt.revision !== project.revision) return Response.json({ code: 'revision_conflict', appliedEarlier: true, project }, { status: 409 });
          return Response.json({ project, replayed: true });
        }
        if (versioned && !Number.isSafeInteger(raw.revision)) return Response.json({ error: 'Revision required' }, { status: 428 });
        if (versioned && raw.revision !== project.revision) return Response.json({ code: 'revision_conflict', project }, { status: 409 });
        const intake = normalizeIntake(raw);
        if (!intake.website) return Response.json({ error: 'Website required' }, { status: 400 });
        project = { ...intake, id: 'demo', revision: project.revision + 1, completion: completionForIntake(intake), nextQuestion: nextQuestion(intake)?.prompt, roadmap: [] };
        if (key) receipts.set(key, { body: init.body, revision: project.revision });
        if (loseResponse) { loseResponse = false; throw new Error('response_lost'); }
        return Response.json({ project });
      }
      if (url === '/api/projects/demo/scope-reference') {
        if (method === 'GET') return Response.json({ reference: scopeReference && {
          ...scopeReference,
          websiteMatches: previewScanScope(scopeReference.scopeText, project.website).websiteMatches === true,
          requiresFreshReview: true,
          publicationAuthorized: false,
        } });
        if (method === 'POST') {
          let body;
          try { body = JSON.parse(init.body); } catch { return Response.json({ code: 'invalid_scope_request' }, { status: 400 }); }
          if (!body || body.contract !== 'afw.scope-reference.v1' || body.confirmSave !== true ||
            typeof body.idempotencyKey !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/.test(body.idempotencyKey) ||
            !Number.isSafeInteger(body.expectedProjectRevision) ||
            !(body.expectedReferenceId === null || typeof body.expectedReferenceId === 'string'))
            return Response.json({ code: 'invalid_scope_request' }, { status: 400 });
          let canonical;
          try { previewScanScope(body.scopeText); canonical = JSON.stringify(JSON.parse(body.scopeText)); }
          catch { return Response.json({ code: 'invalid_scope' }, { status: 400 }); }
          const fingerprint = JSON.stringify([canonical, body.expectedProjectRevision, body.expectedReferenceId]);
          const prior = scopeReceipts.get(body.idempotencyKey);
          if (prior) {
            if (prior.fingerprint !== fingerprint || scopeReference?.id !== prior.reference.id)
              return Response.json({ code: 'reference_changed' }, { status: 409 });
            return Response.json({ reference: prior.reference });
          }
          if (body.expectedProjectRevision !== project.revision || body.expectedReferenceId !== (scopeReference?.id ?? null))
            return Response.json({ code: 'reference_changed' }, { status: 409 });
          if (previewScanScope(canonical, project.website).websiteMatches !== true)
            return Response.json({ code: 'website_mismatch' }, { status: 400 });
          const reference = { id: await scopeId(`demo:${body.idempotencyKey}`), savedAt: new Date().toISOString(), scopeText: canonical,
            websiteMatches: true, requiresFreshReview: true, publicationAuthorized: false };
          scopeReference = reference;
          scopeReceipts.set(body.idempotencyKey, { fingerprint, reference });
          return Response.json({ reference });
        }
      }
      if (method === 'GET' && url === '/api/projects/demo/domain-claims') return Response.json({ claim: null });
      if (method === 'GET' && url === '/api/projects/demo/observations') return Response.json({ observation: null });
      return Response.json({ error: 'Operation disabled in local rehearsal' }, { status: 403 });
    },
  };
}
