"use client";

import type { ComponentType } from "react";
import { HomeIcon, PaperclipIcon, PlusIcon, SearchIcon, UserIcon } from "@/shared/ui/icons";

type NavKey = "home" | "search" | "post" | "clip" | "profile";

const navItems: { key: NavKey; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { key: "home", label: "ホーム", icon: HomeIcon },
  { key: "search", label: "探す", icon: SearchIcon },
  { key: "post", label: "投稿", icon: PlusIcon },
  { key: "clip", label: "クリップ", icon: PaperclipIcon },
  { key: "profile", label: "マイページ", icon: UserIcon },
];

export function MobileNav({ active = "clip" }: { active?: NavKey }) {
  return (
    <nav className="sticky bottom-0 z-20 w-full border-t border-[color:var(--border)] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[430px] items-center justify-between px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              className="flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-[color:var(--muted)] hover:text-[color:var(--primary)]"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  isActive
                    ? "bg-[color:var(--primary-soft)] text-[color:var(--primary)]"
                    : "text-[color:var(--muted)] hover:bg-[#f2f4ff]"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className={isActive ? "text-[color:var(--primary)]" : ""}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
