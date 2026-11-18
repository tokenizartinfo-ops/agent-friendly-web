import test from 'node:test';
import assert from 'node:assert/strict';
import {createLocalJWKSet, exportJWK, generateKeyPair, SignJWT} from 'jose';
import {syntheticSaveFixture} from './fixtures/mcp-own-synthetic-save.mjs';
import {createOwnSubscriptionObservationHandler} from '../lib/mcp-own-subscription-observation-http.mjs';
import {saveOwnSyntheticGoal} from '../lib/mcp-own-synthetic-save.mjs';
import {projectDossierEvent} from '../lib/dossier-supervision.mjs';
import {verifyCloudflareAccessJwt} from '../lib/cloudflare-access-identity.mjs';

const origin = 'https://delegated-canary.agentfriendlyweb.dev';

test('one synthetic dossier event is received, reviewed and withdrawn under the original subscription', async () => {
  const deliveries = [];
  const f = await syntheticSaveFixture({
    projectId: 'oauth-canary-owner',
    resource: origin + '/mcp',
    onDelivery: (event, headers) => {
      deliveries.push({
        event,
        webhookId: headers['webhook-id'],
        subscriptionId: headers['X-MCP-Subscription-Id'],
      });
    },
  });
  try {
    const {privateKey, publicKey} = await generateKeyPair('RS256');
    const jwk = {...await exportJWK(publicKey), kid: 'qa-journey', alg: 'RS256'};
    const keySet = createLocalJWKSet({keys: [jwk]});
    const token = await new SignJWT({email: 'owner@example.invalid'})
      .setProtectedHeader({alg: 'RS256', kid: jwk.kid})
      .setSubject('owner')
      .setIssuer('https://own.cloudflareaccess.com')
      .setAudience('own')
      .setExpirationTime('5m')
      .sign(privateKey);
    const observations = [];
    const review = createOwnSubscriptionObservationHandler({
      enabled: true,
      issuer: origin,
      subject: 'owner',
      teamDomain: 'own.cloudflareaccess.com',
      audience: 'own',
      window: f.config.window,
      current: () => true,
      accessVerifier: options => verifyCloudflareAccessJwt({...options, keySet}),
      readObservation: async () => {
        const observed = await f.host.observeSubscription();
        observations.push(observed);
        return observed;
      },
    });
    const openReview = () => review(new Request(origin + '/qa/expediente?view=avisos', {
      headers: {'Cf-Access-Jwt-Assertion': token},
    }));

    const saved = await saveOwnSyntheticGoal(f.options, {
      expectedRevision: 1,
      idempotencyKey: '11111111-1111-4111-8111-111111111111',
      goal: 'discovery',
    });
    assert.equal(saved.status, 200);
    const projectRef = await f.host.list();
    await f.host.deliverOwnSaved(saved.eventId);
    assert.equal(deliveries.length, 1);
    const delivery = deliveries[0];
    const {subscription_id: subscriptionId} = f.db.prepare(
      'SELECT subscription_id FROM dossier_event_subscription_receipts',
    ).get();
    assert.equal(delivery.subscriptionId, subscriptionId);
    const [eventRow] = f.db.prepare(
      'SELECT id, project_id AS projectId, type, created_at AS createdAt FROM project_events',
    ).all();
    assert.equal(eventRow.id, saved.eventId);
    const signal = await projectDossierEvent(
      {...eventRow, revision: saved.revision}, f.config.projectionSecret,
    );
    assert.equal(delivery.webhookId, signal.eventId);
    assert.equal(delivery.event.eventId, signal.eventId);
    assert.equal(delivery.event.timestamp, signal.observedAt);
    assert.equal(projectRef, signal.projectRef);
    assert.equal(delivery.event.name, 'afw.dossier.changed');
    assert.deepEqual(delivery.event.data, {projectRef, revision: 2, kind: 'project_updated'});
    assert.deepEqual(f.db.prepare('SELECT id FROM project_events').all().map(row => row.id), [saved.eventId]);

    const active = await openReview();
    assert.equal(active.status, 200);
    assert.match(await active.text(), /El aviso sigue registrado/);
    assert.equal(observations.length, 1);
    assert.equal(observations[0].state, 'active');
    assert.equal(observations[0].httpReceipt.status, 200);
    assert.equal(observations[0].cloudReviewConfirmed, false);

    await f.host.unsubscribe({
      name: delivery.event.name,
      arguments: {projectRef},
      delivery: {mode: 'webhook', url: 'https://callback.agentfriendlyweb.dev/hook'},
    });
    const withdrawn = await openReview();
    assert.equal(withdrawn.status, 200);
    assert.match(await withdrawn.text(), /El registro de avisos está retirado/);
    assert.equal(observations.length, 2);
    assert.equal(observations[1].state, 'withdrawn');
    assert.deepEqual(observations[1].httpReceipt, observations[0].httpReceipt);
    assert.equal(f.db.prepare('SELECT subscription_id FROM dossier_event_subscription_receipts').get().subscription_id, subscriptionId);
    assert.equal(deliveries.length, 1);
    assert.equal(f.sends(), 2);
    assert.equal(f.config.ctx.container.running, false);
  } finally {
    try {
      await f.host.close();
    } finally {
      f.close();
    }
  }
});
