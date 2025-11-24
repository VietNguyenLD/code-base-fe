export interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  likes: number;
  commentsCount: number;
  isLikedByCurrentUser?: boolean;
}

export type PostId = Post["id"];
