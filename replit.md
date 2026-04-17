# Avviare Educational Hub (AEH) — Full-Stack Website

## Project Overview

A complete multi-page educational institution website for Avviare Educational Hub (Bilaspur, Chhattisgarh). Includes all public pages, 9 school pages, placement pages, forms, and a protected admin panel.

## Architecture

This is a **pnpm monorepo** with two main deployable artifacts:

- **Frontend** (`artifacts/aeh-website`): React + Vite + Tailwind CSS  
  → Deployable on **Netlify** (static hosting)
  
- **Backend** (`artifacts/api-server`): Node.js + Express + Drizzle ORM  
  → Deployable on **Render** (Node.js service)

### Shared Packages

- `lib/db` — Drizzle ORM schema and database client
- `lib/api-spec` — OpenAPI 3.0 specification
- `lib/api-client-react` — Auto-generated React Query hooks (from OpenAPI spec)
- `lib/api-zod` — Auto-generated Zod validation schemas

## Frontend Pages

### Public Pages
- `/` — Home (hero, stats, programs grid, news, admission CTA)
- `/about` — About (story, milestones, quick facts)
- `/core-values` — Core Values (Integrity, Excellence, Compassion, Innovation)
- `/leadership` — Leadership (Chairman, Principal, Director messages)
- `/academic-council` — Academic Council (12 members)
- `/team` — Faculty by department
- `/infrastructure` — Campus facilities
- `/placements` — Placement stats + placed students
- `/top-recruiters` — 30+ recruiting companies
- `/news` — News & events grid
- `/gallery` — Photo gallery sections
- `/apply` — Online admission application form (with validation)
- `/contact` — Contact form
- `/careers` — Work culture + career application form

### School Pages (9 Schools)
- `/school-of-management` — BBA, MBA
- `/school-of-cs-it` — BCA, MCA
- `/school-of-commerce` — B.Com, M.Com
- `/school-of-humanities` — BA, MA
- `/school-of-communication` — DJMC, BJMC, MJMC
- `/school-of-law` — BA LL.B, LL.M
- `/school-of-pharmacy` — B.Pharm, D.Pharm
- `/school-of-applied-science` — B.Sc, M.Sc
- `/school-of-education` — B.Ed, M.Ed

### Admin Panel (JWT protected)
- `/admin/login` — Admin login (JWT validation via backend)
- `/admin` — Dashboard (stats, recent applications, inquiries)
- `/admin/applications` — Manage admissions applications (search, filter, status update)
- `/admin/contacts` — View contact inquiries
- `/admin/careers` — View career applications

## Backend API Endpoints

Base path: `/api`

- `GET /healthz` — Health check
- `POST /auth/login` — JWT login
- `GET /auth/me` — Get current user (requires Bearer token)
- `GET/POST /applications` — List/Create admission applications
- `PATCH /applications/:id/status` — Update application status
- `GET/POST /contacts` — List/Create contact inquiries
- `GET/POST /careers` — List/Create career applications
- `GET /stats/dashboard` — Dashboard statistics

## Database (PostgreSQL)

Tables:
- `admins` — Admin users with bcrypt passwords
- `applications` — Admission applications (status enum: pending/reviewed/accepted/rejected)
- `contacts` — Contact form submissions
- `careers` — Career applications

Default seeded admin users:
- `admin` / `admin123`
- `admissions` / `admissions123`

## Design Theme

- **Primary**: Navy blue `hsl(219, 40%, 16%)`
- **Accent**: Gold `hsl(43, 96%, 55%)`
- **Font**: Inter (sans-serif) + Merriweather (serif)

## Environment Variables

### API Server
- `DATABASE_URL` — PostgreSQL connection string (Replit managed)
- `SESSION_SECRET` — JWT signing secret
- `ALLOWED_ORIGINS` — CORS allowed origins (comma-separated)
- `PORT` — Server port (managed by Replit)

### Frontend
- `VITE_API_URL` — (Optional) API base URL. Leave empty for same-origin deployment.
- `PORT` — Server port (managed by Replit)
- `BASE_PATH` — URL base path (managed by Replit)

## Deployment Notes

For **separate deployment** (Netlify frontend + Render backend):
1. Deploy API server to Render — set `ALLOWED_ORIGINS` to your Netlify URL
2. Deploy frontend to Netlify — set `VITE_API_URL` to your Render URL
3. Add `_redirects` file for SPA routing on Netlify: `/* /index.html 200`
