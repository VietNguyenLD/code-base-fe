import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import type { FeedState } from "./types";

const selectPostSlice = (state: RootState) => state.posts;

export const selectFeedState = createSelector(
  [selectPostSlice],
  (posts): FeedState => ({
    list: posts.list,
    loading: posts.loading,
    error: posts.error,
  })
);

export const selectFeedList = createSelector([selectPostSlice], (posts) => posts.list);

export const selectIsFeedEmpty = createSelector(
  [selectPostSlice],
  (posts) => posts.list.length === 0
);
