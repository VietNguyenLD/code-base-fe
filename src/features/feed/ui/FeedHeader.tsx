"use client";

import { TabsSwitch } from "@/shared/components/TabsSwitch";
import { MagnifyingGlassIcon } from "@/shared/ui/icons";

type Props = {
  value: "recommended" | "following";
  onChange: (value: "recommended" | "following") => void;
};

export function FeedHeader({ value, onChange }: Props) {
  return (
    <header className="sticky top-0 z-20 mx-auto flex w-full max-w-[430px] items-center justify-between bg-[color:var(--background)] px-3 pb-3 pt-4">
      <TabsSwitch
        options={[
          { label: "おすすめ", value: "recommended" },
          { label: "フォロー中", value: "following" },
        ]}
        value={value}
        onChange={(v) => onChange(v as Props["value"])}
      />
      <button
        aria-label="Search"
        className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[color:var(--foreground)] shadow-[0_2px_10px_rgba(0,29,95,0.10)]"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </header>
  );
}
