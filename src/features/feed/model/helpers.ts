import type { Post } from "@/entities/post/model/post";
import type { FeedFilters } from "./types";

export function sortPosts(posts: Post[], sortBy: FeedFilters["sortBy"]): Post[] {
  const cloned = [...posts];

  if (sortBy === "latest") {
    return cloned.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return cloned.sort((a, b) => b.likes - a.likes);
}

export function filterPostsByFollowing(
  posts: Post[],
  followingIds: string[],
  onlyFollowing: boolean
): Post[] {
  if (!onlyFollowing) return posts;
  const set = new Set(followingIds);
  return posts.filter((p) => set.has(p.authorId));
}

export function getVisiblePosts(
  posts: Post[],
  filters: FeedFilters,
  followingIds: string[]
): Post[] {
  const filtered = filterPostsByFollowing(posts, followingIds, filters.onlyFollowing);
  return sortPosts(filtered, filters.sortBy);
}
