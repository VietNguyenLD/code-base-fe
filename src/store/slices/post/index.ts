import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Post, PostId } from "@/entities/post/model/post";
import { createPost, fetchFeed, likePost } from "./thunk";

interface PostState {
  list: Post[];
  loading: boolean;
  creating: boolean;
  likingIds: string[];
  error: string | null;
}

const initialState: PostState = {
  list: [
    {
      id: "demo-1",
      authorId: "佐藤 美咲",
      content: "収入印紙の勘定科目と仕訳ルールを徹底解説｜税務対応・電子契約にも対応",
      createdAt: "2025-01-04T06:00:00.000Z",
      likes: 1240,
      commentsCount: 12,
      isLikedByCurrentUser: true,
    },
    {
      id: "demo-2",
      authorId: "佐藤 美咲",
      content: "収入印紙の勘定科目と仕訳ルールを徹底解説｜税務対応・電子契約にも対応",
      createdAt: "2025-01-03T23:00:00.000Z",
      likes: 860,
      commentsCount: 8,
    },
    {
      id: "demo-3",
      authorId: "田中 和子",
      content: "40代女性の歯並びニーズや価値観、転職初心者が知りたい20の論点",
      createdAt: "2025-01-02T10:00:00.000Z",
      likes: 540,
      commentsCount: 6,
    },
    {
      id: "demo-4",
      authorId: "人気クリップ",
      content: "収入印紙の勘定科目と仕訳ルールを徹底解説｜税務対応・電子契約にも対応",
      createdAt: "2025-01-01T15:00:00.000Z",
      likes: 1020,
      commentsCount: 9,
    },
    {
      id: "demo-5",
      authorId: "鈴木 翼",
      content: "テレワーク時代の社員別評価フレームワーク｜チェックリスト付き",
      createdAt: "2025-01-01T08:00:00.000Z",
      likes: 430,
      commentsCount: 7,
      isLikedByCurrentUser: true,
    },
    {
      id: "demo-6",
      authorId: "佐藤 美咲",
      content: "経理担当者必見！ 勘定科目の選び方チェックリスト",
      createdAt: "2024-12-31T16:30:00.000Z",
      likes: 620,
      commentsCount: 11,
    },
    {
      id: "demo-7",
      authorId: "佐藤 美咲",
      content: "テレワーク時代の社員別評価フレームワーク：転職初心者が知りたい20の論点",
      createdAt: "2024-12-30T21:00:00.000Z",
      likes: 510,
      commentsCount: 5,
    },
  ],
  loading: false,
  creating: false,
  likingIds: [],
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // optional: optimistic like nếu muốn
    toggleLikePost(state, action: PayloadAction<PostId>) {
      const post = state.list.find((p) => p.id === action.payload);
      if (!post) return;
      if (post.isLikedByCurrentUser) {
        post.isLikedByCurrentUser = false;
        post.likes = Math.max(0, post.likes - 1);
      } else {
        post.isLikedByCurrentUser = true;
        post.likes += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch feed
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load feed";
      })

      // Create post
      .addCase(createPost.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.creating = false;
        state.list.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload || "Failed to create post";
      })

      // Like post (update lại state theo server)
      .addCase(likePost.pending, (state, action) => {
        state.likingIds.push(action.meta.arg);
      })
      .addCase(likePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.likingIds = state.likingIds.filter((id) => id !== action.payload.id);
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        const failedId = action.meta.arg;
        state.likingIds = state.likingIds.filter((id) => id !== failedId);
        state.error = action.payload || "Failed to like post";
      });
  },
});

export const { toggleLikePost } = postSlice.actions;
export default postSlice.reducer;
