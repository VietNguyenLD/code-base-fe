# Social App

Ứng dụng mạng xã hội khởi tạo bằng Next.js (App Router) với Redux Toolkit để quản lý state, Axios để gọi API và Tailwind CSS v4 để giao diện.

## Kiến trúc nhanh
- App Router với 2 nhóm route: `(public)` cho trang `login`, `(protected)` áp dụng `getCurrentUser` để redirect nếu chưa đăng nhập (dự kiến cho `feed`).
- State toàn cục trong `src/store` (Redux Toolkit + React-Redux hooks). Token được lưu vào `localStorage`.
- API client `src/shared/lib/axiosClient.ts` thêm `Authorization: Bearer` nếu có token và đọc `baseURL` từ biến môi trường.
- Domain tách riêng: `entities` (kiểu dữ liệu gốc), `features` (login, feed), `shared` (tiện ích dùng chung).

## Thư mục chính
- `src/app`: layout gốc, trang mặc định, nhóm route `(public)/(protected)`.
- `src/features/auth`: form đăng nhập, gọi `loginApi`, định nghĩa kiểu `LoginPayload`/`LoginResponse`.
- `src/features/feed`: render `FeedList` và selectors tầng model.
- `src/features/post`: API + model (types/mappers) cho bài viết (feed/create/like).
- `src/shared/lib`: `axiosClient`, `authGuard`.
- `src/store`: cấu hình Redux store, providers và các slice `auth`, `posts`.

## Sơ đồ cấu trúc dự án
```
social-app/
├─ README.md
├─ package.json
├─ tsconfig.json
├─ eslint.config.mjs
├─ postcss.config.mjs
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
└─ public/
   ├─ favicon.ico
   └─ assets khác
```

## Cần chuẩn bị
- Node.js 20+ và npm/yarn/pnpm.
- API backend có các endpoint:
  - `POST /auth/login` trả `{ user, accessToken }`.
  - `GET /posts/feed` trả danh sách `Post`.
- Biến môi trường: tạo file `.env.local` và set `NEXT_PUBLIC_API_BASE_URL` (mặc định rơi về `http://localhost:4000/api`).

## Chạy dự án
```bash
npm install          # hoặc yarn / pnpm
npm run dev          # chạy ở http://localhost:3000

npm run build        # build production
npm start            # chạy build
npm run lint         # eslint
npm run format       # prettier cho js/json/md/css
```

## Luồng chính
- Đăng nhập: `src/features/auth/ui/LoginForm.tsx` dispatch `login` (async thunk). Khi thành công lưu `accessToken` vào localStorage và Redux store.
- Bảo vệ route: `src/app/(protected)/layout.tsx` gọi `getCurrentUser` (đọc cookie `accessToken`, TODO: verify token/gọi API). Nếu không có token, redirect `/login`.
- Feed: `src/features/feed/ui/FeedList.tsx` dispatch `fetchFeed` để lấy danh sách bài viết, hiển thị trạng thái loading/error và bài viết (có dữ liệu giả fallback khi API lỗi).
- Post model/API: `src/features/post/model` định nghĩa `PostApiResponse`, mapper `mapPostFromApi`; `src/features/post/api/post.ts` gọi backend `feed/create/like` và map về domain `Post`.

## Phát triển tiếp theo (gợi ý)
- Hoàn thiện route `/feed` trong nhóm `(protected)` và gắn `FeedPage`.
- Bổ sung xác thực thực tế cho `getCurrentUser` (gọi API verify/refresh token, đồng bộ cookie/localStorage).
- Thêm điều hướng sidebar/header trong layout bảo vệ, logic logout và hiển thị avatar.
- Viết test hoặc mock API cho `authSlice`/`postSlice`.
