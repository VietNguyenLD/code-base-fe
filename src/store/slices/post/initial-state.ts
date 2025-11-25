import type { Post } from "@/entities/post/model/post";

interface PostState {
  list: Post[];
  loading: boolean;
  creating: boolean;
  likingIds: string[];
  error: string | null;
}

export const initialState: PostState = {
  list: [],
  loading: false,
  creating: false,
  likingIds: [],
  error: null,
};
