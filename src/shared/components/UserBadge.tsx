"use client";

import { Avatar } from "@/shared/ui/Avatar";

interface UserBadgeProps {
  username: string;
  avatar?: string;
  onClick?: () => void;
}

export function UserBadge({ username, avatar, onClick }: UserBadgeProps) {
  return (
    <div className="flex cursor-pointer items-center gap-2" onClick={onClick}>
      <Avatar src={avatar} size={32} />
      <span className="text-sm font-medium text-gray-800">{username}</span>
    </div>
  );
}
