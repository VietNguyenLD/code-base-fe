import type { Post } from "@/entities/post/model/post";

export type FeedSort = "latest" | "top";

export interface FeedFilters {
  sortBy: FeedSort;
  onlyFollowing: boolean;
}

export interface FeedState {
  list: Post[];
  filters?: FeedFilters;
  loading: boolean;
  error: string | null;
}
