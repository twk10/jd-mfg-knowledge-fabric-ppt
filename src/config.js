// Central configuration. All secrets come from environment variables /
// Replit Secrets — nothing sensitive is hard-coded here.
import process from 'node:process';

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". ` +
        'Set it in your local .env or in Replit Secrets.'
    );
  }
  return value;
}

/**
 * Work out the externally reachable base URL of the app.
 * Priority:
 *   1. PUBLIC_URL              (explicit override, e.g. a custom domain)
 *   2. REPLIT_DOMAINS          (set on published Replit Deployments)
 *   3. REPLIT_DEV_DOMAIN       (set automatically inside the Replit workspace)
 *   4. http://localhost:PORT   (local development fallback)
 */
export function resolveBaseUrl() {
  const port = process.env.PORT || '3000';
  if (process.env.PUBLIC_URL) {
    return process.env.PUBLIC_URL.replace(/\/+$/, '');
  }
  if (process.env.REPLIT_DOMAINS) {
    return `https://${process.env.REPLIT_DOMAINS.split(',')[0].trim()}`;
  }
  if (process.env.REPLIT_DEV_DOMAIN) {
    return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  }
  return `http://localhost:${port}`;
}

export function loadConfig() {
  const baseUrl = resolveBaseUrl();
  return {
    port: Number(process.env.PORT || 3000),
    baseUrl,
    isHttps: baseUrl.startsWith('https://'),
    allowedDomain: (process.env.ALLOWED_EMAIL_DOMAIN || 'thoughtworks.com')
      .toLowerCase()
      .replace(/^@/, ''),
    sessionSecret: required('SESSION_SECRET'),
  };
}
