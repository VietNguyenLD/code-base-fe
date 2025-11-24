import Image from "next/image";

interface AvatarProps {
  src?: string;
  size?: number;
  alt?: string;
}

export function Avatar({ src, size = 40, alt = "avatar" }: AvatarProps) {
  return (
    <Image
      src={src || "/default-avatar.png"}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full object-cover"
    />
  );
}
