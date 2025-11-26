import Image from "next/image";
import { cn } from "@/shared/utils/classnames";

type AvatarProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  ring?: boolean;
};

export function Avatar({ src, alt, size = 36, className, ring }: AvatarProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-full bg-white",
        ring && "border border-[color:var(--border)]",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
