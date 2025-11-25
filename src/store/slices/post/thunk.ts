import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { Post, PostId } from "@/entities/post/model/post";
import { getFeedApi, createPostApi, toggleLikePostApi } from "@/features/feed/api/post";

export const fetchFeed = createAsyncThunk<Post[], void, { rejectValue: string }>(
  "posts/fetchFeed",
  async (_, thunkAPI) => {
    try {
      const res = await getFeedApi();
      return res;
    } catch (e: unknown) {
      const err = e as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load feed");
    }
  }
);

export const createPost = createAsyncThunk<Post, { content: string }, { rejectValue: string }>(
  "posts/createPost",
  async (payload, thunkAPI) => {
    try {
      const res = await createPostApi(payload);
      return res;
    } catch (e: unknown) {
      const err = e as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create post");
    }
  }
);

export const likePost = createAsyncThunk<Post, PostId, { rejectValue: string }>(
  "posts/likePost",
  async (postId, thunkAPI) => {
    try {
      const res = await toggleLikePostApi(postId);
      return res;
    } catch (e: unknown) {
      const err = e as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err?.response?.data?.message ?? "Failed to like post");
    }
  }
);
