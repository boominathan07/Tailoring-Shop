/**
 * CORS Configuration and Origin Validator for Guru Tailoring
 * Handles origin verification for Express API and Socket.IO
 */

const TRUSTED_STATIC_ORIGINS = [
  'https://tailoring-shop-sooty.vercel.app',
  'https://tailoring-shop-leixxq0n8-boominathan07s-projects.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

// Strictly scoped to Boominathan's Guru Tailoring project preview deployments on Vercel
// Does NOT allow arbitrary *.vercel.app deployments
const TRUSTED_VERCEL_PROJECT_REGEX = /^https:\/\/tailoring-shop(-[a-z0-9-]+)?-boominathan07s-projects\.vercel\.app$/;

/**
 * Normalizes an origin or URL string: trims whitespace and strips trailing slashes
 */
const normalizeOrigin = (origin) => {
  if (!origin || typeof origin !== 'string') return '';
  return origin.trim().replace(/\/+$/, '');
};

/**
 * Retrieves and normalizes origins configured in CLIENT_URL environment variable
 */
const getConfiguredOrigins = () => {
  const clientUrlEnv = process.env.CLIENT_URL || '';
  return clientUrlEnv
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean);
};

/**
 * Determines whether an origin is permitted
 */
const isOriginAllowed = (origin) => {
  // Allow requests without Origin header (e.g. mobile apps, curl, server-to-server)
  if (origin === undefined || origin === null) return true;

  const normalized = normalizeOrigin(origin);
  if (!normalized) return false;

  const allowedOrigins = [
    ...TRUSTED_STATIC_ORIGINS.map(normalizeOrigin),
    ...getConfiguredOrigins()
  ];

  if (allowedOrigins.includes(normalized)) {
    return true;
  }

  return TRUSTED_VERCEL_PROJECT_REGEX.test(normalized);
};

/**
 * Origin handler callback compatible with Express cors package and Socket.IO
 */
const corsOriginHandler = (origin, callback) => {
  if (origin === undefined || origin === null) {
    return callback(null, true);
  }

  if (isOriginAllowed(origin)) {
    // Return the normalized exact origin to prevent trailing-slash mismatches
    return callback(null, normalizeOrigin(origin));
  }

  // Reject disallowed origins without returning Access-Control-Allow-Origin
  return callback(null, false);
};

module.exports = {
  TRUSTED_STATIC_ORIGINS,
  TRUSTED_VERCEL_PROJECT_REGEX,
  normalizeOrigin,
  getConfiguredOrigins,
  isOriginAllowed,
  corsOriginHandler
};
