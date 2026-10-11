# Deployment Plan: Guru Tailoring

This document outlines the requirements and steps for deploying the Guru Tailoring application to production.

## 1. Build & Start Commands
* **Frontend (Client)**
  * **Build Command**: `npm run build` (runs `vite build`)
  * **Output Directory**: `dist/`
  * **Runtime**: A static web host (e.g., Vercel, Netlify, Nginx, or AWS S3). Node.js is only required for the build step.
* **Backend (Server)**
  * **Start Command**: `npm start` (runs `node src/server.js`)
  * **Runtime Requirement**: Node.js `>=20.0.0` (LTS or later recommended to support modern ES features and security).

## 2. Environment Variables
The following environment variables MUST be provided to the production backend. Never commit these values.
* `PORT`: The port for the backend server (often assigned dynamically by the host, e.g., 5000).
* `MONGO_URI`: The connection string for your production MongoDB Atlas cluster.
* `JWT_SECRET`: A long, cryptographically secure random string for signing auth tokens.
* `CLOUDINARY_CLOUD_NAME`: Cloudinary account identifier.
* `CLOUDINARY_API_KEY`: Cloudinary API Key.
* `CLOUDINARY_API_SECRET`: Cloudinary API Secret.
* `CLIENT_URL`: The exact root URL of the deployed frontend (used to configure CORS).

The frontend requires the following variable at build time:
* `VITE_API_URL`: The exact root URL of the deployed backend API (e.g., `https://api.guru-tailoring.com/api`).

## 3. MongoDB Configuration
* **Production**: The server mandates the presence of `MONGO_URI` via a startup validation check. The backend will fatally crash if it is missing, intentionally preventing any silent fallback.
* **Local Development**: If running locally (`NODE_ENV !== 'production'`), the server safely falls back to `mongodb://127.0.0.1:27017/guru-tailoring` if `MONGO_URI` is omitted, preserving the existing development workflow.

## 4. Domains, CORS, and Cookies
* **Domain Arrangement**: The backend is configured to issue JWT auth cookies with `SameSite: 'strict'` and `Secure: true`. 
  * **Requirement**: Because of the `strict` policy, the frontend and backend **MUST** be hosted on the exact same root domain (e.g., `www.guru-tailoring.com` and `api.guru-tailoring.com`). If you host them on entirely different domains (e.g., `guru.vercel.app` and `guru.onrender.com`), the browser will drop the auth cookies and login will fail.
* **CORS**: The backend restricts cross-origin requests to the origin defined in `CLIENT_URL`.
* **HTTPS**: Production mandates HTTPS. The `Secure: true` flag ensures cookies are only transmitted over encrypted connections.

## 5. Single Page Application (SPA) Routing
The frontend is a React SPA built with Vite. The static hosting provider must be configured with a fallback/rewrite rule to redirect all missing paths (`404` errors) to `index.html`. Without this rule, users refreshing pages like `/admin/designs` or navigating directly to URLs will see host-level 404 errors.

## 6. Dependency Audit Remediation
The `npm audit` on the frontend flags 7 vulnerabilities (e.g., `braces`, `postcss-selector-parser`). 
* **Impact**: These are exclusively dev-dependency vulnerabilities within the `tailwindcss` build chain. They pose **zero** runtime risk to visitors since they only execute during CSS compilation.
* **Remediation**: Do NOT run `npm audit fix --force`, as it will introduce a breaking update (Tailwind v4). Instead, manually specify overrides in `package.json` for the affected sub-dependencies if a clean audit is strictly required by CI policies, or simply suppress moderate build-time warnings.

## 7. Deployment Checklist
- [ ] 1. Provision a MongoDB Atlas cluster and acquire the connection string.
- [ ] 2. Provision Cloudinary credentials for image storage.
- [ ] 3. Generate a secure `JWT_SECRET`.
- [ ] 4. Determine domain names for frontend and backend (ensure they share a root domain).
- [ ] 5. Configure the backend host with the environment variables and start command.
- [ ] 6. Configure the frontend host with `VITE_API_URL`, the build command, and SPA fallback rewrites.
- [ ] 7. Deploy both services.
- [ ] 8. Execute a manual browser test: log in to the admin panel to verify cookies are accepted.
