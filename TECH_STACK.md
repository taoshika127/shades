# Pacific Light Shades — Tech Stack

Reference for architecture, services, accounts, and environment configuration.

## Overview

| Layer | Technology | Hosting / service |
|-------|------------|-------------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS | [Vercel](https://vercel.com) |
| Backend API | Node.js, Express, TypeScript | [Railway](https://railway.app) |
| Database | SQLite (`better-sqlite3`) | File on Railway volume / local `backend/data/` |
| Transactional email | [Resend](https://resend.com) API | Resend (not Gmail SMTP) |
| Analytics | Vercel Analytics | Vercel |

---

## Frontend

- **Framework:** React 18 with TypeScript
- **Build:** Vite 5
- **Routing:** React Router v6
- **Styling:** Tailwind CSS 3 (custom palette: `primary`, `brown`, `base`, etc. in `frontend/tailwind.config.js`)
- **Icons:** `react-icons`
- **Analytics:** `@vercel/analytics` (mounted in `frontend/src/App.tsx`)

**Local dev:** `http://localhost:3000` (proxies `/api` to backend per Vite config)

**Deploy:** See `frontend/DEPLOY_VERCEL.md`

---

## Backend

- **Runtime:** Node.js
- **Framework:** Express 4
- **Language:** TypeScript (compiled to `backend/dist/`)
- **Database:** SQLite via `better-sqlite3` — `backend/data/categories.db`
- **File uploads:** Multer (contact form attachments, quote photos)
- **Config:** `dotenv` — `backend/.env` (not committed)

**Local dev:** `http://localhost:5001` (port 5001 avoids macOS AirPlay on 5000)

**Deploy:** See `backend/DEPLOY_RAILWAY.md`

### Main API surface

- Categories, products, gallery, inspirations
- `POST /api/contact` — contact form + optional attachments
- `POST /api/consultation` — schedule consultation
- `POST /api/quote` — multi-step quote (with optional file uploads)

---

## Email (Resend)

Form submissions are sent through the **Resend** HTTP API (`resend` npm package), implemented in `backend/src/emailService.ts`. The app does **not** send mail via Gmail SMTP directly.

### Accounts & addresses

| What | Value / notes |
|------|----------------|
| **Resend dashboard login** | Google account: **taoshika127@gmail.com** |
| **Business inbox (recipient)** | `info@pacificlightshades.com` (default `CONTACT_EMAIL`) |
| **Sender (“From”)** | Configured in `RESEND_FROM_EMAIL` (e.g. `info@` or `noreply@pacificlightshades.com` on verified domain) |
| **Resend test sender (fallback)** | `onboarding@resend.dev` if `RESEND_FROM_EMAIL` is unset |

Customer emails use **Reply-To** set to the submitter’s address so replies go to the customer, not to Resend.

### Environment variables (backend)

```env
RESEND_API_KEY=re_...          # From Resend dashboard (API Keys)
RESEND_FROM_EMAIL=...          # Must be from a domain verified in Resend
CONTACT_EMAIL=info@pacificlightshades.com
BUSINESS_EMAIL=...             # Optional; quote confirmations; defaults to RESEND_FROM_EMAIL
```

### Email flows

1. **Contact** — notification to `CONTACT_EMAIL`; `reply_to` = customer email  
2. **Consultation** — same pattern  
3. **Quote** — notification to business + optional **confirmation** to customer (`BUSINESS_EMAIL` / `RESEND_FROM_EMAIL`)

**Setup details:** `backend/EMAIL_SETUP.md`

---

## Brand / UI typography (site)

| Use | Font stack |
|-----|------------|
| Nav labels, section titles (e.g. Browse The Range) | **Fjalla One** (Google Fonts) |
| Body, forms, footer links | **Gotham** / **Gotham A** (with system fallbacks) |
| Header wordmark “PACIFIC LIGHT” | **Avenir Next** → Avenir → Helvetica Neue |
| Logo tagline “SHADES · DRAPERIES · BLINDS” | Gotham |
| Footer / some pages | Raster logo: `pacific_light_transparent.png` |

**Brand colors (Tailwind):**

- `text-brown` / `border-brown`: `#71482D`
- `text-primary` / `border-primary`: `#B38F6F`
- `bg-base`: `#F4EFE8`

---

## Repository layout

```
PacificLight/
├── frontend/          # React app (Vercel)
├── backend/           # Express API (Railway)
├── TECH_STACK.md      # This file
├── README.md
├── SERVER_SETUP.md
├── backend/EMAIL_SETUP.md
├── backend/DEPLOY_RAILWAY.md
└── frontend/DEPLOY_VERCEL.md
```

---

## Related docs

- **Local run:** `SERVER_SETUP.md`, root `README.md`
- **Email:** `backend/EMAIL_SETUP.md`
- **Deploy backend:** `backend/DEPLOY_RAILWAY.md`
- **Deploy frontend:** `frontend/DEPLOY_VERCEL.md`
- **Categories API:** `backend/CATEGORIES_API.md`

---

## Security notes

- Never commit `backend/.env` or Resend API keys to git.
- Rotate `RESEND_API_KEY` in the Resend dashboard if exposed.
- `taoshika127@gmail.com` is the **Resend account** login only; production “From” addresses should use **verified** `@pacificlightshades.com` addresses when the domain is verified in Resend.
