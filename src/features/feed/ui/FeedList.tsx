"use client";

import { useEffect } from "react";
import { selectFeedState } from "@/features/feed/model";
import { PostCard } from "@/features/feed/ui/PostCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchFeed } from "@/store/slices/post/thunk";

export function FeedList() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(selectFeedState);

  useEffect(() => {
    if (!list.length) {
      dispatch(fetchFeed());
    }
  }, [dispatch, list.length]);

  if (loading && !list.length) {
    return <p className="text-sm text-gray-500">Đang tải bài viết...</p>;
  }

  if (error && !list.length) {
    return <p className="text-sm text-red-500">Lỗi: {error}</p>;
  }

  return (
    <div className="space-y-4">
      {list.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {!loading && !list.length && (
        <p className="text-sm text-gray-500 text-center">Chưa có bài viết nào.</p>
      )}
    </div>
  );
}
