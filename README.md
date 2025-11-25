References: https://dev.to/m_midas/feature-sliced-design-the-best-frontend-architecture-4noj

# Manegyclip App

Social network starter built with Next.js (App Router), Redux Toolkit for state, Axios for API calls, and Tailwind CSS v4 for styling.

## Quick architecture

- App Router with two route groups: `(public)` for `login`, `(protected)` uses `getCurrentUser` to redirect if unauthenticated (intended for `feed`).
- Global state in `src/store` (Redux Toolkit + React-Redux hooks). Token stored in `localStorage`.
- API client `src/shared/lib/axiosClient.ts` adds `Authorization: Bearer` when a token exists and reads `baseURL` from environment variables.
- Domain separation: `entities` (core types), `features` (auth, feed, post), `shared` (utilities).

## Key folders

- `src/app`: root layout, default page, `(public)/(protected)` route groups.
- `src/features/auth`: login form, `loginApi`, types `LoginPayload`/`LoginResponse`.
- `src/features/feed`: render `FeedList` and model-level selectors.
- `src/features/post`: API + model (types/mappers) for posts (feed/create/like).
- `src/shared/lib`: `axiosClient`, `authGuard`.
- `src/store`: Redux store config, providers, slices `auth`, `posts`.

## Project structure diagram

```
social-app/
├─ src/
│  ├─ app/
│  │  ├─ (public)/login/page.tsx
│  │  ├─ (protected)/layout.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ entities/
│  │  ├─ post/model/post.ts
│  │  └─ user/model/types.ts
│  ├─ features/
│  │  ├─ auth/
│  │  │  ├─ api/login.ts
│  │  │  ├─ model/types.ts
│  │  │  └─ ui/LoginForm.tsx
│  │  ├─ feed/
│  │  │  ├─ model/{index.ts,selectors.ts,types.ts}
│  │  │  └─ ui/FeedList.tsx
│  │  └─ post/
│  │     ├─ api/post.ts
│  │     └─ model/{mappers.ts,types.ts}
│  ├─ shared/
│  │  └─ lib/{authGuard.ts,axiosClient.ts}
│  └─ store/
│     ├─ slices/{authSlice.ts,postSlice.ts}
│     ├─ Providers.tsx
│     ├─ hooks.ts
│     └─ index.ts
├─ public/
│   ├─ favicon.ico
│   └─ other assets
├─ README.md
├─ package.json
├─ tsconfig.json
├─ eslint.config.mjs
└─ postcss.config.mjs
```

## Requirements

- Node.js 20+ with npm/yarn/pnpm.
- Backend API endpoints:
  - `POST /auth/login` returns `{ user, accessToken }`.
  - `GET /posts/feed` returns a list of `Post`.
- Environment variable: create `.env.local` and set `NEXT_PUBLIC_API_BASE_URL` (defaults to `http://localhost:4000/api`).

## Run the project

```bash
npm install          # or yarn / pnpm
npm run dev          # http://localhost:3000

npm run build        # production build
npm start            # run built app
npm run lint         # eslint
npm run format       # prettier for js/json/md/css
```

## Main flows

- Login: `src/features/auth/ui/LoginForm.tsx` dispatches `login` (async thunk). On success, stores `accessToken` in localStorage and Redux store.
- Route guard: `src/app/(protected)/layout.tsx` calls `getCurrentUser` (reads `accessToken` cookie; TODO: verify token/call API). If no token, redirects to `/login`.
- Feed: `src/features/feed/ui/FeedList.tsx` dispatches `fetchFeed` to load posts, shows loading/error, and renders posts (with fallback sample data when the API fails).
- Post model/API: `src/features/post/model` defines `PostApiResponse`, mapper `mapPostFromApi`; `src/features/post/api/post.ts` hits backend feed/create/like and maps to domain `Post`.

## Next steps (suggestions)

- Complete `/feed` route in the `(protected)` group and attach `FeedPage`.
- Implement real auth for `getCurrentUser` (verify/refresh token, sync cookie/localStorage).
- Add sidebar/header navigation in the protected layout, logout logic, avatar display.
- Add tests or API mocks for `authSlice`/`postSlice`.
