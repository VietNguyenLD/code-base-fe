"use client";

import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createPost } from "@/store/slices/postSlice";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/utils/classnames";

export function NewPostComposer() {
  const dispatch = useAppDispatch();
  const creating = useAppSelector((s) => s.posts.creating);
  const [content, setContent] = useState("");

  const disabled = !content.trim() || creating;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    dispatch(createPost({ content }))
      .unwrap()
      .then(() => setContent(""))
      .catch(() => {});
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-4 shadow-sm flex flex-col gap-3">
      <textarea
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Bạn đang nghĩ gì?"
        className={cn(
          "w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm",
          "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        )}
      />

      <div className="flex justify-end">
        <Button type="submit" disabled={disabled}>
          {creating ? "Đang đăng..." : "Đăng bài"}
        </Button>
      </div>
    </form>
  );
}
