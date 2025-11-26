"use client";

import { useState } from "react";
import { FeedHeader } from "@/features/feed/ui/FeedHeader";
import { FeedList } from "@/features/feed/ui/FeedList";
import { MobileNav } from "@/shared/components/MobileNav";

export default function FeedPage() {
  const [tab, setTab] = useState<"recommended" | "following">("recommended");
  // Figma: おすすめ = single column list, フォロー中 = masonry
  const mode = tab === "recommended" ? "list" : "masonry";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-[color:var(--background)]">
      <FeedHeader value={tab} onChange={setTab} />
      <div className="flex-1 px-3 pb-24">
        <FeedList mode={mode} />
      </div>
      <MobileNav active="home" />
    </div>
  );
}
