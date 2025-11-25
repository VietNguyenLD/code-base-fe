import type { PostApiResponse } from "@/entities/post/model/mappers";
import { mapPostFromApi } from "@/entities/post/model/mappers";
import type { Post } from "@/entities/post/model/post";
import axiosClient from "@/shared/lib/axiosClient";

export async function getFeedApi(): Promise<Post[]> {
  const res = await axiosClient.get<PostApiResponse[]>("/posts/feed");
  return res.data.map(mapPostFromApi);
}

export async function createPostApi(payload: { content: string }): Promise<Post> {
  const res = await axiosClient.post<PostApiResponse>("/posts", payload);
  return mapPostFromApi(res.data);
}

export async function toggleLikePostApi(postId: string): Promise<Post> {
  const res = await axiosClient.post<PostApiResponse>(`/posts/${postId}/like`);
  return mapPostFromApi(res.data);
}
