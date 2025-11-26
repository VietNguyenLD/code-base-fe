"use client";

import Image from "next/image";
import { Avatar } from "@/shared/ui/Avatar";
import { EyeIcon, PaperclipIcon } from "@/shared/ui/icons";
import { StatPill } from "@/shared/ui/StatPill";
import { TagPill } from "@/shared/ui/TagPill";
import { cn } from "@/shared/utils/classnames";

export type FeedCardData = {
  id: string;
  title: string;
  author: string;
  avatar: string;
  timeLabel: string;
  image?: string;
  thumbnails?: string[];
  tag?: string;
  tagTone?: "primary" | "warning";
  views?: string;
  clips?: string;
  clipped?: boolean;
  onClip?: () => void;
  compact?: boolean;
};

export function PostCard({ data }: { data: FeedCardData }) {
  const showGridThumbs = data.thumbnails && data.thumbnails.length > 0;

  return (
    <article
      className={cn(
        "rounded-2xl border border-[color:var(--border)] bg-white p-3 shadow-[var(--card-shadow)]",
        data.compact ? "space-y-2" : "space-y-3"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-1 items-center gap-2">
          <Avatar src={data.avatar} alt={data.author} size={36} ring />
          <div className="flex flex-col">
            <p className="text-[13px] font-semibold leading-tight text-[color:var(--foreground)]">
              {data.author}
            </p>
            <p className="text-[11px] text-[color:var(--muted)]">{data.timeLabel}</p>
          </div>
        </div>

        <button
          onClick={data.onClip}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border border-[#d6ddf3] text-[color:var(--primary)] transition",
            data.clipped
              ? "bg-[color:var(--primary)] text-white shadow-[0_4px_12px_rgba(50,80,233,0.35)]"
              : "bg-white hover:bg-[color:var(--primary-soft)]"
          )}
          aria-label="Clip"
        >
          <PaperclipIcon className="h-5 w-5" />
        </button>
      </div>

      {data.tag && <TagPill className="mt-1" label={data.tag} tone={data.tagTone} />}

      <h3 className="text-[14px] font-semibold leading-relaxed text-[color:var(--foreground)]">
        {data.title}
      </h3>

      {showGridThumbs ? (
        <div className="mt-1 flex gap-2">
          {data.thumbnails!.map((thumb, idx) => (
            <div
              key={`${data.id}-thumb-${idx}`}
              className="h-16 w-16 overflow-hidden rounded-xl border border-[color:var(--border)]"
            >
              <Image
                src={thumb}
                alt=""
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        data.image && (
          <div className="mt-1 overflow-hidden rounded-xl border border-[color:var(--border)]">
            <Image
              src={data.image}
              alt={data.title}
              width={800}
              height={480}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )
      )}

      {(data.views || data.clips) && (
        <div className="flex items-center gap-4">
          {data.views && <StatPill icon={<EyeIcon className="h-4 w-4" />} label={data.views} />}
          {data.clips && (
            <StatPill icon={<PaperclipIcon className="h-4 w-4" />} label={data.clips} />
          )}
        </div>
      )}
    </article>
  );
}
