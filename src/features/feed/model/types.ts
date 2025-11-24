import type { Post } from "@/entities/post/model/post";

export interface FeedState {
  list: Post[];
  loading: boolean;
  error: string | null;
}
