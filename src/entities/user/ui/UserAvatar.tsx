import Image from "next/image";
import { User } from "../model/user";



export function UserAvatar({ user }: { user: User }) {
  return (
    <Image
      src={user.avatarUrl || "/default-avatar.png"}
      alt={user.username}
      width={40}
      height={40}
      className="rounded-full object-cover"
    />
  );
}
