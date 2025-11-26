import { cn } from "@/shared/utils/classnames";

type TagPillProps = {
  label: string;
  tone?: "primary" | "warning";
  className?: string;
};

export function TagPill({ label, tone = "primary", className }: TagPillProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        tone === "warning"
          ? "bg-[#fff7e6] text-[#f59e0b]"
          : "bg-[color:var(--primary-soft)] text-[color:var(--primary)]",
        className
      )}
    >
      {label}
    </span>
  );
}
