const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('node:http');

const { generateToken, clearToken } = require('../src/utils/generateToken');
const { protect, adminOnly } = require('../src/middlewares/auth.middleware');

describe('Auth Middleware & Cookie Generation Tests', () => {
  const TEST_SECRET = 'test_jwt_secret_for_unit_tests_only';
  const originalSecret = process.env.JWT_SECRET;
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    process.env.JWT_SECRET = TEST_SECRET;
    process.env.NODE_ENV = 'development';
  });

  afterEach(() => {
    process.env.JWT_SECRET = originalSecret;
    process.env.NODE_ENV = originalEnv;
  });

  test('generateToken issues httpOnly cookie with path / and expected attributes', () => {
    const cookiesSet = {};
    const mockRes = {
      cookie: (name, value, options) => {
        cookiesSet[name] = { value, options };
      }
    };

    generateToken(mockRes, 'test-user-id');

    assert.ok(cookiesSet.jwt, 'jwt cookie was set');
    assert.equal(cookiesSet.jwt.options.httpOnly, true, 'cookie must be httpOnly');
    assert.equal(cookiesSet.jwt.options.path, '/', 'cookie path must be /');
    assert.equal(cookiesSet.jwt.options.sameSite, 'strict', 'current sameSite setting is strict');
    assert.ok(cookiesSet.jwt.value, 'token value must be non-empty');

    // Verify token payload
    const decoded = jwt.verify(cookiesSet.jwt.value, TEST_SECRET);
    assert.equal(decoded.id, 'test-user-id');
  });

  test('clearToken sets expired cookie', () => {
    const cookiesSet = {};
    const mockRes = {
      cookie: (name, value, options) => {
        cookiesSet[name] = { value, options };
      }
    };

    clearToken(mockRes);

    assert.ok(cookiesSet.jwt, 'jwt cookie was cleared');
    assert.equal(cookiesSet.jwt.value, '');
    assert.deepEqual(cookiesSet.jwt.options.expires, new Date(0));
  });
});

describe('Protected Endpoint Behavior Without Token (Expected vs Unexpected 401)', () => {
  let app;
  let server;
  let baseUrl;

  beforeEach(async () => {
    app = express();
    app.use(cookieParser());
    app.use(express.json());

    // Public route
    app.get('/api/public', (req, res) => {
      res.json({ success: true, message: 'public content' });
    });

    // Simulated protected routes using real auth middleware
    app.get('/api/notifications', protect, (req, res) => {
      res.json({ success: true, data: [] });
    });

    app.get('/api/admin/dashboard', protect, (req, res) => {
      res.json({ success: true, data: { stats: {} } });
    });

    app.get('/api/enquiries', protect, (req, res) => {
      res.json({ success: true, data: [] });
    });

    server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}`;
  });

  afterEach(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  test('public route succeeds without any token or cookies', async () => {
    const res = await fetch(`${baseUrl}/api/public`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
  });

  test('protected routes return 401 when no cookie is sent (guest or dropped cross-site cookie)', async () => {
    const endpoints = [
      '/api/notifications',
      '/api/admin/dashboard',
      '/api/enquiries'
    ];

    for (const endpoint of endpoints) {
      const res = await fetch(`${baseUrl}${endpoint}`);
      assert.equal(res.status, 401, `${endpoint} must return 401 when unauthenticated`);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.equal(data.message, 'Not authorized, no token');
    }
  });

  test('protected route returns 401 when invalid cookie token is provided', async () => {
    const res = await fetch(`${baseUrl}/api/notifications`, {
      headers: {
        'Cookie': 'jwt=invalid-garbage-token'
      }
    });

    assert.equal(res.status, 401);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.equal(data.message, 'Not authorized, token failed');
  });

  test('adminOnly middleware blocks authenticated non-admin users with 403', async () => {
    // Add endpoint with adminOnly
    app.get('/api/test-admin', (req, res, next) => {
      req.user = { id: 'u1', role: 'customer' };
      next();
    }, adminOnly, (req, res) => {
      res.json({ success: true });
    });

    const res = await fetch(`${baseUrl}/api/test-admin`);
    assert.equal(res.status, 403);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.equal(data.message, 'Not authorized as an admin');
  });

  test('adminOnly middleware allows authenticated admin users', async () => {
    app.get('/api/test-admin-allowed', (req, res, next) => {
      req.user = { id: 'u2', role: 'admin' };
      next();
    }, adminOnly, (req, res) => {
      res.json({ success: true, message: 'welcome admin' });
    });

    const res = await fetch(`${baseUrl}/api/test-admin-allowed`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.message, 'welcome admin');
  });
});
