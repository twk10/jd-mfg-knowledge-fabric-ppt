// End-to-end flow tests for the auth gate. There is no real identity
// provider here (self-asserted email/domain check), so these exercise the
// gate purely over HTTP:
//   1. Unauthenticated user            -> redirected to /login
//   2. Valid @thoughtworks.com email   -> presentation served
//   3. Non-thoughtworks email          -> rejected, deck stays locked
//   4. Malformed email                 -> rejected, deck stays locked
//   5. Logout                          -> deck locked again until re-login
// Static assets are checked too, so "just hit the asset URL" cannot bypass auth.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp, isAllowedEmail } from '../src/app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const VIEWS = path.join(ROOT, 'views');

function buildServer() {
  const app = createApp({
    sessionSecret: 'test-secret-do-not-use-in-prod',
    allowedDomain: 'thoughtworks.com',
    isHttps: false,
    presentationRoot: ROOT,
    viewsDir: VIEWS,
  });
  return http.createServer(app);
}

// Minimal cookie-aware client over fetch (no redirect following).
function makeClient(base) {
  const jar = new Map();
  const cookieHeader = () =>
    [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
  const store = (res) => {
    const cookies = res.headers.getSetCookie ? res.headers.getSetCookie() : [];
    for (const c of cookies) {
      const [pair] = c.split(';');
      const idx = pair.indexOf('=');
      const name = pair.slice(0, idx).trim();
      const value = pair.slice(idx + 1).trim();
      if (value === '') jar.delete(name);
      else jar.set(name, value);
    }
  };
  return {
    jar,
    async get(pathname) {
      const res = await fetch(base + pathname, {
        redirect: 'manual',
        headers: jar.size ? { cookie: cookieHeader() } : {},
      });
      store(res);
      return res;
    },
    async postForm(pathname, fields) {
      const res = await fetch(base + pathname, {
        method: 'POST',
        redirect: 'manual',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          ...(jar.size ? { cookie: cookieHeader() } : {}),
        },
        body: new URLSearchParams(fields).toString(),
      });
      store(res);
      return res;
    },
  };
}

async function withServer(fn) {
  const server = buildServer();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    await fn(base);
  } finally {
    server.closeAllConnections?.(); // drop idle keep-alive sockets promptly
    await new Promise((r) => server.close(r));
  }
}

test('isAllowedEmail: accepts exact domain match, case-insensitively', () => {
  assert.equal(isAllowedEmail('Alice@ThoughtWorks.COM', 'thoughtworks.com'), true);
  assert.equal(isAllowedEmail(' bob@thoughtworks.com ', 'thoughtworks.com'), true);
});

test('isAllowedEmail: rejects other domains, sub-domains, and bad formats', () => {
  assert.equal(isAllowedEmail('bob@gmail.com', 'thoughtworks.com'), false);
  assert.equal(isAllowedEmail('bob@evil-thoughtworks.com', 'thoughtworks.com'), false);
  assert.equal(isAllowedEmail('bob@sub.thoughtworks.com', 'thoughtworks.com'), false);
  assert.equal(isAllowedEmail('not-an-email', 'thoughtworks.com'), false);
  assert.equal(isAllowedEmail('', 'thoughtworks.com'), false);
  assert.equal(isAllowedEmail(null, 'thoughtworks.com'), false);
});

test('unauthenticated user is redirected to /login', async () => {
  await withServer(async (base) => {
    const client = makeClient(base);
    const res = await client.get('/');
    assert.equal(res.status, 302);
    assert.equal(res.headers.get('location'), '/login');
  });
});

test('unauthenticated static asset request does not leak the file', async () => {
  await withServer(async (base) => {
    const client = makeClient(base);
    const res = await client.get('/js/deck.js');
    assert.equal(res.status, 302);
    assert.equal(res.headers.get('location'), '/login');
  });
});

test('valid @thoughtworks.com email reaches the presentation', async () => {
  await withServer(async (base) => {
    const client = makeClient(base);
    const cb = await client.postForm('/login', { email: 'alice@thoughtworks.com' });
    assert.equal(cb.status, 302);
    assert.equal(cb.headers.get('location'), '/');

    const deck = await client.get('/');
    assert.equal(deck.status, 200);
    const body = await deck.text();
    assert.match(body, /id="stage"/); // real deck markup
    assert.match(body, /id="tw-logout"/); // injected logout control

    const asset = await client.get('/js/deck.js');
    assert.equal(asset.status, 200);
  });
});

test('non-thoughtworks email is rejected and cannot view the deck', async () => {
  await withServer(async (base) => {
    const client = makeClient(base);
    const cb = await client.postForm('/login', { email: 'bob@gmail.com' });
    assert.equal(cb.status, 302);
    assert.equal(cb.headers.get('location'), '/login?error=domain');

    const deck = await client.get('/');
    assert.equal(deck.status, 302);
    assert.equal(deck.headers.get('location'), '/login');
  });
});

test('malformed email is rejected', async () => {
  await withServer(async (base) => {
    const client = makeClient(base);
    const cb = await client.postForm('/login', { email: 'not-an-email' });
    assert.equal(cb.headers.get('location'), '/login?error=invalid');
  });
});

test('logout locks the deck again until re-login', async () => {
  await withServer(async (base) => {
    const client = makeClient(base);
    await client.postForm('/login', { email: 'alice@thoughtworks.com' });
    assert.equal((await client.get('/')).status, 200);

    const out = await client.get('/logout');
    assert.equal(out.status, 302);
    assert.equal(out.headers.get('location'), '/login');

    const deck = await client.get('/');
    assert.equal(deck.status, 302);
    assert.equal(deck.headers.get('location'), '/login');
  });
});
