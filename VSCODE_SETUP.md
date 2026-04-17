# AEH — VSCode Local Development Setup

## Prerequisites

Install these before starting:
- [Node.js](https://nodejs.org/) v18+ (LTS recommended)
- [pnpm](https://pnpm.io/installation) — `npm install -g pnpm`
- [PostgreSQL](https://www.postgresql.org/download/) — OR use a free [Neon](https://neon.tech) cloud database

---

## 1. Clone & Install Dependencies

```bash
git clone <your-repo-url>
cd <project-folder>
pnpm install
```

---

## 2. Set Up Environment Variables

### API Server
```bash
cp artifacts/api-server/.env.example artifacts/api-server/.env
```
Open `artifacts/api-server/.env` and fill in:

| Variable | Value |
|---|---|
| `PORT` | `8080` |
| `NODE_ENV` | `development` |
| `NEON_DATABASE_URL` | Your Neon connection string (or leave blank to use local DB) |
| `DATABASE_URL` | `postgresql://postgres:password@localhost:5432/aeh_db` |
| `JWT_SECRET` | Any long random string |
| `RAZORPAY_KEY_ID` | From [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys) |
| `RAZORPAY_KEY_SECRET` | From Razorpay Dashboard |

### Frontend (Vite)
```bash
cp artifacts/aeh-website/.env.example artifacts/aeh-website/.env.local
```
The defaults in `.env.local` work for local dev — no changes needed unless you want a custom port.

---

## 3. Set Up PostgreSQL Database

### Option A: Neon (Recommended — Free Cloud DB)
1. Create account at [neon.tech](https://neon.tech)
2. Create a new project → copy the connection string
3. Set it as `NEON_DATABASE_URL` in `artifacts/api-server/.env`
4. The app auto-creates all tables on first run

### Option B: Local PostgreSQL
```bash
# Create the database
psql -U postgres -c "CREATE DATABASE aeh_db;"
```
Set `DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/aeh_db`

---

## 4. Run the Application

Open **two terminals** in VSCode:

### Terminal 1 — API Server
```bash
PORT=8080 pnpm --filter @workspace/api-server run dev
```
The server starts at **http://localhost:8080**. On first run it seeds all default data automatically.

### Terminal 2 — Frontend
```bash
PORT=21165 BASE_PATH=/ pnpm --filter @workspace/aeh-website run dev
```
The website opens at **http://localhost:21165**

---

## 5. VSCode Recommended Extensions

Install these from the Extensions panel (`Ctrl+Shift+X`):

- **ESLint** — `dbaeumer.vscode-eslint`
- **Prettier** — `esbenp.prettier-vscode`
- **Tailwind CSS IntelliSense** — `bradlc.vscode-tailwindcss`
- **TypeScript** — built-in
- **PostgreSQL** — `ckolkman.vscode-postgres` (optional)

---

## 6. Default Login Credentials

After first run, the database is seeded with:

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| Admissions | `admissions` | `admissions123` |

For student accounts — register at `/student/register`.

---

## 7. Create New Admin Account

Go to `/admin/login` → Click "Create New Admin Account"
- Secret Key: `Abcd1234`
- OTP: `123456`

---

## 8. Razorpay Test Mode

Use test card numbers from [Razorpay docs](https://razorpay.com/docs/payments/payments/test-card-details/):
- Card: `4111 1111 1111 1111`
- Expiry: any future date
- CVV: any 3 digits
- OTP: `1234`

---

## Project Structure

```
/
├── artifacts/
│   ├── aeh-website/       # React + Vite frontend
│   │   └── src/
│   │       ├── pages/     # All page components
│   │       └── components/ # Shared components (Navbar, Footer)
│   └── api-server/        # Express API backend
│       └── src/
│           ├── routes/    # API routes
│           └── lib/       # Auth, seed, logger
├── lib/
│   └── db/
│       └── src/
│           └── schema/    # Drizzle ORM schema files
└── pnpm-workspace.yaml
```
