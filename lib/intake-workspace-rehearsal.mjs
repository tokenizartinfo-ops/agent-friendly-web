import { normalizeIntake, completionForIntake, nextQuestion } from './intake.mjs';

export function createIntakeRehearsal({ versioned = false, failInitialRead = false } = {}) {
  let project = { ...normalizeIntake({ organization: 'Restaurante Demo', website: 'https://restaurant.example/', cms: 'WordPress', hosting: 'Proveedor Demo', languages: ['es'] }), id: 'demo', completion: 0, roadmap: [] };
  let fail = false;
  let loseResponse = false;
  const receipts = new Map();
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
      if (method === 'GET' && url === '/api/projects/demo/scope-reference') return Response.json({ reference: null });
      if (method === 'GET' && url === '/api/projects/demo/domain-claims') return Response.json({ claim: null });
      if (method === 'GET' && url === '/api/projects/demo/observations') return Response.json({ observation: null });
      return Response.json({ error: 'Operation disabled in local rehearsal' }, { status: 403 });
    },
  };
}
