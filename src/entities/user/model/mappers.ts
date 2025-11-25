import type { User } from "./user";

export interface UserApiResponse {
  id: string;
  username: string;
  avatar_url?: string;
  bio?: string;
  created_at?: string;
}

export function mapUserFromApi(payload: UserApiResponse): User {
  return {
    id: payload.id,
    username: payload.username,
    avatarUrl: payload.avatar_url,
    bio: payload.bio,
    createdAt: payload.created_at,
  };
}
