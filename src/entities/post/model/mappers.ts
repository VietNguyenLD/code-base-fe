import type { Post } from "./post";

export interface PostApiResponse {
  id: string;
  author_id: string;
  content: string;
  created_at: string;
  likes: number;
  comments_count: number;
  is_liked_by_current_user?: boolean;
}

export function mapPostFromApi(payload: PostApiResponse): Post {
  return {
    id: payload.id,
    authorId: payload.author_id,
    content: payload.content,
    createdAt: payload.created_at,
    likes: payload.likes,
    commentsCount: payload.comments_count,
    isLikedByCurrentUser: payload.is_liked_by_current_user,
  };
}
