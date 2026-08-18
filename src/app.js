// Express application factory.
//
// There is no Google OAuth client here (creating one needs GCP IAM
// permissions the project doesn't have). Instead this is a self-asserted
// email/domain gate: the visitor types an email address and, if it ends in
// "@<allowedDomain>", a session is granted. Nothing verifies the visitor
// actually owns that address, so this is a soft speed-bump, not real
// authentication — do not put sensitive content behind it.
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import cookieSession from 'cookie-session';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Pure domain gate. An email is allowed only when it is a plausible email
 * address and it ends with exactly "@<allowedDomain>" (sub-domains rejected).
 * This is a format/domain check only — it does not verify ownership.
 */
export function isAllowedEmail(email, allowedDomain) {
  if (!email || typeof email !== 'string') return false;
  const normalized = email.trim().toLowerCase();
  if (!EMAIL_RE.test(normalized)) return false;
  return normalized.endsWith(`@${allowedDomain.toLowerCase()}`);
}

export function createApp({
  sessionSecret,
  allowedDomain,
  isHttps = false,
  presentationRoot,
  viewsDir,
}) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.urlencoded({ extended: false }));

  // Replit terminates TLS at a proxy; trust it so secure cookies work.
  if (isHttps) app.set('trust proxy', 1);

  // Session data (just the logged-in email) lives entirely in a signed
  // cookie rather than server memory, so login survives across Autoscale's
  // multiple instances and cold starts without needing a shared store.
  app.use(
    cookieSession({
      name: 'tw.deck.sid',
      secret: sessionSecret,
      httpOnly: true,
      sameSite: 'lax',
      secure: isHttps,
      maxAge: 1000 * 60 * 60 * 8, // 8 hours
    })
  );

  const renderPage = (file) => fs.readFileSync(path.join(viewsDir, file), 'utf8');

  function requireAuth(req, res, next) {
    if (req.session && req.session.user) return next();
    return res.redirect('/login');
  }

  // --- Public (unauthenticated) routes -------------------------------------

  app.get('/login', (req, res) => {
    if (req.session && req.session.user) return res.redirect('/');
    res.type('html').send(renderPage('login.html'));
  });

  app.get('/healthz', (_req, res) => res.json({ ok: true }));

  // --- Domain-check "login" -------------------------------------------------

  app.post('/login', (req, res) => {
    const email = req.body?.email;

    if (!isAllowedEmail(email, allowedDomain)) {
      const code = email && EMAIL_RE.test(String(email).trim()) ? 'domain' : 'invalid';
      return res.redirect(`/login?error=${code}`);
    }

    // Assigning a fresh object (rather than mutating) replaces the cookie
    // outright, the cookie-session equivalent of regenerating a session.
    req.session = { user: { email: String(email).trim().toLowerCase() } };
    res.redirect('/');
  });

  app.all('/logout', (req, res) => {
    req.session = null;
    res.redirect('/login');
  });

  // --- Protected presentation ----------------------------------------------

  // Serve index.html with a small, additive logout control injected at
  // response time. The source index.html on disk is never modified.
  const logoutControl = renderPage('logout-control.html');
  app.get(['/', '/index.html'], requireAuth, (req, res) => {
    const html = fs
      .readFileSync(path.join(presentationRoot, 'index.html'), 'utf8')
      .replace('</body>', `${logoutControl}\n</body>`);
    res.type('html').send(html);
  });

  // Every static asset directory is gated behind the same auth check.
  for (const dir of ['css', 'js', 'slides']) {
    app.use(`/${dir}`, requireAuth, express.static(path.join(presentationRoot, dir)));
  }

  // Any other unknown/protected path falls back to the login redirect.
  app.use((req, res) => {
    if (req.session && req.session.user) return res.status(404).send('Not found');
    return res.redirect('/login');
  });

  return app;
}
