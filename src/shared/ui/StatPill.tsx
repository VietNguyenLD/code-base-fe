import type { ReactNode } from "react";
import { cn } from "@/shared/utils/classnames";

type StatPillProps = {
  icon: ReactNode;
  label: string;
  className?: string;
};

export function StatPill({ icon, label, className }: StatPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[12px] font-medium text-[color:var(--muted)]",
        className
      )}
    >
      {icon}
      {label}
    </span>
  );
}
