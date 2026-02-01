# gym-backend

Minimal Node.js + TypeScript + Drizzle ORM + Postgres boilerplate.

Quick start

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.

2. Install dependencies:

```bash
npm install
```

3. Run in development:

```bash
npm run dev
```

4. Drizzle kit (migrations):

```bash
npm run db:generate   # generate migration
npm run db:push       # apply migrations
```

Files of interest

- `db/index.ts` — PG pool + Drizzle initialization
- `db/schema.ts` — Drizzle schema definitions
- `db/queries.ts` — example queries
