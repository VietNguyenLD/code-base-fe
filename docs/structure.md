# Cấu trúc dự án

Tài liệu này giải thích nhanh cách bố trí thư mục và vai trò của từng lớp để dev mới có thể tìm đúng chỗ khi bổ sung tính năng.

## Triết lý phân tầng

- `app`: Next.js App Router, định nghĩa route + layout. Dùng route group `(public)` và `(protected)` để tách trang cần/không cần đăng nhập.
- `entities`: Kiểu dữ liệu lõi cho domain (User, Post) và mapper chuyển đổi dữ liệu từ API.
- `features`: Nghiệp vụ cụ thể (auth, feed). Mỗi feature tách `api` (gọi backend), `model` (types/selectors/helpers) và `ui` (component giao diện).
- `shared`: Tài nguyên dùng chung (UI primitive, component nhỏ, hooks, utils, config, axios client, guard).
- `store`: Redux Toolkit store + slice toàn cục; dùng cho auth và danh sách post.

## Sơ đồ thư mục chính

```
src/
├─ app/
│  ├─ layout.tsx                # Root layout, inject ReduxProvider
│  ├─ globals.css               # Tailwind layer base
│  ├─ page.tsx                  # Landing mặc định (template Next.js)
│  ├─ (public)/
│  │  └─ login/page.tsx         # Trang đăng nhập
│  └─ (protected)/
│     ├─ layout.tsx             # Bảo vệ route, redirect nếu chưa đăng nhập
│     └─ feed/page.tsx          # Trang feed (gồm NewPostComposer + FeedList)
├─ entities/
│  ├─ post/model/{post.ts,mappers.ts}
│  └─ user/model/{user.ts,mappers.ts}
├─ features/
│  ├─ auth/
│  │  ├─ api/login.ts
│  │  ├─ model/types.ts
│  │  └─ ui/LoginForm.tsx
│  └─ feed/
│     ├─ api/post.ts            # Gọi /posts/feed, /posts, /posts/:id/like
│     ├─ model/{types.ts,selectors.ts,helpers.ts,index.ts}
│     ├─ ui/{FeedList.tsx,NewPostComposer.tsx,PostCard.tsx}
│     └─ page.tsx               # Phiên bản page component có thể tái dùng
├─ shared/
│  ├─ components/{LoadingOverlay.tsx,SearchBar.tsx,UserBadge.tsx}
│  ├─ config/{constants.ts,routes.ts,index.ts}
│  ├─ hooks/useInfiniteScroll.ts
│  ├─ lib/{axiosClient.ts,authGuard.ts}
│  ├─ ui/{Button.tsx,Input.tsx,Avatar.tsx}
│  └─ utils/{classnames.ts,object.ts,date.ts,validation.ts,index.ts}
└─ store/
   ├─ Providers.tsx             # Bọc Redux Provider
   ├─ hooks.ts                  # useAppDispatch/useAppSelector
   ├─ index.ts                  # store config
   └─ slices/
      ├─ auth/{index.ts,initial-state.ts,thunk.ts}
      └─ post/{index.ts,initial-state.ts,thunk.ts}
```

## Vai trò chi tiết

- `src/app/(protected)/layout.tsx`: gọi `getCurrentUser()` (đọc cookie `accessToken`) và redirect về `/login` nếu chưa có token; là nơi thêm header/sidebar chung cho các trang private.
- `src/app/(protected)/feed/page.tsx`: trang feed chính, hiển thị composer + danh sách bài viết.
- `src/features/auth`: UI `LoginForm` dispatch thunk `login` -> lưu token vào Redux + `localStorage`.
- `src/features/feed`: API cho feed và post (get/create/like), selectors để đọc state từ `store.posts`, helpers để sort/filter nếu cần, UI cho danh sách bài và composer.
- `src/entities/*`: định nghĩa contract dữ liệu nội bộ; mapper đổi snake_case từ API sang camelCase.
- `src/store/slices/auth`: giữ `user`, `accessToken`, trạng thái loading/error; action `logout` sẽ xóa token khỏi `localStorage`.
- `src/store/slices/post`: giữ list feed + trạng thái tạo/like; thunk `fetchFeed`, `createPost`, `likePost` gọi API trong `features/feed`.
- `src/shared/lib/axiosClient.ts`: axios instance chung, tự gắn `Authorization: Bearer` từ `localStorage`, cấu hình `baseURL` bằng `NEXT_PUBLIC_API_BASE_URL`.
- `src/shared/lib/authGuard.ts`: helper server-side; hiện mới đọc cookie và trả user demo (cần nối API thật).
- `src/shared/ui` + `src/shared/components`: các building block giao diện có thể reuse ở feature khác.
- `src/shared/utils`: tiện ích nhỏ (merge class, format thời gian, validation...); import qua `@/shared/utils/...`.

## Nguyên tắc thêm tính năng mới

1. **Định nghĩa domain**: nếu có kiểu dữ liệu mới, tạo trong `src/entities/<domain>/model` (types + mapper từ API).
2. **Tạo feature**: dựng thư mục `src/features/<feature>/<api|model|ui>`; API chỉ gọi axiosClient, model chứa types/selectors/helpers, UI là component client.
3. **State toàn cục**: nếu cần lưu Redux, tạo slice trong `src/store/slices/<name>` và đăng ký reducer ở `src/store/index.ts`.
4. **Route**: trang công khai đặt trong `(public)`, trang yêu cầu đăng nhập đặt trong `(protected)`; inject component từ feature để giữ route mỏng.
5. **Tái sử dụng**: ưu tiên dùng component/hook/util trong `shared` thay vì tạo mới; nếu xây dựng thứ phổ quát, hãy đặt vào `shared` để team khác dùng được.

## Luồng dữ liệu chính (tham khảo)

- **Auth**: `LoginForm` → dispatch `login` thunk → `features/auth/api/login` → axiosClient → lưu `accessToken` (Redux + `localStorage`).
- **Feed**: `(protected)/layout` check token → `/feed` render `NewPostComposer` + `FeedList` → `FeedList` gọi `fetchFeed` nếu danh sách trống → API map dữ liệu về `Post` entity → `PostCard` hiển thị và cho phép like lạc quan (`toggleLikePost`).
