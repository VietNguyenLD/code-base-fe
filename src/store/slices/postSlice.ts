import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Post, PostId } from "@/entities/post/model/post";
import {
  getFeedApi,
  createPostApi,
  toggleLikePostApi,
} from "@/features/feed/api/post";

interface PostState {
  list: Post[];
  loading: boolean;
  creating: boolean;
  likingIds: string[];
  error: string | null;
}

const initialState: PostState = {
  list: [],
  loading: false,
  creating: false,
  likingIds: [],
  error: null,
};

export const fetchFeed = createAsyncThunk<Post[], void, { rejectValue: string }>(
  "posts/fetchFeed",
  async (_, thunkAPI) => {
    try {
      const res = await getFeedApi();
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message ?? "Failed to load feed");
    }
  }
);

export const createPost = createAsyncThunk<Post, { content: string }, { rejectValue: string }>(
  "posts/createPost",
  async (payload, thunkAPI) => {
    try {
      const res = await createPostApi(payload);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message ?? "Failed to create post");
    }
  }
);

export const likePost = createAsyncThunk<Post, PostId, { rejectValue: string }>(
  "posts/likePost",
  async (postId, thunkAPI) => {
    try {
      const res = await toggleLikePostApi(postId);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message ?? "Failed to like post");
    }
  }
);

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
