const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const cors = require('cors');
const http = require('node:http');

const {
  isOriginAllowed,
  corsOriginHandler,
  normalizeOrigin,
  TRUSTED_STATIC_ORIGINS
} = require('../src/config/cors');

describe('CORS Origin Validation Unit Tests', () => {
  const originalEnv = process.env.CLIENT_URL;

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.CLIENT_URL = originalEnv;
    } else {
      delete process.env.CLIENT_URL;
    }
  });

  test('normalizes origins by trimming whitespace and trailing slashes', () => {
    assert.equal(normalizeOrigin('https://example.com/'), 'https://example.com');
    assert.equal(normalizeOrigin('  https://example.com///  '), 'https://example.com');
    assert.equal(normalizeOrigin(''), '');
    assert.equal(normalizeOrigin(null), '');
  });

  test('allows main production frontend origin', () => {
    assert.equal(isOriginAllowed('https://tailoring-shop-sooty.vercel.app'), true);
    assert.equal(isOriginAllowed('https://tailoring-shop-sooty.vercel.app/'), true);
  });

  test('allows approved Vercel deployment URL', () => {
    const deploymentUrl = 'https://tailoring-shop-leixxq0n8-boominathan07s-projects.vercel.app';
    assert.equal(isOriginAllowed(deploymentUrl), true);
    assert.equal(isOriginAllowed(deploymentUrl + '/'), true);
  });

  test('allows trusted branch/preview deployments for Boominathan tailoring-shop project', () => {
    assert.equal(isOriginAllowed('https://tailoring-shop-git-main-boominathan07s-projects.vercel.app'), true);
    assert.equal(isOriginAllowed('https://tailoring-shop-boominathan07s-projects.vercel.app'), true);
  });

  test('allows origins configured in CLIENT_URL env with trailing slashes and spaces', () => {
    process.env.CLIENT_URL = ' https://custom-domain.com/ , https://another-preview.vercel.app/ ';
    assert.equal(isOriginAllowed('https://custom-domain.com'), true);
    assert.equal(isOriginAllowed('https://custom-domain.com/'), true);
    assert.equal(isOriginAllowed('https://another-preview.vercel.app'), true);
  });

  test('allows non-browser requests with no origin', () => {
    assert.equal(isOriginAllowed(undefined), true);
    assert.equal(isOriginAllowed(null), true);
    assert.equal(isOriginAllowed(''), false);
  });

  test('rejects arbitrary external origins and broad untrusted vercel deployments', () => {
    // Arbitrary external domain
    assert.equal(isOriginAllowed('https://malicious-site.com'), false);
    // Arbitrary other Vercel user
    assert.equal(isOriginAllowed('https://attacker.vercel.app'), false);
    // Other project under same username
    assert.equal(isOriginAllowed('https://other-project-boominathan07s-projects.vercel.app'), false);
    // Subdomain takeover / suffix attempt
    assert.equal(isOriginAllowed('https://tailoring-shop-boominathan07s-projects.vercel.app.attacker.com'), false);
  });

  test('corsOriginHandler invokes callback with normalized origin for allowed requests', (t, done) => {
    corsOriginHandler('https://tailoring-shop-sooty.vercel.app/', (err, allowedOrigin) => {
      assert.equal(err, null);
      assert.equal(allowedOrigin, 'https://tailoring-shop-sooty.vercel.app');
      done();
    });
  });

  test('corsOriginHandler invokes callback with false for disallowed origins', (t, done) => {
    corsOriginHandler('https://evil.com', (err, allowedOrigin) => {
      assert.equal(err, null);
      assert.equal(allowedOrigin, false);
      done();
    });
  });
});

describe('Express CORS Integration Tests', () => {
  let app;
  let server;
  let baseUrl;

  beforeEach(async () => {
    app = express();
    app.use(cors({
      origin: corsOriginHandler,
      credentials: true
    }));
    app.get('/api/test', (req, res) => res.json({ success: true }));

    server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}`;
  });

  afterEach(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  test('preflight OPTIONS request from main domain succeeds with credentials and headers', async () => {
    const origin = 'https://tailoring-shop-sooty.vercel.app';
    const res = await fetch(`${baseUrl}/api/test`, {
      method: 'OPTIONS',
      headers: {
        'Origin': origin,
        'Access-Control-Request-Method': 'GET'
      }
    });

    assert.equal(res.status, 204);
    assert.equal(res.headers.get('access-control-allow-origin'), origin);
    assert.equal(res.headers.get('access-control-allow-credentials'), 'true');
    assert.ok(res.headers.get('access-control-allow-methods'));
  });

  test('preflight OPTIONS request from approved deployment domain succeeds', async () => {
    const origin = 'https://tailoring-shop-leixxq0n8-boominathan07s-projects.vercel.app';
    const res = await fetch(`${baseUrl}/api/test`, {
      method: 'OPTIONS',
      headers: {
        'Origin': origin,
        'Access-Control-Request-Method': 'GET'
      }
    });

    assert.equal(res.status, 204);
    assert.equal(res.headers.get('access-control-allow-origin'), origin);
    assert.equal(res.headers.get('access-control-allow-credentials'), 'true');
  });

  test('preflight OPTIONS request from disallowed origin receives NO allow-origin header', async () => {
    const res = await fetch(`${baseUrl}/api/test`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://evil.com',
        'Access-Control-Request-Method': 'GET'
      }
    });

    assert.equal(res.headers.get('access-control-allow-origin'), null);
  });

  test('GET request from approved deployment domain includes allow-origin and credentials', async () => {
    const origin = 'https://tailoring-shop-leixxq0n8-boominathan07s-projects.vercel.app';
    const res = await fetch(`${baseUrl}/api/test`, {
      method: 'GET',
      headers: {
        'Origin': origin
      }
    });

    assert.equal(res.status, 200);
    assert.equal(res.headers.get('access-control-allow-origin'), origin);
    assert.equal(res.headers.get('access-control-allow-credentials'), 'true');
    const data = await res.json();
    assert.equal(data.success, true);
  });

  test('GET request from disallowed origin receives NO allow-origin header', async () => {
    const res = await fetch(`${baseUrl}/api/test`, {
      method: 'GET',
      headers: {
        'Origin': 'https://evil.com'
      }
    });

    assert.equal(res.status, 200);
    assert.equal(res.headers.get('access-control-allow-origin'), null);
  });
});
