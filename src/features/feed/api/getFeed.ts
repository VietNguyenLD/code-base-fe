import axiosClient from "@/shared/lib/axiosClient";
import type { Post } from "@/entities/post/model/post";

export function getFeedApi(): Promise<Post[]> {
  return axiosClient.get("/posts/feed");
}
