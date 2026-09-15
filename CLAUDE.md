# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React 19 + TypeScript SPA (Vite) with `json-server` as a mock backend, backed by `db.json`.

## Commands

Two processes are needed for local development:

```bash
npm run server   # json-server on db.json, port 4000 (API)
npm run dev      # Vite dev server, port 3000
```

The API base URL is read from `.env` → `VITE_API_URL`, consumed via `import.meta.env.VITE_API_URL`.

Other commands:

```bash
npm run build         # tsc -b && vite build
npm run lint           # eslint .
npm run format          # prettier --write "src/**/*.{ts,tsx,scss}"
npm run format:check    # prettier --check "src/**/*.{ts,tsx,scss}"
```

There is no test runner configured in this project.

## Architecture

- **Routing**: `src/routes/index.tsx` defines a single `createBrowserRouter` tree, all pages nested under a shared `<Layout />` (`src/components/layout/Layout.tsx`, wraps Header/Footer). Add new routes here and add the page under `src/pages/`.
- **Global state via React Context** (no external state library):
  - `AuthContext` (`src/contexts/AuthContext.tsx`) — login/register/logout against `/users` on the mock API, persists the current user (without password) to `localStorage` under `cat-energy-user`.
  - `CartContext` (`src/contexts/CartContext.tsx`) — cart items, persists to `localStorage` under `cat-energy-cart`, auto-syncs via `useEffect`.
  - Both providers wrap the app in `src/main.tsx` (`AuthProvider` > `CartProvider` > `RouterProvider`).
- **Data fetching**: `src/services/api.ts` exports a single `api` singleton (`ApiClient`) wrapping `fetch` with `get`/`post`/`put`/`delete`, prefixing every call with `VITE_API_URL`. `src/hooks/useFetch.ts` wraps any async call (typically an `api.*` call) and tracks `isLoading`/`error` without touching component state:
  ```tsx
  const [fetchQuestions, isLoading, error] = useFetch(() => api.get<Question[]>('/questions'));
  const result = await fetchQuestions();
  ```
- **Mock backend (`db.json`)**: top-level collections are `main` (home page content), `catalog`, `products`, `reviews`, `users`. Shapes for these are declared as TS interfaces in `src/types/index.ts` (e.g. `HomePageI`, `CardI`, `CatalogPageI`, `ReviewI`, `UserI`/`UserWithPasswordI`, `PaginatedResponseI<T>`).
- **Component layout** (`src/components/`):
  - `layout/` — Layout, Header, Footer (app shell)
  - `ui/` — generic reusable primitives (Button, Card, Checkbox, Radio, Select, Loader, ErrorBoundary, BreadCrumbs, ReviewCard)
  - `home-page/`, `catalog-page/`, `cart/` — feature/page-specific components, grouped by the page they belong to
- **Pages** (`src/pages/`) map 1:1 to routes; each page folder has a barrel `index.ts` re-exporting the component.
- **Path alias**: `@/*` → `src/*`, configured in both `vite.config.ts` (resolve.alias) and `tsconfig.app.json` (compilerOptions.paths). Always import via `@/...`, not relative `../../` chains.

## Styling

- SCSS Modules: every component has its own co-located `*.module.scss`.
- `_variables.scss`, `_mixins.scss`, and `_title.scss` (in `src/styles/`) are auto-injected into every `.scss` file via `additionalData` in `vite.config.ts` — do not add `@use` for these manually in component files.
- Global styles live in `src/styles/global.scss`, imported once in `src/main.tsx`.

## Conventions

- Interface names are suffixed with `I` (e.g. `CardI`, `UserI`, `CartItemI`) — follow this when adding new types in `src/types/index.ts`.
- Formatting is enforced by Prettier (single quotes, semicolons, trailing commas, 100 print width) — run `npm run format` rather than hand-formatting.
