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

The frontend uses the following variables at build time:
* `VITE_API_URL`: Path to the API. When using the Vercel API proxy (default), set to `/api` or leave unset (Vite defaults to `/api` in production). If using a direct backend subdomain on a shared custom domain, provide `https://api.guru-tailoring.com/api`.
* `VITE_SOCKET_URL` (optional): URL of the Socket.IO server. In production, if unset, Socket.IO polling on Vercel is disabled to prevent proxy errors, while administrative notifications continue to load reliably via the REST API (`/api/notifications`).

## 3. MongoDB Configuration
* **Production**: The server mandates the presence of `MONGO_URI` via a startup validation check. The backend will fatally crash if it is missing, intentionally preventing any silent fallback.
* **Local Development**: If running locally (`NODE_ENV !== 'production'`), the server safely falls back to `mongodb://127.0.0.1:27017/guru-tailoring` if `MONGO_URI` is omitted, preserving the existing development workflow.

## 4. Domains, CORS, and Cookies
* **Authentication & Cookie Architecture**: The backend issues JWT authentication cookies with:
  * `httpOnly: true` (inaccessible to browser JavaScript, mitigating XSS risks)
  * `secure: process.env.NODE_ENV === 'production'` (only transmitted over HTTPS)
  * `sameSite: 'strict'` (cookies are never sent in cross-site contexts, mitigating CSRF)
  * `path: '/'`
* **Vercel API Proxy**: Because the frontend (`https://tailoring-shop-sooty.vercel.app`) and backend (`https://tailoring-shop-6d03.onrender.com`) are on different public domains, cross-site requests drop `SameSite=Strict` cookies. To resolve this without weakening cookie security, Vercel is configured in `client/vercel.json` to proxy `/api/*` requests to the Render backend:
  ```json
  {
    "rewrites": [
      {
        "source": "/api/:path*",
        "destination": "https://tailoring-shop-6d03.onrender.com/api/:path*"
      },
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ]
  }
  ```
  With this rewrite:
  - From the browser's perspective, all API requests are same-origin (`/api/...`).
  - The browser retains and sends the `jwt` cookie with `SameSite=Strict`.
  - Vercel forwards the headers to Render and returns response headers (including `Set-Cookie`).
  - No cookie attributes need to be weakened (no `SameSite=None` required).
* **CORS**: The backend restricts cross-origin requests to configured production origins via `CLIENT_URL` and permitted preview regex patterns in `server/src/config/cors.js`. Requests made through Vercel's proxy either include the frontend `Origin` header (handled by the allowlist) or have no browser `Origin` header for direct proxy forwards.
* **Real-Time WebSockets (Socket.IO)**: Vercel serverless does not proxy persistent WebSocket handshakes. The application handles this by loading notifications via REST `/api/notifications`, while optionally accepting `VITE_SOCKET_URL` for environments with dedicated WebSocket routing.

## 5. Single Page Application (SPA) Routing
The frontend is a React SPA built with Vite. `client/vercel.json` defines rewrites so that `/api/:path*` is proxied to Render first, and all remaining paths fallback to `/index.html`. This ensures page refreshes (e.g. `/admin/dashboard`, `/admin/enquiries`) resolve seamlessly.

## 6. Dependency Audit Remediation
The `npm audit` on the frontend flags 7 vulnerabilities (e.g., `braces`, `postcss-selector-parser`). 
* **Impact**: These are exclusively dev-dependency vulnerabilities within the `tailwindcss` build chain. They pose **zero** runtime risk to visitors since they only execute during CSS compilation.
* **Remediation**: Do NOT run `npm audit fix --force`, as it will introduce a breaking update (Tailwind v4). Instead, manually specify overrides in `package.json` for the affected sub-dependencies if a clean audit is strictly required by CI policies, or simply suppress moderate build-time warnings.

## 7. Deployment Checklist
- [ ] 1. Provision a MongoDB Atlas cluster and acquire the connection string.
- [ ] 2. Provision Cloudinary credentials for image storage.
- [ ] 3. Generate a secure `JWT_SECRET`.
- [ ] 4. Configure the Render backend with environment variables (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL=https://tailoring-shop-sooty.vercel.app`, Cloudinary keys) and start command `npm start`.
- [ ] 5. Configure the Vercel frontend:
  - Ensure `client/vercel.json` contains the `/api/:path*` rewrite to Render and SPA fallback.
  - Set `VITE_API_URL=/api` (or remove the variable so production defaults to `/api`).
  - Build command: `npm run build`, output directory: `dist`.
- [ ] 6. Deploy both services.
- [ ] 7. Execute manual verification:
  - Open `https://tailoring-shop-sooty.vercel.app/admin/login`.
  - Log in with admin credentials.
  - Verify `POST /api/auth/login` sets the `jwt` cookie.
  - Verify protected dashboard requests (`/api/notifications`, `/api/admin/dashboard`) return `200 OK`.
  - Refresh the browser on `/admin/dashboard` to verify session persistence.
