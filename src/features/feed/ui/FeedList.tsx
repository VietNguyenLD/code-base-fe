"use client";

import { useEffect } from "react";
import type { Post } from "@/entities/post/model/post";
import { selectFeedState } from "@/features/feed/model";
import type { FeedCardData } from "@/features/feed/ui/PostCard";
import { PostCard } from "@/features/feed/ui/PostCard";
import { UserCard } from "@/features/feed/ui/UserCard";
import { timeAgo } from "@/shared/utils/date";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleLikePost } from "@/store/slices/post";
import { fetchFeed } from "@/store/slices/post/thunk";

type Mode = "masonry" | "list";

export function FeedList({ mode }: { mode: Mode }) {
  const dispatch = useAppDispatch();
  const { list, error } = useAppSelector(selectFeedState);

  useEffect(() => {
    if (!list.length) {
      dispatch(fetchFeed());
    }
  }, [dispatch, list.length]);

  if (error && !list.length) {
    return <p className="text-sm text-red-500">Lỗi: {error}</p>;
  }

  const decorated = list.length ? mapPostsToItems(list, mode, dispatch) : fallbackByMode[mode];

  if (mode === "masonry") {
    return (
      <div className="pt-1">
        <div className="columns-2 gap-3 [column-fill:_balance]">
          {decorated.map((item) => (
            <div key={item.id} className="mb-3 break-inside-avoid">
              {item.kind === "post" ? <PostCard data={item} /> : <UserCard {...item} />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-2 space-y-3">
      {decorated
        .filter((item) => item.kind === "post")
        .map((item) => (
          <PostCard key={item.id} data={{ ...item, compact: false }} />
        ))}
    </div>
  );
}

const avatars = ["/avatar-1.jpg", "/avatar-2.jpg", "/avatar-3.jpg"];
const images = ["/feed-1.jpg", "/feed-2.jpg", "/feed-3.jpg", "/feed-4.jpg"];

type FeedItem = (FeedCardData & { kind: "post" }) | UserItem;
type UserItem = {
  kind: "user";
  id: string;
  name: string;
  role: string;
  avatar: string;
  followers: string;
  clips?: string;
};

function mapPostsToItems(
  posts: Post[],
  mode: Mode,
  dispatch: ReturnType<typeof useAppDispatch>
): FeedItem[] {
  const items: FeedItem[] = [];

  posts.forEach((post, idx) => {
    const avatar = avatars[idx % avatars.length];
    const image = images[idx % images.length];
    const viewsNum = Math.max(1200, post.likes * 12 + 2400);
    items.push({
      kind: "post",
      id: post.id,
      title: post.content,
      author: post.authorId || "ゲスト",
      avatar,
      timeLabel: timeAgo(post.createdAt),
      image,
      views: viewsNum.toLocaleString(),
      clips: post.commentsCount.toLocaleString(),
      clipped: post.isLikedByCurrentUser,
      onClip: () => dispatch(toggleLikePost(post.id)),
      compact: mode === "masonry" ? idx % 3 === 1 : false,
    });

    // insert user suggestion after some items (only for masonry layout)
    if (mode === "masonry" && idx === 1) {
      items.push({
        kind: "user",
        id: "user-suggestion-1",
        name: "マネクリちゃん",
        role: "会社員 / 34歳",
        avatar: avatars[2],
        followers: "2,317",
        clips: "506",
      });
    }
  });

  return items;
}

const fallbackItemsMasonry: FeedItem[] = [
  {
    kind: "post",
    id: "f1",
    title: "収入印紙の勘定科目と仕訳ルールを徹底解説｜税務対応・電子契約にも対応",
    author: "佐藤 美咲",
    avatar: avatars[0],
    timeLabel: "6時間前",
    image: images[0],
    views: "9,999",
    clips: "2,304",
    clipped: true,
    tag: "人気クリップ",
  },
  {
    kind: "post",
    id: "f2",
    title: "収入印紙の勘定科目と仕訳ルールを徹底解説｜税務対応・電子契約にも対応",
    author: "佐藤 美咲",
    avatar: avatars[0],
    timeLabel: "6時間前",
    image: images[1],
    views: "5,641",
    clips: "986",
  },
  {
    kind: "post",
    id: "f3",
    title: "40代女性の歯並びニーズや価値観、転職初心者が知りたい20の論点",
    author: "田中 和子",
    avatar: avatars[1],
    timeLabel: "2日前",
    image: images[2],
    views: "3,210",
    clips: "546",
  },
  {
    kind: "user",
    id: "user-fallback-1",
    name: "マネクリちゃん",
    role: "会社員 / 34歳",
    avatar: avatars[2],
    followers: "2,317",
    clips: "506",
  },
  {
    kind: "post",
    id: "f4",
    title: "収入印紙の勘定科目と仕訳ルールを徹底解説｜税務対応・電子契約にも対応",
    author: "人気クリップ",
    avatar: avatars[2],
    timeLabel: "6時間前",
    thumbnails: [images[1], images[2], images[0]],
    views: "7,431",
    clips: "1,210",
  },
  {
    kind: "post",
    id: "f5",
    title: "テレワーク時代の社員別評価フレームワーク｜チェックリスト付き",
    author: "鈴木 翼",
    avatar: avatars[1],
    timeLabel: "12時間前",
    thumbnails: [images[3], images[0], images[2]],
    views: "4,210",
    clips: "830",
    tag: "人事クリップ",
    tagTone: "warning",
  },
  {
    kind: "post",
    id: "f6",
    title: "経理担当者必見！ 勘定科目の選び方チェックリスト",
    author: "佐藤 美咲",
    avatar: avatars[0],
    timeLabel: "1日前",
    image: images[3],
    views: "5,200",
    clips: "540",
  },
  {
    kind: "post",
    id: "f7",
    title: "テレワーク時代の社員別評価フレームワーク：転職初心者が知りたい20の論点",
    author: "佐藤 美咲",
    avatar: avatars[0],
    timeLabel: "2日前",
    image: images[1],
    views: "3,890",
    clips: "430",
  },
];

const fallbackItemsList: FeedItem[] = fallbackItemsMasonry.filter((item) => item.kind === "post");

const fallbackByMode: Record<Mode, FeedItem[]> = {
  masonry: fallbackItemsMasonry,
  list: fallbackItemsList,
};
