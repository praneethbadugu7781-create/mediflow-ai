# MediFlow AI

**Intelligent Medical Distribution Management System** — A premium, AI-powered SaaS platform for healthcare distributors.

![MediFlow AI](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## Features

| Module | Description |
|--------|-------------|
| **Authentication** | Role-based login (Owner, Accountant, Delivery Staff, Sales) |
| **Dashboard** | Revenue, profit, payments, charts, quick actions |
| **Expenses** | Categories, filtering, analytics, export |
| **AI Bill Scanner** | OCR extraction of amount, GST, vendor, category |
| **Hospitals** | CRM, payment history, profiles |
| **Products & Deliveries** | Distribution tracking with timeline UI |
| **Inventory** | Stock alerts, batch numbers, expiry |
| **Invoices & Quotations** | GST calculations, PDF download |
| **Payments** | Overdue alerts, status tracking |
| **Reports & GST** | Analytics, Tally-ready exports |
| **Notifications & Settings** | Alerts, company profile, users |

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4, ShadCN-style UI, Framer Motion, Recharts
- **Backend:** Express.js API (`/server`)
- **Database:** Prisma ORM (SQLite dev / PostgreSQL production)
- **Auth:** JWT-ready (demo localStorage auth included)
- **PDF:** jsPDF + jspdf-autotable
- **AI OCR:** Next.js API route (Google Vision ready)

## Quick Start

```bash
# Install dependencies
npm install

# Setup database
cp .env.example .env
npm run db:push
npm run db:generate

# Run frontend (port 3000)
npm run dev

# Run Express API (port 4000) - optional
npm run server

# Run both together
npm run dev:all
```

Open [http://localhost:3000/login](http://localhost:3000/login)

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Owner/Admin | owner@mediflow.ai | demo123 |
| Accountant | accountant@mediflow.ai | demo123 |
| Delivery Staff | delivery@mediflow.ai | demo123 |

## Design System

| Token | Value |
|-------|-------|
| Primary | `#2563EB` |
| Secondary | `#0F172A` |
| Accent | `#14B8A6` |
| Background | `#F8FAFC` |
| Success | `#22C55E` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |

UI features: glassmorphism cards, soft shadows, smooth animations, responsive sidebar, premium charts.

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, signup, forgot password
│   ├── (dashboard)/     # All app modules
│   └── api/             # OCR, auth API routes
├── components/
│   ├── ui/              # Design system components
│   ├── layout/          # Sidebar, topbar, shell
│   ├── charts/          # Recharts visualizations
│   └── dashboard/       # Stat cards, widgets
├── contexts/            # Auth provider
└── lib/                 # Utils, types, PDF, mock data
server/                  # Express.js API
prisma/                  # Database schema
```

## Database Schema

See `prisma/schema.prisma` for full models:

- **User** (roles: Owner, Admin, Accountant, Delivery, Sales)
- **Hospital**, **Product**, **Inventory**
- **Expense**, **Delivery**, **Invoice**, **Quotation**, **Payment**
- **Notification**, **Company**

## Production Deployment

1. Set `DATABASE_URL` to PostgreSQL
2. Configure `JWT_SECRET` and Google Vision credentials for OCR
3. Run `npm run build && npm start`
4. Deploy Express API separately or migrate routes to Next.js API

## License

Private — MediFlow AI © 2026
