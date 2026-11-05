# ARC Global – Setup (Node + Express + MongoDB Atlas + Railway + GitHub Pages)

Architecture: static site + `/admin/` on GitHub Pages → REST API in `backend/` on Railway → MongoDB Atlas. Images → Cloudinary. Resume PDFs → MongoDB (private, admin-only download).

## 1. MongoDB Atlas
Create a free M0 cluster → Database Access: create a user → Network Access: allow `0.0.0.0/0` (Railway IPs change) → Connect → Drivers → copy the `mongodb+srv://` string into `MONGODB_URI` (add a database name such as `/arc`).

## 2. Cloudinary (image uploads)
Free account at cloudinary.com → Dashboard shows Cloud name, API key, API secret → `CLOUDINARY_*`. Without these, everything works except image upload (the API answers 503 with a clear message).

## 3. Environment variables (`backend/.env.example`)
| Variable | Where from |
|---|---|
| `MONGODB_URI` | Atlas (step 1) |
| `JWT_SECRET` | generate: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `ALLOWED_ORIGINS` | `https://achillesracingclub.com,https://www.achillesracingclub.com` |
| `COOKIE_DOMAIN` | `.achillesracingclub.com` if the API is on `api.achillesracingclub.com` (recommended) |
| `CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET` | Cloudinary (step 2) |
| `NODE_ENV` | `production` |
`PORT` is set by Railway.

## 4. Deploy the API on Railway
New project → Deploy from GitHub repo → set **Root Directory** to `backend` → add the variables → deploy. Health check: `https://<your-app>.up.railway.app/health`.
**Strongly recommended:** add a custom domain `api.achillesracingclub.com` to the Railway service (CNAME at your DNS). The admin login uses a cookie; if the API stays on `railway.app`, browsers that block third-party cookies (Safari, some Chrome settings) will refuse the login. Same-site `api.` subdomain avoids this.

## 5. Create your admin (no default credentials exist)
Locally or in the Railway shell, with `MONGODB_URI` set:
`ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a-long-passphrase-12+' npm run create-admin`
Running it again with the same email resets that password.

## 6. Connect the site
Edit **one file**, `config/config.js`: `window.ARC_CONFIG={apiUrl:'https://api.achillesracingclub.com'};` → push the repo to GitHub Pages (keep `CNAME`). Leave `apiUrl:''` and the site simply runs on its built-in content.

## 7. First use
Open `/admin/` → sign in → Content → **Import current site content** (copies vehicles, parts, programmes, events, team, gallery and text into the database; never overwrites existing edits). Then edit any section and Save: it is live on next page load. Contact/custom forms save enquiries; the career form saves the application and PDF.

## Testing
`cd backend && npm install && npm test` (needs internet once to fetch an in-memory MongoDB). Manual: wrong password rejected; `/admin/dashboard.html` when logged out redirects to login; submit each form and see it in Admin; stop the API and confirm the public site still renders.

## Backup
Atlas → Backup (M0 has none; use `mongodump --uri "$MONGODB_URI"` regularly) and Cloudinary's media library.

## API summary
Public: `GET /api/site/content`, `POST /api/enquiries`, `POST /api/careers` (multipart, field `resume`), `GET /health`.
Auth: `POST /api/admin/auth/login|logout`, `GET /api/admin/auth/me`.
Admin (cookie + `X-ARC-CSRF: 1`): `GET /api/admin/stats`; `GET|PUT /api/admin/content[/:key]`, `POST /api/admin/content/import`; `GET /api/admin/enquiries[?q&type&status&from&to&page]`, `GET /enquiries/export.csv`, `GET|PUT|DELETE /enquiries/:id`; `GET /applications`, `PUT|DELETE /applications/:id`, `GET /applications/:id/resume`; `GET|POST /media`, `DELETE /media/:id`.
Payments: the four Razorpay Pages links are untouched; no payment backend was added.
