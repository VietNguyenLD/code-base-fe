"use client";

import { Avatar } from "@/shared/ui/Avatar";
import { Button } from "@/shared/ui/Button";

type UserCardProps = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  followers: string;
  clips?: string;
};

export function UserCard({ name, role, avatar, followers, clips }: UserCardProps) {
  return (
    <article className="rounded-2xl border border-[color:var(--border)] bg-white p-3 text-center shadow-[var(--card-shadow)]">
      <p className="mb-2 text-[12px] font-semibold text-[color:var(--muted)]">おすすめユーザー</p>
      <div className="mx-auto mb-2 flex justify-center">
        <Avatar src={avatar} alt={name} size={60} ring />
      </div>
      <p className="text-[14px] font-semibold text-[color:var(--foreground)]">{name}</p>
      <p className="text-[12px] text-[color:var(--muted)]">{role}</p>
      <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-[color:var(--muted)]">
        <span>{followers} フォロワー</span>
        {clips && <span className="text-[color:var(--primary)]">{clips} クリップ</span>}
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <Button className="min-w-[88px] bg-[color:var(--primary)] px-3 py-2 text-sm hover:bg-[#2b46c8]">
          フォロー
        </Button>
        <Button
          variant="outline"
          className="min-w-[88px] border-[color:var(--primary)] px-3 py-2 text-sm text-[color:var(--primary)] hover:bg-[color:var(--primary-soft)]"
        >
          プロフィール
        </Button>
      </div>
    </article>
  );
}
