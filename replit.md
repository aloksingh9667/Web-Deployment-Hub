# Avviare Educational Hub (AEH) — Full-Stack Website

## Project Overview

A complete multi-page educational institution website for Avviare Educational Hub (Bilaspur, Chhattisgarh). Includes all public pages, 9 school pages, placement pages, forms, a JWT-protected admin panel, and a full student portal with Razorpay fee payment and college-format receipts.

## Architecture

This is a **pnpm monorepo** with two main deployable artifacts:

- **Frontend** (`artifacts/aeh-website`): React + Vite + Tailwind CSS  
  → Deployed via **Cloudflare Pages** (`https://github.com/aloksingh9667/aeh-frontend`)
  
- **Backend** (`artifacts/api-server`): Node.js + Express + Drizzle ORM  
  → Deployed via **Render** (`https://github.com/aloksingh9667/aeh-backend`)

### Shared Packages

- `lib/db` — Drizzle ORM schema and database client
- `lib/api-spec` — OpenAPI 3.0 specification
- `lib/api-client-react` — Auto-generated React Query hooks (from OpenAPI spec)
- `lib/api-zod` — Auto-generated Zod validation schemas

## Frontend Pages

### Public Pages
- `/` — Home (hero, stats, programs grid redesigned with brand-consistent navy/gold style, dynamic events from API, admission CTA)
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

### Student Portal (JWT protected)
- `/student/login` — Student login
- `/student/register` — Student registration
- `/student/dashboard` — Student dashboard with course info
- `/student/fees` — Fee payment (Razorpay Checkout in test mode)
- `/student/receipts` — College-format receipts with View/Print/Download

## Backend API Endpoints

Base path: `/api`

- `GET /healthz` — Health check
- `POST /auth/login` — JWT admin login
- `GET /auth/me` — Get current admin (requires Bearer token)
- `GET/POST /applications` — List/Create admission applications
- `PATCH /applications/:id/status` — Update application status
- `GET/POST /contacts` — List/Create contact inquiries
- `GET/POST /careers` — List/Create career applications
- `GET /stats/dashboard` — Dashboard statistics
- `GET /courses` — List courses
- `GET /fee-structures` — Get fee structures (optionally filtered by courseCode)
- `POST /student/auth/register` — Student registration
- `POST /student/auth/login` — Student login
- `GET /student/auth/me` — Get current student
- `GET /students` — List students (admin only)
- `POST /payments/create-order` — Create Razorpay order (student auth)
- `POST /payments/verify` — Verify Razorpay payment signature
- `GET /payments/my-payments` — Student's payment history
- `GET /payments` — All payments (admin only)

## Database (PostgreSQL)

Tables:
- `admins` — Admin users with bcrypt passwords
- `applications` — Admission applications (status enum)
- `contacts` — Contact form submissions
- `careers` — Career applications
- `students` — Student accounts (enum: active/inactive/graduated/suspended)
- `courses` — Available courses/programs
- `fee_structures` — Fee structure per course + payment plan
- `fee_payments` — Payment records with Razorpay IDs and receipt numbers

Default seeded admin users:
- `admin` / `admin123`
- `admissions` / `admissions123`

## Razorpay Integration

- Test mode keys set: `rzp_test_SeZoyMeUuq0m2d` (test mode)
- Flow: Create order (backend) → Razorpay Checkout JS (frontend) → Verify signature (backend)
- Receipt number format: `AEH{YY}{MM}{5-digit-random}`
- Test card: 4111 1111 1111 1111, any future expiry, any CVV

## Design Theme

- **Primary**: Navy blue `hsl(219, 40%, 16%)`
- **Accent**: Gold `hsl(43, 96%, 55%)`
- **Font**: Inter (sans-serif) + Merriweather (serif)

## Environment Variables

### API Server (Render)
- `DATABASE_URL` — PostgreSQL connection string
- `SESSION_SECRET` — JWT signing secret
- `JWT_SECRET` — Admin JWT secret
- `STUDENT_JWT_SECRET` — Student JWT secret
- `RAZORPAY_KEY_ID` — Razorpay key ID (test: `rzp_test_*`)
- `RAZORPAY_KEY_SECRET` — Razorpay secret key
- `ALLOWED_ORIGINS` — CORS allowed origins (comma-separated)
- `PORT` — Server port (managed by platform)
- `NODE_ENV` — `production`

### Frontend (Cloudflare Pages)
- `VITE_API_URL` — API base URL (your Render backend URL + /api)

## GitHub Repos (Production Deployment)

| Repo | URL | Platform |
|------|-----|----------|
| Frontend | https://github.com/aloksingh9667/aeh-frontend | Cloudflare Pages |
| Backend | https://github.com/aloksingh9667/aeh-backend | Render |

## Deployment Configuration

### Render (Backend)
- Build: `npm install -g pnpm && pnpm install && pnpm build`
- Start: `node packages/api-server/dist/index.mjs`
- Config: `render.yaml` in backend repo

### Cloudflare Pages (Frontend)
- Build: `npm install -g pnpm && pnpm install && pnpm build`
- Output dir: `packages/aeh-website/dist`
- SPA routing: `_redirects` file: `/* /index.html 200`
