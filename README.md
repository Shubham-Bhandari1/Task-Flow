# 🔺 Pyramid — Task Management System

[![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

> A full-stack task management application with Kanban boards, list views, subtasks, comments, projects, and a fully persisted light/dark + accent color theme system.

🔗 **Live Demo**: [pyramid-tasks.vercel.app](https://task-flow-rust-five.vercel.app) · Click **Continue as Guest** to explore.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Guest Authentication** | One-click guest login with JWT — no signup required |
| **Kanban Board** | Drag-free board with 4 status columns (To Do, Doing, Completed, On Hold) |
| **List View** | Tabular view with customizable columns via field selector |
| **Task Details** | Inline-editable title, description, status, priority, assignee, labels, due date, reporter |
| **Subtasks** | Nested checklist within each task — add, toggle, track completion |
| **Comments** | Threaded comment system with author avatars and timestamps |
| **Projects** | Project grouping with custom color badges |
| **Search & Filter** | Client-side search + multi-criteria filter panel (status, priority, due date, labels, assignee) |
| **Theme System** | Light/Dark mode with 6 accent colors (Blue, Amber, Pink, Rose, Emerald, Black) |
| **Anti-FOUC** | Inline head script reads persisted theme before first paint — zero flash |
| **Responsive** | Mobile-first layout with collapsible sidebar drawer |
| **Toast Notifications** | Contextual success/error/info feedback on all operations |
| **Skeleton Loading** | Animated placeholders during data fetches |
| **Accessibility** | Focus-visible outlines, ARIA attributes, keyboard navigation, reduced-motion support |
| **Optimistic UI** | Instant updates with automatic rollback on API failure |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│  Next.js 14 App Router · React 18 · TypeScript          │
│  Tailwind CSS · CSS Variable Theming · Lucide Icons      │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS (REST)
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   API Server (:4000)                     │
│  NestJS 10 · Passport JWT · ValidationPipe               │
│  Global prefix: /api · CORS · Helmet · Rate Limiting     │
└────────────────────────┬────────────────────────────────┘
                         │ TypeORM
                         ▼
┌─────────────────────────────────────────────────────────┐
│                PostgreSQL 16 (Alpine)                    │
│  Tables: users · tasks · projects · comments             │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
pyramid/
├── backend/                    NestJS REST API
│   ├── src/
│   │   ├── auth/               JWT guest auth (controller, service, guards, strategy)
│   │   ├── users/              User entity & service (guest creation)
│   │   ├── tasks/              Task CRUD (controller, service, DTOs, entity)
│   │   ├── projects/           Project CRUD (controller, service, DTO, entity)
│   │   ├── comments/           Comment thread (controller, service, DTO, entity)
│   │   ├── health/             Health check endpoint
│   │   ├── common/             Shared filters (HttpExceptionFilter)
│   │   ├── database/           Seed script for demo data
│   │   ├── app.module.ts       Root module (TypeORM, Throttler, feature modules)
│   │   └── main.ts             Bootstrap (CORS, Helmet, compression, validation)
│   ├── docker-compose.yml      PostgreSQL 16 container
│   ├── Procfile                Render/Railway deployment
│   └── .env.example            Environment variable reference
│
├── frontend/                   Next.js 14 App Router
│   ├── app/
│   │   ├── layout.tsx          Root layout (providers, anti-FOUC script)
│   │   ├── page.tsx            Entry redirect (auth check)
│   │   ├── login/              Guest login page
│   │   ├── tasks/              Task dashboard (board + list) & task detail [id]
│   │   ├── projects/           Project overview & creation
│   │   └── profile/            Profile & theme settings
│   ├── components/
│   │   ├── layout/             AppLayout, Sidebar, Header, ThemeSwitcher, WorkspaceMenu
│   │   ├── tasks/              TaskBoard, TaskCard, TaskColumn, TaskList, TaskForm,
│   │   │                       TaskFilters, FieldSelector, PrioritySelector
│   │   ├── settings/           SettingsSidebar, SettingsRow
│   │   └── ui/                 Avatar, Button, Checkbox, DropdownMenu, ErrorBoundary,
│   │                           Input, Logo, Modal, Select, Skeleton, Toast, Toggle
│   ├── context/                AuthContext, ThemeContext, ToastContext
│   ├── lib/                    API client, types, useTasks hook, utilities
│   └── tailwind.config.ts      CSS-variable color system
│
├── .gitignore
└── README.md
```

---

## 🚀 Run Locally

### Prerequisites

- **Node.js** ≥ 18
- **Docker** (for PostgreSQL) or a local Postgres instance
- **npm** (included with Node.js)

### 1. Start the Database

```bash
cd backend
docker compose up -d
```

### 2. Start the Backend API

```bash
cd backend
cp .env.example .env        # Update JWT_SECRET for production
npm install
npm run start:dev           # http://localhost:4000/api
```

**Optional**: Seed sample data for a quick demo:

```bash
npm run seed
```

### 3. Start the Frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev                 # http://localhost:3000
```

### 4. Open & Explore

Navigate to `http://localhost:3000` and click **Continue as Guest**.

---

## 📡 API Reference

All endpoints are prefixed with `/api`. Protected routes require `Authorization: Bearer <token>`.

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/guest` | Public | Create guest account, receive JWT |
| `GET` | `/auth/me` | Bearer | Get current user profile |

### Tasks

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/tasks` | Bearer | Create a new task |
| `GET` | `/tasks` | Bearer | List tasks (optional: `?status=`, `?priority=`, `?search=`) |
| `GET` | `/tasks/summary` | Bearer | Get task count summary by status |
| `GET` | `/tasks/:id` | Bearer | Get task details |
| `PATCH` | `/tasks/:id` | Bearer | Update task (partial) |
| `PATCH` | `/tasks/:id/status` | Bearer | Update task status only |
| `PATCH` | `/tasks/:id/priority` | Bearer | Update task priority only |
| `DELETE` | `/tasks/:id` | Bearer | Delete task |

### Projects

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/projects` | Bearer | List user's projects |
| `POST` | `/projects` | Bearer | Create a project (`{ name, color? }`) |

### Comments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/tasks/:taskId/comments` | Bearer | List comments for a task |
| `POST` | `/tasks/:taskId/comments` | Bearer | Add a comment (`{ body }`) |

### Health

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | Public | Server health check |

---

## 🎨 Design Decisions

Built from the Figma file plus provided screenshots. Intentional decisions and gaps:

- **Guest-first auth**: Google login button is shown but disabled — guest login is the assessed flow. The login copy matches the Figma frame even though that frame has no email/password fields.
- **No drag-and-drop**: Status changes are handled via dropdown selectors. The `PATCH /tasks/:id/status` endpoint exists for programmatic updates. This keeps the implementation focused and accessible.
- **Theme sidebar**: Uses working Light/Dark mode toggle + 6 accent colors with persisted preferences, rather than the unlabeled placeholder swatches in the Figma.
- **Subtasks as JSON**: Stored as `simple-json` in the task row rather than a separate table — appropriate for the assessment scope while keeping the API clean.
- **No teams or activity history**: Comments and subtasks are fully backed by the API; team management and activity feeds are out of scope.
- **Monochrome design system**: All structural colors (backgrounds, text, borders) are strictly black/white/gray. Only the accent system and danger red introduce color, exactly matching the Figma reference.

---

## 🌐 Deployment

### Backend (Render / Railway / Fly.io)

1. Connect your GitHub repo
2. Set build command: `cd backend && npm install && npm run build`
3. Set start command: `cd backend && node dist/main.js`
4. Add environment variables:
   - `DATABASE_URL` — provided by Render Postgres
   - `JWT_SECRET` — a long random string
   - `CORS_ORIGIN` — your Vercel frontend URL
   - `PORT` — usually auto-set by the platform

### Frontend (Vercel)

1. Import your GitHub repo
2. Set root directory to `frontend`
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` — your deployed backend URL (e.g., `https://your-api.onrender.com/api`)

---

## 🛡️ Security & Production Considerations

- **Rate limiting**: 100 requests/minute per IP via `@nestjs/throttler`
- **Security headers**: `helmet` middleware sets CSP, HSTS, X-Frame-Options, etc.
- **Response compression**: `compression` middleware for reduced payload sizes
- **Input validation**: Global `ValidationPipe` with `whitelist` and `forbidNonWhitelisted`
- **Error standardization**: Custom `HttpExceptionFilter` for consistent error responses
- **Data isolation**: Multi-tenant by `ownerId` — users can only access their own data
- **Token security**: JWT with configurable expiration (default 7 days)

---

## 📋 Tech Stack Summary

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 14 (App Router) |
| UI Library | React 18 |
| Language | TypeScript 5.5 |
| Styling | Tailwind CSS 3.4 + CSS Variables |
| Icons | Lucide React |
| Backend Framework | NestJS 10 |
| ORM | TypeORM 0.3 |
| Database | PostgreSQL 16 |
| Auth | Passport JWT |
| Validation | class-validator + class-transformer |
| Security | Helmet, Throttler |
