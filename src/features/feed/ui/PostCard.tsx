"use client";

import { cn } from "@/shared/utils/classnames";
import { timeAgo } from "@/shared/utils/date";
import { useAppDispatch } from "@/store/hooks";
import { toggleLikePost } from "@/store/slices/post";
import type { Post } from "../../../entities/post/model/post";

export function PostCard({ post }: { post: Post }) {
  const dispatch = useAppDispatch();

  const handleLike = () => {
    dispatch(toggleLikePost(post.id));
  };

  return (
    <article className="rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-1 text-xs text-gray-500 flex justify-between">
        <span>{timeAgo(post.createdAt)}</span>
        <span className="text-gray-400 text-[11px]">{post.commentsCount} bình luận</span>
      </div>

      <p className="text-gray-900 text-sm whitespace-pre-line">{post.content}</p>

      <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
        <button
          onClick={handleLike}
          className={cn(
            "flex items-center gap-1 rounded-full px-3 py-1 border text-xs",
            post.isLikedByCurrentUser
              ? "border-red-500 text-red-500 bg-red-50"
              : "border-gray-300 hover:bg-gray-100"
          )}
        >
          <span>❤️</span>
          <span>Thích</span>
        </button>

        <span>{post.likes} lượt thích</span>
      </div>
    </article>
  );
}
