// Production entry point. Wires the app together and starts listening.
// Run with `npm start`.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadConfig } from './src/config.js';
import { createApp } from './src/app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = loadConfig();

const app = createApp({
  sessionSecret: config.sessionSecret,
  allowedDomain: config.allowedDomain,
  isHttps: config.isHttps,
  presentationRoot: __dirname,
  viewsDir: path.join(__dirname, 'views'),
});

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Presentation server listening on ${config.baseUrl}`);
  console.log(`Allowed email domain: @${config.allowedDomain}`);
});
